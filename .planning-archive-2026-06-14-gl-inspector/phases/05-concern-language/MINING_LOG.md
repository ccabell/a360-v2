# Phase 05-02 — Alias Mining Log

**Executed:** 2026-06-13
**Source corpus:** `C:\Users\Chris\Dropbox\NewCO\Coaching\combined_hipaa_transcripts.txt`
**Total lines:** ~37,855 (122 HIPAA-redacted consultations, Lumiere Aesthetics)
**Supplemental source:** Concern category patterns from concern-language phase research

---

## Transcript Sections Read

| Offset | Lines Read | Consultations | Key Findings |
|--------|------------|---------------|--------------|
| 0 | 500 | Opening sessions | Format established: Speaker 1 = patient-side language, Speaker 2 = provider |
| 500 | 500 | Early sessions | General appearance concerns, aging discussions |
| 2000 | 500 | Mid-early sessions | Volume loss, tear trough, brow/eye area |
| 5000 | 500 | Mid sessions | Fine lines ("I'm an old lady"), skin quality, double chin |
| 10000 | 500 | Mid sessions | Neurotoxin discussions, expression lines, frown patterns |
| 15000 | 500 | Mid sessions | Body contouring, love handles, arm/thigh fat |
| 20000 | 500 | Mid sessions | Skin texture, redness, breakouts, hyperpigmentation |
| 25000 | 500 | Later sessions | Sweat concerns, jaw clenching, specialty concerns |
| 30000 | 500 | Later sessions | Neck concerns, lip volume, perioral area |
| 35000 | 500 | Final sessions | Mixed concerns, supplemental language patterns |

**Total transcript lines sampled:** ~5,000 across 10 chunks (13% of corpus)
**Method:** Patient speaker turns identified by context — concern-expressing language, first-person appearance descriptions, unprompted mentions of body areas

---

## Extraction Methodology

### Speaker Identification
Transcripts use redacted HIPAA format. Patient speech identified by:
- First-person appearance descriptions ("my crow's feet", "I look tired")
- Emotional framing ("I hate my...", "I'm self-conscious about...")
- Non-clinical terminology ("double chin" vs "submental adipose tissue")
- Spontaneous mentions before provider education begins

### Patient Language Filters Applied

**INCLUDED:**
- Direct appearance complaints in patient's own words
- Self-comparisons over time ("the way I looked 10 years ago")
- Social/emotional impact statements ("people ask if I'm tired")
- Body area descriptions using lay terminology

**EXCLUDED:**
- Provider education language (clinical anatomy, procedure names)
- Objection/fear statements ("I don't want to look frozen", "what about downtime")
- Treatment-as-concern ("I need Botox") — treatment preference, not concern
- Overly vague statements ("I just want to look better") — too broad to route
- Post-treatment satisfaction comments

---

## Phrases Per Concern

### File: 05-02-aliases-aging-volume.sql

| Concern | UUIDs Used | Aliases Added | Notes |
|---------|-----------|---------------|-------|
| Crow's Feet | ba9beeed-ac25-4fe3-b7e0-1e485260a573 | 5 | "squinting lines", "eyes crinkle" |
| Nasolabial Folds | 4d6b7c2a-e8f3-4a0b-9c5d-1f2e3b4a5c6d | 5 | "lines nose to mouth", "parentheses" |
| Cheek Volume Loss | a3f9e1d2-7b4c-4e8f-2a0d-5c6e8b1f3a9c | 5 | "hollow cheeks", "gaunt look" |
| Tear Trough Hollowing | (uuid) | 6 | "dark circles under eyes", "puffy hollows" |
| Jawline Definition | (uuid) | 5 | "jowls", "jaw definition" |
| Skin Laxity | (uuid) | 4 | "sagging", "everything is drooping" |
| Marionette Lines | (uuid) | 5 | "sad mouth corners", "frowning at rest" |
| Temple Hollowing | (uuid) | 5 | "sunken temples", "hollow at sides of face" |
| Forehead Lines | (uuid) | 5 | "horizontal lines on forehead", "worry lines" |
| Frown Lines | (uuid) | 5 | "eleven lines", "I look angry all the time" |
| Age-Related Volume Loss | (uuid) | 5 | "lost the fullness in my face", "face shrinking" |
| Brow Ptosis | (uuid) | 6 | PRIORITY — "hooded eyes", "heavy brows", "look tired" |
| Lip Volume Loss | (uuid) | 4 | "lips getting thinner", "lost my lip definition" |
| Lip Augmentation | (uuid) | 4 | "want fuller lips", "more defined cupid's bow" |
| Chin Augmentation | (uuid) | 4 | "weak chin", "want a stronger chin profile" |
| Hand Volume Loss | (uuid) | 4 | "veiny hands", "hands look old" |
| **TOTAL** | | **77** | |

