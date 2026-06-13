// =============================================================================
// Ops Store types — matches Supabase project uedajrdzcjfrmbiznflf
// Server-side only (service role key required due to RLS).
// =============================================================================

export interface OpsPatient {
  id: string;
  practice_id: string;
  expert_id: string | null;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  birth_date: string | null;
  biological_sex: string | null;
  gender_identity: string | null;
  ethnicity: string | null;
  email: string | null;
  phone: string | null;
  photo_url: string | null;
  patient_summary: string | null;
  medical_history: string | null;
  questionnaire: Record<string, unknown> | null;
  is_active: boolean;
  last_consultation_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OpsConsultation {
  id: string;
  patient_id: string | null;
  practice_id: string;
  expert_id: string | null;
  status: string | null;
  consult_type: string | null;
  consult_number: number | null;
  started_at: string | null;
  finished_at: string | null;
  duration_minutes: number | null;
  details: string | null;
  created_at: string;
  updated_at: string;
}

export interface OpsTranscript {
  id: string;
  consultation_id: string;
  practice_id: string;
  transcript_raw: string | null;
  transcript_segments: unknown[] | null;
  transcript_enhanced: string | null;
  transcript_summary: string | null;
  source: string | null;
  created_at: string;
}

export interface OpsExtraction {
  id: string;
  consultation_id: string;
  practice_id: string;
  prompt_set_id: string | null;
  model: string | null;
  status: string | null;
  outputs: Record<string, unknown>;
  is_verified: boolean;
  created_at: string;
}

export interface OpsAgentOutput {
  id: string;
  consultation_id: string | null;
  patient_id: string | null;
  practice_id: string;
  agent_key: string;
  agent_version: string | null;
  input_envelope: Record<string, unknown> | null;
  result: Record<string, unknown> | null;
  evidence_used: Record<string, unknown> | null;
  confidence: number | null;
  guardrail_results: Record<string, unknown> | null;
  status: string | null;
  latency_ms: number | null;
  created_at: string;
  is_demo_canonical: boolean;
}

export interface OpsAgent {
  id: string;
  agent_key: string;
  name: string | null;
  description: string | null;
  category: string | null;
  type: string | null;
  status: string | null;
  model: string | null;
  execution_target: string | null;
  owner: string | null;
  created_at: string;
}

/** patient_intelligence view — one row per patient */
export interface PatientIntelligence {
  patient_id: string;
  practice_id: string;
  latest_extraction: Record<string, unknown> | null;
  opportunities: Record<string, unknown>[] | null;
  agent_outputs: OpsAgentOutput[] | null;
}

/** Patient detail with joined consultation/transcript/extraction/intelligence */
export interface OpsPatientDetail extends OpsPatient {
  consultations: (OpsConsultation & {
    transcript: OpsTranscript | null;
    extraction: OpsExtraction | null;
  })[];
  intelligence: PatientIntelligence | null;
}
