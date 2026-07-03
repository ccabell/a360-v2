"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Tag,
  Loader2,
} from "lucide-react";
import type { PodcastEpisode } from "@/lib/podcast/types";

interface Props {
  showId: string;
  initialEpisodes: PodcastEpisode[];
  initialTagsById: Record<string, { tag_type: string; tag_value: string }[]>;
  totalEpisodes: number;
}

const TAG_COLORS: Record<string, string> = {
  treatment: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
  topic: "bg-blue-500/15 text-blue-400 ring-blue-500/20",
  anatomy: "bg-rose-500/15 text-rose-400 ring-rose-500/20",
  product: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
  business: "bg-violet-500/15 text-violet-400 ring-violet-500/20",
  concern: "bg-cyan-500/15 text-cyan-400 ring-cyan-500/20",
};

function fmtDuration(sec: number | null) {
  if (!sec) return null;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

function fmtTag(v: string) {
  return v.replace(/_/g, " ");
}

/** Strip markdown heading prefix from summary. */
function cleanSummary(summary: string | null): string | null {
  if (!summary) return null;
  return summary.replace(/^#\s*summary\s*/i, "").trim();
}

export function ShowEpisodesClient({
  showId,
  initialEpisodes,
  initialTagsById,
  totalEpisodes,
}: Props) {
  const [episodes, setEpisodes] = useState(initialEpisodes);
  const [tagsById, setTagsById] = useState(initialTagsById);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(
    initialEpisodes.length >= totalEpisodes,
  );

  // Load more episodes from API
  const loadMore = useCallback(async () => {
    if (loading || allLoaded) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/podcast/shows/${showId}?limit=100&offset=${episodes.length}&tags=true`,
      );
      const data = await res.json();
      if (data.episodes?.length > 0) {
        setEpisodes((prev) => [...prev, ...data.episodes]);
        setTagsById((prev) => ({ ...prev, ...data.tagsById }));
        if (
          data.episodes.length < 100 ||
          episodes.length + data.episodes.length >= totalEpisodes
        ) {
          setAllLoaded(true);
        }
      } else {
        setAllLoaded(true);
      }
    } finally {
      setLoading(false);
    }
  }, [showId, episodes.length, totalEpisodes, loading, allLoaded]);

  // Collect all unique tags across loaded episodes
  const allTags = useMemo(() => {
    const counts = new Map<
      string,
      { tag_type: string; tag_value: string; count: number }
    >();
    for (const tags of Object.values(tagsById)) {
      for (const t of tags) {
        const key = `${t.tag_type}:${t.tag_value}`;
        const existing = counts.get(key);
        if (existing) existing.count++;
        else counts.set(key, { ...t, count: 1 });
      }
    }
    return Array.from(counts.values()).sort((a, b) => b.count - a.count);
  }, [tagsById]);

  const tagTypes = useMemo(
    () => [...new Set(allTags.map((t) => t.tag_type))].sort(),
    [allTags],
  );

  const visibleTags = useMemo(() => {
    const filtered = selectedType
      ? allTags.filter((t) => t.tag_type === selectedType)
      : allTags;
    return filtered.slice(0, 30);
  }, [allTags, selectedType]);

  const toggleTag = (key: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const activeCount = selectedTags.size + (query ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return episodes.filter((ep) => {
      if (q) {
        const haystack =
          `${ep.title} ${ep.summary ?? ""} ${ep.description ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (selectedTags.size > 0) {
        const epTags = tagsById[ep.id] ?? [];
        const epTagKeys = new Set(
          epTags.map((t) => `${t.tag_type}:${t.tag_value}`),
        );
        if (![...selectedTags].some((k) => epTagKeys.has(k))) return false;
      }
      return true;
    });
  }, [episodes, query, selectedTags, tagsById]);

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="shrink-0 font-heading text-lg font-bold text-white">
          Episodes ({filtered.length}
          {!allLoaded ? `/${totalEpisodes}` : ""})
        </h2>
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search episodes…"
            className="w-full rounded-lg border border-white/10 bg-neutral-950 py-2 pl-9 pr-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tag filters */}
      {tagTypes.length > 0 && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-neutral-500" />
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedType(null)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  !selectedType
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:bg-white/5"
                }`}
              >
                All
              </button>
              {tagTypes.map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setSelectedType(selectedType === type ? null : type)
                  }
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium capitalize transition-colors ${
                    selectedType === type
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:bg-white/5"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {activeCount > 0 && (
              <button
                onClick={() => {
                  setSelectedTags(new Set());
                  setQuery("");
                  setSelectedType(null);
                }}
                className="ml-auto text-[11px] font-medium text-primary hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((t) => {
              const key = `${t.tag_type}:${t.tag_value}`;
              const active = selectedTags.has(key);
              const colors =
                TAG_COLORS[t.tag_type] ??
                "bg-white/10 text-neutral-300 ring-white/10";
              return (
                <button
                  key={key}
                  onClick={() => toggleTag(key)}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium capitalize ring-1 transition-all ${
                    active
                      ? colors + " ring-2 scale-105"
                      : "bg-white/5 text-neutral-400 ring-white/10 hover:bg-white/10"
                  }`}
                >
                  {fmtTag(t.tag_value)}
                  {active && <X className="h-2.5 w-2.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Episode cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ep) => {
          const tags = tagsById[ep.id] ?? [];
          const summary = cleanSummary(ep.summary);
          const isExpanded = expandedId === ep.id;

          return (
            <div
              key={ep.id}
              className="group flex flex-col overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10 transition-all hover:ring-white/20"
            >
              <div className="flex flex-1 flex-col p-4">
                {/* Title */}
                <Link
                  href={`/podcast/episodes/${ep.id}`}
                  className="font-heading text-sm font-semibold leading-snug text-white transition-colors hover:text-primary"
                >
                  {ep.title}
                </Link>

                {/* Meta */}
                <div className="mt-2 flex items-center gap-3 text-[11px] text-neutral-500">
                  {ep.published_date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(ep.published_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  {ep.duration_seconds && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {fmtDuration(ep.duration_seconds)}
                    </span>
                  )}
                  {ep.is_vectorized && (
                    <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                      Searchable
                    </span>
                  )}
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {tags.slice(0, 5).map((t) => {
                      const colors =
                        TAG_COLORS[t.tag_type] ??
                        "bg-white/10 text-neutral-300 ring-white/10";
                      return (
                        <span
                          key={`${t.tag_type}:${t.tag_value}`}
                          className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium capitalize ring-1 ${colors}`}
                        >
                          {fmtTag(t.tag_value)}
                        </span>
                      );
                    })}
                    {tags.length > 5 && (
                      <span className="px-1 text-[10px] text-neutral-500">
                        +{tags.length - 5}
                      </span>
                    )}
                  </div>
                )}

                {/* Summary — 3 lines clamped, expandable */}
                {summary && (
                  <div className="mt-3">
                    <p
                      className={`text-xs leading-relaxed text-neutral-400 ${
                        !isExpanded ? "line-clamp-3" : ""
                      }`}
                    >
                      {summary}
                    </p>
                    {summary.length > 150 && (
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : ep.id)
                        }
                        className="mt-1 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline"
                      >
                        {isExpanded ? (
                          <>
                            Show less <ChevronUp className="h-3 w-3" />
                          </>
                        ) : (
                          <>
                            Read more <ChevronDown className="h-3 w-3" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Card footer */}
              <Link
                href={`/podcast/episodes/${ep.id}`}
                className="border-t border-white/5 px-4 py-2.5 text-center text-[11px] font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-primary"
              >
                View episode →
              </Link>
            </div>
          );
        })}
      </div>

      {/* Load more */}
      {!allLoaded && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading
              ? "Loading…"
              : `Load more episodes (${totalEpisodes - episodes.length} remaining)`}
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-500">
            No episodes match your filters.
          </p>
          <button
            onClick={() => {
              setSelectedTags(new Set());
              setQuery("");
            }}
            className="mt-2 text-xs font-medium text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
