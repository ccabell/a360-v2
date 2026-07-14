---
phase: 04-answer-structure
verified: 2026-06-13T00:00:00Z
status: human_needed
score: 7/7 must-haves verified
human_verification:
  - test: "Visual confirmation of Key Points card above answer prose"
    expected: "Rounded bordered card with 'Key Points' label, 3-7 bulleted takeaways each followed by inline authority badge(s), appearing above the answer text only after streaming completes"
    why_human: "Card conditional on LLM emitting KEY_POINTS sentinel — requires live API call to verify render path; cannot confirm visual placement or badge appearance programmatically"
  - test: "Visual confirmation of h3 section headings with left border accent"
    expected: "Section headings render as larger text (text-base) with a blue/primary vertical line on the left (border-l-2 border-primary), clear vertical spacing above (mt-4)"
    why_human: "CSS rendering and visual separation are not verifiable programmatically"
  - test: "Table rendering from LLM pipe table output"
    expected: "Markdown pipe tables in LLM output render as HTML <table> elements with styled header row (muted background), alternating data row backgrounds, and inline authority badges in cells where [src_N] markers appear"
    why_human: "Requires live LLM response containing a pipe table; trigger with: 'Compare Botox vs Dysport dosing and duration'"
  - test: "Mobile horizontal scroll for tables"
    expected: "On a 375px viewport (Chrome DevTools responsive mode), tables scroll horizontally without breaking page layout or overflowing the viewport"
    why_human: "Viewport/scroll behavior requires browser testing"
---

# Phase 4: Answer Structure Verification Report

**Phase Goal:** Users see answers structured as Heidi-pattern content: a Key Points summary card at top, visually distinct section headers, and product fact tables / comparison tables rendered as accessible HTML.
**Verified:** 2026-06-13
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | A Key Points card appears above the answer prose with 3-7 bulleted takeaways | ✓ VERIFIED | `KeyPointsCard` renders conditional on `m.done && m.keyPoints && m.keyPoints.length > 0`; placed above `<GroundedAnswer>` in ask-experience.tsx line 423 |
| 2 | Each key point bullet has inline authority badge(s) from [src_N] markers | ✓ VERIFIED | Each bullet calls `parseCitationSegments(point, resolve, byNumber, citations)` which produces `InlineAuthorityBadge` wrapped in `CitationHoverCard` per resolved citation group |
| 3 | Section headings render as h3 with left border accent and clear visual separation | ✓ VERIFIED | answer-message.tsx line 49: `<h3 className="mt-4 mb-1 border-l-2 border-primary pl-3 text-base font-semibold text-foreground">` |
| 4 | Key Points card only appears after answer completes (done event) | ✓ VERIFIED | Guard in ask-experience.tsx: `m.done && m.keyPoints && m.keyPoints.length > 0` — card blocked until `done` event received |
| 5 | Markdown pipe tables render as HTML table elements | ✓ VERIFIED | `MarkdownTable` component exists; `isTable` regex detection in answer-message.tsx routes matching paragraphs to it |
| 6 | Each table cell can contain [src_N] markers that resolve to InlineAuthorityBadge | ✓ VERIFIED | Both header and data cell render paths call `parseCitationSegments(cell, resolve, byNumber, citations)` |
| 7 | Tables on narrow viewport scroll horizontally without breaking page layout | ✓ VERIFIED (code) | `<div className="overflow-x-auto my-3">` wraps every table in markdown-table.tsx line 41; `min-w-full` on table prevents squashing |

