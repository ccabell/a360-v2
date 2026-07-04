-- Direct publisher crawl ingestion_queue inserts
-- Generated: 2026-06-12
-- Article count: 33
-- Scope: non-PubMed publisher/journal-site crawl only; PubMed URLs excluded.
-- Existing schema only: source_id, url, doi, title, rights_class, discovered_during, status.
-- Source breakdown:
--   SKIN: The Journal of Cutaneous Medicine: 19
--   Journal of Clinical Dermatology & Therapy: 8
--   Aesthetic Medicine: 6

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3319/2436',
  NULLIF('10.25251/skin.10.supp.547', ''),
  'Combined Thiamidol and Low-fluence Q-switched Nd:YAG Laser for the Treatment of Facial Hyperpigmentation',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3319/2436' OR iq.doi = '10.25251/skin.10.supp.547'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/4228/2849',
  NULLIF('10.25251/526zed25', ''),
  'Curcumin (Curcuma longa): Applications in Clinical, Regenerative and Aesthetic Dermatology',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/4228/2849' OR iq.doi = '10.25251/526zed25'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/4231/2848',
  NULLIF('10.25251/m8jf0r96', ''),
  'Neuromodulators for Facial Aesthetics: Mechanistic Postulates and Clinical Implications',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/4231/2848' OR iq.doi = '10.25251/m8jf0r96'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/4186/2867',
  NULLIF('10.25251/kwvy1y97', ''),
  'Optimizing Laser and Light-Emitting Technologies: Clinical Considerations and Procedural Insights',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/4186/2867' OR iq.doi = '10.25251/kwvy1y97'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/4226/2851',
  NULLIF('10.25251/0razgx60', ''),
  'Safety and Efficacy of an Oral Nutraceutical Supplement Gummy and Peptide Serum in Promoting Hair Growth: Initial Results of A Randomized Placebo Controlled Trial with an Open Label Extension',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/4226/2851' OR iq.doi = '10.25251/0razgx60'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/2505/2131',
  NULLIF('10.25251/skin.8.4.3', ''),
  'The Effect of Platelet Rich Plasma (PRP) Plus Microneedling Versus Tranexamic Acid Plus Microneedling in the Biometric Characteristics of Melasma: A Before-After, Assessor Analysis, Blinded, Clinical Trial',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/2505/2131' OR iq.doi = '10.25251/skin.8.4.3'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3636/2569',
  NULLIF('10.25251/6e6n5t29', ''),
  'Clinical Approach to Botulinum Toxin in Cosmetic Dermatology and Neurological Conditions',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3636/2569' OR iq.doi = '10.25251/6e6n5t29'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3596/2572',
  NULLIF('10.25251/kkby0454', ''),
  'Counterfeit Botulinum Toxin and Cosmetic Iatrogenic Botulism: Emerging Threats that Require Regulatory Reform',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3596/2572' OR iq.doi = '10.25251/kkby0454'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3255/2455',
  NULLIF('10.25251/skin.10.supp.570', ''),
  'Emotional Anatomy: Botulinum Toxin and the Regulation of Mood',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3255/2455' OR iq.doi = '10.25251/skin.10.supp.570'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3256/2443',
  NULLIF('10.25251/skin.10.supp.559', ''),
  'Evaluating the Quality of Social Media Content on Platelet-Rich Plasma for Androgenetic Alopecia and Facial Aesthetics: A Cross-Sectional Study',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3256/2443' OR iq.doi = '10.25251/skin.10.supp.559'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3031/2275',
  NULLIF('10.25251/skin.8.supp.502', ''),
  'Targeted 308-nm Excimer Laser A Safe and Effective Solution for Inflammatory Skin Disorders',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3031/2275' OR iq.doi = '10.25251/skin.8.supp.502'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/2750/2228',
  NULLIF('10.25251/skin.8.6.1', ''),
  'Allergens Causing Allergic Contact Dermatitis in Cosmetic Products: A Systematic Review',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/2750/2228' OR iq.doi = '10.25251/skin.8.6.1'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy'),
  'https://www.heraldopenaccess.us/openaccess/platelet-rich-plasma-in-the-treatment-of-frontal-fibrosing-alopecia',
  NULLIF('10.24966/cdt-8771/100091', ''),
  'Platelet Rich Plasma in the Treatment of Frontal Fibrosing Alopecia',
  'open_access_cc_by',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://www.heraldopenaccess.us/openaccess/platelet-rich-plasma-in-the-treatment-of-frontal-fibrosing-alopecia' OR iq.doi = '10.24966/cdt-8771/100091'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3621/2701',
  NULLIF('10.25251/bdds8p16', ''),
  'A Comparative Analysis of Intralesional Injection Triamcinolone Acetonide, Injection Bleomycin, and Radiofrequency Ablation in the treatment of keloids',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3621/2701' OR iq.doi = '10.25251/bdds8p16'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3315/2433',
  NULLIF('10.25251/skin.10.supp.544', ''),
  'Clinical Efficacy of the Human Tyrosinase Inhibitor Thiamidol (isobutylamido thiazolyl resorcinol) in Melasma',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3315/2433' OR iq.doi = '10.25251/skin.10.supp.544'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3594/2872',
  NULLIF('10.25251/686zdx68', ''),
  'Toxic Shock Syndrome After Fractionated Ablative CO2 Laser',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3594/2872' OR iq.doi = '10.25251/686zdx68'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3356/2563',
  NULLIF('10.25251/e9yxtj18', ''),
  'Treatment of Erythematotelangiectatic Rosacea with Laser and Topical Beta Blocker: A Split-Face Case Study',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3356/2563' OR iq.doi = '10.25251/e9yxtj18'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://aestheticmed.co.uk/bcam-warning-over-illegal-and-unregulated-peptide-injections',
  NULLIF('', ''),
  'BCAM warns public over illegal and unregulated peptide injections',
  'unknown',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://aestheticmed.co.uk/bcam-warning-over-illegal-and-unregulated-peptide-injections'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://aestheticmed.co.uk/dr-lisa-dinley-aesthetic-medicine-patient-safety-evidence-based-practice',
  NULLIF('', ''),
  'Why evidence, patient safety and ethics outweighs trends',
  'unknown',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://aestheticmed.co.uk/dr-lisa-dinley-aesthetic-medicine-patient-safety-evidence-based-practice'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy'),
  'https://www.heraldopenaccess.us/openaccess/glutamic-acid-grafted-hyaluronic-acid-inhibits-inflammatory-factors-via-fibroblast-and-skin-model-tests',
  NULLIF('10.24966/cdt-8771/100143', ''),
  'Glutamic-Acid Grafted Hyaluronic Acid Inhibits Inflammatory Factors via Fibroblast and Skin Model Tests',
  'open_access_cc_by',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://www.heraldopenaccess.us/openaccess/glutamic-acid-grafted-hyaluronic-acid-inhibits-inflammatory-factors-via-fibroblast-and-skin-model-tests' OR iq.doi = '10.24966/cdt-8771/100143'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy'),
  'https://pdfs.semanticscholar.org/1cd9/70cd11ab43f347d87b5f4565c5e67f8108d2.pdf',
  NULLIF('10.24966/cdt-8771/100149', ''),
  'Tissue Integration an Cellular Response to Collagen Biostimulators in Orofacial Harmonization: An Integrative Review',
  'open_access_cc_by',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://pdfs.semanticscholar.org/1cd9/70cd11ab43f347d87b5f4565c5e67f8108d2.pdf' OR iq.doi = '10.24966/cdt-8771/100149'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3178/2381',
  NULLIF('10.25251/skin.9.1.10', ''),
  'The Rise of TikTok Facial Filler Influencers: Implications for Demand and Practice',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3178/2381' OR iq.doi = '10.25251/skin.9.1.10'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://aestheticmed.co.uk/optimising-combination-treatments-in-aesthetic-medicine',
  NULLIF('', ''),
  'Optimising combination treatments in aesthetic medicine',
  'unknown',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://aestheticmed.co.uk/optimising-combination-treatments-in-aesthetic-medicine'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://aestheticmed.co.uk/peptides-aesthetic-medicine-evidence-safety-regulation',
  NULLIF('', ''),
  'Peptides in aesthetics: evidence, safety and regulation',
  'unknown',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://aestheticmed.co.uk/peptides-aesthetic-medicine-evidence-safety-regulation'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy'),
  'https://www.heraldopenaccess.us/openaccess/microneedle-radiofrequency-combined-with-human-fibroblast-conditioned-media-for-acne-scars-and-skin-rejuvenation',
  NULLIF('10.24966/cdt-8771/100056', ''),
  'Microneedle Radiofrequency Combined with Human Fibroblast Conditioned Media for Acne Scars and Skin Rejuvenation',
  'open_access_cc_by',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://www.heraldopenaccess.us/openaccess/microneedle-radiofrequency-combined-with-human-fibroblast-conditioned-media-for-acne-scars-and-skin-rejuvenation' OR iq.doi = '10.24966/cdt-8771/100056'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy'),
  'https://www.heraldopenaccess.us/openaccess/microneedling-for-medical-and-aesthetic-purposes-current-indications-and-new-advances',
  NULLIF('10.24966/cdt-8771/100123', ''),
  'Microneedling for Medical and Aesthetic Purposes: Current Indications and New Advances',
  'open_access_cc_by',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://www.heraldopenaccess.us/openaccess/microneedling-for-medical-and-aesthetic-purposes-current-indications-and-new-advances' OR iq.doi = '10.24966/cdt-8771/100123'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/2342/2184',
  NULLIF('10.25251/skin.8.5.17', ''),
  'Cutaneous Collagenous Vasculopathy in a Young Adult: A Case Report',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/2342/2184' OR iq.doi = '10.25251/skin.8.5.17'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine'),
  'https://skin.dermsquared.com/skin/article/download/3253/2486',
  NULLIF('10.25251/skin.9.3.14', ''),
  'Extensive Foreign Body Granulomas Induced by Calcium Hydroxyapatite Filler',
  'open_access_cc_by_nc',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'SKIN: The Journal of Cutaneous Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://skin.dermsquared.com/skin/article/download/3253/2486' OR iq.doi = '10.25251/skin.9.3.14'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://aestheticmed.co.uk/pharmacist-suspended-botulinum-toxin-uk',
  NULLIF('', ''),
  'Pharmacist suspended over illegal botulinum toxin prescribing',
  'unknown',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://aestheticmed.co.uk/pharmacist-suspended-botulinum-toxin-uk'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Aesthetic Medicine'),
  'https://aestheticmed.co.uk/autoimmune-disease-and-skin-sensitivity',
  NULLIF('', ''),
  'Understanding autoimmune disease and skin sensitivity',
  'unknown',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Aesthetic Medicine')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://aestheticmed.co.uk/autoimmune-disease-and-skin-sensitivity'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy'),
  'https://www.heraldopenaccess.us/openaccess/exosomes-in-dermatological-aesthetics-cosmetic-skin-care',
  NULLIF('10.24966/cdt-8771/100147', ''),
  'Exosomes in Dermatological Aesthetics & Cosmetic Skin Care',
  'open_access_cc_by',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://www.heraldopenaccess.us/openaccess/exosomes-in-dermatological-aesthetics-cosmetic-skin-care' OR iq.doi = '10.24966/cdt-8771/100147'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy'),
  'https://www.heraldopenaccess.us/openaccess/injection-of-enriched-hyaluronic-acid-for-vaginal-dryness-in-a-tamoxifen-user',
  NULLIF('10.24966/cdt-8771/100115', ''),
  'Injection of Enriched Hyaluronic Acid for Vaginal Dryness in a Tamoxifen User',
  'open_access_cc_by',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://www.heraldopenaccess.us/openaccess/injection-of-enriched-hyaluronic-acid-for-vaginal-dryness-in-a-tamoxifen-user' OR iq.doi = '10.24966/cdt-8771/100115'
);

INSERT INTO ingestion_queue (source_id, url, doi, title, rights_class, discovered_during, status)
SELECT
  (SELECT id FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy'),
  'https://www.heraldopenaccess.us/openaccess/the-relationship-between-melasma-and-serum-zinc-levels',
  NULLIF('10.24966/cdt-8771/100150', ''),
  'The Relationship Between Melasma and Serum Zinc Levels',
  'open_access_cc_by',
  'nonpubmed_publisher_crawl_2026_06_12',
  'queued'
WHERE EXISTS (SELECT 1 FROM source_registry WHERE name = 'Journal of Clinical Dermatology & Therapy')
AND NOT EXISTS (
  SELECT 1 FROM ingestion_queue iq WHERE iq.url = 'https://www.heraldopenaccess.us/openaccess/the-relationship-between-melasma-and-serum-zinc-levels' OR iq.doi = '10.24966/cdt-8771/100150'
);
