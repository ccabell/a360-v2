/**
 * Types for A360 Podcast Navigator — intelligent search and browsing over the
 * medical-aesthetics podcast corpus (52 shows, ~11K episodes, ~146K chunks).
 *
 * Data lives in the RAG Supabase (gjqicqldjgvrwmtkliie), same project as
 * the YouTube transcript corpus.
 */

export interface PodcastShow {
  id: string;
  name: string;
  host: string | null;
  description: string | null;
  rss_url: string | null;
  website_url: string | null;
  category: string | null; // "Clinical" | "Business" | "Both"
  artwork_url: string | null;
  episode_count: number;
  latest_episode_date: string | null;
}

export interface PodcastEpisode {
  id: string;
  show_id: string;
  title: string;
  published_date: string | null;
  duration_seconds: number | null;
  enclosure_url: string | null;
  description: string | null;
  transcript_text: string | null;
  summary: string | null;
  speakers: string[] | null;
  guests: string[] | null;
  source_file: string | null;
  is_vectorized: boolean;
  /** Joined show name for display. */
  show_name?: string;
  show_category?: string;
  show_artwork_url?: string;
}

export interface PodcastChunk {
  id: string;
  episode_id: string;
  chunk_index: number;
  chunk_text: string;
  token_count: number | null;
}

export interface PodcastSource {
  id: string; // "S1", "S2", ...
  title: string; // episode title
  showName: string;
  text: string; // chunk content
  episodeId: string;
  chunkIndex: number;
  url: string; // in-app link: /podcast/episodes/{id}
  meta: string; // "Show Name · Chunk 3"
}

export interface PodcastAgent {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  systemPrompt: string;
}

export interface PodcastFacets {
  categories: FacetValue[];
  shows: FacetValue[];
  tagTypes: FacetValue[];
}

export interface FacetValue {
  value: string;
  label: string;
  count: number;
}

export interface PodcastStats {
  shows: number;
  episodes: number;
  transcribed: number;
  chunks: number;
  tags: number;
  hoursEstimate: number;
}
