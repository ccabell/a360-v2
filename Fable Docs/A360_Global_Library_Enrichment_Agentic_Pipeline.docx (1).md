**A360 Global Library Enrichment**

Local Agentic Pipeline for Product Intelligence, Combination Therapy, Care Plans, and Sales Enablement

*Purpose: expand and enrich the existing Global Library \- not rebuild or restructure it*

| Core framing This project should not be described as rebuilding the Global Library. The correct framing is additive enrichment: keep the existing Global Library as the system of record, then generate reviewed intelligence packets, evidence packs, timing rules, concern mappings, and relationship content that agents can retrieve cheaply and reliably. |
| :---- |

# **1\. Executive Summary**

A360 already has a large content ecosystem: vectorized podcasts, YouTube transcripts, PubMed chunks, structured product facts, guardrails, consultation transcripts, coaching playbooks, evidence cards, clinical PDFs, textbooks, manufacturer scrapes, and media assets. The opportunity is to convert this content into a practical intelligence layer that can power product education, combination therapy, upsell/cross-sell scripts, package positioning, objection handling, and long-term care-plan generation.

The main problem is not lack of content. The problem is that raw content is not agent fuel. Agents need compact, structured, source-backed, concern-aware, timing-aware packets that can be retrieved without forcing every workflow to pull dozens of database fields or thousands of raw chunks.

The recommended approach is a local content refinery: raw content is cleaned, classified, tagged, summarized, converted into claim cards, organized into evidence packs, and then used to generate product intelligence, relationship intelligence, timing rules, and care-plan modules. The final outputs should be stored as both structured fields for management/review and high-level agent fuel documents for simple retrieval.

| Most important design principle Granular fields are useful for governance, review, analytics, and QA. Agents should usually consume one compact precomputed packet per product, pairing, concern, or care-plan module \- not call 30 fields across 10 tables at runtime. |
| :---- |

# **2\. Current Content Ecosystem**

The following inventory should be treated as the starting point for the enrichment effort.

| Source group | Volume | Status | Best use |
| :---- | :---- | :---- | :---- |
| Podcast episodes | 4,236 episodes | Vectorized and searchable | Consultation strategy, patient psychology, objection handling, sales methodology, staff coaching, practice growth. |
| YouTube manufacturer transcripts | 63,250 chunks from 1,427 videos across 26 channels | Vectorized and searchable | Manufacturer/product education, mechanism language, procedure descriptions, device/product positioning. |
| PubMed studies | 8,400 chunks from 2,559 studies across 25 treatment categories | Vectorized and searchable | Clinical grounding, treatment-category evidence, safety, mechanisms, contraindication support. |
| Products | 378 products from 46 manufacturers | Structured in database | Canonical product list, entity mapping, product-level content generation. |
| Grounded product facts | 2,317 facts | Structured in database | Seed claims, product intelligence, patient-safe and staff-safe explanations. |
| Product guardrails | 151 guardrails | Structured in database | Safety, do-not-say rules, contraindication guardrails, compliance review. |
| Agent reference docs | 11 documents / 59,296 words | Structured in database | Agent behavior, workflows, global instructions, generation standards. |
| Consultation transcripts and extractions | 122 transcripts \+ 276 extraction runs | Structured, not fully exploited | Real patient language, concerns, objections, provider recommendations, treatment plan patterns. |
| Coaching playbooks | 42 treatment-specific guides | High-value files not yet fully ingested | Staff talk tracks, consult education, upsell moments, treatment-specific logic. |
| Product intelligence extractions | 19 deep profiles | High-value files not yet fully normalized | Seed product intelligence template and product-level assets. |
| Sales Excellence Framework | 350KB+ | High-value file not yet fully normalized | Consult methodology, objection handling, closing language, package positioning. |
| Evidence cards | 25 treatment-category summaries | High-value files not yet fully normalized | Clinical summaries, treatment category support, timing and safety references. |
| Medical textbooks | 352 books / 15GB | Unprocessed | Provider-level clinical reasoning, anatomy, complication knowledge, safety. |
| Clinical PDFs | 260 PDFs / 1.66GB | Partially processed | IFUs, labels, training decks, clinical protocols, studies. |
| HealthVU education assets | 3,915 assets | Unprocessed media | Patient education visuals, before/after media, RCS card imagery, media metadata. |
| Manufacturer scrape files | 35,654 files / 5.7GB | Messy raw content | Product pages, FAQs, training pages, safety pages after heavy cleanup and dedupe. |

