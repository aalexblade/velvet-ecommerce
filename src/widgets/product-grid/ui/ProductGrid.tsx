"use client"

import * as React from "react"
import { ProductCard, Product } from "@/entities/product"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel"
import { cn } from "@/shared/lib"

export const BESTSELLERS_DATA: Product[] = [
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

export interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
  showPromo?: boolean;
}

/**
 * ProductGrid Widget
 * 
 * Composite structural block that bridges domain data (Entities) 
 * with user interactivity (Features).
 */
export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  description,
  showPromo = false 
}) => {
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
    <section className="w-full h-full">
      <div className={cn(
        "grid grid-cols-1 gap-8 lg:gap-12 items-stretch",
        showPromo ? "lg:grid-cols-2" : "grid-cols-1"
      )}>

        {/* Optional Left side column (Promo banner box) */}
        {showPromo && (
          <div className="relative w-full h-full min-h-112 rounded-lg overflow-hidden bg-muted hidden lg:block border border-border">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-sans uppercase tracking-widest text-xs">
              Promo Editorial Frame
            </div>
          </div>
        )}

        {/* Unified Composition Root */}     
        <div className="flex flex-col h-full justify-between">

          <div className="flex flex-col">
            {/* Header Typography Group */}
            {(title || description) && (
              <div className="mb-4 text-center lg:text-left">
                {title && (
                  <h2 className="text-2xl font-bold text-foreground uppercase tracking-widest mb-2">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-muted-foreground max-w-sm mx-auto lg:mx-0 text-sm">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Desktop Product Composition Matrix */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 my-6 h-auto items-stretch">
              {products.map((product) => (     
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* Mobile/Tablet Viewport Composition */}
            <div className="block md:hidden my-6">     
              <Carousel setApi={setApi} className="w-full" opts={{ align: "start", loop: true }}>
                <CarouselContent className="-ml-4 items-stretch">
                  {products.map((product) => ( 
                    <CarouselItem key={product.id} className="pl-4 basis-3/4 sm:basis-1/2">
                      <ProductCard
                        product={product}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Compositional Navigation Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                  {products.map((_, index) => (
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
        </div>
      </div>
    </section>
  )
}