# Requirements: A360 Evidence Ask & Global Library

**Defined:** 2026-06-14
**Core Value:** Every clinical claim backed by cited, linkable data that providers can tap to verify
**Milestone:** v2.0 — Adapt Heidi Evidence Ask UX patterns to A360 brand; deliver demo-ready public + embeddable evidence Q&A

---

## Existing Capabilities (already built — verify, don't rebuild)

These are live in the codebase and should NOT be re-implemented. Requirements reference them as dependencies.

- [x] `AskExperience` component with dashboard/public/embed variants
- [x] `/ask` page with `?query=` seeding and auto-submit
- [x] `/api/ask` SSE wrapper with rate limiting (10/hr session, 30/day IP), caching (24h), session tracking
- [x] Streaming event sequence: status -> sources -> token* -> citations -> done
- [x] Inline authority badges (`InlineAuthorityBadge`) with per-corpus colors
- [x] Citation hover cards (`CitationHoverCard`) with pager, confidence, feedback
- [x] Citation cards (`CitationCard`) with YouTube viewer, deep links, relevance bars
- [x] Follow-up suggestions (LLM-generated via FOLLOW_UPS extraction)
- [x] Suggestion chips (verb-grouped, config-driven)
- [x] Out-of-scope handling with nearest-topic chips
- [x] Persistent disclaimer at page bottom
- [x] Demo bypass token for rate limits
- [x] `ask_log` table with session/surface/question/answer/citations/status

---

## v1.1 Requirements (GL Pipeline Integrity)

Quality gate before resuming Phase 11+ content build. Fix the foundation.

### Validation & Testing

- [x] **VAL-01**: Every completed phase (1-7) has a validation SQL file that asserts expected row counts, checks for NULL violations, and flags orphan records — returns PASS/FAIL
- [x] **VAL-02**: Batch content generation includes a post-generation QC gate checking uniqueness ratio (>80%), product name accuracy (0 mismatches), and evidence specificity
- [x] **VAL-03**: Validation can be run idempotently against live Supabase to verify current state matches expected state

### Execution Pipeline

- [x] **EXEC-01**: A single manifest file lists all SQL files in dependency order with status (pending/applied/verified) and phase association
- [x] **EXEC-02**: Manifest includes pre-execution checklist (schema dependencies, required prior files) and post-execution verification queries
- [x] **EXEC-03**: SQL files that are out of sync with their source artifacts (review cards, research specs) are flagged in the manifest

### Podcast Data Strategy

- [x] **POD-01**: Two-layer evidence model defined and documented
- [x] **POD-02**: Anonymous identifier scheme implemented
- [x] **POD-03**: Workflow documented: podcast -> discover idea -> find PubMed/published backup -> save both layers
- [x] **POD-04**: All existing SQL files and review cards audited for podcast contamination in production fields

### Pairing Reconciliation

- [x] **PAIR-01**: 06-02-canonical-common-inserts.sql regenerated from Chris's reviewed/approved pairing cards
- [x] **PAIR-02**: Sculptra pair tier decisions re-evaluated
- [x] **PAIR-03**: All 37 review cards confirmed clean of podcast attribution

### Evidence Provenance

- [x] **EVID-01**: 36 PubMed evidence_links rows with NULL url backfilled using DOI
- [x] **EVID-02**: Source classification documented
- [ ] **EVID-03**: Phase 3 plan 03-04 (live UI verification) completed *(Deferred — not tested, no API key provisioned)*

---

## v2.0 P0 Requirements — Demo-Critical (Evidence Ask)

### Answer Structure

- [x] **ANS-01**: Answer displays a Key Points summary card at top with 3-7 bulleted takeaways, each sourced with inline authority badges
- [x] **ANS-02**: Section headings render as visually distinct styled headers with clear separation between content sections
- [x] **ANS-03**: Structured tables render as accessible HTML tables with per-cell inline citations
- [x] **ANS-04**: Tables wrap cleanly on mobile with proper headers and accessible semantics

### Source Display

- [x] **SRC-01**: "N sources found" bar appears before answer body with "View sources" toggle
- [x] **SRC-02**: "Reliable" green badge on Tier 1 and Tier 2 sources in reference list
- [x] **SRC-03**: Category pills on each reference
- [x] **SRC-04**: Source tier visual hierarchy — FDA/Manufacturer in green tones, PubMed/Research in blue tones, Industry/Podcast/Video in neutral
- [x] **SRC-05**: Inline authority badges and reference cards use consistent tier color system

### Trust & Compliance

- [x] **TRST-01**: Persistent disclaimer bar visible on every page load
- [x] **TRST-02**: Citation click opens popover or scrolls/highlights the reference card
- [x] **TRST-03**: No uncited clinical claims about dosing, contraindications, safety, etc.

### Embed & Distribution

- [x] **EMB-01**: `/embed/ask` uses same AskExperience component, removes headline/nav/footer
- [x] **EMB-02**: PostMessage bridge events
- [x] **EMB-03**: Frame-ancestors from `EMBED_ALLOWED_ORIGINS` env
- [x] **EMB-04**: Boulevard demo host allowlisted for demo

### Interaction

- [x] **INTR-01**: Follow-up suggestion pills after answer completion with A360-brand styling
- [x] **INTR-02**: Suggestion chips on initial state, config-driven, grouped by intent

### Analytics

- [x] **ANLY-01**: `evidence_unauth_ask` event on public/embed question submit
- [x] **ANLY-02**: `evidence_answer_complete` event with latency_ms, citation_count, status
- [x] **ANLY-03**: `citation_click` event when user clicks source badge/reference link

