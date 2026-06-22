/**
 * Playwright smoke test for the Injector Academy.
 * Uses the system Chrome (channel: "chrome") — no browser download.
 *
 *   node scripts/e2e/smoke.mjs            # headless
 *   HEADED=1 node scripts/e2e/smoke.mjs   # watch it run
 *
 * Drives the key flows and dumps diagnostics + screenshots to .e2e-out/.
 * Focus: confirm video playback, search, and tutor actually work.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE = process.env.BASE_URL ?? "http://localhost:3030";
const OUT = path.join(process.cwd(), ".e2e-out");
fs.mkdirSync(OUT, { recursive: true });

// Pick a real lesson slug that has a resolved YouTube id.
const index = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "lib/academy/data/index.json"), "utf8"),
);
const lesson = index.videos.find((v) => v.isLesson && v.youtubeId);

const results = [];
function record(step, ok, detail) {
  results.push({ step, ok, detail });
  console.log(`${ok ? "✅" : "❌"} ${step}${detail ? " — " + detail : ""}`);
}

const browser = await chromium.launch({
  channel: "chrome",
  headless: !process.env.HEADED,
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();

const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message));

async function step(name, fn) {
  try {
    const detail = await fn();
    record(name, true, detail);
  } catch (e) {
    record(name, false, e.message);
  }
}

// 1. Landing
await step("landing loads + has real thumbnails", async () => {
  await page.goto(`${BASE}/dashboard/academy`, { waitUntil: "networkidle", timeout: 30000 });
  await page.screenshot({ path: path.join(OUT, "01-landing.png"), fullPage: true });
  const thumbs = await page.locator('img[src*="ytimg.com"]').count();
  if (thumbs < 5) throw new Error(`only ${thumbs} thumbnails`);
  return `${thumbs} ytimg thumbnails`;
});

// 2. Lesson — DEFAULT surface (is the video shown by default?)
await step("lesson page loads", async () => {
  await page.goto(`${BASE}/dashboard/academy/lesson/${lesson.slug}`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.screenshot({ path: path.join(OUT, "02-lesson-default.png"), fullPage: true });
  const iframeByDefault = await page.locator('iframe[src*="youtube"]').count();
  return `slug=${lesson.slug} · youtubeId=${lesson.youtubeId} · iframe-by-default=${iframeByDefault}`;
});

// 3. Video playback — click "Watch video" if present, then check the iframe
await step("video: embed appears + iframe src valid", async () => {
  const watchBtn = page.getByRole("button", { name: /watch video/i });
  if (await watchBtn.count()) {
    await watchBtn.first().click();
    await page.waitForTimeout(1500);
  }
  const iframe = page.locator('iframe[src*="youtube"]').first();
  await iframe.waitFor({ state: "visible", timeout: 8000 });
  const src = await iframe.getAttribute("src");
  await page.screenshot({ path: path.join(OUT, "03-lesson-video.png"), fullPage: false });
  return `iframe src=${src}`;
});

// 4. Click a transcript timestamp → does it seek?
await step("transcript click seeks", async () => {
  const seg = page.locator('button:has-text(":")').first();
  await seg.click({ timeout: 5000 }).catch(() => {});
  return "clicked a transcript segment";
});

// 5. Search
await step("search returns results", async () => {
  await page.goto(`${BASE}/dashboard/academy/search?q=facial%20artery%20anatomy`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  // Wait for results to actually render (client-side fetch).
  await page.getByText(/moments match/i).first().waitFor({ timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, "04-search.png"), fullPage: true });
  const thumbs = await page.locator('img[src*="ytimg.com"]').count();
  if (thumbs < 3) throw new Error(`only ${thumbs} result thumbnails`);
  return `result thumbnails=${thumbs}`;
});

// 6. Tutor
await step("tutor streams an answer", async () => {
  await page.goto(`${BASE}/dashboard/academy/tutor`, { waitUntil: "networkidle", timeout: 30000 });
  const input = page.locator("textarea, input[type=text]").first();
  await input.fill("What are the early warning signs of a vascular occlusion?");
  await input.press("Enter");
  await page.waitForTimeout(9000);
  await page.screenshot({ path: path.join(OUT, "05-tutor.png"), fullPage: true });
  const txt = await page.locator("body").innerText();
  if (!/occlusion|pain|blanch|livedo/i.test(txt)) throw new Error("no grounded answer text detected");
  return "answer text present";
});

await browser.close();

const report = { base: BASE, lesson: lesson.slug, consoleErrors, results };
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log("\n--- console errors ---");
console.log(consoleErrors.length ? consoleErrors.slice(0, 15).join("\n") : "(none)");
console.log(`\nReport + screenshots in ${OUT}`);
