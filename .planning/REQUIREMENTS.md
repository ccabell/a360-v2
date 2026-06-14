# Requirements: A360 Global Library

**Defined:** 2026-06-14
**Core Value:** OpenEvidence for aesthetic medicine — every clinical claim backed by cited, linkable data

## v1.1 Requirements

Quality gate before resuming Phase 11+ content build. Fix the foundation.

### Validation & Testing

- [x] **VAL-01**: Every completed phase (1-7) has a validation SQL file that asserts expected row counts, checks for NULL violations, and flags orphan records — returns PASS/FAIL
- [x] **VAL-02**: Batch content generation includes a post-generation QC gate checking uniqueness ratio (>80%), product name accuracy (0 mismatches), and evidence specificity
- [x] **VAL-03**: Validation can be run idempotently against live Supabase to verify current state matches expected state

### Execution Pipeline

- [x] **EXEC-01**: A single manifest file lists all SQL files in dependency order with status (pending/applied/verified) and phase association
- [x] **EXEC-02**: Manifest includes pre-execution checklist (schema dependencies, required prior files) and post-execution verification queries
- [x] **EXEC-03**: SQL files that are out of sync with their source artifacts (review cards, research specs) are flagged in the manifest

### Podcast Data Strategy

- [x] **POD-01**: Two-layer evidence model defined and documented: research layer (podcast IDEAS/CONCEPTS with anonymous hash identifiers) and production layer (PubMed, FDA, society guidance, expert consensus)
- [x] **POD-02**: Anonymous identifier scheme implemented — podcast-derived knowledge referenced by content hash or concept ID, no speaker names, show names, or episode IDs in any production-facing field
- [x] **POD-03**: Workflow documented: podcast -> discover idea -> find PubMed/published backup -> save both layers
- [x] **POD-04**: All existing SQL files and review cards audited for podcast contamination in production fields (rationale, patient_education, staff_talking_points, evidence_notes)

### Pairing Reconciliation

- [x] **PAIR-01**: 06-02-canonical-common-inserts.sql regenerated from Chris's reviewed/approved pairing cards with no raw podcast references
- [x] **PAIR-02**: Sculptra pair tier decisions re-evaluated against Chris's actual feedback — was the previous session's aggressive downgrading correct or overcorrection?
- [x] **PAIR-03**: All 37 review cards confirmed clean of podcast attribution (speaker, show, episode) in production fields while preserving podcast-derived IDEAS

### Evidence Provenance

- [x] **EVID-01**: 36 PubMed evidence_links rows with NULL url backfilled using DOI
- [x] **EVID-02**: Source classification documented — which sources are research-only (podcast, conference, webinar) vs production-citable (PubMed, FDA, society, expert consensus)
- [ ] **EVID-03**: Phase 3 plan 03-04 (live UI verification) completed — unscripted question renders real citations *(Deferred — not tested, no API key provisioned)*

## v1.2 Requirements — Evidence Sources & Agent Fuel

**Architecture principle:** Sources and fuel are separate concepts. Sources are raw authoritative material searchable in vector DBs. Fuel is curated agent-ready intelligence derived from sources. Agents use tools at runtime to search sources for edge cases beyond fuel doc coverage. Framework supports ongoing enrichment.

### Source Framework (Phase 11)

- [x] **SRCE-01**: Source types classified with practical guidance on what each is good for (FDA=safety/dosing, PubMed=clinical evidence, manufacturer=product education, industry=context/trends, podcasts=research only)
- [x] **SRCE-02**: Citation format defined per source type (PubMed: PMID/DOI, YouTube: URL+timestamp, IFU: page reference)
- [x] **SRCE-03**: Enrichment pipeline documented as repeatable loop — add source, classify, chunk, vector DB, mark affected fuel docs for review
- [x] **SRCE-04**: Manufacturer data accessible and searchable for agent tools at runtime
- [ ] **CFRW-01**: All v1.1 carry-forward items resolved (PAIR-01, EVID-03, TIMING_REVIEW.md, SQL manifest) *(Partial — PAIR-01 complete; EVID-03, TIMING_REVIEW, SQL execution all deferred)*

### Combination Fuel Documents (Phase 12)

