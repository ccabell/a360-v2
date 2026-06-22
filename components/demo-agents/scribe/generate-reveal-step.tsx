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
  Target,
  Package,
  Gauge,
  MapPin,
  Pill,
  CalendarClock,
  TrendingUp,
  Info,
  Wand2,
  FileText,
  LayoutList,
  ScanLine,
  Lightbulb,
  GitMerge,
  ShieldAlert,
  BrainCircuit,
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
import {
  CATEGORY_META,
  type EntityCategory,
  type ExtractedEntity,
  type ExtractionResult,
} from "@/lib/scribe/extraction";
import {
  selectIntelligence,
  INTEL_CATEGORY_META,
  type IntelCategory,
  type SelectedIntel,
} from "@/lib/scribe/intelligence";

const ACCENT = "#F5A623";
const TYPE_ICONS: Record<RecordType, LucideIcon> = {
  soap: Stethoscope,
  procedure: Syringe,
  patient_summary: HeartPulse,
  referral: Mail,
  coding: Receipt,
};
const CAT_ICONS: Record<EntityCategory, LucideIcon> = {
  concern: Target,
  treatment: Syringe,
  product: Package,
  dose: Gauge,
  anatomy: MapPin,
  medication: Pill,
  followup: CalendarClock,
  opportunity: TrendingUp,
  context: Info,
};

type Phase = "ingesting" | "extracting" | "structuring" | "drafting" | "done" | "error";
type View = "entities" | "records" | "intelligence";
type NoteView = "structured" | "document";

const INTEL_ICONS: Record<IntelCategory, LucideIcon> = {
  documentation: FileText,
  pairing: GitMerge,
  aftercare: CalendarClock,
  pearl: Lightbulb,
  screening: ShieldAlert,
  revenue: TrendingUp,
};

