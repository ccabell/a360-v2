---
phase: 03-retrieval-wiring
plan: 02
subsystem: retrieval
tags: [supabase, evidence-links, agent-reference-docs, sse, streaming, gateway, botox, citations]

# Dependency graph
requires:
  - phase: 03-retrieval-wiring
    plan: 01
    provides: "Verified Botox offering_id + Neurotoxins category_id + DB row counts"
  - phase: 02-dossier-batch
    provides: "agent_reference_docs rows (status=draft) for Botox/Neurotoxins"
provides:
  - "lib/retrieval/sources.ts — retrieveSources(query) returning RetrievedSource[] from real DB"
  - "app/api/research/chat/route.ts — SSE POST endpoint with full event sequence"
  - "PubMed and FDA locator construction from evidence_links rows"
  - "Dossier prose context from agent_reference_docs (clinical + deep_product lens)"
affects:
  - 03-03 (mock cutover — research-chat.tsx imports this route)
  - 03-04 (validation — tests this route end-to-end)

# Tech tracking
tech-stack:
  added:
    - "@ai-sdk/gateway (gateway() import in route — was installed but unused)"
  patterns:
    - "Direct Supabase query by offering_id with authority_rank ordering (no RPC)"
    - "Subject gate pattern: BOTOX_TERMS keyword check before any DB query"
    - "ReadableStream SSE with ResearchEvent emit helper"
    - "Deterministic fallback prose when AI_GATEWAY_API_KEY missing"
    - "resolveCitations called once on full accumulated text"

key-files:
  created: []
  modified:
    - lib/retrieval/sources.ts
    - app/api/research/chat/route.ts

key-decisions:
  - "sources.ts rewrites prior implementation: removes search_reference_docs RPC in favor of direct evidence_links + agent_reference_docs queries with hard-coded Botox IDs per plan spec"
  - "route.ts now imports gateway from @ai-sdk/gateway and calls gateway('anthropic/claude-haiku-4.5') directly"
  - "maxOutputTokens used (not maxTokens) — AI SDK v6 renamed this parameter"
  - "Deterministic fallback prose preserved for when AI_GATEWAY_API_KEY is not provisioned"
  - "Cache-Control: no-cache (not no-cache,no-transform) per plan SSE header requirements"

patterns-established:
  - "Subject gate: lowercase query, check BOTOX_TERMS, return [] if out-of-scope"
  - "Merge order: evidence_links first (by authority_rank), dossier rows second, cap at 8"

requirements-completed: []

# Metrics
duration: ~25min
completed: 2026-06-12
---

# Phase 03 Plan 02: Retrieval Wiring — Route + Sources Summary

**lib/retrieval/sources.ts and app/api/research/chat/route.ts built: real DB queries (evidence_links + agent_reference_docs) with PubMed/FDA locators wired to an SSE POST endpoint using gateway("anthropic/claude-haiku-4.5")**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-06-12
- **Completed:** 2026-06-12
- **Tasks:** 2 (both auto)
- **Files modified:** 2

## Accomplishments

- Rewrote `lib/retrieval/sources.ts` to use direct queries (no RPC):
  - Query A: `evidence_links` by `BOTOX_OFFERING_ID`, ordered by `authority_rank`, limit 12
  - Query B: `agent_reference_docs` filtered to `offering_id` OR `category_id`, `lens IN (clinical, deep_product)`, `status IN (draft, active)`, limit 5
  - Subject gate: checks `BOTOX_TERMS` list before any DB call; returns `[]` for out-of-scope queries
  - PubMedLocator with `https://pubmed.ncbi.nlm.nih.gov/{pmid}/` fallback url
  - FDA DocumentLocator with `corpus: "fda"`, `sourceAuthority: "fda_label"`, `filename: "botox-cosmetic-pi.pdf"`
  - Dossier DocumentLocator with `corpus: "practice"`, no external URL, text truncated to 1200 chars
  - Merges evidence_links first, dossier second, caps at finalK=8
