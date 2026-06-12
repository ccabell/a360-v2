# Phase 1: citations - Context

**Gathered:** 2026-06-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Fix the evidence_links data gaps in Supabase project `aejskvmpembryunnbgrk` and wire the compile pipeline to always capture citation locators going forward, so the M6 Research/Evidence tab renders real clickable citations (PubMed, FDA label, YouTube) by June 22, 2026.

**NOT in scope:** UI changes (Research tab citation renderer already built). New retrieval service architecture (spec'd in RETRIEVAL_SERVICE.md — not yet built). Podcast citations (v1 = no podcasts). Patient-facing citations (sales_education lens = no citations).

</domain>

<decisions>
## Implementation Decisions

### FDA Label Linking
- **D-01:** Use public FDA Access Data URLs (`https://www.accessdata.fda.gov/drugsatfda_docs/label/...`) directly in `evidence_links.url`. No PDF upload to Supabase Storage needed. This matches what the mock already uses.
- **D-02:** Research FDA Access Data URLs for all 12 products with fda_label rows (Botox Cosmetic, Xeomin, Skinvive, Juvéderm VOLUX/VOLBELLA/VOLLURE/VOLUMA/Ultra/Ultra XC/Ultra Plus XC/Ultra XC Lips, Kybella, Dysport). Provide a gap analysis — Chris fills in any that can't be auto-found.
- **D-03:** Add `page_number INT` column to `evidence_links` for FDA deep-link support (even if populating page numbers comes later — the column needs to exist now).

### PubMed PMID Backfill
- **D-04:** Run as a local Node.js one-shot script. Script reads all evidence_links rows where `source = 'pubmed'` and `pmid IS NULL` and `doi IS NOT NULL`, calls CrossRef API (`https://api.crossref.org/works/{doi}`) for each, extracts PMID, writes `pmid` and `url = 'https://pubmed.ncbi.nlm.nih.gov/{pmid}/'` back to Supabase.
- **D-05:** 3 PMIDs already populated (27100962, 15871314, 16532442) — script skips those. 11 rows need lookup.
- **D-06:** If CrossRef can't resolve a DOI → log it, skip it, include in gap report. Don't block on unresolvable DOIs.

### YouTube Timestamps
- **D-07:** YouTube timestamps ARE in CMS Supabase (`gjqicqldjgvrwmtkliie`). Table: `manufacturer_youtube_transcript`, columns `start_time` (numeric) and `end_time` (numeric). Evidence_links already have video-level URLs.
- **D-08:** Approach: for each evidence_link with `source = 'youtube'`, extract `video_id` from the URL, query `manufacturer_youtube_transcript` WHERE `video_id = ?` and match on snippet text similarity, get `start_time`, update `evidence_links.url` to `https://www.youtube.com/watch?v={video_id}&t={start_time_rounded_to_int}s`.
- **D-09:** This can run as part of the same local script as the PubMed backfill, or as a second script. Either is fine.

### Demo Scope
- **D-10:** All three source types must work for the June 22 demo: PubMed clickable, FDA label clickable, YouTube with timestamps. The demo is the full OpenEvidence story.
- **D-11:** The 6 YouTube rows and 14 PubMed rows are manageable in one pass. The 47 FDA label rows are the biggest volume but mostly mechanical (URL lookup + insert).

### Compile Pipeline Update
- **D-12:** Add one paragraph to `DOSSIER_COMPILE_PIPELINE.md` STEP 4 instructing: for all new evidence_links inserts, always capture `pmid`, `doi`, `url` (constructed), `page_number` (for FDA). This is a prompt/doc update, not a code change.

### What Does NOT Need Changing
- The Research tab UI — already built and rendering correctly from mock data.
- The `Citation` type in `components/citations/types.ts` — already has all needed fields.
- The `SourceLocator` types in `lib/types/retrieval.ts` — fully spec'd.
- The `content_md` prose — no IDs embedded there; wiring happens at query time.

### Claude's Discretion
- Node.js script structure (single script vs. two scripts, error handling approach)
- Whether to use Supabase JS client or REST API for the backfill scripts
- Text matching approach for YouTube snippet → chunk matching (exact, fuzzy, or vector)
- Order of operations within the scripts

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Session Handoff (locked decisions from prior session)
- `HANDOFF_CITATIONS.md` — Full context: what was built, what's decided, evidence_links gaps, demo deadline

### Citation Architecture
- `Fable Docs/RETRIEVAL_SERVICE.md` — Full citation pipeline spec: SourceLocator shapes per corpus (PubMedLocator, YouTubeLocator, DocumentLocator), post-processor, streaming SSE protocol, §10 YouTube timestamp note
- `lib/types/retrieval.ts` — TypeScript types for SourceLocator (already implemented, matches spec)
- `components/citations/types.ts` — Citation type used by UI components
- `lib/mock/research-data.ts` — Mock data showing correct citation structure including FDA URL pattern

### Compile Pipeline
- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md` — Master compile prompt; STEP 4 needs citation locator capture paragraph added

### Posture Docs (context only)
- `Fable Docs/GATEWAY_POSTURE_ADDENDUM.md` — Clinical lens posture (no precise dosing tables)
- `Fable Docs/SALES_EDUCATION_PRIORITY_ADDENDUM.md` — sales_education = PRIMARY lens, no citations

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/citations/` — Full citation rendering system: `inline-citation-badge.tsx`, `message-with-citations.tsx`, `reference-card.tsx`, `references-section.tsx`, `types.ts` — already complete, don't touch
- `components/grounding/` — `grounded-answer.tsx`, `citation-card.tsx`, `inline-citation.tsx` — alternate citation rendering, already built
- `lib/mock/research-data.ts` — Shows exactly how `RetrievedSource` objects should look for each corpus type; the FDA URL pattern here (`accessdata.fda.gov/drugsatfda_docs/label/2023/103000s5326lbl.pdf`) is the target pattern for evidence_links.url
- `lib/types/retrieval.ts` — `PubMedLocator`, `YouTubeLocator`, `DocumentLocator` types already match what we're building toward

### Established Patterns
- The app uses Supabase JS client (`@supabase/supabase-js`) for DB access — use same client in scripts
- Citation data flows: evidence_links (DB) → retrieval service (planned) → RetrievedSource → Citation → UI components

### Integration Points
- `evidence_links` table in Supabase `aejskvmpembryunnbgrk` — the actual DB being updated
- `manufacturer_youtube_transcript` in CMS Supabase `gjqicqldjgvrwmtkliie` — has `start_time`/`end_time` columns for timestamp lookup
- `DOSSIER_COMPILE_PIPELINE.md` — the document prompt that drives all future evidence_links inserts

### Actual Evidence Links State (queried 2026-06-12)
| Source | Count | Has PMID | Has URL |
|--------|-------|----------|---------|
| pubmed | 14 | 3 | 0 |
| youtube | 6 | n/a | 6 (video-level, no timestamp) |
| fda_label | 47 | n/a | 0 |
| ifu | 2 | n/a | 0 |

**Total rows to fix: 69**

Products with fda_label rows: Botox Cosmetic, Xeomin, Skinvive, Juvéderm VOLUX XC, VOLBELLA XC, VOLLURE XC, VOLUMA XC, Ultra, Ultra XC, Ultra XC Lips, Ultra Plus XC, Kybella, Dysport.

</code_context>

<specifics>
## Specific Ideas

- **FDA URL mock as reference**: `https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/103000s5326lbl.pdf` is in `lib/mock/research-data.ts` for Botox Cosmetic. Use this as the pattern to verify the real URL.
- **CrossRef API endpoint**: `https://api.crossref.org/works/{doi}` — returns metadata including external IDs. PMID is in `external-ids` as type `PMID`.
- **CMS Supabase project ID**: `gjqicqldjgvrwmtkliie` (confirmed by user)
- **Agent Manager Supabase project ID**: `aejskvmpembryunnbgrk` (all GL/dossier data)
- **YouTube deep-link format**: `https://www.youtube.com/watch?v={video_id}&t={start_time_int}s`
- **Gap analysis delivery**: For FDA URLs that can't be auto-found, produce a list with product name + what was found/not found for Chris to fill in manually.

</specifics>

<deferred>
## Deferred Ideas

- **Supabase Storage for FDA PDFs** — Initially planned in HANDOFF_CITATIONS.md but superseded by public FDA Access URLs. May revisit for offline/air-gapped use cases.
- **Podcast citations** — Explicitly deferred to v2. No citation links for podcasts in v1.
- **Page number population** — Column is being added (D-03) but actually populating page numbers for all 47 FDA rows is a separate task. The column exists; numbers can be added incrementally.
- **Full retrieval service** — The RETRIEVAL_SERVICE.md spec is the target architecture. This phase only fixes data gaps; the full service (real-time retrieval, src_N resolution, SSE streaming) is a larger build.

</deferred>

---

*Phase: 01-citations*
*Context gathered: 2026-06-12*
