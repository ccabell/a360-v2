# A360 Agent Manager — Data Sources

All data for this project comes from exactly **three Supabase projects** plus the Prompt Runner API. Everything else is out of scope. No legacy agents. No old GL Supabase. No agent fuel. Fresh start.

---

## 1. Agent Manager Supabase (NEW — Clean Database)

**Project:** `aejskvmpembryunnbgrk`
**Dashboard:** https://supabase.com/dashboard/project/aejskvmpembryunnbgrk
**Env:** `NEXT_PUBLIC_AGENT_SUPABASE_URL` / `AGENT_SUPABASE_SERVICE_KEY`
**Purpose:** All structured data for agents — definitions, reference content, manufacturer data, FDA, practice library, PDFs, images. Fresh start, no legacy.

### What lives here (new for this project):

| Category | Description |
|----------|-------------|
| **Agent definitions** | All new agents created in the Agent Manager |
| **Agent versions** | Immutable version snapshots (prompt, model, tools, schema, constraints) |
| **Agent tools** | Tool registry (what agents can call) |
| **Agent workflows** | Multi-step workflow definitions |
| **Agent runs** | Execution logs for every agent invocation |
| **Agent citations** | Source references from agent outputs |
| **Eval results** | Evaluation scores per agent run |
| **Manufacturer content** | Product info, marketing, clinical data from manufacturers |
| **FDA content** | Drug labels, 510(k), PMA regulatory data |
| **Practice library** | Practice-specific products, services, pricing, preferences |
| **Reference documents** | Domain knowledge, consultation guides, objection handling |
| **PDFs** | Viewable/downloadable documents (Supabase Storage) |
| **Images** | Product images, before/after, diagrams (Supabase Storage) |

### Supabase Storage (PDFs + Images)

Files stored in Supabase Storage buckets, served via signed URLs or public bucket URLs.

**Recommended bucket structure:**
```
storage/
  pdfs/           → FDA labels, IFUs, clinical studies, manufacturer docs
  images/         → Product images, before/after, diagrams, logos
  practice/       → Practice-specific uploaded documents
```

**Serving approach:**
- Public bucket for non-sensitive content → direct URL, clickable in UI
- Private bucket for practice docs → signed URL (time-limited, secure)
- UI renders PDFs inline via `<iframe>` or PDF.js, images via `<img>` tag
- All storage URLs constructable: `{supabase_url}/storage/v1/object/public/{bucket}/{path}`

---

## 2. CMS Supabase (Vectorized RAG Content)

**Project:** `gjqicqldjgvrwmtkliie`
**Dashboard:** https://supabase.com/dashboard/project/gjqicqldjgvrwmtkliie
**Env:** `NEXT_PUBLIC_CMS_SUPABASE_URL` / `CMS_SUPABASE_SERVICE_KEY`
**Purpose:** All vectorized content corpora — podcasts, YouTube, PubMed, industry articles. Searchable via RPC functions. All embeddings: OpenAI ada-002 (1536 dimensions).

### Live Corpus Status (Verified 2026-06-09)

| Source | Records | Chunks | Table | Status |
|--------|---------|--------|-------|--------|
| **YouTube** | 3,894 videos (2,548 classified) | 201,982 | `manufacturer_youtube_transcript` | Live |
| **PubMed** | 23,581 articles | 37,376 | `pubmed_articles_vectorized` | Live |
| **Podcasts** | 8,688 episodes (31 shows) | 202,382 | `podcast_chunks` | Live |
| **Industry Articles** | — | 87,923 | `industry_article_chunks` | Live |
| **TOTAL** | — | **529,663** | — | **All online** |

### YouTube

**Metadata table:** `youtube_videos` (3,894 rows)

| Column | Type | Purpose |
|--------|------|---------|
| `video_id` | TEXT PK | YouTube video ID |
| `video_title` | TEXT | Video title |
| `video_url` | TEXT | Direct YouTube link |
| `manufacturer_name` | TEXT | Channel/brand name |
| `audience` | TEXT | 'patient' / 'clinician' / 'marketing' / 'mixed' |
| `content_type` | TEXT | 'explainer' / 'procedure_demo' / 'before_after' / 'education' / 'testimonial' / 'product_review' / 'faq' / 'training' / 'marketing' / 'webinar' |
| `treatments` | TEXT[] | Treatment/procedure names (GIN indexed) |
| `anatomy_areas` | TEXT[] | Body regions (GIN indexed) |
| `concerns` | TEXT[] | Patient concerns (GIN indexed) |
| `source_type` | TEXT | 'manufacturer_product' / 'manufacturer_general' / 'patient_education' / 'clinical_training' / 'skincare_brand' |
| `patient_safe` | BOOLEAN | Safe for patient audiences |
| `is_product_specific` | BOOLEAN | Product-specific content flag |
| `summary` | TEXT | AI-generated summary |
| `duration_seconds` | INT | Video length |
| `chunk_count` | INT | Number of transcript chunks |

