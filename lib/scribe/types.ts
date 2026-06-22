// =============================================================================
// Scribe data model — one consultation transcript fans out into many clinical
// record types. Records are addressable down to the line so the UI can (a)
// reveal progressively and (b) link any line back to the transcript segment
// that grounds it ("source linking").
// =============================================================================

export type RecordType =
  | "soap"
  | "procedure"
  | "patient_summary"
  | "referral"
  | "coding";

export type NoteLength = "concise" | "standard" | "comprehensive";
export type NoteFormat = "paragraph" | "bulleted";

export interface ScribeStyle {
  length: NoteLength;
  format: NoteFormat;
}

/** A speaker-attributed, addressable slice of the consultation transcript. */
export interface TranscriptSegment {
  id: string; // "t1", "t2" — referenced by RecordLine.sources
  speaker: "Provider" | "Patient" | "Staff";
  text: string;
  t?: string; // optional timestamp label, e.g. "00:42"
}

/** A single line of a record. `sources` ground it in transcript segments. */
export interface RecordLine {
  text: string;
  sources?: string[]; // transcript segment ids
  strong?: boolean;
  /** Inferred recommendation, not a transcript fact — render "AI suggestion — verify". */
  inferred?: boolean;
}

export interface CodeItem {
  code: string;
  system: "CPT" | "ICD-10" | "HCPCS" | "E&M";
  label: string;
  sources?: string[];
}

export interface OpportunityItem {
  title: string;
  rationale: string;
  horizon: "today" | "next_visit" | "future";
  value?: string;
  sources?: string[];
}

export interface RecordSection {
  id: string;
  heading: string;
  lines?: RecordLine[];
  codes?: CodeItem[];
  opportunities?: OpportunityItem[];
  /** Required by the note style's schema (drives compliance/missing checks). */
  required?: boolean;
  /** No supporting evidence in the transcript — render "Not documented in transcript". */
  notDocumented?: boolean;
}

export interface ClinicalRecord {
  /** RecordType for the companion fan-out, or a NoteStyle key for the primary note. */
  type: string;
  title: string;
  /** Short descriptor shown under the tab title. */
  subtitle?: string;
  sections: RecordSection[];
  /** True for the Internal Opportunity Summary — not part of the medical record. */
  internalOnly?: boolean;
}

/** Fully-authored, deterministic demo data for one patient. */
export interface ScribeFixture {
  patientId: string;
  patientName: string;
  visitType: string;
  visitDate: string;
  provider: string;
  location: string;
  segments: TranscriptSegment[];
  records: Partial<Record<RecordType, ClinicalRecord>>;
  /** Cached primary notes keyed by NoteStyle key (e.g. "injectable"). */
  styleNotes?: Record<string, ClinicalRecord>;
}

export interface ScribeGenerateRequest {
  patientId: string;
  consultationId?: string;
  /** Primary note style key (from NOTE_STYLES). Drives the note's sections. */
  noteStyle?: string;
  /** Companion fan-out outputs to also generate. */
  recordTypes: RecordType[];
  style: ScribeStyle;
}

export interface ScribeGenerateResponse {
  source: "cached" | "live";
  patientName: string;
  visitType: string;
  visitDate: string;
  provider: string;
  location: string;
  segments: TranscriptSegment[];
  records: ClinicalRecord[];
}

// --- Taxonomy: the fan-out menu (Step 2) -------------------------------------

export interface RecordTypeMeta {
  key: RecordType;
  label: string;
  blurb: string;
  /** lucide icon name resolved in the component */
  icon: string;
  defaultOn: boolean;
  /** Marketing-grade "why this matters" for the demo. */
  tag?: string;
}

export const RECORD_TYPES: RecordTypeMeta[] = [
  {
    key: "soap",
    label: "SOAP Note",
    blurb: "Subjective · Objective · Assessment · Plan — the chart-ready clinical note.",
    icon: "Stethoscope",
    defaultOn: true,
    tag: "Clinical record",
  },
  {
    key: "procedure",
    label: "Cosmetic Procedure Note",
    blurb: "Aesthetics-native: injection map, units, product & lot per area.",
    icon: "Syringe",
    defaultOn: true,
    tag: "Aesthetics-native",
  },
  {
    key: "patient_summary",
    label: "Patient After-Visit Summary",
    blurb: "Plain-language recap and aftercare the patient takes home.",
    icon: "HeartPulse",
    defaultOn: true,
    tag: "Patient-facing",
  },
  {
    key: "referral",
    label: "Provider Letter",
    blurb: "Referral / continuity letter to a treating or referring provider.",
    icon: "Mail",
    defaultOn: false,
    tag: "External",
  },
  {
    key: "coding",
    label: "Coding & Opportunities",
    blurb: "Suggested codes plus extracted revenue opportunities, each evidence-linked.",
    icon: "Receipt",
    defaultOn: true,
    tag: "Revenue",
  },
];

export const NOTE_LENGTHS: { key: NoteLength; label: string }[] = [
  { key: "concise", label: "Concise" },
  { key: "standard", label: "Standard" },
  { key: "comprehensive", label: "Comprehensive" },
];

export const NOTE_FORMATS: { key: NoteFormat; label: string }[] = [
  { key: "paragraph", label: "Paragraph" },
  { key: "bulleted", label: "Bulleted" },
];
