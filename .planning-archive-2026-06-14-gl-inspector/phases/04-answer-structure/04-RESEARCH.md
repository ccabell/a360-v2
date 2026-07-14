# Phase 4: answer-structure — Research

**Researched:** 2026-06-13
**Domain:** React/Next.js answer rendering — LLM output parsing, Key Points card, markdown table rendering, inline citation injection
**Confidence:** HIGH (all findings derived from direct code inspection of the live codebase)

---

## Summary

Phase 4 adds three visual layers on top of the existing `AnswerMessage` renderer: a Key Points summary card, visually upgraded section headers, and HTML table rendering with per-cell citation badges. The existing pipeline streams raw LLM text via SSE tokens into a single string that `AnswerMessage` post-processes. No retrieval changes are needed — this is entirely a prompt + component layer.

The central design question is how to extract Key Points: the LLM must emit them in a parseable format before the main prose, and the frontend must split them out before passing text to `AnswerMessage`. A sentinel-delimited block (e.g. `KEY_POINTS: ...` on its own line, similar to the existing `FOLLOW_UPS:` pattern) is the lowest-friction approach and keeps the streaming model intact. Tables from LLM output are standard GFM pipe syntax; `answer-message.tsx` currently has no table handler and will render them as broken text.

The two planned tasks (04-01 and 04-02) map cleanly to the code: 04-01 owns the prompt change, key-points extraction function, and `KeyPointsCard` component; 04-02 owns the paragraph-level table detector in `AnswerMessage` and a `MarkdownTable` sub-component that injects `InlineAuthorityBadge` per cell.

**Primary recommendation:** Use a `KEY_POINTS:` sentinel line in the system prompt (mirroring `FOLLOW_UPS:`), extract on the server before emitting the `done` event, and pass `keyPoints` as a new field on the `done` SSE event or on a new `key_points` event. Render `KeyPointsCard` in `AskExperience` above `GroundedAnswer`, not inside it.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ANS-01 | Key Points summary card at top with 3-7 bulleted takeaways, each sourced with inline authority badges | Sentinel extraction from LLM output; `KeyPointsCard` component; `InlineAuthorityBadge` reuse |
| ANS-02 | Section headings render as visually distinct styled headers with clear visual separation | Upgrade current `<h4 className="text-sm font-semibold">` to `<h3>` with larger type, left border accent, top margin |
| ANS-03 | Tables render as accessible HTML tables with per-cell inline citations | New table-detection branch in `AnswerMessage.paragraphs` loop; `MarkdownTable` component with `[src_N]` injection per cell |
| ANS-04 | Tables scroll horizontally on mobile without breaking layout | Wrap `<table>` in `<div className="overflow-x-auto">` with `min-w-full` on the table element |
</phase_requirements>

---

## Standard Stack

### Core (already in project — no new installs)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19 | Component rendering | Already in use |
| Next.js | See AGENTS.md — read node_modules/next/dist/docs/ | SSE route, app router | Already in use |
| Tailwind v4 | latest | Styling with OKLch tokens | Already in use via `@import "tailwindcss"` |
| shadcn/ui | latest | Card, badge primitives | Already in use via `shadcn/tailwind.css` |

### No new packages required

All rendering primitives needed (Card, Badge-like chips, table HTML) can be built from existing Tailwind utilities and the already-installed shadcn component set. `InlineAuthorityBadge` and `CitationHoverCard` are reused as-is.

**Installation:** none required.

---

## Architecture Patterns

### Current Pipeline (must be preserved)

```
route.ts  ──SSE──►  AskExperience (streams tokens into AssistantMessage.text)
                         │
                         ▼
                    GroundedAnswer
                         │
                         ▼
                    AnswerMessage  (splits on \n\n, handles **headings**, [src_N] markers)
```

### Modified Pipeline (Phase 4)

```
route.ts  ──SSE──►  AskExperience (streams tokens into AssistantMessage.text)
                         │
                         ▼  extractKeyPoints(fullText) ← called in 'done' handler
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        KeyPointsCard           GroundedAnswer
        (above prose)               │
                                    ▼
                              AnswerMessage
                              (upgraded h3, table branch)
```

### Pattern 1: Sentinel Extraction for Key Points (mirrors FOLLOW_UPS)

**What:** The system prompt instructs the LLM to emit a `KEY_POINTS:` block before the main answer body. Server-side, `extractKeyPoints()` strips it from the prose and returns the structured data.

