---
phase: 07-trust-interaction-demo
plan: "01"
subsystem: api
tags: [system-prompt, llm-guardrails, disclaimer, citation, trust]

requires:
  - phase: 06-embed-and-analytics
    provides: embed page with disclaimer and citation hover cards

provides:
  - System prompt with explicit safety-topic citation guardrails (TRST-03)
  - Verified disclaimer bar on /ask and /embed/ask (TRST-01)
  - Verified CitationHoverCard wired to InlineAuthorityBadge via citation-segments.tsx (TRST-02)

affects: [any future LLM prompt changes, trust/safety review]

tech-stack:
  added: []
  patterns:
    - "Safety guardrail text placed inline in SYSTEM constant, before KEY_POINTS instruction"

key-files:
  created: []
  modified:
    - app/api/ask/route.ts

key-decisions:
  - "SYSTEM prompt safety guardrails appended inline after existing 'say so' line — no restructuring of prompt"
  - "CitationHoverCard wiring verified via citation-segments.tsx (not answer-message.tsx directly) — functional requirement met"

patterns-established:
  - "Safety guardrails: explicit topic list (dosing, contraindications, adverse events, off-label, pregnancy) in SYSTEM prompt"

requirements-completed: [TRST-01, TRST-02, TRST-03]

duration: 8min
completed: "2026-06-13"
---

# Phase 07 Plan 01: Trust Interaction Demo Summary

**Safety-topic citation guardrails added to SYSTEM prompt; disclaimer and CitationHoverCard wiring verified working on both /ask and /embed/ask surfaces**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-06-13T~05:50Z
- **Completed:** 2026-06-13T~05:58Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Verified disclaimer bar ("not medical advice") present and outside scrollable content area on both /ask and /embed/ask pages (TRST-01)
- Verified CitationHoverCard wraps InlineAuthorityBadge in citation-segments.tsx — hover popover works on inline badges (TRST-02)
- Added explicit safety-topic guardrail line to SYSTEM constant in route.ts — LLM now prohibited from making uncited claims about dosing, contraindications, drug interactions, sequencing, pregnancy/lactation, complications, adverse events, or off-label use (TRST-03)

## Task Commits

1. **Task 1: Verify disclaimer and citation hover card** — No code changes required; all surfaces already correct. No commit (nothing changed).
2. **Task 2: Harden system prompt with safety guardrails** - `a92dc76` (feat)

**Plan metadata:** (final docs commit — see below)

## Files Created/Modified

- `app/api/ask/route.ts` — Added 2-sentence safety-topic guardrail block to SYSTEM constant after "If the sources do not support an answer, say so."

## Decisions Made

- CitationHoverCard wiring accepted as-is via citation-segments.tsx rather than duplicating it into answer-message.tsx — the functional behavior (hover popover on badge click) is correct; adding a redundant import would be speculative/cosmetic
- Guardrail text inserted as a single multi-clause sentence to minimize diff surface and preserve prompt structure

## Deviations from Plan

None — plan executed exactly as written. Task 1 was pure verification (no fixes needed). Task 2 was a targeted 1-line insertion.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- TRST-01, TRST-02, TRST-03 all satisfied
- System prompt now explicitly guardrails all clinical safety topics
- Ready for Phase 07 Plan 02

## Self-Check: PASSED

- FOUND: app/api/ask/route.ts
- FOUND: .planning/phases/07-trust-interaction-demo/07-01-SUMMARY.md
- FOUND: commit a92dc76 (feat: safety guardrails)

---
*Phase: 07-trust-interaction-demo*
*Completed: 2026-06-13*
