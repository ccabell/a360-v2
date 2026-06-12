-- 02-03 Task 2: Structured Emission — Restylane Lyft + RHA Redensity
-- item_concerns, item_body_areas, does_not_solve

-- ============================================================
-- RESTYLANE LYFT — item_concerns
-- product_id: f1732c7c-3f19-4f3d-9aff-543a132e5506
-- ============================================================

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
VALUES
  -- FDA-indicated primary indications
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '89d1ee67-5f54-43ae-a054-05f4700b7c73', 'primary', 'primary', true,
   'FDA-cleared for cheek augmentation to correct age-related midface volume deficit (2015).'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '6557522f-d92c-4ed8-9636-0794d539ee24', 'primary', 'primary', true,
   'FDA-cleared for hand rejuvenation — only filler with this indication at launch (2018).'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '444b53c5-a40c-41f2-b378-05a042f67126', 'primary', 'primary', true,
   'FDA-cleared for moderate-to-severe NLF correction (original 2004 Restylane Lyft NDA).'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85', 'primary', 'primary', true,
   'Age-related volume loss drives the cheek augmentation FDA indication.'),
  -- Secondary/off-label field standard
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '2659d993-46af-47b0-b4f6-60e9142c168b', 'secondary', 'primary', false,
   'Marionette line correction — Lyft can address deep marionette lines; off-label field use.'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '63433ae1-36a8-42f7-9735-edc7e0844dc3', 'secondary', 'primary', false,
   'Temple volumization — off-label, field-standard.'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '81c06a11-ac4b-4574-9e42-35adffc4b610', 'secondary', 'primary', false,
   'Jawline definition — off-label deep plane augmentation.')
ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
  relevance = EXCLUDED.relevance,
  treatment_role = EXCLUDED.treatment_role,
  is_fda_indicated = EXCLUDED.is_fda_indicated,
  notes = EXCLUDED.notes;

-- RESTYLANE LYFT — item_body_areas
INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
VALUES
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '213c574f-732b-4017-80e1-6bf7e7b36acf', 'bilateral', 'regional', 'Cheeks — FDA-approved volumetric indication'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '94630fce-d910-4854-adb4-ef4196adf8f5', 'bilateral', 'precise', 'Submalar zone — deep supraperiosteal cheek lift'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'bilateral', 'precise', 'Midface zone — volumetric lift target'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '81b89b23-317f-40b5-9145-2bf0fc796abc', 'na', 'regional', 'Hands — FDA-approved dorsal hand rejuvenation'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '75722ec4-bda2-4cf7-82e1-a412b296f937', 'bilateral', 'regional', 'Hands area — subdermal injection between tendons'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'bilateral', 'precise', 'Dorsal hand zone — between extensor tendons, fanning technique'),
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', '7ca85bf0-3763-478e-8f92-7fbb89a8a56c', 'bilateral', 'regional', 'Nasolabial folds — FDA-approved fold correction')
ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;

-- RESTYLANE LYFT — does_not_solve
UPDATE products SET does_not_solve = ARRAY[
  'dynamic expression lines (requires neurotoxin)',
  'skin quality or texture',
  'pigmentation and sun damage',
  'fine surface perioral lines (requires softer product like RHA Redensity)',
  'lip augmentation (requires dedicated lip product)',
  'significant skin laxity without volume deficit'
]
WHERE id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506';

-- ============================================================
-- RHA REDENSITY — item_concerns
-- product_id: d8a00419-39e1-4d4b-8dab-ad134fb00930
-- ============================================================

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
VALUES
  -- FDA-indicated primary
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', '205406f5-f6f5-4fb7-aefb-7e1726c6f4ba', 'primary', 'primary', true,
   'FDA-cleared for perioral rhytids (2020) — core and only FDA indication for RHA Redensity.'),
  -- FDA-adjacent (perioral lines are the specific indication; dynamic wrinkle correction captures the technology differentiation)
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', 'f9c7b2a6-3e8d-4f0c-2b7d-6a9e5c1f8d30', 'primary', 'primary', false,
   'Dynamic wrinkle correction is the core technology differentiation — elastic HA designed for movement zones.'),
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', 'd927bcd6-35f5-4118-baac-034e225b5ca1', 'secondary', 'primary', false,
   'Fine lines and wrinkles — superficial to mid-dermal correction in dynamic zones; off-label extension of perioral indication.'),
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', 'b90ce295-5d33-4b46-a04b-2de1b6e61656', 'secondary', 'adjunctive', false,
   'Tear trough — off-label; RHA elastic properties well-suited for mobile under-eye; requires anatomical expertise.')
ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
  relevance = EXCLUDED.relevance,
  treatment_role = EXCLUDED.treatment_role,
  is_fda_indicated = EXCLUDED.is_fda_indicated,
  notes = EXCLUDED.notes;

-- RHA REDENSITY — item_body_areas
INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
VALUES
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', 'b63f5061-707f-45e5-a871-0c47ac71b937', 'na', 'regional', 'Perioral region — FDA-cleared indication'),
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', 'e1af3804-bbde-4700-95f8-921e1a3bdab8', 'na', 'precise', 'Perioral lines zone — superficial retrograde threading, core technique'),
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', '76f8a051-2d93-403b-ac38-42a366cbf014', 'bilateral', 'precise', 'Tear trough zone — off-label; elastic recovery properties make this suitable; provider expertise required'),
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', '7786cdde-39df-445a-9db0-c7a6751176df', 'bilateral', 'regional', 'Periorbital area — off-label fine line and under-eye hollow correction')
ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;

-- RHA REDENSITY — does_not_solve
UPDATE products SET does_not_solve = ARRAY[
  'deep volume restoration or structural lift',
  'cheek augmentation',
  'lip augmentation (volume addition)',
  'dynamic expression lines (requires neurotoxin)',
  'skin quality or texture (not an intradermal hydrator)',
  'deep nasolabial folds (requires higher G'' product)',
  'body contouring'
]
WHERE id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930';
