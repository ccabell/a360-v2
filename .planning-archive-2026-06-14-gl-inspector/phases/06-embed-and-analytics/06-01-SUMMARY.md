---
phase: 06-embed-and-analytics
plan: "01"
subsystem: analytics
tags: [analytics, ask, event-tracking, ask_log]
dependency_graph:
  requires: []
  provides: [analytics-events]
  affects: [ask-experience, ask-log]
tech_stack:
  added: []
  patterns: [fire-and-forget fetch, SSE event naming, ask_log event rows]
key_files:
  created:
    - lib/ask/analytics.ts
    - app/api/ask/event/route.ts
  modified:
    - components/ask/ask-experience.tsx
decisions:
  - "Fire-and-forget pattern (keepalive: true, .catch(() => {})) ensures analytics never block or error the UX"
  - "question field encodes event data as event:{name}:url={url}:tier={tier} for SQL queryability without schema change"
  - "citation_click fires for all variants (not just public/embed) — dashboard click data is equally valuable"
  - "startTimeRef set at top of send() before async work begins for accurate end-to-end latency measurement"
metrics:
  duration_minutes: 15
  completed_date: "2026-06-13"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 3
---

# Phase 06 Plan 01: Analytics Events Summary

Three named analytics events — `evidence_unauth_ask`, `evidence_answer_complete`, `citation_click` — fire at correct lifecycle moments and are recorded in `ask_log` via a validated POST endpoint and a fire-and-forget client helper.

## What Was Built

### lib/ask/analytics.ts (new)

Thin client-side helper. Exports `trackEvent(eventName, payload?)` which POSTs to `/api/ask/event` with `keepalive: true` and swallows all errors. Also exports `AnalyticsEventName` union type documenting the three expected values.

### app/api/ask/event/route.ts (new)

POST-only Next.js route that:
- Validates `event_name` against an explicit allowlist (returns 400 otherwise)
- Calls `getOrCreateSession` for consistent session tracking
- Inserts into `ask_log` with `status: "event"` and event data encoded in the `question` field as `event:{name}:url={url}:tier={tier}`

### components/ask/ask-experience.tsx (modified)

- Added `import { trackEvent }` from analytics helper
- Added `startTimeRef = useRef(0)` set at start of `send()` for latency measurement
- `evidence_unauth_ask` fires after `onAskSent` for public/embed variants
- `evidence_answer_complete` fires in `case "done":` handler with `latency_ms` and `citation_count` for public/embed
- `citation_click` fires in `handleContainerClick` for all variants with `citation_url` and `citation_tier`

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- `npx tsc --noEmit` — passes with zero errors
- `grep "trackEvent" components/ask/ask-experience.tsx` — shows 4 lines (1 import + 3 calls)
- `grep "evidence_unauth_ask|evidence_answer_complete|citation_click" app/api/ask/event/route.ts` — all 3 in allowlist

## Known Stubs

None. Events insert real session IDs and real data into ask_log. No placeholder values.

## Self-Check: PASSED

Files exist:
- lib/ask/analytics.ts: FOUND
- app/api/ask/event/route.ts: FOUND
- components/ask/ask-experience.tsx: modified

Commits:
- ed232bc: feat(06-01): analytics helper + /api/ask/event route
- 0f724b8: feat(06-01): wire analytics events into AskExperience
