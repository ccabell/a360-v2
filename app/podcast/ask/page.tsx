import { PodcastTutorClient } from "@/components/podcast/podcast-tutor-client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Ask the Podcast Library — A360 Podcast Navigator",
};

export default function PodcastAskPage() {
  return (
    <div className="mx-auto flex h-[calc(100svh-3.5rem)] max-w-4xl flex-col px-4 py-4 sm:px-6">
      <nav className="mb-3 flex items-center gap-1 text-xs text-neutral-500">
        <Link href="/podcast" className="hover:text-white">
          Podcast Navigator
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-300">Ask</span>
      </nav>
      <div className="min-h-0 flex-1">
        <PodcastTutorClient />
      </div>
    </div>
  );
}
