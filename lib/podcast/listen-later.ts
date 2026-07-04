"use client";

/**
 * Listen Later — client-side saved episodes.
 *
 * There are no user accounts yet, so the list lives in localStorage.
 * `useListenLater` keeps all mounted components in sync via a custom
 * window event (same tab) and the `storage` event (other tabs).
 */
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "a360-podcast-listen-later";
const CHANGE_EVENT = "a360-listen-later-change";

export interface ListenLaterItem {
  episodeId: string;
  title: string;
  showId: string | null;
  showName: string | null;
  showArtworkUrl: string | null;
  durationSeconds: number | null;
  savedAt: string;
}

function readAll(): ListenLaterItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(items: ListenLaterItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useListenLater() {
  const [items, setItems] = useState<ListenLaterItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(readAll());
    sync(); // hydrate after mount (SSR renders an empty list)
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isSaved = useCallback(
    (episodeId: string) => items.some((i) => i.episodeId === episodeId),
    [items],
  );

  const toggle = useCallback(
    (item: Omit<ListenLaterItem, "savedAt">) => {
      const all = readAll();
      const next = all.some((i) => i.episodeId === item.episodeId)
        ? all.filter((i) => i.episodeId !== item.episodeId)
        : [{ ...item, savedAt: new Date().toISOString() }, ...all];
      writeAll(next);
    },
    [],
  );

  const remove = useCallback((episodeId: string) => {
    writeAll(readAll().filter((i) => i.episodeId !== episodeId));
  }, []);

  return { items, isSaved, toggle, remove };
}
