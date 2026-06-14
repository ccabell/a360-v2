# Source Classification Matrix

**Phase:** 09 — Podcast Data Strategy & Evidence Provenance
**Status:** Governing document — referenced by EVIDENCE_MODEL.md Section 5 (EVID-02)
**Purpose:** Define which source types are production-citable (appear in `source_reference`, `evidence_links`, and prose citations) and which are research-only (used internally to discover ideas, never cited in production).

---

## Source Classification Matrix

| Source Type | Layer | Production-Citable? | Citation Format | Example |
|-------------|-------|---------------------|-----------------|---------|
| PubMed | Production | Yes — DOI/PMID required | `PMID: 29876543` or `DOI: 10.xxxx/yyyy` | `pubmed.ncbi.nlm.nih.gov/29876543` |
| FDA Label / Package Insert | Production | Yes — FDA URL required | `[FDA label, Allergan Inc., 2023]` | `accessdata.fda.gov/drugsatfda_docs/label/...` |
| DailyMed Label | Production | Yes — DailyMed URL required | `[DailyMed: Botox PI, 2024]` | `dailymed.nlm.nih.gov/dailymed/...` |
| Medical Society Guidance | Production | Yes — organization + year required | `[ASPS, 2023]` | `ASPS 2023 practice advisory` |
| Manufacturer Clinical Data | Production | Yes — company + document required | `[Allergan, Vollure XC PI, 2022]` | `Allergan Botox package insert, updated 2024` |
| Expert Consensus (generic) | Production | Yes — "expert consensus" only, no attribution | `"Expert consensus supports..."` | "Expert consensus supports biostimulator + neurotoxin combination" |
| Podcast Corpus | Research-only | NO — ideas only, via EC- ID | N/A | EC-a8f3c2e19b74 (internal tracking only) |
| Conference Presentation | Research-only | NO — unless published in proceedings with DOI | N/A | IMCAS 2024 keynote |
| Industry Webinar | Research-only | NO — unless backed by published source | N/A | Allergan product training webinar |
| YouTube (clinical) | Research-only | NO — unless backed by published source | N/A | Injector technique video |
| Internal A360 Research Files | Research-only | NO — internal artifacts only | N/A | PHASE_6_ANSWERS_PODCAST_SOURCED.md |

---

## Decision Tree: Is This Source Production-Citable?

Use this decision tree when writing any production-facing field (`clinical_rationale`, `source_reference`, `evidence_links`, `content`):

```
Step 1: What type is the source?
        |
        +-- PubMed, FDA label, DailyMed, medical society guidance,
        |   manufacturer PI, or generic "expert consensus"
        |   --> PRODUCTION-CITABLE
        |       Use DOI/PMID/URL/org+year as the citation
        |       Skip to END
        |
        +-- Podcast, conference talk, webinar, YouTube, internal file
            --> RESEARCH-ONLY (go to Step 2)

Step 2: Does the research-only source have a PubMed corroboration?
        |
        +-- YES: PubMed paper covers the same concept
        |   --> Cite the PubMed paper in production
        |       Track the research-only source via EC- ID internally
        |       Skip to END
        |
        +-- NO: No published backup found
            --> Use "expert consensus" language in production
                Example: "Expert consensus supports [concept]"
                Track via EC- ID internally
                Flag for future PubMed search

END: Never include the research-only source name in any production field.
```

---

## Rationale by Source Type

### Why PubMed is Production-Citable

PubMed indexes peer-reviewed literature. Every article has a stable PMID, a DOI, and a URL. Citations are verifiable, persistent, and linkable in the Evidence tab UI. Authority rank: highest.

### Why FDA Labels are Production-Citable

FDA labels are regulatory documents with legal force. They establish indication, contraindication, dosing range, and safety profile. Citations use the accessdata.fda.gov URL structure. Authority rank: highest.

### Why "Expert Consensus" (generic) is Production-Citable

When multiple independent clinical experts converge on a practice pattern that lacks a single published paper, "expert consensus" is an acceptable citation if:
- It is stated generically ("Expert consensus supports...")
- No specific expert, show, or source is named
- The claim is conservative and clinically defensible

"Expert consensus" is NOT acceptable as a citation when it is being used as a disguise for "a podcast said this." The distinction: if the claim would survive scrutiny from a medical society, it is expert consensus. If it depends on which podcast you happened to listen to, it is not.

### Why Podcasts are Research-Only

Podcasts are not peer-reviewed. Speakers may have conflicts of interest. Show content is not indexed in medical databases. Episode content is ephemeral and not verifiable by third parties. However:

- Podcast content often ANTICIPATES the clinical literature (experts discuss emerging patterns before papers are published)
- Podcast corpus is the richest source in A360 (630K+ chunks, 31 shows, 8,688 episodes)
- The IDEAS discovered via podcast are frequently valid and clinically defensible

The rule is: **use the idea, change the citation path.** Never remove podcast-discovered knowledge from the knowledge base. Instead, find the PubMed backup or use "expert consensus" language.

### Why Conference Presentations are Research-Only (by default)

Conference talks are not peer-reviewed at the paper level. However, many conferences publish proceedings with DOIs. If a conference presentation has been published in proceedings with a DOI, it becomes production-citable as a published source. If it exists only as a talk or slide deck, it remains research-only.

### Why Internal A360 Research Files are Research-Only

Files like `PHASE_6_ANSWERS_PODCAST_SOURCED.md` are working documents in the planning directory. They are not evidence — they are research artifacts. Including them in `source_reference` is a contamination error, not a citation.

---

## Mapping to Evidence Layer Fields

| Source Type | Can appear in `evidence_links.url`? | Can appear in `source_reference`? | Can appear in production prose? |
|-------------|-------------------------------------|-----------------------------------|--------------------------------|
| PubMed | Yes (pubmed.ncbi.nlm.nih.gov/...) | Yes (PMID: xxxx) | Yes |
| FDA label | Yes (accessdata.fda.gov/...) | Yes ([FDA label, 2023]) | Yes |
| Medical society | Yes (society URL, if stable) | Yes ([ASPS, 2023]) | Yes |
| Manufacturer PI | No (prefer FDA/DailyMed URL) | Yes ([Allergan Botox PI, 2024]) | Yes |
| Expert consensus | No URL | Yes ("expert consensus") | Yes |
| Podcast corpus | NO | NO | NO |
| Conference (no DOI) | NO | NO | NO |
| Webinar | NO | NO | NO |
| YouTube | NO | NO | NO |
| Internal A360 files | NO | NO | NO |

---

## Related Documents

- **EVIDENCE_MODEL.md** — Two-layer model, anonymous ID scheme, contamination definition
- **PODCAST_WORKFLOW.md** — Step-by-step workflow for safely converting podcast-derived ideas into production content
- **POD-04** (Phase 10) — Contamination audit applying these classifications to all existing SQL files

---

*Created: Phase 09-01*
*Requirement: EVID-02*
