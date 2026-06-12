"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, AlertCircle, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/format";

interface SavedOutput {
  id: string;
  output_type: string;
  title: string | null;
  question: string | null;
  answer_prose: string | null;
  citations: unknown[] | null;
  created_at: string;
}

export function SavedOutputsList() {
  const [items, setItems] = useState<SavedOutput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/saved-outputs");
        const json = (await res.json()) as { data?: SavedOutput[]; error?: string };
        if (cancelled) return;
        if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
        setItems(json.data ?? []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load history");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center gap-3 py-6 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Loading history…
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center gap-2 py-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </CardContent>
      </Card>
    );
  }
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No saved outputs yet. Save a research answer to see it here.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((it) => {
        const open = openId === it.id;
        const citeCount = Array.isArray(it.citations) ? it.citations.length : 0;
        return (
          <Card key={it.id}>
            <CardContent className="p-4">
              <button
                onClick={() => setOpenId(open ? null : it.id)}
                className="flex w-full items-center gap-3 text-left"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {it.title || it.question || "Saved output"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(it.created_at)} · {citeCount} citation
                    {citeCount === 1 ? "" : "s"}
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {it.output_type.replace(/_/g, " ")}
                </Badge>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <div className="mt-3 space-y-2 border-t border-border pt-3">
                  {it.question && (
                    <p className="text-xs font-medium text-muted-foreground">
                      Q: {it.question}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {it.answer_prose}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
