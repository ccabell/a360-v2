"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronDown } from "lucide-react";
import { formatDate, formatDuration } from "@/lib/format";

interface TranscriptViewerProps {
  consult_number?: number;
  consult_type?: string;
  transcript_date?: string;
  duration_minutes?: number;
  transcript_summary?: string;
  transcript_raw?: string | null;
}

export function TranscriptViewer({ transcript }: { transcript: TranscriptViewerProps }) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2 text-base">
          <FileText className="h-4 w-4 text-primary" />
          Consult #{transcript.consult_number ?? 1}
          <Badge variant="secondary">{transcript.consult_type ?? "consultation"}</Badge>
          <span className="ml-auto text-xs font-normal text-muted-foreground">
            {formatDate(transcript.transcript_date)} ·{" "}
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
          {transcript.transcript_summary ? (
            <p className="text-sm leading-relaxed text-foreground">
              {transcript.transcript_summary}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No summary available.</p>
          )}
        </div>

        {/* Full transcript toggle */}
        {transcript.transcript_raw && (
          <div>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
              {open ? "Hide full transcript" : "View full transcript"}
            </button>

            {open && (
              <pre className="mt-3 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-4 font-sans text-sm leading-relaxed text-foreground">
                {transcript.transcript_raw}
              </pre>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
