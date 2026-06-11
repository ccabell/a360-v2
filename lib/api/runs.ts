import { agentSupabase } from "@/lib/supabase";
import type { AgentRun, AgentCitation, EvalResult } from "@/lib/types";

// --- Runs ---

export async function listRuns(opts?: {
  agentId?: string;
  workflowId?: string;
  status?: string;
  limit?: number;
}) {
  const limit = opts?.limit || 50;
  let query = agentSupabase
    .from("agent_runs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (opts?.agentId) query = query.eq("agent_id", opts.agentId);
  if (opts?.workflowId) query = query.eq("workflow_id", opts.workflowId);
  if (opts?.status) query = query.eq("status", opts.status);

  const { data, error } = await query;
  if (error) throw error;
  return data as AgentRun[];
}

export async function getRun(id: string) {
  const { data, error } = await agentSupabase
    .from("agent_runs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as AgentRun;
}

export async function createRun(run: Partial<AgentRun>) {
  const { data, error } = await agentSupabase
    .from("agent_runs")
    .insert(run)
    .select()
    .single();
  if (error) throw error;
  return data as AgentRun;
}

export async function updateRun(id: string, updates: Partial<AgentRun>) {
  const { data, error } = await agentSupabase
    .from("agent_runs")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as AgentRun;
}

// --- Citations ---

export async function listCitations(runId: string) {
  const { data, error } = await agentSupabase
    .from("agent_citations")
    .select("*")
    .eq("run_id", runId)
    .order("created_at");
  if (error) throw error;
  return data as AgentCitation[];
}

// --- Eval Results ---

export async function listEvalResults(opts?: { agentId?: string; runId?: string }) {
  let query = agentSupabase
    .from("eval_results")
    .select("*")
    .order("created_at", { ascending: false });

  if (opts?.agentId) query = query.eq("agent_id", opts.agentId);
  if (opts?.runId) query = query.eq("run_id", opts.runId);

  const { data, error } = await query;
  if (error) throw error;
  return data as EvalResult[];
}
