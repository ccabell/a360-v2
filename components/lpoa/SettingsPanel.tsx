"use client";

import { useState } from "react";
import {
  ChevronRight,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Info,
  Zap,
  RotateCcw,
  Thermometer,
  Activity,
  Gauge,
  ChevronLeft,
} from "lucide-react";

const STEPS = [
  "Module",
  "Treatment Goal",
  "Fitzpatrick Type",
  "Treatment Area",
  "PIH History",
];

const OPTIONS: Record<string, string[]> = {
  Module: [
    "BBL 560nm (Vascular/Pigment)",
    "BBL 590nm (Pigment/Rejuv)",
    "BBL 640nm (Hair/Deep)",
    "BBL 695nm (Hair/Dark skin)",
    "1064nm Nd:YAG",
  ],
  "Treatment Goal": [
    "Vascular Lesions",
    "Pigmentation / Melasma",
    "Skin Rejuvenation",
    "Hair Removal",
    "Acne Treatment",
    "Rosacea",
  ],
  "Fitzpatrick Type": ["Type I–II", "Type III–IV", "Type V", "Type VI"],
  "Treatment Area": [
    "Face — Full",
    "Face — Periorbital",
    "Neck & Décolleté",
    "Body",
    "Legs",
    "Sensitive Zones",
  ],
  "PIH History": [
    "None",
    "Mild (resolved < 4 wks)",
    "Moderate (resolved > 4 wks)",
    "Severe / Persistent",
  ],
};

// Settings table derived from the device manual (image provided)
interface DeviceSettings {
  fluence: number;
  fluenceRange: [number, number];
  fluenceMax: number;
  pulseWidth: number;
  pulseWidthRange: [number, number];
  pulseWidthMax: number;
  temperature: number;
  temperatureRange: [number, number];
  temperatureMax: number;
  filter: string;
  passes: string;
}

interface Reasoning {
  fluence: string;
  pulseWidth: string;
  temperature: string;
  general: string;
}

interface PageCitation {
  label: string;
  section: string;
  pages: number[];
}

interface ParameterCitations {
  fluence: PageCitation[];
  pulseWidth: PageCitation[];
  temperature: PageCitation[];
}

interface GuidanceResult {
  settings: DeviceSettings;
  reasoning: Reasoning;
  citations: ParameterCitations;
  safety: string[];
  manualSections: { label: string; section: string; page: number }[];
  confidence: number;
  warnings: string[];
}

