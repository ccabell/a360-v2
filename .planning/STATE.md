---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Heidi Evidence Clone + Agent Runtime Inspector
status: In progress
stopped_at: Merge of AbhishekEdits + feat/ask-sidebar-tab branches
last_updated: "2026-06-14T18:31:20.679Z"
progress:
  total_phases: 7
  completed_phases: 5
  total_plans: 15
  completed_plans: 13
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-14)

**Core value:** Every clinical claim backed by cited, linkable data that providers can tap to verify
**Current focus:** Phase 15 — runtime-stabilization

## Current Position

Phase: 15
Plan: Not started

## v2.0 Phases at a Glance (Planned)

| Phase | Name | Requirements | Status |
|-------|------|--------------|--------|
| 15 | runtime-stabilization | RUN-01 through RUN-05 | In Progress (backend done) |
| 16 | trace-contract-and-persistence | TRACE-01 through TRACE-04, OBS-01, OBS-02 | Not started |
| 17 | inspector-ui | UI-01, UI-02, UI-03 | Not started |
| 18 | output-viewer | UI-04 | Not started |
| 19 | demo-mode | DEMO-01, DEMO-02, DEMO-03 | Not started |

## Performance Metrics

**v1.0 Velocity (for reference):**

- Total plans completed: 21 (phases 01-07)
- Phases shipped: 7 (01-07)

**v1.1 Velocity (completed):**

- Total plans completed: 6 (phases 08-10)
- Phases shipped: 3

**v1.2 Velocity:**

- Total plans completed: 2/12
- Average duration: N/A

**v2.0 Evidence Ask (completed):**

- Total plans completed: 9 (phases 4-7)
- All v2.0 Evidence Ask phases complete

## Accumulated Context

### Decisions

- [v2.0 architecture]: Runtime executes in-project — Next.js API routes + Supabase + Claude API on Vercel. No Prompt Runner dependency.
- [v2.0 architecture]: Three Supabase instances: Agent Manager, CMS, PR Supabase.
- [v2.0 architecture]: Runtime emits structured trace events that stream live over SSE AND persist for replay.
- [v2.0]: A360 brand palette only (slate/blue/ice/white) — NO Heidi yellow/sand colors
- [v2.0]: Clone Heidi UX patterns, not visual identity
- [v2.0]: Extend existing grounding/ components — do not rebuild
- [v2.0]: lib/retrieval/* is FROZEN — all changes in components/ and app/ only
- [Phase 04]: KEY_POINTS sentinel approach: LLM prefixes answer with parseable line, server strips before streaming prose
- [Phase 04]: parseCitationSegments extracted as shared helper
- [Phase 04]: h3 with border-l-2 border-primary for section headings
- [Phase 04]: Table detection requires both header row and separator row regex
- [Phase 04]: MarkdownTable falls back to plain p element for malformed tables
- [Phase 05-source-display]: 3-tier color system: green=trusted, blue=evidence, neutral=general
- [Phase 06-02]: Catch-all header rule placed AFTER /embed/:path*
- [Phase 06-embed-and-analytics]: fire-and-forget trackEvent: keepalive POST to /api/ask/event
- [Phase 07-trust-interaction-demo]: SYSTEM prompt safety guardrails added
- [Phase 07]: Follow-up pills use bg-accent (A360 cool-tone)
- [Phase 15-01]: AI SDK v6 replaced maxSteps with stopWhen(stepCountIs(N))
- [Phase 15-01]: AI SDK v6 tool-call uses 'input' (not 'args'), tool-result uses 'output' (not 'result')
- [Phase 15-01]: Agent runtime tools use jsonSchema() from ai SDK and structured error returns
- [v1.2 architecture]: Sources and fuel are separate concepts
- [v1.2 architecture]: Enrichment pipeline is a repeatable loop
- [Phase 12]: Evidence level weak used for all Sculptra combination pairs
- [Phase 12]: Live table is agent_fuel_documents (not gl_agent_fuel_documents)

### v1.0 Carry-Forward Context

- [Phase 06]: SQL execution deferred
- [Phase 03-retrieval-wiring]: 03-04 live UI verification completed
- [Phase 07-timing-rules]: BoNT-A 85-day minimum retreatment floor used as safety floor
- [Phase 06]: 5 canonical, 32 common, 51 conditional, 48 compatible_only, 17 do_not_market pairs
- [Phase 05]: 593 aliases across 48 concerns; 4 concern clusters
- [Phase 02-dossier-batch]: 02-05 SQL files committed but not yet executed

### Roadmap Evolution

- v1.1 milestone created 2026-06-14
- v1.2 milestone created 2026-06-14
- v2.0 milestone includes both Evidence Ask phases (4-7) and Agent Runtime Inspector phases (15-19)
- Phase 11.1 inserted after Phase 11

### Pending Todos

- ~~Chris to review 37 per-pair review cards~~ — Done
- EVID-03 live UI verification — Deferred (no AI_GATEWAY_API_KEY provisioned)
- TIMING_REVIEW.md closure — Deferred to future milestone
- SQL manifest execution (51 files pending) — Deferred to future milestone

### Blockers/Concerns

- AI_GATEWAY_API_KEY not provisioned — EVID-03 deferred
- SQL manifest execution deferred — 51 files pending
- Demo deadline: June 22, 2026 (Boulevard CEO/CTO meeting)

## Session Continuity

Last session: 2026-06-14T18:31:20.679Z
Stopped at: Merge of AbhishekEdits + feat/ask-sidebar-tab branches
Resume file: None
Next action: Execute 15-02-PLAN.md (frontend page rewrite)
