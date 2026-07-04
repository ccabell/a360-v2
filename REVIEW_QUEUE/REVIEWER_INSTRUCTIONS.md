# Product Pairing Review — Instructions for Clinical Reviewer

**Date:** June 2026
**Platform:** A360 (Aesthetics360) — AI-powered SaaS for medical aesthetics practices
**Review file:** `pairing_review_spreadsheet.csv` (same folder as this document)

---

## What You Are Reviewing

A360 helps med spas and aesthetic clinics make treatment recommendations. One feature recommends **product pairings** — combinations of two treatments that work better together than either alone (e.g., neurotoxin + HA filler for complementary facial rejuvenation).

An AI system evaluated **153 unique product pairs** from a catalog of 18 aesthetic products. It ran each pair through an **8-gate legitimacy test** using clinical evidence sourced from podcast expert interviews, PubMed literature, and FDA labels. Each pair received a tier assignment.

**You are reviewing the 37 highest-confidence pairs** — the ones the system wants to actively recommend to providers. These are the pairs that will appear in clinical decision-support tools used by aesthetic providers during patient consultations.

Nothing goes live without your approval.

---

## Why This Review Matters

These pairings will be presented to aesthetic providers as clinical recommendations. A bad pairing could:

- Recommend an unsafe combination
- Use promotional language that creates compliance risk
- Overstate clinical evidence ("canonical" when evidence is thin)
- Present an upsell disguised as clinical advice
- Mislead providers about timing, sequencing, or same-session safety

Your job is to catch these problems before any pairing reaches a provider.

---

## The 18 Products Being Paired

| Category | Products |
|----------|----------|
| **Neurotoxins** | Botox Cosmetic, Dysport, Xeomin, Jeuveau, Daxxify |
| **HA Fillers** | Juvederm Voluma XC, Juvederm Vollure XC, Restylane Lyft, RHA Redensity, Skinvive by Juvederm |
| **Biostimulators** | Sculptra Aesthetic |
| **Energy/RF Devices** | InMode Morpheus8, Sofwave, Ultherapy PRIME, Hollywood Spectra |
| **Body Contouring** | CoolSculpting Elite |
| **Injectable Fat Reduction** | Kybella |
| **Skincare** | HydraFacial Syndeo |

---

## The Two Tiers You Are Reviewing

### Canonical (5 pairs)

**Definition:** Universally recommended combination. The clinical rationale is strong, evidence is deep, and most patients presenting with the relevant concerns would benefit from both treatments. This is the "standard of care" level pairing.

**What this means in practice:** When a provider sees a patient with concerns that both products address, the system will actively suggest this combination. It's presented as "this is what most experienced injectors do."

**Evidence bar:** All 8 gates pass. Strong evidence from 2+ independent sources. Sequencing and timing documented.

### Common (32 pairs)

**Definition:** Widely practiced combination. Most experienced injectors use this pairing regularly. Evidence is solid but may not be as universally documented as canonical pairs.

**What this means in practice:** The system suggests this combination when clinically relevant, but with slightly less emphasis than canonical pairs. It's presented as "this is a well-established approach."

**Evidence bar:** 7-8 gates pass. Moderate evidence from 1+ source. At least one expert discussion or clinical reference.

---

## The 8 Gates (What Was Already Evaluated)

Each pair was scored PASS or FAIL on these 8 gates. The gate results are in the spreadsheet — you do not need to re-run them, but you should sanity-check whether the PASS/FAIL makes sense.

| Gate | Question It Answers | Hard Stop? |
|------|---------------------|------------|
| **G1: Concern Overlap** | Do both products address at least one shared patient concern? | No |
| **G2: Mechanism Complementarity** | Do the products work through different mechanisms? | No |
| **G3: Limitation Coverage** | Does Product A's limitation list include something Product B treats (and vice versa)? This is the core "why both?" gate. | No |
| **G4: Timing Compatibility** | Can the products be safely sequenced in the same treatment plan? | No |
| **G5: Safety** | Any known contraindications, adverse interactions, or dosing risks? | **YES — hard stop. If this fails, the pair cannot be canonical or common.** |
| **G6: Commercial Viability** | Would a real practice actually offer this combination? | No |
| **G7: Patient Clarity** | Can a patient understand why they need both treatments without it sounding like an upsell? | No |
| **G8: Source Support** | Is there corpus evidence (expert discussion, PubMed, clinical protocol) supporting this combination? | No, but zero evidence = cannot be canonical or common |

---

## What the Spreadsheet Columns Mean

| Column | What It Contains | What You Should Check |
|--------|-----------------|----------------------|
| **Product A / Product B** | The two products in the pair | Are these real, distinct products? |
| **Tier** | canonical or common | Does the evidence justify this tier? Should it be lower? |
| **Type** | Clinical relationship type: complementary, stacks_with, sequential, enhances | Does this accurately describe the clinical relationship? |
| **Strength** | Evidence strength: strong, moderate, weak | Does this match the actual evidence cited? |
| **Same Session OK** | Can both be administered in the same appointment? | Is this clinically accurate? Are there spacing requirements being ignored? |
| **G1–G8** | Gate results (PASS/FAIL) | Do any PASS results seem wrong? Does anything that should fail get a pass? |
| **Clinical Rationale** | The clinical reason why both products are needed together | Is this accurate? Is it genuinely clinical, not promotional? Does removing marketing language leave something substantive? |
| **Timing Guidance** | When to use each product relative to the other (spacing, sequencing, maintenance intervals) | Does this reflect real clinical practice? Are intervals accurate? |
| **Patient Education Text** | What a provider would say to explain the combination to a patient. Uses "Tell the patient: ..." format. | Is this clear and honest? Would a patient understand it? Does it overpromise? |
| **Staff Talking Points** | How front-desk/consultation staff should discuss the combination. Education-first tone, not sales. | Is this education-first or does it read like a sales script? Any pressure language? Any guarantees? |
| **Evidence Summary** | Key evidence supporting the pairing (expert quotes, studies, protocols) | Is the evidence real and relevant? Is it strong enough for the assigned tier? |
| **Decision** | YOUR COLUMN — fill in | APPROVED / NEEDS REVISION / REJECTED |
| **Notes** | YOUR COLUMN — fill in | Any feedback, corrections, or concerns |

