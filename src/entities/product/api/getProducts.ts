import { createSupabaseServerClient } from "@/shared/api/supabase/serverClient";
import { Product, ProductColor } from "../model/types";

interface ProductFilters {
  color?: string | string[];
  size?: string | string[];
}

// Інтерфейс для структури картинок, яка повертається з бази даних Supabase
interface DBProductImage {
  id: number;
  product_id: number;
  url: string;
  is_main: boolean;
  sort_order: number;
  created_at?: string;
}

// Інтерфейс для структури варіантів товарів з бази даних Supabase
interface DBProductVariant {
  id: number;
  product_id: number;
  sku: string;
  color: string;
  size: string;
  price: number;
  old_price: number | null;
  stock: number;
  created_at?: string;
}

// Інтерфейс для повної відповіді реляційного запиту (join) від Supabase
interface DBProductResponse {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category_id: number;
  is_active: boolean;
  created_at: string;
  product_variants: DBProductVariant[];
  product_images: DBProductImage[];
}

/**
 * Server-side function to fetch products based on URL slug criteria and filters.
 * Refactored to fetch live operational data directly from Supabase with relational mapping.
 *
 * @param slug - Array of dynamic routing criteria from Next.js App Router.
 * @param filters - Optional filters for color and size.
 * @returns {Promise<Product[]>} A promise that resolves to the array of matching products.
 */
export async function getProducts(slug: string[], filters?: ProductFilters): Promise<Product[]> {
  // 1. Establish connection client instance to process database query on the server side
  const supabase = await createSupabaseServerClient();

  // 2. Fetch the products table with nested explicit relational tables names
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_variants (*),
      product_images (*)
    `)
    .eq("is_active", true);

  if (error || !data) {
    console.error("Supabase getProducts execution failure:", error?.message);
    return [];
  }

  // Примусово приводимо дані до нашого строгого внутрішнього типу відповіді БД
  const rawProducts = data as unknown as DBProductResponse[];

  // 3. Map Postgres snake_case nested fields into the CamelCase structure expected by the frontend types
  let products: Product[] = rawProducts.map((prod) => {
    // Sort images by sort_order from the database definition layer
    const rawImages = prod.product_images || [];
    const sortedImages = [...rawImages].sort((a, b) => a.sort_order - b.sort_order);

    return {
      id: String(prod.id),
      title: prod.title,
      slug: prod.slug,
      description: prod.description || "",
      category_id: prod.category_id,
      is_active: prod.is_active,
      created_at: prod.created_at,
      images: sortedImages.map((img) => ({
        id: Number(img.id),
        product_id: String(img.product_id),
        variant_id: null,
        url: img.url,
        is_main: img.is_main,
        sort_order: img.sort_order,
      })),
      variants: (prod.product_variants || []).map((v) => ({
        id: String(v.id),
        product_id: String(v.product_id),
        sku: v.sku,
        // Безпечно приводимо рядок з бази даних до суворого літерального типу ProductColor
        color: v.color as ProductColor,
        size: v.size,
        price: Number(v.price),
        old_price: v.old_price ? Number(v.old_price) : null,
        stock: Number(v.stock),
      })),
    };
  });

  // 4. Simple in-memory fallback parsing for clean client navigation testing
  if (slug && slug.length > 0) {
    const targetCategory = slug[slug.length - 1].toLowerCase();
    
    if (targetCategory !== "catalog" && targetCategory !== "bilyzna") {
      products = products.filter((product) => 
        product.slug?.toLowerCase().includes(targetCategory)
      );
    }
  }

  // 5. Match runtime filters for smooth localized presentation transitions
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