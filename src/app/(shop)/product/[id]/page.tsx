import { ProductDetailsPage } from "@/views/product-details";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: ProductDetailPageProps) {
  const { id } = await params;

  return <ProductDetailsPage id={id} />;
}
