"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ListIcon } from "lucide-react";
import type { RetrievedSource, ResearchCitation } from "@/lib/types/retrieval";
import { resolveCitations } from "@/lib/retrieval/post-process";
import { CORPUS_META } from "./source-meta";
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
  /** Default expanded state. Public = true, embed = false. */
  defaultRefsExpanded?: boolean;
  /**
   * True once citation resolution is final (stream done / one-shot output).
   * Unresolved [src_N] markers are then dropped instead of shown as pending.
   * Defaults to true for static use (sources passed); pass explicitly when streaming.
   */
  complete?: boolean;
}

export function GroundedAnswer({
  text,
  sources,
  citations,
  displayMap,
  showReferences = true,
  defaultRefsExpanded = true,
  complete,
}: GroundedAnswerProps) {
  const resolved = useMemo(() => {
    if (citations && displayMap) return { citations, displayMap };
    if (sources) return resolveCitations(text, sources);
    return { citations: [] as ResearchCitation[], displayMap: {} };
  }, [text, sources, citations, displayMap]);

  const [refsExpanded, setRefsExpanded] = useState(defaultRefsExpanded);

  return (
    <div className="space-y-4">
      <AnswerMessage
        text={text}
        displayMap={resolved.displayMap}
        citations={resolved.citations}
        complete={complete ?? sources != null}
      />

      {showReferences && resolved.citations.length > 0 && (
        <div className="border-t border-border pt-4">
          <button
            type="button"
            onClick={() => setRefsExpanded((v) => !v)}
            className="flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-foreground/80"
          >
            <ListIcon className="h-4 w-4" />
            {resolved.citations.length} cited
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                refsExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {refsExpanded && (
            <div className="mt-3 space-y-3">
              {resolved.citations.map((c) => {
                const meta = CORPUS_META[c.corpus];
                return (
                  <div key={c.number} className="flex items-start gap-3">
                    {/* Numbered index */}
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                      {c.number}
                    </span>
                    {/* Type tag */}
                    <span
                      className={`mt-1 shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-medium ${meta.chip}`}
                    >
                      {meta.typeTag}
                    </span>
                    {/* Card */}
                    <div className="min-w-0 flex-1">
                      <CitationCard citation={c} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
