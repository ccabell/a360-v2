// One-time seed: creates DRAFT rows in exchange_agents for the 16 catalog
// agents from asset_factory/manifest/agents.jsonl (Sloane, Quill, Beacon, etc.)
// per Chris's "join all 16" decision (2026-07-10).
//
// Deliberately conservative: copy is drafted only from factual manifest fields
// (agent name, category, hero concept, screens list) — no invented metrics,
// pricing, reviews, or badges. status: "draft" so nothing appears on the public
// /exchange until reviewed and promoted via /admin/exchange. No images wired —
// asset_factory's covers/icons for these 16 haven't been through the approval
// gallery yet (no APPROVED_MANIFEST.json); attach those later via the admin's
// "Import from Asset Factory" panel once that export exists.
//
// Usage: node scripts/seed-catalog-agents-draft.mjs
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "..", ".env.local") });

const url = process.env.NEXT_PUBLIC_AGENT_SUPABASE_URL;
const key = process.env.AGENT_SUPABASE_SERVICE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_AGENT_SUPABASE_URL or AGENT_SUPABASE_SERVICE_KEY in .env.local");
  process.exit(1);
}
const supabase = createClient(url, key);

const manifestPath = "C:/projects/asset_factory/manifest/agents.jsonl";
const rows = readFileSync(manifestPath, "utf-8")
  .split("\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line));

// Short, conservative copy drafted per-agent from the manifest's factual fields
// (category + hero concept + screens). Hand-reviewed for tone, not fabricated
// claims — no metrics, no "X% faster" style proof points.
const COPY = {
  Sloane: {
    tagline: "Consult-room performance coaching, scored in real time.",
    description: "Sloane scores every consultation as it happens and surfaces coaching opportunities alongside a running ledger of revenue left on the table — so providers get better and practices stop losing case acceptance to habits nobody can see.",
  },
  Quill: {
    tagline: "Structured clinical notes, drafted live during treatment.",
    description: "Quill assembles a structured note — units, sites, compliance flags — while the provider is still mid-treatment, ready for a fast co-sign instead of an end-of-day rewrite.",
  },
  Vista: {
    tagline: "Show patients their outcome before they commit.",
    description: "Vista renders a conservative-to-enhanced outcome slider from a single photo, turning an abstract treatment plan into something the patient can see and agree to on the spot.",
  },
  Fina: {
    tagline: "Pre-qualified financing, presented at the moment of hesitation.",
    description: "Fina surfaces pre-qualified financing offers right when a patient hesitates at checkout, matching lenders and tracking which offers actually convert to financed revenue.",
  },
  Remi: {
    tagline: "A front desk that never misses a call.",
    description: "Remi answers and books after-hours calls, hands the team a morning digest of what happened overnight, and escalates anything that needs a human — so the phone stops being the bottleneck.",
  },
  Piper: {
    tagline: "Turn DMs into booked consults automatically.",
    description: "Piper qualifies inbound leads across DMs and chat, runs an 18-month nurture timeline for anyone not ready yet, and tracks which channel actually drove the booking.",
  },
  Ember: {
    tagline: "Win back patients who went quiet.",
    description: "Ember identifies lapsed patients most likely to rebook and runs a timed outreach cadence across text and voice, with a ledger tracking exactly how much recovered revenue it's responsible for.",
  },
  Halo: {
    tagline: "Design and forecast membership plans that hold.",
    description: "Halo models membership tier economics against projected MRR, flags churn risk before it happens, and shows the real LTV gap between members and non-members.",
  },
  Ripple: {
    tagline: "Referrals that track themselves.",
    description: "Ripple triggers refer-a-friend offers at the right post-treatment moment and tracks share links through to booked, referred revenue — no manual follow-up required.",
  },
  Ledger: {
    tagline: "See which marketing channel actually treats patients.",
    description: "Ledger traces the full path from marketing channel to booked consult to treated revenue, highlighting spend that isn't converting so budget decisions are based on outcomes, not clicks.",
  },
  Tempo: {
    tagline: "Fill schedule gaps before they cost you.",
    description: "Tempo forecasts underused appointment slots and launches quiet-fill campaigns automatically, tracking revenue-per-available-hour by provider so scheduling gaps get caught early.",
  },
  Lumen: {
    tagline: "Device guidance with a citation for every answer.",
    description: "Lumen answers device and protocol questions with a cited source and a confidence score, and locks controls into a review-required state when the situation calls for a second look — safety-first by design.",
  },
  Vial: {
    tagline: "Know what's about to expire before it happens.",
    description: "Vial forecasts product burn rate, flags approaching expiry dates, and recommends purchase orders and inter-location transfers so inventory stops silently eating margin.",
  },
  Sentinel: {
    tagline: "A daily compliance check, not an annual scramble.",
    description: "Sentinel runs a daily audit across charts and scope-of-practice rules, flags exceptions before they become findings, and exports a diligence pack whenever one's needed.",
  },
  Beacon: {
    tagline: "Local visibility, tracked and maintained automatically.",
    description: "Beacon tracks local search rank across a coverage grid, keeps the Google Business Profile fresh with posts and answered reviews, and reports on AI-assistant visibility as that channel grows.",
  },
  Muse: {
    tagline: "Consent-gated content, scheduled and ready to post.",
    description: "Muse captures before/after content only with a signed release on file, auto-edits it into a ready-to-post calendar, and includes a takedown checklist if consent is ever revoked.",
  },
};

function toRow(m) {
  const c = COPY[m.agent];
  const features = m.screens.split("|").map((s) => s.trim()).filter(Boolean);
  return {
    slug: m.slug,
    name: m.agent,
    publisher: "Aesthetics360",
    developer: "Aesthetics360",
    category: m.category,
    tagline: c.tagline,
    description: c.description,
    price: "Premium",
    rating: 0,
    reviews_count: 0,
    logo: null,
    cover: null,
    screenshots: [],
    features,
    use_cases: [],
    tag_groups: [],
    updates: [
      {
        title: "Draft listing created",
        date: new Date().toISOString().slice(0, 10),
        description: "Seeded from asset_factory/manifest/agents.jsonl. Copy is a conservative first draft — needs founder review before publishing. No images attached yet (awaiting approved-asset export from the review gallery).",
      },
    ],
    size: "",
    last_update: new Date().toISOString().slice(0, 10),
    kind: "static",
    href: null,
    portfolio_slug: null,
    badges: [],
    verified: false,
    verified_date: null,
    emr_compatibility: [],
    integration_depth: null,
    install_count: null,
    integrations: [],
    data_fields: {},
    kpis: [],
    pricing_tiers: [],
    agent_reviews: [],
    video_url: null,
    status: "draft",
  };
}

const payload = rows.map(toRow);
const { data, error } = await supabase
  .from("exchange_agents")
  .upsert(payload, { onConflict: "slug" })
  .select("slug, name, status");

if (error) {
  console.error("Seed failed:", error);
  process.exit(1);
}
console.log(`Seeded ${data.length} draft catalog agents:`);
data.forEach((r) => console.log(`  ${r.slug} — ${r.name} (${r.status})`));
