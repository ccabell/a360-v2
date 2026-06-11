import type { SourceLocator } from "@/lib/types/retrieval";

/** Verbatim display title for a source locator. */
export function locatorTitle(l: SourceLocator): string {
  switch (l.type) {
    case "pubmed":
      return l.title;
    case "youtube":
      return l.videoTitle;
    case "podcast":
      return l.episodeTitle;
    case "industry":
      return l.articleTitle;
    case "document":
      return l.title;
  }
}

/** Click target with deep-link applied (&t= for video, #page= for PDF). */
export function locatorUrl(l: SourceLocator): string | undefined {
  switch (l.type) {
    case "pubmed":
    case "youtube":
    case "podcast":
    case "industry":
      return l.url;
    case "document":
      return l.pageNumber ? `${l.url}#page=${l.pageNumber}` : l.url;
  }
}

/** mm:ss for a second offset. */
export function formatTimestamp(sec?: number): string {
  if (sec == null) return "";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Corpus-appropriate label for the deep-link button. */
export function deepLinkLabel(l: SourceLocator): string {
  switch (l.type) {
    case "pubmed":
      return "View on PubMed";
    case "youtube":
      return l.startSeconds != null
        ? `Watch at ${formatTimestamp(l.startSeconds)}`
        : "Watch video";
    case "podcast":
      return l.startSeconds != null
        ? `Listen at ${formatTimestamp(l.startSeconds)}`
        : "Open episode";
    case "industry":
      return "Read article";
    case "document": {
      const base =
        l.corpus === "fda"
          ? "Open FDA label"
          : l.corpus === "manufacturer"
            ? "Open manufacturer doc"
            : "Open practice doc";
      return l.pageNumber ? `${base} · p.${l.pageNumber}` : base;
    }
  }
}

/** Secondary provenance line (authors/journal, show/host, publication, filename). */
export function locatorSubtitle(l: SourceLocator): string {
  switch (l.type) {
    case "pubmed":
      return [l.authors, l.journal, l.pubDate?.slice(0, 4)]
        .filter(Boolean)
        .join(" · ");
    case "youtube":
      return [l.manufacturerName, l.contentType?.replace(/_/g, " ")]
        .filter(Boolean)
        .join(" · ");
    case "podcast":
      return [l.showName, l.host && `hosted by ${l.host}`, l.publishedDate]
        .filter(Boolean)
        .join(" · ");
    case "industry":
      return [l.publication, l.publishedDate].filter(Boolean).join(" · ");
    case "document":
      return [l.filename, l.section].filter(Boolean).join(" · ");
  }
}
