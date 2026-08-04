"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ProductCard, ProductCardSkeleton, Product } from "@/entities/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel";
import { cn } from "@/shared/lib";

export interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
  showPromo?: boolean;
  promoImageUrl?: string;
  isLoading?: boolean;
  skeletonCount?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  description,
  showPromo = false,
  promoImageUrl = "https://mylhoikievakodeutzsi.supabase.co/storage/v1/object/public/products/bestsellers-promo.jpg",
  isLoading = false,
  skeletonCount = 4,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const autoplayPlugin = React.useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (api && products.length > 0) {
      api.reInit();
    }
  }, [api, products]);

  const skeletonItems = Array.from({ length: skeletonCount });

  return (
    <section className="w-full py-6 lg:py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div
          className={cn(
            "grid grid-cols-1 gap-6 lg:gap-8 items-stretch",
            showPromo ? "lg:grid-cols-12" : "grid-cols-1",
          )}
        >
          {/* 1. LEFT PROMO BANNER (Займає 7 колонок, зберігає гарну вертикальну пропорцію) */}
          {showPromo && (
            <div className="relative w-full aspect-4/5 lg:aspect-auto lg:h-full rounded-2xl overflow-hidden hidden lg:block border border-border lg:col-span-7">
              <Image
                src={promoImageUrl}
                alt="Bestsellers Promo"
                fill
                className="object-cover object-center"
                priority
                unoptimized
              />
            </div>
          )}

          {/* 2. RIGHT PRODUCTS SECTION (Займає 5 колонок) */}
          <div
            className={cn(
              "flex flex-col h-full justify-between overflow-hidden",
              showPromo ? "lg:col-span-5" : "w-full",
            )}
          >
            <div>
              {/* Header */}
              {(title || description) && (
                <div className="mb-4 text-left">
                  {title && (
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-muted-foreground text-xs md:text-sm">
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* DESKTOP GRID (Компактні картки: обмежено ширину кожної картки, щоб вони не розтягувались) */}
              <div
                className={cn(
                  "hidden lg:grid gap-4 mb-4",
                  showPromo ? "grid-cols-2 justify-items-center" : "grid-cols-2 lg:grid-cols-4",
                )}
              >
                {isLoading
                  ? skeletonItems.map((_, index) => (
                      <ProductCardSkeleton key={`desktop-skeleton-${index}`} />
                    ))
                  : products.map((product) => (
                      <div key={product.id} className="w-full max-w-55">
                        <ProductCard product={product} />
                      </div>
                    ))}
              </div>

              {/* MOBILE & TABLET CAROUSEL (0px - 1023px) */}
              <div className="block lg:hidden my-4">
                <Carousel
                  setApi={setApi}
                  plugins={[autoplayPlugin]}
                  className="w-full"
                  opts={{
                    align: "start",
                    loop: true,
                    containScroll: "trimSnaps",
                  }}
                >
                  <CarouselContent className="-ml-3">
                    {isLoading
                      ? skeletonItems.map((_, index) => (
                          <CarouselItem
                            key={`mobile-skeleton-${index}`}
                            className="pl-3 basis-4/5 sm:basis-[40%] md:basis-[40%]"
                          >
                            <ProductCardSkeleton />
                          </CarouselItem>
                        ))
                      : products.map((product) => (
                          <CarouselItem
                            key={product.id}
                            className="pl-3 basis-4/5 sm:basis-[40%] md:basis-[40%]"
                          >
                            <ProductCard product={product} />
                          </CarouselItem>
                        ))}
                  </CarouselContent>

                  {/* Navigation Dots */}
                  {!isLoading && products.length > 0 && (
                    <div className="flex justify-center gap-1.5 mt-4">
                      {products.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => api?.scrollTo(index)}
                          className={cn(
                            "h-1 rounded-full transition-all duration-300 cursor-pointer",
                            current === index
                              ? "w-6 bg-accent"
                              : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                          )}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </Carousel>
              </div>
            </div>

            {/* "See all" Button */}
            <div className="mt-2 flex justify-center lg:justify-start">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 text-xs font-medium rounded-lg"
              >
                Подивитись все
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};