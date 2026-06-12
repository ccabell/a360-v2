-- 02-03: Source Registry additions discovered during HA filler product compile
-- New sources encountered for Juvederm (Allergan), Restylane (Galderma), RHA (Teoxane/Revance)
-- Note: ingestible is a generated column — omitted
-- Note: no unique constraint on name — using WHERE NOT EXISTS pattern

-- ============================================================
-- NEW SOURCE_REGISTRY ENTRIES
-- ============================================================

-- Aesthetic Surgery Journal (ASJ)
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Aesthetic Surgery Journal (ASJ)',
  'Oxford University Press',
  'American Society for Aesthetic Plastic Surgeons (ASAPS)',
  'journal', 2, 'paywalled',
  'https://academic.oup.com/asj', '10.1093/asj', true,
  'Subscription journal; some OA articles available. High authority rank for injectable and surgical aesthetics.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal (ASJ)');

-- Journal of Drugs in Dermatology (JDD)
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Journal of Drugs in Dermatology (JDD)',
  'SanovaWorks',
  NULL,
  'journal', 2, 'open_access_cc_by',
  'https://www.jddonline.com', '10.36849/JDD', true,
  'Most articles available OA on JDD Online and PMC. High practical authority for injectable products.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Drugs in Dermatology (JDD)');

-- Dermatologic Surgery — ASDS official journal
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Dermatologic Surgery',
  'Lippincott Williams & Wilkins',
  'American Society for Dermatologic Surgery (ASDS)',
  'journal', 2, 'paywalled',
  'https://journals.lww.com/dermatologicsurgery', '10.1097/DSS', true,
  'Subscription. Some OA available. High authority for procedural and injectable dermatology.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery');

-- Journal of Cosmetic Dermatology (Wiley)
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Journal of Cosmetic Dermatology',
  'Wiley',
  'International Academy of Cosmetic Dermatology (IACD)',
  'journal', 2, 'paywalled',
  'https://onlinelibrary.wiley.com/journal/14732165', '10.1111/jocd', true,
  'Subscription; some hybrid OA articles available. Comprehensive coverage of HA fillers and injectables.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology');

-- Plastic and Reconstructive Surgery
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Plastic and Reconstructive Surgery',
  'Lippincott Williams & Wilkins',
  'American Society of Plastic Surgeons (ASPS)',
  'journal', 2, 'paywalled',
  'https://journals.lww.com/plasreconsurg', '10.1097/PRS', true,
  'Subscription. High-impact plastic surgery journal with strong injectable/facial anatomy content.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Reconstructive Surgery');

-- Journal of Clinical and Aesthetic Dermatology (JCAD)
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Journal of Clinical and Aesthetic Dermatology (JCAD)',
  'Matrix Medical Communications',
  NULL,
  'journal', 2, 'open_access_cc_by',
  'https://jcadonline.com', NULL, true,
  'Full OA on PMC. Monthly. Practical evidence-based aesthetic dermatology — high priority for ingestion.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical and Aesthetic Dermatology (JCAD)');

-- Juvederm Voluma XC Prescribing Information (FDA label)
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Juvederm Voluma XC Prescribing Information (NDA 125474)',
  'Allergan Aesthetics / AbbVie',
  'FDA',
  'regulatory', 1, 'public_domain',
  'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/125474s012lbl.pdf', NULL, false,
  'FDA drug label — public domain. Contains FDA-reviewed safety and indication data. High priority.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Juvederm Voluma XC Prescribing Information (NDA 125474)');

-- Juvederm Vollure XC Prescribing Information
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Juvederm Vollure XC Prescribing Information (NDA 125474/S-016)',
  'Allergan Aesthetics / AbbVie',
  'FDA',
  'regulatory', 1, 'public_domain',
  'https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/125474s016lbl.pdf', NULL, false,
  'FDA drug label — public domain. Vollure 2017 NLF/perioral approval.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Juvederm Vollure XC Prescribing Information (NDA 125474/S-016)');

