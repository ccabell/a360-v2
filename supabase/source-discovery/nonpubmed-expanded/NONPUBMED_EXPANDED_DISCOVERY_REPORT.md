# Expanded Non-PubMed Journal Discovery Report

Generated: 2026-06-14

This is an additional non-PubMed discovery pass. It does not use PubMed E-utilities, PMIDs, or PubMed URLs. It expands beyond the first pass into more journals and more medspa-specific query terms.

## Exhaustiveness Note
This is broader than the first pass, but still not mathematically exhaustive. True exhaustiveness would require publisher-specific crawling/API handling for each journal archive and manual handling for sites that block automated access. This pass is designed to find more high-value candidates without flooding the queue.

## Summary
- Additional journals targeted: 12
- Query terms: 37
- Crossref search calls: 706
- Prior records deduped against: 296 titles / 264 DOIs
- New unique non-PubMed records found: 1813
- New A/B quality candidates in SQL: 1092
- Errors logged: 108

## Output Files
- `nonpubmed_expanded_quality_triage.csv`
- `nonpubmed_expanded_results.json`
- `nonpubmed_expanded_ingestion_queue_inserts.sql`
- `nonpubmed_expanded_source_registry_inserts.sql`
- `nonpubmed_expanded_errors.log`

## Quality Tiers
| Tier | Records |
|---|---:|
| A | 669 |
| B | 423 |
| C | 612 |
| D | 109 |

## Journal Breakdown
| Journal | Records |
|---|---:|
| Dermatologic Surgery | 335 |
| Journal of Cosmetic Dermatology | 256 |
| Aesthetic Surgery Journal | 236 |
| Journal of Cosmetic and Laser Therapy | 178 |
| Journal of Cutaneous and Aesthetic Surgery | 158 |
| Clinical, Cosmetic and Investigational Dermatology | 140 |
| Facial Plastic Surgery | 128 |
| Journal of Aesthetic Nursing | 124 |
| Cosmetics | 106 |
| Facial Plastic Surgery & Aesthetic Medicine | 82 |
| Plastic and Aesthetic Research | 70 |

## Topic Breakdown
| Topic | Records |
|---|---:|
| lasers_energy_devices | 574 |
| combination_therapy | 497 |
| dermal_fillers | 439 |
| injectables_neurotoxins | 284 |
| skin_quality_peels | 282 |
| rf_microneedling_ultrasound | 256 |
| practice_safety | 234 |
| regenerative_prp | 210 |
| body_contouring | 183 |
| glp1_aesthetics | 96 |

## Dossier Use Buckets
| Bucket | Records |
|---|---:|
| clinical_gateway_source | 834 |
| safety_floor | 636 |
| source_only_reference | 597 |
| structured_taxonomy_support | 508 |
| sales_education_support | 363 |
| timing_maintenance | 287 |
| combination_observation | 263 |

