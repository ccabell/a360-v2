# Global Library & Data Strategy

**Date:** 2026-06-14

---

## The Core Principle

**Agents are driven by Fuel Docs and Manufacturer Data. Not PubMed.**

The hierarchy of data sources for agent responses:

```
PRIMARY (what drives the agent):
  1. Fuel Documents — curated content in GL, product-specific
  2. Manufacturer Documents — IFUs, operator manuals, training guides

SUPPLEMENTARY (used where it adds value):
  3. PubMed — clinical evidence, when clinical claims need backing
  4. YouTube — manufacturer training videos, technique demos
  5. Podcasts — expert opinions, real-world practice insights
  6. Industry articles — market context
```

PubMed and other RAG sources are evidence that enriches responses — they are NOT the primary grounding. The GL (fuel docs + manufacturer data) is what agents read first and build responses from.

---

## What Lives Where

### Global Library (Agent Manager Supabase)

| Table | What it stores | Role |
|-------|---------------|------|
| `agent_reference_docs` | Full manufacturer documents (IFUs, operator manuals, training guides) — chunked prose | **Primary agent context** — loaded into LLM for grounded answers |
| `gl_agent_fuel_documents` | Curated fuel documents — product intelligence, pairing guides, treatment protocols | **Primary agent context** — the "brain" agents read from |
| `evidence_links` | Pointers to specific evidence (FDA labels, PubMed citations, YouTube clips) with snippets | **Citation layer** — provides verifiable references |
| `gl_products` | Product catalog (name, manufacturer, category, FDA status) | **Taxonomy** — product identification |
| `gl_product_relationships` | Product-to-product relationships (complements, sequences, alternatives) | **Intelligence** — what pairs with what |
| `gl_product_concerns` | Product-to-concern mappings | **Intelligence** — what treats what |
| `gl_product_anatomy` | Product-to-anatomy mappings | **Intelligence** — where on the body |
| `gl_product_guardrails` | Contraindications, safety constraints | **Safety layer** — what to avoid |

### CMS Supabase (via RAG Service)

| Table | What it stores | Role |
|-------|---------------|------|
| `pubmed_articles_vectorized` | 37K chunks — clinical literature | Supplementary clinical evidence |
| `manufacturer_youtube_transcript` | 202K chunks — manufacturer training videos | Supplementary technique/education content |
| `podcast_chunks` | 202K chunks — expert practitioner discussions | Supplementary real-world insights |
| `industry_article_chunks` | 88K chunks — industry news and market context | Supplementary market context |

---

## How Agents Use This Data

### Current State (what's wired today)

Evidence Ask (`/api/ask`, `/api/research/chat`):
- Queries `evidence_links` for regulatory citations (currently Botox-only)
- Queries `agent_reference_docs` for dossier content (currently Botox-only)
- Queries RAG service for PubMed/YouTube/podcast/industry chunks
- Merges all sources, passes to Claude for grounded answer

Post-Consultation Agent (`/api/patients/[id]/workflow`):
- Reads from `agent_outputs` in Ops Supabase
- Reports include PubMed citations from the orchestrator agent
- Currently does NOT query GL fuel docs at runtime (they were baked into the output at generation time)

### Target State (what we're building toward)

Agents will:
1. **Read fuel docs** from `gl_agent_fuel_documents` as their primary context
2. **Read manufacturer docs** from `agent_reference_docs` for product-specific detail
3. **Optionally pull** from CMS (YouTube, podcasts, PubMed) to enrich responses
4. **Check guardrails** before making recommendations
5. **Use product relationships** for pairing/stacking/sequencing recommendations

Practices will:
1. See the GL fuel docs as a baseline
2. Modify/override fuel docs for their practice (practice-level customization)
3. Practice-specific pricing, protocols, preferred products layer on top

---

## Manufacturer Data Population (This Week)

### Approach: Option A — Download → Extract → Store in `agent_reference_docs`

For each of the 20 demo products:

