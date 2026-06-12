# Extraction v3.3 — Change Rationale & Implementation Optimization

Companion to `PASS1_CONTEXT_OFFERINGS_v3.3.md` and `PASS2_OUTCOME_INTELLIGENCE_v3.3.md`.
Every change from v3.2, why it exists, and how to extract maximum quality and minimum cost at runtime.

---

## 1. Structural change: three segments, one cache

**What changed:** Both prompts are reorganized into Segment A (system — identical across passes), Segment B (shared context: transcript + catalog + taxonomies — byte-identical across passes), Segment C (pass-specific instructions). The transcript moved from the bottom of the prompt to before the instructions.

**Why — quality:** Long-context guidance is consistent: place long documents before the instructions that operate on them. The model reads the transcript, then encounters the rules while the conversation is fresh, instead of holding rules in mind while wading through 10K tokens of dialogue.

**Why — cost:** Prompt caching is prefix-based. With identical Segment A+B bytes across Pass 1, Pass 2 (and later SalesCoach), the transcript and catalog are paid for once and read at ~90% discount on every subsequent call in the window. Your pipeline runs these passes back-to-back per consultation — this is close to free money. Pass 2 doesn't need the catalog, but including it keeps the prefix identical; cached tokens cost less than a divergent prefix would.

**Implementation:** API structure per call: `system` = Segment A · user message 1 = Segment B with a `cache_control` breakpoint · user message 2 = Segment C. The HITL block and pass_1_output stay in Segment C because they vary per run and would bust the cache. Render Segment B from one shared template function so the two passes can never drift byte-wise.

## 2. The Evidence Contract (the highest-leverage change)

**What changed:** One evidence schema everywhere (v3.2 mixed arrays and single objects, and ambient evidence lacked a speaker). Added `speaker_id` and `source` fields; widened speaker enum to `patient|provider|staff|companion|other|unknown`; capped evidence at 3 per field, ≤40 words per quote. New hard rule: **quotes must be exact contiguous substrings — no corrections, no ellipses** — with `[REDACTED]` for PII as the single permitted alteration.

**Why:** The exact-substring rule turns every quote into a *deterministic anchor*. Post-processing does a string match against the transcript and recovers character offsets and utterance indices for every extracted fact — which is the span-anchoring architecture we designed (extraction as index, transcript spans as evidence) without asking the model to emit offsets it would get wrong. SalesCoach can jump to the objection moment; the HITL screen can highlight the exact line; conversation_events get positions for KPI timing for free. The 40-word cap keeps anchors precise and output JSON small. Defining confidence as *value-correctness given the transcript* (not audio quality) makes the number mean one thing, so calibration is measurable.

**Implementation:** In the validator, locate every quote via exact match; fall back to whitespace-normalized match; a quote that still fails to locate is a violation (the model edited it) → auto-retry that field. Store resolved `char_start/char_end` on each evidence row.

## 3. New captures (schema additions — the "downstream demanded it" set)

| Addition | Why |
|---|---|
| **`price_discussed` per offering** (amount_text verbatim, price_type quoted/range/estimate/package) | The email playbook's hard rule — "only the figure from this consultation" — was unenforceable because v3.2 never captured the figure. Verbatim-only, never computed, so a misheard number can't become a quoted price in a patient's inbox. |
| **`prior_treatments`** (treatment, this_practice/elsewhere/unknown, timing, experience) | The Returning-Patient email segment and SalesCoach candidacy context both need history; v3.2 either lost it or — worse — misfiled "I had Botox before" as a stated interest. |
| **`provider_deferred` disposition** | The provider turning down requested revenue (safety, candidacy, timing) is a trust/safety signal and a coaching positive. v3.2 forced it into `discussed`, erasing it. Also tells campaigns not to push that treatment. |
| **`extraction_meta`** (transcript_quality, multi_speaker, notes) | HITL triage: route degraded-ASR or messy-attribution transcripts to human review first; correlate eval scores with transcript quality. |
| **Tags: `contraindication_mentioned`, `competitor_mention`, `referral_discussed`** | Respectively: campaign safety suppression (pregnancy/blood-thinner mentions must gate follow-up content); retention signal; the Referral-Requesting KPI in the coaching rubric had no extraction source. |
| **Event: `price_quote`** | v3.2 captured the objection to a price but not the quote itself — coaching can't evaluate price-presentation timing without the quote event. Pairs with per-offering price capture. |
| **Checklist closing item: "asked for referral or review"** | Feeds the same coaching KPI. Flag: this changes checklist denominators on dashboards — ship behind the configurable checklist template if that's a concern. |

## 4. Ambiguity eliminations (same data, fewer judgment calls)

