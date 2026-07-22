// GentleMax Pro treatment-parameter recommendation engine.
//
// HONESTY MODEL (important): the GentleMax Pro *operator manual* does not contain
// recommended treatment settings — only the device's fluence/DCD limits. The
// recommendations below are sourced from published clinical literature, each
// carrying its citation and an evidence tier. They are ADVISORY starting points,
// constrained to the manual's real device envelope, and require clinician
// sign-off before clinical use. Nothing here is fabricated: every value traces
// to a cited source, and where a source is cross-platform or literature-synthesis
// it is labeled as such (not presented as a Candela chart).
//
// The authoritative Candela "Clinical Treatment Guidelines" charts (P/N
// 8502-00-0907) are not publicly extractable; when obtained, this module should
// be re-grounded in them (tier: manufacturer) and re-reviewed.

export type EvidenceTier =
  | "candela_device" // study on a genuine Candela device
  | "literature" // peer-reviewed, same wavelength/modality
  | "cross_platform" // same wavelength, different manufacturer's device
  | "principle"; // derived from an established dosing principle, not a table

export interface RecSource {
  id: string;
  label: string;
  authors: string;
  year: string;
  url: string;
  tier: EvidenceTier;
  note?: string;
}

export const REC_SOURCES: Record<string, RecSource> = {
  vasc_yang: {
    id: "vasc_yang",
    label: "Long-Pulsed 1064 nm Nd:YAG for cutaneous vascular lesions",
    authors: "Yang et al.",
    year: "2012",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3458278/",
    tier: "candela_device",
    note: "Genuine Candela GentleYAG; exact fluence/pulse/spot/DCD by vessel size (97% facial clearance).",
  },
  hair_eremia: {
    id: "hair_eremia",
    label: "Long-term hair removal with a 755 nm Alexandrite laser",
    authors: "Eremia et al.",
    year: "2001",
    url: "https://onlinelibrary.wiley.com/doi/abs/10.1046/j.1524-4725.2001.01074.x",
    tier: "literature",
    note: "Fitzpatrick-specific 755 nm fluences reported in the literature — verify against the primary before clinical use.",
  },
  hair_dark_1064: {
    id: "hair_dark_1064",
    label: "Long-pulsed 1064 nm Nd:YAG hair removal in dark (IV–VI) skin",
    authors: "PMC2840900",
    year: "2010",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2840900/",
    tier: "cross_platform",
    note: "Device was Cutera Coolglide (not Candela); 1064 nm dosing transfers with caution — cross-platform reference.",
  },
  pulse_pmfa: {
    id: "pulse_pmfa",
    label: "2 ms vs 3 ms pulse duration in LHR (755 nm)",
    authors: "PMFA Journal",
    year: "2023",
    url: "https://www.thepmfajournal.com/features/features/post/sponsored-content-evaluating-the-efficacy-of-2-millisecond-versus-3-millisecond-pulse-duration-in-laser-hair-removal-using-a-755-nm-alexandrite-laser",
    tier: "candela_device",
    note: "GentleMax Pro Plus platform; 2 ms gave 5–9% greater fine-hair reduction vs 3 ms.",
  },
  cooling_principle: {
    id: "cooling_principle",
    label: "Epidermal-cooling dosing principle (fluence↓ / pulse↑ / cooling↑ as skin darkens)",
    authors: "Cross-source consensus",
    year: "—",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3458278/",
    tier: "principle",
    note: "DCD hair-removal values are principle-derived starting points, not a published table.",
  },
};

export type Indication = "hair_removal" | "vascular_facial" | "vascular_leg";
export type Fitzpatrick = "I" | "II" | "III" | "IV" | "V" | "VI";
export type HairThickness = "fine" | "medium" | "coarse";
export type VesselSize = "small" | "medium";

export interface RecInputs {
  indication: Indication;
  fitzpatrick: Fitzpatrick;
  hairThickness?: HairThickness;
  vesselSize?: VesselSize; // for vascular_facial
}

export interface Recommendation {
  indication: string;
  wavelength: "755" | "1064";
  fitzpatrick: Fitzpatrick;
  fluence: number;
  fluenceRange: [number, number];
  pulseMs: string;
  spotMm: number;
  dcd: string;
  interval: string;
  sessions: string;
  confidence: EvidenceTier;
  sources: RecSource[];
  notes: string[];
}

// ── 755 nm hair removal by Fitzpatrick (Eremia, literature) ────────────────
const HAIR_755: Record<string, { fluence: number; range: [number, number]; spot: number }> = {
  I: { fluence: 40, range: [35, 50], spot: 10 },
  II: { fluence: 38, range: [30, 40], spot: 10 },
  III: { fluence: 37, range: [25, 40], spot: 12 },
};

// ── 1064 nm hair removal for dark skin by hair thickness (cross-platform) ──
const HAIR_1064: Record<HairThickness, { fluence: number; range: [number, number]; pulse: number }> = {
  coarse: { fluence: 42, range: [40, 45], pulse: 18 },
  medium: { fluence: 37, range: [35, 40], pulse: 22 },
  fine: { fluence: 32, range: [30, 35], pulse: 27 },
};

// ── 1064 nm facial vascular by vessel size (Candela GentleYAG, Yang) ───────
const VASC_FACIAL: Record<VesselSize, { fluence: number; range: [number, number]; pulse: number; label: string }> = {
  small: { fluence: 340, range: [300, 400], pulse: 20, label: "< 0.5 mm vessels" },
  medium: { fluence: 250, range: [200, 300], pulse: 40, label: "0.5–1.0 mm vessels" },
};

