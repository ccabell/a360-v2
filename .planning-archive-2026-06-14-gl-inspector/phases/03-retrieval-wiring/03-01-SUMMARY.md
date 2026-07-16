---
phase: 03-retrieval-wiring
plan: 01
subsystem: infra
tags: [supabase, env, ai-gateway, botox, neurotoxins, evidence-links]

# Dependency graph
requires:
  - phase: 02-dossier-batch
    provides: evidence_links and agent_reference_docs rows for Botox/Neurotoxins
provides:
  - AI_GATEWAY_API_KEY env var declared in .env.local.example
  - Verified Botox offering_id (4b92be36-e84e-432c-8549-f5d85a767fdb)
  - Verified Neurotoxins category_id (57b7c5a8-0799-42b0-9111-8441f18a82db)
  - evidence_links source counts for Botox (pubmed=14, fda_label=10, youtube=6, ifu=1)
  - agent_reference_docs count for Botox/Neurotoxins (6 docs)
  - D-07 fallback flag: false (dossier docs exist)
affects:
  - 03-02 (route implementation reads these IDs and counts)
  - 03-03
  - 03-04

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Env var declaration in .env.local.example with explanatory comment block"

key-files:
  created: []
  modified:
    - .env.local.example

key-decisions:
  - "AI_GATEWAY_API_KEY not yet provisioned in .env.local — known blocker for LLM generation; DB/UI parts build fine"
  - "Botox offering_id 4b92be36-e84e-432c-8549-f5d85a767fdb confirmed against live Agent Manager Supabase"
  - "Neurotoxins category_id 57b7c5a8-0799-42b0-9111-8441f18a82db confirmed"
  - "D-07 fallback not needed — 6 agent_reference_docs (clinical+deep_product, draft/active) exist for Botox/Neurotoxins"

patterns-established: []

requirements-completed: []

# Metrics
duration: ~30min
completed: 2026-06-12
---

# Phase 03 Plan 01: Retrieval Wiring — Wave 0 Prep Summary

**AI_GATEWAY_API_KEY env var declared; Botox offering_id, Neurotoxins category_id, and evidence_links/agent_reference_docs counts verified against live Agent Manager Supabase**

## Performance

- **Duration:** ~30 min
- **Started:** 2026-06-12
- **Completed:** 2026-06-12
- **Tasks:** 2 (1 auto + 1 human-verify)
- **Files modified:** 1

## Accomplishments

- Declared `AI_GATEWAY_API_KEY` in `.env.local.example` with explanatory comment block
- Verified Botox Cosmetic offering_id `4b92be36-e84e-432c-8549-f5d85a767fdb` against live DB
- Confirmed Neurotoxins category_id `57b7c5a8-0799-42b0-9111-8441f18a82db`
- Recorded evidence_links source breakdown for Botox (total 31: pubmed=14, fda_label=10, youtube=6, ifu=1)
- Confirmed 6 agent_reference_docs exist for Botox/Neurotoxins (clinical/draft=4, deep_product/draft=2) — D-07 fallback not needed

## Verified Data (for Plan 02 reference)

| Check | Result |
|-------|--------|
| @ai-sdk/gateway package resolvable | TRUE |
| AI_GATEWAY_API_KEY present in .env.local | FALSE — known blocker |
| Botox offering_id confirmed | 4b92be36-e84e-432c-8549-f5d85a767fdb |
| Neurotoxins category_id confirmed | 57b7c5a8-0799-42b0-9111-8441f18a82db |
| evidence_links pubmed count | 14 |
| evidence_links fda_label count | 10 |
| evidence_links youtube count | 6 |
| evidence_links ifu count | 1 |
| evidence_links total | 31 |
| agent_reference_docs (clinical+deep_product, draft/active) | 6 |
| D-07 fallback needed | FALSE |

## Task Commits

1. **Task 1: Add AI_GATEWAY_API_KEY to .env.local.example** - `4310a97` (chore)
2. **Task 2: Verify gateway key + Botox data assumptions** - human-approved (no commit — verification only)

## Files Created/Modified

- `.env.local.example` — Added `AI_GATEWAY_API_KEY=` declaration with Vercel AI Gateway comment block

## Decisions Made

- `AI_GATEWAY_API_KEY` is not yet provisioned in `.env.local`. This is a known blocker: LLM generation via `streamText` in the `/api/research/chat` route will throw `GatewayAuthenticationError` until provisioned. DB queries and UI rendering are unaffected.
- All hard-coded IDs used in Plan 02 are confirmed correct against the live Agent Manager Supabase — no corrections needed.
- D-07 fallback path (evidence_links-only fallback when no dossier docs exist) is not needed for the Botox demo; 6 dossier docs are available.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**Before Plan 02 LLM generation will work:**

1. Obtain your Vercel AI Gateway API key from the Vercel dashboard
2. Add to `.env.local`:
   ```
   AI_GATEWAY_API_KEY=your-key-here
   ```
3. Verify: `node -e "require('dotenv').config({path:'.env.local'}); console.log('key present:', !!process.env.AI_GATEWAY_API_KEY)"`

The DB/UI portions of the Plan 02 route build and run without this key — only the `streamText` LLM call is gated.

## Next Phase Readiness

- Plan 02 can begin immediately — all IDs and row counts are confirmed
- LLM generation in Plan 02 will be blocked until `AI_GATEWAY_API_KEY` is provisioned, but the route can be built and the DB/UI verified without it
- evidence_links has strong pubmed (14) and fda_label (10) coverage for Botox — SC-4 citation rendering will have real data

---
*Phase: 03-retrieval-wiring*
*Completed: 2026-06-12*
