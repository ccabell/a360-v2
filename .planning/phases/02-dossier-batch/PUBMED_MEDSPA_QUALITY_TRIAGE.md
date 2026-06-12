# PubMed Medspa Quality Triage

Generated: 2026-06-12

Purpose: refine the broad PubMed scout into a quality-first source review queue that aligns with the existing Phase 02 Global Library enrichment workflow. This does not create new schema or runtime functionality. It keeps source discovery as source capture, then points high-value papers toward existing dossier/evidence uses.

## Alignment Rules
- Logging/queueing only; no ingestion performed here.
- No new tables, services, pairings, or timing-rule structures.
- Tier A favors clinical trials, reviews, consensus/guidelines, safety floors, strong sales-education usefulness, and PMC/full-text availability.
- Paywalled articles are retained as evidence-review/source-map candidates, not full-text ingestion candidates.
- PMC availability is treated as full-text availability, but final license still needs the normal rights pass before full ingestion.

## Output Files
- `medspa_pubmed_quality_triage.csv` — 3,660 reviewed source rows with tier/buckets.
- `medspa_pubmed_quality_triage.json` — same data for scripts/agents.
- `quality_oa_ingestion_queue_inserts.sql` — 621 Tier A PMC/full-text queue rows.

## Quality Tier Counts
| Tier | Meaning | Count |
|---|---|---:|
| A | Go-first evidence/source review. Strong clinical/safety/sales-education signal; often PMC/full text. | 1318 |
| B | Useful secondary review candidate. Likely supports dossiers but less urgent. | 498 |
| C | Keep in source map; review when filling specific gaps. | 1031 |
| D | Low-priority source map only. | 813 |

## Review Priority Counts
| Priority | Count |
|---|---:|
| source_map_only | 1844 |
| evidence_review | 697 |
| immediate_review | 621 |
| secondary_review | 498 |

## Journal Breakdown
| Journal | Rows |
|---|---:|
| Dermatologic Surgery | 669 |
| Journal of Cosmetic Dermatology | 627 |
| Plastic and Reconstructive Surgery | 599 |
| Aesthetic Surgery Journal | 593 |
| Journal of Drugs in Dermatology | 339 |
| Cureus | 216 |
| Journal of Plastic, Reconstructive & Aesthetic Surgery | 204 |
| Journal of the American Academy of Dermatology | 117 |
| Journal of Clinical and Aesthetic Dermatology | 115 |
| Dermatology and Therapy | 114 |
| Facial Plastic Surgery & Aesthetic Medicine | 65 |
| BMC Dermatology | 1 |
| Aesthetic Plastic Surgery | 1 |

## Dossier Use Buckets
| Bucket | Rows |
|---|---:|
| product_dossier_support | 3656 |
| safety_floor | 2228 |
| sales_education_support | 2139 |
| structured_taxonomy_support | 1577 |
| timing_maintenance | 1565 |
| clinical_gateway_source | 1428 |
| combination_observation | 735 |

## Topic Breakdown
| Topic | Rows |
|---|---:|
| practice_safety_patient_selection | 1815 |
| dermal_fillers | 1188 |
| injectables_neurotoxins | 902 |
| skin_quality_peels_cosmeceuticals | 816 |
| body_contouring_fat_reduction | 799 |
| lasers_energy_devices | 396 |
| rf_microneedling_ultrasound | 362 |
| glp1_weight_loss_aesthetics | 289 |
| regenerative_prp_exosomes | 114 |

## Product Signal Breakdown
| Product / product-class signal | Rows |
|---|---:|
| Juvederm Voluma XC | 1146 |
| SKINVIVE by Juvederm | 1146 |
| Juvederm Vollure XC | 1144 |
| Botox Cosmetic | 736 |
| Dysport | 736 |
| Xeomin | 732 |
| Daxxify | 715 |
| Jeuveau | 714 |
| CoolSculpting Elite | 616 |
| RHA Redensity | 422 |
| Tirzepatide (Mounjaro/Zepbound) | 410 |
| Semaglutide (Wegovy/Ozempic) | 407 |
| Restylane Lyft | 388 |
| Sculptra Aesthetic | 274 |
| Lutronic Hollywood Spectra | 141 |
| Kybella | 140 |
| Merz Ultherapy PRIME | 97 |
| InMode Morpheus8 | 61 |
| Sofwave | 7 |
| HydraFacial Syndeo | 2 |

