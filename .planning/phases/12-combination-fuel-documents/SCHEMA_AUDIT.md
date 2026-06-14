# Schema Audit — Phase 12-01
## gl_agent_fuel_documents / agent_fuel_documents

**Audited:** 2026-06-14
**Supabase project:** `aejskvmpembryunnbgrk`
**Auditor:** Phase 12-01 executor

---

## Critical Finding: Table Name Divergence

Research docs and TypeScript types reference `gl_agent_fuel_documents`. The live DB table is **`agent_fuel_documents`** (no `gl_` prefix). This was confirmed via:
- REST API 404 on `gl_agent_fuel_documents` with hint: "Perhaps you meant 'public.agent_fuel_documents'"
- Successful query against `agent_fuel_documents` returning 5 rows

**Downstream impact:** All SQL in Phase 12 must use `agent_fuel_documents`, not `gl_agent_fuel_documents`.

---

## Live Schema

**Table:** `public.agent_fuel_documents`
**Confirmed via:** Direct REST API query returning live rows

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `id` | UUID | NOT NULL | Primary key (gen_random_uuid()) |
| `offering_id` | UUID | YES | FK to gl_offerings/products table. Populated for product_fuel rows. |
| `category_id` | UUID | YES | FK to gl_categories table. Populated for category_fuel rows. |
| `item_relationship_id` | UUID | YES | FK to item_relationships. Target for pairing_fuel rows. |
| `fuel_type` | TEXT | NOT NULL | Discriminator: 'category_fuel', 'product_fuel', 'pairing_fuel' |
| `content` | JSONB | YES | The fuel doc payload (canonical JSON content) |
| `version` | INTEGER | YES | Version number (1, 2, ...) |
| `status` | TEXT | NOT NULL | 'draft', 'active', 'archived' |
| `approved_by` | TEXT | YES | Who approved (e.g., 'system_seed') |
| `approved_at` | TIMESTAMPTZ | YES | Approval timestamp |
| `practice_id` | UUID | YES | NULL for GL-level docs; set for practice overrides |
| `created_at` | TIMESTAMPTZ | NOT NULL | Auto-set |
| `updated_at` | TIMESTAMPTZ | NOT NULL | Auto-set |

**Total rows in live DB:** 5 (4 category_fuel, 1 product_fuel, 0 pairing_fuel)

---

## Schema Divergence: Research Docs vs Live DB

### Columns that DO NOT exist in live DB (from research docs/TypeScript types)

| Column Referenced In | Column Name | Live Status |
|---------------------|-------------|-------------|
| TypeScript `GLAgentFuelDocument` | `product_name` | DOES NOT EXIST |
| TypeScript `GLAgentFuelDocument` | `source_type` | DOES NOT EXIST |
| TypeScript `GLAgentFuelDocument` | `metadata` | DOES NOT EXIST |
| PHASE_8 research spec | `agent_fuel_json` | DOES NOT EXIST (column is `content`) |
| PHASE_8 research spec | `review_status` | DOES NOT EXIST (column is `status`) |
| PHASE_8 research spec | `product_ids[]` | DOES NOT EXIST |
| PHASE_8 research spec | `relationship_ids[]` | DOES NOT EXIST |
| PHASE_8 research spec | `audience[]` | DOES NOT EXIST |
| PHASE_8 research spec | `patient_safe` | DOES NOT EXIST |

### Columns in live DB not in research docs/TypeScript types

| Column | Notes |
|--------|-------|
| `offering_id` | UUID FK — links to product (replaces `product_name` string) |
| `category_id` | UUID FK — links to category |
| `item_relationship_id` | UUID FK — links to pairing (replaces `relationship_ids[]`) |
| `version` | Integer version counter |
| `approved_by` | Approval author string |
| `approved_at` | Approval timestamp |

**Summary:** The TypeScript type `GLAgentFuelDocument` (in `lib/types/data-sources.ts`) is stale and does not reflect the live DB schema. The `audience[]` and `patient_safe` fields from PHASE_8 do not exist as table columns — they would live inside the `content` JSONB if needed.

---

## Pairing Fuel Row Inventory

**Critical finding: Zero pairing_fuel rows exist in the live DB.**

The 16 pairing_fuel rows described in PHASE_8_COMBINATION_RESEARCH_SPEC.md and FUEL_DOC_TEMPLATE_SPEC.md have **never been inserted** into the live database. They exist as conceptual artifacts from prior research, not as live DB rows.

**SQL manifest status (from EXECUTION_MANIFEST.json context):** All Phase 06 SQL files are flagged as not executed. The 16 rows expected to exist were described in the Phase 8 research spec based on an assumption that Phase 6 pairing SQL had been executed — it has not.

### Current Live Row Inventory

