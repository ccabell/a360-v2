---
phase: 07-timing-rules
plan: "01"
subsystem: database-schema
tags: [timing-rules, schema-migration, gl_products, item_relationships, cadence, downtime]
dependency_graph:
  requires: [06-02]
  provides: [timing-columns-schema, product-cadence-data]
  affects: [gl_products, item_relationships]
tech_stack:
  added: []
  patterns: [ADD COLUMN IF NOT EXISTS, COMMENT ON COLUMN, CHECK constraint via DO block]
key_files:
  created:
    - supabase/migrations/20260613_timing_columns.sql
    - supabase/compile_sql/07-01-timing-schema.sql
    - supabase/compile_sql/07-02-product-cadence.sql
  modified: []
decisions:
  - "22 nullable columns added across 2 tables — no existing data affected"
  - "same_session_ok uses ADD COLUMN IF NOT EXISTS for Phase 6 coexistence"
  - "timing_warning_level CHECK constraint added via DO block (idempotent)"
  - "18 manifest products populated; 2 GLP-1 skipped per Phase 2 decision"
  - "BoNT-A 85-day minimum retreatment floor sourced from PubMed HIGH (Monheit 2009)"
metrics:
  duration_seconds: 209
  completed_date: "2026-06-13"
  tasks_completed: 2
  files_created: 3
  files_modified: 0
---

# Phase 07 Plan 01: Timing Rules Schema and Product Cadence — Summary

## One-Liner

22-column schema migration across gl_products (cadence/downtime) and item_relationships (same-session/staging/safety), plus cadence UPDATE data for all 18 manifest products with 85-day BoNT-A retreatment safety floor.

## What Was Built

### Task 1: Schema Migration (22 timing columns)

Two identical SQL files (one for Supabase migrations/, one for compile_sql/) adding:

**gl_products — 11 columns:**
- `initial_series_count` — number of sessions in initial series
- `initial_interval_days_min/max` — days between initial series sessions
- `maintenance_interval_days_min/max` — days between maintenance sessions
- `minimum_retreatment_days` — safety floor: minimum days before retreatment
- `typical_followup_days` — standard follow-up appointment timing
- `downtime_days_min/max` — structured recovery range
- `downtime_description` — human-readable downtime with restrictions
- `cadence_notes` — area-specific exceptions and dose-response notes

**item_relationships — 11 columns:**
- `same_session_ok` — pair-level same-session compatibility flag
- `same_session_rationale` — clinical rationale for compatibility/restriction
- `staging_required` — whether treatment order matters for this pair
- `staging_sequence` — which product goes first
- `staging_interval_days_min/max` — days between staged treatments
- `staging_rationale` — why staging matters
- `combined_downtime_note` — combined downtime when both done same session
- `safety_critical` — hard stop or strong warning flag
- `timing_warning_level` — enforcement tier (hard_block/warning/education)
- `timing_notes` — freeform notes including expert vs evidence tensions

All 22 columns: nullable, `ADD COLUMN IF NOT EXISTS`, with `COMMENT ON COLUMN` attribution.
CHECK constraint on `timing_warning_level` added via idempotent DO block.

### Task 2: Product Cadence Data (18 products)

UPDATE statements populating all 11 cadence/downtime fields per product, organized by category:

| Category | Products | Key timing pattern |
|---|---|---|
| Neurotoxins | Botox, Dysport, Xeomin, Daxxify, Jeuveau | min_retreatment=85 days, 0 downtime |
| HA Fillers | Voluma, Vollure, Skinvive, Lyft, RHA Redensity | min_retreatment=90 days, 1-3 day downtime |
| Biostimulators | Sculptra | series=3, interval=28-42 days, 2yr maintenance |
| Body Contouring | CoolSculpting, Kybella | Kybella: 3-7 day downtime, 3-session series |
| RF Devices | Morpheus8 | series=3, 28-84 day intervals |
| Ultrasound | Sofwave, Ultherapy PRIME | single treatment, annual maintenance |
| Laser | Hollywood Spectra | series=4, 21-28 day intervals |
| Skincare | HydraFacial Syndeo | no series, monthly maintenance |

Verification SELECT query appended for post-execution check.

## Commits

| Task | Commit | Files |
|---|---|---|
| Task 1: Schema migration | 5a232d1 | supabase/migrations/20260613_timing_columns.sql, supabase/compile_sql/07-01-timing-schema.sql |
| Task 2: Product cadence | 11871d6 | supabase/compile_sql/07-02-product-cadence.sql |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. All 18 products have full cadence data populated. Files are SQL-ready for execution.

## Self-Check: PASSED

- supabase/migrations/20260613_timing_columns.sql: 22 ADD COLUMN IF NOT EXISTS — FOUND
- supabase/compile_sql/07-01-timing-schema.sql: 22 ADD COLUMN IF NOT EXISTS — FOUND
- supabase/compile_sql/07-02-product-cadence.sql: 18 UPDATE gl_products SET — FOUND
- Commit 5a232d1 — FOUND
- Commit 11871d6 — FOUND
- All 5 neurotoxins have minimum_retreatment_days = 85 — VERIFIED
- No podcast attribution in SQL string values — VERIFIED
