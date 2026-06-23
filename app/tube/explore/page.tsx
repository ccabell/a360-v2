import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import {
  getTubeVideos,
  getTubeFacets,
  getTubeIndex,
} from "@/lib/tube/server";
import { TubeExplore } from "@/components/tube/tube-explore";

export const metadata = {
  title: "Navigate · A360 Video Navigator",
};

export default function TubeExplorePage() {
  const videos = getTubeVideos();
  const facets = getTubeFacets();
  const { stats } = getTubeIndex();

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-neutral-400">
        <Link href="/tube" className="hover:text-white">
          Video Navigator
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">Navigate</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Navigate the library
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-300">
            {stats.videos.toLocaleString()} videos across {stats.channels}{" "}
            channels — filter by facial &amp; body area, concern, treatment and
            type, then search the rest.
          </p>
        </div>
        <Link
          href="/tube/ask"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
        >
          <Sparkles className="h-4 w-4" />
          Ask the library
        </Link>
      </div>

      <div className="mt-8">
        <TubeExplore videos={videos} facets={facets} />
      </div>
    </div>
  );
}
