-- =============================================================================
-- Phase 12-01: Fuel Doc Schema Unification
-- Migrates / inserts all pairing_fuel rows in agent_fuel_documents
-- from Format A (flat) and Format B (nested) to canonical combination template
-- IDEMPOTENT: Safe to run multiple times (uses INSERT ... ON CONFLICT DO UPDATE)
-- STATUS: draft — do not execute without Chris approval
-- =============================================================================
--
-- CRITICAL FINDINGS FROM SCHEMA AUDIT (12-01-PLAN.md Task 1):
--
--   Table name:   agent_fuel_documents      (NOT gl_agent_fuel_documents)
--   JSON column:  content                   (NOT agent_fuel_json)
--   Type column:  fuel_type                 (values: category_fuel, product_fuel, pairing_fuel)
--   Status col:   status                    (NOT review_status; values: draft, active, archived)
--   Pairing link: item_relationship_id      (UUID FK to item_relationships)
--   Product link: offering_id               (UUID FK to offerings/products)
--   NO columns:   product_name, source_type, agent_fuel_json, review_status, product_ids[],
--                 relationship_ids[], audience[], patient_safe, metadata
--
--   LIVE DB STATE: Zero pairing_fuel rows exist. All 16 rows need INSERT, not UPDATE.
--   The Format A (6 docs) and Format B (10 docs) from FUEL_DOC_TEMPLATE_SPEC.md were
--   described as existing in a prior development context but were never inserted into the
--   live agent_fuel_documents table. This migration creates them fresh in canonical format.
--
-- CANONICAL TEMPLATE: FUEL_DOC_TEMPLATE_SPEC.md (template_version: "1.0")
-- REQUIREMENTS: COMBO-04 (COALESCE-ready structure), COMBO-05 (unified JSON format)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- STEP 1: Verify table exists with expected columns
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'agent_fuel_documents'
  ) THEN
    RAISE EXCEPTION 'Table agent_fuel_documents does not exist. Run schema migration first.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'agent_fuel_documents'
    AND column_name = 'fuel_type'
  ) THEN
    RAISE EXCEPTION 'Column fuel_type not found on agent_fuel_documents. Schema mismatch.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'agent_fuel_documents'
    AND column_name = 'content'
  ) THEN
    RAISE EXCEPTION 'Column content not found on agent_fuel_documents. Schema mismatch (expected content not agent_fuel_json).';
  END IF;

  RAISE NOTICE 'Schema check PASSED: agent_fuel_documents exists with fuel_type and content columns.';
END $$;

-- ---------------------------------------------------------------------------
-- STEP 2: Universal do-not-say list (12 items per PHASE_8_COMBINATION_RESEARCH_SPEC.md)
-- Applied to every pairing_fuel row via the canonical template
-- ---------------------------------------------------------------------------

-- These 12 items populate do_not_say.universal in every combination fuel doc:
-- 1. Unsupported clinical claims ("clinically proven to reverse aging")
-- 2. Guarantees ("I guarantee you'll love the results")
-- 3. "You need this" pressure ("You really need both")
-- 4. Fear-based selling ("Without this, your skin will only get worse")
-- 5. Competitor disparagement
-- 6. "Liquid facelift" overclaims ("Just like a facelift without surgery")
-- 7. "No downtime" when downtime exists ("There's absolutely no downtime")
-- 8. Permanent result claims ("These results are permanent")
-- 9. Off-label combination approval claims ("This combination is FDA-approved")
-- 10. "No risk" statements ("This is completely risk-free")
-- 11. Price/value claims practices may not honor ("This package saves you 30%")
-- 12. Before/after exaggerations ("You'll look 20 years younger")

-- Define shared JSON snippets used in every INSERT below
-- (Postgres does not have template variables; we repeat the canonical structure per INSERT)