export function GenerateRevealStep({ ctx, goBack }: DemoStepProps) {
  const { recordTypes, style } = getScribeState(ctx.data);
  const [resp, setResp] = useState<ScribeGenerateResponse | null>(null);
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null);
  const [phase, setPhase] = useState<Phase>("ingesting");
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>("entities");
  const [activeTab, setActiveTab] = useState<RecordType | null>(null);
  const [activeSources, setActiveSources] = useState<string[]>([]);
  const [hoverSeg, setHoverSeg] = useState<string | null>(null);
  const [format, setFormat] = useState(style.format);
  const [noteView, setNoteView] = useState<NoteView>("structured");
  const [entityReveal, setEntityReveal] = useState(0);
  const segRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Fetch extraction + records in parallel, then run the scripted reveal.
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const payload = {
      patientId: ctx.patient?.id,
      consultationId: ctx.patient?.consultationId,
    };
    Promise.all([
      fetch("/api/scribe/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then((r) => r.json()),
      fetch("/api/scribe/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, recordTypes, style }),
      }).then((r) => r.json()),
    ])
      .then(([ext, gen]: [ExtractionResult & { error?: string }, ScribeGenerateResponse & { error?: string }]) => {
        if (cancelled) return;
        if (gen.error || !gen.records?.length) {
          setError(gen.error ?? "No records generated.");
          setPhase("error");
          return;
        }
        setResp(gen);
        setActiveTab(gen.records[0].type);
        if (!ext.error) setExtraction(ext);
        // Timeline: ingest → extract (reveal entities) → structure → draft → done
        timers.push(setTimeout(() => !cancelled && setPhase("extracting"), 900));
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

  // Entity reveal during "extracting".
  useEffect(() => {
    if (phase !== "extracting") return;
    setView("entities");
    const total = extraction?.entities.length ?? 0;
    if (total === 0) {
      setPhase("structuring");
      return;
    }
    setEntityReveal(0);
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setEntityReveal(n);
      if (n >= total) {
        clearInterval(id);
        setTimeout(() => setPhase("structuring"), 500);
      }
    }, 70);
    return () => clearInterval(id);
  }, [phase, extraction]);

  // Structuring → drafting.
  useEffect(() => {
    if (phase !== "structuring") return;
    setView("records");
    const t = setTimeout(() => setPhase("drafting"), 750);
    return () => clearTimeout(t);
  }, [phase]);

  const intel = useMemo(
    () => (extraction ? selectIntelligence(extraction.entities) : []),
    [extraction],
  );
  const activeRecord = useMemo(
    () => resp?.records.find((r) => r.type === activeTab) ?? null,
    [resp, activeTab],
  );
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
    }, 80);
    return () => clearInterval(id);
  }, [phase, totalLines]);

  function highlight(sources?: string[]) {
    if (!sources?.length) {
      setActiveSources([]);
      return;
    }
    setActiveSources(sources);
    segRefs.current[sources[0]]?.scrollIntoView({ behavior: "smooth", block: "center" });
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

  const interactive = phase === "done";

  return (
    <div className="-mt-2">
      <RevealRibbon phase={phase} source={resp?.source} count={resp?.records.length ?? recordTypes.length} />

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* Transcript pane */}
        <div className="rounded-xl border border-border bg-muted/20 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="text-xs font-semibold text-foreground">Consultation transcript</span>
            <span className="text-[11px] text-muted-foreground">
              {resp?.visitType} · {resp?.provider}
            </span>
          </div>
          <div className="max-h-[520px] overflow-auto p-3 space-y-2">
            {(resp?.segments ?? []).map((seg) => {
              const cited = isCited(seg.id, activeSources);
              return (
                <TranscriptRow
                  key={seg.id}
                  seg={seg}
                  ref={(el) => {
                    segRefs.current[seg.id] = el;
                  }}
                  active={cited}
                  onHover={(h) => setHoverSeg(h ? seg.id : null)}
                />
              );
            })}
          </div>
        </div>

        {/* Output pane: Entities | Records */}
        <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="flex rounded-lg border border-border bg-muted/40 p-0.5">
              <ViewTab icon={ScanLine} label="Extracted entities" on={view === "entities"} disabled={!interactive && phase !== "extracting"} onClick={() => interactive && setView("entities")} />
              <ViewTab icon={LayoutList} label="Records" on={view === "records"} disabled={!interactive && phase === "extracting"} onClick={() => interactive && setView("records")} />
              <ViewTab icon={BrainCircuit} label="Clinical intelligence" on={view === "intelligence"} disabled={!interactive} onClick={() => interactive && setView("intelligence")} />
            </div>
            {view === "intelligence" ? (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded text-violet-600 bg-violet-50 dark:bg-violet-950/40">
                <BrainCircuit className="h-3 w-3" /> PODCAST-GROUNDED
              </span>
            ) : (
              <SourceBadge source={view === "entities" ? extraction?.source : resp?.source} />
            )}
          </div>

          {view === "entities" ? (
            <EntityPanel
              extraction={extraction}
              reveal={phase === "extracting" ? entityReveal : Infinity}
              phase={phase}
              onHover={highlight}
              activeSources={activeSources}
              hoverSeg={hoverSeg}
            />
          ) : view === "intelligence" ? (
            <IntelPanel items={intel} />
          ) : (
            <RecordsPane
              resp={resp}
              activeTab={activeTab}
              setActiveTab={(t) => {
                setActiveTab(t);
                setActiveSources([]);
              }}
              activeRecord={activeRecord}
              phase={phase}
              revealCount={phase === "done" ? Infinity : revealCount}
              format={format}
              setFormat={setFormat}
              noteView={noteView}
              setNoteView={setNoteView}
              onHover={highlight}
              activeSources={activeSources}
              hoverSeg={hoverSeg}
              onEdited={(edited) =>
                setResp((r) =>
                  r ? { ...r, records: r.records.map((x) => (x.type === edited.type ? edited : x)) } : r,
                )
              }
            />
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button onClick={goBack} className="rounded-lg border border-border px-3.5 py-2 text-sm font-medium hover:bg-muted/50">
          Back
        </button>
        {interactive && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link2 className="h-3.5 w-3.5" /> Hover any line or entity to trace it to the transcript.
          </p>
        )}
      </div>
    </div>
  );
}

// --- View tab + badges -------------------------------------------------------

