import { createSupabaseServerClient } from "@/shared/api/supabase/serverClient";
import { Product, ProductColor } from "../model/types";

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

/**
 * Server-side fetcher to retrieve a single operational product by its unique ID.
 * @param id - The unique identifier of the product from the URL parameter.
 * @returns {Promise<Product | null>} The mapped product object or null if not found.
 */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createSupabaseServerClient();

  // Перетворюємо string з URL у number для пошуку за int8 стовпчиком
  const numericId = Number(id);
  if (isNaN(numericId)) return null;

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_variants (*),
      product_images (*)
    `)
    .eq("id", numericId)
    .eq("is_active", true)
    .single(); // Очікуємо рівно один рядок

  if (error || !data) {
    console.error(`Supabase getProductById failure for ID ${id}:`, error?.message);
    return null;
  }

  const prod = data as unknown as DBProductResponse;
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
}