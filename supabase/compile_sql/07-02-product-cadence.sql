-- Phase 07: Product Cadence and Downtime Data
-- Source: PHASE_7_TIMING_RESEARCH_SPEC.md (Cadence Matrix + Downtime Matrix)
-- Products: 18 manifest products (2 GLP-1 skipped per Phase 2 decision)
-- Date: 2026-06-13

-- =============================================================================
-- NEUROTOXINS (5 products)
-- All BoNT-A: initial_series_count=1, no initial interval (single treatment),
-- maintenance 90-180 days, minimum_retreatment_days=85 (PubMed HIGH, Monheit 2009),
-- typical_followup_days=14, downtime 0/0
-- =============================================================================

-- Botox Cosmetic
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 90,
  maintenance_interval_days_max = 180,
  minimum_retreatment_days = 85,
  typical_followup_days = 14,
  downtime_days_min = 0,
  downtime_days_max = 0,
  downtime_description = 'No downtime. Avoid lying down 4 hours post-injection. Avoid strenuous exercise 24 hours.',
  cadence_notes = 'Glabella: 3-4 months typical. Masseter: 4-6 months (higher dose = longer duration). Hyperhidrosis: varies. Cadence extends with repeated use (3mo -> 4-6mo). >50 units per session: warning for antibody risk (published evidence).'
WHERE offering_id = '4b92be36-e84e-432c-8549-f5d85a767fdb';

-- Dysport
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 90,
  maintenance_interval_days_max = 180,
  minimum_retreatment_days = 85,
  typical_followup_days = 14,
  downtime_days_min = 0,
  downtime_days_max = 0,
  downtime_description = 'No downtime. Avoid lying down 4 hours post-injection. Avoid strenuous exercise 24 hours.',
  cadence_notes = 'Faster onset than Botox (3-5 days vs 7-10 days). Higher diffusion radius — may extend treatment intervals. Same 85-day minimum as all BoNT-A products.'
WHERE offering_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43';

-- Xeomin
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 90,
  maintenance_interval_days_max = 180,
  minimum_retreatment_days = 85,
  typical_followup_days = 14,
  downtime_days_min = 0,
  downtime_days_max = 0,
  downtime_description = 'No downtime. Avoid lying down 4 hours post-injection. Avoid strenuous exercise 24 hours.',
  cadence_notes = 'Purified (no complexing proteins) — may reduce antibody formation risk vs other BoNT-A. 14% antibody formation rate reported in clinical literature. Same 85-day minimum.'
WHERE offering_id = '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa';

-- Daxxify
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 120,
  maintenance_interval_days_max = 240,
  minimum_retreatment_days = 85,
  typical_followup_days = 14,
  downtime_days_min = 0,
  downtime_days_max = 0,
  downtime_description = 'No downtime. Avoid lying down 4 hours post-injection. Avoid strenuous exercise 24 hours.',
  cadence_notes = 'Longer duration than other BoNT-A (6-9 months in clinical trials vs 3-4 months). Peptide-powered formulation. Same 85-day minimum but typical maintenance interval is longer.'
WHERE offering_id = '007d98fd-58b5-4d20-be11-caf421c0dccb';

-- Jeuveau
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 90,
  maintenance_interval_days_max = 180,
  minimum_retreatment_days = 85,
  typical_followup_days = 14,
  downtime_days_min = 0,
  downtime_days_max = 0,
  downtime_description = 'No downtime. Avoid lying down 4 hours post-injection. Avoid strenuous exercise 24 hours.',
  cadence_notes = 'Aesthetics-only BoNT-A (no therapeutic indications). Hi-Pure technology. Same 85-day minimum as all BoNT-A products.'
WHERE offering_id = '8adda68a-9fd2-49ad-8852-641970135131';

-- =============================================================================
-- HA FILLERS (5 products)
-- =============================================================================

-- Juvederm Voluma XC (cheeks/midface)
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 365,
  maintenance_interval_days_max = 730,
  minimum_retreatment_days = 90,
  typical_followup_days = 14,
  downtime_days_min = 1,
  downtime_days_max = 2,
  downtime_description = 'Mild swelling 24-48 hours. Bruising possible 7-9 days. No makeup restriction after 24 hours. Avoid alcohol 24 hours.',
  cadence_notes = 'Deepest HA filler in Juvederm portfolio. Duration up to 2 years in clinical trials. Touch-up at 2 weeks if needed. Retreat when volume loss becomes apparent.'
WHERE offering_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9';

-- Juvederm Vollure XC (NLF/marionette)
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 270,
  maintenance_interval_days_max = 540,
  minimum_retreatment_days = 90,
  typical_followup_days = 14,
  downtime_days_min = 1,
  downtime_days_max = 2,
  downtime_description = 'Mild swelling 24-48 hours. Bruising possible 7-9 days. No makeup restriction after 24 hours. Avoid alcohol 24 hours.',
  cadence_notes = 'VYCROSS technology for smooth integration. Duration up to 18 months. Touch-up at 2 weeks.'
