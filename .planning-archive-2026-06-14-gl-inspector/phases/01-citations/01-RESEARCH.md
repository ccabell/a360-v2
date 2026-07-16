# Phase 1: citations - Research

**Researched:** 2026-06-12
**Domain:** Supabase data backfill + pipeline doc update (Node.js scripts, CrossRef API, FDA Access Data URLs, YouTube timestamp matching)
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**FDA Label Linking**
- D-01: Use public FDA Access Data URLs (`https://www.accessdata.fda.gov/drugsatfda_docs/label/...`) directly in `evidence_links.url`. No PDF upload to Supabase Storage needed. This matches what the mock already uses.
- D-02: Research FDA Access Data URLs for all 12 products with fda_label rows (Botox Cosmetic, Xeomin, Skinvive, Juvéderm VOLUX/VOLBELLA/VOLLURE/VOLUMA/Ultra/Ultra XC/Ultra Plus XC/Ultra XC Lips, Kybella, Dysport). Provide a gap analysis — Chris fills in any that can't be auto-found.
- D-03: Add `page_number INT` column to `evidence_links` for FDA deep-link support (even if populating page numbers comes later — the column needs to exist now).

**PubMed PMID Backfill**
- D-04: Run as a local Node.js one-shot script. Script reads all evidence_links rows where `source = 'pubmed'` and `pmid IS NULL` and `doi IS NOT NULL`, calls CrossRef API (`https://api.crossref.org/works/{doi}`) for each, extracts PMID, writes `pmid` and `url = 'https://pubmed.ncbi.nlm.nih.gov/{pmid}/'` back to Supabase.
- D-05: 3 PMIDs already populated (27100962, 15871314, 16532442) — script skips those. 11 rows need lookup.
- D-06: If CrossRef can't resolve a DOI → log it, skip it, include in gap report. Don't block on unresolvable DOIs.

**YouTube Timestamps**
- D-07: YouTube timestamps ARE in CMS Supabase (`gjqicqldjgvrwmtkliie`). Table: `manufacturer_youtube_transcript`, columns `start_time` (numeric) and `end_time` (numeric). Evidence_links already have video-level URLs.
- D-08: Approach: for each evidence_link with `source = 'youtube'`, extract `video_id` from the URL, query `manufacturer_youtube_transcript` WHERE `video_id = ?` and match on snippet text similarity, get `start_time`, update `evidence_links.url` to `https://www.youtube.com/watch?v={video_id}&t={start_time_rounded_to_int}s`.
- D-09: This can run as part of the same local script as the PubMed backfill, or as a second script. Either is fine.

**Demo Scope**
- D-10: All three source types must work for the June 22 demo: PubMed clickable, FDA label clickable, YouTube with timestamps. The demo is the full OpenEvidence story.
- D-11: The 6 YouTube rows and 14 PubMed rows are manageable in one pass. The 47 FDA label rows are the biggest volume but mostly mechanical (URL lookup + insert).

**Compile Pipeline Update**
- D-12: Add one paragraph to `DOSSIER_COMPILE_PIPELINE.md` STEP 4 instructing: for all new evidence_links inserts, always capture `pmid`, `doi`, `url` (constructed), `page_number` (for FDA). This is a prompt/doc update, not a code change.

**What Does NOT Need Changing**
- The Research tab UI — already built and rendering correctly from mock data.
- The `Citation` type in `components/citations/types.ts` — already has all needed fields.
- The `SourceLocator` types in `lib/types/retrieval.ts` — fully spec'd.
- The `content_md` prose — no IDs embedded there; wiring happens at query time.

### Claude's Discretion
- Node.js script structure (single script vs. two scripts, error handling approach)
- Whether to use Supabase JS client or REST API for the backfill scripts
- Text matching approach for YouTube snippet → chunk matching (exact, fuzzy, or vector)
- Order of operations within the scripts

### Deferred Ideas (OUT OF SCOPE)
- Supabase Storage for FDA PDFs — initially planned in HANDOFF_CITATIONS.md but superseded by public FDA Access URLs. May revisit for offline/air-gapped use cases.
- Podcast citations — explicitly deferred to v2. No citation links for podcasts in v1.
- Page number population — column is being added (D-03) but actually populating page numbers for all 47 FDA rows is a separate task. Column exists; numbers can be added incrementally.
- Full retrieval service — RETRIEVAL_SERVICE.md spec is the target architecture. This phase only fixes data gaps; the full service (real-time retrieval, src_N resolution, SSE streaming) is a larger build.
</user_constraints>

