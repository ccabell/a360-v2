import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { getConsultation, getTranscript } from "@/lib/api/ops-store";
import { opsSupabase } from "@/lib/supabase";
import { getFixture } from "./fixtures";

// =============================================================================
// Light, REAL entity extraction — transcript → core clinical fields. Visible in
// the demo as the AI pipeline step that feeds note generation. Cached for hero
// patients (deterministic, source-linked); live Claude for the rest.
// =============================================================================

export type EntityCategory =
  | "concern"
  | "treatment"
  | "product"
  | "anatomy"
  | "dose"
  | "medication"
  | "followup"
  | "opportunity"
  | "context";

export interface ExtractedEntity {
  id: string;
  category: EntityCategory;
  label: string;
  value?: string;
  confidence: number; // 0..1
  sources: string[]; // transcript segment ids
}

export interface ExtractionResult {
  source: "cached" | "live";
  patientId: string;
  chiefConcern: string;
  entities: ExtractedEntity[];
}

export const CATEGORY_META: Record<
  EntityCategory,
  { label: string; icon: string; order: number }
> = {
  concern: { label: "Concerns", icon: "Target", order: 1 },
  treatment: { label: "Treatments", icon: "Syringe", order: 2 },
  product: { label: "Products", icon: "Package", order: 3 },
  dose: { label: "Dosing", icon: "Gauge", order: 4 },
  anatomy: { label: "Anatomy", icon: "MapPin", order: 5 },
  medication: { label: "Medications", icon: "Pill", order: 6 },
  followup: { label: "Follow-up", icon: "CalendarClock", order: 7 },
  opportunity: { label: "Opportunities", icon: "TrendingUp", order: 8 },
  context: { label: "Context", icon: "Info", order: 9 },
};

// --- Cached, source-linked extractions for hero patients ---------------------

const CACHED_EXTRACTIONS: Record<string, Omit<ExtractionResult, "source">> = {
  // Sofia Reyes
  "3f7bfaf1-b60a-4afd-ae8b-1e82244a2180": {
    patientId: "3f7bfaf1-b60a-4afd-ae8b-1e82244a2180",
    chiefConcern: "Maintenance touch-up + midface texture and temporal melasma",
    entities: [
      { id: "e1", category: "concern", label: "Dynamic glabellar lines", value: "returns on animation", confidence: 0.96, sources: ["t2"] },
      { id: "e2", category: "concern", label: "Lateral canthal asymmetry", value: "right > left", confidence: 0.93, sources: ["t2"] },
      { id: "e3", category: "concern", label: "Midface textural irregularity", confidence: 0.9, sources: ["t6"] },
      { id: "e4", category: "concern", label: "Temporal melasma", value: "hormonally influenced", confidence: 0.88, sources: ["t6", "t7"] },
      { id: "e5", category: "treatment", label: "Neuromodulator touch-up", confidence: 0.98, sources: ["t11", "t14"] },
      { id: "e6", category: "treatment", label: "Full-face microneedling", value: "1.5mm", confidence: 0.97, sources: ["t11", "t15"] },
      { id: "e7", category: "product", label: "onabotulinumtoxinA", confidence: 0.98, sources: ["t11"] },
      { id: "e8", category: "product", label: "PDGF growth-factor serum", confidence: 0.94, sources: ["t7", "t17"] },
      { id: "e9", category: "product", label: "Bruise cream", value: "dispensed", confidence: 0.9, sources: ["t13", "t17"] },
      { id: "e10", category: "dose", label: "Total neuromodulator", value: "12 units", confidence: 0.97, sources: ["t11"] },
      { id: "e11", category: "anatomy", label: "Glabella · forehead · lateral canthi", confidence: 0.95, sources: ["t11"] },
      { id: "e12", category: "anatomy", label: "Cheeks · temples", value: "microneedling focus", confidence: 0.92, sources: ["t15"] },
      { id: "e13", category: "medication", label: "Progestin oral contraceptive", confidence: 0.91, sources: ["t7", "t8"] },
      { id: "e14", category: "medication", label: "Tretinoin", value: "3 nights/week", confidence: 0.9, sources: ["t8"] },
      { id: "e15", category: "followup", label: "Full neuromodulator", value: "~4 weeks", confidence: 0.95, sources: ["t19"] },
      { id: "e16", category: "followup", label: "Microneedling session 2", value: "~6 weeks", confidence: 0.92, sources: ["t19"] },
      { id: "e17", category: "opportunity", label: "Microneedling series", value: "~$1,200", confidence: 0.84, sources: ["t15", "t19"] },
      { id: "e18", category: "opportunity", label: "Alle loyalty re-engagement", confidence: 0.8, sources: ["t19"] },
    ],
  },
  // Amara Okafor
  "0c6053d5-6851-4542-898e-9e8f4a6efc53": {
    patientId: "0c6053d5-6851-4542-898e-9e8f4a6efc53",
    chiefConcern: "New-patient consultation — lines, lip enhancement, periorbital concerns",
    entities: [
      { id: "e1", category: "concern", label: "Forehead & glabellar lines", confidence: 0.95, sources: ["t4"] },
      { id: "e2", category: "concern", label: "Lip fullness desired", value: "natural", confidence: 0.93, sources: ["t4", "t6"] },
      { id: "e3", category: "concern", label: "Periorbital darkness / hollowing", confidence: 0.9, sources: ["t4", "t8"] },
      { id: "e4", category: "context", label: "Prior neuromodulator non-response", value: "likely underdosed", confidence: 0.9, sources: ["t2", "t3"] },
      { id: "e5", category: "context", label: "Prior filler migration", value: "above vermillion border", confidence: 0.89, sources: ["t2"] },
      { id: "e6", category: "context", label: "Recent bereavement", value: "emotionally vulnerable — phase the plan", confidence: 0.86, sources: ["t12", "t13"] },
      { id: "e7", category: "treatment", label: "Dysport", value: "booked", confidence: 0.96, sources: ["t5", "t14"] },
      { id: "e8", category: "treatment", label: "Restylane Kysse — lips", value: "planned, 0.5 syringe", confidence: 0.9, sources: ["t7"] },
      { id: "e9", category: "treatment", label: "Tear-trough filler", value: "future, sequenced", confidence: 0.8, sources: ["t9"] },
      { id: "e10", category: "treatment", label: "Halo resurfacing", value: "fall", confidence: 0.82, sources: ["t11"] },
      { id: "e11", category: "anatomy", label: "Forehead · glabella", confidence: 0.93, sources: ["t5"] },
      { id: "e12", category: "anatomy", label: "Lips · tear troughs", confidence: 0.9, sources: ["t7", "t9"] },
      { id: "e13", category: "followup", label: "Phased plan, patient-led pace", confidence: 0.88, sources: ["t13", "t15"] },
      { id: "e14", category: "opportunity", label: "Lip filler conversion", value: "~$650", confidence: 0.85, sources: ["t7", "t15"] },
      { id: "e15", category: "opportunity", label: "Halo resurfacing", value: "~$1,500", confidence: 0.78, sources: ["t11"] },
    ],
  },
};