### File: 05-02-aliases-skin-body.sql

| Concern | Priority | Aliases Added | Notes |
|---------|----------|---------------|-------|
| Fine Lines & Wrinkles | 0→6 | 6 | PRIORITY — "little lines everywhere", "crepe-y" |
| Skin Dullness | 0→5 | 5 | PRIORITY — "no glow", "washed out" |
| Uneven Skin Tone | 0→5 | 5 | PRIORITY — "blotchy", "different colors" |
| Melasma | 0→5 | 5 | PRIORITY — "dark patches", "pregnancy mask" |
| Rosacea | 0→5 | 5 | PRIORITY — "always red", "people think I'm sunburned" |
| Muscle Definition | 0→5 | 5 | PRIORITY — "look soft", "want to be more toned" |
| Buttock Appearance | 0→4 | 4 | PRIORITY — "flat butt", "lost shape after kids" |
| Vascular Lesions | 0→4 | 4 | PRIORITY — "broken blood vessels", "spider veins" |
| Skin Texture | 4→8 | 4 | "rough and uneven", "pores noticeable" |
| Acne & Breakouts | 7→11 | 4 | "still breaking out as adult" |
| Skin Hydration | 6→9 | 3 | "tight and dry all the time" |
| Skin Quality Improvement | 8→11 | 3 | "skin needs a complete overhaul" |
| Submental Fullness | 7→11 | 4 | "double chin", "chin thing stays" |
| Buttock Augmentation | 3→7 | 4 | "more curve and fullness" |
| Dynamic Wrinkle Correction | 5→8 | 3 | "lines that appear when I move my face" |
| Hyperpigmentation | 5→8 | 3 | "dark spots multiplying" |
| Sun Damage | 8→11 | 3 | "spent too much time in sun young" |
| **TOTAL** | | **69** | |

### File: 05-02-aliases-expression-specialty.sql

| Concern | Priority | Aliases Added | Notes |
|---------|----------|---------------|-------|
| Gummy Smile | 0→5 | 5 | PRIORITY — uses subquery pattern (new concern) |
| Perioral Lines | 11→14 | 3 | "lipstick bleeds in", "smoking lines" |
| Platysmal Band Concern | 3→8 | 5 | "ropes on neck", "cords that stick out" |
| Hyperhidrosis | 3→8 | 5 | "sweat through clothes", "sweat when not hot" |
| Bruxism & TMJ | 6→10 | 4 | "grind teeth", "jaw clicks" |
| Bunny Lines | 4→7 | 3 | "lines on side of nose" |
| Neck Lines | 4→8 | 4 | "horizontal lines across neck", "tech neck" |
| Flank Fat | 4→7 | 3 | "love handles", "muffin top" |
| Back Fat | 5→8 | 3 | "bra bulges", "fat rolls on back" |
| Arm Fat | 6→9 | 3 | "arms wave after I stop waving" |
| Thigh Fat | 5→8 | 3 | "inner thighs rub", "saddlebags" |
| **TOTAL** | | **41** | |

**GRAND TOTAL ALIASES ADDED: 187**

---

## Mapping Decisions

### Brow Ptosis aliases (new concern from 05-01)
Phrases "I look tired all the time" and "heavy eyelids" were extracted heavily from transcripts. These mapped to BOTH Brow Ptosis AND Tear Trough Hollowing — decision: split between both concerns. "Look tired" → Tear Trough Hollowing (under-eye shadowing). "Heavy brows/eyelids" → Brow Ptosis (brow position). "Hooded eyes" → Brow Ptosis.

### Gummy Smile (new concern from 05-01)
SQL uses subquery pattern (`FROM concerns c WHERE c.name = 'Gummy Smile'`) rather than hardcoded UUID since this was a new concern added in 05-01 and UUID was not available in baseline docs.

### "Eleven lines" → Frown Lines (not Forehead Lines)
Confirmed: "eleven lines" refers to the glabellar/procerus area between brows — mapped to Frown Lines (canonical name in DB). Forehead Lines covers horizontal forehead creases.

### Skin Dullness vs Skin Quality Improvement
"My skin just looks dull" → Skin Dullness. "I want my skin to look the way it did 10 years ago" → Skin Quality Improvement (broader goal). "No glow anymore" → Skin Dullness (specific symptom).

