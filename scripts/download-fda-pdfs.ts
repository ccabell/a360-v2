/**
 * download-fda-pdfs.ts
 *
 * Audits FDA evidence_links coverage and downloads FDA PDFs to Supabase Storage.
 *
 * Coverage map (as of 2026-06-13):
 *   Phase 1 (7 products): Botox, Xeomin, Skinvive, Kybella, Dysport, Vollure XC, Voluma XC
 *   Phase 2 extensions:   Sculptra Aesthetic, CoolSculpting Elite, Restylane Lyft, RHA Redensity
 *   Phase 2 energy (gap): Morpheus8, Sofwave SUPERB, Ultherapy PRIME, Hollywood Spectra
 *
 * FDA PDF sources:
 *   Drugs (BLA/NDA): https://www.accessdata.fda.gov/drugsatfda_docs/label/{year}/{app}s{sup}lbl.pdf
 *   Devices (510k):  https://www.accessdata.fda.gov/cdrh_docs/pdf{YY}/{K-number}.pdf
 *   Devices (PMA):   https://www.accessdata.fda.gov/cdrh_docs/pdf{YY}/{PMA}S{NNN}.pdf
 *
 * FDA Access Data blocks robots (curl gets apology page). For URL discovery, use:
 *   - api.fda.gov/drug/drugsfda.json for NDA/BLA applications
 *   - api.fda.gov/device/510k.json for 510k clearances
 *   - api.fda.gov/device/pma.json for PMA approvals
 *
 * Supabase Storage: Agent Manager project (aejskvmpembryunnbgrk), bucket 'fda'
 * Storage path pattern: fda/{application_number}.pdf
 *
 * Run:
 *   npx tsx --env-file .env.local scripts/download-fda-pdfs.ts --dry-run
 *   npx tsx --env-file .env.local scripts/download-fda-pdfs.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
 * Mapping: offering_id -> FDA PDF metadata for all FDA-regulated products.
 *
 * Products are grouped by regulatory pathway:
 *   - NDA/BLA (drugs): drugsatfda_docs path
 *   - 510k (devices): cdrh_docs/pdfYY path
 *   - PMA (devices): cdrh_docs/pdfYY path
 *
 * Offering IDs confirmed from live DB 2026-06-13.
 * Phase 1 coverage (7 products — all already have evidence_links rows with URLs):
 *   Botox, Xeomin, Skinvive, Kybella, Dysport, Vollure XC, Voluma XC
 * Phase 2 additional coverage (also already have evidence_links rows):
 *   Sculptra Aesthetic, CoolSculpting Elite, Restylane Lyft, RHA Redensity
 * Phase 2 gaps (Morpheus8, Sofwave, Ultherapy PRIME, Hollywood Spectra — backfilled by Task 2):
 *   These 4 products have approved ingestion_queue items but NO evidence_links fda_label rows.
 */
export interface FdaPdfEntry {
  productName: string;
  applicationNumber: string;
  regulatoryPathway: "NDA" | "BLA" | "510k" | "PMA";
  pdfUrl: string;
  storageFilename: string;
}

