"use client";

import { useEffect } from "react";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoStepProps } from "../types";
import {
  NOTE_LENGTHS,
  NOTE_FORMATS,
  type NoteLength,
  type NoteFormat,
  type ScribeStyle,
} from "@/lib/scribe/types";
import {
  NOTE_STYLES,
  NOTE_STYLE_GROUPS,
  defaultNoteStyle,
} from "@/lib/scribe/note-styles";

const ACCENT = "#F5A623";

// Optional companion outputs offered alongside the primary note.
const ADDON_KEYS = ["patient_friendly", "internal_opportunity"] as const;

export function getScribeState(data: Record<string, unknown>) {
  const recordTypes = (data.recordTypes as string[]) ?? [];
  const noteStyle = (data.noteStyle as string) ?? recordTypes[0] ?? "soap";
  const style = (data.style as ScribeStyle) ?? { length: "standard", format: "paragraph" };
  return { recordTypes, noteStyle, style };
}

/** Step 2 — choose the note style (drives sections) + optional companions. */
export function NoteStyleStep({ ctx, setCtx, goNext, goBack }: DemoStepProps) {
  const { noteStyle, style } = getScribeState(ctx.data);
  const addOns = (ctx.data.addOns as string[]) ?? [];

  // Seed default style by visit type, once.
  useEffect(() => {
    if (!ctx.data.noteStyle) {
      const primary = defaultNoteStyle(ctx.patient?.visitType);
      setCtx((c) => ({
        ...c,
        data: {
          ...c.data,
          noteStyle: primary,
          addOns: ["patient_friendly"],
          style: { length: "standard", format: "paragraph" } as ScribeStyle,
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setPrimary(key: string) {
    setCtx((c) => ({ ...c, data: { ...c.data, noteStyle: key } }));
  }
  function toggleAddOn(key: string) {
    setCtx((c) => {
      const cur = (c.data.addOns as string[]) ?? [];
      const next = cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key];
      return { ...c, data: { ...c.data, addOns: next } };
    });
  }
  function setStyle(patch: Partial<ScribeStyle>) {
    setCtx((c) => ({
      ...c,
      data: { ...c.data, style: { ...getScribeState(c.data).style, ...patch } },
    }));
  }

  function generate() {
    const recordTypes = [noteStyle, ...addOns.filter((a) => a !== noteStyle)];
    setCtx((c) => ({ ...c, data: { ...c.data, recordTypes } }));
    goNext();
  }

  const addonStyles = NOTE_STYLES.filter((s) => ADDON_KEYS.includes(s.key as (typeof ADDON_KEYS)[number]));

  return (
    <div>
      <p className="text-sm text-muted-foreground -mt-2 mb-4">
        Pick the clinical note for{" "}
        <span className="font-medium text-foreground">{ctx.patient?.name}</span>&apos;s visit. The
        note style sets the sections — and what counts as required documentation.
      </p>

      {/* Primary note style — grouped */}
      <div className="space-y-4">
        {NOTE_STYLE_GROUPS.map((group) => {
          const styles = NOTE_STYLES.filter((s) => s.group === group);
          if (!styles.length) return null;
          return (
            <div key={group}>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                {group}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {styles.map((s) => {
                  const on = noteStyle === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setPrimary(s.key)}
                      className={cn(
                        "text-left rounded-xl border p-3 transition-all",
                        on
                          ? "border-[color:var(--a)] ring-2 ring-[color:var(--a)]/25 bg-[color:var(--a)]/[0.04]"
                          : "border-border hover:border-foreground/20 bg-card",
                      )}
                      style={{ ["--a" as string]: ACCENT }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 font-semibold text-foreground text-sm">
                          {s.label}
                          {s.internalOnly && <Lock className="h-3 w-3 text-muted-foreground" />}
                        </span>
                        <span
                          className={cn(
                            "h-4 w-4 rounded-full border flex items-center justify-center",
                            on ? "text-white" : "border-border",
                          )}
                          style={on ? { background: ACCENT, borderColor: ACCENT } : undefined}
                        >
                          {on && <Check className="h-3 w-3" />}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.useFor}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Companion outputs */}
      <div className="mt-5">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
          Also generate
        </div>
        <div className="flex flex-wrap gap-2">
          {addonStyles.map((s) => {
            const on = addOns.includes(s.key) && noteStyle !== s.key;
            const isPrimary = noteStyle === s.key;
            return (
              <button
                key={s.key}
                disabled={isPrimary}
                onClick={() => toggleAddOn(s.key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-40",
                  on ? "text-white border-transparent" : "border-border text-muted-foreground hover:text-foreground",
                )}
                style={on ? { background: ACCENT } : undefined}
              >
                {on && <Check className="h-3 w-3" />}
                {s.label}
                {isPrimary && <span className="text-[10px]">(primary)</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Style controls */}
      <div className="mt-5 flex flex-wrap items-center gap-6 rounded-xl border border-border bg-muted/30 px-4 py-3">
        <SegMenu label="Length" options={NOTE_LENGTHS} value={style.length} onChange={(v) => setStyle({ length: v as NoteLength })} />
        <SegMenu label="Format" options={NOTE_FORMATS} value={style.format} onChange={(v) => setStyle({ format: v as NoteFormat })} />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={goBack} className="rounded-lg border border-border px-3.5 py-2 text-sm font-medium hover:bg-muted/50">
          Back
        </button>
        <button
          onClick={generate}
          className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
          style={{ background: ACCENT }}
        >
          Generate note →
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