**When to use:** Any time an LLM must produce structured metadata alongside free-form prose in a single streaming output.

**Where to put the KEY_POINTS block:** Place it AT THE START of the LLM's output, before prose, so it arrives in the first tokens. This enables early rendering of the card even while the rest of the answer streams.

**Prompt addition (append to SYSTEM constant in route.ts):**
```
Before your main answer, output a KEY_POINTS block with 3-7 short takeaways:
KEY_POINTS: <point 1>[src_N]|<point 2>[src_N]|<point 3>[src_N]
Then a blank line, then your structured answer with bold section headings.
```

**Extraction function (server-side, in route.ts — mirrors extractFollowUps):**
```typescript
function extractKeyPoints(text: string): { cleanText: string; keyPoints: string[] } {
  const match = text.match(/^KEY_POINTS:\s*(.+)\n/);
  if (!match) return { cleanText: text, keyPoints: [] };
  const cleanText = text.slice(match[0].length).trimStart();
  const keyPoints = match[1]
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 7);
  return { cleanText, keyPoints };
}
```

**SSE transport:** Add `keyPoints?: string[]` to the existing `done` event type (already carries `followUps`). No new event type needed. Alternatively emit a `key_points` event before the first `token` event, similar to `sources`.

**Client-side state:** Add `keyPoints?: string[]` to `AssistantMessage` in `AskExperience`. Populate in the `done` case handler.

### Pattern 2: KeyPointsCard Component

**What:** A card rendered above `GroundedAnswer` in `AskExperience`. Receives `keyPoints: string[]` and `citations`/`displayMap` (for badge resolution). Each bullet is rendered through a mini inline-citation parser (same logic as `AnswerMessage` but without the paragraph-split).

**Where:** Created as `components/grounding/key-points-card.tsx`. Rendered in `AskExperience` between the source pills and `GroundedAnswer`.

**Structure:**
```tsx
// components/grounding/key-points-card.tsx
<div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
    Key Points
  </p>
  <ul className="space-y-1.5">
    {keyPoints.map((point, i) => (
      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
        <span>{renderInlineCitations(point, citations, displayMap)}</span>
      </li>
    ))}
  </ul>
</div>
```

The `renderInlineCitations` helper is extracted from the `[src_N]` grouping logic that already exists in `AnswerMessage` — it returns `React.ReactNode[]` from a string with `[src_N]` markers.

### Pattern 3: Section Heading Upgrade (ANS-02)

**Current state in `answer-message.tsx` (line 55):**
```tsx
<h4 key={pi} className="text-sm font-semibold text-foreground pt-1">
  {headingMatch[1]}
</h4>
```

**Upgraded pattern:**
```tsx
<h3
  key={pi}
  className="mt-4 mb-1 border-l-2 border-primary pl-3 text-base font-semibold text-foreground"
>
  {headingMatch[1]}
</h3>
```

**Changes:** `h4` → `h3`, `text-sm` → `text-base`, add `border-l-2 border-primary pl-3` for visual accent, `mt-4 mb-1` for separation. These use only existing OKLch token utilities (`border-primary`, `text-foreground`).

### Pattern 4: Table Detection and Rendering (ANS-03, ANS-04)

**What:** GFM pipe tables appear as a block of lines joined by `|` with a header separator row. In the current paragraph-split logic (`text.split(/\n\n+/)`), a table block arrives as a single multi-line "paragraph" string. Detection: check if the block contains a separator row matching `/^\|[-| :]+\|$/m`.

**Table detection branch in AnswerMessage:**
```typescript
// Inside the paragraphs.map() loop, before the [src_N] split logic:
const isTable = /^\|.+\|\n\|[-| :]+\|/m.test(trimmed);
if (isTable) {
  return <MarkdownTable key={pi} raw={trimmed} resolve={resolve} byNumber={byNumber} citations={citations ?? []} />;
}
```

**MarkdownTable component (new file `components/grounding/markdown-table.tsx`):**

