# Evidence Model: Two-Layer Architecture

**Phase:** 09 — Podcast Data Strategy & Evidence Provenance
**Status:** Governing document — applies to all content in item_relationships and agent_reference_docs
**Purpose:** Define the boundary between podcast research data and production-citable evidence, and specify how podcast-derived knowledge is safely represented in production content without attribution leakage.

---

## 1. Two-Layer Model

The A360 Global Library operates on a strict two-layer evidence architecture. The layers are separate, not interchangeable, and each has distinct fields, consumers, and rules.

### Research Layer

**What it holds:** Podcast-derived IDEAS and CONCEPTS discovered through corpus mining. This layer exists to capture clinical intelligence from the 630K+ podcast corpus without ever surfacing the podcast source in production.

**Who consumes it:** Enrichment agents, planning documents, and internal research notes. Never the production database or user-facing UI.

**Fields (internal only):**

| Field | Type | Description |
|-------|------|-------------|
| `concept_id` | string | EC- anonymous identifier (see Section 2) |
| `concept_text` | string | The idea in neutral language — no quotes, no attribution |
| `discovery_source_type` | enum | Always `"podcast_corpus"` for corpus-derived concepts |
| `discovery_date` | date | When the concept was extracted from the corpus |
| `pubmed_backup_doi` | string (nullable) | PubMed DOI/PMID if corroboration found; null otherwise |

**Key rule:** The concept text in the research layer uses neutral, speaker-agnostic language. The original podcast quote (with speaker, show, and episode context) exists only transiently during the mining step and is never persisted.

---

### Production Layer

**What it holds:** Content that appears in user-facing fields and powers agents. Sources are limited to PubMed, FDA labels, medical society guidance, manufacturer data, and expert consensus.

**Who consumes it:** The Research/Evidence tab UI, agents, clinical staff-facing features.

**Production-facing fields in `item_relationships`:**

| Field | Allowed Sources |
|-------|----------------|
| `clinical_rationale` | PubMed citation, FDA label reference, "expert consensus supports..." |
| `timing_guidance` | Published protocols, FDA dosing windows, society guidance |
| `patient_education_text` | Plain-language synthesis of PubMed-backed claims |
| `staff_talking_points` | Evidence-backed selling points, training guidance |
| `source_reference` | PubMed DOI/PMID, FDA URL, "expert consensus" |
| `evidence_notes` | Internal QC notes — no patient-facing attribution required, but still no podcast refs |

**Production-facing fields in `agent_reference_docs`:**

| Field | Allowed Sources |
|-------|----------------|
| `content` | Synthesized prose backed by evidence_links — no raw transcripts, no speaker quotes |

**Production-facing fields in `evidence_links`:**

| Field | Allowed Sources |
|-------|----------------|
| `url` | PubMed URL, FDA accessdata URL, society URL |
| `doi` | PubMed DOI |
| `pmid` | PubMed PMID |
| `snippet` | Excerpt from the cited source — not from podcast transcripts |
| `authority_rank` | Determined by source type per SOURCE_CLASSIFICATION.md |

---

## 2. Anonymous Identifier Scheme (per POD-02)

Podcast-derived concepts are tracked internally using anonymous Evidence Concept (EC-) identifiers. This allows research-layer cross-referencing without any podcast attribution leaking into production.

### Format

```
EC-{12-hex-chars}
```

Example: `EC-3a7f9b2c1d4e`

### Generation Method

1. Take the concept text (the neutral, speaker-agnostic idea)
2. Normalize: lowercase, collapse all whitespace to single spaces, strip leading/trailing whitespace
3. Compute SHA-256 hash of the normalized text
4. Truncate to the first 12 hexadecimal characters
5. Prefix with `EC-`

**Example:**

```
Input idea: "Biostimulator + neurotoxin combination provides complementary mechanism coverage"
Normalized: "biostimulator + neurotoxin combination provides complementary mechanism coverage"
SHA-256:    a8f3c2e19b74d6... (full 64-char hash)
Truncated:  a8f3c2e19b74
EC- ID:     EC-a8f3c2e19b74
```

### Where EC- IDs May Appear

| Location | May appear? | Notes |
|----------|-------------|-------|
| Internal planning docs (.planning/) | Yes | Cross-referencing and tracing |
| Research notes, enrichment logs | Yes | Tracking which concepts were used |
| `item_relationships` (any field) | NO | Production database — forbidden |
| `agent_reference_docs.content` | NO | User-facing prose — forbidden |
| `evidence_links` | NO | Public provenance chain — forbidden |
| SQL INSERT files | NO | Would persist to production DB — forbidden |

**Rule:** EC- IDs are for internal tracking and research-layer cross-referencing ONLY. They never appear in production SQL or user-facing content.

---

## 3. Production Field Rules