| Critical gap | Why it matters | Recommended fix |
| :---- | :---- | :---- |
| Product relationships | Only 51 of 378 products have pairing data. Without this, stacking, cross-sell, and care-plan agents lack reliable pairing intelligence. | Generate candidates conservatively, score legitimacy, classify tiers, and only publish reviewed canonical/common relationships. |
| Concern mappings | Only 144 rows and mostly FDA-oriented. This blocks patient-concern-first selling. | Build a real patient language taxonomy from transcripts, extractions, playbooks, and sales content. |
| Contraindication and safety database | No comprehensive safety database means sales language can outrun clinical guardrails. | Promote guardrails, IFUs, labels, safety PDFs, and medical director notes into first-class safety records. |
| Treatment timing and sequencing | No same-day vs staged guidance means agents cannot build realistic care plans or booking logic. | Create product, category, and relationship timing rules with same-day defaults when feasible and staging exceptions. |
| Clinical review workflow | Clinical-commercial content should not become canonical without sign-off. | Add review status, reviewer, notes, source claims, and versioning to generated intelligence records. |

# **3\. Project Framing: Enrich the Existing GL, Do Not Rebuild It**

The language matters. Saying "rebuild the GL" implies destructive restructuring, migration risk, and disruption to existing workflows. This project should be framed as an enrichment layer that sits beside and on top of the existing Global Library.

| Avoid saying | Use this framing instead |
| :---- | :---- |
| Rebuild the Global Library | Expand and enrich the existing Global Library. |
| Replace the schema | Add an intelligence layer and precomputed agent fuel documents. |
| Move everything to a new database | Keep current GL tables as the system of record and add additive outputs. |
| Make agents query every field | Generate compact agent fuel packets that aggregate the relevant fields, claims, and guidance. |
| Generate every possible product pair | Generate only legitimate, concern-backed relationship candidates and score them. |

| Practical constraint Assume the existing Global Library remains operational. The enrichment layer should be additive, versioned, reversible, and safe to roll out progressively. |
| :---- |

# **4\. Target Architecture**

The architecture should separate raw research content from production-grade intelligence. Raw content supports research; agent fuel supports generation.

| Existing Global Library and content sources  \-\> Raw content registry  \-\> Cleaned / deduped source cards  \-\> Tagged chunks  \-\> Source-backed claim cards  \-\> Evidence packs  \-\> Product intelligence  \-\> Concern mappings  \-\> Timing and sequencing rules  \-\> Legitimate product relationship records  \-\> Combination intelligence  \-\> Product-level sales and education assets  \-\> Care-plan modules  \-\> High-level agent fuel packets  \-\> Human review  \-\> Published Global Library content |
| :---- |

| Layer | Purpose | Agent behavior |
| :---- | :---- | :---- |
| Raw content lake | Preserve all original files, transcripts, scrapes, PDFs, media, and exports. | Agents should not usually generate directly from this layer. |
| Clean content store | Deduped, normalized, classified source text with source metadata. | Used by extraction agents and fallback retrieval. |
| Vector collections | Searchable chunks separated by authority/source type. | Used for research and gap-filling, not as the primary runtime payload. |
| Claim layer | Compact source-backed facts, reasoning statements, timing notes, and guardrails. | Primary knowledge atoms for evidence packs. |
| Evidence packs | Precomputed research summaries for products, pairings, concerns, and care-plan modules. | Used by generator agents instead of large chunk sets. |
| Structured intelligence records | Granular product, pairing, timing, concern, and care-plan fields for review and management. | Used for governance, QA, review, analytics, and publishing. |
| Agent fuel packets | One compact high-level document per product, pairing, concern, or care plan. | Primary runtime input for agents. |

# **5\. Agent Fuel Packets: The Key to Avoiding Runtime Field Sprawl**

Because agents should not call tons of database fields, each approved or draft intelligence entity should produce a compact, denormalized packet. This packet can be stored as Markdown, JSON, or both. The packet should contain the high-level context an agent needs to act without reassembling the record from many tables.

| Recommended pattern For every important product, pairing, concern, package, or care-plan module, store two artifacts: (1) structured fields for management and review, and (2) one precomputed agent fuel packet for retrieval and generation. |
| :---- |

| Packet type | One packet per | Used by agents for |
| :---- | :---- | :---- |
| Product fuel | Product | Product education, product-level sales scripts, objection handling, maintenance messaging, complementary category suggestions. |
| Combination fuel | Approved pairing or candidate relationship | Combination therapy scripts, package positioning, same-day vs staged guidance, cross-sell suggestions. |
| Concern fuel | Patient concern or concern cluster | Concern-to-treatment reasoning, patient-friendly education, care-plan routing. |
| Timing fuel | Product, category, or relationship timing rule | Booking logic, sequencing, care-plan planning, staging decisions. |
| Care-plan fuel | Care-plan module | Long-term treatment plans, phased recommendations, education-first selling. |
| Safety fuel | Safety/contraindication topic | Guardrails, do-not-say checks, escalation and review requirements. |

