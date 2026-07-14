---
phase: 12-combination-fuel-documents
plan: 02
subsystem: combination-intelligence
tags: [combination-fuel, agent-content, staff-education, do-not-say, review-queue]
dependency_graph:
  requires: ["12-01"]
  provides: ["REVIEW_QUEUE/combination_fuel/*.md", "GENERATION_QC_REPORT.md"]
  affects: ["12-03-PLAN.md (review queue assembly)", "gl_agent_fuel_documents (population)"]
tech_stack:
  added: []
  patterns: ["canonical-combination-fuel-template-v1.0", "10-item-staff-language-checklist", "7-dimension-qc-gate"]
key_files:
  created:
    - REVIEW_QUEUE/combination_fuel/common_remaining_batch.md
    - REVIEW_QUEUE/combination_fuel/GENERATION_QC_REPORT.md
  modified: []
decisions:
  - "Evidence level weak (not emerging) used for all Sculptra combination pairs — FDA label combination caveat is the key disclosure, not a study gap that more research would close"
  - "SKINVIVE pairs set to weak evidence level — microdroplet HA is a distinct product category from volumizing fillers; BoNT-A + HA filler combination studies do not directly apply"
  - "Botox+Morpheus8 set to strong evidence level — DOI 10.1111/j.1524-4725.2005.31105 directly supports same-day RF + BoNT-A safety"
  - "Xeomin immunogenicity language consistently framed as provider consideration, never superiority claim — avoids clinical overclaiming while preserving the genuine differentiator"
metrics:
  duration: "multi-session (continuation execution)"
  completed_date: "2026-06-14"
  tasks_completed: 4
  files_created: 2
  files_modified: 0
---

# Phase 12 Plan 02: Combination Fuel Document Generation Summary

**One-liner:** 37 canonical combination fuel documents generated across 5 batch files with 7-dimension QC validation — all pairs grounded in review card data, staff-language checked, podcast-free, do-not-say populated.

## Tasks Completed

| Task | Name | Commit | Status |
|------|------|--------|--------|
| 1 | Generate 5 canonical pairs (Batch 1) | a7d99b3 | COMPLETE |
| 2 | Generate 9 common pairs (Batches 2-3) | a0abc39 | COMPLETE |
| 3 (Batch 4) | Generate 5 HA x Sculptra pairs | 0e25ed9 | COMPLETE |
| 3 (Batch 5) | Generate 18 remaining pairs | 4f73c1e | COMPLETE |
| 4 | Generate QC report | 30fc5f1 | COMPLETE |

## What Was Built

### 37 Combination Fuel Documents

Content grounded in 37 review cards from `REVIEW_QUEUE/pairings/`. Each document uses the canonical JSON template v1.0 with all required fields populated.

**Batch breakdown:**

| File | Pairs | Evidence Levels |
|------|-------|----------------|
| canonical_batch.md | 5 (Botox Cosmetic x Vollure/Voluma/Lyft/RHA/SKINVIVE) | 2 strong, 2 moderate, 1 weak |
| common_neurotoxin_sculptra_batch.md | 5 (all neurotoxins x Sculptra) | 5 weak |
| common_neurotoxin_skinvive_batch.md | 4 (Daxxify/Dysport/Jeuveau/Xeomin x SKINVIVE) | 4 weak |
| common_ha_sculptra_batch.md | 5 (Vollure/Voluma/Lyft/RHA/SKINVIVE x Sculptra) | 5 weak |
| common_remaining_batch.md | 18 (Daxxify-Xeomin x Vollure/Voluma/Lyft/RHA + Botox+Morpheus8 + Sculptra+Morpheus8) | 1 strong, 16 moderate, 1 weak |
| **Total** | **37** | **3 strong, 18 moderate, 16 weak** |

### QC Report

`REVIEW_QUEUE/combination_fuel/GENERATION_QC_REPORT.md` — 7-dimension analysis:
1. Uniqueness ratio: 100% unique clinical_rationale at product-pair level
2. Product name accuracy: 0 mismatches
3. Evidence specificity: all strong docs cited; all weak docs disclosed
4. Do-not-say completeness: 12-item universal + pair-specific on all 37
5. Staff language quality: 370/370 checklist points, 0 failures
6. Podcast contamination: 0 attributions
7. Template completeness: all required fields present

## Key Content Decisions

### Evidence Level Mapping
- **Strong** (3 pairs): Botox+Vollure, Botox+Voluma — specific PubMed DOI 10.2310/6350.2010.00029 supports HA + BoNT-A combination superiority. Botox+Morpheus8 — DOI 10.1111/j.1524-4725.2005.31105 supports RF + BoNT-A same-day safety.
- **Moderate** (18 pairs): All non-Botox neurotoxin x HA filler combinations — category-level PubMed evidence (DOI 10.1097/DSS.0000000000000754) applies; no product-specific pairing data.
- **Weak** (16 pairs): All Sculptra combinations (FDA label combination caveat), all SKINVIVE pairs (product category mismatch with BoNT-A + filler study population).

### Do-Not-Say Framework
Universal 12-item list applied identically to all 37 docs. Pair-specific items (3-5 per doc) address product category risks:
- Neurotoxin comparative claims: "Brand X is better than Brand Y" prohibited
- Sculptra: "proven combination" claims prohibited; FDA caveat must be disclosed
- Energy devices: "replaces surgery" language prohibited; downtime minimization prohibited
- SKINVIVE: describing it as a traditional volume filler prohibited

### Xeomin Immunogenicity Language
The "naked molecule" / "no complexing proteins" differentiator is present in all 4 Xeomin pairs. Language is consistently framed as "a consideration for providers evaluating long-term immunogenicity" — not as a superiority or safety claim. This reflects the FDA-approved labeling accurately without overstating clinical significance.

### FDA Sculptra Combination Caveat
Quoted directly from FDA label in all 11 Sculptra-containing docs: "The safety and effectiveness of SCULPTRA Aesthetic used in combination with other products and procedures have not been evaluated in controlled clinical trials." No minimization in any doc.

## Known Stubs

None. All 37 fuel documents are fully populated with substantive content. `last_reviewed` and `reviewed_by` fields are intentionally null — these are set by the human reviewer in Plan 12-03.

## Deviations from Plan

None — plan executed as written. All 37 pairs generated with canonical template, evidence correctly mapped, quality checked.

## Self-Check

Verified:
- `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` exists: YES (created, 1940+ lines)
- `REVIEW_QUEUE/combination_fuel/GENERATION_QC_REPORT.md` exists: YES (created)
- Total fuel docs: 5+5+4+5+18 = 37 (verified via grep count)
- Commits: 4f73c1e (batch 5), 30fc5f1 (QC report)
- No podcast attribution: verified via grep scan
- Do-not-say universal list: 12 items on all 37 (verified via grep count)

## Self-Check: PASSED
