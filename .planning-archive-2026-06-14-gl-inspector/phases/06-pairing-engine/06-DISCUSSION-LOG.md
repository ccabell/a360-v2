# Phase 06: pairing-engine - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-13
**Phase:** 06-pairing-engine
**Areas discussed:** Tiering model, 8-gate evaluation, Review workflow, Pair generation scope, Content fields, Output & deliverables, Known pairings/flags, Corpus-first workflow
**Method:** Claude generated PHASE_6_QUESTIONS.md (19 questions), Chris took questions to podcast corpus + GPT for parallel research, returned comprehensive corpus-backed implementation brief with 22 total decisions.

---

## Tiering Model

| Option | Description | Selected |
|--------|-------------|----------|
| A) Add pairing_tier column | 6-tier enum separate from existing relationship_type/strength | ✓ |
| B) Map tiers to existing enums | No schema change, reuse type+strength combinations | |
| C) Something else | | |

**User's choice:** A — Add pairing_tier column with canonical/common/conditional/compatible_only/do_not_market/rejected
**Notes:** Tier is the business/recommendation decision; relationship_type/strength are clinical metadata. Podcast evidence supports this distinction.

| Option | Description | Selected |
|--------|-------------|----------|
| A) Emit alternatives | alternative type + do_not_market tier | ✓ |
| B) Skip alternatives | Only emit combinable pairs | |

**User's choice:** A — Emit alternatives as relationship_type=alternative + pairing_tier=do_not_market
**Notes:** Alternatives are valuable for substitution logic, brand preference, clinical nuance.

## 8-Gate Evaluation

| Option | Description | Selected |
|--------|-------------|----------|
| A) SQL pre-screen + LLM | Hybrid approach | |
| A upgraded) SQL + corpus + LLM | Added mandatory corpus retrieval step | ✓ |
| B) Full LLM | Feed every pair through LLM | |
| C) Manual | Chris manually tiers 190 pairs | |

**User's choice:** A upgraded — SQL pre-screen + corpus evidence retrieval + LLM gate evaluation
**Notes:** Critical upgrade: corpus retrieval is MANDATORY between SQL pre-screen and LLM evaluation. The podcast/YouTube/PubMed corpus has pre-answered most pairing questions.

| Option | Description | Selected |
|--------|-------------|----------|
| A) Pass/fail per gate | Binary, X/8 threshold | |
| B) Graded 0-3 | Numeric scoring | |
| C) Pass/fail with notes | Binary + free-text rationale | ✓ |

**User's choice:** C — Pass/fail with notes. Safety is hard stop.

| Option | Description | Selected |
|--------|-------------|----------|
| A) Persist as report file | Gate details in PAIRING_EVALUATION.md, summary in DB | ✓ |
| B) Persist in DB JSONB | Full gate object in item_relationships | |
| C) Don't persist | Ephemeral evaluation | |

**User's choice:** A — Report file for audit trail, DB for operational fields only.

## Review Workflow

| Option | Description | Selected |
|--------|-------------|----------|
| A) Canonical + common only | Active recommendation tiers need review | ✓ |
| B) Everything except rejected | Review all tiers with DB rows | |
| C) Canonical only | Common auto-approved | |

**User's choice:** A — Chris reviews canonical/common before publication. Rows start is_active=false.

| Option | Description | Selected |
|--------|-------------|----------|
| A) REVIEW_QUEUE per pair | Individual markdown files | |
| B) Single review doc | One big table | |
| C) Supabase status | DB-level review | |
| D) Hybrid | Dashboard + individual files | ✓ |

**User's choice:** D — PAIRING_REVIEW.md dashboard + REVIEW_QUEUE/pairings/*.md per pair.

**Checklist expanded:** Added sequencing, source support, tier correctness, compliance checks to original 6-item checklist.

## Pair Generation Scope

| Option | Description | Selected |
|--------|-------------|----------|
| A) Evaluate all 190 | Complete explicit tiering | ✓ (clarified) |
| B) Pre-filter obvious rejects | Skip same-category | |

**User's choice:** A clarified — Evaluate all 190 in report. Emit DB rows only for operationally useful relationships. True rejects = report-only.

| Option | Description | Selected |
|--------|-------------|----------|
| A) Backfill does_not_solve first | Quick task before evaluation | ✓ |
| B) Evaluate without it | Infer from dossiers | |
| C) Skip those products | Exclude, add later | |

**User's choice:** A — Backfill the 2 missing products before pairing evaluation starts.

| Option | Description | Selected |
|--------|-------------|----------|
| A) Batch by category pair | Logical grouping | ✓ |
| B) Alphabetical | Simple A-Z | |
| C) By expected tier | High-value first | |

**User's choice:** A — Batch by category pair, sort likely high-value pairs first within each batch.

## Content Fields

All three content questions answered with recommended options (A, C hybrid, B provider-facing).

## Output & Deliverables

Expanded from 4 artifacts to 10. Added: PAIRING_RUBRIC.md, PAIRING_QA_REPORT.md, PAIRING_EVIDENCE_PACK.md, PAIRING_CORPUS_QUERY_LOG.md, DOES_NOT_SOLVE_BACKFILL.md.

DB emission: nuanced rule — do_not_market emitted selectively (not blanket yes/no).

## Corpus-First Workflow (Q8.1-Q8.3 — new decisions)

Three additional implementation directives establishing:
1. Corpus querying is mandatory before final tier decisions
2. Future enrichment answers should include decision + corpus-query pack
3. New enrichment standard: corpus-first, evidence-traced enrichment for all phases going forward

## Claude's Discretion

- Gate evaluation prompt design and token management
- SQL pre-screen query optimization
- Batch size for corpus queries
- PAIRING_EVALUATION.md formatting
- Handling pairs with no corpus evidence (flag low-confidence)

## Deferred Ideas

- Multi-product combinations (3+) — Phase 8
- Patient-facing education at patient reading level — future
- Location-aware legal/regulatory constraints — future
- Automated corpus query pipeline — future infrastructure
