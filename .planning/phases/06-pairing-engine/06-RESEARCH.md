# Phase 06: pairing-engine — Research

**Researched:** 2026-06-13
**Domain:** Medical aesthetics product pairing intelligence — 8-gate legitimacy evaluation, item_relationships schema, corpus-first enrichment
**Confidence:** HIGH (decisions locked in CONTEXT.md + extensive corpus research already completed in PHASE_6_ANSWERS_PODCAST_SOURCED.md)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Schema**
- D-01: Add `pairing_tier TEXT CHECK (pairing_tier IN ('canonical','common','conditional','compatible_only','do_not_market','rejected'))` to `item_relationships`. Keep existing `relationship_type` and `relationship_strength` enums as separate clinical metadata dimensions.
- D-02: Emit alternative pairs (e.g., Botox vs Dysport) as `relationship_type='alternative'` + `pairing_tier='do_not_market'`.

**8-Gate Evaluation**
- D-03: Hybrid evaluation: SQL pre-screen → corpus evidence retrieval → LLM gate evaluation with evidence context → human review. The corpus step is MANDATORY.
- D-04: Pass/fail gates with free-text notes per gate. No numeric scoring. Safety gate is a hard stop.
- D-05: Persist full gate-by-gate evaluation in `PAIRING_EVALUATION.md`. Only summary fields (tier, type, strength, rationale, timing, same_session_ok, patient/staff text) go into DB rows. No JSONB gate details on `item_relationships`.

**Review Workflow**
- D-06: Chris reviews canonical and common tiers before publication. Rows start `is_active=false` until approved.
- D-07: Hybrid review format: `PAIRING_REVIEW.md` dashboard + `REVIEW_QUEUE/pairings/{product_a}__{product_b}.md` per-pair files.
- D-08: Review checklist (14 items) covers clinical accuracy, tier correctness, timing, same_session_ok, sequencing order, content framing, forced-pairing test, source support, legal/safety caveats.

**Pair Generation Scope**
- D-09: Evaluate ALL 190 unique pairs. Emit DB rows for operationally useful relationships only. True rejects = report-only.
- D-10: Backfill `does_not_solve` for 2 missing products BEFORE running pairing evaluation.
- D-11: Batch evaluation by category pair in this sequence: neurotoxin × filler → neurotoxin × biostimulator → neurotoxin × energy → filler × biostimulator → filler × energy → biostimulator × energy → same-category alternatives → everything else.

**Content Fields**
- D-12: Full content (all 4 fields) for canonical/common only. Conditional: rationale + timing + conditions. compatible_only: short rationale. do_not_market: suppression rationale. Rejected: report-only.
- D-13: Staff talking points: hybrid clinical + consultation-ready tone. Education-first. No pressure language, overpromising, guarantees, or unqualified claims.
- D-14: Patient education text: provider-facing summary using "Tell the patient: ..." framing.

