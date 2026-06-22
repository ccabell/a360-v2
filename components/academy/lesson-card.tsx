import Link from "next/link";
import { Clock, Layers, Play } from "lucide-react";
import type { VideoSummary } from "@/lib/academy/types";
import { CATEGORY_STYLES } from "./icons";
import { TOPIC_BY_ID, MODULE_BY_ID } from "@/lib/academy/taxonomy";
import { youtubeThumb } from "@/lib/academy/youtube";

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m`;
  }
  return `${m}m`;
}

/** A cinematic, thumbnail-forward lesson card linking to the lesson page. */
export function LessonCard({ video }: { video: VideoSummary }) {
  const module = MODULE_BY_ID.get(video.primaryModule);
  const cat = module
    ? CATEGORY_STYLES[
        TOPIC_BY_ID.get(module.topics[0] ?? "")?.category ?? "technique"
      ]
    : CATEGORY_STYLES.technique;
  const thumb = youtubeThumb(video.youtubeId, "hq");

  return (
    <Link
      href={`/dashboard/academy/lesson/${video.slug}`}
      className="group block"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10 transition-all duration-200 hover:ring-white/25 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-neutral-800">
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb}
              alt={video.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center ${cat.bg}`}>
              <Play className={`h-9 w-9 ${cat.text} opacity-70`} />
            </div>
          )}
          {/* Gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
          {/* Hover play */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg">
              <Play className="ml-0.5 h-5 w-5 fill-black text-black" />
            </span>
          </div>
          {/* Duration */}
          <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] font-medium text-white backdrop-blur">
            <Clock className="h-3 w-3" />
            {fmt(video.duration)}
          </span>
          {/* Module pill */}
          {module && (
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur">
              <span className={`h-1.5 w-1.5 rounded-full ${cat.dot}`} />
              {module.title}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 font-heading text-sm font-semibold leading-snug text-white group-hover:text-white">
            {video.title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-neutral-400">
            {video.excerpt}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
            {video.topics.slice(0, 2).map((t) => {
              const topic = TOPIC_BY_ID.get(t);
              if (!topic) return null;
              return (
                <span
                  key={t}
                  className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-neutral-300 ring-1 ring-white/10"
                >
                  {topic.title}
                </span>
              );
            })}
            <span className="ml-auto flex items-center gap-1 text-[10px] text-neutral-500">
              <Layers className="h-3 w-3" />
              {video.segmentCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