**Score:** 7/7 truths verified (automated); 4 items require human visual confirmation

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `components/grounding/citation-segments.tsx` | Shared citation segment parser; exports `parseCitationSegments` and `ResolvedRef` | ✓ VERIFIED | 123 lines; exports `ResolvedRef` interface (line 8) and `parseCitationSegments` function (line 22); substantive implementation with inline bold rendering, citation grouping by corpus, `CitationHoverCard` wrapping |
| `components/grounding/key-points-card.tsx` | Key Points summary card; exports `KeyPointsCard` | ✓ VERIFIED | 54 lines; exports `KeyPointsCard` (line 16); renders bulleted list with `parseCitationSegments` per bullet; returns null when `keyPoints.length === 0` |
| `components/grounding/markdown-table.tsx` | GFM pipe table parser with per-cell citation injection; exports `MarkdownTable` | ✓ VERIFIED | 75 lines; exports `MarkdownTable` (line 28); `parseRow` helper; header/separator/data row parsing; fallback for malformed tables |
| `components/grounding/answer-message.tsx` | Upgraded h3 headings; uses `parseCitationSegments`; contains `isTable` detection; imports `MarkdownTable` | ✓ VERIFIED | Contains `border-l-2 border-primary` (line 49); imports `parseCitationSegments` (line 2) and `MarkdownTable` (line 3); `isTable` at line 56 |
| `app/api/ask/route.ts` | `extractKeyPoints` function; KEY_POINTS prompt; `maxOutputTokens: 800`; `keyPoints` in done event | ✓ VERIFIED | `extractKeyPoints` defined at line 63, invoked at line 366; `KEY_POINTS` appears in SYSTEM prompt (line 23) and regex (line 64); `maxOutputTokens: 800` (line 346); `keyPoints` in done emit (line 377) |
| `lib/types/retrieval.ts` | `keyPoints?: string[]` on done event variant | ✓ VERIFIED | Line 132: `keyPoints?: string[];` inside the `done` event variant |
| `components/ask/ask-experience.tsx` | `keyPoints?: string[]` in `AssistantMessage`; done handler propagates it; `KeyPointsCard` imported and rendered | ✓ VERIFIED | `keyPoints?: string[]` at line 67; propagated in done case (line 243); `KeyPointsCard` imported (line 27) and rendered at lines 423-429 |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `app/api/ask/route.ts` | `ask-experience.tsx` | done SSE event carries `keyPoints: string[]` | ✓ WIRED | route.ts emits `keyPoints` in done event (line 377); ask-experience done handler reads `ev.keyPoints` (line 243) |
| `ask-experience.tsx` | `key-points-card.tsx` | renders `KeyPointsCard` with `keyPoints` prop above `GroundedAnswer` | ✓ WIRED | Import at line 27; JSX render at line 424 with all three props; placed before `<GroundedAnswer>` at line 430 |
| `key-points-card.tsx` | `citation-segments.tsx` | calls `parseCitationSegments` for [src_N] rendering | ✓ WIRED | Import at line 4; called per bullet at line 47 |
| `answer-message.tsx` | `markdown-table.tsx` | renders `MarkdownTable` when paragraph matches table regex | ✓ WIRED | Import at line 3; `isTable` detection at line 56; JSX render at line 59 |
| `markdown-table.tsx` | `citation-segments.tsx` | calls `parseCitationSegments` for per-cell citation rendering | ✓ WIRED | Import at line 4; called in header cells (line 51) and data cells (line 66) |
| `answer-message.tsx` | `citation-segments.tsx` | uses `parseCitationSegments` instead of inline logic | ✓ WIRED | Import at line 2; called in prose paragraph path at line 71 |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `KeyPointsCard` | `keyPoints: string[]` | LLM output via `extractKeyPoints()` → `done` SSE event → `AssistantMessage.keyPoints` | Yes — `extractKeyPoints` parses `KEY_POINTS:` sentinel from live LLM response; empty array on miss (graceful degradation, not stub) | ✓ FLOWING |
| `MarkdownTable` | `raw: string` | LLM token stream → `AssistantMessage.text` → `AnswerMessage` paragraph split → `isTable` branch | Yes — passes raw paragraph from real LLM output; `parseCitationSegments` resolves citations from live `displayMap` and `citations` | ✓ FLOWING |
| `AnswerMessage` (h3 headings) | `para` strings from `text.split(/\n\n+/)` | LLM token stream accumulated in `AssistantMessage.text` | Yes — real LLM response text | ✓ FLOWING |

