# Source Registry & Discovery Research — System Addendum

Companion to the dossier system (v2, real schema, `aejskvmpembryunnbgrk`). **Additive.** Adds three things the closed-corpus pipeline was missing: (1) a master **source registry** with authority AND rights classification, (2) a **discovery research phase** that triggers web research when a claim is weak/safety-critical, auto-corrects the claim against what it finds, and flags it for review, and (3) an **ingestion queue** so newly-found open-license sources compound the corpus instead of being re-researched.

Decisions locked: research is **auto-research + auto-correct, flagged for review**; ingestion rights gate is **CC-BY + manufacturer-permitted**; registry lives in the **core DB**.

---

## 1. The gap this closes

The compile pipeline as written is **closed-corpus** — it gathers only from already-ingested CMS vectors + structured taxonomy + uploaded PDFs. If the best source isn't already loaded, the honest result is "no source, drop the claim." It cannot DISCOVER. The Carruthers episode proved the cost: the authoritative source for a safety claim wasn't in-corpus, and the claim as written ("Botox 2 weeks before filler") was actually WRONG — only web research found the right source AND corrected the error. Discovery must be part of compile, not a manual side-quest.

Runtime agents stay closed-corpus (no freelancing mid-consultation). Only the **compile step** gets web research — done once, slowly, under review.

---

## 2. The source registry (new table, core DB)

```sql
CREATE TYPE source_rights AS ENUM (
  'public_domain',          -- FDA, DailyMed, US gov works — ingest freely
  'open_access_cc_by',      -- CC-BY — ingest with attribution
  'open_access_cc_by_nc',   -- CC-BY-NC — CANNOT ingest (commercial product); cite only
  'manufacturer_permitted', -- mfr content we have permission/terms to use — ingest per terms
  'society_guideline',      -- free-to-read but copyrighted — CITE ONLY, do not ingest
  'paywalled',              -- cite only, extract-and-verify facts, never reproduce
  'unknown'                 -- unclassified until reviewed
);

CREATE TABLE public.source_registry (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text NOT NULL,              -- "Dermatologic Surgery", "Journal of Cosmetic and Laser Therapy"
  publisher        text,                       -- ASDS, Taylor & Francis, NIH...
  society          text,                       -- affiliated society if any (ASDS, ASAPS, ASLMS...)
  source_kind      text,                       -- journal | guideline | regulatory | manufacturer | congress | textbook
  authority_rank   smallint NOT NULL,          -- 1 fda/ifu .. 6 field practice (same scale as evidence_links)
  rights_class     source_rights NOT NULL DEFAULT 'unknown',
  ingestible       boolean GENERATED ALWAYS AS (
                     rights_class IN ('public_domain','open_access_cc_by','manufacturer_permitted')
                   ) STORED,                    -- the gate: only these three may be ingested
  base_url         text,
  doi_prefix       text,                        -- e.g. 10.1097 (DSS), 10.1080 (T&F) — to recognize/route sources
  pubmed_indexed   boolean DEFAULT false,
  access_notes     text,                        -- "hybrid — filter for OA articles", "check per-article license"
  added_by         text,                        -- 'seed' | 'discovery' | 'chris'
  status           text DEFAULT 'active' CHECK (status IN ('active','review','retired')),
  created_at       timestamptz DEFAULT now()
);

CREATE INDEX idx_source_registry_doi ON public.source_registry (doi_prefix);
CREATE INDEX idx_source_registry_ingestible ON public.source_registry (ingestible) WHERE ingestible;
```

The `ingestible` column is computed, so the rule "CC-BY + manufacturer-permitted + public-domain may be ingested; everything else cite-only" is enforced by the schema, not by anyone remembering it. `society_guideline` and `paywalled` are explicitly NOT ingestible — they answer the "free to read ≠ free to ingest" trap structurally.

### Seed rows (from the two research docs — pre-classified)

| name | society | authority_rank | rights_class | ingestible |
|---|---|---|---|---|
| FDA device/drug labels | — | 1 | public_domain | yes |
| DailyMed (NIH/NLM) | — | 1 | public_domain | yes |
| PMC open-access subset | — | 2 | open_access_cc_by | yes (per-article) |
| Aesthetic Surgery Journal Open Forum | ASAPS | 2 | open_access_cc_by | yes |
| PRS Global Open | ASPS | 2 | open_access_cc_by | yes |
| JPRAS Open | BAPRAS/EURAPS | 2 | open_access_cc_by | yes |
| Aesthetic Plastic Surgery | ISAPS | 2 | unknown (hybrid) | per-article |
| Journal of Cosmetic and Laser Therapy | — | 2 | unknown→review | per-article |
| Dermatologic Surgery | ASDS | 4 | paywalled | no (cite only) |
| JAAD | AAD | 4 | paywalled | no |
| Lasers in Surgery and Medicine | ASLMS | 4 | paywalled | no |
| Facial Plastic Surgery & Aesthetic Medicine | AAFPRS | 4 | paywalled | no |
| AAD/BAD/EADV free guidelines | AAD/BAD/EADV | 4 | society_guideline | no (cite only) |

(Hybrid journals carry `unknown`/per-article because the license is set per paper — discovery classifies each article it actually pulls.)

---

## 3. Discovery research phase (new STEP 3.5 in the compile pipeline)

