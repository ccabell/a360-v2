"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  Stethoscope,
  Syringe,
  HeartPulse,
  Mail,
  Receipt,
  Loader2,
  Link2,
  Copy,
  Check,
  Sparkles,
  Send,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoStepProps } from "../types";
import { getScribeState } from "./note-style-step";
import type {
  ClinicalRecord,
  RecordSection,
  RecordType,
  ScribeGenerateResponse,
  TranscriptSegment,
} from "@/lib/scribe/types";

const ACCENT = "#F26A1B";
const TYPE_ICONS: Record<RecordType, LucideIcon> = {
  soap: Stethoscope,
  procedure: Syringe,
  patient_summary: HeartPulse,
  referral: Mail,
  coding: Receipt,
};

type Phase = "ingesting" | "structuring" | "drafting" | "done" | "error";

export function GenerateRevealStep({ ctx, goBack }: DemoStepProps) {
  const { recordTypes, style } = getScribeState(ctx.data);
  const [resp, setResp] = useState<ScribeGenerateResponse | null>(null);
  const [phase, setPhase] = useState<Phase>("ingesting");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<RecordType | null>(null);
  const [activeSources, setActiveSources] = useState<string[]>([]);
  const [format, setFormat] = useState(style.format);
  const segRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 1) Fetch (cached-first), then run the scripted reveal timeline.
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    setPhase("ingesting");
    fetch("/api/scribe/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: ctx.patient?.id,
        consultationId: ctx.patient?.consultationId,
        recordTypes,
        style,
      }),
    })
      .then((r) => r.json())
      .then((data: ScribeGenerateResponse & { error?: string }) => {
        if (cancelled) return;
        if (data.error || !data.records?.length) {
          setError(data.error ?? "No records generated.");
          setPhase("error");
          return;
        }
        setResp(data);
        setActiveTab(data.records[0].type);
        // Deterministic reveal cadence — bulletproof for stage.
        timers.push(setTimeout(() => !cancelled && setPhase("structuring"), 1100));
        timers.push(setTimeout(() => !cancelled && setPhase("drafting"), 1900));
      })
      .catch((e) => {
        if (cancelled) return;
        setError(String(e));
        setPhase("error");
      });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeRecord = useMemo(
    () => resp?.records.find((r) => r.type === activeTab) ?? null,
    [resp, activeTab],
  );

  // Count lines in the active record for the drafting reveal.
  const totalLines = useMemo(() => countLines(activeRecord), [activeRecord]);
  const [revealCount, setRevealCount] = useState(0);

  useEffect(() => {
    if (phase !== "drafting") return;
    setRevealCount(0);
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setRevealCount(n);
      if (n >= totalLines) {
        clearInterval(id);
        setTimeout(() => setPhase("done"), 250);
      }
    }, 90);
    return () => clearInterval(id);
  }, [phase, totalLines]);

  function highlight(sources?: string[]) {
    if (!sources?.length) return;
    setActiveSources(sources);
    const first = sources[0];
    segRefs.current[first]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (phase === "error") {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-sm">
        <p className="font-medium text-destructive">Generation unavailable</p>
        <p className="mt-1 text-muted-foreground">{error}</p>
        <p className="mt-2 text-muted-foreground">
          Tip: the <span className="font-medium text-foreground">STAGE-READY</span> patients always
          work offline. Pick one of those for the demo.
        </p>
        <button onClick={goBack} className="mt-4 rounded-lg border border-border px-3.5 py-2 text-sm font-medium hover:bg-muted/50">
          Back
        </button>
      </div>
    );
  }

  const revealing = phase === "ingesting" || phase === "structuring";

  return (
    <div className="-mt-2">
      {/* Status ribbon */}
      <RevealRibbon phase={phase} source={resp?.source} count={resp?.records.length ?? recordTypes.length} />

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Transcript pane */}
        <div className="rounded-xl border border-border bg-muted/20 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="text-xs font-semibold text-foreground">Consultation transcript</span>
            <span className="text-[11px] text-muted-foreground">
              {resp?.visitType} · {resp?.provider}
            </span>
          </div>
          <div className="max-h-[460px] overflow-auto p-3 space-y-2">
            {(resp?.segments ?? []).map((seg, i) => (
              <TranscriptRow
                key={seg.id}
                seg={seg}
                ref={(el) => {
                  segRefs.current[seg.id] = el;
                }}
                active={activeSources.includes(seg.id)}
                hidden={revealing && i > revealIndex(phase, i)}
                delay={i * 60}
              />
            ))}
          </div>
        </div>

        {/* Record pane */}
        <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col">
          {/* Tab strip — the fan-out */}
          <div className="flex items-center gap-1 border-b border-border px-2 py-1.5 overflow-x-auto">
            {(resp?.records ?? []).map((rec) => {
              const Icon = TYPE_ICONS[rec.type] ?? Stethoscope;
              const on = activeTab === rec.type;
              const interactive = phase === "done";
              return (
                <button
                  key={rec.type}
                  disabled={!interactive}
                  onClick={() => {
                    setActiveTab(rec.type);
                    setActiveSources([]);
                  }}
                  className={cn(
                    "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                    on ? "text-white" : "text-muted-foreground hover:text-foreground",
                    !interactive && "opacity-70",
                  )}
                  style={on ? { background: ACCENT } : undefined}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {rec.title}
                </button>
              );
            })}
          </div>

          {/* Record body */}
          <div className="max-h-[420px] overflow-auto p-4">
            {!activeRecord || revealing ? (
              <RecordSkeleton phase={phase} />
            ) : (
              <RecordView
                record={activeRecord}
                format={format}
                revealCount={phase === "done" ? Infinity : revealCount}
                onHover={highlight}
                activeSources={activeSources}
              />
            )}
          </div>

          {/* Toolbar + magic edit */}
          {phase === "done" && activeRecord && (
            <RecordToolbar
              record={activeRecord}
              format={format}
              setFormat={setFormat}
              onEdited={(edited) =>
                setResp((r) =>
                  r
                    ? { ...r, records: r.records.map((x) => (x.type === edited.type ? edited : x)) }
                    : r,
                )
              }
            />
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={goBack}
          className="rounded-lg border border-border px-3.5 py-2 text-sm font-medium hover:bg-muted/50"
        >
          Back
        </button>
        {phase === "done" && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link2 className="h-3.5 w-3.5" /> Hover any line to trace it back to the transcript.
          </p>
        )}
      </div>
    </div>
  );
}

