import type { ResearchCitation } from "@/lib/types/retrieval";
import { InlineAuthorityBadge } from "./inline-authority-badge";
import { CitationHoverCard } from "./citation-hover-card";
import { PendingCitation } from "./inline-citation";

interface AnswerMessageProps {
  text: string;
  displayMap?: Record<string, number>; // retrievalId -> display number
  citations?: ResearchCitation[];
}

interface ResolvedRef {
  number: number;
  corpus: ResearchCitation["corpus"];
  siteAttribution?: string;
}

/**
 * Renders streamed answer text. Consecutive [src_N] markers are grouped into a
 * single InlineAuthorityBadge (e.g. "(FDA) +1"). Unresolved markers show a
 * pending spinner. Section headings (lines starting with **…**) render as <h4>.
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
            <h4 key={pi} className="text-sm font-semibold text-foreground pt-1">
              {headingMatch[1]}
            </h4>
          );
        }

        const parts = para.split(/(\[src_\d+\])/);
        const elements: React.ReactNode[] = [];
        let i = 0;

        while (i < parts.length) {
          const part = parts[i];
          const m = part.match(/^\[(src_\d+)\]$/);

          if (!m) {
            // Render inline bold (**text**) within prose
            const boldParts = part.split(/(\*\*[^*]+\*\*)/);
            elements.push(
              <span key={`t-${i}`}>
                {boldParts.map((bp, bi) => {
                  const bm = bp.match(/^\*\*(.+)\*\*$/);
                  return bm ? (
                    <strong key={bi}>{bm[1]}</strong>
                  ) : (
                    <span key={bi}>{bp}</span>
                  );
                })}
              </span>
            );
            i++;
            continue;
          }

          // Collect consecutive [src_N] markers
          const group: string[] = [m[1]];
          let j = i + 1;
          while (j < parts.length) {
            const next = parts[j];
            // Skip whitespace-only gaps between consecutive markers
            if (/^\s*$/.test(next)) {
              j++;
              continue;
            }
            const nm = next.match(/^\[(src_\d+)\]$/);
            if (nm) {
              group.push(nm[1]);
              j++;
            } else {
              break;
            }
          }

          // Resolve group
          const refs = group.map(resolve);
          const anyPending = refs.some((r) => r === null);

          if (anyPending) {
            elements.push(<PendingCitation key={`p-${i}`} />);
          } else {
            const resolved = refs as ResolvedRef[];
            // Group by corpus for authority badges
            const corpusGroups: { corpus: ResolvedRef["corpus"]; numbers: number[]; siteAttribution?: string }[] = [];
            for (const ref of resolved) {
              const last = corpusGroups[corpusGroups.length - 1];
              if (last && last.corpus === ref.corpus) {
                last.numbers.push(ref.number);
              } else {
                corpusGroups.push({
                  corpus: ref.corpus,
                  numbers: [ref.number],
                  siteAttribution: ref.siteAttribution,
                });
              }
            }
            elements.push(
              ...corpusGroups.map((g, gi) => {
                const groupCitations = g.numbers
                  .map((n) => byNumber.get(n))
                  .filter((c): c is ResearchCitation => c != null);
                return (
                  <CitationHoverCard key={`b-${i}-${gi}`} citations={groupCitations}>
                    <InlineAuthorityBadge
                      corpus={g.corpus}
                      numbers={g.numbers}
                      siteAttribution={g.siteAttribution}
                    />
                  </CitationHoverCard>
                );
              }),
            );
          }

          i = j;
        }

        return <p key={pi}>{elements}</p>;
      })}
    </div>
  );
}
