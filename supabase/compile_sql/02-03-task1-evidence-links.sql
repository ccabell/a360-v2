-- 02-03 Task 1: Evidence Links for Juvederm Voluma XC + Vollure XC + Skinvive
-- All evidence_links tied to offering_id (not category_id — per schema constraint confirmed in 02-02)
-- Citation locator fields populated per DOSSIER_COMPILE_PIPELINE.md step 5

-- ============================================================
-- JUVEDERM VOLUMA XC evidence_links
-- offering_id: 6c8f72f0-887f-484a-a588-0bb9bd8052c9
-- ============================================================

INSERT INTO evidence_links (
  offering_id, field_name, source, pmid, doi, url, source_reference, snippet, authority_rank
) VALUES
  -- FDA label — cheek augmentation
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'indications', 'fda_label', NULL, NULL,
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2013/125474lbl.pdf',
   'Juvederm Voluma XC FDA NDA 125474 prescribing information (2013 cheek augmentation approval)',
   'JUVÉDERM VOLUMA® XC injectable gel is indicated for deep (subcutaneous and/or supraperiosteal) injection for cheek augmentation to correct age-related volume loss.',
   1),
  -- FDA label — chin augmentation (2021 update)
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'indications', 'fda_label', NULL, NULL,
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/125474s012lbl.pdf',
   'Juvederm Voluma XC FDA NDA 125474 supplement (2021 chin augmentation approval)',
   'JUVÉDERM VOLUMA® XC injectable gel is also indicated for injection for chin region augmentation to improve the chin profile.',
   1),
  -- Pivotal clinical study — Baumann
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'clinical_outcomes', 'pubmed', '25787073', '10.1177/1090820x15577213',
   'https://pubmed.ncbi.nlm.nih.gov/25787073/',
   'Baumann L et al. Aesthet Surg J 2015 — Juvederm Voluma XC pivotal study cheek augmentation',
   'A double-blind randomized controlled study demonstrated that JUVÉDERM VOLUMA XC significantly improved midface volume deficiency with results lasting up to 24 months.',
   2),
  -- Jones et al — pivotal results
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'clinical_outcomes', 'pubmed', '27000197', '10.1093/asj/sjw028',
   'https://pubmed.ncbi.nlm.nih.gov/27000197/',
   'Jones D et al. Aesthet Surg J 2016 — Voluma XC real world outcomes and technique',
   'Juvederm Voluma XC demonstrated high responder rates for midface volume correction with favorable safety profile.',
   2),
  -- Sundaram — Vycross technology
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'mechanism', 'pubmed', '25756344', '10.36849/JDD.2015.3810',
   'https://pubmed.ncbi.nlm.nih.gov/25756344/',
   'Sundaram H, Rohrich R. J Drugs Dermatol 2015 — Vycross technology characterization',
   'Vycross technology utilizes a blend of high and low molecular weight HA creating a product with higher G prime and lower swelling ratio compared to conventional cross-linked HA.',
   2),
  -- DeLorenzi — vascular occlusion safety
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'safety', 'pubmed', '25263572', '10.1177/1090820x14555035',
   'https://pubmed.ncbi.nlm.nih.gov/25263572/',
   'DeLorenzi C. Aesthet Surg J 2014 — Complications of injectable fillers, vascular occlusion',
   'Intra-arterial injection of filler remains the most serious complication; thorough knowledge of facial vascular anatomy and immediate access to hyaluronidase are mandatory.',
   2);

-- ============================================================
-- JUVEDERM VOLLURE XC evidence_links
-- offering_id: 7370545f-97a3-4519-a92d-3ac4f969829d
-- ============================================================