**Chunks table:** `manufacturer_youtube_transcript` (201,982 chunks)

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Primary key |
| `video_id` | TEXT | FK to youtube_videos |
| `video_title` | TEXT | Video title |
| `video_url` | TEXT | YouTube link |
| `manufacturer_name` | TEXT | Channel name |
| `chunk_text` | TEXT | Transcript chunk |
| `chunk_index` | INT | Position in transcript |
| `embedding` | vector(1536) | ada-002 embedding |

**Ingestion queue:** `youtube_ingest_queue` — work queue for unattended ingestion

**RPC:** `match_youtube_transcripts(query_embedding, match_count, match_threshold)`
**Enhanced RPC:** `search_classified_videos(query_embedding, match_count, match_threshold, p_audience)`

**Citation format:**
```
[Manufacturer Name] — "Video Title"
https://youtube.com/watch?v={video_id}
Type: {content_type} | Audience: {audience}
```

### PubMed

**Table:** `pubmed_articles_vectorized` (23,581 articles, 37,376 chunks)

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Primary key |
| `pmid` | TEXT | PubMed ID |
| `title` | TEXT | Article title |
| `chunk_text` | TEXT | Abstract or body chunk |
| `chunk_index` | INT | 0 = abstract, 1+ = body |
| `total_chunks` | INT | Total chunks per article |
| `embedding` | vector(1536) | ada-002 embedding |
| `journal` | TEXT | Journal name |
| `pub_date` | TEXT | Publication date |
| `doi` | TEXT | Digital Object Identifier |
| `authors` | TEXT | Author list |
| `keywords` | TEXT[] | Keywords array |
| `mesh_terms` | TEXT[] | MeSH subject headings |
| `relevance_score` | INT | Internal scoring (0-100) |

**RPC:** `match_pubmed_articles(query_embedding, match_count, match_threshold)`

**Citation format:**
```
{Authors}. "{Title}". {Journal}. {pub_date}.
PMID: {pmid} | DOI: {doi}
https://pubmed.ncbi.nlm.nih.gov/{pmid}/
```

### Podcasts

**Shows table:** `podcast_shows` (31 shows)

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Primary key |
| `name` | TEXT | Show name |
| `host` | TEXT | Host name |
| `description` | TEXT | Show description |
| `rss_url` | TEXT | RSS feed URL |
| `website_url` | TEXT | Show website |
| `category` | TEXT | Show category |
| `artwork_url` | TEXT | Show logo/image |
| `episode_count` | INT | Total episodes |

**Episodes table:** `podcast_episodes` (8,688 episodes)

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Primary key |
| `show_id` | UUID | FK to podcast_shows |
| `title` | TEXT | Episode title |
| `published_date` | DATE | Publication date |
| `duration_seconds` | INT | Episode length |
| `enclosure_url` | TEXT | Audio/feed URL |
| `description` | TEXT | Episode description |
| `transcript_text` | TEXT | Full transcript |
| `speakers` | TEXT[] | Speaker names |
| `guests` | TEXT[] | Guest names |
| `is_vectorized` | BOOLEAN | Vectorization flag |

**Chunks table:** `podcast_chunks` (202,382 chunks)

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Primary key |
| `episode_id` | UUID | FK to podcast_episodes |
| `chunk_index` | INT | Position in episode |
| `chunk_text` | TEXT | Text chunk |
| `embedding` | vector(1536) | ada-002 embedding |
| `token_count` | INT | Token count |

**RPC:** `match_podcast_chunks(query_embedding, match_count, match_threshold, p_show_name, p_category, p_published_after)`

**Citation format:**
```
[Show Name] — "{Episode Title}" ({Published Date})
Host: {host} | Guests: {guests}
```

### Industry Articles

**Chunks table:** `industry_article_chunks` (87,923 chunks)

*(Full schema TBD — tracked in corpus dashboard)*

### Tagging System (Cross-Source)

| Table | Rows | Purpose |
|-------|------|---------|
| `library_vocab` | 279 | GL-aligned vocabulary terms (treatments, products, concerns, anatomy) |
| `library_tags` | varies | Universal tagging bridge across ALL content sources |

**`library_tags` columns:**

| Column | Purpose |
|--------|---------|
| `source_type` | 'youtube' / 'pubmed' / 'podcast' / 'industry' |
| `source_id` | FK to the source record |
| `tag_type` | Vocabulary category (treatment, product, concern, anatomy) |
| `tag_value` | The actual tag from `library_vocab` |
| `confidence` | Tag confidence score |

### Unified Search

All content searchable via `library_search.py`:
- Unified query across all 4 sources (1 RPC call)
- GL vocabulary filters (treatment, product, concern, anatomy)
- Authority scoring:

| Source | Authority Weight |
|--------|-----------------|
| YouTube (manufacturer) | 1.40 |
| PubMed (peer-reviewed) | 1.30 — 1.37 |
| Industry articles | 0.85 — 1.25 |
| Podcasts | 0.90 |

### Ingestion Scripts

