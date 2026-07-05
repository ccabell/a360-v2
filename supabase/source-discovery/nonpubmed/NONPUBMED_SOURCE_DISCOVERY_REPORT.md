# Non-PubMed Journal Discovery Report

Generated: 2026-06-12

Correction note: this pass intentionally excludes PubMed E-utilities, PMIDs, and PubMed URLs. It is for non-PubMed / outside-PubMed journal discovery only.

## Summary
- Journals targeted: 12
- Topic queries: 29
- Search calls attempted: 696
- Unique non-PubMed records found: 238
- A/B quality candidates queued in SQL: 193
- New source_registry rows in SQL: 4
- Existing GL queue rows checked: 96
- Errors logged: 14

## Output Files
- `nonpubmed_quality_triage.csv`
- `nonpubmed_discovery_results.json`
- `nonpubmed_ingestion_queue_inserts.sql`
- `nonpubmed_source_registry_inserts.sql`
- `nonpubmed_errors.log`

## Discovery Surface Breakdown
| Surface | Records |
|---|---:|
| crossref | 154 |
| openalex | 84 |

## Quality Tier Breakdown
| Tier | Records |
|---|---:|
| A | 124 |
| B | 69 |
| C | 38 |
| D | 7 |

## Journal Breakdown
| Journal | Records |
|---|---:|
| Aesthetic Surgery Journal Open Forum | 87 |
| Journal of Aesthetic Nursing | 60 |
| Aesthetic Plastic Surgery | 57 |
| Aesthetic Medicine | 15 |
| PRS Global Open | 7 |
| JPRAS Open | 6 |
| Journal of Clinical and Cosmetic Dermatology | 5 |
| Cosmetic Surgery and Medicine | 1 |

## Topic Breakdown
| Topic | Records |
|---|---:|
| skin_quality_peels | 70 |
| dermal_fillers | 63 |
| injectables_neurotoxins | 46 |
| lasers_energy_devices | 46 |
| body_contouring | 43 |
| rf_microneedling_ultrasound | 41 |
| medspa_general | 30 |
| glp1_aesthetics | 21 |
| regenerative_prp | 8 |

## Dossier Use Buckets
| Bucket | Records |
|---|---:|
| clinical_gateway_source | 136 |
| safety_floor | 100 |
| structured_taxonomy_support | 76 |
| sales_education_support | 72 |
| source_only_reference | 61 |
| timing_maintenance | 50 |
| combination_observation | 27 |

