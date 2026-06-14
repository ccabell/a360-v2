-- Phase 06 Plan 04 / Phase 10 Reconciled: canonical + common tier INSERT statements
-- Regenerated 2026-06-14 from REVIEW_QUEUE/pairings/ review cards
-- Podcast contamination removed per EVIDENCE_MODEL.md (Phase 09)
-- All rows: is_active = false (Chris review required before publication)
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
  'Neurotoxin relaxes dynamic muscles; Vollure restores mid-depth volume (NLF). Published evidence supports the combination of BoNT-A with HA fillers as superior to either modality alone (DOI 10.1097/DSS.0000000000000754). Botox addresses movement-based lines that Vollure cannot treat, while Vollure addresses static volume loss that Botox cannot restore. Together they provide a more complete facial rejuvenation than either treatment alone.',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before filler to see muscle response before filling static lines. Maintenance: neurotoxin every 3-4 months, filler every 12-18 months (product-dependent).',
  true,
  'Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow''s feet. But it can''t address the deeper lines that stay even when your face is at rest -- like the lines that run from your nose to the corners of your mouth, or the moderate lines around your mouth area. Those are caused by volume loss, not muscle movement. Vollure is designed specifically for those nasolabial folds and moderate facial lines, softening them by restoring volume at the right depth. Many patients find that treating both the movement-based lines and these static lines creates a more complete, natural-looking result."',
  '"When a patient comes in concerned about looking tired or aged, you might explain: ''Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you''re also noticing deeper lines from your nose to the corners of your mouth -- those nasolabial folds -- those are caused by volume loss, which Botox can''t address. Vollure is designed to soften those specific lines by restoring volume at the mid-depth level. Some patients choose to address both in the same visit, while others prefer to start with one and see how they feel.'' The key is helping patients understand these are two different types of lines -- one from movement, one from volume loss -- not an upsell."',
  true,
  false,
  'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Botox Cosmetic; FDA label -- Juvederm Vollure XC; Expert consensus'
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
  'Neurotoxin relaxes dynamic muscles; Voluma restores deep cheek volume. Botox addresses movement-based lines (crow''s feet, frown lines, forehead) while Voluma provides structural volume in the midface where bone and fat pad loss creates a hollow, aged appearance. Published evidence supports combination use of BoNT-A with HA fillers, with data suggesting enhanced outcomes compared to either modality alone (DOI 10.1097/DSS.0000000000000754). Together they address both the upper face (dynamic lines) and midface (volume loss).',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before filler to see muscle response before filling static lines. Maintenance: neurotoxin every 3-4 months, Voluma every 18-24 months.',
  true,
  'Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow''s feet. But it can''t restore the deep volume that''s been lost over time in areas like the cheeks. If you''re noticing that your cheeks look flatter or more hollow than they used to, that''s a different kind of aging -- it''s structural volume loss from bone and fat pad changes. Voluma is designed specifically to restore that deep cheek structure, giving back the lift and contour that supports the rest of your face. Many patients find that treating both the movement-based lines and the midface volume creates a more balanced, natural-looking result."',
  '"When a patient comes in concerned about looking tired or aged, you might explain: ''Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you''re also noticing that your cheeks look flatter or more hollow than they used to, that''s structural volume loss in the midface, which Botox can''t address. Voluma is designed for deep cheek restoration -- it provides the structural support that lifts and contours your midface. Some patients choose to address both in the same visit, while others prefer to start with one and see how they feel.'' The key is helping patients understand these are two different problems at two different depths -- not an upsell."',
  true,
  false,
  'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Botox Cosmetic; FDA label -- Juvederm Voluma XC; Expert consensus'
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
  'Neurotoxin relaxes dynamic muscles; Lyft restores midface/hand volume. Cross-brand combination (Allergan Botox + Galderma Restylane) demonstrates that the complementarity is mechanism-based, not brand-specific. Botox handles movement-based lines while Lyft provides structural volume restoration in the midface and hands, addressing two fundamentally different aspects of aging.',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before filler to see muscle response before filling static lines. Maintenance: neurotoxin every 3-4 months, filler every 12-18 months (product-dependent).',
  true,
  'Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow''s feet. But it can''t restore volume that''s been lost over time. If you''re noticing both lines from movement AND a loss of fullness in your cheeks or around your mouth, filler addresses that volume loss through a completely different approach. Many patients find that treating both concerns creates a more balanced, natural-looking result than treating either one alone."',
  '"When a patient comes in concerned about looking tired or aged, you might explain: ''Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you''re also noticing that your cheeks look flatter than they used to, that''s volume loss, which Botox can''t address. Filler works on a different layer to restore that structure. Some patients choose to address both in the same visit, while others prefer to start with one and see how they feel.'' The key is helping patients understand these are two different problems requiring two different solutions -- not an upsell."',
  true,
  false,
  'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Botox Cosmetic; FDA label -- Restylane Lyft; Expert consensus'
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
  'Neurotoxin relaxes dynamic muscles (upper face); RHA Redensity addresses perioral fine lines with flexible HA designed for dynamic areas around the mouth. The two treatments target complementary anatomical zones -- Botox for forehead, crow''s feet, and frown lines, while RHA Redensity softens the fine static lines around the lips that neurotoxin cannot treat. Together they provide comprehensive facial rejuvenation.',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before filler to see muscle response before filling static lines. Maintenance: neurotoxin every 3-4 months, filler every 6-12 months (perioral area may need more frequent touch-ups).',
  true,
  'Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow''s feet. But it can''t address the fine lines around your lips, which are caused by a combination of repeated movement and lost support in the skin. RHA Redensity is a flexible filler designed specifically for that area around the mouth -- it moves with your expressions rather than fighting them. Many patients find that treating both the upper face lines and the perioral area creates a more complete, natural-looking result."',
  '"When a patient comes in concerned about fine lines both around the eyes and around the mouth, you might explain: ''Botox can help with the crow''s feet and forehead lines -- those are caused by muscle movement. But the lines around your lips are different -- they need a filler that can move with your expressions. RHA Redensity is designed for that dynamic area. Some patients choose to address both in the same visit, while others prefer to start with one area and see how they feel.'' The key is helping patients understand these are two different problems in two different zones -- not an upsell."',
  true,
  false,
  'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Botox Cosmetic; FDA label -- RHA Redensity; Expert consensus'
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
  'Neurotoxin relaxes dynamic muscles; SKINVIVE improves skin quality via microdroplet HA injection. These target fundamentally different aspects of facial aging -- Botox addresses movement-caused lines while SKINVIVE addresses skin texture, hydration, and overall quality that neurotoxin cannot improve. The combination provides both line reduction and skin quality enhancement, addressing the two most common patient concerns in a single treatment plan.',
  'Same session or sequential visits. Neurotoxin administered first. If sequential: neurotoxin 2 weeks before SKINVIVE. Maintenance: neurotoxin every 3-4 months, SKINVIVE every 6-9 months.',
  true,
  'Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow''s feet. But even when those lines are smoothed, your skin might still look dull or feel rough. SKINVIVE is different from traditional fillers -- it doesn''t add volume. Instead, it uses tiny microdroplets of hyaluronic acid to hydrate the skin from within, improving cheek skin smoothness that lasts about six months. One addresses the lines, the other improves the skin itself. Many patients find the combination gives them a fresher, more rested look overall."',
  '"When a patient is focused on looking refreshed, you might explain: ''Botox can help with the expression lines -- frown lines, crow''s feet, forehead. But some patients tell us even after Botox, their skin still doesn''t look as vibrant as they''d like. SKINVIVE isn''t a filler in the traditional sense -- it doesn''t add volume or fill wrinkles. It hydrates the skin from within using microdroplets, improving cheek skin smoothness. Think of it as improving skin quality rather than treating specific lines or volume loss. Some patients choose to address both, while others prefer to start with one and add later.'' The key is being clear that SKINVIVE and Botox solve completely different problems -- lines vs. skin quality."',
  true,
  false,
  'FDA label -- Botox Cosmetic; FDA label -- SKINVIVE by Juvederm; Expert consensus'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid)
     OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid)
);


