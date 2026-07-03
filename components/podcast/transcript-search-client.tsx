"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2, Mic, Calendar, Clock } from "lucide-react";
import type { TranscriptSearchResult } from "@/lib/podcast/search";

/** Render ts_headline output, turning <mark>…</mark> into highlighted spans. */
export function HighlightedSnippet({ text }: { text: string }) {
  const parts = text.split(/<mark>(.*?)<\/mark>/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="rounded bg-primary/25 px-0.5 font-semibold text-primary-foreground text-white"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function fmtDuration(sec: number | null) {
  if (!sec) return null;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m} min`;
}

export default function TranscriptSearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [input, setInput] = useState(initialQuery);
  const [results, setResults] = useState<TranscriptSearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState("");

  const runSearch = useCallback(async (q: string) => {
    const query = q.trim();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/podcast/search?q=${encodeURIComponent(query)}`,
      );
      const json = (await res.json()) as { results?: TranscriptSearchResult[] };
      setResults(json.results ?? []);
      setSearched(query);
    } catch {
      setResults([]);
      setSearched(query);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run initial search when arriving with ?q=
  useEffect(() => {
    if (initialQuery) void runSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    router.replace(`/podcast/search?q=${encodeURIComponent(q)}`, {
      scroll: false,
    });
    void runSearch(q);
  }

  return (
    <div>
      {/* Search box */}
      <form onSubmit={onSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'Search transcripts — e.g. "no-show policy", lip filler, memberships…'}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </button>
      </form>
      <p className="mt-2 text-xs text-neutral-500">
        Tip: use quotes for exact phrases, <code>-word</code> to exclude, and{" "}
        <code>or</code> between alternatives.
      </p>

      {/* Results */}
      {results !== null && !loading && (
        <p className="mt-6 text-sm text-neutral-400">
          {results.length === 0
            ? `No episodes mention “${searched}”.`
            : `${results.length} episode${results.length === 1 ? "" : "s"} mentioning “${searched}”`}
        </p>
      )}

      <div className="mt-4 space-y-4">
        {results?.map((r) => (
          <Link
            key={r.episodeId}
            href={`/podcast/episodes/${r.episodeId}?highlight=${encodeURIComponent(searched)}`}
            className="group flex gap-4 rounded-xl border border-white/10 bg-neutral-900 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
          >
            {r.showArtworkUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.showArtworkUrl}
                alt=""
                className="hidden h-16 w-16 shrink-0 rounded-lg sm:block"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                {r.showName && (
                  <span className="flex items-center gap-1 font-medium text-primary">
                    <Mic className="h-3 w-3" />
                    {r.showName}
                  </span>
                )}
                {r.publishedDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(r.publishedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
                {r.durationSeconds && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {fmtDuration(r.durationSeconds)}
                  </span>
                )}
                <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  {r.matchCount} match{r.matchCount === 1 ? "" : "es"}
                </span>
              </div>
              <h3 className="mt-1 font-heading text-base font-bold text-white group-hover:text-primary">
                {r.title}
              </h3>
              <div className="mt-2 space-y-1.5">
                {r.snippets.slice(0, 2).map((s, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-neutral-400"
                  >
                    …<HighlightedSnippet text={s.snippet} />…
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
