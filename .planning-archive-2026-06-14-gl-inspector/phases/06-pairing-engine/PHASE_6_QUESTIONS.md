# Phase 6: Pairing Engine — Questions for Chris

Answer inline or annotate. Anything left blank = Claude's discretion.

---

## 1. Tiering Model

The roadmap describes 6 tiers: **canonical / common / conditional / compatible_only / do_not_market / rejected**.

The existing `item_relationships` schema has two enums:
- `relationship_type`: complementary, stacks_with, sequential, enhances, alternative, contraindicated
- `relationship_strength`: strong, moderate, weak

**Q1.1:** Do you want the 6-tier system from the roadmap, or are the existing enums sufficient?

Options:
- **A) Add a `pairing_tier` column** with the 6 values from the roadmap. Keep relationship_type/strength as separate dimensions. (Recommended — tier is the business decision, type/strength are clinical metadata)
- **B) Map tiers to existing enums** — e.g., canonical = complementary+strong, rejected = contraindicated. No schema change.
- **C) Something else:** ___

**Q1.2:** Should `alternative` pairs (e.g., Botox vs Dysport) get relationship rows, or are they out of scope for pairings?

- **A) Yes, emit them** as `alternative` type + `do_not_market` tier — documents the relationship without marketing it
- **B) No, skip alternatives entirely** — only emit pairs that could be combined/stacked
- **C) Something else:** ___

---

## 2. The 8-Gate Legitimacy Test

Each pair must pass 8 gates: concern, mechanism, limitation, timing, safety, commercial, patient clarity, source support.

**Q2.1:** How should we evaluate the gates? The data sources differ per gate:

| Gate | Likely data source | Can be SQL-derived? |
|------|-------------------|---------------------|
| Concern overlap | item_concerns join | Yes |
| Mechanism complementarity | does_not_solve + dossier prose | Partially |
| Limitation coverage | does_not_solve | Yes |
| Timing compatibility | products.interval columns + dossier prose | Partially |
| Safety | dossier clinical sections + contraindications | No — needs LLM or manual |
| Commercial viability | practice economics / same-visit feasibility | No — needs judgment |
| Patient clarity | can a patient understand why both? | No — needs judgment |
| Source support | evidence_links for the combination | Partially |

Options:
- **A) Hybrid: SQL pre-screen + LLM evaluation** — Use SQL to pre-filter (concern overlap, does_not_solve complementarity), then LLM-evaluate remaining candidates through all 8 gates using dossier content. (Recommended)
- **B) Full LLM evaluation** — Feed every pair through an LLM prompt with all dossier content. More thorough but slower and more expensive.
- **C) Manual-first** — Generate a spreadsheet of 190 pairs, Chris manually tiers them, then we emit SQL. No LLM.
- **D) Something else:** ___

**Q2.2:** Should each gate produce a pass/fail score, or a graded score (e.g., 0-3)?

- **A) Pass/fail per gate** — simpler, binary. A pair needs X/8 gates to pass.
- **B) Graded (0-3)** — more nuance. Total score determines tier.
- **C) Pass/fail with notes** — binary gate result + free-text rationale per gate. (Recommended — matches the clinical_rationale field pattern)
- **D) Something else:** ___

**Q2.3:** Should the 8-gate evaluation be persisted (stored in DB or file), or just used to produce the final tier + rationale?

- **A) Persist as a report file** (e.g., PAIRING_EVALUATION.md) for audit trail, but only tier + rationale go into the DB row
- **B) Persist in DB** — add gate scores as JSONB column on item_relationships
- **C) Don't persist** — the clinical_rationale field captures the summary; gate-by-gate detail is ephemeral
- **D) Something else:** ___

---

## 3. Review Workflow

"Human review gates publication."

**Q3.1:** Which tiers need Chris review before the row is considered "published"?

- **A) Canonical + common only** — these are the ones agents will actively recommend. Conditional and below are informational. (Recommended)
- **B) Everything except rejected** — review all tiers that produce a DB row
- **C) Canonical only** — common pairs are clear enough to auto-approve
- **D) Something else:** ___

**Q3.2:** What format for review?

- **A) REVIEW_QUEUE markdown files** — one file per pair (matches existing REVIEW_QUEUE/ pattern from Phase 2)
- **B) Single review document** — one big PAIRING_REVIEW.md with all canonical/common pairs in a table, Chris checks off
- **C) Supabase review status** — rows start as `is_active=false`, Chris flips to true after review in a UI or SQL
- **D) Something else:** ___

