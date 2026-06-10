import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib";
import { Product } from "../model/types";

interface ProductCardProps {
  product: Product;
  action?: React.ReactNode;
  className?: string;
}

/**
 * ProductCard (Entity Layer)
 * 
 * A purely presentation-focused "dumb" component.
 * Adheres to strict FSD boundaries: No business logic, no state management.
 * Stylized for premium White-Label editorial layout.
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product, action, className }) => {
  // Safe extraction of display data from Product entity
  const mainImage = product.images?.find((img) => img.is_main)?.url || "/file.svg";
  const baseVariant = product.variants?.[0];
  const price = baseVariant?.price || 0;
  const oldPrice = baseVariant?.old_price;

  return (
    <div 
      className={cn(
        "group relative flex flex-col h-full overflow-hidden transition-all duration-500",
        "bg-neutral-900/10 backdrop-blur-sm border border-white/5 rounded-2xl text-foreground",
        "hover:border-white/10 hover:shadow-2xl hover:shadow-black/5",
        className
      )}
    >
      {/* Visual Block: Aspect-ratio locked editorial image */}
      <Link 
        href={`/product/${product.slug}`} 
        className="relative aspect-3/4 overflow-hidden block bg-muted"
        aria-label={product.title}
      >
        <Image
          src={mainImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {/* Editorial Overlay for depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
      </Link>

      {/* Content Block: Typographic details and pricing */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div className="flex flex-col gap-1.5">
          <Link 
            href={`/product/${product.slug}`} 
            className="hover:text-accent transition-colors duration-300"
          >
            <h3 className="font-bold text-base md:text-lg leading-tight tracking-wide line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
            Premium Selection
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-baseline gap-2.5">
            <span className="font-bold text-lg tracking-tight text-foreground">
              {price} ₴
            </span>
            {oldPrice && oldPrice > price && (
              <span className="text-sm text-neutral-500 line-through decoration-neutral-500/50">
                {oldPrice} ₴
              </span>
            )}
          </div>

          {/* Action Slot: Injected Feature (e.g., AddToCartButton) */}
          {action && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
