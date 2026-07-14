# Phase 06: Pairing Pre-Screen Matrix

**Generated:** 2026-06-13
**Products:** 18 (2 GLP-1 skipped)
**Total unique pairs:** 153 (C(18,2) = 153)
**Data sources:** compile_manifest.json, DOES_NOT_SOLVE_BACKFILL.md, STRUCTURED_COVERAGE.md, DB_STATE_BASELINE.md, 05-01-SUMMARY.md

---

## Pair Enumeration

**Total products:** 18
**Total unique pairs:** 153

### Product List (alphabetical with category and limitations)

| # | Product | ID | Category | Limitations |
|---|---------|----|---------:|:-----------:|
| 1 | Botox Cosmetic | 4b92be36 | Neurotoxins | 8 |
| 2 | CoolSculpting Elite | 694ea839 | Body Contouring | 6 |
| 3 | Daxxify | 007d98fd | Neurotoxins | 7 |
| 4 | Dysport | a7e1b29e | Neurotoxins | 7 |
| 5 | HydraFacial Syndeo | 28918bda | Skin Care (no category_id) | 8 |
| 6 | InMode Morpheus8 | 84ac561e | RF Microneedling | 6 |
| 7 | Jeuveau | 8adda68a | Neurotoxins | 7 |
| 8 | Juvederm Vollure XC | 7370545f | HA Fillers | 6 |
| 9 | Juvederm Voluma XC | 6c8f72f0 | HA Fillers | 7 |
| 10 | Kybella | 0f901fec | Injectable Fat Reduction | 6 |
| 11 | Lutronic Hollywood Spectra | be46f975 | Pigment/Skin Rejuvenation | 6 |
| 12 | Merz Ultherapy PRIME | da25d447 | Ultrasound Lifting | 6 |
| 13 | Restylane Lyft | f1732c7c | HA Fillers | 6 |
| 14 | RHA Redensity | d8a00419 | HA Fillers | 7 |
| 15 | Sculptra Aesthetic | 2ce7a3d2 | Biostimulators | 7 |
| 16 | SKINVIVE by Juvederm | b74d5475 | HA Fillers | 7 |
| 17 | Sofwave | 78973d13 | Skin Tightening | 6 |
| 18 | Xeomin | 92a05fe8 | Neurotoxins | 7 |

### Category Groups for Batching

| Group | Category | Products | Count |
|-------|----------|----------|:-----:|
| Neurotoxins | Neurotoxins (57b7c5a8) | Botox, Dysport, Jeuveau, Daxxify, Xeomin | 5 |
| HA Fillers | HA Fillers (138ed383 / 6e7e0d2b) | Voluma, Vollure, SKINVIVE, Restylane Lyft, RHA Redensity | 5 |
| Biostimulators | Biostimulators (a6a854e2) | Sculptra | 1 |
| Energy: RF | RF Microneedling (836bcdf0) | Morpheus8 | 1 |
| Energy: Tightening | Skin Tightening (4eb4c667) | Sofwave | 1 |
| Energy: Ultrasound | Ultrasound Lifting (1c9acf3e) | Ultherapy PRIME | 1 |
| Energy: Laser | Pigment/Skin Rejuvenation (b35c36c4) | Hollywood Spectra | 1 |
| Body Contouring | Body Contouring (d72803ce) | CoolSculpting Elite | 1 |
| Fat Reduction | Injectable Fat Reduction (b51855e7) | Kybella | 1 |
| Skin Care | No category_id | HydraFacial Syndeo | 1 |

**Energy super-group:** Morpheus8, Sofwave, Ultherapy PRIME, Hollywood Spectra (4 products)
**Body/Fat/Skincare super-group:** CoolSculpting Elite, Kybella, HydraFacial Syndeo (3 products)

### Item Concerns Coverage (for Gate 1 pre-screen)

Per-product item_concerns counts from live DB after Phase 5-01 execution (total: 139 rows):

