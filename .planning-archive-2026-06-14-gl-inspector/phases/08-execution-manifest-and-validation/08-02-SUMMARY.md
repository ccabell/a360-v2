---
phase: 08-execution-manifest-and-validation
plan: 02
subsystem: database
tags: [sql, validation, supabase, idempotent, pass-fail, qc-gate]

# Dependency graph
requires:
  - phase: 08-01
    provides: supabase/EXECUTION_MANIFEST.json -- defines what to validate
  - phase: 01-through-07
    provides: All SQL/TS artifacts whose data these files assert against
provides:
  - supabase/validation/phase-01-citations.sql
  - supabase/validation/phase-02-dossier-batch.sql
  - supabase/validation/phase-03-retrieval-wiring.sql
  - supabase/validation/phase-04-source-ingestion.sql
  - supabase/validation/phase-05-concern-language.sql
  - supabase/validation/phase-06-pairing-engine.sql
  - supabase/validation/phase-07-timing-rules.sql
  - supabase/validation/batch-qc-gate.sql
affects:
  - 09-podcast-data-strategy-and-evidence-provenance
  - 10-pairing-sql-reconciliation

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "CTE + CASE PASS/FAIL pattern for idempotent assertion SQL (no PL/pgSQL, no pgTAP)"
    - "WARN tier between PASS and FAIL for intentionally-deferred checks (p6_canonical, p6_common)"
    - "LEFT(content_md, 500) fingerprint for batch content uniqueness ratio"
    - "information_schema.columns/tables for DDL presence assertions"

key-files:
  created:
    - supabase/validation/phase-01-citations.sql
    - supabase/validation/phase-02-dossier-batch.sql
    - supabase/validation/phase-03-retrieval-wiring.sql
    - supabase/validation/phase-04-source-ingestion.sql
    - supabase/validation/phase-05-concern-language.sql
    - supabase/validation/phase-06-pairing-engine.sql
    - supabase/validation/phase-07-timing-rules.sql
    - supabase/validation/batch-qc-gate.sql
  modified: []

key-decisions:
  - "Phase 6 canonical/common checks use WARN (not FAIL) because 06-02-canonical-common-inserts.sql is deferred until Phase 10 -- WARN signals expected absence, not a failure"
  - "All count checks use >= (not =) to avoid false FAIL when future phases add rows to the same tables"
  - "p7_bont_safety_floor uses name ILIKE pattern (botox, dysport, xeomin, jeuveau, daxxify) rather than category_name join -- direct column check is more reliable given schema uncertainty"
  - "batch-qc-gate.sql targets status='draft' only -- avoids confounding with active/archived historical rows when running QC on a fresh batch"

# Metrics
duration: 3min
completed: 2026-06-14
---

# Phase 08 Plan 02: Validation SQL Harness Summary

**8 idempotent CTE+CASE PASS/FAIL validation SQL files covering all 7 phases plus a 3-part batch content QC gate (uniqueness >= 80%, 0 name mismatches, evidence specificity >= 80%)**

## Performance

- **Duration:** 3 min
- **Started:** 2026-06-14T04:59:05Z
- **Completed:** 2026-06-14T05:02:16Z
- **Tasks:** 2 of 2
- **Files created:** 8

## Accomplishments

### Task 1: Phase 1-4 Validation SQL

- **phase-01-citations.sql** — 3 checks: page_number column DDL presence, PubMed pmid not null, PubMed url not null
- **phase-02-dossier-batch.sql** — 7 checks: doc count >= 136, products with >= 3 docs, evidence_links >= 184, item_concerns, item_body_areas, aliases >= 593, source_registry >= 50
- **phase-03-retrieval-wiring.sql** — sentinel file (p3_code_only PASS, shell commands in header for file/grep checks)
- **phase-04-source-ingestion.sql** — 3 checks: source_registry 0 review rows, ingestion_queue 0 queued rows, FDA evidence_links 0 null urls

### Task 2: Phase 5-7 Validation SQL + Batch QC Gate

- **phase-05-concern-language.sql** — 5 checks: concern_clusters table exists, concern_cluster_members table exists, clusters >= 4 rows, aliases >= 593, Brow Ptosis + Gummy Smile both present
- **phase-06-pairing-engine.sql** — 8 checks: pairing_tier column exists, total pairs >= 153, canonical (WARN), common (WARN), conditional >= 51, compatible_only >= 48, do_not_market >= 17, 0 orphan pairs
- **phase-07-timing-rules.sql** — 6 checks: 9 timing columns on gl_products, 4 timing columns on item_relationships, products with timing >= 18, BoNT-A 85-day floor >= 5 neurotoxins, same_session_ok >= 27 pairs, safety_critical >= 4 pairs
- **batch-qc-gate.sql** — 3 QC checks: uniqueness ratio >= 80% (LEFT(content_md, 500) fingerprint), 0 product name mismatches (title ILIKE first word of product name), evidence specificity >= 80% (docs with authority_rank >= 2 evidence)

## Task Commits

1. **Task 1: Create validation SQL for Phases 1, 2, 3, and 4** - `d356ea7` (feat)
2. **Task 2: Create validation SQL for Phases 5, 6, 7 and the batch QC gate** - `7f354b4` (feat)

**Plan metadata:** (this commit -- docs)

## Files Created/Modified

- `supabase/validation/phase-01-citations.sql` — 3 checks, SELECT-only
- `supabase/validation/phase-02-dossier-batch.sql` — 7 checks, SELECT-only
- `supabase/validation/phase-03-retrieval-wiring.sql` — 1 sentinel check (code-only phase)
- `supabase/validation/phase-04-source-ingestion.sql` — 3 checks, SELECT-only
- `supabase/validation/phase-05-concern-language.sql` — 5 checks, SELECT-only
- `supabase/validation/phase-06-pairing-engine.sql` — 8 checks (2 WARN), SELECT-only
- `supabase/validation/phase-07-timing-rules.sql` — 6 checks, SELECT-only
- `supabase/validation/batch-qc-gate.sql` — 3 QC checks (VAL-02), SELECT-only

## Decisions Made

- Phase 6 canonical/common checks use WARN (not FAIL) because 06-02-canonical-common-inserts.sql is flagged do_not_execute: true in the manifest. WARN signals expected absence pre-Phase-10, not a data error.
- All count checks use >= (not =) to avoid false FAIL when future phases add rows to the same tables. The only = 0 checks are for null-violation and orphan assertions.
- p7_bont_safety_floor checks by name ILIKE pattern ('%botox%', '%dysport%', etc.) rather than a category join, since category_name is not a guaranteed direct column on gl_products.
- batch-qc-gate.sql scopes to `status = 'draft'` to avoid confounding the uniqueness ratio with pre-existing active/archived rows when QC-ing a fresh batch insertion.

## Deviations from Plan

None -- plan executed exactly as written. The WARN tier for Phase 6 canonical/common was specified in the plan and implemented as specified.

## Requirements Satisfied

- **VAL-01:** 7 phase validation files exist (phases 01-07), each returning PASS/FAIL rows via CTE+CASE pattern
- **VAL-02:** batch-qc-gate.sql implements all 3 QC checks (uniqueness >= 80%, 0 name mismatches, evidence specificity >= 80%)
- **VAL-03:** All 8 files are SELECT-only -- `grep -rE "^(INSERT|UPDATE|DELETE|DROP|ALTER)" supabase/validation/*.sql` returns 0 matches

## Known Stubs

None -- all validation SQL files contain real assertions against live Supabase tables. No hardcoded empty values or placeholders.

## Self-Check: PASSED
