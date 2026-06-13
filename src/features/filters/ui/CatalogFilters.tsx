"use client";

import * as React from 'react';
import { X, Filter, Check } from 'lucide-react';
import { cn } from '@/shared/lib';
import { ProductColor } from '@/entities/product';
import { Button } from '@/shared/ui';

export interface FilterCriteria {
  priceRange: { min: number; max: number };
  sizes: string[];
  colors: ProductColor[];
}

export type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'popular';

export interface CatalogFiltersProps {
  activeFilters: FilterCriteria;
  onFilterChange: (filters: FilterCriteria) => void;
  currentSortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const AVAILABLE_COLORS: ProductColor[] = [
  'Black', 'White', 'Smoky White', 'Cream', 'Peach', 'Emerald', 'Denim Blue', 'Midnight Blue'
];

/**
 * CatalogFilters Feature
 * 
 * Provides responsive filtering and sorting for the product catalog.
 * Adapts between a desktop sidebar and a mobile slide-out drawer.
 */
export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  activeFilters,
  onFilterChange,
  currentSortOption,
  onSortChange,
  className,
}) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const toggleSize = (size: string) => {
    const newSizes = activeFilters.sizes.includes(size)
      ? activeFilters.sizes.filter((s) => s !== size)
      : [...activeFilters.sizes, size];
    onFilterChange({ ...activeFilters, sizes: newSizes });
  };

  const toggleColor = (color: ProductColor) => {
    const newColors = activeFilters.colors.includes(color)
      ? activeFilters.colors.filter((c) => c !== color)
      : [...activeFilters.colors, color];
    onFilterChange({ ...activeFilters, colors: newColors });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    onFilterChange({
      ...activeFilters,
      priceRange: { ...activeFilters.priceRange, [type]: numValue },
    });
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-8">
      {/* Sort Section */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Sort By</h3>
        <select
          value={currentSortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full bg-background border border-border rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </section>

      {/* Price Range Section */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Price Range</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            value={activeFilters.priceRange.min || ''}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            className="w-full bg-background border border-border rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary"
          />
          <span className="text-border">-</span>
          <input
            type="number"
            placeholder="Max"
            value={activeFilters.priceRange.max || ''}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            className="w-full bg-background border border-border rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary"
          />
        </div>
      </section>

      {/* Sizes Section */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={cn(
                "h-10 min-w-10 px-2 rounded-xl border text-xs font-medium transition-all",
                activeFilters.sizes.includes(size)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-foreground hover:bg-muted"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* Colors Section */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Colors</h3>
        <div className="grid grid-cols-4 gap-3">
          {AVAILABLE_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              title={color}
              className={cn(
                "group relative w-full aspect-square rounded-full border border-border overflow-hidden transition-all hover:scale-110",
                activeFilters.colors.includes(color) && "ring-2 ring-primary ring-offset-2"
              )}
              style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
            >
              {activeFilters.colors.includes(color) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile Trigger */}
      <div className="md:hidden w-full flex gap-3 mb-6">
        <Button
          variant="outline"
          onClick={() => setIsMobileOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-6"
        >
          <Filter className="w-4 h-4" />
          <span>Filters & Sort</span>
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col gap-8 w-64 shrink-0">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg font-bold font-sans text-foreground">Filters</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onFilterChange({ priceRange: { min: 0, max: 0 }, sizes: [], colors: [] })}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            Clear All
          </Button>
        </div>
        <FilterContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Drawer */}
          <div className="relative ml-auto w-[85%] h-full bg-background shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-bold font-sans">Filters & Sort</h2>
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <FilterContent />
            </div>

            <div className="p-4 border-t border-border bg-card">
              <Button 
                className="w-full rounded-xl py-6" 
                onClick={() => setIsMobileOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
