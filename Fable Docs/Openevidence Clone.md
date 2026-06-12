# Tab 6

# **1\) What OpenEvidence does (observable) \+ what you should mirror**

### **Publicly observable (high confidence)**

* OpenEvidence positions itself as a clinician-facing platform that returns **sourced, cited, grounded** answers, pulling from peer-reviewed literature and other medical sources.  
* They emphasize partnerships/content agreements with major publishers and guidelines (e.g., NEJM, JAMA, NCCN and other societies).  
* They appear to have a “**Deep Consult**” mode/agent for more advanced research workflows (per app release notes).  
* They include interactive workflows (many writeups mention follow-up questions / iterative refinement).

### **What is *not* public (so we should not claim)**

OpenEvidence does **not** publicly disclose their exact retrieval/ranking formula, model stack, or how they validate citations. Anything beyond the above should be treated as **best-practice inference**.

### **What to mirror (your attachments already describe the right “OE-mini” mechanics)**

Your “OpenEvidence Clone” doc outlines a strong mirror pattern:

* **Hybrid retrieval** (vector \+ BM25) with a simple starting blend (0.7 / 0.3) and dedupe-by-article.  
   Openevidence Clone (4)  
* **Grounding guardrails**: citations must map only to retrieved chunks; otherwise mark unsupported.  
   Openevidence Clone (4)  
* **Answer prompt contract**: “use only provided context,” “never invent,” “Markdown output \+ numbered citations \+ follow-ups.”  
   Openevidence Clone (4)  
* **Citation validation post-processor**: validate chunk\_id exists and quoted span occurs at offsets; strip unsupported citations.  
   Openevidence Clone (4)  
* **Evaluator UI**: compare “our answer” vs “OpenEvidence answer” side-by-side; include follow-ups as clickable reruns.  
   Openevidence Clone (4)

That is exactly how you build an OE-style system quickly *and* scientifically.

---

# **2\) The “portable core” architecture you want (works in Supabase *and* AWS)**

Think in **four layers**, and keep each layer portable:

## **Layer A — Ingestion (connectors → normalized text)**

* PubMed (XML/abstract/full text where allowed)  
* Manufacturer PDFs (IFUs, clinical guides)  
* Global Library PDFs (incl. LPOA)  
* Podcasts (episode metadata \+ transcripts)  
* YouTube (metadata \+ timed captions/transcripts)

## **Layer B — Canonical Content Store (system-of-record)**

* A normalized **document table** \+ **chunk table** with stable IDs  
* A **citation locator** on every chunk (page/section offsets, timestamps, etc.)

## **Layer C — Retrieval \+ Ranking (hybrid \+ weights)**

* Hybrid search: vector similarity \+ lexical (BM25/FTS)  
* Optional reranker (cross-encoder or LLM-judge)  
* “Why ranked” explain trace (helps you mirror OE transparency later)  
   Openevidence Clone (4)

## **Layer D — Answer \+ UX**

* Chat UI with source toggles  
* Answer with **inline citation chips** that open the underlying item (PubMed page, PDF page anchor, etc.)  
   Openevidence Clone (4)  
* “YouTube Moments” section separated but in the same response (for now)  
* Follow-up questions (OE-like)

---

# **3\) Path A (recommended): Supabase-first sandbox → promote to AWS**

This is the “fast iteration → production promotion” path your doc already recommends.

Openevidence Clone (4)

## **A1) Supabase build (outside AWS) — exactly what to implement**

### **Supabase components**

* **Postgres \+ pgvector** (your primary vector store in V1)  
* **FTS (tsvector) for lexical search**  
* **Storage**: Supabase Storage (or *optionally* S3 from day 1 if you want to minimize migration)

### **Minimum schema (generalized from your OE-mini tables)**

Your doc suggests the OE-mini schema: articles/chunks/queries/answers/runs/evals and deterministic citation offsets.

Openevidence Clone (4)

Generalize to multi-source:

**Core**

* `sources` (one row per item: PubMed article, PDF, podcast episode, YouTube video)  
* `chunks` (retrieval unit, with stable locator metadata)  
* `embeddings` (or store vector on `chunks`)

**Chat & evaluation**

* `queries`  
* `runs` (pipeline\_version, prompt\_version, topk, reranker on/off)  
* `answers` (answer\_md, citations JSON, followups)  
* `feedback` (clicks, dwell, thumbs, saves)  
* `ranking_weight_profiles` (JSON weights, per “profile”)  
   Openevidence Clone (4)

### **Ingestion jobs (outside AWS)**

Run these as containerized workers (Railway/Render/Fly/VM) calling Supabase:

* `ingest_pubmed_worker`  
* `ingest_pdf_worker` (manufacturer \+ global library \+ LPOA PDFs)  
* `ingest_podcast_worker` (transcribe if needed)  
* `ingest_youtube_worker` (see YouTube section below)

### **Chunking rules (portable)**

* PDFs/PubMed: semantic paragraphs with hard cap; store start/end offsets for citations.  
   Openevidence Clone (4)  
* YouTube/Podcast: segment by timestamps; store start/end seconds.

### **Retrieval in Supabase (hybrid)**

Implement the exact baseline from your doc:

* **Hybrid retrieval \= vector \+ BM25/lexical** with starting blend **0.7 / 0.3**  
   Openevidence Clone (4)  
* **Deduplicate** by `source_id` (or `article_id` for PubMed) and cap K (e.g., 15).  
   Openevidence Clone (4)  
* Optional reranker to top 5\.  
   Openevidence Clone (4)

### **Answer generation \+ citation enforcement**

* Prompt requires: use only context, numbered citations that reference chunk\_ids, plus follow-ups.  
   Openevidence Clone (4)  
* Post-processor validates every citation by chunk\_id \+ quote span.  
   Openevidence Clone (4)

That “citation validator” is the difference between “looks like OE” and “feels untrustworthy.”

---

## **A2) Promotion path to AWS (when you’re ready)**

When your sandbox hits acceptance criteria (grounding score, low red flags), promote.

Your doc’s recommended “fast path” is essentially:  
**Supabase → S3 → Bedrock Knowledge Base → Bedrock model**

Openevidence Clone (4)

### **Export design (key requirement)**

Keep **stable IDs**:

* `source_id`  
* `chunk_id`  
* citation locators (page/section offsets, timestamps)  
* `embedding_model`, `embedding_version`

So AWS becomes a **data/config flip**, not a rewrite.

Openevidence Clone (4)

---

# **4\) Path B: Build in AWS from day one (advantages \+ how)**

If you truly need to be **HIPAA-ready sooner**, AWS-first often reduces later rework.

You can still keep Supabase *for speed* (Auth/UI/admin panels), but move the **knowledge \+ retrieval core** into AWS from the start.

### **Why AWS-first can be better**

* Cleaner security boundary for future PHI  
* Better scalability patterns for multi-source ingestion (Step Functions, SQS, ECS)  
* Bedrock-native RAG options \+ managed vector services

### **Suggested AWS-first stack**

* **S3**: raw \+ normalized corpora  
* **Aurora Postgres (pgvector)** *or* **OpenSearch Serverless (vector)**  
* **Bedrock**: embeddings \+ LLM  
* **API Gateway \+ Lambda** (or ECS) for query/answer endpoints  
* **Step Functions \+ SQS \+ ECS** for ingestion pipelines (especially video)

Your YouTube requirements doc is already written in this pattern (Step Functions orchestration, SQS task queue, parallel workers).

Untitled document (19)

---

# **5\) HIPAA note (because you raised it)**

If you intend Supabase to hold **PHI**, Supabase requires a **signed BAA** and enabling their **HIPAA add-on / HIPAA Projects** configuration.

If PHI is *not* stored (public knowledge sources only), you can move faster without that constraint.

---

# **6\) How to mix PubMed \+ PDFs \+ Manufacturer \+ Podcasts \+ YouTube into ONE answer (with weights)**

## **Step 1 — Retrieve per-corpus (don’t mix too early)**

For each selected source type, run retrieval separately:

* PubMed retriever  
* PDF retriever (global library \+ LPOA \+ manufacturer PDFs)  
* Podcast retriever  
* YouTube retriever (moment segments)

Each returns top `K_source` chunks with:

* `chunk_id`, `source_id`, `text`, `locator`, `base_scores`