| # | id (short) | fuel_type | status | item_relationship_id |
|---|-----------|-----------|--------|---------------------|
| 1 | 15d6cd05 | category_fuel | active | null |
| 2 | 3b8a147f | category_fuel | active | null |
| 3 | 42026377 | category_fuel | active | null |
| 4 | a1428447 | category_fuel | draft | null |
| 5 | a7056785 | product_fuel | draft | null |

**No pairing_fuel rows exist.** The SQL migration in Phase 12-01 must INSERT new rows (not UPDATE existing ones).

---

## Format A and Format B — Recontext

Since no pairing_fuel rows exist in the live DB, Format A and Format B describe the formats referenced in PHASE_8_COMBINATION_RESEARCH_SPEC.md as two styles that existed in a prior version of the database or in a planning context. Both formats are documented here for completeness so the canonical SQL migration can reconcile them.

### Format A — Product-Pair Flat (6 docs, described in research)

Identified by top-level `patient_facing_name` key in content JSONB.

```json
{
  "patient_facing_name": "...",
  "one_line_positioning": "...",
  "staff_close": "...",
  "do_not_say": ["..."],
  "who_it_is_for": "...",
  "why_together": "...",
  "clinical_rationale": "...",
  "patient_education_summary": "...",
  "sequencing_note": "...",
  "timing_note": "..."
}
```

**Status:** Format A rows DO NOT exist in live DB. These were described in PHASE_8 research spec as 6 existing docs from a prior development iteration. Source: `FUEL_DOC_TEMPLATE_SPEC.md` and `PHASE_8_COMBINATION_RESEARCH_SPEC.md`.

### Format B — Archetype Nested (10 docs, described in research)

Identified by top-level `archetype_id` key in content JSONB.

```json
{
  "archetype_id": "neurotoxin_ha_filler",
  "archetype_name": "...",
  "content": {
    "clinical_rationale": "...",
    "patient_education": "...",
    "staff_talking_points": "..."
  },
  "product_pairs": [...]
}
```

**Status:** Format B rows DO NOT exist in live DB. These were described in PHASE_8 research spec as 10 existing docs. Source: `FUEL_DOC_TEMPLATE_SPEC.md`.

---

## Format Classification of 16 Target Rows

Since no pairing_fuel rows exist in the live DB, all 16 rows need to be INSERTed fresh in the canonical format. The 16 target pairs come from Phase 06 and Phase 10 work:

| # | Pair Name | Expected item_relationship_id | Format A or B classification |
|---|-----------|------------------------------|------------------------------|
| 1 | Botox Cosmetic + Juvederm Vollure XC | TBD (not yet in DB) | NEW INSERT — canonical format |
| 2 | Botox Cosmetic + Juvederm Voluma XC | TBD | NEW INSERT — canonical format |
| 3 | Botox Cosmetic + Restylane Lyft | TBD | NEW INSERT — canonical format |
| 4 | Botox Cosmetic + RHA Redensity | TBD | NEW INSERT — canonical format |
| 5 | Botox Cosmetic + Sculptra Aesthetic | TBD | NEW INSERT — canonical format |
| 6 | Botox Cosmetic + SKINVIVE by Juvederm | TBD | NEW INSERT — canonical format |
| 7 | Daxxify + Juvederm Vollure XC | TBD | NEW INSERT — canonical format |
| 8 | Daxxify + Juvederm Voluma XC | TBD | NEW INSERT — canonical format |
| 9 | Daxxify + Restylane Lyft | TBD | NEW INSERT — canonical format |
| 10 | Daxxify + RHA Redensity | TBD | NEW INSERT — canonical format |
| 11 | Daxxify + SKINVIVE by Juvederm | TBD | NEW INSERT — canonical format |
| 12 | Dysport + Juvederm Vollure XC | TBD | NEW INSERT — canonical format |
| 13 | Dysport + Juvederm Voluma XC | TBD | NEW INSERT — canonical format |
| 14 | Dysport + Restylane Lyft | TBD | NEW INSERT — canonical format |
| 15 | Dysport + RHA Redensity | TBD | NEW INSERT — canonical format |
| 16 | Dysport + SKINVIVE by Juvederm | TBD | NEW INSERT — canonical format |

**Note:** The 16 target rows above are drawn from the REVIEW_QUEUE/pairings/ files that exist. The full 37-pair set (Phase 12 scope) includes additional pairs (Jeuveau, Xeomin, Sculptra combinations, Morpheus8 combinations). Phase 12-01 SQL covers the schema template; Phase 12-02 will write actual content for all 37 pairs.

---

## Field Mapping Table

### Format A Keys → Canonical Template Keys