function ViewTab({ icon: Icon, label, on, disabled, onClick }: { icon: LucideIcon; label: string; on: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50",
        on ? "text-white" : "text-muted-foreground hover:text-foreground",
      )}
      style={on ? { background: ACCENT } : undefined}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function SourceBadge({ source }: { source?: "cached" | "live" }) {
  if (!source) return null;
  return (
    <span
      className={cn(
        "flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded",
        source === "cached" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" : "text-sky-600 bg-sky-50 dark:bg-sky-950/40",
      )}
    >
      {source === "cached" ? <ShieldCheck className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
      {source === "cached" ? "STAGE-SAFE" : "LIVE AI"}
    </span>
  );
}

// --- Reveal ribbon -----------------------------------------------------------

function RevealRibbon({ phase, source, count }: { phase: Phase; source?: "cached" | "live"; count: number }) {
  const steps = [
    { key: "ingesting", label: "Ingesting transcript" },
    { key: "extracting", label: "Extracting entities" },
    { key: "structuring", label: "Structuring records" },
    { key: "drafting", label: "Drafting sections" },
    { key: "done", label: "Complete" },
  ];
  const order = ["ingesting", "extracting", "structuring", "drafting", "done"];
  const cur = order.indexOf(phase);
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-2.5">
      <div className="flex items-center gap-3 flex-wrap">
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
              <span className={cn(done || active ? "text-foreground font-medium" : "text-muted-foreground")}>{s.label}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-muted-foreground">{count} records</span>
        <SourceBadge source={source} />
      </div>
    </div>
  );
}

// --- Transcript row ----------------------------------------------------------

const TranscriptRow = forwardRef<
  HTMLDivElement,
  { seg: TranscriptSegment; active: boolean; onHover: (h: boolean) => void }
