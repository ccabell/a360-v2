# BUILD SPEC — Dr. Tim Pearce Injector Academy (real, functional, Day-1)

Autonomous overnight build. This is **not a demo** — it must be a genuinely useful application an
aesthetic injector could open tomorrow and learn from. Build it real, grounded in real transcript data,
cited to the second.

---

## What this is

An **advanced injectables education + reference platform** built entirely around **Dr. Tim Pearce's
video corpus** (the "Aesthetics Mastery Show" and his tutorials), enriched with the aesthetics podcast
corpus. Two products in one surface:

1. **The Course** — a structured curriculum (foundations → anatomy → safety/danger zones →
   complications → regional technique → hyaluronidase/dissolving → patient selection → practice growth)
   built from his videos, with learning paths and progress.
2. **The Reference Guide** — a searchable clinical encyclopedia. Each topic (e.g. *Vascular Occlusion*,
   *Masseter Botox*, *Tear Trough*) aggregates every relevant video segment + podcast corroboration,
   each with a **jump-to-exact-timestamp** link.

Plus deep, navigable topic structure and **jump-to-specific-moment** playback throughout.

---

## VERIFIED DATA (already confirmed live — build on this, it's real)

**RAG Supabase project `gjqicqldjgvrwmtkliie`** (creds in this worktree's `.env.local` as
`RAG_SUPABASE_URL` / `RAG_SUPABASE_KEY`; you may also use the Supabase MCP `execute_sql` against that
project_id for build-time extraction):

- **`youtube_tim_pearce`** — **408 distinct videos**, **33,380 transcript chunks**, merged into
  **~60-second segments** with `start_time` / `end_time` (numeric seconds), `video_title`, `filename`,
  `chunk_text`, `chunk_index`, `embedding` (pgvector), `metadata` (jsonb: `has_embedding`,
  `segment_length` only). Longest video ~2h. Topics span: vascular occlusion & necrosis avoidance,
  filler danger/blindness points, masseter & jawline & chin & lip & brow technique (many "live inject"
  videos), hyaluronidase overdose/dissolving, haematoma vs occlusion, autoimmune/contraindications,
  facial muscle anatomy, complication management, plus practice/business growth.
- **`podcast_chunks`** — **202,382 chunks across 8,688 episodes** (same project) for cross-corpus
  enrichment of each topic. ~149 chunks name-drop Pearce directly; far more cover the same clinical
  topics. Use it to corroborate/expand reference entries.

### DATA GAP #1 — SOLVED (real YouTube IDs already resolved for you)
The DB stores no video ID, but this has been **resolved**: Dr Tim Pearce's channel
(`UCXxVLeX27Pi3VeBbDRrKfKg`) was dumped with `yt-dlp --flat-playlist` (484 videos) and matched to all
408 DB titles by NFKC-normalized title key. **408/408 matched.** Use these committed artifacts:
- **`lib/academy/data/video_id_map.json`** — `{ db_video_title: { video_id, channel_title, duration,
  match } }`. This is your bridge from transcript rows → real YouTube videos.
- `.planning/research/channel_videos.tsv` — full channel dump (id, title, duration).
- `scripts/resolve-tim-pearce-video-ids.py` — the matcher (re-runnable).
Embed real videos with `https://www.youtube.com/embed/<video_id>?start=<segment_start_seconds>` so every
transcript segment deep-links to the exact moment. (One title is a `.en(1)` re-download dup — dedupe it.)

### DATA GAP #2 — `chunk_text` is VTT rolling-caption noise — phrases triple-repeat
   (e.g. *"a hypertonic infra medial orbicularis a hypertonic infra medial orbicularis a hypertonic
   infra medial orbicularis oculi muscle..."*). You **MUST clean this** before display: collapse
   consecutive duplicate phrases/words, stitch 60s segments into a clean continuous transcript while
   **preserving segment start/end times** for deep-linking. Cleaned transcript quality is load-bearing
   for the whole product — invest here first.

---

## Dr Tim Pearce — real brand context (use for curriculum scaffolding + branding)
Dr Tim Pearce, MB ChB BSc(Hons) MRCGP — physician, founder/clinical director of **SkinViva Clinic &
Training Academy**; 15 yrs, 25,000+ injectable treatments, trained ~24,000 injectors. Channel: the
**"Aesthetics Mastery Show"** + tutorials. Site: `drtimpearce.com`. His real course catalog maps almost
1:1 onto a curriculum spine you should mirror:
- **Botox Foundation** · **Botulinum Toxin Complications** · **Dermal Filler Complications** ·
  **Elective Lip Reversal** · **8D Lip Design** · **Longevity**.
- Core themes: complication safety (vascular occlusion, necrosis, ptosis), detailed anatomy & muscle
  vectors, patient consultation/selection, advanced technique, ethics, business growth, longevity.
- Brand voice: *"Elevate Your Expertise."* Audience: medical professionals only. Attribute clearly to
  Dr Tim Pearce; this is an educational/reference aid.

The 408 videos cluster naturally into modules: **Safety & Complications** (VO, necrosis, haematoma,
hyaluronidase, ptosis, danger zones), **Facial Anatomy** (muscles, fat pads, ligaments, arteries,
vectors), **Botox Technique** (by region + depth masterclasses), **Filler Technique** (lips, cheeks,
chin, jawline, tear trough, nose), **Consultation & Ethics**, **Business & Growth**, **Longevity**.

## NEW FEATURE — AI Chat tutor (required)
Add a **real AI chat tool** so a user can ask questions and get answers grounded in the corpus. Wire it
to Claude via the existing pattern (`ANTHROPIC_API_KEY`, `claude-opus-4-8`) — reuse the app's existing
agent/chat plumbing if present (look at `app/dashboard/chat`, `lib/agent-runtime`, `/api/agent-runner`)
rather than inventing a new runtime. **RAG over the corpus:** retrieve relevant cleaned transcript
segments (+ podcast chunks) — the `embedding` columns are pgvector, or precompute an index at build —
and have the model answer **with citations that deep-link to the exact video + timestamp.** It must
ground every answer in retrieved segments and say when it doesn't know. This is the "interact with Dr
Tim's knowledge" experience — make it feel alive but honest.

## NEW FEATURE — Illustration Reference tool (required; pipeline already proven)
Dr Tim's videos are full of teaching illustrations (muscle anatomy, arteries, danger zones, injection
markups). Build a **visual illustration reference**: a browsable/searchable gallery of extracted frames,
each tagged to its video + timestamp + topic, cross-linked into lessons and reference entries.
**The extraction pipeline is proven** (a sample is already committed at
`public/academy/illustrations/dPbQWrd6iZs/` — 38 frames from "Facial Muscle Anatomy"). Recipe:
1. Download (YouTube now bot-gates — **must** pass cookies): `yt-dlp --cookies-from-browser firefox -f
   "best[height<=720][ext=mp4]/best[height<=720]/best" "https://www.youtube.com/watch?v=<id>" -o v.mp4`
   (edge/chrome cookie DBs were locked; **firefox worked**).
