/**
 * A360 Agent Exchange — data access layer.
 *
 * Backed by the `exchange_agents` table in Global V3 (Agent Manager Supabase).
 * CMS-managed via /admin/exchange. `kind` makes this a registry: today most
 * entries are "static" (gallery + narrative); an entry can be "live" (a real
 * component on the agent runtime) or "embed" (an external deployed demo)
 * without touching the grid or detail page.
 */
import { getAgentSupabase } from "@/lib/supabase";

export type AgentKind = "static" | "live" | "embed";
export type AgentStatus = "draft" | "live" | "archived";

export interface ExchangeAgent {
  slug: string;
  name: string;
  publisher: string;
  developer: string;
  /** Drives the catalog filter chips. */
  category: string;
  tagline: string;
  description: string;
  price: "Free" | "Premium";
  rating: number;
  reviews: number;
  /** Path under /public, or a Supabase Storage URL. Omit for a lettered chip fallback. */
  logo?: string;
  /** Catalog cover image. Defaults to screenshots[0] when omitted. */
  cover?: string;
  screenshots: string[];
  features: string[];
  useCases: { label: string; description: string }[];
  tagGroups: { category: string; items: string[] }[];
  updates: { title: string; date: string; description: string }[];
  size: string;
  lastUpdate: string;
  /** Registry hook: how this card is presented. Default "static". */
  kind: AgentKind;
  /** For kind === "embed". */
  href?: string;
  /**
   * Maps this card to a lib/portfolio/registry.ts prototype. Audience
   * share-link visitors only see cards whose portfolioSlug is in their
   * audience; cards without one are internal/beta-only in audience views.
   */
  portfolioSlug?: string;

  // ---------------------------------------------------------------------------
  // Marketplace enrichment (all OPTIONAL). Each detail-page section renders only
  // when its field is present. Modeled on docs/research/MARKETPLACE_REVIEW.md.
  // ---------------------------------------------------------------------------
  /** Earned trust / marketing markers shown on the card + hero (e.g. "Flagship", "New"). */
  badges?: string[];
  /** A360 Verified — HIPAA-reviewed, BAA in place. Drives the verified badge. */
  verified?: boolean;
  verifiedDate?: string;
  /** EMRs / platforms this agent plugs into — answers "does this work with my system?". */
  emrCompatibility?: string[];
  /** How deep the integration runs. */
  integrationDepth?: "Native" | "API" | "Read-only";
  /** Social-proof install count (string to allow "290+ practices"). */
  installCount?: string;
  /** Systems this agent connects to beyond the EMR (other agents, CRM, lenders…). */
  integrations?: { name: string; type?: string }[];
  /** Data-transparency contract: what this agent reads from / writes to the record. */
  dataFields?: { reads?: string[]; writes?: string[]; retention?: string };
  /** Proof metrics surfaced near the top of the overview. */
  kpis?: { label: string; value: string }[];
  /** Pricing tiers for the Pricing section. */
  pricingTiers?: { name: string; price: string; note?: string; features: string[] }[];
  /** Customer reviews for the Reviews section (distinct from the `reviews` count). */
  agentReviews?: { author: string; role?: string; rating: number; quote: string }[];
  /** YouTube URL for the media section. */
  videoUrl?: string;
  /** CMS publish state. Public queries (getAgent/listAgents) only ever return "live". */
  status?: AgentStatus;
}

/** Row shape as stored in Supabase (snake_case, jsonb columns). */
interface ExchangeAgentRow {
  slug: string;
  name: string;
  publisher: string | null;
  developer: string | null;
  category: string | null;
  tagline: string | null;
  description: string | null;
  price: "Free" | "Premium";
  rating: number;
  reviews_count: number;
  logo: string | null;
  cover: string | null;
  screenshots: string[];
  features: string[];
  use_cases: { label: string; description: string }[];
  tag_groups: { category: string; items: string[] }[];
  updates: { title: string; date: string; description: string }[];
  size: string | null;
  last_update: string | null;
  kind: AgentKind;
  href: string | null;
  portfolio_slug: string | null;
  badges: string[];
  verified: boolean;
  verified_date: string | null;
  emr_compatibility: string[];
  integration_depth: "Native" | "API" | "Read-only" | null;
  install_count: string | null;
  integrations: { name: string; type?: string }[];
  data_fields: { reads?: string[]; writes?: string[]; retention?: string } | null;
  kpis: { label: string; value: string }[];
  pricing_tiers: { name: string; price: string; note?: string; features: string[] }[];
  agent_reviews: { author: string; role?: string; rating: number; quote: string }[];
  video_url: string | null;
  status: AgentStatus;
}

function fromRow(r: ExchangeAgentRow): ExchangeAgent {
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
    badges: r.badges?.length ? r.badges : undefined,
    verified: r.verified || undefined,
    verifiedDate: r.verified_date ?? undefined,
    emrCompatibility: r.emr_compatibility?.length ? r.emr_compatibility : undefined,
    integrationDepth: r.integration_depth ?? undefined,
    installCount: r.install_count ?? undefined,
    integrations: r.integrations?.length ? r.integrations : undefined,
    dataFields:
      r.data_fields && Object.keys(r.data_fields).length ? r.data_fields : undefined,
    kpis: r.kpis?.length ? r.kpis : undefined,
    pricingTiers: r.pricing_tiers?.length ? r.pricing_tiers : undefined,
    agentReviews: r.agent_reviews?.length ? r.agent_reviews : undefined,
    videoUrl: r.video_url ?? undefined,
    status: r.status,
  };
}

const SELECT_COLUMNS =
  "slug, name, publisher, developer, category, tagline, description, price, rating, " +
  "reviews_count, logo, cover, screenshots, features, use_cases, tag_groups, updates, " +
  "size, last_update, kind, href, portfolio_slug, badges, verified, verified_date, " +
  "emr_compatibility, integration_depth, install_count, integrations, data_fields, " +
  "kpis, pricing_tiers, agent_reviews, video_url, status";

/** Public catalog — live agents only, alphabetical by name. */
export async function listAgents(): Promise<ExchangeAgent[]> {
  const { data, error } = await getAgentSupabase()
    .from("exchange_agents")
    .select(SELECT_COLUMNS)
    .eq("status", "live")
    .order("name");
  if (error) throw new Error(`listAgents: ${error.message}`);
  return (data as unknown as ExchangeAgentRow[]).map(fromRow);
}

/** Public detail lookup — returns undefined for missing OR non-live agents. */
export async function getAgent(slug: string): Promise<ExchangeAgent | undefined> {
  const { data, error } = await getAgentSupabase()
    .from("exchange_agents")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .eq("status", "live")
    .maybeSingle();
  if (error) throw new Error(`getAgent(${slug}): ${error.message}`);
  return data ? fromRow(data as unknown as ExchangeAgentRow) : undefined;
}
