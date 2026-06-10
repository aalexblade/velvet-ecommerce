"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib"

const slides = [
  {
    title: "Відчуй себе особливою в новій колекції білизни",
    description: "Вишукані моделі, створені для вашого щоденного натхнення. Якість у кожній деталі. Відчуй себе впевнено та розкішно.",
    cta: "Перейти до колекції",        
  },
  {
    title: "Відчуй себе особливою в новій колекції білизни",
    description: "Вишукані моделі, створені для вашого щоденного натхнення. Якість у кожній деталі. Відчуй себе впевнено та розкішно.",
    cta: "Перейти до колекції",        
  },
  {
    title: "Відчуй себе особливою в новій колекції білизни",
    description: "Вишукані моделі, створені для вашого щоденного натхнення. Якість у кожній деталі. Відчуй себе впевнено та розкішно.",
    cta: "Перейти до колекції",        
  },
]

export const HeroSlider = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)    

  const plugins = React.useMemo(() => [
    Autoplay({ delay: 4000, stopOnInteraction: true })
  ], [])

  React.useEffect(() => {
    if (!api) return

    const updateActiveIndex = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("init", updateActiveIndex)
    api.on("select", updateActiveIndex)

    if (api.scrollSnapList().length > 0) {
      updateActiveIndex()
    }

    return () => {
      api.off("init", updateActiveIndex)
      api.off("select", updateActiveIndex)
    }
  }, [api])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{ loop: true }}
        plugins={plugins}
      >
        <CarouselContent className="ml-0 h-full">    
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 h-full">
              <div className="relative h-screen w-full bg-foreground flex items-center pt-24 md:pt-32">   
                {/* Aesthetic Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-linear-to-b from-foreground/20 via-foreground/60 to-foreground/90 z-0"
                  aria-hidden="true"
                />

                <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20">
                  <div className="max-w-3xl text-center lg:text-left text-primary-foreground">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                      {slide.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                      {slide.description}
                    </p>
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">   
                      <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans uppercase tracking-widest px-10 py-7 h-auto text-sm md:text-base font-bold transition-all duration-300 shadow-xl"  
                      >
                        {slide.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}   
              className={cn(
                "h-1 transition-all duration-500 ease-in-out cursor-pointer",
                current === index
                  ? "w-16 bg-primary-foreground"
                  : "w-8 bg-primary-foreground/30 hover:bg-primary-foreground/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  )
}
