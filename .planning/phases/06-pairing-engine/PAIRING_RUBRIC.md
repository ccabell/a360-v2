# Phase 06: Pairing Rubric

**Created:** 2026-06-13
**Purpose:** Evaluation standard for the 8-gate legitimacy test applied to all product pairs. Defines tier classifications, gate pass/fail criteria, hard stops, content-depth rules, and review requirements.

**Governing decisions:** D-01 through D-21 in 06-CONTEXT.md

---

## Tier Definitions

### canonical

**Description:** Universally recommended combination. The clinical rationale is strong, the evidence is deep, and most patients presenting with the relevant concerns would benefit from both treatments. This is the "standard of care" level pairing.

**Gate requirement:** All 8 gates pass.

**Evidence requirement:** Strong corpus evidence from 2+ independent sources (podcast expert discussion, PubMed study, or clinical protocol). Sequencing and timing must be documented.

**Content depth:** Full -- clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points.

**DB emission rule:** INSERT into item_relationships with is_active=false. Awaits Chris review before publication.

**Example hypothesis:** Neurotoxin + HA Filler (movement control + volume restoration). Supported by 90-woman dose-ranging study and multiple podcast expert endorsements.

---

### common

**Description:** Widely practiced combination. Most experienced injectors use this pairing regularly. Evidence is solid but may not be as universally documented as canonical pairs.

**Gate requirement:** 7-8 gates pass. Any single non-safety gate failure must have documented rationale.

**Evidence requirement:** Moderate corpus evidence from 1+ source. At least one expert discussion or clinical reference.

**Content depth:** Full -- clinical_rationale, timing_guidance, same_session_ok, patient_education_text, staff_talking_points.

**DB emission rule:** INSERT into item_relationships with is_active=false. Awaits Chris review before publication.

**Example hypothesis:** Sculptra + RF Microneedling (collagen foundation + texture refinement). Supported by expert discussion of fibroblast stimulation synergy.

---

### conditional

**Description:** Works under specific clinical conditions. The pairing is valid but requires explicit conditions to be met -- patient age range, tissue quality, treatment spacing, or technique considerations. Not appropriate for all patients.

**Gate requirement:** 5-7 gates pass with explicit conditions noted for any gate that is marginal.

**Evidence requirement:** At least one corpus source discussing the combination. Conditions must be documented from clinical evidence, not assumed.

**Content depth:** clinical_rationale + timing_guidance + conditions (documented in source_reference field). patient_education_text and staff_talking_points are not required.

**DB emission rule:** INSERT into item_relationships with is_active=false.

**Example hypothesis:** HA filler near existing threads -- different tissue planes, technique-sensitive. Conditional on injector skill and plane separation.

---

### compatible_only

**Description:** Technically safe to combine but no strong clinical rationale to actively recommend as a pairing. Products can coexist in the same treatment plan without interference, but the combination does not create synergy beyond what each product achieves independently.

**Gate requirement:** Passes safety gate. May fail concern overlap, mechanism complementarity, or source support.

**Evidence requirement:** No corpus evidence required. Safety must be established (no known contraindications).

**Content depth:** Short clinical_rationale only (1-2 sentences). No timing_guidance, patient_education_text, or staff_talking_points required.

**DB emission rule:** INSERT into item_relationships with is_active=false.

---

### do_not_market

**Description:** A relationship exists (especially alternatives per D-02) but should not be recommended as a combination to patients. The pair may be clinically meaningful (e.g., substitution decisions between Botox and Dysport) but marketing it as a "combination" would be misleading or inappropriate.

**Gate requirement:** Not evaluated through the standard 8-gate process. Assigned based on relationship type (alternatives, safety-gated combinations).

**Evidence requirement:** Documented rationale for suppression.

**Content depth:** Suppression rationale only. Explains why the pair exists in the system but is not recommended.

**DB emission rule:** Selective INSERT per D-16. Alternatives always get rows. Safety-suppressed pairs get rows if needed as guardrails.

**Example:** Botox vs. Dysport (same-class neurotoxin alternatives). Documented as alternative + do_not_market. Clinically valuable intelligence for substitution decisions, not a combination to recommend.

---

### rejected

