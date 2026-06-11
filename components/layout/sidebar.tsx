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
} from "lucide-react";

const menuItems = [
  { name: "Chat", href: "/dashboard/chat", icon: MessageSquare, color: "text-blue-600" },
  { name: "Reach", href: "/dashboard/reach", icon: Share2, color: "text-emerald-600" },
  { name: "RAG", href: "/dashboard/rag", icon: SearchIcon, color: "text-purple-600" },
  { name: "Agent Tester", href: "/dashboard/agent-tester", icon: Zap, color: "text-amber-600" },
  { name: "TCP", href: "/dashboard/tcp", icon: ClipboardList, color: "text-pink-600" },
  { name: "Consultation", href: "/dashboard/consultation", icon: Layers, color: "text-indigo-600" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-gray-200 bg-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg" />
          <h2 className="text-lg font-bold text-gray-900">A360</h2>
        </div>
        <p className="text-xs text-gray-500 ml-11">Advanced AI Demo</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <button
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all text-sm font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                {item.name}
                {isActive && <div className="ml-auto w-1 h-1 bg-blue-600 rounded-full" />}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full px-4 py-3 rounded-lg flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium">
          <Settings className="h-4 w-4 text-gray-400" />
          Settings
        </button>
      </div>
    </div>
  );
}
