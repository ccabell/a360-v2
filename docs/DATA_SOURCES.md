# A360 Data Sources — Complete Inventory

All data sources available to agents through the Agent Manager.

---

## 1. GL Supabase (Structured Data)

**Project:** `wvpgmawrizwkmvfnwqfl` — env: `GL_SUPABASE_URL` / `GL_SUPABASE_SERVICE_KEY`

### Product Library (Global)

| Table | Rows | Purpose |
|-------|------|---------|
| `gl_products` | 378 | Product catalog (injectables, devices, skincare, lasers) |
| `gl_product_facts` | 2,317 | Atomic sourced facts with authority level (FDA/manufacturer/clinical/practitioner) |
| `gl_product_guardrails` | 151 | Safety rules: contraindications, do-not-claim |
| `gl_product_relationships` | ~1,766 | Pairings: complementary, alternative, sequential, contraindicated |
| `gl_product_concerns` | ~1,315 | Product ↔ patient concern mapping with `treatment_role` |
| `gl_product_anatomy` | ~1,541 | Product ↔ anatomy area mapping with `anatomy_specificity` |
| `gl_product_content` | 378 | Logos, videos, doc URLs, `authoritative_source` metadata |
| `gl_product_media` | 195 | Images/videos for products |
| `gl_product_manual_chunks` | 46 | Chunked + embedded product PDFs (FDA labels, IFUs, studies) |
| `gl_concerns` | ~50 | Patient concern taxonomy (fine lines, volume loss, etc.) |
| `gl_anatomy_areas` | ~30 | Anatomical region taxonomy |
| `gl_consultation_content` | 823 | Multi-product consultation-facing content |

### Agent Fuel

| Table | Rows | Purpose |
|-------|------|---------|
| `gl_agent_fuel_documents` | 29 | Pre-compiled agent knowledge (pairing_fuel, product_fuel, concern_fuel). **Pairing fuel = WHITELIST** |
| `agent_reference_docs` | 11 | Cross-cutting domain knowledge (59K words: consultation mastery, objection handling) |
| `gl_agent_references` | 65 | Legacy reference docs — **reconcile with `agent_reference_docs`** |
| `gl_agent_prompts` | 20 | **CONCEPT LIBRARY ONLY** — not agent registry |

### Agent Registry

| Table | Rows | Purpose |
|-------|------|---------|
| `a360_agents` | 65 | Unified agent registry (5 active, 22 Dify beta, 38 registered) |
| `a360_agent_versions` | 28 | Immutable version snapshots (semver, status, prompt, model, tools) |

### Extraction & Intelligence

| Table | Rows | Purpose |
|-------|------|---------|
| `ie_transcripts` | 122 | Consultation transcripts |
| `ie_runs` | 276 | Extraction runs against transcripts |
| `ie_extractions` | varies | Individual extraction fields (192 fields per run) |
| `ie_opportunities` | 335 | Extracted opportunities (primary/secondary/future, stage) |
| `ie_prompt_templates` | 11 | Prompt definitions (extraction v1/v2/v3, coaching, cross-sell) |
| `ie_prompt_sets` | 4 | Grouped prompt sets |
| `ie_practice_library_files` | 8 | Per-practice uploaded documents |
| `ie_agents` | 2 | **LEGACY — migrating to `a360_agents`** |

### Evaluation

| Table | Rows | Purpose |
|-------|------|---------|
| `ie_eval_rubrics` | 3 | Evaluation rubric definitions |
| `ie_eval_batches` | 5 | Eval batch records |
| `ie_eval_results` | 65+ | Per-run LLM judge eval results |

### Practice Data

| Table | Purpose |
|-------|---------|
| `pulse_practice` | Practice/provider configuration |
| `practice_preferences` | Practice-specific settings |
| `pl_products` | Practice-specific product price/availability overrides |
| `pl_services` | Practice-specific service overrides |
| `pl_packages` | Practice-specific packages |

### GL Enrichment Pipeline

| Table | Rows | Purpose |
|-------|------|---------|
| `gl_enrichment_staging` | 488 | Pending enrichment (135 pending, 345 conflicts, 8 approved) |
| `gl_enrichment_log` | 8 | Append-only history of accepted enrichments |

### Views

| View | Purpose |
|------|---------|
| `v_agent_product_context` | Pre-joined agent context (facts + guardrails + reference docs by product) |

---

## 2. CMS Supabase (Vectorized RAG Content)

**Project:** `gjqicqldjgvrwmtkliie` — env: `CMS_SUPABASE_URL` / `CMS_SUPABASE_SERVICE_KEY`

