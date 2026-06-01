"use client"

import * as React from "react"
import { StaticImageData } from "next/image"
import { ProductCard } from "@/entities/product"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel"
import { cn } from "@/shared/lib/utils"

interface BestsellerProduct {
  id: string;
  title: string;
  price: number;
  imageUrl: string | StaticImageData;
}

const BESTSELLERS_DATA: BestsellerProduct[] = [
  {
    id: "1",
    title: "Бюстгальтер бежевий, push-up",
    price: 1249,
    imageUrl: "/next.svg",
  },
  {
    id: "2",
    title: "Бюстгальтер бралет, чорний push-up",
    price: 1700,
    imageUrl: "/next.svg",
  },
  {
    id: "3",
    title: "Бюстгальтер бралет, чорний",
    price: 1349,
    imageUrl: "/next.svg",
  },
  {
    id: "4",
    title: "Бюстгальтер бежевий, базовий",
    price: 1100,
    imageUrl: "/next.svg",
  },
]

export const Bestsellers = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // Sync initial state and attach listeners safely
    onSelect();
    api.on("select", onSelect);
    api.on("init", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("init", onSelect);
    };
  }, [api])

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
      
      {/* Left side column (Promo banner box) - Hidden on mobile/tablet */}
      <div className="relative w-full h-full min-h-112 rounded-lg overflow-hidden bg-stone-100 hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-sans uppercase tracking-[0.2em]">
          Promo Banner
        </div>
      </div>

      {/* Right side column: Unified Flexbox container holding headers, grid/carousel, and button */}
      <div className="flex flex-col h-full justify-between">
        
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-4 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-[#121212] uppercase tracking-wider mb-2">
              Бестселери
            </h2>
            <p className="text-neutral-500 max-w-sm mx-auto lg:mx-0">
              Найпопулярніші моделі сезону, які обирають наші клієнти найчастіше.
            </p>
          </div>

          {/* Desktop Product Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-6 my-6 h-auto items-stretch">
            {BESTSELLERS_DATA.map((product) => (
              <ProductCard 
                key={product.id} 
                title={product.title} 
                price={`${product.price} UAH`} 
                image={product.imageUrl}
                className="h-full"
              />
            ))}
          </div>

          {/* Mobile/Tablet Carousel */}
          <div className="block lg:hidden my-6">
            <Carousel setApi={setApi} className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-4 items-stretch">
                {BESTSELLERS_DATA.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 basis-[70%] sm:basis-[45%] md:basis-[40%] lg:basis-full">
                    <ProductCard 
                      title={product.title} 
                      price={`${product.price} UAH`} 
                      image={product.imageUrl}
                      className="h-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Horizontal Line Indicators (Dots) */}
              <div className="flex justify-center gap-2 mt-8">
                {BESTSELLERS_DATA.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "h-1 transition-all duration-300",
                      current === index ? "w-8 bg-[#c31f5c]" : "w-4 bg-stone-200"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </Carousel>
          </div>
        </div>

        {/* Action Button - Always visible at bottom, centered on mobile */}
        <div className="flex w-full justify-center lg:justify-start lg:w-fit mt-6 md:mt-8">
          <button className="border border-solid border-[#c31f5c] text-[#121212] font-medium rounded-lg px-6 py-3.5 transition-colors hover:bg-neutral-50 w-full sm:w-fit">
            Подивитись все
          </button>
        </div>

      </div>
    </section>
  )
}
