"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { youtubeThumb } from "@/lib/academy/youtube";

/**
 * In-app YouTube player (lite-embed): shows a poster + play, mounts the iframe
 * only on click — or immediately at a deep-linked second when `initialStart` is
 * set (e.g. arriving from an AI-chat citation).
 */
export function TubePlayer({
  videoId,
  title,
  initialStart = 0,
}: {
  videoId: string;
  title: string;
  initialStart?: number;
}) {
  const start = Math.max(0, Math.floor(initialStart));
  const [loaded, setLoaded] = useState(start > 0);
  const poster = youtubeThumb(videoId, "max") ?? youtubeThumb(videoId, "hq");

  return (
    <div className="overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
      {loaded ? (
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?start=${start}&autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group relative block aspect-video w-full"
          aria-label="Play video"
        >
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt={title} className="absolute inset-0 h-full w-full object-cover" />
          )}
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-xl transition-transform group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-white text-white" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
