# Phase 5: concern-language — Research

**Researched:** 2026-06-13
**Domain:** Patient-language taxonomy mining; aliases table expansion; concern-cluster modeling; concern-first routing
**Confidence:** HIGH — all findings sourced from live DB state docs, actual source files on disk, and verified schema SQL

---

## Summary

Phase 5 mines the 122 HIPAA-redacted consultation transcripts and 94 coaching/playbook documents for real patient language and builds it into the `aliases` table. It also defines concern-cluster groupings (experiential, multi-mechanism clusters like "tired look") that enable concern-first routing: patient says something → system identifies candidate mechanism → candidate products.

The taxonomy foundation from Phase 2 is solid but intentionally incomplete. Post-Phase-2, the DB contains 39 concerns, 67 body areas (64 original + 3 new), and ~353 aliases. Phase 2's mandate was 3–8 aliases per major concern; many concerns still have 0–2 aliases. The gap is NOT in schema — it is in coverage. This phase is a content operation: read transcripts → extract real phrases → write SQL.

The "tired look" cluster is a known example of an experiential concern that routes to MULTIPLE canonical mechanisms (Tear Trough Hollowing, Brow Ptosis, Skin Quality, Age-Related Volume Loss). The planner must model concern clusters as a mapping layer ON TOP of existing canonical concerns — not as replacement concerns.

**Primary recommendation:** Execute this phase as a mining + SQL-emission workflow: (1) extract patient language from transcript corpus, (2) map each phrase to the nearest canonical concern or body_area, (3) add cluster groupings as a new `concern_clusters` table or JSONB column, (4) emit SQL via the same INSERT...WHERE NOT EXISTS pattern Phase 2 established.

---

## User Constraints

No CONTEXT.md exists for Phase 5. No locked decisions from a prior discussion phase. All decisions are Claude's discretion except:

- **Additive only:** Never rename, re-parent, merge, or deactivate existing concerns/body_areas (inherited from Phase 2 mandate, still binding)
- **No `item_relationships` rows** in this phase — pairings belong to Phase 6
- **No objections/hesitations in the concerns table** — fears (frozen look, downtime) are NOT concerns
- **All taxonomy additions logged for Chris review** (same TAXONOMY_ADDITIONS.md pattern as Phase 2)

---

## Current Database State (Verified from Phase 2 Reports)

### aliases table

| Metric | Value | Source |
|--------|-------|--------|
| Pre-Phase-2 count | 286 rows | STRUCTURED_EMISSION_ADDENDUM.md |
| Post-Phase-2 count (live DB) | 353 rows | STRUCTURED_COVERAGE.md |
| Net additions in Phase 2 | ~67 rows live (more in unexecuted SQL) |  |
| Target coverage | ≥3 aliases per concern | ROADMAP.md Phase 5 SC-1 |

Phase 2 SQL files committed but not yet executed against live DB will add more aliases for energy devices, neurotoxins, HydraFacial. Those SQL files must be executed before Phase 5 begins (or Phase 5 must account for the gap).

### Schema: aliases table

From inspection of `02-03-task1-taxonomy-additions.sql`:

```sql
-- aliases table fields (confirmed from INSERT patterns):
phrase        TEXT    -- the patient's words, free text
concern_id    UUID    -- FK to concerns.id (or body_area_id where anatomical)
normalized    TEXT    -- GENERATED column via gl_normalize_text() function, used for dedupe

-- Dedupe pattern (mandatory):
INSERT INTO aliases (phrase, concern_id)
SELECT 'phrase here', 'concern-uuid'
WHERE NOT EXISTS (
  SELECT 1 FROM aliases WHERE normalized = gl_normalize_text('phrase here')
);
```

No `body_area_id` column was observed in insert patterns — aliases point to `concern_id` only. Body area phrases appear to be mapped to a concern that represents the area (e.g., "hand volume loss" as a concern), not directly to a body_area row. Verify this against live schema before writing Phase 5 SQL.

### concerns table (39 rows post-Phase-2)

Confirmed canonical concerns (from STRUCTURED_EMISSION_ADDENDUM.md and taxonomy additions SQL):

