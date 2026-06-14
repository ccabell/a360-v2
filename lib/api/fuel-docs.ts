import { agentSupabase } from "@/lib/supabase";
import type {
  FuelDoc,
  FuelDocType,
  ReviewStatus,
  ResolvedFuelDoc,
  SopFields,
  PreferenceFields,
} from "@/lib/types/fuel-docs";

// --- List / Filter Fuel Docs ---

export async function listFuelDocs(filters?: {
  type?: FuelDocType;
  status?: ReviewStatus;
  search?: string;
}) {
  let query = agentSupabase
    .from("gl_agent_fuel_documents")
    .select("*")
    .order("created_at", { ascending: false });

  // source_type is the existing DB column used as the fuel_type discriminator
  if (filters?.type) query = query.eq("source_type", filters.type);
  if (filters?.status) query = query.eq("review_status", filters.status);
  if (filters?.search) query = query.ilike("product_name", `%${filters.search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data as FuelDoc[];
}

// --- Get Single Fuel Doc ---

export async function getFuelDoc(id: string) {
  const { data, error } = await agentSupabase
    .from("gl_agent_fuel_documents")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as FuelDoc;
}

// --- Create Fuel Doc ---

export async function createFuelDoc(doc: {
  product_name: string;
  source_type: string;
  content: Record<string, any>;
  metadata?: Record<string, any>;
}) {
  const { data, error } = await agentSupabase
    .from("gl_agent_fuel_documents")
    .insert(doc)
    .select()
    .single();
  if (error) throw error;
  return data as FuelDoc;
}

// --- Update Fuel Doc ---

export async function updateFuelDoc(
  id: string,
  updates: Partial<{
    product_name: string;
    content: Record<string, any>;
    metadata: Record<string, any>;
    review_status: string;
  }>
) {
  const { data, error } = await agentSupabase
    .from("gl_agent_fuel_documents")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as FuelDoc;
}

// --- Delete Fuel Doc ---

export async function deleteFuelDoc(id: string): Promise<void> {
  const { error } = await agentSupabase
    .from("gl_agent_fuel_documents")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// --- Get Resolved Fuel Doc (COALESCE gl + pl content) ---

export async function getResolvedFuelDoc(
  id: string,
  practiceId?: string
): Promise<ResolvedFuelDoc> {
  const glDoc = await getFuelDoc(id);

  if (!practiceId) {
    return {
      ...glDoc,
      sop: null,
      preferences: null,
      has_practice_override: false,
    } as ResolvedFuelDoc;
  }

  const { data: plRow, error } = await agentSupabase
    .from("pl_agent_fuel_documents")
    .select("*")
    .eq("gl_fuel_doc_id", id)
    .eq("practice_id", practiceId)
    .maybeSingle();

  if (error) throw error;

  if (!plRow) {
    return {
      ...glDoc,
      sop: null,
      preferences: null,
      has_practice_override: false,
    } as ResolvedFuelDoc;
  }

  // COALESCE: practice content fields override GL content fields
  const mergedContent = { ...glDoc.content, ...plRow.content };

  return {
    ...glDoc,
    content: mergedContent,
    sop: (plRow.sop as SopFields) ?? null,
    preferences: (plRow.preferences as PreferenceFields) ?? null,
    has_practice_override: true,
  } as ResolvedFuelDoc;
}
