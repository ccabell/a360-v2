---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: Pipeline Integrity & Data Strategy
status: Phase complete — ready for verification
stopped_at: Completed 11.1-03-PLAN.md — Fuel Library list page, badges, filters, create dialog
last_updated: "2026-06-14T17:08:10.994Z"
progress:
  total_phases: 3
  completed_phases: 3
  total_plans: 6
  completed_plans: 6
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-14)

**Core value:** OpenEvidence for aesthetic medicine — every clinical claim backed by cited, linkable data
**Current focus:** Phase 15 — runtime-stabilization

## Current Position

Phase: 15 (runtime-stabilization) — EXECUTING
Plan: 2 of 2 complete

## v2.0 Phases at a Glance (Planned)

| Phase | Name | Requirements | Status |
|-------|------|--------------|--------|
| 15 | runtime-stabilization | RUN-01 through RUN-05 | Not started |
| 16 | trace-contract-and-persistence | TRACE-01 through TRACE-04, OBS-01, OBS-02 | Not started |
| 17 | inspector-ui | UI-01, UI-02, UI-03 | Not started |
| 18 | output-viewer | UI-04 | Not started |
| 19 | demo-mode | DEMO-01, DEMO-02, DEMO-03 | Not started |

## Performance Metrics

**v1.0 Velocity (for reference):**

- Total plans completed: 21 (phases 01-07)
- Phases shipped: 7 (01-07), with 03-04 pending

**v1.1 Velocity (completed):**

- Total plans completed: 6 (phases 08-10)
- Phases shipped: 3

**v1.2 Velocity:**

- Total plans completed: 2/12
- Average duration: N/A

## Accumulated Context

### Decisions