Inserted between DEDUPE/CORROBORATE (STEP 3) and COMPILE (STEP 4). Triggered automatically per-claim when:
- a **clinical or safety** claim's best authority is rank > 4 (field practice only), OR
- coverage scoring set `requires_reviewer_attention` for a clinical section, OR
- a claim has `independent_source_count < 2` in the clinical lens.

### What it does (auto-research + auto-correct, flagged)

```
For each triggering claim:
1. SEARCH the web for higher-authority sources: targeted queries (society + topic + "consensus"/
   "guideline"), PubMed, and the source_registry's known journals by doi_prefix.
2. For each candidate source found:
   a. Identify it in source_registry by doi_prefix/name. If UNKNOWN, create a 'review' row
      (added_by='discovery') with best-guess authority_rank + rights_class='unknown'.
   b. Read the source. Extract what it ACTUALLY says about the claim.
3. REVERIFY the original claim against the found sources. Three outcomes:
   - CONFIRMED: claim is correct → attach the higher-authority evidence_link, raise authority_rank.
   - CORRECTED: claim is wrong or overstated → REWRITE the claim to what the source supports,
     attach the evidence_link, set status='corrected', FLAG for review with a before/after diff.
   - UNSUPPORTED: no authoritative source supports it → mark claim 'unsupported', flag for review
     (candidate for removal). Never leave a safety claim standing on field-practice alone.
4. INGESTION GATE: if a found source is ingestible (public_domain | open_access_cc_by |
   manufacturer_permitted per source_registry), queue it (§4). If cite-only (paywalled/
   society_guideline/CC-BY-NC), extract-and-verify the fact, store the evidence_link with
   attribution, but DO NOT ingest the text.
5. Record the research trail: query, sources found, outcome, in the compile report + as a
   research_log row.
```

The Carruthers case, run through this: the "Botox 2 weeks before filler" claim triggers (clinical, rank-6). Search finds Carruthers 2016 (registry: ASDS, rank 4, paywalled→cite-only) and Urdiales-Gálvez 2019 (registry: ISAPS hybrid, this article CC-BY→ingestible). Reverify → the claim is **CORRECTED** to "toxin and HA filler may be combined in either order; 1–2 week spacing is for side-effect/result assessment," evidence_links attached at rank 4, before/after diff flagged for your review. Urdiales-Gálvez queued for ingestion; Carruthers cite-only. Exactly the output you got manually — now automatic.

**Auto-correct is flagged, never silent.** A corrected claim lands as `status='corrected'` and CANNOT reach `active` until you approve the diff. You always see what changed and why.

---

## 4. Ingestion queue (newly-found open sources compound the corpus)

```sql
CREATE TABLE public.ingestion_queue (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id       uuid REFERENCES public.source_registry(id),
  url             text NOT NULL,
  doi             text,
  title           text,
  rights_class    source_rights NOT NULL,     -- snapshot at queue time
  discovered_during text,                      -- which dossier compile surfaced it
  status          text DEFAULT 'queued' CHECK (status IN ('queued','approved','ingested','rejected')),
  queued_at       timestamptz DEFAULT now()
);
```

Flow: discovery queues an ingestible source → you (or an auto-rule for public_domain/CC-BY) approve → the existing ingestion pipeline (same one that loads PubMed/podcasts into CMS vectors) pulls, chunks, embeds it into the CMS project → mark `ingested`. Next compile that needs it finds it **in-corpus** — the knowledge base grows itself. Cite-only sources never enter this queue; they live only as `evidence_links` with attribution.

Rights gate is enforced twice: `source_registry.ingestible` (computed) and the queue's `status` approval. A CC-BY-NC or paywalled source physically cannot pass.

---

## 5. Research log (audit the discovery)

```sql
CREATE TABLE public.research_log (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_ref       text,                        -- the dossier claim that triggered research
  dossier_entity  text,                        -- botox, neurotoxins...
  trigger_reason  text,                        -- 'rank6_safety' | 'low_coverage' | 'single_source' | 'manual'
  query_text      text,
  sources_found   jsonb,                       -- [{name, doi, authority_rank, rights_class, ingestible}]
  outcome         text,                        -- confirmed | corrected | unsupported
  before_text     text,                        -- for corrected claims (the diff)
  after_text      text,
  evidence_link_ids uuid[],
  ran_at          timestamptz DEFAULT now()
);
```

This is the audit trail for every web-research action: what was searched, what was found, what changed, what now backs the claim. It's what makes auto-correct trustworthy — nothing changes without a logged, reviewable reason.

---

## 6. Migration delta (additive — Claude Code runs via apply_migration)

Three tables + two enums, all additive, no existing tables touched:
```
0003_source_registry.sql   -> source_rights enum, source_registry table + seed rows
0004_ingestion_queue.sql   -> ingestion_queue table
0005_research_log.sql      -> research_log table
```
Seed `source_registry` from the §2 table during 0003. Same gates as the dossier migration: named migrations, tracked history, nothing auto-approved.

---

## 7. The router rule, restated with discovery

Runtime (live agents): closed-corpus — dossier when entity known, fact tables for relationships, RAG over ingested vectors for open questions, never the open web mid-consultation.

Compile-time (building knowledge): **open-corpus** — gather from in-corpus first, then DISCOVER on the web for weak/safety claims, reverify + auto-correct (flagged), ingest the open-license findings, cite the rest. Web research is a compile-phase privilege, never a runtime one.