-- ---------------------------------------------------------------------------
-- STEP 3: INSERT canonical empty pairing_fuel rows (Format A reconciliation)
--
-- Format A had: patient_facing_name, one_line_positioning, staff_close,
-- do_not_say (array→object), who_it_is_for→ideal_candidate, why_together,
-- clinical_rationale, patient_education_summary, sequencing_note, timing_note
--
-- Transformation applied:
-- - do_not_say array → {"universal": [...12 items], "pair_specific": [], "practice_specific": []}
-- - who_it_is_for → ideal_candidate (rename)
-- - All missing canonical fields added with empty/null defaults
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- STEP 4: INSERT canonical empty pairing_fuel rows (Format B reconciliation)
--
-- Format B had: archetype_id, archetype_name, content.clinical_rationale,
-- content.patient_education, content.staff_talking_points, product_pairs[]
--
-- Transformation applied:
-- - content.clinical_rationale → top-level clinical_rationale
-- - content.patient_education → patient_education_summary
-- - content.staff_talking_points → staff_talking_points
-- - archetype_id, archetype_name, product_pairs → DROPPED (see SCHEMA_AUDIT.md)
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- INSERT PATTERN: ON CONFLICT DO UPDATE (idempotent by fuel_type + item_relationship_id)
-- Since item_relationship_id is NULL until Phase 06 SQL executes, we use a deterministic
-- UUID seed approach: if the row with these pair names exists (by content->>'pair_key'),
-- update it; otherwise insert it.
--
-- pair_key convention: '{product_a_slug}__{product_b_slug}' (alphabetical order)
-- This field is internal metadata in the content JSONB for idempotency targeting.
-- ---------------------------------------------------------------------------

-- Shared do_not_say universal JSON (used in all INSERTs below):
-- '{"universal": ["Do not make unsupported clinical claims such as clinically proven to reverse aging",
--   "Do not make guarantees about results",
--   "Do not use you need this or similar pressure language",
--   "Do not use fear-based selling language",
--   "Do not disparage competitors",
--   "Do not call this a liquid facelift or imply equivalence to surgery",
--   "Do not say no downtime when downtime exists",
--   "Do not claim results are permanent",
--   "Do not claim the combination is FDA-approved as a package",
--   "Do not say no risk or risk-free",
--   "Do not make price or savings claims that the practice cannot honor",
--   "Do not imply patients will look significantly younger such as 20 years younger"],
--  "pair_specific": [], "practice_specific": []}'

-- ===========================================================================
-- CANONICAL TEMPLATE INSERT (applied to all 16 pairing_fuel rows)
-- ===========================================================================
-- Each INSERT below represents one of the 16 target pairing_fuel rows.
-- content->>'pair_key' is the idempotency key.
-- item_relationship_id is NULL until Phase 06 SQL executes (FK backfill needed).
-- All content fields start empty/null — Phase 12-02 populates them with corpus-grounded content.
-- ===========================================================================

-- Helper: canonical do_not_say JSON (declared as constant for readability)
-- Used in every INSERT. See 12-item list above.

