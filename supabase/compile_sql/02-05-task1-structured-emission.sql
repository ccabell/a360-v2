-- 02-05 Task 1: Structured Emission for Energy Device Products
-- Products: Morpheus8 (84ac561e), Sofwave (78973d13), Ultherapy PRIME (da25d447), Hollywood Spectra (be46f975)
-- Emits: item_concerns, item_body_areas, does_not_solve, aliases

-- ============================================================
-- 1. does_not_solve column — pre-condition (idempotent)
-- ============================================================
ALTER TABLE products ADD COLUMN IF NOT EXISTS does_not_solve text[];

-- ============================================================
-- 2. MORPHEUS8 — does_not_solve + item_concerns + item_body_areas
-- ============================================================

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

-- item_concerns for Morpheus8
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
  c.id,
  v.relevance::text,
  v.treatment_role::text,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Skin Laxity', 'primary', 'primary', true, 'FDA-cleared: subdermal adipose tissue remodeling improves mild-moderate skin laxity'),
  ('Acne Scarring', 'primary', 'primary', false, 'Well-documented off-label application; fractional RF remodels fibrous scar tissue'),
  ('Skin Texture', 'primary', 'primary', true, 'FDA-cleared: skin resurfacing indication'),
  ('Fine Lines', 'secondary', 'primary', false, 'Dermal collagen induction improves fine lines; deeper concerns addressed by structural lifting'),
  ('Stretch Marks', 'secondary', 'adjunctive', false, 'Off-label; subdermal RF remodeling has evidence for striae improvement'),
  ('Pore Size', 'secondary', 'primary', false, 'Collagen induction tightens periappendageal dermis reducing pore appearance')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'
  AND ic2.concern_id = c.id
);

-- item_body_areas for Morpheus8
INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
  ba.id,
  v.side,
  v.anatomy_specificity,
  v.notes
FROM (VALUES
  ('Face', 'bilateral', 'broad', 'Full face protocol; standard RF microneedling indication'),
  ('Neck', 'bilateral', 'broad', 'Submental and neck tightening; lower settings than face'),
  ('Abdomen', 'na', 'regional', 'Morpheus8 Body tip (8mm); body contouring and striae'),
  ('Chest', 'na', 'regional', 'Chest and décolletage skin quality improvement'),
  ('Thighs', 'bilateral', 'regional', 'Morpheus8 Body; striae and laxity')
) AS v(area_name, side, anatomy_specificity, notes)
JOIN body_areas ba ON ba.name ILIKE v.area_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'
  AND iba2.body_area_id = ba.id
);

-- ============================================================
-- 3. SOFWAVE — does_not_solve + item_concerns + item_body_areas
-- ============================================================

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
  v.relevance::text,
  v.treatment_role::text,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Skin Laxity', 'primary', 'primary', true, 'FDA-cleared for facial lines and wrinkles including submental and neck laxity'),
  ('Fine Lines', 'primary', 'primary', true, 'FDA-cleared for lines and wrinkles improvement'),
  ('Skin Texture', 'secondary', 'primary', false, 'Mid-dermal collagen induction improves overall skin quality and texture'),
  ('Jawline Definition', 'secondary', 'adjunctive', false, 'Mild tightening of lower facial contour with improved jawline definition')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '78973d13-fa36-41dd-8625-4b851ff143ed'
  AND ic2.concern_id = c.id
);

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '78973d13-fa36-41dd-8625-4b851ff143ed',
  ba.id,
  v.side,
  v.anatomy_specificity,
  v.notes
FROM (VALUES
  ('Face', 'bilateral', 'broad', 'Full face treatment including periorbital (with eye shields)'),
  ('Neck', 'bilateral', 'broad', 'FDA-cleared for neck and submental improvement'),
  ('Chest', 'na', 'broad', 'Décolletage line improvement')
) AS v(area_name, side, anatomy_specificity, notes)
JOIN body_areas ba ON ba.name ILIKE v.area_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '78973d13-fa36-41dd-8625-4b851ff143ed'
  AND iba2.body_area_id = ba.id
);

-- ============================================================
-- 4. ULTHERAPY PRIME — does_not_solve + item_concerns + item_body_areas
-- ============================================================

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
  v.relevance::text,
  v.treatment_role::text,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Skin Laxity', 'primary', 'primary', true, 'FDA-cleared: neck, chin, submental improvement; SMAS-level structural lifting'),
  ('Jawline Definition', 'primary', 'primary', false, 'Off-label but field-standard: SMAS lifting improves lower facial contour and jowling'),
  ('Fine Lines', 'secondary', 'primary', true, 'FDA-cleared for lines and wrinkles improvement via dermal collagen induction')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'
  AND ic2.concern_id = c.id
);

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  'da25d447-c316-40b2-802e-e190c0bdbd9f',
  ba.id,
  v.side,
  v.anatomy_specificity,
  v.notes