**Output & Deliverables**
- D-15: Required artifacts: PAIRING_EVALUATION.md, PAIRING_REVIEW.md, REVIEW_QUEUE/pairings/*.md, supabase/compile_sql/06-*.sql, PAIRING_RUBRIC.md, PAIRING_QA_REPORT.md, PAIRING_EVIDENCE_PACK.md, PAIRING_CORPUS_QUERY_LOG.md, DOES_NOT_SOLVE_BACKFILL.md, TAXONOMY_ADDITIONS.md.
- D-16: DB emission: canonical/common/conditional/compatible_only always get rows. do_not_market selectively. Rejected usually report-only.

**Corpus-First Enrichment Standard**
- D-17: Corpus querying is MANDATORY before finalizing any canonical/common/conditional/do_not_market tier. Use CMS Supabase RPCs (match_podcast_chunks, match_youtube_transcripts, match_pubmed_articles, match_industry_articles) on project `gjqicqldjgvrwmtkliie`.
- D-18: Per-pair query patterns include: `{A} {B}`, `combination treatment {A}`, `stacking {cat A} {cat B}`, `same session {A} {B}`, `sequencing {A} {B}`, `contraindication {A} {B}`, `{A} vs {B}`.
- D-19: New enrichment standard: structured A360 data → corpus query → LLM synthesis → source trail persistence → review artifact → DB emission.

**Known Pairing Candidates**
- D-20: Eight high-priority canonical/common hypotheses to validate (see CONTEXT.md — not final, Chris confirms after review).

**Known Flags/Rejects**
- D-21: Seven known safety/rejection flags: hyaluronidase + HA same day, same-class neurotoxin alternatives, same-class filler alternatives, filler-only liquid facelift overclaims, high-dose neurotoxin antibody concerns, HA filler near threads, any pair that fails "why both?".

### Claude's Discretion

- Gate evaluation prompt design and token management
- SQL pre-screen query optimization
- Batch size for corpus queries (balance thoroughness vs. cost)
- PAIRING_EVALUATION.md formatting and column layout
- How to handle pairs where corpus returns no evidence (flag as low-confidence)

### Deferred Ideas (OUT OF SCOPE)

- Multi-product combinations (3+ products) — Phase 8 territory
- Patient-facing education text at patient reading level — future if A360 adds direct patient comms
- Location-aware legal/regulatory pairing constraints (geo-gating) — future phase
- Automated corpus query pipeline integrated into compile system — future enrichment infrastructure
</user_constraints>

---

## Summary

Phase 6 is a pure content-intelligence phase: no new UI, no new API routes, minimal schema change. The deliverable is a fully evaluated 190-pair matrix, a set of reviewed item_relationships rows, and a suite of human-reviewable artifacts. The execution pattern mirrors previous phases — SQL pre-screen, corpus query, LLM synthesis, review artifact, DB emission — but at pair-level granularity instead of product-level.

The decisions are already made and locked in CONTEXT.md, backed by extensive podcast corpus research documented in `PHASE_6_ANSWERS_PODCAST_SOURCED.md`. That document contains verbatim expert quotes for every major decision — it is a primary source for this phase and must be read before any gate evaluation begins.

The two structural prerequisites before evaluation can start: (1) backfill `does_not_solve` for 2 missing products, (2) confirm `item_relationships` table exists with the correct shape (0 rows currently, 15 columns per CONTEXT.md code context). The ALTER TABLE to add `pairing_tier` is the only schema migration.

**Primary recommendation:** Plan Phase 6 as a linear sequence — Wave 0 (schema + backfill + rubric), Wave 1 (SQL pre-screen + corpus queries + category-pair evaluation batches), Wave 2 (DB emission), Wave 3 (review artifact generation + QA validation). Each wave must be completable independently with clear checkpoints.

---

## Standard Stack

### Core
| Library/Tool | Version | Purpose | Why Standard |
|---|---|---|---|
| Supabase MCP `execute_sql` | — | Run SQL against `aejskvmpembryunnbgrk` (GL DB) | Established pattern in all prior phases |
| Supabase JS client (`agentSupabase`) | current | Query GL DB from Node context | Wired in `lib/supabase.ts` |
| Supabase JS client (`cmsSupabase`) | current | Query CMS corpus (`gjqicqldjgvrwmtkliie`) | Wired in `lib/supabase.ts`, used in Phase 3/4 |
| Anthropic SDK (direct, not AI gateway) | latest | LLM gate evaluation | Per MEMORY: use direct Anthropic SDK for enrichment agents, not AI gateway |

### CMS Corpus RPCs (mandatory per D-17)
| RPC | Table | Corpus Size | Use |
|---|---|---|---|
| `match_podcast_chunks()` | podcast_chunks | 202,382 chunks | Primary source — expert discussion of combinations, sequencing, safety |
| `match_youtube_transcripts()` | youtube transcripts | 148K chunks | Secondary source — demo/clinical videos |
| `match_pubmed_articles()` | pubmed_articles | 37K chunks | Safety gate, claims support, adverse events |
| `match_industry_articles()` | industry_articles | 87K chunks | Practice standards, protocols |

### Supabase Projects (two distinct connections required)
| Project | ID | Purpose |
|---|---|---|
| GL DB | `aejskvmpembryunnbgrk` | item_relationships, products, item_concerns, does_not_solve — all schema + DB emission |
| CMS | `gjqicqldjgvrwmtkliie` | Corpus RPCs for corpus-first evidence retrieval |

### SQL Patterns in Use
| Pattern | Where Established | Apply Here |
|---|---|---|
| `INSERT...WHERE NOT EXISTS` with deduplication | Every phase since 02 | All item_relationships inserts |
| Enum casts: `'value'::enum_type` | Fixed in 05-01, documented in DB_STATE_BASELINE.md | relationship_type, relationship_strength |
| `is_active=false` on draft rows | Phase 2 (agent_reference_docs) | All canonical/common rows until Chris approves |
| SQL files in `supabase/compile_sql/06-*.sql` | Established convention | Schema migration + all INSERT files |

---

## Architecture Patterns

### Phase Execution Sequence

```
Wave 0 — Foundation
├── 06-00-schema.sql           ALTER TABLE item_relationships ADD COLUMN pairing_tier
├── DOES_NOT_SOLVE_BACKFILL.md  Document + SQL for 2 missing products
├── 06-00-backfill.sql          UPDATE products SET does_not_solve = [...] WHERE id IN (...)
└── PAIRING_RUBRIC.md           Tier defs, gate defs, hard stops, content-depth rules

Wave 1 — Evaluation (per category-pair batch, per D-11)
├── SQL pre-screen              JOIN item_concerns + does_not_solve to score concern overlap + limitation coverage
├── Corpus query                CMS RPCs per D-18 query patterns for each pair in batch
├── LLM gate evaluation         8-gate pass/fail with notes, using corpus evidence as context
└── PAIRING_EVALUATION.md       Accumulate all 190 results (gate-by-gate, tier assignment)

Wave 2 — DB Emission
├── 06-02-[batch]-inserts.sql   INSERT item_relationships rows per D-16 emission rules
└── 06-02-schema-verify.sql     SELECT COUNT(*) per tier, validate constraint compliance

Wave 3 — Review + QA
├── PAIRING_REVIEW.md           Executive dashboard: all canonical/common pairs in table
├── REVIEW_QUEUE/pairings/*.md  Per-pair detail files for canonical/common
├── PAIRING_EVIDENCE_PACK.md    Corpus evidence citations per high-value pair
├── PAIRING_CORPUS_QUERY_LOG.md Actual CMS queries used (reproducibility)
├── PAIRING_QA_REPORT.md        Completeness + consistency validation
└── TAXONOMY_ADDITIONS.md       Any new taxonomy needs discovered during evaluation
```

### Category-Pair Batching (per D-11)

The 20 products and their categories from `compile_manifest.json`:

| Category | Products |
|---|---|
| Neurotoxins | Botox Cosmetic, Dysport, Jeuveau, Daxxify, Xeomin (5 products) |
| HA Fillers | Juvederm Voluma XC, Juvederm Vollure XC, SKINVIVE by Juvederm, Restylane Lyft, RHA Redensity (5 products) |
| Biostimulators | Sculptra Aesthetic (1 product; Radiesse not in manifest) |
| RF Microneedling | InMode Morpheus8 (1 product) |
| Skin Tightening | Sofwave (1 product) |
| Ultrasound Lifting | Merz Ultherapy PRIME (1 product) |
| Pigment/Skin Rejuvenation | Lutronic Hollywood Spectra (1 product) |
| Body Contouring | CoolSculpting Elite (1 product) |
| Injectable Fat Reduction | Kybella (1 product) |
| Skin Care (treatment) | HydraFacial Syndeo (1 product, no category parent) |

**190 unique pairs breakdown:**

| Batch | Pair count | Priority |
|---|---|---|
| Neurotoxin × HA Filler | 5 × 5 = 25 | 1 (highest value) |
| Neurotoxin × Biostimulator | 5 × 1 = 5 | 2 |
| Neurotoxin × Energy (RF/Skin Tightening/Ultrasound/Laser) | 5 × 4 = 20 | 3 |
| HA Filler × Biostimulator | 5 × 1 = 5 | 4 |
| HA Filler × Energy | 5 × 4 = 20 | 5 |
| Biostimulator × Energy | 1 × 4 = 4 | 6 |
| Neurotoxin × Body/Fat/Skincare | 5 × 3 = 15 | 7 |
| HA Filler × Body/Fat/Skincare | 5 × 3 = 15 | 8 |
| Energy × Energy (cross-device) | C(4,2) = 6 | 9 |
| Energy × Body/Fat/Skincare | 4 × 3 = 12 | 10 |
| Body/Fat/Skincare × Body/Fat/Skincare | C(3,2) = 3 | 11 |
| Same-category alternatives (Neurotoxin × Neurotoxin) | C(5,2) = 10 | 12 |
| Same-category alternatives (HA Filler × HA Filler) | C(5,2) = 10 | 13 |
| Biostimulator × Body/Fat | 1 × 2 = 1 | 14 |
| Biostimulator × Skincare | 1 × 1 = 1 | 15 |
| **Total** | **~190** | |

Note: verify exact count before Wave 1; the table above is a working approximation.

### SQL Pre-Screen Pattern

```sql
-- For a candidate pair (product_a_id, product_b_id):
-- Gate 1: Concern overlap
SELECT COUNT(*) as shared_concerns
FROM item_concerns ic_a
JOIN item_concerns ic_b ON ic_b.concern_id = ic_a.concern_id
WHERE ic_a.offering_id = :product_a_id
  AND ic_b.offering_id = :product_b_id;

-- Gate 3: Limitation coverage (does A's limitation appear in B's concerns?)
SELECT p_a.does_not_solve, ic_b.concern_id, c.name as concern_name
FROM products p_a
CROSS JOIN item_concerns ic_b
JOIN concerns c ON c.id = ic_b.concern_id
WHERE p_a.id = :product_a_id
  AND ic_b.offering_id = :product_b_id;
-- Match: does any ic_b concern name or c.patient_description semantically overlap with p_a.does_not_solve elements?
-- (SQL can do string-level check; LLM does semantic matching)

-- Gate 4: Timing compatibility signals
SELECT p_a.interval_between_treatments, p_a.same_session_compatible,
       p_b.interval_between_treatments, p_b.same_session_compatible
FROM products p_a, products p_b
WHERE p_a.id = :product_a_id AND p_b.id = :product_b_id;
```

### item_relationships INSERT Pattern

```sql
-- Canonical/common pairs: is_active = false until Chris approves
INSERT INTO item_relationships (
  id,
  item_a_id,
  item_b_id,
  relationship_type,       -- 'complementary' | 'stacks_with' | 'sequential' | 'enhances' | 'alternative' | 'contraindicated'
  relationship_strength,   -- 'strong' | 'moderate' | 'weak'
  pairing_tier,            -- 'canonical' | 'common' | 'conditional' | 'compatible_only' | 'do_not_market' | 'rejected'
  clinical_rationale,
  timing_guidance,
  same_session_ok,
  patient_education_text,  -- canonical/common only: "Tell the patient: ..."
  staff_talking_points,    -- canonical/common only: education-first hybrid tone
  is_bidirectional,
  is_active,               -- FALSE until Chris review for canonical/common
  source_reference
)
SELECT
  gen_random_uuid(),
  :item_a_id,
  :item_b_id,
  :relationship_type::relationship_type,
  :relationship_strength::relationship_strength,
  :pairing_tier,
  :clinical_rationale,
  :timing_guidance,
  :same_session_ok,
  :patient_education_text,
  :staff_talking_points,
  :is_bidirectional,
  false,  -- draft until Chris review
  :source_reference
WHERE NOT EXISTS (
  SELECT 1 FROM item_relationships
  WHERE (item_a_id = :item_a_id AND item_b_id = :item_b_id)
     OR (item_a_id = :item_b_id AND item_b_id = :item_a_id)
);
```

### Anti-Patterns to Avoid

- **Generating pairing intelligence from LLM training data alone.** The corpus query is mandatory. If the corpus returns no evidence, flag as LOW_CONFIDENCE and do not tier above `conditional`.
- **Skipping does_not_solve backfill.** Two products are missing it. Without it, the limitation-coverage gate (Gate 3) cannot run. Do not start Wave 1 until Wave 0 is complete.
- **Assigning canonical/common without corpus evidence.** Pairing D-20 hypotheses are starting points, not conclusions. Each must survive all 8 gates with evidence.
- **Writing staff talking points as upsell scripts.** The podcast corpus is emphatic: education-first. "Attachment rate — it sounds like sell, sell, sell. It's not. It's educate, educate, educate." (Lacey Lobetta, Medical Millionaire)
- **Creating relationship rows for 3+ product combinations.** That is Phase 8. This phase is pairwise only.
- **Using IS NULL for concern overlap as a pair signal.** Products with zero item_concerns cannot be SQL pre-screened for Gate 1. If a product has 0 item_concerns, log that as a data gap and rely on dossier content + LLM evaluation.

---

## The 8-Gate Legitimacy Test

Each gate is pass/fail with free-text notes. Safety gate is a hard stop — failure blocks canonical/common.

| Gate | # | Data Sources | SQL-derivable? | Hard Stop? |
|---|---|---|---|---|
| Concern Overlap | 1 | `item_concerns` JOIN | YES | No |
| Mechanism Complementarity | 2 | `does_not_solve` + dossier prose + corpus | Partially | No |
| Limitation Coverage | 3 | `does_not_solve` | YES (string match) / LLM (semantic) | No |
| Timing Compatibility | 4 | `products.interval_*` columns + corpus | Partially | No |
| Safety | 5 | Dossier clinical sections + corpus (PubMed primary) | No — LLM/manual | YES |
| Commercial Viability | 6 | Practice economics judgment + corpus | No — judgment | No |
| Patient Clarity | 7 | Can a patient understand why both? — LLM | No — judgment | No |
| Source Support | 8 | `evidence_links` + corpus chunks | Partially | No |

**Safety gate hard stop rule:** If Gate 5 fails (safety), the pair CANNOT be tiered canonical or common. Maximum tier is `conditional` with explicit safety conditions, or `do_not_market`/`rejected`.

**No-corpus rule:** If Corpus returns no evidence for a pair across all 4 sources, the pair can be tiered at most `conditional` (with explicit low-confidence flag) or `compatible_only`. It cannot receive canonical/common without expert evidence.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Corpus search | Custom vector search | CMS Supabase RPCs (`match_podcast_chunks` etc.) | Already indexed, embedded, and production-ready |
| Deduplication of relationship rows | Manual WHERE NOT EXISTS logic | Established INSERT...SELECT WHERE NOT EXISTS pattern | Used since Phase 02; prevents duplicates on re-runs |
| Pair enumeration | Custom combinatorics code | SQL CROSS JOIN with `WHERE item_a_id < item_b_id` | Generates all unique ordered pairs from product list |
| Concern overlap scoring | Custom scoring engine | SQL pre-screen JOIN (already designed above) | item_concerns table has 139 rows — sufficient for structured query |
| Gate evaluation | Multi-prompt LLM chain from scratch | Single structured LLM prompt per pair with all 8 gates | Token-efficient; gate-by-gate output in one call |

**Key insight:** This phase has no novel infrastructure to build. The only new SQL is one ALTER TABLE + INSERT statements. All tooling (Supabase MCP, CMS RPCs, review file pattern) is already established.

---

## Known Pairing Intelligence (from PHASE_6_ANSWERS_PODCAST_SOURCED.md)

This research document is the most valuable Phase 6 input. It contains verbatim expert quotes for all major decisions, a same-session compatibility matrix, specific timing intervals, and a ranked canonical candidates list. It must be loaded as context for the LLM gate evaluation step.

### Podcast-Confirmed Canonical Candidates (evidence strength order)

| Rank | Pairing | Evidence | Key Quote |
|---|---|---|---|
| 1 | Neurotoxin + HA Filler | 5/5 | "90-woman dose-ranging study... Combination one, hands down." |
| 2 | Sculptra + HA Filler | 5/5 | "Biostimulator builds foundation; HA provides immediate structural contour" |
| 3 | Sculptra + RF Microneedling | 4/5 | "RF tightens + stimulates fibroblasts; Sculptra restores volume" |
| 4 | PRP + RF Microneedling | 4/5 | "I would encourage everyone to do PRP with any RF microneedling" |
| 5 | Neurotoxin + HA Filler + Energy | 4/5 | Dr. Teri Fisher "BoNT-A Synergy" + Tracy Mancuso stacking protocol |

### Podcast-Confirmed Safety Flags

| Flag | Rule | Source |
|---|---|---|
| Hyaluronidase + HA filler same day | REJECT — wait min 2 days, ideally 6 weeks | Amy Lynn, Medical Spa Insider |
| >50 units neurotoxin per session | FLAG — antibody formation risk | Dr. Wanitphakdeedecha, Business of Injecting Ep 184 |
| Filler-only "liquid facelift" for 50+ patients | FLAG — tissue laxity exceeds what filler can lift | Dr. Subbio, Business of Injecting Ep 70 |
| Botox + Filler same session (France) | FLAG — legal prohibition | Dr. Martschin, Business of Injecting Ep 169 |
| HA filler near existing threads | CONDITIONAL — different planes, technique-sensitive | Dr. Gordon Ku, Business of Injecting Ep 46 |
| Post-cannula: makeup same day | FLAG — infection risk; 48-hour wait | Complications discussion |

### Same-Session Compatibility Matrix (podcast-sourced)

| Combination | Same Session? | Key Detail |
|---|---|---|
| HA filler (deep/bone) + PDO Threads (subcutaneous) | YES | Different tissue planes |
| Restylane fern pattern + Sculptra subdermal | YES | Restylane for surface details; Sculptra underneath |
| Microtoxin (intradermal) + Regular toxin (intramuscular) + NCTF | YES | Reduces visit count = reduces antibody risk |
| Biostimulator (CaHA) + RF Microneedling + Laser | YES | "Combined treatments on same day are future of aesthetics" |
| Non-inflammatory chemical peel + Any injectable | YES | "You can do chemical peel with basically every treatment" |
| Two different toxin brands same patient | YES | "Because of their subtle nuances" |
| Hyaluronidase + HA filler | NO | Micro channels cause HA to spread |
| Filler + Botulinum toxin (France) | NO | Legal prohibition |

### Sequencing Rules (critical for same-session evaluation)

| If pairing includes | Sequence rule | Source |
|---|---|---|
| Sculptra + PDO Threads | Sculptra FIRST, then threads | "Threads grab the new collagen" — podcast ep 723a81ab |
| Sculptra + HA Filler | Sculptra for foundation, HA for contour | "Sculpt & Lift" protocol |
| Energy devices + Injectables | Energy first, injectables after (generally) | Tracy Mancuso stacking protocol |
| Skincare/laser + Injectables | Skincare/laser foundation before injectables | "If skin looks like crap, filler won't satisfy" |
| Neurotoxin + Filler same session | Neurotoxin first → filler | General expert consensus |

---

## Common Pitfalls

### Pitfall 1: does_not_solve Gaps Block Gate 3
**What goes wrong:** Two products don't have `does_not_solve` populated. Gate 3 (limitation coverage) fails silently — the SQL returns nothing, and the LLM has no structured limitation data to evaluate complementarity.
**Why it happens:** STRUCTURED_COVERAGE.md shows 12 products had NULL does_not_solve at end of Phase 2; Phase 5 SQL execution fixed most but 2 remain unconfirmed.
**How to avoid:** Wave 0 must include a verification query (`SELECT id, name FROM products WHERE does_not_solve IS NULL OR array_length(does_not_solve,1) = 0`) and backfill before Wave 1 starts.
**Warning signs:** Gate 3 producing empty results for any pair that should clearly show limitation complementarity.

### Pitfall 2: pairing_tier Column Doesn't Exist Yet
**What goes wrong:** INSERT to item_relationships fails with "column pairing_tier does not exist."
**Why it happens:** The column must be added via ALTER TABLE before any inserts. The table has 0 rows currently so there is no migration risk.
**How to avoid:** 06-00-schema.sql must run first, before any other SQL in this phase. Add a CHECK constraint: `CHECK (pairing_tier IN ('canonical','common','conditional','compatible_only','do_not_market','rejected'))`.
**Warning signs:** Any SQL execution error mentioning pairing_tier in column list.

### Pitfall 3: Forced Pairing (the Anti-pattern)
**What goes wrong:** A pair passes Gates 1-4 structurally but lacks genuine clinical rationale. The "why both?" is circular or promotional.
**Why it happens:** SQL pre-screen sees concern overlap and limitation coverage, and the LLM synthesizes a plausible-sounding rationale without strong corpus evidence.
**How to avoid:** Require Gate 8 (source support) to have at least one corpus chunk with direct evidence of the combination. "Sounds reasonable" is not sufficient — experts must have discussed it.
**Warning signs:** clinical_rationale contains language like "can complement" or "may enhance" without a specific mechanism; source_reference is empty.

### Pitfall 4: same_session_ok Incorrectly Set to TRUE
**What goes wrong:** A pair that requires staged treatment is marked same_session_ok=true, enabling unsafe same-day recommendations.
**Why it happens:** Gate 4 (timing) is partially SQL-derivable but the interval columns may not capture same-session contraindications.
**How to avoid:** Hyaluronidase + HA filler is the known hard case (same-day = NO). Cross-check all pairs where either product involves a dissolving agent, inflammatory mechanism, or the 48-hour post-cannula rule.
**Warning signs:** any pair where one product is hyaluronidase, inflammatory (e.g., prolotherapy), or high-dose toxin and same_session_ok is true.

### Pitfall 5: Corpus Query Returns No Results ≠ Safe to Ignore
**What goes wrong:** CMS returns 0 chunks for a pair query, and the evaluator treats this as "no evidence against" rather than "insufficient evidence for."
**Why it happens:** The 190-pair scope includes many legitimate pairs that simply haven't been discussed in podcast content yet (e.g., niche energy device combinations).
**How to avoid:** Zero corpus evidence = LOW_CONFIDENCE flag in PAIRING_EVALUATION.md and maximum tier of `conditional`. Log the query in PAIRING_CORPUS_QUERY_LOG.md.
**Warning signs:** canonical/common tiers with empty source_reference field or no PAIRING_EVIDENCE_PACK.md entry.

### Pitfall 6: Missing Enum Casts in SQL
**What goes wrong:** INSERT fails with type mismatch on `relationship_type` or `relationship_strength`.
**Why it happens:** These are custom enum types; PostgreSQL rejects string literals without explicit cast.
**How to avoid:** Always cast: `'complementary'::relationship_type`, `'strong'::relationship_strength`. Documented in DB_STATE_BASELINE.md and repeated across Phase 2/5 SQL bug fixes.
**Warning signs:** PostgreSQL error "invalid input value for enum relationship_type."

### Pitfall 7: Review Files Without is_active=false Enforcement
**What goes wrong:** canonical/common rows go live in the DB before Chris has reviewed them.
**Why it happens:** Forgetting to set `is_active=false` in the INSERT, or manually flipping rows active during debugging.
**How to avoid:** Hard-code `is_active=false` in all canonical/common INSERT templates. The review workflow (D-06) explicitly requires Chris to flip to active after checklist sign-off.
**Warning signs:** Any `is_active=true` row for pairing_tier='canonical' or 'common' without a corresponding REVIEW_QUEUE sign-off file.

---

## Code Examples

### Pair Enumeration SQL (generate all 190 pairs)
```sql
-- Source: established pattern, adapted from SQL CROSS JOIN
SELECT
  p_a.id AS item_a_id,
  p_a.name AS product_a,
  p_a.category_id AS category_a,
  p_b.id AS item_b_id,
  p_b.name AS product_b,
  p_b.category_id AS category_b,
  COALESCE(array_length(p_a.does_not_solve,1), 0) AS a_limitations,
  COALESCE(array_length(p_b.does_not_solve,1), 0) AS b_limitations
FROM products p_a
JOIN products p_b ON p_a.id < p_b.id  -- ensures unique pairs, no self-joins
WHERE p_a.id IN (/* 20 product IDs from compile_manifest.json */)
  AND p_b.id IN (/* same list */)
