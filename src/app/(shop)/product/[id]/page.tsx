import * as React from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/entities/product/api/getProductById";
import { ProductDetailsBlockWidget } from "@/widgets/product-details-block";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

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
