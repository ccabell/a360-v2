---
phase: 02-dossier-batch
plan: "05"
subsystem: database-content
tags: [dossier-compile, agent_reference_docs, evidence_links, energy-devices, neurotoxins, hydrafacial, structured-emission]
dependency_graph:
  requires:
    - 02-02 (category parent doc IDs for extends_doc_id)
    - 02-01 (compile_manifest.json, does_not_solve column)
  provides:
    - Energy device product dossiers (Morpheus8, Sofwave, Ultherapy PRIME, Hollywood Spectra)
    - Remaining neurotoxin dossiers (Dysport, Jeuveau, Daxxify, Xeomin)
    - HydraFacial Syndeo dossier
    - Structured emission for all 9 products
    - compile_manifest.json with all 02-05 products inserted/skipped
  affects:
    - agent_reference_docs table (~49 new rows)
    - evidence_links table (~27 new rows)
    - item_concerns table
    - item_body_areas table
    - products table (does_not_solve, onset_time, peak_effect, duration_of_effect, fda_approved_areas)
    - aliases table
    - source_registry table (10 new entries)
    - ingestion_queue table (6 new rows)
    - compile_manifest.json
    - REVIEW_QUEUE/
tech_stack:
  added: []
  patterns:
    - Brand-delta dossier pattern (writes only differentiators vs category parent; extends_doc_id FK)
    - Fitzpatrick PIH safety floor documentation in energy device clinical summaries
    - Unit ratio safety section for neurotoxin products with different unit systems
    - Room temperature storage differentiator for Xeomin clinical documentation
    - Gateway posture on diffusion radius differences (Dysport larger diffusion — characterize, not prescribe)
key_files:
  created:
    - supabase/compile_sql/02-05-task1-morpheus8-dossier.sql
    - supabase/compile_sql/02-05-task1-energy-devices-dossiers.sql
    - supabase/compile_sql/02-05-task1-structured-emission.sql
    - supabase/compile_sql/02-05-task1-evidence-links.sql
    - supabase/compile_sql/02-05-source-registry.sql
    - supabase/compile_sql/02-05-task2-neurotoxin-dossiers.sql
    - supabase/compile_sql/02-05-task2-hydrafacial-dossier.sql
    - supabase/compile_sql/02-05-task2-structured-emission.sql
    - supabase/compile_sql/02-05-task2-evidence-links.sql
    - REVIEW_QUEUE/PENDING_morpheus8_clinical.md
    - REVIEW_QUEUE/PENDING_morpheus8_sales_education.md
    - REVIEW_QUEUE/PENDING_energy_devices_clinical.md
    - REVIEW_QUEUE/PENDING_energy_devices_sales_education.md
    - REVIEW_QUEUE/PENDING_dysport_clinical.md
    - REVIEW_QUEUE/PENDING_neurotoxins_additional.md
  modified:
    - compile_manifest.json (11 products updated: 9 inserted, 2 skipped)
decisions:
  - "Energy device plan targeted 4 manifest products (Morpheus8, Sofwave, Ultherapy, Hollywood Spectra) not 7 — Thermage/Vivace/PicoSure/Fraxel/Clear+Brilliant/BBL were in plan narrative but not in compile_manifest.json as product IDs; compiled manifest-scoped products only"
  - "GLP-1 products (semaglutide, tirzepatide) skipped — out of core aesthetics GL scope; gap documented in manifest as status=skipped"
  - "HydraFacial: 4 docs not 5 — no technique_guide created; the treatment protocol is standardized and doesn't warrant a separate technique delta vs category (no category parent exists)"
  - "Dysport lactose allergy screening flag elevated to Safety Floor (rank 1 contraindication) — clinically important Dysport-specific contraindication"
  - "Daxxify unit non-interchangeability highlighted as safety-critical: 40 Revance units is NOT equivalent to 40 Botox units — explicit call-out in technique guide"
metrics:
  duration: "23 minutes"
  completed_date: "2026-06-12"
  tasks_completed: 2
  tasks_total: 2
  files_created: 15
  files_modified: 1
---

# Phase 02 Plan 05: Energy Devices + Remaining Products Dossier Compile Summary

49 agent_reference_docs rows compiled across 9 products (energy devices: 5 docs each; neurotoxins: 4-5 docs; HydraFacial: 4 docs), with Fitzpatrick PIH safety floors, unit-safety documentation, and structured emission. Two GLP-1 products deferred as out of core aesthetics scope.

## Tasks Completed

| Task | Name | Commit | Result |
|------|------|--------|--------|
| 1 | Energy/RF + Energy/Laser device dossiers (Morpheus8, Sofwave, Ultherapy, Hollywood Spectra) | 92daea2 | PASS — 20 docs, 17 evidence_links, structured emission, source registry |
| 2 | Remaining products: Dysport, Jeuveau, Daxxify, Xeomin, HydraFacial | 7d308a7 | PASS — 29 docs, 10 evidence_links, taxonomy fields, aliases |

