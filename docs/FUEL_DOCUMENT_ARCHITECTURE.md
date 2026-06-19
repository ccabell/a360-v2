# Fuel Document Architecture — Complete Reference

This document describes everything about the fuel doc system: what it is, how it works, every template, every field, and how data flows from creation through to agent consumption.

---

## 1. What Fuel Documents Are

Fuel documents are **curated intelligence packages** that agents consume at runtime. They're the "knowledge" layer between raw sources (PubMed, FDA labels, manufacturer data) and agent outputs.

Three types exist today:

| Type | DB fuel_type | Purpose | Example |
|---|---|---|---|
| **Combination** | `pairing_fuel` | Why two products work together, how to present them | Botox + Vollure |
| **Product** | `product_fuel` | Single product intelligence for agents and staff | Botox Cosmetic |
| **Concern** | `category_fuel` | Patient concern → treatment arc mapping | Volume Loss |

Future types defined in the DB enum but not yet used: `comparison_fuel`, `education_fuel`, `reach_fuel`, `enablement_fuel`.

---

## 2. Three-Layer Model

```
TEMPLATES (A360 defines)
  Structure per doc type — what fields exist, how they're grouped
      ↓
GLOBAL DEFAULTS (gl — agent_fuel_documents)
  Best-practice content — A360's recommended intelligence
      ↓
PRACTICE OVERRIDES (pl — pl_agent_fuel_documents)
  Practice-specific edits — custom talking points, SOPs, pricing
```

**Resolution at runtime:** `COALESCE(practice_field, global_field)` — practice wins when present, otherwise global default applies.

**Practice-level adds two extra sections** not present at the global level:
- **SOPs**: pre_treatment_checklist, consent_requirements, post_treatment_instructions, follow_up_protocol, emergency_protocol, documentation_requirements
- **Preferences**: pricing_notes, preferred_brands, scheduling_notes, staff_assignment, room_requirements, inventory_notes

---

## 3. Database Schema

**Table: `agent_fuel_documents`** (Supabase project: `aejskvmpembryunnbgrk` — Global V3)

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | Auto-generated |
| `offering_id` | UUID nullable | FK → products (for product_fuel) |
| `category_id` | UUID nullable | FK → categories (for category_fuel) |
| `item_relationship_id` | UUID nullable | FK → item_relationships (for pairing_fuel) |
| `fuel_type` | enum | `product_fuel`, `category_fuel`, `pairing_fuel`, `comparison_fuel`, `education_fuel`, `reach_fuel`, `enablement_fuel` |
| `content` | JSONB | **All intelligence lives here** — schema varies by fuel_type |
| `version` | smallint | Starts at 1 |
| `status` | enum | `draft`, `active`, `archived`, `corrected` |
| `approved_by` | text nullable | Set when status → active |
| `approved_at` | timestamptz nullable | Set when status → active |
| `practice_id` | UUID nullable | NULL = global; set = practice-specific |
| `created_at` | timestamptz | Auto |
| `updated_at` | timestamptz | Auto |

**Constraints:**
- `chk_fuel_has_target`: At least one of `offering_id`, `category_id`, or `item_relationship_id` must be non-null
- `chk_fuel_approved`: `status = 'active'` requires `approved_by` AND `approved_at` to be set

**Current inventory (42 rows):**
- 37 `pairing_fuel` — the combination fuel docs (all `status: draft`)
- 3 `category_fuel` — Neurotoxins, Dermal Fillers, Energy-Based (2 active, 1 draft)
- 1 `product_fuel` — Botox Cosmetic (draft)
- 1 `category_fuel` — Neurotoxins v2 (draft)

---

## 4. Templates — Field-by-Field

### 4A. Combination Template (pairing_fuel)

Used for product pairings. 37 docs exist in this format.

**Identity & Positioning**

| Field | Type | Purpose |
|---|---|---|
| `pair_key` | string | Unique key: `botox_cosmetic__juvederm_vollure_xc` |
| `patient_facing_name` | string | Marketing name: "Smooth & Restore" |
| `one_line_positioning` | string | Single sentence: what this combo does |
| `package_goal` | string | What the combination achieves for the patient |
| `ideal_candidate` | string | Who this is for |
| `not_ideal_candidate` | string | Who this is NOT for |
| `concern_tags` | string[] | Patient concerns this addresses |

**Clinical — Why Together**

