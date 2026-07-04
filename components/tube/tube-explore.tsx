"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, Tv, ShieldCheck } from "lucide-react";
import type { TubeCardVideo, TubeFacets, FacetValue } from "@/lib/tube/types";
import { TubeCard } from "./tube-card";

interface Props {
  videos: TubeCardVideo[];
  facets: TubeFacets;
}

type GroupKey = "anatomy" | "concerns" | "treatments" | "channels" | "contentTypes";

const GROUPS: {
  key: GroupKey;
  title: string;
  /** Video field this facet filters on. */
  field: keyof TubeCardVideo;
  /** True if the video field is an array. */
  isArray: boolean;
  /** URL search param name for this group (differs from `key` for contentTypes). */
  param: string;
}[] = [
  { key: "anatomy", title: "Facial & body area", field: "anatomy", isArray: true, param: "anatomy" },
  { key: "concerns", title: "Concern", field: "concerns", isArray: true, param: "concerns" },
  { key: "treatments", title: "Treatment", field: "treatments", isArray: true, param: "treatments" },
  { key: "channels", title: "Channel", field: "channel", isArray: false, param: "channels" },
  { key: "contentTypes", title: "Type of video", field: "contentType", isArray: false, param: "types" },
];

const PAGE = 48;
const Q_DEBOUNCE_MS = 300;

type SortKey = "content" | "newest" | "oldest";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "content", label: "Most content" },
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
];

/** Videos without a publish date sort last under either date order. */
function compareBy(sort: SortKey) {
  return (a: TubeCardVideo, b: TubeCardVideo): number => {
    if (sort === "content") return b.chunkCount - a.chunkCount;
    if (!a.publishedAt && !b.publishedAt) return b.chunkCount - a.chunkCount;
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return sort === "newest"
      ? b.publishedAt.localeCompare(a.publishedAt)
      : a.publishedAt.localeCompare(b.publishedAt);
  };
}

function emptySel(): Record<GroupKey, Set<string>> {
  return {
    anatomy: new Set(),
    concerns: new Set(),
    treatments: new Set(),
    channels: new Set(),
    contentTypes: new Set(),
  };
}

function selFromParams(sp: URLSearchParams): Record<GroupKey, Set<string>> {
  const sel = emptySel();
  for (const g of GROUPS) {
    const raw = sp.get(g.param);
    if (raw) sel[g.key] = new Set(raw.split(",").filter(Boolean));
  }
  return sel;
}

export function TubeExplore({ videos, facets }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sel, setSel] = useState<Record<GroupKey, Set<string>>>(() => selFromParams(searchParams));
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [safeOnly, setSafeOnly] = useState(() => searchParams.get("safe") === "1");
  const [sort, setSort] = useState<SortKey>(() => {
    const raw = searchParams.get("sort");
    return SORTS.some((s) => s.key === raw) ? (raw as SortKey) : "content";
  });
  const [limit, setLimit] = useState(PAGE);

  const qDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (qDebounce.current) clearTimeout(qDebounce.current);
  }, []);

  /** Writes the given (or current) state to the URL without a scroll/navigation. */
  const writeUrl = (next: {
    sel?: Record<GroupKey, Set<string>>;
    query?: string;
    safeOnly?: boolean;
    sort?: SortKey;
  }) => {
    const s = next.sel ?? sel;
    const q = next.query ?? query;
    const safe = next.safeOnly ?? safeOnly;
    const so = next.sort ?? sort;
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    for (const g of GROUPS) {
      const values = [...s[g.key]];
      if (values.length) params.set(g.param, values.join(","));
    }
    if (safe) params.set("safe", "1");
    if (so !== "content") params.set("sort", so);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  };

  const toggle = (group: GroupKey, value: string) => {
    setSel((prev) => {
      const next = new Set(prev[group]);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      const nextSel = { ...prev, [group]: next };
      writeUrl({ sel: nextSel });
      return nextSel;
    });
    setLimit(PAGE);
  };

  const toggleSafeOnly = () => {
    setSafeOnly((prev) => {
      const next = !prev;
      writeUrl({ safeOnly: next });
      return next;
    });
    setLimit(PAGE);
  };

  const onQueryChange = (value: string) => {
    setQuery(value);
    setLimit(PAGE);
    if (qDebounce.current) clearTimeout(qDebounce.current);
    qDebounce.current = setTimeout(() => writeUrl({ query: value }), Q_DEBOUNCE_MS);
  };

  const onSortChange = (value: SortKey) => {
    setSort(value);
    setLimit(PAGE);
    writeUrl({ sort: value });
  };

  const clearAll = () => {
    if (qDebounce.current) clearTimeout(qDebounce.current);
    setSel(emptySel());
    setQuery("");
    setSafeOnly(false);
    // Sort is a view preference, not a filter — survives "Clear all".
    router.replace(sort !== "content" ? `?sort=${sort}` : "?", { scroll: false });
  };

  const activeCount = GROUPS.reduce((n, g) => n + sel[g.key].size, 0) + (safeOnly ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos
      .filter((v) => {
        if (safeOnly && !v.patientSafe) return false;
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
      .sort(compareBy(sort));
  }, [videos, sel, query, safeOnly, sort]);

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
        <button
          onClick={toggleSafeOnly}
          aria-pressed={safeOnly}
          className={`mb-4 flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs font-medium transition-colors ${
            safeOnly
              ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
              : "text-neutral-300 ring-1 ring-white/10 hover:bg-white/5"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Patient-safe only
        </button>
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
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search 2,548 videos by title or summary…"
            aria-label="Search videos by title or summary"
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
          <span className="ml-auto flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs text-neutral-400">
              Sort
              <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value as SortKey)}
                aria-label="Sort videos"
                className="rounded-md border border-white/10 bg-neutral-900 px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/40"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <span className="text-sm text-neutral-400">
              {filtered.length.toLocaleString()} video{filtered.length === 1 ? "" : "s"}
            </span>
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
  const [filter, setFilter] = useState("");
  const showFilterInput = expanded && values.length > 8;
  const visible = showFilterInput && filter.trim()
    ? values.filter((f) => f.label.toLowerCase().includes(filter.trim().toLowerCase()))
    : values;
  const shown = expanded ? visible : visible.slice(0, 8);

  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-neutral-300">{title}</p>
      {showFilterInput && (
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={`Filter ${title.toLowerCase()}…`}
          aria-label={`Filter ${title.toLowerCase()}`}
          className="mb-1.5 w-full rounded-md border border-white/10 bg-neutral-900 px-2 py-1 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
      )}
      <div className="flex flex-col gap-1">
        {shown.map((f) => {
          const active = selected.has(f.value);
          return (
            <button
              key={f.value}
              onClick={() => onToggle(f.value)}
              aria-pressed={active}
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
