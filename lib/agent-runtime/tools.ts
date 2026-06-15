/**
 * Agent runtime tools — callable functions that agents invoke via Claude tool_use.
 * Each tool queries a real data source (Ops Supabase, Agent Manager Supabase, RAG service).
 *
 * Tools are defined with `inputSchema` (not `parameters`) because AI SDK v6's
 * tool() wrapper stores schemas as `parameters`, but streamText's internal
 * prepareToolsAndToolChoice reads `inputSchema` — causing empty schemas to be
 * sent to Anthropic. Using jsonSchema + inputSchema directly bypasses this bug.
 */

import { jsonSchema } from "ai";
import { agentSupabase, opsSupabase } from "@/lib/supabase";

const RAG_SEARCH_URL =
  process.env.RAG_SEARCH_URL || "http://127.0.0.1:8100";

// ---------------------------------------------------------------------------
// Tool: get_patient_context
// ---------------------------------------------------------------------------

export const getPatientContext = {
  description:
    "Load patient context: demographics, consultation transcript, and structured extraction outputs. Use this first to understand the patient and their consultation.",
  inputSchema: jsonSchema<{ patient_id: string }>({
    type: "object",
    properties: {
      patient_id: { type: "string", description: "The patient UUID" },
    },
    required: ["patient_id"],
    additionalProperties: false,
  }),
  execute: async ({ patient_id }: { patient_id: string }): Promise<Record<string, unknown>> => {
    const { data: patient } = await opsSupabase
      .from("patients")
      .select("id, first_name, last_name, birth_date, biological_sex, patient_summary, medical_history")
      .eq("id", patient_id)
      .single();

    if (!patient) return { error: "Patient not found" };

    const { data: consults } = await opsSupabase
      .from("consultations")
      .select("id, consult_type, consult_number, duration_minutes, started_at")
      .eq("patient_id", patient_id)
      .order("started_at", { ascending: false })
      .limit(1);

    const consult = consults?.[0];
    if (!consult) return { patient, consultation: null, transcript_excerpt: null, extraction: null };

    const { data: transcript } = await opsSupabase
      .from("consultation_transcripts")
      .select("transcript_enhanced")
      .eq("consultation_id", consult.id)
      .maybeSingle();

    const { data: extraction } = await opsSupabase
      .from("extractions")
      .select("outputs")
      .eq("consultation_id", consult.id)
      .eq("is_verified", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    return {
      patient,
      consultation: consult,
      transcript_excerpt: transcript?.transcript_enhanced
        ? (transcript.transcript_enhanced as string).slice(0, 8000)
        : null,
      extraction: extraction?.outputs ?? null,
    };
  },
};

// ---------------------------------------------------------------------------
// Tool: search_fuel_documents
// ---------------------------------------------------------------------------

export const searchFuelDocuments = {
  description:
    "Search the Global Library for curated fuel documents — product intelligence, pairing guides, treatment protocols. These are the primary knowledge source for treatment recommendations.",
  inputSchema: jsonSchema<{ query: string }>({
    type: "object",
    properties: {
      query: { type: "string", description: "Product name or keyword to search for" },
    },
    required: ["query"],
    additionalProperties: false,
  }),
  execute: async ({ query }: { query: string }): Promise<Record<string, unknown>> => {
    // Join through products to get the product name; content is JSONB so we
    // search by casting to text. fuel_type is an enum, not free text.
    const { data, error } = await agentSupabase
      .from("agent_fuel_documents")
      .select("id, fuel_type, offering_id, content, products!inner(name)")
      .ilike("products.name", `%${query}%`)
      .limit(5);

    // Fallback: if the inner join found nothing, try a broader search
    // by casting JSONB content to text (covers category_fuel docs with no offering_id)
    if (!error && (!data || data.length === 0)) {
      const { data: fallback, error: fbErr } = await agentSupabase
        .from("agent_fuel_documents")
        .select("id, fuel_type, offering_id, content")
        .textSearch("content", query, { type: "plain" })
        .limit(5);

      // If text search isn't supported on JSONB, try filter on fuel_type
      if (fbErr || !fallback?.length) {
        const { data: byType } = await agentSupabase
          .from("agent_fuel_documents")
          .select("id, fuel_type, offering_id, content")
          .ilike("fuel_type", `%${query}%`)
          .limit(5);

        if (!byType?.length) return { results: [], message: `No fuel documents found for "${query}"` };
        return {
          results: byType.map((d) => ({
            id: d.id,
            fuel_type: d.fuel_type,
            content_preview: JSON.stringify(d.content).slice(0, 3000),
          })),
        };
      }

      return {
        results: fallback.map((d) => ({
          id: d.id,
          fuel_type: d.fuel_type,
          content_preview: JSON.stringify(d.content).slice(0, 3000),
        })),
      };
    }

    if (error) return { error: error.message, results: [] };

    return {
      results: (data ?? []).map((d) => ({
        id: d.id,
        fuel_type: d.fuel_type,
        product_name: (d as any).products?.name ?? null,
        content_preview: JSON.stringify(d.content).slice(0, 3000),
      })),
    };
  },
};

// ---------------------------------------------------------------------------
// Tool: get_evidence_links
// ---------------------------------------------------------------------------

export const getEvidenceLinks = {
  description:
    "Fetch regulatory and clinical evidence for a product: FDA labels, PubMed citations, manufacturer documentation. Returns citable references with URLs.",
  inputSchema: jsonSchema<{ product_name: string }>({
    type: "object",
    properties: {
      product_name: { type: "string", description: "Product name to find evidence for" },
    },
    required: ["product_name"],
    additionalProperties: false,
  }),
  execute: async ({ product_name }: { product_name: string }): Promise<Record<string, unknown>> => {
    const { data: docs } = await agentSupabase
      .from("agent_reference_docs")
      .select("id, content_md, lens, doc_type, status")
      .ilike("content_md", `%${product_name}%`)
      .in("status", ["draft", "active"])
      .limit(3);

    const { data: links } = await agentSupabase
      .from("evidence_links")
      .select("id, source, snippet, pmid, doi, url, page_number, field_name")
      .not("snippet", "is", null)
      .or(`field_name.ilike.%${product_name}%,snippet.ilike.%${product_name}%`)
      .order("authority_rank", { ascending: true })
      .limit(10);

    return {
      reference_docs: (docs ?? []).map((d) => ({
        id: d.id,
        type: d.doc_type,
        lens: d.lens,
        excerpt: ((d.content_md as string) ?? "").slice(0, 2000),
      })),
      evidence_links: (links ?? []).map((l) => ({
        source: l.source,
        pmid: l.pmid,
        doi: l.doi,
        url: l.url,
        page: l.page_number,
        snippet: typeof l.snippet === "string"
          ? l.snippet.slice(0, 500)
          : JSON.stringify(l.snippet).slice(0, 500),
      })),
    };
  },
};

// ---------------------------------------------------------------------------
// Tool: search_clinical_literature
// ---------------------------------------------------------------------------

export const searchClinicalLiterature = {
  description:
    "Search the clinical literature corpus: PubMed articles, manufacturer YouTube training videos, podcast expert discussions, and industry articles.",
  inputSchema: jsonSchema<{ query: string; top_k?: number }>({
    type: "object",
    properties: {
      query: { type: "string", description: "Clinical question or topic to search" },
      top_k: { type: "number", description: "Number of results (default 8)" },
    },
    required: ["query"],
    additionalProperties: false,
  }),
  execute: async ({ query, top_k }: { query: string; top_k?: number }): Promise<Record<string, unknown>> => {
    try {
      const res = await fetch(`${RAG_SEARCH_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, top_k: top_k ?? 8 }),
        signal: AbortSignal.timeout(15_000),
      });

      if (!res.ok) return { error: `RAG search failed: ${res.status}`, results: [] };

      const chunks = (await res.json()) as Array<Record<string, unknown>>;
      return {
        results: chunks.map((c) => ({
          source: c.source,
          title: c.title,
          url: c.url,
          text: ((c.text as string) ?? "").slice(0, 800),
          similarity: c.similarity,
          metadata: {
            journal: (c.metadata as Record<string, unknown>)?.journal,
            year: (c.metadata as Record<string, unknown>)?.year,
            channel: (c.metadata as Record<string, unknown>)?.channel,
            show: (c.metadata as Record<string, unknown>)?.show,
          },
        })),
      };
    } catch {
      return { error: "RAG search service unavailable", results: [] };
    }
  },
};

// ---------------------------------------------------------------------------
// Tool: get_product_info
// ---------------------------------------------------------------------------

export const getProductInfo = {
  description:
    "Look up structured product information from the Global Library: manufacturer, category, FDA status, relationships with other products.",
  inputSchema: jsonSchema<{ product_name: string }>({
    type: "object",
    properties: {
      product_name: { type: "string", description: "Product name to look up" },
    },
    required: ["product_name"],
    additionalProperties: false,
  }),
  execute: async ({ product_name }: { product_name: string }): Promise<Record<string, unknown>> => {
    const { data: products } = await agentSupabase
      .from("products")
      .select("id, name, brand_name, generic_name, manufacturer_id, regulatory_status, description, indications, contraindications, fda_approved_areas")
      .ilike("name", `%${product_name}%`)
      .limit(3);

    if (!products?.length) return { error: `No product found matching "${product_name}"` };

    const product = products[0];

    const { data: relationships } = await agentSupabase
      .from("item_relationships")
      .select("offering_a_id, offering_b_id, relationship_type, relationship_strength, clinical_rationale, timing_guidance, same_session_ok, pairing_tier")
      .or(`offering_a_id.eq.${product.id},offering_b_id.eq.${product.id}`)
      .limit(10);

    const { data: concerns } = await agentSupabase
      .from("item_concerns")
      .select("id, concern_id, relevance, treatment_role, is_fda_indicated")
      .eq("offering_id", product.id)
      .limit(10);

    return {
      product,
      relationships: relationships ?? [],
      concerns: concerns ?? [],
    };
  },
};

// ---------------------------------------------------------------------------
// Export all tools as a map for the AI SDK
// ---------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */
export const agentTools: Record<string, any> = {
  get_patient_context: getPatientContext,
  search_fuel_documents: searchFuelDocuments,
  get_evidence_links: getEvidenceLinks,
  search_clinical_literature: searchClinicalLiterature,
  get_product_info: getProductInfo,
};

/** Build a filtered tool map for the executor — returns all tools if no names specified. */
export function buildTools(toolNames?: string[]) {
  if (!toolNames || toolNames.length === 0) return agentTools;
  const filtered: Record<string, any> = {};
  for (const name of toolNames) {
    if (name in agentTools) {
      filtered[name] = agentTools[name];
    }
  }
  return filtered;
}