WHERE offering_id = '7370545f-97a3-4519-a92d-3ac4f969829d';

-- SKINVIVE by Juvederm (skin quality)
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 180,
  maintenance_interval_days_max = 270,
  minimum_retreatment_days = 90,
  typical_followup_days = 30,
  downtime_days_min = 0,
  downtime_days_max = 1,
  downtime_description = 'Minimal downtime. Small injection bumps resolve within hours. Mild redness possible.',
  cadence_notes = 'Microdroplet technique. Duration approximately 6-9 months. Follow-up at 1 month to assess skin quality improvement.'
WHERE offering_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de';

-- Restylane Lyft (cheeks/hands)
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 270,
  maintenance_interval_days_max = 540,
  minimum_retreatment_days = 90,
  typical_followup_days = 14,
  downtime_days_min = 1,
  downtime_days_max = 2,
  downtime_description = 'Mild swelling 24-48 hours. Bruising possible 7-9 days. No makeup restriction after 24 hours.',
  cadence_notes = 'FDA-approved for cheeks and dorsal hands. Larger particle size for volume restoration. Duration up to 12-18 months depending on area.'
WHERE offering_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506';

-- RHA Redensity (perioral/lips)
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 180,
  maintenance_interval_days_max = 365,
  minimum_retreatment_days = 90,
  typical_followup_days = 14,
  downtime_days_min = 2,
  downtime_days_max = 3,
  downtime_description = 'Swelling 2-3 days (lips). Bruising possible 7-9 days. No makeup restriction after 24 hours. Avoid alcohol 24 hours.',
  cadence_notes = 'Resilient HA technology for dynamic areas. Lips: 2-3 days swelling typical. Touch-up at 2 weeks for symmetry. Migration/nodule check at 14 days.'
WHERE offering_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930';

-- =============================================================================
-- BIOSTIMULATORS (1 product)
-- =============================================================================

-- Sculptra Aesthetic (PLLA)
UPDATE gl_products SET
  initial_series_count = 3,
  initial_interval_days_min = 28,
  initial_interval_days_max = 42,
  maintenance_interval_days_min = 365,
  maintenance_interval_days_max = 730,
  minimum_retreatment_days = 28,
  typical_followup_days = 60,
  downtime_days_min = 1,
  downtime_days_max = 3,
  downtime_description = 'Swelling 1-3 days typical. Resolves to baseline before collagen results appear (2 months). No makeup restriction after 24 hours. Massage 5-5-5 rule required.',
  cadence_notes = 'Vial-per-decade rule (50yo = 5 vials over series). Results visible at 2-6 months. Effects last 2-5 years (PubMed HIGH). Touch-up at years 2-4. Diluted protocol may differ from reconstituted.'
WHERE offering_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa';

-- =============================================================================
-- BODY CONTOURING / FAT REDUCTION (2 products)
-- =============================================================================

-- CoolSculpting Elite
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = NULL,
  maintenance_interval_days_max = NULL,
  minimum_retreatment_days = 42,
  typical_followup_days = 90,
  downtime_days_min = 0,
  downtime_days_max = 0,
  downtime_description = 'No downtime. Possible numbness, tingling, redness at treatment site. No restrictions on activity or makeup.',
  cadence_notes = 'Results at 2-3 months. Retreatment too soon adds inflammation without benefit. PAH (paradoxical adipose hypertrophy) monitoring at 2-4 months post-treatment (rare but serious). Second session if needed after 6-8 weeks minimum.'
WHERE offering_id = '694ea839-cf8f-4a17-b838-2588674c792f';

-- Kybella (DCA)
UPDATE gl_products SET
  initial_series_count = 3,
  initial_interval_days_min = 42,
  initial_interval_days_max = 56,
  maintenance_interval_days_min = NULL,
  maintenance_interval_days_max = NULL,
  minimum_retreatment_days = 42,
  typical_followup_days = 84,
  downtime_days_min = 3,
  downtime_days_max = 7,
  downtime_description = 'Significant swelling 3-7 days under chin. Numbness possible for weeks. No restriction on activity but visible swelling.',
  cadence_notes = '2-4 sessions typical, max 6 sessions FDA-approved. Assess at 12 weeks post-final session. Fat reduction is permanent — maintenance not typically needed. Swelling is more significant than other injectables.'
WHERE offering_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec';

-- =============================================================================
-- ENERGY/RF DEVICES (2 products)
-- =============================================================================

-- InMode Morpheus8
UPDATE gl_products SET
  initial_series_count = 3,
  initial_interval_days_min = 28,
  initial_interval_days_max = 84,
  maintenance_interval_days_min = 90,
  maintenance_interval_days_max = 180,
  minimum_retreatment_days = 28,
  typical_followup_days = 90,
  downtime_days_min = 1,
  downtime_days_max = 5,
  downtime_description = 'Redness/mild sunburn appearance 24-48 hours. Up to 5 days recovery. No makeup 24 hours. Avoid heat/sweat 48 hours.',
  cadence_notes = 'RF microneedling. Series of 3 spaced 4-12 weeks apart. More aggressive settings = longer between sessions. Body treatments may use different interval than face.'
