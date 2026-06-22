import { Video, Film, Tv, Stethoscope, Layers } from "lucide-react";
import {
  getTubeVideos,
  getTubeFacets,
  getTubeIndex,
} from "@/lib/tube/server";
import { TubeExplore } from "@/components/tube/tube-explore";

export const metadata = {
  title: "A360 Tube — YouTube aesthetics, intelligently navigated",
};

export default function TubePage() {
  const videos = getTubeVideos();
  const facets = getTubeFacets();
  const { stats } = getTubeIndex();

  return (
    <div className="min-h-full bg-neutral-950 text-white">
      {/* Hero */}
      <div className="border-b border-white/10 px-8 pt-10 pb-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Tv className="h-4 w-4" />
            A360 Tube
          </div>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Every aesthetics video,{" "}
            <span className="text-primary">intelligently navigated.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300">
            The entire ingested YouTube aesthetics library in one place —{" "}
            {stats.videos.toLocaleString()} videos across {stats.channels}{" "}
            channels, all searchable. {stats.tagged.toLocaleString()} are fully
            tagged by facial &amp; body area, concern, treatment and type — the
            rest browse by channel and search (AI tagging for them is in
            progress).
          </p>

          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5">
            <Stat icon={Film} value={stats.videos.toLocaleString()} label="videos" />
            <Stat icon={Video} value={stats.channels} label="channels" />
            <Stat icon={Stethoscope} value={stats.tagged.toLocaleString()} label="tagged" />
            <Stat icon={Layers} value={stats.concerns} label="concerns" />
            <Stat icon={Layers} value={stats.treatments} label="treatments" />
          </div>
        </div>
      </div>

      {/* Explorer */}
      <div className="mx-auto max-w-7xl px-8 py-8">
        <TubeExplore videos={videos} facets={facets} />
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
