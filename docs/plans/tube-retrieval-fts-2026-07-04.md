# Tube Retrieval Upgrade — Postgres FTS

Date: 2026-07-04 · Follows `tube-improvements-2026-07-03.md` (deferred item #2).

**Problem:** Ask retrieval is per-term `ILIKE` over `manufacturer_youtube_transcript` (291,883 chunks, 11,320 videos, RAG Supabase `gjqicqldjgvrwmtkliie`) — sequential scans, no stemming ("dosing" ≠ "dosed"), and client-side scoring over a bounded candidate pool.

**Approach:** rank in the database with full-text search; keep the existing keyword path as fallback.

## 1. DB migration (RAG Supabase, applied by orchestrator via MCP)

- GIN expression index: `USING gin (to_tsvector('english', chunk_text))`.
- RPC `search_youtube_transcripts_fts(q text, video_filter text default null, max_rows int default 200)` → columns the client already selects (`video_id, video_title, start_time, chunk_text, manufacturer_name`) + `rank` = `ts_rank`, filtered by `@@ websearch_to_tsquery('english', q)`, optional `video_id` equality, ordered by rank desc. `STABLE`, `SECURITY INVOKER`, `SET search_path = public`.

## 2. Code change (`lib/tube/chat-retrieval.ts`, Sonnet agent)

- `retrieveTubeSources`: first call the RPC with `q = tokenized terms joined with " or "` (websearch OR semantics ≈ current OR pool, but stemmed and rank-ordered) and `max_rows 200`; run the candidate rows through the **existing** scoring / minMatch / per-video diversification unchanged.
- Fallback: if the RPC errors (env without migration) **or** returns zero rows, run the existing per-term ILIKE path unchanged. No behavior removed.
- Scoped mode (`videoId`) passes `video_filter`.

## 3. Verification

- Before/after comparison script (scratchpad): ~5 clinical questions through old path vs new; compare top source titles for relevance + wall time.
- Live: deployed chat answers still grounded with citations; scoped ask still works.

**Deferred:** true semantic search via the existing `embedding` column — needs an embedding key for query-time embedding; revisit separately.
