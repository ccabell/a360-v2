# Phase 6: Pairing Engine — Resume Instructions

**Last updated:** 2026-06-14

## Current State

- **Milestone v1.1** created with 3 new phases (08-10) for pipeline integrity
- Phase 8 planning is in progress in another session
- Phase 6 review cards are revised and awaiting Chris's spreadsheet review
- SQL files are out of sync (must be regenerated after review)
- PubMed URL backfill DONE (36 rows fixed, 78/78 PubMed now have URLs)
- Playwright E2E tests committed and passing (19/19 desktop + mobile)
- 4 orphaned worktrees cleaned up

## How to resume pairing review work

Open Claude Code in `C:\projects\a360-v2` and paste:

```
Resume Phase 6 pairing review. Current state:

## What's done
- 37 review cards revised with evidence hierarchy (podcast citations removed, PubMed DOIs added)
- Tier distribution: 2 canonical, 24 common, 11 conditional (Sculptra pairs downgraded)
- Every card has Evidence Type tag (HIGH/MODERATE/LOW)
- CSV at REVIEW_QUEUE/pairing_review_spreadsheet.csv — 23 columns including Evidence Type
- Reviewer instructions at REVIEW_QUEUE/REVIEWER_INSTRUCTIONS.md
- Quality audit at .planning/phases/06-pairing-engine/PHASE_6_QUALITY_AUDIT.md
- PubMed URL backfill complete (78/78 have URLs now)
- Playwright E2E tests passing (19/19)

## What's open
1. Chris needs to review the spreadsheet — fill in Decision + Notes columns
2. SQL files (supabase/compile_sql/06-02-*.sql) have OUT OF SYNC warnings — must be regenerated from finalized review cards after Chris's review
3. 7 IFU evidence_links rows still missing URLs (510k clearance docs, need manual sourcing)
4. Phase verification not yet run

## Key context
- Supabase GL project: aejskvmpembryunnbgrk
- Evidence hierarchy: HIGH (PubMed/FDA), MODERATE (class-level PubMed), LOW (expert consensus only)
- Podcasts are research-only — never cited in production DB fields
- Sculptra FDA label: "combination use not systematically evaluated"
- Milestone v1.1 phases 08-10 handle validation, evidence provenance, and pairing SQL reconciliation
```

## If Chris has completed the spreadsheet review

```
Chris completed the Phase 6 pairing review spreadsheet at REVIEW_QUEUE/pairing_review_spreadsheet.csv.
Read the Decision and Notes columns for all 37 rows. Then:
1. Apply any NEEDS REVISION feedback to the review card files
2. Regenerate the 3 SQL files from the finalized review cards (remove out-of-sync warnings)
3. Execute the SQL against Supabase GL project aejskvmpembryunnbgrk
4. Run verification for Phase 6
```

## Key files
- `REVIEW_QUEUE/pairing_review_spreadsheet.csv` — the review artifact (37 rows)
- `REVIEW_QUEUE/REVIEWER_INSTRUCTIONS.md` — how to review
- `.planning/phases/06-pairing-engine/PHASE_6_QUALITY_AUDIT.md` — what went wrong in first pass
- `.planning/phases/06-pairing-engine/CORPUS_PRODUCT_SPECIFICS.md` — corpus research data
- `e2e/smoke.spec.ts` — Playwright E2E tests
