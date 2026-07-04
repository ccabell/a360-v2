"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useListenLater, type ListenLaterItem } from "@/lib/podcast/listen-later";

type Episode = Omit<ListenLaterItem, "savedAt">;

/** Pill-style toggle for the episode detail page. */
export function ListenLaterButton({ episode }: { episode: Episode }) {
  const { isSaved, toggle } = useListenLater();
  const saved = isSaved(episode.episodeId);
  const Icon = saved ? BookmarkCheck : Bookmark;

  return (
    <button
      type="button"
      onClick={() => toggle(episode)}
      className={`mt-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
        saved
          ? "border-primary/40 bg-primary/15 text-primary hover:bg-primary/25"
          : "border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {saved ? "Saved for later" : "Listen later"}
    </button>
  );
}

/** Compact icon toggle for use inside result/list cards (which are links). */
export function ListenLaterIconButton({ episode }: { episode: Episode }) {
  const { isSaved, toggle } = useListenLater();
  const saved = isSaved(episode.episodeId);
  const Icon = saved ? BookmarkCheck : Bookmark;

  return (
    <button
      type="button"
      title={saved ? "Remove from Listen Later" : "Save to Listen Later"}
      onClick={(e) => {
        // Cards are wrapped in <Link> — don't navigate on save.
        e.preventDefault();
        e.stopPropagation();
        toggle(episode);
      }}
      className={`shrink-0 rounded-md p-1.5 transition-colors ${
        saved
          ? "text-primary hover:bg-primary/15"
          : "text-neutral-500 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
