/**
 * Server-side loaders for baked academy data.
 *
 * These run only on the server (they read JSON from disk) and are cached for
 * the process lifetime. Pages import these in Server Components; the heavy
 * per-video transcript JSON is loaded only on the lesson route.
 */

import fs from "fs";
import path from "path";
import type {
  AcademyIndex,
  Module,
  Topic,
  TopicEntry,
  VideoDetail,
  VideoIllustrations,
  VideoSummary,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "lib", "academy", "data");

let _index: AcademyIndex | null = null;
let _topics: TopicEntry[] | null = null;
let _illustrations: VideoIllustrations[] | null = null;
const _videoCache = new Map<string, VideoDetail | null>();

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8")) as T;
}

export function getIndex(): AcademyIndex {
  if (!_index) _index = readJson<AcademyIndex>("index.json");
  return _index;
}

export function getModules(): Module[] {
  return [...getIndex().modules].sort((a, b) => a.order - b.order);
}

export function getModule(id: string): Module | undefined {
  return getIndex().modules.find((m) => m.id === id);
}

export function getTopics(): Topic[] {
  return getIndex().topics;
}

export function getTopic(id: string): Topic | undefined {
  return getIndex().topics.find((t) => t.id === id);
}

export function getVideos(): VideoSummary[] {
  return getIndex().videos;
}

/** Lessons (substantial videos) for a module, ranked by depth. */
export function getModuleVideos(
  moduleId: string,
  opts: { lessonsOnly?: boolean } = {}
): VideoSummary[] {
  const vids = getIndex().videos.filter((v) =>
    opts.lessonsOnly ? v.isLesson : true
  );
  return vids
    .filter((v) => v.modules.includes(moduleId))
    .sort((a, b) => {
      // primary module first, then by depth
      const ap = a.primaryModule === moduleId ? 1 : 0;
      const bp = b.primaryModule === moduleId ? 1 : 0;
      if (ap !== bp) return bp - ap;
      return b.segmentCount - a.segmentCount;
    });
}

/** Videos tagged with a topic, ranked by relevance to that topic. */
export function getTopicVideos(topicId: string): VideoSummary[] {
  return getIndex()
    .videos.filter((v) => v.topics.includes(topicId))
    .sort((a, b) => {
      const ai = a.topics.indexOf(topicId);
      const bi = b.topics.indexOf(topicId);
      if (ai !== bi) return ai - bi; // earlier in topic list = stronger
      return b.segmentCount - a.segmentCount;
    });
}

export function getAllTopicEntries(): TopicEntry[] {
  if (!_topics) _topics = readJson<TopicEntry[]>("topics.json");
  return _topics;
}

export function getTopicEntry(topicId: string): TopicEntry | undefined {
  return getAllTopicEntries().find((t) => t.topic.id === topicId);
}

export function getVideo(slug: string): VideoDetail | null {
  if (_videoCache.has(slug)) return _videoCache.get(slug)!;
  const file = path.join(DATA_DIR, "videos", `${slug}.json`);
  let detail: VideoDetail | null = null;
  try {
    if (fs.existsSync(file)) {
      detail = JSON.parse(fs.readFileSync(file, "utf8")) as VideoDetail;
    }
  } catch {
    detail = null;
  }
  _videoCache.set(slug, detail);
  return detail;
}

export function getVideoSummary(slug: string): VideoSummary | undefined {
  return getIndex().videos.find((v) => v.slug === slug);
}

/** Curated "featured" lessons for the academy landing page. */
export function getFeaturedLessons(limit = 6): VideoSummary[] {
  // Prefer safety-critical, substantial lessons with a YouTube-style title.
  const priorityModules = ["safety", "anatomy", "regional", "complications"];
  return getIndex()
    .videos.filter((v) => v.isLesson)
    .sort((a, b) => {
      const ap = priorityModules.indexOf(a.primaryModule);
      const bp = priorityModules.indexOf(b.primaryModule);
      const as = ap === -1 ? 99 : ap;
      const bs = bp === -1 ? 99 : bp;
      if (as !== bs) return as - bs;
      return b.segmentCount - a.segmentCount;
    })
    .slice(0, limit);
}

/**
 * Extracted teaching-illustration frames (anatomy diagrams, artery maps, danger
 * zones, injection markups), tagged to video + timestamp. Empty array if the
 * manifest has not been generated yet (the gallery degrades gracefully).
 */
export function getIllustrations(): VideoIllustrations[] {
  if (_illustrations) return _illustrations;
  const file = path.join(DATA_DIR, "illustrations.json");
  try {
    _illustrations = fs.existsSync(file)
      ? (JSON.parse(fs.readFileSync(file, "utf8")) as VideoIllustrations[])
      : [];
  } catch {
    _illustrations = [];
  }
  return _illustrations;
}

/** Illustration set for a single video by slug, if any. */
export function getVideoIllustrations(
  slug: string
): VideoIllustrations | undefined {
  return getIllustrations().find((v) => v.slug === slug);
}

/** Flat list of all illustration frames with their parent video context. */
export function getAllIllustrationFrames() {
  return getIllustrations().flatMap((v) =>
    v.frames.map((f) => ({
      ...f,
      videoId: v.videoId,
      slug: v.slug,
      title: v.title,
      topics: v.topics,
      primaryModule: v.primaryModule,
    }))
  );
}

/** Format seconds as H:MM:SS or M:SS. */
export function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
