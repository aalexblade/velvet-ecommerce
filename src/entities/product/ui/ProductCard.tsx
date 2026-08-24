"use client";

import * as React from "react";
import { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/shared/lib";
import { Product, ProductColor } from "../model/types";
import { useCartStore } from "@/features/cart/model/cartStore";
import { ProductDetailsBlock } from "@/widgets/product-details-block";
import { ProductColorSwatches } from "./ProductColorSwatches";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  // Хелпер для нормалізації кольору
  const normalizeColor = (color?: string | null) =>
    color?.trim().toLowerCase() || "";

  // Хелпер для визначення кольору з URL
  const parseColorFromUrl = (url?: string): string | null => {
    if (!url) return null;
    const lower = url.toLowerCase();
    if (lower.includes("-white") || lower.includes("white")) return "White";
    if (lower.includes("-black") || lower.includes("black")) return "Black";
    if (
      lower.includes("-beige") ||
      lower.includes("beige") ||
      lower.includes("nude")
    )
      return "Beige";
    if (lower.includes("-blue") || lower.includes("blue")) return "Blue";
    if (lower.includes("-navy") || lower.includes("navy")) return "Navy";
    if (
      lower.includes("-red") ||
      lower.includes("burgundy") ||
      lower.includes("darkred")
    )
      return "Red";
    if (lower.includes("-fuchsia") || lower.includes("magenta"))
      return "Fuchsia";
    if (
      lower.includes("-green") ||
      lower.includes("sage") ||
      lower.includes("emerald")
    )
      return "Green";
    if (lower.includes("-purple") || lower.includes("lavender"))
      return "Purple";
    if (lower.includes("-pink") || lower.includes("pink")) return "Pink";
    if (lower.includes("-orange") || lower.includes("terracotta"))
      return "Orange";
    if (lower.includes("-mint")) return "Mint";
    return null;
  };

  const mainImage = useMemo(() => {
    return product.images?.find((img) => img.is_main) || product.images?.[0];
  }, [product.images]);

  const defaultColor = useMemo(() => {
    const mainImgColor = mainImage?.color || parseColorFromUrl(mainImage?.url);
    if (mainImgColor) return mainImgColor;

    if (mainImage?.variant_id) {
      const match = product.variants?.find(
        (v) => v.id === mainImage.variant_id,
      );
      if (match?.color) return match.color;
    }

    return product.variants?.[0]?.color || "";
  }, [mainImage, product.variants]);

  // Стан для відстеження зміни товару та обраного кольору
  const [prevProductId, setPrevProductId] = useState(product.id);
  const [selectedColor, setSelectedColor] = useState<ProductColor | string>(
    defaultColor,
  );

  // Синхронізація стану ПІД ЧАС РЕНДЕРУ (замість useEffect)
  if (prevProductId !== product.id) {
    setPrevProductId(product.id);
    setSelectedColor(defaultColor);
  }

  const activeVariant = useMemo(() => {
    const target = normalizeColor(selectedColor);
    return (
      product.variants?.find(
        (v) => normalizeColor(v.color) === target && (v.stock ?? 1) > 0,
      ) ||
      product.variants?.find((v) => normalizeColor(v.color) === target) ||
      product.variants?.[0]
    );
  }, [product.variants, selectedColor]);

  // Фільтрація картинок strictly під обраний колір
  const imagesToRender = useMemo(() => {
    if (!product.images || product.images.length === 0) {
      return [{ url: "/placeholder-product.webp", id: 0 }];
    }

    const targetColor = normalizeColor(selectedColor);

    if (targetColor) {
      const filtered = product.images.filter((img) => {
        const imgColor = normalizeColor(
          img.color || parseColorFromUrl(img.url),
        );
        if (imgColor && imgColor === targetColor) {
          return true;
        }
        if (img.variant_id) {
          const variant = product.variants?.find(
            (v) => v.id === img.variant_id,
          );
          return normalizeColor(variant?.color) === targetColor;
        }
        return false;
      });

      if (filtered.length > 0) return filtered;
    }

    return [mainImage || product.images[0]];
  }, [product.images, product.variants, selectedColor, mainImage]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 25,
    watchSlides: true,
  });

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0);
    }
  }, [selectedColor, emblaApi, imagesToRender]);

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollPrev();
    },
    [emblaApi],
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollNext();
    },
    [emblaApi],
  );

  const price = activeVariant?.price || product.variants?.[0]?.price || 0;

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!activeVariant) return;

    addToCart({
      variantId: activeVariant.id,
      productId: product.id,
      title: product.title,
      price: activeVariant.price,
      quantity: 1,
      image: imagesToRender[0]?.url || "/placeholder-product.webp",
      color: activeVariant.color,
      size: activeVariant.size,
    });
  };

  return (
    <>
      <div className="group/card relative flex flex-col h-full bg-white transition-all duration-300 font-sans text-zinc-900">
        <div className="relative aspect-3/4 w-full overflow-hidden bg-neutral-50 rounded-xl border border-zinc-100 mb-3">
          <div className="w-full h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full touch-pan-y">
              {imagesToRender.map((img, index) => (
                <div
                  className="relative flex-[0_0_100%] min-w-0 h-full w-full aspect-3/4"
                  key={`card-slide-${img.id || index}-${img.url}`}
                >
                  <Image
                    src={img.url}
                    alt={product.title}
                    fill
                    className="object-cover object-center pointer-events-none"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority={index === 0}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="absolute inset-0 z-10"
          />

          {imagesToRender.length > 1 && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
              <button
                type="button"
                onClick={scrollPrev}
                className="w-7 h-7 rounded-full bg-[#C8205C] text-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#A61548] active:scale-90 transition-all pointer-events-auto"
                aria-label="Попередня картинка"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="w-7 h-7 rounded-full bg-[#C8205C] text-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#A61548] active:scale-90 transition-all pointer-events-auto"
                aria-label="Наступна картинка"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
              </button>
            </div>
          )}

          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="w-full max-w-48 bg-white/40 backdrop-blur-md text-zinc-900 font-semibold text-xs py-2.5 rounded-lg shadow-sm hover:bg-white/90 hover:text-[#C8205C] transition-all transform translate-y-1 group-hover/card:translate-y-0 cursor-pointer border border-white/30 text-center pointer-events-auto"
            >
              Швидкий перегляд
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 px-1 grow">
          <div className="flex items-center justify-between w-full min-h-6">
            <ProductColorSwatches
              variants={product.variants}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              maxDisplay={4}
              showAllBaseColors={false}
            />

            <div className="flex items-center gap-2 ml-auto z-20 relative">
              <button
                type="button"
                onClick={handleQuickAddToCart}
                className="text-zinc-400 hover:text-[#C8205C] transition-colors p-1 cursor-pointer"
                title="Швидке додавання в кошик"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsWishlist(!isWishlist);
                }}
                className="text-[#C8205C] transition-colors p-1 cursor-pointer"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-all text-zinc-400 hover:text-[#C8205C]",
                    isWishlist && "fill-[#C8205C] text-[#C8205C]",
                  )}
                />
              </button>
            </div>
          </div>

          <Link href={`/product/${product.id}`} className="block">
            <h2 className="text-sm font-normal text-zinc-800 line-clamp-1 group-hover/card:text-[#C8205C] transition-colors tracking-tight">
              {product.title}
            </h2>
          </Link>

          <div className="text-sm font-bold text-zinc-900">
            {price.toLocaleString("uk-UA")} UAH
          </div>
        </div>
      </div>

      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
          <div
            onClick={() => setIsQuickViewOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity cursor-pointer"
          />

          <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-zinc-100 overflow-y-auto no-scrollbar max-h-[90vh] p-6 md:p-8 z-10">
            <button
              type="button"
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-zinc-100 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer transition-all z-30 bg-white"
              aria-label="Закрити вікно"
            >
              <X className="w-4 h-4" />
            </button>

            <ProductDetailsBlock product={product} />
          </div>
        </div>
      )}
    </>
  );
};
