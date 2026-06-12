---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: Phase complete — ready for verification
stopped_at: Completed 02-06-PLAN.md — batch reports generated
last_updated: "2026-06-12T22:52:35.080Z"
progress:
  total_phases: 3
  completed_phases: 2
  total_plans: 13
  completed_plans: 12
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-12)

**Core value:** OpenEvidence for aesthetic medicine — every clinical claim backed by cited, linkable data
**Current focus:** Phase 03 — retrieval-wiring

## Current Position

Phase: 03 (retrieval-wiring) — EXECUTING
Plan: 4 of 4

## Performance Metrics

**Velocity:**

- Total plans completed: 9 (3 in Phase 1, 6 in Phase 2)
- Average duration: N/A
- Total execution time: N/A

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-citations | 3/3 | - | - |
| 02-dossier-batch | 6/6 | - | - |
| 03-retrieval-wiring | 1/4 | - | - |
| Phase 02-dossier-batch P04 | 45 minutes | 2 tasks | 14 files |
| Phase 02 P03 | 45 | 2 tasks | 19 files |
| Phase 02-dossier-batch P04 | 35 | 2 tasks | 14 files |
| Phase 02 P05 | 23 | 2 tasks | 15 files |
| Phase 03-retrieval-wiring P02 | 25 | 2 tasks | 2 files |
| Phase 03-retrieval-wiring P03 | 10 | 2 tasks | 2 files |
| Phase 02-dossier-batch P06 | 8 | 2 tasks | 4 files |
| Phase 02-dossier-batch P06 | 12 | 2 tasks | 3 files |

## Accumulated Context

### Decisions

- Phase 1: page_number column added; PubMed pmids backfilled; FDA URLs backfilled for 47 rows
- Phase 1: Compile pipeline updated to always capture pmid/doi/url on evidence_links inserts
- [Phase 02-dossier-batch]: Radiesse not in compile_manifest.json — compiled Sculptra only for biostimulators; Radiesse deferred (not in DB manifest)
- [Phase 02-dossier-batch]: PAH safety floor: CoolSculpting clinical uses Singh et al. 2019 incidence (1/138) — more conservative than manufacturer's original 1/20,000 estimate
- [Phase 03-retrieval-wiring P01]: Botox offering_id 4b92be36-e84e-432c-8549-f5d85a767fdb confirmed; Neurotoxins category_id 57b7c5a8-0799-42b0-9111-8441f18a82db confirmed; evidence_links pubmed=14, fda_label=10, total=31; agent_reference_docs=6; D-07 fallback not needed
- [Phase 02-dossier-batch P03]: item_body_areas trigger gl_check_side_laterality() requires side to match body_area.laterality — midline areas (Perioral, Perioral Lines, Full Face, Chin) require side='na'; new zones need explicit laterality UPDATE after INSERT (default='na')
- [Phase 02-dossier-batch P03]: source_registry.ingestible is a generated column — never include in INSERT column lists
- [Phase 02-dossier-batch P03]: HA Fillers category_id = 6e7e0d2b-b8ed-4d30-8e5e-a5c63ce4ccb8
- [Phase 02]: HA Fillers product scope in 02-03: 5 products per manifest (Voluma, Vollure, Skinvive, Restylane Lyft, RHA Redensity) — not the full Juvederm/Restylane portfolios
- [Phase 02-dossier-batch]: Radiesse not in compile_manifest for 02-04; Sculptra compiled as only biostimulator product. Radiesse requires a future manifest entry.
- [Phase 02-dossier-batch]: Kybella categorized under Injectable Fat Reduction, CoolSculpting under Body Contouring — separate extends_doc_id parents per manifest category_id
- [Phase 02-dossier-batch]: PAH safety floor mandatory in CoolSculpting clinical_summary + patient_education; Singh et al. 2019 (1/138 incidence) used as sourced claim
- [Phase 02]: Energy device compile scoped to 4 manifest products (Morpheus8, Sofwave, Ultherapy PRIME, Hollywood Spectra); Thermage/Vivace/laser devices not in manifest
- [Phase 02]: GLP-1 products (semaglutide, tirzepatide) skipped — out of aesthetics scope; no GL category parent; deferred to practice-specific decision
- [Phase 02]: Daxxify unit non-interchangeability with Botox units treated as Safety Floor (rank 1 safety-critical) in technique documentation
- [Phase 03-retrieval-wiring]: sources.ts uses direct evidence_links + agent_reference_docs queries with hard-coded Botox IDs (no search_reference_docs RPC); route.ts uses gateway('anthropic/claude-haiku-4.5'); maxOutputTokens replaces maxTokens for AI SDK v6
- [Phase 03-retrieval-wiring]: stream.ts error path uses yield ResearchEvent error rather than throw — matches streaming protocol; research-chat.tsx import was already correct from prior session
- [Phase 02-dossier-batch]: 02-05 SQL files written but not executed — 9 products have 0 live DB structured intelligence; priority SQL execution list in STRUCTURED_COVERAGE.md
- [Phase 02-dossier-batch]: Top 10 OA Botox/Neurotoxin papers for pre-demo ingestion are from ASJ Open Forum (2), Dermatology and Therapy (7, CC-BY-NC), and Cureus (1) — all confirmed PMC links
- [Phase 02-dossier-batch]: 02-05 SQL files committed to supabase/compile_sql/ but not yet executed — 12 products show 0 docs in live DB; execution checklist documented in STRUCTURED_COVERAGE.md

### Pending Todos

None yet.

### Blockers/Concerns

- AI_GATEWAY_API_KEY must be provisioned in .env.local for LLM generation to work (streamText will throw GatewayAuthenticationError; DB/UI parts unaffected)

## Session Continuity

Last session: 2026-06-12T22:52:17.068Z
Stopped at: Completed 02-06-PLAN.md — batch reports generated
Resume file: None