---

## Summary

Phase 1 is a pure data + pipeline-doc phase with no UI changes. All three citation source types (PubMed, FDA label, YouTube) are already rendered by the UI; only the underlying `evidence_links` rows are missing URL/PMID/timestamp fields. The work breaks into four discrete tasks: (1) add a schema column, (2) backfill PubMed PMID+URL via CrossRef, (3) backfill FDA URLs via researched FDA Access Data links, (4) update YouTube evidence_links URLs with timestamps by matching snippets to CMS transcript chunks. A fifth task updates the `DOSSIER_COMPILE_PIPELINE.md` doc so future inserts are born complete.

The entire phase is achievable in 1-2 days of focused execution. The 47 FDA label rows are the highest volume but the logic is mechanical (URL lookup table). PubMed is the most automated (CrossRef API). YouTube is the most algorithmically interesting (snippet-to-chunk matching).

**Primary recommendation:** Write two Node.js scripts (one for PubMed+YouTube backfill, one that outputs the FDA URL gap analysis table), then apply the schema migration and doc update. Scripts run locally against both Supabase projects via `@supabase/supabase-js` with service keys from `.env.local`.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@supabase/supabase-js` | 2.108.1 (already in package.json) | Read/write both Supabase projects | Already the project's DB client; same client works in scripts |
| Node.js built-in `fetch` | Node 18+ (project runs 24.12.0) | CrossRef API calls | No extra dependency needed; Node 18+ has global fetch |
| CrossRef REST API | Public, no key required | DOI → PMID lookup | Official academic metadata service; handles PubMed ID resolution |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `tsx` | Not yet installed | Run TypeScript scripts without compile step | Use if scripts are written in TypeScript for type safety |
| `dotenv` | Not yet installed | Load `.env.local` in standalone scripts | Scripts run outside Next.js, so process.env won't auto-populate |

**Installation for scripts (if TypeScript + dotenv approach chosen):**
```bash
npm install --save-dev tsx dotenv
```

**Version verification:** `@supabase/supabase-js` at 2.108.1 confirmed in `package.json`.

---

## Architecture Patterns

### Recommended Project Structure
```
scripts/
├── backfill-citations.ts        # PubMed PMID + YouTube timestamp backfill
├── fda-url-research.ts          # Output gap analysis for FDA Access Data URLs
└── README.md                    # How to run, env var requirements
```

### Pattern 1: Two-Client Script
Scripts need to connect to both Supabase projects (`aejskvmpembryunnbgrk` for evidence_links, `gjqicqldjgvrwmtkliie` for manufacturer_youtube_transcript). Use the same `createClient` pattern as `lib/supabase.ts`:

```typescript
// Source: lib/supabase.ts (existing project pattern)
import { createClient } from "@supabase/supabase-js";
import "dotenv/config"; // reads .env.local

const agentDb = createClient(
  process.env.NEXT_PUBLIC_AGENT_SUPABASE_URL!,
  process.env.AGENT_SUPABASE_SERVICE_KEY!
);
const cmsDb = createClient(
  process.env.NEXT_PUBLIC_CMS_SUPABASE_URL!,
  process.env.CMS_SUPABASE_SERVICE_KEY!
);
```

### Pattern 2: CrossRef PMID Extraction
CrossRef returns PMID in the `external-ids` array. The external ID type is `"PMID"` and the source field is `"pubmed"`.

```typescript
// CrossRef works/{doi} response shape (relevant subset)
interface CrossRefWork {
  "external-ids": {
    "id-type": string;  // "PMID"
    id: string;         // the PMID number
    source?: string;    // "pubmed"
  }[];
}

