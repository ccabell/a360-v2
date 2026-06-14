import { agentSupabase } from "@/lib/supabase";
import type {
  FuelDoc,
  FuelDocType,
  ReviewStatus,
  ResolvedFuelDoc,
  SopFields,
  PreferenceFields,
} from "@/lib/types/fuel-docs";

// =============================================================================
// DB ↔ UI mapping
//
// Real table: agent_fuel_documents
// Real columns: id, fuel_type (enum), content (jsonb), version, status (enum),
//               approved_by, approved_at, offering_id, category_id,
//               item_relationship_id, practice_id, created_at, updated_at
//
// The UI expects: product_name, source_type, review_status, template_version,
//                 audience, patient_safe, metadata, etc.
// We derive those from real columns + content JSONB.
// =============================================================================

// Map DB fuel_type enum → UI FuelDocType
const DB_TO_UI_TYPE: Record<string, FuelDocType> = {
  pairing_fuel: "combination",
  product_fuel: "product",
  category_fuel: "concern",
  comparison_fuel: "combination",
  education_fuel: "product",
  reach_fuel: "product",
  enablement_fuel: "product",
};

// Map UI FuelDocType → DB fuel_type enum
const UI_TO_DB_TYPE: Record<FuelDocType, string> = {
  combination: "pairing_fuel",
  product: "product_fuel",
  concern: "category_fuel",
};

// Map DB status enum → UI ReviewStatus
const DB_TO_UI_STATUS: Record<string, ReviewStatus> = {
  draft: "draft",
  active: "active",
  archived: "approved", // archived = was approved, now inactive
  corrected: "in_review",
};

// Map UI ReviewStatus → DB status enum
const UI_TO_DB_STATUS: Record<ReviewStatus, string> = {
  draft: "draft",
  in_review: "draft", // DB has no in_review; keep as draft
  approved: "active",  // approved → active in DB
  active: "active",
};

// Derive a display name from a DB row
function deriveProductName(row: Record<string, unknown>): string {
  const content = row.content as Record<string, unknown> | null;
  if (!content) return "Untitled";

  // Try pair_key first (combination docs)
  const pairKey = content.pair_key as string | undefined;
  if (pairKey) {
    return pairKey
      .split("__")
      .map((part) =>
        part
          .split("_")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      )
      .join(" + ");
  }

  // Try patient_facing_name
  if (content.patient_facing_name) return content.patient_facing_name as string;

  // Try product_name inside content
  if (content.product_name) return content.product_name as string;

  // Try concern_name
  if (content.concern_name) return content.concern_name as string;

  // Try generic "product" field
  if (content.product) return content.product as string;

  // Try category
  if (content.category) return content.category as string;

  return "Untitled";
}

// Transform a raw DB row into the FuelDoc shape the UI expects
function dbRowToFuelDoc(row: Record<string, unknown>): FuelDoc {
  const content = (row.content as Record<string, unknown>) ?? {};
  const dbType = row.fuel_type as string;
  const dbStatus = row.status as string;

  return {
    id: row.id as string,
    fuel_type: DB_TO_UI_TYPE[dbType] ?? "product",
    template_version: (content.template_version as string) ?? "1.0",
    product_name: deriveProductName(row),
    source_type: DB_TO_UI_TYPE[dbType] ?? "product",
    reference_id: (row.item_relationship_id as string) ?? (row.offering_id as string) ?? null,
    review_status: DB_TO_UI_STATUS[dbStatus] ?? "draft",
    audience: (content.audience as string[]) ?? ["agent", "staff"],
    patient_safe: (content.patient_safe as boolean) ?? false,
    last_reviewed: row.approved_at ? new Date(row.approved_at as string).toISOString() : null,
    reviewed_by: (row.approved_by as string) ?? null,
    content: content,
    metadata: {
      db_fuel_type: dbType,
      db_status: dbStatus,
      version: row.version,
    },
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  } as unknown as FuelDoc;
}

// --- List / Filter Fuel Docs ---

export async function listFuelDocs(filters?: {
  type?: FuelDocType;
  status?: ReviewStatus;
  search?: string;
}) {
  let query = agentSupabase
    .from("agent_fuel_documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.type) {
    query = query.eq("fuel_type", UI_TO_DB_TYPE[filters.type]);
  }
  if (filters?.status) {
    query = query.eq("status", UI_TO_DB_STATUS[filters.status]);
  }

  const { data, error } = await query;
  if (error) throw error;

  let docs = (data ?? []).map((row) => dbRowToFuelDoc(row as Record<string, unknown>));

  // Client-side search on derived product_name
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    docs = docs.filter((d) => d.product_name.toLowerCase().includes(q));
  }

  return docs;
}

