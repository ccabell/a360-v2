# Phase 1: citations - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-12
**Phase:** 01-citations
**Areas discussed:** FDA label linking, PMID backfill execution, YouTube timestamps scope, Demo scope for June 22

---

## FDA Label Linking

| Option | Description | Selected |
|--------|-------------|----------|
| Public FDA Access URLs | Use accessdata.fda.gov URLs directly. Already in mock. Works today. No upload needed. | ✓ |
| Ingest to Supabase Storage | Upload PDFs to Supabase Storage, store storage URL. More control but days of extra work. | |
| DailyMed public URLs | Use dailymed.nlm.nih.gov instead. No deep-link to page. | |

**User's choice:** Public FDA Access URLs
**Notes:** "DO whatever you can to get them, give me a gap analysis and I will fill in what you can't find" — meaning: auto-research the FDA Access Data URLs for all 12 products, deliver a gap analysis for any that can't be found automatically.

---

## PMID Backfill Execution

| Option | Description | Selected |
|--------|-------------|----------|
| Local Node.js script | One-shot script: read null-pmid rows, call CrossRef API, write pmid+url back. ~30 lines. | ✓ |
| Supabase Edge Function | Deploy trigger/HTTP function. More formal, deploy overhead for one-time op. | |
| Manual lookup + SQL | Look up each DOI manually. Fine for 5-10 rows, tedious for 23+. | |

**User's choice:** Local Node.js script

---

## YouTube Timestamps Scope

| Option | Description | Selected |
|--------|-------------|----------|
| In scope — CMS project provided | User provided CMS Supabase ID: gjqicqldjgvrwmtkliie | ✓ |
| Defer to after June 22 | Skip for demo | |

**User's choice:** In scope
**Notes:** User clarified: "WE have the youtube timestamps already. They exist." — Confirmed via DB query: `manufacturer_youtube_transcript` table in CMS Supabase has `start_time` (numeric) and `end_time` (numeric) columns. The 6 evidence_link YouTube rows have video-level URLs; we need to match snippets to chunks to get start_time and add ?t=N to the URL.

---

## Demo Scope for June 22

| Option | Description | Selected |
|--------|-------------|----------|
| All 3 source types working | PubMed clickable + FDA clickable + YouTube with timestamps. Full OpenEvidence story. | ✓ |
| PubMed + FDA only | Skip YouTube timestamps. | |
| At least one of each for demo | Minimal backfill, just demo-relevant rows. | |

**User's choice:** All 3 source types working

---

## Claude's Discretion

- Node.js script structure and error handling approach
- Supabase JS client vs REST API for backfill
- YouTube snippet → chunk matching approach (exact, fuzzy, or vector)
- Order of operations within scripts

## Deferred Ideas

- Supabase Storage PDF ingestion — superseded by public FDA Access URLs
- Podcast citations — explicitly deferred to v1 (no podcast citation links)
- Populating page_number values — column being added but actual page numbers deferred
- Full retrieval service build — RETRIEVAL_SERVICE.md is the spec; this phase only fixes data