FROM (VALUES
  ('Face', 'bilateral', 'broad', 'Full face including brow and periorbital (FDA-cleared brow lift)'),
  ('Neck', 'bilateral', 'broad', 'FDA-cleared for neck laxity improvement'),
  ('Chest', 'na', 'broad', 'FDA-cleared for décolletage lines')
) AS v(area_name, side, anatomy_specificity, notes)
JOIN body_areas ba ON ba.name ILIKE v.area_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'
  AND iba2.body_area_id = ba.id
);

-- ============================================================
-- 5. HOLLYWOOD SPECTRA — does_not_solve + item_concerns + item_body_areas
-- ============================================================

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
  v.relevance::text,
  v.treatment_role::text,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Skin Texture', 'primary', 'primary', true, 'FDA-cleared skin resurfacing; Hollywood Peel protocol for no-downtime brightening'),
  ('Pore Size', 'primary', 'primary', false, 'Carbon peel protocol documented for pore minimization and oil reduction'),
  ('Fine Lines', 'secondary', 'adjunctive', false, 'Mild surface improvement; not primary indication'),
  ('Acne Scarring', 'adjunctive', 'adjunctive', false, 'Adjunctive role; less effective than RF microneedling for atrophic scars')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = 'be46f975-99d7-4772-867e-744814626654'
  AND ic2.concern_id = c.id
);

-- Special pigmentation concerns — may need concern table additions if not present
-- First check for pigmentation/brown spots type concerns
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  'be46f975-99d7-4772-867e-744814626654',
  c.id,
  'primary',
  'primary',
  true,
  'FDA-cleared for benign pigmented lesion treatment; Q-switched selective photothermolysis'
FROM concerns c
WHERE c.name ILIKE '%pigment%' OR c.name ILIKE '%sun damage%' OR c.name ILIKE '%age spot%' OR c.name ILIKE '%lentigo%' OR c.name ILIKE '%photodamage%'
AND NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = 'be46f975-99d7-4772-867e-744814626654'
  AND ic2.concern_id = c.id
);

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  'be46f975-99d7-4772-867e-744814626654',
  ba.id,
  v.side,
  v.anatomy_specificity,
  v.notes
FROM (VALUES
  ('Face', 'bilateral', 'broad', 'Primary indication: facial pigmentation, Hollywood Peel, skin brightening'),
  ('Neck', 'bilateral', 'broad', 'Solar lentigines and skin quality'),
  ('Chest', 'na', 'broad', 'Décolletage sun damage and pigmentation'),
  ('Hands', 'bilateral', 'broad', 'Age spots and sun damage on dorsal hands')
) AS v(area_name, side, anatomy_specificity, notes)
JOIN body_areas ba ON ba.name ILIKE v.area_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = 'be46f975-99d7-4772-867e-744814626654'
  AND iba2.body_area_id = ba.id
);

-- ============================================================
-- 6. ALIASES — patient language for energy device concerns
-- ============================================================

-- Aliases for skin laxity (already likely exists; adds if not present)
INSERT INTO aliases (phrase, concern_id, normalized)
SELECT v.phrase, c.id, lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
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
  SELECT 1 FROM aliases a
  WHERE a.normalized = lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
);

-- Aliases for acne scarring
INSERT INTO aliases (phrase, concern_id, normalized)
SELECT v.phrase, c.id, lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
FROM (VALUES
  ('acne scars'),
  ('pitting from acne'),
  ('ice pick scars'),
  ('rolling scars'),
  ('boxcar scars'),
  ('old acne marks'),
  ('pockmarks')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE 'Acne Scarring'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a
  WHERE a.normalized = lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
);

-- Aliases for pigmentation concerns
INSERT INTO aliases (phrase, concern_id, normalized)
SELECT v.phrase, c.id, lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
FROM (VALUES
  ('brown spots'),
  ('age spots'),
  ('sun spots'),
  ('liver spots'),
  ('dark spots'),
  ('discoloration'),
  ('blotchy skin'),
  ('uneven skin tone'),
  ('freckles that bother me')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE '%pigment%' OR c.name ILIKE '%photodamage%' OR c.name ILIKE '%sun damage%'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a
  WHERE a.normalized = lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
)
LIMIT 50; -- guard against over-insert if multiple matching concerns

-- Aliases for pore size
INSERT INTO aliases (phrase, concern_id, normalized)
SELECT v.phrase, c.id, lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
FROM (VALUES
  ('large pores'),
  ('big pores'),
  ('visible pores'),
  ('pore size'),
  ('open pores')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE '%pore%'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a
  WHERE a.normalized = lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
);
