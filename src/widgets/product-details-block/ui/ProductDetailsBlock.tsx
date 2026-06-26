'use client';

import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Heart, Minus, Plus, Star } from "lucide-react";
import { cn, getProductColorClass } from "@/shared/lib";
import { Product, ProductColor } from "@/entities/product/model/types";

interface ProductDetailsBlockProps {
  product: Product;
}

type TabType = "description" | "delivery";

/**
 * ProductDetailsBlock Widget
 * 
 * High-performance, pixel-perfect core engine for Product Page & Quick View[cite: 3].
 * Synchronizes variant matrices correctly without triggering cascading state updates within effects.
 * Fully compatible with Tailwind v4 standards and strict eslint rules.
 */
export const ProductDetailsBlock: React.FC<ProductDetailsBlockProps> = ({ product }) => {
  // 1. DYNAMIC ATTRIBUTES MATRIX EXTRACTION
  const uniqueColors = useMemo(() => Array.from(new Set(product.variants.map((v) => v.color))), [product.variants]);
  const uniqueSizes = useMemo(() => Array.from(new Set(product.variants.map((v) => v.size))), [product.variants]);

 // 2. INTERACTIVE STATES WITH ZERO SYNCHRONOUS EFFECT CASCADES
const [selectedColor, setSelectedColor] = useState<ProductColor>(uniqueColors[0] || "White");

// Get initial size for the first color safely during mount initialization
const initialAvailableVariants = useMemo(() => product.variants.filter((v) => v.color === uniqueColors[0]), [product.variants, uniqueColors]);
const initialSize = useMemo(() => {
  const firstAvailable = initialAvailableVariants.find((v) => v.stock > 0);
  return firstAvailable ? firstAvailable.size : initialAvailableVariants[0]?.size || "";
}, [initialAvailableVariants]);

const [selectedSize, setSelectedSize] = useState(initialSize);
const [quantity, setQuantity] = useState(1);
const [activeTab, setActiveTab] = useState<TabType>("description");
const [isWishlist, setIsWishlist] = useState(false);

// Get available variants for the currently chosen color track
const availableVariantsForColor = useMemo(() => {
  return product.variants.filter((v) => v.color === selectedColor);
}, [product.variants, selectedColor]);

// Derive the active single variant row combination from color + size selection
const currentVariant = useMemo(() => {
  return product.variants.find((v) => v.color === selectedColor && v.size === selectedSize) || product.variants[0];
}, [product.variants, selectedColor, selectedSize]);

// Core handler for switching colors with strict typing
const handleColorChange = (color: ProductColor) => {
  setSelectedColor(color);
  setQuantity(1); // Reset counter on variation change
  
  const nextVariants = product.variants.filter((v) => v.color === color);
  const sizeExistsInNewColor = nextVariants.some((v) => v.size === selectedSize && v.stock > 0);
  
  if (!sizeExistsInNewColor) {
    const firstAvailable = nextVariants.find((v) => v.stock > 0);
    setSelectedSize(firstAvailable ? firstAvailable.size : nextVariants[0]?.size || "");
  }
};

  // 3. IMAGE CAROUSEL LOGIC (EMBLA MULTI-VIEW)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 25,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  // Sync image viewport when color or variant shifts asynchronously
  useEffect(() => {
    if (!emblaApi) return;
    const variantImageIndex = product.images.findIndex((img) => img.variant_id === currentVariant?.id);
    if (variantImageIndex !== -1) {
      emblaApi.scrollTo(variantImageIndex);
    } else {
      const mainImgIndex = product.images.findIndex((img) => img.is_main);
      if (mainImgIndex !== -1) emblaApi.scrollTo(mainImgIndex);
    }
  }, [selectedColor, currentVariant, emblaApi, product.images]);

  const imagesToRender = product.images.length > 0 ? product.images : [{ url: "/placeholder-product.webp", id: 0 }];

  // 4. INTERACTION ACTIONS
  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec") {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      const maxStock = currentVariant?.stock || 1;
      setQuantity((prev) => (prev < maxStock ? prev + 1 : maxStock));
    }
  };

  const isOutOfStock = !currentVariant || currentVariant.stock === 0;
  const basePrice = product.variants?.[0]?.price || 0;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-6 items-start">
      
      {/* ========================================================================= */}
      {/* 📸 LEFT ZONE: PREMIUM CAROUSEL WITH VERTICAL THUMBNAILS (lg:col-span-7)     */}
      {/* ========================================================================= */}
      {/* Refactored for Tailwind v4 tokens: aspect-3/4 and max-h-136 layout scales */}
      <div className="flex flex-col-reverse md:flex-row lg:col-span-7 gap-4 h-full sticky top-24">
        
        {/* Vertical Desktop Thumbnails Stack */}
        {imagesToRender.length > 1 && (
          <div className="hidden md:flex flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-20 overflow-y-auto no-scrollbar max-h-136">
            {imagesToRender.map((img, idx) => (
              <button
                key={`thumb-${img.id || idx}`}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "relative aspect-3/4 w-20 bg-muted/10 rounded-xl overflow-hidden border transition-all cursor-pointer",
                  idx === selectedIndex ? "border-[#b91c56] scale-102 shadow-xs" : "border-border/40 hover:border-zinc-400"
                )}
              >
                <Image src={img.url} alt="Миніатюра" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}

        {/* Main Major Slider Display Viewport */}
        <div className="relative aspect-3/4 flex-1 bg-muted/20 rounded-2xl border border-border/40 overflow-hidden">
          <div className="w-full h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full touch-pan-y">
              {imagesToRender.map((img, idx) => (
                <div className="relative flex-full min-w-0 h-full" key={`main-slide-${img.id || idx}`}>
                  <Image
                    src={img.url}
                    alt={`${product.title} - фото ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Line Dash Pagination indicators */}
          {imagesToRender.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 w-max px-2 py-1 md:hidden pointer-events-none">
              {imagesToRender.map((_, idx) => (
                <span
                  key={`dot-${idx}`}
                  className={cn(
                    "h-0.5 w-6 rounded-full transition-all duration-300",
                    idx === selectedIndex ? "bg-white" : "bg-white/40"
                  )}
                />
              ))}
            </div>
          )}

          {/* Luxury Sale Promo Label badge marker */}
          {currentVariant?.old_price && currentVariant.old_price > currentVariant.price && (
            <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg shadow-xs z-10">
              Sale
            </span>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📝 RIGHT ZONE: MATRIX ATTRIBUTES INFOPANEL (lg:col-span-5)                  */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:col-span-5 gap-6">
        
        {/* Brand Header Meta Title */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Velvet Secrets Premium
          </span>
          <h1 className="text-2xl font-light text-foreground tracking-tight font-sans">
            {product.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mt-1">
            <span>Арт: {currentVariant?.sku || "111240"}</span>
            <div className="flex items-center gap-1.5 text-amber-500">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current stroke-current" />
                ))}
              </div>
              <span className="text-zinc-500 font-sans text-[11px]">(32 відгуки)</span>
            </div>
          </div>
        </div>

        {/* Financial Price Cluster display */}
        <div className="flex items-baseline gap-3 py-1.5 border-y border-border/30 font-sans">
          <span className="text-2xl font-semibold text-foreground">
            {currentVariant ? currentVariant.price.toLocaleString("uk-UA") : basePrice.toLocaleString("uk-UA")} ₴
          </span>
          {currentVariant?.old_price && currentVariant.old_price > currentVariant.price && (
            <span className="text-sm text-muted-foreground/60 line-through font-normal">
              {currentVariant.old_price.toLocaleString("uk-UA")} ₴
            </span>
          )}
        </div>

        {/* Color matrix swatches selection */}
        {uniqueColors.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
              Колір: <span className="text-muted-foreground font-normal normal-case">{selectedColor}</span>
            </span>
            <div className="flex flex-wrap gap-2 items-center">
              {uniqueColors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={`detail-color-${color}`}
                    onClick={() => handleColorChange(color)}
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center p-0.5 transition-all cursor-pointer border shadow-xs hover:scale-105",
                      isSelected ? "border-[#b91c56] scale-105" : "border-border/60"
                    )}
                  >
                    <span className={cn("w-full h-full rounded-full", getProductColorClass(color))} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sizes tile matrix selection layout */}
        {uniqueSizes.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
              <span>Розмір:</span>
              <button className="text-[11px] text-muted-foreground underline lowercase font-normal tracking-normal hover:text-[#b91c56] cursor-pointer transition-colors">
                Таблиця розмірів
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map((size) => {
                const isSelected = selectedSize === size;
                const variantForSize = availableVariantsForColor.find((v) => v.size === size);
                const hasStock = variantForSize && variantForSize.stock > 0;

                return (
                  <button
                    key={`detail-size-${size}`}
                    disabled={!hasStock}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-11 min-w-12 border px-4 rounded-lg text-xs font-medium transition-all cursor-pointer",
                      isSelected && "border-[#b91c56] bg-pink-50/20 text-[#b91c56] font-bold shadow-xs",
                      !isSelected && hasStock && "border-border text-foreground hover:border-zinc-400 active:scale-98",
                      !hasStock && "border-border/30 bg-muted/5 text-muted-foreground/40 opacity-40 line-through cursor-not-allowed"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity counter and Checkout actions */}
        <div className="flex flex-col sm:flex-row gap-3 items-center mt-2 w-full">
          <div className="flex items-center border border-border rounded-lg h-12 w-full sm:w-max bg-zinc-50/50">
            <button
              onClick={() => handleQuantityChange("dec")}
              disabled={quantity <= 1 || isOutOfStock}
              className="px-4 h-full flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-12 text-center text-xs font-semibold text-foreground select-none font-sans">
              {isOutOfStock ? 0 : quantity}
            </span>
            <button
              onClick={() => handleQuantityChange("inc")}
              disabled={isOutOfStock || quantity >= (currentVariant?.stock || 0)}
              className="px-4 h-full flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            disabled={isOutOfStock}
            className={cn(
              "flex-1 h-12 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs text-center w-full flex items-center justify-center cursor-pointer",
              isOutOfStock 
                ? "bg-zinc-100 text-muted-foreground cursor-not-allowed border border-border" 
                : "bg-[#b91c56] text-white hover:bg-[#73103a] active:scale-[0.99]"
            )}
          >
            {isOutOfStock ? "Немає в наявності" : "Додати до кошика"}
          </button>

          <button
            onClick={() => setIsWishlist(!isWishlist)}
            className="h-12 w-12 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-[#b91c56] hover:border-pink-200 cursor-pointer active:scale-95 transition-all shrink-0"
          >
            <Heart className={cn("w-4 h-4 transition-all", isWishlist ? "fill-[#b91c56] stroke-[#b91c56]" : "stroke-[2px]")} />
          </button>
        </div>

        {/* Tabs Block Container. Escaped quote character from standard string via HTML token formatting */}
        <div className="flex flex-col gap-4 mt-4 border-t border-border/40 pt-5">
          <div className="flex items-center gap-6 border-b border-border/40 pb-2 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("description")}
              className={cn("pb-2 relative cursor-pointer transition-colors", activeTab === "description" ? "text-[#b91c56]" : "text-muted-foreground hover:text-foreground")}
            >
              Опис
              {activeTab === "description" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#b91c56] rounded-full animate-in fade-in duration-200" />}
            </button>
            <button
              onClick={() => setActiveTab("delivery")}
              className={cn("pb-2 relative cursor-pointer transition-colors", activeTab === "delivery" ? "text-[#b91c56]" : "text-muted-foreground hover:text-foreground")}
            >
              Доставка та оплата
              {activeTab === "delivery" && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#b91c56] rounded-full animate-in fade-in duration-200" />}
            </button>
          </div>

          <div className="text-xs text-muted-foreground font-light leading-relaxed font-sans min-h-32">
            {activeTab === "description" && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                <p>{product.description || "Преміальний мереживний бюстгальтер від Velvet Secrets. Виконаний із витончених італійських матеріалів преміумкласу. Забезпечує ідеальну посадку, підкреслює природні лінії грудей та створює неповторний спокусливий образ на кожен день."}</p>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-zinc-600 font-normal">
                  <li>Склад: 80% поліамід, 15% еластан, 5% бавовна</li>
                  <li>Регульовані бретелі для ідеальної посадки</li>
                  <li>Витончене французьке мереживо</li>
                  <li>Країна виробник: Україна (італійські матеріали)</li>
                </ul>
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                <p>Ми піклуємося про вашу конфіденційність, тому всі замовлення відправляються в **абсолютно анонімній та непрозорій преміум-упаковці** без жодного вказання вмісту посилки.</p>
                <ul className="list-disc pl-4 space-y-1 text-zinc-600 font-normal">
                  <li>**Нова Пошта:** відправка у день замовлення (1-2 дні по Україні).</li>
                  <li>**Самовивіз з кав&apos;ярні-шоуруму:** м. Київ, безкоштовно.</li>
                  <li>**Оплата:** при отриманні (післяплата) або безпечна оплата карткою на сайті.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};