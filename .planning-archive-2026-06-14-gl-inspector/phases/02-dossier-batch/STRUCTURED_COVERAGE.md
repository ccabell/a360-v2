# Structured Intelligence Coverage Report — Phase 02 Dossier Batch

**Generated:** 2026-06-12 (updated by plan 02-06)
**Supabase project:** aejskvmpembryunnbgrk
**Plans contributing data:** 02-01 through 02-05

---

## Summary Totals

| Metric | Count |
|--------|-------|
| Products in batch scope | 19 (17 compiled + 2 skipped GLP-1) |
| Products with agent_reference_docs in live DB (draft) | 6 (Botox + 5 HA fillers from 02-03) |
| Products with SQL compiled but not yet executed | 12 (02-04 + 02-05 products) |
| item_concerns rows (live DB) | 98 |
| item_body_areas rows (live DB) | 170 |
| Total aliases (cumulative) | 353 (was 286 pre-batch; +67 net) |
| FDA-indicated concern rows with orphaned evidence | **0 — VALIDATION PASS** |

---

## Per-Product Coverage Table (Live DB)

> Columns drawn from live Supabase queries executed 2026-06-12. "Docs in DB" = agent_reference_docs rows at status=draft or active for the product's offering_id.

| Product | item_concerns | FDA-indicated | item_body_areas | Zone-level | does_not_solve | Docs in DB |
|---------|:---:|:---:|:---:|:---:|:---:|:---:|
| Botox Cosmetic | 10 | — | 12 | 11 | 8 entries | 5 |
| Juvederm Voluma XC | 8 | 3 | 7 | 3 | 7 entries | 5 |
| Juvederm Vollure XC | 5 | 2 | 5 | 2 | 6 entries | 5 |
| SKINVIVE by Juvederm | 5 | 2 | 2 | 0 | 7 entries | 5 |
| Restylane Lyft | 7 | 4 | 7 | 3 | 6 entries | 5 |
| RHA Redensity | 4 | 1 | 4 | 2 | 7 entries | 5 |
| Sculptra Aesthetic | 5 | — | 14 | 4 | NULL* | 0* |
| Kybella | 1 | — | 1 | 1 | NULL* | 0* |
| Dysport | 8 | — | 12 | 11 | NULL* | 0* |
| CoolSculpting Elite | — | — | — | — | NULL* | 0* |
| InMode Morpheus8 | — | — | — | — | NULL* | 0* |
| Sofwave | — | — | — | — | NULL* | 0* |
| Merz Ultherapy PRIME | — | — | — | — | NULL* | 0* |
| Lutronic Hollywood Spectra | — | — | — | — | NULL* | 0* |
| HydraFacial Syndeo | — | — | — | — | NULL* | 0* |
| Jeuveau | — | — | — | — | NULL* | 0* |
| Daxxify | — | — | — | — | NULL* | 0* |
| Xeomin | — | — | — | — | NULL* | 0* |
| Semaglutide | skipped | — | skipped | — | — | 0 |
| Tirzepatide | skipped | — | skipped | — | — | 0 |

> *NULL / 0* = SQL files written and committed to `supabase/compile_sql/` but not yet executed against the live DB. The data is ready; it needs to be pushed to Supabase.

**Note on Sculptra and Kybella:** item_concerns and item_body_areas rows appear to exist in the live DB (Sculptra: 5 concerns, 14 body areas; Kybella: 1 concern, 1 body area) from 02-04 SQL execution, but agent_reference_docs query returns 0 for these product IDs under status=draft — indicating the dossier SQL files may not have been executed fully.

---

## SQL-Authored Data (Awaiting DB Execution)

All SQL files are committed to `supabase/compile_sql/`. Run these against project `aejskvmpembryunnbgrk` to complete the live DB state.

### Plan 02-04 SQL Files

| File | Products Covered | Key Rows |
|------|-----------------|----------|
| 02-04-task1-biostimulator-dossiers.sql | Sculptra Aesthetic | 5 agent_reference_docs |
| 02-04-task1-structured-emission.sql | Sculptra Aesthetic | 7 item_concerns, 7 item_body_areas, does_not_solve |
| 02-04-task1-evidence-links.sql | Sculptra Aesthetic | 7 evidence_links |
| 02-04-task2-body-contouring-dossiers.sql | Kybella, CoolSculpting Elite | 10 agent_reference_docs |
| 02-04-task2-structured-emission.sql | Kybella, CoolSculpting Elite | 8 item_concerns, 9 item_body_areas, does_not_solve |
| 02-04-task2-evidence-links.sql | Kybella, CoolSculpting Elite | 12 evidence_links |
| 02-04-source-registry.sql | All 02-04 products | 10 source_registry rows |