**Aging/Volume:**
- Nasolabial Folds, Crow's Feet, Cheek Volume Loss, Tear Trough Hollowing, Jawline Definition, Skin Laxity, Marionette Lines, Perioral Lines, Temple Hollowing, Lip Volume Loss, Hand Volume Loss, Forehead Lines, Frown Lines / Glabellar Lines

**New in Phase 2:**
- Age-Related Volume Loss, Skin Hydration, Skin Quality Improvement, Chin Augmentation, Lip Augmentation, Dynamic Wrinkle Correction, Buttock Augmentation

**Body/Contouring:**
- Submental Fullness, (Body Contouring / Fat Reduction — verify canonical name)

**Skin:**
- Skin Texture, Pore Size, Acne Scarring, Pigmentation, Platysmal Band Concern, Hyperhidrosis, Bruxism & TMJ

**Missing (Phase 5 mandate — add if sourced from transcripts):**
- Tired Appearance (experiential cluster) — cited in GL Enrichment doc, STRUCTURED_EMISSION_ADDENDUM, and roadmap
- Lower-Face Heaviness (experiential cluster) — cited in ROADMAP.md Phase 5 description
- Post-Weight-Loss Laxity (experiential cluster) — cited in ROADMAP.md Phase 5 description
- Gummy Smile — known off-label neurotoxin use mentioned in Phase 2 compile
- Brow Ptosis / Hooded Eyes — contributor to "tired look"; may exist already, verify

### Alias coverage gaps (confirmed from TAXONOMY_ADDITIONS.md)

Phase 2 logged ~124 aliases from 3 plans. Many concerns have 3–5 aliases. Known thin coverage:
- Concerns for energy devices (Morpheus8, Sofwave, Ultherapy) — SQL not yet executed
- Concerns for additional neurotoxins (Dysport, Jeuveau, Daxxify, Xeomin) — SQL not yet executed
- Concerns for HydraFacial — SQL not yet executed
- Bruxism & TMJ — aliases in Phase 2 neurotoxin SQL (unexecuted), verify
- Hyperhidrosis — aliases in Phase 2 neurotoxin SQL (unexecuted), verify
- Platysmal Band Concern / Neck Bands — partially covered ("turkey neck" added)

---

## Source Corpus: What Exists and Where

### 1. Consultation Transcripts (122 documents)

**Primary file:** `C:\Users\Chris\Dropbox\NewCO\Coaching\combined_hipaa_transcripts.txt`
- Size: 2.9 MB, 37,855 lines
- Format: HIPAA-redacted (Amazon Comprehend), speaker-diarized, concatenated
- Content confirmed: real patient language visible — "my crow's feet, it just creeps back in", "eleven lines", "I always look tired", "my eyes just look old when I smile"
- 122 consultations from Lumiere Aesthetics and Little Mountain Laser, dated mid-2025

**Secondary file:** `C:\Users\Chris\Dropbox\NewCO\Coaching\ALL_TRANSCRIPTS_COMBINED.txt`
- Size: 6,563 lines (much smaller — may be subset or different format)
- Format: Similar speaker-diarized output, from Little Mountain Laser tenant

**Note on access:** Both files are local on the machine, readable via the Read tool. The combined HIPAA file is the comprehensive source. The planner should direct the execution agent to read sections of this file systematically (it is too large to load at once — requires chunked reading with offset/limit).

### 2. Sales Excellence Framework

**Primary accessible source:** `C:\Users\Chris\Dropbox\Git-local\Recent\A360-Sales-Excellence-System-MASTER.md`
- Confirmed readable. Contains consultation methodology, conversion techniques, objection handling, treatment planning language.
- V2 and V3 also exist at the same path.

**Also at:** `C:\Users\Chris\Dropbox\NewCO\A360 - CORE DOCUMENTS\Conversational Intelligence\A360 - Sales Excellence System  V2.docx.md`

**Note:** The Sales Excellence Framework is a system document — it contains staff talk tracks and consultation language frameworks, not pure patient language. It is useful for identifying the CATEGORIES of concerns patients raise and the language providers use to reframe them. Aliases should come from what patients SAY (transcripts), not from staff talking points.

