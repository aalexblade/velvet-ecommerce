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

      {/* --- Main Content Grid (Filters + Products) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <CatalogFilters className="md:w-64" />

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
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
                  className="group flex flex-col bg-background rounded-xs overflow-hidden transition-all duration-300"
                >
                  <div className="relative w-full aspect-3/4 bg-neutral-100 overflow-hidden rounded-sm">
                    <Image
                      src={mainImage}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      priority={idx < 4}
                      className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    />

                    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                      {hasDiscount ? (
                        <span className="text-[9px] md:text-10px font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs text-white bg-pink-600">
                          Акція
                        </span>
                      ) : idx % 3 === 0 ? (
                        <span className="text-[9px] md:text-10px font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs text-zinc-900 bg-zinc-100 border border-zinc-200">
                          Новинка
                        </span>
                      ) : null}
                    </div>

                    <div className="hidden lg:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-4 z-10">
                      <button className="flex items-center gap-2 bg-white/95 text-zinc-900 font-medium text-xs px-4 py-2 rounded-md shadow-sm hover:bg-white transition-all transform translate-y-1 group-hover:translate-y-0 cursor-pointer">
                        <Eye className="w-3.5 h-3.5" />
                        Швидкий перегляд
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-col grow">
                    <div className="flex items-center justify-between min-h-5">
                      <div className="flex items-center gap-1.5">
                        {uniqueColors.map((colorName, cIdx) => (
                          <span
                            key={cIdx}
                            title={colorName}
                            className={`w-3 h-3 rounded-full border border-zinc-200/80 shadow-xs cursor-pointer hover:scale-110 transition-transform ${colorToClass(colorName as any)}`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="text-muted-foreground hover:text-pink-600 transition-colors p-1 cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 transition-all ${isFavorite ? "fill-pink-600 text-pink-600 scale-105" : ""}`}
                        />
                      </button>
                    </div>

                    <h2 className="mt-1.5 text-xs md:text-sm font-medium text-zinc-800 line-clamp-1 group-hover:text-pink-600 transition-colors">
                      {product.title}
                    </h2>

                    <div className="mt-1 flex items-baseline gap-2 flex-wrap text-xs md:text-sm">
                      {hasDiscount ? (
                        <>
                          <span className="font-bold text-pink-600">
                            {currentPrice} UAH
                          </span>
                          <span className="text-11px md:text-xs text-muted-foreground line-through decoration-pink-600/40">
                            {oldPrice} UAH
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold text-zinc-900">
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