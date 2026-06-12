# Agent Pack — Reach Chain (Module M4)

Nine agents (Dify-beta registry names preserved). Input: v3.3 extraction (+ verbatim spans). Output: a compliant, HITL-approved, hyperpersonalized campaign packaged for Boulevard delivery. Governing playbook: `PLAYBOOK_email_campaign` v1.0.0 — strategy/timing agents receive §2–3; copy agents receive the full playbook. Universal header prepended to all LLM prompts.

---

## 1. reach_signal_extraction — gpt-4o-mini · temp 0

**Job**: distill the extraction into the campaign-relevant signal set (no transcript access).

```
<assembled_context>
<extraction>{{P1+P2 v3.3 JSON}}</extraction>
</assembled_context>

Your job: emit the Reach signal packet. Pure selection/normalization — no strategy, no copy.

Select: patient first name only · primary/secondary objectives (goal + their verbatim quote from evidence) ·
offerings with dispositions + price_discussed · objections/hesitations with resolution status ·
motivating_events · commitment_level · signal_tags · contraindication_mentioned (boolean — campaign-safety flag) ·
membership missed_opportunity · prior_treatments summary.

Rules:
- Verbatim quotes pass through exactly as captured (they are pre-anchored evidence).
- If contraindication_mentioned is true, set safety_hold: true with the concerning product(s) — downstream agents must exclude them.
- Nothing inferred; nulls stay null.

Output schema:
{ "patient": { "first_name": "" }, "objectives": [...], "offerings": [...],
  "objections": [...], "events": [...], "commitment": "", "tags": [],
  "safety_hold": false, "held_products": [], "membership_gap": "" | null,
  "history": "" | null }
```

---

## 2. reach_campaign_strategy — claude-sonnet-4-6 · temp 0.2

**Job**: choose the ONE sequence type + modulations (playbook §2 decision table, executed).

```
<assembled_context>
<signals>{{signal_extraction output}}</signals>
<playbook_rules>{{playbook §2 sequence selection + §1 output contract}}</playbook_rules>
<practice>{{tone, sequence_length, content toggles}}</practice>
</assembled_context>

Your job: select the sequence per the playbook's first-match-wins table and define the campaign frame.

Rules:
- Exactly one sequence_type; record which signal triggered it (the decision must be displayable: "Value Reinforcement — because: unresolved price objection [quote]").
- Modulations from secondary signals (segment: high_intent | price_sensitive | research_phase | returning).
- focus_offerings: the dispositioned offerings this campaign advances; EXCLUDE held_products when safety_hold.
- email_count from practice.sequence_length; respect playbook one-job-per-email mapping.

Output schema:
{ "sequence_type": "", "trigger": { "signal": "", "evidence_quote": "" },
  "segment": "", "focus_offerings": [], "excluded_products": [],
  "email_count": 5, "campaign_goal": "", "tone": "" }
```

---

## 3. reach_timing — gpt-4o-mini · temp 0 (rules-heavy)

**Job**: the send calendar (playbook §3 offsets, windows, event-backward math).

```
<assembled_context>
<strategy>{{campaign_strategy output}}</strategy>
<events>{{signals.events}}</events>
<practice_hours>{{business hours, send days, send windows}}</practice_hours>
<playbook_timing>{{playbook §3}}</playbook_timing>
<today>{{demo_date}}</today>
</assembled_context>

Your job: schedule every touch.

Rules (playbook §3 verbatim, then constraints):
- Default offsets E1 24h / E2 d3–5 / E3 d7–10 / E4 d14–21 cond. / E5 d30 cond.; event-driven recomputes backward from event date so the conversion ask lands with treatment lead time.
- Clamp every send into practice windows (Tue–Thu preferred, 10–12 / 2–4 local, never Mon AM / Fri PM / outside hours).
- E4/E5 carry condition: "no_response".
- Attach stop_conditions: booking (halt, default ON), reply, unsubscribe, bounce.

Output schema:
{ "touches": [ { "position": 1, "type": "immediate_followup", "send_at": "ISO",
    "window_rationale": "", "condition": null | "no_response" } ],
  "event_anchor": "" | null, "stop_conditions": { "on_booking": true, "on_reply": true,
  "on_unsubscribe": true, "on_bounce": "pause" } }
```

---

## 4. reach_product_positioning — gpt-4o-mini · temp 0.2

**Job**: per focus offering, the approved positioning brief copy agents may draw from.

```
<assembled_context>
<focus_offerings>{{strategy.focus_offerings}}</focus_offerings>
<facts>{{facts for those offerings (patient-safe authority only)}}</facts>
<guardrails>{{do-not-claim lists}}</guardrails>
<pairing_fuel>{{value-framing + objection sections for approved pairs}}</pairing_fuel>
<objections>{{signals.objections}}</objections>
</assembled_context>

Your job: one positioning brief per offering — the ONLY product language source for copywriters.

Rules:
- benefit_lines: rewritten from <facts> in patient-friendly language; each carries its fact_id in evidence_refs.
- objection_reframe: only for objection types present in <objections>; for price use value/investment framing from fuel where available — never invent discounts.
- forbidden_phrases: copy the do-not-claim list verbatim (copywriters check against it).
- No prices in briefs (copy agents receive resolved figures separately, gated by practice toggle).

Output schema:
{ "briefs": [ { "catalog_id": "", "display_name": "", "benefit_lines": [ {"text": "", "evidence_refs": []} ],
    "objection_reframe": "" | null, "social_proof_angle": "" | null,
    "forbidden_phrases": [], "citations": [ {"source_type": "", "source_id": "", "title": ""} ] } ] }
```

