import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib";
import { Product } from "../model/types";

interface ProductCardProps {
  product: Product;
  action?: React.ReactNode;
}

/**
 * ProductCard (Entity Layer)
 * 
 * A pure, dumb presentation entity for product data.
 * Adheres to strict FSD boundaries: No business logic, no state management.
 * Stylized for White-Label themeability using abstract tokens.
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product, action }) => {
  const mainImage = product.images?.[0]?.url || "/file.svg";
  const baseVariant = product.variants?.[0];
  const price = baseVariant?.price || 0;
  const oldPrice = baseVariant?.old_price;

  return (
    <div 
      className={cn(
        "group relative flex flex-col h-full overflow-hidden transition-all duration-300",
        "bg-card border border-border rounded-2xl text-foreground",
        "hover:shadow-lg transition-shadow"
      )}
    >
      {/* Visual Block: Locked aspect ratio image */}
      <Link 
        href={`/product/${product.slug}`} 
        className="relative aspect-3/4 overflow-hidden block bg-muted"
        aria-label={product.title}
      >
        <Image
          src={mainImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </Link>

      {/* Content Block */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex flex-col gap-1">
          <Link 
            href={`/product/${product.slug}`} 
            className="hover:text-primary transition-colors duration-200"
          >
            <h3 className="font-bold text-sm md:text-base leading-tight line-clamp-2">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-base text-primary">
              {price.toLocaleString()} ₴
            </span>
            {oldPrice && oldPrice > price && (
              <span className="text-xs text-muted-foreground line-through">
                {oldPrice.toLocaleString()} ₴
              </span>
            )}
          </div>

          {/* Slot: Injected Action */}
          {action && (
            <div className="w-full pt-1">
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
