import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { X, Filter, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib';
import { ProductColor } from '@/entities/product';
import { Button } from '@/shared/ui';

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
 * Refactored to a horizontal toolbar layout per Figma design.
 * Synchronizes filter state with URL Query Strings.
 */
export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Sync state from URL (case-insensitive matching for robustness)
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

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    router.push(pathname, { scroll: false });
    setActiveDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const FilterButton = ({ label, name, activeCount }: { label: string, name: string, activeCount?: number }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(name)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium transition-colors py-2 px-1 cursor-pointer",
          activeDropdown === name || activeCount ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {label}
        {activeCount ? <span className="ml-1 text-[10px] bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center">{activeCount}</span> : null}
        <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === name && "rotate-180")} />
      </button>

      {activeDropdown === name && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
          <div className="absolute top-full left-0 mt-2 z-20 bg-background border border-border shadow-xl rounded-2xl p-6 min-w-[280px] animate-in fade-in zoom-in-95 duration-200">
            {name === 'size' && (
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => updateQueryParams('size', size, true)}
                    className={cn(
                      "h-10 min-w-10 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer",
                      activeSizes.includes(size)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-foreground hover:bg-muted"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
            {name === 'color' && (
              <div className="grid grid-cols-4 gap-3">
                {AVAILABLE_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateQueryParams('color', color, true)}
                    title={color}
                    className={cn(
                      "group relative w-full aspect-square rounded-full border border-border overflow-hidden transition-all hover:scale-110 cursor-pointer",
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
            )}
            {name === 'price' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Від</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => updateQueryParams('minPrice', e.target.value)}
                      className="w-full bg-muted/30 border border-border rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">До</label>
                    <input
                      type="number"
                      placeholder="9999"
                      value={maxPrice}
                      onChange={(e) => updateQueryParams('maxPrice', e.target.value)}
                      className="w-full bg-muted/30 border border-border rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={cn("w-full bg-card/50", className)}>
      <div className="border-y border-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-8">
              <FilterButton label="Розмір" name="size" activeCount={activeSizes.length} />
              <FilterButton label="Колір" name="color" activeCount={activeColors.length} />
              <FilterButton label="Ціна" name="price" activeCount={minPrice || maxPrice ? 1 : 0} />
              
              {(activeSizes.length > 0 || activeColors.length > 0 || minPrice || maxPrice) && (
                <button 
                  onClick={clearAll}
                  className="text-xs font-semibold text-primary hover:opacity-80 transition-opacity ml-2 cursor-pointer"
                >
                  Очистити все
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden flex items-center gap-2 text-sm font-semibold text-foreground py-2 cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              Фільтри
              {(activeSizes.length > 0 || activeColors.length > 0 || minPrice || maxPrice) && (
                <span className="bg-primary text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                  {activeSizes.length + activeColors.length + (minPrice || maxPrice ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Sort Selector - Always far right */}
            <div className="flex items-center gap-3">
              <label className="hidden sm:block text-xs font-bold uppercase tracking-wider text-muted-foreground">Сортувати:</label>
              <select
                value={activeSort}
                onChange={(e) => updateQueryParams('sort', e.target.value)}
                className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer text-foreground"
              >
                <option value="newest">Новинки</option>
                <option value="price-low-high">Ціна: від низької</option>
                <option value="price-high-low">Ціна: від високої</option>
                <option value="popular">Популярні</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Active Badges Row */}
      {(activeSizes.length > 0 || activeColors.length > 0 || minPrice || maxPrice) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-3 items-center">
          {activeSizes.map(size => (
            <button
              key={`badge-size-${size}`}
              onClick={() => updateQueryParams('size', size, true)}
              className="group flex items-center gap-2 px-4 py-2 bg-[#C8205C] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all cursor-pointer shadow-sm"
            >
              Розмір {size}
              <X className="w-4 h-4" />
            </button>
          ))}

          {activeColors.map(color => (
            <button
              key={`badge-color-${color}`}
              onClick={() => updateQueryParams('color', color, true)}
              className="group flex items-center gap-2 px-4 py-2 bg-[#C8205C] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all cursor-pointer shadow-sm"
            >
              {color}
              <X className="w-4 h-4" />
            </button>
          ))}

          {(minPrice || maxPrice) && (
            <button
              onClick={() => {
                updateQueryParams('minPrice', '');
                updateQueryParams('maxPrice', '');
              }}
              className="group flex items-center gap-2 px-4 py-2 bg-[#C8205C] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all cursor-pointer shadow-sm"
            >
              Ціна: {minPrice || '0'} - {maxPrice || '∞'}
              <X className="w-4 h-4" />
            </button>
          )}

          <button 
            onClick={clearAll}
            className="px-6 py-2 border-2 border-[#C8205C] text-[#C8205C] bg-white rounded-lg text-sm font-bold hover:bg-[#C8205C] hover:text-white transition-all cursor-pointer"
          >
            Скинути все
          </button>
        </div>
      )}

      {/* Mobile Drawer (Basic Version) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsMobileOpen(false)} />
          <div className="relative w-full max-w-sm h-full bg-background flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-muted">
              <h2 className="text-lg font-bold">Фільтри</h2>
              <button onClick={() => setIsMobileOpen(false)} className="p-2"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Розмір</h3>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SIZES.map(size => (
                    <button key={size} onClick={() => updateQueryParams('size', size, true)} className={cn("h-10 min-w-10 px-3 rounded-xl border text-xs", activeSizes.includes(size) ? "bg-primary text-white" : "border-border")}>{size}</button>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Колір</h3>
                <div className="grid grid-cols-4 gap-3">
                  {AVAILABLE_COLORS.map(color => (
                    <button key={color} onClick={() => updateQueryParams('color', color, true)} className={cn("w-full aspect-square rounded-full border", activeColors.includes(color) && "ring-2 ring-primary ring-offset-2")} style={{ backgroundColor: color.toLowerCase().replace(' ', '') }} />
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Ціна</h3>
                <div className="flex gap-4">
                  <input type="number" placeholder="Від" value={minPrice} onChange={e => updateQueryParams('minPrice', e.target.value)} className="w-full bg-muted/30 border border-border rounded-xl py-2 px-3" />
                  <input type="number" placeholder="До" value={maxPrice} onChange={e => updateQueryParams('maxPrice', e.target.value)} className="w-full bg-muted/30 border border-border rounded-xl py-2 px-3" />
                </div>
              </section>
            </div>
            <div className="p-4 border-t border-muted bg-card">
              <Button className="w-full rounded-xl py-6" onClick={() => setIsMobileOpen(false)}>Застосувати</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