-- =============================================================================
-- COMMON TIER (37 pairs)
-- Batch 1: 4 Botox common pairs (#3-#5 above + Morpheus8, Sculptra neurotoxins, filler+Sculptra)
-- NOTE: Botox+Restylane Lyft, Botox+RHA, Botox+SKINVIVE are common (above listed as canonical per existing structure)
-- Batch 1b: 20 non-Botox neurotoxin + HA filler pairs (#6-#25)
-- Batch 2: 5 neurotoxin + Sculptra pairs (#26-#30)
-- Batch 3: 1 Botox + Morpheus8 (#31)
-- Batch 4: 6 HA/SKINVIVE filler + Sculptra conditional pairs (in conditional file)
-- Batch 5: 1 Sculptra + Morpheus8 conditional (in conditional file)
-- =============================================================================

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
  'Daxxify uses peptide exchange technology to achieve approximately 6-month duration -- roughly double that of traditional neurotoxins -- reducing annual neurotoxin visits from 3-4 to approximately 2. It contains no human or animal byproducts. Vollure''s VYCROSS-crosslinked HA addresses nasolabial folds and moderate facial lines with an 18-month duration. The maintenance schedules align well: Daxxify every ~6 months and Vollure every 12-18 months means fewer total office visits compared to traditional neurotoxin + filler plans. This is a cross-ecosystem pairing (Revance + Allergan).',
  'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Daxxify 2 weeks before Vollure to assess muscle response before addressing static NLF lines. Maintenance scheduling advantage: Daxxify retreatment approximately every 6 months aligns more efficiently with Vollure''s 12-18 month schedule -- a Vollure touch-up can coincide with every second or third Daxxify visit. This reduces total annual visits compared to traditional 3-4 month neurotoxin cycles.',
  true,
  'Tell the patient: "Daxxify is a newer neurotoxin that works like other wrinkle relaxers but uses a unique peptide technology that helps it last longer -- about six months for many patients, compared to three to four months for traditional options. That means fewer maintenance visits for the wrinkle-relaxing portion of your treatment. Vollure is a filler designed specifically for the nasolabial fold lines -- those deeper lines from your nose to your mouth -- and typically lasts about 18 months. If you''re noticing both expression lines and those deeper smile-line folds, Daxxify addresses the movement-based lines while Vollure addresses the volume-based lines. The longer duration of Daxxify means you may need fewer total visits over the year."',
  '"The key differentiator with Daxxify is duration. When explaining: ''Daxxify uses a peptide technology that helps it last about six months -- so instead of coming in three or four times a year for your wrinkle relaxer, you may only need two visits. Vollure addresses the deeper lines around your nose and mouth, and it typically lasts about 18 months. So between the two, you''re getting longer-lasting results from both.'' If patients ask how Daxxify is different from other neurotoxins: ''It uses the same botulinum toxin type A but with a peptide exchange technology that extends the duration. It also contains no human or animal byproducts.'' Note: Daxxify is a Revance product and Vollure is Allergan, so they don''t share a loyalty program. Focus on clinical fit, not brand bundling."',
  true,
  false,
  'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Daxxify; FDA label -- Juvederm Vollure XC; Expert consensus'
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
  'Daxxify (~6-month duration via peptide exchange technology) combined with Voluma (up to 2-year duration via VYCROSS crosslinking) creates a long-duration treatment plan for both dynamic wrinkles and structural cheek volume loss. Daxxify reduces annual neurotoxin visits from 3-4 to approximately 2, and Voluma''s extended duration means cheek structure is maintained with infrequent touch-ups. Voluma is a structural filler injected deep in the cheeks -- it is typically placed first in multi-filler protocols as the foundational scaffold. This is a cross-ecosystem pairing (Revance + Allergan).',
  'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Daxxify 2 weeks before Voluma to assess muscle response. Both products have extended durations, so maintenance visits are less frequent: Daxxify approximately every 6 months, Voluma every 18-24 months. A Voluma touch-up can typically coincide with a Daxxify retreatment visit. In multi-filler plans, Voluma (structural cheek volume) should be placed before fillers in lower facial zones.',
  true,
  'Tell the patient: "Daxxify is a longer-lasting wrinkle relaxer -- it uses a unique peptide technology that helps it work for about six months, so you may need fewer maintenance visits compared to traditional options. Voluma is a structural filler designed specifically for the cheeks -- it''s placed deep to restore the natural cheek volume that decreases with age, and it can last up to two years. If you''re noticing both expression lines and a loss of cheek fullness, these two products address different concerns. And because both last longer than many alternatives, your overall maintenance schedule may be more manageable."',
  '"This pairing is worth understanding for patients who value convenience and longer-lasting results. When explaining: ''Daxxify relaxes expression lines and lasts about six months -- so about two visits a year instead of three or four. Voluma restores cheek structure and can last up to two years. Together, these are two of the longer-duration options available, which means fewer maintenance visits overall.'' On Voluma specifically: ''It''s a structural filler -- think of it as rebuilding the foundation of the cheek. It''s placed deep, and it can actually improve how the lower face looks too by providing support from above.'' Note for highly active patients: Voluma may metabolize faster in patients with very active lifestyles -- set realistic duration expectations. This is a cross-brand pairing (Revance + Allergan), so loyalty programs don''t overlap."',
  true,
  false,
  'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Daxxify; FDA label -- Juvederm Voluma XC; Expert consensus'
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
  'Daxxify''s peptide exchange technology provides approximately 6-month duration with no human or animal byproducts, while Restylane Lyft''s NASHA-technology HA has a unique dual FDA indication for both midface volume and hands. Daxxify reduces annual neurotoxin visits from 3-4 to approximately 2, creating a more convenient maintenance schedule alongside Restylane Lyft''s 12-18 month duration. The hand volume indication for Restylane Lyft is unique among HA fillers -- it addresses a concern that no neurotoxin can treat. This is a cross-ecosystem pairing (Revance + Galderma).',
  'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Daxxify 2 weeks before Restylane Lyft to assess muscle response. If treating hands with Restylane Lyft, timing is independent of facial neurotoxin effects -- can be same session without interaction concern. Daxxify retreatment approximately every 6 months; Restylane Lyft touch-ups at 12-18 months depending on treatment area.',
  true,
  'Tell the patient: "Daxxify is a longer-lasting wrinkle relaxer that uses a unique peptide technology -- it works for about six months for many patients, so you may need fewer visits for that portion of your treatment. Restylane Lyft is a filler with a unique distinction: it''s one of the few fillers approved for both midface volume and hands. If you''re noticing expression lines along with cheek hollowing or aging hands, these two treatments address completely different concerns. Daxxify handles the movement-based lines, while Restylane Lyft restores volume where it''s been lost -- whether that''s in the cheeks, midface, or hands."',
  '"Two things to highlight with this combination. First, Daxxify''s duration: ''Daxxify uses a peptide technology that helps it last about six months, so you''d come in about twice a year for the wrinkle relaxer instead of three or four times.'' Second, Restylane Lyft''s versatility: ''Lyft is one of the few fillers approved for both the midface and hands. If a patient is concerned about aging hands -- thinning skin, visible veins and tendons -- this is specifically indicated for that, which most fillers aren''t.'' On the hand indication: this is a genuine differentiator, not an add-on suggestion. Note: Daxxify is Revance and Lyft is Galderma -- different loyalty programs. Lead with clinical fit."',
  true,
  false,
  'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Daxxify; FDA label -- Restylane Lyft; Expert consensus'
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
  'Daxxify and RHA Redensity are both Revance products, creating ecosystem alignment. Daxxify''s peptide exchange technology provides ~6-month duration for dynamic wrinkle relaxation, while RHA Redensity uses resilient HA designed specifically for perioral fine lines and dynamic facial areas. RHA Redensity is a finishing filler that refines fine lines in areas of constant movement (lips, perioral region) where traditional fillers may not perform as well. The combination addresses upper-face dynamic wrinkles (Daxxify, with fewer annual visits) alongside perioral fine line refinement (RHA Redensity).',
  'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Daxxify 2 weeks before RHA Redensity to assess upper-face muscle response before refining perioral lines. RHA Redensity is typically used as a finishing step after any structural fillers have been placed. Daxxify retreatment approximately every 6 months. In a multi-product plan: structural filler first, then Daxxify, then RHA Redensity for perioral refinement.',
  true,
  'Tell the patient: "Daxxify is a longer-lasting wrinkle relaxer -- it uses a unique peptide technology that works for about six months for many patients, meaning fewer maintenance visits for expression lines like forehead wrinkles and crow''s feet. The fine lines around your mouth are a different concern -- they''re in an area that moves constantly with talking, eating, and smiling. RHA Redensity is a specialized filler designed for exactly those delicate lines. It uses a resilient formula that flexes with your natural expressions rather than stiffening the area. Both products are made by the same company, Revance, and they address two different concerns through two different approaches."',
  '"This is a same-ecosystem pairing -- both Daxxify and RHA Redensity are Revance products, so patients can benefit from a single loyalty program. When explaining: ''Daxxify addresses your expression lines and lasts about six months, so fewer visits per year. RHA Redensity is a specialized filler for the fine lines around your mouth -- it''s designed to move with your expressions rather than resist them, which matters in an area that''s always in motion.'' On RHA Redensity''s role: ''Think of it as a finishing treatment. If a patient has had structural volume restored in the cheeks and their expression lines treated with Daxxify, RHA Redensity refines those remaining perioral lines that other treatments can''t fully address.'' The Revance ecosystem alignment is a genuine convenience factor for patients."',
  true,
  false,
  'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Daxxify; FDA label -- RHA Redensity; Expert consensus'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid)
     OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid)
);

-- #10: Daxxify + SKINVIVE by Juvederm — common
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
  'Daxxify''s peptide exchange technology provides ~6-month neurotoxin duration, and SKINVIVE provides approximately 6-month skin quality improvement -- creating a convenient shared maintenance schedule. SKINVIVE is NOT a volume filler; it uses microdroplet HA injected intradermally to improve skin smoothness and hydration. The combination addresses dynamic wrinkles (Daxxify, fewer annual visits) alongside overall skin quality (SKINVIVE). Daxxify contains no human or animal byproducts. This is a cross-ecosystem pairing (Revance + Allergan).',
  'Same session or sequential visits. Neurotoxin administered first, SKINVIVE microdroplets second. SKINVIVE is typically a finishing step since it addresses skin quality rather than structure. The convenient aspect of this pairing: both Daxxify and SKINVIVE have approximately 6-month durations, so retreatment visits can often be aligned. Unlike traditional fillers, SKINVIVE microdroplets are placed intradermally and do not interact with neurotoxin placement.',
  true,
  'Tell the patient: "Daxxify is a longer-lasting wrinkle relaxer that works for about six months for many patients, so you may need only about two wrinkle-relaxer visits per year instead of three or four. SKINVIVE is something quite different from a traditional filler -- it doesn''t add volume or fill specific lines. Instead, it uses tiny microdroplets of hyaluronic acid just under the skin''s surface to improve your skin''s overall cheek skin smoothness. It also lasts about six months. So if you''re looking for smoother expression lines and healthier-looking skin overall, these two treatments work on completely different aspects of your appearance, and conveniently, they''re on a similar maintenance schedule."',
  '"Two key points for this combination. First, explain that SKINVIVE is not a filler: ''SKINVIVE doesn''t add volume the way cheek or lip fillers do. It uses microdroplets to improve the quality and smoothness of your skin itself -- think of it as a glow treatment rather than a wrinkle filler.'' Second, the convenience angle: ''Both Daxxify and SKINVIVE last about six months, so you could potentially schedule maintenance for both on the same visit about twice a year.'' Be upfront that this is a cross-brand pairing -- Daxxify is Revance and SKINVIVE is Allergan, so they don''t share loyalty programs. Let the patient''s concerns guide the conversation, not the bundle opportunity."',
  true,
  false,
  'FDA label -- Daxxify; FDA label -- SKINVIVE by Juvederm; Expert consensus'
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid)
     OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid)
);