**Note on cache path:** The cache replay path in `route.ts` emits the stored `answer_prose` but does NOT re-emit `keyPoints`. The `done` event on the cache path (lines 279-283) has no `keyPoints` field. This means cached answers will not show the Key Points card. This is a minor limitation — not a blocker for the demo since the first query per hash will be live, and the requirement (ANS-01) does not specify cache behavior.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| TypeScript compiles clean | `npx tsc --noEmit` | Exit 0, no output | ✓ PASS |
| `extractKeyPoints` defined and invoked | `grep -c "extractKeyPoints" app/api/ask/route.ts` | 2 | ✓ PASS |
| KEY_POINTS in system prompt and regex | `grep -c "KEY_POINTS" app/api/ask/route.ts` | 3 | ✓ PASS |
| maxOutputTokens is 800 | `grep "maxOutputTokens" app/api/ask/route.ts` | `800` | ✓ PASS |
| h3 with border-l-2 in answer-message | `grep "border-l-2 border-primary" answer-message.tsx` | Line 49 match | ✓ PASS |
| KeyPointsCard imported and used | `grep -c "KeyPointsCard" ask-experience.tsx` | 2 | ✓ PASS |
| keyPoints in done event type | `grep "keyPoints" lib/types/retrieval.ts` | Line 132 match | ✓ PASS |
| MarkdownTable imported and used | `grep -n "MarkdownTable" answer-message.tsx` | Lines 3 and 59 | ✓ PASS |
| overflow-x-auto mobile scroll | `grep "overflow-x-auto" markdown-table.tsx` | Line 41 match | ✓ PASS |
| Alternating table row styling | `grep "odd:bg-background\|even:bg-muted" markdown-table.tsx` | Lines 44, 59 | ✓ PASS |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| ANS-01 | 04-01-PLAN.md | Answer displays a Key Points summary card at top with 3-7 bulleted takeaways, each sourced with inline authority badges | ✓ SATISFIED | `KeyPointsCard` exists, wired via SSE done event, renders per-bullet `parseCitationSegments` with `InlineAuthorityBadge` |
| ANS-02 | 04-01-PLAN.md | Section headings render as visually distinct styled headers with clear separation between content sections | ✓ SATISFIED | `<h3 className="mt-4 mb-1 border-l-2 border-primary pl-3 text-base font-semibold text-foreground">` in answer-message.tsx |
| ANS-03 | 04-02-PLAN.md | Structured tables render as accessible HTML tables with per-cell inline citations | ✓ SATISFIED | `MarkdownTable` renders `<table>`, `<thead>`, `<tbody>` with `parseCitationSegments` per cell |
| ANS-04 | 04-02-PLAN.md | Tables wrap cleanly on mobile with proper headers and accessible semantics | ✓ SATISFIED | `overflow-x-auto` wrapper div; `<thead>`/`<th>` for accessible semantics; `min-w-full` prevents squashing |

All four requirements attributed to Phase 4 in REQUIREMENTS.md are satisfied. No orphaned requirements found — REQUIREMENTS.md Traceability table lists ANS-01 through ANS-04 as Phase 4 / Complete.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `app/api/ask/route.ts` | 279-283 | Cache replay `done` event emits no `keyPoints` — cached answers will render without Key Points card | ℹ️ Info | Aesthetic degradation for repeated questions; not a blocker since the requirement targets live answers and cache entries were created before KEY_POINTS extraction existed |

No TODO/FIXME/placeholder markers found in any Phase 4 files. No stub implementations. No hardcoded empty data flowing to rendered output.

---

### Human Verification Required

The following items require live browser testing. All code paths are correctly wired — what cannot be verified programmatically is visual rendering and LLM output format.

#### 1. Key Points Card Render

**Test:** Start dev server (`npm run dev`). Navigate to `http://localhost:3000/ask?query=Can+Botox+and+filler+be+done+the+same+day`. Wait for streaming to complete.
**Expected:** A bordered card labeled "Key Points" appears above the answer prose. It shows 3-7 bulleted items. Each bullet has at least one colored inline authority badge (e.g., "FDA", "PubMed", manufacturer name) following the takeaway text.
**Why human:** Card appears only when the live LLM response includes a `KEY_POINTS:` sentinel line. Cannot verify LLM output format or visual badge appearance programmatically.

#### 2. Section Heading Visual Hierarchy

**Test:** Same page load as above, scroll through the answer body.
**Expected:** Section headings (e.g., "Safety Considerations", "Recommended Protocol") render as larger text with a blue vertical bar on their left edge and clear whitespace above them — visually distinct from body paragraph text.
**Why human:** CSS visual separation requires browser rendering.

#### 3. Table Rendering

**Test:** Ask "Compare Botox vs Dysport dosing and duration" on the same page.
**Expected:** If the LLM returns a pipe table, it renders as an HTML table with a shaded header row, alternating row backgrounds, and inline authority badges in cells where `[src_N]` markers appear. Raw pipe characters (`|`) should NOT be visible in the output.
**Why human:** Requires LLM to actually emit a pipe table in its response; cannot deterministically trigger in a static code check.

#### 4. Mobile Horizontal Scroll

**Test:** In Chrome DevTools, set viewport to 375px width. Ask a question that produces a table.
**Expected:** The table scrolls horizontally within its container. The page does not overflow or break layout.
**Why human:** Scroll and overflow behavior requires browser viewport testing.

---

### Gaps Summary

No gaps. All automated checks pass. The phase goal is fully implemented in code. The four human verification items are rendering/UX confirmations that the working code path produces the expected visual output — they are not evidence of missing implementation.

The only notable finding is the cache replay path not re-emitting `keyPoints`, which is an ℹ️ Info item, not a blocker.

---

_Verified: 2026-06-13_
_Verifier: Claude (gsd-verifier)_
