import { tool, jsonSchema } from "ai";
import { agentSupabase, cmsSupabase, opsSupabase } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Tool definitions for the agent runtime.
// Each tool uses jsonSchema() (not Zod) and returns structured errors on failure.
// ---------------------------------------------------------------------------

function patientContextTool() {
  return tool({
    description:
      "Fetch patient demographics and most recent consultation from Ops Supabase.",
    inputSchema: jsonSchema<{ patient_id: string }>({
      type: "object",
      properties: {
        patient_id: { type: "string", description: "Patient UUID" },
      },
      required: ["patient_id"],
    }),
    execute: async ({ patient_id }) => {
      try {
        // Fetch patient
        const { data: patient, error: pErr } = await opsSupabase
          .from("patients")
          .select("id, first_name, last_name, birth_date, biological_sex, ethnicity, patient_summary, medical_history")
          .eq("id", patient_id)
          .single();
        if (pErr) {
          return { success: false, tool: "get_patient_context", error: pErr.message };
        }

        // Fetch most recent consultation
        const { data: consults } = await opsSupabase
          .from("consultations")
          .select("id, status, consult_type, started_at, duration_minutes, details")
          .eq("patient_id", patient_id)
          .order("started_at", { ascending: false })
          .limit(1);

        // Fetch latest extraction if consultation exists
        let extraction = null;
        if (consults && consults.length > 0) {
          const { data: ext } = await opsSupabase
            .from("extractions")
            .select("*")
            .eq("consultation_id", consults[0].id)
            .limit(1);
          extraction = ext?.[0] ?? null;
        }

        return {
          success: true,
          patient,
          consultation: consults?.[0] ?? null,
          extraction,
        };
      } catch (err) {
        return {
          success: false,
          tool: "get_patient_context",
          error: err instanceof Error ? err.message : "Unknown error",
        };
      }
    },
  });
}

function searchFuelDocsTool() {
  return tool({
    description:
      "Search agent fuel documents by product name. Joins through products table to find fuel docs for matching products.",
    inputSchema: jsonSchema<{ product_name: string; limit?: number }>({
      type: "object",
      properties: {
        product_name: { type: "string", description: "Product name to search for (partial match)" },
        limit: { type: "number", description: "Max results (default 5)" },
      },
      required: ["product_name"],
    }),
    execute: async ({ product_name, limit }) => {
      try {
        // Find matching products first, then get their fuel docs
        const { data: products, error: pErr } = await agentSupabase
          .from("products")
          .select("id, name")
          .ilike("name", `%${product_name}%`)
          .limit(5);
        if (pErr) {
          return { success: false, tool: "search_fuel_documents", error: pErr.message };
        }
        if (!products || products.length === 0) {
          return { success: true, results: [], message: `No products matching "${product_name}"` };
        }

        const productIds = products.map((p) => p.id);
        const { data: docs, error: dErr } = await agentSupabase
          .from("agent_fuel_documents")
          .select("id, offering_id, fuel_type, content, status")
          .in("offering_id", productIds)
          .limit(limit ?? 5);
        if (dErr) {
          return { success: false, tool: "search_fuel_documents", error: dErr.message };
        }
        return {
          success: true,
          matched_products: products.map((p) => p.name),
          results: docs ?? [],
        };
      } catch (err) {
        return {
          success: false,
          tool: "search_fuel_documents",
          error: err instanceof Error ? err.message : "Unknown error",
        };
      }
    },
  });
}

function getEvidenceLinksTool() {
  return tool({
    description: "Fetch evidence links (PubMed, FDA, IFU) for a product.",
    inputSchema: jsonSchema<{ product_id?: string; limit?: number }>({
      type: "object",
      properties: {
        product_id: { type: "string", description: "Optional product/item UUID to filter by" },
        limit: { type: "number", description: "Max results (default 10)" },
      },
    }),
    execute: async ({ product_id, limit }) => {
      try {
        let query = agentSupabase.from("evidence_links").select("*");
        if (product_id) query = query.eq("item_id", product_id);
        query = query.limit(limit ?? 10);
        const { data, error } = await query;
        if (error) {
          return {
            success: false,
            tool: "get_evidence_links",
            error: error.message,
            recommendation: "Check Agent Manager Supabase connectivity and table access",
          };
        }
        return { success: true, results: data ?? [] };
      } catch (err) {
        return {
          success: false,
          tool: "get_evidence_links",
          error: err instanceof Error ? err.message : "Unknown error",
          recommendation: "Check Agent Manager Supabase connectivity",
        };
      }
    },
  });
}