### Plan 02-05 SQL Files

| File | Products Covered | Key Rows |
|------|-----------------|----------|
| 02-05-task1-morpheus8-dossier.sql | Morpheus8 | 5 agent_reference_docs |
| 02-05-task1-energy-devices-dossiers.sql | Sofwave, Ultherapy, Hollywood Spectra | 15 agent_reference_docs |
| 02-05-task1-structured-emission.sql | 4 energy devices | ~20 item_concerns, ~20 item_body_areas |
| 02-05-task1-evidence-links.sql | 4 energy devices | 17 evidence_links |
| 02-05-task2-neurotoxin-dossiers.sql | Dysport, Jeuveau, Daxxify, Xeomin | ~18 agent_reference_docs |
| 02-05-task2-hydrafacial-dossier.sql | HydraFacial Syndeo | 4 agent_reference_docs |
| 02-05-task2-structured-emission.sql | 5 products | ~20 item_concerns, ~20 item_body_areas |
| 02-05-task2-evidence-links.sql | 5 products | 10 evidence_links |
| 02-05-source-registry.sql | All 02-05 products | 10 source_registry rows |

---

## Flagged Products

### FLAG: SKINVIVE — Zero Zone-Level Anatomy

SKINVIVE by Juvederm has 2 item_body_areas rows (both bilateral cheeks) but 0 at `anatomy_specificity='precise'`. This is clinically defensible — SKINVIVE is an intradermal hydrator indicated for cheeks only; zone-level sub-mapping is not clinically meaningful for this product. **Accepted as intentional — no second pass required.**

### FLAG: Kybella — 1 Concern Row

Kybella has exactly 1 item_concerns row (Submental Fullness, FDA-indicated). This correctly reflects Kybella's single FDA indication. Skin laxity is documented in `does_not_solve` rather than as a concern mapping. **Accepted as intentional — clinically accurate.**

### FLAG: 12 Products — Docs in DB = 0

All 02-04 and 02-05 products have agent_reference_docs = 0 in the live DB. SQL files exist in repo. **Action required: execute SQL files pre-demo.**

---

## FDA Validation Result

```sql
SELECT COUNT(*) FROM item_concerns ic
WHERE ic.is_fda_indicated = true
AND NOT EXISTS (
  SELECT 1 FROM evidence_links el
  WHERE el.offering_id = ic.offering_id AND el.source='fda_label'
);
-- Result: 0
```

**VALIDATION RESULT: PASS — 0 orphaned FDA-indicated concerns.**

FDA-indicated concern coverage (live DB):

| Product | FDA-Indicated Concerns | Has fda_label Evidence |
|---------|:---:|:---:|
| Juvederm Voluma XC | 3 | YES |
| Juvederm Vollure XC | 2 | YES |
| SKINVIVE by Juvederm | 2 | YES |
| Restylane Lyft | 4 | YES |
| RHA Redensity | 1 | YES |

---

## Immediate Action Items (Pre-Demo)

Priority order for SQL execution:

1. `supabase/compile_sql/02-04-task2-body-contouring-dossiers.sql` — CoolSculpting + Kybella docs
2. `supabase/compile_sql/02-04-task1-biostimulator-dossiers.sql` — Sculptra docs
3. `supabase/compile_sql/02-04-task2-structured-emission.sql` — CoolSculpting body areas
4. `supabase/compile_sql/02-05-task2-neurotoxin-dossiers.sql` — Jeuveau/Daxxify/Xeomin docs
5. `supabase/compile_sql/02-05-task1-energy-devices-dossiers.sql` — Sofwave/Ultherapy/Hollywood Spectra docs
6. `supabase/compile_sql/02-05-task1-morpheus8-dossier.sql` — Morpheus8 docs
7. `supabase/compile_sql/02-05-task2-structured-emission.sql` — neurotoxin structured emission
8. `supabase/compile_sql/02-05-task1-structured-emission.sql` — energy device structured emission

After execution, the live DB should show:
- 17 products with agent_reference_docs rows
- 17 products with item_concerns (except skipped GLP-1)
- 17 products with does_not_solve populated
- 0 orphaned FDA-indicated concerns
