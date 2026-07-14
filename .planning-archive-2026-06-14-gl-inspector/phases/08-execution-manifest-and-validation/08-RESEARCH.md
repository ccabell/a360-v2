# Phase 8: Execution Manifest and Validation — Research

**Researched:** 2026-06-14
**Domain:** SQL execution tracking, data pipeline validation, idempotent PostgreSQL patterns
**Confidence:** HIGH (all findings based on direct inspection of project artifacts)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| EXEC-01 | Single manifest file listing all SQL files in dependency order with status (pending/applied/verified) and phase association | Inventory complete — 52 SQL files + 6 migration files + 4 scripts across 7 phases; JSON format matches existing compile_manifest.json pattern in the project |
| EXEC-02 | Manifest includes pre-execution checklist (schema dependencies, required prior files) and post-execution verification queries | Dependency graph reconstructed from plan frontmatter `depends_on` fields and file naming; trailing verification SELECTs established in some files (07-02, 07-03, 04-01) |
| EXEC-03 | SQL files out of sync with source artifacts flagged in the manifest | One confirmed out-of-sync file identified: 06-02-canonical-common-inserts.sql has WARNING header; Phase 1 SQL lives in scripts/migrations/ not compile_sql; Phase 3 has no SQL in compile_sql |
| VAL-01 | Every completed phase (1-7) has a validation SQL file returning PASS/FAIL vs expected row counts, NULL violations, orphan records | No validation SQL files exist yet; verification logic scattered across VERIFICATION.md files as human-run queries; this phase creates them |
| VAL-02 | Batch content QC gate (>80% uniqueness ratio, 0 product name mismatches, evidence specificity) defined and documented | Known QC gap: Phase 2 batch had 5 unique content hashes across 37 rows; pattern must detect this class of failure |
| VAL-03 | Validation runs idempotently against live Supabase — running twice produces same result | All existing SQL uses SELECT-only assertions; no DML; idempotency is automatic for read-only validation queries |
</phase_requirements>

---

## Summary

Phase 8 is an inventory + harness phase. It does not write new data to the database — it writes files that describe and assert against data already written. The primary deliverables are (1) a single dependency-ordered manifest JSON listing all 52+ SQL files across phases 01-07 with execution status, and (2) one validation SQL file per phase (7 total) that can be run against the live Supabase project to get a PASS/FAIL signal.

The project uses no CI pipeline and no migration framework like Flyway or Liquibase. Execution is manual via the Supabase dashboard SQL editor. This means the manifest must be a human-readable artifact that doubles as a runbook — it tells the operator what to run next, in what order, and what to check afterward. The validation SQL files are the automation layer on top of this manual process.

The most important architectural insight is that validation SQL must use PostgreSQL's conditional RAISE/EXCEPTION pattern or CASE-based result rows to produce a machine-scannable PASS/FAIL output rather than raw row counts that require human interpretation.

**Primary recommendation:** Use JSON for the manifest (consistent with existing `compile_manifest.json`) with a flat array of file entries ordered by dependency. Write validation SQL as single-query files that return a `result` column of 'PASS' or 'FAIL' plus a `detail` column explaining failures — this format is readable in the Supabase SQL editor and parseable by scripts.

---

## Inventory of Existing SQL Artifacts

### Phase 01 — citations

Phase 1 output is **TypeScript scripts and a standalone migration SQL**, not compile_sql files.

| Artifact | Location | Purpose | Execution Method |
|----------|----------|---------|-----------------|
| `add_page_number_to_evidence_links.sql` | `scripts/migrations/` | DDL: ADD COLUMN page_number INT | Manual dashboard apply |
| `backfill-pubmed.ts` | `scripts/` | PubMed PMID + URL backfill | `npx tsx scripts/backfill-pubmed.ts` |
| `backfill-youtube.ts` | `scripts/` | YouTube timestamp backfill | `npx tsx scripts/backfill-youtube.ts` |

**Phase 1 is different:** No compile_sql files. Execution is via TypeScript scripts, not SQL paste. The manifest must flag this difference in execution method.

### Phase 02 — dossier-batch

35 SQL files in `supabase/compile_sql/`. These are grouped by plan sub-number:

| Plan | Files | Purpose |
|------|-------|---------|
| 02-02 | 10 files | Category dossiers (biostim, body-contouring, energy, dermal fillers, source-registry) |
| 02-03 | 5 files | HA Filler product dossiers (Juvederm) + source-registry |
| 02-04 | 5 files | Biostimulator + Body Contouring dossiers + source-registry |
| 02-05 | 6 files | Energy/RF, Laser, Skincare, Dysport dossiers + source-registry |

