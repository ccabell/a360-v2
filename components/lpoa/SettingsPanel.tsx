"use client";

import { useMemo, useState, useEffect } from "react";
import { AlertTriangle, BookOpen, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, Minus, Plus, RotateCcw, ShieldAlert, Sliders } from "lucide-react";
import { activeDevice } from "../../lib/lpoa/devices/gentlemax-pro";
import type { PatientInfo } from "../../lib/useAISearch";
import {
  recommend,
  envelopeCheck,
  fluenceEnvelope,
  spotsForWavelength,
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
  const tier = TIER_LABEL[rec.confidence];

  // Fine-tune: the provider adjusts the recommended values the way the real
  // device works — fluence in discrete increments (p72), spot cycles through
  // valid sizes — always clamped to the manual envelope.
  const [adjFluence, setAdjFluence] = useState<number | null>(null);
  const [adjSpot, setAdjSpot] = useState<number | null>(null);
  const [step, setStep] = useState<number>(1);

  const recKey = `${indication}|${fitz}|${thickness}|${vessel}`;
  useEffect(() => {
    setAdjFluence(null);
    setAdjSpot(null);
  }, [recKey]);

  const spotOptions = useMemo(() => spotsForWavelength(rec.wavelength), [rec.wavelength]);
  const effSpot = adjSpot ?? rec.spotMm;
  const envelope = fluenceEnvelope(rec.wavelength, effSpot);
  const clamp = (v: number) => (envelope ? Math.min(envelope.max, Math.max(envelope.min, v)) : v);
  const effFluence = clamp(adjFluence ?? rec.fluence);
  const adjusted = adjFluence !== null || adjSpot !== null;

  const env = useMemo(
    () => envelopeCheck(rec.wavelength, effSpot, effFluence),
    [rec.wavelength, effSpot, effFluence],
  );

  const stepFluence = (dir: -1 | 1) => setAdjFluence((prev) => clamp((prev ?? rec.fluence) + dir * step));
  const changeSpot = (dir: -1 | 1) => {
    const i = spotOptions.indexOf(effSpot);
    const ni = Math.min(spotOptions.length - 1, Math.max(0, i + dir));
    setAdjSpot(spotOptions[ni]);
    setAdjFluence(null); // re-clamp from the recommended value against the new spot
  };
  const resetAdjust = () => {
    setAdjFluence(null);
    setAdjSpot(null);
  };

  const reading: ScreenReading = {
    wavelength: rec.wavelength,
    indication: rec.indication,
    fitzpatrick: `Fitzpatrick ${rec.fitzpatrick}`,
    fluence: effFluence,
    spotMm: effSpot,
    pulseMs: rec.pulseMs,
    dcdMs: rec.dcd.match(/\d+/g)?.join("/") ?? null,
    repRateHz: "0.5–10", // device capability (manual p77); no per-indication rec exists
    status: rec.confidence === "candela_device" ? "verified" : "advisory",
    statusLabel: adjusted ? "ADJUSTED · VERIFY" : `${tier.label.toUpperCase()} · VERIFY`,
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

      {/* Two-column workspace: inputs + device controls left · result + grounding right */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start" }}>
        {/* LEFT — patient inputs + device controls */}
        <div className="flex flex-col" style={{ gap: 16, flex: "1 1 340px", minWidth: 300 }}>
          <div className="flex flex-col" style={{ gap: 14 }}>
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

      {/* Fine-tune — real device increments, clamped to the manual envelope */}
      <div className="rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--border)", padding: 14 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
          <div className="flex items-center gap-2">
            <Sliders size={14} style={{ color: "var(--muted-foreground)" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--foreground)" }}>Fine-tune (device controls)</span>
          </div>
          {adjusted && (
            <button onClick={resetAdjust} className="flex items-center gap-1" style={{ fontSize: 11, color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}>
              <RotateCcw size={11} /> Reset to recommended
            </button>
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "flex-end" }}>
          {/* Fluence stepper */}
          <div className="flex flex-col gap-1.5">
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Fluence</span>
            <div className="flex items-center" style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
              <button onClick={() => stepFluence(-1)} style={{ width: 34, height: 34, background: "var(--muted)", border: "none", borderRight: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Minus size={14} />
              </button>
              <div style={{ minWidth: 76, textAlign: "center", padding: "0 10px" }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)" }}>{effFluence}</span>
                <span style={{ fontSize: 11, color: "var(--muted-foreground)", marginLeft: 3 }}>J/cm²</span>
              </div>
              <button onClick={() => stepFluence(1)} style={{ width: 34, height: 34, background: "var(--muted)", border: "none", borderLeft: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plus size={14} />
              </button>
            </div>
            {envelope && (
              <span style={{ fontSize: 10.5, color: "var(--muted-foreground)" }}>range {envelope.min}–{envelope.max} J/cm² · {effSpot} mm</span>
            )}
          </div>

          {/* Step selector */}
          <div className="flex flex-col gap-1.5">
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Step (p72)</span>
            <div className="flex gap-1">
              {activeDevice.specs.fluenceIncrementsJcm2.values.map((s) => (
                <button key={s} onClick={() => setStep(s)} style={{ fontSize: 12, fontWeight: 600, minWidth: 30, height: 34, borderRadius: 6, border: `1px solid ${step === s ? "var(--primary)" : "var(--border)"}`, background: step === s ? "var(--primary)" : "var(--card)", color: step === s ? "var(--primary-foreground, #fff)" : "var(--foreground)", cursor: "pointer" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Spot cycler */}
          <div className="flex flex-col gap-1.5">
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Spot size</span>
            <div className="flex items-center" style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
              <button onClick={() => changeSpot(-1)} disabled={spotOptions.indexOf(effSpot) === 0} style={{ width: 34, height: 34, background: "var(--muted)", border: "none", borderRight: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronLeft size={14} />
              </button>
              <div style={{ minWidth: 58, textAlign: "center", padding: "0 8px" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)" }}>{effSpot}</span>
                <span style={{ fontSize: 11, color: "var(--muted-foreground)", marginLeft: 2 }}>mm</span>
              </div>
              <button onClick={() => changeSpot(1)} disabled={spotOptions.indexOf(effSpot) === spotOptions.length - 1} style={{ width: 34, height: 34, background: "var(--muted)", border: "none", borderLeft: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <p style={{ fontSize: 10.5, color: "var(--muted-foreground)", marginTop: 10 }}>
          Fluence adjusts in the device&apos;s real increments (1/2/5/10/20 J/cm², p72) and stays clamped to the manual&apos;s fluence envelope for the selected spot (p73).
        </p>
      </div>
        </div>

        {/* RIGHT — calculated result + grounding */}
        <div className="flex flex-col" style={{ gap: 12, flex: "1 1 340px", minWidth: 300, maxWidth: 520 }}>
          <DeviceScreen reading={reading} />

      {/* Live feedback tied to the result: envelope check + wavelength rationale */}
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
      <div style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.5, padding: "0 2px" }}>
        <strong style={{ color: "var(--foreground)" }}>{rec.wavelength} nm</strong> selected · {rec.notes[0]}
      </div>
        </div>
      </div>

      {/* Reference band — full width, three columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
          alignItems: "stretch",
          marginBottom: 48,
        }}
      >
        {/* Evidence sources */}
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

        {/* Clinical notes + protocol */}
        <div className="rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--border)", padding: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--foreground)", display: "block", marginBottom: 8 }}>
            Clinical notes
          </span>
          {rec.notes.length > 1 && (
            <ul style={{ paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
              {rec.notes.slice(1).map((n, i) => (
                <li key={i} style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.5 }}>{n}</li>
              ))}
            </ul>
          )}
          <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: 8 }}>
            <strong style={{ color: "var(--foreground)" }}>Interval:</strong> {rec.interval}
            <br />
            <strong style={{ color: "var(--foreground)" }}>Sessions:</strong> {rec.sessions}
          </div>
        </div>

        {/* Advisory / sign-off */}
        <div className="rounded-lg flex flex-col" style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.3)", padding: 14, gap: 8 }}>
          <div className="flex items-start gap-2.5">
            <ShieldAlert size={16} style={{ color: "#d97706", flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontSize: 12, color: "var(--foreground)", lineHeight: 1.55 }}>
              <strong>Advisory — not a manufacturer chart.</strong> Values are computed from the cited
              clinical sources (the operator manual does not publish treatment settings) and constrained
              to the device envelope. Confirm against Candela&apos;s Clinical Treatment Guidelines, a test
              spot, and clinician sign-off before use. Start low; titrate ~10% per visit if no adverse
              reaction.
            </div>
          </div>
          <p style={{ fontSize: 11, color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: 4, marginTop: "auto" }}>
            <Sliders size={11} /> Device envelope + safety limits from the {activeDevice.manual.name}, {activeDevice.manual.revision}.
          </p>
        </div>
      </div>
    </div>
  );
}
