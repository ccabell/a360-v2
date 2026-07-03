import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/apps/app-shell";
import { AskExperience } from "@/components/ask/ask-experience";
import { ASK_SUGGESTIONS } from "@/lib/config/ask-suggestions";

export const metadata = {
  title: "A360 Evidence — Ask",
  description:
    "Grounded answers from the A360 Global Library. Every claim cited. Free.",
};

export default async function StandaloneAskPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  return (
    <AppShell
      name="A360 Evidence"
      icon={Sparkles}
      theme="ask"
      badge="Clinical Q&A"
      footer="A360 Evidence provides educational information for licensed aesthetic professionals. It is not medical advice and is not a substitute for clinical judgment or the FDA-approved product label."
    >
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

      <AskExperience
        endpoint="/api/ask"
        variant="public"
        initialQuery={query}
        autoSubmitInitial={Boolean(query)}
        suggestions={ASK_SUGGESTIONS}
        showTierLegend
        placeholder="e.g. Can Botox and filler be done the same day?"
      />
    </AppShell>
  );
}