## **Step 2 — Score with a weight profile (global default \+ overrides)**

Store a weight profile like your doc describes.

Openevidence Clone (4)

### **Baseline hybrid weights (retrieval-level)**

Start with:

* `w_vector = 0.7`  
* `w_lexical = 0.3`  
   Openevidence Clone (4)

### **Evidence quality weights (PubMed-style)**

Your doc proposes starter weighting policies (seed defaults) you can implement:

* Study design boosts (SR/RCT \> cohort \> case report, etc.)  
   Openevidence Clone (4)  
* Recency half-life varies by category (injectables vs devices, etc.)  
   Openevidence Clone (4)  
* Geo/regulatory fit, journal tier, retraction/flags.  
   Openevidence Clone (4)

### **Source-type authority weights (multi-source)**

Add a `source_authority_weight` per corpus to control mixing:

Example defaults (you’ll tune):

* PubMed / guidelines: 1.00  
* Manufacturer PDFs: 0.85 (high relevance, but bias risk)  
* Global Library (LPOA/internal): 0.80 (policy/protocol authority)  
* Podcasts: 0.45 (education)  
* YouTube: 0.35 (education; keep separate section initially)

## **Step 3 — Merge with diversity constraints**

To avoid a single source dominating:

* cap per-source\_id (max 2 chunks per doc)  
* cap per-corpus (e.g., max 6 PubMed, 4 PDFs, 3 podcasts)  
* always include at least 1–2 from each selected corpus if relevance exists

## **Step 4 — Rerank top N (optional but very “OpenEvidence-like”)**

Use a reranker (toggleable) on the merged candidate set:

* cross-encoder reranker **or** LLM-as-judge prompt  
  Your doc suggests reranking to top-5 and storing pre/post scores.  
   Openevidence Clone (4)

## **Step 5 — Generate one answer with strict citation mapping**

Pass the **final evidence pack** to the answer model.  
Answer must cite only chunk\_ids you provided; then validate citations post-hoc.

Openevidence Clone (4)

Openevidence Clone (4)

---

# **7\) YouTube: how to serve it meaningfully \+ deep-link users to the exact second**

Your YouTube requirements doc is very explicit:

### **Data model requirement (the key enabler)**

You need a **timeline-indexed transcript store** with start/end seconds per segment so deep links are deterministic.

Untitled document (19)

Untitled document (19)

Minimum segment fields:

* `video_id`, `start_sec`, `end_sec`, `text`, `confidence`  
   Untitled document (19)

Deep link requirement:

* `https://www.youtube.com/watch?v=<video_id>&t=<start_sec>s`  
   Untitled document (19)

### **UX requirement (how it should feel)**

Return **moment-level matches**, not just “this video is relevant”:

* excerpt (2–5 lines)  
* timestamp range  
* deep link  
* why matched \+ confidence  
  …and keep it in a dedicated “YouTube Moments” section (for now).  
   Untitled document (19)

### **Ingestion constraint (important)**

Don’t download full videos at scale (ToS/legal). Prefer YouTube Data API \+ captions where permitted.

Untitled document (19)

---

# **8\) Agents you should implement (V1 → V2)**

## **Core runtime agents (V1)**

1. **Query Router Agent**  
   Chooses which corpora to query \+ what answer mode to use.  
2. **Corpus Retrievers (one per source type)**  
   Builds query expansions and filters, retrieves top chunks.  
3. **Ranker / Mixer Agent**  
   Applies weight profile \+ diversity \+ merges evidence.  
4. **Answer Writer Agent**  
   Writes the unified answer with numbered citations \+ follow-ups.  
    Openevidence Clone (4)  
5. **Citation Validator (non-LLM service)**  
   Enforces “citation must match retrieved chunk text.”  
    Openevidence Clone (4)  
6. **YouTube Moments Agent**  
   Produces the separate “Moments” list (snippet \+ timestamp \+ deep link).  
    Untitled document (19)

## **Evaluation agents (strongly recommended)**

7. **Evaluator Agent / Harness**  
   Your doc recommends a side-by-side compare flow to OpenEvidence and automated grounding metrics.  
    Openevidence Clone (4)

---

# **9\) Prompts (copy/paste templates)**

Below are the key prompts you asked for. These are **multi-source** (not just transcripts).

## **9.1 Multi-source Orchestrator Prompt (Router \+ Plan)**

`SYSTEM: You are A360 Evidence Chat Orchestrator (OpenEvidence-style).`  
`Goal: answer user questions using selected corpora (PubMed, PDFs, Manufacturer, Podcasts, YouTube),`  
`with strict citations + linkable references + suggested follow-up questions.`

`NON-NEGOTIABLE:`  
`- If a claim is not supported by retrieved evidence, do not state it.`  
`- Every key claim must cite one or more evidence IDs provided.`  
`- Output must include:`  
  `(1) Answer`  
  `(2) Citations list (numbered, each with a clickable URL)`  
  `(3) Suggested follow-up questions (3–7)`  
  `(4) If YouTube is selected: a separate "YouTube Moments" section (timestamp deep links)`

`INPUTS YOU WILL RECEIVE:`  
`- user_question`  
`- selected_sources: [pubmed, manufacturer, pdf_global_library, podcasts, youtube]`  
`- evidence_pack:`  
  `pubmed_chunks[{chunk_id, source_id, title, year, journal, pmid, doi, url, text, start_char, end_char}]`  
  `pdf_chunks[{chunk_id, source_id, title, url, page_start, page_end, text}]`  
  `podcast_chunks[{chunk_id, source_id, title, url, start_time, end_time, text}]`  
  `youtube_segments[{segment_id, video_id, title, channel, url, start_sec, end_sec, text}]`

`OUTPUT FORMAT:`  
`A) Answer (concise, evidence-based)`  
`B) Citations (numbered list; each includes title + year + source type + URL)`  
`C) YouTube Moments (ONLY if youtube selected; 3–7 bullets: excerpt + timestamp link)`  
`D) Suggested follow-ups (3–7)`

## **9.2 Reranker “LLM-as-judge” Prompt (optional)**

`SYSTEM: Rank evidence chunks for a clinical/evidence query.`  
`Return JSON only.`

`RULES:`  
`- Prefer higher-quality evidence (systematic reviews, RCTs) and more recent when relevant.`  
`- Prefer directly-on-topic chunks over vaguely related ones.`  
`- Penalize retracted/flagged items if that metadata is present.`  
`- Output a list of chunk_ids in ranked order with a short reason.`

`INPUT:`  
`question: {{question}}`  
`candidates: [{chunk_id, source_type, title, year, metadata, text}]`

`OUTPUT JSON:`  
`{`  
  `"ranked": [`  
    `{"chunk_id": "...", "score": 0-100, "reason": "..."}`  
  `]`  
`}`

## **9.3 Answer Writer Prompt (strict citation enforcement)**

This mirrors your doc’s guidance: “use only context,” “numbered citations,” “follow-ups.”

Openevidence Clone (4)

`SYSTEM: You are an evidence summarizer for aesthetic medicine.`  
`Use ONLY the provided evidence snippets. Never invent.`  
`Every key sentence must end with one or more citation numbers like [1][2].`

`You MUST return:`  
`1) answer_md`  
`2) citations: [{n, evidence_id, quote_span}]`  
`3) followups: [string...]`

`INPUT:`  
`question: {{question}}`  
`evidence: [{evidence_id, source_type, url, title, year, text, locator}]`

`OUTPUT JSON ONLY:`  
`{`  
  `"answer_md": "...",`  
  `"citations": [{"n": 1, "evidence_id": "pubmed:chunk_123", "quote_span": "..." }],`  
  `"followups": ["...", "..."]`  
`}`

## **9.4 YouTube Moments Prompt (separate section)**

`SYSTEM: You are A360 YouTube Moments Selector.`  
`Pick the most relevant timestamped segments for the user question.`  
`Return 3–7 moments. Each moment must include a deep link to the exact start second.`

`INPUT:`  
`question: {{question}}`  
`segments: [{video_id, title, channel, start_sec, end_sec, text}]`

