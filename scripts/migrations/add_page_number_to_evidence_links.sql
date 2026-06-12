-- Migration: add_page_number_to_evidence_links
-- Applied to: aejskvmpembryunnbgrk (Agent Manager Supabase)
-- Purpose: Adds page_number INT column for FDA deep-link support (citation linking, Plan 01-01)
--
-- To apply via Supabase dashboard:
--   1. Open https://supabase.com/dashboard/project/aejskvmpembryunnbgrk/sql/new
--   2. Paste and run:

ALTER TABLE evidence_links ADD COLUMN IF NOT EXISTS page_number INT;

-- Verification:
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'evidence_links' AND column_name = 'page_number';
-- Expected: 1 row returned
