# Phase 8: Combination Intelligence — Questions for Chris

Answer inline or annotate. Anything left blank = Claude's discretion.

**Context:** Phase 8 builds deep content for the canonical/common pairings that survived Phase 6. This is the "Full Face Refresh" layer — package names, positioning, staff close, objection handling, do-not-say.

**Corpus mining guidance:** Search terms noted per section. The podcast corpus is especially rich here — this is what business-of-aesthetics shows spend most of their time discussing.

---

## 1. Package Architecture

*Podcast search: "package" "bundle" "full face" "liquid facelift" "comprehensive" "treatment plan" "good better best" "membership"*

### Q1.1 — Should canonical pairs be grouped into named packages?

Example: "Full Face Refresh" = Botox + Juvederm Voluma + HydraFacial. Named packages are how practices actually sell combinations.

- **A.** Yes — create named package templates with pricing tiers (good/better/best)
- **B.** Yes — name and position packages but don't include pricing (leave pricing to practices)
- **C.** No — keep pairings as individual relationships, don't aggregate into packages

**Recommended:** B (practices set their own prices, but named packages with positioning are enormously valuable for staff training and patient communication)

### Q1.2 — How many package tiers?

- **A.** Two tiers — essential vs. premium
- **B.** Three tiers — good/better/best (matches podcast consensus and Sales Excellence)
- **C.** Flexible — packages define components, practices choose which to offer

**Recommended:** B

### Q1.3 — Should packages be concern-driven or product-driven?

- **A.** Concern-driven — "Tired Appearance Package" (contains products that address tired look)
- **B.** Product-driven — "Botox + Filler Package" (contains specific products)
- **C.** Both — concern-driven marketing name + product-driven component list

**Recommended:** C (mirrors how the best practices do it: market the outcome, deliver the products)

---

## 2. Content Depth

*Podcast search: "one-liner" "positioning" "elevator pitch" "explain" "educate" "why both" "value" "outcome"*

### Q2.1 — What content template should each canonical/common pairing get?

The GL_GSD_ROADMAP.md specifies: package name, one-line positioning, A-solves/A-doesn't/B-adds, staff close, objection handling, do-not-say.

- **A.** Use exactly the roadmap template (6 fields)
- **B.** Expand — add: patient education summary, commercial talking points, sequencing note, maintenance cadence
- **C.** Roadmap template + provider-facing FAQ (top 3 questions patients ask about this combo)

**Recommended:** C (the FAQ format is what podcast experts spend the most time on — "patients always ask me...")

### Q2.2 — How should "A-solves / A-doesn't / B-adds" be written?

This is the core of the combination intelligence — why both products together.

- **A.** Clinical language — mechanism-focused ("Botox blocks acetylcholine release at the NMJ; filler restores volume in the malar fat pad")
- **B.** Patient-outcome language — results-focused ("Botox smooths dynamic wrinkles; filler restores the youthful contour you've lost")
- **C.** Hybrid — clinical foundation with outcome framing (matches Q5.2 from Phase 6)

**Recommended:** C (consistent with the Phase 6 "education, not sales" principle)

### Q2.3 — Should combination content live in agent_reference_docs or a new table?

- **A.** New rows in `agent_reference_docs` with lens='combination' and doc_type='combination_intelligence'
- **B.** New `combination_content` table with foreign key to `item_relationships`
- **C.** JSONB field on `item_relationships` row itself

**Recommended:** A (follows the established pattern — dossier rows with a new lens value)

---

## 3. Staff Close & Objection Handling

*Podcast search: "close" "objection" "pushback" "too expensive" "I'll think about it" "upsell" "attachment rate" "conversion" "how to sell" "present"*

### Q3.1 — What is the right framing for staff close language?

- **A.** Direct sales language — "Would you like to add X today?"
- **B.** Educational close — "Based on what we discussed about your goals, X addresses the volume loss while Y handles the texture. Together they give you the complete result."
- **C.** Consultative — "Many of my patients with similar concerns find that combining X and Y gives them the most natural-looking result. Would you like me to walk you through how that works?"

**Recommended:** C (podcast experts are emphatic: the close is education + alignment, not pressure)

### Q3.2 — How many objection responses per combination?

