-- 02-05 Task 2: HydraFacial Syndeo Dossier
-- Product ID: 28918bda-787b-412a-9802-d3d9a00e6ab1
-- Category: null in manifest (no standard category; skincare/device hybrid)
-- Note: No parent category to inherit from. Full standalone dossier.
-- Treatment type: Medical-grade hydrodermabrasion (cleansing, exfoliation, hydration, extraction)

-- No extends_doc_id — standalone product without a compiled category parent for this device type.
-- Use category_id = null, offering_id only.

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'aa20bb21-cc22-dd23-ee24-ff4455667788',
  '28918bda-787b-412a-9802-d3d9a00e6ab1',
  NULL,
  'clinical', 'clinical_summary', 'provider',
  'HydraFacial Syndeo — Clinical Summary',
  E'## Product Identity\n\nHydraFacial Syndeo is a medical-grade vortex-fusion hydrodermabrasion platform manufactured by BeautyHealth (formerly Edge Systems). The Syndeo system is the current-generation HydraFacial device with a touchscreen interface and integrated connectivity. The treatment combines three sequential steps — cleansing/exfoliation, extraction, and hydration/serum infusion — delivered via a handpiece with a patented vortex tip that simultaneously exfoliates and extracts while infusing treatment serums. FDA-cleared as a device for skin cleansing, hydration, and exfoliation. [FDA 510k clearance, BeautyHealth]\n\n## Mechanism of Action\n\nHydraFacial uses a spiral, vortex-fusion tip that creates a vortex effect as it moves across the skin. This vortex:\n1. Physically exfoliates the stratum corneum (mechanical debridement)\n2. Creates low-level suction to loosen and extract debris from follicles/pores\n3. Simultaneously infuses treatment serums (typically including hyaluronic acid, peptides, antioxidants) into the exfoliated skin\n\nThe combination of exfoliation + extraction + immediate topical application to the freshly exfoliated skin maximizes transdermal serum uptake. No thermal energy, no laser energy — purely mechanical + topical delivery. [BeautyHealth clinical materials]\n\n## Clinical Applications\n\n- **Skin cleansing and preparation:** Pre-treatment prep before injectables, lasers, or other procedures\n- **Skin hydration:** Hyaluronic acid serum infusion for immediate hydration improvement\n- **Pore refinement:** Extraction of blackheads and follicular debris\n- **Skin texture improvement:** Mechanical exfoliation of dead skin layer\n- **Maintenance protocol:** Monthly facial maintenance for skin quality upkeep\n- **Booster protocols:** Specialty tip attachments + customized boosters for targeted concerns (hyperpigmentation, acne, brightening)\n\n## Candidacy\n\n**Strong candidates:** Virtually all adult skin types. The absence of thermal energy means near-universal Fitzpatrick tolerance. Particularly useful for:\n- Patients wanting skin quality maintenance with no downtime\n- Pre-event skin preparation\n- Patients with Fitzpatrick IV–VI who cannot tolerate laser/light therapies\n- Acne-prone patients (extraction component)\n- All adults wanting basic skin health maintenance\n\n**Relative contraindications / precautions:**\n- Active rosacea flare or severe inflammatory acne — suction and exfoliation may exacerbate\n- Open wounds, active infection, sunburn in treatment area\n- Recent aggressive chemical peel or laser in same area (wait for full healing)\n- Isotretinoin (Accutane) — impaired barrier function; avoid during active course\n[BeautyHealth IFU]\n\n## Safety Profile\n\n**Very low risk device.** No thermal energy = no burn risk, no PIH risk from the device itself (serum choice matters). Most adverse events:\n- Transient erythema immediately post-treatment (resolves within hours)\n- Potential purging response in acne-prone skin (extraction stimulates follicular activity)\n- Irritation if tip pressed too hard or moved too slowly\n\nNo documented serious adverse events in peer-reviewed literature from standard HydraFacial protocols.',
  NULL,
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'bb21cc22-dd23-ee24-ff25-005566778899',
  '28918bda-787b-412a-9802-d3d9a00e6ab1',
  NULL,
  'sales_education', 'patient_education', 'patient',
  'HydraFacial Syndeo — Patient Education',
  E'## What HydraFacial Does\n\nHydraFacial is the gold standard medical-grade facial — not a spa facial, but a clinical treatment that deeply cleanses, extracts, and intensely hydrates your skin in one session. The Syndeo system is the latest generation of this technology, adding personalization and precision to an already proven protocol.\n\nThe treatment does three things at once: it uses a gentle vortex tip to exfoliate dead skin cells, extract debris from your pores, and simultaneously infuse high-quality serums (including hyaluronic acid) into the freshly refreshed skin. Because the skin is being treated as the serums are applied, absorption is significantly better than applying topicals to untreated skin.\n\n## What It Addresses\n\n- Dull, congested, or uneven skin tone and texture\n- Clogged pores and blackheads\n- Dehydrated skin\n- Overall skin health maintenance\n- Pre-event glow and skin prep (popular before weddings, galas, important meetings)\n\n## Why HydraFacial\n\nHydraFacial is one of the few treatments with essentially no downtime and no skin type restrictions. There is no laser, no heat — just precision exfoliation, professional extraction, and medical-grade serum delivery. It works on every skin tone, including those who cannot tolerate laser or light therapies. Results are visible immediately — most patients leave the treatment looking noticeably better.\n\nThe Syndeo platform adds protocol personalization: the booster serum choice can be customized to your specific skin concern (brightening, firming, acne, redness). It''s not a one-size-fits-all treatment.\n\n## What to Expect\n\n**During the treatment:** You''ll feel gentle suction and a warm sensation as the tip moves across your face. Most patients find it relaxing.\n\n**Afterward:** Skin looks brighter, feels cleaner and smoother immediately. Mild temporary redness in some patients, resolving within an hour. You can apply makeup and return to normal activities immediately.\n\n**Frequency:** Monthly maintenance is the standard recommendation for sustained skin health. Many patients do HydraFacial monthly and combine it seasonally with deeper treatments (peels, energy devices).\n\n## Combination Therapy\n\nHydraFacial is an excellent skin preparation treatment and can be combined with virtually any other modality. Common combinations:\n- HydraFacial as a maintenance monthly + annual Sofwave/Ultherapy for structural tightening\n- HydraFacial + neurotoxin (same or different visit)\n- HydraFacial as a pre-procedure skin preparation step before energy treatments or chemical peels\n\n## Benefit Framing\n\nThink of HydraFacial as the maintenance plan for your skin investment. Other treatments (fillers, energy devices, neurotoxins) address specific structural concerns; HydraFacial maintains the health of the canvas that displays all of that work. A well-maintained skin surface makes every other treatment look better and last longer.',
  NULL,
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'cc22dd23-ee24-ff25-0026-116677889900',
  '28918bda-787b-412a-9802-d3d9a00e6ab1',
  NULL,
  'sales_education', 'faq', 'patient',
  'HydraFacial Syndeo — FAQ',
  E'## Common Questions\n\n**"How is this different from a regular facial?"**\nA spa facial uses manual extraction and topical products. HydraFacial uses medical-grade vortex technology with clinical-strength serums and precise suction extraction — it''s a more thorough and consistent clinical result than manual technique. The serum infusion during the treatment is particularly different: your skin is receiving hyaluronic acid and peptides directly into the freshly exfoliated surface, not just on top of closed pores.\n\n**"Is there downtime?"**\nNo downtime. You can return to normal activities immediately, including makeup application. Mild temporary redness in some patients resolves within an hour.\n\n**"How often should I do it?"**\nMonthly is the recommended maintenance frequency for most skin types. Some patients with active skin concerns (congestion, dullness) benefit from more frequent initial sessions, then maintaining monthly.\n\n**"Is it safe for my skin type?"**\nYes — HydraFacial has no laser or light energy, which means no PIH risk and no skin tone restrictions. It is appropriate for all Fitzpatrick skin types, including darker complexions that cannot tolerate many laser or light therapies.\n\n**"Can I do this before a big event?"**\nYes — HydraFacial is a popular pre-event treatment. Results are visible immediately, and the glow and skin quality improvement are often most apparent 24–48 hours post-treatment. Plan your treatment 3–5 days before a major event (not same day, to allow any temporary redness to fully resolve).\n\n## Objection Reframes\n\n**"This seems expensive for just a facial."**\nHydraFacial is not a spa facial — it''s a medical-grade treatment with clinical-strength serums delivered at a precision level that home products and traditional facials cannot match. The serum quality and delivery method (infused into freshly exfoliated skin) produce results that topical skincare simply cannot replicate. Compared to higher-intervention treatments, it is also one of the most accessible and maintenance-friendly options in the practice.\n\n**"I can just exfoliate at home."**\nHome exfoliation removes dead skin. HydraFacial combines exfoliation + professional extraction of follicular debris + medical-grade serum infusion simultaneously. The extraction component in particular is difficult to replicate safely at home, and the serum delivery into post-exfoliation skin is a clinical technique advantage.',
  NULL,
  'draft', 1
);