2. Scene-cut frames + timestamps: `ffmpeg -i v.mp4 -vf
   "select='gt(scene,0.40)',metadata=print:file=frames.txt" -vsync vfr -q:v 3 scene_%03d.jpg`
   (`frames.txt` gives each frame's `pts_time` → map frame→transcript segment→deep-link).
3. Optional: use Claude vision (`claude-opus-4-8`) to caption/classify each frame (anatomy diagram vs
   markup vs talking-head) so you can filter to the real illustrations and auto-tag them.
**Scope sensibly:** don't download all 408 overnight — curate a high-value set (the anatomy / danger-zone
/ markup-heavy videos) for v1, log what you covered, and make the pipeline re-runnable for the rest.

## Build target & rules

- **Workspace:** THIS worktree — `C:\Projects\a360-v2-academy`, branch `feat/tim-pearce-academy`.
  **Do NOT touch other worktrees** (`a360-v2-wse` is mid-flight with Scribe/TCP/Exchange — off-limits).
- **Stack:** the existing shadcn/ui + Tailwind runtime. **NOT MUI.** ⚠️ Modified Next.js — read
  `node_modules/next/dist/docs/` before any route/server code; request gate is **`proxy.ts`** (not
  middleware); **`params` is a Promise** (`const { id } = await params`).
- **Determinism / Day-1:** extract + clean the corpus into **committed JSON** (per-video cleaned
  transcript + segments + topic tags + a curriculum/taxonomy index). 408 videos is a few MB — fine.
  The app reads the baked content so it's instant and never depends on the live noisy DB at runtime.
  (Semantic search may use embeddings at build time to precompute relations; runtime search can be a
  precomputed index.)
- **Content integrity (critical, this is what makes it real):** do **NOT** invent clinical content.
  **Every** reference-guide statement, summary, and "key point" must trace to a specific source —
  cite `video_title` + timestamp (or podcast episode). If you can't cite it, don't assert it. The
  value is *navigable, attributed* knowledge, not paraphrased medical advice.
- **Attribution / framing:** internal educational tool; attribute clearly to Dr. Tim Pearce; this is a
  training/reference aid, not original medical guidance.
- **Verify as you go:** run the dev server and use the browser preview; screenshot key screens; don't
  claim a screen works without seeing it render. Commit atomically and frequently (nothing lost).

---

## Suggested phase order (prioritized so a usable artifact exists even if you don't finish everything)

1. **Data pipeline FIRST.** Script: pull all `youtube_tim_pearce`, clean the rolling-caption
   repetition, stitch per-video transcripts with preserved timestamped segments, derive a topic
   taxonomy (cluster titles + content into curriculum modules + reference topics), tag every video and
   segment. Write committed JSON under `lib/academy/data/` (or similar) + a generation script under
   `scripts/`. Validate counts (expect 408 videos). **This is the foundation — get it clean.**
2. **App shell + navigation.** New sidebar tab ("Academy" / "Injector Academy"), route
   `/dashboard/academy`. Curriculum/IA: modules → topics → lessons. Premium, on-brand, motion-aware.
3. **Lesson/video page — the core.** Player (embedded YouTube if ID resolved, else transcript-first),
   **cleaned transcript with clickable timestamped segments that jump playback to that second**,
   chapter/topic markers down the side, auto-generated key-points (each citing its timestamp), related
   lessons, and a podcast-corroboration panel.
4. **Reference Guide.** Topic encyclopedia: each entry aggregates every relevant video segment +
   podcast evidence with jump links. Cross-linked to course lessons.
5. **Search.** Global search across the corpus (semantic if you precompute it; else strong keyword over
   cleaned text + topic index). Results deep-link to the exact video timestamp.
6. **Polish + handoff.** Empty/loading states, motion, responsive. Write `ACADEMY_README.md` (what it
   is, how to run) and keep a running `BUILD_LOG.md` updated as you go. Push the branch.

---

## Morning handoff (do this so the work is reviewable)

- Keep `C:\Projects\a360-v2-academy\.planning\BUILD_LOG.md` updated continuously: what's done, what's
  partial, decisions made, gaps, and exact next steps. Commit it.
- Leave the dev server runnable (`npm run dev`) and list the routes to visit.
- End with an honest status: what's real and working vs. stubbed, with screenshots referenced.