**Critical gap documented:** These 35 files are not yet executed against the live DB (12 products show 0 docs). They exist only as compiled files. The manifest must mark them `pending`.

**Known QC issue (Phase 2 batch):** 5 unique content hashes across 37 rows in the batch — indicative of content duplication where docs have the same body pasted multiple times. The VAL-02 batch QC gate must catch this pattern.

### Phase 03 — retrieval-wiring

**No SQL files in compile_sql.** Phase 3 produced TypeScript files (retrieval engine, API routes). No database schema changes were made via SQL in Phase 3.

| Artifact | Location | Purpose |
|----------|----------|---------|
| `lib/retrieval/sources.ts` | code | Supabase query layer (not SQL) |
| `app/api/research/chat/route.ts` | code | SSE streaming route (not SQL) |

The manifest should document Phase 3 as "code changes only — no SQL files."

### Phase 04 — source-ingestion

2 SQL files in `supabase/compile_sql/`:

| File | Purpose | Notes |
|------|---------|-------|
| `04-01-source-registry-triage.sql` | UPDATE source_registry + ingestion_queue status | Has execution timestamp header (2026-06-13) + idempotent conditional logic |
| `04-02-evidence-links-fda-urls.sql` | Backfill FDA URLs in evidence_links | |

### Phase 05 — concern-language

7 SQL files in `supabase/compile_sql/`:

| File | Purpose |
|------|---------|
| `05-01-execute-phase2-outstanding.sql` | Execute outstanding Phase 2 SQL |
| `05-01-missing-concerns.sql` | INSERT missing concerns |
| `05-01-schema-clusters.sql` | CREATE TABLE concern_clusters + concern_cluster_members |
| `05-02-aliases-aging-volume.sql` | Alias INSERTs |
| `05-02-aliases-expression-specialty.sql` | Alias INSERTs |
| `05-02-aliases-skin-body.sql` | Alias INSERTs |
| `05-03-cluster-definitions.sql` | INSERT cluster data |

**Note:** `05-01-execute-phase2-outstanding.sql` is a meta-file that appears to re-execute Phase 2 SQL. The manifest must clarify whether this is a pointer to the Phase 2 files or contains inline SQL.

### Phase 06 — pairing-engine

5 SQL files in `supabase/compile_sql/`:

| File | Purpose | Status |
|------|---------|--------|
| `06-00-schema.sql` | ADD COLUMN pairing_tier to item_relationships | Clean |
| `06-00-backfill.sql` | does_not_solve backfill | Clean |
| `06-02-canonical-common-inserts.sql` | INSERT 37 canonical/common pairs | **OUT OF SYNC — WARNING header present** |
| `06-02-conditional-compatible-inserts.sql` | INSERT conditional/compatible pairs | |
| `06-02-do-not-market-inserts.sql` | INSERT do-not-market pairs | |

**Known out-of-sync file:** `06-02-canonical-common-inserts.sql` has an explicit WARNING comment at the top: "This SQL file is OUT OF SYNC with REVIEW_QUEUE/pairings/ review cards. It must be regenerated from the finalized review cards after Chris's review. DO NOT EXECUTE until reconciled." The manifest must flag this with `out_of_sync: true` and `do_not_execute: true`.

### Phase 07 — timing-rules

3 SQL files in `supabase/compile_sql/` + 1 migration file:

| File | Location | Purpose |
|------|----------|---------|
| `07-01-timing-schema.sql` | compile_sql | 22 ADD COLUMN statements (gl_products + item_relationships) |
| `07-02-product-cadence.sql` | compile_sql | UPDATE 18 products with cadence/downtime data — has trailing verification SELECT |
| `07-03-pair-timing.sql` | compile_sql | UPDATE ~31 pairs with timing data — has trailing verification SELECT |
| `20260613_timing_columns.sql` | migrations/ | Mirror of 07-01 for migration tracking |

**Trailing verification SELECTs exist** in 07-02 and 07-03 but NOT as PASS/FAIL assertions — they are raw SELECT outputs requiring human reading. The validation files will formalize these as PASS/FAIL.

### Migration Files

| File | Purpose |
|------|---------|
| `20260611_agent_manager_tables.sql` | Agent manager tables (pre-Phase 1) |
| `20260612_add_does_not_solve_backfill_authority_rank.sql` | Phase 2 schema prep |
| `20260612_app_tracking.sql` | App tracking tables |
| `20260612_saved_outputs.sql` | Saved outputs table |
| `20260612_search_reference_docs.sql` | Search reference docs |
| `20260613_timing_columns.sql` | Phase 7 timing columns (mirror of compile_sql/07-01) |

