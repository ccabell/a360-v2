"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Compass,
  Search,
  X,
  Tags,
  ScanFace,
  HeartPulse,
  ChevronRight,
} from "lucide-react";
import type { VideoSummary, TopicCategory } from "@/lib/academy/types";
import type { AreaDef, ConcernDef } from "@/lib/academy/explore";
import { CATEGORY_STYLES } from "@/components/academy/icons";
import { LessonCard } from "@/components/academy/lesson-card";

interface TopicLite {
  id: string;
  title: string;
  category: TopicCategory;
}
interface Props {
  videos: VideoSummary[];
  topics: TopicLite[];
  areas: AreaDef[];
  concerns: ConcernDef[];
}

type Lens = "topic" | "area" | "concern";
interface Selection {
  kind: Lens;
  id: string;
  label: string;
  topics: string[];
}

const LENSES: { id: Lens; label: string; icon: React.ElementType }[] = [
  { id: "topic", label: "By topic", icon: Tags },
  { id: "area", label: "By facial area", icon: ScanFace },
  { id: "concern", label: "By concern", icon: HeartPulse },
];

const CATEGORY_ORDER: TopicCategory[] = [
  "safety",
  "complications",
  "anatomy",
  "regional",
  "toxin",
  "technique",
  "patient",
  "business",
  "wellness",
];

