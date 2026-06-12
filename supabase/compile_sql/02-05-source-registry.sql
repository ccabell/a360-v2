-- 02-05: Source Registry additions from energy device compile
-- New journals discovered during energy device research
-- All inserted as status='review'; ingestible sources also queued in ingestion_queue

-- ============================================================
-- SOURCE REGISTRY — new entries
-- ============================================================

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, doi_prefix, added_by, status, notes)
SELECT v.name, v.publisher, v.source_kind, v.authority_rank, v.rights_class::text, v.base_url, v.doi_prefix, 'discovery', 'review', v.notes
FROM (VALUES
  ('Lasers in Surgery and Medicine', 'Wiley', 'journal', 8, 'paywalled', 'https://onlinelibrary.wiley.com/journal/10969101', '10.1002/lsm', 'Peer-reviewed; RF microneedling, laser resurfacing, energy device clinical studies'),
  ('Journal of Cosmetic and Laser Therapy', 'Taylor & Francis', 'journal', 7, 'paywalled', 'https://www.tandfonline.com/journals/ijcl20', '10.1080/14764172', 'Covers cosmetic laser/light therapies including Q-switched, Hollywood Peel protocols'),
  ('Dermatologic Surgery', 'Lippincott Williams & Wilkins', 'journal', 8, 'paywalled', 'https://journals.lww.com/dermatologicsurgery/pages/default.aspx', '10.1097/DSS', 'American Society for Dermatologic Surgery; covers all device and injectable procedures'),
  ('Aesthetic Surgery Journal', 'Oxford University Press', 'journal', 9, 'paywalled', 'https://academic.oup.com/asj', '10.1093/asj', 'ASAPS official journal; injectables, body contouring, energy devices, RCT coverage'),
  ('Clinical, Cosmetic and Investigational Dermatology', 'Dove Medical Press', 'journal', 6, 'open_access_cc_by', 'https://www.dovepress.com/clinical-cosmetic-and-investigational-dermatology-journal', '10.2147/CCID', 'Open access; practical aesthetic dermatology; RF microneedling series'),
  ('Sofwave Medical 510k K201789', 'Sofwave Medical', 'regulatory', 1, 'public_domain', 'https://www.accessdata.fda.gov/cdrh_docs/pdf20/K201789.pdf', NULL, 'FDA 510k for Sofwave SUPERB; SUPERB technology, clinical data, indicated uses'),
  ('InMode 510k K192271 (Morpheus8)', 'InMode', 'regulatory', 1, 'public_domain', 'https://www.accessdata.fda.gov/cdrh_docs/pdf19/K192271.pdf', NULL, 'FDA 510k for Morpheus8; subdermal adipose remodeling and skin resurfacing clearance'),
  ('Ultherapy 510k K101445 (Merz)', 'Merz Aesthetics', 'regulatory', 1, 'public_domain', 'https://www.accessdata.fda.gov/cdrh_docs/pdf10/K101445.pdf', NULL, 'FDA 510k for Ultherapy; unique brow lift clearance; SMAS-level MFU-V data'),
  ('Lutronic Hollywood Spectra 510k K133029', 'Lutronic', 'regulatory', 1, 'public_domain', 'https://www.accessdata.fda.gov/cdrh_docs/pdf13/K133029.pdf', NULL, 'FDA 510k for Hollywood Spectra Q-switched Nd:YAG; pigmented lesion and tattoo removal clearance'),
  ('Journal of Cutaneous and Aesthetic Surgery', 'Medknow', 'journal', 6, 'open_access_cc_by', 'https://www.jcasonline.com/', '10.4103/0974-2077', 'Open access; covers PIH in laser treatment, Fitzpatrick safety, Indian patient data')
) AS v(name, publisher, source_kind, authority_rank, rights_class, base_url, doi_prefix, notes)
WHERE NOT EXISTS (
  SELECT 1 FROM source_registry sr WHERE sr.name = v.name
);

-- ============================================================
-- INGESTION QUEUE — ingestible sources (OA/public_domain only)
-- ============================================================

INSERT INTO ingestion_queue (source_registry_id, status, priority, notes)
SELECT sr.id, 'queued', 'high', 'Public domain FDA 510k; energy device clearance documentation; direct relevance to compiled products'
FROM source_registry sr
WHERE sr.name IN (
  'Sofwave Medical 510k K201789',
  'InMode 510k K192271 (Morpheus8)',
  'Ultherapy 510k K101445 (Merz)',
  'Lutronic Hollywood Spectra 510k K133029'
)
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.source_registry_id = sr.id
);

INSERT INTO ingestion_queue (source_registry_id, status, priority, notes)
SELECT sr.id, 'queued', 'medium', 'Open access CC-BY; energy device series, Fitzpatrick safety data'
FROM source_registry sr
WHERE sr.name IN (
  'Clinical, Cosmetic and Investigational Dermatology',
  'Journal of Cutaneous and Aesthetic Surgery'
)
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.source_registry_id = sr.id
);