-- ===== Dysport + HA Fillers (5 pairs) =====

-- #11: Dysport + Juvederm Vollure XC — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Dysport''s broader diffusion pattern makes it well-suited for treating large dynamic zones (forehead, lateral crow''s feet) with fewer injection points, while Vollure''s VYCROSS-crosslinked HA addresses nasolabial folds and moderate facial lines with an 18-month duration. The combination treats two distinct layers of facial aging: Dysport relaxes the muscles causing expression lines (with faster onset at 2-5 days vs 7-14 for some neurotoxins), while Vollure restores mid-depth volume loss in the lower face.',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Dysport 2 weeks before Vollure to assess muscle response before addressing static NLF lines. Dysport''s faster onset (2-5 days) means the provider can evaluate dynamic wrinkle improvement sooner than with some other neurotoxins. Vollure touch-ups typically needed at 12-18 months; Dysport retreatment at 3-4 months.',
true,
'Tell the patient: "Dysport works by relaxing the muscles that create expression lines -- it''s especially effective for smoothing broad areas like the forehead and crow''s feet, and many patients notice results within a few days. But Dysport can''t address the deeper lines around your nose and mouth that come from volume loss over time. Vollure is a hyaluronic acid filler designed specifically for those nasolabial fold lines, and it typically lasts about 18 months. If you''re seeing both expression lines and those deeper smile lines, addressing them together often produces a more balanced result than treating either one alone."',
'"When a patient mentions both forehead lines and nasolabial folds, you can explain: ''Those are actually two different concerns with two different causes. The forehead and crow''s feet lines come from muscle movement -- Dysport is designed for those areas, and it tends to work well across broader zones. The deeper lines around your nose and mouth are from volume loss over time -- that''s where Vollure comes in. Vollure is specifically designed for those nasolabial fold lines and tends to last longer than some other fillers in that area.'' If they ask about doing both: ''Some patients choose to address both in the same visit, others prefer to start with one and see how they feel. Your provider would do the Dysport first, then the filler.'' The goal is helping patients understand why these are two separate treatments for two separate problems."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Dysport; FDA label -- Juvederm Vollure XC; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid) OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #12: Dysport + Juvederm Voluma XC — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Dysport''s broader diffusion pattern treats large dynamic zones (forehead, crow''s feet) effectively with fewer injection points, while Voluma provides deep structural volume restoration in the cheeks using VYCROSS technology with up to 2-year duration. This combination addresses two distinct layers: Dysport relaxes the muscles causing upper-face expression lines (with faster onset at 2-5 days), while Voluma rebuilds the foundational cheek structure lost with aging. Voluma is typically placed first in multi-filler protocols as a structural base.',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Dysport 2 weeks before Voluma to assess muscle response. Voluma is a structural filler -- in multi-filler treatment plans, cheek volume is typically restored first to provide a scaffold for fillers lower in the face. Dysport''s faster onset (2-5 days) allows earlier assessment of dynamic wrinkle improvement. Voluma touch-ups at 18-24 months; Dysport retreatment at 3-4 months.',
true,
'Tell the patient: "Dysport is designed to relax the muscles that cause expression lines -- it works especially well across broader areas like the forehead and around the eyes, and you may notice results within just a few days. But relaxing those muscles can''t bring back the cheek volume that naturally decreases over time. Voluma is a structural filler placed deep in the cheeks to restore that foundation -- it''s one of the longer-lasting fillers available, often holding for up to two years. If you''re noticing both expression lines up top and a loss of cheek fullness, treating both addresses the full picture of facial aging rather than just one part of it."',
'"When a patient says they look tired or their face looks ''deflated,'' it helps to separate the concerns: ''The lines on your forehead and around your eyes are from muscle movement -- Dysport addresses those by relaxing the muscles. But if you''re also noticing your cheeks look flatter or less defined than they used to, that''s structural volume loss, which happens naturally over time. Voluma is designed specifically for deep cheek volume -- it acts like a scaffold to lift and restore that structure.'' Emphasize that cheek volume restoration can improve the overall appearance of the lower face too, since it provides structural support."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Dysport; FDA label -- Juvederm Voluma XC; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid) OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #13: Dysport + Restylane Lyft — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Dysport and Restylane Lyft are both Galderma products, creating ecosystem alignment for practices. Dysport''s broader diffusion pattern treats large dynamic zones effectively with fewer injection points, while Restylane Lyft is a NASHA-technology HA filler with a unique dual FDA indication for both midface volume and hands. This combination addresses dynamic expression lines (Dysport, faster onset at 2-5 days) alongside structural volume loss in the midface or age-related hand volume loss.',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Dysport 2 weeks before Restylane Lyft to assess muscle response. If treating hands with Restylane Lyft, timing is independent of facial neurotoxin effects -- can be same session without concern about interaction. Dysport retreatment at 3-4 months; Restylane Lyft touch-ups at 12-18 months depending on treatment area.',
true,
'Tell the patient: "Dysport relaxes the muscles that create expression lines like forehead wrinkles and crow''s feet -- it''s designed to work well across broad areas and you may see results within a few days. But Dysport can''t address volume loss in your cheeks or hands. Restylane Lyft is a filler that''s specifically approved for restoring midface volume, and it''s one of the few fillers also approved for hands. If you''re noticing expression lines along with cheek hollowing or aging hands, these two treatments address different aspects of the aging process. They''re made by the same company and work through completely different mechanisms."',
'"Dysport and Restylane Lyft are both Galderma products, so if a patient asks about brand consistency, you can mention they''re from the same family. When explaining the pairing: ''Dysport works on the muscles that cause expression lines -- forehead, crow''s feet, frown lines. Restylane Lyft addresses volume loss, and it''s unique because it''s approved for both midface volume and hands.'' On the hand indication specifically: this is a genuine differentiator -- no other HA filler has the dual face-and-hands FDA approval. Help patients understand the distinct roles without implying they need both."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Dysport; FDA label -- Restylane Lyft; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid) OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #14: Dysport + RHA Redensity — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Dysport''s broader diffusion treats large dynamic zones (forehead, crow''s feet) with fewer injection points and faster onset (2-5 days), while RHA Redensity uses resilient HA technology specifically designed for perioral fine lines and dynamic areas around the mouth. RHA Redensity is a finishing filler -- it refines fine lines in areas that move constantly (lips, perioral region) where traditional fillers may not perform as well. This is a cross-ecosystem pairing (Galderma neurotoxin + Revance filler).',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Dysport 2 weeks before RHA Redensity to assess upper-face muscle response before refining perioral lines. RHA Redensity is typically used as a finishing step after any structural fillers have been placed. In a multi-product plan, the sequencing would be: structural filler (cheeks) first, then neurotoxin, then RHA Redensity for perioral refinement. Dysport retreatment at 3-4 months.',
true,
'Tell the patient: "Dysport works by relaxing the muscles that cause expression lines -- it''s particularly effective for broad areas like the forehead and around the eyes, and you may notice improvement within a few days. But those fine lines around your mouth are different -- they''re caused by years of movement in an area that''s always active (talking, eating, smiling). RHA Redensity is a specialized filler designed for exactly those delicate perioral lines. It uses a resilient formula that moves naturally with your facial expressions rather than stiffening the area. These are two different concerns in two different parts of the face, each requiring its own approach."',
'"When a patient is concerned about both forehead lines and fine lines around the mouth, help them understand the distinction: ''The forehead and crow''s feet lines are from muscle movement -- Dysport relaxes those muscles and works well across broad areas. The fine lines around your mouth are a different challenge. That area moves constantly, so it needs a filler that can flex with your expressions. RHA Redensity is designed specifically for those perioral lines -- it''s sometimes called a finishing filler because it handles the fine details.'' One thing to be aware of: Dysport is a Galderma product and RHA Redensity is a Revance product, so they don''t share a loyalty program. Focus on what each product does well for the specific concern."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Dysport; FDA label -- RHA Redensity; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid) OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #15: Dysport + SKINVIVE by Juvederm — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Dysport''s broader diffusion treats dynamic expression lines across the upper face (forehead, crow''s feet) with faster onset (2-5 days), while SKINVIVE is a fundamentally different product -- it is NOT a volume filler. SKINVIVE uses microdroplet HA injected intradermally to improve skin smoothness and hydration. This combination addresses dynamic wrinkles (Dysport) alongside overall skin quality (SKINVIVE) -- two complementary but distinct aesthetic goals. This is a cross-ecosystem pairing (Galderma + Allergan).',
'Same session or sequential visits. Neurotoxin administered first, SKINVIVE microdroplets second. SKINVIVE is typically applied as a finishing step in any treatment protocol since it addresses skin quality rather than structure. Unlike traditional fillers, there is no concern about SKINVIVE displacing or interacting with neurotoxin placement since it is injected intradermally in microdroplets. Dysport retreatment at 3-4 months; SKINVIVE retreatment approximately every 6 months.',
true,
'Tell the patient: "Dysport relaxes the muscles that create expression lines like forehead wrinkles and crow''s feet -- it works well across broad areas and you may see improvement within a few days. SKINVIVE is something different from a traditional filler -- it doesn''t add volume or fill lines. Instead, it uses tiny microdroplets of hyaluronic acid placed just under the skin''s surface to improve your skin''s overall cheek skin smoothness. Think of Dysport as addressing specific wrinkles, and SKINVIVE as improving the quality of the skin itself. If you''re looking for both smoother expressions and healthier-looking skin, these treat two different things."',
'"It''s important to understand that SKINVIVE is not a filler in the traditional sense -- it doesn''t add volume or fill wrinkles. When explaining this pairing: ''Dysport addresses the expression lines on your forehead and around your eyes by relaxing the muscles that cause them. SKINVIVE does something completely different -- it uses microdroplets of hyaluronic acid placed just under the surface to improve skin smoothness and give your skin improved cheek skin smoothness. It''s more like a skin quality treatment than a filler.'' Note this is a cross-brand pairing (Galderma + Allergan) so loyalty programs don''t align."',
true, false, 'FDA label -- Dysport; FDA label -- SKINVIVE by Juvederm; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid) OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- ===== Jeuveau + HA Fillers (5 pairs) =====

