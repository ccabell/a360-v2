import { agentSupabase } from "@/lib/supabase";
import type {
  RetrievedSource,
  PubMedLocator,
  DocumentLocator,
  SourceLocator,
  Corpus,
} from "@/lib/types/retrieval";

// ---------------------------------------------------------------------------
// Demo-scope constants (verified against live Agent Manager Supabase in 03-01)
// ---------------------------------------------------------------------------

const BOTOX_OFFERING_ID = "4b92be36-e84e-432c-8549-f5d85a767fdb";
const NEUROTOXINS_CATEGORY_ID = "57b7c5a8-0799-42b0-9111-8441f18a82db";
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

// Authority weights from RETRIEVAL_SERVICE.md §6 table
const AUTHORITY_WEIGHT: Record<string, number> = {
  fda: 1.45,
  manufacturer: 1.40,
  pubmed: 1.33,
  practice: 1.35,
};

// ---------------------------------------------------------------------------
// Row shapes
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Snippet normalizer — column is TEXT but may hold JSON arrays or objects
// ---------------------------------------------------------------------------

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
    // plain string — fall through
  }
  return snippet.trim();
}

// ---------------------------------------------------------------------------
// Locator builders
// ---------------------------------------------------------------------------

function buildEvidenceLocator(row: EvidenceLinkRow): SourceLocator | null {
  const src = row.source ?? "";

  if (src === "pubmed") {
    // Skip pubmed rows with no click target at all
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

  // All other evidence_links sources -> manufacturer DocumentLocator
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
// Main export
// ---------------------------------------------------------------------------

/**
 * Retrieve grounded sources for a query from real Agent Manager Supabase rows.
 *
 * Phase 3 scope: Botox/Neurotoxins only. If the query contains none of the
 * BOTOX_TERMS, returns [] so the route can emit the D-08 graceful no-results.
 * No vector search — full FTS by offering_id is sufficient for demo queries.
 *
 * Returns the combined RetrievedSource[] for the SSE sources event, plus a
 * knowledge string (dossier prose) for the LLM system prompt.
 */
export async function retrieveSources(
  query: string,
): Promise<{ sources: RetrievedSource[]; knowledge: string }> {
  const lower = query.toLowerCase();
  const isInScope = BOTOX_TERMS.some((t) => lower.includes(t));
  if (!isInScope) {
    return { sources: [], knowledge: "" };
  }

  // --- Query A: evidence_links (citation metadata) ---
  const { data: evRows } = await agentSupabase
    .from("evidence_links")
    .select(
      "id, source, authority_rank, snippet, doi, pmid, url, page_number, field_name, offering_id",
    )
    .eq("offering_id", BOTOX_OFFERING_ID)
    .not("snippet", "is", null)
    .order("authority_rank", { ascending: true })
    .limit(50);

  // --- Query B: agent_reference_docs (prose context) ---
  // Include draft status — Phase 2 dossier docs are status='draft' pending review (Pitfall 5)
  // Filter to clinical/deep_product lens only — never surface sales_education in research tab
  const { data: docRows } = await agentSupabase
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
    .limit(5);

  const evidenceLinks = (evRows ?? []) as EvidenceLinkRow[];
  const refDocs = (docRows ?? []) as RefDocRow[];

  // --- Build RetrievedSource[] from evidence_links ---
  const evSources: RetrievedSource[] = [];
  for (const row of evidenceLinks) {
    const locator = buildEvidenceLocator(row);
    if (!locator) continue; // skip pubmed rows with no click target
    const corpus = corpusForSource(row.source);
    const authWeight = AUTHORITY_WEIGHT[corpus] ?? 1.0;
    evSources.push({
      retrievalId: "", // assigned after merge
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

  // --- Build RetrievedSource[] from agent_reference_docs ---
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
      retrievalId: "", // assigned after merge
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

  // --- Merge with corpus diversity: guarantee PubMed/YouTube aren't drowned by FDA ---
  // Partition evidence sources by corpus, take top N from each, then fill remaining slots
  const byCorpus: Record<string, RetrievedSource[]> = {};
  for (const s of evSources) {
    (byCorpus[s.corpus] ??= []).push(s);
  }
  const reserved: RetrievedSource[] = [];
  const remainder: RetrievedSource[] = [];
  for (const [corpus, items] of Object.entries(byCorpus)) {
    if (corpus === "fda") {
      // FDA gets up to 8 slots, rest go to remainder
      reserved.push(...items.slice(0, 8));
      remainder.push(...items.slice(8));
    } else {
      // PubMed, YouTube, manufacturer each get up to 4 reserved slots
      reserved.push(...items.slice(0, 4));
      remainder.push(...items.slice(4));
    }
  }
  // Fill to 20: reserved first, then remainder by score, then dossier rows
  const TARGET = 20;
  const merged = [
    ...reserved,
    ...remainder,
    ...docSources,
  ].slice(0, TARGET);
  const sources: RetrievedSource[] = merged.map((s, i) => ({
    ...s,
    retrievalId: `src_${i + 1}`,
  }));

  // --- Knowledge string: top dossier prose for the LLM ---
  const knowledge = refDocs
    .slice(0, 3)
    .map(
      (d) =>
        `## ${d.doc_type ?? "Document"} (${d.lens})\n${(d.content_md ?? "").slice(0, 1500)}`,
    )
    .join("\n\n");

  return { sources, knowledge };
}
