-- 02-04 Task 2: Structured Emission — item_concerns, item_body_areas, aliases, does_not_solve
-- Products: Kybella (0f901fec) + CoolSculpting Elite (694ea839)
--
-- Existing concern IDs from taxonomy:
--   Submental Fullness:        (need to verify or use known ID)
-- From 02-03 taxonomy — concern IDs used in structured emission:
--   Skin Laxity:               266857e0-ee39-4618-a3ea-30566f584a42
-- New concerns to check/add for body contouring:
--   Submental Fullness: likely exists in the 39-row concerns table — use known pattern
--
-- NOTE: Concern IDs for body contouring areas must be checked at runtime.
-- The SQL below uses DO blocks to safely look up concern IDs by name before inserting,
-- avoiding hard-coded IDs that may differ in the live DB.

-- ============================================================
-- LOOK UP AND USE CONCERN IDS BY NAME (safe approach for less-common concerns)
-- ============================================================

DO $$
DECLARE
  v_submental_id    uuid;
  v_flank_id        uuid;
  v_abdominal_id    uuid;
  v_thigh_id        uuid;
  v_arm_id          uuid;
  v_bra_id          uuid;
  v_back_id         uuid;
  v_banana_id       uuid;
  v_skin_laxity_id  uuid := '266857e0-ee39-4618-a3ea-30566f584a42';  -- known from 02-03
  v_kybella_id      uuid := '0f901fec-5de5-4950-815e-82c3e47cb2ec';
  v_cs_id           uuid := '694ea839-cf8f-4a17-b838-2588674c792f';
BEGIN

  -- Resolve concern IDs by canonical name
  SELECT id INTO v_submental_id FROM concerns WHERE name ILIKE '%submental%' LIMIT 1;
  SELECT id INTO v_flank_id FROM concerns WHERE name ILIKE '%flank%' OR name ILIKE '%love handle%' LIMIT 1;
  SELECT id INTO v_abdominal_id FROM concerns WHERE name ILIKE '%abdomin%' OR name ILIKE '%belly%' LIMIT 1;
  SELECT id INTO v_thigh_id FROM concerns WHERE name ILIKE '%thigh%' LIMIT 1;
  SELECT id INTO v_arm_id FROM concerns WHERE name ILIKE '%arm%' OR name ILIKE '%upper arm%' LIMIT 1;
  SELECT id INTO v_bra_id FROM concerns WHERE name ILIKE '%bra%' OR name ILIKE '%back fat%' LIMIT 1;
  SELECT id INTO v_back_id FROM concerns WHERE name ILIKE '%back fat%' OR name ILIKE '%back%' AND name NOT ILIKE '%bra%' LIMIT 1;
  SELECT id INTO v_banana_id FROM concerns WHERE name ILIKE '%banana%' OR name ILIKE '%posterior thigh%' LIMIT 1;

  -- ============================================================
  -- KYBELLA — item_concerns
  -- Very narrow: submental fullness ONLY (FDA-indicated)
  -- ============================================================

  IF v_submental_id IS NOT NULL THEN
    INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
    VALUES
      (v_kybella_id, v_submental_id, 'primary', 'primary', true,
       'FDA-approved: reduction of moderate-to-severe submental fat (double chin) in adults (NDA 206333, 2015). Only FDA indication for deoxycholic acid injection.')
    ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
      relevance = EXCLUDED.relevance,
      treatment_role = EXCLUDED.treatment_role,
      is_fda_indicated = EXCLUDED.is_fda_indicated,
      notes = EXCLUDED.notes;
  END IF;

  -- ============================================================
  -- COOLSCULPTING ELITE — item_concerns
  -- Multiple FDA-cleared areas
  -- ============================================================

  IF v_submental_id IS NOT NULL THEN
    INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
    VALUES (v_cs_id, v_submental_id, 'primary', 'primary', true,
      'FDA-cleared for submental fat reduction (double chin) using CoolMini applicator. Non-invasive cryolipolysis.')
    ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
      relevance = EXCLUDED.relevance, is_fda_indicated = EXCLUDED.is_fda_indicated, notes = EXCLUDED.notes;
  END IF;

  IF v_flank_id IS NOT NULL THEN
    INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
    VALUES (v_cs_id, v_flank_id, 'primary', 'primary', true,
      'FDA-cleared for flank fat (love handles) reduction. CoolAdvantage C-Cup applicator. Core body contouring indication.')
    ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
      relevance = EXCLUDED.relevance, is_fda_indicated = EXCLUDED.is_fda_indicated, notes = EXCLUDED.notes;
  END IF;

  IF v_abdominal_id IS NOT NULL THEN
    INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
    VALUES (v_cs_id, v_abdominal_id, 'primary', 'primary', true,
      'FDA-cleared for abdominal fat reduction. CoolAdvantage applicator. Among the most commonly treated areas.')
    ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
      relevance = EXCLUDED.relevance, is_fda_indicated = EXCLUDED.is_fda_indicated, notes = EXCLUDED.notes;
  END IF;

  IF v_thigh_id IS NOT NULL THEN
    INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
    VALUES (v_cs_id, v_thigh_id, 'primary', 'primary', true,
      'FDA-cleared for inner and outer thigh fat. CoolFit and CoolSmooth PRO applicators for medial and lateral thigh respectively.')
    ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
      relevance = EXCLUDED.relevance, is_fda_indicated = EXCLUDED.is_fda_indicated, notes = EXCLUDED.notes;
  END IF;

  IF v_arm_id IS NOT NULL THEN
    INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
    VALUES (v_cs_id, v_arm_id, 'primary', 'primary', true,
      'FDA-cleared for upper arm fat reduction. Non-invasive alternative to liposuction for arm contouring.')
    ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
      relevance = EXCLUDED.relevance, is_fda_indicated = EXCLUDED.is_fda_indicated, notes = EXCLUDED.notes;
  END IF;

  IF v_bra_id IS NOT NULL THEN
    INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
    VALUES (v_cs_id, v_bra_id, 'primary', 'primary', true,
      'FDA-cleared for bra fat / upper back fat. Commonly treated area for patients bothered by bra-line bulging.')
    ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
      relevance = EXCLUDED.relevance, is_fda_indicated = EXCLUDED.is_fda_indicated, notes = EXCLUDED.notes;
  END IF;

  -- Skin laxity — secondary; CoolSculpting does NOT address but relevant as limitation
  INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
  VALUES (v_cs_id, v_skin_laxity_id, 'secondary', 'adjunctive', false,
    'CoolSculpting does NOT treat skin laxity. Concurrent laxity often treated with separate skin tightening device (Morpheus8, Ultherapy). Mapped adjunctive to document the limitation in combination planning context.')
  ON CONFLICT ON CONSTRAINT item_concerns_offering_id_concern_id_key DO UPDATE SET
    relevance = EXCLUDED.relevance, is_fda_indicated = EXCLUDED.is_fda_indicated, notes = EXCLUDED.notes;