`OUTPUT JSON:`  
`{`  
  `"moments": [`  
    `{`  
      `"title": "...",`  
      `"channel": "...",`  
      `"start_sec": 123,`  
      `"end_sec": 156,`  
      `"deep_link_url": "https://www.youtube.com/watch?v=<video_id>&t=<start_sec>s",`  
      `"excerpt": "2–5 lines",`  
      `"why_this_matched": "short"`  
    `}`  
  `]`  
`}`

---

# **10\) My recommendation (what I would do)**

### **If you’re still mostly in public/non-PHI content (PubMed, manufacturer, YouTube, podcasts, PDFs):**

**Build Supabase-first** for speed, and design a clean **export-to-S3 promotion path** (your doc’s exact recommendation).

Openevidence Clone (4)

### **If you want to be production/HIPAA-aligned sooner (or expect PHI to enter quickly):**

**Build AWS-first** for the retrieval/knowledge layer and keep Supabase as the UI/auth/dev layer—or use Supabase only with BAA \+ HIPAA add-on.

---

If you tell me which direction you’re choosing for V1 (**Supabase-first** vs **AWS-first**), I’ll produce a concrete “build sheet” with:

* exact table DDL (multi-source schema)  
* retrieval SQL (pgvector \+ FTS hybrid)  
* API endpoints (`/search`, `/answer`, `/feedback`) aligned to your OE-mini doc  
   Openevidence Clone (4)  
* a weight profile JSON you can plug in immediately  
* the UI response payload shape (citations \+ separate YouTube moments)

## **1\) Goal and product behavior**

### **Primary goal (V1)**

Build a familiar A360 chat interface where a user can:

* Select **which sources** to query (PubMed, Manufacturer PDFs, Podcasts, YouTube) and run one question across them.  
* Receive an answer that is **grounded and citation-backed**, with **clickable links** for every citation.  
   Openevidence Clone (4)

   Openevidence Clone (4)  
* See **suggested next questions** tailored to the query and retrieved evidence.  
   Openevidence Clone (4)

### **“OpenEvidence-lite” behavior requirements**

* Answers must cite top references with **in-text links** (e.g., PMID/DOI) and show confidence (even if confidence is just “High/Med/Low” in V1).  
   Openevidence Clone (4)  
* Provide transparency UX (V2 direction): “why this is ranked” signals and quality badges (e.g., RCT, Systematic Review, Retraction flagged).  
   Openevidence Clone (4)

## **2\) Data domains and separation rules**

### **Sources (initial)**

* **PubMed**: metadata \+ abstracts initially; expand to full-text where licensed/available.  
* **Manufacturer**: PDFs (IFUs, clinical guides), and optionally webpages.  
* **YouTube**: official channels \+ timed captions/transcripts where available.  
* **Podcasts**: episode metadata \+ transcript (where available / transcribed).

### **Separation rule (V1 UX)**

* The answer can cite any selected sources, but **YouTube must render as its own section**:  
  * “YouTube Moments” panel: excerpt \+ timestamp deep-link \+ video metadata  
  * Keep it in the same response, but visually separated from paper/PDF citations.  
     Untitled document (19)

## **3\) Storage and vectorization requirements (Supabase-first, AWS-mirroring)**

### **Supabase \= R\&D intelligence layer (V1 build location)**

Use Supabase Postgres \+ **pgvector** as the working store to:

* Ingest and normalize raw items (articles, PDFs, episodes, videos).  
* Produce canonical chunk tables \+ embedding tables.  
* Support quick iteration on chunking, metadata filters, and retrieval behavior.  
   Openevidence Clone (4)

### **AWS \= mirror \+ future production home**

Mirror Supabase outputs to AWS so “promotion” becomes a **data/config flip**, not a rewrite:

* Export structured records \+ chunks \+ embeddings to **S3** (partitioned, versioned).  
* Optionally index into **Bedrock Knowledge Base** (fastest POC) or **OpenSearch** (more control later).  
   Openevidence Clone (4)

   Openevidence Clone (4)

   2

**Hard requirement:** maintain **schema parity** between Supabase Postgres and AWS Postgres/Aurora/RDS so migration is straightforward.

Openevidence Clone (4)

Openevidence Clone (4)

## **4\) Canonical object model (applies to every source)**

Every item (PubMed article, PDF, podcast episode, YouTube segment) must map to:

### **A) `sources` (the “thing”)**

Minimum fields:

* `source_id` (uuid), `source_type` (pubmed | manufacturer\_pdf | podcast | youtube)  
* `title`, `publisher`/`channel`, `published_at`  
* `canonical_url` (must be present for linkable citations)  
   Openevidence Clone (4)

### **B) `chunks` (what gets retrieved)**

Minimum fields:

* `chunk_id`, `source_id`, `chunk_text`  
* `locators` (so citations can link precisely)  
  * Papers/PDFs: page/section or offset range  
  * YouTube: `video_id`, `start_sec`, `end_sec` (required for deterministic deep links)  
     Untitled document (19)  
* `metadata_filters`: year, topic tags, product/device tags, language, etc.

### **C) `embeddings`**

* `chunk_id`, `embedding_vector`, `embedding_model`, `dim`, `created_at`  
* Must support deterministic re-embedding when you change chunking or model.  
   Untitled document (19)

## **5\) YouTube-specific ingestion and “searchable moments” requirements**

YouTube must be stored as **timeline-indexed segments** so results can jump to the exact second.

Untitled document (19)

Minimum required fields per segment:

* `video_id`, `start_sec`, `end_sec`, `text`, `confidence`, plus video metadata (title, channel, publish date).  
   Untitled document (19)

  Deep link requirement:  
* Every excerpt must be linkable as `watch?v=<video_id>&t=<start_sec>s`.  
   Untitled document (19)

AWS mirror pattern for YouTube (recommended):

* Store raw \+ normalized content in S3 with a clean layout so embeddings come later.  
   Untitled document (19)

## **6\) Retrieval \+ answer-generation behavior (core chat contract)**

### **Source selection**

* UI must allow the user to select: PubMed, Manufacturer PDFs, Podcasts, YouTube.  
* Retrieval must apply filters per source and return a unified answer **plus** separated YouTube moments.

### **Response requirements (V1)**

* Every “key claim” must be supported by one or more citations.  
* Each citation must include:  
  * a stable ID  
  * a **clickable URL** (PMID/DOI link for PubMed; file/view link for PDFs; YouTube timestamp link for videos).  
     Openevidence Clone (4)

     Openevidence Clone (4)

### **Suggested questions (V1)**

* Generate 2–7 follow-ups based on:  
  * what evidence was retrieved  
  * what evidence is missing / weak  
  * common “next clinical questions” in aesthetics.  
     Openevidence Clone (4)

     Openevidence Clone (4)

## **7\) “Agents aligned to search types” requirement**

Design the system so different question classes route to different agent behaviors (now or later):

* **Evidence Summarizer Agent**: answer \+ citations (default)  
* **Study Quality / Ranking Agent** (V2): explains ranking factors, assigns badges, flags retractions/off-label context.  
   Openevidence Clone (4)

   Openevidence Clone (4)  
* **YouTube Moment Finder Agent**: returns timestamped excerpts \+ deep links (separate section).  
   Untitled document (19)  
* **LPOA PDF Agent**: optimized chunking for long PDFs \+ page-precise citations (vectorized PDFs are explicitly in scope).  
   Openevidence Clone (4)

## **8\) HIPAA/compliance approach (practical constraint for build vs future)**

You said you **need HIPAA compliance** but want to build quickly in Supabase:

* **V1 recommendation:** treat Supabase as the **non-PHI R\&D sandbox**, and keep anything that could be PHI (or any future patient-linked workflows) in AWS-only boundaries.  
* Build the “promotion path” so the same dataset shape can be moved into AWS services that are typically used for HIPAA-ready deployments (S3 \+ retrieval \+ controlled access).  
   Openevidence Clone (4)

*(If you intend to store PHI in Supabase, you’ll need a formal compliance decision/BAA posture; don’t assume it.)*

## **9\) Migration and scaling requirements (Supabase → AWS)**

The system must support:

* Export Supabase corpus → S3 (structured \+ vectorized).  
   Openevidence Clone (4)  
* Index into either:  
  * **Bedrock Knowledge Base** for fastest “OpenEvidence-lite” POC, or  
  * **OpenSearch** for hybrid retrieval and scoring control.  
     2

     Openevidence Clone (4)  