async function pmidFromDoi(doi: string): Promise<string | null> {
  const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "A360-citation-backfill/1.0 (ccabell@aesthetics360.com)" }
  });
  if (!res.ok) return null;
  const data = await res.json();
  const externalIds = data.message?.["external-ids"] ?? [];
  const pmidEntry = externalIds.find((e: any) => e["id-type"] === "PMID");
  return pmidEntry?.id ?? null;
}
```

**Confidence: MEDIUM** — CrossRef `external-ids` structure verified from CrossRef REST API documentation patterns. The User-Agent header with contact email is CrossRef's polite pool requirement (higher rate limits).

### Pattern 3: YouTube Snippet-to-Chunk Matching
Evidence_links have a `snippet` column (verbatim text from the source). CMS has `manufacturer_youtube_transcript` with chunk text and `start_time`/`end_time`. Match on text similarity.

**Recommended approach: Trigram/substring match.** For 6 rows, a simple `ILIKE '%{first_20_chars}%'` or `ILIKE '%{snippet_words}%'` against `manufacturer_youtube_transcript.content` (or equivalent text column) is sufficient. Don't over-engineer for 6 rows.

```typescript
async function findYouTubeChunk(videoId: string, snippet: string) {
  // Take first 40 chars of snippet as search token (enough to be unique)
  const searchToken = snippet.slice(0, 40).replace(/[%_\\]/g, "\\$&");
  const { data } = await cmsDb
    .from("manufacturer_youtube_transcript")
    .select("start_time, end_time")
    .eq("video_id", videoId)
    .ilike("content", `%${searchToken}%`)  // adjust column name if different
    .limit(1)
    .single();
  return data;
}
```

**Important:** The exact column name for transcript text in `manufacturer_youtube_transcript` must be verified by querying the CMS Supabase schema before writing the script. It may be `content`, `text`, or `transcript`.

### Pattern 4: Schema Migration via Supabase MCP
The `page_number INT` column add is a DDL change. Use the Supabase MCP `apply_migration` tool (available in this environment) rather than a script, to get proper migration tracking.

```sql
-- Migration: add page_number to evidence_links
ALTER TABLE evidence_links ADD COLUMN IF NOT EXISTS page_number INT;
```

### Pattern 5: FDA URL Table (research artifact → SQL update)
The FDA URL research produces a mapping table of product → FDA Access Data URL. This translates directly into a batch UPDATE:

```sql
UPDATE evidence_links SET url = 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/103000s5326lbl.pdf'
WHERE source = 'fda_label' AND offering_id = '{botox_offering_id}';
-- repeat per product
```

### Anti-Patterns to Avoid
- **Embedding evidence_link IDs in `content_md` prose:** Do not add ID references to dossier text. Decided against in CONTEXT.md — wiring happens at query time.
- **Uploading FDA PDFs to Supabase Storage:** Decided against (D-01). Use public FDA Access Data URLs directly.
- **Re-running CMS ingestion for YouTube timestamps:** D-07/D-08 confirmed timestamps already exist in `manufacturer_youtube_transcript`. Match snippets to get `start_time` — don't re-ingest.
- **Vector matching for YouTube snippets:** For 6 rows, a simple ILIKE substring match is sufficient. Avoid spinning up embedding calls for this volume.
- **Using `.env.local` dotenv path directly in scripts:** The `dotenv/config` package with `--env-file .env.local` flag handles this. Verify the dotenv file is read from the project root.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| PMID from DOI lookup | Custom PubMed E-utilities scraper | CrossRef REST API `works/{doi}` | CrossRef has PMID in `external-ids`; no API key needed; polite pool available |
| Supabase write batching | Custom retry/batch logic | `@supabase/supabase-js` `.upsert()` with `onConflict` | Client handles batching; upsert is idempotent |
| FDA URL construction | Parsing FDA HTML / scraping | Direct URL table — research and hardcode the 12 product URLs | Only 12 products; mechanical lookup, not an algorithm problem |
| Schema migration | Ad-hoc SQL in a script with no tracking | Supabase MCP `apply_migration` | Proper migration history; rollback possible |

**Key insight:** This phase is a data repair job, not an architecture build. The complexity ceiling is low — 69 rows to fix across 3 source types. Resist any impulse to generalize.

---

## FDA URL Research (Gap Analysis Deliverable)

The planner must allocate a task to research and validate the FDA Access Data URLs for all 13 products with fda_label evidence_links rows. The mock already provides the Botox Cosmetic URL as the verified pattern:

| Product | FDA NDA/BLA | Mock/Known URL |
|---------|-------------|---------------|
| Botox Cosmetic | 103000 | `https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/103000s5326lbl.pdf` (from mock) |
| Xeomin | 125360 | To be researched |
| Skinvive | 761261 | To be researched |
| Juvéderm VOLUX XC | 125511 | To be researched |
| Juvéderm VOLBELLA XC | 125511 | To be researched |
| Juvéderm VOLLURE XC | 125511 | To be researched |
| Juvéderm VOLUMA XC | 125511 | To be researched |
| Juvéderm Ultra | 125511 | To be researched |
| Juvéderm Ultra XC | 125511 | To be researched |
| Juvéderm Ultra XC Lips | 125511 | To be researched |
| Juvéderm Ultra Plus XC | 125511 | To be researched |
| Kybella | 208009 | To be researched |
| Dysport | 125274 | To be researched |

**Pattern:** `https://www.accessdata.fda.gov/drugsatfda_docs/label/{year}/{NDA_or_BLA}s{supplement}lbl.pdf`

