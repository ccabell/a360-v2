# A360 Global Library — Project

## What This Is

The A360 Global Library (GL) is a structured knowledge system for aesthetic medicine that powers an OpenEvidence-style citation UI. Providers ask clinical questions and get grounded, cited answers backed by FDA labels, PubMed research, manufacturer docs, and practice content — every claim links back to its origin.

## Core Value

Every clinical claim backed by cited, linkable data that providers can tap to verify what the system says.

## Current Milestone: v2.0 Heidi Evidence Clone

**Goal:** Adapt Heidi Evidence Ask's proven UX patterns to A360's cool-tone brand — clone the interaction architecture (key points cards, structured fact tables, source bars, reliable badges, follow-up pills, sticky input, action bars), NOT the visual identity.

**Target features:**
- Key Points summary card (bg-muted styling, bulleted, each bullet sourced)
- Structured product fact table (per-cell inline source badges)
- "N sources found" bar with "View sources" toggle
- "Reliable" green badge on FDA/government/academic sources
- Impact factor (IF: X.X) on journal references
- Follow-up suggestion pills (bg-accent styling)
- Sticky bottom input bar ("Ask a follow-up question...")
- Thumbs up/down + share/copy action bar after answers
- Source hover card refinements (category pills, confidence badge)
- Persistent disclaimer bar ("Medical knowledge only...")
- YouTube video thumbnail cards inline when cited