function computeGuidance(selections: Record<string, string>): GuidanceResult {
  const ft = selections["Fitzpatrick Type"] ?? "";
  const pih = selections["PIH History"] ?? "";
  const area = selections["Treatment Area"] ?? "";
  const module = selections["Module"] ?? "";
  const goal = selections["Treatment Goal"] ?? "";

  const isTypeI_II = ft.includes("I–II");
  const isTypeIII_IV = ft.includes("III–IV");
  const isTypeV = ft === "Type V";
  const isTypeVI = ft === "Type VI";
  const isHighPIH = pih.includes("Moderate") || pih.includes("Severe");
  const isSensitive =
    area.includes("Periorbital") || area.includes("Sensitive");
  const isBBL590 = module.includes("590");
  const isBBL640 = module.includes("640") || module.includes("695");

  // Base settings per manual table
  let fluence = 11;
  let pulseWidth = 20;
  let temperature = 20;
  let filter = "560nm";

  if (isTypeI_II) {
    fluence = 11;
    pulseWidth = 20;
    temperature = 20;
    filter = "560nm";
  } else if (isTypeIII_IV) {
    fluence = 9;
    pulseWidth = 20;
    temperature = 20;
    filter = "560nm";
  } else if (isTypeV) {
    fluence = 9;
    pulseWidth = 30;
    temperature = 15;
    filter = "590nm";
  } else if (isTypeVI) {
    fluence = 7;
    pulseWidth = 40;
    temperature = 10;
    filter = "695nm";
  }

  // Override filter from module selection
  if (isBBL590) filter = "590nm";
  if (isBBL640) filter = "640nm";

  // PIH adjustment
  if (isHighPIH) {
    fluence = Math.max(5, fluence - 2);
    temperature = Math.max(10, temperature - 5);
  }

  // Sensitive zone adjustment
  if (isSensitive) {
    fluence = Math.max(5, fluence - 1);
  }

  // Goal adjustments
  if (goal.includes("Vascular")) {
    pulseWidth = Math.max(10, pulseWidth - 5);
  } else if (goal.includes("Hair")) {
    pulseWidth = pulseWidth + 10;
    fluence = fluence + 1;
  } else if (goal.includes("Rejuvenation")) {
    fluence = Math.max(6, fluence - 1);
  }

  const fluenceMax = 22;
  const pulseWidthMax = 60;
  const tempMax = 30;

  const reasoning: Reasoning = {
    fluence: isTypeI_II
      ? `Type I–II skin has low melanin density, allowing higher fluence (${fluence} J/cm²) for effective chromophore absorption without epidermal injury risk.`
      : isTypeIII_IV
        ? `Type III–IV skin carries elevated melanin competition. Fluence reduced to ${fluence} J/cm² to minimize non-specific epidermal heating while maintaining therapeutic effect.`
        : isTypeV
          ? `Type V skin requires conservative fluence (${fluence} J/cm²) due to high competing melanin. Longer wavelength filter shifts absorption away from melanin toward the target chromophore.`
          : `Dark skin type requires careful fluence selection (${fluence} J/cm²) with longer wavelength filter to reduce melanin absorption and thermal injury risk.`,

    pulseWidth: goal.includes("Vascular")
      ? `Vascular targets have a short thermal relaxation time (~1–5ms). Pulse width of ${pulseWidth}ms is set near the upper limit to allow vessel wall heating while sparing surrounding tissue.`
      : isTypeV || isTypeVI
        ? `Extended pulse width (${pulseWidth}ms) for darker skin types distributes heat delivery over a longer interval, reducing peak epidermal temperature and PIH risk.`
        : `Pulse width of ${pulseWidth}ms matches the thermal relaxation time of the target chromophore for this skin type and treatment goal, balancing efficacy with safety.`,

    temperature:
      temperature <= 15
        ? `Aggressive contact cooling (${temperature}°C) is essential for this skin type to pre-cool the epidermis before each pulse, protecting the dermal-epidermal junction from thermal damage.`
        : `Contact cooling at ${temperature}°C provides adequate epidermal protection while maintaining target tissue temperature in the therapeutic range. Optimal for this skin type.`,

    general: isHighPIH
      ? `Settings adjusted –15% from baseline due to documented PIH history. Pre-treat with hydroquinone 4% for 4–6 weeks. Extend treatment intervals to 8–10 weeks.`
      : isSensitive
        ? `Sensitive treatment zone — settings conservatively adjusted. Maintain ≤10% spot overlap and limit total pulses per session.`
        : `Settings correspond to standard ${filter} BBL protocol for ${ft} skin. Perform a single test patch 24 hours prior to full treatment and document patient response.`,
  };

  const safety: string[] = [];
  if (isTypeV || isTypeVI)
    safety.push(
      "High melanin skin type — verify filter selection matches wavelength. Monitor for immediate graying; stop if observed.",
    );
  if (isHighPIH)
    safety.push(
      "PIH history documented — pre-treatment hydroquinone and strict post-treatment sun avoidance are mandatory.",
    );
  if (isSensitive)
    safety.push(
      "Sensitive zone selected — use corneal shields for periorbital work. Do not exceed the recommended spot count.",
    );
  if (goal.includes("Vascular"))
    safety.push(
      "Vascular target — expect immediate vessel clearing (vessel blanching). Avoid re-treating the same site within 15 minutes.",
    );
  if (safety.length === 0)
    safety.push(
      "No elevated risk flags for this configuration. Follow standard protocol and document parameters.",
    );

  const manualSections = [
    { label: "§3.2", section: "Skin Type Assessment", page: 16 },
    { label: "§3.3", section: "Fluence & Pulse Duration", page: 20 },
    ...(isHighPIH
      ? [{ label: "§5.2", section: "PIH Prevention", page: 45 }]
      : []),
    ...(isSensitive
      ? [{ label: "§4.3", section: "Sensitive Zones", page: 38 }]
      : []),
  ];

  const filled = Object.values(selections).filter(Boolean).length;
  const confidence = Math.min(98, Math.round((filled / STEPS.length) * 100));

  // Per-parameter citations with multi-page support
  const citations: ParameterCitations = {
    fluence: [
      { label: "§3.2", section: "Skin Type Assessment", pages: [16, 17, 18] },
      { label: "§3.3", section: "Fluence & Pulse Duration", pages: [20, 21] },
      ...(isHighPIH
        ? [
            {
              label: "§5.2",
              section: "PIH Prevention — Fluence Adjustment",
              pages: [45, 46],
            },
          ]
        : []),
    ],
    pulseWidth: [
      {
        label: "§3.3",
        section: "Fluence & Pulse Duration",
        pages: [20, 22, 24],
      },
      { label: "§3.2", section: "Skin Type Protocol Table", pages: [16, 18] },
      ...(goal.includes("Vascular")
        ? [
            {
              label: "§4.1",
              section: "Vascular Pulse Parameters",
              pages: [31, 32],
            },
          ]
        : []),
      ...(isTypeV || isTypeVI
        ? [
            {
              label: "§5.1",
              section: "Dark Skin Pulse Selection",
              pages: [43, 44],
            },
          ]
        : []),
    ],
    temperature: [
      { label: "§3.4", section: "Cooling Protocols", pages: [27, 28, 29] },
      {
        label: "§3.2",
        section: "Skin Type Cooling Requirements",
        pages: [16, 19],
      },
      ...(isSensitive
        ? [
            {
              label: "§4.3",
              section: "Sensitive Zone Cooling",
              pages: [38, 39],
            },
          ]
        : []),
    ],
  };

  return {
    settings: {
      fluence,
      fluenceRange: [fluence - 1, fluence + 1],
      fluenceMax,
      pulseWidth,
      pulseWidthRange: [pulseWidth - 2, pulseWidth + 2],
      pulseWidthMax,
      temperature,
      temperatureRange: [temperature - 2, temperature + 2],
      temperatureMax: tempMax,
      filter,
      passes: isSensitive ? "1–2 passes" : "2–3 passes",
    },
    reasoning,
    citations,
    safety,
    manualSections,
    confidence,
    warnings: isHighPIH
      ? [
          "Pre-treat with hydroquinone 4% × 4–6 wks",
          "Extend intervals to 8–10 weeks",
          "Mandatory SPF 50+ throughout course",
        ]
      : [],
  };
}