---

## How to Review Each Row

For each of the 37 rows, work through this checklist mentally:

### 1. Is the "why both?" genuine?
Read the Clinical Rationale column. Strip away any nice-sounding language. What's left? If the answer is "they complement each other" without explaining HOW or WHY, that's circular. A genuine rationale names specific mechanisms: "Botox relaxes muscles causing dynamic lines; filler restores volume loss that Botox cannot address."

### 2. Is the tier correct?
- **Canonical** should feel like "of course these go together" — the pairing a fellowship-trained injector would consider obvious.
- **Common** should feel like "yes, experienced injectors do this regularly" — well-established but not quite universal.
- If you think "this is valid but only sometimes," it should be **conditional** (downgrade).
- If you think "sure they're safe together but why would you actively recommend this combination?" it should be **compatible_only** (downgrade).

### 3. Is the safety assessment correct?
Gate 5 should be PASS for all 37 rows (it's a hard stop — safety failures can't be canonical/common). But check: are there spacing requirements, contraindications in certain populations, or interaction risks that are being minimized or omitted?

### 4. Is same_session_ok correct?
This is a high-stakes field. If it says "true" but the products require spacing for safety reasons, that's a problem. Key known restrictions:
- France prohibits neurotoxin + filler same session
- Hyaluronidase + HA filler same day is contraindicated
- Energy devices before injectables (generally)
- When uncertain, the default should be false

### 5. Would the patient education text pass the "dinner test"?
If a provider said this to a patient at dinner — casually, not in a sales context — would it sound like honest medical advice or a pitch? It should sound like a doctor explaining, not a salesperson closing.

### 6. Would the staff talking points survive a compliance audit?
Read the Staff Talking Points column. Flag anything containing:
- "upsell," "cross-sell," "premium package," "bundle"
- "guaranteed results," "dramatic transformation"
- "you need both," "everyone should get this"
- Any language that creates pressure rather than educates

Good talking points help staff explain; they don't push.

### 7. Is the evidence adequate for the tier?
- **Canonical** needs strong evidence from 2+ independent sources
- **Common** needs at least 1 source
- If the Evidence Summary column is thin or vague, the tier may be too high

---

## How to Fill In Your Decision

For each row, fill in the last two columns:

### Decision (pick one):
- **APPROVED** — This pairing is clinically accurate, the tier is correct, the content is appropriate. Ready for provider-facing use.
- **NEEDS REVISION** — The pairing concept is valid but something needs fixing. Use the Notes column to say what. Examples: "Downgrade to common," "Timing guidance needs correction," "Staff talking points too salesy," "Same session should be false."
- **REJECTED** — This pairing should not be recommended at all. The clinical rationale is wrong, the safety assessment is incorrect, or the combination shouldn't be actively promoted. Use Notes to explain why.

### Notes:
Be specific. Examples of useful notes:
- "Downgrade to common — evidence doesn't support canonical"
- "Same session should be FALSE — need 2-week spacing for toxin onset"
- "Staff talking points read like a sales pitch — rewrite with education-first tone"
- "Clinical rationale is accurate but timing guidance needs to mention maintenance schedule"
- "This is an obvious pair, approved as-is"
- "Evidence summary is thin — only one indirect reference. Downgrade to conditional."

---

## What Happens After Your Review

1. Every APPROVED pair gets activated in the database (is_active flipped from false to true) and becomes available in provider-facing recommendation tools.
2. Every NEEDS REVISION pair gets corrected per your notes and comes back for re-review.
3. Every REJECTED pair stays inactive — it exists in the system as "evaluated and rejected" but is never shown to providers.

---

## Quick Reference: Red Flags to Watch For

| Red Flag | What to Do |
|----------|------------|
| Clinical rationale is circular ("they complement each other because they work together") | NEEDS REVISION — rewrite with specific mechanisms |
| Safety gate is PASS but you know of a contraindication | NEEDS REVISION — note the safety concern |
| Same session = true but products need spacing | NEEDS REVISION — change to false, note spacing requirement |
| Staff talking points contain "upsell," "package," "guaranteed" | NEEDS REVISION — rewrite education-first |
| Patient education overpromises ("dramatic results") | NEEDS REVISION — remove unsupported claims |
| Evidence is one vague podcast reference for a canonical pair | NEEDS REVISION — downgrade to common or conditional |
| You can't explain why both are needed without it sounding like a sales pitch | REJECTED — the "why both?" isn't genuine |
| The pair makes technical sense but no real practice would recommend it proactively | NEEDS REVISION — downgrade to compatible_only |

---

*Return the completed spreadsheet with Decision and Notes columns filled in for all 37 rows.*