// --- Get Single Fuel Doc ---

export async function getFuelDoc(id: string) {
  const { data, error } = await agentSupabase
    .from("agent_fuel_documents")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return dbRowToFuelDoc(data as Record<string, unknown>);
}

// --- Create Fuel Doc ---

export async function createFuelDoc(doc: {
  product_name?: string;
  source_type?: string;
  fuel_type?: string;
  content: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}) {
  // Map UI type to DB enum
  const uiType = (doc.source_type ?? doc.fuel_type ?? "product") as FuelDocType;
  const dbType = UI_TO_DB_TYPE[uiType] ?? "product_fuel";

  const { data, error } = await agentSupabase
    .from("agent_fuel_documents")
    .insert({
      fuel_type: dbType,
      content: doc.content,
      version: 1,
      status: "draft",
      category_id: INJECTABLES_CATEGORY_ID,
    })
    .select()
    .single();
  if (error) throw error;
  return dbRowToFuelDoc(data as Record<string, unknown>);
}

// --- Bulk Create Fuel Docs ---

// Placeholder FK for pairing_fuel docs — "Injectables" category
const INJECTABLES_CATEGORY_ID = "d240d8b5-95e8-45e9-99bf-f4758c67e08e";

export async function bulkCreateFuelDocs(docs: Array<{
  fuel_type: string;
  content: Record<string, unknown>;
}>) {
  const rows = docs.map((d) => {
    const dbType = UI_TO_DB_TYPE[d.fuel_type as FuelDocType] ?? d.fuel_type;
    return {
      fuel_type: dbType,
      content: d.content,
      version: 1,
      status: "draft",
      // chk_fuel_has_target requires at least one FK — use category as placeholder
      category_id: INJECTABLES_CATEGORY_ID,
    };
  });

  const { data, error } = await agentSupabase
    .from("agent_fuel_documents")
    .insert(rows)
    .select();
  if (error) throw error;
  return (data ?? []).map((row) => dbRowToFuelDoc(row as Record<string, unknown>));
}

// --- Update Fuel Doc ---

export async function updateFuelDoc(
  id: string,
  updates: Partial<{
    product_name: string;
    content: Record<string, unknown>;
    metadata: Record<string, unknown>;
    review_status: string;
  }>
) {
  const dbUpdates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (updates.content) {
    dbUpdates.content = updates.content;
  }

  if (updates.review_status) {
    const uiStatus = updates.review_status as ReviewStatus;
    dbUpdates.status = UI_TO_DB_STATUS[uiStatus] ?? "draft";

    // If approving, set approved_by and approved_at
    if (uiStatus === "approved" || uiStatus === "active") {
      dbUpdates.approved_by = "chris@a360";
      dbUpdates.approved_at = new Date().toISOString();
    }
  }

  const { data, error } = await agentSupabase
    .from("agent_fuel_documents")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return dbRowToFuelDoc(data as Record<string, unknown>);
}

// --- Bulk Update Status ---

export async function bulkUpdateStatus(
  ids: string[],
  status: ReviewStatus
) {
  const dbStatus = UI_TO_DB_STATUS[status] ?? "draft";
  const updates: Record<string, unknown> = {
    status: dbStatus,
    updated_at: new Date().toISOString(),
  };

  if (status === "approved" || status === "active") {
    updates.approved_by = "chris@a360";
    updates.approved_at = new Date().toISOString();
  }

  const { data, error } = await agentSupabase
    .from("agent_fuel_documents")
    .update(updates)
    .in("id", ids)
    .select();
  if (error) throw error;
  return (data ?? []).map((row) => dbRowToFuelDoc(row as Record<string, unknown>));
}

// --- Delete Fuel Doc ---

export async function deleteFuelDoc(id: string): Promise<void> {
  const { error } = await agentSupabase
    .from("agent_fuel_documents")
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

  const mergedContent = { ...glDoc.content, ...plRow.content };

  return {
    ...glDoc,
    content: mergedContent,
    sop: (plRow.sop as SopFields) ?? null,
    preferences: (plRow.preferences as PreferenceFields) ?? null,
    has_practice_override: true,
  } as ResolvedFuelDoc;
}
