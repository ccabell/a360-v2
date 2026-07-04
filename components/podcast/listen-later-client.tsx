"use client";

import Link from "next/link";
import { Bookmark, Clock, Mic, Trash2 } from "lucide-react";
import { useListenLater } from "@/lib/podcast/listen-later";

function fmtDuration(sec: number | null) {
  if (!sec) return null;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m} min`;
}

export default function ListenLaterClient() {
  const { items, remove } = useListenLater();

  if (items.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-white/10 bg-neutral-900 p-10 text-center">
        <Bookmark className="mx-auto h-8 w-8 text-neutral-600" />
        <p className="mt-3 text-sm font-medium text-neutral-300">
          Nothing saved yet
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          Tap the bookmark on any episode to save it here. Saved episodes are
          stored in this browser.
        </p>
        <Link
          href="/podcast/search"
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Find episodes
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <p className="text-sm text-neutral-500">
        {items.length} episode{items.length === 1 ? "" : "s"} saved in this
        browser
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.episodeId}
            className="group flex items-center gap-4 rounded-xl border border-white/10 bg-neutral-900 p-4 transition-colors hover:border-primary/40"
          >
            {item.showArtworkUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.showArtworkUrl}
                alt=""
                className="hidden h-14 w-14 shrink-0 rounded-lg sm:block"
              />
            )}
            <Link
              href={`/podcast/episodes/${item.episodeId}`}
              className="min-w-0 flex-1"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                {item.showName && (
                  <span className="flex items-center gap-1 font-medium text-primary">
                    <Mic className="h-3 w-3" />
                    {item.showName}
                  </span>
                )}
                {item.durationSeconds ? (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {fmtDuration(item.durationSeconds)}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-1 font-heading text-sm font-bold text-white group-hover:text-primary">
                {item.title}
              </h3>
            </Link>
            <button
              type="button"
              title="Remove from Listen Later"
              onClick={() => remove(item.episodeId)}
              className="shrink-0 rounded-md p-2 text-neutral-500 transition-colors hover:bg-white/10 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
