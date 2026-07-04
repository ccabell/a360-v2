# Full Handoff — Global Library Population + Citations Plan
**Date:** 2026-06-12  
**For:** Next conversation — continue GL population + implement citation infrastructure

---

## PART 1: WHAT WE WERE DOING (full context)

### The Project
We are building the **A360 Global Library** — a structured knowledge system for aesthetic medicine that populates `agent_reference_docs`, `evidence_links`, `agent_fuel_documents`, and related tables in Supabase project `aejskvmpembryunnbgrk`. The goal is OpenEvidence for aesthetics: every clinical claim backed by cited, linkable data that providers can tap to verify what the system says.

### The Dossier System
Each product/category gets a set of rows in `agent_reference_docs`, organized by:
- **`lens`**: `clinical` (provider-grade) / `sales_education` (patient-facing, PRIMARY) / `deep_product` (provider deep dive)
- **`doc_type`**: `clinical_summary`, `technique_guide`, `patient_education`, `faq`, `deep_dive_playbook`, `category_overview`
- **`audience`**: `provider` / `patient` / `staff`

Provenance lives in `evidence_links` — one row per asserted claim, with `source` (fda_label/pubmed/youtube/etc.), `authority_rank` (1=FDA/IFU, 2=PubMed, 3=manufacturer, 4=textbook, 5=consensus, 6=podcast/youtube), `doi`, `pmid`, `snippet`.

### The Two Big Addenda (architectural decisions locked)
1. **GATEWAY_POSTURE_ADDENDUM** (`Fable Docs/GATEWAY_POSTURE_ADDENDUM.md`): A360 is a gateway to data, not an authority. Clinical lens = characterize in ranges + point to source for exact protocol. Safety floor (contraindications, black box warnings) is the ONE place we assert authoritatively. Precise dosing tables are GONE — replaced by range characterizations + `[FDA/DailyMed →]` pointers.

2. **SALES_EDUCATION_PRIORITY_ADDENDUM** (`Fable Docs/SALES_EDUCATION_PRIORITY_ADDENDUM.md`): `sales_education` is the PRIMARY lens — deepest compile effort, no liability ceiling. Key sections: `combination_therapy` (new, Chris-priority), `cost_benefit` (deep), `benefit_framing`, `objection_reframes`, `maintenance_story`.

### What Was Completed This Session

**1. DOSSIER_TEMPLATES.md updated:**
- `sales_education` rows marked `*(PRIMARY)*` across all entity types
- `combination_therapy` section added to product `patient_education`, category `category_overview`, concern `patient_education`
- `dosing_zones` flagged `[gateway: range+pointer, no precise table]` in technique_guide

**2. Nine Botox/Neurotoxins docs ARCHIVED (v1 → status='archived') and RECOMPILED (v2, status='draft'):**

| Entity | Lens | doc_type | New v2 ID |
|---|---|---|---|
| Neurotoxins (category) | clinical | clinical_summary | `4512a79d-0322-478e-a994-9b007b6567e2` |
| Neurotoxins (category) | clinical | technique_guide | `78eead5e-c25c-4b1f-8753-ee6856757cd8` |
| Neurotoxins (category) | **sales_education** | category_overview | `84be871e-c167-46b1-ae93-7a70109662eb` |
| Neurotoxins (category) | deep_product | deep_dive_playbook | `634459ac-1162-4f1d-b37f-94ad06ac56fa` |
| Botox Cosmetic (product) | clinical | clinical_summary | `eddb8155-3a8a-4fd3-8f71-25eea0c4ec38` |
| Botox Cosmetic (product) | clinical | technique_guide | `8a4a534b-4814-47af-bc9d-c915d2e68531` |
| Botox Cosmetic (product) | **sales_education** | patient_education | `9212af1b-2af9-4f89-b935-537954cb26cb` |
| Botox Cosmetic (product) | **sales_education** | faq | `e3f5b92e-a51b-4ed1-a998-81ebc4c81863` |
| Botox Cosmetic (product) | deep_product | deep_dive_playbook | `ccc4b815-bf39-417b-8b05-42427f6dee89` |

