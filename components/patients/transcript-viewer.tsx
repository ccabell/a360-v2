"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronDown, AlertCircle } from "lucide-react";
import type { PRTranscript, PRTranscriptDetail } from "@/lib/types";
import { formatDate, formatDuration } from "@/lib/format";

export function TranscriptViewer({ transcript }: { transcript: PRTranscript }) {
  const [open, setOpen] = useState(false);
  const [raw, setRaw] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summary =
    transcript.transcript_summary_paragraph || transcript.transcript_summary;

  async function toggle() {
    const next = !open;
    setOpen(next);
    if (next && raw === null && !loading) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/transcripts/${transcript.id}`);
        const json = (await res.json()) as PRTranscriptDetail & { error?: string };
        if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
        setRaw(json.transcript_raw ?? "(No transcript text available.)");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load transcript");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2 text-base">
          <FileText className="h-4 w-4 text-primary" />
          Consult #{transcript.consult_number}
          <Badge variant="secondary">{transcript.consult_type}</Badge>
          <span className="ml-auto text-xs font-normal text-muted-foreground">
            {formatDate(transcript.transcript_date)} · {transcript.clinic} ·{" "}
            {formatDuration(transcript.duration_minutes)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Summary
          </p>
          {summary ? (
            <p className="text-sm leading-relaxed text-foreground">{summary}</p>
          ) : (
            <p className="text-sm text-muted-foreground">No summary available.</p>
          )}
        </div>

        {/* Full transcript toggle */}
        <div>
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
            {open ? "Hide full transcript" : "View full transcript"}
          </button>

          {open && (
            <div className="mt-3">
              {loading && (
                <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Loading transcript…
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
              {raw !== null && !loading && !error && (
                <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-4 font-sans text-sm leading-relaxed text-foreground">
                  {raw}
                </pre>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