- **A.** Top 3 objections (cost, fear, "do I really need both?")
- **B.** Top 5 objections (add: downtime concerns, "can I just start with one?")
- **C.** Flexible — capture whatever the podcast corpus surfaces as real objections

**Recommended:** B (the podcast data consistently surfaces these 5 patterns)

### Q3.3 — Should there be a "do-not-say" list per combination?

The roadmap includes this. What should it cover?

- **A.** Clinical claims that lack evidence support
- **B.** Pressure language, guarantees, competitor disparagement
- **C.** Both + practice-specific compliance flags (e.g., off-label claims, unsubstantiated outcome promises)

**Recommended:** C

---

## 4. The "Full Face Refresh" Paradigm

*Podcast search: "full face" "comprehensive" "holistic" "360" "whole face" "pillars" "foundation" "refresh"*

### Q4.1 — Is the "Full Face Refresh" a single canonical package or a framework?

- **A.** Single package — one defined combination of products for full-face rejuvenation
- **B.** Framework — a template that practices customize with their preferred products per category
- **C.** Both — a reference "Full Face Refresh" package + the framework for practices to build their own

**Recommended:** C

### Q4.2 — What are the pillars of a full face approach?

The podcast experts describe these repeatedly. Which should be the canonical pillars?

- **A.** Three pillars: Freeze (neurotoxin) + Fill (HA filler) + Finish (skin treatment)
- **B.** Four pillars: Freeze + Fill + Stimulate (biostimulator) + Finish (skin/energy)
- **C.** Five pillars: Freeze + Fill + Stimulate + Tighten (energy device) + Maintain (skincare)
- **D.** Let the podcast corpus define the pillar model — don't impose one

**Recommended:** D (let the experts define it, then codify what emerges)

---

## 5. Maintenance & Rebooking

*Podcast search: "rebook" "maintenance" "loyalty" "retention" "membership" "recurring" "annual" "lifetime value"*

### Q5.1 — Should combination intelligence include maintenance protocols?

- **A.** Yes — each package/combination gets a maintenance schedule (e.g., "Botox every 12 weeks, filler touch-up at 9 months, HydraFacial monthly")
- **B.** No — maintenance is Phase 9 (care plans) territory
- **C.** Light touch — include a "maintenance story" field per combination that describes the ongoing relationship, defer detailed protocols to Phase 9

**Recommended:** C (the "maintenance story" is in the roadmap template and is valuable for staff training without duplicating care-plan work)

### Q5.2 — Should rebooking triggers be documented per combination?

- **A.** Yes — "When to suggest rebooking" triggers (e.g., "At the 10-week Botox check, introduce the filler conversation")
- **B.** No — that's operational/CRM territory, not content
- **C.** Yes, as staff talking points — "At your next Botox visit, we should reassess the volume in your cheeks"

**Recommended:** C

---

## 6. Deliverables

### Q6.1 — What format for the combination intelligence content?

- **A.** One markdown file per canonical/common combination in `REVIEW_QUEUE/combinations/`
- **B.** SQL inserts into `agent_reference_docs` (lens='combination')
- **C.** Both — review files for Chris approval, then SQL inserts after approval

**Recommended:** C (matches Phase 6 review pattern)

### Q6.2 — Should the content pass the "would trained staff actually say this" test?

This is the quality bar from the GL_GSD_ROADMAP.md.

- **A.** Yes — every combination doc must be spot-checked against this criterion
- **B.** Yes — and podcast quotes should be used as the benchmark for natural language
- **C.** Defer quality testing to Phase 11 (governance)

**Recommended:** B (the podcast experts ARE trained staff — their language is the gold standard)

---

## 7. Open-Ended

### Q7.1 — What are your current "hero" combinations that you'd want content for first?

(The combinations your practice or demo showcases most)

### Q7.2 — Are there combination packages that competitors offer that A360 should match or beat?

### Q7.3 — Any specific podcast episodes or experts whose combination philosophy should anchor the content?

### Q7.4 — Should body contouring combinations (CoolSculpting + skin tightening) follow the same template or a separate one?

---

*Phase: 08-combination-intelligence*
*Questions generated: 2026-06-13*
*Mine the podcast corpus for each section before answering — search terms provided per section.*
