/**
 * Agent runtime tools — callable functions that agents invoke via Claude tool_use.
 * Each tool queries a real data source (Ops Supabase, Agent Manager Supabase, RAG service).
 */

// @ts-nocheck — AI SDK v6 tool() type inference is strict with zod v4;
// runtime behavior is correct (verified). Suppress until SDK stabilizes.

import { tool } from "ai";
import { z } from "zod";
import { agentSupabase, opsSupabase } from "@/lib/supabase";

const RAG_SEARCH_URL =
  process.env.RAG_SEARCH_URL || "http://127.0.0.1:8100";

// ---------------------------------------------------------------------------
// Tool: get_patient_context
// ---------------------------------------------------------------------------

export const getPatientContext = tool({
  description:
    "Load patient context: demographics, consultation transcript, and structured extraction outputs. Use this first to understand the patient and their consultation.",
  parameters: z.object({
    patient_id: z.string().describe("The patient UUID"),
  }),
  execute: async ({ patient_id }): Promise<Record<string, unknown>> => {
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
});

// ---------------------------------------------------------------------------
// Tool: search_fuel_documents
// ---------------------------------------------------------------------------

export const searchFuelDocuments = tool({
  description:
    "Search the Global Library for curated fuel documents — product intelligence, pairing guides, treatment protocols. These are the primary knowledge source for treatment recommendations.",
  parameters: z.object({
    query: z.string().describe("Product name or keyword to search for"),
  }),
  execute: async ({ query }): Promise<Record<string, unknown>> => {
    const { data, error } = await agentSupabase
      .from("agent_fuel_documents")
      .select("id, product_name, source_type, content, metadata")
      .or(`product_name.ilike.%${query}%,content.ilike.%${query}%,source_type.ilike.%${query}%`)
      .limit(5);

    if (error) return { error: error.message, results: [] };
    if (!data?.length) return { results: [], message: `No fuel documents found for "${query}"` };

    return {
      results: data.map((d) => ({
        id: d.id,
        product_name: d.product_name,
        source_type: d.source_type,
        content: ((d.content as string) ?? "").slice(0, 3000),
      })),
    };
  },
});

// ---------------------------------------------------------------------------
// Tool: get_evidence_links
// ---------------------------------------------------------------------------

export const getEvidenceLinks = tool({
  description:
    "Fetch regulatory and clinical evidence for a product: FDA labels, PubMed citations, manufacturer documentation. Returns citable references with URLs.",
  parameters: z.object({
    product_name: z.string().describe("Product name to find evidence for"),
  }),
  execute: async ({ product_name }): Promise<Record<string, unknown>> => {
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
});

// ---------------------------------------------------------------------------
// Tool: search_clinical_literature
// ---------------------------------------------------------------------------

export const searchClinicalLiterature = tool({
  description:
    "Search the clinical literature corpus: PubMed articles, manufacturer YouTube training videos, podcast expert discussions, and industry articles.",
  parameters: z.object({
    query: z.string().describe("Clinical question or topic to search"),
    top_k: z.number().optional().default(8).describe("Number of results (default 8)"),
  }),
  execute: async ({ query, top_k }): Promise<Record<string, unknown>> => {
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
});

// ---------------------------------------------------------------------------
// Tool: get_product_info
// ---------------------------------------------------------------------------

export const getProductInfo = tool({
  description:
    "Look up structured product information from the Global Library: manufacturer, category, FDA status, relationships with other products.",
  parameters: z.object({
    product_name: z.string().describe("Product name to look up"),
  }),
  execute: async ({ product_name }): Promise<Record<string, unknown>> => {
    const { data: products } = await agentSupabase
      .from("gl_products")
      .select("id, name, brand, manufacturer, category, subcategory, fda_status, description")
      .ilike("name", `%${product_name}%`)
      .limit(3);

    if (!products?.length) return { error: `No product found matching "${product_name}"` };

    const product = products[0];

    const { data: relationships } = await agentSupabase
      .from("gl_product_relationships")
      .select("product_a_id, product_b_id, relationship_type, evidence")
      .or(`product_a_id.eq.${product.id},product_b_id.eq.${product.id}`)
      .limit(10);

    const { data: concerns } = await agentSupabase
      .from("gl_product_concerns")
      .select("id")
      .eq("product_id", product.id)
      .limit(10);

    return {
      product,
      relationships: relationships ?? [],
      concerns_count: concerns?.length ?? 0,
    };
  },
});

// ---------------------------------------------------------------------------
// Export all tools as a map for the AI SDK
// ---------------------------------------------------------------------------

export const agentTools = {
  get_patient_context: getPatientContext,
  search_fuel_documents: searchFuelDocuments,
  get_evidence_links: getEvidenceLinks,
  search_clinical_literature: searchClinicalLiterature,
  get_product_info: getProductInfo,
};

/** Build a filtered tool map for the executor — returns all tools if no names specified. */
export function buildTools(toolNames?: string[]) {
  if (!toolNames || toolNames.length === 0) return agentTools;
  const filtered: Record<string, (typeof agentTools)[keyof typeof agentTools]> = {};
  for (const name of toolNames) {
    if (name in agentTools) {
      filtered[name] = agentTools[name as keyof typeof agentTools];
    }
  }
  return filtered;
}
