# Phase 9: Care Plan Modules — Questions for Chris

Answer inline or annotate. Anything left blank = Claude's discretion.

**Context:** Phase 9 builds concern-based phased treatment plans: foundation → corrective → optimization → maintenance. These are the long-arc "sell care through education" layer.

**Corpus mining guidance:** Search terms noted per section. This phase draws heavily on how podcast experts describe patient journeys and multi-visit treatment planning.

---

## 1. Plan Architecture

*Podcast search: "treatment plan" "care plan" "journey" "phases" "foundation" "corrective" "maintenance" "long term" "annual plan" "roadmap"*

### Q1.1 — What phases should a care plan include?

The GL_GSD_ROADMAP describes: foundation → corrective → optimization → maintenance. Is this the right model?

- **A.** Four phases as described (foundation → corrective → optimization → maintenance)
- **B.** Three phases — foundation → active treatment → maintenance (simpler)
- **C.** Flexible — concern-dependent number of phases (some concerns need 2, others need 5)
- **D.** Let the podcast corpus define the phasing model

**Recommended:** D (the experts may use different mental models for different concerns)

### Q1.2 — Should care plans be concern-driven or goal-driven?

- **A.** Concern-driven — "Tired Appearance Care Plan" (matches concern clusters from Phase 5)
- **B.** Goal-driven — "Wedding Prep Plan" or "Post-Baby Restoration Plan" (matches life events)
- **C.** Both — concern-based core library + event-based overlays

**Recommended:** C (concern plans are the foundation; event plans are a valuable upsell layer)

### Q1.3 — How many care plan modules should Phase 9 produce?

- **A.** Top 5 concern clusters only (Tired Appearance, Lower-Face Heaviness, Post-Weight-Loss Laxity, Angry/Mean Resting Expression, + 1 more)
- **B.** Top 10 concerns (covers the most common patient presentations)
- **C.** All concern clusters from Phase 5 that have sufficient product coverage

**Recommended:** B (the roadmap says "top ~10 concern clusters")

---

## 2. Plan Content

*Podcast search: "first visit" "second visit" "follow up" "check in" "assess" "adjust" "progression" "results" "before and after"*

### Q2.1 — What should each phase of a care plan include?

- **A.** Products/treatments + timing + expected outcomes + staff talking points
- **B.** Above + cost framing (good/better/best per phase) + rebooking triggers
- **C.** Above + patient education summary + milestone markers ("By visit 3, you should see...")

**Recommended:** C

### Q2.2 — Should care plans include timeline visualizations?

- **A.** Yes — month-by-month timeline with treatment markers
- **B.** No — text description of the arc is sufficient
- **C.** Structured data that CAN render as a timeline (frontend builds the visual later)

**Recommended:** C (build the data, let the UI team render it)

### Q2.3 — How should the "work backward from event" use case be handled?

Patient says "I have a wedding in 4 months." The plan should reverse-engineer what's possible.

- **A.** Pre-built event templates with fixed timelines (Wedding 6mo, Wedding 3mo, Vacation 6wk)
- **B.** Dynamic — agent uses timing rules (Phase 7) to calculate what fits in the window
- **C.** Both — pre-built templates for common events + dynamic fallback for custom dates

**Recommended:** C

---

## 3. Personalization

*Podcast search: "customize" "personalize" "individual" "assessment" "skin type" "age" "budget" "concerns"*

### Q3.1 — How personalized should care plan modules be?

- **A.** Generic templates — one plan per concern cluster, practices customize manually
- **B.** Parameterized — templates with variables (age range, budget tier, severity) that agents fill
- **C.** Fully dynamic — agents assemble plans from product/timing/pairing data at query time

**Recommended:** B (templates with parameters are the sweet spot — structured enough to be consistent, flexible enough to personalize)

### Q3.2 — Should budget be a dimension of care plans?

- **A.** Yes — each plan has good/better/best tiers with different product selections
- **B.** No — care plans are clinically driven, budget is a practice-level conversation
- **C.** Yes, but framed as "essential vs. enhanced vs. comprehensive" (not cheap/medium/expensive)

**Recommended:** C

### Q3.3 — Should age/life-stage be a dimension?

- **A.** Yes — "20s preventive" vs. "40s corrective" vs. "60s rejuvenation" tracks
- **B.** No — concern-driven is sufficient (a 30-year-old with volume loss gets the same plan as a 50-year-old)
- **C.** Light touch — note age-appropriateness in the plan but don't create separate plans per decade

**Recommended:** C

---

## 4. Integration with Prior Phases

### Q4.1 — How should care plans reference Phase 6 pairings?

- **A.** Care plan phases directly reference `item_relationships` — "In corrective phase, use Pairing X"
- **B.** Care plans are independent — they list products per phase, pairings are implicit
- **C.** Care plan phases reference combination packages from Phase 8

**Recommended:** C (care plans build on the combination intelligence layer)

### Q4.2 — Should care plans include the "why" from concern clusters?

- **A.** Yes — each plan starts with the concern cluster definition and mechanism explanation
- **B.** No — the plan assumes the provider already understands the concern
- **C.** Brief intro only — 2-3 sentence concern context, then dive into the plan

**Recommended:** C

---

## 5. Deliverables

### Q5.1 — Where should care plan modules live?

- **A.** `agent_reference_docs` with lens='care_plan' and doc_type per concern
- **B.** New `care_plan_modules` table with structured phases
- **C.** Both — structured data in a new table + narrative content in agent_reference_docs

**Recommended:** A for now (follows established pattern; structured table can come in Phase 10 if needed for runtime agent consumption)

### Q5.2 — Should care plans be reviewed before publication?

- **A.** Yes — same review pattern as Phase 6 (review queue files → Chris approval → SQL insert)
- **B.** Auto-publish as draft, Chris reviews in-product
- **C.** Only the top 5 need review; the rest follow the established pattern

**Recommended:** A

---

## 6. Open-Ended

### Q6.1 — What are the most common patient journeys you see in practice?

(e.g., "Botox gateway → filler → biostimulator → energy device" progression)

### Q6.2 — Are there care plan models from other industries that inspire you?

(e.g., dental treatment plans, physical therapy progressions, skincare routines)

### Q6.3 — Should care plans support the "membership model" revenue structure?

(Monthly membership → baseline treatments + add-ons)

### Q6.4 — Any specific podcast episodes about long-term patient journey planning?

---

*Phase: 09-care-plan-modules*
*Questions generated: 2026-06-13*
*Mine the podcast corpus for each section before answering — search terms provided per section.*
