import type { LpoaDevice } from "../types";

// Candela GentleMax Pro device pack.
//
// Source of truth: Candela GentleMAX Operator's Manual, PN 8501-00-1810 Rev 06
// (June 2007). All values below are transcribed from the page-cited extraction
// at .planning-lpoa/data/gentlemax-pro-manual-extract.json.
//
// CRITICAL: this manual contains real device SPECIFICATION envelopes + safety
// content, but deliberately DEFERS all per-indication recommended treatment
// settings to a separate Clinical Treatment Guidelines doc (P/N 8502-00-0907,
// not in corpus). Recommended-dose fields therefore live in `lockedFields` and
// must render locked — never as a fabricated number.

export const gentlemaxPro: LpoaDevice = {
  id: "candela-gentlemax-pro",
  manufacturer: "Candela",
  model: "GentleMax Pro",
  wavelengths: ["755 nm (Alexandrite)", "1064 nm (Nd:YAG)"],
  branding: {
    name: "Candela GentleMax Pro",
    subtitle: "Dual-wavelength 755 nm / 1064 nm · Operator Manual Reference",
  },
  manual: {
    url: "/manuals/gentlemax-pro.pdf",
    name: "GentleMAX Operator's Manual",
    pages: 182,
    revision: "Rev 06 (PN 8501-00-1810)",
    date: "June 2007",
    sourceQuality: "operator_manual",
  },

  specs: {
    spotSizesMm: {
      value: [1.5, 3, 6, 8, 10, 12, 15, 18],
      page: 154,
      quote: "Spot sizes: 1.5, 3, 6, 8, 10, 12, 15 and 18 mm diameter.",
    },
    maxEnergyJ: [
      { wavelength: "755 nm (Alexandrite)", value: 53, page: 154 },
      { wavelength: "1064 nm (Nd:YAG)", value: 79.2, page: 154 },
    ],
    pulseWidthMs: {
      capability: "0.25 – 300 ms",
      bands: ["0.25-0.50", "3-300", "10-300"],
      pages: [73, 77, 105, 154],
      inconsistencyNote:
        "The manual prints two minimum pulse widths: 0.35 ms in the Ch.6 spec table (p154) and 0.25 ms in the operating-control text and Table 3-6 (p77, p105). Both are shown; neither is silently chosen.",
    },
    repetitionRateHz: {
      value: "Single, or 0.5 – 10 Hz (depends on spot size and pulse duration)",
      page: 77,
    },
    eyewearOd: {
      value: "O.D. ≥ 5.8 at 755 nm; O.D. ≥ 6.3 at 1064 nm",
      page: 26,
    },
  },

  // Real fluence-capability tables from manual p73 (device envelope / limits).
  fluenceTables: [
    // 755 nm Alexandrite
    { wavelength: "755", spotMm: 6, pulseBandMs: "0.25-0.50", minJcm2: 6, maxJcm2: 30 },
    { wavelength: "755", spotMm: 6, pulseBandMs: "3-300", minJcm2: 35, maxJcm2: 150 },
    { wavelength: "755", spotMm: 8, pulseBandMs: "0.25-0.50", minJcm2: 6, maxJcm2: 20 },
    { wavelength: "755", spotMm: 8, pulseBandMs: "3-300", minJcm2: 20, maxJcm2: 100 },
    { wavelength: "755", spotMm: 10, pulseBandMs: "0.25-0.50", minJcm2: 6, maxJcm2: 12 },
    { wavelength: "755", spotMm: 10, pulseBandMs: "3-300", minJcm2: 20, maxJcm2: 60 },
    { wavelength: "755", spotMm: 12, pulseBandMs: "3-300", minJcm2: 10, maxJcm2: 40 },
    { wavelength: "755", spotMm: 15, pulseBandMs: "3-300", minJcm2: 6, maxJcm2: 30 },
    { wavelength: "755", spotMm: 18, pulseBandMs: "3-300", minJcm2: 6, maxJcm2: 20 },
    // 1064 nm Nd:YAG
    { wavelength: "1064", spotMm: 1.5, pulseBandMs: "0.25-0.50", minJcm2: 200, maxJcm2: 600 },
    { wavelength: "1064", spotMm: 3, pulseBandMs: "0.25-0.50", minJcm2: 50, maxJcm2: 460 },
    { wavelength: "1064", spotMm: 6, pulseBandMs: "0.25-0.50", minJcm2: 6, maxJcm2: 30 },
    { wavelength: "1064", spotMm: 6, pulseBandMs: "3-300", minJcm2: 35, maxJcm2: 200 },
    { wavelength: "1064", spotMm: 8, pulseBandMs: "0.25-0.50", minJcm2: 6, maxJcm2: 20 },
    { wavelength: "1064", spotMm: 8, pulseBandMs: "3-300", minJcm2: 20, maxJcm2: 150 },
    { wavelength: "1064", spotMm: 10, pulseBandMs: "0.25-0.50", minJcm2: 6, maxJcm2: 12 },
    { wavelength: "1064", spotMm: 10, pulseBandMs: "3-300", minJcm2: 20, maxJcm2: 100 },
    { wavelength: "1064", spotMm: 12, pulseBandMs: "3-300", minJcm2: 10, maxJcm2: 70 },
    { wavelength: "1064", spotMm: 15, pulseBandMs: "3-300", minJcm2: 6, maxJcm2: 44 },
    { wavelength: "1064", spotMm: 18, pulseBandMs: "3-300", minJcm2: 6, maxJcm2: 30 },
  ],

  dcd: [
    { param: "DCD Pre-Spray duration", range: "0 (off), or 10 – 100 ms", page: 74 },
    { param: "DCD Delay duration", range: "3 – 150 ms", page: 75 },
    { param: "DCD Post-Spray duration", range: "0 (off), or 10 – 50 ms", page: 75 },
    { param: "Cryogen", range: "HFC 134a / GentleCool, 1000 g dual-canister auto-switch", page: 154 },
  ],

  indications: [
    { name: "Hair removal", wavelengths: "755 + 1064", page: 22 },
    { name: "Dermatological vascular lesions", wavelengths: "755 + 1064", page: 22 },
    { name: "Photorejuvenation (software application option)", wavelengths: "755 + 1064", page: 101 },
    { name: "Other indicated dermatological applications", wavelengths: "755 + 1064", page: 22 },
  ],

  contraindications: [
    { text: "Personal history of skin cancer, such as melanoma.", page: 23 },
    { text: "Infected 'target' tattoo site or adjacent areas.", page: 23 },
    { text: "Photosensitivity in the 755 nm region.", page: 23 },
    { text: "Using medication for which infra-red light is a contraindication.", page: 23 },
  ],

  warnings: [
    { text: "Class 4 laser: protective eyewear required for all persons in the treatment room during operation.", page: 24 },
    { text: "Match the spot size on the lens cartridge / distance gauge to the control-panel spot size, or improper energy is delivered to the patient.", page: 24 },
    { text: "Always recalibrate after changing the delivery system, handpiece, lens or windows; failure may deliver excessive energy.", page: 24 },
    { text: "Too-short a cryogen spray duration for a given spot size may cause patient burns.", page: 33 },
    { text: "Overlapping treatment spots may cause crescent and general burns.", page: 33 },
    { text: "Tilting the distance gauge produces an elliptical spot and crescent burns; hold perpendicular to the skin.", page: 33 },
    { text: "Replace the cryogen canister when prompted, or reduced epidermal cooling may cause burns.", page: 33 },
    { text: "Flash-fire hazard in an oxygen-enriched atmosphere; shave and keep hair-bearing areas moist; avoid alcohol/acetone prep.", page: 30 },
    { text: "Cryogen ventilation: keep the treatment area below 1000 ppm; minimum 40 sq ft room; rooms under 513 sq ft need ≥130 CFM exhaust.", page: 28 },
    { text: "Frostbite distances (Table 1-3): 27 in visual from the canister; 19 in visual from the handpiece tip.", page: 29 },
    { text: "Caution with the 1.5 mm and 3.0 mm spots at 755 nm — no currently approved indications for these spot sizes.", page: 72 },
  ],

  guidedModeInputs: [
    { indication: "Hair removal", inputs: ["Skin (Fitzpatrick type, Tan)", "Hair (Color, Thickness)"], page: 103 },
    { indication: "Vascular", inputs: ["Skin (Fitzpatrick type)", "Vessel (Type, Size)"], page: 103 },
    { indication: "Photorejuvenation", inputs: ["Skin (Fitzpatrick type)", "Treatment (Type/Location)"], page: 103 },
  ],

  lockedFields: [
    {
      key: "recommended_fluence",
      label: "Recommended fluence for this indication / skin type",
      status: "locked",
      reason:
        "The operator manual does not print recommended per-indication fluence. Candela defers treatment settings to the Clinical Treatment Guidelines (P/N 8502-00-0907) and on-device Guided Mode. Set within the real fluence envelope shown, using clinical judgment.",
      deferredToPages: [22, 103],
    },
    {
      key: "recommended_pulse_width",
      label: "Recommended pulse duration for this indication / skin type",
      status: "locked",
      reason:
        "No recommended pulse duration per indication or skin type in this manual — only the device capability (0.25–300 ms) and the three fluence-table bands.",
      deferredToPages: [73, 103],
    },
    {
      key: "recommended_dcd",
      label: "Recommended DCD spray / delay for this indication",
      status: "locked",
      reason:
        "No recommended treatment DCD settings in this manual. The only per-spot DCD numbers given are for the cryogen coverage functionality test, which the manual states are 'not intended to represent treatment parameters' (p91).",
      deferredToPages: [91, 103],
    },
  ],

  suggestedQuestions: [
    "What is the maximum fluence for a 10 mm Alexandrite spot?",
    "What are the DCD pre-spray and delay ranges?",
    "What are the contraindications for treatment?",
    "What protective eyewear O.D. is required for each wavelength?",
    "What spot sizes are available on the GentleMax Pro?",
  ],

  faqs: [
    {
      question: "What wavelengths does the GentleMax Pro deliver?",
      answer:
        "Two, from a single delivery system: 755 nm Alexandrite and 1064 nm Nd:YAG, optically combined on the laser rail.",
      page: 20,
      section: "System Description",
      tags: ["wavelength", "specifications"],
    },
    {
      question: "What is the maximum delivered energy?",
      answer:
        "53 J at 755 nm (Alexandrite) and 79.2 J at 1064 nm (Nd:YAG). Output energy accuracy is ±20%.",
      page: 154,
      section: "Specifications",
      tags: ["energy", "specifications"],
    },
    {
      question: "What are the contraindications for treatment?",
      answer:
        "Personal history of skin cancer (e.g. melanoma); an infected target tattoo site or adjacent areas; photosensitivity in the 755 nm region; and using any medication for which infra-red light is a contraindication.",
      page: 23,
      section: "Contraindications",
      tags: ["safety", "contraindications"],
    },
    {
      question: "What protective eyewear is required?",
      answer:
        "Optical density O.D. ≥ 5.8 for 755 nm and O.D. ≥ 6.3 for 1064 nm. This is a Class 4 laser — everyone in the treatment room must wear protective eyewear during operation.",
      page: 26,
      section: "Safety",
      tags: ["safety", "eyewear"],
    },
    {
      question: "What are the DCD cooling settings ranges?",
      answer:
        "Pre-spray 0 (off) or 10–100 ms; delay 3–150 ms; post-spray 0 (off) or 10–50 ms. Cryogen is HFC 134a (GentleCool), 1000 g dual-canister with auto-switchover.",
      page: 74,
      section: "Dynamic Cooling Device",
      tags: ["cooling", "DCD"],
    },
    {
      question: "Why does the tool not show a recommended fluence for my patient?",
      answer:
        "Because this operator manual does not contain per-indication or per-Fitzpatrick recommended fluence. Candela deliberately keeps those in a separate Clinical Treatment Guidelines document and in the on-device Guided Mode. This tool shows the real fluence envelope so you can set a value within the device's limits using clinical judgment, rather than displaying a number the manual never stated.",
      page: 103,
      section: "Guided Mode",
      tags: ["settings", "source-lock"],
    },
  ],
};

/** Active device for this milestone (single-device tool). */
export const activeDevice: LpoaDevice = gentlemaxPro;
