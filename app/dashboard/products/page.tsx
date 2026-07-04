"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Search, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { ProductCard, ProductPairing } from "@/lib/types/products";

const ACCENT = "#F5A623";

function slug(s: string): string {
  return s.toLowerCase().trim().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function childText(c: React.ReactNode): string {
  if (typeof c === "string" || typeof c === "number") return String(c);
  if (Array.isArray(c)) return c.map(childText).join("");
  if (c && typeof c === "object" && "props" in c) return childText((c as { props: { children: React.ReactNode } }).props.children);
  return "";
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((j: { products: ProductCard[] }) => {
        const list = j.products ?? [];
        setProducts(list);
        // Deep-link support: /dashboard/products?p=<id>
        const pParam = new URLSearchParams(window.location.search).get("p");
        const linked = pParam ? list.find((p) => p.id === pParam) : undefined;
        setSelectedId((linked ?? list[0])?.id ?? null);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    // Keep the URL shareable without triggering a navigation
    const url = new URL(window.location.href);
    if (url.searchParams.get("p") !== selectedId) {
      url.searchParams.set("p", selectedId);
      window.history.replaceState(null, "", url.toString());
    }
  }, [selectedId]);

  const selected = products.find((p) => p.id === selectedId) ?? null;

  const grouped = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = products.filter(
      (p) => !q || p.name.toLowerCase().includes(q) || (p.categories ?? []).some((c) => c.toLowerCase().includes(q)),
    );
    const by: Record<string, ProductCard[]> = {};
    for (const p of filtered) {
      const cat = p.categories?.[0] ?? "Other";
      (by[cat] ??= []).push(p);
    }
    return Object.keys(by)
      .sort((a, b) => a.localeCompare(b))
      .map((c) => ({ category: c, items: by[c].sort((a, b) => a.name.localeCompare(b.name)) }));
  }, [products, search]);

  return (
    <div className="p-8">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">Products</h1>
        <p className="text-sm text-muted-foreground">{products.length} products for patient consultations — selling, educating, and cross-selling in one screen.</p>
      </div>

      <div className="grid gap-6 lg:gap-8 md:grid-cols-[270px_minmax(0,1fr)]">
        {/* Index */}
        <div className="md:sticky md:top-4 self-start">
          <div className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 mb-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          {loading ? (
            <div className="space-y-4 pr-1">
              {[4, 3, 5].map((rows, g) => (
                <div key={g}>
                  <Skeleton className="mb-2 ml-1 h-3 w-20" />
                  <div className="space-y-1.5">
                    {Array.from({ length: rows }).map((_, i) => (
                      <Skeleton key={i} className="h-9 w-full rounded-lg" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-h-[74vh] overflow-y-auto pr-1 space-y-4">
              {grouped.map((g) => (
                <div key={g.category}>
                  <div className="mb-1 ml-1 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{g.category}</span>
                    <span className="text-[10px] text-muted-foreground">{g.items.length}</span>
                  </div>
                  <div className="space-y-0.5">
                    {g.items.map((p) => {
                      const on = p.id === selectedId;
                      return (
                        <button key={p.id} onClick={() => setSelectedId(p.id)}
                          className={cn("w-full text-left rounded-lg px-2.5 py-1.5 transition-colors", on ? "font-medium" : "hover:bg-muted/50")}
                          style={on ? { background: "rgba(245,166,35,0.12)", color: "#3d2c06" } : undefined}>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={cn("text-sm", on ? "" : "text-foreground")}>{p.name}</span>
                            {p.categories?.[0] && (
                              <span className="rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ background: "rgba(245,166,35,0.14)", color: "#9a6207" }}>
                                {p.categories[0]}
                              </span>
                            )}
                          </div>
                          {p.description && (
                            <div className={cn("text-xs line-clamp-1 mt-0.5", on ? "opacity-80" : "text-muted-foreground")}>{p.description}</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {grouped.length === 0 && (
                <p className="px-1 text-sm text-muted-foreground">
                  {products.length === 0 ? "No products available — the Products list couldn't be loaded." : "No matches."}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="min-w-0">
          {loading ? (
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
              <Skeleton className="mb-3 h-5 w-24 rounded-md" />
              <Skeleton className="mb-6 h-8 w-2/3" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="mt-6 h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ) : selected ? (
            <ProductDetail product={selected} onSelectPairing={(id) => setSelectedId(id)} />
          ) : (
            <p className="text-sm text-muted-foreground">Select a product.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductDetail({ product: p, onSelectPairing }: { product: ProductCard; onSelectPairing: (id: string) => void }) {
  const subtitleParts = [p.brand_name, p.generic_name].filter(Boolean);
  const stats = [
    { label: "Results in", value: p.onset_time?.display },
    { label: "Lasts", value: p.duration_of_effect?.display },
    { label: "Downtime", value: p.social_downtime?.display },
    { label: "Maintenance", value: p.min_retreatment_interval?.display },
  ].filter((s): s is { label: string; value: string } => Boolean(s.value));

  const hasTreats = (p.concerns?.length ?? 0) > 0 || (p.body_areas?.length ?? 0) > 0 || (p.does_not_solve?.length ?? 0) > 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
      {/* Header */}
      {(p.categories?.length ?? 0) > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {p.categories!.map((c) => (
            <span key={c} className="rounded-md px-2 py-0.5 text-[11px] font-medium" style={{ background: "rgba(245,166,35,0.14)", color: "#9a6207" }}>
              {c}
            </span>
          ))}
        </div>
      )}
      <h2 className="text-2xl font-semibold text-foreground">{p.name}</h2>
      {subtitleParts.length > 0 && <p className="text-sm text-muted-foreground mt-0.5">{subtitleParts.join(" · ")}</p>}
      {p.manufacturer && <p className="text-xs text-muted-foreground">{p.manufacturer}</p>}

      {p.description && <p className="text-sm leading-relaxed text-foreground/80 mt-4 mb-5">{p.description}</p>}

      {/* At a glance */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-muted/20 px-3 py-2.5">
              <div className="text-[11px] text-muted-foreground">{s.label}</div>
              <div className="text-sm font-medium text-foreground">{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Treats */}
      {hasTreats && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-2">Treats</h3>
          {(p.concerns?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {p.concerns!.map((c) => (
                <span key={c.id} className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: "rgba(245,166,35,0.12)", color: "#9a6207" }}>
                  {c.name}
                </span>
              ))}
            </div>
          )}
          {(p.body_areas?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {p.body_areas!.map((a) => (
                <span key={a.id} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                  {a.name}
                </span>
              ))}
            </div>
          )}
          {(p.does_not_solve?.length ?? 0) > 0 && (
            <div className="flex items-start gap-2 mt-2 text-sm text-foreground/80">
              <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <span>
                <span className="font-medium text-foreground">Not for:</span> {p.does_not_solve!.join(", ")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Pairs well with */}
      {(p.pairings?.length ?? 0) > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-2">Pairs well with</h3>
          <div className="space-y-2">
            {p.pairings!.map((pr) => (
              <PairingCard key={pr.partner_id} pairing={pr} onSelect={() => onSelectPairing(pr.partner_id)} />
            ))}
          </div>
        </div>
      )}

      {/* Investment */}
      {p.pricing && (
        <div className="mb-6 rounded-xl border border-border bg-muted/20 p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Investment</h3>
          {p.pricing.price_per_unit != null && (
            <p className="text-sm text-foreground">
              ${p.pricing.price_per_unit}
              {p.pricing.unit_label ? `/${p.pricing.unit_label}` : ""}
            </p>
          )}
          {(p.pricing.typical_units_low != null || p.pricing.typical_sessions != null) && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {p.pricing.typical_units_low != null && (
                <>
                  Typical: {p.pricing.typical_units_low}
                  {p.pricing.typical_units_high != null && p.pricing.typical_units_high !== p.pricing.typical_units_low
                    ? `–${p.pricing.typical_units_high}`
                    : ""}{" "}
                  units
                </>
              )}
              {p.pricing.typical_sessions != null && (
                <> over {p.pricing.typical_sessions} session{p.pricing.typical_sessions === 1 ? "" : "s"}</>
              )}
            </p>
          )}
          {p.pricing.duration_months != null && (
            <p className="text-xs text-muted-foreground mt-0.5">Plan duration: {p.pricing.duration_months} months</p>
          )}
          {p.pricing.notes && <p className="text-xs text-muted-foreground mt-2">{p.pricing.notes}</p>}
        </div>
      )}

      {/* Tabs */}
      <Tabs key={p.id} defaultValue="education">
        <TabsList variant="line">
          <TabsTrigger value="education">Patient education</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="education" className="pt-4">
          {p.patient_education_md ? (
            <div className="md-doc">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD}>{p.patient_education_md}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No patient education content yet.</p>
          )}
        </TabsContent>

        <TabsContent value="faq" className="pt-4">
          {p.faq_md ? (
            <div className="md-doc">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD}>{p.faq_md}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No FAQ content yet.</p>
          )}
        </TabsContent>

        <TabsContent value="safety" className="pt-4 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Contraindications</h4>
            {(p.contraindications?.length ?? 0) > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                {p.contraindications!.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">None listed.</p>
            )}
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Side effects</h4>
            {(p.side_effects?.length ?? 0) > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                {p.side_effects!.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">None listed.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PairingCard({ pairing, onSelect }: { pairing: ProductPairing; onSelect: () => void }) {
  const isCanonical = pairing.pairing_tier === "canonical";
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-center gap-2 mb-1">
        <button onClick={onSelect} className="text-sm font-medium hover:underline" style={isCanonical ? { color: "#9a6207" } : undefined}>
          {pairing.partner_name}
        </button>
        <span
          className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-medium", !isCanonical && "bg-muted text-muted-foreground")}
          style={isCanonical ? { background: "rgba(245,166,35,0.14)", color: "#9a6207" } : undefined}
        >
          {pairing.pairing_tier}
        </span>
      </div>
      {pairing.patient_education_text && <p className="text-sm text-foreground/80">{pairing.patient_education_text}</p>}
      {pairing.staff_talking_points && (
        <details className="mt-2">
          <summary className="cursor-pointer text-xs font-medium text-muted-foreground list-none">Staff notes</summary>
          <p className="mt-1 text-xs text-muted-foreground">{pairing.staff_talking_points}</p>
        </details>
      )}
    </div>
  );
}

const MD = {
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-lg font-semibold text-foreground mt-6 mb-2 first:mt-0" {...p} />,
  h2: ({ children, ...p }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={slug(childText(children))} className="text-base font-semibold text-foreground mt-6 mb-2 scroll-mt-4 border-t border-border/60 pt-4" {...p}>{children}</h2>
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-sm font-semibold text-foreground mt-4 mb-1" {...p} />,
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-sm leading-relaxed text-foreground/80 mb-3" {...p} />,
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80 mb-3" {...p} />,
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-5 space-y-1 text-sm text-foreground/80 mb-3" {...p} />,
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...p} />,
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-foreground" {...p} />,
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="underline" style={{ color: "#9a6207" }} target="_blank" rel="noreferrer" {...p} />,
  hr: () => <hr className="my-5 border-border" />,
  code: (p: React.HTMLAttributes<HTMLElement>) => <code className="rounded bg-muted px-1 py-0.5 text-[12px] font-mono" {...p} />,
  table: (p: React.HTMLAttributes<HTMLTableElement>) => <div className="overflow-x-auto mb-3"><table className="w-full text-xs border-collapse" {...p} /></div>,
  th: (p: React.HTMLAttributes<HTMLTableCellElement>) => <th className="border border-border px-2 py-1 text-left font-medium bg-muted/40" {...p} />,
  td: (p: React.HTMLAttributes<HTMLTableCellElement>) => <td className="border border-border px-2 py-1 align-top" {...p} />,
  blockquote: (p: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-2 pl-3 text-sm text-muted-foreground mb-3" style={{ borderColor: ACCENT }} {...p} />,
};
