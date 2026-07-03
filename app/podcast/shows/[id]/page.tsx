import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Mic,
  Headphones,
  Rss,
  Globe,
  Calendar,
  ExternalLink,
  Search,
} from "lucide-react";
import { getPodcastShow, getShowEpisodes, getEpisodeTagsBatch, getShowTags } from "@/lib/podcast/server";
import { ShowEpisodesClient } from "@/components/podcast/show-episodes-client";
import { ShowDescription } from "@/components/podcast/show-description";

export const revalidate = 300;

const TAG_COLORS: Record<string, string> = {
  treatment: "bg-emerald-500/15 text-emerald-400",
  topic: "bg-blue-500/15 text-blue-400",
  anatomy: "bg-rose-500/15 text-rose-400",
  product: "bg-amber-500/15 text-amber-400",
  business: "bg-violet-500/15 text-violet-400",
  concern: "bg-cyan-500/15 text-cyan-400",
};

export default async function ShowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Parallel fetch: show + first 50 episodes + show-level tags
  const [show, episodes, showTags] = await Promise.all([
    getPodcastShow(id),
    getShowEpisodes(id, { limit: 50 }),
    getShowTags(id, 25),
  ]);

  if (!show) notFound();

  // Batch-fetch tags for the initial 50 episodes
  const tagMap = await getEpisodeTagsBatch(episodes.map((e) => e.id));
  const tagsById: Record<string, { tag_type: string; tag_value: string }[]> = {};
  for (const [epId, tags] of tagMap) {
    tagsById[epId] = tags;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-xs text-neutral-500">
        <Link href="/podcast" className="hover:text-white">
          Podcast Navigator
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/podcast/explore" className="hover:text-white">
          Browse
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-300">{show.name}</span>
      </nav>

      {/* Show header */}
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Artwork */}
        <div className="w-40 shrink-0 sm:w-48">
          {show.artwork_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={show.artwork_url}
              alt={show.name}
              className="w-full rounded-xl shadow-lg"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-neutral-800">
              <Mic className="h-12 w-12 text-neutral-600" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          {show.category && (
            <span className="inline-block rounded bg-primary/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              {show.category}
            </span>
          )}
          <h1 className="mt-2 font-heading text-3xl font-bold text-white">
            {show.name}
          </h1>
          {show.host && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-300">
              <Mic className="h-4 w-4 text-primary" />
              {show.host}
            </p>
          )}

          {/* Truncated description */}
          {show.description && <ShowDescription text={show.description} />}

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Headphones className="h-3.5 w-3.5" />
              {show.episode_count} episodes
            </span>
            {show.latest_episode_date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Latest:{" "}
                {new Date(show.latest_episode_date).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" },
                )}
              </span>
            )}
          </div>

          {/* Show-level tags */}
          {showTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {showTags.map((t) => {
                const colors = TAG_COLORS[t.tag_type] ?? "bg-white/10 text-neutral-300";
                return (
                  <span
                    key={`${t.tag_type}:${t.tag_value}`}
                    className={`rounded-md px-2 py-0.5 text-[11px] font-medium capitalize ${colors}`}
                  >
                    {t.tag_value.replace(/_/g, " ")}
                  </span>
                );
              })}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            {show.website_url && (
              <a
                href={show.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:bg-white/10"
              >
                <Globe className="h-3.5 w-3.5" />
                Website
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {show.rss_url && (
              <a
                href={show.rss_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:bg-white/10"
              >
                <Rss className="h-3.5 w-3.5" />
                RSS Feed
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            <Link
              href="/podcast/ask"
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <Search className="h-3.5 w-3.5" />
              Search transcripts
            </Link>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="mt-10">
        <ShowEpisodesClient
          showId={id}
          initialEpisodes={episodes}
          initialTagsById={tagsById}
          totalEpisodes={show.episode_count}
        />
      </div>
    </div>
  );
}
