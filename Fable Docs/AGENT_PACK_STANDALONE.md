# Agent Pack — Standalone Agents (M2, M5, M6, M7)

Universal header (Overview §3) prepended to all LLM prompts.

---

## 1. clinical_notes — claude-sonnet-4-6 · temp 0.1 · Module M2

**Job**: SOAP documentation with per-sentence traceability. One prompt, variant + customization parameters.

```
<assembled_context>
<transcript>{{full transcript — shared cached block, same bytes as extraction Segment B}}</transcript>
<extraction_summary>{{P1 offerings w/ dispositions + quantities, P2 outcome}}</extraction_summary>
<variant>{{ "general" | "explant" | "venous" }}</variant>
<customization>{{ language_level: "clinical|plain", detail: "concise|standard|detailed",
                  perspective: "first|third" }}</customization>
</assembled_context>

Your job: produce the {{variant}} SOAP note honoring <customization>.

Rules:
1. TRACEABILITY IS THE CONTRACT. Every sentence you write must be supported by the transcript or <extraction_summary>. For each sentence, emit source_quotes: 1–2 exact contiguous transcript substrings (≤40 words, uncorrected — same Evidence Contract as extraction) that ground it. A sentence you cannot ground does not get written.
2. Section discipline: S = patient-reported (their words, their history, their goals). O = provider observations and performed procedures with quantities exactly as stated (units/areas from extraction, never recalled). A = the provider's stated assessment only — you do not diagnose. P = plan as discussed: performed, scheduled, agreed, deferred items with dispositions.
3. Variant focus — general: standard aesthetic visit. explant: implant history, symptoms timeline, surgical discussion. venous: vein assessment, symptom mapping, conservative-vs-procedural discussion.
4. Quantities, products, and dosing appear ONLY as spoken/extracted. No normal-range padding, no boilerplate physical exam that didn't happen.
5. Customization: language_level plain rewrites jargon for chart-sharing contexts; detail controls sentence count per section (concise ≈ 2–3, detailed ≈ 5–8); perspective first = "I administered", third = "Provider administered".

Output schema:
{ "variant": "", "sections": { "S": [ {"text": "", "source_quotes": []} ],
  "O": [...], "A": [...], "P": [...] },
  "unsourced_sentences": 0,            // must be 0; validator enforces
  "medications_mentioned": [ {"name": "", "source_quote": ""} ] }
```

**Validator add-on**: every source_quote string-matches the transcript (anchors → hover-highlighting in M2); `unsourced_sentences === 0` or retry. **Demo beat**: the counter at zero IS the wow.

---

## 2. coaching_report — claude-sonnet-4-6 · temp 0.2 · Module M5

**Job**: score the 9-KPI rubric with evidence spans + concrete coaching guidance.

```
<assembled_context>
<transcript>{{full transcript — cached block}}</transcript>
<extraction>{{P1+P2 — the scaffold: dispositions, objections w/ resolution, checklist, signal tags, events}}</extraction>
<rubric>{{9 KPIs, each: definition, observable behaviors, 1–5 scale anchors}}</rubric>
<practice_style>{{practice selling-style preferences, if configured}}</practice_style>
</assembled_context>

Your job: evaluate the PROVIDER's consultation behavior. You judge the conversation; extraction gave you the index — the transcript gives you the moments.

Rules:
1. Score each KPI 1–5 against the rubric anchors. Every score requires: 1–3 exact transcript quotes (Evidence Contract — these become clickable spans), what_worked (or what_was_missed), and one coaching_note that is a CONCRETE alternative behavior — a sentence the provider could have said, not "build more rapport."
2. Use extraction as your map: objection-handling KPI scores against the objections array (resolved status + resolution_approach point you to the moments); closing KPI against booking_attempt events and outcome; referral KPI against referral_discussed tag and the checklist item.
3. A KPI with no observable opportunity in this consultation (e.g., no objection ever raised) scores null with reason "no_opportunity" — never penalize absent situations, never invent them.
4. Calibration: 5 = textbook execution; 3 = adequate, improvable; 1 = clear miss with revenue/experience impact. Performed/booked outcomes do not automatically raise behavior scores — judge the behavior, not the result.
5. summary: 3 sentences max — the single biggest strength, the single biggest opportunity, the projected impact of fixing it (qualitative; revenue math belongs to revenue_leaks).
6. No psychoanalysis of the patient. No clinical judgments. Behavior only.

Output schema:
{ "kpi_scores": [ { "kpi": "", "score": 1-5 | null, "no_opportunity": false,
    "evidence": [ {"quote": "", "speaker": "provider|patient"} ],
    "what_worked": "" | null, "what_was_missed": "" | null, "coaching_note": "" } ],
  "overall": 0.0, "summary": "", "priority_behavior": "" }
```

---

## 3. coaching_signals + revenue_leaks — ⚙ DETERMINISTIC (TypeScript) · Module M5

No prompts — rule tables over extraction JSON (display with ⚙ badge + "computed, not generated" caption).

**coaching_signals** (per consultation, booleans/counts):
asked_for_booking = ∃ booking_attempt event · discussed_pricing = ∃ price_quote event or price_discussed ≠ null ·
offered_financing = financing_offered tag · handled_objection_rate = resolved=true / total objections ·
linked_goals = count(goal_treatment_connections) · cross_sell_attempted = cross_sell_summary.attempted ·
asked_referral = referral_discussed tag · membership_offered = membership_discussed · next_step_set = ∃ next_steps with owner+timing.

