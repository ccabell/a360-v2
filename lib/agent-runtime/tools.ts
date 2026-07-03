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

/** Split a free-text query into distinct search tokens (3+ chars, deduped). */
function queryTokens(query: string): string[] {
  return Array.from(
    new Set(
      query
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((t) => t.length >= 3),
    ),
  ).slice(0, 6);
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
    const formatDoc = (d: Record<string, unknown>, productName?: string | null) => ({
      id: d.id,
      fuel_type: d.fuel_type,
      product_name: productName ?? null,
      content_preview: JSON.stringify(d.content).slice(0, 3000),
    });

    // Path 1: match products by name → their approved fuel docs
    // (agent_fuel_documents.offering_id = products.id via the offerings supertype)
    const { data: prods } = await agentSupabase
      .from("products")
      .select("id, name")
      .or(`name.ilike.%${query}%,brand_name.ilike.%${query}%,generic_name.ilike.%${query}%`)
      .limit(5);

    if (prods?.length) {
      const nameById = new Map(prods.map((p) => [p.id as string, p.name as string]));
      const { data: docs } = await agentSupabase
        .from("agent_fuel_documents")
        .select("id, fuel_type, offering_id, content")
        .in("offering_id", prods.map((p) => p.id))
        .eq("status", "active")
        .limit(8);
      if (docs?.length) {
        return { results: docs.map((d) => formatDoc(d, nameById.get(d.offering_id as string))) };
      }
    }

    // Path 2: match concerns / body areas by token → fuel docs targeting them
    const tokens = queryTokens(query);
    if (tokens.length > 0) {
      const orExpr = tokens.map((t) => `name.ilike.%${t}%`).join(",");
      const [{ data: concerns }, { data: areas }] = await Promise.all([
        agentSupabase.from("concerns").select("id, name").or(orExpr).limit(5),
        agentSupabase.from("body_areas").select("id, name").or(orExpr).limit(5),
      ]);

      const filters: string[] = [];
      if (concerns?.length) filters.push(`concern_id.in.(${concerns.map((c) => c.id).join(",")})`);
      if (areas?.length) filters.push(`body_area_id.in.(${areas.map((a) => a.id).join(",")})`);

      if (filters.length > 0) {
        const { data: docs } = await agentSupabase
          .from("agent_fuel_documents")
          .select("id, fuel_type, offering_id, content")
          .or(filters.join(","))
          .eq("status", "active")
          .limit(8);
        if (docs?.length) return { results: docs.map((d) => formatDoc(d)) };
      }
    }

    // Path 3: match fuel_type directly (e.g. "pairing", "concern").
    // fuel_type is a Postgres enum — match known values client-side, no ilike.
    const FUEL_TYPES = [
      "product_fuel", "pairing_fuel", "concern_fuel", "anatomy_fuel",
      "category_fuel", "coaching_fuel", "reach_fuel",
    ];
    const q = query.toLowerCase();
    const matchedTypes = FUEL_TYPES.filter((t) => q.includes(t.replace("_fuel", "")));
    if (matchedTypes.length > 0) {
      const { data: byType } = await agentSupabase
        .from("agent_fuel_documents")
        .select("id, fuel_type, offering_id, content")
        .in("fuel_type", matchedTypes)
        .eq("status", "active")
        .limit(5);
      if (byType?.length) return { results: byType.map((d) => formatDoc(d)) };
    }

    return { results: [], message: `No fuel documents found for "${query}"` };
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
    "Look up structured product information from the Global Library: manufacturer, category, FDA status, relationships with other products, concerns treated (with treatment role), and body areas (with anatomy specificity).",
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
      .select("id, concern_id, relevance, treatment_role, is_fda_indicated, concerns(name)")
      .eq("offering_id", product.id)
      .limit(10);

    const { data: bodyAreas } = await agentSupabase
      .from("item_body_areas")
      .select("id, body_area_id, side, anatomy_specificity, notes, body_areas(name)")
      .eq("offering_id", product.id)
      .limit(15);

    return {
      product,
      relationships: relationships ?? [],
      concerns: concerns ?? [],
      body_areas: bodyAreas ?? [],
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
    const max = limit ?? 10;
    const formatProduct = (p: Record<string, unknown>, extra?: Record<string, unknown>) => ({
      id: p.id,
      name: p.name,
      brand_name: p.brand_name,
      regulatory_status: p.regulatory_status,
      fda_approved_areas: p.fda_approved_areas,
      description: ((p.description as string) ?? "").slice(0, 300),
      ...extra,
    });
    const PRODUCT_COLS =
      "id, name, brand_name, generic_name, regulatory_status, fda_approved_areas, description";

    // Path 1: token match on name / brand / generic / description
    const tokens = queryTokens(query);
    const fieldExpr = (tokens.length > 0 ? tokens : [query])
      .flatMap((t) => [
        `name.ilike.%${t}%`,
        `brand_name.ilike.%${t}%`,
        `generic_name.ilike.%${t}%`,
        `description.ilike.%${t}%`,
      ])
      .join(",");

    const { data: products } = await agentSupabase
      .from("products")
      .select(PRODUCT_COLS)
      .or(fieldExpr)
      .limit(max);

    if (products?.length) {
      return { products: products.map((p) => formatProduct(p)), count: products.length };
    }

    // Path 2: match concerns by token → products that treat them (with treatment_role)
    if (tokens.length > 0) {
      const { data: concerns } = await agentSupabase
        .from("concerns")
        .select("id, name")
        .or(tokens.map((t) => `name.ilike.%${t}%`).join(","))
        .limit(5);

      if (concerns?.length) {
        const concernName = new Map(concerns.map((c) => [c.id as string, c.name as string]));
        const { data: links } = await agentSupabase
          .from("item_concerns")
          .select("offering_id, concern_id, treatment_role, relevance")
          .in("concern_id", concerns.map((c) => c.id))
          .limit(max * 2);

        if (links?.length) {
          const byOffering = new Map(links.map((l) => [l.offering_id as string, l]));
          const { data: byConcern } = await agentSupabase
            .from("products")
            .select(PRODUCT_COLS)
            .in("id", Array.from(byOffering.keys()))
            .limit(max);

          return {
            products: (byConcern ?? []).map((p) => {
              const link = byOffering.get(p.id as string);
              return formatProduct(p, {
                matched_concern: concernName.get(link?.concern_id as string) ?? null,
                treatment_role: link?.treatment_role ?? null,
              });
            }),
            count: byConcern?.length ?? 0,
          };
        }
      }
    }

    return { products: [], count: 0 };
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

/** Human-readable tool metadata for UI display — client-safe module */
export { TOOL_METADATA, ALL_TOOL_NAMES } from "./tool-metadata";

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
