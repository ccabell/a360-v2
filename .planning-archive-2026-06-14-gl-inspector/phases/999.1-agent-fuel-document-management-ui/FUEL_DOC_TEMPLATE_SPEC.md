# Agent Fuel Document Template Specification

**Date:** 2026-06-14
**Status:** Draft — capturing Chris's vision for practice intelligence management
**Context:** Backlog item 999.1 — the missing layer between raw GL data and agent consumption

---

## The Idea

Agent fuel documents are the intelligence layer that agents consume at runtime. Today they're opaque JSONB rows in `gl_agent_fuel_documents`. The missing piece: **a templated, UI-managed system where practices can view, edit, and customize their intelligence**.

### Three-Layer Model

```
┌─────────────────────────────────────────────┐
│  TEMPLATES (define structure per doc type)   │  ← A360 defines
├─────────────────────────────────────────────┤
│  GLOBAL DEFAULTS (gl_agent_fuel_documents)  │  ← A360 populates with best practices
├─────────────────────────────────────────────┤
│  PRACTICE OVERRIDES (pl_agent_fuel_docs)    │  ← Practice edits via UI
└─────────────────────────────────────────────┘

Resolution: COALESCE(pl_field, gl_field) — practice wins, GL is fallback
```

### Key Principles

1. **Auto-populate with best practices.** When a practice activates a product combination, the system generates a fuel doc pre-filled with GL intelligence. Practice gets instant, good-enough content.
2. **Everything is editable.** SOPs, preferences, talking points, do-not-say — the practice owns their voice.
3. **Focus on practice library, not global.** The UI shows combinations of products the practice actually carries (pl_products), not the full GL catalog.
4. **Documents, not database rows.** Think of fuel docs as living documents with a management UI, not raw data.
5. **SOPs and preferences live alongside intelligence.** A combination fuel doc isn't just "what to say" — it includes "how we do it here."

---

## Existing Fuel Documents Inventory

### Current State: `gl_agent_fuel_documents` (29 rows)

| Type | Count | Status | Content |
|------|-------|--------|---------|
| `pairing_fuel` | ~16 | draft | Combination intelligence for canonical/common pairs |
| `product_fuel` | ~8 | draft | Per-product agent intelligence |
| `concern_fuel` | ~5 | draft | Per-concern treatment arc intelligence |

### Two Existing JSON Formats (must reconcile)

**Format A — Product-Pair Flat (6 docs):**
```json
{
  "patient_facing_name": "Skin Rejuvenation",
  "one_line_positioning": "...",
  "staff_close": "...",
  "do_not_say": ["..."],
  "who_it_is_for": "...",
  "why_together": "...",
  "clinical_rationale": "...",
  "patient_education_summary": "...",
  "sequencing_note": "...",
  "timing_note": "..."
}
```

**Format B — Archetype Nested (10 docs):**
```json
{
  "archetype_id": "neurotoxin_ha_filler",
  "archetype_name": "...",
  "content": {
    "clinical_rationale": "...",
    "patient_education": "...",
    "staff_talking_points": "..."
  },
  "product_pairs": [...]
}
```

**Resolution:** Reconcile into ONE canonical template (below).

---

## Standardized Templates

### Template 1: Combination Fuel Document

For product pairings/combinations that a practice offers. Auto-populated from GL, practice-editable.

