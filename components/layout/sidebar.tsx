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
    <div className="w-64 border-r border-gray-200 bg-white p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">A360</h2>
        <p className="text-xs text-gray-500">Advanced AI Demo</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
                size="sm"
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}