| Format A Key | Canonical Template Key | Transformation |
|-------------|------------------------|----------------|
| `patient_facing_name` | `patient_facing_name` | Direct preserve |
| `one_line_positioning` | `one_line_positioning` | Direct preserve |
| `staff_close` | `staff_close` | Direct preserve |
| `do_not_say` (array) | `do_not_say.universal` | Promote array to `{"universal": [...], "pair_specific": [], "practice_specific": []}` |
| `who_it_is_for` | `ideal_candidate` | Rename |
| `why_together` | `why_together` | Direct preserve |
| `clinical_rationale` | `clinical_rationale` | Direct preserve |
| `patient_education_summary` | `patient_education_summary` | Direct preserve |
| `sequencing_note` | `sequencing_note` | Direct preserve |
| `timing_note` | `timing_note` | Direct preserve |
| _(missing)_ | `fuel_type` | Add: `"combination"` |
| _(missing)_ | `template_version` | Add: `"1.0"` |
| _(missing)_ | `package_goal` | Add: `""` |
| _(missing)_ | `not_ideal_candidate` | Add: `""` |
| _(missing)_ | `concern_tags` | Add: `[]` |
| _(missing)_ | `A_solves` | Add: `""` |
| _(missing)_ | `A_does_not_solve` | Add: `""` |
| _(missing)_ | `B_adds` | Add: `""` |
| _(missing)_ | `staff_talking_points` | Add: `""` |
| _(missing)_ | `top_objections` | Add: `[]` |
| _(missing)_ | `downtime_note` | Add: `""` |
| _(missing)_ | `same_session_ok` | Add: `null` |
| _(missing)_ | `maintenance_story` | Add: `""` |
| _(missing)_ | `rebooking_trigger` | Add: `""` |
| _(missing)_ | `next_visit_prompt` | Add: `""` |
| _(missing)_ | `source_support_summary` | Add: `""` |
| _(missing)_ | `evidence_level` | Add: `""` |
| _(missing)_ | `review_status` | Add: `"draft"` |
| _(missing)_ | `audience` | Add: `["agent","staff"]` |
| _(missing)_ | `patient_safe` | Add: `false` |
| _(missing)_ | `last_reviewed` | Add: `null` |
| _(missing)_ | `reviewed_by` | Add: `null` |

**Fields from Format A with no canonical equivalent:** None — all Format A fields map.

### Format B Keys → Canonical Template Keys

| Format B Key | Canonical Template Key | Transformation |
|-------------|------------------------|----------------|
| `content.clinical_rationale` | `clinical_rationale` | Extract from nested content |
| `content.patient_education` | `patient_education_summary` | Extract + rename |
| `content.staff_talking_points` | `staff_talking_points` | Extract from nested content |
| `archetype_id` | _(dropped)_ | Metadata, not content — drop |
| `archetype_name` | _(dropped)_ | Metadata, not content — drop |
| `product_pairs` | _(dropped)_ | Replaced by `item_relationship_id` FK |
| _(missing)_ | All other canonical fields | Add with empty/null defaults |

**Fields from Format B dropped with justification:**
- `archetype_id` — Archetype grouping is not needed in the canonical per-pair format; `fuel_type='pairing_fuel'` and the `item_relationship_id` FK serve as identifiers
- `archetype_name` — Same as above
- `product_pairs` — The relationship between this fuel doc and the products it covers is now captured via `item_relationship_id` FK to the `item_relationships` table; the nested array is redundant

---

## Key Implication for Phase 12-01 SQL

The SQL migration must **INSERT** rows (not UPDATE), because zero pairing_fuel rows exist in the live DB.

The canonical JSON template goes into the `content` column (JSONB), and the `fuel_type` column is set to `'pairing_fuel'`. The `item_relationship_id` FK will be populated once the `item_relationships` table is populated (Phase 06 SQL execution). For Phase 12-01, the SQL uses a placeholder pattern with NULL `item_relationship_id` and a descriptive comment, so the rows can be inserted now and the FK backfilled when item_relationships are available.

---

## Live Column Names (for downstream plans)

| Purpose | Column Name | Notes |
|---------|-------------|-------|
| JSON payload | `content` | JSONB column (NOT `agent_fuel_json`) |
| Fuel type discriminator | `fuel_type` | TEXT. Values: 'category_fuel', 'product_fuel', 'pairing_fuel' |
| Status | `status` | TEXT. Values: 'draft', 'active', 'archived' (NOT `review_status`) |
| Primary key | `id` | UUID |
| Product link | `offering_id` | UUID FK (for product_fuel rows) |
| Category link | `category_id` | UUID FK (for category_fuel rows) |
| Pairing link | `item_relationship_id` | UUID FK (for pairing_fuel rows) |
| Table name | `agent_fuel_documents` | NOT `gl_agent_fuel_documents` |

---

*Phase 12-01 schema audit — 2026-06-14*
