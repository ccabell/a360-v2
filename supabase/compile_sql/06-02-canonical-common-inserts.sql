-- Phase 06 Plan 04: Canonical + Common tier INSERT statements
-- 5 canonical (Botox + each HA filler) + 32 common pairs
-- All rows: is_active = false (D-06: Chris review required before publication)
-- Enum casts: ::relationship_type, ::relationship_strength
-- Dedup: WHERE NOT EXISTS on both orderings

-- =============================================================================
-- CANONICAL TIER (5 pairs) — Botox + each HA Filler
-- Content depth: FULL (clinical_rationale, timing_guidance, patient_education_text, staff_talking_points)
-- =============================================================================

-- #1: Botox Cosmetic + Juvederm Vollure XC — canonical
INSERT INTO item_relationships (
  id, item_a_id, item_b_id,
  relationship_type, relationship_strength, pairing_tier,
  clinical_rationale, timing_guidance, same_session_ok,
  patient_education_text, staff_talking_points,
  is_bidirectional, is_active, source_reference
)
SELECT
  gen_random_uuid(),
  '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid,
  '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid,
  'complementary'::relationship_type,
  'strong'::relationship_strength,
  'canonical',
  'Neurotoxin relaxes dynamic muscles causing expression lines; Vollure restores mid-depth volume in nasolabial folds and perioral areas. These address fundamentally different aspects of facial aging — movement-based lines vs. structural volume loss. The 90-woman dose-ranging study confirmed combination superiority, and multiple podcast experts endorse same-session administration. Botox immobilizes muscles, minimizing movement and allowing fillers to last longer.',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before filler to see muscle response before filling static lines. Maintenance: neurotoxin every 3-4 months, filler every 12-18 months (product-dependent). France legal flag: same-session prohibited in some jurisdictions.',
  true,
  'Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow''s feet. But it can''t restore volume that''s been lost over time. If you''re noticing both lines from movement AND a loss of fullness around your mouth or in your cheeks, filler addresses that volume loss through a completely different approach. Many patients find that treating both concerns creates a more balanced, natural-looking result than treating either one alone."',
  'When a patient comes in concerned about looking tired or aged, you might explain: "Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you''re also noticing that the lines around your mouth are deeper than they used to be, that''s volume loss, which Botox can''t address. Vollure works on a different layer to restore that fullness. Some patients choose to address both in the same visit, while others prefer to start with one and see how they feel." The key is helping patients understand these are two different problems requiring two different solutions -- not an upsell.',
  true,
  false,
  'PHASE_6_ANSWERS_PODCAST_SOURCED.md: 90-woman dose-ranging study (episode b2b96f9e), Dr. Teri Fisher BoNT-A synergy, Tracy Mancuso stacking protocol, AmSpa bundled practice data (25-40% higher annual spend)'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid)
     OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid)
);

-- #2: Botox Cosmetic + Juvederm Voluma XC — canonical
INSERT INTO item_relationships (
  id, item_a_id, item_b_id,
  relationship_type, relationship_strength, pairing_tier,
  clinical_rationale, timing_guidance, same_session_ok,
  patient_education_text, staff_talking_points,
  is_bidirectional, is_active, source_reference
)
SELECT
  gen_random_uuid(),
  '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid,
  '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid,
  'complementary'::relationship_type,
  'strong'::relationship_strength,
  'canonical',
  'Neurotoxin relaxes dynamic muscles causing expression lines; Voluma restores deep cheek volume and midface structure. These target entirely different tissue layers and aging mechanisms. The combination addresses both the upper-face dynamic wrinkles and midface volumetric deflation that together create an aged appearance. Supported by the 90-woman dose-ranging study and expert consensus across 8+ podcast shows.',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before filler to see muscle response before filling static lines. Maintenance: neurotoxin every 3-4 months, Voluma every 18-24 months.',
  true,
  'Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow''s feet. But it can''t restore volume that''s been lost over time. If you''re noticing that your cheeks look flatter than they used to, that''s a different kind of aging -- volume loss. Voluma restores that deep structure through a completely different approach. Many patients find that treating both concerns creates a more balanced, natural-looking result."',
  'When a patient comes in concerned about looking tired or aged, you might explain: "Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you''re also noticing that your cheeks look flatter than they used to, that''s volume loss, which Botox can''t address. Voluma works on a deeper layer to restore that structure. Some patients choose to address both in the same visit, while others prefer to start with one and see how they feel." The key is helping patients understand these are two different problems requiring two different solutions -- not an upsell.',
  true,
  false,
  'PHASE_6_ANSWERS_PODCAST_SOURCED.md: 90-woman dose-ranging study (episode b2b96f9e), Dr. Teri Fisher BoNT-A synergy, Tracy Mancuso stacking protocol'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid)
     OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid)
);

