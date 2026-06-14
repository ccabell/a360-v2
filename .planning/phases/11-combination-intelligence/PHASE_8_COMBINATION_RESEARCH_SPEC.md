# Phase 8 Combination Intelligence — Corpus Research Specification

**Date:** 2026-06-13
**Status:** Research complete — awaiting Chris review before implementation
**Searches executed:** 128 across 4 parallel research agents
**Sources queried:** Podcast (202K chunks, 31 shows), YouTube (201K chunks), PubMed (37K chunks), Industry (87K chunks)
**Methodology:** Semantic vector search via `library_search.py` → parallel fan-out to per-source RPCs → authority-weighted scoring

---

## Executive Summary

### Top 10 Findings

1. **Packages should be named.** Strong corpus consensus that combination packaging is where the industry is heading. Experts universally describe multi-modality approaches as the standard, not the exception. Names should be outcome-focused and simple (e.g., "Skin Rejuvenation Package"), not branded/clever without clinical grounding.

2. **Prices should NOT be included in A360 content.** Package pricing is practice-specific and varies dramatically. A360 content should provide the framework; practices configure pricing. The corpus supports "investment" framing over "cost/price" language.

3. **Good/Better/Best tiering is weakly supported.** The corpus discusses tiering conceptually but has no structured examples of G/B/B for aesthetic treatment packages specifically. The stronger pattern is **comprehensive recommendation first, then patient self-sort** — present the full plan and let the patient choose scope.

4. **Content template should extend the existing pairing fuel spec.** Six product-pair-style fuel docs already have `patient_facing_name`, `staff_close`, `one_line_positioning`, `do_not_say`. Phase 8 should standardize all 16 pairing fuel docs to include these fields and add combination intelligence fields.

5. **Education-first close is near-unanimous.** The corpus overwhelmingly recommends consultative/educational selling over transactional approaches. The recommended pattern is: discover needs → present comprehensive plan → let patient self-sort. "Assumptive comprehensive recommendation" is the dominant expert approach.

6. **Top objections are: cost, "do I need both?", fear of overdone, downtime, "I'll think about it."** The corpus has strong philosophy on handling these but sparse specific scripts. Phase 8 should generate scripts grounded in the philosophy.

7. **Do-not-say is a hard requirement.** Categories: unsupported claims, guarantees, "you need this" pressure, fear-based selling, "liquid facelift" overclaims, "no downtime" when downtime exists, off-label claims, permanent result claims.

8. **Full Face Refresh should be a customizable framework, not one fixed package.** The corpus supports a systematic zonal approach (upper/mid/lower face + periorbital) with pillar categories. "Freeze + Fill + Finish" does not appear in the corpus — A360 should treat it as a branded innovation, not an industry standard.

9. **Maintenance should be a light story in Phase 8, with full protocols deferred to Phase 9.** The corpus is very strong on retention/rebooking as business imperative but weak on specific maintenance protocols per combination. Phase 8 should include rebooking triggers and maintenance story language; Phase 9 builds full care plans.

10. **Storage should use existing `gl_agent_fuel_documents` table.** No new table needed. All combination intelligence content fits as enriched `pairing_fuel` documents within the existing `agent_fuel_json` JSONB. The two existing JSON formats (product-pair flat vs. archetype nested) must be reconciled.

### Highest-Confidence Decisions (implement without Chris review)

- Use `gl_agent_fuel_documents` for storage (no schema change)
- Education-first close style
- Do-not-say categories (unsupported claims, guarantees, pressure, fear-based)
- Reconcile the two pairing fuel JSON formats into one canonical schema
- Include maintenance story (light) in Phase 8, defer protocols to Phase 9
- Include rebooking triggers as staff talking points

### Decisions Requiring Chris Review

- Whether "Full Face Refresh" should be a brandable A360 package name
- Which pillar model to use (Freeze+Fill+Finish vs. zonal vs. corpus-derived)
- Whether practices can rename packages
- Whether pricing language should appear anywhere in fuel docs
- Which hero combinations to prioritize for first build
- Whether body contouring uses a separate template
- Whether good/better/best tiers should be explicit or implicit (self-sort)

---

## Evidence Methodology

### Search Infrastructure
- **Tool:** `scripts/library_search.py` — unified search across 4 corpus sources
- **Embedding model:** OpenAI text-embedding-3-small (1536 dims)
- **RPCs called:** `match_podcast_chunks`, `match_youtube_transcripts`, `match_pubmed_articles`, `match_industry_articles`
- **Authority weighting:** cosine_similarity × source-tier weight (manufacturer YouTube 1.40, PubMed 1.30, clinical podcast 1.05, business podcast 0.90, wire/PR 0.85)

### Search Coverage
| Agent | Focus | Searches | Primary Sources |
|-------|-------|----------|-----------------|
| Agent 1 | Package architecture, Full Face Refresh, naming | 24 | Podcast, Industry, YouTube |
| Agent 2 | Sales education, objection handling, retention | 37 | Podcast, Industry |
| Agent 3 | Clinical evidence, claims boundaries | 37 | PubMed, YouTube, Industry |
| Agent 4 | Schema analysis, storage options | N/A (code/DB analysis) | Codebase, Supabase |

### Keyword Families Searched
Package/bundling, good/better/best, full face refresh, liquid facelift, combination treatment, signature treatment, membership, tiered pricing, educational close, consultative selling, objection handling, too expensive, fear overdone, downtime, cross-sell, attachment rate, do-not-say, compliance, neurotoxin+filler, biostimulator, RF microneedling, PRP, body contouring, maintenance, rebooking, retention, membership, annual plan, treatment journey

### Confidence Assignment
- **Strong:** Multiple independent sources across 3+ shows/journals agree; no contradicting evidence
- **Moderate:** 2-3 sources agree; limited contradicting evidence; may be from a single show family
- **Weak:** Single source or theoretical only; or topic sparsely covered in corpus
- **Mixed:** Sources actively disagree or recommend different approaches

---

## Recommended Answers Table

