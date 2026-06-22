/**
 * Illustration extraction pipeline for the Injector Academy.
 *
 * For a curated set of high-value (anatomy / danger-zone / artery / markup)
 * videos, this script:
 *   1. Downloads the video with yt-dlp (firefox cookies — YouTube bot-gates).
 *   2. Scene-cuts teaching frames with ffmpeg, recording each frame's pts_time.
 *   3. Maps every frame → nearest cleaned transcript segment → deep-link target.
 *   4. Writes JPGs to public/academy/illustrations/<id>/ and a committed
 *      manifest to lib/academy/data/illustrations.json.
 *
 * Re-runnable and incremental: a video whose frames already exist is skipped
 * unless --force is passed. Downloads land in a scratch dir and are deleted
 * after frame extraction (only the frames + manifest are committed).
 *
 * Usage:
 *   npx tsx scripts/academy/extract-illustrations.ts            # curated set
 *   npx tsx scripts/academy/extract-illustrations.ts <id> <id>  # specific ids
 *   npx tsx scripts/academy/extract-illustrations.ts --force
 */

import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public", "academy", "illustrations");
const DATA_DIR = path.join(ROOT, "lib", "academy", "data");
const MANIFEST = path.join(DATA_DIR, "illustrations.json");
const SCRATCH = path.join(os.tmpdir(), "academy-illustrations");

// Scene-cut sensitivity (0..1). 0.40 catches slide/diagram changes well.
const SCENE_THRESHOLD = 0.4;

/** Curated high-value videos (id → why). Ranked by anatomy/danger relevance. */
const CURATED: { id: string; note: string }[] = [
  { id: "dPbQWrd6iZs", note: "Facial muscle anatomy (POC)" },
  { id: "fKgjFGwWZAs", note: "Never put a needle here — danger zones" },
  { id: "cQPCALtdCvk", note: "Columella artery occlusion risk" },
  { id: "QCnfmSbyyB4", note: "Philtrum/columella occlusion risk" },
  { id: "JOKBvaMcBdI", note: "Piriform fossa danger anatomy" },
  { id: "75ObAiOdV48", note: "Top 6 aesthetics anatomy lessons" },
  { id: "u9A0p7zlVss", note: "Filler blindness avoidance" },
  { id: "Ee9Vs6fZ_Ew", note: "Zygomaticofacial artery" },
  { id: "5MDtjQIOOIM", note: "Ligament lesson — ageing anatomy" },
  { id: "mJlAA4gpjvc", note: "Deep fat pads — facial thirds" },
  { id: "3XG5ovj4Z0g", note: "Tear trough / orbit anatomy" },
  { id: "R6qHwpmHupI", note: "Nose tip filler safe technique" },
  { id: "gS7JC02SfsI", note: "Vascular occlusion & necrosis prevention" },
  { id: "vCBx4Kwl6D4", note: "Necrosis case — infraorbital artery" },
  { id: "UdQgK7LDLD8", note: "Most dangerous injection zones" },
  { id: "9dUshGy86ac", note: "Compression necrosis explained" },
  { id: "GcRhACNBGnA", note: "Advanced botox anatomy — lower face" },
  { id: "zRvItHDfWLY", note: "Jawline injection points & safety" },
];

interface FrameRecord {
  file: string; // public path, e.g. /academy/illustrations/<id>/scene_003.jpg
  t: number; // frame timestamp in seconds
  segmentIndex: number | null;
  start: number; // deep-link second (segment start, or floor(t))
}

interface VideoIllustrations {
  videoId: string;
  slug: string | null;
  title: string;
  topics: string[];
  primaryModule: string;
  frameCount: number;
  frames: FrameRecord[];
}

interface VideoIdMap {
  [title: string]: { video_id: string };
}

interface IndexVideo {
  slug: string;
  title: string;
  topics: string[];
  primaryModule: string;
}

function norm(s: string): string {
  return s.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}

