"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ChevronDown, ExternalLink } from "lucide-react";

interface RAGResult {
  id: string;
  source: "youtube" | "podcast" | "pubmed" | "internal";
  title: string;
  excerpt: string;
  relevance: number;
  url?: string;
}

const mockResults: RAGResult[] = [
  {
    id: "1",
    source: "pubmed",
    title: "Clinical Efficacy of Botulinum Toxin in Aesthetic Medicine",
    excerpt: "Botox has demonstrated efficacy in treating dynamic facial wrinkles with onset typically within 3-7 days and peak effect at 2 weeks...",
    relevance: 0.98,
    url: "https://pubmed.ncbi.nlm.nih.gov/",
  },
  {
    id: "2",
    source: "youtube",
    title: "Advanced Injection Techniques for Facial Aesthetics",
    excerpt: "Expert demonstration of proper injection angles and depth for maximizing aesthetic outcomes while minimizing adverse effects...",
    relevance: 0.92,
    url: "https://youtube.com",
  },
  {
    id: "3",
    source: "podcast",
    title: "Treatment Planning in Modern Aesthetic Medicine",
    excerpt: "Discussion of multi-modal approaches combining injectables with skin care for comprehensive facial rejuvenation...",
    relevance: 0.87,
    url: "https://example.com",
  },
];

export default function RAGPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RAGResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 800);
  };

  const getSourceColor = (source: RAGResult["source"]) => {
    const colors = {
      youtube: { badge: "bg-red-600/20 border-red-500/30 text-red-200", icon: "🎥" },
      podcast: { badge: "bg-blue-600/20 border-blue-500/30 text-blue-200", icon: "🎙️" },
      pubmed: { badge: "bg-emerald-600/20 border-emerald-500/30 text-emerald-200", icon: "📚" },
      internal: { badge: "bg-purple-600/20 border-purple-500/30 text-purple-200", icon: "📝" },
    };
    return colors[source];
  };

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">RAG Search</h2>
        <p className="text-gray-400">Semantic search across knowledge base with relevant citations</p>
      </div>

      {/* Search Box */}
      <div className="mb-8">
        <div className="flex gap-3">
          <Input
            placeholder="Ask about treatments, procedures, evidence..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="text-lg py-6 glass bg-slate-800/30 border-white/10 text-gray-100 placeholder-gray-500"
          />
          <Button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
            size="lg"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-4">
          {loading ? (
            <div className="p-8 glass rounded-2xl bg-slate-800/40 border-white/10 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-blue-600 rounded-full" />
                <p className="text-gray-400">Searching knowledge base...</p>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 glass rounded-2xl bg-slate-800/40 border-white/10 text-center">
              <p className="text-gray-400">No results found. Try a different query.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                Found {results.length} relevant {results.length === 1 ? "result" : "results"}
              </p>
              {results.map((result, idx) => {
                const isExpanded = expandedResult === result.id;
                const sourceInfo = getSourceColor(result.source);

                return (
                  <div
                    key={result.id}
                    className="p-5 glass rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer fade-in"
                    onClick={() => setExpandedResult(isExpanded ? null : result.id)}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg">{sourceInfo.icon}</span>
                          <Badge className={`glass ${sourceInfo.badge}`} variant="secondary">
                            {result.source}
                          </Badge>
                          <span className="text-xs text-gray-500 font-medium">
                            {Math.round(result.relevance * 100)}% relevant
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-100 mb-2">
                          {result.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {result.excerpt}
                    </p>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-3 fade-in">
                        <div>
                          <p className="text-xs font-semibold text-gray-300 mb-1">Key Topics:</p>
                          <div className="flex gap-2 flex-wrap">
                            {["Treatment", "Evidence-based", "Clinical"].map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs glass border-white/10 bg-white/5">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {result.url && (
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
                          >
                            View Source <ExternalLink className="h-3 w-3" />
                          </a>
                        )}

                        <div className="p-3 glass rounded border border-blue-500/30 bg-blue-600/10">
                          <p className="text-xs font-semibold text-blue-200 mb-1">Relevance Score</p>
                          <div className="w-full bg-blue-600/20 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                              style={{ width: `${result.relevance * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* Empty State */}
      {!searched && (
        <div className="p-12 glass rounded-2xl bg-slate-800/20 border border-dashed border-white/10 text-center">
          <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-300 mb-2 font-medium">Search the knowledge base</p>
          <p className="text-sm text-gray-500">
            Includes YouTube videos, podcasts, research articles, and internal documentation
          </p>
        </div>
      )}
    </div>
  );
}
