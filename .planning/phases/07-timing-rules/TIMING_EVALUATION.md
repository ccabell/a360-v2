# Phase 7: Timing Rule Evaluation

**Date:** 2026-06-13
**Phase:** 07-timing-rules
**Source:** PHASE_7_TIMING_RESEARCH_SPEC.md (108 corpus searches, 630K+ chunks)
**SQL artifacts:** 07-02-product-cadence.sql (products), 07-03-pair-timing.sql (pairs)

---

## Summary

- Products with cadence data: 18/18
- Pairs with explicit timing rules: ~27 pairs in 07-03-pair-timing.sql (31 UPDATE statements including OR-direction alternates)
- Safety-critical rules: 0 hard blocks in pair schema (hard blocks are product-level contraindications or involve out-of-manifest products), 2 warnings, 3 education notes
- Evidence levels: 6 HIGH, 12 MODERATE, 4 LOW, 8 expert consensus
- Default posture: same_session_ok = YES for all pairs where no explicit rule exists (D-1)

---

## Product Cadence Rules

| Product | Initial Series | Initial Interval (days) | Maintenance (days) | Min Retreat (days) | Follow-Up (days) | Downtime (days) | Evidence |
|---------|:-:|-----------|-----------|:-:|:-:|-----------|:-:|
| Botox Cosmetic | 1 | — | 90-180 | 85 | 14 | 0 | PubMed HIGH |
| Dysport | 1 | — | 90-180 | 85 | 14 | 0 | PubMed HIGH |
| Xeomin | 1 | — | 90-180 | 85 | 14 | 0 | PubMed HIGH |
| Daxxify | 1 | — | 120-240 | 85 | 14 | 0 | PubMed HIGH |
| Jeuveau | 1 | — | 90-180 | 85 | 14 | 0 | PubMed HIGH |
| Juvederm Voluma XC | 1 | — | 365-730 | 90 | 14 | 1-2 | PubMed HIGH |
| Juvederm Vollure XC | 1 | — | 270-540 | 90 | 14 | 1-2 | PubMed HIGH |
| SKINVIVE by Juvederm | 1 | — | 180-270 | 90 | 30 | 0-1 | Expert consensus |
| Restylane Lyft | 1 | — | 270-540 | 90 | 14 | 1-2 | PubMed HIGH |
| RHA Redensity | 1 | — | 180-365 | 90 | 14 | 2-3 | PubMed HIGH |
| Sculptra Aesthetic | 3 | 28-42 | 365-730 | 28 | 60 | 1-3 | PubMed HIGH |
| InMode Morpheus8 | 3 | 28-84 | 90-180 | 28 | 90 | 1-5 | PubMed MODERATE |
| Sofwave | 1 | — | 365-545 | 180 | 90 | 0-1 | Expert consensus |
| Merz Ultherapy PRIME | 1 | — | 365 | 180 | 90 | 0-2 | PubMed MODERATE |
| Lutronic Hollywood Spectra | 4 | 21-28 | 90-180 | 21 | 28 | 0-1 | PubMed MODERATE |
| CoolSculpting Elite | 1-2 | 42-90 | As needed | 42 | 90 | 0 | PubMed MODERATE |
| Kybella | 3 | 42-56 | Permanent | 42 | 84 | 3-7 | PubMed MODERATE |
| HydraFacial Syndeo | Ongoing | — | 30 | 14 | — | 0 | Expert consensus |

**Notes:**
- All 5 neurotoxins share the 85-day minimum retreatment floor (PubMed HIGH, Monheit 2009, n=768, Phase III)
- Daxxify maintenance interval is longer (120-240 days) due to longer clinical duration (6-9 months)
- Sculptra initial interval (28-42 days / 4-6 weeks) is the series spacing between vials
- Kybella maintenance is "as needed" because fat cells are permanently destroyed (no maintenance retreatment concept)
- HydraFacial has no series requirement — monthly maintenance is the primary cadence

---

## Pair Timing Rules

