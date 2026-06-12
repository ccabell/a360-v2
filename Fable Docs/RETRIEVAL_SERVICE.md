# A360 Unified Retrieval Service — Specification

Single retrieval and citation pipeline serving both one-shot RAG answers and multi-turn research chat. Companion to `API_CONTRACT.md` (which defines the agent-facing response schema this service feeds).

**Status**: Draft for review
**Version**: 0.1
**Last Updated**: 2026-06-11

---

## 1. Design Principles

1. **Citations are born at retrieval time.** The LLM never writes a PMID, URL, title, author, or timestamp. It cites retrieval IDs only. All citation metadata is resolved deterministically from the retrieval set held by the service. Hallucinated citations are structurally impossible, not prompt-discouraged.
2. **One retrieval service, two orchestrators.** One-shot answers and chat call the same `/retrieval/search` endpoint. Chat adds a query-rewriting step in front; nothing else differs.
3. **Every chunk carries its own click target.** A retrieved chunk must contain enough metadata to construct its deep link (URL + timestamp/page) with zero additional lookups.
4. **Every run is logged.** The full retrieval set (not just final citations) is persisted per run, so retrieval failures and generation failures can be distinguished after the fact.
5. **Runtime-agnostic.** The service is called by the API layer / runtime adapter, not by any specific agent framework. Dify, Prompt Runner, Claude tool use, etc. all consume the same interface.

---

## 2. Architecture

```
                       ┌─────────────────────────────────────────┐
                       │            ORCHESTRATORS                │
                       │                                         │
   One-shot RAG ──────►│  query ─────────────────────┐           │
                       │                              ▼           │
   Chat ──────────────►│  history + msg ─► [Query    query'      │
                       │                    Rewriter]             │
                       └──────────────────────────────┼──────────┘
                                                      ▼
                       ┌─────────────────────────────────────────┐
                       │        RETRIEVAL SERVICE                │
                       │  POST /api/retrieval/search             │
                       │                                         │
                       │  1. Embed query (ada-002, model-tagged) │
                       │  2. Fan out per corpus (parallel):      │
                       │     • vector search (RPC)               │
                       │     • full-text search (tsvector)       │
                       │  3. Per-corpus RRF fusion               │
                       │  4. Cross-corpus normalization          │
                       │     + authority weights                 │
                       │  5. [Rerank stage — optional, stubbed]  │
                       │  6. Assign retrieval IDs src_1..src_N   │
                       │  7. Log run + chunks                    │
                       └──────────────────┬──────────────────────┘
                                          ▼
                       ┌─────────────────────────────────────────┐
                       │           GENERATION                    │
                       │  LLM sees: chunk text + src IDs only    │
                       │  Instruction: cite as [src_3]           │
                       └──────────────────┬──────────────────────┘
                                          ▼
                       ┌─────────────────────────────────────────┐
                       │       CITATION POST-PROCESSOR           │
                       │  1. Parse [src_N] markers               │
                       │  2. Validate: cited ⊆ retrieved         │
                       │     (strip + log violations)            │
                       │  3. Renumber to display [1][2][3]       │
                       │  4. Resolve src_N → Citation objects    │
                       │     (per API_CONTRACT.md)               │
                       └─────────────────────────────────────────┘
```

---

## 3. Retrieval ID Scheme

Two identifiers per retrieved chunk:

| ID | Scope | Format | Purpose |
|----|-------|--------|---------|
| `retrievalId` | Single retrieval call | `src_1`, `src_2`, ... `src_N` | What the LLM cites. Short, cheap on tokens, unambiguous. |
| `chunkRef` | Global, permanent | `{corpus}:{chunk_uuid}` e.g. `pubmed:7f3a...`, `youtube:c91b...` | Stable pointer for logging, dedup, "tell me more about source 2" in chat, and re-fetching. |

Rules:

- `retrievalId` is assigned by the service in final ranked order (`src_1` = top result) and is **never reused within a chat conversation** — IDs continue incrementing across turns (`src_1..src_8` in turn 1, `src_9..src_15` in turn 2). This lets the model and user refer back to earlier sources unambiguously.
- `chunkRef` is the dedup key. If the same chunk is retrieved in a later turn, it keeps its original `retrievalId`.
- Display numbers (`[1]`, `[2]`) are assigned by the post-processor **per message**, in order of first appearance in the generated text. The mapping `displayNumber → retrievalId → chunkRef` is stored on the message record.

---

## 4. Search Request Schema

`POST /api/retrieval/search`

```typescript
interface RetrievalRequest {
  query: string;                  // REQUIRED — standalone search query (already rewritten if chat)
  conversationId?: string;        // For chat: enables cross-turn ID continuity + dedup
  corpora?: Corpus[];             // Default: all. Subset to restrict sources.
  filters?: {
    treatments?: string[];        // library_vocab terms — pre-filter via GIN index
    anatomyAreas?: string[];
    concerns?: string[];
    audience?: ("patient" | "clinician" | "marketing" | "mixed")[];
    patientSafe?: boolean;        // YouTube patient_safe flag
    publishedAfter?: string;      // ISO date — PubMed/podcasts/industry
    manufacturer?: string[];      // YouTube channel / manufacturer content
  };
  topKPerCorpus?: number;         // Default 15 (over-retrieve for fusion/rerank)
  finalK?: number;                // Default 8 — chunks passed to generation
  rerank?: boolean;               // Default false until rerank stage lands
  hybrid?: boolean;               // Default true — vector + FTS with RRF
}

type Corpus = "pubmed" | "youtube" | "podcast" | "industry" | "manufacturer" | "fda" | "practice";
```

Notes:

- `filters.*` map to GIN-indexed array columns and **must be applied as pre-filters inside the RPC functions** (filter → rank), not post-filters on results. Update each `match_*` RPC to accept these as optional params.
- `manufacturer`, `fda`, and `practice` corpora are served from the Agent Manager Supabase (structured + chunked docs); the other four from CMS Supabase. The service hides this split from callers.

---

## 5. Search Response Schema

```typescript
interface RetrievalResponse {
  runId: string;                  // Retrieval run UUID — logged, joinable to generation run
  query: string;                  // Echo of the (rewritten) query actually used
  sources: RetrievedSource[];     // Final ranked list, length ≤ finalK
  stats: {
    perCorpusCounts: Record<Corpus, number>;  // Raw hits before fusion
    fusionMethod: "rrf" | "rrf+rerank";
    durationMs: number;
  };
}

interface RetrievedSource {
  retrievalId: string;            // "src_3" — what the LLM cites
  chunkRef: string;               // "youtube:c91b..." — permanent pointer
  corpus: Corpus;
  scores: {
    vector?: number;              // Raw cosine similarity
    fts?: number;                 // FTS rank if hybrid
    fused: number;                // Post-RRF score
    reranked?: number;            // If rerank ran
    authorityWeight: number;      // Static prior applied
    final: number;                // What ranking used
  };
  text: string;                   // Chunk text passed to the LLM
  locator: SourceLocator;         // Everything needed to render + deep-link the citation
}
```

### SourceLocator — per-corpus shapes

The locator is denormalized onto the response at retrieval time. **No second query is ever needed to render a citation.**

