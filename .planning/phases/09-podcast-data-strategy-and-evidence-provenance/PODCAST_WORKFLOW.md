# Podcast-to-Production Workflow

**Phase:** 09 — Podcast Data Strategy & Evidence Provenance
**Status:** Governing document — follow this workflow for all enrichment tasks that use podcast corpus data
**Requirement:** POD-03

---

## Purpose

Step-by-step workflow for safely using the 630K+ podcast corpus as a research source.

Podcasts are the richest source of aesthetic medicine intelligence in the A360 system — 8,688 episodes, 31 shows, ~202K indexed chunks. This corpus captures emerging clinical patterns, expert stacking protocols, patient education framing, and real-world practice experience months or years before papers reach PubMed.

The challenge: this intelligence has no production citation path. You cannot write "Dr. X said on Show Y that..." in a field that providers will see.

This workflow ensures podcast IDEAS fuel the knowledge base while podcast ATTRIBUTION stays out of production content. Do NOT skip or merge steps — each step has a specific output that feeds the next.

---

## Prerequisites

- **CMS Supabase access:** Project `gjqicqldjgvrwmtkliie`
- **RPC functions:**
  - `match_podcast_chunks()` — vector search over ~202K podcast chunks
  - `match_pubmed_articles()` — vector search over ~37K PubMed chunks
- **Understanding:** Read EVIDENCE_MODEL.md before using this workflow — you need to know the two-layer model and what makes content contaminated

---

## Workflow Steps

### Step 1: Generate Research Questions

Before touching the corpus, formulate specific, answerable questions. Vague queries return vague results.

**Good questions:**
- "What combinations work well with Sculptra?"
- "What is the ideal timing between biostimulator and neurotoxin?"
- "How do injectors explain neurotoxin + filler combination to patients skeptical about multiple treatments?"
- "What are the contraindications experts discuss for same-session neurotoxin + biostimulator?"

**Bad questions:**
- "Tell me about Sculptra" (too broad)
- "What do podcasts say?" (no semantic anchor)

Record your questions before querying. You will use the same questions in Step 5 when searching PubMed.

---

### Step 2: Mine the Podcast Corpus

Query `match_podcast_chunks()` with embedding vectors for each question from Step 1. Collect the raw chunk results.

```sql
-- Example: find chunks about biostimulator + neurotoxin combinations
SELECT * FROM match_podcast_chunks(
  query_embedding => <embedding_vector>,
  match_threshold => 0.75,
  match_count => 20
);
```

**At this stage, you will see:**
- Speaker names
- Show names
- Episode IDs / UUIDs
- Air dates
- Verbatim transcript text

This is the **research layer**. You are allowed to see and use this information — it informs your synthesis. You are NOT allowed to copy it into production fields.

Collect 10-30 chunks per question depending on concept complexity. Read them to understand the shape of expert opinion.

---

### Step 3: Extract IDEAS, Not Quotes

From the raw chunks, extract the underlying clinical idea or concept. This is the most important step.

The transformation is: speaker-attributed quote -> neutral concept text.

**BAD (quote — do not persist this):**
> "Dr. Smith on AestheticsPro says Sculptra works great with toxin because the collagen stimulation needs 6-8 weeks while the Botox kicks in immediately, giving patients visible improvement while waiting for the biostimulator"

**GOOD (idea — persist this as concept text):**
> "Biostimulator + neurotoxin sequential combination addresses immediate visible improvement (neurotoxin) while biostimulator collagen remodeling develops over 6-8 weeks"

**Rules for concept text:**
- Write in third person, no attribution
- Use clinical terminology (mechanisms, tissue layers, timeframes)
- Preserve the clinical insight — this is the valuable part
- Remove all show, speaker, and episode context
- If multiple chunks support the same idea, merge them into one concept

---

### Step 4: Generate Anonymous Identifier

For each extracted idea, generate an EC- ID per EVIDENCE_MODEL.md Section 2. This allows the concept to be cross-referenced internally without any podcast attribution.

**Generation steps:**
1. Take the concept text from Step 3
2. Normalize: lowercase, collapse all whitespace to single spaces, strip leading/trailing whitespace
3. Compute SHA-256 hash of the normalized text
4. Truncate to the first 12 hexadecimal characters
5. Prefix with `EC-`

