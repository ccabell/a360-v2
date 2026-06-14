import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { agentSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const BATCH_DIR = join(process.cwd(), "REVIEW_QUEUE", "combination_fuel");

const BATCH_FILES = [
  "canonical_batch.md",
  "common_neurotoxin_sculptra_batch.md",
  "common_neurotoxin_skinvive_batch.md",
  "common_ha_sculptra_batch.md",
  "common_remaining_batch.md",
];

// Map pair_key segments to product brand_names
// pair_key format: "botox_cosmetic__juvederm_vollure_xc"
const PAIR_KEY_TO_BRAND: Record<string, string> = {
  botox_cosmetic: "Botox Cosmetic",
  daxxify: "Daxxify",
  dysport: "Dysport",
  jeuveau: "Jeuveau",
  xeomin: "Xeomin",
  juvederm_vollure_xc: "Juvederm Vollure XC",
  juvederm_voluma_xc: "Juvederm Voluma XC",
  restylane_lyft: "Restylane Lyft",
  rha_redensity: "RHA Redensity",
  skinvive_by_juvederm: "SKINVIVE",
  sculptra_aesthetic: "Sculptra Aesthetic",
  inmode_morpheus8: "Morpheus8",
};

function extractJsonBlocks(markdown: string): Record<string, unknown>[] {
  const blocks: Record<string, unknown>[] = [];
  const regex = /```json\s*\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed.pair_key) blocks.push(parsed);
    } catch { /* skip malformed */ }
  }
  return blocks;
}

function parsePairKey(pairKey: string): { a: string; b: string } | null {
  const parts = pairKey.split("__");
  if (parts.length !== 2) return null;
  return { a: parts[0], b: parts[1] };
}

export async function POST() {
  try {
    // Load product → offering_id map
    const { data: products, error: prodErr } = await agentSupabase
      .from("products")
      .select("id, brand_name");
    if (prodErr) throw prodErr;

    const brandToId: Record<string, string> = {};
    for (const p of products ?? []) {
      brandToId[p.brand_name] = p.id;
    }

    // Check which pair_keys already exist as fuel docs
    const { data: existing } = await agentSupabase
      .from("agent_fuel_documents")
      .select("id, content")
      .eq("fuel_type", "pairing_fuel");

    const existingKeys = new Set(
      (existing ?? []).map((r: Record<string, unknown>) => {
        const content = r.content as Record<string, unknown> | null;
        return content?.pair_key as string | undefined;
      }).filter(Boolean)
    );

    // Parse all batch files
    const allDocs: Record<string, unknown>[] = [];
    const fileResults: Record<string, number> = {};

    for (const file of BATCH_FILES) {
      const content = await readFile(join(BATCH_DIR, file), "utf-8");
      const blocks = extractJsonBlocks(content);
      fileResults[file] = blocks.length;
      allDocs.push(...blocks);
    }

    // Filter out already-imported docs
    const newDocs = allDocs.filter(
      (d) => !existingKeys.has(d.pair_key as string)
    );

    if (newDocs.length === 0) {
      return NextResponse.json({
        message: "All docs already imported",
        total_parsed: allDocs.length,
        already_existing: allDocs.length,
        imported: 0,
        files: fileResults,
      });
    }

    // Import each doc: create item_relationship → create fuel doc
    let importedCount = 0;
    const errors: string[] = [];

    for (const content of newDocs) {
      const pairKey = content.pair_key as string;
      try {
        const pair = parsePairKey(pairKey);
        if (!pair) throw new Error(`Invalid pair_key format: ${pairKey}`);

        const brandA = PAIR_KEY_TO_BRAND[pair.a];
        const brandB = PAIR_KEY_TO_BRAND[pair.b];
        if (!brandA) throw new Error(`Unknown product key: ${pair.a}`);
        if (!brandB) throw new Error(`Unknown product key: ${pair.b}`);

        const offeringA = brandToId[brandA];
        const offeringB = brandToId[brandB];
        if (!offeringA) throw new Error(`No offering for: ${brandA}`);
        if (!offeringB) throw new Error(`No offering for: ${brandB}`);

        // Coerce same_session_ok to boolean
        const sameSession = content.same_session_ok === true;

        // Determine evidence strength
        const evidenceLevel = content.evidence_level as string;
        const strength = evidenceLevel === "strong" ? "strong" : "moderate";

        // Create item_relationship
        const { data: rel, error: relErr } = await agentSupabase
          .from("item_relationships")
          .insert({
            offering_a_id: offeringA,
            offering_b_id: offeringB,
            relationship_type: "complementary",
            relationship_strength: strength,
            clinical_rationale: (content.clinical_rationale as string) ?? "",
            same_session_ok: sameSession,
            patient_education_text: (content.patient_education_summary as string) ?? "",
            staff_talking_points: (content.staff_talking_points as string) ?? "",
            is_bidirectional: true,
            is_active: true,
            pairing_tier: pairKey.startsWith("botox_cosmetic__") ? "canonical" : "common",
          })
          .select("id")
          .single();

        if (relErr) throw relErr;

        // Create fuel doc linked to this relationship
        const { error: fuelErr } = await agentSupabase
          .from("agent_fuel_documents")
          .insert({
            fuel_type: "pairing_fuel",
            content,
            version: 1,
            status: "draft",
            item_relationship_id: rel.id,
          });

        if (fuelErr) throw fuelErr;
        importedCount++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : JSON.stringify(err);
        errors.push(`${pairKey}: ${msg}`);
      }
    }

    return NextResponse.json({
      message: `Imported ${importedCount} combination fuel docs`,
      total_parsed: allDocs.length,
      already_existing: allDocs.length - newDocs.length,
      imported: importedCount,
      failed: errors.length,
      errors: errors.length > 0 ? errors : undefined,
      files: fileResults,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
