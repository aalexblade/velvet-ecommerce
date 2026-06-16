import React from 'react';
import { CatalogView } from '@/widgets/catalog-view';
import { getProducts } from '@/entities/product';

interface Props {
  params: Promise<{ slug?: string[] }>;
}

/**
 * CatalogPage (Pure Server Component)
 * Correctly unwraps async params and safely injects data into the CatalogView widget.
 */
export default async function CatalogPage({ params }: Props) {
  // 1. Асинхронно розгортаємо параметри роутингу Next.js 15
  const { slug } = await params;

  // 2. Гарантуємо передачу масиву для безпеки типів сутності
  const safeSlug = slug ?? [];
  const products = await getProducts(safeSlug);

  return (
    <CatalogView 
      slug={safeSlug} 
      initialProducts={products} 
    />
  );
}