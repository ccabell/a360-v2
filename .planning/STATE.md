---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: Milestone complete
stopped_at: Completed 07-02-PLAN.md
last_updated: "2026-06-13T21:32:39.900Z"
progress:
  total_phases: 7
  completed_phases: 6
  total_plans: 25
  completed_plans: 23
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-12)

**Core value:** OpenEvidence for aesthetic medicine — every clinical claim backed by cited, linkable data
**Current focus:** Phase 06 — pairing-engine

## Current Position

Phase: 07
Plan: Not started

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
| Phase 04-source-ingestion P01 | 45 | 2 tasks | 1 files |
| Phase 05-concern-language P01 | 19 | 2 tasks | 4 files |
| Phase 04-source-ingestion P04-02 | 8 | 2 tasks | 2 files |
| Phase 05-concern-language P02 | 45 | 2 tasks | 4 files |
| Phase 05 P03 | 8 | 2 tasks | 3 files |
| Phase 05-concern-language P03 | 11 | 2 tasks | 3 files |
| Phase 06 P01 | 7 | 2 tasks | 4 files |
| Phase 06 P02 | 6 | 1 tasks | 1 files |
| Phase 07-timing-rules P01 | 209 | 2 tasks | 3 files |
| Phase 06 P03 | 11 | 2 tasks | 3 files |
| Phase 07-timing-rules P02 | 466 | 2 tasks | 3 files |

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
- [Phase 02-dossier-batch]: FDA validation PASS — 0 orphaned FDA-indicated concerns; all 12 is_fda_indicated=true rows have fda_label evidence_links
- [Phase 04-source-ingestion]: source_registry.status check constraint only allows ('active','review','retired') — not 'rejected'; use 'retired' for non-ingestible sources
- [Phase 04-source-ingestion]: ingestion_queue.rights_class is the per-item gate: per-article OA (PMC CC-BY) can be approved even from paywalled journals
- [Phase 04-source-ingestion]: JDD 'paywalled' duplicate (1be6d8be) retired as misclassified; canonical JDD (JDD) entry (dcfa3d2e, open_access_cc_by) is the active source
- [Phase 05-concern-language]: Phase 2 SQL files (02-05-task1, 02-05-task2) had 11 bugs (enum casts, generated column, wrong concern names, Chest→Decolletage, onset_time JSONB constraint, laterality trigger). All fixed in 05-01-execute-phase2-outstanding.sql.
- [Phase 05-concern-language]: concern_clusters uses separate junction table (Option A) not JSONB — enables queryable concern-first routing. body_area side must derive from ba.laterality via CASE expression.
- [Phase 04-source-ingestion]: evidence_links.field_name is NOT NULL — always include when inserting; use 'indications' for 510k/PMA device clearance rows
- [Phase 04-source-ingestion]: FDA Access Data blocks automated downloads; accessdata.fda.gov URLs used directly in evidence_links.url (Supabase Storage upload is optional)
- [Phase 05-concern-language]: Gummy Smile (new concern) aliases use subquery pattern (FROM concerns WHERE name='Gummy Smile') since UUID was not in DB_STATE_BASELINE.md
- [Phase 05-concern-language]: 187 aliases mined from 122 HIPAA-redacted transcripts; all 48 concerns now have >=4 aliases; total alias count 593 (was 406)
- [Phase 05]: Concern clusters use junction table pattern (concern_cluster_members) enabling queryable multi-mechanism routing; Brow Ptosis cluster membership documented despite 0 item_concerns rows
- [Phase 05]: SC-3 validated: 'I look tired' routes to 5 distinct products across 3 concern mechanisms (Skin Dullness, Skin Quality Improvement, Tear Trough Hollowing)
- [Phase 05-concern-language]: concern_clusters uses 17 members across 4 clusters (Tired Appearance=5, Lower-Face Heaviness=5, Post-Weight-Loss Laxity=4, Angry/Mean Resting Expression=3); cluster routing is queryable via join chain
- [Phase 05-concern-language]: Brow Ptosis has 0 item_concerns rows — concern is cluster-visible but returns 0 products in Query B; SC-3 still passes via Tear Trough Hollowing and Skin Dullness pathways
- [Phase 06]: No backfill needed -- all 18 products already had does_not_solve populated (6-8 entries each)
- [Phase 06]: Product count is 18 (not 20) -- 2 GLP-1 products skipped; 153 unique pairs not 190
- [Phase 06]: 153 pairs enumerated in 15 category-pair batches; concern overlap SQL deferred to Plan 03; HydraFacial batched as Skin Care
- [Phase 07-timing-rules]: 22 nullable columns added across gl_products (11) and item_relationships (11) via ADD COLUMN IF NOT EXISTS — no existing data affected
- [Phase 07-timing-rules]: BoNT-A 85-day minimum retreatment floor used as safety floor for all 5 neurotoxins (sourced from PubMed HIGH, Monheit 2009)
- [Phase 07-timing-rules]: timing_warning_level CHECK constraint (hard_block/warning/education) added via idempotent DO block on item_relationships
- [Phase 06]: 5 canonical (Botox+each HA filler), 32 common, 51 conditional, 48 compatible_only, 17 do_not_market pairs -- all 153 evaluated with corpus evidence
- [Phase 06]: Category-level evidence inheritance: non-Botox neurotoxins get common tier (not canonical) despite identical mechanism -- product-specific corpus evidence is the differentiator
- [Phase 07-timing-rules]: 31 pair timing UPDATEs for item_relationships: 27 distinct canonical/common pairs with same-session, sequencing, safety, and downtime data
- [Phase 07-timing-rules]: Morpheus8 + HydraFacial: only explicit same_session_ok=false pair in manifest (open micro-channels + suction = infection risk)
- [Phase 07-timing-rules]: Hard blocks (hyaluronidase+HA, ablative laser+isotretinoin) are document-only -- products not in 18-product manifest

### Roadmap Evolution

- Phase 6 added: pairing-engine — 8-gate legitimacy test for product pairings

### Pending Todos

None yet.

### Blockers/Concerns

- AI_GATEWAY_API_KEY must be provisioned in .env.local for LLM generation to work (streamText will throw GatewayAuthenticationError; DB/UI parts unaffected)

## Session Continuity

Last session: 2026-06-13T21:26:26.863Z
Stopped at: Completed 07-02-PLAN.md
Resume file: None
