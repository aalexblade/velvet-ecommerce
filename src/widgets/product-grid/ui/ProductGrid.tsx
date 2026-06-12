"use client"

import * as React from "react"
import { ProductCard, Product } from "@/entities/product"
import { AddToCartButton } from "@/features/cart"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel"
import { cn } from "@/shared/lib"

const BESTSELLERS_DATA: Product[] = [
  {
    id: "1",
    title: "Бюстгальтер бежевий, push-up",
    slug: "bra-beige-push-up",
    description: "Бюстгальтер бежевий, push-up",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      { id: 1, product_id: "1", variant_id: null, url: "/next.svg", is_main: true, sort_order: 1 }        
    ],
    variants: [
      { id: "v1", product_id: "1", sku: "BBP-001", color: "Black", size: "M", price: 1249, old_price: null, stock: 10 }
    ]
  },
  {
    id: "2",
    title: "Бюстгальтер бралет, чорний push-up",
    slug: "bra-bralet-black-push-up",
    description: "Бюстгальтер бралет, чорний push-up",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      { id: 2, product_id: "2", variant_id: null, url: "/next.svg", is_main: true, sort_order: 1 }        
    ],
    variants: [
      { id: "v2", product_id: "2", sku: "BBB-002", color: "Black", size: "M", price: 1700, old_price: null, stock: 10 }
    ]
  },
  {
    id: "3",
    title: "Бюстгальтер бралет, чорний",
    slug: "bra-bralet-black",
    description: "Бюстгальтер бралет, чорний",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      { id: 3, product_id: "3", variant_id: null, url: "/next.svg", is_main: true, sort_order: 1 }        
    ],
    variants: [
      { id: "v3", product_id: "3", sku: "BB-003", color: "Black", size: "M", price: 1349, old_price: null, stock: 10 }
    ]
  },
  {
    id: "4",
    title: "Бюстгальтер бежевий, базовий",
    slug: "bra-beige-basic",
    description: "Бюстгальтер бежевий, базовий",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    images: [
      { id: 4, product_id: "4", variant_id: null, url: "/next.svg", is_main: true, sort_order: 1 }        
    ],
    variants: [
      { id: "v4", product_id: "4", sku: "BBB-004", color: "Black", size: "M", price: 1100, old_price: null, stock: 10 }
    ]
  },
]

/**
 * ProductGrid Widget
 * 
 * Composite structural block that bridges domain data (Entities) 
 * with user interactivity (Features).
 */
export const ProductGrid = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)    

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

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

      {/* Left side column (Promo banner box) */}
      <div className="relative w-full h-full min-h-112 rounded-lg overflow-hidden bg-muted hidden lg:block border border-border">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-sans uppercase tracking-widest text-xs">
          Promo Editorial Frame
        </div>
      </div>

      {/* Right side column: Unified Composition Root */}     
      <div className="flex flex-col h-full justify-between">

        <div className="flex flex-col">
          {/* Header Typography Group */}
          <div className="mb-4 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground uppercase tracking-widest mb-2">
              Бестселери
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto lg:mx-0 text-sm">
              Найпопулярніші моделі сезону, які обирають наші клієнти найчастіше.
            </p>
          </div>

          {/* Desktop Product Composition Matrix */}
          <div className="hidden lg:grid grid-cols-2 gap-6 my-6 h-auto items-stretch">
            {BESTSELLERS_DATA.map((product) => (     
              <ProductCard
                key={product.id}
                product={product}
                action={
                  <AddToCartButton
                    variantId={product.variants?.[0]?.id || product.id}
                    productId={product.id}
                    title={product.title}
                    price={product.variants?.[0]?.price || 0}
                    image={product.images?.[0]?.url || ""}
                    color={product.variants?.[0]?.color}
                    size={product.variants?.[0]?.size}
                  />
                }
              />
            ))}
          </div>

          {/* Mobile/Tablet Viewport Composition */}
          <div className="block lg:hidden my-6">     
            <Carousel setApi={setApi} className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-4 items-stretch">
                {BESTSELLERS_DATA.map((product) => ( 
                  <CarouselItem key={product.id} className="pl-4 basis-3/4 sm:basis-1/2 md:basis-2/5 lg:basis-full">
                    <ProductCard
                      product={product}
                      action={
                        <AddToCartButton
                          variantId={product.variants?.[0]?.id || product.id}
                          productId={product.id}
                          title={product.title}
                          price={product.variants?.[0]?.price || 0}
                          image={product.images?.[0]?.url || ""}
                          color={product.variants?.[0]?.color}
                          size={product.variants?.[0]?.size}
                        />
                      }
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Compositional Navigation Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {BESTSELLERS_DATA.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "h-1 transition-all duration-300 cursor-pointer",
                      current === index ? "w-8 bg-primary" : "w-4 bg-border"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </Carousel>
          </div>
        </div>

        {/* Global Catalog Action */}
        <div className="flex w-full justify-center lg:justify-start lg:w-fit mt-6 md:mt-8">
          <button className="border border-solid border-primary text-foreground font-bold rounded-xl px-8 py-4 text-xs uppercase tracking-widest transition-all hover:bg-muted active:scale-[0.98] w-full sm:w-fit cursor-pointer shadow-sm">
            Подивитись все
          </button>
        </div>

      </div>
    </section>
  )
}
