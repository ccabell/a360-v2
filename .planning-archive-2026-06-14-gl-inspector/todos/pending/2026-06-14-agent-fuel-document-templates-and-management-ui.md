---
created: 2026-06-14T15:30:40.463Z
title: Agent fuel document templates and management UI
area: planning
files:
  - .planning/phases/11-source-framework-and-v1.1-closeout/ENRICHMENT_PIPELINE.md
  - .planning/phases/11-source-framework-and-v1.1-closeout/MANUFACTURER_DATA_ACCESS.md
  - .planning/REQUIREMENTS.md
---

## Problem

Agent fuel documents are currently treated as backend data artifacts — generated content stored in `gl_agent_fuel_documents` with no structured template or practice-facing management interface. Phases 12-14 will generate fuel docs (combination, concern, compiled packets), but there's no:

1. **Canonical template** defining what a fuel doc must contain (sections, evidence requirements, tone guidelines)
2. **Management UI** for practices to view, edit, and customize fuel docs for their products
3. **Bridge** between the enrichment pipeline (Phase 11) that produces source data and the fuel docs that agents consume

Without this, fuel docs remain invisible backend blobs that only Claude can create/edit. Practices can't review, correct, or customize the intelligence their agents use.

## Solution

Two-part approach:

### Part 1: Fuel Doc Template Schema
- Define the canonical structure for each fuel doc type (combination, concern, compiled packet)
- Specify required sections (e.g., rationale, patient_education, staff_talking_points, what_not_to_say, evidence_notes)
- Define evidence requirements per section (which sections need citations, which allow expert consensus)
- Define tone guidelines (education, not sales pitch — per COMBO-02)
- Template supports the gl_*/pl_* COALESCE pattern already designed for practice-level overrides

### Part 2: Practice Management UI
- Product-centric view: select a product, see all its fuel docs (combination pairings, concern arcs, compiled packets)
- Edit interface: practices can modify staff_talking_points, patient_education, add practice-specific notes
- Override tracking: clearly show what's global (GL) vs practice-customized (PL)
- Regeneration flow: when enrichment pipeline adds new sources, UI shows which fuel docs are stale and need review
- Version history: track changes to fuel docs over time

### Connection to existing work
- ENRICHMENT_PIPELINE.md (Phase 11) Step 5 flags stale fuel docs — the UI surfaces these flags
- SOURCE_CLASSIFICATION.md citation formats flow into fuel doc evidence sections
- COMBO-04 (practice-level overrides) is the data layer this UI sits on top of
- FUEL-01 through FUEL-05 (Phase 14) define the compiled packet format the UI manages
