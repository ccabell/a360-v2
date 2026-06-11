# A360 Context Assembly — Three Retrieval Problems, Three Patterns

Not everything is RAG. Agents need three kinds of context, each assembled differently. Using the wrong tool for a category causes specific, predictable failures.

**Status**: Approved
**Last Updated**: 2026-06-11

---

## The Rule

**SQL for the exact. Playbooks for the procedural. RAG for the unknown.**

Most agent failures come from using RAG for the first two jobs.

---

## 1. Structured Supabase Data: Query It, Don't Embed It

**What**: Practice catalogs, pricing, service availability, patient/consultation records, opportunity data.

**Why not RAG**: Embeddings give approximate similarity; pricing and availability need exact answers. If an email campaign quotes a price, it must come from a SQL lookup against `pl_products` for that tenant, not from a chunk that was accurate when embedded.

**Pattern — parameterized tools, not retrieval**:

Give agents a small set of fixed, parameterized functions:

| Tool | Purpose | Source |
|------|---------|--------|
| `get_practice_services(tenant_id)` | Service catalog for a practice | `pl_products` / `pl_services` |
| `get_consultation_extraction(consultation_id)` | Extraction results from a consultation | Prompt Runner API |
| `get_open_opportunities(patient_id)` | Revenue opportunities for a patient | Prompt Runner API |
| `get_practice_config(tenant_id)` | Tone, send windows, compliance settings | Practice config |

Each returns structured JSON. Fixed tools beat text-to-SQL because:
- Query patterns are knowable in advance
- Parameterized queries can't hallucinate a join or leak across tenants
- Every tool result can carry a source object (`supabase`, table, recordId) that flows into the existing citation system unchanged

---

## 2. Large PDFs: RAG, but Structure-Aware, with Parent Expansion

**What**: Manufacturer dossiers (Dysport 523KB, CoolSculpting 908KB), FDA labels, clinical studies.

**These do belong in the vector pipeline**, with three refinements over naive chunking:

### Layout-aware extraction
Run PDFs through a structure-preserving extractor (Docling, marker, unstructured.io) rather than flat text dumps. Aesthetics PDFs are dense with dosing tables, and a table shredded across three flat chunks is unrecoverable.

### Store the hierarchy
Each chunk carries:
- `page_number` — deep-link locator (`url#page=12`)
- `section_path` — e.g. "4. Dosage and Administration > 4.2 Glabellar Lines"

The section path goes into the provenance label the LLM sees, which materially improves citation accuracy.

### Parent-document retrieval
Search small chunks (300-500 tokens — precise matching), but hand the LLM the *parent section* the chunk lives in. A 350-token fragment of a contraindications section is dangerous out of context; the whole subsection is what you need.

Store `parent_section_id` on each chunk and expand at retrieval time. This slots into the retrieval service as a post-fusion step and is probably the single biggest quality lever for long-document corpora.

### Document-level summaries
Store one doc-level summary row per PDF (title, what it covers, ~150-word abstract). This gives agents a cheap "what documents exist" routing query before diving into chunk search, and gives the UI a document browser for free.

---

## 3. MD Instruction Files: Not a Retrieval Problem at All

**What**: Reach campaign requirements, email sequence rules, tone guidelines, compliance rules, agent operating instructions.

**Why not RAG**: These aren't *evidence* the agent searches — they're *operating instructions* that define how the agent does its job. Chunk-and-embed fails in a specific way: when the email agent needs the sequence structure, it needs the **complete** timing table (email 1 at 24h, email 2 at 3-5 days, ... email 5 at 30 days), the complete tone rules, the complete personalization field list. Semantic search returns the three most similar fragments and silently drops the rest, and the agent confidently builds a campaign from 60% of the playbook.

**Instructions have no graceful partial-retrieval mode; evidence does. That's the dividing line.**

### Compile, don't ingest

MD files are written for humans building the system — full of phase timelines, V1-vs-V2 comparisons, status notes, "coming soon" caveats. That's noise to an agent. Distill each task domain into one tight operational playbook:

Example: `email_campaign_playbook.md` containing only the rules — sequence structure, timing, tone definitions, personalization requirements, compliance rules, what never to include. Probably 1,500-3,000 tokens distilled from ~15K tokens of requirements docs.

This is the fuel-doc / Claude Code skill pattern: a curated instruction file loaded whole when the task matches, never searched.

### Document registry with task routing

```sql
CREATE TABLE agent_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  doc_type TEXT NOT NULL CHECK (doc_type IN ('playbook', 'reference', 'evidence')),
  task_tags TEXT[] DEFAULT '{}',     -- ['email_campaign', 'follow_up']
  agent_keys TEXT[] DEFAULT '{}',    -- which agents auto-load it
  version TEXT,
  token_count INT,
  content TEXT,                      -- or storage_path for large ones
  storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_agent_documents_tags ON agent_documents USING GIN(task_tags);
CREATE INDEX idx_agent_documents_agents ON agent_documents USING GIN(agent_keys);
```

When the email agent runs, the orchestrator loads every `playbook` doc matching the task tag — whole, no search. Version through the same agent-version mechanism (R2/R3), so "we changed the sequence timing" is a versioned, diffable change, not a re-embedding job.

### Token count decides loading mode

| Size | Strategy |
|------|----------|
| Under ~8K tokens | Load whole — context windows make this free, whole-doc beats fragments every time |
| 8-50K tokens | Store TOC per doc, agent picks sections to load in full |
| 50K+ tokens or hundreds of docs | Embedding becomes appropriate — but retrieve sections, not paragraphs |

---

## Example: What a Reach Email Campaign Run Looks Like

Generating a campaign is **deterministic context assembly with optional RAG garnish**, not a RAG pipeline:

| Step | Source | Method | Notes |
|------|--------|--------|-------|
| 1. Playbook | `agent_documents` registry | Loaded whole | Email campaign rules, compiled from MD docs |
| 2. Practice config | SQL tool | Exact query | Tone, signature, send windows, sequence length, content toggles |
| 3. Consultation data | SQL/API tool | Exact query | Extraction results, sentiment, products discussed, opportunities |
| 4. Catalog/pricing | SQL tool | Exact query | Validated against practice library — exact, never embedded |
| 5. Evidence (optional) | Retrieval service | RAG | Patient-safe stat or manufacturer video link to enrich email content; searched with `patient_safe=true` filters, cited through standard pipeline |

Items 1-4 are assembled by code before the LLM ever runs; only item 5 touches vector search. That makes the campaign generator fast, debuggable, and reproducible — when an email comes out wrong, you can see exactly which input was wrong, because the context wasn't assembled by similarity dice-rolls.

---

## Integration with Agent Manager

The `agent_documents` table lives in Agent Manager Supabase alongside agent definitions. The Tool Registry (R4) should include a `load_playbook` tool that the orchestrator calls to load matching docs by task tag.

The document registry maps to the existing `doc_type` taxonomy:

| doc_type | When to use | Loaded how |
|----------|-------------|------------|
| `playbook` | Operating instructions for a task | Whole, by task_tag match |
| `reference` | Background context (product guides, process docs) | Whole or by section, by agent_key match |
| `evidence` | Content for RAG search | Chunked + embedded in CMS Supabase |

This three-way split should be visible in the Agent Manager UI under the Data Sources / Tools tab.
