-- Direct publisher crawl source_registry inserts
-- Generated: 2026-06-12
-- Scope: non-PubMed publisher/journal-site crawl only.

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Journal of Clinical Dermatology & Therapy', 'Herald Scholarly Open Access', 'journal', 3, 'open_access_cc_by', 'https://www.heraldopenaccess.us/journals/journal-of-clinical-dermatology-therapy', 'publisher_crawl', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'SKIN: The Journal of Cutaneous Medicine', 'Dermatology Education Foundation', 'journal', 3, 'open_access_cc_by_nc', 'https://skin.dermsquared.com/skin', 'publisher_crawl', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Aesthetic Medicine', 'Mark Allen Group', 'industry', 4, 'unknown', 'https://aestheticmed.co.uk/', 'publisher_crawl', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine');
