import { createSupabaseServerClient } from "@/shared/api/supabase/serverClient";

export interface Subcategory {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  parent_id: number | null;
}

/**
 * Server-side function to fetch subcategories for a specific parent category slug.
 *
 * @param parentSlug
 * @returns {Promise<Subcategory[]>}
 */
export async function getSubcategories(
  parentSlug: string,
): Promise<Subcategory[]> {
  const supabase = await createSupabaseServerClient();

  const { data: parentCategory, error: parentError } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", parentSlug)
    .single();

  if (parentError || !parentCategory) {
    console.error(
      `Parent category with slug "${parentSlug}" not found:`,
      parentError?.message,
    );
    return [];
  }

  const { data: subcategories, error: subError } = await supabase
    .from("categories")
    .select("*")
    .eq("parent_id", parentCategory.id)
    .order("id", { ascending: true });

  if (subError || !subcategories) {
    console.error("Failed to fetch subcategories:", subError?.message);
    return [];
  }

  return subcategories as Subcategory[];
}
