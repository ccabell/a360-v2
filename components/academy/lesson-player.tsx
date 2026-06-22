"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Film,
  ListTree,
  Quote,
  ExternalLink,
} from "lucide-react";
import type {
  Chapter,
  KeyPoint,
  TranscriptSegment,
} from "@/lib/academy/types";

interface LessonPlayerProps {
  title: string;
  youtubeId: string | null;
  segments: TranscriptSegment[];
  chapters: Chapter[];
  keyPoints: KeyPoint[];
  duration: number;
  /** Optional starting second (from a deep-link, e.g. ?t=124). */
  initialStart?: number;
}

function fmt(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Transcript-first lesson player.
 *
 * The corpus has no resolved YouTube id, so the source of truth is the cleaned,
 * timestamped transcript. A "playhead" tracks position; clicking any segment,
 * chapter or key-point seeks the playhead to that exact second and scrolls the
 * transcript there. When a real youtubeId exists, an embedded player is shown
 * and seeks reload the iframe at the chosen start. Pressing play advances the
 * playhead through the transcript in real time (reading-along mode).
 */
export function LessonPlayer({
  title,
  youtubeId,
  segments,
  chapters,
  keyPoints,
  duration,
  initialStart = 0,
}: LessonPlayerProps) {
  const [current, setCurrent] = useState(initialStart); // seconds
  const [playing, setPlaying] = useState(false);
  // Show the real video by default when we have a resolved id.
  const [embed, setEmbed] = useState(Boolean(youtubeId));
  // Only autoplay after a user gesture (seek/click) — browsers block unmuted
  // autoplay on load, which made it look like "the video doesn't play".
  const [hasInteracted, setHasInteracted] = useState(false);
  const [tab, setTab] = useState<"chapters" | "keypoints">("chapters");
  const transcriptRef = useRef<HTMLDivElement>(null);
  const activeSegRef = useRef<HTMLButtonElement>(null);
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    "Dr Tim Pearce " + title
  )}`;

  const activeIndex = useMemo(() => {
    // Last segment whose start <= current.
    let idx = 0;
    for (let i = 0; i < segments.length; i++) {
      if (segments[i].start <= current) idx = i;
      else break;
    }
    return idx;
  }, [current, segments]);

  const seek = useCallback(
    (sec: number) => {
      setCurrent(sec);
      if (youtubeId) {
        // Jump to the video and play at that second. The click is a user
        // gesture, so autoplay (even unmuted) is allowed. iframe reloads via
        // its key={current}. Transcript auto-scroll is handled by activeIndex.
        setHasInteracted(true);
        setEmbed(true);
      }
    },
    [youtubeId]
  );

  // Auto-scroll active segment into view within the transcript pane.
  useEffect(() => {
    const el = activeSegRef.current;
    const pane = transcriptRef.current;
    if (el && pane) {
      const elTop = el.offsetTop;
      const target = elTop - pane.clientHeight / 2 + el.clientHeight / 2;
      pane.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    }
  }, [activeIndex]);

  // Reading-along clock: advance playhead in real time when "playing".
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setCurrent((c) => {
        const next = c + 1;
        if (next >= duration) {
          setPlaying(false);
          return duration;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, duration]);

  const activeChapter = useMemo(() => {
    let label = chapters[0]?.label ?? "";
    for (const ch of chapters) {
      if (ch.start <= current) label = ch.label;
      else break;
    }
    return label;
  }, [chapters, current]);

  const progress = Math.min(100, (current / duration) * 100);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      {/* Left: player + transcript */}
      <div className="flex min-w-0 flex-col gap-4">
        {/* Player surface */}
        <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
          {youtubeId && embed ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                key={current}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?start=${Math.floor(
                  current
                )}&autoplay=${hasInteracted ? 1 : 0}&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <TranscriptStage
              title={title}
              current={current}
              activeChapter={activeChapter}
              segment={segments[activeIndex]}
            />
          )}

          {/* Transport bar */}
          <div className="flex flex-col gap-2 border-t border-border bg-muted/40 px-4 py-3">
            {/* Scrubber */}
            <div className="flex items-center gap-3">
              <span className="w-14 shrink-0 text-right font-mono text-xs text-muted-foreground">
                {fmt(current)}
              </span>
              <div
                className="group relative h-2 flex-1 cursor-pointer rounded-full bg-foreground/10"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  seek(Math.round(pct * duration));
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow transition-opacity group-hover:opacity-100"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <span className="w-14 shrink-0 font-mono text-xs text-muted-foreground">
                {fmt(duration)}
              </span>
            </div>
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    seek(Math.max(0, segments[Math.max(0, activeIndex - 1)].start))
                  }
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  aria-label="Previous segment"
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                {!embed && (
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? (
                      <Pause className="h-4 w-4 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    )}
                  </button>
                )}
                <button
                  onClick={() =>
                    seek(
                      segments[Math.min(segments.length - 1, activeIndex + 1)]
                        .start
                    )
                  }
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  aria-label="Next segment"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
                <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">
                  {embed
                    ? "Playing video · click a line to jump"
                    : `${playing ? "Reading along" : "Paused"} · ${activeChapter}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {youtubeId ? (
                  <>
                    <button
                      onClick={() => setEmbed((e) => !e)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-foreground/5 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-foreground/10"
                    >
                      <Film className="h-4 w-4" />
                      {embed ? "Read transcript" : "Watch video"}
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${youtubeId}&t=${Math.floor(current)}s`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-red-600/10 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-600/20"
                      title="If the embedded player is blocked, open on YouTube"
                    >
                      Open on YouTube
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </>
                ) : (
                  <a
                    href={youtubeSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-red-600/10 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-600/20"
                  >
                    <Film className="h-4 w-4" />
                    Find on YouTube
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="font-heading text-sm font-semibold text-foreground">
              Transcript
            </h3>
            <span className="text-xs text-muted-foreground">
              {segments.length} segments · click any timestamp to jump
            </span>
          </div>
          <div
            ref={transcriptRef}
            className="max-h-[60vh] overflow-y-auto px-2 py-2"
          >
            {segments.map((seg, i) => {
              const active = i === activeIndex;
              return (
                <button
                  key={seg.i}
                  ref={active ? activeSegRef : null}
                  onClick={() => seek(seg.start)}
                  className={`flex w-full gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    active
                      ? "bg-primary/10 ring-1 ring-primary/20"
                      : "hover:bg-foreground/[0.03]"
                  }`}
                >
                  <span
                    className={`mt-0.5 shrink-0 font-mono text-xs ${
                      active ? "font-semibold text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {fmt(seg.start)}
                  </span>
                  <span
                    className={`text-sm leading-relaxed ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {seg.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: chapters / key-points rail */}
      <div className="flex flex-col gap-4 lg:sticky lg:top-4 lg:self-start">
        <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
          <div className="flex border-b border-border">
            <RailTab
              active={tab === "chapters"}
              onClick={() => setTab("chapters")}
              icon={ListTree}
              label={`Chapters (${chapters.length})`}
            />
            <RailTab
              active={tab === "keypoints"}
              onClick={() => setTab("keypoints")}
              icon={Quote}
              label={`Key points (${keyPoints.length})`}
            />
          </div>
          <div className="max-h-[70vh] overflow-y-auto p-2">
            {tab === "chapters"
              ? chapters.map((ch, i) => {
                  const active = ch.label === activeChapter;
                  return (
                    <button
                      key={i}
                      onClick={() => seek(ch.start)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        active
                          ? "bg-primary/10"
                          : "hover:bg-foreground/[0.03]"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-sm font-medium ${
                            active ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {ch.label}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {fmt(ch.start)}
                        </span>
                      </span>
                    </button>
                  );
                })
              : keyPoints.map((kp, i) => (
                  <button
                    key={i}
                    onClick={() => seek(kp.start)}
                    className="flex w-full flex-col gap-1 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-foreground/[0.03]"
                  >
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                      <Play className="h-3 w-3 fill-current" />
                      {fmt(kp.start)}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {kp.text}
                    </span>
                  </button>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TranscriptStage({
  title,
  current,
  activeChapter,
  segment,
}: {
  title: string;
  current: number;
  activeChapter: string;
  segment?: TranscriptSegment;
}) {
  return (
    <div className="relative flex aspect-video w-full flex-col justify-end overflow-hidden bg-gradient-to-br from-primary/20 via-card to-card p-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 20%, var(--color-primary) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-background/70 px-2 py-1 text-xs font-medium text-primary backdrop-blur">
          <Quote className="h-3.5 w-3.5" />
          {activeChapter || "Transcript"}
        </span>
        <p className="mt-3 line-clamp-4 max-w-2xl font-heading text-lg font-medium leading-relaxed text-foreground">
          {segment ? `“${segment.text}”` : title}
        </p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          at {fmt(current)} · reading along with the cleaned transcript
        </p>
      </div>
    </div>
  );
}

function RailTab({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors ${
        active
          ? "border-b-2 border-primary text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
