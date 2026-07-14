# Phase 12: combination-fuel-documents — Research

**Researched:** 2026-06-14
**Domain:** Medical aesthetics combination intelligence — fuel doc schema reconciliation, corpus-grounded content generation, COALESCE override pattern
**Confidence:** HIGH (extensive prior research completed in PHASE_8_COMBINATION_RESEARCH_SPEC.md; schema patterns established in prior phases)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| COMBO-01 | Every canonical/common pairing has enriched fuel doc with corpus-grounded content | 37 review cards in REVIEW_QUEUE/pairings/ are the content source; 16 existing `gl_agent_fuel_documents` pairing_fuel rows are the target; corpus RPCs available for gap-filling |
| COMBO-02 | Content sounds like what trained staff would actually say — education tone, not sales pitch | "Would trained staff actually say this?" checklist defined in PHASE_8_COMBINATION_RESEARCH_SPEC.md; education-first framing patterns well-documented |
| COMBO-03 | What-not-to-say populated for every combination | Universal do-not-say matrix (12 categories) + pair-specific additions defined; content blocks include `do_not_say.universal`, `do_not_say.pair_specific`, `do_not_say.practice_specific` |
| COMBO-04 | Fuel doc schema supports practice-level overrides (gl_*/pl_* COALESCE pattern) | COALESCE pattern established in phases 1-6 for gl_products/pl_products; same pattern applies to gl_agent_fuel_documents/pl_agent_fuel_documents per FUEL_DOC_TEMPLATE_SPEC.md |
| COMBO-05 | Unified JSON format across all fuel docs (2 existing formats reconciled) | Both formats documented in FUEL_DOC_TEMPLATE_SPEC.md; canonical template defined; all 16 docs are `status='draft'` — clean break acceptable |
</phase_requirements>

---

## Summary

Phase 12 is a **content enrichment phase**, not an architecture phase. The architecture decisions are already made: `gl_agent_fuel_documents` is the storage target (no schema changes needed), the canonical JSON template is defined in `FUEL_DOC_TEMPLATE_SPEC.md`, and the source classification rules governing what can go into production fields are locked in `SOURCE_CLASSIFICATION.md`.

The work breaks into three sequential tasks: (1) reconcile the two existing JSON formats into the canonical template and apply it to all 16 `pairing_fuel` rows, (2) mine the 37 REVIEW_QUEUE review cards + corpus RPCs to generate enriched fuel doc content for all canonical/common pairs, and (3) assemble a review queue for Chris to approve before any row is promoted from `draft` to `active`.

The most important constraint: **content only enters production fields if it comes from production-citable sources** (PubMed, FDA labels, manufacturer data, expert consensus with no attribution). Podcast-derived knowledge was already stripped from review cards in Phase 10 (PAIR-03 complete). The review cards in `REVIEW_QUEUE/pairings/` are the primary content source — they contain pre-validated clinical rationale, timing guidance, patient education text, and staff talking points that can be transformed into the fuel doc format. Gaps not covered by the review cards require corpus querying via the CMS Supabase RPCs.

**Primary recommendation:** Task 12-01 (schema unification) must complete before 12-02 (content generation) can begin, since 12-02 writes into the canonical format. Task 12-03 (review queue) cannot begin until 12-02 produces content. Run 12-01 and 12-03 planning in parallel with 12-02, but execute sequentially.

---

## What Already Exists (Prior Phase Outputs)

This is not a greenfield phase. Significant prior work feeds directly into Phase 12.

### Content Sources (Ready to Consume)

| Artifact | Location | What It Provides |
|----------|----------|------------------|
| 37 review cards (canonical + common) | `REVIEW_QUEUE/pairings/*.md` | Clinical rationale, timing guidance, patient education text, staff talking points, evidence citations per pair |
| 06-02-canonical-common-inserts.sql | `supabase/compile_sql/06-02-canonical-common-inserts.sql` | Full INSERT SQL for 5 canonical + 32 common pairs with all content fields |
| Phase 7 timing data | `supabase/compile_sql/07-03-pair-timing.sql` (blocked) | Pair-level timing fields: same_session_ok, staging_required, staging_sequence, timing_notes |
| Phase 8 combination research spec | `.planning/phases/12-combination-fuel-documents/PHASE_8_COMBINATION_RESEARCH_SPEC.md` | 128-search corpus synthesis, do-not-say framework, objection matrix, content template, staff language quality test |

