import { CatalogView } from "@/widgets/catalog-view";
import { getProducts } from "@/entities/product/api/getProducts";
// 1. Імпортуємо наш новий інструмент фетчингу субкатегорій
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

  // 2. Викликаємо обидва запити паралельно або послідовно на сервері
  const products = await getProducts(safeSlug, filters);
  const subcategories = await getSubcategories("bilyzna");

  // 3. Передаємо завантажені з Supabase субкатегорії у пропси компоненті
  return (
    <CatalogView 
      slug={safeSlug} 
      initialProducts={products} 
      initialSubcategories={subcategories} 
    />
  );
}