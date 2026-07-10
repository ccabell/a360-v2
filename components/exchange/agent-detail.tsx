"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Check,
  ArrowRight,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Plug,
  Download,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { ExchangeAgent } from "@/lib/exchange/agents";

export function AgentDetail({ agent }: { agent: ExchangeAgent }) {
  const shots = agent.screenshots ?? [];
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  const go = React.useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i === null || shots.length === 0
          ? i
          : (i + dir + shots.length) % shots.length,
      ),
    [shots.length],
  );

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, go]);

  return (
    <div className="min-h-svh bg-background">
      {/* Header band */}
      <div className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(110%_110%_at_0%_-30%,var(--primary)_0%,transparent_50%)] opacity-[0.14]"
        />
        <div className="mx-auto max-w-5xl px-6 pb-8 pt-6">
          <Link
            href="/exchange"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Agent Exchange
          </Link>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
              {agent.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={agent.logo}
                  alt={`${agent.name} logo`}
                  className="size-full object-contain p-2"
                />
              ) : (
                <span className="font-heading text-3xl font-bold text-primary">
                  {agent.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {agent.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{agent.publisher}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2.5 text-sm">
                {agent.verified && (
                  <Badge className="gap-1 border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="size-3.5" />
                    A360 Verified
                  </Badge>
                )}
                {agent.badges?.map((b) => (
                  <Badge key={b} className="bg-primary/10 text-primary">
                    {b}
                  </Badge>
                ))}
                <span className="inline-flex items-center gap-1.5">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{agent.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({agent.reviews})</span>
                </span>
                <Badge variant="secondary">{agent.category}</Badge>
                <Badge className="bg-primary/10 text-primary [a]:hover:bg-primary/20">
                  {agent.price}
                </Badge>
                {agent.installCount && (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Download className="size-3.5" />
                    {agent.installCount}
                  </span>
                )}
              </div>
              {agent.emrCompatibility && agent.emrCompatibility.length > 0 && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Plug className="size-3.5" />
                  Works with {agent.emrCompatibility.join(", ")}
                </p>
              )}
            </div>

            <div className="shrink-0">
              {agent.href ? (
                <a
                  href={agent.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
                >
                  Launch live demo
                  <ArrowUpRight className="size-4" />
                </a>
              ) : (
                <Button size="lg" className="w-full sm:w-auto">
                  Request access
                  <ArrowRight className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot gallery — always visible */}
      {agent.screenshots.length > 0 && (
        <div className="border-b bg-muted/20">
          <div className="mx-auto max-w-5xl px-6 py-6">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {agent.screenshots.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group/shot relative aspect-[16/10] w-[320px] shrink-0 cursor-zoom-in overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring sm:w-[360px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${agent.name} screenshot ${i + 1}`}
                    className="size-full object-cover object-top transition-transform duration-300 group-hover/shot:scale-[1.03]"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px]">
          <div className="min-w-0">
            <Tabs defaultValue="overview" className="gap-6">
              <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="usecases">Use Cases</TabsTrigger>
                {agent.agentReviews && agent.agentReviews.length > 0 && (
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                )}
                <TabsTrigger value="updates">Updates</TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="space-y-8">
                <section>
                  <p className="text-[15px] leading-relaxed text-foreground/90">
                    {agent.description}
                  </p>
                </section>

                {/* KPI proof strip */}
                {agent.kpis && agent.kpis.length > 0 && (
                  <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {agent.kpis.map((k) => (
                      <div
                        key={k.label}
                        className="rounded-xl border bg-card p-4"
                      >
                        <p className="font-heading text-xl font-semibold text-primary">
                          {k.value}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{k.label}</p>
                      </div>
                    ))}
                  </section>
                )}

                <section>
                  <SectionLabel>Key features</SectionLabel>
                  <ul className="mt-3.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {agent.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Integrations & data — the API / integration transparency box */}
                {(agent.emrCompatibility?.length ||
                  agent.integrations?.length ||
                  agent.dataFields) && (
                  <section className="rounded-xl border bg-card p-5">
                    <SectionLabel>Integrations &amp; data</SectionLabel>
                    {agent.integrationDepth && (
                      <p className="mt-2 text-sm">
                        <span className="text-muted-foreground">Integration depth: </span>
                        <span className="font-medium">{agent.integrationDepth}</span>
                      </p>
                    )}
                    {agent.emrCompatibility?.length ? (
                      <div className="mt-3">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          Works with
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {agent.emrCompatibility.map((e) => (
                            <Badge key={e} variant="outline" className="font-normal">
                              {e}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {agent.integrations?.length ? (
                      <div className="mt-3">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          Connects to
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {agent.integrations.map((i) => (
                            <Badge key={i.name} variant="outline" className="font-normal">
                              {i.name}
                              {i.type ? (
                                <span className="ml-1 text-muted-foreground">· {i.type}</span>
                              ) : null}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {agent.dataFields && (
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {agent.dataFields.reads?.length ? (
                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                              Reads
                            </p>
                            <ul className="mt-1.5 space-y-1">
                              {agent.dataFields.reads.map((r) => (
                                <li key={r} className="text-sm text-foreground/90">
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {agent.dataFields.writes?.length ? (
                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                              Writes
                            </p>
                            <ul className="mt-1.5 space-y-1">
                              {agent.dataFields.writes.map((w) => (
                                <li key={w} className="text-sm text-foreground/90">
                                  {w}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    )}
                    {agent.dataFields?.retention && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        {agent.dataFields.retention}
                      </p>
                    )}
                  </section>
                )}

                {/* Pricing */}
                {agent.pricingTiers && agent.pricingTiers.length > 0 && (
                  <section>
                    <SectionLabel>Pricing</SectionLabel>
                    <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {agent.pricingTiers.map((t) => (
                        <div
                          key={t.name}
                          className="rounded-xl border bg-card p-5"
                        >
                          <p className="font-heading text-sm font-semibold">{t.name}</p>
                          <p className="mt-1">
                            <span className="font-heading text-2xl font-semibold">
                              {t.price}
                            </span>
                            {t.note ? (
                              <span className="ml-1 text-xs text-muted-foreground">
                                {t.note}
                              </span>
                            ) : null}
                          </p>
                          <ul className="mt-3 space-y-1.5">
                            {t.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-sm">
                                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Pricing shown is illustrative demo data.
                    </p>
                  </section>
                )}
              </TabsContent>

              {/* Use Cases */}
              <TabsContent value="usecases" className="space-y-3">
                {agent.useCases.map((uc) => (
                  <div
                    key={uc.label}
                    className="rounded-xl border bg-card p-4"
                  >
                    <h3 className="font-heading text-sm font-semibold">{uc.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {uc.description}
                    </p>
                  </div>
                ))}
              </TabsContent>

              {/* Reviews */}
              {agent.agentReviews && agent.agentReviews.length > 0 && (
                <TabsContent value="reviews" className="space-y-3">
                  {agent.agentReviews.map((r, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border bg-card p-4"
                    >
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "size-3.5",
                              i < r.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30",
                            )}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-foreground/90">&ldquo;{r.quote}&rdquo;</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {r.author}
                        {r.role ? ` · ${r.role}` : ""}
                      </p>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground">
                    Reviews are demo placeholder data.
                  </p>
                </TabsContent>
              )}

              {/* Updates */}
              <TabsContent value="updates" className="space-y-3">
                {agent.updates.map((u) => (
                  <div key={u.title} className="rounded-xl border bg-card p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-heading text-sm font-semibold">{u.title}</h3>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {u.date}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{u.description}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:border-l lg:pl-6">
            <InfoBlock label="Developer" value={agent.developer} />
            <InfoBlock label="Category" value={agent.category} />
            {agent.integrationDepth && (
              <InfoBlock label="Integration" value={`${agent.integrationDepth} · EMR`} />
            )}
            <InfoBlock label="Size" value={agent.size} />
            <InfoBlock label="Last updated" value={agent.lastUpdate} />
            {agent.verified && (
              <InfoBlock
                label="Compliance"
                value={`A360 Verified${agent.verifiedDate ? ` · ${agent.verifiedDate}` : ""}`}
              />
            )}

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Tags
              </h3>
              <div className="mt-2 space-y-3">
                {agent.tagGroups.map((g) => (
                  <div key={g.category}>
                    <p className="text-[11px] font-medium text-muted-foreground">
                      {g.category}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {g.items.map((t) => (
                        <Badge key={t} variant="outline" className="font-normal">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && shots[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-5" />
          </button>

          {shots.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shots[lightbox]}
              alt={`${agent.name} screenshot ${lightbox + 1}`}
              className="max-h-[84vh] max-w-[min(1100px,92vw)] cursor-default rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
            />
            {shots.length > 1 && (
              <div className="text-xs font-medium text-white/70">
                {lightbox + 1} / {shots.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Section eyebrow with the A360 brand hairline motif — a short brand-blue
 * segment leading an uppercase label. Ties every section to the brand guide's
 * "colored leading segment + thin rule" design language.
 */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-3.5 w-0.5 rounded-full bg-primary" />
      <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {children}
      </h2>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </h3>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}