Complete table of every production-facing field with allowed and forbidden content.

| Table | Field | Allowed Sources | Forbidden |
|-------|-------|-----------------|-----------|
| `item_relationships` | `clinical_rationale` | PubMed citation, FDA label ref, "Expert consensus supports..." | Speaker names, show names, episode IDs, "podcast experts say...", "multiple podcast experts" |
| `item_relationships` | `timing_guidance` | Published protocols, FDA labeling, society guidance | Podcast-derived timing claims without PubMed backup |
| `item_relationships` | `patient_education_text` | Plain-language synthesis, PubMed-backed claims | Any podcast attribution, episode references |
| `item_relationships` | `staff_talking_points` | Training guidance, evidence-backed selling points | Podcast quotes, speaker endorsements, "podcast consensus" |
| `item_relationships` | `source_reference` | PubMed DOI/PMID, FDA URL, "expert consensus" | Podcast episode URLs, show names, speaker names, episode IDs |
| `item_relationships` | `evidence_notes` | QC notes, internal flags | Podcast attribution |
| `agent_reference_docs` | `content` | Synthesized prose backed by `evidence_links` | Raw podcast transcripts, speaker quotes, show attribution |
| `evidence_links` | `url` | PubMed/FDA/society URLs | Podcast URLs, YouTube links (unless backed by DOI) |
| `evidence_links` | `snippet` | Excerpts from cited sources | Podcast transcript excerpts |

---

## 4. Contamination Definition

A production field is **contaminated** if it contains ANY of the following:

### What IS Contamination

1. **Speaker names** — e.g., "Dr. Teri Fisher says...", "Tracy Mancuso stacking protocol"
2. **Show names** — e.g., "on the AestheticsPro podcast...", "across 8+ podcast shows"
3. **Episode identifiers** — episode numbers, UUIDs tied to shows (e.g., "episode b2b96f9e"), air dates
4. **Direct quotes** attributed to a podcast source — even paraphrased quotes with attribution
5. **The phrase "podcast experts"** — e.g., "multiple podcast experts endorse...", "podcast expert consensus"
6. **The phrase "podcast consensus"** — e.g., "podcast consensus supports..."
7. **Any reference that would let a reader identify the specific podcast source** — show name abbreviations, host-specific terminology, cross-episode references
8. **File paths referencing podcast research artifacts** — e.g., `PHASE_6_ANSWERS_PODCAST_SOURCED.md: ...` in `source_reference`

### What is NOT Contamination

1. **Using an IDEA discovered via podcast, expressed in neutral language** — e.g., "Expert consensus supports biostimulator + neurotoxin combination for complementary mechanism coverage" — the idea is valid; only the attribution path changes
2. **Citing PubMed papers that corroborate a podcast-discovered idea** — the PubMed paper is the production citation; the podcast is the discovery mechanism
3. **Referencing "expert consensus" generically** — without any podcast attribution, "expert consensus supports..." is production-safe
4. **EC- IDs in internal planning docs** — these are tracking identifiers, not podcast attribution; they appear only in research-layer documentation

### Contamination Detection Patterns (for Phase 10 audit)

```sql
-- Patterns to flag in production fields:
-- 'podcast expert' (any case)
-- 'podcast show'
-- 'podcast consensus'
-- Episode UUIDs matching /[a-f0-9]{8}/ in source_reference
-- Speaker name patterns (harder — requires name list)
-- 'PHASE_6_ANSWERS_PODCAST_SOURCED' (file path in source_reference)
```

### Known Contamination Examples (from 06-02-canonical-common-inserts.sql)

The following patterns were found in the deferred SQL file and must be remediated in Phase 10:

- `clinical_rationale`: "multiple podcast experts endorse same-session administration"
- `clinical_rationale`: "expert consensus across 8+ podcast shows"
- `source_reference`: "PHASE_6_ANSWERS_PODCAST_SOURCED.md: 90-woman dose-ranging study (episode b2b96f9e), Dr. Teri Fisher BoNT-A synergy, Tracy Mancuso stacking protocol, AmSpa bundled practice data (25-40% higher annual spend)"

These are the canonical contamination examples. Phase 10 remediation must replace them with production-safe alternatives per this model.

---

## 5. Cross-References

- **Source classification by type:** See SOURCE_CLASSIFICATION.md
- **Step-by-step workflow for safe podcast usage:** See PODCAST_WORKFLOW.md
- **Phase 10 contamination audit scope:** POD-04 — audits all existing SQL files and review cards against these definitions
- **Phase 10 SQL regeneration:** PAIR-01 — regenerates 06-02-canonical-common-inserts.sql clean of podcast attribution

---

*Created: Phase 09-01*
*Governing: All production content in item_relationships, agent_reference_docs, evidence_links*
