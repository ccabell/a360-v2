"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Search, Loader2, ChevronDown, ListTree } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "#F5A623";

interface LibraryItem {
  id: string;
  title: string;
  fuelType: string;
  category: string;
  order: number;
  targetType: string | null;
  updatedAt: string | null;
}

const CATEGORY_ORDER = ["Products", "Concerns", "Anatomy", "Pairings", "Categories", "Sales coaching", "Marketing"];

function slug(s: string): string {
  return s.toLowerCase().trim().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function childText(c: React.ReactNode): string {
  if (typeof c === "string" || typeof c === "number") return String(c);
  if (Array.isArray(c)) return c.map(childText).join("");
  if (c && typeof c === "object" && "props" in c) return childText((c as { props: { children: React.ReactNode } }).props.children);
  return "";
}

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [search, setSearch] = useState("");
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDoc, setLoadingDoc] = useState(false);
  const cache = useRef<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/library")
      .then((r) => r.json())
      .then((j: { items: LibraryItem[] }) => {
        const list = j.items ?? [];
        setItems(list);
        // Deep-link support: /dashboard/library?doc=<id> (used by citation links)
        const docParam = new URLSearchParams(window.location.search).get("doc");
        const linked = docParam ? list.find((i) => i.id === docParam) : undefined;
        const hero = linked ?? list.find((i) => i.fuelType === "product_fuel") ?? list[0];
        if (hero) setSelectedId(hero.id);
      })
      .catch(() => setItems([]))
      .finally(() => setLoadingList(false));
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    // Keep the URL shareable without triggering a navigation
    const url = new URL(window.location.href);
    if (url.searchParams.get("doc") !== selectedId) {
      url.searchParams.set("doc", selectedId);
      window.history.replaceState(null, "", url.toString());
    }
    if (cache.current[selectedId] != null) { setMarkdown(cache.current[selectedId]); return; }
    setLoadingDoc(true);
    fetch(`/api/library/${selectedId}`)
      .then((r) => r.json())
      .then((j: { markdown?: string }) => { const md = j.markdown ?? ""; cache.current[selectedId] = md; setMarkdown(md); })
      .catch(() => setMarkdown(""))
      .finally(() => setLoadingDoc(false));
  }, [selectedId]);

  const selected = items.find((i) => i.id === selectedId) ?? null;

  const grouped = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = items.filter((i) => !q || i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    const by: Record<string, LibraryItem[]> = {};
    for (const i of filtered) (by[i.category] ??= []).push(i);
    const order = [...CATEGORY_ORDER, ...Object.keys(by).filter((c) => !CATEGORY_ORDER.includes(c))];
    return order.filter((c) => by[c]?.length).map((c) => ({ category: c, items: by[c].sort((a, b) => a.title.localeCompare(b.title)) }));
  }, [items, search]);

  const toc = useMemo(() => {
    return [...markdown.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim()).filter(Boolean).slice(0, 60);
  }, [markdown]);

  return (
    <div className="p-8">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">Library</h1>
        <p className="text-sm text-muted-foreground">{items.length} agent intelligence documents — grounded in literature, manufacturer data, and expert Intelligence.</p>
      </div>

      <div className="grid gap-6 lg:gap-8 md:grid-cols-[270px_minmax(0,1fr)]">
        {/* Index */}
        <div className="md:sticky md:top-4 self-start">
          <div className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 mb-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search the Library…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          {loadingList ? (
            <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
          ) : (
            <div className="max-h-[74vh] overflow-y-auto pr-1 space-y-4">
              {grouped.map((g) => (
                <div key={g.category}>
                  <div className="mb-1 ml-1 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{g.category}</span>
                    <span className="text-[10px] text-muted-foreground">{g.items.length}</span>
                  </div>
                  <div className="space-y-0.5">
                    {g.items.map((it) => {
                      const on = it.id === selectedId;
                      return (
                        <button key={it.id} onClick={() => setSelectedId(it.id)}
                          className={cn("w-full text-left rounded-lg px-2.5 py-1.5 text-sm transition-colors", on ? "font-medium" : "text-muted-foreground hover:bg-muted/50")}
                          style={on ? { background: "rgba(245,166,35,0.12)", color: "#3d2c06" } : undefined}>
                          {it.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {grouped.length === 0 && <p className="px-1 text-sm text-muted-foreground">No matches.</p>}
            </div>
          )}
        </div>

        {/* Document */}
        <div className="min-w-0">
          {loadingDoc && !markdown ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin mr-2" /> Opening document…</div>
          ) : selected ? (
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-md px-2 py-0.5 text-[11px] font-medium" style={{ background: "rgba(245,166,35,0.14)", color: "#9a6207" }}>{selected.category}</span>
                {selected.updatedAt && <span className="text-[11px] text-muted-foreground">Updated {new Date(selected.updatedAt).toLocaleDateString()}</span>}
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{selected.title}</h2>

              {toc.length > 2 && (
                <details className="mb-5 rounded-xl border border-border bg-muted/20">
                  <summary className="flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground list-none">
                    <ListTree className="h-4 w-4" style={{ color: ACCENT }} /> On this page
                    <span className="ml-auto text-[11px] text-muted-foreground">{toc.length} sections</span>
                    <ChevronDown className="h-4 w-4" />
                  </summary>
                  <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                    {toc.map((h, i) => (
                      <a key={i} href={`#${slug(h)}`}
                        className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {h}
                      </a>
                    ))}
                  </div>
                </details>
              )}

              <div className="md-doc">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD}>{markdown}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Select a document.</p>
          )}
        </div>
      </div>
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
