# Phase 06: Taxonomy Additions

**Generated:** 2026-06-13
**Purpose:** Document taxonomy gaps and additions discovered during the 153-pair pairing evaluation

---

## Products Referenced but Not in Catalog

### PDO Threads — Phase 13 Candidate (Services Expansion)

**Status:** Not in the 18-product catalog. Referenced by multiple podcast experts as a high-value combination partner.

**Expert evidence from corpus:**
- PDO Threads + Sculptra: "Sculptra FIRST, then threads — threads grab the new collagen" (podcast episode 723a81ab)
- PDO Threads + HA Filler + Botox: Mentioned as part of comprehensive treatment plans
- PDO Threads + HA Filler: Same-session compatibility confirmed — different tissue planes (HA deep/bone, threads subcutaneous)

**Affected pairs in current evaluation:**
- Sculptra staff_talking_points reference PDO Threads as a complementary service: "When PDO threads are offered, consider Sculptra before threads to build collagen foundation."
- HA filler timing notes reference threading considerations

**Recommendation:** Add PDO Threads as a product in Phase 13 (services-expansion). When added, generate pairing evaluation for:
- PDO Threads + Sculptra (likely canonical based on corpus evidence)
- PDO Threads + each HA filler (likely common/conditional)
- PDO Threads + each neurotoxin (likely conditional)

### PRP (Platelet-Rich Plasma) — Phase 13 Candidate

**Status:** Referenced in corpus as D-20 candidate #4 ("PRP + RF Microneedling — I would encourage everyone to do PRP with any RF microneedling"). PRP is not a separate product in the current catalog.

**Classification question:** PRP is a technique/preparation (derived from patient's own blood), not a commercially branded product. Treatment options:
1. Add as a "technique/service" product type (not an injectable product)
2. Document in Morpheus8 timing_guidance as a complementary technique
3. Defer until Phase 13 defines service-level products

**Recommendation:** Option 3 — defer to Phase 13. Document PRP as a service-level product candidate. Current Morpheus8 pairing rows reference multi-modality stacking protocols where PRP could be layered.

### Radiesse (CaHA Biostimulator) — Known Gap

**Status:** Not in compile_manifest.json. Mentioned in some corpus discussions of biostimulators. Only Sculptra is in the current catalog as a biostimulator.

**Impact:** When Radiesse is added, it would generate 17 new pairs (18 existing products x 1 new). Expected: several common/conditional pairs with neurotoxins and fillers, plus an alternative relationship with Sculptra.

**Recommendation:** Add in a future manifest expansion phase.

---

## Products with Limited Pairing Evidence

### HydraFacial Syndeo

**Status:** In catalog but has no category_id. Batched as "Skin Care" for pairing evaluation.

**Findings:**
- Only 1 conditional pair elevated (Botox + HydraFacial) based on 45% injectable conversion data
- Morpheus8 + HydraFacial elevated to conditional based on skincare foundation approach
- All other HydraFacial pairs are compatible_only with LOW_CONFIDENCE flags

**Recommendation:** HydraFacial's strongest pairing intelligence is as a gateway/feeder treatment ("45% of HydraFacial patients go on to injectables"). This is more of a patient journey insight than a clinical combination insight. Consider documenting this in the stacking agent's patient progression logic rather than in item_relationships.

### Kybella

**Status:** In catalog. Declining product per corpus evidence.

**Findings:**
- Only 2 conditional pairs: CoolSculpting + Kybella (same-area different-mechanism), Ultherapy + Kybella (tighten + reduce for double chin)
- All other Kybella pairs are compatible_only
- Declining product flag noted in CoolSculpting + Kybella rationale

**Recommendation:** No immediate action. Monitor product status for potential deprecation flag.

---

## Concerns Referenced in Evaluation

All concerns referenced in the pairing evaluation exist in the concerns table (48 concerns, verified in DB_STATE_BASELINE.md). No new concerns needed.

Key concern mappings used in evaluation:
- **Volume Loss** → Cheek Volume Loss, Age-Related Volume Loss, Temple Hollowing, Hand Volume Loss, Lip Volume Loss
- **Dynamic Wrinkles** → Frown Lines, Crow's Feet, Forehead Lines
- **Skin Quality** → Skin Texture, Skin Hydration, Skin Quality Improvement, Skin Laxity, Skin Dullness
- **Submental** → Submental Fullness
- **Pigmentation** → Hyperpigmentation, Melasma, Uneven Skin Tone, Sun Damage

No gaps identified.

---

## Body Areas Referenced in Evaluation

All body areas referenced exist in the body_areas table (67 areas). No new body areas needed.

---

## Summary

| Item | Category | Status | Phase |
|------|----------|--------|:-----:|
| PDO Threads | Product (service) | Not in catalog | 13 |
| PRP | Technique/service | Not in catalog | 13 |
| Radiesse | Product (biostimulator) | Not in manifest | Future |
| HydraFacial category_id | Taxonomy gap | category_id = NULL | Existing |
| Kybella declining flag | Product status | Noted in evaluation | N/A |
| New concerns needed | Concerns | None | N/A |
| New body areas needed | Body areas | None | N/A |

---

*Generated: 2026-06-13*
*Source: PAIRING_EVALUATION.md, PHASE_6_ANSWERS_PODCAST_SOURCED.md*
