# A360 System Map — Data, Playbooks, Agents, Workflows

One-page reference for thinking through agent design. Companion to `RETRIEVAL_SERVICE.md`.

**Status**: Working reference — update as decisions land
**Last Updated**: 2026-06-11

---

## 1. The Big Picture

```
                          ┌────────────────────────────────────────────┐
                          │              SHARED SERVICES               │
                          │                                            │
   DATA LAYERS ──────────►│  Context Assembler ──► Agent Runtime ──►   │──► OUTPUTS
   (§2, §3)               │  Retrieval Service     (per registry)      │    (scored, cited,
                          │  Citation Post-Processor                   │     logged)
                          │  Run / Retrieval Logging                   │
                          └────────────────────────────────────────────┘
                                           ▲
                                           │
                          PLAYBOOKS + REFERENCE DOCS (§5, §6)
                          compiled offline, loaded by task tag
```

Every agent = **job + playbook set + layer recipe + output schema** (§4).
Context is assembled by one shared service from the six layers below — never wired per-agent.

---

## 2. Data Sources (physical inventory)

| # | Store | Project / Location | Contents | Access mode |
|---|-------|--------------------|----------|-------------|
| 1 | **Agent Manager Supabase** | `aejskvmpembryunnbgrk` | Agent registry, versions, tools, runs, citations, evals; manufacturer + FDA content; practice library; reference docs; playbooks; PDFs + images (Storage) | SQL tools + doc registry |
| 2 | **CMS Supabase** | `gjqicqldjgvrwmtkliie` | Vectorized corpora: YouTube 202K chunks, PubMed 37K, Podcasts 202K, Industry 88K (~530K total); `library_vocab` (279 terms) + `library_tags` | Retrieval service (RAG) |
| 3 | **Prompt Runner Supabase** | `ksutsaiogmicgaarocba` via Railway API | Patients, transcripts, extraction runs, opportunities, prompts, eval rubrics | API tools |
| 4 | **Global Library (GL)** | per DATA_SOURCES reconciliation | Product catalog (378), facts (2.3K), guardrails (151), relationships, concerns, anatomy, taxonomies | SQL tools via taxonomy |
| 5 | **Local / unprocessed** | `C:\Projects\...` | Sales Excellence folders 01–10, Reach docs, dossiers, FDA labels, HealthVU, textbooks | Compile pipelines (§7) → stores 1–2 |

---

## 3. The Six-Layer Context Model

Every agent context is assembled from these layers. Each answers one question.

| Layer | Question | Backing source (from §2) | Retrieval mode |
|-------|----------|--------------------------|----------------|
| **L1 Task** | What is my job? | Agent registry: prompt + output schema (store 1) | Fixed per agent version |
| **L2 Procedural** | How do I do it? | Compiled playbooks (store 1) | Loaded whole, by task tag |
| **L3 Domain** | What's being discussed? | GL category + product facts, guardrails, relationships (store 4) | SQL via vocab entities; specific-over-general |
| **L4 Situational** | Who is this / what happened? | Patient, consultation extraction, opportunities (store 3) | SQL/API tools, exact |
| **L5 Practice** | Whose rules apply? | Practice library: catalog, pricing, tone, preferences (stores 1/4) | SQL; overrides L3 |
| **L6 Evidence** | What does the field/literature say? | RAG corpora (store 2) | Vector search, on demand only |

### Precedence (conflicts resolve top-down)

```
1. Compliance / guardrails        (gl_product_guardrails, do-not-claim, patient_safe)
2. Practice rules                  (their catalog, pricing, tone — L5)
3. Patient facts                   (what was actually said — L4)
4. Product-specific knowledge      (Juvederm Voluma facts — L3 specific)
5. Category-general knowledge      (filler-category knowledge — L3 general)
6. Field practice / evidence       (podcasts 0.90 authority, etc. — L6)
```

General fills gaps where specific is silent; specific overrides general.
Taxonomy chain: **practice > product > category**, keyed by `library_vocab` entities.

---

## 4. Agent Registry (draft — the real list is short)

