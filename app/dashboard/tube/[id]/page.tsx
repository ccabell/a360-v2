import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Video } from "lucide-react";
import { getTubeVideos } from "@/lib/tube/server";
import { getVideoMetaById } from "@/lib/tube/chat-retrieval";
import { TubePlayer } from "@/components/tube/tube-player";
import { TubeCard } from "@/components/tube/tube-card";

const CHANNEL_LABELS: Record<string, string> = {
  drtimpearce: "Dr Tim Pearce", drtimepearce: "Dr Tim Pearce",
  waveplasticsurgery: "Wave Plastic Surgery", aafe_tv: "AAFE",
  btlaestheticsint: "BTL Aesthetics", lumenisaesthetics: "Lumenis",
  erchoniaemea: "Erchonia", sciton: "Sciton", botoxcosmetic: "BOTOX Cosmetic",
  galdermaint: "Galderma", skinceuticals: "SkinCeuticals",
  revisionskincare: "Revision Skincare", inmodesolutions: "InMode",
};
const channelLabel = (c: string) =>
  CHANNEL_LABELS[c] ?? c.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

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

  return (
    <div className="min-h-full bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <Link
          href="/dashboard/tube"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Video Navigator
        </Link>

        <div className="mt-4">
          <TubePlayer videoId={id} title={meta.title} initialStart={start} />
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <Video className="h-4 w-4" />
              {meta.channel}
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
    </div>
  );
}
