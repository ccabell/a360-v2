# Combination Fuel Document Review

**Phase:** 12 -- combination-fuel-documents
**Generated:** 2026-06-14
**Total docs:** 37 (5 canonical + 32 common)
**QC status:** 7/7 dimensions PASS -- see GENERATION_QC_REPORT.md for detailed quality metrics

## How to Review

1. Each pair below shows a summary of the fuel doc content
2. Mark each as: APPROVED / NEEDS REVISION / REJECTED
3. For NEEDS REVISION, note what needs changing
4. Approved docs will be committed to agent_fuel_documents via SQL (file: `supabase/compile_sql/12-03-combination-fuel-updates.sql`)

**Key review criteria:**
- **COMBO-01**: Is the corpus-grounded content clinically accurate?
- **COMBO-02**: Does it sound like what trained staff would actually say (education tone)?
- **COMBO-03**: Are the do-not-say items appropriate and pair-specific items clinically sound?

---

## Summary Table

| # | Pair | Tier | Evidence | Quality | Review Card | Status |
|---|------|------|----------|---------|-------------|--------|
| 1 | Botox Cosmetic + Juvederm Vollure XC | canonical | strong | PASS | PENDING | PENDING |
| 2 | Botox Cosmetic + Juvederm Voluma XC | canonical | strong | PASS | PENDING | PENDING |
| 3 | Botox Cosmetic + Restylane Lyft | canonical | moderate | PASS | PENDING | PENDING |
| 4 | Botox Cosmetic + RHA Redensity | canonical | moderate | PASS | PENDING | PENDING |
| 5 | Botox Cosmetic + SKINVIVE by Juvederm | canonical | weak | PASS | PENDING | PENDING |
| 6 | Botox Cosmetic + Sculptra Aesthetic | common | weak | PASS | PENDING | PENDING |
| 7 | Daxxify + Sculptra Aesthetic | common | weak | PASS | PENDING | PENDING |
| 8 | Dysport + Sculptra Aesthetic | common | weak | PASS | PENDING | PENDING |
| 9 | Jeuveau + Sculptra Aesthetic | common | weak | PASS | PENDING | PENDING |
| 10 | Xeomin + Sculptra Aesthetic | common | weak | PASS | PENDING | PENDING |
| 11 | Daxxify + SKINVIVE by Juvederm | common | weak | PASS | PENDING | PENDING |
| 12 | Dysport + SKINVIVE by Juvederm | common | weak | PASS | PENDING | PENDING |
| 13 | Jeuveau + SKINVIVE by Juvederm | common | weak | PASS | PENDING | PENDING |
| 14 | Xeomin + SKINVIVE by Juvederm | common | weak | PASS | PENDING | PENDING |
| 15 | Juvederm Vollure XC + Sculptra Aesthetic | common | weak | PASS | PENDING | PENDING |
| 16 | Juvederm Voluma XC + Sculptra Aesthetic | common | weak | PASS | PENDING | PENDING |
| 17 | Restylane Lyft + Sculptra Aesthetic | common | weak | PASS | PENDING | PENDING |
| 18 | RHA Redensity + Sculptra Aesthetic | common | weak | PASS | PENDING | PENDING |
| 19 | SKINVIVE by Juvederm + Sculptra Aesthetic | common | weak | PASS | PENDING | PENDING |
| 20 | Daxxify + Juvederm Vollure XC | common | moderate | PASS | PENDING | PENDING |
| 21 | Daxxify + Juvederm Voluma XC | common | moderate | PASS | PENDING | PENDING |
| 22 | Daxxify + Restylane Lyft | common | moderate | PASS | PENDING | PENDING |
| 23 | Daxxify + RHA Redensity | common | moderate | PASS | PENDING | PENDING |
| 24 | Dysport + Juvederm Vollure XC | common | moderate | PASS | PENDING | PENDING |
| 25 | Dysport + Juvederm Voluma XC | common | moderate | PASS | PENDING | PENDING |
| 26 | Dysport + Restylane Lyft | common | moderate | PASS | PENDING | PENDING |
| 27 | Dysport + RHA Redensity | common | moderate | PASS | PENDING | PENDING |
| 28 | Jeuveau + Juvederm Vollure XC | common | moderate | PASS | PENDING | PENDING |
| 29 | Jeuveau + Juvederm Voluma XC | common | moderate | PASS | PENDING | PENDING |
| 30 | Jeuveau + Restylane Lyft | common | moderate | PASS | PENDING | PENDING |
| 31 | Jeuveau + RHA Redensity | common | moderate | PASS | PENDING | PENDING |
| 32 | Xeomin + Juvederm Vollure XC | common | moderate | PASS | PENDING | PENDING |
| 33 | Xeomin + Juvederm Voluma XC | common | moderate | PASS | PENDING | PENDING |
| 34 | Xeomin + Restylane Lyft | common | moderate | PASS | PENDING | PENDING |
| 35 | Xeomin + RHA Redensity | common | moderate | PASS | PENDING | PENDING |
| 36 | Botox Cosmetic + InMode Morpheus8 | common | strong | PASS | PENDING | PENDING |
| 37 | Sculptra Aesthetic + InMode Morpheus8 | common | weak | PASS | PENDING | PENDING |

---

## Flags

### Weak Evidence Docs (16 docs -- requires explicit provider discussion)

All 16 weak-evidence docs properly disclose their evidence limitations. No weak-evidence doc claims more than expert consensus support.

