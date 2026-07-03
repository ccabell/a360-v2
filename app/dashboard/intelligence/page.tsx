"use client";

import { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Search, Loader2, Check, BookOpen, Microscope, ShieldCheck, PlayCircle,
  Mic, Newspaper, ArrowRight, Sparkles, ExternalLink, FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "#F5A623";

// Each layer maps one or more retrieval corpora. Podcast is surfaced as
// "Expert Intelligence" — never labeled "podcast".
const LAYERS: { key: string; label: string; corpora: string[]; Icon: React.ElementType }[] = [
  { key: "library", label: "Library — fuel docs & dossiers", corpora: ["practice"], Icon: BookOpen },
  { key: "literature", label: "Clinical literature (PubMed)", corpora: ["pubmed"], Icon: Microscope },
  { key: "regulatory", label: "Manufacturer & FDA", corpora: ["fda", "manufacturer"], Icon: ShieldCheck },
  { key: "video", label: "Video Intelligence", corpora: ["youtube"], Icon: PlayCircle },
  { key: "expert", label: "Expert Intelligence", corpora: ["podcast"], Icon: Mic },
  { key: "industry", label: "Industry analysis", corpora: ["industry"], Icon: Newspaper },
];

const CORPUS_LABEL: Record<string, string> = {
  pubmed: "Literature", fda: "FDA", manufacturer: "Manufacturer",
  youtube: "Video Intelligence", podcast: "Expert Intelligence", industry: "Industry", practice: "Library",
};

const SUGGESTED = [
  "What's the evidence for combining Sculptra with HA fillers?",
  "Botox dosing for the glabellar complex, with safety considerations",
  "Best approach to nasolabial folds in a patient who wants minimal downtime",
  "How do biostimulators compare to HA fillers for midface volume?",
];

interface Citation {
  number: number; retrievalId: string; corpus: string; title: string; evidence: string; url?: string;
}
interface IntelVideo { videoId: string; title: string; url: string; thumbnailUrl: string; channel: string | null; blurb: string | null; }

type Phase = "idle" | "searching" | "answering" | "done" | "error";

export default function IntelligencePage() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [answer, setAnswer] = useState("");
  const [citations, setCitations] = useState<Citation[]>([]);
  const [displayMap, setDisplayMap] = useState<Record<string, number>>({});
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [videos, setVideos] = useState<IntelVideo[]>([]);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function run(q: string) {
    const question = q.trim();
    if (!question) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setInput(question); setPhase("searching");
    setCounts(null); setAnswer(""); setCitations([]); setDisplayMap({});
    setKeyPoints([]); setFollowUps([]); setVideos([]); setShowAllVideos(false); setError(null);

    // full video gallery (parallel, independent)
    fetch("/api/intelligence/videos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: question }), signal: ac.signal })
      .then((r) => r.json()).then((j: { videos?: IntelVideo[] }) => setVideos(j.videos ?? [])).catch(() => {});

    // grounded answer + sources + citations
    try {
      const res = await fetch("/api/intelligence", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: question }), signal: ac.signal });
      if (!res.ok || !res.body) { setError("Search unavailable."); setPhase("error"); return; }
      const reader = res.body.getReader(); const dec = new TextDecoder();
      let buf = ""; let raw = "";
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n\n"); buf = parts.pop() ?? "";
        for (const p of parts) {
          const line = p.split("\n").find((l) => l.startsWith("data:")); if (!line) continue;
          let d: Record<string, unknown>; try { d = JSON.parse(line.slice(5).trim()); } catch { continue; }
          if (d.type === "sources") {
            const srcs = d.sources as { corpus: string }[];
            const by: Record<string, number> = {};
            for (const s of srcs) by[s.corpus] = (by[s.corpus] ?? 0) + 1;
            setCounts(by); setPhase("answering");
          } else if (d.type === "token") {
            raw += d.text as string; setAnswer(raw);
          } else if (d.type === "citations") {
            setCitations((d.citations as Citation[]) ?? []); setDisplayMap((d.displayMap as Record<string, number>) ?? {});
          } else if (d.type === "done") {
            setKeyPoints((d.keyPoints as string[]) ?? []); setFollowUps((d.followUps as string[]) ?? []); setPhase("done");
          } else if (d.type === "error") { setError(d.message as string); setPhase("error"); }
        }
      }
      setPhase((cur) => (cur === "error" ? cur : "done"));
    } catch (e) {
      if ((e as Error).name !== "AbortError") { setError(String(e)); setPhase("error"); }
    }
  }

  const cleanAnswer = useMemo(() => {
    let s = answer.replace(/^KEY_POINTS:.*(\n|$)/m, "").replace(/\n?FOLLOW_UPS:[\s\S]*$/, "");
    // Valid markers become real links to their citation card; invalid ones (cited ⊄ retrieved) are dropped.
    s = s.replace(/\[src_(\d+)\]/g, (_m, n) => { const num = displayMap[`src_${n}`]; return num ? ` [\\[${num}\\]](#cite-${num})` : ""; });
    return s.trim();
  }, [answer, displayMap]);

  const visibleVideos = showAllVideos ? videos : videos.slice(0, 3);
  const idle = phase === "idle";
  // Surface the real (keyword) video count in the layer panel — the /api/ask
  // youtube vector count thins out when embedding quota is hit.
  const mergedCounts = counts ? { ...counts, youtube: Math.max(videos.length, counts.youtube ?? 0) } : null;
  const mergedTotal = mergedCounts ? Object.values(mergedCounts).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="p-8">
      <div className={cn("mx-auto", idle ? "max-w-2xl pt-16" : "max-w-3xl")}>
        {/* Header / search */}
        <div className={cn(idle && "text-center")}>
          {idle && (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${ACCENT}1f`, color: "#9a6207" }}>
                <Sparkles className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Intelligence</h1>
              <p className="mt-1 text-sm text-muted-foreground">Ask anything. Every answer is searched across every layer of A360 intelligence — and cited.</p>
            </>
          )}
          <form onSubmit={(e) => { e.preventDefault(); run(input); }} className={cn("flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm", idle ? "mt-6" : "mb-6")}>
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about aesthetics…"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground" />
            <button type="submit" disabled={!input.trim()} className="flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition-opacity disabled:opacity-40" style={{ background: ACCENT, color: "#3d2c06" }}>
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          {idle && (
            <div className="mt-4 flex flex-col gap-2">
              {SUGGESTED.map((s) => (
                <button key={s} onClick={() => run(s)} className="text-left rounded-xl border border-border px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted/40 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {!idle && (
          <div className="space-y-6">
            {/* Search-the-layers panel */}
            <SearchPanel counts={mergedCounts} total={mergedTotal} phase={phase} />

            {error && <div className="rounded-xl bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}

            {/* Key points */}
            {keyPoints.length > 0 && (
              <div className="rounded-2xl border p-4" style={{ borderColor: `${ACCENT}55`, background: `${ACCENT}0a` }}>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: "#9a6207" }}>Key points</div>
                <ul className="space-y-1.5">
                  {keyPoints.map((k, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/85"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} /><span>{k.replace(/\[src_\d+\]/g, "").trim()}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Answer */}
            {(cleanAnswer || phase === "answering") && (
              <div className="md-doc rounded-2xl border border-border bg-card p-6">
                {cleanAnswer ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD} skipHtml={false}>{cleanAnswer}</ReactMarkdown>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Synthesizing the answer…</div>
                )}
              </div>
            )}

            {/* Related videos */}
            {videos.length > 0 && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"><PlayCircle className="h-3.5 w-3.5" style={{ color: ACCENT }} /> Related video Intelligence</span>
                  {videos.length > 3 && (
                    <button onClick={() => setShowAllVideos((v) => !v)} className="text-xs font-medium" style={{ color: "#9a6207" }}>
                      {showAllVideos ? "Show less" : `See all ${videos.length}`}
                    </button>
                  )}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {visibleVideos.map((v) => (
                    <a key={v.videoId} href={v.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative aspect-video bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={v.thumbnailUrl} alt={v.title} className="h-full w-full object-cover" loading="lazy" />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlayCircle className="h-9 w-9 text-white" />
                        </span>
                      </div>
                      <div className="p-2.5">
                        <div className="text-xs font-medium text-foreground line-clamp-2">{v.title}</div>
                        {v.channel && <div className="mt-0.5 text-[11px] text-muted-foreground">{v.channel}</div>}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Citations */}
            {citations.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"><FileText className="h-3.5 w-3.5" style={{ color: ACCENT }} /> Citations</div>
                <div className="space-y-2">
                  {citations.map((c) => (
                    <div key={c.number} id={`cite-${c.number}`} className="flex gap-3 rounded-xl border border-border p-3 scroll-mt-24 target:ring-1 target:ring-[#F5A623]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: `${ACCENT}1f`, color: "#9a6207" }}>{c.number}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{c.title}</span>
                          <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{CORPUS_LABEL[c.corpus] ?? c.corpus}</span>
                        </div>
                        {c.evidence && <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{c.evidence}</p>}
                        {c.url && <a href={c.url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-[11px]" style={{ color: "#9a6207" }}>Open source <ExternalLink className="h-3 w-3" /></a>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-ups */}
            {followUps.length > 0 && (
              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Follow-up</div>
                <div className="flex flex-col gap-2">
                  {followUps.map((f) => (
                    <button key={f} onClick={() => run(f)} className="flex items-center justify-between rounded-xl border border-border px-4 py-2.5 text-left text-sm text-foreground/80 hover:bg-muted/40 transition-colors">
                      {f} <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchPanel({ counts, total, phase }: { counts: Record<string, number> | null; total: number; phase: Phase }) {
  const done = counts !== null;
  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
        {done ? <Check className="h-4 w-4" style={{ color: ACCENT }} /> : <Loader2 className="h-4 w-4 animate-spin" style={{ color: ACCENT }} />}
        {done ? `Searched ${total} sources across ${LAYERS.filter((l) => layerCount(l, counts) > 0).length} intelligence layers` : "Searching every intelligence layer…"}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {LAYERS.map((l, i) => {
          const n = counts ? layerCount(l, counts) : null;
          return (
            <div key={l.key} className="flex items-center gap-2.5 rounded-lg bg-card px-3 py-2 animate-in fade-in slide-in-from-bottom-1 fill-mode-both" style={{ animationDelay: `${i * 80}ms` }}>
              <l.Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 text-[13px] text-foreground/80">{l.label}</span>
              {n === null ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
              ) : n > 0 ? (
                <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#9a6207" }}>{n} <Check className="h-3 w-3" /></span>
              ) : (
                <Check className="h-3.5 w-3.5 text-muted-foreground/40" />
              )}
            </div>
          );
        })}
      </div>
      {phase === "answering" && done && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Synthesizing a cited answer…</div>
      )}
    </div>
  );
}

function layerCount(l: { corpora: string[] }, counts: Record<string, number> | null): number {
  if (!counts) return 0;
  return l.corpora.reduce((sum, c) => sum + (counts[c] ?? 0), 0);
}

const MD = {
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-lg font-semibold text-foreground mt-5 mb-2 first:mt-0" {...p} />,
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-base font-semibold text-foreground mt-5 mb-1.5" {...p} />,
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-sm font-semibold text-foreground mt-4 mb-1" {...p} />,
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-[15px] leading-relaxed text-foreground/85 mb-3" {...p} />,
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-5 space-y-1 text-[15px] text-foreground/85 mb-3" {...p} />,
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-5 space-y-1 text-[15px] text-foreground/85 mb-3" {...p} />,
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...p} />,
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-foreground" {...p} />,
  sup: (p: React.HTMLAttributes<HTMLElement>) => <sup className="text-[10px] font-bold" style={{ color: "#9a6207" }} {...p} />,
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    p.href?.startsWith("#cite-")
      ? <a className="align-super text-[10px] font-bold no-underline hover:underline" style={{ color: "#9a6207" }} {...p} />
      : <a className="underline" style={{ color: "#9a6207" }} target="_blank" rel="noreferrer" {...p} />,
  table: (p: React.HTMLAttributes<HTMLTableElement>) => <div className="overflow-x-auto mb-3"><table className="w-full text-sm border-collapse" {...p} /></div>,
  th: (p: React.HTMLAttributes<HTMLTableCellElement>) => <th className="border border-border px-2 py-1 text-left font-medium bg-muted/40" {...p} />,
  td: (p: React.HTMLAttributes<HTMLTableCellElement>) => <td className="border border-border px-2 py-1 align-top" {...p} />,
};