## **5.1 Example Product Agent Fuel Packet**

| PRODUCT\_AGENT\_FUEL: BOTOX CosmeticCategory: NeurotoxinPrimary role: Softens movement-related expression lines.Best-fit concerns: frown lines, forehead movement, crow's feet, tense or angry expression, subtle refresh.What it solves: repeated muscle movement that contributes to dynamic lines.What it does not solve: cheek flattening, volume loss, skin laxity, skin texture, pigmentation, facial support.Common education point: If a patient still looks tired or flat after Botox, the issue may not be movement alone.Timing: Often reviewed around the 3-4 month maintenance window, depending on patient and provider assessment.Complementary categories: HA filler for support/volume when appropriate; skin quality treatments for texture, glow, pores, dullness; skincare for maintenance.Do not say: guaranteed duration, no risk, prevents all aging, fixes volume loss.Review status: needs medical/commercial review before canonical publication.Evidence: claim IDs and source IDs attached in structured record. |
| :---- |

## **5.2 Example Combination Agent Fuel Packet**

| COMBINATION\_AGENT\_FUEL: BOTOX Cosmetic \+ JuvedermPatient-facing name: Full Face RefreshOne-line positioning: Smooth expression. Restore support. Keep it natural.Best-fit concerns: I look tired; Botox helps but does not feel like enough anymore; cheeks look flatter; smile lines look deeper; I want refreshed but not frozen.Clinical rationale: Botox addresses movement-related expression lines. Juvederm addresses volume, contour, or structural support when those factors contribute to the patient's concern.What Botox solves: forehead movement, frown movement, crow's feet movement, tense or angry expression caused by muscle activity.What Botox does not solve: cheek flattening, volume loss, structural folds, facial support, skin laxity, skin quality.What Juvederm adds: support, contour, volume restoration or refinement depending on product, area, anatomy, and provider assessment.Timing: Same-day may be feasible when clinically appropriate. Book as Botox refresh \+ Full Face Refresh review. Stage if the provider wants to evaluate toxin effect first, patient wants a phased plan, swelling/bruising affects assessment, or the plan is complex.Staff close: Let's reserve enough time for Botox and a Full Face Refresh review. If Dr. Chen feels filler makes sense and you are comfortable, you may be able to do both same-day. If not, we keep it Botox-only.Do not say: more complete and satisfying outcome; you need filler; Botox will not work without filler; guaranteed result.Evidence: claim IDs and source IDs attached in structured record. |
| :---- |

# **6\. Additive Data Model Recommendations**

The goal is not to replace the current Global Library database. The goal is to add a small number of enrichment objects that make the existing data usable by agents and review workflows.

| Object | Additive purpose | How agents should use it |
| :---- | :---- | :---- |
| Source cards | Compact summaries and metadata for each source. | Find high-value sources without reading raw files. |
| Claim cards | Source-backed atomic claims: mechanisms, timing, safety, objections, patient language, package logic. | Build evidence packs and support generated fields. |
| Evidence packs | Aggregated claims for a product, concern, relationship, or care-plan module. | Primary research context for generator agents. |
| Product intelligence records | Granular product-level clinical, sales, timing, and marketing data. | Managed by review workflows; compiled into product fuel. |
| Concern mappings | Patient language mapped to aesthetic contributors, products, procedures, and education. | Routes patient concerns to appropriate content and care-plan modules. |
| Timing rules | Same-day, staged, sequencing, event timing, maintenance, and cadence logic. | Used in booking, packages, and long-term care plans. |
| Relationship records | Legitimate pairings with tier, rationale, timing, safety flags, and review status. | Used to decide whether combination content should exist. |
| Combination intelligence | Deep upsell/cross-sell content for legitimate pairings. | Compiled into combination fuel. |
| Care-plan modules | Phased concern-based plans over time. | Used by planning agents to sell care through education. |
| Agent fuel documents | Denormalized high-level packets for product, combination, concern, and care-plan agents. | The preferred runtime payload. |

## **6.1 Minimal New Table Approach**

If you want the smallest database footprint, create or use an existing content table that can store generated agent fuel documents and metadata. For example, the existing gl\_consultation\_content table may be able to hold enriched content types if it already supports title, content\_type, audience, review\_status, and JSONB content.

| Possible content\_type values:\- product\_agent\_fuel\- combination\_agent\_fuel\- concern\_agent\_fuel\- timing\_agent\_fuel\- care\_plan\_agent\_fuel\- safety\_agent\_fuel\- evidence\_pack\- product\_intelligence\- combination\_intelligence\- objection\_handler\- package\_positioningRecommended fields if using a flexible content table:\- id\- title\- content\_type\- audience\- review\_status\- source\_ids\- claim\_ids\- product\_ids\- concern\_ids\- relationship\_id\- agent\_fuel\_markdown\- agent\_fuel\_json\- metadata\_json\- version\- created\_at\- updated\_at\- reviewed\_by\- reviewed\_at |
| :---- |

