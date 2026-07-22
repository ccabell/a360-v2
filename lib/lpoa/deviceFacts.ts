import { activeDevice } from "./devices/gentlemax-pro";

// Renders the structured device pack as a compact, page-cited fact sheet that
// is ALWAYS included in the Manual Assistant's context. This exists because
// keyword retrieval over extracted PDF text fails on tables (pdfjs flattens
// the p73 fluence tables into a keyword-poor number stream), which made the
// assistant decline questions the manual genuinely answers. Every line below
// carries its real manual page.

export function buildDeviceFactsBlock(): string {
  const d = activeDevice;

  const fluence755 = d.fluenceTables
    .filter((r) => r.wavelength === "755")
    .map((r) => `  - ${r.spotMm} mm spot, ${r.pulseBandMs} ms pulse band: ${r.minJcm2}-${r.maxJcm2} J/cm² [Page 73]`)
    .join("\n");
  const fluence1064 = d.fluenceTables
    .filter((r) => r.wavelength === "1064")
    .map((r) => `  - ${r.spotMm} mm spot, ${r.pulseBandMs} ms pulse band: ${r.minJcm2}-${r.maxJcm2} J/cm² [Page 73]`)
    .join("\n");

  const dcd = d.dcd.map((x) => `- ${x.param}: ${x.range} [Page ${x.page}]`).join("\n");
  const contra = d.contraindications.map((c) => `- ${c.text} [Page ${c.page}]`).join("\n");
  const warn = d.warnings.map((w) => `- ${w.text} [Page ${w.page}]`).join("\n");
  const energy = d.specs.maxEnergyJ.map((e) => `- Max delivered energy ${e.wavelength}: ${e.value} J [Page ${e.page}]`).join("\n");

  return `VERIFIED DEVICE DATA (structured, transcribed directly from the ${d.manual.name}, ${d.manual.revision} — treat as authoritative manual content with the page citations shown):

DEVICE: ${d.branding.name} — wavelengths ${d.wavelengths.join(", ")} [Page 20]
SPOT SIZES: ${d.specs.spotSizesMm.value.join(", ")} mm [Page ${d.specs.spotSizesMm.page}]
NOTE: no currently approved indications for the 1.5 mm and 3.0 mm spots at 755 nm [Page 72]

FLUENCE CAPABILITY TABLES (these are the device's ALLOWED min-max operating ranges per spot size — NOT recommended treatment doses):
755 nm Alexandrite:
${fluence755}
1064 nm Nd:YAG:
${fluence1064}
Fluence adjusts in increments of 1, 2, 5, 10, 20 J/cm² [Page 72]

${energy}
PULSE WIDTH: ${d.specs.pulseWidthMs.capability} (spec table prints 0.35 ms minimum on Page 154; operating text prints 0.25 ms on Pages 77/105 — both exist in the manual)
REPETITION RATE: ${d.specs.repetitionRateHz.value} [Page ${d.specs.repetitionRateHz.page}]
EYEWEAR: ${d.specs.eyewearOd.value} [Page ${d.specs.eyewearOd.page}]

DCD COOLING RANGES:
${dcd}

CONTRAINDICATIONS:
${contra}

KEY WARNINGS:
${warn}

IMPORTANT DISTINCTION when answering:
- Questions about device capability/limits/ranges/specifications ("what is the maximum fluence for X spot", "what spot sizes exist", "what are the DCD ranges") ARE answered by the tables above — answer them directly with the page citations.
- Questions about RECOMMENDED treatment settings for an indication/skin type are NOT in this manual (Candela defers them to the separate Clinical Treatment Guidelines); say so, but you may still state the device's allowed range for the configuration and point to the tool's Settings Builder for literature-based starting points.`;
}