| # | Question | Recommended Answer | Consensus | Evidence Basis | Compliance Impact | Implementation Impact | Chris Review |
|---|----------|-------------------|-----------|---------------|-------------------|----------------------|--------------|
| Q1.1 | Named packages? | Yes — outcome-focused simple names, practice-configurable | Strong | Podcast, Industry | Low | Medium | No |
| Q1.2 | How many tiers? | 2-3 tiers via self-sort (comprehensive → scaled), not rigid G/B/B | Weak | Podcast | Low | Medium | Yes |
| Q1.3 | Concern-driven or product-driven? | Both — outcome marketing name + product component list | Moderate | Podcast | Low | Low | No |
| Q2.1 | Content template? | Extend pairing fuel spec with combination intelligence fields | Strong | Schema analysis | Low | High | No |
| Q2.2 | A-solves/A-doesn't/B-adds tone? | Provider-mediated education, not sales script | Strong | Podcast | Medium | Medium | No |
| Q2.3 | Storage table? | `gl_agent_fuel_documents` (existing) | Strong | Schema analysis | Low | Low | No |
| Q3.1 | Staff close framing? | Assumptive comprehensive recommendation → patient self-sort | Strong | Podcast | Medium | Medium | No |
| Q3.2 | Objections per combination? | 3-5 per combination (top 5 universal + pair-specific) | Moderate | Podcast | Medium | Medium | No |
| Q3.3 | Do-not-say per combination? | Yes — universal list + pair-specific additions | Strong | PubMed, Industry | High | Medium | No |
| Q4.1 | Full Face Refresh = package or framework? | Framework with optional reference packages | Moderate | Podcast, YouTube | Low | High | Yes |
| Q4.2 | Pillars? | Systematic zonal + modality layers (corpus-derived) | Moderate | Podcast, PubMed | Low | Medium | Yes |
| Q5.1 | Maintenance in Phase 8? | Light maintenance story only; full protocols → Phase 9 | Strong | Podcast, PubMed | Low | Low | No |
| Q5.2 | Rebooking triggers? | Yes — as staff talking points, not operational CRM triggers | Strong | Podcast | Low | Low | No |
| Q6.1 | Deliverable format? | Review queue markdown + SQL after approval | Strong | Schema analysis | Low | Medium | No |
| Q6.2 | Staff language test? | Yes — "would trained staff actually say this?" checklist | Strong | Podcast | Medium | Low | No |
| Q7.1 | Hero combinations? | Neurotoxin+filler first, then biostimulator+filler, then RF+injectables | Strong | PubMed, Podcast | Low | Low | Yes |
| Q7.2 | Competitor packages? | Corpus gap — minimal competitor package data | Weak | — | Low | Low | Yes |
| Q7.3 | Anchor experts? | Dr Arthur Swift (systematic approach), The Med Spa CEO (premium selling) | Moderate | Podcast | Low | Low | Yes |
| Q7.4 | Body contouring separate template? | Same template, different pillar model | Weak | Podcast, PubMed | Low | Medium | Yes |

---

## Detailed Question-by-Question Analysis

### Q1.1: Should canonical pairs be grouped into named packages?

**Recommended answer:** Yes. Named combination packages with simple, outcome-focused names. Practices must be able to rename and customize.

**Neutral industry position:** The industry is moving decisively toward combination packaging. Experts describe single-modality treatment as increasingly insufficient. Named packages reduce patient confusion and increase conversion.

**Clinical/compliance safety floor:** Package names must not imply outcomes that cannot be delivered. "Full Face Refresh" is acceptable; "Complete Facial Transformation" overpromises. Names should describe the approach, not guarantee the result.

