import { createSupabaseServerClient } from "@/shared/api/supabase/serverClient";
import type { Tables } from "@/shared/api/supabase/database.types";
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

type ColorRow = Tables<"colors">;
type ProductImageRow = Tables<"product_images">;
type ProductVariantRow = Tables<"product_variants">;
type ProductColorGroupRow = Tables<"product_color_groups">;
type CategoryRow = Tables<"categories">;
type ProductRow = Tables<"products">;

type ProductColorGroupQueryRow = ProductColorGroupRow & {
  colors: ColorRow | null;
  product_images: ProductImageRow[];
  product_variants: ProductVariantRow[];
};

type ProductQueryRow = ProductRow & {
  categories: Pick<CategoryRow, "id" | "slug" | "parent_id"> | null;
  product_color_groups: ProductColorGroupQueryRow[];
};

export interface GetProductsResult {
  products: Product[];
  totalCount: number;
  totalPages: number;
}

function isProductQueryRow(item: unknown): item is ProductQueryRow {
  if (!item || typeof item !== "object") {
    return false;
  }

  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.is_active === "boolean" &&
    typeof candidate.created_at === "string"
  );
}

function normalizeQueryRows(rows: unknown[] | null): ProductQueryRow[] {
  if (!rows) {
    return [];
  }

  return rows.filter(isProductQueryRow);
}

function mapColorGroupToDomain(
  group: ProductColorGroupQueryRow,
): ProductColorGroup {
  const images: ProductImage[] = (group.product_images || []).map((img) => ({
    id: img.id,
    product_id: img.product_id ?? undefined,
    color_group_id: img.color_group_id ?? group.id,
    color: img.color,
    url: img.url,
    is_main: img.is_main ?? undefined,
    sort_order: img.sort_order ?? undefined,
    created_at: img.created_at,
  }));

  const variants: ProductVariant[] = (group.product_variants || []).map(
    (v) => ({
      id: v.id,
      product_id: v.product_id ?? undefined,
      color_group_id: v.color_group_id ?? group.id,
      sku: v.sku,
      color: v.color,
      size: v.size,
      price: Number(v.price),
      old_price: v.old_price !== null ? Number(v.old_price) : null,
      stock: v.stock ?? undefined,
      created_at: v.created_at,
    }),
  );

  return {
    id: group.id,
    product_id: group.product_id,
    color_slug: group.color_slug,
    is_main: group.is_main ?? undefined,
    created_at: group.created_at ?? undefined,
    colors: group.colors
      ? {
          slug: group.colors.slug,
          name_uk: group.colors.name_uk,
          hex: group.colors.hex,
          tailwind_class: group.colors.tailwind_class,
        }
      : undefined,
    product_images: images,
    product_variants: variants,
  };
}

