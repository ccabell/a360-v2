---
phase: 07
plan: 02
subsystem: ask-experience
tags: [ui, brand-styling, suggestion-chips, follow-up-pills]
dependency_graph:
  requires: []
  provides: [INTR-01, INTR-02]
  affects: [components/ask/ask-experience.tsx, components/ask/ask-suggestion-chips.tsx]
tech_stack:
  added: []
  patterns: [Tailwind bg-accent for brand tone, border-primary/N for primary border hints]
key_files:
  created: []
  modified:
    - components/ask/ask-experience.tsx
decisions:
  - Follow-up pills use bg-accent (A360 cool-tone) with border-primary/20 — consistent with brand palette, avoids generic bg-card
  - Suggestion chips required zero changes — onSelect wired correctly to send, ASK_SUGGESTIONS fully populated
metrics:
  duration: "3 minutes"
  completed_date: "2026-06-14T05:51:00Z"
  tasks_completed: 2
  files_modified: 1
---

# Phase 07 Plan 02: Follow-up Pills Brand Styling and Suggestion Chips Verification

**One-liner:** Follow-up suggestion pills restyled to A360 accent palette (bg-accent/border-primary), suggestion chips confirmed functional with verb grouping and onSelect wiring.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Restyle follow-up suggestion pills to A360 brand | 0f87529 | components/ask/ask-experience.tsx |
| 2 | Verify suggestion chips functionality | (no change) | — |

## What Was Built

**INTR-01 — Follow-up suggestion pills (Task 1):**

Changed the className on follow-up pill buttons in `ask-experience.tsx` (line 452):

- Before: `rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/50 hover:bg-muted disabled:opacity-50`
- After: `rounded-full border border-primary/20 bg-accent px-3 py-1.5 text-xs text-accent-foreground transition-colors hover:bg-accent/80 hover:border-primary/40 disabled:opacity-50`

Only the className string was changed. onClick handler, disabled logic, and JSX structure are unchanged.

**INTR-02 — Suggestion chips verification (Task 2):**

Verified the full wiring chain:
- `lib/config/ask-suggestions.ts` — exports `ASK_SUGGESTIONS` with 5 verb groups (Compare, Safety, Pairing, Timing, Value), each with 3 query items.
- `app/ask/page.tsx` — imports `ASK_SUGGESTIONS`, passes `suggestions={ASK_SUGGESTIONS}` to `AskExperience`.
- `ask-experience.tsx` line 335 — renders `<AskSuggestionChips suggestions={suggestions} onSelect={send} />`.
- `ask-suggestion-chips.tsx` — accepts `VerbGroup[]` and `onSelect`, renders verb toggle buttons, expands item list on verb click, calls `onSelect(item.query)` on item click.

No defects found. No changes made.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Self-Check

- [x] `components/ask/ask-experience.tsx` modified and committed at 0f87529
- [x] `bg-accent` present in follow-up pills section
- [x] `border-primary/20` present in follow-up pills section
- [x] `bg-card` no longer present in follow-up pills section (still present in unrelated dashboard EXAMPLE_QUERIES section — correct)
- [x] Build passes: `✓ Compiled successfully in 3.4s`
- [x] `onSelect` wired in ask-suggestion-chips.tsx
- [x] `ASK_SUGGESTIONS` imported and passed in app/ask/page.tsx
- [x] `suggestions=` prop wired in ask-experience.tsx