END $$;

-- ============================================================
-- KYBELLA — item_body_areas (submental only)
-- Submental body area ID from body_areas table (64 rows)
-- ============================================================

DO $$
DECLARE
  v_submental_zone  uuid;
  v_submental_area  uuid;
  v_kybella_id      uuid := '0f901fec-5de5-4950-815e-82c3e47cb2ec';
  v_cs_id           uuid := '694ea839-cf8f-4a17-b838-2588674c792f';
  -- Body area IDs (look up by name — body_areas hierarchy)
  v_abdomen_area    uuid;
  v_flank_area      uuid;
  v_inner_thigh     uuid;
  v_outer_thigh     uuid;
  v_upper_arm_area  uuid;
  v_bra_area        uuid;
  v_back_area       uuid;
  v_banana_area     uuid;
BEGIN
  -- Resolve body area IDs
  SELECT id INTO v_submental_zone FROM body_areas WHERE name ILIKE '%submental%' AND level = 'zone' LIMIT 1;
  SELECT id INTO v_submental_area FROM body_areas WHERE name ILIKE '%submental%' AND level = 'area' LIMIT 1;
  IF v_submental_zone IS NULL THEN
    SELECT id INTO v_submental_zone FROM body_areas WHERE name ILIKE '%submental%' LIMIT 1;
  END IF;
  IF v_submental_area IS NULL THEN
    v_submental_area := v_submental_zone;
  END IF;

  SELECT id INTO v_abdomen_area FROM body_areas WHERE name ILIKE '%abdomen%' OR name ILIKE '%abdominal%' LIMIT 1;
  SELECT id INTO v_flank_area FROM body_areas WHERE name ILIKE '%flank%' LIMIT 1;
  SELECT id INTO v_inner_thigh FROM body_areas WHERE name ILIKE '%inner thigh%' OR (name ILIKE '%thigh%' AND name ILIKE '%inner%') LIMIT 1;
  SELECT id INTO v_outer_thigh FROM body_areas WHERE name ILIKE '%outer thigh%' OR (name ILIKE '%thigh%' AND name ILIKE '%outer%') LIMIT 1;
  SELECT id INTO v_upper_arm_area FROM body_areas WHERE name ILIKE '%upper arm%' OR (name ILIKE '%arm%' AND level = 'area') LIMIT 1;
  SELECT id INTO v_bra_area FROM body_areas WHERE name ILIKE '%bra%' LIMIT 1;
  SELECT id INTO v_back_area FROM body_areas WHERE name ILIKE '%back%' AND name NOT ILIKE '%bra%' AND level = 'area' LIMIT 1;
  SELECT id INTO v_banana_area FROM body_areas WHERE name ILIKE '%banana%' OR name ILIKE '%posterior thigh%' LIMIT 1;

  -- KYBELLA — submental body area only
  IF v_submental_zone IS NOT NULL THEN
    INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
    VALUES (v_kybella_id, v_submental_zone, 'na', 'precise', 'Submental zone — only FDA-approved injection site for Kybella. Stays ≥1.5 cm below mandibular margin to protect marginal mandibular nerve.')
    ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;
  END IF;

  -- COOLSCULPTING ELITE — multiple body areas
  IF v_submental_zone IS NOT NULL THEN
    INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
    VALUES (v_cs_id, v_submental_zone, 'na', 'precise', 'CoolMini applicator — FDA-cleared for submental fat.')
    ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;
  END IF;
  IF v_abdomen_area IS NOT NULL THEN
    INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
    VALUES (v_cs_id, v_abdomen_area, 'na', 'regional', 'CoolAdvantage C-Cup — abdominal fat reduction; most commonly treated area.')
    ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;
  END IF;
  IF v_flank_area IS NOT NULL THEN
    INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
    VALUES (v_cs_id, v_flank_area, 'bilateral', 'regional', 'CoolAdvantage C-Cup — love handles / flank fat. Bilateral DualSculpting available.')
    ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;
  END IF;
  IF v_inner_thigh IS NOT NULL THEN
    INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
    VALUES (v_cs_id, v_inner_thigh, 'bilateral', 'precise', 'CoolFit applicator — inner thigh fat reduction.')
    ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;
  END IF;
  IF v_outer_thigh IS NOT NULL THEN
    INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
    VALUES (v_cs_id, v_outer_thigh, 'bilateral', 'precise', 'CoolSmooth PRO applicator — outer thigh, non-pinchable fat.')
    ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;
  END IF;
  IF v_upper_arm_area IS NOT NULL THEN
    INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
    VALUES (v_cs_id, v_upper_arm_area, 'bilateral', 'regional', 'CoolAdvantage — upper arm fat. FDA-cleared.')
    ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;
  END IF;
  IF v_bra_area IS NOT NULL THEN
    INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
    VALUES (v_cs_id, v_bra_area, 'bilateral', 'regional', 'Bra fat / upper back fat — CoolAdvantage applicator. FDA-cleared.')
    ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;
  END IF;
  IF v_back_area IS NOT NULL AND v_back_area != v_bra_area THEN
    INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
    VALUES (v_cs_id, v_back_area, 'bilateral', 'regional', 'Back fat — CoolAdvantage applicator. FDA-cleared.')
    ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;
  END IF;
  IF v_banana_area IS NOT NULL THEN
    INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
    VALUES (v_cs_id, v_banana_area, 'bilateral', 'precise', 'Banana roll (posterior thigh below buttock crease) — FDA-cleared.')
    ON CONFLICT ON CONSTRAINT item_body_areas_offering_id_body_area_id_side_key DO NOTHING;
  END IF;