This is less normalized, but it is practical. A richer schema can be added later after the content model proves itself.

## **6.2 Recommended Hybrid Approach**

Use lightweight structured tables for claims, sources, relationships, timing, and review; use high-level agent fuel documents for runtime. This gives management structure without forcing agents to retrieve dozens of fields.

| Management/review layer:  gl\_sources  gl\_claims  gl\_evidence\_packs  gl\_product\_intelligence  gl\_concerns  gl\_timing\_rules  gl\_product\_relationships  gl\_combination\_intelligence  gl\_care\_plan\_modules  gl\_review\_queueRuntime agent fuel layer:  gl\_agent\_fuel\_documents    \- entity\_type    \- entity\_id    \- title    \- audience    \- agent\_fuel\_markdown    \- agent\_fuel\_json    \- evidence\_pack\_id    \- review\_status    \- version    \- updated\_at |
| :---- |

# **7\. Local Agent Pipeline**

Use many narrow local agents instead of a few broad exploratory agents. Each agent should have small inputs, strict output schemas, caching, and idempotent processing.

| Agent | Primary job | Output |
| :---- | :---- | :---- |
| Source Registry Agent | Inventory files, DB records, vector collections, and metadata without reading full contents. | Source registry records and content hashes. |
| Source Classifier Agent | Classify source type, authority, audience, patient safety, priority, and likely topics. | Source cards. |
| Cleaner / Deduper Agent | Remove garbage from web scrapes, boilerplate, duplicate text, nav, ads, and broken fragments. | Cleaned text and quality scores. |
| Entity Tagging Agent | Map sources/chunks to canonical products, categories, concerns, anatomy, procedures, and objections. | Entity-tagged source/chunk metadata. |
| Claim Extraction Agent | Convert chunks and structured records into source-backed claim cards. | Claim cards. |
| Claim Normalizer Agent | Merge duplicate claims and identify conflicts. | Normalized claims and confidence scores. |
| Evidence Pack Builder | Build compact evidence packs for products, pairings, concerns, and care-plan modules. | Evidence packs. |
| Product Intelligence Builder | Generate product-level clinical, sales, timing, marketing, and care-plan intelligence. | Product intelligence records and product fuel. |
| Concern Mapping Agent | Build real patient language concerns and map them to aesthetic contributors and treatment categories. | Concern records and concern fuel. |
| Timing and Sequencing Agent | Build same-day vs staged, maintenance, event timing, and sequencing logic. | Timing rules and timing fuel. |
| Relationship Candidate Agent | Suggest possible pairings only when there is a clear concern and complementary mechanism. | Relationship candidates or explicit rejections. |
| Relationship Legitimacy Scorer | Score pairings for clinical, commercial, timing, safety, patient clarity, and source support. | Relationship tier and review status. |
| Combination Intelligence Builder | Generate deep content for legitimate pairings. | Combination intelligence and combination fuel. |
| Individual Product Sales Builder | Generate product-level sales, marketing, education, objections, packages, and care-plan roles. | Product sales assets and product fuel updates. |
| Objection Handling Builder | Generate objection handling by product, pairing, concern, stage, and staff role. | Objection records and snippets. |
| Package Positioning Builder | Create packages only when clinically and commercially legitimate. | Package positioning records. |
| Care Plan Builder | Create concern-based long-term treatment and maintenance modules. | Care-plan modules and care-plan fuel. |
| Safety and Compliance Reviewer | Flag unsupported claims, unsafe timing, guarantees, off-label promotion risks, PHI, and sales pressure. | Review warnings and blocking issues. |
| Human Review Router | Route drafts to medical, commercial, compliance, or final approval. | Review queue records and status changes. |

# **8\. Token Optimization Strategy**

