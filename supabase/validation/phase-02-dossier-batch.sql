-- Phase 02 Validation: dossier-batch
-- Run against: Supabase project aejskvmpembryunnbgrk
-- Idempotent: YES (SELECT only -- no INSERT, UPDATE, DELETE, ALTER, DROP)
-- Purpose: Assert Phase 2 data integrity -- dossier docs, evidence links, concerns, body areas, aliases, source registry
-- Note: All count checks use >= (not =) so future phases adding rows do not break this validation

WITH checks AS (
  SELECT
    'p2_doc_count'::text AS check_id,
    'Dossier docs exist (status draft, active, or archived)'::text AS description,
    (SELECT COUNT(*)
       FROM agent_reference_docs
      WHERE status IN ('draft', 'active', 'archived'))::bigint AS actual,
    136::bigint AS expected,
    CASE WHEN (SELECT COUNT(*)
                 FROM agent_reference_docs
                WHERE status IN ('draft', 'active', 'archived')) >= 136
         THEN 'PASS' ELSE 'FAIL' END AS result
  UNION ALL
  SELECT
    'p2_products_with_docs'::text,
    'At least 18 products each have >= 3 dossier docs'::text,
    (SELECT COUNT(*)
       FROM (
         SELECT offering_id
           FROM agent_reference_docs
          WHERE status IN ('draft', 'active', 'archived')
          GROUP BY offering_id
         HAVING COUNT(*) >= 3
       ) sub)::bigint,
    18::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM (
                   SELECT offering_id
                     FROM agent_reference_docs
                    WHERE status IN ('draft', 'active', 'archived')
                    GROUP BY offering_id
                   HAVING COUNT(*) >= 3
                 ) sub) >= 18
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p2_evidence_links'::text,
    'Evidence links populated (>= 184 rows)'::text,
    (SELECT COUNT(*) FROM evidence_links)::bigint,
    184::bigint,
    CASE WHEN (SELECT COUNT(*) FROM evidence_links) >= 184
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p2_item_concerns'::text,
    'Products have concerns (>= 18 distinct offering_id in item_concerns)'::text,
    (SELECT COUNT(DISTINCT offering_id) FROM item_concerns)::bigint,
    18::bigint,
    CASE WHEN (SELECT COUNT(DISTINCT offering_id) FROM item_concerns) >= 18
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p2_item_body_areas'::text,
    'Products have body areas (>= 18 distinct offering_id in item_body_areas)'::text,
    (SELECT COUNT(DISTINCT offering_id) FROM item_body_areas)::bigint,
    18::bigint,
    CASE WHEN (SELECT COUNT(DISTINCT offering_id) FROM item_body_areas) >= 18
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p2_aliases'::text,
    'Aliases populated (>= 593 rows)'::text,
    (SELECT COUNT(*) FROM aliases)::bigint,
    593::bigint,
    CASE WHEN (SELECT COUNT(*) FROM aliases) >= 593
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p2_source_registry'::text,
    'Source registry populated (>= 50 rows)'::text,
    (SELECT COUNT(*) FROM source_registry)::bigint,
    50::bigint,
    CASE WHEN (SELECT COUNT(*) FROM source_registry) >= 50
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