/** DCD pre-spray suggestion (ms) scaled by Fitzpatrick — principle-derived. */
function dcdForSkin(f: Fitzpatrick): string {
  const spray = { I: 30, II: 40, III: 50, IV: 60, V: 70, VI: 80 }[f];
  return `${spray} ms pre-spray / 20 ms delay`;
}

export function recommend(inputs: RecInputs): Recommendation {
  const { indication, fitzpatrick, hairThickness = "medium", vesselSize = "small" } = inputs;

  if (indication === "vascular_facial") {
    const v = VASC_FACIAL[vesselSize];
    return {
      indication: `Facial vascular — ${v.label}`,
      wavelength: "1064",
      fitzpatrick,
      fluence: v.fluence,
      fluenceRange: v.range,
      pulseMs: String(v.pulse),
      spotMm: 1.5,
      dcd: "10 ms spray / 30 ms delay / 10 ms post",
      interval: "4 weeks",
      sessions: "up to 5",
      confidence: "candela_device",
      sources: [REC_SOURCES.vasc_yang],
      notes: [
        "1064 nm is used for vascular targets across all skin types (hemoglobin absorption, epidermal safety).",
        "Larger vessels → longer pulse, lower fluence; smaller vessels → higher fluence.",
      ],
    };
  }

  if (indication === "vascular_leg") {
    return {
      indication: "Leg vascular (telangiectasia)",
      wavelength: "1064",
      fitzpatrick,
      fluence: 270,
      fluenceRange: [180, 500],
      pulseMs: "20–180",
      spotMm: 3,
      dcd: "scale with skin type",
      interval: "4 weeks",
      sessions: "up to 5",
      confidence: "candela_device",
      sources: [REC_SOURCES.vasc_yang],
      notes: [
        "Leg vessels span a wide envelope; titrate by vessel diameter and depth.",
        "Start low, observe immediate vessel response, titrate up ~10% if no adverse reaction.",
      ],
    };
  }

  // hair_removal
  const use1064 = ["IV", "V", "VI"].includes(fitzpatrick);
  if (use1064) {
    const h = HAIR_1064[hairThickness];
    return {
      indication: `Hair removal — ${hairThickness} hair`,
      wavelength: "1064",
      fitzpatrick,
      fluence: h.fluence,
      fluenceRange: h.range,
      pulseMs: String(h.pulse),
      spotMm: 10,
      dcd: dcdForSkin(fitzpatrick),
      interval: "4–8 weeks (facial 4–6, body 6–8)",
      sessions: "6–8 typical",
      confidence: "cross_platform",
      sources: [REC_SOURCES.hair_dark_1064, REC_SOURCES.cooling_principle],
      notes: [
        "1064 nm Nd:YAG is preferred for Fitzpatrick IV–VI (safer in darker/tanned skin).",
        "Thicker hair → higher fluence, shorter pulse; finer hair → lower fluence, longer pulse.",
        "Dosing table is from a cross-platform 1064 nm study; verify on-device and start with a test spot.",
      ],
    };
  }

  const h = HAIR_755[fitzpatrick] ?? HAIR_755.III;
  const pulse = hairThickness === "fine" ? "2" : "3";
  return {
    indication: `Hair removal — ${hairThickness} hair`,
    wavelength: "755",
    fitzpatrick,
    fluence: h.fluence,
    fluenceRange: h.range,
    pulseMs: pulse,
    spotMm: h.spot,
    dcd: dcdForSkin(fitzpatrick),
    interval: "4–8 weeks (facial 4–6, body 6–8)",
    sessions: "6–8 typical",
    confidence: "literature",
    sources: [
      REC_SOURCES.hair_eremia,
      ...(hairThickness === "fine" ? [REC_SOURCES.pulse_pmfa] : []),
      REC_SOURCES.cooling_principle,
    ],
    notes: [
      "755 nm Alexandrite is preferred for Fitzpatrick I–III (higher melanin absorption).",
      hairThickness === "fine"
        ? "2 ms pulse gave 5–9% greater fine-hair reduction vs 3 ms on the GentleMax Pro Plus."
        : "Standard 3 ms pulse for medium/coarse hair.",
      "Fluences are literature-derived — verify against the primary study and a test spot.",
    ],
  };
}

import { activeDevice } from "./devices/gentlemax-pro";

/** Check a recommended fluence against the manual's tabulated envelope (p73). */
export function envelopeCheck(
  wavelength: "755" | "1064",
  spotMm: number,
  fluence: number,
): { ok: boolean; text: string; page: number } {
  const rows = activeDevice.fluenceTables.filter(
    (r) => r.wavelength === wavelength && r.spotMm === spotMm,
  );
  if (rows.length === 0) {
    return {
      ok: true,
      text: `${spotMm} mm not separately tabulated for ${wavelength} nm; within device capability.`,
      page: 73,
    };
  }
  const min = Math.min(...rows.map((r) => r.minJcm2));
  const max = Math.max(...rows.map((r) => r.maxJcm2));
  if (fluence >= min && fluence <= max) {
    return { ok: true, text: `Within the manual's ${min}–${max} J/cm² envelope for ${spotMm} mm (p73).`, page: 73 };
  }
  return {
    ok: false,
    text: `${fluence} J/cm² is outside the manual's tabulated ${min}–${max} J/cm² for ${spotMm} mm (p73) — consider a different spot or verify.`,
    page: 73,
  };
}

export const TIER_LABEL: Record<EvidenceTier, { label: string; color: string }> = {
  candela_device: { label: "Candela device study", color: "#34d399" },
  literature: { label: "Peer-reviewed literature", color: "#fbbf24" },
  cross_platform: { label: "Cross-platform 1064 nm", color: "#fb923c" },
  principle: { label: "Dosing principle", color: "#94a3b8" },
};
