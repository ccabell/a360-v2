# QA Report: Vercel Preview (feat-wse-integration)

**Date:** 2026-06-14
**URL:** `https://a360-v2-git-feat-wse-integration-chris-projects-a3d3bc4c.vercel.app`
**Method:** API-level testing via curl/WebFetch + code review (no Playwright/browser — client-rendered pages can't be fully tested via HTTP)

---

## Beat 1 — Patient Experience

| # | Test | Result | Evidence |
|---|------|--------|----------|
| 1 | `/dashboard/patients` → 20 patients load | **PASS** | API returns `{ data: [...20 patients], total: 20 }` |
| 2 | Sofia Reyes present | **PASS** | ID `3f7bfaf1-b60a-4afd-ae8b-1e82244a2180` |
| 3 | Amara Okafor present | **PASS** | ID `0c6053d5-6851-4542-898e-9e8f4a6efc53` |
| 4 | David Park (3ac2a933) present | **PASS** | ID `3ac2a933-6973-443a-a65f-9a2cebf1161e` |
| 5 | Patient info card renders | **PASS (code)** | `patient-workspace.tsx` lines 142-172 |
| 6 | Consultation card with "Verified extraction" badge | **PASS (code)** | Line 206: `{t.extraction?.is_verified && <span>Verified extraction</span>}` |
| 7 | Evidence-anchored view (side-by-side) | **PASS (code)** | `ConsultationIntelligence` renders when both transcript + extraction exist |
| 8 | Fact-click → scroll to highlight | **PASS (code)** | `selectFromField` / `selectFromTranscript` functions wired |
| 9 | Sofia: full data depth | **PASS** | 37-min transcript, 2-pass extraction, 16 agent outputs |
| 10 | Amara: full data depth | **PASS** | 30-min transcript, extraction, 2 orchestrator reports |
| 11 | David: full data depth | **PASS** | 42-min transcript, extraction, 2 orchestrator reports |

**Caveat:** Items marked "PASS (code)" verified via code review, not browser rendering. WebFetch sees "Loading patient..." because the workspace is client-rendered.

---

## Beat 2 — Agent Report

| # | Test | Result | Evidence |
|---|------|--------|----------|
| 1 | Sofia — agent outputs exist | **PASS** | 16 outputs across 4 agent types (orchestrator, clinical_enrichment, package_recommender, consultation_summarizer) |
| 2 | Amara — agent outputs exist | **PASS** | 2 orchestrator reports with PubMed citations |
| 3 | David — agent outputs exist | **PASS** | 2 orchestrator reports, 23+ PubMed citations |
| 4 | "Run Post-Consultation Analysis" button | **PASS (code)** | `AgentReport` component with `RunAgentButton`, calls `/api/patients/{id}/workflow` |
| 5 | Non-canonical patient → no cached analysis | **PASS** | Katherine Chen agent-outputs returns `[]` |
| 6 | Report sections render | **PASS (code)** | Executive Summary, Package Recommendation, Clinical Evidence, Next Steps |
| 7 | PMID chips link to PubMed | **PASS (code)** | Links to `pubmed.ncbi.nlm.nih.gov` |

---

## Beat 3 — Evidence Ask

| # | Test | Result | Evidence |
|---|------|--------|----------|
| 1 | "Morpheus8 vs microneedling" → streaming answer | **PASS** | SSE stream returns 10+ sources with vector similarity scores |
| 2 | ≥2 corpus types in citations | **PASS** | PubMed (PMIDs 35426044, 33538106, 37858631, etc.) + YouTube (K3m2FFaKek8) |
| 3 | Real PubMed PMIDs (not fake) | **PASS** | All PMIDs resolve to real papers |
| 4 | "chocolate cake recipe" → honest decline | **FAIL — 500 ERROR** | Server returns HTML 500 error page instead of graceful decline |
| 5 | `/embed/ask` → chrome-less embed | **PASS** | Stripped-down page with no navigation, just title + disclaimer |
| 6 | `/ask` page loads | **PASS** | Shows "Ask anything about aesthetic medicine" with suggestion tabs |

### 500 Error Details

- Route: `/api/research/chat`
- Input: `{"query":"chocolate cake recipe"}`
- Expected: SSE stream with "No grounded sources found" message
- Actual: HTTP 500 with Next.js error page
- Root cause: `isInScope()` correctly returns false → `retrieveSources()` returns `{ sources: [], knowledge: "" }` → likely unhandled null/empty in downstream code
- Note: The `/api/ask` route handles this correctly with `nearestTopics()` suggestions

---

## Dashboard Overview (Bonus Check)

| # | Test | Result | Evidence |
|---|------|--------|----------|
| 1 | Dashboard metrics are real data | **FAIL — ALL HARDCODED** | `dashboard/page.tsx` lines 30-57: static arrays for consult volume, goals, recent consults, opportunities. Comment at line 26: "Demo data. Replace with live metrics." |

---

## Summary

| Beat | Tests | Pass | Fail | Pass Rate |
|------|-------|------|------|-----------|
| Beat 1 — Patient Experience | 11 | 11 | 0 | 100% |
| Beat 2 — Agent Report | 7 | 7 | 0 | 100% |
| Beat 3 — Evidence Ask | 6 | 5 | 1 | 83% |
| Dashboard (bonus) | 1 | 0 | 1 | 0% |

**Critical fix needed:** `/api/research/chat` 500 error on off-topic queries.

**Cannot fully verify (need Playwright):** UI rendering, stepper animation, fact-click-to-scroll, PMID chip clicks, streaming display.