ORDER BY category_a, category_b, product_a, product_b;
```

### Gate 1 + 3 Combined Pre-Screen
```sql
-- For a given pair, compute SQL-derivable gate signals
WITH concern_overlap AS (
  SELECT COUNT(*) as overlap_count
  FROM item_concerns ic_a
  JOIN item_concerns ic_b ON ic_b.concern_id = ic_a.concern_id
  WHERE ic_a.offering_id = :item_a_id
    AND ic_b.offering_id = :item_b_id
),
limitations_a AS (
  SELECT does_not_solve FROM products WHERE id = :item_a_id
),
limitations_b AS (
  SELECT does_not_solve FROM products WHERE id = :item_b_id
),
concerns_b AS (
  SELECT c.name FROM item_concerns ic JOIN concerns c ON c.id = ic.concern_id
  WHERE ic.offering_id = :item_b_id
),
concerns_a AS (
  SELECT c.name FROM item_concerns ic JOIN concerns c ON c.id = ic.concern_id
  WHERE ic.offering_id = :item_a_id
)
SELECT
  (SELECT overlap_count FROM concern_overlap) AS gate_1_concern_overlap,
  (SELECT does_not_solve FROM limitations_a) AS a_does_not_solve,
  (SELECT does_not_solve FROM limitations_b) AS b_does_not_solve,
  (SELECT array_agg(name) FROM concerns_b) AS b_concerns,
  (SELECT array_agg(name) FROM concerns_a) AS a_concerns;
