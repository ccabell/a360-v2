-- 02-03 Task 1: Structured Emission — item_concerns, item_body_areas, does_not_solve
-- Products: Juvederm Voluma XC (6c8f72f0), Vollure XC (7370545f), Skinvive (b74d5475)
-- Concern IDs (from taxonomy query):
--   Cheek Volume Loss:         89d1ee67-5f54-43ae-a054-05f4700b7c73
--   Temple Hollowing:          63433ae1-36a8-42f7-9735-edc7e0844dc3
--   Jawline Definition:        81c06a11-ac4b-4574-9e42-35adffc4b610
--   Tear Trough Hollowing:     b90ce295-5d33-4b46-a04b-2de1b6e61656
--   Nasolabial Folds:          444b53c5-a40c-41f2-b378-05a042f67126
--   Perioral Lines:            205406f5-f6f5-4fb7-aefb-7e1726c6f4ba
--   Marionette Lines:          2659d993-46af-47b0-b4f6-60e9142c168b
--   Skin Laxity:               266857e0-ee39-4618-a3ea-30566f584a42
--   Fine Lines & Wrinkles:     d927bcd6-35f5-4118-baac-034e225b5ca1
--   Skin Texture:              001de059-a4c0-4ec2-8e20-a10162ddedeb
--   Lip Volume Loss:           f588b53b-ce05-4e4d-a5ea-010bae41ae6c
--   Hand Volume Loss:          6557522f-d92c-4ed8-9636-0794d539ee24
--   Skin Dullness:             d587e18a-5ce2-4deb-b26a-b9f7943e8a06
-- New concern IDs (added in taxonomy-additions.sql):
--   Age-Related Volume Loss:   a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85
--   Skin Hydration:            b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96
--   Skin Quality Improvement:  c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07
--   Chin Augmentation:         d7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18
--   Lip Augmentation:          e8b6a1f5-2d7c-4e9b-1a6c-5f8d4b0e7c29
--   Dynamic Wrinkle Correction: f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30

-- Body area IDs:
--   Cheeks (area):             213c574f-732b-4017-80e1-6bf7e7b36acf
--   Submalar (zone):           94630fce-d910-4854-adb4-ef4196adf8f5
--   Chin (area):               62457764-fd19-43d2-ac0d-dc8fe53e0286
--   Chin Projection Zone (zone): b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e
--   Midface (zone):            a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d
--   Temples (area):            30eab1a6-d818-431c-936f-746a843cee80
--   Jawline (area):            8d1b4ea7-a77a-4771-a024-e11cf54218c8
--   Nasolabial Folds (area):   7ca85bf0-3763-478e-8f92-7fbb89a8a56c
--   Perioral (area):           b63f5061-707f-45e5-a871-0c47ac71b937
--   Perioral Lines (zone):     e1af3804-bbde-4700-95f8-921e1a3bdab8
--   Periorbital (area):        7786cdde-39df-445a-9db0-c7a6751176df
--   Tear Trough (zone):        76f8a051-2d93-403b-ac38-42a366cbf014
--   Lips (area):               cdae1876-2801-416e-90fe-20f70b165ad2
--   Marionette Region (area):  899db8bb-1ada-49d9-91ed-946c14142b8d
--   Full Face (area):          fb888d96-924d-4d6a-b28b-617b4ab9ae26

