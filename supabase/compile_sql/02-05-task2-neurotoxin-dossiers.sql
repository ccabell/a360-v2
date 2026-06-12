-- 02-05 Task 2: Neurotoxin Product Dossiers — Dysport, Jeuveau, Daxxify, Xeomin
-- Products: Dysport (a7e1b29e), Jeuveau (8adda68a), Daxxify (007d98fd), Xeomin (92a05fe8)
-- Category: Neurotoxins (57b7c5a8-0799-42b0-9111-8441f18a82db)
-- Category doc IDs (from calibration compile v2 — in compile_manifest.json):
--   clinical_summary:    4512a79d-0322-478e-a994-9b007b6567e2
--   technique_guide:     78eead5e-c25c-4b1f-8753-ee6856757cd8
--   sales_education:     84be871e-c167-46b1-ae93-7a70109662eb
--   deep_dive_playbook:  634459ac-1162-4f1d-b37f-94ad06ac56fa
-- Note: These products inherit from Neurotoxins category; write BRAND DELTA only

-- ============================================================
-- TAXONOMY ENRICHMENT — Products table update for Dysport
-- FDA label data for abobotulinumtoxinA (Dysport)
-- ============================================================

UPDATE products SET
  onset_time = '2-3 days',
  peak_effect = '14 days',
  duration_of_effect = '3-4 months',
  indications = ARRAY['glabellar lines', 'cervical dystonia', 'lower limb spasticity', 'upper limb spasticity (adults)', 'plantar fasciitis'],
  fda_approved_areas = ARRAY['glabella (glabellar lines)', 'cervical muscles (cervical dystonia)']
WHERE id = 'a7e1b29e-da10-40de-bea8-70d6e6624f43'
AND onset_time IS NULL; -- idempotent

