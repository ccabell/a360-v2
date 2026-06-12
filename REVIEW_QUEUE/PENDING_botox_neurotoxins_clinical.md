# REVIEW: Botox + Neurotoxins — Clinical Lens (v2 recompile)

**Status**: PENDING REVIEW  
**Date**: 2026-06-12  
**Docs covered** (4 rows in `agent_reference_docs`, all `status='draft'`, `version=2`):

| ID | Entity | doc_type |
|---|---|---|
| `4512a79d-0322-478e-a994-9b007b6567e2` | Neurotoxins (category) | clinical_summary |
| `78eead5e-c25c-4b1f-8753-ee6856757cd8` | Neurotoxins (category) | technique_guide |
| `eddb8155-3a8a-4fd3-8f71-25eea0c4ec38` | Botox Cosmetic (product) | clinical_summary |
| `8a4a534b-4814-47af-bc9d-c915d2e68531` | Botox Cosmetic (product) | technique_guide |

---

## What Changed vs. v1

**The single most important change**: the dosing_zones section in the Botox technique guide no longer contains a precise per-area table. v1 had a table of specific unit counts by area (glabella, forehead, crow's feet, masseter, etc.) that read as A360's clinical instruction. That table is gone.

What replaced it: range characterizations ("the glabellar pivotal trial used a total dose in the low-to-mid tens of units") plus an explicit pointer to the Botox Cosmetic prescribing information at FDA/DailyMed for exact protocol. Every dosing section ends with `[FDA/DailyMed →]`.

**Inline source tier tags**: every clinical claim in v2 now carries a tier tag inline — `[FDA label]`, `[peer-reviewed: pivotal trial, rank 2]`, `[consensus]`, `[field practice]`. These were absent in v1.

**Safety floor is unchanged in substance**: the black box warning content (distant spread, pregnancy Cat C, contraindications) is stated plainly and authoritatively with `[FDA label]` tags — no hedging. This is deliberate.

**Combination sequencing (technique guide)**: four sources are cited with tiers — Carruthers 2016 (rank 4), Semchyshyn 2005 (rank 4), Urdiales-Gálvez 2019 (rank 2), Alam 2006 (rank 4). The conflict on sequencing order is explicitly preserved: "Sources differ; both are defensible."

---

## Neurotoxins — Clinical Summary

```
## class_overview

Neurotoxins are a class of injectable biologic agents that temporarily reduce muscle activity by
blocking the signal between motor nerves and the muscles they control [FDA label]. In aesthetic
medicine, the class is the most widely used injectable category, with decades of safety and
efficacy data across both cosmetic and therapeutic applications.

The class includes several distinct formulations — onabotulinumtoxinA, abobotulinumtoxinA,
incobotulinumtoxinA, and prabotulinumtoxinA — each with independent regulatory approval, distinct
dosing conventions, and proprietary manufacturing processes [FDA label]. They are not
interchangeable on a unit-for-unit basis [FDA label].

## shared_mechanism

All neurotoxins in clinical use derive from Clostridium botulinum toxin type A. The mechanism:
toxin is taken up at the neuromuscular junction, where it cleaves SNAP-25 — a SNARE complex
protein required for acetylcholine vesicle release [peer-reviewed: SNAP-25 mechanism]. Without
acetylcholine release, the nerve cannot signal the muscle to contract. The result is temporary,
dose-dependent reduction in muscle activity. Recovery occurs via sprouting of new axon terminals
and formation of new neuromuscular junctions [peer-reviewed: recovery mechanism].

[... full content in DB row 4512a79d ...]

## class_safety

**Black Box Warning — Distant Spread**: All botulinum toxin products carry an FDA boxed warning
that the toxin may spread from the injection site to produce symptoms consistent with botulism —
including unexpected weakness or paralysis, dysphagia, dysphonia, dysarthria, loss of bladder
control, and breathing difficulties. These effects have been reported following both approved and
unapproved uses. This warning applies to the entire class. [FDA label]

[...continues with contraindications, member_differentiation...]
```

---

## Botox Cosmetic — Technique Guide (the key document to check)

The dosing_zones section is the primary change from v1. Check that:
- No precise per-area unit table exists anywhere in this doc
- Every dosing reference is a range characterization + `[FDA/DailyMed →]` pointer
- The gateway posture note is present at the top of dosing_zones
- Combination sequencing shows source conflict honestly

```
## dosing_zones

*Gateway posture applies throughout this section. This section characterizes dosing ranges for
orientation — it is not a dosing protocol and does not represent A360's clinical instruction.
For the specific recommended doses, injection sites, and clinical instructions for each approved
indication, the authoritative source is the Botox Cosmetic prescribing information [FDA/DailyMed →].
Use that document for clinical dosing guidance.*

**Glabellar lines**: the pivotal registration trial for this indication used a total dose in the
low-to-mid tens of units distributed across multiple injection points spanning the corrugator and
procerus muscles [peer-reviewed: pivotal trial, rank 2]. [...] For exact recommended dosing and
injection sites, see the prescribing information [FDA/DailyMed →].

**Forehead lines**: [...] For clinical dosing guidance, see the prescribing information [FDA/DailyMed →].

**Off-label cosmetic applications** (masseter, platysma, ...): [...] masseter treatment uses
substantially higher per-side amounts than facial cosmetic applications, reflecting the muscle's
greater mass [...] [field practice]. For the closest on-label dosing reference, consult the
therapeutic indications in the prescribing information [FDA/DailyMed →].

## combination_sequencing

[...] the multidisciplinary consensus holds that either toxin-first or filler-first is acceptable
[consensus: Carruthers 2016]. Some practitioners prefer toxin first [...] others prefer filler
first [...] [field practice: Semchyshyn 2005, Alam 2006]. Sources differ; both are defensible.
```

---

## Review Checklist

- [ ] **No precise dosing table** in technique_guide — only range characterizations + pointers
- [ ] Every dosing section ends with `[FDA/DailyMed →]`
- [ ] Black box warning stated plainly, `[FDA label]` tagged, no hedging
- [ ] Pregnancy contraindication stated plainly (not "sources differ")
- [ ] Combination sequencing shows source conflict honestly (not resolved)
- [ ] No personal names anywhere in either doc
- [ ] Inline tier tags present on all clinical claims
- [ ] `extends_doc_id` wiring: Botox docs extend correct Neurotoxins docs

---

## Action

`[ ] APPROVE` — flip these 4 rows to `status='active'`  
`[ ] REJECT` — notes:
