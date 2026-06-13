import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

/**
 * Represents a single subcategory item.
 */
export interface SubCategory {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
}

/**
 * Properties for the SubcategoryGrid component.
 */
export interface SubcategoryGridProps {
  subcategories: SubCategory[];
  className?: string;
}

/**
 * A responsive grid component for displaying subcategories.
 * Features horizontal scrolling on mobile and a fluid grid on larger screens.
 */
export const SubcategoryGrid: React.FC<SubcategoryGridProps> = ({
  subcategories,
  className = '',
}) => {
  return (
    <div
      className={cn(
        "flex overflow-x-auto scrollbar-none gap-4 pb-4 snap-x snap-mandatory w-full md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4 lg:gap-5",
        className
      )}
    >
      {subcategories.map((sub) => (
        <Link
          key={sub.id}
          href={`/catalog/${sub.slug}`}
          className={cn(
            "snap-start min-w-[140px] md:min-w-0",
            "bg-card text-card-foreground border border-border/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all",
            "flex flex-col items-center justify-between text-center group"
          )}
        >
          <div className="relative w-full aspect-square bg-muted rounded-xl overflow-hidden mb-3">
            <Image
              src={sub.imageUrl || "/placeholder-category.webp"}
              alt={sub.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 140px, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
          
          <span className="font-sans font-medium text-sm md:text-base text-foreground group-hover:text-accent transition-colors">
            {sub.title}
          </span>
        </Link>
      ))}
    </div>
  );
};
