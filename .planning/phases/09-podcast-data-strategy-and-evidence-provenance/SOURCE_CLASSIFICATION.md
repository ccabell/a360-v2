# Source Classification Matrix

**Phase:** 09 — Podcast Data Strategy & Evidence Provenance
**Status:** Governing document — revised Phase 11 (originally Phase 09)
**Revised:** Phase 11 — replaced binary production-citable model with practical per-source guidance
**Purpose:** Define what each source type is authoritative for, how to cite it, and whether it can appear in production fields. Phase 12-14 content generation relies on this document for consistent citation formats and source usage guidance.

---

## Source Classification Matrix

| Source Type | Layer | Authoritative For | Citation Format | Example |
|-------------|-------|-------------------|-----------------|---------|
| PubMed | Production | Clinical evidence, outcomes data, comparative studies, timing protocols | `PMID: {id}` and/or `DOI: {doi}` with URL `https://pubmed.ncbi.nlm.nih.gov/{pmid}/` | PMID: 29876543 |
| FDA Label / Package Insert | Production | Safety profiles, approved indications, dosing ranges, contraindications, boxed warnings | `[FDA label, {manufacturer}, {year}]` with URL `https://accessdata.fda.gov/drugsatfda_docs/label/...` | [FDA label, Allergan Inc., 2023] |
| DailyMed Label | Production | Same as FDA label (mirror source) | `[DailyMed: {product} PI, {year}]` with URL `https://dailymed.nlm.nih.gov/dailymed/...` | [DailyMed: Botox PI, 2024] |
| Medical Society Guidance | Production | Practice standards, consensus guidelines, complication management protocols | `[{organization}, {year}]` with society URL if stable | [ASPS, 2023] |
| Manufacturer Clinical Data | Production | Product-specific education, technique guidance, reconstitution/storage, clinical trial results | `[{company}, {document_title}, {year}]` | [Allergan, Vollure XC PI, 2022] |
| Manufacturer Video/Training | Production | Injection technique, product handling, patient selection criteria | `[{company} training, "{title}", {year}]` with URL if available | [Galderma training, "Restylane Lyft Technique", 2023] |
| YouTube (manufacturer channel) | Production | Product demonstrations, technique education from verified manufacturer accounts | `[{channel}, "{title}", {year}]` with URL `https://youtube.com/watch?v={id}&t={seconds}` | [Allergan Aesthetics, "Vollure Injection Technique", 2023] |
| YouTube (board-certified physician educational) | Production | Clinical technique education, peer teaching, outcome demonstrations | `[{channel}, "{title}", {year}]` with URL + timestamp | [Dr. {Name} (board-certified {specialty}), "{title}", 2023] |
| Industry Articles (87K corpus chunks) | Production | Market context, expert perspectives, trend analysis, practice management insights | `[{publication}, {author}, {year}]` with URL | [Aesthetic Society News, Smith, 2024] |
| Expert Consensus (generic) | Production | Practice patterns widely adopted but not yet published; conservative clinical claims | `"Expert consensus supports..."` — no attribution | Expert consensus supports biostimulator + neurotoxin combination |
| YouTube (influencer/unverified) | Research-only | Discovery of patient concerns, trending topics, consumer sentiment — NOT clinical claims | N/A | Influencer skincare routine video |
| Podcast Corpus | Research-only | Idea discovery, emerging patterns, expert stacking protocols, hypothesis generation | N/A — tracked via EC- ID internally | EC-a8f3c2e19b74 |
| Conference Presentation | Research-only | Emerging research, pre-publication data (unless proceedings published with DOI) | N/A (unless DOI → then cite as publication) | IMCAS 2024 keynote |
| Industry Webinar | Research-only | Training context, product updates (unless backed by published source) | N/A | Allergan product training webinar |
| Internal A360 Research Files | Research-only | Internal planning only — never evidence | N/A | PHASE_6_ANSWERS_PODCAST_SOURCED.md |

---

## What Each Source Type Is Good For

### FDA Labels / IFUs

**Good for:** Safety, approved indications, dosing, contraindications, boxed warnings, drug interactions.
**Not good for:** Off-label uses, combination protocols, patient education framing, real-world outcomes.
**When to reach for this:** Any safety-critical claim, any dosing statement, any contraindication check.

