import Link from "next/link";
import {
  ChevronRight,
  Tags,
  Filter,
  Search,
  Sparkles,
  Play,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { getTubeIndex } from "@/lib/tube/server";

export const metadata = {
  title: "Learn · A360 Video Navigator",
};

export default function TubeLearnPage() {
  const { stats } = getTubeIndex();

  const steps = [
    {
      icon: Tags,
      title: "Every video is tagged & summarised",
      body: `All ${stats.videos.toLocaleString()} videos across ${stats.channels} channels are read, summarised, and tagged with the facial & body areas, patient concerns, and treatments they cover — so the library is structured, not just a pile of links.`,
    },
    {
      icon: Filter,
      title: "Filter to narrow the field",
      body: "In Navigate, use the filter rail to combine facial & body area, concern, treatment, channel and video type. Filters are AND across groups and OR within a group, so you can zero in on exactly what you need.",
    },
    {
      icon: Search,
      title: "Search the rest",
      body: "Once you've filtered, the search box matches video titles and summaries — handy for a specific device, product, or technique that isn't its own tag.",
    },
    {
      icon: Play,
      title: "Watch in-app, jump to the moment",
      body: "Open any video to watch it inline. Related videos that share an area or concern are surfaced underneath so you can keep going.",
    },
    {
      icon: Sparkles,
      title: "Or just ask",
      body: "Ask the library a clinical question and get an answer grounded only in the videos — with [S#] citations that deep-link to the exact second on YouTube. Nothing is invented.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-neutral-400">
        <Link href="/tube" className="hover:text-white">
          Video Navigator
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">Learn</span>
      </nav>

      <header className="mt-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <Compass className="h-4 w-4" />
          How it works
        </div>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Get the most out of the Video Navigator
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-300">
          The Navigator turns a sprawling set of aesthetics videos into a curated,
          searchable library. Here&rsquo;s how it&rsquo;s built and how to use it.
        </p>
      </header>

      <div className="mt-8 space-y-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-neutral-900 p-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <h2 className="font-heading text-base font-bold text-white">
                  <span className="mr-2 text-primary">{i + 1}.</span>
                  {s.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                  {s.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-neutral-400">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
        <p>
          The Navigator is an educational reference for qualified clinicians.
          Answers are grounded in cited videos and are not medical advice.
        </p>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/tube/explore"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
        >
          <Compass className="h-4 w-4" />
          Navigate the library
        </Link>
        <Link
          href="/tube/ask"
          className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
        >
          <Sparkles className="h-4 w-4" />
          Ask the library
        </Link>
      </div>
    </div>
  );
}
