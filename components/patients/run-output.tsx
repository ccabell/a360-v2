"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChevronDown,
  Quote,
  AlertCircle,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import type { PRRunDetail, RunEvidence } from "@/lib/types";
import { formatDate } from "@/lib/format";

// --- helpers -----------------------------------------------------------------

interface ExtractedField {
  label: string;
  value: unknown;
  evidence?: RunEvidence[];
  missing_reason?: string | null;
}

function humanize(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function pct(n: unknown): number {
  const v = typeof n === "number" ? n : 0;
  return Math.round(v <= 1 ? v * 100 : v);
}

function isFieldNode(v: unknown): boolean {
  return (
    !!v &&
    typeof v === "object" &&
    !Array.isArray(v) &&
    "value" in (v as object) &&
    ("evidence" in (v as object) || "missing_reason" in (v as object))
  );
}

// Walk the extraction tree and collect { value, evidence } field nodes.
function walkFields(
  obj: unknown,
  out: ExtractedField[] = [],
  depth = 0,
): ExtractedField[] {
  if (!obj || typeof obj !== "object" || depth > 5) return out;
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (isFieldNode(v)) {
      const node = v as Record<string, unknown>;
      out.push({
        label: humanize(k),
        value: node.value,
        evidence: node.evidence as RunEvidence[] | undefined,
        missing_reason: node.missing_reason as string | null | undefined,
      });
    } else if (v && typeof v === "object" && !Array.isArray(v)) {
      walkFields(v, out, depth + 1);
    }
  }
  return out;
}

// --- subcomponents -----------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const cls = /(success|complete|done)/.test(s)
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
    : /(fail|error)/.test(s)
      ? "bg-destructive/10 text-destructive"
      : "bg-muted text-muted-foreground";
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}

function QualityStrip({ validation }: { validation: Record<string, any> }) {
  const passes = Object.entries(validation);
  if (passes.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {passes.map(([name, p]) => (
        <div
          key={name}
          className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs"
        >
          {p?.valid ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          ) : (
            <AlertCircle className="h-3.5 w-3.5 text-destructive" />
          )}
          <span className="font-medium text-foreground">{humanize(name)}</span>
          <span className="text-muted-foreground">
            anchored {pct(p?.anchor_rate)}% ({p?.anchored_quotes ?? 0}/
            {p?.total_quotes ?? 0})
            {Array.isArray(p?.violations) && p.violations.length > 0
              ? ` · ${p.violations.length} violation${p.violations.length > 1 ? "s" : ""}`
              : ""}
          </span>
        </div>
      ))}
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
        <div className="flex flex-wrap gap-1.5">
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
            {o?.name || o?.area || o?.item_label || o?.label || JSON.stringify(o).slice(0, 90)}
          </li>
        ))}
      </ul>
    );
  }
  if (typeof value === "object") {
    return (
      <span className="text-sm text-foreground">
        {(value as any).name || JSON.stringify(value).slice(0, 140)}
      </span>
    );
  }
  return <span className="text-sm text-foreground">{String(value)}</span>;
}

function FieldEvidence({ evidence }: { evidence?: RunEvidence[] }) {
  const [open, setOpen] = useState(false);
  if (!evidence || evidence.length === 0) return null;
  return (
    <div className="mt-1">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
        {evidence.length} evidence quote{evidence.length > 1 ? "s" : ""}
      </button>
      {open && (
        <div className="mt-1.5 space-y-1.5">
          {evidence.map((e, i) => (
            <div key={i} className="flex gap-2 rounded-md bg-muted/50 p-2">
              <Quote className="h-3 w-3 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-xs italic text-muted-foreground">{e.quote}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground/70">
                  {e.speaker}
                  {e.confidence != null ? ` · conf ${e.confidence}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- main --------------------------------------------------------------------

export function RunOutput({ runId }: { runId: string }) {
  const [run, setRun] = useState<PRRunDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setRun(null);
    (async () => {
      try {
        const res = await fetch(`/api/runs/${runId}`);
        const json = (await res.json()) as PRRunDetail & { error?: string };
        if (cancelled) return;
        if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
        setRun(json);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to load run");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [runId]);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center gap-3 py-6 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Loading run output…
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

  const outputs = run.outputs || {};
  const validation = outputs.validation as Record<string, any> | undefined;
  const prompts = Object.entries(outputs).filter(([k]) => k.startsWith("prompt_"));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2 text-base">
          Run output
          <span className="font-mono text-xs font-normal text-muted-foreground">
            {run.run_id.slice(0, 8)}
          </span>
          <StatusBadge status={run.status} />
          {run.model_name && (
            <Badge variant="secondary" className="ml-auto gap-1">
              <Cpu className="h-3 w-3" />
              {run.model_provider} · {run.model_name}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Real extraction · temp {run.temperature ?? "—"} ·{" "}
          {formatDate(run.created_at)}
          {run.prompt_versions
            ? ` · ${Object.entries(run.prompt_versions)
                .map(([k, v]) => `${k.replace("prompt_", "p")}@${v}`)
                .join(", ")}`
            : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {validation && <QualityStrip validation={validation} />}

        {prompts.map(([key, val]: [string, any]) => {
          const fields = walkFields(val?.parsed_json);
          if (fields.length === 0) return null;
          return (
            <div key={key} className="space-y-3">
              <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {humanize(key)} — {fields.length} fields
              </h4>
              <div className="space-y-3">
                {fields.map((f, i) => (
                  <div key={i} className="border-l-2 border-border pl-3">
                    <p className="text-xs font-medium text-muted-foreground">
                      {f.label}
                    </p>
                    <FieldValue value={f.value} missingReason={f.missing_reason} />
                    <FieldEvidence evidence={f.evidence} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Raw output for full transparency */}
        <div>
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showRaw ? "rotate-180" : ""}`}
            />
            {showRaw ? "Hide raw output" : "View raw output (JSON)"}
          </button>
          {showRaw && (
            <pre className="mt-2 max-h-96 overflow-auto rounded-lg border border-border bg-muted/40 p-3 text-xs leading-relaxed text-foreground">
              {JSON.stringify(run.outputs, null, 2)}
            </pre>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
