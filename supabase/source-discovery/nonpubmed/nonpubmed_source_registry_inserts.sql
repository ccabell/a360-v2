-- Non-PubMed source_registry inserts
-- Generated: 2026-06-12
-- Scope: outside PubMed discovery only; no PubMed E-utilities or PubMed URLs.

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Journal of Clinical and Cosmetic Dermatology', 'Sci Forschen', 'journal', 3, 'open_access_cc_by', 'https://sciforschenonline.org/journals/clinical-cosmetic-dermatology/', 'nonpubmed_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Aesthetic Medicine', 'Mark Allen Group', 'journal', 4, 'unknown', 'https://aestheticmed.co.uk/', 'nonpubmed_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Journal of Aesthetic Nursing', 'Mark Allen Group', 'journal', 4, 'unknown', 'https://www.magonlinelibrary.com/journal/joan', 'nonpubmed_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Cosmetic Surgery and Medicine', 'unknown', 'journal', 4, 'unknown', '', 'nonpubmed_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetic Surgery and Medicine');
