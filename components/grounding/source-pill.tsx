import type { RetrievedSource } from "@/lib/types/retrieval";
import { locatorTitle } from "@/lib/retrieval/locator";
import { CORPUS_META } from "./source-meta";

interface SourcePillProps {
  source: RetrievedSource;
  number?: number; // display number once cited
  dimmed?: boolean; // retrieved but not cited
  onClick?: () => void;
}

export function SourcePill({ source, number, dimmed, onClick }: SourcePillProps) {
  const meta = CORPUS_META[source.corpus];
  const Icon = meta.Icon;

  return (
    <button
      type="button"
      onClick={onClick}
      title={locatorTitle(source.locator)}
      className={`group flex max-w-[14rem] items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 text-xs transition-colors hover:border-primary/50 ${
        dimmed ? "opacity-55" : ""
      }`}
    >
      <span className={`flex h-5 w-5 items-center justify-center rounded-full ${meta.chip}`}>
        <Icon className="h-3 w-3" />
      </span>
      {number != null && (
        <span className="font-semibold text-primary">[{number}]</span>
      )}
      <span className="truncate text-muted-foreground group-hover:text-foreground">
        {locatorTitle(source.locator)}
      </span>
    </button>
  );
}