**Description:** Fails the safety gate (Gate 5) with no conditions that would make it viable, or the "why both?" question has no genuine answer. Report-only in PAIRING_EVALUATION.md.

**Gate requirement:** Fails safety gate (hard stop) OR fails the "why both?" test entirely.

**Evidence requirement:** N/A -- the evidence is that the combination should not exist.

**Content depth:** Report-only in PAIRING_EVALUATION.md. No DB row unless needed as a hard suppression guardrail.

**DB emission rule:** Usually no DB row. Exception: if the pair needs to exist as a negative signal (e.g., hyaluronidase + HA filler same day = explicit contraindication row).

**Example:** Hyaluronidase + HA filler same session. Expert consensus: micro channels cause HA to spread. Wait minimum 2 days, ideally 6 weeks.

---

## Gate Definitions

### Gate 1: Concern Overlap

**Question:** Do both products address at least one shared patient concern?

**Pass criteria:** At least one concern_id appears in both products' item_concerns rows. Semantic overlap also counts (e.g., "Skin Laxity" in one product and "Age-Related Volume Loss" in the other, both driven by the same underlying aging process).

**Fail criteria:** Zero shared concerns at both the SQL level (item_concerns JOIN) and the semantic level (LLM evaluation of dossier content).

**Data sources:** SQL-derivable via item_concerns JOIN. Secondary: dossier prose, concern_clusters membership.

**Hard stop:** No. Some valid pairs have no formal concern overlap (e.g., body contouring + neurotoxin for different body areas in the same treatment plan). Failure here means the pair needs stronger justification from other gates.

**Notes field guidance:** Name the shared concerns. If no SQL overlap, explain the semantic or clinical rationale for why these products address related patient needs.

---

### Gate 2: Mechanism Complementarity

**Question:** Do the products work through different mechanisms addressing different aspects of the concern?

**Pass criteria:** Product A's mechanism of action is distinct from Product B's, and together they address the concern more completely than either alone. The "temperature layering" framework (Tracy Mancuso) is the gold standard: low heat (fibroblast stimulation), moderate heat (coagulation/remodeling), high heat (wound healing), plus injectables (volume/relaxation).

**Fail criteria:** Both products work through the same mechanism (e.g., two HA fillers addressing the same concern at the same depth). "More of the same" is not complementarity.

**Data sources:** does_not_solve array cross-referenced with item_concerns. Dossier prose (mechanism of action sections). Corpus evidence (podcast expert discussion of why both are needed).

**Hard stop:** No. Products with the same mechanism may still have valid pairings (e.g., two different HA fillers at different tissue depths), but this requires explicit justification.

**Notes field guidance:** Describe Product A's mechanism, Product B's mechanism, and how they complement each other. Reference "Product A cannot [limitation] which Product B addresses."

---

### Gate 3: Limitation Coverage

**Question:** Does Product A's does_not_solve list include something Product B treats (and/or vice versa)?

**Pass criteria:** At least one entry in Product A's does_not_solve array semantically matches a concern that Product B addresses (via item_concerns or dossier content). This is the core "why both?" gate.

**Fail criteria:** Neither product's limitations are addressed by the other. If both products treat the same concerns and have the same limitations, combining them adds no value.

**Data sources:** does_not_solve TEXT[] array on products table. item_concerns for the partner product. SQL can do string-level matching; LLM does semantic matching for near-misses.

**Hard stop:** No. But failure here combined with failure at Gate 2 is a strong signal that the pair is compatible_only at best.

**Notes field guidance:** Quote the specific does_not_solve entry from Product A and name the matching concern in Product B. This becomes the foundation of clinical_rationale.

---

### Gate 4: Timing Compatibility

**Question:** Can the products be used in the same treatment plan with safe and practical sequencing?

**Pass criteria:** Products can be scheduled in a clinically safe sequence. Timing intervals are documented. same_session_ok determination is made with evidence.

**Fail criteria:** Products have incompatible timing requirements that make combining them impractical (e.g., one requires 6 months of healing before the other can begin, with no interim benefit).

**Data sources:** products.interval_between_treatments, products.same_session_compatible columns. Corpus evidence for expert-discussed sequencing protocols.

**Hard stop:** No. But same_session_ok must be explicitly justified. Default to false if uncertain.

