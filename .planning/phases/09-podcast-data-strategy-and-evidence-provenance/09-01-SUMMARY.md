---
phase: 09-podcast-data-strategy-and-evidence-provenance
plan: "01"
subsystem: evidence-provenance
tags: [podcast-data, evidence-model, source-classification, contamination, workflow]
dependency_graph:
  requires: []
  provides: [EVIDENCE_MODEL.md, SOURCE_CLASSIFICATION.md, PODCAST_WORKFLOW.md]
  affects: [Phase 10 contamination audit, pairing SQL regeneration, all enrichment content]
tech_stack:
  added: []
  patterns: [two-layer evidence model, EC- anonymous identifier scheme, podcast-to-production workflow]
key_files:
  created:
    - .planning/phases/09-podcast-data-strategy-and-evidence-provenance/EVIDENCE_MODEL.md
    - .planning/phases/09-podcast-data-strategy-and-evidence-provenance/SOURCE_CLASSIFICATION.md
    - .planning/phases/09-podcast-data-strategy-and-evidence-provenance/PODCAST_WORKFLOW.md
  modified: []
decisions:
  - "EC- anonymous ID format chosen as EC-{12hex} using SHA-256 truncation — provides stable, deterministic identity for concepts without exposing podcast source"
  - "Expert consensus is production-citable without attribution as long as no specific podcast source is named — preserves podcast-discovered knowledge while removing attribution leakage"
  - "Source_reference field containing internal file paths (PHASE_6_ANSWERS_PODCAST_SOURCED.md) is classified as contamination — research artifacts are not evidence"
  - "Known contamination examples from 06-02-canonical-common-inserts.sql documented in EVIDENCE_MODEL.md Section 4 — gives Phase 10 concrete audit targets"
metrics:
  duration: "4 minutes"
  completed: "2026-06-14"
  tasks_completed: 2
  files_created: 3
---

# Phase 09 Plan 01: Podcast Data Strategy — Governing Documents Summary

**One-liner:** Two-layer evidence model (research=EC- anonymous IDs, production=PubMed/FDA/consensus) with 7-step podcast-to-production workflow and source classification matrix for contamination auditing.

---

## What Was Built

Three governing documents that define how podcast corpus data is safely used in the A360 Global Library:

### EVIDENCE_MODEL.md
- Defines the two-layer model: research layer (podcast-derived concepts with EC- anonymous IDs) vs production layer (PubMed, FDA, society guidance, expert consensus)
- Specifies the EC- identifier scheme: `EC-{12hex}` generated via SHA-256 truncation of normalized concept text
- Documents every production-facing field in `item_relationships` and `agent_reference_docs` with explicit allowed/forbidden content rules
- Provides an auditable contamination definition with 8 contamination patterns and concrete examples from the deferred 06-02 SQL file

### SOURCE_CLASSIFICATION.md
- Matrix of 10 source types classified as production-citable or research-only
- Decision tree: PubMed/FDA/society → production-citable; podcast/conference/webinar/YouTube → research-only
- Per-source rationale explaining WHY each classification was made
- Field-level table showing which sources can appear in `evidence_links.url`, `source_reference`, and production prose

### PODCAST_WORKFLOW.md
- 7-step workflow from corpus mining to production content creation
- Step 3 provides the critical BAD (quote) vs GOOD (idea) transformation with explicit examples
- End-to-end example: Sculptra + Botox pairing, corpus hit → EC-a8f3c2e19b74 → PMID 29876543 → production-safe clinical_rationale
- Anti-patterns section explicitly addresses the 06-02 SQL contamination patterns (speaker names in source_reference, "podcast experts", episode UUIDs)
- Quick-reference card summarizing all 7 steps

---

## Requirements Completed

- **POD-01**: Two-layer evidence model formally defined in EVIDENCE_MODEL.md
- **POD-02**: EC- anonymous identifier scheme documented with SHA-256 generation method
- **POD-03**: 7-step workflow documented in PODCAST_WORKFLOW.md with end-to-end example and anti-patterns
- **EVID-02**: Source classification matrix in SOURCE_CLASSIFICATION.md distinguishing research-only from production-citable

---

## Deviations from Plan

None — plan executed exactly as written.

The `source_classification` cross-reference pattern check in verification returned 0 (the grep looked for lowercase `source_classification` but EVIDENCE_MODEL.md references it as `SOURCE_CLASSIFICATION.md` — the link exists at lines 64 and 179). All substantive verification checks passed.

---

## Known Contamination Examples (Documented for Phase 10)

The following patterns were found in `06-02-canonical-common-inserts.sql` and documented in EVIDENCE_MODEL.md Section 4 as the canonical contamination examples Phase 10 must remediate:

1. `clinical_rationale`: "multiple podcast experts endorse same-session administration" (pair #1)
2. `clinical_rationale`: "expert consensus across 8+ podcast shows" (pair #2)
3. `source_reference`: "PHASE_6_ANSWERS_PODCAST_SOURCED.md: 90-woman dose-ranging study (episode b2b96f9e), Dr. Teri Fisher BoNT-A synergy, Tracy Mancuso stacking protocol" (pairs #1, #2)

Phase 10 (POD-04, PAIR-01) will audit all 37 review cards and the deferred SQL using these documented definitions.

---

## Commits

| Task | Commit | Files |
|------|--------|-------|
| Task 1: Two-layer model + source classification | 26b1ec9 | EVIDENCE_MODEL.md, SOURCE_CLASSIFICATION.md |
| Task 2: Podcast workflow | 3a82ff0 | PODCAST_WORKFLOW.md |

## Self-Check: PASSED

- EVIDENCE_MODEL.md exists and contains research_layer, EC-, contamination definition, SOURCE_CLASSIFICATION.md reference
- SOURCE_CLASSIFICATION.md exists and contains production-citable matrix and research-only rows
- PODCAST_WORKFLOW.md exists with Step 1-7, Anti-Patterns, match_podcast_chunks reference, BAD/GOOD example
- Commits 26b1ec9 and 3a82ff0 verified in git log
