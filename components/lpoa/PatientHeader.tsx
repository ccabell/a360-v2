"use client";

import { UserPlus, User, Pencil, X } from "lucide-react";
import type { PatientInfo } from "./PatientModal";

interface PatientHeaderProps {
  patient: PatientInfo | null;
  onAdd: () => void;
  onEdit: () => void;
  onClear: () => void;
}

export function PatientHeader({
  patient,
  onAdd,
  onEdit,
  onClear,
}: PatientHeaderProps) {
  if (!patient) {
    return (
      <div
        className="flex items-center justify-between px-5 border-b border-border"
        style={{ background: "var(--card)", height: 48, minHeight: 48 }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "var(--muted)" }}
          >
            <User size={12} style={{ color: "var(--muted-foreground)" }} />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
            No patient loaded
          </span>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-lg transition-colors"
          style={{
            padding: "5px 12px",
            fontSize: 12,
            fontWeight: 500,
            background: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          <UserPlus size={13} />
          Add Patient
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between px-5 border-b border-border gap-4"
      style={{ background: "var(--card)", height: 48, minHeight: 48 }}
    >
      {/* Patient info */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "var(--primary)" }}
        >
          <User size={13} style={{ color: "var(--primary-foreground)" }} />
        </div>
        <div className="flex items-center gap-3 min-w-0 flex-wrap">
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--foreground)",
              whiteSpace: "nowrap",
            }}
          >
            {patient.name}
          </span>
          <div className="flex items-center gap-2">
            <Chip>{patient.age} yrs</Chip>
            <Chip>{patient.sex}</Chip>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {patient.concerns.map((c) => (
              <span
                key={c}
                className="rounded-md px-2 py-0.5"
                style={{
                  fontSize: 11,
                  background: "var(--secondary)",
                  color: "var(--secondary-foreground)",
                  whiteSpace: "nowrap",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 rounded-md border border-border transition-colors"
          style={{
            padding: "4px 10px",
            fontSize: 11,
            color: "var(--muted-foreground)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--accent)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <Pencil size={11} />
          Edit
        </button>
        <button
          onClick={onClear}
          className="flex items-center justify-center rounded-md border border-border transition-colors"
          style={{ width: 28, height: 28, color: "var(--muted-foreground)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--accent)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          title="Clear patient"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-md px-2 py-0.5"
      style={{
        fontSize: 11,
        background: "var(--muted)",
        color: "var(--muted-foreground)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
