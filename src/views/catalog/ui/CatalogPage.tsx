import { CatalogView } from "@/widgets/catalog-view";
import { getProducts } from "@/entities/product";

interface CatalogPageProps {
  slug?: string[];
  searchParams: {
    category?: string;
    size?: string;
    color?: string;
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
    color:
      typeof searchParams.color === "string" ? searchParams.color : undefined,
    size: typeof searchParams.size === "string" ? searchParams.size : undefined,
    sort: typeof searchParams.sort === "string" ? searchParams.sort : undefined,
  };

  const products = await getProducts(safeSlug, filters);

  return <CatalogView slug={safeSlug} initialProducts={products} />;
}
