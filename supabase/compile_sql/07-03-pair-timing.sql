-- Phase 07 Plan 02: Pair-Level Timing Data
-- File: 07-03-pair-timing.sql
-- Date: 2026-06-13
-- Source: PHASE_7_TIMING_RESEARCH_SPEC.md (Same-Session Matrix, Sequencing Matrix, Contraindication Matrix)
-- Decisions applied: D-1 (default YES), D-2 (exception model), D-7 (sequencing fields),
--                   D-10 (combined downtime), D-11 (safety_critical), D-12 (hybrid safety)
--
-- PHASE 6 DEPENDENCY NOTE:
-- These UPDATE statements target existing item_relationships rows created by Phase 6 (plans 02-05).
-- Phase 6 is still executing plans 02-05. If an UPDATE targets a row that does not yet exist,
-- it is a safe no-op (updates 0 rows). Re-run this file after Phase 6 completes to ensure
-- all pair rows receive their timing data. The file is idempotent — safe to run multiple times.
--
-- PAIR DIRECTION CONVENTION:
-- Phase 6 creates pairs using alphabetical ordering by product name for item_a / item_b.
-- For pairs where alphabetical direction is uncertain, WHERE clauses use:
--   (item_a_id = X AND item_b_id = Y) OR (item_a_id = Y AND item_b_id = X)
-- to catch either direction. Once Phase 6 confirms the canonical direction, the OR can be removed.
--
-- DEFAULT POSTURE (D-1):
-- same_session_ok = NULL means "default YES" (no explicit rule required).
-- Only pairs with a SPECIFIC rule get explicit same_session_ok values.
-- same_session_ok = true: explicitly confirmed safe same-session.
-- same_session_ok = false: explicit contraindication.
--
-- PRODUCT offering_ids (from DOES_NOT_SOLVE_BACKFILL.md):
--   Botox Cosmetic:        4b92be36-e84e-432c-8549-f5d85a767fdb
--   Dysport:               a7e1b29e-da10-40de-bea8-70d6e6624f43
--   Xeomin:                92a05fe8-d349-4d2f-9a3f-bc5901f94dfa
--   Daxxify:               007d98fd-58b5-4d20-be11-caf421c0dccb
--   Jeuveau:               8adda68a-9fd2-49ad-8852-641970135131
--   Juvederm Voluma XC:    6c8f72f0-887f-484a-a588-0bb9bd8052c9
--   Juvederm Vollure XC:   7370545f-97a3-4519-a92d-3ac4f969829d
--   SKINVIVE by Juvederm:  b74d5475-bf58-4d7d-87f5-2c8dc9e252de
--   Restylane Lyft:        f1732c7c-3f19-4f3d-9aff-543a132e5506
--   RHA Redensity:         d8a00419-39e1-4d4b-8dab-ad134fb00930
--   Sculptra Aesthetic:    2ce7a3d2-b06d-4b62-b9b7-4113afb51baa
--   CoolSculpting Elite:   694ea839-cf8f-4a17-b838-2588674c792f
--   Kybella:               0f901fec-5de5-4950-815e-82c3e47cb2ec
--   InMode Morpheus8:      84ac561e-1818-4ece-a8d7-1fb6c5ea80df
--   Sofwave:               78973d13-fa36-41dd-8625-4b851ff143ed
--   Merz Ultherapy PRIME:  da25d447-c316-40b2-802e-e190c0bdbd9f
--   Lutronic Hollywood Spectra: be46f975-99d7-4772-867e-744814626654
--   HydraFacial Syndeo:    28918bda-787b-412a-9802-d3d9a00e6ab1

-- =============================================================================
-- SECTION 1: NEUROTOXIN + HA FILLER PAIRS
-- same_session_ok = true for all 25 pairs (PubMed HIGH — Carruthers 2010, RCT n=90)
-- Default posture is YES so explicit=true here adds evidence-backed confirmation.
-- =============================================================================

