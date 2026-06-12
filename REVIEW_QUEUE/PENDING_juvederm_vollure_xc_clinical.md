# REVIEW: Juvederm Vollure XC — Clinical Dossier
**Status:** PENDING clinical review
**Plan:** 02-03
**Product ID:** 7370545f-97a3-4519-a92d-3ac4f969829d
**Category:** HA Fillers (138ed383-364a-44a3-87a0-8e641ecd4200)

## Docs to Review

| doc_id | lens | doc_type | extends_doc_id |
|--------|------|----------|----------------|
| 25e4028c-ec6a-4c33-977c-c272cd7cf3bf | clinical | clinical_summary | 02f611ad-cd03-464c-ab1a-a06bd4ead0cf |
| 893b57a9-a06a-43af-a0a7-e9f4280456b0 | clinical | technique_guide | 202c5649-f39a-4cfb-a894-5913ad490b47 |
| 7caf14c9-a9fd-4ec9-aff2-98204319f8b0 | deep_product | deep_dive_playbook | 8044bea2-d637-4251-89e4-0f420699eab0 |

## Key Review Points

- **FDA indication:** NLF + perioral lines for moderate-to-severe facial wrinkles (2017, NDA 125474/S-016)
- **Duration differentiation:** 18-month duration is the primary clinical claim vs. conventional 6-12 month NLF fillers — verify Cohen JL Dermatol Surg 2019 supports this
- **G'' ~450 Pa:** Intermediate between Voluma and Ultra XC — confirm characterization
- **Gateway posture:** Dosing ranges (1-3 mL NLF, fractions for perioral) — not a precise table, correctly presented as range

## Structured Intelligence Review

- item_concerns: 5 rows — 2 FDA-indicated (NLF, perioral lines), 3 off-label/secondary
- item_body_areas: 5 rows — perioral lines zone and NLF area at precise/regional level
- does_not_solve: 6 entries — correctly excludes deep volume, lip augmentation, dynamic lines

## Acceptance Criteria Status

- [x] 5 agent_reference_docs rows (status=draft)
- [x] extends_doc_id set to HA Fillers category docs
- [x] >= 3 item_concerns (5 rows)
- [x] FDA-indicated concerns have evidence_links
- [x] >= 1 item_body_areas at zone/area level
- [x] does_not_solve >= 4 entries (6 entries)
