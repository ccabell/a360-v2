# Phase 06: pairing-engine - Context

**Gathered:** 2026-06-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Generate within-catalog pairing candidates for all 190 unique pairs among 20 products, evaluate each through the 8-gate legitimacy test, tier them (canonical/common/conditional/compatible_only/do_not_market/rejected), and emit draft `item_relationships` rows with clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points. Human review gates publication of canonical/common tiers.

**Critical workflow principle:** This is a corpus-first enrichment phase. The podcast database (31 shows, 8,688 episodes, 202K chunks), YouTube (3,984 videos, 148K chunks), PubMed (23,581 articles, 37K chunks), and industry articles (750, 87K chunks) must be queried as PRIMARY sources before LLM synthesis. The LLM synthesizes and structures what experts said — it does not generate pairing intelligence from training data.

</domain>

<decisions>
## Implementation Decisions

### Schema

- **D-01:** Add `pairing_tier TEXT CHECK (pairing_tier IN ('canonical','common','conditional','compatible_only','do_not_market','rejected'))` column to `item_relationships`. Keep existing `relationship_type` and `relationship_strength` enums as separate clinical metadata dimensions. Tier is the business/recommendation decision; type/strength are clinical descriptors.
- **D-02:** Emit alternative pairs (e.g., Botox vs Dysport) as `relationship_type='alternative'` + `pairing_tier='do_not_market'`. Alternatives are valuable intelligence even when not marketable as combinations.

### 8-Gate Evaluation

- **D-03:** Hybrid evaluation: SQL pre-screen (concern overlap, does_not_solve complementarity, body areas, timing fields, evidence_links) → corpus evidence retrieval (podcast, YouTube, PubMed, industry) → LLM gate evaluation with evidence context → human review for active tiers. The corpus step is MANDATORY.
- **D-04:** Pass/fail gates with free-text notes per gate. No numeric scoring. Safety gate is a hard stop — if safety fails, pair cannot be canonical or common.
- **D-05:** Persist full gate-by-gate evaluation in `PAIRING_EVALUATION.md` (report file). Store only summary fields in DB rows (tier, type, strength, rationale, timing, same_session_ok, patient/staff text). Do not add JSONB gate details to `item_relationships`.

### Review Workflow

- **D-06:** Chris reviews canonical and common tiers before publication. Conditional and below are not proactively published as recommendations. Rows for canonical/common start `is_active=false` until Chris approves.
- **D-07:** Hybrid review format: `PAIRING_REVIEW.md` (executive dashboard with all canonical/common pairs in table) + `REVIEW_QUEUE/pairings/{product_a}__{product_b}.md` (detailed per-pair review files).
- **D-08:** Review checklist per canonical/common pair:
  - Clinical rationale is accurate and non-promotional
  - Proposed tier is correct
  - relationship_type and relationship_strength are correct
  - Timing guidance reflects real clinical practice
  - same_session_ok is correct
  - Sequencing order is clinically sound
  - Contraindications or spacing issues are not minimized
  - Patient education text is clear, honest, and provider-mediated
  - Staff talking points are education-first, not pressure-based
  - No forced pairing — the "why both?" is genuine
  - Source support is adequate for the strength of recommendation
  - No guaranteed outcomes or unsupported claims
  - Any alternative/substitution issue is handled neutrally
  - Any regional/legal/safety caveat is captured

### Pair Generation Scope

- **D-09:** Evaluate ALL 190 unique pairs. All 190 appear in PAIRING_EVALUATION.md. Emit DB rows only for operationally useful relationships (active recommendations, conditional, compatibility knowledge, alternatives, safety guardrails). True rejects with no meaningful relationship = report-only.
- **D-10:** Backfill `does_not_solve` for the 2 products missing it BEFORE running pairing evaluation. Use dossier content + corpus research. Chris review if limitation statements are uncertain.
- **D-11:** Batch evaluation by category pair (neurotoxin x HA filler, neurotoxin x biostimulator, etc.), then sort likely high-value pairs first within each batch. Sequence: neurotoxin x filler → neurotoxin x biostimulator → neurotoxin x energy → filler x biostimulator → filler x energy → biostimulator x energy → same-category alternatives → everything else.

### Content Fields

