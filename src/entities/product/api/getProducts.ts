import { createSupabaseServerClient } from "@/shared/api/supabase/serverClient";
import { Product, ProductColor } from "../model/types";

export interface ProductFilters {
  color?: string | string[];
  size?: string | string[];
  subcategory?: string | string[];
  minPrice?: number | string;
  maxPrice?: number | string;
  sortBy?:
    | "price_asc"
    | "price_desc"
    | "price-asc"
    | "price-desc"
    | "newest"
    | "popular";
  search?: string | string[];
  fabric?: string | string[];
  collection?: string | string[];
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
 * Helper mapper to convert DB response to domain Product model
 */
function mapDBProductToProduct(prod: DBProductResponse): Product {
  const rawImages = prod.product_images || [];
  const sortedImages = [...rawImages].sort(
    (a, b) => a.sort_order - b.sort_order,
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
}

/**
 * Server-side function to fetch bestsellers (IDs 1, 2, 3, 4)
 */
export async function getBestsellers(): Promise<Product[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (*),
      product_images (*)
    `,
    )
    .in("id", [1, 2, 3, 4])
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (error || !data) {
    console.error("Supabase getBestsellers failure:", error?.message);
    return [];
  }

  const rawProducts = data as unknown as DBProductResponse[];
  return rawProducts.map(mapDBProductToProduct);
}

/**
 * Server-side function to fetch paginated products based on URL slug criteria and filters.
 */
export async function getProducts(
  slug: string[],
  filters?: ProductFilters,
  page: number = 1,
  limit: number = 12,
): Promise<GetProductsResult> {
  const supabase = await createSupabaseServerClient();

  // 1. Fetch all active products
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (*),
      product_images (*)
    `,
    )
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (error || !data) {
    console.error("Supabase getProducts execution failure:", error?.message);
    return { products: [], totalCount: 0, totalPages: 1 };
  }

  const rawProducts = data as unknown as DBProductResponse[];

  // 2. MAPPING
  let products: Product[] = rawProducts.map(mapDBProductToProduct);

  // 3. FILTERING
  if (filters) {
    if (filters.search) {
      const searchTerms = Array.isArray(filters.search)
        ? filters.search.map((s) => s.toLowerCase())
        : [filters.search.toLowerCase()];

      products = products.filter((product) =>
        searchTerms.some((term) => product.title.toLowerCase().includes(term)),
      );
    }

    if (filters.color) {
      const colors = Array.isArray(filters.color)
        ? filters.color.map((c) => c.toLowerCase())
        : [filters.color.toLowerCase()];

      products = products.filter((product) =>
        product.variants?.some((v) => colors.includes(v.color.toLowerCase())),
      );
    }

    if (filters.size) {
      const sizes = Array.isArray(filters.size)
        ? filters.size.map((s) => s.toLowerCase())
        : [filters.size.toLowerCase()];

      products = products.filter((product) =>
        product.variants?.some((v) => sizes.includes(v.size.toLowerCase())),
      );
    }

    if (filters.minPrice !== undefined && filters.minPrice !== "") {
      const min = Number(filters.minPrice);
      if (!isNaN(min)) {
        products = products.filter((product) =>
          product.variants?.some((v) => v.price >= min),
        );
      }
    }

    if (filters.maxPrice !== undefined && filters.maxPrice !== "") {
      const max = Number(filters.maxPrice);
      if (!isNaN(max)) {
        products = products.filter((product) =>
          product.variants?.some((v) => v.price <= max),
        );
      }
    }

    if (filters.sortBy) {
      const sort = filters.sortBy;
      if (sort === "price_asc" || sort === "price-asc") {
        products.sort((a, b) => {
          const minA = Math.min(...(a.variants?.map((v) => v.price) || [0]));
          const minB = Math.min(...(b.variants?.map((v) => v.price) || [0]));
          return minA - minB;
        });
      } else if (sort === "price_desc" || sort === "price-desc") {
        products.sort((a, b) => {
          const minA = Math.min(...(a.variants?.map((v) => v.price) || [0]));
          const minB = Math.min(...(b.variants?.map((v) => v.price) || [0]));
          return minB - minA;
        });
      } else if (sort === "newest") {
        products.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      }
    }
  }

  // 4. IN-MEMORY PAGINATION
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