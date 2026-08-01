import { CatalogView } from "@/widgets/catalog-view";
import { getProducts, ProductFilters } from "@/entities/product/api/getProducts";
import { getSubcategories } from "@/entities/product/api/getSubcategories";

export interface CatalogPageProps {
  slug?: string[];
  searchParams: {
    category?: string;
    size?: string | string[];
    color?: string | string[];
    sort?: string;
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string | string[];
    fabric?: string | string[];
    collection?: string | string[];
    [key: string]: string | string[] | undefined;
  };
}

export async function CatalogPage({ slug, searchParams }: CatalogPageProps) {
  const safeSlug = slug ?? [];
  const currentPage = Number(searchParams.page) || 1;

  // Формуємо об'єкт фільтрів та кастуємо sortBy до типу ProductFilters["sortBy"]
  const filters: ProductFilters = {
    color: searchParams.color,
    size: searchParams.size,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
    sortBy: searchParams.sort as ProductFilters["sortBy"],
    search: searchParams.search,
    fabric: searchParams.fabric,
    collection: searchParams.collection,
  };

  const { products, totalPages } = await getProducts(
    safeSlug,
    filters,
    currentPage,
    12
  );

  const subcategories = await getSubcategories("bilyzna");

  return (
    <CatalogView
      slug={safeSlug}
      initialProducts={products}
      initialSubcategories={subcategories}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}