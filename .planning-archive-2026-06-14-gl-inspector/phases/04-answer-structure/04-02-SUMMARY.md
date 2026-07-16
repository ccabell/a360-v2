---
phase: 04-answer-structure
plan: "02"
subsystem: grounding-ui
tags: [markdown-table, gfm, citation-badges, mobile-scroll, answer-structure]
dependency_graph:
  requires: [04-01]
  provides: [MarkdownTable, isTable-detection]
  affects: [components/grounding/answer-message.tsx, components/grounding/markdown-table.tsx]
tech_stack:
  added: []
  patterns: [gfm-pipe-table-parser, per-cell-citation-injection, overflow-x-auto-mobile-scroll]
key_files:
  created:
    - components/grounding/markdown-table.tsx
  modified:
    - components/grounding/answer-message.tsx
decisions:
  - "parseRow strips leading/trailing pipes and splits on | — handles LLM-generated tables without whitespace ambiguity"
  - "Separator row (line index 1) is skipped; empty lines filtered so LLM whitespace variation is tolerated"
  - "Table detection regex requires both header row and separator row — avoids false positives on prose with pipes"
  - "Fallback to <p> for malformed tables (fewer than 3 lines) — graceful degradation"
metrics:
  duration: "~2 minutes"
  completed_date: "2026-06-14"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 1
---

# Phase 04 Plan 02: GFM Pipe Table Rendering Summary

## One-liner

MarkdownTable component parses GFM pipe table strings with per-cell parseCitationSegments and overflow-x-auto mobile scroll, wired into AnswerMessage via isTable regex detection.

## What Was Built

### Task 1: Create MarkdownTable component and add table detection to AnswerMessage

**`components/grounding/markdown-table.tsx` (NEW)**

`MarkdownTable` accepts a raw GFM pipe table string plus the same `resolve`/`byNumber`/`citations` args as `AnswerMessage`. It:
- Calls `parseRow()` (strip outer pipes, split on `|`, trim) to extract header cells and data cells
- Skips the separator row (line index 1) and filters empty lines for LLM whitespace tolerance
- Renders each cell via `parseCitationSegments` — inline authority badges appear wherever `[src_N]` markers are present
- Wraps the `<table>` in `<div className="overflow-x-auto my-3">` for ANS-04 mobile horizontal scroll
- Header row: `bg-muted/50` with bold `<th>` cells; data rows: `odd:bg-background even:bg-muted/20` alternating

Falls back to a plain `<p>` for malformed tables (fewer than 3 lines).

**`components/grounding/answer-message.tsx` (MODIFIED)**

- Added `import { MarkdownTable } from "./markdown-table"`
- Added `isTable` detection branch after `headingMatch` check, before the prose `<p>` render
- Regex: `/^\|.+\|\n\|[-| :]+\|/m` — requires both header row and separator row for precision

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. MarkdownTable renders real data from LLM output. If no table appears in an answer, the branch is simply skipped — no stub rendering.

## Self-Check: PASSED

- `components/grounding/markdown-table.tsx` — FOUND
- `export function MarkdownTable` — FOUND
- `overflow-x-auto` — FOUND in JSX wrapper
- `min-w-full` — FOUND
- `parseCitationSegments` — FOUND (3 call sites: header, data, fallback)
- `border-collapse` — FOUND
- `isTable` — FOUND in answer-message.tsx
- `MarkdownTable` in answer-message.tsx — 2 matches (import + JSX usage)
- `npx tsc --noEmit` — PASSED (zero errors)
- Commit 89376d0 — FOUND
