"use client";

import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import type { PodcastShow } from "@/lib/podcast/types";
import { PodcastCard } from "./podcast-card";

interface Props {
  shows: PodcastShow[];
}

const CATEGORIES = ["Clinical", "Business", "Both"];
const PAGE = 24;

export function PodcastExplore({ shows }: Props) {
  const [selCategories, setSelCategories] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const toggle = (cat: string) => {
    setSelCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
    setLimit(PAGE);
  };

  const activeCount = selCategories.size + (query ? 1 : 0);

  const clearAll = () => {
    setSelCategories(new Set());
    setQuery("");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shows.filter((s) => {
      if (selCategories.size > 0 && (!s.category || !selCategories.has(s.category)))
        return false;
      if (q) {
        const haystack = `${s.name} ${s.host ?? ""} ${s.description ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [shows, selCategories, query]);

  const visible = filtered.slice(0, limit);

  return (
    <div className="flex gap-6">
      {/* Sidebar filters */}
      <div className="hidden w-60 shrink-0 lg:block">
        <div className="sticky top-20 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </h3>
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-[11px] font-medium text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Category filter */}
          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Category
            </h4>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggle(cat)}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                    selCategories.has(cat)
                      ? "bg-primary/15 font-semibold text-primary"
                      : "text-neutral-300 hover:bg-white/5"
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-neutral-500">
                    {shows.filter((s) => s.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Episode count distribution */}
          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Top Shows
            </h4>
            <div className="space-y-1">
              {shows.slice(0, 8).map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between text-[11px]"
                >
                  <span className="truncate text-neutral-400">{s.name}</span>
                  <span className="ml-2 shrink-0 text-neutral-500">
                    {s.episode_count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        {/* Search + active filters */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE);
              }}
              placeholder="Search shows by name, host, or description…"
              className="w-full rounded-xl border border-white/10 bg-neutral-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/30"
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

          {/* Active filter pills (mobile categories) */}
          {activeCount > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {Array.from(selCategories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggle(cat)}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {cat}
                  <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="mb-4 text-xs text-neutral-500">
          {filtered.length} show{filtered.length !== 1 ? "s" : ""}
          {activeCount > 0 ? " match" : ""}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((show) => (
            <PodcastCard key={show.id} show={show} />
          ))}
        </div>

        {visible.length < filtered.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setLimit((n) => n + PAGE)}
              className="rounded-lg border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/10"
            >
              Show more ({filtered.length - visible.length} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
