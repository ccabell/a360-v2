-- Phase 06 Plan 04: Conditional + Compatible_only tier INSERT statements
-- 51 conditional + 48 compatible_only = 99 pairs
-- All rows: is_active = false
-- Conditional: clinical_rationale + timing_guidance required. patient_education_text/staff_talking_points NULL.
-- Compatible_only: short clinical_rationale only. Other text fields NULL.
-- Enum casts: ::relationship_type, ::relationship_strength
-- Dedup: WHERE NOT EXISTS on both orderings

-- =============================================================================
-- CONDITIONAL TIER (51 pairs)
-- =============================================================================

-- ===== Batch 3: Non-Botox Neurotoxin + Energy Device (19 conditional) =====

-- #32: Botox + Sofwave — conditional
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave SUPERB mid-dermal ultrasound for tightening; Botox for dynamic lines. Complementary depths. Less product-specific evidence than Botox+Morpheus8.',
'Energy device first, neurotoxin after. Same-day possible per stacking protocols but allow inflammation assessment. If sequential: 1-2 weeks apart.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: Tracy Mancuso stacking protocol, multi-modality approach. Condition: provider discretion on same-day sequencing.'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

-- #33: Botox + Ultherapy PRIME — conditional
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy targets deep SMAS layer for lifting; Botox targets superficial muscles for dynamic wrinkles. Complementary tissue depths. Timing requires care.',
'Energy device first. If sequential: Ultherapy first, neurotoxin 1-2 weeks later.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: multi-modality stacking. Condition: allow SMAS inflammation to resolve before neurotoxin.'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

-- #34: Botox + Hollywood Spectra — conditional
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Hollywood Spectra addresses pigment/tone; Botox addresses dynamic movement. Different targets, less directly complementary than texture devices.',
'Energy device first. Sequential preferred: laser pigment correction before neurotoxin.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: multi-modality approach. Condition: less direct synergy, provider-driven sequencing.'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

-- Daxxify + energy devices (4 pairs: #35-#38)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF for texture/tightening; Daxxify for dynamic lines. Same multi-modality rationale as Botox+Morpheus8. Less product-specific evidence for Daxxify.',
'Energy first, neurotoxin after. Same-day possible with inflammation assessment.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level neurotoxin+energy evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave tightening + Daxxify dynamic lines. Category-level multi-modality rationale.',
'Energy first, neurotoxin after.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy deep tightening + Daxxify dynamic lines. Category-level multi-modality rationale.',
'Energy first, neurotoxin after.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Hollywood Spectra pigment + Daxxify dynamic lines. Different targets. Category-level rationale.',
'Energy first, neurotoxin after.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

-- Dysport + energy devices (4 pairs: #39-#42)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF texture + Dysport dynamic lines. Category-level multi-modality rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave tightening + Dysport dynamic lines. Category-level rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy deep tightening + Dysport dynamic lines. Category-level rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Hollywood Spectra pigment + Dysport dynamic lines. Different targets. Category-level rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- Jeuveau + energy devices (4 pairs: #43-#46)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF texture + Jeuveau dynamic lines. Category-level multi-modality rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave tightening + Jeuveau dynamic lines. Category-level rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy deep tightening + Jeuveau dynamic lines. Category-level rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Hollywood Spectra pigment + Jeuveau dynamic lines. Different targets. Category-level rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- Xeomin + energy devices (4 pairs: #47-#50)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF texture + Xeomin dynamic lines. Category-level multi-modality rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave tightening + Xeomin dynamic lines. Category-level rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy deep tightening + Xeomin dynamic lines. Category-level rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Hollywood Spectra pigment + Xeomin dynamic lines. Different targets. Category-level rationale.',
'Energy first, neurotoxin after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: category-level evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));


-- ===== Batch 5: HA Filler + Energy Device (17 conditional from 20 pairs) =====
-- 3 pairs are compatible_only (those with Hollywood Spectra weak strength)

-- Vollure + energy (3 conditional: Morpheus8, Sofwave, Ultherapy)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF for texture/tightening + Vollure for mid-depth volume. Energy-first sequencing per expert protocols.',
'Energy device first. Filler after skin heals. If same day: energy first, filler after. If sequential: 1-2 weeks.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: filler+energy stacking, "if skin looks like crap, filler won''t satisfy"'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave tightening + Vollure volume. Complementary layers: skin quality foundation before filler.',
'Energy first, filler after. Sequential preferred: 1-2 weeks apart.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy deep tightening + Vollure mid-depth volume. Different tissue depths.',
'Energy first, filler after. Sequential preferred.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

-- Voluma + energy (3 conditional: Morpheus8, Sofwave, Ultherapy)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF texture + Voluma deep cheek volume. Energy-first sequencing.',
'Energy first, filler after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave tightening + Voluma deep volume.',
'Energy first, filler after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy SMAS tightening + Voluma deep volume. Both target deep structures.',
'Energy first, filler after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));

-- Lyft + energy (2 conditional: Morpheus8, Sofwave — Ultherapy is conditional too, Hollywood Spectra is compatible_only)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF texture + Restylane Lyft midface/hand volume.',
'Energy first, filler after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave tightening + Lyft midface volume.',
'Energy first, filler after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy deep tightening + Lyft midface volume.',
'Energy first, filler after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid));

-- RHA + energy (3 conditional: Morpheus8, Sofwave, Ultherapy)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF texture + RHA Redensity perioral fine lines.',
'Energy first, filler after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave tightening + RHA Redensity perioral detail.',
'Energy first, filler after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy deep tightening + RHA Redensity perioral detail. Different depths.',
'Energy first, filler after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid));

-- SKINVIVE + energy (3 conditional: Morpheus8, Sofwave, Ultherapy)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF deep texture + SKINVIVE surface skin quality. Both improve skin quality from different depths.',
'Energy first, SKINVIVE after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave tightening + SKINVIVE skin quality. Complementary.',
'Energy first, SKINVIVE after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+skin quality stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy deep tightening + SKINVIVE surface hydration.',
'Energy first, SKINVIVE after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+skin quality stacking'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid));

