"use client";

import * as React from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ProductGrid } from '@/widgets/product-grid';
import { CategorySelector } from '@/entities/category';
import { Breadcrumbs, Pagination } from '@/shared/ui';
import { CatalogFilters, type FilterCriteria, type SortOption } from '@/features/filters';

export default function CatalogPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeFilters, setActiveFilters] = React.useState<FilterCriteria>({
    priceRange: { min: 0, max: 0 },
    sizes: [],
    colors: [],
  });
  const [currentSort, setCurrentSort] = React.useState<SortOption>('newest');

  // Mock data for Breadcrumbs
  const breadcrumbPath = [
    { pageTitle: 'Home', targetUrl: '/' },
    { pageTitle: 'Catalog', targetUrl: '/catalog' },
  ];

  // Mock data for CategorySelector
  const categories = [
    { id: 1, label: 'Dresses', image: '/next.svg', href: '/catalog/dresses' },
    { id: 2, label: 'Tops', image: '/next.svg', href: '/catalog/tops' },
    { id: 3, label: 'Pants', image: '/next.svg', href: '/catalog/pants' },
    { id: 4, label: 'Accessories', image: '/next.svg', href: '/catalog/accessories' },
    { id: 5, label: 'Shoes', image: '/next.svg', href: '/catalog/shoes' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="max-w-[1268px] mx-auto px-4 md:px-6 py-8 flex flex-col gap-8">
          <Breadcrumbs navigationPath={breadcrumbPath} />

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-sans tracking-tight text-foreground">
            Product Catalog
          </h1>

          <CategorySelector categories={categories} />

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Desktop Filter Sidebar & Mobile Drawer Trigger */}
            <CatalogFilters 
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
              currentSortOption={currentSort}
              onSortChange={setCurrentSort}
            />

            {/* Main items catalog sheet block */}
            <div className="flex flex-col gap-8">
              <ProductGrid />
              
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
