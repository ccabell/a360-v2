"use client";

import React, { useMemo, useState } from "react";
import {
  Mail,
  Clock,
  RefreshCw,
  Loader2,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,
  Wand2,
  Target,
  CalendarClock,
  Link2,
  X,
  MousePointerClick,
  BookOpen,
  Phone,
  Reply,
  Check,
  Flag,
  Save,
  Copy,
  Download,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  buildSegments,
  formatSignalKey,
  mergeTagLabel,
  offsetLabel,
  type ReachCampaign,
  type CampaignEmail,
  type PersonalizationSignal,
} from "@/lib/reach/campaign";

const COMPOSER_TOOLS = [
  "get_patient_context",
  "search_fuel_documents",
  "get_product_info",
  "query_product_database",
];

// No auth yet — the reviewer identity is a placeholder for the audit trail.
const EDITOR = "reviewer";

export type CampaignStatus = "draft" | "edited" | "approved" | "rejected";
export interface EmailReview {
  index: number;
  decision: "approved" | "flagged";
  note?: string;
}

// ── Campaign-type presentation ───────────────────────────────────────────────

const TYPE_META: Record<
  string,
  { label: string; badge: string; accent: string }
> = {
  BOOKING_FACILITATION: {
    label: "Booking Facilitation",
    badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  VALUE_REINFORCEMENT: {
    label: "Value Reinforcement",
    badge: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
    accent: "text-violet-600 dark:text-violet-400",
  },
  MARKETING_OPPORTUNITY: {
    label: "Marketing Opportunity",
    badge: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    accent: "text-amber-600 dark:text-amber-400",
  },
};

function typeMeta(t: string) {
  return (
    TYPE_META[t] ?? {
      label: t,
      badge: "bg-muted text-foreground/70 border-border",
      accent: "text-foreground",
    }
  );
}

const STATUS_META: Record<CampaignStatus, { label: string; badge: string }> = {
  draft: { label: "Draft", badge: "bg-muted text-muted-foreground border-border" },
  edited: { label: "Edited", badge: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30" },
  approved: { label: "Approved", badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" },
  rejected: { label: "Rejected", badge: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30" },
};

const CTA_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  book: CalendarClock,
  learn_more: BookOpen,
  call: Phone,
  reply: Reply,
};

// ── Headless agent call (regenerate) ─────────────────────────────────────────

async function runComposerToText(params: {
  agentId: string;
  patientId: string;
  userMessage: string;
}): Promise<string> {
  const res = await fetch("/api/agent-runner", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      agent_id: params.agentId,
      patient_id: params.patientId,
      user_message: params.userMessage,
      tools_override: COMPOSER_TOOLS,
    }),
  });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const j = (await res.json()) as { error?: string };
      if (j?.error) msg = j.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response stream");
  const decoder = new TextDecoder();
  let buffer = "";
  let acc = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() ?? "";
    for (const chunk of chunks) {
      if (!chunk.startsWith("data: ")) continue;
      let ev: Record<string, unknown>;
      try {
        ev = JSON.parse(chunk.slice(6)) as Record<string, unknown>;
      } catch {
        continue;
      }
      if (ev.type === "token") acc += ev.text as string;
      else if (ev.type === "error")
        throw new Error((ev.message as string) ?? "Agent error");
    }
  }
  return acc;
}

function parseJsonLoose(raw: string): Record<string, unknown> | null {
  if (!raw?.trim()) return null;
  const trimmed = raw.trim();
  const candidates = [trimmed];
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence?.[1]) candidates.push(fence[1].trim());
  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first !== -1 && last > first) candidates.push(trimmed.slice(first, last + 1));
  for (const c of candidates) {
    try {
      const o = JSON.parse(c) as unknown;
      if (o && typeof o === "object") return o as Record<string, unknown>;
    } catch {
      /* next */
    }
  }
  return null;
}

// ── Export builders ──────────────────────────────────────────────────────────

