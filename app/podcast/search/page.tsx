import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, FileSearch } from "lucide-react";
import TranscriptSearchClient from "@/components/podcast/transcript-search-client";

export const metadata = {
  title: "Transcript Search — A360 Podcast Navigator",
};

export default function TranscriptSearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-xs text-neutral-500">
        <Link href="/podcast" className="hover:text-white">
          Podcast Navigator
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-300">Transcript Search</span>
      </nav>

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        <FileSearch className="h-4 w-4" />
        Transcript Search
      </div>
      <h1 className="mt-2 font-heading text-3xl font-bold text-white">
        Find every mention, word for word
      </h1>
      <p className="mt-2 text-sm text-neutral-400">
        Search the full text of 10,000+ transcribed episodes. Every match links
        straight into the transcript.
      </p>

      <div className="mt-8">
        <Suspense>
          <TranscriptSearchClient />
        </Suspense>
      </div>
    </div>
  );
}
