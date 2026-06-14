import { agentSupabase, ragSupabase } from "@/lib/supabase";
import OpenAI from "openai";
import type {
  RetrievedSource,
  PubMedLocator,
  PodcastLocator,
  IndustryLocator,
  YouTubeLocator,
  DocumentLocator,
  SourceLocator,
  Corpus,
} from "@/lib/types/retrieval";

// ---------------------------------------------------------------------------
// RAG service (WS-B) — 4-corpus vector search
// ---------------------------------------------------------------------------

const RAG_SEARCH_URL =
  process.env.RAG_SEARCH_URL || "http://127.0.0.1:8100";

interface RagChunk {
  text: string;
  source: string; // "pubmed" | "youtube" | "podcast" | "industry"
  title: string | null;
  url: string | null;
  similarity: number;
  authority: number;
  final_score: number;
  metadata: {
    tier: string;
    source_id: string;
    tags: string[];
    // source-specific
    journal?: string;
    year?: string;
    channel?: string;
    show?: string;
    date?: string;
    show_category?: string;
    publisher?: string;
    feed_category?: string;
  };
}

async function searchRag(query: string, topK = 12): Promise<RagChunk[]> {
  try {
    const res = await fetch(`${RAG_SEARCH_URL}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, top_k: topK }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.error(`RAG search ${res.status}: ${await res.text().catch(() => "")}`);
      return [];
    }
    return (await res.json()) as RagChunk[];
  } catch (e) {
    console.error("RAG search failed:", e instanceof Error ? e.message : e);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Embedding helper (OpenAI text-embedding-3-small, 1536 dims)
// ---------------------------------------------------------------------------

let openaiClient: OpenAI | null = null;
function getOpenAI(): OpenAI | null {
  if (openaiClient) return openaiClient;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  openaiClient = new OpenAI({ apiKey: key });
  return openaiClient;
}

async function embedQuery(query: string): Promise<number[] | null> {
  const client = getOpenAI();
  if (!client) return null;
  try {
    const res = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });
    return res.data[0].embedding;
  } catch (e) {
    console.error("Embedding failed:", e instanceof Error ? e.message : e);
    return null;
  }
}

// ---------------------------------------------------------------------------
// RAG Supabase — direct podcast chunk search (match_podcast_chunks RPC)
// ---------------------------------------------------------------------------

interface PodcastChunkResult {
  chunk_id: string;
  episode_id: string;
  show_name: string;
  show_category: string | null;
  episode_title: string;
  published_date: string | null;
  chunk_text: string;
  chunk_index: number;
  similarity: number;
}

async function searchPodcastChunks(
  queryEmbedding: number[],
  matchCount = 6,
): Promise<RetrievedSource[]> {
  try {
    const { data, error } = await ragSupabase.rpc("match_podcast_chunks", {
      query_embedding: JSON.stringify(queryEmbedding),
      match_count: matchCount,
      match_threshold: 0.35,
    });
    if (error) {
      console.error("Podcast RPC error:", error.message);
      return [];
    }
    return ((data ?? []) as PodcastChunkResult[]).map((r) => {
      const locator: PodcastLocator = {
        type: "podcast",
        showName: r.show_name,
        episodeTitle: r.episode_title,
        publishedDate: r.published_date ?? undefined,
      };
      return {
        retrievalId: "",
        chunkRef: `podcast:${r.chunk_id}`,
        corpus: "podcast" as Corpus,
        scores: {
          vector: r.similarity,
          fused: r.similarity * 1.1,
          authorityWeight: 1.1,
          final: r.similarity * 1.1,
        },
        text: r.chunk_text,
        locator,
      };
    });
  } catch (e) {
    console.error("Podcast search failed:", e instanceof Error ? e.message : e);
    return [];
  }
}

// ---------------------------------------------------------------------------
// RAG Supabase — direct YouTube classified video search
// ---------------------------------------------------------------------------

interface YouTubeVideoResult {
  video_id: string;
  video_title: string;
  video_url: string | null;
  manufacturer_name: string;
  audience: string | null;
  content_type: string | null;
  summary: string | null;
  treatments: string[] | null;
  patient_safe: boolean | null;
  similarity: number;
  weighted_score: number;
  transcript_excerpt: string | null;
}

async function searchYouTubeVideos(
  queryEmbedding: number[],
  matchCount = 6,
): Promise<RetrievedSource[]> {
  try {
    const { data, error } = await ragSupabase.rpc("search_classified_videos", {
      query_embedding: JSON.stringify(queryEmbedding),
      match_count: matchCount,
      match_threshold: 0.35,
    });
    if (error) {
      console.error("YouTube RPC error:", error.message);
      return [];
    }
    return ((data ?? []) as YouTubeVideoResult[]).map((r) => {
      const locator: YouTubeLocator = {
        type: "youtube",
        videoId: r.video_id,
        videoTitle: r.video_title,
        manufacturerName: r.manufacturer_name,
        contentType: r.content_type ?? undefined,
        audience: r.audience ?? undefined,
        url: r.video_url || `https://www.youtube.com/watch?v=${r.video_id}`,
        thumbnailUrl: `https://img.youtube.com/vi/${r.video_id}/hqdefault.jpg`,
      };
      const text = [
        r.summary,
        r.transcript_excerpt,
      ].filter(Boolean).join("\n\n");
      return {
        retrievalId: "",
        chunkRef: `yt-direct:${r.video_id}`,
        corpus: "youtube" as Corpus,
        scores: {
          vector: r.similarity,
          fused: r.weighted_score,
          authorityWeight: 1.2,
          final: r.weighted_score,
        },
        text: text || r.video_title,
        locator,
      };
    });
  } catch (e) {
    console.error("YouTube search failed:", e instanceof Error ? e.message : e);
    return [];
  }
}

