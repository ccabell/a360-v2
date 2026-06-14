---
phase: 12-combination-fuel-documents
plan: 01
subsystem: database
tags: [supabase, jsonb, sql, fuel-docs, agent-fuel, schema-migration]

requires:
  - phase: 11-source-framework-and-v1.1-closeout
    provides: source classification rules and enrichment pipeline patterns
  - phase: 06-pairing-engine
    provides: pairing tier decisions (canonical/common/conditional) for 153 pairs
  - phase: 999.1-agent-fuel-document-management-ui
    provides: FUEL_DOC_TEMPLATE_SPEC.md canonical combination fuel doc template

provides:
  - SCHEMA_AUDIT.md with live agent_fuel_documents schema and column names for downstream plans
  - 12-01-fuel-doc-schema-unification.sql: idempotent INSERT/UPDATE SQL for 16 pairing_fuel rows
  - Canonical combination JSON template (template_version 1.0) with all 12 universal do-not-say items
  - Live column name documentation required by Phase 12-02 and 12-03

affects:
  - 12-02-combination-fuel-documents (content generation — must use correct column/table names)
  - 12-03-combination-fuel-documents (review queue assembly — must use correct column/table names)
  - 999.1-agent-fuel-document-management-ui (management UI — live schema confirmed)

tech-stack:
  added: []
  patterns:
    - "Idempotent INSERT with WHERE NOT EXISTS guard using content->>'pair_key' as deduplication key"
    - "Format A migration: do_not_say flat array -> structured object with universal/pair_specific/practice_specific"
    - "Format B migration: nested content.* keys -> top-level canonical keys; archetype_id/name/product_pairs dropped"
    - "Universal do-not-say list (12 items) pre-populated in every pairing_fuel content JSONB"

key-files:
  created:
    - .planning/phases/12-combination-fuel-documents/SCHEMA_AUDIT.md
    - supabase/compile_sql/12-01-fuel-doc-schema-unification.sql
    - .planning/phases/12-combination-fuel-documents/12-01-SUMMARY.md
  modified: []

key-decisions:
  - "Live table is agent_fuel_documents (not gl_agent_fuel_documents) — all downstream SQL must use this name"
  - "JSON column is content (not agent_fuel_json) — all downstream SQL must use content, not agent_fuel_json"
  - "Status column is status (not review_status) — values: draft, active, archived"
  - "Zero pairing_fuel rows exist in live DB — SQL uses INSERT not UPDATE; 16 rows are net new"
  - "pair_key in content JSONB (e.g., botox_cosmetic__juvederm_vollure_xc) is the idempotency key for re-running"
  - "TypeScript type GLAgentFuelDocument in lib/types/data-sources.ts is stale — does not reflect live schema"
  - "Format A and Format B rows from PHASE_8 research never existed in live DB — their field mapping applies to any imported content from prior dev iterations"
  - "UPDATE blocks for Format A and Format B included as defensive migration for any rows that appear from prior imports"

patterns-established:
  - "Combination fuel doc pair_key: '{product_a_slug}__{product_b_slug}' — two underscores, alphabetical order"
  - "All 16 pairing_fuel rows start with status=draft and all content fields empty — Phase 12-02 writes enriched content"
  - "COALESCE(pl.field, gl.field) override pattern is ready: canonical template has all fields at top level of content JSONB"

requirements-completed: [COMBO-04, COMBO-05]

duration: 13min
completed: 2026-06-14
---

# Phase 12 Plan 01: Fuel Doc Schema Unification Summary

**Live schema audit revealed zero pairing_fuel rows in agent_fuel_documents (table name diverges from research docs); idempotent SQL created to INSERT 16 canonical combination fuel doc rows with 12 universal do-not-say items pre-populated**

## Performance

- **Duration:** ~13 min
- **Started:** 2026-06-14T16:34:27Z
- **Completed:** 2026-06-14T16:47:00Z
- **Tasks:** 3
- **Files modified:** 3 (2 created, 1 created)

## Accomplishments

