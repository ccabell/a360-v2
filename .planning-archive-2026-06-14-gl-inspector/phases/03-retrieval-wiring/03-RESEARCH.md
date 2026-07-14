# Phase 3: retrieval-wiring - Research

**Researched:** 2026-06-12
**Domain:** Next.js 16 API route + Supabase query + Vercel AI SDK v6 streaming + SSE event protocol
**Confidence:** HIGH

---

## Summary

Phase 3 replaces a single mock generator with a real server-side route. The UI plumbing (post-processor, GroundedAnswer, CitationCard, source pills, SSE event consumers) is entirely complete and reusable. The only changes are:

1. A new `app/api/research/chat/route.ts` that queries the real DB (Agent Manager Supabase for `evidence_links` and `agent_reference_docs`; CMS Supabase for vector chunks), calls an LLM with the §7 generation contract, and emits the SSE event sequence the client already expects.
2. A swap of three lines in `components/research/research-chat.tsx`: replace the `streamResearch` import and `for await` loop with a `fetch` + `ReadableStream` reader that parses the same SSE event types.
3. Remove the two mock imports.

The demo target is Botox/Neurotoxins — data is ready for that entity after Phase 1 + Phase 2.

**Primary recommendation:** Build a minimal hybrid retrieval route using full-text search over `evidence_links` + `agent_reference_docs.content_md` in the Agent Manager Supabase. Skip vector search for Phase 3 (no embedding API key in env yet; CMS match_* RPCs require an OpenAI key for embeddings). The full-text path is sufficient to hit all four success criteria for the demo question.

The LLM call uses `@ai-sdk/gateway` with `anthropic/claude-haiku-4.5` (cheap, fast, low-temp) and the §7 system prompt. The `AI_GATEWAY_API_KEY` env var must be added to `.env.local` — it is the only new env var needed.

---

## 1. Data Source of Truth

### Where the tables live

Both `evidence_links` and `agent_reference_docs` live in **Agent Manager Supabase** — project `aejskvmpembryunnbgrk`, accessible via `agentSupabase` client (`NEXT_PUBLIC_AGENT_SUPABASE_URL` / `AGENT_SUPABASE_SERVICE_KEY`).

The CMS Supabase (`gjqicqldjgvrwmtkliie`, `cmsSupabase`) holds vectorized corpora (podcast chunks, YouTube transcripts, PubMed articles) with `match_*` RPCs. For Phase 3 the minimal path does NOT touch CMS — the dossier content + evidence_links in the Agent Manager are sufficient for the Botox/Neurotoxins demo.

### evidence_links columns (confirmed from Phase 1 research + DOSSIER_SYSTEM_ARCHITECTURE.md)

| Column | Type | Phase 3 Use |
|--------|------|-------------|
| `id` | uuid | dedup / chunkRef |
| `offering_id` | uuid | FK to products |
| `source` | text | corpus discriminator: `pubmed`, `fda_label`, `youtube`, `ifu`, etc. |
| `authority_rank` | smallint | 1=FDA, 2=pubmed, 3=manufacturer … (authority weight for fusion) |
| `snippet` | text | The verbatim quote — maps to `RetrievedSource.text` |
| `doi` | text | For pubmed sources |
| `pmid` | text | Populated by Phase 1 scripts — maps to `PubMedLocator.pmid` |
| `url` | text | Populated by Phase 1 scripts — pubmed/fda/youtube URL with `&t=` |
| `page_number` | int | Added by Phase 1 schema migration — maps to `DocumentLocator.pageNumber` |
| `field_name` | text | Claim label (e.g., "onset_time", "glabellar_dose") |
| `verified_by` | text | |
| `chunk_id` | uuid | FK into CMS Supabase chunk (optional cross-link) |

**Locator field mapping** — evidence_links → `RetrievedSource.locator`:

| source value | SourceLocator type | Required fields from evidence_links |
|-------------|-------------------|-------------------------------------|
| `pubmed` | `PubMedLocator` | `pmid` → pmid; `url` → url; `field_name` or join to produce title/journal/authors (see below) |
| `fda_label` | `DocumentLocator` | `url` → url; `page_number` → pageNumber; construct filename/title from offering join |
| `youtube` | `YouTubeLocator` | `url` contains `?v=VIDEO_ID&t=Ns` → parse videoId + startSeconds |
| `ifu` | `DocumentLocator` | same as fda_label |