| Script | Purpose |
|--------|---------|
| `scripts/library_search.py` | Unified search across all 4 sources |
| `scripts/tag_corpus.py --source all` | Tag all sources with GL vocabulary |
| `global-library/youtube_runner.py` | Queue-based YouTube ingestion (API → VTT → Whisper) |
| `global-library/seed_queue.py` | Enumerate channels → youtube_ingest_queue |

---

## 3. Prompt Runner Supabase (Transcripts + Extraction)

**Project:** `ksutsaiogmicgaarocba`
**Dashboard:** https://supabase.com/dashboard/project/ksutsaiogmicgaarocba
**API:** `https://prompt-runner-production.up.railway.app`
**Env:** `NEXT_PUBLIC_PR_SUPABASE_URL` / `PR_SUPABASE_SERVICE_KEY`
**Purpose:** Patients, transcripts, extraction runs, prompts, evaluation. Accessed primarily via Railway API.

### What we use from Prompt Runner:

| Data | API Endpoint | Purpose |
|------|-------------|---------|
| **Transcripts** | `GET /transcripts`, `GET /transcripts/{id}` | Patient consultation transcripts (input for agents) |
| **Runs** | `GET /runs`, `GET /runs/{id}` | Extraction run results |
| **Extraction** | `POST /run_extraction` | Trigger Pass 1/2 extraction on a transcript |
| **Downstream** | `POST /run_downstream` | Execute downstream agents (coaching, cross-sell, email) |
| **Agents** | `GET /agents` | List available Prompt Runner agents |
| **Opportunities** | `GET /opportunities` | Extracted revenue opportunities |
| **Prompts** | `GET /prompt_templates` | Prompt definitions we can reference/reuse |
| **Practices** | `GET /practices` | Practice configuration |
| **Eval** | `POST /eval/run`, `GET /eval/rubrics` | Run evaluations, get rubrics |
| **Health** | `GET /health` | Connection status check |

---

## 4. Corpus Status Dashboard (REQUIRED — BUILD THIS)

**Critical:** Corpus status has been repeatedly lost across sessions. The Agent Manager UI MUST include a persistent dashboard showing live counts from all three Supabase projects.

### Dashboard metrics:

| Metric | Source DB | Query |
|--------|-----------|-------|
| YouTube videos (total) | CMS | `SELECT count(*) FROM youtube_videos` |
| YouTube videos (classified) | CMS | `SELECT count(*) FROM youtube_videos WHERE audience IS NOT NULL` |
| YouTube chunks | CMS | `SELECT count(*) FROM manufacturer_youtube_transcript` |
| YouTube queue status | CMS | `SELECT status, count(*) FROM youtube_ingest_queue GROUP BY status` |
| PubMed articles | CMS | `SELECT count(DISTINCT pmid) FROM pubmed_articles_vectorized` |
| PubMed chunks | CMS | `SELECT count(*) FROM pubmed_articles_vectorized` |
| Podcast shows | CMS | `SELECT count(*) FROM podcast_shows` |
| Podcast episodes | CMS | `SELECT count(*) FROM podcast_episodes` |
| Podcast chunks | CMS | `SELECT count(*) FROM podcast_chunks` |
| Industry article chunks | CMS | `SELECT count(*) FROM industry_article_chunks` |
| Vocab terms | CMS | `SELECT count(*) FROM library_vocab` |
| Tagged records by source | CMS | `SELECT source_type, count(*) FROM library_tags GROUP BY source_type` |
| **Total indexed chunks** | CMS | Sum of all chunk table counts |
| Prompt Runner transcripts | PR API | `GET /health` |
| Prompt Runner runs | PR API | `GET /runs?limit=1` |

### Health indicators (green/red):

| Check | Green | Red |
|-------|-------|-----|
| CMS Supabase reachable | < 2s response | Timeout/error |
| Agent Manager Supabase reachable | < 2s response | Timeout/error |
| Prompt Runner Supabase reachable | < 2s response | Timeout/error |
| Prompt Runner API reachable | `/health` OK | Timeout/error |
| YouTube chunks > 200K | Current: 201,982 | Below threshold |
| PubMed chunks > 35K | Current: 37,376 | Below threshold |
| Podcast chunks > 200K | Current: 202,382 | Below threshold |
| Industry chunks > 80K | Current: 87,923 | Below threshold |

---

## Summary

| # | Source | Project ID | Purpose |
|---|--------|-----------|---------|
| 1 | **Agent Manager Supabase** | `aejskvmpembryunnbgrk` | Agent definitions, manufacturer content, FDA, practice library, PDFs, images |
| 2 | **CMS Supabase** | `gjqicqldjgvrwmtkliie` | Vectorized content: 529,663 chunks across 4 corpora |
| 3 | **Prompt Runner Supabase** | `ksutsaiogmicgaarocba` | Transcripts, extraction runs, prompts, evaluation |
| — | **Prompt Runner API** | Railway (HTTPS) | API layer over Prompt Runner Supabase |

**Total searchable content:** 529,663 vectorized chunks across YouTube, PubMed, Podcasts, and Industry Articles.

No legacy agents. No old GL Supabase. No agent fuel. Everything here is fresh.
