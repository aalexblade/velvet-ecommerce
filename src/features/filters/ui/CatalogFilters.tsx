'use client';

import React, { useTransition, useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { X, ChevronDown, Check, Filter, Search } from 'lucide-react';
import { cn } from '@/shared/lib';
import { ProductColor } from '@/entities/product';

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest';

export interface CatalogFiltersProps {
  className?: string;
}

const AVAILABLE_SIZES = ['70A', '75B', '75C', '80B', '85B', '85C'];
const AVAILABLE_COLORS: ProductColor[] = [
  'Black', 'White', 'Smoky White', 'Cream', 'Peach', 'Emerald', 'Denim Blue', 'Midnight Blue'
];

const AVAILABLE_FABRICS = [
  { id: 'silk', title: 'Шовк' },
  { id: 'lace', title: 'Мереживо' },
  { id: 'velvet', title: 'Оксамит' },
  { id: 'satin', title: 'Атлас' },
  { id: 'cotton', title: 'Бавовна' }
];

const AVAILABLE_COLLECTIONS = [
  { id: 'velvet-dream', title: 'Velvet Dream' },
  { id: 'gentle-support', title: 'Gentle Support' },
  { id: 'silk-seduction', title: 'Silk Seduction' },
  { id: 'midnight-mystery', title: 'Midnight Mystery' }
];

const SORT_OPTIONS = [
  { id: 'popular', title: 'За популярністю' },
  { id: 'price-asc', title: 'Від дешевих до дорогих' },
  { id: 'price-desc', title: 'Від дорогих до дешевих' },
  { id: 'newest', title: 'За новинками' }
];

const SIZE_COLORS_MAP: Record<string, ProductColor[]> = {
  '70A': ['Black', 'White', 'Cream'],
  '75B': ['Black', 'Peach', 'Emerald'],
  '75C': ['White', 'Smoky White', 'Midnight Blue'],
  '80B': ['Black', 'Cream', 'Denim Blue'],
  '85B': ['Peach', 'Black'],
  '85C': ['White', 'Midnight Blue', 'Emerald']
};

const PRICE_PRESETS = [
  { label: '0 - 1 000 UAH', min: '0', max: '1000' },
  { label: '1 000 - 2 000 UAH', min: '1000', max: '2000' },
  { label: '2 000 - 3 000 UAH', min: '2000', max: '3000' },
  { label: '3 000 - 5 000 UAH', min: '3000', max: '5000' },
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
  const [isPending, startTransition] = useTransition();

  // Локальний стан для інпуту пошуку
  const [searchInputValue, setSearchInputValue] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setSearchInputValue(searchParams.get('search') || '');
  }, [searchParams]);

  const activeSizesFromUrl = searchParams.getAll('size');
  const activeColorsFromUrl = searchParams.getAll('color');
  const activeFabricsFromUrl = searchParams.getAll('fabric');
  const activeCollectionsFromUrl = searchParams.getAll('collection');
  
  const activeSizes = AVAILABLE_SIZES.filter(s => 
    activeSizesFromUrl.some(urlSize => urlSize.toLowerCase() === s.toLowerCase())
  );
  const activeColors = AVAILABLE_COLORS.filter(c => 
    activeColorsFromUrl.some(urlColor => urlColor.toLowerCase() === c.toLowerCase())
  );
  const activeFabrics = AVAILABLE_FABRICS.filter(f => 
    activeFabricsFromUrl.some(urlFabric => urlFabric.toLowerCase() === f.id.toLowerCase())
  );
  const activeCollections = AVAILABLE_COLLECTIONS.filter(col => 
    activeCollectionsFromUrl.some(urlCol => urlCol.toLowerCase() === col.id.toLowerCase())
  );

  const activeSort = (searchParams.get('sort') as SortOption) || 'popular';
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

  const handleSearchSubmit = () => {
    updateQueryParams('search', searchInputValue);
  };

  const handlePricePreset = (min: string, max: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get('minPrice') === min && params.get('maxPrice') === max) {
      params.delete('minPrice');
      params.delete('maxPrice');
    } else {
      params.set('minPrice', min);
      params.set('maxPrice', max);
    }
    params.delete('page');
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearAll = () => {
    setSearchInputValue('');
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const hasActiveFilters = 
    activeSizes.length > 0 || 
    activeColors.length > 0 || 
    minPrice || 
    maxPrice || 
    activeFabrics.length > 0 || 
    activeCollections.length > 0 ||
    searchParams.get('search');

  return (
    <div className={cn("w-full bg-white flex flex-col transition-opacity", isPending && "opacity-60 pointer-events-none", className)}>
      <div className="border-y border-zinc-200 py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* 1. СТАТИЧНА ІКОНКА ТА НАЗВА ЛІВОРУЧ СТРОГО ЗА МАКЕТОМ */}
            <div className="flex items-center gap-2 text-zinc-900 py-2 font-semibold text-xs uppercase tracking-wider shrink-0 mr-6 select-none cursor-pointer hover:text-pink-600 transition-colors">
              <Filter className="w-4 h-4 stroke-[2.5px]" />
              Всі Фільтри
            </div>

            {/* ГОРІЗОНТАЛЬНИЙ ДЕСКТОПНИЙ ТУЛБАР */}
            <div className="hidden md:flex items-center gap-6 flex-1 overflow-x-auto no-scrollbar">
              
              {/* А. НАЗВА ТОВАРУ (ТЕПЕР ЯК ВИПАДАЮЧЕ ВІКНО З ПОШУКОМ ВСЕРЕДИНІ) */}
              <div className="relative group shrink-0">
                <button className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-2 px-1 cursor-pointer",
                  searchParams.get('search') ? "text-pink-600" : "text-zinc-500 hover:text-zinc-900"
                )}>
                  Назва товару
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-40 bg-white border border-zinc-200 shadow-xl rounded-xl p-4 min-w-72 animate-in fade-in zoom-in-95 duration-200">
                  <div className="relative flex items-center w-full">
                    <Search className="absolute left-3 w-4 h-4 text-zinc-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Введіть назву..."
                      value={searchInputValue}
                      onChange={(e) => setSearchInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                      onBlur={handleSearchSubmit}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-8 py-2 text-xs font-medium text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
                    />
                    {searchInputValue && (
                      <button 
                        onClick={() => { setSearchInputValue(''); updateQueryParams('search', ''); }}
                        className="absolute right-2.5 text-zinc-400 hover:text-zinc-900 cursor-pointer p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Б. Ціна */}
              <div className="relative group shrink-0">
                <button className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-2 px-1 cursor-pointer",
                  minPrice || maxPrice ? "text-pink-600" : "text-zinc-500 hover:text-zinc-900"
                )}>
                  Ціна
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-40 bg-white border border-zinc-200 shadow-xl rounded-xl p-4 min-w-70 animate-in fade-in zoom-in-95 duration-200 space-y-3">
                  <div className="flex flex-col gap-1">
                    {PRICE_PRESETS.map((preset) => {
                      const isPresetActive = minPrice === preset.min && maxPrice === preset.max;
                      return (
                        <button
                          key={preset.label}
                          onClick={() => handlePricePreset(preset.min, preset.max)}
                          className={cn(
                            "w-full text-left py-1.5 px-2.5 text-xs rounded-md transition-colors cursor-pointer font-medium",
                            isPresetActive ? "bg-pink-50 text-pink-600 font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                          )}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="border-t border-zinc-100" />
                  <div className="flex flex-row items-center gap-2 w-full">
                    <div className="flex-1 relative flex items-center">
                      <span className="absolute left-3 text-xs text-zinc-400 font-medium pointer-events-none">від</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => updateQueryParams('minPrice', e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2 pl-9 pr-2 text-xs focus:border-zinc-400 focus:bg-white focus:outline-none text-zinc-800 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <span className="text-zinc-300 text-xs shrink-0">—</span>
                    <div className="flex-1 relative flex items-center">
                      <span className="absolute left-3 text-xs text-zinc-400 font-medium pointer-events-none">до</span>
                      <input
                        type="number"
                        placeholder="9999"
                        value={maxPrice}
                        onChange={(e) => updateQueryParams('maxPrice', e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2 pl-9 pr-2 text-xs focus:border-zinc-400 focus:bg-white focus:outline-none text-zinc-800 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* В. Розмір */}
              <div className="relative group shrink-0">
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
                <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-40 bg-white border border-zinc-200 shadow-xl rounded-xl p-3.5 min-w-70 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex flex-col gap-3">
                    {AVAILABLE_SIZES.map((size) => {
                      const isSizeSelected = activeSizes.includes(size);
                      const sizeColors = SIZE_COLORS_MAP[size] || [];

                      return (
                        <div key={size} className="flex items-center justify-between gap-4 border-b border-zinc-50 pb-2 last:border-0 last:pb-0">
                          <button
                            onClick={() => updateQueryParams('size', size, true)}
                            className={cn(
                              "h-8 px-3 rounded-md border text-xs font-semibold transition-all cursor-pointer shrink-0 min-w-12",
                              isSizeSelected ? "bg-zinc-900 text-white border-zinc-900 shadow-sm" : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                            )}
                          >
                            {size}
                          </button>

                          <div className="flex items-center gap-1.5 overflow-x-auto max-w-36 no-scrollbar">
                            {sizeColors.map((color) => {
                              const isColorSelected = activeColors.includes(color);
                              return (
                                <button
                                  key={`${size}-${color}`}
                                  onClick={() => updateQueryParams('color', color, true)}
                                  className={cn(
                                    "w-4 h-4 rounded-full border border-zinc-300 transition-transform hover:scale-110 cursor-pointer flex items-center justify-center shrink-0",
                                    colorBgMap[color],
                                    isColorSelected && "ring-1 ring-pink-600 ring-offset-0.5"
                                  )}
                                >
                                  {isColorSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Г. Колір */}
              <div className="relative group shrink-0">
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

              {/* Д. Тип Тканини */}
              <div className="relative group shrink-0">
                <button className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-2 px-1 cursor-pointer",
                  activeFabrics.length > 0 ? "text-pink-600" : "text-zinc-500 hover:text-zinc-900"
                )}>
                  Тип Тканини
                  {activeFabrics.length > 0 && (
                    <span className="text-[10px] bg-pink-600 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {activeFabrics.length}
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-40 bg-white border border-zinc-200 shadow-xl rounded-xl py-1.5 min-w-70 animate-in fade-in zoom-in-95 duration-200">
                  {AVAILABLE_FABRICS.map((fabric) => {
                    const isFabricSelected = activeFabrics.some(f => f.id === fabric.id);
                    return (
                      <button
                        key={fabric.id}
                        onClick={() => updateQueryParams('fabric', fabric.id, true)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer flex items-center justify-between font-medium",
                          isFabricSelected ? "bg-pink-50 text-pink-600 font-bold" : "text-zinc-700 hover:bg-zinc-50"
                        )}
                      >
                        {fabric.title}
                        {isFabricSelected && <Check className="w-3.5 h-3.5 text-pink-600 stroke-[2.5px]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Е. Колекція */}
              <div className="relative group shrink-0">
                <button className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-2 px-1 cursor-pointer",
                  activeCollections.length > 0 ? "text-pink-600" : "text-zinc-500 hover:text-zinc-900"
                )}>
                  Колекція
                  {activeCollections.length > 0 && (
                    <span className="text-[10px] bg-pink-600 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {activeCollections.length}
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-40 bg-white border border-zinc-200 shadow-xl rounded-xl py-1.5 min-w-70 animate-in fade-in zoom-in-95 duration-200">
                  {AVAILABLE_COLLECTIONS.map((col) => {
                    const isCollectionSelected = activeCollections.some(c => c.id === col.id);
                    return (
                      <button
                        key={col.id}
                        onClick={() => updateQueryParams('collection', col.id, true)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer flex items-center justify-between font-medium",
                          isCollectionSelected ? "bg-pink-50 text-pink-600 font-bold" : "text-zinc-700 hover:bg-zinc-50"
                        )}
                      >
                        {col.title}
                        {isCollectionSelected && <Check className="w-3.5 h-3.5 text-pink-600 stroke-[2.5px]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {hasActiveFilters && (
                <button 
                  onClick={clearAll}
                  className="text-xs font-bold uppercase tracking-wider text-pink-600 hover:text-pink-700 transition-colors ml-2 cursor-pointer shrink-0"
                >
                  Очистити все
                </button>
              )}
            </div>

            {/* СОРТУВАТИ ЗА — СТРОГО ПРАВОРУЧ */}
            <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
              <label className="text-xs font-medium text-zinc-400">Сортувати за:</label>
              <div className="relative group">
                <button className="flex items-center gap-1 text-xs font-semibold text-zinc-800 hover:text-pink-600 py-2 cursor-pointer transition-colors">
                  {SORT_OPTIONS.find(o => o.id === activeSort)?.title || 'За популярністю'}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute right-0 top-full mt-1 hidden group-hover:block z-45 bg-white border border-zinc-200 shadow-xl rounded-xl py-1.5 min-w-48 animate-in fade-in zoom-in-95 duration-200">
                  {SORT_OPTIONS.map((opt) => {
                    const isSelected = activeSort === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => updateQueryParams('sort', opt.id)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer flex items-center justify-between font-medium",
                          isSelected ? "bg-pink-50 text-pink-600 font-bold" : "text-zinc-700 hover:bg-zinc-50"
                        )}
                      >
                        {opt.title}
                        {isSelected && <Check className="w-3.5 h-3.5 text-pink-600 stroke-[2.5px]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ACTIVE BADGES ROW */}
      {hasActiveFilters && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-2 items-center animate-in fade-in duration-300">
          {searchParams.get('search') && (
            <span className="inline-flex items-center gap-1.5 bg-zinc-50 text-zinc-800 rounded-md text-[11px] font-medium px-2.5 py-1 border border-zinc-200">
              Пошук: "{searchParams.get('search')}"
              <button onClick={() => { setSearchInputValue(''); updateQueryParams('search', ''); }} className="text-zinc-400 hover:text-pink-600 transition-colors cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}

          {activeCollections.map(col => (
            <span key={`badge-col-${col.id}`} className="inline-flex items-center gap-1.5 bg-zinc-50 text-zinc-800 rounded-md text-[11px] font-medium px-2.5 py-1 border border-zinc-200">
              Колекція: {col.title}
              <button onClick={() => updateQueryParams('collection', col.id, true)} className="text-zinc-400 hover:text-pink-600 transition-colors cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          ))}

          {activeFabrics.map(fabric => (
            <span key={`badge-fabric-${fabric.id}`} className="inline-flex items-center gap-1.5 bg-zinc-50 text-zinc-800 rounded-md text-[11px] font-medium px-2.5 py-1 border border-zinc-200">
              Тканина: {fabric.title}
              <button onClick={() => updateQueryParams('fabric', fabric.id, true)} className="text-zinc-400 hover:text-pink-600 transition-colors cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          ))}

          {activeColors.map(color => (
            <span key={`badge-color-${color}`} className="inline-flex items-center gap-1.5 bg-zinc-50 text-zinc-800 rounded-md text-[11px] font-medium px-2.5 py-1 border border-zinc-200">
              Колір: {color}
              <button onClick={() => updateQueryParams('color', color, true)} className="text-zinc-400 hover:text-pink-600 transition-colors cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          ))}

          {activeSizes.map(size => (
            <span key={`badge-size-${size}`} className="inline-flex items-center gap-1.5 bg-zinc-50 text-zinc-800 rounded-md text-[11px] font-medium px-2.5 py-1 border border-zinc-200">
              Розмір: {size}
              <button onClick={() => updateQueryParams('size', size, true)} className="text-zinc-400 hover:text-pink-600 transition-colors cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          ))}

          {(minPrice || maxPrice) && (
            <span className="inline-flex items-center gap-1.5 bg-zinc-50 text-zinc-800 rounded-md text-[11px] font-medium px-2.5 py-1 border border-zinc-200">
              Ціна: {minPrice || '0'} - {maxPrice || '∞'} UAH
              <button onClick={() => { updateQueryParams('minPrice', ''); updateQueryParams('maxPrice', ''); }} className="text-zinc-400 hover:text-pink-600 transition-colors cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}

          <button onClick={clearAll} className="text-[11px] font-bold text-pink-600 hover:text-pink-700 transition-colors ml-2 uppercase tracking-wider cursor-pointer">Скинути все</button>
        </div>
      )}
    </div>
  );
};