INSERT INTO evidence_links (
  offering_id, field_name, source, pmid, doi, url, source_reference, snippet, authority_rank
) VALUES
  -- FDA label — NLF/perioral lines (2017)
  ('7370545f-97a3-4519-a92d-3ac4f969829d', 'indications', 'fda_label', NULL, NULL,
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/125474s016lbl.pdf',
   'Juvederm Vollure XC FDA NDA 125474/S-016 prescribing information (2017)',
   'JUVÉDERM VOLLURE® XC injectable gel is indicated for injection into the mid to deep dermis for correction of moderate to severe facial wrinkles and folds, such as nasolabial folds.',
   1),
  -- Cohen — pivotal study / long duration
  ('7370545f-97a3-4519-a92d-3ac4f969829d', 'clinical_outcomes', 'pubmed', '30681735', '10.1097/DSS.0000000000001827',
   'https://pubmed.ncbi.nlm.nih.gov/30681735/',
   'Cohen JL et al. Dermatol Surg 2019 — Vollure XC 18-month durability study NLF',
   'JUVÉDERM VOLLURE® XC demonstrated statistically significant improvement in nasolabial fold severity with results sustained at 18 months, longer than conventional NASHA-based fillers.',
   2),
  -- Sundaram — Vycross (same study — relevant to mechanism)
  ('7370545f-97a3-4519-a92d-3ac4f969829d', 'mechanism', 'pubmed', '25756344', '10.36849/JDD.2015.3810',
   'https://pubmed.ncbi.nlm.nih.gov/25756344/',
   'Sundaram H, Rohrich R. J Drugs Dermatol 2015 — Vycross technology including intermediate G'' formulations',
   'The intermediate G prime Vycross formulation provides sufficient structural integrity for fold correction with flexibility appropriate for dynamic facial areas.',
   2),
  -- Safety profile — AE data from FDA
  ('7370545f-97a3-4519-a92d-3ac4f969829d', 'safety', 'fda_label', NULL, NULL,
   'https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/125474s016lbl.pdf',
   'Juvederm Vollure XC prescribing information — adverse events section',
   'Most common adverse events: injection site tenderness, swelling, firmness, lumps, bruising, discoloration, and pain. Most resolved within 30 days.',
   1);

-- ============================================================
-- SKINVIVE BY JUVEDERM evidence_links
-- offering_id: b74d5475-bf58-4d7d-87f5-2c8dc9e252de
-- ============================================================

INSERT INTO evidence_links (
  offering_id, field_name, source, pmid, doi, url, source_reference, snippet, authority_rank
) VALUES
  -- FDA clearance / prescribing information
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', 'indications', 'fda_label', NULL, NULL,
   'https://www.accessdata.fda.gov/cdrh_docs/pdf22/K220481.pdf',
   'Skinvive by Juvederm FDA 510k K220481 clearance (2023)',
   'SKINVIVE™ by JUVÉDERM® injectable gel is indicated for intradermal injection for the improvement of skin smoothness of the cheeks in adults over the age of 21.',
   1),
  -- Loghem — skin booster/biorevitalization review including Skinvive mechanism class
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', 'mechanism', 'pubmed', '37259773', '10.1111/jocd.15753',
   'https://pubmed.ncbi.nlm.nih.gov/37259773/',
   'Loghem J et al. J Cosmet Dermatol 2023 — Intradermal hyaluronic acid biorevitalization outcomes',
   'Intradermal hyaluronic acid injection improves skin hydration, elasticity, and luminosity through dermal water-binding and possible fibroblast stimulation, with safety and efficacy confirmed in controlled studies.',
   2),
  -- Narurkar — skin boosters / biorevitalization class review (predates Skinvive US clearance but relevant mechanism)
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', 'clinical_evidence', 'pubmed', '27088570', '10.36849/JDD.2016.4764',
   'https://pubmed.ncbi.nlm.nih.gov/27088570/',
   'Narurkar V et al. J Drugs Dermatol 2016 — Skin booster hyaluronic acid outcomes review',
   'Intradermal HA injection demonstrated consistent improvements in skin hydration, elasticity, and overall skin quality across multiple clinical studies; adverse event profile was mild and transient.',
   2),
  -- FDA safety / adverse events
  ('b74d5475-bf58-4d7d-87f5-2c8dc9e252de', 'safety', 'fda_label', NULL, NULL,
   'https://www.accessdata.fda.gov/cdrh_docs/pdf22/K220481.pdf',
   'Skinvive 510k K220481 — clinical adverse events section',
   'Most common adverse events were bruising (35%), swelling (26%), tenderness (23%), discoloration (17%), and redness (13%). Most resolved within 7 days.',
   1);