## Top Non-PubMed Candidates
| Tier | DOI | Title | Journal | Year | Rights | Buckets |
|---|---|---|---|---:|---|---|
| A | 10.1093/asj/sjaa310 | A Multicenter Evaluation of Paradoxical Adipose Hyperplasia Following Cryolipolysis for Fat Reduc... | Aesthetic Surgery Journal Open Forum | 2021 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjaa324 | Autogenous Fat Transplantation and Botulinum Toxin Injection Into the Masseter Muscle to Create a... | Aesthetic Surgery Journal Open Forum | 2021 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojad100 | Radiofrequency Microneedling: Technology, Devices, and Indications in the Modern Plastic Surgery ... | Aesthetic Surgery Journal Open Forum | 2023 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1007/s00266-019-01361-1 | Facial Contouring by Using Dermal Fillers and Botulinum Toxin A: A Practical Approach | Aesthetic Plastic Surgery | 2019 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1016/j.jpra.2024.01.006 | Impact of nutrition on skin wound healing and aesthetic outcomes: A comprehensive narrative review | JPRAS Open | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjae152 | Body Contouring Finesse: Dynamic Definition Liposculpture and Bipolar Radiofrequency Microneedling | Aesthetic Surgery Journal Open Forum | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1007/s00266-016-0608-y | Consensus on Current Injectable Treatment Strategies in the Asian Face | Aesthetic Plastic Surgery | 2016 | open_access_cc_by | clinical_gateway_source, sales_education_support, combination_observation |
| A | 10.1007/s00266-024-04398-z | Effectiveness and Safety of IPN-20-SENSE LIDOCAINE for Lip Volume Augmentation and/or Redefinitio... | Aesthetic Plastic Surgery | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1016/j.jpra.2025.12.005 | Clavicular augmentation with hyaluronic acid six-point technique: A novel non-surgical approach t... | JPRAS Open | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjae068 | Complications of Aesthetic and Reconstructive Breast Implant Capsulectomy: An Analysis of 7486 Pa... | Aesthetic Surgery Journal Open Forum | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjaf250 | Effectiveness and Safety of a Polyvinyl Alcohol Microsphere and Hyaluronic Acid Suspension for Ch... | Aesthetic Surgery Journal Open Forum | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjy194 | Assessing the Efficacy of Deoxycholic Acid for the Treatment of Submental Fat: A Three-Dimensiona... | Aesthetic Surgery Journal Open Forum | 2019 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asj/sjy282 | Complications of Cryolipolysis: Paradoxical Adipose Hyperplasia (PAH) and Beyond | Aesthetic Surgery Journal Open Forum | 2019 | open_access_cc_by | clinical_gateway_source, safety_floor, timing_maintenance |
| A | 10.1093/asjof/ojad005 | Botulinum Toxin Type A for the Treatment of Masseter Muscle Prominence in Asian Populations | Aesthetic Surgery Journal Open Forum | 2023 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojae051 | The Role of Nasal Fat Preservation in Upper Lid Surgery and Assessment With the Face-Q Questionna... | Aesthetic Surgery Journal Open Forum | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojae058 | Comparative Performance of Current Patient-Accessible Artificial Intelligence Large Language Mode... | Aesthetic Surgery Journal Open Forum | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojae061 | Management of Serious Adverse Events Following Deoxycholic Acid Injection for Submental and Jowl ... | Aesthetic Surgery Journal Open Forum | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojae075 | Case Series: Therapeutic Combination of VoluDerm Radiofrequency Microneedling and Glycolic Acid P... | Aesthetic Surgery Journal Open Forum | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, combination_observation |
| A | 10.1093/asjof/ojae082 | The Impact of the Number and Duration of Treatments With a 1064 nm Diode Laser on Adipocyte Apopt... | Aesthetic Surgery Journal Open Forum | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojaf064 | Localization and Staging of Vascular Adverse Events After Facial Fillers: A Detailed Assessment | Aesthetic Surgery Journal Open Forum | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojaf104 | Sculpting the Midface and Lower Face: A Novel Biostimulatory Technique Using Hyperdilute Calcium ... | Aesthetic Surgery Journal Open Forum | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojaf105 | Assessment of Mortality Rates Associated With Perioperative Deep Vein Thrombosis Screening and Pr... | Aesthetic Surgery Journal Open Forum | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojaf124 | Development and Validation of Photonumeric Scales for Glabellar, Lateral Canthal, and Forehead Lines | Aesthetic Surgery Journal Open Forum | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojaf142 | Incidence of Paradoxical Adipose Hyperplasia After Cryolipolysis: A Systematic Review and Meta-An... | Aesthetic Surgery Journal Open Forum | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojag075 | The Efficacy and Safety of Radiofrequency Microneedling for Melasma: A Systematic Review and Qual... | Aesthetic Surgery Journal Open Forum | 2026 | open_access_cc_by | clinical_gateway_source, safety_floor, combination_observation |
| A | 10.1093/asjof/ojag097 | A Retrospective Analysis of the Clinical Response and Safety of Radiofrequency Microneedling Trea... | Aesthetic Surgery Journal Open Forum | 2026 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1177/22925503211019618 | Hyaluronidase for Treating Complications Related to HA Fillers: A National Plastic Surgeon Survey | Aesthetic Plastic Surgery | 2021 | open_access_cc_by | clinical_gateway_source, safety_floor |
| A | 10.1177/22925503241300335 | A Primer on Abdominoplasty Safety | Aesthetic Plastic Surgery | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.14730/aaps.2013.19.3.129 | Secondary Female Hairline Correction Surgery in Korean: Various Operative Techniques and Methods | Aesthetic Plastic Surgery | 2013 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.14730/aaps.2016.22.2.68 | Evaluation of Elastic Lift for Neck Rejuvenation | Aesthetic Plastic Surgery | 2016 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.14730/aaps.2018.24.2.49 | The Characteristics and Safety of Previous Fillers in Secondary Rhinoplasty | Aesthetic Plastic Surgery | 2018 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.14730/aaps.2022.00633 | A split-face study to evaluate the efficacy of a dissolving microneedle-encapsulated niacinamide ... | Aesthetic Plastic Surgery | 2022 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.29011/2574-7754.100511 | Mandibular Angle Augmentation using Customized PEEK Implants and Guides Generated with 3D Plannin... | PRS Global Open | 2020 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.3390/jaestheticmed2010003 | A Multimodal Approach to Facial Rejuvenation—Integrating HA Fillers, Collagen Stimulators, Botuli... | Aesthetic Medicine | 2026 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.47511/sapsj.v3.8144 | Rib removal in body contouring surgery and its influence on the waist | Aesthetic Medicine | 2022 | open_access_cc_by | clinical_gateway_source, safety_floor, combination_observation |
| A | 10.1007/s00266-025-04875-z | Subject-Reported Satisfaction After Cell-Enriched Lipotransfer (CELT) for Lip Augmentation | Aesthetic Plastic Surgery | 2025 | open_access_cc_by | clinical_gateway_source, sales_education_support, combination_observation |
| A | 10.1016/j.asj.2009.09.003 | An Analysis of the Long-Term Safety Data of Repeat Administrations of Botulinum Neurotoxin Type A... | Aesthetic Surgery Journal Open Forum | 2009 | open_access_cc_by | clinical_gateway_source, safety_floor, timing_maintenance |
| A | 10.1016/j.asj.2009.09.010 | An Analysis of Safety Data from Five Phase III Clinical Trials on the Use of Botulinum Neurotoxin... | Aesthetic Surgery Journal Open Forum | 2009 | open_access_cc_by | clinical_gateway_source, safety_floor, structured_taxonomy_support |
| A | 10.1016/j.jpra.2020.05.006 | Comments on “Filler rhinoplasty based on anatomy: The dual plane technique” | JPRAS Open | 2020 | open_access_cc_by | clinical_gateway_source, safety_floor, structured_taxonomy_support |
| A | 10.1016/j.jpra.2025.08.006 | Mechanisms of fat and soft tissue filler embolism following aesthetic injections: A cadaveric sys... | JPRAS Open | 2025 | open_access_cc_by | clinical_gateway_source, safety_floor, structured_taxonomy_support |
| A | 10.1016/j.jpra.2026.03.043 | SCULPT: Medical student and resident doctor comprehension, uptake of learning and perception of a... | JPRAS Open | 2026 | open_access_cc_by | clinical_gateway_source, safety_floor |
| A | 10.1093/asj/sjac336 | A Comprehensive Ultrasound Evaluation Approach of Lower Facial Structure Before Masseter Muscle B... | Aesthetic Surgery Journal Open Forum | 2023 | open_access_cc_by | clinical_gateway_source, safety_floor, structured_taxonomy_support |
| A | 10.1093/asj/sjae062 | Botulinum Toxin Injection Technique for Reducing the Masseter Size and Enhancing the Jawline | Aesthetic Surgery Journal Open Forum | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, timing_maintenance |
| A | 10.1093/asj/sjae077 | Paradoxical Adipose Hyperplasia Following Cryolipolysis | Aesthetic Surgery Journal Open Forum | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor |
| A | 10.1093/asj/sjx111 | Commentary on: Heterogeneity in Body Contouring Outcomes Based Research: The Pittsburgh Body Cont... | Aesthetic Surgery Journal Open Forum | 2018 | open_access_cc_by | clinical_gateway_source, safety_floor, sales_education_support |
| A | 10.1093/asjof/ojab013 | Abdominoplasty in the Massive Weight Loss Patient: Are Aesthetic Goals and Safety Mutually Exclus... | Aesthetic Surgery Journal Open Forum | 2021 | open_access_cc_by | clinical_gateway_source, safety_floor |
| A | 10.1093/asjof/ojad027.001 | Filler in the Tear Trough and Lid-Cheek Junction: A Cadaveric Evaluation of Filler Type and Manip... | Aesthetic Surgery Journal Open Forum | 2023 | open_access_cc_by | clinical_gateway_source, safety_floor, structured_taxonomy_support |
| A | 10.1093/asjof/ojad094 | Tapencarium (RZL-012) for Flank Fat Reduction: A Proof-of-Concept Study | Aesthetic Surgery Journal Open Forum | 2023 | open_access_cc_by | clinical_gateway_source, safety_floor, timing_maintenance |
| A | 10.1093/asjof/ojad112 | The Safety of Contraction of Subcutaneous Tissue Following Liposuction Procedures | Aesthetic Surgery Journal Open Forum | 2023 | open_access_cc_by | clinical_gateway_source, safety_floor |
| A | 10.1093/asjof/ojae113 | In Vivo Ultrasound Study of the Angular Artery Anatomy: Practical Indications for the Treatment o... | Aesthetic Surgery Journal Open Forum | 2024 | open_access_cc_by | clinical_gateway_source, safety_floor, structured_taxonomy_support |

## Notes
- This is not a PubMed scout. Any record with a PubMed URL was excluded.
- Crossref/OpenAlex metadata can be sparse. A/B rows should still go through normal rights and relevance review before ingestion.
- Some registry targets returned no usable metadata through Crossref/OpenAlex; those should be handled by direct publisher crawling if they remain important.