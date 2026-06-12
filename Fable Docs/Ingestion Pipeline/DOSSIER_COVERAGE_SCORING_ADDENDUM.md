# Addendum — Source Coverage Scoring for Dossier Sections

Companion to DOSSIER_SYSTEM_ARCHITECTURE / COMPILE_PIPELINE / TEMPLATES / MIGRATION_INSTRUCTIONS (v2, real schema, `aejskvmpembryunnbgrk`). **Additive. Nothing in the existing four files changes.** This adds a "how well-sourced is this section?" signal the reviewer sees before approving, so beautiful-but-thin prose is flagged rather than trusted.

Source tracking itself already exists: `evidence_links` holds one graded row per asserted claim (`source`, `authority_rank`, `pmid`/`doi`/`chunk_id`, `snippet`). This addendum does NOT add new source tracking — it adds a per-section *summary* of the sourcing that's already there.

---

## What it answers

For any dossier section (e.g., Botox `clinical.safety`, Botox `sales_education.cost_benefit`), the reviewer should see at a glance:
- How many sources back it.
- How many are *independent* (not the same study/episode re-counted).
- The strongest authority tier present.
- For safety sections specifically: did it clear the rank-<=4 rule (no safety claim resting on podcast/youtube alone)?
- Does it need a human's attention before approval?

Example the signal catches: a `cost_benefit` section with rich podcast support looks complete, while the `safety` section rests on one manufacturer doc with no PubMed. Both render as finished prose; only the coverage score says "safety is thin — look here."

---

## The fields (computed at compile time)

Emit these per `agent_reference_docs` section during STEP 5 of the compile:

| field | meaning |
|---|---|
| `source_count` | total `evidence_links` backing this section's claims |
| `independent_source_count` | distinct sources (dedupe by pmid/doi/episode/video — same study cited twice counts once) |
| `top_authority_rank` | best (lowest) `authority_rank` present (1=fda/ifu … 6=podcast/youtube) |
| `clinical_safety_validated` | boolean — for `lens=clinical` safety/contraindication sections: TRUE only if at least one backing source is `authority_rank <= 4`; NULL for non-safety sections |
| `requires_reviewer_attention` | boolean — TRUE if any flag below trips |

`requires_reviewer_attention` trips when:
- a clinical section has `independent_source_count < 2` (single-source clinical claim), OR
- a safety section has `clinical_safety_validated = false`, OR
- `source_count = 0` (prose with no backing — should never reach review, but catch it), OR
- the compile dropped >N themes for this section (thin after filtering).

---

## Where it lives (your choice — both are additive)

**Option A (lightweight, recommended to start): compile-report only.**
The compiler already writes a COMPILE REPORT. Add a coverage table to it:
```
Section coverage — Botox
  clinical.clinical_summary   sources=7  indep=5  top_rank=1  safety_ok=true   attention=no
  clinical.safety             sources=2  indep=1  top_rank=3  safety_ok=false  attention=YES  <-- thin
  sales_education.cost_benefit sources=9 indep=6  top_rank=6  safety_ok=n/a    attention=no
  deep_product.deep_dive      sources=5  indep=4  top_rank=2  safety_ok=n/a    attention=no
```
No schema change at all. The reviewer reads the report alongside the prose. Good enough for the calibration pair and likely for the whole demo.

**Option B (if you want coverage queryable later): one small table.**
Only if you find yourself wanting to query "show me every section that needs attention across all dossiers." Additive, no change to existing tables:
```sql
CREATE TABLE IF NOT EXISTS public.dossier_section_coverage (
  id                         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_reference_doc_id     uuid REFERENCES public.agent_reference_docs(id) ON DELETE CASCADE,
  section_key                text NOT NULL,
  source_count               int  DEFAULT 0,
  independent_source_count   int  DEFAULT 0,
  top_authority_rank         smallint,
  clinical_safety_validated  boolean,
  requires_reviewer_attention boolean DEFAULT false,
  computed_at                timestamptz DEFAULT now(),
  UNIQUE (agent_reference_doc_id, section_key)
);
```
Then the review queue can `SELECT ... WHERE requires_reviewer_attention = true`.

**Recommendation:** start with Option A. It costs nothing, surfaces the exact signal the reviewer wanted, and you can promote to Option B in one migration if/when you actually want to query it. Don't add the table speculatively.

---

## How the reviewer uses it

The coverage score turns the review gate from "does this read well?" into "is this as grounded as it looks?" A section with `attention=YES` gets opened first; the reviewer clicks through its `evidence_links` to judge whether the thin sourcing is acceptable (some claims legitimately have one good FDA source) or whether the section needs more gathering before approval. It doesn't auto-reject — it directs attention. That's the whole point: provenance that exists but isn't summarized doesn't reduce risk; the summary is what makes the reviewer look in the right place.

---

## One compile-prompt addition

Add to STEP 5 of the master prompt (DOSSIER_COMPILE_PIPELINE.md §0):
```
After emitting each section, compute its coverage: count backing evidence_links, dedupe to
independent sources, record top (lowest) authority_rank, and for clinical safety sections set
clinical_safety_validated = (any backing source has authority_rank <= 4). Set
requires_reviewer_attention per the coverage rules. Include a Section Coverage table in the
COMPILE REPORT (and, if dossier_section_coverage exists, INSERT a row per section).
```

That's the entire change — one paragraph in the compile prompt, zero edits to the schema (Option A) or one additive table (Option B).
