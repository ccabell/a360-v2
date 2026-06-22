import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import { TutorClient } from "@/components/academy/tutor-client";

export const metadata = {
  title: "Ask · Dr Tim Pearce Channel Navigator",
};

export default function AcademyTutorPage() {
  return (
    <div className="mx-auto flex h-[calc(100vh-1rem)] max-w-4xl flex-col px-6 py-4">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link href="/dashboard/academy" className="hover:text-foreground">
          Pearce Channel
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Ask</span>
      </nav>

      <div className="mt-3 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-heading text-xl font-bold leading-tight text-foreground">
            Ask across his videos
          </h1>
          <p className="text-xs text-muted-foreground">
            Answers drawn from Dr Tim Pearce&rsquo;s videos · every point links to
            the source moment
          </p>
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1">
        <TutorClient />
      </div>
    </div>
  );
}
