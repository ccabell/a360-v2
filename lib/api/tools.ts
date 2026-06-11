import { glSupabase } from "@/lib/supabase";
import type { ToolDef } from "@/lib/types";

export async function listTools(dataSource?: string) {
  let query = glSupabase
    .from("agent_tools")
    .select("*")
    .order("name");

  if (dataSource) query = query.eq("data_source", dataSource);

  const { data, error } = await query;
  if (error) throw error;
  return data as ToolDef[];
}

export async function getTool(toolKey: string) {
  const { data, error } = await glSupabase
    .from("agent_tools")
    .select("*")
    .eq("tool_key", toolKey)
    .single();
  if (error) throw error;
  return data as ToolDef;
}

export async function createTool(tool: Partial<ToolDef>) {
  const { data, error } = await glSupabase
    .from("agent_tools")
    .insert(tool)
    .select()
    .single();
  if (error) throw error;
  return data as ToolDef;
}

export async function updateTool(id: string, updates: Partial<ToolDef>) {
  const { data, error } = await glSupabase
    .from("agent_tools")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ToolDef;
}
