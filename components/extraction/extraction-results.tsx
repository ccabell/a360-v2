"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import type { PRRunDetail, PRTranscriptDetail, RunEvidence } from "@/lib/types";
import { EvidenceBlock } from "./evidence-block";
import { OfferingCard } from "./offering-card";
import {
  outcomeStyle,
  humanize,
  COMMITMENT_LEVELS,
} from "./disposition";

/* eslint-disable @typescript-eslint/no-explicit-any */

function ev(x: any): RunEvidence[] {
  if (!x) return [];
  return Array.isArray(x) ? x : [x];
}
function chips(value: unknown) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {value.map((v, i) => (
        <Badge key={i} variant="secondary">
          {String(v)}
        </Badge>
      ))}
    </div>
  );
}

interface Anchor {
  id: string;
  start: number;
  end: number;
}

export function ExtractionResults({
  transcriptId,
  runId,
}: {
  transcriptId: string;
  runId: string;
}) {
  const [raw, setRaw] = useState("");
  const [run, setRun] = useState<PRRunDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const anchorRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setActiveField(null);
    (async () => {
      try {
        const [t, r] = await Promise.all([
          fetch(`/api/transcripts/${transcriptId}`),
          fetch(`/api/runs/${runId}`),
        ]);
        const tj = (await t.json()) as PRTranscriptDetail & { error?: string };
        const rj = (await r.json()) as PRRunDetail & { error?: string };
        if (cancelled) return;
        if (!t.ok || tj.error) throw new Error(tj.error || `transcript ${t.status}`);
        if (!r.ok || rj.error) throw new Error(rj.error || `run ${r.status}`);
        setRaw(tj.transcript_raw ?? "");
        setRun(rj);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [transcriptId, runId]);

  const p1: any = run?.outputs?.prompt_1?.parsed_json ?? {};
  const p2: any = run?.outputs?.prompt_2?.parsed_json ?? {};

  // Flat list of evidence-bearing items (stable ids) for transcript anchoring.
  const items = useMemo(() => {
    const out: { id: string; evidence: RunEvidence[] }[] = [];
    const push = (id: string, e: any) => {
      const arr = ev(e);
      if (arr.length) out.push({ id, evidence: arr });
    };
    const vc = p1.visit_context ?? {};
    push("vc.visit_type", vc.visit_type?.evidence);
    push("vc.reason", vc.reason_for_visit?.evidence);
    push("vc.referred_by", vc.referred_by?.evidence);
    push("vc.motivation", vc.motivation_type?.evidence);
    (vc.motivating_events ?? []).forEach((m: any, i: number) => push(`vc.event.${i}`, m.evidence));
    const g = p1.patient_goals ?? {};
    push("g.primary", g.primary_concern?.evidence);
    push("g.secondary", g.secondary_concerns?.evidence);
    push("g.goals", g.goals?.evidence);
    push("g.outcomes", g.anticipated_outcomes?.evidence);
    (p1.offerings ?? []).forEach((_: any, i: number) => push(`off.${i}`, p1.offerings[i].evidence));
    (p1.prior_treatments ?? []).forEach((x: any, i: number) => push(`prior.${i}`, x.evidence));
    push("int.stated", p1.interests?.stated_interests?.evidence);
    (p1.interests?.future_interests?.value ?? []).forEach((x: any, i: number) => push(`int.future.${i}`, x.evidence));
    push("out.status", p2.outcome?.status?.evidence);
    push("out.summary", p2.outcome?.summary?.evidence);
    push("commit", p2.patient_signals?.commitment_level?.evidence);
    (p2.objections ?? []).forEach((x: any, i: number) => push(`obj.${i}`, x.evidence));
    (p2.hesitations ?? []).forEach((x: any, i: number) => push(`hes.${i}`, x.evidence));
    (p2.concerns ?? []).forEach((x: any, i: number) => push(`con.${i}`, x.evidence));
    (p2.visit_checklist ?? []).forEach((x: any, i: number) => push(`chk.${i}`, x.evidence));
    return out;
  }, [p1, p2]);

  const anchors = useMemo<Anchor[]>(() => {
    if (!raw) return [];
    const list: Anchor[] = [];
    items.forEach((it) => {
      it.evidence.forEach((e) => {
        const q = (e.quote || "").trim();
        if (q.length < 4) return;
        const idx = raw.indexOf(q);
        if (idx === -1) return;
        list.push({ id: it.id, start: idx, end: idx + q.length });
      });
    });
    list.sort((a, b) => a.start - b.start);
    const res: Anchor[] = [];
    let cur = 0;
    for (const a of list) {
      if (a.start < cur) continue;
      res.push(a);
      cur = a.end;
    }
    return res;
  }, [raw, items]);

  function selectField(id: string) {
    setActiveField(id);
    const a = anchors.find((x) => x.id === id);
    if (a) anchorRefs.current[`${a.id}:${a.start}`]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function selectFromTranscript(id: string) {
    setActiveField(id);
    fieldRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const transcriptNodes = useMemo(() => {
    if (!raw) return null;
    const nodes: React.ReactNode[] = [];
    let cur = 0;
    anchors.forEach((a) => {
      if (a.start > cur) nodes.push(<span key={`t${cur}`}>{raw.slice(cur, a.start)}</span>);
      const isActive = activeField === a.id;
      nodes.push(
        <mark
          key={`${a.id}:${a.start}`}
          ref={(el) => {
            anchorRefs.current[`${a.id}:${a.start}`] = el;
          }}
          onClick={() => selectFromTranscript(a.id)}
          className={`cursor-pointer rounded px-0.5 transition-colors ${
            isActive
              ? "bg-primary/30 text-foreground ring-1 ring-primary"
              : "bg-primary/10 text-foreground hover:bg-primary/20"
          }`}
        >
          {raw.slice(a.start, a.end)}
        </mark>,
      );
      cur = a.end;
    });
    if (cur < raw.length) nodes.push(<span key={`t${cur}`}>{raw.slice(cur)}</span>);
    return nodes;
  }, [raw, anchors, activeField]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-8 text-sm text-muted-foreground">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Loading extraction…
      </div>
    );
  }
  if (error || !run) {
    return (
      <div className="flex items-center gap-2 py-4 text-sm text-destructive">
        <AlertCircle className="h-4 w-4" />
        {error || "Run not found"}
      </div>
    );
  }

  // helpers bound to state
  const block = (id: string, label: string, value: React.ReactNode, evidence: any, accent = "border-l-primary") => (
    <EvidenceBlock
      id={id}
      label={label}
      value={value}
      evidence={ev(evidence)}
      accent={accent}
      active={activeField === id}
      onSelect={() => selectField(id)}
    />
  );
  const fieldRef = (id: string) => (el: HTMLDivElement | null) => {
    fieldRefs.current[id] = el;
  };

  const outcome = p2.outcome?.status?.value as string | undefined;
  const os = outcomeStyle(outcome);
  const commit = p2.patient_signals?.commitment_level?.value as string | undefined;
  const validation = run.outputs?.validation as any;

  const objections = (p2.objections ?? []) as any[];
  const hesitations = (p2.hesitations ?? []) as any[];
  const concerns = (p2.concerns ?? []) as any[];
  const checklist = (p2.visit_checklist ?? []) as any[];
  const signalTags = (p2.signal_tags ?? []) as string[];

  const Section = ({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) => (
    <section className="space-y-2">
      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
        {count != null && <Badge variant="secondary">{count}</Badge>}
      </h4>
      {children}
    </section>
  );

  return (
    <div className="space-y-3">
      {/* Groundedness header */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-medium text-foreground">
          {items.length} fields · {anchors.length} anchored to transcript
        </span>
        {validation &&
          Object.entries(validation).map(([k, v]: [string, any]) => (
            <span key={k} className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-muted-foreground">
              {v?.valid ? <CheckCircle2 className="h-3 w-3 text-emerald-600" /> : <AlertCircle className="h-3 w-3 text-destructive" />}
              {k.replace(/_/g, " ")}
            </span>
          ))}
        {run.model_name && <Badge variant="secondary" className="ml-auto">{run.model_provider} · {run.model_name}</Badge>}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,380px)_1fr]">
        {/* Transcript */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Source transcript
          </div>
          <div className="max-h-[40rem] overflow-auto whitespace-pre-wrap p-3 text-sm leading-relaxed text-foreground">
            {transcriptNodes}
          </div>
        </div>

        {/* Extracted data */}
        <div className="max-h-[40rem] space-y-5 overflow-auto pr-1">
          {/* Outcome + commitment */}
          <Section title="Consultation outcome">
            <div ref={fieldRef("out.status")} className="space-y-2">
              {outcome && (
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${os.badge}`}>{os.label}</span>
                </div>
              )}
              {p2.outcome?.summary?.value && (
                <div ref={fieldRef("out.summary")}>
                  {block("out.summary", "Summary", p2.outcome.summary.value, p2.outcome.summary.evidence, "border-l-primary")}
                </div>
              )}
              {commit && (
                <div ref={fieldRef("commit")} className="rounded-lg border border-border bg-card p-3">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Commitment level</p>
                  <div className="flex items-center gap-1">
                    {COMMITMENT_LEVELS.map((lvl) => {
                      const active = lvl === commit;
                      const idx = COMMITMENT_LEVELS.indexOf(commit as any);
                      const reached = COMMITMENT_LEVELS.indexOf(lvl) <= idx;
                      return (
                        <div key={lvl} className="flex-1 text-center">
                          <div className={`h-1.5 rounded-full ${reached ? "bg-primary" : "bg-muted"}`} />
                          <span className={`mt-1 block text-[9px] ${active ? "font-semibold text-primary" : "text-muted-foreground"}`}>
                            {humanize(lvl)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* Offerings — the hero */}
          {(p1.offerings ?? []).length > 0 && (
            <Section title="Offerings" count={p1.offerings.length}>
              <div className="space-y-2">
                {p1.offerings.map((o: any, i: number) => (
                  <div key={i} ref={fieldRef(`off.${i}`)}>
                    <OfferingCard offering={o} active={activeField === `off.${i}`} onSelect={() => selectField(`off.${i}`)} />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Goals & concerns */}
          <Section title="Goals & concerns">
            <div className="grid gap-2 sm:grid-cols-2">
              {p1.patient_goals?.primary_concern?.value && (
                <div ref={fieldRef("g.primary")} className="sm:col-span-2">
                  {block("g.primary", "Primary concern", p1.patient_goals.primary_concern.value, p1.patient_goals.primary_concern.evidence, "border-l-primary")}
                </div>
              )}
              <div ref={fieldRef("g.secondary")}>{block("g.secondary", "Secondary concerns", chips(p1.patient_goals?.secondary_concerns?.value), p1.patient_goals?.secondary_concerns?.evidence, "border-l-border")}</div>
              <div ref={fieldRef("g.goals")}>{block("g.goals", "Goals", chips(p1.patient_goals?.goals?.value), p1.patient_goals?.goals?.evidence, "border-l-border")}</div>
              <div ref={fieldRef("g.outcomes")}>{block("g.outcomes", "Anticipated outcomes", chips(p1.patient_goals?.anticipated_outcomes?.value), p1.patient_goals?.anticipated_outcomes?.evidence, "border-l-border")}</div>
            </div>
          </Section>

          {/* Visit context */}
          <Section title="Visit context">
            <div className="grid gap-2 sm:grid-cols-2">
              <div ref={fieldRef("vc.reason")}>{block("vc.reason", "Reason for visit", p1.visit_context?.reason_for_visit?.value, p1.visit_context?.reason_for_visit?.evidence, "border-l-border")}</div>
              <div ref={fieldRef("vc.visit_type")}>{block("vc.visit_type", "Visit type", humanize(p1.visit_context?.visit_type?.value), p1.visit_context?.visit_type?.evidence, "border-l-border")}</div>
              <div ref={fieldRef("vc.referred_by")}>{block("vc.referred_by", "Referred by", humanize(p1.visit_context?.referred_by?.value), p1.visit_context?.referred_by?.evidence, "border-l-border")}</div>
              <div ref={fieldRef("vc.motivation")}>{block("vc.motivation", "Motivation", humanize(p1.visit_context?.motivation_type?.value), p1.visit_context?.motivation_type?.evidence, "border-l-border")}</div>
            </div>
            {(p1.visit_context?.motivating_events ?? []).length > 0 && (
              <div className="mt-2 space-y-2">
                {p1.visit_context.motivating_events.map((m: any, i: number) => (
                  <div key={i} ref={fieldRef(`vc.event.${i}`)}>
                    {block(
                      `vc.event.${i}`,
                      "Motivating event",
                      <span>
                        {m.event}
                        {m.timing && <span className="ml-2 text-amber-600">{m.timing}</span>}
                        {m.urgency && (
                          <span className={`ml-2 rounded px-1.5 py-0.5 text-[10px] ${m.urgency === "high" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" : m.urgency === "medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" : "bg-muted text-muted-foreground"}`}>
                            {String(m.urgency).toUpperCase()}
                          </span>
                        )}
                      </span>,
                      m.evidence,
                      "border-l-amber-500",
                    )}
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Objections / hesitations / concerns */}
          {(objections.length + hesitations.length + concerns.length) > 0 && (
            <Section title="Objections · hesitations · concerns" count={objections.length + hesitations.length + concerns.length}>
              <div className="space-y-2">
                {objections.map((o, i) => (
                  <div key={`o${i}`} ref={fieldRef(`obj.${i}`)}>
                    {block(`obj.${i}`, `Objection · ${humanize(o.type)}`,
                      <span>{o.statement}{o.resolved === true ? <span className="ml-2 text-emerald-600">resolved</span> : o.resolved === false ? <span className="ml-2 text-destructive">unresolved</span> : null}</span>,
                      o.evidence, "border-l-red-500")}
                  </div>
                ))}
                {hesitations.map((h, i) => (
                  <div key={`h${i}`} ref={fieldRef(`hes.${i}`)}>
                    {block(`hes.${i}`, `Hesitation · ${humanize(h.topic)}`, h.statement, h.evidence, "border-l-amber-500")}
                  </div>
                ))}
                {concerns.map((c, i) => (
                  <div key={`c${i}`} ref={fieldRef(`con.${i}`)}>
                    {block(`con.${i}`, `Concern · ${humanize(c.category)} · ${humanize(c.raised_by)}`, c.concern, c.evidence, "border-l-purple-500")}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Signal tags */}
          {signalTags.length > 0 && (
            <Section title="Signal tags" count={signalTags.length}>
              <div className="flex flex-wrap gap-1.5">
                {signalTags.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {humanize(t)}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Visit checklist */}
          {checklist.length > 0 && (
            <Section title="Visit checklist" count={checklist.length}>
              <div className="space-y-1">
                {checklist.map((c, i) => {
                  const done = c.completed;
                  const safetyGap = c.category === "safety" && done === false;
                  return (
                    <div
                      key={i}
                      ref={fieldRef(`chk.${i}`)}
                      onClick={() => ev(c.evidence).length && selectField(`chk.${i}`)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${
                        safetyGap ? "border-amber-300 bg-amber-50 dark:bg-amber-950/30" : activeField === `chk.${i}` ? "border-primary bg-primary/5" : "border-border"
                      } ${ev(c.evidence).length ? "cursor-pointer" : ""}`}
                    >
                      {done === true ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : done === false ? <XCircle className="h-4 w-4 shrink-0 text-destructive" /> : <MinusCircle className="h-4 w-4 shrink-0 text-muted-foreground" />}
                      <span className="flex-1 text-foreground">{c.item_label}</span>
                      <Badge variant="secondary" className="shrink-0">{humanize(c.category)}</Badge>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* Prior treatments */}
          {(p1.prior_treatments ?? []).length > 0 && (
            <Section title="Prior treatments" count={p1.prior_treatments.length}>
              <div className="space-y-2">
                {p1.prior_treatments.map((pt: any, i: number) => (
                  <div key={i} ref={fieldRef(`prior.${i}`)}>
                    {block(`prior.${i}`, `${humanize(pt.location)} · ${humanize(pt.experience) || "—"}`,
                      <span>{pt.treatment}{pt.timing && <span className="ml-2 text-muted-foreground">{pt.timing}</span>}</span>,
                      pt.evidence, "border-l-border")}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}