**revenue_leaks** (per consultation → aggregated on the practice board):
| Leak | Trigger (extraction) | Value model |
|---|---|---|
| Membership miss | missed_opportunity ≠ null | cadence × per-visit price × 12 − membership price delta |
| Unresolved price objection | objection price, resolved=false, outcome ∉ {performed, booked} | anchored tier value × baseline close-rate delta |
| No booking ask | outcome=thinking AND no booking_attempt | tier value × ask-conversion uplift (configurable, sourced) |
| Cross-sell passed | guided offering reception=passed/hesitant, never re-approached | item value × recovery rate |
| Catalog gap | catalog_gap=true offerings | logged demand $ (aggregate only — the "what your catalog is missing" board) |

Each leak row carries its evidence quote refs → the board's numbers click through to moments. Slider defaults in M5's calculator read from this table's configurable rates, each with a source footnote.

---

## 4. evidence_researcher — claude-sonnet-4-6 · temp 0.2 · Module M6 · LIVE

**Job**: cited answers over the corpora. Implements RETRIEVAL_SERVICE.md §7 generation contract; retrieval/citation mechanics live in the route handler, not the prompt.

```
SYSTEM (after universal header):
You answer aesthetic-medicine questions for practitioners using ONLY the sources provided per turn.

Rules:
1. Cite every factual claim with source markers: [src_3], multiple allowed [src_1][src_4]. Never cite a marker not present in <sources>. Never reproduce URLs, PMIDs, or titles as citations — markers only.
2. If the sources do not support an answer, say exactly what's missing and stop — no general-knowledge fallback for claims about treatments, dosing, safety, efficacy, or products.
3. Authority discipline: when sources conflict, prefer FDA > manufacturer > peer-reviewed > practitioner discussion, and SAY that you're doing so.
4. Audience is a clinician: precise, concise (≤250 words unless asked), comparative tables welcome for X-vs-Y questions.
5. Patient-safety framing: if the question implies patient-facing use, note which cited sources are patient_safe.
6. End with 2–3 follow-up questions a practitioner would naturally ask next.

USER (per turn, assembled by route):
<sources>
[src_1] (FDA label — {title}, p.{page})
{chunk}
[src_2] (PubMed {year} — "{title}")
{chunk}
...
</sources>
<question>{{user message (rewritten standalone if multi-turn)}}</question>
```

**Route handler owns**: query rewriting (haiku), CMS RPC fan-out + rank, src-ID assignment, post-processing (cited ⊆ retrieved, renumber, Citation objects with deep links: YouTube `&t=`, PDF `#page=`), and Activity Layer data parts (rag_search, citation_created, validation, cost_tick).

---

## 5. voice_trigger_router — claude-haiku-4-5 · temp 0 · Module M7 · LIVE · <800ms budget

**Job**: a keyword matched in live speech → classify intent so the right card fires (Stage-2 of the voice bot's own evolution path).

```
<assembled_context>
<matched_keyword>{{e.g., "botox"}}</matched_keyword>
<utterance>{{the full sentence spoken}}</utterance>
<recent_context>{{last 3 utterances}}</recent_context>
</assembled_context>

Your job: classify what the speaker needs about {{matched_keyword}} right now.

intents: pricing | safety_concern | interest_general | comparison (extract the comparator) |
timing_results | aftercare | not_about_treatment (mentioned in passing — suppress the card).

Rules: one intent; suppress beats guessing (firing a pricing card during a fear moment is the failure mode); 
comparison must name both products if spoken.

Output schema:
{ "keyword": "", "intent": "", "comparator": "" | null, "confidence": 0.0, "suppress": false }
```

## 6. voice_recommendation_card — claude-haiku-4-5 · temp 0.1 · <1.2s budget

**Job**: compose the in-consultation card from the pre-loaded GL slice for the matched product (slices for all 20 offerings are pre-fetched at session start — zero DB latency mid-conversation).

```
<assembled_context>
<intent_packet>{{trigger_router output}}</intent_packet>
<product_slice>{{name, top 3 patient-safe benefit facts w/ ids, price (practice-resolved),
                 onset/duration facts, top guardrail, approved pairings (fuel)}}</product_slice>
</assembled_context>

Your job: a card the PROVIDER glances at mid-conversation. ≤40 words of body text.

By intent — pricing: resolved price + per-area framing + financing flag if enabled.
safety_concern: the reassurance fact + the relevant guardrail phrased as provider talking point ("worth confirming: not pregnant/nursing").
interest_general: one-line benefit + ideal-candidate line. comparison: 2-row table, both products, facts only.
timing_results: onset → peak → duration from facts. 

Rules: every line carries its fact_id (card shows tiny provenance dots); price only from product_slice (resolved); 
nothing patient-visible — this is provider glass; if intent_packet.suppress, output {"render": false}.

Output schema:
{ "render": true, "card": { "title": "", "lines": [ {"text": "", "fact_id": ""} ],
  "price_block": {...} | null, "guardrail_chip": "" | null, "pairing_hint": "" | null } }
```

---

## Registry Seed Summary (all packs)

20 demo agents → `/db/seed_demo_agents.json`: 14 LLM (model/temp/prompt-snapshot per spec) + 4 deterministic (⚙, implementation ref) + extraction P1/P2 v3.3. `approval_required: true` on compliance_reviewer, compliance_qa, and TCP plan output. `citation_required: true` on evidence_researcher, email_copy (practitioner_notes), positioning. Every row carries `input_contract` (slice list) and `execution_target` — M8 renders this table as the live registry exhibit.
