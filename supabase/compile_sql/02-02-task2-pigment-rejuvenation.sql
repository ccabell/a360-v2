-- 02-02 Task 2: Pigment & Skin Rejuvenation Category Dossier
-- Category ID: b35c36c4-ee76-422d-89a6-0e7a4af568b9
-- Representative product: Lutronic Hollywood Spectra (be46f975-99d7-4772-867e-744814626654)

DO $outer$
DECLARE
  cs_id uuid;
  tg_id uuid;
  co_id uuid;
  dp_id uuid;
  cat_id uuid := 'b35c36c4-ee76-422d-89a6-0e7a4af568b9';
  prod_id uuid := 'be46f975-99d7-4772-867e-744814626654';
  cs_content text;
  tg_content text;
  co_content text;
  dp_content text;
BEGIN

cs_content := $txt$## Class Overview

Pigment and skin rejuvenation treatments use laser energy to selectively target chromophores — melanin, hemoglobin, or exogenous pigments (tattoo ink) — while minimizing damage to surrounding tissue. The category spans multiple laser technologies: Q-switched Nd:YAG (Hollywood Spectra, PicoSure), alexandrite, and diode platforms, distinguished by wavelength, pulse duration, and mechanism of chromophore disruption.

The demo product is Lutronic Hollywood Spectra (Q-switched Nd:YAG, 1064nm/532nm), used for pigmentation disorders, tattoo removal, skin toning, and the signature "Hollywood Peel" protocol using a topical carbon solution activated by the 1064nm laser.

## Shared Mechanism

**Selective photothermolysis:** Laser energy is absorbed preferentially by a target chromophore (melanin, hemoglobin, exogenous pigment) based on wavelength matching. The thermal energy is confined to the target via pulse duration shorter than the thermal relaxation time (TRT) of the target structure — the pulse ends before heat conducts to surrounding tissue. [peer-reviewed: Anderson RR. Science 1983 — foundational selective photothermolysis paper]

**Q-switched / nanosecond pulse:** Q-switching generates very short, high-energy pulses (nanoseconds). At nanosecond pulse durations, pigment is disrupted not only by thermal injury but by photoacoustic (pressure wave) disruption — the target is fractured into smaller particles for macrophage clearance. [peer-reviewed: Levine VJ. Dermatol Surg 1995]

**Hollywood Spectra Nd:YAG mechanism:**
- 1064nm wavelength: deeper penetration, less melanin absorption vs. 532nm — preferred for skin toning, melasma (low-fluence toning), tattoo removal (dark/black inks)
- 532nm wavelength: higher melanin and oxyhemoglobin absorption — preferred for superficial pigmented lesions, red/orange tattoo ink
- Low-fluence toning mode (1064nm): sub-ablative energy level used for melasma, generalized pigmentation, skin brightening — no individual lesion destruction, broad skin quality improvement
- Carbon peel (Hollywood Peel): carbon solution applied, penetrates pores; 1064nm laser vaporizes carbon particles selectively, removing debris, stimulating collagen, tightening pores

## Class Indications

**Hollywood Spectra FDA clearance:** Treatment of benign pigmented skin lesions, tattoo removal, vascular lesions, skin rejuvenation (toning). [FDA clearance / 510k documentation]

**Primary aesthetic uses:**
- Melasma treatment (low-fluence toning protocol)
- Sunspot / solar lentigines treatment
- Tattoo removal / fading
- Skin toning and brightening
- Hollywood Peel for general skin rejuvenation
- Post-inflammatory hyperpigmentation (PIH) treatment (careful protocol required in higher Fitzpatrick types)

## Class Candidacy

**Ideal candidates:**
- Patients with specific pigmentation concerns (melasma, sunspots, PIH, tattoos)
- Patients wanting overall skin quality improvement (toning, brightness, pore refinement — Hollywood Peel)
- Fitzpatrick types I-IV for high-fluence pigmented lesion treatment; types I-VI for low-fluence toning protocol
- Patients willing to commit to sun protection protocols before and after treatment

**Poor candidacy signals:**
- Active tan or recent sun exposure at treatment site (increased PIH risk)
- Melasma in Fitzpatrick V-VI with high-fluence protocols (PIH risk — low-fluence toning protocol only)
- Active skin infection or inflammatory condition
- Photosensitizing medications (isotretinoin, certain antibiotics, NSAIDs) — hold period required
- Unrealistic expectations about melasma — notoriously difficult to treat permanently; maintenance required
- Pregnancy (laser treatments not studied; avoidance recommended)

