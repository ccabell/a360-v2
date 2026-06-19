import { parseReport } from "../lib/workflow/parse-report";
import { readFileSync, readdirSync } from "fs";

const dir = "test-payloads";
for (const fname of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const raw = JSON.parse(readFileSync(`${dir}/${fname}`, "utf-8"));
  const text = raw.result?.text ?? "";
  const pid = fname.slice(0, 8);

  const parsed = parseReport(text);

  console.log(`=== ${pid} ===`);
  console.log(`  exec summary: ${parsed.executiveSummary.length} chars ${parsed.executiveSummary.length > 50 ? "OK" : "SHORT"}`);
  console.log(`  tiers: ${parsed.packages.tiers.length} (${parsed.packages.tiers.map((t) => t.heading.slice(0, 40)).join(" | ")})`);
  console.log(`  tier rows: [${parsed.packages.tiers.map((t) => t.rows.length).join(", ")}]`);
  console.log(`  pricing: ${parsed.packages.pricing.length} chars`);
  console.log(`  clinical items: ${parsed.clinicalEvidence.items.length}`);
  for (const item of parsed.clinicalEvidence.items) {
    console.log(`    ${item.id}: conf=${item.confidence}, pmids=[${item.pmids.join(",")}], warnings=${item.warnings.length}, heading=${item.heading.slice(0, 50)}`);
  }
  console.log(`  next steps: ${parsed.nextSteps.items.length} items`);
  if (parsed.nextSteps.items.length > 0) {
    const horizons = [...new Set(parsed.nextSteps.items.map((i) => i.timeHorizon ?? "none"))];
    console.log(`  horizons: [${horizons.join(", ")}]`);
  }
  console.log();
}
