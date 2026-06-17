import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { X, Filter, Check } from 'lucide-react';
import { cn } from '@/shared/lib';
import { ProductColor } from '@/entities/product';
import { Button } from '@/shared/ui';

export interface FilterCriteria {
  priceRange: { min: number; max: number };
  sizes: string[];
  colors: string[];
}

export type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'popular';

export interface CatalogFiltersProps {
  className?: string;
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const AVAILABLE_COLORS: ProductColor[] = [
  'Black', 'White', 'Smoky White', 'Cream', 'Peach', 'Emerald', 'Denim Blue', 'Midnight Blue'
];

/**
 * CatalogFilters Feature
 * 
 * Synchronizes filter state with URL Query Strings for SEO and shareability.
 * Uses Next.js navigation hooks to manage searchParams.
 */
export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Sync state from URL
  const activeSizes = searchParams.getAll('size');
  const activeColors = searchParams.getAll('color');
  const activeSort = (searchParams.get('sort') as SortOption) || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const updateQueryParams = (name: string, value: string | string[], isArray = false) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (isArray) {
      const currentValues = params.getAll(name);
      const val = value as string;
      if (currentValues.includes(val)) {
        // Remove item from array params
        const newValues = currentValues.filter(v => v !== val);
        params.delete(name);
        newValues.forEach(v => params.append(name, v));
      } else {
        // Add item to array params
        params.append(name, val);
      }
    } else {
      if (value) {
        params.set(name, value as string);
      } else {
        params.delete(name);
      }
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-8">
      {/* Sort Section */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Sort By</h3>
        <select
          value={activeSort}
          onChange={(e) => updateQueryParams('sort', e.target.value)}
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
            value={minPrice}
            onChange={(e) => updateQueryParams('minPrice', e.target.value)}
            className="w-full bg-background border border-border rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary"
          />
          <span className="text-border">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateQueryParams('maxPrice', e.target.value)}
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
              onClick={() => updateQueryParams('size', size, true)}
              className={cn(
                "h-10 min-w-10 px-2 rounded-xl border text-xs font-medium transition-all",
                activeSizes.includes(size)
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
              onClick={() => updateQueryParams('color', color, true)}
              title={color}
              className={cn(
                "group relative w-full aspect-square rounded-full border border-border overflow-hidden transition-all hover:scale-110",
                activeColors.includes(color) && "ring-2 ring-primary ring-offset-2"
              )}
              style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
            >
              {activeColors.includes(color) && (
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
            onClick={clearAll}
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