-- ============================================================
-- DYSPORT — abobotulinumtoxinA
-- Product ID: a7e1b29e-da10-40de-bea8-70d6e6624f43
-- FDA-approved: glabellar lines, cervical dystonia
-- Differentiator: 2.5:1 unit ratio vs Botox, faster onset (some sources), larger diffusion radius
-- ============================================================

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'aa01bb02-cc03-dd04-ee05-ff0611223344',
  'a7e1b29e-da10-40de-bea8-70d6e6624f43',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'clinical', 'clinical_summary', 'provider',
  'Dysport — Clinical Summary (Brand Delta)',
  E'## Product Identity — Dysport Delta from Neurotoxins Category\n\nDysport (abobotulinumtoxinA) is manufactured by Galderma. Active ingredient: abobotulinumtoxinA, a botulinum neurotoxin type A complex derived from Clostridium botulinum. Available as 300U or 500U vials (Speywood units — NOT interchangeable with Botox or Xeomin units). Formulation: lyophilized powder with lactose and human serum albumin. Contains 0.125 mg lactose and human serum albumin per vial as stabilizers. Requires reconstitution prior to injection. [Dysport prescribing information, FDA NDA 125274]\n\n## Unit Ratio — CRITICAL SAFETY POINT\n\nDysport units are Speywood units. The approximate clinical equivalence to onabotulinumtoxinA (Botox) is **approximately 2.5:1 to 3:1 (Dysport:Botox)** — meaning a treatment requiring 20 U Botox would use approximately 50–60 U Dysport. This ratio is NOT exact — individual patient response varies. NEVER use Dysport units interchangeably with Botox units. Unit confusion errors have caused patient harm. [peer-reviewed: Carruthers J. Dermatol Surg 2005; FDA prescribing information]\n\n## FDA-Approved Indications\n\n- **Glabellar lines (frown lines):** Temporary improvement of moderate-to-severe glabellar lines in adults <65 years [FDA NDA 125274, approved 2009]\n- **Cervical dystonia:** Reduction of severity in adults [FDA NDA 125274]\n- **Lower limb spasticity:** Adults and children ≥2 years (separate pediatric indication)\n- **Upper limb spasticity:** Adults [FDA; separate NDA supplements]\n\n**Off-label uses (gateway posture):** Forehead lines, crow''s feet, bunny lines, perioral lines, platysmal bands, hyperhidrosis, gummy smile — same broad off-label application profile as other BoNT-A neurotoxins. Gateway posture applies: characterize range, point to prescribing information for exact protocol. [field practice; no FDA enumeration]\n\n## Pharmacokinetics / Timing Delta\n\n- **Onset:** Approximately 2–3 days (some clinical evidence suggests onset may be slightly faster than onabotulinumtoxinA; sources differ) [peer-reviewed; consensus differs — "sources disagree on onset differential"]\n- **Peak effect:** Approximately 14 days [FDA prescribing information]\n- **Duration:** 3–4 months for cosmetic applications (similar to other BoNT-A products) [FDA NDA 125274; peer-reviewed]\n\n## Diffusion Profile Delta\n\nDysport has a LARGER diffusion radius than onabotulinumtoxinA at equivalent clinical doses — clinically relevant for precision placement. In the glabellar complex, larger diffusion radius can be advantageous (covers the corrugator/procerus field effectively with fewer injection points). In zones requiring precise confinement (e.g., perioral, platysma, periorbital in experienced hands), this must be accounted for in dosing and placement. [peer-reviewed: Carruthers J. Dermatol Surg 2005; field practice consensus]\n\n**Gateway posture on diffusion:** Diffusion radius differences are concentration-dependent and technique-dependent. Sources differ on whether dilution affects diffusion clinically. For exact protocol, see Dysport prescribing information [FDA/DailyMed Dysport NDA 125274 →].\n\n## Safety Profile Delta (shared safety floor applies from category; Dysport-specific additions)\n\n**Contraindications (Safety Floor — FDA NDA 125274, rank 1):**\n- Known hypersensitivity to botulinum toxin or formulation components (lactose, human serum albumin)\n- Infection at proposed injection sites\n- Cow''s milk protein allergy — Dysport contains trace lactose derived from cow''s milk; rare anaphylaxis reported in patients with severe cow''s milk allergy. **This is a Dysport-specific contraindication not shared with Botox or Xeomin.** [FDA prescribing information — BLACK BOX WARNING adjacent]\n\n**Boxed Warning (FDA label — rank 1, mandatory disclosure):** Botulinum toxin products may spread beyond injection site, causing potentially life-threatening swallowing/breathing difficulties. Risk highest in patients treated for spasticity/cervical dystonia; cosmetic doses are lower risk but boxed warning applies to all products. [FDA NDA 125274 Black Box Warning — always disclose]\n\n**Lactose allergy note:** Mandatory pre-treatment screening for cow''s milk protein allergy. If present, Xeomin or onabotulinumtoxinA may be safer alternatives. [FDA prescribing information]',
  '4512a79d-0322-478e-a994-9b007b6567e2',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'bb02cc03-dd04-ee05-ff06-001122334455',
  'a7e1b29e-da10-40de-bea8-70d6e6624f43',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'clinical', 'technique_guide', 'provider',
  'Dysport — Technique Guide (Brand Delta)',
  E'## Dosing Delta — Dysport-Specific\n\nDysport is dosed in Speywood units, NOT Allergan/Revance/Merz units. **The unit ratio is approximately 2.5:1 to 3:1 (Dysport:Botox units)** — use the higher-end of the range for forehead and areas requiring precision (to avoid over-diffusion); lower end of range for the glabellar complex where broader diffusion is acceptable.\n\nThe Dysport prescribing information provides specific glabellar dosing: 50 U Dysport total, divided across 5 injection points in the glabellar complex. [FDA NDA 125274 — for exact per-area dosing, see [Dysport prescribing information DailyMed →]]\n\n**Gateway posture:** Area-by-area Dysport dosing varies by practitioner experience, patient anatomy, and institutional protocol. Characterize as "ranges reported in literature from X–Y U per area, with individual titration"; do not present a single table as a clinical standard. Sources differ significantly on per-site dosing. [peer-reviewed; field practice]\n\n## Reconstitution Notes\n\nDysport reconstitution: 1.5 mL preservative-free normal saline per 300U vial produces a 200U/mL solution (2U/0.01mL per injection). Some practitioners use 2.5 mL per vial (120U/mL). Concentration choice affects diffusion — more dilute solutions diffuse more. [manufacturer IFU]\n\n## Diffusion Planning\n\nDysport''s larger diffusion radius is a technique factor:\n- **Glabellar complex:** 5-point injection pattern per label; diffusion to procerus and corrugators is desirable — fewer points needed than with lower-diffusion products\n- **Forehead:** Plan for wider diffusion radius; place injection points further from brow than Botox protocols to avoid brow ptosis from medial-lateral corrugator spread\n- **Crow''s feet / periorbital:** Experienced injectors adapt placement; less experienced should be conservative with Dysport in this zone vs. Botox\n\n## Combination Sequencing\nSame-visit BoNT + energy device: acceptable (BoNT does not contraindicate energy devices). Same-visit BoNT + filler: field-standard; inject filler first then toxin in areas where precise anatomical landmarks are needed for toxin placement (avoids post-filler swelling obscuring anatomy). [field practice consensus]\n',
  '78eead5e-c25c-4b1f-8753-ee6856757cd8',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'cc03dd04-ee05-ff06-0011-223344556677',
  'a7e1b29e-da10-40de-bea8-70d6e6624f43',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'sales_education', 'patient_education', 'patient',
  'Dysport — Patient Education (Brand Delta)',
  E'## What Makes Dysport Different\n\nDysport is one of several FDA-approved botulinum toxin treatments for moderate-to-severe frown lines. Like Botox, it temporarily relaxes the muscles responsible for creating wrinkles in the glabella (frown line area). Both are FDA-approved for the same indication with the same goal — smoother frown lines through muscle relaxation. The difference is in the formulation and the dosing system.\n\n**The practical difference for patients:** Dysport is dosed in different units than Botox — your provider will calculate the appropriate Dysport dose for you. The number of units is higher than Botox because the unit systems are different, but the clinical effect is the same when dosed correctly.\n\n**One note on allergies:** Dysport contains trace amounts of lactose. If you have a severe cow''s milk protein allergy, let your provider know before treatment — this is an important screening point for Dysport specifically.\n\n## Onset and Duration\n\n- Results typically begin appearing at 2–3 days\n- Peak effect at approximately 2 weeks\n- Results last approximately 3–4 months, similar to other neurotoxin treatments\n\nSome patients report Dysport''s onset feels slightly faster than other toxins, though clinical research on this point is mixed.\n\n## Benefit Framing\n\nDysport delivers the same smoothing of frown lines as other botulinum toxin treatments. For patients who have used Dysport specifically, maintaining continuity is a valid reason for preference — individual response can vary slightly between toxin products, and patients who respond well to one often do well staying with it.\n\n## Combination Therapy\nDysport addresses dynamic (movement-related) lines only. It does not address volume loss, static lines, or skin quality concerns. Most patients with multiple rejuvenation goals benefit from a combination approach including toxin, filler, and/or energy-based treatments.',
  '84be871e-c167-46b1-ae93-7a70109662eb',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'dd04ee05-ff06-0011-2233-445566778899',
  'a7e1b29e-da10-40de-bea8-70d6e6624f43',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'sales_education', 'faq', 'patient',
  'Dysport — FAQ',
  E'## Common Questions\n\n**"Is Dysport the same as Botox?"**\nBoth are FDA-approved botulinum toxin type A products for frown lines, and they work the same way — by temporarily relaxing the muscle. The difference is the specific protein complex and the unit system used for dosing. Many patients use both interchangeably over time.\n\n**"The dose sounds much higher than Botox — is that safe?"**\nYes. Dysport is measured in Speywood units, which are a different (smaller) unit than Botox units. When converted correctly, the actual protein amount and clinical effect are equivalent. Your provider calculates the appropriate dose.\n\n**"Do I have a milk allergy?"**\nDysport contains trace lactose (milk sugar). If you have a severe cow''s milk protein allergy, please tell your provider — this is the one Dysport-specific consideration. A different toxin (Botox, Xeomin, or Daxxify) may be recommended instead.\n\n**"How long does it last?"**\nApproximately 3–4 months for most patients — similar to other botulinum toxin treatments.\n\n## Objection Reframes\n\n**"I''ve been using Botox. Why would I switch?"**\nThere''s no compelling reason to switch if Botox is working well for you. Dysport is a legitimate alternative, not an upgrade. Some patients prefer Dysport for perceived onset differences or their provider''s preference. If your current treatment is working, stay with it — consistency often produces the most predictable results.',
  '84be871e-c167-46b1-ae93-7a70109662eb',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'ee05ff06-0011-2233-4455-667788991100',
  'a7e1b29e-da10-40de-bea8-70d6e6624f43',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'deep_product', 'deep_dive_playbook', 'provider',
  'Dysport — Deep Dive Playbook',
  E'## Differentiation Within the Neurotoxin Category\n\n**Galderma-brand positioning:** Dysport is manufactured by Ipsen/Galderma with a distinct brand identity from Allergan/Botox. Practices with Galderma partnership (Restylane product agreements) often maintain Dysport as part of the portfolio relationship.\n\n**Larger diffusion radius:** The most clinically significant differentiator. This is a double-edged characteristic: in the glabella, it enables effective treatment with 5-point injection (fewer points, potentially more comfortable). In precision zones (periorbital, perioral), requires conservative approach and experienced technique.\n\n**Faster perceived onset:** Some clinical data and significant field-practice consensus suggest Dysport has onset beginning at 2–3 days vs. Botox''s typical 3–5 days. This is a patient-facing talking point; however, the peer-reviewed evidence is not consistent — some studies show no statistically significant onset difference. [Carruthers J. Dermatol Surg 2005; sources differ on this point]\n\n**Lactose formulation risk:** The presence of lactose (trace cow''s milk protein) is a meaningful screening consideration that Botox and Xeomin do not share. Must be part of pre-treatment intake questionnaire.\n\n## Evidence Summary\n\nMultiple FDA approval clinical trials for glabellar lines. Phase 3 data (NDA 125274): statistically significant improvement in investigator-assessed glabellar line score at 14 and 30 days post-injection. Duration data in trials: ~16 weeks median to return to baseline. Well-established safety profile — 10+ years of post-market data. Evidence level: Level I (RCTs supporting FDA approval).\n\n## Unit Conversion Reference\n\n| Botox (U) | Dysport (U) | Ratio |  \n|-----------|------------|-------|\n| 20 | 50 | 2.5:1 |\n| 40 | 100 | 2.5:1 |\n| 60 | 150 | 2.5:1 |\n\nNote: Ratios are approximate. Individual titration required. Some practitioners use 3:1. [peer-reviewed: Carruthers J. Dermatol Surg 2005; field practice]. Gateway posture applies — present as ranges, not prescriptive dosing table.',
  '634459ac-1162-4f1d-b37f-94ad06ac56fa',
  'draft', 1
);

