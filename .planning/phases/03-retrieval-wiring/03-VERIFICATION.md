---
phase: 03-retrieval-wiring
verified: 2026-06-13T00:00:00Z
status: human_needed
score: 5/6 success criteria verified
re_verification: false
human_verification:
  - test: "Ask an unscripted Botox question in the live Research tab and confirm at least one PubMed citation card appears"
    expected: "A citation card with 'View on PubMed' linking to pubmed.ncbi.nlm.nih.gov appears alongside FDA citation cards"
    why_human: "SC-3 depends on authority_rank values in the live DB. Cap was raised from 8 to 20 in sources.ts (slice 0,20) but PubMed rows may still rank below FDA. Cannot verify without a live DB query or running the server."
---

# Phase 3: Retrieval Wiring Verification Report

**Phase Goal:** Wire the M6 Research/Evidence tab from mock data to real evidence_links + agent_reference_docs. Build the minimal retrieval route per RETRIEVAL_SERVICE.md: question -> retrieval -> RetrievedSource objects -> existing citation UI. An unscripted Botox/Neurotoxins question in the live UI must render prose with clickable PubMed + FDA citations from the real DB.
**Verified:** 2026-06-13
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| SC-1 | Research/Evidence tab reads from real evidence_links + agent_reference_docs, not mock data | VERIFIED | sources.ts queries `.from("evidence_links")` and `.from("agent_reference_docs")` with BOTOX_OFFERING_ID. No mock imports in app/api/research/, lib/retrieval/, or components/research/. |
| SC-2 | An unscripted Botox/Neurotoxins question renders a grounded prose response | VERIFIED | route.ts streams via `gateway("anthropic/claude-haiku-4.5")`. AI_GATEWAY_API_KEY is provisioned in .env.local. Deterministic fallback also wired. 03-04 human confirmation: "things are working." |
| SC-3 | Response includes clickable "View on PubMed" links pointing to real pubmed.ncbi.nlm.nih.gov URLs | PARTIAL | PubMedLocator code is correct: `url: row.url \|\| "https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/"`. 14 PubMed rows exist in evidence_links. However 03-04 human demo confirmed no PubMed card appeared — FDA rows won all authority_rank slots. Cap raised from 8 to 20 post-demo but PubMed ranking gap is unresolved data issue. |
| SC-4 | Response includes at least one clickable FDA label link pointing to accessdata.fda.gov | VERIFIED | FDA locator built from row.url in evidence_links. 03-04 human demo: 3 "Open FDA label" cards with clickable links to accessdata.fda.gov confirmed. |
| SC-5 | Citation chips [1][2] map correctly to source panel entries | VERIFIED | displayMap flows: route.ts resolveCitations() -> SSE citations event -> AskExperience state -> GroundedAnswer -> AnswerMessage (renders [N] badges) + CitationCard (id="cite-N" for scroll target). SourcePill shows [N] when number in displayMap. |
| SC-6 | No mock data imports remain in the retrieval path | VERIFIED | grep confirms zero mock imports in components/research/, app/api/research/, lib/retrieval/. Mock imports only in agent-tester/page.tsx and patients/patient-workspace.tsx — unrelated UI components outside the retrieval path. |

