-- Phase 05 Validation: concern-language
-- Run against: Supabase project aejskvmpembryunnbgrk
-- Idempotent: YES (SELECT only -- no INSERT, UPDATE, DELETE, ALTER, DROP)
-- Purpose: Assert Phase 5 data integrity -- concern clusters schema, cluster data, aliases, and missing concerns added

WITH checks AS (
  SELECT
    'p5_clusters_table'::text AS check_id,
    'concern_clusters table exists'::text AS description,
    (SELECT COUNT(*)
       FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = 'concern_clusters')::bigint AS actual,
    1::bigint AS expected,
    CASE WHEN (SELECT COUNT(*)
                 FROM information_schema.tables
                WHERE table_schema = 'public'
                  AND table_name = 'concern_clusters') >= 1
         THEN 'PASS' ELSE 'FAIL' END AS result
  UNION ALL
  SELECT
    'p5_cluster_members_table'::text,
    'concern_cluster_members table exists'::text,
    (SELECT COUNT(*)
       FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = 'concern_cluster_members')::bigint,
    1::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM information_schema.tables
                WHERE table_schema = 'public'
                  AND table_name = 'concern_cluster_members') >= 1
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p5_clusters_populated'::text,
    'Concern clusters have data (>= 4 rows in concern_clusters)'::text,
    (SELECT COUNT(*) FROM concern_clusters)::bigint,
    4::bigint,
    CASE WHEN (SELECT COUNT(*) FROM concern_clusters) >= 4
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p5_total_aliases'::text,
    'Total aliases >= 593 rows'::text,
    (SELECT COUNT(*) FROM aliases)::bigint,
    593::bigint,
    CASE WHEN (SELECT COUNT(*) FROM aliases) >= 593
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p5_missing_concerns'::text,
    'Missing concerns added: Brow Ptosis and Gummy Smile both present'::text,
    (SELECT COUNT(*)
       FROM concerns
      WHERE name IN ('Brow Ptosis', 'Gummy Smile'))::bigint,
    2::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM concerns
                WHERE name IN ('Brow Ptosis', 'Gummy Smile')) >= 2
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