// ---------------------------------------------------------------------------
// GL product registry — all 18 demo products + category mappings
// ---------------------------------------------------------------------------

interface ProductEntry {
  offeringId: string;
  categoryId: string | null;
  name: string;
  /** Short name for locator titles (e.g. "BOTOX Cosmetic") */
  shortName: string;
  /** Keywords that match this product in a query (lowercase) */
  keywords: string[];
}

interface CategoryEntry {
  categoryId: string;
  name: string;
  keywords: string[];
}

const PRODUCTS: ProductEntry[] = [
  // Neurotoxins
  { offeringId: "4b92be36-e84e-432c-8549-f5d85a767fdb", categoryId: "57b7c5a8-0799-42b0-9111-8441f18a82db", name: "Botox Cosmetic", shortName: "BOTOX Cosmetic", keywords: ["botox", "onabotulinumtoxin", "ona botulinum"] },
  { offeringId: "a7e1b29e-da10-40de-bea8-70d6e6624f43", categoryId: "57b7c5a8-0799-42b0-9111-8441f18a82db", name: "Dysport", shortName: "Dysport", keywords: ["dysport", "abobotulinumtoxin", "abo botulinum"] },
  { offeringId: "92a05fe8-d349-4d2f-9a3f-bc5901f94dfa", categoryId: "57b7c5a8-0799-42b0-9111-8441f18a82db", name: "Xeomin", shortName: "Xeomin", keywords: ["xeomin", "incobotulinumtoxin", "inco botulinum"] },
  { offeringId: "007d98fd-58b5-4d20-be11-caf421c0dccb", categoryId: "57b7c5a8-0799-42b0-9111-8441f18a82db", name: "Daxxify", shortName: "Daxxify", keywords: ["daxxify", "daxibotulinumtoxin", "daxi botulinum"] },
  { offeringId: "8adda68a-9fd2-49ad-8852-641970135131", categoryId: "57b7c5a8-0799-42b0-9111-8441f18a82db", name: "Jeuveau", shortName: "Jeuveau", keywords: ["jeuveau", "prabotulinumtoxin", "prabo botulinum", "newtox"] },
  // Dermal Fillers
  { offeringId: "6c8f72f0-887f-484a-a588-0bb9bd8052c9", categoryId: "138ed383-364a-44a3-87a0-8e641ecd4200", name: "Juvederm Voluma XC", shortName: "Juvederm Voluma XC", keywords: ["voluma", "juvederm voluma", "juvéderm voluma"] },
  { offeringId: "7370545f-97a3-4519-a92d-3ac4f969829d", categoryId: "138ed383-364a-44a3-87a0-8e641ecd4200", name: "Juvederm Vollure XC", shortName: "Juvederm Vollure XC", keywords: ["vollure", "juvederm vollure", "juvéderm vollure"] },
  { offeringId: "f1732c7c-3f19-4f3d-9aff-543a132e5506", categoryId: "138ed383-364a-44a3-87a0-8e641ecd4200", name: "Restylane Lyft", shortName: "Restylane Lyft", keywords: ["restylane lyft", "restylane"] },
  { offeringId: "d8a00419-39e1-4d4b-8dab-ad134fb00930", categoryId: "138ed383-364a-44a3-87a0-8e641ecd4200", name: "RHA Redensity", shortName: "RHA Redensity", keywords: ["rha redensity", "rha", "redensity"] },
  { offeringId: "b74d5475-bf58-4d7d-87f5-2c8dc9e252de", categoryId: "138ed383-364a-44a3-87a0-8e641ecd4200", name: "Skinvive", shortName: "Skinvive by Juvederm", keywords: ["skinvive"] },
  // Biostimulators
  { offeringId: "2ce7a3d2-b06d-4b62-b9b7-4113afb51baa", categoryId: "a6a854e2-7db1-4ec0-bac0-7b346454fca0", name: "Sculptra Aesthetic", shortName: "Sculptra Aesthetic", keywords: ["sculptra", "poly-l-lactic", "plla"] },
  // Injectable Fat Reduction
  { offeringId: "0f901fec-5de5-4950-815e-82c3e47cb2ec", categoryId: "b51855e7-73a2-498b-b1c4-4fdc739635a2", name: "Kybella", shortName: "Kybella", keywords: ["kybella", "deoxycholic"] },
  // Body Contouring
  { offeringId: "694ea839-cf8f-4a17-b838-2588674c792f", categoryId: "d72803ce-814f-4905-8ce4-3d44323e9503", name: "CoolSculpting Elite", shortName: "CoolSculpting Elite", keywords: ["coolsculpting", "cryolipolysis"] },
  // RF Microneedling
  { offeringId: "84ac561e-1818-4ece-a8d7-1fb6c5ea80df", categoryId: "836bcdf0-aa49-4dae-9ced-bd9c4a027299", name: "Morpheus8", shortName: "Morpheus8", keywords: ["morpheus8", "morpheus 8", "morpheus"] },
  // Skin Tightening
  { offeringId: "78973d13-fa36-41dd-8625-4b851ff143ed", categoryId: "4eb4c667-16af-44ba-94c6-e85edffef558", name: "Sofwave SUPERB", shortName: "Sofwave SUPERB", keywords: ["sofwave", "superb"] },
  // Ultrasound Lifting
  { offeringId: "da25d447-c316-40b2-802e-e190c0bdbd9f", categoryId: "1c9acf3e-8753-4bd3-af98-9372c994eec3", name: "Ultherapy PRIME", shortName: "Ultherapy PRIME", keywords: ["ultherapy", "ulthera"] },
  // Pigment & Skin Rejuvenation
  { offeringId: "be46f975-99d7-4772-867e-744814626654", categoryId: "b35c36c4-ee76-422d-89a6-0e7a4af568b9", name: "Hollywood Spectra", shortName: "Hollywood Spectra", keywords: ["hollywood spectra", "spectra laser", "q-switched"] },
  // HydraFacial (no category)
  { offeringId: "28918bda-787b-412a-9802-d3d9a00e6ab1", categoryId: null, name: "HydraFacial Syndeo", shortName: "HydraFacial Syndeo", keywords: ["hydrafacial", "syndeo"] },
];

