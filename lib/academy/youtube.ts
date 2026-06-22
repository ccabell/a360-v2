/**
 * YouTube thumbnail helpers.
 *
 * We resolved real YouTube ids for ~407/408 videos (see video_id_map.json), so
 * every lesson can show a real thumbnail with zero downloads/storage —
 * `i.ytimg.com` serves them directly. `hqdefault` (480×360) exists for every
 * video; `maxresdefault` is sharper but missing on some, so it's opt-in.
 */

export type ThumbQuality = "mq" | "hq" | "sd" | "max";

const FILE: Record<ThumbQuality, string> = {
  mq: "mqdefault", // 320×180
  hq: "hqdefault", // 480×360 (always present)
  sd: "sddefault", // 640×480
  max: "maxresdefault", // 1280×720 (not always present)
};

/** Real thumbnail URL for a video id, or null when the id is unresolved. */
export function youtubeThumb(
  id: string | null | undefined,
  quality: ThumbQuality = "hq",
): string | null {
  if (!id) return null;
  return `https://i.ytimg.com/vi/${id}/${FILE[quality]}.jpg`;
}

/** Watch URL, optionally deep-linked to a second. */
export function youtubeWatch(id: string, startSec?: number): string {
  const t = startSec ? `&t=${Math.floor(startSec)}s` : "";
  return `https://www.youtube.com/watch?v=${id}${t}`;
}