### Fuel Doc Schema (Ready to Implement)

| Artifact | Location | What It Provides |
|----------|----------|------------------|
| Canonical combination template | `.planning/phases/999.1-agent-fuel-document-management-ui/FUEL_DOC_TEMPLATE_SPEC.md` | Full YAML template reconciling Format A (product-pair flat) and Format B (archetype nested) |
| Two existing format definitions | Same file — "Two Existing JSON Formats" section | Format A (6 docs), Format B (10 docs) — both documented, clean-break reconciliation recommended |
| Source classification rules | `.planning/phases/09-podcast-data-strategy-and-evidence-provenance/SOURCE_CLASSIFICATION.md` | What sources can go in production fields; citation formats per source type |

### Existing `gl_agent_fuel_documents` State

Per `FUEL_DOC_TEMPLATE_SPEC.md` (cross-referenced with agent_manager_tables.sql):

| Type | Count | Status | Issue |
|------|-------|--------|-------|
| `pairing_fuel` | ~16 | draft | Two incompatible JSON formats (6 flat, 10 nested) |
| `product_fuel` | ~8 | draft | Out of Phase 12 scope |
| `concern_fuel` | ~5 | draft | Out of Phase 12 scope |

Known table columns on `gl_agent_fuel_documents`:
- `id`, `product_name`, `source_type`, `content`, `metadata` — from TypeScript type definition
- `agent_fuel_json` (JSONB), `review_status`, `product_ids[]`, `relationship_ids[]`, `audience[]`, `patient_safe` — from PHASE_8_COMBINATION_RESEARCH_SPEC.md schema analysis

**Note:** The exact live schema must be confirmed via Supabase MCP `list_tables` before Task 12-01 begins. The TypeScript type definition (`data-sources.ts`) and the schema analysis may have diverged.

### Pairing Tier Breakdown (from Phase 6 + Phase 10)

| Tier | Count | Phase 12 Scope? |
|------|-------|----------------|
| canonical | 5 | YES — full content (all template fields) |
| common | 32 | YES — full content (all template fields) |
| conditional | 51 | NO — rationale + timing + conditions only (Phase 13 or later) |
| compatible_only | 48 | NO — short rationale |
| do_not_market | 17 | NO — suppression rationale only |
| rejected | total 190 | NO — report only |

**Phase 12 targets: 37 pairs (5 canonical + 32 common)**

---

## Architecture Patterns

### Pattern 1: COALESCE Override (gl_*/pl_* Pattern)

Established in Phases 1-6 for product data. Phase 12 applies the same pattern to fuel documents.

**How it works:**
```sql
SELECT
  COALESCE(pl.patient_facing_name, gl.patient_facing_name) AS patient_facing_name,
  COALESCE(pl.staff_close, gl.staff_close) AS staff_close,
  COALESCE(pl.do_not_say, gl.do_not_say) AS do_not_say,
  -- Practice-only fields (no GL fallback)
  pl.sop AS practice_sop,
  pl.preferences AS practice_preferences
FROM gl_agent_fuel_documents gl
LEFT JOIN pl_agent_fuel_documents pl
  ON pl.gl_fuel_doc_id = gl.id
  AND pl.practice_id = $1
WHERE gl.id = $2;
```

**Key rule:** GL fields are best-practice defaults. Practice fields win when set. SOP/preferences sections are practice-only — GL has no content in those sections.

**For Phase 12:** Phase 12 populates only `gl_agent_fuel_documents`. The `pl_agent_fuel_documents` table is a Phase 11.1 / future concern. COMBO-04 is satisfied by ensuring the canonical template has the correct field structure so the COALESCE pattern can work when practice overrides are added later.

### Pattern 2: Content Generation from Review Cards

The 37 review cards in `REVIEW_QUEUE/pairings/` already contain structured content fields that map directly to the canonical template:

| Review Card Field | Canonical Template Field |
|-------------------|--------------------------|
| `### Clinical Rationale` | `clinical_rationale`, `why_together` |
| `### Timing Guidance` | `timing_note`, `sequencing_note` |
| `### Patient Education Text` | `patient_education_summary` |
| `### Staff Talking Points` | `staff_close`, `staff_talking_points` |
| `## Evidence` section | `source_support_summary`, `evidence_level` |
| `**Same Session OK:**` in header | `same_session_ok` |
| `**Tier:**` in header | (metadata, not fuel content) |

