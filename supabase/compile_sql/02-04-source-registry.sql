-- 02-04 Source Registry additions
-- New reputable sources encountered during biostimulator + body contouring compile
-- All land status='review' per BATCH_SOURCE_LOGGING_ADDENDUM.md

INSERT INTO source_registry (name, publisher, source_kind, authority_rank, rights_class, base_url, doi_prefix, added_by, status)
VALUES
  -- Journal of the European Academy of Dermatology and Venereology (JEADV) — Vleggaar PLLA paper
  ('Journal of the European Academy of Dermatology and Venereology', 'Wiley', 'journal', 2, 'paywalled',
   'https://onlinelibrary.wiley.com/journal/14683083', '10.1111/j.1468-3083', 'discovery', 'review'),
  -- Journal of Cosmetic and Laser Therapy — Goldberg cryolipolysis/PLLA
  ('Journal of Cosmetic and Laser Therapy', 'Taylor & Francis', 'journal', 2, 'paywalled',
   'https://www.tandfonline.com/loi/ijcl20', '10.3109/14764172', 'discovery', 'review'),
  -- Lasers in Surgery and Medicine — Manstein 2008 / Dierickx 2013 cryolipolysis papers
  ('Lasers in Surgery and Medicine', 'Wiley', 'journal', 2, 'paywalled',
   'https://onlinelibrary.wiley.com/journal/10969101', '10.1002/lsm', 'discovery', 'review'),
  -- JAMA Dermatology — Singh PAH paper 2019
  ('JAMA Dermatology', 'American Medical Association', 'journal', 2, 'paywalled',
   'https://jamanetwork.com/journals/jamadermatology', '10.1001/jamadermatol', 'discovery', 'review'),
  -- Plastic and Reconstructive Surgery — Ascher REFINE trials, Ingargiola systematic review
  -- (may already exist from 02-02 — use ON CONFLICT DO NOTHING pattern)
  ('Plastic and Reconstructive Surgery (PRS)', 'Wolters Kluwer / ASP', 'journal', 2, 'paywalled',
   'https://journals.lww.com/plasreconsurg', '10.1097/PRS', 'discovery', 'review'),
  -- Dermatologic Surgery — Lowe papule prevention / Vleggaar long-term data
  ('Dermatologic Surgery', 'Wiley', 'journal', 2, 'paywalled',
   'https://onlinelibrary.wiley.com/journal/15244725', '10.1097/01.DSS', 'discovery', 'review'),
  -- FDA Safety Communication 2019 — PAH
  ('FDA Medical Device Safety Communication — Cryolipolysis PAH', 'U.S. Food and Drug Administration', 'regulatory', 1, 'public_domain',
   'https://www.fda.gov/medical-devices/letters-health-care-providers/september-2019-health-care-provider-letter-rare-side-effect-cryolipolysis',
   NULL, 'discovery', 'review'),
  -- Kybella FDA Label NDA 206333
  ('Kybella FDA Label NDA 206333', 'U.S. Food and Drug Administration / Allergan', 'regulatory', 1, 'public_domain',
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/206333lbl.pdf',
   NULL, 'discovery', 'review'),
  -- Sculptra Aesthetic FDA Label NDA 021195
  ('Sculptra Aesthetic FDA Label NDA 021195', 'U.S. Food and Drug Administration / Galderma', 'regulatory', 1, 'public_domain',
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2009/021195s010lbl.pdf',
   NULL, 'discovery', 'review'),
  -- Journal of Drugs in Dermatology — Palm biostimulator comparison / Thuangtong DCA
  -- (may already exist)
  ('Journal of Drugs in Dermatology', 'JDD Publisher', 'journal', 2, 'paywalled',
   'https://jddonline.com/', '10.1111/j.1527-2729', 'discovery', 'review')
ON CONFLICT (name) DO NOTHING;

-- Ingestion queue — public domain sources immediately ingestible
INSERT INTO ingestion_queue (source_registry_name, source_url, priority, status, notes)
VALUES
  ('FDA Safety Communication — Cryolipolysis PAH', 'https://www.fda.gov/medical-devices/letters-health-care-providers/september-2019-health-care-provider-letter-rare-side-effect-cryolipolysis', 1, 'queued', 'Public domain FDA safety communication — PAH risk; high priority for agent safety floor'),
  ('Kybella FDA Label NDA 206333', 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/206333lbl.pdf', 1, 'queued', 'Public domain FDA label — primary indication and safety floor for Kybella'),
  ('Sculptra Aesthetic FDA Label NDA 021195', 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2009/021195s010lbl.pdf', 1, 'queued', 'Public domain FDA label — primary indication, safety, reconstitution protocol for Sculptra')
ON CONFLICT DO NOTHING;