- **5 SKINVIVE pairs** (#5, #11-14): No class-level or product-specific BoNT-A + microdroplet HA combination evidence exists. SKINVIVE is a distinct product category from volumizing fillers.
- **10 Sculptra pairs** (#6-10, #15-19): Expert consensus only; FDA Sculptra label combination caveat quoted in all docs.
- **1 Sculptra + Morpheus8** (#37): Expert consensus only; FDA combination caveat present.

### Same-Session Conditional Docs (7 docs)

These have `same_session_ok` as conditional rather than true:

- All 5 Neurotoxin + Sculptra pairs (#6-10): FDA Sculptra label caveat applies
- All 5 HA + Sculptra pairs (#15-19): Sequential staging preferred; same-session possible by experienced injectors
- Sculptra + Morpheus8 (#37): Not evaluated in controlled trials

### Review Cards

All 37 review cards in `REVIEW_QUEUE/pairings/` have status: PENDING. No unresolved issues flagged in any review card.

---

## Per-Pair Detail Sections

---

### 1. Botox Cosmetic + Juvederm Vollure XC

**Batch:** canonical_batch.md | **Tier:** canonical | **Evidence:** strong

**Patient-Facing Name:** Smooth & Restore
**One-Line Positioning:** Botox relaxes the muscles that cause expression lines while Vollure restores the mid-depth volume that muscle relaxation alone cannot address.

**Why Together:** Botox addresses movement-caused lines through neuromodulation; Vollure fills the static mid-depth volume loss that muscle relaxation cannot restore. These two mechanisms operate at different tissue layers and address different root causes of facial aging.

**Staff Close:** When a patient comes in concerned about looking tired or aged, explain: 'Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you're also noticing deeper lines from your nose to the corners of your mouth -- those nasolabial folds -- those are caused by volume loss, which Botox can't address. Vollure is designed to soften those specific lines by restoring volume at the mid-depth level.'

**Do Not Say (pair-specific):**
- Do not call this a 'liquid facelift' or 'non-surgical facelift'
- Do not imply that Vollure will 'plump' or 'inflate' the face
- Do not state the combination is 'FDA approved' as a combination
- Do not guarantee how long results will last

**Citations:** PubMed DOI 10.2310/6350.2010.00029; PubMed DOI 10.1097/DSS.0000000000000754; FDA labels (Botox Cosmetic, Vollure XC)

> Full JSON: `REVIEW_QUEUE/combination_fuel/canonical_batch.md` -- Pair 1

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 2. Botox Cosmetic + Juvederm Voluma XC

**Batch:** canonical_batch.md | **Tier:** canonical | **Evidence:** strong

**Patient-Facing Name:** Smooth & Lift
**One-Line Positioning:** Botox relaxes expression lines while Voluma restores the deep cheek structure that supports and lifts the face.

**Why Together:** Botox addresses movement-caused lines through neuromodulation; Voluma restores deep structural volume in the cheek area through HA gel scaffold. They work at completely different tissue layers.

**Staff Close:** Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. But if you're also noticing that your cheeks look flatter or more hollow than they used to, that's structural volume loss in the midface, which Botox can't address. Voluma is designed for deep cheek restoration.

**Do Not Say (pair-specific):**
- Do not describe Voluma as 'lifting' the cheeks in a way that implies a surgical lift
- Do not call this a 'liquid facelift' or 'non-surgical facelift'
- Do not imply that the combination is 'FDA approved' as a package
- Do not guarantee cheek volume restoration duration

**Citations:** PubMed DOI 10.2310/6350.2010.00029; PubMed DOI 10.1097/DSS.0000000000000754; FDA labels (Botox Cosmetic, Voluma XC)

> Full JSON: `REVIEW_QUEUE/combination_fuel/canonical_batch.md` -- Pair 2

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 3. Botox Cosmetic + Restylane Lyft

**Batch:** canonical_batch.md | **Tier:** canonical | **Evidence:** moderate

**Patient-Facing Name:** Smooth & Restore (Restylane)
**One-Line Positioning:** Botox relaxes expression lines while Restylane Lyft restores structural midface volume or hand volume through a complementary mechanism.

**Why Together:** Botox addresses movement-caused lines; Restylane Lyft restores structural midface or hand volume. The complementarity is mechanism-based -- neuromodulation vs HA gel scaffold.

**Staff Close:** Botox can help with the lines around your eyes and forehead -- those are caused by muscle movement. If you're also noticing that your cheeks look flatter than they used to, that's volume loss, which Botox can't address. Restylane Lyft works on a different layer to restore that structure.

**Do Not Say (pair-specific):**
- Do not state that the combination is FDA approved as a combination
- Do not dismiss the cross-brand nature as a negative or positive
- Do not overpromise on evidence strength -- no product-specific study for this pair
- Do not claim Restylane Lyft provides the same depth as products designed for deeper planes

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Botox Cosmetic, Restylane Lyft)

> Full JSON: `REVIEW_QUEUE/combination_fuel/canonical_batch.md` -- Pair 3

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 4. Botox Cosmetic + RHA Redensity

**Batch:** canonical_batch.md | **Tier:** canonical | **Evidence:** moderate

**Patient-Facing Name:** Smooth & Soften (Perioral)
**One-Line Positioning:** Botox reduces upper-face expression lines while RHA Redensity softens the perioral fine lines that neurotoxin cannot address.

**Why Together:** Botox and RHA Redensity treat complementary anatomical zones. Botox is most effective for upper-face dynamic lines; RHA Redensity's flexible formulation is designed specifically for the dynamic perioral area.

**Staff Close:** When a patient comes in concerned about fine lines both around the eyes and around the mouth, explain: 'Botox can help with the crow's feet and forehead lines -- those are caused by muscle movement. But the lines around your lips are different -- they need a filler that can move with your expressions. RHA Redensity is designed for that dynamic area.'

**Do Not Say (pair-specific):**
- Do not suggest Botox around the mouth -- perioral neurotoxin can impair speech, eating, and facial function
- Do not imply RHA Redensity adds 'volume' to the lips the way lip fillers do
- Do not overstate the perioral maintenance duration
- Do not claim product-specific evidence for this pair

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Botox Cosmetic, RHA Redensity)

> Full JSON: `REVIEW_QUEUE/combination_fuel/canonical_batch.md` -- Pair 4

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 5. Botox Cosmetic + SKINVIVE by Juvederm

**Batch:** canonical_batch.md | **Tier:** canonical | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Smooth & Glow
**One-Line Positioning:** Botox reduces expression lines while SKINVIVE improves the overall cheek skin smoothness that neurotoxin cannot address.

**Why Together:** Botox and SKINVIVE address completely different aspects of skin appearance. Botox reduces movement-caused lines; SKINVIVE improves cheek skin smoothness through intradermal microdroplet HA hydration.

**Staff Close:** When a patient is focused on looking refreshed: 'Botox can help with the expression lines -- frown lines, crow's feet, forehead. But some patients tell us even after Botox, their skin still doesn't look as vibrant as they'd like. SKINVIVE isn't a filler in the traditional sense -- it doesn't add volume or fill wrinkles. It hydrates the skin from within using microdroplets, improving cheek skin smoothness.'

**Do Not Say (pair-specific):**
- Do not describe SKINVIVE as a filler that 'adds volume'
- Do not overstate the evidence for this combination -- expert consensus only
- Do not describe SKINVIVE's FDA indication beyond cheek skin smoothness
- Do not guarantee specific 'glow' outcomes

**Citations:** FDA labels (Botox Cosmetic, SKINVIVE); Expert consensus only -- no published controlled trial for BoNT-A + microdroplet HA

> Full JSON: `REVIEW_QUEUE/combination_fuel/canonical_batch.md` -- Pair 5

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 6. Botox Cosmetic + Sculptra Aesthetic

**Batch:** common_neurotoxin_sculptra_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Smooth & Rebuild
**One-Line Positioning:** Botox relaxes expression lines immediately while Sculptra supports collagen production over months -- addressing two different aspects of aging on different timelines.

**Why Together:** Botox and Sculptra address two fundamentally different aspects of aging through orthogonal mechanisms. Botox delivers immediate, reversible neuromodulation; Sculptra delivers gradual, durable collagen stimulation.

**Staff Close:** When a patient is concerned about both expression lines and overall facial volume loss: 'There are really two different things happening. The lines around your eyes and forehead are from muscle movement -- that's what Botox addresses. But the overall loss of fullness and structure is from collagen breakdown over time. Sculptra works gradually to support collagen production.'

**Do Not Say (pair-specific):**
- Do not claim this combination is 'proven' or 'FDA approved' as a combination
- Do not say Sculptra 'replaces a facelift' or is a 'non-surgical facelift'
- Do not minimize the FDA Sculptra combination caveat
- Do not guarantee collagen stimulation outcomes

**Same-session:** Conditional -- FDA Sculptra label notes combination use not evaluated in controlled clinical trials

**Citations:** FDA labels (Botox Cosmetic, Sculptra Aesthetic); FDA Sculptra combination caveat disclosed

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_neurotoxin_sculptra_batch.md` -- Pair 1

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 7. Daxxify + Sculptra Aesthetic

**Batch:** common_neurotoxin_sculptra_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Long-Lasting Smooth & Rebuild
**One-Line Positioning:** Daxxify's extended ~6-month duration means fewer toxin visits per year, while Sculptra supports collagen production over months -- a low-visit-count long-term aging plan.

**Why Together:** Daxxify addresses dynamic expression lines with ~6-month extended duration; Sculptra stimulates collagen over months. Daxxify's reduced visit frequency simplifies scheduling around Sculptra sessions.

**Staff Close:** When a patient values fewer visits: 'There are two different things happening with aging. The lines from expressions -- that's what Daxxify addresses. It uses a peptide formulation that tends to last about six months. The loss of fullness and firmness is from collagen breakdown over time -- Sculptra addresses that gradually.'

**Do Not Say (pair-specific):**
- Do not claim this combination is 'proven' as a combination
- Do not say Sculptra 'replaces a facelift'
- Do not minimize the FDA Sculptra combination caveat
- Do not guarantee Daxxify's 6-month duration as absolute

**Same-session:** Conditional -- FDA Sculptra combination caveat

**Citations:** FDA labels (Daxxify, Sculptra Aesthetic); FDA Sculptra combination caveat disclosed

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_neurotoxin_sculptra_batch.md` -- Pair 2

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 8. Dysport + Sculptra Aesthetic

**Batch:** common_neurotoxin_sculptra_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Fast Smooth & Rebuild
**One-Line Positioning:** Dysport's fast-onset broad coverage addresses expression lines quickly while Sculptra supports collagen production over months.

**Why Together:** Dysport's broader diffusion pattern addresses dynamic expression lines across large areas quickly; Sculptra stimulates collagen for structural improvement over months. Both Galderma products.

**Staff Close:** When a patient is concerned about both expression lines and overall facial structure: 'There are really two different things happening. The lines around your eyes and across your forehead are from muscle movement -- Dysport addresses that. But the overall loss of fullness and firmness is from collagen breaking down over time. Sculptra works gradually to support collagen production.'

**Do Not Say (pair-specific):**
- Do not claim this combination is 'proven' as a combination
- Do not say Sculptra 'replaces a facelift'
- Do not minimize the FDA Sculptra combination caveat
- Do not overstate Galderma ecosystem benefits as clinical benefits

**Same-session:** Conditional -- FDA Sculptra combination caveat

**Citations:** FDA labels (Dysport, Sculptra Aesthetic); FDA Sculptra combination caveat disclosed

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_neurotoxin_sculptra_batch.md` -- Pair 3

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 9. Jeuveau + Sculptra Aesthetic

**Batch:** common_neurotoxin_sculptra_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Smooth & Rebuild (Jeuveau)
**One-Line Positioning:** Jeuveau's aesthetics-only neurotoxin addresses expression lines while Sculptra supports collagen production over months.

**Why Together:** Jeuveau addresses dynamic expression lines through standard BoNT-A mechanism; Sculptra stimulates collagen production. Jeuveau-specific combination evidence is more limited than other neurotoxins.

**Staff Close:** The neurotoxin + biostimulator rationale applies to Jeuveau the same way it does to any neurotoxin. 'Jeuveau addresses the lines from muscle movement. Sculptra supports collagen production over time. They work at different depths and on different timelines.'

**Do Not Say (pair-specific):**
- Do not claim this combination is 'proven' as a combination
- Do not say Sculptra 'replaces a facelift'
- Do not minimize the FDA Sculptra combination caveat
- Do not overstate Jeuveau's evidence base for this pairing

**Same-session:** Conditional -- FDA Sculptra combination caveat

**Citations:** FDA labels (Jeuveau, Sculptra Aesthetic); FDA Sculptra combination caveat disclosed

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_neurotoxin_sculptra_batch.md` -- Pair 4

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 10. Xeomin + Sculptra Aesthetic

**Batch:** common_neurotoxin_sculptra_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Pure Smooth & Rebuild
**One-Line Positioning:** Xeomin's purified formulation addresses expression lines while Sculptra supports collagen production -- a long-term aging plan that some providers consider when protein-free neurotoxin is relevant.

**Why Together:** Xeomin's accessory-protein-free formulation is a consideration some providers weigh for long-term neurotoxin use; Sculptra's collagen stimulation is also a long-term structural investment. Complementary timelines and mechanisms.

**Staff Close:** When discussing Xeomin + Sculptra, the key angle is long-term planning. 'Xeomin is a pure-form neurotoxin -- it's been processed to remove the accessory proteins, which may reduce the chance of your body building resistance over time. Xeomin handles the expression lines; Sculptra supports the underlying structure.'

**Do Not Say (pair-specific):**
- Do not claim this combination is 'proven' as a combination
- Do not say Sculptra 'replaces a facelift'
- Do not minimize the FDA Sculptra combination caveat
- Do not overstate Xeomin immunogenicity advantages -- frame as provider consideration, not superiority

**Same-session:** Conditional -- FDA Sculptra combination caveat

**Citations:** FDA labels (Xeomin, Sculptra Aesthetic); FDA Sculptra combination caveat disclosed

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_neurotoxin_sculptra_batch.md` -- Pair 5

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 11. Daxxify + SKINVIVE by Juvederm

**Batch:** common_neurotoxin_skinvive_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Long-Lasting Smooth & Glow
**One-Line Positioning:** Daxxify's ~6-month duration and SKINVIVE's ~6-month skin quality improvement align on a convenient shared maintenance schedule.

**Why Together:** Daxxify reduces expression lines with extended ~6-month duration; SKINVIVE improves cheek skin smoothness through intradermal microdroplet HA. Both have ~6-month maintenance cycles -- practical scheduling alignment.

**Staff Close:** Two key points. First, clarify what SKINVIVE is: 'SKINVIVE doesn't add volume the way cheek or lip fillers do. It uses microdroplets to improve the quality and smoothness of your skin itself.' Second, the scheduling convenience: 'Both last about six months, so you could potentially schedule maintenance for both on the same visit about twice a year.'

**Do Not Say (pair-specific):**
- Do not describe SKINVIVE as a filler that 'adds volume'
- Do not overstate the evidence -- expert consensus only
- Do not describe SKINVIVE's indication beyond cheek skin smoothness
- Do not guarantee specific 'glow' outcomes

**Citations:** FDA labels (Daxxify, SKINVIVE); Expert consensus only

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_neurotoxin_skinvive_batch.md` -- Pair 1

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 12. Dysport + SKINVIVE by Juvederm

**Batch:** common_neurotoxin_skinvive_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Fast Smooth & Glow
**One-Line Positioning:** Dysport's fast-onset broad coverage addresses expression lines while SKINVIVE improves cheek skin smoothness.

**Why Together:** Dysport's broader diffusion treats dynamic expression lines across the upper face quickly; SKINVIVE improves cheek skin smoothness through intradermal microdroplet HA. Different tissues, different concerns, different mechanisms.

**Staff Close:** 'Dysport addresses the expression lines on your forehead and around your eyes by relaxing the muscles that cause them. SKINVIVE does something completely different -- it uses microdroplets of hyaluronic acid placed just under the surface to improve skin smoothness. It's more like a skin quality treatment than a filler.'

**Do Not Say (pair-specific):**
- Do not describe SKINVIVE as a filler that 'adds volume'
- Do not overstate the evidence -- expert consensus only
- Do not describe SKINVIVE's indication beyond cheek skin smoothness
- Do not overstate Galderma ecosystem benefits as clinical benefits

**Citations:** FDA labels (Dysport, SKINVIVE); Expert consensus only

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_neurotoxin_skinvive_batch.md` -- Pair 2

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 13. Jeuveau + SKINVIVE by Juvederm

**Batch:** common_neurotoxin_skinvive_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Smooth & Glow (Jeuveau)
**One-Line Positioning:** Jeuveau's aesthetics-only neurotoxin relaxes expression lines while SKINVIVE improves cheek skin smoothness -- two newer-generation products addressing different aspects of skin appearance.

**Why Together:** Jeuveau addresses dynamic expression lines through prabotulinumtoxinA neuromodulation; SKINVIVE improves cheek skin smoothness through intradermal microdroplet HA. Different mechanisms, different tissue targets, no overlap.

**Staff Close:** Two important things. First, Jeuveau is designed specifically for cosmetic use -- it relaxes the muscles that cause expression lines. Second, SKINVIVE is not a traditional filler: 'It doesn't add volume to your cheeks or lips. It uses microdroplets to improve your skin's overall quality.'

**Do Not Say (pair-specific):**
- Do not describe SKINVIVE as a filler that 'adds volume'
- Do not overstate the evidence -- expert consensus only
- Do not describe SKINVIVE's indication beyond cheek skin smoothness
- Do not overstate Jeuveau's evidence base

**Citations:** FDA labels (Jeuveau, SKINVIVE); Expert consensus only

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_neurotoxin_skinvive_batch.md` -- Pair 3

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 14. Xeomin + SKINVIVE by Juvederm

**Batch:** common_neurotoxin_skinvive_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Pure Smooth & Glow
**One-Line Positioning:** Xeomin's purified formulation addresses expression lines while SKINVIVE improves cheek skin smoothness -- wrinkle relaxation and skin quality through completely different mechanisms.

**Why Together:** Xeomin addresses dynamic expression lines with a purified formulation; SKINVIVE improves cheek skin smoothness through intradermal microdroplet HA. Different mechanisms, different tissue targets.

**Staff Close:** Two distinct stories. On Xeomin: 'It's the pure neurotoxin -- just the active ingredient without complexing proteins. Some providers consider this for patients planning long-term neurotoxin use.' On SKINVIVE: 'This is not a filler in the traditional sense. SKINVIVE uses microdroplets placed in the skin itself to improve cheek skin smoothness.'

**Do Not Say (pair-specific):**
- Do not describe SKINVIVE as a filler that 'adds volume'
- Do not overstate the evidence -- expert consensus only
- Do not overstate Xeomin immunogenicity advantages -- frame as provider consideration
- Do not describe SKINVIVE's indication beyond cheek skin smoothness

**Citations:** FDA labels (Xeomin, SKINVIVE); Expert consensus only

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_neurotoxin_skinvive_batch.md` -- Pair 4

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 15. Juvederm Vollure XC + Sculptra Aesthetic

**Batch:** common_ha_sculptra_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Rebuild & Refine (NLF)
**One-Line Positioning:** Sculptra builds collagen support in the midface over months while Vollure provides precise nasolabial fold correction -- address the cause and the visible crease.

**Why Together:** Sculptra addresses the underlying collagen loss that causes nasolabial folds to deepen; Vollure provides immediate correction of the fold crease itself. One addresses the cause, the other the visible result.

**Staff Close:** 'Those fold lines often deepen because the midface above them is losing volume and structure. If we only fill the fold itself, we're treating the symptom. Sculptra supports collagen production in the midface -- that's addressing the cause. Vollure then smooths whatever fold remains.'

**Do Not Say (pair-specific):**
- Do not claim this combination is 'proven' as a combination
- Do not say Sculptra 'replaces a facelift'
- Do not minimize the FDA Sculptra combination caveat
- Do not overstate Vollure's role as addressing the root cause

**Same-session:** Conditional -- sequential staging preferred; FDA Sculptra combination caveat

**Citations:** FDA labels (Vollure XC, Sculptra Aesthetic); FDA Sculptra combination caveat disclosed

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_ha_sculptra_batch.md` -- Pair 1

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 16. Juvederm Voluma XC + Sculptra Aesthetic

**Batch:** common_ha_sculptra_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Rebuild & Contour (Cheek)
**One-Line Positioning:** Sculptra builds collagen in the midface foundation over months while Voluma provides immediate structural cheek contouring -- deep structure from two complementary pathways.

**Why Together:** Sculptra addresses the collagen infrastructure supporting the midface; Voluma provides the structural scaffold on top. Different depths, different timelines, different mechanisms.

**Staff Close:** 'There's the underlying structure -- the collagen that's been thinning over time -- and then there's the specific contour and definition. Sculptra supports that underlying collagen production gradually. Voluma gives you the precise cheek sculpting on top of a stronger foundation.'

**Do Not Say (pair-specific):**
- Do not claim this combination is 'proven' as a combination
- Do not say Sculptra 'replaces a facelift'
- Do not minimize the FDA Sculptra combination caveat
- Do not overstate immediate results from the combination

**Same-session:** Conditional -- sequential staging preferred; FDA Sculptra combination caveat

**Citations:** FDA labels (Voluma XC, Sculptra Aesthetic); FDA Sculptra combination caveat disclosed

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_ha_sculptra_batch.md` -- Pair 2

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 17. Restylane Lyft + Sculptra Aesthetic

**Batch:** common_ha_sculptra_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Rebuild & Structure (Galderma)
**One-Line Positioning:** Sculptra and Restylane Lyft are both Galderma products addressing complementary aspects of midface and hand aging -- collagen stimulation and immediate structural correction.

**Why Together:** Both Galderma products working through different mechanisms at different tissue depths. Sculptra stimulates collagen gradually; Lyft provides immediate structural correction.

**Staff Close:** 'Sculptra supports collagen production gradually. Lyft gives you the immediate midface structure -- the cheekbone definition and lift. Starting with collagen support means the contouring filler sits on a stronger base and you may need less of it.'

**Do Not Say (pair-specific):**
- Do not claim this combination is 'proven' as a combination
- Do not say Sculptra 'replaces a facelift'
- Do not minimize the FDA Sculptra combination caveat
- Do not overstate Galderma ecosystem benefits as clinical benefits

**Same-session:** Conditional -- sequential staging preferred; FDA Sculptra combination caveat

**Citations:** FDA labels (Restylane Lyft, Sculptra Aesthetic); FDA Sculptra combination caveat disclosed

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_ha_sculptra_batch.md` -- Pair 3

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 18. RHA Redensity + Sculptra Aesthetic

**Batch:** common_ha_sculptra_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Rebuild & Refine (Perioral)
**One-Line Positioning:** Sculptra builds collagen support in the perioral region over months while RHA Redensity's resilient HA directly smooths fine lines in this high-movement area.

**Why Together:** Sculptra addresses the underlying collagen loss; RHA Redensity's resilient HA is specifically designed for the dynamic perioral zone, flexing with movement rather than resisting it. Complementary approaches.

**Staff Close:** 'Perioral lines form for two reasons: the skin is constantly moving there, and the underlying collagen support has thinned over time. RHA Redensity is a resilient HA designed for dynamic areas. Sculptra supports the deeper collagen production that the perioral region needs.'

**Do Not Say (pair-specific):**
- Do not claim this combination is 'proven' as a combination
- Do not say Sculptra 'replaces a facelift'
- Do not minimize the FDA Sculptra combination caveat
- Do not overstate RHA Redensity's role in replacing Sculptra's collagen stimulation

**Same-session:** Conditional -- perioral bruising risk should inform staging decision; FDA Sculptra combination caveat

**Citations:** FDA labels (RHA Redensity, Sculptra Aesthetic); FDA Sculptra combination caveat disclosed

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_ha_sculptra_batch.md` -- Pair 4

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 19. SKINVIVE by Juvederm + Sculptra Aesthetic

**Batch:** common_ha_sculptra_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Deep Rebuild & Surface Glow
**One-Line Positioning:** Sculptra builds collagen from deep structural layers while SKINVIVE improves surface skin quality -- an inside-out layered approach to skin aging.

**Why Together:** Sculptra works subdermally to stimulate collagen from deep within; SKINVIVE works intradermally to improve surface skin quality. Different layers, different purposes.

**Staff Close:** 'SKINVIVE is NOT a volume filler. Sculptra and SKINVIVE do completely different things at different depths. Sculptra supports collagen production deep in your skin -- the foundation. SKINVIVE improves the surface -- hydration, smoothness, skin quality. One is structural, the other is finishing.'

**Do Not Say (pair-specific):**
- Do not describe SKINVIVE as a filler that 'adds volume'
- Do not claim this combination is 'proven' as a combination
- Do not minimize the FDA Sculptra combination caveat
- Do not guarantee specific 'glow' outcomes

**Same-session:** Conditional -- different tissue depths; FDA Sculptra combination caveat

**Citations:** FDA labels (SKINVIVE, Sculptra Aesthetic); FDA Sculptra combination caveat disclosed

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_ha_sculptra_batch.md` -- Pair 5

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 20. Daxxify + Juvederm Vollure XC

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Long-Lasting Smooth & Restore
**One-Line Positioning:** Daxxify's extended-duration neuromodulation reduces annual visit frequency while Vollure addresses the nasolabial fold volume loss that neurotoxin cannot correct.

**Why Together:** Daxxify addresses movement-caused lines with approximately 6-month duration; Vollure restores mid-depth volume in nasolabial folds. Different tissue layers and aging mechanisms.

**Staff Close:** 'Daxxify uses a peptide technology that helps it last about six months -- so instead of coming in three or four times a year, you may only need two visits. Vollure addresses the deeper lines around your nose and mouth, and it typically lasts about 18 months.'

**Do Not Say (pair-specific):**
- Do not guarantee Daxxify's 6-month duration as universal
- Do not call this a 'liquid facelift'
- Do not state the combination is FDA approved as a combination
- Do not overstate Daxxify evidence relative to Botox

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Daxxify, Vollure XC)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 1

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 21. Daxxify + Juvederm Voluma XC

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Long-Lasting Smooth & Lift
**One-Line Positioning:** Daxxify's extended neuromodulation reduces annual visit frequency while Voluma restores the deep cheek structure that muscle relaxation cannot address.

**Why Together:** Daxxify addresses movement-caused lines with ~6-month duration; Voluma restores deep structural cheek volume. Different tissue layers.

**Staff Close:** 'Daxxify relaxes expression lines and lasts about six months -- so about two visits a year instead of three or four. Voluma restores cheek structure and can last up to two years. Together, these are two of the longer-duration options available.'

**Do Not Say (pair-specific):**
- Do not guarantee Daxxify's 6-month duration as universal
- Do not call this a 'liquid facelift'
- Do not state the combination is FDA approved as a combination
- Do not overstate Daxxify evidence relative to Botox

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Daxxify, Voluma XC)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 2

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 22. Daxxify + Restylane Lyft

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Long-Lasting Smooth & Restore (Lyft)
**One-Line Positioning:** Daxxify's extended neuromodulation pairs with Restylane Lyft's unique dual midface-and-hand indication.

**Why Together:** Daxxify addresses movement-caused lines; Restylane Lyft restores structural midface or hand volume. Mechanism-based complementarity.

**Staff Close:** 'Daxxify lasts about six months, so you'd come in about twice a year for the wrinkle relaxer. Restylane Lyft is one of the few fillers approved for both the midface and hands.'

**Do Not Say (pair-specific):**
- Do not guarantee Daxxify's 6-month duration as universal
- Do not dismiss the cross-brand nature as a negative or positive
- Do not state the combination is FDA approved as a combination
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Daxxify, Restylane Lyft)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 3

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 23. Daxxify + RHA Redensity

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Long-Lasting Smooth & Soften (Perioral)
**One-Line Positioning:** Daxxify's extended upper-face neuromodulation pairs with RHA Redensity's resilient perioral HA -- both from the Revance ecosystem.

**Why Together:** Daxxify and RHA Redensity are both Revance products, creating ecosystem alignment. Daxxify addresses upper-face dynamic lines with extended duration; RHA Redensity's resilient HA is designed for perioral fine lines.

**Staff Close:** 'Both Daxxify and RHA Redensity are Revance products, so patients can benefit from a single loyalty program. Daxxify addresses your expression lines and lasts about six months. RHA Redensity is a specialized filler for the fine lines around your mouth -- it's designed to move with your expressions.'

**Do Not Say (pair-specific):**
- Do not suggest Daxxify around the mouth
- Do not imply RHA Redensity adds 'volume' to the lips
- Do not overstate Revance ecosystem benefits as clinical benefits
- Do not guarantee Daxxify's 6-month duration as universal

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Daxxify, RHA Redensity)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 4

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 24. Dysport + Juvederm Vollure XC

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Broad Smooth & Restore
**One-Line Positioning:** Dysport's broad-diffusion pattern addresses large dynamic zones while Vollure softens the static nasolabial fold lines that neurotoxin cannot correct.

