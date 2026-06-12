# A360 Documentation Package — Index

Manifest of all documentation produced in the 2026-06-11 working sessions. This is the package README; everything decided in conversation is captured in one of these files.

**Next step**: these feed the Master Document (the agentic-infrastructure bible) and the June 22 Boulevard demo project plan.

---

## The Package (8 files)

| # | File | What it contains | Status |
|---|------|------------------|--------|
| 1 | **A360_SYSTEM_MAP.md** | The architecture spine: data source inventory, six-layer context model, precedence stack, draft agent registry (~7 agents), playbook taxonomy, 7 workflows (runtime + offline pipelines), shared services, build order, standing rules | Working reference — update as decisions land |
| 2 | **RETRIEVAL_SERVICE.md** | Full RAG/citation pipeline spec: retrieval-ID scheme, request/response schemas with per-corpus locators, hybrid search + RRF + authority-weight fusion, citation post-processor with bidirectional validation, chat orchestration + query rewriting, SSE protocol, run-logging tables, eval hooks, ingestion locator requirements | Draft spec, build-ready |
| 3 | **A360_AGENT_MANAGER_PREBUILD_REVIEW.md** | The 8-finding review of the Agent Manager doc package: v1/v2 source-of-truth conflict, missing manager page designs, contract gaps, runtime adapter, citation enforcement, confidence display, PHI/auth contradiction, definition ownership — plus agreed order of operations | Findings accepted; execution pending |
| 4 | **A360_CONTEXT_TOOLING_DECISIONS.md** | Tool-calling placement (assembly vs. tools), playbooks-as-tools rules, extracted-data-vs-whole-transcript framework with per-agent policy, prompt-caching strategy, podcast query/citation policy | Decision record |
| 5 | **PLAYBOOK_email_campaign.md** | First compiled playbook (v1.0.0): the EmailCampaignGenerator's complete operating rules distilled from ~70K tokens of Reach requirements into ~2,600 tokens, with conflict flags, source manifest, podcast-enrichment TODO slots. Template for all future playbook compiles | Draft — 4 flagged conflicts awaiting Chris |
| 6 | **PASS1_CONTEXT_OFFERINGS_v3.3.md** | Rewritten extraction prompt: cache-structured segments, Evidence Contract (exact-substring anchoring), price capture, prior_treatments, provider_deferred, traps section, machine-checkable consistency rules | Ready for shadow run vs v3.2 |
| 7 | **PASS2_OUTCOME_INTELLIGENCE_v3.3.md** | Rewritten extraction prompt: outcome precedence, partner three-way rule, resolution semantics, new safety/retention/referral signal tags, price_quote event, hardened checklist evaluation | Ready for shadow run vs v3.2 |
| 8 | **EXTRACTION_V3.3_CHANGES_AND_IMPLEMENTATION.md** | Every v3.2→v3.3 change with rationale; runtime config; the validate-then-targeted-retry loop; eval/shadow-run/rollout plan; 5 judgment calls to ratify | Companion to 6–7 |

## Coverage map (conversation → files)

| Session topic | Captured in |
|---|---|
| Agent Manager doc review | #3 |
| RAG research chat design | #2 (+ rationale summarized in #2 §1 principles) |
| Supabase data / PDFs / MD playbook strategy (SQL-exact / playbook-procedural / RAG-unknown) | #1 §10, #1 §5–6, #4 |
| Corpus processing logistics (Claude Code compiler, podcast mining) | #1 §7 W5–W7 |
| Podcast usage & citation policy | #4 §4, #5 §8 |
| Sales Excellence folders → agents-vs-playbooks reframe, registry | #1 §4–6 |
| Fillers-vs-Juvederm / layered context / precedence | #1 §3 |
| Tool calling & transcript-vs-extraction | #4 |
| Extraction prompt rewrite | #6, #7, #8 |

## Known open items carried by the package

1. Ratify the 4 playbook conflict flags (#5) and 5 extraction judgment calls (#8 §10)
2. GL v1/v2 reconciliation + REQUIREMENTS rewrite (#3 finding 1)
3. Context Assembler spec — the agreed companion doc to #2, not yet written
4. Registry document finalization (agents + playbooks) pending folder 06 contents and Sales Excellence folder compiles
5. Ingestion locator fixes (YouTube timestamps, PDF page numbers) before further ingestion (#2 §10)