## Top New Candidates
| Tier | DOI | Title | Journal | Year | Rights | Buckets |
|---|---|---|---|---:|---|---|
| A | 10.20517/2347-9264.2022.91 | Fat grafting in autologous breast reconstruction: applications, outcomes, safety, and complications | Plastic and Aesthetic Research | 2023 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2025.28 | Asymmetric spindle skin harvesting combined with continuous Z skin grafting: experience in correcting ... | Plastic and Aesthetic Research | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.25259/jcas_140_2024 | Facial hair restoration using long hair follicular unit extraction – A case of beard to moustache tran... | Journal of Cutaneous and Aesthetic Surgery | 2025 | open_access_cc_by_nc | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.25259/jcas_154_2024 | A combined treatment for skin laxity using fillers and technologies associated: The sandwich protocol | Journal of Cutaneous and Aesthetic Surgery | 2026 | open_access_cc_by_nc | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.25259/jcas_45_23 | Comparative study of microneedling monotherapy versus microneedling with autologous platelet-rich plas... | Journal of Cutaneous and Aesthetic Surgery | 2024 | open_access_cc_by_nc | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.25259/jcas_70_24 | A comparative study to evaluate the safety and efficacy of low-dose isotretinoin monotherapy versus a ... | Journal of Cutaneous and Aesthetic Surgery | 2024 | open_access_cc_by_nc | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.25259/jcas_94_2024 | Novel management of scarred recurrent intradermal nevus on the nasal tip through tri-lobe flap and sca... | Journal of Cutaneous and Aesthetic Surgery | 2025 | open_access_cc_by_nc | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.25259/jcas_98_2025 | Facial contouring with the S.H.A.P.E. technique: A case series on buccal fat reduction | Journal of Cutaneous and Aesthetic Surgery | 2025 | open_access_cc_by_nc | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.3390/cosmetics11030100 | A Split-Face Comparison of Novel Microneedle Patch versus Botulinum Toxin-A and Microneedle Patch for ... | Cosmetics | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.3390/cosmetics11030101 | Effects of CE Ferulic® Combined with Microneedling in the Treatment of Pigmentary Disorders: A Monocen... | Cosmetics | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.3390/cosmetics12050212 | Exploratory Evaluation of a Hyper-Diluted Calcium Hydroxyapatite–Hyaluronic Acid Combination for Facia... | Cosmetics | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.3390/cosmetics13010001 | Prospective Multicentre Real-World Study of a Bioregenerative Combination Therapy with Polynucleotide ... | Cosmetics | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.3390/cosmetics13020074 | Bioactive Proteolytic Enzymes Chymotrypsin and Papain as Adjuvants to Laser Hair Removal: Reducing the... | Cosmetics | 2026 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.3390/cosmetics13020098 | Efficacy and Safety of Combination Therapy of Intense Pulsed Light and Topical Tranexamic Acid in the ... | Cosmetics | 2026 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.3390/cosmetics13020099 | Anti-Photoaging Effects of Kaempferia galanga Extract: From Cell-Based Studies to Microemulsion Develo... | Cosmetics | 2026 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.3390/cosmetics8030056 | Carbon Dioxide Laser Vulvovaginal Rejuvenation: A Systematic Review | Cosmetics | 2021 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.4103/jcas.jcas_176_22 | Intradermal platelet-rich plasma for the treatment of melasma: A clinical and dermoscopic evaluation i... | Journal of Cutaneous and Aesthetic Surgery | 2023 | open_access_cc_by_nc | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1055/a-2597-6850 | Evaluation and Treatment Planning to Maximize Perioral, Submental, and Neck Aesthetics | Facial Plastic Surgery | 2025 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1055/a-2764-3235 | Surgical Management of Filler Rhinoplasty Complications | Facial Plastic Surgery | 2025 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1055/a-2833-9992 | Peptides in Facial Plastic Surgery: Emerging Applications in Aesthetics and Rejuvenation | Facial Plastic Surgery | 2026 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1055/a-2889-6949 | The Role of Hyperbaric Oxygen Therapy in Enhancing Skin Regeneration and Aesthetic Outcomes: A Literat... | Facial Plastic Surgery | 2026 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1055/s-0039-1683854 | Nonsurgical Chin and Jawline Augmentation Using Calcium Hydroxylapatite and Hyaluronic Acid Fillers | Facial Plastic Surgery | 2019 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1055/s-0043-1772197 | Cosmetic Treatments with Energy-Based Devices in Skin of Color | Facial Plastic Surgery | 2023 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1089/fpsam.2020.0076 | Upper Lip Reconstruction Utilizing a Two-Stage Approach with Nanofat Grafting After Hemangioma Treatment | Facial Plastic Surgery & Aesthetic Medicine | 2021 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjab225 | Hair Transplantation in Burn Scar Alopecia After Combined Non-Ablative Fractional Laser and Microfat G... | Aesthetic Surgery Journal | 2021 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjac286 | Laser-Assisted Drug Delivery in the Treatment of Scars, Rhytids, and Melasma: A Comprehensive Review o... | Aesthetic Surgery Journal | 2023 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjad358 | Treatment of Chin Retrusion With Botulinum Toxin Plus Hyaluronic Acid Filler in Comparison With Hyalur... | Aesthetic Surgery Journal | 2024 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjad379 | Developing the Aesthetic Postoperative Complication Score (APeCS) for Detecting Major Morbidity in Fac... | Aesthetic Surgery Journal | 2024 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjae035 | Comparison of Different Acellular Dermal Matrix in Breast Reconstruction: A Skin-to-Skin Study | Aesthetic Surgery Journal | 2024 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjae226 | Microfocused Ultrasound With Visualization (MFU-V) and Hyperdilute Calcium Hydroxylapatite (CaHA-CMC) ... | Aesthetic Surgery Journal | 2025 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjaf097 | Comparative Efficacy and Safety of Injectable Tranexamic Acid Combination Therapies for Melasma: A Net... | Aesthetic Surgery Journal | 2025 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjaf240 | A Multicenter, Open-Label Study of Combined Poly-L-Lactic Acid and Hyaluronic Midface Filler Regimen E... | Aesthetic Surgery Journal | 2026 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjaf243 | Erbium:YAG Laser Combined With Plant-Derived Exosomes (ASCEplus IRLV) for Genital Rejuvenation | Aesthetic Surgery Journal | 2026 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjag049 | Post Weight Loss Body Contouring Surgery: Complication Rates Following Bariatric Surgery, Injectable G... | Aesthetic Surgery Journal | 2026 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1097/dss.0000000000001918 | Radio Peel—Synergism Between Nano-fractional Radiofrequency and 20% Trichloroacetic Acid Chemical Peeling | Dermatologic Surgery | 2019 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1097/dss.0000000000002165 | Repeated Full-Face Aesthetic Combination Treatment With AbobotulinumtoxinA, Hyaluronic Acid Filler, an... | Dermatologic Surgery | 2020 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1097/dss.0000000000003292 | Combination of Full-Field and Fractional Erbium: YAG Laser for Nonhealing Wounds | Dermatologic Surgery | 2022 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1097/dss.0000000000003403 | Role of Platelet-Rich Plasma Therapy as an Adjuvant in Treatment of Melasma | Dermatologic Surgery | 2022 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1097/dss.0000000000003452 | Cutaneous Vascular Compromise and Resolution of Skin Barrier Breakdown After Dermal Filler Occlusion—I... | Dermatologic Surgery | 2022 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1097/dss.0000000000004313 | Neuromodulators in Skin of Color: An International Review | Dermatologic Surgery | 2024 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.12074 | Calcium hydroxylapatite for jawline rejuvenation: consensus recommendations | Journal of Cosmetic Dermatology | 2014 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.12904 | A novel triple combination in treatment of melasma: Significant outcome with far less actives | Journal of Cosmetic Dermatology | 2019 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.12953 | Effective noninvasive body contouring by using a combination of cryolipolysis, injection lipolysis, an... | Journal of Cosmetic Dermatology | 2019 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.13745 | Evaluating an incobotulinumtoxinA and Cohesive Polydensified Matrix<sup>®</sup> hyaluronic acid filler... | Journal of Cosmetic Dermatology | 2021 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.13896 | Efficacy of focused radiofrequency with ultrasound in body contouring: A study of 64 patients | Journal of Cosmetic Dermatology | 2021 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.14573 | Effectiveness of combined microfocused ultrasound with visualization and subdermal calcium hydroxyapat... | Journal of Cosmetic Dermatology | 2021 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.14731 | Treatment of acanthosis nigricans with sequential salicylic acid‐mandelic acid combination peel and ma... | Journal of Cosmetic Dermatology | 2022 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.15031 | Outcomes of 1064‐nm picosecond laser alone and in combination with fractional 1064‐nm picosecond laser... | Journal of Cosmetic Dermatology | 2022 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.15042 | Effectiveness of jawline, jaw angle, and marionette lines correction in combination with double needle... | Journal of Cosmetic Dermatology | 2022 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.16514 | Advancements in laser technologies for skin rejuvenation: A comprehensive review of efficacy and safety | Journal of Cosmetic Dermatology | 2024 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.16716 | The Role of <scp>GLP</scp> ‐1 Agonists in Esthetic Medicine: Exploring the Impact of Semaglutide on Bo... | Journal of Cosmetic Dermatology | 2025 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.70047 | Nasal Reshaping Using Barbed Threads Combined With Hyaluronic Acid Filler and Botulinum Toxin A | Journal of Cosmetic Dermatology | 2025 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.70198 | Combination of Botulinum Toxin A and Hyaluronic Acid Improved Facial Pore Enlargement Caused by Acne | Journal of Cosmetic Dermatology | 2025 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.70297 | Aesthetic Medicine Management and the Role of Dermocosmetics for Acne‐Prone Skin: A (Narrative) Mini R... | Journal of Cosmetic Dermatology | 2025 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.70364 | Microfocused Ultrasound With Visualization in Skin Quality: A Narrative Review | Journal of Cosmetic Dermatology | 2025 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.70593 | Visual Aesthetics ( <scp>VA</scp> ) Methodology: A Strategic Approach to Facial Rejuvenation | Journal of Cosmetic Dermatology | 2025 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.70685 | Radiofrequency Microneedling With 1927 nm Thulium Laser Versus Radiofrequency Microneedling Monotherap... | Journal of Cosmetic Dermatology | 2026 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.70897 | Hybrid Calcium Hydroxylapatite–Polynucleotide Skin Booster A Retrospective Cohort Study | Journal of Cosmetic Dermatology | 2026 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.70935 | Cross‐Linked Sodium Hyaluronate Filler Containing Poly‐L‐Lactic Acid‐b‐Poly (Ethylene Glycol) Microsph... | Journal of Cosmetic Dermatology | 2026 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1111/jocd.70968 | Efficacy and Tolerability of a Novel Topical Hydrator Used After Nonablative Laser Skin Rejuvenation | Journal of Cosmetic Dermatology | 2026 | unknown | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2020.133 | Complications after cosmetic periocular filler: prevention and management | Plastic and Aesthetic Research | 2020 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2020.143 | Hyaluronic acid for lower eyelid and tear trough rejuvenation: review of the literature | Plastic and Aesthetic Research | 2020 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2020.77 | Laser Resurfacing for the Management of Periorbital Scarring | Plastic and Aesthetic Research | 2020 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2021.130 | Weight stigma mitigating approaches to gender-affirming genital surgery | Plastic and Aesthetic Research | 2022 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2021.42 | Free tissue reconstruction of massive facial trauma - review of the literature and considerations to i... | Plastic and Aesthetic Research | 2022 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2021.60 | Non-surgical skin tightening | Plastic and Aesthetic Research | 2021 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2021.85 | Experimental assessment of regenerative properties of platelet rich plasma on the human skin - a review | Plastic and Aesthetic Research | 2022 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2022.08 | Peripheral nerve allograft: how innovation has changed surgical practice | Plastic and Aesthetic Research | 2022 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2022.09 | Management of vascular complications following calcium hydroxylapatite filler injections: a systemic r... | Plastic and Aesthetic Research | 2022 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2022.139 | Complications in microsurgical breast reconstruction: thrombosis prevention and management | Plastic and Aesthetic Research | 2023 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.20517/2347-9264.2022.19 | Ischemic complications of dermal fillers | Plastic and Aesthetic Research | 2022 | open_access_cc_by | clinical_gateway_source, safety_floor, combination_observation |
| A | 10.20517/2347-9264.2023.94 | Complications of facial autologous fat grafting | Plastic and Aesthetic Research | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.2147/ccid.s542746 | Efficacy and Safety Evaluation of Microneedling Combined with Tranexamic Acid-Arbutin Liquid Excipient... | Clinical, Cosmetic and Investigational Dermatology | 2025 | open_access_cc_by_nc | clinical_gateway_source, safety_floor, combination_observation |
| A | 10.25259/jcas_131_2025 | Botulinum toxin treatment of the orofacial region – A narrative review on esthetic aspects | Journal of Cutaneous and Aesthetic Surgery | 2025 | open_access_cc_by_nc | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.25259/jcas_144_2025 | Psychological considerations in cosmetic dermatologic surgery: Are we addressing patient expectations ... | Journal of Cutaneous and Aesthetic Surgery | 2025 | open_access_cc_by_nc | clinical_gateway_source, safety_floor, sales_education_support |

## Recommended Next Crawl Targets
- Direct crawl DovePress CCID article archive/search pages for full-text URLs and license metadata.
- Direct crawl JCAS archive pages.
- Browser/manual crawl MAG Online Journal of Aesthetic Nursing because simple HTTP is blocked.
- Direct publisher crawl OUP/Thieme/Mary Ann Liebert table-of-contents pages for recent aesthetic issues.