# Combination Fuel Document Review

**Phase:** 12 — combination-fuel-documents
**Generated:** 2026-06-14
**Total docs:** 37 (5 canonical/common Botox + 5 neurotoxin x Sculptra + 4 neurotoxin x SKINVIVE + 5 HA x Sculptra + 18 remaining common pairs)
**QC status:** See GENERATION_QC_REPORT.md — all 7 QC dimensions PASS; 37/37 docs ready for human review

---

## How to Review

1. Check the summary table below — all 37 pairs listed with evidence level, QC result, and current status
2. Read the per-pair detail section for each doc you want to inspect
3. Mark each pair as: **APPROVED** / **NEEDS REVISION** / **REJECTED**
4. For NEEDS REVISION, note what needs changing in the Notes field
5. Approved docs will be committed to `agent_fuel_documents` (table: `agent_fuel_documents`, column: `content`) via `supabase/compile_sql/12-03-combination-fuel-updates.sql`
6. The SQL file is pre-written and gated on your approval — do not execute until you have reviewed and marked all pairs

**Batch files for full JSON:**
- `REVIEW_QUEUE/combination_fuel/canonical_batch.md` — 5 pairs
- `REVIEW_QUEUE/combination_fuel/common_neurotoxin_sculptra_batch.md` — 5 pairs
- `REVIEW_QUEUE/combination_fuel/common_neurotoxin_skinvive_batch.md` — 4 pairs
- `REVIEW_QUEUE/combination_fuel/common_ha_sculptra_batch.md` — 5 pairs
- `REVIEW_QUEUE/combination_fuel/common_remaining_batch.md` — 18 pairs

---

## Summary Table

| # | Pair | Tier | Evidence | QC | Flags | Status |
|---|------|------|----------|-----|-------|--------|
| 1 | Botox Cosmetic + Juvederm Vollure XC | canonical | strong | PASS | — | PENDING |
| 2 | Botox Cosmetic + Juvederm Voluma XC | canonical | strong | PASS | — | PENDING |
| 3 | Botox Cosmetic + Restylane Lyft | common | moderate | PASS | — | PENDING |
| 4 | Botox Cosmetic + RHA Redensity | common | moderate | PASS | — | PENDING |
| 5 | Botox Cosmetic + SKINVIVE by Juvederm | common | **weak** | PASS | FLAG: weak evidence; expert consensus only | PENDING |
| 6 | Botox Cosmetic + Sculptra Aesthetic | common | **weak** | PASS | FLAG: weak evidence; FDA combo caveat; same-session conditional | PENDING |
| 7 | Daxxify + Sculptra Aesthetic | common | **weak** | PASS | FLAG: weak evidence; FDA combo caveat; same-session conditional | PENDING |
| 8 | Dysport + Sculptra Aesthetic | common | **weak** | PASS | FLAG: weak evidence; FDA combo caveat; same-session conditional | PENDING |
| 9 | Jeuveau + Sculptra Aesthetic | common | **weak** | PASS | FLAG: weak evidence; FDA combo caveat; same-session conditional | PENDING |
| 10 | Xeomin + Sculptra Aesthetic | common | **weak** | PASS | FLAG: weak evidence; FDA combo caveat; same-session conditional | PENDING |
| 11 | Daxxify + SKINVIVE by Juvederm | common | **weak** | PASS | FLAG: weak evidence; expert consensus only | PENDING |
| 12 | Dysport + SKINVIVE by Juvederm | common | **weak** | PASS | FLAG: weak evidence; expert consensus only | PENDING |
| 13 | Jeuveau + SKINVIVE by Juvederm | common | **weak** | PASS | FLAG: weak evidence; expert consensus only | PENDING |
| 14 | Xeomin + SKINVIVE by Juvederm | common | **weak** | PASS | FLAG: weak evidence; expert consensus only | PENDING |
| 15 | Juvederm Vollure XC + Sculptra Aesthetic | conditional | **weak** | PASS | FLAG: conditional tier; weak evidence; same-session conditional | PENDING |
| 16 | Juvederm Voluma XC + Sculptra Aesthetic | conditional | **weak** | PASS | FLAG: conditional tier; weak evidence; same-session conditional | PENDING |
| 17 | Restylane Lyft + Sculptra Aesthetic | conditional | **weak** | PASS | FLAG: conditional tier; weak evidence; same-session conditional | PENDING |
| 18 | RHA Redensity + Sculptra Aesthetic | conditional | **weak** | PASS | FLAG: conditional tier; weak evidence; same-session conditional | PENDING |
| 19 | SKINVIVE by Juvederm + Sculptra Aesthetic | conditional | **weak** | PASS | FLAG: conditional tier; weak evidence; same-session conditional | PENDING |
| 20 | Daxxify + Juvederm Vollure XC | common | moderate | PASS | — | PENDING |
| 21 | Daxxify + Juvederm Voluma XC | common | moderate | PASS | — | PENDING |
| 22 | Daxxify + Restylane Lyft | common | moderate | PASS | — | PENDING |
| 23 | Daxxify + RHA Redensity | common | moderate | PASS | — | PENDING |
| 24 | Dysport + Juvederm Vollure XC | common | moderate | PASS | — | PENDING |
| 25 | Dysport + Juvederm Voluma XC | common | moderate | PASS | — | PENDING |
| 26 | Dysport + Restylane Lyft | common | moderate | PASS | — | PENDING |
| 27 | Dysport + RHA Redensity | common | moderate | PASS | — | PENDING |
| 28 | Jeuveau + Juvederm Vollure XC | common | moderate | PASS | — | PENDING |
| 29 | Jeuveau + Juvederm Voluma XC | common | moderate | PASS | — | PENDING |
| 30 | Jeuveau + Restylane Lyft | common | moderate | PASS | — | PENDING |
| 31 | Jeuveau + RHA Redensity | common | moderate | PASS | — | PENDING |
| 32 | Xeomin + Juvederm Vollure XC | common | moderate | PASS | — | PENDING |
| 33 | Xeomin + Juvederm Voluma XC | common | moderate | PASS | — | PENDING |
| 34 | Xeomin + Restylane Lyft | common | moderate | PASS | — | PENDING |
| 35 | Xeomin + RHA Redensity | common | moderate | PASS | — | PENDING |
| 36 | Botox Cosmetic + InMode Morpheus8 | common | strong | PASS | FLAG: same-session conditional; energy device protocol | PENDING |
| 37 | Sculptra Aesthetic + InMode Morpheus8 | conditional | **weak** | PASS | FLAG: conditional tier; weak evidence; same-session conditional | PENDING |

**Evidence summary:** 3 strong | 18 moderate | 16 weak
**QC summary:** 37/37 PASS all 7 QC dimensions
**Review card status:** All 37 pairings cards show Status: PENDING (no pre-existing approvals or rejections)

---

## Flagged Items Requiring Attention

