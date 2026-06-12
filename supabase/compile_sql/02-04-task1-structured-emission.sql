-- 02-04 Task 1: Structured Emission — item_concerns, item_body_areas, aliases, does_not_solve
-- Product: Sculptra Aesthetic (2ce7a3d2-b06d-4b62-b9b7-4113afb51baa)
--
-- Concern IDs (reusing from 02-03 taxonomy + existing 39-row concerns table):
--   Cheek Volume Loss:         89d1ee67-5f54-43ae-a054-05f4700b7c73
--   Temple Hollowing:          63433ae1-36a8-42f7-9735-edc7e0844dc3
--   Jawline Definition:        81c06a11-ac4b-4574-9e42-35adffc4b610
--   Skin Laxity:               266857e0-ee39-4618-a3ea-30566f584a42
--   Nasolabial Folds:          444b53c5-a40c-41f2-b378-05a042f67126
--   Fine Lines & Wrinkles:     d927bcd6-35f5-4118-baac-034e225b5ca1
--   Age-Related Volume Loss:   a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85  (added in 02-03)
--
-- New concern needed: Buttock Augmentation (off-label PLLA use, body_contouring category)
--   ID: 9200f930-fe63-4b78-8428-625807c80a26
--
-- Body area IDs (reusing from 02-03):
--   Cheeks (area):             213c574f-732b-4017-80e1-6bf7e7b36acf
--   Submalar (zone):           94630fce-d910-4854-adb4-ef4196adf8f5
--   Temples (area):            30eab1a6-d818-431c-936f-746a843cee80
--   Jawline (area):            8d1b4ea7-a77a-4771-a024-e11cf54218c8
--   Nasolabial Folds (area):   7ca85bf0-3763-478e-8f92-7fbb89a8a56c
--   Midface (zone):            a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d
--   Full Face (area):          fb888d96-924d-4d6a-b28b-617b4ab9ae26

-- ============================================================
-- NEW CONCERN: Buttock Augmentation (off-label PLLA/biostimulator use)
-- Body_contouring category concern, patient-language: "Brazilian butt lift without surgery"
-- ============================================================

INSERT INTO concerns (id, name, category, patient_description, is_active)
VALUES (
  '9200f930-fe63-4b78-8428-625807c80a26',
  'Buttock Augmentation',
  'body_contouring',
  'Adding volume, shape, or projection to the buttock region through non-surgical means',
  true
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SCULPTRA AESTHETIC — item_concerns
-- product_id: 2ce7a3d2-b06d-4b62-b9b7-4113afb51baa
-- ============================================================

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
VALUES
  -- FDA-indicated primary indications
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85', 'primary', 'primary', true,
   'FDA-indicated: facial lipoatrophy (HIV patients, 2004) and cosmetic correction of nasolabial fold contour deficiencies (2009). Core biostimulation indication.'),
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '89d1ee67-5f54-43ae-a054-05f4700b7c73', 'primary', 'primary', true,
   'Cheek volume loss — within the FDA cosmetic indication for facial contour deficiencies. Biostimulation produces gradual cheek volumization via collagen neogenesis.'),
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '63433ae1-36a8-42f7-9735-edc7e0844dc3', 'primary', 'primary', false,
   'Temple hollowing — off-label but field-standard for diffuse facial volume restoration; PLLA biostimulation well-suited for the thin-skinned temporal zone when properly diluted.'),
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '444b53c5-a40c-41f2-b378-05a042f67126', 'primary', 'primary', true,
   'Nasolabial folds — FDA-indicated cosmetic indication (2009 approval). Biostimulation corrects contour deficiency by rebuilding deep collagen support.'),
  -- Secondary concerns
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '266857e0-ee39-4618-a3ea-30566f584a42', 'secondary', 'primary', false,
   'Skin laxity — progressive collagen production improves skin quality and firmness; not an FDA-labeled indication but consistent with mechanism.'),
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '81c06a11-ac4b-4574-9e42-35adffc4b610', 'secondary', 'adjunctive', false,
   'Jawline definition — off-label; biostimulation can improve jawline soft tissue definition in patients with mild-moderate laxity.'),
  -- Off-label body application
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '9200f930-fe63-4b78-8428-625807c80a26', 'adjunctive', 'adjunctive', false,
   'Buttock augmentation — off-label (non-surgical BBL); field-standard in experienced centers with very high dilution protocol. NOT FDA-indicated; safety profile differs from facial use.')
ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
  relevance = EXCLUDED.relevance,
  treatment_role = EXCLUDED.treatment_role,
  is_fda_indicated = EXCLUDED.is_fda_indicated,
  notes = EXCLUDED.notes;