**same_session_ok determination rules:**
- YES if experts explicitly discuss same-session use with evidence
- YES if products target different tissue planes or anatomical areas with no interaction
- NO if one product creates inflammation that affects the other
- NO if one product is a dissolving agent (hyaluronidase)
- NO if legal restrictions exist (e.g., France: filler + toxin same session prohibited)
- CONDITIONAL if timing depends on technique (document the condition)

**Sequencing rules (from podcast corpus):**
- Sculptra + PDO Threads: Sculptra FIRST, then threads ("threads grab the new collagen")
- Sculptra + HA Filler: Sculptra for foundation, HA for contour ("Sculpt & Lift" protocol)
- Energy devices + Injectables: Energy first, injectables after (generally)
- Skincare/laser + Injectables: Skincare/laser foundation before injectables
- Neurotoxin + Filler same session: Neurotoxin first, then filler

**Notes field guidance:** Document specific timing intervals. State same_session_ok with evidence. Note sequencing order if applicable.

---

### Gate 5: Safety

**Question:** Are there known contraindications, adverse interactions, or excessive dosing risks when combining these two products?

**Pass criteria:** No known contraindications. No adverse interaction risk at standard dosing. No excessive cumulative tissue trauma.

**Fail criteria:** Known contraindication exists. Adverse interaction documented. Excessive dosing risk (e.g., >50 units neurotoxin per session increasing antibody formation risk). Active ingredient conflict.

**Data sources:** Dossier clinical sections (contraindications, warnings). PubMed corpus (adverse event reports, interaction studies). FDA labels. Podcast expert safety discussions.

**Hard stop:** YES. If Gate 5 fails, the pair CANNOT be tiered canonical or common. Maximum tier is conditional (with explicit safety conditions documented) or do_not_market/rejected.

**Known safety flags (from podcast corpus):**
- Hyaluronidase + HA filler same day: REJECT (micro channels cause HA to spread)
- >50 units neurotoxin per session: FLAG (antibody formation risk)
- Filler-only "liquid facelift" for 50+ patients with tissue laxity: FLAG (exceeds filler capability)
- HA filler near existing threads: CONDITIONAL (different planes, technique-sensitive)
- Post-cannula makeup same day: FLAG (infection risk, 48-hour wait)
- France: Botox + filler same session: FLAG (legal prohibition in some jurisdictions)

**Notes field guidance:** Name specific safety concern. Cite source (PubMed, FDA, expert). If conditional, state the exact conditions under which the combination is safe.

---

### Gate 6: Commercial Viability

**Question:** Would a practice realistically offer this combination? Does it make business sense?

**Pass criteria:** The combination represents a plausible treatment plan that practices would actually bundle or recommend. Patient demand exists. Pricing is practical.

**Fail criteria:** The combination is technically valid but so obscure or impractical that no real practice would offer it. Equipment requirements are unrealistic. Patient demand is negligible.

**Data sources:** Podcast economics discussion (average ticket, bundling, protocol-driven practice data). Practice patterns. Market prevalence.

**Hard stop:** No. But failure here suggests compatible_only at best.

**Key evidence:** AmSpa data shows bundled/protocol-driven practices see 25-40% higher annual spend per patient. Decision fatigue reduces purchases by ~40%. This supports well-structured combinations over a la carte menus.

**Notes field guidance:** Note whether practices commonly offer both products. Reference any bundling or protocol evidence.

---

### Gate 7: Patient Clarity

**Question:** Can a patient understand why they need both treatments?

**Pass criteria:** A non-technical explanation exists that makes intuitive sense. The "why both?" answer is genuine, not promotional. Patients can grasp the distinct benefit of each product.

**Fail criteria:** The explanation requires excessive clinical knowledge. The "why both?" sounds like an upsell. The patient would reasonably ask "couldn't I just do one?"

**Data sources:** LLM judgment using product aliases, patient_education patterns. Podcast examples of how experts explain combinations to patients.

**Hard stop:** No. But failure here is a strong signal that staff_talking_points will be promotional rather than educational.

**Anti-patterns:**
- "You need both for the best results" (vague, sounds like upselling)
- "The premium package includes both" (commercial framing)
- "Guaranteed improvement with the combination" (unsupported claim)

