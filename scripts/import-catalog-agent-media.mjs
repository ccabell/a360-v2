// One-time import: attaches covers, icons (as logo), and mock-screen
// screenshots from the local asset_factory checkout to the 16 catalog-agent
// exchange_agents rows (Sloane, Beacon, etc.) — per Chris's explicit
// instruction (2026-07-10): pull these in now, but DO NOT touch the 9
// existing agents' media (kpi, scribe, tcp, etc. keep what they already have).
//
// Uploads real file bytes into the exchange-media Storage bucket (same bucket
// the admin's manual uploader and Import-from-Asset-Factory panel use), then
// sets cover/logo/screenshots on each row via the same upsert pattern as the
// other seed scripts.
//
// Usage: node scripts/import-catalog-agent-media.mjs
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "..", ".env.local") });

const url = process.env.NEXT_PUBLIC_AGENT_SUPABASE_URL;
const key = process.env.AGENT_SUPABASE_SERVICE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_AGENT_SUPABASE_URL or AGENT_SUPABASE_SERVICE_KEY in .env.local");
  process.exit(1);
}
const supabase = createClient(url, key);

const FACTORY = "C:/projects/asset_factory/assets";
const COVERS_DIR = path.join(FACTORY, "_covers");
const SHOTS_DIR = path.join(FACTORY, "_mock_screens");
const ICONS_DIR = "C:/projects/asset_factory/screens/public/icons";

// short asset-factory slug -> full exchange_agents slug. Deliberately explicit
// (not derived) so a naming mismatch fails loudly instead of silently skipping.
const SLUG_MAP = {
  sloane: "sloane-consult-coach",
  quill: "quill-aesthetic-scribe",
  vista: "vista-outcome-visualizer",
  fina: "fina-financing-concierge",
  remi: "remi-front-desk",
  piper: "piper-lead-concierge",
  ember: "ember-patient-reactivation",
  halo: "halo-membership-optimizer",
  ripple: "ripple-referral-engine",
  ledger: "ledger-revenue-attribution",
  tempo: "tempo-schedule-yield",
  lumen: "lumen-lpoa",
  vial: "vial-inventory-intelligence",
  sentinel: "sentinel-compliance-copilot",
  beacon: "beacon-local-visibility",
  muse: "muse-content-studio",
};

function contentTypeFor(file) {
  const ext = file.split(".").pop().toLowerCase();
  if (ext === "svg") return "image/svg+xml";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  return "image/png";
}

async function uploadOne(fullSlug, folder, localPath) {
  const fileName = path.basename(localPath);
  const bytes = readFileSync(localPath);
  const storagePath = `${fullSlug}/${folder}/${Date.now()}-${fileName}`;
  const { error } = await supabase.storage
    .from("exchange-media")
    .upload(storagePath, bytes, { contentType: contentTypeFor(fileName), upsert: false });
  if (error) throw new Error(`upload ${storagePath}: ${error.message}`);
  const { data } = supabase.storage.from("exchange-media").getPublicUrl(storagePath);
  return data.publicUrl;
}

const allShots = readdirSync(SHOTS_DIR).filter((f) => f.endsWith(".png") && !f.startsWith("_") && !f.startsWith("exchange-"));

let updated = 0;
for (const [shortSlug, fullSlug] of Object.entries(SLUG_MAP)) {
  const coverFile = path.join(COVERS_DIR, `${shortSlug}__cover.png`);
  const iconFile = path.join(ICONS_DIR, `${shortSlug}.svg`);
  const shotFiles = allShots.filter((f) => f.startsWith(`${shortSlug}-`));

  console.log(`\n${fullSlug}:`);

  const coverUrl = await uploadOne(fullSlug, "cover", coverFile);
  console.log(`  cover: ${path.basename(coverFile)} -> uploaded`);

  const logoUrl = await uploadOne(fullSlug, "logo", iconFile);
  console.log(`  logo: ${path.basename(iconFile)} -> uploaded`);

  const screenshotUrls = [];
  for (const shotFile of shotFiles) {
    const shotUrl = await uploadOne(fullSlug, "screenshots", path.join(SHOTS_DIR, shotFile));
    screenshotUrls.push(shotUrl);
  }
  console.log(`  screenshots: ${shotFiles.length} uploaded`);

  const { error } = await supabase
    .from("exchange_agents")
    .update({ cover: coverUrl, logo: logoUrl, screenshots: screenshotUrls })
    .eq("slug", fullSlug);
  if (error) throw new Error(`update ${fullSlug}: ${error.message}`);
  updated++;
}

console.log(`\nDone. Updated media for ${updated} catalog agents. Existing 9 agents untouched.`);
