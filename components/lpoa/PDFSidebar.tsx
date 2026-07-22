"use client";

import { BookOpen, Search, Settings2, ShieldAlert, HelpCircle } from "lucide-react";
import { activeDevice } from "../../lib/lpoa/devices/gentlemax-pro";

export type NavItem = "index" | "search" | "settings" | "safety" | "faqs";

const PDF_NAME = activeDevice.manual.name;
const PDF_VERSION = activeDevice.manual.revision || "";

const navItems: { id: NavItem; label: string; icon: React.ReactNode }[] = [
  { id: "index", label: "Manual Index", icon: <BookOpen size={16} /> },
  { id: "search", label: "Assistant", icon: <Search size={16} /> },
  { id: "settings", label: "Settings Builder", icon: <Settings2 size={16} /> },
  { id: "safety", label: "Safety", icon: <ShieldAlert size={16} /> },
  { id: "faqs", label: "FAQs", icon: <HelpCircle size={16} /> },
];

interface PDFSidebarProps {
  active: NavItem;
  onChange: (item: NavItem) => void;
}

export function PDFSidebar({ active, onChange }: PDFSidebarProps) {
  return (
    <aside
      style={{ width: 250, minWidth: 250 }}
      className="h-full flex flex-col border-r border-border bg-sidebar"
    >
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span style={{ color: "var(--primary-foreground)", fontSize: 12 }}>
              Rx
            </span>
          </div>
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--sidebar-foreground)",
                lineHeight: 1.2,
              }}
            >
              {activeDevice.branding.name}
            </p>
            <p
              style={{
                fontSize: 11,
                color: "var(--muted-foreground)",
                lineHeight: 1.2,
              }}
            >
              {activeDevice.branding.subtitle}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "var(--muted-foreground)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            paddingLeft: 8,
            marginBottom: 6,
          }}
        >
          Navigation
        </p>
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex items-center gap-2.5 w-full text-left rounded-md transition-colors"
              style={{
                padding: "7px 10px",
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive
                  ? "var(--sidebar-foreground)"
                  : "var(--muted-foreground)",
                background: isActive ? "var(--sidebar-accent)" : "transparent",
              }}
            >
              <span
                style={{
                  color: isActive
                    ? "var(--primary)"
                    : "var(--muted-foreground)",
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-border">
        <p style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
          {PDF_NAME}
          {PDF_VERSION ? ` ${PDF_VERSION}` : ""}
        </p>
      </div>
    </aside>
  );
}