-- ============================================================
-- JEUVEAU — prabotulinumtoxinA-xvfs (Evolus)
-- Product ID: 8adda68a-9fd2-49ad-8852-641970135131
-- FDA-approved: glabellar lines only (narrower than Botox/Dysport)
-- Differentiator: aesthetics-only brand, competitive pricing model
-- ============================================================

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'ff06aa07-bb08-cc09-dd10-eeff00112233',
  '8adda68a-9fd2-49ad-8852-641970135131',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'clinical', 'clinical_summary', 'provider',
  'Jeuveau — Clinical Summary (Brand Delta)',
  E'## Product Identity — Jeuveau Delta\n\nJeuveau (prabotulinumtoxinA-xvfs) is manufactured by Evolus. Approved by FDA in 2019, it is the most recently approved botulinum toxin type A for aesthetic use (as of 2026). It is manufactured by Daewoong Pharmaceutical (Korea) and distributed by Evolus under an exclusive aesthetics-market brand strategy. Unit designation: Evolus units, described as equivalent to onabotulinumtoxinA units (1:1 conversion). [Jeuveau prescribing information, FDA NDA 761085]\n\n## FDA-Approved Indications\n\n- **Glabellar lines:** Temporary improvement of moderate-to-severe glabellar lines in adults [FDA NDA 761085, approved February 2019]\n\n**ONLY FDA-approved indication is glabellar lines.** This is more limited than Botox and Dysport. Off-label applications (forehead, crow''s feet, etc.) follow the same field-practice pattern but Jeuveau has NO other FDA approvals. Agents should be careful not to imply FDA approval for non-glabellar applications. [FDA prescribing information — gateway posture]\n\n## Pharmacokinetics\n\n- **Onset:** Approximately 2–3 days (similar to other BoNT-A products)\n- **Peak effect:** 14 days [FDA prescribing information]\n- **Duration:** 3–4 months for glabellar lines [FDA NDA 761085 clinical trials]\n\n## Unit System\n\nEvolus states Jeuveau units are equivalent to Botox units (1:1). However, clinical equivalency data are from the FDA approval trials, not formal head-to-head dose equivalence studies across all areas. Use as 1:1 with Botox for glabellar dosing (FDA-approved indication); for off-label use, individual titration is recommended. [peer-reviewed; FDA prescribing information]\n\n## Safety Profile (Neurotoxins class safety applies; Jeuveau-specific notes)\n\n**Contraindications (Safety Floor — FDA NDA 761085, rank 1):**\n- Infection at injection site\n- Known hypersensitivity to botulinum toxin or formulation components\n\n**Boxed Warning:** Same class-level boxed warning as all BoNT-A products — spread beyond injection site, swallowing/breathing risk. [FDA NDA 761085 Black Box Warning]\n\n**Formulation:** Contains 0.5 mg/mL human serum albumin + sodium chloride. No lactose — no cow''s milk protein allergy concern.\n\n## Practice Economics Note\n\nEvolus positioned Jeuveau as a value-tier aesthetics neurotoxin with competitive pricing relative to Botox and Dysport. This is a commercial positioning fact relevant to clinic purchasing decisions but NOT a clinical quality statement. Clinical efficacy data show non-inferiority to onabotulinumtoxinA in the approved indication. [FDA pivotal trials]',
  '4512a79d-0322-478e-a994-9b007b6567e2',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'aa07bb08-cc09-dd10-ee11-ff0011223344',
  '8adda68a-9fd2-49ad-8852-641970135131',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'clinical', 'technique_guide', 'provider',
  'Jeuveau — Technique Guide (Brand Delta)',
  E'## Dosing Delta\n\nJeuveau units are described as equivalent to Botox units (1:1). For FDA-approved glabellar indication: standard dosing mirrors Botox label dosing (typically 20–40U across 5 injection points in the glabellar complex). For off-label applications: 1:1 conversion starting point with individual titration. [FDA NDA 761085; field practice]\n\n**Gateway posture:** For exact glabellar injection protocol and dose, see Jeuveau Prescribing Information [FDA/DailyMed Jeuveau NDA 761085 →].\n\n## Reconstitution\n\nJeuveau supplied as 100U vials (lyophilized). Standard reconstitution: 2.5 mL preservative-free saline = 4U/0.1mL. Alternatively: 1.25 mL saline = 8U/0.1mL (less dilute). [manufacturer IFU]\n\n## Technique Notes\n\nNo meaningful technique differences from onabotulinumtoxinA at 1:1 unit equivalency. Standard neurotoxin injection technique applies. Diffusion profile appears comparable to Botox at equivalent doses (distinguishing it from Dysport''s larger diffusion radius). [field practice consensus; peer-reviewed: phase 3 trial data]',
  '78eead5e-c25c-4b1f-8753-ee6856757cd8',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'bb08cc09-dd10-ee11-ff12-001122334455',
  '8adda68a-9fd2-49ad-8852-641970135131',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'sales_education', 'patient_education', 'patient',
  'Jeuveau — Patient Education (Brand Delta)',
  E'## What Jeuveau Is\n\nJeuveau is an FDA-approved botulinum toxin type A treatment specifically designed for aesthetic use — targeting moderate-to-severe frown lines (glabellar lines). Like Botox, it temporarily relaxes the muscles that create frown lines, producing a smoother appearance for approximately 3–4 months.\n\nJeuveau is branded as an "aesthetics-first" neurotoxin — it was developed and approved specifically for cosmetic use, without the therapeutic (medical) indications that older products carry.\n\n## What to Expect\n\n- Onset: Results typically appear within 2–3 days\n- Peak effect: Approximately 2 weeks post-treatment\n- Duration: 3–4 months\n\nThe treatment experience is the same as other neurotoxins: brief injections, minimal discomfort, no downtime.\n\n## Benefit Framing\n\nJeuveau addresses dynamic frown lines — lines created by muscle movement. It does not address volume loss, static etched lines, or skin quality. For patients whose primary concern is frown lines, it delivers a clinically equivalent result to established products.\n\n## Combination Therapy\nNeurotoxin (Jeuveau) + filler for a complete upper-face result is a common combination. Toxin first to relax muscle, then filler to address any volume deficits or static lines that muscle relaxation doesn''t resolve.',
  '84be871e-c167-46b1-ae93-7a70109662eb',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'cc09dd10-ee11-ff12-0013-112233445566',
  '8adda68a-9fd2-49ad-8852-641970135131',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'sales_education', 'faq', 'patient',
  'Jeuveau — FAQ',
  E'## Common Questions\n\n**"Is Jeuveau as good as Botox?"**\nJeuveau showed non-inferiority to Botox in FDA clinical trials for frown lines — meaning it produces equivalent results. It''s a newer product from a specialized aesthetics company; some patients prefer it for that reason.\n\n**"The name sounds new. Is it proven?"**\nJeuveau was FDA-approved in 2019 following clinical trials and post-market experience since then. It has an established safety profile equivalent to other neurotoxins in its class.\n\n## Objection Reframes\n\n**"I''ll just stick with Botox — I know what to expect."**\nA completely valid choice. Jeuveau produces equivalent results to Botox in clinical trials. If you have a working relationship with Botox and consistent results, there is no reason to change. If you''re open to exploring options, Jeuveau is a legitimate alternative worth discussing with your provider.',
  '84be871e-c167-46b1-ae93-7a70109662eb',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'dd10ee11-ff12-0013-1122-334455667788',
  '8adda68a-9fd2-49ad-8852-641970135131',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'deep_product', 'deep_dive_playbook', 'provider',
  'Jeuveau — Deep Dive Playbook',
  E'## Differentiation\n\n**Aesthetics-only positioning:** Jeuveau (Evolus brand) is positioned as an aesthetics-first toxin with no therapeutic applications. This is a brand identity — not a clinical distinction — but it affects how Evolus markets to practices (aesthetics-focused conferences, aesthetics-practice partnerships).\n\n**1:1 Botox unit equivalence:** The simplest dosing conversion of any neurotoxin alternative. No mental math for providers who have Botox muscle-dosing dialed in.\n\n**Limited FDA approvals:** Glabellar lines only. This is the most clinically narrow approval of any currently marketed neurotoxin. For practices offering broad neurotoxin portfolios (forehead, crow''s feet, neck, hyperhidrosis), Jeuveau requires off-label counseling for all non-glabellar applications.\n\n**Market positioning:** Evolus has pursued competitive pricing as a key value proposition. Practice purchasing may benefit from competitive rebate programs. This is a commercial consideration, not a patient-facing clinical point.\n\n## Evidence Summary\n\nFDA pivotal trial (SAKURA 1, SAKURA 2): Phase 3 randomized, double-blind, placebo-controlled trials for glabellar lines. Primary endpoint (glabellar line improvement at 30 days): met. Non-inferiority comparison vs. onabotulinumtoxinA for duration and responder rates. Safety: equivalent to class. Evidence level: Level I (RCTs for glabellar indication).\n\n## Comparison Note\n\nJeuveau vs. Botox: equivalent clinical performance at glabella, different brand ecosystem (Evolus vs. Allergan). No meaningful clinical differentiation. Jeuveau vs. Daxxify: Jeuveau lasts 3–4 months; Daxxify 6 months — significant duration differentiation that matters for patient segment and practice model.',
  '634459ac-1162-4f1d-b37f-94ad06ac56fa',
  'draft', 1
);