**Why Together:** Dysport addresses movement-caused lines in broad facial zones; Vollure restores mid-depth volume in nasolabial folds. Different mechanisms at different tissue layers.

**Staff Close:** 'The forehead and crow's feet lines come from muscle movement -- Dysport is designed for those areas and tends to work well across broader zones. The deeper lines around your nose and mouth are from volume loss -- that's where Vollure comes in.'

**Do Not Say (pair-specific):**
- Do not call this a 'liquid facelift'
- Do not state the combination is FDA approved as a combination
- Do not dismiss the cross-brand nature as a negative or positive
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Dysport, Vollure XC)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 5

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 25. Dysport + Juvederm Voluma XC

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Broad Smooth & Lift
**One-Line Positioning:** Dysport's broad-coverage neuromodulation addresses large dynamic zones while Voluma rebuilds the deep cheek foundation.

**Why Together:** Dysport addresses movement-caused lines with broader diffusion; Voluma restores deep structural cheek volume. Different tissue layers.

**Staff Close:** 'The lines on your forehead and around your eyes are from muscle movement -- Dysport addresses those by relaxing the muscles. But if your cheeks look flatter than they used to, that's structural volume loss. Voluma is designed specifically for deep cheek volume.'

**Do Not Say (pair-specific):**
- Do not call this a 'liquid facelift'
- Do not state the combination is FDA approved as a combination
- Do not describe Voluma as 'lifting' in a surgical sense
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Dysport, Voluma XC)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 6

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 26. Dysport + Restylane Lyft

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Broad Smooth & Restore (Galderma)
**One-Line Positioning:** Dysport and Restylane Lyft are both Galderma products addressing expression lines and structural volume through different mechanisms.

