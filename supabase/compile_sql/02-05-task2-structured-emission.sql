-- 02-05 Task 2: Structured Emission — Dysport, Jeuveau, Daxxify, Xeomin
-- item_concerns, item_body_areas, does_not_solve, aliases for neurotoxin products

-- ============================================================
-- Shared neurotoxin concerns (concerns are the same class as Botox)
-- Using insert-if-not-exists pattern for each product
-- ============================================================

-- All 4 neurotoxins share the same concern mapping pattern
-- Concerns: Glabellar Lines (frown lines), Forehead Lines, Crow's Feet, Platysmal Band Concern, etc.
-- Using dynamic lookup to handle concern name variations

-- DYSPORT item_concerns
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  'a7e1b29e-da10-40de-bea8-70d6e6624f43',
  c.id,
  v.relevance::text,
  v.treatment_role::text,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Glabellar Lines', 'primary', 'primary', true, 'FDA-indicated: moderate-to-severe glabellar lines in adults; NDA 125274'),
  ('Forehead Lines', 'primary', 'primary', false, 'Off-label but field-standard; temporary muscle relaxation reduces forehead rhytides'),
  ('Crow''s Feet', 'primary', 'primary', false, 'Off-label; lateral canthal lines improved by orbicularis oculi relaxation'),
  ('Fine Lines', 'secondary', 'primary', false, 'Dynamic fine lines in treated areas; broad concern category improvement')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'
  AND ic2.concern_id = c.id
);

UPDATE products SET
  does_not_solve = ARRAY[
    'volume loss',
    'static etched lines (at rest)',
    'skin laxity',
    'skin quality and texture',
    'pigmentation',
    'vascular concerns',
    'deep structural facial aging'
  ],
  onset_time = '2-3 days',
  peak_effect = '14 days',
  duration_of_effect = '3-4 months',
  fda_approved_areas = ARRAY['glabella (glabellar lines)', 'cervical musculature (cervical dystonia)']
WHERE id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43';

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  'a7e1b29e-da10-40de-bea8-70d6e6624f43',
  ba.id,
  'bilateral',
  'broad',
  'Full face neurotoxin applications; glabella is FDA-indicated, others off-label'
FROM body_areas ba
WHERE ba.name ILIKE 'Face'
AND NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'
  AND iba2.body_area_id = ba.id
);

-- JEUVEAU item_concerns + does_not_solve
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '8adda68a-9fd2-49ad-8852-641970135131',
  c.id,
  v.relevance::text,
  v.treatment_role::text,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Glabellar Lines', 'primary', 'primary', true, 'FDA-indicated: only approved cosmetic indication for Jeuveau (NDA 761085)'),
  ('Forehead Lines', 'primary', 'primary', false, 'Off-label field-standard application'),
  ('Crow''s Feet', 'primary', 'primary', false, 'Off-label; lateral canthal lines'),
  ('Fine Lines', 'secondary', 'primary', false, 'Dynamic fine lines in treated areas')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '8adda68a-9fd2-49ad-8852-641970135131'
  AND ic2.concern_id = c.id
);

UPDATE products SET
  does_not_solve = ARRAY[
    'volume loss',
    'static etched lines (at rest)',
    'skin laxity',
    'skin quality and texture',
    'pigmentation',
    'vascular concerns',
    'deep structural facial aging'
  ],
  onset_time = '2-3 days',
  peak_effect = '14 days',
  duration_of_effect = '3-4 months',
  fda_approved_areas = ARRAY['glabella (glabellar lines only — narrowest cosmetic approval in class)']
WHERE id = '8adda68a-9fd2-49ad-8852-641970135131';

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '8adda68a-9fd2-49ad-8852-641970135131',
  ba.id,
  'bilateral',
  'broad',
  'Glabella FDA-indicated; other areas off-label only'
FROM body_areas ba
WHERE ba.name ILIKE 'Face'
AND NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '8adda68a-9fd2-49ad-8852-641970135131'
  AND iba2.body_area_id = ba.id
);

-- DAXXIFY item_concerns + does_not_solve
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  c.id,
  v.relevance::text,
  v.treatment_role::text,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Glabellar Lines', 'primary', 'primary', true, 'FDA-indicated: only approved cosmetic indication (NDA 761162); 40 Revance units, 6-month duration'),
  ('Forehead Lines', 'primary', 'primary', false, 'Off-label; extended 6-month duration considerations for counseling'),
  ('Crow''s Feet', 'primary', 'primary', false, 'Off-label; lateral canthal lines; duration counseling critical'),
  ('Fine Lines', 'secondary', 'primary', false, 'Dynamic fine lines; longer duration of effect is key differentiator')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'
  AND ic2.concern_id = c.id
);

