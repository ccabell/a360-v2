import Link from "next/link";
import { Clock, Layers, PlayCircle } from "lucide-react";
import type { VideoSummary } from "@/lib/academy/types";
import { CATEGORY_STYLES } from "./icons";
import { TOPIC_BY_ID, MODULE_BY_ID } from "@/lib/academy/taxonomy";

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m`;
  }
  return `${m}m`;
}

/** A compact, premium lesson card linking to the lesson page. */
export function LessonCard({ video }: { video: VideoSummary }) {
  const module = MODULE_BY_ID.get(video.primaryModule);
  const cat = module
    ? CATEGORY_STYLES[
        TOPIC_BY_ID.get(module.topics[0] ?? "")?.category ?? "technique"
      ]
    : CATEGORY_STYLES.technique;

  return (
    <Link
      href={`/dashboard/academy/lesson/${video.slug}`}
      className="group block"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all duration-200 hover:ring-primary/40 hover:shadow-lg hover:-translate-y-0.5">
        {/* Thumbnail band */}
        <div
          className={`relative flex h-28 items-center justify-center ${cat.bg} overflow-hidden`}
        >
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, currentColor 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <PlayCircle
            className={`h-10 w-10 ${cat.text} opacity-80 transition-transform duration-200 group-hover:scale-110`}
          />
          <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-[11px] font-medium text-foreground backdrop-blur">
            <Clock className="h-3 w-3" />
            {fmt(video.duration)}
          </span>
          {module && (
            <span
              className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ${cat.text} bg-background/80 backdrop-blur`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${cat.dot}`} />
              {module.title}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 font-heading text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
            {video.title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {video.excerpt}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
            {video.topics.slice(0, 2).map((t) => {
              const topic = TOPIC_BY_ID.get(t);
              if (!topic) return null;
              return (
                <span
                  key={t}
                  className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  {topic.title}
                </span>
              );
            })}
            <span className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground/70">
              <Layers className="h-3 w-3" />
              {video.segmentCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
