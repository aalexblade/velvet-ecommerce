import { CatalogPage } from "@/views/catalog";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{
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
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <CatalogPage
      slug={resolvedParams.slug}
      searchParams={resolvedSearchParams}
    />
  );
}