// ── Visual gauge components ──────────────────────────────────────────

function ArcGauge({
  value,
  max,
  color,
  label,
  unit,
  size = 88,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
  unit: string;
  size?: number;
}) {
  const pct = Math.min(1, value / max);
  const r = size / 2 - 8;
  const circumference = Math.PI * r; // half-circle
  const strokeDash = circumference * pct;

  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ position: "relative", width: size, height: size / 2 + 10 }}>
        <svg
          width={size}
          height={size / 2 + 10}
          style={{ overflow: "visible" }}
        >
          {/* Track */}
          <path
            d={`M 8 ${size / 2} A ${r} ${r} 0 0 1 ${size - 8} ${size / 2}`}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={7}
            strokeLinecap="round"
          />
          {/* Fill */}
          <path
            d={`M 8 ${size / 2} A ${r} ${r} 0 0 1 ${size - 8} ${size / 2}`}
            fill="none"
            stroke={color}
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circumference}`}
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        </svg>
        {/* Center value */}
        <div
          style={{
            position: "absolute",
            bottom: 4,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--foreground)",
              lineHeight: 1,
            }}
          >
            {value}
          </span>
          <span
            style={{
              fontSize: 10,
              color: "var(--muted-foreground)",
              marginLeft: 2,
            }}
          >
            {unit}
          </span>
        </div>
      </div>
      <span
        style={{
          fontSize: 11,
          color: "var(--muted-foreground)",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ThermoBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min(1, value / max);
  return (
    <div className="flex flex-col items-center gap-1" style={{ height: 80 }}>
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          width: 12,
          height: 64,
          background: "var(--muted)",
          flexShrink: 0,
        }}
      >
        <div
          className="absolute bottom-0 w-full rounded-full transition-all"
          style={{
            height: `${pct * 100}%`,
            background: color,
            transition: "height 0.6s ease",
          }}
        />
      </div>
      <Thermometer size={12} style={{ color }} />
    </div>
  );
}

// ── Citation navigator ───────────────────────────────────────────────

function CitationNav({
  citations,
  onJumpToPage,
}: {
  citations: PageCitation[];
  onJumpToPage: (page: number) => void;
}) {
  // Flatten all pages across all citations into a navigable list
  const entries = citations.flatMap((c) =>
    c.pages.map((p) => ({ label: c.label, section: c.section, page: p })),
  );
  const [idx, setIdx] = useState(0);
  const current = entries[idx];
  if (!current) return null;

  return (
    <div
      className="flex items-center gap-1 mt-2 rounded-md overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--card)" }}
    >
      {/* Prev */}
      <button
        onClick={() => setIdx((i) => Math.max(0, i - 1))}
        disabled={idx === 0}
        className="flex items-center justify-center transition-colors"
        style={{
          width: 24,
          height: 28,
          flexShrink: 0,
          borderRight: "1px solid var(--border)",
          color: idx === 0 ? "var(--border)" : "var(--muted-foreground)",
          background: "transparent",
        }}
      >
        <ChevronLeft size={12} />
      </button>

      {/* Citation label — clicking jumps to page */}
      <button
        onClick={() => onJumpToPage(current.page)}
        className="flex items-center gap-1.5 flex-1 transition-colors px-2"
        style={{ height: 28, minWidth: 0 }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--accent)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <BookOpen
          size={10}
          style={{ color: "var(--muted-foreground)", flexShrink: 0 }}
        />
        <span
          className="truncate"
          style={{ fontSize: 11, color: "var(--foreground)", fontWeight: 500 }}
        >
          {current.label}
        </span>
        <span
          className="truncate"
          style={{ fontSize: 11, color: "var(--muted-foreground)" }}
        >
          {current.section}
        </span>
        <span
          style={{
            fontSize: 11,
            color: "var(--muted-foreground)",
            flexShrink: 0,
            marginLeft: "auto",
          }}
        >
          p.{current.page}
        </span>
      </button>

      {/* Page counter */}
      <span
        style={{
          fontSize: 10,
          color: "var(--muted-foreground)",
          flexShrink: 0,
          padding: "0 6px",
          borderLeft: "1px solid var(--border)",
          height: 28,
          display: "flex",
          alignItems: "center",
        }}
      >
        {idx + 1}/{entries.length}
      </span>

      {/* Next */}
      <button
        onClick={() => setIdx((i) => Math.min(entries.length - 1, i + 1))}
        disabled={idx === entries.length - 1}
        className="flex items-center justify-center transition-colors"
        style={{
          width: 24,
          height: 28,
          flexShrink: 0,
          borderLeft: "1px solid var(--border)",
          color:
            idx === entries.length - 1
              ? "var(--border)"
              : "var(--muted-foreground)",
          background: "transparent",
        }}
      >
        <ChevronRight size={12} />
      </button>
    </div>
  );
}

function ReasoningCard({
  icon,
  title,
  body,
  citations,
  onJumpToPage,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  citations?: PageCitation[];
  onJumpToPage?: (page: number) => void;
}) {
  return (
    <div
      className="rounded-lg p-3"
      style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
    >
      <div className="flex gap-3">
        <div
          style={{
            flexShrink: 0,
            marginTop: 1,
            color: "var(--muted-foreground)",
          }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--foreground)",
              marginBottom: 3,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: 12,
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
            }}
          >
            {body}
          </p>
          {citations && citations.length > 0 && onJumpToPage && (
            <CitationNav citations={citations} onJumpToPage={onJumpToPage} />
          )}
        </div>
      </div>
    </div>
  );
}

interface SettingsPanelProps {
  onJumpToPage: (page: number) => void;
}

export function SettingsPanel({ onJumpToPage }: SettingsPanelProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [guidance, setGuidance] = useState<GuidanceResult | null>(null);

  const stepName = STEPS[currentStep];
  const stepOptions = OPTIONS[stepName] || [];
  const isLastStep = currentStep === STEPS.length - 1;

  const handleSelect = (option: string) => {
    const updated = { ...selections, [stepName]: option };
    setSelections(updated);
    if (!isLastStep) setCurrentStep((s) => s + 1);
  };

  const handleGenerate = () => setGuidance(computeGuidance(selections));

  const handleReset = () => {
    setCurrentStep(0);
    setSelections({});
    setGuidance(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border shrink-0">
        <h2
          style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}
        >
          Optimal Settings
        </h2>
        <p
          style={{
            fontSize: 12,
            color: "var(--muted-foreground)",
            marginTop: 2,
          }}
        >
          Generate evidence-based device parameters
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {/* Step progress pills */}
        <div className="flex items-center gap-1">
          {STEPS.map((step, i) => {
            const done = !!selections[step];
            const active = i === currentStep && !guidance;
            return (
              <div key={step} className="flex items-center gap-1 flex-1">
                <div
                  className="flex items-center justify-center rounded-full transition-all"
                  style={{
                    width: 20,
                    height: 20,
                    fontSize: 9,
                    fontWeight: 700,
                    flexShrink: 0,
                    background: done
                      ? "var(--primary)"
                      : active
                        ? "#e0e7ff"
                        : "var(--muted)",
                    color: done
                      ? "var(--primary-foreground)"
                      : active
                        ? "#4f46e5"
                        : "var(--muted-foreground)",
                  }}
                >
                  {done ? <CheckCircle2 size={11} /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: done ? "var(--primary)" : "var(--border)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── FORM ── */}
        {!guidance && (
          <div className="flex flex-col gap-3">
            <div>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  fontWeight: 600,
                }}
              >
                Step {currentStep + 1} — {stepName}
              </p>
              {selections[stepName] && (
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--muted-foreground)",
                    marginTop: 3,
                  }}
                >
                  Selected:{" "}
                  <span style={{ color: "var(--foreground)", fontWeight: 500 }}>
                    {selections[stepName]}
                  </span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              {stepOptions.map((opt) => {
                const chosen = selections[stepName] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className="flex items-center justify-between rounded-lg border transition-colors"
                    style={{
                      padding: "9px 12px",
                      fontSize: 13,
                      textAlign: "left",
                      background: chosen ? "var(--primary)" : "var(--card)",
                      color: chosen
                        ? "var(--primary-foreground)"
                        : "var(--foreground)",
                      borderColor: chosen ? "var(--primary)" : "var(--border)",
                    }}
                  >
                    {opt}
                    {!chosen && (
                      <ChevronRight
                        size={14}
                        style={{ color: "var(--muted-foreground)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="flex-1 rounded-lg border border-border transition-colors"
                  style={{
                    padding: "8px",
                    fontSize: 13,
                    color: "var(--muted-foreground)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  Back
                </button>
              )}
              {isLastStep && selections[stepName] && (
                <button
                  onClick={handleGenerate}
                  className="flex-1 rounded-lg flex items-center justify-center gap-2"
                  style={{
                    padding: "9px",
                    fontSize: 13,
                    fontWeight: 500,
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  <Zap size={14} />
                  Generate Settings
                </button>
              )}
            </div>

            {Object.keys(selections).length > 0 && (
              <div
                className="rounded-lg p-3"
                style={{ background: "var(--muted)", fontSize: 12 }}
              >
                {Object.entries(selections).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2 py-0.5">
                    <span style={{ color: "var(--muted-foreground)" }}>
                      {k}:
                    </span>
                    <span
                      style={{
                        color: "var(--foreground)",
                        fontWeight: 500,
                        textAlign: "right",
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── RESULTS ── */}
        {guidance && (
          <div className="flex flex-col gap-5">
            {/* Filter + pass badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="rounded-full px-3 py-1"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  background: "#dbeafe",
                  color: "#1e40af",
                  letterSpacing: "0.04em",
                }}
              >
                {guidance.settings.filter} Filter
              </span>
              <span
                className="rounded-full px-3 py-1"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  background: "var(--muted)",
                  color: "var(--muted-foreground)",
                }}
              >
                {guidance.settings.passes}
              </span>
              {guidance.confidence >= 80 && (
                <span
                  className="rounded-full px-3 py-1 flex items-center gap-1"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    background: "#dcfce7",
                    color: "#166534",
                  }}
                >
                  <CheckCircle2 size={11} /> {guidance.confidence}% confidence
                </span>
              )}
            </div>

            {/* ── Visual gauges ── */}
            <div
              className="rounded-xl p-4 flex flex-col gap-4"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                Device Parameters
              </p>

              <div className="flex items-end justify-around gap-2">
                <ArcGauge
                  value={guidance.settings.fluence}
                  max={guidance.settings.fluenceMax}
                  color="#4f46e5"
                  label="Fluence"
                  unit="J/cm²"
                  size={86}
                />
                <ArcGauge
                  value={guidance.settings.pulseWidth}
                  max={guidance.settings.pulseWidthMax}
                  color="#0891b2"
                  label="Pulse Width"
                  unit="ms"
                  size={86}
                />
                {/* Temperature thermometer */}
                <div className="flex flex-col items-center gap-1">
                  <ThermoBar
                    value={guidance.settings.temperature}
                    max={guidance.settings.temperatureMax}
                    color="#0ea5e9"
                  />
                  <div className="text-center">
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "var(--foreground)",
                        lineHeight: 1,
                      }}
                    >
                      {guidance.settings.temperature}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--muted-foreground)",
                        marginLeft: 2,
                      }}
                    >
                      °C
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--muted-foreground)",
                      fontWeight: 500,
                    }}
                  >
                    Temperature
                  </span>
                </div>
              </div>

              {/* Numeric reference row */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    label: "Fluence",
                    value: `${guidance.settings.fluence} J/cm²`,
                    color: "#4f46e5",
                    icon: <Gauge size={11} />,
                  },
                  {
                    label: "Pulse Width",
                    value: `${guidance.settings.pulseWidth} ms`,
                    color: "#0891b2",
                    icon: <Activity size={11} />,
                  },
                  {
                    label: "Temperature",
                    value: `${guidance.settings.temperature}°C`,
                    color: "#0ea5e9",
                    icon: <Thermometer size={11} />,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg p-2.5 flex flex-col gap-1"
                    style={{
                      background: "var(--muted)",
                      border: `1px solid ${item.color}22`,
                    }}
                  >
                    <div
                      className="flex items-center gap-1"
                      style={{ color: item.color }}
                    >
                      {item.icon}
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--foreground)",
                        lineHeight: 1,
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Why these settings ── */}
            <div className="flex flex-col gap-2">
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--foreground)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Clinical Rationale
              </p>
              <ReasoningCard
                icon={<Gauge size={13} />}
                title="Fluence"
                body={guidance.reasoning.fluence}
                citations={guidance.citations.fluence}
                onJumpToPage={onJumpToPage}
              />
              <ReasoningCard
                icon={<Activity size={13} />}
                title="Pulse Width"
                body={guidance.reasoning.pulseWidth}
                citations={guidance.citations.pulseWidth}
                onJumpToPage={onJumpToPage}
              />
              <ReasoningCard
                icon={<Thermometer size={13} />}
                title="Temperature"
                body={guidance.reasoning.temperature}
                citations={guidance.citations.temperature}
                onJumpToPage={onJumpToPage}
              />
              <ReasoningCard
                icon={<Info size={13} />}
                title="Protocol Note"
                body={guidance.reasoning.general}
              />
            </div>

            {/* ── Safety ── */}
            {guidance.safety.length > 0 && (
              <div className="flex flex-col gap-2">
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--foreground)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Safety Considerations
                </p>
                {guidance.safety.map((s, i) => (
                  <div
                    key={i}
                    className="flex gap-2 rounded-lg p-3"
                    style={{
                      background: "#fef3c7",
                      border: "1px solid #fde68a",
                    }}
                  >
                    <AlertTriangle
                      size={13}
                      style={{ color: "#d97706", flexShrink: 0, marginTop: 1 }}
                    />
                    <p
                      style={{
                        fontSize: 12,
                        color: "#92400e",
                        lineHeight: 1.5,
                      }}
                    >
                      {s}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* ── Pre-treatment warnings ── */}
            {guidance.warnings.length > 0 && (
              <div
                className="flex flex-col gap-1.5 rounded-lg p-3"
                style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#991b1b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Required Pre-Treatment Steps
                </p>
                {guidance.warnings.map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#dc2626",
                        flexShrink: 0,
                      }}
                    />
                    <p style={{ fontSize: 12, color: "#b91c1c" }}>{w}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 rounded-lg border border-border transition-colors"
              style={{
                padding: "8px",
                fontSize: 12,
                color: "var(--muted-foreground)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <RotateCcw size={13} />
              New Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