-- Vollure + Hollywood Spectra — conditional (weak)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'weak'::relationship_strength, 'conditional',
'Hollywood Spectra addresses pigment/tone; Vollure addresses volume. Less directly complementary.',
'Laser pigment correction first, filler after skin heals.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler category evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

-- Voluma + Hollywood Spectra — conditional (weak)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'weak'::relationship_strength, 'conditional',
'Hollywood Spectra pigment correction + Voluma deep volume. Less direct complementarity.',
'Laser first, filler after.', true, true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: energy+filler category evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));


-- ===== Batch 6: Sculptra + remaining energy devices (3 conditional) =====

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sculptra collagen stimulation + Sofwave mid-dermal tightening. Complementary depths. Less product-specific evidence than Sculptra+Morpheus8.',
'Can be same session. Sequential: Sculptra series first, then Sofwave.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: biostimulator+energy evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sculptra collagen + Ultherapy deep tightening. "Sculptra for volume, Ultherapy for under chin and neck." Expert-discussed.',
'Can be same session. Sequential: Sculptra first, then Ultherapy.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: Sculptra+Ultherapy expert discussion'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'weak'::relationship_strength, 'conditional',
'Sculptra collagen + Hollywood Spectra pigment/tone. Less direct collagen synergy than RF devices.',
'Sequential: Sculptra first, then laser as needed.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: biostimulator+energy category evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid));


-- ===== Batch 7: Botox + HydraFacial (1 conditional) =====

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'HydraFacial skin prep + Botox injectable. 45% of HydraFacial patients go on to injectables (corpus data). Skincare foundation before injectable is expert-supported.',
'HydraFacial first as skincare foundation. Botox after or in same visit.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: HydraFacial 45% conversion data, skincare foundation approach'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));


-- ===== Batch 9: Energy x Energy cross-device (5 conditional) =====

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF (dermis/subdermal) + Sofwave SUPERB ultrasound (mid-dermal). Different depths, complementary collagen stimulation. Temperature layering framework.',
'Multi-energy stacking per Tracy Mancuso. Cumulative tissue trauma must be assessed. Provider discretion.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: Tracy Mancuso temperature layering'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid) OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF + Ultherapy MFU (deep SMAS). Different depths and mechanisms.',
'Multi-energy stacking. Provider discretion on same-session.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: temperature layering'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Morpheus8 RF texture + Hollywood Spectra laser pigment/tone. Complementary targets: texture vs. color. Temperature layering.',
'Multi-energy stacking. Provider discretion.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: temperature layering'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Sofwave ultrasound tightening + Hollywood Spectra laser pigment. Different targets. Temperature layering.',
'Multi-energy stacking. Provider discretion.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: temperature layering'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy deep ultrasound tightening + Hollywood Spectra surface pigment correction. Complementary depths and targets.',
'Multi-energy stacking. Provider discretion.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: temperature layering'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid));


-- ===== Batch 10: Morpheus8 + HydraFacial, Ultherapy + Kybella (2 conditional) =====

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'HydraFacial skin prep before RF microneedling. Skincare foundation supports device treatment outcomes.',
'HydraFacial first. Morpheus8 after or in same visit.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: skincare foundation approach'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Ultherapy submental tightening + Kybella submental fat reduction. Same area, complementary: tighten skin + reduce fat. Comprehensive double chin treatment.',
'Ultherapy for tightening, Kybella for fat. Sequential or combined per provider judgment.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: Ozempic face discussion, Ultherapy chin/neck evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid));


-- ===== Batch 11: CoolSculpting + Kybella (1 conditional) =====

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Both address submental fat via different mechanisms (cryolipolysis vs. deoxycholic acid). Could complement for resistant areas. Note: Kybella declining product flag.',
'Sequential. One mechanism first, assess results, then add the other if needed.', false, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: submental treatment discussion. LOW_CONFIDENCE.'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid));