Fields NOT in review cards (require generation or corpus query):
- `patient_facing_name` — needs generation (outcome-focused, practice-configurable)
- `one_line_positioning` — needs generation
- `ideal_candidate` / `not_ideal_candidate` — needs generation
- `A_solves` / `A_does_not_solve` / `B_adds` — extract from clinical rationale or generate
- `top_objections` — generate from universal matrix + pair-specific adaptation
- `do_not_say.pair_specific` — generate based on product categories
- `maintenance_story` — generate from Phase 7 cadence data + corpus
- `rebooking_trigger` — generate

### Pattern 3: Evidence Integrity Protocol

Per `SOURCE_CLASSIFICATION.md` and `EVIDENCE_MODEL.md`:

1. **Production fields** (`clinical_rationale`, `patient_education_summary`, `staff_close`, `source_support_summary`) may only reference production-citable sources: PubMed (PMID/DOI), FDA labels, manufacturer data, expert consensus
2. **Podcast data** is already stripped from review cards (Phase 10 PAIR-03 complete) — do NOT re-introduce it
3. **Expert consensus** is production-citable when written as "Expert consensus supports..." with no speaker/show attribution
4. **EC- identifiers** (e.g., EC-a8f3c2e19b74) are internal tracking for podcast-derived concepts — never appear in production fields

### Pattern 4: Staff Language Quality Gate

Every combination fuel doc must pass the "Would trained staff actually say this?" checklist before SQL generation. This is the COMBO-02 quality gate:

```
[ ] Sounds like provider-mediated education, not a sales script
[ ] Explains why both treatments are relevant to the patient's concern
[ ] Does not imply the patient "needs" more treatment
[ ] Avoids guarantees ("you will," "guaranteed," "always works")
[ ] Avoids unsupported clinical claims
[ ] Avoids fear-based language ("your skin will only get worse")
[ ] Uses patient-understandable outcome language (not jargon)
[ ] Preserves clinical accuracy
[ ] Includes realistic downtime/timing caveats
[ ] Could be said by a trained aesthetic consultant in a real consultation
```

---

## Canonical JSON Template (COMBO-05 Reference)

The canonical combination fuel document template (from `FUEL_DOC_TEMPLATE_SPEC.md`). All 16 `pairing_fuel` rows must conform to this structure after 12-01 completes.

```json
{
  "fuel_type": "combination",
  "template_version": "1.0",
  "patient_facing_name": "",
  "one_line_positioning": "",
  "package_goal": "",
  "ideal_candidate": "",
  "not_ideal_candidate": "",
  "concern_tags": [],
  "why_together": "",
  "A_solves": "",
  "A_does_not_solve": "",
  "B_adds": "",
  "clinical_rationale": "",
  "patient_education_summary": "",
  "staff_close": "",
  "staff_talking_points": "",
  "do_not_say": {
    "universal": [],
    "pair_specific": [],
    "practice_specific": []
  },
  "top_objections": [
    {
      "objection_type": "",
      "patient_says": "",
      "handling_language": "",
      "do_not_say_in_response": ""
    }
  ],
  "sequencing_note": "",
  "timing_note": "",
  "downtime_note": "",
  "same_session_ok": null,
  "maintenance_story": "",
  "rebooking_trigger": "",
  "next_visit_prompt": "",
  "source_support_summary": "",
  "evidence_level": "",
  "review_status": "draft",
  "audience": ["agent", "staff"],
  "patient_safe": false,
  "last_reviewed": null,
  "reviewed_by": null
}
```

**Universal do-not-say list** (pre-populated on every combination doc, from PHASE_8_COMBINATION_RESEARCH_SPEC.md):
- Unsupported clinical claims ("clinically proven to reverse aging")
- Guarantees ("I guarantee you'll love the results")
- "You need this" pressure ("You really need both")
- Fear-based selling ("Without this, your skin will only get worse")
- Competitor disparagement
- "Liquid facelift" overclaims
- "No downtime" when downtime exists
- Permanent result claims
- Off-label combination approval claims
- "No risk" statements
- Price/value claims practices may not honor
- Before/after exaggerations ("20 years younger")

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Source validation | Custom source-type checking | `SOURCE_CLASSIFICATION.md` decision tree | Already governs all Phase 12-14 content; consistent enforcement |
| Do-not-say detection | New LLM evaluation prompt | Universal do-not-say list + staff language checklist from PHASE_8_COMBINATION_RESEARCH_SPEC.md | Already synthesized from 128 corpus searches |
| Content tone assessment | New quality rubric | "Would trained staff say this?" checklist (10 items, already defined) | Validated against corpus expert benchmarks |
| Objection handling scripts | Generate from scratch | Universal objection matrix (8 objection types, handling patterns) from PHASE_8_COMBINATION_RESEARCH_SPEC.md | Already synthesized from corpus |
| Evidence citation format | Invent per-field | Citation formats from `SOURCE_CLASSIFICATION.md` by source type | Established and consistent |
| Practice override pattern | Custom JSONB logic | COALESCE(pl.field, gl.field) pattern from prior phases | Established across gl_products/pl_products |

