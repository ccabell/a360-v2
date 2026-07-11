/**
 * Share-link audiences + native route grants.
 *
 * Split out of the old lib/portfolio/registry.ts when the project catalog
 * moved to Ops (`portfolio_projects`, 2026-07-11): proxy.ts runs at the edge
 * on every request and cannot read the DB, so the security-relevant pieces —
 * which audience may reach which native route prefixes — stay in code at
 * code-review cadence. The project catalog (names, statuses, links, priority)
 * lives in the DB; see lib/portfolio/db.ts.
 */

export interface Audience {
  id: string;
  label: string;
  prototypeSlugs: string[];
}

/**
 * Route prefixes (pages AND api) a share-link visitor needs for each native
 * prototype to work. Enforced by proxy.ts — keep studio prefixes
 * (/api/agents, /api/tools, …) out.
 */
export const NATIVE_ROUTE_PREFIXES: Record<string, string[]> = {
  scribe: [
    "/dashboard/scribe",
    "/api/scribe",
    "/api/demo-agents",
    "/api/practice",
  ],
  "tcp-demo": [
    "/dashboard/tcp",
    "/api/tcp",
    "/api/demo-agents",
    "/api/practice",
    "/api/global-library/products",
  ],
  // /api/agents (studio prefix) is deliberately NOT granted to share-link
  // visitors; the reach surface degrades gracefully without it.
  reach: ["/dashboard/reach", "/api/patients"],
  tube: ["/tube", "/api/tube"],
  academy: ["/dashboard/academy", "/api/academy"],
  ask: ["/ask", "/api/ask"],
  library: ["/dashboard/library", "/api/library"],
  products: ["/dashboard/products", "/api/products"],
  podcast: ["/podcast", "/api/podcast"],
};

const ALL_SLUGS = [
  ...Object.keys(NATIVE_ROUTE_PREFIXES),
  "lumira",
  "voice-bot",
  "tcp-product",
  "pip",
  "a360-photo",
  "imaging-lab",
  "fuel-builder",
  "coaching",
];

const BUYER_SLUGS = [
  "scribe",
  "tcp-demo",
  "reach",
  "tube",
  "ask",
  "library",
  "products",
  "lumira",
];

export const AUDIENCES: Audience[] = [
  { id: "internal", label: "Internal", prototypeSlugs: ALL_SLUGS },
  { id: "buyer", label: "Buyer", prototypeSlugs: BUYER_SLUGS },
  {
    id: "ceo",
    label: "CEO",
    prototypeSlugs: [...BUYER_SLUGS, "pip", "a360-photo", "imaging-lab"],
  },
  {
    id: "investor",
    label: "Investor",
    prototypeSlugs: ["scribe", "tube", "ask", "products"],
  },
];

export function getAudience(id: string): Audience | undefined {
  return AUDIENCES.find((a) => a.id === id);
}

/**
 * Route prefixes a share-link visitor for this audience may reach: the
 * exchange landing plus every native prototype's routes. Consumed by proxy.ts.
 */
export function audienceRoutePrefixes(audienceId: string): string[] {
  const prefixes = new Set<string>(["/exchange"]);
  const audience = getAudience(audienceId);
  if (!audience) return [...prefixes];
  for (const slug of audience.prototypeSlugs) {
    for (const prefix of NATIVE_ROUTE_PREFIXES[slug] ?? []) {
      prefixes.add(prefix);
    }
  }
  return [...prefixes];
}