- Live schema confirmed: table is `agent_fuel_documents`, JSON column is `content`, status column is `status` — all three diverge from what research docs documented
- Zero pairing_fuel rows exist in live DB; SQL migration pivoted from UPDATE to INSERT (no data to preserve)
- Canonical combination template (template_version 1.0) implemented as 16 idempotent INSERT statements covering 5 canonical + 11 of the 37 common pairs (first 16 target rows)
- All 12 universal do-not-say items from PHASE_8_COMBINATION_RESEARCH_SPEC.md pre-populated in every fuel doc
- Format A and Format B UPDATE blocks included as defensive migration for any rows arriving from prior dev iterations
- Live column names documented in SCHEMA_AUDIT.md for Phase 12-02 and 12-03 consumption

## Task Commits

Each task was committed atomically:

1. **Task 1: Audit live schema and inventory pairing_fuel rows** - `a60bdb5` (feat)
2. **Task 2: Write SQL migration for schema unification** - `e1dd3ea` (feat)
3. **Task 3: Write 12-01-SUMMARY.md** - (docs — this commit)

## Files Created/Modified

- `.planning/phases/12-combination-fuel-documents/SCHEMA_AUDIT.md` — Live schema snapshot: all 13 columns documented, zero pairing_fuel row inventory, Format A/B field mapping, live column names for downstream plans
- `supabase/compile_sql/12-01-fuel-doc-schema-unification.sql` — Idempotent SQL: 16 INSERT statements + 2 UPDATE blocks (Format A / Format B) + verification SELECT
- `.planning/phases/12-combination-fuel-documents/12-01-SUMMARY.md` — This file

## Live Column Names (Critical for Downstream Plans)

Phase 12-02 and 12-03 MUST use these names. Research docs used incorrect names.

| Purpose | Correct Column/Value | Incorrect (research docs) |
|---------|---------------------|--------------------------|
| Table name | `agent_fuel_documents` | `gl_agent_fuel_documents` |
| JSON payload column | `content` | `agent_fuel_json` |
| Status column | `status` | `review_status` |
| Status values | `'draft'`, `'active'`, `'archived'` | `'draft'`, `'in_review'`, `'approved'`, `'active'` |
| Type discriminator | `fuel_type` | `source_type` / `document_type` |
| Type value for pairings | `'pairing_fuel'` | same |
| Primary key | `id` (UUID) | same |
| Product link | `offering_id` (UUID FK) | `product_ids[]` |
| Pairing link | `item_relationship_id` (UUID FK) | `relationship_ids[]` |
| Idempotency key | `content->>'pair_key'` | (none documented) |
| No equivalent column | _(does not exist)_ | `product_name`, `source_type`, `metadata`, `audience[]`, `patient_safe`, `reviewed_by`, `last_reviewed` |

Note: `audience`, `patient_safe`, `last_reviewed`, `reviewed_by` from the canonical template exist **inside the content JSONB** (as `content->>'audience'`, etc.) — they are NOT table columns.

## SQL Idempotency Pattern

The `pair_key` in the content JSONB is the deduplication key:
```sql
WHERE NOT EXISTS (
  SELECT 1 FROM agent_fuel_documents
  WHERE fuel_type = 'pairing_fuel'
    AND content->>'pair_key' = 'botox_cosmetic__juvederm_vollure_xc'
);
```

Run the SQL multiple times safely. The UPDATE blocks for Format A and B additionally guard with `AND NOT (content ? 'template_version')` to skip already-migrated rows.

## Decisions Made

1. **SQL pivoted from UPDATE to INSERT** — Research docs described 16 existing pairing_fuel rows; live DB has zero. SQL uses INSERT WHERE NOT EXISTS rather than UPDATE.

2. **pair_key as idempotency key** — No unique constraint exists on `item_relationship_id` (it is NULL for all new rows until Phase 06 SQL executes). The `pair_key` inside the content JSONB provides a stable deduplication handle.

3. **Format A/B UPDATE blocks retained as defensive code** — Even though these rows don't exist now, prior dev iterations or manual imports could create them. The UPDATE blocks will correctly migrate any such rows if they appear.

4. **audience, patient_safe, last_reviewed, reviewed_by go inside content JSONB** — These fields are in the canonical template but do not exist as table columns. They are stored in the content JSONB so the template spec is fully honored without schema changes.

