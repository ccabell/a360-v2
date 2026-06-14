# Phase 7: Timing Rules — Chris Review

**Date:** 2026-06-13
**Status:** Awaiting Chris review
**SQL ready:** 07-02-product-cadence.sql, 07-03-pair-timing.sql, 07-01-timing-schema.sql

---

## How to Use This Document

Review each item below. The **recommended default is already implemented in SQL** — the files are ready to execute as-is. For each item, mark your decision:

- **[ ] APPROVED** — Keep the default implementation. No SQL change needed.
- **[ ] OVERRIDE: ___** — Specify the change. SQL will be updated accordingly.

After review, execute:
1. `supabase/migrations/20260613_timing_columns.sql` (schema — already run if Phase 7 Plan 01 is complete)
2. `supabase/compile_sql/07-02-product-cadence.sql` (product cadence data)
3. `supabase/compile_sql/07-03-pair-timing.sql` (pair timing data — re-run after Phase 6 completes)

---

## Safety-Critical Review Items

### 1. Default same-session posture = YES (D-1)

**Current implementation:** `same_session_ok` defaults to YES (NULL) when no explicit rule exists. The system asserts same-session safety only for pairs with an explicit positive rule (same_session_ok = true) or explicit exception (same_session_ok = false).

**Evidence basis:** PubMed RCT (BoNT-A + HA filler, n=90, Carruthers et al. 2010, HIGH evidence). Multiple expert discussions confirm same-session stacking as standard practice. ASDS 2024 conference featured "stacking" as a major theme.

**Business/liability consideration:** Default YES is commercially aligned and evidence-supported. If A360 wants to require explicit approval per pair before recommending same-session use, this would require building out the remaining ~124 pair rows with same_session_ok values, significantly increasing data-entry scope.

**Risk:** Liability decision. Medical aesthetics providers are licensed professionals — framing this as informational guidance (not prescriptive recommendation) aligns with the gateway posture.

**Decision needed:**
- [ ] APPROVED — Keep default YES (same-session unless explicitly flagged)
- [ ] OVERRIDE: Default NO (require explicit evidence for each pair before YES) — Note: This would block ~124 pairs from same-session recommendations until individually assessed

---

### 2. >50 units neurotoxin per session warning (D-12)

**Current implementation:** Documented as warning in `cadence_notes` on all 5 neurotoxin products. NOT a pair-level restriction. NOT a hard block. Text: ">50 units per session: warning for antibody risk (published evidence)."

**Evidence basis:** Published study (clinical practice data — Dr. Wanitphakdeedecha with PubMed citation; Bellows & Jankovic 2019 antibody meta-analysis). Published evidence shows increased antibody formation risk above 50U threshold.

