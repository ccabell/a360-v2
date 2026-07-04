# Tube (Video Navigator) Improvements — Execution Plan

Date: 2026-07-03 · Branch: `feat/demo-agent-scribe` (clean at start) · **No commits — leave all changes uncommitted for review.**

Source: code review of `app/tube/`, `components/tube/`, `lib/tube/`. Goals: cut the Explore payload, make filters shareable, fix chat retrieval quality, add conversation memory, protect the chat API, and close the Ask ↔ Watch loop.

Execution model: Sonnet subagents, one per phase. Phase 1 runs first (touches files every later phase imports). Phases 2A and 2B run in parallel (disjoint files). Phase 3 runs after 2B (shares `chat-retrieval.ts`, `route.ts`, `tube-tutor-client.tsx`). Phase 4 is verification.

---

## Phase 1 — Centralize channel labels (tiny, blocking)

**Problem:** `CHANNEL_LABELS` is copy-pasted in `components/tube/tube-card.tsx`, `app/tube/[id]/page.tsx`, and `lib/tube/chat-retrieval.ts`, and has already drifted (tube-card is missing `drtimepearce` and `stevenweiner`; the watch page is missing `stevenweiner`).

**Do:**
1. Create `lib/tube/channels.ts` exporting a single `CHANNEL_LABELS` map (the **union** of all three copies — 14 entries incl. `drtimepearce` and `stevenweiner`) and the `channelLabel(c: string | null | undefined): string` helper (fallback: replace `_`→space, title-case; `"YouTube"` for null/undefined).
2. Update the three files to import from it; delete the local maps and helpers.

**Verify:** `npx tsc --noEmit` passes; grep shows no remaining local `CHANNEL_LABELS` definitions outside `lib/tube/channels.ts`.

---

## Phase 2A — Navigate/Explore: payload, URL state, facet UX

Files: `app/tube/explore/page.tsx`, `components/tube/tube-explore.tsx`, `components/tube/tube-card.tsx`, `lib/tube/types.ts`.

