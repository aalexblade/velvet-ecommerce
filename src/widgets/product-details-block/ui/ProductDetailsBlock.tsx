'use client';

import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Heart, Minus, Plus, Star, Ruler, Check, X } from "lucide-react";
import { cn, getProductColorClass } from "@/shared/lib";
import { Product, ProductColor } from "@/entities/product/model/types";
import { useCartStore } from "@/features/cart/model/cartStore";
import { SizeCalculatorForm } from "@/features/product-size-calculator/ui/SizeCalculatorForm";

interface ProductDetailsBlockProps {
  product: Product;
}

type TabType = "description" | "delivery" | "recommendations";

export const ProductDetailsBlock: React.FC<ProductDetailsBlockProps> = ({ product }) => {
  // Bind dynamic add action controller from global Zustand state storage
  const addToCart = useCartStore((state) => state.addToCart);

  const uniqueColors = useMemo(() => Array.from(new Set(product.variants.map((v) => v.color))), [product.variants]);
  const uniqueSizes = useMemo(() => Array.from(new Set(product.variants.map((v) => v.size))), [product.variants]);

  const [selectedColor, setSelectedColor] = useState<ProductColor>(uniqueColors[0] || "White");

  // Helper function to derive the first available size for a given color during runtime transitions
  const getFirstAvailableSize = useCallback((color: ProductColor) => {
    const nextVariants = product.variants.filter((v) => v.color === color);
    const firstAvailable = nextVariants.find((v) => v.stock > 0);
    return firstAvailable ? firstAvailable.size : nextVariants[0]?.size || "";
  }, [product.variants]);

  // Safely initialize state directly during the initial render without relying on client effects
  const [selectedSize, setSelectedSize] = useState(() => getFirstAvailableSize(uniqueColors[0] || "White"));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [isWishlist, setIsWishlist] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  const availableVariantsForColor = useMemo(() => {
    return product.variants.filter((v) => v.color === selectedColor);
  }, [product.variants, selectedColor]);

  const currentVariant = useMemo(() => {
    return product.variants.find((v) => v.color === selectedColor && v.size === selectedSize) || product.variants[0];
  }, [product.variants, selectedColor, selectedSize]);

  // Perform operational atomic transitions directly inside the interaction handler
  const handleColorChange = (color: ProductColor) => {
    setSelectedColor(color);
    setQuantity(1);
    setIsAdded(false);
    
    const nextSize = getFirstAvailableSize(color);
    setSelectedSize(nextSize);
  };

  // 1. Ініціалізуємо Embla з точними параметрами
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    duration: 25,
    watchSlides: true
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

  useEffect(() => {
    if (!emblaApi || !currentVariant) return;
    const variantImageIndex = product.images.findIndex((img) => img.variant_id === currentVariant?.id);
    if (variantImageIndex !== -1) {
      emblaApi.scrollTo(variantImageIndex);
    }
  }, [currentVariant, emblaApi, product.images]);

  const imagesToRender = product.images.length > 0 ? product.images : [{ url: "/placeholder-product.webp", id: 0, product_id: "0", variant_id: null, is_main: true, sort_order: 1 }];
  const isOutOfStock = !currentVariant || currentVariant.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock || !currentVariant) return;

    const variantImage = product.images.find((img) => img.variant_id === currentVariant.id)?.url 
      || product.images.find((img) => img.is_main)?.url 
      || imagesToRender[0].url;

    addToCart({
      variantId: currentVariant.id,
      productId: product.id,
      title: product.title,
      price: currentVariant.price,
      quantity: quantity,
      image: variantImage,
      color: currentVariant.color,
      size: currentVariant.size,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleSizeCalculated = (calculatedSize: string) => {
    if (uniqueSizes.includes(calculatedSize)) {
      setSelectedSize(calculatedSize);
      setTimeout(() => setIsSizeModalOpen(false), 800);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-2 items-start text-zinc-900">
      
      {/* 📸 LEFT GALLERY ZONE */}
      <div className="flex flex-col-reverse md:flex-row lg:col-span-7 gap-4 h-full w-full overflow-hidden">
        {imagesToRender.length > 1 && (
          <div className="hidden md:flex flex-col gap-2 shrink-0 w-16 overflow-y-auto no-scrollbar max-h-136">
            {imagesToRender.map((img, idx) => (
              <button
                key={`thumb-${img.id || idx}`}
                onClick={() => scrollTo(idx)}
                className={cn(
                  "relative aspect-3/4 w-16 bg-zinc-50 rounded-md overflow-hidden border transition-all cursor-pointer",
                  idx === selectedIndex ? "border-zinc-900 opacity-100 shadow-xs" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img.url} alt="Thumbnail image" fill className="object-cover" sizes="64px" unoptimized />
              </button>
            ))}
          </div>
        )}

        {/* 🛠️ ЗМІНИ ТУТ: Загортаємо в overflow-hidden viewport та додаємо чіткі flex-параметри для слайдів */}
        <div className="relative aspect-3/4 flex-1 bg-zinc-50 rounded-lg overflow-hidden border border-zinc-100" ref={emblaRef}>
          <div className="flex h-full w-full min-w-0 touch-pan-y">
            {imagesToRender.map((img, idx) => (
              <div 
                className="relative flex-[0_0_100%] min-w-0 h-full w-full aspect-3/4" 
                key={`main-slide-${img.id || idx}`}
              >
                <Image
                  src={img.url}
                  alt={product.title}
                  fill
                  className="object-cover object-center pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={idx === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📝 RIGHT INFO ZONE */}
      <div className="flex flex-col lg:col-span-5 gap-5 font-sans">
        
        {/* Title & SKU */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium tracking-tight text-zinc-900 leading-tight">
            {product.title}
          </h1>
          <span className="text-sm text-zinc-500 font-normal">
            Арт. {currentVariant?.sku || "565940"}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("w-4 h-4 fill-current", i < 4 ? "text-amber-400" : "text-zinc-200 fill-zinc-200")} />
            ))}
          </div>
          <span className="text-zinc-500 text-xs">(10) відгуків</span>
        </div>

        {/* Colors */}
        {uniqueColors.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm text-zinc-600">Колір:</span>
            <div className="flex flex-wrap gap-3 items-center">
              {uniqueColors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={`detail-color-${color}`}
                    onClick={() => handleColorChange(color)}
                    className={cn(
                      "w-7 h-7 rounded-md flex items-center justify-center p-0.5 transition-all cursor-pointer border",
                      isSelected ? "border-zinc-900 scale-105" : "border-zinc-200 hover:border-zinc-400"
                    )}
                  >
                    <span className={cn("w-full h-full rounded-md shadow-xs", getProductColorClass(color))} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sizes */}
        {uniqueSizes.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm text-zinc-600">Розмір:</span>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map((size) => {
                const isSelected = selectedSize === size;
                const variantForSize = availableVariantsForColor.find((v) => v.size === size);
                const hasStock = variantForSize && variantForSize.stock > 0;

                return (
                  <button
                    key={`detail-size-${size}`}
                    disabled={!hasStock}
                    onClick={() => {
                      setSelectedSize(size);
                      setIsAdded(false);
                    }}
                    className={cn(
                      "h-9 min-w-14 border rounded-md text-xs font-medium transition-all cursor-pointer flex items-center justify-center",
                      isSelected && "border-[#C8205C] text-[#C8205C] font-semibold bg-white",
                      !isSelected && hasStock && "border-zinc-300 text-zinc-900 hover:border-zinc-900",
                      !hasStock && "border-zinc-200 bg-zinc-50 text-zinc-300 line-through opacity-50 cursor-not-allowed"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Calculator Trigger */}
        <button 
          onClick={() => setIsSizeModalOpen(true)}
          className="flex items-center gap-2 text-xs text-[#C8205C] hover:underline cursor-pointer font-medium -mt-1 w-max"
        >
          <Ruler className="w-3.5 h-3.5 transform rotate-45" />
          <span>Підібрати розмір</span>
        </button>

        {/* Quantity */}
        <div className="flex items-center border border-zinc-300 rounded-md h-9 w-max bg-white">
          <button
            onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}
            disabled={quantity <= 1 || isOutOfStock}
            className="px-3 h-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 disabled:opacity-30 cursor-pointer"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center text-xs font-medium select-none">{isOutOfStock ? 0 : quantity}</span>
          <button
            onClick={() => setQuantity(q => q < (currentVariant?.stock || 1) ? q + 1 : q)}
            disabled={isOutOfStock}
            className="px-3 h-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 disabled:opacity-30 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Price */}
        <div className="text-xl font-semibold tracking-tight text-zinc-900 -mt-1">
          {currentVariant ? currentVariant.price : 650} UAH
        </div>

        {/* Call to Action Row */}
        <div className="flex gap-3 items-center w-full">
          <button
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={cn(
              "flex-1 h-11 rounded-md text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-white",
              isOutOfStock 
                ? "bg-zinc-300 cursor-not-allowed" 
                : isAdded 
                  ? "bg-emerald-600 hover:bg-emerald-700" 
                  : "bg-[#C8205C] hover:bg-[#a6174a]"
            )}
          >
            {isOutOfStock ? (
              "Немає в наявності"
            ) : isAdded ? (
              <>
                <Check className="w-4 h-4 animate-bounce" />
                <span>Додано!</span>
              </>
            ) : (
              "Додати до кошика"
            )}
          </button>

          <button
            onClick={() => setIsWishlist(!isWishlist)}
            className="h-11 w-11 rounded-md border border-zinc-300 flex items-center justify-center text-zinc-400 hover:text-[#C8205C] hover:border-[#C8205C] cursor-pointer active:scale-95 transition-all shrink-0"
          >
            <Heart className={cn("w-5 h-5 transition-all", isWishlist ? "fill-[#C8205C] stroke-[#C8205C]" : "stroke-[1.5px]")} />
          </button>
        </div>

        {/* Tabs System Layout Panel */}
        <div className="flex flex-col gap-4 mt-2 border-t border-zinc-200 pt-4">
          <div className="flex items-center gap-6 border-b border-zinc-100 pb-1 text-xs font-bold uppercase tracking-wider">
            {(["description", "delivery", "recommendations"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-2 relative cursor-pointer transition-colors",
                  activeTab === tab ? "text-zinc-900 font-bold" : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                {tab === "description" ? "Опис" : tab === "delivery" ? "Доставка та оплата" : "Рекомендації"}
                {activeTab === tab && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C8205C] rounded-full" />}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-700 leading-relaxed min-h-36 font-sans">
            {activeTab === "description" && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-150">
                <p>{product.description}</p>
                
                <div className="border-t border-zinc-200 pt-3 flex flex-col gap-1.5 text-zinc-900 font-light">
                  <div><strong className="font-semibold">Посадка:</strong> середня підтримка з відкритим вирізом</div>
                  <div><strong className="font-semibold">Фасон:</strong> балконет із пуш-ап ефектом</div>
                  <div><strong className="font-semibold">Бретелі:</strong> регульовані, можна знімати</div>
                  <div><strong className="font-semibold">Застібка:</strong> класична на спині</div>
                </div>

                <div className="border-t border-zinc-200 pt-3">
                  <span className="font-semibold block uppercase tracking-wider text-[10px] text-zinc-500 mb-1">Тканина:</span>
                  <div className="flex flex-col gap-1">
                    <div><strong className="font-medium">Верх:</strong> ніжне мереживо з еластичними волокнами</div>
                    <div><strong className="font-medium">Внутрішня частина чашок:</strong> бавовна для комфорту шкіри</div>
                    <div><strong className="font-medium">Основна тканина:</strong> мікрофібра з додаванням еластану</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "delivery" && (
              <p className="animate-in fade-in duration-150">
                Ми піклуємося про вашу конфіденційність, тому всі замовлення відправляються в абсолютно анонімній та непрозорій упаковці. Доставка Новою Поштою по всій Україні протягом 1-2 днів.
              </p>
            )}

            {activeTab === "recommendations" && (
              <p className="animate-in fade-in duration-150 text-zinc-400 italic">
                Секція супутніх аксесуарів та трусиків для комплекту з&apos;явиться незабаром.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* 💎 PREMIUM MODAL OVERLAY: SIZE CALCULATOR */}
      {isSizeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div 
            onClick={() => setIsSizeModalOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
          />
          
          <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-zinc-100 z-10 flex flex-col gap-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto no-scrollbar font-sans">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold uppercase tracking-wider text-zinc-900">
                  Підбір ідеального розміру
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-snug">
                  Введіть ваші точні анатомічні заміри в сантиметрах для розрахунку відповідної білизни за канонами нашого бренду.
                </p>
              </div>
              <button
                onClick={() => setIsSizeModalOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all cursor-pointer shrink-0 active:scale-95"
                aria-label="Close size advisor modal layer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <hr className="border-zinc-100 -mx-6 md:-mx-8" />
            <SizeCalculatorForm onSizeCalculated={handleSizeCalculated} />
          </div>
        </div>
      )}

    </div>
  );
};