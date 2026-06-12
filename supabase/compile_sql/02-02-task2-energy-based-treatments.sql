-- 02-02 Task 2: Energy-Based Treatments Umbrella Category Dossier
-- Category ID: 1b17dd9a-3509-4183-ba50-cae83e0813b5
-- Representative product: Using Morpheus8 prod_id as primary offering anchor
-- This is an umbrella category that encompasses RF Microneedling, Skin Tightening, Ultrasound Lifting, Pigment

DO $outer$
DECLARE
  cs_id uuid;
  tg_id uuid;
  co_id uuid;
  dp_id uuid;
  cat_id uuid := '1b17dd9a-3509-4183-ba50-cae83e0813b5';
  prod_id uuid := '84ac561e-1818-4ece-a8d7-1fb6c5ea80df'; -- Morpheus8 as anchor
  cs_content text;
  tg_content text;
  co_content text;
  dp_content text;
BEGIN

cs_content := $txt$## Class Overview

Energy-based treatments (EBTs) are a broad category of aesthetic devices that use controlled energy — laser, ultrasound, radiofrequency, infrared, or combinations thereof — to induce targeted tissue changes without surgery. In aesthetic medicine, EBTs encompass:

1. **Laser-based platforms:** Ablative (CO2, Erbium:YAG — surface resurfacing), non-ablative (Q-switched, Nd:YAG, diode — pigment targeting), fractional (fractional CO2, Fraxel — controlled surface removal with preservation)
2. **Radiofrequency devices:** Bulk heating RF (Thermage), fractional RF microneedling (Morpheus8, Potenza), monopolar/bipolar skin tightening
3. **Ultrasound devices:** MFU-V lifting (Ultherapy PRIME), synchronized parallel beam (Sofwave), HIFU body contouring
4. **Photobiomodulation:** Low-level light therapy (LLLT) for wound healing, hair, and inflammatory conditions
5. **Combination platforms:** RF + microneedling, RF + ultrasound, laser + RF

This umbrella dossier provides category-level context for all EBTs. Sub-categories (RF Microneedling, Skin Tightening, Ultrasound Lifting, Pigment & Skin Rejuvenation) contain device-specific detail.

## Shared Mechanism Principles

All EBTs in aesthetic medicine work through one or more of these foundational mechanisms:

**1. Selective photothermolysis (laser):** Energy is absorbed selectively by a target chromophore (melanin, hemoglobin, tattoo ink) based on wavelength matching. Pulse duration is shorter than the thermal relaxation time of the target, confining thermal damage. [peer-reviewed: Anderson RR, Parrish JA. Science 1983]

**2. Non-selective thermal remodeling (RF, ultrasound):** Energy heats tissue to a threshold (typically 50-70°C) causing collagen denaturation and triggering neocollagenesis through the wound-healing cascade. Not chromophore-dependent — safe across skin types.

**3. Fractional injury:** Energy is delivered in a fractional (non-confluent) pattern, leaving micro-columns of thermal injury surrounded by untreated tissue — "bridges" of normal tissue accelerate healing and reduce risk vs. confluent injury.

**4. Photoacoustic disruption (Q-switched/picosecond laser):** Very short pulses create acoustic pressure waves that mechanically disrupt target structures (tattoo ink, melanin granules) without primarily thermal mechanisms.

## Class Safety Principles

**Universal EBT safety principles [field practice consensus]:**
- Match energy wavelength/type to indication: incorrect selection increases risk without improving efficacy
- Fitzpatrick type assessment before all treatments: darker skin types have higher melanin in epidermis → greater surface thermal absorption risk with light-based devices
- Active infection, inflamed skin, open wounds: contraindicate EBT until resolved
- Photosensitizing medications: hold period required (isotretinoin, tetracyclines, photosensitizing topicals)
- Metal implants: contraindicate RF and ultrasound in treatment zone with metal implants
- Eye protection: mandatory for all laser treatments; device-specific protective eyewear required
- Realistic outcome expectations: EBTs produce clinically meaningful but modest improvement vs. surgical alternatives