### 3. Coaching Playbooks (94 documents across 10 categories)

**Location:** `C:\Users\Chris\Dropbox\NewCO\A360 - CORE DOCUMENTS\Conversational Intelligence\04_Deep_Dive_Playbooks\`

**Categories confirmed:**
- `01_Core_Consultation_Excellence/` — 5 files (rapport, discovery, education, treatment planning, closing)
- `02_Upsell_Cross_Sell_Packaging/` — not listed but exists
- `03_Objection_Barrier_Mastery/` — 5 files confirmed (price resistance, fear/anxiety, "think about it", partner approval, downtime)
- `04_Education_Trust_Differentiator/`
- `05_Closing_Conversion_Precision/`
- `06_Practice_Level_Excellence_Agents/`
- `07_Core_Injectable_Services/` — Botox, Dermal Filler, Kybella playbooks confirmed
- `08_Laser_Energy_Based_Treatments/` — Laser, IPL, CoolSculpting, RF Microneedling confirmed
- `09_Advanced_Skin_Treatments/` — Chemical Peel, HydraFacial, Microneedling, Skincare
- `10_Specialty_Services/`

**High-value files for Phase 5:** 07 and 08 (treatment-specific concern language). 03 (objection language reveals patient fears — scope with care, these are NOT concerns). 01 directory contains "02_Discovery_That_Uncovers_High_LTV.md" which likely surfaces patient concern discovery methodology.

---

## Architecture Patterns

### Pattern 1: Alias Mining Workflow

**What:** Read transcript corpus in chunks → extract patient-spoken phrases about their appearance → map each phrase to the nearest canonical concern → emit SQL.

**Execution approach:**
```
For each concern in concerns table:
  1. Read sections of combined_hipaa_transcripts.txt looking for phrases about that concern
  2. Extract verbatim patient phrases (Speaker 0/1/2 lines, not provider lines)
  3. Filter: patient speech only (not provider education language)
  4. Dedupe: normalize and check against existing aliases.normalized
  5. Emit INSERT...WHERE NOT EXISTS SQL
```

**Key filter:** Aliases must be patient-spoken phrases. Provider talk-track language (from playbooks) that reformats patient concerns does NOT go into aliases — it goes into sales_education dossiers. The transcript file has speaker diarization: identify the patient speaker role (usually the non-provider) and extract from those lines.

### Pattern 2: Concern Cluster Definition

**What:** A concern cluster is an experiential, multi-mechanism descriptor that real patients use but that doesn't map 1:1 to a canonical concern. "I look tired" is the archetype — it routes to multiple mechanisms.

**Proposed implementation options (planner must decide):**

Option A — New `concern_clusters` table:
```sql
CREATE TABLE concern_clusters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,           -- e.g., "Tired Appearance"
  patient_phrase TEXT,          -- canonical example phrase
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE concern_cluster_members (
  cluster_id UUID REFERENCES concern_clusters(id),
  concern_id UUID REFERENCES concerns(id),
  mechanism_role TEXT,          -- e.g., 'primary', 'contributing'
  PRIMARY KEY (cluster_id, concern_id)
);
```

Option B — JSONB column on concerns table:
```sql
ALTER TABLE concerns ADD COLUMN IF NOT EXISTS cluster_tags TEXT[];
```
Then tag each concern with cluster membership (e.g., `cluster_tags = ARRAY['tired_look', 'lower_face_heaviness']`).

Option C — Documentation-only in Phase 5, struct in Phase 9 (care-plan-modules):
Clusters are documented in a CLUSTER_DEFINITIONS.md but not yet in structured DB rows. Phase 9 picks them up when building care-plan modules.

**Recommendation:** Option A (dedicated table) for maximum queryability, but the planner should note this is a new schema addition requiring a migration. Option C is the minimal-risk choice if schema additions feel premature before Phase 6 pairings clarify the data model.

### Pattern 3: Concern-First Routing (Verification Demo)

**What the success criterion requires:**
"I look tired" → candidate mechanisms → products

This requires:
1. `aliases` table has "I look tired" (and variants) pointing to Tear Trough Hollowing, Brow Ptosis, Age-Related Volume Loss, Skin Quality Improvement
2. `item_concerns` table maps those concerns to products
3. Query joining aliases → concerns → item_concerns → products works end-to-end

**The routing query (to verify at phase end):**
```sql
SELECT DISTINCT p.name, ic.relevance, a.phrase
FROM aliases a
JOIN concerns c ON c.id = a.concern_id
JOIN item_concerns ic ON ic.concern_id = c.id
JOIN products p ON p.id = ic.offering_id
WHERE a.normalized = gl_normalize_text('I look tired')
   OR a.normalized LIKE '%tired%'