- [v2.0 architecture]: Runtime executes in-project — Next.js API routes + Supabase + Claude API on Vercel. No Prompt Runner dependency.
- [v2.0 architecture]: Three Supabase instances: Agent Manager (agent defs/versions/tools/runs/events/artifacts), CMS (RAG vectorized content), PR Supabase (transcripts/patients).
- [v2.0 architecture]: Runtime emits structured trace events that stream live over SSE AND persist for replay. Both are required — live streaming and stored events share the same AgentRunEvent schema.
- [v2.0 architecture]: Current agent-tester page is 100% mock (pickScenario + setTimeout). Phase 15 replaces it entirely before adding trace infrastructure in Phase 16.
- [v2.0 architecture]: OBS-01 and OBS-02 (observability metrics) assigned to Phase 16 alongside trace — metrics are computable from stored events, not a separate system.
- [v2.0 scope]: PHI/PII redaction (PRIV-01) and run comparison (CMP-01) deferred to v2.1.
- [v1.2 architecture]: Sources and fuel are separate concepts — sources are raw authoritative material in vector DBs, fuel is curated agent-ready intelligence derived from sources. Agents use tools to search sources at runtime for edge cases beyond fuel doc coverage.
- [v1.2 architecture]: Three-layer model: (1) Sources (evidence_links, agent_reference_docs) → (2) Global fuel (gl_agent_fuel_documents, optimal defaults) → (3) Practice fuel (pl_* overrides, practices customize later). COALESCE pattern same as gl_products/pl_products.
- [v1.2 architecture]: Replace binary "production-citable yes/no" with practical guidance on what each source type is good for. FDA=safety/dosing, PubMed=clinical evidence, manufacturer=product education, industry=context/trends, podcasts=research only.
- [v1.2 architecture]: Fuel docs cover common cases well. Agent tools (PubMed search, manufacturer data search, etc.) handle the long tail at runtime. Fuel docs don't need to be exhaustive.
- [v1.2 architecture]: Enrichment pipeline is a repeatable loop, not a one-time build. Add new source → classify → chunk → vector DB → mark affected fuel stale → regenerate.
- [v1.2 simplification]: No package architecture, tier models, or Full Face Refresh framework in v1.2. Build fuel data first; frameworks can emerge later.
- [v1.2 simplification]: PHASE_8_QUESTIONS.md (25 questions) is NOT a blocker. Simplified fuel doc approach doesn't need architectural decisions about packages/tiers.
- [v1.1 roadmap]: Phase 08 inventories SQL files first (EXEC-01-03) then validates them (VAL-01-03) — execution manifest must precede validation harness so there is a single source of truth to validate against
- [v1.1 roadmap]: Phase 09 defines the two-layer evidence model before Phase 10 reconciles pairing SQL — you cannot audit for podcast contamination without a documented definition of what contamination means
- [v1.1 roadmap]: POD-04 (contamination audit) placed in Phase 10 (not Phase 09) because its output directly gates pairing SQL regeneration; the model definition (POD-01-03) belongs to Phase 09
- [v1.1 roadmap]: EVID-03 (Phase 3 plan 03-04 live UI verification) bundled into Phase 09 as a standalone verification task — it is independent of pairing work and fits the provenance cleanup wave
- [v1.1 roadmap]: Existing phase directories 08-combination-intelligence, 09-care-plan-modules, 10-agent-fuel-compilation will be renumbered to 11, 12, 13 when that content work resumes in a future milestone
- [Phase 08-01]: All three Phase 6 INSERT files (canonical-common, conditional-compatible, do-not-market) flagged out_of_sync: true — grep confirmed all have WARNING/DO NOT EXECUTE headers, not just canonical-common as initially assumed
- [Phase 08-01]: 07-03-pair-timing.sql set to blocked (not pending) because its dependency chain includes three deferred 06-02 files
- [Phase 08-02]: Phase 6 canonical/common validation checks use WARN (not FAIL) -- 06-02-canonical-common-inserts.sql is do_not_execute until Phase 10 regenerates it
- [Phase 08-02]: All count assertions use >= (not =) to prevent false FAILs when future phases add rows to validated tables
- [Phase 09-01]: EC- anonymous ID format (EC-{12hex} via SHA-256 truncation) chosen for podcast concept tracking — stable, deterministic, no podcast attribution exposed
- [Phase 09-01]: Expert consensus is production-citable without attribution when no specific podcast source is named — preserves podcast-discovered knowledge while removing attribution leakage
- [Phase 09-01]: Internal file paths (PHASE_6_ANSWERS_PODCAST_SOURCED.md) in source_reference classified as contamination — research artifacts are not evidence sources
- [Phase 09-02]: PubMed URL two-pass strategy: pmid-based URL preferred, doi.org fallback for rows without pmid — confirmed by smoke test showing pmid empty on current rows
- [Phase 09-02]: SC-3 PubMed gap from Phase 03-04 UAT (2026-06-12) resolved by corpus diversity fix in Phase 03-03 — automated re-smoke confirmed PubMed sources now surface alongside FDA
- [Phase 09-02]: Task 3 human-verify checkpoint handled autonomously per overnight objective: steps documented in 03-04-SUMMARY.md, EVID-03 status is automated-smoke-passed pending human UI confirmation
- [Phase 10-pairing-sql-reconciliation]: 5 neurotoxin + Sculptra pairs promoted to common tier — orthogonal mechanisms (neuromodulation vs collagen stimulation) and 7/8 gate pass satisfies common rubric threshold
- [Phase 10-pairing-sql-reconciliation]: 6 Sculptra pairs remain conditional — HA/SKINVIVE pairs have overlapping tissue territory; Sculptra + Morpheus8 has expert-consensus-only evidence
- [Phase 10-pairing-sql-reconciliation]: Xeomin antibody language must be hedged — accessory-protein-free formulation is a consideration some providers weigh, not a guarantee against antibody formation
- [Phase 11]: Decision tree heading retained as question; answers now provide practical per-source guidance instead of binary yes/no
- [v1.1 closeout]: CFRW-01 partial — PAIR-01 verified complete (no podcast contamination, 31+ inserts); EVID-03 deferred (no API key provisioned), TIMING_REVIEW deferred, SQL manifest execution deferred. All three carry-forward items deferred to future milestone.
- [Phase 11]: Enrichment pipeline is a 5-step repeatable loop: Add, Classify, Chunk, Vector DB, Mark Stale
- [Phase 11]: Manufacturer data follows same vector collection + RPC pattern as existing CMS Supabase collections (match_manufacturer_docs)
- [Phase 11]: Non-PubMed journal articles (301 found, 146 Tier-A) classified as production-citable; vector collection decision deferred to Phase 12
- [Phase 12]: Live table is agent_fuel_documents (not gl_agent_fuel_documents) and JSON column is content (not agent_fuel_json) — all downstream SQL must use these names
- [Phase 12]: Zero pairing_fuel rows exist in live DB — Phase 12-01 SQL uses INSERT not UPDATE; pair_key in content JSONB is the idempotency key
- [Phase 12]: TypeScript type GLAgentFuelDocument (lib/types/data-sources.ts) is stale and does not reflect live agent_fuel_documents schema — deferred fix
- [Phase 11.1-01]: source_type column (existing) used as fuel_type discriminator in DB queries — avoids schema migration in this plan
- [Phase 11.1-01]: COALESCE resolution implemented in TypeScript (not SQL) — more flexible, merges content via object spread without migration
- [Phase 15-01]: AI SDK v6 replaced maxSteps with stopWhen(stepCountIs(N)) — executor adapted accordingly
- [Phase 15-01]: AI SDK v6 tool-call uses 'input' (not 'args'), tool-result uses 'output' (not 'result'), tool-error is a distinct stream part type
- [Phase 15-01]: Agent runtime tools use jsonSchema() from ai SDK (not Zod) and structured error returns (never throw)
- [Phase 11.1-02]: COALESCE resolution wired at HTTP layer — GET /api/fuel-docs/{id}?practice_id=X transparently calls getResolvedFuelDoc
- [Phase 11.1-02]: Migration SQL is reference artifact only — not auto-executed; idempotent with IF NOT EXISTS guards for safe future application
- [Phase 11.1-fuel-doc-templates-and-management-ui]: Empty state rendered as conditional block before DataTable — avoids empty DataTable when no docs exist
- [Phase 11.1-fuel-doc-templates-and-management-ui]: typeFilter and statusFilter held as separate top-level state variables (not nested) for direct handler binding in FuelDocFilters