### PubMed / Published Literature

**Good for:** Clinical evidence, efficacy data, comparative studies, timing protocols, complication rates, long-term outcomes.
**Not good for:** Product-specific technique details (use manufacturer data), practice management, patient communication framing.
**When to reach for this:** Any clinical claim about efficacy, timing, outcomes, or safety beyond FDA labeling.

### Manufacturer Data (IFUs, training, videos)

**Good for:** Product education, injection technique, reconstitution/storage, product-specific clinical trial results, patient selection.
**Not good for:** Comparative claims against competitors, off-label applications, pricing/business.
**When to reach for this:** "How do you use this product?" questions, technique guidance, product handling.

### Industry Articles (87K corpus)

**Good for:** Market context, expert perspectives, practice trends, business of aesthetics, emerging protocols.
**Not good for:** Safety-critical claims (use FDA), clinical evidence without PubMed backup.
**When to reach for this:** Contextual framing, trend analysis, expert opinion on practice patterns.

### YouTube (tiered)

**Good for (manufacturer/physician):** Technique demonstration, visual education, product handling.
**Not good for:** Clinical evidence claims without published backup.
**Tier rules:**
- **Manufacturer official channels:** production-citable for product education
- **Board-certified physician educational content:** production-citable for technique education
- **Influencer/unverified:** research-only (consumer sentiment, patient concern discovery)

### Podcasts

**Good for:** Idea discovery, hypothesis generation, identifying emerging patterns before publication.
**Not good for:** Any production citation. Ever.
**When to reach for this:** Step 1 of enrichment — mine for ideas, then find PubMed/published backup per PODCAST_WORKFLOW.md.

---

## Decision Tree: Is This Source Production-Citable?

Use this decision tree when writing any production-facing field (`clinical_rationale`, `source_reference`, `evidence_links`, `content`):

```
Step 1: What type is the source?
        |
        +-- FDA label / IFU
        |   --> Use for: safety, indications, dosing
        |       Citation: [FDA label, {mfr}, {year}] + accessdata URL
        |
        +-- PubMed / published with DOI
        |   --> Use for: clinical evidence, outcomes, timing
        |       Citation: PMID: {id} or DOI: {doi}
        |
        +-- Manufacturer data (training, video, clinical)
        |   --> Use for: product education, technique, handling
        |       Citation: [{company}, {doc}, {year}]
        |
        +-- Industry article
        |   --> Use for: context, perspectives, trends
        |       Citation: [{pub}, {author}, {year}]
        |
        +-- YouTube
        |   --> Check tier:
        |       Manufacturer channel? --> production-citable for product education
        |       Board-certified physician? --> production-citable for technique
        |       Influencer/unverified? --> research-only
        |
        +-- Medical society guidance
        |   --> Use for: practice standards, consensus guidelines
        |       Citation: [{org}, {year}]
        |
        +-- Expert consensus (generic, no attribution)
        |   --> Use for: widely-adopted patterns without published paper
        |       Citation: "Expert consensus supports..."
        |
        +-- Podcast, conference (no DOI), webinar, internal file
            --> RESEARCH-ONLY (see PODCAST_WORKFLOW.md for safe usage)
                Find published backup or use "expert consensus" language
```

---

## Citation Format Reference

| Source Type | Format Template | Required Fields | Example |
|-------------|-----------------|-----------------|---------|
| PubMed | `PMID: {pmid}` or `DOI: {doi}` | pmid or doi, url | PMID: 29876543 |
| FDA label | `[FDA label, {manufacturer}, {year}]` | manufacturer, year, accessdata URL | [FDA label, Allergan Inc., 2023] |
| DailyMed | `[DailyMed: {product} PI, {year}]` | product name, year, dailymed URL | [DailyMed: Botox PI, 2024] |
| Medical society | `[{organization}, {year}]` | organization, year | [ASPS, 2023] |
| Manufacturer doc | `[{company}, {document}, {year}]` | company, document title, year | [Galderma, Restylane Lyft IFU, 2023] |
| Manufacturer video | `[{company} training, "{title}", {year}]` | company, title, year, URL | [Allergan training, "Vollure Technique", 2023] |
| YouTube (production) | `[{channel}, "{title}", {year}]` | channel, title, year, URL+timestamp | [Allergan Aesthetics, "Injection Demo", 2023] |
| Industry article | `[{publication}, {author}, {year}]` | publication, author, year, URL | [Aesthetic Society News, Smith, 2024] |
| Expert consensus | `"Expert consensus supports..."` | (none) | Expert consensus supports sequential combination |

