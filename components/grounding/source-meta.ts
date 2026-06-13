import {
  Microscope,
  Play,
  Mic,
  Newspaper,
  Building2,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import type { Corpus } from "@/lib/types/retrieval";

export interface CorpusMeta {
  label: string;
  /** Full authority name shown inline after claims (e.g. "PubMed Central (PMC)"). */
  longName: string;
  /** Short tag for reference lists (e.g. "Journal", "Regulatory"). */
  typeTag: string;
  Icon: React.ElementType;
  /** Tinted chip for the icon — semantic source-type accent (cards stay themed). */
  chip: string;
}

export const CORPUS_META: Record<Corpus, CorpusMeta> = {
  pubmed: {
    label: "Research",
    longName: "PubMed Central (PMC)",
    typeTag: "Journal",
    Icon: Microscope,
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  youtube: {
    label: "Video",
    longName: "Video Source",
    typeTag: "Video",
    Icon: Play,
    chip: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  podcast: {
    label: "Podcast",
    longName: "Podcast",
    typeTag: "Podcast",
    Icon: Mic,
    chip: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  industry: {
    label: "Industry",
    longName: "Industry Publication",
    typeTag: "Industry",
    Icon: Newspaper,
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  manufacturer: {
    label: "Manufacturer",
    longName: "Manufacturer Documentation",
    typeTag: "Manufacturer",
    Icon: Building2,
    chip: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  fda: {
    label: "FDA",
    longName: "U.S. Food and Drug Administration (FDA)",
    typeTag: "Regulatory",
    Icon: ShieldCheck,
    chip: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  },
  practice: {
    label: "Practice",
    longName: "Practice Library",
    typeTag: "Multi-Specialty",
    Icon: Stethoscope,
    chip: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  },
};
