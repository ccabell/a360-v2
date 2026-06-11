# A360 Agent System — Data Source Map

Complete inventory of every database, table, API, and tool the agent system touches. Use this to understand what data is available when building or configuring agents.

**Status**: Active
**Last Updated**: 2026-06-11

---

## Three Supabase Projects

| Project | ID | Purpose | Client in Code |
|---------|-----|---------|---------------|
| Agent Manager | `aejskvmpembryunnbgrk` | Agent definitions, versions, tools, workflows, runs, documents | `agentSupabase` |
| CMS | `gjqicqldjgvrwmtkliie` | Vectorized RAG content (529K+ chunks) | `cmsSupabase` |
| Prompt Runner | `ksutsaiogmicgaarocba` | Transcripts, extraction runs, opportunities | `prSupabase` (via Railway API) |

---

## Agent Manager Tables

These tables define and operate the agent system itself.

| Table | Records | Purpose | Layer (per LAYERED_CONTEXT_MODEL) |
|-------|---------|---------|------|
| `agents` | ~42 | Agent registry — key, name, category, type, status, active_version_id | Task |
| `agent_versions` | varies | Immutable version snapshots — prompt, model, runtime, tool_config, constraints, knowledge_config | Task |
| `agent_tools` | 16+ | Tool definitions — key, name, schema, tables_accessed, data_source | Task (tool config) |
| `agent_documents` | varies | Playbooks, references, evidence — loaded whole by task_tag | Procedural |
| `agent_workflows` | varies | Multi-step chains — steps with input/output mappings | Task |
| `agent_runs` | varies | Execution log — input, output, status, duration, tokens | Logging |
| `agent_citations` | varies | Source references per run — type, source_id, snippet, confidence | Logging |
| `eval_results` | varies | Evaluation scores — evaluator, score, criteria | Logging |

---

## GL Domain Tables (accessed via Agent Manager tools)

These tables store the global product taxonomy — the Domain and Practice layers.

| Table | Purpose | Layer | Coverage Status |
|-------|---------|-------|----------------|
| `gl_products` | Product definitions (name, category, manufacturer, status) | Domain | Baseline |
| `gl_product_facts` | Structured facts per product (indications, dosing, etc.) | Domain | Varies |
| `gl_product_content` | Narrative content per product | Domain | Varies |
| `gl_product_relationships` | Product-to-product relationships (alternatives, complements, sequences) | Domain | ~16% |
| `gl_product_concerns` | Product-to-concern mappings | Domain | ~13% |
| `gl_product_anatomy` | Product-to-anatomy-area mappings | Domain | ~14% |
| `gl_product_guardrails` | Contraindications, safety constraints, compliance rules | Domain | Varies |
| `gl_concerns` | Concern taxonomy (aging, acne, etc.) | Domain | Reference |
| `gl_anatomy_areas` | Anatomy taxonomy (nasolabial folds, glabellar lines, etc.) | Domain | Reference |
| `gl_agent_fuel_documents` | Legacy fuel documents (v1 term — migrating to agent_documents) | Domain | Varies |

### Practice Override Tables

| Table | Purpose | Layer |
|-------|---------|-------|
| `pl_products` | Practice-specific product overrides (pricing, availability) | Practice |
| `pl_services` | Practice service catalog | Practice |
| Practice config | Tone, send windows, compliance settings | Practice |

**Precedence**: `practice (pl_*) > product (gl_*) > category` — COALESCE pattern.

---

## CMS Supabase — RAG Content (Evidence Layer)

All embeddings are OpenAI ada-002 (1536 dimensions).

| Table | Records | Chunks | Content Type | Known Gaps |
|-------|---------|--------|-------------|------------|
| `youtube_videos` | 3,894 | — | Video metadata, audience, treatments[], anatomy[] | — |
| `manufacturer_youtube_transcript` | — | 201,982 | YouTube transcript chunks + embeddings | Missing `start_seconds`/`end_seconds` |
| `pubmed_articles_vectorized` | 23,581 articles | 37,376 | PubMed abstract/body chunks + embeddings | — |
| `podcast_shows` | 31 | — | Show metadata | — |
| `podcast_episodes` | 8,688 | — | Episode metadata + transcript_text | — |
| `podcast_chunks` | — | 202,382 | Podcast transcript chunks + embeddings | Missing `start_seconds` |
| `industry_article_chunks` | — | 87,923 | Industry article chunks + embeddings | Schema TBD |
| `library_vocab` | 279 | — | GL-aligned vocabulary (taxonomy spine) | — |
| `library_tags` | varies | — | Universal tagging bridge (source_type, source_id, tag) | — |

**Total vectorized chunks**: 529,663

### CMS RPC Functions (vector search)

| Function | Corpus | Parameters |
|----------|--------|-----------|
| `match_youtube_transcripts` | YouTube | query_embedding, match_count, match_threshold |
| `search_classified_videos` | YouTube | query_embedding, match_count, match_threshold, p_audience |
| `match_pubmed_articles` | PubMed | query_embedding, match_count, match_threshold |
| `match_podcast_chunks` | Podcasts | query_embedding, match_count, match_threshold, p_show_name, p_category, p_published_after |