### v1.0 Carry-Forward Context

- [Phase 06]: SQL execution deferred — Supabase MCP not available; 153 idempotent INSERT files are primary deliverables; execution status tracked in manifest (Phase 08 work)
- [Phase 06-pairing-engine]: 37 per-pair review files generated for 5 canonical + 32 common pairs; checkpoint awaiting Chris review (Phase 10 input)
- [Phase 03-retrieval-wiring]: 03-04-PLAN.md pending — live UI verification not yet completed (EVID-03 in Phase 09)
- [Phase 07-timing-rules]: BoNT-A 85-day minimum retreatment floor used as safety floor for all 5 neurotoxins
- [Phase 06]: 5 canonical, 32 common, 51 conditional, 48 compatible_only, 17 do_not_market pairs — all 153 evaluated
- [Phase 05]: 593 aliases across 48 concerns; 4 concern clusters; concern-first routing live
- [Phase 02-dossier-batch]: 02-05 SQL files committed to supabase/compile_sql/ but not yet executed — 12 products show 0 docs in live DB; execution checklist in STRUCTURED_COVERAGE.md (manifest Phase 08 work)

### Roadmap Evolution

- v1.1 milestone created 2026-06-14: quality gate before resuming Phase 11+ content build
- Phases 08-10 assigned to v1.1 Pipeline Integrity & Data Strategy
- Original content phases (combination-intelligence, care-plan-modules, agent-fuel-compilation) renumbered to 11+ when they resume
- v1.2 milestone created 2026-06-14: evidence sources + agent fuel. Sources and fuel separated into distinct concepts. Simplified from original plan — no package architecture, no tier models.
- Phases 11-14 assigned to v1.2 Evidence Sources & Agent Fuel
- Track C (Evidence Ask product surface) explicitly out of scope — separate workstream
- Phase 11.1 inserted after Phase 11: fuel-doc-templates-and-management-ui (INSERTED) — promotes backlog 999.1 into active scope; must complete before Phase 12 content generation. Scope expanded from original plan: more template fields (logically grouped), SOPs/preferences/room requirements as data, internal management UI
- v2.0 milestone created 2026-06-14: Agent Runtime Inspector. Phases 15-19. Runtime is in-project (Next.js + Supabase + Claude API). Existing agent-tester page is 100% mock; Phase 15 replaces it entirely.

### Pending Todos

- ~~Chris to review 37 per-pair review cards~~ — Done; PAIR-01/PAIR-02/PAIR-03 all complete
- ~~Sculptra pair tier decisions~~ — Done; PAIR-02 resolved in Phase 10
- EVID-03 live UI verification — Deferred (no AI_GATEWAY_API_KEY provisioned)
- TIMING_REVIEW.md closure — Deferred to future milestone
- SQL manifest execution (51 files pending) — Deferred to future milestone

### Blockers/Concerns

- ~~Chris review of pairing cards~~ — Resolved; Phase 10 complete
- AI_GATEWAY_API_KEY not provisioned — EVID-03 deferred until key available
- SQL manifest execution deferred — 51 files pending Supabase execution
- TIMING_REVIEW.md deferred — safety-critical timing decisions not yet reviewed by Chris

## Session Continuity

Last session: 2026-06-14T17:08:10.990Z
Stopped at: Completed 11.1-03-PLAN.md — Fuel Library list page, badges, filters, create dialog
Resume file: None
Next action: Execute 15-02-PLAN.md (frontend page rewrite)