const CATEGORIES: CategoryEntry[] = [
  { categoryId: "57b7c5a8-0799-42b0-9111-8441f18a82db", name: "Neurotoxins", keywords: ["neurotoxin", "botulinum", "toxin", "neuromodulator"] },
  { categoryId: "138ed383-364a-44a3-87a0-8e641ecd4200", name: "Dermal Fillers", keywords: ["filler", "dermal filler", "hyaluronic", "ha filler", "juvederm", "restylane"] },
  { categoryId: "a6a854e2-7db1-4ec0-bac0-7b346454fca0", name: "Biostimulators", keywords: ["biostimulator", "collagen stimulat"] },
  { categoryId: "b51855e7-73a2-498b-b1c4-4fdc739635a2", name: "Injectable Fat Reduction", keywords: ["fat reduction", "fat dissolv", "double chin", "submental"] },
  { categoryId: "d72803ce-814f-4905-8ce4-3d44323e9503", name: "Body Contouring", keywords: ["body contour", "fat freez", "body sculpt"] },
  { categoryId: "836bcdf0-aa49-4dae-9ced-bd9c4a027299", name: "RF Microneedling", keywords: ["rf microneedling", "radiofrequency microneedling", "microneedling"] },
  { categoryId: "4eb4c667-16af-44ba-94c6-e85edffef558", name: "Skin Tightening", keywords: ["skin tightening", "skin laxity", "tighten"] },
  { categoryId: "1c9acf3e-8753-4bd3-af98-9372c994eec3", name: "Ultrasound Lifting", keywords: ["ultrasound lift", "mfu-v", "hifu", "non-surgical lift"] },
  { categoryId: "b35c36c4-ee76-422d-89a6-0e7a4af568b9", name: "Pigment & Skin Rejuvenation", keywords: ["pigment", "melasma", "hyperpigment", "skin rejuvenation", "laser facial"] },
  { categoryId: "1b17dd9a-3509-4183-ba50-cae83e0813b5", name: "Energy-Based Treatments", keywords: ["energy device", "energy-based", "laser treatment"] },
];

// ---------------------------------------------------------------------------
// Query → product/category matching
// ---------------------------------------------------------------------------

interface MatchResult {
  offeringIds: string[];
  categoryIds: string[];
  /** Short names for matched products (used in locator titles) */
  matchedProducts: Map<string, ProductEntry>;
}

function matchQuery(query: string): MatchResult {
  const lower = query.toLowerCase();
  const matchedProducts = new Map<string, ProductEntry>();
  const categoryIds = new Set<string>();

  // Match specific products
  for (const product of PRODUCTS) {
    if (product.keywords.some((kw) => lower.includes(kw))) {
      matchedProducts.set(product.offeringId, product);
      if (product.categoryId) categoryIds.add(product.categoryId);
    }
  }

  // Match categories (pulls category-level dossiers even without a product match)
  for (const cat of CATEGORIES) {
    if (cat.keywords.some((kw) => lower.includes(kw))) {
      categoryIds.add(cat.categoryId);
    }
  }

  return {
    offeringIds: Array.from(matchedProducts.keys()),
    categoryIds: Array.from(categoryIds),
    matchedProducts,
  };
}

