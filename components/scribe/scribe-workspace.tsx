"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Loader2,
  Check,
  Copy,
  Link2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  ClinicalRecord,
  RecordSection,
  ScribeGenerateResponse,
} from "@/lib/scribe/types";
import type { ExtractionResult } from "@/lib/scribe/extraction";
import { CATEGORY_META } from "@/lib/scribe/extraction";
import { NOTE_STYLES, NOTE_STYLE_GROUPS } from "@/lib/scribe/note-styles";
import { selectIntelligence } from "@/lib/scribe/intelligence";
import type { DemoPatientCard } from "@/app/api/demo-agents/patients/route";
import type { PracticePayload } from "@/app/api/practice/route";

type Tab = "note" | "facts" | "intel";
type NoteView = "structured" | "document";

const VISIT_LABEL: Record<string, string> = {
  initial_consultation: "Initial consultation",
  consultation_only: "Consultation",
  treatment_visit: "Treatment visit",
  follow_up: "Follow-up",
};

export function ScribeWorkspace() {
  const [patients, setPatients] = useState<DemoPatientCard[]>([]);
  const [practice, setPractice] = useState<PracticePayload | null>(null);
  const [patientId, setPatientId] = useState<string>("");
  const [noteStyle, setNoteStyle] = useState<string>("soap");
  const [locationId, setLocationId] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractWarning, setExtractWarning] = useState<string | null>(null);
  const [result, setResult] = useState<ScribeGenerateResponse | null>(null);
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null);
  const [tab, setTab] = useState<Tab>("note");
  const [noteView, setNoteView] = useState<NoteView>("structured");
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/demo-agents/patients")
      .then((r) => r.json())
      .then((j) => {
        const list: DemoPatientCard[] = j.data ?? [];
        setPatients(list);
        if (list[0]) setPatientId(list[0].id);
      })
      .catch(() => {});
    fetch("/api/practice")
      .then((r) => r.json())
      .then((p: PracticePayload) => {
        setPractice(p);
        setLocationId((p.locations.find((l) => l.is_default) ?? p.locations[0])?.id ?? "");
      })
      .catch(() => {});
  }, []);

  const patient = patients.find((p) => p.id === patientId) ?? null;

  async function generate() {
    if (!patient) return;
    setLoading(true);
    setResult(null);
    setExtraction(null);
    setError(null);
    setExtractWarning(null);
    setTranscriptOpen(false);
    setTab("note");
    try {
      const payload = { patientId: patient.id, consultationId: patient.consultationId };
      const post = async (url: string, body: unknown) => {
        const r = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const j = (await r.json().catch(() => ({}))) as { error?: string };
        if (!r.ok || j.error) throw new Error(j.error ?? `Request failed (${r.status})`);
        return j;
      };
      // Settle both so one failure doesn't discard the other's result.
      const [extRes, genRes] = await Promise.allSettled([
        post("/api/scribe/extract", payload),
        post("/api/scribe/generate", { ...payload, noteStyle, recordTypes: [noteStyle], style: { length: "standard", format: "paragraph" } }),
      ]);
      if (genRes.status === "fulfilled") {
        setResult(genRes.value as ScribeGenerateResponse);
      } else {
        setError(genRes.reason instanceof Error ? genRes.reason.message : "Couldn't generate the note.");
      }
      if (extRes.status === "fulfilled") {
        setExtraction(extRes.value as ExtractionResult);
      } else if (genRes.status === "fulfilled") {
        // Note succeeded — surface the extraction failure without blocking it.
        setExtractWarning("Fact extraction failed for this run — the Extracted facts and Clinical intelligence tabs are empty.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong generating the note.");
    } finally {
      setLoading(false);
    }
  }

  const record = result?.records[0] ?? null;
  const intel = useMemo(
    () => (extraction ? selectIntelligence(extraction.entities) : []),
    [extraction],
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground leading-tight">Scribe</h1>
            <p className="text-xs text-muted-foreground">Clinical notes from the consultation</p>
          </div>
        </div>
        {practice && practice.locations.length > 0 && (
          <Field>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className={selectCls}
              aria-label="Location"
            >
              {practice.locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {practice.name} — {l.name}
                </option>
              ))}
            </select>
          </Field>
        )}
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-border bg-card p-3 flex flex-wrap items-end gap-3">
        <Field label="Patient">
          <select value={patientId} onChange={(e) => setPatientId(e.target.value)} className={selectCls}>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {VISIT_LABEL[p.visitType ?? ""] ?? p.visitType}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Note style">
          <select value={noteStyle} onChange={(e) => setNoteStyle(e.target.value)} className={selectCls}>
            {NOTE_STYLE_GROUPS.map((g) => (
              <optgroup key={g} label={g}>
                {NOTE_STYLES.filter((s) => s.group === g).map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
        <button
          onClick={generate}
          disabled={loading || !patient}
          className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40 flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Generate note
        </button>
        {result && (
          <button
            onClick={() => setTranscriptOpen((o) => !o)}
            className="h-9 ml-auto rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center gap-1.5"
          >
            <FileText className="h-3.5 w-3.5" /> {transcriptOpen ? "Hide" : "View"} transcript
          </button>
        )}
      </div>

      {/* Transcript drawer */}
      {result && transcriptOpen && (
        <div className="mt-3 rounded-xl border border-border bg-muted/20 p-3 max-h-72 overflow-auto">
          <div className="text-xs text-muted-foreground mb-2">
            Consultation transcript · {result.segments.length} turns
          </div>
          <div className="space-y-1.5">
            {result.segments.map((s) => (
              <div key={s.id} className="text-sm">
                <span className={cn("font-medium", s.speaker === "Patient" ? "text-muted-foreground" : "text-primary")}>
                  {s.speaker}:
                </span>{" "}
                <span className="text-foreground/85">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Errors */}
      {error && !loading && (
        <div className="mt-4 flex items-start justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
          <div className="flex items-start gap-2 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={generate}
            className="h-8 shrink-0 rounded-lg border border-border px-3 text-xs font-medium text-foreground hover:bg-muted/50"
          >
            Try again
          </button>
        </div>
      )}
      {extractWarning && !loading && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-xs text-amber-800 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{extractWarning}</span>
        </div>
      )}

      {/* Empty / loading */}
      {!result && !error && (
        <div className="mt-6 rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Reading the consultation and drafting the note…
            </span>
          ) : (
            "Choose a patient and note style, then generate."
          )}
        </div>
      )}

      {/* Results */}
      {result && record && (
        <div className="mt-4 rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-5 border-b border-border px-4">
            {([
              ["note", "Note"],
              ["facts", "Extracted facts"],
              ["intel", "Clinical intelligence"],
            ] as [Tab, string][]).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={cn(
                  "py-2.5 text-sm border-b-2 -mb-px transition-colors",
                  tab === k ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === "note" && (
              <NotePane
                record={record}
                meta={result}
                noteView={noteView}
                setNoteView={setNoteView}
                onEdited={(r) => setResult((cur) => (cur ? { ...cur, records: [r, ...cur.records.slice(1)] } : cur))}
                copied={copied}
                onCopy={() => {
                  navigator.clipboard?.writeText(recordToText(record));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              />
            )}
            {tab === "facts" && <FactsTable extraction={extraction} />}
            {tab === "intel" && <IntelTable items={intel} />}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Note pane ---------------------------------------------------------------

function NotePane({
  record,
  meta,
  noteView,
  setNoteView,
  onEdited,
  copied,
  onCopy,
}: {
  record: ClinicalRecord;
  meta: ScribeGenerateResponse;
  noteView: NoteView;
  setNoteView: (v: NoteView) => void;
  onEdited: (r: ClinicalRecord) => void;
  copied: boolean;
  onCopy: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const missing = record.sections.filter((s) => s.required && s.notDocumented);
  const allMissing = record.sections.length > 0 && record.sections.every((s) => s.notDocumented);
  const liveUnavailable = meta.source === "live" && allMissing;

  async function quickAction(value: string) {
    const map: Record<string, string> = {
      chart: "Rewrite as a chart-ready clinical note: concise, professional, standard documentation style. Preserve all documented facts and any 'not documented' gaps. Do not invent details.",
      concise: "Make this note more concise while preserving all clinical facts and required fields.",
      expand: "Expand the clinical rationale behind the assessment and plan, grounded only in documented facts. Mark inferences as AI suggestions to verify.",
      friendly: "Rewrite in plain, warm, patient-friendly language at about an 8th-grade reading level, keeping it accurate.",
    };
    const instruction = map[value];
    if (!instruction) return;
    setBusy(true);
    try {
      const r = await fetch("/api/scribe/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ record, instruction }),
      });
      const j = await r.json();
      if (j.record) onEdited(j.record);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {/* meta + toolbar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="text-xs text-muted-foreground">
          {meta.patientName} · {meta.visitType} · {meta.provider} · {meta.visitDate}
        </div>
        <div className="flex items-center gap-1.5">
          {record.internalOnly && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Internal only</span>
          )}
          <select value={noteView} onChange={(e) => setNoteView(e.target.value as NoteView)} className={selectSm} aria-label="View">
            <option value="structured">Structured</option>
            <option value="document">Document</option>
          </select>
          <select
            value=""
            onChange={(e) => { quickAction(e.target.value); e.currentTarget.value = ""; }}
            className={selectSm}
            aria-label="Quick actions"
            disabled={busy}
          >
            <option value="">{busy ? "Working…" : "Quick actions"}</option>
            <option value="chart">Make chart-ready</option>
            <option value="concise">Make concise</option>
            <option value="expand">Expand rationale</option>
            <option value="friendly">Patient-friendly</option>
          </select>
          <button onClick={onCopy} className="h-8 rounded-lg border border-border px-2 text-xs text-foreground hover:bg-muted/50 flex items-center gap-1">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {liveUnavailable ? (
        <div className="rounded-lg border border-border bg-muted/30 px-4 py-6 text-center">
          <p className="text-sm font-medium text-foreground">This note style isn&apos;t available for this patient in the demo build.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Stage-ready: <span className="text-foreground">SOAP note</span> for any patient · the{" "}
            <span className="text-foreground">Injectable note</span> for Sofia Reyes · the{" "}
            <span className="text-foreground">Aesthetic consult note</span> for Amara Okafor.
          </p>
        </div>
      ) : (
        <>
          {missing.length > 0 && (
            <div className="mb-3 flex items-start gap-2 rounded-lg bg-destructive/8 border border-destructive/20 px-3 py-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
              <div className="text-xs text-destructive">
                {missing.length} required field{missing.length === 1 ? "" : "s"} not documented —{" "}
                {missing.map((m) => m.heading).join(", ")}. Scribe won&apos;t invent it; confirm at the point of care.
              </div>
            </div>
          )}

          {noteView === "document" ? (
        <DocumentView record={record} meta={meta} />
      ) : (
        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "30%" }} />
            <col />
            <col style={{ width: "108px" }} />
          </colgroup>
          <thead>
            <tr className="text-left text-[11px] text-muted-foreground">
              <th className="font-normal px-2 py-1.5">Section</th>
              <th className="font-normal px-2 py-1.5">Documentation</th>
              <th className="font-normal px-2 py-1.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {record.sections.map((s) => (
              <SectionRow key={s.id} section={s} />
            ))}
          </tbody>
        </table>
          )}
        </>
      )}
    </div>
  );
}

function SectionRow({ section }: { section: RecordSection }) {
  return (
    <tr className="border-t border-border align-top">
      <td className="px-2 py-2 text-muted-foreground">
        {section.heading}
        {section.required && <span className="ml-1 text-[10px] text-muted-foreground/70">required</span>}
      </td>
      <td className="px-2 py-2 text-foreground/90">
        {section.notDocumented ? (
          <span className={cn("italic", section.required ? "text-destructive" : "text-muted-foreground")}>
            Not documented in transcript
          </span>
        ) : (
          <div className="space-y-1">
            {section.lines?.map((l, i) => (
              <div key={i} className={l.strong ? "font-medium" : ""}>
                {l.text}
                {l.inferred && (
                  <span className="ml-1.5 align-middle text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary whitespace-nowrap">
                    AI suggestion — verify
                  </span>
                )}
              </div>
            ))}
            {section.codes?.map((c, i) => (
              <div key={i} className="font-mono text-xs">
                {c.code} <span className="text-muted-foreground">({c.system})</span> — {c.label}
              </div>
            ))}
            {section.opportunities?.map((o, i) => (
              <div key={i}>
                <span className="font-medium">{o.title}</span>
                {o.value ? ` (${o.value})` : ""} — <span className="text-muted-foreground">{o.rationale}</span>
              </div>
            ))}
          </div>
        )}
      </td>
      <td className="px-2 py-2">
        {section.notDocumented ? (
          section.required ? (
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">Missing</span>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )
        ) : (
          <Check className="h-4 w-4 text-emerald-600" />
        )}
      </td>
    </tr>
  );
}

function DocumentView({ record, meta }: { record: ClinicalRecord; meta: ScribeGenerateResponse }) {
  return (
    <div className="mx-auto max-w-[640px] rounded-lg border border-border bg-card px-7 py-6">
      <div className="flex items-center justify-between border-b border-border pb-2.5 mb-3">
        <div>
          <div className="text-sm font-semibold text-primary">{meta.location.split("—")[0].trim()}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{record.title}</div>
        </div>
        <div className="text-right text-[11px] text-muted-foreground">
          <div>{meta.patientName} · {meta.visitType}</div>
          <div>{meta.visitDate} · {meta.provider}</div>
        </div>
      </div>
      <div className="space-y-3">
        {record.sections.map((s) => (
          <div key={s.id}>
            <div className="text-[13px] font-medium text-foreground border-b border-border/60 pb-0.5 mb-1">{s.heading}</div>
            {s.notDocumented ? (
              <p className="text-[13px] italic text-muted-foreground">Not documented in transcript.</p>
            ) : (
              <p className="text-[13px] leading-relaxed text-foreground/85">
                {(s.lines ?? []).map((l) => l.text + (l.inferred ? " [AI suggestion — verify]" : "")).join(" ")}
                {s.codes?.map((c) => `${c.code} (${c.system}) — ${c.label}. `).join("")}
                {s.opportunities?.map((o) => `${o.title}${o.value ? ` (${o.value})` : ""} — ${o.rationale}. `).join("")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Facts table -------------------------------------------------------------

function FactsTable({ extraction }: { extraction: ExtractionResult | null }) {
  if (!extraction) return <Muted>No extracted facts.</Muted>;
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-2">
        Chief concern: <span className="text-foreground">{extraction.chiefConcern}</span>
      </div>
      <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "22%" }} />
          <col />
          <col style={{ width: "92px" }} />
          <col style={{ width: "70px" }} />
        </colgroup>
        <thead>
          <tr className="text-left text-[11px] text-muted-foreground">
            <th className="font-normal px-2 py-1.5">Category</th>
            <th className="font-normal px-2 py-1.5">Finding</th>
            <th className="font-normal px-2 py-1.5">Confidence</th>
            <th className="font-normal px-2 py-1.5">Source</th>
          </tr>
        </thead>
        <tbody>
          {extraction.entities.map((e) => (
            <tr key={e.id} className="border-t border-border align-top">
              <td className="px-2 py-2 text-muted-foreground">{CATEGORY_META[e.category].label}</td>
              <td className="px-2 py-2 text-foreground/90">
                {e.label}
                {e.value && <span className="text-muted-foreground"> · {e.value}</span>}
              </td>
              <td className="px-2 py-2">{Math.round(e.confidence * 100)}%</td>
              <td className="px-2 py-2">
                {e.sources.length > 0 ? (
                  <span className="inline-flex items-center gap-1 text-primary text-xs">
                    <Link2 className="h-3 w-3" /> {e.sources[0]}
                  </span>
                ) : (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Intelligence table ------------------------------------------------------

function IntelTable({ items }: { items: ReturnType<typeof selectIntelligence> }) {
  if (!items.length) return <Muted>No matched intelligence for this visit.</Muted>;
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-2">
        A360 clinical intelligence — guidance matched to this visit&apos;s findings.
      </div>
      <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
        <colgroup>
          <col />
          <col style={{ width: "104px" }} />
        </colgroup>
        <thead>
          <tr className="text-left text-[11px] text-muted-foreground">
            <th className="font-normal px-2 py-1.5">Guidance</th>
            <th className="font-normal px-2 py-1.5">Consensus</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id} className="border-t border-border align-top">
              <td className="px-2 py-2">
                <div className="font-medium text-foreground">{it.title}</div>
                <div className="text-xs text-muted-foreground">{it.body}</div>
              </td>
              <td className="px-2 py-2 text-muted-foreground text-xs">{it.frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- bits --------------------------------------------------------------------

const selectCls =
  "h-9 rounded-lg border border-border bg-card px-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/40 min-w-[210px]";
const selectSm =
  "h-8 rounded-lg border border-border bg-card px-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring/40";

function Field({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-[11px] text-muted-foreground">{label}</label>}
      {children}
    </div>
  );
}

function Muted({ children }: { children: React.ReactNode }) {
  return <div className="py-10 text-center text-sm text-muted-foreground">{children}</div>;
}

function recordToText(record: ClinicalRecord): string {
  const parts: string[] = [record.title];
  for (const s of record.sections) {
    parts.push(`\n${s.heading}`);
    if (s.notDocumented) parts.push("- Not documented in transcript");
    s.lines?.forEach((l) => parts.push(`- ${l.text}${l.inferred ? " [AI suggestion — verify]" : ""}`));
    s.codes?.forEach((c) => parts.push(`- ${c.code} (${c.system}) — ${c.label}`));
    s.opportunities?.forEach((o) => parts.push(`- ${o.title} — ${o.rationale}`));
  }
  return parts.join("\n");
}
