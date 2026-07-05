-- Expanded non-PubMed source_registry inserts
-- Generated: 2026-06-14
-- Scope: expanded Crossref DOI metadata discovery only; no PubMed harvesting.

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Clinical, Cosmetic and Investigational Dermatology', 'Dove Medical Press / Taylor & Francis', 'journal', 2, 'open_access_cc_by_nc', 'https://www.dovepress.com/clinical-cosmetic-and-investigational-dermatology-journal', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Clinical, Cosmetic and Investigational Dermatology');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Journal of Cutaneous and Aesthetic Surgery', 'Scientific Scholar / Association of Cutaneous Surgeons of India', 'journal', 3, 'open_access_cc_by_nc', 'https://jcasonline.com/', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cutaneous and Aesthetic Surgery');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Cosmetics', 'MDPI', 'journal', 4, 'open_access_cc_by', 'https://www.mdpi.com/journal/cosmetics', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetics');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Journal of Aesthetic Nursing', 'Mark Allen Group', 'journal', 4, 'unknown', 'https://www.magonlinelibrary.com/journal/joan', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Facial Plastic Surgery', 'Thieme', 'journal', 2, 'unknown', 'https://www.thieme-connect.com/products/ejournals/journal/10.1055/s-00000028', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Facial Plastic Surgery & Aesthetic Medicine', 'Mary Ann Liebert', 'journal', 2, 'unknown', 'https://www.liebertpub.com/loi/fpsam', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Facial Plastic Surgery & Aesthetic Medicine');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Plastic and Aesthetic Research', 'OAE Publishing', 'journal', 3, 'open_access_cc_by', 'https://www.oaepublish.com/par', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Plastic and Aesthetic Research');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Aesthetic Surgery Journal', 'Oxford University Press', 'journal', 2, 'unknown', 'https://academic.oup.com/asj', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Dermatologic Surgery', 'Wolters Kluwer / ASDS', 'journal', 2, 'unknown', 'https://journals.lww.com/dermatologicsurgery', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Dermatologic Surgery');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Journal of Cosmetic Dermatology', 'Wiley', 'journal', 2, 'unknown', 'https://onlinelibrary.wiley.com/journal/14732165', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic Dermatology');

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, added_by, status)
SELECT 'Journal of Cosmetic and Laser Therapy', 'Taylor & Francis', 'journal', 3, 'unknown', 'https://www.tandfonline.com/journals/ijcl20', 'nonpubmed_expanded_discovery', 'review'
WHERE NOT EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Cosmetic and Laser Therapy');
