/**
 * backfill-fda-urls.ts
 *
 * One-shot script: populates evidence_links.url for all rows where source = 'fda_label'
 * and url is NULL or empty.
 *
 * FDA URL sources:
 *   - Drugs (BLA/NDA): https://www.accessdata.fda.gov/drugsatfda_docs/label/{year}/{app}s{sup}lbl.pdf
 *   - Devices (PMA):   https://www.accessdata.fda.gov/cdrh_docs/pdf{YY}/{PMA}S{NNN}.pdf
 *
 * URLs researched 2026-06-12 via FDA drugs@FDA submissions API and FDA PMA database.
 * Use the most recent supplement at time of writing; re-run script if FDA releases new labels.
 *
 * Run: node --env-file .env.local -r tsx/cjs scripts/backfill-fda-urls.ts
 *      OR: npx tsx --env-file .env.local scripts/backfill-fda-urls.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Try worktree-relative .env.local first, then repo root
const envPaths = [
  path.join(__dirname, "..", ".env.local"),
  path.join(process.cwd(), ".env.local"),
];
for (const envPath of envPaths) {
  const result = dotenv.config({ path: envPath });
  if (!result.error) break;
}

const agentDb = createClient(
  process.env.NEXT_PUBLIC_AGENT_SUPABASE_URL!,
  process.env.AGENT_SUPABASE_SERVICE_KEY!
);

/**
 * Mapping: offering_id -> FDA Access Data URL for the prescribing information / IFU.
 *
 * Offering IDs come from:
 *   SELECT DISTINCT el.offering_id, p.name FROM evidence_links el
 *   JOIN products p ON p.id = el.offering_id
 *   WHERE el.source = 'fda_label';
 *
 * Gap entries (empty string): Chris fills manually. Listed in gap report at end.
 *
 * Research notes per product:
 *   - Botox Cosmetic (BLA103000): combined 2024 label (s5316+s5319+s5323+s5326+s5331)
 *   - Xeomin (BLA125360): s110 is most recent label as of 2026-03
 *   - SKINVIVE (BLA761261): s004 from 2024
 *   - Kybella (NDA206333): s005 from 2022
 *   - Dysport (BLA125274): s125 from 2023
 *   - Juvederm Vollure XC + Voluma XC (PMA P110033): shared combined IFU, supplement S101 (2025-08)
 */
const FDA_URL_MAP: Record<string, string> = {
  // Botox Cosmetic — BLA103000
  "4b92be36-e84e-432c-8549-f5d85a767fdb":
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/103000s5316s5319s5323s5326s5331lbl.pdf",

  // Xeomin — BLA125360
  "92a05fe8-d349-4d2f-9a3f-bc5901f94dfa":
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/125360s110lbl.pdf",

  // SKINVIVE by Juvederm — BLA761261
  "b74d5475-bf58-4d7d-87f5-2c8dc9e252de":
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/761261s004lbl.pdf",

  // Kybella — NDA206333
  "0f901fec-5de5-4950-815e-82c3e47cb2ec":
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/206333s005lbl.pdf",

  // Dysport — BLA125274
  "a7e1b29e-da10-40de-bea8-70d6e6624f43":
    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/125274s125lbl.pdf",

  // Juvederm Vollure XC — PMA P110033 (shared combined label with Voluma/Volbella/Volux/Skinvive)
  // P110033 S101 approved 2025-08-14 covers all variants
  "7370545f-97a3-4519-a92d-3ac4f969829d":
    "https://www.accessdata.fda.gov/cdrh_docs/pdf11/P110033S101.pdf",

  // Juvederm Voluma XC — PMA P110033 (same combined label as Vollure XC above)
  "6c8f72f0-887f-484a-a588-0bb9bd8052c9":
    "https://www.accessdata.fda.gov/cdrh_docs/pdf11/P110033S101.pdf",

  // Sculptra Aesthetic — PMA P030050, supplement S039 (poly-L-lactic acid, Galderma)
  "2ce7a3d2-b06d-4b62-b9b7-4113afb51baa":
    "https://www.accessdata.fda.gov/cdrh_docs/pdf3/P030050S039D.pdf",

  // CoolSculpting Elite — 510(k) K233732 (cryolipolysis device, Allergan/AbbVie, cleared 2024-08)
  "694ea839-cf8f-4a17-b838-2588674c792f":
    "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K233732.pdf",
};

