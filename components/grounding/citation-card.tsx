import { ExternalLink, Quote, ShieldCheck } from "lucide-react";
import type { ResearchCitation } from "@/lib/types/retrieval";
import {
  locatorUrl,
  locatorSubtitle,
  deepLinkLabel,
} from "@/lib/retrieval/locator";
import { CORPUS_META, TIER_RELIABLE } from "./source-meta";
import { YouTubeViewer } from "./youtube-viewer";

function RelevanceBars({ value }: { value?: number }) {
  if (value == null) return null;
  const filled = value >= 0.8 ? 3 : value >= 0.6 ? 2 : 1;
  return (
    <div className="flex items-center gap-1" title="Relevance">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-3 w-1 rounded-full ${
            i < filled ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

export function CitationCard({ citation }: { citation: ResearchCitation }) {
  const meta = CORPUS_META[citation.corpus];
  const Icon = meta.Icon;
  const url = locatorUrl(citation.locator);
  const subtitle = locatorSubtitle(citation.locator);

  return (
    <div
      id={`cite-${citation.number}`}
      className="scroll-mt-24 rounded-xl border border-border bg-card p-4"
    >
      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
          {citation.number}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${meta.chip}`}
        >
          <Icon className="h-3 w-3" />
          {meta.label}
        </span>
        {TIER_RELIABLE.has(citation.corpus) && (
          <span className="inline-flex items-center gap-1 rounded-full bg-tier-trusted-bg px-2 py-0.5 text-[0.65rem] font-semibold text-tier-trusted-fg">
            <ShieldCheck className="h-3 w-3" />
            Reliable
          </span>
        )}
        <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
          {meta.typeTag}
        </span>
        <div className="ml-auto">
          <RelevanceBars value={citation.relevance} />
        </div>
      </div>

      {/* YouTube: thumbnail viewer → embedded player at the cited timestamp */}
      {citation.locator.type === "youtube" && (
        <div className="mb-3">
          <YouTubeViewer
            videoId={citation.locator.videoId}
            title={citation.locator.videoTitle}
            startSeconds={citation.locator.startSeconds}
            thumbnailUrl={citation.locator.thumbnailUrl}
          />
        </div>
      )}

      {/* Title */}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground transition-colors hover:text-primary hover:underline"
        >
          {citation.title}
        </a>
      ) : (
        <p className="font-medium text-foreground">{citation.title}</p>
      )}

      {/* Provenance */}
      {subtitle && (
        <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
      )}

      {/* Evidence (verbatim chunk snippet) */}
      <div className="mt-3 flex gap-2 rounded-lg bg-muted/50 p-3">
        <Quote className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <p className="text-xs italic text-muted-foreground">{citation.evidence}</p>
      </div>

      {/* Deep link */}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          {deepLinkLabel(citation.locator)}
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}