* Cognito-gated access and logging/cost tracking in the AWS-hosted version (so you can benchmark latency/cost/query).  
   Openevidence Clone (4)

## **10\) Definition of Done (V1)**

V1 is “done” when:

1. User can select sources → ask a question → receive an answer with **working citation links** (PubMed/DOI/PDF links) plus suggested follow-ups.  
    Openevidence Clone (4)

    Openevidence Clone (4)  
2. YouTube results show **moment-level excerpts** with deterministic timestamp links and required metadata, rendered in a separate section.  
    Untitled document (19)  
3. Supabase tables can be exported to S3 in a versioned way, preserving schema parity for eventual AWS cutover.  
    Openevidence Clone (4)

    Openevidence Clone (4)

If you want, I can turn this into:

* a **concrete Supabase schema** (tables \+ indexes \+ pgvector strategy),  
* an **API contract** for `/search` and `/answer`,  
* and the **V1 Bedrock prompt set** that enforces citation/link formatting and the YouTube-separated section.  
   Openevidence Clone (4)

# Scenarios

## **Summary: A360 Clinical Intelligence Engine (OpenEvidence for Aesthetics)**

### **1\. Overview**

This project aims to build a **general clinical intelligence base** that uses A360’s structured consultation data to:

* Anticipate and generate **the most likely clinical or informational questions** a doctor will have post-treatment.

* Retrieve and rank **evidence-based answers** (PubMed, guidelines, consensus papers) using a **weighted scoring model**.

* Continuously **learn from usage behavior** to refine what questions and answers are most valuable in real-world practice.

The system acts as the brain behind A360’s future AI agents — enabling use cases in **clinical follow-up**, **patient safety**, **treatment optimization**, and **marketing personalization**.

---

## **🔄 Data Flow: How It Works**

1. **Input Layer – Consultation Data Extraction**

   * A360 parses the consultation transcript to extract:

     * **Treatment context:** (Botox, IPL, explant surgery, sclerotherapy)

     * **Conditions/concerns:** (rhytids, hyperpigmentation, capsular contracture, venous reflux)

     * **Patient variables:** (skin type, prior procedures, medications, age, goals)

     * **Intents/interests:** (downtime, safety, combination treatments, follow-up care)

These values populate a structured object:

 `{`  
  `"treatment_type": "Laser resurfacing",`  
  `"concern": "Post-inflammatory hyperpigmentation",`  
  `"patient_skin_type": "Fitzpatrick IV",`  
  `"adjacent_treatments": ["Hydroquinone", "IPL"],`  
  `"goals": ["Reduce pigmentation", "Smooth texture"]`  
`}`

*   
2. **Question Generation Layer**

   * A transformer or ruleset model predicts **the top N questions** a clinician is likely to have given the context.

     * These are generated from embeddings of historical queries, patient attributes, and treatment metadata.

     * Each question is tagged with an **intent class** (Safety, Efficacy, Post-care, Combination, Regulatory, Marketing).

3. **Evidence Retrieval & Weighting Layer**

   * System queries your PubMed-derived knowledge base using hybrid retrieval (BM25 \+ pgvector).

   * Each article chunk is scored by:

     * **Relevance to context**

     * **Recency**

     * **Study design quality**

     * **Geographic and regulatory fit (FDA relevance)**

     * **Aesthetic-domain fit (device, toxin, filler, concern, skin type)**

     * **Engagement feedback (from user signals)**

   * Final ranked results produce a **structured evidence response**.

4. **Learning Loop**

   * The doctor’s selections, clicks, and dwell time update model weights for future ranking and question prediction.

---

## **⚙️ Implementation of Weighting System**

### **A. Weighting Model Design**

Weights combine static evidence hierarchy \+ dynamic context weighting:

| Factor | Description | Default Weight | Adjusts By |
| ----- | ----- | ----- | ----- |
| Similarity | Query–article embedding cosine | 0.35 | User engagement |
| Study Design | SR \> RCT \> Cohort \> Case | 0.25 | Consensus frequency |
| Recency | Time decay (5–7 years typical) | 0.10 | Specialty |
| Geographic/Regulatory Fit | US/FDA relevance | 0.10 | Practice region |
| Domain Fit | Skin type, device, or product match | 0.10 | Topic coverage |
| Journal Tier | Impact or SJR | 0.05 | Bias risk |
| User Feedback | Clicks, saves, thumbs | 0.05 | Learned per user/practice |

Total score normalized 0–1 → drives ranking & confidence scoring in UI.

### **B. Testing & Evaluation**

1. **Gold Standard Validation:**

   * Have clinicians rate top 5 retrieved papers per query for relevance & trustworthiness.

   * Compute *Precision@5*, *NDCG*, *MRR*.

2. **Behavioral Validation:**

   * Track which articles users click, dwell on, or cite in notes.

   * Retrain weight profiles nightly.

3. **A/B Weight Profiles:**

   * Test different weighting schemes (“clinical evidence–heavy” vs “recency–heavy”) to compare engagement.

4. **Bias/Aging Analysis:**

   * Monthly audits for skew (e.g., outdated device data dominating).

5. **Feedback Audits:**

   * If multiple doctors flag the same article as irrelevant, auto-demote across the network.

---

## **🧩 Four Real-World Scenarios (Post-Treatment Use Cases)**

Each scenario shows:  
 1️⃣ How we determine *likely questions*,  
 2️⃣ Example suggested questions,  
 3️⃣ How the weighting model ranks evidence to form the response.

---

### **Scenario 1: Injectables – Post-Treatment Swelling with Botulinum Toxin**

**Consultation data:**

* Concern: forehead lines

* Treatment: Botox, 20 units

* Patient: first-time treatment, mild swelling 24h post-injection

**Likely doctor questions (auto-generated intents):**

1. What is the expected duration of post-Botox swelling?

2. When should I suspect an allergic or immune-mediated reaction?

3. Can Botox diffuse into nearby muscles and cause eyelid ptosis?

4. Are there safe adjunctive treatments (ice, antihistamines, NSAIDs)?

5. How often do true hypersensitivity cases occur?

**How the system found them:**

* Tags extracted: *Botulinum toxin*, *swelling*, *post-injection*, *allergic reaction*.

* Mapped to Safety \+ Post-care intent clusters from historical usage patterns.

**Response weighting:**

* Boost **RCTs** & **systematic reviews** on toxin safety (w\_design=0.3).

* Prioritize **recent reviews (\<5 years)** for recency (w\_recency=0.1).

* Filter to **FDA-approved onabotulinumtoxinA** (w\_reg=0.1).

* Penalize **case reports** unless relevance score \>0.8.

**Result Output:**

* 3 cited studies summarized (short bullet abstracts)

* “Why shown” note (e.g., “2021 systematic review on local reactions to onabotulinumtoxinA, U.S. data, n=1254”)

* Confidence score: 0.82

---

### **Scenario 2: Laser – Post-Resurfacing Hyperpigmentation (Fitzpatrick IV)**

**Consultation data:**

* Concern: acne scarring

* Treatment: fractional CO₂ laser

* Skin type: IV

* Adjunct: hydroquinone 4%

**Likely questions:**

1. What’s the rate of PIH after CO₂ laser in skin types IV–VI?

2. Are pre-treatment hydroquinone or retinoids protective?

3. When can pigment-corrective agents safely be resumed?

4. Are non-ablative fractional lasers safer in this skin type?

5. What are recommended post-laser sun protection protocols?

**Determination method:**

* System clusters *laser resurfacing \+ darker skin type \+ pigment concern* and retrieves historical doctor queries with \>0.6 similarity.

* Identified top intent class: *Safety & Efficacy*.

**Response weighting:**

* Boost for **skin type–specific trials** (w\_domain=0.12)

* Recency half-life \= 3 years (fast-moving device tech)

* Boost U.S. \+ Asian multicenter studies equally (diversity in Fitzpatrick data)

* Weight design tier but don’t overly penalize small-n cohorts (limited dataset domain)

**Output Example:**

“A 2022 multicenter RCT (n=118, skin types IV–V) showed 6.3% PIH incidence with fractional CO₂ at 15 mJ. Pretreatment hydroquinone reduced risk by 40%.”  
 Confidence: 0.88

---

### **Scenario 3: Plastic Surgery – Breast Explant and Systemic Symptoms**