**Conflict:** Many practitioners routinely inject 80-100+ units (full face: glabella + forehead + crow's feet + micro-toxin + platysma). A system warning at >50U would flag the majority of real-world treatments.

**Current classification:** Warning (not hard block) — provider can proceed with rationale.

**Decision needed:**
- [ ] APPROVED — Keep as warning in cadence_notes. Not a system-enforced block.
- [ ] OVERRIDE: Remove warning entirely (too conservative for practitioner audience)
- [ ] OVERRIDE: Elevate to timing_warning_level = 'warning' in pair-level fields (would require new pair structure for same-product safety)
- [ ] OVERRIDE: Other: ___

---

### 3. France filler + BoNT-A same-session prohibition (D-2, regional scope)

**Current implementation:** NOT in schema. Documented in TIMING_EVALUATION.md as out of scope for Phase 7. Regional legal restrictions are a separate feature (configuration/settings layer, not product/pair schema).

**Evidence basis:** Legal prohibition in France (expert awareness, clinical practice data from international providers).

**Recommendation:** Out of scope for Phase 7. If A360 serves French practices or other restricted jurisdictions, regional configuration flags should be added as a separate feature in a future phase.

**Decision needed:**
- [ ] APPROVED — Out of scope for Phase 7. Regional config is a separate feature.
- [ ] OVERRIDE: Add regional_legal_restriction flag to item_relationships schema for Phase 7 documentation
- [ ] OVERRIDE: Add regional configuration layer to Phase 9 (care plans) scope instead

---

### 4. Downtime framing — conservative (PubMed) vs. real-world (expert practice)

**Current implementation:** Both numbers captured. `downtime_days_min/max` uses published ranges (conservative). `downtime_description` includes real-world context ("social downtime" ranges that providers use with patients).

**Example (CO2 fractionated laser — NOT in 18-product manifest):**
- PubMed: 7-10 days
- Expert practice with exosome co-treatment: 5 days
- Current capture: min/max from PubMed, description adds real-world context

**For products in the manifest (e.g., Morpheus8):**
- PubMed MODERATE: 1-5 days (redness/mild swelling)
- Expert practice: "redness 24-48 hours, back to normal 2-3 days"
- Current: downtime_days_min=1, max=5, description includes "redness/mild sunburn appearance 24-48 hours"

**Decision needed:**
- [ ] APPROVED — Keep both numbers. Published range in min/max; real-world context in description.
- [ ] OVERRIDE: Use only conservative (PubMed) numbers in all fields
- [ ] OVERRIDE: Use only real-world (expert practice) numbers

---

### 5. Filler + laser/RF same-day classification (D-12)

**Current implementation:** `same_session_ok = true` with `timing_warning_level = 'education'` on Morpheus8 + HA Filler pairs. The education note captures the expert disagreement without blocking the combination.

**Expert evidence (pro):** HA filler is heat-sterilized at 120°C during manufacturing; Morpheus8 RF generates 40-45°C tissue temperature — insufficient to melt or degrade HA. NEO laser used same day with fillers confirmed by YouTube expert. "You can also use NEO laser on the same day with your fillers and toxins."

**Conservative guidance (against):** Some providers recommend waiting 1-2 weeks. "We ask you to wait about two weeks after the dermal filler and Botox before you get the laser treatment." — YouTube provider (piGJalyVeXk).

**PubMed:** No published evidence of harm with same-session filler + RF/laser. Also no definitive large-sample same-day safety study.

**Decision needed:**
- [ ] APPROVED — YES with education note about expert disagreement. Providers can use clinical judgment.
- [ ] OVERRIDE: Change to CONDITIONAL (same_session_ok = NULL, staging note explains the conditions and provider preference options)
- [ ] OVERRIDE: Change to NO with 14-day staging interval (conservative — requires staging_required = true, staging_interval_days_min = 14 on all filler + energy pairs)

---

### 6. Body contouring pairs — limited evidence

**Current implementation:** CoolSculpting + Kybella pair included with `safety_critical = true` and `timing_warning_level = 'warning'`. Warning explains that same-area same-session has limited clinical evidence; different anatomical areas are safe same-session. Product-level cadence data is complete for both products.

**Evidence basis:** Limited PubMed coverage for combining body contouring modalities. Expert practice data available but thin relative to face treatment combinations.

**Risk:** Including with evidence level noted is the conservative choice. Deferring means no timing guidance for body contouring combinations.

**Decision needed:**
- [ ] APPROVED — Include CoolSculpting + Kybella with warning as implemented. Document thin evidence clearly.
- [ ] OVERRIDE: Defer body contouring pairs to a future phase when evidence matures
- [ ] OVERRIDE: Include but change warning level to 'education' only (less restrictive)

---

### 7. Full 22-field schema vs. minimal 11-field schema (D-14)

**Current implementation:** All 22 fields added. All nullable. No existing data affected. Phase 7 Plan 01 schema migration is complete.

**Full schema (22 fields):**
- gl_products: 11 fields (initial_series_count, initial_interval_days_min/max, maintenance_interval_days_min/max, minimum_retreatment_days, typical_followup_days, downtime_days_min/max, downtime_description, cadence_notes)
- item_relationships: 11 fields (same_session_ok, same_session_rationale, staging_required, staging_sequence, staging_interval_days_min/max, staging_rationale, combined_downtime_note, safety_critical, timing_warning_level, timing_notes)

**Minimal schema (11 fields):** same_session_ok, same_session_rationale, safety_critical, timing_warning_level, timing_notes on item_relationships. minimum_retreatment_days, maintenance_interval_days_min/max, downtime_days_min/max, cadence_notes on gl_products.

**Note:** The schema is already deployed (Phase 7 Plan 01). This review item is about data population scope — whether to populate all fields or only the minimal subset. The SQL currently populates the full field set where data is available.

**Decision needed:**
- [ ] APPROVED — Full 22-field data population as implemented. More fields = more agent query capability.
- [ ] OVERRIDE: Populate only the minimal 11 fields now. Mark remaining fields for Phase 10 population.

---

## Pair-Specific Safety Review

### Rejuran + Cross-Linked HA Filler

**Rule:** Do not inject Rejuran (PDRN/salmon DNA) where cross-linked filler exists in the same tissue plane.

**Status:** NOT in schema. Rejuran is NOT in the 18-product manifest. Documented in TIMING_EVALUATION.md as an out-of-manifest rule.

**Source:** Expert guidance (clinical practice, aesthetic medicine community). Rule is: Rejuran in same plane as cross-linked filler = avoid. Different planes = safe.

**Recommendation:** Document only. If Rejuran is added to the product manifest in a future phase, this pair rule would need item_relationships rows with safety_critical=true, timing_warning_level='warning', same_session_ok=false (or conditional with plane documentation).

**Decision needed:**
- [ ] APPROVED — Document only. Add to manifest + pair rule if Rejuran added in future.
- [ ] OVERRIDE: Add Rejuran to manifest now and create the pair row
- [ ] OVERRIDE: ___

---

### France Legal Restriction — Filler + BoNT-A Same Session

**Rule:** Same-session administration of dermal filler + botulinum toxin is legally prohibited in France.

**Status:** NOT in schema. Regional legal restriction. Documented in TIMING_EVALUATION.md.

**Scope consideration:** A360 currently serves US-based medical aesthetic practices. France-jurisdiction practices are not in the current scope. If A360 expands internationally, jurisdiction-specific restrictions would need a configuration layer separate from the product timing schema.

**Recommendation:** Out of scope for Phase 7. Regional legal config = separate feature in future roadmap.

**Decision needed:**
- [ ] APPROVED — Out of scope. Track as future international expansion requirement.
- [ ] OVERRIDE: Add regional flag to schema now (even if unpopulated) to future-proof
- [ ] OVERRIDE: ___

---

### Morpheus8 + HydraFacial — Same-Session Contraindication

**Rule:** NOT safe same-session. Morpheus8 RF microneedling creates open micro-channels; HydraFacial mechanical suction and exfoliation through open channels = infection/irritation risk.

**Status:** IN SCHEMA. Set in 07-03-pair-timing.sql:
- `same_session_ok = false`
- `safety_critical = true`
- `timing_warning_level = 'warning'`
- Staging: HydraFacial first (14-30 days before Morpheus8) OR HydraFacial 14-30 days after Morpheus8 healing.

**Evidence basis:** Expert consensus across clinical practice. No specific PubMed study found — the risk is mechanistic (open channels + suction = infection pathway).

**Note:** This is the only explicit `same_session_ok = false` pair in the current manifest pairs.

**Decision needed:**
- [ ] APPROVED — Keep as warning with same_session_ok=false and 14-30 day staging guidance.
- [ ] OVERRIDE: Elevate to hard_block (system-enforced, provider cannot override)
- [ ] OVERRIDE: Reduce to education only (provider can make own judgment)

---

## Execution Checklist

After completing review decisions above:

- [ ] SQL files reviewed and approved for execution
- [ ] supabase/migrations/20260613_timing_columns.sql — run first (schema)
- [ ] supabase/compile_sql/07-02-product-cadence.sql — run second (product data)
- [ ] supabase/compile_sql/07-03-pair-timing.sql — run third, and **re-run after Phase 6 Plans 02-05 complete** (pair data)
- [ ] Run verification SELECT at end of 07-03-pair-timing.sql and confirm counts
- [ ] Deferred: Agent fuel compilation (Phase 10) will convert timing data to agent-loadable format

---

*Prepared: 2026-06-13 | Phase 07 Plan 02 | Attribution: clinical evidence from PubMed; expert-practice intelligence from industry expert consensus*