- **Disposition precedence ladder + final-state-wins.** Conversations evolve ("discussed" → "scheduled"); v3.2 never said which state to record. Now explicit, and per-offering-×-area splitting is a rule rather than an inference from Example 2.
- **Outcome precedence ladder (Pass 2).** Mixed visits (performed one thing, declined another) had no defined visit-level answer. Now: highest rung wins; the per-offering story lives in Pass 1.
- **referred_by tie-breaks.** `friend` vs `patient_referral` overlapped (Example 3 silently resolved it); now the rule is stated: evidence the referrer was treated here → patient_referral; multiple sources → the decisive one.
- **Partner three-way rule.** "Talk to my husband" could land in objections (type partner), hesitations, or just a tag. Now: blocking reason → objection; consult-first → hesitation; tag fires in both; no utterance in two lists.
- **Resolution semantics.** `resolved: true` now requires the patient to acknowledge/move past the issue — provider monologue ≠ resolution. `resolution_approach` is explicitly descriptive, not evaluative: extraction records what happened; SalesCoach judges quality. Keeping judgment out of extraction keeps extraction stable while coaching rubrics iterate.
- **`unknown` vs null+missing_reason** for visit_type; **missing_reason is now a 5-value enum** instead of free text — so "why is this field empty" becomes a queryable analytics dimension (how often is attribution the blocker? transcript quality?).
- **Checklist: "generous but accurate" → "generous on phrasing, strict on substance; safety items strict."** The v3.2 wording invited grade inflation exactly where it's most dangerous.
- **catalog_match warning.** Category fallback (Dysport→Botox) is for revenue mapping; the prompt now states it must never rename the product in patient-facing output — encoding a cross-system guardrail at the source.

## 5. Anti-hallucination traps (new examples section)

v3.2's worked examples were all positive. The recurring extraction failures in this domain are *false positives*: third-party mentions ("my sister got filler"), negations ("I don't want filler"), provider education about non-recommended options, past treatments read as interests, and politeness read as engagement. Pass 1 now has a Traps section with each; Pass 2 adds the humor-vs-fear case. Negative examples are the cheapest known fix for over-extraction.

## 6. Hardening

- **Transcript-as-data rule** (Segment A, principle 4): transcripts will eventually contain instruction-shaped text — a provider reading a script, a patient joking "ignore the recording." The extractor must never obey content.
- **PHI minimization** (principle 5): schema-only extraction; identifiers redacted even inside quotes. Cheap to state, valuable in any audit or diligence review.
- **Speaker-label skepticism** (principle 6): diarization is wrong often enough that role-from-content needed to be licensed explicitly.

## 7. Runtime configuration

- **Temperature 0**, top_p default. Extraction is deterministic-intent work.
- **Force JSON**: prefill the assistant turn with `{`, or use structured-output/JSON mode where the runtime supports it. Strip any accidental fences in post.
- **Max tokens**: size to worst case (long consults with many offerings) — truncated JSON is a total loss; ~8K output headroom is cheap insurance.
- **Model tiering**: run the eval set on a cheaper tier before assuming the flagship is required; with v3.3's tightened rules, a mid-tier model may hit threshold on Pass 1 (entity-shaped) while Pass 2 (judgment-shaped) may still want the larger model. Decide per-pass on data, not vibes.

## 8. The validation loop (prompt rules → code checks → targeted retry)

Every Consistency Rule in the prompts is deliberately written to be machine-checkable. Pipeline per run:

1. **Schema validation** (JSON Schema for v3.3, strict enums).
2. **Quote anchoring**: every quote located in transcript (exact → normalized fallback). Failure = violation.
3. **Cross-field checks**: cross_sell count/derivation · stated_interests ⊆ offerings · primary ∉ secondary · urgency null when timing null · outcome/commitment matrix · Pass1-disposition ⇒ Pass2-outcome forcing · tag⇄event entailments · single-home rule for objections/hesitations/concerns.
4. **On violation**: ONE retry appending only the violation list ("Rule 5 violated: 'Sculptra' in stated_interests has no offerings entry. Return corrected full JSON."). Targeted-feedback retries converge far better than blind re-runs.
5. **Still failing** → flag for HITL with violations attached; never silently accept.

Log violation rates per rule per prompt version — that's your regression alarm.

## 9. Evaluation & rollout

1. **Golden set**: 25–40 transcripts spanning visit types, multi-speaker, degraded ASR, mixed outcomes. Hand-label key fields (offerings+dispositions, objections, outcome, commitment, prices, motivating events).
2. **Score** per-field precision/recall (entity fields), exact-match (enums), quote-anchor success rate, and confidence calibration (bucket accuracy: do 0.9+ extractions verify ≥90% in HITL?). HITL corrections are free ongoing labels — pipe them back into the golden set.
3. **Shadow run** v3.3 against v3.2 across the existing transcript corpus; diff dashboards on disposition distribution, commitment distribution, objection counts. Expect: fewer false-positive interests (traps), more offerings (price/deferred capture), commitment shifts where v3.2 over-credited politeness.
4. **Version discipline**: `extraction_version: "3.3"` rides every row; dashboards segment by version; downstream consumers (email, coaching) gate new fields on version.
5. **Changelog** (append to both files): 3.3 — evidence contract + anchoring; price/prior-treatments/provider_deferred/meta; precedence ladders; missing_reason enum; tie-break rules; traps; hardening; cache restructure; new tags/events; checklist referral item.

## 10. Judgment calls you should ratify

1. **`[REDACTED]` inside quotes** breaks exact anchoring for those quotes — accepted cost for PHI minimization; the validator's fallback matcher handles it. Alternative: redact at transcript-preprocessing instead (cleaner; do this if/when the ingest pipeline can).
2. **Checklist referral item** shifts KPI denominators — ship via configurable checklist if dashboard continuity matters this quarter.
3. **`provider_deferred`** is a new enum value — confirm every downstream switch statement handles it before promote.
4. **Pass 2 carries the (unused) catalog in its cached prefix** — paid at cache-read rates; revisit only if cache hit rates disappoint.
5. **`connection_made_by` stays provider-only** — patient-proposed links ("so Botox would fix this?") are deliberately excluded; the KPI measures provider behavior. Flag if you want a patient-confirmed variant later.
