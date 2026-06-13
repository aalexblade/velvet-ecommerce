"use client";

import * as React from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ProductGrid } from '@/widgets/product-grid';
import { SubcategoryGrid, type SubCategory } from '@/entities/category';
import { Breadcrumbs, Pagination, type PathSegment } from '@/shared/ui';
import { CatalogFilters, type FilterCriteria, type SortOption } from '@/features/filters';

/**
 * Catalog Page Implementation
 * 
 * Assembles the unified composition layout for the storefront catalog.
 * Features responsive grids, subcategory navigation, and interactive filtering.
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

  // --- Static Navigation Path (Mocked) ---
  const breadcrumbPath: PathSegment[] = [
    { pageTitle: 'Home', targetUrl: '/' },
    { pageTitle: 'Catalog', targetUrl: '/catalog' },
  ];

  // --- Subcategories Data (Mocked) ---
  const subcategories: SubCategory[] = [
    { id: '1', title: 'Bras', slug: 'bras', imageUrl: '/next.svg' },
    { id: '2', title: 'Panties', slug: 'panties', imageUrl: '/next.svg' },
    { id: '3', title: 'Sleepwear', slug: 'sleepwear', imageUrl: '/next.svg' },
    { id: '4', title: 'Loungewear', slug: 'loungewear', imageUrl: '/next.svg' },
    { id: '5', title: 'Accessories', slug: 'accessories', imageUrl: '/next.svg' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 flex flex-col gap-6">
          {/* 1. Breadcrumbs Navigation */}
          <Breadcrumbs navigationPath={breadcrumbPath} />

          {/* 2. Page Title Header Block */}
          <header className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-sans tracking-tight text-foreground">
              Product Catalog
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Explore our collection of premium intimate wear, designed for comfort and elegance.
            </p>
          </header>

          {/* 3. Subcategory Navigation Grid */}
          <section aria-label="Subcategories">
            <SubcategoryGrid subcategories={subcategories} />
          </section>

          {/* 4. Content Splitter Matrix (Filters + Grid) */}
          <div className="flex flex-col md:flex-row gap-8 w-full items-start mt-4">
            {/* Desktop Filters Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
              <CatalogFilters 
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
                currentSortOption={currentSort}
                onSortChange={setCurrentSort}
              />
            </aside>

            {/* Core Items Sheet Block */}
            <div className="flex-grow flex flex-col gap-8 w-full">
              <ProductGrid />
              
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

      <Footer />
    </div>
  );
}
