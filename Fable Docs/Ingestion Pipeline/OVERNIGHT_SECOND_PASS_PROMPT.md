# Overnight Second Pass — Discovery Research & Source Registry

Paste to Claude Code. Assumes the first overnight pass compiled the Neurotoxins + Botox calibration dossiers (draft). This pass adds the source registry, runs discovery research on the weak claims, auto-corrects (flagged), and queues open-license sources for ingestion. Autonomous; stops at the gate.

---

**Second overnight pass — A360 dossier discovery research. Work autonomously; stop at the hard gate.**

Read `SOURCE_REGISTRY_AND_DISCOVERY.md` plus the five dossier files. Target DB `aejskvmpembryunnbgrk`. I'm asleep — where instructions say "confirm with Chris," do the safe thing, log it, continue through this pass only. Do NOT run the full batch compile. Scope:

1. **Apply the three additive migrations** via `apply_migration`: `0003_source_registry` (enum + table + seed the rows from §2 of the addendum), `0004_ingestion_queue`, `0005_research_log`. Verify each table exists. These are additive; nothing existing is touched.

2. **Discovery pass on the calibration dossiers.** For the Neurotoxins and Botox dossiers compiled last night, find every claim that triggers discovery (clinical/safety claim at authority_rank > 4, or a section coverage flag, or single-source clinical claim). For each:
   - Web-research higher-authority sources (society consensus, PubMed, registry journals by doi_prefix).
   - Classify each source found into `source_registry` (create `status='review'` rows for unknowns, with best-guess authority_rank and rights_class='unknown').
   - **Reverify** the claim against the sources. Confirm / **correct** / mark unsupported per the addendum §3.
   - For corrected claims: rewrite to what the source supports, attach evidence_links at the new rank, set the dossier claim `status='corrected'`, and record a before/after diff. **Do not silently change anything.**
   - Apply the ingestion gate: queue ingestible sources (public_domain / CC-BY / manufacturer_permitted) into `ingestion_queue`; cite-only sources become evidence_links with attribution, never queued.
   - Log every action to `research_log`.
   - **Start with the known one**: the "Botox 2 weeks before filler" / energy-device-spacing claims in the Neurotoxins §Class Planning and Botox §Combination Sequencing guides. Expect to find Carruthers 2016 (ASDS, rank 4, paywalled→cite) and Urdiales-Gálvez 2019 (CC-BY→ingest) and to CORRECT the sequencing claim. Alam 2006 supports the ~2-week filler-then-energy spacing.

3. **Do NOT ingest anything yet.** Only QUEUE ingestible sources. Actual ingestion into CMS vectors waits for my approval (it's a corpus-changing action).

4. **Do NOT set anything to active/approved.** Corrected claims stay `status='corrected'` pending my review of the diffs. RLS untouched.

5. **Then STOP.** Do not run discovery on other dossiers (there are only the two so far anyway) and do not start the batch compile.

**Write `OVERNIGHT_REPORT_PASS2.md`** containing: migration results; the seeded source_registry (count + any review-status rows you created); for each researched claim — the trigger reason, queries run, sources found with their authority_rank + rights_class + ingestible flag, the outcome (confirmed/corrected/unsupported), and for corrections the before/after diff; the ingestion_queue contents; and a list of the highest-value sources you found that I should consider adding to the registry permanently. Flag anything where the research contradicted an existing claim — those are the ones I most need to see.

Rules: every discovered source gets a registry row; the ingestible gate is CC-BY + manufacturer-permitted + public-domain only; auto-correct is always flagged with a diff, never silent; never leave a safety claim on field-practice alone — correct it or mark it unsupported. Post a one-line status to Slack #a360-status when done.

When the discovery pass is complete, the registry seeded, the queue populated, and the report written — stop and wait for me.

---

**Note for morning:** the most important section of the report is the corrections — claims where web research found you were saying something the literature doesn't support. That "Botox 2 weeks before filler" was wrong, not just under-cited, is the whole reason this pass matters. Review those diffs first.