-- #3: Botox Cosmetic + Restylane Lyft — canonical
INSERT INTO item_relationships (
  id, item_a_id, item_b_id,
  relationship_type, relationship_strength, pairing_tier,
  clinical_rationale, timing_guidance, same_session_ok,
  patient_education_text, staff_talking_points,
  is_bidirectional, is_active, source_reference
)
SELECT
  gen_random_uuid(),
  '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid,
  'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid,
  'complementary'::relationship_type,
  'strong'::relationship_strength,
  'canonical',
  'Neurotoxin relaxes dynamic muscles causing expression lines; Restylane Lyft restores midface and hand volume. Cross-brand combination with identical mechanism complementarity — neuromodulation vs. HA gel scaffold at different tissue layers. Supported by category-level evidence including the 90-woman dose-ranging study and expert consensus.',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before filler. Maintenance: neurotoxin every 3-4 months, Lyft every 12 months.',
  true,
  'Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow''s feet. But it can''t restore volume that''s been lost over time. If you''re noticing both lines from movement AND a loss of fullness in your cheeks or hands, Restylane Lyft addresses that volume loss through a completely different approach. Many patients find that treating both concerns creates a more balanced, natural-looking result than treating either one alone."',
  'When a patient comes in concerned about looking tired or aged, you might explain: "Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you''re also noticing that your cheeks look flatter or your hands look thinner, that''s volume loss, which Botox can''t address. Restylane Lyft works on a different layer to restore that structure. Some patients choose to address both in the same visit, while others prefer to start with one and see how they feel."',
  true,
  false,
  'PHASE_6_ANSWERS_PODCAST_SOURCED.md: 90-woman dose-ranging study (episode b2b96f9e), category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid)
     OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid)
);

-- #4: Botox Cosmetic + RHA Redensity — canonical
INSERT INTO item_relationships (
  id, item_a_id, item_b_id,
  relationship_type, relationship_strength, pairing_tier,
  clinical_rationale, timing_guidance, same_session_ok,
  patient_education_text, staff_talking_points,
  is_bidirectional, is_active, source_reference
)
SELECT
  gen_random_uuid(),
  '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid,
  'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid,
  'complementary'::relationship_type,
  'strong'::relationship_strength,
  'canonical',
  'Neurotoxin relaxes dynamic muscles causing expression lines; RHA Redensity addresses perioral fine lines with flexible resilient HA technology. These target complementary facial zones — Botox for upper face dynamic wrinkles, RHA Redensity for perioral area fine lines that require a filler with elastic recovery for the dynamic lip region. Supported by category-level evidence and expert consensus.',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before filler. Maintenance: neurotoxin every 3-4 months, RHA Redensity every 6-12 months.',
  true,
  'Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow''s feet. But it can''t address the fine lines around your lips, which are caused by a combination of movement and lost volume. RHA Redensity uses a flexible gel designed specifically for that area, working through a completely different approach. Many patients find that treating both the upper face and lip area creates a more balanced, natural-looking result."',
  'When a patient comes in concerned about fine lines both around the eyes and around the mouth, you might explain: "Botox can help with the crow''s feet and forehead lines -- those are caused by muscle movement. But the lines around your lips are different -- they need a filler that can move with your expressions. RHA Redensity is designed for that dynamic area. Some patients choose to address both in the same visit, while others prefer to start with one area and see how they feel."',
  true,
  false,
  'PHASE_6_ANSWERS_PODCAST_SOURCED.md: 90-woman dose-ranging study (episode b2b96f9e), category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid)
     OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid)
);

-- #5: Botox Cosmetic + SKINVIVE by Juvederm — canonical
INSERT INTO item_relationships (
  id, item_a_id, item_b_id,
  relationship_type, relationship_strength, pairing_tier,
  clinical_rationale, timing_guidance, same_session_ok,
  patient_education_text, staff_talking_points,
  is_bidirectional, is_active, source_reference
)
SELECT
  gen_random_uuid(),
  '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid,
  'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid,
  'complementary'::relationship_type,
  'strong'::relationship_strength,
  'canonical',
  'Neurotoxin relaxes dynamic muscles causing expression lines; SKINVIVE improves overall skin quality via microdroplet HA hydration. These target completely different aspects of facial appearance — Botox addresses movement-based lines while SKINVIVE improves skin texture, smoothness, and glow. The combination treats both the structural cause of lines and the surface quality of the skin.',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before SKINVIVE. Maintenance: neurotoxin every 3-4 months, SKINVIVE every 6 months.',
  true,
  'Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow''s feet. But even when those lines are smoothed, your skin might still look dull or feel rough. SKINVIVE works differently -- it hydrates the skin from within using tiny droplets, improving the overall quality and glow of your skin. One addresses the lines, the other improves the skin itself. Many patients find the combination gives them a fresher, more rested look."',
  'When a patient is focused on looking refreshed, you might explain: "Botox can help with the expression lines -- frown lines, crow''s feet, forehead. But some patients tell us even after Botox, their skin still doesn''t look as vibrant as they''d like. SKINVIVE is designed to improve skin quality -- smoothness, hydration, glow -- through a completely different mechanism. Some patients choose to address both, while others prefer to start with one and add later."',
  true,
  false,
  'PHASE_6_ANSWERS_PODCAST_SOURCED.md: 90-woman dose-ranging study (episode b2b96f9e), category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid)
     OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid)
);


