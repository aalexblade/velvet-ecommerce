import { createSupabaseServerClient } from "@/shared/api/supabase/serverClient";
import { Product } from "../model/types";

interface ProductFilters {
  color?: string | string[];
  size?: string | string[];
}

/**
 * Server-side function to fetch products based on URL slug criteria and filters.
 * Refactored to fetch live operational data directly from Supabase.
 *
 * @param slug - Array of dynamic routing criteria from Next.js App Router.
 * @param filters - Optional filters for color and size.
 * @returns {Promise<Product[]>} A promise that resolves to the array of matching products.
 */
export async function getProducts(slug: string[], filters?: ProductFilters): Promise<Product[]> {
  // 1. Establish connection client instance to process database query on the server side
  const supabase = await createSupabaseServerClient();

  // 2. Fetch the products table with nested relational variants and images streams
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      variants (*),
      images (*)
    `)
    .eq("is_active", true);

  if (error || !data) {
    console.error("Supabase getProducts execution failure:", error?.message);
    return [];
  }

  let products = data as Product[];

  // 3. Simple in-memory fallback parsing for clean client navigation testing
  if (slug && slug.length > 0) {
    const targetCategory = slug[slug.length - 1].toLowerCase();
    
    if (targetCategory !== "catalog" && targetCategory !== "bilyzna") {
      products = products.filter((product) => 
        product.slug?.toLowerCase().includes(targetCategory)
      );
    }
  }

  // 4. Match runtime filters for smooth localized presentation transitions
  if (filters) {
    if (filters.color) {
      const colors = Array.isArray(filters.color) 
        ? filters.color.map(c => c.toLowerCase()) 
        : [filters.color.toLowerCase()];
        
      products = products.filter((product) =>
        product.variants?.some((v) => colors.includes(v.color.toLowerCase()))
      );
    }
    
    if (filters.size) {
      const sizes = Array.isArray(filters.size) 
        ? filters.size.map(s => s.toLowerCase()) 
        : [filters.size.toLowerCase()];

      products = products.filter((product) =>
        product.variants?.some((v) => sizes.includes(v.size.toLowerCase()))
      );
    }
  }

  return products;
}