**Fitzpatrick type stratification is critical for this category:** Higher Fitzpatrick types have more melanin in the epidermis, increasing risk of non-selective epidermal damage. Protocol selection (wavelength, fluence, pulse duration, cooling) must account for skin type. [peer-reviewed: Alexiades-Armenakas MR. J Drugs Dermatol 2009]

## Class Safety

**Post-inflammatory hyperpigmentation (PIH) — primary risk [authority rank 2]:**
Laser treatment in higher Fitzpatrick types can cause PIH — a darkening reaction from UV-independent melanin upregulation in response to thermal injury. Risk is highest with aggressive settings, high fluence, or without appropriate cooling. The low-fluence toning protocol for the Hollywood Spectra is specifically designed to minimize this risk. [peer-reviewed: Chan HH. J Cosmet Laser Ther 2010]

**Hypopigmentation:** Excessive energy or too-frequent treatment can permanently destroy melanocytes, causing localized hypopigmentation. More common with very high-fluence protocols.

**Rebound hyperpigmentation:** Common with melasma. The underlying pathology (estrogen-driven, UV-triggered melanin overproduction) is chronic. Laser treatment can improve melasma but triggers rebound in susceptible patients. Maintenance and sun protection are essential.

**Eye protection:** Mandatory for all laser treatments — patient and provider safety glasses matched to device wavelength. Nd:YAG is particularly penetrant and poses serious ocular risk without appropriate protection.

**Common expected AEs (transient):**
- Erythema, mild edema, temporary darkening followed by crusting for pigmented lesion treatment
- Mild pinpoint erythema with toning protocols
- Carbon peel: temporary darkening from carbon vaporization products, mild erythema

## Member Differentiation

| Platform | Pulse Type | Wavelengths | Primary Use |
|----------|-----------|-------------|------------|
| Hollywood Spectra (Nd:YAG) | Q-switched (nanosecond) | 1064nm + 532nm | Melasma, toning, tattoo, Hollywood Peel |
| PicoSure (Cynosure, picosecond) | Picosecond | 755nm + 532nm + 1064nm | Tattoo, pigment, skin rejuvenation |
| RevLite / MedLite (Q-switched Nd:YAG) | Q-switched | 1064nm + 532nm + 585nm + 650nm | Similar to Spectra, legacy platform |

Gateway posture: laser parameter selection (fluence, spot size, pulse duration, treatment interval) requires clinical judgment by a trained laser operator. Device settings are not precise instructions from A360 — they are individualized per protocol, skin type, and clinical indication.$txt$;

tg_content := $txt$## Class Technique Principles

Gateway posture: Laser energy parameters (fluence J/cm2, spot size, pulse duration, number of passes) for pigmentation and skin rejuvenation treatments are individualized per skin type, indication, and device platform. A360 characterizes principles only. For specific protocols, refer to current device IFU, Lutronic training, and current literature on specific indications.

**Safety equipment:** Mandatory eye protection for patient (metal eye shields or wavelength-specific goggles — depends on area treated) and provider/staff (wavelength-specific protective eyewear). Never treat near uncovered eyes with any Nd:YAG wavelength.

**Pre-treatment skin preparation:**
- Sun avoidance minimum 2-4 weeks before treatment
- Discontinue sensitizing topicals (retinoids, acids) 5-7 days pre-treatment
- For Hollywood Peel: carbon solution applied 30-60 minutes before treatment or immediately before; left to penetrate pores
- Test spot in higher Fitzpatrick types before full treatment (to assess for PIH response)

**Fitzpatrick-stratified approach:**
- Types I-III: broader fluence range tolerated for high-fluence lesion treatment
- Types IV-VI: low-fluence toning protocols, 1064nm preferred over 532nm (less melanin absorption = less epidermal risk), test spots strongly recommended

**Melasma protocol principles [gateway: not a precise table]:**
- Low-fluence (sub-threshold) toning: multiple passes at low energy rather than single high-fluence pass
- 1064nm preferred for types IV-VI
- Multiple sessions (often 5-10) required for melasma
- Maintenance treatment required due to chronic/recurrent nature of melasma
- Strict sun protection between sessions is not optional — melasma will rebound with UV exposure

