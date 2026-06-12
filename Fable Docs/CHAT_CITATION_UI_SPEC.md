# Chat Citation UI Spec
## Clinical Research Chat — Full Page Design with Citations, Videos, and Followups

**Version:** 1.0  
**Date:** 2026-06-12  
**Audience:** UI developers + designers building the clinician-facing chat interface  
**Scope:** Research/Evidence tab chat page — response rendering, citation cards, YouTube panel, suggested questions

---

## 1. Page Layout (Full)

```
┌─────────────────────────────────────────────────────────────────┐
│  CHAT THREAD                                                      │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 👤 Clinician                                                │ │
│  │ What is the optimal dosing and timeline for combining       │ │
│  │ Botox and Juvederm Voluma XC in a full-face rejuvenation?   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ ⚡ A360 Research                                            │ │
│  │                                                             │ │
│  │ For combined neurotoxin + volumizer treatment, the          │ │
│  │ established approach begins with botulinum toxin [1][2],    │ │
│  │ followed by hyaluronic acid filler 2–4 weeks later [3].     │ │
│  │                                                             │ │
│  │ **Botox Dosing (Forehead + Glabellar + Crow's Feet)**       │ │
│  │ Total range: 40–64 units per session [1][4]                 │ │
│  │ • Glabellar complex: 20 units (FDA-indicated range) [4]     │ │
│  │ • Forehead lines: 10–20 units (off-label, field standard)   │ │
│  │   [2][3]                                                    │ │
│  │ • Lateral canthal lines: 6–12 units per side [1]            │ │
│  │                                                             │ │
│  │ **Juvederm Voluma XC — Mid-Face Volumization**              │ │
│  │ • Cheeks: 1–4 mL per session; mean 4 mL in pivotal         │ │
│  │   trial [4][5]                                              │ │
│  │ • Effect duration: up to 24 months with optimal dosing [4]  │ │
│  │                                                             │ │
│  │ **Sequencing**                                              │ │
│  │ Toxin-first is the clinical standard [2][3][6]: neuromodula-│ │
│  │ tor softens dynamic lines before filler is placed, reducing │ │
│  │ filler migration risk and improving aesthetic outcome.      │ │
│  │ Minimum interval: 2 weeks before HA filler.                │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  CITATIONS  [6 sources]                                           │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                   │
│  │ [1] FDA 🟡 │ │ [2] PUB 🟢 │ │ [3] PUB 🟢 │                   │
│  │ Botox      │ │ Carruthers │ │ Fagien et  │                   │
│  │ Prescribing│ │ et al. J   │ │ al. Derm   │                   │
│  │ Info 2023  │ │ Cosm Derm  │ │ Surg 2023  │                   │
│  │ Open Label │ │ 2022       │ │            │                   │
│  └────────────┘ └────────────┘ └────────────┘                   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                   │
│  │ [4] FDA 🟡 │ │ [5] MFG 🔵 │ │ [6] JNL 🟣 │                   │
│  │ Voluma XC  │ │ Allergan   │ │ J Drugs    │                   │
│  │ Prescribing│ │ Combination│ │ Derm — Seq-│                   │
│  │ Info 2024  │ │ Training   │ │ uencing    │                   │
│  │ Open Label │ │ Manual     │ │ Consensus  │                   │
│  └────────────┘ └────────────┘ └────────────┘                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  RELATED VIDEOS  — Allergan & Galderma Training                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │ [thumbnail]  │ │ [thumbnail]  │ │ [thumbnail]  │             │
│  │ Botox Full   │ │ Combining    │ │ Juvederm     │             │
│  │ Face Dosing  │ │ Toxin +      │ │ Voluma XC    │             │
│  │ Guide        │ │ Filler       │ │ Technique    │             │
│  │ ▶ 12:34      │ │ ▶ 8:22       │ │ ▶ 15:07      │             │
│  │ Allergan     │ │ Allergan     │ │ Allergan     │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
│  + 4 more related videos                                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SUGGESTED FOLLOW-UP QUESTIONS                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ What are the contraindications for same-session Botox +  │   │
│  │ Juvederm?                                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ How does Dysport dosing compare to Botox for glabellar   │   │
│  │ lines?                                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ What is the touch-up interval for Juvederm Voluma XC?    │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Which injection zones benefit most from combined          │   │
│  │ treatment?                                                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Citation Authority Tier — Color System

This is the most important visual design decision. Every citation card is branded by its **authority tier**, not its file type. The clinician should be able to glance and immediately know: *is this from the FDA, the company, or independent research?*

### Tier Definitions & Colors

| Tier | Label | Badge Color | Card Background | Border | Icon | When Applied |
|------|-------|-------------|-----------------|--------|------|--------------|
| **fda** | FDA Label | `amber-600` text on `amber-100` | `amber-50` | `amber-300` | `Shield` (lucide) | source = 'fda_label', authority_rank = 1 |
| **manufacturer** | Manufacturer | `blue-700` text on `blue-100` | `blue-50` | `blue-300` | `Building2` (lucide) | source = 'ifu' or 'manufacturer', authority_rank = 2–3; also YouTube where manufacturer_name is set |
| **clinical** | Research | `emerald-700` text on `emerald-100` | `emerald-50` | `emerald-300` | `Microscope` (lucide) | source = 'pubmed' or 'journal', authority_rank = 4–5 |
| **journal** | Clinical Journal | `violet-700` text on `violet-100` | `violet-50` | `violet-300` | `BookOpen` (lucide) | source = 'journal' or 'industry', authority_rank = 5–6 (non-PubMed journals, society guidelines) |

> **Design intent:** FDA = gold/amber (government authority). Manufacturer = blue (brand). Research/PubMed = green (science). Other journals = purple (clinical literature). These are universally understood in medical publishing — green = peer review, amber = regulatory.

### Visual Badge Anatomy

Each citation card has a pill badge in the top-right corner:

```
FDA Label          →  🟡 [Shield icon] FDA LABEL
Manufacturer       →  🔵 [Building2 icon] MANUFACTURER  
PubMed Research    →  🟢 [Microscope icon] RESEARCH
Clinical Journal   →  🟣 [BookOpen icon] JOURNAL
```

---

## 3. Citation Card — Full Component Spec

### Card Structure (all source types)

```
┌─────────────────────────────────────────────────────┐
│ [N]  Title ──────────────────── [TIER BADGE]        │
│      Authors • Journal • Year                       │
│                                                     │
│      "Verbatim excerpt from the source proving      │
│       the claim the LLM cited this for..."          │
│                                                     │
│      [CTA Button]              [Relevance bar]      │
└─────────────────────────────────────────────────────┘
```

### CTA Buttons by Source Type

| Source Type | CTA Label | Link |
|-------------|-----------|------|
| fda_label | Open FDA Label · p.{N} | `evidence_links.url` (accessdata.fda.gov PDF) |
| pubmed | View on PubMed | `https://pubmed.ncbi.nlm.nih.gov/{pmid}/` |
| ifu / manufacturer | Open Document | `evidence_links.url` (Supabase Storage or manufacturer URL) |
| journal / industry | Read Article | `evidence_links.url` (DOI link or direct URL) |
| youtube | Watch at {MM:SS} | `https://youtube.com/watch?v={videoId}&t={startSeconds}s` |