---

## Prompt Runner API Endpoints

Base: `https://prompt-runner-production.up.railway.app`

| Method | Endpoint | Purpose | Layer |
|--------|----------|---------|-------|
| GET | `/patients` | Patient list + search | Situational |
| GET | `/patients/{id}` | Patient detail + transcripts | Situational |
| GET | `/transcripts` | Consultation transcripts | Situational |
| GET | `/transcripts/{id}` | Single transcript | Situational |
| GET | `/runs` | Extraction run history | Situational |
| GET | `/runs/{id}` | Single run result | Situational |
| POST | `/run_extraction` | Trigger extraction pipeline | Execution |
| POST | `/run_downstream` | Execute downstream agent | Execution |
| GET | `/agents` | Available PR agents | Reference |
| GET | `/opportunities` | Extracted revenue opportunities | Situational |
| GET | `/practices` | Practice configurations | Practice |
| GET | `/eval/rubrics` | Evaluation rubrics | Evaluation |
| POST | `/eval/run` | Run evaluation | Evaluation |

---

## Registered Tools (16 in agent_tools)

### Domain Layer Tools (Agent Manager Supabase)

| tool_key | Tables | What It Provides |
|----------|--------|-----------------|
| `get_product` | gl_products, gl_product_facts, gl_product_content | Full product details |
| `list_products` | gl_products | Product catalog browse |
| `get_product_relationships` | gl_product_relationships | Alternatives, complements, sequences |
| `get_product_concerns` | gl_product_concerns, gl_concerns | Concern-to-product mapping |
| `get_product_anatomy` | gl_product_anatomy, gl_anatomy_areas | Anatomy-to-product mapping |
| `get_fuel_document` | gl_agent_fuel_documents | Product-level evidence/content |
| `get_product_guardrails` | gl_product_guardrails | Safety constraints, contraindications |
| `load_playbook` | agent_documents | Procedural instructions by task_tag |

### Evidence Layer Tools (CMS Supabase — RAG)

| tool_key | Tables | Chunk Count |
|----------|--------|------------|
| `search_pubmed` | pubmed_articles_vectorized | 37,376 |
| `search_youtube` | manufacturer_youtube_transcript | 201,982 |
| `search_podcasts` | podcast_chunks | 202,382 |
| `search_industry` | industry_article_chunks | 87,923 |

### Situational Layer Tools (Prompt Runner)

| tool_key | Tables | What It Provides |
|----------|--------|-----------------|
| `run_extraction` | ie_transcripts, ie_runs, ie_extractions | Trigger extraction |
| `get_transcript` | ie_transcripts | Consultation transcript text |
| `get_run` | ie_runs, ie_extractions | Extraction results |
| `get_opportunities` | ie_opportunities | Revenue opportunities |

### External Tools

| tool_key | Tables | What It Provides |
|----------|--------|-----------------|
| `search_fda` | fda_labels | FDA label content |
| `search_manufacturer_web` | pages | Manufacturer website content |

---

## Mapping Tools to Layers

This is the key reference for the agent builder: which tools serve which layer of context.

```
TASK LAYER (always present)
  └── Agent registry: agents + agent_versions (prompt, model, schema)

PROCEDURAL LAYER
  └── load_playbook → agent_documents (by task_tag)

DOMAIN LAYER
  ├── get_product → gl_products + facts + content
  ├── get_product_relationships → cross-sell, sequencing
  ├── get_product_concerns → concern mapping
  ├── get_product_anatomy → anatomy mapping
  ├── get_product_guardrails → safety constraints
  └── get_fuel_document → product evidence

SITUATIONAL LAYER
  ├── get_transcript → consultation text
  ├── get_run → extraction results
  └── get_opportunities → revenue opportunities

PRACTICE LAYER
  └── (implicit in domain tools — pl_* overrides gl_*)
      get_practice_services, get_practice_config

EVIDENCE LAYER (RAG)
  ├── search_pubmed → 37K chunks
  ├── search_youtube → 202K chunks
  ├── search_podcasts → 202K chunks
  ├── search_industry → 88K chunks
  ├── search_fda → FDA labels
  └── search_manufacturer_web → manufacturer sites
```

---

## What's Missing for the Agent Builder

The agent builder UI needs to expose this map visually. Current gaps:

1. **`knowledge_config` has no schema** — needs to store the LayerRecipe (see LAYERED_CONTEXT_MODEL.md)
2. **No practice-layer tools registered** — `get_practice_services` and `get_practice_config` are referenced in CONTEXT_ASSEMBLY.md but not in `agent_tools`
3. **No `run_extraction` tool registered** as a situational tool (it exists in PR but not as a configurable agent tool)
4. **GL coverage is sparse** — relationships 16%, anatomy 14%, concerns 13% — the builder should show this
5. **CMS ingestion gaps** — YouTube and podcast chunks missing timestamp offsets
6. **No unified retrieval search endpoint** — the retrieval service (RETRIEVAL_SERVICE.md) is specced but not built