---

## Common Pitfalls

### Pitfall 1: Generating Content Without Reading Review Cards First
**What goes wrong:** Phase 12 agent generates combination content from LLM knowledge, ignoring the 37 review cards that already contain validated content.
**Why it happens:** It looks like a content generation task; review cards are not obviously the primary input.
**How to avoid:** Read each `REVIEW_QUEUE/pairings/{pair}.md` file before writing any fuel doc content for that pair. The review card content is the grounded baseline; LLM generation fills gaps only.
**Warning signs:** If `clinical_rationale` in the fuel doc doesn't closely match the review card, something went wrong.

### Pitfall 2: Re-introducing Podcast Attribution
**What goes wrong:** Content generation agent surfaces corpus data and attributes it to a podcast show, episode, or speaker.
**Why it happens:** Corpus RPCs return podcast chunks with metadata; it's easy to include attribution in output.
**How to avoid:** Any corpus-derived finding that is not backed by a PubMed/FDA/manufacturer source must either (a) be classified as expert consensus with no attribution, or (b) be omitted. Never name the podcast, show, episode, or speaker in any production field.
**Warning signs:** Any text containing show names (e.g., "True to Form", "Business of Aesthetics", "The Med Spa CEO") in production fields.

### Pitfall 3: Format Creep During Schema Unification
**What goes wrong:** 12-01 unification produces a third new format rather than migrating existing docs to the canonical template.
**Why it happens:** Canonical template has new fields not in either existing format; tempting to add a hybrid.
**How to avoid:** The canonical template from `FUEL_DOC_TEMPLATE_SPEC.md` is the standard. Update existing 16 docs to match it. Do not invent a fourth format.
**Warning signs:** Any field in updated docs not present in the canonical template.

### Pitfall 4: Confusing item_relationships Content Fields With Fuel Doc Content
**What goes wrong:** The `clinical_rationale` and `staff_talking_points` fields already exist on `item_relationships` (from Phase 6 SQL). Phase 12 writes richer versions of the same content into `gl_agent_fuel_documents`. These are separate layers.
**Why it happens:** Same field names across two tables.
**How to avoid:** `item_relationships` holds the relationship metadata + shallow content (enough for pairing database). `gl_agent_fuel_documents` holds the rich agent-consumable fuel (the full combination intelligence package). Phase 12 does not modify `item_relationships`.
**Warning signs:** Any plan task that writes to `item_relationships` in Phase 12.

### Pitfall 5: Treating 07-03-pair-timing.sql as Available
**What goes wrong:** 12-02 content generation tries to read `07-03-pair-timing.sql` for timing data.
**Why it happens:** Phase 7 timing work was completed, but `07-03-pair-timing.sql` is in the `blocked` state because its dependency chain includes deferred `06-02` files.
**How to avoid:** Pull timing data from Phase 7 source artifacts directly — `TIMING_EVALUATION.md` and `07-CONTEXT.md` contain the timing rules. The review cards also contain timing guidance. Do not depend on `07-03-pair-timing.sql` being executed.
**Warning signs:** Plan task that assumes timing columns (`same_session_ok`, `staging_required`, etc.) are populated in the live DB.

### Pitfall 6: Claiming All 37 Pairs Must Be Reviewed Before SQL Is Written
**What goes wrong:** Plan waits for Chris to review all 37 combination fuel docs before writing any SQL.
**Why it happens:** Review checkpoint sounds like a phase gate.
**How to avoid:** Review queue is assembled per 12-03 plan; Chris can approve in batches. SQL for approved pairs can be written incrementally. The review queue is a deliverable, not a blocker to starting 12-02.
**Warning signs:** Plan task dependencies that place all SQL writing after all review.

