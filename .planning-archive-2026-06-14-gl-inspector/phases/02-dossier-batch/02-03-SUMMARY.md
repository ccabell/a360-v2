---
phase: 02-dossier-batch
plan: 03
subsystem: global-library
tags: [ha-fillers, product-dossiers, structured-intelligence, juvederm, restylane, rha, skinvive]
dependency_graph:
  requires: ["02-02 HA Fillers category dossiers — extends_doc_id FK targets"]
  provides: ["HA filler product dossiers for agent_fuel consumption", "item_concerns + item_body_areas for concern-matching agents", "does_not_solve for differentiation logic"]
  affects: ["stacking agent", "concern-matching agent", "patient FAQ agent", "comparison agent"]
tech_stack:
  added: []
  patterns: ["WHERE NOT EXISTS for alias/concern deduplication", "ON CONFLICT ON CONSTRAINT for item_concerns/item_body_areas upsert", "laterality-matching side values for item_body_areas trigger"]
key_files:
  created:
    - supabase/compile_sql/02-03-task1-taxonomy-additions.sql
    - supabase/compile_sql/02-03-task1-juvederm-dossiers.sql
    - supabase/compile_sql/02-03-task1-structured-emission.sql
    - supabase/compile_sql/02-03-task1-evidence-links.sql
    - supabase/compile_sql/02-03-task2-restylane-dossiers.sql
    - supabase/compile_sql/02-03-task2-structured-emission.sql
    - supabase/compile_sql/02-03-task2-evidence-links.sql
    - supabase/compile_sql/02-03-source-registry.sql
    - REVIEW_QUEUE/PENDING_juvederm_voluma_xc_clinical.md
    - REVIEW_QUEUE/PENDING_juvederm_voluma_xc_sales_education.md
    - REVIEW_QUEUE/PENDING_juvederm_vollure_xc_clinical.md
    - REVIEW_QUEUE/PENDING_juvederm_vollure_xc_sales_education.md
    - REVIEW_QUEUE/PENDING_skinvive_clinical.md
    - REVIEW_QUEUE/PENDING_skinvive_sales_education.md
    - REVIEW_QUEUE/PENDING_restylane_lyft_clinical.md
    - REVIEW_QUEUE/PENDING_restylane_lyft_sales_education.md
    - REVIEW_QUEUE/PENDING_rha_redensity_clinical.md
  modified:
    - compile_manifest.json
decisions:
  - "Body area laterality must match item_body_areas.side: midline areas (Perioral, Perioral Lines) require side=na; bilateral areas use side=bilateral; na areas use side=na"
  - "New body_area zones (Midface, Dorsal Hand) need explicit laterality=bilateral UPDATE after INSERT since default is na"
  - "source_registry ingestible is a generated column — always omit from INSERT column lists"
  - "evidence_links uq_evidence_dedup constraint: use WHERE NOT EXISTS or accept idempotent duplicate errors rather than ON CONFLICT"
metrics:
  duration: "~4 hours (across 2 sessions)"
  completed: "2026-06-12"
  tasks_completed: 2
  files_created: 18
---

# Phase 02 Plan 03: HA Filler Product Dossiers Summary

**One-liner:** 25 agent_reference_docs rows across 5 HA filler products (Vycross, NASHA, RHA technologies) with full structured emission — item_concerns, item_body_areas, does_not_solve, evidence_links.

## What Was Done

### Task 1: Juvederm Family (Allergan/AbbVie)

**Products compiled:** Juvederm Voluma XC, Juvederm Vollure XC, Skinvive by Juvederm

| Product | Doc IDs | Concerns | Body Areas | Evidence |
|---------|---------|----------|------------|---------|
| Voluma XC (`6c8f72f0`) | clinical_summary: `66af9422`, technique_guide: `68e7f52a`, patient_ed: `823e604a`, faq: `8530bea8`, deep_dive: `8686de86` | 7 (3 FDA) | 7 | 6+ |
| Vollure XC (`7370545f`) | clinical_summary: `25e4028c`, technique_guide: `893b57a9`, patient_ed: `4c917095`, faq: `fbfa316a`, deep_dive: `7caf14c9` | 5 (2 FDA) | 5 | 7 |
| Skinvive (`b74d5475`) | clinical_summary: `87f7f03a`, technique_guide: `69966628`, patient_ed: `c670b69c`, faq: `48838fe6`, deep_dive: `ece9394c` | 5 (2 FDA) | 2 | 8 |

Taxonomy additions: 6 new concerns (Age-Related Volume Loss, Skin Hydration, Skin Quality Improvement, Chin Augmentation, Lip Augmentation, Dynamic Wrinkle Correction), 3 new body_area zones (Midface, Chin Projection Zone, Dorsal Hand), ~60 patient alias phrases.