| Strategy | Why it reduces token burn | How to implement |
| :---- | :---- | :---- |
| Source cards before full sources | Most agents only need source summaries and metadata. | Generate a 100-300 word card per source with tags, authority, audience, and priority. |
| Claim cards before raw chunks | Claims are compact and reusable. | Extract atomic claims once; reuse them across product, pairing, and care-plan generation. |
| Evidence packs before writing | Generator agents should receive only the distilled research context. | For each entity, compile 10-30 highest-value claims by authority and relevance. |
| Agent fuel packets at runtime | Agents avoid assembling 30 fields across multiple tables. | Precompute one Markdown/JSON packet per product, pairing, concern, timing topic, and care plan. |
| Separate vector collections | Retrieval quality improves and irrelevant chunks are excluded early. | Keep PubMed, podcasts, manufacturer videos, guardrails, playbooks, and textbooks separate. |
| Authority-ranked retrieval | Safety and label content should outrank sales content. | Rank regulatory/manufacturer/clinical sources above sales/podcast content for safety and claims. |
| Process high-value sources first | Best outputs come from clean high-yield content, not maximum volume. | Start with guardrails, product facts, evidence cards, playbooks, sales framework, transcripts. |
| Local models for cheap tasks | Classification, tagging, dedupe, and first-pass extraction do not need premium models. | Use local agents for low-risk bulk processing; reserve expensive models for final synthesis and nuance. |
| Caching and hashes | Never reprocess unchanged inputs. | Store input hash, prompt version, model, output hash, and status for every run. |
| Stop conditions | Agents must be allowed to reject weak pairings or insufficient evidence. | Output "no legitimate patient-facing pairing found" instead of forcing content. |

| Runtime rule Production agents should usually retrieve one agent fuel packet plus, when needed, one evidence pack. They should not retrieve raw transcripts, raw web scrapes, long PDF chunks, and dozens of product fields during a patient-facing workflow. |
| :---- |

# **9\. RAG Design Recommendations**

A giant VectorDB with all data can exist, but it should not be one undifferentiated retrieval space. Build multiple collections and route queries by workflow, authority, and audience.

| Collection | Use | Cautions |
| :---- | :---- | :---- |
| rag\_product\_facts | Seed product intelligence and product claims. | Should map to canonical product IDs. |
| rag\_guardrails | Safety, do-not-say, contraindications, escalation rules. | Should override sales content. |
| rag\_evidence\_cards | Treatment-category clinical summaries. | Great for compact evidence packs. |
| rag\_coaching\_playbooks | Treatment-specific consult guidance and staff education. | Staff-facing by default unless simplified and reviewed. |
| rag\_sales\_framework | Objection handling, closing language, consult methodology. | Do not use as clinical authority. |
| rag\_consultation\_transcripts | Real patient language, concerns, objections, provider patterns. | De-identify and use primarily for pattern extraction. |
| rag\_pubmed\_clinical | Clinical evidence, safety, mechanisms. | Needs summarization and authority-aware interpretation. |
| rag\_youtube\_manufacturer | Manufacturer/product education and positioning. | Transcripts may be noisy; classify channel/source authority. |
| rag\_manufacturer\_pdfs | Labels, IFUs, training decks, brochures. | Separate labels/IFUs from marketing brochures. |
| rag\_textbooks\_provider\_reference | Provider-level anatomy and clinical reasoning. | Provider-facing, not direct patient sales language. |
| rag\_healthvu\_media\_metadata | Patient education visuals and card imagery. | Media metadata should not be treated as clinical claims. |

## **9.1 Retrieval Priority by Workflow**

| Workflow | Retrieve in this order |
| :---- | :---- |
| Product intelligence | Product facts \-\> guardrails \-\> product intelligence extractions \-\> evidence cards \-\> manufacturer content \-\> PubMed \-\> playbooks \-\> podcasts \-\> PDFs/textbooks as needed. |
| Combination intelligence | Product intelligence A+B \-\> shared concern mappings \-\> timing rules \-\> relationship claims \-\> evidence cards \-\> playbooks \-\> manufacturer content \-\> PubMed \-\> podcast sales content. |
| Objection handling | Sales Excellence Framework \-\> coaching playbooks \-\> consultation transcripts \-\> podcast sales content \-\> product/pairing intelligence. |
| Safety and timing | Guardrails \-\> labels/IFUs \-\> manufacturer protocols \-\> clinical PDFs \-\> PubMed \-\> medical director notes \-\> expert education. |
| RCS/SMS campaigns | Practice/package data \-\> patient-safe product/combination fuel \-\> objection-safe language \-\> timing/booking rules \-\> compliance guardrails. |
| Care-plan generation | Concern fuel \-\> product intelligence \-\> timing rules \-\> relationship intelligence \-\> care-plan modules \-\> safety guardrails \-\> patient education snippets. |

# **10\. Product Relationships: Do Not Force Pairings**

The system should never create a patient-facing pairing simply because two products are technically compatible. Pairings must be concern-backed, mechanism-backed, timing-aware, safety-aware, and commercially useful.

| Gate | Required answer |
| :---- | :---- |
| Concern test | What specific patient concern makes this pairing relevant? |
| Mechanism test | Does each product contribute something meaningfully different? |
| Limitation test | What does Product A fail to solve that Product B addresses? |
| Timing test | Can these be done same-day? If not, what sequence and interval? |
| Safety test | When should the pairing not be recommended or should be escalated? |
| Commercial test | Would trained staff actually use this explanation without sounding pushy? |
| Patient clarity test | Can the value be explained in one or two patient-safe sentences? |
| Source support test | Are there claim IDs or evidence sources supporting the rationale? |

