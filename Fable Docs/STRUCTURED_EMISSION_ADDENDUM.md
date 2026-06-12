# Batch Add-On: Structured Intelligence Emission (Prose + Concern/Anatomy)

Paste this into the dossier batch instructions for Claude Code, alongside BATCH_SOURCE_LOGGING_ADDENDUM.md. It makes the batch emit **queryable structured rows** for every product it compiles — not just prose dossiers. Same research pass, same token spend; the batch simply writes structured rows alongside the prose instead of discarding what it learned.

Decisions locked: **prose + concern/anatomy mapping** (no pairings in this batch — `item_relationships` stays empty until the dedicated pairing phase); **expand the taxonomy where genuinely missing, flagged for review**.

---

## Ground truth about the current taxonomy (verified live 2026-06-12)

- `concerns` has 39 rows and is clinically solid: Nasolabial Folds, Crow's Feet, Cheek Volume Loss, Tear Trough Hollowing, Submental Fullness, Jawline Definition, Skin Laxity, etc. all exist.
- `body_areas` has 64 rows with a real region → area → zone hierarchy down to Masseter, Tear Trough, Pre-Jowl Sulcus, Platysmal Bands.
- `aliases` (286 rows) is the patient-language layer: `phrase` → `concern_id` / `body_area_id`, with a generated `normalized` column for dedupe.

**Implication: the skeleton is good, but treat it as INCOMPLETE.** The batch has an explicit taxonomy-audit mandate: as each product compiles, verify that every concern it treats, every anatomical zone it touches, and every name those things go by exists in the taxonomy — and add what's missing. Expansion is encouraged, not exceptional. The safety net is the review report (every addition logged for Chris), not conservatism at insert time. The work is (1) mapping each product precisely, (2) capturing ALL names — clinical synonyms and patient language — as aliases, (3) filling every genuine gap the audit surfaces.

---

## Per-product emission requirements

For EACH of the 20 products, as part of its compile, emit:

### 1. `item_concerns` — every concern this product addresses

```
offering_id      = the product id
concern_id       = matched against the existing 39 concerns FIRST
relevance        = 'primary' | 'secondary' | 'adjunctive'
treatment_role   = 'primary' | 'adjunctive' | 'maintenance'
is_fda_indicated = true ONLY when the FDA label names this indication (cite it in evidence_links)
notes            = one-line rationale ("smooths dynamic glabellar lines via temporary muscle relaxation")
```

Rules:
- Dedupe: check for an existing (offering_id, concern_id) row before insert.
- `is_fda_indicated=true` requires a matching `evidence_links` row (source='fda_label') for that offering. No label citation → mark false even if "everyone knows."
- Off-label but field-standard uses (e.g., masseter slimming for a toxin) ARE mapped — `is_fda_indicated=false`, with the gateway-posture framing in notes.
- Aim for completeness, not minimalism: a toxin should map to Forehead Lines, Frown Lines, Crow's Feet, Bunny Lines, Bruxism & TMJ, Hyperhidrosis, Platysmal Band Concern, etc., each with the correct relevance tier.

### 2. `item_body_areas` — precise anatomy

```
offering_id          = the product id
body_area_id         = matched to the MOST SPECIFIC existing level (zone > area > region)
side                 = usually 'bilateral' or 'na' per anatomy
anatomy_specificity  = 'precise' (zone-level) | 'regional' (area) | 'broad' (region)
notes                = optional placement nuance
```

Rules:
- Always map to the deepest level that's clinically true. A cheek filler maps to Cheeks (area) AND Submalar (zone) where applicable — not just Face (region).
- `anatomy_specificity='broad'` should be rare; if a product only maps at region level, that's a flag the research is shallow — dig deeper before accepting it.

### 3. `aliases` — real patient language (the high-value layer)

For every concern/body-area the product maps to, capture the phrases real patients use — drawn from the consultation transcripts, the Sales Excellence Framework, coaching playbooks, and field-practice sources you're already reading:

```
phrase        = the patient's words: "I look tired", "eleven lines", "smile lines",
                "my jowls", "turkey neck", "angry resting face", "gummy smile"
concern_id    = the concern it routes to (or body_area_id where anatomical)
```

Rules:
- Dedupe via the `normalized` generated column — check before insert.
- This is what powers concern-first selling. Be generous: 3–8 aliases per major concern is the target.
- Phrases must be plausible patient speech, not clinical synonyms.

### 4. `does_not_solve` — the limitation layer

Apply this one-time migration first (additive, safe):

```sql
ALTER TABLE products ADD COLUMN IF NOT EXISTS does_not_solve text[];
```
Migration name: `add_does_not_solve_to_products`.