**Example:**

```
Concept text: "Biostimulator + neurotoxin sequential combination addresses immediate visible improvement (neurotoxin) while biostimulator collagen remodeling develops over 6-8 weeks"

Normalized:   "biostimulator + neurotoxin sequential combination addresses immediate visible improvement (neurotoxin) while biostimulator collagen remodeling develops over 6-8 weeks"

SHA-256:      a8f3c2e19b74d6... (full 64-char hash)
Truncated:    a8f3c2e19b74
EC- ID:       EC-a8f3c2e19b74
```

Record each `(EC- ID, concept_text, discovery_date)` in your research notes or enrichment log. These stay in .planning/ — never in production SQL.

---

### Step 5: Search for PubMed Corroboration

For each concept, search PubMed for published evidence supporting the same clinical idea. Use the same research questions from Step 1.

```sql
-- Example: find PubMed articles about biostimulator + neurotoxin combinations
SELECT * FROM match_pubmed_articles(
  query_embedding => <embedding_vector>,
  match_threshold => 0.70,
  match_count => 10
);
```

Or search PubMed directly at `pubmed.ncbi.nlm.nih.gov` with the key terms from your concept text.

**Two paths based on what you find:**

**Path A — PubMed backup found:**
- Record the DOI or PMID alongside the EC- ID in your research notes
- The PubMed paper becomes the production citation
- Example: PMID 29876543 — "Combined use of poly-L-lactic acid and botulinum toxin A for facial rejuvenation"

**Path B — No PubMed backup found:**
- The concept is still valid for production use — it just uses a different citation style
- Mark `pubmed_backup_doi` as null in research notes
- Use "expert consensus" language in production (see Step 6)

Do NOT discard concepts because no PubMed paper exists. Many valid clinical practices precede publication.

---

### Step 6: Write Production Content

When writing production-facing fields (`clinical_rationale`, `patient_education_text`, `staff_talking_points`, `source_reference`), use only production-safe language.

**If Path A (PubMed backup exists):**

```
clinical_rationale:
  "Sequential neurotoxin + biostimulator combination provides immediate dynamic line
   improvement while collagen remodeling develops over 6-8 weeks (PMID: 29876543)"

source_reference:
  "PMID: 29876543"
```

**If Path B (no PubMed backup — expert consensus path):**

```
clinical_rationale:
  "Expert consensus supports biostimulator + neurotoxin combination for complementary
   mechanism coverage: neurotoxin addresses dynamic lines while biostimulator collagen
   remodeling addresses volume over 6-8 weeks"

source_reference:
  "expert consensus"
```

**What NEVER appears in production fields:**
- Speaker names (e.g., "Dr. Teri Fisher", "Tracy Mancuso")
- Show names (e.g., "AestheticsPro podcast", "The Aesthetic Insider")
- Episode IDs or UUIDs (e.g., "episode b2b96f9e")
- Podcast file paths (e.g., "PHASE_6_ANSWERS_PODCAST_SOURCED.md")
- The phrases "podcast experts", "podcast consensus", "multiple podcast shows"
- Direct quotes attributed to any podcast source

---

### Step 7: Record Research Layer

In internal documentation only (.planning/ files, enrichment logs, research notes), record the EC- ID to trace back to the original podcast finding.

**Research note format:**
```
EC-a8f3c2e19b74
  concept: "Biostimulator + neurotoxin sequential combination addresses immediate visible
            improvement (neurotoxin) while biostimulator collagen remodeling develops over 6-8 weeks"
  discovered: 2026-06-14
  source_type: podcast_corpus
  pubmed_backup: PMID 29876543
  used_in: item_relationships.clinical_rationale (Sculptra + Botox pairing)
```

This record exists in .planning/ only. It never goes into a SQL INSERT file or user-facing field.

---

## End-to-End Example

**Enrichment task:** Populate `clinical_rationale` for the Sculptra + Botox Cosmetic pairing

**Step 1 — Question:**
"What do injectors say about combining Sculptra (PLLA biostimulator) with Botox neurotoxin? What are the timing and mechanism arguments?"

