---
phase: 04-source-ingestion
plan: 01
subsystem: database
tags: [supabase, source-registry, ingestion-queue, rights-classification, triage]

# Dependency graph
requires:
  - phase: 02-dossier-batch
    provides: source_registry rows (status='review') and ingestion_queue rows (status='queued') logged during 20-product compile
provides:
  - source_registry fully triaged: 43 active, 14 retired, 0 review
  - ingestion_queue fully triaged: 92 approved, 10 rejected, 0 queued
  - 4 duplicate source_registry names deduplicated
  - Idempotent triage SQL: supabase/compile_sql/04-01-source-registry-triage.sql
affects: 04-02-fda-pdf-ingestion, any future source ingestion, ingestion_queue approved items ready for processing

# Tech tracking
tech-stack:
  added: []
  patterns: [Supabase REST API for live DB triage (PATCH/DELETE via anon key), source_registry.status uses 'retired' not 'rejected' for non-ingestible sources]

key-files:
  created:
    - supabase/compile_sql/04-01-source-registry-triage.sql
  modified: []

key-decisions:
  - "source_registry.status check constraint only allows ('active','review','retired') — not 'rejected'; use 'retired' for non-ingestible sources"
  - "Journal of Cosmetic Dermatology queued items are per-article OA (PMC CC-BY links) even though the journal is paywalled — ingestion_queue.rights_class is the per-item gate, not the source journal's default"
  - "Aesthetic Surgery Journal (hybrid/unknown) promoted to active for per-article ingestion; rights_class='unknown' signals per-article verification required"
  - "Duplicate 'Dermatologic Surgery' (discovery row) deleted; seed row kept as canonical — seed rows are the authority for already-present sources"
  - "JDD 'paywalled' entry (1be6d8be) retired as misclassified; canonical JDD (JDD) entry (dcfa3d2e, open_access_cc_by) is active"

patterns-established:
  - "Rights triage pattern: public_domain and open_access_cc_by -> active; paywalled/open_access_cc_by_nc/society_guideline -> retired"
  - "Per-article rights override: ingestion_queue.rights_class may differ from source journal default; individual PMC CC-BY articles can be approved even from paywalled journals"
  - "Deduplication strategy: prefer seed rows over discovery rows; prefer rows with more populated fields (doi_prefix, base_url)"

requirements-completed: [SRC-01, SRC-02]

# Metrics
duration: 45min
completed: 2026-06-13
---

# Phase 4 Plan 1: Source Registry Triage Summary

**Triaged all 48 source_registry 'review' rows and 102 ingestion_queue 'queued' items, deduplicating 4 name collisions and applying rights gate: 43 sources active (29 promoted), 14 retired, 92 queue items approved, 10 rejected**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-06-13T17:35:04Z
- **Completed:** 2026-06-13T18:20:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Audited live DB: confirmed 61 source_registry rows, 102 ingestion_queue rows, identified 4 exact-name duplicates
- Deleted 4 duplicate source_registry rows (Dermatologic Surgery, JCAD, Journal of Cosmetic Dermatology, Plastic and Reconstructive Surgery)
- Promoted 29 ingestible review rows to active: 20 public_domain (FDA labels, 510k docs) + 9 open_access_cc_by (JCAD, Cureus, JDD (JDD), CCID, JCAS, BMC Derm, JDDS, JPRAS, JCAD)
- Promoted Aesthetic Surgery Journal (hybrid) to active with per-article verification flag
- Retired 14 rows: 10 paywalled, 2 CC-BY-NC (Derm and Therapy, Saudi Pharma), 1 ASJ paywalled variant, 1 JDD misclassified
- Approved 92 ingestion_queue items (23 public_domain, 69 CC-BY); rejected 10 CC-BY-NC items
- Created idempotent triage SQL with full audit trail and schema note on 'retired' vs 'rejected'

## Task Commits

1. **Tasks 1 + 2: Audit DB state + triage source_registry and ingestion_queue** - `95e9f6e` (feat)

## Files Created/Modified

- `supabase/compile_sql/04-01-source-registry-triage.sql` - Complete idempotent triage SQL with dedup, promote, retire, and ingestion_queue triage sections; includes verified result counts

## Decisions Made

- Used `'retired'` instead of `'rejected'` for source_registry — live schema check constraint only allows `('active','review','retired')`. Plan doc was aspirational (used 'rejected'); actual schema differs. All non-ingestible sources are now 'retired'.
- Approved per-article OA items in ingestion_queue even when linked source journal is paywalled. The 12 Journal of Cosmetic Dermatology items and 4 Dermatologic Surgery items are PMC links with confirmed CC-BY status — `ingestion_queue.rights_class` is the per-item gate.
- Aesthetic Surgery Journal (id=7d5ed9b7, rights_class='unknown') promoted to 'active' with 'unknown' status preserved — per-article verification required for each queued item. The 28 ASJ Open Forum articles queued under this source are already tagged CC-BY individually.
- Journal of Drugs in Dermatology (paywalled, id=1be6d8be) retired as misclassified. The correct canonical JDD entry (id=dcfa3d2e, open_access_cc_by) is already active.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Used 'retired' instead of 'rejected' for source_registry non-ingestible rows**
- **Found during:** Task 2 (writing triage SQL and executing it)
- **Issue:** Plan SQL used `status='rejected'` but live schema check constraint only allows `('active','review','retired')`. Executing `status='rejected'` returned HTTP 400 with `source_registry_status_check` violation.
- **Fix:** Used `status='retired'` for all non-ingestible sources; updated SQL file comments to document the schema constraint
- **Files modified:** supabase/compile_sql/04-01-source-registry-triage.sql
- **Verification:** All updates returned HTTP 200; final count shows 0 review rows, 14 retired rows
- **Committed in:** 95e9f6e (Task commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - schema constraint bug)
**Impact on plan:** Required fix; plan used wrong status value. Functional outcome unchanged ('retired' = non-ingestible, out of review queue).

## Issues Encountered

- `source_registry.status` check constraint not documented in plan or research doc. Discovered at execution time when HTTP 400 returned. Resolved by checking `SOURCE_REGISTRY_AND_DISCOVERY.md` which shows the constraint: `CHECK (status IN ('active','review','retired'))`.
- Supabase anon key had write access (no RLS blocking updates/deletes) — consistent with prior phase patterns.

## Known Stubs

None — this plan produced DB state changes and a SQL file. No UI or data rendering involved.

## Next Phase Readiness

- **ingestion_queue**: 92 approved items ready for processing (23 FDA/regulatory public_domain, 69 CC-BY journal articles)
- **source_registry**: Rights classification is clean; 43 active sources with correct ingestible flag
- **Blocker for 04-02**: FDA PDF URLs in ingestion_queue need HTTP HEAD verification before download (some base_url entries are directory-level, not direct PDF links — per-item URLs must be confirmed)
- **Deferred**: Per-article ingestion of 69 CC-BY queue items into vector corpus (CMS Supabase pipeline out of scope for Phase 4)

---
*Phase: 04-source-ingestion*
*Completed: 2026-06-13*
