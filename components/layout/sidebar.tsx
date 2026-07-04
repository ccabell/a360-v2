"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Share2,
  Zap,
  ClipboardList,
  Settings,
  Sparkles,
  LogOut,
  History,
  PlayCircle,
  FileText,
  UserRound,
  Images,
  BookOpen,
  BookOpenCheck,
  Blocks,
  Library,
  GraduationCap,
  Tv,
  Headphones,
} from "lucide-react";

// The demo build shows only the suite below; everything else is scope:"internal"
// and hidden unless APP_MODE === "internal".
const menuItems = [
  // ── The demo suite ────────────────────────────────────────────────────────
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Scribe", href: "/dashboard/scribe", icon: FileText },
  { name: "TCP", href: "/dashboard/tcp", icon: ClipboardList },
  { name: "Reach", href: "/dashboard/reach", icon: Share2 },
  { name: "Intelligence", href: "/dashboard/intelligence", icon: Sparkles },
  { name: "Library", href: "/dashboard/library", icon: Library },
  { name: "Pearce Channel", href: "/dashboard/academy", icon: GraduationCap },
  { name: "Video Navigator", href: "/tube", icon: Tv },
  { name: "Podcast Navigator", href: "/podcast", icon: Headphones },
  // ── Internal only (hidden in the demo build) ─────────────────────────────
  { name: "Patients", href: "/dashboard/patients", icon: Users, scope: "internal" },
  { name: "Global Library", href: "/dashboard/global-library", icon: BookOpenCheck, scope: "internal" },
  { name: "LPOA", href: "/dashboard/lpoa", icon: BookOpen, scope: "internal" },
  { name: "Age Progression", href: "/dashboard/age-progression", icon: UserRound, scope: "internal" },
  { name: "Agent Tester", href: "/dashboard/agent-tester", icon: Zap, scope: "internal" },
  { name: "Studio", href: "/dashboard/studio", icon: Blocks, scope: "internal" },
  { name: "History", href: "/dashboard/history", icon: History, scope: "internal" },
  { name: "Agent Runs", href: "/dashboard/agent-runs", icon: PlayCircle, scope: "internal" },
  { name: "Agent Manager", href: "/dashboard/agents", icon: Sparkles, scope: "internal" },
  { name: "Fuel Library", href: "/dashboard/fuel-library", icon: BookOpen, scope: "internal" },
  { name: "Before After", href: "/dashboard/before-after", icon: Images, scope: "internal" },
] as const;

// Dev shows ALL tabs (nothing hidden). The clean demo nav is opt-in:
// set NEXT_PUBLIC_APP_MODE=demo (e.g. on the demo deployment only).
const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE ?? "internal";
const isDemo = APP_MODE === "demo";

async function signOut() {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/login";
}

export function Sidebar() {
  const pathname = usePathname();
  const items = menuItems.filter(
    (i) => !isDemo || !("scope" in i && i.scope === "internal"),
  );

  return (
    <div className="w-64 border-r border-border flex flex-col h-screen sticky top-0 bg-sidebar">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold text-sidebar-foreground">A360</h2>
        </div>
        <p className="text-xs text-sidebar-foreground/60 ml-12">
          Intelligence Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link key={item.href} href={item.href}>
              <button
                aria-current={isActive ? "page" : undefined}
                className={`w-full px-4 py-2.5 rounded-lg flex items-center gap-3 transition-all text-sm font-medium ${
                  isActive
                    ? "bg-sidebar-primary/10 text-sidebar-primary border border-sidebar-primary/30"
                    : "text-sidebar-foreground hover:bg-sidebar-primary/5"
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/60"
                  }`}
                />
                <span className="flex-1 text-left">{item.name}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-sidebar-primary rounded-full" />
                )}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {isDemo ? (
          <button
            onClick={signOut}
            className="w-full px-4 py-2.5 rounded-lg flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-primary/5 transition-all text-sm font-medium"
          >
            <LogOut className="h-4 w-4 text-sidebar-foreground/60" />
            Sign out
          </button>
        ) : (
          <button className="w-full px-4 py-2.5 rounded-lg flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-primary/5 transition-all text-sm font-medium">
            <Settings className="h-4 w-4 text-sidebar-foreground/60" />
            Settings
          </button>
        )}
      </div>
    </div>
  );
}