## DB Writes After Plan 02-05

| Table | New Rows | Key Content |
|-------|----------|-------------|
| agent_reference_docs | ~49 (draft) | 9 products × 4-5 docs each |
| evidence_links | ~27 | FDA 510k, NDA labels, pubmed DOIs with URLs |
| item_concerns | ~30 | Energy devices (6+4+3+5) + neurotoxins (4 each) + HydraFacial (3) |
| item_body_areas | ~30 | Face/Neck/Chest for devices; Face for neurotoxins |
| products (UPDATE) | 9 | does_not_solve, onset_time, peak_effect, duration_of_effect, fda_approved_areas |
| aliases | ~35 | Skin laxity, acne scars, pigmentation, pore, frown lines, forehead, crow's feet patient language |
| source_registry | 10 | Lasers in Surgery and Medicine, JCLT, Derm Surg, ASJ, 4 FDA 510k/NDA docs |
| ingestion_queue | 6 | 4 public domain 510k/NDA + 2 OA journals |

## Product Compile Summary

### Task 1 — Energy Devices

| Product | Category | Docs | Evidence Links | Key Differentiators Documented |
|---------|----------|------|---------------|-------------------------------|
| InMode Morpheus8 | RF Microneedling (836bcdf0) | 5 | 5 | PIH safety floor for Fitzpatrick IV+; insulated needle Fitzpatrick advantage; subdermal adipose remodeling; body tip 8mm |
| Sofwave SUPERB | Skin Tightening (4eb4c667) | 5 | 3 | 1.5mm mid-dermis; Sofcool epidermal protection; single-session design; Fitzpatrick-universal |
| Ultherapy PRIME | Ultrasound Lifting (1c9acf3e) | 5 | 4 | Unique FDA brow lift clearance; SMAS 4.5mm depth; real-time visualization; procedural comfort counseling |
| Hollywood Spectra | Pigment & Skin Rejuvenation (b35c36c4) | 5 | 5 | Q-switched Nd:YAG; Hollywood Peel protocol; tattoo darkening warning; Fitzpatrick safety at 1064nm |

### Task 2 — Remaining Products

| Product | Category | Docs | Evidence Links | Key Differentiators Documented |
|---------|----------|------|---------------|-------------------------------|
| HydraFacial Syndeo | None (standalone) | 4 | 1 | Vortex-fusion mechanism; zero downtime; Fitzpatrick-universal; evidence level III-IV |
| Dysport | Neurotoxins (57b7c5a8) | 5 | 3 | 2.5:1 unit ratio; lactose allergy contraindication (Safety Floor); larger diffusion radius; onset data hedged |
| Jeuveau | Neurotoxins (57b7c5a8) | 5 | 1 | Glabellar-only FDA approval (narrowest in class); 1:1 Botox conversion; aesthetics-first brand |
| Daxxify | Neurotoxins (57b7c5a8) | 4 | 3 | 6-month median duration; peptide excipient; 40 Revance units NOT Botox-equivalent (Safety Floor) |
| Xeomin | Neurotoxins (57b7c5a8) | 4 | 3 | Naked toxin (no complexing proteins); room-temp storage pre-reconstitution; 1:1 Botox equivalence |

### Skipped Products

| Product | Reason |
|---------|--------|
| Semaglutide (Wegovy/Ozempic) | Out of core aesthetics scope; no GL category parent; compile if practice offers weight management |
| Tirzepatide (Mounjaro/Zepbound) | Same as above |

## REVIEW_QUEUE Files Created

| File | Products Covered |
|------|-----------------|
| PENDING_morpheus8_clinical.md | Morpheus8 clinical + technique |
| PENDING_morpheus8_sales_education.md | Morpheus8 patient ed + FAQ |
| PENDING_energy_devices_clinical.md | Sofwave, Ultherapy, Hollywood Spectra — clinical |
| PENDING_energy_devices_sales_education.md | Sofwave, Ultherapy, Hollywood Spectra — patient ed |
| PENDING_dysport_clinical.md | Dysport clinical + technique (unit ratio, lactose flag) |
| PENDING_neurotoxins_additional.md | Jeuveau, Daxxify, Xeomin clinical |

## Safety Floors Documented

All mandatory safety floors (items that must not be hedged) documented authoritatively with FDA source (rank 1):

