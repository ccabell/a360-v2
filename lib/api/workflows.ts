import { glSupabase } from "@/lib/supabase";
import type { Workflow } from "@/lib/types";

export async function listWorkflows() {
  const { data, error } = await glSupabase
    .from("agent_workflows")
    .select("*")
    .order("name");
  if (error) throw error;
  return data as Workflow[];
}

export async function getWorkflow(id: string) {
  const { data, error } = await glSupabase
    .from("agent_workflows")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Workflow;
}

export async function createWorkflow(workflow: Partial<Workflow>) {
  const { data, error } = await glSupabase
    .from("agent_workflows")
    .insert(workflow)
    .select()
    .single();
  if (error) throw error;
  return data as Workflow;
}

export async function updateWorkflow(id: string, updates: Partial<Workflow>) {
  const { data, error } = await glSupabase
    .from("agent_workflows")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Workflow;
}

export async function deleteWorkflow(id: string) {
  const { error } = await glSupabase
    .from("agent_workflows")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
