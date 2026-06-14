import { AskExperience } from "@/components/ask/ask-experience";
import { ASK_SUGGESTIONS } from "@/lib/config/ask-suggestions";

export default function DashboardAskPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">
          Knowledge Base Search
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Search across research, videos, and internal documentation
        </p>
      </div>

      {/* Ask engine — fills remaining space */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <AskExperience
          endpoint="/api/ask"
          variant="dashboard"
          suggestions={ASK_SUGGESTIONS}
          showSave
          showTierLegend
          placeholder="Search for treatments, evidence, procedures..."
        />
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border bg-muted/30 px-6 py-3">
        <p className="text-xs text-muted-foreground">
          A360 Evidence provides educational information for licensed aesthetic
          professionals. It is not medical advice and is not a substitute for
          clinical judgment or the FDA-approved product label.
        </p>
      </div>
    </div>
  );
}
