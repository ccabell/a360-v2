"use client";

import { useMemo, useState, useEffect } from "react";
import { AlertTriangle, BookOpen, CheckCircle2, ExternalLink, ShieldAlert, Sliders } from "lucide-react";
import { activeDevice } from "../../lib/lpoa/devices/gentlemax-pro";
import type { PatientInfo } from "../../lib/useAISearch";
import {
  recommend,
  envelopeCheck,
  TIER_LABEL,
  type Indication,
  type Fitzpatrick,
  type HairThickness,
  type VesselSize,
} from "../../lib/lpoa/recommendations";
import { DeviceScreen, type ScreenReading } from "./DeviceScreen";

// Settings Builder — the tool CALCULATES recommended optimal settings from
// patient inputs and displays them on the device screen. Recommendations are
// sourced from cited clinical literature (see lib/lpoa/recommendations.ts),
// constrained to the manual's real envelope, and flagged advisory pending
// clinician sign-off. The manual's device envelope is never fabricated.

const INDICATIONS: { id: Indication; label: string }[] = [
  { id: "hair_removal", label: "Hair removal" },
  { id: "vascular_facial", label: "Facial vascular" },
  { id: "vascular_leg", label: "Leg vascular" },
];
const FITZ: Fitzpatrick[] = ["I", "II", "III", "IV", "V", "VI"];
const THICKNESS: HairThickness[] = ["fine", "medium", "coarse"];
const VESSELS: { id: VesselSize; label: string }[] = [
  { id: "small", label: "< 0.5 mm" },
  { id: "medium", label: "0.5–1.0 mm" },
];

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  fmt,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  fmt?: (v: T) => string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              style={{
                fontSize: 12,
                fontWeight: 500,
                padding: "6px 12px",
                borderRadius: 8,
                border: `1px solid ${active ? "var(--primary)" : "var(--border)"}`,
                background: active ? "var(--primary)" : "var(--card)",
                color: active ? "var(--primary-foreground, #fff)" : "var(--foreground)",
                textTransform: "capitalize",
              }}
            >
              {fmt ? fmt(opt) : opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface SettingsPanelProps {
  onJumpToPage: (page: number) => void;
  patient?: PatientInfo | null;
}

export function SettingsPanel({ onJumpToPage, patient = null }: SettingsPanelProps) {
  // Light prefill from patient concerns (Fitzpatrick isn't in the patient record).
  const prefillIndication = useMemo<Indication>(() => {
    const c = (patient?.concerns ?? []).join(" ").toLowerCase();
    if (/vein|vascular|telangiecta|rosacea|redness/.test(c)) return "vascular_facial";
    return "hair_removal";
  }, [patient]);

  const [indication, setIndication] = useState<Indication>(prefillIndication);
  const [fitz, setFitz] = useState<Fitzpatrick>("III");
  const [thickness, setThickness] = useState<HairThickness>("medium");
  const [vessel, setVessel] = useState<VesselSize>("small");

  useEffect(() => setIndication(prefillIndication), [prefillIndication]);

  const rec = useMemo(
    () => recommend({ indication, fitzpatrick: fitz, hairThickness: thickness, vesselSize: vessel }),
    [indication, fitz, thickness, vessel],
  );
  const env = useMemo(() => envelopeCheck(rec.wavelength, rec.spotMm, rec.fluence), [rec]);
  const tier = TIER_LABEL[rec.confidence];

  const reading: ScreenReading = {
    wavelength: rec.wavelength,
    indication: rec.indication,
    fitzpatrick: `Fitzpatrick ${rec.fitzpatrick}`,
    fluence: rec.fluence,
    spotMm: rec.spotMm,
    pulseMs: rec.pulseMs,
    dcdMs: rec.dcd.match(/\d+/g)?.join("/") ?? null,
    repRateHz: null,
    status: rec.confidence === "candela_device" ? "verified" : "advisory",
    statusLabel: `${tier.label.toUpperCase()} · VERIFY`,
  };

  const isHair = indication === "hair_removal";
  const isFacialVasc = indication === "vascular_facial";

  return (
    <div className="flex flex-col" style={{ padding: 20, overflowY: "auto", gap: 18 }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--foreground)" }}>Recommended Settings</h2>
        <p style={{ fontSize: 12.5, color: "var(--muted-foreground)", lineHeight: 1.5, marginTop: 3, maxWidth: 640 }}>
          Enter the patient profile; the tool calculates a starting protocol from cited clinical
          sources, constrained to the {activeDevice.model}&apos;s real device envelope. These are advisory
          starting points — verify against a test spot and obtain clinician sign-off.
        </p>
      </div>

      {/* Two-column: inputs + device screen */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start" }}>
        {/* Inputs */}
        <div className="flex flex-col" style={{ gap: 14, flex: "1 1 260px", minWidth: 240 }}>
          {patient && (
            <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
              Patient: <strong style={{ color: "var(--foreground)" }}>{patient.name}</strong>
              {prefillIndication !== "hair_removal" && " · indication prefilled from concerns"}
            </div>
          )}
          <Segmented label="Indication" options={INDICATIONS.map((i) => i.id)} value={indication} onChange={setIndication} fmt={(id) => INDICATIONS.find((i) => i.id === id)!.label} />
          <Segmented label="Fitzpatrick skin type" options={FITZ} value={fitz} onChange={setFitz} />
          {isHair && <Segmented label="Hair thickness" options={THICKNESS} value={thickness} onChange={setThickness} />}
          {isFacialVasc && <Segmented label="Vessel size" options={VESSELS.map((v) => v.id)} value={vessel} onChange={setVessel} fmt={(id) => VESSELS.find((v) => v.id === id)!.label} />}
        </div>

        {/* Device screen */}
        <div style={{ flex: "1 1 300px", minWidth: 280, maxWidth: 460 }}>
          <DeviceScreen reading={reading} />
        </div>
      </div>

      {/* Wavelength rationale */}
      <div className="rounded-lg" style={{ background: "var(--muted)", border: "1px solid var(--border)", padding: "10px 12px", fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.5 }}>
        <strong style={{ color: "var(--foreground)" }}>{rec.wavelength} nm</strong> selected · {rec.notes[0]}
      </div>

      {/* Evidence + advisory */}
      <div className="rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--border)", padding: 14 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: tier.color }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--foreground)" }}>Evidence: {tier.label}</span>
        </div>
        <div className="flex flex-col" style={{ gap: 6 }}>
          {rec.sources.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-1.5" style={{ fontSize: 12, color: "var(--foreground)", textDecoration: "none" }}>
              <ExternalLink size={12} style={{ color: "var(--muted-foreground)", flexShrink: 0, marginTop: 2 }} />
              <span>
                <span style={{ fontWeight: 500 }}>{s.authors} ({s.year})</span> — {s.label}
                {s.note && <span style={{ color: "var(--muted-foreground)" }}> · {s.note}</span>}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Envelope check */}
      <div
        className="rounded-lg flex items-start gap-2"
        style={{ background: "var(--muted)", border: "1px solid var(--border)", padding: "10px 12px" }}
      >
        {env.ok ? (
          <CheckCircle2 size={15} style={{ color: "#16a34a", flexShrink: 0, marginTop: 1 }} />
        ) : (
          <AlertTriangle size={15} style={{ color: "#d97706", flexShrink: 0, marginTop: 1 }} />
        )}
        <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.5 }}>
          {env.text}{" "}
          <button onClick={() => onJumpToPage(env.page)} style={{ color: "var(--primary)", fontWeight: 500, background: "none", border: "none", padding: 0, cursor: "pointer" }}>
            <BookOpen size={11} style={{ display: "inline", verticalAlign: "middle" }} /> view p.{env.page}
          </button>
        </div>
      </div>

      {/* Clinical notes */}
      {rec.notes.length > 1 && (
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Clinical notes
          </span>
          <ul style={{ marginTop: 6, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
            {rec.notes.slice(1).map((n, i) => (
              <li key={i} style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.5 }}>{n}</li>
            ))}
          </ul>
          <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: 8 }}>
            <strong style={{ color: "var(--foreground)" }}>Interval:</strong> {rec.interval} · <strong style={{ color: "var(--foreground)" }}>Sessions:</strong> {rec.sessions}
          </div>
        </div>
      )}

      {/* Advisory / sign-off banner */}
      <div className="rounded-lg flex items-start gap-2.5" style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.3)", padding: 12 }}>
        <ShieldAlert size={16} style={{ color: "#d97706", flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 12, color: "var(--foreground)", lineHeight: 1.55 }}>
          <strong>Advisory — not a manufacturer chart.</strong> These values are computed from the cited
          clinical sources above (the operator manual does not publish treatment settings) and constrained
          to the device envelope. Confirm against Candela&apos;s Clinical Treatment Guidelines, a test spot,
          and clinician sign-off before use. Start low and titrate ~10% per visit if no adverse reaction.
        </div>
      </div>

      {/* Source footer */}
      <p style={{ fontSize: 11, color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: 4 }}>
        <Sliders size={11} /> Device envelope + safety limits from the {activeDevice.manual.name}, {activeDevice.manual.revision}.
      </p>
    </div>
  );
}