-- ============================================================
-- DAXXIFY — daxibotulinumtoxinA-lanm (Revance)
-- Product ID: 007d98fd-58b5-4d20-be11-caf421c0dccb
-- FDA-approved: glabellar lines (2023)
-- Key differentiator: PEPTIDE-STABILIZED, ~6 MONTH DURATION (longest of any BoNT-A)
-- ============================================================

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'ee11ff12-0013-1122-3344-556677889901',
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'clinical', 'clinical_summary', 'provider',
  'Daxxify — Clinical Summary (Brand Delta)',
  E'## Product Identity — Daxxify Delta\n\nDaxxify (daxibotulinumtoxinA-lanm) is manufactured by Revance Therapeutics. FDA-approved September 2022, commercially launched 2023. It is the FIRST BoNT-A formulation to use a **peptide excipient** (proprietary RTP004 peptide) instead of human serum albumin as a stabilizer. This formulation change enables significantly extended duration compared to all other commercially available botulinum toxin type A products. Unit designation: Revance units; FDA-approved dosing for glabellar lines is 40U. [Daxxify prescribing information, FDA NDA 761162]\n\n## FDA-Approved Indications\n\n- **Glabellar lines:** Temporary improvement of moderate-to-severe glabellar lines in adults [FDA NDA 761162, approved September 2022]\n\n## Duration — The Defining Differentiator\n\nDaxxify''s pivotal trials demonstrated a **median duration of approximately 6 months** (24 weeks) — approximately 50–100% longer than onabotulinumtoxinA, abobotulinumtoxinA, or prabotulinumtoxinA. In the SAKURA-3 long-term safety study, a meaningful proportion of patients maintained results at 6 months; some at 9 months. [FDA NDA 761162 pivotal trial data; peer-reviewed: Bertucci V. Aesthet Surg J 2023]\n\nThis is the single most clinically and commercially significant differentiator in the current neurotoxin market — it changes the treatment interval economics for patients and practices.\n\n## Pharmacokinetics\n\n- **Onset:** Approximately 1–3 days (may have faster onset than older formulations; limited comparative head-to-head data)\n- **Peak effect:** Approximately 1–2 weeks\n- **Duration:** Approximately 6 months median; range 3–9 months across patient population [FDA NDA 761162]\n\n## Unit System and Dosing\n\nFDA-approved glabellar dose: 40 Revance units (5 injection points, 8U each). This is NOT the same as 40 Botox units — the dose-equivalence relationship is not a 1:1 ratio because Revance units are measured against their own reference standard. **Do not dose-convert from Botox units for Daxxify.** Use 40U for glabellar lines per label. For off-label areas, evidence is emerging. [FDA prescribing information; peer-reviewed]\n\n## Safety Profile Delta\n\n**Peptide excipient (RTP004):** Novel excipient; no human albumin. No theoretical vCJD concern. Unknown long-term excipient immunogenicity data (no post-market signal as of 2024). [FDA prescribing information]\n\n**Contraindications (Safety Floor — FDA NDA 761162, rank 1):**\n- Infection at injection site\n- Known hypersensitivity to botulinum toxin or excipients\n\n**Boxed Warning:** Same class boxed warning as all BoNT-A products. [FDA NDA 761162]\n\n**Resistance / Immunogenicity:** The peptide excipient design aims to reduce immunogenic potential. This is a theoretical advantage without head-to-head immunogenicity comparison data yet available. [manufacturer claim; peer-reviewed data pending]\n\n## Clinical Considerations for Extended Duration\n\nThe 6-month duration has both benefits and considerations:\n- **Benefit:** Fewer treatment visits, potentially better patient compliance, more predictable scheduling\n- **Consideration:** If a patient develops an unwanted effect (brow ptosis, asymmetry), they wait longer for it to resolve compared to shorter-duration toxins\n- **Counseling:** Patients should be informed of the extended duration before treatment; important for first-time Daxxify patients especially [field practice consensus]',
  '4512a79d-0322-478e-a994-9b007b6567e2',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'ff12aa13-bb14-cc15-dd16-ee1122334466',
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'sales_education', 'patient_education', 'patient',
  'Daxxify — Patient Education (Brand Delta)',
  E'## What Makes Daxxify Different\n\nDaxxify is an FDA-approved frown line treatment that works the same way as Botox or Dysport — by temporarily relaxing the muscles that create frown lines. What makes it uniquely different is how long it lasts: **approximately 6 months**, compared to the 3–4 months typical of other neurotoxins.\n\nThis is the first real duration breakthrough in the neurotoxin category. Daxxify achieves longer duration through a novel peptide-based formulation (rather than the albumin protein used in older products) — the peptide binds more persistently, extending the effect.\n\n## Who This Is For\n\nDaxxify is ideal for patients who:\n- Want fewer treatment visits per year (2 instead of 3–4)\n- Find it challenging to schedule regular appointments every 3–4 months\n- Are happy with their neurotoxin results but wish they lasted longer\n- Prefer fewer appointments for the same result\n\n## What to Expect\n\n- Results begin appearing within 1–3 days\n- Full effect develops within 1–2 weeks\n- Duration: most patients see results lasting approximately 6 months (some 3 months, some up to 9 months)\n\n**One important note:** Because Daxxify lasts longer, any treatment effect — including the rare unwanted effect like mild brow heaviness — also resolves more slowly than with shorter-duration toxins. Your provider will discuss this with you before treatment.\n\n## Benefit Framing\n\nFor patients who value convenience and predictability, Daxxify''s extended duration is meaningful: two treatments per year instead of three or four. For practices, it changes the patient schedule and potentially improves treatment compliance. The value math: longer duration = more months of result per dollar invested.\n\n## Combination Therapy\nDaxxify addresses dynamic lines only. A complete rejuvenation plan that includes Daxxify may also include dermal fillers for volume and energy treatments for structural laxity.',
  '84be871e-c167-46b1-ae93-7a70109662eb',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'aa13bb14-cc15-dd16-ee17-ff2233445577',
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'clinical', 'technique_guide', 'provider',
  'Daxxify — Technique Guide (Brand Delta)',
  E'## Dosing — Glabellar Lines (FDA-Approved)\n\nFDA label dose: 40 Revance units for glabellar lines, delivered across 5 injection points (8U per point). DO NOT convert from Botox dosing — Revance units are not equivalent to Allergan units. Use the FDA-approved dose for glabellar lines. [FDA NDA 761162]\n\nFor off-label areas: Limited published data available as of 2024–2025. Early field-practice experience suggests starting at lower Revance unit doses relative to Botox equivalents because of the extended duration — if overtreated, the patient waits longer for resolution. Conservative titration for first-time patients is strongly recommended. [field practice consensus; emerging data]\n\n**Gateway posture:** For exact dosing per area and any off-label protocol guidance, see Revance clinical training materials and prescribing information [Revance DailyMed →].\n\n## Duration Counseling — Clinical Technique Note\n\nBefore injecting Daxxify, especially for a first-time patient with this toxin:\n1. Counsel explicitly on 6-month duration — the longer duration is the value, but adverse effects also last longer\n2. Start conservatively (lower dose or conservative placement) if any concern about patient anatomy predictability\n3. Document pre-treatment brow position and any baseline asymmetry — asymmetries that "borrow time" from 3-month toxin get 6 months with Daxxify\n\n## Reconstitution\nSupplied as 100U vials. Reconstitution per manufacturer IFU. [Revance IFU]',
  '78eead5e-c25c-4b1f-8753-ee6856757cd8',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'bb14cc15-dd16-ee17-ff18-003344556688',
  '007d98fd-58b5-4d20-be11-caf421c0dccb',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'deep_product', 'deep_dive_playbook', 'provider',
  'Daxxify — Deep Dive Playbook',
  E'## Differentiation\n\n**Extended duration (6 months median):** The clinical headline. No other FDA-approved cosmetic neurotoxin achieves this duration. This is a Level I evidence claim (pivotal trial data). Daxxify is the first true duration innovation in the neurotoxin category in 20+ years.\n\n**Peptide excipient (RTP004):** First non-albumin BoNT-A formulation. The peptide enables firmer neuromuscular junction binding (hypothesized mechanism for extended duration). No human albumin = no vCJD theoretical risk. No lactose = no cow''s milk allergy concern. Novel excipient = evolving long-term immunogenicity data.\n\n**40U glabellar dose:** FDA-approved glabellar dose is 40 Revance units — clearly specified, not ambiguous. Simplifies dosing for the FDA-approved indication.\n\n**Market position:** Premium neurotoxin segment. Revance positions Daxxify as a premium, longer-duration option with corresponding practice economics implications (higher per-treatment cost, fewer treatments per year, different patient segment).\n\n## Evidence Summary\n\nSAKURA-1 and SAKURA-2 (Phase 3 RCTs): primary endpoint met; median duration 24 weeks. SAKURA-3 (long-term safety): confirmed extended duration in repeat-treatment population; no new safety signals. Bertucci V. et al. Aesthetic Surgery Journal 2023: real-world outcomes consistent with pivotal data. Evidence level: Level I for glabellar indication.\n\n## Comparison (Duration Focus)\n\n| Product | Duration | FDA Cosmetic Indications |\n|---------|----------|-------------------------|\n| Botox | 3–4 months | Multiple (glabella, forehead, crow''s feet, etc.) |\n| Dysport | 3–4 months | Glabella, cervical dystonia |\n| Jeuveau | 3–4 months | Glabella only |\n| Xeomin | 3–4 months | Glabella only (cosmetic) |\n| Daxxify | ~6 months | Glabella only |\n\nDaxxify is the clear duration leader; Botox is the breadth leader in FDA indications.',
  '634459ac-1162-4f1d-b37f-94ad06ac56fa',
  'draft', 1
);

