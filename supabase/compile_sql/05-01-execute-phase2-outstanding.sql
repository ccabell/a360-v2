-- 05-01: Execute Outstanding Phase 2 Structured Emission SQL
-- References: 02-04-task1-structured-emission.sql, 02-04-task2-structured-emission.sql,
--             02-05-task1-structured-emission.sql, 02-05-task2-structured-emission.sql
--
-- Execution notes:
-- 1. 02-04-task1 (Sculptra): item_concerns + does_not_solve already in DB from prior run.
--    item_body_areas: all bilateral rows inserted. Full Face (midline) correctly at side='na'.
--    Original file rejected because gl_check_side_laterality() blocks bilateral for Full Face.
--    All Sculptra rows confirmed present in live DB — skipped here.
--
-- 2. 02-04-task2 (Kybella, CoolSculpting): EXECUTED SUCCESSFULLY via direct file run.
--
-- 3. 02-05-task1 (Energy devices): Required bug fixes applied here:
--    - v.relevance::text → v.relevance::concern_relevance  (enum cast)
--    - v.treatment_role::text → v.treatment_role::treatment_role (enum cast)
--    - v.side cast to ::treatment_side
--    - v.anatomy_specificity cast to ::anatomy_specificity
--    - normalized column excluded from aliases INSERT (GENERATED column)
--    - Concern name mismatches: 'Fine Lines' → ILIKE '%fine line%'
--      'Acne Scarring' → ILIKE '%acne%'
--      'Pore Size' / 'Stretch Marks' → not in DB, skipped (no canonical target)
--
-- 4. 02-05-task2 (Neurotoxins + HydraFacial): Same enum cast fixes applied.
--    Concern name fix: 'Glabellar Lines' → 'Frown Lines' (actual DB name).
--    Dysport already fully populated (8 concerns) — skipped.
--
-- Supabase project: aejskvmpembryunnbgrk
-- Executed: 2026-06-13

-- ==============================================================
-- 02-05-task1 FIXED: Energy Device Structured Emission
-- Products: Morpheus8 (84ac561e), Sofwave (78973d13),
--           Ultherapy PRIME (da25d447), Hollywood Spectra (be46f975)
-- ==============================================================

-- does_not_solve column (idempotent)
ALTER TABLE products ADD COLUMN IF NOT EXISTS does_not_solve text[];

-- ---- MORPHEUS8 ----

UPDATE products
SET does_not_solve = ARRAY[
  'volume loss',
  'dynamic expression lines (no muscle effect)',
  'vascular lesions',
  'hyperpigmentation (primary pigment treatment)',
  'deep structural lifting (SMAS level)',
  'severe laxity requiring surgical correction'
]
WHERE id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df';

-- Morpheus8 item_concerns: named concerns (Skin Laxity, Skin Texture)
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
  c.id,
  v.relevance,
  v.treatment_role,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Skin Laxity',   'primary'::concern_relevance,   'primary'::treatment_role,   true,  'FDA-cleared: subdermal adipose tissue remodeling improves mild-moderate skin laxity'),
  ('Skin Texture',  'primary'::concern_relevance,   'primary'::treatment_role,   true,  'FDA-cleared: skin resurfacing indication')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'
  AND ic2.concern_id = c.id
);

-- Morpheus8: Acne & Breakouts (original SQL used 'Acne Scarring' — actual DB name differs)
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
  c.id,
  'primary'::concern_relevance,
  'primary'::treatment_role,
  false,
  'Well-documented off-label application; fractional RF remodels fibrous scar tissue'
FROM concerns c
WHERE c.name ILIKE '%acne%'
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'
  AND ic2.concern_id = c.id
);

-- Morpheus8: Fine Lines & Wrinkles (original SQL used 'Fine Lines')
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
  c.id,
  'secondary'::concern_relevance,
  'primary'::treatment_role,
  false,
  'Dermal collagen induction improves fine lines; deeper concerns addressed by structural lifting'
FROM concerns c
WHERE c.name ILIKE '%fine line%'
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'
  AND ic2.concern_id = c.id
);

-- Note: 'Pore Size' and 'Stretch Marks' are not canonical concerns in DB — skipped.

