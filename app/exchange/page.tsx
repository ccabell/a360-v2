"use client";

import * as React from "react";
import { Search, ShieldCheck, Activity, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AgentCard } from "@/components/exchange/agent-card";
import { AGENTS, CATEGORIES } from "@/lib/exchange/agents";

export default function ExchangePage() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("All");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return AGENTS.filter((a) => {
      const matchesCategory = category === "All" || a.category === category;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.publisher.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const chips = ["All", ...CATEGORIES];

  return (
    <div className="min-h-svh bg-background">
      {/* Top bar */}
      <nav className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-6">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-[13px] font-bold text-primary-foreground">
            A
          </div>
          <span className="font-heading text-sm font-semibold tracking-tight">
            Aesthetics<span className="text-primary">360</span>
          </span>
          <span className="ml-1 hidden text-sm text-muted-foreground sm:inline">
            / Agent Exchange
          </span>
          <div className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Intelligence Platform
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden border-b">
        {/* mesh glow */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(80%_120%_at_15%_-10%,var(--primary)_0%,transparent_45%),radial-gradient(70%_110%_at_95%_0%,var(--primary)_0%,transparent_50%)] opacity-[0.10]"
        />
        {/* dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:22px_22px] opacity-50"
        />
        {/* bottom fade so the grid dissolves into the page */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background"
        />

        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="size-3.5 text-primary" />
            Clinically grounded AI for aesthetic practices
          </div>

          <h1 className="mt-6 max-w-3xl font-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            The Agent Exchange
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A curated marketplace of AI agents that bring intelligence to every
            consultation — from clinical documentation to patient financing.
          </p>

          {/* Search */}
          <div className="mt-9 max-w-lg">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search agents by name, publisher, or capability…"
                className="h-12 rounded-xl pl-11 text-sm shadow-sm ring-1 ring-foreground/[0.03]"
              />
            </div>
          </div>

          {/* Trust line */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" />
              HIPAA-aware by design
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Activity className="size-4 text-primary" />
              Built for the consult room
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="size-4 text-primary" />
              Evidence-backed outputs
            </span>
          </div>
        </div>
      </header>

      {/* Sticky filter / nav bar — sticks under the top nav on scroll */}
      <div className="sticky top-14 z-20 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-2.5">
          {/* Compact search */}
          <div className="relative w-40 shrink-0 sm:w-56">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="h-9 pl-9 text-sm"
            />
          </div>

          {/* Scrollable category chips */}
          <div className="flex flex-1 items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <span className="hidden shrink-0 text-sm text-muted-foreground sm:block">
            {filtered.length} {filtered.length === 1 ? "agent" : "agents"}
          </span>
        </div>
      </div>

      {/* Catalog */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium">No agents match your search.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different keyword or category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
