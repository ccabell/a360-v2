/**
 * Types for A360 Tube — an intelligent navigator over the entire ingested
 * YouTube aesthetics corpus (the curated `youtube_videos` table, 2,548 videos
 * tagged with anatomy / concern / treatment / channel / content-type).
 *
 * All data is baked to JSON under lib/tube/data/ at build time; the app reads
 * only the baked JSON.
 */

export interface TubeVideo {
  /** YouTube video id (real — used for thumbnail + embed + watch link). */
  id: string;
  title: string;
  url: string;
  /** Source channel (manufacturer_name), e.g. "drtimpearce". */
  channel: string;
  audience: string | null;
  contentType: string | null;
  treatments: string[];
  anatomy: string[];
  concerns: string[];
  summary: string;
  patientSafe: boolean;
  /** True when enriched from the curated youtube_videos table (tags + summary). */
  tagged: boolean;
  /** Whether a transcript exists (chunk_count > 0). */
  hasTranscript: boolean;
  chunkCount: number;
}

export interface FacetValue {
  value: string;
  label: string;
  count: number;
}

export interface TubeFacets {
  anatomy: FacetValue[];
  concerns: FacetValue[];
  treatments: FacetValue[];
  channels: FacetValue[];
  contentTypes: FacetValue[];
  audiences: FacetValue[];
}

export interface TubeIndex {
  generatedAt: string;
  stats: {
    videos: number;
    tagged: number;
    channels: number;
    withTranscript: number;
    anatomyAreas: number;
    concerns: number;
    treatments: number;
  };
}
