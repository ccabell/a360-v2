"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

const TABS = [
  { href: "/dashboard/portfolio", label: "Home" },
  { href: "/dashboard/portfolio/projects", label: "Projects" },
  { href: "/dashboard/portfolio/data-sources", label: "Data Sources" },
  { href: "/dashboard/portfolio/history", label: "History" },
];

/** Command Center sub-navigation (plan §3): Home / Projects / Data Sources / History. */
export function CommandNav() {
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-background px-8 py-3">
      {TABS.map((tab) => {
        const active =
          tab.href === "/dashboard/portfolio"
            ? pathname === tab.href
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
      <a
        href="/exchange"
        className="ml-auto inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        Exchange
        <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}
