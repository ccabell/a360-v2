"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Zap,
  FlaskConical,
  Stethoscope,
  Link2,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  BookOpen,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  brand_name: string | null;
  kind: string;
  regulatory_status: string | null;
  description: string | null;
  indications: string | null;
  fda_approved_areas: string | null;
  contraindications: string | null;
  warnings: string | null;
  side_effects: string | null;
  onset_time: string | null;
  duration_of_effect: string | null;
  social_downtime: string | null;
  manufacturer: { id: string; name: string } | null;
}

interface FuelDoc {
  status: string;
  updated_at: string;
  schema_version: string | null;
  content: string | null;
}

interface EvidenceLink {
  id: string;
  label: string;
  url: string;
  source_type: string | null;
  evidence_tier: string | null;
  notes: string | null;
}

interface NamedItem { id: string; name: string }

interface ProductDetail {
  product: Product;
  fuel: FuelDoc | null;
  evidence: EvidenceLink[];
  anatomy: NamedItem[];
  concerns: NamedItem[];
  relationships: Array<{ relationship_type: string; notes: string | null; related: { id: string; name: string } | null }>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const EVIDENCE_TIER_COLOR: Record<string, string> = {
  FDA: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  PubMed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  manufacturer: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  industry: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  clinical_trial: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

const TABS = [
  { id: "intelligence", label: "Agent Intelligence", icon: Zap },
  { id: "overview", label: "Product Overview", icon: BookOpen },
  { id: "evidence", label: "Evidence", icon: FlaskConical },
  { id: "coverage", label: "Coverage Map", icon: Stethoscope },
];

// ── Markdown components ───────────────────────────────────────────────────────

const mdComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-xl font-bold text-foreground mt-8 mb-3 pb-2 border-b border-border first:mt-0">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-base font-semibold text-foreground mt-6 mb-2 pl-3 border-l-2 border-primary">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-sm font-semibold text-foreground/90 mt-4 mb-1.5">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-foreground/80 leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-1 mb-3 text-sm text-foreground/80">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-1 mb-3 text-sm text-foreground/80">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-muted/60">{children}</thead>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-3 py-2 text-left font-semibold text-foreground/80 text-xs uppercase tracking-wide border-b border-border">{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-3 py-2 text-foreground/75 border-b border-border/50">{children}</td>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground text-sm mb-3">{children}</blockquote>
  ),
  code: ({ inline, children }: { inline?: boolean; children: React.ReactNode }) =>
    inline ? (
      <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground/90">{children}</code>
    ) : (
      <pre className="bg-muted rounded-lg p-4 overflow-x-auto mb-3 text-xs font-mono"><code>{children}</code></pre>
    ),
  hr: () => <hr className="border-border my-6" />,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("intelligence");

