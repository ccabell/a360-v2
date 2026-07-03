import Link from "next/link";
import { Tv, Store } from "lucide-react";

/**
 * Standalone shell for the Video Navigator.
 *
 * Deliberately independent of the dashboard layout — this route group owns its
 * own chrome so the Navigator keeps working as a self-contained agent surface
 * (and as the Agent Exchange embed) regardless of any dashboard changes.
 */
export default function TubeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col bg-neutral-950 text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-6">
          <Link href="/tube" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Tv className="size-4" />
            </span>
            <span className="font-heading text-sm font-semibold tracking-tight">
              A360 Video Navigator
            </span>
          </Link>
          <Link
            href="/exchange"
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Store className="size-3.5" />
            Agent Exchange
          </Link>
        </div>
      </header>

      <div className="flex-1">{children}</div>
    </div>
  );
}
