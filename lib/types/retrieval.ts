// =============================================================================
// Unified Retrieval Service types — mirrors RETRIEVAL_SERVICE.md (v0.1).
// Citations are born at retrieval time: the LLM cites src_N; the post-processor
// resolves src_N -> display [1][2][3] with full per-corpus locator metadata.
// =============================================================================

export type Corpus =
  | "pubmed"
  | "youtube"
  | "podcast"
  | "industry"
  | "manufacturer"
  | "fda"
  | "practice";

// --- Per-corpus locators (§5) ------------------------------------------------

export interface PubMedLocator {
  type: "pubmed";
  pmid: string;
  title: string;
  authors?: string;
  journal?: string;
  pubDate?: string;
  doi?: string;
  url: string;
}

export interface YouTubeLocator {
  type: "youtube";
  videoId: string;
  videoTitle: string;
  manufacturerName?: string;
  startSeconds?: number;
  endSeconds?: number;
  contentType?: string;
  audience?: string;
  url: string;
  thumbnailUrl?: string;
}

export interface PodcastLocator {
  type: "podcast";
  showName: string;
  episodeTitle: string;
  host?: string;
  guests?: string[];
  publishedDate?: string;
  startSeconds?: number;
  url?: string;
}

export interface IndustryLocator {
  type: "industry";
  articleTitle: string;
  publication?: string;
  publishedDate?: string;
  url?: string;
}

export interface DocumentLocator {
  type: "document";
  corpus: "manufacturer" | "fda" | "practice";
  filename: string;
  title: string;
  pageNumber?: number;
  section?: string;
  storagePath: string;
  url: string;
  sourceAuthority?: "fda_label" | "manufacturer" | "clinical_study" | "internal";
}

export type SourceLocator =
  | PubMedLocator
  | YouTubeLocator
  | PodcastLocator
  | IndustryLocator
  | DocumentLocator;

// --- Retrieval (§5) ----------------------------------------------------------

export interface SourceScores {
  vector?: number;
  fts?: number;
  fused: number;
  reranked?: number;
  authorityWeight: number;
  final: number;
}

export interface RetrievedSource {
  retrievalId: string; // "src_3" — what the LLM cites
  chunkRef: string; // "youtube:c91b..." — permanent pointer
  corpus: Corpus;
  scores: SourceScores;
  text: string;
  locator: SourceLocator;
}

// --- Display citation (post-processor output, §8) ----------------------------

export interface ResearchCitation {
  number: number; // display [1]
  retrievalId: string; // "src_3"
  chunkRef: string;
  corpus: Corpus;
  title: string;
  evidence: string; // verbatim chunk snippet (never model-generated)
  url?: string;
  relevance?: number; // 0-1, derived from scores — rendered as indicator, NOT "% confident"
  locator: SourceLocator;
}

// --- Streaming protocol (§12) ------------------------------------------------

export type ResearchStage = "searching" | "ranking" | "generating";

export type ResearchEvent =
  | { type: "status"; stage: ResearchStage }
  | { type: "sources"; sources: RetrievedSource[] }
  | { type: "token"; text: string }
  | {
      type: "citations";
      citations: ResearchCitation[];
      displayMap: Record<string, number>; // retrievalId -> display number
    }
  | {
      type: "done";
      runId: string;
      usage: { inputTokens: number; outputTokens: number; durationMs: number };
      followUps?: string[];
    }
  | { type: "error"; code: string; message: string; retryable: boolean };