-- #16: Jeuveau + Juvederm Vollure XC — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Jeuveau ("Newtox") is an aesthetics-only neurotoxin manufactured using Hi-Pure technology by Evolus -- it has no therapeutic indications, being designed solely for cosmetic use. It addresses dynamic wrinkles through the same botulinum toxin type A mechanism as other neurotoxins. Vollure''s VYCROSS-crosslinked HA addresses nasolabial folds and moderate facial lines with an 18-month duration. The combination treats dynamic expression lines (Jeuveau) alongside mid-depth volume loss in the NLF area (Vollure). Note: Jeuveau has limited product-specific published evidence compared to longer-established neurotoxins. The neurotoxin + filler complementarity is mechanism-based and well-established at the category level.',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Jeuveau 2 weeks before Vollure to assess muscle response before addressing static NLF lines. Standard neurotoxin + filler sequencing applies. Jeuveau retreatment at 3-4 months; Vollure touch-ups at 12-18 months.',
true,
'Tell the patient: "Jeuveau is a wrinkle relaxer designed specifically for cosmetic use -- it works by relaxing the muscles that cause expression lines like frown lines and crow''s feet. But it can''t address the deeper lines that run from your nose to your mouth -- those nasolabial folds come from volume loss over time, not muscle movement. Vollure is a filler designed specifically for those lines, and it typically lasts about 18 months. If you''re noticing both expression lines and those deeper smile-line folds, addressing both treats the full picture -- movement-based lines and volume-based lines are two different concerns that each need their own approach."',
'"When explaining Jeuveau to patients: ''Jeuveau is sometimes called Newtox -- it''s a wrinkle relaxer made specifically for cosmetic use. It works the same way as other neurotoxins by relaxing the muscles that cause expression lines.'' If patients ask how it compares to other neurotoxins: be straightforward that it works through the same mechanism, and your provider can discuss which option makes the most sense for their individual case. On the pairing with Vollure: ''Vollure addresses a different concern -- the deeper lines around your nose and mouth that come from volume loss, not muscle movement. It''s specifically designed for nasolabial folds and tends to last about 18 months.'' Note: Jeuveau is an Evolus product and Vollure is Allergan, so they don''t share a loyalty program. Let the clinical discussion guide product selection."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Jeuveau; FDA label -- Juvederm Vollure XC; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid) OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- #17: Jeuveau + Juvederm Voluma XC — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Jeuveau ("Newtox") is an aesthetics-only neurotoxin with Hi-Pure technology, addressing dynamic wrinkles through the standard BoNT-A mechanism. Voluma provides deep structural volume restoration in the cheeks using VYCROSS technology with up to 2-year duration. Voluma is a structural filler typically placed first in multi-filler protocols as the foundational scaffold. The combination treats expression lines (Jeuveau) alongside structural cheek volume loss (Voluma). Jeuveau has limited product-specific published evidence -- the neurotoxin + filler complementarity is well-established at the category level.',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Jeuveau 2 weeks before Voluma to assess muscle response. In multi-filler treatment plans, Voluma (structural cheek volume) is typically placed first to provide a scaffold for fillers placed lower in the face. Jeuveau retreatment at 3-4 months; Voluma touch-ups at 18-24 months.',
true,
'Tell the patient: "Jeuveau is a wrinkle relaxer made specifically for cosmetic use -- it relaxes the muscles that create expression lines like frown lines and crow''s feet. But expression lines and cheek volume loss are two separate things. If you''re noticing your cheeks look flatter or less defined, that''s structural volume loss that happens naturally with aging -- Jeuveau can''t address that. Voluma is a structural filler placed deep in the cheeks to restore that foundation, and it''s one of the longer-lasting fillers, often holding for up to two years. Treating both concerns addresses the full picture rather than just one aspect."',
'"When a patient mentions looking tired or ''deflated,'' help them separate the concerns: ''The lines on your forehead and around your eyes are from muscle movement -- Jeuveau is designed to relax those muscles. But the flatness in your cheeks is structural volume loss, which is a different process entirely. Voluma is placed deep in the cheek to rebuild that structure -- think of it as restoring the foundation.'' On Jeuveau specifically: it''s sometimes called Newtox and it''s made by Evolus specifically for cosmetic use. For highly active patients: set realistic expectations about Voluma duration, as it may metabolize faster. Jeuveau is Evolus and Voluma is Allergan -- different loyalty programs."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Jeuveau; FDA label -- Juvederm Voluma XC; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid) OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- #18: Jeuveau + Restylane Lyft — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Jeuveau ("Newtox") is an aesthetics-only neurotoxin with Hi-Pure technology, addressing dynamic wrinkles through the standard BoNT-A mechanism. Restylane Lyft uses NASHA technology and has a unique dual FDA indication for both midface volume and hands -- the hand indication is unique among HA fillers. The combination addresses expression lines (Jeuveau) alongside midface volume loss or hand aging (Restylane Lyft). Jeuveau has limited product-specific published evidence compared to longer-established neurotoxins. This is a cross-ecosystem pairing (Evolus + Galderma).',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Jeuveau 2 weeks before Restylane Lyft to assess muscle response. If treating hands with Restylane Lyft, timing is independent of facial neurotoxin effects -- can be same session without interaction concern. Jeuveau retreatment at 3-4 months; Restylane Lyft touch-ups at 12-18 months.',
true,
'Tell the patient: "Jeuveau is a wrinkle relaxer made specifically for cosmetic use -- it relaxes the muscles causing expression lines like frown lines and crow''s feet. But it can''t address volume loss in your cheeks or hands. Restylane Lyft is a filler with a unique distinction: it''s one of the few fillers approved for both midface volume and hands. If you''re concerned about aging hands -- where the skin thins and veins become more visible -- Lyft is specifically designed for that. And if you''re also noticing cheek hollowing, it addresses that too. These are different concerns requiring different treatments."',
'"When explaining this combination: ''Jeuveau handles the expression lines -- forehead, frown lines, crow''s feet. It''s designed specifically for cosmetic use and works by relaxing the underlying muscles.'' On Restylane Lyft: ''Lyft has something unique going for it -- it''s one of the only fillers approved for both the midface and hands. If a patient mentions that their hands look older than their face, this is specifically indicated for that.'' The hand indication is a genuine clinical differentiator, not an add-on -- some patients seek hand treatment as their primary concern. Jeuveau is Evolus and Lyft is Galderma -- different loyalty ecosystems."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Jeuveau; FDA label -- Restylane Lyft; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid) OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- #19: Jeuveau + RHA Redensity — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Jeuveau ("Newtox") is an aesthetics-only neurotoxin with Hi-Pure technology, addressing upper-face dynamic wrinkles. RHA Redensity uses resilient HA technology specifically designed for perioral fine lines and dynamic areas -- it is a finishing filler that refines fine lines in areas of constant movement where traditional fillers may not perform as well. The combination addresses upper-face expression lines (Jeuveau) alongside perioral fine line refinement (RHA Redensity). This is a cross-ecosystem pairing (Evolus + Revance).',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Jeuveau 2 weeks before RHA Redensity to assess upper-face muscle response before refining perioral lines. RHA Redensity is typically used as a finishing step after any structural fillers have been placed. In a comprehensive plan: structural filler first, then neurotoxin, then RHA Redensity for perioral refinement. Jeuveau retreatment at 3-4 months.',
true,
'Tell the patient: "Jeuveau is a wrinkle relaxer made specifically for cosmetic use -- it relaxes the muscles that cause expression lines like frown lines and crow''s feet. But the fine lines around your mouth are a different type of concern. That area is constantly moving -- talking, eating, smiling -- and those lines develop from years of that movement combined with skin changes over time. RHA Redensity is a specialized filler designed for exactly those delicate perioral lines. It uses a resilient formula that moves naturally with your facial expressions. These are two different concerns in two different parts of the face, and each requires its own approach."',
'"When explaining this pairing: ''Jeuveau addresses the expression lines in the upper face -- forehead, frown lines, crow''s feet -- by relaxing the muscles that cause them. RHA Redensity addresses a completely different concern: those fine lines around the mouth. The perioral area moves constantly, so it needs a filler that can flex with those expressions, which is what RHA Redensity is designed to do.'' On RHA Redensity: ''It''s sometimes called a finishing filler because it handles the fine details after broader concerns like cheek volume and expression lines are addressed.'' These are different ecosystems (Evolus + Revance) -- no shared loyalty program."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Jeuveau; FDA label -- RHA Redensity; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid) OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- #20: Jeuveau + SKINVIVE by Juvederm — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Jeuveau ("Newtox") is an aesthetics-only neurotoxin with Hi-Pure technology, addressing dynamic wrinkles through the standard BoNT-A mechanism. SKINVIVE is NOT a volume filler -- it uses microdroplet HA injected intradermally to improve skin smoothness and hydration. The combination addresses expression lines (Jeuveau) alongside overall skin quality (SKINVIVE). Both are newer-generation products in their respective categories. This is a cross-ecosystem pairing (Evolus + Allergan).',
'Same session or sequential visits. Neurotoxin administered first, SKINVIVE microdroplets second. SKINVIVE is typically a finishing step since it addresses skin quality rather than structure or volume. Unlike traditional fillers, SKINVIVE microdroplets are placed intradermally and do not interact with neurotoxin placement. Jeuveau retreatment at 3-4 months; SKINVIVE retreatment approximately every 6 months.',
true,
'Tell the patient: "Jeuveau is a wrinkle relaxer designed specifically for cosmetic use -- it relaxes the muscles that create expression lines like frown lines and crow''s feet. SKINVIVE is something quite different. It''s not a traditional filler -- it doesn''t add volume or fill specific wrinkles. Instead, it uses tiny microdroplets of hyaluronic acid placed just under the skin''s surface to improve your skin''s overall cheek skin smoothness. If you''re concerned about both specific expression lines and your skin''s overall smoothness, these two treatments work on completely different aspects of your appearance."',
'"Two important things to communicate with this pairing. First, Jeuveau is an aesthetics-only neurotoxin -- ''It''s designed specifically for cosmetic wrinkle treatment and works by relaxing the muscles that cause expression lines.'' If patients ask how it compares to other neurotoxins, be straightforward that the mechanism is the same and the provider can discuss individual fit. Second, make sure patients understand what SKINVIVE is and isn''t: ''SKINVIVE is not a traditional filler. It doesn''t add volume to your cheeks or lips. It uses microdroplets to improve your skin''s overall quality -- skin smoothness and hydration.'' These are different ecosystems (Evolus + Allergan) so no shared loyalty program. Let the patient''s specific concerns guide which treatments make sense."',
true, false, 'FDA label -- Jeuveau; FDA label -- SKINVIVE by Juvederm; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid) OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- ===== Xeomin + HA Fillers (5 pairs) =====