| Product | item_concerns rows | Source |
|---------|:-:|--------|
| Botox Cosmetic | 10 | Phase 2 (02-01) |
| Dysport | 8 | Phase 2 (02-05, executed 05-01) |
| Juvederm Voluma XC | 8 | Phase 2 (02-03) |
| Restylane Lyft | 7 | Phase 2 (02-03) |
| Juvederm Vollure XC | 5 | Phase 2 (02-03) |
| SKINVIVE by Juvederm | 5 | Phase 2 (02-03) |
| Sculptra Aesthetic | 5 | Phase 2 (02-04) |
| RHA Redensity | 4 | Phase 2 (02-03) |
| Kybella | 1 | Phase 2 (02-04) |
| CoolSculpting Elite | ~5 | Phase 2 (02-04, executed 05-01) |
| InMode Morpheus8 | ~5 | Phase 2 (02-05, executed 05-01) |
| Sofwave | ~5 | Phase 2 (02-05, executed 05-01) |
| Merz Ultherapy PRIME | ~5 | Phase 2 (02-05, executed 05-01) |
| Lutronic Hollywood Spectra | ~5 | Phase 2 (02-05, executed 05-01) |
| HydraFacial Syndeo | ~3 | Phase 2 (02-05, executed 05-01) |
| Jeuveau | ~5 | Phase 2 (02-05, executed 05-01) |
| Daxxify | ~5 | Phase 2 (02-05, executed 05-01) |
| Xeomin | ~5 | Phase 2 (02-05, executed 05-01) |

> **Note:** Products marked with `~` had item_concerns SQL written in Phase 2 (02-04/02-05) and executed via 05-01-execute-phase2-outstanding.sql. Exact per-product counts were not individually documented in the 05-01 summary (total went from 98/124 to 139). Exact counts will be confirmed via live SQL in Plan 03 corpus query phase.

---

## Category-Pair Batches

Per D-11 evaluation sequence. Pair counts adjusted for 18 products (not 20).

### Batch 1: Neurotoxin x HA Filler (25 pairs) — Priority 1

Highest-value canonical candidates. Most common combination in aesthetics.

| # | Product A (Neurotoxin) | Product B (HA Filler) | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 1 | Botox Cosmetic | Juvederm Vollure XC | 8 | 6 |
| 2 | Botox Cosmetic | Juvederm Voluma XC | 8 | 7 |
| 3 | Botox Cosmetic | Restylane Lyft | 8 | 6 |
| 4 | Botox Cosmetic | RHA Redensity | 8 | 7 |
| 5 | Botox Cosmetic | SKINVIVE by Juvederm | 8 | 7 |
| 6 | Daxxify | Juvederm Vollure XC | 7 | 6 |
| 7 | Daxxify | Juvederm Voluma XC | 7 | 7 |
| 8 | Daxxify | Restylane Lyft | 7 | 6 |
| 9 | Daxxify | RHA Redensity | 7 | 7 |
| 10 | Daxxify | SKINVIVE by Juvederm | 7 | 7 |
| 11 | Dysport | Juvederm Vollure XC | 7 | 6 |
| 12 | Dysport | Juvederm Voluma XC | 7 | 7 |
| 13 | Dysport | Restylane Lyft | 7 | 6 |
| 14 | Dysport | RHA Redensity | 7 | 7 |
| 15 | Dysport | SKINVIVE by Juvederm | 7 | 7 |
| 16 | Jeuveau | Juvederm Vollure XC | 7 | 6 |
| 17 | Jeuveau | Juvederm Voluma XC | 7 | 7 |
| 18 | Jeuveau | Restylane Lyft | 7 | 6 |
| 19 | Jeuveau | RHA Redensity | 7 | 7 |
| 20 | Jeuveau | SKINVIVE by Juvederm | 7 | 7 |
| 21 | Xeomin | Juvederm Vollure XC | 7 | 6 |
| 22 | Xeomin | Juvederm Voluma XC | 7 | 7 |
| 23 | Xeomin | Restylane Lyft | 7 | 6 |
| 24 | Xeomin | RHA Redensity | 7 | 7 |
| 25 | Xeomin | SKINVIVE by Juvederm | 7 | 7 |

**Batch hypothesis:** All 25 are strong canonical/common candidates. Neurotoxin addresses dynamic wrinkles (muscle movement); HA filler addresses volume loss, static lines. Different mechanisms, different tissue layers.

---

### Batch 2: Neurotoxin x Biostimulator (5 pairs) — Priority 2

Strong podcast evidence for toxin + Sculptra sequencing.

| # | Product A (Neurotoxin) | Product B (Biostimulator) | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 26 | Botox Cosmetic | Sculptra Aesthetic | 8 | 7 |
| 27 | Daxxify | Sculptra Aesthetic | 7 | 7 |
| 28 | Dysport | Sculptra Aesthetic | 7 | 7 |
| 29 | Jeuveau | Sculptra Aesthetic | 7 | 7 |
| 30 | Xeomin | Sculptra Aesthetic | 7 | 7 |

**Batch hypothesis:** Canonical/common candidates. Neurotoxin relaxes muscles; Sculptra stimulates collagen for long-term volume restoration. Complementary mechanisms on different timelines.

---

### Batch 3: Neurotoxin x Energy Device (20 pairs) — Priority 3

