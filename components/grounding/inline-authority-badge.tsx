"use client";

import type { Corpus } from "@/lib/types/retrieval";
import { CORPUS_META } from "./source-meta";

interface InlineAuthorityBadgeProps {
  /** Primary corpus for this claim group. */
  corpus: Corpus;
  /** Display numbers of all citations in this group (e.g. [1, 2]). */
  numbers: number[];
  /** Site attribution override for industry sources (extracted from locator host). */
  siteAttribution?: string;
  onClick?: (number: number) => void;
}

/**
 * Inline authority badge shown after claims — e.g. "U.S. Food and Drug Administration (FDA) +1".
 * Groups consecutive [src_N] markers into a single badge with a "+N" overflow count.
 */
export function InlineAuthorityBadge({
  corpus,
  numbers,
  siteAttribution,
  onClick,
}: InlineAuthorityBadgeProps) {
  const meta = CORPUS_META[corpus];
  const Icon = meta.Icon;
  const label =
    corpus === "industry" && siteAttribution ? siteAttribution : meta.longName;
  const extra = numbers.length - 1;

  return (
    <button
      type="button"
      onClick={() => {
        const n = numbers[0];
        if (n != null) {
          onClick?.(n);
          document
            .getElementById(`cite-${n}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }}
      className={`mx-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 align-baseline text-[0.7em] font-medium transition-colors hover:opacity-80 ${meta.chip}`}
    >
      <Icon className="h-3 w-3" />
      <span>{label}</span>
      {extra > 0 && (
        <span className="font-semibold">+{extra}</span>
      )}
    </button>
  );
}
