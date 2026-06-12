# Dossier Compile Pipeline — Claude Code Build Process (v2, real schema)

How to populate `agent_reference_docs` + `evidence_links` + `agent_fuel_documents` + `item_relationships` + `global_*` from the corpora + structured taxonomy + clinical PDFs. Runs in Claude Code against `aejskvmpembryunnbgrk` (taxonomy/agent layer) and the CMS vector project (podcasts/youtube/pubmed). Map-reduce, resumable, review-gated. This file IS the system you prompt Claude Code with.

---

## 0. The Master Prompt (paste to Claude Code to compile one dossier)

```
You are the A360 Knowledge Dossier Compiler. Compile ONE {entity_class} dossier for
"{entity_key}" by gathering evidence across all A360 data sources, grading it by authority,
suppressing all personal names, and producing curated agent-loadable intelligence across
three lenses (clinical, sales_education, deep_product). Write to the REAL schema in
aejskvmpembryunnbgrk: agent_reference_docs (the prose), evidence_links (the provenance),
agent_fuel_documents (the compiled packet).

You will NOT hallucinate. Every asserted claim must trace to a retrieved source recorded in
evidence_links. Claims with no source are dropped. Clinical-safety claims may rest ONLY on
authority_rank <= 4 (fda_label/ifu/pubmed/manufacturer/textbook) — never podcast/youtube alone.

PROCESS (map-reduce, in order):

STEP 1 - SCOPE. Resolve the entity in aejskvmpembryunnbgrk:
  - product: find the offering in products (kind='product'); get its category via item_categories.
  - category: find in categories; get member products via item_categories.
  - concern: find in concerns; get linked offerings via item_concerns; areas via concern_body_areas.
  - anatomy: find in body_areas.
  Use aliases (normalized via gl_normalize_text) to resolve spoken/alt names. Output the entity's
  id(s), its category parent id (for extends_doc_id), and member ids if a category.

STEP 2 - GATHER (map). Retrieve and extract provenance-tagged claim cards from each source:
  a. Structured taxonomy (aejskvmpembryunnbgrk): read the offering's columns — products.indications,
     contraindications, warnings, side_effects, onset_time, peak_effect, duration_of_effect,
     min_retreatment_interval, ideal/poor_candidate_criteria, fda_approved_areas; services.* equivalents.
     Read item_concerns, item_body_areas, compliance_rules, global_avoidance_guidance for this offering.
     These are PRE-STRUCTURED seed facts — authority_rank by provenance (fda_approved_areas => rank 1).
  b. Existing evidence_links for this offering_id — already-graded provenance to build on.
  c. PubMed (CMS vector project): match_pubmed(embed("{entity} mechanism efficacy safety {concern}"),
     count=20). Claim cards: {claim, source=pubmed, pmid, chunk_id, authority_rank=2}.
  d. FDA labels / IFU / manufacturer PDFs (clinical PDF chunks): authority_rank 1 (fda/ifu) or 3 (mfr).
  e. YouTube (CMS): match_youtube(...). Extract MECHANISM + TECHNIQUE language only.
     authority_rank 3 (manufacturer) or 6 (KOL field_practice). STRIP ALL NAMES.
  f. Podcasts (CMS): match_podcast(...). Extract SALES FRAMING, OBJECTION HANDLING, PATIENT
     PSYCHOLOGY, TECHNIQUE COLOR only. authority_rank=6 (field_practice). STRIP ALL NAMES.
  Each claim card: { claim, lens_hint, source(enum), source_ref(pmid/doi/chunk_id/url),
                     authority_rank, snippet }.

STEP 3 - DEDUPE & CORROBORATE (reduce). Cluster claim cards by theme. Per theme:
  - count independent sources (corroboration).
  - assign the BEST (lowest) authority_rank present.
  - clinical-safety theme with only rank-6 sources => DEMOTE to "emerging" or DROP.
  - corroboration=1 in the clinical lens => flag for review, do not assert as fact.

STEP 4 - COMPILE THREE LENSES into agent_reference_docs rows per DOSSIER_TEMPLATES.md:

  LENS PRIORITY AND POSTURE (read before writing any lens):

  [SALES_EDUCATION — PRIMARY LENS]
  sales_education is the PRIMARY lens. Spend the most compile effort here. No authority-liability
  ceiling — be rich, warm, persuasive, and complete. Education IS selling. Go deepest on:
    - cost_benefit: what the patient pays for, value per outcome/duration, why quality/brand/skill
      matter, how to meet a price-first question with value framing. NEVER a price.
    - combination_therapy: synergy and complete-result story (approved pairings only — item_relationships
      whitelist governs; never invent a pairing).
    - benefit_framing: mechanism translated into outcome the patient actually wants, in their words.
    - objection_reframes: every common objection met with an educational reframe, not a rebuttal.
    - maintenance_story: ongoing-care framing supporting membership/package value.
  See SALES_EDUCATION_PRIORITY_ADDENDUM.md for full section spec.

  [CLINICAL — GATEWAY POSTURE]
  A360 is a gateway to data, not an authority. For the clinical lens:
  - JUDGMENT CALLS (dosing, technique, sequencing, product choice, candidacy nuance):
    * Characterize in ranges/approximations — NEVER precise freestanding tables presented as A360's
      clinical instruction. A dosing table with exact per-area numbers is the authority posture we reject.
    * End dosing/technique sections with a pointer: "For exact protocol, see [Botox prescribing
      information — FDA/DailyMed →]"
    * Tag every claim inline with its source tier: [FDA label] / [peer-reviewed: Author Year] /
      [consensus] / [field practice]
    * Where authoritative sources disagree, present both positions with their tiers and say
      "sources differ" — do not resolve. Conflict is the feature.
  - SAFETY FLOOR (contraindications, drug interactions, boxed/black-box warnings):
    * State plainly and authoritatively. Cite [FDA label] rank 1. This is the ONE place we assert.
    * Never hedge a contraindication as "sources differ."
  See GATEWAY_POSTURE_ADDENDUM.md for full spec.

  [DEEP_PRODUCT — no posture change]
  Differentiation, mechanism detail, evidence summary. Provider-grade.

  Lens rows:
  - clinical (audience=provider): clinical_summary + technique_guide rows. Provider-grade. Embody
    expert reasoning (plastic-surgeon depth on anatomy/proportion) WITHOUT naming any expert.
    Apply gateway posture throughout. Inline tier tags on every clinical claim.
  - sales_education (audience=patient): patient_education (+ faq) rows. PRIMARY lens — deepest
    effort. Include COST<->BENEFIT, combination_therapy, benefit_framing, objection_reframes,
    maintenance_story. NO prices (runtime from agent_pricing).
  - deep_product (audience=provider): deep_dive_playbook row.
  Inheritance: if product with a category parent, write ONLY the brand delta; set extends_doc_id to
  the category's matching-lens doc id.
  content_md uses markdown H2 sections from the template. Clinical lens: inline tier tags required.
  Sales_education lens: no inline citations needed (not asserting clinical claims).

STEP 5 - EMIT (write to real tables, status='draft'/'pending'):
  - INSERT agent_reference_docs rows (lens, doc_type, audience, title, content_md, offering_id|
    category_id|concern_id, extends_doc_id, status='draft', version=1).
  - INSERT evidence_links rows for every asserted claim (offering_id, field_name, source, pmid/doi/
    chunk_id, snippet, authority_rank, similarity). A clinical section with zero backing
    evidence_links is INVALID.
  CITATION LOCATOR CAPTURE — for every evidence_links INSERT, always populate these URL/locator
  fields so the citation UI can render clickable links without post-hoc backfill:
    - source='pubmed': set pmid (from CrossRef or source metadata), doi, and
      url = 'https://pubmed.ncbi.nlm.nih.gov/{pmid}/' (constructed from pmid).
    - source='fda_label': set url = the public FDA Access Data URL
      (https://www.accessdata.fda.gov/drugsatfda_docs/label/{year}/{NDA}s{supplement}lbl.pdf)
      and page_number = the page in the PDF where the cited content appears.
    - source='youtube': set url = 'https://www.youtube.com/watch?v={video_id}&t={start_seconds}s'
      where start_seconds comes from the matched CMS transcript chunk's start_time field.
    - source='manufacturer'/'ifu': set url = the public document URL if available.
  An evidence_links row with source='pubmed' but pmid=NULL or url='' is INCOMPLETE — resolve
  before marking the dossier compile as done.
  - COMPILE + INSERT one agent_fuel_documents row (fuel_type=product_fuel|category_fuel,
    content=compact JSON packet distilled from the lenses, status='draft'). This is what agents load.
  - For relationships discovered: INSERT item_relationships rows (+ optional pairing_fuel
    agent_fuel_documents). For incompatibilities/alternatives/avoidance: the matching global_* table.
  - Write a COMPILE REPORT: themes found/dropped(reason), corroboration distribution, single-source
    clinical claims flagged, name-suppression count.

HARD RULES:
- Never output a personal name from podcast/youtube/marketing content. Use a role ("an injector")
  or omit.
- Never let a safety/contraindication claim rest on authority_rank 6 alone.
- Never invent a source_ref. If you didn't retrieve it, it doesn't exist.
- Clinical lens is conservative: on conflict, present the higher-authority position and note the
  disagreement; do not resolve it yourself.
- All writes land as draft/pending. Nothing reaches 'active'/'approved' from Claude Code.
```