async function main() {
  console.log("=== FDA URL Backfill ===");
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Products in map: ${Object.keys(FDA_URL_MAP).length}`);
  console.log("");

  let updated = 0;
  let skipped = 0;
  let alreadyHadUrl = 0;
  let errors = 0;
  const gaps: string[] = [];

  for (const [offeringId, fdaUrl] of Object.entries(FDA_URL_MAP)) {
    if (!fdaUrl) {
      // Gap entry — log for Chris to fill manually
      gaps.push(offeringId);
      skipped++;
      console.log(`  SKIP (no URL researched): ${offeringId}`);
      continue;
    }

    // Only update rows where url IS NULL or empty — idempotent
    const { data, error } = await agentDb
      .from("evidence_links")
      .update({ url: fdaUrl })
      .eq("source", "fda_label")
      .eq("offering_id", offeringId)
      .or("url.is.null,url.eq.")
      .select("id");

    if (error) {
      console.error(`  ERROR: ${offeringId}: ${error.message}`);
      errors++;
      continue;
    }

    const rowsUpdated = data?.length ?? 0;
    if (rowsUpdated === 0) {
      // Either no rows exist or all rows already have URLs
      const { count } = await agentDb
        .from("evidence_links")
        .select("id", { count: "exact", head: true })
        .eq("source", "fda_label")
        .eq("offering_id", offeringId);

      if ((count ?? 0) > 0) {
        console.log(`  ALREADY SET: ${offeringId} (${count} rows already have URL)`);
        alreadyHadUrl += count ?? 0;
      } else {
        console.log(`  NO ROWS: ${offeringId} (no fda_label rows for this offering)`);
      }
    } else {
      console.log(`  UPDATED: ${offeringId} -> ${rowsUpdated} rows -> ${fdaUrl.slice(0, 80)}...`);
      updated += rowsUpdated;
    }
  }

  console.log("");
  console.log("=== Results ===");
  console.log(`  updated: ${updated} rows`);
  console.log(`  already had URL: ${alreadyHadUrl} rows`);
  console.log(`  skipped (no URL researched): ${skipped} products`);
  console.log(`  errors: ${errors}`);

  if (gaps.length > 0) {
    console.log("");
    console.log("=== Gap Report (manual entry needed) ===");
    console.log("The following offering_ids have no FDA URL in FDA_URL_MAP.");
    console.log("Chris: look up the label PDF on https://www.accessdata.fda.gov and update FDA_URL_MAP.");
    for (const id of gaps) {
      console.log(`  - offering_id: ${id}`);
    }
  } else {
    console.log("");
    console.log("Gap Report: NONE — all products in map have URLs.");
  }

  // Final verification query
  console.log("");
  console.log("=== Verification ===");
  const { count: totalFda } = await agentDb
    .from("evidence_links")
    .select("id", { count: "exact", head: true })
    .eq("source", "fda_label");

  const { count: withUrl } = await agentDb
    .from("evidence_links")
    .select("id", { count: "exact", head: true })
    .eq("source", "fda_label")
    .like("url", "https://%");

  const { count: noUrl } = await agentDb
    .from("evidence_links")
    .select("id", { count: "exact", head: true })
    .eq("source", "fda_label")
    .or("url.is.null,url.eq.");

  console.log(`  Total fda_label rows: ${totalFda}`);
  console.log(`  Rows with https:// URL: ${withUrl}`);
  console.log(`  Rows still missing URL: ${noUrl}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