5. **item_relationship_id left NULL** — The FK to `item_relationships` cannot be populated until Phase 06 SQL executes and creates the relationship rows. Phase 12-02 or a later backfill step will wire these up.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Pivoted SQL from UPDATE to INSERT**
- **Found during:** Task 1 (Schema audit — REST API query returned COUNT: 0 for pairing_fuel rows)
- **Issue:** Plan spec assumed 16 existing pairing_fuel rows to UPDATE. Live DB has zero. Running UPDATE statements against zero rows would silently succeed without creating any rows.
- **Fix:** Replaced the planned UPDATE approach with 16 idempotent INSERT statements. Retained two UPDATE blocks as defensive migration for any pre-existing Format A/B rows.
- **Files modified:** `supabase/compile_sql/12-01-fuel-doc-schema-unification.sql`
- **Verification:** SQL file contains 16 INSERT statements + 2 UPDATE blocks + verification SELECT
- **Committed in:** `e1dd3ea` (Task 2 commit)

**2. [Rule 1 - Bug] Corrected table and column names throughout**
- **Found during:** Task 1 (REST API 404 hinted correct table name; first row query revealed correct column names)
- **Issue:** Research docs reference `gl_agent_fuel_documents`, `agent_fuel_json`, `review_status`. Live DB uses `agent_fuel_documents`, `content`, `status`.
- **Fix:** All SQL uses the correct live names. SCHEMA_AUDIT.md documents the full divergence map.
- **Files modified:** `SCHEMA_AUDIT.md`, `12-01-fuel-doc-schema-unification.sql`
- **Committed in:** `a60bdb5` (Task 1) and `e1dd3ea` (Task 2)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — live DB state diverged from research doc assumptions)
**Impact on plan:** Both auto-fixes necessary for correctness. Without them, the SQL would silently produce no rows and Phase 12-02 would have nothing to write content into. No scope creep.

## Issues Encountered

- Supabase anon key in `.env.local` (labeled `AGENT_SUPABASE_SERVICE_KEY`) does not have service-role permissions and cannot see tables in the schema cache via PostgREST `/rest/v1/gl_agent_fuel_documents`. The correct approach was querying the hint from the 404 error to discover the live table name, then using the REST API to query `agent_fuel_documents` directly.
- The TypeScript type `GLAgentFuelDocument` (in `lib/types/data-sources.ts`) is stale and defines `product_name`, `source_type`, `metadata` which do not exist in the live DB. This is a pre-existing issue, out of scope for Phase 12-01, logged in deferred items.

## Known Stubs

All 16 pairing_fuel rows inserted by this SQL have empty/null content fields:
- `patient_facing_name`, `one_line_positioning`, `package_goal` — empty strings
- `ideal_candidate`, `not_ideal_candidate` — empty strings
- `why_together`, `A_solves`, `A_does_not_solve`, `B_adds`, `clinical_rationale` — empty strings
- `patient_education_summary`, `staff_close`, `staff_talking_points` — empty strings
- `top_objections`, `concern_tags` — empty arrays
- `sequencing_note`, `timing_note`, `downtime_note` — empty strings
- `maintenance_story`, `rebooking_trigger`, `next_visit_prompt` — empty strings
- `source_support_summary`, `evidence_level` — empty strings

**This is intentional.** Phase 12-01 is schema unification only. Phase 12-02 writes corpus-grounded content into these fields. The stubs are the scaffolding that Phase 12-02 fills.

## Next Phase Readiness

- **Phase 12-02 is unblocked** — all table/column names are confirmed, canonical JSON structure is finalized
- **SQL execution required first** — Chris must approve and execute `12-01-fuel-doc-schema-unification.sql` against `aejskvmpembryunnbgrk` before 12-02 can write content into live rows
- **Blocker note:** `item_relationship_id` FK is NULL in all 16 rows until Phase 06 SQL executes; Phase 12-02 can still write content into the rows via `content->>'pair_key'` targeting
- **TypeScript type GLAgentFuelDocument** (lib/types/data-sources.ts) is stale — downstream phases that use this type should update it; flagged as deferred item, not blocking Phase 12-02

---
*Phase: 12-combination-fuel-documents*
*Completed: 2026-06-14*
