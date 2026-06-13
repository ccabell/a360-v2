"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import type { ResearchCitation } from "@/lib/types/retrieval";
import { locatorUrl } from "@/lib/retrieval/locator";
import { CORPUS_META } from "./source-meta";

/** Worded confidence chip — never a percentage (compliance). */
function confidenceLabel(relevance?: number): {
  word: string;
  className: string;
} {
  if (relevance == null || relevance >= 0.8)
    return {
      word: "High",
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    };
  if (relevance >= 0.6)
    return {
      word: "Medium",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    };
  return {
    word: "Low",
    className:
      "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  };
}

interface CitationHoverCardProps {
  /** All citations in this badge group. */
  citations: ResearchCitation[];
  children: React.ReactNode;
}

/**
 * Hover popover over an inline authority badge.
 * Shows pager "{i} of {n}", title, excerpt, worded confidence chip,
 * eye → open locatorUrl, 👍/👎 → POST /api/ask/feedback.
 */
export function CitationHoverCard({
  citations,
  children,
}: CitationHoverCardProps) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLSpanElement>(null);

  const enter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), 300);
  }, []);

  const leave = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // Reset page when citations change
  useEffect(() => setPage(0), [citations]);

  if (citations.length === 0) return <>{children}</>;

  const cite = citations[Math.min(page, citations.length - 1)];
  const meta = CORPUS_META[cite.corpus];
  const conf = confidenceLabel(cite.relevance);
  const url = locatorUrl(cite.locator);

  async function sendFeedback(signal: "up" | "down") {
    try {
      await fetch("/api/ask/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          citationNumber: cite.number,
          retrievalId: cite.retrievalId,
          signal,
        }),
      });
    } catch {
      // best-effort
    }
  }

  return (
    <span
      ref={containerRef}
      className="relative inline"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 rounded-xl border border-border bg-card p-3 shadow-lg motion-reduce:transition-none animate-in fade-in-0 zoom-in-95"
        >
          {/* Pager */}
          <span className="mb-2 flex items-center justify-between text-[0.65rem] text-muted-foreground">
            <span>
              {page + 1} of {citations.length}
            </span>
            <span>
              {citations.length} source{citations.length !== 1 ? "s" : ""}
            </span>
          </span>

          {/* Navigation */}
          {citations.length > 1 && (
            <span className="mb-2 flex gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPage((p) => Math.max(0, p - 1));
                }}
                disabled={page === 0}
                className="rounded px-1.5 py-0.5 text-[0.65rem] text-muted-foreground hover:bg-muted disabled:opacity-40"
              >
                ‹ Prev
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPage((p) => Math.min(citations.length - 1, p + 1));
                }}
                disabled={page >= citations.length - 1}
                className="rounded px-1.5 py-0.5 text-[0.65rem] text-muted-foreground hover:bg-muted disabled:opacity-40"
              >
                Next ›
              </button>
            </span>
          )}

          {/* Corpus badge + confidence */}
          <span className="mb-1.5 flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[0.6rem] font-medium ${meta.chip}`}
            >
              <meta.Icon className="h-2.5 w-2.5" />
              {meta.label}
            </span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[0.6rem] font-medium ${conf.className}`}
            >
              {conf.word} confidence
            </span>
          </span>

          {/* Title */}
          <span className="mb-1 block text-xs font-medium text-foreground leading-snug">
            {cite.title}
          </span>

          {/* Evidence excerpt */}
          <span className="mb-2 block text-[0.65rem] italic text-muted-foreground leading-relaxed line-clamp-3">
            {cite.evidence}
          </span>

          {/* Actions */}
          <span className="flex items-center gap-2">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.65rem] text-primary hover:bg-primary/10"
              >
                <Eye className="h-3 w-3" />
                View
              </a>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sendFeedback("up");
              }}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              title="Helpful"
            >
              <ThumbsUp className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sendFeedback("down");
              }}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              title="Not helpful"
            >
              <ThumbsDown className="h-3 w-3" />
            </button>
          </span>
        </span>
      )}
    </span>
  );
}
