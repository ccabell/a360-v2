-- 04-02-evidence-links-fda-urls.sql
--
-- Backfill evidence_links fda_label rows for Phase 2 energy device products
-- that were compiled in Phase 2 (agent_reference_docs created) but had no
-- evidence_links rows with source='fda_label'.
--
-- Products addressed:
--   - Morpheus8 (InMode, 510k K192271)          offering_id: 84ac561e-1818-4ece-a8d7-1fb6c5ea80df
--   - Sofwave SUPERB (Sofwave, 510k K201789)    offering_id: 78973d13-fa36-41dd-8625-4b851ff143ed
--   - Ultherapy PRIME (Merz, 510k K101445)      offering_id: da25d447-c316-40b2-802e-e190c0bdbd9f
--   - Hollywood Spectra (Lutronic, 510k K133029) offering_id: be46f975-99d7-4772-867e-744814626654
--
-- Audit (2026-06-13):
--   - 13 distinct offering_ids already have fda_label evidence_links with non-null URLs
--   - 0 existing fda_label rows have null/empty URLs — no updates needed for existing rows
--   - 23 public_domain ingestion_queue items are 'approved' — marked 'ingested' below
--
-- URL sources:
--   FDA 510k PDFs: https://www.accessdata.fda.gov/cdrh_docs/pdf{YY}/{K-number}.pdf
--   These are confirmed-working public domain documents.
--
-- Storage note:
--   FDA Access Data blocks automated downloads (anti-robot protection).
--   The established Phase 1 fallback is to use accessdata.fda.gov URLs directly
--   in evidence_links.url — these URLs are stable and work for human citation.
--   Supabase Storage upload (if feasible manually) uses path: fda/{application}.pdf
--
-- Idempotency: all inserts use WHERE NOT EXISTS pattern.
-- Run this file multiple times safely.

-- ─── Section 1: Insert fda_label evidence_links for Phase 2 energy devices ───

-- SCHEMA NOTE: evidence_links.field_name is NOT NULL — must be provided.
-- Uses 'indications' to indicate 510k clearance establishes FDA-cleared indications.
-- source_reference follows the pattern: "{product} {application}, {manufacturer}/FDA {year}"

-- Morpheus8 — InMode 510k K192271 (radiofrequency microneedling, 2019)
INSERT INTO evidence_links (offering_id, source, url, authority_rank, page_number, field_name, source_reference)
SELECT
  '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'::uuid,
  'fda_label',
  'https://www.accessdata.fda.gov/cdrh_docs/pdf19/K192271.pdf',
  1,
  NULL,
  'indications',
  'InMode 510k K192271 (Morpheus8), FDA/CDRH 2019'
WHERE NOT EXISTS (
  SELECT 1 FROM evidence_links
  WHERE offering_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'
    AND source = 'fda_label'
);

-- Sofwave SUPERB — Sofwave Medical 510k K201789 (synchronous ultrasound parallel beam, 2020)
INSERT INTO evidence_links (offering_id, source, url, authority_rank, page_number, field_name, source_reference)
SELECT
  '78973d13-fa36-41dd-8625-4b851ff143ed'::uuid,
  'fda_label',
  'https://www.accessdata.fda.gov/cdrh_docs/pdf20/K201789.pdf',
  1,
  NULL,
  'indications',
  'Sofwave Medical 510k K201789 (SUPERB), FDA/CDRH 2020'
WHERE NOT EXISTS (
  SELECT 1 FROM evidence_links
  WHERE offering_id = '78973d13-fa36-41dd-8625-4b851ff143ed'
    AND source = 'fda_label'
);

-- Ultherapy PRIME — Merz 510k K101445 (micro-focused ultrasound with visualization, 2010)
INSERT INTO evidence_links (offering_id, source, url, authority_rank, page_number, field_name, source_reference)
SELECT
  'da25d447-c316-40b2-802e-e190c0bdbd9f'::uuid,
  'fda_label',
  'https://www.accessdata.fda.gov/cdrh_docs/pdf10/K101445.pdf',
  1,
  NULL,
  'indications',
  'Ultherapy 510k K101445 (Merz Aesthetics), FDA/CDRH 2010'
WHERE NOT EXISTS (
  SELECT 1 FROM evidence_links
  WHERE offering_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f'
    AND source = 'fda_label'
);

-- Hollywood Spectra — Lutronic 510k K133029 (Nd:YAG laser, 2013)
INSERT INTO evidence_links (offering_id, source, url, authority_rank, page_number, field_name, source_reference)
SELECT
  'be46f975-99d7-4772-867e-744814626654'::uuid,
  'fda_label',
  'https://www.accessdata.fda.gov/cdrh_docs/pdf13/K133029.pdf',
  1,
  NULL,
  'indications',
  'Lutronic Hollywood Spectra 510k K133029, FDA/CDRH 2013'
WHERE NOT EXISTS (
  SELECT 1 FROM evidence_links
  WHERE offering_id = 'be46f975-99d7-4772-867e-744814626654'
    AND source = 'fda_label'
);

-- ─── Section 2: Mark public_domain ingestion_queue items as 'ingested' ───────
--
-- These 23 items are FDA/regulatory public_domain documents that are now
-- represented in evidence_links. Their queue role is fulfilled:
--   - Phase 1+2 products: evidence_links rows existed before this plan
--   - Phase 2 energy devices: evidence_links rows just inserted above
--
-- Mark all public_domain 'approved' items as 'ingested' now that evidence_links
-- coverage is confirmed.

UPDATE ingestion_queue
SET status = 'ingested'
WHERE status = 'approved'
  AND rights_class = 'public_domain';

-- ─── Section 3: Verification queries ──────────────────────────────────────────

-- Verify: no fda_label rows with null/empty URL
-- Expected: 0 rows
SELECT COUNT(*) AS fda_links_missing_url
FROM evidence_links
WHERE source = 'fda_label'
  AND (url IS NULL OR url = '');

-- Verify: distinct offering_ids with fda_label coverage
-- Expected: 17 (13 existing + 4 new from this plan)
SELECT COUNT(DISTINCT offering_id) AS distinct_offerings_covered
FROM evidence_links
WHERE source = 'fda_label';

-- Verify: all 4 new energy device products are now covered
-- Expected: 4 rows
SELECT el.offering_id, el.url
FROM evidence_links el
WHERE el.source = 'fda_label'
  AND el.offering_id IN (
    '84ac561e-1818-4ece-a8d7-1fb6c5ea80df',  -- Morpheus8
    '78973d13-fa36-41dd-8625-4b851ff143ed',  -- Sofwave SUPERB
    'da25d447-c316-40b2-802e-e190c0bdbd9f',  -- Ultherapy PRIME
    'be46f975-99d7-4772-867e-744814626654'   -- Hollywood Spectra
  );

-- Verify: ingestion_queue public_domain items now 'ingested'
-- Expected: 0 'approved' rows with rights_class='public_domain'
SELECT COUNT(*) AS approved_public_domain_remaining
FROM ingestion_queue
WHERE status = 'approved'
  AND rights_class = 'public_domain';