**Good patterns:**
- "Botox relaxes the muscles that cause lines, but it can't restore volume that's been lost. Filler addresses a different problem." (Distinct mechanisms, patient-understandable)
- "Think of it like painting a wall -- you need to fix the drywall first (collagen stimulation), then paint (surface treatments)." (Metaphor from podcast experts)

**Notes field guidance:** Draft a one-sentence patient explanation. Flag if the explanation feels forced.

---

### Gate 8: Source Support

**Question:** Is there corpus evidence supporting this combination?

**Pass criteria:** At least one corpus chunk (podcast expert discussion, PubMed study, clinical protocol, industry article) directly discusses this product combination or category combination.

**Fail criteria:** Zero corpus evidence across all 4 sources (podcast, YouTube, PubMed, industry) after querying with the D-18 query patterns.

**Data sources:** CMS Supabase RPCs (match_podcast_chunks, match_youtube_transcripts, match_pubmed_articles, match_industry_articles) on project gjqicqldjgvrwmtkliie.

**Hard stop:** No. But zero corpus evidence triggers the no-corpus rule: maximum tier is conditional (with explicit LOW_CONFIDENCE flag) or compatible_only. A pair CANNOT receive canonical or common without expert evidence.

**Query patterns (per D-18):**
- `{Product A} {Product B}`
- `combination treatment {Product A}`
- `stacking {category A} {category B}`
- `same session {Product A} {Product B}`
- `sequencing {Product A} {Product B}`
- `contraindication {Product A} {Product B}`
- `{Product A} vs {Product B}` (for alternatives)

**Notes field guidance:** Cite the strongest corpus evidence. Log the query used. Flag LOW_CONFIDENCE if no evidence found.

---

## Hard Stops

The following conditions prevent a pair from being tiered canonical or common, regardless of how well it scores on other gates.

### 1. Safety Gate Failure (Gate 5)

If Gate 5 fails, the pair cannot be canonical or common. Maximum tier is conditional (with explicit safety conditions) or do_not_market/rejected.

**Rationale:** Patient safety is non-negotiable. A combination with known safety concerns should never be presented as a standard recommendation.

### 2. Promotional or Circular "Why Both?"

If the clinical rationale is promotional ("premium results package"), circular ("they complement each other because they work well together"), or empty, the pair is rejected or do_not_market.

**Test:** Remove all marketing language from the clinical_rationale. If nothing clinically substantive remains, the "why both?" is promotional.

### 3. No Corpus Evidence (No-Corpus Rule)

If the CMS corpus returns zero evidence across all 4 sources (podcast, YouTube, PubMed, industry) for a pair, the pair cannot be canonical or common. Maximum tier is conditional (with explicit LOW_CONFIDENCE flag) or compatible_only.

**Rationale:** Per the corpus-first enrichment standard (D-17), pairing intelligence must be grounded in expert discussion, not LLM speculation. "Sounds reasonable" is not evidence.

### 4. Pressure Language in Staff Talking Points

If staff_talking_points contain pressure language, guaranteed outcomes, or unsupported claims, the pair fails the D-08 review checklist and cannot be published.

**Anti-patterns:** "upsell", "premium package", "guaranteed results", "you need both", "everyone should get this"

**Good patterns:** Education-first, gateway posture. "When a patient is focused on one concern, this helps the team explain why that treatment may only solve part of the issue."

---

## Content-Depth Rules

Per D-12, each tier requires different content fields.

| Tier | clinical_rationale | timing_guidance | same_session_ok | patient_education_text | staff_talking_points |
|------|---|---|---|---|---|
| canonical | Required (detailed) | Required (with sequencing) | Required (boolean + justification) | Required ("Tell the patient: ...") | Required (education-first hybrid) |
| common | Required (detailed) | Required (with sequencing) | Required (boolean + justification) | Required ("Tell the patient: ...") | Required (education-first hybrid) |
| conditional | Required (with conditions) | Required + conditions noted | Required (boolean + justification) | Not required | Not required |
| compatible_only | Short rationale (1-2 sentences) | Not required | Optional | Not required | Not required |
| do_not_market | Suppression rationale | Not required | N/A | Not required | Not required |
| rejected | Report-only (in PAIRING_EVALUATION.md) | N/A | N/A | N/A | N/A |

### Field Specifications

