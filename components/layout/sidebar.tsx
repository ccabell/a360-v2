"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Telescope,
  Share2,
  SearchIcon,
  Zap,
  ClipboardList,
  Layers,
  Settings,
  Sparkles,
  LogOut,
  History,
  FileText,
  UserRound,
  Images,
  BookOpen,
  BookOpenCheck,
  Blocks,
} from "lucide-react";

// scope "internal" items are hidden in the acquirer-facing demo build.
const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Patients", href: "/dashboard/patients", icon: Users },
  { name: "Research", href: "/dashboard/research", icon: Telescope },
  { name: "Ask", href: "/dashboard/ask", icon: BookOpenCheck },
  { name: "History", href: "/dashboard/history", icon: History },
  { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Reach", href: "/dashboard/reach", icon: Share2 },
  { name: "RAG", href: "/dashboard/rag", icon: SearchIcon },
  {
    name: "Agent Manager",
    href: "/dashboard/agents",
    icon: Sparkles,
    scope: "internal",
  },
  {
    name: "Fuel Library",
    href: "/dashboard/fuel-library",
    icon: BookOpen,
    scope: "internal",
  },
  { name: "Agent Tester", href: "/dashboard/agent-tester", icon: Zap },
  { name: "Studio", href: "/dashboard/studio", icon: Blocks },
  { name: "TCP", href: "/dashboard/tcp", icon: ClipboardList },
  { name: "Consultation", href: "/dashboard/consultation", icon: Layers },
  { name: "LPOA", href: "/dashboard/lpoa", icon: FileText },
  {
    name: "Age Progression",
    href: "/dashboard/age-progression",
    icon: UserRound,
  },
  {
    name: "Before After",
    href: "/dashboard/before-after",
    icon: Images,
  },
  {
    name: "Components",
    href: "/dashboard/components",
    icon: Settings,
    scope: "internal",
  },
] as const;

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
              : pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <button
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
