-- Batch Content Generation QC Gate
-- Run against: Supabase project aejskvmpembryunnbgrk
-- Idempotent: YES (SELECT only -- no INSERT, UPDATE, DELETE, ALTER, DROP)
-- Purpose: Run after any batch INSERT of agent_reference_docs to catch duplication and name mismatches
-- Threshold: uniqueness_pct >= 80, product_name_mismatches = 0, evidence_specificity >= 80%
--
-- VAL-02: This file defines and documents the 3-part batch content QC gate.
-- Run this after every batch phase that inserts into agent_reference_docs.

WITH doc_stats AS (
  SELECT
    COUNT(*) AS total_docs,
    COUNT(DISTINCT LEFT(content_md, 500)) AS unique_fingerprints
  FROM agent_reference_docs
  WHERE status = 'draft'
),
name_mismatches AS (
  SELECT COUNT(*) AS mismatch_count
  FROM agent_reference_docs ard
  JOIN gl_products p ON ard.offering_id = p.id
  WHERE ard.title NOT ILIKE '%' || split_part(p.name, ' ', 1) || '%'
  AND ard.status = 'draft'
),
evidence_coverage AS (
  SELECT
    COUNT(CASE WHEN el_count >= 1 THEN 1 END) AS docs_with_evidence,
    COUNT(*) AS total_checked
  FROM (
    SELECT ard.id,
      COUNT(el.id) AS el_count
    FROM agent_reference_docs ard
    LEFT JOIN evidence_links el
      ON el.offering_id = ard.offering_id
      AND el.authority_rank >= 2
      AND el.url IS NOT NULL
    WHERE ard.status = 'draft'
    GROUP BY ard.id
  ) sub
),
checks AS (
  SELECT
    'qc_uniqueness'::text AS check_id,
    'Content uniqueness ratio >= 80% (unique_fingerprints / total_docs)'::text AS description,
    ROUND(ds.unique_fingerprints::numeric / NULLIF(ds.total_docs, 0) * 100, 1)::bigint AS actual,
    80::bigint AS expected,
    CASE WHEN ds.unique_fingerprints::numeric / NULLIF(ds.total_docs, 0) >= 0.80
         THEN 'PASS' ELSE 'FAIL' END AS result
  FROM doc_stats ds
  UNION ALL
  SELECT
    'qc_name_accuracy'::text,
    'Zero product name mismatches in doc titles (title must contain first word of product name)'::text,
    nm.mismatch_count::bigint,
    0::bigint,
    CASE WHEN nm.mismatch_count = 0 THEN 'PASS' ELSE 'FAIL' END
  FROM name_mismatches nm
  UNION ALL
  SELECT
    'qc_evidence_specificity'::text,
    '>= 80% of draft docs have at least 1 evidence_link with authority_rank >= 2 and url populated'::text,
    ROUND(ec.docs_with_evidence::numeric / NULLIF(ec.total_checked, 0) * 100, 1)::bigint,
    80::bigint,
    CASE WHEN ec.docs_with_evidence::numeric / NULLIF(ec.total_checked, 0) >= 0.80
         THEN 'PASS' ELSE 'FAIL' END
  FROM evidence_coverage ec
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
--
-- Diagnostic supplement: run this to see raw uniqueness numbers
-- SELECT
--   COUNT(*) AS total_docs,
--   COUNT(DISTINCT LEFT(content_md, 500)) AS unique_fingerprints,
--   ROUND(COUNT(DISTINCT LEFT(content_md, 500))::numeric / NULLIF(COUNT(*), 0) * 100, 1) AS uniqueness_pct
-- FROM agent_reference_docs
-- WHERE status = 'draft';
