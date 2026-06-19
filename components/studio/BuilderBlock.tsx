"use client";

import { Trash2, ChevronUp, ChevronDown } from "lucide-react";
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
}

export interface AgentOption {
  id: string;
  key: string;
  name: string;
}

// ── Color palette ─────────────────────────────────────────────────────────────

const ALL_COLORS: BlockColor[] = [
  "blue",
  "violet",
  "teal",
  "amber",
  "emerald",
  "rose",
  "indigo",
  "orange",
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
    </div>
  );
}
