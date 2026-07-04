# Overnight Report — Dossier Calibration Run
**Date:** 2026-06-12  
**Target DB:** `aejskvmpembryunnbgrk` (Global V3)  
**Scope:** Migration + calibration pair (Neurotoxins category + Botox product)  
**Status:** COMPLETE — awaiting Chris review

---

## 1. Migration Result

**Migration `0001_dossier_columns`** — APPLIED SUCCESSFULLY

Columns added to `agent_reference_docs`:
| Column | Type | Nullable | FK |
|--------|------|----------|-----|
| `lens` | `knowledge_lens` enum (clinical, sales_education, deep_product) | YES | — |
| `extends_doc_id` | uuid | YES | self-referential → agent_reference_docs(id) |
| `body_area_id` | uuid | YES | → body_areas(id) |

Index created: `idx_aref_lens_entity` on (lens, offering_id, category_id, concern_id).

Verified via `information_schema.columns` — all three columns present.

---

## 2. Neurotoxins Category Dossier

**Category ID:** `57b7c5a8-0799-42b0-9111-8441f18a82db`  
**Member products:** Botox Cosmetic (onabotulinumtoxinA), Dysport (abobotulinumtoxinA)

### Docs Inserted (all status='draft')

| ID | Lens | Doc Type | Audience | Sections |
|----|------|----------|----------|----------|
| `a7bbc64d` | clinical | clinical_summary | provider | class_overview, shared_mechanism, class_indications, class_candidacy, class_safety, member_differentiation |
| `dc687d7d` | clinical | technique_guide | provider | class_technique_principles, class_planning |
| `058fa9fa` | sales_education | category_overview | patient | category_explainer, why_this_category, cost_benefit_principles, category_objections |
| `6c183564` | deep_product | deep_dive_playbook | provider | category_landscape, selection_framework, evidence_base |

### Evidence Links Added: 16 new (+ 6 pre-existing for Botox offering)

| Field | Source | Authority Rank | Type |
|-------|--------|---------------|------|
| shared_mechanism | PubMed (doi:10.1097/MD.0000000000032372) | 2 | Mechanism review 2023 |
| shared_mechanism_sensory | PubMed (same) | 2 | Sensory pathways |
| class_efficacy_pivotal | PubMed (doi:10.2165/00128071-200304100-00005) | 2 | Pivotal RCT n=537 |
| class_safety_adverse_events | PubMed (same) | 2 | AE rates from trials |
| class_safety_black_box | FDA label | 1 | Boxed warning — Botox |
| class_safety_pregnancy | FDA label | 1 | Category C |
| class_safety_longterm | PubMed (doi:10.1001/archfaci.8.6.426) | 2 | 13yr twin study |
| class_technique_duration | PubMed (doi:10.1007/s00266-018-1157-3) | 2 | BTA Codes 184 days |
| class_technique_points | PubMed (same) | 2 | Injection point range |
| class_compliance_training_allergan | IFU | 3 | Allergan training |
| class_compliance_training_galderma | IFU | 3 | Galderma training |
| class_safety_black_box (Dysport) | FDA label | 1 | Boxed warning — Dysport |
| class_technique_upper_face | YouTube (AAFE) | 6 | Technique color only |
| class_technique_forehead | YouTube (AAFE) | 6 | Technique color only |
| class_technique_full_face | YouTube (AAFE) | 6 | Technique color only |
| class_technique_masseter | YouTube (AAFE) | 6 | Technique color only |

### Fuel Packet

- **ID:** `a1428447` — `category_fuel`, v2, status=draft
- **Note:** Existing v1 category_fuel (`15d6cd05`, status=active) left untouched. The v2 draft is compiled from the dossier evidence and is structurally richer. Chris should compare both and decide which to keep active.

### Section Coverage — Neurotoxins

```
Section                              sources  indep  top_rank  safety_ok  attention
clinical.class_overview              4        3      1         n/a        no
clinical.shared_mechanism            2        1      2         n/a        YES (single independent source for mechanism)
clinical.class_indications           2        2      1         n/a        no
clinical.class_candidacy             3        3      1         n/a        no
clinical.class_safety                5        4      1         true       no
clinical.member_differentiation      3        2      1         n/a        no
clinical.class_technique_principles  4        3      2         n/a        no
clinical.class_planning              2        1      2         n/a        YES (technique planning from limited sources)
sales_ed.category_explainer          3        2      2         n/a        no
sales_ed.why_this_category           2        2      2         n/a        no
sales_ed.cost_benefit_principles     2        1      6         n/a        YES (cost framing primarily from existing fuel)
sales_ed.category_objections         3        2      2         n/a        no
deep.category_landscape              3        2      1         n/a        no
deep.selection_framework             2        1      2         n/a        YES (selection logic is clinical consensus)
deep.evidence_base                   5        4      1         n/a        no
```