-- #21: Xeomin + Juvederm Vollure XC — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Xeomin is a "naked molecule" neurotoxin -- it contains no complexing proteins (0.55ng vs 4.5ng for Botox), which is a consideration for providers evaluating long-term immunogenicity, as it does not contain accessory proteins. This makes it a consideration for patients planning extended combination therapy. Vollure''s VYCROSS-crosslinked HA addresses nasolabial folds and moderate facial lines with an 18-month duration. Xeomin is room-temperature stable, which is a practical advantage for practices.',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Xeomin 2 weeks before Vollure to assess muscle response before addressing static NLF lines. Standard neurotoxin + filler sequencing applies. Xeomin retreatment at 3-4 months; Vollure touch-ups at 12-18 months. Some providers consider Xeomin''s lack of accessory proteins relevant for long-term combination plans.',
true,
'Tell the patient: "Xeomin is a wrinkle relaxer that''s sometimes described as a ''pure'' or ''naked'' neurotoxin -- it contains only the active ingredient without the extra proteins found in some other neurotoxins. Some providers consider this when planning long-term treatment, as it does not contain the accessory proteins found in some other neurotoxins. Vollure is a filler designed specifically for the nasolabial fold lines -- those deeper lines from your nose to your mouth -- and it typically lasts about 18 months. If you''re noticing both expression lines and those deeper folds, Xeomin addresses the movement-based lines while Vollure addresses the volume-based lines. They work through completely different mechanisms."',
'"Xeomin''s key differentiator is its purity. When explaining: ''Xeomin is sometimes called the naked molecule -- it contains only the active toxin without the extra proteins that other neurotoxins have. This may be relevant for patients who plan to use neurotoxin long-term, as it does not contain the accessory proteins found in some other neurotoxins, which some providers consider when long-term immunogenicity is a concern.'' On the Vollure pairing: ''Vollure is specifically designed for the nasolabial fold lines and typically lasts about 18 months. These are different concerns -- Xeomin handles the expression lines, Vollure handles the volume loss lines.'' Practical note: Xeomin is room-temperature stable, which is a logistics advantage. This is a cross-brand pairing (Merz + Allergan) -- different loyalty programs."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Xeomin; FDA label -- Juvederm Vollure XC; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid) OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

-- #22: Xeomin + Juvederm Voluma XC — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Xeomin''s "naked molecule" formulation (no complexing proteins, 0.55ng vs 4.5ng for Botox) is a consideration for providers evaluating long-term immunogenicity, as it does not contain accessory proteins -- relevant for patients planning ongoing neurotoxin + filler maintenance over years. Voluma provides deep structural volume restoration in the cheeks using VYCROSS technology with up to 2-year duration. Voluma is a structural filler typically placed first in multi-filler protocols as the foundational scaffold.',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Xeomin 2 weeks before Voluma to assess muscle response. In multi-filler treatment plans, Voluma (structural cheek volume) is placed first to provide a scaffold for fillers lower in the face. Xeomin retreatment at 3-4 months; Voluma touch-ups at 18-24 months.',
true,
'Tell the patient: "Xeomin is a wrinkle relaxer known as a ''pure'' neurotoxin -- it contains only the active ingredient without the extra proteins found in some other options. Some providers consider Xeomin when long-term immunogenicity is a concern, as it does not contain accessory proteins. Voluma is a structural filler placed deep in the cheeks to restore the volume that naturally decreases with age -- it''s one of the longest-lasting fillers available, often holding for up to two years. If you''re noticing both expression lines and cheek volume loss, Xeomin addresses the movement-based wrinkles while Voluma rebuilds the cheek structure. They work at completely different levels."',
'"For patients interested in a long-term treatment plan, Xeomin''s purity is a meaningful talking point: ''Xeomin is called the naked molecule because it''s just the active neurotoxin without additional proteins. Some providers consider this when long-term immunogenicity is a concern, as it does not contain the accessory proteins found in some other neurotoxins.'' On Voluma: ''Voluma is a deep structural filler for the cheeks -- it acts as a foundation. When cheek volume is restored, it can improve the appearance of the entire lower face by providing support from above. It''s one of the longer-lasting options at up to two years.'' For highly active patients: set realistic Voluma duration expectations. Xeomin is Merz and Voluma is Allergan -- different loyalty programs."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Xeomin; FDA label -- Juvederm Voluma XC; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid) OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

-- #23: Xeomin + Restylane Lyft — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Xeomin''s "naked molecule" formulation (no complexing proteins) is a consideration for providers evaluating long-term immunogenicity, as it does not contain accessory proteins, while Restylane Lyft''s NASHA-technology HA has a unique dual FDA indication for both midface volume and hands. The combination addresses dynamic expression lines (Xeomin, considered by some providers when long-term immunogenicity is a concern) alongside midface volume loss or hand aging (Restylane Lyft). Xeomin is room-temperature stable. This is a cross-ecosystem pairing (Merz + Galderma).',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Xeomin 2 weeks before Restylane Lyft to assess muscle response. If treating hands with Restylane Lyft, timing is independent of facial neurotoxin effects -- can be same session without interaction concern. Xeomin retreatment at 3-4 months; Restylane Lyft touch-ups at 12-18 months depending on treatment area.',
true,
'Tell the patient: "Xeomin is a wrinkle relaxer sometimes called the ''pure'' or ''naked'' neurotoxin -- it contains only the active ingredient, without the extra proteins found in some other options. Some providers consider Xeomin when long-term immunogenicity is a concern, as it does not contain accessory proteins. Restylane Lyft is a filler with a unique distinction: it''s one of the few fillers approved for both midface volume and hands. If you''re noticing expression lines along with cheek hollowing or aging hands where the skin has thinned and veins are more visible, Xeomin and Restylane Lyft address completely different concerns. Xeomin handles the movement-based wrinkles, while Lyft restores lost volume -- whether in the face or hands."',
'"Two differentiators to understand with this combination. On Xeomin: ''It''s the naked molecule -- just the active neurotoxin without complexing proteins. For patients who plan to use neurotoxin for years, some providers consider this when long-term immunogenicity is a concern, as it does not contain the accessory proteins found in some other neurotoxins.'' On Restylane Lyft: ''Lyft is unique because it has dual FDA approval for both the midface and hands. If a patient asks about aging hands specifically -- thinning skin, visible veins and tendons -- this is one of the few fillers specifically indicated for that.'' The hand indication is a genuine clinical differentiator. Xeomin is Merz and Restylane Lyft is Galderma -- different ecosystems. Xeomin also has the practical advantage of room-temperature storage."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Xeomin; FDA label -- Restylane Lyft; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid) OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

-- #24: Xeomin + RHA Redensity — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Xeomin''s "naked molecule" formulation (no complexing proteins, 0.55ng vs 4.5ng for Botox) is a consideration for providers evaluating long-term immunogenicity, as it does not contain accessory proteins. RHA Redensity uses resilient HA technology specifically designed for perioral fine lines and dynamic areas -- it is a finishing filler that refines fine lines in areas of constant movement. For patients planning long-term multi-product treatment, Xeomin''s accessory-protein-free formulation pairs well with a long-term filler maintenance plan. This is a cross-ecosystem pairing (Merz + Revance).',
'Same session or sequential visits. Neurotoxin administered first, filler second. If sequential: Xeomin 2 weeks before RHA Redensity to assess upper-face muscle response before refining perioral lines. RHA Redensity is typically used as a finishing step after any structural fillers have been placed. In a comprehensive plan: structural filler first, then neurotoxin, then RHA Redensity for perioral refinement. Xeomin retreatment at 3-4 months.',
true,
'Tell the patient: "Xeomin is a wrinkle relaxer known as the ''pure'' or ''naked'' neurotoxin -- it contains only the active ingredient without the extra proteins found in some other options. Some providers consider Xeomin when long-term immunogenicity is a concern, as it does not contain accessory proteins. The fine lines around your mouth are a separate concern -- that area is always moving, and those lines develop differently than expression lines in the forehead. RHA Redensity is a specialized filler designed for exactly those delicate perioral lines. It uses a resilient formula that moves naturally with your expressions rather than stiffening the area. These are two different concerns in two different parts of the face, each addressed by a product designed for that specific purpose."',
'"Two distinct product stories here. On Xeomin: ''It''s the naked molecule -- just the active neurotoxin without complexing proteins. For patients who plan to maintain neurotoxin treatment for years, some providers consider this when long-term immunogenicity is a concern, as it does not contain the accessory proteins found in some other neurotoxins.'' On RHA Redensity: ''It''s designed specifically for the perioral area -- those fine lines around the mouth that are constantly in motion. It''s sometimes called a finishing filler because it handles the fine details that broader treatments can''t address. The resilient HA formula flexes with natural expressions rather than resisting them.'' These are different ecosystems (Merz + Revance) -- no shared loyalty program."',
true, false, 'PubMed DOI 10.1097/DSS.0000000000000754; FDA label -- Xeomin; FDA label -- RHA Redensity; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid) OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));

-- #25: Xeomin + SKINVIVE by Juvederm — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Xeomin''s "naked molecule" formulation (no complexing proteins) is a consideration for providers evaluating long-term immunogenicity, as it does not contain accessory proteins, while SKINVIVE is NOT a volume filler -- it uses microdroplet HA injected intradermally to improve skin smoothness and hydration. The combination addresses dynamic wrinkles (Xeomin, considered by some providers when long-term immunogenicity is a concern) alongside overall skin quality (SKINVIVE). Xeomin is room-temperature stable. This is a cross-ecosystem pairing (Merz + Allergan).',
'Same session or sequential visits. Neurotoxin administered first, SKINVIVE microdroplets second. SKINVIVE is typically a finishing step since it addresses skin quality rather than structure or volume. Unlike traditional fillers, SKINVIVE microdroplets are placed intradermally and do not interact with neurotoxin placement. Xeomin retreatment at 3-4 months; SKINVIVE retreatment approximately every 6 months.',
true,
'Tell the patient: "Xeomin is a wrinkle relaxer known as the ''pure'' neurotoxin -- it contains only the active ingredient without extra proteins, which some providers consider when long-term immunogenicity is a concern, as it does not contain accessory proteins. SKINVIVE is quite different from a traditional filler -- it doesn''t add volume or fill specific wrinkles. Instead, it uses tiny microdroplets of hyaluronic acid just under the skin''s surface to improve your skin''s overall cheek skin smoothness. If you''re looking for both smoother expression lines and healthier-looking skin overall, these are two different treatments that work on two different aspects of your appearance."',
'"Two distinct stories to communicate. On Xeomin: ''It''s the naked molecule -- just the active neurotoxin without complexing proteins. For patients planning long-term neurotoxin use, some providers consider this when long-term immunogenicity is a concern, as it does not contain the accessory proteins found in some other neurotoxins. It also stores at room temperature, which is a practical note.'' On SKINVIVE: ''Make sure patients understand this is not a filler in the traditional sense. It doesn''t add volume to cheeks or lips. SKINVIVE uses microdroplets placed in the skin itself to improve cheek skin smoothness.'' If patients ask about doing both: ''They work on completely different things. Xeomin relaxes expression lines; SKINVIVE improves the quality of the skin itself. There''s no overlap or redundancy.'' Merz + Allergan -- different loyalty programs."',
true, false, 'FDA label -- Xeomin; FDA label -- SKINVIVE by Juvederm; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid) OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));


-- ===== Neurotoxin + Sculptra (5 pairs — now common, promoted in Phase 10) =====

-- #26: Botox Cosmetic + Sculptra Aesthetic — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles (immediate effect); Sculptra stimulates collagen production (gradual effect over months). These address two fundamentally different aspects of aging -- movement-caused lines and collagen/volume loss -- through completely different mechanisms at different tissue depths and timelines. The combination provides both immediate dynamic wrinkle reduction and long-term structural improvement. Note: No published controlled trial data exists for this specific combination. The FDA Sculptra label states that safety and effectiveness in combination with other products have not been evaluated in controlled clinical trials.',
'Can be same session or staggered. Long-term plan: neurotoxin every 3-4 months, Sculptra series of 2-3 sessions 4-6 weeks apart, then annual maintenance. Some providers prefer to establish Sculptra collagen stimulation first, then layer neurotoxin for dynamic lines.',
true,
'Tell the patient: "Botox helps with lines from muscle movement, but over time you also lose the underlying volume and structure. Sculptra works over months to support collagen production. They address different parts of the aging process -- Botox handles the lines caused by expressions, while Sculptra gradually supports the structure underneath. Your provider may suggest using both, depending on your individual situation. This combination is used in clinical practice, but it has not been evaluated in controlled clinical trials, so your provider can discuss whether it makes sense for you."',
'"When a patient is concerned about both expression lines and overall facial volume loss, explain: ''There are really two different things happening. The lines around your eyes and forehead are from muscle movement -- that''s what neurotoxin addresses. But the overall loss of fullness and structure is from collagen breakdown over time. Sculptra works gradually to support collagen production.'' This combination is used in clinical practice but has not been evaluated in controlled trials. Frame it as an option the provider may recommend based on the patient''s individual needs, not as a standard protocol."',
true, false, 'FDA Sculptra Aesthetic labeling; FDA label -- Botox Cosmetic; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));

-- #27: Daxxify + Sculptra Aesthetic — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles (immediate effect); Sculptra stimulates collagen production (gradual effect over months). Daxxify''s peptide exchange technology provides ~6-month duration -- roughly twice that of traditional neurotoxins. This extended duration changes the treatment plan cadence: patients need only 2 toxin visits per year instead of 3-4, which simplifies scheduling around Sculptra sessions. Note: No published controlled trial data exists for this specific combination. The FDA Sculptra label states that safety and effectiveness in combination with other products have not been evaluated in controlled clinical trials.',
'Can be same session or staggered. Long-term plan: Daxxify every 5-6 months, Sculptra series of 2-3 sessions 4-6 weeks apart, then annual maintenance. The reduced toxin visit frequency (2/year vs 3-4/year) means fewer total appointments when combined with a Sculptra maintenance schedule.',
true,
'Tell the patient: "Daxxify is a newer neurotoxin that smooths expression lines and typically lasts about six months -- roughly twice as long as traditional options. But expression lines are only part of what changes with age. Over time, you lose the collagen that gives your face its underlying structure. Sculptra works gradually over months to support collagen production. Your provider may suggest using both, depending on your needs -- Daxxify handles lines from muscle movement, Sculptra supports the structure underneath. This combination is used in clinical practice, but it has not been evaluated in controlled clinical trials, so your provider can discuss whether it makes sense for your individual situation."',
'"When a patient is interested in both expression line treatment and long-term structural improvement, and they value fewer visits, explain: ''There are two different things happening with aging. The lines from expressions -- that''s what Daxxify addresses. It uses a peptide formulation that tends to last about six months, so you''d come in roughly twice a year for that instead of three or four times. The loss of fullness and firmness is from collagen breakdown over time -- Sculptra addresses that gradually.'' This combination is used in clinical practice but has not been evaluated in controlled trials. Present it as an option the provider may recommend based on the patient''s individual needs."',
true, false, 'FDA Sculptra Aesthetic labeling; FDA label -- Daxxify; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '007d98fd-58b5-4d20-be11-caf421c0dccb'::uuid));

