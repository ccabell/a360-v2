"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Play,
  Layers,
  Film,
  Loader2,
  X,
  Sparkles,
} from "lucide-react";
import { TOPIC_BY_ID } from "@/lib/academy/taxonomy";
import { CATEGORY_STYLES } from "@/components/academy/icons";
import type { Topic, VideoSummary } from "@/lib/academy/types";

interface SegmentHit {
  slug: string;
  videoTitle: string;
  start: number;
  snippet: string;
  text: string;
  score: number;
  topics: string[];
  primaryModule: string;
}

interface Results {
  query: string;
  terms: string[];
  segments: SegmentHit[];
  topics: Topic[];
  videos: VideoSummary[];
  total: number;
}

const SUGGESTED = [
  "vascular occlusion",
  "hyaluronidase dissolving",
  "masseter botox",
  "tear trough danger",
  "lip filler technique",
  "facial artery anatomy",
];

function fmt(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Render snippet HTML (server-built <mark> highlights are safe, no user HTML). */
function Snippet({ html }: { html: string }) {
  return (
    <span
      className="[&_mark]:rounded [&_mark]:bg-primary/20 [&_mark]:px-0.5 [&_mark]:py-px [&_mark]:font-medium [&_mark]:text-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function SearchClient() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";

  const [query, setQuery] = useState(initial);
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const runSearch = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setResults(null);
      setLoading(false);
      return;
    }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/academy/search?q=${encodeURIComponent(trimmed)}`,
        { signal: ctrl.signal }
      );
      if (!res.ok) throw new Error("search failed");
      const data = (await res.json()) as Results;
      setResults(data);
    } catch (err) {
      if ((err as Error).name !== "AbortError") setResults(null);
    } finally {
      if (!ctrl.signal.aborted) setLoading(false);
    }
  }, []);

  // Run on mount if a query was in the URL. Deferred to a microtask so the
  // first state update happens after the initial render commits (avoids the
  // synchronous-setState-in-effect cascade).
  useEffect(() => {
    if (!initial) return;
    const id = setTimeout(() => runSearch(initial), 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced live search + URL sync as the user types.
  const onChange = (val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const url = val.trim()
        ? `/dashboard/academy/search?q=${encodeURIComponent(val.trim())}`
        : "/dashboard/academy/search";
      router.replace(url, { scroll: false });
      runSearch(val);
    }, 250);
  };

  const clear = () => {
    setQuery("");
    setResults(null);
    router.replace("/dashboard/academy/search", { scroll: false });
    inputRef.current?.focus();
  };

  const hasResults =
    results &&
    (results.segments.length > 0 ||
      results.topics.length > 0 ||
      results.videos.length > 0);

  return (
    <div>
      {/* Search box */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          autoFocus
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search transcripts — e.g. 'what to do if you hit an artery'"
          className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-12 text-base text-foreground shadow-sm outline-none ring-primary/30 transition-shadow placeholder:text-muted-foreground focus:ring-2"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : query ? (
            <button
              onClick={clear}
              aria-label="Clear search"
              className="rounded-md p-1 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Suggested searches (empty state) */}
      {!results && !loading && (
        <div className="mt-8">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Try searching for
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  router.replace(
                    `/dashboard/academy/search?q=${encodeURIComponent(s)}`,
                    { scroll: false }
                  );
                  runSearch(s);
                }}
                className="rounded-full bg-card px-3.5 py-1.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-colors hover:bg-primary/10 hover:text-primary hover:ring-primary/30"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="mt-6">
          {!hasResults ? (
            <div className="rounded-xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-3 font-medium text-foreground">
                No matches for &ldquo;{results.query}&rdquo;
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a clinical term like &ldquo;necrosis&rdquo;,
                &ldquo;ptosis&rdquo; or &ldquo;cannula&rdquo;.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                {results.total.toLocaleString()} moment
                {results.total === 1 ? "" : "s"} match{" "}
                <span className="font-medium text-foreground">
                  {results.terms.join(" + ")}
                </span>
                {results.segments.length < results.total &&
                  ` · showing top ${results.segments.length}`}
              </p>

              {/* Topic + video quick links */}
              {(results.topics.length > 0 || results.videos.length > 0) && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {results.topics.length > 0 && (
                    <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <Layers className="h-3.5 w-3.5" />
                        Reference topics
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {results.topics.map((t) => {
                          const cat = CATEGORY_STYLES[t.category];
                          return (
                            <Link
                              key={t.id}
                              href={`/dashboard/academy/reference/${t.id}`}
                              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${cat.bg} ${cat.text} transition-opacity hover:opacity-80`}
                            >
                              {t.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {results.videos.length > 0 && (
                    <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <Film className="h-3.5 w-3.5" />
                        Matching lessons
                      </p>
                      <div className="mt-2.5 flex flex-col gap-1.5">
                        {results.videos.map((v) => (
                          <Link
                            key={v.slug}
                            href={`/dashboard/academy/lesson/${v.slug}`}
                            className="truncate text-sm text-foreground hover:text-primary hover:underline"
                          >
                            {v.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Segment moments */}
              <div className="mt-5 space-y-2.5">
                {results.segments.map((hit, i) => {
                  const cat =
                    CATEGORY_STYLES[
                      TOPIC_BY_ID.get(hit.topics[0] ?? "")?.category ??
                        "technique"
                    ];
                  return (
                    <Link
                      key={`${hit.slug}-${hit.start}-${i}`}
                      href={`/dashboard/academy/lesson/${hit.slug}?t=${hit.start}`}
                      className="group block rounded-xl bg-card p-4 ring-1 ring-foreground/10 transition-all hover:ring-primary/40 hover:shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs font-semibold ${cat.bg} ${cat.text}`}
                        >
                          <Play className="h-3 w-3 fill-current" />
                          {fmt(hit.start)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                            {hit.videoTitle}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            <Snippet html={hit.snippet} />
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
