import { notFound } from "next/navigation";
import { getProductById } from "@/entities/product/server";
import { ProductDetailsBlockWidget } from "@/widgets/product-details-block";

interface ProductDetailsPageProps {
  id: string;
}

export default async function ProductDetailsPage({
  id,
}: ProductDetailsPageProps) {
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 animate-in fade-in duration-300">
      <ProductDetailsBlockWidget product={product} />
    </main>
  );
}