-- =============================================================================
-- COMMON TIER (32 pairs)
-- Batch 1 remainder: 20 non-Botox neurotoxin + HA filler pairs (#6-#25)
-- Batch 2: 5 neurotoxin + Sculptra pairs (#26-#30)
-- Batch 3: 1 Botox + Morpheus8 (#31)
-- Batch 4: 5 filler + Sculptra pairs (#51-#55)
-- Batch 6: 1 Sculptra + Morpheus8 (#76)
-- Content depth: FULL
-- =============================================================================

-- Helper: shared content for non-Botox neurotoxin + filler common pairs
-- clinical_rationale varies by specific product pair
-- patient_education_text and staff_talking_points use the shared canonical template with product-specific substitutions

-- ===== Daxxify + HA Fillers (5 pairs) =====

-- #6: Daxxify + Juvederm Vollure XC — common
INSERT INTO item_relationships (
  id, item_a_id, item_b_id,
  relationship_type, relationship_strength, pairing_tier,
  clinical_rationale, timing_guidance, same_session_ok,
  patient_education_text, staff_talking_points,
  is_bidirectional, is_active, source_reference
)
SELECT
  gen_random_uuid(),
  '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid,
  '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid,
  'complementary'::relationship_type,
  'strong'::relationship_strength,
  'common',
  'Neurotoxin relaxes dynamic muscles; Vollure restores mid-depth volume. Same mechanism complementarity as Botox+Vollure (canonical). Daxxify''s peptide formulation provides longer duration (median 6 months) which may reduce visit frequency. Less product-specific corpus evidence than Botox but identical clinical rationale.',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before filler. Maintenance: Daxxify every 6 months (longer than other neurotoxins), Vollure every 12-18 months.',
  true,
  'Tell the patient: "This neurotoxin helps relax the muscles that cause expression lines. But it can''t restore volume that''s been lost over time. If you''re noticing both lines from movement AND a loss of fullness, filler addresses that volume loss through a completely different approach. Many patients find that treating both concerns creates a more balanced, natural-looking result. Daxxify has the advantage of lasting longer between treatments."',
  'When a patient comes in concerned about looking tired or aged, you might explain: "This neurotoxin can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you''re also noticing deeper lines around your mouth or flatter cheeks, that''s volume loss, which neurotoxin can''t address. Vollure works on a different layer to restore that fullness. Some patients choose to address both in the same visit, while others prefer to start with one and see how they feel."',
  true,
  false,
  'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence, Daxxify peptide formulation discussion'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid)
     OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid)
);

-- #7: Daxxify + Juvederm Voluma XC — common
INSERT INTO item_relationships (
  id, item_a_id, item_b_id,
  relationship_type, relationship_strength, pairing_tier,
  clinical_rationale, timing_guidance, same_session_ok,
  patient_education_text, staff_talking_points,
  is_bidirectional, is_active, source_reference
)
SELECT
  gen_random_uuid(),
  '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid,
  '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid,
  'complementary'::relationship_type,
  'strong'::relationship_strength,
  'common',
  'Neurotoxin relaxes dynamic muscles; Voluma restores deep cheek volume. Same mechanism complementarity as canonical Botox+Voluma. Daxxify''s longer duration may reduce visit frequency, aligning well with Voluma''s 18-24 month duration.',
  'Same session or sequential visits. Neurotoxin administered first. Maintenance: Daxxify every 6 months, Voluma every 18-24 months.',
  true,
  'Tell the patient: "This neurotoxin helps relax the muscles that cause expression lines. But it can''t restore volume that''s been lost over time. If you''re noticing that your cheeks look flatter than they used to, Voluma restores that deep structure through a completely different approach. Many patients find that treating both concerns creates a more balanced result."',
  'When a patient comes in concerned about looking tired or aged, you might explain: "This neurotoxin can help with the lines around your eyes and forehead. But if you''re also noticing that your cheeks look flatter, that''s volume loss, which neurotoxin can''t address. Voluma works on a deeper layer to restore that structure. Some patients choose to address both in the same visit, while others prefer to start with one and see how they feel."',
  true,
  false,
  'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid)
     OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid)
);

