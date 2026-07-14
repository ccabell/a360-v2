---
phase: 03-retrieval-wiring
plan: 03
subsystem: retrieval
tags: [sse, streaming, live-cutover, mock-removal, research-chat]

# Dependency graph
requires:
  - phase: 03-retrieval-wiring
    plan: 02
    provides: "app/api/research/chat/route.ts — live SSE POST endpoint"
provides:
  - "lib/retrieval/stream.ts — streamResearch(query) async generator fetching /api/research/chat"
  - "research-chat.tsx wired to live stream (no mock imports)"
  - "Research page badge reads 'Live'"
affects:
  - 03-04 (validation — tests the live path end-to-end)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Fetch + ReadableStream reader SSE consumer (client-side)"
    - "Single import replaces two mock imports"

key-files:
  created:
    - lib/retrieval/stream.ts
  modified:
    - app/dashboard/research/page.tsx

key-decisions:
  - "EXAMPLE_QUERIES updated to plan-specified values (neurotoxin dosing + onset timeline)"
  - "stream.ts error path uses yield { type: error } rather than throw — matches ResearchEvent protocol"
  - "research-chat.tsx import was already correct from prior session; only page.tsx required a change"

requirements-completed: []

# Metrics
duration: ~10min
completed: 2026-06-12
---

# Phase 03 Plan 03: Mock Cutover — Live SSE Reader Summary

**lib/retrieval/stream.ts created with live SSE fetch reader; research-chat.tsx imports from @/lib/retrieval/stream; Research page badge changed from "Demo data" to "Live"**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-06-12
- **Completed:** 2026-06-12
- **Tasks:** 2 (both auto)
- **Files modified:** 2 (stream.ts updated, page.tsx badge)

## Accomplishments

- `lib/retrieval/stream.ts` exports `streamResearch(query): AsyncGenerator<ResearchEvent>`:
  - POSTs to `/api/research/chat` with `Content-Type: application/json`
  - Reads `ReadableStream` with `getReader()` + `TextDecoder`
  - Splits on `\n\n` SSE frame boundaries, strips `data:` prefix, yields parsed JSON
  - Error path: on non-OK or missing body, yields `{ type: "error" }` event and returns
  - Exports `EXAMPLE_QUERIES` (3 Botox/neurotoxin questions per plan spec)
- `components/research/research-chat.tsx`: imports `streamResearch` and `EXAMPLE_QUERIES` from `@/lib/retrieval/stream` — no `lib/mock` imports
- `app/dashboard/research/page.tsx`: Badge text changed from `"Demo data"` to `"Live"`
- SC-6 verified: `grep -rn "lib/mock|research-stream|research-data" components/research/ lib/retrieval/` returns zero matches
- `npx tsc --noEmit` passes with no errors

## Task Commits

1. **Task 1: lib/retrieval/stream.ts** — `78c6add`
2. **Task 2: page.tsx badge change** — `aa0dfc3`

## Files Created/Modified

- `lib/retrieval/stream.ts` — created: live SSE fetch reader, EXAMPLE_QUERIES export, no mock imports
- `app/dashboard/research/page.tsx` — modified: badge "Demo data" → "Live"
- `components/research/research-chat.tsx` — no change needed (already had correct import from prior session)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Deviation] stream.ts and research-chat.tsx import already correct from prior session**
- **Found during:** Task 1 read — `lib/retrieval/stream.ts` existed with live SSE implementation; `research-chat.tsx` already imported from `@/lib/retrieval/stream`
- **Action:** Updated EXAMPLE_QUERIES in `stream.ts` to match plan-specified values exactly (2nd and 3rd entries differed from prior implementation)
- **Reason:** Plan specifies exact EXAMPLE_QUERIES content; prior session had different but equivalent questions
- **Files modified:** `lib/retrieval/stream.ts`
- **Commit:** `78c6add`

## Known Stubs

None. The stream.ts file is fully wired to the live `/api/research/chat` route. No placeholder data.

## Next Phase Readiness

- Plan 03-04 (validation) can begin: the live path is complete — `research-chat.tsx` → `stream.ts` → `/api/research/chat` → DB/LLM

---
*Phase: 03-retrieval-wiring*
*Completed: 2026-06-12*