| Relationship tier | Meaning | Patient-facing? |
| :---- | :---- | :---- |
| canonical | Common, commercially meaningful, concern-backed, and reviewable. Example: neurotoxin \+ HA filler for movement plus support. | Yes, after review. |
| common | Often useful, but may require practice/provider context or more review. | Sometimes. |
| conditional | Legitimate only for certain concerns, anatomy, timing, provider preference, or patient goals. | Usually staff/provider first. |
| compatible\_only | Technically compatible but not a strong sales or patient-facing recommendation. | No. |
| do\_not\_market | May be clinically used in limited contexts but should not be promoted by agents. | No. |
| rejected | No clear benefit, weak evidence, safety concern, or forced pairing. | No. |

# **11\. Product-Level Intelligence Must Be Built Alongside Combination Intelligence**

This effort should not only create product pairings. Every important product should have its own sales, education, timing, objection, package, and care-plan intelligence. This becomes the foundation for smarter pairings and long-term care plans.

| PRODUCT INTELLIGENCE TEMPLATE1\. Product role2\. Mechanism: provider-facing and patient-facing3\. Best-fit patient concerns using real patient language4\. What this product solves5\. What this product does not solve6\. Ideal patient scenarios7\. Not-ideal scenarios8\. Treatment timing, cadence, event timing, maintenance9\. Same-day compatibility categories10\. Complementary categories, if legitimate11\. Common objections and responses12\. Staff talk track13\. Patient-friendly explanation14\. Package role15\. Care-plan role: foundation, corrective, optimization, or maintenance16\. Do-not-say claims17\. Evidence claim IDs and source IDs18\. Review status |
| :---- |

# **12\. Combination Intelligence Template**

| COMBINATION INTELLIGENCE TEMPLATE1\. Combination name and relationship tier2\. Patient-facing package name, if appropriate3\. One-line positioning4\. Best-fit concerns5\. Clinical rationale6\. Product A solves7\. Product A does not solve8\. Product B adds9\. When not to recommend10\. Same-day vs staged timing11\. Staff talk track12\. Patient-friendly explanation13\. Objection handling14\. Package positioning15\. Closing language16\. Care-plan use cases17\. Do-not-say claims18\. Evidence claim IDs and source IDs19\. Review status |
| :---- |

## **12.1 Example: Botox \+ Juvederm**

| Patient-facing name: Full Face RefreshOne-line positioning: Smooth expression. Restore support. Keep it natural.Best-fit concerns:\- I look tired.\- Botox helps but does not feel like enough anymore.\- My cheeks look flatter.\- My smile lines look deeper.\- I want to look refreshed but not frozen.Clinical rationale: Botox addresses movement-related expression lines. Juvederm addresses volume, contour, or structural support when those factors contribute to the patient's concern.What Botox solves: forehead movement, frown movement, crow's feet movement, tense or angry expression caused by muscle activity.What Botox does not solve: cheek flattening, volume loss, structural folds, facial support, skin laxity, skin quality.What Juvederm adds: support, contour, volume restoration or refinement depending on product, area, anatomy, and provider assessment.Timing: Same-day may be feasible when clinically appropriate. Book as Botox refresh \+ Full Face Refresh review. Stage if the provider wants to evaluate toxin effect first, patient wants a phased plan, swelling/bruising affects assessment, or the plan is complex.Staff close: Let's reserve enough time for Botox and a Full Face Refresh review. If Dr. Chen feels filler makes sense and you are comfortable, you may be able to do both same-day. If not, we keep it Botox-only.Do not say: more complete and satisfying outcome; you need filler; Botox will not work without filler; guaranteed result. |
| :---- |

# **13\. Timing and Sequencing: First-Class Agent Fuel**

Timing guidance should exist at product, category, and relationship levels. This matters because A360 will eventually generate care plans, rebooking campaigns, package recommendations, and treatment sequences.

| Timing scope | Examples of required guidance |
| :---- | :---- |
| Product-level timing | Onset, expected duration ranges, maintenance cadence, event timing, pre/post guidance, when to reassess. |
| Category-level timing | General timing patterns for neurotoxins, HA fillers, biostimulators, lasers, RF devices, body contouring, facials, skincare. |
| Relationship-level timing | Same-day feasible, same-day preferred, staged preferred, staged required, recommended sequence, minimum interval, typical interval. |
| Care-plan timing | Foundation phase, corrective phase, optimization phase, maintenance phase, seasonal/event timing. |

| Commercial default with clinical safety Default the booking logic toward same-day when clinically feasible, because practices want efficient visits and higher conversion. But every same-day recommendation must include staging exceptions and provider assessment language. |
| :---- |