// --- Reveal ribbon -----------------------------------------------------------

function RevealRibbon({
  phase,
  source,
  count,
}: {
  phase: Phase;
  source?: "cached" | "live";
  count: number;
}) {
  const steps = [
    { key: "ingesting", label: "Ingesting transcript" },
    { key: "structuring", label: "Structuring records" },
    { key: "drafting", label: "Drafting sections" },
    { key: "done", label: "Complete" },
  ];
  const order = ["ingesting", "structuring", "drafting", "done"];
  const cur = order.indexOf(phase);
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-2.5">
      <div className="flex items-center gap-3">
        {steps.map((s, i) => {
          const done = i < cur;
          const active = i === cur;
          return (
            <div key={s.key} className="flex items-center gap-1.5 text-xs">
              {done ? (
                <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />
              ) : active && phase !== "done" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: ACCENT }} />
              ) : (
                <span className="h-3.5 w-3.5 rounded-full border border-border" />
              )}
              <span className={cn(done || active ? "text-foreground font-medium" : "text-muted-foreground")}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-muted-foreground">
          {count} record{count === 1 ? "" : "s"}
        </span>
        {source && (
          <span
            className={cn(
              "flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded",
              source === "cached"
                ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
                : "text-sky-600 bg-sky-50 dark:bg-sky-950/40",
            )}
          >
            {source === "cached" ? <ShieldCheck className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
            {source === "cached" ? "STAGE-SAFE" : "LIVE"}
          </span>
        )}
      </div>
    </div>
  );
}

// --- Transcript row ----------------------------------------------------------

const TranscriptRow = forwardRef<
  HTMLDivElement,
  { seg: TranscriptSegment; active: boolean; hidden: boolean; delay: number }
>(function TranscriptRow({ seg, active, hidden }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg px-3 py-2 text-sm transition-all duration-300",
        active ? "ring-2 bg-[color:var(--a)]/[0.08]" : "bg-card",
        hidden ? "opacity-0 translate-y-1" : "opacity-100",
      )}
      style={{ ["--a" as string]: ACCENT, ...(active ? { ["--tw-ring-color" as string]: ACCENT } : {}) }}
    >
      <div className="flex items-center gap-2 mb-0.5">
        <span
          className={cn(
            "text-[10px] font-semibold px-1.5 py-0.5 rounded",
            seg.speaker === "Patient"
              ? "bg-muted text-muted-foreground"
              : "text-white",
          )}
          style={seg.speaker !== "Patient" ? { background: ACCENT } : undefined}
        >
          {seg.speaker}
        </span>
        {seg.t && <span className="text-[10px] text-muted-foreground">{seg.t}</span>}
      </div>
      <p className="text-foreground/85 leading-snug">{seg.text}</p>
    </div>
  );
});

