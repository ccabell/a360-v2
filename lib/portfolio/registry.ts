/**
 * Prototype Portfolio registry — the single in-code catalog of every A360
 * prototype (audit 2026-07, `04_PORTFOLIO_ARCHITECTURE.md` §1).
 *
 * Kept in code, not a DB: entries change at code-review cadence and there are
 * ~20 of them. Statuses/tiers are seeded from the July 2026 audit — edit here.
 *
 * Audience membership is defined once, on AUDIENCES; each Prototype's
 * `audiences` field is derived from it at module init so the two can't drift.
 */

export type PrototypeStatus =
  | "concept"
  | "building"
  | "demoable"
  | "shipped"
  | "retired";

/** How the prototype surfaces in the portfolio (design doc §2). */
export type PrototypeTier = "native" | "embed" | "linkout" | "card";

/** AWS promotion distance from the audit (S = easiest). */
export type PromotionSize = "S" | "M" | "L" | "XL" | "na";

export interface Prototype {
  /** Stable id — used in share links and audience lists. */
  slug: string;
  name: string;
  oneLiner: string;
  status: PrototypeStatus;
  tier: PrototypeTier;
  /** Route (native) or external URL (embed/linkout). */
  href?: string;
  /** For card tier / catalog covers. Path under /public. */
  screenshot?: string;
  /** Audience ids that MAY see this prototype (derived from AUDIENCES). */
  audiences: string[];
  owner: "chris";
  /** Provenance: GitHub org/repo. */
  repo: string;
  stack: string;
  promotion: PromotionSize;
  /**
   * Route prefixes (pages AND api) a share-link visitor needs for this
   * prototype to work. Native tier only; defaults to [href]. Enforced by
   * proxy.ts — keep studio prefixes (/api/agents, /api/tools, …) out.
   */
  routePrefixes?: string[];
  notes?: string;
}

export interface Audience {
  id: string;
  label: string;
  prototypeSlugs: string[];
}

type PrototypeSeed = Omit<Prototype, "audiences">;