END $$;

-- ============================================================
-- KYBELLA — does_not_solve
-- ============================================================

UPDATE products SET does_not_solve = ARRAY[
  'skin laxity (removing fat may worsen loose skin — assess before treatment)',
  'body fat beyond submental (no FDA-approved indication for other body areas)',
  'facial volume loss',
  'muscle-related jawline or neck changes',
  'weight loss (not a systemic fat reduction treatment)',
  'jowl fat (off-label; different anatomy from submental fat pad)'
]
WHERE id = '0f901fec-5de5-4950-815e-82c3e47cb2ec';

-- ============================================================
-- COOLSCULPTING ELITE — does_not_solve
-- ============================================================

UPDATE products SET does_not_solve = ARRAY[
  'skin laxity (cryolipolysis does not tighten skin — may worsen laxity appearance if significant)',
  'visceral fat (only subcutaneous fat is treated; cryolipolysis cannot reach intra-abdominal fat)',
  'weight loss (body contouring only — not a weight management treatment)',
  'muscle tone (no effect on muscle; fat reduction without muscle development)',
  'cellulite (fat cell reduction does not address the fibrous septae responsible for cellulite texture)',
  'loose skin after fat removal (skin tightening requires separate treatment)'
]
WHERE id = '694ea839-cf8f-4a17-b838-2588674c792f';

