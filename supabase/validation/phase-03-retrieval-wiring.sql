-- Phase 03 Validation: retrieval-wiring
-- Run against: Supabase project aejskvmpembryunnbgrk
-- Idempotent: YES (SELECT only)
--
-- Phase 3 produced TypeScript code changes only (no SQL artifacts).
-- Database validation is N/A for this phase.
-- Live UI verification is tracked as EVID-03 in Phase 09.
--
-- File-level checks (run in shell, not SQL):
--   test -f lib/retrieval/sources.ts
--   grep -r "mockData\|MOCK_" lib/retrieval/ app/api/research/ -- expected: 0 matches

SELECT
  'p3_code_only'::text AS check_id,
  'Phase 3 has no SQL artifacts -- code-only validation'::text AS description,
  0::bigint AS actual,
  0::bigint AS expected,
  'PASS'::text AS result,
  'N/A -- see shell commands in file header'::text AS detail;