- **D-12:** Full content (all 4 fields) for canonical/common only. Conditional gets clinical_rationale + timing_guidance + conditions. compatible_only gets short rationale. do_not_market gets suppression rationale. Rejected = report-only.
- **D-13:** Staff talking points: hybrid clinical + consultation-ready tone. Education-first, not pressure-based. Gateway posture applies — clinical accuracy + patient education + consultation-ready phrasing. No pressure language, overpromising, guarantees, or unqualified claims. Good/better/best framing where appropriate.
- **D-14:** Patient education text: provider-facing summary using "Tell the patient: ..." framing. A360 is provider-mediated — content helps staff explain, not bypass clinical judgment.

### Output & Deliverables

- **D-15:** Required artifacts beyond DB rows:
  - `PAIRING_EVALUATION.md` — full 190-pair matrix with gate results
  - `PAIRING_REVIEW.md` — Chris review dashboard for canonical/common
  - `REVIEW_QUEUE/pairings/*.md` — detailed per-pair review files
  - `supabase/compile_sql/06-*.sql` — schema changes + INSERT statements
  - `PAIRING_RUBRIC.md` — tier definitions, gate definitions, hard stops, content-depth rules
  - `PAIRING_QA_REPORT.md` — completeness/consistency validation
  - `PAIRING_EVIDENCE_PACK.md` — corpus evidence per high-value pair
  - `PAIRING_CORPUS_QUERY_LOG.md` — actual queries used against corpus
  - `DOES_NOT_SOLVE_BACKFILL.md` — documents the 2 missing product backfills
  - `TAXONOMY_ADDITIONS.md` — any new taxonomy needs discovered
- **D-16:** DB emission rule: canonical/common/conditional/compatible_only always get rows. do_not_market selectively (alternatives, suppression guardrails). Rejected usually report-only unless needed as hard suppression.

### Corpus-First Enrichment Standard

- **D-17:** Corpus querying is MANDATORY before finalizing any canonical/common/conditional/do_not_market tier. Query podcast, YouTube, PubMed, and industry corpus using CMS Supabase RPCs (match_podcast_chunks, match_youtube_transcripts, match_pubmed_articles, match_industry_articles) on project `gjqicqldjgvrwmtkliie`.
- **D-18:** For each pair, query patterns include: `{Product A} {Product B}`, `combination treatment {Product A}`, `stacking {category A} {category B}`, `same session {Product A} {Product B}`, `sequencing {Product A} {Product B}`, `contraindication {Product A} {Product B}`, `{Product A} vs {Product B}` (for alternatives).
- **D-19:** New enrichment standard going forward: structured A360 data → corpus query → LLM synthesis → source trail persistence → review artifact → DB emission. Podcast/YouTube data are the primary source for what providers actually combine, avoid, sequence, explain, and what patients understand. PubMed/FDA/IFU are stronger for safety, claims, adverse events, evidence level, contraindications.

### Known Pairing Candidates

- **D-20:** High-priority canonical/common candidates to validate (hypotheses, not final — Chris confirms after 8-gate + review):
  1. Neurotoxin + HA filler (movement control + volume/structure)
  2. Sculptra + HA filler (collagen foundation + immediate structure)
  3. Sculptra + RF microneedling (collagen + texture)
  4. PRP + RF microneedling
  5. Neurotoxin + HA filler + energy/laser (broader concept, may need Phase 8)
  6. PDO threads + Sculptra (conditional on scope/sequencing)
  7. Non-inflammatory peel + injectable (timing-dependent)
  8. Biostimulator + energy device (device/timing/anatomy dependent)

### Known Flags/Rejects

- **D-21:** Known safety/rejection flags:
  - Hyaluronidase + HA filler same day → reject/flag spacing
  - Same-class neurotoxin alternatives → alternative + do_not_market
  - Same-class filler alternatives → alternative + do_not_market (unless expert-supported layering)
  - Filler-only "liquid facelift" overclaims in significant laxity → flag/conditional
  - High-dose neurotoxin antibody concerns → flag
  - HA filler near existing threads → conditional, technique-sensitive
  - Any pair that fails "why both?" → rejected or do_not_market

### Claude's Discretion

