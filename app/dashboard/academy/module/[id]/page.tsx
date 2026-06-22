import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import {
  getModule,
  getModules,
  getModuleVideos,
  getTopicVideos,
} from "@/lib/academy/server";
import { LessonCard } from "@/components/academy/lesson-card";
import { moduleIcon, CATEGORY_STYLES } from "@/components/academy/icons";
import { TOPIC_BY_ID } from "@/lib/academy/taxonomy";

export function generateStaticParams() {
  return getModules().map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = getModule(id);
  return { title: m ? `${m.title} · Academy` : "Module · Academy" };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const module = getModule(id);
  if (!module) notFound();

  const Icon = moduleIcon(module.icon);
  const cat =
    CATEGORY_STYLES[
      TOPIC_BY_ID.get(module.topics[0] ?? "")?.category ?? "technique"
    ];
  const lessons = getModuleVideos(module.id, { lessonsOnly: true });

  return (
    <div className="mx-auto max-w-6xl px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link href="/dashboard/academy" className="hover:text-foreground">
          Academy
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{module.title}</span>
      </nav>

      {/* Header */}
      <div className="mt-4 flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${cat.bg} ${cat.text}`}
        >
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Module {module.order}
          </span>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {module.title}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {module.blurb}
          </p>
        </div>
      </div>

      {/* Topics in this module */}
      <section className="mt-8">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Topics in this module
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {module.topics.map((tid) => {
            const topic = TOPIC_BY_ID.get(tid);
            if (!topic) return null;
            const tc = CATEGORY_STYLES[topic.category];
            return (
              <Link
                key={tid}
                href={`/dashboard/academy/reference/${tid}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-card px-3 py-1.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-colors hover:ring-primary/40"
              >
                <span className={`h-2 w-2 rounded-full ${tc.dot}`} />
                {topic.title}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Lessons, grouped per topic for a learning path feel */}
      <section className="mt-10">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Lessons ({lessons.length})
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ordered by depth — the most comprehensive lessons first.
        </p>
        {lessons.length === 0 ? (
          <p className="mt-6 rounded-lg bg-muted/40 p-6 text-center text-sm text-muted-foreground">
            No long-form lessons tagged to this module yet.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((v) => (
              <LessonCard key={v.slug} video={v} />
            ))}
          </div>
        )}
      </section>

      {/* Per-topic quick links to reference */}
      <section className="mt-12">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Jump to a topic in the Reference Guide
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {module.topics.map((tid) => {
            const topic = TOPIC_BY_ID.get(tid);
            if (!topic) return null;
            const tc = CATEGORY_STYLES[topic.category];
            const n = getTopicVideos(tid).length;
            return (
              <Link
                key={tid}
                href={`/dashboard/academy/reference/${tid}`}
                className="group flex items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10 transition-all hover:ring-primary/40"
              >
                <span className={`h-2.5 w-2.5 rounded-full ${tc.dot}`} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">
                    {topic.title}
                  </h3>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {topic.blurb}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {n} videos
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