### Relevance Indicator

**Do NOT label this "% confident."** Label it "Relevance" and render as a 3-segment bar (low / medium / high), derived from `scores.final` in `RetrievedSource`:
- 0.0–0.4 → 1 segment filled (low)  
- 0.4–0.7 → 2 segments filled (medium)
- 0.7–1.0 → 3 segments filled (high)

---

## 4. Database → UI Field Mapping

### Primary table: `evidence_links` (Supabase project `aejskvmpembryunnbgrk`)

| DB Column | Type | → UI Usage |
|-----------|------|------------|
| `id` | uuid | citation key |
| `offering_id` | uuid | links to product |
| `source` | text | determines tier badge + CTA type |
| `pmid` | text | PubMed link URL |
| `doi` | text | DOI link + CrossRef lookup |
| `url` | text | primary CTA href |
| `title` | text | citation card title |
| `quote` | text | verbatim excerpt block |
| `authors` | text | subtitle line |
| `journal` | text | subtitle line |
| `year` | int | subtitle line |
| `page_number` | int | "Open FDA Label · p.{N}" CTA |
| `authority_rank` | int | maps to tier (1=fda, 2-3=manufacturer, 4-5=clinical, 6=practitioner) |

### `source` field values → tier mapping

```typescript
const AUTHORITY_TIER: Record<string, 'fda' | 'manufacturer' | 'clinical' | 'journal'> = {
  fda_label:    'fda',
  ifu:          'manufacturer',
  manufacturer: 'manufacturer',
  pubmed:       'clinical',
  journal:      'journal',
  industry:     'journal',
  youtube:      'manufacturer',  // manufacturer training video
};
```

