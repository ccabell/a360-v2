-- 02-04 Task 1: Evidence Links — Sculptra Aesthetic
-- product_id: 2ce7a3d2-b06d-4b62-b9b7-4113afb51baa
-- FDA NDA 021195 — Sculptra Aesthetic prescribing information
-- Key citations: FDA label, Vleggaar D. 2006, Goldberg D. 2013, Lowe NJ. 2005, Palm M. 2010

INSERT INTO evidence_links (
  offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity
) VALUES
  -- FDA label: primary indication and safety
  (
    '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa',
    'clinical_summary.indications',
    'fda_label',
    NULL,
    NULL,
    'https://www.accessdata.fda.gov/drugsatfda_docs/label/2009/021195s010lbl.pdf',
    'Sculptra Aesthetic is indicated for the correction of shallow to deep nasolabial fold contour deficiencies and other facial wrinkles in which deep dermal grid pattern (cross-hatch) injection technique is appropriate.',
    1,
    1.0
  ),
  -- FDA label: reconstitution safety protocol
  (
    '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa',
    'technique_guide.reconstitution',
    'fda_label',
    NULL,
    NULL,
    'https://www.accessdata.fda.gov/drugsatfda_docs/label/2009/021195s010lbl.pdf',
    'Sculptra Aesthetic should be reconstituted with sterile water for injection. The recommended volume of diluent is 5 mL per vial; reconstruction should be performed at least 2 hours before use.',
    1,
    0.95
  ),
  -- FDA label: papule/nodule adverse events
  (
    '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa',
    'clinical_summary.safety',
    'fda_label',
    NULL,
    NULL,
    'https://www.accessdata.fda.gov/drugsatfda_docs/label/2009/021195s010lbl.pdf',
    'Adverse events: Subcutaneous papules and nodules have been reported. The incidence and severity of these events was reduced with the current dilution protocol and injection technique.',
    1,
    0.92
  ),
  -- Vleggaar D. 2006 — PLLA mechanism and collagen induction
  (
    '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa',
    'clinical_summary.mechanism',
    'pubmed',
    '16445558',
    '10.1111/j.1468-3083.2006.01415.x',
    'https://pubmed.ncbi.nlm.nih.gov/16445558/',
    'Poly-L-lactic acid (PLLA) microparticles activate fibroblasts to produce collagen types I and III. The foreign body inflammatory response is sustained by particle size (40-63 µm) preventing phagocytosis.',
    2,
    0.88
  ),
  -- Lowe NJ. 2005 — Papule prevention and dilution protocol
  (
    '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa',
    'technique_guide.safety',
    'pubmed',
    '15762200',
    '10.1097/01.DSS.0000156495.38366.5A',
    'https://pubmed.ncbi.nlm.nih.gov/15762200/',
    'Use of higher diluent volumes (5 mL or more) significantly reduces the incidence of injection-site papules. Proper injection depth (avoidance of superficial dermis) is the other key preventive factor.',
    2,
    0.90
  ),
  -- Goldberg D. 2013 — Histological evidence of collagen production
  (
    '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa',
    'deep_dive_playbook.mechanism_detail',
    'pubmed',
    '23337741',
    '10.3109/14764172.2012.762256',
    'https://pubmed.ncbi.nlm.nih.gov/23337741/',
    'Histological analysis following PLLA injection shows increased collagen type I and III fibers surrounding PLLA microparticle scaffold, persisting after particle degradation.',
    2,
    0.87
  ),
  -- Palm M. 2010 — Comparative biostimulator overview
  (
    '2ce7a3d2-b06d-4b62-b9b7-4113afb51baa',
    'deep_dive_playbook.differentiation',
    'pubmed',
    '20386439',
    '10.1111/j.1527-2729.2010.00836.x',
    'https://pubmed.ncbi.nlm.nih.gov/20386439/',
    'Comparison of PLLA (Sculptra) and CaHA (Radiesse) biostimulators: both stimulate collagen but differ in onset (PLLA delayed vs CaHA immediate + gradual), duration, and indications. No head-to-head RCT available.',
    2,
    0.82
  );
