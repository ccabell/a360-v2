import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getPodcastShows } from "@/lib/podcast/server";
import { PodcastExplore } from "@/components/podcast/podcast-explore";

export const metadata = {
  title: "Browse Shows — A360 Podcast Navigator",
};

export const revalidate = 300;

export default async function PodcastExplorePage() {
  const shows = await getPodcastShows({ sort: "episodes" });

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <nav className="mb-4 flex items-center gap-1 text-xs text-neutral-500">
        <Link href="/podcast" className="hover:text-white">
          Podcast Navigator
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-300">Browse</span>
      </nav>

      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-white">
          Browse all shows
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          {shows.length} medical aesthetics podcasts — filter by category or
          search by name.
        </p>
      </div>

      <PodcastExplore shows={shows} />
    </div>
  );
}