INSERT INTO agent_reference_docs (
  id, offering_id, category_id, lens, doc_type, audience, title, content_md,
  extends_doc_id, status, version
) VALUES (
  'dd23ee24-ff25-0026-1177-228899001122',
  '28918bda-787b-412a-9802-d3d9a00e6ab1',
  NULL,
  'deep_product', 'deep_dive_playbook', 'provider',
  'HydraFacial Syndeo — Deep Dive Playbook',
  E'## Differentiation\n\n**Syndeo platform connectivity:** The current-generation Syndeo adds touchscreen protocol management and cloud connectivity (treatments logged and tracked). This enables: patient treatment history tracking, protocol standardization across providers at a practice, and data-informed treatment customization. Distinguishes Syndeo from legacy Elite system.\n\n**Vortex-fusion tip:** The patented vortex design simultaneously exfoliates, extracts, and infuses in one pass — this combined-action delivery is the core IP. Competitors (Hydrodermabrasion, AquaPeel) offer similar category treatments but without the HydraFacial brand recognition or tip design.\n\n**Booster customization:** HydraFacial''s booster ecosystem (Britenol, Dermabuilder, CTGF, Rozatrol, etc.) allows per-treatment customization. This makes HydraFacial a platform for many specific skin concerns rather than a single protocol device.\n\n**Brand recognition:** HydraFacial has exceptionally high consumer brand awareness in medical aesthetics — patients request it by name. This is a practice marketing asset.\n\n## Category Position\n\nHydraFacial is a maintenance/surface treatment — it does not address structural laxity, deep scarring, vascular concerns, or pigmentation at the level of laser/device therapies. Position it correctly:\n- Monthly maintenance layer (sits alongside neurotoxin and filler refresh schedules)\n- Pre-treatment prep (improves serum and energy delivery for subsequent treatments)\n- Entry-level treatment that introduces new patients to the practice and the aesthetics lifestyle\n- Full-spectrum patient: HydraFacial monthly + neurotoxin quarterly + energy device annually\n\n## Evidence Summary\n\nLimited peer-reviewed literature specific to HydraFacial as a brand. Hydrodermabrasion category evidence supports cleansing, hydration, and skin quality outcomes. Manufacturer clinical data published in practice materials. Evidence level: III–IV (manufacturer data, case series). The treatment''s safety and effectiveness are well-established through widespread real-world use (>15 million treatments performed globally per BeautyHealth claims), but peer-reviewed RCT data are limited.\n\n**Note for the clinical lens:** Because peer-reviewed evidence is limited, rely on manufacturer data and broad field-practice consensus for clinical claims. Apply the usual gateway posture — characterize effects as described in manufacturer materials with appropriate evidence tier labeling.',
  NULL,
  'draft', 1
);