**Why Together:** Both Galderma products. Dysport addresses movement-caused lines; Restylane Lyft restores structural midface or hand volume. Mechanism-based complementarity.

**Staff Close:** 'Dysport and Restylane Lyft are both Galderma products, so patients can benefit from brand consistency and loyalty programs. Dysport works on the muscles that cause expression lines. Restylane Lyft addresses volume loss, and it's unique because it's approved for both midface volume and hands.'

**Do Not Say (pair-specific):**
- Do not overstate Galderma ecosystem benefits as clinical benefits
- Do not state the combination is FDA approved as a combination
- Do not dismiss or overstate the brand consistency angle
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Dysport, Restylane Lyft)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 7

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 27. Dysport + RHA Redensity

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Broad Smooth & Soften (Perioral)
**One-Line Positioning:** Dysport's broad-coverage neuromodulation addresses large upper-face zones while RHA Redensity refines the perioral fine lines that neurotoxin is not suited to treat.

**Why Together:** Dysport addresses upper-face movement-caused lines with broader diffusion; RHA Redensity uses resilient HA for perioral fine lines and dynamic areas. Different zones, different mechanisms.

**Staff Close:** 'The forehead and crow's feet lines are from muscle movement -- Dysport relaxes those muscles and works well across broad areas. The fine lines around your mouth are a different challenge. That area moves constantly, so it needs a filler that can flex with your expressions. RHA Redensity is designed specifically for those perioral lines.'