```yaml
# === IDENTITY ===
fuel_type: "combination"
template_version: "1.0"

# === WHAT THIS IS ===
patient_facing_name: ""        # Outcome-focused name (e.g., "Skin Rejuvenation")
one_line_positioning: ""       # Single-sentence value prop
package_goal: ""               # What this combination achieves for the patient

# === WHO IT'S FOR ===
ideal_candidate: ""            # Who benefits most
not_ideal_candidate: ""        # Who should NOT get this combination
concern_tags: []               # Links to gl_concerns (auto-linked from pairing data)

# === WHY TOGETHER (Clinical Intelligence) ===
why_together: ""               # Core rationale — why these two/three work together
A_solves: ""                   # What product A addresses
A_does_not_solve: ""           # What product A cannot do (gap B fills)
B_adds: ""                     # What product B contributes that A cannot
clinical_rationale: ""         # Detailed clinical explanation (provider-level)

# === WHAT TO SAY (Staff Education) ===
patient_education_summary: ""  # Patient-safe explanation (can be shown to patient)
staff_close: ""                # How staff should present and recommend
staff_talking_points: ""       # Key phrases staff can use in consultation

# === WHAT NOT TO SAY ===
do_not_say:
  universal: []                # From GL universal list (auto-populated)
  pair_specific: []            # Specific to this combination
  practice_specific: []        # Practice adds their own restrictions

# === OBJECTION HANDLING ===
top_objections:
  - objection_type: ""         # cost | need_both | fear_overdone | downtime | think_about_it
    patient_says: ""           # What the patient actually says
    handling_language: ""      # How to respond
    do_not_say_in_response: "" # What to avoid saying

# === TIMING & LOGISTICS ===
sequencing_note: ""            # Which goes first, why
timing_note: ""                # How far apart, same-session OK?
downtime_note: ""              # What to tell patients about recovery
same_session_ok: true/false    # From gl_product_relationships

# === MAINTENANCE ===
maintenance_story: ""          # 2-3 sentences: when to return, ongoing plan
rebooking_trigger: ""          # Staff talking point for scheduling next visit
next_visit_prompt: ""          # Simple "when to come back" language

# === PRACTICE SOPs (Practice-Editable) ===
sop:
  pre_treatment_checklist: []  # Steps before the procedure
  consent_requirements: []     # What consent forms / disclosures needed
  post_treatment_instructions: [] # What to tell patient after
  follow_up_protocol: ""       # When and how to follow up
  emergency_protocol: ""       # What to do if adverse event
  documentation_requirements: [] # What must be charted

# === PRACTICE PREFERENCES (Practice-Editable) ===
preferences:
  pricing_notes: ""            # Practice's internal pricing guidance (never shown to patient by agent)
  preferred_brands: []         # If practice has brand preference within category
  scheduling_notes: ""         # Practice-specific scheduling rules
  staff_assignment: ""         # Who typically performs this
  room_requirements: ""        # What treatment room/setup needed
  inventory_notes: ""          # Product quantities typically used

# === EVIDENCE (Internal Reference Only) ===
source_support_summary: ""     # What evidence backs this combination
evidence_level: ""             # strong | moderate | weak | emerging

# === METADATA ===
review_status: "draft"         # draft | in_review | approved | active
audience: ["agent", "staff"]   # Who can see: agent, staff, provider, patient
patient_safe: false            # Can content be shown directly to patients?
last_reviewed: null            # Date of last human review
reviewed_by: null              # Who reviewed
```

### Template 2: Product Fuel Document

Per-product intelligence for agents. Auto-populated from GL product data + dossiers.

```yaml
# === IDENTITY ===
fuel_type: "product"
template_version: "1.0"
product_id: ""                 # UUID from gl_products

# === WHAT THIS IS ===
product_name: ""               # Display name
category: ""                   # neurotoxin | ha_filler | biostimulator | energy_device | skincare
mechanism_summary: ""          # How it works (provider-level)
patient_explanation: ""        # How to explain it to patients

# === CLINICAL PROFILE ===
fda_indications: []            # Official FDA indications
off_label_common: []           # Common off-label uses (with appropriate disclaimers)
contraindications: []          # From gl_product_guardrails
does_not_solve: ""             # What this product CANNOT do

# === WHAT TO SAY ===
key_talking_points: []         # Top 3-5 things staff should know
patient_faq:
  - question: ""
    answer: ""
differentiators: ""            # What makes this different from alternatives (factual only)

# === WHAT NOT TO SAY ===
do_not_say: []                 # Product-specific restrictions
do_not_claim: []               # Claims that are not supported

# === TIMING ===
treatment_cadence: ""          # How often (from gl_products timing columns)
onset_time: ""                 # When results appear
duration: ""                   # How long results last
downtime_summary: ""           # Recovery expectations

# === PRACTICE SOPs ===
sop:
  dosing_guidelines: ""        # Practice's standard dosing (practice-editable)
  injection_technique_notes: "" # Practice preferences
  pre_treatment: []
  post_treatment: []
  adverse_event_protocol: ""
  storage_handling: ""         # How to store/handle product

# === PRACTICE PREFERENCES ===
preferences:
  pricing: ""                  # Internal reference
  preferred_areas: []          # Where practice most commonly uses this
  staff_certified: []          # Who is certified to administer
  ordering_notes: ""           # Supplier, order frequency
  
# === METADATA ===
review_status: "draft"
audience: ["agent", "staff"]
patient_safe: false
```

