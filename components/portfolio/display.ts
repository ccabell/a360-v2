import type {
  ProjectPriority,
  ProjectStatus,
} from "@/lib/portfolio/db";

/** Shared badge styling for statuses/priorities — used server- and client-side. */

export const STATUS_STYLES: Record<ProjectStatus, string> = {
  concept: "bg-muted text-muted-foreground",
  building: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  demoable: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  shipped: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  paused: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
  frozen: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
  retired: "bg-zinc-500/15 text-zinc-500 line-through",
};

export const PRIORITY_ORDER: ProjectPriority[] = [
  "front",
  "next",
  "backlog",
  "reserve",
];

export const PRIORITY_LABELS: Record<ProjectPriority, string> = {
  front: "Front",
  next: "Next",
  backlog: "Backlog",
  reserve: "Reserve",
};

export const PRIORITY_STYLES: Record<ProjectPriority, string> = {
  front: "bg-primary/15 text-primary",
  next: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
  backlog: "bg-muted text-muted-foreground",
  reserve: "bg-zinc-500/10 text-zinc-500",
};

export const STATUS_OPTIONS: ProjectStatus[] = [
  "concept",
  "building",
  "demoable",
  "shipped",
  "paused",
  "frozen",
  "retired",
];

export const CATEGORY_ORDER = [
  "Imaging ML",
  "Content & Education",
  "Studio & Global Library",
  "Exchange & Agents",
  "Data & RAG",
  "Reserve / Infra",
];