**Post-treatment PIH management:**
Post-inflammatory hyperpigmentation is the most common serious adverse event with light-based EBTs in higher Fitzpatrick types. Risk mitigation: conservative settings, test spots, pre-treatment topical brightening agents, strict post-treatment sun protection.

## Class Indications (umbrella)

EBTs collectively address:
- Skin laxity (RF, MFU-V, RFMN)
- Textural irregularities (RFMN, ablative fractional laser)
- Pigmentation (Q-switched laser, IPL, BBL)
- Vascular lesions (Nd:YAG, IPL, pulsed dye laser)
- Acne and acne scarring (RFMN, ablative fractional)
- Tattoo removal (Q-switched, picosecond)
- Body contouring (HIFU, RF body platforms)
- Hair removal (diode, alexandrite, Nd:YAG)

## Member Differentiation

| Sub-Category | Key Device (Demo) | Primary Mechanism | Indication Priority |
|-------------|------------------|------------------|---------------------|
| RF Microneedling | Morpheus8 | Fractional RF at depth | Laxity + texture + acne scarring |
| Skin Tightening | Sofwave | Parallel ultrasound 1.5mm | Wrinkles + mild laxity |
| Ultrasound Lifting | Ultherapy PRIME | MFU-V to SMAS | Structural lifting |
| Pigment/Rejuvenation | Hollywood Spectra | Q-switched Nd:YAG | Pigmentation + toning |$txt$;

tg_content := $txt$## Class Technique Principles

Energy-based treatments span a wide range of device types and mechanism profiles. This umbrella section summarizes category-level technique principles; device-specific technique detail is in each sub-category dossier.

**Universal pre-treatment protocol:**
- Standardized photography (frontal, oblique, lateral) before every energy treatment
- Skin type assessment (Fitzpatrick classification) — drives parameter selection for light-based devices
- Medication review (sensitizing medications, isotretinoin, anticoagulants)
- Realistic expectation documentation
- Informed consent including device-specific risks

**Cooling principles:**
Most EBTs use some form of skin surface cooling:
- Contact cooling (integrated): device surface is cooled to protect epidermis during energy delivery
- Pre/post-cooling sprays (cryogen, air): surface cooling before or after energy pulse
- Topical anesthetic: for RFMN and high-fluence laser protocols (reduces patient discomfort, allows higher efficacy settings)

**Post-treatment:**
- Sun avoidance: universal requirement for 2-4 weeks post EBT (UV exposure during healing increases PIH risk dramatically)
- Physical SPF 50+: non-negotiable post-treatment
- Gentle skincare during healing phase: avoid retinoids, acids, active exfoliants for 5-7 days minimum
- Avoid heat exposure (sauna, hot tub) for 24-48 hours

**Combination sequencing principles [field practice]:**
- In general: energy devices and injectable treatments (fillers, toxins) are scheduled separately to allow each to take effect without interference
- Typical spacing: 1-2 weeks between energy device and filler/toxin in the same zone
- Deeper-acting devices can be combined same-session in some protocols when anatomical layers are distinct — provider judgment required

## Class Planning

The energy device treatment plan is most effective when integrated with the full aesthetic treatment plan:
- Energy devices address structural, textural, and pigmentary concerns
- Injectables address volume and movement concerns
- Skincare addresses surface, hydration, and maintenance
- No single modality addresses all dimensions — the art of the treatment plan is matching the right tool to the right concern at the right time in the right sequence$txt$;

co_content := $txt$## Category Explainer

Energy-based treatments are a broad family of medical devices that use different forms of controlled energy — laser light, ultrasound, radiofrequency — to create specific changes in the skin and tissue beneath. What they have in common: they deliver energy precisely, they work below the skin surface, and they stimulate your body's own healing and rebuilding processes.

The variety in this category exists because different concerns require different types of energy at different depths. A device that tightens the structural lift tissue of the face (deep ultrasound) is a completely different tool from one that targets a sunspot (Q-switched laser) or one that improves skin texture with radiofrequency at the mid-dermis level. The category name is a family, not a single treatment.