-- ============================================================
-- JUVEDERM VOLUMA XC — item_concerns
-- product_id: 6c8f72f0-887f-484a-a588-0bb9bd8052c9
-- ============================================================

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
VALUES
  -- FDA-indicated primary indications
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', '89d1ee67-5f54-43ae-a054-05f4700b7c73', 'primary', 'primary', true,
   'FDA-cleared for cheek augmentation to correct age-related mid-face volume loss (2013). Core indication.'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'd7a5f0e4-1c6b-4d8a-0f5b-4e7c3a9d6b18', 'primary', 'primary', true,
   'FDA-cleared for chin region augmentation (2021). Supraperiosteal depot technique.'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85', 'primary', 'primary', true,
   'Age-related facial volume loss is the biological mechanism underlying the FDA cheek augmentation indication.'),
  -- FDA-supported secondary/off-label field standard
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', '63433ae1-36a8-42f7-9735-edc7e0844dc3', 'secondary', 'primary', false,
   'Off-label but field-standard for temple volume restoration. Not FDA-labeled.'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', '81c06a11-ac4b-4574-9e42-35adffc4b610', 'secondary', 'primary', false,
   'Off-label jawline/mandibular volume augmentation — deep plane, common in practice.'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', '444b53c5-a40c-41f2-b378-05a042f67126', 'secondary', 'adjunctive', false,
   'NLF improvement is often a secondary benefit of midface volumetric lift — not a direct filler indication for Voluma.'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'b90ce295-5d33-4b46-a04b-2de1b6e61656', 'adjunctive', 'adjunctive', false,
   'Midface lift can secondarily reduce tear trough shadow; direct tear trough treatment requires softer product.')
ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
  relevance = EXCLUDED.relevance,
  treatment_role = EXCLUDED.treatment_role,
  is_fda_indicated = EXCLUDED.is_fda_indicated,
  notes = EXCLUDED.notes;

-- JUVEDERM VOLUMA XC — item_body_areas
INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
VALUES
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', '213c574f-732b-4017-80e1-6bf7e7b36acf', 'bilateral', 'regional', 'Cheeks — primary injection region'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', '94630fce-d910-4854-adb4-ef4196adf8f5', 'bilateral', 'precise', 'Submalar zone — deep supraperiosteal depot for lift'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'bilateral', 'precise', 'Midface zone — volumetric correction target'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', '62457764-fd19-43d2-ac0d-dc8fe53e0286', 'na', 'regional', 'Chin — FDA-approved augmentation site (2021)'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'na', 'precise', 'Chin projection zone — supraperiosteal for chin augmentation'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', '30eab1a6-d818-431c-936f-746a843cee80', 'bilateral', 'regional', 'Temples — off-label volumetric restoration'),
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', '8d1b4ea7-a77a-4771-a024-e11cf54218c8', 'bilateral', 'regional', 'Jawline — off-label augmentation, deep plane')
ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;

-- JUVEDERM VOLUMA XC — does_not_solve
UPDATE products SET does_not_solve = ARRAY[
  'dynamic expression lines (muscle movement requires neurotoxin)',
  'skin texture and roughness',
  'pigmentation or sun damage',
  'skin laxity without underlying volume deficit',
  'fine surface lines (requires softer filler or resurfacing)',
  'vascular concerns',
  'lip augmentation (wrong product for lips)'
]
WHERE id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9';

-- ============================================================
-- JUVEDERM VOLLURE XC — item_concerns
-- product_id: 7370545f-97a3-4519-a92d-3ac4f969829d
-- ============================================================

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
VALUES
  ('7370545f-97a3-4519-a92d-3ac4f969829d', '444b53c5-a40c-41f2-b378-05a042f67126', 'primary', 'primary', true,
   'FDA-cleared: correction of moderate-to-severe facial wrinkles/folds, primarily NLF (2017). Core indication.'),
  ('7370545f-97a3-4519-a92d-3ac4f969829d', '205406f5-f6f5-4fb7-aefb-7e1726c6f4ba', 'primary', 'primary', true,
   'FDA-cleared for perioral lines within the moderate-to-severe facial wrinkles/folds indication.'),
  ('7370545f-97a3-4519-a92d-3ac4f969829d', '2659d993-46af-47b0-b4f6-60e9142c168b', 'secondary', 'primary', false,
   'Marionette line correction — off-label but field-standard; intermediate G'' appropriate for this site.'),
  ('7370545f-97a3-4519-a92d-3ac4f969829d', 'b90ce295-5d33-4b46-a04b-2de1b6e61656', 'secondary', 'adjunctive', false,
   'Tear trough off-label; intermediate G'' may be appropriate; provider judgment required on anatomy.'),
  ('7370545f-97a3-4519-a92d-3ac4f969829d', 'd927bcd6-35f5-4118-baac-034e225b5ca1', 'secondary', 'primary', false,
   'General wrinkle correction; product is appropriate for mid-depth wrinkles in dynamic zones.')
ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
  relevance = EXCLUDED.relevance,
  treatment_role = EXCLUDED.treatment_role,
  is_fda_indicated = EXCLUDED.is_fda_indicated,
  notes = EXCLUDED.notes;

