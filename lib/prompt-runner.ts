/**
 * Prompt Runner API client — Railway-hosted extraction + agent runtime.
 * Base URL: https://prompt-runner-production.up.railway.app
 * List endpoints return { data, total }.
 */

import type {
  Paged,
  Patient,
  PatientDetail,
  PRTranscript,
  PRTranscriptDetail,
  PRRun,
  Practice,
} from "@/lib/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_PROMPT_RUNNER_URL ||
  "https://prompt-runner-production.up.railway.app";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(process.env.PROMPT_RUNNER_API_KEY && {
        Authorization: `Bearer ${process.env.PROMPT_RUNNER_API_KEY}`,
      }),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Prompt Runner ${res.status}: ${text}`);
  }
  return res.json();
}

function qs(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

// --- Patients ---

export function listPatients(opts: { limit?: number; offset?: number; q?: string } = {}) {
  return request<Paged<Patient>>(
    `/patients${qs({ limit: opts.limit ?? 50, offset: opts.offset ?? 0, q: opts.q })}`,
  );
}

export function getPatient(id: string) {
  // Single-record endpoint is NOT wrapped in { data } and nests transcripts.
  return request<PatientDetail>(`/patients/${id}`);
}

// --- Transcripts ---

export function listTranscripts(opts: { limit?: number; offset?: number; patientId?: string } = {}) {
  return request<Paged<PRTranscript>>(
    `/transcripts${qs({ limit: opts.limit ?? 50, offset: opts.offset ?? 0, patient_id: opts.patientId })}`,
  );
}

export function getTranscript(id: string) {
  // Single-record endpoint includes the full transcript_raw text.
  return request<PRTranscriptDetail>(`/transcripts/${id}`);
}

// --- Runs ---

export function listRuns(opts: { limit?: number; offset?: number; transcriptId?: string } = {}) {
  return request<Paged<PRRun>>(
    `/runs${qs({ limit: opts.limit ?? 50, offset: opts.offset ?? 0, transcript_id: opts.transcriptId })}`,
  );
}

export function getRun(runId: string) {
  return request<PRRun>(`/runs/${runId}`);
}

// --- Extraction ---

export function runExtraction(transcriptId: string, opts?: { catalogId?: string; promptSetId?: string }) {
  return request<any>("/run_extraction", {
    method: "POST",
    body: JSON.stringify({
      transcript_id: transcriptId,
      catalog_id: opts?.catalogId,
      prompt_set_id: opts?.promptSetId,
    }),
  });
}

// --- Downstream Agents ---

export function runDownstream(runId: string, moduleId: string, selectedOutputs?: string[]) {
  return request<any>("/run_downstream", {
    method: "POST",
    body: JSON.stringify({
      run_id: runId,
      module_id: moduleId,
      selected_outputs: selectedOutputs,
    }),
  });
}

// --- Agents ---

export function listAgents() {
  return request<any[]>("/agents");
}

// --- Opportunities ---

export function listOpportunities(limit = 50) {
  return request<any[]>(`/opportunities?limit=${limit}`);
}

// --- Practices ---

export function listPractices() {
  return request<Paged<Practice>>("/practices");
}

// --- Evaluation ---

export function listEvalRubrics() {
  return request<any[]>("/eval/rubrics");
}

export function runEval(runId: string, rubricId?: string) {
  return request<any>("/eval/run", {
    method: "POST",
    body: JSON.stringify({ run_id: runId, rubric_id: rubricId }),
  });
}

// --- Health ---

export function healthCheck() {
  return request<any>("/health");
}
