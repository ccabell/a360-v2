"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Zap,
  FlaskConical,
  ExternalLink,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Timer,
  CalendarClock,
  Shield,
  Link2,
  Layers,
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
  logo_path: string | null;
  manufacturer: { id: string; name: string } | null;
}

interface FuelDoc {
  status: string;
  updated_at: string;
  content: string | null;
}

interface EvidenceLink {
  id: string;
  source: string | null;
  source_reference: string | null;
  url: string | null;
  snippet: string | null;
  authority_rank: number | null;
}

interface NamedItem { id: string; name: string }

interface ProductDetail {
  product: Product;
  fuel: FuelDoc | null;
  evidence: EvidenceLink[];
  anatomy: NamedItem[];
  concerns: NamedItem[];
  relationships: Array<{
    relationship_type: string;
    clinical_rationale: string | null;
    timing_guidance: string | null;
    pairing_tier: string | null;
    related: { id: string; name: string } | null;
  }>;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const REGULATORY_BADGE: Record<string, { label: string; className: string }> = {
  prescription: { label: "Rx Prescription", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  medical_device: { label: "FDA Medical Device", className: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
  otc: { label: "OTC", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
};

const SOURCE_STYLE: Record<string, { label: string; className: string }> = {
  fda_label:   { label: "FDA Label",    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  pubmed:      { label: "PubMed",       className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  ifu:         { label: "Manufacturer", className: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
  youtube:     { label: "YouTube",      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  podcast:     { label: "Podcast",      className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  clinical_trial: { label: "Clinical Trial", className: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" },
  industry:    { label: "Industry",     className: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300" },
};

function sourceStyle(source: string | null) {
  if (!source) return { label: "Source", className: "bg-muted text-muted-foreground" };
  return SOURCE_STYLE[source] ?? { label: source, className: "bg-muted text-muted-foreground" };
}

const RELATIONSHIP_LABEL: Record<string, string> = {
  complement: "Pairs with",
  stacks_with: "Stacks with",
  compare: "Compare to",
  alternative: "Alternative to",
  contraindicated_with: "Avoid combining",
  synergistic: "Synergistic with",
};

// ── Markdown components ───────────────────────────────────────────────────────

const mdComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-lg font-bold text-foreground mt-6 mb-2 pb-2 border-b border-border first:mt-0">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-sm font-semibold text-foreground mt-5 mb-1.5 pl-3 border-l-2 border-primary">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-sm font-semibold text-foreground/90 mt-4 mb-1">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-sm text-foreground/75 leading-relaxed mb-2.5">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-1 mb-2.5 text-sm text-foreground/75">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-1 mb-2.5 text-sm text-foreground/75">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto mb-3">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-muted/60">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-3 py-2 text-left font-semibold text-foreground/80 text-xs uppercase tracking-wide border-b border-border">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-3 py-2 text-foreground/70 border-b border-border/40 text-sm">{children}</td>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground text-sm mb-2.5">{children}</blockquote>
  ),
  code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) =>
    inline ? (
      <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground/90">{children}</code>
    ) : (
      <pre className="bg-muted rounded-lg p-4 overflow-x-auto mb-3 text-xs font-mono"><code>{children}</code></pre>
    ),
  hr: () => <hr className="border-border my-4" />,
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3.5 flex items-start gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground leading-none mb-1">{label}</p>
        <p className="text-sm font-semibold text-foreground leading-snug">{value}</p>
      </div>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
      <span className="h-px flex-1 bg-border" />
      {children}
      <span className="h-px flex-1 bg-border" />
    </h2>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [agentIntelOpen, setAgentIntelOpen] = useState(false);
  const [showAllEvidence, setShowAllEvidence] = useState(false);

  useEffect(() => {
    fetch(`/api/global-library/products/${id}`)
      .then((r) => r.json())
      .then((d) => { setData(d as ProductDetail); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-muted-foreground text-sm">Loading…</div>
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
  const reg = product.regulatory_status ? REGULATORY_BADGE[product.regulatory_status] : null;

  // Featured evidence: prefer FDA label first, then pubmed, then others — show top 3
  const sorted = [
    ...evidence.filter((e) => e.source === "fda_label"),
    ...evidence.filter((e) => e.source === "pubmed"),
    ...evidence.filter((e) => e.source !== "fda_label" && e.source !== "pubmed"),
  ];
  const featuredEvidence = sorted.slice(0, 3);
  const remainingEvidence = sorted.slice(3);

  // Pairings
  const pairings = relationships.filter(
    (r) => !["compare", "alternative", "contraindicated_with"].includes(r.relationship_type)
  );
  const comparisons = relationships.filter(
    (r) => ["compare", "alternative"].includes(r.relationship_type)
  );

  const stats: Array<{ icon: React.ElementType; label: string; value: string | null }> = [
    { icon: Clock, label: "Onset", value: product.onset_time },
    { icon: Timer, label: "Duration", value: product.duration_of_effect },
    { icon: CalendarClock, label: "Downtime", value: product.social_downtime },
  ].filter((s) => s.value);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Sticky header */}
      <div className="shrink-0 border-b border-border bg-background/95 backdrop-blur px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => router.push("/dashboard/global-library")}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-3 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Global Library
          </button>

          <div className="flex items-center gap-4">
            {/* Logo placeholder — ready for when logos are added */}
            <div className="h-12 w-12 shrink-0 rounded-xl border border-border bg-muted/50 flex items-center justify-center overflow-hidden">
              {product.logo_path ? (
                <img src={product.logo_path} alt={product.brand_name ?? product.name} className="h-full w-full object-contain p-1" />
              ) : (
                <span className="text-lg font-bold text-muted-foreground/40">
                  {(product.brand_name ?? product.name).charAt(0)}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-foreground leading-tight">
                {product.brand_name ?? product.name}
              </h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {product.manufacturer?.name && (
                  <span className="text-xs text-muted-foreground">{product.manufacturer.name}</span>
                )}
                {reg && (
                  <span className={`text-[0.6rem] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${reg.className}`}>
                    {reg.label}
                  </span>
                )}
                {fuel?.status === "active" && (
                  <span className="flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                    <Zap className="h-2.5 w-2.5" />
                    Agent Intelligence Active
                  </span>
                )}
              </div>
            </div>

            {/* Quick counts */}
            <div className="flex gap-4 shrink-0 text-center">
              {[
                { n: evidence.length, label: "Sources" },
                { n: concerns.length, label: "Concerns" },
                { n: anatomy.length, label: "Areas" },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="text-xl font-bold text-foreground leading-none">{n}</p>
                  <p className="text-[0.6rem] text-muted-foreground uppercase tracking-wide mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* ── Description ── */}
          {(product.description || product.indications) && (
            <div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {product.description ?? product.indications}
              </p>
            </div>
          )}

          {/* ── At a glance stats ── */}
          {(stats.length > 0 || product.fda_approved_areas) && (
            <div>
              <SectionHeader>At a Glance</SectionHeader>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {stats.map(({ icon, label, value }) => (
                  <StatCard key={label} icon={icon} label={label} value={value!} />
                ))}
                {product.fda_approved_areas && (
                  <div className="rounded-xl border border-border bg-card px-4 py-3.5 sm:col-span-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                        <Shield className="h-3.5 w-3.5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground leading-none mb-1.5">FDA-Approved Areas</p>
                        <p className="text-sm text-foreground/80 leading-snug">{product.fda_approved_areas}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── What it treats ── */}
          {(concerns.length > 0 || anatomy.length > 0) && (
            <div>
              <SectionHeader>What It Treats</SectionHeader>
              {concerns.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-2">Patient concerns addressed</p>
                  <div className="flex flex-wrap gap-2">
                    {concerns.map((c) => (
                      <span key={c.id} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 px-2.5 py-1 rounded-full">
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {anatomy.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Treatment areas</p>
                  <div className="flex flex-wrap gap-2">
                    {anatomy.map((a) => (
                      <span key={a.id} className="text-xs bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/40 px-2.5 py-1 rounded-full">
                        {a.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Pairings ── */}
          {pairings.length > 0 && (
            <div>
              <SectionHeader>Pairs Well With</SectionHeader>
              <div className="space-y-2.5">
                {pairings.map((r, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card px-4 py-3.5 flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 mt-0.5">
                      <Layers className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-foreground">{r.related?.name ?? "—"}</p>
                        <span className="text-[0.6rem] font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">
                          {RELATIONSHIP_LABEL[r.relationship_type] ?? r.relationship_type}
                        </span>
                        {r.pairing_tier && (
                          <span className="text-[0.6rem] text-muted-foreground/60 uppercase tracking-wide">{r.pairing_tier}</span>
                        )}
                      </div>
                      {r.clinical_rationale && (
                        <p className="text-xs text-muted-foreground leading-relaxed">{r.clinical_rationale}</p>
                      )}
                      {r.timing_guidance && (
                        <p className="text-xs text-muted-foreground/60 mt-1 italic">{r.timing_guidance}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Compare / Alternatives ── */}
          {comparisons.length > 0 && (
            <div>
              <SectionHeader>Compare & Alternatives</SectionHeader>
              <div className="flex flex-wrap gap-2">
                {comparisons.map((r, i) => (
                  <div key={i} className="rounded-lg border border-border bg-card px-3 py-2 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground capitalize">{RELATIONSHIP_LABEL[r.relationship_type] ?? r.relationship_type}:</span>
                    <span className="text-xs font-medium text-foreground">{r.related?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Evidence ── */}
          {evidence.length > 0 && (
            <div>
              <SectionHeader>Evidence Foundation</SectionHeader>
              <div className="space-y-2.5">
                {featuredEvidence.map((e) => {
                  const style = sourceStyle(e.source);
                  return (
                    <a
                      key={e.id}
                      href={e.url ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5 hover:border-primary/30 hover:bg-muted/20 transition-all group"
                    >
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Link2 className="h-3.5 w-3.5 text-muted-foreground/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[0.6rem] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${style.className}`}>
                            {style.label}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                          {e.source_reference ?? "Source"}
                        </p>
                        {e.snippet && (
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{e.snippet}</p>
                        )}
                      </div>
                      {e.url && <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0 group-hover:text-primary transition-colors mt-0.5" />}
                    </a>
                  );
                })}

                {remainingEvidence.length > 0 && (
                  <div>
                    <button
                      onClick={() => setShowAllEvidence((v) => !v)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1 mb-2"
                    >
                      {showAllEvidence ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      {showAllEvidence ? "Show fewer" : `View ${remainingEvidence.length} more source${remainingEvidence.length !== 1 ? "s" : ""}`}
                    </button>
                    {showAllEvidence && (
                      <div className="space-y-2">
                        {remainingEvidence.map((e) => {
                          const style = sourceStyle(e.source);
                          return (
                            <a
                              key={e.id}
                              href={e.url ?? "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 px-4 py-2.5 hover:border-primary/30 hover:bg-muted/20 transition-all group"
                            >
                              <span className={`text-[0.6rem] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${style.className}`}>
                                {style.label}
                              </span>
                              <p className="text-xs text-foreground/80 group-hover:text-primary transition-colors flex-1 min-w-0 truncate">
                                {e.source_reference ?? "Source"}
                              </p>
                              {e.url && <ExternalLink className="h-3 w-3 text-muted-foreground/40 shrink-0" />}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Safety callouts ── */}
          {(product.contraindications || product.warnings) && (
            <div className="space-y-3">
              {product.contraindications && (
                <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/10 px-4 py-3.5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-1">Contraindications</p>
                  <p className="text-sm text-amber-800 dark:text-amber-300/80 leading-relaxed">{product.contraindications}</p>
                </div>
              )}
              {product.warnings && (
                <div className="rounded-xl border border-red-200 dark:border-red-800/40 bg-red-50 dark:bg-red-900/10 px-4 py-3.5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-red-700 dark:text-red-400 mb-1">Warnings</p>
                  <p className="text-sm text-red-800 dark:text-red-300/80 leading-relaxed">{product.warnings}</p>
                </div>
              )}
            </div>
          )}

          {/* ── Agent Intelligence (collapsed) ── */}
          {fuel?.content && (
            <div>
              <button
                onClick={() => setAgentIntelOpen((v) => !v)}
                className="w-full flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 hover:bg-muted/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">Agent Intelligence Document</p>
                    <p className="text-xs text-muted-foreground">
                      What our AI agents know about this product · {Math.round(fuel.content.length / 1000)}K chars
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                  {agentIntelOpen
                    ? <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                  }
                </div>
              </button>

              {agentIntelOpen && (
                <div className="mt-2 rounded-xl border border-border bg-card px-6 py-6">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {fuel.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          )}

          {/* ── No evidence placeholder ── */}
          {evidence.length === 0 && (
            <div className="rounded-xl border border-dashed border-border/60 px-4 py-6 text-center">
              <FlaskConical className="h-6 w-6 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No evidence links added yet for this product.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
