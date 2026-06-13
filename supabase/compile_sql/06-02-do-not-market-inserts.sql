-- Phase 06 Plan 04: Do Not Market tier INSERT statements
-- 17 do_not_market pairs: 10 neurotoxin alternatives + 7 HA filler alternatives
-- Per D-02: Emit as relationship_type='alternative'::relationship_type + pairing_tier='do_not_market'
-- Per D-16: Alternatives always get rows (substitution intelligence)
-- is_active = false (consistent with all other tiers)

-- =============================================================================
-- NEUROTOXIN ALTERNATIVES (10 pairs — Batch 12)
-- Same BoNT-A mechanism. These are substitution decisions, not combinations.
-- =============================================================================

-- #131: Botox vs Daxxify
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, 'alternative'::relationship_type, 'strong'::relationship_strength, 'do_not_market',
'Same BoNT-A mechanism. Alternative neurotoxins. Daxxify has longer duration (peptide formulation, median 6 months). Substitution decision based on duration preference, cost, and provider experience. Not a combination.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: neurotoxin comparison discussions. Dr. Eccleston same-session two-toxin practice acknowledged but does not change do_not_market tier.'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid) OR (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

-- #132: Botox vs Dysport
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, 'alternative'::relationship_type, 'strong'::relationship_strength, 'do_not_market',
'Same BoNT-A mechanism. Dysport has broader diffusion pattern, different dosing (2.5:1 unit ratio). Classic substitution choice. Not a combination.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: neurotoxin comparison discussions'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid) OR (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

-- #133: Botox vs Jeuveau
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'alternative'::relationship_type, 'strong'::relationship_strength, 'do_not_market',
'Same BoNT-A mechanism. Jeuveau often positioned on price (aesthetics-only brand). Substitution decision. Not a combination.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: neurotoxin comparison discussions'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid) OR (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

-- #134: Botox vs Xeomin
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'alternative'::relationship_type, 'strong'::relationship_strength, 'do_not_market',
'Same BoNT-A mechanism. Xeomin is pure toxin (no complexing proteins), may have lower antibody risk. 1:1 Botox equivalence. Substitution decision. Not a combination.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: neurotoxin comparison discussions'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid) OR (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

-- #135: Daxxify vs Dysport
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, 'alternative'::relationship_type, 'strong'::relationship_strength, 'do_not_market',
'Both are BoNT-A alternatives with different properties. Substitution decision. Not a combination.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: neurotoxin comparison discussions'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid) OR (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

-- #136: Daxxify vs Jeuveau
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'alternative'::relationship_type, 'strong'::relationship_strength, 'do_not_market',
'Both are BoNT-A alternatives. Substitution decision. Not a combination.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: neurotoxin comparison discussions'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid) OR (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

-- #137: Daxxify vs Xeomin
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'alternative'::relationship_type, 'strong'::relationship_strength, 'do_not_market',
'Both are BoNT-A alternatives. Substitution decision. Not a combination.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: neurotoxin comparison discussions'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid) OR (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

-- #138: Dysport vs Jeuveau
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'alternative'::relationship_type, 'strong'::relationship_strength, 'do_not_market',
'Both are BoNT-A alternatives. Substitution decision. Not a combination.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: neurotoxin comparison discussions'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid) OR (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #139: Dysport vs Xeomin
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'alternative'::relationship_type, 'strong'::relationship_strength, 'do_not_market',
'Both are BoNT-A alternatives. Substitution decision. Not a combination.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: neurotoxin comparison discussions'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid) OR (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #140: Jeuveau vs Xeomin
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'alternative'::relationship_type, 'strong'::relationship_strength, 'do_not_market',
'Both are BoNT-A alternatives. Substitution decision. Not a combination.',
true, false, 'PHASE_6_ANSWERS_PODCAST_SOURCED.md: neurotoxin comparison discussions'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid) OR (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));


-- =============================================================================
-- HA FILLER ALTERNATIVES (7 pairs — Batch 13, do_not_market subset)
-- Same HA gel mechanism at similar depths. Substitution decisions.
-- =============================================================================

-- #142: Vollure vs Restylane Lyft — do_not_market (both mid-depth volume)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'alternative'::relationship_type, 'moderate'::relationship_strength, 'do_not_market',
'Both target mid-depth volume. Cross-manufacturer alternatives for similar indications. Substitution decision based on product characteristics and provider preference.',
true, false, 'PAIRING_EVALUATION.md: same-depth HA filler alternatives'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid) OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid));

-- #145: Voluma vs Restylane Lyft — do_not_market (both deep cheek volume)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'alternative'::relationship_type, 'moderate'::relationship_strength, 'do_not_market',
'Both target deep cheek volume. Cross-manufacturer alternatives for midface volumization. Substitution decision.',
true, false, 'PAIRING_EVALUATION.md: same-depth HA filler alternatives'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid) OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));

-- #146: Voluma vs RHA Redensity — do_not_market
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'alternative'::relationship_type, 'weak'::relationship_strength, 'do_not_market',
'Voluma deep + RHA perioral could theoretically layer, but limited expert evidence for this specific combination. Do not market as a combination.',
true, false, 'PAIRING_EVALUATION.md: HA filler same-category evaluation'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid) OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));

-- #147: Voluma vs SKINVIVE — do_not_market
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'alternative'::relationship_type, 'weak'::relationship_strength, 'do_not_market',
'Voluma deep volume + SKINVIVE skin quality. Different purposes but same family. No expert evidence for this specific combination. Do not market as a pairing.',
true, false, 'PAIRING_EVALUATION.md: HA filler same-category evaluation'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid) OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid));

-- #148: Restylane Lyft vs RHA Redensity — do_not_market
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'alternative'::relationship_type, 'weak'::relationship_strength, 'do_not_market',
'Lyft midface + RHA perioral. Cross-manufacturer. Could theoretically layer but no specific expert evidence. Do not market as a combination.',
true, false, 'PAIRING_EVALUATION.md: HA filler same-category evaluation'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid) OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid));

-- #149: Restylane Lyft vs SKINVIVE — do_not_market
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'alternative'::relationship_type, 'weak'::relationship_strength, 'do_not_market',
'Lyft volume + SKINVIVE skin quality. Cross-manufacturer. No specific evidence for this combination. Do not market.',
true, false, 'PAIRING_EVALUATION.md: HA filler same-category evaluation'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid) OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid));

-- #150: RHA Redensity vs SKINVIVE — do_not_market
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'alternative'::relationship_type, 'weak'::relationship_strength, 'do_not_market',
'Both are superficial/skin-quality HA products. Most similar mechanism overlap of any filler pair. Do not market as a combination.',
true, false, 'PAIRING_EVALUATION.md: HA filler same-category evaluation'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid) OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid));

-- =============================================================================
-- END: 17 total INSERTs (10 neurotoxin alternatives + 7 HA filler alternatives)
-- All rows: relationship_type = 'alternative'::relationship_type
-- All rows: is_active = false, is_bidirectional = true
-- =============================================================================
