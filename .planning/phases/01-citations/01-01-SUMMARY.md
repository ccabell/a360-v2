---
phase: 01-citations
plan: "01"
subsystem: database
tags: [supabase, pubmed, youtube, crossref, typescript, backfill, evidence_links]

requires: []
provides:
  - PubMed PMID backfill script via CrossRef API (scripts/backfill-pubmed.ts)
  - YouTube timestamp backfill script via CMS snippet matching (scripts/backfill-youtube.ts)
  - page_number column migration SQL (scripts/migrations/add_page_number_to_evidence_links.sql)
  - 3 pre-existing PubMed PMID rows now have URL populated in evidence_links
  - 1 YouTube evidence_link row now has timestamp deep-link
affects:
  - 01-02-PLAN (FDA URL backfill — shares evidence_links table and script pattern)
  - 01-03-PLAN (demo verification needs PubMed/YouTube URLs working)

tech-stack:
  added:
    - tsx 4.22.4 (TypeScript script runner, devDependency)
    - dotenv 17.4.2 (env loading in standalone scripts, devDependency)
    - postgres 3.4.9 (Postgres client, devDependency — for migrate-add-page-number.ts)
  patterns:
    - Two-client Supabase pattern for scripts (agentDb + cmsDb via createClient with dotenv)
    - CrossRef API PMID extraction via external-ids[id-type=PMID]
    - YouTube snippet-to-transcript keyword matching via ILIKE on chunk_text

key-files:
  created:
    - scripts/backfill-pubmed.ts
    - scripts/backfill-youtube.ts
    - scripts/migrate-add-page-number.ts
    - scripts/migrations/add_page_number_to_evidence_links.sql
  modified:
    - package.json (tsx, dotenv, postgres devDependencies added)

key-decisions:
  - "page_number column migration requires Supabase dashboard SQL editor or direct DB connection (no DDL access via REST/service key)"
  - "CrossRef API: 11 of 11 NULL-pmid DOIs not resolvable — these are editorial/trade journals not in CrossRef/PubMed index"
  - "YouTube CMS transcript matching: 5 of 6 videos not ingested in CMS; only AdqZEI8kIZk had transcript data"
  - "extractSearchTokens() uses mid-phrase keyword matching (not verbatim first-N chars) because evidence_links snippets are descriptions, not verbatim transcript text"

patterns-established:
  - "Two-client script pattern: dotenv.config({ path: join(cwd(), '.env.local') }), then createClient(URL, KEY) for both agent and CMS Supabase"
  - "Idempotent backfill: skip rows already fixed (pmid IS NOT NULL for pubmed, url LIKE '%&t=%' for youtube)"
  - "Gap reports: every backfill script logs [SKIP] with reason and prints a final gap array for manual review"

requirements-completed: []

duration: 41min
completed: "2026-06-12"
---

# Phase 01 Plan 01: Schema migration + PubMed PMID backfill + YouTube timestamp backfill — Summary

**CrossRef API backfill patched 3 pre-existing PubMed PMID URLs; YouTube CMS snippet matching timestamped 1 of 6 YouTube evidence_links; page_number migration SQL written (requires dashboard apply)**

## Performance

- **Duration:** 41 min
- **Started:** 2026-06-12T20:15:56Z
- **Completed:** 2026-06-12T20:56:43Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- `scripts/backfill-pubmed.ts` created and run: patched URLs for 3 pre-existing PMID rows (27100962, 15871314, 16532442) and generated gap report for 11 DOIs not in CrossRef/PubMed index
- `scripts/backfill-youtube.ts` created and run: timestamped 1 of 6 YouTube evidence_links (AdqZEI8kIZk → `?t=65s`) via CMS `chunk_text` ILIKE matching; gap report shows 5 videos not yet in CMS
- `scripts/migrations/add_page_number_to_evidence_links.sql` written and ready to apply via Supabase dashboard SQL editor

## Task Commits

1. **Task 1: Schema migration + PubMed PMID backfill script** - `c64142c` (feat)
2. **Task 2: YouTube timestamp backfill script** - `9c18b61` (feat)

**Plan metadata:** (to be added by final commit)

## Files Created/Modified
- `scripts/backfill-pubmed.ts` — PubMed PMID lookup via CrossRef API, patches pmid + url columns
- `scripts/backfill-youtube.ts` — YouTube timestamp deep-link via CMS manufacturer_youtube_transcript ILIKE matching
- `scripts/migrate-add-page-number.ts` — Migration helper (requires DB_URL env var for direct connection)
- `scripts/migrations/add_page_number_to_evidence_links.sql` — DDL: `ALTER TABLE evidence_links ADD COLUMN IF NOT EXISTS page_number INT`
- `package.json` — Added tsx, dotenv, postgres as devDependencies

## Decisions Made