// ---------------------------------------------------------------------------
// GL/FDA evidence_links + dossiers (now product-aware)
// ---------------------------------------------------------------------------

const AUTHORITY_WEIGHT: Record<string, number> = {
  fda: 1.45,
  manufacturer: 1.40,
  practice: 1.35,
  pubmed: 1.33,
  product_catalog: 1.30,
  content_asset: 1.25,
  agent_fuel: 1.35,
};

interface EvidenceLinkRow {
  id: string;
  offering_id: string | null;
  source: string;
  authority_rank: number | null;
  snippet: string | null;
  doi: string | null;
  pmid: string | null;
  url: string | null;
  page_number: number | null;
  field_name: string | null;
}

interface RefDocRow {
  id: string;
  offering_id: string | null;
  category_id: string | null;
  content_md: string | null;
  lens: string;
  doc_type: string | null;
  status: string;
  version: number | null;
  title: string | null;
}

function parseSnippet(snippet: string | null): string {
  if (!snippet) return "";
  try {
    const parsed = JSON.parse(snippet) as unknown;
    if (Array.isArray(parsed)) return (parsed as string[]).join(", ");
    if (typeof parsed === "object" && parsed !== null) {
      const obj = parsed as Record<string, unknown>;
      const val = obj.display ?? obj.text;
      if (typeof val === "string") return val;
    }
  } catch {
    // plain string
  }
  return snippet.trim();
}

function buildEvidenceLocator(
  row: EvidenceLinkRow,
  product: ProductEntry | undefined,
): SourceLocator | null {
  const src = row.source ?? "";
  const productName = product?.shortName ?? "Product";

  if (src === "pubmed") {
    if (!row.pmid && !row.url) return null;
    const locator: PubMedLocator = {
      type: "pubmed",
      pmid: row.pmid ?? "",
      title: row.field_name
        ? `${productName} — ${row.field_name.replace(/_/g, " ")}`
        : `PubMed ${row.pmid}`,
      doi: row.doi ?? undefined,
      url: row.url || `https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`,
    };
    return locator;
  }

  if (src === "youtube") {
    const videoIdMatch = row.url?.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch?.[1] ?? row.id;
    // Extract start time from URL (&t=65s → 65)
    const startMatch = row.url?.match(/[?&]t=(\d+)/);
    const startSeconds = startMatch ? parseInt(startMatch[1]) : undefined;
    const title = row.field_name
      ? `${productName} — ${row.field_name.replace(/_/g, " ")}`
      : `${productName} Video`;
    const locator: YouTubeLocator = {
      type: "youtube",
      videoId,
      videoTitle: title,
      manufacturerName: product?.name,
      startSeconds,
      url: row.url || `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
    return locator;
  }

  if (src === "fda_label" || src === "fda" || src === "ifu") {
    const locator: DocumentLocator = {
      type: "document",
      corpus: "fda",
      filename: `${productName.toLowerCase().replace(/\s+/g, "-")}-pi.pdf`,
      title: `${productName} Prescribing Information`,
      pageNumber: row.page_number ?? undefined,
      section: row.field_name ?? undefined,
      storagePath: `fda/${row.offering_id}/${row.id}`,
      url: row.url || "",
      sourceAuthority: "fda_label",
    };
    return locator;
  }

  const locator: DocumentLocator = {
    type: "document",
    corpus: "manufacturer",
    filename: row.field_name
      ? `${productName.toLowerCase().replace(/\s+/g, "-")}-${row.field_name.replace(/_/g, "-")}.pdf`
      : `${productName.toLowerCase().replace(/\s+/g, "-")}-manufacturer.pdf`,
    title: row.field_name
      ? `${productName} — ${row.field_name.replace(/_/g, " ")}`
      : `${productName} Manufacturer Documentation`,
    pageNumber: row.page_number ?? undefined,
    section: row.field_name ?? undefined,
    storagePath: `manufacturer/${row.id}`,
    url: row.url || "",
    sourceAuthority: "manufacturer",
  };
  return locator;
}

function corpusForSource(source: string): Corpus {
  switch (source) {
    case "pubmed":
      return "pubmed";
    case "fda_label":
    case "fda":
    case "ifu":
      return "fda";
    case "youtube":
      return "youtube";
    default:
      return "manufacturer";
  }
}

// ---------------------------------------------------------------------------
// RAG chunk → RetrievedSource mapper
// ---------------------------------------------------------------------------

function ragChunkToSource(chunk: RagChunk): RetrievedSource {
  const corpus = chunk.source as Corpus;
  const locator = buildRagLocator(chunk);
  return {
    retrievalId: "", // assigned after merge
    chunkRef: `${chunk.source}:${chunk.metadata.source_id}`,
    corpus,
    scores: {
      vector: chunk.similarity,
      fused: chunk.final_score,
      authorityWeight: chunk.authority,
      final: chunk.final_score,
    },
    text: chunk.text,
    locator,
  };
}

function buildRagLocator(chunk: RagChunk): SourceLocator {
  const meta = chunk.metadata;

  switch (chunk.source) {
    case "pubmed": {
      const loc: PubMedLocator = {
        type: "pubmed",
        pmid: meta.source_id,
        title: chunk.title || `PubMed ${meta.source_id}`,
        journal: meta.journal,
        pubDate: meta.year,
        url: chunk.url || `https://pubmed.ncbi.nlm.nih.gov/${meta.source_id}/`,
      };
      return loc;
    }
    case "youtube": {
      const loc: YouTubeLocator = {
        type: "youtube",
        videoId: meta.source_id,
        videoTitle: chunk.title || "Video",
        manufacturerName: meta.channel,
        url: chunk.url || `https://www.youtube.com/watch?v=${meta.source_id}`,
        thumbnailUrl: `https://img.youtube.com/vi/${meta.source_id}/hqdefault.jpg`,
      };
      return loc;
    }
    case "podcast": {
      const loc: PodcastLocator = {
        type: "podcast",
        showName: meta.show || "Podcast",
        episodeTitle: chunk.title || "Episode",
        publishedDate: meta.date,
      };
      return loc;
    }
    case "industry": {
      const loc: IndustryLocator = {
        type: "industry",
        articleTitle: chunk.title || "Article",
        publication: meta.publisher,
        url: chunk.url ?? undefined,
      };
      return loc;
    }
    default: {
      const loc: DocumentLocator = {
        type: "document",
        corpus: "manufacturer",
        filename: `${chunk.source}-${meta.source_id}`,
        title: chunk.title || chunk.source,
        storagePath: `${chunk.source}/${meta.source_id}`,
        url: chunk.url || "",
      };
      return loc;
    }
  }
}

