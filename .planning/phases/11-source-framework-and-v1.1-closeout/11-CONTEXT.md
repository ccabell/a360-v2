# Phase 11: Source Framework & v1.1 Close-Out - Context

**Gathered:** 2026-06-14
**Status:** Ready for planning
**Source:** Direct from v1.2 milestone planning conversation

<domain>
## Phase Boundary

Phase 11 does two things:
1. **Close out v1.1** — verify carry-forward items are done (PAIR-01, EVID-03, TIMING_REVIEW.md, SQL manifest execution)
2. **Revise the source classification model** — replace the binary "production-citable yes/no" in SOURCE_CLASSIFICATION.md with practical guidance on what each source type is good for. Document citation formats. Design the enrichment pipeline as a repeatable loop.

This phase does NOT create fuel documents, build the Evidence Ask UI, or populate sources. It establishes the framework that Phases 12-14 build on.

</domain>

<decisions>
## Implementation Decisions

### Source Classification Model
- Replace binary "production-citable: yes/no" with practical guidance per source type
- FDA labels / IFUs = authoritative for safety, indications, dosing
- PubMed = authoritative for clinical evidence, outcomes, timing
- Manufacturer data (videos, articles, training) = authoritative for product education, technique
- Industry articles (87K chunks in corpus) = useful context, expert perspectives, trends
- Podcasts = research/discovery layer only, never cited in production
- YouTube tiered: manufacturer channels = yes, board-certified physician educational = yes, influencer/unverified = no (research only)

### Citation Formats
- PubMed: PMID and/or DOI with URL
- FDA: accessdata.fda.gov URL
- YouTube: URL + timestamp
- IFU/manufacturer: page reference where available
- Industry articles: publication + author + year + URL
- Expert consensus: generic "expert consensus supports..." (no speaker attribution)

### Enrichment Pipeline
- Must be a repeatable loop, not a one-time build
- Loop: add new source → classify type → chunk into citable units → make searchable in vector DB → mark affected fuel docs for review
- Framework supports adding new YouTube channels, journals, manufacturer pages, IFUs, PubMed papers over time
- Agents have tools to search these sources at runtime for edge cases

### v1.1 Close-Out Items
- PAIR-01: Verify 06-02-canonical-common-inserts.sql was regenerated (10-02-PLAN completed per STATE.md)
- EVID-03: Phase 3 plan 03-04 live UI verification — needs browser testing (Chris action)
- TIMING_REVIEW.md: Needs Chris to close so approved decisions are saved (Chris action)
- SQL manifest execution: Execute pending SQL files against live Supabase using EXECUTION_MANIFEST.json (Chris action)

### Claude's Discretion
- Exact structure of the enrichment pipeline documentation
- How to organize the revised SOURCE_CLASSIFICATION.md (keep existing structure or restructure)
- Whether EVIDENCE_MODEL.md needs updates or just SOURCE_CLASSIFICATION.md
- Level of detail in citation format specifications

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Source Classification (being revised)
- `.planning/phases/09-podcast-data-strategy-and-evidence-provenance/SOURCE_CLASSIFICATION.md` — Current binary classification to be replaced
- `.planning/phases/09-podcast-data-strategy-and-evidence-provenance/EVIDENCE_MODEL.md` — Two-layer evidence model (may need updates)
- `.planning/phases/09-podcast-data-strategy-and-evidence-provenance/PODCAST_WORKFLOW.md` — Podcast-to-production workflow

### v1.1 Carry-Forward Items
- `supabase/EXECUTION_MANIFEST.json` — SQL execution tracking, pending files to execute
- `.planning/REQUIREMENTS.md` — PAIR-01 and EVID-03 status tracking

### v1.2 Milestone Plan
- `C:\Users\Chris\.claude\plans\bright-munching-harbor.md` — Approved v1.2 plan with architecture decisions

</canonical_refs>

<specifics>
## Specific Ideas

- The enrichment pipeline documentation should include a concrete example walkthrough (e.g., "Adding a new Galderma IFU" or "Adding a new YouTube channel")
- SOURCE_CLASSIFICATION.md should keep the decision tree format but update it for the new model
- The three human-action items (EVID-03, TIMING_REVIEW.md, SQL execution) should be documented as checkpoints, not automated tasks — they require Chris to act

</specifics>

<deferred>
## Deferred Ideas

- Practice-level source overrides (post-v1.2)
- Source registry database schema (if needed — may not be needed for v1.2)
- Automated source ingestion pipeline code (v1.2 documents the loop; implementation comes later)
- Evidence Ask product surface (separate workstream)

</deferred>

---

*Phase: 11-source-framework-and-v1.1-closeout*
*Context gathered: 2026-06-14 from v1.2 planning conversation*
