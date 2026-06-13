export interface BeforeAfterComparison {
  beforeUrl: string;
  afterUrl: string;
  title?: string;
  Description?: string;
}

export interface BeforeAfterMediaItem {
  id: number;
  url: string;
  type: string;
  title?: string;
  thumbnailUrl?: string;
  beforeUrl: string;
  afterUrl: string;
}

