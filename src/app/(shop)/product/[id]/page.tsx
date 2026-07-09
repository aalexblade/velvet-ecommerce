import * as React from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/entities/product/api/getProductById";
import { ProductDetailsBlock } from "@/widgets/product-details-block";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  // 1. Асинхронно розгортаємо параметри URL відповідно до вимог Next.js 15
  const { id } = await params;

  // 2. Отримуємо живі дані продукту з Supabase за його ID
  const product = await getProductById(id);

  // 3. Якщо продукт не знайдено або він неактивний — віддаємо 404 сторінку
  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Передаємо отриманий з бази продукт у деталізований блок */}
      <ProductDetailsBlock product={product} />
    </main>
  );
}