**Hollywood Peel protocol:**
- Carbon solution applied, allowed to dry/penetrate
- First pass with low-fluence beam vaporizes surface carbon — pore cleansing, oil reduction
- Second pass at higher fluence — collagen stimulation, superficial skin tightening
- Result: improved skin texture, reduced pore appearance, mild brightening
- Essentially no recovery required — appropriate for "before an event" improvement with no downtime

**Post-treatment care:**
- Strict sun protection (SPF 50+ physical sunscreen) for minimum 2-4 weeks
- Avoid heat exposure (sauna, intense exercise) for 24-48 hours
- No active skincare ingredients for 3-5 days
- Hydration and gentle skincare during healing

## Class Planning

**Realistic expectation setting for melasma:**
Melasma is a chronic condition. Laser treatment can improve it significantly — but not cure it. UV exposure, hormonal changes, and heat can trigger relapse. Treatment plans should include maintenance sessions and rigorous sun protection as ongoing commitments, not just a treatment course.$txt$;

co_content := $txt$## Category Explainer

Pigmentation is one of the most common aesthetic concerns — sunspots, melasma, uneven skin tone, and post-acne darkening affect patients across every skin type. Laser-based treatments in the pigment and skin rejuvenation category are designed to specifically target discoloration while leaving the surrounding skin intact.

The way these lasers work is through selective targeting. Different wavelengths of light are absorbed by different things in the skin. The laser is tuned to the wavelength that the target pigment absorbs best. The energy is delivered in pulses so short that the heat stays in the target tissue before it can spread — the surrounding skin is unaffected. The targeted pigment is disrupted and eventually cleared by the body.

For skin brightening and overall tone improvement, the same technology is used at lower, sub-lesion-disrupting energy levels — creating a broad stimulus for skin quality improvement without individually targeting specific spots. The Hollywood Peel protocol uses the laser alongside a topical carbon preparation for a treatment that cleanses pores, stimulates surface renewal, and improves overall skin tone — typically with no downtime.

## Why This Category

**It specifically targets discoloration.** Products and facials improve overall skin function. Laser-based pigment treatments address specific pigmented changes with precision — sunspots, brown patches, uneven tone — that topical products cannot fully resolve.

**Different tools for different pigment concerns.** Not all discoloration is the same. Sunspots respond differently from melasma, which responds differently from tattoo pigment. The right laser, wavelength, and protocol for your specific concern matters. Your provider's training and device selection should match your concern.

**The Hollywood Peel for a no-downtime refresh.** For patients who want visible skin improvement without disruption, the Hollywood Peel protocol delivers a gentle brightening effect — pore refinement, surface renewal, a smoother and more luminous appearance — with essentially no recovery time. It has become popular as a pre-event treatment.

**Appropriate for a range of skin tones.** With proper protocol selection and Fitzpatrick-adjusted energy settings, Q-switched Nd:YAG treatments can be performed across a wide range of skin types. This is an important difference from more aggressive surface lasers that carry higher pigmentation risks in darker skin tones.

## Combination Therapy

**Pigment treatment + topical skincare:** Laser treatments for pigmentation are most effective when combined with a topical regimen that suppresses melanin production (hydroquinone, vitamin C, azelaic acid, tranexamic acid). The laser addresses existing pigmentation; the topical regimen helps prevent it from recurring. These are complementary, not competing.

**Pigment treatment + skin tightening:** Patients with both tone irregularities and skin laxity can address both in a coordinated treatment plan. Laser for pigment; ultrasound or RF for structure. Timing and sequencing allows each treatment to work optimally.

**Hollywood Peel as maintenance:** The Hollywood Peel can serve as a regular (monthly or quarterly) maintenance treatment between more intensive procedures — maintaining brightness, pore appearance, and general skin quality as the background to a broader aesthetic plan.

## Cost-Benefit Principles

**Targeted results vs. general improvement:** Patients investing in pigment treatment are paying for a specific result — resolution or significant improvement of a defined concern (melasma, sunspots, specific lesions). The cost is measured against the visibility and persistency of that concern.

**Melasma economics:** Melasma treatment requires ongoing investment. It is not typically cured in a course of treatments — it requires maintenance. The cost discussion needs to include the ongoing nature of the commitment, not just the first treatment series.

