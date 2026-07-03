import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import { TubeTutorClient } from "@/components/tube/tube-tutor-client";

export const metadata = {
  title: "Ask · A360 Video Navigator",
};

export default function TubeAskPage() {
  return (
    <div className="flex h-[calc(100svh-3.5rem)] flex-col px-6 py-4">
      <nav className="mx-auto flex w-full max-w-4xl flex-wrap items-center gap-1 text-xs text-neutral-400">
        <Link href="/tube" className="hover:text-white">
          Video Navigator
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">Ask</span>
      </nav>

      <div className="mx-auto mt-3 flex w-full max-w-4xl items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-heading text-xl font-bold leading-tight text-white">
            Ask the video library
          </h1>
          <p className="text-xs text-neutral-400">
            Semantic search across the aesthetics video corpus · every answer cites the exact moment
          </p>
        </div>
      </div>

      <div className="mx-auto mt-4 min-h-0 w-full max-w-4xl flex-1">
        <TubeTutorClient />
      </div>
    </div>
  );
}