**Consultation data:**

* Concern: chronic fatigue, joint pain, prior silicone implants

* Treatment: explant surgery

* Intent: discuss “breast implant illness” (BII)

**Likely questions:**

1. What evidence links silicone implants to systemic symptoms?

2. Do explants improve fatigue or pain symptom scores?

3. What complications are common post-explant?

4. Are there imaging findings predictive of improvement?

5. What’s the average recovery timeline after explant with capsulectomy?

**Determination method:**

* A360 extracts *symptom clusters* (“fatigue, arthralgia”) and *treatment intent* (“explant”), cross-references prior similar consults.

* Identified top concern: *Causality and Outcomes.*

**Response weighting:**

* Boost **systematic reviews/meta-analyses** (conflicting data topic)

* Demote pre-2015 studies (outdated implant formulations)

* Emphasize **U.S. FDA \+ registry studies**

* Use user feedback weighting (clinicians often bookmark certain consensus statements → w\_history=0.07)

**Output Example:**

“A 2023 systematic review (n=3,126) found symptom improvement post-explant in 76% of patients, but no consistent biomarker association. FDA registry data (2021) supports partial symptomatic relief.”  
 Confidence: 0.91

---

### **Scenario 4: Venous Care – Endovenous Ablation Follow-up**

**Consultation data:**

* Treatment: endovenous laser ablation (EVLA) for GSV reflux

* Concern: mild bruising, swelling 3 days post-procedure

* Co-morbidity: previous DVT

**Likely questions:**

1. What’s the incidence and expected duration of post-EVLA bruising?

2. When should I consider ultrasound to rule out DVT recurrence?

3. Are compression stockings necessary beyond 1 week?

4. What evidence supports early ambulation vs rest?

5. Does anticoagulation impact post-procedural outcomes?

**Determination method:**

* Contextual tags: *EVLA, bruising, DVT history, post-care*

* Intent cluster: *Complications \+ Recovery Guidance.*

**Response weighting:**

* Boost **U.S./European guidelines (SVS, NICE)** (w\_guideline=0.15)

* Moderate boost to **RCTs** on compression vs none (w\_design=0.25)

* Demote small case series

* Use **recency 5 years** for clinical relevance

**Output Example:**

“2021 SVS guideline recommends compression 3–7 days post-EVLA; no DVT prophylaxis unless prior history. Meta-analysis (n=542) shows ambulation within 24h lowers thrombotic events by 32%.”  
 Confidence: 0.95

---

## **🧪 Testing, Feedback & Iteration**

| Phase | Goal | Method |
| ----- | ----- | ----- |
| Alpha (Internal) | Validate question generation relevance | Compare top 10 questions with manual expert input |
| Beta (Clinician Trials) | Measure precision & trust | Ask clinicians to rate suggested answers (0–5 relevance) |
| Learning Loop | Tune question priors & weights | Log clicks, thumbs, and new question creation |
| Continuous QA | Auto-detect outdated answers | Re-run recency filters & audit retraction flags weekly |

---

## **🚀 Deliverables**

1. **Core pipeline** (consultation → intents → questions → weighted retrieval)

2. **Weighting system** (configurable JSON, version-controlled)

3. **Evaluation dashboard** (precision, recall, engagement)

4. **Admin panel** (adjust weights, view audit logs)

5. **Sample datasets** for the four specialties to train question generation.

# Weighting System

# **Objectives**

* Deliver ranked, citation-rich answers for aesthetics (derm, plastics, vein) using your PubMed corpus (abstracts \+ 19k full-texts).

* Make ranking transparent and tunable (recency, study design, geography, device/regulatory context, practice preferences).

* Continuously improve via implicit/explicit user feedback signals (“Google-like” learning loop).

* Ship fast inside your current stack (Aurora Postgres \+ pgvector; APIs/UI via existing A360 app surfaces).

# **Core Ranking Model (requirements)**

1. **Hybrid retrieval**

* BM25 (title/abstract/full-text) \+ pgvector dense retrieval (title \+ abstract \+ chunks of full text).

* Chunk full-text at \~1k–2k tokens with overlap; store `chunk_id`, `article_id`, `embedding`, `bm25_fields`.

* Merge candidates with reciprocal rank fusion; dedupe by article\_id.

2. **Evidence score (per article)**  
    FinalScore \= w\_sim·Similarity \+ w\_bm25·BM25 \+ w\_design·StudyDesign \+ w\_recency·TimeDecay \+ w\_geo·GeoFit \+ w\_reg·RegulatoryFit \+ w\_size·SampleSize \+ w\_guideline·Guideline/Consensus \+ w\_journal·VenueReputation \+ w\_quality·QualityFlags \+ w\_domain·AestheticsFit \+ w\_history·UserLearn

* **Similarity**: cosine to query embedding (mean of chunk tops).

* **StudyDesign** (evidence ladder, configurable):  
   Meta-analysis/Systematic Review \> RCT \> Prospective cohort \> Case-control \> Case series \> Case report \> Opinion.

* **TimeDecay**: half-life parameter per topic (e.g., 6–8y for toxins/fillers; 3–4y for devices/energy). Disable decay for classic, still-valid foundational trials.

* **GeoFit**: boost U.S. studies for devices/procedures where FDA status matters; allow per-topic overrides to boost non-U.S. when U.S. data is sparse or device is CE-only.

* **RegulatoryFit**: boost trials involving FDA-cleared indications when question asks about U.S. clinical use; add neutral/penalty if off-label unless user opts in to off-label evidence.

* **SampleSize**: monotonic boost (log(N)); small n gets neutral/penalty unless high design tier.

* **Guideline/Consensus**: boost if cited by professional society statements or high-quality consensus docs (tagged in metadata).

* **VenueReputation**: journal tier list (customizable) or surrogate (SNIP/SJR cached lookup); cap to avoid over-domination.

* **QualityFlags**: penalties: retractions, expressions of concern, high risk of bias, predatory venues.

* **AestheticsFit**: boost if MeSH/keywords match aesthetics concerns (melasma, rhytids, lipolysis, varicosities), products (onabotulinumtoxinA, hyaluronic acid fillers), devices (IPL, 755/810/1064 nm, RF microneedling), or surgical techniques.

* **UserLearn**: bandit-style uplift from live signals (see Feedback Loop).

All weights **versioned** and explainable (stored in `ranking_weight_profiles` with provenance, effective dates). This fits your A360 “library \+ override” approach.

# **Data model (Aurora \+ pgvector)**

**Tables (minimum)**

* `articles(article_id, pmid, doi, title, year, journal_id, country, language, has_fulltext, is_retracted, regulatory_tags[], mesh_terms[], concerns[], devices[], products[], study_design, sample_size, guideline_links[], quality_flags[], jsonb_raw)`

* `article_chunks(chunk_id, article_id, chunk_no, text, embedding vector)`

* `journals(journal_id, title, tier, sjr, snip, url)`

* `ranking_weight_profiles(profile_id, name, created_by, created_at, weights jsonb, notes)`

* `queries(query_id, user_id, practice_id, ts, query_text, parsed_intent, concern_tags[])`

* `result_sets(result_id, query_id, profile_id, generated_at, topk jsonb, debug_explain jsonb)` *(store the per-factor subscores for transparency)*

* **Feedback/usage (for learning)**

  * `clicks(result_id, rank, article_id, ts)`

  * `dwell(result_id, article_id, ms)`

  * `saves(result_id, article_id, ts)`

  * `thumbs(result_id, article_id, ts, up BOOLEAN)`

  * `copy_events(result_id, article_id, ts, section ENUM('summary','quote','bib'))`

  * `report_flags(result_id, article_id, reason, ts)`

* **Governance**

  * `audit_ranking(profile_id, changed_by, changed_at, diff jsonb)`

  * `exclusions(article_id, reason, until_date)`

# **Ingestion & enrichment (requirements)**

* Parse PubMed XML \+ full-text PDFs/PMC XML.

* Extract: study design/type, n, arms, endpoints, device/product names, geography, funding/conflict disclosures, regulatory mentions (FDA/CE).

* MeSH \+ custom taxonomy for aesthetics concerns, products, devices, procedures (align with A360 Global/Practice Library).

* Detect retractions/expressions of concern; maintain a daily delta job.

* Create 1k–2k token chunks for pgvector; store embeddings.

