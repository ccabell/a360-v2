import type { BeforeAfterMediaItem } from "./types";

/**
 * Get display title for a before/after media item
 */
export const getDisplayTitle = (item: BeforeAfterMediaItem): string => {
  // If item has a title, use it
  if (item.title) {
    return item.title;
  }

  // Generate default title
  return `Comparison ${item.id}`;
};

/**
 * Extract view keyword from a string (title or URL)
 */
export const getViewKeyword = (text: string): string => {
  const lower = text.toLowerCase();
  if (lower.includes("front")) return "front";
  if (lower.includes("side")) return "side";
  if (lower.includes("back")) return "back";
  if (lower.includes("left")) return "left";
  if (lower.includes("right")) return "right";
  if (lower.includes("top")) return "top";
  if (lower.includes("angle")) return "angle";
  if (lower.includes("close")) return "close";
  if (lower.includes("full")) return "full";
  if (lower.includes("profile")) return "profile";
  return "";
};

/**
 * Extract base name and view from URL
 * Examples:
 * - arm-lift-25-back-detail_before -> { base: "arm lift 25 detail", view: "back" }
 * - rhinoplasty-12-right-side-thumbnail_before -> { base: "rhinoplasty 12 thumbnail", view: "right side" }
 */
export const extractFromUrl = (url: string): { base: string; view: string } => {
  // Remove file extension and _before/_after suffix
  let name = url
    .split("/")
    .pop() || "";
  
  // Remove _before, _after, and file extension
  name = name
    .replace(/_before\.(jpg|jpeg|png|gif|webp)$/i, "")
    .replace(/_after\.(jpg|jpeg|png|gif|webp)$/i, "")
    .replace(/\.(jpg|jpeg|png|gif|webp)$/i, "");
  
  // Extract view keyword
  const view = getViewKeyword(name);
  
  // Remove view keywords to get base name
  let base = name
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\s*front\s*/gi, " ")
    .replace(/\s*side\s*/gi, " ")
    .replace(/\s*back\s*/gi, " ")
    .replace(/\s*left\s*/gi, " ")
    .replace(/\s*right\s*/gi, " ")
    .replace(/\s*top\s*/gi, " ")
    .replace(/\s*angle\s*/gi, " ")
    .replace(/\s*close\s*/gi, " ")
    .replace(/\s*full\s*/gi, " ")
    .replace(/\s*profile\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  
  return { base, view };
};

/**
 * Extract base name from a title by removing view keywords only
 * When using comparisons prop, titles don't include "before" and "after"
 * Examples:
 * - "Treatment Comparison Angle" -> "Treatment Comparison"
 * - "Treatment Comparison Front" -> "Treatment Comparison"
 * - "Rhinoplasty Results" -> "Rhinoplasty Results"
 */
export const getBaseName = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/\s*front\s*/gi, "")
    .replace(/\s*side\s*/gi, "")
    .replace(/\s*back\s*/gi, "")
    .replace(/\s*left\s*/gi, "")
    .replace(/\s*right\s*/gi, "")
    .replace(/\s*top\s*/gi, "")
    .replace(/\s*angle\s*/gi, "")
    .replace(/\s*close\s*/gi, "")
    .replace(/\s*full\s*/gi, "")
    .replace(/\s*profile\s*/gi, "")
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Check if all comparisons share the same base name
 */
export const shareSameBaseName = (titles: string[]): boolean => {
  if (titles.length === 0) return false;
  if (titles.length === 1) return true;

  const baseNames = titles.map((title) => getBaseName(title));
  const firstBaseName = baseNames[0];

  return baseNames.every((baseName) => baseName === firstBaseName);
};

/**
 * Get the display name from base name (capitalize first letter of each word)
 */
export const getDisplayNameFromBase = (baseName: string): string => {
  return baseName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

