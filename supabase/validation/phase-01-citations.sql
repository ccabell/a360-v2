-- Phase 01 Validation: citations
-- Run against: Supabase project aejskvmpembryunnbgrk
-- Idempotent: YES (SELECT only -- no INSERT, UPDATE, DELETE, ALTER, DROP)
-- Purpose: Assert Phase 1 data integrity -- page_number column DDL and PubMed backfill completeness

WITH checks AS (
  SELECT
    'p1_page_number_col'::text AS check_id,
    'page_number column exists on evidence_links'::text AS description,
    (SELECT COUNT(*)
       FROM information_schema.columns
      WHERE table_name = 'evidence_links'
        AND column_name = 'page_number')::bigint AS actual,
    1::bigint AS expected,
    CASE WHEN (SELECT COUNT(*)
                 FROM information_schema.columns
                WHERE table_name = 'evidence_links'
                  AND column_name = 'page_number') >= 1
         THEN 'PASS' ELSE 'FAIL' END AS result
  UNION ALL
  SELECT
    'p1_pubmed_pmid'::text,
    'PubMed rows have pmid populated (0 nulls)'::text,
    (SELECT COUNT(*)
       FROM evidence_links
      WHERE source = 'pubmed'
        AND pmid IS NULL)::bigint,
    0::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM evidence_links
                WHERE source = 'pubmed'
                  AND pmid IS NULL) = 0
         THEN 'PASS' ELSE 'FAIL' END
  UNION ALL
  SELECT
    'p1_pubmed_url'::text,
    'PubMed rows have url populated (0 nulls)'::text,
    (SELECT COUNT(*)
       FROM evidence_links
      WHERE source = 'pubmed'
        AND url IS NULL)::bigint,
    0::bigint,
    CASE WHEN (SELECT COUNT(*)
                 FROM evidence_links
                WHERE source = 'pubmed'
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