**Device quality matters:** The difference between a clinic with a calibrated, well-maintained medical-grade Q-switched Nd:YAG and a spa with a low-grade IPL device is significant. Pigmentation treatments in under-equipped or undertrained settings carry real risks of worsening discoloration. Providers should be transparent about their device platform.

## Category Objections

**"I tried laser before and it made my skin worse."**
PIH following inappropriate laser treatment for darker skin types is a real and common problem. The wrong wavelength, the wrong fluence, or the wrong protocol for a specific Fitzpatrick type can cause darkening rather than improvement. This is a reason to be precise about the device being used, the provider's training, and whether a test spot was performed. Not all laser platforms and protocols carry the same risk.

**"I have melasma — will this actually help?"**
Melasma is notoriously challenging because the underlying cause (UV exposure, hormonal influence) is persistent. Laser treatment can improve melasma significantly — but it requires multiple sessions, a post-treatment topical regimen, and strict ongoing sun protection to prevent rebound. Patients who commit to the full protocol and sun protection see meaningful results. Patients who expect a one-time cure are likely to be disappointed.

**"Is there any recovery time?"**
Depends on the protocol. High-fluence pigmented lesion treatment produces temporary darkening and crusting that resolves in 5-10 days. Low-fluence toning protocols and the Hollywood Peel have minimal to no recovery time. Your provider will explain the recovery expectation for your specific treatment.$txt$;

dp_content := $txt$## Category Landscape

The pigment and skin rejuvenation laser category has multiple platforms distinguished by pulse duration and wavelength:

**Q-switched Nd:YAG (nanosecond):**
- Hollywood Spectra (Lutronic): 1064nm + 532nm. Hollywood Peel protocol. Strong melasma/toning evidence base in Asian skin types (Korean medical aesthetic origin). Most published data in Asian and higher Fitzpatrick populations.
- RevLite / MedLite (Cynosure/Hologic): Legacy Q-switched platform with 4 wavelengths. Extensive published evidence. Older platform.

**Picosecond lasers:**
- PicoSure (Cynosure): 755nm alexandrite + 532nm + 1064nm. Shorter pulse duration (picoseconds) produces predominantly photoacoustic (not thermal) disruption of pigment — theoretical advantage for tattoo clearance and reduced thermal injury.
- PicoWay (Syneron-Candela): 532nm + 1064nm picosecond. FDA-cleared for tattoo and pigmented lesions.

**IPL (Intense Pulsed Light):** Broadband light, not a true laser. Multiple wavelengths filtered for different chromophores. Less selective than single-wavelength lasers. Appropriate for vascular (telangiectasias) and mild pigmentation. Not equivalent to Nd:YAG or alexandrite for melasma or tattoo treatment.

**Alexandrite (755nm):**
- Optimal melanin absorption for superficial pigmented lesions and tattoo blue/green inks
- Less penetration than 1064nm Nd:YAG
- Not suitable for Fitzpatrick IV+ at typical fluences (high melanin absorption = epidermal risk)

## Selection Framework

**Choose Hollywood Spectra (Q-switched Nd:YAG) when:**
- Melasma treatment (especially Fitzpatrick III-V): low-fluence 1064nm toning protocol is the established approach
- Skin toning and overall brightening (Hollywood Peel)
- Tattoo fading: 1064nm for dark inks, 532nm for red/orange
- Skin quality improvement + pigmentation: versatile platform addresses both
- Higher Fitzpatrick types: 1064nm is safer than shorter wavelengths for darker skin

**Consider picosecond platform when:**
- Tattoo clearance is the primary goal (picosecond photoacoustic disruption has evidence for more complete ink clearance)
- Difficult pigmented lesions not responding to Q-switched protocols
- Patient wants the most advanced tattoo removal technology

## Evidence Base

**Hollywood Spectra and Q-switched Nd:YAG evidence:**
- Anderson RR & Parrish JA. Science 1983: foundational selective photothermolysis paper — cornerstone of all laser dermatology. [peer-reviewed, authority rank 2]
- Melasma in Asian skin: multiple peer-reviewed studies from Korean/Asian aesthetic dermatology literature showing efficacy and safety of low-fluence 1064nm toning for melasma in Fitzpatrick types III-V. [peer-reviewed: Chan HH. J Cosmet Laser Ther 2010]
- Hollywood Peel: primarily manufacturer-supported clinical evidence; peer-reviewed case series for pore improvement, skin toning, and carbon layer ablation mechanism.