function loadIndexLookup() {
  const idx = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "index.json"), "utf8")
  ) as { videos: IndexVideo[] };
  const map = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "video_id_map.json"), "utf8")
  ) as VideoIdMap;

  // id → title
  const titleById = new Map<string, string>();
  for (const [title, info] of Object.entries(map)) {
    titleById.set(info.video_id, title);
  }
  // normalized title → index video
  const videoByNormTitle = new Map<string, IndexVideo>();
  for (const v of idx.videos) videoByNormTitle.set(norm(v.title), v);

  return { titleById, videoByNormTitle };
}

/** Load a video's cleaned segments (for frame→segment mapping). */
function loadSegments(slug: string): { start: number }[] {
  const file = path.join(DATA_DIR, "videos", `${slug}.json`);
  if (!fs.existsSync(file)) return [];
  const detail = JSON.parse(fs.readFileSync(file, "utf8")) as {
    segments: { start: number }[];
  };
  return detail.segments ?? [];
}

/** Find the index of the last segment whose start <= t. */
function segmentForTime(segments: { start: number }[], t: number): number | null {
  if (segments.length === 0) return null;
  let idx = 0;
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].start <= t) idx = i;
    else break;
  }
  return idx;
}

/** Parse ffmpeg metadata file: lines `pts_time:NNN.NNN` in frame order. */
function parsePtsTimes(framesTxt: string): number[] {
  const times: number[] = [];
  for (const line of framesTxt.split("\n")) {
    const m = line.match(/pts_time:([\d.]+)/);
    if (m) times.push(parseFloat(m[1]));
  }
  return times;
}

function run(cmd: string, args: string[], opts: { cwd?: string } = {}): void {
  execFileSync(cmd, args, {
    cwd: opts.cwd,
    stdio: ["ignore", "ignore", "inherit"],
  });
}

