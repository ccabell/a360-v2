"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ChevronUp, ChevronDown, X } from "lucide-react";

/**
 * Split a raw transcript (one giant blob, no newlines) into readable
 * paragraphs of ~4 sentences each.
 */
function toParagraphs(text: string, sentencesPerParagraph = 4): string[] {
  // Sentence boundaries: ., ?, ! followed by whitespace and an upper-case /
  // quote start. Transcripts have clean punctuation, so this works well.
  const sentences = text
    .split(/(?<=[.?!])\s+(?=[A-Z"“'])/)
    .map((s) => s.trim())
    .filter(Boolean);

  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    paragraphs.push(sentences.slice(i, i + sentencesPerParagraph).join(" "));
  }
  return paragraphs;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type Segment = { text: string; matchIndex: number | null };

export default function TranscriptViewer({ text }: { text: string }) {
  return (
    <Suspense fallback={<TranscriptViewerInner text={text} initialQuery="" />}>
      <TranscriptViewerWithParams text={text} />
    </Suspense>
  );
}

/** Reads ?highlight= from the URL (arriving from transcript search). */
function TranscriptViewerWithParams({ text }: { text: string }) {
  const initialQuery = useSearchParams().get("highlight") ?? "";
  return <TranscriptViewerInner text={text} initialQuery={initialQuery} />;
}

function TranscriptViewerInner({
  text,
  initialQuery,
}: {
  text: string;
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef<HTMLElement | null>(null);

  const paragraphs = useMemo(() => toParagraphs(text), [text]);

  // Per-paragraph segments with globally numbered matches.
  const { segmented, totalMatches } = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) {
      return {
        segmented: paragraphs.map<Segment[]>((p) => [
          { text: p, matchIndex: null },
        ]),
        totalMatches: 0,
      };
    }
    const re = new RegExp(escapeRegExp(q), "gi");
    let matchCounter = 0;
    const segmented = paragraphs.map<Segment[]>((p) => {
      const segs: Segment[] = [];
      let last = 0;
      for (const m of p.matchAll(re)) {
        if (m.index! > last) segs.push({ text: p.slice(last, m.index), matchIndex: null });
        segs.push({ text: m[0], matchIndex: matchCounter++ });
        last = m.index! + m[0].length;
      }
      if (last < p.length) segs.push({ text: p.slice(last), matchIndex: null });
      return segs;
    });
    return { segmented, totalMatches: matchCounter };
  }, [paragraphs, query]);

  // Clamp + scroll the active match into view.
  useEffect(() => {
    if (current >= totalMatches) setCurrent(0);
  }, [totalMatches, current]);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [current, totalMatches]);

  const step = (dir: 1 | -1) => {
    if (totalMatches === 0) return;
    setCurrent((c) => (c + dir + totalMatches) % totalMatches);
  };

  return (
    <div>
      {/* Find bar */}
      {/* Site header is sticky h-14 z-30 — sit just below it. */}
      <div className="sticky top-16 z-20 mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-neutral-900/95 p-2 backdrop-blur">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrent(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                step(e.shiftKey ? -1 : 1);
              }
            }}
            placeholder="Find in transcript…"
            className="w-full rounded-lg border border-white/10 bg-white/5 py-1.5 pl-9 pr-8 text-sm text-white placeholder:text-neutral-500 focus:border-primary/50 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCurrent(0);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {query.trim().length >= 2 && (
          <>
            <span className="whitespace-nowrap text-xs tabular-nums text-neutral-400">
              {totalMatches === 0 ? "0 / 0" : `${current + 1} / ${totalMatches}`}
            </span>
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={totalMatches === 0}
              className="rounded-lg border border-white/10 p-1.5 text-neutral-300 hover:bg-white/10 disabled:opacity-40"
              aria-label="Previous match"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={totalMatches === 0}
              className="rounded-lg border border-white/10 p-1.5 text-neutral-300 hover:bg-white/10 disabled:opacity-40"
              aria-label="Next match"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Transcript */}
      <div className="mt-4 max-w-3xl space-y-4">
        {segmented.map((segs, pi) => (
          <p key={pi} className="text-[15px] leading-7 text-neutral-200">
            {segs.map((seg, si) =>
              seg.matchIndex === null ? (
                <span key={si}>{seg.text}</span>
              ) : (
                <mark
                  key={si}
                  ref={seg.matchIndex === current ? currentRef : undefined}
                  className={
                    seg.matchIndex === current
                      ? "rounded bg-primary px-0.5 font-semibold text-white"
                      : "rounded bg-primary/25 px-0.5 text-white"
                  }
                >
                  {seg.text}
                </mark>
              ),
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
