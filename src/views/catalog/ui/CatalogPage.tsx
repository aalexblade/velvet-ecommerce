import { CatalogView } from "@/widgets/catalog-view";
import { getProducts } from "@/entities/product/api/getProducts";

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

  // 1. Correctly forward multi-select filters supporting arrays or singular strings
  const filters = {
    color: searchParams.color,
    size: searchParams.size,
    sort: typeof searchParams.sort === "string" ? searchParams.sort : undefined,
  };

  // 2. Await server-side data stream directly from Supabase tables fetcher
  const products = await getProducts(safeSlug, filters);

  // 3. Render clean layout view with resolved precise prop naming definition
  return <CatalogView slug={safeSlug} initialProducts={products} />;
}