```typescript
type SourceLocator =
  | PubMedLocator | YouTubeLocator | PodcastLocator
  | IndustryLocator | DocumentLocator;

interface PubMedLocator {
  type: "pubmed";
  pmid: string;
  title: string;
  authors?: string;
  journal?: string;
  pubDate?: string;
  doi?: string;
  url: string;                    // https://pubmed.ncbi.nlm.nih.gov/{pmid}/
}

interface YouTubeLocator {
  type: "youtube";
  videoId: string;
  videoTitle: string;
  manufacturerName?: string;
  startSeconds?: number;          // REQUIRED for deep links — see §10 ingestion
  endSeconds?: number;
  contentType?: string;           // explainer / procedure_demo / ...
  audience?: string;
  url: string;                    // https://youtube.com/watch?v={id}&t={startSeconds}
  thumbnailUrl?: string;
}

interface PodcastLocator {
  type: "podcast";
  showName: string;
  episodeTitle: string;
  host?: string;
  guests?: string[];
  publishedDate?: string;
  startSeconds?: number;          // If transcription source provides it
  url?: string;                   // Episode page / enclosure URL (+ #t= if supported)
}

interface IndustryLocator {
  type: "industry";
  articleTitle: string;
  publication?: string;
  publishedDate?: string;
  url?: string;
}

interface DocumentLocator {                 // manufacturer / fda / practice PDFs + docs
  type: "document";
  corpus: "manufacturer" | "fda" | "practice";
  filename: string;
  title: string;
  pageNumber?: number;            // REQUIRED for PDF deep links — see §10 ingestion
  section?: string;
  storagePath: string;            // Supabase Storage path
  url: string;                    // Signed or public URL; UI appends #page={n}
  sourceAuthority?: "fda_label" | "manufacturer" | "clinical_study" | "internal";
}
```

---

## 6. Fusion Logic

**Stage 1 — per-corpus hybrid (parallel across corpora):**
For each corpus, run vector search and Postgres full-text search in parallel, `topKPerCorpus` each. Fuse the two lists with Reciprocal Rank Fusion:

```
RRF(d) = Σ over lists L:  1 / (k + rank_L(d))      with k = 60
```

A document appearing in both lists scores higher than one appearing in either alone. This rescues exact-term queries (Daxxify, 510(k), 31-gauge) that pure vector search misses, and rescues paraphrased queries that FTS misses.

**Stage 2 — cross-corpus merge:**
Raw cosine similarities are not comparable across corpora (dense PubMed abstracts vs. spoken podcast transcripts embed differently). Therefore:

1. Min-max normalize fused scores **within each corpus list** to [0, 1].
2. Multiply by authority weight:

| Corpus | Weight |
|--------|--------|
| FDA labels | 1.45 |
| Manufacturer (docs + YouTube) | 1.40 |
| PubMed | 1.30 – 1.37 (boost `practice_guideline` / `meta_analysis` to top of band) |
| Industry articles | 0.85 – 1.25 |
| Podcasts | 0.90 |
| Practice library | 1.35 (practice's own docs are authoritative for that practice) |

3. Merge, sort by weighted score, deduplicate by `chunkRef`, take top `finalK`.

**Stage 3 — rerank (build the seam now, fill later):**
When enabled, pass the merged top ~30 through a cross-encoder reranker (Cohere Rerank / Voyage rerank) or a cheap LLM scoring call against the original query; re-sort by reranked score before truncating to `finalK`. The interface above already carries `scores.reranked` so enabling this is config, not schema change.

**Diversity guard:** if the top `finalK` is dominated by one corpus (> 75%), backfill the last 2 slots with the best result from each unrepresented corpus the user didn't filter out. Research UX is better when the answer shows the evidence landscape, not just the densest corpus.

---

## 7. Generation Contract

The orchestrator builds the LLM context as:

```
You are answering using ONLY the sources below. Cite every factual claim
with the source marker in square brackets, e.g. [src_3]. You may cite
multiple sources for one claim: [src_1][src_4]. If the sources do not
support an answer, say so — do not use outside knowledge for factual
claims about treatments, dosing, safety, or efficacy.

<sources>
[src_1] (FDA label — BOTOX Cosmetic, p.12)
{chunk text}

[src_2] (PubMed 2024 — "Timeline and Efficacy of Botulinum Toxin Type A")
{chunk text}
...
</sources>
```

Rules:

- The model cites `[src_N]` only. It is never shown URLs, PMIDs, or DOIs as citable strings (titles/short labels are fine for context).
- One-line provenance labels (shown above in parentheses) measurably improve which source the model picks for which claim; include them.
- Temperature ≤ 0.3 for research answers.

---

## 8. Citation Post-Processor

Runs on every generated message before it reaches the client.

1. **Parse** all `[src_N]` markers from the output text.
2. **Validate — both directions:**
   - Every cited `src_N` must exist in this run's retrieval set (or, in chat, a prior turn's set for the same `conversationId`). Markers that don't resolve are **stripped from the text** and logged as `citation_violation`.
   - Every retrieved source is checked for citation; uncited sources are logged (not an error — feeds the citation-coverage metric, R10.5).
