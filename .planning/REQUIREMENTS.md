# Requirements: A360 Evidence Ask

**Defined:** 2026-06-14
**Core Value:** Every clinical claim backed by cited, linkable data that providers can tap to verify
**Milestone:** v2.0 — Adapt Heidi Evidence Ask UX patterns to A360 brand; deliver demo-ready public + embeddable evidence Q&A
**Reference:** GSD_A360_EVIDENCE_ASK_REQUIREMENTS_REWRITE.md (full product spec)

---

## Existing Capabilities (already built — verify, don't rebuild)

These are live in the codebase and should NOT be re-implemented. Requirements reference them as dependencies.

- [x] `AskExperience` component with dashboard/public/embed variants
- [x] `/ask` page with `?query=` seeding and auto-submit
- [x] `/api/ask` SSE wrapper with rate limiting (10/hr session, 30/day IP), caching (24h), session tracking
- [x] Streaming event sequence: status → sources → token* → citations → done
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

## v2.0 P0 Requirements — Demo-Critical

### Answer Structure

- [x] **ANS-01**: Answer displays a Key Points summary card at top with 3-7 bulleted takeaways, each sourced with inline authority badges (REQ-KP-01 to KP-05)
- [x] **ANS-02**: Section headings render as visually distinct styled headers with clear separation between content sections (REQ-SEC-01 to SEC-02)
- [ ] **ANS-03**: Structured tables render as accessible HTML tables with per-cell inline citations — product fact tables (drug class, mechanism, duration, max dose) and comparison tables (aging factor vs modality, product vs duration) (REQ-TBL-01 to TBL-04)
- [ ] **ANS-04**: Tables wrap cleanly on mobile with proper headers and accessible semantics (REQ-TBL-03, REQ-A11Y-08)

### Source Display

- [ ] **SRC-01**: "N sources found" bar appears before answer body with "View sources" toggle; count reflects deduplicated cited sources (REQ-SRCBAR-01 to SRCBAR-04)
- [ ] **SRC-02**: "Reliable" green badge on Tier 1 (FDA/manufacturer label) and Tier 2 (peer-reviewed/academic) sources in reference list (REQ-REF-04, REQ-TIER-01)
- [ ] **SRC-03**: Category pills on each reference: "Journal", "Multi-Specialty", "Regulatory", "Government medical Authority", "Clinical Education", "Manufacturer", etc. (REQ-REF-03)
- [ ] **SRC-04**: Source tier visual hierarchy — FDA/Manufacturer in green tones (highest trust), PubMed/Research in blue tones, Industry/Podcast/Video in neutral treatment (REQ-TIER-01, REQ-TIER-02)
- [ ] **SRC-05**: Inline authority badges and reference cards use consistent tier color system (REQ-CIT-05, REQ-DES-09)

### Trust & Compliance

- [ ] **TRST-01**: Persistent disclaimer bar: "Medical knowledge only. Check sources and use your clinical judgement." — never blocks content (REQ-COMP-01 to COMP-02) [EXISTS — verify]
- [ ] **TRST-02**: Citation click either opens popover (if time permits) or scrolls/highlights the reference card (REQ-POP-05 P0 fallback) [EXISTS — verify hover card works]
- [ ] **TRST-03**: No uncited clinical claims about dosing, contraindications, safety, sequencing, pregnancy, complications, off-label use, or adverse events (REQ-CIT-06, REQ-COMP-08 to COMP-10)

### Embed & Distribution

- [ ] **EMB-01**: `/embed/ask` uses same AskExperience component, removes headline/nav/footer, supports transparent bg (REQ-EMB-01 to EMB-03) [PARTIAL — verify]
- [ ] **EMB-02**: PostMessage bridge: `a360:ready`, `a360:ask_sent`, `a360:answer_complete`, `a360:resize` from embed to parent (REQ bridge events)
- [ ] **EMB-03**: Frame-ancestors from `EMBED_ALLOWED_ORIGINS` env; reject untrusted origins (REQ-EMBSEC-01 to EMBSEC-05)
- [ ] **EMB-04**: Boulevard demo host allowlisted for demo (REQ-EMBSEC-05)

### Interaction

- [ ] **INTR-01**: Follow-up suggestion pills after answer completion with A360-brand styling (REQ-FUP-01 to FUP-03) [EXISTS — polish styling]
- [ ] **INTR-02**: Suggestion chips on initial state, config-driven, grouped by intent (REQ-SUG-01 to SUG-05) [EXISTS — verify]

