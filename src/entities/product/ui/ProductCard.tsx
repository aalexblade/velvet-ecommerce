'use client';

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
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
 * Integrates an elegant image carousel with interactive hover sectors.
 * 
 * Boundary Rules:
 * - UI Text: Ukrainian (UA)
 * - Comments: English (EN)
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product, action }) => {
  // Safe extraction of all available images or use fallback placeholder
  const imagesToRender = product.images?.length > 0 
    ? product.images.map(img => img.url)
    : ["/placeholder-product.webp"];

  // Carousel Embla Hook initialization
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    duration: 20,
    dragFree: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Update selected index on carousel slide change
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Subscribe to external Embla API state changes safely as asynchronous callbacks
  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Handle slide shift on mouse hover over desktop sectors
  const handleMouseEnterSector = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  // Derive pricing from the primary variant
  const baseVariant = product.variants?.[0];
  const price = baseVariant?.price || 0;
  const oldPrice = baseVariant?.old_price;

  // Dynamically extract unique attributes for visual indicators
  const uniqueColors = Array.from(new Set(product.variants.map((v) => v.color)));
  const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)));

  return (
    <div className="group/card relative flex flex-col h-full bg-card transition-all duration-300">
      
      {/* 1. Photo Container: Embla Carousel and Interactivity Layout */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-muted/20 rounded-2xl border border-border/40 mb-1">
        
        {/* Carousel Root view viewport */}
        <div className="w-full h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {imagesToRender.map((imgUrl, index) => (
              <div className="relative flex-full min-w-0 h-full" key={`${product.id}-img-${index}`}>
                <Image
                  src={imgUrl}
                  alt={`${product.title} - фото ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/card:scale-102"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 💻 Transparent desktop hover sectors for instant image switching */}
        <div className="absolute inset-0 hidden md:flex z-10">
          {imagesToRender.map((_, index) => (
            <Link
              key={`sector-${index}`}
              href={`/product/${product.slug}`}
              className="flex-1 h-full bg-transparent cursor-pointer"
              onMouseEnter={() => handleMouseEnterSector(index)}
            />
          ))}
        </div>

        {/* 📱 Mobile tap fallback navigation to the product profile */}
        <Link 
          href={`/product/${product.slug}`} 
          className="absolute inset-0 md:hidden z-10" 
        />

        {/* ➖ Dash Indicators (Figma UI Kit Style) mapped directly by array size */}
        {imagesToRender.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 w-max px-2 py-1 pointer-events-none">
            {imagesToRender.map((_, index) => (
              <span
                key={`dash-${index}`}
                className={cn(
                  "h-0.5 w-6 rounded-full transition-all duration-300",
                  index === selectedIndex ? "bg-white" : "bg-white/40"
                )}
              />
            ))}
          </div>
        )}
        
        {/* Sale Badge: Only visible if a discount exists */}
        {oldPrice && oldPrice > price && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm z-20 pointer-events-none">
            Sale
          </div>
        )}
      </div>

      {/* 2. Info Section: Typography Hierarchy */}
      <div className="flex flex-col pt-3 px-1 gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-sans">
            Velvet Secrets
          </span>
          <Link href={`/product/${product.slug}`} className="relative z-20">
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
        <div className="flex flex-col gap-3 mt-1 relative z-20">
          {/* Color Dots grid */}
          {uniqueColors.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              {uniqueColors.map((color) => (
                <div 
                  key={color}
                  title={color}
                  className={cn(
                    "w-3 h-3 rounded-full border border-border/60 shadow-inner transition-transform hover:scale-110 cursor-pointer",
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
                  className="border border-border bg-muted/10 text-[10px] px-1.5 py-0.5 text-muted-foreground font-light rounded-1 uppercase select-none"
                >
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 5. Feature Injection: Interactive Add-to-Cart Action */}
        {action && (
          <div className="mt-2 pb-1 border-t border-border/30 pt-3 relative z-20">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};