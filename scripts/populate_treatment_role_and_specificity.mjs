/**
 * Populate treatment_role on gl_product_concerns and anatomy_specificity on gl_product_anatomy.
 *
 * Since relevance_score is uniformly 0.9 (bulk-seeded), classification uses
 * product_type × concern_category / anatomy_area domain knowledge.
 *
 * treatment_role values (CHECK constraint):
 *   primary | enhancer | complementary | maintenance | prep | alternative
 *
 * anatomy_specificity values (CHECK constraint):
 *   full_area | sub_area | adjacent_benefit
 *
 * Run: node scripts/populate_treatment_role_and_specificity.mjs [--dry-run]
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wvpgmawrizwkmvfnwqfl.supabase.co";
const SUPABASE_KEY =
  process.env.GL_SUPABASE_SERVICE_ROLE_KEY;

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
const DRY_RUN = process.argv.includes("--dry-run");

// ═════════════════════════════════════════════════════════════════════════════
// Treatment Role Classification
//
// Logic: product_type determines the role the product plays in treating a concern.
// - Injectables (neurotoxins, fillers) and devices = primary treatment
// - Skincare = enhancer (supports primary, doesn't treat alone)
// - Chemical peels / biorevitalization = prep (skin preparation)
// - Supplements / topicals = maintenance (ongoing use)
// - Guardrail records = alternative (not recommended, tracked for safety)
// - Prescription meds for weight = primary for weight concerns, complementary for aesthetic
// ═════════════════════════════════════════════════════════════════════════════

// Product types → default treatment_role
const TYPE_TO_ROLE = {
  // Primary treatments (directly address the concern)
  injectable: "primary",
  device: "primary",
  fractional_co2_laser: "primary",
  non_ablative_laser: "primary",
  rf_ultrasound_device: "primary",
  cellulite_device: "primary",
  microwave_device: "primary",
  hair_restoration_device: "primary",
  micro_coring_device: "primary",
  bio_remodeler: "primary",
  prescription_eye_drops: "primary",

  // Enhancers (support primary treatments)
  skincare: "enhancer",
  exosome_serum: "enhancer",
  cosmetic_ingredient: "enhancer",
  sunscreen: "enhancer",

  // Prep (prepare tissue before primary treatment)
  chemical_peel: "prep",
  biorevitalization_peel: "prep",
  carboxytherapy_gel: "prep",

  // Maintenance (ongoing/post-treatment)
  collagen_supplement: "maintenance",
  topical_prescription: "maintenance",
  scar_treatment: "maintenance",

  // Complementary (supports from a different modality)
  wellness_service_product: "complementary",
  diagnostic_device: "complementary",

  // Alternative (tracked but not standard recommendation)
  guardrail_record: "alternative",

  // Prescription medications — context-dependent (handled below)
  prescription_medication: "primary",
  compounded_medication: "primary",
};

// Weight-management concerns where prescription meds are primary
const WEIGHT_CONCERNS = new Set([
  "appetite_control",
  "food_noise",
  "weight_plateau",
  "weight_regain",
  "metabolic_health",
  "body_composition",
  "muscle_loss",
  "nausea_gi_intolerance",
  "glp1_side_effects",
  "maintenance_after_medication",
  "hair_shedding_weight_loss",
  "gaunt_face_weight_loss",
  "loose_skin_weight_loss",
  "low_energy_fatigue",
  "libido_sexual_wellness",
  "recovery_healing",
]);

// Maintenance concerns (regardless of product type)
const MAINTENANCE_CONCERNS = new Set([
  "maintenance_after_medication",
  "preventative_aging",
]);

function classifyTreatmentRole(product, concern) {
  const productType = product?.product_type || "";
  const concernSlug = concern?.concern_id || "";
  const concernCategory = concern?.category || "";

  // Guardrails are always alternative
  if (productType === "guardrail_record") return "alternative";

  // Maintenance concerns
  if (MAINTENANCE_CONCERNS.has(concernSlug)) {
    if (productType === "skincare" || productType === "collagen_supplement") return "maintenance";
    return "maintenance";
  }

  // Prescription meds: primary for weight concerns, complementary for aesthetic
  if (productType === "prescription_medication" || productType === "compounded_medication") {
    if (WEIGHT_CONCERNS.has(concernSlug) || concernCategory === "weight_management" || concernCategory === "wellness") {
      return "primary";
    }
    return "complementary";
  }

  // Skincare is enhancer for most concerns, but maintenance for ongoing ones
  if (productType === "skincare" || productType === "sunscreen") {
    if (concernCategory === "skin_quality" || concernCategory === "pigmentation") {
      // Skincare can be primary for skin quality concerns (acne, dullness, texture)
      return "enhancer";
    }
    return "enhancer";
  }

  // Devices treating body concerns they're not designed for = complementary
  if (
    productType === "device" &&
    (concernCategory === "weight_management" || concernCategory === "wellness")
  ) {
    return "complementary";
  }

  // Default from type map
  return TYPE_TO_ROLE[productType] || "complementary";
}

// ═════════════════════════════════════════════════════════════════════════════
// Anatomy Specificity Classification
//
// Logic: product_type determines how precisely it targets an anatomy area.
// - Injectables (fillers, neurotoxins) = sub_area (injected at specific points)
// - Devices (lasers, RF, IPL) = full_area (treat the whole zone)
// - Skincare = full_area (applied broadly)
// - Body contouring devices = full_area (cover the whole region)
//
// Areas without sub_areas = always full_area (nothing smaller to target).
// Low relevance products = adjacent_benefit.
// ═════════════════════════════════════════════════════════════════════════════

// Anatomy areas where injectables are truly sub_area (precise injection sites)
const INJECTABLE_PRECISE_AREAS = new Set([
  "lips", "periorbital", "cheeks", "chin", "jawline", "temples",
  "forehead", "brow", "nose", "neck",
]);

// Areas that are always full_area (no sub-targeting makes sense)
const ALWAYS_FULL_AREAS = new Set([
  "full_face", "scalp", "flanks", "intimate_area",
]);

function classifyAnatomySpecificity(product, area) {
  const productType = product?.product_type || "";
  const areaSlug = area?.area_id || "";
  const subAreas = area?.sub_areas || [];
  const notes = ""; // not using notes since they're sparse

  // Areas without sub-areas or explicitly full = always full_area
  if (subAreas.length === 0 || ALWAYS_FULL_AREAS.has(areaSlug)) {
    return "full_area";
  }

  // Injectables at face areas with sub_areas = sub_area (they inject at points)
  if (productType === "injectable" && INJECTABLE_PRECISE_AREAS.has(areaSlug)) {
    return "sub_area";
  }
  // Bio-remodeler is injectable-like
  if (productType === "bio_remodeler" && INJECTABLE_PRECISE_AREAS.has(areaSlug)) {
    return "sub_area";
  }

  // Micro-coring is extremely precise
  if (productType === "micro_coring_device") return "sub_area";

  // Devices = full_area (they treat broad zones)
  if (
    productType === "device" ||
    productType === "fractional_co2_laser" ||
    productType === "non_ablative_laser" ||
    productType === "rf_ultrasound_device" ||
    productType === "cellulite_device" ||
    productType === "microwave_device"
  ) {
    return "full_area";
  }

  // Skincare / topicals = full_area
  if (
    productType === "skincare" ||
    productType === "sunscreen" ||
    productType === "exosome_serum" ||
    productType === "scar_treatment" ||
    productType === "topical_prescription"
  ) {
    return "full_area";
  }

  // Chemical peels = full_area
  if (productType === "chemical_peel" || productType === "biorevitalization_peel") {
    return "full_area";
  }

  // Body treatments for body areas = full_area
  if (area?.category === "body") return "full_area";

  // Default
  return "full_area";
}

// ═════════════════════════════════════════════════════════════════════════════
// Pagination helper — Supabase caps at 1000 rows per request
// ═════════════════════════════════════════════════════════════════════════════

async function fetchAll(table, select, filter) {
  const PAGE = 1000;
  let offset = 0;
  const all = [];
  while (true) {
    let q = sb.from(table).select(select).order("id").range(offset, offset + PAGE - 1);
    if (filter) q = filter(q);
    const { data, error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE) break;
    offset += PAGE;
  }
  return all;
}

// ═════════════════════════════════════════════════════════════════════════════
// Main
// ═════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(DRY_RUN ? "=== DRY RUN ===" : "=== LIVE RUN ===");

  // Load reference data
  const [products, concerns, areas] = await Promise.all([
    fetchAll("gl_products", "id, name, product_type"),
    fetchAll("gl_concerns", "id, concern_id, label, category"),
    fetchAll("gl_anatomy_areas", "id, area_id, label, category, sub_areas"),
  ]);

  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
  const concernMap = Object.fromEntries(concerns.map((c) => [c.id, c]));
  const areaMap = Object.fromEntries(areas.map((a) => [a.id, a]));

  console.log(
    `Loaded: ${products.length} products, ${concerns.length} concerns, ${areas.length} areas`,
  );

  // ── 1. treatment_role ──
  console.log("\n--- Populating treatment_role ---");
  const pcRows = await fetchAll(
    "gl_product_concerns",
    "id, product_id, concern_id, relevance_score, notes",
    (q) => q.is("treatment_role", null),
  );
  console.log(`Found ${pcRows.length} NULL treatment_role rows`);

  const roleStats = { primary: 0, enhancer: 0, complementary: 0, maintenance: 0, prep: 0, alternative: 0 };
  const pcUpdates = [];
  for (const row of pcRows) {
    const role = classifyTreatmentRole(productMap[row.product_id], concernMap[row.concern_id]);
    roleStats[role]++;
    pcUpdates.push({ id: row.id, treatment_role: role });
  }
  console.log("Distribution:", roleStats);

  // Show samples per role
  for (const role of Object.keys(roleStats)) {
    const samples = pcUpdates
      .filter((u) => u.treatment_role === role)
      .slice(0, 3)
      .map((u) => {
        const row = pcRows.find((r) => r.id === u.id);
        const p = productMap[row.product_id];
        const c = concernMap[row.concern_id];
        return `${p?.name || "?"} × ${c?.label || "?"}`;
      });
    if (samples.length > 0) console.log(`  ${role}: ${samples.join("; ")}`);
  }

  if (!DRY_RUN && pcUpdates.length > 0) {
    let updated = 0;
    // Group by role for batch updates
    const byRole = {};
    for (const u of pcUpdates) {
      if (!byRole[u.treatment_role]) byRole[u.treatment_role] = [];
      byRole[u.treatment_role].push(u.id);
    }
    for (const [role, ids] of Object.entries(byRole)) {
      // Supabase .in() has a limit, batch by 500
      for (let i = 0; i < ids.length; i += 500) {
        const batch = ids.slice(i, i + 500);
        const { error } = await sb
          .from("gl_product_concerns")
          .update({ treatment_role: role })
          .in("id", batch);
        if (error) console.error(`Error [treatment_role=${role}]:`, error.message);
        else updated += batch.length;
      }
    }
    console.log(`Updated ${updated} rows`);
  }

  // ── 2. anatomy_specificity ──
  console.log("\n--- Populating anatomy_specificity ---");
  const paRows = await fetchAll(
    "gl_product_anatomy",
    "id, product_id, anatomy_area_id, relevance_score, notes",
    (q) => q.is("anatomy_specificity", null),
  );
  console.log(`Found ${paRows.length} NULL anatomy_specificity rows`);

  const specStats = { full_area: 0, sub_area: 0, adjacent_benefit: 0 };
  const paUpdates = [];
  for (const row of paRows) {
    const spec = classifyAnatomySpecificity(productMap[row.product_id], areaMap[row.anatomy_area_id]);
    specStats[spec]++;
    paUpdates.push({ id: row.id, anatomy_specificity: spec });
  }
  console.log("Distribution:", specStats);

  // Show samples per specificity
  for (const spec of Object.keys(specStats)) {
    const samples = paUpdates
      .filter((u) => u.anatomy_specificity === spec)
      .slice(0, 3)
      .map((u) => {
        const row = paRows.find((r) => r.id === u.id);
        const p = productMap[row.product_id];
        const a = areaMap[row.anatomy_area_id];
        return `${p?.name || "?"} × ${a?.label || "?"}`;
      });
    if (samples.length > 0) console.log(`  ${spec}: ${samples.join("; ")}`);
  }

  if (!DRY_RUN && paUpdates.length > 0) {
    let updated = 0;
    const bySpec = {};
    for (const u of paUpdates) {
      if (!bySpec[u.anatomy_specificity]) bySpec[u.anatomy_specificity] = [];
      bySpec[u.anatomy_specificity].push(u.id);
    }
    for (const [spec, ids] of Object.entries(bySpec)) {
      for (let i = 0; i < ids.length; i += 500) {
        const batch = ids.slice(i, i + 500);
        const { error } = await sb
          .from("gl_product_anatomy")
          .update({ anatomy_specificity: spec })
          .in("id", batch);
        if (error) console.error(`Error [anatomy_specificity=${spec}]:`, error.message);
        else updated += batch.length;
      }
    }
    console.log(`Updated ${updated} rows`);
  }

  // ── Verify ──
  if (!DRY_RUN) {
    console.log("\n--- Verification ---");
    const { count: pcNull } = await sb
      .from("gl_product_concerns")
      .select("id", { count: "exact", head: true })
      .is("treatment_role", null);
    const { count: paNull } = await sb
      .from("gl_product_anatomy")
      .select("id", { count: "exact", head: true })
      .is("anatomy_specificity", null);
    console.log(`Remaining NULL treatment_role: ${pcNull}`);
    console.log(`Remaining NULL anatomy_specificity: ${paNull}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
