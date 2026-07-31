import { CatalogView } from "@/widgets/catalog-view";
import { getProducts } from "@/entities/product/api/getProducts";
import { getSubcategories } from "@/entities/product/api/getSubcategories";

interface CatalogPageProps {
  slug?: string[];
  searchParams: {
    category?: string;
    size?: string | string[];
    color?: string | string[];
    sort?: string;
    page?: string;
    [key: string]: string | string[] | undefined;
  };
}

export async function CatalogPage({ slug, searchParams }: CatalogPageProps) {
  const safeSlug = slug ?? [];
  const currentPage = Number(searchParams.page) || 1;

  const filters = {
    color: searchParams.color,
    size: searchParams.size,
    sort: typeof searchParams.sort === "string" ? searchParams.sort : undefined,
  };

  const { products, totalPages } = await getProducts(
    safeSlug,
    filters,
    currentPage,
    12,
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
