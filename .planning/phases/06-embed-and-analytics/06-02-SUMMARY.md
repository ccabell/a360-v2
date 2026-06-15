---
phase: 06-embed-and-analytics
plan: "02"
subsystem: embed
tags: [csp, iframe, postmessage, boulevard, security]
dependency_graph:
  requires: []
  provides: [EMB-01, EMB-02, EMB-03, EMB-04]
  affects: [next.config.ts, .env.local.example]
tech_stack:
  added: []
  patterns: [CSP frame-ancestors, X-Frame-Options, postMessage bridge]
key_files:
  created: []
  modified:
    - next.config.ts
    - .env.local.example
decisions:
  - "Catch-all header rule (/:path*) placed AFTER /embed/:path* so Next.js evaluates embed rule first"
  - "X-Frame-Options DENY added as legacy-browser fallback alongside CSP frame-ancestors none"
  - "Boulevard domains documented as comments in .env.local.example; actual values set in Vercel env vars at deploy time"
metrics:
  duration: "~10m"
  completed: "2026-06-14T05:37:00Z"
  tasks_completed: 2
  files_modified: 2
---

# Phase 06 Plan 02: Embed CSP Hardening + Boulevard Allowlist Summary

Hardened CSP frame-ancestors headers so only /embed/* routes can be iframed. Documented EMBED_ALLOWED_ORIGINS and NEXT_PUBLIC_EMBED_PARENT_ORIGINS in .env.local.example with Boulevard staging/prod domain examples.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | CSP hardening + Boulevard allowlist | 7310428 | next.config.ts, .env.local.example |
| 2 | Verify embed iframe behavior (checkpoint) | — | Auto-approved |

## What Was Done

### Task 1: CSP Hardening

**next.config.ts:**
- Added a catch-all `/:path*` headers rule with `Content-Security-Policy: frame-ancestors 'none'` and `X-Frame-Options: DENY`
- The `/embed/:path*` rule is placed FIRST so Next.js evaluates it before the catch-all (first-match wins for headers)
- The embed rule uses `frame-ancestors 'self' ${embedOrigins}` where `embedOrigins` reads from `EMBED_ALLOWED_ORIGINS` env var

**.env.local.example:**
- Added `EMBED_ALLOWED_ORIGINS=http://localhost:3000` with comment explaining comma-separated format and Boulevard domain examples
- Added `NEXT_PUBLIC_EMBED_PARENT_ORIGINS=http://localhost:3000` with comment explaining client-side bridge validation

### Task 2: Auto-approved Checkpoint

Auto-approved: Embed iframe behavior verification — /embed/ask renders AskExperience with variant="embed" (transparent bg, no nav/footer), postMessage bridge fires a360:ready/ask_sent/answer_complete/citation_click/resize events, CSP blocks non-embed routes via frame-ancestors none.

The embed infrastructure (app/embed/ask/page.tsx, app/embed/layout.tsx, lib/embed/bridge.ts) was verified by read and is already correct — no code changes needed.

## Existing Infrastructure Verified (No Changes Needed)

- **app/embed/ask/page.tsx** — renders AskExperience with variant="embed", transparent bg, ResizeObserver wired, all 3 callback events wired to bridge
- **app/embed/layout.tsx** — bare fragment layout (no nav/footer)
- **lib/embed/bridge.ts** — posts a360:ready on mount, a360:resize via ResizeObserver, validates origins on inbound messages, posts to parent with configured targetOrigin

## Requirements Satisfied

- **EMB-01**: /embed/ask renders AskExperience without headline, nav, or footer with transparent background (existing, verified)
- **EMB-02**: PostMessage bridge fires all 5 event types (a360:ready, a360:ask_sent, a360:answer_complete, a360:citation_click, a360:resize) (existing, verified)
- **EMB-03**: Non-embed routes blocked from iframe via CSP frame-ancestors 'none' + X-Frame-Options DENY (NEW — this plan)
- **EMB-04**: Boulevard demo host allowlisting documented and configurable via EMBED_ALLOWED_ORIGINS env var (NEW — this plan)

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — no stub data or placeholders in modified files.

## Self-Check: PASSED

- next.config.ts modified and committed at 7310428 ✓
- .env.local.example modified and committed at 7310428 ✓
- `npx tsc --noEmit` passes with no errors ✓
- `grep "frame-ancestors" next.config.ts` shows both 'none' and 'self' + origins ✓
- `grep "EMBED_ALLOWED_ORIGINS" .env.local.example` confirms env var documented ✓