| Pair | Same Session | Staging Required | Staging Sequence | Interval (days) | Safety | Warning Level | Evidence |
|------|:-:|:-:|-----------|:-:|:-:|:-:|:-:|
| Botox + Voluma XC | YES | No | — | — | No | — | PubMed HIGH |
| Botox + Vollure XC | YES | No | — | — | No | — | PubMed HIGH |
| Botox + SKINVIVE | YES | No | — | — | No | — | Expert consensus |
| Botox + Restylane Lyft | YES | No | — | — | No | — | PubMed HIGH |
| Botox + RHA Redensity | YES | No | — | — | No | — | Expert consensus |
| Dysport + Voluma XC | YES | No | — | — | No | — | PubMed HIGH |
| Dysport + Vollure XC | YES | No | — | — | No | — | Expert consensus |
| Dysport + SKINVIVE | YES | No | — | — | No | — | Expert consensus |
| Dysport + Restylane Lyft | YES | No | — | — | Expert consensus | — | Expert consensus |
| Dysport + RHA Redensity | YES | No | — | — | No | — | Expert consensus |
| Botox + Sculptra | YES | No | — | — | No | — | PubMed MODERATE |
| Dysport + Sculptra | YES | No | — | — | No | — | Expert consensus |
| Botox + Morpheus8 | YES | No | — | — | No | — | PubMed MODERATE |
| Botox + Sofwave | YES | Preferred | Botox first | 0-7 | No | — | PubMed HIGH (Zimbler) |
| Botox + Ultherapy PRIME | YES | Preferred | Botox first | 0-7 | No | — | PubMed HIGH (Zimbler) |
| Botox + Hollywood Spectra | YES | Preferred | Botox first | 0-7 | No | — | PubMed MODERATE |
| Sculptra + Voluma XC | YES | Yes | Sculptra first | 0-56 | No | — | Expert consensus |
| Sculptra + Vollure XC | YES | Yes | Sculptra first | 0-56 | No | — | Expert consensus |
| Sculptra + Restylane Lyft | YES | Yes | Sculptra first | 0-56 | No | — | Expert consensus |
| Morpheus8 + Voluma XC | YES | No | — | — | No | Education | Expert consensus |
| Morpheus8 + Vollure XC | YES | No | — | — | No | Education | Expert consensus |
| Morpheus8 + Restylane Lyft | YES | No | — | — | No | Education | Expert consensus |
| Sculptra + Morpheus8 | YES | No | — | — | No | — | PubMed LOW + Expert |
| CoolSculpting + Kybella | CONDITIONAL | Recommended | CoolSculpting first (if same area) | 42-56 | YES | Warning | Expert consensus |
| Morpheus8 + Hollywood Spectra | YES | Yes | Morpheus8 first | 0 (same session) | No | — | Expert consensus |
| Morpheus8 + Sofwave | YES | Preferred | Sofwave or Morpheus8 first | 0 (same session) | No | — | Expert consensus |
| Botox + HydraFacial | YES | No | — | — | No | — | Expert consensus |
| Sculptra + HydraFacial | YES | No | — | — | No | — | Expert consensus |
| Morpheus8 + HydraFacial | NO | Yes (staged) | HydraFacial first | 14-30 | YES | Warning | Expert consensus |

---

## Same-Session Compatibility Summary

- **Default posture:** YES — same-session combination is the default for all pairs unless an explicit rule exists (D-1). Supported by PubMed RCT (BoNT-A + HA filler, n=90), expert consensus across clinical practice, and ASDS 2024 conference themes.
- **Pairs with explicit YES:** 27 (from 07-03-pair-timing.sql; additional pairs default YES per D-1)
- **Pairs with explicit NO:** 1 (Morpheus8 + HydraFacial — open micro-channels + suction = infection risk)
- **Pairs with CONDITIONAL:** 1 (CoolSculpting + Kybella — safe if different anatomical areas, warning if same submental area)
- **Default for remaining 124 pairs:** YES (no explicit rule needed; agents query by exception)

---

## Sequencing Rules Summary

Pairs where treatment order matters (staging_required = true or preferred):