DB confirmation: `SELECT status, version, COUNT(*) FROM agent_reference_docs WHERE offering_id='4b92be36...' OR category_id='57b7c5a8...' GROUP BY status, version` → **9 archived v1, 9 draft v2**.

**3. Three REVIEW_QUEUE files written** (in `C:\projects\a360-v2\REVIEW_QUEUE\`):
- `PENDING_botox_neurotoxins_sales_education.md` ← **Read this first** (combination_therapy section is the key new deliverable)
- `PENDING_botox_neurotoxins_clinical.md` (verify no dosing table, gateway posture applied)
- `PENDING_botox_neurotoxins_deep_product.md` (lightest review needed)

**4. compile_manifest.json updated** — tracks both v1 (archived) and v2 (draft) with all IDs.

### What Comes Next for GL Population (blocked on review)
1. **Chris reviews and approves/rejects v2 docs** → flip approved rows to `status='active'`
2. **Batch Phase 1** — remaining 6 categories (HA Fillers, Biostimulators, Energy RF, Energy Laser, Skincare Actives, Body Contouring) under same gateway+sales_education_primary posture
3. **Batch Phase 2** — 20 demo products, inheriting from Phase 1 categories via `extends_doc_id`
4. The approved Botox/Neurotoxins dossier IS the style guide for the batch run

---

## PART 2: CITATIONS PLAN (decisions locked this session)

### The Good News: The UI Is Already Built
**The Research/Evidence tab in `a360-v2` already has the exact OpenEvidence-style citation UI.** As seen in the screenshot, it renders:
- Numbered inline citation chips `[1][2][3]` in the answer text
- "References (N)" panel below
- Citation cards with source type badge ("Research" / "FDA Label"), title, authors, journal, year, snippet quote
- "View on PubMed" external link for PubMed sources
- "Open FDA label · p.12" link with page number for FDA sources

**The gap is not UI — it's data.** The evidence_links rows need proper URLs and PMIDs populated so the citation cards can resolve.

### Locked Decisions

**1. Rendering** — Numbered chips inline `[1][2]` per the screenshot. Source panel below. Hoverable tooltip. Click goes to the cited source. **Already built in M6 Evidence tab.**

**2. FDA label linking** — Ingest FDA label PDFs to Supabase Storage. Store the storage URL + page number in `evidence_links.url` + a new `page_number` field. The "Open FDA label · p.12" pattern in the screenshot IS the target. We have 6 FDA label markdowns already at `C:\projects\a360-v2\Fable Docs\Ingestion Pipeline\` area — these need to become properly stored PDFs with page-indexed URLs.

**3. Evidence_link ↔ prose wiring** — Simple approach: the LLM at query time cites `[src_N]` markers for retrieved evidence_links. The post-processor resolves them to Citation objects. Do NOT embed evidence_link IDs in `content_md` prose — that's too complex for a demo. The inline tier tags (`[FDA label]`, `[peer-reviewed: ...]`) in prose remain as human-readable provenance but are not the citation rendering system.

**4. Source priority for citations (v1):**
- **PubMed** ✓ — DOI → construct `https://doi.org/{doi}` link; backfill PMIDs from DOI via CrossRef API to get `https://pubmed.ncbi.nlm.nih.gov/{pmid}/` links
- **FDA labels** ✓ — Ingest PDFs to Supabase Storage, store URL + page number in evidence_links
- **YouTube** ✓ ALWAYS — Already in CMS Supabase; timestamps need to be re-ingested (currently discarded). Deep link: `https://youtube.com/watch?v={videoId}&t={startSeconds}s`
- **Podcasts** ✗ — No citation links for podcasts in v1

**5. Provider vs. patient** — Citations rendered for providers only (clinical + deep_product lens responses). Patient-facing (sales_education) does not show PubMed footnotes. YouTube videos may be shared with patients in emails/Reach — that's a separate flow, not inline citations.

**6. Speed** — Fastest path wins. The Research tab already works. The data gaps are:
  - `evidence_links.pmid` is null on most PubMed rows → backfill from DOI
  - `evidence_links.url` is empty on all rows → populate
  - No page_number field on evidence_links for FDA sources → add column
  - YouTube timestamps discarded at ingestion → fix ingestion to capture `start_seconds`/`end_seconds`

### What Needs to Be Built

**Priority 1 — Fix evidence_links data gaps (1-2 days):**
```sql
-- Already have:
evidence_links.doi (populated for PubMed rows)
evidence_links.source_reference (text, inconsistent)
evidence_links.snippet

-- Missing:
evidence_links.pmid       -- null on most PubMed rows
evidence_links.url        -- empty on all rows  
evidence_links.page_number -- doesn't exist yet (needed for FDA PDF deep links)
```

Tasks:
- Add `page_number INT` column to `evidence_links`
- Backfill `pmid` for existing PubMed rows: use CrossRef API (`https://api.crossref.org/works/{doi}`) to look up PMID from DOI
- Backfill `url` for PubMed rows: `https://pubmed.ncbi.nlm.nih.gov/{pmid}/` once PMIDs are populated
- For FDA sources: ingest the prescribing info PDFs to Supabase Storage, update evidence_links with storage URL + page number

**Priority 2 — Update compile pipeline to always capture citation locators:**
When inserting new `evidence_links` rows during dossier compile, always capture:
- For PubMed: `pmid`, `doi`, `url` = `https://pubmed.ncbi.nlm.nih.gov/{pmid}/`
- For FDA label: `url` = Supabase Storage URL, `page_number` = the page in the PDF
- For YouTube: `chunk_id` → resolves to CMS chunk with `start_seconds`/`end_seconds`

**Priority 3 — YouTube timestamp ingestion fix:**
The CMS Supabase YouTube chunks currently discard timestamps at ingestion. Need to store `start_seconds`/`end_seconds` per chunk. The RETRIEVAL_SERVICE.md §10 calls this out explicitly. This enables the deep-link `?t={startSeconds}s` in citations.

**Priority 4 — Wire evidence_links into the Research tab citation renderer:**
The Research tab already renders citations from retrieved chunks. It needs to also pull from `evidence_links` for structured/dossier content. This is the M6 Evidence tab work already in the demo plan.

---

## PART 3: FABLE DOCS OVERVIEW (what exists)

Key files in `C:\projects\a360-v2\Fable Docs\`:

| File | What it is |
|---|---|
| `DOSSIER_SYSTEM_ARCHITECTURE.md` | How dossiers map to real DB tables — the master architecture doc |
| `DOSSIER_COMPILE_PIPELINE.md` | The master prompt for compiling dossiers — UPDATED with gateway+sales_education posture |
| `DOSSIER_TEMPLATES.md` | Section structure per entity type — UPDATED with combination_therapy + PRIMARY markings |
| `DOSSIER_COVERAGE_SCORING_ADDENDUM.md` | How to score how well-sourced each section is at review time |
| `GATEWAY_POSTURE_ADDENDUM.md` | A360 = gateway not authority. No precise dosing tables. Safety floor stays authoritative. |
| `SALES_EDUCATION_PRIORITY_ADDENDUM.md` | sales_education = PRIMARY lens. Deep cost_benefit, combination_therapy, objection_reframes. |
| `RETRIEVAL_SERVICE.md` | Full spec for the RAG retrieval + citation pipeline — the designed system, not yet built |
| `Openevidence Clone.md` | The OpenEvidence architecture: hybrid retrieval, citation validation, answer prompts |
| `A360_DEMO_MASTER_PLAN.md` | June 22 Boulevard demo — M6 Evidence tab IS the Research/citation demo |
| `A360_SYSTEM_MAP.md` | Full system map |
| `_ A360 - Global Library Source Analysis.md` | Comprehensive source analysis: PubMed, FDA, YouTube, podcasts — ingestion methods + licensing |
| `AGENT_PACK_*.md` | Agent chain specs |

---

## PART 4: KEY DB IDS AND STATE

**Supabase project:** `aejskvmpembryunnbgrk`

**Key entity IDs:**
- Botox offering_id: `4b92be36-e84e-432c-8549-f5d85a767fdb`
- Neurotoxins category_id: `57b7c5a8-0799-42b0-9111-8441f18a82db`

**evidence_links schema (actual columns):**
`id, offering_id, field_name, source (enum), pmid (text, MOSTLY NULL), doi (text), episode_id, chunk_id, url (text, EMPTY), source_reference (text), snippet, claimed_value, similarity, authority_rank, verified_by, verified_at, created_at, updated_at`

**Current evidence_links gaps:**
- `pmid`: null on all PubMed rows (DOI is populated, PMIDs are not)
- `url`: empty string on all rows
- No `page_number` column (needed for FDA PDF deep links)
- YouTube timestamps: discarded during CMS ingestion

---

## PART 5: IMMEDIATE NEXT STEPS (for the next conversation)

### Step 1 — Review the v2 Botox/Neurotoxins docs
Open these files and read them. Approve or reject each lens group:
- `C:\projects\a360-v2\REVIEW_QUEUE\PENDING_botox_neurotoxins_sales_education.md` ← FIRST
- `C:\projects\a360-v2\REVIEW_QUEUE\PENDING_botox_neurotoxins_clinical.md`
- `C:\projects\a360-v2\REVIEW_QUEUE\PENDING_botox_neurotoxins_deep_product.md`

To approve: `UPDATE agent_reference_docs SET status='active', approved_by='chris', approved_at=now() WHERE id IN ('...')`

### Step 2 — Citations data fixes (run in parallel with GL population)
Start with the easiest wins:
1. Add `page_number INT` column to `evidence_links`
2. Backfill PMIDs for existing PubMed evidence_links using CrossRef API (DOI → PMID lookup)
3. Backfill `url` field from PMID: `'https://pubmed.ncbi.nlm.nih.gov/' || pmid`
4. Decide: ingest FDA PDFs to Supabase Storage NOW or use DailyMed URLs constructed from product name

### Step 3 — Batch Phase 1 categories (after review approval)
Run the compile pipeline for the remaining 6 categories:
- HA Fillers
- Biostimulators  
- Energy/RF
- Energy/Laser
- Skincare Actives
- Body Contouring

Same posture as Botox/Neurotoxins. The approved Botox dossier is the style guide.

### Step 4 — Update compile pipeline to capture citation locators
For ALL future evidence_links inserts, always capture: `pmid`, `doi`, `url` (constructed), `page_number` (for FDA). This is one paragraph added to the compile prompt.

---

## PART 6: THE BIG PICTURE (for reference)

**What we're building:** OpenEvidence for aesthetic medicine. A provider asks a question about technique, dosing, or product selection → gets an evidence-grounded answer → every clinical claim has a numbered citation → clicking `[1]` opens the PubMed article or FDA label PDF at the right page → the Research tab in a360-v2 already renders this correctly.

**Why the dossier system matters for citations:** The dossiers are the curated, compiled, agent-loadable knowledge layer. The `evidence_links` table is the provenance backbone. When we say "sources are cited," we mean: every claim in every dossier has a backing `evidence_links` row with a real DOI or FDA source — and once those rows have `url` + `pmid` properly populated, the Research tab can render them as clickable citations automatically.

**The gap right now:** The evidence is there (evidence_links rows exist with DOIs), but the URL fields are empty and PMIDs are null. That's the citation gap. It's a data backfill, not an architecture problem.

**The demo deadline:** June 22, 2026 — Boulevard CEO/CTO meeting. M6 (Evidence/Research tab) is a LIVE lane — real retrieval, real citations, unscripted questions. This is where the citations need to work perfectly.