| Agent | Job (trigger → input → output) | Playbooks (L2) | Layer recipe | Status |
|-------|-------------------------------|----------------|--------------|--------|
| **OpportunityExtractor** | Transcript lands → transcript → structured opportunities | extraction prompt set | L1+L4 | Built (Prompt Runner) |
| **SalesCoach** | Run completes → transcript + extraction → scored coaching report (9 KPIs) | all 5 skill playbooks | L1+L2+L4+L5; thin L3 | Spec complete (V2 doc) — **build first** |
| **PracticeEvaluator** | Weekly/monthly → run history → trend report | coaching rubric | L1+L2+L4(history)+L5 | Spec complete (V2 doc) |
| **EmailCampaignGenerator** | Opportunity qualifies → consultation + opportunity → 3–5 email sequence | email_campaign + objection_handling (conditional) | All six; L6 only for citable claims | Reach docs drafted |
| **TreatmentPlanGenerator** | Practitioner request → patient profile → 3-tier plan w/ citations | tcp_planning | L1+L2+L3+L5+L6 | UI designed |
| **ResearchChat** | Practitioner query → question → cited answer | none (retrieval rules in prompt) | L1+L6; L3 as query filters | Spec'd (RETRIEVAL_SERVICE.md) |
| **CampaignManager** (maybe) | Campaign lifecycle → status events → next actions / GHL sync | email_campaign | L1+L4+L5 | Decide if separate from generator |

Rule of thumb: new entry only if the **job** differs — not the knowledge loaded.
Skill domains and service lines are playbooks/reference (§5–6), never agents.

---

## 5. Playbook Taxonomy (L2 — compiled, versioned, loaded whole)

### Skill playbooks (from Sales Excellence folders 01–05)

| Playbook | Source folder | Loaded by | Maps to KPI(s) |
|----------|--------------|-----------|----------------|
| `consultation_excellence` | 01 | SalesCoach | Rapport, Discovery, Treatment Planning |
| `upsell_packaging` | 02 | SalesCoach, EmailCampaignGen | Upsell/Cross-sell |
| `objection_handling` | 03 | SalesCoach, EmailCampaignGen (conditional) | Objection Handling |
| `education_trust` | 04 | SalesCoach | Education & Product Knowledge |
| `closing_conversion` | 05 | SalesCoach | Closing, Referral Requesting |

### Task playbooks (from Reach / project docs)

| Playbook | Source docs | Loaded by |
|----------|-------------|-----------|
| `email_campaign` | EMAIL_* requirements docs | EmailCampaignGenerator, CampaignManager |
| `tcp_planning` | TCP requirements | TreatmentPlanGenerator |
| `coaching_rubric` | V2 doc KPI definitions | SalesCoach, PracticeEvaluator (doubles as eval rubric) |

### Registry schema (store 1)

```
agent_documents(id, title, doc_type[playbook|reference|evidence],
                task_tags[], agent_keys[], version, token_count, content)
```

Loading rule: <8K tokens → whole doc · 8–50K → TOC + section loads · >50K → embed (sections)

---

## 6. Reference Docs (L3 supplements — selective by entity)

| Reference set | Source | Keyed by | Note |
|---------------|--------|----------|------|
| Service-line selling knowledge | Folders 07–10 (Injectables, Laser, Skin, Specialty) | vocab category/treatment | Compile only what GL lacks: positioning, talk tracks, per-treatment objections. Product *facts* stay in GL |
| Folder 06 (Practice-Level Excellence) | TBD — inspect | — | Likely PracticeEvaluator material |
| Insight bank | Podcast mining pipeline (§7) | vocab term + domain tag | Recurring field practices w/ episode provenance; graduates into playbooks |

---

## 7. Workflows

### W1 — Consultation pipeline (runtime spine)

```
Transcript (S3/PR) ─► OpportunityExtractor ─► entities + opportunities
        │                                          │
        │                  ┌───────────────────────┼──────────────────────┐
        ▼                  ▼                       ▼                      ▼
   ie_transcripts     SalesCoach            EmailCampaignGen        Opportunity
                      (coaching report)     (sequence → GHL)        tracking/stages
```
Entities from extraction (vocab-mapped) drive layer loading for every downstream agent.

