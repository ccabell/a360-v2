import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Clock,
  ExternalLink,
  Headphones,
  Tag,
  Mic,
} from "lucide-react";
import { getPodcastEpisode, getEpisodeChunks, getEpisodeTags } from "@/lib/podcast/server";
import TranscriptViewer from "@/components/podcast/transcript-viewer";

export const revalidate = 300;

function fmtDuration(sec: number | null) {
  if (!sec) return null;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [episode, chunks, tags] = await Promise.all([
    getPodcastEpisode(id),
    getEpisodeChunks(id),
    getEpisodeTags(id),
  ]);

  if (!episode) notFound();

  // Group tags by type
  const tagsByType = new Map<string, string[]>();
  for (const t of tags as { tag_type: string; tag_value: string }[]) {
    const arr = tagsByType.get(t.tag_type) ?? [];
    arr.push(t.tag_value);
    tagsByType.set(t.tag_type, arr);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-xs text-neutral-500">
        <Link href="/podcast" className="hover:text-white">
          Podcast Navigator
        </Link>
        <ChevronRight className="h-3 w-3" />
        {episode.show_name && (
          <>
            <Link
              href={`/podcast/shows/${episode.show_id}`}
              className="hover:text-white"
            >
              {episode.show_name}
            </Link>
            <ChevronRight className="h-3 w-3" />
          </>
        )}
        <span className="truncate text-neutral-300">{episode.title}</span>
      </nav>

      {/* Episode header */}
      <div className="flex gap-6">
        {episode.show_artwork_url && (
          <div className="hidden w-24 shrink-0 sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={episode.show_artwork_url}
              alt={episode.show_name ?? ""}
              className="w-full rounded-lg"
            />
          </div>
        )}

        <div className="flex-1">
          {episode.show_name && (
            <Link
              href={`/podcast/shows/${episode.show_id}`}
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <Mic className="h-3.5 w-3.5" />
              {episode.show_name}
            </Link>
          )}
          <h1 className="mt-1 font-heading text-2xl font-bold text-white">
            {episode.title}
          </h1>

          <div className="mt-2 flex flex-wrap gap-3 text-xs text-neutral-400">
            {episode.published_date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(episode.published_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            {episode.duration_seconds && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {fmtDuration(episode.duration_seconds)}
              </span>
            )}
            {episode.is_vectorized && (
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                Searchable
              </span>
            )}
          </div>

          {/* Listen externally */}
          {episode.enclosure_url && (
            <a
              href={episode.enclosure_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-200 transition-colors hover:bg-white/10"
            >
              <Headphones className="h-3.5 w-3.5" />
              Listen to original
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {episode.speakers && episode.speakers.length > 0 && (
            <p className="mt-3 text-xs text-neutral-500">
              <span className="font-medium text-neutral-400">Speakers:</span>{" "}
              {episode.speakers.join(", ")}
            </p>
          )}
          {episode.guests && episode.guests.length > 0 && (
            <p className="mt-1 text-xs text-neutral-500">
              <span className="font-medium text-neutral-400">Guests:</span>{" "}
              {episode.guests.join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* Tags */}
      {tagsByType.size > 0 && (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <Tag className="h-3.5 w-3.5" />
            Tags
          </h2>
          <div className="mt-3 space-y-2">
            {Array.from(tagsByType.entries()).map(([type, values]) => (
              <div key={type} className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                  {type}:
                </span>
                {values.slice(0, 15).map((v) => (
                  <span
                    key={v}
                    className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium capitalize text-neutral-300 ring-1 ring-white/10"
                  >
                    {v.replace(/_/g, " ")}
                  </span>
                ))}
                {values.length > 15 && (
                  <span className="text-[10px] text-neutral-500">
                    +{values.length - 15} more
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {episode.summary && (
        <div className="mt-6">
          <h2 className="font-heading text-lg font-bold text-white">Summary</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            {episode.summary}
          </p>
        </div>
      )}

      {/* Transcript */}
      <div className="mt-8">
        <h2 className="font-heading text-lg font-bold text-white">
          Transcript
        </h2>

        {episode.transcript_text || chunks.length > 0 ? (
          <TranscriptViewer
            text={
              episode.transcript_text ??
              // Chunks are contiguous splits of the transcript (they cut
              // mid-word), so plain concatenation reconstructs it.
              (chunks as { chunk_text: string }[])
                .map((c) => c.chunk_text)
                .join("")
            }
          />
        ) : (
          <p className="mt-4 text-sm text-neutral-500">
            No transcript available for this episode yet.
          </p>
        )}
      </div>
    </div>
  );
}