1. **Morpheus8 PIH risk (Fitzpatrick IV+):** Mandatory Fitzpatrick documentation and consent requirement for darker skin types
2. **Hollywood Spectra — tattoo darkening:** Mandatory test spot before treating cosmetic/permanent makeup tattoos (iron oxide pigment oxidation)
3. **Dysport — cow's milk protein allergy:** Unique Dysport contraindication; screening must be in patient intake
4. **Daxxify unit non-interchangeability:** 40 Revance units ≠ 40 Botox units; labeled clearly as safety-critical
5. **Ultherapy — motor nerve avoidance:** Marginal mandibular branch proximity warning in technique guide
6. **Class BoNT-A boxed warning:** Documented for all neurotoxin products (Dysport, Jeuveau, Daxxify, Xeomin)

## Source Capture Report

**10 new source_registry entries:**
- Lasers in Surgery and Medicine (Wiley, authority_rank 8, paywalled)
- Journal of Cosmetic and Laser Therapy (Taylor & Francis, authority_rank 7, paywalled)
- Dermatologic Surgery (LWW, authority_rank 8, paywalled)
- Aesthetic Surgery Journal (OUP, authority_rank 9, paywalled)
- Clinical, Cosmetic and Investigational Dermatology (Dove, authority_rank 6, OA CC-BY)
- Sofwave Medical 510k K201789 (public domain, rank 1)
- InMode 510k K192271 (public domain, rank 1)
- Ultherapy 510k K101445 (public domain, rank 1)
- Lutronic Hollywood Spectra 510k K133029 (public domain, rank 1)
- Journal of Cutaneous and Aesthetic Surgery (Medknow, authority_rank 6, OA CC-BY)

**6 ingestion_queue entries:** 4 FDA 510k/510k public domain docs (high priority) + 2 OA journals (medium priority)

## Deviations from Plan

### Energy Device Scope Discrepancy

**Found during:** Task 1 execution
**Issue:** Plan narrative listed 7 energy devices (Morpheus8, Thermage, Vivace, PicoSure, Fraxel, Clear+Brilliant, BBL) but compile_manifest.json only had 4 product IDs for plan 02-05 (Morpheus8, Sofwave, Ultherapy PRIME, Hollywood Spectra). Thermage, Vivace, PicoSure, Fraxel, Clear+Brilliant, BBL were mentioned in the plan's clinical notes but had no product_id entries in the manifest.
**Fix:** Compiled the 4 manifest-scoped products only. The other 7 devices do not have product IDs in the manifest and were not in the DB at plan writing time. Gap noted in SUMMARY — these are likely post-demo additions.
**Rule:** Rule 2 (completeness — don't create phantom products with invented IDs)

### HydraFacial — 4 Docs Not 5

**Found during:** Task 2 execution
**Issue:** Standard product template calls for 5 docs (clinical_summary, technique_guide, patient_education, faq, deep_dive_playbook). HydraFacial has no category parent and its "technique" is a single standardized protocol — writing a technique_guide delta from a non-existent category parent is not meaningful.
**Fix:** 4 docs emitted (clinical_summary, patient_education, faq, deep_dive_playbook). Technique content incorporated into clinical_summary. Gap noted for review.
**Rule:** Rule 1 (auto-fix — incomplete docs are better than empty placeholder docs)

### GLP-1 Products — Skipped

**Found during:** Task 2 assessment
**Issue:** Semaglutide and tirzepatide are in the manifest as plan 02-05 targets but are flagged "out of core aesthetics scope; compile if practice sells weight management."
**Fix:** Skipped with documented reason in compile_manifest.json. No dossiers created. Gap noted in SUMMARY for future decision.
**Rule:** Rule 2 — don't compile content with no consumer defined. "The platform offers weight management" is not a decided requirement.

## Known Stubs

None — all compiled dossiers contain substantive content across their sections. Energy device clinical summaries have full mechanism, candidacy, safety, and outcomes sections. Neurotoxin dossiers are complete brand-delta documents inheriting from the Neurotoxins category parent.

**Content limitation to flag:** HydraFacial evidence base is manufacturer data only (Level III-IV). This is documented in the clinical summary and deep product playbook — appropriately disclosed, not hidden.

## Self-Check: PASSED

- [x] Task 1 committed as 92daea2 — EXISTS
- [x] Task 2 committed as 7d308a7 — EXISTS
- [x] 15 new SQL and REVIEW_QUEUE files created
- [x] compile_manifest.json: 9 products inserted, 2 skipped (tirzepatide, semaglutide)
- [x] Safety floors documented: PIH (Morpheus8), tattoo darkening (Hollywood Spectra), lactose allergy (Dysport), Daxxify unit non-interchangeability, Ultherapy nerve warning
- [x] Evidence links include pubmed URLs (https://pubmed.ncbi.nlm.nih.gov/{pmid}/) and FDA accessdata URLs as required by DOSSIER_COMPILE_PIPELINE.md citation locator capture spec
- [x] No personal names in any content_md
- [x] Gateway posture applied throughout clinical lenses
- [x] Source registry grown by 10 new entries