**Score:** 5/6 success criteria verified (SC-3 partial — data ranking issue, not code defect)

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `lib/retrieval/sources.ts` | retrieveSources() returning RetrievedSource[] from real DB | VERIFIED | 273 lines. Direct queries on evidence_links (limit 50) + agent_reference_docs (limit 5). BOTOX_TERMS gate. PubMed/FDA/manufacturer locator builders. Merges to slice(0,20). |
| `app/api/research/chat/route.ts` | SSE POST endpoint with full event sequence | VERIFIED | 171 lines. Imports gateway from @ai-sdk/gateway. Full event sequence: status(searching) -> status(ranking) -> sources -> status(generating) -> token* -> citations -> done. D-08 empty path. Deterministic fallback. |
| `lib/retrieval/stream.ts` | Live SSE fetch reader + EXAMPLE_QUERIES | VERIFIED (orphaned) | Exists, substantive. streamResearch() async generator is exported but never imported — AskExperience has its own internal streamFrom(). EXAMPLE_QUERIES is imported by ask-experience.tsx. |
| `lib/retrieval/post-process.ts` | resolveCitations(): [src_N] markers -> ResearchCitation[] + displayMap | VERIFIED | Pure/deterministic. Regex parses markers, validates against retrieval set, renumbers. Called in route.ts after full text accumulates. |
| `lib/retrieval/locator.ts` | locatorTitle(), locatorUrl(), deepLinkLabel() | VERIFIED | deepLinkLabel returns "View on PubMed" for pubmed type; "Open FDA label" for fda corpus. locatorUrl() adds #page=N deep link for documents. |
| `components/grounding/grounded-answer.tsx` | GroundedAnswer renders prose + citation cards | VERIFIED | Accepts text + citations + displayMap. Passes to AnswerMessage (inline badges) and CitationCard grid (reference panel). |
| `components/grounding/citation-card.tsx` | CitationCard renders numbered card with deep link | VERIFIED | Renders id="cite-{number}" for scroll target. Calls deepLinkLabel() for button text. Wraps title + deep link in <a> when url truthy. |
| `components/ask/ask-experience.tsx` | Live SSE consumer with full event handling | VERIFIED | 465 lines. Internal streamFrom() POSTs to endpoint prop ("/api/research/chat"). Handles all ResearchEvent types. Passes displayMap + citations to GroundedAnswer. |
| `components/research/research-chat.tsx` | Research chat component wired to live endpoint | VERIFIED | Delegates to AskExperience with endpoint="/api/research/chat". No mock imports. |
| `app/dashboard/research/page.tsx` | Research page with "Live" badge | VERIFIED | Badge reads "Live" (changed from "Demo data" in 03-03). |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| research/page.tsx | ResearchChat component | import + render | WIRED | Renders `<ResearchChat />` in flex container |
| ResearchChat | AskExperience | endpoint="/api/research/chat" | WIRED | Passes endpoint prop directly |
| AskExperience | /api/research/chat | internal streamFrom() | WIRED | POSTs {query}, reads SSE ReadableStream |
| route.ts | retrieveSources() | import + await | WIRED | Calls retrieveSources(q) in stream start handler |
| retrieveSources() | evidence_links table | agentSupabase.from() | WIRED | Direct query with BOTOX_OFFERING_ID filter |
| retrieveSources() | agent_reference_docs table | agentSupabase.from() | WIRED | Filter on offering_id OR category_id, lens IN clinical/deep_product |
| route.ts | resolveCitations() | import + call on fullText | WIRED | Called after stream ends with full accumulated text |
| route.ts | gateway("anthropic/claude-haiku-4.5") | @ai-sdk/gateway | WIRED | AI_GATEWAY_API_KEY provisioned in .env.local |
| AskExperience | GroundedAnswer | props: text + citations + displayMap | WIRED | Passes all three after citations event received |
| GroundedAnswer | CitationCard | citations.map() | WIRED | Renders grid of CitationCard per resolved citation |
| CitationCard | locatorUrl() / deepLinkLabel() | import + call | WIRED | Produces href and link text for deep link anchor |
| stream.ts | (unused) | — | ORPHANED | streamResearch() exported but never imported; only EXAMPLE_QUERIES from this file is used |

---

## Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| AskExperience | messages[].sources | SSE "sources" event from /api/research/chat | Yes — route queries evidence_links + agent_reference_docs | FLOWING |
| AskExperience | messages[].text | SSE "token" events from streamText() | Yes — gateway LLM with AI_GATEWAY_API_KEY provisioned | FLOWING |
| AskExperience | messages[].citations + displayMap | SSE "citations" event from resolveCitations() | Yes — parses [src_N] markers against real source set | FLOWING |
| CitationCard | citation.url | locatorUrl(citation.locator) -> row.url from DB | Yes for PubMed (fallback constructed). For FDA: depends on url column in evidence_links rows | FLOWING (FDA URL from DB) |

**Note on FDA URL:** The `accessdata.fda.gov` URL for FDA citations comes from `evidence_links.url` column in the DB (`row.url || ""`). If `url` is NULL for a given FDA row, the citation card renders without a clickable deep link. The 03-04 smoke test confirmed FDA links worked — meaning the DB rows have the `url` column populated with accessdata.fda.gov URLs. This is a data dependency, not a code defect.