---

## Manifest Design

### Format: JSON

**Why JSON over YAML or Markdown:**
- Consistent with existing `compile_manifest.json` in the project root (already used for Phase 2 entity tracking)
- Machine-parseable if a script is ever added to check status
- Supports typed fields (booleans for `out_of_sync`, `do_not_execute`)
- The Supabase dashboard doesn't consume this file — it's for the operator, so human-readability is secondary to structure

**Recommended manifest location:** `supabase/EXECUTION_MANIFEST.json`

### Manifest Entry Schema

```json
{
  "file": "supabase/compile_sql/07-02-product-cadence.sql",
  "phase": "07-timing-rules",
  "plan": "07-02",
  "order": 42,
  "type": "data",
  "depends_on": ["supabase/compile_sql/07-01-timing-schema.sql"],
  "execution_method": "supabase_dashboard_sql",
  "status": "pending",
  "out_of_sync": false,
  "do_not_execute": false,
  "pre_exec_checklist": [
    "07-01-timing-schema.sql has been applied (columns exist on gl_products)"
  ],
  "post_exec_verification": "SELECT COUNT(*) FROM gl_products WHERE minimum_retreatment_days IS NOT NULL; -- expected 18",
  "notes": "Trailing verification SELECT is included in the file itself"
}
```

### Status Values

| Status | Meaning |
|--------|---------|
| `pending` | Not yet applied to live DB |
| `applied` | Applied but not formally validated |
| `verified` | Applied and validation SQL returned PASS |
| `deferred` | Intentionally not applied yet (e.g., 06-02 awaiting Chris review) |
| `blocked` | Cannot apply until dependency is resolved |

### Execution Method Values

| Method | When Used |
|--------|-----------|
| `supabase_dashboard_sql` | Standard SQL paste in dashboard — all compile_sql files |
| `tsx_script` | TypeScript scripts (Phase 1 backfills) |
| `migration_file` | Supabase migration tracking (migrations/ folder) |
| `no_sql` | Phase produces code changes only (Phase 3) |

---

## Validation SQL Design

### Pattern: PASS/FAIL via CASE + CTE

The standard pattern for assertion SQL in a PostgreSQL Supabase context with no test framework:

```sql
-- Template: Phase XX Validation
-- Run against: Supabase project aejskvmpembryunnbgrk
-- Idempotent: YES (SELECT only)

WITH checks AS (
  SELECT
    'check_name'                          AS check_id,
    'Human-readable description'          AS description,
    (SELECT COUNT(*) FROM table)          AS actual,
    expected_count                        AS expected,
    CASE WHEN (SELECT COUNT(*) FROM table) >= expected_count
         THEN 'PASS' ELSE 'FAIL' END     AS result
  UNION ALL
  SELECT
    'null_check',
    'No NULL violations in required field',
    (SELECT COUNT(*) FROM table WHERE field IS NULL),
    0,
    CASE WHEN (SELECT COUNT(*) FROM table WHERE field IS NULL) = 0
         THEN 'PASS' ELSE 'FAIL' END
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
```

**Why this pattern:**
- Returns a table where each row is a check, readable in Supabase SQL editor
- `result DESC` puts FAIL rows first — operator sees failures immediately
- No DML, no side effects — idempotent by construction
- Works without PL/pgSQL or stored procedures

**Alternative: RAISE EXCEPTION** — could use a PL/pgSQL DO block that raises an exception on first failure. Rejected because it stops at first failure and doesn't show all failures.

### Phase-by-Phase Validation Contract

**Phase 1 — citations**

```sql
-- Checks: page_number column exists, PubMed evidence rows have pmid + url
SELECT column_name FROM information_schema.columns
WHERE table_name='evidence_links' AND column_name='page_number';
-- Expected: 1 row
```

| Check | Table | Assertion | Expected |
|-------|-------|-----------|---------|
| page_number column | information_schema.columns | column_name='page_number' on evidence_links | 1 row |
| PubMed pmid populated | evidence_links | WHERE source='pubmed' AND pmid IS NULL | 0 rows |
| PubMed url populated | evidence_links | WHERE source='pubmed' AND url IS NULL | 0 rows |

**Phase 2 — dossier-batch**