-- ---------------------------------------------------------------------------
-- CANONICAL PAIR 1: Botox Cosmetic + Juvederm Vollure XC
-- Tier: canonical | Evidence: HIGH | Same session: true
-- Format A classification (had patient_facing_name, flat structure)
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (
  item_relationship_id,
  fuel_type,
  content,
  version,
  status
)
SELECT
  NULL::UUID,  -- item_relationship_id: backfill when item_relationships are populated
  'pairing_fuel',
  jsonb_build_object(
    -- IDENTITY
    'fuel_type',                'combination',
    'template_version',         '1.0',
    'pair_key',                 'botox_cosmetic__juvederm_vollure_xc',

    -- WHAT THIS IS
    'patient_facing_name',      '',
    'one_line_positioning',     '',
    'package_goal',             '',

    -- WHO IT IS FOR
    'ideal_candidate',          '',
    'not_ideal_candidate',      '',
    'concern_tags',             '[]'::jsonb,

    -- WHY TOGETHER
    'why_together',             '',
    'A_solves',                 '',
    'A_does_not_solve',         '',
    'B_adds',                   '',
    'clinical_rationale',       '',

    -- WHAT TO SAY
    'patient_education_summary', '',
    'staff_close',              '',
    'staff_talking_points',     '',

    -- WHAT NOT TO SAY
    'do_not_say', jsonb_build_object(
      'universal', jsonb_build_array(
        'Do not make unsupported clinical claims such as clinically proven to reverse aging',
        'Do not make guarantees about results',
        'Do not use you need this or similar pressure language',
        'Do not use fear-based selling language',
        'Do not disparage competitors',
        'Do not call this a liquid facelift or imply equivalence to surgery',
        'Do not say no downtime when downtime exists',
        'Do not claim results are permanent',
        'Do not claim the combination is FDA-approved as a package',
        'Do not say no risk or risk-free',
        'Do not make price or savings claims that the practice cannot honor',
        'Do not imply patients will look significantly younger such as 20 years younger'
      ),
      'pair_specific',     '[]'::jsonb,
      'practice_specific', '[]'::jsonb
    ),

    -- OBJECTION HANDLING
    'top_objections',           '[]'::jsonb,

    -- TIMING
    'sequencing_note',          '',
    'timing_note',              '',
    'downtime_note',            '',
    'same_session_ok',          true,  -- from review card

    -- MAINTENANCE
    'maintenance_story',        '',
    'rebooking_trigger',        '',
    'next_visit_prompt',        '',

    -- EVIDENCE
    'source_support_summary',   '',
    'evidence_level',           '',

    -- METADATA
    'review_status',            'draft',
    'audience',                 '["agent","staff"]'::jsonb,
    'patient_safe',             false,
    'last_reviewed',            NULL,
    'reviewed_by',              NULL
  ),
  1,
  'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel'
    AND content->>'pair_key' = 'botox_cosmetic__juvederm_vollure_xc'
);

-- ---------------------------------------------------------------------------
-- CANONICAL PAIR 2: Botox Cosmetic + Juvederm Voluma XC
-- Tier: canonical | Evidence: HIGH | Same session: true
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'botox_cosmetic__juvederm_voluma_xc',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'botox_cosmetic__juvederm_voluma_xc'
);

-- ---------------------------------------------------------------------------
-- CANONICAL PAIR 3: Botox Cosmetic + Restylane Lyft
-- Tier: canonical | Evidence: HIGH | Same session: true
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'botox_cosmetic__restylane_lyft',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'botox_cosmetic__restylane_lyft'
);

-- ---------------------------------------------------------------------------
-- CANONICAL PAIR 4: Botox Cosmetic + RHA Redensity
-- Tier: canonical | Evidence: HIGH | Same session: true
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'botox_cosmetic__rha_redensity',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'botox_cosmetic__rha_redensity'
);

-- ---------------------------------------------------------------------------
-- CANONICAL PAIR 5: Botox Cosmetic + Sculptra Aesthetic
-- Tier: canonical | Evidence: HIGH | Same session: check
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'botox_cosmetic__sculptra_aesthetic',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', NULL,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'botox_cosmetic__sculptra_aesthetic'
);

-- ---------------------------------------------------------------------------
-- CANONICAL PAIR 6: Botox Cosmetic + SKINVIVE by Juvederm
-- Tier: canonical | Evidence: HIGH | Same session: true
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'botox_cosmetic__skinvive_by_juvederm',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'botox_cosmetic__skinvive_by_juvederm'
);

-- ---------------------------------------------------------------------------
-- COMMON PAIR 7: Daxxify + Juvederm Vollure XC
-- Tier: common | Format B archetype (archetype_id: neurotoxin_ha_filler)
-- content.clinical_rationale → clinical_rationale (extracted from nested)
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'daxxify__juvederm_vollure_xc',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'daxxify__juvederm_vollure_xc'
);

-- ---------------------------------------------------------------------------
-- COMMON PAIR 8: Daxxify + Juvederm Voluma XC
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'daxxify__juvederm_voluma_xc',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'daxxify__juvederm_voluma_xc'
);

-- ---------------------------------------------------------------------------
-- COMMON PAIR 9: Daxxify + Restylane Lyft
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'daxxify__restylane_lyft',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'daxxify__restylane_lyft'
);

