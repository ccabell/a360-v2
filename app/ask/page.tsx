import { Sparkles } from "lucide-react";
import { AskExperience } from "@/components/ask/ask-experience";
import { ASK_SUGGESTIONS } from "@/lib/config/ask-suggestions";

export default async function AskPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Wordmark */}
      <div className="flex items-center justify-center pt-8 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            A360 Evidence
          </span>
        </div>
      </div>

      {/* Hero (only rendered when no query — collapses once AskExperience takes over) */}
      {!query && (
        <div className="mx-auto w-full max-w-2xl px-6 pb-4 pt-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ask anything about aesthetic medicine.
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Grounded answers from the A360 Global Library. Every claim cited.
            Free.
          </p>
        </div>
      )}

      {/* Ask engine — fills remaining space */}
      <div className="flex flex-1 flex-col">
        <AskExperience
          endpoint="/api/ask"
          variant="public"
          initialQuery={query}
          autoSubmitInitial={Boolean(query)}
          suggestions={ASK_SUGGESTIONS}
          showTierLegend
          placeholder="e.g. Can Botox and filler be done the same day?"
        />
      </div>

      {/* Persistent disclaimer */}
      <div className="border-t border-border bg-background px-6 py-4 text-center">
        <p className="mx-auto max-w-2xl text-xs text-muted-foreground">
          A360 Evidence provides educational information for licensed aesthetic
          professionals. It is not medical advice and is not a substitute for
          clinical judgment or the FDA-approved product label.
        </p>
      </div>
    </div>
  );
}
