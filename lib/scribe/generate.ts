import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { getConsultation, getTranscript } from "@/lib/api/ops-store";
import { opsSupabase } from "@/lib/supabase";
import { getFixture } from "./fixtures";
import { getNoteStyle } from "./note-styles";
import type {
  ClinicalRecord,
  RecordSection,
  ScribeFixture,
  ScribeGenerateRequest,
  ScribeGenerateResponse,
  TranscriptSegment,
} from "./types";

// ---------------------------------------------------------------------------
// Style-aware, cached-first resolver. The selected note style(s) drive the
// note's sections. Cached style-notes are stage-safe; mapped fixture records
// reuse existing cached content; everything else is live schema-driven and
// marks required-but-unsupported sections "Not documented in transcript".
// ---------------------------------------------------------------------------

/** Note style key → existing fixture record key (reuse cached content). */
const STYLE_TO_RECORD: Record<string, string> = {
  soap: "soap",
  procedure: "procedure",
  patient_friendly: "patient_summary",
  internal_opportunity: "coding",
  provider_letter: "referral",
};

export async function resolveScribe(
  req: ScribeGenerateRequest,
): Promise<ScribeGenerateResponse> {
  const styleKeys =
    req.recordTypes && req.recordTypes.length
      ? (req.recordTypes as string[])
      : [req.noteStyle ?? "soap"];

  const fixture = getFixture(req.patientId);

  if (fixture) {
    const records: ClinicalRecord[] = [];
    let anyLive = false;
    for (const key of styleKeys.slice(0, 4)) {
      const cached = cachedStyleRecord(fixture, key);
      if (cached) {
        records.push(cached);
      } else {
        records.push(await liveStyleNote(transcriptText(fixture), key, fixture.segments));
        anyLive = true;
      }
    }
    return {
      source: anyLive ? "live" : "cached",
      patientName: fixture.patientName,
      visitType: fixture.visitType,
      visitDate: fixture.visitDate,
      provider: fixture.provider,
      location: fixture.location,
      segments: fixture.segments,
      records,
    };
  }

  return liveGenerate(req, styleKeys.slice(0, 4));
}

function cachedStyleRecord(fixture: ScribeFixture, key: string): ClinicalRecord | null {
  const styleNote = fixture.styleNotes?.[key];
  if (styleNote) return styleNote;
  const recKey = STYLE_TO_RECORD[key];
  if (recKey && fixture.records[recKey as keyof typeof fixture.records]) {
    const rec = fixture.records[recKey as keyof typeof fixture.records]!;
    const style = getNoteStyle(key);
    return { ...rec, type: key, title: style?.label ?? rec.title, internalOnly: style?.internalOnly };
  }
  return null;
}

function transcriptText(fixture: ScribeFixture): string {
  return fixture.segments.map((s) => `${s.speaker}: ${s.text}`).join("\n");
}

// ---------------------------------------------------------------------------
// Live generation
// ---------------------------------------------------------------------------

async function liveGenerate(
  req: ScribeGenerateRequest,
  styleKeys: string[],
): Promise<ScribeGenerateResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Live generation unavailable (no ANTHROPIC_API_KEY). Use a cached demo patient.",
    );
  }

  const { data: patient } = await opsSupabase
    .from("patients")
    .select("first_name, last_name")
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
  const text = transcript?.transcript_enhanced || transcript?.transcript_raw || "";
  if (!text) throw new Error("No transcript available for this consultation.");

  const segments = splitTranscript(text);
  const records: ClinicalRecord[] = [];
  for (const key of styleKeys) {
    records.push(await liveStyleNote(text.slice(0, 12000), key, segments));
  }

  return {
    source: "live",
    patientName: patient ? `${patient.first_name} ${patient.last_name}` : "Patient",
    visitType: titleCase(consult.consult_type ?? "Visit"),
    visitDate: (consult.started_at ?? new Date().toISOString()).slice(0, 10),
    provider: "Provider",
    location: "Orange Twist",
    segments,
    records,
  };
}

/** Generate one note for a style from the transcript, per the style's schema. */
async function liveStyleNote(
  transcript: string,
  styleKey: string,
  _segments: TranscriptSegment[],
): Promise<ClinicalRecord> {
  const style = getNoteStyle(styleKey);
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.AI_GATEWAY_API_KEY;

  // Fallback skeleton if no style or no key — required sections notDocumented.
  if (!style || !apiKey) {
    return skeleton(styleKey, style?.label ?? "Clinical Note");
  }

  const schema = style.sections.map((s) => `${s.id}: ${s.heading}${s.required ? " (required)" : ""}`).join("\n");
  try {
    const anthropic = createAnthropic({ apiKey });
    const { text } = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system:
        "You are an aesthetic-medicine clinical scribe. Fill ONLY from the transcript. " +
        "Never invent product, dose, lot, site, technique, consent, or adverse-event status. " +
        "If a section has no supporting evidence, mark it not documented. Do not imply consent " +
        "was obtained or that there were no complications unless explicitly stated. Output JSON only.",
      prompt: [
        `Transcript:\n"""${transcript}"""`,
        ``,
        `Note style: ${style.label}. Produce these sections in order:`,
        schema,
        ``,
        `Return JSON: {"sections":[{"id","heading","lines":[{"text"}],"notDocumented":false}]}`,
        `For sections with no transcript evidence set "notDocumented": true and omit lines.`,
        `Mark inferred recommendations with "inferred": true on the line.`,
      ].join("\n"),
      temperature: 0.2,
      maxOutputTokens: 2200,
    });
    const parsed = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)) as {
      sections?: RecordSection[];
    };
    const byId = new Map((parsed.sections ?? []).map((s) => [s.id, s]));
    // Rebuild in schema order, enforcing required flags.
    const sections: RecordSection[] = style.sections.map((def) => {
      const got = byId.get(def.id);
      if (got && (got.lines?.length || got.codes || got.opportunities)) {
        return { ...got, heading: def.heading, required: def.required };
      }
      return { id: def.id, heading: def.heading, required: def.required, notDocumented: true };
    });
    return { type: styleKey, title: style.label, subtitle: "Live · transcript-grounded", sections, internalOnly: style.internalOnly };
  } catch {
    return skeleton(styleKey, style.label);
  }
}

function skeleton(styleKey: string, title: string): ClinicalRecord {
  const style = getNoteStyle(styleKey);
  const sections: RecordSection[] = (style?.sections ?? [{ id: "note", heading: "Note" }]).map((s) => ({
    id: s.id,
    heading: s.heading,
    required: s.required,
    notDocumented: true,
  }));
  return { type: styleKey, title, subtitle: "Schema — awaiting evidence", sections, internalOnly: style?.internalOnly };
}

function splitTranscript(text: string): TranscriptSegment[] {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean).slice(0, 40);
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
    return { id: `t${i + 1}`, speaker: speaker as TranscriptSegment["speaker"], text: m ? m[2] : line };
  });
}

function titleCase(s: string): string {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
