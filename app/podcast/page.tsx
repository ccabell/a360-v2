import Link from "next/link";
import {
  Sparkles,
  Compass,
  FileSearch,
  Bookmark,
  ArrowRight,
  Headphones,
  Mic,
  Radio,
  Tag,
  Clock,
} from "lucide-react";
import { getPodcastStats } from "@/lib/podcast/server";

export const metadata = {
  title:
    "A360 Podcast Navigator — Medical Aesthetics Podcast Intelligence",
};

export const revalidate = 300;

const OPTIONS = [
  {
    href: "/podcast/ask",
    icon: Sparkles,
    eyebrow: "Chat",
    title: "Ask the podcast library",
    description:
      "Ask anything about treatments, business, sales, or patient language. Choose an AI agent lens and get answers grounded in real podcast episodes with citations.",
    cta: "Start a conversation",
  },
  {
    href: "/podcast/search",
    icon: FileSearch,
    eyebrow: "Search",
    title: "Search every transcript",
    description:
      "Find every mention of a word or phrase across 10,000+ transcribed episodes. Exact matches with highlighted excerpts, linked straight into the transcript.",
    cta: "Search transcripts",
  },
  {
    href: "/podcast/explore",
    icon: Compass,
    eyebrow: "Browse",
    title: "Browse all shows",
    description:
      "Explore the full library of medical aesthetics podcasts. Filter by category, search by name, and dive into any show's complete episode list.",
    cta: "Browse the library",
  },
  {
    href: "/podcast/listen-later",
    icon: Bookmark,
    eyebrow: "Saved",
    title: "Listen later",
    description:
      "Bookmark episodes as you search and browse, then come back to your saved queue whenever you're ready to listen.",
    cta: "View saved episodes",
  },
] as const;

export default async function PodcastLandingPage() {
  const stats = await getPodcastStats();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      {/* Hero */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <Headphones className="h-4 w-4" />
          A360 Podcast Navigator
        </div>
        <h1 className="mt-3 font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          Curated Podcast Intelligence
          <br className="hidden sm:block" /> for{" "}
          <span className="text-primary">Aesthetic Medicine</span>.
        </h1>
        <p className="mt-4 text-lg font-medium text-neutral-300">
          {stats.shows.toLocaleString()} medical aesthetics podcasts with{" "}
          {stats.episodes.toLocaleString()} episodes —{" "}
          {stats.transcribed.toLocaleString()} transcribed, tagged, and
          searchable. Choose your lens and start exploring.
        </p>
      </div>

      {/* Options */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {OPTIONS.map((o) => {
          const Icon = o.icon;
          return (
            <Link
              key={o.href}
              href={o.href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-neutral-900 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-black/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-5" />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">
                {o.eyebrow}
              </p>
              <h2 className="mt-1 font-heading text-xl font-bold text-white">
                {o.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
                {o.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                {o.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Stats strip */}
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
        <Stat icon={Radio} value={stats.shows.toLocaleString()} label="shows" />
        <Stat
          icon={Mic}
          value={stats.episodes.toLocaleString()}
          label="episodes"
        />
        <Stat
          icon={Headphones}
          value={stats.transcribed.toLocaleString()}
          label="transcribed"
        />
        <Stat
          icon={Tag}
          value={stats.tags.toLocaleString()}
          label="tags"
        />
        <Stat
          icon={Clock}
          value={`~${stats.hoursEstimate.toLocaleString()}`}
          label="hours"
        />
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
