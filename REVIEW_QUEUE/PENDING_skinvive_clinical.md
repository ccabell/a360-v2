# REVIEW: SKINVIVE by Juvederm — Clinical Dossier
**Status:** PENDING clinical review
**Plan:** 02-03
**Product ID:** b74d5475-bf58-4d7d-87f5-2c8dc9e252de
**Category:** HA Fillers (138ed383-364a-44a3-87a0-8e641ecd4200)

## Docs to Review

| doc_id | lens | doc_type | extends_doc_id |
|--------|------|----------|----------------|
| 87f7f03a-727f-4c73-875a-c389e0e2fd1f | clinical | clinical_summary | 02f611ad-cd03-464c-ab1a-a06bd4ead0cf |
| 69966628-9227-4e6b-b576-45e9b560a76c | clinical | technique_guide | 202c5649-f39a-4cfb-a894-5913ad490b47 |
| ece9394c-f40c-4b59-bc3d-6a215794dee4 | deep_product | deep_dive_playbook | 8044bea2-d637-4251-89e4-0f420699eab0 |

## Key Review Points

- **FDA clearance distinction:** 510k K220481 (not NDA/PMA) — device clearance, not drug approval — correctly characterized
- **Mechanism claim:** HA binds water in dermis → hydration, luminosity, smoothness — verify Loghem J. J Cosmet Dermatol 2023 supports this for the US product
- **Critical distinction:** NOT a volumizer — intradermal placement, 12 mg/mL, bleb formation expected — confirm this is clearly stated
- **Two-session protocol:** 0 + 4 weeks, then 6-month maintenance — verify this is from the FDA clearance protocol
- **Off-label scope:** International biorevitalization data referenced but clearly labeled as off-label for US context

## Structured Intelligence Review

- item_concerns: 5 rows — 2 FDA-indicated (skin quality, skin hydration), 3 adjunctive
- item_body_areas: 2 rows — cheeks (FDA) + full face (off-label, broad)
- does_not_solve: 7 entries — correctly excludes volume, deep wrinkles, structural lift

## Key Clinical Concern

Skinvive is the first FDA-cleared product in this category in the US. The clinical dossier must clearly differentiate it from traditional fillers to avoid misuse. Review that the "NOT a volumizer" distinction is prominent in the content.

## Acceptance Criteria Status

- [x] 5 agent_reference_docs rows (status=draft)
- [x] extends_doc_id set
- [x] >= 3 item_concerns (5 rows)
- [x] FDA-indicated concerns have evidence_links
- [x] >= 1 item_body_areas
- [x] does_not_solve >= 4 entries (7 entries)