### Template 3: Concern Fuel Document

Per-concern treatment arc intelligence. Maps patient concerns to treatment options.

```yaml
# === IDENTITY ===
fuel_type: "concern"
template_version: "1.0"
concern_id: ""                 # UUID from gl_concerns
concern_cluster_id: ""         # If part of a cluster

# === WHAT PATIENTS SAY ===
patient_language: []           # Real phrases from transcripts (aliases)
underlying_cause: ""           # What's actually happening (clinical)
patient_explanation: ""        # How to explain what's happening

# === TREATMENT ARC ===
what_helps: []                 # Products/categories that address this concern
what_does_not_help: []         # Products that patients ask about but don't work for this
treatment_sequence: ""         # Recommended order of addressing
expected_timeline: ""          # When patients see improvement
realistic_expectations: ""     # What to set expectations around

# === WHAT TO SAY ===
consultation_language: ""      # How to discuss this concern with patients
staff_talking_points: []

# === WHAT NOT TO SAY ===
do_not_say: []
do_not_promise: []

# === PRACTICE SOPs ===
sop:
  assessment_protocol: ""      # How practice evaluates this concern
  treatment_planning: ""       # How practice develops the plan
  photography_requirements: "" # Before/after documentation

# === PRACTICE PREFERENCES ===
preferences:
  preferred_first_treatment: "" # What practice typically starts with
  consultation_time: ""        # How long to allocate
  
# === METADATA ===
review_status: "draft"
audience: ["agent", "staff"]
patient_safe: false
```

---

## How the UI Works

### Practice View (Conceptual)

```
┌──────────────────────────────────────────────────┐
│  My Treatment Library                            │
│                                                  │
│  ┌─ Combinations (12 active) ──────────────────┐ │
│  │                                              │ │
│  │  ✅ Botox + Vollure          [Edit] [Review] │ │
│  │  ✅ Botox + Voluma           [Edit] [Review] │ │
│  │  ✅ Dysport + Restylane Lyft [Edit] [Review] │ │
│  │  ⚡ Botox + Sculptra         [Auto-populate] │ │
│  │  ...                                         │ │
│  └──────────────────────────────────────────────┘ │
│                                                  │
│  ┌─ Products (18 active) ──────────────────────┐ │
│  │  ✅ Botox Cosmetic           [Edit] [Review] │ │
│  │  ✅ Juvederm Vollure XC      [Edit] [Review] │ │
│  │  ...                                         │ │
│  └──────────────────────────────────────────────┘ │
│                                                  │
│  ┌─ Concerns (10 clusters) ────────────────────┐ │
│  │  ✅ "I look tired"           [Edit] [Review] │ │
│  │  ✅ Volume Loss              [Edit] [Review] │ │
│  │  ...                                         │ │
│  └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### Edit View (Combination Example)

```
┌──────────────────────────────────────────────────┐
│  Botox Cosmetic + Juvederm Vollure XC            │
│  Status: ✅ Approved    Last reviewed: Jun 10    │
│                                                  │
│  [📋 What to Say] [🚫 What Not to Say]           │
│  [📅 Timing/SOPs] [⚙️ Practice Preferences]     │
│                                                  │
│  ┌─ What to Say ───────────────────────────────┐ │
│  │                                              │ │
│  │  Patient Education:                          │ │
│  │  ┌──────────────────────────────────────┐    │ │
│  │  │ "Botox helps relax the muscles that  │    │ │
│  │  │ cause expression lines..."           │    │ │
│  │  │                              [Edit]  │    │ │
│  │  └──────────────────────────────────────┘    │ │
│  │                                              │ │
│  │  ⓘ GL Default available   [Reset to GL]     │ │
│  │                                              │ │
│  └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### Key UI Behaviors