function mapDBProductToProduct(prod: ProductQueryRow): Product {
  const colorGroups = (prod.product_color_groups || []).map(
    mapColorGroupToDomain,
  );

  const allVariants: ProductVariant[] = [];
  const allImages: ProductImage[] = [];
  const seenImageUrls = new Set<string>();

  const sortedColorGroups = [...colorGroups].sort((a, b) => a.id - b.id);

  sortedColorGroups.forEach((group) => {
    if (group.product_variants && Array.isArray(group.product_variants)) {
      group.product_variants.forEach((v) => {
        allVariants.push({
          ...v,
          color: v.color || group.colors?.name_uk || group.color_slug,
          color_group_id: group.id,
        });
      });
    }

    if (group.product_images && Array.isArray(group.product_images)) {
      const sortedImages = [...group.product_images].sort(
        (a, b) => a.id - b.id,
      );

      sortedImages.forEach((img) => {
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
    category_id: prod.category_id ?? undefined,
    is_active: prod.is_active,
    created_at: prod.created_at,
    product_color_groups: sortedColorGroups,
    variants: allVariants,
    images: allImages,
  };
}

const SELECT_QUERY = `
  *,
  categories (id, slug, parent_id),
  product_color_groups (
    *,
    colors!fk_product_color_groups_colors (*),
    product_images (*),
    product_variants (*)
  )
`;

export async function getBestsellers(): Promise<Product[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(SELECT_QUERY)
    .in("id", [1, 2, 3, 4])
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (error || !data) {
    console.error("Supabase getBestsellers failure details:", {
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
      code: error?.code,
      rawError: error,
    });
    return [];
  }

  return normalizeQueryRows(data).map(mapDBProductToProduct);
}

export async function getProducts(
  slug: string[],
  filters?: ProductFilters,
  page: number = 1,
  limit: number = 12,
): Promise<GetProductsResult> {
  const supabase = await createSupabaseServerClient();

  const { data: allCategories, error: catError } = await supabase
    .from("categories")
    .select("id, slug, parent_id");

  if (catError) {
    console.error("Error fetching categories details:", {
      message: catError.message,
      details: catError.details,
      hint: catError.hint,
      code: catError.code,
      rawError: catError,
    });
  }

  const currentSlug =
    slug && slug.length > 0 ? slug[slug.length - 1].toLowerCase() : null;

  const targetCategoryIds: number[] = [];

  if (currentSlug && allCategories) {
    const matchedCategory = allCategories.find(
      (c) => c.slug?.toLowerCase() === currentSlug,
    );

    if (matchedCategory) {
      targetCategoryIds.push(matchedCategory.id);

      const addChildren = (parentId: number) => {
        const children = allCategories.filter((c) => c.parent_id === parentId);
        children.forEach((child) => {
          targetCategoryIds.push(child.id);
          addChildren(child.id);
        });
      };

      addChildren(matchedCategory.id);
    }
  }

  const parsedMin =
    filters?.minPrice !== undefined && filters.minPrice !== ""
      ? Number(filters.minPrice)
      : undefined;
  const parsedMax =
    filters?.maxPrice !== undefined && filters.maxPrice !== ""
      ? Number(filters.maxPrice)
      : undefined;

  const min =
    parsedMin !== undefined && !Number.isNaN(parsedMin) ? parsedMin : undefined;
  const max =
    parsedMax !== undefined && !Number.isNaN(parsedMax) ? parsedMax : undefined;

  const cleanSizes = filters?.size
    ? (Array.isArray(filters.size) ? filters.size : [filters.size])
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const hasVariantFilter =
    cleanSizes.length > 0 || min !== undefined || max !== undefined;

  const selectQuery = hasVariantFilter
    ? `
      *,
      categories (id, slug, parent_id),
      product_color_groups!inner (
        *,
        colors!fk_product_color_groups_colors (*),
        product_images (*),
        product_variants!inner (*)
      )
    `
    : SELECT_QUERY;

  let query = supabase
    .from("products")
    .select(selectQuery, { count: "exact" })
    .eq("is_active", true);

  if (currentSlug) {
    if (targetCategoryIds.length > 0) {
      query = query.in("category_id", targetCategoryIds);
    } else {
      return { products: [], totalCount: 0, totalPages: 1 };
    }
  }

  if (filters?.search) {
    const searchTerms = Array.isArray(filters.search)
      ? filters.search.map((s) => s.trim()).filter(Boolean)
      : [filters.search.trim()].filter(Boolean);

    if (searchTerms.length === 1) {
      query = query.ilike("title", `%${searchTerms[0]}%`);
    } else if (searchTerms.length > 1) {
      query = query.or(
        searchTerms.map((term) => `title.ilike.%${term}%`).join(","),
      );
    }
  }

  if (cleanSizes.length > 0) {
    query = query.in("product_color_groups.product_variants.size", cleanSizes);
  }

  if (min !== undefined) {
    query = query.gte("product_color_groups.product_variants.price", min);
  }

  if (max !== undefined) {
    query = query.lte("product_color_groups.product_variants.price", max);
  }

  if (filters?.sortBy === "newest") {
    query = query.order("created_at", { ascending: false });
  } else {
    query = query.order("id", { ascending: true });
  }

  const requiresInMemoryPostProcess =
    Boolean(filters?.color) ||
    (min !== undefined && max !== undefined) ||
    filters?.sortBy === "price_asc" ||
    filters?.sortBy === "price-asc" ||
    filters?.sortBy === "price_desc" ||
    filters?.sortBy === "price-desc" ||
    filters?.sortBy === "popular";

  const startIndex = Math.max(0, (page - 1) * limit);

  if (!requiresInMemoryPostProcess) {
    query = query.range(startIndex, startIndex + limit - 1);
  }

  const { data, error, count } = await query;

  if (error || !data) {
    console.error("Supabase getProducts execution failure details:", {
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
      code: error?.code,
      rawError: error,
    });
    return { products: [], totalCount: 0, totalPages: 1 };
  }

  let products: Product[] = normalizeQueryRows(data).map(mapDBProductToProduct);

  if (filters?.color) {
    const colors = Array.isArray(filters.color)
      ? filters.color.map((c) => c.toLowerCase())
      : [filters.color.toLowerCase()];

    products = products.filter((product) =>
      product.variants?.some(
        (v) => v.color && colors.includes(v.color.toLowerCase()),
      ),
    );
  }

  if (min !== undefined && max !== undefined) {
    products = products.filter((product) =>
      product.variants?.some((v) => v.price >= min && v.price <= max),
    );
  }

  if (filters?.sortBy) {
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
    } else if (sort === "popular") {
      products.sort((a, b) => {
        const stockA = (a.variants || []).reduce(
          (acc, v) => acc + (v.stock ?? 0),
          0,
        );
        const stockB = (b.variants || []).reduce(
          (acc, v) => acc + (v.stock ?? 0),
          0,
        );
        if (stockB !== stockA) {
          return stockB - stockA;
        }
        return (
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
        );
      });
    }
  }

  if (requiresInMemoryPostProcess) {
    const totalCount = products.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);

    return {
      products: paginatedProducts,
      totalCount,
      totalPages,
    };
  }

  const totalCount = count ?? products.length;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  return {
    products,
    totalCount,
    totalPages,
  };
}