// ---------------------------------------------------------------------------
// GL products table — descriptions, indications, contraindications, etc.
// ---------------------------------------------------------------------------

interface ProductRow {
  id: string;
  name: string;
  brand_name: string | null;
  generic_name: string | null;
  description: string | null;
  indications: string[] | null;
  contraindications: string[] | null;
  warnings: string[] | null;
  side_effects: string[] | null;
  fda_approved_areas: string[] | null;
  onset_time: string | null;
  duration_of_effect: string | null;
  manufacturer_name?: string;
}

async function retrieveProductCatalog(match: MatchResult): Promise<RetrievedSource[]> {
  if (match.offeringIds.length === 0) return [];

  const { data } = await agentSupabase
    .from("products")
    .select("id, name, brand_name, generic_name, description, indications, contraindications, warnings, side_effects, fda_approved_areas, onset_time, duration_of_effect, manufacturers(name)")
    .in("id", match.offeringIds)
    .eq("is_active", true);

  if (!data || data.length === 0) return [];

  const authWeight = AUTHORITY_WEIGHT.product_catalog;
  return (data as unknown as (ProductRow & { manufacturers?: { name: string }[] | null })[])
    .filter((p) => p.description)
    .map((p) => {
      const sections: string[] = [];
      if (p.description) sections.push(p.description);
      if (p.indications?.length) sections.push(`Indications: ${p.indications.join(", ")}`);
      if (p.contraindications?.length) sections.push(`Contraindications: ${p.contraindications.join(", ")}`);
      if (p.warnings?.length) sections.push(`Warnings: ${p.warnings.join(", ")}`);
      if (p.side_effects?.length) sections.push(`Side effects: ${p.side_effects.join(", ")}`);
      if (p.fda_approved_areas?.length) sections.push(`FDA-approved areas: ${p.fda_approved_areas.join(", ")}`);
      if (p.onset_time) sections.push(`Onset: ${p.onset_time}`);
      if (p.duration_of_effect) sections.push(`Duration: ${p.duration_of_effect}`);

      const productName = p.brand_name || p.name;
      const mfr = p.manufacturers?.[0]?.name;
      const locator: DocumentLocator = {
        type: "document",
        corpus: "manufacturer",
        filename: `product-${p.id}.md`,
        title: mfr ? `${productName} (${mfr})` : productName,
        storagePath: `product-catalog/${p.id}`,
        url: "",
        sourceAuthority: "manufacturer",
      };

      return {
        retrievalId: "",
        chunkRef: `product:${p.id}`,
        corpus: "manufacturer" as Corpus,
        scores: { fused: authWeight, authorityWeight: authWeight, final: authWeight },
        text: sections.join("\n"),
        locator,
      };
    });
}

// ---------------------------------------------------------------------------
// GL content_assets — manufacturer PDFs, patient labeling, consent docs
// ---------------------------------------------------------------------------

