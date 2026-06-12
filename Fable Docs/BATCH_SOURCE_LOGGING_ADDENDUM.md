# Batch Add-On: Source Logging During Compile (no ingestion)

Paste this into the dossier batch instructions for Claude Code. It turns on aggressive source CAPTURE during the 20-product compile without doing any ingestion. Goal: every reputable source the compile encounters gets logged to `source_registry` + `ingestion_queue` for a post-demo ingestion pass, so the research you're already doing is never thrown away.

Decisions locked: **log every reputable source encountered**; **log only — no ingestion now** (except nothing; even FDA/DailyMed are logged, not ingested, during the demo window).

---

## What to turn on

The compile already searches the web for gateway/safety claims (per the discovery research phase). Right now it USES what it finds and discards the source. Change that: it must LOG every reputable source it touches.

Add to the compile run:

```
SOURCE CAPTURE (logging only — do NOT ingest anything during this batch):

For every source you encounter while compiling the 20 demo dossiers — whether you cite it,
read it, or just find it during discovery research — log it to source_registry if it is
reputable. "Reputable" = a real peer-reviewed journal, society/consensus body, regulatory
source (FDA/DailyMed), recognized manufacturer clinical material, or established clinical
publication. Log it even if it is not about one of the 20 demo products — a strong journal
is a corpus-level asset, not a per-product one.

For each source, insert a source_registry row with:
  - name, publisher, society (if any), source_kind (journal|guideline|regulatory|manufacturer|congress)
  - authority_rank (1 fda/ifu .. 6 field practice)
  - rights_class (best guess; 'unknown' is fine — a later pass verifies)
  - base_url / doi_prefix if known
  - added_by = 'discovery'
  - status = 'review'   (everything logged this way lands as 'review' for a later human pass)

If the source is ingestible-looking (public_domain, open_access_cc_by, manufacturer_permitted),
ALSO add an ingestion_queue row with status='queued' so the post-demo pass has a ready work list.
Do NOT ingest it. Do NOT pull full text. Logging only.

Deduplicate: before inserting, check source_registry by name/doi_prefix. If it exists, skip.

At the end of the batch, output a SOURCE CAPTURE REPORT: how many new sources logged, broken
down by authority_rank and source_kind, and the top 10 highest-authority sources newly found
(these are the ones Chris will most want to ingest first after the demo).
```

---

## What this does NOT do (important)

- **No ingestion.** Nothing gets chunked, embedded, or added to the CMS vectors during the batch. The runtime corpus is unchanged. Ingestion is the post-demo pass.
- **No rights adjudication now.** Everything lands `status='review'` with a best-guess `rights_class`. The careful "can we legally ingest this" analysis happens later, off the demo critical path.
- **No slowdown of the dossier work.** Logging a source is a single cheap INSERT alongside research the compile is already doing. It does not add research passes — it just stops discarding what it finds.

---

## Why this is worth doing now (not later)

The compile is walking the literature for all 20 products this week. That walk surfaces dozens of high-authority sources — the laser journal being the example that triggered this. If you don't log them now, you re-do the entire discovery walk later to rebuild the list. Logging during the batch means the research happens once. The map gets built as a free byproduct of work you're already doing; only the walking-the-map (ingestion) is deferred.

---

## After the demo: the ingestion pass (for reference, not now)

When you return to this post-June-22:
1. Query `source_registry WHERE status='review'` — your captured map.
2. Promote the ones worth ingesting to `status='active'`; verify `rights_class` (the legal check).
3. Filter `ingestion_queue WHERE ingestible=true` — the ready work list.
4. Run those through the existing PubMed-style ingestion pipeline into the CMS vectors.
5. The next compile that needs them finds them in-corpus. The library compounds.

That pass is where the laser journal, the open-access society journals, and everything else discovery found this week actually become part of your searchable intelligence.