export function ExploreClient({ videos, topics, areas, concerns }: Props) {
  const [lens, setLens] = useState<Lens>("topic");
  const [sel, setSel] = useState<Selection | null>(null);
  const [query, setQuery] = useState("");

  const topicsByCat = useMemo(() => {
    const map = new Map<TopicCategory, TopicLite[]>();
    for (const t of topics) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t);
    }
    return map;
  }, [topics]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = videos;
    if (sel) list = list.filter((v) => v.topics.some((t) => sel.topics.includes(t)));
    if (q)
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.excerpt.toLowerCase().includes(q),
      );
    return [...list].sort((a, b) => b.segmentCount - a.segmentCount);
  }, [videos, sel, query]);

  const pick = (s: Selection | null) => setSel((cur) => (cur?.id === s?.id && cur?.kind === s?.kind ? null : s));

  return (
    <div className="min-h-full bg-neutral-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-8 pt-8 pb-5">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Compass className="h-4 w-4" />
            Explore the channel
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Find exactly what you need.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-400">
            Browse {videos.length} videos by clinical topic, by facial area, or
            by the patient concern you&rsquo;re treating.
          </p>

          {/* Lens tabs */}
          <div className="mt-5 flex flex-wrap gap-2">
            {LENSES.map((l) => {
              const Icon = l.icon;
              const active = lens === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => {
                    setLens(l.id);
                    setSel(null);
                  }}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/5 text-neutral-300 ring-1 ring-white/10 hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 py-6">
        {/* Lens picker */}
        <div className="rounded-2xl bg-neutral-900/60 p-5 ring-1 ring-white/10">
          {lens === "topic" && (
            <div className="space-y-4">
              {CATEGORY_ORDER.filter((c) => topicsByCat.has(c)).map((cat) => {
                const cs = CATEGORY_STYLES[cat];
                return (
                  <div key={cat}>
                    <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      <span className={`h-2 w-2 rounded-full ${cs.dot}`} />
                      {cs.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {topicsByCat.get(cat)!.map((t) => {
                        const active = sel?.kind === "topic" && sel.id === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() =>
                              pick({ kind: "topic", id: t.id, label: t.title, topics: [t.id] })
                            }
                            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                              active
                                ? "bg-primary text-primary-foreground"
                                : "bg-white/5 text-neutral-200 ring-1 ring-white/10 hover:bg-white/10"
                            }`}
                          >
                            {t.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {lens === "area" && (
            <div className="grid items-center gap-6 sm:grid-cols-[300px_1fr]">
              <AnatomyMap
                areas={areas}
                activeId={sel?.kind === "area" ? sel.id : null}
                onPick={(a) => pick({ kind: "area", id: a.id, label: a.label, topics: a.topics })}
              />
              <div className="flex flex-wrap gap-1.5">
                {areas.map((a) => {
                  const active = sel?.kind === "area" && sel.id === a.id;
                  return (
                    <button
                      key={a.id}
                      onClick={() => pick({ kind: "area", id: a.id, label: a.label, topics: a.topics })}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/5 text-neutral-200 ring-1 ring-white/10 hover:bg-white/10"
                      }`}
                    >
                      {a.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {lens === "concern" && (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {concerns.map((c) => {
                const active = sel?.kind === "concern" && sel.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => pick({ kind: "concern", id: c.id, label: c.label, topics: c.topics })}
                    className={`group rounded-xl px-4 py-3 text-left transition-all ${
                      active
                        ? "bg-primary/15 ring-1 ring-primary/50"
                        : "bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                    }`}
                  >
                    <p className="flex items-center justify-between text-sm font-semibold text-white">
                      {c.label}
                      <ChevronRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5" />
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400">{c.blurb}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Search + active filter */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter these videos by title…"
              className="w-full rounded-lg border border-white/10 bg-neutral-900 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          {sel && (
            <button
              onClick={() => setSel(null)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary/15 px-3 py-2 text-sm font-medium text-primary ring-1 ring-primary/30 hover:bg-primary/25"
            >
              {sel.label}
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <span className="text-sm text-neutral-400">
            {filtered.length} video{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="mt-10 rounded-xl border border-dashed border-white/10 py-12 text-center text-sm text-neutral-400">
            No videos match. Clear the filter or try another lens.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.slice(0, 60).map((v) => (
              <LessonCard key={v.slug} video={v} />
            ))}
          </div>
        )}
        {filtered.length > 60 && (
          <p className="mt-5 text-center text-xs text-neutral-500">
            Showing the top 60 — narrow with a topic, area, concern or search.
          </p>
        )}
      </div>
    </div>
  );
}

/** Stylised, clickable front-face navigator. Zones map to AREAS by id. */
function AnatomyMap({
  areas,
  activeId,
  onPick,
}: {
  areas: AreaDef[];
  activeId: string | null;
  onPick: (a: AreaDef) => void;
}) {
  const byId = useMemo(() => new Map(areas.map((a) => [a.id, a])), [areas]);
  const zone = (id: string) => byId.get(id);

  const Z = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const a = zone(id);
    if (!a) return null;
    const active = activeId === id;
    return (
      <g
        role="button"
        tabIndex={0}
        onClick={() => onPick(a)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPick(a)}
        className="cursor-pointer outline-none transition-opacity hover:opacity-80 focus-visible:opacity-80"
        style={{
          fill: active ? "var(--color-primary)" : "rgba(255,255,255,0.06)",
          fillOpacity: active ? 0.45 : 1,
          stroke: active ? "var(--color-primary)" : "rgba(255,255,255,0.28)",
          strokeWidth: 1.5,
        }}
      >
        <title>{a.label}</title>
        {children}
      </g>
    );
  };

  return (
    <svg viewBox="0 0 260 320" className="mx-auto w-[260px] max-w-full select-none">
      {/* Face + neck silhouette */}
      <path
        d="M130 16 C 86 16 62 50 62 104 C 62 150 70 188 92 224 C 108 250 120 264 130 264 C 140 264 152 250 168 224 C 190 188 198 150 198 104 C 198 50 174 16 130 16 Z"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
      />
      <rect x="104" y="262" width="52" height="46" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" />

      {/* Zones (hover/active via inherited fill/stroke) */}
      <Z id="forehead"><ellipse cx="130" cy="64" rx="46" ry="24" /></Z>
      <Z id="temples"><g><ellipse cx="78" cy="80" rx="12" ry="20" /><ellipse cx="182" cy="80" rx="12" ry="20" /></g></Z>
      <Z id="brows"><rect x="96" y="92" width="68" height="12" rx="6" /></Z>
      <Z id="eyes"><g><ellipse cx="110" cy="114" rx="15" ry="9" /><ellipse cx="150" cy="114" rx="15" ry="9" /></g></Z>
      <Z id="nose"><path d="M130 122 L122 162 Q130 170 138 162 Z" /></Z>
      <Z id="cheeks"><g><ellipse cx="92" cy="150" rx="18" ry="20" /><ellipse cx="168" cy="150" rx="18" ry="20" /></g></Z>
      <Z id="nasolabial"><g><path d="M112 168 q-8 12 -10 24" fill="none" /><path d="M148 168 q8 12 10 24" fill="none" /></g></Z>
      <Z id="lips"><ellipse cx="130" cy="196" rx="22" ry="10" /></Z>
      <Z id="chin"><ellipse cx="130" cy="234" rx="20" ry="16" /></Z>
      <Z id="jawline"><g><path d="M74 176 q6 56 54 84" fill="none" /><path d="M186 176 q-6 56 -54 84" fill="none" /></g></Z>
      <Z id="neck"><rect x="106" y="270" width="48" height="34" rx="8" /></Z>

      <text x="130" y="14" textAnchor="middle" className="fill-neutral-500" style={{ fontSize: 9 }}>
        tap a region
      </text>
    </svg>
  );
}
