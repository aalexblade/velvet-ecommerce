'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { X, ChevronDown, Check, Filter } from 'lucide-react';
import { cn } from '@/shared/lib';
import { ProductColor } from '@/entities/product';
import { Button } from '@/shared/ui';

export type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'popular';

export interface CatalogFiltersProps {
  className?: string;
}

const AVAILABLE_SIZES = ['70A', '75B', '75C', '80B', '85B', '85C'];
const AVAILABLE_COLORS: ProductColor[] = [
  'Black', 'White', 'Smoky White', 'Cream', 'Peach', 'Emerald', 'Denim Blue', 'Midnight Blue'
];

const colorBgMap: Record<ProductColor, string> = {
  Black: 'bg-zinc-900',
  White: 'bg-zinc-100 border border-zinc-300',
  'Smoky White': 'bg-slate-200',
  Cream: 'bg-amber-50 border border-zinc-200',
  Peach: 'bg-orange-200',
  Emerald: 'bg-emerald-700',
  'Denim Blue': 'bg-blue-600',
  'Midnight Blue': 'bg-blue-950',
  Lavender: 'bg-purple-200',
  'Creamy Yellow': 'bg-yellow-100',
  'Creamy Velvet': 'bg-stone-200',
  'Cotton Candy': 'bg-pink-200',
  'Pale Purple': 'bg-purple-300',
  Eggplant: 'bg-purple-900',
  Cherry: 'bg-red-600',
  'Dark Violet': 'bg-violet-900',
  Plum: 'bg-fuchsia-950',
  Ruby: 'bg-rose-700',
  'Wine Red': 'bg-red-900',
  Magenta: 'bg-pink-600',
  Red: 'bg-red-500',
  'Mahogany Brown': 'bg-amber-950',
  'Magic Mint': 'bg-emerald-200',
  'Pearl Green': 'bg-teal-600',
  'Azure Blue': 'bg-sky-500',
  'Raw Umber': 'bg-stone-600',
  Dark: 'bg-neutral-800'
};

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();

  const activeSizesFromUrl = searchParams.getAll('size');
  const activeColorsFromUrl = searchParams.getAll('color');
  
  const activeSizes = AVAILABLE_SIZES.filter(s => 
    activeSizesFromUrl.some(urlSize => urlSize.toLowerCase() === s.toLowerCase())
  );
  const activeColors = AVAILABLE_COLORS.filter(c => 
    activeColorsFromUrl.some(urlColor => urlColor.toLowerCase() === c.toLowerCase())
  );
  const activeSort = (searchParams.get('sort') as SortOption) || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const updateQueryParams = (name: string, value: string | string[], isArray = false) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (isArray) {
      const currentValues = params.getAll(name);
      const val = value as string;
      if (currentValues.includes(val)) {
        const newValues = currentValues.filter(v => v !== val);
        params.delete(name);
        newValues.forEach(v => params.append(name, v));
      } else {
        params.append(name, val);
      }
    } else {
      if (value) {
        params.set(name, value as string);
      } else {
        params.delete(name);
      }
    }
    params.delete('page');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearAll = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const hasActiveFilters = activeSizes.length > 0 || activeColors.length > 0 || minPrice || maxPrice;

  return (
    <div className={cn("w-full bg-white flex flex-col transition-opacity", isPending && "opacity-60 pointer-events-none", className)}>
      <div className="border-y border-zinc-200 py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* DESKTOP FILTERS (Виправлено позиціонування) */}
            <div className="hidden md:flex items-center gap-6">
              
              {/* Фільтр: Розмір */}
              <div className="relative group">
                <button className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-2 px-1 cursor-pointer",
                  activeSizes.length > 0 ? "text-pink-600" : "text-zinc-500 hover:text-zinc-900"
                )}>
                  Розмір
                  {activeSizes.length > 0 && (
                    <span className="text-[10px] bg-pink-600 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {activeSizes.length}
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-40 bg-white border border-zinc-200 shadow-xl rounded-xl p-4 min-w-70 animate-in fade-in zoom-in-95 duration-200">
                  <div className="grid grid-cols-3 gap-1.5">
                    {AVAILABLE_SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => updateQueryParams('size', size, true)}
                        className={cn(
                          "h-9 rounded-md border text-xs font-medium transition-all cursor-pointer",
                          activeSizes.includes(size)
                            ? "bg-zinc-900 text-white border-zinc-900 font-semibold"
                            : "bg-background border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Фільтр: Колір */}
              <div className="relative group">
                <button className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-2 px-1 cursor-pointer",
                  activeColors.length > 0 ? "text-pink-600" : "text-zinc-500 hover:text-zinc-900"
                )}>
                  Колір
                  {activeColors.length > 0 && (
                    <span className="text-[10px] bg-pink-600 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {activeColors.length}
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-40 bg-white border border-zinc-200 shadow-xl rounded-xl p-4 min-w-70 animate-in fade-in zoom-in-95 duration-200">
                  <div className="grid grid-cols-4 gap-2.5">
                    {AVAILABLE_COLORS.map((color) => {
                      const isSelected = activeColors.includes(color);
                      return (
                        <button
                          key={color}
                          onClick={() => updateQueryParams('color', color, true)}
                          title={color}
                          className={cn(
                            "group relative w-full aspect-square rounded-full border border-zinc-200 transition-all hover:scale-105 cursor-pointer flex items-center justify-center",
                            colorBgMap[color],
                            isSelected && "ring-2 ring-pink-600 ring-offset-1"
                          )}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white drop-shadow-xs stroke-[3px]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Фільтр: Ціна — СУВОРО В ОДИН РЯДОК ЗА МАКЕТОМ ФІГМИ */}
              <div className="relative group">
                <button className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-2 px-1 cursor-pointer",
                  minPrice || maxPrice ? "text-pink-600" : "text-zinc-500 hover:text-zinc-900"
                )}>
                  Ціна
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-40 bg-white border border-zinc-200 shadow-xl rounded-xl p-4 min-w-70 animate-in fade-in zoom-in-95 duration-200">
                  {/* flex-row змушує інпути встати горизонтально в лінію */}
                  <div className="flex flex-row items-center gap-2 w-full">
                    
                    {/* Інпут: від */}
                    <div className="flex-1 relative flex items-center">
                      <span className="absolute left-3 text-xs text-zinc-400 font-medium pointer-events-none">від</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => updateQueryParams('minPrice', e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2 pl-9 pr-2.5 text-xs focus:border-zinc-400 focus:bg-white focus:outline-none text-zinc-800 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    
                    {/* Елегантний розділювач-тире */}
                    <span className="text-zinc-300 text-xs shrink-0">—</span>
                    
                    {/* Інпут: до */}
                    <div className="flex-1 relative flex items-center">
                      <span className="absolute left-3 text-xs text-zinc-400 font-medium pointer-events-none">до</span>
                      <input
                        type="number"
                        placeholder="9999"
                        value={maxPrice}
                        onChange={(e) => updateQueryParams('maxPrice', e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2 pl-9 pr-2.5 text-xs focus:border-zinc-400 focus:bg-white focus:outline-none text-zinc-800 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>

                  </div>
                </div>
              </div>
              
              {hasActiveFilters && (
                <button 
                  onClick={clearAll}
                  className="text-xs font-bold uppercase tracking-wider text-pink-600 hover:text-pink-700 transition-colors ml-2 cursor-pointer"
                >
                  Очистити все
                </button>
              )}
            </div>

            {/* MOBILE FILTER TOGGLE */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-800 py-2 cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              Фільтри
              {hasActiveFilters && (
                <span className="bg-pink-600 text-white w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold">
                  {activeSizes.length + activeColors.length + (minPrice || maxPrice ? 1 : 0)}
                </span>
              )}
            </button>

            {/* SORT SELECTOR (Крайній правий кут) */}
            <div className="flex items-center gap-2">
              <label className="hidden sm:block text-xs font-medium text-zinc-400">Сортувати за:</label>
              <select
                value={activeSort}
                onChange={(e) => updateQueryParams('sort', e.target.value)}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer text-zinc-800 hover:text-pink-600 pr-1 transition-colors"
              >
                <option value="newest">Новинками</option>
                <option value="price-low-high">Ціною: від низької</option>
                <option value="price-high-low">Ціною: від високої</option>
                <option value="popular">Популярністю</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* ACTIVE BADGES ROW */}
      {hasActiveFilters && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-2 items-center animate-in fade-in duration-300">
          {activeSizes.map(size => (
            <span
              key={`badge-size-${size}`}
              className="inline-flex items-center gap-1.5 bg-zinc-50 text-zinc-800 rounded-md text-[11px] font-medium px-2.5 py-1 border border-zinc-200"
            >
              Розмір: {size}
              <button onClick={() => updateQueryParams('size', size, true)} className="text-zinc-400 hover:text-pink-600 transition-colors cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {activeColors.map(color => (
            <span
              key={`badge-color-${color}`}
              className="inline-flex items-center gap-1.5 bg-zinc-50 text-zinc-800 rounded-md text-[11px] font-medium px-2.5 py-1 border border-zinc-200"
            >
              Колір: {color}
              <button onClick={() => updateQueryParams('color', color, true)} className="text-zinc-400 hover:text-pink-600 transition-colors cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {(minPrice || maxPrice) && (
            <span className="inline-flex items-center gap-1.5 bg-zinc-50 text-zinc-800 rounded-md text-[11px] font-medium px-2.5 py-1 border border-zinc-200">
              Ціна: {minPrice || '0'} - {maxPrice || '∞'} UAH
              <button 
                onClick={() => {
                  updateQueryParams('minPrice', '');
                  updateQueryParams('maxPrice', '');
                }} 
                className="text-zinc-400 hover:text-pink-600 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button 
            onClick={clearAll}
            className="text-[11px] font-bold text-pink-600 hover:text-pink-700 transition-colors ml-2 uppercase tracking-wider cursor-pointer"
          >
            Скинути все
          </button>
        </div>
      )}

      {/* MOBILE DRAWER */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsMobileOpen(false)} />
          <div className="relative w-full max-w-sm h-full bg-background flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200">
              <h2 className="text-sm font-bold uppercase tracking-wider">Фільтри</h2>
              <button onClick={() => setIsMobileOpen(false)} className="p-2 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Розмір</h3>
                <div className="grid grid-cols-3 gap-1.5">
                  {AVAILABLE_SIZES.map(size => (
                    <button key={size} onClick={() => updateQueryParams('size', size, true)} className={cn("h-9 rounded-md border text-xs font-medium cursor-pointer", activeSizes.includes(size) ? "bg-zinc-900 text-white border-zinc-900" : "border-zinc-200 text-zinc-700")}>{size}</button>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Колір</h3>
                <div className="grid grid-cols-4 gap-2.5">
                  {AVAILABLE_COLORS.map(color => (
                    <button key={color} onClick={() => updateQueryParams('color', color, true)} className={cn("w-full aspect-square rounded-full border border-zinc-200 cursor-pointer flex items-center justify-center", colorBgMap[color], activeColors.includes(color) && "ring-2 ring-pink-600 ring-offset-1")}>
                      {activeColors.includes(color) && <Check className="w-3 h-3 text-white" />}
                    </button>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Ціна</h3>
                <div className="flex flex-row gap-2">
                  <input type="number" placeholder="Від" value={minPrice} onChange={e => updateQueryParams('minPrice', e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-1.5 px-3 text-xs" />
                  <input type="number" placeholder="До" value={maxPrice} onChange={e => updateQueryParams('maxPrice', e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-md py-1.5 px-3 text-xs" />
                </div>
              </section>
            </div>
            <div className="p-4 border-t border-zinc-200 bg-white">
              <Button className="w-full rounded-md py-5 text-xs font-bold uppercase tracking-wider" onClick={() => setIsMobileOpen(false)}>Застосувати</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};