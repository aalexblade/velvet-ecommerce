"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { Product, ProductCard } from "@/entities/product";
import { CatalogFilters } from "@/features/filters";
import { ProductDetailsBlock } from "@/widgets/product-details-block";
import { SizeCalculatorForm } from "@/features/product-size-calculator";

interface Subcategory {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  parent_id: number | null;
}

interface CatalogViewProps {
  slug?: string[];
  initialProducts: Product[];
  initialSubcategories: Subcategory[];
}

export function CatalogView({
  slug,
  initialProducts,
  initialSubcategories,
}: CatalogViewProps) {
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(
    null,
  );
  // State for controlling size calculator modal visibility
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const products = useMemo(() => initialProducts, [initialProducts]);

  // Page title mapping according to the design mockup
  const currentCategoryTitle = useMemo(() => {
    if (!slug || slug.length === 0) return "Бюстгальтери";
    const lastSegment = slug[slug.length - 1].toLowerCase();
    const registry: Record<string, string> = {
      biusthaltery: "Бюстгальтери",
      bralette: "Бралета",
      balconette: "Балконет",
      bilyzna: "Бюстгальтери",
      corset: "Корсети",
      wireless: "Без кісточок",
      sports: "Спортивні",
      "size-guide": "Підібрати розмір",
    };
    return registry[lastSegment] || "Бюстгальтери";
  }, [slug]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased pt-28 md:pt-32 pb-16">
      {/* --- Breadcrumbs Navigation (Matching Figma with Chevron Icons) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground whitespace-nowrap overflow-x-auto no-scrollbar">
          <Link
            href="/"
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Головна
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground/60" />
          <Link
            href="/catalog/bilyzna"
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Білизна
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground/60" />
          <span className="text-foreground font-medium">
            {currentCategoryTitle}
          </span>
        </nav>
      </div>

      {/* --- Category Header & Description --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {currentCategoryTitle}
        </h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Комфорт, підтримка й краса — в нашій колекції бюстгальтерів ти знайдеш
          саме те, що підходить для тебе.
        </p>
      </div>

      {/* --- Subcategories Grid / Slider Section --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8">
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x scroll-smooth">
          {initialSubcategories.map((sub, index) => {
            const isSizeGuide = sub.slug === "size-guide";
            const fallbackImage =
              "https://mylhoikievakodeutzsi.supabase.co/storage/v1/object/public/assets/categories/bralette.jpg";

            // Open size guide modal or handle navigation
            const handleClick = (e: React.MouseEvent) => {
              if (isSizeGuide) {
                e.preventDefault();
                e.stopPropagation();
                setIsSizeGuideOpen(true);
              }
            };

            return (
              <Link
                key={sub.id}
                href={isSizeGuide ? "#" : `/catalog/bilyzna/${sub.slug}`}
                onClick={handleClick}
                className="shrink-0 w-36 sm:w-44 md:w-48 bg-card rounded-xl overflow-hidden border border-border/50 shadow-xs hover:shadow-md transition-all duration-300 group snap-start flex flex-col cursor-pointer"
              >
                {/* Image Box Container - Full cover without internal paddings */}
                <div className="w-full aspect-square relative bg-muted/20 overflow-hidden">
                  <Image
                    src={sub.image || fallbackImage}
                    alt={sub.title}
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    priority={index < 5}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                {/* Subcategory Label Box */}
                <div className="p-3 bg-card border-t border-border/40">
                  <h3 className="text-xs sm:text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {sub.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col gap-6 overflow-visible">
        <div className="w-full shrink-0 overflow-visible">
          <CatalogFilters />
        </div>

        <div className="w-full mt-2">
          {products.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-sm font-light">
              Не знайдено преміальних товарів за вказаними параметрами
              фільтрації.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* --- Pagination --- */}
          <div className="mt-12">
            <nav className="flex justify-center items-center gap-1">
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-border bg-card text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                &larr;
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold bg-accent text-accent-foreground shadow-xs">
                1
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                2
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-border bg-card text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                &rarr;
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* --- Quick View Modal System Layer --- */}
      {selectedQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
          <div
            onClick={() => setSelectedQuickView(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity cursor-pointer"
          />

          <div className="relative bg-background text-foreground w-full max-w-5xl rounded-3xl shadow-2xl border border-border overflow-y-auto no-scrollbar max-h-[90vh] p-6 md:p-8 z-10 scale-in duration-300">
            <button
              onClick={() => setSelectedQuickView(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-all z-30"
              aria-label="Закрити вікно"
            >
              <X className="w-4 h-4" />
            </button>

            <ProductDetailsBlock product={selectedQuickView} />
          </div>
        </div>
      )}

      {/* --- Size Calculator Modal Layer --- */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
          {/* Backdrop (Only clicking here closes the modal) */}
          <div
            onClick={() => setIsSizeGuideOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          {/* Modal Container (Event propagation blocked) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-background text-foreground w-full max-w-lg rounded-2xl shadow-2xl border border-border/40 overflow-hidden p-6 md:p-8 z-10 scale-in duration-200"
          >
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              aria-label="Закрити вікно"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-foreground uppercase">
                Підбір ідеального розміру
              </h2>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-relaxed">
                Введіть ваші точні анатомічні заміри в сантиметрах для розрахунку відповідної білизни за канонами нашого бренду.
              </p>
            </div>

            <SizeCalculatorForm
              onApplyFilter={(size) => {
                setIsSizeGuideOpen(false);
                console.log("Apply filter size:", size);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}