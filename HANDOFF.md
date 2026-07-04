# Handoff — Dossier Recompile In Progress
**Date:** 2026-06-12  
**Plan file:** `C:\Users\Chris\.claude\plans\temporal-dreaming-barto.md`

## What's done
- All 9 old Neurotoxins/Botox docs set to `status='archived'` in DB
- `GATEWAY_POSTURE_ADDENDUM.md` + `SALES_EDUCATION_PRIORITY_ADDENDUM.md` copied to `Fable Docs/`
- Old review file `PENDING_79aaa679_botox_technique_guide.md` deleted (superseded)
- `DOSSIER_COMPILE_PIPELINE.md` updated with gateway posture + sales_education priority blocks at STEP 4

## What's next (pick up here)

**Step 1 — Update DOSSIER_TEMPLATES.md** (small edit):
- Mark `sales_education` as PRIMARY in the lens table for each entity type
- Add `combination_therapy` as a section in product `patient_education` (after `benefit_framing`)
- Add posture note to clinical `technique_guide`: `dosing_zones → range+pointer [gateway]`

**Step 2 — Recompile 9 docs** (the big step):
Run the updated compile pipeline for Neurotoxins category (4 docs) + Botox product (5 docs).
Key differences from prior compile:
- Clinical technique_guide: dosing_zones → range characterization + "see Botox prescribing information [FDA/DailyMed →]" — NO precise table
- Every clinical claim tagged inline: [FDA label] / [peer-reviewed: Author Year] / [consensus] / [field practice]
- Safety (black box warning, pregnancy) stays authoritative with [FDA label] tags
- Sales_education: primary lens — deep cost_benefit + new combination_therapy section + rich objection_reframes
- All new docs insert as `status='draft'`, `version=2`

Key DB IDs:
- Botox offering_id: `4b92be36-e84e-432c-8549-f5d85a767fdb`
- Neurotoxins category_id: `57b7c5a8-0799-42b0-9111-8441f18a82db`
- Archived category doc IDs (for extends_doc_id reference): see archived rows in agent_reference_docs

Evidence already in DB (all evidence_links remain — don't re-insert, just reference):
- FDA: black box warning, pregnancy Cat C, onset 24-72h, peak 1-2wk, duration 3-4mo, approved areas
- PubMed rank 2: mechanism (SNAP-25), pivotal trial (20U, 80% response), 13yr twin prevention, BTA codes 183 days
- Combination sequencing: 4 sources (Carruthers 2016 rank 4, Semchyshyn 2005 rank 4, Urdiales-Gálvez 2019 rank 2, Alam 2006 rank 4)
- YouTube rank 6: technique color for glabellar/forehead/full-face/masseter (color only, not for clinical assertions)

**Step 3 — Write 3 REVIEW_QUEUE files:**
- `PENDING_botox_neurotoxins_clinical.md`
- `PENDING_botox_neurotoxins_sales_education.md` ← most important for Chris to read
- `PENDING_botox_neurotoxins_deep_product.md`

## Context for the recompile

Gateway posture clinical example (dosing_zones):
> Glabellar treatment typically uses a dose in the low tens of units for onabotulinumtoxinA [peer-reviewed: Carruthers 2003]; masseter and platysmal treatments use substantially higher per-side amounts that vary widely by anatomy and indication [field practice]. For exact dosing protocol, see the Botox Cosmetic prescribing information [FDA/DailyMed →].

Sales_education combination_therapy example:
> Neurotoxin + HA filler together addresses two different contributors to the aging face at once: the toxin relaxes the muscle that's been etching a line into the skin, while the filler restores the volume loss underneath it. Neither treatment alone gets the complete result — but together they address the cause and the consequence. The value math works in the patient's favor too: a thoughtful combination plan treated in sequence often delivers a result that lasts longer and looks more natural than chasing one concern at a time.
