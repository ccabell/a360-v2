-- 02-05 Task 2: Evidence Links for Neurotoxin Products + HydraFacial
-- Dysport (a7e1b29e), Jeuveau (8adda68a), Daxxify (007d98fd), Xeomin (92a05fe8), HydraFacial (28918bda)

-- ============================================================
-- DYSPORT Evidence Links
-- ============================================================

INSERT INTO evidence_links (offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity)
VALUES
  -- Dysport FDA label (NDA 125274)
  ('a7e1b29e-da10-40de-bea8-70d6e6624f43',
   'fda_approved_areas',
   'fda_label',
   NULL,
   NULL,
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/125274s110lbl.pdf',
   'Dysport (abobotulinumtoxinA) FDA-approved for glabellar lines in adults; 50 Units across 5 injection sites. Black Box Warning: distant spread of toxin effect',
   1,
   1.0),
  -- Carruthers J. - unit ratio Dysport vs Botox
  ('a7e1b29e-da10-40de-bea8-70d6e6624f43',
   'indications',
   'pubmed',
   '15754166',
   '10.1097/01.DSS.0000152406.10661.C8',
   'https://pubmed.ncbi.nlm.nih.gov/15754166/',
   'Comparative study of onabotulinumtoxinA and abobotulinumtoxinA: dose conversion ratio approximately 2.5:1 for glabellar treatment; diffusion pattern differences noted',
   2,
   0.88),
  -- Lactose allergy contraindication — FDA label
  ('a7e1b29e-da10-40de-bea8-70d6e6624f43',
   'contraindications',
   'fda_label',
   NULL,
   NULL,
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/125274s110lbl.pdf',
   'Contraindicated in patients with cow''s milk protein allergy (product contains trace lactose). Contraindicated in hypersensitivity to botulinum toxin',
   1,
   1.0);

-- ============================================================
-- JEUVEAU Evidence Links
-- ============================================================

INSERT INTO evidence_links (offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity)
VALUES
  -- Jeuveau FDA label (NDA 761085)
  ('8adda68a-9fd2-49ad-8852-641970135131',
   'fda_approved_areas',
   'fda_label',
   NULL,
   NULL,
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/761085s000lbl.pdf',
   'Jeuveau (prabotulinumtoxinA-xvfs) FDA-approved for temporary improvement of moderate to severe glabellar lines in adults. Black Box Warning: distant spread of toxin effect',
   1,
   1.0);

-- ============================================================
-- DAXXIFY Evidence Links
-- ============================================================

INSERT INTO evidence_links (offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity)
VALUES
  -- Daxxify FDA label (NDA 761162)
  ('007d98fd-58b5-4d20-be11-caf421c0dccb',
   'fda_approved_areas',
   'fda_label',
   NULL,
   NULL,
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/761162s000lbl.pdf',
   'Daxxify (daxibotulinumtoxinA-lanm) FDA-approved for moderate to severe glabellar lines. Recommended dose: 40 Units. Median duration approximately 24 weeks in pivotal trials',
   1,
   1.0),
  -- Bertucci V. Aesthet Surg J 2023 — real-world 6-month duration
  ('007d98fd-58b5-4d20-be11-caf421c0dccb',
   'outcomes',
   'pubmed',
   '36745645',
   '10.1093/asj/sjad034',
   'https://pubmed.ncbi.nlm.nih.gov/36745645/',
   'Real-world daxibotulinumtoxinA outcomes: median glabellar line improvement duration approximately 24 weeks; safety consistent with pivotal trial data; peptide excipient well-tolerated',
   2,
   0.89),
  -- SAKURA phase 3 trial data (FDA submission pubmed)
  ('007d98fd-58b5-4d20-be11-caf421c0dccb',
   'clinical_summary',
   'pubmed',
   '34558577',
   '10.1097/DSS.0000000000003203',
   'https://pubmed.ncbi.nlm.nih.gov/34558577/',
   'SAKURA 1 and 2 pivotal trials: daxibotulinumtoxinA met primary endpoint for glabellar line improvement; median duration 24 weeks; non-inferiority vs onabotulinumtoxinA in efficacy at peak',
   2,
   0.91);

-- ============================================================
-- XEOMIN Evidence Links
-- ============================================================

INSERT INTO evidence_links (offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity)
VALUES
  -- Xeomin FDA label (NDA 125360)
  ('92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
   'fda_approved_areas',
   'fda_label',
   NULL,
   NULL,
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2011/125360s000lbl.pdf',
   'Xeomin (incobotulinumtoxinA) FDA-approved for glabellar lines in adults. Product contains only 150kDa botulinum neurotoxin type A without complexing proteins',
   1,
   1.0),
  -- Naumann M. Mov Disord 2010 — immunogenicity advantage discussion
  ('92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
   'mechanism',
   'pubmed',
   '20437539',
   '10.1002/mds.23052',
   'https://pubmed.ncbi.nlm.nih.gov/20437539/',
   'Xeomin (free of complexing proteins) — theoretical immunogenicity reduction vs. products containing complexing proteins; clinical evidence for secondary non-response advantage discussed; sources differ',
   2,
   0.82),
  -- Dressler D. J Neural Transm 2019 — secondary non-response
  ('92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
   'deep_product',
   'pubmed',
   '30421052',
   '10.1007/s00702-018-1963-5',
   'https://pubmed.ncbi.nlm.nih.gov/30421052/',
   'Secondary non-response to botulinum toxin: complexing proteins as potential antigens; naked toxin formulations theoretically reduce immunogenic load; long-term comparative data limited',
   2,
   0.80);

-- ============================================================
-- HYDRAFACIAL Evidence Links (limited peer-review; use manufacturer + field practice)
-- ============================================================

INSERT INTO evidence_links (offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity)
VALUES
  -- BeautyHealth/manufacturer clinical data
  ('28918bda-787b-412a-9802-d3d9a00e6ab1',
   'mechanism',
   'manufacturer',
   NULL,
   NULL,
   'https://www.beautyhealth.com/our-technology/',
   'HydraFacial vortex-fusion patented tip creates simultaneous exfoliation, extraction, and serum infusion. FDA-cleared for skin cleansing, hydration, and exfoliation. Over 15 million treatments performed globally',
   3,
   0.75);