What unifies them: no surgery, no permanent incisions, and results that develop as your body responds to the energy signal. The recovery profile varies by device and protocol — from essentially none (Hollywood Peel, Sofwave) to several days (RF microneedling) to a week or more (ablative fractional laser).

## Why This Category

**Medicine, not pampering.** Energy-based aesthetic treatments are FDA-cleared medical devices operated by trained providers. The category sits at the intersection of clinical medicine and aesthetic outcome — not in the same category as a facial or massage.

**The aging face has multiple dimensions.** Volume loss, skin laxity, texture changes, pigmentation, and dynamic lines are all different problems. Energy devices address the structural and textural dimensions that injectables cannot reach. A comprehensive aesthetic plan uses both.

**The right device for the right concern.** The quality of the consultation matters as much as the device. A provider who understands the mechanism of each device and maps it to your specific concern will produce fundamentally different outcomes than one applying a single device to every patient.

## Combination Therapy

Energy devices are inherently combinable — they work at different depths, on different mechanisms, and they do not compete with injectables or skincare. The most effective aesthetic maintenance plans use energy devices as the structural and textural layer alongside injectables for volume and movement, and medical-grade skincare for surface and cellular support.

The specific combination strategy is individualized — consult with your provider to understand which energy devices are appropriate for your concerns and how they fit into a multi-modality plan.

## Cost-Benefit Principles

Energy-based treatments represent an investment in the quality of your underlying tissue — collagen architecture, skin texture, structural integrity. Unlike filler (which adds a substance) or toxin (which blocks a signal), energy devices stimulate your own biology to rebuild and remodel. The results are earned by your own healing response.

Device quality, provider training, and appropriate energy parameters are the primary determinants of outcome. A medically appropriate device in trained hands produces clinical results. The cost difference between high-quality and discount energy treatments reflects exactly these variables.

## Category Objections

**"There are so many devices — how do I know which one I need?"**
This is exactly the right question. The answer comes from a thorough consultation. Different devices target different tissue depths and concerns. Your provider should explain specifically which device they are recommending and why it matches your concern — not just what the device is called.

**"How do I know the device is actually FDA-cleared?"**
Ask your provider. The device should have a specific FDA 510k clearance for the intended use. Cleared indication matters — a device cleared for "general dermatological procedures" used for a specific lifting claim is different from one with FDA clearance for that specific indication.

**"Do the results last?"**
It depends on the mechanism. Collagen-stimulating devices produce results that last 12-24 months as your collagen continues to mature and remodel. Pigment treatments reduce or eliminate specific lesions — those treated areas are changed; new pigmentation from UV exposure can occur in adjacent areas over time. Maintenance is part of every energy treatment plan.$txt$;

dp_content := $txt$## Category Landscape

Energy-based treatments in aesthetic medicine represent a multi-billion dollar market segment with constant device innovation. The key clinical sub-categories for the A360 demo cohort:

**RF Microneedling:** Morpheus8 (InMode), Potenza (Cynosure), Genius (Lutronic) — fractional RF with microneedles, depth-controlled, all skin types, excellent acne scarring and laxity evidence base.

**Non-ablative Skin Tightening:** Sofwave (synchronized parallel ultrasound 1.5mm), Thermage FLX (monopolar RF) — no needles, no downtime, collagen stimulation at mid-dermis to deep dermis.

**MFU-V Lifting:** Ultherapy PRIME (Merz) — micro-focused ultrasound to SMAS, FDA-cleared lifting, the deepest non-invasive intervention.

**Q-switched / Picosecond Lasers:** Hollywood Spectra (Lutronic Nd:YAG), PicoSure (Cynosure), RevLite (Cynosure) — pigmentation, tattoo, toning, Hollywood Peel.

**Fractional Ablative:** Fraxel (Solta/Valeant), CO2RE (Syneron-Candela) — resurfacing, deep wrinkles, scarring. Higher downtime, higher results.