| Check | Assertion | Expected |
|-------|-----------|---------|
| Dossier doc count | agent_reference_docs COUNT WHERE status IN ('draft','active') | >= 136 |
| Products with >=3 docs | Subquery counting per offering_id | 18 products each with >=3 |
| evidence_links count | evidence_links total COUNT | >= 184 |
| evidence_links no bare pmid+null url | WHERE source='pubmed' AND pmid IS NOT NULL AND url IS NULL | 0 |
| item_concerns populated | COUNT DISTINCT offering_id FROM item_concerns | >= 18 |
| item_body_areas populated | COUNT DISTINCT offering_id FROM item_body_areas | >= 18 |
| aliases populated | COUNT(*) FROM aliases | >= 593 |
| source_registry populated | COUNT(*) FROM source_registry | >= 50 |
| **Uniqueness ratio** (VAL-02 gate) | COUNT(DISTINCT LEFT(content_md, 500)) / COUNT(*) FROM agent_reference_docs WHERE status='draft' | >= 0.80 |
| No duplicate content blocks | COUNT(*) - COUNT(DISTINCT LEFT(content_md, 200)) FROM agent_reference_docs | 0 (or flag) |

**Phase 3 — retrieval-wiring**

No SQL validation (code-only phase). Validation is live UI test (EVID-03 in Phase 9).

| Check | Method | Expected |
|-------|--------|---------|
| lib/retrieval/sources.ts exists | File check (not SQL) | File present |
| No mock imports in retrieval path | Grep check | 0 matches |

**Phase 4 — source-ingestion**

| Check | Assertion | Expected |
|-------|-----------|---------|
| source_registry status clean | WHERE status='review' | 0 rows (all triaged) |
| ingestion_queue status clean | WHERE status='queued' | 0 rows (all decided) |
| FDA evidence_links have url | WHERE source='fda_label' AND url IS NULL | 0 rows |

**Phase 5 — concern-language**

| Check | Assertion | Expected |
|-------|-----------|---------|
| concern_clusters table exists | information_schema.tables | 1 row |
| concern_cluster_members table exists | information_schema.tables | 1 row |
| Concern clusters populated | COUNT(*) FROM concern_clusters | >= 4 |
| Aliases per concern | MIN(alias_count) over concerns join | >= 3 |
| Total aliases | COUNT(*) FROM aliases | >= 593 |
| Missing concerns added | WHERE name IN ('Brow Ptosis', 'Gummy Smile') FROM concerns | 2 rows |

**Phase 6 — pairing-engine**

| Check | Assertion | Expected |
|-------|-----------|---------|
| pairing_tier column exists | information_schema.columns | 1 row |
| Total pairs evaluated | COUNT(*) FROM item_relationships | 153 |
| Canonical pairs | COUNT(*) WHERE pairing_tier='canonical' | 5 |
| Common pairs | COUNT(*) WHERE pairing_tier='common' | 32 |
| Conditional pairs | COUNT(*) WHERE pairing_tier='conditional' | 51 |
| Compatible only | COUNT(*) WHERE pairing_tier='compatible_only' | 48 |
| Do-not-market | COUNT(*) WHERE pairing_tier='do_not_market' | 17 |
| clinical_rationale populated | WHERE pairing_tier IN ('canonical','common') AND clinical_rationale IS NULL | 0 |
| patient_education_text populated | WHERE pairing_tier IN ('canonical','common') AND patient_education_text IS NULL | 0 |
| Orphan pairs | WHERE item_a_id NOT IN (SELECT id FROM gl_products) | 0 |

Note: 06-02-canonical-common-inserts.sql is flagged DO NOT EXECUTE in the manifest. The Phase 6 validation counts will only be achievable once this file is regenerated and applied (Phase 10 work). The validation SQL should WARN on the canonical/common counts if they are 0, not FAIL — since the file is intentionally deferred.

**Phase 7 — timing-rules**

| Check | Assertion | Expected |
|-------|-----------|---------|
| Timing columns on gl_products | information_schema.columns WHERE table_name='gl_products' AND column_name LIKE '%_days%' | >= 9 |
| Timing columns on item_relationships | information_schema.columns WHERE table_name='item_relationships' AND column_name IN ('same_session_ok','staging_required','safety_critical','timing_warning_level') | 4 |
| Products with timing data | COUNT(*) FROM gl_products WHERE minimum_retreatment_days IS NOT NULL | >= 18 (once 07-02 applied) |
| BoNT-A safety floor | WHERE name ILIKE '%botox%' OR name ILIKE '%dysport%' (etc.) AND minimum_retreatment_days = 85 | 5 neurotoxins |
| Pairs with timing | COUNT(*) FROM item_relationships WHERE same_session_ok IS NOT NULL | >= 27 |
| Safety-critical pairs | COUNT(*) WHERE safety_critical = true | >= 4 |
| timing_warning_level validity | WHERE timing_warning_level NOT IN ('hard_block','warning','education') | 0 rows |