>(function TranscriptRow({ seg, active, onHover }, ref) {
  return (
    <div
      ref={ref}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={cn(
        "rounded-lg px-3 py-2 text-sm transition-all duration-300 animate-in fade-in",
        active ? "ring-2 bg-[color:var(--a)]/[0.08]" : "bg-card",
      )}
      style={{ ["--a" as string]: ACCENT, ...(active ? { ["--tw-ring-color" as string]: ACCENT } : {}) }}
    >
      <div className="flex items-center gap-2 mb-0.5">
        <span
          className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded", seg.speaker === "Patient" ? "bg-muted text-muted-foreground" : "text-white")}
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

// --- Entity panel ------------------------------------------------------------

function EntityPanel({
  extraction,
  reveal,
  phase,
  onHover,
  activeSources,
  hoverSeg,
}: {
  extraction: ExtractionResult | null;
  reveal: number;
  phase: Phase;
  onHover: (s?: string[]) => void;
  activeSources: string[];
  hoverSeg: string | null;
}) {
  const groups = useMemo(() => {
    const byCat = new Map<EntityCategory, ExtractedEntity[]>();
    (extraction?.entities ?? []).forEach((e) => {
      const arr = byCat.get(e.category) ?? [];
      arr.push(e);
      byCat.set(e.category, arr);
    });
    return [...byCat.entries()].sort((a, b) => CATEGORY_META[a[0]].order - CATEGORY_META[b[0]].order);
  }, [extraction]);

  if (!extraction) {
    return (
      <div className="p-6 text-xs text-muted-foreground flex items-center gap-2">
        <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: ACCENT }} /> Reading the consultation…
      </div>
    );
  }

  let idx = 0;
  return (
    <div className="max-h-[480px] overflow-auto p-4 space-y-4">
      <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3">
        <Sparkles className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Chief concern</div>
          <p className="text-sm text-foreground">{extraction.chiefConcern}</p>
        </div>
        <span className="ml-auto text-[11px] text-muted-foreground whitespace-nowrap">
          {extraction.entities.length} entities
        </span>
      </div>

      {groups.map(([cat, items]) => {
        const Icon = CAT_ICONS[cat];
        return (
          <div key={cat}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Icon className="h-3.5 w-3.5" style={{ color: ACCENT }} />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{CATEGORY_META[cat].label}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((e) => {
                const myIdx = idx++;
                if (myIdx >= reveal) return null;
                const cited = e.sources.some((s) => activeSources.includes(s));
                const fromSeg = hoverSeg ? e.sources.includes(hoverSeg) : false;
                return (
                  <div
                    key={e.id}
                    onMouseEnter={() => onHover(e.sources)}
                    onMouseLeave={() => onHover([])}
                    className={cn(
                      "group flex items-center gap-2 rounded-lg border bg-card px-2.5 py-1.5 text-xs transition-all animate-in fade-in zoom-in-95",
                      e.sources.length && "cursor-pointer hover:border-foreground/20",
                      (cited || fromSeg) && "ring-2",
                    )}
                    style={cited || fromSeg ? { ["--tw-ring-color" as string]: ACCENT, borderColor: ACCENT } : undefined}
                  >
                    <span className="font-medium text-foreground">{e.label}</span>
                    {e.value && <span className="text-muted-foreground">· {e.value}</span>}
                    <ConfidenceDot c={e.confidence} />
                    {e.sources.length > 0 && <Link2 className="h-3 w-3 opacity-40 group-hover:opacity-100" style={{ color: ACCENT }} />}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {phase === "extracting" && (
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" style={{ color: ACCENT }} /> Extracting…
        </div>
      )}
    </div>
  );
}

function ConfidenceDot({ c }: { c: number }) {
  const pct = Math.round(c * 100);
  const color = c >= 0.9 ? "#10b981" : c >= 0.8 ? "#f59e0b" : "#9ca3af";
  return (
    <span className="flex items-center gap-1" title={`${pct}% confidence`}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      <span className="text-[10px] text-muted-foreground">{pct}%</span>
    </span>
  );
}

// --- Clinical intelligence panel (podcast-grounded) --------------------------

function IntelPanel({ items }: { items: SelectedIntel[] }) {
  const groups = useMemo(() => {
    const byCat = new Map<IntelCategory, SelectedIntel[]>();
    items.forEach((it) => {
      const arr = byCat.get(it.category) ?? [];
      arr.push(it);
      byCat.set(it.category, arr);
    });
    return [...byCat.entries()].sort(
      (a, b) => INTEL_CATEGORY_META[a[0]].order - INTEL_CATEGORY_META[b[0]].order,
    );
  }, [items]);

  if (!items.length) {
    return (
      <div className="p-6 text-xs text-muted-foreground">
        No matched intelligence for this visit.
      </div>
    );
  }

  return (
    <div className="max-h-[480px] overflow-auto p-4 space-y-4">
      <div className="flex items-start gap-2 rounded-lg border border-violet-200/60 bg-violet-50/50 dark:border-violet-900/40 dark:bg-violet-950/20 p-3">
        <BrainCircuit className="h-4 w-4 mt-0.5 shrink-0 text-violet-600" />
        <p className="text-xs text-foreground/80">
          Guidance matched to this visit from the{" "}
          <span className="font-medium text-foreground">A360 podcast network</span> (31 shows,
          ~8,700 episodes). Paraphrased patterns with a consensus signal — not verbatim advice.
        </p>
      </div>

      {groups.map(([cat, list]) => {
        const Icon = INTEL_ICONS[cat];
        return (
          <div key={cat}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Icon className="h-3.5 w-3.5 text-violet-600" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {INTEL_CATEGORY_META[cat].label}
              </span>
            </div>
            <div className="space-y-2">
              {list.map((it) => (
                <div
                  key={it.id}
                  className="rounded-lg border border-border bg-card p-3 animate-in fade-in slide-in-from-bottom-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">{it.title}</span>
                    <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground whitespace-nowrap">
                      {it.frequency}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{it.body}</p>
                  {it.matchedOn.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {it.matchedOn.slice(0, 4).map((m) => (
                        <span
                          key={m}
                          className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-600"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Records pane ------------------------------------------------------------

function RecordsPane({
  resp,
  activeTab,
  setActiveTab,
  activeRecord,
  phase,
  revealCount,
  format,
  setFormat,
  noteView,
  setNoteView,
  onHover,
  activeSources,
  hoverSeg,
  onEdited,
}: {
  resp: ScribeGenerateResponse | null;
  activeTab: RecordType | null;
  setActiveTab: (t: RecordType) => void;
  activeRecord: ClinicalRecord | null;
  phase: Phase;
  revealCount: number;
  format: "paragraph" | "bulleted";
  setFormat: (f: "paragraph" | "bulleted") => void;
  noteView: NoteView;
  setNoteView: (v: NoteView) => void;
  onHover: (s?: string[]) => void;
  activeSources: string[];
  hoverSeg: string | null;
  onEdited: (r: ClinicalRecord) => void;
}) {
  const interactive = phase === "done";
  const showSkeleton = phase === "structuring" || !activeRecord;
  return (
    <>
      <div className="flex items-center gap-1 border-b border-border px-2 py-1.5 overflow-x-auto">
        {(resp?.records ?? []).map((rec) => {
          const Icon = TYPE_ICONS[rec.type] ?? Stethoscope;
          const on = activeTab === rec.type;
          return (
            <button
              key={rec.type}
              disabled={!interactive}
              onClick={() => setActiveTab(rec.type)}
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

      <div className="max-h-[440px] overflow-auto p-4">
        {showSkeleton ? (
          <RecordSkeleton phase={phase} />
        ) : noteView === "document" ? (
          <DocumentView record={activeRecord!} resp={resp} />
        ) : (
          <RecordView
            record={activeRecord!}
            format={format}
            revealCount={revealCount}
            onHover={onHover}
            activeSources={activeSources}
            hoverSeg={hoverSeg}
            interactive={interactive}
            onEdited={onEdited}
          />
        )}
      </div>

      {interactive && activeRecord && (
        <RecordToolbar
          record={activeRecord}
          format={format}
          setFormat={setFormat}
          noteView={noteView}
          setNoteView={setNoteView}
          onEdited={onEdited}
        />
      )}
    </>
  );
}

// --- Structured record view --------------------------------------------------

function RecordView({
  record,
  format,
  revealCount,
  onHover,
  activeSources,
  hoverSeg,
  interactive,
  onEdited,
}: {
  record: ClinicalRecord;
  format: "paragraph" | "bulleted";
  revealCount: number;
  onHover: (s?: string[]) => void;
  activeSources: string[];
  hoverSeg: string | null;
  interactive: boolean;
  onEdited: (r: ClinicalRecord) => void;
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
          record={record}
          section={section}
          format={format}
          getIndex={() => lineIdx++}
          revealCount={revealCount}
          onHover={onHover}
          activeSources={activeSources}
          hoverSeg={hoverSeg}
          interactive={interactive}
          onEdited={onEdited}
        />
      ))}
    </div>
  );
}

function SectionView({
  record,
  section,
  format,
  getIndex,
  revealCount,
  onHover,
  activeSources,
  hoverSeg,
  interactive,
  onEdited,
}: {
  record: ClinicalRecord;
  section: RecordSection;
  format: "paragraph" | "bulleted";
  getIndex: () => number;
  revealCount: number;
  onHover: (s?: string[]) => void;
  activeSources: string[];
  hoverSeg: string | null;
  interactive: boolean;
  onEdited: (r: ClinicalRecord) => void;
}) {
  const [busy, setBusy] = useState(false);
  async function improve() {
    if (busy) return;
    setBusy(true);
    try {
      const r = await fetch("/api/scribe/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          record,
          instruction: `Improve and tighten only the "${section.heading}" section for clarity and clinical precision. Leave all other sections unchanged.`,
        }),
      });
      const j = await r.json();
      if (j.record) onEdited(j.record);
    } catch {
      /* no-op */
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{section.heading}</span>
        {interactive && (section.lines?.length ?? 0) > 0 && (
          <button
            onClick={improve}
            disabled={busy}
            title="AI improve this section"
            className="opacity-60 hover:opacity-100 flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-opacity"
          >
            {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />} improve
          </button>
        )}
      </div>

      {section.lines && (
        <div className={cn("group/sec", format === "bulleted" ? "space-y-1" : "space-y-1.5")}>
          {section.lines.map((line, i) => {
            const idx = getIndex();
            if (idx >= revealCount) return null;
            const hasSrc = (line.sources?.length ?? 0) > 0;
            const cited = hasSrc && line.sources!.some((s) => activeSources.includes(s));
            const fromSeg = hoverSeg && hasSrc ? line.sources!.includes(hoverSeg) : false;
            return (
              <div
                key={i}
                onMouseEnter={() => onHover(line.sources)}
                onMouseLeave={() => onHover([])}
                className={cn(
                  "group flex gap-2 rounded-md px-2 py-1 text-sm transition-colors animate-in fade-in slide-in-from-bottom-1",
                  hasSrc && "cursor-pointer hover:bg-muted/50",
                  (cited || fromSeg) && "bg-[color:var(--a)]/[0.07]",
                  line.strong ? "text-foreground font-medium" : "text-foreground/85",
                )}
                style={{ ["--a" as string]: ACCENT }}
              >
                {format === "bulleted" && <span style={{ color: ACCENT }}>•</span>}
                <span className="flex-1 leading-snug">{line.text}</span>
                {hasSrc && <Link2 className="h-3 w-3 mt-0.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: ACCENT }} />}
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
                <span className="text-[10px] font-semibold px-1 py-0.5 rounded bg-card text-muted-foreground">{c.system}</span>
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
                    {o.value && <span className="text-xs font-semibold" style={{ color: ACCENT }}>{o.value}</span>}
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-card text-muted-foreground uppercase">{o.horizon.replace("_", " ")}</span>
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

// --- Document view (polished, letterhead-style) ------------------------------

function DocumentView({ record, resp }: { record: ClinicalRecord; resp: ScribeGenerateResponse | null }) {
  return (
    <div className="mx-auto max-w-[680px] rounded-lg border border-border bg-card px-8 py-7 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
        <div>
          <div className="text-sm font-bold" style={{ color: ACCENT }}>Orange Twist</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Body · Face · Skin</div>
        </div>
        <div className="text-right text-[11px] text-muted-foreground">
          <div>{resp?.location}</div>
          <div>{resp?.visitDate} · {resp?.provider}</div>
        </div>
      </div>
      <h3 className="text-base font-bold text-foreground">{record.title}</h3>
      {resp && <p className="text-xs text-muted-foreground mb-4">Patient: {resp.patientName} · {resp.visitType}</p>}
      <div className="space-y-4">
        {record.sections.map((s) => (
          <div key={s.id}>
            <div className="text-[13px] font-semibold text-foreground border-b border-border/60 pb-0.5 mb-1.5">{s.heading}</div>
            {s.lines && (
              <p className="text-[13px] leading-relaxed text-foreground/85">
                {s.lines.map((l) => l.text).join(" ")}
              </p>
            )}
            {s.codes && (
              <div className="text-[13px] text-foreground/85 space-y-0.5">
                {s.codes.map((c, i) => (
                  <div key={i}>
                    <span className="font-mono font-semibold">{c.code}</span> <span className="text-muted-foreground">({c.system})</span> — {c.label}
                  </div>
                ))}
              </div>
            )}
            {s.opportunities && (
              <ul className="text-[13px] text-foreground/85 list-disc pl-5 space-y-0.5">
                {s.opportunities.map((o, i) => (
                  <li key={i}>
                    <span className="font-medium">{o.title}</span>{o.value ? ` (${o.value})` : ""} — {o.rationale}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Toolbar + magic edit ----------------------------------------------------

function RecordToolbar({
  record,
  format,
  setFormat,
  noteView,
  setNoteView,
  onEdited,
}: {
  record: ClinicalRecord;
  format: "paragraph" | "bulleted";
  setFormat: (f: "paragraph" | "bulleted") => void;
  noteView: NoteView;
  setNoteView: (v: NoteView) => void;
  onEdited: (r: ClinicalRecord) => void;
}) {
  const [instruction, setInstruction] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const chips = ["Make it more concise", "Warmer, patient-friendly tone", "Add a follow-up reminder", "Expand the assessment"];

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
      } else setNote(j.error ?? "Edit unavailable.");
    } catch {
      setNote("Edit unavailable.");
    } finally {
      setBusy(false);
    }
  }

  function copy() {
    navigator.clipboard?.writeText(recordToText(record));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="border-t border-border bg-muted/20 px-3 py-2.5 space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <Toggle options={[{ k: "structured", l: "Structured" }, { k: "document", l: "Document" }]} value={noteView} onChange={(v) => setNoteView(v as NoteView)} />
        {noteView === "structured" && (
          <Toggle options={[{ k: "paragraph", l: "Paragraph" }, { k: "bulleted", l: "Bulleted" }]} value={format} onChange={(v) => setFormat(v as "paragraph" | "bulleted")} />
        )}
        <button onClick={copy} className="flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-1 text-[11px] font-medium text-foreground hover:bg-muted/50">
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
          placeholder="Magic edit — tell Scribe how to rewrite or improve this record…"
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

function Toggle({ options, value, onChange }: { options: { k: string; l: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex rounded-lg border border-border bg-card p-0.5">
      {options.map((o) => (
        <button
          key={o.k}
          onClick={() => onChange(o.k)}
          className={cn("px-2 py-0.5 text-[11px] font-medium rounded-md", value === o.k ? "text-white" : "text-muted-foreground")}
          style={value === o.k ? { background: ACCENT } : undefined}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

// --- Skeleton ----------------------------------------------------------------

function RecordSkeleton({ phase }: { phase: Phase }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: ACCENT }} />
        {phase === "structuring" ? "Laying out the records…" : "Working…"}
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
    (n, s) => n + (s.lines?.length ?? 0) + (s.codes?.length ?? 0) + (s.opportunities?.length ?? 0),
    0,
  );
}

function isCited(segId: string, activeSources: string[]): boolean {
  return activeSources.includes(segId);
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
