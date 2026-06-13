import type { AgeMediaItem } from "./types";

/**
 * Get display title for an age media item
 */
export const getDisplayTitle = (item: AgeMediaItem): string => {
  // If item has a title, use it
  if (item.title) {
    return item.title;
  }

  // Generate title from age value
  return `${item.age} year`;
};

