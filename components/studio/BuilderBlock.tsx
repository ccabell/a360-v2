"use client";

import { useState } from "react";
import { Trash2, ChevronUp, ChevronDown, ChevronRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BlockColor } from "./BlockCard";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface BlockConfig {
  id: string;
  name: string;
  subtitle: string;
  agentKey: string;
  color: BlockColor;
  prompt: string;
  toolsOverride?: string[];
}

export interface AgentOption {
  id: string;
  key: string;
  name: string;
}

// ── Color palette ─────────────────────────────────────────────────────────────

const ALL_COLORS: BlockColor[] = [
  "blue", "violet", "teal", "amber", "emerald", "rose", "indigo", "orange",
];

const COLOR_DOT: Record<BlockColor, string> = {
  blue: "bg-blue-500",
  violet: "bg-violet-500",
  teal: "bg-teal-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  indigo: "bg-indigo-500",
  orange: "bg-orange-500",
};

// ── Available tools ────────────────────────────────────────────────────────────

const ALL_TOOLS: Array<{ key: string; label: string; description: string }> = [
  { key: "get_patient_context", label: "Patient Context", description: "Demographics, transcript, extraction outputs" },
  { key: "search_fuel_documents", label: "GL Fuel Docs", description: "Product intelligence, pairing guides, protocols" },
  { key: "get_evidence_links", label: "Evidence Links", description: "FDA labels, PubMed, manufacturer docs" },
  { key: "search_clinical_literature", label: "Clinical Literature", description: "PubMed + YouTube + podcast + industry (all)" },
  { key: "search_podcast", label: "Podcast Search", description: "Expert discussions, patient language, clinical pearls" },
  { key: "search_youtube", label: "YouTube Search", description: "Manufacturer training videos, technique demos" },
  { key: "get_product_info", label: "Product Info", description: "Detailed product data, FDA status, relationships" },
  { key: "query_product_database", label: "Product Database", description: "Broad search across 425+ GL products" },
];

// ── BuilderBlock ──────────────────────────────────────────────────────────────

interface BuilderBlockProps {
  config: BlockConfig;
  index: number;
  total: number;
  agents: AgentOption[];
  onChange: (config: BlockConfig) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}

export function BuilderBlock({
  config,
  index,
  total,
  agents,
  onChange,
  onMoveUp,
  onMoveDown,
  onDelete,
}: BuilderBlockProps) {
  const [toolsOpen, setToolsOpen] = useState(false);

  const selectedTools = config.toolsOverride ?? [];

  function toggleTool(key: string) {
    const next = selectedTools.includes(key)
      ? selectedTools.filter((k) => k !== key)
      : [...selectedTools, key];
    onChange({ ...config, toolsOverride: next.length === 0 ? undefined : next });
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      {/* Row 1: index + name + subtitle + controls */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-muted-foreground/60 w-5 shrink-0 text-center tabular-nums">
          {index + 1}
        </span>
        <Input
          value={config.name}
          onChange={(e) => onChange({ ...config, name: e.target.value })}
          placeholder="Block name"
          className="h-8 text-sm font-semibold border-none bg-muted/40 focus-visible:bg-background"
        />
        <Input
          value={config.subtitle}
          onChange={(e) => onChange({ ...config, subtitle: e.target.value })}
          placeholder="Subtitle"
          className="h-8 text-xs border-none bg-muted/40 focus-visible:bg-background"
        />
        <div className="flex items-center gap-0.5 shrink-0">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 text-muted-foreground"
            onClick={onMoveUp}
            disabled={index === 0}
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 text-muted-foreground"
            onClick={onMoveDown}
            disabled={index === total - 1}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
            onClick={onDelete}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Row 2: agent picker + color swatches */}
      <div className="flex items-center gap-3">
        <Select
          value={config.agentKey}
          onValueChange={(v) => onChange({ ...config, agentKey: v ?? "" })}
        >
          <SelectTrigger className="h-8 flex-1 text-xs">
            <SelectValue placeholder="Select agent…" />
          </SelectTrigger>
          <SelectContent>
            {agents.map((a) => (
              <SelectItem key={a.key} value={a.key} className="text-xs">
                {a.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1.5 bg-muted/40 rounded-lg px-2.5 py-1.5 shrink-0">
          {ALL_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChange({ ...config, color: c })}
              className={`h-3.5 w-3.5 rounded-full transition-all ${COLOR_DOT[c]} ${
                config.color === c
                  ? "ring-2 ring-offset-1 ring-foreground/50 scale-125"
                  : "opacity-40 hover:opacity-80 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Row 3: prompt */}
      <textarea
        value={config.prompt}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange({ ...config, prompt: e.target.value })
        }
        placeholder="Prompt for this block — what should the agent do?"
        className="w-full rounded-md border border-input bg-muted/40 px-3 py-2 text-xs resize-none min-h-[72px] focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
        rows={3}
      />

      {/* Row 4: Tool selector (collapsible) */}
      <div>
        <button
          type="button"
          onClick={() => setToolsOpen((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight
            className={`h-3 w-3 transition-transform ${toolsOpen ? "rotate-90" : ""}`}
          />
          <Wrench className="h-3 w-3" />
          <span>
            {selectedTools.length === 0
              ? "Tools — all enabled (click to restrict)"
              : `${selectedTools.length} tool${selectedTools.length !== 1 ? "s" : ""} selected`}
          </span>
        </button>

        {toolsOpen && (
          <div className="mt-2 rounded-lg border border-border/60 bg-muted/20 p-3 grid grid-cols-2 gap-2">
            {ALL_TOOLS.map((tool) => {
              const checked = selectedTools.includes(tool.key);
              return (
                <label
                  key={tool.key}
                  className={`flex items-start gap-2 rounded-lg border p-2 cursor-pointer transition-all ${
                    checked
                      ? "border-primary/40 bg-primary/5"
                      : "border-border/40 hover:border-border hover:bg-muted/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleTool(tool.key)}
                    className="mt-0.5 h-3 w-3 accent-primary shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground/90 leading-tight">
                      {tool.label}
                    </p>
                    <p className="text-xs text-muted-foreground/70 leading-tight mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
