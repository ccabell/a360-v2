"use client";

import type { Corpus } from "@/lib/types/retrieval";

interface InlineCitationProps {
  number: number;
  title?: string;
  corpus?: Corpus;
}

/** Resolved citation badge — [1] inline, click scrolls to the source card. */
export function InlineCitation({ number, title }: InlineCitationProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={() => {
        document
          .getElementById(`cite-${number}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className="mx-0.5 inline-flex items-center rounded bg-primary/10 px-1.5 align-baseline text-[0.7em] font-semibold leading-tight text-primary transition-colors hover:bg-primary/20"
    >
      {number}
    </button>
  );
}

/** Pending placeholder shown while tokens stream before citations resolve (§12). */
export function PendingCitation() {
  return (
    <span className="mx-0.5 inline-flex h-3 w-3 animate-pulse items-center justify-center rounded-full bg-muted align-baseline text-muted-foreground">
      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
    </span>
  );
}