export const FDA_PDF_MAP: Record<string, FdaPdfEntry> = {
  // ── Phase 1 products (already have evidence_links fda_label rows) ─────────

  // Botox Cosmetic — BLA103000, combined 2024 label
  "4b92be36-e84e-432c-8549-f5d85a767fdb": {
    productName: "Botox Cosmetic",
    applicationNumber: "BLA103000",
    regulatoryPathway: "BLA",
    pdfUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/103000s5316s5319s5323s5326s5331lbl.pdf",
    storageFilename: "BLA103000.pdf",
  },

  // Xeomin — BLA125360, s110 (2026)
  "92a05fe8-d349-4d2f-9a3f-bc5901f94dfa": {
    productName: "Xeomin",
    applicationNumber: "BLA125360",
    regulatoryPathway: "BLA",
    pdfUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/125360s110lbl.pdf",
    storageFilename: "BLA125360.pdf",
  },

  // Skinvive by Juvederm — BLA761261 (drug) + K220481 (510k device)
  "b74d5475-bf58-4d7d-87f5-2c8dc9e252de": {
    productName: "Skinvive by Juvederm",
    applicationNumber: "BLA761261",
    regulatoryPathway: "BLA",
    pdfUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/761261s004lbl.pdf",
    storageFilename: "BLA761261.pdf",
  },

  // Kybella — NDA206333, s005 (2022)
  "0f901fec-5de5-4950-815e-82c3e47cb2ec": {
    productName: "Kybella",
    applicationNumber: "NDA206333",
    regulatoryPathway: "NDA",
    pdfUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/206333s005lbl.pdf",
    storageFilename: "NDA206333.pdf",
  },

  // Dysport — BLA125274, s125 (2023)
  "a7e1b29e-da10-40de-bea8-70d6e6624f43": {
    productName: "Dysport",
    applicationNumber: "BLA125274",
    regulatoryPathway: "BLA",
    pdfUrl:
      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/125274s125lbl.pdf",
    storageFilename: "BLA125274.pdf",
  },

  // Juvederm Vollure XC — PMA P110033 S101 (combined HA filler IFU, 2025)
  "7370545f-97a3-4519-a92d-3ac4f969829d": {
    productName: "Juvederm Vollure XC",
    applicationNumber: "P110033S101",
    regulatoryPathway: "PMA",
    pdfUrl:
      "https://www.accessdata.fda.gov/cdrh_docs/pdf11/P110033S101.pdf",
    storageFilename: "P110033S101.pdf",
  },

  // Juvederm Voluma XC — PMA P110033 S101 (same combined IFU as Vollure XC)
  "6c8f72f0-887f-484a-a588-0bb9bd8052c9": {
    productName: "Juvederm Voluma XC",
    applicationNumber: "P110033S101",
    regulatoryPathway: "PMA",
    pdfUrl:
      "https://www.accessdata.fda.gov/cdrh_docs/pdf11/P110033S101.pdf",
    storageFilename: "P110033S101.pdf",
  },

  // ── Phase 2 products (also already have evidence_links fda_label rows) ────

  // Sculptra Aesthetic — PMA P030050 S039 (poly-L-lactic acid biostimulator, Galderma)
  "2ce7a3d2-b06d-4b62-b9b7-4113afb51baa": {
    productName: "Sculptra Aesthetic",
    applicationNumber: "P030050S039",
    regulatoryPathway: "PMA",
    pdfUrl:
      "https://www.accessdata.fda.gov/cdrh_docs/pdf3/P030050S039D.pdf",
    storageFilename: "P030050S039.pdf",
  },

  // CoolSculpting Elite — 510k K233732 (cryolipolysis, Allergan/AbbVie, 2024)
  "694ea839-cf8f-4a17-b838-2588674c792f": {
    productName: "CoolSculpting Elite",
    applicationNumber: "K233732",
    regulatoryPathway: "510k",
    pdfUrl:
      "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K233732.pdf",
    storageFilename: "K233732.pdf",
  },

  // Restylane Lyft — PMA P020023 S040 (HA filler, Galderma)
  "f1732c7c-3f19-4f3d-9aff-543a132e5506": {
    productName: "Restylane Lyft",
    applicationNumber: "P020023S040",
    regulatoryPathway: "PMA",
    pdfUrl:
      "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P020023S040",
    storageFilename: "P020023S040.pdf",
  },

  // RHA Redensity — 510k K183782 (2020, Teoxane)
  "d8a00419-39e1-4d4b-8dab-ad134fb00930": {
    productName: "RHA Redensity",
    applicationNumber: "K183782",
    regulatoryPathway: "510k",
    pdfUrl:
      "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K183782.pdf",
    storageFilename: "K183782.pdf",
  },

  // ── Phase 2 energy device gaps (NO evidence_links fda_label rows yet) ─────
  // These are backfilled in Task 2 SQL. Included here for completeness.

  // Morpheus8 — 510k K192271 (InMode, radiofrequency microneedling, 2019)
  "84ac561e-1818-4ece-a8d7-1fb6c5ea80df": {
    productName: "Morpheus8",
    applicationNumber: "K192271",
    regulatoryPathway: "510k",
    pdfUrl:
      "https://www.accessdata.fda.gov/cdrh_docs/pdf19/K192271.pdf",
    storageFilename: "K192271.pdf",
  },

  // Sofwave SUPERB — 510k K201789 (Sofwave Medical, SUPERB ultrasound, 2020)
  "78973d13-fa36-41dd-8625-4b851ff143ed": {
    productName: "Sofwave SUPERB",
    applicationNumber: "K201789",
    regulatoryPathway: "510k",
    pdfUrl:
      "https://www.accessdata.fda.gov/cdrh_docs/pdf20/K201789.pdf",
    storageFilename: "K201789.pdf",
  },

  // Ultherapy PRIME — 510k K101445 (Merz, focused ultrasound, 2010)
  "da25d447-c316-40b2-802e-e190c0bdbd9f": {
    productName: "Ultherapy PRIME",
    applicationNumber: "K101445",
    regulatoryPathway: "510k",
    pdfUrl:
      "https://www.accessdata.fda.gov/cdrh_docs/pdf10/K101445.pdf",
    storageFilename: "K101445.pdf",
  },

  // Hollywood Spectra — 510k K133029 (Lutronic, Nd:YAG laser, 2013)
  "be46f975-99d7-4772-867e-744814626654": {
    productName: "Hollywood Spectra",
    applicationNumber: "K133029",
    regulatoryPathway: "510k",
    pdfUrl:
      "https://www.accessdata.fda.gov/cdrh_docs/pdf13/K133029.pdf",
    storageFilename: "K133029.pdf",
  },
};