Multi-modality stacking protocols (Tracy Mancuso framework).

| # | Product A (Neurotoxin) | Product B (Energy) | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 31 | Botox Cosmetic | InMode Morpheus8 | 8 | 6 |
| 32 | Botox Cosmetic | Sofwave | 8 | 6 |
| 33 | Botox Cosmetic | Merz Ultherapy PRIME | 8 | 6 |
| 34 | Botox Cosmetic | Lutronic Hollywood Spectra | 8 | 6 |
| 35 | Daxxify | InMode Morpheus8 | 7 | 6 |
| 36 | Daxxify | Sofwave | 7 | 6 |
| 37 | Daxxify | Merz Ultherapy PRIME | 7 | 6 |
| 38 | Daxxify | Lutronic Hollywood Spectra | 7 | 6 |
| 39 | Dysport | InMode Morpheus8 | 7 | 6 |
| 40 | Dysport | Sofwave | 7 | 6 |
| 41 | Dysport | Merz Ultherapy PRIME | 7 | 6 |
| 42 | Dysport | Lutronic Hollywood Spectra | 7 | 6 |
| 43 | Jeuveau | InMode Morpheus8 | 7 | 6 |
| 44 | Jeuveau | Sofwave | 7 | 6 |
| 45 | Jeuveau | Merz Ultherapy PRIME | 7 | 6 |
| 46 | Jeuveau | Lutronic Hollywood Spectra | 7 | 6 |
| 47 | Xeomin | InMode Morpheus8 | 7 | 6 |
| 48 | Xeomin | Sofwave | 7 | 6 |
| 49 | Xeomin | Merz Ultherapy PRIME | 7 | 6 |
| 50 | Xeomin | Lutronic Hollywood Spectra | 7 | 6 |

**Batch hypothesis:** Common/conditional candidates. Neurotoxin controls movement; energy devices address skin texture, laxity, collagen. Multi-modality stacking is well-documented in podcast corpus.

---

### Batch 4: HA Filler x Biostimulator (5 pairs) — Priority 4

"Foundation + structure" protocol. Sculptra + HA is well-documented.

| # | Product A (HA Filler) | Product B (Biostimulator) | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 51 | Juvederm Vollure XC | Sculptra Aesthetic | 6 | 7 |
| 52 | Juvederm Voluma XC | Sculptra Aesthetic | 7 | 7 |
| 53 | Restylane Lyft | Sculptra Aesthetic | 6 | 7 |
| 54 | RHA Redensity | Sculptra Aesthetic | 7 | 7 |
| 55 | SKINVIVE by Juvederm | Sculptra Aesthetic | 7 | 7 |

**Batch hypothesis:** Strong canonical/common candidates. Sculptra provides collagen foundation (gradual, lasting); HA filler provides immediate structural contour. "Sculpt & Lift" protocol well-documented.

---

### Batch 5: HA Filler x Energy Device (20 pairs) — Priority 5

Filler + laser/RF combinations for comprehensive rejuvenation.

| # | Product A (HA Filler) | Product B (Energy) | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 56 | Juvederm Vollure XC | InMode Morpheus8 | 6 | 6 |
| 57 | Juvederm Vollure XC | Sofwave | 6 | 6 |
| 58 | Juvederm Vollure XC | Merz Ultherapy PRIME | 6 | 6 |
| 59 | Juvederm Vollure XC | Lutronic Hollywood Spectra | 6 | 6 |
| 60 | Juvederm Voluma XC | InMode Morpheus8 | 7 | 6 |
| 61 | Juvederm Voluma XC | Sofwave | 7 | 6 |
| 62 | Juvederm Voluma XC | Merz Ultherapy PRIME | 7 | 6 |
| 63 | Juvederm Voluma XC | Lutronic Hollywood Spectra | 7 | 6 |
| 64 | Restylane Lyft | InMode Morpheus8 | 6 | 6 |
| 65 | Restylane Lyft | Sofwave | 6 | 6 |
| 66 | Restylane Lyft | Merz Ultherapy PRIME | 6 | 6 |
| 67 | Restylane Lyft | Lutronic Hollywood Spectra | 6 | 6 |
| 68 | RHA Redensity | InMode Morpheus8 | 7 | 6 |
| 69 | RHA Redensity | Sofwave | 7 | 6 |
| 70 | RHA Redensity | Merz Ultherapy PRIME | 7 | 6 |
| 71 | RHA Redensity | Lutronic Hollywood Spectra | 7 | 6 |
| 72 | SKINVIVE by Juvederm | InMode Morpheus8 | 7 | 6 |
| 73 | SKINVIVE by Juvederm | Sofwave | 7 | 6 |
| 74 | SKINVIVE by Juvederm | Merz Ultherapy PRIME | 7 | 6 |
| 75 | SKINVIVE by Juvederm | Lutronic Hollywood Spectra | 7 | 6 |

