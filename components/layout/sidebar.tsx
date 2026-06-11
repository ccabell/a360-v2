"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 glass border-r border-white/10 flex flex-col h-screen sticky top-0 bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-lg font-bold gradient-text">A360</h2>
        </div>
        <p className="text-xs text-gray-400 ml-12">Advanced AI</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <button
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all text-sm font-medium group fade-in ${
                  isActive
                    ? "glass-hover bg-blue-600/20 border-blue-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"
                  }`}
                />
                {item.name}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                )}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <button className="w-full px-4 py-3 rounded-xl flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium group">
          <Settings className="h-4 w-4 text-gray-500 group-hover:text-gray-300" />
          Settings
        </button>
      </div>
    </div>
  );
}
