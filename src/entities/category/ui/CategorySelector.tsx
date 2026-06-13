import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface Category {
  id: string | number;
  label: string;
  image: string;
  href: string;
}

interface CategorySelectorProps {
  categories: Category[];
  className?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, className = '' }) => {
  return (
    <div className={className}>
      {/* Mobile: Horizontal scrollable strip */}
      <div className="flex md:hidden overflow-x-auto scrollbar-none gap-4 pb-2 -mx-4 px-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="flex-shrink-0 w-32 flex flex-col items-center text-center gap-2 group"
          >
            <div className="relative w-24 h-24 bg-card border border-border/40 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all">
              <Image
                src={category.image}
                alt={category.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="font-sans font-medium text-sm text-card-foreground">
              {category.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Tablet/Desktop: Fluid grid */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="bg-card text-card-foreground border border-border/40 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-3 group"
          >
            <div className="relative w-full aspect-square bg-muted rounded-xl overflow-hidden">
              <Image
                src={category.image}
                alt={category.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="font-sans font-medium text-sm md:text-base">
              {category.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
