import { CatalogView } from "@/widgets/catalog-view";
import { getProducts } from "@/entities/product";

interface CatalogPageProps {
  params: { slug?: string[] };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function CatalogPage({ params, searchParams }: CatalogPageProps) {
  const { slug } = params;
  const search = await searchParams;
  const safeSlug = slug ?? [];

  const filters = {
    color: search.color,
    size: search.size,
  };

  const products = await getProducts(safeSlug, filters);

  return <CatalogView slug={safeSlug} initialProducts={products} />;
}
