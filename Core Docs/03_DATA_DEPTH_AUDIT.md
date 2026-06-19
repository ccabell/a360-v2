# Data Depth Audit

**Date:** 2026-06-14

Where the data is rich, where it's thin, and what to prioritize.

---

## Ops Supabase — Patient Data (Product A)

### What's Rich (3 canonical patients)

| Patient | ID | Transcript | Extraction | Agent Outputs | Demo-ready? |
|---------|-----|-----------|------------|---------------|-------------|
| **Sofia Reyes** | `3f7bfaf1` | 37 min, multi-speaker | 2-pass verified (91.3% anchor rate) | 16 outputs across 4 agent types | **YES** |
| **Amara Okafor** | `0c6053d5` | 30 min, multi-speaker | 2-pass verified | 2 orchestrator reports | **YES** |
| **David Park** | `3ac2a933` | 42 min, multi-speaker | 2-pass verified | 2 orchestrator reports, 23+ PubMed citations | **YES** |

Each canonical patient has:
- Full raw + enhanced transcript (~12-15K words)
- Structured extraction (offerings, concerns, goals, next steps, signals)
- Post-consultation intelligence reports with clinical evidence
- PubMed citations (real PMIDs)

### What's Thin (17 other patients)

All 20 patients have populated demographics (DOB, sex, medical history, patient summary, photo). But the other 17 patients (Katherine Chen, Danielle Brooks, Rachel Whitfield, etc.) have:
- **No consultations**
- **No transcripts**
- **No extractions**
- **No agent outputs** (API returns `[]`)

Clicking on any of these 17 patients shows an empty workspace. The patient list looks great (20 rows), but 85% of patients have nothing to show when you drill in.

### Gap: What "Demo-Ready" Means

A patient is demo-ready when clicking their name shows:
1. Patient info card with demographics
2. At least 1 consultation with transcript
3. Verified extraction with evidence anchoring (highlights in transcript)
4. Post-consultation agent report with clinical evidence

**Current:** 3/20 patients (15%) are demo-ready
**Target:** 10/20 (50%) minimum for a convincing demo

### How to Populate

Extractions come from Prompt Runner. The workflow:
1. Create a consultation + transcript in Ops Supabase (can be synthetic/de-identified)
2. Run extraction through Prompt Runner (or manually create verified extraction JSON)
3. Run post-consultation agent workflow (or manually insert agent_output records)
4. Mark extraction as `is_verified = true`

---

## Agent Manager Supabase — Evidence Data (Product B)

### What's Rich

**evidence_links (174 rows for Botox/neurotoxins):**
- FDA label URLs (accessdata.fda.gov)
- PubMed citations with real PMIDs
- YouTube links with timestamp deep-links
- Authority-ranked for retrieval ordering

**agent_reference_docs (19 products with dossiers):**
- Clinical lens and deep_product lens documents
- Prose content loaded into LLM context for grounded answers

### What's Thin

The `retrieveSources()` function in `lib/retrieval/sources.ts` **hardcodes two constants:**

```typescript
const BOTOX_OFFERING_ID = "4b92be36-e84e-432c-8549-f5d85a767fdb";
const NEUROTOXINS_CATEGORY_ID = "57b7c5a8-0799-42b0-9111-8441f18a82db";
```

This means:
- Questions about Botox/neurotoxins → get GL/FDA evidence + RAG results (strong)
- Questions about anything else → get RAG results only (no regulatory floor)

**Products with NO GL/FDA evidence:** Sculptra, Restylane, Juvederm, Halo, Morpheus8, CoolSculpting, Dysport (standalone), Kybella, all biostimulators, all lasers, all RF devices.

### What's Genuinely Strong

**RAG corpus via search service (550K+ chunks) — supplementary evidence:**

| Source | Chunks | Coverage |
|--------|--------|----------|
| PubMed | 37,376 | 22,623 articles, all aesthetics journals |
| Podcasts | 202,382 | 31 shows, 8,688 episodes |
| YouTube | 201,982 | 65+ manufacturer channels |
| Industry | 87,923 | 29 RSS feeds |

Retrieval quality: 10/10 combination treatment tests, avg similarity 0.8925.

This corpus covers the **full aesthetics space** — it supplements the primary GL data. When agents need clinical backing or expert context, this is where it comes from.

**Important:** PubMed/YouTube/podcasts are SUPPLEMENTARY. The primary data source for agents is the GL — fuel docs and manufacturer documents. RAG evidence enriches responses but doesn't drive them.

### The Data Hierarchy

Agents read data in this priority order:

1. **Fuel Documents** (`gl_agent_fuel_documents`) — curated agent-ready content (primary)
2. **Manufacturer Documents** (`agent_reference_docs`) — IFUs, operator manuals, training guides (primary)
3. **Evidence Links** (`evidence_links`) — FDA labels, PubMed citations, YouTube clips (citation layer)
4. **RAG Corpus** (PubMed, YouTube, podcasts, industry) — supplementary enrichment

### The Two-Layer Evidence Strategy

The v1.1 milestone work (pairing SQL, evidence model, podcast workflow) is building:

1. **Research layer:** Podcast ideas tagged with anonymous EC- IDs, used for concept discovery
2. **Production layer:** PubMed/FDA/consensus evidence used for clinical claims

Both layers populate into Agent Manager Supabase (`evidence_links`, `agent_reference_docs`). This is the right approach — grounded evidence with provenance.

### Gap: What Needs to Happen

1. **Extend `retrieveSources()` to match dynamically** — detect product mentioned in query, look up its offering_id, query evidence_links for that product (not just Botox)
2. **Populate evidence_links for top 10 product families** — fillers, lasers, skin resurfacing, biostimulators, body contouring
3. **Populate agent_reference_docs** — clinical dossiers for each product family

---

## Known Hard Blockers (from CLAUDE.md)

| System | Blocker | Impact |
|--------|---------|--------|
| Stacking Agent | `gl_product_relationships` 16% populated | Cannot produce real recommendations |
| Anatomy Specificity | `gl_product_anatomy` 14% coverage | Agents give body-part-blind output |
| Concern Matching | `gl_product_concerns` 13% coverage | Cannot match patient concerns to products |
| TCP | 2-5 minute latency | Commercially unviable in live consultation |
| Extraction Accuracy | Not systematically measured | Cannot claim accuracy |
| Pairing | Whitelist-only | Cannot recommend pairings for unenriched products |

---

## Priority Order for Data Work

1. **GL: Manufacturer docs for 20 demo products** → download IFUs/operator manuals, extract to `agent_reference_docs` (this week)
2. **GL: Fuel docs for 20 demo products** → curated agent-ready content in `gl_agent_fuel_documents` (this week)
3. **GL: Evidence links beyond Botox** → extend `evidence_links` to cover the 20 demo products (this week)
4. **Agent Manager: Remove hardcoded BOTOX_OFFERING_ID** → make `retrieveSources()` dynamic
5. **Ops Supabase:** Populate 7+ more patients to demo-ready (consultations + transcripts + extractions + agent outputs)
6. **GL tables:** Push gl_product_concerns, gl_product_anatomy toward 50%+ (unblocks stacking/pairing)
