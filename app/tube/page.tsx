import Link from "next/link";
import {
  Sparkles,
  Compass,
  GraduationCap,
  ArrowRight,
  Tv,
  Film,
  Video,
  Stethoscope,
  Layers,
} from "lucide-react";
import { getTubeIndex } from "@/lib/tube/server";

export const metadata = {
  title: "A360 Video Navigator — Curated Video Intelligence for Aesthetic Medicine",
};

const OPTIONS = [
  {
    href: "/tube/ask",
    icon: Sparkles,
    eyebrow: "Chat",
    title: "Ask the library",
    description:
      "Ask anything about technique, devices, safety or dosing. Every answer is grounded in real aesthetics videos and cites the exact moment.",
    cta: "Start a conversation",
  },
  {
    href: "/tube/explore",
    icon: Compass,
    eyebrow: "Navigate",
    title: "Navigate the videos",
    description:
      "Filter the full library by facial & body area, patient concern, treatment and video type — then search the rest and watch in-app.",
    cta: "Browse the library",
  },
  {
    href: "/tube/learn",
    icon: GraduationCap,
    eyebrow: "Learn",
    title: "Learn about the Navigator",
    description:
      "New here? See what the library is, how every video is tagged and summarised, and how to get the most from search and filters.",
    cta: "Read the guide",
  },
] as const;

export default function TubeLandingPage() {
  const { stats } = getTubeIndex();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      {/* Hero */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <Tv className="h-4 w-4" />
          A360 Video Navigator
        </div>
        <h1 className="mt-3 font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          Curated Video Intelligence
          <br className="hidden sm:block" /> for{" "}
          <span className="text-primary">Aesthetic Medicine</span>.
        </h1>
        <p className="mt-4 text-lg font-medium text-neutral-300">
          {stats.videos.toLocaleString()} aesthetics videos across{" "}
          {stats.channels} channels — tagged, summarised and searchable. Where do
          you want to start?
        </p>
      </div>

      {/* Three options */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
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
        <Stat icon={Film} value={stats.videos.toLocaleString()} label="videos" />
        <Stat icon={Video} value={stats.channels} label="channels" />
        <Stat icon={Stethoscope} value={stats.anatomyAreas} label="body areas" />
        <Stat icon={Layers} value={stats.concerns} label="concerns" />
        <Stat icon={Layers} value={stats.treatments} label="treatments" />
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
        <span className="font-heading text-2xl font-bold text-white">{value}</span>
        <span className="text-sm text-neutral-400">{label}</span>
      </div>
    </div>
  );
}