-- Skinvive by Juvederm 510k clearance
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Skinvive by Juvederm FDA 510k K220481 (2023)',
  'Allergan Aesthetics / AbbVie',
  'FDA',
  'regulatory', 1, 'public_domain',
  'https://www.accessdata.fda.gov/cdrh_docs/pdf22/K220481.pdf', NULL, false,
  'FDA 510k clearance document — public domain. First US FDA-cleared intradermal HA skin quality product.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Skinvive by Juvederm FDA 510k K220481 (2023)');

-- Restylane Lyft FDA PMA
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Restylane Lyft FDA PMA P020023 (cheeks 2015, hands 2018)',
  'Galderma Laboratories',
  'FDA',
  'regulatory', 1, 'public_domain',
  'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P020023', NULL, false,
  'FDA PMA with supplements — public domain. Multi-indication: cheeks, hands, NLF.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Restylane Lyft FDA PMA P020023 (cheeks 2015, hands 2018)');

-- RHA Redensity FDA 510k
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'RHA Redensity FDA 510k K183782 (2020)',
  'Teoxane SA / Revance Aesthetics',
  'FDA',
  'regulatory', 1, 'public_domain',
  'https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183782.pdf', NULL, false,
  'FDA 510k clearance — perioral rhytids. First RHA-technology product cleared in US.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'RHA Redensity FDA 510k K183782 (2020)');

-- Journal of the European Academy of Dermatology and Venereology (JEADV)
INSERT INTO source_registry (name, publisher, society, source_kind, authority_rank, rights_class,
  base_url, doi_prefix, pubmed_indexed, access_notes, added_by, status)
SELECT
  'Journal of the European Academy of Dermatology and Venereology (JEADV)',
  'Wiley',
  'European Academy of Dermatology and Venereology (EADV)',
  'journal', 2, 'paywalled',
  'https://onlinelibrary.wiley.com/journal/14683083', '10.1111/j.1468-3083', true,
  'Subscription; hybrid OA available. Strong European dermatology/aesthetics content, including filler mechanism studies.',
  'discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of the European Academy of Dermatology and Venereology (JEADV)');

-- ============================================================
-- INGESTION QUEUE — OA and public domain sources for post-demo ingestion
-- ============================================================

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  id,
  'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/125474s012lbl.pdf',
  NULL,
  'Juvederm Voluma XC Prescribing Information (NDA 125474) — FDA public domain',
  'public_domain',
  'ha_filler_product_compile_02_03',
  'queued'
FROM source_registry WHERE name = 'Juvederm Voluma XC Prescribing Information (NDA 125474)'
ON CONFLICT DO NOTHING;

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  id,
  'https://www.accessdata.fda.gov/cdrh_docs/pdf22/K220481.pdf',
  NULL,
  'Skinvive by Juvederm FDA 510k K220481 (2023) — public domain',
  'public_domain',
  'ha_filler_product_compile_02_03',
  'queued'
FROM source_registry WHERE name = 'Skinvive by Juvederm FDA 510k K220481 (2023)'
ON CONFLICT DO NOTHING;

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  id,
  'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P020023',
  NULL,
  'Restylane Lyft FDA PMA P020023 — public domain',
  'public_domain',
  'ha_filler_product_compile_02_03',
  'queued'
FROM source_registry WHERE name = 'Restylane Lyft FDA PMA P020023 (cheeks 2015, hands 2018)'
ON CONFLICT DO NOTHING;

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  id,
  'https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183782.pdf',
  NULL,
  'RHA Redensity FDA 510k K183782 (2020) — public domain',
  'public_domain',
  'ha_filler_product_compile_02_03',
  'queued'
FROM source_registry WHERE name = 'RHA Redensity FDA 510k K183782 (2020)'
ON CONFLICT DO NOTHING;

-- JDD OA articles (open access on PMC)
INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  id,
  'https://pubmed.ncbi.nlm.nih.gov/30543521/',
  '10.36849/JDD.2018.3855',
  'Gold M et al. JDD 2018 — Restylane Lyft hand rejuvenation FDA study (OA via JDD)',
  'open_access_cc_by',
  'ha_filler_product_compile_02_03',
  'queued'
FROM source_registry WHERE name = 'Journal of Drugs in Dermatology (JDD)'
ON CONFLICT DO NOTHING;