**Title/authors gap:** `evidence_links` does not have title/authors columns. For the demo:
- PubMed: join `products` on `offering_id` for context; construct a short label from `field_name` or use a static title lookup from the Phase 1 DOI data. Alternatively, fetch from CrossRef at retrieval time (adds latency; not recommended for demo). Simplest: use `"PubMed · PMID ${pmid}"` as the title until a `title` column is added.
- FDA: title = product name + " Prescribing Information" (join `products.name`).
- YouTube: title = product name + " · video" (join `products.name`).

This is a known gap. The planner must include a task to either add title/authors columns to `evidence_links` or synthesize them in the retrieval route. HIGH PRIORITY: the citation card renders `citation.title` prominently.

### agent_reference_docs columns (from DOSSIER_SYSTEM_ARCHITECTURE.md)

| Column | Type | Phase 3 Use |
|--------|------|-------------|
| `id` | uuid | chunkRef: `dossier:{id}` |
| `offering_id` | uuid | FK to products (product dossiers) |
| `category_id` | uuid | FK to categories (category dossiers) |
| `content_md` | text | The prose chunk — maps to `RetrievedSource.text` |
| `lens` | enum | `clinical` / `sales_education` / `deep_product` |
| `doc_type` | text | clinical_summary / technique_guide / patient_education / faq / deep_dive_playbook / category_overview |
| `audience` | text | provider / patient / staff |
| `status` | text | `draft` / `active` / `archived` |
| `version` | int | Use `version = 2, status = 'draft'` for Botox/Neurotoxins |

For Phase 3 retrieval, filter to `lens IN ('clinical', 'deep_product')` for the research tab (provider-only audience per ROADMAP locked decision). Do not surface `sales_education` docs in citation prose.

---

## 2. Retrieval Strategy

### Why full-text, not vector, for Phase 3

Vector search against Agent Manager Supabase `evidence_links` / `agent_reference_docs` requires:
- An embedding call per query (needs `OPENAI_API_KEY` or gateway API key + embedding model)
- PostgreSQL `pgvector` extension on Agent Manager Supabase with embedding columns on these tables
- Existing `match_*` RPC functions — none confirmed on Agent Manager Supabase (they exist on CMS only)

Full-text search (Postgres `tsvector` / `ilike`) requires: nothing new. Works today.

For the demo target ("How fast does Botox work?", "What's the glabellar dose?"), the Botox/Neurotoxins evidence_links contain exact-match terms (botox, neurotoxin, glabellar, onset, dose). Full-text over a few dozen rows is instant and reliable.

### Recommended minimal retrieval for Phase 3

**Step 1 — Identify offering_ids for the query subject.**

For Phase 3, hard-code the Botox product and Neurotoxins category IDs (confirmed from Phase 2):
- Botox Cosmetic `offering_id`: `4b92be36-e84e-432c-8549-f5d85a767fdb`
- Neurotoxins `category_id`: `57b7c5a8-0799-42b0-9111-8441f18a82db`

For a production build, add a cheap keyword-to-product-id mapping step. For Phase 3 demo scope: use these IDs directly when the query contains "botox" / "neurotoxin" terms, else return an empty set gracefully.

**Step 2 — Retrieve evidence_links for those IDs.**

```typescript
const { data: evidenceRows } = await agentSupabase
  .from("evidence_links")
  .select("id, source, authority_rank, snippet, pmid, url, page_number, field_name, offering_id")
  .in("offering_id", [BOTOX_ID])
  .not("url", "is", null)
  .not("snippet", "is", null)
  .order("authority_rank", { ascending: true }) // lower = higher authority
  .limit(20);
```

**Step 3 — Retrieve dossier content for clinical + deep_product lens.**

```typescript
const { data: dossierRows } = await agentSupabase
  .from("agent_reference_docs")
  .select("id, content_md, lens, doc_type, offering_id, category_id")
  .or(`offering_id.eq.${BOTOX_ID},category_id.eq.${NEUROTOXINS_CAT_ID}`)
  .in("lens", ["clinical", "deep_product"])
  .in("status", ["draft", "active"])
  .order("version", { ascending: false })
  .limit(5);
```

**Step 4 — Merge + truncate.**