**Do Not Say (pair-specific):**
- Do not suggest Dysport around the mouth
- Do not imply RHA Redensity adds 'volume' to the lips
- Do not dismiss the cross-brand nature as a negative or positive
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Dysport, RHA Redensity)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 8

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 28. Jeuveau + Juvederm Vollure XC

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Smooth & Restore (Jeuveau)
**One-Line Positioning:** Jeuveau's aesthetics-only neuromodulation addresses dynamic expression lines while Vollure corrects the nasolabial fold volume loss.

**Why Together:** Jeuveau addresses movement-caused lines; Vollure restores mid-depth volume in nasolabial folds. Mechanism-based complementarity.

**Staff Close:** 'Jeuveau is sometimes called Newtox -- it's a wrinkle relaxer made specifically for cosmetic use. Vollure addresses the deeper lines around your nose and mouth that come from volume loss. It's specifically designed for nasolabial folds and tends to last about 18 months.'

**Do Not Say (pair-specific):**
- Do not call this a 'liquid facelift'
- Do not state the combination is FDA approved as a combination
- Do not overstate Jeuveau's evidence base relative to Botox
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Jeuveau, Vollure XC)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 9

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 29. Jeuveau + Juvederm Voluma XC

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Relax & Restore
**One-Line Positioning:** Jeuveau relaxes expression lines while Voluma rebuilds the cheek structure that supports the entire face.