**Podcast/expert-practice findings:**
- *True to Form* (The 3 Types of Aging): "That's the way our industry is going, right? It's all about a combination approach. So when we look at like packaging things nowadays, it's usually a package of a combination."
- *Modern Day Med Spa*: "You need to maximize your multiples. You need to find the small hinges that swing the big doors that are going to get your client an amazing result."
- *Medical Millionaire* (#192): "Let's build a package together. That's a six month treatment plan."
- *The Business of Injecting* (Dr David Mabrie): "We found it was better just to take that option away and say, hey, if you want to treat your under eyes, we typically have to treat these three areas together. And at first we were really afraid of making the leap, but patients, the confusion is really gone."
- *The Business of Injecting* (Dr Pegah Dehdari): "I give them a package. I tell them this is a skin rejuvenation package."

**YouTube/industry findings:** Sciton's "Building a Profitable Laser Practice" documents three package architecture categories: treatment series (same treatment repeated), maintenance plans (annual), and combination bundles (multi-modality). Medical Spa MD confirms package design as critical for differentiation.

**PubMed findings:** PMID 41664429 (2026): Structured treatment planning produces 2.5x higher 6-month patient retention. PMID 33217111 (2021): Combination neurotoxin + filler produces enhanced retention vs. single modality.

**Conflicts or caveats:** The corpus shows both product-driven and concern-driven naming. No single convention dominates. Franchise models (VIO) use consumer-friendly branded names; independent practices use descriptive clinical names.

**Implementation implications:** Store `patient_facing_name` on each pairing fuel doc. Make it a suggested default that practices can override via `pl_*` practice-level configuration.

**Suggested final wording:** "Each canonical/common combination gets a default `patient_facing_name` (outcome-focused, simple) that practices can customize. Names describe the approach and goal, not guarantee outcomes."

**Confidence:** Strong (package concept) / Weak (specific naming conventions)

---

### Q1.2: How many package tiers?

**Recommended answer:** Present the comprehensive recommendation first. Allow patient self-sort into 2-3 scope levels. Do not enforce rigid Good/Better/Best tiers at the A360 content level.

**Neutral industry position:** Tiered pricing is common in med spas but structured G/B/B for combination treatment packages specifically is not well-documented in the corpus.

**Podcast/expert-practice findings:**
- *The Med Spa CEO* (Want to Attract Premium Clients): "You actually want to give them a plan assuming that they will want the most comprehensive thing for the problems that they have and the desires that they want to have."
- *The Med Spa CEO* (Leverage This One Thing): Advocates moving "from a transactional approach to your recommendations to a signature approach or a signature recommendation."
- *Med Spa Success Strategies*: "Letting people self-sort with proper education is a much better way to position the sales process than really selling for the sake of selling."

**Industry findings:** Medical Spa MD: "Your patients are as diverse as they come — from first-timers looking for a basic service to experienced patients seeking advanced treatments." Recommends mixing pricing methods.

**Conflicts or caveats:** The "present comprehensive, let self-sort" approach conflicts with explicit G/B/B tiering. The corpus supports the comprehensive-first approach more strongly. G/B/B may work for practice-specific implementation but should not be baked into the A360 content template.

**Suggested final wording:** "Combination content presents the comprehensive approach as the recommended plan. Phase 8 does not prescribe tiers. If Chris wants G/B/B, it should be a practice-configuration layer in Phase 9, not a content-template constraint in Phase 8."

**Confidence:** Weak (specific tiering model) / Strong (comprehensive-first philosophy)

---

### Q1.3: Should packages be concern-driven or product-driven?

**Recommended answer:** Both — outcome/concern-driven marketing name, product-driven component list.

**Podcast/expert-practice findings:**
- *The Aesthetics Business Podcast* (Sara Cheeney): "It's really important to put the patient in focus and putting a patient-specific plan of action into place. And that will include a holistic approach to care."
- *Business of Aesthetics*: "It's not the symptoms alone. It is speaking to their desire."
- Dr Mabrie bundles by clinical requirement (anatomical zones, not products).

**Suggested final wording:** "Package names and positioning are concern/outcome-driven ('Full Face Refresh', 'Skin Rejuvenation'). Component lists are product-driven (neurotoxin + HA filler + skin treatment). This hybrid gives patients an outcome they understand while giving staff a clear product protocol."

**Confidence:** Moderate

---

### Q2.1: What content template should each canonical/common pairing get?

**Recommended answer:** Extend the existing pairing fuel spec with combination intelligence fields. Reconcile the two existing JSON formats into one canonical schema.

See **Combination Content Template** section below for full field-by-field specification.

**Confidence:** Strong

---

### Q2.2: How should "A-solves / A-doesn't / B-adds" be written?

**Recommended answer:** Provider-mediated education language. Frame as complementary contributions to the patient's goal, not as upselling.

**Podcast/expert-practice findings:**
- *Business of Aesthetics* (Dr Dusan Sajic): "If we don't improve the base on which that facade is there, it's going to fall over time, it's not going to look natural."
- *The Aesthetic Doctor* (Ozempic Face): "RF microneedling... tighten skin and stimulate neocollagenesis... We want to have skin tightening and biostimulation."
- *Beauty Prescribed*: "It's the loss of tissue on multiple levels, multiple layers of the face starting at the bone."

**Suggested final wording:** "A-solves / A-doesn't / B-adds should read as clinical education — what each treatment does and why one alone leaves a gap. Never frame as 'you also need B' but as 'A addresses X; for the best outcome, B addresses what A cannot reach.' Use layer/foundation metaphors the corpus naturally uses."

**Confidence:** Strong

---

### Q2.3: Should combination content live in `agent_reference_docs` or a new table?

**Recommended answer:** Neither. Use `gl_agent_fuel_documents` (existing table, no schema change).

**Schema analysis findings:**
- `agent_reference_docs` has 10 rows, no `lens` or `doc_type` columns, no `review_status`, no structured JSON, no product linking. Wrong fit.
- `gl_agent_fuel_documents` already has 16 pairing fuel docs with the exact fields needed: `agent_fuel_json`, `review_status`, `product_ids[]`, `relationship_ids[]`, `audience[]`, `patient_safe`.
- All 16 existing docs are `status = 'draft'` — can be freely restructured.

**Confidence:** Strong

---

### Q3.1: What is the right framing for staff close language?

**Recommended answer:** Assumptive comprehensive recommendation → patient self-sort via education. Not transactional closing.

**Podcast/expert-practice findings:**
- *The Med Spa CEO*: "You actually want to give them a plan assuming that they will want the most comprehensive thing."
- *The Med Spa CEO*: "Lackluster results that ends up happening from the under-recommendations actually negatively impacts the reputation that you are trying to build."
- *Med Spa Success Strategies* (Jaclyn Luongo): Identifies the problem where "the esthetician in their mind closes the wallet for the patient."
- *The Aesthetic Doctor* (EP 73): "You're not just paying for the syringe. You're paying for my artistry. You're paying for my expertise."
- *True to Form* (Vanessa Bird): "Spend some more time with them finding out their needs."
- *Medical Spa Insider* (Lina Colleli): "You're coming up with the treatment plan and you're presenting them with the education."

**Suggested final wording:** "Staff close language follows the 'assumptive comprehensive recommendation' model: present the full plan that addresses the patient's concerns, explain why each component matters, and let the patient choose scope. Never pre-judge affordability. Frame investment in outcomes, not products."

**Confidence:** Strong

---

### Q3.2: How many objection responses per combination?

**Recommended answer:** 3-5 per combination: the top 5 universal objections adapted to the specific pairing, plus any pair-specific objections.

**Top 5 universal objections from corpus:**

1. **Cost / "Too expensive"** — Moderate corpus evidence. Response pattern: financing options, value framing, investment language, per-month cost reframing.
2. **"Do I really need both?" / "Can I start with one?"** — Weak direct corpus evidence but implied by the comprehensive-vs-single discussion. Response pattern: explain what each does that the other cannot; layer/foundation metaphors.
3. **Fear of looking overdone/unnatural** — Strong corpus evidence. Response pattern: "natural-looking" portfolio, under-treatment philosophy, conservative approach narrative.
4. **Downtime concerns** — Moderate evidence. Response pattern: realistic downtime framing with "social downtime" distinction.
5. **"I'll think about it"** — Weak corpus evidence for specific scripts. Response pattern: urgency via Cialdini "moment" psychology, follow-up systems.

**Suggested final wording:** "Each combination doc includes 3-5 objection entries with `objection_type`, `patient_says`, `handling_language`, `do_not_say_in_response`. Universal objections are adapted to the specific pairing."

**Confidence:** Moderate

---

### Q3.3: Should there be a do-not-say list per combination?

**Recommended answer:** Yes — a universal do-not-say list plus pair-specific additions.

See **Do-Not-Say Specification** section below for full framework.

**Confidence:** Strong

---

### Q4.1: Is the "Full Face Refresh" a single canonical package or a framework?

**Recommended answer:** A customizable framework with optional reference packages. Not one fixed package.

**Podcast/expert-practice findings:**
- *The Business of Injecting* (Dr Arthur Swift, Ep 200): "Systematic creates magic. If you're systematic in your approach, then you go from the upper face to the mid face to the lower face. And I use the periorbital vision as a separate area."
- *Ageless by Rescu* (Suzie Hoitink): "Your ageless journey is absolutely a multimodality approach."
- *Beauty Prescribed*: "It's the loss of tissue on multiple levels, multiple layers of the face starting at the bone."
- YouTube (Dr Amir Karam): "When we take all of these changes together, we have all the different subunits of the face seeing signs of aging. So the plan is a comprehensive facial rejuvenation."

**Conflicts or caveats:** "Freeze + Fill + Finish" does not appear in the corpus. The corpus supports a systematic zonal/layered approach but does not validate any specific branded pillar model. A360 would be creating a new framework, not documenting an industry standard.

**Suggested final wording:** "Full Face Refresh is a framework that systematically addresses facial aging across zones and modality layers. Reference packages (e.g., 'Essential Refresh', 'Complete Refresh') are configuration examples, not fixed products. Practices customize which products fill each pillar."

**Confidence:** Moderate — framework concept is strongly supported; specific pillar naming is an A360 invention

---

### Q4.2: What are the pillars of a full-face approach?

**Recommended answer:** Corpus-derived model combining zones and modality layers.

**Pillar models evaluated:**

| Model | Source | Corpus Evidence |
|-------|--------|----------------|
| Freeze + Fill + Finish | A360 internal | **Not found in corpus** |
| Freeze + Fill + Stimulate + Finish | A360 internal | Not found |
| Upper / Mid / Lower + Periorbital | Dr Arthur Swift | **Strong** — directly stated |
| Bone → Fat → Muscle → Skin layers | Beauty Prescribed, multiple | **Strong** — anatomy-based |
| Movement + Volume + Texture + Tightening | Composite from corpus | **Moderate** — implicitly described |

**Recommended model (corpus-derived):**

```
Zone axis:       Upper face → Mid face → Lower face → Periorbital → Neck
Modality axis:   Movement (neurotoxin) → Structure (filler) → Foundation (biostimulator) → Surface (skin quality/energy) → Maintain (skincare + schedule)
```

This two-axis model reflects how the corpus actually discusses comprehensive treatment — by anatomical zone AND by treatment modality layer. It is more flexible than a single-axis "Freeze+Fill+Finish" model.

**Suggested final wording:** "The Full Face Refresh framework uses a zone × modality matrix. Zones: upper, mid, lower, periorbital, neck/decolletage. Modality layers: movement control, structural restoration, foundation stimulation, surface refinement, maintenance. Each cell in the matrix maps to specific products/categories. Chris decides which pillar labels to use for marketing."

**Confidence:** Moderate (zone model: strong; modality labels: A360 invention)

---

### Q5.1: Should combination intelligence include maintenance protocols?

**Recommended answer:** Light maintenance story in Phase 8. Full protocols deferred to Phase 9 care plans.

**Podcast/expert-practice findings:**
- *The Aesthetics Business Podcast*: "Clinics that offer membership models typically see a 30 to 50% increase in patient retention."
- *Medical Millionaire* (#109): "Rebook and then also sell them a product... put them on a membership plan, your VIP plan, your beauty bank."
- *True to Form*: "Retention is so much cheaper than acquisition."
- *Spa Marketing Made Easy*: "The spas that scale fast and sustainably are not starting back at zero every single month."

**PubMed findings:** No RCTs measuring optimal maintenance intervals for combination protocols. Maintenance timing is expert consensus, not evidence-based.

**Suggested final wording:** "Each combination doc includes a `maintenance_story` field (2-3 sentences: when the patient should expect to return, what the ongoing plan looks like, why continuity matters). Full maintenance protocols (exact intervals, session counts, care plan templates) defer to Phase 9."

**Confidence:** Strong

---

### Q5.2: Should rebooking triggers be documented per combination?

**Recommended answer:** Yes — as staff talking points, not CRM automation triggers.

**Podcast/expert-practice findings:**
- *The Med Spa CEO*: "Automatically remind clients and staff when a package is nearing its end... make renewal conversations super effortless."
- *Business of Aesthetics*: "An aesthetic patient is worth eight to $10,000... Once trust is built and established, more than 50% within the next three months return."
- *The Business of Injecting* (Ep 336): Acknowledges that medical providers must shift from "you don't want them to come back" to planning return visits.

**Suggested final wording:** "Each combination doc includes `rebooking_trigger` as a staff talking point: the natural moment to discuss the next visit. Not a CRM automation — that belongs in Phase 9/10 operational integration."

**Confidence:** Strong

---

### Q6.1: What format for combination intelligence content?

**Recommended answer:** Markdown review files in `REVIEW_QUEUE/combinations/` → SQL inserts into `gl_agent_fuel_documents` after approval.

See **Deliverables Recommendation** section below.

**Confidence:** Strong

---

### Q6.2: Should the content pass the "would trained staff actually say this" test?

**Recommended answer:** Yes. Every combination doc must pass a staff language quality checklist before SQL generation.

See **Staff Language Quality Test** section below.

**Confidence:** Strong

---

## Package Architecture Specification

### Recommendation

Create named combination packages with these characteristics:

| Attribute | Recommendation | Rationale |
|-----------|---------------|-----------|
| Named? | Yes | Reduces confusion, increases conversion (Dr Mabrie evidence) |
| Pricing included? | No — never in A360 content | Practice-specific; corpus supports "investment" framing only |
| Tiered? | Self-sort via education (not rigid G/B/B) | Corpus supports comprehensive-first → patient chooses scope |
| Concern-driven or product-driven? | Hybrid — concern name, product components | Patients understand outcomes; staff need product protocols |
| Practice-configurable? | Yes — names, components, pricing all overridable | Different practices carry different products |

### Package Fields

```
patient_facing_name       — Outcome-focused simple name (e.g., "Skin Rejuvenation")
package_goal              — The patient outcome this combination targets
concern_tags              — Links to gl_concerns (patient concern triggers)
tier_suggestion            — "essential" | "comprehensive" | "premium" (suggestion, not prescription)
component_categories      — Product categories included (e.g., neurotoxin, HA filler, skin quality)
component_products        — Default product list (practice overrides via pl_*)
ideal_candidate           — Who this is best for
not_ideal_candidate       — Who should not get this package
one_line_positioning      — Single-sentence value proposition
clinical_rationale        — Why these work together (clinical education)
patient_education_summary — Patient-safe explanation
staff_close               — How to present and recommend
objections                — Top 3-5 with handling language
do_not_say                — What staff must never say about this package
maintenance_story         — When to return, what ongoing plan looks like
evidence_summary          — Evidence backing (internal reference only)
review_status             — draft | in_review | approved | active
```

### Package Examples from Corpus

| Name (suggested) | Components | Source Inspiration |
|-----------------|------------|-------------------|
| Skin Rejuvenation Package | PRP + mesotherapy + dermapen + chemical peel | Dr Pegah Dehdari, The Business of Injecting |
| Comprehensive Facial Refresh | Neurotoxin + filler (multi-zone) + skin treatment | Dr Arthur Swift systematic approach |
| Foundation + Polish | Biostimulator + laser/energy | Business of Aesthetics (CO2 as "finish and polish") |
| Monthly Skin Health | HydraFacial + skincare protocol | VIO membership model ("personal trainer for your skin") |

### Risks/Caveats

- "Full Face Refresh" and similar branded names are A360 innovations, not corpus-validated industry terms
- Body contouring package architecture has minimal corpus support — may need a different template
- Franchise models (VIO) use different naming conventions than independent practices

---

## Combination Content Template

### Recommended Template

| Field | Status | Phase | Rationale |
|-------|--------|-------|-----------|
| `patient_facing_name` | **Required now** | 8 | Already in 6 product-pair fuel docs |
| `one_line_positioning` | **Required now** | 8 | Already in 6 product-pair fuel docs |
| `who_it_is_for` (ideal_candidate) | **Required now** | 8 | In pairing fuel spec |
| `A_solves` | **Required now** | 8 | Core combination intelligence |
| `A_does_not_solve` | **Required now** | 8 | Core combination intelligence |
| `B_adds` | **Required now** | 8 | Core combination intelligence |
| `why_together` | **Required now** | 8 | In pairing fuel spec |
| `clinical_rationale` | **Required now** | 8 | In pairing fuel spec |
| `patient_education_summary` | **Required now** | 8 | Patient-safe education |
| `staff_close` | **Required now** | 8 | Already in 6 product-pair fuel docs |
| `top_objections` | **Required now** | 8 | 3-5 per combination |
| `do_not_say` | **Required now** | 8 | Already in 6 product-pair fuel docs |
| `sequencing_note` | **Required now** | 8 | In pairing fuel spec |
| `timing_note` | **Required now** | 8 | Phase 7 timing data |
| `downtime_note` | **Required now** | 8 | Staff need this for objection handling |
| `maintenance_story` | **Required now** | 8 | Light — 2-3 sentences |
| `rebooking_trigger` | **Required now** | 8 | Staff talking point |
| `source_support_summary` | **Required now** | 8 | Internal evidence reference |
| `provider_faq` | **Optional now** | 8 | If corpus yields strong FAQ patterns |
| `not_ideal_candidate` | **Required now** | 8 | In pairing fuel spec |
| Full maintenance protocol | **Defer** | 9 | Requires care plan architecture |
| Pricing tiers | **Defer** | 9 | Practice-specific |
| CRM automation triggers | **Defer** | 10 | Operational integration |
| Agent-optimized fuel packet | **Defer** | 10 | Token-optimized compilation |

### A-solves / A-doesn't / B-adds Tone Guide

**Good example (from corpus patterns):**
> "Neurotoxin relaxes the muscles that create dynamic lines — the wrinkles you see when you move your face. But once those muscles are relaxed, you may still see lines at rest, volume loss, and textural changes that movement-control alone cannot address. HA filler restores the structural volume and smooths the static lines that neurotoxin leaves behind. Together, they address both the cause (muscle movement) and the effect (tissue loss) of facial aging."

**Bad example (pressure/sales):**
> "Botox only does half the job. You really need filler too if you want to look good. Without both, you'll still look old."

**Quality test:** Does the A-solves/A-doesn't/B-adds read as clinical education or as a sales pitch? If it creates anxiety or implies the patient is incomplete without both, rewrite.

---

## Staff Close and Objection Handling Matrix

### Recommended Close Style

**Assumptive Comprehensive Recommendation → Patient Self-Sort**

Pattern:
1. Discover patient concerns and goals (needs-discovery)
2. Present the comprehensive plan that addresses all identified concerns
3. Explain what each component contributes
4. Let the patient choose scope based on their priorities and timeline
5. Never pre-judge affordability

Evidence: Near-unanimous across The Med Spa CEO, True to Form, Business of Aesthetics, Med Spa Success Strategies, Medical Spa Insider.

### Objection Matrix

| Objection | Patient Meaning | Recommended Response Pattern | Example Staff Language | Do-Not-Say | Evidence Source | Confidence |
|-----------|----------------|----------------------------|----------------------|------------|----------------|------------|
| "Too expensive" / Cost | May mean: can't afford, doesn't see value, comparing prices, or needs financing | Reframe as investment; show per-month cost; offer financing; connect to outcomes | "I understand — this is an investment in yourself. Let me show you what this looks like broken down monthly, and we also have financing options that make it very manageable." | "It's worth it" (subjective), "You get what you pay for" (dismissive), "Other places charge more" (competitor comparison) | True to Form (68% revenue increase with financing), Med Spa Accelerator, The Aesthetics Business Podcast | Moderate |
| "Do I really need both?" | Wants validation that each component matters; may be testing whether they can save money | Explain complementary roles using layer/foundation metaphor; acknowledge valid concern | "Great question. [Product A] addresses [X], but it can't reach [Y]. [Product B] is specifically designed for [Y]. Together they give you a more complete, natural-looking result. That said, we can absolutely start with one if you prefer." | "You need both" (pressure), "One alone won't work" (overstating), "You'll be disappointed with just one" (fear) | Dr David Mabrie (Business of Injecting), Dr Dusan Sajic (Business of Aesthetics) | Moderate |
| Fear of looking overdone | Fear of "pillow face," unnatural appearance, social judgment | Share conservative approach philosophy; show natural results; acknowledge the concern as valid | "I completely understand that concern — it's one of the most common things I hear. Our approach is always conservative and natural-looking. The goal is for people to say you look refreshed, not that you look 'done.'" | "That won't happen" (dismissing valid fear), "Trust me" (insufficient), "That only happens at cheap places" (competitor disparagement) | Alice Hart-Davis (Business of Injecting), Injector Podcast (Vanity Stigma) | Strong |
| Downtime concerns | Scheduling logistics, fear of visible recovery, work/social commitments | Give realistic downtime with "social downtime" distinction; plan around schedule | "Most patients experience [specific downtime]. What I call 'social downtime' — when you might not want to go to a dinner party — is usually [X days]. We can plan this around your schedule." | "No downtime" (when downtime exists), "You'll be fine immediately" (overpromising), minimizing real recovery needs | Business of Aesthetics (Phone Consultation), Dr Angelo Tsirbas (Business of Injecting) | Moderate |
| "I'll think about it" | May mean: not ready, needs more info, needs partner buy-in, or genuine deliberation | Respect the decision; offer follow-up; provide take-home materials | "Of course — this is an important decision and I want you to feel completely comfortable. I'll put together a summary of what we discussed so you can review at home. Would it be helpful if I followed up in a few days?" | "This offer expires" (false urgency), "You should decide now" (pressure), "Everyone says that and regrets waiting" (guilt) | Business of Aesthetics (Cialdini principles episode), Med Spa Accelerator | Weak |
| "Can I just start with one?" | Budget concern, testing the waters, risk aversion | Validate the approach; suggest the most impactful single treatment; plant seed for future | "Absolutely — that's a very reasonable approach. If we're starting with one, I'd recommend [X] because [reason]. Once you see how you feel about the result, we can add [Y] when you're ready." | "You won't get good results with just one" (discouraging), "That's a waste of money" (dismissive) | Implied by comprehensive-first + self-sort philosophy across multiple sources | Moderate |
| Event/timing | Wedding, reunion, vacation coming up | Plan backward from event; be honest about healing timeline | "When is the event? Let's plan backward from that date to make sure everything is settled and looking its best." | "We can rush it" (compromising safety), specific timeline guarantees | Sparse corpus evidence | Weak |
| Spouse/partner | Needs buy-in from partner; may be a deflection | Offer to include partner in consultation; provide materials they can share | "Would it be helpful to have [partner] join us for a consultation so they can understand the plan too?" | "This is YOUR decision" (dismissing relationship dynamics), "Your partner should want you to look your best" (manipulative) | The Med Spa CEO (one mention) | Weak |

---

## Do-Not-Say Specification

### Universal Do-Not-Say Categories

| Category | Risk | Bad Example | Safer Alternative | Evidence Basis |
|----------|------|-------------|-------------------|---------------|
| **Unsupported clinical claims** | Regulatory, legal liability | "This combination is clinically proven to reverse aging" | "Clinical studies show this combination produces high patient satisfaction" | PubMed PMID 39719485: "heterogeneous methodologies, small sample sizes" |
| **Guarantees** | Undeliverable promise, liability | "I guarantee you'll love the results" | "Most patients are very happy with their results, and we'll work together to achieve your goals" | ASA Guidelines (Aesthetics Business Podcast), FDA guidance |
| **"You need this" pressure** | Coercion, erosion of trust | "You really need both of these treatments" | "For the most comprehensive result, these work well together. Let me explain why." | The Med Spa CEO: under-recommendation harms but over-pressure destroys trust |
| **Fear-based selling** | Exploitation, compliance risk | "Without this treatment, your skin will only get worse" | "Treatment at this stage can help maintain and improve what you have" | Implicit across multiple podcast sources |
| **Competitor disparagement** | Unprofessional, potential legal | "The clinic down the street uses cheap products" | Focus only on your own approach and qualifications | Industry standard |
| **"Liquid facelift" overclaims** | Misleading equivalence to surgery | "This is just like a facelift without surgery" | "This is a non-surgical approach to facial rejuvenation that can achieve meaningful improvement" | PubMed: non-surgical cannot replicate surgical lifting for moderate-severe laxity |
| **"No downtime"** | Dishonest when downtime exists | "There's absolutely no downtime with this combination" | "Downtime is minimal — most patients return to normal activities within [X]" | Dr Tsirbas: patients upset when recovery exceeds stated expectations |
| **Permanent result claims** | All non-surgical treatments are temporary | "These results are permanent" | "Results typically last [X months/years] and can be maintained with follow-up treatments" | PubMed: all injectable/energy treatments have finite duration |
| **Off-label claims** | Regulatory violation | "This combination is FDA-approved" | "Each of these products has been individually FDA-cleared. Our protocol combines them based on clinical evidence and experience." | FDA: combinations are not separately approved |
| **"No risk"** | Every procedure carries risk | "This is completely risk-free" | "The safety profile for this combination is well-established, and I'll explain what to expect" | PubMed PMID 39434507: contraindications exist for all combinations |
| **Price/value claims practices may not honor** | Creates expectation mismatch | "This package saves you 30%" | Allow practices to set their own value framing | Practice-specific pricing |
| **Before/after exaggerations** | Misleading expectations | "You'll look 20 years younger" | "Patients typically see a refreshed, more rested appearance" | Compliance standard |

### Pair-Specific Do-Not-Say Additions

Each combination doc should include 1-3 pair-specific do-not-say items based on the specific products involved. Examples:
- Neurotoxin + filler: Do not say "Botox fills wrinkles" (mechanism confusion)
- Biostimulator + filler: Do not say "Sculptra works immediately" (it takes months)
- RF microneedling + neurotoxin: Do not say "RF makes Botox last longer" (unsubstantiated)

---

## Full Face Refresh Framework

### Recommendation

Full Face Refresh is a **framework** (not a fixed package) that practices customize.

### Pillar Model (Corpus-Derived)

**Recommended: Zone × Modality matrix**

**Zones** (from Dr Arthur Swift, The Business of Injecting):
1. Upper face (forehead, brow, crow's feet)
2. Mid face (cheeks, nasolabial, under-eyes)
3. Lower face (marionette, jowls, chin, jawline)
4. Periorbital (treated as special zone)
5. Neck/decolletage (optional extension)

**Modality Layers** (synthesized from corpus):
1. **Movement control** — Neurotoxin (dynamic wrinkles, muscle relaxation)
2. **Structural restoration** — HA filler (volume, contour, static lines)
3. **Foundation stimulation** — Biostimulator (collagen, elastin, long-term)
4. **Surface refinement** — Energy/laser/skin treatments (texture, tone, quality)
5. **Maintenance** — Skincare + scheduled follow-up

Not every patient needs every layer in every zone. The framework maps what's possible; the consultation determines what's appropriate.

### Competing Models Evaluated

| Model | Verdict | Notes |
|-------|---------|-------|
| Freeze + Fill + Finish | Not in corpus | Could be used as a simplified marketing label if Chris approves |
| Freeze + Fill + Stimulate + Finish | Not in corpus | More complete but still not validated |
| Freeze + Fill + Stimulate + Tighten + Maintain | Not in corpus | Most comprehensive single-axis model |
| Upper / Mid / Lower + Periorbital | **In corpus (Dr Swift)** | Zone-based, clinically grounded |
| Bone → Layers approach | **In corpus (multiple)** | Anatomy-based, reflects aging pathology |
| Zone × Modality matrix | **Synthesis** | Recommended — captures both dimensions |

### "Liquid Facelift" Guidance

The term "liquid facelift" appears in the corpus (YouTube provider education) but carries overclaim risk:
- **Can say:** "Non-surgical facial rejuvenation" or "injectable rejuvenation"
- **Cannot say:** "Just like a facelift" or "replaces surgery"
- **Clinical reality:** Non-surgical approaches cannot address moderate-to-severe skin laxity that surgical lifting addresses
- **Recommendation:** Use "Full Face Refresh" or "Comprehensive Facial Rejuvenation" instead of "liquid facelift"

### Practice Configurability

- Practices choose which zones to offer
- Practices choose which products fill each modality layer
- Practices name their own packages
- A360 provides the framework, default names, and content; practices customize

---

## Hero Combination Priority List

| Priority | Combination | Category | Why It Matters | Evidence | Commercial Value | Clinical Confidence | Chris Review |
|----------|------------|----------|---------------|----------|-----------------|--------------------|----|
| 1 | Neurotoxin + HA Filler | Facial injectable | Universal entry combination; highest volume; strongest evidence | Strong (multiple RCTs, consensus papers, retention data) | Very High | High | No |
| 2 | Neurotoxin + HA Filler + Skin Quality | Comprehensive facial | The "next step" from basic combination; full face concept | Moderate (multimodal retention data) | Very High | Moderate | No |
| 3 | HA Filler + Biostimulator (Sculptra) | Facial injectable + regenerative | Volume now + collagen later; growing category | Moderate (systematic review, some methodology concerns) | High | Moderate | No |
| 4 | RF Microneedling + Injectables | Energy + injectable | Morpheus8 popularity; strong safety data | Strong (4.5-year, 18-year safety reviews) | High | High (safety) | No |
| 5 | PRP/PRF + Microneedling | Regenerative + skin | Popular "natural" combination; meta-analysis support | Strong for scars; Moderate for rejuvenation | Medium-High | High (scars) | No |
| 6 | Biostimulator + Energy Device | Regenerative + energy | Collagen + tightening; high perceived value | Moderate (limited evidence) | High | Moderate | Yes |
| 7 | Chemical Peel + Injectable | Skin + injectable | Common entry-level combination | Emerging (very limited studies) | Medium | Low | Yes |
| 8 | Full Face Comprehensive (3+ modalities) | Multi-category | The aspirational "Full Face Refresh" | Moderate (retention strong, outcome data limited) | Very High | Moderate | Yes |
| 9 | Body: CoolSculpting + Skin Tightening | Body contouring | Addresses fat + laxity together | Moderate (small studies) | High | Moderate | Yes |
| 10 | Body: Cryolipolysis + EMMS | Body contouring | Fat + muscle; CoolSculpting + Emsculpt archetype | Moderate (PMID 32976168) | High | Moderate | Yes |

---

## Maintenance and Rebooking Specification

### Phase 8 Scope (Light)

| Field | Include in Phase 8? | Content |
|-------|-------------------|---------|
| `maintenance_story` | **Yes** | 2-3 sentences: when to return, what ongoing relationship looks like, why continuity matters |
| `rebooking_trigger` | **Yes** | The natural consultation moment to discuss next visit (staff talking point) |
| `next_visit_prompt` | **Yes** | Simple "when to come back" language |
| `annual_plan_note` | **Optional** | If corpus supports annual framing for this combination |
| `membership_note` | **Defer to Phase 9** | Membership is practice-specific; too operational for Phase 8 |
| `maintenance_cadence_summary` | **Defer to Phase 9** | Specific intervals require care plan architecture |

### Maintenance Story Examples (from corpus)

**Neurotoxin + Filler:**
> "Most patients return every 3-4 months for neurotoxin maintenance and evaluate their filler annually. Think of it as ongoing care — similar to how you'd see a dentist regularly, consistent aesthetic maintenance helps preserve your results and keeps you looking naturally refreshed."

**Biostimulator + Filler:**
> "Your biostimulator continues working for several months after treatment, building your own collagen foundation. We'll typically see you for follow-up in 6-8 weeks to evaluate progress, and plan the next session based on how your tissue is responding."

### Rebooking Language (from corpus)

- *True to Form*: "Retention is so much cheaper than acquisition."
- *VIO Med Spa*: "Like a personal trainer for your skin."
- *Medical Millionaire*: "Rebook and then also sell them a product... put them on a membership plan."
- *Business of Aesthetics*: "An aesthetic patient is worth eight to $10,000... Once trust is built, more than 50% return within three months."

### What Defers to Phase 9

- Full treatment plans with specific session counts and intervals
- Pricing packages for maintenance
- CRM/rebooking automation rules
- Membership tier design
- Annual aesthetic plan templates

### What Defers to Phase 10

- Agent-ready maintenance prompts
- Reach campaign triggers from maintenance windows
- Automated rebooking suggestions in agent output

---

## Storage and Schema Recommendation

### Recommendation: Option A — Use `gl_agent_fuel_documents` (No Schema Change)

**Rationale:**
1. The table already has 16 pairing fuel docs with the exact fields needed
2. All docs are `status = 'draft'` — can be freely restructured
3. `agent_fuel_json` (JSONB) accommodates any content structure
4. `review_status`, `product_ids[]`, `relationship_ids[]`, `audience[]`, `patient_safe` already exist
5. No migration needed
6. Agent retrieval is already built around this table

**What must happen:**
1. Reconcile the two existing JSON formats (6 product-pair flat + 10 archetype nested) into one canonical schema
2. Add combination intelligence fields to the canonical schema
3. All 16 docs get restructured to match
4. New combination docs follow the canonical schema

### Why Not Option B (new `combination_content` table)

- Fragments the content surface — agents query one table today
- Requires new migration, new retrieval logic, new review workflow
- The pairing fuel spec already established `gl_agent_fuel_documents` as the home for all fuel content
- No capability gap that justifies a separate table

### Why Not Option C (JSONB on `item_relationships`)

- `gl_product_relationships` already has `staff_talking_points` and `patient_education_text` — shallow fields
- Rich combination intelligence (15+ fields) does not belong on the relationship table
- The pairing fuel spec explicitly separates relationship metadata (on the relationship table) from fuel content (in fuel documents)
- Queryability concerns — JSONB on a 1,774-row relationship table is less organized than dedicated fuel docs

### Entity References

Each fuel doc should reference:
- `product_ids[]` — all products in the combination
- `relationship_ids[]` — the `gl_product_relationships` rows that this combination covers
- `concern_ids[]` — patient concerns that trigger this combination
- `anatomy_area_ids[]` — relevant anatomy areas
- `audience[]` — who can see this content (agent, staff, provider, patient)
- `patient_safe` — whether the content can be shown to patients

### Content vs. Package Distinction

Combination intelligence content (Phase 8) describes **pairs**. Package content (future) describes **bundles of pairs**. If A360 later needs package-level content (e.g., "Full Face Refresh" as a package containing 3+ pairs), that could be:
- A new `fuel_type = 'package_fuel'` in `gl_agent_fuel_documents`
- Or a new table specifically for packages

This distinction does not need to be resolved in Phase 8. Phase 8 builds pair-level content; package-level content can be composed from pairs later.

---

## Deliverables Recommendation

### Required Now (Phase 8)

| Deliverable | Purpose |
|-------------|---------|
| `PHASE_8_COMBINATION_RESEARCH_SPEC.md` | This document — research basis for all decisions |
| `COMBINATION_RUBRIC.md` | Quality criteria for each combination doc |
| `REVIEW_QUEUE/combinations/*.md` | One markdown file per combination for human review |
| `COMBINATION_QA_REPORT.md` | Pass/fail results of staff language quality test |
| Canonical JSON schema definition | The reconciled pairing fuel JSON format |

### Required After Review Approval

| Deliverable | Purpose |
|-------------|---------|
| SQL upserts to `gl_agent_fuel_documents` | Approved combination docs written to Supabase |
| `agent_fuel_markdown` population | LLM-readable format for each approved doc |

### Optional Now

| Deliverable | Purpose |
|-------------|---------|
| `COMBINATION_EVIDENCE_PACK.md` | Detailed evidence citations for each combination |
| `COMBINATION_CORPUS_QUERY_LOG.md` | All search queries and results for reproducibility |

### Deferred

| Deliverable | Phase | Purpose |
|-------------|-------|---------|
| Care plan templates | 9 | Full treatment plans with intervals |
| Agent fuel compilation | 10 | Token-optimized fuel packets |
| CRM integration specs | 10+ | Operational rebooking automation |

### Review Workflow

1. Phase 8 agent generates combination content → writes to `REVIEW_QUEUE/combinations/{archetype_id}.md`
2. Each file includes all fields from the content template
3. Chris reviews each file against the rubric
4. Approved files → SQL upsert to `gl_agent_fuel_documents` with `status = 'active'`
5. Rejected files → revision notes → regeneration

---

## Staff Language Quality Test

### The "Would Trained Staff Actually Say This?" Checklist

Every combination document must pass ALL of these before SQL generation:

```
[ ] Sounds like provider-mediated education, not a sales script
[ ] Explains why both treatments are relevant to the patient's concern
[ ] Does not imply the patient "needs" more treatment
[ ] Avoids guarantees ("you will," "guaranteed," "always works")
[ ] Avoids unsupported clinical claims
[ ] Avoids fear-based language ("your skin will only get worse")
[ ] Uses patient-understandable outcome language (not jargon)
[ ] Preserves clinical accuracy
[ ] Includes realistic downtime/timing caveats
[ ] Could be said by a trained aesthetic consultant in a real consultation
```

### Pass/Fail Examples

**PASS:** "Neurotoxin relaxes the muscles that create expression lines. For many patients, addressing the underlying volume loss with filler at the same time creates a more balanced, natural-looking result."

**FAIL:** "You definitely need both Botox and filler. Botox alone won't give you the results you're looking for. Without filler, your face will still look aged."

**FAIL reasons:** "Definitely need" (pressure), "won't give you results" (fear/discouraging), "will still look aged" (fear-based)

### Common Failure Modes

1. **Sales-script voice** — sounds like a car dealership, not a medical consultation
2. **Jargon overload** — "neocollagenesis" and "fibroblast stimulation" are provider terms, not patient language
3. **Anxiety creation** — implying the patient has a problem they didn't come in about
4. **Generic platitudes** — "comprehensive rejuvenation" that could describe any treatment
5. **Unsupported specifics** — "reduces wrinkles by 40%" without citing the specific study

### Podcast Quote Benchmarks

Staff language should sound similar to these expert quotes:

- "It's really important to put the patient in focus and putting a patient-specific plan of action into place." — Sara Cheeney
- "If you want to treat your under eyes, we typically have to treat these three areas together." — Dr David Mabrie
- "Your ageless journey is absolutely a multimodality approach." — Suzie Hoitink
- "You're not just paying for the syringe. You're paying for my artistry." — The Aesthetic Doctor

---

## Combination Evidence Matrix (Clinical)

| Combination | Evidence Level | Key Findings | Supported Claims | Unsupported Claims |
|-------------|---------------|--------------|-----------------|-------------------|
| Neurotoxin + HA Filler | **Strong** | Multiple RCTs, global consensus, retention data | Higher satisfaction vs. monotherapy; addresses dynamic + static aging | "Required for all patients"; specific % improvement without citation |
| RF Microneedling + Injectables | **Strong (safety)** | 4.5-year and 18-year safety reviews | Same-session safety established; complementary mechanisms | Specific device brand superiority; timeline claims |
| PRP + Microneedling (scars) | **Strong** | Meta-analysis: superior to microneedling alone | Synergistic for acne scarring; 36% had >75% improvement in combo group | PRP standardization claims; universal efficacy |
| Biostimulators + Other | **Moderate** | Systematic review notes methodology limitations | Collagen stimulation (histological evidence); staged protocols | Well-studied as combinations; specific collagen quantity |
| Body Contouring Combos | **Moderate** | Small studies (cryolipolysis + RF, EMMS + cryo) | Enhanced efficacy in small trials | Large-scale validated outcomes |
| Chemical Peel + Injectable | **Emerging** | Very limited studies | Enhanced aesthetic result | Clinically proven combination |
| Multimodal (3+ modalities) | **Moderate** | Strong retention data; limited outcome data | 2.5x higher 6-month retention; high satisfaction | Superiority over fewer modalities in outcomes |

---

## Open Questions for Chris

1. **Which hero combinations should be prioritized for the demo?** Research suggests starting with neurotoxin+filler, but the demo may want to showcase the Full Face Refresh framework with a more comprehensive example.

2. **Does A360 want to use "Full Face Refresh" as a brandable package name?** The corpus does not validate this term — it would be an A360 innovation. Is that the intent?

3. **Should practices be allowed to rename packages?** Recommended yes, but this affects whether A360 invests in brand-building around package names.

4. **Should any pricing language be included anywhere?** Recommended no. The corpus supports "investment" framing but never includes dollar amounts. Does Chris agree?

5. **Which package tiers should be shown: essential/premium or good/better/best?** The corpus supports comprehensive-first with patient self-sort. Does Chris want explicit tiers?

6. **Should body contouring combinations follow the same template or a separate one?** Corpus coverage is thin for body. A separate template may be warranted but requires more research.

7. **Are there practice-specific do-not-say rules?** Some practices may have additional restrictions based on their regulatory environment or brand standards.

8. **Are there competitor packages A360 should match or avoid?** The corpus has minimal competitor package data. Is this a research gap Chris wants filled?

9. **Are there experts whose philosophy Chris wants to anchor the content?** Dr Arthur Swift (systematic approach) and The Med Spa CEO (premium selling) are the strongest voices in the corpus. Should their philosophy anchor A360's approach?

10. **Should the reconciled JSON format be backward-compatible with the 6 existing product-pair fuel docs, or is a clean break acceptable?** All 16 docs are draft status — clean break is recommended.

---

## Final Research Conclusion

### Best-Supported Answers

Phase 8 should:
1. **Extend the existing pairing fuel architecture** — add combination intelligence fields to the `agent_fuel_json` schema, reconcile the two existing formats, and enrich all 16 pairing fuel documents
2. **Use education-first staff language** grounded in corpus-validated consultative selling philosophy
3. **Include a robust do-not-say framework** covering unsupported claims, guarantees, pressure, fear, and overclaims
4. **Build the Full Face Refresh as a framework** (zone × modality matrix) that practices customize
5. **Include light maintenance stories** and rebooking triggers; defer full care plans to Phase 9
6. **Store all content in `gl_agent_fuel_documents`** — no new tables needed

### What to Implement Now
- Canonical JSON schema for combination intelligence
- Combination content for priority 1-5 hero combinations
- Universal do-not-say list
- Universal objection matrix
- Staff language quality test checklist
- Review queue workflow

### What to Defer
- Good/better/best tiering (Phase 9 or practice configuration)
- Full maintenance protocols (Phase 9)
- Agent fuel compilation (Phase 10)
- CRM/rebooking automation (Phase 10+)
- Body contouring separate template (needs more research)

### What Needs Chris Review
- Full Face Refresh naming and pillar model
- Hero combination priority order
- Package tiering approach
- Body contouring template decision
- Anchor experts/philosophy

### Evidence Gaps
- Good/better/best tiering for aesthetic packages — no structured corpus examples
- Body contouring combination packages — sparse coverage
- Specific objection-handling scripts — philosophy strong, scripts weak
- Competitor package architectures — minimal corpus data
- "I'll think about it" and spouse/partner objection handling — almost absent
- Maintenance interval evidence for combinations — expert consensus only, no RCTs
- "Freeze + Fill + Finish" — not in corpus; A360 invention

### What Should Be Blocked from Publication Until Reviewed
- Any combination document with unsupported clinical claims
- Any content with do-not-say violations
- Any content that fails the staff language quality test
- Any "Full Face Refresh" branded content until Chris approves the name
- Body contouring combination content until template is validated
- Any content implying FDA approval of combination protocols
