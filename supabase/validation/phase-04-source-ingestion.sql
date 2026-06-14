-- Phase 04 Validation: source-ingestion
-- Run against: Supabase project aejskvmpembryunnbgrk
-- Idempotent: YES (SELECT only -- no INSERT, UPDATE, DELETE, ALTER, DROP)
-- Purpose: Assert Phase 4 data integrity -- source_registry triage complete, ingestion_queue decided, FDA URLs populated

WITH checks AS (
  SELECT
    'p4_registry_triaged'::text AS check_id,
    'No source_registry rows left in review status (all triaged)'::text AS description,
    (SELECT COUNT(*)
       FROM source_registry
      WHERE status = 'review')::bigint AS actual,
    0::bigint AS expected,
    CASE WHEN (SELECT COUNT(*)
                 FROM source_registry
                WHERE status = 'review') = 0
         THEN 'PASS' ELSE 'FAIL' END AS result
  UNION ALL
  SELECT
    'p4_queue_decided'::text,
    'No ingestion_queue rows left in queued status (all decided)'::text,
    (SELECT COUNT(*)
       FROM ingestion_queue
      WHERE status = 'queued')::bigint,
    0::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM ingestion_queue
                WHERE status = 'queued') = 0
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p4_fda_urls'::text,
    'FDA evidence_links have url populated (0 nulls)'::text,
    (SELECT COUNT(*)
       FROM evidence_links
      WHERE source = 'fda_label'
        AND url IS NULL)::bigint,
    0::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM evidence_links
                WHERE source = 'fda_label'
                  AND url IS NULL) = 0
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
