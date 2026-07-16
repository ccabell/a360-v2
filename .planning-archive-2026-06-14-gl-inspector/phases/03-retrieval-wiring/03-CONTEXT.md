# Phase 3: retrieval-wiring - Context

**Gathered:** 2026-06-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire the M6 Research/Evidence tab from mock data to real evidence_links + agent_reference_docs. Build the minimal retrieval route per RETRIEVAL_SERVICE.md: question → hybrid vector+FTS retrieval → RetrievedSource objects → existing citation UI. The demo deliverable: an unscripted Botox/Neurotoxins question in the live UI renders prose with clickable PubMed + FDA citations from the real DB.

**NOT in scope:** Rerank stage (Phase 4+), podcast/industry corpora, query rewriter (chat mode), run logging tables (`retrieval_runs` / `retrieval_run_chunks`), YouTube video discovery row, golden-set eval harness.

</domain>

<decisions>
## Implementation Decisions

### Retrieval Route Shape
- **D-01:** Build a Next.js API route: `POST /api/retrieval/search`. Follows `RETRIEVAL_SERVICE.md §4` request/response schema. Embeds the query with ada-002, runs hybrid vector+FTS per corpus, fuses with RRF, returns `RetrievedSource[]`.
- **D-02:** Hybrid search (vector + FTS) from day one. Catches exact-term queries (product names, dosing numbers) that pure vector search misses. Per RETRIEVAL_SERVICE.md §6 RRF formula: `RRF(d) = Σ 1/(60 + rank_L(d))`.
- **D-03:** Route queries BOTH Supabase projects: Agent Manager (`aejskvmpembryunnbgrk`) for `agent_reference_docs` and `evidence_links`; CMS (`gjqicqldjgfrwmtkliie`) for `manufacturer_youtube_transcript` (video corpus). Two Supabase clients in the route.

### Data Shape & Join
- **D-04:** Retrieval join is `offering_id` — not claim-by-claim. After vector search retrieves top `agent_reference_docs` chunks, fetch `evidence_links WHERE offering_id = matched_product_id`. These become the citations.
- **D-05:** The LLM sees BOTH dossier chunks AND evidence_links rows as labeled context (e.g., `[src_1] (FDA label — BOTOX Cosmetic, p.12) {snippet}`). It is instructed to cite with `[src_N]` markers. Post-processor resolves markers to display `[1][2][3]` with full locator metadata. Matches RETRIEVAL_SERVICE.md §7 generation contract exactly.
- **D-06:** `agent_reference_docs` provides the prose context that becomes the answer. `evidence_links` provides the citation metadata (pmid, url, snippet). Both are required for the full OpenEvidence story.

### Demo Fallback (Phase 2 dependency)
- **D-07:** Do NOT block Phase 3 on Phase 2 being complete. If `agent_reference_docs` has no Botox content when Phase 3 ships, fall back to `evidence_links`-only retrieval for Botox/Neurotoxins — the Botox dossier already exists, so at least one product works end-to-end.
- **D-08:** If retrieval returns zero results, fail gracefully: show the sources panel with any `evidence_links` hits, render "No results found" in the answer area. Do not fake an answer.

### Streaming Protocol
- **D-09:** Full SSE streaming — the route streams Server-Sent Events matching the existing mock event sequence: `status → sources → token chunks → citations → done`. The client (`research-chat.tsx`) is already wired for this protocol — zero client changes required.
- **D-10:** Use Vercel AI SDK `streamText` with `claude-sonnet-4-6` via Vercel AI Gateway (`"anthropic/claude-sonnet-4-6"`). Temperature ≤ 0.3 per RETRIEVAL_SERVICE.md §7.

### Mock Cutover
- **D-11:** Hard cutover — change one import in `research-chat.tsx` line 12: replace `import { streamResearch } from "@/lib/mock/research-stream"` with the real client (e.g., `import { streamResearch } from "@/lib/retrieval/stream"`). Mock files stay on disk (test value) but exit the live path. No env-var gate, no fallback toggle. Remove the `"Demo data"` badge from `research/page.tsx` header.
- **D-12:** The new `lib/retrieval/stream.ts` must export the same `streamResearch(query: string): AsyncGenerator<ResearchEvent>` signature as the mock — zero changes to `research-chat.tsx`.

### LLM & Generation
- **D-13:** LLM model: `claude-sonnet-4-6` via Vercel AI Gateway. Temperature ≤ 0.3.
- **D-14:** Context window: pass top `finalK` (default 8) source chunks + evidence_links snippets to the LLM. Format per RETRIEVAL_SERVICE.md §7 generation contract.

### Claude's Discretion
- Supabase RPC function names and SQL for the hybrid search (vector + FTS per corpus)
- Whether to implement the diversity guard (§6) in Phase 3 or defer
- Authority weight values to use at launch (RETRIEVAL_SERVICE.md §6 table gives ranges)
- Exact `topKPerCorpus` and `finalK` defaults for the demo (spec says 15/8)
- Error handling details in the streaming route

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Architecture Spec
- `Fable Docs/RETRIEVAL_SERVICE.md` — Full retrieval pipeline spec: search request/response schema (§4-5), fusion logic/RRF (§6), generation contract (§7), citation post-processor (§8), SSE streaming protocol (§12). This is the target spec — Phase 3 implements a subset.

