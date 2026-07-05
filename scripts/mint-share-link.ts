/**
 * Mint an audience share link from the CLI (equivalent of the /dashboard/
 * portfolio mint action). Requires SHARE_LINK_SECRET in .env.local.
 *
 * Usage:
 *   npx tsx scripts/mint-share-link.ts <audience> [--days 7|30] [--base URL]
 *
 * Examples:
 *   npx tsx scripts/mint-share-link.ts buyer
 *   npx tsx scripts/mint-share-link.ts ceo --days 30 --base https://a360-v2.vercel.app
 */
import { config } from "dotenv";

config({ path: ".env.local" });

import { AUDIENCES, getAudience } from "../lib/portfolio/registry";
import { mintShareToken } from "../lib/portfolio/share";

const ALLOWED_DAYS = [7, 30];

function fail(message: string): never {
  console.error(`Error: ${message}`);
  console.error(
    `Usage: npx tsx scripts/mint-share-link.ts <${AUDIENCES.map((a) => a.id).join("|")}> [--days 7|30] [--base URL]`,
  );
  process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  const audienceId = args[0];
  if (!audienceId || audienceId.startsWith("--")) fail("audience is required");
  const audience = getAudience(audienceId);
  if (!audience) fail(`unknown audience "${audienceId}"`);

  let days = 7;
  let base = "http://localhost:3000";
  for (let i = 1; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];
    if (flag === "--days") days = Number(value);
    else if (flag === "--base") base = value;
    else fail(`unknown flag "${flag}"`);
  }
  if (!ALLOWED_DAYS.includes(days)) fail("--days must be 7 or 30");

  const secret = process.env.SHARE_LINK_SECRET;
  if (!secret) fail("SHARE_LINK_SECRET is not set in .env.local");

  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const token = await mintShareToken(audience.id, expiresAt, secret);

  console.log(`Audience:  ${audience.id} (${audience.prototypeSlugs.length} prototypes)`);
  console.log(`Expires:   ${expiresAt.toISOString()}`);
  console.log(`Share URL: ${new URL(`/share/${token}`, base).toString()}`);
}

main();
