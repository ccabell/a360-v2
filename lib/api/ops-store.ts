/**
 * Ops Store data access — server-side only.
 * Reads from Supabase project uedajrdzcjfrmbiznflf via service role key.
 */

import { opsSupabase } from "@/lib/supabase";
import type {
  OpsPatient,
  OpsConsultation,
  OpsTranscript,
  OpsExtraction,
  OpsAgentOutput,
  OpsAgent,
  OpsPatientDetail,
  PatientIntelligence,
} from "@/lib/types";

// --- Patients ---

export async function listPatients(opts: {
  limit?: number;
  offset?: number;
  q?: string;
} = {}) {
  const limit = opts.limit ?? 50;
  const offset = opts.offset ?? 0;

  let query = opsSupabase
    .from("patients")
    .select("*", { count: "exact" })
    .eq("is_active", true)
    .order("last_consultation_at", { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1);

  if (opts.q?.trim()) {
    const q = opts.q.trim();
    query = query.or(`first_name.ilike.%${q}%,last_name.ilike.%${q}%`);
  }

  const { data, count, error } = await query;
  if (error) throw new Error(`ops-store patients: ${error.message}`);
  return { data: (data ?? []) as OpsPatient[], total: count ?? 0 };
}

export async function getPatient(id: string): Promise<OpsPatientDetail> {
  // Patient
  const { data: patient, error: pErr } = await opsSupabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();
  if (pErr || !patient) throw new Error(pErr?.message ?? "Patient not found");

  // Consultations for this patient
  const { data: consults } = await opsSupabase
    .from("consultations")
    .select("*")
    .eq("patient_id", id)
    .order("started_at", { ascending: false });

  const consultationIds = (consults ?? []).map((c) => c.id);

  // Transcripts + verified extractions for these consultations (parallel)
  const [transcriptsRes, extractionsRes] = await Promise.all([
    consultationIds.length
      ? opsSupabase
          .from("consultation_transcripts")
          .select("*")
          .in("consultation_id", consultationIds)
      : { data: [] as OpsTranscript[] },
    consultationIds.length
      ? opsSupabase
          .from("extractions")
          .select("*")
          .in("consultation_id", consultationIds)
          .eq("is_verified", true)
          .order("created_at", { ascending: false })
      : { data: [] as OpsExtraction[] },
  ]);

  const transcriptMap = new Map(
    ((transcriptsRes.data ?? []) as OpsTranscript[]).map((t) => [t.consultation_id, t]),
  );
  // One verified extraction per consultation (most recent)
  const extractionMap = new Map<string, OpsExtraction>();
  for (const e of (extractionsRes.data ?? []) as OpsExtraction[]) {
    if (!extractionMap.has(e.consultation_id)) {
      extractionMap.set(e.consultation_id, e);
    }
  }

  const consultations = ((consults ?? []) as OpsConsultation[]).map((c) => ({
    ...c,
    transcript: transcriptMap.get(c.id) ?? null,
    extraction: extractionMap.get(c.id) ?? null,
  }));

  // Patient intelligence view
  const { data: intel } = await opsSupabase
    .from("patient_intelligence")
    .select("*")
    .eq("patient_id", id)
    .maybeSingle();

  return {
    ...(patient as OpsPatient),
    consultations,
    intelligence: (intel as PatientIntelligence) ?? null,
  };
}

// --- Consultations ---

export async function getConsultation(id: string) {
  const { data, error } = await opsSupabase
    .from("consultations")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(`ops-store consultation: ${error.message}`);
  return data as OpsConsultation;
}

// --- Transcripts ---

export async function getTranscript(consultationId: string) {
  const { data, error } = await opsSupabase
    .from("consultation_transcripts")
    .select("*")
    .eq("consultation_id", consultationId)
    .maybeSingle();
  if (error) throw new Error(`ops-store transcript: ${error.message}`);
  return data as OpsTranscript | null;
}

// --- Extractions ---

export async function getVerifiedExtraction(consultationId: string) {
  const { data, error } = await opsSupabase
    .from("extractions")
    .select("*")
    .eq("consultation_id", consultationId)
    .eq("is_verified", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`ops-store extraction: ${error.message}`);
  return data as OpsExtraction | null;
}

// --- Agent outputs ---

export async function listAgentOutputs(patientId: string) {
  const { data, error } = await opsSupabase
    .from("agent_outputs")
    .select("*")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`ops-store agent_outputs: ${error.message}`);
  return (data ?? []) as OpsAgentOutput[];
}

// --- Agents registry (ops store copy) ---

export async function listOpsAgents() {
  const { data, error } = await opsSupabase
    .from("agents")
    .select("id, agent_key, name, description, category, type, status, model, execution_target, owner, created_at")
    .eq("status", "active")
    .order("name");
  if (error) throw new Error(`ops-store agents: ${error.message}`);
  return (data ?? []) as OpsAgent[];
}
