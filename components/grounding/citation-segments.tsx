"use client";

import type { ResearchCitation } from "@/lib/types/retrieval";
import { InlineAuthorityBadge } from "./inline-authority-badge";
import { CitationHoverCard } from "./citation-hover-card";
import { PendingCitation } from "./inline-citation";

export interface ResolvedRef {
  number: number;
  corpus: ResearchCitation["corpus"];
  siteAttribution?: string;
}

/**
 * Parses a text string containing [src_N] citation markers and returns React
 * nodes with inline authority badges for resolved citations and pending
 * spinners for unresolved ones.
 *
 * Consecutive [src_N] markers are grouped into a single InlineAuthorityBadge
 * per corpus. Inline **bold** markdown is also rendered.
 */
export function parseCitationSegments(
  text: string,
  resolve: (id: string) => ResolvedRef | null,
  byNumber: Map<number, ResearchCitation>,
  citations: ResearchCitation[],
): React.ReactNode[] {
  const parts = text.split(/(\[src_\d+\])/);
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
      const corpusGroups: {
        corpus: ResolvedRef["corpus"];
        numbers: number[];
        siteAttribution?: string;
      }[] = [];
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

  return elements;
}
