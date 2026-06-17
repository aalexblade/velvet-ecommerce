import { CatalogPage } from "@/views/catalog";
import { getProducts } from "@/entities/product";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const safeSlug = slug ?? [];
  const products = await getProducts(safeSlug);

  return <CatalogPage slug={safeSlug} initialProducts={products} />;
}
