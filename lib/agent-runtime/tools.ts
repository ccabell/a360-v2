import { tool, jsonSchema } from "ai";
import { agentSupabase, cmsSupabase } from "@/lib/supabase";
import type { ToolBinding } from "@/lib/types/agents";

// ---------------------------------------------------------------------------
// Tool definitions for the agent runtime.
// Each tool uses jsonSchema() (not Zod) and returns structured errors on failure.
// ---------------------------------------------------------------------------

function patientContextTool() {
  return tool({
    description:
      "Fetch patient demographics and recent transcripts from the Prompt Runner API.",
    inputSchema: jsonSchema<{ patient_id: string }>({
      type: "object",
      properties: {
        patient_id: { type: "string", description: "Patient UUID" },
      },
      required: ["patient_id"],
    }),
    execute: async ({ patient_id }) => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_PROMPT_RUNNER_URL;
        const apiKey = process.env.PROMPT_RUNNER_API_KEY;
        if (!baseUrl || !apiKey) {
          return {
            success: false,
            tool: "get_patient_context",
            error: "Prompt Runner not configured",
            recommendation:
              "Set NEXT_PUBLIC_PROMPT_RUNNER_URL and PROMPT_RUNNER_API_KEY environment variables",
          };
        }
        const res = await fetch(`${baseUrl}/api/patients/${patient_id}`, {
          headers: { "x-api-key": apiKey },
        });
        if (!res.ok) {
          return {
            success: false,
            tool: "get_patient_context",
            error: `HTTP ${res.status}: ${res.statusText}`,
            recommendation: "Verify patient_id exists and Prompt Runner is reachable",
          };
        }
        return await res.json();
      } catch (err) {
        return {
          success: false,
          tool: "get_patient_context",
          error: err instanceof Error ? err.message : "Unknown error",
          recommendation: "Check Prompt Runner connectivity",
        };
      }
    },
  });
}

function searchFuelDocsTool() {
  return tool({
    description:
      "Search agent fuel documents by title in the Global Library.",
    inputSchema: jsonSchema<{ query: string; limit?: number }>({
      type: "object",
      properties: {
        query: { type: "string", description: "Search term to match against fuel doc titles" },
        limit: { type: "number", description: "Max results (default 5)" },
      },
      required: ["query"],
    }),
    execute: async ({ query, limit }) => {
      try {
        const { data, error } = await agentSupabase
          .from("gl_agent_fuel_documents")
          .select("id, title, document_type, content")
          .ilike("title", `%${query}%`)
          .limit(limit ?? 5);
        if (error) {
          return {
            success: false,
            tool: "search_fuel_documents",
            error: error.message,
            recommendation: "Check Agent Manager Supabase connectivity and table access",
          };
        }
        return { success: true, results: data ?? [] };
      } catch (err) {
        return {
          success: false,
          tool: "search_fuel_documents",
          error: err instanceof Error ? err.message : "Unknown error",
          recommendation: "Check Agent Manager Supabase connectivity",
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
          .from("v2_products")
          .select("id, name, manufacturer_id, category_id, fda_status, description");
        if (product_id) {
          query = query.eq("id", product_id);
        } else if (product_name) {
          query = query.ilike("name", `%${product_name}%`);
        } else {
          return {
            success: false,
            tool: "get_product_info",
            error: "Either product_id or product_name is required",
            recommendation: "Provide at least one search parameter",
          };
        }
        const { data, error } = await query;
        if (error) {
          return {
            success: false,
            tool: "get_product_info",
            error: error.message,
            recommendation: "Check Agent Manager Supabase connectivity and table access",
          };
        }
        return { success: true, results: data ?? [] };
      } catch (err) {
        return {
          success: false,
          tool: "get_product_info",
          error: err instanceof Error ? err.message : "Unknown error",
          recommendation: "Check Agent Manager Supabase connectivity",
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
 * Build a tools object for the AI SDK based on the agent version's tool bindings.
 * If bindings is empty/undefined, all tools are included (default for agents without config).
 */
export function buildTools(bindings?: ToolBinding[]) {
  const enabledKeys =
    bindings && bindings.length > 0
      ? bindings.filter((b) => b.enabled).map((b) => b.tool_key)
      : Object.keys(TOOL_REGISTRY);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tools: Record<string, ReturnType<typeof tool<any, any>>> = {};
  for (const key of enabledKeys) {
    const factory = TOOL_REGISTRY[key];
    if (factory) tools[key] = factory();
  }
  return tools;
}
