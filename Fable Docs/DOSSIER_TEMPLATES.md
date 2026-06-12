# Dossier Templates — Section Structures by Entity Type (v2, real schema)

How dossier content is organized inside `agent_reference_docs`. Each dossier = several `agent_reference_docs` rows for one entity, distinguished by `lens` + `doc_type`. The "sections" below are the structure WITHIN each row's `content_md` (markdown headings). No inline citations (provenance lives in `evidence_links`). No personal names anywhere.

Real columns used: `offering_id` | `category_id` | `concern_id` (+ optional `body_area_id`), `lens` (clinical|sales_education|deep_product), `doc_type` (deep_dive_playbook|clinical_summary|technique_guide|patient_education|category_overview|training_material|faq|protocol), `audience` (patient|provider|staff|public), `title`, `content_md`, `status`, `version`, `extends_doc_id`.

---

## PRODUCT dossier (e.g., Botox, Voluma, Morpheus8)

Attaches via `offering_id`. Set `extends_doc_id` -> the category's matching-lens doc; write the BRAND DELTA only.

### Rows to create

| lens | doc_type | audience | content_md sections (markdown H2s) |
|---|---|---|---|
| clinical | clinical_summary | provider | identity · mechanism · indications · candidacy · safety · outcomes(onset/peak/duration) |
| clinical | technique_guide | provider | injection_planes · dosing_zones [gateway: range+pointer, no precise table] · technique_notes · planning · combination_sequencing |
| **sales_education** *(PRIMARY)* | patient_education | patient | patient_explainer · benefit_framing · **combination_therapy** · **cost_benefit** · maintenance_story |
| **sales_education** *(PRIMARY)* | faq | patient | objection_reframes · common_questions |
| deep_product | deep_dive_playbook | provider | differentiation · mechanism_detail · evidence_summary · comparison_anchors |

`cost_benefit` = the value education: what the patient is paying for (precision, longevity, product quality, expertise), how value breaks down per dollar, why brand matters. NO prices (runtime from `agent_pricing`).

---

## CATEGORY dossier (e.g., Neurotoxins, HA Fillers, Biostimulators)

Attaches via `category_id`. The parent; products inherit via `extends_doc_id`.

| lens | doc_type | audience | content_md sections |
|---|---|---|---|
| clinical | clinical_summary | provider | class_overview · shared_mechanism · class_indications · class_candidacy · class_safety · member_differentiation |
| clinical | technique_guide | provider | class_technique_principles [gateway: range characterizations, no precise tables] · class_planning |
| **sales_education** *(PRIMARY)* | category_overview | patient | category_explainer · why_this_category · combination_therapy · cost_benefit_principles · category_objections |
| deep_product | deep_dive_playbook | provider | category_landscape · selection_framework · evidence_base |

---

## CONCERN dossier (e.g., Volume Loss, Skin Laxity, Submental Fullness)

Attaches via `concern_id`.

| lens | doc_type | audience | content_md sections |
|---|---|---|---|
| clinical | clinical_summary | provider | concern_definition · anatomy_involved · treatment_options · selection_logic · combination_approaches · contraindication_map |
| **sales_education** *(PRIMARY)* | patient_education | patient | patient_explainer · solution_framing · **combination_therapy** · cost_benefit(good/better/best) · expectation_setting · objection_reframes |
| deep_product | deep_dive_playbook | provider | mechanism_of_concern · evidence_by_option · comparison_grid |

---

## ANATOMY dossier (e.g., Midface, Perioral, Jawline, Neck)

Attaches via optional `body_area_id` (if added) else as a global `category_overview`-style doc tagged in `title`. Highest clinical depth.

| lens | doc_type | audience | content_md sections |
|---|---|---|---|
| clinical | clinical_summary | provider | regional_anatomy · aging_changes · concerns_here · treatment_options_here · proportion_principles |
| clinical | technique_guide | provider | technique_by_region · danger_zones(top authority) · injection_planes_here |
| sales_education | patient_education | patient | patient_explainer · treatment_story · cost_benefit · natural_results_framing |
| deep_product | deep_dive_playbook | provider | regional_product_map · combination_sequencing_here |

