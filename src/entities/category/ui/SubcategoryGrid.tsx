import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

/**
 * Represents a single subcategory item in the store.
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
 * A highly professional and responsive subcategory navigation block.
 * Optimized for mobile horizontal scrolling and desktop grid presentation.
 */
export const SubcategoryGrid: React.FC<SubcategoryGridProps> = ({
  subcategories,
  className = '',
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full",
        className
      )}
    >
      {subcategories.map((sub) => (
        <Link
          key={sub.id}
          href={`/catalog/${sub.slug}`}
          className={cn(
            "snap-start min-w-[150px] md:min-w-0",
            "bg-card text-card-foreground border border-border/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all",
            "flex flex-col items-center justify-between text-center group"
          )}
        >
          {/* Visual Container */}
          <div className="relative w-full aspect-square bg-muted rounded-xl overflow-hidden mb-3">
            <Image
              src={sub.imageUrl || "/placeholder-category.webp"}
              alt={sub.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 150px, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
          
          {/* Label Section */}
          <span className="font-sans font-medium text-sm md:text-base text-foreground mt-3 transition-colors group-hover:text-primary">
            {sub.title}
          </span>
        </Link>
      ))}
    </div>
  );
};