  useEffect(() => {
    fetch(`/api/global-library/products/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d as ProductDetail);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-muted-foreground text-sm">Loading product…</div>
      </div>
    );
  }

  if (!data?.product) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
        <AlertCircle className="h-8 w-8" />
        <p className="text-sm">Product not found.</p>
        <button onClick={() => router.back()} className="text-xs text-primary hover:underline">Go back</button>
      </div>
    );
  }

  const { product, fuel, evidence, anatomy, concerns, relationships } = data;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="shrink-0 border-b border-border bg-background/95 backdrop-blur px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <button
            onClick={() => router.push("/dashboard/global-library")}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-3 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Global Library
          </button>

          {/* Product identity */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                {product.brand_name ?? product.name}
              </h1>
              {product.brand_name && product.brand_name !== product.name && (
                <p className="text-sm text-muted-foreground mt-0.5">{product.name}</p>
              )}
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                {product.manufacturer?.name && (
                  <span className="text-xs text-muted-foreground">{product.manufacturer.name}</span>
                )}
                {product.regulatory_status && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full capitalize">
                    {product.regulatory_status.replace("_", " ")}
                  </span>
                )}
                {fuel?.status === "active" && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                    <Zap className="h-3 w-3" />
                    Agent Intelligence Active
                  </span>
                )}
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex gap-3 shrink-0">
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{evidence.length}</p>
                <p className="text-[0.6rem] text-muted-foreground uppercase tracking-wide">Evidence</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{anatomy.length}</p>
                <p className="text-[0.6rem] text-muted-foreground uppercase tracking-wide">Areas</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{concerns.length}</p>
                <p className="text-[0.6rem] text-muted-foreground uppercase tracking-wide">Concerns</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b border-border -mb-4">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6">
        <div className="max-w-4xl mx-auto">

          {/* ── Intelligence Tab ── */}
          {activeTab === "intelligence" && (
            <div>
              {fuel?.content ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
                        <Zap className="h-3 w-3" />
                        Active — Agent-ready
                      </span>
                      {fuel.updated_at && (
                        <span className="text-xs text-muted-foreground">
                          Updated {new Date(fuel.updated_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(fuel.content.length / 1000)}K chars · {Math.round(fuel.content.length / 4)} est. tokens
                    </span>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                      {fuel.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                  <Zap className="h-8 w-8 opacity-30" />
                  <p className="text-sm">No agent intelligence document for this product yet.</p>
                </div>
              )}
            </div>
          )}

          {/* ── Overview Tab ── */}
          {activeTab === "overview" && (
            <div className="space-y-5">
              {product.description && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Description</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{product.description}</p>
                </div>
              )}
              {product.indications && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Indications</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{product.indications}</p>
                </div>
              )}
              {product.fda_approved_areas && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">FDA-Approved Areas</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{product.fda_approved_areas}</p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                {product.onset_time && (
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs text-muted-foreground mb-1">Onset</p>
                    <p className="text-sm font-medium text-foreground">{product.onset_time}</p>
                  </div>
                )}
                {product.duration_of_effect && (
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="text-sm font-medium text-foreground">{product.duration_of_effect}</p>
                  </div>
                )}
                {product.social_downtime && (
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs text-muted-foreground mb-1">Downtime</p>
                    <p className="text-sm font-medium text-foreground">{product.social_downtime}</p>
                  </div>
                )}
              </div>

              {product.contraindications && (
                <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/10 p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-2">Contraindications</h3>
                  <p className="text-sm text-amber-800 dark:text-amber-300/80 leading-relaxed">{product.contraindications}</p>
                </div>
              )}
              {product.warnings && (
                <div className="rounded-xl border border-red-200 dark:border-red-800/40 bg-red-50 dark:bg-red-900/10 p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-red-700 dark:text-red-400 mb-2">Warnings</h3>
                  <p className="text-sm text-red-800 dark:text-red-300/80 leading-relaxed">{product.warnings}</p>
                </div>
              )}

              {relationships.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Related Products</h3>
                  <div className="space-y-2">
                    {relationships.map((r, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded capitalize shrink-0">
                          {r.relationship_type?.replace(/_/g, " ")}
                        </span>
                        <span className="text-sm text-foreground/80">{r.related?.name ?? "—"}</span>
                        {r.notes && (
                          <span className="text-xs text-muted-foreground truncate">· {r.notes}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Evidence Tab ── */}
          {activeTab === "evidence" && (
            <div>
              {evidence.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                  <FlaskConical className="h-8 w-8 opacity-30" />
                  <p className="text-sm">No evidence links for this product yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground mb-2">{evidence.length} source{evidence.length !== 1 ? "s" : ""}</p>
                  {evidence.map((e) => {
                    const tierColor = e.evidence_tier
                      ? EVIDENCE_TIER_COLOR[e.evidence_tier] ?? "bg-muted text-muted-foreground"
                      : "bg-muted text-muted-foreground";
                    return (
                      <a
                        key={e.id}
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:bg-muted/30 transition-all group"
                      >
                        <Link2 className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {e.evidence_tier && (
                              <span className={`text-[0.6rem] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${tierColor}`}>
                                {e.evidence_tier}
                              </span>
                            )}
                            {e.source_type && (
                              <span className="text-[0.6rem] text-muted-foreground uppercase tracking-wide">
                                {e.source_type}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                            {e.label}
                          </p>
                          {e.notes && (
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{e.notes}</p>
                          )}
                          <p className="text-xs text-muted-foreground/50 mt-1 truncate">{e.url}</p>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0 group-hover:text-primary transition-colors" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── Coverage Map Tab ── */}
          {activeTab === "coverage" && (
            <div className="space-y-5">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Stethoscope className="h-3.5 w-3.5" />
                  Anatomy Areas ({anatomy.length})
                </h3>
                {anatomy.length === 0 ? (
                  <p className="text-sm text-muted-foreground/60">No anatomy areas mapped.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {anatomy.map((a) => (
                      <span key={a.id} className="text-xs bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 px-2.5 py-1 rounded-full">
                        {a.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" />
                  Patient Concerns ({concerns.length})
                </h3>
                {concerns.length === 0 ? (
                  <p className="text-sm text-muted-foreground/60">No concerns mapped.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {concerns.map((c) => (
                      <span key={c.id} className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full">
                        {c.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Coverage summary */}
              <div className="rounded-xl border border-border bg-muted/30 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Intelligence Summary</h3>
                <div className="space-y-2">
                  {[
                    { label: "Agent Intelligence Doc", value: fuel?.status === "active" ? "Active ✓" : "Missing", ok: fuel?.status === "active" },
                    { label: "Evidence Links", value: `${evidence.length} sources`, ok: evidence.length > 0 },
                    { label: "Anatomy Coverage", value: `${anatomy.length} areas`, ok: anatomy.length > 0 },
                    { label: "Concern Mapping", value: `${concerns.length} concerns`, ok: concerns.length > 0 },
                    { label: "Product Relationships", value: `${relationships.length} linked`, ok: relationships.length > 0 },
                  ].map(({ label, value, ok }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className={`text-sm font-medium ${ok ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/50"}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