| Field | Type | Purpose |
|---|---|---|
| `why_together` | string | Core mechanism: why these two products complement each other |
| `A_solves` | string | What Product A addresses |
| `A_does_not_solve` | string | What Product A cannot do (gap that B fills) |
| `B_adds` | string | What Product B contributes |
| `clinical_rationale` | string | Full clinical justification with evidence references |

**Staff Language — What to Say**

| Field | Type | Purpose |
|---|---|---|
| `patient_education_summary` | string | How to explain this to a patient in plain language |
| `staff_close` | string | How staff should present this combination |
| `staff_talking_points` | string | Key messages for the team |

**Guardrails — What NOT to Say**

| Field | Type | Purpose |
|---|---|---|
| `do_not_say.universal` | string[] | Applies to ALL fuel docs (e.g., "Never guarantee results") |
| `do_not_say.pair_specific` | string[] | Specific to THIS combination |
| `do_not_say.practice_specific` | string[] | Added by individual practices (empty at GL level) |

**Objection Handling**

| Field | Type | Purpose |
|---|---|---|
| `top_objections` | array | Each item has: |
| `.objection_type` | string | Category: cost, do_i_need_both, fear_of_overdone, downtime |
| `.patient_says` | string | What the patient actually says |
| `.handling_language` | string | Recommended response |
| `.do_not_say_in_response` | string | What NOT to say when handling this objection |

**Timing & Sequencing**

| Field | Type | Purpose |
|---|---|---|
| `sequencing_note` | string | Which product goes first and why |
| `timing_note` | string | Same session vs. sequential visits |
| `downtime_note` | string | Recovery expectations for combined treatment |
| `same_session_ok` | boolean/null | Can both be done in one visit? |

**Maintenance & Rebooking**

| Field | Type | Purpose |
|---|---|---|
| `maintenance_story` | string | Long-term maintenance cadence |
| `rebooking_trigger` | string | When to suggest the next visit |
| `next_visit_prompt` | string | What to say at checkout / follow-up |

**Evidence**

| Field | Type | Purpose |
|---|---|---|
| `source_support_summary` | string | Citations: PubMed DOIs, FDA labels, expert consensus |
| `evidence_level` | string | `strong` / `moderate` / `weak` / `emerging` |

**Metadata (in content JSON)**

| Field | Type | Purpose |
|---|---|---|
| `fuel_type` | string | "combination" |
| `template_version` | string | "1.0" |
| `review_status` | string | Tracks content review state |
| `audience` | string[] | ["agent", "staff"] |
| `patient_safe` | boolean | Can this content be shown to patients? |
| `last_reviewed` | string/null | ISO date |
| `reviewed_by` | string/null | Who approved |

---

### 4B. Product Template (product_fuel)

Used for individual product intelligence. 1 doc exists (Botox Cosmetic).

| Field | Type | Purpose |
|---|---|---|
| `product_name` | string | Display name |
| `category` | string | Product category (neurotoxin, filler, etc.) |
| `mechanism_summary` | string | How it works (clinical) |
| `patient_explanation` | string | How it works (patient-friendly) |
| `fda_indications` | string[] | FDA-approved uses |
| `off_label_common` | string[] | Common off-label uses |
| `contraindications` | string[] | Who should NOT receive this |
| `does_not_solve` | string | What this product cannot address |
| `key_talking_points` | string[] | Top messages for staff |
| `patient_faq` | array | Each: `{question, answer}` |
| `differentiators` | string | What makes this product unique |
| `do_not_say` | string[] | Language guardrails |
| `do_not_claim` | string[] | Claims to avoid |
| `treatment_cadence` | string | How often / maintenance schedule |
| `onset_time` | string | When results appear |
| `duration` | string | How long results last |
| `downtime_summary` | string | Recovery expectations |
| `source_support_summary` | string | Evidence citations |
| `evidence_level` | string | strong/moderate/weak |

---

### 4C. Concern Template (category_fuel)

Used for patient concern → treatment mapping. 3 category-level docs exist (Neurotoxins, Dermal Fillers, Energy-Based).