function extractVideo(
  id: string,
  lookup: ReturnType<typeof loadIndexLookup>,
  force: boolean
): VideoIllustrations | null {
  const outDir = path.join(PUBLIC_DIR, id);
  const title = lookup.titleById.get(id) ?? id;
  const indexVideo = lookup.videoByNormTitle.get(norm(title));
  const slug = indexVideo?.slug ?? null;
  const segments = slug ? loadSegments(slug) : [];

  const framesTxtPath = path.join(outDir, "frames.txt");
  const alreadyHasFrames =
    fs.existsSync(outDir) &&
    fs.readdirSync(outDir).some((f) => f.endsWith(".jpg"));

  // If frames already exist but we have a frames.txt, just (re)build the record.
  if (alreadyHasFrames && fs.existsSync(framesTxtPath) && !force) {
    console.log(`  [skip extract] ${id} — frames + frames.txt present`);
    return buildRecord(id, outDir, framesTxtPath, title, indexVideo, segments);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(SCRATCH, { recursive: true });
  const videoPath = path.join(SCRATCH, `${id}.mp4`);

  // 1. Download (firefox cookies required — YouTube bot-gates).
  //
  // Format selection: prefer a single PROGRESSIVE stream that already contains
  // a real video track (format 18 = 360p combined mp4), then a properly muxed
  // <=720p video+audio, then any. The naive `best[ext=mp4]` selector sometimes
  // picked a DASH video-only fragment that wrote a tiny, undecodable file —
  // the cause of the earlier "Invalid data found when processing input".
  // We force a clean container with --remux-video mp4 and re-download if a
  // stale/partial file is present.
  const stale =
    fs.existsSync(videoPath) && fs.statSync(videoPath).size < 1_000_000;
  if (stale) fs.rmSync(videoPath);
  if (!fs.existsSync(videoPath)) {
    console.log(`  [download] ${id} …`);
    run("yt-dlp", [
      "--cookies-from-browser",
      "firefox",
      "--no-playlist",
      "-f",
      "18/b[height<=720][vcodec!=none][acodec!=none]/bv*[height<=720]+ba/b[height<=720]/b",
      "--remux-video",
      "mp4",
      `https://www.youtube.com/watch?v=${id}`,
      "-o",
      videoPath,
    ]);
  }

  // 2. Scene-cut frames + record pts_time for each.
  console.log(`  [frames] ${id} …`);
  // Clear stale jpgs if forcing.
  if (force) {
    for (const f of fs.readdirSync(outDir))
      if (f.endsWith(".jpg")) fs.rmSync(path.join(outDir, f));
  }
  // Run from outDir with bare filenames: ffmpeg's filter parser treats ':' in
  // a Windows drive path (C:/…) as an option separator, so absolute paths in
  // `metadata=print:file=` break. Relative paths + cwd avoid the colon.
  run(
    "ffmpeg",
    [
      "-y",
      "-i",
      videoPath,
      "-vf",
      `select='gt(scene,${SCENE_THRESHOLD})',metadata=print:file=frames.txt`,
      "-vsync",
      "vfr",
      "-q:v",
      "3",
      "scene_%03d.jpg",
    ],
    { cwd: outDir }
  );

  // 3. Clean up the downloaded video (only frames are committed).
  try {
    fs.rmSync(videoPath);
  } catch {
    /* best effort */
  }

  return buildRecord(id, outDir, framesTxtPath, title, indexVideo, segments);
}

function buildRecord(
  id: string,
  outDir: string,
  framesTxtPath: string,
  title: string,
  indexVideo: IndexVideo | undefined,
  segments: { start: number }[]
): VideoIllustrations {
  const jpgs = fs
    .readdirSync(outDir)
    .filter((f) => /^scene_\d+\.jpg$/.test(f))
    .sort();
  const times = fs.existsSync(framesTxtPath)
    ? parsePtsTimes(fs.readFileSync(framesTxtPath, "utf8"))
    : [];

  const frames: FrameRecord[] = jpgs.map((file, i) => {
    const t = times[i] ?? 0;
    const segIdx = segmentForTime(segments, t);
    // Deep-link to the exact second the frame appears (the YouTube embed seeks
    // to any ?t=). segmentIndex is retained for transcript context. This is
    // more precise than snapping to the (up to 60s-long) segment start.
    const start = Math.floor(t);
    return {
      file: `/academy/illustrations/${id}/${file}`,
      t: Math.round(t * 10) / 10,
      segmentIndex: segIdx,
      start,
    };
  });

  return {
    videoId: id,
    slug: indexVideo?.slug ?? null,
    title,
    topics: indexVideo?.topics ?? [],
    primaryModule: indexVideo?.primaryModule ?? "",
    frameCount: frames.length,
    frames,
  };
}

function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const explicitIds = args.filter((a) => !a.startsWith("--"));
  const ids =
    explicitIds.length > 0 ? explicitIds : CURATED.map((c) => c.id);

  const lookup = loadIndexLookup();

  // Merge with any existing manifest so partial runs accumulate.
  const existing: Record<string, VideoIllustrations> = fs.existsSync(MANIFEST)
    ? Object.fromEntries(
        (JSON.parse(fs.readFileSync(MANIFEST, "utf8")) as VideoIllustrations[]).map(
          (v) => [v.videoId, v]
        )
      )
    : {};

  console.log(`Extracting illustrations for ${ids.length} video(s)…`);
  for (const id of ids) {
    try {
      const rec = extractVideo(id, lookup, force);
      if (rec && rec.frameCount > 0) {
        existing[id] = rec;
        console.log(`  ✓ ${id} — ${rec.frameCount} frames (${rec.title.slice(0, 50)})`);
      } else {
        console.log(`  ✗ ${id} — no frames produced`);
      }
    } catch (err) {
      console.error(
        `  ✗ ${id} — ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  const manifest = Object.values(existing).sort(
    (a, b) => b.frameCount - a.frameCount
  );
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  const totalFrames = manifest.reduce((n, v) => n + v.frameCount, 0);
  console.log(
    `\nManifest written: ${manifest.length} videos, ${totalFrames} frames → ${path.relative(ROOT, MANIFEST)}`
  );
}

main();