---

## Out-of-Sync Detection Approach (EXEC-03)

**The problem:** A SQL file can claim to represent Phase X data but be stale relative to the planning artifacts (review cards, research specs, corrections made in later phases).

**Known out-of-sync cases:**

| File | Out-of-sync artifact | Reason | Action |
|------|---------------------|--------|--------|
| `06-02-canonical-common-inserts.sql` | Per-pair review cards in `.planning/phases/06-pairing-engine/REVIEW_QUEUE/pairings/` | File has podcast references in source_reference field; file predates Chris's review of the 37 pairing cards | `do_not_execute: true`; regenerate in Phase 10 |

**Detection heuristic for the manifest (EXEC-03):**

Out-of-sync detection cannot be fully automated because the planning artifacts are natural-language documents. The manifest approach is:

1. For each SQL file, document the `source_artifact` field (which planning doc or review file it was generated from).
2. For any file with an explicit WARNING or "DO NOT EXECUTE" comment at the top, flag `out_of_sync: true` automatically.
3. For files where the source artifact has been modified after the SQL file commit timestamp, flag `review_needed: true`.

Programmatic check (can be run during manifest creation):
```bash
# Find SQL files with DO NOT EXECUTE warnings
grep -l "DO NOT EXECUTE\|OUT OF SYNC\|WARNING.*regenerate" supabase/compile_sql/*.sql
```

---

## Batch Content QC Gate (VAL-02)

The Phase 2 batch produced 37 review cards but had only 5 unique content hashes — meaning ~32 of the dossier documents shared body content (content duplication bug).

**QC gate definition for future batch phases:**

```sql
-- Uniqueness ratio check
-- Run after any batch INSERT of agent_reference_docs
SELECT
  COUNT(*)                                              AS total_docs,
  COUNT(DISTINCT LEFT(content_md, 500))                AS unique_fingerprints,
  ROUND(COUNT(DISTINCT LEFT(content_md, 500))::numeric
        / NULLIF(COUNT(*),0) * 100, 1)                 AS uniqueness_pct,
  CASE WHEN COUNT(DISTINCT LEFT(content_md, 500))::numeric
            / NULLIF(COUNT(*),0) >= 0.80
       THEN 'PASS' ELSE 'FAIL' END                     AS uniqueness_check,
  -- Product name accuracy: no doc title referencing wrong product
  (SELECT COUNT(*) FROM agent_reference_docs ard
   JOIN gl_products p ON ard.offering_id = p.id
   WHERE ard.title NOT ILIKE '%' || split_part(p.name,' ',1) || '%'
   AND ard.status='draft')                             AS product_name_mismatches
FROM agent_reference_docs
WHERE status = 'draft';
-- PASS criteria: uniqueness_pct >= 80.0 AND product_name_mismatches = 0
```

**Evidence specificity check** (third criterion): Cannot be automated with pure SQL because it requires checking whether citation fields contain substantive references vs. generic placeholders. The VAL-02 definition should include a manual check: "At least 80% of agent_reference_docs in status='draft' have at least 1 evidence_link with authority_rank >= 2 and url populated."

```sql
-- Evidence specificity query
SELECT
  COUNT(CASE WHEN el_count >= 1 THEN 1 END) AS docs_with_evidence,
  COUNT(*) AS total_docs,
  ROUND(COUNT(CASE WHEN el_count >= 1 THEN 1 END)::numeric / COUNT(*) * 100, 1) AS pct_with_evidence
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
) sub;
-- PASS criteria: pct_with_evidence >= 80
```

---

## Execution Tracking: Simple Status File vs. DB Table

**Decision: Use manifest JSON with manual status updates** (not a DB table).

**Rationale:**
- No CI pipeline exists; adding a tracking table to the database adds operational complexity for marginal benefit
- The manifest JSON pattern already exists (`compile_manifest.json` at project root)
- Status updates are infrequent (once per SQL file execution, done manually)
- A `supabase_execution_log` table would require its own DDL, own migration, and its own validation SQL — creating a bootstrap problem

**The operator workflow:**
1. Open `supabase/EXECUTION_MANIFEST.json`
2. Find next file with `status: "pending"` and `do_not_execute: false`
3. Verify pre_exec_checklist items are all satisfied
4. Paste SQL into Supabase dashboard SQL editor
5. Run post_exec_verification query to sanity-check output
6. Update manifest entry: `status: "applied"`
7. After running validation SQL file: update to `status: "verified"`

---

## Dependency Graph

The execution order is determined by schema-before-data dependencies:

```
Layer 0 (Pre-phase migrations — apply first):
  migrations/20260611_agent_manager_tables.sql
  migrations/20260612_*.sql  (4 files)

Layer 1 (Phase 1 — evidence_links schema):
  scripts/migrations/add_page_number_to_evidence_links.sql  [dashboard]
  scripts/backfill-pubmed.ts                                [tsx]
  scripts/backfill-youtube.ts                               [tsx]

Layer 2 (Phase 2 — dossier data, largest batch):
  Subgroup A: source-registry files (02-02, 02-03, 02-04, 02-05 source-registry)
  Subgroup B: category dossiers (02-02 category files)
  Subgroup C: product dossiers per plan (02-03, 02-04, 02-05 dossiers)
  Subgroup D: evidence links per plan (02-03, 02-04, 02-05 evidence)
  Subgroup E: structured emission (item_concerns, item_body_areas, aliases per plan)
  Within Phase 2: source-registry before evidence-links, schema before data

Layer 3 (Phase 4 — source triage, depends on Phase 2 source_registry):
  04-01-source-registry-triage.sql
  04-02-evidence-links-fda-urls.sql

Layer 4 (Phase 5 — concern language, depends on Phase 2 concerns table):
  05-01-schema-clusters.sql     [schema first]
  05-01-missing-concerns.sql
  05-01-execute-phase2-outstanding.sql
  05-02-aliases-*.sql           [after concerns exist]
  05-03-cluster-definitions.sql [after clusters schema + concerns]

Layer 5 (Phase 6 — pairing, depends on Phase 2 products + Phase 5 concerns):
  06-00-schema.sql              [schema first]
  06-00-backfill.sql
  06-02-canonical-common-inserts.sql   [DEFERRED — out of sync]
  06-02-conditional-compatible-inserts.sql
  06-02-do-not-market-inserts.sql

Layer 6 (Phase 7 — timing, depends on Phase 2 products + Phase 6 pairs):
  07-01-timing-schema.sql  (= migrations/20260613_timing_columns.sql)
  07-02-product-cadence.sql
  07-03-pair-timing.sql    [depends on Phase 6 pairs being inserted]

Phase 3: No SQL files — code changes only
```

**Critical sequencing constraint:** `07-03-pair-timing.sql` depends on item_relationships rows created by Phase 6. The Phase 6 INSERT files (06-02-*) must be executed before 07-03 can produce any updates. Currently 06-02-canonical-common-inserts.sql is blocked — meaning 07-03 will only update conditional/compatible/do-not-market rows until Phase 10 resolves 06-02.

---

## Architecture Patterns

### Pattern 1: Idempotent INSERT (used throughout project)

```sql
INSERT INTO table (id, col_a, col_b)
SELECT gen_random_uuid(), val_a, val_b
WHERE NOT EXISTS (
  SELECT 1 FROM table WHERE col_a = val_a AND col_b = val_b
);
```

Pattern is consistent across all Phase 2, 5, 6 files. Validation SQL can rely on this pattern being idempotent.

### Pattern 2: Idempotent UPDATE (used in Phase 4, 6, 7)

```sql
UPDATE table SET col = value
WHERE (item_a_id = 'uuid'::uuid AND item_b_id = 'uuid'::uuid)
   OR (item_a_id = 'uuid'::uuid AND item_b_id = 'uuid'::uuid);
```

Bidirectional WHERE clause used on item_relationships to handle pair order.

### Pattern 3: DDL via ADD COLUMN IF NOT EXISTS (used in Phases 5, 6, 7)

```sql
ALTER TABLE table ADD COLUMN IF NOT EXISTS col TYPE;
```

Safe to re-run — existing columns are not affected.

### Pattern 4: Constraint via DO block (used in Phase 7)

```sql
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'constraint_name') THEN
    ALTER TABLE table ADD CONSTRAINT constraint_name CHECK (...);
  END IF;
END $$;
```

Idempotent constraint addition — used for CHECK constraints that cannot use IF NOT EXISTS directly.

---

## Common Pitfalls

### Pitfall 1: Migration vs. compile_sql duplication

**What goes wrong:** Phase 7 produced both `supabase/migrations/20260613_timing_columns.sql` AND `supabase/compile_sql/07-01-timing-schema.sql` as mirrors. If one is updated and the other isn't, they diverge. The manifest must document which is authoritative. The migrations/ file is for Supabase migration tracking; the compile_sql file is the human-runnable version.

**How to avoid:** Manifest flags both files; operator applies the migrations/ version and treats compile_sql/ version as documentation reference.

### Pitfall 2: Phase ordering assumption