```

### PAIRING_RUBRIC.md Content Skeleton

The PAIRING_RUBRIC.md must define these clearly before Wave 1:

```markdown
## Tier Definitions
- canonical: universally recommended; all 8 gates pass; strong corpus evidence; sequencing documented
- common: widely practiced; 7-8 gates pass; moderate corpus evidence; useful for most patients
- conditional: works under specific conditions; 5-7 gates with explicit conditions noted
- compatible_only: technically safe to combine; no strong clinical rationale to actively recommend
- do_not_market: relationship exists (esp. alternatives) but should not be recommended as combination
- rejected: fails safety gate OR "why both?" is empty; report-only

## Gate Definitions
[...one paragraph per gate with pass/fail criteria...]

## Hard Stops
- Safety gate fail → cannot be canonical/common
- "Why both?" is promotional or circular → REJECT or do_not_market
- No corpus evidence → cannot be canonical/common

## Content Depth Rules
[...per D-12...]
```

### LLM Gate Evaluation Prompt Structure (Claude's Discretion to implement)
```
System: You are evaluating a product pairing for a medical aesthetics platform.
        Be accurate, conservative, and evidence-based. Cite sources.

User: Evaluate the pairing: {Product A} + {Product B}

Product A structured data:
- item_concerns: [...]
- does_not_solve: [...]
- [key fields from dossier]