### Analytics

- [ ] **ANLY-01**: `evidence_unauth_ask` event on public/embed question submit (REQ analytics events)
- [ ] **ANLY-02**: `evidence_answer_complete` event with latency_ms, citation_count, status
- [ ] **ANLY-03**: `citation_click` event when user clicks source badge/reference link

### Demo Acceptance

- [ ] **DEMO-01**: `/ask?query=Can+Botox+and+filler+be+done+the+same+day` loads without login, auto-submits, streams cited answer with Key Points, sections, table, references with Reliable badges, disclaimer visible, follow-ups appear (Section 15 of spec)

---

## v2.0 P1 Requirements — Fast Follow

### Source Display

- **SRC-06**: Impact factor (IF: X.X) on journal/academic references when metadata available (REQ-REF-05)

### Interaction

- **INTR-03**: Sticky bottom composer on long answers so follow-up input stays reachable (REQ-FUP-05)
- **INTR-04**: Thumbs up/down feedback + copy answer + share URL action bar after each answer (REQ-ACT-01 to ACT-04)

### Source Popover

- **POP-01**: Full source popover with title, publisher, evidence excerpt, confidence, category pills, View link, keyboard accessible (REQ-POP-01 to POP-04)

### Funnel

- **CTA-01**: Soft CTA card after 3rd completed answer in session — dismissible, never blocks stream (REQ-CTA-01 to CTA-04)

### Embed

- **EMB-05**: Full postMessage event set: citation_click, followup_click, cta_click, error (Section 7.1 of spec)

### Analytics

- **ANLY-04**: Full analytics event suite: view_sources_click, copy_answer, feedback_submit, soft_cta_view/click
- **ANLY-05**: ask_log analytics view / KPI dashboard queries

### History

- **HIST-01**: Lightweight session sidebar on desktop with New Chat and recent questions (REQ-HIST-02)

---

## v2.0 P2 Requirements — Post-Demo

### SEO

- **SEO-01**: `/answers` index + `/answers/[slug]` from approved `answer_pages` with JSON-LD, sitemap (REQ-SEO-01 to SEO-07)

### Platform

- **CTX-01**: Context selector mapped to GL lenses for specialty-weighted retrieval
- **RLS-01**: RLS hardening before sustained public traffic (REQ-DATA-07)
- **BUDGET-01**: Model budget review and caching optimization for public tier

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

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ANS-01 | Phase 4 | Complete |
| ANS-02 | Phase 4 | Complete |
| ANS-03 | Phase 4 | Pending |
| ANS-04 | Phase 4 | Pending |
| SRC-01 | Phase 5 | Pending |
| SRC-02 | Phase 5 | Pending |
| SRC-03 | Phase 5 | Pending |
| SRC-04 | Phase 5 | Pending |
| SRC-05 | Phase 5 | Pending |
| EMB-01 | Phase 6 | Pending |
| EMB-02 | Phase 6 | Pending |
| EMB-03 | Phase 6 | Pending |
| EMB-04 | Phase 6 | Pending |
| ANLY-01 | Phase 6 | Pending |
| ANLY-02 | Phase 6 | Pending |
| ANLY-03 | Phase 6 | Pending |
| TRST-01 | Phase 7 | Pending (verify) |
| TRST-02 | Phase 7 | Pending (verify) |
| TRST-03 | Phase 7 | Pending |
| INTR-01 | Phase 7 | Pending (polish) |
| INTR-02 | Phase 7 | Pending (verify) |
| DEMO-01 | Phase 7 | Pending |

**Coverage:**
- v2.0 P0 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0

---

## Open Decisions

1. Final public name: `A360 Evidence`, `A360 Evidence Ask`, or `Global Library Ask`
2. Exact source tier colors in A360 palette (green for FDA/Manufacturer, blue for PubMed — specific shades TBD)
3. Full source popover in P0 or P1 (recommendation: P0 scroll/highlight fallback, P1 full popover if time-constrained)
4. Which Boulevard staging domains in `EMBED_ALLOWED_ORIGINS`
5. Whether SEO hub shown as clickable prototype in demo or roadmap only

---
*Requirements defined: 2026-06-14*
*Last updated: 2026-06-14 after v2.0 roadmap creation — traceability complete*
