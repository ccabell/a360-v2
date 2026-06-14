# Roadmap: A360 Evidence Ask

## Milestones

- ✅ **v1.0 Citations & Retrieval** - Phases 1-3 (shipped 2026-06-12)
- 🚧 **v2.0 Heidi Evidence Clone** - Phases 4-7 (in progress — demo June 22, 2026)

## Phases

<details>
<summary>✅ v1.0 Citations & Retrieval (Phases 1-3) — SHIPPED 2026-06-12</summary>

### Phase 1: citations
**Goal**: Fix evidence_links data gaps (pmid null, url empty, no page_number column, YouTube timestamps missing) and update the compile pipeline to always capture citation locators going forward.
**Depends on**: Nothing
**Plans**: 3/3 complete

Plans:
- [x] 01-01: Schema migration (page_number column) + PubMed PMID backfill + YouTube timestamp backfill
- [x] 01-02: FDA Access Data URL research + FDA URL backfill for 47 evidence_links rows
- [x] 01-03: Compile pipeline doc update + demo verification checkpoint

---

### Phase 2: dossier-batch
**Goal**: Compile dossiers for 20 demo products with structured intelligence emission and source capture.
**Depends on**: Phase 1
**Plans**: 6/6 complete

Plans:
- [x] 02-01: Schema migration (does_not_solve column) + authority_rank backfill + product list discovery
- [x] 02-02: Compile 6 remaining category dossiers
- [x] 02-03: Compile HA Filler product dossiers
- [x] 02-04: Compile Biostimulator + Body Contouring product dossiers
- [x] 02-05: Compile Energy/RF + Energy/Laser + Skincare Actives + Dysport product dossiers
- [x] 02-06: End-of-batch reports

---

### Phase 3: retrieval-wiring
**Goal**: Wire the Research/Evidence tab from mock data to real evidence_links + agent_reference_docs.
**Depends on**: Phase 1, Phase 2
**Plans**: 4/4 complete

Plans:
- [x] 03-01: Wave 0 prep + env verification
- [x] 03-02: Retrieval engine: sources.ts + SSE route
- [x] 03-03: Client cutover: stream.ts + swap mock import
- [x] 03-04: End-to-end live UI verification

</details>

---

### 🚧 v2.0 Heidi Evidence Clone (In Progress)

**Milestone Goal:** Adapt Heidi Evidence Ask's proven UX patterns to A360's cool-tone brand — key points cards, structured fact tables, source bars, reliable badges, embed bridge, analytics — demo-ready by June 22, 2026.

#### Phase 4: answer-structure
**Goal**: Users see answers structured as Heidi-pattern content: a Key Points summary card at top, visually distinct section headers, and product fact tables / comparison tables rendered as accessible HTML.
**Depends on**: Phase 3
**Requirements**: ANS-01, ANS-02, ANS-03, ANS-04
**Success Criteria** (what must be TRUE):
  1. A Key Points card appears above the answer prose with 3-7 bulleted takeaways, each followed by inline authority badge(s)
  2. Section headings in the answer render as styled `<h3>` elements with clear visual separation from body text
  3. Markdown tables in LLM output render as `<table>` elements with headers, per-cell inline source badges, and readable column widths
  4. Tables on a narrow viewport (mobile) scroll horizontally without breaking the page layout
**Plans**: 2 plans

Plans:
- [x] 04-01-PLAN.md — KeyPointsCard + shared citation parser + KEY_POINTS extraction + h3 heading upgrade
- [ ] 04-02-PLAN.md — MarkdownTable component + table detection in AnswerMessage + visual checkpoint

---

#### Phase 5: source-display
**Goal**: Users see a trustworthiness hierarchy in the source list — a source count bar before the answer, "Reliable" green badges on high-trust sources, category pills on each reference card, and a consistent color system across every citation surface.
**Depends on**: Phase 4
**Requirements**: SRC-01, SRC-02, SRC-03, SRC-04, SRC-05
**Success Criteria** (what must be TRUE):
  1. A bar reading "N sources found" appears before the answer body with a "View sources" toggle that expands/collapses the reference list
  2. FDA, manufacturer label, and peer-reviewed/academic sources carry a green "Reliable" badge in the reference list
  3. Each reference card shows a category pill (Journal, Regulatory, Government Medical Authority, Manufacturer, Clinical Education, etc.)
  4. FDA/Manufacturer sources render in green tones, PubMed/Research in blue tones, and Industry/Podcast/Video in neutral across all citation surfaces (inline badges, hover cards, reference cards)
