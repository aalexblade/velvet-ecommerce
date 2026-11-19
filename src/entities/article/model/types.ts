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