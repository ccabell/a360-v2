"use client";

import { useEffect } from "react";
import {
  Stethoscope,
  Syringe,
  HeartPulse,
  Mail,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoStepProps } from "../types";
import {
  RECORD_TYPES,
  NOTE_LENGTHS,
  NOTE_FORMATS,
  type RecordType,
  type NoteLength,
  type NoteFormat,
  type ScribeStyle,
} from "@/lib/scribe/types";

const ACCENT = "#F5A623";
const ICONS: Record<string, LucideIcon> = {
  Stethoscope,
  Syringe,
  HeartPulse,
  Mail,
  Receipt,
};

export function getScribeState(data: Record<string, unknown>) {
  const recordTypes = (data.recordTypes as RecordType[]) ?? [];
  const style = (data.style as ScribeStyle) ?? { length: "standard", format: "paragraph" };
  return { recordTypes, style };
}

/** Step 2 — choose which clinical records to generate + note style. */
export function NoteStyleStep({ ctx, setCtx, goNext, goBack }: DemoStepProps) {
  const { recordTypes, style } = getScribeState(ctx.data);

  // Seed defaults once.
  useEffect(() => {
    if (!ctx.data.recordTypes) {
      setCtx((c) => ({
        ...c,
        data: {
          ...c.data,
          recordTypes: RECORD_TYPES.filter((r) => r.defaultOn).map((r) => r.key),
          style: { length: "standard", format: "paragraph" } as ScribeStyle,
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggle(key: RecordType) {
    setCtx((c) => {
      const cur = (c.data.recordTypes as RecordType[]) ?? [];
      const next = cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key];
      return { ...c, data: { ...c.data, recordTypes: next } };
    });
  }
  function setStyle(patch: Partial<ScribeStyle>) {
    setCtx((c) => ({
      ...c,
      data: { ...c.data, style: { ...getScribeState(c.data).style, ...patch } },
    }));
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground -mt-2 mb-4">
        One transcript, many records. Pick everything you want Scribe to produce from{" "}
        <span className="font-medium text-foreground">{ctx.patient?.name}</span>&apos;s visit.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {RECORD_TYPES.map((r) => {
          const Icon = ICONS[r.icon] ?? Stethoscope;
          const on = recordTypes.includes(r.key);
          return (
            <button
              key={r.key}
              onClick={() => toggle(r.key)}
              className={cn(
                "text-left rounded-xl border p-4 transition-all",
                on
                  ? "border-[color:var(--a)] ring-2 ring-[color:var(--a)]/25 bg-[color:var(--a)]/[0.04]"
                  : "border-border hover:border-foreground/20 bg-card",
              )}
              style={{ ["--a" as string]: ACCENT }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    background: on ? ACCENT : "var(--muted)",
                    color: on ? "white" : "var(--muted-foreground)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "h-5 w-5 rounded-md border flex items-center justify-center text-[11px] font-bold",
                    on ? "text-white" : "text-transparent border-border",
                  )}
                  style={on ? { background: ACCENT, borderColor: ACCENT } : undefined}
                >
                  ✓
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="font-semibold text-foreground">{r.label}</span>
                {r.tag && (
                  <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {r.tag}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{r.blurb}</p>
            </button>
          );
        })}
      </div>

      {/* Style controls */}
      <div className="mt-5 flex flex-wrap items-center gap-6 rounded-xl border border-border bg-muted/30 px-4 py-3">
        <SegMenu
          label="Length"
          options={NOTE_LENGTHS}
          value={style.length}
          onChange={(v) => setStyle({ length: v as NoteLength })}
        />
        <SegMenu
          label="Format"
          options={NOTE_FORMATS}
          value={style.format}
          onChange={(v) => setStyle({ format: v as NoteFormat })}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={goBack}
          className="rounded-lg border border-border px-3.5 py-2 text-sm font-medium hover:bg-muted/50"
        >
          Back
        </button>
        <button
          disabled={recordTypes.length === 0}
          onClick={goNext}
          className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          style={{ background: ACCENT }}
        >
          Generate {recordTypes.length} record{recordTypes.length === 1 ? "" : "s"} →
        </button>
      </div>
    </div>
  );
}

function SegMenu({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex rounded-lg border border-border bg-card p-0.5">
        {options.map((o) => (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className={cn(
              "px-2.5 py-1 text-xs font-medium rounded-md transition-colors",
              value === o.key ? "text-white" : "text-muted-foreground hover:text-foreground",
            )}
            style={value === o.key ? { background: ACCENT } : undefined}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
