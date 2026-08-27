"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Heart, Minus, Plus, Star, Ruler, Check, X } from "lucide-react";
import { cn } from "@/shared/lib";
import { Product } from "@/entities/product/model/types";
import { useCartStore } from "@/features/cart/model/cartStore";
import { SizeCalculatorForm } from "@/features/product-size-calculator/ui/SizeCalculatorForm";

interface ProductDetailsBlockProps {
  product: Product;
  initialGroupId?: number | string;
}

type TabType = "description" | "delivery" | "recommendations";

export const ProductDetailsBlock: React.FC<ProductDetailsBlockProps> = ({
  product,
  initialGroupId,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  // 1. Extract color groups
  const colorGroups = useMemo(
    () => product.product_color_groups || [],
    [product.product_color_groups],
  );

  // 2. Compute default group
  const defaultGroup = useMemo(() => {
    if (initialGroupId) {
      const matchedGroup = colorGroups.find(
        (g) => g.id === Number(initialGroupId),
      );
      if (matchedGroup) return matchedGroup;
    }
    return colorGroups.find((g) => g.is_main) || colorGroups[0];
  }, [colorGroups, initialGroupId]);

  // 3. State management with state-during-render adjustments (Replaces Effect #1)
  const [selectedGroupId, setSelectedGroupId] = useState<number | string>(
    defaultGroup?.id || "",
  );
  const [prevInitialGroupId, setPrevInitialGroupId] = useState(initialGroupId);

  if (initialGroupId !== prevInitialGroupId) {
    setPrevInitialGroupId(initialGroupId);
    if (initialGroupId) {
      setSelectedGroupId(Number(initialGroupId));
    }
  }

  // 4. Derive active group
  const activeGroup = useMemo(
    () => colorGroups.find((g) => g.id === selectedGroupId) || defaultGroup,
    [colorGroups, selectedGroupId, defaultGroup],
  );

  // 5. Derive images
  const imagesToRender = useMemo(() => {
    const images = activeGroup?.product_images || [];
    if (images.length === 0) {
      return [
        {
          id: "placeholder",
          url: "/placeholder-product.webp",
          sort_order: 1,
        },
      ];
    }
    return [...images].sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0),
    );
  }, [activeGroup]);

  // 6. Derive sizes & available variants
  const activeVariants = useMemo(
    () => activeGroup?.product_variants || [],
    [activeGroup],
  );

  const availableSizes = useMemo(
    () => Array.from(new Set(activeVariants.map((v) => v.size))),
    [activeVariants],
  );

  // Derive initial/fallback size cleanly without state sync effects
  const defaultSize = useMemo(() => {
    const firstInStock = activeVariants.find((v) => (v.stock ?? 1) > 0);
    return firstInStock ? firstInStock.size : activeVariants[0]?.size || "";
  }, [activeVariants]);

  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);

  // Reset size state if currently selected size doesn't exist in active group
  const [prevSelectedGroupId, setPrevSelectedGroupId] =
    useState(selectedGroupId);

  if (selectedGroupId !== prevSelectedGroupId) {
    setPrevSelectedGroupId(selectedGroupId);
    setSelectedSize(defaultSize);
  }

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [isWishlist, setIsWishlist] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  // 7. Derive active variant object
  const currentVariant = useMemo(() => {
    return (
      activeVariants.find((v) => v.size === selectedSize) || activeVariants[0]
    );
  }, [activeVariants, selectedSize]);

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 25,
    watchSlides: true,
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

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0);
    }
  }, [selectedGroupId, emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const isOutOfStock =
    !currentVariant ||
    (currentVariant.stock !== undefined && currentVariant.stock <= 0);

  const handleAddToCart = () => {
    if (isOutOfStock || !currentVariant) return;

    addToCart({
      variantId: String(currentVariant.id),
      productId: String(product.id),
      title: product.title,
      price: currentVariant.price,
      quantity: quantity,
      image: imagesToRender[0]?.url || "/placeholder-product.webp",
      color: activeGroup?.colors?.name_uk || activeGroup?.color_slug || "",
      size: currentVariant.size,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleSizeCalculated = (calculatedSize: string) => {
    if (availableSizes.includes(calculatedSize)) {
      setSelectedSize(calculatedSize);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-2 items-start text-zinc-900 font-sans">
      {/* 📸 GALLERY */}
      <div className="flex flex-col-reverse md:flex-row lg:col-span-7 gap-4 h-full w-full overflow-hidden">
        {imagesToRender.length > 1 && (
          <div className="hidden md:flex flex-col gap-2 shrink-0 w-16 overflow-y-auto no-scrollbar max-h-136">
            {imagesToRender.map((img, idx) => (
              <button
                key={`thumb-${img.id || idx}`}
                type="button"
                onClick={() => scrollTo(idx)}
                className={cn(
                  "relative aspect-3/4 w-16 bg-zinc-50 rounded-md overflow-hidden border transition-all cursor-pointer",
                  idx === selectedIndex
                    ? "border-zinc-900 opacity-100 shadow-xs"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={img.url}
                  alt="Thumbnail image"
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}

        <div
          className="relative aspect-3/4 flex-1 bg-zinc-50 rounded-lg overflow-hidden border border-zinc-100"
          ref={emblaRef}
        >
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

      {/* 📝 DETAILS */}
      <div className="flex flex-col lg:col-span-5 gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium tracking-tight text-zinc-900 leading-tight">
            {product.title}
          </h1>
          <span className="text-sm text-zinc-500 font-normal">
            Арт. {currentVariant?.sku || currentVariant?.id || "565940"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4 fill-current",
                  i < 4 ? "text-amber-400" : "text-zinc-200 fill-zinc-200",
                )}
              />
            ))}
          </div>
          <span className="text-zinc-500 text-xs">(10) відгуків</span>
        </div>

        {/* Colors */}
        {colorGroups.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm text-zinc-600">
              Колір:{" "}
              <span className="font-semibold text-zinc-900">
                {activeGroup?.colors?.name_uk || activeGroup?.color_slug}
              </span>
            </span>
            <div className="flex flex-wrap gap-2.5 items-center">
              {colorGroups.map((group) => {
                const isSelected = group.id === activeGroup?.id;
                const colorHex = group.colors?.hex || "#CCCCCC";

                return (
                  <button
                    key={`detail-color-group-${group.id}`}
                    type="button"
                    onClick={() => {
                      setSelectedGroupId(group.id);
                      setSelectedSize(defaultSize);
                      setQuantity(1);
                      setIsAdded(false);
                    }}
                    title={group.colors?.name_uk || group.color_slug}
                    className={cn(
                      "w-7 h-7 rounded-md flex items-center justify-center p-0.5 transition-all cursor-pointer border relative",
                      isSelected
                        ? "border-zinc-900 scale-105 ring-1 ring-zinc-900"
                        : "border-zinc-200 hover:border-zinc-400",
                    )}
                  >
                    <span
                      className="w-full h-full rounded-md shadow-xs block"
                      style={{ backgroundColor: colorHex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sizes */}
        {availableSizes.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm text-zinc-600">Розмір:</span>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                const variantForSize = activeVariants.find(
                  (v) => v.size === size,
                );
                const hasStock =
                  variantForSize && (variantForSize.stock ?? 1) > 0;

                return (
                  <button
                    key={`detail-size-${size}`}
                    type="button"
                    disabled={!hasStock}
                    onClick={() => {
                      setSelectedSize(size);
                      setIsAdded(false);
                    }}
                    className={cn(
                      "h-9 min-w-14 border rounded-md text-xs font-medium transition-all cursor-pointer flex items-center justify-center",
                      isSelected &&
                        "border-[#C8205C] text-[#C8205C] font-semibold bg-white",
                      !isSelected &&
                        hasStock &&
                        "border-zinc-300 text-zinc-900 hover:border-zinc-900",
                      !hasStock &&
                        "border-zinc-200 bg-zinc-50 text-zinc-300 line-through opacity-50 cursor-not-allowed",
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsSizeModalOpen(true)}
          className="flex items-center gap-2 text-xs text-[#C8205C] hover:underline cursor-pointer font-medium -mt-1 w-max"
        >
          <Ruler className="w-3.5 h-3.5 transform rotate-45" />
          <span>Підібрати розмір</span>
        </button>

        {/* Quantity */}
        <div className="flex items-center border border-zinc-300 rounded-md h-9 w-max bg-white">
          <button
            type="button"
            onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
            disabled={quantity <= 1 || isOutOfStock}
            className="px-3 h-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 disabled:opacity-30 cursor-pointer"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center text-xs font-medium select-none">
            {isOutOfStock ? 0 : quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((q) =>
                q < (currentVariant?.stock ?? 99) ? q + 1 : q,
              )
            }
            disabled={isOutOfStock}
            className="px-3 h-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 disabled:opacity-30 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="text-xl font-semibold tracking-tight text-zinc-900 -mt-1">
          {currentVariant ? currentVariant.price.toLocaleString("uk-UA") : 0}{" "}
          UAH
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center w-full">
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={cn(
              "flex-1 h-11 rounded-md text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-white",
              isOutOfStock
                ? "bg-zinc-300 cursor-not-allowed"
                : isAdded
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-[#C8205C] hover:bg-[#a6174a]",
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
            type="button"
            onClick={() => setIsWishlist(!isWishlist)}
            className="h-11 w-11 rounded-md border border-zinc-300 flex items-center justify-center text-zinc-400 hover:text-[#C8205C] hover:border-[#C8205C] cursor-pointer active:scale-95 transition-all shrink-0"
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-all",
                isWishlist
                  ? "fill-[#C8205C] stroke-[#C8205C]"
                  : "stroke-[1.5px]",
              )}
            />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-4 mt-2 border-t border-zinc-200 pt-4">
          <div className="flex items-center gap-6 border-b border-zinc-100 pb-1 text-xs font-bold uppercase tracking-wider">
            {(["description", "delivery", "recommendations"] as TabType[]).map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-2 relative cursor-pointer transition-colors",
                    activeTab === tab
                      ? "text-zinc-900 font-bold"
                      : "text-zinc-400 hover:text-zinc-600",
                  )}
                >
                  {tab === "description"
                    ? "Опис"
                    : tab === "delivery"
                      ? "Доставка та оплата"
                      : "Рекомендації"}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C8205C] rounded-full" />
                  )}
                </button>
              ),
            )}
          </div>

          <div className="text-xs text-zinc-700 leading-relaxed min-h-36 font-sans">
            {activeTab === "description" && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-150">
                <p>{product.description}</p>
                <div className="border-t border-zinc-200 pt-3 flex flex-col gap-1.5 text-zinc-900 font-light">
                  <div>
                    <strong className="font-semibold">Посадка:</strong> середня
                    підтримка з відкритим вирізом
                  </div>
                  <div>
                    <strong className="font-semibold">Фасон:</strong> балконет
                    із пуш-ап ефектом
                  </div>
                  <div>
                    <strong className="font-semibold">Бретелі:</strong>{" "}
                    регульовані, можна знімати
                  </div>
                  <div>
                    <strong className="font-semibold">Застібка:</strong>{" "}
                    класична на спині
                  </div>
                </div>
              </div>
            )}

            {activeTab === "delivery" && (
              <p className="animate-in fade-in duration-150">
                Ми піклуємося про вашу конфіденційність, тому всі замовлення
                відправляються в анонімній упаковці.
              </p>
            )}

            {activeTab === "recommendations" && (
              <p className="animate-in fade-in duration-150 text-zinc-400 italic">
                Секція супутніх товарів з&apos;явиться незабаром.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isSizeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div
            onClick={() => setIsSizeModalOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-zinc-100 z-10 flex flex-col gap-5 max-h-[90vh] overflow-y-auto no-scrollbar font-sans">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold uppercase tracking-wider text-zinc-900">
                  Підбір ідеального розміру
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSizeModalOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <hr className="border-zinc-100 -mx-6 md:-mx-8" />
            <SizeCalculatorForm
              onSizeCalculated={handleSizeCalculated}
              onApplyFilter={(size) => {
                if (availableSizes.includes(size)) {
                  setSelectedSize(size);
                }
                setIsSizeModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
