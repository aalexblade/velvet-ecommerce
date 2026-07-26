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

export async function CatalogPage({
  slug,
  searchParams,
}: CatalogPageProps) {
  const safeSlug = slug ?? [];

  const filters = {
    color: searchParams.color,
    size: searchParams.size,
    sort: typeof searchParams.sort === "string" ? searchParams.sort : undefined,
  };

  const products = await getProducts(safeSlug, filters);
  const subcategories = await getSubcategories("bilyzna");

  return (
    <CatalogView 
      slug={safeSlug} 
      initialProducts={products} 
      initialSubcategories={subcategories} 
    />
  );
}