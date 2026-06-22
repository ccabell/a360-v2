import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Layers,
  Tag,
  Podcast,
  ArrowUpRight,
} from "lucide-react";
import {
  getVideo,
  getVideos,
  getModule,
  getTopicEntry,
} from "@/lib/academy/server";
import { LessonPlayer } from "@/components/academy/lesson-player";
import { LessonCard } from "@/components/academy/lesson-card";
import { CATEGORY_STYLES, moduleIcon } from "@/components/academy/icons";
import { TOPIC_BY_ID } from "@/lib/academy/taxonomy";
import type { PodcastCitation } from "@/lib/academy/types";

export function generateStaticParams() {
  // Pre-render the substantial lessons; others render on demand.
  return getVideos()
    .filter((v) => v.isLesson)
    .map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = getVideo(slug);
  return { title: v ? `${v.title} · Academy` : "Lesson · Academy" };
}

function fmtDur(sec: number): string {
  const m = Math.round(sec / 60);
  if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m`;
  return `${m} min`;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();

  const module = getModule(video.primaryModule);
  const ModuleIcon = module ? moduleIcon(module.icon) : Tag;
  const primaryCat =
    CATEGORY_STYLES[
      TOPIC_BY_ID.get(video.topics[0] ?? "")?.category ?? "technique"
    ];

  const related = video.related
    .map((s) => getVideos().find((v) => v.slug === s))
    .filter((v): v is NonNullable<typeof v> => Boolean(v))
    .slice(0, 3);

  // Aggregate podcast corroboration across this lesson's topics (deduped).
  const podcast: (PodcastCitation & { topicTitle: string })[] = [];
  const seen = new Set<string>();
  for (const tid of video.topics) {
    const entry = getTopicEntry(tid);
    if (!entry) continue;
    for (const p of entry.podcast) {
      const key = p.episodeTitle + "|" + p.text.slice(0, 30);
      if (seen.has(key)) continue;
      seen.add(key);
      podcast.push({ ...p, topicTitle: entry.topic.title });
      if (podcast.length >= 5) break;
    }
    if (podcast.length >= 5) break;
  }

  return (
    <div className="mx-auto max-w-6xl px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link href="/dashboard/academy" className="hover:text-foreground">
          Academy
        </Link>
        <ChevronRight className="h-3 w-3" />
        {module && (
          <>
            <Link
              href={`/dashboard/academy/module/${module.id}`}
              className="hover:text-foreground"
            >
              {module.title}
            </Link>
            <ChevronRight className="h-3 w-3" />
          </>
        )}
        <span className="truncate text-foreground">{video.title}</span>
      </nav>

      {/* Title block */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {module && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${primaryCat.bg} ${primaryCat.text}`}
              >
                <ModuleIcon className="h-3.5 w-3.5" />
                {module.title}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {fmtDur(video.duration)}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Layers className="h-3.5 w-3.5" />
              {video.segmentCount} segments
            </span>
          </div>
          <h1 className="mt-2 max-w-3xl font-heading text-2xl font-bold leading-tight text-foreground">
            {video.title}
          </h1>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {video.topics.map((t) => {
              const topic = TOPIC_BY_ID.get(t);
              if (!topic) return null;
              return (
                <Link
                  key={t}
                  href={`/dashboard/academy/reference/${t}`}
                  className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary"
                >
                  <Tag className="h-3 w-3" />
                  {topic.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Attribution note */}
      <p className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
        Internal educational reference. Content is drawn verbatim from Dr Tim
        Pearce&rsquo;s teaching — every line below is timestamped to the source
        segment it came from. Not original medical guidance.
      </p>

      {/* Player + transcript + rail */}
      <div className="mt-6">
        <LessonPlayer
          title={video.title}
          youtubeId={video.youtubeId}
          segments={video.segments}
          chapters={video.chapters}
          keyPoints={video.keyPoints}
          duration={video.duration}
        />
      </div>

      {/* Key takeaways (cited) */}
      {video.keyPoints.length > 0 && (
        <section className="mt-10">
          <h2 className="font-heading text-lg font-bold text-foreground">
            Key takeaways
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pulled from the highest-signal moments — each links to the exact
            second.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {video.keyPoints.map((kp, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
                  {Math.floor(kp.start / 60)}:
                  {String(kp.start % 60).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-foreground">
                  {kp.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Podcast corroboration */}
      {podcast.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center gap-2">
            <Podcast className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-bold text-foreground">
              From the wider podcast corpus
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            How other aesthetics experts discuss the same topics — drawn from
            8,688 podcast episodes.
          </p>
          <div className="mt-4 space-y-3">
            {podcast.map((p, i) => (
              <div
                key={i}
                className="rounded-xl bg-card p-4 ring-1 ring-foreground/10"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded bg-muted px-1.5 py-0.5 font-medium text-foreground">
                    {p.topicTitle}
                  </span>
                  <span className="truncate">
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

      {/* Related lessons */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-heading text-lg font-bold text-foreground">
            Related lessons
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v) => (
              <LessonCard key={v.slug} video={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