| Field | Type | Purpose |
|---|---|---|
| `concern_name` | string | Display name |
| `concern_cluster_id` | string/null | FK to concern cluster (if grouped) |
| `patient_language` | string[] | How patients describe this concern |
| `underlying_cause` | string | What's actually happening anatomically |
| `patient_explanation` | string | How to explain it simply |
| `what_helps` | string[] | Treatment categories that address it |
| `what_does_not_help` | string[] | What won't work and why |
| `treatment_sequence` | string | Typical progression (foundation → corrective → maintenance) |
| `expected_timeline` | string | Realistic timeframes |
| `realistic_expectations` | string | What to tell patients about outcomes |
| `consultation_language` | string | How staff should discuss this |
| `staff_talking_points` | string[] | Key messages for the team |
| `do_not_say` | string[] | Language guardrails |
| `do_not_promise` | string[] | Outcome boundaries |
| `source_support_summary` | string | Evidence citations |
| `evidence_level` | string | strong/moderate/weak |

---

## 5. How Fuel Docs Are Created and Used

### Creation Pipeline (Enrichment Loop)

```
1. ADD SOURCE → new IFU, PubMed paper, YouTube video, etc.
2. CLASSIFY → type, layer, authority scope per SOURCE_CLASSIFICATION.md
3. CHUNK → break into citable units with metadata
4. VECTOR DB → embed into appropriate RPC collection
5. MARK STALE → flag affected fuel docs for review/regeneration
```

### Content Population

Fuel docs are populated from **production-citable sources only**:
- FDA labels → safety, dosing, indications
- PubMed → clinical evidence, mechanisms
- Manufacturer data → product education, technique
- Expert consensus → accepted practice (no attribution)

**Podcasts are research-only** — used to discover ideas, but never cited in production fields.

### Agent Consumption (Runtime)

```
Agent receives patient context
  → Looks up relevant fuel docs by offering_id / category_id / item_relationship_id
  → Gets COALESCE-resolved content (practice overrides win over global)
  → Uses fuel doc content to ground its response
  → For edge cases beyond fuel coverage, agent tools search vector DBs directly
```

### Review & Approval

```
Draft → Chris reviews in Fuel Library UI → Approve → Active (agents can consume)
                                         → Reject → stays Draft, needs revision
```

The `chk_fuel_approved` constraint ensures `approved_by` and `approved_at` are set before a doc can go active.

---

## 6. UI Access

**Fuel Library**: `/dashboard/fuel-library`
- List all fuel docs with type/status filters
- Click into detail view with tabbed editor
- Approve / Reject buttons per doc
- Bulk select + approve/reject
- Import Batches button (loads from REVIEW_QUEUE files)

**Detail tabs** (combination docs):
- Clinical — Why together, Product A/B side-by-side, clinical rationale
- What to Say — Patient education, staff close, talking points
- Guardrails — Pair-specific (red), universal (amber), practice-specific (gray)
- Objections — Patient says / response / do-not-say cards
- Timing — Same-session indicator, sequencing, downtime, maintenance
- Identity — Patient-facing name, positioning, concern tags, audience
- Metadata — Version, status, approval info, dates
- JSON — Raw content viewer

---

## 7. What Exists in the DB Today

| fuel_type | Count | Status | Content Quality |
|---|---|---|---|
| `pairing_fuel` | 37 | All draft | **Rejected by Chris** — needs manual rework |
| `category_fuel` | 3 active + 1 draft | Mixed | Legacy seed data — may need restructuring |
| `product_fuel` | 1 | Draft | Botox Cosmetic — decent starting point |

---

## 8. Roadmap Requirements

**COMBO-01**: Every canonical/common pairing has enriched fuel doc with corpus-grounded content
**COMBO-02**: Content sounds like what trained staff would say — education tone, not sales pitch
**COMBO-03**: What-not-to-say populated for every combination
**CARE-01**: 10 concern clusters each have a fuel doc with treatment arc
**CARE-02**: Treatment arcs grounded in corpus evidence, not LLM-invented
**CARE-03**: Documents reference combination fuel where applicable
**CARE-04**: In-scope and out-of-scope treatment boundaries defined per concern
**FUEL-01**: Every enriched entity has a versioned fuel packet
**FUEL-02**: Single-packet retrieval pattern
**FUEL-03**: Recompile triggers defined
**FUEL-04**: All packets within 2-5K token budget
**FUEL-05**: Framework allows recompilation as new data enters

---

*Generated: 2026-06-15*
*Source: lib/types/fuel-docs.ts, lib/api/fuel-docs.ts, lib/fuel-docs/sample-templates.ts, lib/fuel-docs/seed-data.ts, .planning/phases/*/RESEARCH.md, .planning/ROADMAP.md*