---

## Content Generation Strategy

### Source Priority for Each Content Field

| Content Field | Primary Source | Gap Source |
|---------------|---------------|------------|
| `clinical_rationale` | Review card Clinical Rationale section | Corpus query + expert consensus |
| `why_together` | Review card Clinical Rationale (extract mechanism summary) | Synthesize from Gate 2 (Mechanism Complementarity) in review card |
| `A_solves` / `A_does_not_solve` / `B_adds` | Review card Gate 3 (Limitation Coverage) | Generate from mechanism analysis |
| `patient_education_summary` | Review card Patient Education Text | Adapt or regenerate if tone needs adjustment |
| `staff_close` / `staff_talking_points` | Review card Staff Talking Points | Adapt or supplement from corpus patterns |
| `timing_note` / `sequencing_note` | Review card Timing Guidance + TIMING_EVALUATION.md | Phase 7 cadence data |
| `same_session_ok` | Review card header `**Same Session OK:**` | item_relationships field (once executed) |
| `source_support_summary` | Review card Evidence section | PubMed + FDA citations already listed |
| `evidence_level` | Review card Evidence Type (HIGH/LOW) | Map to: strong/moderate/weak/emerging |
| `patient_facing_name` | Generate (outcome-focused simple name) | Corpus patterns (see PHASE_8 Q1.1) |
| `do_not_say.pair_specific` | Generate per product category | PHASE_8_COMBINATION_RESEARCH_SPEC.md pair-specific examples |
| `top_objections` | Generate from universal matrix | Adapt 5 universal objection patterns to each pair |
| `maintenance_story` | Generate from Phase 7 cadence data | Corpus maintenance story examples in PHASE_8 §5 |
| `rebooking_trigger` | Generate | Staff talking point, not CRM automation |

### Corpus RPCs Available for Gap-Filling

CMS Supabase project `gjqicqldjgvrwmtkliie` — use `scripts/library_search.py` or direct RPC calls:

| RPC | Source | Chunks | Use in Phase 12 |
|-----|--------|--------|-----------------|
| `match_pubmed_articles()` | PubMed | ~37K | Evidence backing, clinical rationale |
| `match_youtube_transcripts()` | YouTube | ~148K | Technique education, manufacturer demos |
| `match_industry_articles()` | Industry | ~87K | Practice patterns, context |
| `match_podcast_chunks()` | Podcast | ~202K | Research-only; never cite in production fields |

**Per D-17/D-18 from Phase 6 (still applies):** Corpus querying is the established enrichment pattern. Per-pair query patterns: `{A} {B} combination`, `{A} {B} sequencing`, `{A} {B} same session`, `contraindication {A} {B}`.

### Evidence Level Mapping

| Review Card Evidence Type | Canonical Template `evidence_level` |
|---------------------------|-------------------------------------|
| HIGH (PubMed + FDA) | `strong` |
| MODERATE (expert consensus + some data) | `moderate` |
| LOW (expert consensus only) | `weak` |
| Very limited studies | `emerging` |

---

## Plan Structure Guidance

### 12-01: Fuel Doc Schema Unification (COMBO-04, COMBO-05)

**What to do:**
1. Confirm live schema of `gl_agent_fuel_documents` via Supabase MCP `list_tables` — resolve any divergence from TypeScript types
2. Audit all 16 existing `pairing_fuel` rows — identify which are Format A (6 docs) vs Format B (10 docs)
3. Write SQL UPDATE statements to migrate all 16 rows to the canonical template structure
4. Document any fields that exist in the live rows but are not in the canonical template — flag for Chris if structurally significant
5. Verify all 16 rows are `review_status = 'draft'` (clean break acceptable)

**Key decision already made:** All 16 docs are draft; clean break to canonical format is recommended (no backward compatibility required per PHASE_8 Q10).

**Output:** Updated `gl_agent_fuel_documents` rows all conforming to canonical template; SQL migration file in `supabase/compile_sql/12-01-fuel-doc-schema-unification.sql`

### 12-02: Content Generation (COMBO-01, COMBO-02, COMBO-03)

**What to do:**
1. For each of 37 canonical/common pairs, read the corresponding review card
2. Extract content fields that map to the canonical template (see mapping table above)
3. Generate missing fields (patient_facing_name, objections, do_not_say.pair_specific, maintenance_story, rebooking_trigger)
4. Apply staff language quality checklist to all generated text
5. Compile into canonical JSON format
6. Write to REVIEW_QUEUE as markdown files for human review checkpoint