// --- Resolver ----------------------------------------------------------------

export async function resolveExtraction(
  patientId: string,
  consultationId?: string,
): Promise<ExtractionResult> {
  const cached = CACHED_EXTRACTIONS[patientId];
  if (cached) return { source: "cached", ...cached };
  return liveExtract(patientId, consultationId);
}

async function liveExtract(
  patientId: string,
  consultationId?: string,
): Promise<ExtractionResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) throw new Error("Extraction unavailable (no API key).");

  let cid = consultationId;
  if (!cid) {
    const { data } = await opsSupabase
      .from("consultations")
      .select("id")
      .eq("patient_id", patientId)
      .order("started_at", { ascending: false })
      .limit(1);
    cid = data?.[0]?.id;
  }
  if (!cid) throw new Error("No consultation found.");

  const transcript = await getTranscript(cid);
  const text = transcript?.transcript_enhanced || transcript?.transcript_raw || "";
  if (!text) throw new Error("No transcript available.");

  const anthropic = createAnthropic({ apiKey });
  const { text: out } = await generateText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system:
      "Extract core clinical entities from an aesthetics consultation transcript. " +
      "Only what is stated. Output strict JSON.",
    prompt: [
      `Transcript:\n"""${text.slice(0, 12000)}"""`,
      ``,
      `Return JSON: {"chiefConcern":"...","entities":[{"category","label","value","confidence"}]}`,
      `categories: concern, treatment, product, anatomy, dose, medication, followup, opportunity, context.`,
      `confidence is 0..1. Keep to the most important ~12-16 entities.`,
    ].join("\n"),
    temperature: 0.2,
    maxOutputTokens: 1800,
  });

  let parsed: { chiefConcern?: string; entities?: Partial<ExtractedEntity>[] } = {};
  try {
    parsed = JSON.parse(out.slice(out.indexOf("{"), out.lastIndexOf("}") + 1));
  } catch {
    parsed = { chiefConcern: "Consultation", entities: [] };
  }

  const entities: ExtractedEntity[] = (parsed.entities ?? []).map((e, i) => ({
    id: `e${i + 1}`,
    category: (e.category as EntityCategory) ?? "concern",
    label: e.label ?? "—",
    value: e.value,
    confidence: typeof e.confidence === "number" ? e.confidence : 0.8,
    sources: [],
  }));

  // Best-effort: persist the real extraction to Ops (demonstrates the pipeline).
  try {
    const consult = await getConsultation(cid);
    await opsSupabase.from("extractions").insert({
      consultation_id: cid,
      practice_id: consult.practice_id,
      model: "claude-haiku-4-5-20251001",
      status: "completed",
      outputs: { chiefConcern: parsed.chiefConcern, entities },
      is_verified: false,
    });
  } catch {
    // Persistence is non-critical for the demo.
  }

  return {
    source: "live",
    patientId,
    chiefConcern: parsed.chiefConcern ?? "Consultation",
    entities,
  };
}
