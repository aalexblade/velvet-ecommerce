export interface AboutSectionContent {
  paragraphs?: string[];
  list?: string[];
}

export interface AboutSection {
  id: number;
  section_key: string;
  title?: string;
  subtitle?: string;
  image_url?: string;
  content?: AboutSectionContent;
}
