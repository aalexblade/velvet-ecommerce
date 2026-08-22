import React from "react";

/**
 * Skeleton component representing a single product card during loading state
 */
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {/* Product Image Skeleton */}
      <div className="w-full aspect-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />

      {/* Color Swatches Skeleton */}
      <div className="flex items-center gap-1.5 pt-1">
        <div className="w-3.5 h-3.5 rounded-sm bg-zinc-200 dark:bg-zinc-800" />
        <div className="w-3.5 h-3.5 rounded-sm bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Product Title Skeleton */}
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />

      {/* Product Price Skeleton */}
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/3 mt-1" />
    </div>
  );
};


export const ProductGridSkeleton: React.FC<{ count?: number }> = ({
  count = 12,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={`product-skeleton-${index}`} />
      ))}
    </div>
  );
};
