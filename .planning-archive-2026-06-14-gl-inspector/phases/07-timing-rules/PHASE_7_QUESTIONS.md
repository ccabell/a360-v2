# Phase 7: Timing Rules — Questions for Chris

Answer inline or annotate. Anything left blank = Claude's discretion.

**Corpus mining guidance:** These questions are designed to be queried against the podcast/YouTube corpus. Key search terms for each section are noted.

---

## 1. Same-Session Rules

*Podcast search: "same day" "same session" "same visit" "combine" "together" "one appointment"*

### Q1.1 — What is the default same-session posture?

The system needs a default when no explicit rule exists for a product pair.

- **A.** Default YES — same session unless explicitly flagged otherwise (commercial-friendly, matches podcast consensus that "same-day when clinically feasible")
- **B.** Default NO — require explicit approval for same-session (conservative, safety-first)
- **C.** Default CONDITIONAL — same session allowed with provider assessment language

**Recommended:** A (matches the podcast expert consensus and commercial reality)

### Q1.2 — How should same-session exceptions be documented?

When same-session is NOT OK for a specific pair:

- **A.** Hard block — system prevents booking/recommending same-session
- **B.** Warning — system flags the timing concern but allows provider override
- **C.** Education — system provides the timing guidance but no enforcement

**Recommended:** B

### Q1.3 — Should timing rules be product-level or pair-level?

- **A.** Product-level only — each product has its own cadence/interval (already partially in `products` table)
- **B.** Pair-level only — timing rules live on `item_relationships` rows
- **C.** Both — product-level cadence + pair-level same-session/staging rules (more complete but more schema)

**Recommended:** C

---

## 2. Interval & Cadence

*Podcast search: "how often" "every X weeks" "retreat" "maintenance" "touch up" "interval" "cadence" "schedule"*

### Q2.1 — What cadence fields should be queryable?

The `products` table may already have interval columns. What does the booking/agent system need?

- **A.** Minimum retreat interval only (e.g., "not before 12 weeks")
- **B.** Recommended interval + minimum (e.g., "every 12-16 weeks, not before 10")
- **C.** Full cadence profile: initial series count, initial interval, maintenance interval, minimum retreat

**Recommended:** C (the podcast experts describe full treatment arcs, not just minimums)

### Q2.2 — Should cadence vary by indication/area?

Example: Botox cadence for glabella vs. masseter vs. hyperhidrosis may differ.

- **A.** One cadence per product (simpler, covers 80% of cases)
- **B.** Cadence per product × indication/area (more accurate but more data)

**Recommended:** A for now, with notes field for area-specific exceptions

### Q2.3 — Event-based timing: should the system support "work backward from date"?

Example: Wedding in 10 weeks — what can we start now vs. what's too late?

- **A.** Yes — build a timeline calculator that works backward from a target date
- **B.** No — document timing arcs in content but don't build calculator logic
- **C.** Phase 9 (care plans) — defer to care-plan modules which naturally handle phased timelines

**Recommended:** C (care plans are the right home for this)

---

## 3. Staging & Sequencing

*Podcast search: "first" "then" "before" "after" "sequence" "order" "staging" "layering" "which one first"*

### Q3.1 — How should sequencing be represented?

When two products must be done in a specific order:

- **A.** Text field on `item_relationships` — prose description ("Do Sculptra first, then HA filler for contour")
- **B.** Structured fields — `sequence_position` (1, 2), `sequence_rationale`, `sequence_interval_days`
- **C.** Both — structured fields for queryability + prose for human consumption

**Recommended:** C

### Q3.2 — Should sequencing be concern-dependent?

Example: For lower face, Sculptra first then HA. For lips, HA only (no Sculptra).

- **A.** One sequence rule per pair (simpler)
- **B.** Sequence can vary by concern/area (more accurate but complex)

**Recommended:** A with notes field for area exceptions (same rationale as Q2.2)

### Q3.3 — Temperature layering: should energy device sequencing follow a thermal model?

The podcast expert Tracy Mancuso describes "low heat → moderate heat → high heat" layering. Should this be formalized?

