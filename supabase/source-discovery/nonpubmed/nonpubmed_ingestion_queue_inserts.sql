-- Non-PubMed ingestion_queue inserts
-- Generated: 2026-06-12
-- Article count: 193
-- Scope: Crossref/OpenAlex/DOAJ-style metadata and journal-site URLs only; PubMed-derived URLs excluded.
-- Existing schema only: source_id, url, doi, title, rights_class, discovered_during, status.
-- Journal breakdown:
--   Aesthetic Surgery Journal Open Forum: 87
--   Aesthetic Plastic Surgery: 43
--   Journal of Aesthetic Nursing: 35
--   Aesthetic Medicine: 9
--   PRS Global Open: 7
--   JPRAS Open: 6
--   Journal of Clinical and Cosmetic Dermatology: 5
--   Cosmetic Surgery and Medicine: 1

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjaa310',
  NULLIF('10.1093/asj/sjaa310', ''),
  'A Multicenter Evaluation of Paradoxical Adipose Hyperplasia Following Cryolipolysis for Fat Reduction and Body Contouring: A Review of 8658 Cycles in 2114 Patients',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa310' OR iq.doi = '10.1093/asj/sjaa310'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjaa324',
  NULLIF('10.1093/asj/sjaa324', ''),
  'Autogenous Fat Transplantation and Botulinum Toxin Injection Into the Masseter Muscle to Create an Ideal Oval Face',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa324' OR iq.doi = '10.1093/asj/sjaa324'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojad100',
  NULLIF('10.1093/asjof/ojad100', ''),
  'Radiofrequency Microneedling: Technology, Devices, and Indications in the Modern Plastic Surgery Practice',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojad100' OR iq.doi = '10.1093/asjof/ojad100'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-019-01361-1',
  NULLIF('10.1007/s00266-019-01361-1', ''),
  'Facial Contouring by Using Dermal Fillers and Botulinum Toxin A: A Practical Approach',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-019-01361-1' OR iq.doi = '10.1007/s00266-019-01361-1'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjae152',
  NULLIF('10.1093/asj/sjae152', ''),
  'Body Contouring Finesse: Dynamic Definition Liposculpture and Bipolar Radiofrequency Microneedling',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae152' OR iq.doi = '10.1093/asj/sjae152'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'JPRAS Open'),
  'https://doi.org/10.1016/j.jpra.2024.01.006',
  NULLIF('10.1016/j.jpra.2024.01.006', ''),
  'Impact of nutrition on skin wound healing and aesthetic outcomes: A comprehensive narrative review',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'JPRAS Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.jpra.2024.01.006' OR iq.doi = '10.1016/j.jpra.2024.01.006'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://doi.org/10.3390/jaestheticmed2010003',
  NULLIF('10.3390/jaestheticmed2010003', ''),
  'A Multimodal Approach to Facial Rejuvenation—Integrating HA Fillers, Collagen Stimulators, Botulinum Toxin and Energy-Based Devices for Optimal Patient Outcomes',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/jaestheticmed2010003' OR iq.doi = '10.3390/jaestheticmed2010003'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://doi.org/10.47511/sapsj.v3.8144',
  NULLIF('10.47511/sapsj.v3.8144', ''),
  'Rib removal in body contouring surgery and its influence on the waist',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.47511/sapsj.v3.8144' OR iq.doi = '10.47511/sapsj.v3.8144'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1177/22925503241300335',
  NULLIF('10.1177/22925503241300335', ''),
  'A Primer on Abdominoplasty Safety',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/22925503241300335' OR iq.doi = '10.1177/22925503241300335'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2022.00633',
  NULLIF('10.14730/aaps.2022.00633', ''),
  'A split-face study to evaluate the efficacy of a dissolving microneedle-encapsulated niacinamide skin patch for the reduction of facial hyperpigmentation',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2022.00633' OR iq.doi = '10.14730/aaps.2022.00633'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-016-0608-y',
  NULLIF('10.1007/s00266-016-0608-y', ''),
  'Consensus on Current Injectable Treatment Strategies in the Asian Face',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-016-0608-y' OR iq.doi = '10.1007/s00266-016-0608-y'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-024-04398-z',
  NULLIF('10.1007/s00266-024-04398-z', ''),
  'Effectiveness and Safety of IPN-20-SENSE LIDOCAINE for Lip Volume Augmentation and/or Redefinition (SMILE Study): A Non-inferiority Randomized Double-Blinded Controlled Study',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-024-04398-z' OR iq.doi = '10.1007/s00266-024-04398-z'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2016.22.2.68',
  NULLIF('10.14730/aaps.2016.22.2.68', ''),
  'Evaluation of Elastic Lift for Neck Rejuvenation',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2016.22.2.68' OR iq.doi = '10.14730/aaps.2016.22.2.68'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1177/22925503211019618',
  NULLIF('10.1177/22925503211019618', ''),
  'Hyaluronidase for Treating Complications Related to HA Fillers: A National Plastic Surgeon Survey',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/22925503211019618' OR iq.doi = '10.1177/22925503211019618'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2013.19.3.129',
  NULLIF('10.14730/aaps.2013.19.3.129', ''),
  'Secondary Female Hairline Correction Surgery in Korean: Various Operative Techniques and Methods',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2013.19.3.129' OR iq.doi = '10.14730/aaps.2013.19.3.129'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2018.24.2.49',
  NULLIF('10.14730/aaps.2018.24.2.49', ''),
  'The Characteristics and Safety of Previous Fillers in Secondary Rhinoplasty',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2018.24.2.49' OR iq.doi = '10.14730/aaps.2018.24.2.49'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojag097',
  NULLIF('10.1093/asjof/ojag097', ''),
  'A Retrospective Analysis of the Clinical Response and Safety of Radiofrequency Microneedling Treatment in Managing Acne Vulgaris',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojag097' OR iq.doi = '10.1093/asjof/ojag097'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjy194',
  NULLIF('10.1093/asj/sjy194', ''),
  'Assessing the Efficacy of Deoxycholic Acid for the Treatment of Submental Fat: A Three-Dimensional Study',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjy194' OR iq.doi = '10.1093/asj/sjy194'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojaf105',
  NULLIF('10.1093/asjof/ojaf105', ''),
  'Assessment of Mortality Rates Associated With Perioperative Deep Vein Thrombosis Screening and Prophylaxis in Cosmetic Outpatient Procedures: An Updated National Evaluation Using QUAD A Patient Safety Data',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojaf105' OR iq.doi = '10.1093/asjof/ojaf105'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojad005',
  NULLIF('10.1093/asjof/ojad005', ''),
  'Botulinum Toxin Type A for the Treatment of Masseter Muscle Prominence in Asian Populations',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojad005' OR iq.doi = '10.1093/asjof/ojad005'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojae075',
  NULLIF('10.1093/asjof/ojae075', ''),
  'Case Series: Therapeutic Combination of VoluDerm Radiofrequency Microneedling and Glycolic Acid Peel in Scaled-Up Concentrations',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojae075' OR iq.doi = '10.1093/asjof/ojae075'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojae058',
  NULLIF('10.1093/asjof/ojae058', ''),
  'Comparative Performance of Current Patient-Accessible Artificial Intelligence Large Language Models in the Preoperative Education of Patients in Facial Aesthetic Surgery',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojae058' OR iq.doi = '10.1093/asjof/ojae058'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjae068',
  NULLIF('10.1093/asj/sjae068', ''),
  'Complications of Aesthetic and Reconstructive Breast Implant Capsulectomy: An Analysis of 7486 Patients Using Nationwide Outcomes Data',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae068' OR iq.doi = '10.1093/asj/sjae068'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjy282',
  NULLIF('10.1093/asj/sjy282', ''),
  'Complications of Cryolipolysis: Paradoxical Adipose Hyperplasia (PAH) and Beyond',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjy282' OR iq.doi = '10.1093/asj/sjy282'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojaf124',
  NULLIF('10.1093/asjof/ojaf124', ''),
  'Development and Validation of Photonumeric Scales for Glabellar, Lateral Canthal, and Forehead Lines',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojaf124' OR iq.doi = '10.1093/asjof/ojaf124'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjaf250',
  NULLIF('10.1093/asj/sjaf250', ''),
  'Effectiveness and Safety of a Polyvinyl Alcohol Microsphere and Hyaluronic Acid Suspension for Chin Augmentation: A Randomized Controlled Trial and Multidisciplinary Study',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf250' OR iq.doi = '10.1093/asj/sjaf250'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojaf142',
  NULLIF('10.1093/asjof/ojaf142', ''),
  'Incidence of Paradoxical Adipose Hyperplasia After Cryolipolysis: A Systematic Review and Meta-Analysis',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojaf142' OR iq.doi = '10.1093/asjof/ojaf142'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojaf064',
  NULLIF('10.1093/asjof/ojaf064', ''),
  'Localization and Staging of Vascular Adverse Events After Facial Fillers: A Detailed Assessment',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojaf064' OR iq.doi = '10.1093/asjof/ojaf064'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojae061',
  NULLIF('10.1093/asjof/ojae061', ''),
  'Management of Serious Adverse Events Following Deoxycholic Acid Injection for Submental and Jowl Fat Reduction: A Systematic Review and Management Recommendations',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojae061' OR iq.doi = '10.1093/asjof/ojae061'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojaf104',
  NULLIF('10.1093/asjof/ojaf104', ''),
  'Sculpting the Midface and Lower Face: A Novel Biostimulatory Technique Using Hyperdilute Calcium Hydroxylapatite',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojaf104' OR iq.doi = '10.1093/asjof/ojaf104'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojag075',
  NULLIF('10.1093/asjof/ojag075', ''),
  'The Efficacy and Safety of Radiofrequency Microneedling for Melasma: A Systematic Review and Qualitative Evidence Synthesis',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojag075' OR iq.doi = '10.1093/asjof/ojag075'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojae082',
  NULLIF('10.1093/asjof/ojae082', ''),
  'The Impact of the Number and Duration of Treatments With a 1064 nm Diode Laser on Adipocyte Apoptosis: Implications for Noninvasive Fat Reduction Strategies',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojae082' OR iq.doi = '10.1093/asjof/ojae082'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojae051',
  NULLIF('10.1093/asjof/ojae051', ''),
  'The Role of Nasal Fat Preservation in Upper Lid Surgery and Assessment With the Face-Q Questionnaire: Innovations in Upper Blepharoplasty',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojae051' OR iq.doi = '10.1093/asjof/ojae051'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'JPRAS Open'),
  'https://doi.org/10.1016/j.jpra.2025.12.005',
  NULLIF('10.1016/j.jpra.2025.12.005', ''),
  'Clavicular augmentation with hyaluronic acid six-point technique: A novel non-surgical approach to skeletal definition',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'JPRAS Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.jpra.2025.12.005' OR iq.doi = '10.1016/j.jpra.2025.12.005'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'PRS Global Open'),
  'https://doi.org/10.29011/2574-7754.100511',
  NULLIF('10.29011/2574-7754.100511', ''),
  'Mandibular Angle Augmentation using Customized PEEK Implants and Guides Generated with 3D Planning and Printing: Case Studies',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'PRS Global Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.29011/2574-7754.100511' OR iq.doi = '10.29011/2574-7754.100511'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'http://doi.org/10.51521/wjcam.2023.1101',
  NULLIF('10.51521/wjcam.2023.1101', ''),
  'New Technique for Reducing and Modeling Nasolabial Fat and Jowls: Lipoestructuración',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'http://doi.org/10.51521/wjcam.2023.1101' OR iq.doi = '10.51521/wjcam.2023.1101'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2021.00143',
  NULLIF('10.14730/aaps.2021.00143', ''),
  'A split-face study evaluating the efficacy of a topical antioxidant cream containing tocotrienol after 1064-nm picosecond Nd:YAG laser treatment for environment-induced skin pigmentation',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2021.00143' OR iq.doi = '10.14730/aaps.2021.00143'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1177/22925503251315490',
  NULLIF('10.1177/22925503251315490', ''),
  'Decreasing Venous Thromboembolism With Anticoagulation in Plastic Surgery',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/22925503251315490' OR iq.doi = '10.1177/22925503251315490'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2015.21.2.65',
  NULLIF('10.14730/aaps.2015.21.2.65', ''),
  'Evaluation of Micro-focused Ultrasound for Lifting and Tightening the Face',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2015.21.2.65' OR iq.doi = '10.14730/aaps.2015.21.2.65'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-025-04875-z',
  NULLIF('10.1007/s00266-025-04875-z', ''),
  'Subject-Reported Satisfaction After Cell-Enriched Lipotransfer (CELT) for Lip Augmentation',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-025-04875-z' OR iq.doi = '10.1007/s00266-025-04875-z'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'http://doi.org/10.4172/plastic-surgery.1000829',
  NULLIF('10.4172/plastic-surgery.1000829', ''),
  'The Canadian Society for Aesthetic Plastic Surgery 40th Annual Meeting',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'http://doi.org/10.4172/plastic-surgery.1000829' OR iq.doi = '10.4172/plastic-surgery.1000829'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2018.24.1.20',
  NULLIF('10.14730/aaps.2018.24.1.20', ''),
  'The Efficacy of a Q-Switched 694-nm Ruby Fractional Laser for Treating Acquired Bilateral Nevus of Ota-Like Macules',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2018.24.1.20' OR iq.doi = '10.14730/aaps.2018.24.1.20'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjac336',
  NULLIF('10.1093/asj/sjac336', ''),
  'A Comprehensive Ultrasound Evaluation Approach of Lower Facial Structure Before Masseter Muscle Botulinum Toxin Injection',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac336' OR iq.doi = '10.1093/asj/sjac336'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojab013',
  NULLIF('10.1093/asjof/ojab013', ''),
  'Abdominoplasty in the Massive Weight Loss Patient: Are Aesthetic Goals and Safety Mutually Exclusive?',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojab013' OR iq.doi = '10.1093/asjof/ojab013'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2009.09.010',
  NULLIF('10.1016/j.asj.2009.09.010', ''),
  'An Analysis of Safety Data from Five Phase III Clinical Trials on the Use of Botulinum Neurotoxin Type A-ABO for the Treatment of Glabellar Lines',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2009.09.010' OR iq.doi = '10.1016/j.asj.2009.09.010'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2009.09.003',
  NULLIF('10.1016/j.asj.2009.09.003', ''),
  'An Analysis of the Long-Term Safety Data of Repeat Administrations of Botulinum Neurotoxin Type A-ABO for the Treatment of Glabellar Lines',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2009.09.003' OR iq.doi = '10.1016/j.asj.2009.09.003'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjae062',
  NULLIF('10.1093/asj/sjae062', ''),
  'Botulinum Toxin Injection Technique for Reducing the Masseter Size and Enhancing the Jawline',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae062' OR iq.doi = '10.1093/asj/sjae062'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjx111',
  NULLIF('10.1093/asj/sjx111', ''),
  'Commentary on: Heterogeneity in Body Contouring Outcomes Based Research: The Pittsburgh Body Contouring Complication Reporting System',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjx111' OR iq.doi = '10.1093/asj/sjx111'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'http://dx.doi.org/10.1093/asjof/ojad027.001',
  NULLIF('10.1093/asjof/ojad027.001', ''),
  'Filler in the Tear Trough and Lid-Cheek Junction: A Cadaveric Evaluation of Filler Type and Manipulation Technique',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'http://dx.doi.org/10.1093/asjof/ojad027.001' OR iq.doi = '10.1093/asjof/ojad027.001'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojae113',
  NULLIF('10.1093/asjof/ojae113', ''),
  'In Vivo Ultrasound Study of the Angular Artery Anatomy: Practical Indications for the Treatment of the Deep Pyriform Space',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojae113' OR iq.doi = '10.1093/asjof/ojae113'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjae077',
  NULLIF('10.1093/asj/sjae077', ''),
  'Paradoxical Adipose Hyperplasia Following Cryolipolysis',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjae077' OR iq.doi = '10.1093/asj/sjae077'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojaf008',
  NULLIF('10.1093/asjof/ojaf008', ''),
  'Paradoxical Adipose Hyperplasia of Submental Region After Cryolipolysis Treated With Deep-Plane Neck Lift: A Case Report',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojaf008' OR iq.doi = '10.1093/asjof/ojaf008'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'http://dx.doi.org/10.11648/j.js.20231105.11',
  NULLIF('10.11648/j.js.20231105.11', ''),
  'Research and Analysis of the Anti-aging Treatment Process of L-polylactic Acid Injection Therapy in Plastic Surgery - A Case Report',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'http://dx.doi.org/10.11648/j.js.20231105.11' OR iq.doi = '10.11648/j.js.20231105.11'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojae120',
  NULLIF('10.1093/asjof/ojae120', ''),
  'Rethinking Paradoxical Bulging of the Masseter Muscle Following Botulinum Toxin Injection: An Ultrasound Evaluation',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojae120' OR iq.doi = '10.1093/asjof/ojae120'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojad094',
  NULLIF('10.1093/asjof/ojad094', ''),
  'Tapencarium (RZL-012) for Flank Fat Reduction: A Proof-of-Concept Study',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojad094' OR iq.doi = '10.1093/asjof/ojad094'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojad112',
  NULLIF('10.1093/asjof/ojad112', ''),
  'The Safety of Contraction of Subcutaneous Tissue Following Liposuction Procedures',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojad112' OR iq.doi = '10.1093/asjof/ojad112'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojz017',
  NULLIF('10.1093/asjof/ojz017', ''),
  'The Significance of Trans-Epidermal Water Loss After Microneedling and Microneedling-Radiofrequency Procedures: Histological and IRB-Approved Safety Study',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojz017' OR iq.doi = '10.1093/asjof/ojz017'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'JPRAS Open'),
  'https://doi.org/10.1016/j.jpra.2020.05.006',
  NULLIF('10.1016/j.jpra.2020.05.006', ''),
  'Comments on “Filler rhinoplasty based on anatomy: The dual plane technique”',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'JPRAS Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.jpra.2020.05.006' OR iq.doi = '10.1016/j.jpra.2020.05.006'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'JPRAS Open'),
  'https://doi.org/10.1016/j.jpra.2025.08.006',
  NULLIF('10.1016/j.jpra.2025.08.006', ''),
  'Mechanisms of fat and soft tissue filler embolism following aesthetic injections: A cadaveric systematic review',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'JPRAS Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.jpra.2025.08.006' OR iq.doi = '10.1016/j.jpra.2025.08.006'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'JPRAS Open'),
  'https://doi.org/10.1016/j.jpra.2026.03.043',
  NULLIF('10.1016/j.jpra.2026.03.043', ''),
  'SCULPT: Medical student and resident doctor comprehension, uptake of learning and perception of aesthetic surgery and training',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'JPRAS Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.jpra.2026.03.043' OR iq.doi = '10.1016/j.jpra.2026.03.043'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology'),
  'https://doi.org/10.16966/2576-2826.183',
  NULLIF('10.16966/2576-2826.183', ''),
  'Barrier-Repair Cream as an Adjuvant to Oral Isotretinoin Therapy Improves Skin Hydration, Acne Lesions, and Patient Satisfaction: A Prospective Pilot Controlled Study',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.16966/2576-2826.183' OR iq.doi = '10.16966/2576-2826.183'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://doi.org/10.17116/plast.hirurgia2026011120',
  NULLIF('10.17116/plast.hirurgia2026011120', ''),
  'Collagen stimulation synergy of a hybrid protocol: combining high-intensity focused ultrasound (HIFU) and poly-L-lactic acid (PLLA) in facial rejuvenation',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.17116/plast.hirurgia2026011120' OR iq.doi = '10.17116/plast.hirurgia2026011120'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2020.0158',
  NULLIF('10.1089/fpsam.2020.0158', ''),
  'Maxillofacial Trauma Management During COVID-19: Multidisciplinary Recommendations',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2020.0158' OR iq.doi = '10.1089/fpsam.2020.0158'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://doi.org/10.17116/plast.hirurgia202501180',
  NULLIF('10.17116/plast.hirurgia202501180', ''),
  'The author’s Timeless protocol: biostimulating peptides and picosecond alexandrite laser as an innovative approach to cellular rejuvenation',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.17116/plast.hirurgia202501180' OR iq.doi = '10.17116/plast.hirurgia202501180'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1145/3759972.3760173',
  NULLIF('10.1145/3759972.3760173', ''),
  'A BERT-Based Empirical Analysis of Medical Aesthetic Health Risks — A Study on the "Rednote" Platform',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1145/3759972.3760173' OR iq.doi = '10.1145/3759972.3760173'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2019.01599',
  NULLIF('10.14730/aaps.2019.01599', ''),
  'A prospective, comparative evaluation of axillary hair removal with an 808-nm diode laser at different fluences',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2019.01599' OR iq.doi = '10.14730/aaps.2019.01599'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2016.22.2.79',
  NULLIF('10.14730/aaps.2016.22.2.79', ''),
  'Botulinum Toxin Type A for Treatment of Masseter Hypertrophy: Volumetric Analysis of Masseter Muscle Reduction over Time',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2016.22.2.79' OR iq.doi = '10.14730/aaps.2016.22.2.79'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-023-03344-9',
  NULLIF('10.1007/s00266-023-03344-9', ''),
  'Changing Aesthetic Surgery Interest in Men: An 18-Year Analysis',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-023-03344-9' OR iq.doi = '10.1007/s00266-023-03344-9'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2023.00836',
  NULLIF('10.14730/aaps.2023.00836', ''),
  'Comparison of the efficacy and safety between a new monophasic hyaluronic acid filler and a biphasic hyaluronic acid filler in correcting facial wrinkles',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2023.00836' OR iq.doi = '10.14730/aaps.2023.00836'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-018-1079-0',
  NULLIF('10.1007/s00266-018-1079-0', ''),
  'Concentric Malar Lift in the Management of Lower Eyelid Rejuvenation or Retraction: A Clinical Retrospective Study on 342 Cases, 13 Years After the First Publication',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-018-1079-0' OR iq.doi = '10.1007/s00266-018-1079-0'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2014.20.2.92',
  NULLIF('10.14730/aaps.2014.20.2.92', ''),
  'Correction of Dark Coloration of the Lower Eyelid Skin with Nanofat Grafting',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2014.20.2.92' OR iq.doi = '10.14730/aaps.2014.20.2.92'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-026-05834-y',
  NULLIF('10.1007/s00266-026-05834-y', ''),
  'Effectiveness of Radiofrequency Microneedling in the Treatment of Dermatological Conditions: A Systematic Review',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-026-05834-y' OR iq.doi = '10.1007/s00266-026-05834-y'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2023.00843',
  NULLIF('10.14730/aaps.2023.00843', ''),
  'Efficacy of a long-pulsed 1064-nm Nd:YAG laser in acute scar redness',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2023.00843' OR iq.doi = '10.14730/aaps.2023.00843'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-018-1241-8',
  NULLIF('10.1007/s00266-018-1241-8', ''),
  'The Ideals of Facial Beauty Among Chinese Aesthetic Practitioners: Results from a Large National Survey',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-018-1241-8' OR iq.doi = '10.1007/s00266-018-1241-8'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjab219',
  NULLIF('10.1093/asj/sjab219', ''),
  'Commentary on: A Multicenter Evaluation of Paradoxical Adipose Hyperplasia Following Cryolipolysis for Fat Reduction and Body Contouring: A Review of 8658 Cycles in 2114 Patients',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab219' OR iq.doi = '10.1093/asj/sjab219'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjac218',
  NULLIF('10.1093/asj/sjac218', ''),
  'Commentary on: Characteristics and Treatment of Patients Diagnosed With Paradoxical Adipose Hyperplasia After Cryolipolysis: A Case Series and Scoping Review',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac218' OR iq.doi = '10.1093/asj/sjac218'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjac255',
  NULLIF('10.1093/asj/sjac255', ''),
  'Cryolipolysis: A Reconsideration of Efficacy, Safety, and the Risk of Paradoxical Adipose Hyperplasia',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac255' OR iq.doi = '10.1093/asj/sjac255'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojae128',
  NULLIF('10.1093/asjof/ojae128', ''),
  'Exploring Available Plastic Surgery Reward Programs and Proposing a Modeled Approach',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojae128' OR iq.doi = '10.1093/asjof/ojae128'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2006.01.001',
  NULLIF('10.1016/j.asj.2006.01.001', ''),
  'Gluteal aesthetic unit classification: A tool to improve outcomes in body contouring',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2006.01.001' OR iq.doi = '10.1016/j.asj.2006.01.001'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojag060',
  NULLIF('10.1093/asjof/ojag060', ''),
  'The Association Between Repeated Lip Augmentation With Hyaluronic Acid Filler and Recurrence of Herpes Labialis: A Longitudinal Self-controlled Study',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojag060' OR iq.doi = '10.1093/asjof/ojag060'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1177/1090820x14528208',
  NULLIF('10.1177/1090820x14528208', ''),
  'The Effect of Massive Weight Loss Status, Amount of Weight Loss, and Method of Weight Loss on Body Contouring Outcomes',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x14528208' OR iq.doi = '10.1177/1090820x14528208'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Cosmetic Surgery and Medicine'),
  'http://doi.org/10.61440/jmcns.2023.v1.33',
  NULLIF('10.61440/jmcns.2023.v1.33', ''),
  'Guidelines on Photoepilation: Techniques for Intimate Body Areas',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Cosmetic Surgery and Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'http://doi.org/10.61440/jmcns.2023.v1.33' OR iq.doi = '10.61440/jmcns.2023.v1.33'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2025.0059',
  NULLIF('10.12968/joan.2025.0059', ''),
  'Combined fractional radiofrequency microneedling and non-crosslinked hyaluronic acid for <i>atrophic acne scarring</i>',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2025.0059' OR iq.doi = '10.12968/joan.2025.0059'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2017.6.7.334',
  NULLIF('10.12968/joan.2017.6.7.334', ''),
  'Microneedling and melasma: delivering successful patient solutions',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2017.6.7.334' OR iq.doi = '10.12968/joan.2017.6.7.334'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-024-04613-x',
  NULLIF('10.1007/s00266-024-04613-x', ''),
  'Assessing the Informational Value of Large Language Models Responses in Aesthetic Surgery: A Comparative Analysis with Expert Opinions',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-024-04613-x' OR iq.doi = '10.1007/s00266-024-04613-x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2015.21.1.1',
  NULLIF('10.14730/aaps.2015.21.1.1', ''),
  'Complications of Injectable Soft Tissue Filler',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2015.21.1.1' OR iq.doi = '10.14730/aaps.2015.21.1.1'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1177/30499240251322281',
  NULLIF('10.1177/30499240251322281', ''),
  'Effectiveness of a Standardised Treatment Protocol in the Management of Melasma: A Retrospective Analysis',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/30499240251322281' OR iq.doi = '10.1177/30499240251322281'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2009.09.012',
  NULLIF('10.1016/j.asj.2009.09.012', ''),
  'An Analysis of Efficacy Data from Four Phase III Studies of Botulinum Neurotoxin Type A-ABO for the Treatment of Glabellar Lines',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2009.09.012' OR iq.doi = '10.1016/j.asj.2009.09.012'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjv105',
  NULLIF('10.1093/asj/sjv105', ''),
  'Paradoxical Adipose Hyperplasia and Cellular Effects After Cryolipolysis: A Case Report',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjv105' OR iq.doi = '10.1093/asj/sjv105'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjaf207',
  NULLIF('10.1093/asj/sjaf207', ''),
  'Treatment of Malar Festoons With Radiofrequency Microneedling',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaf207' OR iq.doi = '10.1093/asj/sjaf207'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2006.04.002',
  NULLIF('10.1016/j.asj.2006.04.002', ''),
  'Treatment options for dermal filler complications',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2006.04.002' OR iq.doi = '10.1016/j.asj.2006.04.002'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjz372',
  NULLIF('10.1093/asj/sjz372', ''),
  'Using the BODY-Q to Evaluate Appearance and Quality of Life Following Treatment of Skin Laxity of the Outer Thigh with Microfocused Ultrasound and Calcium Hydroxylapatite',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjz372' OR iq.doi = '10.1093/asj/sjz372'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojae064',
  NULLIF('10.1093/asjof/ojae064', ''),
  'Venture Capital''s Role in Advancing Plastic Surgery',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojae064' OR iq.doi = '10.1093/asjof/ojae064'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.4.177',
  NULLIF('10.12968/joan.2014.3.4.177', ''),
  'Managing dermal filler complications part 1: the Tyndall effect phenomenon',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.4.177' OR iq.doi = '10.12968/joan.2014.3.4.177'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2015.4.1.19',
  NULLIF('10.12968/joan.2015.4.1.19', ''),
  'Managing dermal filler complications part 3: early and delayed infection',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2015.4.1.19' OR iq.doi = '10.12968/joan.2015.4.1.19'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2015.4.3.116',
  NULLIF('10.12968/joan.2015.4.3.116', ''),
  'Managing dermal filler complications part 4: impending necrosis',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2015.4.3.116' OR iq.doi = '10.12968/joan.2015.4.3.116'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.69978/tpmap.v32.i1.5',
  NULLIF('10.69978/tpmap.v32.i1.5', ''),
  'ROYAL FREE COSMETIC AWARENESS AND RISK (ROFCAR) QUESTIONNAIRE: AN TALIAN VALIDATION STUDY',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.69978/tpmap.v32.i1.5' OR iq.doi = '10.69978/tpmap.v32.i1.5'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2019.8.sup1.12',
  NULLIF('10.12968/joan.2019.8.sup1.12', ''),
  'Radiofrequency technologies: applications for body contouring',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2019.8.sup1.12' OR iq.doi = '10.12968/joan.2019.8.sup1.12'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2017.6.7.356',
  NULLIF('10.12968/joan.2017.6.7.356', ''),
  'Reflective account of when adverse events occur following dermal filler treatments',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2017.6.7.356' OR iq.doi = '10.12968/joan.2017.6.7.356'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2016.5.sup5.22',
  NULLIF('10.12968/joan.2016.5.sup5.22', ''),
  'Why Perfectha is my preferred dermal filler for facial rejuvenation',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2016.5.sup5.22' OR iq.doi = '10.12968/joan.2016.5.sup5.22'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology'),
  'https://doi.org/10.16966/2576-2826.162',
  NULLIF('10.16966/2576-2826.162', ''),
  'A Novel Combination Therapy in Aesthetic and Reconstructive Surgery: Sea Salt Exfoliation, Cavitating Ultrasound, and High Intensity Multiwavelength LED Treatment: (SaltFacial)',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.16966/2576-2826.162' OR iq.doi = '10.16966/2576-2826.162'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology'),
  'https://doi.org/10.16966/2576-2826.123',
  NULLIF('10.16966/2576-2826.123', ''),
  'Evaluation of the Efficacy of a New Intensive Antiaging Treatment Based on the Combination of the Secretion of Cryptomphalus aspersa, Vitamin C and Proteoglycans',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.16966/2576-2826.123' OR iq.doi = '10.16966/2576-2826.123'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'PRS Global Open'),
  'https://doi.org/10.1097/01.prs.0000480023.35573.b7',
  NULLIF('10.1097/01.prs.0000480023.35573.b7', ''),
  'Paradoxical Adipose Hyperplasia after Cryolipolysis',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'PRS Global Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/01.prs.0000480023.35573.b7' OR iq.doi = '10.1097/01.prs.0000480023.35573.b7'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://doi.org/10.3390/jaestheticmed1020008',
  NULLIF('10.3390/jaestheticmed1020008', ''),
  'The Evolution of Facial Aesthetic Surgery: Historical Perspectives and Modern Innovations',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.3390/jaestheticmed1020008' OR iq.doi = '10.3390/jaestheticmed1020008'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-026-05726-1',
  NULLIF('10.1007/s00266-026-05726-1', ''),
  'Efficacy and Safety of a Topical Nicotinamide Adenine Dinucleotide Skinbooster for the Treatment of Melasma',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-026-05726-1' OR iq.doi = '10.1007/s00266-026-05726-1'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-026-05946-5',
  NULLIF('10.1007/s00266-026-05946-5', ''),
  'The Efficacy and Safety of Platelet-Rich Plasma in the Treatment of Melasma: A Systematic Review and Meta-analysis',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-026-05946-5' OR iq.doi = '10.1007/s00266-026-05946-5'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjw082',
  NULLIF('10.1093/asj/sjw082', ''),
  'Achieving Ideal Lower Face Aesthetic Contours: Combination of Tridimensional Fat Grafting to the Chin with Masseter Botulinum Toxin Injection',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjw082' OR iq.doi = '10.1093/asj/sjw082'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1177/1090820x12438094',
  NULLIF('10.1177/1090820x12438094', ''),
  'Book Review: Body Contouring',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x12438094' OR iq.doi = '10.1177/1090820x12438094'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1177/1090820x13514997',
  NULLIF('10.1177/1090820x13514997', ''),
  'Book Review: Body Contouring and Liposuction',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x13514997' OR iq.doi = '10.1177/1090820x13514997'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1177/1090820x13500299',
  NULLIF('10.1177/1090820x13500299', ''),
  'Book Review: Botulinum Toxin: Procedures in Cosmetic Dermatology Series',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x13500299' OR iq.doi = '10.1177/1090820x13500299'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1177/1090820x10390923',
  NULLIF('10.1177/1090820x10390923', ''),
  'Book-Review: Aesthetic Surgery After Massive Weight Loss',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x10390923' OR iq.doi = '10.1177/1090820x10390923'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjac304',
  NULLIF('10.1093/asj/sjac304', ''),
  'Commentary on: Laser-Assisted Drug Delivery in the Treatment of Scars, Rhytids, and Melasma: A Comprehensive Review of the Literature',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjac304' OR iq.doi = '10.1093/asj/sjac304'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1067/maj.2000.104987',
  NULLIF('10.1067/maj.2000.104987', ''),
  'Rejuvenation of the hand: fat injection combined with TCA peel',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1067/maj.2000.104987' OR iq.doi = '10.1067/maj.2000.104987'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjab176',
  NULLIF('10.1093/asj/sjab176', ''),
  'Response to: Shockwave Therapy for the Prevention of Paradoxical Adipose Hyperplasia After Cryolipolysis: Myth or Reality?',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab176' OR iq.doi = '10.1093/asj/sjab176'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjab097',
  NULLIF('10.1093/asj/sjab097', ''),
  'Shockwave Therapy for the Prevention of Paradoxical Adipose Hyperplasia After Cryolipolysis: Myth or Reality?',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab097' OR iq.doi = '10.1093/asj/sjab097'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'JPRAS Open'),
  'https://doi.org/10.1016/j.jpra.2026.03.016',
  NULLIF('10.1016/j.jpra.2026.03.016', ''),
  'Correspondence on: “Efficacy of high-intensity focused ultrasound for treating upper and lower eyelid sagging”',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'JPRAS Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.jpra.2026.03.016' OR iq.doi = '10.1016/j.jpra.2026.03.016'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2024.0015',
  NULLIF('10.12968/joan.2024.0015', ''),
  'A comprehensive approach to skin rejuvenation with Neauvia smart combination therapy',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2024.0015' OR iq.doi = '10.12968/joan.2024.0015'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2019.8.sup1.6',
  NULLIF('10.12968/joan.2019.8.sup1.6', ''),
  'Cryolipolysis and the opportunity for body contouring treatments',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2019.8.sup1.6' OR iq.doi = '10.12968/joan.2019.8.sup1.6'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.4.208',
  NULLIF('10.12968/joan.2018.7.4.208', ''),
  'Liposuction and body contouring',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.4.208' OR iq.doi = '10.12968/joan.2018.7.4.208'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2017.6.sup1.26',
  NULLIF('10.12968/joan.2017.6.sup1.26', ''),
  'Management of lumps and bumps following dermal filler injections',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2017.6.sup1.26' OR iq.doi = '10.12968/joan.2017.6.sup1.26'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2025.0007',
  NULLIF('10.12968/joan.2025.0007', ''),
  'Treating masseteric hypertrophy with botulinum toxin',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2025.0007' OR iq.doi = '10.12968/joan.2025.0007'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2023.12.6.258',
  NULLIF('10.12968/joan.2023.12.6.258', ''),
  'What can be done to manage hyperpigmentation and melasma during pregnancy?',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2023.12.6.258' OR iq.doi = '10.12968/joan.2023.12.6.258'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'PRS Global Open'),
  'https://doi.org/10.1097/prs.0b013e3181e3519c',
  NULLIF('10.1097/prs.0b013e3181e3519c', ''),
  'Correction: Soft-Tissue Filler Complications: The Important Role of Biofilms',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'PRS Global Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/prs.0b013e3181e3519c' OR iq.doi = '10.1097/prs.0b013e3181e3519c'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'PRS Global Open'),
  'http://dx.doi.org/10.55162/mcms.04.112',
  NULLIF('10.55162/mcms.04.112', ''),
  'Lip lifting as a Supporting Technique in the Facial Feminization Process of Transgender Patients: Case Report',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'PRS Global Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'http://dx.doi.org/10.55162/mcms.04.112' OR iq.doi = '10.55162/mcms.04.112'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-025-05023-3',
  NULLIF('10.1007/s00266-025-05023-3', ''),
  'A Scoping Review of Radiofrequency Microneedling: Clinical Application and Outcome Assessment',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-025-05023-3' OR iq.doi = '10.1007/s00266-025-05023-3'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-021-02130-9',
  NULLIF('10.1007/s00266-021-02130-9', ''),
  'COVID-19 Pandemic: Evaluation of Socio-Economic Impact on Aesthetic Plastic Surgery Providers',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-021-02130-9' OR iq.doi = '10.1007/s00266-021-02130-9'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'http://doi.org/10.4172/plastic-surgery.1000923',
  NULLIF('10.4172/plastic-surgery.1000923', ''),
  'Canadian Society for Aesthetic Plastic Surgery 42nd Annual Meeting',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'http://doi.org/10.4172/plastic-surgery.1000923' OR iq.doi = '10.4172/plastic-surgery.1000923'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-020-02004-6',
  NULLIF('10.1007/s00266-020-02004-6', ''),
  'Comparative Analysis of Efficacy of Lactic Acid with Ferulic Peel (Combination Peel) Vs Ferulic Peel Alone as a Monotherapy for Photoaging',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-020-02004-6' OR iq.doi = '10.1007/s00266-020-02004-6'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/bf00451097',
  NULLIF('10.1007/bf00451097', ''),
  'Histologic study of dermabrasion and chemical peel in an animal model after pretreatment with Retin-A',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/bf00451097' OR iq.doi = '10.1007/bf00451097'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-026-05978-x',
  NULLIF('10.1007/s00266-026-05978-x', ''),
  'Impact of Preoperative Semaglutide Discontinuation Timing on Postoperative Outcomes in Aesthetic Abdominoplasty: A Retrospective Comparative Study',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-026-05978-x' OR iq.doi = '10.1007/s00266-026-05978-x'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.14730/aaps.2021.00045',
  NULLIF('10.14730/aaps.2021.00045', ''),
  'Removal of a red tattoo on the lips using a 532-nm picosecond laser',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.14730/aaps.2021.00045' OR iq.doi = '10.14730/aaps.2021.00045'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojaf030',
  NULLIF('10.1093/asjof/ojaf030', ''),
  'A Single-Center, Blinded, Placebo-Controlled Study Evaluating Cosmetic Efficacy and Safety of a Novel Topical GLPSGLT in Glucagon-Like Peptide-1 Analog-Treated Patients',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojaf030' OR iq.doi = '10.1093/asjof/ojaf030'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2009.09.009',
  NULLIF('10.1016/j.asj.2009.09.009', ''),
  'An Evaluation of Neutralizing Antibody Induction During Treatment of Glabellar Lines with a New US Formulation of Botulinum Neurotoxin Type A',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2009.09.009' OR iq.doi = '10.1016/j.asj.2009.09.009'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2004.04.006',
  NULLIF('10.1016/j.asj.2004.04.006', ''),
  'Body contouring after massive weight loss*1',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2004.04.006' OR iq.doi = '10.1016/j.asj.2004.04.006'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2004.06.005',
  NULLIF('10.1016/j.asj.2004.06.005', ''),
  'Continuing medical education article ? body contouring*1Gynecomastia',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2004.06.005' OR iq.doi = '10.1016/j.asj.2004.06.005'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2003.09.008',
  NULLIF('10.1016/j.asj.2003.09.008', ''),
  'Continuing medical education article—body contouring Gluteoplasty',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2003.09.008' OR iq.doi = '10.1016/j.asj.2003.09.008'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2009.02.013',
  NULLIF('10.1016/j.asj.2009.02.013', ''),
  'Correction of Tear Trough Deformity With Novel Porcine Collagen Dermal Filler (Dermicol-P35)',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2009.02.013' OR iq.doi = '10.1016/j.asj.2009.02.013'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjx102',
  NULLIF('10.1093/asj/sjx102', ''),
  'Does Botulinum Toxin Injection into Masseter Muscles Affect Subcutaneous Thickness?',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjx102' OR iq.doi = '10.1093/asj/sjx102'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1177/1090820x14541956',
  NULLIF('10.1177/1090820x14541956', ''),
  'Evaluation of a Microfocused Ultrasound System for Improving Skin Laxity and Tightening in the Lower Face',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x14541956' OR iq.doi = '10.1177/1090820x14541956'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/s1090-820x(98)70043-3',
  NULLIF('10.1016/s1090-820x(98)70043-3', ''),
  'Extended Use of Botulinum Toxin Type A in Facial Aesthetic Surgery',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/s1090-820x(98)70043-3' OR iq.doi = '10.1016/s1090-820x(98)70043-3'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojaf040',
  NULLIF('10.1093/asjof/ojaf040', ''),
  'Focused Subspecialty Training in Plastic Surgery Residency: An Objective Assessment of the Cleveland Clinic Pilot Program',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojaf040' OR iq.doi = '10.1093/asjof/ojaf040'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojz035',
  NULLIF('10.1093/asjof/ojz035', ''),
  'Intramuscular Insertion of a Radiofrequency Microneedling Device for Facial Rejuvenation: A New Technique and Case Reports',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojz035' OR iq.doi = '10.1093/asjof/ojz035'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1067/maj.2002.122940',
  NULLIF('10.1067/maj.2002.122940', ''),
  'Lipoplasty: From body contouring to tissue engineering',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1067/maj.2002.122940' OR iq.doi = '10.1067/maj.2002.122940'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2009.03.003',
  NULLIF('10.1016/j.asj.2009.03.003', ''),
  'The Use of Dermicol-P35 Dermal Filler for Nonsurgical Rhinoplasty',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2009.03.003' OR iq.doi = '10.1016/j.asj.2009.03.003'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/s1090-820x(96)70034-1',
  NULLIF('10.1016/s1090-820x(96)70034-1', ''),
  'Ultrasonically assisted body contouring',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/s1090-820x(96)70034-1' OR iq.doi = '10.1016/s1090-820x(96)70034-1'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asjof/ojad052',
  NULLIF('10.1093/asjof/ojad052', ''),
  'Validating the Reliability and Clinical Relevance of an Infraorbital Hollow Photonumeric Scale',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asjof/ojad052' OR iq.doi = '10.1093/asjof/ojad052'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2022.11.5.206',
  NULLIF('10.12968/joan.2022.11.5.206', ''),
  'A global approach to skin health and rejuvenation',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2022.11.5.206' OR iq.doi = '10.12968/joan.2022.11.5.206'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2017.6.sup1.21',
  NULLIF('10.12968/joan.2017.6.sup1.21', ''),
  'Choosing the most appropriate cannula for dermal filler treatments',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2017.6.sup1.21' OR iq.doi = '10.12968/joan.2017.6.sup1.21'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2020.9.7.276',
  NULLIF('10.12968/joan.2020.9.7.276', ''),
  'Dermal filler migration complications following lip augmentation procedures',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2020.9.7.276' OR iq.doi = '10.12968/joan.2020.9.7.276'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2016.5.10.493',
  NULLIF('10.12968/joan.2016.5.10.493', ''),
  'Global facial enhancement using a cross-linked hyaluronic acid dermal filler',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2016.5.10.493' OR iq.doi = '10.12968/joan.2016.5.10.493'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2016.5.sup5.16',
  NULLIF('10.12968/joan.2016.5.sup5.16', ''),
  'Lower facial contouring: dermal filler approaches and techniques',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2016.5.sup5.16' OR iq.doi = '10.12968/joan.2016.5.sup5.16'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2012.1.1.38',
  NULLIF('10.12968/joan.2012.1.1.38', ''),
  'Rejuvenation of the skin using Radiesse: three patient case studies',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2012.1.1.38' OR iq.doi = '10.12968/joan.2012.1.1.38'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.2.76',
  NULLIF('10.12968/joan.2018.7.2.76', ''),
  'Role of injectable hyaluronic acid in skin rejuvenation: a literature review',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.2.76' OR iq.doi = '10.12968/joan.2018.7.2.76'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2012.1.6.292',
  NULLIF('10.12968/joan.2012.1.6.292', ''),
  'Skin rejuvenation using mesotherapy: indications, techniques and ingredients',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2012.1.6.292' OR iq.doi = '10.12968/joan.2012.1.6.292'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2015.4.sup5.16',
  NULLIF('10.12968/joan.2015.4.sup5.16', ''),
  'The use of blunt-tipped cannulas for dermal filler injections',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2015.4.sup5.16' OR iq.doi = '10.12968/joan.2015.4.sup5.16'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2018.7.9.464',
  NULLIF('10.12968/joan.2018.7.9.464', ''),
  'Using dermal fillers for vaginal skin rejuvenation',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2018.7.9.464' OR iq.doi = '10.12968/joan.2018.7.9.464'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'PRS Global Open'),
  'https://doi.org/10.1109/stsiva53688.2021.9592004',
  NULLIF('10.1109/stsiva53688.2021.9592004', ''),
  'Characterization of the volume and thickness of DIEP flap by CTA image processing',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'PRS Global Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1109/stsiva53688.2021.9592004' OR iq.doi = '10.1109/stsiva53688.2021.9592004'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://doi.org/10.1109/iccbe65177.2025.11256111',
  NULLIF('10.1109/iccbe65177.2025.11256111', ''),
  'Postoperative Prediction of Picosecond Laser Using Conditional Generative Adversarial Neural Networks',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1109/iccbe65177.2025.11256111' OR iq.doi = '10.1109/iccbe65177.2025.11256111'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://doi.org/10.1089/fpsam.2022.0226',
  NULLIF('10.1089/fpsam.2022.0226', ''),
  'Transcutaneous Radiofrequency Microneedling in the Facial Plastic Surgeon''s Practice: A Review',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1089/fpsam.2022.0226' OR iq.doi = '10.1089/fpsam.2022.0226'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-024-04534-9',
  NULLIF('10.1007/s00266-024-04534-9', ''),
  'Efficacy of a 1064-nm Picosecond Laser for Treating Early-Stage Traumatic and Surgical Scars',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-024-04534-9' OR iq.doi = '10.1007/s00266-024-04534-9'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-025-05393-8',
  NULLIF('10.1007/s00266-025-05393-8', ''),
  'Evaluating the Performance of Different Large Language Models on Plastic and Aesthetic Surgery: A Cross-Sectional Blinded Study',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-025-05393-8' OR iq.doi = '10.1007/s00266-025-05393-8'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-023-03758-5',
  NULLIF('10.1007/s00266-023-03758-5', ''),
  'Granulomatous Reaction to Inappropriate Filler Used as Hyaluronic Acid in Face',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-023-03758-5' OR iq.doi = '10.1007/s00266-023-03758-5'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-020-01671-9',
  NULLIF('10.1007/s00266-020-01671-9', ''),
  'Invited Discussion on: A Meta-analysis-Based Assessment of Intense Pulsed Light for Treatment of Melasma',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-020-01671-9' OR iq.doi = '10.1007/s00266-020-01671-9'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s00266-023-03356-5',
  NULLIF('10.1007/s00266-023-03356-5', ''),
  'Response to: Studying Dynamics of Mid-face Lifting During Hyaluronic Acid Filler Injection Using Ultrasound Imaging',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s00266-023-03356-5' OR iq.doi = '10.1007/s00266-023-03356-5'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Plastic Surgery'),
  'https://doi.org/10.1007/s002669900169',
  NULLIF('10.1007/s002669900169', ''),
  'The Emerging Role of Laser Resurfacing in Combination with Traditional Aesthetic Facial Plastic Surgery',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Plastic Surgery')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1007/s002669900169' OR iq.doi = '10.1007/s002669900169'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjab273',
  NULLIF('10.1093/asj/sjab273', ''),
  'A Simple Botulinum Toxin Injection Technique for Masseter Reduction',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjab273' OR iq.doi = '10.1093/asj/sjab273'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/s1090-820x(03)90030-6',
  NULLIF('10.1016/s1090-820x(03)90030-6', ''),
  'Botulinum toxin a for managing focal hyperhidrosis',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/s1090-820x(03)90030-6' OR iq.doi = '10.1016/s1090-820x(03)90030-6'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1067/maj.2002.121793',
  NULLIF('10.1067/maj.2002.121793', ''),
  'Botulinum toxin injection technique for treatment of headaches',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1067/maj.2002.121793' OR iq.doi = '10.1067/maj.2002.121793'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sjaa407',
  NULLIF('10.1093/asj/sjaa407', ''),
  'Commentary on: Autogenous Fat Transplantation and Botulinum Toxin Injection Into the Masseter Muscle to Create an Ideal Oval Face',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sjaa407' OR iq.doi = '10.1093/asj/sjaa407'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1177/1090820x14545868',
  NULLIF('10.1177/1090820x14545868', ''),
  'Commentary on: Unattractive Consequences: Litigation From Facial Dermabrasion and Chemical Peel Procedures',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1177/1090820x14545868' OR iq.doi = '10.1177/1090820x14545868'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sju062',
  NULLIF('10.1093/asj/sju062', ''),
  'Comments on “Evaluation of a Microfocused Ultrasound System for Improving Skin Laxity and Tightening in the Lower Face”',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sju062' OR iq.doi = '10.1093/asj/sju062'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/s1090-820x(03)00201-2',
  NULLIF('10.1016/s1090-820x(03)00201-2', ''),
  'Comparison of a series of superficial chemical peels with a single midlevel chemical peel for the correction of facial actinic damage',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/s1090-820x(03)00201-2' OR iq.doi = '10.1016/s1090-820x(03)00201-2'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/s1090-820x(98)80034-4',
  NULLIF('10.1016/s1090-820x(98)80034-4', ''),
  'Light and laser hair removal*',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/s1090-820x(98)80034-4' OR iq.doi = '10.1016/s1090-820x(98)80034-4'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2006.03.001',
  NULLIF('10.1016/j.asj.2006.03.001', ''),
  'Male body contouring',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2006.03.001' OR iq.doi = '10.1016/j.asj.2006.03.001'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1067/maj.2001.114445',
  NULLIF('10.1067/maj.2001.114445', ''),
  'Microdermabrasion with chemical peel',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1067/maj.2001.114445' OR iq.doi = '10.1067/maj.2001.114445'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/j.asj.2005.10.001',
  NULLIF('10.1016/j.asj.2005.10.001', ''),
  'Poly-L-lactic acid for the aesthetic correction of facial volume loss',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/j.asj.2005.10.001' OR iq.doi = '10.1016/j.asj.2005.10.001'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/s1090-820x(00)70010-0',
  NULLIF('10.1016/s1090-820x(00)70010-0', ''),
  'Rejuvenation of the Hand: Alternative Treatments for Lightening the Dorsal Skin',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/s1090-820x(00)70010-0' OR iq.doi = '10.1016/s1090-820x(00)70010-0'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1093/asj/sju119',
  NULLIF('10.1093/asj/sju119', ''),
  'Response to “Comments on ‘Evaluation of a Microfocused Ultrasound System for Improving Skin Laxity and Tightening in the Lower Face’”',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1093/asj/sju119' OR iq.doi = '10.1093/asj/sju119'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum'),
  'https://doi.org/10.1016/s1090-820x(98)80015-0',
  NULLIF('10.1016/s1090-820x(98)80015-0', ''),
  'The potential role of the erbium: YAG laser in skin rejuvenation†*',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Surgery Journal Open Forum')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1016/s1090-820x(98)80015-0' OR iq.doi = '10.1016/s1090-820x(98)80015-0'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.6.286',
  NULLIF('10.12968/joan.2014.3.6.286', ''),
  'Correction and management of dermal filler misplacement post lip augmentation',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.6.286' OR iq.doi = '10.12968/joan.2014.3.6.286'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.1117/12.2549843',
  NULLIF('10.1117/12.2549843', ''),
  'Effects of radiation exposure on dermal collagen: A multi modal approach',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1117/12.2549843' OR iq.doi = '10.1117/12.2549843'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2016.5.8.374',
  NULLIF('10.12968/joan.2016.5.8.374', ''),
  'Evidence-based management of melasma: contributing factors and treatment options',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2016.5.8.374' OR iq.doi = '10.12968/joan.2016.5.8.374'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2015.4.sup8.20',
  NULLIF('10.12968/joan.2015.4.sup8.20', ''),
  'Laser skin rejuvenation: common complications and risk management',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2015.4.sup8.20' OR iq.doi = '10.12968/joan.2015.4.sup8.20'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2014.3.7.331',
  NULLIF('10.12968/joan.2014.3.7.331', ''),
  'Managing dermal filler complications part 2: nodules and granulomas',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2014.3.7.331' OR iq.doi = '10.12968/joan.2014.3.7.331'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2021.10.4.138',
  NULLIF('10.12968/joan.2021.10.4.138', ''),
  'Mesotherapy for skin rejuvenation: a brief and practical insight for aesthetic practitioners',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2021.10.4.138' OR iq.doi = '10.12968/joan.2021.10.4.138'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2019.8.7.340',
  NULLIF('10.12968/joan.2019.8.7.340', ''),
  'Practice standard for the management of dermal filler complications',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2019.8.7.340' OR iq.doi = '10.12968/joan.2019.8.7.340'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2024.0054',
  NULLIF('10.12968/joan.2024.0054', ''),
  'Profhilo Structura for skin rejuvenation',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2024.0054' OR iq.doi = '10.12968/joan.2024.0054'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2019.8.5.230',
  NULLIF('10.12968/joan.2019.8.5.230', ''),
  'Using cannulas for dermal filler placement: why, when and how?',
  'unknown',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2019.8.5.230' OR iq.doi = '10.12968/joan.2019.8.5.230'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Aesthetic Nursing'),
  'https://doi.org/10.12968/joan.2017.6.10.576',
  NULLIF('10.12968/joan.2017.6.10.576', ''),
  'When can acyclovir be prescribed when treating the lips and oral commissures?',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Aesthetic Nursing')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.12968/joan.2017.6.10.576' OR iq.doi = '10.12968/joan.2017.6.10.576'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology'),
  'https://doi.org/10.16966/2576-2826.165',
  NULLIF('10.16966/2576-2826.165', ''),
  'Keloid Excision with Debulking Technique on the Lobule Auricle Sinistra',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.16966/2576-2826.165' OR iq.doi = '10.16966/2576-2826.165'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology'),
  'https://doi.org/10.16966/2576-2826.156',
  NULLIF('10.16966/2576-2826.156', ''),
  'Ultrasound-Guided Injection of Hyaluronic Gel Filler in the Temples: A Report of Two Cases',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical and Cosmetic Dermatology')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.16966/2576-2826.156' OR iq.doi = '10.16966/2576-2826.156'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'PRS Global Open'),
  'https://doi.org/10.1097/00006534-199512000-00091',
  NULLIF('10.1097/00006534-199512000-00091', ''),
  'BODY CONTOURING SYMPOSIUM',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'PRS Global Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/00006534-199512000-00091' OR iq.doi = '10.1097/00006534-199512000-00091'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'PRS Global Open'),
  'https://doi.org/10.1097/00006534-199103000-00121',
  NULLIF('10.1097/00006534-199103000-00121', ''),
  'FACE AND BODY CONTOURING',
  'open_access_cc_by',
  'nonpubmed_journal_discovery_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'PRS Global Open')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://doi.org/10.1097/00006534-199103000-00121' OR iq.doi = '10.1097/00006534-199103000-00121'
);
