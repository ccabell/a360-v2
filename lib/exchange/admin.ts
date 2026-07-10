/**
 * Admin-only data access for the Agent Exchange CMS (/admin/exchange).
 * Unlike lib/exchange/agents.ts (public, live-only), these queries see every
 * status (draft/live/archived) and expose the raw editable shape.
 */
import { getAgentSupabase } from "@/lib/supabase";
import type { ExchangeAgent, AgentStatus } from "@/lib/exchange/agents";

export interface AdminAgentSummary {
  slug: string;
  name: string;
  category: string;
  status: AgentStatus;
  updatedAt: string;
}

const SELECT_COLUMNS =
  "slug, name, publisher, developer, category, tagline, description, price, rating, " +
  "reviews_count, logo, cover, screenshots, features, use_cases, tag_groups, updates, " +
  "size, last_update, kind, href, portfolio_slug, badges, verified, verified_date, " +
  "emr_compatibility, integration_depth, install_count, integrations, data_fields, " +
  "kpis, pricing_tiers, agent_reviews, video_url, status";

// Row <-> ExchangeAgent mapping duplicated (not imported) from agents.ts because
// that file's fromRow/toRow are private to the public query surface — the admin
// layer intentionally has its own so the two can diverge (e.g. admin needs status
// always present) without coupling the public API's internals to the CMS.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromRow(r: any): ExchangeAgent {
  return {
    slug: r.slug,
    name: r.name,
    publisher: r.publisher ?? "",
    developer: r.developer ?? "",
    category: r.category ?? "",
    tagline: r.tagline ?? "",
    description: r.description ?? "",
    price: r.price,
    rating: r.rating,
    reviews: r.reviews_count,
    logo: r.logo ?? undefined,
    cover: r.cover ?? undefined,
    screenshots: r.screenshots ?? [],
    features: r.features ?? [],
    useCases: r.use_cases ?? [],
    tagGroups: r.tag_groups ?? [],
    updates: r.updates ?? [],
    size: r.size ?? "",
    lastUpdate: r.last_update ?? "",
    kind: r.kind,
    href: r.href ?? undefined,
    portfolioSlug: r.portfolio_slug ?? undefined,
    badges: r.badges ?? [],
    verified: r.verified ?? false,
    verifiedDate: r.verified_date ?? undefined,
    emrCompatibility: r.emr_compatibility ?? [],
    integrationDepth: r.integration_depth ?? undefined,
    installCount: r.install_count ?? undefined,
    integrations: r.integrations ?? [],
    dataFields: r.data_fields ?? {},
    kpis: r.kpis ?? [],
    pricingTiers: r.pricing_tiers ?? [],
    agentReviews: r.agent_reviews ?? [],
    videoUrl: r.video_url ?? undefined,
    status: r.status,
  };
}

function toRow(a: ExchangeAgent) {
  return {
    slug: a.slug,
    name: a.name,
    publisher: a.publisher || null,
    developer: a.developer || null,
    category: a.category || null,
    tagline: a.tagline || null,
    description: a.description || null,
    price: a.price,
    rating: a.rating ?? 0,
    reviews_count: a.reviews ?? 0,
    logo: a.logo || null,
    cover: a.cover || null,
    screenshots: a.screenshots ?? [],
    features: a.features ?? [],
    use_cases: a.useCases ?? [],
    tag_groups: a.tagGroups ?? [],
    updates: a.updates ?? [],
    size: a.size || null,
    last_update: a.lastUpdate || null,
    kind: a.kind || "static",
    href: a.href || null,
    portfolio_slug: a.portfolioSlug || null,
    badges: a.badges ?? [],
    verified: a.verified ?? false,
    verified_date: a.verifiedDate || null,
    emr_compatibility: a.emrCompatibility ?? [],
    integration_depth: a.integrationDepth || null,
    install_count: a.installCount || null,
    integrations: a.integrations ?? [],
    data_fields: a.dataFields ?? {},
    kpis: a.kpis ?? [],
    pricing_tiers: a.pricingTiers ?? [],
    agent_reviews: a.agentReviews ?? [],
    video_url: a.videoUrl || null,
    status: a.status ?? "draft",
  };
}

/** Every agent, any status, for the admin list view. */
export async function listAgentsForAdmin(): Promise<AdminAgentSummary[]> {
  const { data, error } = await getAgentSupabase()
    .from("exchange_agents")
    .select("slug, name, category, status, updated_at")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`listAgentsForAdmin: ${error.message}`);
  return (data ?? []).map((r) => ({
    slug: r.slug,
    name: r.name,
    category: r.category ?? "",
    status: r.status,
    updatedAt: r.updated_at,
  }));
}

/** Full agent record for editing, any status. Undefined if slug doesn't exist. */
export async function getAgentForAdmin(slug: string): Promise<ExchangeAgent | undefined> {
  const { data, error } = await getAgentSupabase()
    .from("exchange_agents")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getAgentForAdmin(${slug}): ${error.message}`);
  return data ? fromRow(data) : undefined;
}

/** Create or update an agent by slug (upsert). Returns an error message on failure. */
export async function saveAgent(
  agent: ExchangeAgent,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!agent.slug || !/^[a-z0-9-]+$/.test(agent.slug)) {
    return { ok: false, error: "Slug must be lowercase letters, numbers, and hyphens only" };
  }
  const { error } = await getAgentSupabase()
    .from("exchange_agents")
    .upsert(toRow(agent), { onConflict: "slug" });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Upload a file to the exchange-media bucket, returns its public URL. */
export async function uploadAgentMedia(
  slug: string,
  folder: "screenshots" | "logo" | "cover",
  file: File,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const ext = file.name.split(".").pop() || "png";
  const path = `${slug}/${folder}/${Date.now()}.${ext}`;
  const { error } = await getAgentSupabase()
    .storage.from("exchange-media")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { ok: false, error: error.message };
  const { data } = getAgentSupabase().storage.from("exchange-media").getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