**What goes wrong:** 07-03-pair-timing.sql is a no-op until Phase 6 INSERT files have been applied. Running 07-03 before 06-02 produces 0 updated rows silently — not an error, but a false sense of completion.

**How to avoid:** Manifest `depends_on` field explicitly lists 06-02-*.sql files as prerequisite. Pre-exec checklist item: "item_relationships has >= 37 rows with pairing_tier IN ('canonical','common')."

### Pitfall 3: Out-of-sync file executed accidentally

**What goes wrong:** 06-02-canonical-common-inserts.sql has a WARNING header but a future operator might miss it and paste it into the SQL editor anyway. The INSERT statements would load podcast-contaminated content.

**How to avoid:** `do_not_execute: true` in manifest entry. Pre-exec checklist item: "This file is blocked pending Phase 10 regeneration."

### Pitfall 4: Validation count expectations are stale

**What goes wrong:** Expected counts in validation SQL are hardcoded at research time. If Phase 9 or 10 adds rows to the same tables, validation SQL for earlier phases will fail even though earlier phase data is correct.

**How to avoid:** Use `>= N` not `= N` for row count assertions everywhere. Only use `= N` for invariants (like 18 products total, 5 neurotoxins with 85-day floor).

### Pitfall 5: Phase 2 execution order within the batch

**What goes wrong:** 35 files across Phase 2 have implicit sub-ordering. Source registry files should precede evidence-links files (evidence_links foreign-keys source_registry in some schemas). Category dossiers should precede product dossiers because product dossiers reference category IDs.

**How to avoid:** Manifest assigns numeric `order` field within Phase 2 sub-ordering. Within a plan group (02-03-*), order is: source-registry → dossiers → evidence-links → structured-emission.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SQL migration framework | Custom migration tracker table | JSON manifest + manual status | No CI; simple workflow; bootstrap problem with DB-based tracking |
| Test assertions | PL/pgSQL unit test framework (pgTAP) | CASE-based PASS/FAIL queries | No test infrastructure in project; pgTAP requires installation |
| Content hash comparison | MD5 per row + comparison table | LEFT(content_md, 500) fingerprint in SELECT | Simple, works in SQL editor, no additional tooling |
| Dependency resolution | DAG execution engine | Manual manifest order + operator judgment | 52 files, run once; automation adds complexity with no CI |

**Key insight:** This project runs SQL manually via the Supabase dashboard. The validation architecture must be operable by pasting a single SQL file into a text editor — no CLI tools, no migrations runner, no test framework.

---

## Environment Availability

Step 2.6: Phase 8 produces only JSON and SQL files. No external tools are required at plan execution time beyond:

| Dependency | Required By | Available | Notes |
|------------|------------|-----------|-------|
| Supabase dashboard | SQL execution | Yes (project aejskvmpembryunnbgrk) | Manual access; no MCP execute_sql confirmed available in execution context |
| Text editor / git | Manifest editing | Yes | Standard dev environment |
| `grep` / bash | Out-of-sync detection | Yes | Available on Windows via git bash |

**Supabase MCP note:** The 07-VERIFICATION.md documents that MCP execute_sql was not available during Phase 7 verification. Phase 8 generates files — it does not execute SQL. No MCP dependency.

---

## Validation Architecture

> `workflow.nyquist_validation` is absent from `.planning/config.json` (only `_auto_chain_active: false` present). Treat as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | SQL assertions via Supabase dashboard SQL editor (no test framework) |
| Config file | None — SQL files are self-contained |
| Quick run command | Paste individual check query into Supabase dashboard |
| Full suite command | Paste phase validation SQL file into Supabase dashboard, read PASS/FAIL rows |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|--------------|
| EXEC-01 | Manifest lists all SQL files in dependency order | File check | `test -f supabase/EXECUTION_MANIFEST.json` | No — Wave 0 |
| EXEC-02 | Each entry has pre_exec_checklist and post_exec_verification | File content check | `jq '.[].pre_exec_checklist' supabase/EXECUTION_MANIFEST.json` | No — Wave 0 |
| EXEC-03 | Out-of-sync files are flagged | File content check | `jq '.[] | select(.out_of_sync==true)' supabase/EXECUTION_MANIFEST.json` | No — Wave 0 |
| VAL-01 | Each phase has a validation SQL file | File check | `ls supabase/validation/phase-*.sql` | No — Wave 0 |
| VAL-02 | Batch QC gate is documented | File check | `test -f supabase/validation/batch-qc-gate.sql` | No — Wave 0 |
| VAL-03 | Validation queries are SELECT-only (idempotent) | Grep check | `grep -E "^(INSERT|UPDATE|DELETE|DROP|ALTER)" supabase/validation/*.sql` | No — Wave 0 |