**Recommended batch order** (from PHASE_8 hero combination priority):
- Batch 1: All 5 canonical pairs (Botox + HA fillers) — highest evidence, clearest content
- Batch 2: Neurotoxin × Sculptra (5 common pairs) — neuromodulation + biostimulator
- Batch 3: Neurotoxin × SKINVIVE (5 common pairs) — neuromodulation + skin quality  
- Batch 4: HA Filler × Sculptra (5 common pairs) — structural volume + collagen foundation
- Batch 5: HA Filler × Morpheus8 (remaining common pairs) — filler + energy device
- Batch 6: Neurotoxin × Morpheus8 + remaining pairs

**Output:** 37 markdown review files in `REVIEW_QUEUE/combination_fuel/` + quality checklist results per doc

### 12-03: Review Queue Assembly and Chris Checkpoint (COMBO-01, COMBO-02)

**What to do:**
1. Consolidate all 37 review files into a summary dashboard (similar to `PAIRING_REVIEW.md` from Phase 6)
2. Flag any docs that failed the staff language quality test (require revision before review)
3. Flag any docs where evidence level is weak/emerging (require Chris awareness)
4. Define the approval workflow: Chris marks APPROVED / NEEDS REVISION / REJECTED
5. Write SQL INSERT/UPDATE statements for all approved docs

**Output:** `COMBINATION_FUEL_REVIEW.md` dashboard, SQL for approved docs in `supabase/compile_sql/12-03-combination-fuel-inserts.sql`

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Supabase MCP (`execute_sql`) | 12-01 schema audit, 12-03 SQL execution | Check at task start | — | Manual SQL via Chris |
| CMS Supabase RPCs (`match_pubmed_articles`, etc.) | 12-02 gap-filling | Available (established in Phase 6) | — | — |
| GL Supabase (`aejskvmpembryunnbgrk`) | 12-01 schema audit, 12-03 inserts | Available (established in prior phases) | — | — |
| `scripts/library_search.py` | 12-02 corpus queries | Check at task start | — | Direct RPC calls to CMS Supabase |

**Note:** SQL execution against live Supabase has been deferred in prior phases (SQL manifest not yet executed). Phase 12 should plan for both Supabase MCP execution and file-only delivery, with Chris executing SQL manually if MCP is unavailable.

---

## Validation Architecture

> Nyquist validation not explicitly disabled in `.planning/config.json` (only `_auto_chain_active: false` present). Including validation guidance.

This phase generates content artifacts (markdown files + SQL), not testable code. Automated unit tests are not applicable to fuel doc content. Validation is content-quality-gate-based.

### Phase Requirements to Validation Map

| Req ID | Behavior | Test Type | Command/Method | Exists? |
|--------|----------|-----------|----------------|---------|
| COMBO-01 | All 37 canonical/common pairs have enriched fuel docs | Count check | `SELECT COUNT(*) FROM gl_agent_fuel_documents WHERE source_type='pairing_fuel' AND review_status != 'draft'` | Wave 2+ |
| COMBO-02 | Content passes staff language quality test | Manual checklist | 10-item quality checklist per doc in PHASE_8_COMBINATION_RESEARCH_SPEC.md | Manual, per-doc |
| COMBO-03 | do_not_say populated for every combination | JSON field check | `SELECT id FROM gl_agent_fuel_documents WHERE agent_fuel_json->'do_not_say' IS NULL` | Wave 2+ |
| COMBO-04 | Schema supports practice overrides | Structural check | Verify all fields in canonical template match COALESCE-ready structure | 12-01 output check |
| COMBO-05 | Unified JSON format | Schema conformance | Compare all `pairing_fuel` rows to canonical template structure | 12-01 verification SQL |

### Sampling Rate

- **Per task:** Review markdown output against staff language checklist before committing
- **Per wave:** SQL conformance check — all updated/inserted rows parse against canonical template JSON structure
- **Phase gate:** Chris review checkpoint (12-03) is the human quality gate before `review_status` changes from `draft`

### Wave 0 Gaps

The phase generates SQL files; no test framework installation required. Validation is via:
- SQL queries against GL Supabase (established pattern)
- Manual checklist review (documented in PHASE_8_COMBINATION_RESEARCH_SPEC.md)

