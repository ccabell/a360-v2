/**
 * Build-time generator for A360 Tube — the FULL ingested YouTube aesthetics corpus.
 *
 * Source of truth for the video list = `manufacturer_youtube_transcript`
 * (~11.7k distinct videos with real ids + transcripts). Rich tags
 * (anatomy/concern/treatment/summary) come from the curated `youtube_videos`
 * table (2,548 videos) and are merged on where present.
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

async function count(table) {
  const res = await fetch(`${URL}/rest/v1/${table}?select=video_id`, {
    headers: { ...H, "Range-Unit": "items", Range: "0-0", Prefer: "count=exact" },
  });
  const cr = res.headers.get("content-range") || "/0";
  return parseInt(cr.split("/")[1], 10) || 0;
}

async function page(table, cols, offset, size, order) {
  const res = await fetch(
    `${URL}/rest/v1/${table}?select=${cols}${order ? `&order=${order}` : ""}`,
    { headers: { ...H, "Range-Unit": "items", Range: `${offset}-${offset + size - 1}` } },
  );
  return res.json();
}

async function fetchPaged(table, cols, total, { size = 1000, conc = 8, order } = {}) {
  const offsets = [];
  for (let o = 0; o < total; o += size) offsets.push(o);
  const out = [];
  let i = 0;
  async function worker() {
    while (i < offsets.length) {
      const o = offsets[i++];
      const batch = await page(table, cols, o, size, order);
      if (Array.isArray(batch)) out.push(...batch);
      if (out.length % 25000 < size) console.log(`  …${out.length}/${total}`);
    }
  }
  await Promise.all(Array.from({ length: conc }, worker));
  return out;
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

// 1. Curated rich metadata (2,548).
console.log("Fetching curated youtube_videos…");
const curatedTotal = await count("youtube_videos");
const curatedRows = await fetchPaged(
  "youtube_videos",
  "video_id,audience,content_type,treatments,anatomy_areas,concerns,summary,patient_safe",
  curatedTotal,
  { order: "video_id" },
);
const curated = new Map(curatedRows.filter((r) => r.video_id).map((r) => [r.video_id, r]));
console.log(`  curated: ${curated.size}`);

// 2. Full distinct video list from the transcript table.
console.log("Fetching transcript video list (this pulls the full table to dedupe)…");
const txTotal = await count("manufacturer_youtube_transcript");
const txRows = await fetchPaged(
  "manufacturer_youtube_transcript",
  "video_id,video_title,video_url,manufacturer_name",
  txTotal,
  { order: "video_id", conc: 10 },
);
const byVideo = new Map();
for (const r of txRows) {
  if (!r.video_id) continue;
  const cur = byVideo.get(r.video_id);
  if (cur) cur.chunks++;
  else byVideo.set(r.video_id, { id: r.video_id, title: r.video_title, url: r.video_url, channel: r.manufacturer_name ?? "unknown", chunks: 1 });
}
console.log(`  distinct videos: ${byVideo.size}`);

// 3. Merge.
const videos = [...byVideo.values()]
  .filter((v) => v.title)
  .map((v) => {
    const c = curated.get(v.id);
    return {
      id: v.id,
      title: v.title,
      url: v.url ?? `https://www.youtube.com/watch?v=${v.id}`,
      channel: v.channel,
      audience: c?.audience ?? null,
      contentType: c?.content_type ?? null,
      treatments: c?.treatments ?? [],
      anatomy: c?.anatomy_areas ?? [],
      concerns: c?.concerns ?? [],
      summary: c?.summary ?? "",
      patientSafe: Boolean(c?.patient_safe),
      tagged: Boolean(c),
      hasTranscript: true,
      chunkCount: v.chunks,
    };
  });

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
    tagged: videos.filter((v) => v.tagged).length,
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
console.log(`DONE: ${index.stats.videos} videos (${index.stats.tagged} tagged) · ${index.stats.channels} channels`);