The research task must: (1) confirm the correct supplement number + year for each product, (2) verify the URL resolves (HTTP 200), (3) produce a gap report for Chris to fill manually on any that fail.

The Juvéderm products likely share BLA 125511 but differ by supplement number per indication. Each must be looked up individually via `https://www.accessdata.fda.gov/cgi-bin/browse-fda-gov/`.

---

## Common Pitfalls

### Pitfall 1: CrossRef API rate limiting without polite pool
**What goes wrong:** Script makes 11 requests without a User-Agent header. CrossRef throttles to very low rate limits for anonymous callers.
**Why it happens:** Default fetch has no User-Agent; CrossRef's polite pool requires `User-Agent: AppName/Version (email)`.
**How to avoid:** Always include `User-Agent: A360-citation-backfill/1.0 (ccabell@aesthetics360.com)` header. Add 100ms delay between requests as courtesy.
**Warning signs:** HTTP 429 responses from api.crossref.org.

### Pitfall 2: CrossRef works/{doi} — DOI must be URL-encoded
**What goes wrong:** DOIs often contain slashes and special chars (e.g., `10.1097/DSS.0000000000004102`). If passed raw in the URL path, they resolve correctly on CrossRef — but some DOIs have characters that break routing.
**How to avoid:** Use `encodeURIComponent(doi)` when building the CrossRef URL.

### Pitfall 3: `manufacturer_youtube_transcript` column names unknown
**What goes wrong:** Script assumes column is named `content` but actual column is `text`, `transcript_text`, or something else — query returns no rows.
**How to avoid:** Run `SELECT column_name FROM information_schema.columns WHERE table_name = 'manufacturer_youtube_transcript'` against CMS Supabase before writing the matching query.
**Warning signs:** `ilike` returns empty results even for known video IDs.

### Pitfall 4: dotenv not loading `.env.local` in scripts
**What goes wrong:** Script runs outside Next.js so `process.env` doesn't auto-load `.env.local`. Supabase client is initialized with `undefined` URL/key and fails silently (returns the placeholder client from `lib/supabase.ts`).
**How to avoid:** In scripts, use `import "dotenv/config"` (reads `.env` by default) or explicitly pass `--env-file .env.local` to `node`/`tsx`. Or use `dotenv.config({ path: ".env.local" })`.
**Warning signs:** Supabase calls return "Invalid API key" or 401, or no rows found when rows definitely exist.

### Pitfall 5: FDA URL supplement numbers change over time
**What goes wrong:** An older supplement number URL (e.g., `s5326`) is saved in evidence_links. FDA later releases a new supplement with a higher number and the old URL 404s.
**How to avoid:** Use the most recent supplement URL at time of writing. Accept that FDA URLs may need periodic refresh — this is acceptable for v1. Do not try to solve URL freshness in this phase.

### Pitfall 6: YouTube snippet match finds wrong chunk (multiple videos same product)
**What goes wrong:** Product has multiple YouTube videos. ILIKE match on snippet text hits a chunk from a different video than the evidence_link's video_id.
**How to avoid:** Always filter `WHERE video_id = ?` first, THEN match on snippet. The video_id in the evidence_links URL is the outer scope.

### Pitfall 7: `evidence_links.url` UPDATE overwrites existing non-empty values
**What goes wrong:** Script UPDATEs all YouTube rows unconditionally, clobbering any that already have a good timestamp URL.
**How to avoid:** For YouTube, UPDATE only rows where `url NOT LIKE '%&t=%'` (i.e., no timestamp yet). For PubMed, UPDATE only where `url = '' OR url IS NULL`. For FDA, UPDATE only where `url = '' OR url IS NULL`.

---

## Code Examples

Verified patterns from project source files:

### Supabase client for scripts (mirroring lib/supabase.ts)
```typescript
// scripts/backfill-citations.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const agentDb = createClient(
  process.env.NEXT_PUBLIC_AGENT_SUPABASE_URL!,
  process.env.AGENT_SUPABASE_SERVICE_KEY!
);
const cmsDb = createClient(
  process.env.NEXT_PUBLIC_CMS_SUPABASE_URL!,
  process.env.CMS_SUPABASE_SERVICE_KEY!
);
```

### Fetch PubMed rows needing backfill
```typescript
const { data: pubmedRows } = await agentDb
  .from("evidence_links")
  .select("id, doi, pmid")
  .eq("source", "pubmed")
  .is("pmid", null)
  .not("doi", "is", null);
```

### Update a single evidence_link with pmid + url
```typescript
await agentDb
  .from("evidence_links")
  .update({
    pmid: pmid,
    url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
  })
  .eq("id", row.id);
```

### Fetch YouTube evidence_links
```typescript
const { data: ytRows } = await agentDb
  .from("evidence_links")
  .select("id, url, snippet")
  .eq("source", "youtube")
  .not("url", "ilike", "%&t=%"); // only rows without timestamp
```

### Extract video_id from YouTube URL
```typescript
function extractVideoId(url: string): string | null {
  // Handles https://www.youtube.com/watch?v=VIDEO_ID and https://youtu.be/VIDEO_ID
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? null;
}
```

