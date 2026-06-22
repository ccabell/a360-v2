import Link from "next/link";
import { ChevronRight, ImageIcon, Layers } from "lucide-react";
import { getIllustrations } from "@/lib/academy/server";
import { IllustrationGallery } from "@/components/academy/illustration-gallery";
import { TOPIC_BY_ID } from "@/lib/academy/taxonomy";

export const metadata = {
  title: "Illustration Reference · Injector Academy",
};

export default function IllustrationsPage() {
  const videos = getIllustrations();
  const totalFrames = videos.reduce((n, v) => n + v.frameCount, 0);

  // Topic facets present across the illustration set (for filter chips).
  const topicCounts = new Map<string, number>();
  for (const v of videos) {
    for (const t of v.topics) {
      topicCounts.set(t, (topicCounts.get(t) ?? 0) + v.frameCount);
    }
  }
  const facets = Array.from(topicCounts.entries())
    .map(([id, count]) => ({ id, title: TOPIC_BY_ID.get(id)?.title ?? id, count }))
    .filter((f) => TOPIC_BY_ID.has(f.id))
    .sort((a, b) => b.count - a.count)
    .slice(0, 14);

  return (
    <div className="mx-auto max-w-6xl px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link href="/dashboard/academy" className="hover:text-foreground">
          Pearce Channel
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Illustrations</span>
      </nav>

      <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
        <ImageIcon className="h-4 w-4" />
        Visual reference
      </div>
      <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold leading-tight text-foreground">
        The anatomy illustrations, in one place.
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Anatomy diagrams, artery maps and injection markups from Dr Tim
        Pearce&rsquo;s videos. Each one links to the exact second it appears in
        the video.
      </p>

      <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <ImageIcon className="h-4 w-4 text-primary/70" />
          <span className="font-semibold text-foreground">{totalFrames}</span>{" "}
          frames
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-primary/70" />
          <span className="font-semibold text-foreground">{videos.length}</span>{" "}
          source videos
        </span>
      </div>

      {videos.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="mt-3 font-medium text-foreground">
            No illustrations extracted yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Run{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
              npx tsx scripts/academy/extract-illustrations.ts
            </code>{" "}
            to populate the gallery.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <IllustrationGallery videos={videos} facets={facets} />
        </div>
      )}
    </div>
  );
}
