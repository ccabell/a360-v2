import { ResearchChat } from "@/components/research/research-chat";
import { Badge } from "@/components/ui/badge";

export default function ResearchPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Research</h2>
            <p className="text-sm text-muted-foreground">
              Multi-source retrieval with grounded, clickable citations
            </p>
          </div>
          <Badge variant="secondary">Demo data</Badge>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResearchChat />
      </div>
    </div>
  );
}