1. **Find** the manufacturer IFU, operator manual, or training guide
2. **Download** the PDF (regardless of where it's hosted — Squarespace, distributor sites, manufacturer portals)
3. **Extract** full text content (PDF → markdown)
4. **Store** as `agent_reference_docs` row:
   - `content_md`: full extracted text
   - `lens`: "manufacturer"
   - `doc_type`: "ifu" | "operator_manual" | "training_guide"
   - `offering_id`: linked to the correct GL product
   - `status`: "active"
5. **Immediately available** to Evidence Ask and agents

### What this unlocks:
- Evidence Ask answers grounded in manufacturer data, not just PubMed abstracts
- Agents can cite specific manufacturer claims and guidelines
- When `retrieveSources()` is made dynamic (not Botox-only), all products get manufacturer grounding

### The URL problem:
Many manufacturer docs aren't hosted on official sites. Solution: download, store your own copy (S3 or Supabase storage), reference your copy. The content is what matters for the agent — the URL is for human audit trail.

---

## Fuel Documents — What They Are

Fuel docs are curated, agent-ready content documents. They combine:
- Manufacturer claims (from IFUs, training guides)
- Clinical evidence (from PubMed, FDA)
- Expert consensus (from podcasts, industry practice)
- Practice intelligence (talking points, objection handling, value framing)

Each fuel doc is written for a specific agent use case:
- `pairing_fuel` — product combination intelligence (10 docs exist, 45 product pairs)
- `coaching_fuel` — consultation coaching guides (9 docs drafted)
- `product_fuel` — individual product deep dives (to be built)
- `treatment_fuel` — treatment protocol guides (to be built)

**Fuel docs are the whitelist.** Agents can only recommend what has approved fuel. No fuel doc = no recommendation. This is a safety mechanism.

---

## Current GL Coverage (Honest Numbers)

| Data type | Coverage | Impact |
|-----------|----------|--------|
| Product catalog (`gl_products`) | ~425 products | Taxonomy is solid |
| Product aliases | 2,649 | Product recognition is solid |
| Fuel documents | ~29 rows in `gl_agent_fuel_documents` | Thin — most products have no fuel |
| Manufacturer docs | Being built this week | Currently near-zero |
| Evidence links | 174 rows (Botox/neurotoxins only) | Being expanded this week |
| Product relationships | ~16% of 1,697 rows | Blocks stacking/pairing |
| Product anatomy | ~14% of 1,541 rows | Blocks body-part-aware answers |
| Product concerns | ~13% of 1,315 rows | Blocks concern matching |
| Guardrails | 209 rows | Decent baseline |

### What's being built this week:
- Manufacturer documents for 20 demo products → `agent_reference_docs`
- Fuel docs for those same 20 products → `gl_agent_fuel_documents`
- Evidence links extended beyond Botox → `evidence_links`

---

## How This Connects to the Two Products in a360-v2

### Product A (Consultation Intelligence):
- Agent reports already use fuel docs (baked in at generation time via Prompt Runner)
- As GL gets populated, future agent runs will produce richer reports
- Patient workspace shows whatever the agents generated — it's only as good as the fuel

### Product B (Evidence Ask):
- Currently queries `evidence_links` + `agent_reference_docs` (Botox-only)
- As manufacturer docs are added, Evidence Ask will ground answers in manufacturer data
- The `retrieveSources()` function needs to be made dynamic (detect product in query → pull that product's evidence)
- RAG supplements with PubMed/YouTube/podcast — but GL is the floor

---

## Practice Override Layer (Future)

Eventually, practices customize:
- Which products they carry (pricing, availability)
- Practice-specific protocols (their preferred dosing, their techniques)
- Modified fuel docs (their talking points, their approach)

Architecture: `pl_*` tables override `gl_*` tables via COALESCE pattern. Practice data > Global data > Category defaults.

**Not being built now.** But the GL structure supports it — that's why there are separate `gl_*` and `pl_*` prefixes.
