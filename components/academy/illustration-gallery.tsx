"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORY_STYLES } from "@/components/academy/icons";
import { TOPIC_BY_ID } from "@/lib/academy/taxonomy";
import type { VideoIllustrations } from "@/lib/academy/types";

interface Facet {
  id: string;
  title: string;
  count: number;
}

interface FlatFrame {
  file: string;
  t: number;
  start: number;
  segmentIndex: number | null;
  videoId: string;
  slug: string | null;
  title: string;
  topics: string[];
  primaryModule: string;
}

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = String(Math.floor(sec % 60)).padStart(2, "0");
  return `${m}:${s}`;
}

export function IllustrationGallery({
  videos,
  facets,
}: {
  videos: VideoIllustrations[];
  facets: Facet[];
}) {
  const [active, setActive] = useState<string | null>(null); // topic filter
  const [lightbox, setLightbox] = useState<number | null>(null);

  const frames: FlatFrame[] = useMemo(
    () =>
      videos.flatMap((v) =>
        v.frames.map((f) => ({
          ...f,
          videoId: v.videoId,
          slug: v.slug,
          title: v.title,
          topics: v.topics,
          primaryModule: v.primaryModule,
        }))
      ),
    [videos]
  );

  const visible = useMemo(
    () => (active ? frames.filter((f) => f.topics.includes(active)) : frames),
    [frames, active]
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: number) =>
      setLightbox((cur) => {
        if (cur === null) return cur;
        const next = cur + dir;
        if (next < 0 || next >= visible.length) return cur;
        return next;
      }),
    [visible.length]
  );

  // Keyboard nav for the lightbox.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, step]);

  const lb = lightbox !== null ? visible[lightbox] : null;

  return (
    <div>
      {/* Topic filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive(null)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors ${
            active === null
              ? "bg-primary text-primary-foreground ring-primary"
              : "bg-card text-muted-foreground ring-foreground/10 hover:text-foreground"
          }`}
        >
          All ({frames.length})
        </button>
        {facets.map((f) => {
          const cat = CATEGORY_STYLES[TOPIC_BY_ID.get(f.id)?.category ?? "technique"];
          const on = active === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActive(on ? null : f.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors ${
                on
                  ? `${cat.bg} ${cat.text} ring-current`
                  : "bg-card text-muted-foreground ring-foreground/10 hover:text-foreground"
              }`}
            >
              {f.title} ({f.count})
            </button>
          );
        })}
      </div>

      {/* Masonry-ish grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((f, i) => (
          <button
            key={`${f.videoId}-${f.file}`}
            onClick={() => setLightbox(i)}
            className="group relative aspect-video overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10 transition-all hover:ring-primary/50 hover:shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f.file}
              alt={`${f.title} at ${fmt(f.start)}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
              <span className="truncate text-[11px] font-medium text-white/90">
                {f.title}
              </span>
              <span className="inline-flex shrink-0 items-center gap-0.5 rounded bg-black/50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white">
                {fmt(f.start)}
              </span>
            </div>
          </button>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          No frames tagged with that topic.
        </p>
      )}

      {/* Lightbox */}
      {lb && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {lightbox !== null && lightbox > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {lightbox !== null && lightbox < visible.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          <div
            className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-card ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lb.file}
              alt={`${lb.title} at ${fmt(lb.start)}`}
              className="min-h-0 w-full flex-1 bg-black object-contain"
            />
            <div className="flex items-center justify-between gap-4 border-t border-border p-4">
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-semibold text-foreground">
                  {lb.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs font-semibold text-primary">
                    {fmt(lb.start)}
                  </span>
                  {lb.topics.slice(0, 3).map((t) => {
                    const topic = TOPIC_BY_ID.get(t);
                    if (!topic) return null;
                    return (
                      <span
                        key={t}
                        className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {topic.title}
                      </span>
                    );
                  })}
                </div>
              </div>
              {lb.slug && (
                <Link
                  href={`/dashboard/academy/lesson/${lb.slug}?t=${lb.start}`}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Watch this moment
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