-- #8: Daxxify + Restylane Lyft — common
INSERT INTO item_relationships (
  id, item_a_id, item_b_id,
  relationship_type, relationship_strength, pairing_tier,
  clinical_rationale, timing_guidance, same_session_ok,
  patient_education_text, staff_talking_points,
  is_bidirectional, is_active, source_reference
)
SELECT
  gen_random_uuid(),
  '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid,
  'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid,
  'complementary'::relationship_type,
  'strong'::relationship_strength,
  'common',
  'Neurotoxin relaxes dynamic muscles; Restylane Lyft restores midface/hand volume. Cross-manufacturer pair with identical clinical complementarity. Daxxify''s longer duration may reduce visit frequency.',
  'Same session or sequential visits. Neurotoxin administered first. Maintenance: Daxxify every 6 months, Lyft every 12 months.',
  true,
  'Tell the patient: "This neurotoxin helps relax the muscles that cause expression lines. But it can''t restore volume that''s been lost. If you''re noticing a loss of fullness in your cheeks or hands, filler addresses that through a completely different approach. Many patients find that treating both creates a more balanced, natural-looking result."',
  'When a patient has both movement-based lines and volume loss, you might explain: "Neurotoxin addresses one problem, filler addresses the other. They work on completely different layers. Some patients choose to address both in the same visit, while others prefer to start with one."',
  true,
  false,
  'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid)
     OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid)
);

-- #9: Daxxify + RHA Redensity — common
INSERT INTO item_relationships (
  id, item_a_id, item_b_id,
  relationship_type, relationship_strength, pairing_tier,
  clinical_rationale, timing_guidance, same_session_ok,
  patient_education_text, staff_talking_points,
  is_bidirectional, is_active, source_reference
)
SELECT
  gen_random_uuid(),
  '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid,
  'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid,
  'complementary'::relationship_type,
  'strong'::relationship_strength,
  'common',
  'Neurotoxin relaxes dynamic muscles; RHA Redensity addresses perioral fine lines with flexible HA. Both address facial aging from different mechanisms and in complementary zones.',
  'Same session or sequential visits. Neurotoxin administered first. Maintenance: Daxxify every 6 months, RHA Redensity every 6-12 months.',
  true,
  'Tell the patient: "This neurotoxin helps relax the muscles that cause expression lines in the upper face. But it can''t address the fine lines around your lips, which need a different approach. RHA Redensity uses a flexible gel designed specifically for that dynamic area. Many patients find treating both areas creates a more balanced result."',
  'When a patient has concerns about both upper face lines and perioral lines, explain: "These are two different problems. Neurotoxin works on the muscles causing upper face lines. The lip area needs a filler designed to move with your expressions. Some patients address both in the same visit."',
  true,
  false,
  'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid)
     OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid)
);

-- #10: Daxxify + SKINVIVE — common
INSERT INTO item_relationships (
  id, item_a_id, item_b_id,
  relationship_type, relationship_strength, pairing_tier,
  clinical_rationale, timing_guidance, same_session_ok,
  patient_education_text, staff_talking_points,
  is_bidirectional, is_active, source_reference
)
SELECT
  gen_random_uuid(),
  '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid,
  'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid,
  'complementary'::relationship_type,
  'strong'::relationship_strength,
  'common',
  'Neurotoxin relaxes dynamic muscles; SKINVIVE improves skin quality via microdroplet HA. Complementary targets: movement vs. texture/hydration.',
  'Same session or sequential visits. Neurotoxin administered first. Maintenance: Daxxify every 6 months, SKINVIVE every 6 months.',
  true,
  'Tell the patient: "This neurotoxin helps relax the muscles that cause expression lines. But even when those lines are smoothed, your skin might still look dull. SKINVIVE hydrates the skin from within, improving its overall quality and glow. One addresses the lines, the other improves the skin itself."',
  'When a patient wants to look refreshed overall, explain: "Neurotoxin can smooth the expression lines, but some patients still feel their skin doesn''t look vibrant enough. SKINVIVE works differently -- it improves skin quality through hydration. Some patients choose both for a comprehensive refreshed look."',
  true,
  false,
  'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid)
     OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid)
);

-- ===== Dysport + HA Fillers (5 pairs) =====

