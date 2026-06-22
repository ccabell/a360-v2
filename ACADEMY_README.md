# Dr Tim Pearce Injector Academy

An advanced injectables **education + reference platform** built entirely around Dr Tim
Pearce's video corpus (the "Aesthetics Mastery Show" and his tutorials), enriched with the
aesthetics podcast corpus. Every assertion, key point, search result, AI answer, and
illustration traces to a **real video timestamp or podcast episode** — nothing is invented.

It is an internal educational/reference aid attributed to Dr Tim Pearce. It is **not** original
medical guidance.

---

## What it is

Four surfaces, all grounded in the same baked corpus:

1. **The Course** — `/dashboard/academy` → modules → lessons. 10 curriculum modules, 41
   reference topics, 408 videos, 275 substantial lessons.
2. **Lesson player** — `/dashboard/academy/lesson/<slug>` — embedded YouTube
   (`youtube-nocookie`) that deep-links to any second, a cleaned + timestamped transcript
   where every segment/chapter/key-point click seeks the video, cited key-takeaways, an
   in-lesson **illustration strip**, and podcast corroboration.
3. **Reference Guide** — `/dashboard/academy/reference` — a clinical encyclopedia; each topic
   aggregates every relevant video segment + podcast evidence with jump links.
4. **Search** — `/dashboard/academy/search` — keyword search across every cleaned transcript;
   results deep-link to the exact moment.
5. **AI Tutor** — `/dashboard/academy/tutor` — ask injectables questions; answers are
   RAG-grounded in retrieved transcript segments + podcast chunks, streamed from Claude Opus
   4.8, with citations that deep-link to the exact video + timestamp. Says when it doesn't know.
6. **Illustration Reference** — `/dashboard/academy/illustrations` — a browsable, topic-faceted
   gallery of teaching frames (anatomy diagrams, artery maps, danger zones, injection markups)
   extracted from the anatomy/safety videos; each frame links to its source moment.

---

## Routes

| Route | What |
|-------|------|
| `/dashboard/academy` | Landing — curriculum + featured lessons + CTAs |
| `/dashboard/academy/module/[id]` | Module → its lessons |
| `/dashboard/academy/lesson/[slug]` | Lesson player (`?t=<sec>` deep-links) |
| `/dashboard/academy/reference` + `/reference/[topic]` | Reference Guide |
| `/dashboard/academy/search` | Corpus search (`?q=<query>`) |
| `/dashboard/academy/tutor` | AI tutor (RAG chat) |
| `/dashboard/academy/illustrations` | Illustration gallery |

API: `GET /api/academy/search?q=` · `POST /api/academy/chat` (SSE stream).

---

## Running it

```bash
npm run dev          # Next.js 16, http://localhost:3030
```

The app reads only **baked JSON** under `lib/academy/data/` — it never touches the live DB at
runtime, so it is instant and deterministic.

### Required env (`.env.local`)

| Var | Used for |
|-----|----------|
| `ANTHROPIC_API_KEY` | AI tutor generation (Claude Opus 4.8, direct Anthropic API) |
| `RAG_SUPABASE_URL` / `RAG_SUPABASE_KEY` | **Build-time only** — data + illustration extraction |

> Note: `AI_GATEWAY_API_KEY` exists in this repo but is **unauthenticated** in this
> environment — the tutor deliberately calls Anthropic directly instead.

---

## Regenerating the data

```bash
# Transcript corpus → index.json, topics.json, videos/<slug>.json, search-segments.json
npx tsx scripts/academy/generate-academy-data.ts

# Illustration frames → public/academy/illustrations/<id>/ + illustrations.json
npx tsx scripts/academy/extract-illustrations.ts            # curated set (16 videos)
npx tsx scripts/academy/extract-illustrations.ts <id> ...   # specific video ids
npx tsx scripts/academy/extract-illustrations.ts --force    # re-download + re-cut
```

Illustration extraction needs `yt-dlp` (with **firefox** cookies — YouTube bot-gates downloads;
chrome/edge cookie DBs were locked) and `ffmpeg` on PATH.

---

## How grounding works (content integrity)

- **Transcript cleaning** (`lib/academy/clean-transcript.ts`) collapses VTT rolling-caption
  triple-repeats into faithful prose while **preserving per-segment start/end seconds** — so
  every line stays citable. Purely mechanical de-dup; never invents words.
- **Tagging** (`lib/academy/tag.ts`, `taxonomy.ts`) is deterministic keyword matching. Key
  points and chapter labels are verbatim excerpts anchored to a timestamp.
- **Search** is deterministic keyword scoring (`lib/academy/search.ts`).
- **AI tutor** retrieves real segments (`lib/academy/chat-retrieval.ts`) and instructs the model
  to answer ONLY from them, cite `[S#]/[P#]`, and refuse when unsupported. Citations map back to
  deep-links client-side.
- **Illustrations** map each scene-cut frame's `pts_time` → its second → `/lesson/<slug>?t=<sec>`.

---

## Key files

```
lib/academy/
  types.ts              shared types (incl. VideoIllustrations)
  taxonomy.ts           10 modules + 41 topics + keyword matchers
  clean-transcript.ts   VTT de-dup + stitch (timestamps preserved)
  tag.ts                slugs, topic scoring
  server.ts             cached loaders for all baked JSON
  search.ts             keyword search scoring + snippets
  chat-retrieval.ts     RAG retrieval for the tutor
  anthropic-stream.ts   direct Anthropic Messages streaming
  data/                 baked JSON (index, topics, videos/*, search-segments, illustrations)

app/dashboard/academy/  landing, module, lesson, reference, search, tutor, illustrations
app/api/academy/        search (GET), chat (SSE POST)
components/academy/     lesson-player, lesson-card, lesson-illustrations, search-client,
                        tutor-client, illustration-gallery, icons
scripts/academy/        generate-academy-data.ts, extract-illustrations.ts
public/academy/illustrations/<id>/  extracted frames (721 across 16 videos)
```

---

## Status / known gaps

- **6 of the curated illustration videos are YouTube SABR-gated** (download yields an
  undecodable placeholder). Logged + skipped; the extractor is re-runnable for the rest.
- Some illustration frames are **talking-head shots** (a minority). Optional Claude-vision
  classification to filter them was left as a future enhancement.
- A handful of long interview videos have many short (~2s) raw chunks inflating segment counts;
  timestamps remain correct.
