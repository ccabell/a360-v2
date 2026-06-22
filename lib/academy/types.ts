/**
 * Shared types for the Tim Pearce Injector Academy.
 *
 * All content is derived deterministically at build time from the
 * `youtube_tim_pearce` corpus and baked into JSON under `lib/academy/data/`.
 * The running app reads only the baked JSON — it never depends on the live DB.
 */

/** A cleaned, time-anchored transcript segment (≈60s of speech). */
export interface TranscriptSegment {
  /** Index of this segment within its video (0-based, time-ordered). */
  i: number;
  /** Segment start, in whole seconds (deep-link anchor). */
  start: number;
  /** Segment end, in whole seconds. */
  end: number;
  /** Cleaned, de-duplicated transcript text for this segment. */
  text: string;
}

/** A single chapter marker, derived from grouped segments. */
export interface Chapter {
  /** Chapter start, in whole seconds. */
  start: number;
  /** Short label summarising the chapter. */
  label: string;
  /** Index of the first segment in this chapter. */
  segmentIndex: number;
}

/** A cited key-point extracted from a video, always anchored to a timestamp. */
export interface KeyPoint {
  /** The point, in Tim Pearce's framing (grounded in the cited segment). */
  text: string;
  /** Second offset this point is drawn from (deep-link anchor). */
  start: number;
  /** Segment index this point was derived from. */
  segmentIndex: number;
}

/** Lightweight per-video record stored in the index (no transcript). */
export interface VideoSummary {
  /** Stable slug derived from the title. */
  slug: string;
  /** Verbatim display title (de-sanitised from filename artifacts). */
  title: string;
  /** Original sanitised filename from the corpus (for traceability). */
  filename: string;
  /** Total duration in seconds. */
  duration: number;
  /** Number of cleaned transcript segments. */
  segmentCount: number;
  /** Topic ids this video is tagged with (reference topics). */
  topics: string[];
  /** Curriculum module ids this video belongs to. */
  modules: string[];
  /** Primary module id (best single fit) for course placement. */
  primaryModule: string;
  /** Whether this is a substantial lesson (long-form) vs a short clip. */
  isLesson: boolean;
  /** Best-effort resolved YouTube video id, or null if unresolved. */
  youtubeId: string | null;
  /** First ~280 chars of cleaned transcript, for previews/search. */
  excerpt: string;
}

/** Full per-video record (written to its own JSON file). */
export interface VideoDetail extends VideoSummary {
  segments: TranscriptSegment[];
  chapters: Chapter[];
  keyPoints: KeyPoint[];
  /** Full cleaned, stitched transcript (continuous prose). */
  transcript: string;
  /** Related video slugs (shared topics), ranked. */
  related: string[];
}

/** A curriculum module — top-level course unit. */
export interface Module {
  id: string;
  title: string;
  /** One-line description of what the module covers. */
  blurb: string;
  /** Lucide icon name. */
  icon: string;
  /** Ordered topic ids that belong to this module. */
  topics: string[];
  /** Display order. */
  order: number;
}

/** A reference-guide topic — encyclopedia entry. */
export interface Topic {
  id: string;
  title: string;
  /** Short description of the clinical topic. */
  blurb: string;
  /** Module this topic primarily belongs to. */
  module: string;
  /** Keyword matchers used to tag videos/segments (for traceability). */
  keywords: string[];
  /** Clinical category for grouping/colour. */
  category: TopicCategory;
}

export type TopicCategory =
  | "safety"
  | "complications"
  | "anatomy"
  | "technique"
  | "regional"
  | "toxin"
  | "patient"
  | "business"
  | "wellness";

/** A topic entry as rendered in the Reference Guide: aggregated citations. */
export interface TopicEntry {
  topic: Topic;
  /** Video segments matching this topic, ranked by relevance. */
  citations: TopicCitation[];
  /** Podcast corroboration chunks (cross-corpus). */
  podcast: PodcastCitation[];
  /** Related topic ids. */
  related: string[];
}

export interface TopicCitation {
  videoSlug: string;
  videoTitle: string;
  youtubeId: string | null;
  start: number;
  end: number;
  segmentIndex: number;
  text: string;
  /** Relevance score (keyword hits, weighted). */
  score: number;
}

export interface PodcastCitation {
  episodeTitle: string;
  showName: string | null;
  start: number | null;
  text: string;
  url: string | null;
}

/** The top-level index loaded by most pages. */
export interface AcademyIndex {
  generatedAt: string;
  stats: {
    videos: number;
    lessons: number;
    segments: number;
    totalDurationSeconds: number;
    topics: number;
    modules: number;
  };
  modules: Module[];
  topics: Topic[];
  videos: VideoSummary[];
}