const PROTOTYPE_SEED: PrototypeSeed[] = [
  // ── native / shipped (this app) ──────────────────────────────────────────
  {
    slug: "scribe",
    name: "Scribe",
    oneLiner:
      "Real-time consultation capture demo — transcript to extraction to documentation.",
    status: "shipped",
    tier: "native",
    href: "/dashboard/scribe",
    screenshot: "/exchange/shots/scribe/1.jpg",
    owner: "chris",
    repo: "ccabell/a360-v2",
    stack: "Next.js 16 · React 19 · Tailwind 4 · shadcn",
    promotion: "XL",
    routePrefixes: [
      "/dashboard/scribe",
      "/api/scribe",
      "/api/demo-agents",
      "/api/practice",
    ],
  },
  {
    slug: "tcp-demo",
    name: "TCP Demo",
    oneLiner:
      "In-consult treatment & care plan stage demo (good/better/best tiers).",
    status: "shipped",
    tier: "native",
    href: "/dashboard/tcp",
    screenshot: "/exchange/shots/tcp/1.jpg",
    owner: "chris",
    repo: "ccabell/a360-v2",
    stack: "Next.js 16 · React 19 · Tailwind 4 · shadcn",
    promotion: "na",
    routePrefixes: [
      "/dashboard/tcp",
      "/api/tcp",
      "/api/demo-agents",
      "/api/practice",
      "/api/global-library/products",
    ],
    notes:
      "Fixture-driven stage demo (Danielle Brooks), no model call. Promotion path runs through the standalone TCP product, not this demo.",
  },
  {
    slug: "reach",
    name: "Reach",
    oneLiner:
      "Post-treatment engagement module — opportunity extraction and follow-up campaigns.",
    status: "shipped",
    tier: "native",
    href: "/dashboard/reach",
    screenshot: "/exchange/shots/reach/1.jpg",
    owner: "chris",
    repo: "ccabell/a360-v2",
    stack: "Next.js 16 · React 19 · Tailwind 4 · shadcn",
    promotion: "XL",
    // /api/agents (studio prefix) is deliberately NOT granted to share-link
    // visitors; the reach surface degrades gracefully without it.
    routePrefixes: ["/dashboard/reach", "/api/patients"],
  },
  {
    slug: "tube",
    name: "Video Navigator",
    oneLiner:
      "Curated, searchable aesthetics video library with grounded ask-the-library chat.",
    status: "shipped",
    tier: "native",
    href: "/tube/explore",
    owner: "chris",
    repo: "ccabell/a360-v2",
    stack: "Next.js 16 · RAG DB (FTS) · shadcn",
    promotion: "M",
    routePrefixes: ["/tube", "/api/tube"],
  },
  {
    slug: "academy",
    name: "Pearce Channel",
    oneLiner: "Dr. Tim Pearce training academy surface with grounded chat.",
    status: "shipped",
    tier: "native",
    href: "/dashboard/academy",
    owner: "chris",
    repo: "ccabell/a360-v2",
    stack: "Next.js 16 · React 19 · Tailwind 4 · shadcn",
    promotion: "XL",
    routePrefixes: ["/dashboard/academy", "/api/academy"],
  },
  {
    slug: "ask",
    name: "Evidence Ask",
    oneLiner:
      "Clinical Q&A grounded in PubMed, FDA labels, podcasts, YouTube and GL dossiers.",
    status: "shipped",
    tier: "native",
    href: "/ask",
    owner: "chris",
    repo: "ccabell/a360-v2",
    stack: "Next.js 16 · Vercel AI Gateway · RAG service",
    promotion: "XL",
    routePrefixes: ["/ask", "/api/ask"],
  },
  {
    slug: "library",
    name: "Library",
    oneLiner: "Global Library viewer — products, fuel docs and evidence.",
    status: "shipped",
    tier: "native",
    href: "/dashboard/library",
    owner: "chris",
    repo: "ccabell/a360-v2",
    stack: "Next.js 16 · Global V3 Supabase",
    promotion: "XL",
    routePrefixes: ["/dashboard/library", "/api/library"],
  },
  {
    slug: "products",
    name: "Products",
    oneLiner: "Product catalog surface over the Global Library taxonomy.",
    status: "shipped",
    tier: "native",
    href: "/dashboard/products",
    owner: "chris",
    repo: "ccabell/a360-v2",
    stack: "Next.js 16 · Global V3 Supabase",
    promotion: "XL",
    routePrefixes: ["/dashboard/products", "/api/products"],
  },
  {
    slug: "podcast",
    name: "Podcast Navigator",
    oneLiner:
      "8,688 aesthetics podcast episodes, semantically searchable and citable.",
    status: "shipped",
    tier: "native",
    href: "/podcast",
    owner: "chris",
    repo: "ccabell/a360-v2",
    stack: "Next.js 16 · RAG DB (202K chunks)",
    promotion: "M",
    routePrefixes: ["/podcast", "/api/podcast"],
  },

  // ── linkout / demoable (external deployments) ────────────────────────────
  {
    slug: "lumira",
    name: "Lumira",
    oneLiner:
      "Consumer aesthetic-intelligence demo — with/without 30-year aging timeline from one selfie.",
    status: "demoable",
    tier: "linkout",
    href: "https://agelessdemo.vercel.app",
    screenshot: "/exchange/shots/lumira/1.jpg",
    owner: "chris",
    repo: "ccabell/ageless_demo",
    stack: "Next.js 16 · MediaPipe (fully client-side)",
    promotion: "L",
    notes:
      "Audit listed ageless-demo.vercel.app but that 404s; live deployment verified at agelessdemo.vercel.app (2026-07-04). Camera use makes iframes flaky — linkout is correct. /admin is open by design; gate the link per audience.",
  },
  {
    slug: "voice-bot",
    name: "Voice Bot",
    oneLiner: "Voice-first consultation assistant (mic-driven).",
    status: "demoable",
    tier: "linkout",
    href: "https://a360-voice-bot.vercel.app",
    owner: "chris",
    repo: "ccabell/Voice_Bot",
    stack: "Next.js · MUI",
    promotion: "M",
    notes:
      "Deployed build is May baseline; GL-fuel-agent branch pushed, not merged. Internal only until redeployed. Own /login gate (SITE_PASSWORD).",
  },

  // ── card / building (no live surface yet) ────────────────────────────────
  {
    slug: "tcp-product",
    name: "TCP (standalone product)",
    oneLiner:
      "Block-based treatment-plan editor with token-shared patient viewer, PDF and email.",
    status: "building",
    tier: "card",
    owner: "chris",
    repo: "ccabell/a360-tcp",
    stack: "Next.js · Supabase Auth + RLS · dnd-kit · Resend",
    promotion: "L",
    notes:
      "Phases 1–3 of 4 done (23/23 plans); Phase-3 UAT failed on polish, not correctness. Becomes linkout after deploy.",
  },
  {
    slug: "pip",
    name: "PIP",
    oneLiner:
      "Strategic intelligence workspace — companies, products, features, opportunities.",
    status: "building",
    tier: "card",
    owner: "chris",
    repo: "Aesthetics-360/pip",
    stack: "Next.js · Supabase (dedicated project, real auth + RLS) · GSD",
    promotion: "L",
    notes:
      "Phases 0–3 of 8 done, human-verified. Deploy to Vercel when Phases 4–5 land; CEO-only audience gating required.",
  },
  {
    slug: "a360-photo",
    name: "A360 Photo",
    oneLiner:
      "Clinical B&A photo platform — capture, pairing and tenant-scoped storage.",
    status: "building",
    tier: "card",
    owner: "chris",
    repo: "Aesthetics-360/a360-photo",
    stack: "FastAPI · SQLAlchemy 2 · Alembic · Postgres · MinIO · React/Vite",
    promotion: "M",
    notes:
      "Mid-Phase-5. JWT with practice_id/role claims — tenancy already enforced; closest prototype to the AWS target architecture.",
  },
  {
    slug: "imaging-lab",
    name: "Imaging Lab",
    oneLiner:
      "Local lab for aging/treatment simulation experiments and B&A pair curation.",
    status: "building",
    tier: "card",
    owner: "chris",
    repo: "ccabell/a360-imaging-lab",
    stack: "Python · local pipelines (Pair Lab UI)",
    promotion: "na",
    notes:
      "Local-only; ADRs P003/P004 (cloud egress, simulation carve-out) pending acceptance.",
  },
  {
    slug: "fuel-builder",
    name: "Fuel Builder",
    oneLiner:
      "Agent-fuel authoring app writing product docs into Global V3.",
    status: "building",
    tier: "card",
    owner: "chris",
    repo: "ccabell/a360-fuel",
    stack: "Next.js (app untracked) · Global V3 Supabase",
    promotion: "na",
    notes:
      "Deliberately frozen 2026-06-18 (FREEZE_STATE.md is the authoritative handoff). 29 product docs live in Global V3; 89 anatomy/concern docs mostly draft.",
  },

  // ── card / concept ───────────────────────────────────────────────────────
  {
    slug: "coaching",
    name: "Coaching",
    oneLiner:
      "Consultation coaching agents — catalog-bound recommendations, no numeric scores.",
    status: "concept",
    tier: "card",
    owner: "chris",
    repo: "ccabell/a360-coaching-specs",
    stack: "Specs only (AGENT_ARCHITECTURE.md, 4 reusable agents)",
    promotion: "na",
    notes:
      "New canonical AGENT_ARCHITECTURE.md supersedes the old 0–10 scoring spec.",
  },
];