- [ ] **COMBO-01**: Every canonical/common pairing has enriched fuel doc with corpus-grounded content
- [ ] **COMBO-02**: Content sounds like what trained staff would actually say — education tone, not sales pitch
- [ ] **COMBO-03**: What-not-to-say populated for every combination
- [ ] **COMBO-04**: Fuel doc schema supports practice-level overrides (gl_*/pl_* COALESCE pattern)
- [ ] **COMBO-05**: Unified JSON format across all fuel docs (2 existing formats reconciled)

### Concern Fuel Documents (Phase 13)

- [ ] **CARE-01**: 10 concern clusters each have a fuel doc with treatment arc
- [ ] **CARE-02**: Treatment arcs grounded in corpus evidence, not LLM-invented
- [ ] **CARE-03**: Documents reference Phase 12 combination fuel where applicable
- [ ] **CARE-04**: In-scope and out-of-scope treatment boundaries defined per concern

### Compiled Fuel Packets (Phase 14)

- [ ] **FUEL-01**: Every enriched entity has a versioned fuel packet
- [ ] **FUEL-02**: Single-packet retrieval pattern (one packet + optional evidence pack)
- [ ] **FUEL-03**: Recompile triggers defined (new source or fuel update marks packet stale)
- [ ] **FUEL-04**: All packets within 2-5K token budget (hybrid JSON metadata + markdown prose)
- [ ] **FUEL-05**: Framework allows recompilation as new data enters the system

## Out of Scope

| Feature | Reason |
|---------|--------|
| Evidence Ask product surface (/ask, /embed/ask) | Separate workstream — not GL content intelligence |
| Package architecture / tier models / Full Face Refresh framework | Premature; build fuel data first, frameworks can emerge later |
| Practice fuel doc editing UI | Post-v1.2; practice-override STRUCTURE built now, UI later |
| Shadow-run pattern (transaction rollback testing) | Validation files achieve 80% of the value |
| Automated CI gate on SQL merge | No CI pipeline; manual validation sufficient |
| Phase 15+ (governance, RLS, services, catalog) | Post-v1.2 planning horizon |
| Regional legal configuration (France restriction) | Separate feature |
| Rejuran pair rules | Product not in 18-product manifest |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| VAL-01 | Phase 08 | Complete |
| VAL-02 | Phase 08 | Complete |
| VAL-03 | Phase 08 | Complete |
| EXEC-01 | Phase 08 | Complete |
| EXEC-02 | Phase 08 | Complete |
| EXEC-03 | Phase 08 | Complete |
| POD-01 | Phase 09 | Complete |
| POD-02 | Phase 09 | Complete |
| POD-03 | Phase 09 | Complete |
| EVID-01 | Phase 09 | Complete |
| EVID-02 | Phase 09 | Complete |
| EVID-03 | Phase 09 | Deferred |
| POD-04 | Phase 10 | Complete |
| PAIR-01 | Phase 10 | Complete |
| PAIR-02 | Phase 10 | Complete |
| PAIR-03 | Phase 10 | Complete |
| SRCE-01 | Phase 11 | Complete |
| SRCE-02 | Phase 11 | Complete |
| SRCE-03 | Phase 11 | Complete |
| SRCE-04 | Phase 11 | Complete |
| CFRW-01 | Phase 11 | Partial |
| COMBO-01 | Phase 12 | Pending |
| COMBO-02 | Phase 12 | Pending |
| COMBO-03 | Phase 12 | Pending |
| COMBO-04 | Phase 12 | Pending |
| COMBO-05 | Phase 12 | Pending |
| CARE-01 | Phase 13 | Pending |
| CARE-02 | Phase 13 | Pending |
| CARE-03 | Phase 13 | Pending |
| CARE-04 | Phase 13 | Pending |
| FUEL-01 | Phase 14 | Pending |
| FUEL-02 | Phase 14 | Pending |
| FUEL-03 | Phase 14 | Pending |
| FUEL-04 | Phase 14 | Pending |
| FUEL-05 | Phase 14 | Pending |

**Coverage:**
- v1.1 requirements: 16 total (14 complete, 1 deferred carry-forward, 1 pending carry-forward)
- v1.2 requirements: 19 total
- All mapped to phases
- Unmapped: 0

---
*Requirements defined: 2026-06-14*
*Last updated: 2026-06-14 — CFRW-01 partial close-out; EVID-03/TIMING_REVIEW/SQL deferred*
