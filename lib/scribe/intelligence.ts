import type { ExtractedEntity } from "./extraction";

// =============================================================================
// Clinical Intelligence — paraphrased, podcast-grounded guidance surfaced next
// to the note. Mined from the A360 podcast network (31 shows, ~8,688 episodes).
// No verbatim quotes; reusable language patterns with a consensus signal.
// Items are matched to the patient's extracted entities at render time.
// =============================================================================

export type IntelCategory =
  | "documentation"
  | "pairing"
  | "aftercare"
  | "pearl"
  | "screening"
  | "revenue";

export type IntelFrequency = "Common" | "Several sources" | "Emerging";

export interface IntelItem {
  id: string;
  category: IntelCategory;
  title: string;
  body: string;
  frequency: IntelFrequency;
  /** lowercase keywords matched against entity label+value text */
  match: string[];
}

export const INTEL_CATEGORY_META: Record<IntelCategory, { label: string; icon: string; order: number }> = {
  pearl: { label: "Clinical pearls", icon: "Lightbulb", order: 1 },
  documentation: { label: "Documentation", icon: "FileText", order: 2 },
  pairing: { label: "Pairing & sequencing", icon: "GitMerge", order: 3 },
  aftercare: { label: "Aftercare & cadence", icon: "CalendarClock", order: 4 },
  screening: { label: "Screening", icon: "ShieldAlert", order: 5 },
  revenue: { label: "Opportunity", icon: "TrendingUp", order: 6 },
};

