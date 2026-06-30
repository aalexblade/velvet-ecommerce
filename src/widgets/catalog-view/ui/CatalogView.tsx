"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { Product, ProductColor } from "@/entities/product";
import { CatalogFilters } from "@/features/filters";
import { ProductDetailsBlock } from "@/widgets/product-details-block";

// Re-using the identical figma data format from the product page
const MOCK_DETAILED_PRODUCT: Product = {
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

const colorToClass = (color: ProductColor): string => {
  const map: Record<ProductColor, string> = {
    Black: "bg-zinc-900",
    Dark: "bg-zinc-800",
    White: "bg-zinc-100",
    "Smoky White": "bg-slate-200",
    Red: "bg-red-500",
    Cherry: "bg-red-600",
    Ruby: "bg-rose-700",
    "Wine Red": "bg-red-900",
    Magenta: "bg-fuchsia-600",
    "Cotton Candy": "bg-pink-200",
    Peach: "bg-orange-200",
    Lavender: "bg-purple-200",
    "Pale Purple": "bg-purple-300",
    Plum: "bg-purple-900",
    "Dark Violet": "bg-violet-950",
    Eggplant: "bg-indigo-950",
    Cream: "bg-amber-50",
    "Creamy Yellow": "bg-amber-100",
    "Creamy Velvet": "bg-yellow-50",
    "Raw Umber": "bg-amber-800",
    "Mahogany Brown": "bg-amber-900",
    "Magic Mint": "bg-emerald-200",
    Emerald: "bg-emerald-700",
    "Pearl Green": "bg-teal-600",
    "Azure Blue": "bg-sky-500",
    "Denim Blue": "bg-blue-600",
    "Midnight Blue": "bg-blue-950",
  };
  return map[color] || "bg-neutral-400";
};

interface CatalogViewProps {
  slug?: string[];
  initialProducts: Product[];
}

export function CatalogView({ slug, initialProducts }: CatalogViewProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(
    null,
  );

  // Synchronize local testing stream by injecting the target figma mockup product
  const localProducts = useMemo(() => {
    return [
      MOCK_DETAILED_PRODUCT,
      ...initialProducts.filter((p) => p.id !== MOCK_DETAILED_PRODUCT.id),
    ];
  }, [initialProducts]);

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
          бездоганної підтримки.
        </p>
      </div>

      {/* --- Subcategories Slider --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8">
        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar snap-x scroll-smooth">
          {MOCK_SUBCATEGORIES.map((sub, index) => (
            <div
              key={sub.id}
              className="shrink-0 w-24 md:w-28 text-center cursor-pointer group snap-start"
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

      {/* --- Main Content Area --- */}
      <div className="mt-8 flex flex-col gap-6">
        <CatalogFilters />

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {localProducts.map((product, idx) => {
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
                  className="group flex flex-col bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative w-full aspect-3/4 bg-neutral-100 overflow-hidden">
                    <Image
                      src={mainImage}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      priority={idx < 4}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

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

                    <div className="hidden lg:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-6 z-10">
                      <button
                        onClick={() => setSelectedQuickView(product)}
                        className="flex items-center justify-center bg-white/95 text-zinc-900 font-semibold text-sm px-6 py-2.5 rounded-lg shadow-sm hover:bg-white hover:text-[#C8205C] transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer border border-zinc-200"
                      >
                        Швидкий перегляд
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col grow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {uniqueColors.map((colorName, cIdx) => (
                          <span
                            key={cIdx}
                            title={colorName}
                            className={`w-5 h-5 rounded-md border border-zinc-300 shadow-xs cursor-pointer hover:scale-110 transition-transform ${colorToClass(colorName as ProductColor)}`}
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

                    <h2 className="text-sm font-semibold text-zinc-900 line-clamp-2 group-hover:text-[#C8205C] transition-colors">
                      {product.title}
                    </h2>

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