| Pair | Order | Interval | Rationale | Evidence |
|------|-------|:-:|-----------|----------|
| Sculptra → HA Fillers (all) | Sculptra first | 0-56 days | Collagen foundation first; HA adds contour on top | Expert consensus (multiple providers) |
| BoNT-A → Laser/Energy | Toxin first or concurrent | 0-7 days | BoNT-A pretreatment enhances laser results | PubMed HIGH (Zimbler 2001, RCT) |
| Morpheus8 → Hollywood Spectra | Morpheus8 first | 0 (same session) | Deeper energy before superficial (temperature layering) | Expert consensus |
| Morpheus8 → Sofwave | Provider preference | 0 (same session) | Two tightening modalities — order per workflow | Expert consensus |
| HydraFacial → Morpheus8 | HydraFacial 14-30 days before | 14-30 days | Prep skin first; micro-channels + suction = risk if same day | Expert consensus |

**Sequencing rules NOT in manifest (documented for completeness):**
- Profhilo 64 → Energy Devices: Profhilo first (at least 1 session prior to EBD) — expert consensus (Dr. Kramer, Ep 301). Profhilo not in 18-product manifest.
- Hyaluronidase → HA re-injection: 2-42 days between. Hyaluronidase not in manifest.
- Filler dissolution → Surgery: 14-30 days minimum. Surgery not in manifest scope.

---

## Safety-Critical Rules

Full inventory of safety-relevant rules from the research spec, indicating which are in-schema vs documented-only:

