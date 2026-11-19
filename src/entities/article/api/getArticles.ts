import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";
import type { Article } from "../model/types";

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

  return (data as unknown as Article[]) || [];
};