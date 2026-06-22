import Link from "next/link";
import { Layers, ChevronRight, FileText, Podcast } from "lucide-react";
import {
  getModules,
  getAllTopicEntries,
  getTopicVideos,
} from "@/lib/academy/server";
import { CATEGORY_STYLES, moduleIcon } from "@/components/academy/icons";
import { TOPIC_BY_ID } from "@/lib/academy/taxonomy";

export const metadata = { title: "Reference Guide · Academy" };

export default function ReferenceIndex() {
  const modules = getModules();
  const entries = getAllTopicEntries();
  const entryById = new Map(entries.map((e) => [e.topic.id, e]));

  const totalCitations = entries.reduce((a, e) => a + e.citations.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link href="/dashboard/academy" className="hover:text-foreground">
          Academy
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Reference Guide</span>
      </nav>

      {/* Header */}
      <div className="mt-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
          <Layers className="h-4 w-4" />
          Clinical Reference
        </div>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
          The Reference Guide
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A searchable clinical encyclopedia. Each topic aggregates every
          relevant moment from Dr Tim Pearce&rsquo;s videos — cited to the
          second — plus corroboration from the wider aesthetics podcast corpus.
        </p>
        <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-primary/70" />
            <strong className="text-foreground">{entries.length}</strong> topics
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-primary/70" />
            <strong className="text-foreground">
              {totalCitations.toLocaleString()}
            </strong>{" "}
            cited segments
          </span>
        </div>
      </div>

      {/* Topics grouped by module */}
      <div className="mt-8 space-y-10">
        {modules.map((m) => {
          const Icon = moduleIcon(m.icon);
          return (
            <section key={m.id}>
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    CATEGORY_STYLES[
                      TOPIC_BY_ID.get(m.topics[0] ?? "")?.category ?? "technique"
                    ].bg
                  } ${
                    CATEGORY_STYLES[
                      TOPIC_BY_ID.get(m.topics[0] ?? "")?.category ?? "technique"
                    ].text
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  {m.title}
                </h2>
                <Link
                  href={`/dashboard/academy/module/${m.id}`}
                  className="text-xs text-primary hover:underline"
                >
                  view module
                </Link>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {m.topics.map((tid) => {
                  const topic = TOPIC_BY_ID.get(tid);
                  if (!topic) return null;
                  const entry = entryById.get(tid);
                  const cat = CATEGORY_STYLES[topic.category];
                  const videoCount = getTopicVideos(tid).length;
                  return (
                    <Link
                      key={tid}
                      href={`/dashboard/academy/reference/${tid}`}
                      className="group flex flex-col gap-2 rounded-xl bg-card p-4 ring-1 ring-foreground/10 transition-all hover:ring-primary/40 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${cat.dot}`} />
                        <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary">
                          {topic.title}
                        </h3>
                      </div>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {topic.blurb}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {entry?.citations.length ?? 0} segments
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Layers className="h-3 w-3" />
                          {videoCount} videos
                        </span>
                        {(entry?.podcast.length ?? 0) > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Podcast className="h-3 w-3" />
                            {entry!.podcast.length}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
