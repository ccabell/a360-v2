import { agentSupabase } from "@/lib/supabase";
import type { RetrievedSource, SourceLocator, Corpus } from "@/lib/types/retrieval";

/**
 * Phase 3 retrieval (FTS-only, no vector — there is no pgvector on Agent Manager).
 * question -> FTS over agent_reference_docs -> offering_ids -> evidence_links
 *          -> RetrievedSource[] (the citations) + a knowledge string (the prose context).
 */

interface DocRow {
  offering_id: string | null;
  title: string;
  content_md: string;
  lens: string;
}

interface EvidenceRow {
  id: string;
  offering_id: string | null;
  field_name: string | null;
  source: string;
  pmid: string | null;
  doi: string | null;
  source_reference: string | null;
  snippet: string | null;
  claimed_value: string | null;
  url: string | null;
  authority_rank: number | null;
  page_number: number | null;
}

function humanize(s?: string | null): string {
  return (s ?? "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function corpusForSource(source: string): Corpus {
  switch (source) {
    case "pubmed":
      return "pubmed";
    case "fda_label":
      return "fda";
    case "youtube":
      return "youtube";
    case "ifu":
    case "manufacturer":
      return "manufacturer";
    case "journal":
    case "industry":
      return "industry";
    case "podcast":
      return "podcast";
    default:
      return "practice";
  }
}

function ytId(url?: string | null): string | undefined {
  if (!url) return undefined;
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
  return m?.[1];
}

function buildLocator(e: EvidenceRow, title: string): SourceLocator {
  const c = corpusForSource(e.source);

  if (c === "pubmed") {
    return {
      type: "pubmed",
      pmid: e.pmid ?? "",
      title,
      doi: e.doi ?? undefined,
      url: e.url || (e.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${e.pmid}/` : ""),
    };
  }
  if (c === "youtube") {
    const vid = ytId(e.url);
    if (vid) {
      return { type: "youtube", videoId: vid, videoTitle: title, url: e.url ?? "" };
    }
  }
  if (c === "industry") {
    return { type: "industry", articleTitle: title, url: e.url ?? undefined };
  }

  // fda / manufacturer / practice (and youtube without a parseable id) -> document
  const docCorpus = c === "fda" ? "fda" : c === "manufacturer" ? "manufacturer" : "practice";
  return {
    type: "document",
    corpus: docCorpus,
    title,
    filename: e.source_reference ?? title,
    storagePath: "",
    url: e.url ?? "",
    pageNumber: e.page_number ?? undefined,
    sourceAuthority:
      docCorpus === "fda" ? "fda_label" : docCorpus === "manufacturer" ? "manufacturer" : "internal",
  };
}

export async function retrieveSources(
  query: string,
  finalK = 8,
): Promise<{ sources: RetrievedSource[]; knowledge: string }> {
  // 1. Full-text search the dossiers.
  const { data: docsData } = await agentSupabase.rpc("search_reference_docs", {
    q: query,
    lim: 6,
  });
  const docs = (docsData ?? []) as DocRow[];
  const offeringIds = [
    ...new Set(docs.map((d) => d.offering_id).filter(Boolean)),
  ] as string[];

  // 2. Evidence links for those offerings (only ones with a clickable URL), best authority first.
  let sources: RetrievedSource[] = [];
  if (offeringIds.length) {
    const { data: evData } = await agentSupabase
      .from("evidence_links")
      .select(
        "id, offering_id, field_name, source, pmid, doi, source_reference, snippet, claimed_value, url, authority_rank, page_number",
      )
      .in("offering_id", offeringIds)
      .not("url", "is", null)
      .order("authority_rank", { ascending: true })
      .limit(40);

    const rows = (evData ?? []) as EvidenceRow[];
    const seen = new Set<string>();
    const picked: EvidenceRow[] = [];
    for (const r of rows) {
      const key = r.url || r.id;
      if (seen.has(key)) continue;
      seen.add(key);
      picked.push(r);
      if (picked.length >= finalK) break;
    }

    sources = picked.map((e, i) => {
      const title = e.source_reference || `${humanize(e.field_name)} — ${humanize(e.source)}`;
      const corpus = corpusForSource(e.source);
      const authorityWeight = 1 + (6 - (e.authority_rank ?? 4)) * 0.05;
      const base = 1 - i * 0.05;
      return {
        retrievalId: `src_${i + 1}`,
        chunkRef: `${corpus}:${e.id}`,
        corpus,
        scores: { fused: base, authorityWeight, final: base * authorityWeight },
        text: (e.snippet || e.claimed_value || title).trim(),
        locator: buildLocator(e, title),
      };
    });
  }

  // 3. Knowledge context for the LLM (top dossier prose, truncated).
  const knowledge = docs
    .slice(0, 4)
    .map((d) => `## ${d.title} (${d.lens})\n${(d.content_md ?? "").slice(0, 1500)}`)
    .join("\n\n");

  return { sources, knowledge };
}
