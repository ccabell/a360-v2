---
phase: 03-retrieval-wiring
plan: "04"
subsystem: ui
tags: [research-tab, citations, sse-streaming, pubmed, fda, acceptance-demo]

# Dependency graph
requires:
  - phase: 03-retrieval-wiring
    provides: live route streaming PubMed + FDA citations from real DB
provides:
  - Human-confirmed end-to-end demo: unscripted Botox query -> grounded prose + clickable citations
  - SC-2 through SC-5 formally closed (SC-3 noted as partial — data-ranking gap, not code defect)
  - Phase 03-retrieval-wiring acceptance gate passed
affects: [phase-04, demo-prep, boulevard-demo-june-22]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Human-verify checkpoint closes visual/interactive success criteria that automated smoke tests cannot cover"
    - "Data-ranking gaps (authority_rank contention) tracked as data issues, not code defects"

key-files:
  created: []
  modified: []

key-decisions:
  - "SC-3 PubMed citation gap classified as data-ranking issue (FDA rows hold all 8 authority_rank slots), not a code defect — PubMedLocator code is correct"
  - "evidence_links snippet column contains structured JSON (not prose) — renders as raw JSON in reference cards; cosmetic issue deferred to future cleanup"

patterns-established:
  - "Acceptance gate pattern: automated smoke (Task 1) + human visual verify (Task 2 checkpoint) covers both functional and rendered correctness"

requirements-completed: []

# Metrics
duration: checkpoint-driven (human verify)
completed: "2026-06-12"
---

# Phase 03 Plan 04: Live UI Acceptance Demo Summary

**Research tab end-to-end demo confirmed: unscripted Botox query streamed grounded prose with 3 FDA citation cards and correct chip-to-card mapping; SC-3 PubMed gap is a data-ranking issue, not a code defect**

## Performance

- **Duration:** Checkpoint-driven (human verification)
- **Completed:** 2026-06-12
- **Tasks:** 2 (1 automated smoke, 1 human-verify checkpoint)
- **Files modified:** 0 (acceptance/demo plan — no code changes)

## Accomplishments

- Confirmed POST to `/api/research/chat` fires from live UI — no mock path active (SC-1/SC-6 PASS)
- Unscripted Botox onset/duration question produced non-empty grounded prose (SC-2 PASS)
- 3 "Open FDA label" reference cards appeared with clickable links to `botox-cosmetic-pi.pdf` on `accessdata.fda.gov` (SC-4 PASS)
- Citation chips [1][2][3] mapped correctly to reference cards 1/2/3 in the reference panel (SC-5 PASS)
- SC-3 (PubMed link visible in UI): PubMed rows confirmed in DB (14 rows) but FDA rows hold all 8 `authority_rank` slots, so no PubMed card appeared in any test query — classified as data-ranking gap, not a code defect

## Task Commits

This plan contained no code-writing tasks. Commits are documentation only.

1. **Task 1: Pre-flight automated smoke** — no commit (smoke test only)
2. **Task 2: Live UI demo** — human-verify checkpoint, no commit

**Plan metadata:** see final docs commit

## Files Created/Modified

None — this was a pure acceptance/verification plan.

## Decisions Made

- SC-3 classified as PARTIAL (data-ranking gap): `PubMedLocator` code is correct; 14 PubMed rows exist in `evidence_links`; however, FDA rows consistently win all 8 `authority_rank` slots for Botox queries, so PubMed cards do not surface in the UI. This is a data population issue — either lower-rank FDA rows need pruning, or PubMed rows need higher authority scores. Deferred to future phase.
- `evidence_links.snippet` column contains structured JSON (e.g. `{"value_min":1,"value_max":2,"unit":"week","display":"1-2 weeks"}`) rather than prose. This renders as raw JSON in reference cards. Cosmetic issue only — no functional impact on citation correctness. Deferred to future cleanup.
- Human verdict: "things are working" — approved to proceed.

## Deviations from Plan

None — plan executed exactly as written. SC-3 partial result was anticipated in the plan's acceptance criteria ("FDA-data-gap explicitly recorded against Phase 1" counts as passing SC-4; SC-3 gap recorded as data issue).

## Issues Encountered

**SC-3 PubMed card not visible in UI (data-ranking gap):**
- DB has 14 PubMed rows in `evidence_links` for Botox
- FDA rows hold all 8 `authority_rank` slots in every test query
- `PubMedLocator` code is correct — the locator fires but no rows come back because rank slots are fully occupied by FDA entries
- Not a regression — classified as a data population/ranking gap for a future phase to resolve

**Raw JSON in snippet display (cosmetic):**
- `evidence_links.snippet` stores structured JSON objects for numeric range data
- Reference card renders the raw JSON string rather than the `display` field
- Cosmetic only — does not affect citation correctness or link functionality
- Deferred

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

Phase 03 retrieval-wiring is COMPLETE. The Research/Evidence tab is live with:
- Real DB retrieval (PubMed + FDA evidence_links, agent_reference_docs)
- Grounded prose streaming via AI gateway
- Clickable citation cards with deep links
- Correct chip-to-card number mapping

Known items for future phases:
- PubMed cards need higher `authority_rank` (or FDA slot cap) to surface alongside FDA cards
- `snippet` rendering should use `display` field from JSON rather than raw stringify
- Demo deadline: June 22, 2026 — Boulevard CEO/CTO meeting. Research tab is live-demo ready for unscripted Botox/Neurotoxins questions.

---
*Phase: 03-retrieval-wiring*
*Completed: 2026-06-12*
