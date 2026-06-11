"use client";

import { useMemo } from "react";
import { BookOpen } from "lucide-react";
import type { RetrievedSource, ResearchCitation } from "@/lib/types/retrieval";
import { resolveCitations } from "@/lib/retrieval/post-process";
import { AnswerMessage } from "./answer-message";
import { CitationCard } from "./citation-card";

/**
 * Renders any grounded LLM output — text with [src_N] markers + its source set —
 * as an answer with inline citation badges plus resolved reference cards.
 *
 * Shared by the Research chat AND prompt outputs (a prompt run against a
 * transcript can return the same { text, sources } shape).
 *
 * - Static use (prompt output / one-shot): pass `sources`; citations resolve here.
 * - Controlled use (streaming chat): pass progressively-updated `citations` +
 *   `displayMap` so the post-processor isn't re-run on every token.
 */
interface GroundedAnswerProps {
  text: string;
  sources?: RetrievedSource[];
  citations?: ResearchCitation[];
  displayMap?: Record<string, number>;
  showReferences?: boolean;
}

export function GroundedAnswer({
  text,
  sources,
  citations,
  displayMap,
  showReferences = true,
}: GroundedAnswerProps) {
  const resolved = useMemo(() => {
    if (citations && displayMap) return { citations, displayMap };
    if (sources) return resolveCitations(text, sources);
    return { citations: [] as ResearchCitation[], displayMap: {} };
  }, [text, sources, citations, displayMap]);

  return (
    <div className="space-y-4">
      <AnswerMessage
        text={text}
        displayMap={resolved.displayMap}
        citations={resolved.citations}
      />

      {showReferences && resolved.citations.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BookOpen className="h-4 w-4" />
            References ({resolved.citations.length})
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {resolved.citations.map((c) => (
              <CitationCard key={c.number} citation={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
