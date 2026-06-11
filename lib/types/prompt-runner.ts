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

// --- /practices ---
export interface Practice {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}