-- JUVEDERM VOLLURE XC — item_body_areas
INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
VALUES
  ('7370545f-97a3-4519-a92d-3ac4f969829d', '7ca85bf0-3763-478e-8f92-7fbb89a8a56c', 'bilateral', 'regional', 'Nasolabial fold area — primary indication'),
  ('7370545f-97a3-4519-a92d-3ac4f969829d', 'b63f5061-707f-45e5-a871-0c47ac71b937', 'na', 'regional', 'Perioral region — FDA-labeled for perioral lines'),
  ('7370545f-97a3-4519-a92d-3ac4f969829d', 'e1af3804-bbde-4700-95f8-921e1a3bdab8', 'na', 'precise', 'Perioral lines zone — retrograde threading, superficial to mid-dermal'),
  ('7370545f-97a3-4519-a92d-3ac4f969829d', '899db8bb-1ada-49d9-91ed-946c14142b8d', 'bilateral', 'regional', 'Marionette region — off-label fold correction'),
  ('7370545f-97a3-4519-a92d-3ac4f969829d', '76f8a051-2d93-403b-ac38-42a366cbf014', 'bilateral', 'precise', 'Tear trough zone — off-label; provider anatomy assessment required')
ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;

-- JUVEDERM VOLLURE XC — does_not_solve
UPDATE products SET does_not_solve = ARRAY[
  'deep volume restoration (requires volumetric filler like Voluma XC)',
  'lip augmentation (requires dedicated lip product)',
  'dynamic expression lines (requires neurotoxin)',
  'skin quality or texture',
  'pigmentation',
  'structural facial lift'
]
WHERE id = '7370545f-97a3-4519-a92d-3ac4f969829d';

-- ============================================================
-- SKINVIVE BY JUVEDERM — item_concerns
-- product_id: b74d5475-bf58-4d7d-87f5-2c8dc9e252de
-- ============================================================

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
VALUES
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', 'c6f4e9d3-0b5a-4c7f-9e4a-3d6b2f8c5a07', 'primary', 'primary', true,
   'FDA-cleared: improvement of skin smoothness in adult cheeks (2023). Skin quality is the core indication.'),
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', 'b5e3d8c2-9a4f-4b6e-8d3f-2c5a1e7b4f96', 'primary', 'primary', true,
   'Skin hydration is the primary mechanism — intradermal HA binds water at dermal level. FDA clearance supports this outcome.'),
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', 'd927bcd6-35f5-4118-baac-034e225b5ca1', 'secondary', 'adjunctive', false,
   'Fine lines improvement — secondary benefit from dermal hydration; not the primary FDA-cleared claim.'),
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', 'd587e18a-5ce2-4deb-b26a-b9f7943e8a06', 'secondary', 'primary', false,
   'Skin dullness — intradermal HA improves luminosity and glow; frequently patient-reported outcome.'),
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', '001de059-a4c0-4ec2-8e20-a10162ddedeb', 'adjunctive', 'adjunctive', false,
   'Skin texture — surface texture improvement secondary to intradermal hydration; not primary indication.')
ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
  relevance = EXCLUDED.relevance,
  treatment_role = EXCLUDED.treatment_role,
  is_fda_indicated = EXCLUDED.is_fda_indicated,
  notes = EXCLUDED.notes;

-- SKINVIVE — item_body_areas
INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
VALUES
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', '213c574f-732b-4017-80e1-6bf7e7b36acf', 'bilateral', 'regional', 'Cheeks — only FDA-labeled treatment zone. Intradermal grid technique.'),
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', 'fb888d96-924d-4d6a-b28b-617b4ab9ae26', 'na', 'broad', 'Full face — off-label extension of biorevitalization technique (international practice standard)')
ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;

-- SKINVIVE — does_not_solve
UPDATE products SET does_not_solve = ARRAY[
  'volume loss or facial deflation',
  'deep wrinkles or folds (NLF, marionette)',
  'dynamic expression lines (no muscle effect)',
  'structural facial lift or correction',
  'body contouring',
  'pigmentation, sun damage, or melasma',
  'significant skin laxity'
]
WHERE id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de';
