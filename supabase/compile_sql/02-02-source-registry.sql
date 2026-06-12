-- 02-02 Source Registry: Log all reputable sources encountered during category compile
-- Per BATCH_SOURCE_LOGGING_ADDENDUM: insert source_registry + ingestion_queue for OA/public_domain sources
-- Deduplicate by name (check existing 14 rows first — they already have FDA labels, ASJ, JCAD, etc.)

-- Already in source_registry (from prior batch): FDA device/drug labels, DailyMed, PMC, ASJ Open Forum,
-- PRS Global Open, JPRAS Open, Aesthetic Plastic Surgery, JCLT, Dermatologic Surgery, JAAD,
-- Lasers in Surgery and Medicine, Facial Plastic Surgery & Aesthetic Medicine, AAD/BAD/EADV Guidelines,
-- Aesthetic Surgery Journal

-- NEW sources discovered during 02-02 category compile:

INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class, base_url, doi_prefix, added_by, status)
VALUES

-- PubMed foundational laser paper (Anderson & Parrish 1983 - Science)
('Science (AAAS)', 'American Association for the Advancement of Science', 'AAAS', 'journal', 3,
 'paywalled', 'https://www.science.org', '10.1126/science', 'discovery', 'review'),

-- Journal of Clinical and Aesthetic Dermatology (JCAD) - OA on PMC, authority 8/10 per BATCH_SOURCE_LOGGING_ADDENDUM
('Journal of Clinical and Aesthetic Dermatology (JCAD)', 'Matrix Medical Communications', NULL, 'journal', 2,
 'open_access_cc_by', 'https://jcadonline.com', '10.36849/jjcd', 'discovery', 'review'),

-- Dermatology and Therapy (Springer Adis) - OA CC-BY-NC, authority 7/10
('Dermatology and Therapy', 'Springer / Adis', NULL, 'journal', 2,
 'open_access_cc_by_nc', 'https://link.springer.com/journal/13555', '10.1007/s13555', 'discovery', 'review'),

-- Cureus - OA, authority 6/10
('Cureus', 'Springer Nature', NULL, 'journal', 3,
 'open_access_cc_by', 'https://www.cureus.com', '10.7759/cureus', 'discovery', 'review'),

-- Saudi Pharmaceutical Journal (Bukhari 2018 HA mechanism)
('Saudi Pharmaceutical Journal', 'Elsevier', NULL, 'journal', 3,
 'open_access_cc_by_nc', 'https://www.sciencedirect.com/journal/saudi-pharmaceutical-journal', '10.1016/j.jsps', 'discovery', 'review'),

-- Journal of Cosmetic Dermatology
('Journal of Cosmetic Dermatology', 'Wiley', NULL, 'journal', 2,
 'paywalled', 'https://onlinelibrary.wiley.com/journal/14733080', '10.1111/jocd', 'discovery', 'review'),

-- HIV Medicine (PLLA nodule study)
('HIV Medicine', 'Wiley / BHIVA', 'BHIVA', 'journal', 3,
 'paywalled', 'https://onlinelibrary.wiley.com/journal/14681293', '10.1111/j.1468-1293', 'discovery', 'review'),

-- Annals of Plastic Surgery (general aesthetic surgery)
('Annals of Plastic Surgery', 'Wolters Kluwer', NULL, 'journal', 2,
 'paywalled', 'https://journals.lww.com/annalsplasticsurgery', '10.1097/SAP', 'discovery', 'review'),

-- JAMA Dermatology (PAH CoolSculpting paper - Singh 2015)
('JAMA Dermatology', 'American Medical Association', 'AMA', 'journal', 2,
 'paywalled', 'https://jamanetwork.com/journals/jamadermatology', '10.1001/jamadermatol', 'discovery', 'review'),

-- Journal of Drugs in Dermatology (JDD)
('Journal of Drugs in Dermatology', 'SanovaWorks', NULL, 'journal', 2,
 'paywalled', 'https://jddonline.com', '10.36849/jdd', 'discovery', 'review'),

-- Plastic and Reconstructive Surgery (PRS)
('Plastic and Reconstructive Surgery', 'Wolters Kluwer / ASPS', 'ASPS', 'journal', 2,
 'paywalled', 'https://journals.lww.com/plasreconsurg', '10.1097/PRS', 'discovery', 'review'),

-- Archives of Facial Plastic Surgery (Sclafani nodule paper)
('Archives of Facial Plastic Surgery', 'American Medical Association', 'AAFPRS', 'journal', 2,
 'paywalled', 'https://jamanetwork.com/journals/jamafacialplasticsurgery', '10.1001/archfacial', 'discovery', 'review'),

-- Kybella prescribing information / FDA NDA
('Kybella (deoxycholic acid) FDA Label / NDA 206333', 'AbbVie / FDA', 'FDA', 'regulatory', 1,
 'public_domain', 'https://www.accessdata.fda.gov/scripts/cder/daf/', NULL, 'discovery', 'review'),

-- Sculptra Aesthetic FDA label
('Sculptra Aesthetic Prescribing Information', 'Galderma / FDA', 'FDA', 'regulatory', 1,
 'public_domain', 'https://www.accessdata.fda.gov/scripts/cder/daf/', NULL, 'discovery', 'review'),

-- CoolSculpting Elite FDA 510k
('CoolSculpting Elite 510k Clearance Documentation', 'AbbVie / FDA', 'FDA', 'regulatory', 1,
 'public_domain', 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/', NULL, 'discovery', 'review'),

-- FDA Safety Communication: PAH
('FDA Safety Communication: Rare Adverse Event (PAH) Associated with Cryolipolysis', 'FDA', 'FDA', 'regulatory', 1,
 'public_domain', 'https://www.fda.gov/medical-devices/safety-communications/', NULL, 'discovery', 'review'),

-- Morpheus8 / InMode FDA 510k
('Morpheus8 510k Clearance Documentation (InMode)', 'InMode / FDA', 'FDA', 'regulatory', 1,
 'public_domain', 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/', NULL, 'discovery', 'review'),

-- Sofwave SUPERB FDA 510k
('Sofwave SUPERB 510k Clearance Documentation', 'Sofwave Medical / FDA', 'FDA', 'regulatory', 1,
 'public_domain', 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/', NULL, 'discovery', 'review'),

-- Ultherapy PRIME FDA 510k
('Ultherapy PRIME 510k Clearance Documentation (Merz)', 'Merz Aesthetics / FDA', 'FDA', 'regulatory', 1,
 'public_domain', 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/', NULL, 'discovery', 'review'),

-- Hollywood Spectra FDA 510k
('Hollywood Spectra 510k Clearance Documentation (Lutronic)', 'Lutronic / FDA', 'FDA', 'regulatory', 1,
 'public_domain', 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/', NULL, 'discovery', 'review');

-- Now add ingestion_queue rows for public_domain/OA sources
-- (sources that should be ingested post-demo)

INSERT INTO ingestion_queue (source_id, url, title, rights_class, discovered_during, status)
SELECT id, base_url,
  name || ' - open access journal for ingestion queue',
  rights_class,
  '02-02-category-dossiers',
  'queued'
FROM source_registry
WHERE added_by = 'discovery'
AND status = 'review'
AND rights_class IN ('open_access_cc_by', 'open_access_cc_by_nc', 'public_domain')
AND name NOT IN (
  -- Avoid inserting sources already queued (in case this runs again)
  SELECT sr2.name FROM source_registry sr2
  JOIN ingestion_queue iq ON iq.source_id = sr2.id
)
ON CONFLICT DO NOTHING;