-- ============================================================
-- XEOMIN — incobotulinumtoxinA (Merz)
-- Product ID: 92a05fe8-d349-4d2f-9a3f-bc5901f94dfa
-- FDA-approved: glabellar lines (cosmetic), cervical dystonia, blepharospasm
-- Differentiator: "naked toxin" — no complexing proteins, no accessory proteins
-- ============================================================

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'cc15dd16-ee17-ff18-0019-114455667799',
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'clinical', 'clinical_summary', 'provider',
  'Xeomin — Clinical Summary (Brand Delta)',
  E'## Product Identity — Xeomin Delta\n\nXeomin (incobotulinumtoxinA) is manufactured by Merz Aesthetics. It is unique in the neurotoxin class for being the ONLY commercially available botulinum toxin type A that consists of the pure toxin molecule only — **no complexing proteins, no accessory proteins**. All other products (Botox, Dysport, Jeuveau) include the neurotoxin type A complex with associated complexing proteins (hemagglutinins, non-hemagglutinin proteins). Xeomin''s manufacturing process removes these proteins via chromatographic purification. Units: Merz units, described as 1:1 equivalent to Botox units. [Xeomin prescribing information, FDA NDA 125360]\n\n## FDA-Approved Indications\n\n**Cosmetic:**\n- **Glabellar lines:** Temporary improvement of moderate-to-severe glabellar lines in adults [FDA NDA 125360, approved July 2011]\n\n**Therapeutic:**\n- **Cervical dystonia** in adults [FDA]\n- **Blepharospasm** in adults previously treated with onabotulinumtoxinA [FDA]\n- **Upper limb spasticity** in adults [FDA]\n\n## The "Naked Toxin" Differentiator\n\nXeomin contains only the 150kDa botulinum neurotoxin molecule — no complexing proteins. The clinical hypothesis behind this: complexing proteins in other products are potential antigens; over multiple treatments, some patients develop neutralizing antibodies against these proteins, which can reduce treatment efficacy (secondary non-response). By eliminating the complexing proteins, Xeomin theoretically reduces immunogenic load and the risk of secondary non-response over time.\n\n**Evidence on immunogenicity advantage:** This hypothesis has theoretical support and some in vitro data, but clinical superiority in preventing secondary non-response vs. onabotulinumtoxinA has NOT been conclusively demonstrated in large prospective studies as of 2024. Sources differ on whether the theoretical advantage translates to meaningful clinical benefit. [peer-reviewed: Naumann M. Mov Disord 2010; Dressler D. J Neural Transm 2019; sources differ]\n\n## Pharmacokinetics\n\n- **Onset:** Approximately 3–5 days (similar to onabotulinumtoxinA; some data suggest onset similar)\n- **Peak effect:** Approximately 14 days\n- **Duration:** 3–4 months [FDA prescribing information; peer-reviewed]\n\n## Safety Profile Delta\n\n**Contraindications (Safety Floor — FDA NDA 125360, rank 1):**\n- Known hypersensitivity to botulinum toxin or components\n- Infection at injection site\n\n**No albumin:** Xeomin formulation uses human serum albumin as an excipient (small amount for lyophilization stability) — NOTE: Xeomin does contain a small amount of human serum albumin, unlike initial perception. No lactose. [FDA prescribing information — verify formulation details with current label]\n\n**Boxed Warning:** Same class boxed warning as all BoNT-A products.',
  '4512a79d-0322-478e-a994-9b007b6567e2',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'dd16ee17-ff18-0019-1144-556677889901',
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'clinical', 'technique_guide', 'provider',
  'Xeomin — Technique Guide (Brand Delta)',
  E'## Dosing Delta\n\nXeomin units are described as 1:1 equivalent to onabotulinumtoxinA units. For glabellar lines: typical range mirrors Botox glabellar dosing (20–40U across 5 injection points). [FDA NDA 125360; peer-reviewed]\n\n**Gateway posture:** For exact per-area dosing, see Xeomin Prescribing Information [FDA/DailyMed Xeomin NDA 125360 →].\n\n## No Refrigeration Requirement (Practical Note)\n\nXeomin does NOT require refrigeration before reconstitution — it can be stored at room temperature (up to 25°C) for up to 36 months. This is a logistics differentiator from Botox and Dysport (which require refrigerated storage). Reconstituted Xeomin should be used within 24 hours and stored refrigerated. [Xeomin IFU]\n\n**This is a practice management differentiator** — room temperature storage simplifies inventory handling for mobile injectors and practices with limited refrigeration capacity.\n\n## Technique Notes\n\nNo meaningful injection technique differences from onabotulinumtoxinA at 1:1 units. Diffusion profile comparable to Botox. Standard neurotoxin technique applies.',
  '78eead5e-c25c-4b1f-8753-ee6856757cd8',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'ee17ff18-0019-1144-5566-778899001122',
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'sales_education', 'patient_education', 'patient',
  'Xeomin — Patient Education (Brand Delta)',
  E'## What Xeomin Is\n\nXeomin is an FDA-approved botulinum toxin treatment for moderate-to-severe frown lines, manufactured by Merz (the same company that makes Ultherapy). It works the same way as Botox — temporarily relaxing the muscles that create frown lines — with a result that lasts approximately 3–4 months.\n\nWhat makes Xeomin unique is its formulation: it is a "purified" neurotoxin that contains only the active toxin molecule without the protein complexes found in other products. Some providers refer to it as the "naked toxin" product.\n\n## Why Some Providers Prefer Xeomin\n\nThe idea behind Xeomin''s "naked toxin" design is that fewer protein components may mean less chance of developing resistance over many years of treatment. Whether this translates to a practical long-term advantage is still being studied, but it''s a reason some experienced toxin providers choose to offer Xeomin to long-term patients.\n\nThe other practical difference: Xeomin does not require refrigeration before it''s mixed (only after). This is a logistics advantage for providers, but doesn''t affect your experience as a patient.\n\n## What to Expect\n\nSame treatment experience as Botox: brief injections, results in 3–5 days, peak at 2 weeks, duration 3–4 months.\n\n## Combination Therapy\nXeomin addresses dynamic (muscle-driven) lines only. Combine with filler for volume, energy treatments for structural concerns.',
  '84be871e-c167-46b1-ae93-7a70109662eb',
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'ff18aa19-bb20-cc21-dd22-ee3344556601',
  '92a05fe8-d349-4d2f-9a3f-bc5901f94dfa',
  '57b7c5a8-0799-42b0-9111-8441f18a82db',
  'deep_product', 'deep_dive_playbook', 'provider',
  'Xeomin — Deep Dive Playbook',
  E'## Differentiation\n\n**Naked toxin (no complexing proteins):** The only current market BoNT-A product with proprietary chromatographic purification removing complexing proteins. The theoretical immunogenicity advantage is biologically plausible, supported by some in vitro and mechanistic data, but head-to-head clinical superiority for preventing secondary non-response is not definitively established. Gateway posture: "Sources differ on whether the naked toxin reduces secondary non-response clinically."\n\n**Room temperature storage:** Pre-reconstitution storage at up to 25°C for 36 months is a meaningful logistics advantage for practices and mobile providers. No special cold chain required before opening.\n\n**Merz portfolio integration:** Xeomin + Ultherapy = Merz full-face portfolio with no-injection (Ultherapy) + injection (Xeomin) offerings from a single brand relationship.\n\n**1:1 Botox unit conversion:** Simple for providers already dialed in on Botox dosing.\n\n## Evidence Summary\n\nFDA approval clinical trials (NDA 125360): Phase 3, double-blind, placebo-controlled for glabellar lines. Non-inferiority vs. onabotulinumtoxinA demonstrated. Long-term open-label safety data through 2013–2019 publications: no new safety signals. Immunogenicity advantage: Dressler D. et al. (J Neural Transm 2019) reviews the theoretical and in-vitro support; Naumann M. et al. (Mov Disord 2010) discusses secondary non-response in therapeutic contexts. Evidence level: Level I for glabellar indication; Level II-III for immunogenicity advantage claim.\n\n## Comparison Note\n\n| Feature | Xeomin | Botox | Daxxify |\n|---------|--------|-------|---------|\n| Complexing proteins | None (naked) | Yes | Not applicable (peptide) |\n| Duration | 3–4 months | 3–4 months | ~6 months |\n| Storage | Room temp OK | Refrigerated | Refrigerated |\n| FDA cosmetic approvals | Glabella only | Multiple | Glabella only |\n| 1:1 Botox conversion | Yes | Reference | No |',
  '634459ac-1162-4f1d-b37f-94ad06ac56fa',
  'draft', 1
);
