// Citation type definitions

export type CitationSourceType =
  | "pubmed"
  | "youtube"
  | "supabase"
  | "pdf"
  | "transcript"
  | "agent_output";

export interface Citation {
  id: string;
  number: number;
  sourceType: CitationSourceType;
  sourceId: string;
  title: string;
  evidence: string;
  confidence?: number; // 0-1
  metadata?: {
    // PubMed
    pmid?: string;
    authors?: string;
    journal?: string;
    year?: number;
    doi?: string;
    publicationType?: "practice_guideline" | "research" | "review";

    // YouTube
    videoId?: string;
    timestamp?: number; // seconds
    duration?: number;
    thumbnail?: string;

    // Supabase
    table?: "gl_products" | "gl_fuel_documents" | "procedures" | "treatments";
    recordId?: string;

    // PDF
    pdfUrl?: string;
    pageNumber?: number;
    filename?: string;

    // Transcript
    speaker?: string;
    consultationId?: string;
    timestamp_text?: string;
  };
}

export interface AgentResponse {
  message: string;
  citations?: Citation[];
  reasoning?: string;
  actions?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}
