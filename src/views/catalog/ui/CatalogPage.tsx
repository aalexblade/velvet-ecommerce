import { CatalogView } from "@/widgets/catalog-view";
import { Product } from "@/entities/product";

interface CatalogPageProps {
  slug?: string[];
  initialProducts: Product[];
}

export function CatalogPage({ slug, initialProducts }: CatalogPageProps) {
  return <CatalogView slug={slug} initialProducts={initialProducts} />;
}
