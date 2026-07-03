import Link from "next/link";
import { Headphones, Mic } from "lucide-react";
import type { PodcastShow } from "@/lib/podcast/types";

const CATEGORY_COLORS: Record<string, string> = {
  Clinical: "bg-emerald-500/90",
  Business: "bg-blue-500/90",
  Both: "bg-violet-500/90",
};

export function PodcastCard({ show }: { show: PodcastShow }) {
  return (
    <Link
      href={`/podcast/shows/${show.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10 transition-all duration-200 hover:ring-white/25 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1"
    >
      {/* Artwork */}
      <div className="relative aspect-square overflow-hidden bg-neutral-800">
        {show.artwork_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={show.artwork_url}
            alt={show.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Mic className="h-12 w-12 text-neutral-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        {show.category && (
          <span
            className={`absolute left-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-semibold text-white ${
              CATEGORY_COLORS[show.category] ?? "bg-neutral-500/90"
            }`}
          >
            {show.category}
          </span>
        )}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur">
          <Headphones className="h-3 w-3" />
          {show.episode_count} episodes
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {show.host && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-primary">
            <Mic className="h-3.5 w-3.5" />
            {show.host}
          </div>
        )}
        <h3 className="line-clamp-2 font-heading text-sm font-semibold leading-snug text-white">
          {show.name}
        </h3>
        {show.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-neutral-400">
            {show.description}
          </p>
        )}
        {show.latest_episode_date && (
          <p className="mt-auto pt-1 text-[10px] text-neutral-500">
            Latest:{" "}
            {new Date(show.latest_episode_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