**Q3.3:** What does Chris actually review per pair? What's the checklist?

Proposed review checklist per canonical/common pair:
- [ ] Clinical rationale is accurate and non-promotional
- [ ] Timing guidance reflects real clinical practice
- [ ] same_session_ok is correct
- [ ] patient_education_text is clear and honest
- [ ] staff_talking_points won't create compliance issues
- [ ] No forced pairing — the "why both" is genuine

Is this the right checklist, or would you add/remove items? ___

---

## 4. Pair Generation Scope

20 products → 190 unique pairs.

**Q4.1:** Should we evaluate all 190, or pre-filter?

- **A) Evaluate all 190** — even obvious rejects get a row with tier=rejected so the system explicitly documents "we considered and rejected this." (Recommended — matches roadmap: "all 190 possible pairs explicitly tiered")
- **B) Pre-filter obvious rejects** — skip same-category alternatives (Botox/Dysport/Xeomin/Jeuveau/Daxxify are all neurotoxins), only evaluate cross-category pairs
- **C) Something else:** ___

**Q4.2:** Two products are missing `does_not_solve`. How should we handle them?

- **A) Backfill does_not_solve first** — quick task before pairing evaluation starts
- **B) Evaluate without it** — use dossier content + item_concerns to infer limitations
- **C) Skip those products** — exclude from pairing evaluation, add later
- **D) Something else:** ___

**Q4.3:** The 20 products span categories (neurotoxins, HA fillers, biostimulators, energy/RF, body contouring, skincare). Should we batch by category pair?

- **A) Yes, batch by category pair** — e.g., "all neurotoxin × HA filler pairs" then "all neurotoxin × biostimulator pairs." Easier to review in logical groups. (Recommended)
- **B) Alphabetical** — just go A-Z through all 190
- **C) By expected tier** — do likely-canonical pairs first, rejects last
- **D) Something else:** ___

---

## 5. Content Fields

Each relationship row has 4 content fields: `clinical_rationale`, `timing_guidance`, `patient_education_text`, `staff_talking_points`.

**Q5.1:** How deep should the content be for each tier?

- **A) Full content for canonical/common only** — rejected/do_not_market get just clinical_rationale (why rejected). Conditional gets rationale + timing. (Recommended)
- **B) Full content for all non-rejected tiers** — even compatible_only gets staff talking points
- **C) Rationale only for everything** — staff_talking_points and patient_education_text are Phase 8 (combination-intelligence) territory
- **D) Something else:** ___

**Q5.2:** Should `staff_talking_points` follow the Sales Excellence Framework tone, or be more clinical?

- **A) Sales Excellence tone** — matches the sales_education lens that's primary for A360
- **B) Clinical tone** — providers read these, keep it professional
- **C) Hybrid** — clinical foundation with consultation-ready framing (Recommended — matches gateway posture)
- **D) Something else:** ___

**Q5.3:** Should `patient_education_text` be written at patient reading level, or is it a provider-facing summary of what to tell the patient?

- **A) Patient reading level** — could be shown directly to patients in future
- **B) Provider-facing summary** — "Tell the patient: ..." framing (Recommended — matches current A360 pattern where providers mediate all patient communication)
- **C) Something else:** ___

---

## 6. Output & Deliverables

**Q6.1:** Beyond the DB rows, what artifacts should this phase produce?

Proposed:
- `PAIRING_EVALUATION.md` — full 190-pair evaluation matrix with gate scores
- `PAIRING_REVIEW.md` — canonical/common pairs for Chris review
- SQL files in `supabase/compile_sql/06-*` — all INSERT statements
- Updated TAXONOMY_ADDITIONS report

Add/remove? ___

**Q6.2:** Should rejected pairs be emitted as DB rows (with `is_active=false` and tier=rejected), or only documented in the evaluation report?

- **A) DB rows for everything** — complete audit trail in the database
- **B) DB rows for canonical/common/conditional/compatible_only only** — rejected pairs documented in report only (Recommended — keeps the table clean, report has the audit trail)
- **C) Something else:** ___

---

## 7. Anything Else

**Q7.1:** Are there specific pairings you already know should be canonical? (e.g., "Botox + Juvederm Voluma is our flagship combo")

List any here: ___

**Q7.2:** Are there pairings you know should be rejected or flagged? (e.g., safety concerns, brand conflicts)

List any here: ___

**Q7.3:** Any other context, references, or docs I should read before planning this phase?

___

---

*Answer directly in this file or copy answers to a new file. Blank = Claude's discretion.*
