import { Suspense } from "react";
import Link from "next/link";
import { GraduationCap, ChevronRight } from "lucide-react";
import { SearchClient } from "@/components/academy/search-client";

export const metadata = {
  title: "Search · Injector Academy",
};

export default function AcademySearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link href="/dashboard/academy" className="hover:text-foreground">
          Academy
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Search</span>
      </nav>

      <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
        <GraduationCap className="h-4 w-4" />
        Search the corpus
      </div>
      <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold leading-tight text-foreground">
        Find the exact moment it was taught.
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Search every cleaned transcript across Dr Tim Pearce&rsquo;s 408 videos.
        Each result links to the precise second the words were spoken.
      </p>

      <div className="mt-6">
        <Suspense fallback={null}>
          <SearchClient />
        </Suspense>
      </div>
    </div>
  );
}
