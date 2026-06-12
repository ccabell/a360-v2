"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, MousePointerClick } from "lucide-react";
import type { PRRunDetail, PRTranscriptDetail } from "@/lib/types";
import { walkFields, pct, type ExtractedField } from "@/lib/runs/extract-fields";

interface Anchor {
  id: string;
  fieldId: string;
  start: number;
  end: number;
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
        {value.map((o: any, i) => (
          <li key={i}>
            {o?.name || o?.area || o?.item_label || o?.label || JSON.stringify(o).slice(0, 80)}
          </li>
        ))}
      </ul>
    );
  }
  if (typeof value === "object") {
    return (
      <span className="text-sm text-foreground">
        {(value as any).name || JSON.stringify(value).slice(0, 120)}
      </span>
    );
  }
  return <span className="text-sm text-foreground">{String(value)}</span>;
}

export function ConsultationIntelligence({
  transcriptId,
  runId,
}: {
  transcriptId: string;
  runId: string;
}) {
  const [raw, setRaw] = useState<string>("");
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
        const [tRes, rRes] = await Promise.all([
          fetch(`/api/transcripts/${transcriptId}`),
          fetch(`/api/runs/${runId}`),
        ]);
        const tJson = (await tRes.json()) as PRTranscriptDetail & { error?: string };
        const rJson = (await rRes.json()) as PRRunDetail & { error?: string };
        if (cancelled) return;
        if (!tRes.ok || tJson.error) throw new Error(tJson.error || `transcript HTTP ${tRes.status}`);
        if (!rRes.ok || rJson.error) throw new Error(rJson.error || `run HTTP ${rRes.status}`);
        setRaw(tJson.transcript_raw ?? "");
        setRun(rJson);
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

  // Extraction fields across all prompt passes.
  const fields = useMemo<ExtractedField[]>(() => {
    if (!run?.outputs) return [];
    const out: ExtractedField[] = [];
    for (const [k, v] of Object.entries(run.outputs)) {
      if (k.startsWith("prompt_") && (v as any)?.parsed_json) {
        walkFields((v as any).parsed_json, { prefix: `${k}.`, depth: 0 }, out);
      }
    }
    return out;
  }, [run]);

  // Anchor each field's evidence quotes into the transcript (exact substring, v3.3 contract).
  const anchors = useMemo<Anchor[]>(() => {
    if (!raw) return [];
    const list: Anchor[] = [];
    fields.forEach((f) => {
      (f.evidence || []).forEach((e, ei) => {
        const q = (e.quote || "").trim();
        if (q.length < 4) return;
        const idx = raw.indexOf(q);
        if (idx === -1) return;
        list.push({ id: `${f.id}#${ei}`, fieldId: f.id, start: idx, end: idx + q.length });
      });
    });
    list.sort((a, b) => a.start - b.start);
    // drop overlaps (keep earliest)
    const result: Anchor[] = [];
    let cursor = 0;
    for (const a of list) {
      if (a.start < cursor) continue;
      result.push(a);
      cursor = a.end;
    }
    return result;
  }, [raw, fields]);

  const anchorsByField = useMemo(() => {
    const m: Record<string, string[]> = {};
    anchors.forEach((a) => {
      (m[a.fieldId] ||= []).push(a.id);
    });
    return m;
  }, [anchors]);

  const anchoredCount = anchors.length;

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
    fieldRefs.current[fieldId]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Transcript with highlighted evidence ranges.
  const transcriptNodes = useMemo(() => {
    if (!raw) return null;
    const nodes: React.ReactNode[] = [];
    let cursor = 0;
    anchors.forEach((a) => {
      if (a.start > cursor) {
        nodes.push(<span key={`t${cursor}`}>{raw.slice(cursor, a.start)}</span>);
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
          {raw.slice(a.start, a.end)}
        </mark>,
      );
      cursor = a.end;
    });
    if (cursor < raw.length) {
      nodes.push(<span key={`t${cursor}`}>{raw.slice(cursor)}</span>);
    }
    return nodes;
  }, [raw, anchors, activeField]);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center gap-3 py-6 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Loading consultation intelligence…
        </CardContent>
      </Card>
    );
  }
  if (error || !run) {
    return (
      <Card>
        <CardContent className="flex items-center gap-2 py-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error || "Run not found"}
        </CardContent>
      </Card>
    );
  }

  const validation = run.outputs?.validation as Record<string, any> | undefined;

  return (
    <div className="space-y-4">
      {/* Groundedness header */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-medium text-foreground">
          {fields.length} extracted fields · {anchoredCount} anchored to transcript
        </span>
        {validation &&
          Object.entries(validation).map(([name, p]) => (
            <span
              key={name}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-muted-foreground"
            >
              {p?.valid ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              ) : (
                <AlertCircle className="h-3 w-3 text-destructive" />
              )}
              {name.replace(/_/g, " ")} {pct(p?.anchor_rate)}%
            </span>
          ))}
        <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
          <MousePointerClick className="h-3 w-3" />
          Click a fact or a highlight to bind both sides
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Transcript */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transcript</CardTitle>
            <CardDescription>Highlights are evidence anchored to extracted facts</CardDescription>
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
            <CardDescription>Click a fact to find its evidence in the transcript</CardDescription>
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
                    <p className="text-xs font-medium text-muted-foreground">{f.label}</p>
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
