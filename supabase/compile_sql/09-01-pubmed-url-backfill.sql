-- Phase 09, Plan 02, Task 1: PubMed URL backfill
-- Requirement: EVID-01
-- Date: 2026-06-14
-- Backfills url for evidence_links rows where source='pubmed' AND url IS NULL AND doi IS NOT NULL
-- URL format:
--   Pass 1: https://pubmed.ncbi.nlm.nih.gov/{pmid}/ (preferred — direct article page)
--   Pass 2: https://doi.org/{doi} (fallback — DOI resolver redirects to publisher page)
-- Idempotent: WHERE url IS NULL means re-running is safe — will not overwrite existing urls
-- Target: 36 PubMed evidence_links rows with NULL url

-- =============================================================================
-- Pass 1: Rows with pmid — use PubMed direct URL (preferred)
-- =============================================================================

UPDATE evidence_links
SET url = 'https://pubmed.ncbi.nlm.nih.gov/' || pmid || '/'
WHERE source = 'pubmed'
  AND url IS NULL
  AND pmid IS NOT NULL;

-- =============================================================================
-- Pass 2: Rows with doi but no pmid — use DOI resolver as fallback
-- =============================================================================

UPDATE evidence_links
SET url = 'https://doi.org/' || doi
WHERE source = 'pubmed'
  AND url IS NULL
  AND doi IS NOT NULL
  AND pmid IS NULL;

-- =============================================================================
-- Verification: Should return 0 rows if backfill was complete
-- Any remaining rows have neither pmid nor doi — manual resolution required
-- =============================================================================

SELECT id, doi, pmid, url
FROM evidence_links
WHERE source = 'pubmed'
  AND url IS NULL;
