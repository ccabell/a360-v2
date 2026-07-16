---
phase: 07-timing-rules
plan: "02"
subsystem: database-timing-data
tags: [timing-rules, pair-timing, item_relationships, safety, sequencing, documentation]
dependency_graph:
  requires: [07-01]
  provides: [pair-timing-data, timing-evaluation, timing-review]
  affects: [item_relationships]
tech_stack:
  added: []
  patterns: [UPDATE WHERE item_a_id/item_b_id, OR-direction pair matching, idempotent re-run]
key_files:
  created:
    - supabase/compile_sql/07-03-pair-timing.sql
    - .planning/phases/07-timing-rules/TIMING_EVALUATION.md
    - .planning/phases/07-timing-rules/TIMING_REVIEW.md
  modified: []
decisions:
  - "31 UPDATE statements cover ~27 distinct pairs with explicit timing rules (remaining 124+ pairs default YES per D-1)"
  - "Morpheus8 + HydraFacial is the only explicit same_session_ok=false pair in the manifest"
  - "CoolSculpting + Kybella flagged safety_critical=true / warning (same anatomical area risk)"
  - "Sculptra → HA Filler sequencing (3 pairs): staging_required=true, Sculptra first, 0-56 day interval"
  - "BoNT-A → Energy Device preferred sequencing (3 pairs): toxin first or concurrent, 0-7 days (Zimbler 2001 HIGH)"
  - "Filler + RF/laser expert disagreement classified as education-level (not warning) — no evidence of harm"
  - "Hard blocks (hyaluronidase+HA, ablative laser+isotretinoin) are out-of-manifest — document-only in TIMING_EVALUATION.md"
  - "PRP downtime-reduction effect cannot be schema-captured (PRP not in 18-product manifest)"
metrics:
  duration_seconds: 466
  completed_date: "2026-06-13"
  tasks_completed: 2
  files_created: 3
  files_modified: 0
---

# Phase 07 Plan 02: Pair Timing Data and Evaluation Documentation — Summary

## One-Liner

31-statement pair timing SQL for ~27 canonical/common item_relationships rows covering same-session, sequencing, safety, and combined downtime data, plus full timing rule inventory (TIMING_EVALUATION.md) and 7-item Chris review document (TIMING_REVIEW.md).

## What Was Built

### Task 1: Pair Timing UPDATE SQL (07-03-pair-timing.sql)

31 UPDATE statements organized in 9 sections, targeting existing item_relationships rows by item_a_id + item_b_id pair:

| Section | Pairs Covered | Key Data Set |
|---------|:-:|-------------|
| 1: Neurotoxin + HA Filler | 10 | same_session_ok=true, PubMed HIGH evidence, combined downtime notes |
| 2: Neurotoxin + Sculptra | 2 | same_session_ok=true, complementary timelines noted |
| 3: Neurotoxin + Energy Device | 4 | same_session_ok=true, sequencing preference (toxin first 0-7 days) |
| 4: HA Filler + Sculptra | 3 | staging_required=true, Sculptra first, 0-56 day interval |
| 5: HA Filler + Morpheus8 | 3 | same_session_ok=true, education note on expert disagreement |
| 6: Sculptra + Morpheus8 | 1 | same_session_ok=true, synergistic fibroblast stimulation |
| 7: Energy device sequencing | 2 | staging_required=true, Sofwave and Spectra with toxin |
| 8: Safety-critical pairs | 3 | CoolSculpting+Kybella (warning), Morpheus8+Spectra, Morpheus8+Sofwave |
| 9: HydraFacial combinations | 3 | Botox+HydraFacial (YES), Sculptra+HydraFacial (YES), Morpheus8+HydraFacial (NO, warning) |

**Safety-critical rows:** 4 pairs with safety_critical=true
**Staging required:** 11 pairs with staging_required=true
**Explicit YES:** 27 pairs | **Explicit NO:** 1 pair (Morpheus8 + HydraFacial)
**Default YES (remaining ~124 pairs):** Unset same_session_ok = default YES per D-1

File header explains Phase 6 dependency and re-run safety. OR-direction WHERE clauses handle alphabetical pair direction uncertainty. Verification SELECT query at end.

### Task 2: Timing Documentation