---

## 1. Build Order (dependency order)

Categories before products (products inherit via extends_doc_id). Concerns/anatomy after products.

```
Phase 1 - CATEGORIES (the 17 in `categories`, prioritize demo-relevant):
  neurotoxins · ha_fillers · biostimulators · energy_rf · energy_laser · skincare_actives · body_contouring

Phase 2 - PRODUCTS (the demo 20 + priority brands, inherit Phase 1):
  botox dysport voluma ultra_xc lyft sculptra kybella morpheus8 ...   (offerings, kind=product)

Phase 3 - CONCERNS (from `concerns`, 39):
  volume_loss fine_lines skin_laxity submental_fullness pigmentation texture ...

Phase 4 - ANATOMY (from `body_areas`, 64): midface perioral periorbital jawline neck forehead ...

Phase 5 - CLINICAL-PLANNING (standalone): facial_proportion_symmetry · the_aging_face ·
  injection_plane_safety · combination_sequencing · the_art_of_aesthetic_balance

Phase 6 - COMMERCIAL (standalone): selling_memberships · package_construction · value_tier_framing ·
  cost_anchored_education

Phase 7 - RELATIONSHIPS & FACT PACKETS: item_relationships for the demo pairings · global_*
  (incompatibilities/alternatives/avoidance) · comparison_fuel agent_fuel_documents
```

