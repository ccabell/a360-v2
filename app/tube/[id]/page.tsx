import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Video } from "lucide-react";
import { getTubeVideos } from "@/lib/tube/server";
import { fmt, getVideoMetaById, getVideoMoments } from "@/lib/tube/chat-retrieval";
import { TubePlayer } from "@/components/tube/tube-player";
import { TubeCard } from "@/components/tube/tube-card";
import { TubeTutorClient } from "@/components/tube/tube-tutor-client";
import { channelLabel } from "@/lib/tube/channels";
import { publishedLabel } from "@/lib/tube/format";

const ASK_STARTERS = [
  "Summarize the key technique shown",
  "What safety points are covered?",
  "Who is this treatment suitable for?",
  "What products or devices are mentioned?",
];

export default async function TubeWatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ t?: string }>;
}) {
  const { id } = await params;
  const { t } = await searchParams;
  const start = Number(t) || 0;

  const baked = getTubeVideos().find((v) => v.id === id) ?? null;
  const meta = baked
    ? { title: baked.title, channel: channelLabel(baked.channel) }
    : await getVideoMetaById(id);
  if (!meta) notFound();

  // Related (curated only): shared anatomy/concern, exclude self.
  const related = baked
    ? getTubeVideos()
        .filter(
          (v) =>
            v.id !== id &&
            (v.anatomy.some((a) => baked.anatomy.includes(a)) ||
              v.concerns.some((c) => baked.concerns.includes(c))),
        )
        .sort((a, b) => b.chunkCount - a.chunkCount)
        .slice(0, 6)
    : [];

  const tags = baked ? [...baked.anatomy, ...baked.concerns].slice(0, 6) : [];
  const moments = await getVideoMoments(id);

  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      <Link
        href="/tube/explore"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Navigate the library
      </Link>

      <div className="mt-4">
        <TubePlayer videoId={id} title={meta.title} initialStart={start} />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <Video className="h-4 w-4" />
            {meta.channel}
            {publishedLabel(baked?.publishedAt) && (
              <span className="font-normal text-neutral-500">
                · {publishedLabel(baked?.publishedAt)}
              </span>
            )}
          </div>
          <h1 className="mt-1 font-heading text-2xl font-bold leading-tight text-white">
            {meta.title}
          </h1>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-neutral-300 ring-1 ring-white/10 hover:bg-white/10"
        >
          YouTube
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {baked?.summary && (
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-300">
          {baked.summary}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2 py-1 text-xs font-medium capitalize text-neutral-300 ring-1 ring-white/10"
            >
              {tag.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      )}

      {moments.length > 0 && (
        <section className="mt-8">
          <h2 className="font-heading text-lg font-bold text-white">Moments</h2>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {moments.map((m) => (
              <Link
                key={m.start}
                href={`/tube/${id}?t=${m.start}`}
                className="flex items-start gap-2.5 rounded-lg bg-white/5 p-3 ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
                  {fmt(m.start)}
                </span>
                <span className="text-sm text-neutral-300">{m.label}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-heading text-lg font-bold text-white">Ask about this video</h2>
        <div className="mt-4 h-[28rem]">
          <TubeTutorClient videoId={id} starters={ASK_STARTERS} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-heading text-lg font-bold text-white">Related videos</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v) => (
              <TubeCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
