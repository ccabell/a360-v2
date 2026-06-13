-- Phase 07: Timing Rules Schema Migration
-- Date: 2026-06-13
-- Columns added: 22 (11 on gl_products, 11 on item_relationships)
-- Purpose: Promote timing from prose to queryable data for agent retrieval

-- =============================================================================
-- gl_products — 11 new columns (per D-4, D-10, D-13)
-- =============================================================================

ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS initial_series_count INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS initial_interval_days_min INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS initial_interval_days_max INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS maintenance_interval_days_min INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS maintenance_interval_days_max INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS minimum_retreatment_days INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS typical_followup_days INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS downtime_days_min INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS downtime_days_max INTEGER;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS downtime_description TEXT;
ALTER TABLE gl_products ADD COLUMN IF NOT EXISTS cadence_notes TEXT;

COMMENT ON COLUMN gl_products.initial_series_count IS 'Number of sessions in initial treatment series (e.g., 3 for Sculptra). Phase 07 timing-rules.';
COMMENT ON COLUMN gl_products.initial_interval_days_min IS 'Minimum days between initial series sessions. Phase 07.';
COMMENT ON COLUMN gl_products.initial_interval_days_max IS 'Maximum days between initial series sessions. Phase 07.';
COMMENT ON COLUMN gl_products.maintenance_interval_days_min IS 'Minimum days between maintenance sessions. Phase 07.';
COMMENT ON COLUMN gl_products.maintenance_interval_days_max IS 'Maximum days between maintenance sessions. Phase 07.';
COMMENT ON COLUMN gl_products.minimum_retreatment_days IS 'Safety floor: minimum days before retreatment allowed (e.g., 85 for BoNT-A). Phase 07.';
COMMENT ON COLUMN gl_products.typical_followup_days IS 'Standard follow-up appointment timing in days (e.g., 14 for full-effect check). Phase 07.';
COMMENT ON COLUMN gl_products.downtime_days_min IS 'Minimum recovery/downtime days. Phase 07.';
COMMENT ON COLUMN gl_products.downtime_days_max IS 'Maximum recovery/downtime days. Phase 07.';
COMMENT ON COLUMN gl_products.downtime_description IS 'Human-readable downtime description including social downtime and restrictions. Phase 07.';
COMMENT ON COLUMN gl_products.cadence_notes IS 'Area-specific cadence exceptions, dose-response notes, extending intervals. Phase 07.';

-- =============================================================================
-- item_relationships — 11 new columns (per D-7, D-10, D-11, D-13)
-- =============================================================================

ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS same_session_ok BOOLEAN;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS same_session_rationale TEXT;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS staging_required BOOLEAN DEFAULT false;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS staging_sequence TEXT;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS staging_interval_days_min INTEGER;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS staging_interval_days_max INTEGER;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS staging_rationale TEXT;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS combined_downtime_note TEXT;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS safety_critical BOOLEAN DEFAULT false;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS timing_warning_level TEXT;
ALTER TABLE item_relationships ADD COLUMN IF NOT EXISTS timing_notes TEXT;

COMMENT ON COLUMN item_relationships.same_session_ok IS 'Whether products can be combined same session. Default posture is YES per D-1. Phase 07.';
COMMENT ON COLUMN item_relationships.same_session_rationale IS 'Clinical rationale for same-session compatibility or restriction. Phase 07.';
COMMENT ON COLUMN item_relationships.staging_required IS 'True if treatment order matters for this pair. Phase 07.';
COMMENT ON COLUMN item_relationships.staging_sequence IS 'Which product goes first: product_a_first or product_b_first. Phase 07.';
COMMENT ON COLUMN item_relationships.staging_interval_days_min IS 'Minimum days between staged treatments. Phase 07.';
COMMENT ON COLUMN item_relationships.staging_interval_days_max IS 'Maximum days between staged treatments. Phase 07.';
COMMENT ON COLUMN item_relationships.staging_rationale IS 'Human-readable explanation of why staging/sequencing matters. Phase 07.';
COMMENT ON COLUMN item_relationships.combined_downtime_note IS 'Combined downtime expectation when both treatments done same session or close together. Phase 07.';
COMMENT ON COLUMN item_relationships.safety_critical IS 'True = hard stop or strong warning. Surfaces prominently in agent retrieval and booking logic. Phase 07.';
COMMENT ON COLUMN item_relationships.timing_warning_level IS 'Enforcement tier: hard_block (system-enforced), warning (provider-override), education (informational). Phase 07.';
COMMENT ON COLUMN item_relationships.timing_notes IS 'Freeform timing notes including expert-practice vs published-evidence tensions. Phase 07.';

-- Add CHECK constraint for timing_warning_level
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'item_relationships_timing_warning_level_check'
  ) THEN
    ALTER TABLE item_relationships ADD CONSTRAINT item_relationships_timing_warning_level_check
      CHECK (timing_warning_level IS NULL OR timing_warning_level IN ('hard_block', 'warning', 'education'));
  END IF;
END $$;