-- Morpheus8 item_body_areas (Face, Neck, Decolletage, Abdomen, Thighs)
-- side derived from ba.laterality to satisfy gl_check_side_laterality trigger
INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
  ba.id,
  CASE ba.laterality WHEN 'bilateral' THEN 'bilateral'::treatment_side ELSE 'na'::treatment_side END,
  v.specificity,
  v.notes
FROM (VALUES
  ('Face',     'broad'::anatomy_specificity,    'Full face protocol; standard RF microneedling indication'),
  ('Neck',     'broad'::anatomy_specificity,    'Submental and neck tightening; lower settings than face'),
  ('Decolletage','regional'::anatomy_specificity, 'Décolletage skin quality improvement'),
  ('Abdomen',  'regional'::anatomy_specificity, 'Morpheus8 Body tip (8mm); body contouring and striae'),
  ('Thighs',   'regional'::anatomy_specificity, 'Morpheus8 Body; striae and laxity')
) AS v(area_name, specificity, notes)
JOIN body_areas ba ON ba.name ILIKE v.area_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'
  AND iba2.body_area_id = ba.id
);

-- ---- SOFWAVE ----

UPDATE products
SET does_not_solve = ARRAY[
  'volume loss',
  'dynamic expression lines (no muscle effect)',
  'deep structural laxity requiring SMAS intervention',
  'pigmentation and vascular concerns',
  'acne scarring (subdermal remodeling)',
  'deep wrinkles requiring filler'
]
WHERE id = '78973d13-fa36-41dd-8625-4b851ff143ed';

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '78973d13-fa36-41dd-8625-4b851ff143ed',
  c.id,
  v.relevance,
  v.treatment_role,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Skin Laxity',       'primary'::concern_relevance,   'primary'::treatment_role,    true,  'FDA-cleared for facial lines and wrinkles including submental and neck laxity'),
  ('Skin Texture',      'secondary'::concern_relevance, 'primary'::treatment_role,    false, 'Mid-dermal collagen induction improves overall skin quality and texture'),
  ('Jawline Definition','secondary'::concern_relevance, 'adjunctive'::treatment_role, false, 'Mild tightening of lower facial contour with improved jawline definition')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '78973d13-fa36-41dd-8625-4b851ff143ed'
  AND ic2.concern_id = c.id
);

-- Sofwave: Fine Lines & Wrinkles
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '78973d13-fa36-41dd-8625-4b851ff143ed',
  c.id,
  'primary'::concern_relevance,
  'primary'::treatment_role,
  true,
  'FDA-cleared for lines and wrinkles improvement'
FROM concerns c
WHERE c.name ILIKE '%fine line%'
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '78973d13-fa36-41dd-8625-4b851ff143ed'
  AND ic2.concern_id = c.id
);

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '78973d13-fa36-41dd-8625-4b851ff143ed',
  ba.id,
  CASE ba.laterality WHEN 'bilateral' THEN 'bilateral'::treatment_side ELSE 'na'::treatment_side END,
  v.specificity,
  v.notes
FROM (VALUES
  ('Face',      'broad'::anatomy_specificity, 'Full face treatment including periorbital (with eye shields)'),
  ('Neck',      'broad'::anatomy_specificity, 'FDA-cleared for neck and submental improvement'),
  ('Decolletage','broad'::anatomy_specificity, 'Décolletage line improvement')
) AS v(area_name, specificity, notes)
JOIN body_areas ba ON ba.name ILIKE v.area_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '78973d13-fa36-41dd-8625-4b851ff143ed'
  AND iba2.body_area_id = ba.id
);

-- ---- ULTHERAPY PRIME ----

UPDATE products
SET does_not_solve = ARRAY[
  'volume loss',
  'dynamic expression lines (no muscle effect)',
  'pigmentation and vascular concerns',
  'acne scarring',
  'severe structural laxity requiring surgical correction',
  'skin texture irregularities (surface quality)'
]
WHERE id = 'da25d447-c316-40b2-802e-e190c0bdbd9f';

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  'da25d447-c316-40b2-802e-e190c0bdbd9f',
  c.id,
  v.relevance,
  v.treatment_role,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Skin Laxity',       'primary'::concern_relevance, 'primary'::treatment_role, true,  'FDA-cleared: neck, chin, submental improvement; SMAS-level structural lifting'),
  ('Jawline Definition','primary'::concern_relevance, 'primary'::treatment_role, false, 'Off-label but field-standard: SMAS lifting improves lower facial contour and jowling')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'
  AND ic2.concern_id = c.id
);