UPDATE products SET
  does_not_solve = ARRAY[
    'volume loss',
    'static etched lines (at rest)',
    'skin laxity',
    'skin quality and texture',
    'pigmentation',
    'vascular concerns',
    'deep structural facial aging'
  ],
  onset_time = '1-3 days',
  peak_effect = '14 days',
  duration_of_effect = '6 months (median)',
  fda_approved_areas = ARRAY['glabella (glabellar lines); 40 Revance units; median 6-month duration']
WHERE id = '007d98fd-58b5-4d20-be11-caf421c0dccb';

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  ba.id,
  'bilateral',
  'broad',
  'Glabella FDA-indicated; off-label applications require extended-duration counseling'
FROM body_areas ba
WHERE ba.name ILIKE 'Face'
AND NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'
  AND iba2.body_area_id = ba.id
);

-- XEOMIN item_concerns + does_not_solve
INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
  c.id,
  v.relevance::text,
  v.treatment_role::text,
  v.is_fda_indicated,
  v.notes
FROM (VALUES
  ('Glabellar Lines', 'primary', 'primary', true, 'FDA-indicated cosmetic approval (NDA 125360); 1:1 unit equivalence with Botox; naked toxin formulation'),
  ('Forehead Lines', 'primary', 'primary', false, 'Off-label field-standard; room-temp storage advantage for mobile providers'),
  ('Crow''s Feet', 'primary', 'primary', false, 'Off-label; lateral canthal lines'),
  ('Fine Lines', 'secondary', 'primary', false, 'Dynamic fine lines in treated areas')
) AS v(concern_name, relevance, treatment_role, is_fda_indicated, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'
  AND ic2.concern_id = c.id
);

UPDATE products SET
  does_not_solve = ARRAY[
    'volume loss',
    'static etched lines (at rest)',
    'skin laxity',
    'skin quality and texture',
    'pigmentation',
    'vascular concerns',
    'deep structural facial aging'
  ],
  onset_time = '3-5 days',
  peak_effect = '14 days',
  duration_of_effect = '3-4 months',
  fda_approved_areas = ARRAY['glabella (glabellar lines, cosmetic); cervical dystonia (therapeutic); blepharospasm']
WHERE id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa';

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
  ba.id,
  'bilateral',
  'broad',
  'Glabella FDA-indicated cosmetically; cervical dystonia therapeutic; room-temp storage before reconstitution'
FROM body_areas ba
WHERE ba.name ILIKE 'Face'
AND NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'
  AND iba2.body_area_id = ba.id
);

-- ============================================================
-- Additional neurotoxin aliases (shared concern - Glabellar Lines)
-- ============================================================

INSERT INTO aliases (phrase, concern_id, normalized)
SELECT v.phrase, c.id, lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
FROM (VALUES
  ('frown lines'),
  ('the elevens'),
  ('11 lines'),
  ('angry lines between eyebrows'),
  ('furrow lines'),
  ('scowl lines'),
  ('glabellar furrows')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE 'Glabellar Lines'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a
  WHERE a.normalized = lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
);

-- Forehead line aliases
INSERT INTO aliases (phrase, concern_id, normalized)
SELECT v.phrase, c.id, lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
FROM (VALUES
  ('forehead wrinkles'),
  ('horizontal forehead lines'),
  ('forehead creases'),
  ('worry lines'),
  ('thinking lines')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE 'Forehead Lines'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a
  WHERE a.normalized = lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
);

-- Crow's feet aliases
INSERT INTO aliases (phrase, concern_id, normalized)
SELECT v.phrase, c.id, lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
FROM (VALUES
  ('crow''s feet'),
  ('laugh lines around eyes'),
  ('eye wrinkles'),
  ('squint lines'),
  ('smile lines by eyes')
) AS v(phrase)
JOIN concerns c ON c.name ILIKE '%crow%' OR c.name ILIKE '%lateral canthal%'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases a
  WHERE a.normalized = lower(regexp_replace(v.phrase, '\s+', ' ', 'g'))
)
LIMIT 20;
