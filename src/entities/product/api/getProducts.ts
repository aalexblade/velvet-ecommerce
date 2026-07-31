import { createSupabaseServerClient } from "@/shared/api/supabase/serverClient";
import { Product, ProductColor } from "../model/types";

interface ProductFilters {
  color?: string | string[];
  size?: string | string[];
}

interface DBProductImage {
  id: number;
  product_id: number;
  url: string;
  is_main: boolean;
  sort_order: number;
}

interface DBProductVariant {
  id: number;
  product_id: number;
  sku: string;
  color: string;
  size: string;
  price: number;
  old_price: number | null;
  stock: number;
}

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

export interface GetProductsResult {
  products: Product[];
  totalCount: number;
  totalPages: number;
}

/**
 * Server-side function to fetch paginated products based on URL slug criteria and filters.
 */
export async function getProducts(
  slug: string[],
  filters?: ProductFilters,
  page: number = 1,
  limit: number = 12
): Promise<GetProductsResult> {
  const supabase = await createSupabaseServerClient();

  // 1. Отримуємо всі активні товари
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (*),
      product_images (*)
    `
    )
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (error || !data) {
    console.error("Supabase getProducts execution failure:", error?.message);
    return { products: [], totalCount: 0, totalPages: 1 };
  }

  const rawProducts = data as unknown as DBProductResponse[];

  // 2. МАПУВАННЯ
  let products: Product[] = rawProducts.map((prod) => {
    const rawImages = prod.product_images || [];
    const sortedImages = [...rawImages].sort(
      (a, b) => a.sort_order - b.sort_order
    );

    return {
      id: String(prod.id),
      title: prod.title,
      slug: prod.slug,
      description: prod.description || "",
      category_id: prod.category_id,
      is_active: prod.is_active,
      created_at: prod.created_at,
      images: sortedImages.map((img) => ({
        id: img.id,
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
        color: v.color as ProductColor,
        size: v.size,
        price: Number(v.price),
        old_price: v.old_price ? Number(v.old_price) : null,
        stock: Number(v.stock),
      })),
    };
  });

  // 3. ФІЛЬТРАЦІЯ
  if (filters) {
    if (filters.color) {
      const colors = Array.isArray(filters.color)
        ? filters.color.map((c) => c.toLowerCase())
        : [filters.color.toLowerCase()];

      products = products.filter((product) =>
        product.variants?.some((v) => colors.includes(v.color.toLowerCase()))
      );
    }

    if (filters.size) {
      const sizes = Array.isArray(filters.size)
        ? filters.size.map((s) => s.toLowerCase())
        : [filters.size.toLowerCase()];

      products = products.filter((product) =>
        product.variants?.some((v) => sizes.includes(v.size.toLowerCase()))
      );
    }
  }

  // 4. ПАГІНАЦІЯ В ПАМ'ЯТІ (зрізаємо відповідно до поточного page)
  const totalCount = products.length;
  const totalPages = Math.ceil(totalCount / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedProducts = products.slice(startIndex, startIndex + limit);

  return {
    products: paginatedProducts,
    totalCount,
    totalPages,
  };
}