// --- Record view -------------------------------------------------------------

function RecordView({
  record,
  format,
  revealCount,
  onHover,
  activeSources,
}: {
  record: ClinicalRecord;
  format: "paragraph" | "bulleted";
  revealCount: number;
  onHover: (sources?: string[]) => void;
  activeSources: string[];
}) {
  let lineIdx = 0;
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-bold text-foreground">{record.title}</h4>
        {record.subtitle && <p className="text-xs text-muted-foreground">{record.subtitle}</p>}
      </div>
      {record.sections.map((section) => (
        <SectionView
          key={section.id}
          section={section}
          format={format}
          getIndex={() => lineIdx++}
          revealCount={revealCount}
          onHover={onHover}
          activeSources={activeSources}
        />
      ))}
    </div>
  );
}

function SectionView({
  section,
  format,
  getIndex,
  revealCount,
  onHover,
  activeSources,
}: {
  section: RecordSection;
  format: "paragraph" | "bulleted";
  getIndex: () => number;
  revealCount: number;
  onHover: (sources?: string[]) => void;
  activeSources: string[];
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
        {section.heading}
      </div>

      {section.lines && (
        <div className={cn(format === "bulleted" ? "space-y-1" : "space-y-1.5")}>
          {section.lines.map((line, i) => {
            const idx = getIndex();
            if (idx >= revealCount) return null;
            const hasSrc = (line.sources?.length ?? 0) > 0;
            const isActive = hasSrc && line.sources!.some((s) => activeSources.includes(s));
            return (
              <div
                key={i}
                onMouseEnter={() => onHover(line.sources)}
                onMouseLeave={() => onHover([])}
                className={cn(
                  "group flex gap-2 rounded-md px-2 py-1 text-sm transition-colors animate-in fade-in slide-in-from-bottom-1",
                  hasSrc && "cursor-pointer hover:bg-muted/50",
                  isActive && "bg-[color:var(--a)]/[0.07]",
                  line.strong ? "text-foreground font-medium" : "text-foreground/85",
                )}
                style={{ ["--a" as string]: ACCENT }}
              >
                {format === "bulleted" && <span style={{ color: ACCENT }}>•</span>}
                <span className="flex-1 leading-snug">{line.text}</span>
                {hasSrc && (
                  <Link2
                    className="h-3 w-3 mt-0.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{ color: ACCENT }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {section.codes && (
        <div className="flex flex-wrap gap-2">
          {section.codes.map((c, i) => {
            const idx = getIndex();
            if (idx >= revealCount) return null;
            return (
              <div
                key={i}
                onMouseEnter={() => onHover(c.sources)}
                onMouseLeave={() => onHover([])}
                className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-2.5 py-1.5 text-xs cursor-pointer hover:bg-muted/60"
              >
                <span className="font-mono font-semibold text-foreground">{c.code}</span>
                <span className="text-[10px] font-semibold px-1 py-0.5 rounded bg-card text-muted-foreground">
                  {c.system}
                </span>
                <span className="text-muted-foreground">{c.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {section.opportunities && (
        <div className="space-y-2">
          {section.opportunities.map((o, i) => {
            const idx = getIndex();
            if (idx >= revealCount) return null;
            return (
              <div
                key={i}
                onMouseEnter={() => onHover(o.sources)}
                onMouseLeave={() => onHover([])}
                className="rounded-lg border border-border bg-muted/20 p-2.5 cursor-pointer hover:bg-muted/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{o.title}</span>
                  <div className="flex items-center gap-1.5">
                    {o.value && (
                      <span className="text-xs font-semibold" style={{ color: ACCENT }}>
                        {o.value}
                      </span>
                    )}
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-card text-muted-foreground uppercase">
                      {o.horizon.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{o.rationale}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- Toolbar + magic edit ----------------------------------------------------

function RecordToolbar({
  record,
  format,
  setFormat,
  onEdited,
}: {
  record: ClinicalRecord;
  format: "paragraph" | "bulleted";
  setFormat: (f: "paragraph" | "bulleted") => void;
  onEdited: (r: ClinicalRecord) => void;
}) {
  const [instruction, setInstruction] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const chips = ["Make it more concise", "Warmer, patient-friendly tone", "Add a follow-up reminder"];

  async function runEdit(text: string) {
    if (!text.trim() || busy) return;
    setBusy(true);
    setNote(null);
    try {
      const r = await fetch("/api/scribe/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ record, instruction: text }),
      });
      const j = await r.json();
      if (j.record) {
        onEdited(j.record);
        setInstruction("");
        setNote("Applied.");
      } else {
        setNote(j.error ?? "Edit unavailable.");
      }
    } catch {
      setNote("Edit unavailable.");
    } finally {
      setBusy(false);
    }
  }

  function copy() {
    const text = recordToText(record);
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="border-t border-border bg-muted/20 px-3 py-2.5 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex rounded-lg border border-border bg-card p-0.5">
          {(["paragraph", "bulleted"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={cn(
                "px-2 py-0.5 text-[11px] font-medium rounded-md capitalize",
                format === f ? "text-white" : "text-muted-foreground",
              )}
              style={format === f ? { background: ACCENT } : undefined}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-1 text-[11px] font-medium text-foreground hover:bg-muted/50"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
        {note && <span className="text-[11px] text-muted-foreground">{note}</span>}
      </div>

      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
        <input
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runEdit(instruction)}
          placeholder="Magic edit — tell Scribe how to change this record…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={() => runEdit(instruction)}
          disabled={busy || !instruction.trim()}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40"
          style={{ background: ACCENT }}
        >
          {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => runEdit(c)}
            disabled={busy}
            className="rounded-full border border-border bg-card px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground hover:border-foreground/20 disabled:opacity-40"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Skeleton ----------------------------------------------------------------

function RecordSkeleton({ phase }: { phase: Phase }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: ACCENT }} />
        {phase === "ingesting" ? "Reading the conversation…" : "Laying out the records…"}
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="space-y-1.5">
          <div className="h-2.5 w-24 rounded bg-muted animate-pulse" />
          <div className="h-3 w-full rounded bg-muted/70 animate-pulse" />
          <div className="h-3 w-4/5 rounded bg-muted/70 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

// --- helpers -----------------------------------------------------------------

function countLines(record: ClinicalRecord | null): number {
  if (!record) return 0;
  return record.sections.reduce(
    (n, s) =>
      n + (s.lines?.length ?? 0) + (s.codes?.length ?? 0) + (s.opportunities?.length ?? 0),
    0,
  );
}

// During ingest/structure phases, stagger transcript reveal.
function revealIndex(phase: Phase, i: number): number {
  if (phase === "ingesting") return i; // CSS handles the stagger; show all
  return Infinity;
}

function recordToText(record: ClinicalRecord): string {
  const parts: string[] = [record.title];
  for (const s of record.sections) {
    parts.push(`\n${s.heading}`);
    s.lines?.forEach((l) => parts.push(`- ${l.text}`));
    s.codes?.forEach((c) => parts.push(`- [${c.system}] ${c.code} — ${c.label}`));
    s.opportunities?.forEach((o) => parts.push(`- ${o.title} (${o.horizon}) — ${o.rationale}`));
  }
  return parts.join("\n");
}