**TIMING_EVALUATION.md:**
- 18-product cadence rules table (all manifest products, all 11 fields per product)
- 29-pair timing rules table with staging/safety/evidence columns
- Same-session compatibility summary (default posture explained)
- 5 sequencing rules summary with interval and rationale
- 34-rule safety inventory (in-schema vs document-only flagging)
- 6 evidence gaps documented (body contouring, PRP, regional legal, combined downtime)
- 8 deferred items with target phase (Phase 9 and Phase 10)
- 5 conflicts between expert practice and published evidence, with classification

**TIMING_REVIEW.md:**
- 7 numbered decision items with current implementation + evidence + APPROVED/OVERRIDE checkboxes
- Items cover: default same-session posture, 50U toxin warning, France prohibition, downtime framing, filler+laser classification, body contouring evidence scope, schema completeness
- 3 pair-specific safety reviews: Rejuran (out-of-manifest), France legal (out-of-scope), Morpheus8+HydraFacial (in-schema warning)
- Execution checklist with SQL run order and Phase 6 re-run reminder

## Commits

| Task | Commit | Files |
|------|--------|-------|
| Task 1: Pair timing SQL | bb26697 | supabase/compile_sql/07-03-pair-timing.sql |
| Task 2: Documentation | 13c0f66 | .planning/phases/07-timing-rules/TIMING_EVALUATION.md, TIMING_REVIEW.md |

## Deviations from Plan

### Auto-handled Issues

**1. [Rule 1 - Deviation from plan description] OR-direction WHERE clauses added**
- **Found during:** Task 1
- **Issue:** The plan specified pairs using alphabetical ordering, but Phase 6 execution direction (item_a vs item_b) is not confirmed until Phase 6 Plans 02-05 complete.
- **Fix:** Added `(item_a_id = X AND item_b_id = Y) OR (item_a_id = Y AND item_b_id = X)` on all pair UPDATE WHERE clauses. File header documents re-run safety after Phase 6 completes.
- **Impact:** Zero data risk. Updates are idempotent. No SQL acceptance criteria violated.

**2. [Rule 1 - Content scoping] Hard blocks are product-level / out-of-manifest**
- **Found during:** Task 1 planning
- **Issue:** Plan section "Hard blocks (~3-4)" referenced hyaluronidase + HA and ablative laser + isotretinoin. Neither hyaluronidase nor ablative laser is in the 18-product manifest.
- **Fix:** Documented these rules in TIMING_EVALUATION.md safety inventory as "document-only" with "In Schema? = NO." Acceptance criteria still met via other safety_critical=true rows (CoolSculpting+Kybella warning, Morpheus8+HydraFacial warning).
- **Commit:** 13c0f66

**3. [Rule 1 - Content scoping] PRP downtime-reduction finding documented only**
- **Found during:** Task 1 Section 9
- **Issue:** Plan specified "PRP + RF microneedling → downtime REDUCED (PRP accelerates healing)" for combined_downtime_note. PRP is not in the 18-product manifest.
- **Fix:** Documented in TIMING_EVALUATION.md Evidence Gaps section. Comment added in SQL Section 9 header explaining why the PRP special case cannot be applied to a pair row.
- **Commit:** bb26697

## Known Stubs

None. All SQL UPDATE statements are complete with full field populations where data exists. Documentation files provide complete coverage of all 34 timing rules and all 18 products.

## Self-Check: PASSED

- supabase/compile_sql/07-03-pair-timing.sql: created, 31 UPDATE item_relationships SET — FOUND
- .planning/phases/07-timing-rules/TIMING_EVALUATION.md: created — FOUND
- .planning/phases/07-timing-rules/TIMING_REVIEW.md: created — FOUND
- Commit bb26697 — FOUND
- Commit 13c0f66 — FOUND
- 31 UPDATE statements (>= 15 required) — VERIFIED
- 4 safety_critical = true rows — VERIFIED
- 11 staging_required = true rows — VERIFIED
- 7 numbered review items in TIMING_REVIEW.md — VERIFIED
- No "podcast" in SQL string literals — VERIFIED
- No "podcast" in documentation source attributions — VERIFIED
- Rejuran review item in TIMING_REVIEW.md — VERIFIED
- France review item in TIMING_REVIEW.md — VERIFIED
- Verification SELECT query at end of 07-03-pair-timing.sql — VERIFIED
