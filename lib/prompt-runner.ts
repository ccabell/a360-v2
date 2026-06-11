/**
 * Prompt Runner API client — Railway-hosted extraction + agent runtime.
 * Base URL: https://prompt-runner-production.up.railway.app
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_PROMPT_RUNNER_URL ||
  "https://prompt-runner-production.up.railway.app";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
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

// --- Transcripts & Runs ---

export function listTranscripts(limit = 50, offset = 0) {
  return request<any[]>(`/transcripts?limit=${limit}&offset=${offset}`);
}

export function getTranscript(id: string) {
  return request<any>(`/transcripts/${id}`);
}

export function listRuns(limit = 50, offset = 0) {
  return request<any[]>(`/runs?limit=${limit}&offset=${offset}`);
}

export function getRun(runId: string) {
  return request<any>(`/runs/${runId}`);
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
  return request<any[]>("/practices");
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