3. **Renumber** surviving markers to display numbers `[1]`, `[2]`, ... in order of first appearance. Repeated citations of the same source reuse the same display number.
4. **Resolve** each display number → `retrievalId` → `RetrievedSource.locator` → `Citation` object per `API_CONTRACT.md`:

| Citation field | Source |
|----------------|--------|
| `id` | `chunkRef` |
| `number` | display number |
| `sourceType` | locator type (see §9 contract additions) |
| `sourceId` | pmid / videoId / episode id / storagePath |
| `title` | locator title |
| `evidence` | first 200 chars of chunk text (verbatim from corpus — never model-generated) |
| `url` | locator url (with `&t=` / `#page=` applied) |
| `metadata` | full locator object |

5. **Confidence:** populate `confidence` from `scores.reranked ?? scores.fused` (normalized), or omit. **Never ask the LLM for a confidence number, and do not render it as "% confident" in the UI** — render as a relevance indicator if shown at all.

---

## 9. API_CONTRACT.md Additions Required

- Extend `CitationSourceType` with `"podcast"` and `"industry"`; map `"document"` locators to existing `"pdf"`/`"supabase"` types or add `"document"`.
- Add `PodcastMetadata` and `IndustryMetadata` shapes (mirror locators in §5).
- Add `startSeconds` to YouTube metadata (currently `timestamp` — keep as alias).
- Add `schemaVersion: string` to the root `AgentResponse`.
- Add error envelope (see §12).

---

## 10. Ingestion Requirements (do before ingesting more content)

These fields must be captured **at chunking time**; backfilling means re-running ingestion.

| Corpus | Required per-chunk fields | Source of data |
|--------|--------------------------|----------------|
| YouTube | `start_seconds`, `end_seconds` | VTT cue timings / Whisper segment timestamps — already in the pipeline, currently discarded |
| Podcasts | `start_seconds` if available | Transcription segments; if unavailable, episode-level links only — don't fake it |
| Manufacturer / FDA / practice PDFs | `page_number`, `section` (if detectable) | PDF chunker page boundaries |
| Industry articles | canonical `url`, `published_date` | Scrape metadata |
| All | `embedding_model` column or convention (e.g. `"ada-002"`) | Enables future per-corpus migration to a newer embedding model without a flag day |

Schema migrations: add `start_seconds INT`, `end_seconds INT` to `manufacturer_youtube_transcript` and `podcast_chunks`; add `page_number INT` to document chunk tables in Agent Manager Supabase.

---

## 11. Chat Orchestration

```
user msg ─► Query Rewriter ─► /retrieval/search ─► Generation ─► Post-Processor ─► SSE to client
              (fast model)      (conversationId)
```

**Query Rewriter:** one cheap LLM call (Haiku-class). Input: last N turns + new message. Output JSON:

```json
{
  "standaloneQuery": "botulinum toxin efficacy and dosing differences in male patients",
  "filters": { "audience": ["clinician"] },
  "isFollowUpAboutSource": null      // or "src_2" → skip retrieval, expand that source
}
```

