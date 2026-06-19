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
// Shared helper
// ---------------------------------------------------------------------------

function formatChunk(c: Record<string, unknown>) {
  return {
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
  };
}

async function callRagSearch(query: string, topK: number, corpus?: string) {
  const body: Record<string, unknown> = { query, top_k: topK };
  if (corpus) body.corpus = corpus;
  const res = await fetch(`${RAG_SEARCH_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`RAG search failed: ${res.status}`);
  return (await res.json()) as Array<Record<string, unknown>>;
}

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
    const { data, error } = await agentSupabase
      .from("agent_fuel_documents")
      .select("id, fuel_type, offering_id, content, products!inner(name)")
      .ilike("products.name", `%${query}%`)
      .limit(5);

    if (!error && (!data || data.length === 0)) {
      const { data: fallback, error: fbErr } = await agentSupabase
        .from("agent_fuel_documents")
        .select("id, fuel_type, offering_id, content")
        .textSearch("content", query, { type: "plain" })
        .limit(5);

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
        product_name: (d as Record<string, unknown> & { products?: { name?: string } }).products?.name ?? null,
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
// Tool: search_clinical_literature  (all corpora)
// ---------------------------------------------------------------------------

export const searchClinicalLiterature = {
  description:
    "Search the clinical literature corpus: PubMed articles, manufacturer YouTube training videos, podcast expert discussions, and industry articles. Use when you need broad evidence across all source types.",
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
      const chunks = await callRagSearch(query, top_k ?? 8);
      return { results: chunks.map(formatChunk) };
    } catch {
      return { error: "RAG search service unavailable", results: [] };
    }
  },
};

// ---------------------------------------------------------------------------
// Tool: search_podcast  (podcast-only corpus)
// ---------------------------------------------------------------------------

export const searchPodcast = {
  description:
    "Search expert aesthetic medicine podcast discussions (202K+ chunks). Best for: patient consultation language, clinical pearls, real-world practitioner insights, objection handling techniques.",
  inputSchema: jsonSchema<{ query: string; top_k?: number }>({
    type: "object",
    properties: {
      query: { type: "string", description: "Topic or question to find in podcast discussions" },
      top_k: { type: "number", description: "Number of results (default 6)" },
    },
    required: ["query"],
    additionalProperties: false,
  }),
  execute: async ({ query, top_k }: { query: string; top_k?: number }): Promise<Record<string, unknown>> => {
    try {
      const chunks = await callRagSearch(query, top_k ?? 6, "podcast");
      // Post-filter if service doesn't support corpus param
      const results = chunks
        .filter((c) => !c.source || String(c.source).toLowerCase().includes("podcast"))
        .map(formatChunk);
      // If filtering removed everything, return all (service handled filtering)
      return { results: results.length > 0 ? results : chunks.map(formatChunk) };
    } catch {
      return { error: "Podcast search unavailable", results: [] };
    }
  },
};

// ---------------------------------------------------------------------------
// Tool: search_youtube  (YouTube-only corpus)
// ---------------------------------------------------------------------------

export const searchYoutube = {
  description:
    "Search manufacturer YouTube training videos and procedure demonstrations (63K+ chunks). Best for: technique guidance, injection protocols, before/after context, product demonstration details.",
  inputSchema: jsonSchema<{ query: string; top_k?: number }>({
    type: "object",
    properties: {
      query: { type: "string", description: "Topic or technique to find in training videos" },
      top_k: { type: "number", description: "Number of results (default 6)" },
    },
    required: ["query"],
    additionalProperties: false,
  }),
  execute: async ({ query, top_k }: { query: string; top_k?: number }): Promise<Record<string, unknown>> => {
    try {
      const chunks = await callRagSearch(query, top_k ?? 6, "youtube");
      const results = chunks
        .filter((c) => !c.source || String(c.source).toLowerCase().includes("youtube"))
        .map(formatChunk);
      return { results: results.length > 0 ? results : chunks.map(formatChunk) };
    } catch {
      return { error: "YouTube search unavailable", results: [] };
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
// Tool: query_product_database  (broad product search)
// ---------------------------------------------------------------------------

export const queryProductDatabase = {
  description:
    "Search the Global Library product catalog broadly — by name, brand, concern area, or category. Use when you need to discover what products exist for a given treatment area or patient concern.",
  inputSchema: jsonSchema<{ query: string; limit?: number }>({
    type: "object",
    properties: {
      query: { type: "string", description: "Product name, brand, treatment area, or concern to search" },
      limit: { type: "number", description: "Max products to return (default 10)" },
    },
    required: ["query"],
    additionalProperties: false,
  }),
  execute: async ({ query, limit }: { query: string; limit?: number }): Promise<Record<string, unknown>> => {
    const { data: products } = await agentSupabase
      .from("products")
      .select("id, name, brand_name, generic_name, regulatory_status, fda_approved_areas, description")
      .or(`name.ilike.%${query}%,brand_name.ilike.%${query}%,generic_name.ilike.%${query}%`)
      .limit(limit ?? 10);

    if (!products?.length) {
      // Fallback: search in indications / description fields
      const { data: fallback } = await agentSupabase
        .from("products")
        .select("id, name, brand_name, generic_name, regulatory_status, fda_approved_areas, description")
        .or(`indications.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(limit ?? 10);

      return {
        products: (fallback ?? []).map((p) => ({
          id: p.id,
          name: p.name,
          brand_name: p.brand_name,
          regulatory_status: p.regulatory_status,
          fda_approved_areas: p.fda_approved_areas,
          description: ((p.description as string) ?? "").slice(0, 300),
        })),
        count: fallback?.length ?? 0,
      };
    }

    return {
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        brand_name: p.brand_name,
        regulatory_status: p.regulatory_status,
        fda_approved_areas: p.fda_approved_areas,
        description: ((p.description as string) ?? "").slice(0, 300),
      })),
      count: products.length,
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
  search_podcast: searchPodcast,
  search_youtube: searchYoutube,
  get_product_info: getProductInfo,
  query_product_database: queryProductDatabase,
};

/** Human-readable tool metadata for UI display */
export const TOOL_METADATA: Record<string, { label: string; description: string; icon: string }> = {
  get_patient_context: {
    label: "Patient Context",
    description: "Loads patient demographics, consultation transcript, and extraction outputs",
    icon: "user",
  },
  search_fuel_documents: {
    label: "GL Fuel Docs",
    description: "Searches curated GL product intelligence, pairing guides, and treatment protocols",
    icon: "book",
  },
  get_evidence_links: {
    label: "Evidence Links",
    description: "Fetches FDA labels, PubMed citations, and manufacturer documentation",
    icon: "link",
  },
  search_clinical_literature: {
    label: "Clinical Literature",
    description: "Searches PubMed, YouTube, podcasts, and industry articles (all sources)",
    icon: "microscope",
  },
  search_podcast: {
    label: "Podcast Search",
    description: "Searches expert podcast discussions — patient language, clinical pearls, objection handling",
    icon: "mic",
  },
  search_youtube: {
    label: "YouTube Search",
    description: "Searches manufacturer training videos — technique protocols, injection demos",
    icon: "video",
  },
  get_product_info: {
    label: "Product Info",
    description: "Retrieves detailed product data, FDA status, and treatment relationships",
    icon: "package",
  },
  query_product_database: {
    label: "Product Database",
    description: "Broad search across all 425+ GL products by name, brand, or treatment area",
    icon: "database",
  },
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