interface ContentAssetRow {
  id: string;
  title: string | null;
  description: string | null;
  source: string | null;
  url: string | null;
  storage_path: string | null;
  mime_type: string | null;
  patient_safe: boolean | null;
  offering_content: { offering_id: string | null; usage_context: string | null }[];
}

async function retrieveContentAssets(match: MatchResult): Promise<RetrievedSource[]> {
  if (match.offeringIds.length === 0) return [];

  // Query via offering_content junction table (PostgREST inner join via !inner)
  const { data } = await agentSupabase
    .from("offering_content")
    .select("offering_id, usage_context, content_assets!inner(id, title, description, source, url, storage_path, mime_type, patient_safe)")
    .in("offering_id", match.offeringIds);

  if (!data || data.length === 0) return [];

  interface OcRow {
    offering_id: string | null;
    usage_context: string | null;
    content_assets: {
      id: string;
      title: string | null;
      description: string | null;
      source: string | null;
      url: string | null;
      storage_path: string | null;
      mime_type: string | null;
      patient_safe: boolean | null;
    };
  }

  const authWeight = AUTHORITY_WEIGHT.content_asset;
  const seenAssets = new Set<string>();
  return (data as unknown as OcRow[])
    .filter((oc) => oc.content_assets?.title && !seenAssets.has(oc.content_assets.id))
    .map((oc) => {
      const a = oc.content_assets;
      seenAssets.add(a.id);
      const product = oc.offering_id
        ? match.matchedProducts.get(oc.offering_id)
        : undefined;
      const context = oc.usage_context;
      const corpus: Corpus = a.source === "manufacturer" ? "manufacturer" : "practice";
      const locator: DocumentLocator = {
        type: "document",
        corpus: corpus === "manufacturer" ? "manufacturer" : "practice",
        filename: a.storage_path ?? `asset-${a.id}`,
        title: product
          ? `${product.shortName} — ${a.title}`
          : a.title ?? "Document",
        storagePath: a.storage_path ?? `assets/${a.id}`,
        url: a.url ?? "",
        sourceAuthority: a.source === "manufacturer" ? "manufacturer" : "internal",
      };

      const text = [
        a.title,
        context ? `Usage: ${context}` : null,
        a.description,
      ].filter(Boolean).join("\n");

      return {
        retrievalId: "",
        chunkRef: `asset:${a.id}`,
        corpus,
        scores: { fused: authWeight, authorityWeight: authWeight, final: authWeight },
        text,
        locator,
      };
    });
}

// ---------------------------------------------------------------------------
// GL agent_fuel_documents — enriched category/product fuel
// ---------------------------------------------------------------------------

interface FuelDocRow {
  id: string;
  offering_id: string | null;
  category_id: string | null;
  fuel_type: string;
  content: Record<string, unknown> | null;
  status: string;
}

function fuelContentToText(content: Record<string, unknown> | null): string {
  if (!content) return "";
  const parts: string[] = [];
  for (const [key, val] of Object.entries(content)) {
    if (typeof val === "string") {
      parts.push(`${key.replace(/_/g, " ")}: ${val}`);
    } else if (Array.isArray(val)) {
      parts.push(`${key.replace(/_/g, " ")}: ${val.join("; ")}`);
    }
  }
  return parts.join("\n").slice(0, 1500);
}

async function retrieveAgentFuel(match: MatchResult): Promise<RetrievedSource[]> {
  const orClauses: string[] = [];
  if (match.offeringIds.length > 0) {
    orClauses.push(`offering_id.in.(${match.offeringIds.join(",")})`);
  }
  if (match.categoryIds.length > 0) {
    orClauses.push(`category_id.in.(${match.categoryIds.join(",")})`);
  }
  if (orClauses.length === 0) return [];

  const { data } = await agentSupabase
    .from("agent_fuel_documents")
    .select("id, offering_id, category_id, fuel_type, content, status")
    .or(orClauses.join(","))
    .in("status", ["active", "draft"]);

  if (!data || data.length === 0) return [];

  const authWeight = AUTHORITY_WEIGHT.agent_fuel;
  return (data as FuelDocRow[])
    .filter((f) => f.content && Object.keys(f.content).length > 0)
    .map((f) => {
      const product = f.offering_id
        ? match.matchedProducts.get(f.offering_id)
        : undefined;
      const title = product
        ? `${product.shortName} — ${f.fuel_type.replace(/_/g, " ")}`
        : `${f.fuel_type.replace(/_/g, " ")}`;
      const locator: DocumentLocator = {
        type: "document",
        corpus: "practice",
        filename: `fuel-${f.id}.md`,
        title,
        storagePath: `agent-fuel/${f.id}`,
        url: "",
        sourceAuthority: "internal",
      };

      return {
        retrievalId: "",
        chunkRef: `fuel:${f.id}`,
        corpus: "practice" as Corpus,
        scores: { fused: authWeight, authorityWeight: authWeight, final: authWeight },
        text: fuelContentToText(f.content),
        locator,
      };
    });
}