### Demo Acceptance

- [x] **DEMO-01**: `/ask?query=Can+Botox+and+filler+be+done+the+same+day` loads, auto-submits, streams cited answer

---

## v2.0 P1 Requirements — Fast Follow

### Source Display
- **SRC-06**: Impact factor (IF: X.X) on journal/academic references

### Interaction
- **INTR-03**: Sticky bottom composer on long answers
- **INTR-04**: Thumbs up/down feedback + copy + share action bar

### Source Popover
- **POP-01**: Full source popover with title, publisher, evidence excerpt, confidence, category pills

### Funnel
- **CTA-01**: Soft CTA card after 3rd completed answer in session

### Embed
- **EMB-05**: Full postMessage event set

### Analytics
- **ANLY-04**: Full analytics event suite
- **ANLY-05**: ask_log analytics view / KPI dashboard queries

### History
- **HIST-01**: Lightweight session sidebar on desktop with New Chat and recent questions

---

## v2.0 P2 Requirements — Post-Demo

### SEO
- **SEO-01**: `/answers` index + `/answers/[slug]` from approved `answer_pages`

### Platform
- **CTX-01**: Context selector mapped to GL lenses
- **RLS-01**: RLS hardening before sustained public traffic
- **BUDGET-01**: Model budget review and caching optimization

---

## v2.0 Requirements — Agent Runtime Inspector

### Runtime Trace
- [ ] **TRACE-01**: Runtime emits structured AgentRunEvent for every major step
- [ ] **TRACE-02**: Events stream to UI live over SSE
- [ ] **TRACE-03**: Every run persists to agent_runs/agent_run_events/agent_run_artifacts
- [ ] **TRACE-04**: Completed run can be replayed from stored events

### Execution UI
- [ ] **UI-01**: Left panel shows live vertical timeline with status icon, step title, duration
- [ ] **UI-02**: Clicking a timeline step opens detail drawer
- [ ] **UI-03**: Tool-specific readable cards
- [ ] **UI-04**: Universal output viewer

### Agent Runtime
- [x] **RUN-01**: Agent runtime executes in-project (Next.js API route + Supabase + Claude API)
- [x] **RUN-02**: Runtime loads agent definition and active version prompt
- [x] **RUN-03**: Runtime provides tools that query real data
- [x] **RUN-04**: When a tool fails, runtime continues with remaining tools
- [x] **RUN-05**: Run never ends with only "No output generated"

### Observability
- [ ] **OBS-01**: Each run displays metrics
- [ ] **OBS-02**: Runtime shows observable trace only

### Demo
- [ ] **DEMO-02**: Run mode selector: Live / Replay / Load Demo Run
- [ ] **DEMO-03**: Plain-English "why this matters" labels

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Heidi visual identity (yellow/sand) | A360 brand palette only |
| Retrieval pipeline changes | lib/retrieval/* frozen — wrap only |
| Patient-facing mode | Professional-facing per gateway posture |
| Real-time voice input | Separate feature track |
| OAuth/social login | /ask stays ungated |
| Mobile native app | Web-first |
| Prompt Runner integration | Decision: runtime is in-project, not Railway |
| Hidden chain-of-thought exposure | Privacy/IP risk — show observable trace only |
| Custom agent builder UI | This is an inspector/debugger, not an agent IDE |
| Multi-agent workflow orchestration | Single-agent runs first; workflows later |
| Package architecture / tier models | Premature; build fuel data first |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ANS-01 | Phase 4 | Complete |
| ANS-02 | Phase 4 | Complete |
| ANS-03 | Phase 4 | Complete |
| ANS-04 | Phase 4 | Complete |
| SRC-01 | Phase 5 | Complete |
| SRC-02 | Phase 5 | Complete |
| SRC-03 | Phase 5 | Complete |
| SRC-04 | Phase 5 | Complete |
| SRC-05 | Phase 5 | Complete |
| EMB-01 | Phase 6 | Complete |
| EMB-02 | Phase 6 | Complete |
| EMB-03 | Phase 6 | Complete |
| EMB-04 | Phase 6 | Complete |
| ANLY-01 | Phase 6 | Complete |
| ANLY-02 | Phase 6 | Complete |
| ANLY-03 | Phase 6 | Complete |
| TRST-01 | Phase 7 | Complete |
| TRST-02 | Phase 7 | Complete |
| TRST-03 | Phase 7 | Complete |
| INTR-01 | Phase 7 | Complete |
| INTR-02 | Phase 7 | Complete |
| DEMO-01 | Phase 7 | Complete |
| RUN-01 | Phase 15 | Complete |
| RUN-02 | Phase 15 | Complete |
| RUN-03 | Phase 15 | Complete |
| RUN-04 | Phase 15 | Complete |
| RUN-05 | Phase 15 | Complete |

**Coverage:**
- v2.0 P0 Evidence Ask requirements: 22 total, all complete
- v2.0 Agent Runtime requirements: 18 total (5 complete, 13 pending)
- v1.1 GL requirements: 16 total (14 complete, 1 deferred, 1 pending)

## Open Decisions

1. Final public name: `A360 Evidence`, `A360 Evidence Ask`, or `Global Library Ask`
2. Exact source tier colors in A360 palette
3. Full source popover in P0 or P1
4. Which Boulevard staging domains in `EMBED_ALLOWED_ORIGINS`
5. Whether SEO hub shown as clickable prototype in demo or roadmap only

---
*Requirements defined: 2026-06-14*
*Last updated: 2026-06-14 after merge of AbhishekEdits + feat/ask-sidebar-tab*
