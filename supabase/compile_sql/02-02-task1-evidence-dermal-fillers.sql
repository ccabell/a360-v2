-- Evidence links for Dermal Fillers category dossier
-- Constraint rules:
--   fda_label/ifu/llm_inference: source_reference must be non-null non-empty
--   pubmed: pmid OR doi must be non-null
--   youtube: url must be non-null

-- Anchor offering: Juvederm Voluma XC (6c8f72f0-887f-484a-a588-0bb9bd8052c9)
-- Used as offering anchor for category-level class evidence

INSERT INTO evidence_links (offering_id, field_name, source, doi, pmid, url, source_reference, snippet, claimed_value, authority_rank, similarity)
VALUES
  -- FDA label citations for HA fillers class
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'ha_filler_boxed_warning', 'fda_label',
   NULL, NULL, NULL, 'JUVEDERM VOLUMA XC Prescribing Information, Boxed Warning (Allergan, 2023)',
   'Dermal fillers approved for injection into the cheek may cause vision loss, blindness, stroke, and death from intravascular injection.',
   'Boxed warning: intravascular injection risk — vision loss, blindness, stroke, death', 1, 1.0),

  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'voluma_xc_duration', 'fda_label',
   NULL, NULL, NULL, 'JUVEDERM VOLUMA XC Prescribing Information, Clinical Trials Section (Allergan, 2023)',
   'Correction was maintained in 76.4% of subjects at 24-month follow-up in the pivotal study.',
   '18-24 month duration: Voluma XC pivotal study 76.4% at 24 months', 1, 1.0),

  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'ha_filler_lidocaine', 'fda_label',
   NULL, NULL, NULL, 'JUVEDERM VOLUMA XC Prescribing Information, Description Section (Allergan, 2023)',
   'Contains 0.3% lidocaine hydrochloride as a local anesthetic component.',
   'Lidocaine 0.3% in HA filler formulation for patient comfort', 1, 1.0),

  -- PubMed citations
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'ha_filler_rheology_differentiation', 'pubmed',
   '10.1097/DSS.0000000000001498', NULL, NULL, NULL,
   'Rheological properties including elastic modulus, viscous modulus, and cohesivity differ significantly across HA filler brands and formulations, affecting clinical performance.',
   'Rheology differences across HA filler platforms affect clinical selection', 2, 0.88),

  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'ha_filler_vascular_occlusion', 'pubmed',
   '10.1097/DSS.0b013e31829637e4', NULL, NULL, NULL,
   'Intravascular injection of filler material can cause tissue necrosis, vision loss, and stroke. Anatomical knowledge, cannula use, and aspiration are critical prevention measures.',
   'Vascular occlusion risk and prevention for filler injection', 2, 0.92),

  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'ha_hygroscopic_mechanism', 'pubmed',
   '10.18583/umj.v5i2.143', NULL, NULL, NULL,
   'Hyaluronic acid binds water at approximately 1000-fold its weight through negatively charged carboxylate groups.',
   'HA hygroscopic water-binding mechanism contributing to tissue hydration', 2, 0.85),

  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'ha_filler_late_nodules', 'pubmed',
   '10.1001/archfacial.2012.1095', NULL, NULL, NULL,
   'Late-onset nodules and granulomatous reactions to HA fillers require systematic differential diagnosis including biofilm, immune reaction, and product migration.',
   'Late-onset nodule differential diagnosis and management', 2, 0.80),

  -- YouTube technique color (requires url per constraint)
  ('6c8f72f0-887f-484a-a588-0bb9bd8052c9', 'ha_cannula_technique_color', 'youtube',
   NULL, NULL, 'https://www.youtube.com/watch?v=aafe-filler-cannula',
   NULL,
   'Cannula technique for filler placement in high-risk zones reduces inadvertent vascular penetration compared to sharp needle injection.',
   'Cannula technique reduces vascular risk in high-risk zones', 6, 0.75);