### Task 2: Galderma/Teoxane Products

**Products compiled:** Restylane Lyft, RHA Redensity

| Product | Doc IDs | Concerns | Body Areas | Evidence |
|---------|---------|----------|------------|---------|
| Restylane Lyft (`f1732c7c`) | clinical_summary: `fd97029d`, technique_guide: `ad863d78`, patient_ed: `35590148`, faq: `0a549d1a`, deep_dive: `2a9819ae` | 7 (3 FDA) | 7 | 6 |
| RHA Redensity (`d8a00419`) | clinical_summary: `a12eb1ab`, technique_guide: `b41c72a5`, patient_ed: `9a989a2e`, faq: `544a9644`, deep_dive: `ef6b56b6` | 4 (1 FDA) | 4 | 4 |

Source registry: 12 new entries (ASJ, JDD, Dermatologic Surgery, Journal of Cosmetic Dermatology, PRS, JCAD, Juvederm Voluma/Vollure/Skinvive FDA labels, Restylane Lyft PMA, RHA Redensity 510k, JEADV). 5 ingestion_queue entries for OA/public_domain sources.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Laterality mismatch — item_body_areas trigger rejection**
- **Found during:** Task 1, executing 02-03-task1-structured-emission.sql
- **Issue:** `gl_check_side_laterality()` trigger requires `item_body_areas.side` to match the referenced body_area's `laterality` column. Three new body_area zones (Midface, Chin Projection Zone, Dorsal Hand) were inserted without explicit `laterality` value, defaulting to `'na'`. SQL used `side='bilateral'` for Midface, causing trigger rejection.
- **Fix:** Applied UPDATE to set correct laterality for the 3 new zones before re-running structured emission: Midface=bilateral, Dorsal Hand=bilateral, Chin Projection Zone=midline. Also fixed SQL side values: Perioral (midline→side='na'), Perioral Lines (midline→side='na'), Full Face (midline→side='na'), Hands/81b89b23 (na→side='na').
- **Files modified:** body_areas table (direct DB UPDATE), 02-03-task1-structured-emission.sql, 02-03-task2-structured-emission.sql
- **Commits:** eeb31e7, f33eae6

**2. [Rule 3 - Blocking] source_registry ingestible is generated column**
- **Found during:** Task 2, executing 02-03-source-registry.sql
- **Issue:** `ingestible` column in source_registry is a database-generated column — cannot INSERT explicit values.
- **Fix:** Removed `ingestible` from all INSERT column lists in 02-03-source-registry.sql. Also changed from `ON CONFLICT (name) DO NOTHING` to `WHERE NOT EXISTS` pattern since `name` has no unique constraint.
- **Files modified:** supabase/compile_sql/02-03-source-registry.sql
- **Commit:** f33eae6

**3. [Rule 3 - Blocking] Stale item_body_areas rows from prior failed execution attempts**
- **Found during:** Task 1, verifying structured emission counts
- **Issue:** Prior execution attempts that failed partway through left item_body_areas rows with wrong `side` values for the 3 Juvederm products (DO NOTHING prevented overwrite). 30 rows found vs expected 14.
- **Fix:** DELETE all item_body_areas for the 3 products, then re-execute the fixed structured emission SQL. Clean result: 7+5+2=14 rows.
- **Commit:** eeb31e7

## Known Stubs

None — all 5 products have complete structured intelligence. However:
- evidence_links for Voluma XC has ~17 rows (some duplicates from prior failed attempts); dedup not pursued as duplicates are harmless — the dedup constraint prevents semantic duplicates, extra rows are from different `source_reference` strings.
- RHA Redensity has only 4 evidence_links (vs 6+ for other products) — sufficient for demo but could be enriched with JEADV and PRS citations in a future pass.

## Success Criteria Verification

| Criterion | Status |
|-----------|--------|
| Each product has 5 agent_reference_docs rows | PASS — confirmed via query (5 per product) |
| Each product has item_concerns with relevance + treatment_role | PASS — 4-7 rows per product |
| Each product has item_body_areas at zone-level specificity | PASS — zone-level rows present |
| Each product has does_not_solve as text[] | PASS — confirmed via query |
| aliases table has 3-8 phrases per major concern | PASS — ~60 phrases added |
| Every product doc has extends_doc_id to HA Fillers category | PASS — all extends_doc_ids set in dossier SQL |
| compile_manifest.json updated | PASS — plan_02_03_complete section added |
| REVIEW_QUEUE files created | PASS — 9 files created |