function campaignToMarkdown(c: ReachCampaign): string {
  const lines: string[] = [];
  lines.push(`# Reach Campaign — ${typeMeta(c.campaign_type).label}`);
  if (typeof c.classification_confidence === "number")
    lines.push(`_Confidence: ${Math.round(c.classification_confidence * 100)}%_`);
  if (c.classification_rationale) lines.push(`\n${c.classification_rationale}`);
  (c.email_sequence ?? []).forEach((e, i) => {
    lines.push(`\n---\n\n## Email ${i + 1} — ${offsetLabel(e.send_at_offset_days)}`);
    lines.push(`**Subject:** ${e.subject}`);
    if (e.preview_text) lines.push(`**Preview:** ${e.preview_text}`);
    lines.push(`\n${e.body_markdown}`);
    if (e.cta?.label) lines.push(`\n**CTA:** ${e.cta.label} (${e.cta.type})`);
  });
  return lines.join("\n");
}

function campaignToEml(c: ReachCampaign): string {
  // ".eml-style" — one file, each email as a message block. Merge tags left as
  // placeholders for the CRM to render. Not a true multipart MIME message.
  return (c.email_sequence ?? [])
    .map((e, i) => {
      const header = [
        `Subject: ${e.subject}`,
        `X-Reach-Email: ${i + 1}`,
        `X-Reach-Send-Offset-Days: ${e.send_at_offset_days}`,
        `X-Reach-Preview: ${e.preview_text ?? ""}`,
        `X-Reach-CTA: ${e.cta?.label ?? ""} (${e.cta?.type ?? ""})`,
      ].join("\n");
      return `${header}\n\n${e.body_markdown}`;
    })
    .join("\n\n========================================\n\n");
}

function download(filename: string, text: string, mime: string) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ── Email body renderer (highlight + merge tags + tooltips) ──────────────────