### YouTube table: `manufacturer_youtube_transcript` (CMS Supabase `gjqicqldjgvrwmtkliie`)

| DB Column | Type | → UI Usage |
|-----------|------|------------|
| `video_id` | text | thumbnail URL, watch link |
| `title` | text | card title |
| `manufacturer_name` | text | card subtitle |
| `start_time` | numeric | deep-link timestamp `?t=Ns` |
| `end_time` | numeric | clip duration display |

Thumbnail URL (no API key needed):
```
https://img.youtube.com/vi/{video_id}/mqdefault.jpg   // 320×180, reliable
https://img.youtube.com/vi/{video_id}/hqdefault.jpg   // 480×360, fallback
```

---

## 5. TypeScript Types — What the UI Receives

The retrieval service emits `ResearchCitation[]` (already in `lib/types/retrieval.ts`). The chat UI needs one additional field to drive the tier color system. Extend as follows:

```typescript
// Extend ResearchCitation (lib/types/retrieval.ts) — add authorityTier
export type AuthorityTier = 'fda' | 'manufacturer' | 'clinical' | 'journal';

export interface ResearchCitation {
  number: number;              // display [1]
  retrievalId: string;         // "src_3"
  chunkRef: string;
  corpus: Corpus;
  title: string;
  evidence: string;            // verbatim chunk — render in quote block
  url?: string;                // primary CTA href
  relevance?: number;          // 0–1, drives 3-segment bar
  locator: SourceLocator;
  authorityTier: AuthorityTier; // ADD: drives card color + badge
}
```

Derive `authorityTier` in the post-processor from `evidence_links.source`:

```typescript
function toAuthorityTier(source: string): AuthorityTier {
  if (source === 'fda_label') return 'fda';
  if (source === 'ifu' || source === 'manufacturer' || source === 'youtube') return 'manufacturer';
  if (source === 'pubmed') return 'clinical';
  return 'journal';
}
```

### Citation Card Config (extends existing `reference-card.tsx` pattern)

```typescript
const CITATION_TIER_CONFIG = {
  fda: {
    label: 'FDA Label',
    icon: Shield,
    badge: 'bg-amber-100 text-amber-700 border-amber-300',
    card:  'bg-amber-50 border-amber-300',
  },
  manufacturer: {
    label: 'Manufacturer',
    icon: Building2,
    badge: 'bg-blue-100 text-blue-700 border-blue-300',
    card:  'bg-blue-50 border-blue-300',
  },
  clinical: {
    label: 'Research',
    icon: Microscope,
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    card:  'bg-emerald-50 border-emerald-300',
  },
  journal: {
    label: 'Journal',
    icon: BookOpen,
    badge: 'bg-violet-100 text-violet-700 border-violet-300',
    card:  'bg-violet-50 border-violet-300',
  },
} as const;
```

---

## 6. YouTube Video Row — Component Spec

### Layout

```
Related Videos — [Product Name] Training  ─────────  [See all 7 →]
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  [thumbnail img] │  │  [thumbnail img] │  │  [thumbnail img] │
│  320 × 180 px    │  │  320 × 180 px    │  │  320 × 180 px    │
│  ▶ overlay       │  │  ▶ overlay       │  │  ▶ overlay       │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ Botox Full Face  │  │ Combining Toxin  │  │ Voluma XC        │
│ Dosing Guide     │  │ + Filler Timing  │  │ Injection Guide  │
│ Allergan · 12:34 │  │ Allergan · 8:22  │  │ Allergan · 15:07 │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Data Shape

```typescript
interface RelatedVideo {
  videoId: string;
  title: string;
  manufacturerName: string;
  startSeconds: number;          // from evidence_links.url or transcript match
  durationSeconds?: number;      // end_time - start_time from transcript
  thumbnailUrl: string;          // constructed: img.youtube.com/vi/{videoId}/mqdefault.jpg
  watchUrl: string;              // https://youtube.com/watch?v={videoId}&t={startSeconds}s
}
```

### Sourcing Videos

Query `evidence_links` WHERE:
- `source = 'youtube'`
- `offering_id IN (products mentioned in the answer)`
- ORDER BY `authority_rank ASC, created_at DESC`
- LIMIT 7 (show 3, "See all N" for remainder)

**Play button overlay:** Absolute-positioned semi-transparent circle with `Play` icon. On hover: scale 1.05, darken overlay.

**Duration display:** Format `durationSeconds` as `M:SS`. If `durationSeconds` is null, omit.

**"See all N →" link:** Opens a side panel or expands the row to show all videos for the topic. N = total count from the query.

---

## 7. Suggested Follow-Up Questions — Component Spec

### Layout

```
┌────────────────────────────────────────────────────────────────┐
│ ↩  What are the contraindications for same-session Botox +    │
│    Juvederm?                                                   │
└────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────┐
│ ↩  How does Dysport dosing compare to Botox for glabellar     │
│    lines?                                                      │
└────────────────────────────────────────────────────────────────┘
```

Full-width cards, not small chips — these are clinical questions, not tags. Clicking any card immediately submits the question to the chat thread.

### Data Shape

```typescript
interface SuggestedQuestion {
  text: string;            // the full question text
  rationale?: string;      // not shown to user — used for logging
  relatedProducts?: string[]; // offering_ids — for pre-loading context
}
```

### Sourcing Questions

**Option A (preferred — LLM-generated):** The retrieval service emits 4 suggested questions alongside the `done` event. Add to the streaming protocol:

```typescript
// Add to ResearchEvent union in lib/types/retrieval.ts:
| {
    type: 'suggestions';
    questions: SuggestedQuestion[];
  }
