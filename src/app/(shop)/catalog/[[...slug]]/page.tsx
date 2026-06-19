import { CatalogPage } from "@/views/catalog";

interface Props {
  params: Promise<{ slug?: string[] }>;

  searchParams: Promise<{
    category?: string;
    size?: string;
    color?: string;
    sort?: string;
    page?: string;
    [key: string]: string | undefined;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <CatalogPage
      slug={resolvedParams.slug}
      searchParams={resolvedSearchParams}
    />
  );
}
