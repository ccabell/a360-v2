# REVIEW: Botox + Neurotoxins — Deep Product Lens (v2 recompile)

**Status**: PENDING REVIEW  
**Date**: 2026-06-12  
**Docs covered** (2 rows in `agent_reference_docs`, all `status='draft'`, `version=2`):

| ID | Entity | doc_type |
|---|---|---|
| `634459ac-1162-4f1d-b37f-94ad06ac56fa` | Neurotoxins (category) | deep_dive_playbook |
| `ccc4b815-bf39-417b-8b05-42427f6dee89` | Botox Cosmetic (product) | deep_dive_playbook |

Audience: provider. No posture change from v1 for this lens — deep_product is provider-facing and carries its own depth. The changes here are primarily to inline tier tags and the evidence_summary section, which now explicitly names the 4 combination sources.

---

## What Changed vs. v1

**No posture change**: the deep_product lens is not subject to the gateway posture (it is for providers who need the mechanism detail) and not subject to the sales_education primary directive. The content is substantively similar to v1 with these refinements:

**Inline source tiers added**: evidence claims now carry tier tags consistent with the clinical lens — `[peer-reviewed: rank 2]`, `[peer-reviewed / consensus]`, etc.

**Comparison_anchors updated**: the comparator section for each product now explicitly notes where sources differ (e.g., diffusion characteristics of abobotulinumtoxinA) rather than presenting one position.

**Evidence_summary is more explicit**: the 4 combination sequencing sources (Carruthers 2016, Semchyshyn 2005, Urdiales-Gálvez 2019, Alam 2006) are named with ranks in the Botox playbook.

---

## Neurotoxins — Deep Dive Playbook (summary)

**category_landscape**: originator history, category distinctions (reversibility, repeatability, anatomical breadth), market positioning. No changes of substance from v1.

**selection_framework**: onset, diffusion tendency, duration, immunogenicity, patient history — with honest acknowledgment that "sources differ" on diffusion significance. Not a decision tree.

**evidence_base**: pivotal trials, long-term safety studies, combination use data (Carruthers 2016, Urdiales-Gálvez 2019), therapeutic evidence depth as class differentiator.

---

## Botox Cosmetic — Deep Dive Playbook (summary)

**differentiation**: originator position, clinical data depth, unit convention as reference, protein profile (acknowledged as debated), AbbVie portfolio context.

**mechanism_detail**: SV2 receptor binding → SNAP-25 cleavage via zinc endopeptidase → blocked ACh vesicle fusion → recovery via axon sprouting. No tachyphylaxis at cosmetic doses. Secondary non-response noted as rare at cosmetic doses [peer-reviewed / consensus].

**evidence_summary**:
- Glabellar pivotal trial: ≥2-grade improvement, substantial majority vs. placebo, week 4 [peer-reviewed: rank 2]
- 13-year twin prevention study: static line reduction in treatment arm [peer-reviewed: rank 2]
- Retreatment interval data: 183-day BTA code for therapeutic; cosmetic follows PI
- Combination studies: Carruthers 2016 (rank 4), Urdiales-Gálvez 2019 (rank 2)

**comparison_anchors**:
- vs. abobotulinumtoxinA: unit convention difference, diffusion debate, sources differ
- vs. incobotulinumtoxinA: protein-free, theoretical immunogenicity preference, comparable efficacy in comparatives
- vs. prabotulinumtoxinA: newer, growing evidence, provider familiarity primary differentiator

---

## Review Checklist

- [ ] No personal names anywhere
- [ ] Comparison anchors acknowledge where sources differ rather than asserting one position
- [ ] Mechanism detail is accurate (SV2 → SNAP-25 → ACh block → axon sprouting recovery)
- [ ] Evidence_summary correctly names 4 combination sources with rank
- [ ] `extends_doc_id` wiring: Botox deep_dive extends Neurotoxins deep_dive (`634459ac`)

---

## Action

`[ ] APPROVE` — flip these 2 rows to `status='active'`  
`[ ] REJECT` — notes:
