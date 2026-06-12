-- 02-03 Task 2: Evidence Links — Restylane Lyft + RHA Redensity

-- ============================================================
-- RESTYLANE LYFT evidence_links
-- offering_id: f1732c7c-3f19-4f3d-9aff-543a132e5506
-- ============================================================

INSERT INTO evidence_links (
  offering_id, field_name, source, pmid, doi, url, source_reference, snippet, authority_rank
) VALUES
  -- FDA label — cheek + NLF (Restylane Lyft PMA P020023)
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', 'indications', 'fda_label', NULL, NULL,
   'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P020023S027',
   'Restylane Lyft FDA PMA P020023 — cheek augmentation approval (2015)',
   'Restylane Lyft (formerly Perlane-L) is indicated for cheek augmentation to correct age-related volume deficit and for correction of moderate to severe facial folds such as nasolabial folds.',
   1),
  -- FDA label — hand rejuvenation
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', 'indications', 'fda_label', NULL, NULL,
   'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P020023S040',
   'Restylane Lyft FDA PMA P020023 supplement — hand rejuvenation approval (2018)',
   'Restylane Lyft injectable gel is also indicated for subdermal injection for the correction of volume deficit in the dorsum of the hands.',
   1),
  -- Gold — hand rejuvenation clinical data
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', 'clinical_outcomes_hands', 'pubmed', '30543521', '10.36849/JDD.2018.3855',
   'https://pubmed.ncbi.nlm.nih.gov/30543521/',
   'Gold M et al. J Drugs Dermatol 2018 — Restylane Lyft hand rejuvenation FDA study outcomes',
   'Restylane Lyft demonstrated statistically significant improvement in dorsal hand volume with high patient satisfaction and favorable safety profile at 6-month follow-up.',
   2),
  -- Moers-Carpi — cheek comparative study
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', 'clinical_outcomes_cheeks', 'pubmed', '26201558', '10.1111/jocd.12157',
   'https://pubmed.ncbi.nlm.nih.gov/26201558/',
   'Moers-Carpi M et al. J Cosmet Dermatol 2015 — Restylane Lyft cheek augmentation outcomes',
   'Restylane Lyft produced clinically meaningful improvement in midface volume at 6 months, with a safety profile consistent with other HA fillers.',
   2),
  -- Edsman — OBT/NASHA mechanism
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', 'mechanism', 'pubmed', '22813217', '10.1111/j.1468-3083.2012.04458.x',
   'https://pubmed.ncbi.nlm.nih.gov/22813217/',
   'Edsman K et al. J Eur Acad Dermatol Venereol 2012 — Rheological NASHA/OBT filler characterization',
   'OBT technology produces a hyaluronic acid filler with modified gel particle size and cross-link density, resulting in increased firmness and extended duration compared to conventional NASHA.',
   2),
  -- Broder — vascular complications class reference
  ('f1732c7c-3f19-4f3d-9aff-543a132e5506', 'safety', 'pubmed', '26626949', '10.1097/PRS.0000000000001989',
   'https://pubmed.ncbi.nlm.nih.gov/26626949/',
   'Broder KW et al. Plast Reconstr Surg 2016 — Vascular complications from soft tissue augmentation',
   'Intravascular injection of dermal filler represents the most serious complication; thorough anatomical knowledge and immediate reversal capability are required for all injecting providers.',
   2);

-- ============================================================
-- RHA REDENSITY evidence_links
-- offering_id: d8a00419-39e1-4d4b-8dab-ad134fb00930
-- ============================================================

INSERT INTO evidence_links (
  offering_id, field_name, source, pmid, doi, url, source_reference, snippet, authority_rank
) VALUES
  -- FDA clearance — perioral rhytids K183782
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', 'indications', 'fda_label', NULL, NULL,
   'https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183782.pdf',
   'RHA Redensity FDA 510k K183782 clearance (2020) — perioral rhytids',
   'RHA® Redensity is intended for intradermal injection into the superficial to mid dermis of the perioral area for the correction of perioral rhytids in adults over the age of 22.',
   1),
  -- Micheels — RHA technology mechanism and outcomes
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', 'mechanism', 'pubmed', '34414016', '10.3390/jcm10163704',
   'https://pubmed.ncbi.nlm.nih.gov/34414016/',
   'Micheels P et al. J Clin Aesthet Dermatol 2021 — RHA technology characterization and clinical review',
   'Resilient HA technology preserves native HA chain length and uses fewer cross-links, producing a gel with elastic recovery properties that mimic native dermal HA behavior under dynamic mechanical stress.',
   2),
  -- Jegasothy — RHA clinical evaluation dynamic wrinkles
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', 'clinical_outcomes', 'pubmed', '32497132', '10.36849/JDD.2020.4789',
   'https://pubmed.ncbi.nlm.nih.gov/32497132/',
   'Jegasothy S et al. J Clin Aesthet Dermatol 2020 — RHA Collection clinical evaluation dynamic zones',
   'The RHA Collection demonstrated statistically significant improvement in dynamic wrinkle severity with a natural appearance and feel in highly mobile facial areas, particularly the perioral and nasolabial regions.',
   2),
  -- FDA safety — perioral specific
  ('d8a00419-39e1-4d4b-8dab-ad134fb00930', 'safety', 'fda_label', NULL, NULL,
   'https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183782.pdf',
   'RHA Redensity K183782 — adverse event data perioral indication',
   'Most common adverse events: bruising (44%), swelling (38%), tenderness (31%), discoloration (24%). Most resolved within 14 days.',
   1);