# **14\. Concern Mapping: The Missing Layer Behind Better Sales Content**

The current scripts feel generic because they are product-first. The enriched GL should become concern-first.

| Concern: I look tiredClinical translation candidates:\- frown tension or upper-face movement\- midface flattening or cheek support changes\- under-eye shadowing\- skin dullness or texture changesPossible treatment categories:\- neurotoxin\- HA filler\- skin quality treatment\- skincareAssessment note: Do not assume the cause. Provider should determine whether the concern is movement, support, skin quality, or a combination.Patient-safe explanation: Sometimes a tired look is caused by expression, sometimes by support or skin quality. The goal is to identify which part is actually contributing before recommending treatment.Staff talk track: Botox can help if the tired look is partly from muscle tension. If the issue is flattening, shadowing, or support, filler or skin-quality treatments may be the missing piece. |
| :---- |

Recommended first concern clusters:

* movement lines  
* etched lines  
* tired look  
* angry look  
* flat cheeks  
* smile lines  
* thin lips  
* lower-face heaviness  
* jawline definition  
* skin dullness  
* pores  
* texture  
* pigment  
* redness  
* acne scarring  
* skin laxity  
* stubborn fat  
* lack of muscle tone  
* post-weight-loss laxity  
* fear of frozen look  
* fear of overdone look  
* budget concern  
* downtime concern  
* event timing

# **15\. Safety, Compliance, and Review Workflow**

Sales language should never override safety. Every generated product, timing, combination, or care-plan record should include review status and source support.

| Review status | Meaning |
| :---- | :---- |
| draft | Generated but not reviewed. |
| needs\_medical\_review | Clinical, safety, timing, or contraindication content requires review. |
| needs\_commercial\_review | Sales positioning, package, or objection handling requires business review. |
| needs\_compliance\_review | Patient-facing claim, promotion, or marketing language requires compliance review. |
| approved | Approved for intended audience and workflow. |
| published | Available to production agents. |
| rejected | Should not be used. |
| archived | Deprecated or superseded. |

| Block or flag | Examples |
| :---- | :---- |
| Unsupported claims | Guaranteed results, exact duration promises, complete solution, prevents aging. |
| Unsafe timing | Same-day claims without assessment language; ignoring staging requirements. |
| Off-label promotional risk | Patient-facing claims not supported by approved or reviewed language. |
| PHI / personalization risk | Mentioning private details, diagnoses, or sensitive body concerns in outreach. |
| Forced pairings | Pairing products without a real concern, mechanism, or commercial rationale. |
| Generic fluff | More complete and satisfying outcome; best of both worlds; boosts confidence without mechanism. |

# **16\. Phased Execution Plan**

| Phase | Objective | Deliverable |
| :---- | :---- | :---- |
| Phase 0: Product list freeze | Confirm canonical product names, aliases, manufacturers, categories, active status, and patient-facing status. | Stable entity map for all agents. |
| Phase 1: Additive schema and job system | Create or configure source cards, claims, evidence packs, agent fuel docs, review queue, and run metadata. | Minimal enrichment layer without disrupting current GL. |
| Phase 2: Seed claims from structured data | Convert product facts, guardrails, evidence cards, product intelligence extractions, coaching playbooks, and sales framework into claims. | First high-quality claim library. |
| Phase 3: Build concern taxonomy | Extract real patient language from transcripts, extractions, playbooks, podcasts, and sales docs. | Concern records and concern fuel packets. |
| Phase 4: Product intelligence | Generate product-level intelligence for top commercially important products. | Product fuel for top 50-100 products. |
| Phase 5: Timing and sequencing | Build product, category, and relationship timing rules. | Timing fuel for injectables, skin, devices, body contouring, and skincare. |
| Phase 6: Relationship engine | Generate, score, tier, and review legitimate pairings. | Canonical/common/conditional relationship records. |
| Phase 7: Combination intelligence | Generate deep content for first 25-50 canonical/common pairings. | Combination fuel and staff/patient assets. |
| Phase 8: Care-plan modules | Build concern-based long-term plans that agents can assemble for patients. | Care-plan fuel modules. |
| Phase 9: Review and publish | Route records through medical, commercial, compliance, and final approval. | Published agent-ready intelligence. |

| Recommended vertical slice Start with BOTOX Cosmetic, Juvederm, Botox \+ Juvederm, the concerns "tired look," "dynamic lines," and "volume/support," objections around price, fear of overdone, wanting one thing, and time constraints, plus the package "Full Face Refresh." This proves the architecture before scaling. |
| :---- |

# **17\. Local Agent Job Design**

Each local job should process only pending or changed records, validate output, and write run metadata. This prevents uncontrolled token burn and makes reruns safe.