-- ---------------------------------------------------------------------------
-- COMMON PAIR 10: Daxxify + RHA Redensity
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'daxxify__rha_redensity',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'daxxify__rha_redensity'
);

-- ---------------------------------------------------------------------------
-- COMMON PAIR 11: Daxxify + SKINVIVE by Juvederm
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'daxxify__skinvive_by_juvederm',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'daxxify__skinvive_by_juvederm'
);

-- ---------------------------------------------------------------------------
-- COMMON PAIR 12: Dysport + Juvederm Vollure XC
-- Format B archetype (archetype_id: neurotoxin_ha_filler)
-- content.clinical_rationale → clinical_rationale, content.patient_education → patient_education_summary
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'dysport__juvederm_vollure_xc',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'dysport__juvederm_vollure_xc'
);

-- ---------------------------------------------------------------------------
-- COMMON PAIR 13: Dysport + Juvederm Voluma XC
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'dysport__juvederm_voluma_xc',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'dysport__juvederm_voluma_xc'
);

-- ---------------------------------------------------------------------------
-- COMMON PAIR 14: Dysport + Restylane Lyft
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'dysport__restylane_lyft',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'dysport__restylane_lyft'
);

-- ---------------------------------------------------------------------------
-- COMMON PAIR 15: Dysport + RHA Redensity
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'dysport__rha_redensity',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'dysport__rha_redensity'
);

-- ---------------------------------------------------------------------------
-- COMMON PAIR 16: Dysport + SKINVIVE by Juvederm
-- ---------------------------------------------------------------------------
INSERT INTO agent_fuel_documents (item_relationship_id, fuel_type, content, version, status)
SELECT NULL::UUID, 'pairing_fuel', jsonb_build_object(
  'fuel_type', 'combination', 'template_version', '1.0',
  'pair_key', 'dysport__skinvive_by_juvederm',
  'patient_facing_name', '', 'one_line_positioning', '', 'package_goal', '',
  'ideal_candidate', '', 'not_ideal_candidate', '', 'concern_tags', '[]'::jsonb,
  'why_together', '', 'A_solves', '', 'A_does_not_solve', '', 'B_adds', '', 'clinical_rationale', '',
  'patient_education_summary', '', 'staff_close', '', 'staff_talking_points', '',
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific', '[]'::jsonb, 'practice_specific', '[]'::jsonb
  ),
  'top_objections', '[]'::jsonb,
  'sequencing_note', '', 'timing_note', '', 'downtime_note', '', 'same_session_ok', true,
  'maintenance_story', '', 'rebooking_trigger', '', 'next_visit_prompt', '',
  'source_support_summary', '', 'evidence_level', '',
  'review_status', 'draft', 'audience', '["agent","staff"]'::jsonb,
  'patient_safe', false, 'last_reviewed', NULL, 'reviewed_by', NULL
), 1, 'draft'
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel' AND content->>'pair_key' = 'dysport__skinvive_by_juvederm'
);

-- ===========================================================================
-- ADDITIONAL UPDATE BLOCK: If any pairing_fuel rows exist in Format A or Format B
-- format (from an older import), migrate them to the canonical template.
-- ===========================================================================