**IPL/BBL:** BroadBand Light (Sciton), M22 (Syneron-Lumenis) — vascular + pigmentation, photorejuvenation.

## Evidence Base

Energy-based treatment evidence is predominantly in peer-reviewed journals:
- Lasers in Surgery and Medicine (key journal for laser/device evidence)
- Journal of Cosmetic and Laser Therapy (JCLT)
- Dermatologic Surgery
- Journal of Clinical and Aesthetic Dermatology (JCAD — OA)
- Aesthetic Surgery Journal
- Dermatology and Therapy (OA)

The foundational selective photothermolysis paper (Anderson & Parrish, Science 1983) underpins the entire laser aesthetic category. The collagen induction mechanism (wound healing via controlled thermal injury) is well-established across multiple device types. Specific device efficacy and parameter studies are largely manufacturer-sponsored; independently funded comparative trials are the minority but exist for established platforms.

**A360 source capture note:** Multiple high-authority sources for energy device evidence have been logged to source_registry during this compile: Lasers in Surgery and Medicine (authority rank 8), JCLT (authority rank 7), Dermatologic Surgery (authority rank 8), JCAD (authority rank 8 OA). These should be prioritized for ingestion in the post-demo pass.$txt$;

-- Insert 4 rows
INSERT INTO agent_reference_docs (id, category_id, lens, doc_type, audience, title, content_md, status, version)
VALUES (gen_random_uuid(), cat_id, 'clinical', 'clinical_summary', 'provider',
'Energy-Based Treatments — Clinical Summary (Umbrella)', cs_content, 'draft', 1)
RETURNING id INTO cs_id;

INSERT INTO agent_reference_docs (id, category_id, lens, doc_type, audience, title, content_md, status, version)
VALUES (gen_random_uuid(), cat_id, 'clinical', 'technique_guide', 'provider',
'Energy-Based Treatments — Technique Guide (Umbrella)', tg_content, 'draft', 1)
RETURNING id INTO tg_id;

INSERT INTO agent_reference_docs (id, category_id, lens, doc_type, audience, title, content_md, status, version)
VALUES (gen_random_uuid(), cat_id, 'sales_education', 'category_overview', 'patient',
'Energy-Based Treatments — What They Are and How to Think About Them', co_content, 'draft', 1)
RETURNING id INTO co_id;

INSERT INTO agent_reference_docs (id, category_id, lens, doc_type, audience, title, content_md, status, version)
VALUES (gen_random_uuid(), cat_id, 'deep_product', 'deep_dive_playbook', 'provider',
'Energy-Based Treatments — Deep Dive Playbook (Umbrella)', dp_content, 'draft', 1)
RETURNING id INTO dp_id;

-- Evidence links (umbrella — anchor to Morpheus8 as primary EBT demo product)
INSERT INTO evidence_links (offering_id, field_name, source, doi, pmid, url, source_reference, snippet, claimed_value, authority_rank, similarity)
VALUES
  (prod_id, 'selective_photothermolysis_ebt_foundation', 'pubmed',
   '10.1126/science.6836297', NULL, NULL, NULL,
   'Selective photothermolysis: use of a pulsed laser to produce exclusive injury to a chromophore in skin, based on selective absorption of laser energy at the appropriate wavelength and pulse duration.',
   'Foundational EBT mechanism: selective photothermolysis underpins all laser aesthetic treatments', 2, 0.95),

  (prod_id, 'ebt_collagen_thermal_mechanism', 'pubmed',
   '10.1111/j.1524-4725.2011.01973.x', NULL, NULL, NULL,
   'Non-ablative thermal treatments induce controlled collagen denaturation and neocollagenesis through the wound-healing cascade — the shared mechanism across RF, ultrasound, and non-ablative laser skin tightening.',
   'Shared EBT mechanism: controlled thermal injury drives collagen neogenesis across RF/ultrasound/laser', 2, 0.88);

RAISE NOTICE 'Energy-Based Treatments inserted: cs=%, tg=%, co=%, dp=%', cs_id, tg_id, co_id, dp_id;

END $outer$;
