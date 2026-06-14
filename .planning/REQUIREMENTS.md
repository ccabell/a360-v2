# Requirements: A360 Global Library

**Defined:** 2026-06-14
**Core Value:** OpenEvidence for aesthetic medicine — every clinical claim backed by cited, linkable data

## v1.1 Requirements

Quality gate before resuming Phase 11+ content build. Fix the foundation.

### Validation & Testing

- [ ] **VAL-01**: Every completed phase (1-7) has a validation SQL file that asserts expected row counts, checks for NULL violations, and flags orphan records — returns PASS/FAIL
- [ ] **VAL-02**: Batch content generation includes a post-generation QC gate checking uniqueness ratio (>80%), product name accuracy (0 mismatches), and evidence specificity
- [ ] **VAL-03**: Validation can be run idempotently against live Supabase to verify current state matches expected state

### Execution Pipeline

- [x] **EXEC-01**: A single manifest file lists all SQL files in dependency order with status (pending/applied/verified) and phase association
- [x] **EXEC-02**: Manifest includes pre-execution checklist (schema dependencies, required prior files) and post-execution verification queries
- [x] **EXEC-03**: SQL files that are out of sync with their source artifacts (review cards, research specs) are flagged in the manifest

### Podcast Data Strategy

- [ ] **POD-01**: Two-layer evidence model defined and documented: research layer (podcast IDEAS/CONCEPTS with anonymous hash identifiers) and production layer (PubMed, FDA, society guidance, expert consensus)
- [ ] **POD-02**: Anonymous identifier scheme implemented — podcast-derived knowledge referenced by content hash or concept ID, no speaker names, show names, or episode IDs in any production-facing field
- [ ] **POD-03**: Workflow documented: podcast -> discover idea -> find PubMed/published backup -> save both layers
- [ ] **POD-04**: All existing SQL files and review cards audited for podcast contamination in production fields (rationale, patient_education, staff_talking_points, evidence_notes)

### Pairing Reconciliation

- [ ] **PAIR-01**: 06-02-canonical-common-inserts.sql regenerated from Chris's reviewed/approved pairing cards with no raw podcast references
- [ ] **PAIR-02**: Sculptra pair tier decisions re-evaluated against Chris's actual feedback — was the previous session's aggressive downgrading correct or overcorrection?
- [ ] **PAIR-03**: All 37 review cards confirmed clean of podcast attribution (speaker, show, episode) in production fields while preserving podcast-derived IDEAS

### Evidence Provenance

- [ ] **EVID-01**: 36 PubMed evidence_links rows with NULL url backfilled using DOI
- [ ] **EVID-02**: Source classification documented — which sources are research-only (podcast, conference, webinar) vs production-citable (PubMed, FDA, society, expert consensus)
- [ ] **EVID-03**: Phase 3 plan 03-04 (live UI verification) completed — unscripted question renders real citations

## v2 Requirements (Deferred — Phase 11-13)

### Combination Intelligence (Phase 11)

- **COMBO-01**: Every canonical pairing has reviewed combination content in agent_fuel_documents
- **COMBO-02**: Combination content passes "would trained staff actually say this" test
- **COMBO-03**: Do-not-say lists defined for every canonical/common pairing

### Care Plan Modules (Phase 12)

- **CARE-01**: Top ~10 concern clusters each have a reviewable care-plan module
- **CARE-02**: Care plans use 3-phase model (Foundation/Correction/Maintenance)
- **CARE-03**: Essential/Enhanced/Comprehensive budget tiers defined

### Agent Fuel Compilation (Phase 13)

- **FUEL-01**: Every published entity has a current, versioned fuel packet
- **FUEL-02**: Runtime agents retrieve one packet + optionally one evidence pack
- **FUEL-03**: Recompile triggers defined (source change -> packet rebuild)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Shadow-run pattern (transaction rollback testing) | Nice-to-have but adds complexity; validation files achieve 80% of the value |
| Automated CI gate on SQL merge | No CI pipeline exists; manual validation is sufficient for current scale |
| Phase 14+ (governance, RLS, services, catalog) | Post-Phase-13; not in current planning horizon |
| Regional legal configuration (France restriction) | Separate feature; not a data quality issue |
| Rejuran pair rules | Product not in 18-product manifest; document-only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| VAL-01 | Phase 08 | Pending |
| VAL-02 | Phase 08 | Pending |
| VAL-03 | Phase 08 | Pending |
| EXEC-01 | Phase 08 | Complete |
| EXEC-02 | Phase 08 | Complete |
| EXEC-03 | Phase 08 | Complete |
| POD-01 | Phase 09 | Pending |
| POD-02 | Phase 09 | Pending |
| POD-03 | Phase 09 | Pending |
| EVID-01 | Phase 09 | Pending |
| EVID-02 | Phase 09 | Pending |
| EVID-03 | Phase 09 | Pending |
| POD-04 | Phase 10 | Pending |
| PAIR-01 | Phase 10 | Pending |
| PAIR-02 | Phase 10 | Pending |
| PAIR-03 | Phase 10 | Pending |

**Coverage:**
- v1.1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0

---
*Requirements defined: 2026-06-14*
*Last updated: 2026-06-14 — traceability populated after roadmap creation*