-- #11: Dysport + Juvederm Vollure XC — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Vollure restores mid-depth volume. Same mechanism complementarity as canonical Botox+Vollure. Dysport has faster onset and broader diffusion pattern.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Dysport every 3-4 months, Vollure every 12-18 months.', true,
'Tell the patient: "This neurotoxin helps relax the muscles that cause expression lines. But it can''t restore volume that''s been lost. Filler addresses that volume loss through a completely different approach. Many patients find that treating both creates a more balanced, natural-looking result."',
'When a patient has both expression lines and volume loss, explain: "These are two different problems requiring two different solutions. Neurotoxin addresses the movement, filler addresses the volume. Some patients choose to do both, others start with one."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid) OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #12: Dysport + Juvederm Voluma XC — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Voluma restores deep cheek volume. Same mechanism complementarity as canonical pair. Dysport has broader diffusion, useful for larger treatment areas.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Dysport every 3-4 months, Voluma every 18-24 months.', true,
'Tell the patient: "This neurotoxin helps relax the muscles that cause expression lines. But it can''t restore volume. If your cheeks look flatter, Voluma restores that deep structure through a different approach. Many patients find treating both creates a more balanced result."',
'When a patient has both expression lines and cheek volume loss, explain: "These are two different types of aging. Neurotoxin addresses the movement lines, Voluma addresses the volume loss. Some patients choose both, others start with one."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid) OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #13: Dysport + Restylane Lyft — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Restylane Lyft restores midface/hand volume. Cross-manufacturer pair with same complementarity. Dysport''s broader diffusion suits larger treatment areas.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Dysport every 3-4 months, Lyft every 12 months.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. Filler addresses volume loss in a completely different way. Many patients find treating both creates a more balanced, natural-looking result."',
'When a patient has both movement-based lines and volume loss: "These are two different problems. Neurotoxin addresses one, filler addresses the other. They work on different layers."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid) OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #14: Dysport + RHA Redensity — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; RHA Redensity addresses perioral fine lines with flexible HA. Complementary zones and mechanisms.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Dysport every 3-4 months, RHA Redensity every 6-12 months.', true,
'Tell the patient: "This neurotoxin helps relax expression lines in the upper face. The fine lines around your lips need a different approach -- a flexible filler designed for that dynamic area. Many patients find treating both creates a more balanced result."',
'When a patient has both upper face and perioral concerns: "These are different problems. Upper face lines are from muscle movement -- neurotoxin helps. Lip area lines need a flexible filler. Some patients address both in one visit."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid) OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #15: Dysport + SKINVIVE — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; SKINVIVE improves skin quality via microdroplet HA. Complementary targets: movement vs. texture/hydration.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Dysport every 3-4 months, SKINVIVE every 6 months.', true,
'Tell the patient: "This neurotoxin smooths expression lines. SKINVIVE hydrates your skin from within for improved glow and texture. One addresses the lines, the other improves the skin itself."',
'When a patient wants overall refreshment: "Neurotoxin smooths the lines from muscle movement. SKINVIVE improves skin quality -- hydration, glow, texture. They work differently and complement each other."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid) OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- ===== Jeuveau + HA Fillers (5 pairs) =====

-- #16: Jeuveau + Vollure — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Vollure restores mid-depth volume. Same mechanism complementarity as canonical pair. Jeuveau is a newer aesthetics-only neurotoxin with equivalent BoNT-A mechanism.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Jeuveau every 3-4 months, Vollure every 12-18 months.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. Filler addresses volume loss through a different approach. Many patients find treating both creates a more balanced result."',
'When a patient has both expression lines and volume loss: "These are two different problems. Neurotoxin addresses the movement, filler addresses the volume. Some patients choose both, others start with one."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid) OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- #17: Jeuveau + Voluma — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Voluma restores deep cheek volume. Same mechanism complementarity as canonical pair.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Jeuveau every 3-4 months, Voluma every 18-24 months.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. If your cheeks look flatter, Voluma restores that structure through a different approach. Treating both creates a more balanced result."',
'When a patient has expression lines and cheek volume loss: "These are two different types of aging. Neurotoxin addresses movement lines, Voluma addresses volume loss."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid) OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- #18: Jeuveau + Restylane Lyft — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Restylane Lyft restores midface/hand volume. Cross-manufacturer pair with same complementarity.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Jeuveau every 3-4 months, Lyft every 12 months.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. Filler addresses volume loss through a different approach. Treating both creates a more balanced result."',
'When a patient has both movement-based lines and volume loss: "These are two different problems. Neurotoxin addresses one, filler the other."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid) OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- #19: Jeuveau + RHA Redensity — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; RHA Redensity addresses perioral fine lines. Complementary zones and mechanisms.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Jeuveau every 3-4 months, RHA Redensity every 6-12 months.', true,
'Tell the patient: "This neurotoxin helps relax upper face expression lines. The fine lines around your lips need a flexible filler. Treating both creates a more balanced result."',
'When a patient has both upper face and perioral concerns: "Upper face lines are from movement. Lip lines need a flexible filler. Some patients address both in one visit."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid) OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- #20: Jeuveau + SKINVIVE — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; SKINVIVE improves skin quality via microdroplet HA. Complementary targets: movement vs. texture/hydration.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Jeuveau every 3-4 months, SKINVIVE every 6 months.', true,
'Tell the patient: "This neurotoxin smooths expression lines. SKINVIVE hydrates your skin from within for improved glow. One addresses lines, the other improves skin quality."',
'When a patient wants overall refreshment: "Neurotoxin smooths expression lines. SKINVIVE improves skin quality -- hydration, glow, texture. They complement each other."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid) OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- ===== Xeomin + HA Fillers (5 pairs) =====

