# Taxonomy Additions — Phase 02 Dossier Batch
**Review file for Chris.** Anything rejected: remove the concern/body_area row and re-point its aliases to the nearest existing canonical.

---

> **Note on query scope:** The concerns, body_areas, and aliases tables do not have batch-timestamped creation tracking that cleanly isolates Phase 02 additions from prior seeds. Additions below are sourced from the Summary documents for plans 02-03, 02-04, and 02-05 which documented each new addition at time of compile.

---

## New Concerns Added During Phase 02 Batch

**Source:** Plans 02-03, 02-04, 02-05

| Concern Name | Category | Patient Description | Which Product Triggered It | Plan |
|---|---|---|---|---|
| Age-Related Volume Loss | volume | "My face looks hollow or deflated as I've gotten older" | Juvederm Voluma XC (primary indication) | 02-03 |
| Skin Hydration | skin_quality | "My skin feels dry or lacks that healthy glow" | SKINVIVE by Juvederm | 02-03 |
| Skin Quality Improvement | skin_quality | "I want better skin texture and overall glow, not just wrinkle treatment" | SKINVIVE by Juvederm | 02-03 |
| Chin Augmentation | volume | "I want a more defined chin or my chin looks small" | Juvederm Voluma XC (FDA 2021 approval for chin) | 02-03 |
| Lip Augmentation | volume | "I want fuller lips or more definition in my lip border" | Juvederm Voluma XC / Restylane Lyft scope discussion | 02-03 |
| Dynamic Wrinkle Correction | aging | "My wrinkles are caused by facial movements and expressions" | Juvederm Vollure XC / RHA Redensity context | 02-03 |
| Buttock Augmentation | body_contouring | "I want lift or volume in my buttocks without surgery" | Sculptra Aesthetic (off-label PLLA biostimulation) | 02-04 |

**Total new concerns: 7**

Note on adjudication decisions made during compile:
- "Smile lines" → NOT a new concern; added as alias of Nasolabial Folds
- "Smoker's lines" / "Lipstick lines" → NOT a new concern; added as aliases of Perioral Lines
- "Turkey neck" → NOT a new concern; added as alias of Platysmal Band Concern (existing)
- "Double chin" → NOT a new concern; added as alias of Submental Fullness (existing)
- "Tired eyes" → NOT a new concern; added as alias of Tear Trough Hollowing (existing)

---

## New Body Areas Added During Phase 02 Batch

**Source:** Plans 02-03, 02-04

| Body Area Name | Level | Parent | Laterality | Which Product Triggered It | Plan |
|---|---|---|---|---|---|
| Midface | area | Face (region) | bilateral | Juvederm Voluma XC (primary treatment zone for cheek volumization) | 02-03 |
| Chin Projection Zone | zone | Chin (area) | midline | Juvederm Voluma XC (FDA chin augmentation indication) | 02-03 |
| Dorsal Hand | area | Hands (region) | bilateral | Restylane Lyft (FDA hands indication 2018) | 02-03 |

**Total new body areas: 3**

Note on laterality corrections made during compile:
- All 3 new zones were inserted with default laterality 'na', then corrected via UPDATE:
  - Midface: na → bilateral
  - Dorsal Hand: na → bilateral
  - Chin Projection Zone: na → midline (stays 'na' for side value in item_body_areas)

---

## New Aliases Added During Phase 02 Batch

**Source:** Plans 02-03, 02-04, 02-05 (combined total ~125 aliases)

### Plan 02-03: HA Fillers (~60 aliases)

Aliases are organized by the concern or body_area they route to. Chris: any phrase that sounds off or routes to the wrong canonical should be flagged.

**Concern: Cheek Volume Loss**
- "hollow cheeks", "sunken cheeks", "my cheeks look flat", "lost volume in my face", "gaunt face"

**Concern: Nasolabial Folds**
- "smile lines", "laugh lines", "lines from my nose to my mouth", "marionette lines" (also its own concern), "parentheses around my mouth"

**Concern: Age-Related Volume Loss (new)**
- "my face looks deflated", "I've lost fullness in my face", "facial hollowing", "sunken temples", "I look older than I am"

**Concern: Skin Hydration (new)**
- "dry skin", "dull skin", "skin needs hydration", "no glow", "my skin looks tired"

**Concern: Chin Augmentation (new)**
- "weak chin", "small chin", "I want more chin definition", "my chin recedes", "no chin projection"

**Concern: Perioral Lines**
- "smoker's lines", "lipstick lines", "lines around my mouth", "feathering around my lips", "vertical lip lines"

**Concern: Lip Augmentation (new)**
- "thin lips", "I want fuller lips", "lip volume", "no lip border", "deflated lips", "flat lips"

**Body Area: Midface (new)**
- "cheekbones", "upper cheek area", "mid-face hollowing"

**Body Area: Dorsal Hand (new)**
- "hand rejuvenation", "my hands look old", "bony hands", "hand veins showing"

### Plan 02-04: Biostimulators + Body Contouring (~29 aliases)

**Concern: Submental Fullness**
- "double chin", "chin fat", "fullness under my chin", "neck fat"

**Concern: Skin Laxity**
- "sagging skin", "loose skin", "skin is drooping", "jowls", "turkey wattle"

**Concern: Buttock Augmentation (new)**
- "flat butt", "want more lift in my rear", "buttock hollowing"

**Concern: Body Contouring / Fat Reduction**
- "belly fat that won't go away", "love handles", "bra fat", "inner thigh fat", "back fat", "banana roll"

**Concern: Skin Texture**
- "rough skin", "textured skin", "bumpy skin", "uneven skin texture"

### Plan 02-05: Energy Devices + Neurotoxins (~35 aliases)

**Concern: Skin Laxity (energy devices)**
- "sagging jowls", "skin is falling", "needs tightening", "loose jawline", "flabby neck skin"

**Concern: Forehead Lines**
- "forehead wrinkles", "brow lines", "horizontal forehead creases", "worry lines"

**Concern: Frown Lines / Glabellar Lines**
- "eleven lines", "the 11s", "angry lines between my brows", "scowl lines", "frown lines"

**Concern: Crow's Feet**
- "smile lines around my eyes", "eye wrinkles", "laugh lines at corners of eyes", "crinkles by my eyes"

**Concern: Pigmentation**
- "dark spots", "age spots", "sun damage", "uneven skin tone", "hyperpigmentation", "melasma"

**Concern: Pore Size**
- "large pores", "visible pores", "open pores", "congested pores"

**Concern: Acne Scarring**
- "acne scars", "pitted skin", "ice pick scars", "boxcar scars", "rolling scars"

---

## Summary Counts

| Category | Count |
|----------|-------|
| New concerns | 7 |
| New body areas | 3 |
| New aliases (estimated, combined batch) | ~124 phrases |

**Total taxonomy additions: ~134 items**

---

## Review Instructions for Chris

1. **Review new concerns** (7 rows): Are all 7 legitimate aesthetic conditions? Is the category enum correct? Is the patient_description accurate?
2. **Review new body areas** (3 rows): Do Midface, Chin Projection Zone, and Dorsal Hand fit correctly in the region → area → zone hierarchy?
3. **Review aliases by concern**: Any phrase that sounds wrong, routes to the wrong concern, or is too clinical/not patient language → flag for removal.
4. **Anything rejected:** Remove the concern/body_area row and re-point its aliases to the nearest existing canonical, OR demote to a pure alias with a corrected target.

Chris reviews this file. Anything rejected gets removed and its mappings re-pointed.