-- #28: Dysport + Sculptra Aesthetic — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles (immediate effect); Sculptra stimulates collagen production (gradual effect over months). Dysport''s broader diffusion pattern and faster onset make it well-suited for treating larger surface areas like the forehead and lateral canthal lines. Both are Galderma products, giving practices ecosystem alignment in loyalty programs and training. Note: No published controlled trial data exists for this specific combination. The FDA Sculptra label states that safety and effectiveness in combination with other products have not been evaluated in controlled clinical trials.',
'Can be same session or staggered. Long-term plan: Dysport every 3-4 months, Sculptra series of 2-3 sessions 4-6 weeks apart, then annual maintenance. Dysport''s faster onset (2-3 days vs 7-14 for some toxins) means patients see initial results quickly while waiting for Sculptra''s gradual collagen build.',
true,
'Tell the patient: "Dysport smooths the lines caused by facial expressions -- it works quickly, usually within a couple of days, and has a natural spread that works well for broader areas like your forehead. But expression lines are only part of what changes with age. Over time, you also lose the collagen that gives your face its structure. Sculptra works gradually over months to support collagen production. Your provider may suggest using both, depending on your situation -- Dysport handles what your muscles are doing on the surface, Sculptra supports what''s underneath. This combination is used in clinical practice, but it has not been evaluated in controlled clinical trials, so your provider can discuss whether it makes sense for you."',
'"When a patient is concerned about both expression lines and overall facial structure, explain: ''There are really two different things happening. The lines around your eyes and across your forehead are from muscle movement -- Dysport addresses that, and it tends to spread nicely for a natural look over broader areas. But the overall loss of fullness and firmness is from collagen breaking down over time. Sculptra works gradually to support collagen production.'' Both are Galderma products, which can simplify loyalty program conversations. This combination is used in clinical practice but has not been evaluated in controlled trials. Present it as an option the provider may recommend based on the patient''s individual needs."',
true, false, 'FDA Sculptra Aesthetic labeling; FDA label -- Dysport; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'::uuid));

-- #29: Jeuveau + Sculptra Aesthetic — common (strength: moderate)
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '8adda68a-9fd2-49ad-8852-641970135131'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'complementary'::relationship_type, 'moderate'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles (immediate effect); Sculptra stimulates collagen production (gradual effect over months). Jeuveau is an aesthetics-only neurotoxin (prabotulinumtoxinA) with an equivalent BoNT-A mechanism to other neurotoxins. The core pairing logic is the same as any neurotoxin + biostimulator combination. Note: No published controlled trial data exists for this specific combination, and Jeuveau-specific combination evidence is limited. The pairing rationale relies on class-level clinical reasoning for neurotoxin + biostimulator combinations. The FDA Sculptra label states that safety and effectiveness in combination with other products have not been evaluated in controlled clinical trials.',
'Can be same session or staggered. Long-term plan: Jeuveau every 3-4 months, Sculptra series of 2-3 sessions 4-6 weeks apart, then annual maintenance.',
true,
'Tell the patient: "Jeuveau is a neurotoxin designed specifically for aesthetics -- it smooths the lines caused by facial expressions like frowning or squinting. But expression lines are only part of what changes with age. Over time, you also lose the collagen that supports your facial structure. Sculptra works gradually over months to support collagen production. Your provider may suggest using both, depending on your individual situation. This combination is used in clinical practice, but it has not been evaluated in controlled clinical trials, so your provider can discuss whether it makes sense for you."',
'"The neurotoxin + biostimulator rationale applies to Jeuveau the same way it does to any neurotoxin -- expression lines and collagen loss are two different problems. ''Jeuveau addresses the lines from muscle movement. Sculptra supports collagen production over time. They work at different depths and on different timelines.'' This combination is used in clinical practice but has not been evaluated in controlled trials. Jeuveau-specific combination evidence is limited compared to other neurotoxins -- the pairing rationale is based on class-level clinical reasoning. Present it as an option the provider may recommend based on the patient''s individual needs."',
true, false, 'FDA Sculptra Aesthetic labeling; FDA label -- Jeuveau; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '8adda68a-9fd2-49ad-8852-641970135131'::uuid));

-- #30: Xeomin + Sculptra Aesthetic — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid, '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid, 'complementary'::relationship_type, 'strong'::relationship_strength, 'common',
'Neurotoxin relaxes dynamic muscles (immediate effect); Sculptra stimulates collagen production (gradual effect over months). Xeomin is a purified neurotoxin containing only 0.55ng of accessory protein, which may reduce the risk of antibody formation over repeated treatments. This property is particularly relevant when pairing with Sculptra for long-term aging management plans, since both treatments are used over years and minimizing immunogenicity risk supports sustained efficacy. Xeomin is also room-temperature stable, simplifying practice logistics. Note: No published controlled trial data exists for this specific combination. The FDA Sculptra label states that safety and effectiveness in combination with other products have not been evaluated in controlled clinical trials.',
'Can be same session or staggered. Long-term plan: Xeomin every 3-4 months, Sculptra series of 2-3 sessions 4-6 weeks apart, then annual maintenance. Xeomin''s accessory-protein-free formulation is a consideration some providers weigh for patients committed to long-term neurotoxin + biostimulator maintenance.',
true,
'Tell the patient: "Xeomin is a purified form of neurotoxin -- it contains only the active ingredient without the extra proteins found in some other options. This may matter over the long term because your body is less likely to develop resistance to it. It smooths lines caused by facial expressions. But expression lines are only part of what changes with age. Over time, you lose the collagen that gives your face its structure. Sculptra works gradually over months to support collagen production. Your provider may suggest using both if you''re thinking about a long-term plan for both expression lines and structural support. This combination is used in clinical practice, but it has not been evaluated in controlled clinical trials, so your provider can discuss whether it makes sense for your individual situation."',
'"When discussing Xeomin + Sculptra, the key differentiator is long-term planning. ''Xeomin is a pure-form neurotoxin -- it''s been processed to remove the accessory proteins, which may reduce the chance of your body building resistance over time. That matters when we''re talking about a treatment plan that spans years, combining regular neurotoxin with Sculptra for collagen support. Xeomin handles the expression lines; Sculptra supports the underlying structure.'' This combination is used in clinical practice but has not been evaluated in controlled trials. For patients already committed to long-term aesthetic maintenance, the accessory-protein-free formulation is a clinical consideration some providers weigh -- it does not prevent antibody formation, but some providers find it relevant for extended treatment plans. Xeomin is a Merz product. Present this as an option the provider may recommend based on individual needs."',
true, false, 'FDA Sculptra Aesthetic labeling; FDA label -- Xeomin; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid) OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa'::uuid AND item_b_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'::uuid));


-- ===== Botox + Morpheus8 (Batch 3 — common) =====

-- #31: Botox Cosmetic + InMode Morpheus8 — common
INSERT INTO item_relationships (id, item_a_id, item_b_id, relationship_type, relationship_strength, pairing_tier, clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference)
SELECT gen_random_uuid(), '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid, '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid, 'stacks_with'::relationship_type, 'strong'::relationship_strength, 'common',
'Morpheus8 RF microneedling improves skin texture, tightens skin, and stimulates collagen through controlled thermal energy in the dermis and subdermal layers. Botox controls dynamic wrinkles through muscle relaxation. These target fundamentally different tissue layers and aging mechanisms -- Morpheus8 addresses skin quality that neurotoxin cannot improve, while Botox addresses movement-based lines that energy devices cannot treat. Multi-modality stacking protocols in accepted clinical practice place energy devices and neurotoxin as complementary layers in comprehensive treatment.',
'Energy device first, neurotoxin after. If same day: Morpheus8 first, wait for assessment, then neurotoxin. If sequential: Morpheus8 first, neurotoxin 1-2 weeks later when inflammation has resolved. Maintenance: Morpheus8 2-3x per year, neurotoxin every 3-4 months.',
true,
'Tell the patient: "Morpheus8 uses radiofrequency energy to improve your skin''s texture, firmness, and overall quality from within. Botox addresses a completely different issue -- the lines caused by muscle movement, like crow''s feet and frown lines. Energy treatments can''t relax muscles, and Botox can''t tighten skin. When both concerns are present, addressing them through different approaches can create a more complete improvement."',
'"When a patient wants comprehensive facial rejuvenation, explain that there are multiple layers to aging. ''Morpheus8 works on your skin quality -- improving texture, firmness, and stimulating new collagen. Botox works on the dynamic lines caused by muscle movement. Think of it as addressing the skin itself and the muscles underneath it separately. We typically do the energy treatment first to improve the skin foundation, then address the movement lines.'' This is about treating different problems, not adding treatments for the sake of adding them."',
true, false, 'PubMed DOI 10.1111/j.1524-4725.2005.31105; FDA clearance -- Botox Cosmetic; FDA clearance -- InMode Morpheus8; Expert consensus'
WHERE NOT EXISTS (SELECT 1 FROM item_relationships WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid) OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb'::uuid));
