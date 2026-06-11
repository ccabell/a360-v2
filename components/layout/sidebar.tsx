"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Share2,
  SearchIcon,
  Zap,
  ClipboardList,
  Layers,
  Settings,
  Sparkles,
} from "lucide-react";

const menuItems = [
  { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Reach", href: "/dashboard/reach", icon: Share2 },
  { name: "RAG", href: "/dashboard/rag", icon: SearchIcon },
  { name: "Agent Tester", href: "/dashboard/agent-tester", icon: Zap },
  { name: "TCP", href: "/dashboard/tcp", icon: ClipboardList },
  { name: "Consultation", href: "/dashboard/consultation", icon: Layers },
  { name: "Components", href: "/dashboard/components", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

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
        <p className="text-xs text-sidebar-foreground/60 ml-12">Intelligence Platform</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

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
                    isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60"
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
        <button className="w-full px-4 py-2.5 rounded-lg flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-primary/5 transition-all text-sm font-medium">
          <Settings className="h-4 w-4 text-sidebar-foreground/60" />
          Settings
        </button>
      </div>
    </div>
  );
}
