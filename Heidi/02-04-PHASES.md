# PHASES 02–04 — Briefs (contexts now, full plans drafted post-demo)
**Project:** evidence-ask · These are GSD phase contexts: enough to start CONTEXT/RESEARCH immediately after June 22; plans get drafted then, informed by demo learnings and real ask_log data.

---

## PHASE 02 — funnel-and-polish  *(week after demo)*

### 02-01 Follow-ups + soft conversion
**Objective:** wire `components/ai/suggestions.tsx` into the public/embed variants (3 suggested follow-ups after each answer — generated from the answer's cited offerings/concerns, not generic), and add the soft signup card: after the 3rd completed answer in a session, render a dismissible inline card between answers ("Want this inside your practice — with your pricing, your protocols, your patients? → Get A360"). Never a modal, never interrupts a stream, dismissal persists for the session.
**Data:** session ask count from the cookie session client-side; no new tables.
**Success:** follow-up tap-through and card CTR measurable in ask_log/analytics within a week of demo.

### 02-02 Bridge completion + embedder docs
**Objective:** finish the protocol (`a360:cta_click` so hosts control navigation, documented `a360:seed`), publish `EMBED.md` for third parties (snippet, origins setup, events table, sizing guidance, CSP note), and harden: per-origin allowlist enforcement on incoming messages everywhere, event payload versioning (`v:1`).
**Success:** a developer outside the repo can embed in <30 minutes using only EMBED.md (test with the new frontend dev as the guinea pig).

### 02-03 Analytics + cache tuning
**Objective:** SQL views over ask_log (`ask_daily`, `ask_funnel`, `top_questions`, `zero_source_questions`), surfaced minimally on `/dashboard` stat cards (DEVELOPER_BRIEF Priority-2 page gets real numbers). Tune cache: exclude `out_of_scope` from caching, add cache-hit flag column, review the 24h TTL against question freshness. The `zero_source_questions` view is the gold: it's the literal backlog for GL dossier gaps — route it into the GL Phase 02 review loop.
**Success:** Chris can answer "how many asks, what did they ask, where did we have nothing" in one screen.

---

## PHASE 03 — answers-hub  *(post-demo; needs 02-03 data + dossier batch depth)*

### 03-01 Curation pipeline
**Objective:** `answer_pages` table (slug, question, answer_prose, citations, category, question_type, status draft→approved→published, approved_by/at — schema in the PRD §3.5) + a lightweight curation flow: a dashboard list fed by `top_questions`, one-click "promote to page" that snapshots the answer + citations for human review. Review posture = Phase-11-lite: Chris (or designate) approves; nothing publishes automatically.
**Why gated:** public static pages are permanent claims — they go through the same claims discipline as the data room.

### 03-02 The hub
**Objective:** `/answers` index with category + question-type filters (mirrors Heidi's AnswersHub specialty/questionType pattern, mapped to GL taxonomy), `/answers/[slug]` static pages (ISR), JSON-LD `FAQPage` schema, canonical URLs, sitemap entry, and the closing CTA on every page seeding `/ask?query=` with a follow-up. References section renders identically to the app — the citations ARE the SEO differentiation.
**Success:** first 20 curated pages indexed; organic entrances visible in 30 days; every page funnels to `/ask`.

---

## PHASE 04 — context-and-hardening

### 04-01 Context selector (lens-aware retrieval)
**Objective:** optional context control on `/ask` and a config on the embed ("I'm a(n): Injector / Practice owner / Front desk") that re-weights retrieval toward the matching GL lens (clinical / deep_product / sales_education) — the three-lens dossier architecture becoming a visible product feature. Requires a retrieval-path change, so this is the FIRST plan allowed to touch `lib/retrieval/*`, done as its own reviewed change with the dashboard regression suite from 01-01 re-run.
**Depends:** GL Phase 02 dossiers populated across lenses.

### 04-02 RLS pull-forward (executes GL Phase 12)
**Objective:** policy-aware RLS across the Agent Manager project before any sustained public traffic or any Boulevard technical access. Tenant model decision → policies written table-by-table (service-role bypass for server routes preserved) → enable per table with app smoke tests between groups → `get_advisors` security scan clean.
**Trigger discipline:** this phase BLOCKS public promotion of `/ask` beyond the demo and BLOCKS any third-party embed pilot. It does not block the June 22 demo (service-key-only access, no client-side DB).
**Success:** advisors report zero RLS-disabled tables; `/ask`, embed, and dashboard all green in smoke tests.

---

## SEQUENCING AFTER THE DEMO (recommended)
02-03 first (you'll want the data immediately) → 02-01 → 04-02 (before any promotion/pilot) → 02-02 → 03-01 → 03-02 → 04-01 (waits on dossier lens depth anyway).