**Step 2 — Corpus hit (research layer, not persisted):**
> [Chunk from Show X, Speaker: Dr. A, Episode UUID: b2b96f9e]
> "...Sculptra and Botox together because the collagen stimulation needs 6-8 weeks while the Botox kicks in immediately, giving patients visible improvement while waiting for the biostimulator to do its work. I usually do Botox first so I can see the muscle response before deciding exactly where to put the Sculptra..."

**Step 3 — Extracted idea:**
"Biostimulator + neurotoxin sequential combination addresses immediate visible improvement (neurotoxin) while biostimulator collagen remodeling develops over 6-8 weeks; neurotoxin administered first to assess muscle response before placing biostimulator"

**Step 4 — EC- ID:**
EC-a8f3c2e19b74

**Step 5 — PubMed search:**
Found — "Combined use of poly-L-lactic acid and botulinum toxin A for facial rejuvenation" (PMID: 29876543)

**Step 6 — Production field:**
```sql
clinical_rationale = 'Neurotoxin provides immediate improvement in dynamic lines while
  biostimulator collagen remodeling develops over 6-8 weeks, addressing complementary
  aging mechanisms. Sequential administration (neurotoxin first) allows muscle response
  assessment before biostimulator placement (PMID: 29876543).'

source_reference = 'PMID: 29876543'
```

**Step 7 — Research note (in .planning/ only):**
```
EC-a8f3c2e19b74 — corroborated by PMID 29876543
Used in Sculptra + Botox item_relationships row
```

---

## Anti-Patterns (What NOT to Do)

**Do NOT copy podcast transcript text into `clinical_rationale` or `staff_talking_points`.**
Even paraphrased quotes with attribution are contaminated. Extract the idea; discard the quote.

**Do NOT reference "multiple podcast experts" as a citation.**
"Multiple podcast experts endorse same-session administration" is contamination. Replace with "Expert consensus supports same-session administration" or cite the PubMed paper.

**Do NOT include speaker names in `source_reference`.**
"Dr. Teri Fisher BoNT-A synergy, Tracy Mancuso stacking protocol" is contamination. `source_reference` contains PubMed PMIDs, FDA URLs, or "expert consensus" — nothing else.

**Do NOT include episode identifiers in `source_reference`.**
"episode b2b96f9e" in `source_reference` is contamination. Remove it. The episode was the discovery mechanism, not the evidence.

**Do NOT strip ALL podcast knowledge to be "safe."**
Removing podcast-discovered ideas because you can't cite the podcast is WRONG. The ideas are valid. Change the citation path, not the content. A knowledge base that discards podcast intelligence because of attribution rules is impoverished.

**Do NOT panic and remove podcast-discovered concepts from review cards.**
If a Phase 10 auditor finds podcast contamination in a review card's `clinical_rationale`, the fix is to rewrite the field using Steps 3-6 above — not to delete the pairing or leave the field blank.

**Do NOT use internal A360 research files as citations.**
`PHASE_6_ANSWERS_PODCAST_SOURCED.md` is a research artifact, not a source. It should never appear in `source_reference`.

---

## Quick Reference Card

| Step | Input | Output | Goes Where |
|------|-------|--------|------------|
| 1. Generate questions | Enrichment task | Specific research questions | Research notes |
| 2. Mine corpus | Research questions | Raw chunks with speaker/show/episode | Research layer only — not persisted |
| 3. Extract idea | Raw chunk | Neutral concept text (no attribution) | Research notes (input to Step 4) |
| 4. Generate EC- ID | Concept text | EC-{12hex} identifier | Internal research notes only |
| 5. Find PubMed backup | Concept text | PMID/DOI or null | Research notes + production source |
| 6. Write production content | Concept + source | Production-safe field text | `item_relationships`, `agent_reference_docs` |
| 7. Record research layer | EC- ID + concept + source | Research trace entry | .planning/ docs only |

---

## Related Documents

- **EVIDENCE_MODEL.md** — Two-layer model definition, contamination definition, anonymous ID format
- **SOURCE_CLASSIFICATION.md** — Which source types are production-citable vs research-only
- **Phase 10 — POD-04** — Contamination audit that applies this workflow retroactively to existing SQL

---

*Created: Phase 09-01*
*Requirement: POD-03*
