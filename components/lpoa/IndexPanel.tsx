"use client";

import { ChevronRight, Hash, FileText, Loader2 } from "lucide-react";
import type { OutlineSection } from "../../lib/usePDFData";

interface IndexPanelProps {
  outline: OutlineSection[];
  isLoaded: boolean;
  onJumpToPage: (page: number) => void;
}

function SectionRow({
  section,
  onJumpToPage,
}: {
  section: OutlineSection;
  onJumpToPage: (p: number) => void;
}) {
  return (
    <div>
      <button
        onClick={() => onJumpToPage(section.page)}
        className="w-full flex items-center justify-between group rounded transition-colors"
        style={{
          padding:
            section.level === 0
              ? "6px 12px"
              : `4px 12px 4px ${12 + section.level * 14}px`,
          textAlign: "left",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--accent)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          {section.level === 0 && (
            <Hash
              size={11}
              style={{ color: "var(--muted-foreground)", flexShrink: 0 }}
            />
          )}
          <span
            className="truncate"
            style={{
              fontSize: section.level === 0 ? 13 : 12,
              fontWeight: section.level === 0 ? 500 : 400,
              color:
                section.level === 0
                  ? "var(--foreground)"
                  : "var(--muted-foreground)",
            }}
          >
            {section.title}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
            p.{section.page}
          </span>
          <ChevronRight
            size={12}
            style={{ color: "var(--muted-foreground)", opacity: 0 }}
            className="group-hover:opacity-100 transition-opacity"
          />
        </div>
      </button>

      {section.children?.map((child) => (
        <SectionRow
          key={child.id}
          section={child}
          onJumpToPage={onJumpToPage}
        />
      ))}
    </div>
  );
}

export function IndexPanel({
  outline,
  isLoaded,
  onJumpToPage,
}: IndexPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border">
        <h2
          style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}
        >
          Document Index
        </h2>
        <p
          style={{
            fontSize: 12,
            color: "var(--muted-foreground)",
            marginTop: 2,
          }}
        >
          {!isLoaded
            ? "Extracting table of contents…"
            : outline.length > 0
              ? "Click any section to navigate the PDF"
              : "No index found in this PDF"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {/* Loading */}
        {!isLoaded && (
          <div
            className="flex flex-col items-center justify-center gap-3 py-12"
            style={{ color: "var(--muted-foreground)" }}
          >
            <Loader2 size={20} className="animate-spin" />
            <p style={{ fontSize: 12 }}>Scanning PDF for table of contents…</p>
          </div>
        )}

        {/* Populated index */}
        {isLoaded && outline.length > 0 && (
          <>
            {outline.map((section) => (
              <SectionRow
                key={section.id}
                section={section}
                onJumpToPage={onJumpToPage}
              />
            ))}
          </>
        )}

        {/* No index found */}
        {isLoaded && outline.length === 0 && (
          <div
            className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center"
            style={{ color: "var(--muted-foreground)" }}
          >
            <FileText size={32} style={{ opacity: 0.3 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 500 }}>No index found</p>
              <p style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>
                This PDF has no bookmarks and no recognisable Table of Contents
                page.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