**Batch hypothesis:** Common/conditional candidates. Filler addresses volume; energy devices address skin quality/laxity. Timing and sequencing are critical (energy first, then filler generally).

---

### Batch 6: Biostimulator x Energy Device (4 pairs) — Priority 6

Collagen stimulation synergy. Strong for Sculptra + RF.

| # | Product A (Biostimulator) | Product B (Energy) | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 76 | Sculptra Aesthetic | InMode Morpheus8 | 7 | 6 |
| 77 | Sculptra Aesthetic | Sofwave | 7 | 6 |
| 78 | Sculptra Aesthetic | Merz Ultherapy PRIME | 7 | 6 |
| 79 | Sculptra Aesthetic | Lutronic Hollywood Spectra | 7 | 6 |

**Batch hypothesis:** Sculptra + Morpheus8 is a strong canonical/common candidate (collagen + texture/tightening). Others conditional depending on evidence.

---

### Batch 7: Neurotoxin x Body/Fat/Skincare (15 pairs) — Priority 7

Lower priority but some valid combinations.

| # | Product A (Neurotoxin) | Product B (Body/Fat/Skincare) | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 80 | Botox Cosmetic | CoolSculpting Elite | 8 | 6 |
| 81 | Botox Cosmetic | Kybella | 8 | 6 |
| 82 | Botox Cosmetic | HydraFacial Syndeo | 8 | 8 |
| 83 | Daxxify | CoolSculpting Elite | 7 | 6 |
| 84 | Daxxify | Kybella | 7 | 6 |
| 85 | Daxxify | HydraFacial Syndeo | 7 | 8 |
| 86 | Dysport | CoolSculpting Elite | 7 | 6 |
| 87 | Dysport | Kybella | 7 | 6 |
| 88 | Dysport | HydraFacial Syndeo | 7 | 8 |
| 89 | Jeuveau | CoolSculpting Elite | 7 | 6 |
| 90 | Jeuveau | Kybella | 7 | 6 |
| 91 | Jeuveau | HydraFacial Syndeo | 7 | 8 |
| 92 | Xeomin | CoolSculpting Elite | 7 | 6 |
| 93 | Xeomin | Kybella | 7 | 6 |
| 94 | Xeomin | HydraFacial Syndeo | 7 | 8 |

**Batch hypothesis:** Neurotoxin + HydraFacial pairs may be conditional/compatible_only (skincare prep + injectable). Neurotoxin + CoolSculpting/Kybella target different body areas entirely — likely compatible_only.

---

### Batch 8: HA Filler x Body/Fat/Skincare (15 pairs) — Priority 8

Limited concern overlap (different treatment areas). Mostly compatible_only.

| # | Product A (HA Filler) | Product B (Body/Fat/Skincare) | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 95 | Juvederm Vollure XC | CoolSculpting Elite | 6 | 6 |
| 96 | Juvederm Vollure XC | Kybella | 6 | 6 |
| 97 | Juvederm Vollure XC | HydraFacial Syndeo | 6 | 8 |
| 98 | Juvederm Voluma XC | CoolSculpting Elite | 7 | 6 |
| 99 | Juvederm Voluma XC | Kybella | 7 | 6 |
| 100 | Juvederm Voluma XC | HydraFacial Syndeo | 7 | 8 |
| 101 | Restylane Lyft | CoolSculpting Elite | 6 | 6 |
| 102 | Restylane Lyft | Kybella | 6 | 6 |
| 103 | Restylane Lyft | HydraFacial Syndeo | 6 | 8 |
| 104 | RHA Redensity | CoolSculpting Elite | 7 | 6 |
| 105 | RHA Redensity | Kybella | 7 | 6 |
| 106 | RHA Redensity | HydraFacial Syndeo | 7 | 8 |
| 107 | SKINVIVE by Juvederm | CoolSculpting Elite | 7 | 6 |
| 108 | SKINVIVE by Juvederm | Kybella | 7 | 6 |
| 109 | SKINVIVE by Juvederm | HydraFacial Syndeo | 7 | 8 |

**Batch hypothesis:** Filler + CoolSculpting/Kybella = compatible_only (different body areas, no clinical synergy). Filler + HydraFacial may be conditional (skin prep before filler).

---

### Batch 9: Energy x Energy — cross-device (6 pairs) — Priority 9

Temperature layering protocols between different energy modalities.