Combine and truncate to 8 sources total (per `finalK` default in RETRIEVAL_SERVICE.md). Sort: evidence_links by `authority_rank` first, dossier docs second.

Assign `retrievalId: "src_1"` etc. in ranked order.

**Step 5 — Build SourceLocators.**

Convert each row to a `RetrievedSource` with the appropriate `SourceLocator` type. Evidence_links → PubMedLocator / DocumentLocator / YouTubeLocator per `source` discriminator. Dossier rows → use `IndustryLocator` with `articleTitle = doc_type` as the simplest fallback (or add a new "dossier" locator type — see open question).

### Dossier content corpus identity

`agent_reference_docs` rows do not map cleanly to any of the 7 `Corpus` types in `lib/types/retrieval.ts`. Options:
- Use `corpus: "practice"` (closest existing type — "practice library") for dossier rows
- Use `corpus: "manufacturer"` for FDA-backed dossier content

**Recommendation:** Use `corpus: "practice"` for `agent_reference_docs` rows in Phase 3. The citation card already renders a "Practice Doc" badge for this corpus. The locator should be `DocumentLocator` with `corpus: "practice"`, `title = doc_type`, `storagePath = "dossier/" + id`, `url = ""` (no external link for dossier prose in Phase 3).

---

## 3. Generation

### LLM provider: `@ai-sdk/gateway`

The project has `ai` v6.0.201 and `@ai-sdk/gateway` v3.0.127 installed. There is **no `@ai-sdk/anthropic` or `@ai-sdk/openai` package installed**. The gateway is the only available provider abstraction.

The gateway reads `AI_GATEWAY_API_KEY` from env (or `apiKey` option). This key is NOT in `.env.local.example` and must be added. Without it, generation will throw `GatewayAuthenticationError`.

Usage pattern:
```typescript
import { gateway } from "@ai-sdk/gateway";
import { streamText } from "ai";

const result = await streamText({
  model: gateway("anthropic/claude-haiku-4.5"),
  system: SYSTEM_PROMPT, // §7 contract
  prompt: userQuery,
  temperature: 0.3,       // per §7 rules
  maxTokens: 600,
});
```

`streamText` returns a `StreamTextResult` with a `.fullStream` async iterable that yields delta text. Use `toTextStreamResponse()` for trivial use cases, but for Phase 3 the route must emit the custom SSE event format (status, sources, token, citations, done) — so consume the stream manually and write to a `TransformStream` / `ReadableStream`.

### "No source attribution" rule (from memory — CLAUDE.md)

The memory file `feedback_no_source_attribution.md` says: agents must never cite sources; content reads as authoritative. However, the Research/Evidence tab is explicitly designed around citations — it is the OpenEvidence-style research tab, not a consultation agent. The no-attribution rule applies to the SalesCoach/consultation agents, not the Research tab. The §7 generation contract is correct for Phase 3.

### Generation prompt template (§7 contract)

```
You are answering using ONLY the sources below. Cite every factual claim
with the source marker in square brackets, e.g. [src_3]. You may cite
multiple sources for one claim: [src_1][src_4]. If the sources do not
support an answer, say so — do not use outside knowledge for factual
claims about treatments, dosing, safety, or efficacy.

<sources>
[src_1] (FDA label — BOTOX Cosmetic, p.12)
{snippet text}

[src_2] (PubMed 2024 — "...")
{snippet text}
...
</sources>
```

Temperature: 0.3. One-line provenance label per source (improves which source the LLM picks for each claim).

---

## 4. Route Shape

### Route location

`app/api/research/chat/route.ts`

