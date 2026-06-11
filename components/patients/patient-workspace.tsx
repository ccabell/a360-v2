"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { GroundedAnswer } from "@/components/grounding/grounded-answer";
import { TranscriptViewer } from "./transcript-viewer";
import { pickScenario, type ResearchScenario } from "@/lib/mock/research-data";
import { formatDate, age, formatDuration } from "@/lib/format";
import type { PatientDetail, PRTranscript, PRRun, Paged } from "@/lib/types";
import { ArrowLeft, FileText, Zap, AlertCircle, History } from "lucide-react";

function statusChip(status: string): string {
  const s = status.toLowerCase();
  if (/(complete|success|done)/.test(s))
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
  if (/(fail|error)/.test(s))
    return "bg-destructive/10 text-destructive";
  if (/(run|pending|queue|progress)/.test(s))
    return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
  return "bg-muted text-muted-foreground";
}

export function PatientWorkspace({ patientId }: { patientId: string }) {
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [errorPatient, setErrorPatient] = useState<string | null>(null);

  const [selected, setSelected] = useState<PRTranscript | null>(null);

  const [runs, setRuns] = useState<PRRun[]>([]);
  const [loadingRuns, setLoadingRuns] = useState(false);
  const [errorRuns, setErrorRuns] = useState<string | null>(null);

  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState(
    "Extract the primary treatment opportunity and supporting evidence.",
  );
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<ResearchScenario | null>(null);
  const [outputLabel, setOutputLabel] = useState("");

  // Load patient (with nested transcripts)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingPatient(true);
      setErrorPatient(null);
      try {
        const res = await fetch(`/api/patients/${patientId}`);
        const json = (await res.json()) as PatientDetail & { error?: string };
        if (cancelled) return;
        if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
        setPatient(json);
        if (json.transcripts?.length === 1) setSelected(json.transcripts[0]);
      } catch (e) {
        if (!cancelled)
          setErrorPatient(e instanceof Error ? e.message : "Failed to load patient");
      } finally {
        if (!cancelled) setLoadingPatient(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [patientId]);

  // Load runs when the selected transcript changes
  useEffect(() => {
    setSelectedRunId(null);
    setOutput(null);
    if (!selected) {
      setRuns([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoadingRuns(true);
      setErrorRuns(null);
      try {
        const res = await fetch(`/api/runs?transcriptId=${selected.id}`);
        const json = (await res.json()) as Paged<PRRun> & { error?: string };
        if (cancelled) return;
        if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
        setRuns(json.data ?? []);
      } catch (e) {
        if (!cancelled)
          setErrorRuns(e instanceof Error ? e.message : "Failed to load runs");
      } finally {
        if (!cancelled) setLoadingRuns(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selected]);

  function viewRun(run: PRRun) {
    const rid = run.run_id || run.id;
    setSelectedRunId(rid);
    setRunning(false);
    // Grounded output is mocked until the retrieval/citation service is live.
    setOutput(pickScenario("run output"));
    setOutputLabel(`Run ${rid.slice(0, 8)} · ${run.status}`);
  }

  function runPrompt() {
    if (!prompt.trim() || running || !selected) return;
    setSelectedRunId(null);
    setRunning(true);
    setOutput(null);
    setTimeout(() => {
      setOutput(pickScenario(prompt));
      setOutputLabel("New prompt run");
      setRunning(false);
    }, 900);
  }

  // --- Patient header states ---
  if (loadingPatient) {
    return (
      <div className="flex items-center gap-3 py-12 text-sm text-muted-foreground">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Loading patient…
      </div>
    );
  }
  if (errorPatient || !patient) {
    return (
      <div className="space-y-4">
        <BackLink />
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errorPatient || "Patient not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BackLink />

      {/* Patient header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
          {(patient.first_name?.[0] ?? "") + (patient.last_name?.[0] ?? "")}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {patient.first_name} {patient.last_name}
          </h2>
          <p className="text-sm text-muted-foreground">
            Patient · <span className="font-mono text-xs">{patient.id.slice(0, 8)}</span>
          </p>
        </div>
      </div>

      {/* Patient information (full record) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Patient information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            <Field label="Full name" value={`${patient.first_name} ${patient.last_name}`} />
            <Field
              label="Date of birth"
              value={`${formatDate(patient.dob)}${age(patient.dob) ? ` (${age(patient.dob)})` : ""}`}
            />
            <Field label="Prior visits" value={patient.prior_visits ?? "Not recorded"} />
            <Field label="Practice" value={patient.practice_id ?? "Not recorded"} />
            <Field label="Patient ID" value={patient.id} mono />
            <Field label="Added" value={formatDate(patient.created_at)} />
            <Field
              label="Medical history"
              value={patient.medical_history ?? "Not recorded"}
              full
            />
          </dl>
        </CardContent>
      </Card>

      {/* Transcripts */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Transcripts ({patient.transcripts?.length ?? 0})
        </h3>
        {patient.transcripts?.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {patient.transcripts.map((t) => {
              const active = selected?.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">
                      Consult #{t.consult_number}
                    </span>
                    <Badge variant="secondary" className="ml-auto">
                      {t.consult_type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(t.transcript_date)} · {t.clinic} ·{" "}
                    {formatDuration(t.duration_minutes)}
                  </p>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No transcripts for this patient.
          </p>
        )}
      </section>

      {/* Selected transcript: summary + full transcript */}
      {selected && <TranscriptViewer transcript={selected} />}

      {/* Runs + Run-a-prompt (only once a transcript is selected) */}
      {selected && (
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Existing runs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <History className="h-4 w-4" />
                Existing runs
                {!loadingRuns && (
                  <Badge variant="secondary" className="ml-auto">
                    {runs.length}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Select a run to view its output, or run a new prompt →
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {errorRuns && (
                <p className="py-2 text-sm text-destructive">{errorRuns}</p>
              )}
              {loadingRuns && (
                <div className="flex items-center gap-2 py-3 text-sm text-muted-foreground">
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Loading runs…
                </div>
              )}
              {!loadingRuns && !errorRuns && runs.length === 0 && (
                <p className="py-3 text-sm text-muted-foreground">
                  No runs yet for this transcript.
                </p>
              )}
              {!loadingRuns &&
                runs.map((r) => {
                  const rid = r.run_id || r.id;
                  const active = selectedRunId === rid;
                  return (
                    <button
                      key={r.id}
                      onClick={() => viewRun(r)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                        active ? "bg-primary/5" : "hover:bg-muted"
                      }`}
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        {rid.slice(0, 8)}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusChip(
                          r.status,
                        )}`}
                      >
                        {r.status}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {formatDate(r.created_at)}
                      </span>
                    </button>
                  );
                })}
            </CardContent>
          </Card>

          {/* Run a new prompt */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Run a prompt</CardTitle>
              <CardDescription>
                Against consult #{selected.consult_number} ({selected.consult_type})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
                placeholder="Enter a prompt to run against this transcript…"
              />
              <div className="flex justify-end">
                <Button onClick={runPrompt} disabled={running || !prompt.trim()}>
                  <Zap className="h-4 w-4" />
                  {running ? "Running…" : "Run prompt"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading output */}
      {running && (
        <Card>
          <CardContent className="flex items-center gap-3 py-6">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">
              Running prompt against transcript…
            </span>
          </CardContent>
        </Card>
      )}

      {/* Grounded prompt output — same renderer as chat */}
      {output && (
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
              Prompt Output
              <span className="text-xs font-normal text-muted-foreground">
                {outputLabel}
              </span>
              <Badge variant="secondary" className="ml-auto">
                Demo output
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GroundedAnswer text={output.answer} sources={output.sources} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/dashboard/patients"
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" />
      All patients
    </Link>
  );
}

function Field({
  label,
  value,
  mono,
  full,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  full?: boolean;
}) {
  const isPlaceholder = value === "Not recorded";
  return (
    <div className={full ? "col-span-2 sm:col-span-3" : ""}>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd
        className={`mt-0.5 text-sm ${mono ? "font-mono text-xs" : ""} ${
          isPlaceholder ? "text-muted-foreground/60 italic" : "text-foreground"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
