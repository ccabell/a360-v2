export interface AgeMark {
  age: number; // Age value (e.g., 20, 25, 30)
  imageUrl?: string; // URL of the image for this age (backward compatible)
  imageUrls?: string[]; // Multiple URLs for side-by-side comparison
}

export interface AgeMediaItem {
  id: number;
  url: string;
  type: string;
  title?: string;
  thumbnailUrl?: string;
  age: number; // Age value
  imageUrls?: string[]; // Multiple URLs for side-by-side comparison
}
