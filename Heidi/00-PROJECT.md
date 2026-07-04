# PROJECT: evidence-ask
**GSD project charter · Drop into `C:\projects\a360-v2\.planning\evidence-ask\`**
**Created:** 2026-06-12 · **Demo gate:** 2026-06-22 (Boulevard CEO/CTO)
**Source requirements:** `A360_EVIDENCE_ASK_REQUIREMENTS.md` (the Heidi reverse-engineering PRD)

---

## OBJECTIVE

Ship **A360 Evidence** — a public, ungated, citation-backed ask experience for aesthetic medicine — as three doors on one engine: `/ask` (public page), `/embed/ask` (iframe-able, postMessage bridge), and the existing `/dashboard/research` (unchanged). The retrieval engine already live on the Research tab is the product; this project is routing, chrome, and public hardening around it.

**Demo unlock:** open `…/ask?query=Can+Botox+and+filler+be+done+the+same+day` on the boardroom screen → grounded answer streams with FDA-amber and PubMed-emerald citation chips → click through to the actual FDA label → then show the identical experience framed inside a Boulevard-styled host page. *"This drops into boulevard.com as an iframe."*

## CURRENT STATE (verified)

- `/dashboard/research` is LIVE on real DB retrieval: SSE streaming, grounded prose, clickable FDA + PubMed citations
- Citation component system complete (`InlineCitationBadge`, `ReferencesSection`, `GroundedAnswer`, tier colors amber/blue/emerald/violet)
- Retrieval path (`lib/retrieval/*`, `app/api/research/chat`) is **frozen** — DEVELOPER_BRIEF rule 4
- Whole app behind a shared-password gate at `/login`
- Follow-up suggestions component exists (`components/ai/suggestions.tsx`), not wired
- New frontend dev onboarding; their first task is the Activity Layer rail — **collision risk on `research-chat.tsx`, see Coordination**

## DECISIONS (defaults locked so execution is never blocked — flag to Chris, proceed unless overridden)

| # | Decision | Default | Status |
|---|---|---|---|
| D1 | Product name on page | **A360 Evidence** | needs Chris confirm (cosmetic, non-blocking) |
| D2 | Audience posture | Professional-facing only; persistent education disclaimer; gateway posture on clinical claims | LOCKED (matches GL posture docs) |
| D3 | Rate limits | 10 asks/hr per session, 30/day per IP; `DEMO_BYPASS_TOKEN` env for boardroom | default, tune later |
| D4 | Rate-limit + cache infra | **Supabase-native** (ask_log count queries + question_hash cache) — no Upstash/KV; demo-scale, zero new infra | LOCKED for Phase 01 |
| D5 | Scope gating | No pre-classifier. Post-retrieval: 0 sources → out_of_scope template + nearest-topic chips. Pre-gate is length cap + sanitization only | LOCKED for Phase 01 |
| D6 | Answers Hub | Deferred to Phase 03 (post-demo, needs review workflow) | LOCKED |
| D7 | Public model budget | Pin `/api/ask` to the cheaper gateway model config; dashboard unchanged | default |
| D8 | Embed demo host | Internal-only Boulevard-styled page at `/demo/boulevard` (not public nav, internal demo use) | LOCKED |

## PHASE MAP

```
PHASE 01 — ask-foundation            [DEMO CRITICAL · target complete 2026-06-17]
  01-01  AskExperience extraction (pure refactor, zero behavior change)
  01-02  /api/ask public wrapper + ask_log + rate limit + cache
  01-03  /ask public page (layout, gate exclusion, chips, seeding, disclaimer)
  01-04  /embed/ask + postMessage bridge + CSP + Boulevard demo host + dry run

PHASE 02 — funnel-and-polish         [fast-follow, week after demo]
  02-01  Follow-up suggestions wired + soft signup card (3rd-answer trigger)
  02-02  Full bridge event set (resize, citation_click, cta_click) + embed docs
  02-03  Cache tuning + ask analytics view + KPI dashboard queries

PHASE 03 — answers-hub               [post-demo, SEO]
  03-01  answer_pages table + curation flow (Phase-11-lite review)
  03-02  /answers index + /answers/[slug] + JSON-LD + sitemap

PHASE 04 — context-and-hardening     [post-demo]
  04-01  Context selector → GL lens-weighted retrieval
  04-02  RLS pull-forward (executes GL Phase 12 — HARD GATE before sustained public traffic)
```

**Dependency chain:** 01-01 → 01-02 → 01-03 → 01-04 (strictly sequential). Phase 02 items independent of each other. 03 needs 02-03 (the log data) + dossier batch (corpus depth). 04-02 blocks any post-demo public promotion.

**GL roadmap couplings:** answer quality ⟸ GL Phase 02 dossier batch (running in parallel). Citation resolution ⟸ GL Phase 01 (executing). RLS ⟸ GL Phase 12 (pulled forward here as 04-02).

## SUCCESS CRITERIA (project level)

1. Unscripted question on `/ask` returns streamed, cited prose; FDA/PubMed links resolve to real label/abstract pages
2. `/dashboard/research` behavior is bit-identical after the refactor (regression list in 01-01 passes)
3. Password gate still blocks `/dashboard/*`; `/ask`, `/embed/*`, `/api/ask` are public
4. Rate limit returns friendly 429 card; demo bypass works from boardroom
5. Embed renders inside the Boulevard-styled host on white AND dark host backgrounds; `a360:ready` + `a360:ask_sent` events observed in host console
6. Every public ask lands one row in `ask_log` with citations jsonb populated
7. Out-of-corpus question gets the honest decline + nearest-topic chips (credibility feature, demo-able on purpose)

## RISKS

| Risk | Mitigation |
|---|---|
| Refactor breaks the ONLY live demo surface | 01-01 is extraction-only with explicit zero-diff regression checklist; commit before/after; nothing else starts until it passes |
| Dev collision on `research-chat.tsx` | Coordination note below; Claude Code executes 01-01 in one sitting on a branch, merged same day |
| Middleware change accidentally opens dashboard | 01-03 verification includes a logged-out `/dashboard` probe |
| Public endpoint cost blowout | D3 limits + D7 model pin + 24h answer cache; instrument from hour one |
| RLS-disabled DB + public surface | Service-key access only, server-side only (existing rule); 04-02 is the standing hard gate before sustained traffic |
| Heidi IP | Patterns copied, assets/copy original — already enforced in the PRD; no Heidi strings anywhere in code or UI |

## COORDINATION

- **Claude Code** executes Phase 01 plans in order, one plan per session, each plan is self-contained
- **New frontend dev** stays on Activity Layer rail + DEVELOPER_BRIEF Priority 1 (saved-outputs API) — explicitly NOT touching `research-chat.tsx` until 01-01 is merged. Post-merge, dev consumes `<AskExperience>` like everyone else
- **Chris** confirms D1 (name), supplies `EMBED_ALLOWED_ORIGINS` + `DEMO_BYPASS_TOKEN` values in Vercel env, and runs the 01-04 demo dry-run personally

## FILES IN THIS PROJECT

```
00-PROJECT.md        ← this file
01-01-PLAN.md        AskExperience extraction
01-02-PLAN.md        Public API + ask_log
01-03-PLAN.md        Public /ask page
01-04-PLAN.md        Embed + bridge + demo host + dry run
02-04-PHASES.md      Phase 02/03/04 briefs (contexts written, plans drafted post-demo)
```