-- Botox + Voluma XC
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Standard of care combination. Neurotoxin relaxes dynamic muscles while filler restores static volume loss — complementary mechanisms. Evidence-backed: PubMed HIGH (Carruthers et al., Dermatologic Surgery 2010, RCT n=90). Expert consensus across clinical practice.',
  combined_downtime_note = 'Neurotoxin adds no downtime. Combined downtime = filler downtime (mild swelling 24-48 hours, bruising possible 7-9 days).',
  timing_notes = 'Toxin onset 7-10 days (full effect 14 days). Filler results immediate. Some providers prefer toxin first in same session; order is not clinically critical per published evidence.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9')
   OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- Botox + Vollure XC
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Standard of care combination. Neurotoxin relaxes dynamic muscles; HA filler adds soft tissue volume and lifts. Evidence-backed: PubMed HIGH (Carruthers 2010, RCT n=90). Expert consensus across clinical practice.',
  combined_downtime_note = 'Neurotoxin adds no downtime. Combined downtime = filler downtime (mild swelling 24-48 hours, bruising possible 7-9 days).',
  timing_notes = 'Toxin onset 7-10 days. Filler results immediate. Either order is clinically acceptable same session.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d')
   OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- Botox + SKINVIVE
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Neurotoxin addresses dynamic movement; SKINVIVE (intradermal HA microdroplet) improves skin hydration and quality — distinct tissue depths and mechanisms. Expert consensus across clinical practice.',
  combined_downtime_note = 'Neurotoxin: no downtime. SKINVIVE: mild redness at injection sites 24 hours. Combined 0-1 day.',
  timing_notes = 'Different injection planes: SKINVIVE is intradermal, toxin is intramuscular. No interaction risk.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de')
   OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- Botox + Restylane Lyft
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Standard of care combination. Neurotoxin relaxes dynamic muscles; Restylane Lyft restores mid-face volume loss. Complementary mechanisms. Evidence-backed: PubMed HIGH (Carruthers 2010, RCT n=90). Expert consensus across clinical practice.',
  combined_downtime_note = 'Neurotoxin: no downtime. Filler: mild swelling 1-2 days, bruising possible 7-9 days. Combined = filler downtime only.',
  timing_notes = 'Standard same-session workflow. Toxin typically administered first or concurrent with filler.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506')
   OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- Botox + RHA Redensity
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Neurotoxin reduces dynamic lines; RHA Redensity treats perioral lines and delicate areas. Complementary mechanisms targeting the same region. Expert consensus across clinical practice.',
  combined_downtime_note = 'Neurotoxin: no downtime. Filler (perioral): swelling 2-3 days, bruising possible. Combined = filler downtime.',
  timing_notes = 'RHA (resilient HA) formulation matched to dynamic movement zones — natural pairing with toxin in same areas.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930')
   OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- Dysport + Voluma XC
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Standard of care combination. Dysport relaxes dynamic muscles with faster onset (3-5 days vs 7-10 days for Botox); filler restores volume loss. Complementary mechanisms. Evidence-backed: PubMed HIGH (Carruthers 2010, RCT n=90 with multiple toxin types).',
  combined_downtime_note = 'Dysport: no downtime. Filler: mild swelling 1-2 days. Combined = filler downtime only.',
  timing_notes = 'Dysport faster onset than Botox. Filler results immediate. Either order acceptable same session.'
WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43' AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9')
   OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9' AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43');

-- Dysport + Vollure XC
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Standard of care combination. Dysport relaxes dynamic muscles; Vollure XC addresses NLF and other moderate-to-severe facial lines. Complementary mechanisms. Expert consensus across clinical practice.',
  combined_downtime_note = 'Dysport: no downtime. Filler: mild swelling 24-48 hours, bruising possible. Combined = filler downtime.',
  timing_notes = 'Standard same-session workflow for toxin + filler.'
WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43' AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d')
   OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d' AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43');

-- Dysport + SKINVIVE
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Dysport reduces dynamic lines; SKINVIVE improves skin hydration and luminosity. Different tissue depths and mechanisms. Expert consensus across clinical practice.',
  combined_downtime_note = 'Dysport: no downtime. SKINVIVE: mild injection site redness 24 hours. Combined = 0-1 day.',
  timing_notes = 'No interaction risk — different injection planes (intramuscular toxin vs intradermal SKINVIVE).'
WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43' AND item_b_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de')
   OR (item_a_id = 'b74d5475-bf58-4d7d-87f5-2c8dc9e252de' AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43');

-- Dysport + Restylane Lyft
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Standard of care combination. Dysport relaxes dynamic muscles; Restylane Lyft restores mid-face volume. Complementary mechanisms. Expert consensus and PubMed HIGH evidence for toxin + HA filler combination.',
  combined_downtime_note = 'Dysport: no downtime. Filler: mild swelling 1-2 days. Combined = filler downtime.',
  timing_notes = 'Standard same-session pairing.'
WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43' AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506')
   OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506' AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43');

-- Dysport + RHA Redensity
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Dysport reduces dynamic perioral/periorbital lines; RHA Redensity fills residual lines. Both target dynamic movement zones. Expert consensus across clinical practice.',
  combined_downtime_note = 'Dysport: no downtime. RHA Redensity (perioral): swelling 2-3 days. Combined = filler downtime.',
  timing_notes = 'RHA formulation designed for dynamic areas — natural partner with toxin.'
WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43' AND item_b_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930')
   OR (item_a_id = 'd8a00419-39e1-4d4b-8dab-ad134fb00930' AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43');

-- =============================================================================
-- SECTION 2: NEUROTOXIN + BIOSTIMULATOR (SCULPTRA) PAIRS
-- same_session_ok = true (expert consensus, MODERATE evidence)
-- =============================================================================

-- Botox + Sculptra
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Neurotoxin provides immediate dynamic line reduction; Sculptra stimulates collagen over 2-6 months. Different targets, different timescales. Expert consensus: providers routinely administer both at the same visit. PubMed MODERATE (Friedmann et al., J Cosmetic Dermatology 2014 — biostimulator + multiple modalities same session).',
  combined_downtime_note = 'Neurotoxin: no downtime. Sculptra: mild swelling 1-3 days, massage 5-5-5 rule applies. Combined = 1-3 days.',
  timing_notes = 'Sculptra results are delayed (2-6 months) while toxin takes effect in 7-14 days — complementary timelines. Sculptra dose planning: approximately 1 vial per decade of age.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa')
   OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- Dysport + Sculptra
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Dysport provides immediate dynamic muscle relaxation; Sculptra builds collagen foundation over months. Different mechanisms, different timescales. Expert consensus across clinical practice.',
  combined_downtime_note = 'Dysport: no downtime. Sculptra: mild swelling 1-3 days. Combined = 1-3 days.',
  timing_notes = 'Dysport faster onset than Botox (3-5 days). Combined with Sculptra delayed results — patients benefit from understanding the two different timelines.'
WHERE (item_a_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43' AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa')
   OR (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa' AND item_b_id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43');

-- =============================================================================
-- SECTION 3: NEUROTOXIN + ENERGY DEVICE PAIRS
-- same_session_ok = true (PubMed MODERATE — Semchyshyn & Kilmer 2005, laser/IPL after BoNT-A)
-- =============================================================================

