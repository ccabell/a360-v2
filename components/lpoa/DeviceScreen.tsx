"use client";

// DeviceScreen — a realistic laser-console readout that DISPLAYS a set of
// treatment settings (it is a display, not a form). Data-agnostic: give it a
// `reading` and it renders like the device's own screen. When Chris provides a
// photo of the real GentleMax Pro console, we swap the digital panel below for
// a photo background with the same values positioned over the real fields.

export interface ScreenReading {
  wavelength: "755" | "1064";
  indication: string;
  fitzpatrick?: string;
  fluence: number | null; // J/cm2
  spotMm: number | null;
  pulseMs: string | null; // e.g. "20" or "3-300"
  dcdMs?: string | null; // pre-spray / delay label
  repRateHz?: string | null;
  /** Status of the values: verified against a source, advisory, or locked. */
  status: "verified" | "advisory" | "locked";
  statusLabel?: string;
}

const WL = {
  "755": { name: "755 nm ALEXANDRITE", glow: "#f59e0b", dim: "rgba(245,158,11,0.15)" },
  "1064": { name: "1064 nm Nd:YAG", glow: "#38bdf8", dim: "rgba(56,189,248,0.15)" },
} as const;

const STATUS = {
  verified: { label: "SOURCE-VERIFIED", color: "#34d399", dot: "#34d399" },
  advisory: { label: "ADVISORY · VERIFY", color: "#fbbf24", dot: "#fbbf24" },
  locked: { label: "NO SOURCE · LOCKED", color: "#f87171", dot: "#f87171" },
} as const;

const MONO =
  "ui-monospace, 'SF Mono', 'Cascadia Code', 'Roboto Mono', Menlo, Consolas, monospace";

function Field({
  label,
  value,
  unit,
  glow,
  big,
}: {
  label: string;
  value: string;
  unit?: string;
  glow: string;
  big?: boolean;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: big ? "14px 16px" : "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minWidth: 0,
      }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.45)",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: big ? 40 : 22,
            lineHeight: 1,
            fontWeight: 700,
            color: value === "—" ? "rgba(255,255,255,0.3)" : "#fff",
            textShadow: value === "—" ? "none" : `0 0 14px ${glow}`,
          }}
        >
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: big ? 13 : 11, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export function DeviceScreen({ reading }: { reading: ScreenReading }) {
  const wl = WL[reading.wavelength];
  const st = STATUS[reading.status];
  const fmt = (v: number | string | null | undefined) =>
    v === null || v === undefined || v === "" ? "—" : String(v);

  return (
    <div
      style={{
        borderRadius: 16,
        padding: 6,
        background: "linear-gradient(160deg, #2a2f3a 0%, #14171d 60%, #0b0d11 100%)",
        boxShadow: "0 20px 45px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Bezel → screen */}
      <div
        style={{
          borderRadius: 12,
          background: "radial-gradient(120% 100% at 50% 0%, #10131a 0%, #070809 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: 18,
          color: "#fff",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: wl.glow, boxShadow: `0 0 10px ${wl.glow}` }} />
            <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.1em", color: wl.glow, fontWeight: 700 }}>
              {wl.name}
            </span>
          </div>
          <span style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
            GentleMax Pro
          </span>
        </div>

        {/* Indication line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{reading.indication || "—"}</span>
          {reading.fitzpatrick && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 999,
                background: wl.dim,
                color: wl.glow,
                letterSpacing: "0.05em",
              }}
            >
              {reading.fitzpatrick}
            </span>
          )}
        </div>

        {/* Primary + secondary readouts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Field label="FLUENCE" value={fmt(reading.fluence)} unit="J/cm²" glow={wl.glow} big />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Field label="SPOT SIZE" value={fmt(reading.spotMm)} unit="mm" glow={wl.glow} />
            <Field label="PULSE WIDTH" value={fmt(reading.pulseMs)} unit="ms" glow={wl.glow} />
            <Field label="DCD COOLING" value={fmt(reading.dcdMs)} unit="ms" glow={wl.glow} />
            <Field label="REP RATE" value={fmt(reading.repRateHz)} unit="Hz" glow={wl.glow} />
          </div>
        </div>

        {/* Status bar */}
        <div
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: 999, background: st.dot, boxShadow: `0 0 8px ${st.dot}` }} />
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: st.color, fontWeight: 700 }}>
            {reading.statusLabel || st.label}
          </span>
        </div>
      </div>
    </div>
  );
}
