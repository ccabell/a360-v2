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

    // Simulate search delay
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 800);
  };

  const getSourceColor = (source: RAGResult["source"]) => {
    const colors = {
      youtube: { badge: "bg-red-100 text-red-900", icon: "🎥" },
      podcast: { badge: "bg-blue-100 text-blue-900", icon: "🎙️" },
      pubmed: { badge: "bg-green-100 text-green-900", icon: "📚" },
      internal: { badge: "bg-purple-100 text-purple-900", icon: "📝" },
    };
    return colors[source];
  };

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">RAG Search</h2>
        <p className="text-gray-600">Semantic search across knowledge base with relevant citations</p>
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
            className="text-lg py-6"
          />
          <Button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-8"
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
            <Card className="p-8 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-blue-600 rounded-full" />
                <p className="text-gray-600">Searching knowledge base...</p>
              </div>
            </Card>
          ) : results.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">No results found. Try a different query.</p>
            </Card>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Found {results.length} relevant {results.length === 1 ? "result" : "results"}
              </p>
              {results.map((result, idx) => {
                const isExpanded = expandedResult === result.id;
                const sourceInfo = getSourceColor(result.source);

                return (
                  <Card
                    key={result.id}
                    className="p-5 hover:border-blue-300 transition-all cursor-pointer"
                    onClick={() => setExpandedResult(isExpanded ? null : result.id)}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg">{sourceInfo.icon}</span>
                          <Badge className={sourceInfo.badge} variant="secondary">
                            {result.source}
                          </Badge>
                          <span className="text-xs text-gray-500 font-medium">
                            {Math.round(result.relevance * 100)}% relevant
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {result.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {result.excerpt}
                    </p>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-gray-700 mb-1">Key Topics:</p>
                          <div className="flex gap-2 flex-wrap">
                            {["Treatment", "Evidence-based", "Clinical"].map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
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
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View Source <ExternalLink className="h-3 w-3" />
                          </a>
                        )}

                        <div className="p-3 bg-blue-50 rounded border border-blue-200">
                          <p className="text-xs font-semibold text-blue-900 mb-1">Relevance Score</p>
                          <div className="w-full bg-blue-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${result.relevance * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* Empty State */}
      {!searched && (
        <Card className="p-12 text-center border-dashed">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Search the knowledge base</p>
          <p className="text-sm text-gray-500">
            Includes YouTube videos, podcasts, research articles, and internal documentation
          </p>
        </Card>
      )}
    </div>
  );
}