| # | Product A (Energy) | Product B (Energy) | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 110 | InMode Morpheus8 | Sofwave | 6 | 6 |
| 111 | InMode Morpheus8 | Merz Ultherapy PRIME | 6 | 6 |
| 112 | InMode Morpheus8 | Lutronic Hollywood Spectra | 6 | 6 |
| 113 | Sofwave | Merz Ultherapy PRIME | 6 | 6 |
| 114 | Sofwave | Lutronic Hollywood Spectra | 6 | 6 |
| 115 | Merz Ultherapy PRIME | Lutronic Hollywood Spectra | 6 | 6 |

**Batch hypothesis:** Morpheus8 + Hollywood Spectra could be conditional (RF texture + pigment). Sofwave + Ultherapy target different depths (mid-dermis vs SMAS) but similar mechanism — likely do_not_market/compatible_only. Multi-energy layering per Tracy Mancuso framework.

---

### Batch 10: Energy x Body/Fat/Skincare (12 pairs) — Priority 10

Mixed relevance.

| # | Product A (Energy) | Product B (Body/Fat/Skincare) | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 116 | InMode Morpheus8 | CoolSculpting Elite | 6 | 6 |
| 117 | InMode Morpheus8 | Kybella | 6 | 6 |
| 118 | InMode Morpheus8 | HydraFacial Syndeo | 6 | 8 |
| 119 | Sofwave | CoolSculpting Elite | 6 | 6 |
| 120 | Sofwave | Kybella | 6 | 6 |
| 121 | Sofwave | HydraFacial Syndeo | 6 | 8 |
| 122 | Merz Ultherapy PRIME | CoolSculpting Elite | 6 | 6 |
| 123 | Merz Ultherapy PRIME | Kybella | 6 | 6 |
| 124 | Merz Ultherapy PRIME | HydraFacial Syndeo | 6 | 8 |
| 125 | Lutronic Hollywood Spectra | CoolSculpting Elite | 6 | 6 |
| 126 | Lutronic Hollywood Spectra | Kybella | 6 | 6 |
| 127 | Lutronic Hollywood Spectra | HydraFacial Syndeo | 6 | 8 |

**Batch hypothesis:** Energy + CoolSculpting/Kybella = compatible_only (different areas). Energy + HydraFacial may be conditional (skincare foundation before energy devices).

---

### Batch 11: Body/Fat/Skincare x Body/Fat/Skincare (3 pairs) — Priority 11

| # | Product A | Product B | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 128 | CoolSculpting Elite | Kybella | 6 | 6 |
| 129 | CoolSculpting Elite | HydraFacial Syndeo | 6 | 8 |
| 130 | Kybella | HydraFacial Syndeo | 6 | 8 |

**Batch hypothesis:** CoolSculpting + Kybella addresses same concern (submental fat) via different mechanisms — conditional or compatible_only depending on evidence. Others compatible_only.

---

### Batch 12: Same-category — Neurotoxin x Neurotoxin (10 pairs) — Priority 12

All alternatives. Emit as alternative + do_not_market per D-02.

| # | Product A | Product B | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 131 | Botox Cosmetic | Daxxify | 8 | 7 |
| 132 | Botox Cosmetic | Dysport | 8 | 7 |
| 133 | Botox Cosmetic | Jeuveau | 8 | 7 |
| 134 | Botox Cosmetic | Xeomin | 8 | 7 |
| 135 | Daxxify | Dysport | 7 | 7 |
| 136 | Daxxify | Jeuveau | 7 | 7 |
| 137 | Daxxify | Xeomin | 7 | 7 |
| 138 | Dysport | Jeuveau | 7 | 7 |
| 139 | Dysport | Xeomin | 7 | 7 |
| 140 | Jeuveau | Xeomin | 7 | 7 |

**Batch outcome:** All 10 = alternative + do_not_market. Same BoNT-A mechanism, same target (dynamic wrinkles). Not combinations — substitution intelligence.

---

### Batch 13: Same-category — HA Filler x HA Filler (10 pairs) — Priority 13

Mostly alternatives. Some layering combinations may be conditional.

| # | Product A | Product B | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 141 | Juvederm Vollure XC | Juvederm Voluma XC | 6 | 7 |
| 142 | Juvederm Vollure XC | Restylane Lyft | 6 | 6 |
| 143 | Juvederm Vollure XC | RHA Redensity | 6 | 7 |
| 144 | Juvederm Vollure XC | SKINVIVE by Juvederm | 6 | 7 |
| 145 | Juvederm Voluma XC | Restylane Lyft | 7 | 6 |
| 146 | Juvederm Voluma XC | RHA Redensity | 7 | 7 |
| 147 | Juvederm Voluma XC | SKINVIVE by Juvederm | 7 | 7 |
| 148 | Restylane Lyft | RHA Redensity | 6 | 7 |
| 149 | Restylane Lyft | SKINVIVE by Juvederm | 6 | 7 |
| 150 | RHA Redensity | SKINVIVE by Juvederm | 7 | 7 |