-- #21: Xeomin + Vollure — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Vollure restores mid-depth volume. Same mechanism complementarity. Xeomin is pure neurotoxin (no complexing proteins), which may reduce antibody risk in long-term combination plans.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Xeomin every 3-4 months, Vollure every 12-18 months.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. Filler addresses volume loss through a different approach. Treating both creates a more balanced result."',
'When a patient has both expression lines and volume loss: "These are two different problems. Neurotoxin addresses movement, filler addresses volume."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid) OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

-- #22: Xeomin + Voluma — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Voluma restores deep cheek volume. Same mechanism complementarity. Xeomin''s purity may reduce antibody risk.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Xeomin every 3-4 months, Voluma every 18-24 months.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. Voluma restores cheek structure. Treating both creates a more balanced result."',
'When a patient has both expression lines and cheek volume loss: "These are different types of aging. Neurotoxin addresses movement, Voluma addresses volume."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid) OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

-- #23: Xeomin + Restylane Lyft — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Restylane Lyft restores midface/hand volume. Cross-manufacturer pair with same complementarity.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Xeomin every 3-4 months, Lyft every 12 months.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. Filler addresses volume loss through a different approach. Treating both creates a more balanced result."',
'When a patient has both movement-based lines and volume loss: "These are two different problems requiring two different solutions."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid) OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

-- #24: Xeomin + RHA Redensity — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; RHA Redensity addresses perioral fine lines. Complementary zones and mechanisms.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Xeomin every 3-4 months, RHA Redensity every 6-12 months.', true,
'Tell the patient: "This neurotoxin helps relax upper face expression lines. The lines around your lips need a flexible filler. Treating both creates a more balanced result."',
'When a patient has both upper face and perioral concerns: "Upper face lines are from movement. Lip lines need a flexible filler."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid) OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

-- #25: Xeomin + SKINVIVE — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; SKINVIVE improves skin quality via microdroplet HA. Complementary targets: movement vs. texture/hydration.',
'Same session or sequential visits. Neurotoxin first. Maintenance: Xeomin every 3-4 months, SKINVIVE every 6 months.', true,
'Tell the patient: "This neurotoxin smooths expression lines. SKINVIVE hydrates from within for improved glow. One addresses lines, the other improves skin quality."',
'When a patient wants overall refreshment: "Neurotoxin smooths expression lines. SKINVIVE improves skin quality. They complement each other."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+filler evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid) OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));


-- ===== Neurotoxin + Sculptra (5 pairs — Batch 2) =====

-- #26: Botox + Sculptra — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles causing expression lines; Sculptra stimulates collagen production for gradual volume restoration. Different mechanisms on different timelines — immediate muscle relaxation vs. gradual biologic collagen rebuilding. Expert consensus supports early biostimulator use. "They should be starting biostimulators the minute they''re done having babies."',
'Can be same session or staggered. Long-term plan: neurotoxin every 3-4 months, Sculptra series of 2-3 sessions 4-6 weeks apart, then annual maintenance. Start Sculptra early for collagen foundation, layer neurotoxin for dynamic lines.', true,
'Tell the patient: "Botox helps relax the muscles that cause expression lines. But over time you also lose the underlying volume and structure. Sculptra works over months to rebuild that foundation of collagen. They solve different parts of the aging process -- Botox addresses the lines you see now, Sculptra addresses the structure you''re losing underneath."',
'When a patient has both dynamic wrinkles and early volume loss, explain: "Botox can help with the expression lines -- those are caused by muscle movement. But if you''re starting to notice a loss of fullness or definition, that''s collagen loss, which develops gradually over time. Sculptra works to rebuild that collagen foundation over several months. Some patients find that addressing both gives them a more comprehensive result. The timing is flexible -- some do both together, others start with one."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: biostimulator start timing, multiple expert endorsements'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

-- #27: Daxxify + Sculptra — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Sculptra stimulates collagen for gradual volume restoration. Daxxify''s longer duration (median 6 months) aligns well with Sculptra''s gradual collagen rebuilding timeline.',
'Can be same session or staggered. Daxxify every 6 months, Sculptra series then annual maintenance.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. Sculptra works over months to rebuild collagen your skin has lost. They solve different parts of the aging process."',
'When a patient has both dynamic wrinkles and volume loss: "These are different aspects of aging. Neurotoxin addresses the movement-based lines. Sculptra rebuilds the collagen foundation gradually. Some patients address both."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+biostimulator evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