**clinical_rationale:** The clinical reason why both products are needed. Must reference specific mechanisms, limitations addressed, and evidence. For canonical/common: 3-5 sentences. For conditional: 2-3 sentences with conditions. For compatible_only: 1-2 sentences.

**timing_guidance:** When to use each product relative to the other. Include: recommended spacing, sequencing order, maintenance intervals. Reference podcast expert protocols where available.

**same_session_ok:** Boolean + justification. Must cite evidence. Default to false if uncertain.

**patient_education_text:** Provider-facing text using "Tell the patient: ..." framing (per D-14). A360 is provider-mediated -- content helps staff explain, not bypass clinical judgment. Written at patient comprehension level but delivered through the provider.

**staff_talking_points:** Education-first hybrid clinical + consultation-ready tone (per D-13). Gateway posture: clinical accuracy + patient education + consultation-ready phrasing. No pressure language, overpromising, guarantees, or unqualified claims. Good/better/best framing where appropriate.

---

## Content Tone Rules

### Staff Talking Points (per D-13)

Staff talking points use a hybrid clinical + consultation-ready tone. Education-first, not pressure-based.

**Gateway posture applies:** Clinical accuracy + patient education + consultation-ready phrasing.

**Required qualities:**
- Factually grounded (references specific mechanisms or evidence)
- Patient-empowering (helps them understand their options)
- Clinically conservative (acknowledges limitations and conditions)
- Consultation-ready (can be used verbatim in a patient conversation)

**Forbidden qualities:**
- Pressure language ("you need both", "don't miss this opportunity")
- Overpromising ("guaranteed results", "dramatic transformation")
- Unqualified claims ("the best combination", "everyone benefits")
- Package-first framing ("the premium package includes...")

**Good/better/best framing:** Where appropriate, structure talking points to present treatment options at different levels of comprehensiveness, letting the patient choose based on their goals and budget. This is education-first bundling, not upselling.

**Example (good):**
> "When a patient comes in concerned about looking tired, you might explain: 'Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you're also noticing that your cheeks look flatter than they used to, that's volume loss, which Botox can't address. Filler works on a different layer to restore that structure. Some patients choose to address both in the same visit, while others prefer to start with one and see how they feel.'"

**Example (bad):**
> "Always recommend the Botox + filler combo package. Most patients say yes when you present it as a bundle. Upselling is key to increasing your average ticket."

### Patient Education Text (per D-14)

Patient education text uses provider-facing "Tell the patient: ..." framing.

**Key principle:** A360 is provider-mediated. The text is written FOR providers to use WITH patients, not sent directly to patients.

**Format:**
> Tell the patient: "[explanation in patient-friendly language]"

**Example:**
> Tell the patient: "Botox helps relax the muscles that cause expression lines -- like frown lines and crow's feet. But it can't restore volume that's been lost over time. If you're noticing both lines from movement AND a loss of fullness in your cheeks, filler addresses that volume loss through a completely different approach. Many patients find that treating both concerns creates a more balanced, natural-looking result than treating either one alone."

---

## Review Checklist

Per D-08, each canonical and common pair must pass this 14-item checklist before Chris approves publication (is_active flipped to true).

- [ ] **1. Clinical rationale is accurate and non-promotional** -- The "why both?" is grounded in clinical evidence, not marketing language.
- [ ] **2. Proposed tier is correct** -- The tier assignment matches the evidence strength and gate results.
- [ ] **3. relationship_type and relationship_strength are correct** -- Clinical descriptors accurately reflect the mechanism of the relationship.
- [ ] **4. Timing guidance reflects real clinical practice** -- Spacing and sequencing match expert protocols and product labeling.
- [ ] **5. same_session_ok is correct** -- Same-session determination is supported by evidence and considers safety implications.
- [ ] **6. Sequencing order is clinically sound** -- If there is a recommended order, it is documented and justified.
- [ ] **7. Contraindications or spacing issues are not minimized** -- Safety concerns are presented prominently, not buried in fine print.
- [ ] **8. Patient education text is clear, honest, and provider-mediated** -- Uses "Tell the patient" framing, is understandable, and does not overpromise.
- [ ] **9. Staff talking points are education-first, not pressure-based** -- No upsell language, guarantees, or pressure tactics.
- [ ] **10. No forced pairing** -- The "why both?" is genuine. Removing marketing language leaves a substantive clinical rationale.
- [ ] **11. Source support is adequate for the strength of recommendation** -- Canonical requires 2+ sources. Common requires 1+ source. No canonical/common without corpus evidence.
- [ ] **12. No guaranteed outcomes or unsupported claims** -- All claims are qualified and evidence-based.
- [ ] **13. Any alternative/substitution issue is handled neutrally** -- If alternatives exist (e.g., Dysport vs. Botox), they are presented as clinical decisions, not brand preferences.
- [ ] **14. Any regional/legal/safety caveat is captured** -- Jurisdiction-specific restrictions (e.g., France same-session prohibition) are documented.