---

## CLINICAL-PLANNING dossier (the novice->expert guides)

Standalone (no offering/category/concern FK). `lens=clinical` only. `doc_type=deep_dive_playbook` or `training_material`. The "turn a novice into an expert" content — embodies plastic-surgeon-level reasoning WITHOUT naming any expert.

| title (entity_key) | content_md sections |
|---|---|
| Facial Proportion & Symmetry | proportion_systems (classical/neoclassical canons, golden-ratio context — the art history of aesthetic balance) · assessment_method · documentation · treatment_implications · case_reasoning |
| The Aging Face | aging_cascade (bone/fat/muscle/skin over time) · regional_progression · restoration_strategy · sequencing_logic |
| Injection-Plane Safety | facial_layers · vascular_anatomy · danger_zones_by_region · complication_avoidance · emergency_management |
| Combination Sequencing | synergy_principles · timing_rules · same_visit_vs_staged · whitelist_logic · treatment_arc_construction |
| The Art of Aesthetic Balance | aesthetic_philosophy · assessing_the_whole_face · restraint_and_naturalness · the_expert_eye |

Drawn from the uploaded textbooks (illustrated filler manual, facial rejuvenation), PubMed, deepest clinical YouTube. Expertise distilled into teachable structure; never resting on a named individual.

---

## COMMERCIAL dossier (selling intelligence)

Standalone. `lens=sales_education` only. `doc_type=training_material` (staff-facing) or `category_overview`.

| title | content_md sections |
|---|---|
| Selling Memberships | value_logic · who_to_offer · framing_scripts · objection_handling · retention_mechanics |
| Package Construction | bundle_logic · good_better_best_construction · value_anchoring · presentation_sequence |
| Value-Tier Framing | anchoring_principles · tier_psychology · the_cost_conversation |
| Cost-Anchored Education | education_as_selling · breaking_down_value · benefit_per_dollar_framing · handling_price_first_questions |

---

## RELATIONSHIP DATA -> `item_relationships` (not a dossier; structured rows)

Pairings are STRUCTURED ROWS, not prose dossiers. One row per offering pair into `item_relationships`:

| column | value |
|---|---|
| offering_a_id, offering_b_id | the two offerings |
| relationship_type | complementary \| stacks_with \| sequential \| enhances \| alternative \| contraindicated |
| relationship_strength | strong \| moderate \| weak |
| clinical_rationale | provider-facing why |
| timing_guidance | sequencing/spacing |
| same_session_ok | bool |
| patient_education_text | patient-safe synergy sentence |
| staff_talking_points | how staff frames the pairing |
| source_reference | provenance pointer |

An approved pairing optionally gets an `agent_fuel_documents` row (`fuel_type=pairing_fuel`, FK `item_relationship_id`) — the compact packet `pairing_advisor` loads. The whitelist for `pairing_advisor` = the set of active `item_relationships` (+ their fuel). Absence = rejection.

Incompatibilities -> `global_item_incompatibilities` (`incompatibility_type` absolute/advisory/timing, `timeframe`, `reason`, `source`).
Alternatives -> `global_alternatives` (`similarity_type` same_class/same_indication/...).
Avoidance -> `global_avoidance_guidance` (`avoidance_type` absolute/advisory, `reason`, `source`).

---

## HARD FACT PACKETS -> `agent_fuel_documents` (compiled, compact)

Comparison/dosing "tables" are compiled into `agent_fuel_documents.content` (jsonb), `fuel_type=comparison_fuel`:
```json
{ "comparison": "neurotoxin_onset_duration",
  "rows": [ {"offering":"botox","onset_days":3,"peak_days":14,"duration_months":4,
             "evidence_link_id":"...","authority_rank":1}, ... ] }
```
Each row carries an `evidence_link_id` -> `evidence_links` for provenance. The structured product columns (`onset_time`, `duration_of_effect`, etc. — already canonical-interval jsonb on `products`) are the source; the fuel packet is the distilled, agent-ready comparison.
