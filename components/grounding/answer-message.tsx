import type { ResearchCitation } from "@/lib/types/retrieval";
import { parseCitationSegments, type ResolvedRef } from "./citation-segments";
import { MarkdownTable } from "./markdown-table";

interface AnswerMessageProps {
  text: string;
  displayMap?: Record<string, number>; // retrievalId -> display number
  citations?: ResearchCitation[];
}

/**
 * Renders streamed answer text. Consecutive [src_N] markers are grouped into a
 * single InlineAuthorityBadge (e.g. "(FDA) +1"). Unresolved markers show a
 * pending spinner. Section headings (lines starting with **…**) render as h3
 * with a left border accent.
 */
export function AnswerMessage({ text, displayMap, citations }: AnswerMessageProps) {
  const byNumber = new Map((citations ?? []).map((c) => [c.number, c]));
  const paragraphs = text.split(/\n\n+/);

  /** Resolve a src_N id into a display ref (or null if still pending). */
  function resolve(id: string): ResolvedRef | null {
    const number = displayMap?.[id];
    if (number == null) return null;
    const cite = byNumber.get(number);
    if (!cite) return { number, corpus: "practice" };

    // Site attribution for industry sources — extract host from locator url
    let siteAttribution: string | undefined;
    if (cite.corpus === "industry" && cite.locator.type === "industry" && cite.locator.url) {
      try {
        siteAttribution = new URL(cite.locator.url).hostname.replace(/^www\./, "");
      } catch {
        // fall through
      }
    }
    return { number, corpus: cite.corpus, siteAttribution };
  }

  return (
    <div className="space-y-3 text-sm leading-relaxed text-foreground">
      {paragraphs.map((para, pi) => {
        const trimmed = para.trim();

        // Section heading: a line that is entirely bold markdown (**Heading**)
        const headingMatch = trimmed.match(/^\*\*(.+?)\*\*$/);
        if (headingMatch && !trimmed.includes("[src_")) {
          return (
            <h3 key={pi} className="mt-4 mb-1 border-l-2 border-primary pl-3 text-base font-semibold text-foreground">
              {headingMatch[1]}
            </h3>
          );
        }

        // Table detection: requires header row + separator row (no false positives)
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

        return (
          <p key={pi}>
            {parseCitationSegments(para, resolve, byNumber, citations ?? [])}
          </p>
        );
      })}
    </div>
  );
}