const ALL_SLUGS = PROTOTYPE_SEED.map((p) => p.slug);

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

export const PROTOTYPES: Prototype[] = PROTOTYPE_SEED.map((p) => ({
  ...p,
  audiences: AUDIENCES.filter((a) => a.prototypeSlugs.includes(p.slug)).map(
    (a) => a.id,
  ),
}));

export function getPrototype(slug: string): Prototype | undefined {
  return PROTOTYPES.find((p) => p.slug === slug);
}

export function getAudience(id: string): Audience | undefined {
  return AUDIENCES.find((a) => a.id === id);
}

export function prototypesForAudience(audienceId: string): Prototype[] {
  const audience = getAudience(audienceId);
  if (!audience) return [];
  return PROTOTYPES.filter((p) => audience.prototypeSlugs.includes(p.slug));
}

/**
 * Route prefixes a share-link visitor for this audience may reach: the
 * exchange landing plus every native prototype's routes. Consumed by proxy.ts.
 */
export function audienceRoutePrefixes(audienceId: string): string[] {
  const prefixes = new Set<string>(["/exchange"]);
  for (const p of prototypesForAudience(audienceId)) {
    if (p.tier !== "native") continue;
    for (const prefix of p.routePrefixes ?? (p.href ? [p.href] : [])) {
      prefixes.add(prefix);
    }
  }
  return [...prefixes];
}
