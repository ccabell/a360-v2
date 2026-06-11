"use client";

import Link from "next/link";
import {
  FileText,
  Play,
  Database,
  ExternalLink,
  Microscope,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Citation } from "./types";

interface ReferenceCardProps {
  citation: Citation;
  number: number;
}

const sourceConfig = {
  pubmed: {
    icon: Microscope,
    label: "Research",
    color: "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800",
  },
  youtube: {
    icon: Play,
    label: "Video",
    color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
  },
  supabase: {
    icon: Database,
    label: "Product Guide",
    color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
  },
  pdf: {
    icon: FileText,
    label: "PDF",
    color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
  },
  transcript: {
    icon: BookOpen,
    label: "Transcript",
    color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
  },
  agent_output: {
    icon: Microscope,
    label: "AI Output",
    color: "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800",
  },
};

export function ReferenceCard({ citation, number }: ReferenceCardProps) {
  const config = sourceConfig[citation.sourceType] || sourceConfig.supabase;
  const Icon = config.icon;

  return (
    <div
      className={`p-4 border rounded-lg ${config.color} hover:shadow-sm transition-all`}
    >
      {/* Header: Number + Title */}
      <div className="flex items-start gap-3 mb-2">
        <span className="text-sm font-bold text-muted-foreground min-w-fit">
          [{number}]
        </span>
        <div className="flex-1">
          <p className="font-semibold text-foreground mb-1">
            {renderCitationLink(citation)}
          </p>
        </div>
      </div>

      {/* Authors + Journal (for PubMed) */}
      {citation.sourceType === "pubmed" && citation.metadata?.authors && (
        <p className="text-xs text-muted-foreground mb-2">
          {citation.metadata.authors}
        </p>
      )}

      {/* Journal info */}
      {citation.metadata?.journal && (
        <p className="text-xs text-muted-foreground mb-3">
          {citation.metadata.journal}
          {citation.metadata.year && ` • ${citation.metadata.year}`}
        </p>
      )}

      {/* Type Badge + Confidence */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <Badge variant="secondary" className="text-xs gap-1">
          <Icon className="h-3 w-3" />
          {config.label}
        </Badge>
        {citation.confidence && (
          <Badge variant="outline" className="text-xs">
            {Math.round(citation.confidence * 100)}% confident
          </Badge>
        )}
      </div>

      {/* CTA Links */}
      <div className="flex items-center gap-3 flex-wrap text-xs">
        {citation.sourceType === "pubmed" && citation.metadata?.doi && (
          <a
            href={`https://doi.org/${citation.metadata.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            DOI
            <ExternalLink className="h-3 w-3" />
          </a>
        )}

        {citation.sourceType === "youtube" && citation.metadata?.videoId && (
          <a
            href={`https://youtube.com/watch?v=${citation.metadata.videoId}&t=${
              citation.metadata.timestamp || 0
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            Watch Video
            <ExternalLink className="h-3 w-3" />
          </a>
        )}

        {citation.sourceType === "supabase" && citation.metadata?.recordId && (
          <Link
            href={`/dashboard/products/${citation.metadata.recordId}`}
            className="text-primary hover:underline flex items-center gap-1"
          >
            View Product
            <ExternalLink className="h-3 w-3" />
          </Link>
        )}

        {citation.sourceType === "pdf" && citation.metadata?.pdfUrl && (
          <a
            href={citation.metadata.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            Open PDF
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}

function renderCitationLink(citation: Citation): React.ReactNode {
  switch (citation.sourceType) {
    case "pubmed":
      return (
        <a
          href={`https://pubmed.ncbi.nlm.nih.gov/${citation.metadata?.pmid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary hover:underline transition-colors"
        >
          {citation.title}
        </a>
      );
    case "youtube":
      return (
        <a
          href={`https://youtube.com/watch?v=${citation.metadata?.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary hover:underline transition-colors"
        >
          {citation.title}
        </a>
      );
    case "supabase":
      return (
        <Link
          href={`/dashboard/products/${citation.metadata?.recordId}`}
          className="hover:text-primary hover:underline transition-colors"
        >
          {citation.title}
        </Link>
      );
    default:
      return <span>{citation.title}</span>;
  }
}
