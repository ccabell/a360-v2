import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { getConsultation, getTranscript } from "@/lib/api/ops-store";
import { opsSupabase } from "@/lib/supabase";
import { getFixture } from "./fixtures";
import type {
  ClinicalRecord,
  RecordType,
  ScribeGenerateRequest,
  ScribeGenerateResponse,
  ScribeStyle,
  TranscriptSegment,
} from "./types";
import { RECORD_TYPES } from "./types";

// ---------------------------------------------------------------------------
// Cached-first resolver. Cached fixtures are the stage-safe default; live
// generation is a best-effort fallback for non-fixture patients.
// ---------------------------------------------------------------------------

export async function resolveScribe(
  req: ScribeGenerateRequest,
): Promise<ScribeGenerateResponse> {
  const fixture = getFixture(req.patientId);

  if (fixture) {
    const records = req.recordTypes
      .map((t) => fixture.records[t])
      .filter((r): r is ClinicalRecord => Boolean(r));
    return {
      source: "cached",
      patientName: fixture.patientName,
      visitType: fixture.visitType,
      visitDate: fixture.visitDate,
      provider: fixture.provider,
      location: fixture.location,
      segments: fixture.segments,
      records,
    };
  }

  return liveGenerate(req);
}

// ---------------------------------------------------------------------------
// Live generation — used only when no fixture exists. Produces records from the
// real consultation transcript. No source links (alignment is fixture-only).
// ---------------------------------------------------------------------------

async function liveGenerate(
  req: ScribeGenerateRequest,
): Promise<ScribeGenerateResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Live generation unavailable (no ANTHROPIC_API_KEY). Use a cached demo patient.",
    );
  }

  // Resolve consultation + transcript
  const { data: patient } = await opsSupabase
    .from("patients")
    .select("first_name, last_name, biological_sex, birth_date")
    .eq("id", req.patientId)
    .single();

  let consultationId = req.consultationId;
  if (!consultationId) {
    const { data: consults } = await opsSupabase
      .from("consultations")
      .select("id")
      .eq("patient_id", req.patientId)
      .order("started_at", { ascending: false })
      .limit(1);
    consultationId = consults?.[0]?.id;
  }
  if (!consultationId) throw new Error("No consultation found for patient.");

  const consult = await getConsultation(consultationId);
  const transcript = await getTranscript(consultationId);
  const transcriptText =
    transcript?.transcript_enhanced || transcript?.transcript_raw || "";
  if (!transcriptText) throw new Error("No transcript available for this consultation.");

  const segments = splitTranscript(transcriptText);
  const patientName = patient
    ? `${patient.first_name} ${patient.last_name}`
    : "Patient";

  const anthropic = createAnthropic({ apiKey });
  const requested = RECORD_TYPES.filter((m) => req.recordTypes.includes(m.key));

  const prompt = buildLivePrompt(
    transcriptText.slice(0, 14000),
    requested.map((r) => r.label),
    req.style,
  );

  const { text } = await generateText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system:
      "You are a clinical documentation assistant for a medical aesthetics practice. " +
      "Produce accurate, concise records grounded ONLY in the transcript. Never invent " +
      "findings. Output strict JSON.",
    prompt,
    temperature: 0.2,
    maxOutputTokens: 3500,
  });

  const records = parseLiveRecords(text, req.recordTypes);

  return {
    source: "live",
    patientName,
    visitType: titleCase(consult.consult_type ?? "Visit"),
    visitDate: (consult.started_at ?? new Date().toISOString()).slice(0, 10),
    provider: "Provider",
    location: "Orange Twist",
    segments,
    records,
  };
}

function buildLivePrompt(
  transcript: string,
  recordLabels: string[],
  style: ScribeStyle,
): string {
  return [
    `Transcript:\n"""${transcript}"""`,
    ``,
    `Produce these records: ${recordLabels.join(", ")}.`,
    `Length: ${style.length}. Format: ${style.format}.`,
    ``,
    `Return JSON only, shape:`,
    `{"records":[{"type":"soap","title":"SOAP Note","sections":[{"id":"s","heading":"Subjective","lines":[{"text":"..."}]}]}]}`,
    `Valid types: soap, procedure, patient_summary, referral, coding.`,
    `For coding, use sections with "codes":[{"code","system","label"}] and "opportunities":[{"title","rationale","horizon","value"}].`,
  ].join("\n");
}

function parseLiveRecords(text: string, requested: RecordType[]): ClinicalRecord[] {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    const json = JSON.parse(text.slice(start, end + 1));
    const records = (json.records ?? []) as ClinicalRecord[];
    return records.filter((r) => requested.includes(r.type));
  } catch {
    // Last-resort: wrap raw text as a single SOAP-ish record so the UI renders.
    return [
      {
        type: "soap",
        title: "Clinical Note",
        sections: [
          { id: "note", heading: "Note", lines: [{ text: text.slice(0, 4000) }] },
        ],
      },
    ];
  }
}

// Split a flat transcript into addressable, speaker-attributed segments.
function splitTranscript(text: string): TranscriptSegment[] {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 40);
  return lines.map((line, i) => {
    const m = line.match(/^(provider|patient|staff|doctor|nurse|np|md)\s*[:\-]\s*(.*)$/i);
    const speaker = m
      ? /patient/i.test(m[1])
        ? "Patient"
        : /staff|nurse/i.test(m[1])
          ? "Staff"
          : "Provider"
      : i % 2 === 0
        ? "Provider"
        : "Patient";
    return {
      id: `t${i + 1}`,
      speaker: speaker as TranscriptSegment["speaker"],
      text: m ? m[2] : line,
    };
  });
}

function titleCase(s: string): string {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