-- Ultherapy: Fine Lines & Wrinkles
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  'da25d447-c316-40b2-802e-e190c0bdbd9f',
  c.id,
  'secondary'::concern_relevance,
  'primary'::treatment_role,
  true,
  'FDA-cleared for lines and wrinkles improvement via dermal collagen induction'
FROM concerns c
WHERE c.name ILIKE '%fine line%'
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'
  AND ic2.concern_id = c.id
);

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  'da25d447-c316-40b2-802e-e190c0bdbd9f',
  ba.id,
  CASE ba.laterality WHEN 'bilateral' THEN 'bilateral'::treatment_side ELSE 'na'::treatment_side END,
  v.specificity,
  v.notes
FROM (VALUES
  ('Face',       'broad'::anatomy_specificity, 'Full face including brow and periorbital (FDA-cleared brow lift)'),
  ('Neck',       'broad'::anatomy_specificity, 'FDA-cleared for neck laxity improvement'),
  ('Decolletage','broad'::anatomy_specificity, 'FDA-cleared for décolletage lines')
) AS v(area_name, specificity, notes)
JOIN body_areas ba ON ba.name ILIKE v.area_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'
  AND iba2.body_area_id = ba.id
);

-- ---- HOLLYWOOD SPECTRA ----

UPDATE products
SET does_not_solve = ARRAY[
  'volume loss',
  'skin laxity (structural)',
  'dynamic expression lines (no muscle effect)',
  'deep structural facial aging',
  'acne scarring (subdermal fibrolysis)',
  'deep rhytides (requires filler or energy)'
]
WHERE id = 'be46f975-99d7-4772-867e-744814626654';

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  'be46f975-99d7-4772-867e-744814626654',
  c.id,
  v.relevance,
  v.treatment_role,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Skin Texture', 'primary'::concern_relevance, 'primary'::treatment_role, true, 'FDA-cleared skin resurfacing; Hollywood Peel protocol for no-downtime brightening')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = 'be46f975-99d7-4772-867e-744814626654'
  AND ic2.concern_id = c.id
);

-- Hollywood Spectra: Fine Lines & Wrinkles
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  'be46f975-99d7-4772-867e-744814626654',
  c.id,
  'secondary'::concern_relevance,
  'adjunctive'::treatment_role,
  false,
  'Mild surface improvement; not primary indication'
FROM concerns c
WHERE c.name ILIKE '%fine line%'
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = 'be46f975-99d7-4772-867e-744814626654'
  AND ic2.concern_id = c.id
);

-- Hollywood Spectra: Pigmentation concerns (Sun Damage, Hyperpigmentation, Uneven Skin Tone)
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  'be46f975-99d7-4772-867e-744814626654',
  c.id,
  'primary'::concern_relevance,
  'primary'::treatment_role,
  true,
  'FDA-cleared for benign pigmented lesion treatment; Q-switched selective photothermolysis'
FROM concerns c
WHERE (c.name ILIKE '%sun damage%' OR c.name ILIKE '%hyperpigment%' OR c.name ILIKE '%uneven skin tone%')
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = 'be46f975-99d7-4772-867e-744814626654'
  AND ic2.concern_id = c.id
);

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  'be46f975-99d7-4772-867e-744814626654',
  ba.id,
  CASE ba.laterality WHEN 'bilateral' THEN 'bilateral'::treatment_side ELSE 'na'::treatment_side END,
  v.specificity,
  v.notes
FROM (VALUES
  ('Face',       'broad'::anatomy_specificity, 'Primary indication: facial pigmentation, Hollywood Peel, skin brightening'),
  ('Neck',       'broad'::anatomy_specificity, 'Solar lentigines and skin quality'),
  ('Decolletage','broad'::anatomy_specificity, 'Décolletage sun damage and pigmentation'),
  ('Hands',      'broad'::anatomy_specificity, 'Age spots and sun damage on dorsal hands')
) AS v(area_name, specificity, notes)
JOIN body_areas ba ON ba.name ILIKE v.area_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = 'be46f975-99d7-4772-867e-744814626654'
  AND iba2.body_area_id = ba.id
);

