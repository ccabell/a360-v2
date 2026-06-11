# Layered Context Model — How Agent Context Is Assembled

Stop mapping sources to agents. Map sources to **layers**, then define each agent as a job plus a recipe of layers.

**Status**: Approved
**Companion to**: CONTEXT_ASSEMBLY.md (retrieval patterns), RETRIEVAL_SERVICE.md (search pipeline)
**Last Updated**: 2026-06-11

---

## The Problem This Solves

With six or seven overlapping data sources — GL products, practice catalogs, playbooks, transcripts, PubMed, YouTube, podcasts — every agent risks becoming a bespoke pile of data-wiring. The layered model gives every agent the same six-layer structure. Agents differ only in which layers they include and how deep each one goes.

---

## 1. Fillers vs. Juvederm: Hierarchy, Not Duplication

"Fillers" and "Juvederm" aren't overlapping sources — they're two levels of one taxonomy: **category -> product -> practice's version of the product**. The GL schema already encodes this; `library_vocab` is the spine.

The resolution rule extends the same pattern used for GL-vs-practice pricing:

**Specific overrides general; general fills gaps where specific is silent.**

If the consultation mentions Juvederm Voluma:
- **Product level**: FDA indications, dosing, contraindications, brand positioning vs. Restylane
- **Category level**: how filler consultations work, anatomy of "natural look" objections, cross-category sequencing (filler before/after Botox)
- **Practice level**: whether they carry Voluma, their actual price, their tone preferences

Category knowledge that conflicts with product-specific facts loses. Category knowledge on topics where product docs are silent fills in. Practice overrides everything global.

Full precedence chain: **practice > product > category**, walked top-down for overrides and bottom-up for gap-filling. One COALESCE pattern, three rungs.

---

## 2. The Six Layers

Every agent's context is assembled from the same six layers, each answering a different question:

| Layer | Question It Answers | Source | Retrieval Mode |
|-------|-------------------|--------|----------------|
| **Task** | What is my job? | Agent prompt + output schema (registry) | Fixed per agent version |
| **Procedural** | How do I do this job? | Compiled playbooks (`agent_documents`) | Loaded whole, by task tag |
| **Domain** | What is being discussed? | GL: category + product facts, guardrails, relationships | SQL via taxonomy, specific-over-general |
| **Situational** | Who is this, what happened? | Patient, consultation extraction, opportunities | SQL tools, exact |
| **Practice** | Whose rules apply? | Practice library: catalog, pricing, tone, preferences | SQL, overrides domain layer |
| **Evidence** | What does the field say? | RAG: podcasts, PubMed, YouTube, manufacturer | Vector search, on demand only |

### Layer Precedence (when layers conflict)

Fixed and explicit — written down once, resolves every "which source wins" question:

```
compliance/guardrails > practice rules > patient facts > product-specific > category-general > field practice
```

- A podcast tip never overrides a `gl_product_guardrail`
- A category generality never overrides what this patient actually said
- Global product positioning never overrides the practice's own pricing
- A PubMed finding never overrides an FDA-labeled contraindication

---

## 3. What Makes an Agent Coherent

An agent definition collapses to four things:

1. **A job** — what it produces (the output schema)
2. **A playbook set** — how it does the job (task tags selecting `agent_documents`)
3. **A layer recipe** — which layers it assembles and how deep
4. **An output schema** — the structured shape of the result

### Layer Recipes by Agent Type

| Agent | Task | Procedural | Domain | Situational | Practice | Evidence |
|-------|------|-----------|--------|-------------|----------|----------|
| EmailCampaignGenerator | Full | Campaign playbook | Products discussed | Patient + extraction + opportunities | Tone, pricing, send windows | Only if claim needs citing |
| SalesCoach | Full | All 5 skill playbooks | Thin (judging conversation, not products) | Transcript | Selling style | None |
| ResearchChat | Full | None | Query filters only | None | None | Full RAG |
| PracticeEvaluator | Full | Evaluation rubric | None | Run history | Practice config | None |
| StackingAgent | Full | Stacking playbook | Full (products + relationships + anatomy) | Extraction + concerns | Catalog + pricing | Optional supporting evidence |
| TCP Generator | Full | TCP playbook | Full (products + anatomy + concerns) | Full patient context | Full catalog + pricing + preferences | Optional clinical evidence |

### Layer Recipe Schema (for `knowledge_config` in agent_versions)

```typescript
interface LayerRecipe {
  /** Which layers this agent uses and their depth */
  layers: {
    task: true                           // Always present — agent prompt + schema
    procedural?: {
      task_tags: string[]                // Which playbooks to load
      load_mode: "whole" | "sections"    // Token budget determines this
    }
    domain?: {
      depth: "full" | "thin" | "filters_only"
      include_guardrails: boolean        // Always true for patient-facing agents
      include_relationships: boolean     // Stacking, TCP need this
      include_anatomy: boolean           // Anatomy-relevant agents
      taxonomy_walk: boolean             // Walk category -> product hierarchy
    }
    situational?: {
      include: ("patient" | "extraction" | "opportunities" | "transcript" | "run_history")[]
    }
    practice?: {
      include: ("catalog" | "pricing" | "tone" | "preferences" | "compliance" | "send_windows")[]
      override_domain: boolean           // Practice overrides global domain — usually true
    }
    evidence?: {
      enabled: boolean
      corpora?: string[]                 // Which RAG corpora to search
      filters?: {
        patient_safe?: boolean           // Required for patient-facing content
      }
      trigger: "always" | "on_demand" | "if_claim_needs_citing"
    }
  }
}
```

