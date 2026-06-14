# Phase 7: Timing Rules — Context (Locked Decisions)

**Phase:** 07-timing-rules
**Status:** Context locked, ready for planning
**Depends on:** Phase 2 (product intelligence), Phase 6 (pairing engine / item_relationships)
**Research source:** PHASE_7_TIMING_RESEARCH_SPEC.md (108 corpus searches across 4 agents, 630K+ chunks)

---

## Goal

Promote timing from prose to queryable data. Add product-level cadence/downtime fields to `gl_products` and pair-level timing/staging/safety fields to `item_relationships`. Populate for 20 products and ~30 canonical/common pairs. Human review gates safety-critical rules.

---

## Locked Decisions

### D-1: Default same-session posture = YES
Same-session combination is the default for all product pairs unless an explicit timing rule exists. Supported by PubMed RCT (BoNT-A + HA filler, n=90), expert consensus across podcast corpus, and ASDS 2024 conference themes. Exceptions documented as warnings or hard blocks.

### D-2: Exception model = WARNING with hard blocks for pharmacological conflicts
- **Hard block**: system-enforced (hyaluronidase+HA, fully ablative laser+isotretinoin, BoNT-A in pregnancy). ~3-4 rules.
- **Warning**: flagged with rationale, provider-override allowed. ~10-15 rules.
- **Education**: informational guidance, no enforcement. Soft preferences.

### D-3: Both product-level and pair-level timing
- Product-level: cadence, downtime, minimum retreatment (on `gl_products`)
- Pair-level: same-session, staging, sequencing, safety (on `item_relationships`)
- These are orthogonal; both needed. No new table.

### D-4: Full cadence profiles (not just minimums)
Fields: initial_series_count, initial_interval (min/max), maintenance_interval (min/max), minimum_retreatment_days, typical_followup_days, cadence_notes. Every source describes treatment arcs.

### D-5: One cadence per product + notes for area exceptions
Area-specific cadence (Botox glabella vs masseter) documented in cadence_notes. If blocking need arises, add product_area_config in Phase 9.

### D-6: Event-based timing deferred to Phase 9
Product-level cadence data captured now. Event timeline calculator logic (wedding backward planning) is care-plan territory.

### D-7: Sequencing = structured fields + prose
staging_required, staging_sequence, staging_interval_days (min/max), staging_rationale. Queryable for agents, readable for humans.

### D-8: One sequence per pair + notes
Concern-specific sequencing reversal not evidenced in corpus. If found later, add to staging_rationale or promote to Phase 9.

### D-9: Temperature layering in pair-level notes, not schema
Tracy Mancuso's framework is real but single-source. Capture in staging_rationale for energy device pairs. No thermal_tier product attribute.

### D-10: Downtime structured at product level + pair combined impact
Product: downtime_days_min, downtime_days_max, downtime_description. Pair: combined_downtime_note for canonical/common pairs. Default combined downtime = max(individual). PRP + laser special case: PRP reduces downtime.

### D-11: Safety contraindications in pair fields with safety_critical flag
No separate timing_contraindications table. safety_critical boolean + timing_warning_level enum (hard_block/warning/education) on item_relationships. ~8-10 hard stops fit in pair-level representation.

### D-12: Hybrid safety floor
Evidence-based hard stops (PubMed/FDA-backed, system-enforced) + expert-consensus soft warnings (practice-based, provider-override allowed). Where expert practice is more aggressive than published evidence, document the tension — don't suppress expert practice.

### D-13: No new table — extend gl_products + item_relationships
11 product-level fields + 11 pair-level fields. All nullable. No existing data affected. v2_treatment_timing can be populated from these via view/materialization.

### D-14: Full schema (22 fields, not minimal 11)
The full set covers agent query needs and reduces Phase 9/10 rework. Data-entry work is manageable for 20 products + 30 pairs.