**Why Together:** Jeuveau relaxes muscles creating expression lines; Voluma restores deep structural cheek volume. Complementary tools for different aging mechanisms.

**Staff Close:** Help patients separate the concerns: expression lines are from muscle movement (Jeuveau), cheek flatness is structural volume loss (Voluma) -- two different processes requiring two different solutions.

**Do Not Say (pair-specific):**
- Do not call this a 'liquid facelift'
- Do not state the combination is FDA approved as a combination
- Do not overstate Jeuveau's evidence base relative to Botox
- Do not describe Voluma as 'lifting' in a surgical sense

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Jeuveau, Voluma XC)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 10

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 30. Jeuveau + Restylane Lyft

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Relax & Lift
**One-Line Positioning:** Jeuveau relaxes expression lines while Restylane Lyft restores midface volume and can address aging hands -- the only HA filler approved for both.

**Why Together:** Jeuveau relaxes upper-face expression muscles; Restylane Lyft restores midface volume or hand volume. Lyft's dual indication extends this pairing to hand aging.

**Staff Close:** Lyft is one of the only fillers approved for both the midface and hands -- if a patient mentions their hands as a concern, this is specifically indicated for that.

**Do Not Say (pair-specific):**
- Do not dismiss the cross-brand nature as a negative or positive
- Do not state the combination is FDA approved as a combination
- Do not overstate Jeuveau's evidence base relative to Botox
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Jeuveau, Restylane Lyft)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 11

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 31. Jeuveau + RHA Redensity

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Relax & Refine
**One-Line Positioning:** Jeuveau addresses expression lines in the upper face while RHA Redensity refines the fine lines around the mouth that constant movement creates.

