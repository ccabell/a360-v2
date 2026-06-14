-- Phase 07 Validation: timing-rules
-- Run against: Supabase project aejskvmpembryunnbgrk
-- Idempotent: YES (SELECT only -- no INSERT, UPDATE, DELETE, ALTER, DROP)
-- Purpose: Assert Phase 7 data integrity -- timing columns on gl_products and item_relationships,
--          BoNT-A 85-day safety floor, same_session_ok population, safety-critical flags
--
-- Note on p7_bont_safety_floor: checks neurotoxins by name pattern since category_name may not
-- be a direct column. Targets Botox, Dysport, Xeomin, Jeuveau, Daxxify.

WITH checks AS (
  SELECT
    'p7_timing_cols_products'::text AS check_id,
    'Timing columns on gl_products (>= 9 expected)'::text AS description,
    (SELECT COUNT(*)
       FROM information_schema.columns
      WHERE table_name = 'gl_products'
        AND column_name IN (
          'minimum_retreatment_days',
          'maximum_retreatment_days',
          'onset_days',
          'peak_effect_days',
          'duration_min_days',
          'duration_max_days',
          'downtime_min_days',
          'downtime_max_days',
          'recovery_days'
        ))::bigint AS actual,
    9::bigint AS expected,
    CASE WHEN (SELECT COUNT(*)
                 FROM information_schema.columns
                WHERE table_name = 'gl_products'
                  AND column_name IN (
                    'minimum_retreatment_days',
                    'maximum_retreatment_days',
                    'onset_days',
                    'peak_effect_days',
                    'duration_min_days',
                    'duration_max_days',
                    'downtime_min_days',
                    'downtime_max_days',
                    'recovery_days'
                  )) >= 9
         THEN 'PASS' ELSE 'FAIL' END AS result
  UNION ALL
  SELECT
    'p7_timing_cols_relationships'::text,
    'Timing columns on item_relationships (>= 4 expected)'::text,
    (SELECT COUNT(*)
       FROM information_schema.columns
      WHERE table_name = 'item_relationships'
        AND column_name IN (
          'same_session_ok',
          'staging_required',
          'safety_critical',
          'timing_warning_level'
        ))::bigint,
    4::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM information_schema.columns
                WHERE table_name = 'item_relationships'
                  AND column_name IN (
                    'same_session_ok',
                    'staging_required',
                    'safety_critical',
                    'timing_warning_level'
                  )) >= 4
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p7_products_with_timing'::text,
    'Products with timing data (minimum_retreatment_days not null, >= 18)'::text,
    (SELECT COUNT(*)
       FROM gl_products
      WHERE minimum_retreatment_days IS NOT NULL)::bigint,
    18::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM gl_products
                WHERE minimum_retreatment_days IS NOT NULL) >= 18
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p7_bont_safety_floor'::text,
    'BoNT-A neurotoxins have 85-day minimum retreatment floor (>= 5 products)'::text,
    (SELECT COUNT(*)
       FROM gl_products
      WHERE name ILIKE ANY(ARRAY[
              '%botox%',
              '%dysport%',
              '%xeomin%',
              '%jeuveau%',
              '%daxxify%'
            ])
        AND minimum_retreatment_days = 85)::bigint,
    5::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM gl_products
                WHERE name ILIKE ANY(ARRAY[
                        '%botox%',
                        '%dysport%',
                        '%xeomin%',
                        '%jeuveau%',
                        '%daxxify%'
                      ])
                  AND minimum_retreatment_days = 85) >= 5
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p7_pairs_with_timing'::text,
    'Pairs with same_session_ok set (>= 27 rows)'::text,
    (SELECT COUNT(*)
       FROM item_relationships
      WHERE same_session_ok IS NOT NULL)::bigint,
    27::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM item_relationships
                WHERE same_session_ok IS NOT NULL) >= 27
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p7_safety_critical'::text,
    'Safety-critical pairs flagged (>= 4 rows where safety_critical = true)'::text,
    (SELECT COUNT(*)
       FROM item_relationships
      WHERE safety_critical = true)::bigint,
    4::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM item_relationships
                WHERE safety_critical = true) >= 4
         THEN 'PASS' ELSE 'FAIL' END
)
SELECT
  check_id,
  description,
  actual,
  expected,
  result,
  CASE WHEN result = 'FAIL'
       THEN 'INVESTIGATE: actual=' || actual || ' expected=' || expected
       ELSE 'OK'
  END AS detail
FROM checks
ORDER BY result DESC, check_id;
-- OVERALL PASS: all rows in result column say 'PASS'
-- OVERALL FAIL: any row says 'FAIL'
