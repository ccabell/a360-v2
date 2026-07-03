import Link from "next/link";
import { Play, Video } from "lucide-react";
import type { TubeVideo } from "@/lib/tube/types";
import { youtubeThumb } from "@/lib/academy/youtube";

const CHANNEL_LABELS: Record<string, string> = {
  drtimpearce: "Dr Tim Pearce",
  waveplasticsurgery: "Wave Plastic Surgery",
  aafe_tv: "AAFE",
  btlaestheticsint: "BTL Aesthetics",
  lumenisaesthetics: "Lumenis",
  erchoniaemea: "Erchonia",
  sciton: "Sciton",
  botoxcosmetic: "BOTOX Cosmetic",
  galdermaint: "Galderma",
  skinceuticals: "SkinCeuticals",
  revisionskincare: "Revision Skincare",
  inmodesolutions: "InMode",
};

function channelLabel(c: string): string {
  return (
    CHANNEL_LABELS[c] ??
    c.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())
  );
}

function tagLabel(t: string): string {
  return t.replace(/_/g, " ");
}

/** A YouTube-aesthetics video card — links out to the real video. */
export function TubeCard({ video }: { video: TubeVideo }) {
  const thumb = youtubeThumb(video.id, "hq");
  const tags = [...video.anatomy.slice(0, 1), ...video.concerns.slice(0, 2)].slice(0, 3);

  return (
    <Link
      href={`/tube/${video.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10 transition-all duration-200 hover:ring-white/25 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-neutral-800">
        {thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-lg">
            <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
          </span>
        </div>
        {video.contentType && (
          <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/90 backdrop-blur">
            {tagLabel(video.contentType)}
          </span>
        )}
        {video.patientSafe && (
          <span className="absolute right-2 top-2 rounded bg-emerald-500/90 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            Patient-safe
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-primary">
          <Video className="h-3.5 w-3.5" />
          {channelLabel(video.channel)}
        </div>
        <h3 className="line-clamp-2 font-heading text-sm font-semibold leading-snug text-white">
          {video.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-neutral-400">
          {video.summary}
        </p>
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium capitalize text-neutral-300 ring-1 ring-white/10"
              >
                {tagLabel(t)}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