| # | Rule | Type | Hardness | In Schema? | Evidence | Notes |
|---|------|------|----------|:-:|----------|-------|
| 1 | BoNT-A: minimum 85-day retreatment interval | Cadence | Hard stop | YES (product-level) | PubMed HIGH (Monheit 2009, n=768) | minimum_retreatment_days=85 on all 5 neurotoxins |
| 2 | BoNT-A: typical retreatment 3-6 months | Cadence preference | Preference | YES (product-level) | PubMed HIGH (Flynn 2010, 35 studies) | maintenance_interval_days on products |
| 3 | BoNT-A: >50 units per session increases antibody risk | Warning | Warning | YES (cadence_notes) | Clinical practice data (published evidence) | Not a pair-level rule; documented in cadence_notes |
| 4 | BoNT-A + HA Filler: safe same-session | Pair | YES | YES (pair-level) | PubMed HIGH (Carruthers 2010, RCT n=90) | same_session_ok=true on all 10 toxin+HA pairs |
| 5 | BoNT-A + Nonablative Laser/IPL: safe same-session | Pair | YES | YES (pair-level) | PubMed MODERATE (Semchyshyn 2005) | same_session_ok=true on toxin+energy pairs |
| 6 | BoNT-A → Laser: 1 week pretreatment enhances results | Sequencing | Preferred | YES (pair-level) | PubMed HIGH (Zimbler 2001, RCT) | staging_required=true on toxin+energy pairs |
| 7 | Hyaluronidase + HA Filler: NEVER same session | Hard stop | Hard stop | NO (Hyaluronidase not in manifest) | Pharmacological + expert consensus | Document-only; hard block applies if hyaluronidase row created |
| 8 | Hyaluronidase → HA re-injection: 2-42 days minimum | Sequencing | Warning | NO (out of manifest) | Expert consensus + PubMed | Document-only |
| 9 | Vascular occlusion → Hyaluronidase: within 72 hours | Emergency protocol | Hard stop | NO (emergency — not scheduling) | PubMed MODERATE (Kim 2011, Sun 2015, Hong 2017) | Emergency protocol — separate from scheduling logic |
| 10 | Sculptra: 2-3 sessions, 4-6 weeks apart | Cadence | Standard | YES (product-level) | PubMed HIGH (Narins 2010, RCT + 5yr retrospective) | initial_series_count=3, initial_interval_days on Sculptra |
| 11 | Radiesse (CaHA): 6-12 month retreatment | Cadence | Standard | NO (Radiesse not in manifest) | PubMed HIGH (Bass 2010) | Radiesse excluded per Phase 2 decision |
| 12 | HA Fillers: touch-up at 2 weeks | Cadence | Standard | YES (product-level) | PubMed HIGH (multiple) | typical_followup_days=14 on all HA fillers |
| 13 | RF Microneedling: series of 3, 4-week intervals | Cadence | Standard | YES (product-level) | PubMed MODERATE (Nguyen 2022) | initial_series_count=3, initial_interval on Morpheus8 |
| 14 | IPL/BBL: 3-5 sessions, 3-4 week intervals | Cadence | Standard | YES (product-level) | PubMed MODERATE (Negishi 2002, Kim 2012) | Hollywood Spectra initial_series_count=4 |
| 15 | PRP: 3-6 sessions, 2-4 week intervals | Cadence | Standard | NO (PRP not in manifest) | PubMed MODERATE (multiple) | PRP not in 18-product manifest |
| 16 | CoolSculpting: minimum 6-8 weeks between | Cadence | Warning | YES (product-level) | PubMed MODERATE (Bernstein 2017) | minimum_retreatment_days=42 |
| 17 | Kybella: 2-4 sessions, 6-8 weeks apart | Cadence | Standard | YES (product-level) | PubMed MODERATE (multiple) | initial_series_count=3, initial_interval=42-56 days |
| 18 | Chemical Peels: series 2-4 week intervals | Cadence | Standard | NO (peels not in manifest) | Expert consensus | Out of 18-product manifest scope |
| 19 | PDO Threads: series of 3, 4-week intervals | Cadence | Standard | NO (threads not in manifest) | Expert consensus + YouTube | Out of manifest |
| 20 | Skin Boosters: series of 3, 4-week intervals | Cadence | Standard | NO (Profhilo not in manifest) | Expert consensus (Dr. Wang, Dr. Selkon) | Out of manifest |
| 21 | Laser Hair Removal: 6+ sessions | Cadence | Standard | NO (not in manifest) | Expert consensus | Out of manifest |
| 22 | Sculptra → HA Filler: Sculptra first, 4-8 weeks | Sequencing | Preferred | YES (pair-level) | Expert consensus (multiple providers) | staging_required=true on 3 Sculptra+HA pairs |
| 23 | Sculptra → PDO Threads: Sculptra first | Sequencing | Preferred | NO (threads not in manifest) | Expert consensus | Document-only |
| 24 | Profhilo 64 → Energy Devices: Profhilo first | Sequencing | Preferred | NO (Profhilo not in manifest) | Expert consensus (Dr. Kramer, Ep 301) | Document-only |
| 25 | Energy Device → Topical Juvelook: device first | Sequencing | Required | NO (Juvelook not in manifest) | Expert consensus (Dr. Dinley) | Document-only |
| 26 | Filler Dissolution → Surgery: 14-30 days minimum | Sequencing | Warning | NO (surgery out of scope) | Expert consensus (clinical practice) | Document-only |
| 27 | HA Filler + Threads: conditional (different planes) | Pair | Conditional | NO (threads not in manifest) | Expert consensus (Dr. Ku, Ep 46) | Document-only |
| 28 | Biostimulator + RF + Laser: safe same-day | Pair | YES | YES (pair-level subset) | PubMed LOW + Expert consensus | Sculptra+Morpheus8 same_session_ok=true |
| 29 | PRP + Fractional Laser: safe same-session, REDUCES downtime | Pair | YES | NO (PRP not in manifest) | PubMed HIGH (Gawdat 2014, RCT n=30) | Document-only; combined_downtime_note cannot be set |
| 30 | Rejuran + Cross-linked HA in same plane | Warning | Warning | NO (Rejuran not in manifest) | Expert consensus (clinical practice) | Document-only |
| 31 | Fully Ablative Laser + Isotretinoin | Hard stop | Hard stop | NO (products not in manifest) | PubMed MODERATE (Latifaltojar 2025) | Document-only; applies if ablative laser added |
| 32 | CoolSculpting: PAH monitoring at 2-4 months | Education | Education | YES (product-level cadence_notes) | PubMed MODERATE (Stroumza 2018) | typical_followup_days=90, cadence_notes on CoolSculpting |
| 33 | BoNT-A in pregnancy/lactation | Contraindication | Hard stop | NO (product-level contraindication) | PubMed MODERATE (Brandt 2004) | Product-level safety — separate from timing schema |
| 34 | Filler/BoNT-A same session (France) | Legal | Hard stop (regional) | NO (regional config) | Expert consensus (clinical practice data) | Regional legal restriction = separate feature |

