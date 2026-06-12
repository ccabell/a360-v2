"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Paged, Patient } from "@/lib/types";
import { formatDate, age } from "@/lib/format";
import { Search, AlertCircle, ChevronRight, Zap, FileText, X } from "lucide-react";

type EnrichedPatient = Patient & {
  transcript_count?: number;
  visit_description?: string | null;
  consult_type?: string | null;
  first_transcript_id?: string | null;
};

function initials(p: Patient): string {
  return `${p.first_name?.[0] ?? ""}${p.last_name?.[0] ?? ""}`.toUpperCase() || "?";
}

export function PatientsTable() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState<EnrichedPatient[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewing, setViewing] = useState<EnrichedPatient | null>(null);

  useEffect(() => {
    let cancelled = false;
    const handle = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ limit: "100", enrich: "1" });
        if (query.trim()) params.set("q", query.trim());
        const res = await fetch(`/api/patients?${params.toString()}`);
        const json = (await res.json()) as Paged<EnrichedPatient> & { error?: string };
        if (cancelled) return;
        if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
        setPatients(json.data ?? []);
        setTotal(json.total ?? json.data?.length ?? 0);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load patients");
        setPatients([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, query ? 300 : 0);

    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [query]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <span className="shrink-0 text-sm text-muted-foreground">
          {loading ? "Loading…" : `${patients.length} of ${total} patients`}
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 py-8 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Loading patients…
        </div>
      )}

      {/* Rows */}
      {!loading && !error && (
        <div className="space-y-2">
          {patients.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No patients found{query ? ` for “${query}”` : ""}.
            </p>
          )}

          {patients.map((p) => (
            <div
              key={p.id}
              onClick={() => router.push(`/dashboard/patients/${p.id}`)}
              className="flex cursor-pointer items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              {/* Identity */}
              <div className="flex w-56 shrink-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  {initials(p)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {p.first_name} {p.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    DOB {formatDate(p.dob)}
                    {age(p.dob) && ` · ${age(p.dob)}`}
                  </p>
                </div>
              </div>

              {/* Visit description */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-muted-foreground">
                  {p.visit_description || (
                    <span className="italic text-muted-foreground/60">No description available</span>
                  )}
                </p>
                {p.consult_type && (
                  <div className="mt-1">
                    <Badge variant="secondary" className="text-[10px]">
                      {p.consult_type}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Count */}
              <div className="w-20 shrink-0 text-center">
                <p className="text-2xl font-bold tabular-nums text-primary">
                  {p.transcript_count ?? 0}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  {(p.transcript_count ?? 0) === 1 ? "Transcript" : "Transcripts"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 flex-col gap-1.5" onClick={(e) => e.stopPropagation()}>
                <Link
                  href={`/dashboard/patients/${p.id}/extract`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Start extraction
                </Link>
                <button
                  disabled={!p.first_transcript_id}
                  onClick={() => setViewing(p)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 disabled:opacity-50"
                >
                  <FileText className="h-3.5 w-3.5" />
                  View transcript
                </button>
              </div>

              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          ))}
        </div>
      )}

      {viewing?.first_transcript_id && (
        <TranscriptSlideOut
          transcriptId={viewing.first_transcript_id}
          patientId={viewing.id}
          name={`${viewing.first_name} ${viewing.last_name}`}
          onClose={() => setViewing(null)}
        />
      )}
    </div>
  );
}

function TranscriptSlideOut({
  transcriptId,
  patientId,
  name,
  onClose,
}: {
  transcriptId: string;
  patientId: string;
  name: string;
  onClose: () => void;
}) {
  const [raw, setRaw] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/transcripts/${transcriptId}`);
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
        setRaw(json.transcript_raw ?? "");
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load transcript");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [transcriptId]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-xl flex-col border-l border-border bg-background shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div>
            <p className="text-sm font-semibold text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">Source transcript</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-auto whitespace-pre-wrap p-5 text-sm leading-relaxed text-foreground">
          {error ? (
            <span className="text-destructive">{error}</span>
          ) : raw === null ? (
            <span className="text-muted-foreground">Loading transcript…</span>
          ) : (
            raw
          )}
        </div>
        <div className="border-t border-border p-4">
          <Link
            href={`/dashboard/patients/${patientId}/extract`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Zap className="h-4 w-4" />
            Start extraction
          </Link>
        </div>
      </div>
    </div>
  );
}
