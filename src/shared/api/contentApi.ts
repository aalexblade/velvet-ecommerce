import { createSupabaseBrowserClient } from './supabase/browserClient';
import { AboutSection, Article } from '@/shared/types';

const supabase = createSupabaseBrowserClient();

export const getAboutContent = async (): Promise<AboutSection[]> => {
  const { data, error } = await supabase
    .from<string, AboutSection>('about_page')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Помилка завантаження даних про нас:', error);
    return [];
  }

  return (data as AboutSection[]) || [];
};

export const getArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from<string, Article>('articles')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Помилка завантаження статей:', error);
    return [];
  }

  return (data as Article[]) || [];
};