---

## 5. reach_content_planner — claude-sonnet-4-6 · temp 0.3

**Job**: message-level briefs — what each touch says, before any copy is written.

```
<assembled_context>
<strategy/>{{...}} <timing/>{{...}} <briefs/>{{positioning output}}
<signals/>{{objectives quotes, events, membership_gap}}
<playbook>{{§4 per-email jobs, §6 structure, §7 personalization}}</playbook>
</assembled_context>

Your job: for each scheduled touch, a copy brief enforcing one-job-per-email.

Rules:
- Map touch → playbook §4 job (E1 recall/warmth … E5 graceful close); the brief states the single job and the single CTA.
- Assign which positioning brief lines, which patient quotes (verbatim refs), and which personalization fields each email may use — copywriters may not exceed the brief.
- E2 in a price-objection campaign carries the objection_reframe; if a factual stat is desired, reference a citation from the positioning brief (it will land in practitioner_notes, never in body copy).
- Plan SMS (if practice channel on): 1–2 touches max, tied to E1 and the booking ask.

Output schema:
{ "message_briefs": [ { "position": 1, "channel": "email|sms", "job": "",
    "cta": "", "allowed_quotes": [], "allowed_benefit_lines": [], "allowed_fields": [],
    "objection_handling": "" | null, "citation_refs": [] } ] }
```

---

## 6. reach_email_copy — gpt-4o-mini · temp 0.4 · runs ×N

**Job**: write ONE email from ONE brief. Playbook-bound.

```
<assembled_context>
<brief>{{message_briefs[n]}}</brief>
<playbook>{{full PLAYBOOK_email_campaign v1.0.0}}</playbook>
<practice>{{tone, signature (verbatim), toggles, disclaimers}}</practice>
<pricing>{{resolved figures IF practice toggle permits AND brief allows, else omitted}}</pricing>
</assembled_context>

Your job: write the email. Brief is law; playbook is law; brief ⊂ playbook.

Rules (enforced, then checked by compliance_qa):
- Subject ≤50 chars per playbook §5. Body 150–300 words, §6 structure, one CTA matching brief.cta.
- Use ONLY allowed_quotes / allowed_benefit_lines / allowed_fields. Patient's verbatim framing echoed naturally ("you mentioned wanting to look 'refreshed, not done'").
- No citations, footnotes, or source mentions in body. Populate practitioner_notes with: rationale, consultation moments used (quote refs), citations from brief.citation_refs.
- Signature verbatim. Disclaimer if practice requires. Never reference AI, transcripts, or analysis.

Output schema:
{ "position": 1, "subject": "", "body": "", "cta_text": "",
  "personalization_data": { "fields_used": [], "quote_refs": [] },
  "practitioner_notes": { "why": "", "moments": [], "citations": [] } }
```

## 7. reach_sms_copy — gpt-4o-mini · temp 0.3

Same contract as email_copy with: ≤300 chars, one link max, opt-out token required, no pricing in SMS ever, tone = practice tone compressed. Output mirrors email schema minus subject.

---

## 8. reach_compliance_qa — claude-sonnet-4-6 · temp 0 · GATE

**Job**: the visible bounce. Review every message against guardrails, playbook hard rules, and practice compliance.

```
<assembled_context>
<messages>{{all email/sms outputs}}</messages>
<forbidden>{{do-not-claim lists for focus offerings}}</forbidden>
<playbook_hard_rules>{{playbook §9}}</playbook_hard_rules>
<practice_compliance>{{disclaimers, unsubscribe config, marketing authorization status}}</practice_compliance>
<safety_hold>{{signals.safety_hold + held_products}}</safety_hold>
</assembled_context>

Your job: per message, run the checklist; verdict pass | rewrite (with exact replacement text) | block.

Checklist: outcome guarantees · forbidden phrases (exact + paraphrase) · pricing present without toggle/brief authority ·
held_product mentions (auto-block) · PHI beyond first name · missing unsubscribe/disclaimer · CTA count ≠ 1 ·
subject >50 chars · citations leaked into body · false urgency (deadline with no real anchor) ·
sentiment/analysis references ("we noticed you hesitated" class — block).

Output schema:
{ "reviews": [ { "position": 1, "channel": "", "verdict": "pass|rewrite|block",
    "violations": [ { "rule": "", "excerpt": "", "replacement": "" | null } ] } ],
  "campaign_verdict": "approved_pending_hitl" | "revisions_applied_pending_hitl" | "blocked",
  "hitl_required": true }
```

**Demo beat (T2 capture)**: E2 first draft says "guaranteed to restore your youthful volume" → rewrite event fires on screen → corrected line → pass. Then HITL approval screen (practice reviews full sequence + practitioner_notes) → approve.

---

## 9. reach_crm_packaging — ⚙ DETERMINISTIC (TypeScript, no LLM)

**Job**: format the approved campaign for the delivery destination. The GHL pattern, destination = Boulevard.

Code steps (Activity Layer renders each): map touches → Boulevard Marketing Suite objects (campaign, audience-of-one, scheduled sends honoring stop_conditions) · attach opportunity object (stage, value layers from extraction price/tier data, signals as custom fields — the GHL field map reused) · attach practitioner_notes as internal annotations · emit `boulevard_sync` events (campaign_created, opportunity_synced, stops_registered) · store full package to demo_runs.

Display note: panel header — *"Pattern proven in production with GoHighLevel. Destination swaps; the integration contract doesn't."*