-- #28: Dysport + Sculptra — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Sculptra stimulates collagen for gradual volume restoration. Same complementarity as Botox+Sculptra with category-level evidence.',
'Can be same session or staggered. Dysport every 3-4 months, Sculptra series then annual maintenance.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. Sculptra works over months to rebuild collagen. They solve different parts of aging."',
'When a patient has both dynamic wrinkles and volume loss: "Neurotoxin addresses movement-based lines. Sculptra rebuilds the collagen foundation gradually."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+biostimulator evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #29: Jeuveau + Sculptra — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Sculptra stimulates collagen for gradual volume restoration. Same complementarity as Botox+Sculptra.',
'Can be same session or staggered. Jeuveau every 3-4 months, Sculptra series then annual maintenance.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. Sculptra works over months to rebuild collagen. They solve different parts of aging."',
'When a patient has both dynamic wrinkles and volume loss: "Neurotoxin addresses movement-based lines. Sculptra rebuilds collagen gradually."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+biostimulator evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- #30: Xeomin + Sculptra — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles; Sculptra stimulates collagen for gradual volume restoration. Xeomin''s purity (no complexing proteins) may reduce antibody concerns in long-term combination treatment plans.',
'Can be same session or staggered. Xeomin every 3-4 months, Sculptra series then annual maintenance.', true,
'Tell the patient: "This neurotoxin helps relax expression lines. Sculptra works over months to rebuild collagen. They solve different parts of aging."',
'When a patient has both dynamic wrinkles and volume loss: "Neurotoxin addresses movement lines. Sculptra rebuilds collagen. Some patients address both."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+biostimulator evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));


-- ===== Botox + Morpheus8 (Batch 3 — 1 pair elevated to common) =====

-- #31: Botox + Morpheus8 — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'strong'::relationship_strength, 'common',
'Morpheus8 RF microneedling improves skin texture and tightening via controlled thermal stimulation; Botox controls dynamic wrinkles via neuromodulation. Multi-modality stacking per Tracy Mancuso framework. Morpheus8 is the most-discussed energy device for combination protocols in the corpus.',
'Energy device first, then neurotoxin. Same-day possible per stacking protocols but allow inflammation assessment between procedures. If sequential: energy device 1-2 weeks before neurotoxin.', true,
'Tell the patient: "Morpheus8 uses radiofrequency energy to improve the firmness and texture of your skin. Botox addresses the lines caused by muscle movement. They work on completely different layers -- one improves the skin itself, the other calms the muscles underneath. Some patients find the combination gives a more comprehensive result."',
'When a patient wants both skin quality improvement and line reduction: "Morpheus8 improves skin texture and firmness through RF energy. Botox smooths the dynamic expression lines. They work on different aspects of facial aging. The timing matters -- we generally do energy treatment first, then neurotoxin. Some patients do both in the same visit, others prefer to space them."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: Tracy Mancuso stacking protocol, multi-modality approach, Morpheus8 combination discussions'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));


-- ===== HA Filler + Sculptra (5 pairs — Batch 4) =====

-- #51: Vollure + Sculptra — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'sequential'::relationship_type, 'strong'::relationship_strength, 'common',
'Sculptra builds collagen foundation over months; Vollure provides immediate mid-depth volume contouring. "Foundation + contour" protocol — Sculptra for gradual structural rebuilding, HA filler for precise correction. Different mechanisms (PLLA collagen stimulation vs. HA gel scaffold), different timelines, complementary results. Supported by Galderma "Sculpt & Lift" protocol and Dr. Tom van Eijk same-session evidence.',
'Sculptra first for foundation, then HA filler for contour. Can be same session (different tissue planes per Dr. van Eijk) or sequential (Sculptra series first, then refine with filler). Sculptra: 2-3 sessions, 4-6 weeks apart. HA filler: as needed for refinement.', true,
'Tell the patient: "Sculptra works gradually over several months to rebuild the collagen your skin has lost with age -- think of it as strengthening the foundation. Once that foundation is in place, filler can be used to add precise contour and definition. By starting with the foundation, you typically need less filler and the results look more natural and last longer."',
'When a patient has both volume loss and skin quality concerns, explain that addressing one without the other may leave them wanting more. "Sculptra rebuilds the underlying structure over time, while filler provides the immediate contour you''re looking for. Some patients choose to start with Sculptra to build a strong foundation, then add filler to refine. Others want some immediate results and choose to do both." Let the patient''s goals guide the conversation.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: Galderma Sculpt & Lift protocol, Dr. Tom van Eijk same-session protocol (Restylane fern pattern + Sculptra subdermal)'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

-- #52: Voluma + Sculptra — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'sequential'::relationship_type, 'strong'::relationship_strength, 'common',
'Sculptra builds collagen foundation; Voluma provides immediate deep cheek volume. Premium full-face rejuvenation plan combining gradual biologic restoration with precise structural correction.',
'Sculptra first for foundation, Voluma for deep cheek contour. Can be same session (different planes) or sequential. Sculptra series first, then Voluma refinement.', true,
'Tell the patient: "Sculptra rebuilds your skin''s collagen foundation over months. Voluma provides immediate deep volume to restore cheek structure. Starting with the foundation means you may need less filler and results last longer."',
'When a patient wants comprehensive cheek rejuvenation: "Sculptra rebuilds the collagen structure gradually. Voluma gives immediate deep volume. Some patients start with the foundation approach, others want some immediate results too."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: Sculpt & Lift protocol, foundation+contour evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));

