"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, BookOpen, CheckCircle2, Eye, ShieldAlert, ShieldCheck, XCircle } from "lucide-react";
import { activeDevice } from "../../lib/lpoa/devices/gentlemax-pro";

// Safety & Contraindications — a pre-treatment screen built entirely from the
// operator manual's real safety content (contraindications p23, warnings
// p24-33, eyewear p26). The contraindication screener is interactive: marking
// any item Present gates the treatment. Every item cites its manual page.

interface SafetyPanelProps {
  onJumpToPage: (page: number) => void;
}

function PageLink({ page, onJumpToPage }: { page: number; onJumpToPage: (p: number) => void }) {
  return (
    <button
      onClick={() => onJumpToPage(page)}
      title={`Open manual page ${page}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "0 6px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        background: "var(--secondary)",
        color: "var(--primary)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <BookOpen size={9} /> p.{page}
    </button>
  );
}

export function SafetyPanel({ onJumpToPage }: SafetyPanelProps) {
  const d = activeDevice;
  const [screen, setScreen] = useState<Record<number, "present" | "absent" | undefined>>({});

  const status = useMemo(() => {
    const marks = d.contraindications.map((_, i) => screen[i]);
    if (marks.some((m) => m === "present")) return "stop" as const;
    if (marks.every((m) => m === "absent")) return "clear" as const;
    return "incomplete" as const;
  }, [screen, d.contraindications]);

  const banner = {
    stop: { icon: <XCircle size={18} />, color: "#dc2626", bg: "rgba(220,38,38,0.09)", border: "rgba(220,38,38,0.35)", title: "Contraindicated — do not treat", body: "One or more contraindications are present. Do not proceed; document and refer per your protocol." },
    clear: { icon: <ShieldCheck size={18} />, color: "#16a34a", bg: "rgba(22,163,74,0.09)", border: "rgba(22,163,74,0.35)", title: "No listed contraindication present", body: "Screening complete. Proceed only with full clinical judgment, consent, and a test spot — this screen covers the manual's listed contraindications, not the whole clinical assessment." },
    incomplete: { icon: <ShieldAlert size={18} />, color: "#d97706", bg: "rgba(217,119,6,0.08)", border: "rgba(217,119,6,0.3)", title: "Screen the patient", body: "Mark each contraindication Present or Absent to complete the pre-treatment screen." },
  }[status];

  return (
    <div className="flex flex-col" style={{ padding: 20, overflowY: "auto", gap: 18 }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--foreground)" }}>Safety &amp; Contraindications</h2>
        <p style={{ fontSize: 12.5, color: "var(--muted-foreground)", lineHeight: 1.5, marginTop: 3, maxWidth: 680 }}>
          Pre-treatment screen from the {d.manual.name} ({d.manual.revision}). Every item links to its manual page.
        </p>
      </div>

      {/* Status banner */}
      <div className="rounded-lg flex items-start gap-2.5" style={{ background: banner.bg, border: `1px solid ${banner.border}`, padding: 14 }}>
        <span style={{ color: banner.color, flexShrink: 0, marginTop: 1 }}>{banner.icon}</span>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: banner.color }}>{banner.title}</p>
          <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.5, marginTop: 2 }}>{banner.body}</p>
        </div>
      </div>

      {/* Two-column: contraindication screener + eyewear/room */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, alignItems: "start" }}>
        {/* Contraindication screener */}
        <div className="rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--border)", padding: 14 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
            <ShieldAlert size={14} style={{ color: "var(--foreground)" }} />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--foreground)" }}>Contraindication screener</span>
          </div>
          <div className="flex flex-col" style={{ gap: 8 }}>
            {d.contraindications.map((c, i) => {
              const val = screen[i];
              return (
                <div key={i} className="flex items-start justify-between gap-3" style={{ paddingBottom: 8, borderBottom: i < d.contraindications.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ fontSize: 12.5, color: "var(--foreground)", lineHeight: 1.45 }}>
                    {c.text} <PageLink page={c.page} onJumpToPage={onJumpToPage} />
                  </div>
                  <div className="flex gap-1" style={{ flexShrink: 0 }}>
                    {(["absent", "present"] as const).map((opt) => {
                      const active = val === opt;
                      const activeColor = opt === "present" ? "#dc2626" : "#16a34a";
                      return (
                        <button
                          key={opt}
                          onClick={() => setScreen((s) => ({ ...s, [i]: opt }))}
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "4px 10px",
                            borderRadius: 6,
                            textTransform: "capitalize",
                            border: `1px solid ${active ? activeColor : "var(--border)"}`,
                            background: active ? activeColor : "var(--card)",
                            color: active ? "#fff" : "var(--muted-foreground)",
                            cursor: "pointer",
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eyewear + room readiness highlights */}
        <div className="flex flex-col" style={{ gap: 16 }}>
          <div className="rounded-lg" style={{ background: "var(--card)", border: "1px solid var(--border)", padding: 14 }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
              <Eye size={14} style={{ color: "var(--foreground)" }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--foreground)" }}>Required eye protection</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--foreground)", fontWeight: 600 }}>
              {d.specs.eyewearOd.value} <PageLink page={d.specs.eyewearOd.page} onJumpToPage={onJumpToPage} />
            </p>
            <p style={{ fontSize: 12, color: "var(--muted-foreground)", lineHeight: 1.5, marginTop: 4 }}>
              Class 4 laser — everyone in the treatment room must wear protective eyewear during operation.
            </p>
          </div>
        </div>
      </div>

      {/* Warnings & precautions */}
      <div>
        <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
          <AlertTriangle size={14} style={{ color: "#d97706" }} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--foreground)" }}>Warnings &amp; precautions</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 10 }}>
          {d.warnings.map((w, i) => (
            <div key={i} className="rounded-lg flex items-start gap-2" style={{ background: "var(--muted)", border: "1px solid var(--border)", padding: "10px 12px" }}>
              <CheckCircle2 size={13} style={{ color: "var(--muted-foreground)", flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: 12, color: "var(--foreground)", lineHeight: 1.45 }}>
                {w.text} <PageLink page={w.page} onJumpToPage={onJumpToPage} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p style={{ fontSize: 11, color: "var(--muted-foreground)", lineHeight: 1.5, marginBottom: 40 }}>
        This screen reproduces the operator manual&apos;s listed contraindications and warnings — it does not replace
        a full clinical assessment, informed consent, or a test spot.
      </p>
    </div>
  );
}