1. **Auto-populate on activation.** When a practice adds a product combination to their library, the system auto-generates a fuel doc from GL defaults.
2. **Practice library filter.** Only show combinations possible from the products the practice carries (pl_products where is_active=true).
3. **Edit with GL fallback.** Every field shows whether it's using the GL default or a practice override. One-click "Reset to GL" per field.
4. **SOP sections.** Each fuel doc has expandable SOP/preference sections that are blank in GL (practice fills in their protocols).
5. **Review workflow.** Practice edits go through an internal review before agents consume them (review_status cycle).

---

## Practice-Level Auto-Population Logic

When a practice activates a product combination:

```
1. Check: Does this pair exist in gl_product_relationships?
   YES → Pull relationship data (tier, type, same_session_ok, timing)
   NO  → Flag as "custom combination" — practice must fill manually

2. Check: Does a gl_agent_fuel_documents row exist for this pair?
   YES → Clone GL fuel doc as pl_ starting point
   NO  → Generate from template with:
         - clinical_rationale from gl_product_relationships
         - timing from gl_products cadence columns
         - do_not_say from gl_product_guardrails
         - patient_education from gl_product_relationships.patient_education_text

3. SOP sections start BLANK — these are practice-specific
   - Pre-filled with suggested best practices where GL has them
   - Practice fills in their specific protocols

4. Preferences sections start BLANK
   - Practice fills in pricing, staffing, scheduling
```

---

## What This Enables for Agents

At runtime, the agent tool `get_fuel_document` resolves like this:

```sql
SELECT 
  COALESCE(pl.patient_facing_name, gl.patient_facing_name) as patient_facing_name,
  COALESCE(pl.staff_close, gl.staff_close) as staff_close,
  COALESCE(pl.do_not_say, gl.do_not_say) as do_not_say,
  -- Practice SOPs are always practice-level (no GL fallback)
  pl.sop as practice_sop,
  pl.preferences as practice_preferences,
  ...
FROM gl_agent_fuel_documents gl
LEFT JOIN pl_agent_fuel_documents pl 
  ON pl.gl_fuel_doc_id = gl.id 
  AND pl.practice_id = $1
WHERE gl.id = $2;
```

The agent gets the best available content: practice customizations where they exist, GL intelligence as fallback, and practice-specific SOPs/preferences that only exist at the practice level.

---

## Relationship to Existing Phases

| Phase | What it builds | How fuel doc UI uses it |
|-------|---------------|------------------------|
| 6. pairing-engine | gl_product_relationships (153 pairs) | Source data for auto-populating combination fuel docs |
| 7. timing-rules | gl_products cadence + relationship timing | Auto-populates timing sections |
| 12. combination-fuel | Enriched gl_agent_fuel_documents content | The GL defaults that practices customize |
| 13. concern-fuel | Concern cluster fuel docs | Concern tab in the practice library UI |
| 14. compiled-fuel | Denormalized runtime packets | What agents actually consume (compiled from templates) |
| **999.1 (this)** | Templates + UI + practice overrides | The management layer on top of all the above |

---

## Open Questions for Chris

1. **Should SOPs be per-combination or per-product?** (Recommendation: Both — product-level SOPs for dosing/technique, combination-level SOPs for sequencing/protocols)
2. **Should practices be able to create combinations that don't exist in GL?** (Recommendation: Yes, as "custom combinations" with blank templates)
3. **Who in the practice can edit fuel docs?** (Admin only? Any provider? Role-based?)
4. **Should there be a "practice onboarding" flow that auto-generates all fuel docs for their catalog?**
5. **Should the review workflow be internal (practice admin reviews) or external (A360 reviews practice edits)?**

---

*Phase: 999.1-agent-fuel-document-management-ui*
*Template spec drafted: 2026-06-14*