**Batch hypothesis:** Most are alternatives (same mechanism — HA gel). Key exceptions:
- Voluma (deep volume, cheeks) + Vollure (mid-depth, NLF) or + RHA Redensity (superficial, perioral): could be **conditional** layering at different tissue depths
- Voluma/Vollure/Lyft + SKINVIVE: could be **conditional** (volumizer + skin quality microdroplet — different purposes)
- Same-area fillers (Voluma vs Restylane Lyft for cheeks): **do_not_market** alternatives

---

### Batch 14: Biostimulator x Body/Fat (2 pairs) — Priority 14

| # | Product A | Product B | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 151 | Sculptra Aesthetic | CoolSculpting Elite | 7 | 6 |
| 152 | Sculptra Aesthetic | Kybella | 7 | 6 |

**Batch hypothesis:** Likely compatible_only. Sculptra (collagen stimulation, face/body) and CoolSculpting/Kybella (fat reduction) address different concerns with no obvious synergy.

---

### Batch 15: Biostimulator x Skincare (1 pair) — Priority 15

| # | Product A | Product B | A Lim | B Lim |
|---|---|---|:---:|:---:|
| 153 | Sculptra Aesthetic | HydraFacial Syndeo | 7 | 8 |

**Batch hypothesis:** Likely compatible_only or conditional. HydraFacial as skin prep before/between Sculptra sessions.

---

### Batch Count Verification

| Batch | Expected | Actual | Match |
|-------|:--------:|:------:|:-----:|
| 1. Neurotoxin x HA Filler | 25 | 25 | YES |
| 2. Neurotoxin x Biostimulator | 5 | 5 | YES |
| 3. Neurotoxin x Energy | 20 | 20 | YES |
| 4. HA Filler x Biostimulator | 5 | 5 | YES |
| 5. HA Filler x Energy | 20 | 20 | YES |
| 6. Biostimulator x Energy | 4 | 4 | YES |
| 7. Neurotoxin x Body/Fat/Skincare | 15 | 15 | YES |
| 8. HA Filler x Body/Fat/Skincare | 15 | 15 | YES |
| 9. Energy x Energy (cross-device) | 6 | 6 | YES |
| 10. Energy x Body/Fat/Skincare | 12 | 12 | YES |
| 11. Body/Fat/Skincare x Body/Fat/Skincare | 3 | 3 | YES |
| 12. Neurotoxin x Neurotoxin (same-cat) | 10 | 10 | YES |
| 13. HA Filler x HA Filler (same-cat) | 10 | 10 | YES |
| 14. Biostimulator x Body/Fat | 2 | 2 | YES |
| 15. Biostimulator x Skincare | 1 | 1 | YES |
| **TOTAL** | **153** | **153** | **YES** |

---

## Pre-Screen Results

### Gate 1 Pre-Screen: Concern Overlap Signals

**Method:** Concern overlap requires live SQL JOIN on item_concerns. The SQL query to compute this for all 153 pairs in one batch:

```sql
SELECT
  ic_a.offering_id AS item_a_id,
  ic_b.offering_id AS item_b_id,
  COUNT(*) AS shared_concerns,
  array_agg(DISTINCT c.name) AS shared_concern_names
FROM item_concerns ic_a
JOIN item_concerns ic_b ON ic_b.concern_id = ic_a.concern_id
  AND ic_a.offering_id < ic_b.offering_id
JOIN concerns c ON c.id = ic_a.concern_id
WHERE ic_a.offering_id IN (
  '4b92be36-e84e-432c-8549-f5d85a767fdb',
  '6c8f72f0-887f-484a-a588-0bb9bd8052c9',
  '7370545f-97a3-4519-a92d-3ac4f969829d',
  'b74d5475-bf58-4d7d-87f5-2c8dc9e252de',
  'f1732c7c-3f19-4f3d-9aff-543a132e5506',
  'd8a00419-39e1-4d4b-8dab-ad134fb00930',
  '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa',
  '0f901fec-5de5-4950-815e-82c3e47cb2ec',
  '694ea839-cf8f-4a17-b838-2588674c792f',
  '84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
  '78973d13-fa36-41dd-8625-4b851ff143ed',
  'da25d447-c316-40b2-802e-e190c0bdbd9f',
  'be46f975-99d7-4772-867e-744814626654',
  '28918bda-787b-412a-9802-d3d9a00e6ab1',
  'a7e1b29e-da10-40de-bea8-70d6e6624f43',
  '8adda68a-9fd2-49ad-8852-641970135131',
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'
)
AND ic_b.offering_id IN (
  '4b92be36-e84e-432c-8549-f5d85a767fdb',
  '6c8f72f0-887f-484a-a588-0bb9bd8052c9',
  '7370545f-97a3-4519-a92d-3ac4f969829d',
  'b74d5475-bf58-4d7d-87f5-2c8dc9e252de',
  'f1732c7c-3f19-4f3d-9aff-543a132e5506',
  'd8a00419-39e1-4d4b-8dab-ad134fb00930',
  '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa',
  '0f901fec-5de5-4950-815e-82c3e47cb2ec',
  '694ea839-cf8f-4a17-b838-2588674c792f',
  '84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
  '78973d13-fa36-41dd-8625-4b851ff143ed',
  'da25d447-c316-40b2-802e-e190c0bdbd9f',
  'be46f975-99d7-4772-867e-744814626654',
  '28918bda-787b-412a-9802-d3d9a00e6ab1',
  'a7e1b29e-da10-40de-bea8-70d6e6624f43',
  '8adda68a-9fd2-49ad-8852-641970135131',
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa'
)
GROUP BY ic_a.offering_id, ic_b.offering_id
ORDER BY shared_concerns DESC;
```

**Status:** SQL prepared for Plan 03 execution. Live concern overlap data will be retrieved at corpus query start.

### Gate 1 Pre-Screen: Expected Overlap Patterns (from documented concern data)

Based on documented item_concerns from Phase 2/5:

**High overlap expected (same concern areas):**
- Same-category pairs (Neurotoxin x Neurotoxin, HA Filler x HA Filler) — highest overlap since they treat same concerns
- Neurotoxin x HA Filler — moderate overlap (both address facial aging concerns: Fine Lines, Facial Volume Loss, Skin Aging)
- Neurotoxin x Biostimulator — moderate overlap (both address aging-related concerns)

**Low/zero overlap expected:**
- Neurotoxin x CoolSculpting — different treatment areas entirely (face vs body)
- HA Filler x CoolSculpting — different treatment areas (face vs body)
- CoolSculpting x Kybella — potential overlap on Submental Fullness

