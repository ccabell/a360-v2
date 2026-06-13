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
import { TranscriptViewer } from "./transcript-viewer";
import { ExtractionCard } from "./extraction-card";
import { AgentOutputsPanel } from "./agent-outputs-panel";
import { formatDate, age, formatDuration } from "@/lib/format";
import {
  ArrowLeft,
  FileText,
  AlertCircle,
  Brain,
  User,
} from "lucide-react";

// Shape returned by GET /api/patients/[id] (ops store, mapped)
interface PatientResponse {
  id: string;
  first_name: string;
  last_name: string;
  dob: string | null;
  birth_date: string | null;
  biological_sex: string | null;
  email: string | null;
  phone: string | null;
  photo_url: string | null;
  patient_summary: string | null;
  medical_history: string | null;
  practice_id: string;
  last_consultation_at: string | null;
  created_at: string;
  transcripts: {
    id: string;
    consultation_id: string;
    consult_number: number;
    transcript_date: string;
    duration_minutes: number;
    transcript_summary: string;
    consult_type: string;
    transcript_raw: string | null;
    extraction: {
      id: string;
      model: string | null;
      status: string | null;
      outputs: Record<string, unknown>;
      is_verified: boolean;
      created_at: string;
    } | null;
  }[];
  intelligence: {
    patient_id: string;
    latest_extraction: Record<string, unknown> | null;
    opportunities: Record<string, unknown>[] | null;
    agent_outputs: Record<string, unknown>[] | null;
  } | null;
  error?: string;
}

export function PatientWorkspace({ patientId }: { patientId: string }) {
  const [patient, setPatient] = useState<PatientResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(`/api/patients/${patientId}`);
        const json = (await res.json()) as PatientResponse;
        if (cancelled) return;
        if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
        setPatient(json);
        // Auto-select if only one consultation
        if (json.transcripts?.length === 1) setSelectedIdx(0);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to load patient");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [patientId]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-12 text-sm text-muted-foreground">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Loading patient…
      </div>
    );
  }
  if (error || !patient) {
    return (
      <div className="space-y-4">
        <BackLink />
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error || "Patient not found"}
        </div>
      </div>
    );
  }

  const selected = selectedIdx !== null ? patient.transcripts?.[selectedIdx] : null;

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

      {/* Patient information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4" />
            Patient information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            <Field label="Full name" value={`${patient.first_name} ${patient.last_name}`} />
            <Field
              label="Date of birth"
              value={`${formatDate(patient.dob)}${age(patient.dob) ? ` (${age(patient.dob)})` : ""}`}
            />
            <Field label="Biological sex" value={patient.biological_sex ?? "Not recorded"} />
            <Field label="Email" value={patient.email ?? "Not recorded"} />
            <Field label="Phone" value={patient.phone ?? "Not recorded"} />
            <Field label="Last consultation" value={formatDate(patient.last_consultation_at)} />
            <Field
              label="Patient summary"
              value={patient.patient_summary ?? "Not recorded"}
              full
            />
            <Field
              label="Medical history"
              value={patient.medical_history ?? "Not recorded"}
              full
            />
          </dl>
        </CardContent>
      </Card>

      {/* Consultations */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Consultations ({patient.transcripts?.length ?? 0})
        </h3>
        {patient.transcripts?.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {patient.transcripts.map((t, idx) => {
              const active = selectedIdx === idx;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedIdx(idx)}
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
                    {formatDate(t.transcript_date)} ·{" "}
                    {formatDuration(t.duration_minutes)}
                    {t.extraction?.is_verified && (
                      <span className="ml-2 text-emerald-600">· Verified extraction</span>
                    )}
                  </p>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No consultations for this patient.
          </p>
        )}
      </section>

      {/* Selected consultation: transcript + extraction */}
      {selected && (
        <>
          <TranscriptViewer transcript={selected} />

          {selected.extraction && (
            <ExtractionCard extraction={selected.extraction} />
          )}
        </>
      )}

      {/* Intelligence rollup */}
      {patient.intelligence?.latest_extraction && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="h-4 w-4 text-primary" />
              Intelligence Rollup
            </CardTitle>
            <CardDescription>
              Aggregated from verified extractions and agent outputs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {patient.intelligence.opportunities &&
              patient.intelligence.opportunities.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Opportunities ({patient.intelligence.opportunities.length})
                  </p>
                  <div className="space-y-1.5">
                    {patient.intelligence.opportunities.map((opp, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
                      >
                        {(opp as Record<string, unknown>).tier ? (
                          <Badge variant="outline" className="text-xs">
                            {String((opp as Record<string, unknown>).tier)}
                          </Badge>
                        ) : null}
                        <span className="text-foreground">
                          {String(
                            (opp as Record<string, unknown>).description ??
                              (opp as Record<string, unknown>).product_ref ??
                              JSON.stringify(opp).slice(0, 80),
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      )}

      {/* Agent outputs */}
      <AgentOutputsPanel patientId={patientId} />
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