-- ============================================================
-- HydraFacial structured emission
-- ============================================================

UPDATE products SET
  does_not_solve = ARRAY[
    'skin laxity (structural)',
    'deep wrinkles',
    'volume loss',
    'dynamic expression lines',
    'vascular lesions',
    'deep acne scarring',
    'pigmentation (beyond surface brightening)',
    'fat reduction'
  ]
WHERE id = '28918bda-787b-412a-9802-d3d9a00e6ab1';

INSERT INTO item_concerns (offering_id, concern_id, relevance, treatment_role, is_fda_indicated, notes)
SELECT
  '28918bda-787b-412a-9802-d3d9a00e6ab1',
  c.id,
  v.relevance::text,
  v.treatment_role::text,
  false,
  v.notes
FROM (VALUES
  ('Skin Texture', 'primary', 'primary', 'Vortex exfoliation + extraction directly improves skin texture and surface quality'),
  ('Pore Size', 'primary', 'primary', 'Extraction component clears follicular debris reducing pore appearance'),
  ('Fine Lines', 'secondary', 'adjunctive', 'Hydration infusion plumps surface; superficial fine line improvement with HA serum')
) AS v(concern_name, relevance, treatment_role, notes)
JOIN concerns c ON c.name ILIKE v.concern_name
WHERE NOT EXISTS (
  SELECT 1 FROM item_concerns ic2
  WHERE ic2.offering_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'
  AND ic2.concern_id = c.id
);

INSERT INTO item_body_areas (offering_id, body_area_id, side, anatomy_specificity, notes)
SELECT
  '28918bda-787b-412a-9802-d3d9a00e6ab1',
  ba.id,
  'bilateral',
  'broad',
  'Full face, neck, décolletage protocols available'
FROM body_areas ba
WHERE ba.name ILIKE 'Face'
AND NOT EXISTS (
  SELECT 1 FROM item_body_areas iba2
  WHERE iba2.offering_id = '28918bda-787b-412a-9802-d3d9a00e6ab1'
  AND iba2.body_area_id = ba.id
);
