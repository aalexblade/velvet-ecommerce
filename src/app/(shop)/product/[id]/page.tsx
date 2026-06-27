import * as React from "react";
import { Product } from "@/entities/product/model/types";
import { ProductDetailsBlock } from "@/widgets/product-details-block";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Mock Product Data for local environment testing
 * Perfectly matches the Product interface from types.ts
 */
const MOCK_PRODUCT: Product = {
  id: "mock-bra-1",
  title: "Корсетний мереживний бра балконет",
  slug: "korsetnii-merezhaivnii-bra-balkonet",
  description:
    "Преміальний мереживний бюстгальтер балконет від Velvet Secrets. Виконаний із витончених італійських матеріалів преміумкласу. Забезпечує ідеальну підтримку завдяки корсетній основі, підкреслює форму грудей та створює неповторний спокусливий образ.",
  category_id: 12,
  is_active: true,
  created_at: new Date().toISOString(),

  images: [
    {
      id: 1,
      product_id: "mock-bra-1",
      variant_id: "v-cherry-s",
      url: "https://images.unsplash.com/photo-1616606145305-1e755225c56c?q=80&w=600",
      is_main: true,
      sort_order: 1,
    },
    {
      id: 2,
      product_id: "mock-bra-1",
      variant_id: null,
      url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600",
      is_main: false,
      sort_order: 2,
    },
    {
      id: 3,
      product_id: "mock-bra-1",
      variant_id: "v-black-s",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600",
      is_main: false,
      sort_order: 3,
    },
  ],

  variants: [
    {
      id: "v-cherry-s",
      product_id: "mock-bra-1",
      sku: "111240-01",
      color: "Cherry",
      size: "S",
      price: 650,
      old_price: 850,
      stock: 5,
    },
    {
      id: "v-cherry-m",
      product_id: "mock-bra-1",
      sku: "111240-02",
      color: "Cherry",
      size: "M",
      price: 650,
      old_price: 850,
      stock: 3,
    },
    {
      id: "v-cherry-l",
      product_id: "mock-bra-1",
      sku: "111240-03",
      color: "Cherry",
      size: "L",
      price: 650,
      old_price: 850,
      stock: 0,
    }, // Немає в наявності
    {
      id: "v-black-s",
      product_id: "mock-bra-1",
      sku: "111240-04",
      color: "Black",
      size: "S",
      price: 650,
      old_price: null,
      stock: 10,
    },
    {
      id: "v-black-m",
      product_id: "mock-bra-1",
      sku: "111240-05",
      color: "Black",
      size: "M",
      price: 650,
      old_price: null,
      stock: 8,
    },
  ],
};

/**
 * Premium Product Detail Page Profile Route (Local Mock Version)
 */
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  // We await params according to Next.js 15 rules, even though we use mock data locally
  await params;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Core Interactive Product Detailed Panel Cluster */}
      <ProductDetailsBlock product={MOCK_PRODUCT} />
    </main>
  );
}