-- UPDATE Format A rows (identified by top-level patient_facing_name key)
-- Preserves existing values; adds missing canonical keys; transforms do_not_say array to object.
UPDATE agent_fuel_documents
SET content = jsonb_build_object(
  -- IDENTITY
  'fuel_type',               'combination',
  'template_version',        '1.0',
  'pair_key',                COALESCE(content->>'pair_key', ''),

  -- WHAT THIS IS (preserve existing)
  'patient_facing_name',     COALESCE(content->>'patient_facing_name', ''),
  'one_line_positioning',    COALESCE(content->>'one_line_positioning', ''),
  'package_goal',            COALESCE(content->>'package_goal', ''),

  -- WHO IT IS FOR (who_it_is_for -> ideal_candidate rename)
  'ideal_candidate',         COALESCE(content->>'ideal_candidate', content->>'who_it_is_for', ''),
  'not_ideal_candidate',     COALESCE(content->>'not_ideal_candidate', ''),
  'concern_tags',            COALESCE(content->'concern_tags', '[]'::jsonb),

  -- WHY TOGETHER (preserve existing)
  'why_together',            COALESCE(content->>'why_together', ''),
  'A_solves',                COALESCE(content->>'A_solves', ''),
  'A_does_not_solve',        COALESCE(content->>'A_does_not_solve', ''),
  'B_adds',                  COALESCE(content->>'B_adds', ''),
  'clinical_rationale',      COALESCE(content->>'clinical_rationale', ''),

  -- WHAT TO SAY (preserve existing)
  'patient_education_summary', COALESCE(content->>'patient_education_summary', ''),
  'staff_close',             COALESCE(content->>'staff_close', ''),
  'staff_talking_points',    COALESCE(content->>'staff_talking_points', ''),

  -- WHAT NOT TO SAY (transform: array -> object with universal/pair_specific/practice_specific)
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific',     COALESCE(content->'do_not_say'->'pair_specific', '[]'::jsonb),
    'practice_specific', '[]'::jsonb
  ),

  -- OBJECTION HANDLING
  'top_objections',          COALESCE(content->'top_objections', '[]'::jsonb),

  -- TIMING (preserve existing)
  'sequencing_note',         COALESCE(content->>'sequencing_note', ''),
  'timing_note',             COALESCE(content->>'timing_note', ''),
  'downtime_note',           COALESCE(content->>'downtime_note', ''),
  'same_session_ok',         (content->>'same_session_ok')::boolean,

  -- MAINTENANCE
  'maintenance_story',       COALESCE(content->>'maintenance_story', ''),
  'rebooking_trigger',       COALESCE(content->>'rebooking_trigger', ''),
  'next_visit_prompt',       COALESCE(content->>'next_visit_prompt', ''),

  -- EVIDENCE
  'source_support_summary',  COALESCE(content->>'source_support_summary', ''),
  'evidence_level',          COALESCE(content->>'evidence_level', ''),

  -- METADATA
  'review_status',           COALESCE(content->>'review_status', 'draft'),
  'audience',                COALESCE(content->'audience', '["agent","staff"]'::jsonb),
  'patient_safe',            COALESCE((content->>'patient_safe')::boolean, false),
  'last_reviewed',           content->>'last_reviewed',
  'reviewed_by',             content->>'reviewed_by'
),
updated_at = now()
WHERE fuel_type = 'pairing_fuel'
  AND content ? 'patient_facing_name'        -- Format A selector
  AND NOT (content ? 'template_version');    -- Skip already-migrated rows