---

## Evidence Gaps

Based on research spec findings:

1. **Body contouring combination timing (thin evidence)** — Limited PubMed and limited clinical practice data on combining CoolSculpting + Kybella in same anatomical area same-day. CoolSculpting + body muscle stimulation devices: no evidence found.

2. **Skincare regimen + procedure sequencing** — Clinical practice data exists (peel timing, HydraFacial prep) but sparse in the clinical evidence corpus relative to injectables. No formal sequencing studies found.

3. **Combined downtime for specific pairs** — Default rule: `combined_downtime = max(individual downtimes)`. Expert-determined combined downtime documented in `combined_downtime_note` for 15 pairs. Remaining 130+ pairs use the default max rule.

4. **Long-term outcomes of aggressive same-day stacking** — No published long-term data on multiple-modality same-session outcomes at 6-12+ months. Short-term safety is well-established; long-term optimization is not.

5. **Regional legal variation beyond France** — France same-session prohibition documented. Other jurisdictions not systematically researched. Regional legal restrictions are out of scope for Phase 7 schema.

6. **PRP downtime-reduction effect cannot be schema-captured** — The PubMed HIGH finding (Gawdat 2014: PRP reduces laser downtime) cannot be applied to a pair row because PRP is not in the 18-product manifest. This is a documented gap.

---

## Deferred Items

| Item | Rationale | Deferred To |
|------|-----------|-------------|
| Event-based timeline calculator (wedding/event backward planning) | Care-plan logic, not product-level timing data. Product cadence data (Phase 7) provides building blocks. | Phase 9 |
| Area-specific cadence table (product_area_config) | One cadence per product + cadence_notes covers 80%+ of cases. Glabella vs masseter Botox documented in notes. | Phase 9 |
| Thermal tier product attribute | Single-source principle (Tracy Mancuso framework). Documented in staging_rationale for energy pairs. | Phase 9 if evidence matures |
| Agent fuel compilation with timing data | Timing data enters agent retrieval through fuel compilation layer, not direct wiring in Phase 7. | Phase 10 |
| Visual timeline templates | Treatment arc diagrams and visual tools. | Phase 9 |
| Booking logic cheat sheet | Derived from this evaluation. | Phase 10 or standalone |
| Regional legal restrictions (France, etc.) | Separate configuration feature, not product/pair schema. | Future phase |
| QA verification report | Runs against live DB after SQL execution. | Post-execution |

---

## Conflicts Between Expert Practice and Published Evidence

| # | Topic | Expert Practice | Published/Conservative | Classification |
|---|-------|----------------|------------------------|----------------|
| 1 | Filler + laser/RF same session | Safe (HA sterilized at 120C; RF generates 40-45C — insufficient to melt) | Some providers recommend 1-2 week wait. PubMed: no evidence of harm | **Education** — document tension, default to expert practice YES |
| 2 | >50U toxin per session | Many practitioners routinely inject 80+ units (full face + micro-toxin) | Published data: >50U increases antibody risk | **Warning** in cadence_notes — not a hard block |
| 3 | Two toxin brands same session | Expert practice for nuanced treatment (Dr. Eccleston, Ep 263) | No published guidance; conservative practice: one brand per session | **Education** — no schema impact; expert practice noted |
| 4 | Sculptra longevity claims | "5-7 years" claimed by some providers | PubMed: up to 2-5 years in most studies | **Education** — no timing schema impact; cadence_notes conservative |
| 5 | Laser after isotretinoin | Non-ablative fractional and RF: now considered safe during isotretinoin (2025 data) | Traditional teaching: 6-12 month wait after isotretinoin (any ablative) | **Product-level only** — fully ablative laser not in manifest |

---

*Last updated: 2026-06-13*
*Phase 07 Plan 02 execution artifact. Data sourced from PHASE_7_TIMING_RESEARCH_SPEC.md corpus synthesis.*
*Attribution: clinical evidence cites PubMed sources; expert-practice intelligence attributed as "expert consensus" or "clinical practice data."*
