# Phase 3: retrieval-wiring - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-12
**Phase:** 03-retrieval-wiring
**Areas discussed:** Retrieval Route Shape, Streaming vs. Non-Streaming, Mock Cutover Strategy, Data Scope for Demo

---

## Retrieval Route Shape

| Option | Description | Selected |
|--------|-------------|----------|
| Next.js API route + real vector search | POST /api/retrieval/search, embeds query, runs vector similarity, matches full RETRIEVAL_SERVICE.md architecture | ✓ |
| Server action with direct Supabase query | No embedding, keyword/filter only, faster to build | |
| API route + keyword/filter only (no embeddings) | Filter by product name, no vector search infrastructure | |

**User's choice:** Next.js API route + real vector search

---

### Hybrid vs. Vector-only

| Option | Description | Selected |
|--------|-------------|----------|
| Vector-only for demo | Simpler, one Supabase RPC call | |
| Hybrid (vector + FTS) from day one | Catches exact-term queries, RRF per RETRIEVAL_SERVICE.md §6 | ✓ |

**User's choice:** Hybrid (vector + FTS) from day one

---

### Supabase project scope

| Option | Description | Selected |
|--------|-------------|----------|
| Agent Manager only (aejskvmpembryunnbgrk) | agent_reference_docs + evidence_links | |
| Both Agent Manager + CMS (gjqicqldjgfrwmtkliie) | Also manufacturer_youtube_transcript | ✓ |

**User's choice:** Both projects

---

## Streaming vs. Non-Streaming

| Option | Description | Selected |
|--------|-------------|----------|
| Full SSE streaming — matches mock protocol | streams status → sources → tokens → citations → done; zero client changes | ✓ |
| Non-streaming JSON + client re-tokenizes | Single JSON response, client animates; simpler server but adds latency | |

**User's choice:** Full SSE streaming

---

### LLM model

| Option | Description | Selected |
|--------|-------------|----------|
| claude-sonnet-4-6 via Vercel AI Gateway | Consistent with A360 stack, prompt caching | ✓ |
| claude-haiku-4-5 for speed | Faster + cheaper, slightly lower quality | |

**User's choice:** claude-sonnet-4-6 via Vercel AI Gateway

---

## Mock Cutover Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Hard cutover — delete mock import | Change one import in research-chat.tsx, no toggle debt | ✓ |
| Env-var gate (NEXT_PUBLIC_USE_REAL_RETRIEVAL) | Both imports present, runtime switch; creates toggle debt | |
| Keep mock as fallback in real stream | Falls back to mock if zero results; hides data gaps | |

**User's choice:** Hard cutover

---

## Data Scope for Demo

**User clarification (free text):**
> agent_reference_docs is the prose that becomes the answer. evidence_links is what becomes the citations. You need both for the full OpenEvidence story. For the demo fallback: if Phase 2 isn't fully done when Phase 3 ships, retrieve from evidence_links only for Botox/Neurotoxins — the Botox dossier already exists, so you'll have at least one product working end-to-end. Don't block Phase 3 on Phase 2 being complete. manufacturer_youtube_transcript is for video discovery (the related videos row), not for the answer retrieval path. That's a separate query, not part of the vector search.

---

### evidence_links join pattern

**User clarification (free text):**
> Option 1 — join on product/entity. The architecture doc makes it explicit: Both tables share offering_id. The flow is: (1) Vector search → top agent_reference_docs chunks; (2) Fetch evidence_links WHERE offering_id = matched_product_id → these become the citations; (3) LLM generates prose from dossier chunks; post-processor attaches the evidence_links rows as [1][2][3]. The key line: "a dossier claim can be upgraded to a live citation by the RAG layer on demand — distilled belief (the dossier) and citable evidence (the corpus) are the same well." evidence_links.chunk_id exists for tracing a specific claim, but the retrieval join for the demo is simply offering_id — not claim-by-claim matching.

---

### LLM citation style

| Option | Description | Selected |
|--------|-------------|----------|
| LLM sees evidence_links as context and writes [src_N] markers | Matches RETRIEVAL_SERVICE.md §7 generation contract | ✓ |
| LLM generates prose; evidence_links attached wholesale | Simpler but citation is product-level, not claim-level | |

**User's choice:** LLM sees evidence_links as context and writes [src_N] markers

---

### Phase 2 dependency / fallback

| Option | Description | Selected |
|--------|-------------|----------|
| Fail gracefully — show 'No results' with sources panel | Surface evidence_links hits even if agent_reference_docs is sparse | ✓ |
| Block Phase 3 on Phase 2 being complete | Gate execution on N rows existing for Botox/Neurotoxins | |

**User's choice:** Fail gracefully; do not block Phase 3 on Phase 2.

---

## Claude's Discretion

- Supabase RPC function names and SQL for hybrid search
- Whether to implement diversity guard in Phase 3 or defer
- Authority weight values at launch
- Exact topKPerCorpus and finalK defaults
- Error handling details in streaming route

## Deferred Ideas

- Rerank stage — Phase 4+
- Run logging tables — not required for June 22 demo
- Chat orchestrator + query rewriter — one-shot only in Phase 3
- Podcast + industry corpora — not populated in DB yet
- Diversity guard — defer unless results are dominated by one corpus
- Golden-set eval harness — Phase 4+
- YouTube video discovery row — separate from retrieval path