WHERE offering_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df';

-- Sofwave
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 180,
  maintenance_interval_days_max = 365,
  minimum_retreatment_days = 90,
  typical_followup_days = 90,
  downtime_days_min = 0,
  downtime_days_max = 1,
  downtime_description = 'Minimal downtime. Mild redness possible same day. No restrictions on activity or makeup.',
  cadence_notes = 'SUPERB ultrasound technology. Single treatment with results building over 3-6 months. Maintenance annually. Less aggressive than Ultherapy — may have shorter duration.'
WHERE offering_id = '78973d13-fa36-41dd-8625-4b851ff143ed';

-- =============================================================================
-- ENERGY/LASER DEVICES (2 products)
-- =============================================================================

-- Merz Ultherapy PRIME
UPDATE gl_products SET
  initial_series_count = 1,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 365,
  maintenance_interval_days_max = 730,
  minimum_retreatment_days = 180,
  typical_followup_days = 90,
  downtime_days_min = 0,
  downtime_days_max = 1,
  downtime_description = 'Minimal visible downtime. Some patients experience mild swelling or tenderness. Full results at 3-6 months.',
  cadence_notes = 'Micro-focused ultrasound with visualization (MFU-V). Results build over 3-6 months. Duration 1-2 years. Annual maintenance recommended. Pain management during procedure is the primary patient concern.'
WHERE offering_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f';

-- Lutronic Hollywood Spectra
UPDATE gl_products SET
  initial_series_count = 4,
  initial_interval_days_min = 21,
  initial_interval_days_max = 28,
  maintenance_interval_days_min = 30,
  maintenance_interval_days_max = 90,
  minimum_retreatment_days = 21,
  typical_followup_days = 28,
  downtime_days_min = 0,
  downtime_days_max = 1,
  downtime_description = 'Same-day makeup possible. Mild redness. Darkened spots may crust 3-7 days for pigment treatment.',
  cadence_notes = 'Q-switched Nd:YAG laser for pigment + skin rejuvenation. Hollywood Peel (carbon peel) can be monthly. Pigment treatment: series of 3-5 at 3-4 week intervals. Tattoo removal has different cadence (6-8 weeks apart).'
WHERE offering_id = 'be46f975-99d7-4772-867e-744814626654';

-- =============================================================================
-- SKINCARE (1 product)
-- =============================================================================

-- HydraFacial Syndeo
UPDATE gl_products SET
  initial_series_count = NULL,
  initial_interval_days_min = NULL,
  initial_interval_days_max = NULL,
  maintenance_interval_days_min = 30,
  maintenance_interval_days_max = 30,
  minimum_retreatment_days = 14,
  typical_followup_days = NULL,
  downtime_days_min = 0,
  downtime_days_max = 0,
  downtime_description = 'No downtime. Immediate glow effect. No restrictions on activity or makeup.',
  cadence_notes = 'Monthly maintenance treatment. No initial series required — ongoing. Can be done same-day with most other treatments. Often used as gateway/entry treatment for new patients.'
WHERE offering_id = '28918bda-787b-412a-9802-d3d9a00e6ab1';

-- =============================================================================
-- Verification: Count products with timing data populated
-- Expected: 18 products with minimum_retreatment_days NOT NULL or maintenance_interval_days_min NOT NULL
-- =============================================================================
SELECT name, offering_id,
  initial_series_count, minimum_retreatment_days,
  maintenance_interval_days_min, maintenance_interval_days_max,
  downtime_days_min, downtime_days_max
FROM gl_products
WHERE offering_id IN (
  '4b92be36-e84e-432c-8549-f5d85a767fdb', 'a7e1b29e-da10-40de-bea8-70d6e6624f43',
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa', '007d98fd-58b5-4d20-be11-caf421c0dccb',
  '8adda68a-9fd2-49ad-8852-641970135131', '6c8f72f0-887f-484a-a588-0bb9bd8052c9',
  '7370545f-97a3-4519-a92d-3ac4f969829d', 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de',
  'f1732c7c-3f19-4f3d-9aff-543a132e5506', 'd8a00419-39e1-4d4b-8dab-ad134fb00930',
  '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', '694ea839-cf8f-4a17-b838-2588674c792f',
  '0f901fec-5de5-4950-815e-82c3e47cb2ec', '84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
  '78973d13-fa36-41dd-8625-4b851ff143ed', 'da25d447-c316-40b2-802e-e190c0bdbd9f',
  'be46f975-99d7-4772-867e-744814626654', '28918bda-787b-412a-9802-d3d9a00e6ab1'
)
ORDER BY name;