| Each job should:1\. Read pending records from the local queue or Supabase export.2\. Check input\_hash \+ prompt\_version \+ agent\_version.3\. Skip if unchanged.4\. Retrieve only required source cards, claims, or evidence packs.5\. Produce strict JSON output.6\. Validate output against schema.7\. Write output, warnings, review status, and evidence IDs.8\. Store run metadata: input\_hash, output\_hash, model, prompt\_version, cost/tokens if available.9\. Never overwrite approved content without creating a new version. |
| :---- |

| Use local/cheap agents for | Use stronger models or human review for |
| :---- | :---- |
| Source inventory | Final patient-facing copy for top products/packages. |
| Source classification | Complex clinical nuance or conflicting evidence. |
| Deduping and cleaning | Timing rules that affect clinical recommendations. |
| Entity tagging | Contraindication and safety interpretation. |
| First-pass claim extraction | High-priority combination intelligence. |
| Transcript concern extraction | Final review of published agent fuel. |
| Draft generation for low-risk internal content | Executive-level or partner-facing strategic content. |

# **18\. Quality Rubric for Generated Assets**

| Dimension | Bad output | Good output |
| :---- | :---- | :---- |
| Clinical specificity | Generic rejuvenation language. | Mechanism, anatomy, concern, and limitation-specific rationale. |
| Concern mapping | Product-first. | Patient concern-first. |
| Staff usability | Awkward or salesy. | Something trained staff could say tomorrow. |
| Patient safety | Guarantees, overclaims, unsafe advice. | Careful, conditional, provider-assessment language. |
| Commercial value | Weak generic CTA. | Specific, low-pressure close that moves toward booking or education. |
| Timing clarity | Vague or overly staged by default. | Same-day vs staged rules clearly defined. |
| Objection depth | Empathy plus generic close. | Objection-specific education, bridge, and next step. |
| Evidence grounding | Unsupported prose. | Claim IDs and source IDs attached. |
| AI-readiness | Long prose only. | Structured fields plus agent fuel packet. |
| Reviewability | No source or status. | Review status, reviewer notes, versioning, and evidence references. |

# **19\. What Not To Do**

* Do not describe this as rebuilding the Global Library. It is an additive enrichment layer.  
* Do not vectorize all 19GB first and expect good outputs. Prioritize clean high-value sources first.  
* Do not create a massive cross-product relationship graph for patient-facing recommendations.  
* Do not let agents generate directly from raw transcripts, raw scrapes, or long PDF chunks unless filling a specific gap.  
* Do not use podcasts as safety authority. They are useful for sales, training, and consultation strategy, not primary contraindication guidance.  
* Do not publish combination, timing, or care-plan content without review.  
* Do not make agents assemble runtime context from dozens of fields. Use precomputed agent fuel packets.  
* Do not force combinations. Agents must be allowed to reject weak pairings or return insufficient evidence.

# **20\. Immediate Next Steps**

1. Confirm the revised canonical product list and aliases.  
2. Decide whether to store agent fuel documents in the existing gl\_consultation\_content table or in a small additive gl\_agent\_fuel\_documents table.  
3. Create a minimal claim card schema and source card schema.  
4. Convert the 2,317 grounded product facts and 151 product guardrails into claim cards.  
5. Normalize the 25 evidence cards, 19 product intelligence extractions, 42 coaching playbooks, and Sales Excellence Framework into evidence packs and claims.  
6. Build the first vertical slice: BOTOX Cosmetic, Juvederm, Botox \+ Juvederm, Full Face Refresh, key concerns, timing, and objections.  
7. Generate product fuel and combination fuel for the vertical slice.  
8. Run safety/compliance review and human review on the vertical slice.  
9. Scale to the top 50 products, top 25 concerns, top 25 canonical pairings, and top 10 care-plan modules.

# **21\. Final Target State**

The target state is not the largest possible RAG. The target state is the most useful clinical-commercial intelligence layer for aesthetic medicine.

| When a patient says: "Botox helps but I still look tired."The system should know:\- The issue may be movement, support, skin quality, or a combination.\- Botox solves movement-related expression lines.\- Botox does not restore cheek support, volume, skin quality, or pigmentation.\- HA filler may address support if appropriate.\- Skin quality treatments may address dullness, pores, texture, or glow.\- Same-day Botox \+ filler may be feasible when clinically appropriate.\- Staff should not say the patient needs filler.\- Best booking CTA may be: Botox refresh \+ Full Face Refresh review.\- The output should be supported by source-backed claims and review status. |
| :---- |

| Bottom line The Global Library should evolve from a product catalog into a clinical-commercial intelligence system: concern \-\> mechanism \-\> product role \-\> timing \-\> pairing legitimacy \-\> staff explanation \-\> patient education \-\> care-plan module \-\> reviewed agent fuel. |
| :---- |

