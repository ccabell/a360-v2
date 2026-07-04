import type { RetrievedSource, ResearchCitation } from "@/lib/types/retrieval";
import { locatorTitle, locatorUrl } from "./locator";

const MARKER = /\[(src_\d+)\]/g;

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

/**
 * Truncate evidence text without cutting mid-sentence/mid-word.
 *
 * Prefers the last sentence boundary within `max` chars (if it keeps at least
 * 60% of the budget), otherwise falls back to the last word boundary, and
 * appends an ellipsis when anything was trimmed.
 */
function excerpt(text: string, max = 200): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sentenceEnd = Math.max(
    cut.lastIndexOf(". "),
    cut.lastIndexOf("! "),
    cut.lastIndexOf("? "),
  );
  if (sentenceEnd >= max * 0.6) return cut.slice(0, sentenceEnd + 1);
  const wordEnd = cut.lastIndexOf(" ");
  return `${(wordEnd > 0 ? cut.slice(0, wordEnd) : cut).trimEnd()}…`;
}

/**
 * Citation post-processor (§8). Pure + deterministic.
 *
 * 1. Parse [src_N] markers in order of first appearance.
 * 2. Validate: a marker survives only if it exists in the retrieval set.
 * 3. Renumber survivors to display numbers [1], [2], ...
 * 4. Resolve each to a ResearchCitation from the source locator.
 *
 * Returns the display citations plus the retrievalId -> displayNumber map the
 * renderer uses to swap [src_N] placeholders for numbered badges.
 */
export function resolveCitations(
  text: string,
  sources: RetrievedSource[],
): { citations: ResearchCitation[]; displayMap: Record<string, number> } {
  const byId = new Map(sources.map((s) => [s.retrievalId, s]));
  const displayMap: Record<string, number> = {};
  let next = 1;

  const re = new RegExp(MARKER);
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const id = m[1];
    if (!byId.has(id)) continue; // cited ⊄ retrieved → strip (logged as violation upstream)
    if (displayMap[id] === undefined) displayMap[id] = next++;
  }

  const citations: ResearchCitation[] = Object.entries(displayMap)
    .map(([retrievalId, number]) => {
      const s = byId.get(retrievalId)!;
      return {
        number,
        retrievalId,
        chunkRef: s.chunkRef,
        corpus: s.corpus,
        title: locatorTitle(s.locator),
        evidence: excerpt(s.text),
        url: locatorUrl(s.locator),
        relevance: clamp01(s.scores.reranked ?? s.scores.fused),
        locator: s.locator,
      };
    })
    .sort((a, b) => a.number - b.number);

  return { citations, displayMap };
}