**Why Together:** Jeuveau relaxes upper-face expression muscles; RHA Redensity uses resilient HA designed for the perioral zone. Different zones, different mechanisms.

**Staff Close:** Jeuveau for upper-face expression lines, RHA Redensity as a finishing filler for perioral fine lines -- two different zones requiring two different tools.

**Do Not Say (pair-specific):**
- Do not suggest Jeuveau around the mouth
- Do not imply RHA Redensity adds 'volume' to the lips
- Do not overstate Jeuveau's evidence base relative to Botox
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Jeuveau, RHA Redensity)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 12

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 32. Xeomin + Juvederm Vollure XC

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Pure Smooth
**One-Line Positioning:** Xeomin's pure neurotoxin formulation relaxes expression lines while Vollure smooths nasolabial folds -- two different problems, two different solutions.

**Why Together:** Xeomin relaxes expression muscles; Vollure smooths nasolabial fold lines with HA gel correction. Complementary and non-overlapping mechanisms.

**Staff Close:** Xeomin's purity is a meaningful differentiator for long-term plans; Vollure is NLF-specific with 18-month duration -- two different tools for two different concerns.

**Do Not Say (pair-specific):**
- Do not overstate Xeomin immunogenicity advantages -- frame as provider consideration
- Do not call this a 'liquid facelift'
- Do not state the combination is FDA approved as a combination
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Xeomin, Vollure XC)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 13

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 33. Xeomin + Juvederm Voluma XC

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Pure Restore
**One-Line Positioning:** Xeomin's pure neurotoxin formulation relaxes expression lines while Voluma rebuilds structural cheek volume.

