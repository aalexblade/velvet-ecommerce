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