* Build a **journal tier map** and **guideline index** (store society, year, scope).

# **Result page & transparency (UX requirements)**

* Show **Why this is ranked**: top 3 factors per article (e.g., “Systematic review (design \+0.35), published 2023 (recency \+0.18), matches ‘RF microneedling’ device (domain \+0.12)”).

* Badges: “Systematic Review”, “RCT”, “U.S. study”, “Off-label context”, “Retraction flagged”.

* Toggle **“U.S.-centric”** vs **“Global”** weighting profiles.

* Per-practice profile switcher (practice can use global defaults or a custom profile with saved weights). Mirrors your override pattern.

# **Feedback → Learning loop (requirements)**

Signals to capture and feed back into `w_history`:

* **Implicit**: clicks@rank, dwell time, scroll depth, saves/bookmarks, copy events.

* **Explicit**: thumbs up/down on an article as supporting evidence; “relevant/irrelevant to my question”, “too old/outdated”, “non-U.S. not applicable”.

* **Session outcome**: did user accept an auto-generated answer with these citations?  
   Learning mechanics:

* Nightly **pairwise rank optimization** (e.g., optimize a small delta to per-factor weights using clicks@rank and dwell).

* Topic-aware learning: maintain per-concern/per-device deltas (e.g., for melasma, recency half-life shorter; for toxins, longer).

* **Safety rails**: cap how much online learning can shift any single weight per week; changes require profile version bump \+ audit trail.

# **Answer generation (summaries) (requirements)**

* Answers must cite top-k articles with in-text links (pmid/doi) and show per-citation confidence. If **no high-quality, recent U.S. data**, explicitly state evidence gaps and surface best available global data with caveats.

* Summaries must respect your platform’s compliance boundaries and consent/logging patterns already used for outbound content.

# **Governance & compliance (requirements)**

* **Profiles**: Global default \+ Practice overrides; immutable audit logs on each change (who/when/what).

* **Retractions**: immediate demotion; visible badge and optional exclusion.

* **Off-label**: require user toggle to include; otherwise demote/annotate.

* **PII**: ensure none is stored in evidence metadata; align with existing A360 compliance/acknowledgment flows and audit logging patterns.

# **Metrics & dashboards (requirements)**

* Retrieval: recall@k, MRR, time-to-first-result.

* Engagement: CTR by rank, avg dwell, saves per query, thumbs ratio.

* Quality: proportion of top-3 that are SR/RCT; median year; U.S. vs global mix; retraction share.

* Learning: weekly weight deltas by concern/device; A/B profile comparisons.

* Safety: off-label exposure rate; flagged content rate.

* Ops: ingestion freshness; full-text coverage %; embedding lag.  
   (Use the existing A360 sandbox/test ethos and reporting cadence to iterate quickly.)

# **APIs (minimum)**

* `POST /search`: {query, concern\_tags?, device\_tags?, profile\_id?, k} → ranked articles \+ per-factor explains.

* `POST /answer`: {query, profile\_id?, k\_refs?} → draft answer \+ citations \+ trace.

* `POST /feedback`: clicks, dwell, thumbs, saves, flags.

* `GET /profiles`, `POST /profiles/:id/tune` (admin-only; writes an audited version).  
   Anchor these in your existing web app / services and data lake conventions.

# **Weighting policy defaults (starter values)**

* StudyDesign: {SR: \+0.40, RCT: \+0.32, Cohort: \+0.22, Case-control: \+0.18, Case series: \+0.10, Case report: \+0.05, Opinion: 0}

* Recency half-life (years): {energy-based devices: 4, pigments/melasma: 5, injectables: 7, surgical techniques: 8}

* GeoFit: {US: \+0.12 when regulatory relevance detected; Non-US: \+0.06 unless regulatory mismatch; Off-label context: −0.08 unless explicitly allowed}

* RegulatoryFit: {FDA indicated: \+0.10; CE-only for U.S. usage question: −0.06}

* Journal tier: {T1: \+0.10, T2: \+0.06, T3: \+0.03, Unrated/predatory: −0.20}

* QualityFlags: {Retraction: −1.00, EoC: −0.50, High RoB: −0.15}

* SampleSize: `+0.02 * log1p(n)`  
   (These are just seed defaults; you’ll tune with live signals.)

# **Implementation plan (fast path)**

1. **Ingest & index**: finalize full-text parsing; create `articles`, `article_chunks`, embeddings in pgvector. (2–3 days)

2. **Ranking service**: implement scoring function \+ profile storage \+ explain trace. (2–4 days)

3. **Feedback plumbing**: capture clicks/dwell/saves/thumbs from A360 UI. (1–2 days)

4. **Admin console**: create weight profile editor \+ audit log. (1–2 days)

5. **Dashboards**: daily KPIs \+ weekly learning diff report (align with your existing QA/reporting cadence from transcription initiative). (1–2 days)

6. **Policy rails**: retraction service \+ off-label toggle \+ U.S./Global switch. (1 day)

7. **A/B**: route % of traffic to alternate profiles; compare engagement/quality.

# **Why this fits A360 now**

* It reuses your Aurora/pgvector and microservice patterns; deploys alongside current web app and libraries/override system.

* It matches the sandbox \+ rapid iteration culture you’ve already documented—ship in days, improve weekly with feedback.


# Tab 1

#  **Project Overview**

**Project Title:**  
 A360 “OpenEvidence-lite” Prototype (AWS-based RAG System)

**Goal:**  
 Build a lightweight AWS-hosted version of *OpenEvidence* that uses A360’s internal medical knowledgebase (PubMed, manufacturer data, structured metadata) to generate **cited, contextual answers** and **suggested follow-up questions**, validating functionality and cost-efficiency.

**Core Principle:**

* **Supabase \= Preprocessing / R\&D**

* **AWS \= Retrieval / Generation / Hosting**

This architecture tests cost, performance, and model accuracy before scaling to production-grade compliance.

---

## **🧠 1\. Business Requirements**

### **1.1 Objectives**

1. **Demonstrate AI-driven retrieval and citation generation** across A360’s medical knowledgebase.

2. **Validate AWS RAG infrastructure** (S3 \+ OpenSearch or Bedrock KB \+ Bedrock Model) for scalability and inference quality.

3. **Measure compute and inference cost** to establish a cost modeling framework for future production tools.

4. **Benchmark workflow efficiency** when preprocessing is done in Supabase vs AWS.

5. **Create a reference architecture** for future, non-PHI AI assistants and medical data pipelines.

---

### **1.2 Business Drivers**

| Driver | Description |
| ----- | ----- |
| **Speed to Insight** | Reduce turnaround from dataset ingestion → searchable AI system. |
| **Cost Awareness** | Quantify total cost per 1k queries, including storage, compute, and inference. |
| **Scalability** | Ensure system can scale to larger datasets (e.g., PubMed-scale). |
| **Transparency** | Every response must include **citations** and optionally **suggested questions**. |
| **Interoperability** | Design structure to be easily migrated into A360’s production AWS environment. |

---

## **⚙️ 2\. Technical Requirements**

### **2.1 Architecture Overview**

**Workflow Summary:**

1. **Supabase (Sandbox Layer)**

   * Ingest raw data (PubMed metadata, manufacturer PDFs, clinical text).

   * Clean, normalize, and link relational data (article → product → topic → outcome).

   * Generate embeddings using pgvector.

   * Export structured \+ vectorized data to S3 for AWS ingestion.

2. **AWS (Production Sandbox Layer)**

   * Store Supabase outputs in **S3**.

   * Index embeddings in **OpenSearch** or **Bedrock Knowledge Base** for retrieval.

   * Use **AWS Bedrock (Claude or Titan)** for retrieval-augmented generation (RAG).

   * Implement minimal API layer (API Gateway \+ Lambda).

   * Secure access via **Cognito** (for team-only testing).

   * Log inference, request counts, and token usage with **CloudWatch**.

3. **Application Layer**

   * Simple web interface (Streamlit or React on Vercel).

   * Input field for natural language queries.

   * Display citations and relevant metadata.

   * Show optional “Suggested Questions” generated from embeddings.

---

### **2.2 Technical Stack**

