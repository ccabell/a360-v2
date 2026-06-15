"use client";

import { FileText, Package, FlaskConical, ListChecks } from "lucide-react";

const SECTIONS = [
  { id: "summary", label: "Executive Summary", Icon: FileText },
  { id: "packages", label: "Package Recommendation", Icon: Package },
  { id: "evidence", label: "Clinical Evidence", Icon: FlaskConical },
  { id: "next-steps", label: "Next Steps", Icon: ListChecks },
] as const;

interface ReportSectionNavProps {
  activeSection?: string;
}

export function ReportSectionNav({ activeSection }: ReportSectionNavProps) {
  function scrollTo(id: string) {
    document.getElementById(`report-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <nav className="sticky top-0 z-10 flex gap-1 overflow-x-auto rounded-xl border border-border bg-card/80 p-1 backdrop-blur-sm">
      {SECTIONS.map(({ id, label, Icon }) => {
        const active = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
