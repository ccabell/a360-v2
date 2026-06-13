"use client";

import { useMemo, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, MousePointerClick } from "lucide-react";
import { walkFields, pct, type ExtractedField } from "@/lib/runs/extract-fields";

interface Anchor {
  id: string;
  fieldId: string;
  start: number;
  end: number;
}

/**
 * Prop-driven consultation intelligence — evidence-anchored extraction view.
 *
 * Takes transcript_raw and extraction outputs directly (from the ops store
 * patient detail response), instead of fetching from Prompt Runner.
 * Side-by-side: transcript with highlighted evidence ↔ extracted fields.
 * Click a fact → scrolls to its evidence in the transcript, and vice versa.
 */
export function ConsultationIntelligence({
  transcriptRaw,
  outputs,
}: {
  transcriptRaw: string;
  outputs: Record<string, unknown>;
}) {
  const [activeField, setActiveField] = useState<string | null>(null);
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const anchorRefs = useRef<Record<string, HTMLElement | null>>({});

  // Walk the extraction tree for { value, evidence } field nodes
  const fields = useMemo<ExtractedField[]>(() => {
    const out: ExtractedField[] = [];
    for (const [k, v] of Object.entries(outputs)) {
      if (k.startsWith("prompt_") && (v as Record<string, unknown>)?.parsed_json) {
        walkFields(
          (v as Record<string, unknown>).parsed_json,
          { prefix: `${k}.`, depth: 0 },
          out,
        );
      }
    }
    return out;
  }, [outputs]);

  // Anchor evidence quotes into the transcript (exact substring match)
  const anchors = useMemo<Anchor[]>(() => {
    if (!transcriptRaw) return [];
    const list: Anchor[] = [];
    fields.forEach((f) => {
      (f.evidence || []).forEach((e, ei) => {
        const q = (e.quote || "").trim();
        if (q.length < 4) return;
        const idx = transcriptRaw.indexOf(q);
        if (idx === -1) return;
        list.push({
          id: `${f.id}#${ei}`,
          fieldId: f.id,
          start: idx,
          end: idx + q.length,
        });
      });
    });
    list.sort((a, b) => a.start - b.start);
    // Drop overlaps (keep earliest)
    const result: Anchor[] = [];
    let cursor = 0;
    for (const a of list) {
      if (a.start < cursor) continue;
      result.push(a);
      cursor = a.end;
    }
    return result;
  }, [transcriptRaw, fields]);

  const anchorsByField = useMemo(() => {
    const m: Record<string, string[]> = {};
    anchors.forEach((a) => {
      (m[a.fieldId] ||= []).push(a.id);
    });
    return m;
  }, [anchors]);

  function selectFromField(fieldId: string) {
    if (!anchorsByField[fieldId]?.length) return;
    setActiveField(fieldId);
    anchorRefs.current[anchorsByField[fieldId][0]]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function selectFromTranscript(fieldId: string) {
    setActiveField(fieldId);
    fieldRefs.current[fieldId]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  // Transcript with highlighted evidence ranges
  const transcriptNodes = useMemo(() => {
    if (!transcriptRaw) return null;
    const nodes: React.ReactNode[] = [];
    let cursor = 0;
    anchors.forEach((a) => {
      if (a.start > cursor) {
        nodes.push(
          <span key={`t${cursor}`}>{transcriptRaw.slice(cursor, a.start)}</span>,
        );
      }
      const isActive = activeField === a.fieldId;
      nodes.push(
        <mark
          key={a.id}
          ref={(el) => {
            anchorRefs.current[a.id] = el;
          }}
          onClick={() => selectFromTranscript(a.fieldId)}
          className={`cursor-pointer rounded px-0.5 transition-colors ${
            isActive
              ? "bg-primary/30 text-foreground ring-1 ring-primary"
              : "bg-primary/10 text-foreground hover:bg-primary/20"
          }`}
        >
          {transcriptRaw.slice(a.start, a.end)}
        </mark>,
      );
      cursor = a.end;
    });
    if (cursor < transcriptRaw.length) {
      nodes.push(
        <span key={`t${cursor}`}>{transcriptRaw.slice(cursor)}</span>,
      );
    }
    return nodes;
  }, [transcriptRaw, anchors, activeField]);

  const anchoredCount = anchors.length;
  const validation = outputs.validation as Record<string, unknown> | undefined;

  if (fields.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Groundedness header */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-medium text-foreground">
          {fields.length} extracted fields · {anchoredCount} anchored to transcript
        </span>
        {validation &&
          Object.entries(validation).map(([name, p]) => {
            const pass = p as Record<string, unknown> | null;
            return (
              <span
                key={name}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-muted-foreground"
              >
                {pass?.valid ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-3 w-3 text-destructive" />
                )}
                {name.replace(/_/g, " ")} {pct((pass as Record<string, unknown>)?.anchor_rate)}%
              </span>
            );
          })}
        <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
          <MousePointerClick className="h-3 w-3" />
          Click a fact or a highlight to bind both sides
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Transcript with evidence highlights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transcript</CardTitle>
            <CardDescription>
              Highlights are evidence anchored to extracted facts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[34rem] overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {transcriptNodes}
            </div>
          </CardContent>
        </Card>

        {/* Extracted intelligence */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Extracted intelligence</CardTitle>
            <CardDescription>
              Click a fact to find its evidence in the transcript
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[34rem] space-y-2 overflow-auto">
            {fields.map((f) => {
              const count = anchorsByField[f.id]?.length ?? 0;
              const isActive = activeField === f.id;
              return (
                <div
                  key={f.id}
                  ref={(el) => {
                    fieldRefs.current[f.id] = el;
                  }}
                  onClick={() => selectFromField(f.id)}
                  className={`rounded-lg border p-2.5 transition-colors ${
                    isActive ? "border-primary bg-primary/5" : "border-border"
                  } ${count ? "cursor-pointer hover:border-primary/50" : ""}`}
                >
                  <div className="mb-0.5 flex items-center gap-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      {f.label}
                    </p>
                    {count > 0 && (
                      <span className="text-[10px] text-primary">
                        {count} in transcript
                      </span>
                    )}
                  </div>
                  <FieldValue value={f.value} missingReason={f.missing_reason} />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FieldValue({
  value,
  missingReason,
}: {
  value: unknown;
  missingReason?: string | null;
}) {
  if (value == null || (Array.isArray(value) && value.length === 0)) {
    return (
      <span className="text-sm italic text-muted-foreground/70">
        Not found{missingReason ? ` — ${missingReason}` : ""}
      </span>
    );
  }
  if (Array.isArray(value)) {
    if (typeof value[0] === "string") {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((s, i) => (
            <Badge key={i} variant="secondary">
              {String(s)}
            </Badge>
          ))}
        </div>
      );
    }
    return (
      <ul className="list-disc space-y-0.5 pl-4 text-sm text-foreground">
        {value.map((o: unknown, i) => {
          const obj = o as Record<string, unknown>;
          return (
            <li key={i}>
              {String(obj?.name || obj?.area || obj?.item_label || obj?.label || JSON.stringify(o).slice(0, 80))}
            </li>
          );
        })}
      </ul>
    );
  }
  if (typeof value === "object") {
    return (
      <span className="text-sm text-foreground">
        {String((value as Record<string, unknown>).name || JSON.stringify(value).slice(0, 120))}
      </span>
    );
  }
  return <span className="text-sm text-foreground">{String(value)}</span>;
}