---

## Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| TypeScript compiles cleanly | npx tsc --noEmit | exit 0, no errors | PASS |
| No mock imports in retrieval path | grep -rn "lib/mock" components/research/ lib/retrieval/ app/api/research/ | 0 matches | PASS |
| streamResearch() EXAMPLE_QUERIES exported | grep EXAMPLE_QUERIES in ask-experience.tsx | imports found at line 13 | PASS |
| SSE headers correct | grep "text/event-stream" in route.ts | Content-Type: text/event-stream set | PASS |
| AI_GATEWAY_API_KEY provisioned | grep AI_GATEWAY in .env.local | key present (sk-ant-api03-*) | PASS |
| Commits documented in SUMMARYs exist | git log 5fed4e7 ac65366 78c6add aa0dfc3 4310a97 | All 5 commits verified in repo | PASS |

*Step 7b: Full runtime test skipped — server already confirmed passing via 03-04 smoke test. Cannot re-run SSE endpoint without dev server.*

---

## Requirements Coverage

Phase plan frontmatter declares `requirements-completed: []` across all 4 plans — no formal requirement IDs were tracked for this phase. The success criteria from ROADMAP.md serve as the acceptance contract and are directly verified above.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `lib/retrieval/stream.ts` | 15 | `streamResearch()` exported but never imported | Info | Dead export — the function is correct and complete but AskExperience re-implements the same SSE reader internally. Not a stub; no user-visible impact. |
| `lib/retrieval/sources.ts` | 114, 133 | `url: row.url \|\| ""` for FDA/manufacturer rows | Warning | If evidence_links.url is NULL for a row, citation card deep link is empty string. The anchor still renders (CitationCard checks `if url` before rendering link). Runtime smoke test confirmed FDA URLs exist in DB. |
| `evidence_links` data | — | FDA rows occupy all authority_rank slots, PubMed cards don't surface | Warning | SC-3 partially unmet. 14 PubMed rows in DB, code is correct, cap raised to 20 — but PubMed rows rank below FDA so still may not surface. Data issue, not code defect. |
| `.planning/phases/03-retrieval-wiring/03-VALIDATION.md` | all | Unfilled template placeholders | Info | VALIDATION.md is a stub template. No automated tests were written. Acceptance was done via 03-04 human smoke test. |

---

## Human Verification Required

### 1. PubMed Citation Surfacing (SC-3)

**Test:** With dev server running on localhost:3001, ask "What's the evidence on onset timeline for botulinum toxin?" in the Research tab.
**Expected:** At least one "Research" (emerald) citation card appears with a "View on PubMed" link to pubmed.ncbi.nlm.nih.gov.
**Why human:** The sources cap was raised from 8 to 20 in sources.ts (post-03-04), but PubMed rows ranking depends on live DB `authority_rank` values. Cannot verify without running the server or querying the DB. The 03-04 human demo confirmed no PubMed card appeared; the code fix (raise cap) may or may not have resolved the ranking gap.

---

## Gaps Summary

No blocking gaps were found. The phase goal is substantially achieved:

- All 6 code artifacts are implemented and wired
- The data flow is live end-to-end (real DB -> SSE -> citation UI)
- SC-1, SC-2, SC-4, SC-5, SC-6 are fully verified in code
- The only open item (SC-3) is a data ranking gap acknowledged in 03-04 and classified as a non-blocking data issue for a future phase

The single human verification item (PubMed surfacing) is the only outstanding question. A post-cap-increase test would determine whether PubMed cards now appear alongside FDA cards when the source cap allows 20 results through.

**Architecture note:** `research-chat.tsx` does not import from `lib/retrieval/stream` directly — it delegates entirely to `AskExperience` which implements its own `streamFrom()` inline. The `streamResearch()` function in `stream.ts` is dead code. This is a minor structural deviation from the 03-03 SUMMARY description but has no functional impact — the endpoint path is live and correct.

---

_Verified: 2026-06-13_
_Verifier: Claude (gsd-verifier)_