Then for each product, populate `does_not_solve` with the concerns/mechanisms it explicitly does NOT address, in patient-comprehensible terms:
- Botox Cosmetic → `{cheek flattening, volume loss, static etched lines, skin laxity, skin texture, pigmentation}`
- Juvederm Voluma XC → `{movement-related expression lines, skin quality, pigmentation, laxity without volume deficit}`

This is the single most important structured field for future combination logic: "what A does not solve" is exactly "why B joins the plan." It also keeps agents honest — it is the anti-overselling layer.

---

## Taxonomy audit & expansion (active mandate, not exception handling)

The current taxonomy (39 concerns, 64 body areas, 286 aliases) was built top-down and is NOT assumed complete. For every product, run a taxonomy audit as part of the compile:

1. **Audit per product**: list every concern this product treats, every anatomical zone it touches, and every name (clinical or colloquial) those go by in your sources. Check each against `concerns.name`, `body_areas.name`, AND `aliases.normalized`. Anything absent gets added.
2. **Multiple names are the rule, not the edge case.** The same thing goes by many names — glabellar lines = frown lines = "the 11s"; tear trough = under-eye hollows = "dark circles area"; submental fullness = double chin; perioral lines = smoker's lines = lipstick lines. Capture ALL of them: ONE canonical row in `concerns`/`body_areas`, every other name as an `aliases` row pointing at it. Clinical synonyms and patient slang both belong in aliases — that's how extraction, search, and concern-routing all find the same entity no matter what words were used.
3. **Before adding a new canonical row, check it isn't an alias of an existing one.** "Smile lines" is not a new concern — it's an alias of Nasolabial Folds. When in doubt, prefer alias-to-existing over new-canonical, and note the judgment call in the additions report.
4. **New concerns**: must be aesthetic *conditions*, named clinically, valid `category` enum (aging, skin_quality, pigmentation, vascular, body_contouring, hair, volume, scarring, wellness), with a plain-language `patient_description`. Experiential clusters ("Tired Appearance") are legitimate when sources support them.
5. **NOT concerns**: fears (frozen look, overdone), budget worries, downtime worries, event timing. These are **objections/hesitations** — sales_education prose now, objection records in a later phase. Keep them out of the concerns table.
6. **New body areas**: must slot into the existing hierarchy with correct `parent_id` and `level` (zones under areas, areas under regions). If a product needs anatomy at a finer grain than exists (e.g., a specific injection zone), add the zone.
7. **Every addition is logged**: append to `TAXONOMY_ADDITIONS.md` — name, type (concern/body_area/alias), canonical target (for aliases), parent (for taxonomy rows), why it was needed, which product triggered it. Chris reviews this file; anything rejected gets removed and its mappings re-pointed. Because this review exists, err on the side of adding — a logged false positive costs one review glance; a silent gap costs a re-research pass later.
8. **Never restructure**: additive inserts only. Never rename, re-parent, merge, or deactivate existing rows in this batch — propose restructures in the additions report instead.

---

## What this batch must NOT do

- **No `item_relationships` rows.** Pairings are the dedicated next phase (they need all 20 product intelligences complete, plus the 8-gate legitimacy test). Capture pairing *observations* in the dossier prose where research surfaces them; do not emit relationship rows.
- **No care-plan structures, no timing-rule tables.** Timing stays as characterized ranges in prose + the existing products interval columns.
- **No services.** Products only.
- **No taxonomy restructuring.** Additive inserts only; never rename, re-parent, or deactivate existing rows.

---

## End-of-batch reports

1. **`STRUCTURED_COVERAGE.md`** — per product: # item_concerns rows (and how many FDA-indicated), # item_body_areas rows (by specificity), # new aliases, does_not_solve count. Any product with <3 concerns or zero zone-level anatomy gets flagged for a second pass.
2. **`TAXONOMY_ADDITIONS.md`** — every new concern/body_area/alias batch-added, for Chris's review.

## Verification SQL (run at end)

```sql
-- Every product mapped to concerns and anatomy
SELECT p.name,
  (SELECT COUNT(*) FROM item_concerns ic WHERE ic.offering_id=p.id) AS concerns,
  (SELECT COUNT(*) FROM item_body_areas iba WHERE iba.offering_id=p.id) AS body_areas,
  COALESCE(array_length(p.does_not_solve,1),0) AS limitations
FROM products p ORDER BY p.name;
-- Expect: no zeros anywhere. FDA-indicated concerns must have label evidence:
SELECT COUNT(*) FROM item_concerns ic
WHERE ic.is_fda_indicated = true
AND NOT EXISTS (SELECT 1 FROM evidence_links el
                WHERE el.offering_id = ic.offering_id AND el.source='fda_label');
-- Expect: 0
```
