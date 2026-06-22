/**
 * Build-time generator for A360 Tube.
 *
 * Uses the curated `youtube_videos` table only — the videos that are already
 * tagged (anatomy / concern / treatment / summary) and ready to navigate.
 * (The broader untagged transcript corpus is intentionally excluded until it's
 * enriched.)
 *
 *   node scripts/tube/generate-tube-data.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "lib", "tube", "data");
const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, ".env.local"), "utf8").split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }),
);
const URL = env.RAG_SUPABASE_URL, KEY = env.RAG_SUPABASE_KEY;
if (!URL || !KEY) throw new Error("RAG_SUPABASE_URL/KEY missing");
const H = { apikey: KEY, Authorization: `Bearer ${KEY}` };

async function fetchAll(cols) {
  const rows = [];
  let offset = 0;
  const page = 1000;
  while (true) {
    const res = await fetch(`${URL}/rest/v1/youtube_videos?select=${cols}&order=video_id`, {
      headers: { ...H, "Range-Unit": "items", Range: `${offset}-${offset + page - 1}` },
    });
    const batch = await res.json();
    if (!Array.isArray(batch)) throw new Error(JSON.stringify(batch).slice(0, 200));
    rows.push(...batch);
    if (batch.length < page) break;
    offset += page;
  }
  return rows;
}

const titleCase = (s) =>
  String(s).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bTv\b/, "TV");
const CHANNEL_LABELS = {
  drtimpearce: "Dr Tim Pearce", waveplasticsurgery: "Wave Plastic Surgery", aafe_tv: "AAFE",
  btlaestheticsint: "BTL Aesthetics", lumenisaesthetics: "Lumenis", erchoniaemea: "Erchonia",
  sciton: "Sciton", botoxcosmetic: "BOTOX Cosmetic", galdermaint: "Galderma",
  skinceuticals: "SkinCeuticals", revisionskincare: "Revision Skincare", inmodesolutions: "InMode",
};
const channelLabel = (c) => CHANNEL_LABELS[c] ?? titleCase(c);

const rows = await fetchAll(
  "video_id,video_title,video_url,manufacturer_name,audience,content_type,treatments,anatomy_areas,concerns,summary,patient_safe,chunk_count",
);
console.log(`Fetched ${rows.length} curated youtube_videos.`);

const videos = rows
  .filter((r) => r.video_id && r.video_title)
  .map((r) => ({
    id: r.video_id,
    title: r.video_title,
    url: r.video_url ?? `https://www.youtube.com/watch?v=${r.video_id}`,
    channel: r.manufacturer_name ?? "unknown",
    audience: r.audience ?? null,
    contentType: r.content_type ?? null,
    treatments: r.treatments ?? [],
    anatomy: r.anatomy_areas ?? [],
    concerns: r.concerns ?? [],
    summary: r.summary ?? "",
    patientSafe: Boolean(r.patient_safe),
    tagged: true,
    hasTranscript: (r.chunk_count ?? 0) > 0,
    chunkCount: r.chunk_count ?? 0,
  }));

function facet(key, isArray = true, label = titleCase) {
  const m = new Map();
  for (const v of videos) {
    const vals = isArray ? v[key] : v[key] != null ? [v[key]] : [];
    for (const x of vals) m.set(x, (m.get(x) ?? 0) + 1);
  }
  return [...m.entries()].map(([value, count]) => ({ value, label: label(value), count })).sort((a, b) => b.count - a.count);
}
const facets = {
  anatomy: facet("anatomy"), concerns: facet("concerns"), treatments: facet("treatments"),
  channels: facet("channel", false, channelLabel), contentTypes: facet("contentType", false),
  audiences: facet("audience", false),
};
const index = {
  generatedAt: "",
  stats: {
    videos: videos.length,
    tagged: videos.length,
    channels: facets.channels.length,
    withTranscript: videos.filter((v) => v.hasTranscript).length,
    anatomyAreas: facets.anatomy.length,
    concerns: facets.concerns.length,
    treatments: facets.treatments.length,
  },
};

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "videos.json"), JSON.stringify(videos));
fs.writeFileSync(path.join(OUT, "facets.json"), JSON.stringify(facets, null, 2));
fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify(index, null, 2));
console.log(`DONE: ${index.stats.videos} videos · ${index.stats.channels} channels · ${index.stats.anatomyAreas} areas / ${index.stats.concerns} concerns / ${index.stats.treatments} treatments`);
