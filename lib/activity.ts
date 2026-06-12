import { agentSupabase } from "@/lib/supabase";

/**
 * Lean activity tracking for the demo. Server-side only (service key).
 * Fire-and-forget: a tracking failure must NEVER break the request.
 * No per-user auth yet — tenant is derived from APP_MODE (investor vs internal).
 */

export interface ActivityEvent {
  type: string; // e.g. "patient.viewed", "run.viewed", "research.query"
  entityType?: string; // "patient" | "transcript" | "run" | "research" | ...
  entityId?: string;
  tenantId?: string | null; // override; otherwise resolved from default slug
  userRef?: string | null;
  payload?: Record<string, unknown>;
}

function defaultTenantSlug(): string {
  if (process.env.APP_TENANT_SLUG) return process.env.APP_TENANT_SLUG;
  return process.env.NEXT_PUBLIC_APP_MODE === "demo" ? "investor" : "internal";
}

const tenantIdCache: Record<string, string> = {};

async function resolveTenantId(slug: string): Promise<string | null> {
  if (tenantIdCache[slug]) return tenantIdCache[slug];
  const { data } = await agentSupabase
    .from("app_tenants")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (data?.id) {
    tenantIdCache[slug] = data.id as string;
    return data.id as string;
  }
  return null;
}

/** The tenant id for the current APP_MODE (investor in demo, internal otherwise). */
export async function getDefaultTenantId(): Promise<string | null> {
  return resolveTenantId(defaultTenantSlug());
}

export async function logActivity(ev: ActivityEvent): Promise<void> {
  try {
    const tenantId =
      ev.tenantId !== undefined
        ? ev.tenantId
        : await resolveTenantId(defaultTenantSlug());
    await agentSupabase.from("app_activity_events").insert({
      tenant_id: tenantId,
      user_ref: ev.userRef ?? null,
      type: ev.type,
      entity_type: ev.entityType ?? null,
      entity_id: ev.entityId ?? null,
      payload: ev.payload ?? {},
    });
  } catch {
    // Tracking is best-effort — swallow all errors.
  }
}
