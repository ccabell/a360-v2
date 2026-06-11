"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { formatTimestamp } from "@/lib/retrieval/locator";

interface YouTubeViewerProps {
  videoId: string;
  title?: string;
  startSeconds?: number;
  thumbnailUrl?: string;
}

/**
 * Click-to-play YouTube viewer. Shows the public thumbnail (no API key needed),
 * then swaps to an embedded player that starts at the cited timestamp.
 * Thumbnail falls back maxres -> hq -> themed placeholder if a frame is missing.
 */
export function YouTubeViewer({
  videoId,
  title,
  startSeconds,
  thumbnailUrl,
}: YouTubeViewerProps) {
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(
    thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  );
  const [failed, setFailed] = useState(false);

  if (playing) {
    const start = startSeconds ?? 0;
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?start=${start}&autoplay=1&rel=0`}
          title={title || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title || "video"}${
        startSeconds != null ? ` at ${formatTimestamp(startSeconds)}` : ""
      }`}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-muted"
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={title || "Video thumbnail"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => {
            if (src.includes("maxresdefault")) {
              setSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
            } else {
              setFailed(true);
            }
          }}
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-muted to-muted-foreground/20" />
      )}

      {/* Play overlay */}
      <span className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors group-hover:bg-black/25">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
          <Play className="ml-0.5 h-5 w-5 fill-current" />
        </span>
      </span>

      {/* Timestamp chip */}
      {startSeconds != null && (
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {formatTimestamp(startSeconds)}
        </span>
      )}
    </button>
  );
}