---

## Open Questions

1. **Is `07-03-pair-timing.sql` executed in the live DB?**
   - What we know: It is `blocked` status in the SQL manifest (depends on deferred 06-02 files)
   - What's unclear: Whether Chris has manually executed it or equivalent timing data
   - Recommendation: Task 12-01 should check via Supabase MCP whether timing columns exist on `item_relationships`. If not populated, pull timing from `TIMING_EVALUATION.md` and review cards directly.

2. **What is the exact live schema of `gl_agent_fuel_documents`?**
   - What we know: TypeScript type defines `id, product_name, source_type, content, metadata`. PHASE_8 research identified `agent_fuel_json, review_status, product_ids[], relationship_ids[], audience[], patient_safe`.
   - What's unclear: Which set is authoritative; what additional columns exist; whether `fuel_type` column exists or is a JSON field
   - Recommendation: First action of 12-01 is Supabase MCP `list_tables` to get live schema.

3. **Should 12-02 generate content for all 37 pairs in one pass, or batch by confidence level?**
   - What we know: 5 canonical pairs have HIGH evidence; some common pairs have LOW/expert-consensus-only evidence
   - What's unclear: Whether Chris wants to review high-evidence pairs first before lower-confidence content is generated
   - Recommendation: Batch by tier — canonical 5 first, then common pairs grouped by evidence level. Each batch gets a checkpoint.

4. **Are the 37 review cards in REVIEW_QUEUE/pairings/ fully approved, or are they still pending Chris review?**
   - What we know: Cards have `**Status:** PENDING` in the Review Decision section; Phase 10 confirmed pairing tiers (PAIR-01/PAIR-02 complete) but the individual cards show PENDING status
   - What's unclear: Whether "PENDING" means the tier decisions are pending (Phase 10 resolved that) or the content fields are pending final Chris sign-off
   - Recommendation: Treat the content fields in the review cards as validated inputs for fuel doc generation (the pairing logic was confirmed in Phase 10). The fuel doc itself is what Chris reviews in 12-03 — not the review card again.

---

## Sources

### Primary (HIGH confidence)
- `.planning/phases/12-combination-fuel-documents/PHASE_8_COMBINATION_RESEARCH_SPEC.md` — 128-search corpus synthesis; content templates; do-not-say framework; objection matrix; staff language quality test
- `.planning/phases/999.1-agent-fuel-document-management-ui/FUEL_DOC_TEMPLATE_SPEC.md` — Canonical combination fuel doc template; two-format reconciliation; COALESCE pattern
- `REVIEW_QUEUE/pairings/*.md` (37 files) — Per-pair content: clinical rationale, timing, patient education text, staff talking points, evidence citations
- `.planning/phases/09-podcast-data-strategy-and-evidence-provenance/SOURCE_CLASSIFICATION.md` — Production-citable source types and citation formats (governs all content generation)
- `supabase/compile_sql/06-02-canonical-common-inserts.sql` — Full SQL with all content fields for 5 canonical + 32 common pairs (content baseline)
- `.planning/REQUIREMENTS.md` — COMBO-01 through COMBO-05 requirement definitions
- `.planning/STATE.md` — Phase decisions, architecture context, accumulated knowledge

### Secondary (MEDIUM confidence)
- `.planning/phases/07-timing-rules/07-CONTEXT.md` — Timing rules and schema decisions (for timing_note/sequencing_note content)
- `.planning/phases/11-source-framework-and-v1.1-closeout/ENRICHMENT_PIPELINE.md` — Repeatable enrichment loop (Phase 12 follows this pipeline for any new sources)
- `.planning/phases/06-pairing-engine/PAIRING_EVIDENCE_PACK.md` — Evidence citations per pair (supplements review card evidence sections)

---

## Metadata

**Confidence breakdown:**
- Standard approach: HIGH — architecture decisions locked, prior research complete, canonical template defined
- Content generation patterns: HIGH — review cards are primary source, gap-filling strategy established
- Schema state: MEDIUM — live `gl_agent_fuel_documents` schema must be confirmed at task start; TypeScript types may diverge from live DB

**Research date:** 2026-06-14
**Valid until:** Stable — no fast-moving external dependencies. Re-research needed only if FUEL_DOC_TEMPLATE_SPEC.md or SOURCE_CLASSIFICATION.md change materially.
