"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Library,
  Search,
  ChevronRight,
  CheckCircle2,
  Circle,
  FlaskConical,
  Stethoscope,
  Zap,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface GLProduct {
  id: string;
  name: string;
  brand_name: string | null;
  kind: string;
  regulatory_status: string | null;
  is_active: boolean;
  description: string | null;
  indications: string | null;
  manufacturer_name: string | null;
  fuel_status: string | null;
  fuel_updated_at: string | null;
  evidence_count: number;
  anatomy_count: number;
  concern_count: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const REGULATORY_LABEL: Record<string, string> = {
  prescription: "Rx",
  medical_device: "Device",
  otc: "OTC",
};

const REGULATORY_COLOR: Record<string, string> = {
  prescription: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  medical_device: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  otc: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
};

function CoveragePip({ filled, label }: { filled: boolean; label: string }) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      {filled ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
      ) : (
        <Circle className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
      )}
      {label}
    </span>
  );
}

function ProductCard({ product, onClick }: { product: GLProduct; onClick: () => void }) {
  const regLabel = product.regulatory_status
    ? REGULATORY_LABEL[product.regulatory_status] ?? product.regulatory_status
    : null;
  const regColor = product.regulatory_status
    ? REGULATORY_COLOR[product.regulatory_status] ?? "bg-muted text-muted-foreground"
    : null;

  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-border bg-card p-5 text-left hover:border-primary/40 hover:shadow-sm transition-all duration-150 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight truncate">
            {product.brand_name ?? product.name}
          </p>
          {product.brand_name && product.brand_name !== product.name && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{product.name}</p>
          )}
          {product.manufacturer_name && (
            <p className="text-xs text-muted-foreground/60 mt-0.5 truncate">
              {product.manufacturer_name}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {regLabel && regColor && (
            <span className={`text-[0.6rem] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-md ${regColor}`}>
              {regLabel}
            </span>
          )}
          <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
        </div>
      </div>

      {/* Intelligence status */}
      <div className="flex items-center gap-1.5">
        {product.fuel_status === "active" ? (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <Zap className="h-3 w-3" />
            Agent Intelligence
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-muted-foreground/50">
            <Zap className="h-3 w-3" />
            No intelligence doc
          </span>
        )}
      </div>

      {/* Coverage indicators */}
      <div className="grid grid-cols-3 gap-1 pt-1 border-t border-border/50">
        <CoveragePip filled={product.evidence_count > 0} label={`${product.evidence_count} evidence`} />
        <CoveragePip filled={product.anatomy_count > 0} label={`${product.anatomy_count} areas`} />
        <CoveragePip filled={product.concern_count > 0} label={`${product.concern_count} concerns`} />
      </div>
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GlobalLibraryPage() {
  const router = useRouter();
  const [products, setProducts] = useState<GLProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterReg, setFilterReg] = useState<string>("all");

  useEffect(() => {
    fetch("/api/global-library/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.brand_name ?? "").toLowerCase().includes(q) ||
      (p.manufacturer_name ?? "").toLowerCase().includes(q) ||
      (p.indications ?? "").toLowerCase().includes(q);
    const matchReg =
      filterReg === "all" || p.regulatory_status === filterReg || (!p.regulatory_status && filterReg === "none");
    return matchSearch && matchReg;
  });

  const withIntelligence = products.filter((p) => p.fuel_status === "active").length;
  const withEvidence = products.filter((p) => p.evidence_count > 0).length;
  const withAnatomy = products.filter((p) => p.anatomy_count > 0).length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="shrink-0 border-b border-border bg-background/95 backdrop-blur px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <Library className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground leading-none">
                Global Library
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Clinical intelligence layer · {products.length} products · Agent-ready knowledge base
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-500" />
                <div>
                  <p className="text-lg font-bold text-foreground leading-none">{withIntelligence}/{products.length}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Agent Intelligence docs</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-lg font-bold text-foreground leading-none">{withEvidence}/{products.length}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">With evidence links</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-violet-500" />
                <div>
                  <p className="text-lg font-bold text-foreground leading-none">{withAnatomy}/{products.length}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Anatomy mapped</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search + filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, brands, indications…"
                className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <select
              value={filterReg}
              onChange={(e) => setFilterReg(e.target.value)}
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">All types</option>
              <option value="prescription">Rx only</option>
              <option value="medical_device">Devices</option>
              <option value="none">Unclassified</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 h-36 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-sm">
              No products match your search.
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                {search && ` matching "${search}"`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onClick={() => router.push(`/dashboard/global-library/${p.id}`)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
