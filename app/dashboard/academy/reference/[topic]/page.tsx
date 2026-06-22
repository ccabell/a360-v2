import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Play,
  Podcast,
  ArrowUpRight,
  Film,
  Layers,
} from "lucide-react";
import {
  getTopicEntry,
  getAllTopicEntries,
  getTopicVideos,
  getVideoSummary,
} from "@/lib/academy/server";
import { CATEGORY_STYLES } from "@/components/academy/icons";
import { TOPIC_BY_ID, MODULE_BY_ID } from "@/lib/academy/taxonomy";
import { youtubeThumb } from "@/lib/academy/youtube";
import type { TopicCitation } from "@/lib/academy/types";

export function generateStaticParams() {
  return getAllTopicEntries().map((e) => ({ topic: e.topic.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const t = TOPIC_BY_ID.get(topic);
  return { title: t ? `${t.title} · Reference` : "Topic · Reference" };
}

function fmt(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicId } = await params;
  const entry = getTopicEntry(topicId);
  const topic = TOPIC_BY_ID.get(topicId);
  if (!entry || !topic) notFound();

  const cat = CATEGORY_STYLES[topic.category];
  const module = MODULE_BY_ID.get(topic.module);
  const videos = getTopicVideos(topicId);

  // Group citations by video, preserving the top-ranked order.
  const byVideo = new Map<string, TopicCitation[]>();
  for (const c of entry.citations) {
    if (!byVideo.has(c.videoSlug)) byVideo.set(c.videoSlug, []);
    byVideo.get(c.videoSlug)!.push(c);
  }
  // Order videos by their best (first) citation score.
  const videoGroups = [...byVideo.entries()].sort((a, b) => {
    const sa = Math.max(...a[1].map((c) => c.score));
    const sb = Math.max(...b[1].map((c) => c.score));
    return sb - sa;
  });

  return (
    <div className="mx-auto max-w-5xl px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link href="/dashboard/academy" className="hover:text-foreground">
          Pearce Channel
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href="/dashboard/academy/reference"
          className="hover:text-foreground"
        >
          Reference
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{topic.title}</span>
      </nav>

      {/* Header */}
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${cat.bg} ${cat.text}`}
          >
            <span className={`h-2 w-2 rounded-full ${cat.dot}`} />
            {cat.label}
          </span>
          {module && (
            <Link
              href={`/dashboard/academy/module/${module.id}`}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              {module.title}
            </Link>
          )}
        </div>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
          {topic.title}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {topic.blurb}
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Film className="h-4 w-4 text-primary/70" />
            <strong className="text-foreground">{videos.length}</strong> videos
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-primary/70" />
            <strong className="text-foreground">{entry.citations.length}</strong>{" "}
            cited segments
          </span>
          {entry.podcast.length > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Podcast className="h-4 w-4 text-primary/70" />
              <strong className="text-foreground">{entry.podcast.length}</strong>{" "}
              podcast refs
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px]">
        {/* Citations */}
        <div className="min-w-0">
          <h2 className="font-heading text-lg font-bold text-foreground">
            What Dr Tim Pearce says
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every excerpt links to the exact second in the source lesson.
          </p>

          {videoGroups.length === 0 ? (
            <p className="mt-6 rounded-lg bg-muted/40 p-6 text-center text-sm text-muted-foreground">
              No cited segments for this topic yet.
            </p>
          ) : (
            <div className="mt-5 space-y-6">
              {videoGroups.map(([slug, cites]) => {
                const v = getVideoSummary(slug);
                return (
                  <div
                    key={slug}
                    className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
                  >
                    <Link
                      href={`/dashboard/academy/lesson/${slug}`}
                      className="flex items-center gap-3 border-b border-border px-3 py-3 transition-colors hover:bg-muted/40"
                    >
                      <span className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                        {youtubeThumb(v?.youtubeId, "mq") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={youtubeThumb(v?.youtubeId, "mq")!}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-5 w-5 fill-white/90 text-white/90 drop-shadow" />
                        </span>
                      </span>
                      <h3 className="line-clamp-2 flex-1 font-heading text-sm font-semibold text-foreground">
                        {cites[0].videoTitle}
                      </h3>
                      <span className="shrink-0 text-xs text-primary">
                        {cites.length} moment{cites.length > 1 ? "s" : ""}
                      </span>
                    </Link>
                    <div className="divide-y divide-border/60">
                      {cites.slice(0, 5).map((c, i) => (
                        <Link
                          key={i}
                          href={`/dashboard/academy/lesson/${slug}?t=${c.start}`}
                          className="group flex gap-3 px-4 py-3 transition-colors hover:bg-primary/[0.04]"
                        >
                          <span className="mt-0.5 inline-flex h-fit shrink-0 items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-xs font-semibold text-primary">
                            <Play className="h-3 w-3 fill-current" />
                            {fmt(c.start)}
                          </span>
                          <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground">
                            {c.text}
                          </p>
                        </Link>
                      ))}
                    </div>
                    {v && (
                      <Link
                        href={`/dashboard/academy/lesson/${slug}`}
                        className="flex items-center justify-center gap-1 border-t border-border bg-muted/30 py-2 text-xs font-medium text-primary hover:underline"
                      >
                        Open lesson
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Podcast corroboration */}
          {entry.podcast.length > 0 && (
            <section className="mt-10">
              <div className="flex items-center gap-2">
                <Podcast className="h-5 w-5 text-primary" />
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Corroboration from the podcast corpus
                </h2>
              </div>
              <div className="mt-4 space-y-3">
                {entry.podcast.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-card p-4 ring-1 ring-foreground/10"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="truncate font-medium text-foreground">
                        {p.showName ? `${p.showName} · ` : ""}
                        {p.episodeTitle}
                      </span>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto inline-flex shrink-0 items-center gap-0.5 text-primary hover:underline"
                        >
                          Listen <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{p.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: related topics + top videos */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-4 lg:self-start">
          {entry.related.length > 0 && (
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Related topics
              </h3>
              <div className="mt-3 flex flex-col gap-1.5">
                {entry.related.map((rid) => {
                  const rt = TOPIC_BY_ID.get(rid);
                  if (!rt) return null;
                  const rc = CATEGORY_STYLES[rt.category];
                  return (
                    <Link
                      key={rid}
                      href={`/dashboard/academy/reference/${rid}`}
                      className="group flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-card"
                    >
                      <span className={`h-2 w-2 rounded-full ${rc.dot}`} />
                      <span className="text-foreground group-hover:text-primary">
                        {rt.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Top lessons
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {videos.slice(0, 6).map((v) => {
                const thumb = youtubeThumb(v.youtubeId, "mq");
                return (
                  <Link
                    key={v.slug}
                    href={`/dashboard/academy/lesson/${v.slug}`}
                    className="group overflow-hidden rounded-lg bg-card ring-1 ring-foreground/10 transition-colors hover:ring-primary/40"
                  >
                    <span className="relative block aspect-video w-full overflow-hidden bg-muted">
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumb}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : null}
                      <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1 py-0.5 text-[10px] font-medium text-white">
                        {Math.round(v.duration / 60)} min
                      </span>
                    </span>
                    <p className="line-clamp-2 p-2.5 text-xs font-medium leading-snug text-foreground group-hover:text-primary">
                      {v.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
