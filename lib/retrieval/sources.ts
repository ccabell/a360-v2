import { agentSupabase } from "@/lib/supabase";
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
// GL/FDA evidence_links (the regulatory floor — always queried)
// ---------------------------------------------------------------------------

const BOTOX_OFFERING_ID = "4b92be36-e84e-432c-8549-f5d85a767fdb";
const NEUROTOXINS_CATEGORY_ID = "57b7c5a8-0799-42b0-9111-8441f18a82db";

const AUTHORITY_WEIGHT: Record<string, number> = {
  fda: 1.45,
  manufacturer: 1.40,
  pubmed: 1.33,
  practice: 1.35,
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

function buildEvidenceLocator(row: EvidenceLinkRow): SourceLocator | null {
  const src = row.source ?? "";

  if (src === "pubmed") {
    if (!row.pmid && !row.url) return null;
    const locator: PubMedLocator = {
      type: "pubmed",
      pmid: row.pmid ?? "",
      title: row.field_name
        ? `BOTOX — ${row.field_name.replace(/_/g, " ")}`
        : `PubMed ${row.pmid}`,
      doi: row.doi ?? undefined,
      url: row.url || `https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`,
    };
    return locator;
  }

  if (src === "fda_label" || src === "fda" || src === "ifu") {
    const locator: DocumentLocator = {
      type: "document",
      corpus: "fda",
      filename: "botox-cosmetic-pi.pdf",
      title: "BOTOX Cosmetic Prescribing Information",
      pageNumber: row.page_number ?? undefined,
      section: row.field_name ?? undefined,
      storagePath: "fda/botox-cosmetic-pi.pdf",
      url: row.url || "",
      sourceAuthority: "fda_label",
    };
    return locator;
  }

  const locator: DocumentLocator = {
    type: "document",
    corpus: "manufacturer",
    filename: row.field_name
      ? `botox-${row.field_name.replace(/_/g, "-")}.pdf`
      : "botox-manufacturer.pdf",
    title: row.field_name
      ? `BOTOX — ${row.field_name.replace(/_/g, " ")}`
      : "BOTOX Manufacturer Documentation",
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
// GL/FDA retrieval (existing path — always runs for Botox/neuro queries)
// ---------------------------------------------------------------------------

async function retrieveGlSources(): Promise<{
  sources: RetrievedSource[];
  knowledge: string;
}> {
  const [{ data: evRows }, { data: docRows }] = await Promise.all([
    agentSupabase
      .from("evidence_links")
      .select(
        "id, source, authority_rank, snippet, doi, pmid, url, page_number, field_name, offering_id",
      )
      .eq("offering_id", BOTOX_OFFERING_ID)
      .not("snippet", "is", null)
      .order("authority_rank", { ascending: true })
      .limit(50),
    agentSupabase
      .from("agent_reference_docs")
      .select(
        "id, content_md, lens, doc_type, offering_id, category_id, status, version",
      )
      .or(
        `offering_id.eq.${BOTOX_OFFERING_ID},category_id.eq.${NEUROTOXINS_CATEGORY_ID}`,
      )
      .in("lens", ["clinical", "deep_product"])
      .in("status", ["draft", "active"])
      .order("version", { ascending: false })
      .limit(5),
  ]);

  const evidenceLinks = (evRows ?? []) as EvidenceLinkRow[];
  const refDocs = (docRows ?? []) as RefDocRow[];

  const evSources: RetrievedSource[] = [];
  for (const row of evidenceLinks) {
    const locator = buildEvidenceLocator(row);
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

  const docSources: RetrievedSource[] = (refDocs ?? []).map((row) => {
    const locator: DocumentLocator = {
      type: "document",
      corpus: "practice",
      filename: `dossier-${row.id}.md`,
      title: row.doc_type ?? "Dossier",
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

  const knowledge = refDocs
    .slice(0, 3)
    .map(
      (d) =>
        `## ${d.doc_type ?? "Document"} (${d.lens})\n${(d.content_md ?? "").slice(0, 1500)}`,
    )
    .join("\n\n");

  return { sources: [...evSources, ...docSources], knowledge };
}

// ---------------------------------------------------------------------------
// Scope detection (relaxed — was Botox-only, now aesthetics-wide)
// ---------------------------------------------------------------------------

const BOTOX_TERMS = [
  "botox",
  "neurotoxin",
  "botulinum",
  "glabellar",
  "onabotulinumtoxin",
  "dysport",
  "xeomin",
  "daxxify",
];

const AESTHETICS_TERMS = [
  // Neuromodulators
  ...BOTOX_TERMS,
  // Energy devices
  "morpheus8", "microneedling", "rf", "radiofrequency", "laser", "ipl",
  "ultherapy", "thermage", "coolsculpting", "emsculpt", "hydrafacial",
  // Injectables
  "filler", "hyaluronic", "juvederm", "restylane", "sculptra", "radiesse",
  "kybella", "deoxycholic",
  // Skin
  "peel", "retinol", "retinoid", "prf", "prp", "exosome",
  // Concerns
  "wrinkle", "acne", "scar", "melasma", "hyperpigment", "rosacea",
  "aging", "rejuvenation", "tightening", "contouring", "laxity",
  // Body
  "liposuction", "body contour", "cellulite",
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

function isBotoxQuery(query: string): boolean {
  const lower = query.toLowerCase();
  return BOTOX_TERMS.some((t) => lower.includes(t));
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Retrieve grounded sources for a query.
 *
 * Strategy:
 *  1. RAG service (WS-B) — 4-corpus vector search (PubMed, YouTube, Podcast, Industry)
 *  2. GL/FDA evidence_links — regulatory floor (for Botox/neuro queries)
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

  // Fan out: RAG search + GL/FDA (if Botox-relevant) in parallel
  const [ragChunks, glResult] = await Promise.all([
    searchRag(query, 16),
    isBotoxQuery(query) ? retrieveGlSources() : Promise.resolve({ sources: [], knowledge: "" }),
  ]);

  // Map RAG chunks to RetrievedSource
  const ragSources = ragChunks.map(ragChunkToSource);

  // Merge: RAG sources first (already authority-ranked), then GL/FDA
  // Deduplicate by chunkRef (RAG pubmed may overlap with GL evidence_links)
  const seen = new Set<string>();
  const merged: RetrievedSource[] = [];

  // GL/FDA first (regulatory floor — highest authority)
  for (const s of glResult.sources) {
    if (!seen.has(s.chunkRef)) {
      seen.add(s.chunkRef);
      merged.push(s);
    }
  }
  // Then RAG results
  for (const s of ragSources) {
    if (!seen.has(s.chunkRef)) {
      seen.add(s.chunkRef);
      merged.push(s);
    }
  }

  // Sort by final score descending, cap at 20
  merged.sort((a, b) => b.scores.final - a.scores.final);
  const sources = merged.slice(0, 20).map((s, i) => ({
    ...s,
    retrievalId: `src_${i + 1}`,
  }));

  return { sources, knowledge: glResult.knowledge };
}
