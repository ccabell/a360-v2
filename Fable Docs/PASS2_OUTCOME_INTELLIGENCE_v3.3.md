# Pass 2: Outcome & Intelligence (v3.3)

{{! ════════════════════════════════════════════════════════════════════
    SEGMENT A — SYSTEM PROMPT
    BYTE-IDENTICAL to Pass 1 Segment A. Map to the API `system` param.
    (Reproduced in the deployed template; abbreviated here by reference.)
    ════════════════════════════════════════════════════════════════════ }}

[ SEGMENT A is identical to Pass 1 v3.3 Segment A — same role, Universal
  Extraction Principles 1–6, Evidence Contract, Confidence Calibration,
  and missing_reason enum. Deploy the exact same bytes so the prompt
  cache is shared. ]

{{! ════════════════════════════════════════════════════════════════════
    SEGMENT B — SHARED CONTEXT
    BYTE-IDENTICAL to Pass 1 Segment B (transcript, offer_catalog,
    product_alias_map, concern_taxonomy, practice_concern_list,
    suggestion_rules_summary — same blocks, same order, same bytes).
    Cache breakpoint after this segment.
    Pass 2 does not use the catalog blocks; they are included solely to
    keep the cached prefix identical across passes.
    ════════════════════════════════════════════════════════════════════ }}

[ SEGMENT B identical to Pass 1 v3.3 Segment B ]

{{! ════════════════════════════════════════════════════════════════════
    SEGMENT C — PASS 2 INSTRUCTIONS (pass-specific; after cache breakpoint)
    ════════════════════════════════════════════════════════════════════ }}

# Pass 2: Outcome & Intelligence

## Your Job

From the transcript above, extract:

1. **Consultation outcome** — what happened by the end
2. **Next steps** — what happens next, when, and who owns it
3. **Patient commitment level** — visit-level readiness
4. **Objections** — direct pushback, with resolution status
5. **Hesitations** — doubt/deferral moments, with resolution status
6. **Concerns raised** — clinical/practical worries, with addressed status
7. **Visit checklist** — were the key consultation elements covered
8. **Signal tags** — observable buying/risk signals for KPIs
9. **Conversation events** — structured events for KPI timing

This data powers follow-up timing, conversion tracking, provider coaching, and HITL review.

