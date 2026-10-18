export interface AboutSectionContent {
  paragraphs?: string[];
  list?: string[];
}

export interface AboutSection {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  content?: AboutSectionContent;
  display_order?: number;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image_url?: string;
  published_at?: string;
  created_at?: string;
}
