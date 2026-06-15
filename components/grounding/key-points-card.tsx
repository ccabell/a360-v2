"use client";

import type { ResearchCitation } from "@/lib/types/retrieval";
import { parseCitationSegments, type ResolvedRef } from "./citation-segments";

interface KeyPointsCardProps {
  keyPoints: string[];
  displayMap: Record<string, number>;
  citations: ResearchCitation[];
}

/**
 * Summary card shown above the answer prose once streaming completes.
 * Renders 3-7 bulleted takeaways with inline authority badges per bullet.
 */
export function KeyPointsCard({ keyPoints, displayMap, citations }: KeyPointsCardProps) {
  const byNumber = new Map(citations.map((c) => [c.number, c]));

  function resolve(id: string): ResolvedRef | null {
    const number = displayMap[id];
    if (number == null) return null;
    const cite = byNumber.get(number);
    if (!cite) return { number, corpus: "practice" };
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

  if (keyPoints.length === 0) return null;

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
        Key Points
      </p>
      <ul className="space-y-1.5">
        {keyPoints.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              {parseCitationSegments(point, resolve, byNumber, citations)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
