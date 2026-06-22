/**
 * Classify each extracted illustration frame as a real ILLUSTRATION (anatomy
 * diagram, 3D model, annotated/marked-up figure, drawn schematic) vs a PHOTO
 * (talking-head, live procedure, plain video screenshot). Keeps only the real
 * illustrations.
 *
 * Uses Claude (vision) directly via ANTHROPIC_API_KEY. Concurrency-limited.
 * Writes `kind` onto every frame in lib/academy/data/illustrations.json and
 * prints a keep/drop summary. Re-runnable (skips frames already classified
 * unless --force).
 *
 *   node scripts/academy/classify-illustrations.mjs [--force]
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const MANIFEST = path.join(ROOT, "lib/academy/data/illustrations.json");
const PUB = path.join(ROOT, "public/academy/illustrations");
const MODEL = "claude-haiku-4-5-20251001";
const CONCURRENCY = 4;
const FORCE = process.argv.includes("--force");
let loggedStatuses = 0;
const statusCounts = {};

// Load ANTHROPIC_API_KEY from .env.local.
const env = Object.fromEntries(
  fs
    .readFileSync(path.join(ROOT, ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);
const KEY = env.ANTHROPIC_API_KEY;
if (!KEY) throw new Error("ANTHROPIC_API_KEY missing in .env.local");

const PROMPT =
  "You are sorting frames extracted from aesthetic-medicine training videos. " +
  "Classify THIS image as exactly one word:\n" +
  "- 'illustration' = an anatomical illustration, medical diagram, labelled/annotated figure, " +
  "3D anatomy model (skull/arteries/muscles), drawn schematic, or a clinical figure with markup/overlays.\n" +
  "- 'photo' = a photo/screenshot of a real person, a talking head, a live injection/procedure, " +
  "a slide of text, a logo/title card, or any plain camera footage.\n" +
  "Answer with ONLY the single word 'illustration' or 'photo'.";

async function classify(absPath) {
  const b64 = fs.readFileSync(absPath).toString("base64");
  const body = {
    model: MODEL,
    max_tokens: 5,
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } },
          { type: "text", text: PROMPT },
        ],
      },
    ],
  };
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      statusCounts[res.status] = (statusCounts[res.status] ?? 0) + 1;
      if (res.status === 429 || res.status >= 500) {
        if (loggedStatuses++ < 5) console.error(`  retry status ${res.status}`);
        throw new Error("retry " + res.status);
      }
      const json = await res.json();
      const word = (json?.content?.[0]?.text ?? "").toLowerCase();
      if (!word && loggedStatuses++ < 5)
        console.error(`  empty content @${res.status}: ${JSON.stringify(json).slice(0, 160)}`);
      return word.includes("illustration") ? "illustration" : "photo";
    } catch (e) {
      if (loggedStatuses++ < 5) console.error(`  attempt ${attempt} err: ${e.message}`);
      await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
    }
  }
  return "unknown"; // persistent failure — do NOT silently treat as photo
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

// Flatten to a work list.
const work = [];
for (const v of manifest) {
  for (const f of v.frames) {
    if (!FORCE && f.kind && f.kind !== "unknown" && f.kind !== "missing") continue;
    // f.file is the public web path (e.g. /academy/illustrations/<id>/scene_001.jpg).
    work.push({ v, f, abs: path.join(ROOT, "public", f.file) });
  }
}
console.log(`Classifying ${work.length} frames (concurrency ${CONCURRENCY})...`);

let done = 0;
let idx = 0;
async function worker() {
  while (idx < work.length) {
    const job = work[idx++];
    if (!fs.existsSync(job.abs)) {
      job.f.kind = "missing";
    } else {
      job.f.kind = await classify(job.abs);
    }
    done++;
    if (done % 25 === 0) console.log(`  ${done}/${work.length}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

// Persist + summary.
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
let keep = 0,
  drop = 0;
for (const v of manifest) {
  const k = v.frames.filter((f) => f.kind === "illustration").length;
  v.illustrationCount = k;
  keep += k;
  drop += v.frames.length - k;
}
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`\nHTTP status counts: ${JSON.stringify(statusCounts)}`);
console.log(`DONE. illustrations kept: ${keep} · dropped (photo/missing): ${drop}`);
for (const v of manifest) {
  console.log(`  ${v.illustrationCount}/${v.frames.length}  ${v.title.slice(0, 50)}`);
}
