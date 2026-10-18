import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";
import type { Category } from "../model/types";

export async function getCategories(): Promise<Category[]> {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, title, slug, menu_columns")
    .is("parent_id", null);

  if (error || !data) {
    console.error("Error fetching root categories:", error);
    return [];
  }

  return data as Category[];
}
