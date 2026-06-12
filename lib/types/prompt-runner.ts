// =============================================================================
// Prompt Runner API types — matches the live Railway API
// (https://prompt-runner-production.up.railway.app)
// List endpoints return { data, total }.
// =============================================================================

export interface Paged<T> {
  data: T[];
  total: number;
}

// --- /patients ---
export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  dob: string | null;
  photo_url: string | null;
  medical_history: string | null;
  prior_visits: number | null;
  practice_id: string | null;
  created_at: string;
}

// --- /transcripts ---
export interface PRTranscript {
  id: string;
  consultation_id: string;
  consult_number: number;
  transcript_date: string;
  duration_minutes: number;
  clinic: string;
  transcript_summary: string;
  transcript_summary_paragraph?: string;
  consult_type: string;
  created_at: string;
}

// --- /transcripts/{id} (single record includes the full raw transcript) ---
export interface PRTranscriptDetail extends PRTranscript {
  transcript_raw: string;
}

// --- /patients/{id} (single record includes nested transcripts) ---
export interface PatientDetail extends Patient {
  transcripts: PRTranscript[];
  updated_at?: string;
}

// --- /runs ---
export interface PRRun {
  id: string;
  run_id: string;
  transcript_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// --- /runs/{id} (full record: model, prompt versions, structured outputs) ---
export interface RunEvidence {
  quote?: string;
  source?: string;
  speaker?: string;
  speaker_id?: string;
  confidence?: number;
}

// Extraction fields follow { value, evidence, missing_reason }.
export interface PRRunDetail extends PRRun {
  label: string | null;
  prompt_set_id: string | null;
  prompt_versions: Record<string, string> | null;
  model_provider: string | null;
  model_name: string | null;
  temperature: number | null;
  inputs: Record<string, unknown> | null;
  execution_meta: Record<string, unknown> | null;
  // Deep/variable extraction tree — walked generically by the UI.
  outputs: Record<string, any> | null;
  practice_id: string | null;
  catalog_id: string | null;
  notes: string | null;
}

// --- /practices ---
export interface Practice {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}
