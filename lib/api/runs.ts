import { opsSupabase } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Agent Outputs — persisted in Ops Supabase `agent_outputs` table
// ---------------------------------------------------------------------------

export interface AgentOutput {
  id: string;
  consultation_id: string | null;
  patient_id: string | null;
  practice_id: string | null;
  agent_key: string;
  agent_version: string | null;
  agent_version_id: string | null;
  model: string | null;
  lineage: Record<string, unknown> | null;
  input_envelope: Record<string, unknown> | null;
  result: Record<string, unknown> | null;
  evidence_used: Record<string, unknown> | null;
  confidence: number | null;
  guardrail_results: Record<string, unknown> | null;
  status: string;
  latency_ms: number | null;
  created_at: string;
  is_demo_canonical: boolean | null;
}

// --- List outputs ---

export async function listAgentOutputs(opts?: {
  agentKey?: string;
  patientId?: string;
  status?: string;
  limit?: number;
}) {
  const limit = opts?.limit || 50;
  let query = opsSupabase
    .from("agent_outputs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (opts?.agentKey) query = query.eq("agent_key", opts.agentKey);
  if (opts?.patientId) query = query.eq("patient_id", opts.patientId);
  if (opts?.status) query = query.eq("status", opts.status);

  const { data, error } = await query;
  if (error) throw error;
  return data as AgentOutput[];
}

// --- Get single output ---

export async function getAgentOutput(id: string) {
  const { data, error } = await opsSupabase
    .from("agent_outputs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as AgentOutput;
}

// --- Create output (used by executor at run start) ---

export async function createAgentOutput(output: Partial<AgentOutput>) {
  const { data, error } = await opsSupabase
    .from("agent_outputs")
    .insert(output)
    .select()
    .single();
  if (error) throw error;
  return data as AgentOutput;
}

// --- Update output (used by executor at run end) ---

export async function updateAgentOutput(
  id: string,
  updates: Partial<AgentOutput>,
) {
  const { data, error } = await opsSupabase
    .from("agent_outputs")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as AgentOutput;
}