**Design constraint:** A360 brand palette only — slate navy (#3B4654), steel blue (#9CABB8), medium blue (#719CC0), light blue (#BADAE9), ice (#E7F2F3, #F1FBFD). Use existing OKLch theme tokens. NO yellow/sand/warm tones.

## Current State (2026-06-13)

**Phases 1-5 complete.** 5 phases executed (18 plans total). Phase 6 (pairing-engine) in progress.

### Research/Evidence Tab (Phases 1-3)
- POST `/api/research/chat` streams grounded prose via direct Anthropic SDK (claude-haiku-4.5)
- Real DB retrieval: `evidence_links` (PubMed + FDA) + `agent_reference_docs`
- Citation cards render with clickable deep links to `pubmed.ncbi.nlm.nih.gov` and `accessdata.fda.gov`
- Corpus diversity: PubMed sources guaranteed alongside FDA via reserved-slot merging
- PubMed gap FIXED (2026-06-13): corpus diversity logic + direct Anthropic key replaced AI Gateway fallback

### Source Infrastructure (Phase 4)
- source_registry: 43 active, 14 retired, 0 review (fully triaged)
- ingestion_queue: 92 approved/ingested, 10 rejected, 0 queued
- 17 offerings with FDA evidence_links, 0 null URLs

### Concern Language (Phase 5)
- 593 aliases across 48 concerns (minimum 4 per concern)
- 4 concern clusters: Tired Appearance, Lower-Face Heaviness, Post-Weight-Loss Laxity, Angry/Mean Resting Expression
- Concern-first routing live: "I look tired" -> 8 products across 3 mechanisms

### Enrichment Coverage
- 136 agent_reference_docs (18 offerings x 3 lenses)
- 184 evidence_links (72 FDA, 78 PubMed, 25 IFU, 7 YouTube)
- 139 item_concerns (32 offerings), 212 item_body_areas (32 offerings)
- 1 agent_fuel_document (Botox only — fuel compilation is Phase 10)

## Requirements

### Validated

- ✓ Evidence_links data gaps fixed (pmid, url, page_number) — v1.0 Phase 1
- ✓ 20 demo products have dossiers with structured intelligence — v1.0 Phase 2
- ✓ Research/Evidence tab reads from real DB, not mock data — v1.0 Phase 3
- ✓ Inline citation badges with per-corpus color coding — v1.0 Phase 3
- ✓ SSE streaming with source→token→citation event sequence — v1.0 Phase 3
- ✓ Public /ask page with rate limiting, caching, session tracking — v1.0 Phase 3
- ✓ AskExperience component (dashboard/public/embed variants) — v1.0 Phase 3
- ✓ Citation hover cards with pager, confidence, feedback — v1.0 Phase 3
- ✓ Suggestion chips (verb-grouped) — v1.0 Phase 3
- ✓ Follow-up suggestions from LLM — v1.0 Phase 3
- ✓ Out-of-scope handling with nearest-topic chips — v1.0 Phase 3

### Active

See REQUIREMENTS.md for v2.0 requirements.

### Out of Scope

- Heidi's visual identity (yellow/sand colors, Heidi branding) — we adapt UX patterns only
- Rebuild retrieval pipeline — wrap what exists, don't fork
- Embed mode (/embed/ask) polish — deferred to post-demo
- Answers Hub (/answers/* SEO pages) — deferred, needs review workflow
- Context selector (specialty-aware retrieval) — deferred
- RLS hardening — deferred to before sustained public traffic
- Authentication/login flows — /ask stays ungated

## Content Corpus (PRIMARY enrichment source)

The CMS Supabase (`gjqicqldjgvrwmtkliie`) holds 630K+ vectorized, searchable chunks:

| Source | Records | Chunks | Tagged | RPC Function |
|--------|---------|--------|--------|-------------|
| Podcasts | 8,688 episodes / 31 shows | ~202K | 100% | `match_podcast_chunks()` |
| YouTube | 3,984 videos | ~148K | 64% | `match_youtube_transcripts()` |
| PubMed | 23,581 articles | ~37K | 99% | `match_pubmed_articles()` |
| Industry | ~750 articles | ~87K | 100% | `match_industry_articles()` |

**Corpus-first principle (locked 2026-06-13):**
- Every enrichment phase MUST query the corpus BEFORE generating content
- The LLM's job is to synthesize and structure what experts said, not generate from training data
- Podcast data is the richest source for pairings, timing, combinations, patient education, and staff training
- Workflow: generate questions -> mine corpus -> combine AI synthesis -> feed into planning

## Context

- **Demo deadline:** June 22, 2026 — Boulevard CEO/CTO meeting
- **Retrieval engine:** lib/retrieval/* is FROZEN (DEVELOPER_BRIEF rule 4)
- **RAG service:** Railway (search-api-production-2fc0.up.railway.app)
- **GL database:** Supabase aejskvmpembryunnbgrk (29 products, evidence_links + agent_reference_docs)
- **Brand reference:** A360 Brand Guidelines 2025 (cool-tone: navy/blue/ice/white)
- **Heidi reference:** screenshots + PRD at C:\Projects\a360-v2\Heidi\ — UX patterns only, not styling

## Non-Negotiables

- No PHI in any code, comments, fixtures, or examples
- Tenant isolation on all queries
- Corpus-first: never rely on LLM knowledge alone when 630K expert chunks exist
- Citations for providers only (clinical + deep_product lens) — not patient-facing (sales_education)
- YouTube timestamps must be preserved (currently discarded at ingestion — known gap)

## Constraints

- **Stack:** Next.js App Router, shadcn/ui, Tailwind + OKLch tokens, existing components
- **Timeline:** Demo-ready by June 22 (9 days)
- **Retrieval:** lib/retrieval/* is frozen — all changes in components/ and app/ only
- **Colors:** A360 brand palette only — no warm tones, no Heidi yellow/sand
- **Components:** Extend existing grounding/ components, don't rebuild

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| OKLch tokens only | DEVELOPER_BRIEF rule 2 — no raw hex in components | Good |
| Wrap retrieval, don't fork | One engine, multiple surfaces | Good |
| A360 brand colors, not Heidi's | We clone UX patterns, not visual identity | Good |
| Supabase-native rate limiting | Zero new infra for demo | Good |
| Professional-facing only | Matches gateway posture, no patient mode | Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-14 after merge of AbhishekEdits + feat/ask-sidebar-tab*