```tsx
// Parses raw GFM table string into headers + rows,
// then renders each cell through the [src_N] resolver.
export function MarkdownTable({ raw, resolve, byNumber, citations }) {
  const lines = raw.trim().split("\n");
  // line 0 = header row, line 1 = separator, line 2+ = data rows
  const headers = parseRow(lines[0]);
  const rows = lines.slice(2).map(parseRow);

  return (
    <div className="overflow-x-auto my-3">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold text-foreground">
                {renderCell(h, resolve, byNumber, citations)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border last:border-0 odd:bg-background even:bg-muted/20">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 align-top text-foreground/90">
                  {renderCell(cell, resolve, byNumber, citations)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function parseRow(line: string): string[] {
  return line
    .replace(/^\||\|$/g, "")  // strip leading/trailing pipes
    .split("|")
    .map((c) => c.trim());
}
```

`renderCell` applies the same `[src_N]` grouping logic from `AnswerMessage` — this is a good candidate to extract into a shared helper `parseCitationSegments(text, resolve, byNumber, citations)`.

**Mobile scroll (ANS-04):** The `overflow-x-auto` wrapper above handles this. The table uses `min-w-full` but the wrapper clips and scrolls. No additional CSS is needed.

### Pattern 5: Shared `parseCitationSegments` Helper

**What:** The `[src_N]` marker grouping loop is currently inlined in `AnswerMessage`. Both `KeyPointsCard` and `MarkdownTable` need the same logic. Extract it:

```typescript
// components/grounding/citation-segments.tsx (or .ts)
export function parseCitationSegments(
  text: string,
  resolve: (id: string) => ResolvedRef | null,
  byNumber: Map<number, ResearchCitation>,
  citations: ResearchCitation[],
): React.ReactNode[]
```

`AnswerMessage` is refactored to call this helper. `KeyPointsCard` and `MarkdownTable` call it too. This is the only refactor in `AnswerMessage` — all other behavior stays identical.

### Anti-Patterns to Avoid

- **Modifying `lib/retrieval/*`**: FROZEN. Zero changes there.
- **Rebuilding `AskExperience` or `GroundedAnswer`**: Extend, don't replace.
- **Passing `keyPoints` through `GroundedAnswer`**: Keep it at the `AskExperience` level — `GroundedAnswer` is answer prose only.
- **Using a JSON block for KEY_POINTS**: Fragile during streaming. Pipe-delimited sentinel is robust and already proven by `FOLLOW_UPS:`.
- **Parsing tables at the route layer**: LLM tables belong in the renderer, not the API. Route strips only `KEY_POINTS:` and `FOLLOW_UPS:`.
- **Using `dangerouslySetInnerHTML`**: All rendering via React JSX — no HTML injection.
- **Heidi yellow/sand colors**: A360 palette only. Use `bg-primary/5`, `border-primary/20`, `text-primary` for the Key Points card accent.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Inline citation badges | Custom badge markup | `InlineAuthorityBadge` (already exists) | Corpus colors, hover cards, scroll-to-ref behavior already implemented |
| Citation hover behavior | Custom tooltip | `CitationHoverCard` (already exists) | Pager, confidence, feedback already in there |
| Responsive table scroll | CSS overflow tricks | `overflow-x-auto` div wrapper | One class, handles all viewport widths |
| GFM table parse | Full markdown parser (remark/react-markdown) | Manual pipe-split | The LLM emits simple pipe tables; a 10-line parser is sufficient and avoids a new dependency |

**Key insight:** Avoid adding `react-markdown` or `remark`. The existing renderer handles the project's specific output format (only `**bold**`, section headings, and `[src_N]` markers). A full markdown parser would require routing all citation injection through rehype plugins, which conflicts with the existing streaming-token architecture. A targeted table branch is simpler and correct.

---

## Common Pitfalls

### Pitfall 1: KEY_POINTS block appears mid-stream, not at start
**What goes wrong:** If `KEY_POINTS:` lands in the middle of tokens, the client sees partial text before the block, causing display glitches.
**Why it happens:** LLMs don't always respect "output X first" if the instruction is ambiguous.
**How to avoid:** Put `KEY_POINTS:` extraction in `extractKeyPoints()` on the server AFTER `fullText` is assembled (same as `extractFollowUps`). The server strips it from the token stream before emitting, so streaming order doesn't matter.
**Warning signs:** Key points card shows empty; `cleanText` starts with `KEY_POINTS:` text.

### Pitfall 2: Table detection false-positives
**What goes wrong:** A line of text with multiple `|` pipes (e.g. "option A | option B | option C") gets detected as a table.
**Why it happens:** Naive pipe detection.
**How to avoid:** Require both a header row AND a separator row (`|---|---|`) in the regex: `/^\|.+\|\n\|[-| :]+\|/m`. The separator is unambiguous.