- Rewrote `app/api/research/chat/route.ts`:
  - Imports `gateway` from `@ai-sdk/gateway`; uses `gateway("anthropic/claude-haiku-4.5")`
  - Full SSE event sequence: `status(searching) → status(ranking) → sources → status(generating) → token* → citations → done`
  - D-08 graceful no-results path (empty sources → single token message → empty citations → done)
  - `resolveCitations` called once on the full `fullText` accumulator after stream ends
  - Deterministic fallback prose when `AI_GATEWAY_API_KEY` not set
  - SSE headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`

## Verified IDs Used

| Constant | Value |
|----------|-------|
| BOTOX_OFFERING_ID | 4b92be36-e84e-432c-8549-f5d85a767fdb |
| NEUROTOXINS_CATEGORY_ID | 57b7c5a8-0799-42b0-9111-8441f18a82db |

Both confirmed against live Agent Manager Supabase in Plan 03-01.

## Task Commits

1. **Task 1: lib/retrieval/sources.ts** — `5fed4e7`
2. **Task 2: app/api/research/chat/route.ts** — `ac65366`

## Files Created/Modified

- `lib/retrieval/sources.ts` — rewritten: direct evidence_links + agent_reference_docs queries with Botox IDs, BOTOX_TERMS gate, PubMed/FDA/dossier locator construction
- `app/api/research/chat/route.ts` — rewritten: gateway() import, full SSE sequence, resolveCitations on full text, deterministic fallback

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed maxTokens → maxOutputTokens for AI SDK v6**
- **Found during:** Task 2 TypeScript check
- **Issue:** AI SDK v6 renamed `maxTokens` to `maxOutputTokens`; `npx tsc --noEmit` reported TS2353 error
- **Fix:** Changed `maxTokens: 600` to `maxOutputTokens: 600`
- **Files modified:** `app/api/research/chat/route.ts`
- **Commit:** ac65366

**2. [Rule 2 - Deviation] sources.ts prior implementation used search_reference_docs RPC**
- **Found during:** Task 1 — read_first revealed existing sources.ts used `agentSupabase.rpc("search_reference_docs", ...)` rather than direct queries
- **Action:** Rewrote to use direct `.from("evidence_links")` and `.from("agent_reference_docs")` queries with hard-coded Botox IDs per plan spec
- **Reason:** Plan spec explicitly requires direct queries; the RPC may not exist on the Agent Manager Supabase instance; plan acceptance criteria check for `evidence_links` and `agent_reference_docs` strings
- **Files modified:** `lib/retrieval/sources.ts`
- **Commit:** 5fed4e7

**3. [Rule 2 - Deviation] route.ts prior implementation did not import gateway()**
- **Found during:** Task 2 — existing route used a string constant `MODEL = "anthropic/claude-haiku-4.5"` passed directly to streamText without gateway()
- **Action:** Added `import { gateway } from "@ai-sdk/gateway"` and changed `model: MODEL` to `model: gateway("anthropic/claude-haiku-4.5")`
- **Reason:** Plan acceptance criteria explicitly requires `gateway(` string in route; gateway() is the correct AI SDK v6 provider wrapper
- **Files modified:** `app/api/research/chat/route.ts`
- **Commit:** ac65366

## Known Stubs

None. Both files are fully wired to real DB rows. The deterministic fallback prose is intentional (not a stub) — it activates only when `AI_GATEWAY_API_KEY` is absent and emits real snippet text with `[src_N]` markers.

## Blockers Inherited

- `AI_GATEWAY_API_KEY` must be provisioned in `.env.local` for LLM generation to work. Without it, the route falls back to deterministic prose from evidence_links snippets — DB queries and citation UI still function.

## Next Phase Readiness

- Plan 03-03 (mock cutover) can begin immediately — the route is built and the SSE event sequence is correct
- Plan 03-04 (validation) requires the route to be running; can be deferred until AI_GATEWAY_API_KEY is provisioned for full end-to-end validation

---
*Phase: 03-retrieval-wiring*
*Completed: 2026-06-12*
