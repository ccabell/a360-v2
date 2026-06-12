"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowLeft, Search, X, Check, Zap, AlertCircle } from "lucide-react";
import { DEMO_CATALOG, PROMPT_SETS, type CatalogItem } from "@/lib/extraction/catalog";
import type { PatientDetail } from "@/lib/types";

export function ExtractionSetup({ patientId }: { patientId: string }) {
  const router = useRouter();
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [promptSet, setPromptSet] = useState("3.3");
  const [variables, setVariables] = useState("");
  const [pass1Only, setPass1Only] = useState(false);
  const [pass2Only, setPass2Only] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const pr = await fetch(`/api/patients/${patientId}`);
        const pj = (await pr.json()) as PatientDetail & { error?: string };
        if (cancelled) return;
        if (!pr.ok || pj.error) throw new Error(pj.error || `HTTP ${pr.status}`);
        setPatient(pj);
        const tid = pj.transcripts?.[0]?.id;
        if (tid) {
          const tr = await fetch(`/api/transcripts/${tid}`);
          const tj = await tr.json();
          if (!cancelled && tr.ok) setRaw(tj.transcript_raw ?? "");
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load patient");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [patientId]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DEMO_CATALOG;
    return DEMO_CATALOG.filter(
      (c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q),
    );
  }, [search]);

  function toggle(name: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function run() {
    if (running) return;
    setRunning(true);
    // Stub: real runs go through Prompt Runner runExtraction. For now, return to
    // the workspace where completed runs render.
    setTimeout(() => {
      router.push(`/dashboard/patients/${patientId}`);
    }, 900);
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-12 text-sm text-muted-foreground">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Loading…
      </div>
    );
  }
  if (error || !patient) {
    return (
      <div className="flex items-center gap-2 py-4 text-sm text-destructive">
        <AlertCircle className="h-4 w-4" />
        {error || "Patient not found"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href={`/dashboard/patients/${patientId}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to patient
      </Link>

      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {patient.first_name} {patient.last_name}
        </h2>
        <p className="text-sm text-muted-foreground">New extraction run</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Config form */}
        <div className="space-y-5">
          {/* Catalog */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Products / Offer catalog</CardTitle>
              <CardDescription>
                Select what this practice offers. The extraction matches spoken treatments
                against this catalog.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {selected.size > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {[...selected].map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                    >
                      {n}
                      <button onClick={() => toggle(n)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products & services…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{selected.size} selected</span>
                <button
                  className="hover:text-foreground"
                  onClick={() =>
                    setSelected(
                      selected.size === DEMO_CATALOG.length
                        ? new Set()
                        : new Set(DEMO_CATALOG.map((c) => c.name)),
                    )
                  }
                >
                  {selected.size === DEMO_CATALOG.length ? "Clear all" : "Select all"}
                </button>
              </div>
              <div className="max-h-72 space-y-1 overflow-auto rounded-lg border border-border p-1">
                {filtered.map((c: CatalogItem) => {
                  const on = selected.has(c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => toggle(c.name)}
                      className={`flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                        on ? "bg-primary/5" : "hover:bg-muted"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          on ? "border-primary bg-primary text-primary-foreground" : "border-border"
                        }`}
                      >
                        {on && <Check className="h-3 w-3" />}
                      </span>
                      <span className="flex-1 text-foreground">{c.name}</span>
                      <Badge variant="secondary" className="shrink-0 text-[10px]">
                        {c.category}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Prompt set */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Extraction prompt set</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {PROMPT_SETS.map((ps) => (
                  <button
                    key={ps.id}
                    onClick={() => setPromptSet(ps.id)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                      promptSet === ps.id
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {ps.label}
                    {ps.active && (
                      <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Additional context (optional)</CardTitle>
              <CardDescription>
                Notes or corrections passed to the model as supplementary context. They do
                not override HITL-verified data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={variables}
                onChange={(e) => setVariables(e.target.value)}
                rows={4}
                placeholder="e.g. provider name, known history, visit-date correction…"
                className="w-full rounded-lg border border-border bg-transparent p-3 font-mono text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
              />
            </CardContent>
          </Card>

          {/* Run options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Run options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Toggle
                label="Run Pass 1 only (Context & Offerings)"
                on={pass1Only}
                onChange={() => {
                  setPass1Only((v) => !v);
                  if (!pass1Only) setPass2Only(false);
                }}
              />
              <Toggle
                label="Run Pass 2 only (reuse existing Pass 1)"
                on={pass2Only}
                onChange={() => {
                  setPass2Only((v) => !v);
                  if (!pass2Only) setPass1Only(false);
                }}
              />
            </CardContent>
          </Card>

          <div>
            <Button onClick={run} disabled={running} className="w-full" size="lg">
              <Zap className="h-4 w-4" />
              {running ? "Starting extraction…" : "Run extraction"}
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Estimated time: 30–90 seconds depending on transcript length.
            </p>
          </div>
        </div>

        {/* Transcript preview */}
        <div className="rounded-xl border border-border bg-card">
          <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Source transcript
            </span>
            <span className="text-[10px] text-muted-foreground">
              {raw.length.toLocaleString()} chars
            </span>
          </div>
          <div className="max-h-[40rem] overflow-auto whitespace-pre-wrap p-3 text-sm leading-relaxed text-foreground">
            {raw || "No transcript available."}
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-left text-sm transition-colors hover:border-primary/40"
    >
      <span className="text-foreground">{label}</span>
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all ${
            on ? "left-4" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
