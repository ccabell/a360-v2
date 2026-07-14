---
phase: 04-answer-structure
plan: "01"
subsystem: grounding-ui
tags: [key-points, citation-parsing, answer-structure, sse-events]
dependency_graph:
  requires: []
  provides: [KeyPointsCard, parseCitationSegments, extractKeyPoints, keyPoints-sse-event]
  affects: [components/grounding/answer-message.tsx, components/ask/ask-experience.tsx, app/api/ask/route.ts]
tech_stack:
  added: []
  patterns: [shared-citation-parser, sentinel-extraction, sse-event-extension]
key_files:
  created:
    - components/grounding/citation-segments.tsx
    - components/grounding/key-points-card.tsx
  modified:
    - app/api/ask/route.ts
    - components/grounding/answer-message.tsx
    - components/ask/ask-experience.tsx
    - lib/types/retrieval.ts
decisions:
  - "Extract citation parsing into shared helper to avoid duplication between AnswerMessage and KeyPointsCard"
  - "KEY_POINTS sentinel approach: LLM prefixes answer with parseable line, server strips before streaming prose to client"
  - "keyPoints delivered via done SSE event so card only appears after answer completes"
  - "h3 with border-l-2 border-primary gives clear visual hierarchy without introducing new design tokens"
metrics:
  duration: "~8 minutes"
  completed_date: "2026-06-14"
  tasks_completed: 1
  tasks_total: 1
  files_created: 2
  files_modified: 4
---

# Phase 04 Plan 01: Key Points Card and Heading Upgrade Summary

JWT auth with refresh rotation using jose library

## One-liner

Key Points summary card (ANS-01) and h3 section heading upgrade (ANS-02) — LLM outputs a KEY_POINTS sentinel line, server strips and delivers via done SSE event, KeyPointsCard renders sourced bullets above the answer prose.

## What Was Built

### Task 1: Extract shared citation parser, add KEY_POINTS to route, create KeyPointsCard

All five files changed in a single task:

**`components/grounding/citation-segments.tsx` (NEW)**
Extracted `parseCitationSegments(text, resolve, byNumber, citations)` from the inline logic that previously lived only in `AnswerMessage`. Exports the `ResolvedRef` interface. Both `AnswerMessage` and `KeyPointsCard` import from here — no duplicated parsing logic.

**`components/grounding/key-points-card.tsx` (NEW)**
`KeyPointsCard` renders a bordered card with "Key Points" header and bulleted takeaways. Each bullet calls `parseCitationSegments` for inline authority badges. Returns null when `keyPoints.length === 0`. Uses `bg-primary/5` and `border-primary/20` tokens per A360 brand constraints.

**`app/api/ask/route.ts` (MODIFIED)**
- `extractKeyPoints()` strips a `KEY_POINTS: …|…|…` prefix from the LLM output
- SYSTEM prompt instructs the model to output this prefix before the structured answer
- `maxOutputTokens` raised 600 → 800 for headroom
- `keyPoints` passed through to the `done` SSE event after chaining `extractFollowUps` → `extractKeyPoints`

**`components/grounding/answer-message.tsx` (MODIFIED)**
- Inline citation parsing replaced with `parseCitationSegments` call
- Section headings upgraded from `<h4 className="text-sm font-semibold">` to `<h3 className="mt-4 mb-1 border-l-2 border-primary pl-3 text-base font-semibold">`

**`lib/types/retrieval.ts` (MODIFIED)**
- `keyPoints?: string[]` added to the `done` event variant in `ResearchEvent`

**`components/ask/ask-experience.tsx` (MODIFIED)**
- `keyPoints?: string[]` added to `AssistantMessage` interface
- `done` handler propagates `ev.keyPoints`
- `KeyPointsCard` imported and rendered above `GroundedAnswer` when `m.done && m.keyPoints.length > 0`

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. Key Points card renders real data from the LLM `done` event. If the LLM does not emit a `KEY_POINTS:` line (e.g., fallback prose path), `keyPoints` will be an empty array and the card will not render — this is intentional graceful degradation.

## Self-Check: PASSED

- `components/grounding/citation-segments.tsx` — FOUND
- `components/grounding/key-points-card.tsx` — FOUND
- `app/api/ask/route.ts` modified — FOUND
- `components/grounding/answer-message.tsx` modified — FOUND
- `components/ask/ask-experience.tsx` modified — FOUND
- `lib/types/retrieval.ts` modified — FOUND
- Commit de1185c — FOUND
- `npx tsc --noEmit` — PASSED (zero errors)