**Known concern distributions (from Phase 2 verification):**
- Botox: 10 concerns (broadest — Crow's Feet, Forehead Lines, Frown Lines, Hyperhidrosis, Platysmal Bands, etc.)
- Dysport: 8 concerns (similar to Botox, slightly narrower)
- Voluma: 8 concerns (Cheek Volume Loss, Chin Projection, Age-Related Volume Loss, etc.)
- Restylane Lyft: 7 concerns (similar to Voluma + Hand Aging)
- Kybella: 1 concern (Submental Fullness only)

### Gate 3 Pre-Screen: Limitation Coverage Signals

All 18 products have does_not_solve populated (6-8 entries each, verified in 06-01). The does_not_solve arrays for all products are documented in DOES_NOT_SOLVE_BACKFILL.md.

**Expected high limitation-coverage pairs:**
- Neurotoxin + HA Filler: Neurotoxin does_not_solve includes "Cannot restore lost volume" — HA Filler directly addresses this
- Neurotoxin + Biostimulator: Neurotoxin does_not_solve includes "Cannot reverse skin laxity/collagen loss" — Sculptra addresses this
- HA Filler + Energy: Filler does_not_solve includes "Cannot tighten skin" — energy devices address this
- HA Filler + Biostimulator: Filler does_not_solve includes "Cannot stimulate long-term collagen production" — Sculptra addresses this

**Expected low limitation-coverage pairs:**
- Same-category pairs (same limitations, same capabilities = no complementarity)
- Unrelated-area pairs (face toxin + body contouring — limitations don't cross-reference)

**Exact does_not_solve cross-referencing** will be performed via LLM semantic matching in Plan 03, using the structured does_not_solve arrays as context input to the gate evaluation prompt.

---

## High Signal Pairs

Pairs predicted to have high concern overlap AND both products have does_not_solve populated. These are strong candidates for canonical/common tier.

**Criteria:** Cross-category pairs where:
1. Both products have 4+ item_concerns (sufficient data for overlap check)
2. Both products have 6+ does_not_solve entries (confirmed for all 18)
3. Different mechanism of action (complementary per Gate 2)

| Pair # | Product A | Product B | Signal Strength | Hypothesis |
|:------:|-----------|-----------|:---------------:|-----------|
| 1-5 | Botox Cosmetic | Any HA Filler | HIGH | Volume loss is a known Botox limitation; HA directly fills |
| 26 | Botox Cosmetic | Sculptra Aesthetic | HIGH | Collagen loss is a known Botox limitation; Sculptra stimulates |
| 52 | Juvederm Voluma XC | Sculptra Aesthetic | HIGH | Foundation + structure protocol well-documented |
| 76 | Sculptra Aesthetic | InMode Morpheus8 | HIGH | Collagen + texture synergy; podcast-confirmed |
| 31 | Botox Cosmetic | InMode Morpheus8 | MEDIUM | Multi-modality stacking; Tracy Mancuso framework |
| 60 | Juvederm Voluma XC | InMode Morpheus8 | MEDIUM | Volume + texture combination |
| 128 | CoolSculpting Elite | Kybella | MEDIUM | Both address submental fat; different mechanisms (cryo vs acid) |
| 141 | Juvederm Vollure XC | Juvederm Voluma XC | MEDIUM | Different depth layering (mid-depth vs deep) |

---

## Zero Overlap Pairs

Pairs predicted to have zero concern overlap at the SQL level. These pairs may still have valid pairings via semantic overlap (LLM evaluation in Plan 03).

**Expected zero-overlap categories:**
- Neurotoxin x CoolSculpting (face muscles vs body fat — no shared concerns)
- Neurotoxin x Kybella (face muscles vs submental fat — minimal overlap unless Botox masseter is considered)
- HA Filler (face) x CoolSculpting (body) — different treatment areas
- HydraFacial x body contouring products — different treatment areas

**Estimated zero-overlap pair count:** ~30-40 pairs (primarily cross-area combinations)

> **Note:** Zero SQL overlap does not mean the pair is invalid. Per PAIRING_RUBRIC.md Gate 1 definition: "Some valid pairs have no formal concern overlap (e.g., body contouring + neurotoxin for different body areas in the same treatment plan). Failure here means the pair needs stronger justification from other gates."

---

## Data Gaps

### Products with exact item_concerns count unconfirmed

The following products had item_concerns SQL written in Phase 2 (plans 02-04/02-05) and executed via 05-01-execute-phase2-outstanding.sql. The total count is verified (139 rows), but exact per-product breakdown for these products was not individually logged in the 05-01 execution summary:

| Product | SQL Source | Expected Concerns |
|---------|-----------|:-:|
| CoolSculpting Elite | 02-04-task2-structured-emission.sql | ~5 |
| InMode Morpheus8 | 02-05-task1-structured-emission.sql | ~5 |
| Sofwave | 02-05-task1-structured-emission.sql | ~5 |
| Merz Ultherapy PRIME | 02-05-task1-structured-emission.sql | ~5 |
| Lutronic Hollywood Spectra | 02-05-task1-structured-emission.sql | ~5 |
| HydraFacial Syndeo | 02-05-task1-structured-emission.sql | ~3 |
| Jeuveau | 02-05-task2-neurotoxin-structured.sql | ~5 |
| Daxxify | 02-05-task2-neurotoxin-structured.sql | ~5 |
| Xeomin | 02-05-task2-neurotoxin-structured.sql | ~5 |

**Action needed:** Run the concern overlap SQL query at Plan 03 start to get exact per-pair concern overlap counts from live DB. This will replace the estimated signals with exact data.

### No products with 0 item_concerns rows

All 18 products have item_concerns rows in the live DB (verified by 05-01 execution which brought total from 98/124 to 139). No product is completely un-screenable for Gate 1.

---

## SQL Queries for Plan 03 Execution

The following SQL queries are prepared and ready for execution at Plan 03 (corpus query + LLM evaluation) start:

1. **Concern overlap query** (above) — returns pairs with shared_concerns > 0
2. **Per-product concern list** — for LLM context:
```sql
SELECT p.id, p.name, c.name AS concern_name, ic.relevance, ic.treatment_role
FROM item_concerns ic
JOIN products p ON p.id = ic.offering_id
JOIN concerns c ON c.id = ic.concern_id
WHERE p.id IN (/* 18 product IDs */)
ORDER BY p.name, ic.relevance DESC;
```
3. **does_not_solve arrays** — for Gate 3 context:
```sql
SELECT id, name, does_not_solve
FROM products
WHERE id IN (/* 18 product IDs */)
ORDER BY name;
```

---

*Phase: 06-pairing-engine*
*Plan: 02 — SQL Pre-Screen*
*Generated: 2026-06-13*