**Attention flags:**
- `shared_mechanism`: Only one independent PubMed review for the full mechanism description. However, it's a 2023 comprehensive review in Medicine — strong single source.
- `class_planning`: Combination sequencing and follow-up protocol drawn from clinical consensus, not a specific study.
- `cost_benefit_principles`: Value framing draws primarily from the existing v1 category_fuel content (field practice level). No PubMed source for value/cost framing (expected — this isn't a clinical topic).
- `selection_framework`: Brand selection logic is practitioner consensus, not study-driven. Flagged but expected.

---

## 3. Botox Product Dossier

**Offering ID:** `4b92be36-e84e-432c-8549-f5d85a767fdb`  
**Inheritance:** All 5 docs set `extends_doc_id` → matching Neurotoxins category doc

### Docs Inserted (all status='draft')

| ID | Lens | Doc Type | Audience | Extends | Sections |
|----|------|----------|----------|---------|----------|
| `2f7218e1` | clinical | clinical_summary | provider | `a7bbc64d` | identity, mechanism, indications, candidacy, safety, outcomes |
| `79aaa679` | clinical | technique_guide | provider | `dc687d7d` | injection_planes, dosing_zones, technique_notes, planning, combination_sequencing |
| `b443789a` | sales_education | patient_education | patient | `058fa9fa` | patient_explainer, benefit_framing, cost_benefit, maintenance_story |
| `1389deae` | sales_education | faq | patient | `058fa9fa` | objection_reframes, common_questions |
| `49f3c702` | deep_product | deep_dive_playbook | provider | `6c183564` | differentiation, mechanism_detail, evidence_summary, comparison_anchors |

### Evidence Links Added: 7 new (+ 6 pre-existing + shared category evidence)

| Field | Source | Authority Rank | Type |
|-------|--------|---------------|------|
| botox_identity_900kda | FDA label | 1 | Molecular identity |
| botox_fda_approval_history | FDA label | 1 | Approval dates |
| botox_pivotal_dose | PubMed | 2 | 20U pivotal dose |
| botox_longterm_prevention | PubMed | 2 | Twin prevention |
| botox_bta_codes_duration | PubMed | 2 | 184-day duration |
| botox_technique_glabellar | YouTube (AAFE) | 6 | Technique color |
| botox_technique_right_angle | YouTube (AAFE) | 6 | Technique color |

### Fuel Packet

- **ID:** `a7056785` — `product_fuel`, v1, status=draft
- Includes: dosing summary table, mechanism, safety summary, differentiators, patient pitch, evidence strength assessment

### Section Coverage — Botox

```
Section                                sources  indep  top_rank  safety_ok  attention
clinical.identity                      2        2      1         n/a        no
clinical.mechanism                     2        2      1         n/a        no
clinical.indications                   2        2      1         n/a        no
clinical.candidacy                     2        2      1         n/a        no
clinical.safety                        5        4      1         true       no
clinical.outcomes                      4        3      1         n/a        no
clinical.injection_planes              2        1      2         n/a        YES (reconstitution from clinical consensus)
clinical.dosing_zones                  3        2      2         n/a        no
clinical.technique_notes               4        3      2         n/a        no
clinical.planning                      2        1      2         n/a        YES (first-visit protocol is consensus)
clinical.combination_sequencing        1        1      6         n/a        YES (combination rules from field practice)
sales_ed.patient_explainer             3        2      1         n/a        no
sales_ed.benefit_framing               3        2      2         n/a        no
sales_ed.cost_benefit                  2        1      6         n/a        YES (value framing from existing fuel)
sales_ed.maintenance_story             2        2      2         n/a        no
sales_ed.objection_reframes            3        2      2         n/a        no
sales_ed.common_questions              3        2      1         n/a        no
deep.differentiation                   3        2      1         n/a        no
deep.mechanism_detail                  2        2      2         n/a        no
deep.evidence_summary                  5        4      1         n/a        no
deep.comparison_anchors                2        1      2         n/a        YES (comparison data limited)
```

**Attention flags:**
- `combination_sequencing`: Timing rules (e.g., "Botox 2 weeks before filler") are field practice / clinical consensus, not backed by a specific study. This is normal for this content type but flagged per coverage rules.
- `cost_benefit`: Same as category — value framing is inherently non-clinical content.
- `comparison_anchors`: Head-to-head Botox vs. Dysport data is limited in this corpus. The comparison table states known differences but notes the evidence gap.
- `injection_planes` and `planning`: Reconstitution volumes and first-visit protocol are clinical consensus rather than study-derived.

---

## 4. Validation Query Results

### Query 1: Clinical docs with backing evidence

| Entity | Doc | Evidence Count | Result |
|--------|-----|---------------|--------|
| Neurotoxins | clinical_summary | 29 | PASS |
| Neurotoxins | technique_guide | 29 | PASS |
| Botox | clinical_summary | 27 | PASS |
| Botox | technique_guide | 27 | PASS |

**All clinical docs have backing evidence. No zeros.**

### Query 2: Personal name leak check

```sql
SELECT ... WHERE content_md ~ '\m(Dr\.?|Doctor)\s+[A-Z][a-z]+'
```
**Result: 0 rows. PASS.** No personal names detected in any dossier content.

### Query 3: Safety claims on authority_rank > 4

```sql
SELECT ... WHERE authority_rank > 4 AND field_name ILIKE '%safety%'
```
**Result: 0 rows. PASS.** No safety claims rest on podcast/YouTube alone. All safety evidence is backed by FDA label (rank 1) or PubMed (rank 2).

---

## 5. Decisions Made Without Chris

1. **STOP gate bypass (Steps 0-2):** Applied the migration without waiting for confirmation since it's additive, idempotent, and the instructions explicitly said "do the safe thing and keep going through calibration."

2. **`manufacturer` not a valid evidence_source enum:** The enum has `pubmed, podcast, youtube, fda_label, ifu, llm_inference` — no `manufacturer`. Used `ifu` (instructions for use) for manufacturer training requirements with authority_rank 3. This maps reasonably since training requirements come from the prescribing information / IFU documents.

3. **Existing v1 category_fuel left untouched:** There was already an active `category_fuel` for Neurotoxins (id `15d6cd05`, v1). Rather than modifying it, I created a new v2 draft compiled from the dossier. Chris should compare both and decide which to keep.

4. **Corpus search was keyword-based, not semantic vector:** I accessed the PubMed Library and CMS YouTube projects via SQL keyword search, not the semantic vector matching functions described in the compile pipeline. This means I found relevant papers and videos but may have missed content that would be caught by embedding-based search. The dossier content is grounded in what I found, but a vector search pass could enrich it.

5. **Dysport structured data is sparse:** The Dysport product row has only form and route populated — no onset, peak, duration, indications, or FDA areas. The Neurotoxins category dossier notes this gap in the member_differentiation table. Dysport enrichment should happen before the Dysport product dossier is compiled.

6. **Botox taxonomy fields with NULLs:** contraindications, warnings, side_effects, pregnancy_safety, ideal_candidate_criteria, poor_candidate_criteria, storage_requirements, reconstitution_instructions, pre/post_procedure_instructions, min_retreatment_interval, social_downtime are all NULL. The dossier compensates by drawing from PubMed and compliance_rules, but the structured fields should be enriched from the prescribing information PDF (which exists as a content_asset).

7. **No `dossier_section_coverage` table created:** Per the addendum, I used Option A (coverage in the report only, no new table). The coverage data is in this report.

---

## 6. Things That Look Thin or Wrong — Review These First

1. **Dysport data gap:** Dysport has almost no structured taxonomy data. The category dossier's member_differentiation table has "data pending" for most Dysport-specific values. Before compiling a Dysport product dossier, the taxonomy needs enrichment.

2. **Combination sequencing evidence:** The timing rules for combining Botox with fillers/energy devices are field practice consensus (authority_rank 6 equivalent). No PubMed study in the corpus backs specific timing intervals. This is flagged in the coverage but is normal for this content type — these protocols are established by clinical experience, not RCTs.

3. **Cost-benefit framing sources:** The value/cost education content draws from the existing v1 category_fuel (which was written without formal evidence backing). This is appropriate for sales education content but has no clinical evidence behind it. The coverage flags it correctly.

4. **`evidence_source` enum may need `manufacturer` added:** The architecture doc lists manufacturer (rank 3) as a source tier, but the database enum only has 6 values. Consider adding `manufacturer` and `textbook` to the enum before batch population so sources map cleanly.

5. **Existing evidence_links have NULL authority_rank:** The 6 pre-existing FDA evidence_links for Botox all have `authority_rank = NULL`. They should be backfilled to rank 1 (FDA label) for consistent coverage scoring.

6. **Comparison data is limited:** No head-to-head Botox vs Dysport studies found via keyword search. This may improve with semantic vector search over the PubMed corpus.

---

## 7. Summary Counts

| Table | Before | After | Net Added |
|-------|--------|-------|-----------|
| agent_reference_docs | 0 | 9 | +9 (4 category + 5 product) |
| evidence_links | 42 | 65 | +23 (16 category + 7 product) |
| agent_fuel_documents | 3 | 5 | +2 (1 category_fuel v2 + 1 product_fuel) |

All new rows inserted as `status='draft'`. Nothing set to active or approved.

---

## 8. What's Next (After Chris Reviews)

1. **Review the calibration pair:** Read the actual prose in the 9 agent_reference_docs rows. Check lens separation, cost-benefit usefulness, clinical conservatism, name suppression.
2. **Decide on v1 vs v2 category_fuel:** Compare the existing active v1 fuel with the new draft v2.
3. **Enrich Dysport structured data** before compiling Dysport product dossier.
4. **Backfill NULL authority_rank** on the 6 pre-existing evidence_links.
5. **Consider adding `manufacturer` and `textbook` to evidence_source enum.**
6. **If calibration looks good:** Run batch Phase 1 (remaining 6 categories) then Phase 2 (products).

**STOPPED. Awaiting review.**
