import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, getProductColorClass } from "@/shared/lib";
import { Product } from "../model/types";

interface ProductCardProps {
  product: Product;
  action?: React.ReactNode;
}

/**
 * ProductCard Entity component refactored for premium aesthetics.
 * Displays product data with dynamic variant indicators (colors/sizes).
 * 
 * Boundary Compliance:
 * - UI Text: Ukrainian (UA)
 * - Code Comments: English (EN)
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product, action }) => {
  // Extract main image safely
  const mainImage = product.images.find(img => img.is_main)?.url || product.images[0]?.url || "/placeholder-product.webp";
  
  // Base display variant
  const baseVariant = product.variants?.[0];
  const price = baseVariant?.price || 0;
  const oldPrice = baseVariant?.old_price;

  // Derive unique attributes from variants
  const uniqueColors = Array.from(new Set(product.variants.map(v => v.color)));
  const uniqueSizes = Array.from(new Set(product.variants.map(v => v.size)));

  return (
    <div className="group relative flex flex-col h-full bg-card transition-all duration-300">
      {/* Aspect Ratio Box: Primary Visual */}
      <Link 
        href={`/product/${product.slug}`} 
        className="relative aspect-[3/4] overflow-hidden block bg-muted rounded-2xl border border-border/40"
      >
        <Image
          src={mainImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Discount Badge Placeholder */}
        {oldPrice && oldPrice > price && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm">
            Sale
          </div>
        )}
      </Link>

      {/* Metadata & Title Block */}
      <div className="flex flex-col pt-4 pb-2 px-1 gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-sans">
            Velvet Secrets
          </span>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-light text-foreground line-clamp-1 hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Pricing Matrix */}
        <div className="flex items-center gap-2 font-sans">
          <span className="text-sm font-medium text-foreground">
            {price.toLocaleString("uk-UA")} ₴
          </span>
          {oldPrice && oldPrice > price && (
            <span className="text-[11px] text-muted-foreground/60 line-through">
              {oldPrice.toLocaleString("uk-UA")} ₴
            </span>
          )}
        </div>

        {/* Dynamic Attribute Indicators */}
        <div className="flex flex-col gap-3 mt-1">
          {/* Colors Matrix */}
          {uniqueColors.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              {uniqueColors.map((color) => (
                <div 
                  key={color}
                  title={color}
                  className={cn(
                    "w-3 h-3 rounded-full border border-border/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]",
                    getProductColorClass(color)
                  )}
                />
              ))}
            </div>
          )}

          {/* Sizes Matrix */}
          {uniqueSizes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              {uniqueSizes.map((size) => (
                <span 
                  key={size}
                  className="text-[10px] px-1.5 py-0.5 border border-border bg-muted/30 text-muted-foreground rounded-sm uppercase font-medium"
                >
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Feature Injection Point */}
        {action && (
          <div className="mt-4 pt-2 border-t border-border/30">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