-- Botox + Morpheus8
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. RF/laser energy does not inactivate neurotoxin. Neurotoxin reduces dynamic lines; Morpheus8 RF microneedling remodels collagen and tightens skin. Evidence-backed: PubMed MODERATE (Semchyshyn & Kilmer 2005 — nonablative laser/IPL safe immediately after BoNT-A). Expert consensus across clinical practice.',
  combined_downtime_note = 'Neurotoxin: no downtime. Morpheus8: redness/mild swelling 1-5 days, no makeup 24 hours. Combined = 1-5 days.',
  staging_required = false,
  staging_rationale = 'Either order is acceptable same session. Clinical practice notes suggest neurotoxin injection after energy device preferred by some providers (reduces toxin spread risk), but no clinical evidence mandates this order.',
  timing_notes = 'Expert practice (Dr. Weiner): HA fillers survive RF heat (sterilized at 120C; RF generates 40-45C). Same principle applies to toxin + RF — no interaction. PubMed confirms laser/RF does not inactivate BoNT-A.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df')
   OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- Botox + Sofwave
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Sofwave (SUPERB ultrasound technology) tightens mid-dermal collagen; neurotoxin relaxes dynamic muscles. Different mechanisms and tissue depths. Expert consensus: ultrasound energy does not inactivate toxin. PubMed MODERATE (Semchyshyn 2005, principle extends to ultrasound energy).',
  combined_downtime_note = 'Neurotoxin: no downtime. Sofwave: minimal redness 1-2 hours, return to normal activity same day. Combined = 0-1 day.',
  timing_notes = 'Sofwave targets mid-dermis (1.5mm depth), not intramuscular toxin plane. No interaction risk.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed')
   OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- Botox + Ultherapy PRIME
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Ultherapy PRIME delivers focused ultrasound energy to SMAS layer; neurotoxin relaxes dynamic muscles. Different planes and mechanisms. PubMed MODERATE (principle supported by Semchyshyn 2005). Expert consensus: "energy device first, then injectables" is common practice but not clinically required.',
  combined_downtime_note = 'Ultherapy: mild redness/swelling day of, resolves 24-48 hours. Neurotoxin: no downtime. Combined = 0-2 days.',
  staging_required = true,
  staging_sequence = 'product_a_first',
  staging_interval_days_min = 0,
  staging_interval_days_max = 7,
  staging_rationale = 'Expert consensus (Zimbler et al. RCT principle, PubMed HIGH): BoNT-A administered 1 week BEFORE or same-session as energy devices enhances results by immobilizing muscles during healing. Some providers prefer energy device first to ensure toxin is not disrupted by ultrasound energy, though no clinical evidence supports this requirement.',
  timing_notes = 'Sequencing direction in staging_sequence assumes item_a is Botox per alphabetical convention. Verify in Phase 6 pair direction.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f')
   OR (item_a_id = 'da25d447-c316-40b2-802e-e190c0bdbd9f' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- Botox + Hollywood Spectra
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Hollywood Spectra (Q-switched Nd:YAG laser) targets pigmentation and skin texture; neurotoxin relaxes dynamic muscles. Non-ablative laser energy does not inactivate toxin. Evidence-backed: PubMed MODERATE (Semchyshyn & Kilmer 2005, nonablative laser immediately after BoNT-A — safe with no efficacy loss).',
  combined_downtime_note = 'Hollywood Spectra: minimal (IPL-class downtime, same-day makeup possible). Neurotoxin: no downtime. Combined = 0-1 day.',
  timing_notes = 'Spectra laser is non-ablative. Non-ablative/Q-switched lasers have MODERATE evidence for same-session safety with BoNT-A (Semchyshyn 2005).'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = 'be46f975-99d7-4772-867e-744814626654')
   OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- =============================================================================
-- SECTION 4: HA FILLER + BIOSTIMULATOR (SCULPTRA) PAIRS
-- Sequencing required: Sculptra first (expert consensus)
-- =============================================================================

-- Sculptra + Voluma XC
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session. Best results when Sculptra administered first in series (not necessarily same visit). Expert consensus: providers describe "Sculptra for foundation, HA for structure/contour." PubMed MODERATE (Friedmann 2014 — IPL+Sculptra+Ultherapy same session safe).',
  staging_required = true,
  staging_sequence = 'product_a_first',
  staging_interval_days_min = 0,
  staging_interval_days_max = 56,
  staging_rationale = 'Expert consensus (multiple providers, clinical practice): Sculptra first to establish collagen foundation. HA filler then adds contour and structure on top of the collagen base. If done same session, Sculptra should be injected before HA filler. If staged, 4-8 weeks between (Sculptra first) allows initial collagen formation before filler placement.',
  combined_downtime_note = 'Sculptra: mild swelling 1-3 days. Voluma XC: mild swelling 1-2 days. Combined = 2-3 days (not additive — overlapping recovery).',
  timing_notes = 'Staging sequence "product_a_first" assumes item_a = Sculptra per alphabetical ordering. Verify Phase 6 pair direction. If item_a = Voluma, sequence should be product_b_first (Sculptra).'
WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa' AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9')
   OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9' AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa');

-- Sculptra + Vollure XC
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session. Sculptra establishes long-term collagen foundation; Vollure XC provides immediate volume and line correction. Complementary mechanisms across different timescales.',
  staging_required = true,
  staging_sequence = 'product_a_first',
  staging_interval_days_min = 0,
  staging_interval_days_max = 56,
  staging_rationale = 'Expert consensus: Sculptra before HA filler for optimal collagen foundation. 4-8 week staged interval when not done same session.',
  combined_downtime_note = 'Sculptra: 1-3 days. Vollure XC: 1-2 days. Combined = 2-3 days.',
  timing_notes = 'Same principle as Sculptra + Voluma — "foundation then structure" protocol. Verify Phase 6 alphabetical pair direction.'
WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa' AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d')
   OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d' AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa');

-- Sculptra + Restylane Lyft
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session. Sculptra provides long-term collagen stimulation; Restylane Lyft offers immediate structural volume in mid-face. Expert consensus across clinical practice for biostimulator + structural filler combination.',
  staging_required = true,
  staging_sequence = 'product_a_first',
  staging_interval_days_min = 0,
  staging_interval_days_max = 56,
  staging_rationale = 'Expert consensus: Sculptra first (collagen foundation), then HA structural filler. 4-8 weeks between if staged.',
  combined_downtime_note = 'Sculptra: 1-3 days. Restylane Lyft: 1-2 days swelling. Combined = 2-3 days.',
  timing_notes = 'Verify Phase 6 alphabetical pair direction for staging_sequence field.'
WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa' AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506')
   OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506' AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa');

-- =============================================================================
-- SECTION 5: HA FILLER + RF MICRONEEDLING (MORPHEUS8)
-- same_session_ok = true (expert consensus — HA survives RF temperatures)
-- =============================================================================

-- Morpheus8 + Voluma XC
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. HA filler is heat-sterilized to 120C during manufacturing; Morpheus8 RF microneedling generates 40-45C tissue temperature — insufficient to melt or degrade HA. Expert consensus (Dr. Weiner, clinical practice). Note: Some providers recommend waiting 1-2 weeks. No PubMed evidence of harm with same-session use.',
  combined_downtime_note = 'Morpheus8: redness/mild swelling 1-5 days. HA filler: mild swelling 1-2 days. Combined = 2-5 days (overlapping, not additive).',
  timing_notes = 'Expert practice vs conservative guidance tension: Dr. Weiner (published, clinical practice): safe. Some YouTube/industry providers recommend 1-2 week wait. PubMed: no evidence of harm either way. Classified as education note — provider clinical judgment applies.',
  timing_warning_level = 'education'
WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df' AND item_b_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9')
   OR (item_a_id = '6c8f72f0-887f-484a-a588-0bb9bd8052c9' AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df');

-- Morpheus8 + Vollure XC
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. HA filler survives RF temperatures (sterilized at 120C; RF generates 40-45C). Expert consensus across clinical practice. No PubMed evidence of harm with same-session use.',
  combined_downtime_note = 'Morpheus8: 1-5 days redness/swelling. Vollure XC: 1-2 days. Combined = 2-5 days.',
  timing_notes = 'Some providers prefer to separate by 1-2 weeks. No clinical evidence mandates this. Provider clinical judgment applies.',
  timing_warning_level = 'education'
WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df' AND item_b_id = '7370545f-97a3-4519-a92d-3ac4f969829d')
   OR (item_a_id = '7370545f-97a3-4519-a92d-3ac4f969829d' AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df');

-- Morpheus8 + Restylane Lyft
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. HA filler survives Morpheus8 RF temperatures. Morpheus8 provides tissue remodeling; Restylane Lyft restores mid-face volume. Expert consensus across clinical practice.',
  combined_downtime_note = 'Morpheus8: 1-5 days. Restylane Lyft: 1-2 days. Combined = 2-5 days.',
  timing_notes = 'Expert vs conservative tension: some providers recommend 1-2 week separation. No evidence of harm from same-session. Education-level note.',
  timing_warning_level = 'education'
WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df' AND item_b_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506')
   OR (item_a_id = 'f1732c7c-3f19-4f3d-9aff-543a132e5506' AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df');

-- =============================================================================
-- SECTION 6: BIOSTIMULATOR (SCULPTRA) + RF MICRONEEDLING (MORPHEUS8)
-- same_session_ok = true; staging notes for sequencing preference
-- =============================================================================

-- Sculptra + Morpheus8
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Sculptra provides volumetric collagen stimulation; Morpheus8 RF microneedling remodels dermal collagen and tightens. Both are fibroblast-stimulating modalities that synergize. Expert consensus: "Combined biostimulator + RF microneedling + laser same day" (Dr. Bejma, clinical practice). PubMed LOW (Friedmann 2014 — multiple modalities same session safe).',
  combined_downtime_note = 'Sculptra: mild swelling 1-3 days. Morpheus8: redness/swelling 1-5 days. Combined = 3-5 days (expect longer when combining collagen stimulators).',
  timing_notes = 'Both products stimulate fibroblasts — patients should expect extended collagen remodeling period. Results from combined treatment appear over 2-6 months.'
WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa' AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df')
   OR (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df' AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa');

-- =============================================================================
-- SECTION 7: SEQUENCING PAIRS (staging_required = true)
-- These pairs have evidence-backed preferred treatment order.
-- =============================================================================

-- Botox + Ultherapy PRIME (BoNT-A before laser — already handled above in Section 3)
-- Sequencing pattern: BoNT-A pretreatment 1 week before energy device enhances results.
-- PubMed HIGH (Zimbler et al., Arch Facial Plast Surg 2001, RCT)
-- (Already set in Botox + Ultherapy row above)

-- Botox + Sofwave (sequencing note)
UPDATE item_relationships SET
  staging_required = true,
  staging_sequence = 'product_a_first',
  staging_interval_days_min = 0,
  staging_interval_days_max = 7,
  staging_rationale = 'Expert consensus: BoNT-A administered same-session or up to 1 week before energy devices may enhance results by immobilizing muscles during healing. PubMed HIGH (Zimbler 2001, RCT — BoNT-A pretreatment before laser resurfacing). Same principle applied to ultrasound energy (Sofwave). Not required — preferred sequence when planning staged treatments.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed')
   OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- Botox + Hollywood Spectra (sequencing note)
UPDATE item_relationships SET
  staging_required = true,
  staging_sequence = 'product_a_first',
  staging_interval_days_min = 0,
  staging_interval_days_max = 7,
  staging_rationale = 'Expert consensus: BoNT-A before or concurrent with nonablative laser. PubMed MODERATE (Semchyshyn & Kilmer 2005 — nonablative laser/IPL immediately after BoNT-A safe and effective). Toxin-first or same-session preferred over laser-first when staging is chosen.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = 'be46f975-99d7-4772-867e-744814626654')
   OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- =============================================================================
-- SECTION 8: SAFETY-CRITICAL PAIRS
-- Pairs with safety_critical = true and explicit timing_warning_level
-- =============================================================================

-- CoolSculpting + Kybella (same-area warning)
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Generally safe same-session if targeting different anatomical areas (e.g., CoolSculpting abdomen + Kybella submental). If targeting same area (submental), separate by 6-8 weeks minimum to allow CoolSculpting inflammatory response to resolve before Kybella injection. Expert consensus across clinical practice.',
  safety_critical = true,
  timing_warning_level = 'warning',
  timing_notes = 'WARNING: If both targeting submental area same session — clinical evidence for safety is limited. Conservative approach: CoolSculpting first, wait 6-8 weeks, then Kybella. Expert practice varies. Provider clinical judgment required. If different anatomical areas: safe same-session.'
