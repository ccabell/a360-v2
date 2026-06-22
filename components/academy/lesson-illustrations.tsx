import Link from "next/link";
import { ImageIcon, ArrowUpRight } from "lucide-react";
import type { IllustrationFrame } from "@/lib/academy/types";

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = String(Math.floor(sec % 60)).padStart(2, "0");
  return `${m}:${s}`;
}

/**
 * Horizontal strip of teaching frames extracted from this lesson, each linking
 * to the exact second it appears. Rendered only when the video has illustrations.
 */
export function LessonIllustrations({
  slug,
  frames,
}: {
  slug: string;
  frames: IllustrationFrame[];
}) {
  if (frames.length === 0) return null;
  // Cap the in-lesson strip; the full set lives in the gallery.
  const shown = frames.slice(0, 12);

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-bold text-foreground">
            Teaching illustrations
          </h2>
        </div>
        <Link
          href="/dashboard/academy/illustrations"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Full gallery
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Anatomy diagrams and markups from this lesson — click any frame to jump
        to that moment. {frames.length} extracted.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((f) => (
          <Link
            key={f.file}
            href={`/dashboard/academy/lesson/${slug}?t=${f.start}`}
            className="group relative aspect-video overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10 transition-all hover:ring-primary/50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f.file}
              alt={`Illustration at ${fmt(f.start)}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white">
              {fmt(f.start)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