-- ============================================================
-- ALIASES — body contouring patient language
-- Routed to concern_id via name lookup (DO block for safety)
-- ============================================================

DO $$
DECLARE
  v_submental_id  uuid;
  v_flank_id      uuid;
  v_abdominal_id  uuid;
  v_thigh_id      uuid;
  v_arm_id        uuid;
  v_bra_id        uuid;
BEGIN
  SELECT id INTO v_submental_id FROM concerns WHERE name ILIKE '%submental%' LIMIT 1;
  SELECT id INTO v_flank_id FROM concerns WHERE name ILIKE '%flank%' OR name ILIKE '%love handle%' LIMIT 1;
  SELECT id INTO v_abdominal_id FROM concerns WHERE name ILIKE '%abdomin%' OR name ILIKE '%belly%' LIMIT 1;
  SELECT id INTO v_thigh_id FROM concerns WHERE name ILIKE '%thigh%' LIMIT 1;
  SELECT id INTO v_arm_id FROM concerns WHERE name ILIKE '%arm%' OR name ILIKE '%upper arm%' LIMIT 1;
  SELECT id INTO v_bra_id FROM concerns WHERE name ILIKE '%bra%' OR name ILIKE '%back fat%' LIMIT 1;

  IF v_submental_id IS NOT NULL THEN
    INSERT INTO aliases (phrase, concern_id) VALUES
      ('double chin', v_submental_id),
      ('fat under my chin', v_submental_id),
      ('turkey neck fat', v_submental_id),
      ('chin waddle', v_submental_id)
    ON CONFLICT DO NOTHING;
  END IF;

  IF v_flank_id IS NOT NULL THEN
    INSERT INTO aliases (phrase, concern_id) VALUES
      ('love handles', v_flank_id),
      ('muffin top', v_flank_id),
      ('side fat', v_flank_id),
      ('hip fat', v_flank_id)
    ON CONFLICT DO NOTHING;
  END IF;

  IF v_abdominal_id IS NOT NULL THEN
    INSERT INTO aliases (phrase, concern_id) VALUES
      ('belly fat', v_abdominal_id),
      ('lower belly pooch', v_abdominal_id),
      ('stomach bulge', v_abdominal_id),
      ('pooch', v_abdominal_id)
    ON CONFLICT DO NOTHING;
  END IF;

  IF v_thigh_id IS NOT NULL THEN
    INSERT INTO aliases (phrase, concern_id) VALUES
      ('inner thigh fat', v_thigh_id),
      ('thigh gap', v_thigh_id),
      ('saddlebags', v_thigh_id),
      ('outer thigh fat', v_thigh_id)
    ON CONFLICT DO NOTHING;
  END IF;

  IF v_arm_id IS NOT NULL THEN
    INSERT INTO aliases (phrase, concern_id) VALUES
      ('arm flab', v_arm_id),
      ('bat wings', v_arm_id),
      ('upper arm fat', v_arm_id),
      ('jiggly arms', v_arm_id)
    ON CONFLICT DO NOTHING;
  END IF;

  IF v_bra_id IS NOT NULL THEN
    INSERT INTO aliases (phrase, concern_id) VALUES
      ('bra bulge', v_bra_id),
      ('bra fat', v_bra_id),
      ('back fat', v_bra_id),
      ('back rolls', v_bra_id)
    ON CONFLICT DO NOTHING;
  END IF;

END $$;
