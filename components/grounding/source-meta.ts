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
  Icon: React.ElementType;
  /** Tinted chip for the icon — semantic source-type accent (cards stay themed). */
  chip: string;
}

export const CORPUS_META: Record<Corpus, CorpusMeta> = {
  pubmed: {
    label: "Research",
    Icon: Microscope,
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  youtube: {
    label: "Video",
    Icon: Play,
    chip: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  podcast: {
    label: "Podcast",
    Icon: Mic,
    chip: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  industry: {
    label: "Industry",
    Icon: Newspaper,
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  manufacturer: {
    label: "Manufacturer",
    Icon: Building2,
    chip: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  fda: {
    label: "FDA Label",
    Icon: ShieldCheck,
    chip: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  },
  practice: {
    label: "Practice",
    Icon: Stethoscope,
    chip: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  },
};