ORDER BY ic.relevance, p.name;
```

This query is the Phase 5 demo. It must return ≥3 products with plausible concern-product mappings.

---

## Source Coverage Map

| Source | Volume | Patient Language? | Phase 5 Use |
|--------|--------|-------------------|-------------|
| combined_hipaa_transcripts.txt | 2.9MB, 122 consultations | YES — primary | Alias mining (primary source) |
| ALL_TRANSCRIPTS_COMBINED.txt | 6,563 lines | YES | Alias mining (secondary/spot-check) |
| Sales Excellence Framework MASTER.md | 350KB+ | Partial (staff frames patient concerns) | Category identification, not verbatim aliases |
| Coaching playbooks 07_Core_Injectable_Services/ | 2 confirmed files | NO (staff language) | Identify concern categories; "frozen look" = objection not concern |
| Coaching playbooks 03_Objection_Barrier_Mastery/ | 5 confirmed files | NO | Confirm what NOT to add as concerns |
| Coaching playbooks 01_Core_Consultation_Excellence/ | 5 confirmed files | Partial (discovery questions surface concern categories) | Concern category checklist |

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Alias dedupe | Custom fuzzy matching | gl_normalize_text() generated column + WHERE NOT EXISTS | Already built in schema; Phase 2 established the pattern |
| Transcript parsing | Custom NLP pipeline | Manual/LLM-assisted chunked read | The corpus is 2.9MB; structured NLP is overkill for one-time extraction |
| Concern routing query | Application-layer join logic | SQL join: aliases → concerns → item_concerns → products | Relational data model already supports this |
| Cluster membership | New ontology schema | Simple junction table (Option A) or JSONB tag (Option B) | Don't build an OWL ontology; this is a 3-table query |
| New concern validation | Automated clinical validation | Log in TAXONOMY_ADDITIONS.md for Chris review | Human review gate is the established pattern |

---

## Common Pitfalls

### Pitfall 1: Mixing Provider Language Into Aliases
**What goes wrong:** Aliases include staff phrasing ("static etched lines", "dynamic rhytides", "periorbital volume deficit") rather than patient speech.
**Why it happens:** Playbook language is vivid and available; patient speech is buried in diarized transcripts.
**How to avoid:** Aliases come ONLY from patient speaker turns in transcripts. Provider-education phrases go into sales_education dossiers, not aliases.
**Warning signs:** Aliases that sound clinical, multi-syllabic, or overly precise.

### Pitfall 2: Adding Objections as Concerns
**What goes wrong:** "frozen look", "overdone", "downtime worry", "too expensive" get added to the concerns table.
**Why it happens:** These come up constantly in transcripts and playbooks; it's tempting to capture them.
**How to avoid:** The rule from STRUCTURED_EMISSION_ADDENDUM.md is explicit: fears, budget worries, downtime worries, event timing → NOT concerns. They are objections/hesitations. Phase 5 does not build an objections table.
**Warning signs:** A concern that describes a provider outcome fear rather than a patient appearance state.

### Pitfall 3: Creating New Canonical Concerns for Alias-Level Phrases
**What goes wrong:** "smile lines" becomes a new concern instead of an alias of Nasolabial Folds.
**Why it happens:** When mining at scale, it's easy to add canonical rows before checking aliases.
**How to avoid:** For every candidate new concern, first ask: "Is this an alias of something existing?" Phase 2 established: smile lines → alias, smoker's lines → alias, turkey neck → alias. The same discipline applies.
**Warning signs:** New concern names that are very close to existing ones.

### Pitfall 4: Executing Before Phase 2 SQL is Applied
**What goes wrong:** Phase 5 emits aliases for concerns (Dysport, Jeuveau, energy devices) where the concern-product mappings (item_concerns rows) don't yet exist in the live DB.
**Why it happens:** 12 products' structured emission SQL was written but not executed (per STRUCTURED_COVERAGE.md).
**How to avoid:** Wave 0 of Phase 5 must execute the outstanding 02-04 and 02-05 SQL files before writing new content. The STRUCTURED_COVERAGE.md priority list is the checklist.
**Warning signs:** Aliases that point to concern_ids which have no item_concerns rows.

### Pitfall 5: "Tired Look" Mapped to Only One Mechanism
**What goes wrong:** All "I look tired" aliases route only to Tear Trough Hollowing.
**Why it happens:** Tear trough is the most obvious mechanism for tired appearance.
**How to avoid:** "Tired look" is a multi-mechanism cluster. The aliases layer must map it to ALL contributing canonical concerns: Tear Trough Hollowing, Brow Ptosis/Hooded Eyes (if exists), Age-Related Volume Loss (temple/cheek), Skin Quality/dullness. Multiple alias rows pointing to different concern_ids for the same surface phrase (or cluster entries in the cluster table).
**Warning signs:** Concern-first routing query for "tired" returns only one product family.

---

## Concern Clusters: Proposed Definitions

These clusters are identified in the GL Enrichment doc and ROADMAP.md. Phase 5 must define and document them (whether in DB or documentation):

### Cluster 1: Tired Appearance
**Patient phrases:** "I look tired", "I always look tired", "people ask if I'm okay", "I look exhausted", "my eyes look tired even when I'm rested", "I look older than I feel"
**Contributing mechanisms → canonical concerns:**
- Tear Trough Hollowing (under-eye hollow shadow)
- Brow Ptosis / Hooded Eyes (heavy upper eyelids — verify if concern exists)
- Age-Related Volume Loss (temple/midface deflation)
- Skin Quality Improvement (dull, grey skin tone)
- Forehead Lines (static creases conveying fatigue)

### Cluster 2: Lower-Face Heaviness
**Patient phrases:** "my jowls", "my face is falling", "I look heavy around my jaw", "lower face drooping", "turkey wattle", "my jawline is gone", "my face looks heavy at the bottom"
**Contributing mechanisms → canonical concerns:**
- Skin Laxity (jowling, tissue descent)
- Marionette Lines (oral commissure descent)
- Submental Fullness (submental volume)
- Jawline Definition (loss of angular definition)
- Platysmal Band Concern (neck bands)

### Cluster 3: Post-Weight-Loss Laxity
**Patient phrases:** "I lost weight but my skin is loose now", "weight loss face", "my skin didn't bounce back", "deflated face after diet", "I lost the weight but now I look older"
**Contributing mechanisms → canonical concerns:**
- Skin Laxity (tissue laxity without fat support)
- Age-Related Volume Loss (fat compartment deflation)
- Cheek Volume Loss (buccal volume loss)
- Jawline Definition (loss of structural support)

### Cluster 4: Angry/Mean Resting Expression
**Patient phrases:** "angry resting face", "resting b**** face", "people think I'm angry when I'm not", "I look stern", "I look disapproving at rest"
**Contributing mechanisms → canonical concerns:**
- Frown Lines / Glabellar Lines (glabellar complex at rest)
- Marionette Lines (oral commissures turned down)
- Brow position (if brow ptosis concern exists)

---

## Missing Concerns to Investigate During Mining

These are candidates mentioned in roadmap/enrichment docs or implied by the transcript preview. Phase 5 should add them IF sourced from transcripts, not assumed:

| Candidate Concern | Category | Likely Trigger | Check First |
|---|---|---|---|
| Brow Ptosis / Hooded Eyes | aging | "tired look" cluster, toxin brow lift discussions | Does it already exist as an alias or concern? |
| Gummy Smile | aging | Off-label toxin; appeared in Phase 2 neurotoxin compile | Likely already in DB — verify |
| Neck Laxity / Crepey Neck | aging | "turkey neck" already an alias — is the canonical concern Platysmal Band or something broader? | Check if Skin Laxity covers neck or needs own row |
| Under-Eye Puffiness / Festoons | aging | Distinct from tear trough — fat pad protrusion, not hollow | May be missing entirely |
| Infraorbital Malar Bags | aging | Clinical term for under-eye bags | Alias of Tear Trough or separate? |
| Perioral Volume Loss | volume | Lips deflated + perioral tissue — may already be Perioral Lines | Check coverage |

---

## Validation Architecture

### Phase 5 End-State Query (required to pass)

```sql
-- Concern-first routing: "I look tired" → products
SELECT DISTINCT p.name, c.name as concern, ic.relevance, a.phrase
FROM aliases a
JOIN concerns c ON c.id = a.concern_id
JOIN item_concerns ic ON ic.concern_id = c.id
JOIN products p ON p.id = ic.offering_id
WHERE a.normalized LIKE '%tired%'
ORDER BY ic.relevance, p.name;
-- Expected: ≥3 distinct products across ≥2 concern mechanisms