## Top 40 Tier A Sources
| PMID | DOI | Title | Journal | Year | Rights | PMC | Buckets |
|---|---|---|---|---:|---|---|---|
| 39475143 | 10.1093/asj/sjae222 | IncobotulinumtoxinA in the Treatment of Upper Facial Lines: Results From Two Randomized, Double-Blind,... | Aesthetic Surgery Journal | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 33751048 | 10.1093/asj/sjab114 | Multimodal Facial Aesthetic Treatment on the Appearance of Aging, Social Confidence, and Psychological... | Aesthetic Surgery Journal | 2022 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 35278262 | 10.1111/jocd.14909 | Submental fat reduction using sequential treatment approach with cryolipolysis and ATX-101. | Journal of Cosmetic Dermatology | 2022 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 31592825 | 10.1097/dss.0000000000002165 | Repeated Full-Face Aesthetic Combination Treatment With AbobotulinumtoxinA, Hyaluronic Acid Filler, an... | Dermatologic Surgery | 2020 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41243519 | 10.1093/asj/sjaf240 | A Multicenter, Open-Label Study of Combined Poly-L-Lactic Acid and Hyaluronic Midface Filler Regimen E... | Aesthetic Surgery Journal | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40997110 | 10.1093/asj/sjaf186 | Effectiveness and Safety of a Cross-linked Hyaluronic Acid Plus Mannitol Filler for the Correction of ... | Aesthetic Surgery Journal | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41092464 | 10.1093/asj/sjaf204 | OnabotulinumtoxinA Treatment for Masseter Muscle Prominence: 6-Month Safety and Efficacy Results, Incl... | Aesthetic Surgery Journal | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41218651 | 10.1093/asj/sjaf222 | Safety and Effectiveness of Two High-G' Soft Tissue Fillers for Chin Augmentation: A Prospective, Rand... | Aesthetic Surgery Journal | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41507069 | 10.1093/asj/sjag003 | Safety and Effectiveness of a Crosslinked Hyaluronic Acid Filler in Korean Patients for the Correction... | Aesthetic Surgery Journal | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41692601 | 10.1093/asj/sjag042 | Therapeutic Efficacy and Safety of Recombinant Botulinum Toxin Type A for Moderate to Severe Glabellar... | Aesthetic Surgery Journal | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 42148194 | 10.7759/cureus.108898 | Artificial Intelligence in Botulinum Toxin Injections: A Mini-Review of Current Applications, Challeng... | Cureus | 2026 | open_access_cc_by | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41664767 | 10.7759/cureus.101158 | Correction of Nasolabial Folds Using Polydioxanone Cog Threads Combined With Botulinum Toxin Type A: A... | Cureus | 2026 | open_access_cc_by | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41939674 | 10.7759/cureus.104663 | Efficacy of Platelet-Rich Plasma, Mesenchymal Stromal Cells, and Hyaluronic Acid in Preventing Adhesio... | Cureus | 2026 | open_access_cc_by | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40929520 | 10.1097/dss.0000000000004797 | Participant Satisfaction, Effectiveness, and Safety With a Novel Dual-Applicator Cryolipolysis System:... | Dermatologic Surgery | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41442012 | 10.1007/s13555-025-01626-5 | Transdermal Delivery of Poly-L-Lactic Acid via Fractional Microneedle Radiofrequency for Atrophic Acne... | Dermatology and Therapy | 2026 | open_access_cc_by_nc | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41508559 | 10.1111/jocd.70655 | Cosmetic Botulinum Toxin A Injections to the Upper Face: A Systematic Review and Meta-Analysis of Clin... | Journal of Cosmetic Dermatology | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41612547 | 10.1111/jocd.70701 | Efficacy and Safety of OnabotulinumtoxinA for the Treatment of Platysma Prominence: A Systematic Revie... | Journal of Cosmetic Dermatology | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41502035 | 10.1111/jocd.70624 | Pre-Expanded Fronto-Scalp Flaps Combined With Botulinum Toxin and Laser Therapy for Secondary Large-Sc... | Journal of Cosmetic Dermatology | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41566557 | 10.1111/jocd.70685 | Radiofrequency Microneedling With 1927 nm Thulium Laser Versus Radiofrequency Microneedling Monotherap... | Journal of Cosmetic Dermatology | 2026 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40111171 | 10.1093/asj/sjaf042 | A Controlled Phase 2b Trial to Assess the Efficacy and Safety of a Single Intervention of Onabotulinum... | Aesthetic Surgery Journal | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40037621 | 10.1093/asj/sjaf031 | A Randomized, Double-Blind, Placebo-Controlled, Multicentered Study to Evaluate the Efficacy and Safet... | Aesthetic Surgery Journal | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40509910 | 10.1093/asj/sjaf111 | Enhancing Skin Quality With a Sequential Treatment Using 2 Hyaluronic Acid Dermal Fillers: A Prospecti... | Aesthetic Surgery Journal | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 39475141 | 10.1093/asj/sjae220 | Improving Neck and Jawline Aesthetics With OnabotulinumtoxinA by Minimizing Platysma Muscle Contractio... | Aesthetic Surgery Journal | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40995236 | 10.7759/cureus.90857 | Microneedling for Non-cosmetic Dermatologic Conditions: A Systematic Review of Efficacy and Safety. | Cureus | 2025 | open_access_cc_by | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41477406 | 10.7759/cureus.98146 | Ultrasound-Identified Trigger-Point and Ultrasound-Guided IncobotulinumtoxinA (Xeomin®) Injection for ... | Cureus | 2025 | open_access_cc_by | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 39692702 | 10.1111/jocd.16722 | A Novel Injectable Polypeptide Nanoparticle Encapsulated siRNA Targeting TGF-β1 and COX-2 for Localize... | Journal of Cosmetic Dermatology | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40980871 | 10.1111/jocd.70455 | Combined Novel Microfocused Ultrasound and Microneedle Fractional Radiofrequency System for Multilayer... | Journal of Cosmetic Dermatology | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40545952 | 10.1111/jocd.70308 | Comparing Ready-to-Use and Powder AbobotulinumtoxinA for Glabellar Lines: A Randomized, Controlled, Tr... | Journal of Cosmetic Dermatology | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40586136 | 10.1111/jocd.70305 | Efficacy and Safety of CKDB-501A in Treating Moderate-To-Severe Glabellar Lines: A Randomized, Double-... | Journal of Cosmetic Dermatology | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40735955 | 10.1111/jocd.70358 | Efficacy and Safety of Combined Topical Lidocaine and Tetracaine Cream for Facial Fractional Laser Res... | Journal of Cosmetic Dermatology | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 41246934 | 10.1111/jocd.70548 | Expert Panel Guidelines for Hybrid CaHA-CMC/CPM-HA Fillers in the Mexican Population. | Journal of Cosmetic Dermatology | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40084635 | 10.1111/jocd.70072 | The Addition of Low-Dose Lidocaine and Triamcinolone Reduces the Adverse Effects of 2-Deoxycholate Inj... | Journal of Cosmetic Dermatology | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 40837210 | 10.1016/j.jpra.2025.06.018 | Effectiveness, safety, and versatility of hyaluronic acid dermal filler in patients with reduced midfa... | Journal of Plastic, Reconstructive & Aesthetic Surgery | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 38640068 | 10.1097/prs.0000000000011472 | Efficacy and Safety of OnabotulinumtoxinA for the Treatment of Platysma Prominence: A Randomized Phase... | Plastic and Reconstructive Surgery | 2025 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 38573527 | 10.1093/asj/sjae073 | A Multicenter, Randomized, Evaluator-Blinded Study to Examine the Safety and Effectiveness of Hyaluron... | Aesthetic Surgery Journal | 2024 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 37556827 | 10.1093/asj/sjad251 | Effectiveness and Safety of Resilient Hyaluronic Acid (RHA) Dermal Fillers for the Correction of Moder... | Aesthetic Surgery Journal | 2024 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 38506148 | 10.1093/asj/sjae051 | Safety and Duration of Effect of 40-Unit PrabotulinumtoxinA-xvfs for the Treatment of Moderate to Seve... | Aesthetic Surgery Journal | 2024 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 39233487 | 10.1111/jocd.16510 | Standard operating protocol for utilizing energy-based devices in aesthetic practice. | Journal of Cosmetic Dermatology | 2024 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 39034504 | 10.1111/jocd.16482 | Ultrasound rejuvenation for upper facial skin: A randomized blinded prospective study. | Journal of Cosmetic Dermatology | 2024 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |
| 37983881 | 10.1097/prs.0000000000011198 | Carbon-Assisted Q-Switched Nd:YAG Laser and Microneedling Delivery of Botulinum Toxin: A Prospective P... | Plastic and Reconstructive Surgery | 2024 | unknown | yes | product_dossier_support, clinical_gateway_source, safety_floor |

## Recommended Next Action
Use the Tier A PMC SQL file as the post-demo ingestion review slice. Use the CSV to pick product/category-specific evidence links for existing dossier fields such as `clinical_summary`, `sales_education`, `contraindications`, `does_not_solve`, `fda_approved_areas`, and `combination_therapy` observations. Do not auto-promote any article to patient-facing content without the existing medical/commercial/compliance review path.