| Component | Tool / Service | Purpose |
| ----- | ----- | ----- |
| **Preprocessing / Vectorization** | Supabase (Postgres \+ pgvector) | Ingest, clean, and structure medical data |
| **Data Transfer** | AWS SDK / CLI | Export Supabase → S3 |
| **Storage** | Amazon S3 | Store structured JSON \+ PDFs |
| **Vector Index / Search** | OpenSearch **or** Bedrock Knowledge Base | Retrieve top-k relevant documents |
| **Model / Generation** | AWS Bedrock (Claude 3 Sonnet or Titan) | Summarize \+ generate citations |
| **API Layer** | API Gateway \+ Lambda (Python) | Serve query and response endpoints |
| **Authentication** | Cognito | Secure access (non-PHI but controlled) |
| **Frontend** | Streamlit / React (Vercel) | User query UI |
| **Logging / Monitoring** | CloudWatch | Cost, latency, and token tracking |

---

### **2.3 Functional Requirements**

| Area | Requirement |
| ----- | ----- |
| **Retrieval** | Must retrieve semantically similar text from S3-indexed content (PubMed abstracts, manufacturer docs). |
| **Citations** | Model output must include document references and URLs. |
| **Follow-Up Questions** | Optional second-pass model generates 2–3 “suggested next questions.” |
| **Latency** | \<5 seconds per query for top-10 retrieval \+ generation. |
| **Cost Tracking** | Log tokens and inference requests for cost benchmarking. |
| **Security** | Must not expose PHI; all data must be public or internal manufacturer data. |

---

### **2.4 Non-Functional Requirements**

* **Scalability:** Should handle up to 100k vector records and 10 concurrent users.

* **Reliability:** ≥ 99% uptime target for testing period.

* **Extensibility:** Easily plug in additional datasets or switch models (e.g., Bedrock → OpenAI).

* **Maintainability:** Use IaC (AWS CDK / Serverless Framework) for reproducible deployments.

* **Cost Transparency:** Output cost-per-query and total token spend metrics.

---

## **🔍 3\. OpenSearch vs Bedrock Knowledge Base**

| Factor | OpenSearch (Vector Index) | Bedrock Knowledge Base |
| ----- | ----- | ----- |
| **Control / Customization** | Full control over vector schema, tuning, and ranking. | Managed RAG; abstracts vector setup. |
| **Setup Time** | Moderate – must configure domains, security, and index. | Fast – fully managed and integrates with Bedrock models directly. |
| **Scalability** | High, but requires cluster tuning. | Auto-scales; usage-based billing. |
| **Cost Structure** | Pay per instance-hour \+ storage; predictable. | Pay per query; depends on Bedrock model usage. |
| **Complexity** | Requires knowledge of Elasticsearch queries and embeddings. | Minimal – managed by Bedrock. |
| **Integration** | Flexible (any LLM or external app). | Tight coupling with Bedrock models only. |
| **Ideal Use Case** | Custom RAG logic, mixed model integration, fine-tuned retrieval. | Simple RAG workflows, fast POC validation. |

**Recommendation for POC:**  
 ✅ **Start with Bedrock Knowledge Base** — it’s faster to implement, integrates natively with Bedrock models, and minimizes setup complexity.  
 If you need **custom scoring or hybrid retrieval**, migrate to **OpenSearch** later for finer control.

---

## **🧩 4\. Implementation Roadmap (Simplified)**

| Phase | Task | Deliverable |
| ----- | ----- | ----- |
| **Phase 1 – Data Prep (Supabase)** | Ingest PubMed & manufacturer data, vectorize, export to S3 | Cleaned \+ vectorized dataset |
| **Phase 2 – AWS Knowledge Base Setup** | Index in Bedrock KB or OpenSearch | Searchable RAG-ready corpus |
| **Phase 3 – Lambda \+ API Gateway** | Create query endpoint connected to RAG model | Working backend |
| **Phase 4 – Frontend (Streamlit / React)** | Minimal query UI with citations | Functional demo |
| **Phase 5 – Benchmarking** | Measure latency, accuracy, cost per query | Cost \+ performance report |
| **Phase 6 – Optional Feature** | Add “Suggested Questions” generator | Context-aware enhancement |

---

## **📊 5\. Deliverables**

1. **Working prototype** deployed in AWS demonstrating citation-backed retrieval.

2. **Cost analysis report** comparing Bedrock vs Supabase preprocessing.

3. **Architecture diagram \+ IaC template** for replication.

4. **Benchmark summary** (avg response time, cost/query, accuracy).

5. **Recommendations** for scaling to production-grade version.

---

## **✅ Summary Recommendation**

For this POC:

* Use **Supabase → S3 → Bedrock Knowledge Base → Bedrock Model** flow.

* Keep schema parity between Supabase Postgres and AWS RDS for future production migration.

* Measure costs per 1k queries to validate scaling strategy.

* Use **Streamlit or Vercel-hosted React** for fast, lightweight front-end testing.

# Tab 4

Here’s a crisp, technical “do-this-next” plan to (1) turn your Supabase corpus into a working OpenEvidence-style playground, (2) create good questions, (3) evaluate outputs \+ citations side-by-side with OpenEvidence, and (4) be ready to promote the best settings to AWS later.

# **0\) Guiding constraints (so we stay fast)**

* **Do everything in Supabase first** (schema, chunking, embeddings, eval UI). Treat it as the prompt/RAG **sandbox** that promotes to AWS later; that’s already how your team planned to iterate (prompt testing & RAG sandbox → promotion workflow).

* Keep the app tiny: a single React UI with a “Question → Answer \+ Citations \+ Follow-ups” panel and built-in A/B compare; your stack already uses React for internal tooling.

* Design it so “promote to Bedrock/AWS KB” is a data/config flip when you’re happy (no big rewrite). Your architecture and library split (global/practice \+ knowledge bases) fit this handoff.

---

# **1\) Make your Supabase “OE-mini” knowledge base**

**1.1 Tables (pgvector enabled)**

* `articles(id, pmid, title, abstract, journal, year, mesh_terms[], url, pdf_url, source, metadata jsonb, fulltext text)`

* `chunks(id, article_id, ord, text, token_count, hash, section, start_char, end_char, vector vector(1536))`

* `queries(id, user_id, question, created_at, run_config jsonb)`

* `answers(id, query_id, run_id, model, answer_md, citations jsonb, followups text[], scores jsonb, latency_ms)`

* `runs(id, query_id, pipeline_version, reranker, topk_retrieval, prompt_id, created_at)`

* `evals(id, query_id, oe_answer_md, our_answer_id, verdict, notes, metrics jsonb)`

**1.2 Ingestion & chunking**

* Normalize incoming PubMed (you already have \~30k). Chunk full text/abstracts by **semantic paragraphs** with a hard cap (e.g., \~1.2k tokens or \~800–1,000 chars), store offsets for precise citation spans.

* Compute embeddings and fill `chunks.vector`. (Use any local embedding for the POC; later swap to Bedrock Titan / Cohere on promotion.)

**1.3 Deterministic citation handles**

* For each retrieved chunk keep `(article_id, start_char, end_char, section)`. Your answer renderer can show: **Author (Year), Journal – lines/section** or **“\[PMID:xxxx\]”** and deep-link to your article view.

This mirrors the “sandbox first → promote to AWS KB later” approach in your docs.

---

# **2\) Build the minimal evaluator UI (React)**

**Panels**

* Left: **Query** (free text) \+ **Run Settings** (K, reranker on/off, model, temperature, prompt version).

* Middle: **Our Answer** with inline citation chips (hover reveals chunk, click opens source).

* Right: **OpenEvidence Answer** (paste/auto-grab) for **side-by-side** compare.

* Bottom: **Follow-up Questions** list (click to re-ask with same settings).

**Why this shape?** It supports the prompt/RAG testing flow your team described (run, compare, flag “production-ready”).

---

# **3\) Retrieval & ranking (simple but strong)**

**3.1 First pass**

* Hybrid retrieval: `semantic (vector)` \+ `BM25` union with learned weights (start with 0.7/0.3).

* Deduplicate by `article_id`, keep best-scoring chunks per article; cap to `K=15`.

**3.2 Optional re-ranker (toggleable)**

* Cross-encoder re-rank (e.g., small bi-encoder or LLM-as-judge prompt) to top-5. Store both pre- and post-scores in `runs`.

**3.3 Grounding guardrails**

