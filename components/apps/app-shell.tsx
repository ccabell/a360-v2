import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** App theme key — must match a [data-app="..."] rule in globals.css */
export type AppTheme = "ask" | "reach" | "scribe" | "tcp" | "intelligence";

interface AppShellProps {
  /** App name shown in the top nav */
  name: string;
  /** Lucide icon for the app */
  icon: LucideIcon;
  /** Theme key — applies per-app color overrides via data-app attribute */
  theme?: AppTheme;
  /** Optional subtitle next to the name */
  subtitle?: string;
  /** Badge text on the right side of nav (e.g. "4-Agent Pipeline") */
  badge?: string;
  /** Footer disclaimer text */
  footer?: string;
  /** Extra className on the root container */
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared shell for standalone apps under /apps/*.
 * Provides a consistent top nav + optional footer, no sidebar.
 * Each app can wrap its content in this for a uniform standalone look.
 */
export function AppShell({
  name,
  icon: Icon,
  theme,
  subtitle,
  badge,
  footer,
  className,
  children,
}: AppShellProps) {
  return (
    <div
      data-app={theme}
      className={cn("flex min-h-screen flex-col bg-background", className)}
    >
      {/* Top nav */}
      <nav className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              {name}
            </span>
            {subtitle && (
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {subtitle}
              </span>
            )}
          </div>
          {badge && (
            <div className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {badge}
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="flex flex-1 flex-col">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-border bg-background px-6 py-3 text-center">
          <p className="mx-auto max-w-2xl text-xs text-muted-foreground">
            {footer}
          </p>
        </div>
      )}
    </div>
  );
}