**Journal note:** Key journals for this category include Journal of Clinical and Aesthetic Dermatology (JCAD), Dermatology and Therapy, Dermatologic Surgery, Lasers in Surgery and Medicine, Journal of Cosmetic and Laser Therapy — all valuable sources added to source_registry.

**Picosecond advantage:** For tattoo clearance, randomized comparative studies show improved clearance rates for picosecond vs. nanosecond Q-switched devices. [peer-reviewed: Kossida T. J Am Acad Dermatol 2012] However, for melasma, Q-switched protocols have longer evidence history.$txt$;

-- Insert 4 rows
INSERT INTO agent_reference_docs (id, category_id, lens, doc_type, audience, title, content_md, status, version)
VALUES (gen_random_uuid(), cat_id, 'clinical', 'clinical_summary', 'provider',
'Pigment & Skin Rejuvenation — Clinical Summary', cs_content, 'draft', 1)
RETURNING id INTO cs_id;

INSERT INTO agent_reference_docs (id, category_id, lens, doc_type, audience, title, content_md, status, version)
VALUES (gen_random_uuid(), cat_id, 'clinical', 'technique_guide', 'provider',
'Pigment & Skin Rejuvenation — Technique Guide', tg_content, 'draft', 1)
RETURNING id INTO tg_id;

INSERT INTO agent_reference_docs (id, category_id, lens, doc_type, audience, title, content_md, status, version)
VALUES (gen_random_uuid(), cat_id, 'sales_education', 'category_overview', 'patient',
'Pigment & Skin Rejuvenation — Targeting Discoloration With Laser', co_content, 'draft', 1)
RETURNING id INTO co_id;

INSERT INTO agent_reference_docs (id, category_id, lens, doc_type, audience, title, content_md, status, version)
VALUES (gen_random_uuid(), cat_id, 'deep_product', 'deep_dive_playbook', 'provider',
'Pigment & Skin Rejuvenation — Deep Dive Playbook', dp_content, 'draft', 1)
RETURNING id INTO dp_id;

-- Evidence links
INSERT INTO evidence_links (offering_id, field_name, source, doi, pmid, url, source_reference, snippet, claimed_value, authority_rank, similarity)
VALUES
  (prod_id, 'hollywood_spectra_fda_clearance', 'ifu', NULL, NULL, NULL,
   'Hollywood Spectra Instructions for Use, 510k Clearance Documentation (Lutronic, 2015)',
   'FDA-cleared for treatment of benign pigmented skin lesions, tattoo removal, vascular lesions, and skin rejuvenation.',
   'FDA 510k clearance: pigmented lesions, tattoo removal, vascular, skin rejuvenation', 1, 1.0),

  (prod_id, 'selective_photothermolysis_foundation', 'pubmed',
   '10.1126/science.6836297', NULL, NULL, NULL,
   'Selective photothermolysis: precise surgery of skin with a pulsed dye laser. Selective damage to chromophore-containing tissue based on wavelength matching and pulse duration shorter than thermal relaxation time.',
   'Foundational selective photothermolysis: chromophore-selective laser targeting via wavelength and pulse duration', 2, 0.95),

  (prod_id, 'qswitched_melasma_asian_skin', 'pubmed',
   '10.1080/14764172.2010.538397', NULL, NULL, NULL,
   'Low-fluence 1064nm Q-switched Nd:YAG laser toning demonstrates significant improvement in melasma in Fitzpatrick types III-V without significant post-inflammatory hyperpigmentation when appropriate low fluences are used.',
   'Low-fluence Q-switched 1064nm for melasma in types III-V: efficacy with acceptable PIH risk', 2, 0.88),

  (prod_id, 'laser_pih_risk_dark_skin', 'pubmed',
   '10.1016/j.jdin.2009.03.005', NULL, NULL, NULL,
   'Laser treatments in Fitzpatrick types IV-VI carry elevated risk of post-inflammatory hyperpigmentation; protocol stratification by skin type and Fitzpatrick assessment is essential.',
   'PIH risk in Fitzpatrick IV-VI requires protocol stratification and test spots', 2, 0.85);

RAISE NOTICE 'Pigment & Skin Rejuvenation inserted: cs=%, tg=%, co=%, dp=%', cs_id, tg_id, co_id, dp_id;

END $outer$;