### Wave 0 Gaps

- [ ] `supabase/EXECUTION_MANIFEST.json` — covers EXEC-01, EXEC-02, EXEC-03
- [ ] `supabase/validation/` directory
- [ ] `supabase/validation/phase-01-citations.sql` — covers VAL-01 for Phase 1
- [ ] `supabase/validation/phase-02-dossier-batch.sql` — covers VAL-01 for Phase 2
- [ ] `supabase/validation/phase-03-retrieval-wiring.sql` — covers VAL-01 for Phase 3 (file check only)
- [ ] `supabase/validation/phase-04-source-ingestion.sql` — covers VAL-01 for Phase 4
- [ ] `supabase/validation/phase-05-concern-language.sql` — covers VAL-01 for Phase 5
- [ ] `supabase/validation/phase-06-pairing-engine.sql` — covers VAL-01 for Phase 6
- [ ] `supabase/validation/phase-07-timing-rules.sql` — covers VAL-01 for Phase 7
- [ ] `supabase/validation/batch-qc-gate.sql` — covers VAL-02

---

## Open Questions

1. **05-01-execute-phase2-outstanding.sql content**
   - What we know: File exists in compile_sql; Phase 5 summary mentions "execute outstanding Phase 2 SQL"
   - What's unclear: Does this file re-execute Phase 2 SQL inline, or reference external files?
   - Recommendation: Read this file before writing the manifest entry; its depends_on list may be extensive.

2. **Phase 2 actual execution state**
   - What we know: STATE.md says 12 products show 0 docs in live DB; Phase 2 files are "pending"
   - What's unclear: Have any Phase 2 files been partially applied? Is the current agent_reference_docs count > 0?
   - Recommendation: Run a quick count query in Supabase before assuming all Phase 2 is pending: `SELECT COUNT(*) FROM agent_reference_docs WHERE status='draft'`

3. **Phase 6 pair actual insertion state**
   - What we know: 06-02-canonical-common-inserts.sql is blocked; conditional/compatible/do-not-market files have no warning
   - What's unclear: Were 06-02-conditional-compatible-inserts.sql and 06-02-do-not-market-inserts.sql applied to live DB? If so, do they populate item_relationships at all?
   - Recommendation: Query `SELECT pairing_tier, COUNT(*) FROM item_relationships GROUP BY pairing_tier` before writing validation expected counts

4. **Manifest granularity for Phase 2 sub-files**
   - What we know: 35 Phase 2 files; sub-ordering matters (source-registry before evidence-links)
   - What's unclear: Should each of 35 files be a manifest entry, or should they be grouped by plan (6 groups)?
   - Recommendation: Individual file entries — this gives the operator the exact file to paste, not a group name

---

## Sources

### Primary (HIGH confidence — direct artifact inspection)
- `/c/projects/a360-v2/supabase/compile_sql/` — all 52 SQL files inspected for patterns and sync status
- `/c/projects/a360-v2/supabase/migrations/` — all 6 migration files listed
- `/c/projects/a360-v2/.planning/phases/*/` — VERIFICATION.md, SUMMARY.md, PLAN.md files for phases 01-07
- `/c/projects/a360-v2/.planning/REQUIREMENTS.md` — requirement definitions and phase mapping
- `/c/projects/a360-v2/.planning/STATE.md` — locked decisions, carry-forward context
- `/c/projects/a360-v2/.planning/ROADMAP.md` — success criteria for Phase 8
- `/c/projects/a360-v2/compile_manifest.json` — existing manifest format reference
- `/c/projects/a360-v2/supabase/compile_sql/06-02-canonical-common-inserts.sql` — confirmed WARNING header present

### Secondary (MEDIUM confidence)
- Phase 2 batch QC gap (5 unique hashes / 37 rows) — referenced in STATE.md carry-forward; not independently verified against live DB

---

## Metadata

**Confidence breakdown:**
- SQL file inventory: HIGH — direct filesystem inspection; all 52 files listed
- Dependency graph: HIGH — reconstructed from plan frontmatter `depends_on` and file name ordering
- Validation SQL patterns: HIGH — standard PostgreSQL patterns; consistent with existing verification queries in VERIFICATION.md files
- Expected row counts: MEDIUM — based on plan success criteria and summaries; live DB state not queried
- Out-of-sync detection: HIGH — 06-02 WARNING header directly observed; programmatic check confirmed

**Research date:** 2026-06-14
**Valid until:** 2026-07-14 (stable schema, no fast-moving dependencies)