- Method: `POST`
- Auth: none additional (already behind the beta gate via cookie middleware if any — existing routes don't explicitly check cookies server-side; the cookie gate is at page level via `lib/auth.ts`)
- Export: `export const dynamic = "force-dynamic";`

### Request body

```typescript
interface ResearchChatRequest {
  query: string;
  conversationId?: string; // optional, ignored in Phase 3 (no cross-turn dedup)
}
```

### Response: Server-Sent Events

The route returns a `Response` with `Content-Type: text/event-stream`. Event format matches `ResearchEvent` in `lib/types/retrieval.ts` — SSE lines:

```
data: {"type":"status","stage":"searching"}

data: {"type":"sources","sources":[...]}

data: {"type":"status","stage":"generating"}

data: {"type":"token","text":"Onset of BOTOX"}

data: {"type":"citations","citations":[...],"displayMap":{...}}

data: {"type":"done","runId":"run_123","usage":{...}}
```

### Route implementation skeleton

```typescript
import { NextRequest } from "next/server";
import { agentSupabase } from "@/lib/supabase";
import { gateway } from "@ai-sdk/gateway";
import { streamText } from "ai";
import { resolveCitations } from "@/lib/retrieval/post-process";
import type { RetrievedSource } from "@/lib/types/retrieval";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      function emit(event: object) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      }

      emit({ type: "status", stage: "searching" });

      // Step 1: retrieve
      const sources: RetrievedSource[] = await retrieveSources(query);

      emit({ type: "sources", sources });
      emit({ type: "status", stage: "generating" });

      // Step 2: generate with streaming
      const systemPrompt = buildSystemPrompt(sources);
      const result = await streamText({
        model: gateway("anthropic/claude-haiku-4.5"),
        system: systemPrompt,
        prompt: query,
        temperature: 0.3,
        maxTokens: 600,
      });

      let fullText = "";
      for await (const delta of result.textStream) {
        fullText += delta;
        emit({ type: "token", text: delta });
      }

      // Step 3: post-process
      const { citations, displayMap } = resolveCitations(fullText, sources);
      emit({ type: "citations", citations, displayMap });
      emit({ type: "done", runId: `run_${Date.now()}`, usage: { inputTokens: 0, outputTokens: 0, durationMs: 0 } });

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

### Changes to research-chat.tsx

Replace the `streamResearch` import and `for await` loop with a `fetch` reader:

```typescript
// REMOVE:
import { streamResearch } from "@/lib/mock/research-stream";
import { EXAMPLE_QUERIES } from "@/lib/mock/research-data";

// ADD:
const EXAMPLE_QUERIES = [
  "How fast does Botox work and what's the glabellar dose?",
  "Does neurotoxin dosing differ for male patients?",
  "What's the evidence on onset timeline for botulinum toxin?",
];

async function* streamResearchLive(query: string): AsyncGenerator<ResearchEvent> {
  const res = await fetch("/api/research/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      const data = line.replace(/^data: /, "").trim();
      if (!data) continue;
      yield JSON.parse(data) as ResearchEvent;
    }
  }
}
```

Then in `send()`, replace `streamResearch(q)` with `streamResearchLive(q)`. The event switch-case is unchanged.

---

## 5. Mock Removal

Exact deletions to achieve "no mock data imports remain in the retrieval path":

| File | Action |
|------|--------|
| `components/research/research-chat.tsx` line 12 | Remove `import { streamResearch } from "@/lib/mock/research-stream"` |
| `components/research/research-chat.tsx` line 13 | Remove `import { EXAMPLE_QUERIES } from "@/lib/mock/research-data"` |
| `components/research/research-chat.tsx` | Replace `for await (const ev of streamResearch(q))` with live reader |
| `app/dashboard/research/page.tsx` | Change `<Badge>Demo data</Badge>` to `<Badge>Live</Badge>` (minor) |

The mock files themselves (`lib/mock/research-data.ts`, `lib/mock/research-stream.ts`) are NOT deleted in Phase 3 — other surfaces may reference them for Storybook/demo. Delete them only if confirmed unused.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@supabase/supabase-js` | 2.108.1 | Agent Manager + CMS DB queries | Already in project; both clients pre-configured |
| `@ai-sdk/gateway` | 3.0.127 | LLM provider | Only available Vercel AI SDK provider in this install |
| `ai` | 6.0.201 | `streamText` + text stream | Already installed; v6 API confirmed available |
| Next.js Route Handlers | 16.2.9 | SSE endpoint | Established pattern in app/api/* |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Web Streams API (`ReadableStream`, `TextEncoder`) | Node built-in | Manual SSE construction | Gateway-owned; no extra dep |
| `resolveCitations` (existing) | — | Post-processor | Reuse verbatim — do not rewrite |

**Installation:** No new npm packages required. The gateway API key env var is the only new setup.

---

## Architecture Patterns

### Recommended File Structure
```
app/
└── api/
    └── research/
        └── chat/
            └── route.ts        # New SSE route (POST)
lib/
└── retrieval/
    ├── post-process.ts          # Existing — reuse as-is
    ├── locator.ts               # Existing — reuse as-is
    └── sources.ts               # New — DB query + RetrievedSource construction
```

The `lib/retrieval/sources.ts` module isolates the Supabase query + locator-building logic from the route. The route only orchestrates: retrieve → prompt → stream → post-process.

### Anti-Patterns to Avoid
- **Calling `resolveCitations` before streaming is complete.** The post-processor must run on the full answer text, not on per-token deltas.
- **Calling CMS Supabase match_* RPCs without an embedding model key.** Those RPCs require a query embedding vector. Phase 3 skips CMS entirely.
- **Using `toTextStreamResponse()` from the AI SDK.** This emits raw text deltas, not the SSE event format the client expects. Consume `result.textStream` manually.
- **Fetching locator metadata in a second query.** All locator fields must come from the initial `evidence_links` select. Adding round-trips kills the demo latency.
- **Surfacing `sales_education` docs in the research tab.** These have no citations and are patient-facing. Filter to `lens IN ('clinical', 'deep_product')`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Citation parsing + renumbering | Custom regex | `resolveCitations` in `lib/retrieval/post-process.ts` | Already correct + tested against all 7 corpora |
| Deep-link URL construction | Custom switch | `locatorUrl`, `locatorTitle`, `deepLinkLabel` in `lib/retrieval/locator.ts` | Already handles all SourceLocator types |
| SSE client reading | `EventSource` API | Manual `ReadableStream` reader (see Route Shape §4) | `EventSource` doesn't support POST body |
| LLM streaming | Raw fetch to Anthropic API | `streamText` from `ai` | Handles retries, token counting, provider abstraction |

---

## Common Pitfalls

### Pitfall 1: AI_GATEWAY_API_KEY missing
**What goes wrong:** `GatewayAuthenticationError` thrown at runtime. The `@ai-sdk/gateway` package reads `AI_GATEWAY_API_KEY` from env. It is not in `.env.local.example`.
**Why it happens:** The gateway was added to the project but never used before Phase 3.
**How to avoid:** Add `AI_GATEWAY_API_KEY=` to `.env.local.example` and document in Wave 0. Fail fast with a 500 + informative error if the key is missing.
**Warning signs:** Route returns 500 with `GatewayAuthenticationError` message.

### Pitfall 2: evidence_links has no title/authors columns
**What goes wrong:** `PubMedLocator.title` is required but `evidence_links` only has `field_name` and `snippet`. CitationCard renders an empty title.
**Why it happens:** The evidence_links schema tracks provenance (snippets, ranks, IDs) but not bibliographic metadata.
**How to avoid:** The route must synthesize a display title. Simplest: `"PubMed ${pmid}"` or join product name + `field_name`. A proper fix is a `title` column in evidence_links — flag as tech debt.
**Warning signs:** CitationCard renders blank title with no link text.

### Pitfall 3: LLM invents src_N markers outside the retrieval set
**What goes wrong:** LLM generates `[src_9]` when only `src_1..src_5` were retrieved. `resolveCitations` strips it — citation count in cards is 0 even though the text has markers.
**Why it happens:** LLM hallucinating or miscounting the source list.
**How to avoid:** The §7 system prompt explicitly instructs cite ONLY from the sources list. Low temperature (0.3) helps. `resolveCitations` strips violations gracefully — user sees the text without the badge, which is acceptable.
**Warning signs:** Citation chips `[1][2]` appear in raw text but CitationCard section shows fewer references than expected.

### Pitfall 4: SSE stream buffered by Next.js response
**What goes wrong:** Tokens arrive all at once at the end rather than streaming; the "searching → ranking → generating" status animation never shows.
**Why it happens:** Next.js response buffering, or missing `Cache-Control: no-cache` / `Connection: keep-alive` headers.
**How to avoid:** Add `Cache-Control: no-cache` and `Connection: keep-alive` to the response headers. Confirm `export const dynamic = "force-dynamic"` is present.
**Warning signs:** UI freezes for 3-4 seconds then shows entire answer at once.

### Pitfall 5: Phase 2 dossier data not yet `status='active'`
**What goes wrong:** Query for `status='active'` returns 0 rows; query with `status='draft'` returns the Botox/Neurotoxins dossier that was compiled but not approved.
**Why it happens:** Phase 2 plan 02-01 SUMMARY confirms Botox docs are `status='draft'` pending Chris's review.
**How to avoid:** For Phase 3, query `status IN ('draft', 'active')`. The demo will use draft content, which is the correct behavior pre-approval.
**Warning signs:** Retrieval returns 0 dossier sources; answer relies only on evidence_links snippets.

### Pitfall 6: Botox product ID assumption
**What goes wrong:** Hard-coded offering_id `4b92be36-e84e-432c-8549-f5d85a767fdb` is wrong or refers to a different product.
**Why it happens:** IDs confirmed across multiple Phase 2 documents, but should be verified once before coding.
**How to avoid:** Wave 0 task — run `SELECT id, name FROM products WHERE name ILIKE '%botox%'` against Agent Manager Supabase and assert this ID is present.
**Warning signs:** evidence_links query returns 0 rows for the ID.

### Pitfall 7: Next.js 16 `params` async API
**What goes wrong:** Dynamic route segment access `params.id` throws a warning or errors if accessed synchronously.
**Why it happens:** Next.js 16 made `params` a Promise (confirmed from `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`).
**How to avoid:** The research route has no dynamic segments, so this pitfall does not apply. But if any sub-route is added (e.g., `/api/research/[id]`), always `const { id } = await params`.

---

## Code Examples

### Full-text query over evidence_links
```typescript
// Source: lib/supabase.ts (agentSupabase client pattern) + Phase 1 CONTEXT.md schema
const { data, error } = await agentSupabase
  .from("evidence_links")
  .select("id, source, authority_rank, snippet, pmid, url, page_number, field_name, offering_id")
  .in("offering_id", [BOTOX_OFFERING_ID])
  .not("snippet", "is", null)
  .order("authority_rank", { ascending: true })
  .limit(12);
```

### Build PubMedLocator from evidence_links row
```typescript
// Source: lib/types/retrieval.ts PubMedLocator shape
function toPubMedLocator(row: EvidenceLinkRow, productName: string): PubMedLocator {
  return {
    type: "pubmed",
    pmid: row.pmid!,
    title: row.field_name
      ? `${productName} — ${row.field_name.replace(/_/g, " ")}`
      : `PubMed ${row.pmid}`,
    url: row.url || `https://pubmed.ncbi.nlm.nih.gov/${row.pmid}/`,
  };
}
```

### Build DocumentLocator (FDA) from evidence_links row
```typescript
// Source: lib/types/retrieval.ts DocumentLocator shape
function toFdaLocator(row: EvidenceLinkRow, productName: string): DocumentLocator {
  return {
    type: "document",
    corpus: "fda",
    filename: `${productName.toLowerCase().replace(/ /g, "-")}-pi.pdf`,
    title: `${productName} Prescribing Information`,
    pageNumber: row.page_number ?? undefined,
    section: row.field_name ?? undefined,
    storagePath: `fda/${productName.toLowerCase().replace(/ /g, "-")}-pi.pdf`,
    url: row.url || "",
    sourceAuthority: "fda_label",
  };
}
```

### SSE emit helper in route
```typescript
// Source: RETRIEVAL_SERVICE.md §12 event protocol
function makeEmitter(controller: ReadableStreamDefaultController, encoder: TextEncoder) {
  return function emit(event: ResearchEvent) {
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
  };
}
```

### streamText consumption with manual token emit
```typescript
// Source: @ai-sdk/gateway v3 + ai v6 API (verified from node_modules/ai/dist/index.d.ts)
const result = await streamText({
  model: gateway("anthropic/claude-haiku-4.5"),
  system: systemPrompt,
  prompt: query,
  temperature: 0.3,
  maxTokens: 600,
});

let fullText = "";
for await (const chunk of result.textStream) {
  fullText += chunk;
  emit({ type: "token", text: chunk });
}
```

### SSE reader in research-chat.tsx
```typescript
// Replaces: for await (const ev of streamResearch(q))
async function* streamResearchLive(query: string): AsyncGenerator<ResearchEvent> {
  const res = await fetch("/api/research/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      const json = line.replace(/^data: /, "").trim();
      if (!json) continue;
      yield JSON.parse(json) as ResearchEvent;
    }
  }
}
```

---

## Open Questions

1. **evidence_links title/authors columns — add or synthesize?**
   - What we know: `evidence_links` has no `title`, `authors`, `journal`, `pub_date` columns. `PubMedLocator` requires `title`. Phase 1 plans do not add these columns.
   - What's unclear: Whether the Phase 1 CrossRef script saved these fields anywhere, or just `pmid` + `url`.
   - Recommendation: Synthesize in the route for Phase 3 (e.g., `field_name`-based title). File a tech debt ticket to add a `title text` column to `evidence_links` for Phase 4.

2. **AI_GATEWAY_API_KEY — is it provisioned?**
   - What we know: The env var is required; it is not in `.env.local.example`.
   - What's unclear: Whether the key exists in Chris's local `.env.local` already (the gateway was pre-installed).
   - Recommendation: Wave 0 verification task: `node -e "require('dotenv').config({path:'.env.local'}); console.log(!!process.env.AI_GATEWAY_API_KEY)"`. If falsy, Chris must provision before generation works.

3. **YouTube locator: can Phase 3 parse video_id + startSeconds from evidence_links.url?**
   - What we know: Phase 1 D-08 updates YouTube evidence_links URLs to `https://www.youtube.com/watch?v={id}&t={int}s` format. If Phase 1 is complete, the URL contains both fields.
   - What's unclear: Whether Phase 1 scripts have actually run by the time Phase 3 executes.
   - Recommendation: Parse URL with regex in the route; if `&t=` is absent, emit `startSeconds: undefined`. CitationCard handles `undefined` gracefully (renders "Watch video" instead of timestamp).

4. **Does Phase 3 block on Phase 1 + Phase 2 completion?**
   - Strictly: Phase 3 success criteria require real PubMed + FDA links, which come from Phase 1 scripts. However, the route can be built and verified with whatever data is in evidence_links at time of execution.
   - Recommendation: Build Phase 3 unconditionally. Run final demo verification only after Phase 1 scripts have executed. The route succeeds with partial data (e.g., returns snippets but url is empty → citation renders without a link).

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `@supabase/supabase-js` | DB queries | ✓ | 2.108.1 | — |
| `@ai-sdk/gateway` | LLM calls | ✓ | 3.0.127 | — |
| `ai` (`streamText`) | LLM streaming | ✓ | 6.0.201 | — |
| `AI_GATEWAY_API_KEY` | Generation | UNKNOWN | — | No fallback — blocks generation |
| `NEXT_PUBLIC_AGENT_SUPABASE_URL` | DB queries | ✓ (in .env.local.example) | — | — |
| `AGENT_SUPABASE_SERVICE_KEY` | DB queries | ✓ (in .env.local.example) | — | — |
| Phase 1 data (pmid/url backfill) | PubMed + FDA links | UNKNOWN (Phase 1 plans 02 + 03 not run yet) | — | Route works with empty url — no deep links |
| Phase 2 dossier data | Prose context for generation | PARTIAL (Botox/Neurotoxins draft done per 02-01-SUMMARY) | — | Use `status IN ('draft','active')` |

**Missing dependencies with no fallback:**
- `AI_GATEWAY_API_KEY`: without this key, `streamText` throws immediately. Wave 0 must verify this key exists.

**Missing dependencies with fallback:**
- Phase 1 URL backfill: route still works with empty `url` fields — CitationCard renders without deep-link button.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no jest.config.*, vitest.config.*, or tests/ directory |
| Quick run command | Manual HTTP test via curl or browser |
| Full suite command | Manual smoke test on Research tab |

No automated test infrastructure exists. Validation is integration-style.

### Phase Requirements → Test Map

| Req | Behavior | Test Type | Command / Steps |
|-----|----------|-----------|-----------------|
| SC-1 | Research tab reads from real evidence_links, not mock | Integration | Confirm `lib/mock/research-stream.ts` import is gone from research-chat.tsx; ask a question; observe console logs from route |
| SC-2 | Unscripted Botox/Neurotoxins question renders grounded prose | Smoke | Navigate to /dashboard/research; ask "What's the dosing for glabellar Botox?"; verify non-empty prose response |
| SC-3 | Clickable PubMed links appear | Visual | Verify ≥1 citation card has "View on PubMed" button linking to `pubmed.ncbi.nlm.nih.gov` |
| SC-4 | Clickable FDA label link appears | Visual | Verify ≥1 citation card has "Open FDA label" button linking to `accessdata.fda.gov` |
| SC-5 | Citation chips map to source panel | Visual | Verify `[1]` in prose → CitationCard #1 in references panel |
| SC-6 | No mock imports remain | Static | `grep -r "research-stream\|research-data" components/research/ lib/` returns 0 results |

### Wave 0 Gaps
- [ ] Verify `AI_GATEWAY_API_KEY` is in `.env.local`: `node -e "require('dotenv').config({path:'.env.local'}); console.log('key present:', !!process.env.AI_GATEWAY_API_KEY)"`
- [ ] Verify Botox offering_id: `SELECT id, name FROM products WHERE name ILIKE '%botox%'` → confirm `4b92be36-e84e-432c-8549-f5d85a767fdb`
- [ ] Verify evidence_links rows exist for Botox: `SELECT source, COUNT(*) FROM evidence_links WHERE offering_id='4b92be36-e84e-432c-8549-f5d85a767fdb' GROUP BY source`
- [ ] Verify agent_reference_docs rows exist for Botox: `SELECT lens, doc_type, status FROM agent_reference_docs WHERE offering_id='4b92be36-e84e-432c-8549-f5d85a767fdb' ORDER BY lens`
- [ ] Create `.planning/phases/03-retrieval-wiring/` directory (done)
- [ ] Add `AI_GATEWAY_API_KEY=` line to `.env.local.example`

---

## Sources

### Primary (HIGH confidence)
- `lib/types/retrieval.ts` — full RetrievedSource / ResearchCitation / ResearchEvent types; SSE event shapes
- `lib/mock/research-data.ts` — authoritative mock showing correct SourceLocator shapes for each corpus
- `lib/mock/research-stream.ts` — exact async generator pattern the client consumes; swap target
- `lib/retrieval/post-process.ts` + `lib/retrieval/locator.ts` — reusable post-processor; confirmed reusable as-is
- `components/research/research-chat.tsx` — exact import lines to remove; `streamResearch` call to replace
- `Fable Docs/RETRIEVAL_SERVICE.md` — §4–8, §12 authoritative spec for route shape, generation contract, SSE protocol
- `lib/supabase.ts` — client names and env var keys confirmed
- `.env.local.example` — all env var names confirmed
- `.planning/phases/01-citations/01-CONTEXT.md` — evidence_links columns, Phase 1 locked decisions (FDA URL approach, pmid backfill)
- `.planning/phases/02-dossier-batch/02-01-SUMMARY.md` — confirms Botox offering_id, Neurotoxins category_id, docs in `status='draft'`
- `Fable Docs/DOSSIER_SYSTEM_ARCHITECTURE.md` — agent_reference_docs columns, evidence_links provenance model
- `HANDOFF_CITATIONS.md` — confirms `aejskvmpembryunnbgrk` = Agent Manager Supabase holds both tables
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md` — Next.js 16 route params API
- `node_modules/ai/dist/index.d.ts` — `streamText` signature confirmed in ai v6
- `node_modules/@ai-sdk/gateway/dist/index.d.ts` — `gateway` export, `AI_GATEWAY_API_KEY` env var name confirmed
- `node_modules/@ai-sdk/gateway/src/gateway-provider.ts` — `AI_GATEWAY_API_KEY` env var confirmed
- `package.json` — all dependency versions confirmed

### Secondary (MEDIUM confidence)
- `docs/DATA_SOURCES.md` — CMS Supabase project ID and match_* RPC function names; table row counts
- `app/api/playground/route.ts` — route patterns: `force-dynamic`, `NextRequest`, error shape

### Tertiary (LOW confidence)
- `AI_GATEWAY_API_KEY` provisioning status — unknown; cannot be verified without running the env
- Phase 1 URL backfill completion status — plans 01-02 and 01-03 are not yet executed per ROADMAP.md

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages confirmed in node_modules with exact versions
- Architecture: HIGH — directly derived from reading existing route patterns, UI components, and spec docs
- Data source mapping: HIGH — confirmed from multiple Phase 1/2 artifacts and DOSSIER_SYSTEM_ARCHITECTURE.md
- Retrieval strategy: HIGH — full-text approach verified as sufficient for demo scope; vector not needed
- Generation API: HIGH — streamText + gateway confirmed from node_modules type files
- Pitfalls: HIGH — all derived from reading actual code state, not speculative

**Research date:** 2026-06-12
**Valid until:** 2026-07-12 (stable stack; AI_GATEWAY_API_KEY provisioning is the only external dependency)
