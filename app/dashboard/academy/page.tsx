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
  Play,
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
import { youtubeThumb } from "@/lib/academy/youtube";

export const metadata = {
  title: "Injector Academy",
};

export default function AcademyHome() {
  const index = getIndex();
  const modules = getModules();
  const featured = getFeaturedLessons(8);
  const { stats } = index;
  const hours = Math.round(stats.totalDurationSeconds / 3600);

  // Thumbnail montage for the cinematic hero backdrop.
  const montage = getFeaturedLessons(24)
    .map((v) => youtubeThumb(v.youtubeId, "mq"))
    .filter((u): u is string => Boolean(u));

  return (
    <div className="min-h-full bg-neutral-950 text-white">
      {/* ── Cinematic hero ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Thumbnail montage backdrop */}
        <div className="pointer-events-none absolute inset-0">
          <div className="grid h-full w-full grid-cols-4 gap-0.5 opacity-[0.18] sm:grid-cols-6 lg:grid-cols-8">
            {montage.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                aria-hidden
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-8 py-16 sm:py-20">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <GraduationCap className="h-4 w-4" />
            Dr Tim Pearce · Channel Navigator
          </div>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Navigate every video
            <br className="hidden sm:block" />{" "}
            <span className="text-primary">Dr Tim Pearce</span> has published.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            Browse his whole YouTube channel by topic, search every transcript,
            and jump straight to the exact moment a subject comes up — then watch
            it on his channel.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#curriculum"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
            >
              <Play className="h-4 w-4 fill-current" />
              Browse the channel
            </Link>
            <Link
              href="/dashboard/academy/tutor"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
            >
              <Sparkles className="h-4 w-4" />
              Ask across his videos
            </Link>
            <Link
              href="/dashboard/academy/search"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15"
            >
              <Search className="h-4 w-4" />
              Search the videos
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6">
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
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 py-12">
        {/* ── Curriculum ─────────────────────────────────────────────── */}
        <section id="curriculum" className="scroll-mt-8">
          <SectionHeading
            title="Browse by topic"
            subtitle="Every video on the channel, organised into topics — from safety-critical fundamentals to practice growth."
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => {
              const Icon = moduleIcon(m.icon);
              const vids = getModuleVideos(m.id, { lessonsOnly: true });
              const count = vids.length;
              const cat =
                CATEGORY_STYLES[
                  TOPIC_BY_ID.get(m.topics[0] ?? "")?.category ?? "technique"
                ];
              const cover =
                youtubeThumb(vids.find((v) => v.youtubeId)?.youtubeId, "mq") ??
                null;
              return (
                <Link
                  key={m.id}
                  href={`/dashboard/academy/module/${m.id}`}
                  className="group relative flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-xl ring-1 ring-white/10 transition-all hover:ring-white/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                >
                  {/* Cover */}
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

                  {/* Content */}
                  <div className="relative p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${cat.bg} ${cat.text} ring-1 ring-white/10`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur">
                        Module {m.order}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-white">
                      {m.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-300">
                      {m.blurb}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                      <span>
                        {m.topics.length} topics · {count} videos
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/70 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Featured lessons ───────────────────────────────────────── */}
        <section className="mt-14">
          <SectionHeading
            title="Popular videos"
            subtitle="High-signal videos across safety, anatomy and technique."
            href="/dashboard/academy/module/safety"
            hrefLabel="Browse all"
          />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v) => (
              <LessonCard key={v.slug} video={v} />
            ))}
          </div>
        </section>

        {/* ── Secondary entrypoints ──────────────────────────────────── */}
        <section className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <EntryCard
            href="/dashboard/academy/reference"
            icon={Layers}
            title="Reference Guide"
            desc={`${stats.topics} clinical topics, each citing the exact moments it's taught.`}
          />
          <EntryCard
            href="/dashboard/academy/tutor"
            icon={Sparkles}
            title="AI Tutor"
            desc="Ask anything — answers grounded in the corpus, cited to the second."
          />
          <EntryCard
            href="/dashboard/academy/illustrations"
            icon={ImageIcon}
            title="Illustration reference"
            desc="Anatomy diagrams and artery maps drawn from the videos."
          />
        </section>

        {/* Attribution */}
        <p className="mt-14 border-t border-white/10 pt-6 text-xs leading-relaxed text-neutral-500">
          An independent navigator for Dr Tim Pearce&apos;s public YouTube
          videos, built for education and reference. Every video plays from and
          links back to his channel. Not affiliated with or endorsed by Dr Tim
          Pearce.
        </p>
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
      <Icon className="h-5 w-5 text-primary" />
      <div className="flex items-baseline gap-1.5">
        <span className="font-heading text-2xl font-bold text-white">
          {value}
        </span>
        <span className="text-sm text-neutral-400">{label}</span>
      </div>
    </div>
  );
}

function EntryCard({
  href,
  icon: Icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl bg-neutral-900 p-5 ring-1 ring-white/10 transition-all hover:ring-primary/40 hover:-translate-y-0.5"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="flex items-center gap-1.5 font-heading text-base font-semibold text-white">
          {title}
          <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5" />
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-400">{desc}</p>
      </div>
    </Link>
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
        <h2 className="font-heading text-2xl font-bold text-white">{title}</h2>
        <p className="mt-1 text-sm text-neutral-400">{subtitle}</p>
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
