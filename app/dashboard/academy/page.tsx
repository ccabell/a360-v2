import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Search,
  Clock,
  Film,
  Layers,
  ArrowRight,
  Sparkles,
  ImageIcon,
} from "lucide-react";
import {
  getIndex,
  getModules,
  getFeaturedLessons,
  getModuleVideos,
} from "@/lib/academy/server";
import { moduleIcon, CATEGORY_STYLES } from "@/components/academy/icons";
import { LessonCard } from "@/components/academy/lesson-card";
import { TOPIC_BY_ID } from "@/lib/academy/taxonomy";

export const metadata = {
  title: "Injector Academy",
};

export default function AcademyHome() {
  const index = getIndex();
  const modules = getModules();
  const featured = getFeaturedLessons(6);
  const { stats } = index;
  const hours = Math.round(stats.totalDurationSeconds / 3600);

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 15%, var(--color-primary) 0, transparent 45%)",
            opacity: 0.08,
          }}
        />
        <div className="relative mx-auto max-w-6xl px-8 py-12">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
            <GraduationCap className="h-4 w-4" />
            Dr Tim Pearce · Injector Academy
          </div>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight text-foreground">
            Advanced injectables education, grounded in{" "}
            <span className="text-primary">every word</span> Dr Tim Pearce has
            taught.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A structured course and a searchable clinical reference, built from
            his complete video corpus. Every key point links to the exact second
            it was said — so you can learn it, then verify it at the source.
          </p>

          {/* Stat strip */}
          <div className="mt-8 flex flex-wrap gap-6">
            <Stat icon={Film} value={stats.videos} label="videos" />
            <Stat icon={BookOpen} value={stats.lessons} label="lessons" />
            <Stat icon={Clock} value={`${hours}h`} label="of teaching" />
            <Stat icon={Layers} value={stats.topics} label="reference topics" />
            <Stat
              icon={Layers}
              value={stats.segments.toLocaleString()}
              label="cited segments"
            />
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#curriculum"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <BookOpen className="h-4 w-4" />
              Start the course
            </Link>
            <Link
              href="/dashboard/academy/reference"
              className="inline-flex items-center gap-2 rounded-lg bg-card px-5 py-2.5 text-sm font-semibold text-foreground ring-1 ring-foreground/10 transition-colors hover:ring-primary/40"
            >
              <Layers className="h-4 w-4" />
              Reference Guide
            </Link>
            <Link
              href="/dashboard/academy/search"
              className="inline-flex items-center gap-2 rounded-lg bg-card px-5 py-2.5 text-sm font-semibold text-foreground ring-1 ring-foreground/10 transition-colors hover:ring-primary/40"
            >
              <Search className="h-4 w-4" />
              Search the corpus
            </Link>
            <Link
              href="/dashboard/academy/tutor"
              className="inline-flex items-center gap-2 rounded-lg bg-card px-5 py-2.5 text-sm font-semibold text-foreground ring-1 ring-foreground/10 transition-colors hover:ring-primary/40"
            >
              <Sparkles className="h-4 w-4" />
              Ask the AI tutor
            </Link>
            <Link
              href="/dashboard/academy/illustrations"
              className="inline-flex items-center gap-2 rounded-lg bg-card px-5 py-2.5 text-sm font-semibold text-foreground ring-1 ring-foreground/10 transition-colors hover:ring-primary/40"
            >
              <ImageIcon className="h-4 w-4" />
              Illustrations
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 py-10">
        {/* Curriculum */}
        <section id="curriculum" className="scroll-mt-8">
          <SectionHeading
            title="The Curriculum"
            subtitle="Ten modules, ordered from safety-critical fundamentals to practice growth."
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => {
              const Icon = moduleIcon(m.icon);
              const count = getModuleVideos(m.id, { lessonsOnly: true }).length;
              const cat =
                CATEGORY_STYLES[
                  TOPIC_BY_ID.get(m.topics[0] ?? "")?.category ?? "technique"
                ];
              return (
                <Link
                  key={m.id}
                  href={`/dashboard/academy/module/${m.id}`}
                  className="group relative flex flex-col gap-3 overflow-hidden rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-all hover:ring-primary/40 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-lg ${cat.bg} ${cat.text}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Module {m.order}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary">
                      {m.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {m.blurb}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground">
                    <span>
                      {m.topics.length} topics · {count} lessons
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured lessons */}
        <section className="mt-12">
          <SectionHeading
            title="Start here"
            subtitle="High-signal lessons across safety, anatomy and technique."
            href="/dashboard/academy/module/safety"
            hrefLabel="Browse all"
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v) => (
              <LessonCard key={v.slug} video={v} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-5 w-5 text-primary/70" />
      <div className="flex items-baseline gap-1.5">
        <span className="font-heading text-2xl font-bold text-foreground">
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
  href,
  hrefLabel,
}: {
  title: string;
  subtitle: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {href && (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {hrefLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
