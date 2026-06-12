# A360 Context, Tooling & Transcript Strategy (Conversation Record)

Decision frameworks from the 2026-06-11 sessions that exist only in chat. Companion to A360_SYSTEM_MAP.md (which holds the six-layer model and precedence stack these build on).

---

## 1. Where tool calling lives

**Assembly for the predictable, tools for the conditional.** Layers L1–L5 (task, playbook, domain, situational, practice) are deterministic given the entities — the context assembler loads them before the model runs. Making the model tool-call for its own playbook or practice config adds latency, cost, and a can-fail step for something already known to be needed. Tools exist only for what can't be known until mid-reasoning: evidence queries whose terms depend on what's being written (L6), lookups whose need emerges during generation, and actions (writes/syncs — usually better owned by the workflow than the model).

**Per-agent tool footprint** (record in registry as part of the layer recipe):

| Agent | Runtime tools | Rationale |
|---|---|---|
| OpportunityExtractor | none | pure transform |
| SalesCoach | none, or transcript-span fetch | everything judged is assembled |
| PracticeEvaluator | none | pre-aggregated history |
| EmailCampaignGenerator | evidence search, catalog check | conditional needs only |
| ResearchChat | several retrieval tools | the job IS tool use |

Fewer tool rounds = cheaper, faster, reproducible, evaluable. Most agents should sit near zero.

## 2. Playbooks as tools

**Primary playbooks: never.** The governing playbook contains the rules for when to call tools — an agent can't know it needs instructions it hasn't read. Always pushed, whole.

**Legitimate pull, one level down:** conditional sections and reference material the playbook routes to ("if fear/anxiety objection → Education & Reassurance pattern" can live behind `load_playbook_section`); reference docs in the 8–50K band get TOC pushed, sections pulled.

**Rule:** push the rules; pull the reference material the rules point to. Playbooks govern tools; tools never govern playbooks. Tool-firing conditions are written INTO playbooks as explicit triggers, capped by `max_tool_rounds` in version constraints.

## 3. Extracted data vs. whole transcript

Extraction = lossy, cheap, structured projection — read the transcript once, amortize forever. Transcript = lossless, expensive (8–12K tokens; 4 downstream re-reads ≈ 40K tokens where ~6K of extraction suffices).

**Decision rule — what does the task consume?**
- **Consumes facts** (email generation, opportunity tracking, dashboards, routing) → extraction. It's the *correct* representation, not a degraded one — validated, structured, queryable.
- **Judges the conversation** (SalesCoach: rapport, discovery quality, how an objection was *handled*, missed closes) → transcript. Extraction destroys exactly what coaching evaluates.

**Hybrid pattern — extraction as index, transcript spans as evidence:** extracted items carry offsets (v3.3 achieves this via exact-substring evidence quotes, anchored programmatically); downstream agents fetch spans (±context), not transcripts. SalesCoach can score per-KPI against the relevant span. Same parent-expansion logic as the retrieval service.

**Refinements:**
- Verbatim quotes captured at extraction time (the patient's own framing) eliminate most transcript reaching for email generation.
- **Graduation rule:** an agent repeatedly fetching the same transcript region = a missing extraction field. Promote it into the schema, exactly as recurring RAG queries graduate into playbooks.

**Per-agent policy:** Extractor reads transcript (its job) · SalesCoach gets extraction-scaffold + transcript/spans (runs once per consult; bounded cost) · EmailCampaignGenerator gets extraction only, span-fetch as rare escape hatch · PracticeEvaluator gets extractions and scores only, never transcripts.

**Prompt caching changes the math:** Pass 1, Pass 2, SalesCoach structured with a byte-identical shared prefix (system + transcript/catalog block) pay ~10% for cached reads. Pipeline runs back-to-back per consultation event — "give SalesCoach the whole transcript" becomes nearly free. (Implemented in extraction v3.3 Segments A/B.)

**One-liner:** extraction is the API to the conversation; the transcript is its source code. Most consumers hit the API; only the agent reviewing the conversation reads source; when the API keeps missing something, extend the API.

## 4. Podcast data — when to query, when to cite

**Query when the situation is specific and the playbook is general.** Playbooks intentionally hold stable, general rules (email 2 = value reinforcement); podcasts supply situational field practice (how injectors frame Sculptra for an overdone-look worry; per-session vs. package price framing). Triggers: (a) consultation introduces a specific product/objection/scenario needing language or framing the playbook doesn't contain; (b) gap fallback — playbook silent, search field practice rather than freelancing from training data, flag the provenance.

**Never query for the deterministic** (timing, sequence structure, compliance, pricing, catalog) and **never let field content override** playbook/guardrails — podcasts sit at 0.90 authority by design. Conflicts get logged as playbook-revision candidates, not resolved mid-run.

**Citation policy by audience:** practitioner-facing outputs (coaching, research chat, Reach rationale) cite fully — show, episode, deep link. Patient-facing copy never carries citations; evidence shapes copy, doesn't appear in it; factual claims to patients come only from patient-safe sources (FDA/PubMed/manufacturer). Provenance attaches to the practitioner-visible layer (practitioner_notes), giving auditability without leaking machinery.

**Graduation:** recurring podcast queries (every price-objection campaign searching the same framing) move into the insight bank / playbook with episode provenance preserved. Live podcast RAG is for the unpredictable tail; the system should shift weight from runtime search to compiled instruction over time.
