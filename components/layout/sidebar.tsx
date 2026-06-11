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
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-slate-200 flex flex-col h-screen sticky top-0 bg-white">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">A360</h2>
        </div>
        <p className="text-xs text-slate-600 ml-12">Intelligence Platform</p>
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
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? "text-blue-600" : "text-slate-600"
                  }`}
                />
                <span className="flex-1 text-left">{item.name}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                )}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <button className="w-full px-4 py-2.5 rounded-lg flex items-center gap-3 text-slate-700 hover:bg-slate-100 transition-all text-sm font-medium">
          <Settings className="h-4 w-4 text-slate-600" />
          Settings
        </button>
      </div>
    </div>
  );
}
