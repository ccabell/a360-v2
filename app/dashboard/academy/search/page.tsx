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
        Video search
      </div>
      <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold leading-tight text-foreground">
        Search every lesson by what was said.
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Search across all {408} of Dr Tim Pearce&rsquo;s videos. Every match
        jumps straight to the second it was said.
      </p>

      <div className="mt-6">
        <Suspense fallback={null}>
          <SearchClient />
        </Suspense>
      </div>
    </div>
  );
}
