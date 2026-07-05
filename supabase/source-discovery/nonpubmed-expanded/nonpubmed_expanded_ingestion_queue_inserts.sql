-- Expanded non-PubMed ingestion_queue inserts
-- Generated: 2026-06-14
-- Article count: 1092
-- Scope: expanded Crossref DOI metadata discovery only; PubMed URLs excluded.
-- Existing schema only: source_id, url, doi, title, rights_class, discovered_during, status.
-- Journal breakdown:
--   Journal of Cosmetic Dermatology: 213
--   Dermatologic Surgery: 148
--   Clinical, Cosmetic and Investigational Dermatology: 140
--   Aesthetic Surgery Journal: 124
--   Cosmetics: 106
--   Journal of Cutaneous and Aesthetic Surgery: 100
--   Journal of Aesthetic Nursing: 77
--   Facial Plastic Surgery: 57
--   Facial Plastic Surgery & Aesthetic Medicine: 56
--   Plastic and Aesthetic Research: 47
--   Journal of Cosmetic and Laser Therapy: 24

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11030100',
  NULLIF('10.3390/cosmetics11030100', ''),
  'A Split-Face Comparison of Novel Microneedle Patch versus Botulinum Toxin-A and Microneedle Patch for Improvement in Undereye Skin Texture',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11030100' OR iq.doi = '10.3390/cosmetics11030100'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020099',
  NULLIF('10.3390/cosmetics13020099', ''),
  'Anti-Photoaging Effects of Kaempferia galanga Extract: From Cell-Based Studies to Microemulsion Development',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020099' OR iq.doi = '10.3390/cosmetics13020099'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020074',
  NULLIF('10.3390/cosmetics13020074', ''),
  'Bioactive Proteolytic Enzymes Chymotrypsin and Papain as Adjuvants to Laser Hair Removal: Reducing the Risk of Paradoxical Hypertrichosis in Women with Facial Hirsutism',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020074' OR iq.doi = '10.3390/cosmetics13020074'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics8030056',
  NULLIF('10.3390/cosmetics8030056', ''),
  'Carbon Dioxide Laser Vulvovaginal Rejuvenation: A Systematic Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics8030056' OR iq.doi = '10.3390/cosmetics8030056'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11030101',
  NULLIF('10.3390/cosmetics11030101', ''),
  'Effects of CE Ferulic® Combined with Microneedling in the Treatment of Pigmentary Disorders: A Monocentric, Split Face, Comparative Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11030101' OR iq.doi = '10.3390/cosmetics11030101'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020098',
  NULLIF('10.3390/cosmetics13020098', ''),
  'Efficacy and Safety of Combination Therapy of Intense Pulsed Light and Topical Tranexamic Acid in the Treatment of Melasma',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020098' OR iq.doi = '10.3390/cosmetics13020098'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12050212',
  NULLIF('10.3390/cosmetics12050212', ''),
  'Exploratory Evaluation of a Hyper-Diluted Calcium Hydroxyapatite–Hyaluronic Acid Combination for Facial Rejuvenation: A Pilot Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12050212' OR iq.doi = '10.3390/cosmetics12050212'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13010001',
  NULLIF('10.3390/cosmetics13010001', ''),
  'Prospective Multicentre Real-World Study of a Bioregenerative Combination Therapy with Polynucleotide High-Purification Technology (PN HPT™) and Hyaluronic Acid for Moderate-to-Severe Atrophic Facial Acne Scars',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13010001' OR iq.doi = '10.3390/cosmetics13010001'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_154_2024',
  NULLIF('10.25259/jcas_154_2024', ''),
  'A combined treatment for skin laxity using fillers and technologies associated: The sandwich protocol',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_154_2024' OR iq.doi = '10.25259/jcas_154_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_70_24',
  NULLIF('10.25259/jcas_70_24', ''),
  'A comparative study to evaluate the safety and efficacy of low-dose isotretinoin monotherapy versus a combination of low-dose isotretinoin and superficial chemical peels in patients with moderate-to-severe acne vulgaris',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_70_24' OR iq.doi = '10.25259/jcas_70_24'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_45_23',
  NULLIF('10.25259/jcas_45_23', ''),
  'Comparative study of microneedling monotherapy versus microneedling with autologous platelet-rich plasma for the treatment of stretch marks (striae distensae) and post-surgical scars: Clinical and dermoscopy outcomes',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_45_23' OR iq.doi = '10.25259/jcas_45_23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_98_2025',
  NULLIF('10.25259/jcas_98_2025', ''),
  'Facial contouring with the S.H.A.P.E. technique: A case series on buccal fat reduction',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_98_2025' OR iq.doi = '10.25259/jcas_98_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_140_2024',
  NULLIF('10.25259/jcas_140_2024', ''),
  'Facial hair restoration using long hair follicular unit extraction – A case of beard to moustache transplantation',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_140_2024' OR iq.doi = '10.25259/jcas_140_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_176_22',
  NULLIF('10.4103/jcas.jcas_176_22', ''),
  'Intradermal platelet-rich plasma for the treatment of melasma: A clinical and dermoscopic evaluation in dark skin',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_176_22' OR iq.doi = '10.4103/jcas.jcas_176_22'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_94_2024',
  NULLIF('10.25259/jcas_94_2024', ''),
  'Novel management of scarred recurrent intradermal nevus on the nasal tip through tri-lobe flap and scar resurfacing',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_94_2024' OR iq.doi = '10.25259/jcas_94_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2025.28',
  NULLIF('10.20517/2347-9264.2025.28', ''),
  'Asymmetric spindle skin harvesting combined with continuous Z skin grafting: experience in correcting metacarpophalangeal joint dorsiflexion deformities',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2025.28' OR iq.doi = '10.20517/2347-9264.2025.28'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2022.91',
  NULLIF('10.20517/2347-9264.2022.91', ''),
  'Fat grafting in autologous breast reconstruction: applications, outcomes, safety, and complications',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2022.91' OR iq.doi = '10.20517/2347-9264.2022.91'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf240',
  NULLIF('10.1093/asj/sjaf240', ''),
  'A Multicenter, Open-Label Study of Combined Poly-L-Lactic Acid and Hyaluronic Midface Filler Regimen Enhances Facial Harmony and Skin Quality in GLP-1 Medication Users',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf240' OR iq.doi = '10.1093/asj/sjaf240'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf097',
  NULLIF('10.1093/asj/sjaf097', ''),
  'Comparative Efficacy and Safety of Injectable Tranexamic Acid Combination Therapies for Melasma: A Network Meta-analysis of Randomized Controlled Trials',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf097' OR iq.doi = '10.1093/asj/sjaf097'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjae035',
  NULLIF('10.1093/asj/sjae035', ''),
  'Comparison of Different Acellular Dermal Matrix in Breast Reconstruction: A Skin-to-Skin Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae035' OR iq.doi = '10.1093/asj/sjae035'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad379',
  NULLIF('10.1093/asj/sjad379', ''),
  'Developing the Aesthetic Postoperative Complication Score (APeCS) for Detecting Major Morbidity in Facial Aesthetic Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad379' OR iq.doi = '10.1093/asj/sjad379'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf243',
  NULLIF('10.1093/asj/sjaf243', ''),
  'Erbium:YAG Laser Combined With Plant-Derived Exosomes (ASCEplus IRLV) for Genital Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf243' OR iq.doi = '10.1093/asj/sjaf243'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab225',
  NULLIF('10.1093/asj/sjab225', ''),
  'Hair Transplantation in Burn Scar Alopecia After Combined Non-Ablative Fractional Laser and Microfat Graft Treatment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab225' OR iq.doi = '10.1093/asj/sjab225'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjac286',
  NULLIF('10.1093/asj/sjac286', ''),
  'Laser-Assisted Drug Delivery in the Treatment of Scars, Rhytids, and Melasma: A Comprehensive Review of the Literature',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac286' OR iq.doi = '10.1093/asj/sjac286'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjae226',
  NULLIF('10.1093/asj/sjae226', ''),
  'Microfocused Ultrasound With Visualization (MFU-V) and Hyperdilute Calcium Hydroxylapatite (CaHA-CMC) of the Lower Face and Submentum to Treat Skin Laxity: A Pilot Study Demonstrating Superiority of MFU-V First Followed by Hyperdilute CaHA-CMC',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae226' OR iq.doi = '10.1093/asj/sjae226'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjag049',
  NULLIF('10.1093/asj/sjag049', ''),
  'Post Weight Loss Body Contouring Surgery: Complication Rates Following Bariatric Surgery, Injectable Glucagon-like Peptide-1 Receptor Agonist Pharmacotherapy, Combination Therapy, and Lifestyle Modification',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjag049' OR iq.doi = '10.1093/asj/sjag049'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad358',
  NULLIF('10.1093/asj/sjad358', ''),
  'Treatment of Chin Retrusion With Botulinum Toxin Plus Hyaluronic Acid Filler in Comparison With Hyaluronic Acid Filler Alone: A Randomized, Evaluator-Blinded, Controlled Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad358' OR iq.doi = '10.1093/asj/sjad358'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s542746',
  NULLIF('10.2147/ccid.s542746', ''),
  'Efficacy and Safety Evaluation of Microneedling Combined with Tranexamic Acid-Arbutin Liquid Excipients in the Treatment of Melasma: A Retrospective Study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s542746' OR iq.doi = '10.2147/ccid.s542746'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020054',
  NULLIF('10.3390/cosmetics13020054', ''),
  'A Reappraisal of Poly-l-Lactic Acid in Facial and Body Aesthetic Indications',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020054' OR iq.doi = '10.3390/cosmetics13020054'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11050165',
  NULLIF('10.3390/cosmetics11050165', ''),
  'Adverse Events and Satisfaction Outcomes with Calcium Hydroxylapatite and Polycaprolactone Fillers in Facial Aesthetics: A Systematic Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11050165' OR iq.doi = '10.3390/cosmetics11050165'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13010035',
  NULLIF('10.3390/cosmetics13010035', ''),
  'Bioactive Compounds for Topical and Minimally Invasive Cellulite Treatment and Skin Rejuvenation',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13010035' OR iq.doi = '10.3390/cosmetics13010035'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11020061',
  NULLIF('10.3390/cosmetics11020061', ''),
  'Blending Hyaluronic Acid and Calcium Hydroxylapatite for Injectable Facial Dermal Fillers: A Clinical and Ultrasonography Assessment',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11020061' OR iq.doi = '10.3390/cosmetics11020061'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11060193',
  NULLIF('10.3390/cosmetics11060193', ''),
  'Current Understanding of Microneedling Procedures for Acne Skin: A Narrative Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11060193' OR iq.doi = '10.3390/cosmetics11060193'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020064',
  NULLIF('10.3390/cosmetics13020064', ''),
  'Dual-Purpose Body and Face Formulation with Synergistic Actives for Thin, Aging, and Dry Skin: A Four-Week Clinical Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020064' OR iq.doi = '10.3390/cosmetics13020064'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11060227',
  NULLIF('10.3390/cosmetics11060227', ''),
  'Dye Laser Applications in Cosmetic Dermatology: Efficacy and Safety in Treating Vascular Lesions and Scars',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11060227' OR iq.doi = '10.3390/cosmetics11060227'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10020063',
  NULLIF('10.3390/cosmetics10020063', ''),
  'Efficacy Evaluation of Chlorella pyrenoidosa Extracts on Cytotoxicity Induced by Atmospheric Particulate Matter 2.5 Exposure Using Skin Cell Lines and Zebrafish Models',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10020063' OR iq.doi = '10.3390/cosmetics10020063'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics8030087',
  NULLIF('10.3390/cosmetics8030087', ''),
  'Efficacy and Safety of Topical Dexpanthenol-Containing Spray and Cream in the Recovery of the Skin Integrity Compared with Petroleum Jelly after Dermatologic Aesthetic Procedures',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics8030087' OR iq.doi = '10.3390/cosmetics8030087'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics6010015',
  NULLIF('10.3390/cosmetics6010015', ''),
  'Efficacy and Safety of an Oral Nutritional (Dietary) Supplement Containing Pinus pinaster Bark Extract and Grape Seed Extract in Combination with a High SPF Sunscreen in the Treatment of Mild-to-Moderate Melasma: A Prospective Clinical Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics6010015' OR iq.doi = '10.3390/cosmetics6010015'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11060206',
  NULLIF('10.3390/cosmetics11060206', ''),
  'Emerging and Pioneering AI Technologies in Aesthetic Dermatology: Sketching a Path Toward Personalized, Predictive, and Proactive Care',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11060206' OR iq.doi = '10.3390/cosmetics11060206'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12050222',
  NULLIF('10.3390/cosmetics12050222', ''),
  'Evaluation of Effectiveness, Duration and Anti-Aging Properties of Sofiderm® Hyaluronic Acid Filler: An Analysis Based on VisiaCR5 Data',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12050222' OR iq.doi = '10.3390/cosmetics12050222'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10040105',
  NULLIF('10.3390/cosmetics10040105', ''),
  'Global Facial Rejuvenation Using a New Cohesive, Highly Concentrated Hyaluronic Acid Filler: A Descriptive Analysis of 35 Cases',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10040105' OR iq.doi = '10.3390/cosmetics10040105'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11040126',
  NULLIF('10.3390/cosmetics11040126', ''),
  'Harnessing the Potential of Helinus integrifolius in Cosmeceutical Research: Toward Sustainable Natural Cosmetics',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11040126' OR iq.doi = '10.3390/cosmetics11040126'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10020061',
  NULLIF('10.3390/cosmetics10020061', ''),
  'Hyaluronic Acid in Facial Rehabilitation—A Narrative Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10020061' OR iq.doi = '10.3390/cosmetics10020061'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12060264',
  NULLIF('10.3390/cosmetics12060264', ''),
  'Injectable Poly-L-Lactic Acid (PLLA-SCA™) as a Versatile Treatment in Current Aesthetic Medicine: Expert Recommendations Based on Italian Clinical Experience',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12060264' OR iq.doi = '10.3390/cosmetics12060264'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020066',
  NULLIF('10.3390/cosmetics13020066', ''),
  'Italian Expert Consensus on Poly(ethylene glycol) Diglycidyl Ether-Crosslinked Hyaluronic Acid Hydrogels for Facial Aesthetics: Product Selection, Injection Techniques, and Safety',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020066' OR iq.doi = '10.3390/cosmetics13020066'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11050164',
  NULLIF('10.3390/cosmetics11050164', ''),
  'Laser-Assisted Lipolysis Versus Surgical Fat Removal: A Review of Efficacy, Safety, and Patient Satisfaction',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11050164' OR iq.doi = '10.3390/cosmetics11050164'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10060168',
  NULLIF('10.3390/cosmetics10060168', ''),
  'Pilot Study of Microfocused Ultrasound, Incobotulinum Toxin, and Calcium Hydroxyapatite in Triple Therapy for Skin Tightening after Weight Loss',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10060168' OR iq.doi = '10.3390/cosmetics10060168'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11050147',
  NULLIF('10.3390/cosmetics11050147', ''),
  'Pushing the Limits: Aesthetic Surgery Breakthrough in a High-Dose Cortisone Dermatomyositis Patient',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11050147' OR iq.doi = '10.3390/cosmetics11050147'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11020051',
  NULLIF('10.3390/cosmetics11020051', ''),
  'Recent Advances in Microneedling-Assisted Cosmetic Applications',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11020051' OR iq.doi = '10.3390/cosmetics11020051'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10050119',
  NULLIF('10.3390/cosmetics10050119', ''),
  'Reporting Quality of Randomized Controlled Trial Abstracts on Aesthetic Use of Botulinum Toxin: How Much Do Abstracts Actually Tell Us?',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10050119' OR iq.doi = '10.3390/cosmetics10050119'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020096',
  NULLIF('10.3390/cosmetics13020096', ''),
  'Retinol Therapy with Antioxidant and Anti-Inflammaging Complex Combined with Microneedling Therapy for Hyperpigmentation and Acne Scars in Patients with Skin of Color: A Pilot Case Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020096' OR iq.doi = '10.3390/cosmetics13020096'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11040143',
  NULLIF('10.3390/cosmetics11040143', ''),
  'Unmasking Melasma: Confronting the Treatment Challenges',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11040143' OR iq.doi = '10.3390/cosmetics11040143'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003292',
  NULLIF('10.1097/dss.0000000000003292', ''),
  'Combination of Full-Field and Fractional Erbium: YAG Laser for Nonhealing Wounds',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003292' OR iq.doi = '10.1097/dss.0000000000003292'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003452',
  NULLIF('10.1097/dss.0000000000003452', ''),
  'Cutaneous Vascular Compromise and Resolution of Skin Barrier Breakdown After Dermal Filler Occlusion—Implementation of Evidence-Based Recommendations Into Real-World Clinical Practice',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003452' OR iq.doi = '10.1097/dss.0000000000003452'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004313',
  NULLIF('10.1097/dss.0000000000004313', ''),
  'Neuromodulators in Skin of Color: An International Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004313' OR iq.doi = '10.1097/dss.0000000000004313'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001918',
  NULLIF('10.1097/dss.0000000000001918', ''),
  'Radio Peel—Synergism Between Nano-fractional Radiofrequency and 20% Trichloroacetic Acid Chemical Peeling',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001918' OR iq.doi = '10.1097/dss.0000000000001918'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002165',
  NULLIF('10.1097/dss.0000000000002165', ''),
  'Repeated Full-Face Aesthetic Combination Treatment With AbobotulinumtoxinA, Hyaluronic Acid Filler, and Skin-Boosting Hyaluronic Acid After Monotherapy With AbobotulinumtoxinA or Hyaluronic Acid Filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002165' OR iq.doi = '10.1097/dss.0000000000002165'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003403',
  NULLIF('10.1097/dss.0000000000003403', ''),
  'Role of Platelet-Rich Plasma Therapy as an Adjuvant in Treatment of Melasma',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003403' OR iq.doi = '10.1097/dss.0000000000003403'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0043-1772197',
  NULLIF('10.1055/s-0043-1772197', ''),
  'Cosmetic Treatments with Energy-Based Devices in Skin of Color',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0043-1772197' OR iq.doi = '10.1055/s-0043-1772197'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2597-6850',
  NULLIF('10.1055/a-2597-6850', ''),
  'Evaluation and Treatment Planning to Maximize Perioral, Submental, and Neck Aesthetics',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2597-6850' OR iq.doi = '10.1055/a-2597-6850'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0039-1683854',
  NULLIF('10.1055/s-0039-1683854', ''),
  'Nonsurgical Chin and Jawline Augmentation Using Calcium Hydroxylapatite and Hyaluronic Acid Fillers',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0039-1683854' OR iq.doi = '10.1055/s-0039-1683854'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2833-9992',
  NULLIF('10.1055/a-2833-9992', ''),
  'Peptides in Facial Plastic Surgery: Emerging Applications in Aesthetics and Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2833-9992' OR iq.doi = '10.1055/a-2833-9992'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2764-3235',
  NULLIF('10.1055/a-2764-3235', ''),
  'Surgical Management of Filler Rhinoplasty Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2764-3235' OR iq.doi = '10.1055/a-2764-3235'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2889-6949',
  NULLIF('10.1055/a-2889-6949', ''),
  'The Role of Hyperbaric Oxygen Therapy in Enhancing Skin Regeneration and Aesthetic Outcomes: A Literature Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2889-6949' OR iq.doi = '10.1055/a-2889-6949'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0076',
  NULLIF('10.1089/fpsam.2020.0076', ''),
  'Upper Lip Reconstruction Utilizing a Two-Stage Approach with Nanofat Grafting After Hemangioma Treatment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0076' OR iq.doi = '10.1089/fpsam.2020.0076'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12904',
  NULLIF('10.1111/jocd.12904', ''),
  'A novel triple combination in treatment of melasma: Significant outcome with far less actives',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12904' OR iq.doi = '10.1111/jocd.12904'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16514',
  NULLIF('10.1111/jocd.16514', ''),
  'Advancements in laser technologies for skin rejuvenation: A comprehensive review of efficacy and safety',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16514' OR iq.doi = '10.1111/jocd.16514'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70297',
  NULLIF('10.1111/jocd.70297', ''),
  'Aesthetic Medicine Management and the Role of Dermocosmetics for Acne‐Prone Skin: A (Narrative) Mini Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70297' OR iq.doi = '10.1111/jocd.70297'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12074',
  NULLIF('10.1111/jocd.12074', ''),
  'Calcium hydroxylapatite for jawline rejuvenation: consensus recommendations',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12074' OR iq.doi = '10.1111/jocd.12074'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70198',
  NULLIF('10.1111/jocd.70198', ''),
  'Combination of Botulinum Toxin A and Hyaluronic Acid Improved Facial Pore Enlargement Caused by Acne',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70198' OR iq.doi = '10.1111/jocd.70198'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70935',
  NULLIF('10.1111/jocd.70935', ''),
  'Cross‐Linked Sodium Hyaluronate Filler Containing Poly‐L‐Lactic Acid‐b‐Poly (Ethylene Glycol) Microspheres for Periorbital Rejuvenation: A Multimodal Assessment of Physicochemical, Preclinical, and Clinical Performance',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70935' OR iq.doi = '10.1111/jocd.70935'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12953',
  NULLIF('10.1111/jocd.12953', ''),
  'Effective noninvasive body contouring by using a combination of cryolipolysis, injection lipolysis, and shock waves',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12953' OR iq.doi = '10.1111/jocd.12953'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14573',
  NULLIF('10.1111/jocd.14573', ''),
  'Effectiveness of combined microfocused ultrasound with visualization and subdermal calcium hydroxyapatite injections for the management of brachial skin laxity',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14573' OR iq.doi = '10.1111/jocd.14573'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15042',
  NULLIF('10.1111/jocd.15042', ''),
  'Effectiveness of jawline, jaw angle, and marionette lines correction in combination with double needles threads (APTOS) and a collagen‐stimulating dermal filler (ELLANSE): An innovative technique',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15042' OR iq.doi = '10.1111/jocd.15042'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70968',
  NULLIF('10.1111/jocd.70968', ''),
  'Efficacy and Tolerability of a Novel Topical Hydrator Used After Nonablative Laser Skin Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70968' OR iq.doi = '10.1111/jocd.70968'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13896',
  NULLIF('10.1111/jocd.13896', ''),
  'Efficacy of focused radiofrequency with ultrasound in body contouring: A study of 64 patients',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13896' OR iq.doi = '10.1111/jocd.13896'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13745',
  NULLIF('10.1111/jocd.13745', ''),
  'Evaluating an incobotulinumtoxinA and Cohesive Polydensified Matrix<sup>®</sup> hyaluronic acid filler combination to treat moderate‐to‐severe periorbital and perioral rhytids',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13745' OR iq.doi = '10.1111/jocd.13745'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70897',
  NULLIF('10.1111/jocd.70897', ''),
  'Hybrid Calcium Hydroxylapatite–Polynucleotide Skin Booster A Retrospective Cohort Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70897' OR iq.doi = '10.1111/jocd.70897'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70364',
  NULLIF('10.1111/jocd.70364', ''),
  'Microfocused Ultrasound With Visualization in Skin Quality: A Narrative Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70364' OR iq.doi = '10.1111/jocd.70364'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70047',
  NULLIF('10.1111/jocd.70047', ''),
  'Nasal Reshaping Using Barbed Threads Combined With Hyaluronic Acid Filler and Botulinum Toxin A',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70047' OR iq.doi = '10.1111/jocd.70047'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15031',
  NULLIF('10.1111/jocd.15031', ''),
  'Outcomes of 1064‐nm picosecond laser alone and in combination with fractional 1064‐nm picosecond laser in tattoo removal',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15031' OR iq.doi = '10.1111/jocd.15031'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70685',
  NULLIF('10.1111/jocd.70685', ''),
  'Radiofrequency Microneedling With 1927 nm Thulium Laser Versus Radiofrequency Microneedling Monotherapy for Rejuvenation of Photoaged Skin',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70685' OR iq.doi = '10.1111/jocd.70685'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16716',
  NULLIF('10.1111/jocd.16716', ''),
  'The Role of <scp>GLP</scp> ‐1 Agonists in Esthetic Medicine: Exploring the Impact of Semaglutide on Body Contouring and Skin Health',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16716' OR iq.doi = '10.1111/jocd.16716'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14731',
  NULLIF('10.1111/jocd.14731', ''),
  'Treatment of acanthosis nigricans with sequential salicylic acid‐mandelic acid combination peel and maintenance with glycolic acid‐urea combination cream: A retrospective pilot study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14731' OR iq.doi = '10.1111/jocd.14731'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70593',
  NULLIF('10.1111/jocd.70593', ''),
  'Visual Aesthetics ( <scp>VA</scp> ) Methodology: A Strategic Approach to Facial Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70593' OR iq.doi = '10.1111/jocd.70593'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_84_2024',
  NULLIF('10.25259/jcas_84_2024', ''),
  'A comparative study of the efficacy of potent topical corticosteroids per se versus combination of potent topical corticosteroids with fractional CO<sub>2</sub> laser in the management of vitiligo vulgaris',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_84_2024' OR iq.doi = '10.25259/jcas_84_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_90_2025',
  NULLIF('10.25259/jcas_90_2025', ''),
  'A comprehensive narrative review on lip filler techniques with practical tips for optimum outcomes',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_90_2025' OR iq.doi = '10.25259/jcas_90_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_3_2024',
  NULLIF('10.25259/jcas_3_2024', ''),
  'Advancements in non-laser energy-based devices in trichology: A comprehensive review',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_3_2024' OR iq.doi = '10.25259/jcas_3_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_131_2025',
  NULLIF('10.25259/jcas_131_2025', ''),
  'Botulinum toxin treatment of the orofacial region – A narrative review on esthetic aspects',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_131_2025' OR iq.doi = '10.25259/jcas_131_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_43_2025',
  NULLIF('10.25259/jcas_43_2025', ''),
  'Correction of nasal skin necrosis after filler injection with micro and nanofat grafting',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_43_2025' OR iq.doi = '10.25259/jcas_43_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_175_23',
  NULLIF('10.25259/jcas_175_23', ''),
  'Efficacy and safety of microneedling radiofrequency in acne scars',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_175_23' OR iq.doi = '10.25259/jcas_175_23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_34_2024',
  NULLIF('10.25259/jcas_34_2024', ''),
  'Efficacy of botulinum toxin type A injections in improving hypertrophic scarring and keloid formation: A systematic review and meta-analysis of randomized controlled trials',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_34_2024' OR iq.doi = '10.25259/jcas_34_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_181_23',
  NULLIF('10.25259/jcas_181_23', ''),
  'Efficacy of fractional carbon dioxide laser-assisted drug delivery in the management of post-burn scars – A prospective study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_181_23' OR iq.doi = '10.25259/jcas_181_23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_48_2024',
  NULLIF('10.25259/jcas_48_2024', ''),
  'Efficacy of microneedling with platelet-rich plasma versus microneedling with tranexamic acid in melasma – A randomized open-label study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_48_2024' OR iq.doi = '10.25259/jcas_48_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_213_2025',
  NULLIF('10.25259/jcas_213_2025', ''),
  'Enhancing lip esthetics: Investigating lip volume, texture, and color with liplase treatment',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_213_2025' OR iq.doi = '10.25259/jcas_213_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_70_2024',
  NULLIF('10.25259/jcas_70_2024', ''),
  'Exploring surgical outcomes of elliptical excision against relaxed skin tension lines on the face',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_70_2024' OR iq.doi = '10.25259/jcas_70_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_255_2025',
  NULLIF('10.25259/jcas_255_2025', ''),
  'Filler thriller: Complete resolution of a pair of delayed-onset nodules with hyaluronidase',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_255_2025' OR iq.doi = '10.25259/jcas_255_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_144_2025',
  NULLIF('10.25259/jcas_144_2025', ''),
  'Psychological considerations in cosmetic dermatologic surgery: Are we addressing patient expectations adequately?',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_144_2025' OR iq.doi = '10.25259/jcas_144_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_145_2024',
  NULLIF('10.25259/jcas_145_2024', ''),
  'Revisiting laser test spots: The paradigm shift with long-pulse potassium-titanyl-phosphate systems',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_145_2024' OR iq.doi = '10.25259/jcas_145_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_7_24',
  NULLIF('10.25259/jcas_7_24', ''),
  'Self-made insulated needle',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_7_24' OR iq.doi = '10.25259/jcas_7_24'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_52_2025',
  NULLIF('10.25259/jcas_52_2025', ''),
  'The comprehensive management of dog ear deformities: Principles and techniques',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_52_2025' OR iq.doi = '10.25259/jcas_52_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_298_2025',
  NULLIF('10.25259/jcas_298_2025', ''),
  'Trichoscopic spectrum of follicular and scalp changes following hair transplantation',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_298_2025' OR iq.doi = '10.25259/jcas_298_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2020.133',
  NULLIF('10.20517/2347-9264.2020.133', ''),
  'Complications after cosmetic periocular filler: prevention and management',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2020.133' OR iq.doi = '10.20517/2347-9264.2020.133'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2022.139',
  NULLIF('10.20517/2347-9264.2022.139', ''),
  'Complications in microsurgical breast reconstruction: thrombosis prevention and management',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2022.139' OR iq.doi = '10.20517/2347-9264.2022.139'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2023.94',
  NULLIF('10.20517/2347-9264.2023.94', ''),
  'Complications of facial autologous fat grafting',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2023.94' OR iq.doi = '10.20517/2347-9264.2023.94'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2021.85',
  NULLIF('10.20517/2347-9264.2021.85', ''),
  'Experimental assessment of regenerative properties of platelet rich plasma on the human skin - a review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2021.85' OR iq.doi = '10.20517/2347-9264.2021.85'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2021.42',
  NULLIF('10.20517/2347-9264.2021.42', ''),
  'Free tissue reconstruction of massive facial trauma - review of the literature and considerations to implement aesthetic and functional outcome',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2021.42' OR iq.doi = '10.20517/2347-9264.2021.42'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2020.143',
  NULLIF('10.20517/2347-9264.2020.143', ''),
  'Hyaluronic acid for lower eyelid and tear trough rejuvenation: review of the literature',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2020.143' OR iq.doi = '10.20517/2347-9264.2020.143'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2022.19',
  NULLIF('10.20517/2347-9264.2022.19', ''),
  'Ischemic complications of dermal fillers',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2022.19' OR iq.doi = '10.20517/2347-9264.2022.19'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2020.77',
  NULLIF('10.20517/2347-9264.2020.77', ''),
  'Laser Resurfacing for the Management of Periorbital Scarring',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2020.77' OR iq.doi = '10.20517/2347-9264.2020.77'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2022.09',
  NULLIF('10.20517/2347-9264.2022.09', ''),
  'Management of vascular complications following calcium hydroxylapatite filler injections: a systemic review of cases and experimental studies',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2022.09' OR iq.doi = '10.20517/2347-9264.2022.09'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2021.60',
  NULLIF('10.20517/2347-9264.2021.60', ''),
  'Non-surgical skin tightening',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2021.60' OR iq.doi = '10.20517/2347-9264.2021.60'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2022.08',
  NULLIF('10.20517/2347-9264.2022.08', ''),
  'Peripheral nerve allograft: how innovation has changed surgical practice',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2022.08' OR iq.doi = '10.20517/2347-9264.2022.08'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2021.130',
  NULLIF('10.20517/2347-9264.2021.130', ''),
  'Weight stigma mitigating approaches to gender-affirming genital surgery',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2021.130' OR iq.doi = '10.20517/2347-9264.2021.130'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf031',
  NULLIF('10.1093/asj/sjaf031', ''),
  'A Randomized, Double-Blind, Placebo-Controlled, Multicentered Study to Evaluate the Efficacy and Safety of MEI005 in Reducing Submental Fat in Chinese Adults',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf031' OR iq.doi = '10.1093/asj/sjaf031'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjae031',
  NULLIF('10.1093/asj/sjae031', ''),
  'A Structured Approach for Treating Calcium Hydroxylapatite Focal Accumulations',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae031' OR iq.doi = '10.1093/asj/sjae031'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf096',
  NULLIF('10.1093/asj/sjaf096', ''),
  'Aesthetic Submandibular Gland Resection: A Review of Complication Incidence and Prevention',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf096' OR iq.doi = '10.1093/asj/sjaf096'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf192',
  NULLIF('10.1093/asj/sjaf192', ''),
  'Anatomical Depth of Labial Arteries in Dermal Filler Procedures: A Meta-analysis With Clinical Implications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf192' OR iq.doi = '10.1093/asj/sjaf192'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjag064',
  NULLIF('10.1093/asj/sjag064', ''),
  'Beyond Weight Loss: Metabolic and Immunologic Power of GLP-1 Agonists in Plastic Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjag064' OR iq.doi = '10.1093/asj/sjag064'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjag039',
  NULLIF('10.1093/asj/sjag039', ''),
  'Efficacy and Safety of Poly-L-lactic Acid for Midface Rejuvenation: A 12-Month Split-face Controlled Evaluation With 3D Imaging and Patient-reported Outcomes',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjag039' OR iq.doi = '10.1093/asj/sjag039'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjag013',
  NULLIF('10.1093/asj/sjag013', ''),
  'Efficacy and Safety of a Poly-L-Lactic Acid Filler for Temporal Augmentation: A Randomized, No-treatment Control, Evaluator-blinded, Multicenter Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjag013' OR iq.doi = '10.1093/asj/sjag013'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjac064',
  NULLIF('10.1093/asj/sjac064', ''),
  'Evolving Clinical Experiences in Aesthetic Hip Implant Body Contouring',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac064' OR iq.doi = '10.1093/asj/sjac064'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjae177',
  NULLIF('10.1093/asj/sjae177', ''),
  'Full SMAS: Endoscopy-Assisted Full Facial Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae177' OR iq.doi = '10.1093/asj/sjae177'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjz319',
  NULLIF('10.1093/asj/sjz319', ''),
  'Full-Field Erbium:YAG Laser Resurfacing: Complications and Suggested Safety Parameters',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz319' OR iq.doi = '10.1093/asj/sjz319'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjac267',
  NULLIF('10.1093/asj/sjac267', ''),
  'Integrative Assessment for Optimizing Aesthetic Outcomes When Treating Glabellar Lines With Botulinum Toxin Type A: An Appreciation of the Role of the Frontalis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac267' OR iq.doi = '10.1093/asj/sjac267'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaa126',
  NULLIF('10.1093/asj/sjaa126', ''),
  'Late-Onset Upper Eyelid and Brow Edema as a Long-Term Complication of Hyaluronic Acid Filler Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa126' OR iq.doi = '10.1093/asj/sjaa126'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab099',
  NULLIF('10.1093/asj/sjab099', ''),
  'Long-term Outcomes of Ophthalmic and Retinal Artery Occlusion After Cosmetic Facial Filler Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab099' OR iq.doi = '10.1093/asj/sjab099'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf121',
  NULLIF('10.1093/asj/sjaf121', ''),
  'Poly-<scp>L-</scp>Lactic Acid in Aesthetic Dermatology: A Decade Beyond Volume Restoration Toward Regenerative Biostimulation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf121' OR iq.doi = '10.1093/asj/sjaf121'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjae241',
  NULLIF('10.1093/asj/sjae241', ''),
  'Semaglutide and Postoperative Outcomes in Nondiabetic Patients Following Body Contouring Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae241' OR iq.doi = '10.1093/asj/sjae241'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab061',
  NULLIF('10.1093/asj/sjab061', ''),
  'Synergistic Effects of Autologous Platelet-Rich Plasma and Hyaluronic Acid Injections on Facial Skin Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab061' OR iq.doi = '10.1093/asj/sjab061'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s227493',
  NULLIF('10.2147/ccid.s227493', ''),
  '<p>Real-World Safety And Effectiveness Of OnabotulinumtoxinA Treatment Of Crow’s Feet Lines And Glabellar Lines: Results Of A Korean Postmarketing Surveillance Study</p>',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s227493' OR iq.doi = '10.2147/ccid.s227493'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s470997',
  NULLIF('10.2147/ccid.s470997', ''),
  'A Comprehensive Review of Non-Surgical Treatments for Hypertrophic and Keloid Scars in Skin of Color',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s470997' OR iq.doi = '10.2147/ccid.s470997'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s590699',
  NULLIF('10.2147/ccid.s590699', ''),
  'A Prospective, Multicenter, Randomized, Assessor-Blinded Study Assessing the Efficacy and Safety of Injectable Non-Cross-Linked Hyaluronic Acid for Improving Facial Skin Rejuvenation',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s590699' OR iq.doi = '10.2147/ccid.s590699'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s601440',
  NULLIF('10.2147/ccid.s601440', ''),
  'A Retrospective Analysis of Radiofrequency Microneedling for Melasma Management in the Japanese Population',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s601440' OR iq.doi = '10.2147/ccid.s601440'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s379323',
  NULLIF('10.2147/ccid.s379323', ''),
  'An Autologous Topical Serum Derived from Platelet-Rich Plasma Therapy for the Management of Sensitive Skin Alterations: A Case Series Report',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s379323' OR iq.doi = '10.2147/ccid.s379323'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s573605',
  NULLIF('10.2147/ccid.s573605', ''),
  'Efficacy and Safety of Polycaprolactone Filler in Nonsurgical Rhinoplasty: A Pilot Study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s573605' OR iq.doi = '10.2147/ccid.s573605'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s40581',
  NULLIF('10.2147/ccid.s40581', ''),
  'Efficacy and safety of a hyaluronic acid filler in subjects treated for correction of midface volume deficiency: a 24 month study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s40581' OR iq.doi = '10.2147/ccid.s40581'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s305479',
  NULLIF('10.2147/ccid.s305479', ''),
  'Evaluation of Cannula Safety in Injection of Poly-L-Lactic Acid',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s305479' OR iq.doi = '10.2147/ccid.s305479'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s502295',
  NULLIF('10.2147/ccid.s502295', ''),
  'Fractional Radiofrequency Microneedling as a Monotherapy in Acne Scar Management: A Systematic Review of Current Evidence',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s502295' OR iq.doi = '10.2147/ccid.s502295'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s187079',
  NULLIF('10.2147/ccid.s187079', ''),
  'Safety and effectiveness of hyaluronic acid dermal filler in correction of moderate-to-severe nasolabial folds in Chinese subjects',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s187079' OR iq.doi = '10.2147/ccid.s187079'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s188586',
  NULLIF('10.2147/ccid.s188586', ''),
  'Skin physiology and safety of microfocused ultrasound with visualization for improving skin laxity',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s188586' OR iq.doi = '10.2147/ccid.s188586'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11040128',
  NULLIF('10.3390/cosmetics11040128', ''),
  'Apigenin and Phloretin Combination for Skin Aging and Hyperpigmentation Regulation',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11040128' OR iq.doi = '10.3390/cosmetics11040128'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12060275',
  NULLIF('10.3390/cosmetics12060275', ''),
  'Assessment of Safety and Tissue Integration of PEGDE-Based Hyaluronic Acid Filler for Severe Nasolabial Folds: A Prospective Observational Study with Biophysical and Ultrasound Evaluation',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12060275' OR iq.doi = '10.3390/cosmetics12060275'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics8020037',
  NULLIF('10.3390/cosmetics8020037', ''),
  'Comparative Efficacy of Fractional CO2 Laser and Q-Switched Nd:YAG Laser in Combination Therapy with Tranexamic Acid in Refractory Melasma: Results of a Prospective Clinical Trial',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics8020037' OR iq.doi = '10.3390/cosmetics8020037'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10020059',
  NULLIF('10.3390/cosmetics10020059', ''),
  'Comparing Traditional and “In-Motion” Intense Pulsed Light Techniques for Hair Removal: A Split Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10020059' OR iq.doi = '10.3390/cosmetics10020059'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11030089',
  NULLIF('10.3390/cosmetics11030089', ''),
  'Comparing a Low-Fluence Picosecond 1064 nm Nd:YAG Laser with a 532 nm Nd:YAG Laser for the Treatment of Pigmented Lesions in Chinese Patients: A Retrospective Analysis',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11030089' OR iq.doi = '10.3390/cosmetics11030089'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10020054',
  NULLIF('10.3390/cosmetics10020054', ''),
  'Current Insights into the Formulation and Delivery of Therapeutic and Cosmeceutical Agents for Aging Skin',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10020054' OR iq.doi = '10.3390/cosmetics10020054'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics9020036',
  NULLIF('10.3390/cosmetics9020036', ''),
  'Effect of the Use of a Cream with Leucine and Lactic Acid Associated with Electrostimulation in Contouring and Facial Tonus: A Randomized Clinical Controlled Trial',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics9020036' OR iq.doi = '10.3390/cosmetics9020036'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020095',
  NULLIF('10.3390/cosmetics13020095', ''),
  'Efficacy and Safety of a New Retinol Formulation in Amelioration of Photoaging: A Pilot Clinical Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020095' OR iq.doi = '10.3390/cosmetics13020095'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020058',
  NULLIF('10.3390/cosmetics13020058', ''),
  'Emerging Trends in Facial Cosmetics: Innovation, Science, and Sustainable Beauty',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020058' OR iq.doi = '10.3390/cosmetics13020058'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12060273',
  NULLIF('10.3390/cosmetics12060273', ''),
  'Evaluating Efficacy and Tolerability of a New Intradermal Biorejuvenation with Free Hyaluronic Acid and Glycerol in Photoaging: A Retrospective Pilot Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12060273' OR iq.doi = '10.3390/cosmetics12060273'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10040115',
  NULLIF('10.3390/cosmetics10040115', ''),
  'Filler Migration after Facial Injection—A Narrative Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10040115' OR iq.doi = '10.3390/cosmetics10040115'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics8030071',
  NULLIF('10.3390/cosmetics8030071', ''),
  'High Performance Conditioning Shampoo with Hyaluronic Acid and Sustainable Surfactants',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics8030071' OR iq.doi = '10.3390/cosmetics8030071'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics4040042',
  NULLIF('10.3390/cosmetics4040042', ''),
  'Instrumental Evaluation of the Depigmenting Efficacy of an Oral Supplementation Containing Peptides and Chrysanthemum Extract for the Treatment of Melasma',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics4040042' OR iq.doi = '10.3390/cosmetics4040042'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11040130',
  NULLIF('10.3390/cosmetics11040130', ''),
  'Macroscopic and Histological Effects of Polycaprolactone Dermal Filler in the Orofacial Region: A Study in Rats',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11040130' OR iq.doi = '10.3390/cosmetics11040130'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics9050108',
  NULLIF('10.3390/cosmetics9050108', ''),
  'Mechanism of Action of Topical Tranexamic Acid in the Treatment of Melasma and Sun-Induced Skin Hyperpigmentation',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics9050108' OR iq.doi = '10.3390/cosmetics9050108'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12010025',
  NULLIF('10.3390/cosmetics12010025', ''),
  'Methods for Chin Area Augmentation: Efficacy Evaluation and Prospects for Using Subplatysmal Fat Autograft',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12010025' OR iq.doi = '10.3390/cosmetics12010025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12040130',
  NULLIF('10.3390/cosmetics12040130', ''),
  'Oxidative-Inflammatory Modulation of Skin Lipid Metabolism by Squalane, Oleic Acid, and Linoleic Acid',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12040130' OR iq.doi = '10.3390/cosmetics12040130'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11050179',
  NULLIF('10.3390/cosmetics11050179', ''),
  'Pulsed Wave Mode of Fractional Radiofrequency Microneedling as a New Advance in the Treatment of Inflammatory Acne Vulgaris',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11050179' OR iq.doi = '10.3390/cosmetics11050179'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004114',
  NULLIF('10.1097/dss.0000000000004114', ''),
  'A 15% Trichloroacetic Acid + 3% Glycolic Acid Chemical Peel Series Improves Appearance of Hand Lentigines: An Evaluator-Blinded, Split-Hand Prospective Trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004114' OR iq.doi = '10.1097/dss.0000000000004114'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004800',
  NULLIF('10.1097/dss.0000000000004800', ''),
  'A Single-Center Study to Evaluate the Safety, Efficacy, and Patient Satisfaction Associated With High-Intensity Ultrasound Treatment for Skin Crepiness/Laxity',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004800' OR iq.doi = '10.1097/dss.0000000000004800'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002092',
  NULLIF('10.1097/dss.0000000000002092', ''),
  'ATX-101 (Deoxycholic Acid Injection) Leads to Clinically Meaningful Improvement in Submental Fat: Final Data From CONTOUR',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002092' OR iq.doi = '10.1097/dss.0000000000002092'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005080',
  NULLIF('10.1097/dss.0000000000005080', ''),
  'Analysis of US Food and Drug Administration Data on Radiofrequency Microneedling Device Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005080' OR iq.doi = '10.1097/dss.0000000000005080'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001083',
  NULLIF('10.1097/dss.0000000000001083', ''),
  'Autologous Pure Platelet-Rich Plasma Dermal Injections for Facial Skin Rejuvenation: Clinical, Instrumental, and Flow Cytometry Assessment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001083' OR iq.doi = '10.1097/dss.0000000000001083'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002572',
  NULLIF('10.1097/dss.0000000000002572', ''),
  'Comparison of Fractional Picosecond 1064-nm Laser and Fractional Carbon Dioxide Laser for Treating Atrophic Acne Scars: A Randomized Split-Face Trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002572' OR iq.doi = '10.1097/dss.0000000000002572'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004561',
  NULLIF('10.1097/dss.0000000000004561', ''),
  'Direct Neck Skin Excision for Correction of Aging Signs Confined to Skin Laxity and Sagging Skin in the Neck: A Local Anesthesia–Based Day Surgery Optimal for Younger Women',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004561' OR iq.doi = '10.1097/dss.0000000000004561'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004355',
  NULLIF('10.1097/dss.0000000000004355', ''),
  'Efficacy Evaluation of a Hyaluronic Acid Dermal Filler Containing Mannitol: Clinical and Aesthetic Assessment Using High-Frequency Ultrasound',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004355' OR iq.doi = '10.1097/dss.0000000000004355'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002789',
  NULLIF('10.1097/dss.0000000000002789', ''),
  'Efficacy and Safety of a New Botulinum Toxin (HU-014) Versus Existing Onabotulinumtoxin A in Subjects With Moderate to Severe Glabellar Lines',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002789' OR iq.doi = '10.1097/dss.0000000000002789'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002475',
  NULLIF('10.1097/dss.0000000000002475', ''),
  'Efficacy and Safety of a Novel Botulinum Toxin A for Masseter Reduction: A Randomized, Double-Blind, Placebo-Controlled, Optimal Dose-Finding Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002475' OR iq.doi = '10.1097/dss.0000000000002475'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001528',
  NULLIF('10.1097/dss.0000000000001528', ''),
  'Examining the Efficacy of Calcium Hydroxylapatite Filler With Integral Lidocaine in Correcting Volume Loss of the Jawline—A Pilot Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001528' OR iq.doi = '10.1097/dss.0000000000001528'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004195',
  NULLIF('10.1097/dss.0000000000004195', ''),
  'Facial Skin Rejuvenation Using Poly-dl-Lactic Acid Injected With a Laser-Generated Needle-Free Microjet Injector',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004195' OR iq.doi = '10.1097/dss.0000000000004195'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005161',
  NULLIF('10.1097/dss.0000000000005161', ''),
  'GLP-1 Receptor Agonists and Oral-Facial Aesthetics: The Intersection of Dentistry and Dermatologic Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005161' OR iq.doi = '10.1097/dss.0000000000005161'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005158',
  NULLIF('10.1097/dss.0000000000005158', ''),
  'GLP-1 Receptor Agonists in the Male Aesthetic Practice: Opportunities for the Dermatologic Surgeon',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005158' OR iq.doi = '10.1097/dss.0000000000005158'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002375',
  NULLIF('10.1097/dss.0000000000002375', ''),
  'Hyperdiluted Calcium Hydroxylapatite 1:2 for Mid and Lower Facial Skin Rejuvenation: Efficacy and Safety',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002375' OR iq.doi = '10.1097/dss.0000000000002375'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001683',
  NULLIF('10.1097/dss.0000000000001683', ''),
  'In Vitro Analysis of the Degradation of Calcium Hydroxylapatite Dermal Filler: A Proof-of-Concept Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001683' OR iq.doi = '10.1097/dss.0000000000001683'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001257',
  NULLIF('10.1097/dss.0000000000001257', ''),
  'Laser Treatment of Professional Tattoos With a 1064/532-nm Dual-Wavelength Picosecond Laser',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001257' OR iq.doi = '10.1097/dss.0000000000001257'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002351',
  NULLIF('10.1097/dss.0000000000002351', ''),
  'Light-Emitting Diode–Based Photodynamic Therapy for Photoaging, Scars, and Dyspigmentation: A Systematic Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002351' OR iq.doi = '10.1097/dss.0000000000002351'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002576',
  NULLIF('10.1097/dss.0000000000002576', ''),
  'Nonsurgical Treatment of Postpartum Lower Abdominal Skin and Soft-Tissue Laxity Using Microfocused Ultrasound With Visualization',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002576' OR iq.doi = '10.1097/dss.0000000000002576'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001518',
  NULLIF('10.1097/dss.0000000000001518', ''),
  'Oral Tranexamic Acid for the Treatment of Melasma: A Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001518' OR iq.doi = '10.1097/dss.0000000000001518'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001268',
  NULLIF('10.1097/dss.0000000000001268', ''),
  'Pilot Study Examining the Safety and Efficacy of Calcium Hydroxylapatite Filler With Integral Lidocaine Over a 12-Month Period to Correct Temporal Fossa Volume Loss',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001268' OR iq.doi = '10.1097/dss.0000000000001268'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004249',
  NULLIF('10.1097/dss.0000000000004249', ''),
  'Post Hoc Analysis Comparing the Safety and Efficacy of PrabotulinumtoxinA in Millennials and Nonmillennials With Moderate to Severe Glabellar Lines',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004249' OR iq.doi = '10.1097/dss.0000000000004249'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003607',
  NULLIF('10.1097/dss.0000000000003607', ''),
  'Radiofrequency Microneedling for Skin Tightening of the Lower Face, Jawline, and Neck Region',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003607' OR iq.doi = '10.1097/dss.0000000000003607'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002972',
  NULLIF('10.1097/dss.0000000000002972', ''),
  'Radiofrequency Microneedling: A Comprehensive and Critical Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002972' OR iq.doi = '10.1097/dss.0000000000002972'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003733',
  NULLIF('10.1097/dss.0000000000003733', ''),
  'Radiofrequency and Radiofrequency Microneedling in Skin of Color: A Review of Usage, Safety, and Efficacy',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003733' OR iq.doi = '10.1097/dss.0000000000003733'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003440',
  NULLIF('10.1097/dss.0000000000003440', ''),
  'Rare Cutaneous Malignancies in Skin of Color',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003440' OR iq.doi = '10.1097/dss.0000000000003440'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004574',
  NULLIF('10.1097/dss.0000000000004574', ''),
  'Safety, Effectiveness, and Participant Satisfaction With Multiple Simultaneous Cryolipolysis Treatments Using a Dual-Applicator Cryolipolysis System',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004574' OR iq.doi = '10.1097/dss.0000000000004574'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002449',
  NULLIF('10.1097/dss.0000000000002449', ''),
  'Tranexamic Acid for Melasma Treatment: A Split-Face Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002449' OR iq.doi = '10.1097/dss.0000000000002449'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005159',
  NULLIF('10.1097/dss.0000000000005159', ''),
  'When Beauty Turns Litigious: What Do We Know About Complications and Legal Disputes in Nonsurgical Facial Aesthetics: A Systematic Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005159' OR iq.doi = '10.1097/dss.0000000000005159'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2102-4796',
  NULLIF('10.1055/a-2102-4796', ''),
  'A Prospective Open-Label Study for Treatment of Infraorbital Hollows Using a Volumizing Hyaluronic Acid Filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2102-4796' OR iq.doi = '10.1055/a-2102-4796'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2019-5131',
  NULLIF('10.1055/a-2019-5131', ''),
  'Aesthetic Surgical Pathway in Permanent Facial Filler Removal',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2019-5131' OR iq.doi = '10.1055/a-2019-5131'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0041-1726314',
  NULLIF('10.1055/s-0041-1726314', ''),
  'Combining Laser Resurfacing and Facial Rejuvenation Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0041-1726314' OR iq.doi = '10.1055/s-0041-1726314'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2201-5989',
  NULLIF('10.1055/a-2201-5989', ''),
  'Deep Neck Contouring: Indications and Techniques',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2201-5989' OR iq.doi = '10.1055/a-2201-5989'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0041-1736390',
  NULLIF('10.1055/s-0041-1736390', ''),
  'Delayed Complications following Dermal Filler for Tear Trough Augmentation: A Systematic Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0041-1736390' OR iq.doi = '10.1055/s-0041-1736390'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0041-1722912',
  NULLIF('10.1055/s-0041-1722912', ''),
  'Development and Assessment of a Video-Based Intervention to Improve Rhinoplasty Informed Consent',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0041-1722912' OR iq.doi = '10.1055/s-0041-1722912'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0037-1605599',
  NULLIF('10.1055/s-0037-1605599', ''),
  'Facial Volume Restoration with Permanent Dermal Filler (Artecoll-4) in Chinese Women',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0037-1605599' OR iq.doi = '10.1055/s-0037-1605599'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0038-1660845',
  NULLIF('10.1055/s-0038-1660845', ''),
  'Platelet-Rich Plasma for the Treatment of Androgenic Alopecia: A Systematic Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0038-1660845' OR iq.doi = '10.1055/s-0038-1660845'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2241-9934',
  NULLIF('10.1055/a-2241-9934', ''),
  'The Body Dysmorphic Disorder Questionnaire—Aesthetic Surgery: Are We Screening the Troublesome Patients?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2241-9934' OR iq.doi = '10.1055/a-2241-9934'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0359',
  NULLIF('10.1089/fpsam.2023.0359', ''),
  'Assessment of Early and Late Management of Submental Gunshot Wounds',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0359' OR iq.doi = '10.1089/fpsam.2023.0359'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0064',
  NULLIF('10.1089/fpsam.2022.0064', ''),
  'Comparison of Soluble and Liposome Encapsulated, Sustained Release Latanoprost for Focal Adipose Reduction',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0064' OR iq.doi = '10.1089/fpsam.2022.0064'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2019.29007.won',
  NULLIF('10.1089/fpsam.2019.29007.won', ''),
  'Complications in Rhinoplasty: A Literature Review and Comparison with a Survey of Consent Forms',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2019.29007.won' OR iq.doi = '10.1089/fpsam.2019.29007.won'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0065',
  NULLIF('10.1089/fpsam.2020.0065', ''),
  'Differences in Female and Male-to-Female Transgender Facial Skin Micro-Vessel Density',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0065' OR iq.doi = '10.1089/fpsam.2020.0065'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1177/26893614251360665',
  NULLIF('10.1177/26893614251360665', ''),
  'Dual Innervation of the Depressor Labii Inferioris and Implications for Deep Plane Facelift and Structural Neck Contouring: Insights from In Vivo Stimulation of the Facial Nerve Branches',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/26893614251360665' OR iq.doi = '10.1177/26893614251360665'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0401',
  NULLIF('10.1089/fpsam.2022.0401', ''),
  'Interpreting Lower Trapezius Musculocutaneous Flap Skin Paddle Perfusion with Indocyanine Green Angiography',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0401' OR iq.doi = '10.1089/fpsam.2022.0401'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0274',
  NULLIF('10.1089/fpsam.2020.0274', ''),
  'Intraoperative Fluoroscopy Reduces Complication and Reoperation Rate in Facial Fractures',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0274' OR iq.doi = '10.1089/fpsam.2020.0274'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0268',
  NULLIF('10.1089/fpsam.2020.0268', ''),
  'Modified ND:YAG Laser Therapy in the Treatment of Cutaneous Venous Malformations',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0268' OR iq.doi = '10.1089/fpsam.2020.0268'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0015',
  NULLIF('10.1089/fpsam.2023.0015', ''),
  'Novel Approach to Facial Rejuvenation by Treating Cutaneous and Soft Tissue for Wrinkles Reduction: First Experience from Multicenter Clinical Trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0015' OR iq.doi = '10.1089/fpsam.2023.0015'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0200',
  NULLIF('10.1089/fpsam.2022.0200', ''),
  'Optimal Timing of Laser Hair Removal in Expanded Forehead Flap in the Reconstruction of Facial Defects: During or After Tissue Expansion?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0200' OR iq.doi = '10.1089/fpsam.2022.0200'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0240',
  NULLIF('10.1089/fpsam.2023.0240', ''),
  'Outcome Evaluation of Reconstructive Septorhinoplasty in Patients with a History of Nasal Skin Necrosis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0240' OR iq.doi = '10.1089/fpsam.2023.0240'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2019.0018',
  NULLIF('10.1089/fpsam.2019.0018', ''),
  'Platelet-Rich Plasma Enhances Distal Flap Viability and Underlying Vascularity in a Radiated Rotational Flap Rodent Model',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2019.0018' OR iq.doi = '10.1089/fpsam.2019.0018'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2024.0026',
  NULLIF('10.1089/fpsam.2024.0026', ''),
  'Safety and Efficacy of Upper Eyelid Orbicularis Oculi Botulinum Toxin in Patients with Synkinesis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2024.0026' OR iq.doi = '10.1089/fpsam.2024.0026'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2025.0058',
  NULLIF('10.12968/joan.2025.0058', ''),
  'A topical approach to <i>GLP-1/GIP agonist-induced tissue changes</i> in the face, neck and décolletage: a case series evaluation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2025.0058' OR iq.doi = '10.12968/joan.2025.0058'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2024.0042',
  NULLIF('10.12968/joan.2024.0042', ''),
  'The ‘less is more’ approach: highlighting the benefits of poly-L-lactic acid filler as a treatment option',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2024.0042' OR iq.doi = '10.12968/joan.2024.0042'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14767',
  NULLIF('10.1111/jocd.14767', ''),
  '1470‐nm Radial fiber‐assisted liposuction for body contouring and facial fat grafting',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14767' OR iq.doi = '10.1111/jocd.14767'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70524',
  NULLIF('10.1111/jocd.70524', ''),
  'A Systematic Review of Platelet‐Rich Plasma Versus Platelet‐Rich Fibrin for Periorbital Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70524' OR iq.doi = '10.1111/jocd.70524'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14591',
  NULLIF('10.1111/jocd.14591', ''),
  'A single‐blinded, randomized, controlled trial comparing efficacy between low‐fluence alexandrite 755‐nm picosecond laser and low‐fluence neodymium‐doped yttrium aluminum garnet (Nd:YAG) 1064‐nm picosecond laser for the treatment of ultraviolet B‐induced hyperpigmentation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14591' OR iq.doi = '10.1111/jocd.14591'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16125',
  NULLIF('10.1111/jocd.16125', ''),
  'A survey on the cosmetic use of injectable polynucleotide: The pattern of practice among Korean Dermatologists',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16125' OR iq.doi = '10.1111/jocd.16125'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13057',
  NULLIF('10.1111/jocd.13057', ''),
  'Aesthetic evolution drives birth of minimally invasive surgery subgroup',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13057' OR iq.doi = '10.1111/jocd.13057'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16358',
  NULLIF('10.1111/jocd.16358', ''),
  'Aesthetic management of lips and perioral region with Hylacross® and Vycross® hyaluronic‐acid based fillers: A document of recommendations',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16358' OR iq.doi = '10.1111/jocd.16358'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15265',
  NULLIF('10.1111/jocd.15265', ''),
  'Application of cryolipolysis in adipose tissue: A systematic review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15265' OR iq.doi = '10.1111/jocd.15265'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70629',
  NULLIF('10.1111/jocd.70629', ''),
  'Auricular Acupuncture for Facial Aesthetics: A Preliminary Retrospective Clinical Study of 217 Cases',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70629' OR iq.doi = '10.1111/jocd.70629'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12802',
  NULLIF('10.1111/jocd.12802', ''),
  'Autologous pure platelet‐rich plasma injections for facial skin rejuvenation: Biometric instrumental evaluations and patient‐reported outcomes to support antiaging effects',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12802' OR iq.doi = '10.1111/jocd.12802'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16307',
  NULLIF('10.1111/jocd.16307', ''),
  'Body contouring effects of at‐home beauty device equipped with suction, radiofrequency, and electrical muscle stimulation functions',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16307' OR iq.doi = '10.1111/jocd.16307'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12326',
  NULLIF('10.1111/jocd.12326', ''),
  'Calcium hydroxylapatite: A review on safety and complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12326' OR iq.doi = '10.1111/jocd.12326'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70547',
  NULLIF('10.1111/jocd.70547', ''),
  'Clinical and Biometric Assessment of a Hyaluronic Acid‐Based Skin Booster for Face, Neck and Décolleté Rejuvenation: A Prospective Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70547' OR iq.doi = '10.1111/jocd.70547'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14141',
  NULLIF('10.1111/jocd.14141', ''),
  'Clinical experience of poly‐L‐lactic acid injections for body contouring treatment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14141' OR iq.doi = '10.1111/jocd.14141'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15942',
  NULLIF('10.1111/jocd.15942', ''),
  'Combination of fractional carbon dioxide laser with recombinant human collagen in periocular skin rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15942' OR iq.doi = '10.1111/jocd.15942'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15695',
  NULLIF('10.1111/jocd.15695', ''),
  'Combining topical dermal infused exosomes with injected calcium hydroxylapatite for enhanced tissue biostimulation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15695' OR iq.doi = '10.1111/jocd.15695'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12208',
  NULLIF('10.1111/jocd.12208', ''),
  'Comparison of clinical marking and ultrasound‐guided injection of Botulinum type A toxin into the masseter muscles for treating bruxism and its cosmetic effects',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12208' OR iq.doi = '10.1111/jocd.12208'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14064',
  NULLIF('10.1111/jocd.14064', ''),
  'Comparison of hyaluronic acid filler ejection pressure with injection force for safe filler injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14064' OR iq.doi = '10.1111/jocd.14064'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16511',
  NULLIF('10.1111/jocd.16511', ''),
  'Comparison of the efficacy and safety of a 730‐nm picosecond titanium sapphire laser and a 1064‐nm picosecond neodymium yttrium aluminum garnet laser for the treatment of acquired bilateral nevus of Ota‐like macules: A split‐face, evaluator‐blinded, randomized, and controlled pilot trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16511' OR iq.doi = '10.1111/jocd.16511'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12495',
  NULLIF('10.1111/jocd.12495', ''),
  'Cryolipolysis for the treatment of submental fat: Review of the literature',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12495' OR iq.doi = '10.1111/jocd.12495'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16684',
  NULLIF('10.1111/jocd.16684', ''),
  'Dermal Filler‐Induced Alopecia: A Case Report and Literature Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16684' OR iq.doi = '10.1111/jocd.16684'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70953',
  NULLIF('10.1111/jocd.70953', ''),
  'Efficacy and Safety of a Modified Poly‐L‐Lactic Acid Filler for Periorbital Rejuvenation: A Prospective, Single‐Arm Clinical Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70953' OR iq.doi = '10.1111/jocd.70953'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16650',
  NULLIF('10.1111/jocd.16650', ''),
  'Efficacy of Subdermal Poly‐ <scp>d</scp> , <scp>l</scp> ‐Lactic Acid Injections for the Treatment of Melasma',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16650' OR iq.doi = '10.1111/jocd.16650'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16467',
  NULLIF('10.1111/jocd.16467', ''),
  'Energy‐based devices and hyaluronic acid filler, polymer filler, and threads: Cadaveric study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16467' OR iq.doi = '10.1111/jocd.16467'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70003',
  NULLIF('10.1111/jocd.70003', ''),
  'Enhancing Facial Projection: Efficacy and Safety of a Novel Filler Combining Cross‐Linked Sodium Hyaluronate Gel With Poly‐L‐Lactic Acid‐b‐<scp>PEG</scp> Microspheres for T‐Zone Augmentation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70003' OR iq.doi = '10.1111/jocd.70003'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13241',
  NULLIF('10.1111/jocd.13241', ''),
  'Erbium fractional laser irradiation combined with autologous platelet‐rich plasma and platelet‐poor plasma application for facial rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13241' OR iq.doi = '10.1111/jocd.13241'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70436',
  NULLIF('10.1111/jocd.70436', ''),
  'Evaluating the Efficacy and Safety of Deoxycholic Acid Injection in Reduction of Flank Fat',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70436' OR iq.doi = '10.1111/jocd.70436'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70149',
  NULLIF('10.1111/jocd.70149', ''),
  'Evaluation of the Efficacy and Safety of Cryolipolysis in Reducing Local Adipose Tissue in Women—A Randomized Pilot Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70149' OR iq.doi = '10.1111/jocd.70149'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70830',
  NULLIF('10.1111/jocd.70830', ''),
  'Factors Associated With Paradoxical Masseteric Bulging After Botulinum Toxin Injection for Masseter Hypertrophy: A Retrospective Analysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70830' OR iq.doi = '10.1111/jocd.70830'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12809',
  NULLIF('10.1111/jocd.12809', ''),
  'Fractional microneedling radiofrequency treatment for axillary osmidrosis: A minimally invasive procedure',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12809' OR iq.doi = '10.1111/jocd.12809'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15862',
  NULLIF('10.1111/jocd.15862', ''),
  'Fractional picosecond laser for atrophic acne scars: A <scp>meta‐analysis</scp>',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15862' OR iq.doi = '10.1111/jocd.15862'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15238',
  NULLIF('10.1111/jocd.15238', ''),
  'Herbal nanocosmecuticals: A review on cosmeceutical innovation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15238' OR iq.doi = '10.1111/jocd.15238'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13692',
  NULLIF('10.1111/jocd.13692', ''),
  'Injectable platelet‐rich fibrin for facial rejuvenation: A prospective, single‐center study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13692' OR iq.doi = '10.1111/jocd.13692'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13050',
  NULLIF('10.1111/jocd.13050', ''),
  'Laser Skin Rejuvenation With Fractional 1064 Q‐switched Nd:YAG In 252 Patients: An Indian Experience',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13050' OR iq.doi = '10.1111/jocd.13050'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12721',
  NULLIF('10.1111/jocd.12721', ''),
  'Literature review of the adverse events associated with botulinum toxin injection for the masseter muscle hypertrophy',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12721' OR iq.doi = '10.1111/jocd.12721'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16404',
  NULLIF('10.1111/jocd.16404', ''),
  'Low‐level laser therapy for skin rejuvenation: A safe and effective solution baked by data and visual evidence',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16404' OR iq.doi = '10.1111/jocd.16404'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15990',
  NULLIF('10.1111/jocd.15990', ''),
  'Management strategies for vascular complications in hyaluronic acid filler injections: A case series analysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15990' OR iq.doi = '10.1111/jocd.15990'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70393',
  NULLIF('10.1111/jocd.70393', ''),
  'Managing Menopausal Skin Changes: A Narrative Review of Skin Quality Changes, Their Aesthetic Impact, and the Actual Role of Hormone Replacement Therapy in Improvement',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70393' OR iq.doi = '10.1111/jocd.70393'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16669',
  NULLIF('10.1111/jocd.16669', ''),
  'Melasma Management: A Comprehensive Review of Treatment Strategies Including <scp>BTX‐A</scp>',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16669' OR iq.doi = '10.1111/jocd.16669'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2010.00488.x',
  NULLIF('10.1111/j.1473-2165.2010.00488.x', ''),
  'Melasma: Treatment with 10% tretinoin peeling mask',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2010.00488.x' OR iq.doi = '10.1111/j.1473-2165.2010.00488.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12052',
  NULLIF('10.1111/jocd.12052', ''),
  'New application of the long‐pulsed <scp>N</scp>d‐<scp>YAG</scp> laser as an ablative resurfacing tool for skin rejuvenation: a 7‐year study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12052' OR iq.doi = '10.1111/jocd.12052'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16671',
  NULLIF('10.1111/jocd.16671', ''),
  'Nonfacial Skin Rejuvenation of the Neck, Chest, and Hands. Part Two: Using Laser Techniques',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16671' OR iq.doi = '10.1111/jocd.16671'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15674',
  NULLIF('10.1111/jocd.15674', ''),
  'Novel laser hair removal in all skin types',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15674' OR iq.doi = '10.1111/jocd.15674'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15766',
  NULLIF('10.1111/jocd.15766', ''),
  'Patient satisfaction of microfocused ultrasound treatments on the face and neck laxity: A narrative review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15766' OR iq.doi = '10.1111/jocd.15766'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70442',
  NULLIF('10.1111/jocd.70442', ''),
  'Persistent Nodules on Necklines Following Hyaluronic Acid Filler: A Case Report',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70442' OR iq.doi = '10.1111/jocd.70442'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14172',
  NULLIF('10.1111/jocd.14172', ''),
  'Personalized video consent in Blepharoplasty: A new paradigm in the preoperative consent giving process',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14172' OR iq.doi = '10.1111/jocd.14172'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13322',
  NULLIF('10.1111/jocd.13322', ''),
  'Plasma rich in growth factor gel as an autologous filler for facial volume restoration',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13322' OR iq.doi = '10.1111/jocd.13322'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13157',
  NULLIF('10.1111/jocd.13157', ''),
  'Platelet‐rich plasma treatment for melasma: A pilot study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13157' OR iq.doi = '10.1111/jocd.13157'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13518',
  NULLIF('10.1111/jocd.13518', ''),
  'Polycaprolactone‐based dermal filler complications: A retrospective study of 1111 treatments',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13518' OR iq.doi = '10.1111/jocd.13518'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70946',
  NULLIF('10.1111/jocd.70946', ''),
  'Polynucleotide Injection for Enlarged Pores: Comparison of Intradermal Needle and Subdermal Cannula Techniques in a Randomized Split‐Face Trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70946' OR iq.doi = '10.1111/jocd.70946'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70736',
  NULLIF('10.1111/jocd.70736', ''),
  'Prospective Observational Study of Polynucleotide Injections for Periorbital Rhytides',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70736' OR iq.doi = '10.1111/jocd.70736'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13472',
  NULLIF('10.1111/jocd.13472', ''),
  'Prospective and randomized comparative study of calcium hydroxylapatite vs calcium hydroxylapatite plus HIFU in treatment of moderate‐to‐severe acne scars',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13472' OR iq.doi = '10.1111/jocd.13472'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13022',
  NULLIF('10.1111/jocd.13022', ''),
  'Radial shockwave therapy for male erectile rejuvenation in a dermatology and/or medical aesthetic practice',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13022' OR iq.doi = '10.1111/jocd.13022'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70845',
  NULLIF('10.1111/jocd.70845', ''),
  'Radiofrequency Microneedling for Facial Rejuvenation: A Systematic Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70845' OR iq.doi = '10.1111/jocd.70845'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14831',
  NULLIF('10.1111/jocd.14831', ''),
  'Randomized, evaluator‐blinded comparative study of a potassium titanyl phosphate (KTP) 532‐nm picosecond laser and an alexandrite 755‐nm picosecond laser for the treatment of solar lentigines in Asians',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14831' OR iq.doi = '10.1111/jocd.14831'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12082',
  NULLIF('10.1111/jocd.12082', ''),
  'Remodeling of periorbital, temporal, glabellar, and crow''s feet areas with hyaluronic acid and botulinum toxin',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12082' OR iq.doi = '10.1111/jocd.12082'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13285',
  NULLIF('10.1111/jocd.13285', ''),
  'Retrospective photographic review of nontattoo indications treated by picosecond laser',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13285' OR iq.doi = '10.1111/jocd.13285'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16182',
  NULLIF('10.1111/jocd.16182', ''),
  'Spontaneous resolution of eruptive papules following ablative laser resurfacing—Case report and review of <scp>laser‐associated</scp> eruptive keratoacanthomas',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16182' OR iq.doi = '10.1111/jocd.16182'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15745',
  NULLIF('10.1111/jocd.15745', ''),
  'Successful treatment of submental fat using a non‐focused pulsed ultrasound',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15745' OR iq.doi = '10.1111/jocd.15745'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70088',
  NULLIF('10.1111/jocd.70088', ''),
  'The Effect of Diluted Deoxycholic Acid on Arm Fat Reduction: Evaluation of Its Potential in Minimally Invasive Fat Loss Treatment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70088' OR iq.doi = '10.1111/jocd.70088'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16691',
  NULLIF('10.1111/jocd.16691', ''),
  'The Transformative Potential of <scp>AI</scp> in Ultrasound for Facial Aesthetics',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16691' OR iq.doi = '10.1111/jocd.16691'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12529',
  NULLIF('10.1111/jocd.12529', ''),
  'The efficacy and complications of a new technique of Abobotulinum‐toxin A (Dysport) injection in patients with glabellar lines',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12529' OR iq.doi = '10.1111/jocd.12529'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16228',
  NULLIF('10.1111/jocd.16228', ''),
  'The role, safety, and efficacy of hyperbaric oxygen therapy in aesthetic practice—An evidence‐based review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16228' OR iq.doi = '10.1111/jocd.16228'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2009.00464.x',
  NULLIF('10.1111/j.1473-2165.2009.00464.x', ''),
  'The science and art of hyaluronic acid dermal filler use in esthetic applications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2009.00464.x' OR iq.doi = '10.1111/j.1473-2165.2009.00464.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13824',
  NULLIF('10.1111/jocd.13824', ''),
  'The use of radiofrequency‐assisted lipolysis with radiofrequency microneedling in premature jowl and neck laxity following facialplasty',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13824' OR iq.doi = '10.1111/jocd.13824'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16595',
  NULLIF('10.1111/jocd.16595', ''),
  'Therapeutic Performance of Needle Injection Versus Needle‐Free Jet Injector System for Polynucleotide Filler in Skin Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16595' OR iq.doi = '10.1111/jocd.16595'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70056',
  NULLIF('10.1111/jocd.70056', ''),
  'Treatment of Porphyria Cutanea Tarda Scarring With Combination Laser Treatment and a Pilot Use of Artificial Intelligence to Quantify Laser Results',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70056' OR iq.doi = '10.1111/jocd.70056'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12059',
  NULLIF('10.1111/jocd.12059', ''),
  'Treatment of forehead/glabellar rhytide complex with combination botulinum toxin a and hyaluronic acid versus botulinum toxin a injection alone: a split‐face, rater‐blinded, randomized control trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12059' OR iq.doi = '10.1111/jocd.12059'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13445',
  NULLIF('10.1111/jocd.13445', ''),
  'Twelve‐month prospective study of polymethylmethacrylate/collagen dermal filler for volume loss of the dorsal of hands',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13445' OR iq.doi = '10.1111/jocd.13445'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_38_2024',
  NULLIF('10.25259/jcas_38_2024', ''),
  'A comparative study of the efficacy of autologous platelet-rich fibrin matrix versus platelet-rich plasma in the treatment of non-healing leg ulcers',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_38_2024' OR iq.doi = '10.25259/jcas_38_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_182_19',
  NULLIF('10.4103/jcas.jcas_182_19', ''),
  'A pilot study to compare therapeutic efficacy and safety of combined treatment of skin microneedling and depigmenting cream versus depigmenting cream alone in facial melasma at tertiary care center',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_182_19' OR iq.doi = '10.4103/jcas.jcas_182_19'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_106_2024',
  NULLIF('10.25259/jcas_106_2024', ''),
  'Acneiform eruptions – Side effect of laser tattoo removal: A case series',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_106_2024' OR iq.doi = '10.25259/jcas_106_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_10_2024',
  NULLIF('10.25259/jcas_10_2024', ''),
  'Combined supraperiosteal microfat grafting and intradermal nanofat for the treatment of periorbital melanosis (dark circles)',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_10_2024' OR iq.doi = '10.25259/jcas_10_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_133_23',
  NULLIF('10.4103/jcas.jcas_133_23', ''),
  'Comparison of safety and efficacy of two brands of botulinum toxin A for the treatment of lateral canthal lines (crow’s feet): A split-face study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_133_23' OR iq.doi = '10.4103/jcas.jcas_133_23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_209_22',
  NULLIF('10.25259/jcas_209_22', ''),
  'Delayed vascular occlusion following hyaluronic acid-based skin booster – A rare case report',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_209_22' OR iq.doi = '10.25259/jcas_209_22'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_29_2024',
  NULLIF('10.25259/jcas_29_2024', ''),
  'Efficacy and safety of Q-switched neodymium-doped yttrium aluminum garnet (532 nm) in freckles in skin of color patients',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_29_2024' OR iq.doi = '10.25259/jcas_29_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_44_23',
  NULLIF('10.25259/jcas_44_23', ''),
  'Efficacy and safety of microneedling radiofrequency in patterned hair loss',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_44_23' OR iq.doi = '10.25259/jcas_44_23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_171_18',
  NULLIF('10.4103/jcas.jcas_171_18', ''),
  'Fractional carbon dioxide laser: Optimizing treatment outcomes for pigmented atrophic acne scars in skin of color',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_171_18' OR iq.doi = '10.4103/jcas.jcas_171_18'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_194_20',
  NULLIF('10.4103/jcas.jcas_194_20', ''),
  'Giant PMMA foreign body granulomas with imaging',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_194_20' OR iq.doi = '10.4103/jcas.jcas_194_20'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_116_21',
  NULLIF('10.4103/jcas.jcas_116_21', ''),
  'Nevus of Ota: Combination Treatment with Q-Switched neodymium-doped yttrium aluminum garnet laser and fractional CO2 laser',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_116_21' OR iq.doi = '10.4103/jcas.jcas_116_21'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_15_2024',
  NULLIF('10.25259/jcas_15_2024', ''),
  'Optimizing management of secondary changes in port-wine stains: Navigating resource constraints with staged debulking surgery and radio frequency ablation',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_15_2024' OR iq.doi = '10.25259/jcas_15_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_206_22',
  NULLIF('10.4103/jcas.jcas_206_22', ''),
  'Platelet rich plasma combination therapies for treatment of androgenetic alopecia: A systematic review',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_206_22' OR iq.doi = '10.4103/jcas.jcas_206_22'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_88_2024',
  NULLIF('10.25259/jcas_88_2024', ''),
  'Pro-yellow laser therapy in vascular and non-vascular skin disorders: A narrative review',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_88_2024' OR iq.doi = '10.25259/jcas_88_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_137_23',
  NULLIF('10.4103/jcas.jcas_137_23', ''),
  'Spontaneous and induced degradation of dermal fillers: A review',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_137_23' OR iq.doi = '10.4103/jcas.jcas_137_23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_11_2025',
  NULLIF('10.25259/jcas_11_2025', ''),
  'Surgical pearl: A simple technique to prevent involuntary eyelid movement during skin tag removal',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_11_2025' OR iq.doi = '10.25259/jcas_11_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_81_2024',
  NULLIF('10.25259/jcas_81_2024', ''),
  'The case of Botulinum toxin type A and depressed skin lesion: Case presentation, review of the literature, and definition proposal',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_81_2024' OR iq.doi = '10.25259/jcas_81_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_16_2024',
  NULLIF('10.25259/jcas_16_2024', ''),
  'Triple combination of fractional carbon dioxide laser, 308-nm excimer lamp, and platelet-rich plasma in refractory vitiligo: A randomized split-body comparative study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_16_2024' OR iq.doi = '10.25259/jcas_16_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2023.136',
  NULLIF('10.20517/2347-9264.2023.136', ''),
  'Current uses of adipose grafting with platelet-rich plasma',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2023.136' OR iq.doi = '10.20517/2347-9264.2023.136'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2025.25',
  NULLIF('10.20517/2347-9264.2025.25', ''),
  'Hyaluronic acid skin booster injection and cold laser therapy in oral wounds: an experimental study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2025.25' OR iq.doi = '10.20517/2347-9264.2025.25'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2023.100',
  NULLIF('10.20517/2347-9264.2023.100', ''),
  'Management of visual complications of dermal filler injections',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2023.100' OR iq.doi = '10.20517/2347-9264.2023.100'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2022.28',
  NULLIF('10.20517/2347-9264.2022.28', ''),
  'Non-ischemic complications of dermal fillers',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2022.28' OR iq.doi = '10.20517/2347-9264.2022.28'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2019.68',
  NULLIF('10.20517/2347-9264.2019.68', ''),
  'The benefit of combined radiofrequency and ultrasound to enhance surgical and nonsurgical outcomes for the face and neck',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2019.68' OR iq.doi = '10.20517/2347-9264.2019.68'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2020.121',
  NULLIF('10.20517/2347-9264.2020.121', ''),
  'The interaction between hyaluronidase and hyaluronic acid gel fillers - a review of the literature and comparative analysis',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2020.121' OR iq.doi = '10.20517/2347-9264.2020.121'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2024.119',
  NULLIF('10.20517/2347-9264.2024.119', ''),
  'Thermal degradation of hyaluronic acid dermal fillers',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2024.119' OR iq.doi = '10.20517/2347-9264.2024.119'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjac344',
  NULLIF('10.1093/asj/sjac344', ''),
  'Aesthetic Implantation of Calcium Hydroxylapatite Does Not Interfere With Radiological Assessment of Bones in the Dorsum of the Hands',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac344' OR iq.doi = '10.1093/asj/sjac344'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaa341',
  NULLIF('10.1093/asj/sjaa341', ''),
  'An Expert Consensus Study for Informed Consent in Primary Breast Augmentation Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa341' OR iq.doi = '10.1093/asj/sjaa341'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjz206',
  NULLIF('10.1093/asj/sjz206', ''),
  'Attitudes, Beliefs, and Practices of Aesthetic Plastic Surgeons Regarding Informed Consent',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz206' OR iq.doi = '10.1093/asj/sjz206'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab136',
  NULLIF('10.1093/asj/sjab136', ''),
  'Commentary on: Long-term Outcomes of Ophthalmic and Retinal Artery Occlusion After Cosmetic Facial Filler Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab136' OR iq.doi = '10.1093/asj/sjab136'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab159',
  NULLIF('10.1093/asj/sjab159', ''),
  'Commentary on: Long-term Outcomes of Ophthalmic and Retinal Artery Occlusion After Cosmetic Facial Filler Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab159' OR iq.doi = '10.1093/asj/sjab159'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad058',
  NULLIF('10.1093/asj/sjad058', ''),
  'Comparison of Microfat, Nanofat, and Extracellular Matrix/Stromal Vascular Fraction Gel for Skin Rejuvenation: Basic Animal Research',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad058' OR iq.doi = '10.1093/asj/sjad058'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab033',
  NULLIF('10.1093/asj/sjab033', ''),
  'Comparison of Microfat, Nanofat, and Extracellular Matrix/Stromal Vascular Fraction Gel for Skin Rejuvenation: Basic Research and Clinical Applications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab033' OR iq.doi = '10.1093/asj/sjab033'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf129',
  NULLIF('10.1093/asj/sjaf129', ''),
  'Comparison of Patient Reviews for Submental Liposuction and Kybella Using Deep Learning and Natural Language Processing: Is There a Superior Intervention for Submental Adiposity?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf129' OR iq.doi = '10.1093/asj/sjaf129'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjz066',
  NULLIF('10.1093/asj/sjz066', ''),
  'Conventional Nanofat and SVF/ADSC-Concentrated Nanofat: A Comparative Study on Improving Photoaging of Nude Mice Skin',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz066' OR iq.doi = '10.1093/asj/sjz066'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad031',
  NULLIF('10.1093/asj/sjad031', ''),
  'Facial Dermal Filler Injection and Vaccination: A 12-Year Review of Adverse Event Reporting and Literature Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad031' OR iq.doi = '10.1093/asj/sjad031'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjx081',
  NULLIF('10.1093/asj/sjx081', ''),
  'Heterogeneity in Body Contouring Outcomes Based Research: The Pittsburgh Body Contouring Complication Reporting System',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjx081' OR iq.doi = '10.1093/asj/sjx081'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad018',
  NULLIF('10.1093/asj/sjad018', ''),
  'Photobiomodulation: A Systematic Review of the Oncologic Safety of Low-Level Light Therapy for Aesthetic Skin Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad018' OR iq.doi = '10.1093/asj/sjad018'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad364',
  NULLIF('10.1093/asj/sjad364', ''),
  'Practice Patterns and Perspectives of the Off-Label Use of GLP-1 Agonists for Cosmetic Weight Loss',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad364' OR iq.doi = '10.1093/asj/sjad364'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad349',
  NULLIF('10.1093/asj/sjad349', ''),
  'Treating Glabellar Lines With Botulinum Toxin: Does Your Patient Need to Frown Steadily?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad349' OR iq.doi = '10.1093/asj/sjad349'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjae018',
  NULLIF('10.1093/asj/sjae018', ''),
  'What are the Factors That Induce Paradoxical Hypertrichosis After Laser Hair Removal?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae018' OR iq.doi = '10.1093/asj/sjae018'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s532685',
  NULLIF('10.2147/ccid.s532685', ''),
  'Combination of Three Treatment Modes of 1064 nm Nd: YAG Laser in the Treatment of Melasma: A Retrospective Observational Study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s532685' OR iq.doi = '10.2147/ccid.s532685'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s577128',
  NULLIF('10.2147/ccid.s577128', ''),
  'Concomitant Use of Dermo-Cosmetic Skin Care in Aesthetic Procedures: Systematic Review with Expert Panel Recommendations',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s577128' OR iq.doi = '10.2147/ccid.s577128'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s44371',
  NULLIF('10.2147/ccid.s44371', ''),
  'Cryolipolysis for noninvasive body contouring: clinical efficacy and patient satisfaction',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s44371' OR iq.doi = '10.2147/ccid.s44371'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s41537',
  NULLIF('10.2147/ccid.s41537', ''),
  'Onset and duration of effect of incobotulinumtoxinA, onabotulinumtoxinA, and abobotulinumtoxinA in the treatment of glabellar frown lines: a randomized, double-blind study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s41537' OR iq.doi = '10.2147/ccid.s41537'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s178817',
  NULLIF('10.2147/ccid.s178817', ''),
  'Platelet-rich plasma versus combined fractional carbon dioxide laser with platelet-rich plasma in the treatment of vitiligo: a comparative study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s178817' OR iq.doi = '10.2147/ccid.s178817'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s566829',
  NULLIF('10.2147/ccid.s566829', ''),
  'Poly-L-Lactic Acid in Facial Rejuvenation: Volumetric Data Supporting Regenerative Outcomes',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s566829' OR iq.doi = '10.2147/ccid.s566829'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s446891',
  NULLIF('10.2147/ccid.s446891', ''),
  'The Patient Journey in Facial Aesthetics: Findings from a European Consensus Meeting on Improving the Quality of Life for Patients Receiving Botulinum Toxin Injections',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s446891' OR iq.doi = '10.2147/ccid.s446891'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics9010011',
  NULLIF('10.3390/cosmetics9010011', ''),
  'Aeroterrestrial and Extremophilic Microalgae as Promising Sources for Lipids and Lipid Nanoparticles in Dermal Cosmetics',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics9010011' OR iq.doi = '10.3390/cosmetics9010011'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10030086',
  NULLIF('10.3390/cosmetics10030086', ''),
  'Cosmetic and Pharmaceutic Products with Selected Natural and Synthetic Substances for Melasma Treatment and Methods of Their Analysis',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10030086' OR iq.doi = '10.3390/cosmetics10030086'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13010030',
  NULLIF('10.3390/cosmetics13010030', ''),
  'Evaluation of Combined Chemical Peeling and Microneedling Protocols in the Treatment of Acne-Prone Skin: A Pilot Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13010030' OR iq.doi = '10.3390/cosmetics13010030'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11060213',
  NULLIF('10.3390/cosmetics11060213', ''),
  'Evaluation of the Effects of Age, Sex, and Dexpanthenol-Containing Skin Care on the Facial and Body Skin Microbiome',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11060213' OR iq.doi = '10.3390/cosmetics11060213'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12030127',
  NULLIF('10.3390/cosmetics12030127', ''),
  'Evolution of Thread Lifting: Advancing Toward Bioactive Polymers and Sustained Hyaluronic Acid Delivery',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12030127' OR iq.doi = '10.3390/cosmetics12030127'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11010013',
  NULLIF('10.3390/cosmetics11010013', ''),
  'Impact of Lifestyle on Differences in Skin Hydration of Selected Body Areas in Young Women',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11010013' OR iq.doi = '10.3390/cosmetics11010013'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12050199',
  NULLIF('10.3390/cosmetics12050199', ''),
  'Laser-Assisted Exosome Delivery (LAED) with Fractional CO2 Laser: A Pilot Two-Case Report and Narrative Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12050199' OR iq.doi = '10.3390/cosmetics12050199'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics9010007',
  NULLIF('10.3390/cosmetics9010007', ''),
  'Licorice (Glycyrrhiza glabra, G. uralensis, and G. inflata) and Their Constituents as Active Cosmeceutical Ingredients',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics9010007' OR iq.doi = '10.3390/cosmetics9010007'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10020038',
  NULLIF('10.3390/cosmetics10020038', ''),
  'Low-Molecular-Weight Gels as Smart Materials for the Enhancement of Antioxidants Activity',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10020038' OR iq.doi = '10.3390/cosmetics10020038'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10040113',
  NULLIF('10.3390/cosmetics10040113', ''),
  'Nanogels Based on Hyaluronic Acid as Potential Active Carriers for Dermatological and Cosmetic Applications',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10040113' OR iq.doi = '10.3390/cosmetics10040113'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics8040118',
  NULLIF('10.3390/cosmetics8040118', ''),
  'New Functions of Low-Molecular-Weight Hyaluronic Acid on Epidermis Filaggrin Production and Degradation',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics8040118' OR iq.doi = '10.3390/cosmetics8040118'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13030120',
  NULLIF('10.3390/cosmetics13030120', ''),
  'Novel Vegan Exosome-like Biomimetic Vesicles for Skin and Hair Follicle Protection and Rejuvenation: Structural and Functional Characterization and Placebo-Controlled Clinical Efficacy Studies',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13030120' OR iq.doi = '10.3390/cosmetics13030120'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12030094',
  NULLIF('10.3390/cosmetics12030094', ''),
  'Personalized Beauty: How Clinical Insights Shape Tailored Aesthetic Treatments',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12030094' OR iq.doi = '10.3390/cosmetics12030094'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13010033',
  NULLIF('10.3390/cosmetics13010033', ''),
  'Protective Mechanisms of Black Ginseng Extract on Collagen Synthesis in Chronic Photoaging',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13010033' OR iq.doi = '10.3390/cosmetics13010033'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics8030089',
  NULLIF('10.3390/cosmetics8030089', ''),
  'Skin Care Formulations and Lipid Carriers as Skin Moisturizing Agents',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics8030089' OR iq.doi = '10.3390/cosmetics8030089'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics8030068',
  NULLIF('10.3390/cosmetics8030068', ''),
  'Thanaka (H. crenulata, N. crenulata, L. acidissima L.): A Systematic Review of Its Chemical, Biological Properties and Cosmeceutical Applications',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics8030068' OR iq.doi = '10.3390/cosmetics8030068'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020097',
  NULLIF('10.3390/cosmetics13020097', ''),
  'The Use of Robotic Systems in Aesthetic/Cosmetic Plastic Surgery—A Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020097' OR iq.doi = '10.3390/cosmetics13020097'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004441',
  NULLIF('10.1097/dss.0000000000004441', ''),
  'A Review of Best Practices for Gender-Affirming Laser Hair Removal',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004441' OR iq.doi = '10.1097/dss.0000000000004441'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001551',
  NULLIF('10.1097/dss.0000000000001551', ''),
  'A Review of the Use of Ultrasound for Skin Tightening, Body Contouring, and Cellulite Reduction in Dermatology',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001551' OR iq.doi = '10.1097/dss.0000000000001551'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001203',
  NULLIF('10.1097/dss.0000000000001203', ''),
  'Calcium Hydroxylapatite Dermal Filler for Treatment of Dorsal Hand Volume Loss: Results From a 12-Month, Multicenter, Randomized, Blinded Trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001203' OR iq.doi = '10.1097/dss.0000000000001203'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001045',
  NULLIF('10.1097/dss.0000000000001045', ''),
  'Different Glabellar Contraction Patterns in Chinese and Efficacy of Botulinum Toxin Type A for Treating Glabellar Lines: A Pilot Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001045' OR iq.doi = '10.1097/dss.0000000000001045'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005042',
  NULLIF('10.1097/dss.0000000000005042', ''),
  'Efficacy and Safety of Sodium Hyaluronate Gel for Facial Skin Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005042' OR iq.doi = '10.1097/dss.0000000000005042'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005145',
  NULLIF('10.1097/dss.0000000000005145', ''),
  'Exploratory Study on Physician-Reported Dermatologic and Aesthetic Outcomes of Weight-Management Medications: Call for the Development of a Holistic Procedural Approach',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005145' OR iq.doi = '10.1097/dss.0000000000005145'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003548',
  NULLIF('10.1097/dss.0000000000003548', ''),
  'High-Frequency Ultrasound for Long-term Safety Assessment of Poly-L-Lactic Acid Facial Filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003548' OR iq.doi = '10.1097/dss.0000000000003548'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004624',
  NULLIF('10.1097/dss.0000000000004624', ''),
  'High-Intensity, High-Frequency, Parallel Ultrasound Beam Device for Skin Laxity of the Upper Arms',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004624' OR iq.doi = '10.1097/dss.0000000000004624'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000908',
  NULLIF('10.1097/dss.0000000000000908', ''),
  'Management of Patient Experience With ATX-101 (Deoxycholic Acid Injection) for Reduction of Submental Fat',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000908' OR iq.doi = '10.1097/dss.0000000000000908'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004963',
  NULLIF('10.1097/dss.0000000000004963', ''),
  'Mapping Filler Nodules: Ultrasound Characteristics and Clinical Patterns in Dermal Filler Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004963' OR iq.doi = '10.1097/dss.0000000000004963'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004787',
  NULLIF('10.1097/dss.0000000000004787', ''),
  'New Applications of Intense Pulsed Light in Facial Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004787' OR iq.doi = '10.1097/dss.0000000000004787'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005150',
  NULLIF('10.1097/dss.0000000000005150', ''),
  'Occupational Risk of Sexually Transmitted Infections in Aesthetic Dermatology and Dermatologic Surgery: Evidence and Prevention',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005150' OR iq.doi = '10.1097/dss.0000000000005150'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000870',
  NULLIF('10.1097/dss.0000000000000870', ''),
  'Overview of ATX-101 (Deoxycholic Acid Injection): A Nonsurgical Approach for Reduction of Submental Fat',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000870' OR iq.doi = '10.1097/dss.0000000000000870'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004115',
  NULLIF('10.1097/dss.0000000000004115', ''),
  'Platelet-Rich Plasma: Advances and Controversies in Hair Restoration and Skin Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004115' OR iq.doi = '10.1097/dss.0000000000004115'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002222',
  NULLIF('10.1097/dss.0000000000002222', ''),
  'Postmarket Experience of Polymethylmethacrylate–Collagen Gel Dermal Filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002222' OR iq.doi = '10.1097/dss.0000000000002222'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000898',
  NULLIF('10.1097/dss.0000000000000898', ''),
  'Prevention and Management of Injection-Related Adverse Effects in Facial Aesthetics: Considerations for ATX-101 (Deoxycholic Acid Injection) Treatment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000898' OR iq.doi = '10.1097/dss.0000000000000898'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004986',
  NULLIF('10.1097/dss.0000000000004986', ''),
  'Proof of Concept, Feasibility, and Safety of Local Anticholinesterase Treatment for Neuromodulator-Induced Facial Muscle Paralysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004986' OR iq.doi = '10.1097/dss.0000000000004986'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001181',
  NULLIF('10.1097/dss.0000000000001181', ''),
  'Quantitative Analysis of Face and Neck Skin Tightening by Microfocused Ultrasound With Visualization in Asians',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001181' OR iq.doi = '10.1097/dss.0000000000001181'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003704',
  NULLIF('10.1097/dss.0000000000003704', ''),
  'Skin Aging Exposome in Skin of Color Populations: Review of the Literature',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003704' OR iq.doi = '10.1097/dss.0000000000003704'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000882',
  NULLIF('10.1097/dss.0000000000000882', ''),
  'The Efficacy of Massage in Reducing Nodule Formation After Poly-l-Lactic Acid Administration for Facial Volume Loss: A Randomized, Evaluator-Blinded Clinical Trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000882' OR iq.doi = '10.1097/dss.0000000000000882'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003860',
  NULLIF('10.1097/dss.0000000000003860', ''),
  'Updating the Fitzpatrick Classification: The Skin Color and Ethnicity Scale',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003860' OR iq.doi = '10.1097/dss.0000000000003860'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0041-1741531',
  NULLIF('10.1055/s-0041-1741531', ''),
  'Botulinum Toxin Type A: Adverse Events and Management',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0041-1741531' OR iq.doi = '10.1055/s-0041-1741531'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2628-3831',
  NULLIF('10.1055/a-2628-3831', ''),
  'Cryolipolysis for Submental Fat Reduction: A Systematic Review and Meta-Analysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2628-3831' OR iq.doi = '10.1055/a-2628-3831'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2666-5719',
  NULLIF('10.1055/a-2666-5719', ''),
  'First Clinical Experiences with Microfocused Ultrasound in Infraorbital Rejuvenation: A Clinically and Scientifically Grounded Perspective',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2666-5719' OR iq.doi = '10.1055/a-2666-5719'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0035-1555628',
  NULLIF('10.1055/s-0035-1555628', ''),
  'Injection Rhinoplasty with Hyaluronic Acid and Calcium Hydroxyapatite: A Retrospective Survey Investigating Outcome and Complication Rates',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0035-1555628' OR iq.doi = '10.1055/s-0035-1555628'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0037-1621730',
  NULLIF('10.1055/s-0037-1621730', ''),
  'Intra-Arterial Thrombolytic Therapy Is Not a Therapeutic Option for Filler-Related Central Retinal Artery Occlusion',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0037-1621730' OR iq.doi = '10.1055/s-0037-1621730'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2849-8666',
  NULLIF('10.1055/a-2849-8666', ''),
  'Micro Botulinum Toxin Techniques',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2849-8666' OR iq.doi = '10.1055/a-2849-8666'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2559-7309',
  NULLIF('10.1055/a-2559-7309', ''),
  'Selecting the Right Technique for the Treatment of Submental Adiposity',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2559-7309' OR iq.doi = '10.1055/a-2559-7309'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2025.0193',
  NULLIF('10.1089/fpsam.2025.0193', ''),
  'Acute Complication after Self-Injection of Lip Filler: What Should You Do Next?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2025.0193' OR iq.doi = '10.1089/fpsam.2025.0193'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0326',
  NULLIF('10.1089/fpsam.2023.0326', ''),
  'Analysis of Breast Milk Samples in Lactating Women After Undergoing Botulinum Toxin Injections for Facial Rejuvenation: A Pilot Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0326' OR iq.doi = '10.1089/fpsam.2023.0326'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0398',
  NULLIF('10.1089/fpsam.2020.0398', ''),
  'Anatomical Continuation Between the Sub-Superficial Musculoaponeurotic System Fat and Retro-Orbicularis Oculi Fat: The True Nature of the Retro-Orbicularis Oculi Fat',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0398' OR iq.doi = '10.1089/fpsam.2020.0398'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0234',
  NULLIF('10.1089/fpsam.2020.0234', ''),
  'Case Series of Botulinum Toxin Administered to Pregnant Patients and Review of the Literature',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0234' OR iq.doi = '10.1089/fpsam.2020.0234'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0294',
  NULLIF('10.1089/fpsam.2023.0294', ''),
  'Impurities in Hyaluronic Acid Dermal Fillers? A Narrative Review on Nonanimal Cross-Linked Fillers',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0294' OR iq.doi = '10.1089/fpsam.2023.0294'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0059',
  NULLIF('10.1089/fpsam.2020.0059', ''),
  'Societal-Perceived Health Utility of Hypertrophic Facial Port-Wine Stain and Laser Treatment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0059' OR iq.doi = '10.1089/fpsam.2020.0059'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0176',
  NULLIF('10.1089/fpsam.2022.0176', ''),
  'Ultrasound-Guided Temple Filler Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0176' OR iq.doi = '10.1089/fpsam.2022.0176'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2023.12.8.351',
  NULLIF('10.12968/joan.2023.12.8.351', ''),
  'Case study: Managing filler migration and poor placement with topical and injectable hyaluronidase and filler multilayering',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2023.12.8.351' OR iq.doi = '10.12968/joan.2023.12.8.351'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/jcyn.2007.1.2.23748',
  NULLIF('10.12968/jcyn.2007.1.2.23748', ''),
  'Evidence-based practice: non-invasive blood pressure measurement in children',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/jcyn.2007.1.2.23748' OR iq.doi = '10.12968/jcyn.2007.1.2.23748'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2021.10.sup1.6',
  NULLIF('10.12968/joan.2021.10.sup1.6', ''),
  'Filler in the foot: treatment of plantar fat pad atrophy with dermal fillers',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2021.10.sup1.6' OR iq.doi = '10.12968/joan.2021.10.sup1.6'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2021.10.9.396',
  NULLIF('10.12968/joan.2021.10.9.396', ''),
  'Hear, hear for ultrasound',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2021.10.9.396' OR iq.doi = '10.12968/joan.2021.10.9.396'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.9.424',
  NULLIF('10.12968/joan.2014.3.9.424', ''),
  'Laser skin resurfacing: an overview of treatment options and outcomes',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.9.424' OR iq.doi = '10.12968/joan.2014.3.9.424'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.sup1.26',
  NULLIF('10.12968/joan.2018.7.sup1.26', ''),
  'Laser skin resurfacing: an overview of treatment options and outcomes',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.sup1.26' OR iq.doi = '10.12968/joan.2018.7.sup1.26'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2016.5.8.382',
  NULLIF('10.12968/joan.2016.5.8.382', ''),
  'Manual and electronic microneedling: treatment outcomes and protocols',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2016.5.8.382' OR iq.doi = '10.12968/joan.2016.5.8.382'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.10.502',
  NULLIF('10.12968/joan.2014.3.10.502', ''),
  'The influence of advertising on patient consent and expectations',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.10.502' OR iq.doi = '10.12968/joan.2014.3.10.502'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13037',
  NULLIF('10.1111/jocd.13037', ''),
  'A topical regimen improves skin healing and aesthetic outcomes when combined with a radiofrequency microneedling procedure',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13037' OR iq.doi = '10.1111/jocd.13037'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16327',
  NULLIF('10.1111/jocd.16327', ''),
  'Academic visualization study of aesthetic medicine management and related legal research since 2000',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16327' OR iq.doi = '10.1111/jocd.16327'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13667',
  NULLIF('10.1111/jocd.13667', ''),
  'Botulinum toxin complications in registered and off‐label aesthetic indications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13667' OR iq.doi = '10.1111/jocd.13667'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70034',
  NULLIF('10.1111/jocd.70034', ''),
  'Circumcision‐Associated Penile Papules: A Novel Complication With Unclear Etiology',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70034' OR iq.doi = '10.1111/jocd.70034'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70224',
  NULLIF('10.1111/jocd.70224', ''),
  'Clinical Efficacy and Safety of a Highly Purified Polynucleotide for Dry and Chapped Lips: A Prospective, Multicenter Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70224' OR iq.doi = '10.1111/jocd.70224'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12108',
  NULLIF('10.1111/jocd.12108', ''),
  'Clinical resistance to three types of botulinum toxin type <scp>A</scp> in aesthetic medicine',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12108' OR iq.doi = '10.1111/jocd.12108'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15393',
  NULLIF('10.1111/jocd.15393', ''),
  'Combination non‐invasive radiofrequency and electrical muscle stimulation: A synergistic combination for body contouring',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15393' OR iq.doi = '10.1111/jocd.15393'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2006.00237.x',
  NULLIF('10.1111/j.1473-2165.2006.00237.x', ''),
  'Combination of chemical peelings with botulinum toxin injections and dermal fillers',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2006.00237.x' OR iq.doi = '10.1111/j.1473-2165.2006.00237.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12473',
  NULLIF('10.1111/jocd.12473', ''),
  'Complications of botulinum toxin injection for masseter hypertrophy: Incidence rate from 2036 treatments and summary of causes and preventions',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12473' OR iq.doi = '10.1111/jocd.12473'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13619',
  NULLIF('10.1111/jocd.13619', ''),
  'Deoxycholic acid in the submental fat reduction: A review of properties, adverse effects, and complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13619' OR iq.doi = '10.1111/jocd.13619'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14492',
  NULLIF('10.1111/jocd.14492', ''),
  'Description of a safe doppler ultrasound‐guided technique for hyaluronic acid filler in the face—A method to avoid adverse vascular events',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14492' OR iq.doi = '10.1111/jocd.14492'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16098',
  NULLIF('10.1111/jocd.16098', ''),
  'Efficacy and safety of high‐intensity, high‐frequency, non‐focused ultrasound parallel beams for facial skin laxity',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16098' OR iq.doi = '10.1111/jocd.16098'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13493',
  NULLIF('10.1111/jocd.13493', ''),
  'Evaluation of safety and efficacy of booster injections of hyaluronic acid in improving the facial skin quality',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13493' OR iq.doi = '10.1111/jocd.13493'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13292',
  NULLIF('10.1111/jocd.13292', ''),
  'Ferulic acid 12% peel: An innovative peel for constitutional type of periorbital melanosis—Comparing clinical efficacy and safety with 20% glycolic peel and 15% lactic peel',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13292' OR iq.doi = '10.1111/jocd.13292'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70771',
  NULLIF('10.1111/jocd.70771', ''),
  'Global Pharmacovigilance of Aesthetic Botulinum Toxin Type A: Analysis of Adverse Event Reports From the <scp>USA</scp> , Europe, Canada, and Australia',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70771' OR iq.doi = '10.1111/jocd.70771'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70884',
  NULLIF('10.1111/jocd.70884', ''),
  'Hyaluronic Acid Dermal Filler‐Associated Vascular Occlusion—A Review of Prevention and Management Strategies',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70884' OR iq.doi = '10.1111/jocd.70884'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16147',
  NULLIF('10.1111/jocd.16147', ''),
  'Hyaluronic acid filler‐induced vascular occlusion—Three case reports and overview of prevention and treatment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16147' OR iq.doi = '10.1111/jocd.16147'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2008.00406.x',
  NULLIF('10.1111/j.1473-2165.2008.00406.x', ''),
  'Hydradermabrasion: an innovative modality for nonablative facial rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2008.00406.x' OR iq.doi = '10.1111/j.1473-2165.2008.00406.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15677',
  NULLIF('10.1111/jocd.15677', ''),
  'Hyperbaric oxygenation therapy improve recovery in early or late vascular occlusion generates by tissue fillers',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15677' OR iq.doi = '10.1111/jocd.15677'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70318',
  NULLIF('10.1111/jocd.70318', ''),
  'Injectable Aesthetic Treatments for Improving Facial Skin Quality in Transgender Patients With or Without Gender‐Affirming Hormone Therapy',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70318' OR iq.doi = '10.1111/jocd.70318'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2130.2004.00090.x',
  NULLIF('10.1111/j.1473-2130.2004.00090.x', ''),
  'Laser resurfacing today and the ‘cook book’ approach: a recipe for disaster?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2130.2004.00090.x' OR iq.doi = '10.1111/j.1473-2130.2004.00090.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12475',
  NULLIF('10.1111/jocd.12475', ''),
  'Microfocused ultrasound in combination with diluted calcium hydroxylapatite for improving skin laxity and the appearance of lines in the neck and décolletage',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12475' OR iq.doi = '10.1111/jocd.12475'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2010.00528.x',
  NULLIF('10.1111/j.1473-2165.2010.00528.x', ''),
  'Nonablative fractional laser resurfacing in Asian skin – a review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2010.00528.x' OR iq.doi = '10.1111/j.1473-2165.2010.00528.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2005.00210.x',
  NULLIF('10.1111/j.1473-2165.2005.00210.x', ''),
  'Nonablative skin rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2005.00210.x' OR iq.doi = '10.1111/j.1473-2165.2005.00210.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12383',
  NULLIF('10.1111/jocd.12383', ''),
  'Noninvasive submental fat reduction using colder cryolipolysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12383' OR iq.doi = '10.1111/jocd.12383'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15205',
  NULLIF('10.1111/jocd.15205', ''),
  'Non‐invasive system delivering microwaves energy for unwanted fat reduction and submental skin tightening: Clinical evidence',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15205' OR iq.doi = '10.1111/jocd.15205'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14921',
  NULLIF('10.1111/jocd.14921', ''),
  'Non‐surgical facelift—by PDO threads and dermal filler: A case report',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14921' OR iq.doi = '10.1111/jocd.14921'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14422',
  NULLIF('10.1111/jocd.14422', ''),
  'Novel use of poly‐L‐lactic acid filler for the treatment of facial cutaneous atrophy in patients with connective tissue disease',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14422' OR iq.doi = '10.1111/jocd.14422'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13467',
  NULLIF('10.1111/jocd.13467', ''),
  'Oral isotretinoin and photoaging: A review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13467' OR iq.doi = '10.1111/jocd.13467'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12124',
  NULLIF('10.1111/jocd.12124', ''),
  'Painless, safe, and efficacious noninvasive skin tightening, body contouring, and cellulite reduction using multisource 3DEEP radiofrequency',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12124' OR iq.doi = '10.1111/jocd.12124'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13090',
  NULLIF('10.1111/jocd.13090', ''),
  'Paradoxical adipose hyperplasia after noninvasive radiofrequency treatment: A novel report and review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13090' OR iq.doi = '10.1111/jocd.13090'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16712',
  NULLIF('10.1111/jocd.16712', ''),
  'Periprocedural Skincare for Nonenergy and Nonablative Energy‐Based Aesthetic Procedures in Patients With Skin of Color',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16712' OR iq.doi = '10.1111/jocd.16712'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12932',
  NULLIF('10.1111/jocd.12932', ''),
  'Review of sterility of reused stored dermal filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12932' OR iq.doi = '10.1111/jocd.12932'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12519',
  NULLIF('10.1111/jocd.12519', ''),
  'Safety and complications of absorbable threads made of poly‐L‐lactic acid and poly lactide/glycolide: Experience with 148 consecutive patients',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12519' OR iq.doi = '10.1111/jocd.12519'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16631',
  NULLIF('10.1111/jocd.16631', ''),
  'Simulating Upper Eyelid Ptosis During Neuromodulator Injections—An Exploratory Injection and Dissection Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16631' OR iq.doi = '10.1111/jocd.16631'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16510',
  NULLIF('10.1111/jocd.16510', ''),
  'Standard operating protocol for utilizing energy‐based devices in aesthetic practice',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16510' OR iq.doi = '10.1111/jocd.16510'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12317',
  NULLIF('10.1111/jocd.12317', ''),
  'Study of efficacy of esthetic High‐Intensity Focused Ultrasound system on Iranian skin for reducing the laxity and wrinkles of aging',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12317' OR iq.doi = '10.1111/jocd.12317'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13393',
  NULLIF('10.1111/jocd.13393', ''),
  'The M.A.STE.R.S algorithm for acute visual loss management after facial filler injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13393' OR iq.doi = '10.1111/jocd.13393'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12347',
  NULLIF('10.1111/jocd.12347', ''),
  'The development, evidence, and current use of ATX‐101 for the treatment of submental fat',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12347' OR iq.doi = '10.1111/jocd.12347'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12026',
  NULLIF('10.1111/jocd.12026', ''),
  'Tranexamic acid: an important adjuvant in the treatment of melasma',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12026' OR iq.doi = '10.1111/jocd.12026'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16462',
  NULLIF('10.1111/jocd.16462', ''),
  'Treatment of masseter muscle hypertrophy with botulinum toxin type A injection: A review of adverse events',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16462' OR iq.doi = '10.1111/jocd.16462'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14597',
  NULLIF('10.1111/jocd.14597', ''),
  'Ultrasound assessment of abdominal adipose panniculus in patients treated with a single session of cryolipolysis in a clinical setting',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14597' OR iq.doi = '10.1111/jocd.14597'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_32_2025',
  NULLIF('10.25259/jcas_32_2025', ''),
  'Combination of fractional CO<sub>2</sub> laser with laser-assisted drug delivery in the treatment of hypertrophic and atrophic scars',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_32_2025' OR iq.doi = '10.25259/jcas_32_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.110095',
  NULLIF('10.4103/0974-2077.110095', ''),
  'Commentary on the article, "Efficacy and safety of 10 600-nm carbon dioxide fractional laser on facial skin with previous volume injections"',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.110095' OR iq.doi = '10.4103/0974-2077.110095'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_1_2025',
  NULLIF('10.25259/jcas_1_2025', ''),
  'Comparative study of the efficacy of Q-switched neodymium-doped yttrium aluminum garnet laser alone versus ultra-pulse carbon dioxide laser along with Q-switched neodymium-doped yttrium aluminum garnet laser in patients with black tattoo',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_1_2025' OR iq.doi = '10.25259/jcas_1_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_210_22',
  NULLIF('10.4103/jcas.jcas_210_22', ''),
  'Does platelet-rich plasma promote facial rejuvenation? Revising the latest evidence in a narrative review',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_210_22' OR iq.doi = '10.4103/jcas.jcas_210_22'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.110094',
  NULLIF('10.4103/0974-2077.110094', ''),
  'Efficacy and safety of 10,600-nm carbon dioxide fractional laser on facial skin with previous volume injections',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.110094' OR iq.doi = '10.4103/0974-2077.110094'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.167276',
  NULLIF('10.4103/0974-2077.167276', ''),
  'Efficacy and safety of fractional CO <sub>2</sub> laser resurfacing in non-hypertrophic traumatic and burn scars',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.167276' OR iq.doi = '10.4103/0974-2077.167276'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_78_2025',
  NULLIF('10.25259/jcas_78_2025', ''),
  'Microneedling combined with concentrated adipose-derived mesenchymal stem cells secretome alleviate facial skin aging features: A double-blind, randomized controlled trial',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_78_2025' OR iq.doi = '10.25259/jcas_78_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_208_23',
  NULLIF('10.25259/jcas_208_23', ''),
  'Redefining hair restoration with instant results – Is bio-enhanced simultaneous transplant long hair FUE the future?',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_208_23' OR iq.doi = '10.25259/jcas_208_23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_191_22',
  NULLIF('10.25259/jcas_191_22', ''),
  'Smart PDOs™ and the Cartesian Technique™: A milestone in facial rejuvenation with bioactive scaffolds',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_191_22' OR iq.doi = '10.25259/jcas_191_22'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_334_2025',
  NULLIF('10.25259/jcas_334_2025', ''),
  'Social media in Aesthetic medicine: From hashtags to hype and commercial influence',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_334_2025' OR iq.doi = '10.25259/jcas_334_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_72_2025',
  NULLIF('10.25259/jcas_72_2025', ''),
  'Stellactomy- A novel technique for the management of facial scar',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_72_2025' OR iq.doi = '10.25259/jcas_72_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2024.43',
  NULLIF('10.20517/2347-9264.2024.43', ''),
  'Basic techniques for optimizing burn wound healing: insights from clinical practice',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2024.43' OR iq.doi = '10.20517/2347-9264.2024.43'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2022.18',
  NULLIF('10.20517/2347-9264.2022.18', ''),
  'Clinical application of autologous chyle fat transplantation in the correction of sunken upper eyelid',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2022.18' OR iq.doi = '10.20517/2347-9264.2022.18'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2025.91',
  NULLIF('10.20517/2347-9264.2025.91', ''),
  'Current research status and progress of laser therapy in wound healing',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2025.91' OR iq.doi = '10.20517/2347-9264.2025.91'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2019.23',
  NULLIF('10.20517/2347-9264.2019.23', ''),
  'Efficacy and safety of poly-D,L-lactic acid microspheres as subdermal fillers in animals',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2019.23' OR iq.doi = '10.20517/2347-9264.2019.23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjac108',
  NULLIF('10.1093/asj/sjac108', ''),
  'A Correlation of the Glogau Scale With VISIA-CR Complexion Analysis Measurements in Assessing Facial Photoaging for Clinical Research',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac108' OR iq.doi = '10.1093/asj/sjac108'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf262',
  NULLIF('10.1093/asj/sjaf262', ''),
  'Adjunct Perioral Phenol–Croton Oil Peel Shortens Philtrum Length in Patients Undergoing Primary Facelift',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf262' OR iq.doi = '10.1093/asj/sjaf262'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjx221',
  NULLIF('10.1093/asj/sjx221', ''),
  'Commentary on: Efficacy of Retrobulbar Hyaluronidase Injection for Vision Loss Resulting from Hyaluronic Acid Filler Embolization',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjx221' OR iq.doi = '10.1093/asj/sjx221'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjv239',
  NULLIF('10.1093/asj/sjv239', ''),
  'Commentary on: Expanded Stem Cells, Stromal-Vascular Fraction, and Platelet-Rich Plasma Enriched Fat: Comparing Results of Different Facial Rejuvenation Approaches in a Clinical Trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjv239' OR iq.doi = '10.1093/asj/sjv239'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad035',
  NULLIF('10.1093/asj/sjad035', ''),
  'Commentary on: Facial Dermal Filler Injection and Vaccination: A 12-Year Review of Adverse Event Reporting and Literature Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad035' OR iq.doi = '10.1093/asj/sjad035'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjz366',
  NULLIF('10.1093/asj/sjz366', ''),
  'Commentary on: Full-Field Erbium: YAG Laser Resurfacing: Complications and Suggested Safety Parameters',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz366' OR iq.doi = '10.1093/asj/sjz366'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjx018',
  NULLIF('10.1093/asj/sjx018', ''),
  'Commentary on: New High Dose Pulsed Hyaluronidase Protocol for Hyaluronic Acid Filler Vascular Adverse Events',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjx018' OR iq.doi = '10.1093/asj/sjx018'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjy247',
  NULLIF('10.1093/asj/sjy247', ''),
  'Commentary on: Pathophysiology Study of Filler-Induced Blindness',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjy247' OR iq.doi = '10.1093/asj/sjy247'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjac228',
  NULLIF('10.1093/asj/sjac228', ''),
  'Complications After Botulinum Neurotoxin Type A and Dermal Filler Injections: Data From a Large Retrospective Cohort Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac228' OR iq.doi = '10.1093/asj/sjac228'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf094',
  NULLIF('10.1093/asj/sjaf094', ''),
  'Enhanced Scar Reduction With Triamcinolone Acetonide and Botulinum Toxin A Combination Therapy Compared to Botulinum Toxin A Monotherapy: A Translational Pilot Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf094' OR iq.doi = '10.1093/asj/sjaf094'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjv231',
  NULLIF('10.1093/asj/sjv231', ''),
  'Expanded Stem Cells, Stromal-Vascular Fraction, and Platelet-Rich Plasma Enriched Fat: Comparing Results of Different Facial Rejuvenation Approaches in a Clinical Trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjv231' OR iq.doi = '10.1093/asj/sjv231'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf193',
  NULLIF('10.1093/asj/sjaf193', ''),
  'Improving Surgical Treatment for Severe Gynecomastia and Avoiding Skin Resection: Skin Redistribution and Fixation Approach for Aesthetic Excellence',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf193' OR iq.doi = '10.1093/asj/sjaf193'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1016/s1090-820x(96)70065-1',
  NULLIF('10.1016/s1090-820x(96)70065-1', ''),
  'Laser Resurfacing Allows Greater Control and Safety',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/s1090-820x(96)70065-1' OR iq.doi = '10.1016/s1090-820x(96)70065-1'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjag095',
  NULLIF('10.1093/asj/sjag095', ''),
  'Measuring Facial Appearance in GLP-1 Agonist Use with the FACE-Q Aesthetics Item Library',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjag095' OR iq.doi = '10.1093/asj/sjag095'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjw251',
  NULLIF('10.1093/asj/sjw251', ''),
  'New High Dose Pulsed Hyaluronidase Protocol for Hyaluronic Acid Filler Vascular Adverse Events',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjw251' OR iq.doi = '10.1093/asj/sjw251'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab125',
  NULLIF('10.1093/asj/sjab125', ''),
  'Preliminary Prospective and Randomized Study of Highly Purified Polynucleotide vs Placebo in Treatment of Moderate to Severe Acne Scars',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab125' OR iq.doi = '10.1093/asj/sjab125'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaa244',
  NULLIF('10.1093/asj/sjaa244', ''),
  'The Effect of Platelet-Rich Fibrin Matrix on Skin Rejuvenation: A Split-Face Comparison',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa244' OR iq.doi = '10.1093/asj/sjaa244'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf230',
  NULLIF('10.1093/asj/sjaf230', ''),
  'Think Smooth and Pink: The Role of Skin Color and Texture in Caucasian Female Genital aesthetics',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf230' OR iq.doi = '10.1093/asj/sjaf230'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s260434',
  NULLIF('10.2147/ccid.s260434', ''),
  '<p>308-nm Excimer Laser Plus Platelet-Rich Plasma for Treatment of Stable Vitiligo: A Prospective, Randomized Case–Control Study</p>',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s260434' OR iq.doi = '10.2147/ccid.s260434'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s239667',
  NULLIF('10.2147/ccid.s239667', ''),
  '<p>Expert Consensus on Injection Technique and Area-Specific Recommendations for the Hyaluronic Acid Dermal Filler VYC-12L to Treat Fine Cutaneous Lines</p>',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s239667' OR iq.doi = '10.2147/ccid.s239667'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s218134',
  NULLIF('10.2147/ccid.s218134', ''),
  '<p>Skin Care Management For Medical And Aesthetic Procedures To Prevent Scarring</p>',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s218134' OR iq.doi = '10.2147/ccid.s218134'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s180904',
  NULLIF('10.2147/ccid.s180904', ''),
  'A 10-point plan for avoiding hyaluronic acid dermal filler-related complications during facial aesthetic procedures and algorithms for management',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s180904' OR iq.doi = '10.2147/ccid.s180904'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s401839',
  NULLIF('10.2147/ccid.s401839', ''),
  'A Comparative Study on Adipose-Derived Mesenchymal Stem Cells Secretome Delivery Using Microneedling and Fractional CO2 Laser for Facial Skin Rejuvenation',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s401839' OR iq.doi = '10.2147/ccid.s401839'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s408555',
  NULLIF('10.2147/ccid.s408555', ''),
  'A Comparative Study on Adipose-Derived Mesenchymal Stem Cells Secretome Delivery Using Microneedling and Fractional CO2 Laser for Facial Skin Rejuvenation [Letter]',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s408555' OR iq.doi = '10.2147/ccid.s408555'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s410433',
  NULLIF('10.2147/ccid.s410433', ''),
  'A Comparative Study on Adipose-Derived Mesenchymal Stem Cells Secretome Delivery Using Microneedling and Fractional CO2 Laser for Facial Skin Rejuvenation [Response to Letter]',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s410433' OR iq.doi = '10.2147/ccid.s410433'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s355329',
  NULLIF('10.2147/ccid.s355329', ''),
  'A Randomized, Double Blinded, Split-Face Study of the Efficacy of Using a Broad Spectrum Sunscreen with Anti-Inflammatory Agent to Reduce Post Inflammatory Hyperpigmentation After Picosecond Laser',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s355329' OR iq.doi = '10.2147/ccid.s355329'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s6492',
  NULLIF('10.2147/ccid.s6492', ''),
  'Botulinum toxin type A for the management of glabellar rhytids',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s6492' OR iq.doi = '10.2147/ccid.s6492'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s143015',
  NULLIF('10.2147/ccid.s143015', ''),
  'Calcium hydroxylapatite treatment of human skin: evidence of collagen turnover through picrosirius red staining and circularly polarized microscopy',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s143015' OR iq.doi = '10.2147/ccid.s143015'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s271760',
  NULLIF('10.2147/ccid.s271760', ''),
  'Can Sodium Thiosulfate Act as a Reversal Agent for Calcium Hydroxylapatite Filler? Results of a Preclinical Study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s271760' OR iq.doi = '10.2147/ccid.s271760'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s357810',
  NULLIF('10.2147/ccid.s357810', ''),
  'Cell-Free Blood Cell Secretome (BCS) Counteracts Skin Aging: Multi-Center Prospective Regenerative Aesthetic Medicine Study Using Exokine®',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s357810' OR iq.doi = '10.2147/ccid.s357810'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s563513',
  NULLIF('10.2147/ccid.s563513', ''),
  'Clinical Evaluation of a Novel Dual-Mode Radiofrequency Device for Facial Laxity: A Case Series',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s563513' OR iq.doi = '10.2147/ccid.s563513'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s359813',
  NULLIF('10.2147/ccid.s359813', ''),
  'Collagen Stimulators in Body Applications: A Review Focused on Poly-L-Lactic Acid (PLLA)',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s359813' OR iq.doi = '10.2147/ccid.s359813'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s72878',
  NULLIF('10.2147/ccid.s72878', ''),
  'Complete biodegradable nature of calcium hydroxylapatite after injection for malar enhancement: an MRI study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s72878' OR iq.doi = '10.2147/ccid.s72878'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s516035',
  NULLIF('10.2147/ccid.s516035', ''),
  'Consensus Recommendations for the Reconstitution and Aesthetic Use of Poly-D,L-Lactic Acid Microspheres – Comment on the Facial Injection Techniques [Letter]',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s516035' OR iq.doi = '10.2147/ccid.s516035'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s519851',
  NULLIF('10.2147/ccid.s519851', ''),
  'Consensus Recommendations for the Reconstitution and Aesthetic Use of Poly-D,L-Lactic Acid Microspheres – Comment on the Facial Injection Techniques [Response to Letter]',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s519851' OR iq.doi = '10.2147/ccid.s519851'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s516553',
  NULLIF('10.2147/ccid.s516553', ''),
  'Consensus Recommendations for the Reconstitution and Aesthetic Use of Poly-D,L-Lactic Acid Microspheres – Comment on the Reason of “Fast Reconstitution” [Letter]',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s516553' OR iq.doi = '10.2147/ccid.s516553'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s519991',
  NULLIF('10.2147/ccid.s519991', ''),
  'Consensus Recommendations for the Reconstitution and Aesthetic Use of Poly-D,L-Lactic Acid Microspheres – Comment on the Reason of “Fast Reconstitution” [Response to Letter]',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s519991' OR iq.doi = '10.2147/ccid.s519991'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s552194',
  NULLIF('10.2147/ccid.s552194', ''),
  'Correlation Between Improvements in Melasma Quality of Life (MELASQoL-INA) and Modified Melasma Area and Severity Index (mMASI) Following Triple Combination Therapy',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s552194' OR iq.doi = '10.2147/ccid.s552194'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s410621',
  NULLIF('10.2147/ccid.s410621', ''),
  'Cosmetic Surgery and the Diversity of Cultural and Ethnic Perceptions of Facial, Breast, and Gluteal Aesthetics in Women: A Comprehensive Review',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s410621' OR iq.doi = '10.2147/ccid.s410621'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s50546',
  NULLIF('10.2147/ccid.s50546', ''),
  'Dermal fillers in aesthetics: an overview of adverse events and treatment approaches',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s50546' OR iq.doi = '10.2147/ccid.s50546'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s449599',
  NULLIF('10.2147/ccid.s449599', ''),
  'Development of Home Beauty Devices for Facial Rejuvenation: Establishment of Efficacy Evaluation System',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s449599' OR iq.doi = '10.2147/ccid.s449599'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s177622',
  NULLIF('10.2147/ccid.s177622', ''),
  'Early fractional carbon dioxide laser intervention for postsurgical scars in skin of color',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s177622' OR iq.doi = '10.2147/ccid.s177622'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s528663',
  NULLIF('10.2147/ccid.s528663', ''),
  'Effectiveness of Autologous Platelet-Rich Plasma for Androgenetic Alopecia: A Double-Center, Non-Controlled, Randomized Clinical Study in Vietnam',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s528663' OR iq.doi = '10.2147/ccid.s528663'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s407561',
  NULLIF('10.2147/ccid.s407561', ''),
  'Efficacy and Tolerability of Hyperdiluted Calcium Hydroxylapatite (Radiesse) for Neck Rejuvenation: Clinical and Ultrasonographic Assessment',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s407561' OR iq.doi = '10.2147/ccid.s407561'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s603237',
  NULLIF('10.2147/ccid.s603237', ''),
  'Efficacy of Polynucleotide for the Recovery of Depressed Lesions Following Steroid-Based Lipolysis Injections',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s603237' OR iq.doi = '10.2147/ccid.s603237'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s363882',
  NULLIF('10.2147/ccid.s363882', ''),
  'From Anatomical Modifications to Skin Quality: Case Series of Botulinum Toxin and Facial Fillers for Facial Feminization in Transgender Women',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s363882' OR iq.doi = '10.2147/ccid.s363882'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s356641',
  NULLIF('10.2147/ccid.s356641', ''),
  'Hyaluronic Acid Filler Injection for Localized Scleroderma – Case Report and Review of Literature on Filler Injections for Localized Scleroderma',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s356641' OR iq.doi = '10.2147/ccid.s356641'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s344408',
  NULLIF('10.2147/ccid.s344408', ''),
  'Hyperbaric Oxygen Therapy in Managing Minimally Invasive Aesthetic Procedure Complications: A Report of Three Cases',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s344408' OR iq.doi = '10.2147/ccid.s344408'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s74519',
  NULLIF('10.2147/ccid.s74519', ''),
  'IncobotulinumtoxinA use in aesthetic indications in daily practice: a European multicenter, noninterventional, retrospective study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s74519' OR iq.doi = '10.2147/ccid.s74519'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s357743',
  NULLIF('10.2147/ccid.s357743', ''),
  'Medical Student Confidence in Diagnosis of Dermatologic Diseases in Skin of Color',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s357743' OR iq.doi = '10.2147/ccid.s357743'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s80446',
  NULLIF('10.2147/ccid.s80446', ''),
  'Patient factors influencing dermal filler complications: prevention, assessment, and treatment',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s80446' OR iq.doi = '10.2147/ccid.s80446'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s340434',
  NULLIF('10.2147/ccid.s340434', ''),
  'Platelet-Rich Plasma in Facial Rejuvenation: A Systematic Appraisal of the Available Clinical Evidence',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s340434' OR iq.doi = '10.2147/ccid.s340434'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s589929',
  NULLIF('10.2147/ccid.s589929', ''),
  'Post-Market Observational Study of Injectable PLLA Microspheres for Facial Rejuvenation',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s589929' OR iq.doi = '10.2147/ccid.s589929'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s542022',
  NULLIF('10.2147/ccid.s542022', ''),
  'Preliminary Histological Evidence of Epidermal and DEJ Remodeling with Microneedling-Assisted Topical Exosome Therapy: A Single-Subject Case Report',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s542022' OR iq.doi = '10.2147/ccid.s542022'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s142450',
  NULLIF('10.2147/ccid.s142450', ''),
  'Review of applications of microneedling in dermatology',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s142450' OR iq.doi = '10.2147/ccid.s142450'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s116158',
  NULLIF('10.2147/ccid.s116158', ''),
  'Skin rejuvenation using cosmetic products containing growth factors, cytokines, and matrikines: a review of the literature',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s116158' OR iq.doi = '10.2147/ccid.s116158'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s420068',
  NULLIF('10.2147/ccid.s420068', ''),
  'Starting Point for Protocols on the Use of Hyperdiluted Calcium Hydroxylapatite (Radiesse®) for Optimizing Age-Related Biostimulation and Rejuvenation of Face, Neck, Décolletage and Hands: A Case Series Report',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s420068' OR iq.doi = '10.2147/ccid.s420068'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s491489',
  NULLIF('10.2147/ccid.s491489', ''),
  'Successful Treatment of Freckles Using a 730-nm Picosecond Laser: A Prospective Study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s491489' OR iq.doi = '10.2147/ccid.s491489'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s138274',
  NULLIF('10.2147/ccid.s138274', ''),
  'Tailored botulinum toxin type A injections in aesthetic medicine: consensus panel recommendations for treating the forehead based on individual facial anatomy and muscle tone',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s138274' OR iq.doi = '10.2147/ccid.s138274'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s382582',
  NULLIF('10.2147/ccid.s382582', ''),
  'The Efficacy of Noninvasive 1060-Nm Diode Lasers for Submental Lipolysis: A Pilot Study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s382582' OR iq.doi = '10.2147/ccid.s382582'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s388954',
  NULLIF('10.2147/ccid.s388954', ''),
  'The Role of Probiotics in Skin Photoaging and Related Mechanisms: A Review',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s388954' OR iq.doi = '10.2147/ccid.s388954'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s427736',
  NULLIF('10.2147/ccid.s427736', ''),
  'Treatment of the Nasolabial Fold Using a Hyaluronic Acid-Based Filler with eXcellent Three-Dimensional Reticulation (XTR™) Technology: A Retrospective Study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s427736' OR iq.doi = '10.2147/ccid.s427736'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s307013',
  NULLIF('10.2147/ccid.s307013', ''),
  'Use of Botulinum Toxin in Treating Rosacea: A Systematic Review',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s307013' OR iq.doi = '10.2147/ccid.s307013'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020069',
  NULLIF('10.3390/cosmetics13020069', ''),
  'A New, Cost-Effective Facial Skin Care Serum, Rich in Bioactive Ingredients Isolated from Centaurea cyanus L. Flower Petals',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020069' OR iq.doi = '10.3390/cosmetics13020069'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11060218',
  NULLIF('10.3390/cosmetics11060218', ''),
  'AI Dermatochroma Analytica (AIDA): Smart Technology for Robust Skin Color Classification and Segmentation',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11060218' OR iq.doi = '10.3390/cosmetics11060218'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12010026',
  NULLIF('10.3390/cosmetics12010026', ''),
  'Advanced Surgical Approaches for the Rejuvenation of the Submental and Cervicofacial Regions: A Literature Review for a Personalized Approach',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12010026' OR iq.doi = '10.3390/cosmetics12010026'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11020049',
  NULLIF('10.3390/cosmetics11020049', ''),
  'Advancements in Regenerative Medicine for Aesthetic Dermatology: A Comprehensive Review and Future Trends',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11020049' OR iq.doi = '10.3390/cosmetics11020049'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10040106',
  NULLIF('10.3390/cosmetics10040106', ''),
  'An Updated Etiology of Hair Loss and the New Cosmeceutical Paradigm in Therapy: Clearing ‘the Big Eight Strikes’',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10040106' OR iq.doi = '10.3390/cosmetics10040106'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12030108',
  NULLIF('10.3390/cosmetics12030108', ''),
  'Anti-Senescence and Anti-Photoaging Activities of Mangosteen Pericarp Extract on UVA-Induced Fibroblasts',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12030108' OR iq.doi = '10.3390/cosmetics12030108'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13010009',
  NULLIF('10.3390/cosmetics13010009', ''),
  'Biological Activities of the Extract and Hitorins A and B from Chloranthus quadrifolius in Human Adipose-Derived Mesenchymal Stem Cells',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13010009' OR iq.doi = '10.3390/cosmetics13010009'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12050221',
  NULLIF('10.3390/cosmetics12050221', ''),
  'Cosmetic Considerations of Semaglutide',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12050221' OR iq.doi = '10.3390/cosmetics12050221'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11020054',
  NULLIF('10.3390/cosmetics11020054', ''),
  'Current Knowledge and Regulatory Framework on the Use of Hyaluronic Acid for Aesthetic Injectable Skin Rejuvenation Treatments',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11020054' OR iq.doi = '10.3390/cosmetics11020054'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics9020037',
  NULLIF('10.3390/cosmetics9020037', ''),
  'Deciphering the Phytochemical Profile of an Alpine Rose (Rhododendron ferrugineum L.) Leaf Extract for a Better Understanding of Its Senolytic and Skin-Rejuvenation Effects',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics9020037' OR iq.doi = '10.3390/cosmetics9020037'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020093',
  NULLIF('10.3390/cosmetics13020093', ''),
  'Dihydrokaempferol Supports Epidermal Barrier, Dermal Repair, and Enhances Post-Procedure Recovery',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020093' OR iq.doi = '10.3390/cosmetics13020093'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12020042',
  NULLIF('10.3390/cosmetics12020042', ''),
  'Efficacy of a New Non-Invasive System Delivering Microwave Energy for the Treatment of Abdominal Adipose Tissue: Results of an Immunohistochemical Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12020042' OR iq.doi = '10.3390/cosmetics12020042'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13020060',
  NULLIF('10.3390/cosmetics13020060', ''),
  'Enhanced Neocollagenesis and Clinical Efficacy of a Novel Regenerative Diluent for Calcium Hydroxyapatite for Facial Rejuvenation: A 90-Day Clinical Trial',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13020060' OR iq.doi = '10.3390/cosmetics13020060'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12040172',
  NULLIF('10.3390/cosmetics12040172', ''),
  'Enzymes DNA Repair in Skin Photoprotection: Strategies Counteracting Skin Cancer Development and Photoaging Strategies',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12040172' OR iq.doi = '10.3390/cosmetics12040172'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13030139',
  NULLIF('10.3390/cosmetics13030139', ''),
  'Extracellular Matrix Remodeling and Dermal Microenvironment Modulation in Regenerative Facial Aesthetics: A Critical Review of Collagen Biostimulators, Fibroblast Senescence, and Cutaneous Aging',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13030139' OR iq.doi = '10.3390/cosmetics13030139'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11050171',
  NULLIF('10.3390/cosmetics11050171', ''),
  'Galloyl–RGD, Derived from a Fusion of Phytochemicals and RGD Peptides, Regulates Photoaging via the MAPK/AP-1 Mechanism in Human Dermal Fibroblasts',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11050171' OR iq.doi = '10.3390/cosmetics11050171'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11020050',
  NULLIF('10.3390/cosmetics11020050', ''),
  'Histological, Clinical Assessment, and Treatment of a Permanent Filler Complication in the Upper Lip: A Case Report with 16-Year Follow-Up',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11020050' OR iq.doi = '10.3390/cosmetics11020050'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics4010002',
  NULLIF('10.3390/cosmetics4010002', ''),
  'In Vitro Methodologies to Evaluate the Effects of Hair Care Products on Hair Fiber',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics4010002' OR iq.doi = '10.3390/cosmetics4010002'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12020070',
  NULLIF('10.3390/cosmetics12020070', ''),
  'Jatrorrhizine Isolated from Phellodendron amurense Improves Collagen Homeostasis in CCD-986sk Human Dermal Fibroblast Cells',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12020070' OR iq.doi = '10.3390/cosmetics12020070'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics8030082',
  NULLIF('10.3390/cosmetics8030082', ''),
  'Melanogenesis and Melasma Treatment',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics8030082' OR iq.doi = '10.3390/cosmetics8030082'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics4020014',
  NULLIF('10.3390/cosmetics4020014', ''),
  'Meta Analysis of Skin Microbiome: New Link between Skin Microbiota Diversity and Skin Health with Proposal to Use This as a Future Mechanism to Determine Whether Cosmetic Products Damage the Skin',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics4020014' OR iq.doi = '10.3390/cosmetics4020014'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics2020177',
  NULLIF('10.3390/cosmetics2020177', ''),
  'Nanotechnology, Inflammation and the Skin Barrier: Innovative Approaches for Skin Health and Cosmesis',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics2020177' OR iq.doi = '10.3390/cosmetics2020177'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11010021',
  NULLIF('10.3390/cosmetics11010021', ''),
  'Nanotechnology-Enhanced Cosmetic Application of Kojic Acid Dipalmitate, a Kojic Acid Derivate with Improved Properties',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11010021' OR iq.doi = '10.3390/cosmetics11010021'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics4040045',
  NULLIF('10.3390/cosmetics4040045', ''),
  'Non-Targeted Secondary Metabolite Profile Study for Deciphering the Cosmeceutical Potential of Red Marine Macro Alga Jania rubens—An LCMS-Based Approach',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics4040045' OR iq.doi = '10.3390/cosmetics4040045'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics7010010',
  NULLIF('10.3390/cosmetics7010010', ''),
  'Non-Traditional and Non-Invasive Approaches in Facial Rejuvenation: A Brief Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics7010010' OR iq.doi = '10.3390/cosmetics7010010'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13010018',
  NULLIF('10.3390/cosmetics13010018', ''),
  'Physicochemical Properties of Two Poly-L-Lactic Acid Injectable Implants: Potential Impact on Their Biological Properties',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13010018' OR iq.doi = '10.3390/cosmetics13010018'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11040116',
  NULLIF('10.3390/cosmetics11040116', ''),
  'Plant Essential Oil Nanoemulgel as a Cosmeceutical Ingredient: A Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11040116' OR iq.doi = '10.3390/cosmetics11040116'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13010016',
  NULLIF('10.3390/cosmetics13010016', ''),
  'Regenerative and Dermal Wound Healing Activities of Bioactive Octapeptide',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13010016' OR iq.doi = '10.3390/cosmetics13010016'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics2020136',
  NULLIF('10.3390/cosmetics2020136', ''),
  'Significant Reduction of Body Odor in Older People with a pH 4.0 Emulsion',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics2020136' OR iq.doi = '10.3390/cosmetics2020136'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics7040090',
  NULLIF('10.3390/cosmetics7040090', ''),
  'Skin Brightening Efficacy of Exosomes Derived from Human Adipose Tissue-Derived Stem/Stromal Cells: A Prospective, Split-Face, Randomized Placebo-Controlled Study',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics7040090' OR iq.doi = '10.3390/cosmetics7040090'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics6030050',
  NULLIF('10.3390/cosmetics6030050', ''),
  'The Influence of Facial Muscle Training on the Facial Soft Tissue Profile: A Brief Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics6030050' OR iq.doi = '10.3390/cosmetics6030050'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11050146',
  NULLIF('10.3390/cosmetics11050146', ''),
  'The Potential of Resveratrol-Rich Peanut Callus Extract in Promoting Hair Growth and Preventing Hair Loss',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11050146' OR iq.doi = '10.3390/cosmetics11050146'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics12050196',
  NULLIF('10.3390/cosmetics12050196', ''),
  'Topical Delivery of Calcium Silicate for Nail Health: A Clinical and Experimental Evaluation',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics12050196' OR iq.doi = '10.3390/cosmetics12050196'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics10010025',
  NULLIF('10.3390/cosmetics10010025', ''),
  'Treatment of Melasma on Darker Skin Types: A Scoping Review',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics10010025' OR iq.doi = '10.3390/cosmetics10010025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13010015',
  NULLIF('10.3390/cosmetics13010015', ''),
  'Unveiling the Potential of Plant-Derived Exosome-like Extracellular Vesicles from Phalaenopsis aphrodite as Skin-Conditioning Ingredients in Cosmetic Applications',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13010015' OR iq.doi = '10.3390/cosmetics13010015'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/00042728-200602000-00007',
  NULLIF('10.1097/00042728-200602000-00007', ''),
  'A Multicenter Study of the Efficacy and Safety of Subcutaneous Nonanimal Stabilized Hyaluronie Acid in Aesthetic Facial Contouring',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/00042728-200602000-00007' OR iq.doi = '10.1097/00042728-200602000-00007'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2006.32035.x',
  NULLIF('10.1111/j.1524-4725.2006.32035.x', ''),
  'A Multicenter Study of the Efficacy and Safety of Subcutaneous Nonanimal Stabilized Hyaluronie Acid in Aesthetic Facial Contouring: Interim Report',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2006.32035.x' OR iq.doi = '10.1111/j.1524-4725.2006.32035.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000290',
  NULLIF('10.1097/dss.0000000000000290', ''),
  'A Randomized, Controlled Clinical Study to Investigate the Safety and Efficacy of Acoustic Wave Therapy in Body Contouring',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000290' OR iq.doi = '10.1097/dss.0000000000000290'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004881',
  NULLIF('10.1097/dss.0000000000004881', ''),
  'A Single-Center, Blinded, Split-Body, Randomized Clinical Trial of High-Intensity, Parallel Ultrasound Beams Versus Microfocused Ultrasound With Visualization for the Treatment of Upper Inner Arm Skin Laxity',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004881' OR iq.doi = '10.1097/dss.0000000000004881'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001375',
  NULLIF('10.1097/dss.0000000000001375', ''),
  'Aesthetic Treatment With Botulinum Toxin: Approaches Specific to Men',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001375' OR iq.doi = '10.1097/dss.0000000000001375'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001859',
  NULLIF('10.1097/dss.0000000000001859', ''),
  'Botulinum Toxin Injections for Masseter Reduction in East Asians',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001859' OR iq.doi = '10.1097/dss.0000000000001859'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001277',
  NULLIF('10.1097/dss.0000000000001277', ''),
  'Botulinum Toxin in Aesthetic Medicine: Myths and Realities',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001277' OR iq.doi = '10.1097/dss.0000000000001277'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003184',
  NULLIF('10.1097/dss.0000000000003184', ''),
  'Combining Low-Power Fractional Diode Laser With Injectable Neurotoxin and Filler: Safety of Treatment Regimen Over 6 Years',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003184' OR iq.doi = '10.1097/dss.0000000000003184'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002563',
  NULLIF('10.1097/dss.0000000000002563', ''),
  'Commentary on A Large, Open-Label, Phase 3 Safety Study of DaxibotulinumtoxinA for Injection in Glabellar Lines',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002563' OR iq.doi = '10.1097/dss.0000000000002563'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/00042728-900000000-98496',
  NULLIF('10.1097/00042728-900000000-98496', ''),
  'Commentary on Safety of Perfluorodecalin-Infused Silicone Patch in Picosecond Laser-Assisted Tattoo Removal',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/00042728-900000000-98496' OR iq.doi = '10.1097/00042728-900000000-98496'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001795',
  NULLIF('10.1097/dss.0000000000001795', ''),
  'Commentary on Safety of Perfluorodecalin-Infused Silicone Patch in Picosecond Laser-Assisted Tattoo Removal',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001795' OR iq.doi = '10.1097/dss.0000000000001795'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001519',
  NULLIF('10.1097/dss.0000000000001519', ''),
  'Dermatologic Surgery and Reconstruction Photograph Booklet as a Tool to Improve Informed Consent Before Skin Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001519' OR iq.doi = '10.1097/dss.0000000000001519'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2006.32333.x',
  NULLIF('10.1111/j.1524-4725.2006.32333.x', ''),
  'Dose‐Finding, Safety, and Tolerability Study of Botulinum Toxin Type B for the Treatment of Hyperfunctional Glabellar Lines',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2006.32333.x' OR iq.doi = '10.1111/j.1524-4725.2006.32333.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001716',
  NULLIF('10.1097/dss.0000000000001716', ''),
  'Histologic Effects of Fractional Laser and Radiofrequency Devices on Hyaluronic Acid Filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001716' OR iq.doi = '10.1097/dss.0000000000001716'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000548',
  NULLIF('10.1097/dss.0000000000000548', ''),
  'Patient Satisfaction and Efficacy of Full-Facial Rejuvenation Using a Combination of Botulinum Toxin Type A and Hyaluronic Acid Filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000548' OR iq.doi = '10.1097/dss.0000000000000548'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005029',
  NULLIF('10.1097/dss.0000000000005029', ''),
  'Platelet-Rich Plasma Accelerates Donor Area Healing After Follicular Unit Excision: A Prospective Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005029' OR iq.doi = '10.1097/dss.0000000000005029'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002450',
  NULLIF('10.1097/dss.0000000000002450', ''),
  'Poly-l-Lactic Acid Preinjection Aspiration as a Safety Checkpoint',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002450' OR iq.doi = '10.1097/dss.0000000000002450'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002086',
  NULLIF('10.1097/dss.0000000000002086', ''),
  'Retention Rates Among Patients Undergoing Multimodal Facial Rejuvenation Treatment Versus a Single Monotherapy in Cosmetic Dermatology Practices',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002086' OR iq.doi = '10.1097/dss.0000000000002086'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000390',
  NULLIF('10.1097/dss.0000000000000390', ''),
  'Safety and Efficacy of Microfocused Ultrasound in Tightening of Lax Elbow Skin',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000390' OR iq.doi = '10.1097/dss.0000000000000390'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000126',
  NULLIF('10.1097/dss.0000000000000126', ''),
  'Safety and Efficacy of Microfocused Ultrasound to Lift, Tighten, and Smooth the Buttocks',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000126' OR iq.doi = '10.1097/dss.0000000000000126'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004421',
  NULLIF('10.1097/dss.0000000000004421', ''),
  'Update on Platelet-Rich Plasma and Platelet-Rich Fibrin for Dermatologic Surgery: Addressing Knowns and Unknowns',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004421' OR iq.doi = '10.1097/dss.0000000000004421'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0040-1717143',
  NULLIF('10.1055/s-0040-1717143', ''),
  'Aesthetic Zygoma Reduction in Asian Patients',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0040-1717143' OR iq.doi = '10.1055/s-0040-1717143'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0038-1636921',
  NULLIF('10.1055/s-0038-1636921', ''),
  'Aesthetics and Rejuvenation of the Temple',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0038-1636921' OR iq.doi = '10.1055/s-0038-1636921'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0040-1713790',
  NULLIF('10.1055/s-0040-1713790', ''),
  'Lower Blepharoplasty Three-Dimensional Volume Assessment after Fat Pad Transposition and Concomitant Fat Grafting',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0040-1713790' OR iq.doi = '10.1055/s-0040-1713790'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0041-1729636',
  NULLIF('10.1055/s-0041-1729636', ''),
  'Platelet-Rich Fibrin in Total Laryngectomy: Long-Term Safety Concerns',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0041-1729636' OR iq.doi = '10.1055/s-0041-1729636'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0039-1688797',
  NULLIF('10.1055/s-0039-1688797', ''),
  'Superficial Dermal Fillers with Hyaluronic Acid',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0039-1688797' OR iq.doi = '10.1055/s-0039-1688797'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2370-2426',
  NULLIF('10.1055/a-2370-2426', ''),
  'The Role of Botulinum Toxin A Neuromodulator in the Management of Synkinesis in Facial Palsy',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2370-2426' OR iq.doi = '10.1055/a-2370-2426'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0586',
  NULLIF('10.1089/fpsam.2020.0586', ''),
  'A Prospective Randomized Study of Lateral Brow–Eyelid Complex Volume after Internal Browpexy Using Three-Dimensional Stereophotogrammetry',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0586' OR iq.doi = '10.1089/fpsam.2020.0586'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2024.0389',
  NULLIF('10.1089/fpsam.2024.0389', ''),
  'Assessment of Facial Synkinesis Treatment with Botulinum Toxin Using Automated Analysis of Facial Expression: A Pilot Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2024.0389' OR iq.doi = '10.1089/fpsam.2024.0389'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2024.0262',
  NULLIF('10.1089/fpsam.2024.0262', ''),
  'Botulinum Toxin for Treatment of Synkinesis: Effects on Anxiety and Depression',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2024.0262' OR iq.doi = '10.1089/fpsam.2024.0262'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0502',
  NULLIF('10.1089/fpsam.2020.0502', ''),
  'Commentary on “Nonsurgical Rhinoplasty Using Injectable Fillers: A Safety Review of 2488 Procedures” by Rivkin: Cannula Use During Dermal Filler Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0502' OR iq.doi = '10.1089/fpsam.2020.0502'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0148',
  NULLIF('10.1089/fpsam.2020.0148', ''),
  'Dermal Filler Treatment Improves Psychosocial Well-Being in Facial Paralysis Patients',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0148' OR iq.doi = '10.1089/fpsam.2020.0148'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0170',
  NULLIF('10.1089/fpsam.2023.0170', ''),
  'Effectiveness of Botulinum Toxin-A on Face, Head, and Neck Scars: A Systematic Review and Meta-Analysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0170' OR iq.doi = '10.1089/fpsam.2023.0170'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0019',
  NULLIF('10.1089/fpsam.2022.0019', ''),
  'Functional and Aesthetic Outcomes of Let Down Dorsal Preservation Rhinoplasty',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0019' OR iq.doi = '10.1089/fpsam.2022.0019'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2024.0187',
  NULLIF('10.1089/fpsam.2024.0187', ''),
  'Intradermal Injection of Tranexamic Acid for the Treatment of Adult Melasma: A Systematic Review and Meta-Analysis of Randomized Controlled Trials',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2024.0187' OR iq.doi = '10.1089/fpsam.2024.0187'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0006',
  NULLIF('10.1089/fpsam.2023.0006', ''),
  'Nonsurgical Rhinoplasty: Diamond Injection Technique for Nasal Tip Contouring',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0006' OR iq.doi = '10.1089/fpsam.2023.0006'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2024.0020',
  NULLIF('10.1089/fpsam.2024.0020', ''),
  'Prevention and Management of Dermal Filler Complications: A Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2024.0020' OR iq.doi = '10.1089/fpsam.2024.0020'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0085',
  NULLIF('10.1089/fpsam.2022.0085', ''),
  'The Effect of Acceptance of Cosmetic Surgery, Body Appreciation, and Nasal Obstruction on Patient Satisfaction After Rhinoplasty',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0085' OR iq.doi = '10.1089/fpsam.2022.0085'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0204',
  NULLIF('10.1089/fpsam.2023.0204', ''),
  'The SKIN-Q: An Innovative Patient-Reported Outcome Measure for Evaluating Minimally Invasive Skin Treatments for the Face and Body',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0204' OR iq.doi = '10.1089/fpsam.2023.0204'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0327',
  NULLIF('10.1089/fpsam.2022.0327', ''),
  'Through a New Lens: Skin-Grafted Free Flaps and Objective Facial Skin Color Matching',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0327' OR iq.doi = '10.1089/fpsam.2022.0327'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0053',
  NULLIF('10.1089/fpsam.2020.0053', ''),
  'Using Ultrasound to Evaluate Nasal Septal Cartilage',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0053' OR iq.doi = '10.1089/fpsam.2020.0053'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2013.2.5.236',
  NULLIF('10.12968/joan.2013.2.5.236', ''),
  'A critical incident post injection of botulinum toxin to the glabellar and orbicularis muscles',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2013.2.5.236' OR iq.doi = '10.12968/joan.2013.2.5.236'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2019.8.7.342',
  NULLIF('10.12968/joan.2019.8.7.342', ''),
  'Aesthetic academies',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2019.8.7.342' OR iq.doi = '10.12968/joan.2019.8.7.342'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.2.68',
  NULLIF('10.12968/joan.2014.3.2.68', ''),
  'Aesthetic nasal enhancement: products, techniques and treatment protocols',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.2.68' OR iq.doi = '10.12968/joan.2014.3.2.68'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2015.4.1.30',
  NULLIF('10.12968/joan.2015.4.1.30', ''),
  'Avoiding litigation: a case study of an adverse event post facial laser hair removal',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2015.4.1.30' OR iq.doi = '10.12968/joan.2015.4.1.30'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.8.422',
  NULLIF('10.12968/joan.2018.7.8.422', ''),
  'Chemical peels: a review of types, applications and complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.8.422' OR iq.doi = '10.12968/joan.2018.7.8.422'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2020.9.8.334',
  NULLIF('10.12968/joan.2020.9.8.334', ''),
  'Collagen stimulants in facial rejuvenation: a systematic review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2020.9.8.334' OR iq.doi = '10.12968/joan.2020.9.8.334'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2013.2.3.124',
  NULLIF('10.12968/joan.2013.2.3.124', ''),
  'Combining laser and ultrasound technologies to deliver platelet-rich plasma',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2013.2.3.124' OR iq.doi = '10.12968/joan.2013.2.3.124'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.1.24',
  NULLIF('10.12968/joan.2018.7.1.24', ''),
  'Fat transfer in aesthetic plastic surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.1.24' OR iq.doi = '10.12968/joan.2018.7.1.24'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2021.10.sup1.34',
  NULLIF('10.12968/joan.2021.10.sup1.34', ''),
  'Hyaluronic acid filler vascular complication management: an updated and easy-to-follow emergency protocol',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2021.10.sup1.34' OR iq.doi = '10.12968/joan.2021.10.sup1.34'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2013.2.8.392',
  NULLIF('10.12968/joan.2013.2.8.392', ''),
  'Laser regulation in the UK: why it is time for the aesthetic industry to toughen up',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2013.2.8.392' OR iq.doi = '10.12968/joan.2013.2.8.392'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2025.0004',
  NULLIF('10.12968/joan.2025.0004', ''),
  'Microneedling: monotherapy or adjuvant treatment?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2025.0004' OR iq.doi = '10.12968/joan.2025.0004'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.2.82',
  NULLIF('10.12968/joan.2018.7.2.82', ''),
  'Radiofrequency treatment for vulvovaginal laxity and sexual dysfunction',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.2.82' OR iq.doi = '10.12968/joan.2018.7.2.82'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.sup1.8',
  NULLIF('10.12968/joan.2018.7.sup1.8', ''),
  'Role of cosmeceutical skincare in the management of acne',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.sup1.8' OR iq.doi = '10.12968/joan.2018.7.sup1.8'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2013.2.3.118',
  NULLIF('10.12968/joan.2013.2.3.118', ''),
  'Safety considerations for aesthetic nurses administering platelet-rich plasma',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2013.2.3.118' OR iq.doi = '10.12968/joan.2013.2.3.118'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2013.2.3.134',
  NULLIF('10.12968/joan.2013.2.3.134', ''),
  'Sun protection: an essential update on the use of physical and chemical sunscreens',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2013.2.3.134' OR iq.doi = '10.12968/joan.2013.2.3.134'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.1.48',
  NULLIF('10.12968/joan.2014.3.1.48', ''),
  'The Cosmetic Skin Clinic: from first impressions to undergoing a procedure',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.1.48' OR iq.doi = '10.12968/joan.2014.3.1.48'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2022.11.7.286',
  NULLIF('10.12968/joan.2022.11.7.286', ''),
  'Using ultrasound to evaluate facial fillers and other commonly encountered aesthetic skin issues',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2022.11.7.286' OR iq.doi = '10.12968/joan.2022.11.7.286'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2026.0008',
  NULLIF('10.12968/joan.2026.0008', ''),
  'Volumising, biostimulative and uniquely regenerative: a review of <b>calcium hydroxylapatite</b>',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2026.0008' OR iq.doi = '10.12968/joan.2026.0008'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15269',
  NULLIF('10.1111/jocd.15269', ''),
  '<scp>InMode</scp> Evoke radiofrequency hands‐free facial remodeling for skin rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15269' OR iq.doi = '10.1111/jocd.15269'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16338',
  NULLIF('10.1111/jocd.16338', ''),
  '<scp>Self‐crossing</scp> hyaluronic acid filler with combination use of polydioxanone thread in minipig model',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16338' OR iq.doi = '10.1111/jocd.16338'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13138',
  NULLIF('10.1111/jocd.13138', ''),
  'A mini review on the common methods of pain reduction before filler and botulinum toxin injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13138' OR iq.doi = '10.1111/jocd.13138'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16365',
  NULLIF('10.1111/jocd.16365', ''),
  'A prospective and randomized study comparing <scp>ultrasound‐guided</scp> real time injection to conventional blind injection of botulinum neurotoxin for glabellar wrinkles',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16365' OR iq.doi = '10.1111/jocd.16365'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12280',
  NULLIF('10.1111/jocd.12280', ''),
  'A randomized clinical trial on the comparison between hair shaving and snipping prior to laser hair removal sessions in women suffering from hirsutism',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12280' OR iq.doi = '10.1111/jocd.12280'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15179',
  NULLIF('10.1111/jocd.15179', ''),
  'A study of combination unilateral subcutaneous botulinum toxin a treatment for androgenetic alopecia',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15179' OR iq.doi = '10.1111/jocd.15179'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70125',
  NULLIF('10.1111/jocd.70125', ''),
  'Alopecia and Semaglutide: Connecting the Dots for Patient Safety',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70125' OR iq.doi = '10.1111/jocd.70125'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16623',
  NULLIF('10.1111/jocd.16623', ''),
  'An International Survey on the Use of a Polyrevitalizing Solution With or Without Other Aesthetic Procedures in the Daily Practice of Aesthetic Physicians',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16623' OR iq.doi = '10.1111/jocd.16623'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70900',
  NULLIF('10.1111/jocd.70900', ''),
  'Artificial Intelligence‐Augmented Morphometric Reporting for Standardized Facial Aesthetic Treatment Planning: A Multi‐Rater Reliability Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70900' OR iq.doi = '10.1111/jocd.70900'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70252',
  NULLIF('10.1111/jocd.70252', ''),
  'Assessing the Quality and Safety of Do‐It‐Yourself Cosmetic Neuromodulator Injection Tutorials on YouTube',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70252' OR iq.doi = '10.1111/jocd.70252'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15513',
  NULLIF('10.1111/jocd.15513', ''),
  'Botulinum toxin for cosmetic treatments in young adults: An evidence‐based review and survey on current practice among aesthetic practitioners',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15513' OR iq.doi = '10.1111/jocd.15513'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12217',
  NULLIF('10.1111/jocd.12217', ''),
  'Comparison of efficacy of products containing azelaic acid in melasma treatment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12217' OR iq.doi = '10.1111/jocd.12217'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13961',
  NULLIF('10.1111/jocd.13961', ''),
  'Comparison of microfocused ultrasound with visualization for skin laxity among vegan and omnivore patients',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13961' OR iq.doi = '10.1111/jocd.13961'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16736',
  NULLIF('10.1111/jocd.16736', ''),
  'Correction to Academic visualization study of aesthetic medicine management and related legal research since 2000',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16736' OR iq.doi = '10.1111/jocd.16736'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70724',
  NULLIF('10.1111/jocd.70724', ''),
  'Cosmeceutical and Dermatological Potential of Shiitake Mushroom ( <i>Lentinula edodes</i> ) Extract',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70724' OR iq.doi = '10.1111/jocd.70724'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15985',
  NULLIF('10.1111/jocd.15985', ''),
  'Cryolipolysis: The future of cryolipolysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15985' OR iq.doi = '10.1111/jocd.15985'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15016',
  NULLIF('10.1111/jocd.15016', ''),
  'Delayed complication of botulinum toxin and hyaluronic acid filler injections: A case report',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15016' OR iq.doi = '10.1111/jocd.15016'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70818',
  NULLIF('10.1111/jocd.70818', ''),
  'Dissolving Hyaluronic Acid Filler: The Diffusion Barrier to Hyaluronidase Efficacy',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70818' OR iq.doi = '10.1111/jocd.70818'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2011.00550.x',
  NULLIF('10.1111/j.1473-2165.2011.00550.x', ''),
  'Efficacy and safety of a new hyaluronic acid dermal filler in the treatment of severe nasolabial lines - 6-month interim results of a randomized, evaluator-blinded, intra-individual comparison study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2011.00550.x' OR iq.doi = '10.1111/j.1473-2165.2011.00550.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15250',
  NULLIF('10.1111/jocd.15250', ''),
  'Efficacy and safety of photothermal‐bioactivated <scp>platelet‐rich</scp> plasma for facial rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15250' OR iq.doi = '10.1111/jocd.15250'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2007.00289.x',
  NULLIF('10.1111/j.1473-2165.2007.00289.x', ''),
  'Elderly skin and its rejuvenation: products and procedures for the aging skin',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2007.00289.x' OR iq.doi = '10.1111/j.1473-2165.2007.00289.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16657',
  NULLIF('10.1111/jocd.16657', ''),
  'Energy‐Based Skin Rejuvenation: A Review of Mechanisms and Thermal Effects',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16657' OR iq.doi = '10.1111/jocd.16657'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12215',
  NULLIF('10.1111/jocd.12215', ''),
  'Evaluation of lifting and antiwrinkle effects of calcium hydroxylapatite filler. <i>In vitro</i> quantification of contractile forces of human wrinkle and normal aged fibroblasts treated with calcium hydroxylapatite',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12215' OR iq.doi = '10.1111/jocd.12215'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13903',
  NULLIF('10.1111/jocd.13903', ''),
  'Isolated isoquercitrin from Green ball apple peel inhibits photoaging in CCD‐986Sk fibroblasts cells via modulation of the MMPs signaling',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13903' OR iq.doi = '10.1111/jocd.13903'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12032',
  NULLIF('10.1111/jocd.12032', ''),
  'Lateral oblique forehead lines: redefining sleeping lines and treatment with botulinum toxin A',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12032' OR iq.doi = '10.1111/jocd.12032'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12036',
  NULLIF('10.1111/jocd.12036', ''),
  'Longitudinal evaluation of cryolipolysis efficacy: two case studies',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12036' OR iq.doi = '10.1111/jocd.12036'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12256',
  NULLIF('10.1111/jocd.12256', ''),
  'Men at risk for paradoxical adipose hyperplasia after cryolipolysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12256' OR iq.doi = '10.1111/jocd.12256'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2005.40212.x',
  NULLIF('10.1111/j.1473-2165.2005.40212.x', ''),
  'Microdermabrasion followed by a 5% retinoid acid chemical peel <i>vs.</i> a 5% retinoid acid chemical peel for the treatment of photoaging – a pilot study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2005.40212.x' OR iq.doi = '10.1111/j.1473-2165.2005.40212.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12090',
  NULLIF('10.1111/jocd.12090', ''),
  'Multipoint and multilevel injection technique of botulinum toxin A in facial aesthetics',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12090' OR iq.doi = '10.1111/jocd.12090'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70885',
  NULLIF('10.1111/jocd.70885', ''),
  'Neuroaesthetics: Evolutionary Thinking in Facial Aesthetic Medicine',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70885' OR iq.doi = '10.1111/jocd.70885'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13088',
  NULLIF('10.1111/jocd.13088', ''),
  'Pilot study: Autologous platelet‐rich plasma used in a topical cream for facial rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13088' OR iq.doi = '10.1111/jocd.13088'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2007.00263.x',
  NULLIF('10.1111/j.1473-2165.2007.00263.x', ''),
  'Pincer nail: aesthetic concept in surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2007.00263.x' OR iq.doi = '10.1111/j.1473-2165.2007.00263.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12271',
  NULLIF('10.1111/jocd.12271', ''),
  'Platelet‐rich plasma and hyaluronic acid – an efficient biostimulation method for face rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12271' OR iq.doi = '10.1111/jocd.12271'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70311',
  NULLIF('10.1111/jocd.70311', ''),
  'Revealing the Patient Perspective: Evolution of Patient‐Reported Outcome Measures in Botulinum Toxin Studies in Aesthetic Medicine',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70311' OR iq.doi = '10.1111/jocd.70311'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70553',
  NULLIF('10.1111/jocd.70553', ''),
  'Rheological and Physicochemical Properties of Hyaluronic Acid Fillers for Body Contouring: Clinical Implications and Anatomical Considerations',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70553' OR iq.doi = '10.1111/jocd.70553'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12911',
  NULLIF('10.1111/jocd.12911', ''),
  'Role of broad‐spectrum sunscreen alone in the improvement of melasma area severity index (MASI) and Melasma Quality of Life Index in melasma',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12911' OR iq.doi = '10.1111/jocd.12911'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2130.2004.00080.x',
  NULLIF('10.1111/j.1473-2130.2004.00080.x', ''),
  'Skin lifting in aesthetic cervicofacial rhytidectomy: personal experience in more than 1500 patients',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2130.2004.00080.x' OR iq.doi = '10.1111/j.1473-2130.2004.00080.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2006.00243.x',
  NULLIF('10.1111/j.1473-2165.2006.00243.x', ''),
  'Skin rejuvenation without a scalpel. I. Fillers',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2006.00243.x' OR iq.doi = '10.1111/j.1473-2165.2006.00243.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2006.00270.x',
  NULLIF('10.1111/j.1473-2165.2006.00270.x', ''),
  'The third dimension in facial rejuvenation: a review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2006.00270.x' OR iq.doi = '10.1111/j.1473-2165.2006.00270.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70681',
  NULLIF('10.1111/jocd.70681', ''),
  'Topical Volumizing Cream Improves Facial Volume and Skin Health in Adults With Rapid Weight Loss From Pharmacologic ( <scp>GLP</scp> ‐1/ <scp>GIP</scp> Agonists), Surgical, or Behavioral Interventions',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70681' OR iq.doi = '10.1111/jocd.70681'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12075',
  NULLIF('10.1111/jocd.12075', ''),
  'Under eye infraorbital injection technique: The best value in facial rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12075' OR iq.doi = '10.1111/jocd.12075'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70028',
  NULLIF('10.1111/jocd.70028', ''),
  'Unilateral Blepharoptosis Combined With Malignant Exophthalmos After Botulinum Toxin Injection to Glabellar Lines: A Case Report',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70028' OR iq.doi = '10.1111/jocd.70028'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_117_23',
  NULLIF('10.25259/jcas_117_23', ''),
  'A comparative study of 70% glycolic acid and 30% trichloroacetic acid peel in the treatment of facial atrophic acne scars: A split-face study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_117_23' OR iq.doi = '10.25259/jcas_117_23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_142_19',
  NULLIF('10.4103/jcas.jcas_142_19', ''),
  'A comparative study to assess the efficacy of fractional carbon dioxide laser and combination of fractional carbon dioxide laser with topical autologous platelet-rich plasma in post-acne atrophic scars',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_142_19' OR iq.doi = '10.4103/jcas.jcas_142_19'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_119_20',
  NULLIF('10.4103/jcas.jcas_119_20', ''),
  'A review on the combined use of soft tissue filler, suspension threads, and botulinum toxin for facial rejuvenation',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_119_20' OR iq.doi = '10.4103/jcas.jcas_119_20'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_123_2024',
  NULLIF('10.25259/jcas_123_2024', ''),
  'A study quantifying body dysmorphophobia in patients with cosmetic concerns visiting a dermatology clinic',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_123_2024' OR iq.doi = '10.25259/jcas_123_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_159_21',
  NULLIF('10.4103/jcas.jcas_159_21', ''),
  'Combined therapy with laser and autologous topical serum for facial rejuvenation: A multiple case series report',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_159_21' OR iq.doi = '10.4103/jcas.jcas_159_21'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_31_2024',
  NULLIF('10.25259/jcas_31_2024', ''),
  'Delayed inflammatory reaction to hyaluronic acid filler following COVID-19 vaccination: A case report and review of the literature',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_31_2024' OR iq.doi = '10.25259/jcas_31_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.44161',
  NULLIF('10.4103/0974-2077.44161', ''),
  'Dermal fillers: Tips to achieve successful outcomes',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.44161' OR iq.doi = '10.4103/0974-2077.44161'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_218_22',
  NULLIF('10.4103/jcas.jcas_218_22', ''),
  'Efficacy of autologous platelet rich plasma with subcision vs platelet rich plasma with microneedling in atrophic acne scars: A single-center, prospective, intra-individual split-face comparative study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_218_22' OR iq.doi = '10.4103/jcas.jcas_218_22'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_233_2025',
  NULLIF('10.25259/jcas_233_2025', ''),
  'Follicular unit extraction as a treatment for acne keloidalis nuchae',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_233_2025' OR iq.doi = '10.25259/jcas_233_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_96_18',
  NULLIF('10.4103/jcas.jcas_96_18', ''),
  'Fractional carbon dioxide laser in combination with topical corticosteroid application in resistant alopecia areata: A case series',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_96_18' OR iq.doi = '10.4103/jcas.jcas_96_18'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_206_2025',
  NULLIF('10.25259/jcas_206_2025', ''),
  'From suspicion to resolution: Sclerotherapy in a case of facial pseudolymphoma',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_206_2025' OR iq.doi = '10.25259/jcas_206_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_57_24',
  NULLIF('10.25259/jcas_57_24', ''),
  'Home cryolipolysis – A burning issue',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_57_24' OR iq.doi = '10.25259/jcas_57_24'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_149_2024',
  NULLIF('10.25259/jcas_149_2024', ''),
  'Is “hybrid laser” a breakthrough in treating atrophoderma vermiculatum?',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_149_2024' OR iq.doi = '10.25259/jcas_149_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_201_2025',
  NULLIF('10.25259/jcas_201_2025', ''),
  'Structural analysis of the tissue subjected to the technique of facial adipostructuring: A histological study',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_201_2025' OR iq.doi = '10.25259/jcas_201_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_89_23',
  NULLIF('10.25259/jcas_89_23', ''),
  'Successful fat transplant in a rare acquired lipodystrophy Barraquer–Simons syndrome',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_89_23' OR iq.doi = '10.25259/jcas_89_23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.204583',
  NULLIF('10.4103/0974-2077.204583', ''),
  'Successful management of dowling-degos disease with combination of Q-switched Nd: YAG and fractional carbon dioxide laser',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.204583' OR iq.doi = '10.4103/0974-2077.204583'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2020.159',
  NULLIF('10.20517/2347-9264.2020.159', ''),
  'Aging skin and non-surgical procedures: a basic science overview',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2020.159' OR iq.doi = '10.20517/2347-9264.2020.159'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2023.30',
  NULLIF('10.20517/2347-9264.2023.30', ''),
  'Asian facial recontouring surgery',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2023.30' OR iq.doi = '10.20517/2347-9264.2023.30'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2024.70',
  NULLIF('10.20517/2347-9264.2024.70', ''),
  'Cell-supplemented autologous fat grafting: a review from bench to bedside',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2024.70' OR iq.doi = '10.20517/2347-9264.2024.70'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2023.05',
  NULLIF('10.20517/2347-9264.2023.05', ''),
  'Current concepts in the management of pediatric trigger thumb',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2023.05' OR iq.doi = '10.20517/2347-9264.2023.05'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2021.58',
  NULLIF('10.20517/2347-9264.2021.58', ''),
  'Lip rejuvenation and filler complications in the perioral region',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2021.58' OR iq.doi = '10.20517/2347-9264.2021.58'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2017.69',
  NULLIF('10.20517/2347-9264.2017.69', ''),
  'Modified lower eyelid blepharoplasty improves aesthetic outcomes in patients with hypoplastic malar prominences',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2017.69' OR iq.doi = '10.20517/2347-9264.2017.69'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2022.120',
  NULLIF('10.20517/2347-9264.2022.120', ''),
  'Novel indications for autologous fat grafting in reconstruction: scleroderma',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2022.120' OR iq.doi = '10.20517/2347-9264.2022.120'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2021.64',
  NULLIF('10.20517/2347-9264.2021.64', ''),
  'Partial auricular reconstruction surgery for facial skin cancer',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2021.64' OR iq.doi = '10.20517/2347-9264.2021.64'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2025.123',
  NULLIF('10.20517/2347-9264.2025.123', ''),
  'Targeting ferroptosis in photoaging: mechanisms and therapeutic potential of adipose-derived stem cell exosomes',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2025.123' OR iq.doi = '10.20517/2347-9264.2025.123'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2020.03',
  NULLIF('10.20517/2347-9264.2020.03', ''),
  'The use of botulinum toxin A in chemical component separation: a review of techniques and outcomes',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2020.03' OR iq.doi = '10.20517/2347-9264.2020.03'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x11422228',
  NULLIF('10.1177/1090820x11422228', ''),
  'Aesthetic Outcomes of Labioplasty',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x11422228' OR iq.doi = '10.1177/1090820x11422228'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab291',
  NULLIF('10.1093/asj/sjab291', ''),
  'Analyzing the Quality of Aesthetic Surgery Procedure Videos on TikTok',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab291' OR iq.doi = '10.1093/asj/sjab291'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad217',
  NULLIF('10.1093/asj/sjad217', ''),
  'Botulinum A Toxin and Laser Therapy: Evidence and Recommendations for Combination Treatment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad217' OR iq.doi = '10.1093/asj/sjad217'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjae196',
  NULLIF('10.1093/asj/sjae196', ''),
  'Calcium Hydroxylapatite in Regenerative Aesthetics: Mechanistic Insights and Mode of Action',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae196' OR iq.doi = '10.1093/asj/sjae196'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjz050',
  NULLIF('10.1093/asj/sjz050', ''),
  'Changes in Dermal Thickness in Biopsy Study of Histologic Findings After a Single Injection of Polycaprolactone-Based Filler into the Dermis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz050' OR iq.doi = '10.1093/asj/sjz050'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjz293',
  NULLIF('10.1093/asj/sjz293', ''),
  'Commentary on: Topical Nanofat Biocrème Improves Aesthetic Outcomes of Nonablative Fractionated Laser Treatment: A Preliminary Report',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz293' OR iq.doi = '10.1093/asj/sjz293'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjae044',
  NULLIF('10.1093/asj/sjae044', ''),
  'Efficacy and Pain Tolerance of Alexandrite Laser Hair Removal at Different Stages of the Menstrual Cycle',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae044' OR iq.doi = '10.1093/asj/sjae044'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjz250',
  NULLIF('10.1093/asj/sjz250', ''),
  'Efficacy of Combination Therapy With Fractional Carbon Dioxide Laser and Ultraviolet B Phototherapy for Vitiligo: A Systematic Review and Meta-Analysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz250' OR iq.doi = '10.1093/asj/sjz250'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaa054',
  NULLIF('10.1093/asj/sjaa054', ''),
  'Global Needs-Assessment for a Postgraduate Program on Nonsurgical Facial Aesthetics',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa054' OR iq.doi = '10.1093/asj/sjaa054'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjy029',
  NULLIF('10.1093/asj/sjy029', ''),
  'Introducing Platelet-Rich Stroma: Platelet-Rich Plasma (PRP) and Stromal Vascular Fraction (SVF) Combined for the Treatment of Androgenetic Alopecia',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjy029' OR iq.doi = '10.1093/asj/sjy029'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1016/s1090-820x(96)70025-0',
  NULLIF('10.1016/s1090-820x(96)70025-0', ''),
  'Outcomes Studies and Aesthetic Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/s1090-820x(96)70025-0' OR iq.doi = '10.1016/s1090-820x(96)70025-0'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjae198',
  NULLIF('10.1093/asj/sjae198', ''),
  'Peripheral Nerve Injury After Deoxycholic Acid (ATX-101) Injection in an Experimental Rat Model',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae198' OR iq.doi = '10.1093/asj/sjae198'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjz105',
  NULLIF('10.1093/asj/sjz105', ''),
  'The Impact of Skin Care Product Sales in an Aesthetic Plastic Surgery Practice',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz105' OR iq.doi = '10.1093/asj/sjz105'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab357',
  NULLIF('10.1093/asj/sjab357', ''),
  '“Split-Face” Evaluation of Collagen Changes Induced by Periorbital Fractional CO2 Laser Resurfacing',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab357' OR iq.doi = '10.1093/asj/sjab357'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s490225',
  NULLIF('10.2147/ccid.s490225', ''),
  'Combination Fractional Carbon Dioxide Laser Treatment and Bone Marrow Mesenchymal Stem Cell Therapy Enhances the Treatment of Skin Photoaging in a Murine Model System',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s490225' OR iq.doi = '10.2147/ccid.s490225'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s593313',
  NULLIF('10.2147/ccid.s593313', ''),
  'Combination Therapy with 308-nm Excimer Laser, Compound Glycyrrhizin, and Tacrolimus for Pediatric Facial and Cervical Vitiligo',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s593313' OR iq.doi = '10.2147/ccid.s593313'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s492091',
  NULLIF('10.2147/ccid.s492091', ''),
  'Combination Treatment with Cryolipolysis and Hyaluronic Acid Fillers for Jawline Enhancement',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s492091' OR iq.doi = '10.2147/ccid.s492091'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s144282',
  NULLIF('10.2147/ccid.s144282', ''),
  'Combined aesthetic interventions for prevention of facial ageing, and restoration and beautification of face and body',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s144282' OR iq.doi = '10.2147/ccid.s144282'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s372490',
  NULLIF('10.2147/ccid.s372490', ''),
  'Evaluation of the Performance and Tolerance of the Combination of an HA-based Filler with Tri-Hyal Technology and a Skin Biorevitalizer on Skin Aging Parameters',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s372490' OR iq.doi = '10.2147/ccid.s372490'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s518475',
  NULLIF('10.2147/ccid.s518475', ''),
  'Hyaluronic Acid Combined with Diluted and Hyperdiluted Calcium Hydroxylapatite to Treat the Periocular Area',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s518475' OR iq.doi = '10.2147/ccid.s518475'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s596645',
  NULLIF('10.2147/ccid.s596645', ''),
  'Microneedling Combined with Photothermal-Biomodulated Autologous PRP to Enhance Exosome Release in Refractory Melasma: A Case Report',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s596645' OR iq.doi = '10.2147/ccid.s596645'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s423917',
  NULLIF('10.2147/ccid.s423917', ''),
  'Partial Unilateral Lentiginosis Successfully Treated with the Combination of 511 nm and 578 nm Copper Bromide Laser in an Indonesian Woman',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s423917' OR iq.doi = '10.2147/ccid.s423917'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s430762',
  NULLIF('10.2147/ccid.s430762', ''),
  'RELAX and FIRMNESS: The Combination of Muscle Relaxation with Botulinum Toxin and Collagen Biostimulation with Calcium Hydroxyapatite for the Treatment of the Cervical Region',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s430762' OR iq.doi = '10.2147/ccid.s430762'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s157782',
  NULLIF('10.2147/ccid.s157782', ''),
  'Synergistic effects of Combined Therapy: nonfocused ultrasound plus Aussie current for noninvasive body contouring',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s157782' OR iq.doi = '10.2147/ccid.s157782'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s56655',
  NULLIF('10.2147/ccid.s56655', ''),
  'Treatment of elderly patients with advanced lipedema: a combination of laser-assisted liposuction, medial thigh lift, and lower partial abdominoplasty',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s56655' OR iq.doi = '10.2147/ccid.s56655'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics13030103',
  NULLIF('10.3390/cosmetics13030103', ''),
  'Poly-L-lactic Acid (Sculptra®): A Regenerative Aesthetic Treatment',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics13030103' OR iq.doi = '10.3390/cosmetics13030103'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000947',
  NULLIF('10.1097/dss.0000000000000947', ''),
  'A Comprehensive Approach to Multimodal Facial Aesthetic Treatment: Injection Techniques and Treatment Characteristics From the HARMONY Study: ERRATUM',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000947' OR iq.doi = '10.1097/dss.0000000000000947'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004806',
  NULLIF('10.1097/dss.0000000000004806', ''),
  'Beyond Weight Loss: GLP-1 and the future of Aesthetic Outcomes',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004806' OR iq.doi = '10.1097/dss.0000000000004806'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1046/j.1524-4725.2003.29124.x',
  NULLIF('10.1046/j.1524-4725.2003.29124.x', ''),
  'Botulinum Toxin Type B (MYOBLOC) Versus Botulinum Toxin Type A (BOTOX) Frontalis Study: Rate of Onset and Radius of Diffusion',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1046/j.1524-4725.2003.29124.x' OR iq.doi = '10.1046/j.1524-4725.2003.29124.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002287',
  NULLIF('10.1097/dss.0000000000002287', ''),
  'Commentary on Maximizing Panfacial Aesthetic Outcomes',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002287' OR iq.doi = '10.1097/dss.0000000000002287'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2010.01781.x',
  NULLIF('10.1111/j.1524-4725.2010.01781.x', ''),
  'Commentary: Novel Hyaluronic Acid Dermal Filler: Dermal Gel Extra Physical Properties and Clinical Outcomes',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2010.01781.x' OR iq.doi = '10.1111/j.1524-4725.2010.01781.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002656',
  NULLIF('10.1097/dss.0000000000002656', ''),
  'Laser Rejuvenation of Nonfacial Skin: A Review and a Personal Approach',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002656' OR iq.doi = '10.1097/dss.0000000000002656'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2006.32071.x',
  NULLIF('10.1111/j.1524-4725.2006.32071.x', ''),
  'Patient Satisfaction and Reported Long-Term Therapeutic Efficacy Associated with 1,320 nm Nd:YAG Laser Treatment of Acne Scarring and Photoaging',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2006.32071.x' OR iq.doi = '10.1111/j.1524-4725.2006.32071.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003196',
  NULLIF('10.1097/dss.0000000000003196', ''),
  'Pooled Subject-Reported Outcomes from 2 Phase 3 Studies of OnabotulinumtoxinA for Simultaneous Treatment of Forehead and Glabellar Lines: Erratum',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003196' OR iq.doi = '10.1097/dss.0000000000003196'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001404',
  NULLIF('10.1097/dss.0000000000001404', ''),
  'Preventive, Cumulative Effects of Botulinum Toxin Type A in Facial Aesthetics',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001404' OR iq.doi = '10.1097/dss.0000000000001404'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2008.01062.x',
  NULLIF('10.1111/j.1524-4725.2008.01062.x', ''),
  'Risk of Severe Adverse Reactions To an Injectable Filler Based on a Fixed Combination of Hydroxyethylmethacrylate and Ethylmethacrylate with Hyaluronic Acid',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2008.01062.x' OR iq.doi = '10.1111/j.1524-4725.2008.01062.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005045',
  NULLIF('10.1097/dss.0000000000005045', ''),
  'The Effects of Aesthetic Lasers and Intense Pulsed Light on Skin Shields',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005045' OR iq.doi = '10.1097/dss.0000000000005045'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002612',
  NULLIF('10.1097/dss.0000000000002612', ''),
  'Treatment of Refractory Melasma in Asians With the Picosecond Alexandrite Laser',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002612' OR iq.doi = '10.1097/dss.0000000000002612'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003225',
  NULLIF('10.1097/dss.0000000000003225', ''),
  'Upper Margin of the Forehead Flap and Its Correlation With Aesthetic Results in Nasal Reconstruction in Fitzpatrick Skin Type III and IV Chinese',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003225' OR iq.doi = '10.1097/dss.0000000000003225'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0039-1688796',
  NULLIF('10.1055/s-0039-1688796', ''),
  'Fat Grafting for Facial Contouring',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0039-1688796' OR iq.doi = '10.1055/s-0039-1688796'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0028-1102908',
  NULLIF('10.1055/s-0028-1102908', ''),
  'Hair Restoration Complications: An Approach to the Unnatural-Appearing Hair Transplant',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0028-1102908' OR iq.doi = '10.1055/s-0028-1102908'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0037-1606638',
  NULLIF('10.1055/s-0037-1606638', ''),
  'Management of the Cephalically Malpositioned Lower Lateral Crus in Aesthetic Rhinoplasty',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0037-1606638' OR iq.doi = '10.1055/s-0037-1606638'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0037-1600525',
  NULLIF('10.1055/s-0037-1600525', ''),
  'Mandibular Rim Trilogy with Botulinum Toxin Injection: Reduction, Projection, and Lift',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0037-1600525' OR iq.doi = '10.1055/s-0037-1600525'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0037-1604240',
  NULLIF('10.1055/s-0037-1604240', ''),
  'Platelet-Rich Plasma for the Aesthetic Surgeon',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0037-1604240' OR iq.doi = '10.1055/s-0037-1604240'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-2005-872414',
  NULLIF('10.1055/s-2005-872414', ''),
  'The Radiofrequency Frontier: A Review of Radiofrequency and Combined Radiofrequency Pulsed-Light Technology in Aesthetic Medicine',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-2005-872414' OR iq.doi = '10.1055/s-2005-872414'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-2008-1064472',
  NULLIF('10.1055/s-2008-1064472', ''),
  'Treatment of Skin Tumors of the Inner Canthal Region - Reconstructing the Medial Canthal Area: A Dilemma Between Doing Too Much and an Aesthetic Outcome',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-2008-1064472' OR iq.doi = '10.1055/s-2008-1064472'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0009',
  NULLIF('10.1089/fpsam.2020.0009', ''),
  'Beyond Botox: Contemporary Management of Nonflaccid Facial Palsy',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0009' OR iq.doi = '10.1089/fpsam.2020.0009'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0371',
  NULLIF('10.1089/fpsam.2023.0371', ''),
  'Commentary on “Impurities in Hyaluronic Acid Facial Fillers? A Narrative Review on Nonanimal Cross-Linked Fillers” by Wollina et al.',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0371' OR iq.doi = '10.1089/fpsam.2023.0371'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0237',
  NULLIF('10.1089/fpsam.2023.0237', ''),
  'Commentary on: “Frontal Osteomyelitis and Sinusitis Complication After Type III Frontal Bone Cranioplasty for Facial Feminization” by Brown et al.',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0237' OR iq.doi = '10.1089/fpsam.2023.0237'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0270',
  NULLIF('10.1089/fpsam.2022.0270', ''),
  'Commentary on: “Functional and Aesthetic Outcomes of Let Down Dorsal Preservation Rhinoplasty” by Sozansky Lujan et al',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0270' OR iq.doi = '10.1089/fpsam.2022.0270'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0142',
  NULLIF('10.1089/fpsam.2020.0142', ''),
  'Consideration of Nasal Contour in Endoscopic Forehead Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0142' OR iq.doi = '10.1089/fpsam.2020.0142'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0397',
  NULLIF('10.1089/fpsam.2022.0397', ''),
  'Frontal Osteomyelitis and Sinusitis Complication After Type III Frontal Bone Cranioplasty for Facial Feminization',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0397' OR iq.doi = '10.1089/fpsam.2022.0397'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0050',
  NULLIF('10.1089/fpsam.2023.0050', ''),
  'Imbrication of Anterior Digastric with Advancement of the Posterior Digastric and Its Implications in Neck Aesthetics',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0050' OR iq.doi = '10.1089/fpsam.2023.0050'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0082',
  NULLIF('10.1089/fpsam.2022.0082', ''),
  'In Vitro Comparison Between Ovine and Human Recombinant Hyaluronidase on Hyaluronic Acid Fillers',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0082' OR iq.doi = '10.1089/fpsam.2022.0082'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0294',
  NULLIF('10.1089/fpsam.2022.0294', ''),
  'Laser Hair Removal for Intraoral Flaps: A Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0294' OR iq.doi = '10.1089/fpsam.2022.0294'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2021.0151',
  NULLIF('10.1089/fpsam.2021.0151', ''),
  'The Effectiveness of Low-Level Light/Laser Therapy on Hair Loss',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2021.0151' OR iq.doi = '10.1089/fpsam.2021.0151'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0330',
  NULLIF('10.1089/fpsam.2022.0330', ''),
  'Three-Dimensional Analysis of Tear Trough Volume After Lower Blepharoplasty with Midface Lift',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0330' OR iq.doi = '10.1089/fpsam.2022.0330'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2024.0046',
  NULLIF('10.1089/fpsam.2024.0046', ''),
  'Variation in Lip Shape and Aesthetics in the Young Female Population: A Statistical Atlas Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2024.0046' OR iq.doi = '10.1089/fpsam.2024.0046'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2026.0006',
  NULLIF('10.12968/joan.2026.0006', ''),
  '<b>Poly-L-lactic acid</b> in contemporary facial rejuvenation: a regenerative approach',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2026.0006' OR iq.doi = '10.12968/joan.2026.0006'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2026.0013',
  NULLIF('10.12968/joan.2026.0013', ''),
  '<i>Platelet rich plasma</i> in advanced skin rejuvenation: from liquid biostimulation to regenerative biofiller',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2026.0013' OR iq.doi = '10.12968/joan.2026.0013'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2024.0016',
  NULLIF('10.12968/joan.2024.0016', ''),
  'Achieving natural facial harmonisation: a clinical review of Restylane facial filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2024.0016' OR iq.doi = '10.12968/joan.2024.0016'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2013.2.5.224',
  NULLIF('10.12968/joan.2013.2.5.224', ''),
  'An introduction to superficial, medium, deep and combination chemical peels',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2013.2.5.224' OR iq.doi = '10.12968/joan.2013.2.5.224'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.8.386',
  NULLIF('10.12968/joan.2014.3.8.386', ''),
  'An overview of body sculpting in medical aesthetic practice using cryolipolysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.8.386' OR iq.doi = '10.12968/joan.2014.3.8.386'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2020.9.10.428',
  NULLIF('10.12968/joan.2020.9.10.428', ''),
  'Body contouring using a combination of non-invasive energy-based devices',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2020.9.10.428' OR iq.doi = '10.12968/joan.2020.9.10.428'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2020.9.5.195',
  NULLIF('10.12968/joan.2020.9.5.195', ''),
  'Body contouring using a combination of non-invasive energy-based devices',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2020.9.5.195' OR iq.doi = '10.12968/joan.2020.9.5.195'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2022.11.2.50',
  NULLIF('10.12968/joan.2022.11.2.50', ''),
  'Facial rejuvenation treatments: a clinical review of botulinum toxin A, microneedling, hyaluronic acid dermal filler and intense pulsed light',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2022.11.2.50' OR iq.doi = '10.12968/joan.2022.11.2.50'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2016.5.8.392',
  NULLIF('10.12968/joan.2016.5.8.392', ''),
  'Full-body laser hair removal: assessment and effective treatment of an 18-year-old',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2016.5.8.392' OR iq.doi = '10.12968/joan.2016.5.8.392'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2023.12.sup8.s6',
  NULLIF('10.12968/joan.2023.12.sup8.s6', ''),
  'HArmonyCa: a first-in-class, hybrid, dual-functioning hyaluronic acid/calcium hydroxyapatite dermal filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2023.12.sup8.s6' OR iq.doi = '10.12968/joan.2023.12.sup8.s6'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.4.199',
  NULLIF('10.12968/joan.2018.7.4.199', ''),
  'Infection control and skin disinfection prior to injectable aesthetic procedures',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.4.199' OR iq.doi = '10.12968/joan.2018.7.4.199'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.9.436',
  NULLIF('10.12968/joan.2014.3.9.436', ''),
  'Laser facial hair removal protocol and key consultation considerations',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.9.436' OR iq.doi = '10.12968/joan.2014.3.9.436'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2016.5.6.268',
  NULLIF('10.12968/joan.2016.5.6.268', ''),
  'Managing photodamage with topical skincare ingredients and chemical peels',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2016.5.6.268' OR iq.doi = '10.12968/joan.2016.5.6.268'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/jcyn.2008.2.2.28199',
  NULLIF('10.12968/jcyn.2008.2.2.28199', ''),
  'The K Wire Project: removal of percutaneous kirschner wires from children without general anaesthetic',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/jcyn.2008.2.2.28199' OR iq.doi = '10.12968/jcyn.2008.2.2.28199'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2025.0040',
  NULLIF('10.12968/joan.2025.0040', ''),
  'Topical approaches to <i>addressing tissue changes</i> as a result of GLP-1RA and GIP therapies',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2025.0040' OR iq.doi = '10.12968/joan.2025.0040'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2013.2.9.446',
  NULLIF('10.12968/joan.2013.2.9.446', ''),
  'Treatment of a 68-year-old female patient with severe volume loss and deep wrinkles',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2013.2.9.446' OR iq.doi = '10.12968/joan.2013.2.9.446'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2010.00524.x',
  NULLIF('10.1111/j.1473-2165.2010.00524.x', ''),
  'A European evaluation of cosmetic treatment of facial volume loss with Juvéderm™ Voluma™ in patients previously treated with Restylane Sub‐Q™',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2010.00524.x' OR iq.doi = '10.1111/j.1473-2165.2010.00524.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13959',
  NULLIF('10.1111/jocd.13959', ''),
  'Acute isolated trigeminal neuropathy following calcium hydroxylapatite‐based soft tissue filler injection: A case report',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13959' OR iq.doi = '10.1111/jocd.13959'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12980',
  NULLIF('10.1111/jocd.12980', ''),
  'Chinese facial physiognomy and modern day aesthetic practice',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12980' OR iq.doi = '10.1111/jocd.12980'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14927',
  NULLIF('10.1111/jocd.14927', ''),
  'Early experience of a novel approach to body contouring—Combining liposuction with magnetic muscle stimulation for improved aesthetic outcome: A pilot study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14927' OR iq.doi = '10.1111/jocd.14927'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13270',
  NULLIF('10.1111/jocd.13270', ''),
  'Effects of anhydrous gel with TriHex peptides on healing after hybrid laser resurfacing',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13270' OR iq.doi = '10.1111/jocd.13270'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70351',
  NULLIF('10.1111/jocd.70351', ''),
  'Enhancing Skin Rejuvenation: Using of Engineered Exosome Content Treated With Oleuropein and <scp>Fe<sub>3</sub>O<sub>4</sub></scp>@<scp>CQD</scp>/Oleuropein',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70351' OR iq.doi = '10.1111/jocd.70351'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12901',
  NULLIF('10.1111/jocd.12901', ''),
  'External vascular compression by hyaluronic acid filler documented with high‐frequency ultrasound',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12901' OR iq.doi = '10.1111/jocd.12901'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12975',
  NULLIF('10.1111/jocd.12975', ''),
  'First‐ever HSV‐1 recurrence following superficial facial chemical peel after 30‐year latency following neonatal primary infection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12975' OR iq.doi = '10.1111/jocd.12975'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2009.00423.x',
  NULLIF('10.1111/j.1473-2165.2009.00423.x', ''),
  'Hand recontouring with calcium hydroxylapatite (Radiesse)®',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2009.00423.x' OR iq.doi = '10.1111/j.1473-2165.2009.00423.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14689',
  NULLIF('10.1111/jocd.14689', ''),
  'In vivo characterization of the threshold of laser‐induced optical breakdown (LIOB) of a fractional 1064 nm Nd:YAG picosecond laser by optical coherence tomography: A step forward to precision laser therapy',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14689' OR iq.doi = '10.1111/jocd.14689'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15583',
  NULLIF('10.1111/jocd.15583', ''),
  'Infraorbital mass long after dermal filler injection: A report of two cases',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15583' OR iq.doi = '10.1111/jocd.15583'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70199',
  NULLIF('10.1111/jocd.70199', ''),
  'Integrative Rosacea Treatment: Combination of a Low Crosslinked Injectable Hyaluronic Acid Filler With Standard Therapeutical Interventions—An International Real World Case Series',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70199' OR iq.doi = '10.1111/jocd.70199'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16638',
  NULLIF('10.1111/jocd.16638', ''),
  'Microfocused Ultrasound With Visualization Induces Remodeling of Collagen and Elastin Within the Skin',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16638' OR iq.doi = '10.1111/jocd.16638'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2008.00362.x',
  NULLIF('10.1111/j.1473-2165.2008.00362.x', ''),
  'Poly‐<scp>l</scp>‐lactic acid: a perspective from my practice',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2008.00362.x' OR iq.doi = '10.1111/j.1473-2165.2008.00362.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13116',
  NULLIF('10.1111/jocd.13116', ''),
  'Prospective, preclinical comparison of the performance between radiofrequency microneedling and microneedling alone in reversing photoaged skin',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13116' OR iq.doi = '10.1111/jocd.13116'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70626',
  NULLIF('10.1111/jocd.70626', ''),
  'Round Table Discussion: Aesthetic Treatment Considerations for the Perimenopausal & Menopausal Patient',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70626' OR iq.doi = '10.1111/jocd.70626'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12155',
  NULLIF('10.1111/jocd.12155', ''),
  'Temporal fossa defects: techniques for injecting hyaluronic acid filler and complications after hyaluronic acid filler injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12155' OR iq.doi = '10.1111/jocd.12155'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2007.00313.x',
  NULLIF('10.1111/j.1473-2165.2007.00313.x', ''),
  'The latest cosmeceutical approaches for anti‐aging',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2007.00313.x' OR iq.doi = '10.1111/j.1473-2165.2007.00313.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15106',
  NULLIF('10.1111/jocd.15106', ''),
  'Ultrasonographic observation of the masseter muscle after injection of different botulinum toxin type A',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15106' OR iq.doi = '10.1111/jocd.15106'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2009.00465.x',
  NULLIF('10.1111/j.1473-2165.2009.00465.x', ''),
  'Uncommonly reported side effects of hair removal by long pulsed‐alexandrite laser',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2009.00465.x' OR iq.doi = '10.1111/j.1473-2165.2009.00465.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15908',
  NULLIF('10.1111/jocd.15908', ''),
  'Using 3% retinol peeling and cosmeceuticals for the aesthetic wellness of the oncological patient after precautionary endocrine treatment: A case series',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15908' OR iq.doi = '10.1111/jocd.15908'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.12821',
  NULLIF('10.1111/jocd.12821', ''),
  'Whole‐ and partial‐body cryotherapy in aesthetic dermatology: Evaluating a trendy treatment',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.12821' OR iq.doi = '10.1111/jocd.12821'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2017.1342036',
  NULLIF('10.1080/14764172.2017.1342036', ''),
  'A split-face, investigator-blinded comparative study on the efficacy and safety of Q-switched Nd:YAG laser plus microneedling with vitamin C versus Q-switched Nd:YAG laser for the treatment of recalcitrant melasma',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2017.1342036' OR iq.doi = '10.1080/14764172.2017.1342036'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.3109/14764172.2013.764438',
  NULLIF('10.3109/14764172.2013.764438', ''),
  'Assessment of the safety and efficacy of a bipolar multi-frequency radiofrequency device in the treatment of skin laxity',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3109/14764172.2013.764438' OR iq.doi = '10.3109/14764172.2013.764438'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.3109/14764170903480013',
  NULLIF('10.3109/14764170903480013', ''),
  'Dosing, efficacy and safety plus the use of computerized photography for botulinum toxins type A for upper facial lines',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3109/14764170903480013' OR iq.doi = '10.3109/14764170903480013'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2021.2009875',
  NULLIF('10.1080/14764172.2021.2009875', ''),
  'Efficacy & safety of intense pulsed light therapy for unwanted facial hair: a retrospective analysis in skin of color',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2021.2009875' OR iq.doi = '10.1080/14764172.2021.2009875'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.3109/14764172.2012.748199',
  NULLIF('10.3109/14764172.2012.748199', ''),
  'Efficacy and safety of a new superficial chemical peel using alpha-hydroxy acid, vitamin C and oxygen for melasma',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3109/14764172.2012.748199' OR iq.doi = '10.3109/14764172.2012.748199'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.3109/14764172.2015.1039041',
  NULLIF('10.3109/14764172.2015.1039041', ''),
  'Evaluation of safety and efficacy of 980-nm diode laser-assisted lipolysis versus traditional liposuction for submental rejuvenation: A randomized clinical trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3109/14764172.2015.1039041' OR iq.doi = '10.3109/14764172.2015.1039041'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2025.2483703',
  NULLIF('10.1080/14764172.2025.2483703', ''),
  'Evaluation of the safety and efficacy of the thulium 1927 laser in aesthetic health: an integrative review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2025.2483703' OR iq.doi = '10.1080/14764172.2025.2483703'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2017.1358453',
  NULLIF('10.1080/14764172.2017.1358453', ''),
  'Fractional carbon dioxide laser for facial rejuvenation: A prospective study to evaluate the efficacy and the safety',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2017.1358453' OR iq.doi = '10.1080/14764172.2017.1358453'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2026.2617546',
  NULLIF('10.1080/14764172.2026.2617546', ''),
  'Lasers and ultrasound in Aesthetic medicine: a hybrid review of efficacy, safety, and future directions',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2026.2617546' OR iq.doi = '10.1080/14764172.2026.2617546'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2024.2376701',
  NULLIF('10.1080/14764172.2024.2376701', ''),
  'Review of laser and energy-based devices to treat rosacea in skin of color',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2024.2376701' OR iq.doi = '10.1080/14764172.2024.2376701'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2016.1256486',
  NULLIF('10.1080/14764172.2016.1256486', ''),
  'Safety and efficacy of a non-contact radiofrequency device for body contouring in Asians',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2016.1256486' OR iq.doi = '10.1080/14764172.2016.1256486'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2025.2513380',
  NULLIF('10.1080/14764172.2025.2513380', ''),
  'Safety and efficacy of platelet-rich plasma in the treatment of periorbital skin photoaging',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2025.2513380' OR iq.doi = '10.1080/14764172.2025.2513380'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.3109/14764172.2014.910084',
  NULLIF('10.3109/14764172.2014.910084', ''),
  'The safety and efficacy of poly-L-lactic acid on sunken cheeks in Asians',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3109/14764172.2014.910084' OR iq.doi = '10.3109/14764172.2014.910084'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_116_22',
  NULLIF('10.4103/jcas.jcas_116_22', ''),
  'A comparative study on therapeutic efficacy of autologous platelet-rich plasma, autologous platelet-rich fibrin matrix, recombinant human epidermal growth factor, and collagen particles in nonhealing leg ulcers',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_116_22' OR iq.doi = '10.4103/jcas.jcas_116_22'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_1_21',
  NULLIF('10.4103/jcas.jcas_1_21', ''),
  'A randomized comparative study of intralesional tranexemic acid and Kligman’s regimen in Indian patients with melasma',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_1_21' OR iq.doi = '10.4103/jcas.jcas_1_21'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.118410',
  NULLIF('10.4103/0974-2077.118410', ''),
  'A study on fractional erbium glass laser therapy versus chemical peeling for the treatment of melasma in female patients',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.118410' OR iq.doi = '10.4103/0974-2077.118410'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_68_18',
  NULLIF('10.4103/jcas.jcas_68_18', ''),
  'Beware what you inject: Complications of injectables—dermal fillers',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_68_18' OR iq.doi = '10.4103/jcas.jcas_68_18'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.167270',
  NULLIF('10.4103/0974-2077.167270', ''),
  'Comparative efficacy and patient preference of topical anaesthetics in dermatological laser treatments and skin microneedling',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.167270' OR iq.doi = '10.4103/0974-2077.167270'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_3_2025',
  NULLIF('10.25259/jcas_3_2025', ''),
  'Effective management of post-inflammatory hyperpigmentation secondary to para-phenylenediamine contact allergic dermatitis using 755-nm alexandrite picosecond laser',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_3_2025' OR iq.doi = '10.25259/jcas_3_2025'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.167259',
  NULLIF('10.4103/0974-2077.167259', ''),
  'Ethics in aesthetic surgery: Rituals and realities',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.167259' OR iq.doi = '10.4103/0974-2077.167259'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.158447',
  NULLIF('10.4103/0974-2077.158447', ''),
  'How I manage complications in aesthetic surgery',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.158447' OR iq.doi = '10.4103/0974-2077.158447'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_68_21',
  NULLIF('10.4103/jcas.jcas_68_21', ''),
  'Incobotulinum toxin A with a one-year long-lasting effect for trapezius contouring and superior efficacy for the treatment of trapezius myalgia',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_68_21' OR iq.doi = '10.4103/jcas.jcas_68_21'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.167284',
  NULLIF('10.4103/0974-2077.167284', ''),
  'Informed consent in aesthetic surgery',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.167284' OR iq.doi = '10.4103/0974-2077.167284'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.41159',
  NULLIF('10.4103/0974-2077.41159', ''),
  'Informed consent: An ethical obligation or legal compulsion?',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.41159' OR iq.doi = '10.4103/0974-2077.41159'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_129_18',
  NULLIF('10.4103/jcas.jcas_129_18', ''),
  'Management of delayed skin necrosis following hyaluronic acid filler injection using pulsed hyaluronidase',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_129_18' OR iq.doi = '10.4103/jcas.jcas_129_18'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_40_21',
  NULLIF('10.4103/jcas.jcas_40_21', ''),
  'Platelet-rich fibrin versus platelet-rich plasma: A study to assess efficacy as a regenerative medicine strategy for chronic cutaneous ulcers',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_40_21' OR iq.doi = '10.4103/jcas.jcas_40_21'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_42_2024',
  NULLIF('10.25259/jcas_42_2024', ''),
  'Platelet-rich plasma and topical minoxidil 5% in the treatment of severe alopecia areata: Report of two cases',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_42_2024' OR iq.doi = '10.25259/jcas_42_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_50_23',
  NULLIF('10.4103/jcas.jcas_50_23', ''),
  'Recurrent lymphangioma circumscriptum: Treated with microneedling radiofrequency and topical sirolimus',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_50_23' OR iq.doi = '10.4103/jcas.jcas_50_23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_4_18',
  NULLIF('10.4103/jcas.jcas_4_18', ''),
  'Resurfacing of facial acne scars with a new variable-pulsed Er:YAG laser in Fitzpatrick skin types IV and V',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_4_18' OR iq.doi = '10.4103/jcas.jcas_4_18'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.150742',
  NULLIF('10.4103/0974-2077.150742', ''),
  'Split face comparative study of microneedling with PRP versus microneedling with vitamin C in treating atrophic post acne scars',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.150742' OR iq.doi = '10.4103/0974-2077.150742'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.155104',
  NULLIF('10.4103/0974-2077.155104', ''),
  'Split face comparative study of microneedling with prp versus microneedling with vitamin c in treating atrophic post acne scars: Erratum',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.155104' OR iq.doi = '10.4103/0974-2077.155104'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.63396',
  NULLIF('10.4103/0974-2077.63396', ''),
  'The ethics of aesthetic surgery',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.63396' OR iq.doi = '10.4103/0974-2077.63396'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.58518',
  NULLIF('10.4103/0974-2077.58518', ''),
  'The need for evidence-based aesthetic dermatology practice',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.58518' OR iq.doi = '10.4103/0974-2077.58518'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_97_18',
  NULLIF('10.4103/jcas.jcas_97_18', ''),
  'Unconventional uses of laser hair removal: A review',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_97_18' OR iq.doi = '10.4103/jcas.jcas_97_18'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2020.152',
  NULLIF('10.20517/2347-9264.2020.152', ''),
  'A review of nonsurgical facial rejuvenation',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2020.152' OR iq.doi = '10.20517/2347-9264.2020.152'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.4103/2347-9264.143563',
  NULLIF('10.4103/2347-9264.143563', ''),
  'A unique late complication with the use of calcium hydroxylapatite filler in facial lipoatrophy rehabilitation',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/2347-9264.143563' OR iq.doi = '10.4103/2347-9264.143563'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.4103/2347-9264.139703',
  NULLIF('10.4103/2347-9264.139703', ''),
  'Efficacy of autologous platelet-rich plasma in the treatment of chronic nonhealing leg ulcers',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/2347-9264.139703' OR iq.doi = '10.4103/2347-9264.139703'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2017.06',
  NULLIF('10.20517/2347-9264.2017.06', ''),
  'Management of complications of Medpor® implants in rhinoplasty',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2017.06' OR iq.doi = '10.20517/2347-9264.2017.06'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.4103/2347-9264.149366',
  NULLIF('10.4103/2347-9264.149366', ''),
  'Patient-centric dose equivalency pilot study of incobotulinumtoxin a (xeomin) vs. abobotulinumtoxin a (dysport) in the treatment of glabellar frown lines',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/2347-9264.149366' OR iq.doi = '10.4103/2347-9264.149366'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2020.187',
  NULLIF('10.20517/2347-9264.2020.187', ''),
  'Sternohyoid muscles plication and sternocleidomastoid muscles rejuvenation in neck lift: a retrospective study of 1,019 consecutive patients',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2020.187' OR iq.doi = '10.20517/2347-9264.2020.187'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2021.67',
  NULLIF('10.20517/2347-9264.2021.67', ''),
  'Surgical circumferential contouring: lower body, upper body, and in-between',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2021.67' OR iq.doi = '10.20517/2347-9264.2021.67'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sju120',
  NULLIF('10.1093/asj/sju120', ''),
  'A Complication of Management of Closed Incision with Negative-Pressure Wound Therapy',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sju120' OR iq.doi = '10.1093/asj/sju120'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjx085',
  NULLIF('10.1093/asj/sjx085', ''),
  'A Histopathologic Diagnosis of Vascular Occlusion After Injection of Hyaluronic Acid Filler: Findings of Intravascular Foreign Body and Skin Necrosis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjx085' OR iq.doi = '10.1093/asj/sjx085'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1016/j.asj.2004.11.004',
  NULLIF('10.1016/j.asj.2004.11.004', ''),
  'Bilateral pneumothoraces: A rarely described complication following augmentation mammaplasty',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2004.11.004' OR iq.doi = '10.1016/j.asj.2004.11.004'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjag077',
  NULLIF('10.1093/asj/sjag077', ''),
  'Body Contouring After Weight Loss: Bariatric Surgery, Glucagon-like Peptide-1 Therapy, and Lifestyle Impacts on Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjag077' OR iq.doi = '10.1093/asj/sjag077'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x10396702',
  NULLIF('10.1177/1090820x10396702', ''),
  'Book Review: Aesthetic Breast Surgery (Techniques in Aesthetic Plastic Surgery Series)',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x10396702' OR iq.doi = '10.1177/1090820x10396702'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x11410968',
  NULLIF('10.1177/1090820x11410968', ''),
  'Book Review: Aesthetic Plastic Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x11410968' OR iq.doi = '10.1177/1090820x11410968'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x12452299',
  NULLIF('10.1177/1090820x12452299', ''),
  'Book Review: Color Atlas of Cosmetic Dermatology',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x12452299' OR iq.doi = '10.1177/1090820x12452299'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x12438096',
  NULLIF('10.1177/1090820x12438096', ''),
  'Book Review: Minimally-Invasive Facial Rejuvenation (Techniques in Aesthetic Plastic Surgery Series)',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x12438096' OR iq.doi = '10.1177/1090820x12438096'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x11421907',
  NULLIF('10.1177/1090820x11421907', ''),
  'Book Review: Pictorial Atlas of Botulinum Toxin Injection: Dosage, Localization, Application',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x11421907' OR iq.doi = '10.1177/1090820x11421907'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjz139',
  NULLIF('10.1093/asj/sjz139', ''),
  'Commentary on: Conventional Nanofat and SVF/ADSC-Concentrated Nanofat: A Comparative Study on Improving Photoaging of Nude Mice Skin',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz139' OR iq.doi = '10.1093/asj/sjz139'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjae016',
  NULLIF('10.1093/asj/sjae016', ''),
  'Commentary on: Developing the Aesthetic Postoperative Complication Score (APeCS) for Detecting Major Morbidity in Facial Aesthetic Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae016' OR iq.doi = '10.1093/asj/sjae016'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjac140',
  NULLIF('10.1093/asj/sjac140', ''),
  'Commentary on: Efficacy and Tolerability of a Microneedling Device for Treating Wrinkles on the Neck',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac140' OR iq.doi = '10.1093/asj/sjac140'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaa263',
  NULLIF('10.1093/asj/sjaa263', ''),
  'Commentary on: Enhancing the Lateral Orbital “C-Angle” With Calcium Hydroxylapatite: An Anatomic and Clinical Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa263' OR iq.doi = '10.1093/asj/sjaa263'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab020',
  NULLIF('10.1093/asj/sjab020', ''),
  'Commentary on: Intraarterial Degradation of Calcium Hydroxylapatite Using Sodium Thiosulfate—An In Vitro and Cadaveric Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab020' OR iq.doi = '10.1093/asj/sjab020'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaa390',
  NULLIF('10.1093/asj/sjaa390', ''),
  'Commentary on: Lessons Learned from Twenty-Eight Cases of Burns Following Breast Reconstruction: An Underestimated Complication Requiring Inclusion in Consent Information',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa390' OR iq.doi = '10.1093/asj/sjaa390'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad076',
  NULLIF('10.1093/asj/sjad076', ''),
  'Commentary on: Management of Severe Botulinum-Induced Eyelid Ptosis With Pretarsal Botulinum Toxin and Oxymetazoline Hydrochloride 0.1%',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad076' OR iq.doi = '10.1093/asj/sjad076'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjz331',
  NULLIF('10.1093/asj/sjz331', ''),
  'Commentary on: Multicenter Efficacy Trial of a Percutaneous Radiofrequency System for the Reduction of Glabellar Lines',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz331' OR iq.doi = '10.1093/asj/sjz331'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x12441619',
  NULLIF('10.1177/1090820x12441619', ''),
  'Commentary on: Outpatient-Based Massive Weight Loss Body Contouring: A Review of 260 Consecutive Cases',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x12441619' OR iq.doi = '10.1177/1090820x12441619'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x12441620',
  NULLIF('10.1177/1090820x12441620', ''),
  'Commentary on: Outpatient-Based Massive Weight Loss Body Contouring: A Review of 260 Consecutive Cases',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x12441620' OR iq.doi = '10.1177/1090820x12441620'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjx167',
  NULLIF('10.1093/asj/sjx167', ''),
  'Commentary on: Paradoxical Adipose Hypertrophy (PAH) After Cryolipolysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjx167' OR iq.doi = '10.1093/asj/sjx167'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaa047',
  NULLIF('10.1093/asj/sjaa047', ''),
  'Commentary on: Pneumothorax as a Complication of Liposuction',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa047' OR iq.doi = '10.1093/asj/sjaa047'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab131',
  NULLIF('10.1093/asj/sjab131', ''),
  'Commentary on: Temperature-Controlled Monopolar Radiofrequency in the Treatment of Submental Skin Laxity: A Prospective Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab131' OR iq.doi = '10.1093/asj/sjab131'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjad224',
  NULLIF('10.1093/asj/sjad224', ''),
  'Commentary on: Use of LetibotulinumtoxinA for Aesthetic Treatment of Asians: A Consensus',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjad224' OR iq.doi = '10.1093/asj/sjad224'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjy129',
  NULLIF('10.1093/asj/sjy129', ''),
  'Comments on “Paradoxical Adipose Hypertrophy (PAH) After Cryolipolysis”',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjy129' OR iq.doi = '10.1093/asj/sjy129'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1016/j.asj.2006.04.004',
  NULLIF('10.1016/j.asj.2006.04.004', ''),
  'Complication following suspected intra-arterial injection of Restylane',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2006.04.004' OR iq.doi = '10.1016/j.asj.2006.04.004'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x13480479',
  NULLIF('10.1177/1090820x13480479', ''),
  'Consensus Panel''s Assessment and Recommendations on the Use of 3 Botulinum Toxin Type A Products in Facial Aesthetics',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x13480479' OR iq.doi = '10.1177/1090820x13480479'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x10369155',
  NULLIF('10.1177/1090820x10369155', ''),
  'Cosmetic Dermatology for Skin of Color',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x10369155' OR iq.doi = '10.1177/1090820x10369155'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x13479970',
  NULLIF('10.1177/1090820x13479970', ''),
  'Dynamic Diagnosis of "Fishmouthing" Syndrome, an Overlooked Complication of Blepharoplasty',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x13479970' OR iq.doi = '10.1177/1090820x13479970'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x10391083',
  NULLIF('10.1177/1090820x10391083', ''),
  'Etiology, Prevention, and Treatment of Dermal Filler Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x10391083' OR iq.doi = '10.1177/1090820x10391083'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjy133',
  NULLIF('10.1093/asj/sjy133', ''),
  'Evidence-Based Body Contouring Surgery and VTE Prevention',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjy133' OR iq.doi = '10.1093/asj/sjy133'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x10390924',
  NULLIF('10.1177/1090820x10390924', ''),
  'Evidence-Based Medicine in Aesthetic Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x10390924' OR iq.doi = '10.1177/1090820x10390924'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab430',
  NULLIF('10.1093/asj/sjab430', ''),
  'Human Subject Research in Plastic Surgery: Insights Into Informed Consent Requirements and Obtaining IRB Approval',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab430' OR iq.doi = '10.1093/asj/sjab430'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjab271',
  NULLIF('10.1093/asj/sjab271', ''),
  'Impact of a Devastating Patient Complication on the Aesthetic Plastic Surgeon',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab271' OR iq.doi = '10.1093/asj/sjab271'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaa086',
  NULLIF('10.1093/asj/sjaa086', ''),
  'Incidence of Vascular Obstruction After Filler Injections',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa086' OR iq.doi = '10.1093/asj/sjaa086'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x12455430',
  NULLIF('10.1177/1090820x12455430', ''),
  'Introduction to: Current Aesthetic Use of AbobotulinumtoxinA in Clinical Practice: An Evidence-Based Consensus Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x12455430' OR iq.doi = '10.1177/1090820x12455430'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1016/j.asj.2004.07.007',
  NULLIF('10.1016/j.asj.2004.07.007', ''),
  'Lactation: a rare, late complication of augmentation mammaplasty',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2004.07.007' OR iq.doi = '10.1016/j.asj.2004.07.007'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1016/s1090-820x(96)70076-6',
  NULLIF('10.1016/s1090-820x(96)70076-6', ''),
  'Laser Resurfacing: Pretreatment and Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/s1090-820x(96)70076-6' OR iq.doi = '10.1016/s1090-820x(96)70076-6'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjx138',
  NULLIF('10.1093/asj/sjx138', ''),
  'Nonsurgical Vulvovaginal Rejuvenation With Radiofrequency and Laser Devices: A Literature Review and Comprehensive Update for Aesthetic Surgeons',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjx138' OR iq.doi = '10.1093/asj/sjx138'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf229',
  NULLIF('10.1093/asj/sjaf229', ''),
  'Optimizing Cannula Selection for Filler Injection in Accordance With Vascular Anatomy, Injection Technique, and Cannula Design',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf229' OR iq.doi = '10.1093/asj/sjaf229'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x12441618',
  NULLIF('10.1177/1090820x12441618', ''),
  'Outpatient-Based Massive Weight Loss Body Contouring: A Review of 260 Consecutive Cases',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x12441618' OR iq.doi = '10.1177/1090820x12441618'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjx159',
  NULLIF('10.1093/asj/sjx159', ''),
  'Paradoxical Adipose Hypertrophy (PAH) After Cryolipolysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjx159' OR iq.doi = '10.1093/asj/sjx159'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1177/1090820x10369917',
  NULLIF('10.1177/1090820x10369917', ''),
  'Pneumocephalus as a Complication After Facelift Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x10369917' OR iq.doi = '10.1177/1090820x10369917'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1016/j.asj.2008.06.005',
  NULLIF('10.1016/j.asj.2008.06.005', ''),
  'Poly-L-Lactic Acid Injection for HIV-Associated Facial Lipoatrophy: Treatment Principles, Case Studies, and Literature Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2008.06.005' OR iq.doi = '10.1016/j.asj.2008.06.005'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjaf008',
  NULLIF('10.1093/asj/sjaf008', ''),
  'Reevaluating Semaglutide in Postbariatric Contouring Surgery: The Role of Undermined Immune Response and Nutritional Deficiency in Wound Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf008' OR iq.doi = '10.1093/asj/sjaf008'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjag022',
  NULLIF('10.1093/asj/sjag022', ''),
  'Reframing Hyaluronidase in Aesthetic Medicine: From “Dissolving Filler” to “Modifying Filler”',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjag022' OR iq.doi = '10.1093/asj/sjag022'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjag104',
  NULLIF('10.1093/asj/sjag104', ''),
  'Response to: Body Contouring After Weight Loss: Bariatric Surgery, Glucagon-Like Peptide-1 Therapy and Lifestyle Impacts on Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjag104' OR iq.doi = '10.1093/asj/sjag104'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjag086',
  NULLIF('10.1093/asj/sjag086', ''),
  'Response to: Optimizing Cannula Selection for Filler Injection in Accordance With Vascular Anatomy, Injection Technique, and Cannula Design',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjag086' OR iq.doi = '10.1093/asj/sjag086'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sju063',
  NULLIF('10.1093/asj/sju063', ''),
  'The Evidence Behind Noninvasive Body Contouring Devices',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sju063' OR iq.doi = '10.1093/asj/sju063'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1093/asj/sjx053',
  NULLIF('10.1093/asj/sjx053', ''),
  'The Vast Majority of Aesthetic Surgery Patients are at Low Risk for Venous Thromboembolism and Do Not Require Chemical Prophylaxis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjx053' OR iq.doi = '10.1093/asj/sjx053'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1067/maj.2000.107268',
  NULLIF('10.1067/maj.2000.107268', ''),
  'The patient'' right to self-determination: complexities of informed consent',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1067/maj.2000.107268' OR iq.doi = '10.1067/maj.2000.107268'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal'),
  'https://doi.org/10.1067/maj.2000.104962',
  NULLIF('10.1067/maj.2000.104962', ''),
  'Using computer imaging as an informed consent tool',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1067/maj.2000.104962' OR iq.doi = '10.1067/maj.2000.104962'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s398547',
  NULLIF('10.2147/ccid.s398547', ''),
  '(–)-Epigallocatechin-3-Gallate Protects Human Skin Fibroblasts from Ultraviolet a Induced Photoaging',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s398547' OR iq.doi = '10.2147/ccid.s398547'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s323872',
  NULLIF('10.2147/ccid.s323872', ''),
  '755-nm Alexandrite Picosecond Laser with a Diffractive Lens Array or Zoom Handpiece for Post-Inflammatory Hyperpigmentation: Two Case Reports with a Three-Year Follow-Up',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s323872' OR iq.doi = '10.2147/ccid.s323872'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s198081',
  NULLIF('10.2147/ccid.s198081', ''),
  '<p>Delayed hypersensitivity reaction to hyaluronic acid dermal filler following influenza-like illness</p>',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s198081' OR iq.doi = '10.2147/ccid.s198081'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s218176',
  NULLIF('10.2147/ccid.s218176', ''),
  '<p>Long-term objective assessments of skin rejuvenation using solar protection and solar repair shown through digital facial surface analysis and three-dimensional volumetric assessment</p>',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s218176' OR iq.doi = '10.2147/ccid.s218176'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s212599',
  NULLIF('10.2147/ccid.s212599', ''),
  '<p>Multilayered injection of calcium hydroxylapatite filler on ischial soft tissue to rejuvenate the previous phase of chronic sitting pressure sore</p>',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s212599' OR iq.doi = '10.2147/ccid.s212599'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s425797',
  NULLIF('10.2147/ccid.s425797', ''),
  'A Cluster Validity Index-Based Objective Criteria for Aesthetic Evaluation of Periorbital Treatment',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s425797' OR iq.doi = '10.2147/ccid.s425797'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s445751',
  NULLIF('10.2147/ccid.s445751', ''),
  'A Dermocosmetic Significantly Reduces the Frequency and Intensity of Facial Skin Intolerability and Sensitivity in Subjects with Skin Intolerant to Skin Care Products and Sensitive Skin [Corrigendum]',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s445751' OR iq.doi = '10.2147/ccid.s445751'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s155023',
  NULLIF('10.2147/ccid.s155023', ''),
  'A comparative trial of ice application versus EMLA cream in alleviation of pain during botulinum toxin injections for palmar hyperhidrosis',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s155023' OR iq.doi = '10.2147/ccid.s155023'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s305976',
  NULLIF('10.2147/ccid.s305976', ''),
  'Aesthetic Delusions: An Investigation into the Role of Rapid Visual Adaptation in Aesthetic Practice',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s305976' OR iq.doi = '10.2147/ccid.s305976'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s583396',
  NULLIF('10.2147/ccid.s583396', ''),
  'Aesthetic Medicine and Perceptual Distortion: The Role of Professional Aesthetic Drift',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s583396' OR iq.doi = '10.2147/ccid.s583396'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s571951',
  NULLIF('10.2147/ccid.s571951', ''),
  'Antioxidative and Regenerative Potential of Sea Cucumber: Focus on Bioactive Compounds and Exosome-Based Strategies for Combating Skin Oxidative Stress',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s571951' OR iq.doi = '10.2147/ccid.s571951'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s406173',
  NULLIF('10.2147/ccid.s406173', ''),
  'Assessing the Rejuvenation Effectiveness of a Hyaluronic Acid and Amino Acid Mixture in the Periorbital Region',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s406173' OR iq.doi = '10.2147/ccid.s406173'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s405639',
  NULLIF('10.2147/ccid.s405639', ''),
  'Assessment and Treatment Strategies for the Aesthetic Improvement of the Lower Face and Neck',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s405639' OR iq.doi = '10.2147/ccid.s405639'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s177448',
  NULLIF('10.2147/ccid.s177448', ''),
  'Beyond photoaging: additional factors involved in the process of skin aging',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s177448' OR iq.doi = '10.2147/ccid.s177448'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s543045',
  NULLIF('10.2147/ccid.s543045', ''),
  'Beyond the Algorithm: A Perspective on Tackling Bias and Cultural Sensitivity in AI-Guided Aesthetic Standards for Cosmetic Surgery in the Middle East and North Africa (MENA) Region',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s543045' OR iq.doi = '10.2147/ccid.s543045'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s156851',
  NULLIF('10.2147/ccid.s156851', ''),
  'Botulinum neurotoxin formulations: overcoming the confusion',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s156851' OR iq.doi = '10.2147/ccid.s156851'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s5482',
  NULLIF('10.2147/ccid.s5482', ''),
  'Botulinum toxin type-A in the treatment of glabellar lines',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s5482' OR iq.doi = '10.2147/ccid.s5482'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s363321',
  NULLIF('10.2147/ccid.s363321', ''),
  'Causes of Botulinum Toxin Treatment Failure',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s363321' OR iq.doi = '10.2147/ccid.s363321'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s296970',
  NULLIF('10.2147/ccid.s296970', ''),
  'Characteristics of Patients Seeking and Proceeding with Non-Surgical Facial Aesthetic Procedures',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s296970' OR iq.doi = '10.2147/ccid.s296970'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s402409',
  NULLIF('10.2147/ccid.s402409', ''),
  'Clinical and Ultrasound Evaluation of Skin Quality After Subdermal Injection of Two Non-Crosslinked Hyaluronic Acid-Based Fillers',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s402409' OR iq.doi = '10.2147/ccid.s402409'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s400605',
  NULLIF('10.2147/ccid.s400605', ''),
  'Contouring Plus: A Comprehensive Approach of the Lower Third of the Face with Calcium Hydroxylapatite and Hyaluronic Acid',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s400605' OR iq.doi = '10.2147/ccid.s400605'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s97573',
  NULLIF('10.2147/ccid.s97573', ''),
  'Cosmeceutical product consisting of biomimetic peptides: antiaging effects in vivo and in vitro',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s97573' OR iq.doi = '10.2147/ccid.s97573'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s146258',
  NULLIF('10.2147/ccid.s146258', ''),
  'Cryolipolysis: patient selection and special considerations',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s146258' OR iq.doi = '10.2147/ccid.s146258'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s458750',
  NULLIF('10.2147/ccid.s458750', ''),
  'Delayed Inflammatory Reaction to Hyaluronic Acid Dermal Filler Following Zoledronic Acid Administration: A Case Report',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s458750' OR iq.doi = '10.2147/ccid.s458750'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s398014',
  NULLIF('10.2147/ccid.s398014', ''),
  'Displacement of Hyaluronic Acid Dermal Filler Mimicking a Cutaneous Tumor: A Case Report',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s398014' OR iq.doi = '10.2147/ccid.s398014'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s523936',
  NULLIF('10.2147/ccid.s523936', ''),
  'Effects of Exosomes From Hypoxia-Induced Adipose-Derived Stem Cells on Ameliorating Photoaging',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s523936' OR iq.doi = '10.2147/ccid.s523936'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s310487',
  NULLIF('10.2147/ccid.s310487', ''),
  'Effects of UV Induced-Photoaging on the Hair Follicle Cycle of C57BL6/J Mice',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s310487' OR iq.doi = '10.2147/ccid.s310487'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s46650',
  NULLIF('10.2147/ccid.s46650', ''),
  'Emerging permanent filler technologies: focus on Aquamid',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s46650' OR iq.doi = '10.2147/ccid.s46650'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s461753',
  NULLIF('10.2147/ccid.s461753', ''),
  'Ex vivo Evaluation of a Liposome-Mediated Antioxidant Delivery System on Markers of Skin Photoaging and Skin Penetration',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s461753' OR iq.doi = '10.2147/ccid.s461753'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s88443',
  NULLIF('10.2147/ccid.s88443', ''),
  'Facial primer provides immediate and long-term improvements in mild-to-moderate facial hyperpigmentation and fine lines associated with photoaging',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s88443' OR iq.doi = '10.2147/ccid.s88443'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s415467',
  NULLIF('10.2147/ccid.s415467', ''),
  'Fat Compartment Gliding Theory – A Novel Technique for the Repositioning of Superficial Fat Compartments for Facial Rejuvenation',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s415467' OR iq.doi = '10.2147/ccid.s415467'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s147413',
  NULLIF('10.2147/ccid.s147413', ''),
  'Fractional erbium-doped yttrium aluminum garnet laser-assisted drug delivery of hydroquinone in the treatment of melasma',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s147413' OR iq.doi = '10.2147/ccid.s147413'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s457145',
  NULLIF('10.2147/ccid.s457145', ''),
  'High-Intensity Focused Ultrasound Enhances Drug Penetration into the Human Skin in the Franz Diffusion Cell',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s457145' OR iq.doi = '10.2147/ccid.s457145'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s312198',
  NULLIF('10.2147/ccid.s312198', ''),
  'Immediate nor Delayed Type Hypersensitivity Plays a Role in Late Inflammatory Reactions After Hyaluronic Acid Filler Injections',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s312198' OR iq.doi = '10.2147/ccid.s312198'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s353878',
  NULLIF('10.2147/ccid.s353878', ''),
  'Individualized Treatment Algorithm Using Hyaluronic Acid Fillers for Lifting, Contouring and Volumizing the Midface',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s353878' OR iq.doi = '10.2147/ccid.s353878'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s189595',
  NULLIF('10.2147/ccid.s189595', ''),
  'Maximizing botulinum toxin injections for cosmetic and therapeutic applications with a single use, disposable, exact dose injection assist device',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s189595' OR iq.doi = '10.2147/ccid.s189595'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s538326',
  NULLIF('10.2147/ccid.s538326', ''),
  'Mechanisms and Therapeutic Roles of Medicinal Plants in Skin Photoaging',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s538326' OR iq.doi = '10.2147/ccid.s538326'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s533425',
  NULLIF('10.2147/ccid.s533425', ''),
  'Micro-Focused Ultrasound on an Individual with Titanium Facial Implants: A Case Report',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s533425' OR iq.doi = '10.2147/ccid.s533425'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s331354',
  NULLIF('10.2147/ccid.s331354', ''),
  'Microfocused Ultrasound with Visualization for Face Slimming: Preliminary Results in Four Women',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s331354' OR iq.doi = '10.2147/ccid.s331354'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s267192',
  NULLIF('10.2147/ccid.s267192', ''),
  'Microneedling for the Treatment of Scars: An Update for Clinicians',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s267192' OR iq.doi = '10.2147/ccid.s267192'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s17467',
  NULLIF('10.2147/ccid.s17467', ''),
  'Minimally invasive aesthetic procedures in young adults',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s17467' OR iq.doi = '10.2147/ccid.s17467'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s476362',
  NULLIF('10.2147/ccid.s476362', ''),
  'Mitigating Glycation and Oxidative Stress in Aesthetic Medicine: Hyaluronic Acid and Trehalose Synergy for Anti-AGEs Action in Skin Aging Treatment',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s476362' OR iq.doi = '10.2147/ccid.s476362'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s51938',
  NULLIF('10.2147/ccid.s51938', ''),
  'Neutralizing antibodies to botulinum neurotoxin type A in aesthetic medicine: five case reports',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s51938' OR iq.doi = '10.2147/ccid.s51938'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s69118',
  NULLIF('10.2147/ccid.s69118', ''),
  'Noninvasive skin tightening: focus on new ultrasound techniques',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s69118' OR iq.doi = '10.2147/ccid.s69118'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s385202',
  NULLIF('10.2147/ccid.s385202', ''),
  'Objective Assessment of the Long-Term Volumizing Action of a Polycaprolactone-Based Filler',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s385202' OR iq.doi = '10.2147/ccid.s385202'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s22841',
  NULLIF('10.2147/ccid.s22841', ''),
  'Objective assessment of skin rejuvenation using near-infrared 1064-nm neodymium: YAG laser in Asians',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s22841' OR iq.doi = '10.2147/ccid.s22841'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s367001',
  NULLIF('10.2147/ccid.s367001', ''),
  'Perceived Stress and Interest in Non-Invasive Aesthetic Procedures During the COVID-19 Pandemic',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s367001' OR iq.doi = '10.2147/ccid.s367001'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s511665',
  NULLIF('10.2147/ccid.s511665', ''),
  'Personality Traits and Motivations of Chinese Adults Seeking Cosmetic Botulinum Toxin Injection',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s511665' OR iq.doi = '10.2147/ccid.s511665'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s77996',
  NULLIF('10.2147/ccid.s77996', ''),
  'Photoaging and the clinical utility of fractional laser',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s77996' OR iq.doi = '10.2147/ccid.s77996'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s437942',
  NULLIF('10.2147/ccid.s437942', ''),
  'Polynucleotides HPT for Asian Skin Regeneration and Rejuvenation',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s437942' OR iq.doi = '10.2147/ccid.s437942'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s484236',
  NULLIF('10.2147/ccid.s484236', ''),
  'Potential Role of Tranexamic Acid in Rosacea Treatment: Conquering Flushing Beyond Melasma [Corrigendum]',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s484236' OR iq.doi = '10.2147/ccid.s484236'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s473598',
  NULLIF('10.2147/ccid.s473598', ''),
  'Potential Role of Tranexamic Acid in Rosacea Treatment: conquering Flushing Beyond Melasma',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s473598' OR iq.doi = '10.2147/ccid.s473598'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s350556',
  NULLIF('10.2147/ccid.s350556', ''),
  'Quantified Facial Rejuvenation Utilizing High Intense Focus Ultrasound with Multiple Penetrative Depths',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s350556' OR iq.doi = '10.2147/ccid.s350556'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s337487',
  NULLIF('10.2147/ccid.s337487', ''),
  'Quantitative Assessment of the Cryolipolysis Method for Body Contouring in Asian Patients',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s337487' OR iq.doi = '10.2147/ccid.s337487'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s50367',
  NULLIF('10.2147/ccid.s50367', ''),
  'Skin resurfacing procedures: new and emerging options',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s50367' OR iq.doi = '10.2147/ccid.s50367'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s323748',
  NULLIF('10.2147/ccid.s323748', ''),
  'The Application of Skin Care Product in Melasma Treatment',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s323748' OR iq.doi = '10.2147/ccid.s323748'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s332265',
  NULLIF('10.2147/ccid.s332265', ''),
  'The Picosecond Laser Effects on Tattoo Removal and Metabolic Pathways',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s332265' OR iq.doi = '10.2147/ccid.s332265'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s30794',
  NULLIF('10.2147/ccid.s30794', ''),
  'The evolving role of hyaluronic acid fillers for facial volume restoration and contouring: a Canadian overview',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s30794' OR iq.doi = '10.2147/ccid.s30794'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s125580',
  NULLIF('10.2147/ccid.s125580', ''),
  'The role of inflammation in adipocytolytic nonsurgical esthetic procedures for body contouring',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s125580' OR iq.doi = '10.2147/ccid.s125580'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s479411',
  NULLIF('10.2147/ccid.s479411', ''),
  'Tranexamic Acid for the Treatment of Hyperpigmentation and Telangiectatic Disorders Other Than Melasma: An Update',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s479411' OR iq.doi = '10.2147/ccid.s479411'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s565211',
  NULLIF('10.2147/ccid.s565211', ''),
  'Treatment for Filler-Induced Alopecia with Concentrated Growth Factors',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s565211' OR iq.doi = '10.2147/ccid.s565211'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s468447',
  NULLIF('10.2147/ccid.s468447', ''),
  'Treatment of Mid-Face Aging with Calcium Hydroxylapatite: Focus on Retaining Ligament Support',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s468447' OR iq.doi = '10.2147/ccid.s468447'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s181964',
  NULLIF('10.2147/ccid.s181964', ''),
  'Treatment of facial lipoatrophy, morphological asymmetry, or debilitating scars with the hyaluronic acid dermal filler Princess<sup>&reg;</sup>&nbsp;FILLER',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s181964' OR iq.doi = '10.2147/ccid.s181964'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s9422',
  NULLIF('10.2147/ccid.s9422', ''),
  'Treatment of facial rejuvenation with fat restoration',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s9422' OR iq.doi = '10.2147/ccid.s9422'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology'),
  'https://doi.org/10.2147/ccid.s332247',
  NULLIF('10.2147/ccid.s332247', ''),
  'Utilities of Botulinum Toxins in Dermatology and Cosmetology',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2147/ccid.s332247' OR iq.doi = '10.2147/ccid.s332247'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics7020033',
  NULLIF('10.3390/cosmetics7020033', ''),
  'Biotechnology Applied to Cosmetics and Aesthetic Medicines',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics7020033' OR iq.doi = '10.3390/cosmetics7020033'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics11050175',
  NULLIF('10.3390/cosmetics11050175', ''),
  'Evaluation of the Effectiveness of Injections of Autologous Platelet-Rich Plasma into Facial Skin',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics11050175' OR iq.doi = '10.3390/cosmetics11050175'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetics'),
  'https://doi.org/10.3390/cosmetics7040097',
  NULLIF('10.3390/cosmetics7040097', ''),
  'Special Issue “Exercise-Induced Facial Rejuvenation and Orofacial Strength and Function”',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/cosmetics7040097' OR iq.doi = '10.3390/cosmetics7040097'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.2310/6350.2005.31303',
  NULLIF('10.2310/6350.2005.31303', ''),
  'A Comparison of Two Botulinum Type A Toxin Preparations for the Treatment of Glabellar Lines: Double-Blind, Randomized, Pilot Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2310/6350.2005.31303' OR iq.doi = '10.2310/6350.2005.31303'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2009.01063.x',
  NULLIF('10.1111/j.1524-4725.2009.01063.x', ''),
  'A Four-Month Randomized, Double-Blind Evaluation of the Efficacy of Botulinum Toxin Type A for the Treatment of Glabellar Lines in Women with Skin Types V and VI',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2009.01063.x' OR iq.doi = '10.1111/j.1524-4725.2009.01063.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003584',
  NULLIF('10.1097/dss.0000000000003584', ''),
  'A New Technique to Decrease the Risk of Forehead Ecchymosis Following Facial Neuromodulator Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003584' OR iq.doi = '10.1097/dss.0000000000003584'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2006.32332.x',
  NULLIF('10.1111/j.1524-4725.2006.32332.x', ''),
  'A Randomized, Double‐Blind, Placebo‐Controlled Study of Botulinum Toxin Type A for the Treatment of Glabellar Lines',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2006.32332.x' OR iq.doi = '10.1111/j.1524-4725.2006.32332.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000209',
  NULLIF('10.1097/dss.0000000000000209', ''),
  'A Review of the Aesthetic Treatment of Abdominal Subcutaneous Adipose Tissue',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000209' OR iq.doi = '10.1097/dss.0000000000000209'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001317',
  NULLIF('10.1097/dss.0000000000001317', ''),
  'ATX-101 (Deoxycholic Acid Injection) for Paradoxical Adipose Hyperplasia Secondary to Cryolipolysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001317' OR iq.doi = '10.1097/dss.0000000000001317'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003243',
  NULLIF('10.1097/dss.0000000000003243', ''),
  'Acute Vascular Compromise of the Ophthalmic Cutaneous Angiosome After Accidental Self-injection of Hyaluronic Acid Filler Into the Superficial Temporal Artery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003243' OR iq.doi = '10.1097/dss.0000000000003243'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2009.01348.x',
  NULLIF('10.1111/j.1524-4725.2009.01348.x', ''),
  'Advanced Laser Techniques for Filler-Induced Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2009.01348.x' OR iq.doi = '10.1111/j.1524-4725.2009.01348.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1046/j.1524-4725.2003.29100.x',
  NULLIF('10.1046/j.1524-4725.2003.29100.x', ''),
  'An Unusual Complication of Facial Sclerotherapy',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1046/j.1524-4725.2003.29100.x' OR iq.doi = '10.1046/j.1524-4725.2003.29100.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/00042728-200304000-00021',
  NULLIF('10.1097/00042728-200304000-00021', ''),
  'An Unusual Complication of Facial Sclerotherapy',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/00042728-200304000-00021' OR iq.doi = '10.1097/00042728-200304000-00021'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1046/j.1524-4725.2002.02037.x',
  NULLIF('10.1046/j.1524-4725.2002.02037.x', ''),
  'Botulinum Toxin Type B for Glabellar Wrinkles: A Prospective Open-Label Response Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1046/j.1524-4725.2002.02037.x' OR iq.doi = '10.1046/j.1524-4725.2002.02037.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000612',
  NULLIF('10.1097/dss.0000000000000612', ''),
  'Chronic Ulcer as a Complication of Gold Needle Implantation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000612' OR iq.doi = '10.1097/dss.0000000000000612'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/00042728-200609000-00004',
  NULLIF('10.1097/00042728-200609000-00004', ''),
  'Clinical Trial of a Novel Filler Material for Soft Tissue Augmentation of the Face Containing Synthetic Calcium Hydroxylapatite Microspheres',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/00042728-200609000-00004' OR iq.doi = '10.1097/00042728-200609000-00004'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2006.32256.x',
  NULLIF('10.1111/j.1524-4725.2006.32256.x', ''),
  'Clinical Trial of a Novel Filler Material for Soft Tissue Augmentation of the Face Containing Synthetic Calcium Hydroxylapatite Microspheres',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2006.32256.x' OR iq.doi = '10.1111/j.1524-4725.2006.32256.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001321',
  NULLIF('10.1097/dss.0000000000001321', ''),
  'Commentary on ATX-101 (Deoxycholic Acid Injection) for Paradoxical Adipose Hyperplasia Secondary to Cryolipolysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001321' OR iq.doi = '10.1097/dss.0000000000001321'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002541',
  NULLIF('10.1097/dss.0000000000002541', ''),
  'Commentary on Fake Online Physician Reviews in Aesthetic Dermatology',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002541' OR iq.doi = '10.1097/dss.0000000000002541'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004703',
  NULLIF('10.1097/dss.0000000000004703', ''),
  'Commentary on “Botulinum Toxin Type A: Is It Really Useful in Improving the Aesthetic Results of Extrafacial Scars? A Prospective, Randomized, Double-Blinded Study”',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004703' OR iq.doi = '10.1097/dss.0000000000004703'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/dsu.12369',
  NULLIF('10.1111/dsu.12369', ''),
  'Commentary: Asian Consensus Recommendations on the Aesthetic Usage of Botulinum Toxin Type A',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/dsu.12369' OR iq.doi = '10.1111/dsu.12369'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/dsu.12332',
  NULLIF('10.1111/dsu.12332', ''),
  'Commentary: Pseudocystic Encapsulation: A Late Noninflammatory Complication of Hyaluronic Acid Filler Injections',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/dsu.12332' OR iq.doi = '10.1111/dsu.12332'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001284',
  NULLIF('10.1097/dss.0000000000001284', ''),
  'Delayed Paleness After Hyaluronic Acid Filler Injection: A Warning Sign of Vascular Compromise',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001284' OR iq.doi = '10.1097/dss.0000000000001284'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002894',
  NULLIF('10.1097/dss.0000000000002894', ''),
  'Dermal Filler-Induced Vascular Occlusion Successfully Treated With Tadalafil, Hyaluronidase, and Aspirin',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002894' OR iq.doi = '10.1097/dss.0000000000002894'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005155',
  NULLIF('10.1097/dss.0000000000005155', ''),
  'Global Trends and Evidence Evaluation: A Systematic Review of Polynucleotide and Polydeoxyribonucleotide Therapy in Dermatology',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005155' OR iq.doi = '10.1097/dss.0000000000005155'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002782',
  NULLIF('10.1097/dss.0000000000002782', ''),
  'Iatrogenic Cervicofacial Subcutaneous Emphysema: A Rare Dental Complication',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002782' OR iq.doi = '10.1097/dss.0000000000002782'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2009.01190.x',
  NULLIF('10.1111/j.1524-4725.2009.01190.x', ''),
  'Informed Consent and Clinician Accountability by STEVE CLARKE AND JUSTIN OAKLEY',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2009.01190.x' OR iq.doi = '10.1111/j.1524-4725.2009.01190.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.1995.tb00261.x',
  NULLIF('10.1111/j.1524-4725.1995.tb00261.x', ''),
  'Informed Consent and Informed Refusal',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.1995.tb00261.x' OR iq.doi = '10.1111/j.1524-4725.1995.tb00261.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1046/j.1524-4725.2003.29251.x',
  NULLIF('10.1046/j.1524-4725.2003.29251.x', ''),
  'Informed Consent in Dermatologic Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1046/j.1524-4725.2003.29251.x' OR iq.doi = '10.1046/j.1524-4725.2003.29251.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/00042728-200309000-00014',
  NULLIF('10.1097/00042728-200309000-00014', ''),
  'Informed Consent in Dermatologic Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/00042728-200309000-00014' OR iq.doi = '10.1097/00042728-200309000-00014'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/dsu.12116',
  NULLIF('10.1111/dsu.12116', ''),
  'Laser Hair Removal: A Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/dsu.12116' OR iq.doi = '10.1111/dsu.12116'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000003870',
  NULLIF('10.1097/dss.0000000000003870', ''),
  'Laser-Assisted and Device-Assisted Filler Delivery: A Histologic Evaluation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000003870' OR iq.doi = '10.1097/dss.0000000000003870'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2006.32209.x',
  NULLIF('10.1111/j.1524-4725.2006.32209.x', ''),
  'Letter: Unusual Complication of a Forehead Flap',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2006.32209.x' OR iq.doi = '10.1111/j.1524-4725.2006.32209.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004914',
  NULLIF('10.1097/dss.0000000000004914', ''),
  'Management of Adverse Events of Botulinum Toxin Treatment of Masseter Muscle Prominence',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004914' OR iq.doi = '10.1097/dss.0000000000004914'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000964',
  NULLIF('10.1097/dss.0000000000000964', ''),
  'Management of Patient Experience With ATX-101 (Deoxycholic Acid Injection) for Reduction of Submental Fat',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000964' OR iq.doi = '10.1097/dss.0000000000000964'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001234',
  NULLIF('10.1097/dss.0000000000001234', ''),
  'Management of Patient Experience With ATX-101 (Deoxycholic Acid Injection) for Reduction of Submental Fat: ERRATUM',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001234' OR iq.doi = '10.1097/dss.0000000000001234'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005087',
  NULLIF('10.1097/dss.0000000000005087', ''),
  'Management of a Complication of At-Home High-Strength Glycolic Acid Peels',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005087' OR iq.doi = '10.1097/dss.0000000000005087'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/00042728-200806001-00021',
  NULLIF('10.1097/00042728-200806001-00021', ''),
  'Minimizing Adverse Events Associated with Poly-L-lactic Acid Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/00042728-200806001-00021' OR iq.doi = '10.1097/00042728-200806001-00021'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2008.34250.x',
  NULLIF('10.1111/j.1524-4725.2008.34250.x', ''),
  'Minimizing Adverse Events Associated with Poly-l-lactic Acid Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2008.34250.x' OR iq.doi = '10.1111/j.1524-4725.2008.34250.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004952',
  NULLIF('10.1097/dss.0000000000004952', ''),
  'Nail Bed Pyogenic Granuloma as a Late Postoperative Complication Successfully Treated With Conservative Management',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004952' OR iq.doi = '10.1097/dss.0000000000004952'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001411',
  NULLIF('10.1097/dss.0000000000001411', ''),
  'One Thousand Five Hundred Fifty Nanometer Erbium-Doped Nonablative Fractional Laser for the Treatment of Striae Distensae in Patients of Skin of Color (Fitzpatrick Skin Types IV–VI)',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001411' OR iq.doi = '10.1097/dss.0000000000001411'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000941',
  NULLIF('10.1097/dss.0000000000000941', ''),
  'Paradoxical Hyperplasia Post Cryolipolysis and Management',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000941' OR iq.doi = '10.1097/dss.0000000000000941'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1046/j.1524-4725.1999.99120-3.x',
  NULLIF('10.1046/j.1524-4725.1999.99120-3.x', ''),
  'Photographic Comparison as Evidence of Therapeutic Success in Aesthetic Dermatosurgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1046/j.1524-4725.1999.99120-3.x' OR iq.doi = '10.1046/j.1524-4725.1999.99120-3.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1046/j.1524-4725.2003.29122.x',
  NULLIF('10.1046/j.1524-4725.2003.29122.x', ''),
  'Prospective Open-Label Study of Botulinum Toxin Type B (Myobloc) at Doses of 2,400 and 3,000 U for the Treatment of Glabellar Wrinkles',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1046/j.1524-4725.2003.29122.x' OR iq.doi = '10.1046/j.1524-4725.2003.29122.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/dsu.12316',
  NULLIF('10.1111/dsu.12316', ''),
  'Pseudocystic Encapsulation: A Late Noninflammatory Complication of Hyaluronic Acid Filler Injections',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/dsu.12316' OR iq.doi = '10.1111/dsu.12316'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2009.01235.x',
  NULLIF('10.1111/j.1524-4725.2009.01235.x', ''),
  'Randomized, Placebo-Controlled Study of a New Botulinum Toxin Type A for Treatment of Glabellar Lines',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2009.01235.x' OR iq.doi = '10.1111/j.1524-4725.2009.01235.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2006.032074.x',
  NULLIF('10.1111/j.1524-4725.2006.032074.x', ''),
  'Repeated Treatment Protocols for Melasma and Acquired Dermal Melanocytosis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2006.032074.x' OR iq.doi = '10.1111/j.1524-4725.2006.032074.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001237',
  NULLIF('10.1097/dss.0000000000001237', ''),
  'Restoration of Visual Loss With Retrobulbar Hyaluronidase Injection After Hyaluronic Acid Filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001237' OR iq.doi = '10.1097/dss.0000000000001237'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.1995.tb00545.x',
  NULLIF('10.1111/j.1524-4725.1995.tb00545.x', ''),
  'Ruby Laser Treatment of Melasma and Postinflammatory Hyperpigmentation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.1995.tb00545.x' OR iq.doi = '10.1111/j.1524-4725.1995.tb00545.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2007.33355.x',
  NULLIF('10.1111/j.1524-4725.2007.33355.x', ''),
  'Skin Test Hypersensitivity Study of a Cross-linked, Porcine Collagen Implant for Aesthetic Surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2007.33355.x' OR iq.doi = '10.1111/j.1524-4725.2007.33355.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/dsu.12147',
  NULLIF('10.1111/dsu.12147', ''),
  'The Convergence of Medicine and Neurotoxins: A Focus on Botulinum Toxin Type A and Its Application in Aesthetic Medicine—A Global, Evidence-Based Botulinum Toxin Consensus Education Initiative',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/dsu.12147' OR iq.doi = '10.1111/dsu.12147'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/dsu.12148',
  NULLIF('10.1111/dsu.12148', ''),
  'The Convergence of Medicine and Neurotoxins: A Focus on Botulinum Toxin Type A and Its Application in Aesthetic Medicine—A Global, Evidence-Based Botulinum Toxin Consensus Education Initiative',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/dsu.12148' OR iq.doi = '10.1111/dsu.12148'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001236',
  NULLIF('10.1097/dss.0000000000001236', ''),
  'The Efficacy of Massage in Reducing Nodule Formation After Poly-L-Lactic Acid Administration for Facial Volume Loss: A Randomized, Evaluator-Blinded Clinical Trial: ERRATUM',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001236' OR iq.doi = '10.1097/dss.0000000000001236'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.2310/6350.2005.31302',
  NULLIF('10.2310/6350.2005.31302', ''),
  'The Treatment of Melasma with Fractional Photothermolysis: A Pilot Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.2310/6350.2005.31302' OR iq.doi = '10.2310/6350.2005.31302'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000001173',
  NULLIF('10.1097/dss.0000000000001173', ''),
  'The Utility of Color Doppler Ultrasound to Explore Vascular Complications After Filler Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000001173' OR iq.doi = '10.1097/dss.0000000000001173'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000000062',
  NULLIF('10.1097/dss.0000000000000062', ''),
  'Transarterial Degradation of Hyaluronic Acid Filler by Hyaluronidase',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000000062' OR iq.doi = '10.1097/dss.0000000000000062'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000004390',
  NULLIF('10.1097/dss.0000000000004390', ''),
  'Ultrasound Guidance for Filler and Botulinum Toxin Injections: A Transformative Approach Avoiding Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000004390' OR iq.doi = '10.1097/dss.0000000000004390'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/00042728-200806001-00020',
  NULLIF('10.1097/00042728-200806001-00020', ''),
  'Understanding, Avoiding, and Managing Dermal Filler Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/00042728-200806001-00020' OR iq.doi = '10.1097/00042728-200806001-00020'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1111/j.1524-4725.2008.34249.x',
  NULLIF('10.1111/j.1524-4725.2008.34249.x', ''),
  'Understanding, Avoiding, and Managing Dermal Filler Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1524-4725.2008.34249.x' OR iq.doi = '10.1111/j.1524-4725.2008.34249.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000002959',
  NULLIF('10.1097/dss.0000000000002959', ''),
  'Vascular Complication Caused by Self-Injected Hyaluronic Acid Filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000002959' OR iq.doi = '10.1097/dss.0000000000002959'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Dermatologic Surgery'),
  'https://doi.org/10.1097/dss.0000000000005110',
  NULLIF('10.1097/dss.0000000000005110', ''),
  'Vascular Occlusion of the Sublingual Artery After Jawline Filler Injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/dss.0000000000005110' OR iq.doi = '10.1097/dss.0000000000005110'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-2007-1021890',
  NULLIF('10.1055/s-2007-1021890', ''),
  'Aesthetic Management of External Skin Paddles Following Microvascular Reconstruction of the Head and Neck',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-2007-1021890' OR iq.doi = '10.1055/s-2007-1021890'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0037-1607974',
  NULLIF('10.1055/s-0037-1607974', ''),
  'Aesthetic Management of Upper and Midface Trauma',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0037-1607974' OR iq.doi = '10.1055/s-0037-1607974'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2635-3779',
  NULLIF('10.1055/a-2635-3779', ''),
  'Aesthetic Management of the Lips, Chin and Submentum',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2635-3779' OR iq.doi = '10.1055/a-2635-3779'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-2007-1021891',
  NULLIF('10.1055/s-2007-1021891', ''),
  'Aesthetic and Functional Management of Eyelid and Orbital Reconstruction',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-2007-1021891' OR iq.doi = '10.1055/s-2007-1021891'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0038-1636934',
  NULLIF('10.1055/s-0038-1636934', ''),
  'An Unexpected Donor Site Complication after Aesthetic Rhinoplasty: Arteriovenous Fistula of the Superficial Temporal Artery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0038-1636934' OR iq.doi = '10.1055/s-0038-1636934'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0031-1298786',
  NULLIF('10.1055/s-0031-1298786', ''),
  'Botulinum Toxin: Clinical Techniques, Applications, and Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0031-1298786' OR iq.doi = '10.1055/s-0031-1298786'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-2008-1064460',
  NULLIF('10.1055/s-2008-1064460', ''),
  'Complication or Mistake?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-2008-1064460' OR iq.doi = '10.1055/s-2008-1064460'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0032-1312701',
  NULLIF('10.1055/s-0032-1312701', ''),
  'Complications in Lasers, Lights, and Radiofrequency Devices',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0032-1312701' OR iq.doi = '10.1055/s-0032-1312701'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-2008-1064515',
  NULLIF('10.1055/s-2008-1064515', ''),
  'Complications of Chemical Face Peeling: Prevention and Management',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-2008-1064515' OR iq.doi = '10.1055/s-2008-1064515'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0029-1243081',
  NULLIF('10.1055/s-0029-1243081', ''),
  'Complications of Hyaluronic Acid Fillers',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0029-1243081' OR iq.doi = '10.1055/s-0029-1243081'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0040-1717080',
  NULLIF('10.1055/s-0040-1717080', ''),
  'Contouring the Mandible for Aesthetic Enhancement in Asian Patients',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0040-1717080' OR iq.doi = '10.1055/s-0040-1717080'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0044-1781455',
  NULLIF('10.1055/s-0044-1781455', ''),
  'Deep Neck Contouring through the Ages',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0044-1781455' OR iq.doi = '10.1055/s-0044-1781455'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0038-1656550',
  NULLIF('10.1055/s-0038-1656550', ''),
  'Erratum: Intra-Arterial Thrombolytic Therapy Is Not a Therapeutic Option for Filler-Related Central Retinal Artery Occlusion',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0038-1656550' OR iq.doi = '10.1055/s-0038-1656550'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0032-1312695',
  NULLIF('10.1055/s-0032-1312695', ''),
  'Facial Filler and Neurotoxin Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0032-1312695' OR iq.doi = '10.1055/s-0032-1312695'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-2004-822954',
  NULLIF('10.1055/s-2004-822954', ''),
  'Facial Rejuvenation Using Botulinum Toxin A: Review and Updates',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-2004-822954' OR iq.doi = '10.1055/s-2004-822954'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0034-1396757',
  NULLIF('10.1055/s-0034-1396757', ''),
  'Filler Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0034-1396757' OR iq.doi = '10.1055/s-0034-1396757'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0029-1220647',
  NULLIF('10.1055/s-0029-1220647', ''),
  'Hyaluronic Acid Fillers: A Comprehensive Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0029-1220647' OR iq.doi = '10.1055/s-0029-1220647'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-2005-872415',
  NULLIF('10.1055/s-2005-872415', ''),
  'Laser Hair Removal in Fitzpatrick Type IV to VI Patients',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-2005-872415' OR iq.doi = '10.1055/s-2005-872415'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0036-1584129',
  NULLIF('10.1055/s-0036-1584129', ''),
  'Microfocused Ultrasound for Facial Photorejuvenation: A Review',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0036-1584129' OR iq.doi = '10.1055/s-0036-1584129'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/a-2188-8608',
  NULLIF('10.1055/a-2188-8608', ''),
  'PHAT Lips and PHAT Face: Platelet Hybridized Adipose Therapy for Superficial Musculoaponeurotic System and Dermal Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/a-2188-8608' OR iq.doi = '10.1055/a-2188-8608'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0043-1769595',
  NULLIF('10.1055/s-0043-1769595', ''),
  'Paradoxical Adipose Hyperplasia after Cryolipolysis CoolSculpting',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0043-1769595' OR iq.doi = '10.1055/s-0043-1769595'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery'),
  'https://doi.org/10.1055/s-0029-1220653',
  NULLIF('10.1055/s-0029-1220653', ''),
  'The Management of Dermal Filler Complications',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1055/s-0029-1220653' OR iq.doi = '10.1055/s-0029-1220653'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1177/26893614251373031',
  NULLIF('10.1177/26893614251373031', ''),
  '<i>Invited Commentary on:</i> “Acute Complication After Self-Injection of Lip Filler: What Should You Do Next?,” by Gengler et al.',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/26893614251373031' OR iq.doi = '10.1177/26893614251373031'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2021.0056',
  NULLIF('10.1089/fpsam.2021.0056', ''),
  'Aesthetic Reconstruction of the Gauge Earlobe: Surgical Technique and Case Series',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2021.0056' OR iq.doi = '10.1089/fpsam.2021.0056'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0247',
  NULLIF('10.1089/fpsam.2020.0247', ''),
  'Assessing Unrealistic Expectations in Clients Undertaking Minor Cosmetic Procedures: The Development of the Aesthetic Procedure Expectations Scale',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0247' OR iq.doi = '10.1089/fpsam.2020.0247'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0109',
  NULLIF('10.1089/fpsam.2023.0109', ''),
  'Commentary on: “A Novel Approach to Facial Rejuvenation by Treating Cutaneous and Soft Tissue for Wrinkles Reduction: First Experience from Multicenter Clinical Trial” by Gentile et al.',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0109' OR iq.doi = '10.1089/fpsam.2023.0109'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2023.0361',
  NULLIF('10.1089/fpsam.2023.0361', ''),
  'Invited Commentary: Analysis of Breast Milk Samples in Lactating Women After Undergoing Botulinum Toxin Injections for Facial Rejuvenation: A Pilot Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2023.0361' OR iq.doi = '10.1089/fpsam.2023.0361'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2024.0101',
  NULLIF('10.1089/fpsam.2024.0101', ''),
  'Invited Commentary: “Comparison of Dorsal Preservation Rhinoplasty Techniques: Functional and Aesthetic Review of Subdorsal Septal Strip Methods” by Barrera',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2024.0101' OR iq.doi = '10.1089/fpsam.2024.0101'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1177/26893614251413260',
  NULLIF('10.1177/26893614251413260', ''),
  'Rhinoplasty Revisions: Aesthetic Surgery as a Risk Factor',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/26893614251413260' OR iq.doi = '10.1177/26893614251413260'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2024.0023',
  NULLIF('10.1089/fpsam.2024.0023', ''),
  'Split-Face Histomorphological Study of Radiofrequency Microneedling Versus Fractionated Ablative 2940 nm Er:YAG Laser Resurfacing for Perioral Skin Rejuvenation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2024.0023' OR iq.doi = '10.1089/fpsam.2024.0023'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2021.0227',
  NULLIF('10.1089/fpsam.2021.0227', ''),
  'Submental Paradoxical Adipose Hyperplasia Following Cryolipolysis: A Report and Management Recommendations',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2021.0227' OR iq.doi = '10.1089/fpsam.2021.0227'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2025.0009',
  NULLIF('10.12968/joan.2025.0009', ''),
  'A literature review on polynucleotide efficacy on skin rejuvenation, and review of the regulatory status and guidelines around polynucleotides',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2025.0009' OR iq.doi = '10.12968/joan.2025.0009'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2021.10.10.446',
  NULLIF('10.12968/joan.2021.10.10.446', ''),
  'An introduction to chemical peels for the body',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2021.10.10.446' OR iq.doi = '10.12968/joan.2021.10.10.446'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.4.190',
  NULLIF('10.12968/joan.2014.3.4.190', ''),
  'Avoiding litigation: what aesthetic nurses need to know about capacity to consent',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.4.190' OR iq.doi = '10.12968/joan.2014.3.4.190'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.2.84',
  NULLIF('10.12968/joan.2014.3.2.84', ''),
  'Avoiding litigation: what aesthetic nurses need to know about informed consent',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.2.84' OR iq.doi = '10.12968/joan.2014.3.2.84'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2012.1.6.310',
  NULLIF('10.12968/joan.2012.1.6.310', ''),
  'Can children and adolescents truly consent to medical aesthetic procedures?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2012.1.6.310' OR iq.doi = '10.12968/joan.2012.1.6.310'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.4.212',
  NULLIF('10.12968/joan.2018.7.4.212', ''),
  'Capacity and consent: understanding the implications for nursing practice',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.4.212' OR iq.doi = '10.12968/joan.2018.7.4.212'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2015.4.10.506',
  NULLIF('10.12968/joan.2015.4.10.506', ''),
  'Chemical peels: the importance of a thorough consenting process',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2015.4.10.506' OR iq.doi = '10.12968/joan.2015.4.10.506'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2015.4.4.182',
  NULLIF('10.12968/joan.2015.4.4.182', ''),
  'Could the rise of dermal filler treatments replace facial cosmetic surgery?',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2015.4.4.182' OR iq.doi = '10.12968/joan.2015.4.4.182'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2013.2.1.23',
  NULLIF('10.12968/joan.2013.2.1.23', ''),
  'Dorsal hand anatomy: age-related changes, fat planes and vascular considerations',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2013.2.1.23' OR iq.doi = '10.12968/joan.2013.2.1.23'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2017.6.9.466',
  NULLIF('10.12968/joan.2017.6.9.466', ''),
  'Evolution of laser lipolysis in non-invasive fat reduction and body sculpting',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2017.6.9.466' OR iq.doi = '10.12968/joan.2017.6.9.466'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2020.9.7.268',
  NULLIF('10.12968/joan.2020.9.7.268', ''),
  'How to get rid of visceral fat: a randomised double-blind clinical trial',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2020.9.7.268' OR iq.doi = '10.12968/joan.2020.9.7.268'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2021.10.sup1.28',
  NULLIF('10.12968/joan.2021.10.sup1.28', ''),
  'Hyaluronic acid dermal fillers and autoimmune disorders: a case report and discussion of a late-onset complication',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2021.10.sup1.28' OR iq.doi = '10.12968/joan.2021.10.sup1.28'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2023.12.7.314',
  NULLIF('10.12968/joan.2023.12.7.314', ''),
  'Hyaluronic acid skin boosters: the holy grail of skin health',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2023.12.7.314' OR iq.doi = '10.12968/joan.2023.12.7.314'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2023.12.1.34',
  NULLIF('10.12968/joan.2023.12.1.34', ''),
  'Informed consent in medical aesthetics',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2023.12.1.34' OR iq.doi = '10.12968/joan.2023.12.1.34'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2024.13.1.6',
  NULLIF('10.12968/joan.2024.13.1.6', ''),
  'Investigating incretins: a review of the use of GLP-1 and GIP receptor agonists for weight loss',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2024.13.1.6' OR iq.doi = '10.12968/joan.2024.13.1.6'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2015.4.9.454',
  NULLIF('10.12968/joan.2015.4.9.454', ''),
  'Laser hair removal: the problems associated with promotions and discounts',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2015.4.9.454' OR iq.doi = '10.12968/joan.2015.4.9.454'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.sup2.26',
  NULLIF('10.12968/joan.2018.7.sup2.26', ''),
  'Laser skin resurfacing: an overview of treatment options and outcomes',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.sup2.26' OR iq.doi = '10.12968/joan.2018.7.sup2.26'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2021.10.sup2.24',
  NULLIF('10.12968/joan.2021.10.sup2.24', ''),
  'Laser tattoo removal: a pilot study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2021.10.sup2.24' OR iq.doi = '10.12968/joan.2021.10.sup2.24'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.8.418',
  NULLIF('10.12968/joan.2018.7.8.418', ''),
  'Light weight: the aesthetics and ethics of male body contouring',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.8.418' OR iq.doi = '10.12968/joan.2018.7.8.418'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2017.6.2.68',
  NULLIF('10.12968/joan.2017.6.2.68', ''),
  'Lower facial rejuvenation: age-related changes and treatment options',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2017.6.2.68' OR iq.doi = '10.12968/joan.2017.6.2.68'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2016.5.6.284',
  NULLIF('10.12968/joan.2016.5.6.284', ''),
  'Male facial aesthetics: understanding an emerging segment of patients',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2016.5.6.284' OR iq.doi = '10.12968/joan.2016.5.6.284'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2015.4.8.380',
  NULLIF('10.12968/joan.2015.4.8.380', ''),
  'Mesotherapy for facial rejuvenation: indications and injection techniques',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2015.4.8.380' OR iq.doi = '10.12968/joan.2015.4.8.380'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2021.10.3.106',
  NULLIF('10.12968/joan.2021.10.3.106', ''),
  'Periorbital rejuvenation and tear trough filler',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2021.10.3.106' OR iq.doi = '10.12968/joan.2021.10.3.106'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/jcyn.2008.2.2.28194',
  NULLIF('10.12968/jcyn.2008.2.2.28194', ''),
  'Prime Minister backs concept of presumed consent',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/jcyn.2008.2.2.28194' OR iq.doi = '10.12968/jcyn.2008.2.2.28194'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.5.224',
  NULLIF('10.12968/joan.2014.3.5.224', ''),
  'Skin pigmentation disorders: aetiology, assessment and aesthetic treatment options',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.5.224' OR iq.doi = '10.12968/joan.2014.3.5.224'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2015.4.8.404',
  NULLIF('10.12968/joan.2015.4.8.404', ''),
  'Supreme Court decision on consent law has implications for aesthetic practitioners',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2015.4.8.404' OR iq.doi = '10.12968/joan.2015.4.8.404'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2017.6.5.s16',
  NULLIF('10.12968/joan.2017.6.5.s16', ''),
  'Tear trough deformity correction: an advanced aesthetic procedure',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2017.6.5.s16' OR iq.doi = '10.12968/joan.2017.6.5.s16'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.4.190',
  NULLIF('10.12968/joan.2018.7.4.190', ''),
  'The ageing hand, part one: volumisation using dermal fillers and autologous fat',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.4.190' OR iq.doi = '10.12968/joan.2018.7.4.190'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2020.9.10.414',
  NULLIF('10.12968/joan.2020.9.10.414', ''),
  'The uses of botulinum toxin A in facial aesthetics',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2020.9.10.414' OR iq.doi = '10.12968/joan.2020.9.10.414'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2020.9.4.156',
  NULLIF('10.12968/joan.2020.9.4.156', ''),
  'Understanding facial anatomy in aesthetic practice',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2020.9.4.156' OR iq.doi = '10.12968/joan.2020.9.4.156'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2020.9.10.420',
  NULLIF('10.12968/joan.2020.9.10.420', ''),
  'Using platelet-rich plasma to treat hair loss and thinning',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2020.9.10.420' OR iq.doi = '10.12968/joan.2020.9.10.420'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2020.9.8.326',
  NULLIF('10.12968/joan.2020.9.8.326', ''),
  'Using platelet-rich plasma to treat hair loss and thinning',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2020.9.8.326' OR iq.doi = '10.12968/joan.2020.9.8.326'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2023.12.2.58',
  NULLIF('10.12968/joan.2023.12.2.58', ''),
  'Vascular occlusion',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2023.12.2.58' OR iq.doi = '10.12968/joan.2023.12.2.58'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14937',
  NULLIF('10.1111/jocd.14937', ''),
  'A rare complication of varicella: Acute peripheral facial paralysis',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14937' OR iq.doi = '10.1111/jocd.14937'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2011.00571.x',
  NULLIF('10.1111/j.1473-2165.2011.00571.x', ''),
  'A study of fractional CO2 laser resurfacing: the best fluences through a clinical, histological, and ultrastructural evaluation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2011.00571.x' OR iq.doi = '10.1111/j.1473-2165.2011.00571.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2010.00545.x',
  NULLIF('10.1111/j.1473-2165.2010.00545.x', ''),
  'A succinct review of botulinum toxin in dermatology; update of cosmetic and noncosmetic use',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2010.00545.x' OR iq.doi = '10.1111/j.1473-2165.2010.00545.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1046/j.1473-2165.2002.00040_6.x',
  NULLIF('10.1046/j.1473-2165.2002.00040_6.x', ''),
  'A5. Psychopathological screening: psychopathological evaluation instruments in aesthetic surgery',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1046/j.1473-2165.2002.00040_6.x' OR iq.doi = '10.1046/j.1473-2165.2002.00040_6.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.14856',
  NULLIF('10.1111/jocd.14856', ''),
  'Aesthetic implications of depressor supercilii muscle block with botulinum toxin type A',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.14856' OR iq.doi = '10.1111/jocd.14856'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16779',
  NULLIF('10.1111/jocd.16779', ''),
  'Case Report: Management of Polycaprolactone‐Based Dermal Filler–Induced Vascular Occlusion',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16779' OR iq.doi = '10.1111/jocd.16779'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2011.00580.x',
  NULLIF('10.1111/j.1473-2165.2011.00580.x', ''),
  'Comparative study of therapeutic effects of 20% azelaic acid and hydroquinone 4% cream in the treatment of melasma',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2011.00580.x' OR iq.doi = '10.1111/j.1473-2165.2011.00580.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70174',
  NULLIF('10.1111/jocd.70174', ''),
  'Correction to “Energy‐Based Devices in the Treatment of Acne Scars in Skin of Color”',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70174' OR iq.doi = '10.1111/jocd.70174'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70989',
  NULLIF('10.1111/jocd.70989', ''),
  'Correction to “International Expert Consensus on Integrated Skincare Active Ingredients for Pretreatment and Posttreatment Use With Medical Aesthetic Procedures to Enhance Skin Benefits”',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70989' OR iq.doi = '10.1111/jocd.70989'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70516',
  NULLIF('10.1111/jocd.70516', ''),
  'Correction to “Randomized Clinical Trial on the Efficacy of Oral Tranexamic Acid Versus Topical Tranexamic Acid in Treatment of Melasma”',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70516' OR iq.doi = '10.1111/jocd.70516'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70573',
  NULLIF('10.1111/jocd.70573', ''),
  'Letter to the Editor: Use of <scp>PDRN</scp> and Nd: <scp>YAG</scp> Q‐Switched 1064 nm Laser in the Management of Post‐Inflammatory Hyperpigmentation Following Laser Hair Removal Complication',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70573' OR iq.doi = '10.1111/jocd.70573'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2130.2004.00045.x',
  NULLIF('10.1111/j.1473-2130.2004.00045.x', ''),
  'Patient satisfaction with laser hair removal',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2130.2004.00045.x' OR iq.doi = '10.1111/j.1473-2130.2004.00045.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/j.1473-2165.2011.00566.x',
  NULLIF('10.1111/j.1473-2165.2011.00566.x', ''),
  'Randomized trial comparing a chemical peel containing a lipophilic hydroxy acid derivative of salicylic acid with a salicylic acid peel in subjects with comedonal acne',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/j.1473-2165.2011.00566.x' OR iq.doi = '10.1111/j.1473-2165.2011.00566.x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.13916',
  NULLIF('10.1111/jocd.13916', ''),
  'Resurfacing with a new 675‐nm laser device: A case series',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.13916' OR iq.doi = '10.1111/jocd.13916'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70877',
  NULLIF('10.1111/jocd.70877', ''),
  'Setting the Standard for Peer‐Reviewed Published Studies on Regenerative Products in Aesthetic Medicine and Post‐Procedure Wound Care',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70877' OR iq.doi = '10.1111/jocd.70877'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15125',
  NULLIF('10.1111/jocd.15125', ''),
  'Treatment of filler‐related vascular occlusion using handheld portable ultrasound device',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15125' OR iq.doi = '10.1111/jocd.15125'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.15692',
  NULLIF('10.1111/jocd.15692', ''),
  'Trichoscopy of aplasia cutis congenita of the scalp in skin of color',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.15692' OR iq.doi = '10.1111/jocd.15692'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.70537',
  NULLIF('10.1111/jocd.70537', ''),
  'Water Retention Ability of the Dermis Following Polynucleotide Intradermal Injection Using a Water Distribution Model: Pilot Study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.70537' OR iq.doi = '10.1111/jocd.70537'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology'),
  'https://doi.org/10.1111/jocd.16534',
  NULLIF('10.1111/jocd.16534', ''),
  'Why do vertical glabellar lines form? A guideline on botulinum neurotoxin injection',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1111/jocd.16534' OR iq.doi = '10.1111/jocd.16534'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/147641702760116485',
  NULLIF('10.1080/147641702760116485', ''),
  'A Practical Guide to Achieving Successful Outcomes with Botulinum Toxin Type A',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/147641702760116485' OR iq.doi = '10.1080/147641702760116485'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.3109/14764172.2013.854636',
  NULLIF('10.3109/14764172.2013.854636', ''),
  'A combination trial of intradermal radiofrequency and hyaluronic acid filler for the treatment of nasolabial fold wrinkles: A pilot study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3109/14764172.2013.854636' OR iq.doi = '10.3109/14764172.2013.854636'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2024.2390585',
  NULLIF('10.1080/14764172.2024.2390585', ''),
  'A comparison of surgical scar treatment using various combinations of autologous fat, hyaluronic acid and resurfacing with the 1540 nm non-ablative Erbium laser – a prospective pilot study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2024.2390585' OR iq.doi = '10.1080/14764172.2024.2390585'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.3109/14764172.2016.1157363',
  NULLIF('10.3109/14764172.2016.1157363', ''),
  'Combination of microneedling and 10% trichloroacetic acid peels in the management of infraorbital dark circles',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3109/14764172.2016.1157363' OR iq.doi = '10.3109/14764172.2016.1157363'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2017.1406606',
  NULLIF('10.1080/14764172.2017.1406606', ''),
  'Combined use of microfocused ultrasound and a calcium hydroxylapatite dermal filler for treating atrophic acne scars: A pilot study',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2017.1406606' OR iq.doi = '10.1080/14764172.2017.1406606'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2018.1511913',
  NULLIF('10.1080/14764172.2018.1511913', ''),
  'Confocal microscopy can assess the efficacy of combined microneedling and skinbooster for striae rubrae',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2018.1511913' OR iq.doi = '10.1080/14764172.2018.1511913'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2025.2478142',
  NULLIF('10.1080/14764172.2025.2478142', ''),
  'Iatrogenic ocular ischemic syndrome combined with central retinal artery occlusion following periorbital aesthetic Poly‐D, L‐lactic acid filler injections – a case report',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2025.2478142' OR iq.doi = '10.1080/14764172.2025.2478142'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2017.1383614',
  NULLIF('10.1080/14764172.2017.1383614', ''),
  'Long-term outcome of a patient with paradoxical hypertrichosis after laser epilation',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2017.1383614' OR iq.doi = '10.1080/14764172.2017.1383614'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2017.1400167',
  NULLIF('10.1080/14764172.2017.1400167', ''),
  'Outcome of facial rejuvenation with polydioxanone thread for Asians',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2017.1400167' OR iq.doi = '10.1080/14764172.2017.1400167'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764170410032569',
  NULLIF('10.1080/14764170410032569', ''),
  'Prospective study on combination diode laser and radiofrequency energies (ELOS<sup>TM</sup>) for the treatment of leg veins',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764170410032569' OR iq.doi = '10.1080/14764170410032569'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy'),
  'https://doi.org/10.1080/14764172.2025.2488982',
  NULLIF('10.1080/14764172.2025.2488982', ''),
  'Synergistic effect of radiofrequency and vacuum for body contouring: a retrospective study with 40 patients',
  'unknown',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1080/14764172.2025.2488982' OR iq.doi = '10.1080/14764172.2025.2488982'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_50_2024',
  NULLIF('10.25259/jcas_50_2024', ''),
  'Achieving esthetic improvement in a rare case of facial blaschko-linear lichen planus using 1064 nm Q-switched neodymium: Yttrium-aluminium-garnet laser and microneedling pen',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_50_2024' OR iq.doi = '10.25259/jcas_50_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.172211',
  NULLIF('10.4103/0974-2077.172211', ''),
  'Erratum: Successful treatment of tattoo-induced pseudolymphoma with sequential ablative fractional resurfacing followed by Q-switched Nd: YAG 532 nm laser',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.172211' OR iq.doi = '10.4103/0974-2077.172211'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.91251',
  NULLIF('10.4103/0974-2077.91251', ''),
  'Laser hair removal as adjunct to surgery for pilonidal sinus: Our initial experience',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.91251' OR iq.doi = '10.4103/0974-2077.91251'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/jcas.jcas_101_22',
  NULLIF('10.4103/jcas.jcas_101_22', ''),
  'Modified platelet rich plasma therapy for alopecia totalis',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/jcas.jcas_101_22' OR iq.doi = '10.4103/jcas.jcas_101_22'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.172199',
  NULLIF('10.4103/0974-2077.172199', ''),
  'Novel low fluence combination laser treatment of solar lentigines in type III Asian skin',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.172199' OR iq.doi = '10.4103/0974-2077.172199'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.172198',
  NULLIF('10.4103/0974-2077.172198', ''),
  'Novel treatment of Hori′s nevus: A combination of fractional nonablative 2,940-nm Er:YAG and low-fluence 1,064-nm Q-switched Nd:YAG laser',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.172198' OR iq.doi = '10.4103/0974-2077.172198'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.123412',
  NULLIF('10.4103/0974-2077.123412', ''),
  'Successful treatment of tattoo-induced pseudolymphoma with sequential ablative fractional resurfacing followed by Q-switched Nd: Yag 532 nm laser',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.123412' OR iq.doi = '10.4103/0974-2077.123412'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_67_2024',
  NULLIF('10.25259/jcas_67_2024', ''),
  'Surgical Innovation: Ultrasound gel – A dermal filler training tool for young injectors',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_67_2024' OR iq.doi = '10.25259/jcas_67_2024'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.4103/0974-2077.158450',
  NULLIF('10.4103/0974-2077.158450', ''),
  'Treatment of laser resistant granuloma faciale with intralesional triamcinolone acetonide and 5-fluorouracil combination therapy',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.4103/0974-2077.158450' OR iq.doi = '10.4103/0974-2077.158450'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery'),
  'https://doi.org/10.25259/jcas_33_24',
  NULLIF('10.25259/jcas_33_24', ''),
  'Use of a ticket punch and adhesive transparent dressings for injecting botulinum toxin in hyperhidrosis',
  'open_access_cc_by_nc',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.25259/jcas_33_24' OR iq.doi = '10.25259/jcas_33_24'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2018.65',
  NULLIF('10.20517/2347-9264.2018.65', ''),
  'Autologous platelet rich plasma - an adjunct to early tangential excision and grafting in burns',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2018.65' OR iq.doi = '10.20517/2347-9264.2018.65'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2018.51',
  NULLIF('10.20517/2347-9264.2018.51', ''),
  'Low level laser as an adjunct therapy for second degree superficial burns',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2018.51' OR iq.doi = '10.20517/2347-9264.2018.51'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2023.11',
  NULLIF('10.20517/2347-9264.2023.11', ''),
  'Lymphatic ultrasound (D-CUPS) and multi-point ICG lymphography for successful LVA',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2023.11' OR iq.doi = '10.20517/2347-9264.2023.11'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2021.65',
  NULLIF('10.20517/2347-9264.2021.65', ''),
  'Skin and composite grafts',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2021.65' OR iq.doi = '10.20517/2347-9264.2021.65'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Plastic and Aesthetic Research'),
  'https://doi.org/10.20517/2347-9264.2022.145',
  NULLIF('10.20517/2347-9264.2022.145', ''),
  'Treatment of infected soft tissue loss',
  'open_access_cc_by',
  'nonpubmed_expanded_discovery_2026_06_14',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.20517/2347-9264.2022.145' OR iq.doi = '10.20517/2347-9264.2022.145'
);