-- ============================================================
-- SCULPTRA AESTHETIC — item_body_areas
-- ============================================================

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
VALUES
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', 'fb888d96-924d-4d6a-b28b-617b4ab9ae26', 'bilateral', 'broad', 'Full face — diffuse biostimulation for global collagen restoration'),
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '213c574f-732b-4017-80e1-6bf7e7b36acf', 'bilateral', 'regional', 'Cheeks — primary zone for facial volumetric correction'),
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '94630fce-d910-4854-adb4-ef4196adf8f5', 'bilateral', 'precise', 'Submalar zone — supraperiosteal depot for malar projection'),
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '30eab1a6-d818-431c-936f-746a843cee80', 'bilateral', 'regional', 'Temples — thin-skin zone; requires correct depth and dilution to avoid papules'),
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '8d1b4ea7-a77a-4771-a024-e11cf54218c8', 'bilateral', 'regional', 'Jawline — off-label biostimulation for mandibular soft tissue definition'),
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '7ca85bf0-3763-478e-8f92-7fbb89a8a56c', 'bilateral', 'regional', 'Nasolabial folds — FDA-indicated treatment zone'),
  ('2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'bilateral', 'precise', 'Midface — structural foundation zone for diffuse collagen restoration')
ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;

-- ============================================================
-- SCULPTRA AESTHETIC — does_not_solve
-- ============================================================

UPDATE products SET does_not_solve = ARRAY[
  'dynamic expression lines (muscle relaxation requires neurotoxin)',
  'immediate volume correction (delayed onset only — weeks to months)',
  'lip augmentation (not appropriate for labial tissue)',
  'fine surface lines (dermis-level PLLA injection increases papule risk)',
  'pigmentation or sun damage',
  'vascular concerns',
  'skin texture or roughness (not a resurfacing or skin quality treatment)'
]
WHERE id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa';

-- ============================================================
-- SCULPTRA AESTHETIC — aliases (patient language)
-- Maps to concern_ids
-- ============================================================

INSERT INTO aliases (phrase, concern_id, body_area_id)
VALUES
  -- Facial Volume Loss / Hollowing
  ('my face looks hollow', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85', NULL),
  ('gaunt cheeks', '89d1ee67-5f54-43ae-a054-05f4700b7c73', NULL),
  ('sunken cheeks', '89d1ee67-5f54-43ae-a054-05f4700b7c73', NULL),
  ('lost volume in my face', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85', NULL),
  ('my face looks deflated', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85', NULL),
  ('I look skeletal', 'a4f2c7d1-8b3e-4f5a-9c2d-7e1f0b6a3d85', NULL),
  -- Temple hollowing
  ('hollow temples', '63433ae1-36a8-42f7-9735-edc7e0844dc3', NULL),
  ('sunken temples', '63433ae1-36a8-42f7-9735-edc7e0844dc3', NULL),
  -- Jawline/Laxity
  ('saggy jawline', '81c06a11-ac4b-4574-9e42-35adffc4b610', NULL),
  ('loose skin on my face', '266857e0-ee39-4618-a3ea-30566f584a42', NULL),
  -- Off-label buttock
  ('non-surgical butt lift', '9200f930-fe63-4b78-8428-625807c80a26', NULL),
  ('liquid BBL', '9200f930-fe63-4b78-8428-625807c80a26', NULL),
  ('butt enhancement without surgery', '9200f930-fe63-4b78-8428-625807c80a26', NULL)
ON CONFLICT DO NOTHING;