```

The LLM generates these based on the answer context with a system prompt addendum:
```
After your response, generate exactly 4 follow-up questions a clinician 
would naturally ask next. Questions must be clinically specific, reference 
real products by name, and be answerable from the GL knowledge base.
Format: JSON array of strings under key "suggested_questions".
```

**Option B (fallback):** Pre-compute from `item_concerns` for the products in the response — return the top 4 concerns that were NOT the primary topic of the current question.

---

## 8. Inline Citation Badge — `[N]` in Prose

The prose response contains `[1]`, `[2]`, `[3]` etc. inline. Each badge:

- Renders as a small superscript pill: `[1]`
- Color matches the citation's `authorityTier` (amber = FDA, blue = manufacturer, green = clinical, purple = journal)
- On hover: tooltip showing title + source type
- On click: scrolls the citation card panel to that citation (smooth scroll, brief highlight pulse)

```typescript
// Inline badge color by tier
const INLINE_BADGE_COLORS = {
  fda:          'bg-amber-100 text-amber-700 hover:bg-amber-200',
  manufacturer: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  clinical:     'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
  journal:      'bg-violet-100 text-violet-700 hover:bg-violet-200',
};
```

---

## 9. What Is Available in the DB Today vs. After Phase 1 + 2

| Data | Available Now | After Phase 1 | After Phase 2 |
|------|---------------|---------------|---------------|
| PubMed citations with clickable URLs | ❌ pmid/url null | ✅ 14 rows fixed | ✅ new rows auto-captured |
| FDA label URLs | ❌ url empty | ✅ 47 rows fixed | ✅ new rows auto-captured |
| YouTube citations with timestamps | ❌ no `?t=` | ✅ 6 rows fixed | ✅ new rows auto-captured |
| `page_number` column | ❌ missing | ✅ column exists | ✅ populated for FDA |
| `authorityTier` derivable from `source` | ✅ `source` field exists | ✅ no change | ✅ no change |
| Dossier prose for all 20 products | ❌ Botox only | ❌ not Phase 1 scope | ✅ all 20 products |
| `item_concerns` / `item_body_areas` | ❌ sparse | ❌ not Phase 1 scope | ✅ all 20 products |
| Journal article citations (OA ingestion) | ❌ none yet | ❌ not Phase 1 scope | ⚠️ logged, not ingested |
| Journal articles actually searchable | ❌ none yet | ❌ | ❌ Phase 4 scope |

> **Demo minimum:** Phase 1 complete + Botox dossier content = citations with real PubMed + FDA links work for Botox/Neurotoxins. Phase 2 complete = all 20 products. Phase 3 = the UI is wired to read from the real DB.

---

## 10. Component File Suggestions

| Component | File | Status |
|-----------|------|--------|
| Citation card (tier-aware) | `components/citations/reference-card.tsx` | **Update** — add `authorityTier` prop + new color config |
| Inline citation badge | `components/citations/inline-citation-badge.tsx` | **Update** — add tier-color variant |
| Citations panel | `components/citations/references-section.tsx` | **Update** — group by tier (FDA first, then Manufacturer, then Research) |
| YouTube video row | `components/citations/related-videos.tsx` | **New** |
| Suggested questions | `components/citations/suggested-questions.tsx` | **New** |
| Chat page assembly | `app/(dashboard)/research/page.tsx` | **Update** — add video row + questions below thread |

---

*Spec: 01-citations / chat UI*  
*Last updated: 2026-06-12*
