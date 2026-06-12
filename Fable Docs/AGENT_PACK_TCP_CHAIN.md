# Agent Pack — TCP Chain (Module M3)

Seven agents. Input: v3.3 extraction (T-run) + catalog/facts/guardrails/fuel slices. Output: a Good/Better/Best Treatment & Care Plan with timeline, resolved pricing, and compliance seal. Universal system header (Overview §3) prepended to every LLM prompt.

---

## 1. catalog_resolver — ⚙ code + LLM arbitration · gpt-4o-mini · temp 0

**Job**: map every extraction offering to a demo-catalog item or declare a gap.
**Deterministic first**: exact + alias-table match in code (covers ~90%). Only unresolved names go to the LLM.

**LLM prompt (arbitration only):**

```
<assembled_context>
<unresolved_offerings>{{unresolved}}</unresolved_offerings>   // name, area, evidence quote
<catalog>{{catalog_20}}</catalog>                              // id, name, category, aliases
</assembled_context>

Your job: for each unresolved offering, decide the best catalog mapping.

Rules:
- match_type "exact" only for the same product under a different surface form.
- match_type "category" when a same-category catalog item exists (e.g., spoken Dysport → catalog Botox; both neurotoxins). The offering keeps its spoken name — the mapping is for planning/pricing only and must never rename the product in patient-facing output.
- match_type null when nothing fits; set catalog_gap true.
- Never map across categories (a filler never maps to a neurotoxin).

Output schema:
{ "resolutions": [ { "offering_name": "", "catalog_id": "" | null,
    "match_type": "exact" | "category" | null, "catalog_gap": false,
    "confidence": 0.0, "evidence_refs": ["..."] } ] }
```

**Events**: db_query(pl_products 20), db_query(alias map), guardrail_check(catalog, pass/flag per item).

---

## 2. goal_mapper — gpt-4o-mini · temp 0.2

**Job**: convert patient goals/concerns into treatment objectives bound to anatomy and candidate offerings.

```
<assembled_context>
<patient_goals>{{extraction.patient_goals}}</patient_goals>
<areas>{{extraction.areas}}</areas>
<motivating_events>{{extraction.visit_context.motivating_events}}</motivating_events>
<resolved_offerings>{{catalog_resolver.resolutions}}</resolved_offerings>
<concern_map>{{gl_product_concerns slice}}</concern_map>   // offering ↔ concern ↔ anatomy for the 20
</assembled_context>

Your job: produce treatment objectives — the bridge between what the patient said and what gets planned.

Rules:
- One objective per goal/concern pair the data supports. Do not force coverage: a concern with no candidate offering in <concern_map> becomes an objective with candidates: [] and gap: true (this is a catalog-gap signal, keep it).
- Each objective carries the patient's own words (evidence_refs from extraction).
- priority: "primary" only for the objective tied to extraction.primary_concern; others "secondary" | "future" based on stated_interests vs future_interests.
- Do not select treatments here — list candidates only. Selection is tier_builder's job.

Output schema:
{ "objectives": [ { "id": "obj_1", "goal": "", "concern": "", "anatomy": [],
    "priority": "primary|secondary|future", "event_anchor": "" | null,
    "candidates": ["catalog_id"], "gap": false, "evidence_refs": [] } ] }
```

---

## 3. tier_builder — claude-sonnet-4-6 · temp 0.3

**Job**: compose Good / Better / Best plans from objectives + candidates. The judgment core of TCP.

```
<assembled_context>
<objectives>{{goal_mapper.objectives}}</objectives>
<facts>{{facts for candidate products: indications, units/areas, onset, duration, session counts}}</facts>
<relationships>{{relationships among candidates}}</relationships>
<commitment>{{extraction.patient_signals.commitment_level}}</commitment>
<objections>{{extraction.objections}}</objections>
<budget_signals>{{extraction.offerings[].price_discussed, signal_tags price-*}}</budget_signals>
</assembled_context>

Your job: build exactly three tiers.

Tier philosophy:
- GOOD — addresses the primary objective only, single-modality, lowest commitment. The honest minimum that delivers the stated goal.
- BETTER — primary + the highest-value secondary objective; may combine modalities ONLY if <relationships> marks them complementary/sequential. Usually the recommended tier.
- BEST — comprehensive plan across primary + secondary objectives with maintenance built in. Aspirational but clinically grounded — never padded.

Rules:
- Every line item: catalog_id from candidates only; quantity grounded in <facts> (e.g., units per area from FDA dosing facts) with the fact id in evidence_refs; objective_id it serves.
- Respect <objections> and <budget_signals>: with an unresolved price objection, GOOD must be a genuinely accessible entry point, and note_to_provider should say so.
- Never include a pairing not present in <relationships> — pairing_advisor will verify against the fuel whitelist and reject violations.
- recommended_tier: pick one, justify in one sentence grounded in commitment + objectives.
- No prices anywhere in your output (pricing_engine owns money). No outcome guarantees in descriptions.

Output schema:
{ "tiers": [ { "tier": "good|better|best", "title": "", "patient_summary": "",
    "line_items": [ { "catalog_id": "", "objective_id": "", "quantity": "",
       "sessions": 1, "rationale": "", "evidence_refs": [] } ],
    "note_to_provider": "" } ],
  "recommended_tier": "better", "recommendation_rationale": "" }
```

---

## 4. pairing_advisor — gpt-4o-mini · temp 0 · WHITELIST GATE

**Job**: validate every multi-product combination in the tiers against pairing fuel; enrich approved pairs with the fuel's clinical language.

