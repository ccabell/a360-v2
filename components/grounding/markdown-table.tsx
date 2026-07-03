"use client";

import type { ResearchCitation } from "@/lib/types/retrieval";
import { parseCitationSegments, type ResolvedRef } from "./citation-segments";

interface MarkdownTableProps {
  raw: string;
  resolve: (id: string) => ResolvedRef | null;
  byNumber: Map<number, ResearchCitation>;
  citations: ResearchCitation[];
  complete?: boolean;
}

/** Strips leading/trailing pipes, splits on `|`, trims each cell. */
function parseRow(line: string): string[] {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

/**
 * Renders a GFM pipe table string as an accessible HTML table with per-cell
 * inline citation badges. Wrapped in an overflow-x-auto container so the
 * table scrolls horizontally on narrow viewports (ANS-04) without breaking
 * page layout.
 */
export function MarkdownTable({ raw, resolve, byNumber, citations, complete }: MarkdownTableProps) {
  const lines = raw.split("\n").filter((l) => l.trim().length > 0);

  if (lines.length < 3) {
    // Malformed table — fall back to raw text
    return <p className="text-sm text-foreground">{raw}</p>;
  }

  const headerCells = parseRow(lines[0]);
  // lines[1] is the separator row (e.g. |---|---|) — skip it
  const dataRows = lines.slice(2).map(parseRow);

  return (
    <div className="overflow-x-auto my-3">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {headerCells.map((cell, ci) => (
              <th
                key={ci}
                className="px-3 py-2 text-left font-semibold text-foreground"
              >
                {parseCitationSegments(cell, resolve, byNumber, citations, complete)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-border last:border-0 odd:bg-background even:bg-muted/20"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-3 py-2 align-top text-foreground/90"
                >
                  {parseCitationSegments(cell, resolve, byNumber, citations, complete)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