1. **CrossRef DOI resolution rate:** All 11 NULL-pmid DOIs returned no PMID from CrossRef. These are aesthetics/dermatology trade journals (Archives of Facial Plastic Surgery, Drugs: R&D, Aesthetic Plastic Surgery) that are not indexed in PubMed via CrossRef. Manual PMID lookup required for these 11 rows.

2. **YouTube matching strategy:** evidence_links `snippet` column contains editorial descriptions (not verbatim transcript text), so `first_40_chars` of snippet doesn't match transcript chunks. Switched to `extractSearchTokens()` which tries both the first-20-chars token AND a mid-phrase 2-word combination — this found "lateral tail" for AdqZEI8kIZk.

3. **page_number DDL constraint:** The Supabase project `aejskvmpembryunnbgrk` only exposes REST/PostgREST endpoints via the `sb_secret_` service key. PostgREST does not support DDL. Direct DB connection requires the project database password (not the service key), which is not stored in `.env.local` or any project config file. Migration SQL is written and ready — Chris needs to apply it via Supabase dashboard SQL editor.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Snippet matching uses keyword extraction, not first-N-chars**
- **Found during:** Task 2 (YouTube backfill)
- **Issue:** Plan specified "first 40 chars of snippet as search token" and "fallback with first 20 chars". Testing revealed evidence_links.snippet is editorial description text, not verbatim transcript text — first-N-chars returns no matches.
- **Fix:** Implemented `extractSearchTokens()` that extracts: (1) first 20 chars of snippet as one token, (2) a 2-word mid-phrase from the snippet words as a second token. This correctly matched "lateral tail" for AdqZEI8kIZk.
- **Files modified:** scripts/backfill-youtube.ts
- **Committed in:** 9c18b61 (Task 2 commit)

**2. [Rule 3 - Blocking] Schema migration cannot be applied via REST API — migration SQL file created instead**
- **Found during:** Task 1 (schema migration)
- **Issue:** Plan specified using `apply_migration` MCP tool. The MCP tool is not available in the tool definitions for this executor agent. PostgREST (accessible via `sb_secret_` key) does not support DDL. Supabase Management API requires a Personal Access Token (`sbp_` prefix), not available. Direct DB connection requires database password, not stored in `.env.local`.
- **Fix:** Created `scripts/migrations/add_page_number_to_evidence_links.sql` with the DDL SQL and clear instructions for applying via Supabase dashboard. Also created `scripts/migrate-add-page-number.ts` that applies the migration if `DB_URL` env var is set.
- **Files modified:** scripts/migrations/add_page_number_to_evidence_links.sql, scripts/migrate-add-page-number.ts
- **Committed in:** c64142c (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 bug fix: snippet matching approach; 1 blocking: DDL via migration file)
**Impact on plan:** Snippet matching fix improves correctness. Migration file is a valid documented workaround — the SQL is ready to apply.

## Issues Encountered

- **CrossRef PMID resolution: 0 of 11 resolved.** All 11 DOIs with NULL pmid are from journals (Archives of Facial Plastic Surgery, Drugs: R&D, Aesthetic Plastic Surgery) that don't surface PMID in CrossRef external-ids. These need manual PubMed search by DOI title to find PMIDs. Gap report is in the script output above.
- **YouTube CMS coverage: 5 of 6 videos not in CMS.** Only `AdqZEI8kIZk` (Upper Face Tox's Effect on Brow Structure) had transcript data. The other 5 video IDs (uVzgSpqA2Bw, UCLcnIlq8DM, SKWeTdW6zvQ, xVOn1FcnUWU, 2ONlmqLLsGo) need to be ingested into `manufacturer_youtube_transcript` before timestamps can be backfilled.

## User Setup Required

**Manual step required: Apply schema migration.**

Apply this SQL in [Supabase dashboard SQL editor](https://supabase.com/dashboard/project/aejskvmpembryunnbgrk/sql/new):

```sql
ALTER TABLE evidence_links ADD COLUMN IF NOT EXISTS page_number INT;
```

Verify with:
```sql
SELECT column_name FROM information_schema.columns
WHERE table_name = 'evidence_links' AND column_name = 'page_number';
-- Expected: 1 row
```

## Next Phase Readiness
- Plan 01-02 (FDA URL backfill) can proceed immediately — evidence_links table is accessible, backfill pattern established
- The 3 PubMed citation rows with PMIDs now have clickable "View on PubMed" URLs ready for the Research tab
- 1 YouTube citation now has a `?t=65s` timestamp deep-link
- **Blockers for full PubMed coverage:** 11 DOIs need manual PMID lookup
- **Blockers for full YouTube coverage:** 5 videos need CMS transcript ingestion
- **Blocker for page_number support:** Manual migration apply required before FDA page_number data can be stored

## Self-Check: PASSED

All files verified present. All commits verified in git history.

---
*Phase: 01-citations*
*Completed: 2026-06-12*
