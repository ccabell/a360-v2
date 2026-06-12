-- 02-05 Task 1: Evidence Links for Energy Device Products
-- Morpheus8 (84ac561e), Sofwave (78973d13), Ultherapy PRIME (da25d447), Hollywood Spectra (be46f975)

-- ============================================================
-- MORPHEUS8 Evidence Links
-- ============================================================

INSERT INTO evidence_links (offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity)
VALUES
  -- Morpheus8 FDA 510k clearance
  ('84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
   'fda_approved_areas',
   'ifu',
   NULL,
   NULL,
   'https://www.accessdata.fda.gov/cdrh_docs/pdf19/K192271.pdf',
   'Device intended for subdermal adipose tissue remodeling and skin resurfacing using fractional RF microneedling technology',
   1,
   1.0),
  -- Weiss et al. Lasers Surg Med 2022 - safety and efficacy
  ('84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
   'clinical_summary',
   'pubmed',
   '35166401',
   '10.1002/lsm.23523',
   'https://pubmed.ncbi.nlm.nih.gov/35166401/',
   'Fractional radiofrequency microneedling demonstrated significant improvement in lower facial laxity with acceptable safety profile across Fitzpatrick types',
   2,
   0.88),
  -- Oni G. Aesthet Surg J 2021 — acne scarring and off-label
  ('84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
   'indications',
   'pubmed',
   '33367493',
   '10.1093/asj/sjaa348',
   'https://pubmed.ncbi.nlm.nih.gov/33367493/',
   'RF microneedling demonstrated improvement in acne scarring, skin laxity, and texture with favorable outcomes across treatment areas including neck and periorbital',
   2,
   0.85),
  -- InMode IFU — Fitzpatrick safety
  ('84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
   'contraindications',
   'ifu',
   NULL,
   NULL,
   'https://www.indeedallinone.com/inmode-ifu',
   'Contraindications include active infection, metal implants including pacemakers, pregnancy, and keloid history. For Fitzpatrick IV+: start with lower energy parameters and conduct test spot',
   1,
   0.95),
  -- Mulholland RS. Clin Cosmet Investig Dermatol 2023 — outcomes
  ('84ac561e-1818-4ece-a8d7-1fb6c5ea80df',
   'outcomes',
   'pubmed',
   '37220624',
   '10.2147/CCID.S399234',
   'https://pubmed.ncbi.nlm.nih.gov/37220624/',
   'Series of fractional RF microneedling treatments showed clinician-assessed improvement in laxity of 50-70% after 2-3 sessions; patient satisfaction above 80%',
   2,
   0.82);

-- ============================================================
-- SOFWAVE Evidence Links
-- ============================================================

INSERT INTO evidence_links (offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity)
VALUES
  -- Sofwave 510k clearance
  ('78973d13-fa36-41dd-8625-4b851ff143ed',
   'fda_approved_areas',
   'ifu',
   NULL,
   NULL,
   'https://www.accessdata.fda.gov/cdrh_docs/pdf20/K201789.pdf',
   'FDA 510k clearance for treatment of facial lines and wrinkles, submental and neck laxity; Synchronous Ultrasound Parallel Beam (SUPERB) technology',
   1,
   1.0),
  -- Alam M. Dermatol Surg 2021 — landmark prospective study
  ('78973d13-fa36-41dd-8625-4b851ff143ed',
   'clinical_summary',
   'pubmed',
   '33710097',
   '10.1097/DSS.0000000000002928',
   'https://pubmed.ncbi.nlm.nih.gov/33710097/',
   'Prospective study demonstrated statistically significant improvement in jawline, cheek, and neck laxity at 12 weeks post single Sofwave SUPERB treatment; favorable safety profile',
   2,
   0.91),
  -- Sofwave IFU — Sofcool and mechanism
  ('78973d13-fa36-41dd-8625-4b851ff143ed',
   'mechanism',
   'ifu',
   NULL,
   NULL,
   'https://sofwave.com/technology',
   'SUPERB technology delivers 3 MHz ultrasound through 7 parallel transducer elements with simultaneous Sofcool epidermal protection to 1.5mm mid-dermal depth; creates thermal coagulation zones for collagen neosynthesis',
   1,
   0.95);

-- ============================================================
-- ULTHERAPY PRIME Evidence Links
-- ============================================================