-- ===== Batch 13: HA Filler depth-layering (3 conditional) =====

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Vollure mid-depth (NLF) + Voluma deep (cheeks). Different tissue depths within same family. Depth-layering protocol. Condition: different anatomical zones at different depths.',
'Same session possible. Voluma deep first, then Vollure mid-depth. Same family (Juvederm).', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: Dr. Tom van Eijk fern pattern protocol, depth-layering evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid) OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Vollure mid-depth (NLF) + RHA Redensity superficial (perioral). Different depths, complementary zones. Condition: different anatomical target zones.',
'Same session possible. Different anatomical zones.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: depth-layering evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid) OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'stacks_with'::relationship_type, 'moderate'::relationship_strength, 'conditional',
'Vollure volume + SKINVIVE skin quality. Different purposes entirely: structure vs. hydration. Condition: complementary goals (volume + skin quality).',
'Same session possible.', true, true, false,
'PHASE_6_ANSWERS_PODCAST_SOURCED.md: depth-layering evidence'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid) OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));


-- =============================================================================
-- COMPATIBLE_ONLY TIER (48 pairs)
-- Short clinical_rationale only. Other text fields NULL.
-- =============================================================================

-- Batch 5: filler + Hollywood Spectra weak pairs (3 compatible_only: #67, #71, #75)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'weak'::relationship_strength, 'compatible_only',
'Pigment correction + volume. Different targets, limited synergy. Safe in same treatment plan. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'weak'::relationship_strength, 'compatible_only',
'Pigment correction + perioral filler. Limited direct synergy. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'be46f975-99d7-4772-867e-744814626654'::uuid, 'stacks_with'::relationship_type, 'weak'::relationship_strength, 'compatible_only',
'Pigment correction + skin hydration. Limited complementarity. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid) OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid));


-- Batch 7: Neurotoxin + Body/Fat/Skincare (14 compatible_only)
-- Neurotoxin + CoolSculpting (5 pairs)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only',
'Different body areas (face vs body). No clinical synergy. Safe in same treatment plan. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only',
'Upper face neurotoxin + submental fat reduction. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

-- Remaining neurotoxin + CoolSculpting/Kybella/HydraFacial (12 compatible_only)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Different areas (face vs body). No clinical synergy. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skincare prep + neurotoxin. Less product-specific evidence. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skincare prep + neurotoxin. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skincare prep + neurotoxin. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skincare prep + neurotoxin. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));


-- Batch 8: HA Filler + Body/Fat/Skincare (15 compatible_only)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Face filler + body contouring. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Mid-face filler + submental fat. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skin prep + filler. Skincare foundation supports filler results. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Deep cheek filler + body contouring. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Cheek volume + submental fat. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skin prep + deep filler. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Midface/hand filler + body contouring. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Midface filler + submental fat. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skin prep + filler. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Perioral filler + body contouring. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Perioral + submental. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skin prep + perioral filler. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skin quality + body contouring. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skin quality + submental fat. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Both improve skin quality via different mechanisms (HA microdroplet vs. physical exfoliation). LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid));


-- Batch 9: Sofwave + Ultherapy (1 compatible_only — similar mechanism)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only',
'Both use ultrasound for tightening at different depths. Similar mechanism makes complementarity questionable. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid) OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid));


-- Batch 10: Energy + Body/Fat/Skincare (10 compatible_only)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Facial RF + body contouring. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Facial RF + submental fat. Limited overlap. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Facial tightening + body contouring. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Facial tightening + submental fat. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skin prep + tightening. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Deep tightening + body contouring. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skin prep + deep tightening. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'be46f975-99d7-4772-867e-744814626654'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Facial laser + body contouring. Different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'be46f975-99d7-4772-867e-744814626654'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Facial laser + submental fat. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'be46f975-99d7-4772-867e-744814626654'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Skin prep + pigment treatment. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'be46f975-99d7-4772-867e-744814626654'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = 'be46f975-99d7-4772-867e-744814626654'::uuid));


-- Batch 11: Body/Skincare x Body/Skincare (2 compatible_only — #129, #130)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Body contouring + facial skincare. Entirely different areas. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Submental fat + facial skincare. Limited overlap. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid));


-- Batch 14: Biostimulator + Body/Fat (2 compatible_only)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, '694ea839-cf8f-4a17-b838-2588674c792f'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Sculptra (collagen, primarily facial) + CoolSculpting (body fat). Different treatment areas. No clinical synergy. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid) OR (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid));

INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid, 'complementary'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'Sculptra collagen + Kybella fat reduction. Both can target lower face but through very different mechanisms. Limited expert discussion. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid) OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid));


-- Batch 15: Biostimulator + Skincare (1 compatible_only)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, same_session_ok, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid, 'enhances'::relationship_type, 'weak'::relationship_strength, 'compatible_only', 'HydraFacial skin prep + Sculptra injections. Skincare foundation before injectable. No specific expert discussion. LOW_CONFIDENCE.', NULL, true, false, 'LOW_CONFIDENCE'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid) OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid));

-- =============================================================================
-- END: 99 total INSERTs (51 conditional + 48 compatible_only)
-- =============================================================================