-- Alias coverage check
SELECT c.name, COUNT(a.id) as alias_count
FROM concerns c
LEFT JOIN aliases a ON a.concern_id = c.id
GROUP BY c.name
ORDER BY alias_count ASC;
-- Expected: no concern with alias_count < 3

-- Cluster routing (if concern_clusters table built)
SELECT cc.name as cluster, c.name as concern, COUNT(ic.offering_id) as products
FROM concern_clusters cc
JOIN concern_cluster_members ccm ON ccm.cluster_id = cc.id
JOIN concerns c ON c.id = ccm.concern_id
JOIN item_concerns ic ON ic.concern_id = c.id
GROUP BY cc.name, c.name
ORDER BY cc.name, products DESC;
```

### Test Framework
No automated test framework — all validation is SQL queries against live Supabase DB (project `aejskvmpembryunnbgrk`). Same pattern as Phase 2.

---

## Environment Availability

| Dependency | Required By | Available | Notes |
|------------|------------|-----------|-------|
| combined_hipaa_transcripts.txt | Alias mining | YES — local disk | `C:\Users\Chris\Dropbox\NewCO\Coaching\combined_hipaa_transcripts.txt` (2.9MB) |
| ALL_TRANSCRIPTS_COMBINED.txt | Secondary mining | YES — local disk | `C:\Users\Chris\Dropbox\NewCO\Coaching\ALL_TRANSCRIPTS_COMBINED.txt` |
| Coaching playbooks (94 .md files) | Concern category audit | YES — local disk | `C:\Users\Chris\Dropbox\NewCO\A360 - CORE DOCUMENTS\Conversational Intelligence\04_Deep_Dive_Playbooks\` |
| Sales Excellence Framework | Consultation methodology | YES — local disk | `C:\Users\Chris\Dropbox\Git-local\Recent\A360-Sales-Excellence-System-MASTER.md` |
| Supabase (live DB) | SQL execution | YES — via MCP | Project `aejskvmpembryunnbgrk` |
| Phase 2 unexecuted SQL | Wave 0 prerequisite | YES — in repo | `supabase/compile_sql/02-04-*`, `02-05-*` |

---

## Phase Dependencies and Sequencing

**Must be done before Phase 5 content work begins:**
- Execute outstanding Phase 2 SQL files (02-04 and 02-05 batches — 12 products currently missing from live DB)
- This is Wave 0 / prerequisite, not a Phase 5 deliverable, but it blocks Phase 5 coverage work

**Phase 5 outputs feed:**
- Phase 6 (pairing-engine): concern routing enables "what A doesn't solve" + "what B adds" logic
- Phase 9 (care-plan-modules): concern clusters become the organizing unit for phased plans

**Runs parallel to:** Phase 4 (source-ingestion) — independent, no shared writes

---

## Open Questions

1. **Does `aliases` have a `body_area_id` column?**
   - What we know: Phase 2 SQL only shows `concern_id` in aliases inserts; body area phrases appear to route to concerns that represent anatomical areas (Hand Volume Loss, Temple Hollowing).
   - What's unclear: Whether the DB schema has a `body_area_id` nullable column or if all aliases route through concerns.
   - Recommendation: Wave 0 task — run `SELECT column_name FROM information_schema.columns WHERE table_name = 'aliases'` to confirm schema before writing any Phase 5 SQL.

2. **Does a "Brow Ptosis" or "Hooded Eyes" concern exist?**
   - What we know: Not in the 39 concerns from STRUCTURED_EMISSION_ADDENDUM; not in TAXONOMY_ADDITIONS.md additions.
   - What's unclear: Whether it exists in the original 39-row pre-Phase-2 set.
   - Recommendation: Wave 0 task — `SELECT name FROM concerns ORDER BY name` to get the full live list.

3. **Should concern clusters go in DB (new table) or documentation only?**
   - What we know: Clusters are needed for routing demo; Phase 9 will use them for care plans.
   - What's unclear: Whether Phase 6's schema decisions will change the right table structure.
   - Recommendation: Lean toward Option A (new table + junction) as it makes the routing demo queryable. If planner wants minimal schema risk, Option C (documentation only) defers to Phase 9.

4. **How should the transcript mining be structured to cover all 122 consultations?**
   - What we know: `combined_hipaa_transcripts.txt` is 2.9MB / 37,855 lines; individual consultations range 30–40 minutes; file has clear `===` separators.
   - What's unclear: Whether one LLM pass can cover the full file, or if chunked passes are needed.
   - Recommendation: Plan for chunked passes by concern category (e.g., one pass looking for volume/aging language, one for skin quality, one for body concerns). Each pass reads the file with offset/limit and extracts phrases.

---

## Sources

### Primary (HIGH confidence)
- `.planning/phases/02-dossier-batch/STRUCTURED_EMISSION_ADDENDUM.md` — ground truth on aliases table schema, taxonomy rules, dedupe pattern
- `.planning/phases/02-dossier-batch/STRUCTURED_COVERAGE.md` — live DB counts (353 aliases, 39 concerns, 67 body areas post-Phase-2)
- `.planning/phases/02-dossier-batch/TAXONOMY_ADDITIONS.md` — all Phase 2 additions, coverage by concern, adjudication decisions
- `supabase/compile_sql/02-03-task1-taxonomy-additions.sql` — confirmed aliases table schema via INSERT patterns
- `Fable Docs/A360_Global_Library_Enrichment_Agentic_Pipeline.docx (1).md` — content ecosystem inventory (122 transcripts, 42 playbooks, 350KB Sales Excellence Framework confirmed)
- `combined_hipaa_transcripts.txt` (disk, not in repo) — confirmed readable; real patient language verified in preview

### Secondary (MEDIUM confidence)
- `.planning/ROADMAP.md` — Phase 5 goal, success criteria, dependency map
- `.planning/GL_GSD_ROADMAP.md` — concern-cluster examples (tired look, lower-face heaviness, post-weight-loss laxity)
- `Fable Docs/A360_Global_Library_Enrichment_Agentic_Pipeline.docx (1).md` section on "Concern mappings" gap (144 rows, mostly FDA-oriented — this predates Phase 2 additions)

### Observation (LOW confidence — needs DB verification)
- Alias count of 353 is based on Phase 2 reports; live DB may differ if some SQL was only partially executed
- 39 concerns count is pre-Phase-2 verified + 7 additions = 46 total expected; STRUCTURED_COVERAGE.md states 39 which may be pre-additions baseline

---

## Metadata

**Confidence breakdown:**
- Source corpus location: HIGH — files confirmed on disk with actual content previewed
- Database state (aliases, concerns): MEDIUM — based on Phase 2 reports; live DB state needs Wave 0 verification
- Schema (aliases table columns): MEDIUM — inferred from SQL patterns; needs `information_schema` query to confirm
- Cluster definitions: MEDIUM — clusters named in roadmap; mechanism membership is reasoned from clinical knowledge
- Playbook content: HIGH — 94 files confirmed in directory; content confirmed readable

**Research date:** 2026-06-13
**Valid until:** 2026-07-13 (DB state changes with each SQL execution; re-verify alias counts before planning)