-- UPDATE Format B rows (identified by top-level archetype_id key)
-- Extracts nested content fields; drops archetype_id, archetype_name, product_pairs.
UPDATE agent_fuel_documents
SET content = jsonb_build_object(
  -- IDENTITY
  'fuel_type',               'combination',
  'template_version',        '1.0',
  'pair_key',                COALESCE(content->>'pair_key', ''),

  -- WHAT THIS IS
  'patient_facing_name',     COALESCE(content->>'patient_facing_name', ''),
  'one_line_positioning',    COALESCE(content->>'one_line_positioning', ''),
  'package_goal',            COALESCE(content->>'package_goal', ''),

  -- WHO IT IS FOR
  'ideal_candidate',         COALESCE(content->>'ideal_candidate', ''),
  'not_ideal_candidate',     COALESCE(content->>'not_ideal_candidate', ''),
  'concern_tags',            COALESCE(content->'concern_tags', '[]'::jsonb),

  -- WHY TOGETHER (extract from nested content)
  'why_together',            COALESCE(content->>'why_together', ''),
  'A_solves',                COALESCE(content->>'A_solves', ''),
  'A_does_not_solve',        COALESCE(content->>'A_does_not_solve', ''),
  'B_adds',                  COALESCE(content->>'B_adds', ''),
  -- Format B: content.clinical_rationale → clinical_rationale
  'clinical_rationale',      COALESCE(content->'content'->>'clinical_rationale', content->>'clinical_rationale', ''),

  -- WHAT TO SAY (extract from nested content)
  -- Format B: content.patient_education → patient_education_summary
  'patient_education_summary', COALESCE(content->'content'->>'patient_education', content->>'patient_education_summary', ''),
  'staff_close',             COALESCE(content->>'staff_close', ''),
  -- Format B: content.staff_talking_points → staff_talking_points
  'staff_talking_points',    COALESCE(content->'content'->>'staff_talking_points', content->>'staff_talking_points', ''),

  -- WHAT NOT TO SAY (add universal list; Format B had no do_not_say)
  'do_not_say', jsonb_build_object(
    'universal', jsonb_build_array(
      'Do not make unsupported clinical claims such as clinically proven to reverse aging',
      'Do not make guarantees about results',
      'Do not use you need this or similar pressure language',
      'Do not use fear-based selling language',
      'Do not disparage competitors',
      'Do not call this a liquid facelift or imply equivalence to surgery',
      'Do not say no downtime when downtime exists',
      'Do not claim results are permanent',
      'Do not claim the combination is FDA-approved as a package',
      'Do not say no risk or risk-free',
      'Do not make price or savings claims that the practice cannot honor',
      'Do not imply patients will look significantly younger such as 20 years younger'
    ),
    'pair_specific',     '[]'::jsonb,
    'practice_specific', '[]'::jsonb
  ),

  -- OBJECTION HANDLING
  'top_objections',          COALESCE(content->'top_objections', '[]'::jsonb),

  -- TIMING
  'sequencing_note',         COALESCE(content->>'sequencing_note', ''),
  'timing_note',             COALESCE(content->>'timing_note', ''),
  'downtime_note',           COALESCE(content->>'downtime_note', ''),
  'same_session_ok',         (content->>'same_session_ok')::boolean,

  -- MAINTENANCE
  'maintenance_story',       COALESCE(content->>'maintenance_story', ''),
  'rebooking_trigger',       COALESCE(content->>'rebooking_trigger', ''),
  'next_visit_prompt',       COALESCE(content->>'next_visit_prompt', ''),

  -- EVIDENCE
  'source_support_summary',  COALESCE(content->>'source_support_summary', ''),
  'evidence_level',          COALESCE(content->>'evidence_level', ''),

  -- METADATA
  'review_status',           COALESCE(content->>'review_status', 'draft'),
  'audience',                COALESCE(content->'audience', '["agent","staff"]'::jsonb),
  'patient_safe',            COALESCE((content->>'patient_safe')::boolean, false),
  'last_reviewed',           content->>'last_reviewed',
  'reviewed_by',             content->>'reviewed_by'
  -- NOTE: archetype_id, archetype_name, product_pairs are intentionally dropped
  -- See SCHEMA_AUDIT.md "Fields from Format B dropped with justification"
),
updated_at = now()
WHERE fuel_type = 'pairing_fuel'
  AND content ? 'archetype_id'           -- Format B selector
  AND NOT (content ? 'template_version'); -- Skip already-migrated rows

-- ===========================================================================
-- VERIFICATION
-- ===========================================================================
-- Run after execution to confirm all pairing_fuel rows are in canonical format.
-- Expected: total = 16 (or more if additional pairs exist), migrated = total, versioned = total

SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE content->>'fuel_type' = 'combination') AS migrated,
  COUNT(*) FILTER (WHERE content->>'template_version' = '1.0') AS versioned,
  COUNT(*) FILTER (WHERE content ? 'do_not_say') AS has_do_not_say,
  COUNT(*) FILTER (WHERE content->'do_not_say' ? 'universal') AS has_universal_list
FROM agent_fuel_documents
WHERE fuel_type = 'pairing_fuel';

-- Expected output when all 16 rows conform:
-- total | migrated | versioned | has_do_not_say | has_universal_list
--    16 |       16 |        16 |             16 |                 16
