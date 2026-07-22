"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Info,
  Lock,
  Thermometer,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { activeDevice } from "../../lib/lpoa/devices/gentlemax-pro";
import type { FluenceRow } from "../../lib/lpoa/types";

// ─────────────────────────────────────────────────────────────────────────
// Settings Builder — honest, source-locked replacement for the old
// computeGuidance() rules engine.
//
// The doctor picks wavelength + spot size + pulse band; the tool shows the
// REAL fluence envelope (min/max) from the operator manual (p73), the real DCD
// cooling ranges (p74-75), and validates the doctor's chosen fluence against
// those limits. It does NOT invent a "recommended" number — the manual doesn't
// contain one, so the recommendation renders LOCKED with an honest reason.
// Every value shown carries a real manual page citation.
// ─────────────────────────────────────────────────────────────────────────

interface PageCitation {
  label: string;
  section: string;
  pages: number[];
}

const MANUAL = activeDevice.manual.name;

// ── Reusable UI primitives (unchanged from the original surface) ─────────

function ArcGauge({
  value,
  max,
  color,
  label,
  unit,
  size = 96,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
  unit: string;
  size?: number;
}) {
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  const r = size / 2 - 8;
  const circumference = Math.PI * r; // half-circle
  const strokeDash = circumference * pct;

  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ position: "relative", width: size, height: size / 2 + 10 }}>
        <svg width={size} height={size / 2 + 10} style={{ overflow: "visible" }}>
          <path
            d={`M 8 ${size / 2} A ${r} ${r} 0 0 1 ${size - 8} ${size / 2}`}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={7}
            strokeLinecap="round"
          />
          <path
            d={`M 8 ${size / 2} A ${r} ${r} 0 0 1 ${size - 8} ${size / 2}`}
            fill="none"
            stroke={color}
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circumference}`}
            style={{ transition: "stroke-dasharray 0.5s ease" }}
          />
        </svg>
        <div
          style={{ position: "absolute", bottom: 4, left: 0, right: 0, textAlign: "center" }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", lineHeight: 1 }}>
            {value}
          </span>
          <span style={{ fontSize: 10, color: "var(--muted-foreground)", marginLeft: 2 }}>
            {unit}
          </span>
        </div>
      </div>
      <span style={{ fontSize: 11, color: "var(--muted-foreground)", fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}

function ThermoBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  return (
    <div className="flex flex-col items-center gap-1" style={{ height: 80 }}>
      <div
        className="relative rounded-full overflow-hidden"
        style={{ width: 12, height: 64, background: "var(--muted)", flexShrink: 0 }}
      >
        <div
          className="absolute bottom-0 w-full rounded-full"
          style={{ height: `${pct * 100}%`, background: color, transition: "height 0.5s ease" }}
        />
      </div>
      <Thermometer size={12} style={{ color }} />
    </div>
  );
}

function CitationNav({
  citations,
  onJumpToPage,
}: {
  citations: PageCitation[];
  onJumpToPage: (page: number) => void;
}) {
  const entries = citations.flatMap((c) =>
    c.pages.map((p) => ({ label: c.label, section: c.section, page: p })),
  );
  const [idx, setIdx] = useState(0);
  const current = entries[Math.min(idx, entries.length - 1)];
  if (!current) return null;

  return (
    <div
      className="flex items-center gap-1 mt-2 rounded-md overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--card)" }}
    >
      <button
        onClick={() => setIdx((i) => Math.max(0, i - 1))}
        disabled={idx === 0}
        className="flex items-center justify-center"
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
      <button
        onClick={() => onJumpToPage(current.page)}
        className="flex items-center gap-1.5 flex-1 px-2"
        style={{ height: 28, minWidth: 0 }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <BookOpen size={10} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
        <span className="truncate" style={{ fontSize: 11, color: "var(--foreground)", fontWeight: 500 }}>
          {current.label}
        </span>
        <span className="truncate" style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
          {current.section}
        </span>
        <span
          style={{ fontSize: 11, color: "var(--muted-foreground)", flexShrink: 0, marginLeft: "auto" }}
        >
          p.{current.page}
        </span>
      </button>
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
        {Math.min(idx, entries.length - 1) + 1}/{entries.length}
      </span>
      <button
        onClick={() => setIdx((i) => Math.min(entries.length - 1, i + 1))}
        disabled={idx >= entries.length - 1}
        className="flex items-center justify-center"
        style={{
          width: 24,
          height: 28,
          flexShrink: 0,
          borderLeft: "1px solid var(--border)",
          color: idx >= entries.length - 1 ? "var(--border)" : "var(--muted-foreground)",
          background: "transparent",
        }}
      >
        <ChevronRight size={12} />
      </button>
    </div>
  );
}

// ── Small building blocks ────────────────────────────────────────────────

function Segmented<T extends string | number>({
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
              key={String(opt)}
              onClick={() => onChange(opt)}
              className="rounded-md transition-colors"
              style={{
                fontSize: 12,
                fontWeight: 500,
                padding: "6px 10px",
                border: `1px solid ${active ? "var(--primary)" : "var(--border)"}`,
                background: active ? "var(--primary)" : "var(--card)",
                color: active ? "var(--primary-foreground, #fff)" : "var(--foreground)",
              }}
            >
              {fmt ? fmt(opt) : String(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LockedCard({
  label,
  reason,
  citations,
  onJumpToPage,
}: {
  label: string;
  reason: string;
  citations: PageCitation[];
  onJumpToPage: (page: number) => void;
}) {
  return (
    <div
      className="rounded-lg p-3"
      style={{ background: "var(--muted)", border: "1px dashed var(--border)" }}
    >
      <div className="flex gap-2.5">
        <Lock size={15} style={{ color: "var(--muted-foreground)", flexShrink: 0, marginTop: 1 }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2" style={{ marginBottom: 3 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {label}
            </p>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                padding: "1px 6px",
                borderRadius: 999,
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--muted-foreground)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Locked · not in manual
            </span>
          </div>
          <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>{reason}</p>
          <CitationNav citations={citations} onJumpToPage={onJumpToPage} />
        </div>
      </div>
    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────

interface SettingsPanelProps {
  onJumpToPage: (page: number) => void;
}

export function SettingsPanel({ onJumpToPage }: SettingsPanelProps) {
  const device = activeDevice;
  const tables = device.fluenceTables;

  const wavelengths = useMemo(
    () => Array.from(new Set(tables.map((r) => r.wavelength))) as FluenceRow["wavelength"][],
    [tables],
  );
  const [wavelength, setWavelength] = useState<FluenceRow["wavelength"]>(wavelengths[0]);

  const spotOptions = useMemo(
    () => Array.from(new Set(tables.filter((r) => r.wavelength === wavelength).map((r) => r.spotMm))).sort((a, b) => a - b),
    [tables, wavelength],
  );
  const [spotMm, setSpotMm] = useState<number>(spotOptions[0]);

  // Keep spot valid when wavelength changes.
  const effectiveSpot = spotOptions.includes(spotMm) ? spotMm : spotOptions[0];

  const bandOptions = useMemo(
    () => tables.filter((r) => r.wavelength === wavelength && r.spotMm === effectiveSpot).map((r) => r.pulseBandMs),
    [tables, wavelength, effectiveSpot],
  );
  const [band, setBand] = useState<string>(bandOptions[0]);
  const effectiveBand = bandOptions.includes(band) ? band : bandOptions[0];

  const row = useMemo(
    () => tables.find((r) => r.wavelength === wavelength && r.spotMm === effectiveSpot && r.pulseBandMs === effectiveBand),
    [tables, wavelength, effectiveSpot, effectiveBand],
  );

  // Doctor's chosen fluence — starts at the envelope midpoint (a neutral
  // starting point within real limits, NOT a manual recommendation).
  const [fluence, setFluence] = useState<number | null>(null);
  const chosen = fluence ?? (row ? Math.round((row.minJcm2 + row.maxJcm2) / 2) : 0);
  const inRange = row ? chosen >= row.minJcm2 && chosen <= row.maxJcm2 : false;

  const fluenceCitation: PageCitation[] = [
    { label: "Fluence table", section: `${wavelength} nm, ${effectiveSpot} mm`, pages: [73] },
  ];

  const wlLabel = wavelength === "755" ? "755 nm Alexandrite" : "1064 nm Nd:YAG";
  const wlColor = wavelength === "755" ? "#4f46e5" : "#0891b2";

  return (
    <div className="flex flex-col gap-4" style={{ padding: 16, overflowY: "auto" }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)" }}>Settings Builder</h2>
        <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.5, marginTop: 2 }}>
          Real operating envelope from the {MANUAL}. Choose a configuration; every
          value is cited to a manual page. Recommended clinical doses are not in
          this manual and stay locked.
        </p>
      </div>

      {/* Selectors */}
      <div className="flex flex-col gap-3">
        <Segmented
          label="Wavelength"
          options={wavelengths}
          value={wavelength}
          onChange={(v) => {
            setWavelength(v);
            setFluence(null);
          }}
          fmt={(v) => (v === "755" ? "755 nm Alexandrite" : "1064 nm Nd:YAG")}
        />
        <Segmented
          label="Spot size"
          options={spotOptions}
          value={effectiveSpot}
          onChange={(v) => {
            setSpotMm(v);
            setFluence(null);
          }}
          fmt={(v) => `${v} mm`}
        />
        <Segmented
          label="Pulse duration band"
          options={bandOptions}
          value={effectiveBand}
          onChange={(v) => {
            setBand(v);
            setFluence(null);
          }}
          fmt={(v) => `${v} ms`}
        />
      </div>

      {/* Real fluence envelope */}
      {row && (
        <div
          className="rounded-lg p-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Fluence envelope · {wlLabel} · {effectiveSpot} mm · {effectiveBand} ms
            </span>
          </div>

          <div className="flex items-center gap-5">
            <ArcGauge value={chosen} max={row.maxJcm2} color={wlColor} label="your setting" unit="J/cm²" />
            <div className="flex-1 flex flex-col gap-2" style={{ minWidth: 0 }}>
              <div className="flex items-baseline gap-2">
                <span style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)" }}>
                  {row.minJcm2}–{row.maxJcm2}
                </span>
                <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>J/cm² allowed range</span>
              </div>
              <input
                type="range"
                min={row.minJcm2}
                max={row.maxJcm2}
                value={Math.min(Math.max(chosen, row.minJcm2), row.maxJcm2)}
                onChange={(e) => setFluence(Number(e.target.value))}
                style={{ width: "100%", accentColor: wlColor }}
              />
              <div
                className="flex items-center gap-1.5"
                style={{ fontSize: 12, color: inRange ? "var(--muted-foreground)" : "#dc2626", fontWeight: 500 }}
              >
                {inRange ? (
                  <>
                    <Info size={13} />
                    <span>{chosen} J/cm² is within the manual's limits for this configuration.</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={13} />
                    <span>{chosen} J/cm² is outside the manual's {row.minJcm2}–{row.maxJcm2} J/cm² range.</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <CitationNav citations={fluenceCitation} onJumpToPage={onJumpToPage} />
        </div>
      )}

      {/* Locked recommendation — the honest core */}
      {device.lockedFields
        .filter((f) => f.key === "recommended_fluence")
        .map((f) => (
          <LockedCard
            key={f.key}
            label={f.label}
            reason={f.reason}
            citations={[{ label: "Deferred to Guided Mode / Guidelines", section: "", pages: f.deferredToPages }]}
            onJumpToPage={onJumpToPage}
          />
        ))}

      {/* Real DCD cooling ranges */}
      <div className="rounded-lg p-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            DCD cooling ranges
          </span>
          <ThermoBar value={1} max={2} color="#0ea5e9" />
        </div>
        <div className="flex flex-col gap-1.5">
          {device.dcd.map((d) => (
            <div key={d.param} className="flex items-center justify-between" style={{ fontSize: 12 }}>
              <span style={{ color: "var(--muted-foreground)" }}>{d.param}</span>
              <span style={{ color: "var(--foreground)", fontWeight: 500, textAlign: "right", marginLeft: 8 }}>
                {d.range}
              </span>
            </div>
          ))}
        </div>
        <CitationNav
          citations={[{ label: "Dynamic Cooling Device", section: "spray / delay / post", pages: [74, 75] }]}
          onJumpToPage={onJumpToPage}
        />
      </div>

      {/* Pulse-width honesty note */}
      {device.specs.pulseWidthMs.inconsistencyNote && (
        <div
          className="rounded-lg p-3"
          style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
        >
          <div className="flex gap-2.5">
            <ShieldAlert size={15} style={{ color: "#d97706", flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--foreground)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Pulse width: {device.specs.pulseWidthMs.capability}
              </p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                {device.specs.pulseWidthMs.inconsistencyNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Source footer */}
      <p style={{ fontSize: 11, color: "var(--muted-foreground)", lineHeight: 1.5 }}>
        Source: {MANUAL}, {device.manual.revision}. Every value above is quoted
        from the manual and links to its page. Where the manual does not specify a
        value, this tool shows a locked state instead of a number.
      </p>
    </div>
  );
}