{{#if hitl_verified}}
## Verified Data (HITL — ground truth, do not contradict)

- Do NOT extract values conflicting with verified fields
- Use verified outcomes, commitments, and concerns exactly as provided
- You MAY extract additional items not covered by verification
- For any field restating HITL data, set `"source": "hitl_verified"` in its evidence

<hitl_verified>
{{hitl_verified}}
</hitl_verified>
{{/if}}

{{#if pass_1_output}}
## Pass 1 Context (prior extraction — reference, do not re-extract)

Use offering dispositions, motivating events, and goals to inform outcome, commitment, and checklist evaluation. Do not re-emit Pass 1 fields.

<pass_1_output>
{{pass_1_output}}
</pass_1_output>
{{/if}}

## Outcome Definitions

| Outcome | When to use |
|---------|-------------|
| `treatment_performed` | A treatment was administered this visit |
| `booked` | A future appointment was scheduled |
| `agreed_pending_scheduling` | Agreed to proceed; not yet scheduled |
| `thinking` | Patient needs time to decide |
| `follow_up_requested` | A follow-up call/visit was requested |
| `declined` | Patient decided not to proceed |
| `information_only` | Purely informational |

**Outcome precedence (single value — highest applicable wins):**
`treatment_performed` > `booked` > `agreed_pending_scheduling` > `follow_up_requested` > `thinking` > `declined` > `information_only`

A visit where one treatment was performed and another declined is `treatment_performed` — the per-offering story already lives in Pass 1 dispositions. The outcome is the VISIT-level result.

## Commitment Level (visit-level)

| Level | Description | Typical outcome |
|-------|-------------|-----------------|
| `committed` | Ready to proceed; booked/booking; no hesitation | treatment_performed, booked |
| `interested` | Strong interest; asking about next steps; minor questions | agreed_pending_scheduling, booked |
| `considering` | Interested but has questions/concerns or needs time | thinking, follow_up_requested |
| `uncertain` | Hesitant; significant objections; needs convincing | thinking, information_only |
| `not_interested` | Resistant or decided against | declined, information_only |

**Calibration — common mistakes:**
- Received treatment → AT LEAST `interested`, usually `committed`. Never `not_interested`.
- Booked → `committed`, not `considering`.
- Pleasant informational consult without booking → `considering` or `interested`, NOT `committed`. Polite enthusiasm ("this all sounds great!") without a commitment action is not commitment.
- Reserve `not_interested` for explicit decline or disengagement.
- **Mixed visits:** commitment reflects the patient's posture toward the PRIMARY recommendation / overall visit direction. Declining a secondary add-on does not lower a patient who performed/booked the primary.

## Objections vs Hesitations vs Concerns

**Objections** — direct pushback; a stated reason NOT to proceed.
Types: `price` | `timing` | `fear` | `partner` | `results` | `trust` | `other`
"That's more than I wanted to spend" (price) · "I'm terrified of needles" (fear)

**Hesitations** — doubt or deferral without a stated reason against. "I need to think about it" · "Let me talk to my husband first"

**Concerns** — questions/worries about clinical or practical aspects, raised by EITHER party. "Will it hurt?" · "What about bruising?" · "You're on blood thinners…"

**Tie-breaks:**
1. **Partner three-way rule:** Partner stated as a blocking reason ("My husband would never let me spend this") → objection, type `partner`. Needing to consult the partner before deciding → hesitation. In both cases, also emit the `partner_consultation` signal tag.
2. A question that contains pushback ("Why is it so expensive here?") → objection (price), not concern.
3. The same utterance never appears in more than one of the three lists. Pick the dominant function.
4. **Humor/sarcasm:** a joke ("Oh great, more needles, my favorite" with laughter, then proceeds) is NOT a fear objection unless reluctance is corroborated elsewhere. If genuinely ambiguous, record as concern (category `clinical`) with confidence ≤0.69 or omit.

**Resolution semantics (`resolved` / `addressed`):**
- `true` — provider responded AND the patient acknowledged, accepted, or moved forward past the issue
- `false` — issue raised; provider did not respond, or patient remained unmoved
- `null` — cannot determine from the transcript
- `resolution_approach` — short factual description of WHAT the provider did ("offered financing options", "explained bruising timeline"). Describe; do not grade — coaching agents judge quality downstream.

## Signal Tags

Include in `signal_tags[]` ONLY with directly supporting evidence. Never infer from tone.

| Tag | Extract when |
|-----|--------------|
| `ready_to_book` | Scheduling language: "Book me in", "When's the next opening?" |
| `scheduling_intent` | Asks about availability or references their calendar |
| `treatment_interest_high` | Detailed questions about a specific treatment (recovery, results, process) |
| `positive_sentiment` | Gratitude, excitement, satisfaction expressed |
| `financing_mentioned` | Either party mentions financing/payment plans |
| `financing_offered` | Provider specifically offers a financing option |
| `payment_plan_discussed` | Financing details discussed (terms, amounts, providers) |
| `price_concern` | Worry about cost without rejecting |
| `sticker_shock` | Negative reaction to a specific price point |
| `price_comparison` | Compares price to another provider or expectation |
| `budget_constraint` | States a budget limit or inability to afford |
| `partner_consultation` | Needs to discuss with partner/family |
| `future_language` | Assumptive language: "When I get this done…", "After my treatment…" |
| `contraindication_mentioned` | A clinical contraindication or risk factor surfaces (pregnancy, blood thinners, autoimmune condition, recent procedure, allergy) |
| `competitor_mention` | Patient references another practice/provider they use or are considering |
| `referral_discussed` | Provider asks for a referral/review, or patient offers to refer someone |

`contraindication_mentioned` is a safety-routing signal: downstream campaign systems use it to suppress or modify follow-up content. When in doubt about clinical significance, include the tag and let the concern entry carry the detail.

## Conversation Events

| Event type | When |
|-----------|------|
| `price_quote` | Provider states a price, range, or package figure |
| `price_objection` | Patient pushes back on a quoted price |
| `financing_offer` | Provider offers financing/payment plan |
| `booking_attempt` | Provider or staff attempts to schedule |
| `objection_response` | Provider addresses a patient objection |
| `next_steps_mentioned` | Either party states what happens next |

Each event's evidence quote anchors its position in the conversation — quotes must be exact substrings so the event can be located programmatically. Emit events in transcript order.

## Visit Checklist

{{#if visit_checklist}}
Evaluate each item for the visit type identified in Pass 1:

<visit_checklist>
{{visit_checklist}}
</visit_checklist>
{{else}}
Use the default consultation checklist:

**Safety & Clinical:** confirmed identity/chart · reviewed relevant medical history · discussed contraindications if applicable · explained risks and side effects · obtained informed consent (procedures)
**Education & Planning:** confirmed chief complaint · explained treatment options · set realistic expectations · discussed results timeline · explained aftercare
**Closing & Next Steps:** discussed pricing/investment · asked for commitment/booking · confirmed next steps · provided contact for questions · asked for referral or review
{{/if}}

For each item: `completed` = true (clearly done) | false (clearly not done) | null (unclear/not applicable), with structured evidence when true.

**Evaluation guidelines:**
1. **Generous on phrasing, strict on substance.** "Any questions about side effects?" counts as discussing risks; merely handing over a brochure does not count as explaining anything.
2. **Safety items are strict.** Mark a safety item true only on explicit evidence. When unclear, null — never generous.
3. Evidence is REQUIRED for `completed: true`. No quote, no credit.
4. Use null for items inapplicable to this visit type.

## Worked Examples

**Example 1 — objection vs hesitation vs concern**
"That's way more than I budgeted for." → objection, type `price` (+ tags: sticker_shock or budget_constraint per wording)
"I need to think about it and maybe talk to my husband." → hesitation, topic "decision with partner" (+ tag partner_consultation)
"Will there be bruising? I have a presentation next week." → concern, category `practical`

**Example 2 — humor, not fear**
"Ha, needles, my favorite thing in the world." (laughs, then: "Okay, where do you want me?") → no fear objection; proceed signal. Optionally concern only if reluctance recurs.

**Example 3 — commitment level**
"That sounds great, can we book something for next week?" → `committed`
"Interesting, let me think about it." → `considering`
"I don't think this is for me." → `not_interested`

**Example 4 — checklist with structured evidence**
"I see you're on warfarin for atrial fibrillation. That does elevate bruising risk."
→ { item: "Reviewed relevant medical history", category "clinical", completed true, evidence quote as spoken } — ALSO emit tag `contraindication_mentioned` and a concern (raised_by provider, category `safety`).

**Example 5 — price_quote event then objection**
Provider: "For both areas you'd be at about $680 today." Patient: "Oof — that's a lot more than I expected."
→ events: [price_quote (provider), price_objection (patient)]; objection type `price`; tag `sticker_shock`.

## Output Schema

Return JSON matching this structure exactly. Every evidence object follows the Evidence Contract (Segment A). Emit `conversation_events` in transcript order.

```json
{
  "extraction_version": "3.3",
  "pass": 2,
  "extraction_meta": {
    "transcript_quality": "good|degraded|poor",
    "multi_speaker": true,
    "notes": "string or null"
  },
  "signal_tags": ["string"],
  "conversation_events": [
    { "event_type": "price_quote|price_objection|financing_offer|booking_attempt|objection_response|next_steps_mentioned", "speaker": "patient|provider|staff", "evidence": { } }
  ],
  "outcome": {
    "status": { "value": "treatment_performed|booked|agreed_pending_scheduling|thinking|follow_up_requested|declined|information_only", "evidence": [], "missing_reason": null },
    "summary": { "value": "2-3 sentences. Factual only: what was discussed, decided, and what happens next. No recommendations, no opinions, no identifiers beyond first names used in the visit.", "evidence": [], "missing_reason": null }
  },
  "next_steps": [
    { "action": "string", "timing": "string or null (stated timeframe only — never inferred)", "owner": "patient|provider|staff", "evidence": { } }
  ],
  "patient_signals": {
    "commitment_level": { "value": "committed|interested|considering|uncertain|not_interested", "evidence": [], "missing_reason": null }
  },
  "objections": [
    { "type": "price|timing|fear|partner|results|trust|other", "statement": "string", "resolved": null, "resolution_approach": "string or null", "evidence": { } }
  ],
  "hesitations": [
    { "topic": "string", "statement": "string", "resolved": null, "resolution_approach": "string or null", "evidence": { } }
  ],
  "concerns": [
    { "concern": "string", "raised_by": "patient|provider", "category": "clinical|practical|safety|financial|other", "addressed": null, "response": "string or null", "evidence": { } }
  ],
  "visit_checklist": [
    { "item_id": "string", "item_label": "string", "category": "safety|clinical|education|closing", "completed": null, "evidence": { "quote": "string or null", "speaker": "patient|provider|null", "confidence": 0.0 } }
  ]
}
```

## Consistency Rules (MUST hold — validated programmatically)

1. **Outcome/commitment alignment:** `treatment_performed` or `booked` → commitment ∈ {committed, interested}. `declined` → commitment ∈ {not_interested, uncertain}.
2. **Outcome precedence:** status is the highest-precedence applicable outcome (ladder above).
3. **Pass 1 alignment:** when pass_1_output is provided, any offering with disposition `performed` forces outcome `treatment_performed`; any `scheduled` (and none performed) forces `booked`.
4. **Signal tags require evidence:** every tag must be supportable by a quotable utterance; `price_objection` event ⇒ an objection of type `price` exists; `financing_offer` event ⇒ tag `financing_offered` present.
5. **No utterance appears in more than one of objections / hesitations / concerns.**
6. **next_steps.timing** is stated or null — never inferred.
7. Every quote is an exact substring of the transcript.