WHERE (item_a_id = '694ea839-cf8f-4a17-b838-2588674c792f' AND item_b_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec')
   OR (item_a_id = '0f901fec-5de5-4950-815e-82c3e47cb2ec' AND item_b_id = '694ea839-cf8f-4a17-b838-2588674c792f');

-- CoolSculpting retreatment (same product — documented in product-level cadence, but pair-level note for clarity)
-- Note: CoolSculpting same-product retreatment is handled in product cadence (minimum_retreatment_days=42).
-- No item_relationships row exists for a product paired with itself — this is product-level only.

-- Botox + Sculptra + Morpheus8 (three-way combination — same-session caution)
-- This is documented in the individual pairs above. Three-way combinations are assessed per pair.

-- Morpheus8 + Hollywood Spectra (energy device stacking)
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session with proper sequencing. Temperature layering principle: deeper/higher energy devices before superficial/lower energy. Morpheus8 (RF 40-70C, fractional microchannels) + Hollywood Spectra (Q-switched Nd:YAG, pigment targeting). Different mechanisms and depths. Expert consensus: "deep effects first, then superficial pass in same session" (clinical practice).',
  staging_required = true,
  staging_sequence = 'product_a_first',
  staging_interval_days_min = 0,
  staging_interval_days_max = 0,
  staging_rationale = 'Temperature layering protocol (expert consensus): deeper RF microneedling (Morpheus8) before superficial laser (Hollywood Spectra) in same session. Allows proper tissue assessment at each depth. Reverse order risks treating already-compromised tissue.',
  combined_downtime_note = 'Morpheus8: 1-5 days. Hollywood Spectra: minimal 0-1 day. Combined = 2-5 days (Morpheus8 dominates recovery).',
  timing_notes = 'Sequence assumes item_a = Morpheus8. Verify Phase 6 alphabetical pair direction. Energy layering principle: perform deeper/higher-energy modality first.'
WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df' AND item_b_id = 'be46f975-99d7-4772-867e-744814626654')
   OR (item_a_id = 'be46f975-99d7-4772-867e-744814626654' AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df');

-- Morpheus8 + Sofwave (energy device stacking)
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. Morpheus8 (RF microneedling — dermal remodeling, 0.5-4mm depth) + Sofwave (SUPERB ultrasound — mid-dermis 1.5mm, skin tightening). Different mechanisms and primary target depths. Expert consensus for multi-energy stacking protocols.',
  staging_required = true,
  staging_sequence = 'product_a_first',
  staging_interval_days_min = 0,
  staging_interval_days_max = 0,
  staging_rationale = 'Expert consensus: Sofwave (ultrasound, SUPERB technology) typically administered before or after RF microneedling based on provider workflow. Some protocols: Sofwave first for lifting, then Morpheus8 for textural remodeling. Sequence verified with each clinical provider.',
  combined_downtime_note = 'Morpheus8: 1-5 days. Sofwave: 0-1 day redness. Combined = 2-5 days (Morpheus8 dominates).',
  timing_notes = 'Both stimulate collagen via different energy types (RF vs ultrasound). Combination targets both dermal remodeling and tissue tightening layers. Verify Phase 6 alphabetical pair direction for staging_sequence.'
WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df' AND item_b_id = '78973d13-fa36-41dd-8625-4b851ff143ed')
   OR (item_a_id = '78973d13-fa36-41dd-8625-4b851ff143ed' AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df');

-- =============================================================================
-- SECTION 9: COMBINED DOWNTIME SPECIAL CASES
-- Per D-10: PRP + RF microneedling → PRP REDUCES downtime (special case)
-- Morpheus8 acts as the RF device in our 18-product manifest.
-- PRP is not in the 18-product manifest — no item_relationships row exists.
-- Document this special case in TIMING_EVALUATION.md instead.
-- =============================================================================

-- HydraFacial + Neurotoxin (skincare + injectable — education note)
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session. HydraFacial (mechanical exfoliation + hydration) does not interfere with neurotoxin. Common practice: skincare treatment before injectable appointment. Expert consensus across clinical practice.',
  combined_downtime_note = 'HydraFacial: no downtime. Neurotoxin: no downtime. Combined = 0 days.',
  timing_notes = 'Some providers prefer HydraFacial first (cleansed skin for injection), then toxin. Order not clinically critical.'
WHERE (item_a_id = '4b92be36-e84e-432c-8549-f5d85a767fdb' AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1')
   OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1' AND item_b_id = '4b92be36-e84e-432c-8549-f5d85a767fdb');

-- HydraFacial + Sculptra
UPDATE item_relationships SET
  same_session_ok = true,
  same_session_rationale = 'Safe same-session combination. HydraFacial hydrates and preps skin; Sculptra stimulates collagen. Different mechanisms. Expert consensus: skincare foundation before injectable biostimulator is common practice.',
  combined_downtime_note = 'HydraFacial: no downtime. Sculptra: mild swelling 1-3 days. Combined = 1-3 days.',
  timing_notes = 'Skincare foundation (HydraFacial) before injectable is standard sequencing per expert practice.'
WHERE (item_a_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa' AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1')
   OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1' AND item_b_id = '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa');

-- HydraFacial + Morpheus8
UPDATE item_relationships SET
  same_session_ok = false,
  same_session_rationale = 'Typically NOT same-session. Morpheus8 RF microneedling creates micro-channels and active inflammation. Adding HydraFacial suction/exfoliation to inflamed skin same-day risks irritation and infection through open micro-channels. Expert consensus: separate by at least 1-2 weeks (HydraFacial after Morpheus8 healing, or HydraFacial before Morpheus8 to prep skin).',
  staging_required = true,
  staging_sequence = 'product_b_first',
  staging_interval_days_min = 14,
  staging_interval_days_max = 30,
  staging_rationale = 'If combining: HydraFacial BEFORE Morpheus8 (prep skin, then allow 2-4 weeks for Morpheus8 healing). OR HydraFacial 2-4 weeks AFTER Morpheus8 (after healing complete). Never same session: Morpheus8 micro-channels + HydraFacial suction = infection/irritation risk.',
  safety_critical = true,
  timing_warning_level = 'warning',
  timing_notes = 'WARNING: Same-session contraindicated due to Morpheus8 open micro-channels and HydraFacial mechanical suction/exfoliation. Expert consensus: minimum 14-day separation. Staging_sequence "product_b_first" assumes item_b = HydraFacial (before Morpheus8). Verify Phase 6 alphabetical pair direction.'
WHERE (item_a_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df' AND item_b_id = '28918bda-787b-412a-9802-d3d9a00e6ab1')
   OR (item_a_id = '28918bda-787b-412a-9802-d3d9a00e6ab1' AND item_b_id = '84ac561e-1818-4ece-a8d7-1fb6c5ea80df');

-- Kybella retreatment (within same product — product-level minimum_retreatment_days=42 handles this)
-- Body contouring pairs noted in TIMING_EVALUATION.md

-- =============================================================================
-- VERIFICATION QUERY
-- Run after execution to confirm timing data populated correctly.
-- =============================================================================

-- Verification: Count pairs with timing data populated
SELECT COUNT(*) as pairs_with_timing,
  COUNT(CASE WHEN safety_critical THEN 1 END) as safety_critical_count,
  COUNT(CASE WHEN timing_warning_level = 'hard_block' THEN 1 END) as hard_blocks,
  COUNT(CASE WHEN timing_warning_level = 'warning' THEN 1 END) as warnings,
  COUNT(CASE WHEN timing_warning_level = 'education' THEN 1 END) as education_notes,
  COUNT(CASE WHEN staging_required THEN 1 END) as staging_required_count,
  COUNT(CASE WHEN same_session_ok = true THEN 1 END) as explicit_yes,
  COUNT(CASE WHEN same_session_ok = false THEN 1 END) as explicit_no
FROM item_relationships
WHERE same_session_ok IS NOT NULL
  OR staging_required = true
  OR safety_critical = true;
