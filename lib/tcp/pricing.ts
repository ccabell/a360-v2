// =============================================================================
// TCP pricing — the stacking-calculator model, mirrored from the Voice Bot
// Quick Quote (app/lib/pricingContext.ts + components/QuickQuote/types.ts).
// Per-unit prices + unit type + default quantity per hero product. A care-plan
// line = quantity × unitPrice. Synthetic demo pricing (no real practice price
// data exists) — present as illustrative.
// =============================================================================

export type UnitType = "units" | "syringes" | "vials" | "sessions";

export interface PricingEstimate {
  unitType: UnitType;
  unitPrice: number;
  defaultQuantity: number;
  /** Per-area quantity hints (units summed; fillers/devices take the max). */
  anatomy?: Record<string, number>;
}

/** Keyed by the product name used in TcpRecommendation.name. */
export const TCP_PRICING: Record<string, PricingEstimate> = {
  "Botox Cosmetic": {
    unitType: "units",
    unitPrice: 12,
    defaultQuantity: 40,
    anatomy: { forehead: 15, glabella: 20, "crow's feet": 10, "frown lines": 20 },
  },
  "Juvederm Voluma XC": {
    unitType: "syringes",
    unitPrice: 700,
    defaultQuantity: 1,
    anatomy: { cheeks: 2, midface: 2, chin: 1, jawline: 1 },
  },
  "Juvederm Vollure XC": {
    unitType: "syringes",
    unitPrice: 650,
    defaultQuantity: 1,
    anatomy: { "nasolabial folds": 1, "marionette lines": 1, lips: 1 },
  },
  "Sculptra Aesthetic": {
    unitType: "vials",
    unitPrice: 750,
    defaultQuantity: 2,
    anatomy: { cheeks: 2, temples: 1, "midface": 2 },
  },
  "SKINVIVE by Juvederm": {
    unitType: "syringes",
    unitPrice: 650,
    defaultQuantity: 1,
    anatomy: { cheeks: 1 },
  },
  "Restylane Lyft": {
    unitType: "syringes",
    unitPrice: 700,
    defaultQuantity: 1,
    anatomy: { cheeks: 1, midface: 1 },
  },
  "InMode Morpheus8": {
    unitType: "sessions",
    unitPrice: 900,
    defaultQuantity: 3,
  },
  "Merz Ultherapy PRIME": {
    unitType: "sessions",
    unitPrice: 2800,
    defaultQuantity: 1,
  },
};

export const TCP_SETTINGS = {
  paymentTerms: [1, 12, 24] as number[], // 1 = pay in full
  defaultTerm: 12,
  packageDiscountMax: 20,
  defaultPackageDiscount: 10,
};

export function getPricing(name: string): PricingEstimate | null {
  return TCP_PRICING[name] ?? null;
}

/** Estimate a starting quantity from the recommendation's area. */
export function estimateQuantity(name: string, area?: string): number {
  const p = getPricing(name);
  if (!p) return 1;
  if (!area || !p.anatomy) return p.defaultQuantity;
  const a = area.toLowerCase();
  const matches = Object.entries(p.anatomy).filter(([k]) => a.includes(k));
  if (matches.length === 0) return p.defaultQuantity;
  if (p.unitType === "units") {
    return matches.reduce((sum, [, q]) => sum + q, 0) || p.defaultQuantity;
  }
  return Math.max(p.defaultQuantity, ...matches.map(([, q]) => q));
}

export function unitLabel(unitType: UnitType, qty: number): string {
  if (unitType === "units") return "units";
  if (qty === 1) return unitType.replace(/s$/, "");
  return unitType;
}
