import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, getProductColorClass } from "@/shared/lib";
import { Product } from "../model/types";

interface ProductCardProps {
  product: Product;
  action?: React.ReactNode;
}

/**
 * ProductCard Entity
 * 
 * Pixel-perfect implementation of the premium catalog layout.
 * Dynamic variant extraction (colors, sizes) and strict theme token usage.
 * 
 * Boundary Rules:
 * - UI Text: Ukrainian (UA)
 * - Comments: English (EN)
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product, action }) => {
  // Safe extraction of the primary product visual
  const mainImage = product.images.find((img) => img.is_main)?.url || product.images[0]?.url || "/placeholder-product.webp";

  // Derive pricing from the primary variant
  const baseVariant = product.variants?.[0];
  const price = baseVariant?.price || 0;
  const oldPrice = baseVariant?.old_price;

  // Dynamically extract unique attributes for visual indicators
  const uniqueColors = Array.from(new Set(product.variants.map((v) => v.color)));
  const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)));

  return (
    <div className="group relative flex flex-col h-full bg-card transition-all duration-300">
      {/* 1. Photo Container: Strict Aspect Ratio and Framing */}
      <Link 
        href={`/product/${product.slug}`} 
        className="relative aspect-[3/4] w-full overflow-hidden bg-muted/20 rounded-2xl block border border-border/40"
      >
        <Image
          src={mainImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Sale Badge: Only visible if a discount exists */}
        {oldPrice && oldPrice > price && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm z-10">
            Sale
          </div>
        )}
      </Link>

      {/* 2. Info Section: Typography Hierarchy */}
      <div className="flex flex-col pt-4 px-1 gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-sans">
            Velvet Secrets
          </span>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-light text-foreground font-sans line-clamp-1 hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* 3. Prices: Medium Weight for Active, Muted for Old */}
        <div className="flex items-center gap-2 font-sans">
          <span className="text-sm font-medium text-foreground">
            {price.toLocaleString("uk-UA")} ₴
          </span>
          {oldPrice && oldPrice > price && (
            <span className="text-[11px] text-muted-foreground/60 line-through font-normal">
              {oldPrice.toLocaleString("uk-UA")} ₴
            </span>
          )}
        </div>

        {/* 4. Variants Matrix: Interactive Visual Cues */}
        <div className="flex flex-col gap-3 mt-1.5">
          {/* Color Dots grid */}
          {uniqueColors.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              {uniqueColors.map((color) => (
                <div 
                  key={color}
                  title={color}
                  className={cn(
                    "w-3 h-3 rounded-full border border-border/60 shadow-inner transition-transform hover:scale-110",
                    getProductColorClass(color)
                  )}
                />
              ))}
            </div>
          )}

          {/* Sizes Blocks: Tiny elegant square blocks */}
          {uniqueSizes.length > 0 && (
            <div className="flex flex-wrap gap-1 items-center">
              {uniqueSizes.map((size) => (
                <span 
                  key={size}
                  className="border border-border bg-muted/10 text-[10px] px-1.5 py-0.5 text-muted-foreground font-light rounded-[2px] uppercase"
                >
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 5. Feature Injection: Interactive Add-to-Cart Action */}
        {action && (
          <div className="mt-4 pb-2 border-t border-border/30 pt-3">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