| Table | Records | Chunks | Embedding | RPC Function |
|-------|---------|--------|-----------|-------------|
| `podcast_transcripts_vectorized` | 8,688 episodes | 202,382 | ada-002 | `match_podcast_transcripts()` |
| `manufacturer_youtube_transcript` | 2,548 videos | 223,406 | ada-002 | `match_youtube_transcripts()` |
| `youtube_videos` | 2,548 | — | — | Direct query (metadata: audience, content_type, treatments) |
| `pubmed_articles_vectorized` | 2,559 articles | 37,376 | ada-002 | `match_pubmed_articles()` |
| `a360_internal_docs` | ~3,131 files | — | — | Metadata layer (source, project, doc_type) |
| `a360_internal_doc_chunks` | — | ~15,000 | ada-002 | `match_internal_docs()` |
| `medspa_googlemaps_list` | 20,154 | — | — | Medspa directory (locations, ratings, reviews) |

### RAG Chat System

| Table | Purpose |
|-------|---------|
| `agents` | ~7 RAG agent definitions (builtin + custom chat/memory/tool) |
| `conversations` / `messages` | Chat history for agent conversations |
| `agent_memory` | Episodic memory with vector embeddings |

---

## 3. Prompt Runner API (Railway)

**URL:** `https://prompt-runner-production.up.railway.app`

| Endpoint Group | Key Endpoints | Read Tables | Write Tables |
|---------------|---------------|-------------|-------------|
| **Extraction** | `POST /run_extraction` | `ie_transcripts`, `gl_products`, `pl_products` | `ie_runs`, `ie_extractions` |
| **Downstream** | `POST /run_downstream` | `ie_extractions`, agent configs | `ie_runs`, `ie_opportunities` |
| **Transcripts** | `GET /transcripts`, `GET /transcripts/{id}` | `ie_transcripts` | — |
| **Runs** | `GET /runs`, `GET /runs/{id}`, `PATCH /runs/{id}` | `ie_runs`, `ie_extractions` | `ie_runs` |
| **Agents** | `GET /agents`, `POST /agents`, `PATCH`, `DELETE` | `a360_agents`, `ie_agents` | `ie_agents` |
| **Opportunities** | `GET /opportunities`, `PATCH /opportunities/{id}` | `ie_opportunities` | `ie_opportunities` |
| **Prompts** | `GET/POST/PATCH/DELETE /prompt_templates` | `ie_prompt_templates` | `ie_prompt_templates` |
| **Practices** | `GET/POST/PATCH/DELETE /practices` | `pulse_practice` | `pulse_practice` |
| **Catalogs** | `GET/POST/PATCH/DELETE /catalogs` | `ie_catalogs`, `pl_products`, `gl_products` | `ie_catalogs` |
| **HITL** | `POST /runs/{id}/hitl`, `POST /runs/{id}/hitl/analyze` | `ie_runs`, `ie_extractions` | `ie_runs` |
| **Eval** | `GET /eval/rubrics`, `POST /eval/run`, `POST /eval/batch` | `ie_eval_rubrics` | `ie_eval_results`, `ie_eval_batches` |
| **Run Lists** | `GET/POST /run_lists`, add/remove runs | `ie_run_lists`, `ie_run_list_items` | Same |

---

## 4. Local / File-Based Sources

| Source | Location | Volume | Purpose |
|--------|----------|--------|---------|
| Manufacturer scrapes (SQLite) | `C:\Projects\GLobal\clean_scrapes.db` | 4,538 pages, 173 PDFs, 178 FDA labels | Feeds `gl_product_facts` |
| FDA labels (markdown) | `C:\Projects\GLobal\fda_labels\` | 6 files (Botox, Dysport, Xeomin, Daxxify, Jeuveau, Kybella) | FDA authoritative source |
| Product dossiers | `C:\Projects\GLobal\dossiers\` | 2 files (Dysport 523KB, CoolSculpting 908KB) | Full product intel |
| Evidence cards | `C:\Projects\rag\evidence_cards_complete.json` | 26 treatment categories | Synthesized PubMed summaries |
| PI extractions | `C:\Projects\Accuracy\pi_extractions\` | 19 files | Marketing/sales/pricing intelligence from podcasts |

### Unprocessed (not yet available to agents)

| Source | Volume | Status |
|--------|--------|--------|
| HealthVU PDFs | ~15 GB, 680 files | 6% touched |
| Medical textbooks | 352 PDFs, ~15 GB | Unprocessed |
| OpenClaw | 8.5 GB (Galderma DBs, 495 PDFs, 2,648 images) | Unprocessed |

---

## 5. Totals

| Category | Volume |
|----------|--------|
| **Structured product data** | 378 products, 2,317 facts, 1,766 relationships, 151 guardrails |
| **Vectorized content** | 462K+ chunks across 4 corpora |
| **Consultation data** | 122 transcripts, 276 runs, 335 opportunities |
| **Agent registry** | 65 agents, 28 versions |
| **Manufacturer content** | 4,538 web pages, 173 PDFs, 178 FDA labels |
| **Unprocessed** | ~30 GB across 3 sources |