### 1. Slim the client payload (~1.6 MB → target under ~500 KB)
`explore/page.tsx` currently passes all 2,548 full `TubeVideo` objects (full summaries) into the client component — all of it lands in the RSC payload. Fix:
- Add a `TubeCardVideo` type to `lib/tube/types.ts`: `id, title, channel, contentType, treatments, anatomy, concerns, patientSafe, chunkCount, summary` (drop `url`, `audience`, `tagged`, `hasTranscript` — unused by the grid/filters).
- In `explore/page.tsx`, map each video to `TubeCardVideo` with `summary` truncated to 240 chars (word boundary + `…` when truncated) before passing to `<TubeExplore>`.
- Change `TubeExplore` and `TubeCard` props to `TubeCardVideo`. **Note:** `TubeCard` is also used on the watch page with full `TubeVideo` objects — `TubeVideo` must remain structurally assignable to `TubeCardVideo` (it is; don't break that).

### 2. Filters + search in the URL
All filter/search state is `useState` — back-navigation from a video loses everything and filtered views can't be shared.
- Reflect state in searchParams: `q` plus one param per group (`anatomy`, `concerns`, `treatments`, `channels`, `types`), comma-separated values.
- Initialize state from `useSearchParams()` on mount; write changes with `router.replace(..., { scroll: false })`. Debounce the `q` writes (~300 ms); facet toggles write immediately. Values are slugs (no commas) so plain `encodeURIComponent` is fine.

### 3. Facet long-tail reachability
Expanded groups cap at 40 of up to 155 values. When a group has >8 values and is expanded: show **all** values (the rail already scrolls) and add a small type-to-filter input at the top of that group (matches against label, case-insensitive).

### 4. Patient-safe filter
Add a "Patient-safe only" toggle at the top of the filter rail (above the groups) that filters `v.patientSafe === true`. Include it in the URL state (`safe=1`) and in the active-filter count / Clear all.

### 5. A11y
Facet value buttons get `aria-pressed={active}`; the search input gets an `aria-label`.

**Verify:** `npx tsc --noEmit` and `npm run build` pass. Report the built size of the explore route's client payload vs. before if obtainable from build output.

---

## Phase 2B — Ask: retrieval quality, conversation memory, rate limit, chat polish

Files: `lib/tube/chat-retrieval.ts`, `app/api/tube/chat/route.ts`, `components/tube/tube-tutor-client.tsx`, `lib/academy/anthropic-stream.ts`.

### 1. Fix the retrieval candidate pool
`retrieveTubeSources` runs one `.or(ilike…)` over all terms with `limit(500)` — the 500 rows come back in arbitrary order, so one common term ("skin") can flood the pool before scoring sees rows matching the specific terms. Fix:
- Query **per term** in parallel (`Promise.all`), most-specific (longest) terms first, max 6 terms, `limit(120)` per term, same column select.
- Merge and dedupe rows by `video_id + start_time`, then run the **existing** scoring, `minMatch`, and per-video diversification logic unchanged.

### 2. Conversation memory
The client sends only the latest question; follow-ups like "what dose for that?" retrieve garbage.
- Client: send `{ messages: [{role, content}, …] }` — the transcript so far (user + assistant text only, strip sources/streaming fields), capped at the last 8 turns. Keep the old `{ query }` shape working server-side for compatibility.
- Server retrieval query: tokenize the latest user message; if it yields **< 3 terms**, merge in tokens from earlier user messages (most recent first) until ≥ 3 terms or exhausted. Retrieval otherwise unchanged.
- Generation: extend `AnthropicStreamOpts` with optional `messages: {role: "user"|"assistant"; content: string}[]` — when provided, send those as the Messages API `messages` array instead of the single prompt (keep `prompt` working; the Academy tutor still uses it). The tube route passes the conversation (last 8 turns) with the grounding instruction appended to the final user turn. System prompt (with `<sources>`) unchanged.

### 3. Rate limiting
`/api/tube/chat` is an Opus-backed endpoint that is fully public whenever `BETA_ACCESS_PASSWORD` is unset. Add a small in-memory sliding-window limiter in the route module: key = first IP in `x-forwarded-for` (fallback `"unknown"`), **10 requests/min**, over-limit → `429` JSON `{ error: "Too many requests — try again in a moment." }`. The client should surface that message via the existing error path. (In-memory is fine for this single-instance demo; note that in a comment.)

### 4. Chat polish
- **Stop generation:** wire an `AbortController` into the fetch; while streaming, the send button becomes a stop button (square icon) that aborts and finalizes the message with whatever streamed.
- **Auto-grow textarea:** grow with content up to the existing `max-h-32`, reset after send. Keep Enter-to-send / Shift+Enter-newline.

**Verify:** `npx tsc --noEmit` and `npm run build` pass. If `.env.local` has the needed keys, start the dev server and POST twice to `/api/tube/chat` (a question, then a pronoun-only follow-up like "what dose for that?") and confirm the follow-up returns relevant sources; also confirm the 11th rapid request 429s. If keys are missing, say so instead of claiming verified.

---

## Phase 3 — Watch page: moments + ask-about-this-video (after 2B)

Files: `app/tube/[id]/page.tsx`, `lib/tube/chat-retrieval.ts`, `app/api/tube/chat/route.ts`, `components/tube/tube-tutor-client.tsx`.

### 1. Moments
Add `getVideoMoments(videoId: string, max = 8)` to `chat-retrieval.ts`: fetch that video's transcript chunks (`video_id, start_time, chunk_text`) ordered by `start_time`, pick `max` evenly-spaced chunks, return `{ start, label }` where label = first ~140 chars of the chunk (word boundary + `…`). On the watch page, render a "Moments" section (between summary/tags and Related): each moment is a `<Link href="/tube/{id}?t={start}">` showing the `m:ss` timestamp + snippet. Skip the section entirely if no chunks come back.

### 2. Ask about this video
- `retrieveTubeSources` gains an optional `videoId` filter (adds `.eq("video_id", videoId)`; skip the per-video-diversification cap when scoped).
- The API route accepts optional `videoId` and passes it through.
- `TubeTutorClient` gains an optional `videoId` prop (forwarded in the POST body) and an optional `compact` presentation if needed.
- Watch page: an "Ask about this video" section above Related embedding the scoped chat (sensible fixed height, e.g. ~28rem). Starters can be generic ("Summarize the key technique shown", "What safety points are covered?").

**Verify:** `npx tsc --noEmit` and `npm run build` pass; watch page renders with and without a `?t=` param.

---

## Phase 4 — Verification (orchestrator)

1. `npm run build` from clean state (if Turbopack acts up, delete `.next` and retry — known corruption issue).
2. Lint the touched files (`npx eslint <files>`).
3. Dev-server smoke: `/tube`, `/tube/explore` (apply filter → URL updates → reload preserves it), `/tube/[id]` of a known video, chat happy-path if keys allow.
4. Report results honestly; leave everything uncommitted.

---

## Explicitly deferred (not in this execution)

- **Semantic / FTS retrieval** — needs a `tsvector` + GIN index migration (or an embedding key for the existing `match_youtube_transcripts` RPC) on the RAG Supabase; DB change, do deliberately.
- **`published_at` + `generatedAt` in baked data, sort options** — requires re-running the bake script against Supabase.
- **Chat model choice (Opus → Sonnet)** — measure quality first; rate limiting covers the cost-exposure risk for now.
- `getTubeFeatured` dead code in `lib/tube/server.ts` — left alone per surgical-changes rule.
