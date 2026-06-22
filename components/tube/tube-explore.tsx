"use client";

import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal, Tv } from "lucide-react";
import type { TubeVideo, TubeFacets, FacetValue } from "@/lib/tube/types";
import { TubeCard } from "./tube-card";

interface Props {
  videos: TubeVideo[];
  facets: TubeFacets;
}

type GroupKey = "anatomy" | "concerns" | "treatments" | "channels" | "contentTypes";

const GROUPS: {
  key: GroupKey;
  title: string;
  /** Video field this facet filters on. */
  field: keyof TubeVideo;
  /** True if the video field is an array. */
  isArray: boolean;
}[] = [
  { key: "anatomy", title: "Facial & body area", field: "anatomy", isArray: true },
  { key: "concerns", title: "Concern", field: "concerns", isArray: true },
  { key: "treatments", title: "Treatment", field: "treatments", isArray: true },
  { key: "channels", title: "Channel", field: "channel", isArray: false },
  { key: "contentTypes", title: "Type of video", field: "contentType", isArray: false },
];

const PAGE = 48;

export function TubeExplore({ videos, facets }: Props) {
  const [sel, setSel] = useState<Record<GroupKey, Set<string>>>({
    anatomy: new Set(),
    concerns: new Set(),
    treatments: new Set(),
    channels: new Set(),
    contentTypes: new Set(),
  });
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const toggle = (group: GroupKey, value: string) => {
    setSel((prev) => {
      const next = new Set(prev[group]);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...prev, [group]: next };
    });
    setLimit(PAGE);
  };

  const clearAll = () => {
    setSel({
      anatomy: new Set(),
      concerns: new Set(),
      treatments: new Set(),
      channels: new Set(),
      contentTypes: new Set(),
    });
    setQuery("");
  };

  const activeCount = GROUPS.reduce((n, g) => n + sel[g.key].size, 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos
      .filter((v) => {
        // AND across groups, OR within a group.
        for (const g of GROUPS) {
          const chosen = sel[g.key];
          if (chosen.size === 0) continue;
          if (g.isArray) {
            const arr = v[g.field] as string[];
            if (!arr.some((x) => chosen.has(x))) return false;
          } else {
            const val = v[g.field] as string | null;
            if (!val || !chosen.has(val)) return false;
          }
        }
        if (q && !(`${v.title} ${v.summary}`.toLowerCase().includes(q))) return false;
        return true;
      })
      .sort((a, b) => b.chunkCount - a.chunkCount);
  }, [videos, sel, query]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
      {/* Facet rail */}
      <aside className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:self-start lg:overflow-y-auto">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </span>
          {activeCount > 0 && (
            <button onClick={clearAll} className="text-xs text-primary hover:underline">
              Clear all
            </button>
          )}
        </div>
        <div className="space-y-5">
          {GROUPS.map((g) => (
            <FacetGroup
              key={g.key}
              title={g.title}
              values={facets[g.key]}
              selected={sel[g.key]}
              onToggle={(val) => toggle(g.key, val)}
            />
          ))}
        </div>
      </aside>

      {/* Results */}
      <div className="min-w-0">
        {/* Search + active pills */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE);
            }}
            placeholder="Search 2,548 videos by title or summary…"
            className="w-full rounded-xl border border-white/10 bg-neutral-900 py-3 pl-10 pr-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {GROUPS.flatMap((g) =>
            [...sel[g.key]].map((val) => (
              <button
                key={`${g.key}:${val}`}
                onClick={() => toggle(g.key, val)}
                className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium capitalize text-primary ring-1 ring-primary/30 hover:bg-primary/25"
              >
                {val.replace(/_/g, " ")}
                <X className="h-3 w-3" />
              </button>
            )),
          )}
          <span className="ml-auto text-sm text-neutral-400">
            {filtered.length.toLocaleString()} video{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="mt-12 rounded-xl border border-dashed border-white/10 py-12 text-center text-sm text-neutral-400">
            No videos match these filters. Try removing one.
          </p>
        ) : (
          <>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.slice(0, limit).map((v) => (
                <TubeCard key={v.id} video={v} />
              ))}
            </div>
            {filtered.length > limit && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setLimit((l) => l + PAGE)}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
                >
                  <Tv className="h-4 w-4" />
                  Load more ({filtered.length - limit} more)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FacetGroup({
  title,
  values,
  selected,
  onToggle,
}: {
  title: string;
  values: FacetValue[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? values.slice(0, 40) : values.slice(0, 8);

  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-neutral-300">{title}</p>
      <div className="flex flex-col gap-1">
        {shown.map((f) => {
          const active = selected.has(f.value);
          return (
            <button
              key={f.value}
              onClick={() => onToggle(f.value)}
              className={`flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                active
                  ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                  : "text-neutral-300 hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-1.5 capitalize">
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${
                    active ? "border-primary bg-primary" : "border-white/25"
                  }`}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-[1px] bg-primary-foreground" />}
                </span>
                {f.label.toLowerCase()}
              </span>
              <span className="shrink-0 text-[10px] text-neutral-500">{f.count}</span>
            </button>
          );
        })}
      </div>
      {values.length > 8 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-1.5 text-[11px] font-medium text-primary hover:underline"
        >
          {expanded ? "Show less" : `+ ${values.length - 8} more`}
        </button>
      )}
    </div>
  );
}
