-- =============================================================================
-- 04-01: Source Registry Triage
-- Phase 4, Plan 1 — source-ingestion
-- Executed: 2026-06-13
-- =============================================================================
-- Purpose: Triage all source_registry rows with status='review' to 'active'
-- or 'rejected'. Triage all ingestion_queue rows with status='queued' to
-- 'approved' or 'rejected'. Deduplicate by name where exact collisions exist.
--
-- This file is IDEMPOTENT — safe to re-run. All operations are conditional
-- on current status values so re-execution is a no-op once applied.
--
-- Audit results (live DB, 2026-06-13):
--   source_registry: 61 rows total — 13 active (seed), 48 review (discovery)
--   Duplicates: 4 exact name collisions (8 rows total, listed below)
--   ingestion_queue: 102 queued rows (69 CC-BY, 10 CC-BY-NC, 23 public_domain)
--   evidence_links fda_label with missing URL: 0 (all 68 rows have URLs)
--
-- Rights classification rules:
--   public_domain           -> promote to 'active' (US gov't works, FDA)
--   open_access_cc_by       -> promote to 'active' (free commercial reuse)
--   manufacturer_permitted  -> promote to 'active' (none currently in registry)
--   open_access_cc_by_nc    -> 'retired' (CC-BY-NC; A360 is commercial product)
--   paywalled               -> 'retired' (subscription required; cite-only)
--   society_guideline       -> 'retired' (copyrighted, cite-only)
--   unknown                 -> case-by-case (see Section 2b below)
--
-- SCHEMA NOTE: source_registry.status CHECK constraint is ('active','review','retired').
-- The plan doc says 'rejected' but the live schema uses 'retired' for non-ingestible sources.
-- All retirement operations below use 'retired' (not 'rejected').
-- =============================================================================


-- =============================================================================
-- SECTION 1: Deduplicate source_registry (exact name collisions)
-- =============================================================================
-- For each duplicate, we keep the row with the most complete data or the seed
-- row if one exists. The "loser" row has no ingestion_queue references (verified
-- in audit) so deletion is safe.

-- 1a. Dermatologic Surgery:
--     KEEP: b5940ba1 (seed, added_by='seed', status='active', Wolters Kluwer)
--     DELETE: d87a570b (discovery, status='review', Lippincott Williams & Wilkins)
--     Reason: Seed row is already active and canonical; discovery row duplicates it.
DELETE FROM source_registry
WHERE id = 'd87a570b-ed9a-4fbc-93e1-efd148c84bbf'
  AND name = 'Dermatologic Surgery'
  AND added_by = 'discovery'
  AND status = 'review';

-- 1b. Journal of Clinical and Aesthetic Dermatology (JCAD):
--     KEEP: c5f0240a (has doi_prefix '10.36849/jjcd'; added_by='discovery')
--     DELETE: 5f683ab3 (no doi_prefix; added_by='discovery')
--     Reason: c5f0240a is more complete; neither has ingestion_queue refs (audit confirmed).
DELETE FROM source_registry
WHERE id = '5f683ab3-33b0-445c-b93b-a926319293e6'
  AND name = 'Journal of Clinical and Aesthetic Dermatology (JCAD)'
  AND added_by = 'discovery'
  AND status = 'review';

-- 1c. Journal of Cosmetic Dermatology:
--     KEEP: ae808023 (base_url ends in /14733080 — the canonical Wiley JOCD URL)
--     DELETE: ef9f6500 (base_url variant /14732165)
--     Reason: ae808023 has actual PMC article ingestion_queue refs (12 items); ef9f6500 has none.
DELETE FROM source_registry
WHERE id = 'ef9f6500-720a-4ceb-bb04-b18fdbc70678'
  AND name = 'Journal of Cosmetic Dermatology'
  AND added_by = 'discovery'
  AND status = 'review';

-- 1d. Plastic and Reconstructive Surgery:
--     KEEP: 835a448c (publisher = 'Wolters Kluwer / ASPS'; more descriptive)
--     DELETE: d70512af (publisher = 'Lippincott Williams & Wilkins')
--     Reason: Neither has ingestion_queue refs (audit confirmed); 835a448c is more complete.
DELETE FROM source_registry
WHERE id = 'd70512af-8329-423f-9bf2-e95ae60fd55c'
  AND name = 'Plastic and Reconstructive Surgery'
  AND added_by = 'discovery'
  AND status = 'review';


-- =============================================================================
-- SECTION 2a: Promote ingestible sources to 'active'
-- Rights: public_domain and open_access_cc_by -> ingestible = TRUE (generated column)
-- =============================================================================

-- Promote all public_domain regulatory sources (FDA labels, 510k docs):
-- These are US government works — no copyright restriction; ingest freely.
UPDATE source_registry
SET status = 'active',
    access_notes = COALESCE(access_notes, 'US government regulatory document — public domain; rights-clear for ingestion')
WHERE status = 'review'
  AND rights_class = 'public_domain';

-- Promote open_access_cc_by journal sources:
-- CC-BY license permits commercial use. Each is verified in AESTHETIC_DERMATOLOGY_JOURNAL_REGISTRY.md.
-- Note: individual articles must still be confirmed CC-BY at PMC; the source_registry row
-- represents the journal's typical OA license. Per-article ingestion via ingestion_queue is the gate.
UPDATE source_registry
SET status = 'active'
WHERE status = 'review'
  AND rights_class = 'open_access_cc_by';


-- =============================================================================
-- SECTION 2b: Reclassify 'unknown' sources before promoting or rejecting
-- =============================================================================

-- Aesthetic Surgery Journal (id=7d5ed9b7):
--   access_notes confirm: hybrid journal, paywalled by default, some CC-BY articles on PMC.
--   The queued articles linked to this source are all PMC OA links (confirmed CC-BY in queue).
--   Correct classification: 'unknown' with status='active' — per-article verification required.
--   Rationale: The queue items already carry their own rights_class='open_access_cc_by';
--   the source registry entry is for the journal, not any specific article.
--   We promote to 'active' (status) but leave rights_class='unknown' to signal per-article gate.
UPDATE source_registry
SET status = 'active',
    access_notes = COALESCE(access_notes, '') || ' | Triage 2026-06-13: promote to active for per-article ingestion only. Source rights_class=unknown means verify each article at PMC before ingesting.'
WHERE id = '7d5ed9b7-2095-4a42-8009-67b52e30d594'
  AND status = 'review';

-- Aesthetic Surgery Journal (ASJ) (id=0f588177):
--   rights_class='paywalled' — subscription journal (the paywalled variant of ASJ main).
--   Distinct from ASJ Open Forum (already active/CC-BY). Retire: cite-only.
--   This is the regular ASJ (not Open Forum); no free bulk ingestion permitted.
UPDATE source_registry
SET status = 'retired',
    access_notes = 'Triage 2026-06-13: Retired (paywalled). Regular ASJ is subscription-only. ASJ Open Forum (id=b0282240, CC-BY, active) is the OA companion. Cite-only per rights gate.'
WHERE id = '0f588177-6b6b-4b42-b3d4-71a51197a5b5'
  AND status = 'review';

-- Journal of Drugs in Dermatology (id=1be6d8be):
--   Classified as 'paywalled' in 02-02 SQL — this is incorrect.
--   JDD is largely open access via JDD Online and PMC (per 02-03 SQL, access_notes on JDD variant).
--   The canonical JDD entry (dcfa3d2e, name='Journal of Drugs in Dermatology (JDD)') is correctly
--   classified as open_access_cc_by. This duplicate (different name, paywalled) should be corrected
--   and retired since the canonical JDD entry is already present.
--   Action: retire this misclassified entry; the CC-BY entry (dcfa3d2e) will be promoted by Section 2a.
UPDATE source_registry
SET status = 'retired',
    access_notes = 'Triage 2026-06-13: Retired. Misclassified as paywalled; JDD is largely OA. Canonical entry id=dcfa3d2e (open_access_cc_by) is active and supersedes this row.'
WHERE id = '1be6d8be-9ffe-4375-ac35-6d73248ffba6'
  AND name = 'Journal of Drugs in Dermatology'
  AND status = 'review';


-- =============================================================================
-- SECTION 3: Reject non-ingestible sources
-- =============================================================================

-- 3a. Retire paywalled journals:
-- Subscription required — cannot extract full text. Cite-only via evidence_links URL.
-- NOTE: source_registry.status CHECK allows ('active','review','retired') only.
-- 'retired' is the correct value for non-ingestible sources (not 'rejected').
UPDATE source_registry
SET status = 'retired'
WHERE status = 'review'
  AND rights_class = 'paywalled';

-- 3b. Retire CC-BY-NC sources:
-- CC-BY-NC restricts commercial use. A360 is a commercial product — NC restriction applies.
-- These cannot be ingested into A360 corpus regardless of open access status.
UPDATE source_registry
SET status = 'retired'
WHERE status = 'review'
  AND rights_class = 'open_access_cc_by_nc';

-- 3c. Retire society_guideline sources:
-- Copyrighted; free-to-read but not free to extract/embed. Cite-only.
-- (Already handled by 'paywalled' or as seed rows — included for completeness.)
UPDATE source_registry
SET status = 'retired'
WHERE status = 'review'
  AND rights_class = 'society_guideline';


-- =============================================================================
-- SECTION 4: Triage ingestion_queue
-- =============================================================================
-- ingestion_queue schema (confirmed via information_schema):
--   id, source_id, url, doi, title, rights_class, discovered_during, status, queued_at
-- Note: No 'notes' column exists. Status transitions are the only metadata available.
--
-- Decision rules based on ingestion_queue.rights_class (per-item classification,
-- which may differ from the source journal's default rights_class):
--
--   public_domain     -> 'approved' (FDA labels, 510k docs — rights-clear)
--   open_access_cc_by -> 'approved' (per-article CC-BY confirmed at queue time)
--   open_access_cc_by_nc -> 'rejected' (commercial restriction applies to A360)

-- 4a. Approve public_domain items (FDA labels, 510k clearances, safety communications):
UPDATE ingestion_queue
SET status = 'approved'
WHERE status = 'queued'
  AND rights_class = 'public_domain';

-- 4b. Approve open_access_cc_by items (per-article CC-BY confirmed):
-- These were queued with individual URL verification (PMC links with confirmed CC-BY license).
-- Source journal may be paywalled, but these specific articles are OA per PMC metadata.
UPDATE ingestion_queue
SET status = 'approved'
WHERE status = 'queued'
  AND rights_class = 'open_access_cc_by';

-- 4c. Reject CC-BY-NC items (commercial restriction):
-- Dermatology and Therapy (Springer Adis) articles — CC-BY-NC, A360 is commercial.
-- Saudi Pharmaceutical Journal — also CC-BY-NC.
UPDATE ingestion_queue
SET status = 'rejected'
WHERE status = 'queued'
  AND rights_class = 'open_access_cc_by_nc';


-- =============================================================================
-- SECTION 5: Verification queries (run after applying above)
-- =============================================================================
-- Expected results after applying (VERIFIED 2026-06-13):
--   SELECT status, COUNT(*) FROM source_registry GROUP BY status
--     -> active: 43  (13 seed + 30 promoted)
--     -> retired: 14 (10 paywalled + 2 CC-BY-NC + 1 ASJ paywalled + 1 JDD misclassified)
--     -> review: 0   (all triaged)
--
--   SELECT COUNT(*) FROM source_registry WHERE status = 'review'
--     -> 0  (CONFIRMED)
--
--   SELECT COUNT(*) FROM ingestion_queue WHERE status = 'queued'
--     -> 0  (CONFIRMED)
--
--   SELECT status, COUNT(*) FROM ingestion_queue GROUP BY status
--     -> approved: 92 (23 public_domain + 69 open_access_cc_by)
--     -> rejected: 10 (CC-BY-NC articles)
--
--   SELECT name, COUNT(*) FROM source_registry GROUP BY name HAVING COUNT(*) > 1
--     -> (no rows) — all duplicates removed (CONFIRMED)
-- =============================================================================