### Weak Evidence Docs (16 docs) — Review Before Promoting
These docs disclose evidence limitation explicitly. Do not promote to patients without provider discussion.

- **All 5 neurotoxin + SKINVIVE pairs** (#5, #11–#14): No class-level or product-specific BoNT-A + microdroplet HA combination evidence. SKINVIVE is distinct from volumizing fillers.
- **All 5 neurotoxin + Sculptra pairs** (#6–#10): Expert consensus only; FDA Sculptra label caveat disclosed in each doc.
- **All 5 HA + Sculptra pairs** (#15–#19): Expert consensus only; FDA Sculptra label caveat disclosed; conditional tier.
- **Sculptra + Morpheus8** (#37): Expert consensus only; FDA Sculptra caveat; conditional tier.

### Same-Session Conditional Docs (7 docs)
Providers must use clinical judgment:
- Botox + InMode Morpheus8 (#36): Energy device first; inflammation assessment between procedures
- All 5 neurotoxin + Sculptra pairs (#6–#10): Sequential staging preferred
- All 5 HA + Sculptra pairs (#15–#19): Sequential staging preferred; same-session by experienced injectors only
- Sculptra + InMode Morpheus8 (#37): Not evaluated in controlled trials

### Conditional Tier Docs (6 docs)
These pairs were reviewed through the pairing engine gates and passed but required additional considerations:
- HA + Sculptra pairs (#15–#19): Overlapping tissue territory; sequencing guidance critical
- Sculptra + Morpheus8 (#37): Expert-consensus-only evidence

---

## Per-Pair Detail Sections

---

### Pair 1: Botox Cosmetic + Juvederm Vollure XC

**pair_key:** `botox_cosmetic__juvederm_vollure_xc`
**Tier:** canonical | **Evidence:** strong | **Same Session OK:** true
**Batch file:** `canonical_batch.md` — Pair 1

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Restore |
| **one_line_positioning** | Botox relaxes the muscles that cause expression lines while Vollure restores the mid-depth volume that muscle relaxation alone cannot address. |
| **why_together** | Botox addresses movement-caused lines through neuromodulation; Vollure fills the static mid-depth volume loss that muscle relaxation cannot restore. These two mechanisms operate at different tissue layers and address different root causes of facial aging. |
| **staff_close** | "Botox can help with the lines around your eyes and forehead — those are caused by muscle movement. But if you're also noticing deeper lines from your nose to the corners of your mouth — those nasolabial folds — those are caused by volume loss, which Botox can't address. Vollure is designed to soften those specific lines by restoring volume at the mid-depth level." |
| **do_not_say (pair_specific)** | (1) Do not call this a 'liquid facelift' or 'non-surgical facelift'. (2) Do not imply Vollure will 'plump' or 'inflate' the face. (3) Do not state the combination is 'FDA approved' as a combination. (4) Do not guarantee how long results will last. |
| **evidence_level** | strong |
| **citations** | PubMed DOI 10.2310/6350.2010.00029; DOI 10.1097/DSS.0000000000000754; FDA labels (Botox Cosmetic, Vollure XC) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 2: Botox Cosmetic + Juvederm Voluma XC

**pair_key:** `botox_cosmetic__juvederm_voluma_xc`
**Tier:** canonical | **Evidence:** strong | **Same Session OK:** true
**Batch file:** `canonical_batch.md` — Pair 2

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Lift |
| **one_line_positioning** | Botox relaxes expression lines while Voluma restores the deep cheek structure that supports and lifts the face. |
| **why_together** | Botox addresses movement-caused lines through neuromodulation; Voluma restores deep structural volume in the cheek area through HA gel scaffold. They work at completely different tissue layers — Botox at the neuromuscular level, Voluma at the deep supraperiosteal/subcutaneous level. |
| **staff_close** | "Botox can help with the lines around your eyes and forehead — those are caused by muscle movement. But if you're also noticing that your cheeks look flatter or more hollow than they used to, that's structural volume loss in the midface, which Botox can't address. Voluma is designed for deep cheek restoration — it provides the structural support that lifts and contours your midface." |
| **do_not_say (pair_specific)** | (1) Do not describe Voluma as 'lifting' in a surgical-lift sense. (2) Do not call this a 'liquid facelift'. (3) Do not imply FDA approval as a package. (4) Do not guarantee cheek volume restoration duration. |
| **evidence_level** | strong |
| **citations** | PubMed DOI 10.2310/6350.2010.00029; DOI 10.1097/DSS.0000000000000754; FDA labels (Botox Cosmetic, Voluma XC) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 3: Botox Cosmetic + Restylane Lyft

**pair_key:** `botox_cosmetic__restylane_lyft`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `canonical_batch.md` — Pair 3

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Restore (Restylane) |
| **one_line_positioning** | Botox relaxes expression lines while Restylane Lyft restores structural midface volume or hand volume through a complementary mechanism. |
| **why_together** | Botox addresses movement-caused lines; Restylane Lyft restores structural midface or hand volume. The complementarity is mechanism-based — neuromodulation vs HA gel scaffold — not brand-specific. |
| **staff_close** | "Botox can help with the lines around your eyes and forehead — those are caused by muscle movement. If you're also noticing that your cheeks look flatter than they used to, that's volume loss, which Botox can't address. Restylane Lyft works on a different layer to restore that structure." |
| **do_not_say (pair_specific)** | (1) Do not state the combination is FDA approved as a combination. (2) Do not dismiss the cross-brand nature as negative or positive. (3) Do not overpromise on evidence strength — category-level only. (4) Do not claim Lyft provides the same depth as products designed for deeper planes. |
| **evidence_level** | moderate (category-level; no product-specific study for this cross-brand pair) |
| **citations** | DOI 10.1097/DSS.0000000000000754 (category); FDA labels (Botox Cosmetic, Restylane Lyft) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 4: Botox Cosmetic + RHA Redensity

**pair_key:** `botox_cosmetic__rha_redensity`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `canonical_batch.md` — Pair 4

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Soften (Perioral) |
| **one_line_positioning** | Botox reduces upper-face expression lines while RHA Redensity softens the perioral fine lines that neurotoxin cannot address. |
| **why_together** | Botox and RHA Redensity treat complementary anatomical zones. Botox is most effective for upper-face dynamic lines; RHA Redensity's flexible formulation is designed specifically for the dynamic perioral area that neurotoxin cannot treat effectively. |
| **staff_close** | "Botox can help with the crow's feet and forehead lines — those are caused by muscle movement. But the lines around your lips are different — they need a filler that can move with your expressions. RHA Redensity is designed for that dynamic area." |
| **do_not_say (pair_specific)** | (1) Do not suggest Botox around the mouth — perioral neurotoxin can impair speech and eating. (2) Do not imply RHA adds 'volume' to lips — it treats perioral rhytids, not lip augmentation. (3) Do not overstate perioral maintenance duration. (4) Do not claim product-specific evidence for this pair. |
| **evidence_level** | moderate (category-level; FDA indication for RHA Redensity: dynamic perioral rhytids) |
| **citations** | DOI 10.1097/DSS.0000000000000754 (category); FDA labels (Botox Cosmetic, RHA Redensity) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 5: Botox Cosmetic + SKINVIVE by Juvederm

**pair_key:** `botox_cosmetic__skinvive_by_juvederm`
**Tier:** common | **Evidence:** **weak** | **Same Session OK:** true
**Batch file:** `canonical_batch.md` — Pair 5
**FLAG: Weak evidence — expert consensus only; no published controlled trial for BoNT-A + microdroplet HA**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Glow |
| **one_line_positioning** | Botox reduces expression lines while SKINVIVE improves the overall cheek skin smoothness that neurotoxin cannot address. |
| **why_together** | Botox reduces movement-caused lines through muscle relaxation; SKINVIVE improves cheek skin smoothness through intradermal microdroplet HA hydration. They do not overlap in mechanism or target tissue. |
| **staff_close** | "Botox can help with the expression lines — frown lines, crow's feet, forehead. But some patients tell us even after Botox, their skin still doesn't look as vibrant as they'd like. SKINVIVE isn't a filler in the traditional sense — it doesn't add volume or fill wrinkles. It hydrates the skin from within using microdroplets, improving cheek skin smoothness." |
| **do_not_say (pair_specific)** | (1) Do not describe SKINVIVE as a filler that 'adds volume'. (2) Do not overstate the evidence — expert consensus only; no controlled trial. (3) Do not describe SKINVIVE's FDA indication beyond cheek skin smoothness. (4) Do not guarantee specific 'glow' outcomes. |
| **evidence_level** | weak |
| **citations** | FDA labels (Botox Cosmetic, SKINVIVE by Juvederm); accepted clinical practice |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 6: Botox Cosmetic + Sculptra Aesthetic

**pair_key:** `botox_cosmetic__sculptra_aesthetic`
**Tier:** common | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_neurotoxin_sculptra_batch.md` — Pair 1
**FLAG: Weak evidence; FDA Sculptra combination caveat; same-session conditional**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Rebuild |
| **one_line_positioning** | Botox relaxes expression lines immediately while Sculptra supports collagen production over months — addressing two different aspects of aging on different timelines. |
| **why_together** | Botox and Sculptra address two fundamentally different aspects of aging through orthogonal mechanisms. Botox delivers immediate, reversible neuromodulation; Sculptra delivers gradual, durable collagen stimulation. |
| **staff_close** | Frame as provider-recommended option, not standard protocol. "The lines around your eyes and forehead are from muscle movement — that's what Botox addresses. But the overall loss of fullness and structure is from collagen breakdown over time. Sculptra works gradually to support collagen production." |
| **do_not_say (pair_specific)** | (1) Do not say this combination is 'FDA approved' or 'clinically proven' as a combination — the FDA Sculptra label explicitly states combination use has not been evaluated. (2) Do not call Sculptra a 'filler' in the traditional sense. (3) Do not imply Sculptra provides the same type of immediate correction as HA fillers. (4) Do not suggest Sculptra is appropriate for patients unwilling to commit to a treatment series. |
| **evidence_level** | weak (expert consensus only; FDA Sculptra label: combination use not evaluated in controlled clinical trials) |
| **citations** | FDA labels (Botox Cosmetic, Sculptra Aesthetic); FDA Sculptra label combination caveat disclosed |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 7: Daxxify + Sculptra Aesthetic

**pair_key:** `daxxify__sculptra_aesthetic`
**Tier:** common | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_neurotoxin_sculptra_batch.md` — Pair 2
**FLAG: Weak evidence; FDA Sculptra combination caveat; Daxxify extended-duration differentiator**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Long-Lasting Smooth & Rebuild |
| **one_line_positioning** | Daxxify's ~6-month extended duration reduces annual visits while Sculptra builds collagen structure over months — two orthogonal mechanisms on compatible timelines. |
| **why_together** | Both Daxxify and Sculptra operate over months: Daxxify's peptide exchange technology for ~6-month neuromodulation, Sculptra's PLLA for gradual collagen stimulation. They address complementary aging concerns on aligned maintenance timelines. |
| **staff_close** | Highlight the scheduling advantage: Daxxify's ~6-month duration means fewer neurotoxin visits; Sculptra's series fits within those longer intervals. Frame as provider-recommended based on patient's long-term goals. |
| **do_not_say (pair_specific)** | (1) Do not claim Daxxify guarantees 6-month duration — clinical data shows ~6 months in trials, individual results vary. (2) Do not present this combination as 'FDA approved' as a combination. (3) Do not imply Sculptra is a one-visit treatment — the series requires 2-3 sessions. (4) Do not say Daxxify has been 'proven better' than other neurotoxins for this combination. |
| **evidence_level** | weak |
| **citations** | FDA labels (Daxxify, Sculptra Aesthetic); expert consensus |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 8: Dysport + Sculptra Aesthetic

**pair_key:** `dysport__sculptra_aesthetic`
**Tier:** common | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_neurotoxin_sculptra_batch.md` — Pair 3
**FLAG: Weak evidence; FDA Sculptra combination caveat**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Rebuild (Dysport) |
| **one_line_positioning** | Dysport relaxes expression lines through neuromodulation while Sculptra builds collagen structure over months — addressing movement-caused lines and structural aging separately. |
| **why_together** | Dysport and Sculptra target orthogonal mechanisms. Dysport (abobotulinumtoxinA) addresses dynamic lines; Sculptra (PLLA) addresses collagen-loss-related volume decline. |
| **staff_close** | Frame as a dual-timeline plan. "Dysport helps right away with the expression lines. Sculptra works over several months to build collagen support. They address different parts of the aging process." |
| **do_not_say (pair_specific)** | (1) Do not claim the combination is 'clinically proven' — FDA Sculptra caveat applies. (2) Do not describe Sculptra as a filler or imply immediate results. (3) Do not suggest the combination is a standard protocol — frame as provider-recommended. (4) Do not compare Dysport to other neurotoxins in this context. |
| **evidence_level** | weak |
| **citations** | FDA labels (Dysport, Sculptra Aesthetic); FDA Sculptra combination caveat |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 9: Jeuveau + Sculptra Aesthetic

**pair_key:** `jeuveau__sculptra_aesthetic`
**Tier:** common | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_neurotoxin_sculptra_batch.md` — Pair 4
**FLAG: Weak evidence; FDA Sculptra combination caveat; Jeuveau Hi-Pure technology differentiator**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Rebuild (Jeuveau) |
| **one_line_positioning** | Jeuveau reduces expression lines while Sculptra builds collagen structure — addressing dynamic wrinkles and structural aging through complementary mechanisms. |
| **why_together** | Jeuveau (prabotulinumtoxinA-xvfs, Hi-Pure technology) provides neuromodulation for dynamic lines; Sculptra provides PLLA collagen stimulation for structural aging. Different mechanisms, different targets, different timelines. |
| **staff_close** | "Jeuveau addresses the expression lines right away. Sculptra takes a different approach — it stimulates your own collagen production over time, which takes months to build but can last longer. They're addressing two different things." |
| **do_not_say (pair_specific)** | (1) Do not imply Jeuveau has the same evidence base as Botox Cosmetic — Jeuveau has more limited post-market combination data. (2) Do not present this as a proven combination — FDA Sculptra caveat applies. (3) Do not call Sculptra a traditional filler. (4) Do not oversell Jeuveau's Hi-Pure technology as a clinical differentiator for this combination. |
| **evidence_level** | weak |
| **citations** | FDA labels (Jeuveau, Sculptra Aesthetic); expert consensus |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 10: Xeomin + Sculptra Aesthetic

**pair_key:** `xeomin__sculptra_aesthetic`
**Tier:** common | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_neurotoxin_sculptra_batch.md` — Pair 5
**FLAG: Weak evidence; FDA Sculptra combination caveat; Xeomin accessory-protein immunogenicity language requires hedging**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Rebuild (Xeomin) |
| **one_line_positioning** | Xeomin's 'naked' incobotulinumtoxinA formulation reduces expression lines while Sculptra builds collagen structure — two orthogonal mechanisms on different timelines. |
| **why_together** | Xeomin (incobotulinumtoxinA, no accessory proteins) provides neuromodulation; Sculptra (PLLA) provides collagen stimulation. The accessory-protein-free formulation is a provider consideration for some patients, not a guaranteed advantage. |
| **staff_close** | "Xeomin addresses the expression lines. For some providers, Xeomin's formulation — it has no added proteins — is a consideration worth discussing. Sculptra works separately over months to support collagen production. They address different aspects of aging." |
| **do_not_say (pair_specific)** | (1) Do not say Xeomin is 'less likely' to cause antibody formation — accessory-protein-free is a consideration some providers weigh, not a guarantee against antibody formation. (2) Do not present the combination as 'FDA approved' or 'proven'. (3) Do not describe Sculptra as filling lines or providing immediate results. (4) Do not oversell Xeomin immunogenicity claims as clinical superiority. |
| **evidence_level** | weak |
| **citations** | FDA labels (Xeomin, Sculptra Aesthetic); expert consensus |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 11: Daxxify + SKINVIVE by Juvederm

**pair_key:** `daxxify__skinvive_by_juvederm`
**Tier:** common | **Evidence:** **weak** | **Same Session OK:** true
**Batch file:** `common_neurotoxin_skinvive_batch.md` — Pair 1
**FLAG: Weak evidence; scheduling alignment story (both ~6 months)**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Long-Lasting Smooth & Glow |
| **one_line_positioning** | Daxxify's ~6-month duration and SKINVIVE's ~6-month skin quality improvement align on a convenient shared maintenance schedule — addressing expression lines and skin smoothness in two visits per year. |
| **why_together** | Daxxify reduces expression lines with extended ~6-month duration; SKINVIVE improves cheek skin smoothness through intradermal microdroplet HA. Different mechanisms, different tissue targets. Both have ~6-month maintenance cycles — a practical scheduling alignment. |
| **staff_close** | "Both Daxxify and SKINVIVE last about six months, so you could potentially schedule maintenance for both on the same visit about twice a year." Plus clarify what SKINVIVE is: "It doesn't add volume the way cheek or lip fillers do." |
| **do_not_say (pair_specific)** | (1) Do not describe SKINVIVE as a traditional filler that adds volume. (2) Do not overstate Daxxify duration guarantee — "approximately 6 months" not guaranteed. (3) Do not claim this combination has specific published evidence — expert consensus only. (4) Do not suggest the cross-brand nature (Revance + Allergan) affects clinical compatibility. |
| **evidence_level** | weak |
| **citations** | FDA labels (Daxxify, SKINVIVE); accepted clinical practice |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 12: Dysport + SKINVIVE by Juvederm

**pair_key:** `dysport__skinvive_by_juvederm`
**Tier:** common | **Evidence:** **weak** | **Same Session OK:** true
**Batch file:** `common_neurotoxin_skinvive_batch.md` — Pair 2
**FLAG: Weak evidence; SKINVIVE-is-not-a-filler clarification required**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Glow (Dysport) |
| **one_line_positioning** | Dysport reduces expression lines while SKINVIVE improves cheek skin smoothness — different mechanisms addressing different aspects of appearance. |
| **why_together** | Dysport reduces dynamic expression lines through neuromodulation; SKINVIVE improves cheek skin smoothness through intradermal microdroplet HA hydration. No overlap in mechanism or tissue target. |
| **staff_close** | "Dysport can help with the expression lines. SKINVIVE is completely different from a traditional filler — it uses tiny microdroplets just under the skin to improve skin quality and cheek smoothness, not to add volume." |
| **do_not_say (pair_specific)** | (1) Do not describe SKINVIVE as a traditional volume filler. (2) Do not claim this combination has controlled trial evidence — expert consensus only. (3) Do not compare Dysport to other neurotoxins in this conversation. (4) Do not describe SKINVIVE's indication beyond cheek skin smoothness. |
| **evidence_level** | weak |
| **citations** | FDA labels (Dysport, SKINVIVE); accepted clinical practice |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 13: Jeuveau + SKINVIVE by Juvederm

**pair_key:** `jeuveau__skinvive_by_juvederm`
**Tier:** common | **Evidence:** **weak** | **Same Session OK:** true
**Batch file:** `common_neurotoxin_skinvive_batch.md` — Pair 3
**FLAG: Weak evidence; SKINVIVE-is-not-a-filler clarification required**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Glow (Jeuveau) |
| **one_line_positioning** | Jeuveau reduces expression lines while SKINVIVE improves cheek skin smoothness — two distinct mechanisms addressing different patient concerns. |
| **why_together** | Jeuveau addresses dynamic expression lines; SKINVIVE addresses cheek skin quality through intradermal microdroplet HA. Orthogonal mechanisms at different tissue levels. |
| **staff_close** | "Jeuveau helps with the expression lines. SKINVIVE is different — it's placed just under the skin's surface as tiny microdroplets to improve the quality and smoothness of the skin itself. Not a volume treatment." |
| **do_not_say (pair_specific)** | (1) Do not describe SKINVIVE as a traditional filler. (2) Do not imply Jeuveau has the same evidence base as longer-established neurotoxins for this context. (3) Do not overstate evidence — expert consensus only. (4) Do not describe SKINVIVE's FDA indication beyond cheek skin smoothness in adults over 21. |
| **evidence_level** | weak |
| **citations** | FDA labels (Jeuveau, SKINVIVE); accepted clinical practice |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 14: Xeomin + SKINVIVE by Juvederm

**pair_key:** `xeomin__skinvive_by_juvederm`
**Tier:** common | **Evidence:** **weak** | **Same Session OK:** true
**Batch file:** `common_neurotoxin_skinvive_batch.md` — Pair 4
**FLAG: Weak evidence; SKINVIVE-is-not-a-filler clarification required**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Glow (Xeomin) |
| **one_line_positioning** | Xeomin reduces expression lines while SKINVIVE improves cheek skin smoothness — orthogonal mechanisms with no tissue-level overlap. |
| **why_together** | Xeomin's accessory-protein-free formulation provides neuromodulation; SKINVIVE provides intradermal microdroplet HA skin quality improvement. Different targets, different timelines. |
| **staff_close** | "Xeomin addresses the expression lines. SKINVIVE works on the skin's surface quality — not volume, not lines specifically, but the overall smoothness and hydration of the cheek skin itself. Very different from a traditional filler." |
| **do_not_say (pair_specific)** | (1) Do not describe SKINVIVE as a volume filler. (2) Do not use Xeomin's accessory-protein-free status as a superiority claim. (3) Do not claim product-specific evidence for this pair. (4) Do not describe SKINVIVE beyond its FDA indication scope. |
| **evidence_level** | weak |
| **citations** | FDA labels (Xeomin, SKINVIVE); accepted clinical practice |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 15: Juvederm Vollure XC + Sculptra Aesthetic

**pair_key:** `juvederm_vollure_xc__sculptra_aesthetic`
**Tier:** conditional | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_ha_sculptra_batch.md` — Pair 1
**FLAG: Conditional tier; overlapping tissue territory; sequential staging preferred; FDA Sculptra caveat**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Restore & Rebuild (Vollure) |
| **one_line_positioning** | Vollure addresses the static mid-depth volume loss in nasolabial folds while Sculptra builds deeper collagen scaffolding — complementary corrections at different tissue depths. |
| **why_together** | Vollure (VYCROSS HA) provides immediate mid-depth volume correction; Sculptra (PLLA) stimulates gradual deep collagen scaffolding. Different mechanisms, different depths. Sequencing matters — Sculptra first or staged protocols recommended. |
| **staff_close** | Frame sequencing carefully: "These two products work at different depths. Sculptra builds structure over time; Vollure addresses more immediate volume. Your provider may recommend starting with Sculptra and adding Vollure as results develop, or spacing them out." |
| **do_not_say (pair_specific)** | (1) Do not suggest these are always same-session compatible — overlapping tissue territory; provider judgment required. (2) Do not claim Sculptra is a filler in the HA sense. (3) Do not claim FDA-proven combination use. (4) Do not imply Vollure can be added to fresh Sculptra at the same injection site. |
| **evidence_level** | weak |
| **citations** | FDA labels (Vollure XC, Sculptra Aesthetic); FDA Sculptra combination caveat; expert consensus |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 16: Juvederm Voluma XC + Sculptra Aesthetic

**pair_key:** `juvederm_voluma_xc__sculptra_aesthetic`
**Tier:** conditional | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_ha_sculptra_batch.md` — Pair 2
**FLAG: Conditional tier; deep cheek overlap; sequential staging preferred**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Lift & Rebuild |
| **one_line_positioning** | Voluma provides deep cheek structure immediately while Sculptra builds collagen scaffolding over months — complementary approaches to midface aging. |
| **why_together** | Voluma (deep supraperiosteal placement) provides immediate structural cheek volume; Sculptra builds long-term collagen support. Both affect the midface, but at different depths and through different mechanisms. Sequencing protocol is clinically important. |
| **staff_close** | "Voluma gives structural support to the cheeks right away. Sculptra takes a different approach — it stimulates collagen over months. Your provider may stage these: Sculptra first to build the foundation, then Voluma when the collagen scaffolding is underway." |
| **do_not_say (pair_specific)** | (1) Do not describe same-session use as standard — deep cheek overlap requires provider judgment. (2) Do not imply the two products are fully independent in the cheek area. (3) Do not present FDA-proven combination status. (4) Do not guarantee Sculptra collagen timeline. |
| **evidence_level** | weak |
| **citations** | FDA labels (Voluma XC, Sculptra Aesthetic); FDA Sculptra combination caveat; expert consensus |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 17: Restylane Lyft + Sculptra Aesthetic

**pair_key:** `restylane_lyft__sculptra_aesthetic`
**Tier:** conditional | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_ha_sculptra_batch.md` — Pair 3
**FLAG: Conditional tier; cross-brand (Galderma + Allergan); sequential staging preferred**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Restore & Rebuild (Restylane) |
| **one_line_positioning** | Restylane Lyft provides immediate midface or hand volume correction while Sculptra builds collagen structure — addressing immediate and long-term volume needs separately. |
| **why_together** | Restylane Lyft (NASHA HA, midface + hand) provides immediate volume; Sculptra (PLLA) provides gradual collagen biostimulation. Cross-brand (Galderma + Allergan) — clinically irrelevant to mechanism; no shared loyalty programs. |
| **staff_close** | "Restylane Lyft addresses volume right away. Sculptra is a longer-term approach — it works with your body to build collagen support over months. They solve the same broader problem from two different angles and timelines." |
| **do_not_say (pair_specific)** | (1) Do not claim FDA-proven combination status. (2) Do not imply the cross-brand nature creates a clinical concern — it doesn't. (3) Do not describe Sculptra as providing immediate correction. (4) Do not suggest same-session is always appropriate in the midface — tissue overlap requires provider judgment. |
| **evidence_level** | weak |
| **citations** | FDA labels (Restylane Lyft, Sculptra Aesthetic); FDA Sculptra combination caveat; expert consensus |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 18: RHA Redensity + Sculptra Aesthetic

**pair_key:** `rha_redensity__sculptra_aesthetic`
**Tier:** conditional | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_ha_sculptra_batch.md` — Pair 4
**FLAG: Conditional tier; perioral + biostimulator is an unusual anatomical pairing**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Soften & Rebuild (Perioral) |
| **one_line_positioning** | RHA Redensity addresses perioral fine lines while Sculptra builds deeper facial collagen structure — treating surface-level lines and underlying collagen loss through different mechanisms. |
| **why_together** | RHA Redensity (resilient HA for perioral zone) treats superficial perioral rhytids; Sculptra builds deeper collagen scaffolding for facial volume support. Different depths, different zones, different timelines. |
| **staff_close** | "RHA Redensity is designed specifically for the fine lines around your mouth. Sculptra works at a deeper level over months to build collagen support across the face. The perioral area and the structural collagen are two different things." |
| **do_not_say (pair_specific)** | (1) Do not imply Sculptra is appropriate for superficial perioral rhytids — it works at a deeper level. (2) Do not claim FDA-proven combination status. (3) Do not overstate RHA maintenance duration — perioral zone typically requires more frequent retreatment. (4) Do not suggest same-session is standard without provider assessment. |
| **evidence_level** | weak |
| **citations** | FDA labels (RHA Redensity, Sculptra Aesthetic); expert consensus |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 19: SKINVIVE by Juvederm + Sculptra Aesthetic

**pair_key:** `skinvive_by_juvederm__sculptra_aesthetic`
**Tier:** conditional | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_ha_sculptra_batch.md` — Pair 5
**FLAG: Conditional tier; both microdroplet HA and PLLA are intradermal/subdermal; no combination data exists**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Glow & Rebuild |
| **one_line_positioning** | SKINVIVE improves cheek skin quality while Sculptra builds deeper collagen structure — treating skin surface quality and structural collagen loss through distinct mechanisms. |
| **why_together** | SKINVIVE (intradermal microdroplet HA, skin quality) operates at the skin surface level; Sculptra (PLLA, subdermal) builds deeper collagen scaffolding. Different product categories, different depths, different outcomes. |
| **staff_close** | "SKINVIVE improves the skin's smoothness and quality from within the skin itself. Sculptra works deeper — it stimulates your own collagen production over months. They're doing very different things at different levels." |
| **do_not_say (pair_specific)** | (1) Do not describe SKINVIVE as a traditional filler. (2) Do not claim FDA-proven combination use — no combination data for SKINVIVE + Sculptra. (3) Do not suggest same-session as routine for this pairing — provider assessment of tissue response required. (4) Do not imply Sculptra and SKINVIVE address the same problem. |
| **evidence_level** | weak |
| **citations** | FDA labels (SKINVIVE, Sculptra Aesthetic); expert consensus |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 20: Daxxify + Juvederm Vollure XC

**pair_key:** `daxxify__juvederm_vollure_xc`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 1

| Field | Content |
|-------|---------|
| **patient_facing_name** | Long-Lasting Smooth & Restore |
| **one_line_positioning** | Daxxify's extended-duration neuromodulation reduces annual visit frequency while Vollure addresses the nasolabial fold volume loss that neurotoxin cannot correct. |
| **why_together** | Daxxify addresses movement-caused lines with ~6-month duration; Vollure restores mid-depth nasolabial fold volume that muscle relaxation cannot correct. Different tissue layers, different mechanisms. |
| **staff_close** | Highlight the scheduling advantage: Daxxify's extended duration reduces how often they need to come in for wrinkle-relaxer visits while Vollure addresses the separate volume concern. |
| **do_not_say (pair_specific)** | (1) Do not guarantee Daxxify's 6-month duration. (2) Do not imply the cross-brand pairing (Revance + Allergan) raises clinical concerns. (3) Do not claim product-specific evidence for this cross-brand pair — evidence is category-level. (4) Do not call this a 'liquid facelift'. |
| **evidence_level** | moderate (category-level: DOI 10.1097/DSS.0000000000000754) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 21: Daxxify + Juvederm Voluma XC

**pair_key:** `daxxify__juvederm_voluma_xc`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 2

| Field | Content |
|-------|---------|
| **patient_facing_name** | Long-Lasting Smooth & Lift |
| **one_line_positioning** | Daxxify's extended duration reduces neurotoxin visit frequency while Voluma restores deep cheek structure that neuromodulation cannot address. |
| **why_together** | Daxxify provides extended (~6-month) neuromodulation for dynamic lines; Voluma provides deep supraperiosteal cheek volume restoration. They operate at different tissue layers with different mechanisms. |
| **staff_close** | Extended-duration scheduling story combined with the cheek-structure explanation. Daxxify handles the expression lines with fewer visits; Voluma handles the structural midface aging separately. |
| **do_not_say (pair_specific)** | (1) Do not guarantee Daxxify duration. (2) Do not describe Voluma as 'lifting' in a surgical sense. (3) Do not claim product-specific evidence for this cross-brand pair. (4) Do not imply this is a marketed package. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 22: Daxxify + Restylane Lyft

**pair_key:** `daxxify__restylane_lyft`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 3

| Field | Content |
|-------|---------|
| **patient_facing_name** | Long-Lasting Smooth & Restore (Restylane) |
| **one_line_positioning** | Daxxify's extended neurotoxin duration reduces visit frequency while Restylane Lyft addresses midface or hand volume through a complementary mechanism. |
| **why_together** | Daxxify neuromodulation (extended duration) + Restylane Lyft structural volume (midface/hands). Cross-brand (Revance + Galderma). Clinically mechanism-based, not brand-based. |
| **staff_close** | Extended-duration scheduling advantage + volume complement. Lyft's unique hand indication may be relevant for some patients. |
| **do_not_say (pair_specific)** | (1) Do not guarantee Daxxify duration. (2) Do not imply cross-brand is a clinical issue. (3) Do not overpromise evidence strength — category-level only. (4) Do not suggest Lyft provides the same depth as deep-plane products. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 23: Daxxify + RHA Redensity

**pair_key:** `daxxify__rha_redensity`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 4

| Field | Content |
|-------|---------|
| **patient_facing_name** | Long-Lasting Smooth & Soften (Perioral) |
| **one_line_positioning** | Daxxify extends the interval between upper-face neurotoxin treatments while RHA Redensity addresses perioral fine lines in a complementary zone. |
| **why_together** | Daxxify (upper face, extended duration) + RHA Redensity (perioral zone, resilient HA designed for high-mobility areas). Zone-based complementarity. |
| **staff_close** | Extended duration + zone-based framing: "Daxxify handles the upper face with fewer visits per year; RHA Redensity specifically treats the fine lines around your mouth, which are in a completely different zone and require a different approach." |
| **do_not_say (pair_specific)** | (1) Do not guarantee Daxxify duration. (2) Do not suggest Botox around the perioral area. (3) Do not imply RHA adds volume to lips — perioral rhytids treatment only. (4) Do not overstate evidence — category-level only. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 24: Dysport + Juvederm Vollure XC

**pair_key:** `dysport__juvederm_vollure_xc`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 5

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Restore (Dysport) |
| **one_line_positioning** | Dysport relaxes expression lines while Vollure restores mid-depth nasolabial fold volume through a complementary mechanism. |
| **why_together** | Dysport (abobotulinumtoxinA, neuromodulation) + Vollure (VYCROSS HA, mid-depth NLF volume). Different mechanisms, different tissue layers, different aging concerns. Cross-brand (Galderma + Allergan). |
| **staff_close** | Zone-based framing: Dysport for expression lines, Vollure for the static nasolabial fold lines that remain at rest — volume correction that neurotoxin can't provide. |
| **do_not_say (pair_specific)** | (1) Do not state FDA-approved as a combination. (2) Do not call it a 'liquid facelift'. (3) Do not claim Dysport-specific evidence for this pairing. (4) Do not imply the cross-brand combination has a clinical disadvantage. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 25: Dysport + Juvederm Voluma XC

**pair_key:** `dysport__juvederm_voluma_xc`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 6

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Lift (Dysport) |
| **one_line_positioning** | Dysport relaxes expression lines while Voluma restores deep cheek structure — addressing dynamic wrinkles and structural midface aging through orthogonal mechanisms. |
| **why_together** | Dysport provides dynamic line reduction; Voluma provides deep cheek structural volume. Different mechanisms at different tissue depths. Cross-brand. |
| **staff_close** | Upper-face expression lines (Dysport) + midface structural volume (Voluma) framing. Clearly separate concerns addressed by separate mechanisms. |
| **do_not_say (pair_specific)** | Same category as #24: no combination FDA approval; no 'liquid facelift'; category-level evidence only. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 26: Dysport + Restylane Lyft

**pair_key:** `dysport__restylane_lyft`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 7

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Restore (Dysport + Restylane) |
| **one_line_positioning** | Dysport reduces expression lines while Restylane Lyft addresses midface or hand volume — two mechanisms targeting different aspects of aging. |
| **why_together** | Dysport neuromodulation + Restylane Lyft structural volume (midface + hands). Both Galderma products — shared ecosystem, possible loyalty program overlap. |
| **staff_close** | Galderma-family pairing: "Both Dysport and Restylane Lyft are from Galderma — if you're in their loyalty program, that's worth keeping in mind. More importantly, they work on completely different things..." |
| **do_not_say (pair_specific)** | (1) Do not overstate brand synergy as a clinical benefit — it's a loyalty program consideration, not clinical. (2) No FDA combination approval. (3) Category-level evidence only. (4) Do not claim Lyft provides deeper restoration than its indicated use. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 27: Dysport + RHA Redensity

**pair_key:** `dysport__rha_redensity`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 8

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Soften (Dysport + Perioral) |
| **one_line_positioning** | Dysport reduces upper-face expression lines while RHA Redensity addresses perioral fine lines in a complementary anatomical zone. |
| **why_together** | Dysport (upper face) + RHA Redensity (perioral, resilient HA for dynamic areas). Both Galderma products. Zone-based complementarity. |
| **staff_close** | Zone explanation: upper-face expression lines vs perioral fine lines that persist in a high-mobility area requiring flexible HA. |
| **do_not_say (pair_specific)** | (1) Do not suggest neurotoxin for the perioral zone. (2) Do not imply RHA adds volume to lips. (3) Category-level evidence only. (4) Do not claim RHA maintenance is the same interval as facial fillers in general. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 28: Jeuveau + Juvederm Vollure XC

**pair_key:** `jeuveau__juvederm_vollure_xc`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 9

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Restore (Jeuveau) |
| **one_line_positioning** | Jeuveau reduces expression lines while Vollure restores mid-depth nasolabial fold volume — complementary mechanisms for comprehensive facial rejuvenation. |
| **why_together** | Jeuveau (prabotulinumtoxinA-xvfs, Hi-Pure) provides neuromodulation; Vollure (VYCROSS) provides mid-depth NLF volume. Cross-brand (Evolus + Allergan). |
| **staff_close** | Standard zone-based framing. Note Jeuveau evidence limitation: "Jeuveau is a newer neurotoxin — it works the same way, though it has a shorter track record in combination use than older brands." |
| **do_not_say (pair_specific)** | (1) Do not imply Jeuveau has the same combination evidence base as Botox. (2) No FDA combination approval. (3) Category-level evidence extrapolated. (4) Cross-brand combination is clinically fine. |
| **evidence_level** | moderate (category-level; Jeuveau evidence limitation noted) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 29: Jeuveau + Juvederm Voluma XC

**pair_key:** `jeuveau__juvederm_voluma_xc`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 10

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Lift (Jeuveau) |
| **one_line_positioning** | Jeuveau reduces dynamic expression lines while Voluma restores deep cheek structure — addressing movement-caused lines and structural midface aging. |
| **why_together** | Jeuveau neuromodulation + Voluma deep cheek structural volume. Different tissue depths, different mechanisms. |
| **staff_close** | Jeuveau handles dynamic lines; Voluma addresses the deep structural cheek volume loss that's separate from muscle movement. |
| **do_not_say (pair_specific)** | (1) Do not present Jeuveau-specific evidence for this pairing. (2) Do not describe Voluma as a 'lift' in surgical terms. (3) Category-level evidence only. (4) No combination FDA approval. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 30: Jeuveau + Restylane Lyft

**pair_key:** `jeuveau__restylane_lyft`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 11

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Restore (Jeuveau + Restylane) |
| **one_line_positioning** | Jeuveau reduces expression lines while Restylane Lyft addresses midface or hand volume — two mechanisms at different tissue layers. |
| **why_together** | Jeuveau (Evolus) neuromodulation + Restylane Lyft (Galderma) structural volume. Cross-brand. Clinically mechanism-based. |
| **staff_close** | Zone explanation plus note: Lyft has a dual FDA indication (face and hands) that may be relevant if patients mention hand aging. |
| **do_not_say (pair_specific)** | (1) Do not imply Jeuveau has the same long-term data as established neurotoxins. (2) No FDA combination approval. (3) Category-level evidence only. (4) Cross-brand is clinically neutral. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 31: Jeuveau + RHA Redensity

**pair_key:** `jeuveau__rha_redensity`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 12

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Soften (Jeuveau + Perioral) |
| **one_line_positioning** | Jeuveau reduces upper-face expression lines while RHA Redensity softens perioral fine lines in a complementary zone. |
| **why_together** | Jeuveau (upper face) + RHA Redensity (perioral zone, resilient HA). Zone-based complementarity — different anatomical areas, different mechanisms. |
| **staff_close** | Zone framing: "Jeuveau for the upper face lines; RHA Redensity for the perioral area, which needs a flexible filler rather than a neurotoxin." |
| **do_not_say (pair_specific)** | (1) Do not suggest neurotoxin for perioral rhytids. (2) Do not imply RHA is a lip filler. (3) Acknowledge Jeuveau evidence limits. (4) Category-level evidence only. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 32: Xeomin + Juvederm Vollure XC

**pair_key:** `xeomin__juvederm_vollure_xc`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 13

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Restore (Xeomin) |
| **one_line_positioning** | Xeomin's accessory-protein-free formulation reduces expression lines while Vollure addresses mid-depth nasolabial fold volume through a complementary mechanism. |
| **why_together** | Xeomin (naked incobotulinumtoxinA) neuromodulation + Vollure (VYCROSS) mid-depth volume. Different mechanisms, different tissue layers. |
| **staff_close** | Zone framing with Xeomin differentiation note: "Xeomin works the same way as other neurotoxins — it relaxes the muscles causing expression lines. Some providers consider the accessory-protein-free formulation for certain patients. Vollure addresses a completely separate issue — the nasolabial fold volume." |
| **do_not_say (pair_specific)** | (1) Do not claim Xeomin has a proven immunogenicity advantage — it's a consideration, not a guarantee. (2) No FDA combination approval. (3) Category-level evidence only. (4) No 'liquid facelift' language. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 33: Xeomin + Juvederm Voluma XC

**pair_key:** `xeomin__juvederm_voluma_xc`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 14

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Lift (Xeomin) |
| **one_line_positioning** | Xeomin reduces expression lines while Voluma restores deep cheek structure — addressing dynamic wrinkles and midface structural aging separately. |
| **why_together** | Xeomin neuromodulation + Voluma deep supraperiosteal cheek volume. Different targets, different depths. |
| **staff_close** | Expression lines + deep cheek structure framing. Note that these address fundamentally different aging processes. |
| **do_not_say (pair_specific)** | (1) Do not overclaim Xeomin immunogenicity advantage. (2) Do not describe Voluma as surgical lift. (3) Category-level evidence only. (4) No combination FDA approval. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 34: Xeomin + Restylane Lyft

**pair_key:** `xeomin__restylane_lyft`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 15

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Restore (Xeomin + Restylane) |
| **one_line_positioning** | Xeomin reduces expression lines while Restylane Lyft restores midface or hand volume through a complementary mechanism. |
| **why_together** | Xeomin (Merz) neuromodulation + Restylane Lyft (Galderma) structural volume. Cross-brand. Mechanism-based complementarity. |
| **staff_close** | Xeomin for expression lines + Restylane Lyft for volume (face or hands). Note Lyft's dual indication if patient has hand concerns. |
| **do_not_say (pair_specific)** | (1) Xeomin immunogenicity should be hedged. (2) No FDA combination approval. (3) Category-level evidence. (4) Cross-brand is clinically neutral. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 35: Xeomin + RHA Redensity

**pair_key:** `xeomin__rha_redensity`
**Tier:** common | **Evidence:** moderate | **Same Session OK:** true
**Batch file:** `common_remaining_batch.md` — Pair 16

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Soften (Xeomin + Perioral) |
| **one_line_positioning** | Xeomin reduces upper-face expression lines while RHA Redensity addresses perioral fine lines — zone-based complementarity at different anatomical areas. |
| **why_together** | Xeomin (upper face) + RHA Redensity (perioral, resilient HA). Zone-based. Both from separate ecosystems; no clinical interaction. |
| **staff_close** | Zone explanation: upper-face neurotoxin + perioral flexible filler, acknowledging Xeomin's formulation difference for providers who weigh it. |
| **do_not_say (pair_specific)** | (1) Hedge Xeomin immunogenicity claims. (2) Do not suggest neurotoxin for perioral use. (3) Do not imply RHA is a lip filler. (4) Category-level evidence only. |
| **evidence_level** | moderate (category-level) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 36: Botox Cosmetic + InMode Morpheus8

**pair_key:** `botox_cosmetic__inmode_morpheus8`
**Tier:** common | **Evidence:** **strong** | **Same Session OK:** conditional
**Batch file:** `common_remaining_batch.md` — Pair 17
**FLAG: Strong evidence; same-session conditional (energy device protocol required)**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Smooth & Tighten |
| **one_line_positioning** | Botox relaxes expression-causing muscles while Morpheus8's RF microneedling stimulates dermal remodeling and skin tightening — addressing facial movement and tissue quality through complementary mechanisms. |
| **why_together** | Botox addresses dynamic muscle activity; Morpheus8 delivers radiofrequency energy to remodel dermal collagen and tighten tissue. Different mechanisms — neuromodulation vs RF energy delivery. Published evidence supports same-day RF + BoNT-A safety (DOI 10.1111/j.1524-4725.2005.31105). |
| **staff_close** | "Botox helps with the lines caused by muscle movement. Morpheus8 works differently — it uses radiofrequency energy to remodel and tighten the skin itself, addressing skin quality and laxity that neurotoxin can't improve. Some providers offer both in the same visit, though sequencing is important." |
| **do_not_say (pair_specific)** | (1) Do not claim same-session is always appropriate — energy device inflammation assessment required. (2) Do not say Morpheus8 is 'painless' — social downtime of several days should be disclosed. (3) Do not imply the combination replaces surgery. (4) Do not claim permanence for either treatment. |
| **evidence_level** | strong |
| **citations** | PubMed DOI 10.1111/j.1524-4725.2005.31105 (RF + BoNT-A same-day safety); FDA labels (Botox Cosmetic, InMode Morpheus8 510k clearance) |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

### Pair 37: Sculptra Aesthetic + InMode Morpheus8

**pair_key:** `sculptra_aesthetic__inmode_morpheus8`
**Tier:** conditional | **Evidence:** **weak** | **Same Session OK:** conditional
**Batch file:** `common_remaining_batch.md` — Pair 18
**FLAG: Conditional tier; weak evidence; FDA Sculptra caveat; same-session conditional**

| Field | Content |
|-------|---------|
| **patient_facing_name** | Rebuild & Tighten |
| **one_line_positioning** | Sculptra builds collagen structure over months while Morpheus8's RF energy remodels and tightens tissue — two collagen-stimulating mechanisms that work on different timelines and through different pathways. |
| **why_together** | Sculptra (PLLA biostimulation, gradual collagen production) + Morpheus8 (RF energy, immediate dermal remodeling). Both target collagen, but through completely different mechanisms, timelines, and tissue responses. |
| **staff_close** | "Both Sculptra and Morpheus8 work with your body's collagen, but very differently. Sculptra injects tiny particles that stimulate your immune system to build collagen over months. Morpheus8 uses radiofrequency energy to immediately start remodeling the skin from within. They're often staged — your provider would sequence them based on your individual goals." |
| **do_not_say (pair_specific)** | (1) Do not suggest same-session as standard — no controlled combination data; provider judgment required. (2) Do not claim FDA-proven combination. (3) Disclose Morpheus8 social downtime — not a 'quick procedure'. (4) Do not imply this replaces surgical lifting or facelift. |
| **evidence_level** | weak (expert consensus only; no published combination data for Sculptra + RF energy device) |
| **citations** | FDA labels (Sculptra Aesthetic, InMode Morpheus8 510k); FDA Sculptra combination caveat; expert consensus |

#### Review Decision
**Status:** PENDING
**Notes:** _(mark as APPROVED / NEEDS REVISION / REJECTED and add notes if applicable)_

---

## Overall Review Completion Tracker

**To complete review, mark all 37 pairs above with APPROVED / NEEDS REVISION / REJECTED.**

| Status | Count |
|--------|-------|
| APPROVED | 0 |
| NEEDS REVISION | 0 |
| REJECTED | 0 |
| PENDING | 37 |
| **Total** | **37** |

Once all 37 are marked, execute `supabase/compile_sql/12-03-combination-fuel-updates.sql` against Supabase project `aejskvmpembryunnbgrk`.