### D-15: Deliverables = SQL + docs + review file
- Schema migration SQL
- Product cadence UPDATE SQL
- Pair timing UPDATE SQL
- TIMING_EVALUATION.md (full inventory)
- TIMING_REVIEW.md (safety-critical items for Chris)
- No visual timelines (Phase 9), no fuel packets (Phase 10)

### D-16: Timing does NOT feed Research/Evidence tab directly
Timing enters agent retrieval through Phase 10 fuel compilation. Phase 7 is data layer only.

---

## Schema Plan

### gl_products — 11 new columns
```sql
initial_series_count          INTEGER
initial_interval_days_min     INTEGER
initial_interval_days_max     INTEGER
maintenance_interval_days_min INTEGER
maintenance_interval_days_max INTEGER
minimum_retreatment_days      INTEGER
typical_followup_days         INTEGER
downtime_days_min             INTEGER
downtime_days_max             INTEGER
downtime_description          TEXT
cadence_notes                 TEXT
```

### item_relationships — 11 new columns
```sql
same_session_ok               BOOLEAN
same_session_rationale        TEXT
staging_required              BOOLEAN DEFAULT false
staging_sequence              TEXT      -- 'product_a_first' | 'product_b_first'
staging_interval_days_min     INTEGER
staging_interval_days_max     INTEGER
staging_rationale             TEXT
combined_downtime_note        TEXT
safety_critical               BOOLEAN DEFAULT false
timing_warning_level          TEXT      -- 'hard_block' | 'warning' | 'education'
timing_notes                  TEXT
```

**Note:** `same_session_ok` may already exist on `item_relationships` from Phase 6. Migration must use `ADD COLUMN IF NOT EXISTS`.

---

## Scope

### In scope
- Schema migration (22 columns across 2 tables)
- Product cadence data for ~20 GL products (from Cadence Matrix in research spec)
- Pair timing data for ~30 canonical/common pairs (from Phase 6 item_relationships)
- Downtime data for ~16 product categories
- Safety-critical flagging for ~8-10 hard stops
- Sequencing rules for ~10 pair-specific sequences
- Evaluation and review documentation

### Out of scope
- Event-based timeline calculator (Phase 9)
- Area-specific cadence table (Phase 9)
- Thermal tier product attribute (insufficient evidence)
- Regional legal restrictions in schema (separate feature)
- Agent fuel compilation (Phase 10)
- Visual timeline templates (Phase 9)
- Research/Evidence tab wiring (Phase 10)

---

## Data Sources

All timing data sourced from PHASE_7_TIMING_RESEARCH_SPEC.md, which synthesized:
- 202K podcast chunks (31 shows, 8,688 episodes)
- 148K YouTube chunks (3,984 videos)
- 37K PubMed chunks (23,581 articles)
- 87K industry article chunks (~750 articles)

Evidence levels: HIGH (RCT/meta-analysis), MODERATE (prospective/case series), LOW (case report/expert opinion). Expert-practice intelligence classified separately from clinical evidence.

---

## Chris Review Items

These items from the research spec need Chris input. **For planning purposes, recommended answers are used as defaults.** Chris can override during TIMING_REVIEW.md review.

1. Default same-session = YES (D-1) — business/liability decision
2. 50-unit toxin threshold — warning vs. too conservative for practitioner audience
3. France filler+toxin prohibition — out of scope for Phase 7 (recommended)
4. Downtime framing — both conservative published + real-world expert numbers
5. Filler + laser same-day — YES with education note about disagreement
6. Body contouring pairs — include with evidence level noted (thin but sufficient)
7. Full schema selected (D-14) — 22 fields

---

## Content Attribution Rules

Per project rules:
- Use corpus intelligence but attribute as "expert consensus" or "clinical practice data"
- Never reference podcast sources in SQL, dossiers, agent fuel, or evidence trails
- PubMed citations acceptable in evidence fields
- Expert quotes used for internal evaluation only (TIMING_EVALUATION.md), not in DB content

---

*Context locked: 2026-06-13*
*Research source: PHASE_7_TIMING_RESEARCH_SPEC.md*