* Reject hallucinated spans: only permit citations that map to retrieved chunks. If the model cites something else, mask it and add a **“needs source”** badge.

This aligns with your platform’s emphasis on RAG \+ prompt controls.

---

# **4\) Answer generation & citations**

**4.1 Prompt skeleton (system)**

* Role: “Domain evidence summarizer for aesthetic medicine.”

* Rules: *Use only provided context; never invent data; output Markdown with numbered citations referencing provided `chunk_id`s; include 3–6 follow-up questions tailored to the query & sources.*

**4.2 Tool messages**

* Pass `{question, top_chunks[{chunk_id, article meta, text, offsets}]}`.

* Ask model to produce: `answer_md`, `citations=[{chunk_id, quote_span}]`, `followups=[…]`.

**4.3 Post-processor**

* Validate every citation: referenced `chunk_id` exists **and** the quoted span text actually occurs at recorded offsets. If fail → strip the citation \+ tag as “unsupported”.

(You already have internal guidance to evaluate prompts, adapt dynamically, and strengthen KB integration—this is the concrete version.)

---

# **5\) “Follow-Up Questions” that feel like OE**

Generate from:

* **Query intent decomposition** (anatomy, intervention, outcome, population).

* **Mesh/keywords** from top articles (e.g., “frontalis”, “intramuscular vs intradermal”, “complication rates”).

* **Gap analysis**: what didn’t make it into the answer because of low evidence? Create follow-ups for those gaps.

Your sandbox plan explicitly calls out testing **practice-specific RAGs** and follow-ups before promotion; this is the generic (PubMed) variant.

---

# **6\) Create the question set (so you can measure)**

**6.1 Seed categories (balanced coverage)**

* Toxins (sites, dosing, complications, dilution, technique)

* Fillers (planes, rheology, migration, vascular events)

* Energy devices (parameters, endpoints, downtime, skin types)

* Vein care (CEAP, ablation vs sclerotherapy outcomes)

* Plastics (explant, capsular contracture, adjuncts)

**6.2 Sources for questions**

* Pull **candidate questions** from article titles/abstracts \+ MeSH fields → normalize to natural questions.

* Add **clinic-facing** variants: “What’s the reported rate of brow ptosis with frontalis injections?” (mirrors your screenshots)

* Keep an **eval split** (train/dev/test) so tuning doesn’t leak.

---

# **7\) Benchmark flow vs OpenEvidence (fast \+ fair)**

**7.1 Human-in-the-loop harness**

* For each question:

  1. Run **Our pipeline** → store `answer_md, citations, followups, latency`.

  2. Get **OpenEvidence** answer (paste or capture) → store `oe_answer_md`.

  3. **Blind compare** (A/B) with a rubric: correctness, citation sufficiency, clarity, scope, and suggested follow-ups quality (1–5 each).

  4. Capture adjudicator notes \+ where we lost (missing paper vs prompt failure).

**7.2 Automatic metrics you can compute today**

* **Grounding score**: % of sentences with at least one valid citation.

* **Citation coverage**: \#unique articles cited / answer length.

* **Red flags**: any citation to a chunk not retrieved; any numeric claim without a source.

* **Diversity**: how many journals/years represented.

* **Latency**.

This mirrors the evaluation mindset already in your internal initiatives: small, repeatable tests, tracked over time, with promotion once “production-ready.”

---

# **8\) What “good” looks like (promotion criteria)**

* ≥ **0.8 grounding score**, **0 red-flag citations**, median **≤ 6s** answer on K=10.

* In **blind A/B** vs OE on your aesthetic set, your answers **tie or win ≥ 40%** (we’re realistic: OE has more sources).

* Follow-ups judged “useful” (≥4/5) ≥ 70% cases.

When you hit this, **promote**: export Supabase vectors & metadata → **AWS Knowledge Bases \+ Bedrock**; keep your prompt and re-rank toggles identical. The technical architecture doc already assumes this hybrid dev→prod path.

# Exec Summary \- PitchBook Addendum

## **Addendum to Executive Summary: Industry Validation & Strategic Alignment (PitchBook Q1 2026\)**

### **1\) The market is moving from “AI features” to agentic workflow ownership—A360 is already built for that shift**

PitchBook’s “Clash of the Titans” frames the core divide as **AI-embedded incumbents** (copilots inside legacy suites) versus **AI-native challengers** (workflows engineered around agents that plan, use tools, read/write systems, and execute under policy). This is directly consistent with A360’s positioning as an **AI-native operating system** that treats the consult transcript as structured intelligence powering downstream workflows (documentation, treatment planning, follow-up automation, coaching, and KPIs).

**Implication for A360’s market position:**  
 As the broader SaaS market re-prices around “resolved outcomes” rather than seats, A360’s value proposition becomes clearer and easier to underwrite: it is designed to measurably improve execution at the point where aesthetics revenue is created (the consult), and to tie that to performance metrics and automation loops rather than just “note generation.”

---

### **2\) Investors are explicitly prioritizing new moats—A360’s roadmap already names them**

PitchBook argues durable value will not come from models (commoditizing), but from: **proprietary data pipelines/feedback loops**, **agentic orchestration**, **domain tuning for verifiable accuracy**, and **auditable control planes/observability**.

A360’s executive summary independently describes the same moat logic in A360-native language:

* **Structured consult intelligence** compounding across usage into a “defensible data moat” (your proprietary improvement loop).

* **Agent Exchange** as an ecosystem layer (comparable to enterprise marketplaces) for distributing agents/workflows, accelerating extensibility and partner participation.

* An explicit emphasis on enterprise-grade readiness—governed infrastructure, auditability, integrations—positioned as the real barrier vs. one-off “AI features.”

**Implication for A360’s market position:**  
 A360 is not “another scribe.” It’s aligned with the exact moat stack investors now describe as *the* way AI-native winners separate: workflow data capture → orchestration & policy → domain tuning → observability and auditability.

---

### **3\) “AI is shifting from promise to performance” is now the dominant healthcare narrative—A360 is oriented around measurable ROI**

PitchBook’s JPM Healthcare Conference takeaways emphasize that AI messaging has moved from theoretical upside to **demonstrated operational ROI**, highlighting agentic AI and ambient/clinical automation as near-term value drivers. The note also stresses there’s “no AI bubble—yet” because deployment is being justified via measurable productivity and enterprise-scale adoption.

This aligns with A360’s executive summary emphasis on:

* **Material time savings** (documentation completed at point of care).

* **Early revenue signals** (plan clarity, follow-up engagement, conversion-related KPIs).

* A KPI-first platform design that ties spend to outcomes and supports land-and-expand toward higher ARPA as dependency grows.

**Implication for A360’s market position:**  
 As healthcare buyers and investors demand proof (not prototypes), A360’s “consult → structured intelligence → measurable execution lift” positioning is directly in line with what PitchBook describes as the new bar for AI value in healthcare delivery and administration.

---

### **4\) “Integrate first, compete later” is exactly how AI-native challengers wedge into incumbent ecosystems**

PitchBook describes many AI-native/agentic solutions winning by integrating into established systems, owning a measurable workflow step, proving fast payback, and then expanding to adjacent steps. A360 explicitly articulates the same approach—layering into existing EMRs/practice systems as the “AI backbone,” without forcing system replacement, while expanding modules over time.

**Implication for A360’s market position:**  
 This framing converts A360’s GTM into a broader industry playbook: win via workflow-native intelligence in the consult, then expand into adjacent operational modules once the intelligence layer becomes indispensable.

---

### **5\) Why this matters specifically for aesthetics: A360 sits in an “under-served specialty” pocket where AI-native platforms can become the system of execution**

A360’s executive summary emphasizes that aesthetic practices are stuck adapting insurance-centric tools for a cash-pay, consult-driven business—creating structural dissatisfaction and whitespace for a purpose-built operating layer. PitchBook’s JPM note reinforces that ambient/agentic automation is reshaping provider workflows and economics in specialty and care-delivery contexts, not just in large hospital systems.

**Implication for A360’s market position:**  
 A360 is early in a vertical where incumbents are weaker, workflows are uniquely revenue-sensitive, and the “agentic \+ measurable ROI” standard can translate into fast adoption and defensibility—exactly the terrain PitchBook describes as fertile for AI-native challengers.