const DRY_RUN = process.argv.includes("--dry-run");
const STORAGE_BUCKET = "fda";
const SUPABASE_URL = process.env.NEXT_PUBLIC_AGENT_SUPABASE_URL!;

async function auditCoverage() {
  const { data: fdaLinks, error } = await agentDb
    .from("evidence_links")
    .select("offering_id, url")
    .eq("source", "fda_label");

  if (error) throw new Error(`Evidence links query failed: ${error.message}`);

  const coveredIds = new Set(fdaLinks?.map((r) => r.offering_id) ?? []);
  const nullUrlIds = fdaLinks
    ?.filter((r) => !r.url || r.url === "")
    .map((r) => r.offering_id) ?? [];

  const gaps = Object.entries(FDA_PDF_MAP)
    .filter(([id]) => !coveredIds.has(id))
    .map(([id, entry]) => ({ id, ...entry }));

  return { coveredIds, nullUrlIds, gaps };
}

async function downloadPdf(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (A360-GlobalLibrary/1.0; +https://aesthetics360.com)",
        Accept: "application/pdf,*/*",
      },
      redirect: "follow",
    });

    if (!res.ok) {
      console.error(`    HTTP ${res.status}: ${url}`);
      return null;
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("pdf") && !contentType.includes("octet-stream")) {
      // FDA Access Data may return HTML apology page instead of PDF
      console.error(`    Non-PDF response (${contentType}): ${url}`);
      console.error("    Note: accessdata.fda.gov blocks robots; URL recorded for manual download");
      return null;
    }

    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.error(`    Fetch error: ${err instanceof Error ? err.message : err}`);
    return null;
  }
}

