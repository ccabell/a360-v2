"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        An unexpected error occurred. If this keeps happening, contact the A360
        team.
      </p>
      {error.digest && (
        <p className="font-mono text-xs text-muted-foreground/60">
          Error ID: {error.digest}
        </p>
      )}
      <Button variant="outline" onClick={reset} className="mt-2 gap-2">
        <RotateCcw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}
