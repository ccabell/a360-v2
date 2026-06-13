"use client";

import { useState } from "react";
import { X, User, Check } from "lucide-react";

export interface PatientInfo {
  name: string;
  age: string;
  sex: string;
  concerns: string[];
}

const CONCERN_OPTIONS = [
  "Hair Removal",
  "Pigmentation / Melasma",
  "Vascular Lesions",
  "Acne & Scarring",
  "Skin Rejuvenation",
  "Tattoo Removal",
  "Rosacea",
  "Sun Damage",
  "Wrinkles & Fine Lines",
  "Body Contouring",
];

const SEX_OPTIONS = ["Female", "Male", "Non-binary", "Prefer not to say"];

interface PatientModalProps {
  initial?: PatientInfo;
  onSave: (info: PatientInfo) => void;
  onClose: () => void;
}

export function PatientModal({ initial, onSave, onClose }: PatientModalProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [age, setAge] = useState(initial?.age ?? "");
  const [sex, setSex] = useState(initial?.sex ?? "");
  const [concerns, setConcerns] = useState<string[]>(initial?.concerns ?? []);

  const toggleConcern = (c: string) => {
    setConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };

  const canSave = name.trim() && age.trim() && sex && concerns.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="flex flex-col rounded-xl shadow-2xl overflow-hidden"
        style={{
          width: 480,
          maxHeight: "90vh",
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "var(--muted)" }}
            >
              <User size={14} style={{ color: "var(--muted-foreground)" }} />
            </div>
            <div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                {initial ? "Edit Patient" : "Add Patient"}
              </p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
                This session's patient information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ color: "var(--muted-foreground)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--foreground)",
              }}
            >
              Patient Name / ID
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane D. or Patient #1042"
              className="rounded-lg border border-border outline-none"
              style={{
                padding: "9px 12px",
                fontSize: 13,
                background: "var(--input-background)",
                color: "var(--foreground)",
              }}
            />
          </div>

          {/* Age + Sex row */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5" style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Age
              </label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value.replace(/\D/, ""))}
                placeholder="e.g. 34"
                maxLength={3}
                className="rounded-lg border border-border outline-none"
                style={{
                  padding: "9px 12px",
                  fontSize: 13,
                  background: "var(--input-background)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5" style={{ flex: 2 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Sex
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SEX_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSex(opt)}
                    className="rounded-lg border transition-colors"
                    style={{
                      padding: "6px 12px",
                      fontSize: 12,
                      background:
                        sex === opt ? "var(--primary)" : "var(--card)",
                      color:
                        sex === opt
                          ? "var(--primary-foreground)"
                          : "var(--foreground)",
                      borderColor:
                        sex === opt ? "var(--primary)" : "var(--border)",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Concerns */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Treatments / Concerns
              </label>
              <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
                {concerns.length} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CONCERN_OPTIONS.map((opt) => {
                const active = concerns.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleConcern(opt)}
                    className="flex items-center gap-1.5 rounded-lg border transition-colors"
                    style={{
                      padding: "6px 12px",
                      fontSize: 12,
                      background: active ? "var(--primary)" : "var(--card)",
                      color: active
                        ? "var(--primary-foreground)"
                        : "var(--foreground)",
                      borderColor: active ? "var(--primary)" : "var(--border)",
                    }}
                  >
                    {active && <Check size={11} />}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border transition-colors"
            style={{
              padding: "9px",
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
            Cancel
          </button>
          <button
            onClick={() => canSave && onSave({ name, age, sex, concerns })}
            disabled={!canSave}
            className="flex-1 rounded-lg transition-opacity"
            style={{
              padding: "9px",
              fontSize: 13,
              fontWeight: 500,
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              opacity: canSave ? 1 : 0.4,
            }}
          >
            {initial ? "Save Changes" : "Add Patient"}
          </button>
        </div>
      </div>
    </div>
  );
}
