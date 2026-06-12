/**
 * Backfill PubMed PMIDs and URLs for evidence_links rows.
 *
 * What it does:
 *   1. Finds all evidence_links WHERE source='pubmed' AND doi IS NOT NULL AND pmid IS NULL
 *      → calls CrossRef API (https://api.crossref.org/works/{doi}) to resolve PMID
 *      → writes pmid + url = https://pubmed.ncbi.nlm.nih.gov/{pmid}/ back to Supabase
 *   2. Also patches any rows that already HAVE pmid but url is empty/null
 *   3. Prints a gap report for any DOIs that CrossRef could not resolve
 *
 * Run:
 *   npx tsx scripts/backfill-pubmed.ts
 *
 * Env required (in .env.local):
 *   NEXT_PUBLIC_AGENT_SUPABASE_URL
 *   AGENT_SUPABASE_SERVICE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const AGENT_URL = process.env.NEXT_PUBLIC_AGENT_SUPABASE_URL;
const AGENT_KEY = process.env.AGENT_SUPABASE_SERVICE_KEY;

if (!AGENT_URL || !AGENT_KEY) {
  console.error(
    "Missing env vars: NEXT_PUBLIC_AGENT_SUPABASE_URL or AGENT_SUPABASE_SERVICE_KEY"
  );
  process.exit(1);
}

const agentDb = createClient(AGENT_URL, AGENT_KEY);

const USER_AGENT = "A360-citation-backfill/1.0 (ccabell@aesthetics360.com)";
const PUBMED_BASE = "https://pubmed.ncbi.nlm.nih.gov/";
const DELAY_MS = 150;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pmidFromDoi(doi: string): Promise<string | null> {
  const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
    });
    if (!res.ok) {
      if (res.status === 404) return null; // DOI not in CrossRef
      console.warn(`  CrossRef HTTP ${res.status} for DOI ${doi}`);
      return null;
    }
    const data = (await res.json()) as {
      message?: { "external-ids"?: Array<{ "id-type": string; id: string }> };
    };
    const externalIds = data.message?.["external-ids"] ?? [];
    const pmidEntry = externalIds.find((e) => e["id-type"] === "PMID");
    return pmidEntry?.id ?? null;
  } catch (err) {
    console.warn(`  CrossRef fetch error for DOI ${doi}:`, (err as Error).message);
    return null;
  }
}

async function main() {
  console.log("=== PubMed PMID Backfill ===\n");

  // Step 1: Rows that have DOI but no PMID
  const { data: needsLookup, error: fetchErr } = await agentDb
    .from("evidence_links")
    .select("id, doi, pmid, url")
    .eq("source", "pubmed")
    .is("pmid", null)
    .not("doi", "is", null);

  if (fetchErr) {
    console.error("Failed to fetch evidence_links:", fetchErr.message);
    process.exit(1);
  }

  console.log(`Rows needing CrossRef lookup: ${needsLookup?.length ?? 0}`);

  let resolved = 0;
  let skipped = 0;
  const gapReport: Array<{ id: string; doi: string; reason: string }> = [];

  for (const row of needsLookup ?? []) {
    const doi = row.doi as string;
    console.log(`\nProcessing DOI: ${doi}`);

    await sleep(DELAY_MS);

    const pmid = await pmidFromDoi(doi);

    if (pmid) {
      const newUrl = `${PUBMED_BASE}${pmid}/`;
      const { error: updateErr } = await agentDb
        .from("evidence_links")
        .update({ pmid, url: newUrl })
        .eq("id", row.id);

      if (updateErr) {
        console.error(`  UPDATE failed for id ${row.id}:`, updateErr.message);
        gapReport.push({ id: row.id, doi, reason: `Update error: ${updateErr.message}` });
      } else {
        console.log(`  Resolved → PMID ${pmid}, URL ${newUrl}`);
        resolved++;
      }
    } else {
      console.log(`  [SKIP] DOI ${doi} — no PMID in CrossRef`);
      gapReport.push({ id: row.id, doi, reason: "CrossRef returned no PMID" });
      skipped++;
    }
  }

  // Step 2: Rows that already have PMID but missing URL (covers pre-existing PMIDs)
  const { data: missingUrl, error: urlFetchErr } = await agentDb
    .from("evidence_links")
    .select("id, pmid, url")
    .eq("source", "pubmed")
    .not("pmid", "is", null)
    .or("url.is.null,url.eq.");

  if (urlFetchErr) {
    console.warn("Could not fetch URL-less rows:", urlFetchErr.message);
  }

  let urlPatched = 0;
  for (const row of missingUrl ?? []) {
    const newUrl = `${PUBMED_BASE}${row.pmid}/`;
    const { error: patchErr } = await agentDb
      .from("evidence_links")
      .update({ url: newUrl })
      .eq("id", row.id);

    if (patchErr) {
      console.error(`  URL patch failed for id ${row.id}:`, patchErr.message);
    } else {
      console.log(`  Patched URL for pre-existing PMID ${row.pmid} → ${newUrl}`);
      urlPatched++;
    }
  }

  // Summary
  console.log("\n=== Summary ===");
  console.log(`Resolved: ${resolved}`);
  console.log(`Skipped (no PMID in CrossRef): ${skipped}`);
  console.log(`Already had PMID, URL patched: ${urlPatched}`);

  if (gapReport.length > 0) {
    console.log("\n=== Gap Report (manual review needed) ===");
    for (const g of gapReport) {
      console.log(`  ID: ${g.id} | DOI: ${g.doi} | Reason: ${g.reason}`);
    }
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
