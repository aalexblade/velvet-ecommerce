"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Product, ProductCard } from "@/entities/product";
import { CatalogFilters } from "@/features/filters";
import { ProductDetailsBlock } from "@/widgets/product-details-block";

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

  // Використовуємо тільки живі продукти з бази даних Supabase без моків
  const products = useMemo(() => initialProducts, [initialProducts]);

  const currentCategoryTitle = useMemo(() => {
    if (!slug || slug.length === 0) return "Бюстгальтери";
    const lastSegment = slug[slug.length - 1].toLowerCase();
    const registry: Record<string, string> = {
      biusthaltery: "Бюстгальтери",
      bralette: "Бралети",
      "push-up": "Push-up",
      balconette: "Балконет",
      bilyzna: "Білизна",
      corset: "Корсети",
    };
    return registry[lastSegment] || "Бюстгальтери";
  }, [slug]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased pb-12">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      {/* --- Breadcrumbs Navigation --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex text-xs md:text-sm text-muted-foreground whitespace-nowrap overflow-x-auto no-scrollbar">
          <Link
            href="/"
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Головна
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/catalog"
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Білизна
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">
            {currentCategoryTitle}
          </span>
        </nav>
      </div>

      {/* --- Category Title --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground uppercase mb-1">
          {currentCategoryTitle}
        </h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Відкрийте для себе ідеальне поєднання витонченого дизайну та
          бездоганної підтримки.
        </p>
      </div>

      {/* --- Live Subcategories Slider Section --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8">
        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar snap-x scroll-smooth">
          {initialSubcategories.map((sub, index) => {
            const fallbackImage =
              "https://placehold.co/120x120/f5f5f5/a1a1aa?text=Velvet";
            return (
              <div
                key={sub.id}
                className="shrink-0 w-24 md:w-28 text-center cursor-pointer group snap-start"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-muted border border-transparent group-hover:border-muted-foreground/20 transition-all duration-300 shadow-sm relative">
                  <Image
                    src={sub.image || fallbackImage}
                    alt={sub.title}
                    fill
                    sizes="(max-width: 768px) 85px, 110px"
                    priority={index < 4}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <h3 className="mt-2 text-xs md:text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
                  {sub.title}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  Колекція
                </p>
              </div>
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
            <div className="text-center py-16 text-zinc-400 text-sm font-light">
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
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-zinc-200 bg-white text-zinc-400 cursor-pointer">
                &larr;
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold bg-[#C8205C] text-white shadow-sm">
                1
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium hover:bg-zinc-50 text-zinc-700 transition-colors cursor-pointer border border-zinc-200">
                2
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-zinc-200 bg-white text-zinc-400 cursor-pointer">
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

          <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-zinc-100 overflow-y-auto no-scrollbar max-h-[90vh] p-6 md:p-8 z-10 scale-in duration-300">
            <button
              onClick={() => setSelectedQuickView(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-zinc-100 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer transition-all z-30"
              aria-label="Закрити вікно"
            >
              <X className="w-4 h-4" />
            </button>

            <ProductDetailsBlock product={selectedQuickView} />
          </div>
        </div>
      )}
    </div>
  );
}