-- ALIASES for energy device concerns (normalized is GENERATED — exclude from INSERT)
INSERT INTO aliases (phrase, concern_id)
SELECT v.phrase, c.id
FROM (VALUES
  ('loose skin'),
  ('sagging skin'),
  ('saggy face'),
  ('skin sagging'),
  ('jowls'),
  ('droopy cheeks'),
  ('turkey neck'),
  ('crepey skin')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE 'Skin Laxity'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a WHERE a.normalized = gl_normalize_text(v.phrase)
);

INSERT INTO aliases (phrase, concern_id)
SELECT v.phrase, c.id
FROM (VALUES
  ('acne scars'),
  ('pitting from acne'),
  ('ice pick scars'),
  ('rolling scars'),
  ('boxcar scars'),
  ('old acne marks'),
  ('pockmarks')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE '%acne%'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a WHERE a.normalized = gl_normalize_text(v.phrase)
);

INSERT INTO aliases (phrase, concern_id)
SELECT v.phrase, c.id
FROM (VALUES
  ('brown spots'),
  ('age spots'),
  ('sun spots'),
  ('liver spots'),
  ('dark spots'),
  ('blotchy skin'),
  ('freckles that bother me')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE '%sun damage%'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a WHERE a.normalized = gl_normalize_text(v.phrase)
);

INSERT INTO aliases (phrase, concern_id)
SELECT v.phrase, c.id
FROM (VALUES
  ('discoloration'),
  ('dark patches'),
  ('uneven skin tone')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE '%hyperpigment%'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a WHERE a.normalized = gl_normalize_text(v.phrase)
);

INSERT INTO aliases (phrase, concern_id)
SELECT v.phrase, c.id
FROM (VALUES
  ('large pores'),
  ('big pores'),
  ('visible pores'),
  ('open pores')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE 'Skin Texture'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a WHERE a.normalized = gl_normalize_text(v.phrase)
);

-- ==============================================================
-- 02-05-task2 FIXED: Neurotoxins (Dysport fully in DB — skipped)
-- Products: Jeuveau (8adda68a), Daxxify (007d98fd), Xeomin (92a05fe8)
-- HydraFacial Syndeo (product id via name lookup)
-- Fix: 'Glabellar Lines' → 'Frown Lines' (actual DB name)
-- ==============================================================

-- ---- JEUVEAU ----

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '8adda68a-9fd2-49ad-8852-641970135131',
  c.id,
  v.relevance,
  v.treatment_role,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Frown Lines',    'primary'::concern_relevance,   'primary'::treatment_role, true,  'FDA-indicated: only approved cosmetic indication for Jeuveau (NDA 761085)'),
  ('Forehead Lines', 'primary'::concern_relevance,   'primary'::treatment_role, false, 'Off-label field-standard application'),
  ('Crow''s Feet',   'primary'::concern_relevance,   'primary'::treatment_role, false, 'Off-label; lateral canthal lines')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '8adda68a-9fd2-49ad-8852-641970135131'
  AND ic2.concern_id = c.id
);

-- Jeuveau: Fine Lines & Wrinkles
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '8adda68a-9fd2-49ad-8852-641970135131',
  c.id,
  'secondary'::concern_relevance,
  'primary'::treatment_role,
  false,
  'Dynamic fine lines in treated areas'
FROM concerns c
WHERE c.name ILIKE '%fine line%'
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '8adda68a-9fd2-49ad-8852-641970135131'
  AND ic2.concern_id = c.id
);

UPDATE products SET
  does_not_solve = ARRAY[
    'volume loss', 'static etched lines (at rest)', 'skin laxity',
    'skin quality and texture', 'pigmentation', 'vascular concerns',
    'deep structural facial aging'
  ],
  fda_approved_areas = ARRAY['glabella (glabellar lines only — narrowest cosmetic approval in class)']