// ---------------------------------------------------------------------------
// GL retrieval — product-aware (replaces old Botox-only retrieveGlSources)
// ---------------------------------------------------------------------------

async function retrieveGlSources(match: MatchResult): Promise<{
  sources: RetrievedSource[];
  knowledge: string;
}> {
  if (match.offeringIds.length === 0 && match.categoryIds.length === 0) {
    return { sources: [], knowledge: "" };
  }

  // Build evidence_links query for all matched offerings
  const evPromise =
    match.offeringIds.length > 0
      ? agentSupabase
          .from("evidence_links")
          .select(
            "id, source, authority_rank, snippet, doi, pmid, url, page_number, field_name, offering_id",
          )
          .in("offering_id", match.offeringIds)
          .not("snippet", "is", null)
          .order("authority_rank", { ascending: true })
          .limit(60)
      : Promise.resolve({ data: [] as EvidenceLinkRow[] });

  // Build dossier query: product-level + category-level
  const orClauses: string[] = [];
  if (match.offeringIds.length > 0) {
    orClauses.push(`offering_id.in.(${match.offeringIds.join(",")})`);
  }
  if (match.categoryIds.length > 0) {
    orClauses.push(`category_id.in.(${match.categoryIds.join(",")})`);
  }

  const docPromise = agentSupabase
    .from("agent_reference_docs")
    .select(
      "id, content_md, lens, doc_type, offering_id, category_id, status, version, title",
    )
    .or(orClauses.join(","))
    .in("lens", ["clinical", "deep_product"])
    .in("status", ["draft", "active"])
    .order("version", { ascending: false })
    .limit(10);

  // Fan out all GL queries in parallel: evidence_links, dossiers, products, assets, fuel
  const [{ data: evRows }, { data: docRows }, productSources, assetSources, fuelSources] =
    await Promise.all([
      evPromise,
      docPromise,
      retrieveProductCatalog(match),
      retrieveContentAssets(match),
      retrieveAgentFuel(match),
    ]);

  const evidenceLinks = (evRows ?? []) as EvidenceLinkRow[];
  const refDocs = (docRows ?? []) as RefDocRow[];

  // Map evidence_links → RetrievedSource
  const evSources: RetrievedSource[] = [];
  for (const row of evidenceLinks) {
    const product = row.offering_id
      ? match.matchedProducts.get(row.offering_id)
      : undefined;
    const locator = buildEvidenceLocator(row, product);
    if (!locator) continue;
    const corpus = corpusForSource(row.source);
    const authWeight = AUTHORITY_WEIGHT[corpus] ?? 1.0;
    evSources.push({
      retrievalId: "",
      chunkRef: `${row.source}:${row.id}`,
      corpus,
      scores: {
        fused: authWeight,
        authorityWeight: authWeight,
        final: authWeight,
      },
      text: parseSnippet(row.snippet),
      locator,
    });
  }

  // Map dossiers → RetrievedSource
  const docSources: RetrievedSource[] = refDocs.map((row) => {
    const product = row.offering_id
      ? match.matchedProducts.get(row.offering_id)
      : undefined;
    const displayTitle = row.title ?? row.doc_type ?? "Dossier";
    const locator: DocumentLocator = {
      type: "document",
      corpus: "practice",
      filename: `dossier-${row.id}.md`,
      title: product ? `${product.shortName} — ${row.doc_type}` : displayTitle,
      storagePath: `dossier/${row.id}`,
      url: "",
      sourceAuthority: "internal",
    };
    const authWeight = AUTHORITY_WEIGHT.practice;
    return {
      retrievalId: "",
      chunkRef: `dossier:${row.id}`,
      corpus: "practice" as Corpus,
      scores: {
        fused: authWeight,
        authorityWeight: authWeight,
        final: authWeight,
      },
      text: (row.content_md ?? "").slice(0, 1200),
      locator,
    };
  });

  // Build knowledge string from top dossiers
  const knowledge = refDocs
    .slice(0, 5)
    .map(
      (d) =>
        `## ${d.title ?? d.doc_type ?? "Document"} (${d.lens})\n${(d.content_md ?? "").slice(0, 1500)}`,
    )
    .join("\n\n");

  return {
    sources: [...evSources, ...docSources, ...productSources, ...assetSources, ...fuelSources],
    knowledge,
  };
}

// ---------------------------------------------------------------------------
// Scope detection (relaxed — aesthetics-wide)
// ---------------------------------------------------------------------------

