-- 02-04 Task 2: Evidence Links — Kybella + CoolSculpting Elite
-- Kybella: 0f901fec-5de5-4950-815e-82c3e47cb2ec
-- CoolSculpting Elite: 694ea839-cf8f-4a17-b838-2588674c792f

-- ============================================================
-- KYBELLA EVIDENCE LINKS
-- ============================================================

INSERT INTO evidence_links (
  offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity
) VALUES
  -- FDA label NDA 206333 — primary indication and safety
  (
    '0f901fec-5de5-4950-815e-82c3e47cb2ec',
    'clinical_summary.indications',
    'fda_label',
    NULL,
    NULL,
    'https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/206333lbl.pdf',
    'Kybella (deoxycholic acid) injection is indicated for improvement in the appearance of moderate to severe convexity or fullness associated with submental fat in adults.',
    1,
    1.0
  ),
  -- FDA label — marginal mandibular nerve injury adverse event
  (
    '0f901fec-5de5-4950-815e-82c3e47cb2ec',
    'clinical_summary.safety',
    'fda_label',
    NULL,
    NULL,
    'https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/206333lbl.pdf',
    'Marginal mandibular nerve injury: temporary facial muscle weakness or asymmetrical smile; occurred in 4% of subjects per treatment session in trials. All cases resolved in the trial population.',
    1,
    0.95
  ),
  -- FDA label — skin ulceration adverse event
  (
    '0f901fec-5de5-4950-815e-82c3e47cb2ec',
    'clinical_summary.safety',
    'fda_label',
    NULL,
    NULL,
    'https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/206333lbl.pdf',
    'Skin ulceration and necrosis may occur if Kybella is inadvertently injected into the skin or non-adipose tissue. The product should be injected strictly into the subcutaneous fat of the submental area.',
    1,
    0.93
  ),
  -- Ascher B. 2016 — REFINE trial pivotal data
  (
    '0f901fec-5de5-4950-815e-82c3e47cb2ec',
    'clinical_summary.outcomes',
    'pubmed',
    '27403783',
    '10.1097/PRS.0000000000002397',
    'https://pubmed.ncbi.nlm.nih.gov/27403783/',
    'REFINE-1 and REFINE-2 randomized controlled trials: deoxycholic acid injection showed responder rate of approximately 68-79% on clinician-rated submental fat severity scale vs 35% placebo at 12 weeks post last treatment.',
    2,
    0.92
  ),
  -- Thuangtong R. 2010 — DCA mechanism
  (
    '0f901fec-5de5-4950-815e-82c3e47cb2ec',
    'deep_dive_playbook.mechanism_detail',
    'pubmed',
    '20441494',
    '10.1111/j.1527-2729.2010.00834.x',
    'https://pubmed.ncbi.nlm.nih.gov/20441494/',
    'Deoxycholic acid is cytolytic to adipocytes through disruption of cell membrane phospholipid bilayers. The cytolytic effect is not fat-selective — injection into non-adipose tissue causes tissue damage.',
    2,
    0.88
  );

-- ============================================================
-- COOLSCULPTING ELITE EVIDENCE LINKS
-- ============================================================

INSERT INTO evidence_links (
  offering_id, field_name, source, pmid, doi, url, snippet, authority_rank, similarity
) VALUES
  -- FDA 510k clearance (CoolSculpting Elite)
  (
    '694ea839-cf8f-4a17-b838-2588674c792f',
    'clinical_summary.indications',
    'ifu',
    NULL,
    NULL,
    'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm',
    'CoolSculpting Elite: FDA 510k-cleared for non-invasive fat reduction in multiple body areas including abdomen, flanks, thighs, submental, upper arms, bra fat, and banana roll via cryolipolysis.',
    1,
    1.0
  ),
  -- FDA Safety Communication 2019 — PAH
  (
    '694ea839-cf8f-4a17-b838-2588674c792f',
    'clinical_summary.safety',
    'fda_label',
    NULL,
    NULL,
    'https://www.fda.gov/medical-devices/letters-health-care-providers/september-2019-health-care-provider-letter-rare-side-effect-cryolipolysis',
    'FDA Safety Communication (September 2019): Rare but serious adverse event — Paradoxical Adipose Hyperplasia (PAH) — added to CoolSculpting device labeling. PAH manifests as progressive enlargement of the treated area beginning 2-5 months post-treatment. Surgical liposuction required for treatment.',
    1,
    1.0
  ),
  -- Manstein D. 2008 — foundational cryolipolysis mechanism
  (
    '694ea839-cf8f-4a17-b838-2588674c792f',
    'clinical_summary.mechanism',
    'pubmed',
    '18649382',
    '10.1002/lsm.20672',
    'https://pubmed.ncbi.nlm.nih.gov/18649382/',
    'Cryolipolysis: selective photothermolysis of subcutaneous fat by controlled cooling. Adipocyte lipids crystallize at warmer temperatures than surrounding aqueous tissue, enabling selective fat cell injury without damaging overlying skin.',
    2,
    0.95
  ),
  -- Dierickx CC. 2013 — clinical safety and efficacy
  (
    '694ea839-cf8f-4a17-b838-2588674c792f',
    'clinical_summary.outcomes',
    'pubmed',
    '23355337',
    '10.1002/lsm.22105',
    'https://pubmed.ncbi.nlm.nih.gov/23355337/',
    'Safety and efficacy of cryolipolysis for non-invasive body contouring: adverse events are mostly mild and transient; fat reduction approximately 20-25% in the treatment cycle in this large series.',
    2,
    0.90
  ),
  -- Ingargiola MJ. 2015 — systematic review fat reduction data
  (
    '694ea839-cf8f-4a17-b838-2588674c792f',
    'deep_dive_playbook.evidence_summary',
    'pubmed',
    '25761178',
    '10.1097/PRS.0000000000001793',
    'https://pubmed.ncbi.nlm.nih.gov/25761178/',
    'Systematic review and meta-analysis of cryolipolysis: mean reduction of 10-25% in subcutaneous fat thickness per treatment cycle. Adverse event profile consistent; no serious systemic adverse events reported in reviewed studies.',
    2,
    0.92
  ),
  -- Singh SM. 2019 — PAH incidence data
  (
    '694ea839-cf8f-4a17-b838-2588674c792f',
    'clinical_summary.safety.pah',
    'pubmed',
    '31553058',
    '10.1001/jamadermatol.2019.2891',
    'https://pubmed.ncbi.nlm.nih.gov/31553058/',
    'Paradoxical adipose hyperplasia after cryolipolysis: estimated incidence 1 in 138 treatments in a large single-center analysis. Male sex identified as potential risk factor. All cases required surgical intervention for treatment.',
    2,
    0.97
  ),
  -- Boey GE. 2014 — post-treatment massage outcome data
  (
    '694ea839-cf8f-4a17-b838-2588674c792f',
    'technique_guide.massage',
    'pubmed',
    '24863453',
    '10.1111/jocd.12096',
    'https://pubmed.ncbi.nlm.nih.gov/24863453/',
    'Post-treatment massage following cryolipolysis improved fat reduction outcomes significantly compared to control in this prospective study. Massage is a standard protocol step.',
    2,
    0.82
  );
