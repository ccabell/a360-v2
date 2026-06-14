-- Phase 06 Validation: pairing-engine
-- Run against: Supabase project aejskvmpembryunnbgrk
-- Idempotent: YES (SELECT only -- no INSERT, UPDATE, DELETE, ALTER, DROP)
-- Purpose: Assert Phase 6 data integrity -- pairing_tier column, pair counts by tier, orphan detection
--
-- IMPORTANT: p6_canonical and p6_common use WARN (not FAIL) because
-- 06-02-canonical-common-inserts.sql is flagged do_not_execute: true in the manifest.
-- Those rows will not appear until Phase 10 regenerates and applies that file.
-- WARN expected until Phase 10 applies 06-02-canonical-common-inserts.sql

WITH checks AS (
  SELECT
    'p6_pairing_tier_col'::text AS check_id,
    'pairing_tier column exists on item_relationships'::text AS description,
    (SELECT COUNT(*)
       FROM information_schema.columns
      WHERE table_name = 'item_relationships'
        AND column_name = 'pairing_tier')::bigint AS actual,
    1::bigint AS expected,
    CASE WHEN (SELECT COUNT(*)
                 FROM information_schema.columns
                WHERE table_name = 'item_relationships'
                  AND column_name = 'pairing_tier') >= 1
         THEN 'PASS' ELSE 'FAIL' END AS result
  UNION ALL
  SELECT
    'p6_total_pairs'::text,
    'Total pairs evaluated >= 153 rows in item_relationships'::text,
    (SELECT COUNT(*) FROM item_relationships)::bigint,
    153::bigint,
    CASE WHEN (SELECT COUNT(*) FROM item_relationships) >= 153
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  -- WARN expected until Phase 10 applies 06-02-canonical-common-inserts.sql
  SELECT
    'p6_canonical'::text,
    'Canonical pairs (WARN if 0 -- deferred until Phase 10)'::text,
    (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'canonical')::bigint,
    5::bigint,
    CASE
      WHEN (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'canonical') >= 5 THEN 'PASS'
      WHEN (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'canonical') = 0  THEN 'WARN'
      ELSE 'FAIL'
    END
  UNION ALL
  -- WARN expected until Phase 10 applies 06-02-canonical-common-inserts.sql
  SELECT
    'p6_common'::text,
    'Common pairs (WARN if 0 -- deferred until Phase 10)'::text,
    (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'common')::bigint,
    32::bigint,
    CASE
      WHEN (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'common') >= 32 THEN 'PASS'
      WHEN (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'common') = 0   THEN 'WARN'
      ELSE 'FAIL'
    END
  UNION ALL
  SELECT
    'p6_conditional'::text,
    'Conditional pairs >= 51 rows'::text,
    (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'conditional')::bigint,
    51::bigint,
    CASE WHEN (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'conditional') >= 51
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p6_compatible_only'::text,
    'Compatible-only pairs >= 48 rows'::text,
    (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'compatible_only')::bigint,
    48::bigint,
    CASE WHEN (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'compatible_only') >= 48
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p6_do_not_market'::text,
    'Do-not-market pairs >= 17 rows'::text,
    (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'do_not_market')::bigint,
    17::bigint,
    CASE WHEN (SELECT COUNT(*) FROM item_relationships WHERE pairing_tier = 'do_not_market') >= 17
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p6_orphan_pairs'::text,
    'No orphan item_a_id references (all item_a_id exist in gl_products)'::text,
    (SELECT COUNT(*)
       FROM item_relationships
      WHERE item_a_id NOT IN (SELECT id FROM gl_products))::bigint,
    0::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM item_relationships
                WHERE item_a_id NOT IN (SELECT id FROM gl_products)) = 0
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
       WHEN result = 'WARN'
       THEN 'WARN: 0 rows -- expected once Phase 10 applies 06-02-canonical-common-inserts.sql'
       ELSE 'OK'
  END AS detail
FROM checks
ORDER BY result DESC, check_id;
-- OVERALL PASS: all rows say 'PASS' (or 'WARN' for canonical/common until Phase 10)
-- OVERALL FAIL: any row says 'FAIL'
-- WARN on p6_canonical and p6_common is expected pre-Phase-10