- If `isFollowUpAboutSource` is set ("tell me more about source 2"), the orchestrator re-fetches neighboring chunks of that `chunkRef` (±2 `chunk_index`) instead of running a fresh search.
- Filters extracted from conversation ("only peer-reviewed", "the patient is in the room") map to `RetrievalRequest.filters`.
- The rewritten query is logged alongside the raw message — when retrieval fails, the first question is whether the rewrite was bad.

**Cross-turn behavior:** `conversationId` gives the retrieval service the running `src_N` counter and the `chunkRef` dedup table for the conversation (§3).

---

## 12. Streaming Protocol (SSE)

`POST /api/research/answer` and `POST /api/research/chat` stream Server-Sent Events:

| Event | Payload | When |
|-------|---------|------|
| `status` | `{"stage": "searching" \| "ranking" \| "generating"}` | Stage transitions |
| `sources` | `RetrievedSource[]` (locators, no chunk text) | As soon as retrieval completes — UI can render source pills before the answer starts |
| `token` | `{"text": "..."}` | Generation tokens (raw `[src_N]` markers included; client renders them as placeholders) |
| `citations` | Final `Citation[]` + `{displayNumber → retrievalId}` map | After post-processing — client swaps `[src_N]` placeholders for numbered badges |
| `done` | `{ runId, usage: {inputTokens, outputTokens, durationMs} }` | End |
| `error` | `{ code, message, retryable }` | Any failure |

Error codes: `retrieval_timeout`, `corpus_unreachable` (include which), `generation_failed`, `citation_validation_failed`, `rate_limited`, `invalid_request`. Partial failure rule: if ≥1 corpus succeeds, proceed and note degraded corpora in `stats`; if all fail, emit `error`.

---

## 13. Run Logging (Agent Manager Supabase)

```sql
CREATE TABLE retrieval_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID,
  raw_query TEXT NOT NULL,
  rewritten_query TEXT,
  request JSONB NOT NULL,            -- full RetrievalRequest
  per_corpus_counts JSONB,
  fusion_method TEXT,
  duration_ms INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE retrieval_run_chunks (
  run_id UUID REFERENCES retrieval_runs(id),
  retrieval_id TEXT NOT NULL,        -- src_3
  chunk_ref TEXT NOT NULL,           -- youtube:c91b...
  corpus TEXT NOT NULL,
  scores JSONB NOT NULL,             -- vector/fts/fused/reranked/final
  was_cited BOOLEAN DEFAULT false,   -- set by post-processor
  PRIMARY KEY (run_id, retrieval_id)
);

CREATE TABLE citation_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID,
  marker TEXT,                       -- the src_N the model invented
  message_excerpt TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

This is the substrate for: retrieval-vs-generation debugging, citation coverage (R10.5), the eval harness, and per-corpus utilization stats ("podcasts are retrieved constantly but never cited" → reweight or improve chunking).

---

## 14. Evaluation Hooks

- **Golden set:** ~50 real practitioner questions, each annotated with expected `chunkRef`s (or at least expected corpus + document). Score retrieval as recall@k and MRR against `retrieval_run_chunks` — no LLM judging needed for the retrieval half.
- **Generation half:** citation coverage %, violation count, and groundedness spot-checks (does the cited chunk actually support the sentence) via LLM judge on a sample.
- Run the golden set on every change to fusion weights, RPC filters, chunking, or rerank config. Fusion tuning without a fixed eval set is guessing.

---

## 15. Build Order

1. Schema migrations + ingestion fixes (§10) — *blocks everything; cheapest now*
2. Retrieval service with hybrid + RRF + authority weights, no rerank (§4–6)
3. Citation post-processor + validation + logging (§8, §13)
4. One-shot answer endpoint with SSE, end-to-end to rendered citations (§12)
5. Chat orchestrator with query rewriter on the same service (§11)
6. Rerank stage (§6 stage 3) + diversity guard
7. Golden-set eval harness (§14)

Steps 1–3 are the irreversible/expensive-to-retrofit decisions. Everything after is iterative tuning on a stable foundation.
