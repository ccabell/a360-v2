"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { formatTimestamp } from "@/lib/retrieval/locator";
import type { RetrievedSource, YouTubeLocator } from "@/lib/types/retrieval";

interface RelatedVideosProps {
  sources: RetrievedSource[];
  max?: number;
}

/**
 * Compact video strip showing top YouTube sources as clickable thumbnails.
 * Always visible when YouTube sources exist — independent of LLM citations.
 */
export function RelatedVideos({ sources, max = 3 }: RelatedVideosProps) {
  const videos = sources
    .filter((s) => s.corpus === "youtube" && s.locator.type === "youtube")
    .slice(0, max) as (RetrievedSource & { locator: YouTubeLocator })[];

  if (videos.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Related Videos
      </h4>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
        {videos.map((v) => (
          <VideoCard key={v.retrievalId} locator={v.locator} />
        ))}
      </div>
    </div>
  );
}

function VideoCard({ locator }: { locator: YouTubeLocator }) {
  const [playing, setPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    locator.thumbnailUrl ||
      `https://img.youtube.com/vi/${locator.videoId}/hqdefault.jpg`,
  );
  const [thumbFailed, setThumbFailed] = useState(false);

  if (playing) {
    const start = locator.startSeconds ?? 0;
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-black">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${locator.videoId}?start=${start}&autoplay=1&rel=0`}
            title={locator.videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group overflow-hidden rounded-lg border border-border bg-card text-left transition-colors hover:border-primary/40"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {!thumbFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbSrc}
            alt={locator.videoTitle}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => {
              if (thumbSrc.includes("maxresdefault")) {
                setThumbSrc(
                  `https://img.youtube.com/vi/${locator.videoId}/hqdefault.jpg`,
                );
              } else {
                setThumbFailed(true);
              }
            }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted to-muted-foreground/20" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
            <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
          </span>
        </span>
        {locator.startSeconds != null && (
          <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[0.6rem] font-medium text-white">
            {formatTimestamp(locator.startSeconds)}
          </span>
        )}
      </div>
      {/* Title + channel */}
      <div className="px-2 py-1.5">
        <p className="line-clamp-2 text-xs font-medium leading-tight text-foreground">
          {locator.videoTitle}
        </p>
        {locator.manufacturerName && (
          <p className="mt-0.5 truncate text-[0.65rem] text-muted-foreground">
            {locator.manufacturerName}
          </p>
        )}
      </div>
    </button>
  );
}