const AESTHETICS_TERMS = [
  // Neuromodulators
  "botox", "neurotoxin", "botulinum", "glabellar", "onabotulinumtoxin",
  "dysport", "xeomin", "daxxify", "jeuveau", "neuromodulator",
  // Energy devices
  "morpheus8", "morpheus", "microneedling", "rf", "radiofrequency", "laser", "ipl",
  "ultherapy", "thermage", "coolsculpting", "emsculpt", "hydrafacial",
  "sofwave", "spectra",
  // Injectables
  "filler", "hyaluronic", "juvederm", "restylane", "sculptra", "radiesse",
  "kybella", "deoxycholic", "voluma", "vollure", "skinvive", "rha",
  // Skin
  "peel", "retinol", "retinoid", "prf", "prp", "exosome",
  // Concerns
  "wrinkle", "acne", "scar", "melasma", "hyperpigment", "rosacea",
  "aging", "rejuvenation", "tightening", "contouring", "laxity",
  // Body
  "liposuction", "body contour", "cellulite", "cryolipolysis",
  // General clinical
  "contraindication", "side effect", "adverse", "dosing", "dilution",
  "anesthesia", "numbing", "downtime", "recovery",
  // Business
  "treatment plan", "consultation", "aesthetic", "cosmetic", "med spa",
  "medspa", "dermatology", "plastic surgery",
];

function isInScope(query: string): boolean {
  const lower = query.toLowerCase();
  return AESTHETICS_TERMS.some((t) => lower.includes(t));
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Retrieve grounded sources for a query.
 *
 * Strategy:
 *  1. RAG service (WS-B) — 4-corpus vector search (PubMed, YouTube, Podcast, Industry)
 *  2. GL evidence_links + dossiers — for any matched products/categories
 *  3. Merge, deduplicate by chunkRef, sort by final score, assign retrievalIds
 *
 * Returns [] for out-of-scope queries so the route emits the honest decline.
 */
export async function retrieveSources(
  query: string,
): Promise<{ sources: RetrievedSource[]; knowledge: string }> {
  if (!isInScope(query)) {
    return { sources: [], knowledge: "" };
  }

  const match = matchQuery(query);

  // Generate embedding for direct Supabase vector search (podcast + YouTube)
  const embeddingPromise = embedQuery(query);

  // Fan out: RAG search + GL/FDA + embedding in parallel
  const [ragChunks, glResult, queryEmbedding] = await Promise.all([
    searchRag(query, 16),
    retrieveGlSources(match),
    embeddingPromise,
  ]);

  // Map RAG chunks to RetrievedSource
  const ragSources = ragChunks.map(ragChunkToSource);

  // Direct Supabase vector search (podcast + YouTube) — runs in parallel
  let podcastSources: RetrievedSource[] = [];
  let ytDirectSources: RetrievedSource[] = [];
  if (queryEmbedding) {
    [podcastSources, ytDirectSources] = await Promise.all([
      searchPodcastChunks(queryEmbedding, 6),
      searchYouTubeVideos(queryEmbedding, 6),
    ]);
  }

  // Merge: GL/FDA first (regulatory floor), then RAG, then direct podcast/YouTube
  // Deduplicate by chunkRef
  const seen = new Set<string>();
  const merged: RetrievedSource[] = [];

  for (const s of glResult.sources) {
    if (!seen.has(s.chunkRef)) {
      seen.add(s.chunkRef);
      merged.push(s);
    }
  }
  for (const s of ragSources) {
    if (!seen.has(s.chunkRef)) {
      seen.add(s.chunkRef);
      merged.push(s);
    }
  }
  for (const s of [...podcastSources, ...ytDirectSources]) {
    if (!seen.has(s.chunkRef)) {
      seen.add(s.chunkRef);
      merged.push(s);
    }
  }

  // Diversity-aware ranking: guarantee representation from each corpus,
  // then fill remaining slots by score. This prevents high-authority GL
  // sources from crowding out RAG results (YouTube, PubMed, Podcast).
  const MAX_SOURCES = 20;
  const byCorpus = new Map<Corpus, RetrievedSource[]>();
  for (const s of merged) {
    const arr = byCorpus.get(s.corpus) ?? [];
    arr.push(s);
    byCorpus.set(s.corpus, arr);
  }
  // Sort each corpus bucket by score
  for (const arr of byCorpus.values()) {
    arr.sort((a, b) => b.scores.final - a.scores.final);
  }

  // Reserve up to 3 slots per corpus, then fill remainder by score
  const reserved = new Set<string>();
  const final: RetrievedSource[] = [];
  const RESERVE_PER_CORPUS = 3;
  for (const [, arr] of byCorpus) {
    for (const s of arr.slice(0, RESERVE_PER_CORPUS)) {
      reserved.add(s.chunkRef);
      final.push(s);
    }
  }
  // Fill remaining slots from all sources by score
  merged.sort((a, b) => b.scores.final - a.scores.final);
  for (const s of merged) {
    if (final.length >= MAX_SOURCES) break;
    if (!reserved.has(s.chunkRef)) {
      final.push(s);
    }
  }
  // Re-sort final list by score for consistent ordering
  final.sort((a, b) => b.scores.final - a.scores.final);
  const sources = final.slice(0, MAX_SOURCES).map((s, i) => ({
    ...s,
    retrievalId: `src_${i + 1}`,
  }));

  return { sources, knowledge: glResult.knowledge };
}