### Pitfall 3: Tables not emitting as a single paragraph block
**What goes wrong:** `text.split(/\n\n+/)` splits a table if there's a blank line between the header separator and data rows.
**Why it happens:** GFM tables should have no blank lines internally, but LLMs sometimes add them.
**How to avoid:** In the system prompt, include: "Output tables with no blank lines between the header, separator row, and data rows." Also add a pre-processing step that collapses `\n\n` inside table blocks before the paragraph split.

### Pitfall 4: `parseCitationSegments` called before `citations` arrives
**What goes wrong:** During streaming, `citations` is empty (`[]`) and `displayMap` is `{}`. Key Points card shows unresolved `[src_N]` markers as text.
**Why it happens:** `citations` arrives in the `citations` SSE event, which comes after all `token` events.
**How to avoid:** `KeyPointsCard` shows bullets with `PendingCitation` spinners until `citations` arrives (same behavior as `AnswerMessage` today). The `keyPoints` array itself is populated on the `done` event, which arrives after `citations` — so by the time `KeyPointsCard` renders, citations are available.

### Pitfall 5: `maxOutputTokens: 600` too tight for KEY_POINTS + full answer
**What goes wrong:** Adding `KEY_POINTS:` prefix consumes ~30-50 tokens from the budget, truncating the answer body.
**Why it happens:** 600 token cap in `route.ts` line 331.
**How to avoid:** Increase `maxOutputTokens` to 800 in the same call. Key Points + 3-4 section answer + FOLLOW_UPS fits in ~750 tokens for typical aesthetic questions.

---

## Code Examples

### Extraction pattern (server — route.ts)
```typescript
// Source: direct inspection of route.ts extractFollowUps() (lines 47-57)
// Mirror this pattern for KEY_POINTS:
function extractKeyPoints(text: string): { cleanText: string; keyPoints: string[] } {
  const match = text.match(/^KEY_POINTS:\s*(.+)\n/);
  if (!match) return { cleanText: text, keyPoints: [] };
  const cleanText = text.slice(match[0].length).trimStart();
  const keyPoints = match[1]
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 7);
  return { cleanText, keyPoints };
}
```

### Paragraph rendering branch for tables (answer-message.tsx)
```typescript
// Source: direct inspection of answer-message.tsx paragraphs.map() (lines 48-153)
// New branch inserted before the existing [src_N] logic:
const isTable = /^\|.+\|\n\|[-| :]+\|/m.test(trimmed);
if (isTable) {
  return (
    <MarkdownTable
      key={pi}
      raw={trimmed}
      resolve={resolve}
      byNumber={byNumber}
      citations={citations ?? []}
    />
  );
}
```

### Section heading upgrade (answer-message.tsx line 54-58)
```typescript
// Current:
<h4 key={pi} className="text-sm font-semibold text-foreground pt-1">
// Replace with:
<h3 key={pi} className="mt-4 mb-1 border-l-2 border-primary pl-3 text-base font-semibold text-foreground">
```

