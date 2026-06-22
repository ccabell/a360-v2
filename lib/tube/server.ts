/**
 * Server-side loaders for the baked A360 Tube data. Reads JSON from disk,
 * cached for the process lifetime.
 */
import fs from "fs";
import path from "path";
import type { TubeVideo, TubeFacets, TubeIndex } from "./types";

const DATA = path.join(process.cwd(), "lib", "tube", "data");

let _videos: TubeVideo[] | null = null;
let _facets: TubeFacets | null = null;
let _index: TubeIndex | null = null;

function read<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(DATA, file), "utf8")) as T;
}

export function getTubeVideos(): TubeVideo[] {
  if (!_videos) _videos = read<TubeVideo[]>("videos.json");
  return _videos;
}
export function getTubeFacets(): TubeFacets {
  if (!_facets) _facets = read<TubeFacets>("facets.json");
  return _facets;
}
export function getTubeIndex(): TubeIndex {
  if (!_index) _index = read<TubeIndex>("index.json");
  return _index;
}

/** A curated, high-signal set for the landing (varied channels + tagged). */
export function getTubeFeatured(limit = 12): TubeVideo[] {
  const byChannel = new Map<string, TubeVideo[]>();
  for (const v of getTubeVideos()) {
    if (v.anatomy.length === 0 && v.concerns.length === 0) continue;
    if (!byChannel.has(v.channel)) byChannel.set(v.channel, []);
    byChannel.get(v.channel)!.push(v);
  }
  // Round-robin across channels for variety.
  const lists = [...byChannel.values()].map((l) =>
    [...l].sort((a, b) => b.chunkCount - a.chunkCount),
  );
  const out: TubeVideo[] = [];
  let i = 0;
  while (out.length < limit && lists.some((l) => l.length)) {
    const l = lists[i % lists.length];
    if (l.length) out.push(l.shift()!);
    i++;
  }
  return out;
}