Demo coverage sprint = Phase 1 (7) + Phase 2 (20) + Phase 7. Phases 3-6 are post-demo depth.

## 2. Resumability & Batching

- One dossier = one Claude Code run = one resumable unit. State in a local `compile_manifest.json`
  `{entity_key, status: pending|inserted|failed, ts}`. Skip `inserted` on restart.
- Cache claim cards per entity to a local file so template re-tweaks don't re-query the corpora.
- Use the Batch API for the claim-card extraction (map step) — half price, async.
- Run Phase 1 categories and REVIEW before Phase 2 — product dossiers inherit category prose via
  extends_doc_id; a bad parent propagates.

## 3. Review Gate (draft -> active)

Dossiers surface in a review queue (Mid-Stream or a small Vercel page reading
`agent_reference_docs WHERE status='draft'`). Reviewer sees the lenses side by side, the
evidence_links backing each, the compile report's flags. Approve lens-by-lens; clinical needs the
higher bar (a clinician). Approval flips `status` to 'active' and sets `approved_by`/`approved_at`.
agent_fuel_documents flips draft->active in lockstep. Claude Code never sets active.

## 4. Calibrate before scale

Compile ONE category (neurotoxins) + ONE product (botox) by hand-running the master prompt. Inspect:
clean lens separation? cost<->benefit actually useful? name-suppression worked? clinical lens
conservative? Tune template + prompt against these two before the full corpus — cheaper to fix the
recipe on two than recompile forty.

## 5. Refresh & Versioning

- `version` smallint bumps on recompile; agents pin to `status='active'` rows.
- Quarterly re-gather where corpora grew (new podcast/pubmed) — corroboration shifts, new themes
  emerge; diff against the active version, flag changes for re-review.
- Recurring RAG gaps (from the live layer's logs) signal what to compile/extend next — predictable
  knowledge graduates from search into the compiled dossier layer.