---

## Pair Evaluation Sequence

Per D-11, pairs are evaluated in category-pair batches, ordered by clinical and commercial priority.

| Priority | Batch | Pair Count | Rationale |
|----------|-------|------------|-----------|
| 1 | Neurotoxin x HA Filler | 25 | Highest-value canonical candidates. Most common combination in aesthetics. |
| 2 | Neurotoxin x Biostimulator | 5 | Strong podcast evidence for Botox/toxin + Sculptra sequencing. |
| 3 | Neurotoxin x Energy Device | 20 | Multi-modality stacking protocols (Tracy Mancuso framework). |
| 4 | HA Filler x Biostimulator | 5 | "Foundation + structure" protocol. Sculptra + HA is well-documented. |
| 5 | HA Filler x Energy Device | 20 | Filler + laser/RF combinations for comprehensive rejuvenation. |
| 6 | Biostimulator x Energy Device | 4 | Collagen stimulation synergy. Strong for Sculptra + RF. |
| 7 | Neurotoxin x Body/Fat/Skincare | 15 | Lower priority but some valid combinations (toxin + HydraFacial). |
| 8 | HA Filler x Body/Fat/Skincare | 15 | Limited overlap (different treatment areas). Mostly compatible_only. |
| 9 | Energy x Energy (cross-device) | 6 | Temperature layering protocols between different energy modalities. |
| 10 | Energy x Body/Fat/Skincare | 12 | Mixed relevance. Some valid (laser + skincare). |
| 11 | Body/Fat/Skincare x Body/Fat/Skincare | 3 | Kybella + CoolSculpting, etc. Limited but some candidates. |
| 12 | Same-category: Neurotoxin x Neurotoxin | 10 | All alternatives. Emit as alternative + do_not_market. |
| 13 | Same-category: HA Filler x HA Filler | 10 | Mostly alternatives. Some layering combinations may be conditional. |
| 14 | Biostimulator x Body/Fat | 2 | Niche combinations. Likely compatible_only. |
| 15 | Biostimulator x Skincare | 1 | Sculptra + HydraFacial. Likely compatible_only or conditional. |

**Note:** Product count is 18 (not 20), yielding C(18,2) = 153 unique pairs. The table above uses the original 20-product estimate. Exact pair counts will be confirmed at Wave 1 start.

---

## Appendix: Tier Decision Flowchart

```
Start: Evaluate pair (Product A + Product B)
  |
  v
Gate 5 (Safety): Pass?
  |-- NO --> Maximum tier = conditional (with conditions) or do_not_market/rejected
  |-- YES --> Continue
  |
  v
Gate 8 (Source Support): Corpus evidence found?
  |-- NO --> Maximum tier = conditional (LOW_CONFIDENCE) or compatible_only
  |-- YES --> Continue
  |
  v
Gate 3 (Limitation Coverage): "Why both?" has genuine answer?
  |-- NO --> Check if commercial rationale exists
  |          |-- YES --> compatible_only
  |          |-- NO --> do_not_market or rejected
  |-- YES --> Continue
  |
  v
Count passing gates (1-8):
  |-- All 8 pass + 2+ sources --> canonical candidate
  |-- 7-8 pass + 1+ source --> common candidate
  |-- 5-7 pass with conditions --> conditional
  |-- <5 pass, safety OK --> compatible_only
  |
  v
Apply content-depth rules per tier
  |
  v
Generate review artifacts (canonical/common only)
  |
  v
Submit for Chris review (is_active=false until approved)
```
