# Core Docs — a360-v2

**Created:** 2026-06-14

Reference documents from the CTO-level assessment and QA session. These capture the current state of the project, what's working, what's not, and where to focus.

---

## Documents

| # | Document | What it covers |
|---|----------|---------------|
| [01](01_PROJECT_ASSESSMENT.md) | **Project Assessment** | Honest CTO-level evaluation: what's strong, what's sprawling, what to do about it |
| [02](02_INFRASTRUCTURE_MAP.md) | **Infrastructure Map** | Every external service this app connects to, data flow diagrams, active vs dead connections |
| [03](03_DATA_DEPTH_AUDIT.md) | **Data Depth Audit** | Where data is rich (3 canonical patients, 550K RAG chunks), where it's thin (17 empty patients, Botox-only GL evidence), and priority order |
| [04](04_PRODUCT_SURFACES.md) | **Product Surfaces** | What's real (Consultation Intelligence + Evidence Ask) vs scaffolding (6 hardcoded pages) vs testing tools (Prompt Runner routes) |
| [05](05_QA_REPORT.md) | **QA Report** | Pass/fail per test for all 3 demo beats, including the 500 error bug on off-topic queries |
| [06](06_CLEANUP_ACTIONS.md) | **Cleanup Actions** | Prioritized action list: dead code removal, nav cleanup, data population targets |
| [07](07_GLOBAL_LIBRARY_AND_DATA_STRATEGY.md) | **Global Library & Data Strategy** | How agents use data: fuel docs + manufacturer data (primary) → PubMed/YouTube/podcasts (supplementary). GL population plan for this week. |

---

## Key Takeaways (TL;DR)

1. **Two products in one app:** Consultation Intelligence (Product A) + Evidence Ask (Product B)
2. **Three Supabase connections needed** (Ops + Agent Manager + CMS for agent enrichment). Only PR Supabase is dead code.
3. **3/20 patients are demo-ready** — the other 17 have demographics but no consultation data
4. **Evidence retrieval hardcodes Botox** — needs to be dynamic for all product families
5. **6 dashboard pages show fake hardcoded data** — should be hidden or badged
6. **One bug:** `/api/research/chat` crashes on off-topic queries (500 error)
7. **RAG corpus is strong** (550K+ chunks) but accessed via intermediary service, not directly
8. **Direction is correct** — consolidate, populate data, stop building new surfaces
