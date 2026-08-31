import { createSupabaseServerClient } from "@/shared/api/supabase/serverClient";
import {
  Product,
  ProductColorGroup,
  ProductVariant,
  ProductImage,
} from "../model/types";

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

interface DBProductResponse {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category_id: number;
  is_active: boolean;
  created_at: string;
  product_color_groups: ProductColorGroup[];
}

export interface GetProductsResult {
  products: Product[];
  totalCount: number;
  totalPages: number;
}

/**
 * Mapper for converting DB response with color groups to domain Product model
 */
function mapDBProductToProduct(prod: DBProductResponse): Product {
  const colorGroups = prod.product_color_groups || [];

  const allVariants: ProductVariant[] = [];
  const allImages: ProductImage[] = [];
  const seenImageUrls = new Set<string>();

  colorGroups.forEach((group) => {
    // 1. Мапимо варіанти з прив'язкою колірних даних
    if (group.product_variants) {
      group.product_variants.forEach((v) => {
        allVariants.push({
          ...v,
          color: v.color || group.colors?.name_uk || group.color_slug,
          color_group_id: group.id,
        });
      });
    }

    // 2. Додаємо лише УНІКАЛЬНІ картинки
    if (group.product_images) {
      group.product_images.forEach((img) => {
        if (img.url && !seenImageUrls.has(img.url)) {
          seenImageUrls.add(img.url);
          allImages.push({
            ...img,
            color_group_id: img.color_group_id || group.id,
          });
        }
      });
    }
  });

  return {
    id: prod.id,
    title: prod.title,
    slug: prod.slug,
    description: prod.description || "",
    category_id: prod.category_id,
    is_active: prod.is_active,
    created_at: prod.created_at,
    product_color_groups: colorGroups,
    variants: allVariants,
    images: allImages,
  };
}
const SELECT_QUERY = `
  *,
  product_color_groups (
    *,
    colors!fk_product_color_groups_colors (*),
    product_images (*),
    product_variants (*)
  )
`;

/**
 * Server-side function to fetch bestsellers
 */
export async function getBestsellers(): Promise<Product[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(SELECT_QUERY)
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

  const { data, error } = await supabase
    .from("products")
    .select(SELECT_QUERY)
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (error || !data) {
    console.error("Supabase getProducts execution failure:", error?.message);
    return { products: [], totalCount: 0, totalPages: 1 };
  }

  const rawProducts = data as unknown as DBProductResponse[];
  let products: Product[] = rawProducts.map(mapDBProductToProduct);

  // FILTERING
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
        product.variants?.some(
          (v) => v.color && colors.includes(v.color.toLowerCase()),
        ),
      );
    }

    if (filters.size) {
      const sizes = Array.isArray(filters.size)
        ? filters.size.map((s) => s.toLowerCase())
        : [filters.size.toLowerCase()];

      products = products.filter((product) =>
        product.variants?.some(
          (v) => v.size && sizes.includes(v.size.toLowerCase()),
        ),
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
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime(),
        );
      }
    }
  }

  // IN-MEMORY PAGINATION
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