async function uploadToStorage(
  filename: string,
  buffer: Buffer
): Promise<string | null> {
  const storagePath = filename;

  const { error } = await agentDb.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, buffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    console.error(`    Storage upload failed: ${error.message}`);
    return null;
  }

  // Construct public URL
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${filename}`;
  return publicUrl;
}

async function main() {
  console.log("=== FDA PDF Download Script ===");
  console.log(`Mode: ${DRY_RUN ? "DRY RUN (no writes)" : "LIVE"}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Products in FDA_PDF_MAP: ${Object.keys(FDA_PDF_MAP).length}`);
  console.log("");

  // Step 1: Audit current coverage
  console.log("=== Step 1: Auditing FDA evidence_links coverage ===");
  const { coveredIds, nullUrlIds, gaps } = await auditCoverage();

  console.log(`  Distinct offering_ids with fda_label rows: ${coveredIds.size}`);
  console.log(`  fda_label rows with null/empty URL: ${nullUrlIds.length}`);
  console.log(`  Products in FDA_PDF_MAP without any fda_label rows: ${gaps.length}`);

  if (gaps.length > 0) {
    console.log("\n  Coverage gaps (need Task 2 SQL backfill):");
    for (const gap of gaps) {
      console.log(
        `    - ${gap.productName} (${gap.applicationNumber})`
      );
    }
  }

  console.log("");

  // Step 2: Attempt PDF download and Storage upload
  console.log("=== Step 2: PDF Download → Supabase Storage ===");
  console.log(
    "Note: FDA Access Data (accessdata.fda.gov) blocks automated downloads."
  );
  console.log(
    "If download fails, evidence_links URLs remain pointing to accessdata.fda.gov directly."
  );
  console.log(
    "This is the established Phase 1 fallback and URLs are confirmed working.\n"
  );

  const results: Record<
    string,
    { status: "uploaded" | "failed" | "dry_run"; storageUrl?: string }
  > = {};

  // Deduplicate by storageFilename to avoid uploading same PDF multiple times
  const processedFiles = new Set<string>();

  for (const [offeringId, entry] of Object.entries(FDA_PDF_MAP)) {
    if (processedFiles.has(entry.storageFilename)) {
      console.log(
        `  SKIP (already processed): ${entry.productName} → ${entry.storageFilename}`
      );
      results[offeringId] = {
        status: results[
          Object.keys(results).find(
            (k) => FDA_PDF_MAP[k]?.storageFilename === entry.storageFilename
          ) ?? ""
        ]?.status ?? "failed",
      };
      continue;
    }

    processedFiles.add(entry.storageFilename);
    console.log(`  Processing: ${entry.productName}`);
    console.log(`    Application: ${entry.applicationNumber} (${entry.regulatoryPathway})`);
    console.log(`    Source URL: ${entry.pdfUrl}`);
    console.log(`    Storage target: ${STORAGE_BUCKET}/${entry.storageFilename}`);

    if (DRY_RUN) {
      console.log("    DRY RUN: would download and upload");
      results[offeringId] = { status: "dry_run" };
      continue;
    }

    // Download PDF
    const buffer = await downloadPdf(entry.pdfUrl);
    if (!buffer) {
      console.log("    FAILED: PDF download failed (see error above)");
      console.log(
        `    Fallback: evidence_links will use accessdata.fda.gov URL directly`
      );
      results[offeringId] = { status: "failed" };
      continue;
    }

    console.log(`    Downloaded: ${buffer.length.toLocaleString()} bytes`);

    // Upload to Supabase Storage
    const storageUrl = await uploadToStorage(entry.storageFilename, buffer);
    if (!storageUrl) {
      console.log("    FAILED: Supabase Storage upload failed");
      results[offeringId] = { status: "failed" };
      continue;
    }

    console.log(`    Uploaded: ${storageUrl}`);
    results[offeringId] = { status: "uploaded", storageUrl };
  }

  // Step 3: Summary report
  console.log("\n=== Results ===");
  const uploaded = Object.values(results).filter((r) => r.status === "uploaded").length;
  const failed = Object.values(results).filter((r) => r.status === "failed").length;
  const dryRun = Object.values(results).filter((r) => r.status === "dry_run").length;

  console.log(`  Uploaded to Storage: ${uploaded}`);
  console.log(`  Failed (fallback to accessdata.fda.gov URLs): ${failed}`);
  if (dryRun > 0) console.log(`  Dry run (not executed): ${dryRun}`);

  if (failed > 0) {
    console.log("\n  Failed products (evidence_links keep accessdata.fda.gov URLs):");
    for (const [id, result] of Object.entries(results)) {
      if (result.status === "failed") {
        const entry = FDA_PDF_MAP[id];
        if (entry) {
          console.log(`    - ${entry.productName}: ${entry.pdfUrl}`);
        }
      }
    }
    console.log("\n  This is expected — FDA blocks automated downloads.");
    console.log("  Phase 1 pattern: accessdata.fda.gov URLs work fine for citations.");
    console.log("  Run Task 2 SQL to backfill evidence_links for gap products.");
  }

  // Step 4: Ingestion queue status check
  console.log("\n=== Ingestion Queue: public_domain items ===");
  const { data: iqItems, error: iqError } = await agentDb
    .from("ingestion_queue")
    .select("id, title, status, url")
    .eq("rights_class", "public_domain");

  if (iqError) {
    console.error("  ERROR querying ingestion_queue:", iqError.message);
  } else {
    const byStatus: Record<string, number> = {};
    for (const item of iqItems ?? []) {
      byStatus[item.status] = (byStatus[item.status] || 0) + 1;
    }
    console.log("  By status:", byStatus);
    console.log(
      "  Note: 'approved' items will be marked 'ingested' by Task 2 SQL"
    );
  }

  console.log("\n=== Coverage Gap Summary ===");
  console.log("Products needing Task 2 SQL evidence_links backfill:");
  for (const gap of gaps) {
    console.log(`  - ${gap.productName} (offering_id: ${gap.id})`);
    console.log(`    FDA URL: ${gap.pdfUrl}`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
