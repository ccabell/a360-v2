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

/** Corpus types that earn the "Reliable" badge. */
export const TIER_RELIABLE: ReadonlySet<Corpus> = new Set(["fda", "manufacturer", "pubmed"]);

/** Returns the trust tier for a corpus type. */
export function corpusTier(corpus: Corpus): "trusted" | "evidence" | "general" {
  if (corpus === "fda" || corpus === "manufacturer") return "trusted";
  if (corpus === "pubmed" || corpus === "practice") return "evidence";
  return "general";
}

export const CORPUS_META: Record<Corpus, CorpusMeta> = {
  pubmed: {
    label: "Research",
    longName: "PubMed Central (PMC)",
    typeTag: "Journal",
    Icon: Microscope,
    chip: "bg-tier-evidence-bg text-tier-evidence-fg",
  },
  youtube: {
    label: "Video",
    longName: "Video Source",
    typeTag: "Video",
    Icon: Play,
    chip: "bg-tier-general-bg text-tier-general-fg",
  },
  podcast: {
    label: "Podcast",
    longName: "Podcast",
    typeTag: "Podcast",
    Icon: Mic,
    chip: "bg-tier-general-bg text-tier-general-fg",
  },
  industry: {
    label: "Industry",
    longName: "Industry Publication",
    typeTag: "Industry",
    Icon: Newspaper,
    chip: "bg-tier-general-bg text-tier-general-fg",
  },
  manufacturer: {
    label: "Manufacturer",
    longName: "Manufacturer Documentation",
    typeTag: "Manufacturer",
    Icon: Building2,
    chip: "bg-tier-trusted-bg text-tier-trusted-fg",
  },
  fda: {
    label: "FDA",
    longName: "U.S. Food and Drug Administration (FDA)",
    typeTag: "Regulatory",
    Icon: ShieldCheck,
    chip: "bg-tier-trusted-bg text-tier-trusted-fg",
  },
  practice: {
    label: "Practice",
    longName: "Practice Library",
    typeTag: "Multi-Specialty",
    Icon: Stethoscope,
    chip: "bg-tier-evidence-bg text-tier-evidence-fg",
  },
};