WHERE id = '8adda68a-9fd2-49ad-8852-641970135131';
-- Note: onset_time/peak_effect/duration_of_effect require canonical interval JSONB format
-- (gl_is_canonical_interval constraint). These are set by dossier SQL files, not here.

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '8adda68a-9fd2-49ad-8852-641970135131',
  ba.id,
  CASE ba.laterality WHEN 'bilateral' THEN 'bilateral'::treatment_side ELSE 'na'::treatment_side END,
  'broad'::anatomy_specificity,
  'Glabella FDA-indicated; other areas off-label only'
FROM body_areas ba
WHERE ba.name ILIKE 'Face'
AND NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '8adda68a-9fd2-49ad-8852-641970135131'
  AND iba2.body_area_id = ba.id
);

-- ---- DAXXIFY ----

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  c.id,
  v.relevance,
  v.treatment_role,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Frown Lines',    'primary'::concern_relevance, 'primary'::treatment_role, true,  'FDA-indicated: only approved cosmetic indication (NDA 761162); 40 Revance units, 6-month duration'),
  ('Forehead Lines', 'primary'::concern_relevance, 'primary'::treatment_role, false, 'Off-label; extended 6-month duration considerations for counseling'),
  ('Crow''s Feet',   'primary'::concern_relevance, 'primary'::treatment_role, false, 'Off-label; lateral canthal lines; duration counseling critical')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'
  AND ic2.concern_id = c.id
);

-- Daxxify: Fine Lines & Wrinkles
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  c.id,
  'secondary'::concern_relevance,
  'primary'::treatment_role,
  false,
  'Dynamic fine lines; longer duration of effect is key differentiator'
FROM concerns c
WHERE c.name ILIKE '%fine line%'
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'
  AND ic2.concern_id = c.id
);

UPDATE products SET
  does_not_solve = ARRAY[
    'volume loss', 'static etched lines (at rest)', 'skin laxity',
    'skin quality and texture', 'pigmentation', 'vascular concerns',
    'deep structural facial aging'
  ],
  fda_approved_areas = ARRAY['glabella (glabellar lines); 40 Revance units; median 6-month duration']
WHERE id = '007d98fd-58b5-4d20-be11-caf421c0dccb';

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  ba.id,
  CASE ba.laterality WHEN 'bilateral' THEN 'bilateral'::treatment_side ELSE 'na'::treatment_side END,
  'broad'::anatomy_specificity,
  'Glabella FDA-indicated; off-label applications require extended-duration counseling'
FROM body_areas ba
WHERE ba.name ILIKE 'Face'
AND NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'
  AND iba2.body_area_id = ba.id
);

-- ---- XEOMIN ----

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
  c.id,
  v.relevance,
  v.treatment_role,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Frown Lines',    'primary'::concern_relevance, 'primary'::treatment_role, true,  'FDA-indicated cosmetic approval (NDA 125360); 1:1 unit equivalence with Botox; naked toxin formulation'),
  ('Forehead Lines', 'primary'::concern_relevance, 'primary'::treatment_role, false, 'Off-label field-standard; room-temp storage advantage for mobile providers'),
  ('Crow''s Feet',   'primary'::concern_relevance, 'primary'::treatment_role, false, 'Off-label; lateral canthal lines')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'
  AND ic2.concern_id = c.id
);

-- Xeomin: Fine Lines & Wrinkles
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
  c.id,
  'secondary'::concern_relevance,
  'primary'::treatment_role,
  false,
  'Dynamic fine lines in treated areas'
FROM concerns c
WHERE c.name ILIKE '%fine line%'
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'
  AND ic2.concern_id = c.id
);

UPDATE products SET
  does_not_solve = ARRAY[
    'volume loss', 'static etched lines (at rest)', 'skin laxity',
    'skin quality and texture', 'pigmentation', 'vascular concerns',
    'deep structural facial aging'
  ],
  fda_approved_areas = ARRAY['glabella (glabellar lines, cosmetic); cervical dystonia (therapeutic); blepharospasm']
WHERE id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa';

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
  ba.id,
  CASE ba.laterality WHEN 'bilateral' THEN 'bilateral'::treatment_side ELSE 'na'::treatment_side END,
  'broad'::anatomy_specificity,
  'Glabella FDA-indicated cosmetically; cervical dystonia therapeutic; room-temp storage before reconstitution'
