/**
 * Agent Service client — Python FastAPI at AGENT_SERVICE_URL.
 * For the demo, uses the CACHED path (GET /workflows/cached/{patient_id})
 * to avoid the ~4-min live orchestrator latency on stage.
 */

const BASE_URL =
  process.env.AGENT_SERVICE_URL || "http://127.0.0.1:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Agent Service ${res.status}: ${text}`);
  }
  return res.json();
}

export interface AgentServiceAgent {
  agent_key: string;
  name: string;
  description: string | null;
  category: string | null;
  status: string;
}

export interface CachedWorkflowResult {
  patient_id: string;
  workflow_key: string;
  steps: {
    agent_key: string;
    agent_name: string;
    status: string;
    result: Record<string, unknown> | null;
    evidence_used: Record<string, unknown> | null;
    latency_ms: number | null;
  }[];
  created_at: string;
}

/** GET /agents — list available agents from the agent service */
export function listAgentServiceAgents() {
  return request<AgentServiceAgent[]>("/agents");
}

/**
 * GET /workflows/cached/{patient_id} — cached orchestrator output.
 * Use this in the demo to avoid the live orchestrator (~4 min).
 */
export function getCachedWorkflow(patientId: string) {
  return request<CachedWorkflowResult>(
    `/workflows/cached/${patientId}`,
  );
}
