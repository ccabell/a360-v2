/**
 * Shared channel-label lookup for the A360 Video Navigator (Tube).
 *
 * Single source of truth for mapping raw YouTube channel handles to
 * display names — previously copy-pasted (and drifted) across the card,
 * watch page, and chat retrieval.
 */

export const CHANNEL_LABELS: Record<string, string> = {
  drtimpearce: "Dr Tim Pearce",
  drtimepearce: "Dr Tim Pearce",
  waveplasticsurgery: "Wave Plastic Surgery",
  aafe_tv: "AAFE",
  btlaestheticsint: "BTL Aesthetics",
  lumenisaesthetics: "Lumenis",
  erchoniaemea: "Erchonia",
  sciton: "Sciton",
  botoxcosmetic: "BOTOX Cosmetic",
  galdermaint: "Galderma",
  skinceuticals: "SkinCeuticals",
  revisionskincare: "Revision Skincare",
  inmodesolutions: "InMode",
  stevenweiner: "Dr Steven Weiner",
};

export function channelLabel(c: string | null | undefined): string {
  if (!c) return "YouTube";
  return CHANNEL_LABELS[c] ?? c.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