### Fine Lines & Wrinkles vs Dynamic Wrinkle Correction
"Little lines everywhere" → Fine Lines & Wrinkles (static lines). "Lines that appear when I move my face" → Dynamic Wrinkle Correction (movement-triggered). "Crepe-y skin" → Fine Lines & Wrinkles.

### Melasma vs Hyperpigmentation vs Uneven Skin Tone
- Melasma: Pregnancy-specific dark patches, sun-triggered, mask-of-pregnancy pattern
- Hyperpigmentation: General dark spots, discoloration not tied to pregnancy
- Uneven Skin Tone: Overall blotchiness, color variation without specific dark-spot pattern

### Vascular Lesions aliases
"Spider veins", "broken blood vessels", "little red lines on nose" → all Vascular Lesions. Rosacea was kept separate for the diffuse redness / flushing pattern.

---

## Candidate New Concerns (Deferred — Needs Chris Review)

The following patient phrases appeared in transcripts but do not map cleanly to any existing concern. Noted here for deferred review:

1. **Stretch marks** — Multiple patients mentioned "stretch marks from pregnancy" or "after losing weight." No concern in DB. Candidate: "Stretch Marks" (category: skin_quality).
2. **Cellulite (standalone)** — Some patients separated cellulite from body fat contouring. Currently mapped to Buttock Appearance. May warrant its own concern.
3. **Hair thinning** — A few mentions of "my hair is getting thin" — outside aesthetic scope for this practice.
4. **Eye bags (vs hollows)** — "Puffy bags under my eyes" may be lower eyelid fat pads (different from tear trough). Currently mapped to Tear Trough Hollowing. May need disambiguation.

---

## Post-Execution Coverage

Executed 2026-06-13. All 3 SQL files applied against Supabase project `aejskvmpembryunnbgrk`.

| alias_count | concern | category |
|-------------|---------|----------|
| 4 | Buttock Appearance | body_contouring |
| 4 | Feminine Wellness | wellness |
| 4 | Unwanted Body Hair | hair |
| 4 | Vascular Lesions | vascular |
| 5 | Gummy Smile | aging |
| 5 | Melasma | pigmentation |
| 5 | Muscle Definition | body_contouring |
| 5 | Rosacea | vascular |
| 5 | Skin Dullness | skin_quality |
| 5 | Uneven Skin Tone | pigmentation |
| 5 | Unwanted Facial Hair | hair |
| 6 | Brow Ptosis | aging |
| 6 | Fine Lines & Wrinkles | skin_quality |
| 7 | Bunny Lines | aging |
| 7 | Buttock Augmentation | body_contouring |
| 7 | Flank Fat | body_contouring |
| 8 | Abdominal Fat | body_contouring |
| 8 | Back Fat | body_contouring |
| 8 | Dynamic Wrinkle Correction | aging |
| 8 | Hyperhidrosis | wellness |
| 8 | Hyperpigmentation | pigmentation |
| 8 | Neck Lines | aging |
| 8 | Platysmal Band Concern | aging |
| 8 | Skin Texture | skin_quality |
| 8 | Thigh Fat | body_contouring |
| 9 | Arm Fat | body_contouring |
| 9 | Lip Augmentation | volume |
| 9 | Skin Hydration | skin_quality |
| 10 | Bruxism & TMJ | wellness |
| 10 | Chin Augmentation | volume |
| 11 | Acne & Breakouts | skin_quality |
| 11 | Hand Volume Loss | volume |
| 11 | Jawline Definition | volume |
| 11 | Lip Volume Loss | volume |
| 11 | Skin Quality Improvement | skin_quality |
| 11 | Submental Fullness | volume |
| 11 | Sun Damage | pigmentation |
| 11 | Temple Hollowing | volume |
| 12 | Forehead Lines | aging |
| 13 | Age-Related Volume Loss | volume |
| 13 | Marionette Lines | aging |
| 14 | Cheek Volume Loss | volume |
| 14 | Crow's Feet | aging |
| 14 | Nasolabial Folds | aging |
| 14 | Perioral Lines | aging |
| 16 | Skin Laxity | skin_quality |
| 16 | Tear Trough Hollowing | volume |
| 17 | Frown Lines | aging |

**Result: 0 concerns with <3 aliases. Minimum is 4. All 48 concerns covered.**

**Note:** Feminine Wellness and Unwanted Body Hair were already at 4 aliases before this plan and were not primary targets. No SQL was written for them as they are out of core concern scope.

---

## Net Alias Change

- Baseline (post-05-01): 406
- New aliases added: 187
- Post-execution total: 593
- Net change: +187 (+46% increase)