-- #53: Restylane Lyft + Sculptra — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'sequential'::relationship_type, 'strong'::relationship_strength, 'common',
'Sculptra builds collagen foundation; Restylane Lyft provides immediate midface/hand volume. Cross-manufacturer complementary protocol with same foundation+contour rationale.',
'Sculptra first for foundation, Lyft for contour. Can be same session (different planes) or sequential.', true,
'Tell the patient: "Sculptra rebuilds collagen over months. Restylane Lyft provides immediate volume to restore facial and hand structure. Starting with the foundation approach can mean better, longer-lasting results."',
'When a patient has both collagen loss and volume needs: "Sculptra addresses the gradual collagen loss. Lyft provides immediate structure. Some patients combine both approaches."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: foundation+contour protocol, Dr. Tom van Eijk fern pattern + Sculptra subdermal'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid));

-- #54: RHA Redensity + Sculptra — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'sequential'::relationship_type, 'strong'::relationship_strength, 'common',
'Sculptra builds collagen foundation; RHA Redensity provides perioral detail work with flexible HA. Foundation + precision combination.',
'Sculptra first for foundation, RHA Redensity for perioral refinement. Can be same session (different tissue planes).', true,
'Tell the patient: "Sculptra rebuilds collagen over months. RHA Redensity addresses the fine lines around your lips with a flexible filler. Building the foundation first can give better results when we refine the details."',
'When a patient has both general volume loss and perioral lines: "Sculptra addresses the foundational collagen loss. RHA Redensity provides precision for the lip area."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: foundation+contour protocol evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid));

-- #55: SKINVIVE + Sculptra — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'sequential'::relationship_type, 'strong'::relationship_strength, 'common',
'Sculptra stimulates collagen for gradual foundational improvement; SKINVIVE improves skin quality via microdroplet HA hydration. Both address aging at different levels — structural collagen restoration vs. surface skin quality.',
'Sculptra first for collagen foundation. SKINVIVE layered for surface hydration and glow. Can be same session.', true,
'Tell the patient: "Sculptra rebuilds the collagen foundation underneath your skin. SKINVIVE improves skin quality and glow at the surface. Together they address aging at two different levels -- the structure underneath and the appearance on top."',
'When a patient wants comprehensive skin improvement: "Sculptra works underneath to rebuild collagen. SKINVIVE works at the surface for hydration and glow. Some patients combine both for a more complete approach."',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: biostimulator+skin quality evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid));


-- ===== Sculptra + Morpheus8 (Batch 6 — 1 pair elevated to common) =====

-- #76: Sculptra + Morpheus8 — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'strong'::relationship_strength, 'common',
'Sculptra stimulates collagen via PLLA particles; Morpheus8 stimulates collagen via controlled RF thermal energy. Double collagen stimulus from different mechanisms. "I love it in combination treatment with RF microneedling so that you get skin tightening from that RF microneedling. You get even more fibroblast stimulation and then some volume restoration from the Sculptra." Expert consensus supports high synergy.',
'Can be same session per Dr. Magdalena Bejma: "Combined treatments, even on the same day." If sequential: Sculptra series first for collagen foundation, then Morpheus8 for texture refinement. Maintenance: Sculptra annually, Morpheus8 1-2x per year.', true,
'Tell the patient: "Sculptra works beneath the surface to gradually rebuild the collagen your skin has lost -- it''s like strengthening the foundation. Morpheus8 uses radiofrequency energy to tighten and improve skin texture from a different angle. Together, they stimulate collagen production through two different pathways, which can create a more comprehensive improvement than either one alone."',
'When a patient has both volume loss and skin quality concerns: "Sculptra rebuilds your collagen foundation gradually over months. RF microneedling improves texture, firmness, and fine lines through controlled thermal stimulation. Many of our patients who want comprehensive rejuvenation find that addressing both gives them a result that neither treatment alone can achieve." Let patients know results are gradual -- this is about investing in their skin''s long-term health.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: Sculptra+RF microneedling expert discussion, Dr. Magdalena Bejma same-day protocol, fibroblast stimulation synergy'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid));

-- =============================================================================
-- END: 37 total INSERTs (5 canonical + 32 common)
-- All rows: is_active = false, is_bidirectional = true
-- All rows: enum casts on relationship_type and relationship_strength
-- All rows: WHERE NOT EXISTS dedup on both orderings
-- =============================================================================
