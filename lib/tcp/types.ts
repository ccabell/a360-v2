// =============================================================================
// TCP Builder data model — a Treatment & Care Plan assembled from a real
// consultation. The resolver returns ONE TcpPlan; Steps 2–6 each read a slice
// (context → recommendations → education → timeline → tiers → review). HITL
// state (accept/reject/select/chosen tier) lives in DemoRunContext.data, layered
// on top of the resolved plan — the plan itself is deterministic.
//
// Grounding: recommendations + education + pairing rationale come from real
// Global V3 data (item_concerns / item_relationships / fuel). Timing fields are
// partly seeded (see scripts/tcp-timing-seed.sql); each timing line is tagged
// real|illustrative. Pricing is synthetic and always labeled illustrative.
// =============================================================================

export type FitSignal = "ideal" | "strong" | "consider";
export type RecSource = "agreed" | "discussed" | "recommended" | "gl_suggested";
export type TimingSource = "real" | "illustrative";
export type TierKey = "good" | "better" | "best";

/** Step-1 grounding — straight from the consultation extraction. */
export interface ConsultationContext {
  goals: string[];
  primaryConcern: string;
  concerns: { label: string; area?: string }[];
  treatmentAreas: string[];
  signalTags: { key: string; label: string; tone: "positive" | "caution" | "neutral" }[];
  objections: string[];
  conversion: { status: string; label: string; summary: string };
  /** Optional hard date that drives the roadmap (e.g. a wedding). */
  deadline?: { label: string; date: string; weeksAway?: number };
}

/** A recommended product/service matched to the patient's concerns/anatomy. */
export interface TcpRecommendation {
  id: string;
  productId?: string;
  name: string;
  kind: string; // "Dermal filler", "Biostimulator", "Neuromodulator", "Energy device"…
  area: string; // "Nasolabial folds"
  concern: string; // "Volume loss"
  fit: FitSignal;
  fdaIndicated: boolean;
  pairingTier?: "canonical" | "common";
  rationale: string; // clinical_rationale (real GL text)
  source: RecSource;
  /** Whether it starts accepted in the HITL list. */
  defaultAccepted: boolean;
}

/** A selectable education block attachable to a treatment. */
export interface EducationBlock {
  id: string;
  recommendationId?: string;
  forName?: string; // display: which treatment it supports
  title: string;
  category: "mechanism" | "expectations" | "safety" | "aftercare";
  body: string; // patient_education_text / fuel-derived (real where available)
  defaultSelected: boolean;
}

/** A placed step on the roadmap. */
export interface TimelineEntry {
  id: string;
  recommendationId?: string;
  whenLabel: string; // "Today", "Weeks 2–6", "8 weeks out"
  offsetWeeks: number; // for ordering / positioning
  title: string; // "Sculptra — Session 1 (cheeks)"
  detail: string;
  timingWhy: string; // the explanation
  timingSource: TimingSource;
  sameSessionOk?: boolean; // can be combined with the visit it shares
  combineWith?: string[]; // recommendation ids combinable same-session
}

export interface Tier {
  key: TierKey;
  label: string; // "Targeted correction"
  recommendationIds: string[];
  narrative: string; // "what this plan buys you"
  timelineFit: string; // how it lands the deadline
  price: { min: number; max: number; display: string; note: "illustrative" };
}

/** Optional addressable transcript slice for source-linking rationale. */
export interface TranscriptSegment {
  id: string;
  speaker: "Provider" | "Patient" | "Staff";
  text: string;
  t?: string;
}

export interface TcpPlan {
  source: "cached" | "live";
  patientName: string;
  visitType: string;
  visitDate: string;
  provider: string;
  location: string;
  context: ConsultationContext;
  recommendations: TcpRecommendation[];
  education: EducationBlock[];
  timeline: TimelineEntry[];
  tiers: Tier[];
  segments?: TranscriptSegment[];
}

/** Fully-authored, deterministic demo data for one patient. */
export interface TcpFixture extends Omit<TcpPlan, "source"> {
  patientId: string;
}

export interface TcpResolveRequest {
  patientId: string;
  consultationId?: string;
}

// --- TCP-specific run state (lives in DemoRunContext.data.tcp) ---------------

export interface TcpRunState {
  /** recommendation id → included in the plan */
  included: Record<string, boolean>;
  /** recommendation id → quantity (units / syringes / vials / sessions) */
  qty: Record<string, number>;
  /** recommendation id → per-unit price override */
  priceOverride: Record<string, number>;
  /** package discount applied to the plan total */
  discountPercent: number;
  /** financing term in months */
  paymentTermMonths: number;
  finalized?: boolean;
}

export const EMPTY_TCP_STATE: TcpRunState = {
  included: {},
  qty: {},
  priceOverride: {},
  discountPercent: 0,
  paymentTermMonths: 12,
};

export function getTcpState(data: Record<string, unknown>): TcpRunState {
  return (data.tcp as TcpRunState) ?? EMPTY_TCP_STATE;
}

// --- Display helpers ---------------------------------------------------------

export const FIT_META: Record<FitSignal, { label: string; tone: string }> = {
  ideal: { label: "Ideal fit", tone: "emerald" },
  strong: { label: "Strong fit", tone: "sky" },
  consider: { label: "Worth considering", tone: "amber" },
};

export const TIER_ACCENT = "#F5A623";
