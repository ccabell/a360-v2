/**
 * Maps taxonomy icon names + topic categories to lucide icons and colour
 * tokens, so modules/topics render with consistent, on-brand visuals.
 */
import {
  ShieldAlert,
  Brain,
  Syringe,
  Sparkles,
  ScanFace,
  Stethoscope,
  Droplets,
  ClipboardCheck,
  TrendingUp,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import type { TopicCategory } from "@/lib/academy/types";

export const MODULE_ICONS: Record<string, LucideIcon> = {
  ShieldAlert,
  Brain,
  Syringe,
  Sparkles,
  ScanFace,
  Stethoscope,
  Droplets,
  ClipboardCheck,
  TrendingUp,
  HeartPulse,
};

export function moduleIcon(name: string): LucideIcon {
  return MODULE_ICONS[name] ?? Sparkles;
}

/** Tailwind classes for a topic-category accent (text + subtle bg). */
export const CATEGORY_STYLES: Record<
  TopicCategory,
  { dot: string; text: string; bg: string; ring: string; label: string }
> = {
  safety: {
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-500/10",
    ring: "ring-red-500/20",
    label: "Safety",
  },
  complications: {
    dot: "bg-orange-500",
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    ring: "ring-orange-500/20",
    label: "Complications",
  },
  anatomy: {
    dot: "bg-violet-500",
    text: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10",
    ring: "ring-violet-500/20",
    label: "Anatomy",
  },
  technique: {
    dot: "bg-sky-500",
    text: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10",
    ring: "ring-sky-500/20",
    label: "Technique",
  },
  regional: {
    dot: "bg-teal-500",
    text: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-500/10",
    ring: "ring-teal-500/20",
    label: "Regional",
  },
  toxin: {
    dot: "bg-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
    ring: "ring-indigo-500/20",
    label: "Toxin",
  },
  patient: {
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-500/20",
    label: "Patient",
  },
  business: {
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    ring: "ring-amber-500/20",
    label: "Practice",
  },
  wellness: {
    dot: "bg-pink-500",
    text: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-500/10",
    ring: "ring-pink-500/20",
    label: "Wellness",
  },
};