### Existing Types & Code (seam points)
- `lib/types/retrieval.ts` — All TypeScript types: `RetrievedSource`, `ResearchCitation`, `ResearchEvent`, `SourceLocator` variants, `Corpus` union. Already matches spec — do not change these types.
- `lib/retrieval/post-process.ts` — `resolveCitations(text, sources)` already implemented. Phase 3 uses it as-is.
- `lib/mock/research-stream.ts` — The mock this phase replaces. Its `streamResearch()` signature is the interface the new `lib/retrieval/stream.ts` must match.
- `lib/mock/research-data.ts` — Shows correct `RetrievedSource` shapes for all corpora. Use as reference for what the real route must return.

### UI Seam (one import to change)
- `components/research/research-chat.tsx` — Line 12 import is the single cutover point. Already wired for SSE event protocol — do not modify client-side logic.
- `app/dashboard/research/page.tsx` — Remove `"Demo data"` badge when cutover is complete.

### Phase Context (prior decisions)
- `.planning/phases/01-citations/01-CONTEXT.md` — FDA URL pattern, PubMed locator fields, per-type required fields table. All locked.

### Database
- Supabase Agent Manager: `aejskvmpembryunnbgrk` — `agent_reference_docs`, `evidence_links` (offering_id join key)
- Supabase CMS: `gjqicqldjgfrwmtkliie` — `manufacturer_youtube_transcript`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/retrieval/post-process.ts` — Citation post-processor is complete. Takes `(text, sources)`, returns `{ citations, displayMap }`. Phase 3 calls it unchanged.
- `lib/retrieval/locator.ts` — `locatorTitle()` and `locatorUrl()` helpers already implemented (imported by post-process.ts).
- `components/research/research-chat.tsx` — SSE event consumer is complete. Handles `status`, `sources`, `token`, `citations`, `done`, `error` events. One import swap is all that's needed.
- `components/grounding/` — `GroundedAnswer`, `SourcePill`, etc. already render `RetrievedSource[]` and `ResearchCitation[]` correctly.
- Existing API route pattern: `app/api/playground/route.ts` — shows Next.js route structure with `NextRequest`/`NextResponse`, env var access, proxy pattern.

### Established Patterns
- Supabase JS client (`@supabase/supabase-js`) is the established DB access pattern in this codebase.
- Vercel AI SDK is used in this project — use `streamText` with gateway provider string.
- Two Supabase clients needed: one for Agent Manager, one for CMS (different project IDs).

### Integration Points
- `research-chat.tsx` line 12: the single mock import to replace.
- `app/dashboard/research/page.tsx`: remove `"Demo data"` badge.
- New file needed: `lib/retrieval/stream.ts` — exports `streamResearch()` with same signature as mock.
- New route needed: `app/api/retrieval/search/route.ts` — POST endpoint, SSE response.

</code_context>

<specifics>
## Specific Ideas

- **Same function signature, zero client changes:** New `lib/retrieval/stream.ts` must export `async function* streamResearch(query: string): AsyncGenerator<ResearchEvent>`. `research-chat.tsx` calls it identically to the mock.
- **Generation contract verbatim (RETRIEVAL_SERVICE.md §7):** The LLM system prompt construction is specified — chunk labels `[src_N] (corpus — title)` + "cite every factual claim with [src_N]" instruction + temperature ≤ 0.3.
- **RRF formula:** `RRF(d) = Σ 1/(60 + rank_L(d))` per §6. k=60 is the constant.
- **Evidence_links join:** `offering_id` is the join key between `agent_reference_docs` and `evidence_links`. Not claim-by-claim — product-level join.
- **Fallback data path:** If `agent_reference_docs` for Botox is empty, the route falls back to querying `evidence_links` directly as source chunks. The Botox dossier already exists per Phase 1 context, so this is the safety net for incomplete Phase 2 work.
- **`"Demo data"` badge:** Located in `app/dashboard/research/page.tsx` line 22 — remove when cutover is live.

</specifics>

<deferred>
## Deferred Ideas

- **Rerank stage** (RETRIEVAL_SERVICE.md §6 Stage 3) — build the seam, fill later. Phase 4+.
- **Run logging** (`retrieval_runs`, `retrieval_run_chunks`, `citation_violations` tables) — §13. Not required for June 22 demo.
- **Chat orchestrator + query rewriter** (§11) — Phase 3 is one-shot only. Chat mode is future.
- **Podcast + industry corpora** — Not populated in the DB yet. Phase 3 routes to pubmed/fda/manufacturer/youtube corpora only.
- **Diversity guard** (§6) — defer unless results are dominated by one corpus during testing.
- **Golden-set eval harness** (§14) — Phase 4+.
- **YouTube video discovery row** — `manufacturer_youtube_transcript` is for video corpus retrieval, not for a "related videos" UI row. Deferred.

</deferred>

---

*Phase: 03-retrieval-wiring*
*Context gathered: 2026-06-12*