```
<assembled_context>
<tiers>{{tier_builder.tiers}}</tiers>
<pairing_fuel>{{approved fuel docs for the demo 6 pairings}}</pairing_fuel>
</assembled_context>

Your job: for every tier containing 2+ products, check each product pair.

Rules:
- A pair is APPROVED only if a fuel document for it exists in <pairing_fuel>. Fuel is a whitelist — absence means rejection, even if the pair seems clinically sensible.
- Approved: attach fuel_doc_id, sequencing guidance, and the fuel's patient-safe synergy sentence (verbatim from fuel; do not write your own clinical claims).
- Rejected: return the violating pair; tier_builder's item is flagged for removal/replacement (orchestrator handles the loop, max 1 retry).

Output schema:
{ "pair_reviews": [ { "tier": "", "pair": ["catalog_id","catalog_id"],
    "status": "approved|rejected", "fuel_doc_id": "" | null,
    "sequencing": "" | null, "synergy_copy": "" | null, "reason": "" | null } ] }
```

**Events**: db_query(gl_agent_fuel_documents), guardrail_check(pairing whitelist) per pair — one scripted rejection in the T1 capture is the demo beat.

---

## 5. timeline_planner — claude-sonnet-4-6 · temp 0.2

**Job**: sequence the recommended tier on a calendar, anchored to motivating events.

```
<assembled_context>
<recommended_tier>{{tiers[recommended] + approved pairings/sequencing}}</recommended_tier>
<interval_facts>{{facts: onset, peak, duration, min intervals, session spacing}}</interval_facts>
<motivating_events>{{extraction events with timing}}</motivating_events>
<today>{{demo_date}}</today>
</assembled_context>

Your job: build the treatment timeline.

Rules:
- Work BACKWARD from the highest-urgency event: each treatment's peak-effect window (from <interval_facts>) must land before the event date, with the fact id cited. Example: neurotoxin peak ~14 days → inject ≥2 weeks pre-event.
- Honor pairing sequencing (e.g., toxin before filler same-visit rules, laser spacing).
- If the event is too close for any line item's timeline, set feasible: false on that item with an honest patient_note proposing the achievable alternative — never compress clinically required intervals.
- Include maintenance phases (e.g., toxin re-treat window) so the timeline shows lifetime value, not one visit.
- Dates as ISO + a human label ("Week 2 — Voluma session").

Output schema:
{ "timeline": [ { "phase": "", "date": "", "label": "", "line_items": ["catalog_id"],
    "anchor": "event|interval|maintenance", "feasible": true,
    "patient_note": "" | null, "evidence_refs": [] } ],
  "event_alignment": { "event": "", "event_date_estimate": "",
    "all_peaks_before_event": true, "notes": "" } }
```

---

## 6. pricing_engine — ⚙ DETERMINISTIC (TypeScript, no LLM)

**Job**: money. `COALESCE(pl_price, gl_price)` per line item; package math; tier totals; financing presentation per practice config.

Rule table (implemented in code, displayed in the Activity Layer as resolution steps):
1. unit_price = pl_products.price ?? gl_products.price (emit which source won per item — the COALESCE beat)
2. line_total = unit_price × quantity × sessions
3. package: if a pl_package covers a tier's line set, show package vs à-la-carte delta
4. membership: if extraction.membership_package_summary.missed_opportunity ≠ null, attach membership comparison block (the T4 beat)
5. financing block only if practice.financing_enabled AND (signal financing_mentioned OR objection price)
6. Output: per-tier totals, per-item provenance (`price_source: practice|global`), no rounding games.

**Events**: db_query(pl_products), db_query(gl_products), one `narration`: "Prices are resolved, never generated."

---

## 7. compliance_reviewer — claude-sonnet-4-6 · temp 0 · GATE + HITL

**Job**: final clinical/claims review of the assembled plan; decide what needs the human.

```
<assembled_context>
<plan>{{tiers + timeline + pricing presentation copy}}</plan>
<guardrails>{{guardrails for all plan products}}</guardrails>
<patient_flags>{{extraction concerns category=safety, contraindication_mentioned tag, prior_treatments}}</patient_flags>
<practice_compliance>{{disclaimers, consent requirements}}</practice_compliance>
</assembled_context>

Your job: review and gate.

Checks (report each):
1. CONTRAINDICATIONS — any <patient_flags> item that intersects a product guardrail → block that line item with the guardrail id.
2. CLAIMS — patient-facing copy: no guarantees, no do-not-claim phrases (list per product in <guardrails>), no efficacy numbers without an evidence_ref.
3. COMPLETENESS — every line item has rationale + evidence_refs; timeline feasibility notes present where feasible=false.
4. DISCLAIMERS — required practice disclaimer present on the plan.

Decisions: pass | revise (return exact edits) | block (item-level).
ALWAYS set hitl_required: true with checkpoint "clinical_and_pricing_signoff" — the provider approves every plan (this is policy, not a failure).

Output schema:
{ "checks": [ { "check": "", "result": "pass|flag|block", "subject": "", "detail": "", "guardrail_id": "" | null } ],
  "revisions": [ { "path": "", "from": "", "to": "", "reason": "" } ],
  "hitl_required": true, "hitl_checkpoint": "clinical_and_pricing_signoff",
  "seal": "approved_pending_hitl" | "revisions_required" }
```

**Demo beat (T1 capture)**: one flag — pricing presentation copy says "erase your lines" → revised to "soften the appearance of lines" with the do-not-claim guardrail cited. Then HITL pause → provider approves → seal.