**Plans**: TBD

Plans:
- [ ] 05-01: SourceCountBar component + tier color token audit (green/blue/neutral mapping to OKLch tokens)
- [ ] 05-02: ReliableBadge + CategoryPill on reference cards; propagate tier colors to InlineAuthorityBadge + CitationHoverCard
**UI hint**: yes

---

#### Phase 6: embed-and-analytics
**Goal**: The /embed/ask surface can be safely iframed by Boulevard (and other allowlisted hosts), sends postMessage events the parent can act on, and every key user interaction fires a named analytics event to ask_log.
**Depends on**: Phase 3
**Requirements**: EMB-01, EMB-02, EMB-03, EMB-04, ANLY-01, ANLY-02, ANLY-03
**Success Criteria** (what must be TRUE):
  1. /embed/ask renders AskExperience without headline, nav, or footer, and accepts a transparent background
  2. The embed sends `a360:ready`, `a360:ask_sent`, `a360:answer_complete`, and `a360:resize` postMessage events at the correct lifecycle moments
  3. An iframe from an unlisted origin is rejected (CSP frame-ancestors blocks it); Boulevard demo host is allowlisted and loads cleanly
  4. `evidence_unauth_ask`, `evidence_answer_complete` (with latency_ms and citation_count), and `citation_click` events are recorded in ask_log on every qualifying interaction
**Plans**: TBD

Plans:
- [ ] 06-01: /embed/ask route verification + postMessage bridge implementation
- [ ] 06-02: CSP frame-ancestors middleware + EMBED_ALLOWED_ORIGINS env + Boulevard allowlist
- [ ] 06-03: Analytics event instrumentation (unauth_ask, answer_complete, citation_click)

---

#### Phase 7: trust-interaction-demo
**Goal**: All trust and compliance surfaces are verified working, follow-up pills and suggestion chips are polished to A360 brand spec, and the Boulevard demo scenario passes end-to-end without a script.
**Depends on**: Phase 4, Phase 5, Phase 6
**Requirements**: TRST-01, TRST-02, TRST-03, INTR-01, INTR-02, DEMO-01
**Success Criteria** (what must be TRUE):
  1. The persistent disclaimer bar is visible on every /ask and /embed/ask page load without blocking any content
  2. Clicking an inline citation badge either opens the hover card popover or scrolls to and highlights the matching reference card
  3. No answer contains an uncited claim about dosing, contraindications, safety, sequencing, pregnancy, complications, off-label use, or adverse events
  4. Follow-up suggestion pills render in A360 brand styling (bg-accent, cool-tone palette) and are clickable, seeding a new question
  5. `/ask?query=Can+Botox+and+filler+be+done+the+same+day` loads without login, auto-submits, streams a cited answer with Key Points card, section headers, at least one table, Reliable-badged references, visible disclaimer, and follow-up pills
**Plans**: TBD

Plans:
- [ ] 07-01: Trust surface audit — verify disclaimer, citation click behavior, uncited-claim guardrails in prompt
- [ ] 07-02: Interaction polish — follow-up pill A360 styling, suggestion chip verification
- [ ] 07-03: DEMO-01 end-to-end acceptance test

---

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. citations | v1.0 | 3/3 | Complete | 2026-06-12 |
| 2. dossier-batch | v1.0 | 6/6 | Complete | 2026-06-12 |
| 3. retrieval-wiring | v1.0 | 4/4 | Complete | 2026-06-12 |
| 4. answer-structure | v2.0 | 1/2 | In Progress|  |
| 5. source-display | v2.0 | 0/2 | Not started | - |
| 6. embed-and-analytics | v2.0 | 0/3 | Not started | - |
| 7. trust-interaction-demo | v2.0 | 0/3 | Not started | - |