Product B structured data:
- item_concerns: [...]
- does_not_solve: [...]
- [key fields from dossier]

Corpus evidence retrieved:
[chunks from match_podcast_chunks, match_pubmed_articles, etc.]

Evaluate all 8 gates. For each gate: PASS or FAIL, then one sentence of rationale.
Then output: recommended_tier, relationship_type, relationship_strength, clinical_rationale,
timing_guidance, same_session_ok (true/false), patient_education_text (if canonical/common),
staff_talking_points (if canonical/common).
```

---

## Schema: item_relationships (Current + Change Required)

### Current Columns (0 rows, 15 columns)
```sql
item_relationships (
  id UUID PRIMARY KEY,
  item_a_id UUID REFERENCES products(id),
  item_b_id UUID REFERENCES products(id),
  relationship_type relationship_type,  -- enum: complementary/stacks_with/sequential/enhances/alternative/contraindicated
  relationship_strength relationship_strength, -- enum: strong/moderate/weak
  clinical_rationale TEXT,
  timing_guidance TEXT,
  same_session_ok BOOLEAN,
  patient_education_text TEXT,
  staff_talking_points TEXT,
  is_bidirectional BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT false,
  source_reference TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

### Required Migration (Wave 0)
```sql
-- 06-00-schema.sql
ALTER TABLE item_relationships
ADD COLUMN IF NOT EXISTS pairing_tier TEXT
CHECK (pairing_tier IN ('canonical','common','conditional','compatible_only','do_not_market','rejected'));
```

### Products Missing does_not_solve (need Wave 0 backfill)
Must verify which 2 products before starting. Verification query:
```sql
SELECT id, name,
       does_not_solve,
       COALESCE(array_length(does_not_solve,1), 0) as limitation_count
FROM products
WHERE id IN (
  '4b92be36-e84e-432c-8549-f5d85a767fdb', -- Botox (known: 8 entries)
  '6c8f72f0-887f-484a-a588-0bb9bd8052c9', -- Voluma XC (known: 7 entries)
  '7370545f-97a3-4519-a92d-3ac4f969829d', -- Vollure XC (known: 6 entries)
  'b74d5475-bf58-4d7d-87f5-2c8dc9e252de', -- SKINVIVE (known: 7 entries)
  'f1732c7c-3f19-4f3d-9aff-543a132e5506', -- Restylane Lyft (known: 6 entries)
  'd8a00419-39e1-4d4b-8dab-ad134fb00930', -- RHA Redensity (known: 7 entries)
  '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa', -- Sculptra (known: NULL* pending SQL exec)
  '0f901fec-5de5-4950-815e-82c3e47cb2ec', -- Kybella (known: NULL*)
  '694ea839-cf8f-4a17-b838-2588674c792f', -- CoolSculpting (known: NULL*)
  '84ac561e-1818-4ece-a8d7-1fb6c5ea80df', -- Morpheus8 (known: NULL*)
  '78973d13-fa36-41dd-8625-4b851ff143ed', -- Sofwave (known: NULL*)
  'da25d447-c316-40b2-802e-e190c0bdbd9f', -- Ultherapy PRIME (known: NULL*)
  'be46f975-99d7-4772-867e-744814626654', -- Hollywood Spectra (known: NULL*)
  '28918bda-787b-412a-9802-d3d9a00e6ab1', -- HydraFacial (known: NULL*)
  'a7e1b29e-da10-40de-bea8-70d6e6624f43', -- Dysport (known: NULL*)
  '8adda68a-9fd2-49ad-8852-641970135131', -- Jeuveau (known: NULL*)
  '007d98fd-58b5-4d20-be11-caf421c0dccb', -- Daxxify (known: NULL*)
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'  -- Xeomin (known: NULL*)
)
ORDER BY limitation_count, name;
```

Note: STRUCTURED_COVERAGE.md shows the 02-05 SQL (which contains does_not_solve for Dysport, Jeuveau, Daxxify, Xeomin, and energy devices) was fixed and executed in Plan 05-01. However, the exact live state must be confirmed at Wave 0 start — the "2 missing" from CONTEXT.md D-10 may already have been resolved by Phase 5 SQL execution.

---

## Environment Availability

| Dependency | Required By | Available | Notes |
|---|---|---|---|
| Supabase MCP `execute_sql` | All SQL execution | Yes | Used in every prior phase |
| GL Supabase project `aejskvmpembryunnbgrk` | DB writes | Yes | Active, all prior phases use this |
| CMS Supabase project `gjqicqldjgvrwmtkliie` | Corpus RPCs | Yes | Used in Phase 4 source-ingestion research |
| Anthropic SDK (direct) | LLM gate evaluation | Yes | Per MEMORY: direct SDK, not AI gateway |
| `item_relationships` table | DB emission | Yes (0 rows) | Exists, needs pairing_tier column added |
| `does_not_solve` column | Gate 3 pre-screen | Partially | Exists; ~2 products may need backfill |

---

## Validation Architecture

Nyquist validation is not explicitly disabled in `.planning/config.json` (only `_auto_chain_active: false` is set). However, this phase is a pure data-enrichment phase — there are no application code changes, no test files, and no test framework in scope. Validation takes the form of SQL verification queries rather than unit tests.

### Phase Verification Approach

| Check | Type | Command |
|---|---|---|
| pairing_tier column exists | SQL | `SELECT column_name FROM information_schema.columns WHERE table_name='item_relationships' AND column_name='pairing_tier'` |
| All 190 pairs in PAIRING_EVALUATION.md | Manual count | Count rows in evaluation matrix |
| Canonical/common rows have is_active=false | SQL | `SELECT COUNT(*) FROM item_relationships WHERE pairing_tier IN ('canonical','common') AND is_active=true` — expect 0 |
| No NULL clinical_rationale on emitted rows | SQL | `SELECT COUNT(*) FROM item_relationships WHERE clinical_rationale IS NULL AND pairing_tier IS NOT NULL` — expect 0 |
| Safety gate hard stop respected | Manual | Review PAIRING_EVALUATION.md for any pair where Gate 5 = FAIL but tier = canonical/common — expect 0 |
| does_not_solve populated for all 20 products | SQL | `SELECT COUNT(*) FROM products WHERE (does_not_solve IS NULL OR array_length(does_not_solve,1) = 0) AND id IN (/*20 product IDs*/)` — expect 0 |
| No forced pairings | Manual | PAIRING_QA_REPORT.md completeness audit |

### Wave 0 Gaps
- [ ] `supabase/compile_sql/06-00-schema.sql` — pairing_tier ALTER TABLE
- [ ] `supabase/compile_sql/06-00-backfill.sql` — does_not_solve backfill for missing products
- [ ] `PAIRING_RUBRIC.md` — tier defs, gate defs, hard stops, content-depth rules

*(No unit test framework needed — this is a data enrichment phase)*

---

## State of the Art

| Old Approach | Current Approach | Impact |
|---|---|---|
| item_relationships had no tier concept | pairing_tier column distinguishes business decision from clinical metadata | Agents can query by tier to get actionable vs. informational relationships |
| Pairings generated from training data alone | Corpus-first: podcast/PubMed/YouTube/industry evidence required before finalizing tier | Pairing intelligence is grounded in expert opinion, not LLM speculation |
| No combination intelligence layer | Phase 6 is foundational; Phases 7/8/9 build on top | All downstream combination, timing, and care-plan phases depend on Phase 6 rows |

---

## Open Questions

1. **Which 2 products are still missing does_not_solve?**
   - What we know: CONTEXT.md D-10 says "2 products missing it before Phase 6." Phase 5 (05-01) executed does_not_solve SQL for Dysport, Jeuveau, Daxxify, Xeomin, and energy devices. It's unclear which 2 remain.
   - What's unclear: Live DB state at time of Phase 6 start.
   - Recommendation: Wave 0 task starts with the verification query above; planner should frame this as a conditional task ("verify and backfill as needed").

2. **HydraFacial Syndeo has no category_id in compile_manifest.json**
   - What we know: Its offering_id is `28918bda-787b-412a-9802-d3d9a00e6ab1`; it has 4 dossier docs; category = NULL.
   - What's unclear: Whether pairing with HydraFacial should use a category-pair batch or treat it as its own category.
   - Recommendation: Treat HydraFacial as "Skin Care / Treatment" category for batching purposes. Pairs with HydraFacial belong in the "Neurotoxin/Filler/Energy × Skincare" batches.

3. **PDO Threads are not in the 20-product catalog**
   - What we know: Multiple podcast experts discuss PDO Threads + Sculptra and PDO Threads + HA Filler + Botox as high-value combos. But PDO Threads is not a Phase 6 catalog product.
   - What's unclear: Should these combinations be documented as `TAXONOMY_ADDITIONS.md` items for Phase 13 (services-expansion), or flagged within the Sculptra/HA filler row commentary?
   - Recommendation: When Sculptra rows are authored, note in `staff_talking_points` that "when PDO threads are offered, consider Sculptra before threads." Log threads as a Phase 13 product candidate in TAXONOMY_ADDITIONS.md.

---

## Sources

### Primary (HIGH confidence)
- `.planning/phases/06-pairing-engine/06-CONTEXT.md` — locked decisions D-01 through D-21
- `.planning/phases/06-pairing-engine/PHASE_6_ANSWERS_PODCAST_SOURCED.md` — verbatim expert quotes from 202K+ chunk corpus, full same-session matrix, timing intervals, ranked canonical candidates
- `.planning/phases/02-dossier-batch/STRUCTURED_EMISSION_ADDENDUM.md` — does_not_solve pattern, SQL emission conventions
- `.planning/phases/05-concern-language/CONCERN_CLUSTERS.md` — cluster definitions and routing demo results
- `.planning/phases/05-concern-language/DB_STATE_BASELINE.md` — schema ground truth, enum types, laterality rules
- `compile_manifest.json` — 20 product IDs, category assignments
- `.planning/phases/02-dossier-batch/STRUCTURED_COVERAGE.md` — per-product coverage state

### Secondary (MEDIUM confidence)
- `.planning/GL_GSD_ROADMAP.md` — Phase 6 definition and dependency map
- `supabase/migrations/20260612_add_does_not_solve_backfill_authority_rank.sql` — migration precedent

### Tertiary (LOW confidence — training data)
- General knowledge of aesthetic medicine combination protocols — used only where corpus evidence supports the claim

---

## Metadata

**Confidence breakdown:**
- Schema decisions: HIGH — locked in CONTEXT.md, existing table structure verified
- Pairing candidates: HIGH — backed by verbatim podcast expert quotes in PHASE_6_ANSWERS_PODCAST_SOURCED.md
- Safety flags: HIGH — direct expert citations across multiple shows
- Execution sequence: HIGH — mirrors established Phase 2/5 patterns
- Exact does_not_solve gap: MEDIUM — needs live DB verification at Wave 0

**Research date:** 2026-06-13
**Valid until:** Stable (no external API dependencies; validity contingent on DB state not changing before Phase 6 execution)