### W2 — Reach campaign generation (per qualified opportunity)

```
Opportunity ─► Context Assembler:
   L2 email_campaign playbook (whole)
   L3 product facts + guardrails (entity-keyed, category gap-fill)
   L4 consultation extraction, sentiment, discussed pricing
   L5 practice tone/signature/catalog/actual price   ◄── overrides L3
   L6 (optional) patient-safe stat, cited
─► Generate 3–5 sequence ─► Citation post-processor ─► store + GHL
Practitioner sees citations; patient emails never carry them.
```

### W3 — Research chat (RETRIEVAL_SERVICE.md)

```
msg ─► Query Rewriter ─► /retrieval/search (hybrid+RRF+authority) ─► generate
    ─► post-processor (validate cited ⊆ retrieved, renumber) ─► SSE to UI
```

### W4 — Coaching loop

```
Run ─► SalesCoach (KPI scores + feedback) ─► score tracking
weekly ─► PracticeEvaluator ─► trend report ─► practice dashboard
```

### W5 — Document compile pipeline (offline, Claude Code)

```
Source folders ─► MAP: per-doc extraction by playbook taxonomy (provenance kept)
              ─► REDUCE: per-playbook synthesis + conflict flags
              ─► HUMAN REVIEW ─► versioned playbook rows in registry
```

### W6 — Podcast mining pipeline (offline, Batch API)

```
Domain query sets ─► match_podcast_chunks (+ neighbors) ─► extraction prompts (Batch)
                 ─► sales_insights table (technique, domain, episode ref, frequency)
                 ─► recurring insights graduate to playbooks (provenance kept)
```

### W7 — Corpus ingestion (per source; capture locators AT CHUNK TIME)

```
YouTube: VTT/Whisper ─► chunks + start_seconds/end_seconds
PDFs:    layout-aware extract ─► chunks + page_number + section_path + parent_section_id
Podcasts: transcript ─► chunks (+ timestamps if available)
All:     embedding_model tag on every row
```

---

## 8. Shared Services (build once, every agent uses)

| Service | Responsibility | Spec |
|---------|---------------|------|
| **Context Assembler** | agent key + entities + IDs → assembled, logged context per layer recipe | To spec (companion doc) |
| **Retrieval Service** | hybrid search, fusion, authority weights, retrieval IDs | RETRIEVAL_SERVICE.md |
| **Citation Post-Processor** | validate cited ⊆ retrieved, renumber, resolve to Citation objects | RETRIEVAL_SERVICE.md §8 |
| **Run Logging** | retrieval sets, assembled contexts, violations, usage | RETRIEVAL_SERVICE.md §13 |
| **Eval Harness** | golden sets, KPI rubric scoring, promote gates | Manager R9 |

---

## 9. Build Order

1. **Registry doc** — agents (§4) + playbook taxonomy (§5): one-page decision, the spine
2. **Ingestion locator fixes** (W7) — timestamps/pages before any further ingestion
3. **Compile skill playbooks 01–05** (W5) — SalesCoach needs all five
4. **SalesCoach end-to-end** — proves assembler + playbooks + practice injection + eval rubric
5. **Retrieval service + ResearchChat** — proves the L6/evidence half
6. **EmailCampaignGenerator** — first agent composing all six layers
7. **Podcast mining** (W6) — feeds insight bank → playbook revisions
8. **PracticeEvaluator, TCP, CampaignManager** — variations on proven patterns

---

## 10. Standing Rules (the one-liners)

- **SQL for the exact, playbooks for the procedural, RAG for the unknown.**
- Citations are born at retrieval time; the LLM only points at retrieved IDs.
- Specific overrides general; general fills gaps. Practice > product > category.
- Podcast/field content never overrides guardrails or practice rules; conflicts are logged as playbook-revision candidates, not resolved mid-run.
- New agent only for a new **job**. New knowledge = new playbook/reference row.
- Anything queried repeatedly graduates from live RAG into the compiled layer.
- Cite to practitioners; never in patient-facing copy.