function searchClinicalLiteratureTool() {
  return tool({
    description:
      "Search PubMed clinical literature using full-text search in the CMS database.",
    inputSchema: jsonSchema<{ query: string; limit?: number }>({
      type: "object",
      properties: {
        query: { type: "string", description: "Search query for clinical literature" },
        limit: { type: "number", description: "Max results (default 5)" },
      },
      required: ["query"],
    }),
    execute: async ({ query, limit }) => {
      try {
        // Check if CMS Supabase is configured (not placeholder)
        const cmsUrl = process.env.NEXT_PUBLIC_CMS_SUPABASE_URL;
        if (!cmsUrl || cmsUrl.includes("placeholder")) {
          return {
            success: false,
            tool: "search_clinical_literature",
            error: "CMS Supabase not configured",
            recommendation: "Set CMS_SUPABASE_SERVICE_KEY environment variable",
          };
        }
        const { data, error } = await cmsSupabase
          .from("pubmed_articles_vectorized")
          .select("id, title, abstract, journal, pmid, doi, chunk_text")
          .textSearch("chunk_text", query, { type: "websearch" })
          .limit(limit ?? 5);
        if (error) {
          return {
            success: false,
            tool: "search_clinical_literature",
            error: error.message,
            recommendation: "Check CMS Supabase connectivity and table access",
          };
        }
        return { success: true, results: data ?? [] };
      } catch (err) {
        return {
          success: false,
          tool: "search_clinical_literature",
          error: err instanceof Error ? err.message : "Unknown error",
          recommendation: "Check CMS Supabase connectivity",
        };
      }
    },
  });
}

function getProductInfoTool() {
  return tool({
    description: "Fetch product details from the Global Library.",
    inputSchema: jsonSchema<{ product_id?: string; product_name?: string }>({
      type: "object",
      properties: {
        product_id: { type: "string", description: "Product UUID" },
        product_name: { type: "string", description: "Product name (partial match)" },
      },
    }),
    execute: async ({ product_id, product_name }) => {
      try {
        let query = agentSupabase
          .from("products")
          .select("id, name, brand_name, description, indications, contraindications, fda_approved_areas, onset_time, duration_of_effect, active_ingredients, regulatory_status");
        if (product_id) {
          query = query.eq("id", product_id);
        } else if (product_name) {
          query = query.ilike("name", `%${product_name}%`);
        } else {
          return {
            success: false,
            tool: "get_product_info",
            error: "Either product_id or product_name is required",
          };
        }
        query = query.limit(5);
        const { data, error } = await query;
        if (error) {
          return {
            success: false,
            tool: "get_product_info",
            error: error.message,
          };
        }
        return { success: true, results: data ?? [] };
      } catch (err) {
        return {
          success: false,
          tool: "get_product_info",
          error: err instanceof Error ? err.message : "Unknown error",
        };
      }
    },
  });
}

// ---------------------------------------------------------------------------
// Tool registry
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOOL_REGISTRY: Record<string, () => ReturnType<typeof tool<any, any>>> = {
  get_patient_context: patientContextTool,
  search_fuel_documents: searchFuelDocsTool,
  get_evidence_links: getEvidenceLinksTool,
  search_clinical_literature: searchClinicalLiteratureTool,
  get_product_info: getProductInfoTool,
};

/**
 * Build a tools object for the AI SDK based on the agent version's tool list.
 * If toolNames is empty/undefined, all tools are included (default for agents without config).
 * toolNames comes from agent_versions.knowledge_config.tools (string array of tool keys).
 */
export function buildTools(toolNames?: string[]) {
  const enabledKeys =
    toolNames && toolNames.length > 0
      ? toolNames
      : Object.keys(TOOL_REGISTRY);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tools: Record<string, ReturnType<typeof tool<any, any>>> = {};
  for (const key of enabledKeys) {
    const factory = TOOL_REGISTRY[key];
    if (factory) tools[key] = factory();
  }
  return tools;
}
