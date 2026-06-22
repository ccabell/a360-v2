import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export default function AcademyNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="mt-5 font-heading text-2xl font-bold text-foreground">
        Not found in the Academy
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        That lesson, module or topic doesn&rsquo;t exist in the corpus. It may
        have been renamed, or the link is out of date.
      </p>
      <Link
        href="/dashboard/academy"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to the Academy
      </Link>
    </div>
  );
}