- **A.** Yes — add thermal_tier or energy_level field to energy device products, sequence by tier
- **B.** No — document in content/dossiers but don't add schema
- **C.** Capture in pair-level sequencing notes, not as a product-level attribute

**Recommended:** C (the principle is real but adding thermal_tier to schema may be premature)

---

## 4. Downtime & Recovery

*Podcast search: "downtime" "recovery" "healing" "swelling" "bruising" "social downtime" "no downtime"*

### Q4.1 — Should downtime be a structured field?

- **A.** Yes — add `downtime_days_min`, `downtime_days_max`, `downtime_description` to products
- **B.** Content only — describe downtime in dossiers, don't structure it
- **C.** Pair-level — add `combined_downtime_note` to relationships (because combining products changes downtime)

**Recommended:** A + C (product-level baseline + pair-level combined impact)

### Q4.2 — How should combined downtime be communicated?

When two products are done same-session, downtime may compound.

- **A.** Sum the individual downtimes (conservative)
- **B.** Take the max of the two (most procedures' downtimes overlap)
- **C.** Expert-determined per pair (most accurate but most work)

**Recommended:** C for canonical/common pairs, B as default for others

---

## 5. Contraindication Timing

*Podcast search: "contraindication" "wait" "don't do" "avoid" "not safe" "risk" "complication"*

### Q5.1 — Should timing contraindications be a separate data structure?

Example: "Do not do laser within 2 weeks of filler" is a timing rule AND a safety rule.

- **A.** Store in pair-level timing fields (same_session_ok = false, staging_interval, staging_rationale)
- **B.** Separate `timing_contraindications` table for safety-critical timing rules
- **C.** Flag in pair-level fields with a `safety_critical: true` boolean to distinguish from preference-based timing

**Recommended:** C (keeps schema simple while surfacing safety-critical timing distinctly)

### Q5.2 — How aggressive should the safety floor be?

- **A.** Conservative — flag anything with potential timing risk
- **B.** Evidence-based only — only flag timing contraindications with published evidence
- **C.** Hybrid — flag evidence-based hard stops + expert-consensus soft warnings

**Recommended:** C (matches the gateway posture: authoritative on safety, characterize in ranges for everything else)

---

## 6. Schema Decision

*This is a technical question the planner needs answered.*

### Q6.1 — New `gl_timing_rules` table or extend `item_relationships`?

The GL_GSD_ROADMAP.md notes this as an open GSD research question.

- **A.** Extend `item_relationships` — add timing fields (same_session_ok, staging_interval_days, staging_sequence, staging_rationale, combined_downtime_note, safety_critical)
- **B.** New `gl_timing_rules` table — separate entity for timing rules with foreign keys to products/pairs
- **C.** Both — pair timing on relationships, product-level cadence on products table

**Recommended:** A for pair timing + backfill product-level cadence fields on existing products table (C without a new table)

---

## 7. Deliverables

### Q7.1 — What artifacts should Phase 7 produce?

- **A.** SQL inserts + timing documentation + review file (matches Phase 6 pattern)
- **B.** Above + a "booking logic cheat sheet" for agent consumption
- **C.** Above + a visual timeline template for common treatment arcs

**Recommended:** A (keep it focused; visual timelines are Phase 9 care-plan territory)

### Q7.2 — Should timing data feed the Research/Evidence tab?

When a user asks "can I do Botox and filler same day?" should the Research tab return timing intelligence?

- **A.** Yes — wire timing data into retrieval alongside evidence_links
- **B.** Not yet — timing stays in agent fuel, Research tab stays evidence-focused
- **C.** Phase 10 — timing becomes part of compiled fuel packets that the Research tab can query

**Recommended:** C

---

## 8. Open-Ended

### Q8.1 — Are there timing rules you've seen in practice that conflict with published guidance?

(e.g., experts doing same-day combos that labels say to space apart)

### Q8.2 — Are there specific products where timing is the primary differentiator?

(e.g., Sculptra's multi-session protocol vs. HA filler's single-session results)

### Q8.3 — Any other timing references or documents to review?

---

*Phase: 07-timing-rules*
*Questions generated: 2026-06-13*
*Mine the podcast corpus for each section before answering — search terms provided per section.*
