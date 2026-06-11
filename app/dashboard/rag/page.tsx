"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReferencesSection } from "@/components/citations/references-section";
import { Citation } from "@/components/citations/types";
import { Search, SearchIcon } from "lucide-react";

export default function RAGPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    // Simulate search
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const mockResults: Citation[] = [
    {
      id: "cit_1",
      number: 1,
      sourceType: "pubmed",
      sourceId: "12345678",
      title:
        "Clinical Efficacy of Botulinum Toxin in Aesthetic Medicine: A Systematic Review",
      evidence:
        "Botox has demonstrated efficacy in treating dynamic facial wrinkles with onset typically within 3-7 days and peak effect at 2 weeks",
      confidence: 0.98,
      metadata: {
        pmid: "12345678",
        authors: "Smith J, Johnson M, Williams R, et al.",
        journal: "Journal of Aesthetic Dermatology",
        year: 2024,
        doi: "10.1016/j.jaad.2024.01.015",
        publicationType: "research",
      },
    },
    {
      id: "cit_2",
      number: 2,
      sourceType: "youtube",
      sourceId: "vid123",
      title: "Advanced Injection Techniques Masterclass",
      evidence:
        "Expert demonstration of proper injection angles, depths, and safety protocols",
      confidence: 0.92,
      metadata: {
        videoId: "vid123",
        timestamp: 0,
        duration: 2400,
        thumbnail: "https://img.youtube.com/vi/vid123/hqdefault.jpg",
      },
    },
  ];

  return (
    <div className="flex flex-col h-full p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Knowledge Base Search</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Search across research, videos, and internal documentation
        </p>
      </div>

      {/* Search Box */}
      <div className="flex gap-3 mb-8">
        <Input
          placeholder="Search for treatments, evidence, procedures..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex-1"
        />
        <Button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="px-6"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Results */}
      {searched ? (
        <div className="space-y-4">
          {loading ? (
            <Card className="p-8 text-center bg-muted/40 border-border">
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-primary/30 border-t-primary rounded-full" />
                <p className="text-muted-foreground">Searching knowledge base...</p>
              </div>
            </Card>
          ) : mockResults.length === 0 ? (
            <Card className="p-8 text-center bg-muted/40 border-border">
              <p className="text-muted-foreground">No results found. Try a different query.</p>
            </Card>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Found {mockResults.length} relevant results
              </p>
              <ReferencesSection
                citations={mockResults}
                defaultExpanded={true}
              />
            </>
          )}
        </div>
      ) : (
        <Card className="p-12 text-center bg-muted/40 border-dashed">
          <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium">Search the knowledge base</p>
          <p className="text-sm text-muted-foreground mt-2">
            Includes PubMed articles, YouTube videos, research papers, and internal
            documentation
          </p>
        </Card>
      )}
    </div>
  );
}