**Why Together:** Xeomin relaxes expression muscles; Voluma restores deep structural cheek volume. Different tissue layers, different aging mechanisms.

**Staff Close:** Xeomin's purity is a meaningful long-term consideration; Voluma restores the structural foundation -- two different tools addressing two different layers of aging.

**Do Not Say (pair-specific):**
- Do not overstate Xeomin immunogenicity advantages -- frame as provider consideration
- Do not describe Voluma as 'lifting' in a surgical sense
- Do not state the combination is FDA approved as a combination
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Xeomin, Voluma XC)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 14

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 34. Xeomin + Restylane Lyft

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Pure Lift
**One-Line Positioning:** Xeomin's pure neurotoxin formulation relaxes expression lines while Restylane Lyft restores midface and hand volume -- the only HA filler approved for both.

**Why Together:** Xeomin relaxes expression muscles; Restylane Lyft restores midface volume or hand volume. Lyft's dual indication extends this pairing to hand aging.

**Staff Close:** Two differentiators: Xeomin's purity for long-term treatment considerations and Lyft's unique dual face + hand FDA indication.

**Do Not Say (pair-specific):**
- Do not overstate Xeomin immunogenicity advantages -- frame as provider consideration
- Do not dismiss the cross-brand nature as a negative or positive
- Do not state the combination is FDA approved as a combination
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Xeomin, Restylane Lyft)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 15

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 35. Xeomin + RHA Redensity

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** moderate

**Patient-Facing Name:** Pure Refine
**One-Line Positioning:** Xeomin's pure neurotoxin formulation addresses upper-face expression lines while RHA Redensity refines perioral fine lines in a zone built for constant movement.

**Why Together:** Xeomin relaxes upper-face expression muscles; RHA Redensity uses resilient HA designed for the perioral zone. Different zones, different mechanisms, different product categories.

**Staff Close:** Xeomin's purity is a meaningful long-term consideration; RHA Redensity is the finishing step for perioral fine lines -- two tools designed for the nuances of long-term maintenance.

**Do Not Say (pair-specific):**
- Do not overstate Xeomin immunogenicity advantages -- frame as provider consideration
- Do not suggest Xeomin around the mouth
- Do not imply RHA Redensity adds 'volume' to the lips
- Do not overpromise on evidence -- category-level only

**Citations:** PubMed DOI 10.1097/DSS.0000000000000754 (category-level); FDA labels (Xeomin, RHA Redensity)

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 16

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 36. Botox Cosmetic + InMode Morpheus8

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** strong

**Patient-Facing Name:** Smooth & Tighten
**One-Line Positioning:** Botox Cosmetic relaxes expression lines while Morpheus8 RF microneedling improves skin texture and firmness -- addressing muscle movement and skin quality through separate mechanisms.

**Why Together:** Botox Cosmetic relaxes muscles causing expression lines; Morpheus8 targets skin quality, texture, and laxity through RF microneedling. Published evidence supports same-day safety of this combination.

**Staff Close:** Energy device for skin quality and firmness; neurotoxin for expression lines -- different tissue layers, different tools, supported by published combination safety data.

**Do Not Say (pair-specific):**
- Do not claim Morpheus8 'replaces surgery' or is equivalent to a surgical facelift
- Do not minimize Morpheus8 social downtime (several days)
- Do not claim the combination is 'FDA approved' as a combination
- Do not guarantee specific tightening outcomes

**Citations:** PubMed DOI 10.1111/j.1524-4725.2005.31105 (same-day RF + BoNT-A safety); FDA labels (Botox Cosmetic, Morpheus8 510(k))

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 17

#### Review Decision
**Status:** PENDING
**Notes:**

---

### 37. Sculptra Aesthetic + InMode Morpheus8

**Batch:** common_remaining_batch.md | **Tier:** common | **Evidence:** weak (FLAGGED)

**Patient-Facing Name:** Rebuild & Refirm
**One-Line Positioning:** Sculptra supports collagen production from within while Morpheus8 RF microneedling improves skin texture and firmness from a different pathway -- two complementary collagen stimulation mechanisms.

**Why Together:** Sculptra stimulates collagen through PLLA particle-based biologic response; Morpheus8 stimulates collagen through controlled RF thermal energy. Two different pathways to collagen stimulation -- biologic (Sculptra) and thermal (Morpheus8).

**Staff Close:** Different pathways to collagen support -- Sculptra biologic, Morpheus8 thermal. Not evaluated in controlled trials; present as a provider-guided option based on individual patient needs.

**Do Not Say (pair-specific):**
- Do not claim this combination has been clinically proven together
- Do not claim it will 'completely reverse collagen loss'
- Do not say fewer Sculptra sessions are needed with Morpheus8
- Do not say this will replace surgery

**Same-session:** Conditional -- not evaluated in controlled trials; provider judgment required

**Citations:** FDA labels (Sculptra Aesthetic, Morpheus8 510(k)); FDA Sculptra combination caveat disclosed; Expert consensus only

> Full JSON: `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` -- Pair 18

#### Review Decision
**Status:** PENDING
**Notes:**

---

## Approval Summary

**To approve all docs:** Change each pair's Status from PENDING to APPROVED, or type "approved" to approve all.

**To request revisions:** Change specific pairs to NEEDS REVISION and add notes describing what needs changing.

**To reject:** Change specific pairs to REJECTED and add notes.

**After approval:** SQL file `supabase/compile_sql/12-03-combination-fuel-updates.sql` will be executed against agent_fuel_documents in Global V3 (aejskvmpembryunnbgrk).