---

## 4. Entity Resolution at Runtime

The connective tissue is **entity resolution** — the extraction pipeline identifies entities in a consultation:

- "Juvederm Voluma" -> keys the product row, walks up to filler category
- "nasolabial folds" -> keys anatomy-mapped content
- "worried about looking overdone" -> keys the objection-handling playbook section
- "price objection" -> keys the pricing playbook and, if needed, a podcast evidence query

Entities, mapped onto `library_vocab` terms, become the keys that drive loading at every layer. The consultation doesn't get "all the data" — it gets exactly the slice its own entities select. That's what keeps a six-layer context from becoming a 100K-token dump.

### Entity-to-Layer Resolution

```
Extracted entities (from consultation)
  |
  v
library_vocab mapping (279 terms)
  |
  +-- Domain layer: vocab term -> gl_products rows + gl_product_relationships
  |                 vocab term -> gl_product_anatomy rows
  |                 vocab term -> gl_product_concerns rows
  |                 category walk: product -> parent category -> gap-fill
  |
  +-- Procedural layer: vocab term -> task_tag matches in agent_documents
  |
  +-- Evidence layer: vocab terms become RAG query filters (treatments, anatomy_areas, concerns)
  |
  +-- Practice layer: vocab term -> pl_products rows (override check)
```

---

## 5. The Context Assembler Service

Build this as **one shared service**, not per-agent code.

### Interface

```
Input:  agent_key + entity_set + patient_id? + practice_id? + transcript_id?
Output: assembled context (per-layer, logged) + metadata
```

### Assembly Flow

1. Load agent version from registry -> get layer recipe
2. **Task layer**: agent prompt + output schema (always)
3. **Procedural layer**: query `agent_documents` by recipe's `task_tags`, load whole or by section
4. **Domain layer**: resolve entities -> `library_vocab` -> load GL rows with taxonomy walk (product -> category gap-fill)
5. **Situational layer**: load patient, extraction, opportunities by IDs
6. **Practice layer**: load practice overrides, apply COALESCE (practice > product > category)
7. **Evidence layer**: if recipe says to include, call retrieval service with entity-derived filters
8. **Assemble**: merge layers with precedence rules, log the complete assembled context

### Logging

Every layer's contribution is logged and inspectable. When an output is wrong, inspect one logged artifact to see exactly which layer contributed the bad input — same debuggability the retrieval-run logging gives on the RAG side.

```sql
-- Extends existing retrieval_runs table or separate context_assembly_logs
CREATE TABLE context_assembly_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID REFERENCES agent_runs(id),
  agent_id UUID REFERENCES agents(id),
  version_id UUID REFERENCES agent_versions(id),
  entity_set JSONB NOT NULL,          -- extracted entities that drove loading
  layers_loaded JSONB NOT NULL,       -- which layers were assembled, their sources
  layer_details JSONB NOT NULL,       -- per-layer: what was loaded, token counts
  total_context_tokens INT,
  assembly_duration_ms INT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 6. Worked Example: Email Campaign End-to-End

Consultation transcript mentions Voluma and a deferred decision:

1. **Extraction** emits entities: `[juvederm_voluma, nasolabial_folds, price_objection, deferred_decision]`
2. **EmailCampaignGenerator** fires
3. **Context assembler** runs the layer recipe:
   - **Task**: email campaign prompt + email sequence output schema
   - **Procedural**: loads `email_campaign_playbook` (matched by task tag)
   - **Domain**: Voluma facts + guardrails, with filler-category gap-fill for general approach content
   - **Situational**: this patient's sentiment, discussed pricing, deferred decision details
   - **Practice**: tone, signature, actual Voluma price (overriding GL), send windows
   - **Evidence**: one optional query fetches a patient-safe stat for email 2, cited via standard pipeline
4. **Generation** runs against assembled context
5. **Post-processing**: citations resolved, compliance check, output logged

Every layer's contribution is logged and inspectable.

---

## 7. Relationship to Existing Docs

| Doc | Relationship |
|-----|-------------|
| **CONTEXT_ASSEMBLY.md** | Defines the *three retrieval patterns* (SQL / playbook / RAG). This doc defines the *six layers* that use those patterns. |
| **RETRIEVAL_SERVICE.md** | Implements the Evidence layer's search pipeline. Called by the assembler when the recipe includes evidence. |
| **DATA_SOURCES_v2.md** | Maps which Supabase project serves which layer. Agent Manager + CMS + PR. |
| **Agent Manager UI** | The layer recipe becomes a visual config in the agent builder — see knowledge_config on agent_versions. |

---

## 8. Schema Changes Required

### `knowledge_config` on `agent_versions` — Use for Layer Recipe

The opaque JSONB field `knowledge_config` on `agent_versions` should store the `LayerRecipe` defined in section 3. This gives each agent version an explicit, inspectable, diffable definition of which context it receives.

### `fuel_contract` on `agent_versions` — Repurpose or Remove

This field was carried over from v1 "agent fuel" terminology. In the layered model:
- If it describes which domain data the agent *requires* to function (minimum GL coverage), keep it as a validation contract
- Otherwise, remove it — the layer recipe in `knowledge_config` supersedes it

### `guardrail_config` on `agent_versions` — Keep Separate

Guardrails are orthogonal to context assembly — they constrain *output*, not *input*. Keep this as a separate field, but document its schema.
