import { CatalogPage } from "@/views/catalog";
import { getProducts } from "@/entities/product";

interface Props {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: Props) {
  const [{ slug }, search] = await Promise.all([params, searchParams]);
  
  const safeSlug = slug ?? [];
  
  // Extract filters from searchParams (can be string or string[])
  const filters = {
    color: search.color,
    size: search.size,
  };

  const products = await getProducts(safeSlug, filters);

  return <CatalogPage slug={safeSlug} initialProducts={products} />;
}