### FDA URL update pattern
```typescript
// Apply researched URL for a specific product's fda_label rows
await agentDb
  .from("evidence_links")
  .update({ url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/103000s5326lbl.pdf" })
  .eq("source", "fda_label")
  .eq("offering_id", "4b92be36-e84e-432c-8549-f5d85a767fdb") // Botox Cosmetic
  .or("url.is.null,url.eq.''");
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Ingest FDA PDFs to Supabase Storage | Use public FDA Access Data URLs directly | Decided 2026-06-12 (D-01) | No upload work, no storage costs, links are always current |
| YouTube timestamps discarded at ingest | Match evidence_links snippets to CMS transcript chunks to recover start_time | Decided 2026-06-12 (D-08) | Enables `?t=Ns` deep links without re-ingesting |
| Manual evidence_links URL backfill | Automated CrossRef API lookup script | Decided 2026-06-12 (D-04) | 11 PubMed rows automated vs. manual |

---

## Open Questions

1. **`manufacturer_youtube_transcript` text column name**
   - What we know: Table exists in CMS Supabase (`gjqicqldjgvrwmtkliie`); has `start_time`, `end_time`, `video_id` columns per CONTEXT.md D-07
   - What's unclear: Exact column name for the transcript chunk text
   - Recommendation: Wave 0 task — query `information_schema.columns` against CMS Supabase before writing the match query

2. **CrossRef PMID resolution rate for the 11 DOIs**
   - What we know: CrossRef has PMID in `external-ids` when the work is indexed in PubMed; not all DOIs have this
   - What's unclear: How many of the 11 NULL-pmid rows have CrossRef PMID entries vs. requiring manual lookup
   - Recommendation: Script outputs a gap report; Chris fills in manual PMIDs for any that CrossRef can't resolve (D-06)

3. **Juvéderm supplement numbers (8 products, possibly same BLA 125511)**
   - What we know: FDA Access Data has all Juvéderm products under Allergan; BLA 125511 is Allergan's filler BLA number
   - What's unclear: Which supplement number corresponds to which Juvéderm variant (VOLUX vs VOLBELLA vs Ultra, etc.)
   - Recommendation: FDA URL research task must look up each variant individually on accessdata.fda.gov; some may resolve to same PDF (e.g. if combined labeling); gap report captures failures for Chris

4. **IFU rows (source = 'ifu', 2 rows)**
   - What we know: 2 IFU rows exist in evidence_links; success criteria only mentions fda_label, pubmed, youtube
   - What's unclear: Whether IFU rows need URL backfill as part of this phase
   - Recommendation: Out of scope for demo (only 2 rows, not in success criteria). Skip in backfill scripts unless trivial to include.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Backfill scripts | ✓ | v24.12.0 | — |
| `@supabase/supabase-js` | DB reads/writes | ✓ | 2.108.1 (in package.json) | — |
| CrossRef REST API | PMID lookup | ✓ (public, no key) | current | Manual PMID lookup for failures |
| FDA Access Data (accessdata.fda.gov) | FDA URL research | ✓ (public) | current | Manual URL lookup by Chris (gap analysis) |
| `tsx` | TS script execution | ✗ | — | Use plain `.js` scripts, or `npm install --save-dev tsx` |
| `dotenv` | `.env.local` in scripts | ✗ | — | `npm install --save-dev dotenv` or use `node --env-file .env.local` (Node 20.6+) |
| Supabase MCP | Schema migration | ✓ (MCP available in environment) | current | Apply migration via Supabase dashboard SQL editor |

**Missing dependencies with no fallback:**
- None blocking. Scripts can use plain `.js` + Node's built-in `--env-file` flag (Node 20.6+, and we have 24.12.0) to avoid needing `dotenv`.

**Missing dependencies with fallback:**
- `tsx`: Either install or write scripts as plain `.js`. Given the project is TypeScript-first, install `tsx` for type safety.
- `dotenv`: Not needed if using `node --env-file .env.local script.js` (available in Node 20.6+, confirmed at 24.12.0).

---

## Validation Architecture

No test framework configuration detected in the project (no `jest.config.*`, `vitest.config.*`, or `pytest.ini` found). No `tests/` or `__tests__` directory.

This phase produces no new application code — only scripts, a schema migration, and a doc update. Validation is integration-style: run the scripts and query Supabase to verify the rows were updated correctly.

**Per-task verification pattern:**
- Schema migration: `SELECT column_name FROM information_schema.columns WHERE table_name = 'evidence_links' AND column_name = 'page_number'` → must return 1 row
- PubMed backfill: `SELECT COUNT(*) FROM evidence_links WHERE source = 'pubmed' AND pmid IS NOT NULL` → must be ≥ 3 (before) + however many CrossRef resolved
- FDA URL backfill: `SELECT COUNT(*) FROM evidence_links WHERE source = 'fda_label' AND url != ''` → must be > 0
- YouTube backfill: `SELECT COUNT(*) FROM evidence_links WHERE source = 'youtube' AND url LIKE '%&t=%'` → must equal number of rows where snippet match succeeded
- Demo gate: Navigate to Research/Evidence tab, ask a Botox/Neurotoxins question, confirm citation cards render with clickable "View on PubMed" and "Open FDA label" links

**Wave 0 Gaps:** None — no test files required; verification is manual DB queries + demo smoke test.

---

## Sources

### Primary (HIGH confidence)
- `01-CONTEXT.md` — All locked decisions read verbatim
- `HANDOFF_CITATIONS.md` — Full session context, evidence_links gap counts, DB schema
- `lib/supabase.ts` — Existing two-client pattern (project source)
- `lib/mock/research-data.ts` — Target citation shape + verified Botox FDA URL pattern
- `lib/types/retrieval.ts` — SourceLocator types (PubMedLocator, YouTubeLocator, DocumentLocator)
- `components/citations/types.ts` — Citation type used by UI
- `Fable Docs/RETRIEVAL_SERVICE.md` — Full citation pipeline spec, §10 ingestion requirements
- `Fable Docs/DOSSIER_COMPILE_PIPELINE.md` — STEP 4 that needs the citation locator paragraph
- `package.json` — Dependency versions confirmed (@supabase/supabase-js 2.108.1)
- `.env.local.example` — Env var names confirmed

### Secondary (MEDIUM confidence)
- CrossRef REST API `external-ids` PMID extraction pattern — documented behavior, not verified live against a real DOI in this session; consistent with known CrossRef API structure
- Node.js `--env-file` flag availability at Node 20.6+ — verified against Node.js changelog knowledge (Node 24.12.0 in environment confirms support)

### Tertiary (LOW confidence)
- Juvéderm BLA 125511 — training-data knowledge; supplement numbers for each variant require live lookup on accessdata.fda.gov to confirm
- CrossRef PMID resolution rate for the 11 DOIs — cannot be estimated without running the script

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already in project, versions confirmed from package.json
- Architecture: HIGH — patterns directly derived from existing project source files
- Pitfalls: HIGH — all pitfalls derived from reading actual code + data state, not speculative
- FDA URL research: MEDIUM — URL pattern confirmed from mock data; supplement numbers require live lookup

**Research date:** 2026-06-12
**Valid until:** 2026-07-12 (stable tooling; FDA URL validity depends on FDA re-releases — acceptable for demo)
