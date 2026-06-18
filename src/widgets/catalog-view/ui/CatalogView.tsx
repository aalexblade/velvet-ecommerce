"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, X, ChevronDown, SlidersHorizontal, Eye } from "lucide-react";
import { Product, ProductColor } from "@/entities/product";

interface CatalogViewProps {
  slug?: string[];
  initialProducts: Product[];
}

const MOCK_SUBCATEGORIES = [
  {
    id: "push-up",
    title: "Push-up",
    count: 42,
    image: "https://placehold.co/120x120/f5f5f5/a1a1aa?text=Push-up",
  },
  {
    id: "balconette",
    title: "Balconette",
    count: 28,
    image: "https://placehold.co/120x120/f5f5f5/a1a1aa?text=Balconette",
  },
  {
    id: "bralette",
    title: "Бралети",
    count: 35,
    image: "https://placehold.co/120x120/f5f5f5/a1a1aa?text=Bralette",
  },
  {
    id: "soft-cup",
    title: "М'яка чашка",
    count: 19,
    image: "https://placehold.co/120x120/f5f5f5/a1a1aa?text=Soft+Cup",
  },
  {
    id: "corset",
    title: "Корсети",
    count: 14,
    image: "https://placehold.co/120x120/f5f5f5/a1a1aa?text=Corset",
  },
  {
    id: "wireless",
    title: "Без кісточок",
    count: 22,
    image: "https://placehold.co/120x120/f5f5f5/a1a1aa?text=Wireless",
  },
];

// Transformed static color mapper aligned with the strict DB ProductColor model types
const colorToClass = (color: ProductColor): string => {
  const map: Record<string, string> = {
    Black: "bg-zinc-900",
    White: "bg-zinc-100",
    Ruby: "bg-rose-700",
    Peach: "bg-orange-200",
    Emerald: "bg-emerald-700",
    "Denim Blue": "bg-blue-600",
    "Smoky White": "bg-slate-200",
    "Cotton Candy": "bg-pink-200",
    "Wine Red": "bg-red-900",
    Cherry: "bg-red-600",
    Red: "bg-red-500",
    Plum: "bg-purple-900",
    "Dark Violet": "bg-violet-950",
    Lavender: "bg-purple-200",
    Cream: "bg-amber-50",
  };
  return map[color] || "bg-neutral-400";
};

import { CatalogFilters } from "@/features/filters";

export function CatalogView({ slug, initialProducts }: CatalogViewProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

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
          бездоганної підтримки. У нашій колекції представлені моделі для
          будь-якого образу та типу фігури.
        </p>
      </div>

      {/* --- Subcategories Slider --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8">
        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar snap-x scroll-smooth">
          {MOCK_SUBCATEGORIES.map((sub, index) => (
            <div
              key={sub.id}
              className="shrink-0 w-21.25 md:w-27.5 text-center cursor-pointer group snap-start"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-muted border border-transparent group-hover:border-muted-foreground/20 transition-all duration-300 shadow-sm relative">
                <Image
                  src={sub.image}
                  alt={sub.title}
                  fill
                  sizes="(max-width: 768px) 85px, 110px"
                  priority={index < 4}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-2 text-xs md:text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
                {sub.title}
              </h3>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                {sub.count} од.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Main Content Area (Restructured to full-width per Figma mockup) --- */}
      <div className="mt-8 flex flex-col gap-6">
        {/* Full-width Filters placed above products */}
        <CatalogFilters />

        {/* Product Grid - occupying full available width */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {initialProducts.map((product, idx) => {
              const isFavorite = favorites.includes(product.id);

              const mainImage =
                product.images?.[0]?.url ||
                "https://placehold.co/400x533/f5f5f5/a1a1aa?text=No+Image";
              const primaryVariant = product.variants?.[0];
              const currentPrice = primaryVariant?.price || 0;
              const oldPrice = primaryVariant?.old_price;

              const uniqueColors = Array.from(
                new Set(product.variants?.map((v) => v.color) || []),
              );
              const hasDiscount = !!oldPrice;

              return (
                <div
                  key={product.id}
                  /* Styled card with white background, border, and shadow as in Figma */
                  className="group flex flex-col bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden">
                    <Image
                      src={mainImage}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      priority={idx < 4}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Marketing badges styled with brand pink color and white background */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      {hasDiscount ? (
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md text-white bg-[#C8205C]">
                          Акція
                        </span>
                      ) : idx % 3 === 0 ? (
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md text-zinc-900 bg-white border border-zinc-200 shadow-xs">
                          Новинка
                        </span>
                      ) : null}
                    </div>

                    {/* Simplified Quick view button (removed icon, styled per Figma) */}
                    <div className="hidden lg:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-6 z-10">
                      <button className="flex items-center justify-center bg-white/95 text-zinc-900 font-semibold text-sm px-6 py-2.5 rounded-lg shadow-sm hover:bg-white hover:text-[#C8205C] transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer border border-zinc-200">
                        Швидкий перегляд
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col grow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {/* Square color swatches with rounded corners per Figma design */}
                        {uniqueColors.map((colorName, cIdx) => (
                          <span
                            key={cIdx}
                            title={colorName}
                            className={`w-5 h-5 rounded-md border border-zinc-300 shadow-xs cursor-pointer hover:scale-110 transition-transform ${colorToClass(colorName as any)}`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="text-zinc-400 hover:text-[#C8205C] transition-colors p-1 cursor-pointer"
                      >
                        <Heart
                          className={`w-5 h-5 transition-all ${isFavorite ? "fill-[#C8205C] text-[#C8205C] scale-110" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Product title with stronger typography and brand color on hover */}
                    <h2 className="text-sm font-semibold text-zinc-900 line-clamp-2 group-hover:text-[#C8205C] transition-colors">
                      {product.title}
                    </h2>

                    {/* Prices with strict brand pink for discounted price */}
                    <div className="mt-2 flex items-baseline gap-2 flex-wrap text-sm">
                      {hasDiscount ? (
                        <>
                          <span className="font-bold text-[#C8205C]">
                            {currentPrice} UAH
                          </span>
                          <span className="text-xs text-zinc-500 line-through decoration-[#C8205C]/40">
                            {oldPrice} UAH
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-zinc-900">
                          {currentPrice} UAH
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- Pagination --- */}
          <div className="mt-12">
            <nav className="flex justify-center items-center gap-1">
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-border bg-card text-muted-foreground cursor-pointer">
                &larr;
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold bg-accent text-accent-foreground shadow-sm">
                1
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium hover:bg-muted text-foreground transition-colors cursor-pointer">
                2
              </button>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-border bg-card text-muted-foreground cursor-pointer">
                &rarr;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}