'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, X, ChevronDown, SlidersHorizontal, Eye } from 'lucide-react';
import { Product, ProductColor } from '@/entities/product';

interface CatalogViewProps {
  slug?: string[];
  initialProducts: Product[];
}

const MOCK_SUBCATEGORIES = [
  { id: 'push-up', title: 'Push-up', count: 42, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Push-up' },
  { id: 'balconette', title: 'Balconette', count: 28, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Balconette' },
  { id: 'bralette', title: 'Бралети', count: 35, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Bralette' },
  { id: 'soft-cup', title: 'М\'яка чашка', count: 19, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Soft+Cup' },
  { id: 'corset', title: 'Корсети', count: 14, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Corset' },
  { id: 'wireless', title: 'Без кісточок', count: 22, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Wireless' },
];

// Helper mapper to transform strict database ProductColor tokens to presentation palette classes
const colorToClass = (color: ProductColor): string => {
  const map: Record<string, string> = {
    'Black': 'bg-zinc-900',
    'White': 'bg-zinc-100',
    'Ruby': 'bg-rose-700',
    'Peach': 'bg-orange-200',
    'Emerald': 'bg-emerald-700',
    'Denim Blue': 'bg-blue-600',
    'Smoky White': 'bg-slate-200',
    'Cotton Candy': 'bg-pink-200',
  };
  return map[color] || 'bg-neutral-400';
};

export function CatalogView({ slug, initialProducts }: CatalogViewProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const filteredCount = initialProducts.length;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased pb-12">
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- Breadcrumbs Navigation --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex text-xs md:text-sm text-muted-foreground whitespace-nowrap overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-foreground transition-colors cursor-pointer">Головна</Link>
          <span className="mx-2">/</span>
          <Link href="/catalog" className="hover:text-foreground transition-colors cursor-pointer">Білизна</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">
            {slug && slug.length > 1 ? slug[1] : 'Бюстгальтери'}
          </span>
        </nav>
      </div>

      {/* --- Category Title --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground uppercase mb-1">
          Бюстгальтери
        </h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Відкрийте для себе ідеальне поєднання витонченого дизайну та бездоганної підтримки. 
          У нашій колекції представлені моделі для будь-якого образу та типу фігури.
        </p>
      </div>

      {/* --- Subcategories Slider --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8">
        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar snap-x scroll-smooth">
          {MOCK_SUBCATEGORIES.map((sub, index) => (
            <div key={sub.id} className="shrink-0 w-21.25 md:w-27.5 text-center cursor-pointer group snap-start">
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
              <p className="text-[10px] md:text-xs text-muted-foreground">{sub.count} од.</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Toolbar --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 border-y border-muted bg-card/50">
        <div className="flex items-center justify-between h-14">
          <div className="hidden md:flex items-center gap-6">
            {['Розмір', 'Колір', 'Ціна', 'Колекція'].map((filterName) => (
              <div key={filterName} className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === filterName ? null : filterName)}
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer"
                >
                  {filterName}
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsMobileDrawerOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 w-full h-full text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фільтри та сортування
          </button>
        </div>
      </div>

      {activeDropdown && (
        <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />
      )}

      {/* ==========================================
          PRODUCT CARDS CATALOGUE (Зведено під реляційну схему)
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {initialProducts.map((product, idx) => {
            const isFavorite = favorites.includes(product.id);
            
            // Safe relational array unboxing primitives for presentation layers
            const mainImage = product.images?.[0]?.url || 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=No+Image';
            const primaryVariant = product.variants?.[0];
            const currentPrice = primaryVariant?.price || 0;
            const oldPrice = primaryVariant?.old_price;
            
            // Extract distinct colors from variant collections to map swatches
            const uniqueColors = Array.from(new Set(product.variants?.map((v) => v.color) || []));
            const salePercentage = oldPrice ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;

            return (
              <div key={product.id} className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-transparent hover:border-border/50 hover:shadow-md transition-all duration-300">
                
                <div className="relative w-full aspect-3/4 bg-muted overflow-hidden">
                  <Image 
                    src={mainImage} 
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    priority={idx < 4}
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500" 
                  />

                  {salePercentage > 0 && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                      <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-md text-white-200 bg-accent text-accent-foreground">
                        -{salePercentage}%
                      </span>
                    </div>
                  )}

                  <div className="hidden lg:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-4 z-10">
                    <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-zinc-900 font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg hover:bg-white transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer">
                      <Eye className="w-3.5 h-3.5" />
                      Швидкий перегляд
                    </button>
                  </div>
                </div>

                <div className="p-3 md:p-4 flex flex-col grow">
                  <div className="flex items-center justify-between min-h-6">
                    <div className="flex items-center gap-1.5">
                      {uniqueColors.map((colorName, cIdx) => (
                        <span 
                          key={cIdx}
                          title={colorName}
                          className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-zinc-200 shadow-sm cursor-pointer hover:scale-110 transition-transform ${colorToClass(colorName)}`}
                        />
                      ))}
                    </div>
                    <button 
                      onClick={() => toggleFavorite(product.id)}
                      className="text-muted-foreground hover:text-accent transition-colors p-1 cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 md:w-5 md:h-5 transition-all ${isFavorite ? 'fill-accent text-accent scale-110' : ''}`} />
                    </button>
                  </div>

                  <h2 className="mt-2 text-xs md:text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors line-clamp-2 min-h-8 md:min-h-10 leading-tight">
                    {product.title}
                  </h2>

                  <div className="mt-2 flex items-baseline gap-2 flex-wrap" suppressHydrationWarning>
                    {oldPrice ? (
                      <>
                        <span className="text-sm md:text-base font-bold text-accent">
                          {currentPrice.toLocaleString('uk-UA')} ₴
                        </span>
                        <span className="text-xs md:text-sm text-muted-foreground line-through">
                          {oldPrice.toLocaleString('uk-UA')} ₴
                        </span>
                      </>
                    ) : (
                      <span className="text-sm md:text-base font-semibold text-foreground">
                        {currentPrice.toLocaleString('uk-UA')} ₴
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Pagination --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <nav className="flex justify-center items-center gap-1">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-border bg-card text-muted-foreground cursor-pointer">&larr;</button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold bg-accent text-accent-foreground shadow-sm">1</button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium hover:bg-muted text-foreground transition-colors cursor-pointer">2</button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-border bg-card text-muted-foreground cursor-pointer">&rarr;</button>
        </nav>
      </div>

      {/* --- Mobile Drawer --- */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsMobileDrawerOpen(false)} />
          <div className="relative w-full max-w-sm h-full bg-background flex flex-col shadow-2xl z-10">
            <div className="flex items-center justify-between p-4 border-b border-muted">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Фільтри
              </h2>
              <button onClick={() => setIsMobileDrawerOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-background/90 backdrop-blur-md border-t border-muted p-4 z-20">
              <button onClick={() => setIsMobileDrawerOpen(false)} className="w-full h-12 bg-accent text-accent-foreground font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                Показати ({filteredCount}) товарів
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}