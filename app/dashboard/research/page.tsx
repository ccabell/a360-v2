"use client";

import { useState } from "react";
import { Telescope, Search, BookOpen, Microscope, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ResearchChat } from "@/components/research/research-chat";

const SOURCE_FILTERS = [
  { id: "pubmed", label: "PubMed", icon: Microscope, count: "35.7K" },
  { id: "podcast", label: "Podcast", icon: Mic, count: "202K" },
  { id: "fuel", label: "GL Fuel Docs", icon: BookOpen, count: "425" },
];

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [activeSources, setActiveSources] = useState<string[]>(["pubmed", "podcast", "fuel"]);

  function toggleSource(id: string) {
    setActiveSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) setActiveQuery(query.trim());
  }

  function clearSearch() {
    setQuery("");
    setActiveQuery("");
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="shrink-0 border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Telescope className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-none text-foreground">Research</h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Multi-source retrieval with grounded, clickable citations
              </p>
            </div>
            <Badge variant="secondary" className="ml-auto">Live</Badge>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across PubMed, podcasts, and GL fuel docs…"
              className="pl-9 pr-24 h-10 text-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {query && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={clearSearch}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
              <Button type="submit" size="sm" className="h-7 px-3 text-xs" disabled={!query.trim()}>
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Body: two-column layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: source filters */}
        <div className="w-56 shrink-0 border-r border-border px-4 py-5 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Sources
          </p>
          <div className="space-y-1">
            {SOURCE_FILTERS.map((s) => {
              const isActive = activeSources.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSource(s.id)}
                  className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors text-left ${
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <s.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1 text-xs font-medium">{s.label}</span>
                  <span className="text-xs tabular-nums text-muted-foreground/70">
                    {s.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Active
            </p>
            <p className="text-xs text-muted-foreground">
              {activeSources.length === 0
                ? "No sources selected"
                : `${activeSources.length} of ${SOURCE_FILTERS.length} sources`}
            </p>
            {activeSources.length > 0 && activeSources.length < SOURCE_FILTERS.length && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-7 text-xs px-2 w-full justify-start text-muted-foreground"
                onClick={() => setActiveSources(SOURCE_FILTERS.map((s) => s.id))}
              >
                Reset all
              </Button>
            )}
          </div>
        </div>

        {/* Right: synthesis / chat panel */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {activeQuery ? (
            <div className="shrink-0 border-b border-border px-5 py-2.5 flex items-center gap-2">
              <p className="text-xs text-muted-foreground">Results for</p>
              <Badge variant="secondary" className="text-xs font-medium">
                {activeQuery}
              </Badge>
              <button
                onClick={clearSearch}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            </div>
          ) : null}

          <div className="flex-1 min-h-0">
            <ResearchChat />
          </div>
        </div>
      </div>
    </div>
  );
}
