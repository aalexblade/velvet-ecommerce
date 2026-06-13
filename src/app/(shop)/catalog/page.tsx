"use client";

import * as React from 'react';
import { ProductGrid } from '@/widgets/product-grid';
import { SubcategoryGrid, type SubCategory } from '@/entities/category';
import { Breadcrumbs, Pagination, type PathSegment } from '@/shared/ui';
import { CatalogFilters, type FilterCriteria, type SortOption } from '@/features/filters';
import { Product } from '@/entities/product';

/**
 * Catalog Page Implementation
 * 
 * Assembles the unified composition layout for the storefront catalog.
 * Features responsive grids, subcategory navigation, and interactive filtering.
 * Adheres to strict White-Label premium aesthetics and Ukrainian localization.
 */
export default function CatalogPage() {
  // --- Local Interactivity State ---
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeFilters, setActiveFilters] = React.useState<FilterCriteria>({
    priceRange: { min: 0, max: 0 },
    sizes: [],
    colors: [],
  });
  const [currentSort, setCurrentSort] = React.useState<SortOption>('newest');

  // --- Localized Navigation Path ---
  const breadcrumbPath: PathSegment[] = [
    { pageTitle: 'Головна', targetUrl: '/' },
    { pageTitle: 'Каталог', targetUrl: '/catalog' },
  ];

  // --- Subcategories Data (Localized) ---
  const subcategories: SubCategory[] = [
    { id: '1', title: 'Бюстгальтери', slug: 'bras', imageUrl: '/next.svg' },
    { id: '2', title: 'Трусики', slug: 'panties', imageUrl: '/next.svg' },
    { id: '3', title: 'Одяг для сну', slug: 'sleepwear', imageUrl: '/next.svg' },
    { id: '4', title: 'Комплекти', slug: 'sets', imageUrl: '/next.svg' },
    { id: '5', title: 'Аксесуари', slug: 'accessories', imageUrl: '/next.svg' },
  ];

  // --- Mock Matrix Feed (Strict Product Type) ---
  const catalogProducts: Product[] = [
    {
      id: "101",
      title: "Бюстгальтер мереживний, пуш-ап",
      slug: "lace-bra-push-up",
      description: "Елегантний мереживний бюстгальтер з ефектом пуш-ап.",
      category_id: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      images: [
        { id: 1, product_id: "101", variant_id: null, url: "/next.svg", is_main: true, sort_order: 1 }        
      ],
      variants: [
        { id: "v101", product_id: "101", sku: "LB-001", color: "Black", size: "M", price: 1450, old_price: 1800, stock: 15 }
      ]
    },
    {
      id: "102",
      title: "Трусики сліпи з високою талією",
      slug: "high-waisted-briefs",
      description: "Комфортні бавовняні трусики з високою посадкою.",
      category_id: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      images: [
        { id: 2, product_id: "102", variant_id: null, url: "/next.svg", is_main: true, sort_order: 1 }        
      ],
      variants: [
        { id: "v102", product_id: "102", sku: "HB-002", color: "White", size: "S", price: 450, old_price: null, stock: 30 }
      ]
    },
    {
      id: "103",
      title: "Шовкова нічна сорочка",
      slug: "silk-nightgown",
      description: "Розкішна шовкова сорочка для комфортного сну.",
      category_id: 3,
      is_active: true,
      created_at: new Date().toISOString(),
      images: [
        { id: 3, product_id: "103", variant_id: null, url: "/next.svg", is_main: true, sort_order: 1 }        
      ],
      variants: [
        { id: "v103", product_id: "103", sku: "SN-003", color: "Peach", size: "L", price: 2100, old_price: 2500, stock: 8 }
      ]
    },
    {
      id: "104",
      title: "Бюстгальтер-бралет без кісточок",
      slug: "wireless-bralette",
      description: "М'який бралет для щоденного комфорту.",
      category_id: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      images: [
        { id: 4, product_id: "104", variant_id: null, url: "/next.svg", is_main: true, sort_order: 1 }        
      ],
      variants: [
        { id: "v104", product_id: "104", sku: "WB-004", color: "Lavender", size: "M", price: 950, old_price: null, stock: 20 }
      ]
    },
  ];

  return (
    <div className="bg-background">
      <main className="flex-grow">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 flex flex-col gap-6">
          {/* 1. Global Navigation Breadcrumbs */}
          <Breadcrumbs navigationPath={breadcrumbPath} />

          {/* 2. Page Title Header Block (Localized) */}
          <header className="flex flex-col gap-1 mb-2">
            <h1 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-foreground">
              Каталог
            </h1>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs md:text-sm">
                Знайдено: {catalogProducts.length} товарів
              </span>
            </div>
          </header>

          {/* 3. Subcategory Navigation Grid */}
          <section aria-label="Підкатегорії">
            <SubcategoryGrid subcategories={subcategories} />
          </section>

          {/* 4. Layout Splitting View (Filters + Grid) */}
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full mt-4">
            {/* Desktop Filters Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <CatalogFilters 
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
                currentSortOption={currentSort}
                onSortChange={setCurrentSort}
              />
            </aside>

            {/* Main Items Catalog Block Workspace */}
            <div className="flex-grow flex flex-col gap-8 w-full">
              <ProductGrid products={catalogProducts} />
              
              {/* Centralized Pagination */}
              <Pagination 
                currentPage={currentPage} 
                totalPages={5} 
                onPageChange={setCurrentPage} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
