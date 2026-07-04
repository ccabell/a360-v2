import Link from "next/link";
import { Bookmark, ChevronRight } from "lucide-react";
import ListenLaterClient from "@/components/podcast/listen-later-client";

export const metadata = {
  title: "Listen Later — A360 Podcast Navigator",
};

export default function ListenLaterPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-xs text-neutral-500">
        <Link href="/podcast" className="hover:text-white">
          Podcast Navigator
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-300">Listen Later</span>
      </nav>

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        <Bookmark className="h-4 w-4" />
        Listen Later
      </div>
      <h1 className="mt-2 font-heading text-3xl font-bold text-white">
        Your saved episodes
      </h1>
      <p className="mt-2 text-sm text-neutral-400">
        Episodes you bookmark across the Navigator, saved in this browser.
      </p>

      <ListenLaterClient />
    </div>
  );
}