---

## Rationale by Source Type

### Why PubMed is Authoritative for Clinical Evidence

PubMed indexes peer-reviewed literature. Every article has a stable PMID, a DOI, and a URL. Citations are verifiable, persistent, and linkable in the Evidence tab UI. Authority rank: highest. Reach for PubMed when making any clinical claim about efficacy, timing, outcomes, or comparative data.

### Why FDA Labels are Authoritative for Safety

FDA labels are regulatory documents with legal force. They establish indication, contraindication, dosing range, and safety profile. Citations use the accessdata.fda.gov URL structure. Authority rank: highest. Reach for FDA labels when making any safety-critical claim, any dosing statement, or any contraindication check.

### Why Manufacturer Data is Authoritative for Product Education

Manufacturers produce IFUs, training videos, and clinical data packages that are the definitive source for how to use their products. Technique guidance, reconstitution, storage, and product-specific trial results come from here. Not authoritative for comparative claims against competitors.

### Why Industry Articles are Authoritative for Context

The 87K-chunk industry corpus captures expert perspectives, market trends, and practice management insights. These are production-citable for contextual framing but should not be the sole source for safety-critical claims (use FDA) or clinical evidence (use PubMed).

### Why YouTube is Tiered

YouTube content varies wildly in authority:
- **Manufacturer channels** (e.g., Allergan Aesthetics, Galderma) publish official training content vetted by their medical affairs teams — production-citable for product education.
- **Board-certified physician channels** produce peer teaching and technique demonstrations backed by clinical training — production-citable for technique education.
- **Influencer/unverified channels** may contain inaccurate claims, undisclosed sponsorships, or non-clinical perspectives — research-only for discovering patient concerns and trending topics.

### Why "Expert Consensus" (generic) is Authoritative for Adopted Patterns

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
| DailyMed | Yes (dailymed.nlm.nih.gov/...) | Yes ([DailyMed: {product} PI, 2024]) | Yes |
| Medical society | Yes (society URL, if stable) | Yes ([ASPS, 2023]) | Yes |
| Manufacturer PI/doc | No (prefer FDA/DailyMed URL) | Yes ([Allergan Botox PI, 2024]) | Yes |
| Manufacturer video | Yes (YouTube/hosted URL) | Yes ([{company} training, "{title}", {year}]) | Yes |
| YouTube (manufacturer channel) | Yes (youtube.com/watch?v=...) | Yes ([{channel}, "{title}", {year}]) | Yes |
| YouTube (board-certified physician) | Yes (youtube.com/watch?v=...) | Yes ([{channel}, "{title}", {year}]) | Yes |
| Industry article | Yes (publication URL) | Yes ([{pub}, {author}, {year}]) | Yes |
| Expert consensus | No URL | Yes ("expert consensus") | Yes |
| YouTube (influencer/unverified) | NO | NO | NO |
| Podcast corpus | NO | NO | NO |
| Conference (no DOI) | NO | NO | NO |
| Webinar | NO | NO | NO |
| Internal A360 files | NO | NO | NO |

---

## Related Documents

- **EVIDENCE_MODEL.md** — Two-layer model, anonymous ID scheme, contamination definition
- **PODCAST_WORKFLOW.md** — Step-by-step workflow for safely converting podcast-derived ideas into production content
- **ENRICHMENT_PIPELINE.md** — Repeatable enrichment loop: add source, classify, chunk, vectorize, regenerate fuel (created in plan 11-03)
- **POD-04** (Phase 10) — Contamination audit applying these classifications to all existing SQL files

---

*Created: Phase 09-01*
*Revised: Phase 11-02 — replaced binary production-citable model with practical per-source guidance and citation formats*
*Requirement: EVID-02, SRCE-01, SRCE-02*
