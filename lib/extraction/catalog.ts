/**
 * Demo offer catalog for the Extraction Setup screen (from the v3.3 test-harness
 * catalog snapshot). Used to populate the product multi-select. Swap for a live
 * catalog query (gl_products / pl_products) when wiring real runs.
 */

export interface CatalogItem {
  name: string;
  kind: "product" | "service";
  category: string;
}

export const DEMO_CATALOG: CatalogItem[] = [
  // Neurotoxins
  { name: "Botox Cosmetic", kind: "product", category: "Neurotoxin" },
  { name: "Dysport", kind: "product", category: "Neurotoxin" },
  { name: "Daxxify", kind: "product", category: "Neurotoxin" },
  { name: "Jeuveau", kind: "product", category: "Neurotoxin" },
  { name: "Xeomin", kind: "product", category: "Neurotoxin" },
  // Fillers (HA)
  { name: "Juvederm Ultra XC", kind: "product", category: "Filler" },
  { name: "Juvederm Ultra Plus XC", kind: "product", category: "Filler" },
  { name: "Juvederm Volbella XC", kind: "product", category: "Filler" },
  { name: "Juvederm Vollure XC", kind: "product", category: "Filler" },
  { name: "Juvederm Voluma XC", kind: "product", category: "Filler" },
  { name: "Juvederm Volux XC", kind: "product", category: "Filler" },
  { name: "Restylane", kind: "product", category: "Filler" },
  { name: "Restylane Contour", kind: "product", category: "Filler" },
  { name: "Restylane Lyft", kind: "product", category: "Filler" },
  { name: "RHA Redensity", kind: "product", category: "Filler" },
  { name: "SKINVIVE", kind: "product", category: "Filler" },
  // Biostimulators / other injectables
  { name: "Sculptra Aesthetic", kind: "product", category: "Biostimulator" },
  { name: "Kybella", kind: "product", category: "Injectable" },
  // Devices
  { name: "Morpheus8", kind: "product", category: "Device" },
  { name: "Votiva", kind: "product", category: "Device" },
  { name: "Sofwave", kind: "product", category: "Device" },
  { name: "Ultherapy PRIME", kind: "product", category: "Device" },
  { name: "CoolSculpting Elite", kind: "product", category: "Device" },
  { name: "Emsculpt Neo", kind: "product", category: "Device" },
  { name: "LightSheer", kind: "product", category: "Device" },
  { name: "Hollywood Spectra", kind: "product", category: "Device" },
  { name: "JOULE", kind: "product", category: "Device" },
  { name: "HydraFacial", kind: "product", category: "Device" },
  // Weight management
  { name: "Compounded Semaglutide", kind: "product", category: "Weight" },
  { name: "Compounded Tirzepatide", kind: "product", category: "Weight" },
  { name: "Wegovy / Ozempic", kind: "product", category: "Weight" },
  { name: "Mounjaro / Zepbound", kind: "product", category: "Weight" },
  // Services
  { name: "BBL HERO", kind: "service", category: "Laser" },
  { name: "Forever Clear BBL", kind: "service", category: "Laser" },
  { name: "Forever Young BBL", kind: "service", category: "Laser" },
  { name: "Halo Hybrid Fractional Laser", kind: "service", category: "Laser" },
  { name: "Hollywood Spectra Laser Facial", kind: "service", category: "Laser" },
  { name: "Laser Hair Removal", kind: "service", category: "Laser" },
  { name: "Morpheus8 Face", kind: "service", category: "RF Microneedling" },
  { name: "Morpheus8 Body", kind: "service", category: "RF Microneedling" },
  { name: "ProFractional Laser Resurfacing", kind: "service", category: "Laser" },
  { name: "SkinTyte", kind: "service", category: "Skin Tightening" },
  { name: "Ultherapy PRIME Lift", kind: "service", category: "Skin Tightening" },
  { name: "Votiva / Morpheus8V", kind: "service", category: "RF Microneedling" },
];

export const PROMPT_SETS = [
  { id: "3.3", label: "v3.3 (Context + Outcome)", active: true },
  { id: "2step_v32", label: "2-step v3.2", active: false },
  { id: "2step_pi", label: "2-step PI", active: false },
];