- Gate evaluation prompt design and token management
- SQL pre-screen query optimization
- Batch size for corpus queries (balance thoroughness vs. cost)
- PAIRING_EVALUATION.md formatting and column layout
- How to handle pairs where corpus returns no evidence (flag as low-confidence)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 6 Core
- `.planning/GL_GSD_ROADMAP.md` — Full GL roadmap with Phase 6 definition, 8-gate test, and dependency map
- `.planning/phases/06-pairing-engine/PHASE_6_QUESTIONS.md` — Original questions document
- `.planning/phases/02-dossier-batch/STRUCTURED_EMISSION_ADDENDUM.md` — does_not_solve pattern, item_concerns/item_body_areas emission conventions
- `.planning/phases/05-concern-language/CONCERN_CLUSTERS.md` — Concern cluster definitions and routing demo results
- `.planning/phases/05-concern-language/TAXONOMY_ADDITIONS_P5.md` — Phase 5 taxonomy additions for Chris review

### Product Intelligence (Phase 2 outputs)
- `.planning/phases/02-dossier-batch/STRUCTURED_COVERAGE.md` — Which products have structured intelligence populated
- `.planning/phases/05-concern-language/DB_STATE_BASELINE.md` — Concern IDs, alias counts, schema documentation

### Schema & Data
- `supabase/migrations/20260612_add_does_not_solve_backfill_authority_rank.sql` — does_not_solve column migration
- `compile_manifest.json` — Product manifest with category IDs

### Sales & Education
- `C:\Users\Chris\Dropbox\Git-local\Recent\A360-Sales-Excellence-System-MASTER.md` — Sales Excellence Framework (consultation language, good/better/best framing)

### Corpus Access
- CMS Supabase project: `gjqicqldjgvrwmtkliie` — podcast/YouTube/PubMed/industry corpus
- RPCs: `match_podcast_chunks()`, `match_youtube_transcripts()`, `match_pubmed_articles()`, `match_industry_articles()`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `item_relationships` table: 15 columns already defined, 0 rows. Schema includes relationship_type enum (complementary/stacks_with/sequential/enhances/alternative/contraindicated), relationship_strength enum (strong/moderate/weak), clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points, is_bidirectional, is_active, source_reference
- `item_concerns` table: 139 rows linking products to concerns with relevance tiers — basis for concern-overlap gate
- `does_not_solve` column on products: TEXT[] array, populated for 18/20 products — basis for limitation-coverage gate
- `concern_clusters` + `concern_cluster_members`: 4 clusters, 17 members — enables multi-mechanism pairing logic
- `aliases` table: 593 rows — patient language bridge for patient_education_text
- `REVIEW_QUEUE/` pattern from Phase 2 — established review file convention

### Established Patterns
- INSERT...WHERE NOT EXISTS with dedupe for idempotent SQL emission
- Supabase MCP execute_sql for live DB operations (project aejskvmpembryunnbgrk)
- SQL files in `supabase/compile_sql/` directory convention
- Phase reports in `.planning/phases/{phase}/` directory

### Integration Points
- `pairing_tier` column needs ALTER TABLE on existing `item_relationships`
- Products table has `does_not_solve TEXT[]` — 2 products need backfill
- `evidence_links` joins via offering_id — relevant for source-support gate
- `agent_reference_docs` contains dossier prose — relevant for mechanism/safety gates

</code_context>

<specifics>
## Specific Ideas

- "The pairing engine is not just a relationship table. It is the foundation of A360's combination intelligence layer."
- Staff talking points should sound like: "When a patient is focused on one concern, this helps the team explain why that treatment may only solve part of the issue and how the second treatment addresses a different layer." NOT "Upsell this patient into the premium package."
- Patient education: "Tell the patient: Botox helps relax movement-related lines, while filler restores structure or volume that Botox cannot replace. When both issues are present, treating both can create a more balanced result than either one alone."
- Podcast experts repeatedly warn that filler cannot replace surgery or solve advanced laxity — flag liquid facelift overclaims
- Sequencing matters: some protocols depend on collagen stimulation before threads/filler; tissue plane separation; spacing. "Sequencing order is clinically sound" must be explicit in review checklist
- The podcast corpus contains direct expert discussion of combination treatments, sequencing, contraindications, same-session compatibility, bundling, good/better/best consultation language, and real-world "why both?" explanations

</specifics>

<deferred>
## Deferred Ideas

- Multi-product combinations (3+ products) — Phase 8 (combination-intelligence) territory
- Patient-facing education text at patient reading level — future phase if A360 adds direct patient communication
- Location-aware legal/regulatory pairing constraints (e.g., France restrictions) — future if platform supports geo-gating
- Automated corpus query pipeline integrated into the compile system — future enrichment infrastructure

</deferred>

---

*Phase: 06-pairing-engine*
*Context gathered: 2026-06-13*
