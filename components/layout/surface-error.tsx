"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Shared per-surface error boundary body. Keeps a failure scoped to one
 * dashboard surface (the sidebar and the rest of the app stay usable) and
 * names the surface so the user knows what broke.
 */
export function SurfaceError({
  surface,
  error,
  reset,
}: {
  surface: string;
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the digest only — never expose PHI
    console.error(`[${surface} error boundary]`, error.digest ?? error.message);
  }, [surface, error]);

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          {surface} hit an error
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Something went wrong rendering this page. The rest of the app is
          unaffected — try again or switch tabs.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs font-mono text-muted-foreground/60">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-6 flex items-center justify-center">
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="mr-1.5 h-4 w-4" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
