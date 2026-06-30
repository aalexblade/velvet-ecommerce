import * as React from "react";
import { Product } from "@/entities/product/model/types";
import { ProductDetailsBlock } from "@/widgets/product-details-block";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Clean & Synced Local Mock Product matching the Figma spec layout
 */
export const MOCK_PRODUCT: Product = {
  id: "mock-bra-1",
  title: "Корсетний мереживний бра балконет",
  slug: "korsetnii-merezhaivnii-bra-balkonet",
  description:
    "Елегантне поєднання витонченого стилю та ефектного силуету. Завдяки м'яким формованим чашкам з пуш-ап ефектом, модель делікатно піднімає і підкреслює форму грудей, створюючи привабливу лінію декольте.",
  category_id: 12,
  is_active: true,
  created_at: new Date().toISOString(),

  images: [
    {
      id: 1,
      product_id: "mock-bra-1",
      variant_id: null,
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
      variant_id: null,
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600",
      is_main: false,
      sort_order: 3,
    },
  ],

  variants: [
    {
      id: "v-cherry-xs",
      product_id: "mock-bra-1",
      sku: "565940",
      color: "Cherry",
      size: "XS",
      price: 650,
      old_price: null,
      stock: 5,
    },
    {
      id: "v-cherry-s",
      product_id: "mock-bra-1",
      sku: "565940",
      color: "Cherry",
      size: "S",
      price: 650,
      old_price: null,
      stock: 5,
    },
    {
      id: "v-cherry-m",
      product_id: "mock-bra-1",
      sku: "565940",
      color: "Cherry",
      size: "M",
      price: 650,
      old_price: null,
      stock: 3,
    },
    {
      id: "v-cherry-l",
      product_id: "mock-bra-1",
      sku: "565940",
      color: "Cherry",
      size: "L",
      price: 650,
      old_price: null,
      stock: 2,
    },
    {
      id: "v-cherry-xl",
      product_id: "mock-bra-1",
      sku: "565940",
      color: "Cherry",
      size: "XL",
      price: 650,
      old_price: null,
      stock: 4,
    },
  ],
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  await params;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 animate-in fade-in duration-300">
      <ProductDetailsBlock product={MOCK_PRODUCT} />
    </main>
  );
}