export const INTEL_LIBRARY: IntelItem[] = [
  {
    id: "i1",
    category: "pearl",
    title: '"Botox didn\'t work" usually means underdosing',
    body: "Perceived non-response is most often prior underdosing or product diffusion — not true resistance. Reassess dose to muscle strength before labeling a non-responder.",
    frequency: "Common",
    match: ["botox", "neuromodulator", "dysport", "tox", "non-response", "underdosed"],
  },
  {
    id: "i2",
    category: "documentation",
    title: "Grade dynamic vs. static rhytids",
    body: "Separate lines that crease on animation from those etched at rest. Conservative dose with a 2-week reassessment preserves natural movement and is the defensible pattern.",
    frequency: "Common",
    match: ["glabellar", "glabella", "forehead", "canthal", "rhytid", "lines", "neuromodulator", "dysport", "botox"],
  },
  {
    id: "i3",
    category: "documentation",
    title: "Dose per area by muscle strength",
    body: "Units selected per area by muscle strength and sex; frontalis dosing balanced against the glabellar complex to avoid brow ptosis.",
    frequency: "Several sources",
    match: ["units", "forehead", "frontalis", "glabella", "neuromodulator", "botox", "dysport"],
  },
  {
    id: "i4",
    category: "pairing",
    title: "Relax muscle before structural filler",
    body: "Treating dynamic muscle first reveals the true volume deficit and prevents movement from displacing fresh product. Tox-first, same-day with filler is common.",
    frequency: "Several sources",
    match: ["filler", "kysse", "restylane", "versa", "lip", "tear", "neuromodulator", "botox", "dysport"],
  },
  {
    id: "i5",
    category: "pairing",
    title: "Neuromodulator + microneedling sequencing",
    body: "An early visible tox result secures buy-in before slower-maturing collagen induction. Microneedling runs as a series; pair with the home routine for texture and pigment.",
    frequency: "Several sources",
    match: ["microneedling", "pdgf", "texture", "melasma", "neuromodulator", "botox"],
  },
  {
    id: "i6",
    category: "pearl",
    title: "Conservative lip placement avoids migration",
    body: "Migration is driven by overfilling and crossing the vermilion border. Place conservatively in the body of the lip; half-syringe trials build trust after a prior poor result.",
    frequency: "Several sources",
    match: ["lip", "kysse", "restylane", "filler", "migration"],
  },
  {
    id: "i7",
    category: "pearl",
    title: "Tear trough is high-regret — differentiate first",
    body: "Disambiguate hollow vs. fat herniation vs. pigment. Filler is reserved for true hollow, placed deep/flat; many experienced injectors stage it after the lips.",
    frequency: "Several sources",
    match: ["tear", "trough", "periorbital", "under-eye", "dark"],
  },
  {
    id: "i8",
    category: "documentation",
    title: "Melasma is managed, not cured",
    body: "Document Fitzpatrick type; choose energy to minimize PIH; frame melasma as managed with strict photoprotection. Sequence resurfacing away from summer sun.",
    frequency: "Common",
    match: ["melasma", "pigment", "halo", "laser", "texture", "tretinoin"],
  },
  {
    id: "i9",
    category: "pairing",
    title: "Schedule resurfacing for fall–winter",
    body: "Lasers like Halo carry sun precautions and downtime; sequencing into lower-sun months protects results and reduces pigment rebound risk.",
    frequency: "Several sources",
    match: ["halo", "laser", "resurfacing", "melasma"],
  },
  {
    id: "i10",
    category: "aftercare",
    title: "Neuromodulator cadence",
    body: "Onset 3–7 days, full effect ~2 weeks; a 2-week review is standard; retreatment anticipated at ~3–4 months.",
    frequency: "Common",
    match: ["botox", "neuromodulator", "dysport", "units"],
  },
  {
    id: "i11",
    category: "aftercare",
    title: "Microneedling series + maintenance",
    body: "Deliver as ~3 sessions spaced 4–6 weeks apart, then transition to 1–2×/year maintenance once skin is balanced. Brief faint redness expected.",
    frequency: "Common",
    match: ["microneedling", "pdgf", "texture"],
  },
  {
    id: "i12",
    category: "aftercare",
    title: "Filler aftercare essentials",
    body: "No exercise of any kind for 24h; avoid blood thinners/alcohol pre-procedure; mild swelling/bruising over a few days is expected and self-limited.",
    frequency: "Several sources",
    match: ["filler", "kysse", "restylane", "versa", "lip", "tear"],
  },
  {
    id: "i13",
    category: "screening",
    title: "Pre-screen before injectables",
    body: "Herpes/cold-sore history → antiviral prophylaxis before lip/facial filler; screen blood thinners and fish oil/aspirin for bruising; pregnancy/breastfeeding is a contraindication.",
    frequency: "Common",
    match: ["filler", "lip", "botox", "neuromodulator", "dysport", "kysse", "contraceptive", "medication"],
  },
  {
    id: "i14",
    category: "revenue",
    title: "Rebook in-room to the interval",
    body: "Frame the retreatment interval as a clinical benchmark, not a sale. Book the return before the patient leaves; loyalty enrollment lifts repeat visits.",
    frequency: "Common",
    match: ["follow", "retreat", "alle", "loyalty", "opportunity", "weeks"],
  },
  {
    id: "i15",
    category: "revenue",
    title: "Plant the second-area seed now",
    body: "Flag one observable secondary concern and document it on a good/better/best phased plan — the future-revenue map — then treat at a later visit.",
    frequency: "Several sources",
    match: ["opportunity", "series", "halo", "tear", "filler", "future"],
  },
];

export interface SelectedIntel extends IntelItem {
  matchedOn: string[];
}

/** Match library items to the patient's extracted entities. */
export function selectIntelligence(entities: ExtractedEntity[], max = 8): SelectedIntel[] {
  const haystack = entities
    .map((e) => `${e.label} ${e.value ?? ""}`.toLowerCase())
    .join(" | ");
  const scored: { item: IntelItem; hits: string[] }[] = [];
  for (const item of INTEL_LIBRARY) {
    const hits = item.match.filter((m) => haystack.includes(m));
    if (hits.length) scored.push({ item, hits });
  }
  scored.sort((a, b) => {
    const byHits = b.hits.length - a.hits.length;
    if (byHits) return byHits;
    return INTEL_CATEGORY_META[a.item.category].order - INTEL_CATEGORY_META[b.item.category].order;
  });
  return scored.slice(0, max).map(({ item, hits }) => ({ ...item, matchedOn: hits }));
}