FROM body_areas ba
WHERE ba.name ILIKE 'Face'
AND NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'
  AND iba2.body_area_id = ba.id
);

-- NEUROTOXIN ALIASES (Frown Lines + Forehead Lines + Crow's Feet)
INSERT INTO aliases (phrase, concern_id)
SELECT v.phrase, c.id
FROM (VALUES
  ('frown lines'),
  ('the elevens'),
  ('11 lines'),
  ('angry lines between eyebrows'),
  ('furrow lines'),
  ('scowl lines'),
  ('glabellar furrows')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE '%frown%'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a WHERE a.normalized = gl_normalize_text(v.phrase)
);

INSERT INTO aliases (phrase, concern_id)
SELECT v.phrase, c.id
FROM (VALUES
  ('forehead wrinkles'),
  ('horizontal forehead lines'),
  ('forehead creases'),
  ('worry lines'),
  ('thinking lines')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE 'Forehead Lines'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a WHERE a.normalized = gl_normalize_text(v.phrase)
);

INSERT INTO aliases (phrase, concern_id)
SELECT v.phrase, c.id
FROM (VALUES
  ('laugh lines around eyes'),
  ('eye wrinkles'),
  ('squint lines'),
  ('smile lines by eyes')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE '%crow%'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a WHERE a.normalized = gl_normalize_text(v.phrase)
);

-- ---- HYDRAFACIAL SYNDEO ----

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  (SELECT id FROM products WHERE name ILIKE '%hydrafacial%' LIMIT 1),
  c.id,
  v.relevance,
  v.treatment_role,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Skin Texture',   'primary'::concern_relevance, 'primary'::treatment_role, false, 'HydraFacial Syndeo primary indication: skin texture improvement via vortex extraction + serum infusion'),
  ('Skin Hydration', 'primary'::concern_relevance, 'primary'::treatment_role, false, 'Core HydraFacial benefit: deep hydration via hyaluronic acid serum infusion'),
  ('Skin Dullness',  'primary'::concern_relevance, 'primary'::treatment_role, false, 'Brightening and luminosity improvement via antioxidant serums and exfoliation')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE (SELECT id FROM products WHERE name ILIKE '%hydrafacial%' LIMIT 1) IS NOT NULL
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = (SELECT id FROM products WHERE name ILIKE '%hydrafacial%' LIMIT 1)
  AND ic2.concern_id = c.id
);

-- HydraFacial: Acne & Breakouts (adjunctive)
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  (SELECT id FROM products WHERE name ILIKE '%hydrafacial%' LIMIT 1),
  c.id,
  'adjunctive'::concern_relevance,
  'adjunctive'::treatment_role,
  false,
  'Adjunctive role in acne-prone skin via salicylic acid booster serum'
FROM concerns c
WHERE c.name ILIKE '%acne%'
AND (SELECT id FROM products WHERE name ILIKE '%hydrafacial%' LIMIT 1) IS NOT NULL
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = (SELECT id FROM products WHERE name ILIKE '%hydrafacial%' LIMIT 1)
  AND ic2.concern_id = c.id
);

-- HydraFacial body areas
INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  (SELECT id FROM products WHERE name ILIKE '%hydrafacial%' LIMIT 1),
  ba.id,
  CASE ba.laterality WHEN 'bilateral' THEN 'bilateral'::treatment_side ELSE 'na'::treatment_side END,
  v.specificity,
  v.notes
FROM (VALUES
  ('Face',       'broad'::anatomy_specificity, 'Full face vortex extraction and serum infusion'),
  ('Neck',       'broad'::anatomy_specificity, 'Neck and décolletage extension common'),
  ('Decolletage','broad'::anatomy_specificity, 'Décolletage skin quality improvement')
) AS v(area_name, specificity, notes)
JOIN body_areas ba ON ba.name ILIKE v.area_name
WHERE (SELECT id FROM products WHERE name ILIKE '%hydrafacial%' LIMIT 1) IS NOT NULL
AND NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = (SELECT id FROM products WHERE name ILIKE '%hydrafacial%' LIMIT 1)
  AND iba2.body_area_id = ba.id
);
