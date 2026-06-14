---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Heidi Evidence Clone
status: Phase complete — ready for verification
stopped_at: Completed 06-01-PLAN.md
last_updated: "2026-06-14T05:39:42.917Z"
progress:
  total_phases: 4
  completed_phases: 2
  total_plans: 6
  completed_plans: 5
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-13)

**Core value:** Every clinical claim backed by cited, linkable data that providers can tap to verify
**Current focus:** Phase 06 — embed-and-analytics

## Current Position

Phase: 06 (embed-and-analytics) — EXECUTING
Plan: 2 of 2

## Performance Metrics

**Velocity (v1.0):**

- Total plans completed: 13 (3 + 6 + 4)
- All v1.0 phases complete

**v2.0:** Not started

## Accumulated Context

### Decisions

- v1.0 Phase 1: page_number column added; PubMed pmids backfilled; FDA URLs backfilled for 47 rows
- v1.0 Phase 3: sources.ts uses direct evidence_links + agent_reference_docs; route.ts uses gateway('anthropic/claude-haiku-4.5')
- v2.0: A360 brand palette only (slate/blue/ice/white) — NO Heidi yellow/sand colors
- v2.0: Clone Heidi UX patterns, not visual identity
- v2.0: Extend existing grounding/ components — do not rebuild AskExperience, InlineAuthorityBadge, CitationHoverCard, etc.
- v2.0: lib/retrieval/* is FROZEN — all changes in components/ and app/ only
- [Phase 04]: KEY_POINTS sentinel approach: LLM prefixes answer with parseable line, server strips before streaming prose, delivered via done event
- [Phase 04]: parseCitationSegments extracted as shared helper — used by both AnswerMessage and KeyPointsCard
- [Phase 04]: h3 with border-l-2 border-primary for section headings — clear hierarchy without new design tokens
- [Phase 04]: Table detection requires both header row and separator row regex to avoid false positives on prose with pipes
- [Phase 04]: MarkdownTable falls back to plain p element for malformed tables (fewer than 3 lines) for graceful degradation
- [Phase 05-source-display]: 3-tier color system: green=trusted (FDA/manufacturer), blue=evidence (pubmed/practice), neutral=general (youtube/podcast/industry)
- [Phase 05-source-display]: TIER_RELIABLE and corpusTier exported from source-meta.ts for reliable badge consumption in Plan 02
- [Phase 05-source-display]: Reliable badge uses bg-tier-trusted-bg (green) matching trusted tier chip for visual consistency; typeTag pill uses bg-muted for softer secondary label
- [Phase 06-02]: Catch-all header rule placed AFTER /embed/:path* so Next.js first-match wins for embed routes; X-Frame-Options DENY added as legacy-browser fallback; Boulevard domains documented in .env.local.example comments
- [Phase 06-embed-and-analytics]: fire-and-forget trackEvent: keepalive POST to /api/ask/event, errors swallowed — analytics never block UX
- [Phase 06-embed-and-analytics]: ask_log event rows use status=event + question field encoding (event:{name}:...) for queryability without schema change

### Pending Todos

None yet.

### Blockers/Concerns

- AI_GATEWAY_API_KEY must be provisioned in .env.local for LLM generation to work
- Demo deadline: June 22, 2026 (Boulevard CEO/CTO meeting) — 9 days from milestone start

## Session Continuity

Last session: 2026-06-14T05:39:42.914Z
Stopped at: Completed 06-01-PLAN.md
Resume file: None