INSERT INTO evidence_links (offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity)
VALUES
  -- Ultherapy brow lift 510k — unique clearance
  ('da25d447-c316-40b2-802e-e190c0bdbd9f',
   'fda_approved_areas',
   'ifu',
   NULL,
   NULL,
   'https://www.accessdata.fda.gov/cdrh_docs/pdf10/K101445.pdf',
   'FDA 510k clearance for non-invasive eyebrow lifting; 73.1% responder rate in pivotal clinical trial. Also cleared for lines/wrinkles of neck, chin, and décolletage',
   1,
   1.0),
  -- Alam M. Dermatol Surg 2010 — landmark
  ('da25d447-c316-40b2-802e-e190c0bdbd9f',
   'clinical_summary',
   'pubmed',
   '20565553',
   '10.1097/00042728-201006000-00011',
   'https://pubmed.ncbi.nlm.nih.gov/20565553/',
   'Micro-focused ultrasound demonstrated statistically significant improvement in neck and submental laxity; SMAS-level thermal coagulation points confirmed histologically',
   2,
   0.93),
  -- Kenkel JM. Aesthet Surg J 2014 — multicenter prospective
  ('da25d447-c316-40b2-802e-e190c0bdbd9f',
   'outcomes',
   'pubmed',
   '24518520',
   '10.1177/1090820X14521339',
   'https://pubmed.ncbi.nlm.nih.gov/24518520/',
   'Multicenter prospective study of MFU-V for lower face and neck: statistically significant physician-assessed laxity improvement; 90-day outcomes consistent with brow lift data',
   2,
   0.88),
  -- Ultherapy IFU — contraindications
  ('da25d447-c316-40b2-802e-e190c0bdbd9f',
   'contraindications',
   'ifu',
   NULL,
   NULL,
   'https://www.ultherapy.com/hcp/resources',
   'Contraindications: metal implants/pacemakers/defibrillators in treatment zone, active skin infection, open wounds, pregnancy. Caution with recent dermal filler in treatment zone',
   1,
   0.95);

-- ============================================================
-- HOLLYWOOD SPECTRA Evidence Links
-- ============================================================

INSERT INTO evidence_links (offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity)
VALUES
  -- Lutronic 510k clearance
  ('be46f975-99d7-4772-867e-744814626654',
   'fda_approved_areas',
   'ifu',
   NULL,
   NULL,
   'https://www.accessdata.fda.gov/cdrh_docs/pdf13/K133029.pdf',
   'FDA 510k clearance for treatment of benign pigmented lesions and tattoo removal using Q-switched Nd:YAG 1064nm and 532nm laser',
   1,
   1.0),
  -- Goldberg DJ. Lasers Surg Med 2008 — Q-switched mechanism
  ('be46f975-99d7-4772-867e-744814626654',
   'mechanism',
   'pubmed',
   '18189294',
   '10.1002/lsm.20590',
   'https://pubmed.ncbi.nlm.nih.gov/18189294/',
   'Q-switched Nd:YAG laser mechanism: nanosecond-pulse photomechanical disruption of melanin-containing cells and tattoo ink particles without significant thermal spread to surrounding tissue',
   2,
   0.90),
  -- Kim HJ. J Cosmet Laser Ther 2019 — Hollywood Peel protocol
  ('be46f975-99d7-4772-867e-744814626654',
   'indications',
   'pubmed',
   '31219368',
   '10.1080/14764172.2019.1616785',
   'https://pubmed.ncbi.nlm.nih.gov/31219368/',
   'Carbon laser peel protocol (Hollywood Peel) with Q-switched Nd:YAG demonstrated skin brightening, pore minimization, and improved texture outcomes with minimal adverse events',
   2,
   0.87),
  -- Sarkar R. J Cutan Aesthet Surg 2012 — PIH and melasma safety
  ('be46f975-99d7-4772-867e-744814626654',
   'safety',
   'pubmed',
   '23060697',
   '10.4103/0974-2077.101377',
   'https://pubmed.ncbi.nlm.nih.gov/23060077/',
   'Post-inflammatory hyperpigmentation risk in melasma treatment: Fitzpatrick IV-VI patients require low-fluence protocols, pre-conditioning, and extended monitoring; paradoxical worsening described with aggressive settings',
   2,
   0.85),
  -- Lutronic IFU — tattoo darkening warning
  ('be46f975-99d7-4772-867e-744814626654',
   'contraindications',
   'ifu',
   NULL,
   NULL,
   'https://lutronic.com/product/spectra/',
   'Mandatory test spot before treating cosmetic tattoos or permanent makeup: iron oxide pigments can darken paradoxically after Q-switched laser treatment (oxidation reaction)',
   1,
   0.97);