function EmailBody({
  body,
  signals,
  annotations,
}: {
  body: string;
  signals: PersonalizationSignal[];
  annotations: boolean;
}) {
  const paragraphs = body.split(/\n{2,}/).filter((p) => p.trim().length > 0);
  return (
    <div className="space-y-2.5">
      {paragraphs.map((para, pi) => {
        const lines = para.split(/\n/);
        return (
          <p key={pi} className="text-sm leading-relaxed text-foreground/85">
            {lines.map((line, li) => {
              const segs = buildSegments(line, signals);
              return (
                <React.Fragment key={li}>
                  {li > 0 && <br />}
                  {segs.map((seg, si) => {
                    if (seg.kind === "tag") {
                      return (
                        <span
                          key={si}
                          className="mx-0.5 inline-flex items-center rounded bg-muted px-1 py-0 text-xs font-medium text-muted-foreground align-baseline"
                        >
                          {mergeTagLabel(seg.tag)}
                        </span>
                      );
                    }
                    if (seg.kind === "mark") {
                      if (!annotations) return <span key={si}>{seg.text}</span>;
                      const sig = signals[seg.signalIndex];
                      return (
                        <Tooltip key={si}>
                          <TooltipTrigger
                            render={
                              <mark className="cursor-help rounded-sm bg-primary/15 px-0.5 text-foreground decoration-primary/50 decoration-dotted underline-offset-2 [text-decoration-line:underline] hover:bg-primary/25" />
                            }
                          >
                            {seg.text}
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs flex-col items-start gap-1 text-left">
                            <span className="flex items-center gap-1 font-semibold">
                              <Link2 className="h-3 w-3" />
                              {sig ? formatSignalKey(sig.key) : "Signal"}
                            </span>
                            {sig?.value && (
                              <span className="text-background/85 leading-snug">
                                “{sig.value}”
                              </span>
                            )}
                            {sig?.key && (
                              <span className="font-mono text-[10px] text-background/60 break-all">
                                {sig.key}
                              </span>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      );
                    }
                    return <span key={si}>{seg.text}</span>;
                  })}
                </React.Fragment>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

// ── Per-email card ───────────────────────────────────────────────────────────

function EmailCard({
  email,
  index,
  total,
  signals,
  annotations,
  regenLoading,
  review,
  onRegenerate,
  onReview,
}: {
  email: CampaignEmail;
  index: number;
  total: number;
  signals: PersonalizationSignal[];
  annotations: boolean;
  regenLoading: boolean;
  review: EmailReview | undefined;
  onRegenerate: (index: number, instruction: string) => void;
  onReview: (index: number, decision: "approved" | "flagged" | null, note?: string) => void;
}) {
  const [refineOpen, setRefineOpen] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [signalsOpen, setSignalsOpen] = useState(false);
  const [note, setNote] = useState(review?.note ?? "");

  const CtaIcon = CTA_ICON[email.cta?.type] ?? MousePointerClick;
  const isLast = index === total - 1;
  const decision = review?.decision;

  const submit = () => {
    const trimmed = instruction.trim();
    if (!trimmed || regenLoading) return;
    onRegenerate(index, trimmed);
  };

  return (
    <div className="relative pl-8">
      <div className="absolute left-[11px] top-1 flex flex-col items-center">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background text-[10px] font-bold ${
            decision === "approved"
              ? "border-emerald-500 text-emerald-600"
              : decision === "flagged"
                ? "border-amber-500 text-amber-600"
                : "border-primary/40 text-primary"
          }`}
        >
          {index + 1}
        </span>
      </div>
      {!isLast && <div className="absolute left-[22px] top-8 bottom-[-20px] w-px bg-border" />}

      <div
        className={`rounded-xl border bg-background/60 overflow-hidden mb-5 ${
          decision === "approved"
            ? "border-emerald-500/40"
            : decision === "flagged"
              ? "border-amber-500/40"
              : "border-border"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-muted/20 px-4 py-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 text-xs font-medium text-muted-foreground">
              <Clock className="h-3 w-3" />
              {offsetLabel(email.send_at_offset_days)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Email {index + 1} of {total}
            </span>
            {decision === "approved" && (
              <Badge variant="outline" className="gap-1 text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
                <Check className="h-3 w-3" /> Approved
              </Badge>
            )}
            {decision === "flagged" && (
              <Badge variant="outline" className="gap-1 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30">
                <Flag className="h-3 w-3" /> Flagged
              </Badge>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 gap-1.5 text-xs"
            onClick={() => setRefineOpen((v) => !v)}
            disabled={regenLoading}
          >
            <Wand2 className="h-3 w-3" />
            Refine
          </Button>
        </div>

        {/* subject + preview */}
        <div className="px-4 pt-3">
          <p className="text-sm font-semibold text-foreground">{email.subject}</p>
          {email.preview_text && (
            <p className="mt-0.5 text-xs italic text-muted-foreground">{email.preview_text}</p>
          )}
        </div>

        {/* body */}
        <div className="px-4 py-3">
          <EmailBody body={email.body_markdown} signals={signals} annotations={annotations} />
        </div>

        {/* CTA */}
        {email.cta?.label && (
          <div className="px-4 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
              <CtaIcon className="h-3.5 w-3.5" />
              {email.cta.label}
            </span>
          </div>
        )}

        {/* review actions */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border/60 px-4 py-2">
          <Button
            size="sm"
            variant={decision === "approved" ? "default" : "outline"}
            className="h-7 gap-1.5 text-xs"
            onClick={() => onReview(index, decision === "approved" ? null : "approved")}
          >
            <Check className="h-3 w-3" />
            {decision === "approved" ? "Approved" : "Approve"}
          </Button>
          <Button
            size="sm"
            variant={decision === "flagged" ? "default" : "outline"}
            className="h-7 gap-1.5 text-xs"
            onClick={() => onReview(index, decision === "flagged" ? null : "flagged", note)}
          >
            <Flag className="h-3 w-3" />
            {decision === "flagged" ? "Flagged" : "Flag"}
          </Button>
          {decision === "flagged" && (
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => onReview(index, "flagged", note)}
              placeholder="Reviewer note…"
              className="h-7 flex-1 min-w-[160px] text-xs"
            />
          )}
        </div>

        {/* personalization signals used */}
        {signals.length > 0 && (
          <div className="border-t border-border/60 px-4 py-2">
            <button
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setSignalsOpen((v) => !v)}
            >
              {signalsOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              <Link2 className="h-3 w-3" />
              {signals.length} personalization signal{signals.length !== 1 ? "s" : ""}
            </button>
            {signalsOpen && (
              <div className="mt-2 space-y-1.5">
                {signals.map((s, i) => (
                  <div key={i} className="rounded-lg border border-border/50 bg-muted/20 px-2.5 py-1.5">
                    <p className="text-[11px] font-semibold text-foreground/80">{formatSignalKey(s.key)}</p>
                    {s.value && <p className="text-xs text-muted-foreground leading-snug">“{s.value}”</p>}
                    <p className="mt-0.5 font-mono text-[10px] text-muted-foreground/60 break-all">{s.key}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* refine / regenerate */}
        {refineOpen && (
          <div className="border-t border-border/60 bg-muted/10 px-4 py-3">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Regenerate this email with an instruction
            </label>
            <div className="flex items-center gap-2">
              <Input
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                }}
                placeholder="e.g. warmer tone, shorter, lead with the timing…"
                className="h-8 text-xs"
                disabled={regenLoading}
              />
              <Button size="sm" className="h-8 gap-1.5 text-xs shrink-0" onClick={submit} disabled={regenLoading || !instruction.trim()}>
                {regenLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                {regenLoading ? "Regenerating…" : "Regenerate"}
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 shrink-0" onClick={() => setRefineOpen(false)} disabled={regenLoading}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main viewer ──────────────────────────────────────────────────────────────

export interface CampaignViewerProps {
  campaign: ReachCampaign;
  agentId: string | null;
  patientId: string;
  onCampaignChange: (c: ReachCampaign) => void;
  initialSaved?: { id: string; status: CampaignStatus; reviews: EmailReview[] } | null;
}

export function CampaignViewer({
  campaign,
  agentId,
  patientId,
  onCampaignChange,
  initialSaved = null,
}: CampaignViewerProps) {
  const [annotations, setAnnotations] = useState(true);
  const [rationaleOpen, setRationaleOpen] = useState(true);
  const [crmOpen, setCrmOpen] = useState(false);
  const [regenLoading, setRegenLoading] = useState<number | null>(null);
  const [regenError, setRegenError] = useState<string | null>(null);

  // HITL / persistence state
  const [campaignId, setCampaignId] = useState<string | null>(initialSaved?.id ?? null);
  const [status, setStatus] = useState<CampaignStatus>(initialSaved?.status ?? "draft");
  const [reviews, setReviews] = useState<Record<number, EmailReview>>(() => {
    const m: Record<number, EmailReview> = {};
    for (const r of initialSaved?.reviews ?? []) m[r.index] = r;
    return m;
  });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(initialSaved ? "loaded" : null);
  const [copied, setCopied] = useState<string | null>(null);

  const meta = typeMeta(campaign.campaign_type);
  const statusMeta = STATUS_META[status];
  const confidence =
    typeof campaign.classification_confidence === "number"
      ? Math.round(campaign.classification_confidence * 100)
      : null;

  const signalByKey = useMemo(() => {
    const m = new Map<string, PersonalizationSignal>();
    for (const s of campaign.personalization_signals ?? []) m.set(s.key, s);
    return m;
  }, [campaign.personalization_signals]);

  const emailSignals = (email: CampaignEmail): PersonalizationSignal[] =>
    (email.personalization_refs ?? []).map((r) => signalByKey.get(r) ?? { key: r, value: "" });

  const emails = campaign.email_sequence ?? [];
  const motiv = campaign.patient_context?.motivating_event;
  const violated = campaign.guardrails_violated ?? [];
  const applied = campaign.guardrails_applied ?? [];

  const reviewCounts = useMemo(() => {
    let approved = 0;
    let flagged = 0;
    for (const r of Object.values(reviews)) {
      if (r.decision === "approved") approved++;
      else if (r.decision === "flagged") flagged++;
    }
    return { approved, flagged, pending: emails.length - approved - flagged };
  }, [reviews, emails.length]);

  // ── persistence ────────────────────────────────────────────────────────────

  const persist = async (nextStatus: CampaignStatus, action: string) => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/reach/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: campaignId ?? undefined,
          patient_id: patientId,
          campaign,
          campaign_type: campaign.campaign_type,
          status: nextStatus,
          reviews: Object.values(reviews),
          editor: EDITOR,
          action,
        }),
      });
      const j = (await res.json()) as { ok?: boolean; id?: string; status?: string; error?: string };
      if (!res.ok || !j.ok) throw new Error(j.error ?? `Save failed (${res.status})`);
      if (j.id) setCampaignId(j.id);
      setStatus((j.status as CampaignStatus) ?? nextStatus);
      setDirty(false);
      setSavedAt("just now");
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const onReview = (
    index: number,
    decision: "approved" | "flagged" | null,
    note?: string,
  ) => {
    setReviews((prev) => {
      const next = { ...prev };
      if (decision === null) delete next[index];
      else next[index] = { index, decision, note };
      return next;
    });
    setDirty(true);
    if (status === "approved" || status === "rejected") setStatus("edited");
  };

  // ── regenerate ───────────────────────────────────────────────────────────────

  const handleRegenerate = async (index: number, instruction: string) => {
    if (!agentId || !patientId) {
      setRegenError("No agent or patient available for regeneration.");
      return;
    }
    setRegenLoading(index);
    setRegenError(null);
    try {
      const email = emails[index];
      const prompt = [
        `You are the reach_email_composer. A ${campaign.campaign_type} email campaign already exists for this patient.`,
        `Regenerate ONLY email #${index + 1} (send_at_offset_days = ${email.send_at_offset_days}) applying this instruction from practice staff:`,
        ``,
        `"${instruction}"`,
        ``,
        `Current email JSON:`,
        JSON.stringify(email),
        ``,
        `Existing personalization signals you may reference by key:`,
        JSON.stringify(campaign.personalization_signals ?? []),
        ``,
        `Return VALID JSON ONLY for the single regenerated email object with keys: send_at_offset_days, subject, preview_text, body_markdown, cta, personalization_refs. Keep send_at_offset_days unchanged. Honor all original rules (no PHI in subject/preview_text, {{first_name}} only in the body greeting, end the body with the {{unsubscribe_url}} placeholder, no medical claims, catalog-grounded). Reference existing signal keys in personalization_refs where possible; if you introduce new personalization, add a top-level "added_signals" array of {key, value, used_in}. No markdown fences, no commentary.`,
      ].join("\n");

      const raw = await runComposerToText({ agentId, patientId, userMessage: prompt });
      const obj = parseJsonLoose(raw);
      if (!obj) throw new Error("Couldn't parse the regenerated email.");

      const src = (obj.email && typeof obj.email === "object"
        ? (obj.email as Record<string, unknown>)
        : obj) as Record<string, unknown>;

      const cta =
        src.cta && typeof src.cta === "object" ? (src.cta as CampaignEmail["cta"]) : email.cta;

      const updated: CampaignEmail = {
        send_at_offset_days: email.send_at_offset_days,
        subject: typeof src.subject === "string" ? src.subject : email.subject,
        preview_text: typeof src.preview_text === "string" ? src.preview_text : email.preview_text,
        body_markdown: typeof src.body_markdown === "string" ? src.body_markdown : email.body_markdown,
        cta,
        personalization_refs: Array.isArray(src.personalization_refs)
          ? (src.personalization_refs as string[])
          : email.personalization_refs,
      };

      const addedRaw = Array.isArray(obj.added_signals) ? (obj.added_signals as unknown[]) : [];
      const nextSignals = [...(campaign.personalization_signals ?? [])];
      const keys = new Set(nextSignals.map((s) => s.key));
      for (const a of addedRaw) {
        if (a && typeof a === "object") {
          const s = a as Record<string, unknown>;
          if (typeof s.key === "string" && !keys.has(s.key)) {
            nextSignals.push({
              key: s.key,
              value: typeof s.value === "string" ? s.value : "",
              used_in: Array.isArray(s.used_in) ? (s.used_in as string[]) : undefined,
            });
            keys.add(s.key);
          }
        }
      }

      const nextSeq = emails.slice();
      nextSeq[index] = updated;
      onCampaignChange({ ...campaign, email_sequence: nextSeq, personalization_signals: nextSignals });
      // A regenerated email invalidates its prior review; mark the campaign edited.
      onReview(index, null);
      setStatus("edited");
      setDirty(true);
    } catch (e) {
      setRegenError(e instanceof Error ? e.message : "Regeneration failed. Try again.");
    } finally {
      setRegenLoading(null);
    }
  };

  // ── export ───────────────────────────────────────────────────────────────────

  const flash = (key: string) => {
    setCopied(key);
    window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
  };
  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      flash(key);
    } catch {
      setSaveError("Clipboard blocked by the browser.");
    }
  };
  const typeSlug = campaign.campaign_type.toLowerCase();

  return (
    <TooltipProvider delay={80}>
      <div className="mt-6 rounded-2xl border border-border bg-card/40 overflow-hidden">
        {/* summary bar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-border bg-muted/20 px-5 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-[180px]">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={`text-xs font-semibold ${meta.badge}`}>
                {meta.label}
              </Badge>
              <Badge variant="outline" className={`text-xs font-semibold ${statusMeta.badge}`}>
                {statusMeta.label}
              </Badge>
              {confidence !== null && (
                <span className="text-xs text-muted-foreground">{confidence}% confidence</span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {emails.length} email{emails.length !== 1 ? "s" : ""} · {reviewCounts.approved} approved
              · {reviewCounts.flagged} flagged · {reviewCounts.pending} pending
            </p>
          </div>
          <Button
            size="sm"
            variant={annotations ? "default" : "outline"}
            className="h-8 gap-1.5 text-xs"
            onClick={() => setAnnotations((v) => !v)}
          >
            {annotations ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            Annotations {annotations ? "On" : "Off"}
          </Button>
        </div>

        {/* HITL action bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background/40 px-5 py-2.5">
          <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs" onClick={() => persist("edited", "save_draft")} disabled={saving}>
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Save draft
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => persist("approved", "approve_campaign")} disabled={saving}>
            <CircleCheck className="h-3.5 w-3.5" />
            Approve campaign
          </Button>
          <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={() => persist("rejected", "reject_campaign")} disabled={saving}>
            <CircleX className="h-3.5 w-3.5" />
            Reject
          </Button>

          <div className="mx-1 h-5 w-px bg-border" />

          <Button size="sm" variant="ghost" className="h-8 gap-1.5 text-xs" onClick={() => copyText("md", campaignToMarkdown(campaign))}>
            <Copy className="h-3.5 w-3.5" />
            {copied === "md" ? "Copied" : "Copy all"}
          </Button>
          <Button size="sm" variant="ghost" className="h-8 gap-1.5 text-xs" onClick={() => download(`reach-campaign-${typeSlug}.eml`, campaignToEml(campaign), "message/rfc822")}>
            <Download className="h-3.5 w-3.5" />
            Download .eml
          </Button>

          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            {saveError ? (
              <span className="text-red-600 dark:text-red-400">{saveError}</span>
            ) : dirty ? (
              <span>Unsaved changes</span>
            ) : savedAt ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Check className="h-3.5 w-3.5" /> Saved
              </span>
            ) : null}
          </div>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* compliance note */}
          <p className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
            Review-only. Approving records the decision and persists the campaign — it does{" "}
            <span className="font-medium">not</span> send. A real send path requires practice
            compliance acknowledgement + marketing authorization + audit logging.
          </p>

          {/* classification */}
          <div className="rounded-xl border border-border/60 bg-background/40 p-4">
            <button className="flex w-full items-center justify-between gap-2" onClick={() => setRationaleOpen((v) => !v)}>
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Target className={`h-3.5 w-3.5 ${meta.accent}`} />
                Why this campaign
              </span>
              {rationaleOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </button>
            {rationaleOpen && (
              <div className="mt-3 space-y-3">
                {confidence !== null && (
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Classification confidence</span>
                      <span className="tabular-nums font-medium text-foreground">{confidence}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${confidence}%` }} />
                    </div>
                  </div>
                )}
                {campaign.classification_rationale && (
                  <p className="text-sm leading-relaxed text-foreground/85">{campaign.classification_rationale}</p>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  {campaign.patient_context?.primary_goal && (
                    <span className="rounded-lg border border-border/50 bg-muted/20 px-2.5 py-1 text-xs">
                      <span className="text-muted-foreground">Goal: </span>
                      <span className="text-foreground/85">{campaign.patient_context.primary_goal}</span>
                    </span>
                  )}
                  {motiv?.event && (
                    <span className="rounded-lg border border-border/50 bg-muted/20 px-2.5 py-1 text-xs">
                      <span className="text-muted-foreground">Event: </span>
                      <span className="text-foreground/85">
                        {motiv.event}
                        {motiv.timing ? ` · ${motiv.timing}` : ""}
                        {motiv.urgency ? ` · ${motiv.urgency} urgency` : ""}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* guardrails */}
          {(applied.length > 0 || violated.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {violated.length > 0 && (
                <div className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-800 dark:border-red-800/60 dark:bg-red-950/30 dark:text-red-300">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{violated.length} guardrail{violated.length !== 1 ? "s" : ""} violated</p>
                    <p className="text-red-700/80 dark:text-red-300/80">{violated.join("; ")}</p>
                  </div>
                </div>
              )}
              {applied.length > 0 && (
                <div className="flex items-start gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{applied.length} guardrail{applied.length !== 1 ? "s" : ""} applied</p>
                    <p className="text-emerald-700/80 dark:text-emerald-300/80">{applied.join("; ")}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {regenError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 dark:border-red-800/60 dark:bg-red-950/30 dark:text-red-300">
              {regenError}
            </div>
          )}

          {/* email timeline */}
          <div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              Email sequence
            </p>
            <div>
              {emails.map((email, i) => (
                <EmailCard
                  key={i}
                  email={email}
                  index={i}
                  total={emails.length}
                  signals={emailSignals(email)}
                  annotations={annotations}
                  regenLoading={regenLoading === i}
                  review={reviews[i]}
                  onRegenerate={handleRegenerate}
                  onReview={onReview}
                />
              ))}
            </div>
          </div>

          {/* CRM payload preview */}
          {campaign.crm_payload_preview && (
            <div className="rounded-xl border border-border/60 bg-background/40 p-4">
              <button className="flex w-full items-center justify-between gap-2" onClick={() => setCrmOpen((v) => !v)}>
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Link2 className="h-3.5 w-3.5" />
                  CRM payload preview
                  <span className="font-normal normal-case text-muted-foreground/70">(export only — no sends in v1)</span>
                </span>
                {crmOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </button>
              {crmOpen && (
                <div className="mt-3">
                  <Tabs defaultValue="targeted">
                    <TabsList>
                      <TabsTrigger value="targeted">Targeted info push</TabsTrigger>
                      <TabsTrigger value="full">Full email push</TabsTrigger>
                    </TabsList>
                    {(["targeted", "full"] as const).map((k) => {
                      const payload =
                        k === "targeted"
                          ? campaign.crm_payload_preview?.targeted_info_push ?? {}
                          : campaign.crm_payload_preview?.full_email_push ?? {};
                      const text = JSON.stringify(payload, null, 2);
                      return (
                        <TabsContent key={k} value={k} className="mt-3">
                          <div className="relative">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute right-2 top-2 h-7 gap-1.5 text-xs"
                              onClick={() => copyText(`crm-${k}`, text)}
                            >
                              <Copy className="h-3 w-3" />
                              {copied === `crm-${k}` ? "Copied" : "Copy"}
                            </Button>
                            <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-3 pr-16 text-xs font-mono text-foreground/80">
                              {text}
                            </pre>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </Tabs>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
