import { glSupabase } from "@/lib/supabase";
import type { Agent, AgentVersion, AgentStatus, AgentCategory } from "@/lib/types";

// --- List / Filter Agents ---

export async function listAgents(filters?: {
  status?: AgentStatus;
  category?: AgentCategory;
  search?: string;
}) {
  let query = glSupabase
    .from("a360_agents")
    .select("*")
    .order("name");

  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.category) query = query.eq("category", filters.category);
  if (filters?.search) query = query.ilike("name", `%${filters.search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data as Agent[];
}

// --- Get Single Agent ---

export async function getAgent(id: string) {
  const { data, error } = await glSupabase
    .from("a360_agents")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Agent;
}

// --- Get Agent by Key ---

export async function getAgentByKey(agentKey: string) {
  const { data, error } = await glSupabase
    .from("a360_agents")
    .select("*")
    .eq("agent_key", agentKey)
    .single();
  if (error) throw error;
  return data as Agent;
}

// --- Create Agent ---

export async function createAgent(agent: Partial<Agent>) {
  const { data, error } = await glSupabase
    .from("a360_agents")
    .insert(agent)
    .select()
    .single();
  if (error) throw error;
  return data as Agent;
}

// --- Update Agent ---

export async function updateAgent(id: string, updates: Partial<Agent>) {
  const { data, error } = await glSupabase
    .from("a360_agents")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Agent;
}

// --- Versions ---

export async function listVersions(agentId: string) {
  const { data, error } = await glSupabase
    .from("a360_agent_versions")
    .select("*")
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as AgentVersion[];
}

export async function getVersion(versionId: string) {
  const { data, error } = await glSupabase
    .from("a360_agent_versions")
    .select("*")
    .eq("id", versionId)
    .single();
  if (error) throw error;
  return data as AgentVersion;
}

export async function createVersion(version: Partial<AgentVersion>) {
  const { data, error } = await glSupabase
    .from("a360_agent_versions")
    .insert(version)
    .select()
    .single();
  if (error) throw error;
  return data as AgentVersion;
}

export async function promoteVersion(versionId: string, agentId: string) {
  // Set version to active, update agent's active_version_id
  const { error: vErr } = await glSupabase
    .from("a360_agent_versions")
    .update({ status: "active", promoted_at: new Date().toISOString() })
    .eq("id", versionId);
  if (vErr) throw vErr;

  const { error: aErr } = await glSupabase
    .from("a360_agents")
    .update({ active_version_id: versionId, updated_at: new Date().toISOString() })
    .eq("id", agentId);
  if (aErr) throw aErr;
}
