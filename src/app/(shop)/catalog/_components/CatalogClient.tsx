'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, X, ChevronDown, SlidersHorizontal, Eye } from 'lucide-react';

// ==========================================
// 1. MOCK DATA & CONFIGURATION
// ==========================================

const MOCK_SUBCATEGORIES = [
  { id: 'push-up', title: 'Push-up', count: 42, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Push-up' },
  { id: 'balconette', title: 'Balconette', count: 28, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Balconette' },
  { id: 'bralette', title: 'Бралети', count: 35, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Bralette' },
  { id: 'soft-cup', title: 'М&apos;яка чашка', count: 19, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Soft+Cup' },
  { id: 'corset', title: 'Корсети', count: 14, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Corset' },
  { id: 'wireless', title: 'Без кісточок', count: 22, image: 'https://placehold.co/120x120/f5f5f5/a1a1aa?text=Wireless' },
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Мереживний бюстгальтер Balconette з формованою чашкою',
    price: 1250,
    oldPrice: 1560,
    colors: ['bg-product-black', 'bg-product-white', 'bg-product-ruby'],
    badges: ['-20%', 'NEW'],
    image: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+1',
  },
  {
    id: 2,
    title: 'Класичний гладкий бюстгальтер Push-up для глибокого декольте',
    price: 980,
    colors: ['bg-product-peach', 'bg-product-emerald', 'bg-product-denim-blue'],
    badges: ['NEW'],
    image: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+2',
  },
  {
    id: 3,
    title: 'Шовковий бралет без кісточок Velvet Dream',
    price: 1450,
    colors: ['bg-product-black', 'bg-product-smoky-white'],
    badges: [],
    image: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+3',
  },
  {
    id: 4,
    title: 'Бюстгальтер з м&apos;якою чашкою на кісточках Gentle Support',
    price: 1100,
    oldPrice: 1380,
    colors: ['bg-product-white', 'bg-product-cotton-candy'],
    badges: ['-20%'],
    image: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+4',
  },
  {
    id: 5,
    title: 'Мереживний корсетний топ Elegant Night',
    price: 2100,
    colors: ['bg-product-black'],
    badges: ['HOT'],
    image: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+5',
  },
  {
    id: 6,
    title: 'Базовий трикотажний бюстгальтер на кожен день Comfort Stretch',
    price: 850,
    colors: ['bg-product-smoky-white', 'bg-product-peach', 'bg-product-black'],
    badges: [],
    image: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+6',
  },
  {
    id: 7,
    title: 'Напівпрозорий бралет з вишивкою Floral Romance',
    price: 1600,
    colors: ['bg-product-ruby', 'bg-product-white'],
    badges: ['NEW'],
    image: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+7',
  },
  {
    id: 8,
    title: 'Бюстгальтер-анжеліка зі знімними бретелями Multiway Pro',
    price: 1350,
    oldPrice: 1680,
    colors: ['bg-product-black', 'bg-product-white', 'bg-product-smoky-white'],
    badges: ['-20%'],
    image: 'https://placehold.co/400x533/f5f5f5/a1a1aa?text=Product+8',
  },
];

interface CatalogClientProps {
  slug?: string[];
}

export default function CatalogClient({ slug }: CatalogClientProps) {
  // --- UI and Filtering States ---
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // --- Safe App Router Tracking Implementation ---
  if (slug && slug.length > 0) {
    console.log("Current white-label routing dynamic subcategory criteria:", slug);
  }

  // --- Toggle Wishlist Status ---
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const filteredCount = MOCK_PRODUCTS.length;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased pb-12">
      
      {/* ==========================================
          HEADER COMPONENT: Breadcrumbs Navigation
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex text-xs md:text-sm text-muted-foreground whitespace-nowrap overflow-x-auto no-scrollbar">
          <a href="#" className="hover:text-foreground transition-colors cursor-pointer">Головна</a>
          <span className="mx-2">/</span>
          <a href="#" className="hover:text-foreground transition-colors cursor-pointer">Білизна</a>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">
            {slug && slug.length > 1 ? slug[1] : 'Бюстгальтери'}
          </span>
        </nav>
      </div>

      {/* ==========================================
          CATEGORY TITLE & SEO DESCRIPTION NODE
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground uppercase mb-1">
          Бюстгальтери
        </h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Відкрийте для себе ідеальне поєднання витонченого дизайну та бездоганної підтримки. 
          У нашій колекції представлені моделі для будь-якого образу та типу фігури — від класичних 
          push-up до невагомих мереживних бралетів.
        </p>
      </div>

      {/* ==========================================
          SUB-CATEGORIES LAYOUT GRID WITH INERTIAL SLIDER
          ========================================== */}
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
              <p className="text-[10px] md:text-xs text-muted-foreground">{sub.count} од.</p>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          FILTERS COMPONENT: Desktop Dropdowns / Mobile Bar
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 border-y border-muted bg-card/50">
        <div className="flex items-center justify-between h-14">
          
          {/* --- Desktop Filter Elements Dropdown View --- */}
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

                {/* --- Dynamic Content Filter Dropdown Overlay Simulator --- */}
                {activeDropdown === filterName && (
                  <div className="absolute left-0 mt-1 w-56 rounded-xl bg-popover p-4 shadow-xl border border-muted z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Оберіть {filterName.toLowerCase()}:</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="rounded text-accent focus:ring-accent" /> Варіант 1
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="rounded text-accent focus:ring-accent" /> Варіант 2
                      </label>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* --- Sorting Selection Trigger Box --- */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Сортування:</span>
            <select className="text-sm font-medium bg-transparent border-none focus:ring-0 text-foreground cursor-pointer py-1">
              <option>За популярністю</option>
              <option>Від дешевих до дорогих</option>
              <option>Від дорогих до дешевих</option>
              <option>Новинки</option>
            </select>
          </div>

          {/* --- Mobile View Sheet Core Trigger --- */}
          <button 
            onClick={() => setIsMobileDrawerOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 w-full h-full text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фільтри та сортування
          </button>

        </div>
      </div>

      {/* --- Click Shield Closure Underlay --- */}
      {activeDropdown && (
        <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />
      )}

      {/* ==========================================
          PRODUCT CARDS CATALOGUE: Responsive Multi-Column Grid
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {MOCK_PRODUCTS.map((product, idx) => {
            const isFavorite = favorites.includes(product.id);
            return (
              <div key={product.id} className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-transparent hover:border-muted/50 hover:shadow-md transition-all duration-300">
                
                {/* --- Image Frame Stage Container (3/4 Proportion) --- */}
                <div className="relative w-full aspect-3/4 bg-muted overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    priority={idx < 4}
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500" 
                  />

                  {/* --- Marketing Labels & Tags Layers --- */}
                  {product.badges.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                      {product.badges.map((badge, bIdx) => (
                        <span 
                          key={bIdx}
                          className={`text-[10px] md:text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-md text-white ${
                            badge.includes('%') ? 'bg-accent text-accent-foreground' : 'bg-zinc-900 text-white'
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* --- Desktop Action Hover Quick View Mechanism --- */}
                  <div className="hidden lg:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-4 z-10">
                    <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-zinc-900 font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg hover:bg-white transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer">
                      <Eye className="w-3.5 h-3.5" />
                      Швидкий перегляд
                    </button>
                  </div>
                </div>

                {/* --- Product Core Metadata Workspace Area --- */}
                <div className="p-3 md:p-4 flex flex-col grow">
                  
                  {/* --- Swatches Rows and Favorite Controls Frame --- */}
                  <div className="flex items-center justify-between min-h-6">
                    {/* Swatches Elements Tracker */}
                    <div className="flex items-center gap-1.5">
                      {product.colors.map((colorClass, cIdx) => (
                        <span 
                          key={cIdx}
                          className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-zinc-200 shadow-sm cursor-pointer hover:scale-110 transition-transform ${colorClass}`}
                        />
                      ))}
                    </div>
                    {/* Wishlist Button Tracker */}
                    <button 
                      onClick={() => toggleFavorite(product.id)}
                      className="text-muted-foreground hover:text-accent transition-colors p-1 cursor-pointer"
                    >
                      <Heart 
                        className={`w-4 h-4 md:w-5 md:h-5 transition-all ${
                          isFavorite ? 'fill-accent text-accent scale-110' : ''
                        }`} 
                      />
                    </button>
                  </div>

                  {/* --- Production Title Link Element (Line Clamp Constraints) --- */}
                  <h2 className="mt-2 text-xs md:text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors line-clamp-2 min-h-8 md:min-h-10 leading-tight">
                    {product.title}
                  </h2>

                  {/* --- Financial Pricing Nodes (Hydration Failure Defended) --- */}
                  <div className="mt-2 flex items-baseline gap-2 flex-wrap" suppressHydrationWarning>
                    {product.oldPrice ? (
                      <>
                        <span className="text-sm md:text-base font-bold text-accent">
                          {product.price.toLocaleString('uk-UA')} ₴
                        </span>
                        <span className="text-xs md:text-sm text-muted-foreground line-through">
                          {product.oldPrice.toLocaleString('uk-UA')} ₴
                        </span>
                      </>
                    ) : (
                      <span className="text-sm md:text-base font-semibold text-foreground">
                        {product.price.toLocaleString('uk-UA')} ₴
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==========================================
          FOOTER NAVIGATION: Clean Centered Pagination
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <nav className="flex justify-center items-center gap-1">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-muted bg-card hover:bg-muted text-muted-foreground transition-colors cursor-pointer">
            &larr;
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold bg-accent text-accent-foreground shadow-sm cursor-pointer">
            1
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium hover:bg-muted text-foreground transition-colors cursor-pointer">
            2
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium hover:bg-muted text-foreground transition-colors cursor-pointer">
            3
          </button>
          <span className="px-2 text-muted-foreground text-sm selection:bg-transparent">...</span>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium hover:bg-muted text-foreground transition-colors cursor-pointer">
            12
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium border border-muted bg-card hover:bg-muted text-muted-foreground transition-colors cursor-pointer">
            &rarr;
          </button>
        </nav>
      </div>

      {/* ==========================================
          MOBILE INTERACTION CORE: Responsive Side Sheet Drawer
          ========================================== */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          
          {/* Backdrop Masking Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in duration-300"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer Paper Sheet Canvas */}
          <div className="relative w-full max-w-sm h-full bg-background flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 z-10">
            
            {/* Header Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-muted">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Фільтри
              </h2>
              <button 
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Parameter Selections Scroll Matrix Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-24">
              
              {/* Filter Module: Sort Methods */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-foreground">Сортувати за</h4>
                <div className="grid grid-cols-1 gap-2">
                  {['Популярністю', 'Ціною: від дешевих', 'Ціною: від дорогих', 'Новинками'].map((sortName, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-card border border-muted text-sm font-medium cursor-pointer">
                      <input type="radio" name="mobileSort" defaultChecked={idx === 0} className="text-accent focus:ring-accent" />
                      {sortName}
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Module: Size Grid Selection */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground">{"Розмір чашки / об&apos;єм"}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {['70A', '75A', '70B', '75B', '80B', '75C', '80C', '85C'].map((size) => (
                    <button key={size} className="h-10 rounded-xl border border-muted bg-card text-xs font-semibold hover:border-accent hover:text-accent transition-all cursor-pointer">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Module: Extended Swatches Mapping */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground">Колір</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'bg-product-black',
                    'bg-product-white',
                    'bg-product-ruby',
                    'bg-product-peach',
                    'bg-product-smoky-white',
                    'bg-product-cotton-candy'
                  ].map((colorClass, idx) => (
                    <button 
                      key={idx}
                      className="w-8 h-8 rounded-full border border-zinc-300 shadow-xs relative focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-accent cursor-pointer"
                    />
                  ))}
                </div>
              </div>

              {/* Filter Module: Price Range Boundaries */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground">Діапазон цін (₴)</h4>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Від" className="w-full h-10 rounded-xl bg-card border border-muted text-sm px-3 focus:ring-accent focus:border-accent" />
                  <span className="text-muted-foreground">—</span>
                  <input type="number" placeholder="До" className="w-full h-10 rounded-xl bg-card border border-muted text-sm px-3 focus:ring-accent focus:border-accent" />
                </div>
              </div>

            </div>

            {/* Sticky Submission Drawer Dynamic Trigger Button */}
            <div className="absolute bottom-0 inset-x-0 bg-background/90 backdrop-blur-md border-t border-muted p-4 z-20">
              <button 
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-full h-12 bg-accent text-accent-foreground font-bold text-sm rounded-xl shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 active:scale-98 transform duration-150 cursor-pointer"
              >
                Показати ({filteredCount}) товарів
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}