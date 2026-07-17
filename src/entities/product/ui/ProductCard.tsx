"use client";

import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn, getProductColorClass } from "@/shared/lib";
import { Product, ProductColor } from "../model/types";
import { useCartStore } from "@/features/cart/model/cartStore";
import { ProductDetailsBlock } from "@/widgets/product-details-block";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const imagesToRender = useMemo(() => {
    return product.images?.length > 0
      ? product.images
      : [{ url: "/placeholder-product.webp", id: 0 }];
  }, [product.images]);


  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 25,
    watchSlides: true,
    active: true,
  });

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

  const baseVariant = product.variants?.[0];
  const price = baseVariant?.price || 0;

  const uniqueColors = useMemo(() => {
    return Array.from(
      new Set(product.variants?.map((v) => v.color) || []),
    ) as ProductColor[];
  }, [product.variants]);

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!baseVariant) return;

    addToCart({
      variantId: baseVariant.id,
      productId: product.id,
      title: product.title,
      price: baseVariant.price,
      quantity: 1,
      image: imagesToRender[0].url,
      color: baseVariant.color,
      size: baseVariant.size,
    });
  };

  return (
    <>
      <div className="group/card relative flex flex-col h-full bg-white transition-all duration-300 font-sans text-zinc-900">
        {/* 1. ЗОНА ФОТО (Карусель зі стрілками при ховері) */}
        <div className="relative aspect-3/4 w-full overflow-hidden bg-neutral-50 rounded-xl border border-zinc-100 mb-3">
          <div className="w-full h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full touch-pan-y">
              {imagesToRender.map((img, index) => (
                <div
                  className="relative flex-[0_0_100%] min-w-0 h-full w-full aspect-3/4"
                  key={`card-slide-${img.id || index}`}
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

          {/* Клікабельний лінк на детальну сторінку по всій площі */}
          <Link
            href={`/product/${product.id}`}
            className="absolute inset-0 z-10"
          />

          {/* Елегантні брендові рожеві стрілки навігації, що з'являються при ховері */}
          {imagesToRender.length > 1 && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
              <button
                onClick={scrollPrev}
                className="w-7 h-7 rounded-full bg-[#C8205C] text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#A61548] active:scale-90 transition-all pointer-events-auto"
                aria-label="Попередня картинка"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
              </button>
              <button
                onClick={scrollNext}
                className="w-7 h-7 rounded-full bg-[#C8205C] text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#A61548] active:scale-90 transition-all pointer-events-auto"
                aria-label="Наступна картинка"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
              </button>
            </div>
          )}

          {/* Кнопка «Швидкий перегляд» — Напівпрозора, розмита та витончена за макетом */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="w-full max-w-48 bg-white/40 backdrop-blur-md text-zinc-900 font-semibold text-xs py-2.5 rounded-lg shadow-xs hover:bg-white/90 hover:text-[#C8205C] transition-all transform translate-y-1 group-hover/card:translate-y-0 cursor-pointer border border-white/30 text-center"
            >
              Швидкий перегляд
            </button>
          </div>
        </div>

        {/* 2. ІНФО-БЛОК (Порядок елементів чітко за макетом Figma) */}
        <div className="flex flex-col gap-1.5 px-1 grow">
          {/* Рядок кольорів та дій */}
          <div className="flex items-center justify-between w-full min-h-6">
            <div className="flex items-center gap-1.5">
              {uniqueColors.map((color, cIdx) => (
                <span
                  key={cIdx}
                  title={color}
                  className={cn(
                    "w-4 h-4 rounded-xs border border-zinc-300 shadow-inner cursor-pointer transition-transform hover:scale-110",
                    getProductColorClass(color),
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleQuickAddToCart}
                className="text-zinc-400 hover:text-[#C8205C] transition-colors p-1 cursor-pointer"
                title="Швидке додавання в кошик"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsWishlist(!isWishlist);
                }}
                className="text-zinc-400 hover:text-[#C8205C] transition-colors p-1 cursor-pointer"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-all",
                    isWishlist && "fill-[#C8205C] text-[#C8205C]",
                  )}
                />
              </button>
            </div>
          </div>

          {/* Назва продукту */}
          <Link href={`/product/${product.id}`} className="block">
            <h2 className="text-sm font-normal text-zinc-800 line-clamp-1 group-hover/card:text-[#C8205C] transition-colors tracking-tight">
              {product.title}
            </h2>
          </Link>

          {/* Ціна */}
          <div className="text-sm font-bold text-zinc-900">
            {price.toLocaleString("uk-UA")} UAH
          </div>
        </div>
      </div>

      {/* --- МОДАЛКА ШВИДКОГО ПЕРЕГЛЯДУ --- */}
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
          <div
            onClick={() => setIsQuickViewOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity cursor-pointer"
          />

          <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-zinc-100 overflow-y-auto no-scrollbar max-h-[90vh] p-6 md:p-8 z-10">
            <button
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
