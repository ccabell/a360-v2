# BUILD LOG — Dr. Tim Pearce Injector Academy

Branch: `feat/tim-pearce-academy` · Stack: Next.js 16 + React 19 + Tailwind v4 + shadcn

This log is the morning review artifact. Honest status: done / partial / decisions / gaps / next.

---

## STATUS AT A GLANCE

| Phase | Status |
|-------|--------|
| 1. Data pipeline (extract + clean + taxonomy + bake JSON) | ✅ DONE |
| 2. App shell + Academy nav | ✅ DONE (committed) |
| 3. Lesson/video page (transcript + jump-to-timestamp) | ✅ DONE (committed) |
| 4. Reference Guide | ✅ DONE (committed) |
| 5. Search | 🟡 DATA done (search-segments.json, 7,314 rows); UI route NOT built |
| 6. Polish + handoff | ⬜ |
| + Real YouTube IDs | ✅ DONE — 407/408 wired; player embeds + deep-links at ?start=<sec> |
| + AI Chat tutor (new ask) | ⬜ NOT started |
| + Illustration Reference tool (new ask) | ⬜ pipeline proven (POC frames committed), tool NOT built |

> NOTE: the background build agent **died when its parent process exited** (work
> survived because it committed often). Phases 2–4 landed; it was mid-Phase-5 (search)
> when killed. A follow-up session (manual) then resolved + wired all 408 real YouTube
> IDs and verified routes render (landing/reference/lesson all HTTP 200, "Watch video"
> embed present). Remaining: search UI, AI chat tutor, illustration tool, polish.

---

## PHASE 1 — DATA PIPELINE ✅ (committed)

**Result: real, validated, baked.** Generated deterministic JSON from the live corpus.

- Source: `youtube_tim_pearce` (RAG Supabase `gjqicqldjgvrwmtkliie`) — 33,380 chunks.
- **408 videos** (validated == expected), **20,710 cleaned segments**, **69.5h** total runtime.
- **275 substantial lessons** (≥4 segments & ≥180s); rest are short clips.
- **10 curriculum modules**, **41 reference topics** (keyword taxonomy).
- Podcast corroboration attached to 37/41 topics from `podcast_chunks` (202K chunks, 8,688 episodes) joined via `podcast_episodes` → `podcast_shows`.

### The load-bearing win: transcript cleaning
`chunk_text` is VTT rolling-caption noise — each ~2-line caption window repeats 3×.
`lib/academy/clean-transcript.ts` collapses immediately-repeated word/phrase runs
(window 12→1) and stitches 60s segments removing boundary overlap, **preserving
per-segment start/end seconds** for deep-linking. Verified on real samples:
raw `"a hypertonic infra medial orbicularis ×3 oculi muscle ×3 ..."` →
`"a hypertonic infra medial orbicularis oculi muscle ..."`. Purely mechanical
de-dup — never invents words, so cleaned text stays a faithful, citable transcript.

### Content integrity
Tagging is deterministic keyword matching (`lib/academy/tag.ts`) over title (×8) +
body (×1). Key-points and chapter labels are derived from the highest-signal
**real** segments and are verbatim excerpts anchored to a timestamp — no model
invention. Nothing asserted without a `video_title` + second offset behind it.

### Files
- `lib/academy/types.ts` — all shared types.
- `lib/academy/taxonomy.ts` — 10 modules + 41 topics with keyword matchers.
- `lib/academy/clean-transcript.ts` — the cleaner/stitcher (reused by app).
- `lib/academy/tag.ts` — title normalisation, slugs, topic scoring.
- `scripts/academy/generate-academy-data.ts` — the generator (re-runnable).
- `lib/academy/data/index.json` (308K) — stats + modules + topics + video summaries.
- `lib/academy/data/topics.json` (828K) — reference entries: cited segments + podcast.
- `lib/academy/data/videos/<slug>.json` (×408, 13M) — full transcript, segments,
  chapters, key-points, related.

### Regenerate
```
npx tsx scripts/academy/generate-academy-data.ts
```

### Known gaps / decisions
- **YouTube IDs unresolved** (`youtubeId: null` everywhere). No YT Data API key in
  env. DECISION: build transcript-first; player works without the embed and offers
  a "search on YouTube" fallback. Non-blocking, per spec. A resolver pass can be
  added later if a key appears.
- A few long interview videos have many short raw chunks (≈2s), inflating segment
  counts. Timestamps remain correct; harmless. Not worth re-bucketing tonight.
- Minor residual repeat can survive at a chunk's leading edge; bulk text is clean.

---

## NEXT STEPS (exact)
1. `lib/academy/server.ts` — typed loaders for index/topic/video JSON.
2. Add "Academy" to `components/layout/sidebar.tsx`; build `/dashboard/academy`.
3. Lesson page `/dashboard/academy/lesson/[slug]` — transcript-first player,
   clickable timestamped segments (jump), chapter rail, cited key-points, related.
4. Reference Guide `/dashboard/academy/reference` + topic pages.
5. Global search over baked index.
6. ACADEMY_README.md + polish.
