import { CatalogPage } from "@/views/catalog";

interface Props {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function Page({ params, searchParams }: Props) {
  return <CatalogPage params={params} searchParams={searchParams} />;
}
