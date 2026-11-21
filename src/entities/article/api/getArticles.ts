import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";
import type { Database } from "@/shared/api/supabase/database.types";
import type { Article } from "../model/types";

type ArticleRow = Database["public"]["Tables"]["articles"]["Row"];

function mapArticleFromRow(row: ArticleRow): Article {
  return {
    id: row.id,
    title: row.title,
    image_url: row.image_url,
    created_at: row.created_at,
  };
}

export const getArticles = async (): Promise<Article[]> => {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Помилка завантаження статей:", error);
    return [];
  }

  return (data ?? []).map(mapArticleFromRow);
};