### Mobile-safe table wrapper
```tsx
// Source: Tailwind overflow-x-auto pattern — HIGH confidence, standard
<div className="overflow-x-auto my-3">
  <table className="min-w-full border-collapse text-sm">
    {/* ... */}
  </table>
</div>
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Full markdown library (remark/react-markdown) | Custom targeted parser | Avoids dependency conflict with citation injection; streaming-safe |
| JSON-structured LLM output for key points | Sentinel-delimited inline format | Works during streaming; no JSON parse errors on partial tokens |
| h4 section headers, text-sm | h3 section headers, text-base + border accent | Meets ANS-02 visual distinction requirement |

---

## Open Questions

1. **KEY_POINTS citation resolution during streaming**
   - What we know: `keyPoints` strings contain `[src_N]` markers, but citations arrive with the `done` event
   - What's unclear: Should we show the Key Points card immediately (without badges) or wait until `done`?
   - Recommendation: Show Key Points card immediately with `PendingCitation` spinners that resolve when `citations` event arrives. Same UX as prose badges today.

2. **`maxOutputTokens` increase side effects**
   - What we know: Current cap is 600; KEY_POINTS + FOLLOW_UPS adds ~50-80 tokens overhead
   - What's unclear: Whether 800 tokens increases latency noticeably at Haiku pricing tier
   - Recommendation: Increase to 800. Haiku is fast; latency impact is minimal (~0.2s).

3. **`ask_log.answer_prose` column stores the full text**
   - What we know: `answer_prose` is set to `fullText` after `extractFollowUps` strips FOLLOW_UPS
   - What's unclear: Should `keyPoints` be stored separately in `ask_log` for analytics?
   - Recommendation: Not in Phase 4 scope. Store `cleanText` (with KEY_POINTS stripped) in `answer_prose` as today. Leave `ask_log` schema unchanged.

---

## Environment Availability

Step 2.6: SKIPPED (Phase 4 is purely component + prompt changes; no new external tools, CLIs, or services required)

---

## Validation Architecture

`workflow.nyquist_validation` is not set in `.planning/config.json` — treating as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected in project root |
| Config file | None found — Wave 0 must create |
| Quick run command | `npx tsc --noEmit` (type check) |
| Full suite command | None yet — manual browser verification |

No automated test framework (jest, vitest, playwright) was found in this project. Given the demo deadline (June 22) and the purely UI/component nature of Phase 4, the validation strategy is:
1. TypeScript compilation clean (`npx tsc --noEmit`)
2. Manual browser smoke test against the demo query

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ANS-01 | Key Points card appears above answer prose | manual-only | `npx tsc --noEmit` (type safety) | N/A |
| ANS-02 | Section headings render as h3 with visual separation | manual-only | `npx tsc --noEmit` | N/A |
| ANS-03 | Tables render as HTML with per-cell citations | manual-only | `npx tsc --noEmit` | N/A |
| ANS-04 | Tables scroll horizontally on mobile | manual-only | Chrome DevTools responsive mode | N/A |

**Justification for manual-only:** No test framework exists. Phase 4 is entirely visual rendering. The demo deadline makes adding a test framework out of scope for this phase.

### Sampling Rate
- **Per task commit:** `npx tsc --noEmit`
- **Per wave merge:** `npx tsc --noEmit` + manual browser smoke test
- **Phase gate:** Demo query `/ask?query=Can+Botox+and+filler+be+done+the+same+day` shows Key Points card, styled h3 headings, and at least one table before Phase 5 begins

### Wave 0 Gaps
- None for test infrastructure (manual verification is sufficient given demo deadline)

---

## Sources

### Primary (HIGH confidence)
- Direct inspection: `components/grounding/answer-message.tsx` — full paragraph rendering logic
- Direct inspection: `components/grounding/grounded-answer.tsx` — component hierarchy
- Direct inspection: `app/api/ask/route.ts` — SYSTEM prompt, extractFollowUps pattern, maxOutputTokens
- Direct inspection: `components/ask/ask-experience.tsx` — AssistantMessage type, done event handler, rendering order
- Direct inspection: `components/grounding/inline-authority-badge.tsx` — badge API surface
- Direct inspection: `components/grounding/source-meta.ts` — corpus colors and chip classes
- Direct inspection: `app/globals.css` — OKLch theme tokens, Tailwind v4 setup

### Secondary (MEDIUM confidence)
- GFM pipe table spec: separator row pattern `|---|---|` is unambiguous — standard across all GFM implementations

### Tertiary (LOW confidence)
- None

---

## Project Constraints (from CLAUDE.md)

From `AGENTS.md` (referenced by project `CLAUDE.md`):
- **Next.js has breaking changes** — read `node_modules/next/dist/docs/` before writing route/page code
- Functional components with hooks; no class components
- Zustand for global state (not Context)
- MUI components for UI — **this project uses shadcn/ui + Tailwind, not MUI** (shadcn is what's installed)
- API calls in dedicated client layer
- No `any` without justification
- `lib/retrieval/*` is FROZEN — do not modify

From global `CLAUDE.md`:
- Simplicity first — minimum code that solves the problem
- Surgical changes — touch only what you must
- A360 brand palette only (slate/blue/ice/white — NO Heidi yellow/sand)
- Clone Heidi UX patterns, not visual identity

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — confirmed by direct file inspection, no new dependencies
- Architecture: HIGH — all patterns derived from existing code; no guesswork
- Pitfalls: HIGH — derived from actual code structure (streaming order, token budget, regex edge cases)

**Research date:** 2026-06-13
**Valid until:** 2026-07-13 (stable codebase; would only change if route.ts or answer-message.tsx is modified)
