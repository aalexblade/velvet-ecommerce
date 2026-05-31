"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"

const slides = [
  {
    title: "Бути собою — твій головний тренд",
    description: "Обирай одяг, який підкреслює твою унікальність. Без правил. Без компромісів.",
    cta: "Дивитися колекцію",
  },
  {
    title: "Бути собою — твій головний тренд",
    description: "Обирай одяг, який підкреслює твою унікальність. Без правил. Без компромісів.",
    cta: "Дивитися колекцію",
  },
  {
    title: "Бути собою — твій головний тренд",
    description: "Обирай одяг, який підкреслює твою унікальність. Без правил. Без компромісів.",
    cta: "Дивитися колекцію",
  },
]

export const HeroSlider = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative h-[calc(100vh-5rem)] min-h-[600px] w-full bg-stone-800 flex items-center">
                {/* Aesthetic Radial Gradient Overlay */}
                <div 
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-800/20 via-stone-900/60 to-stone-950/90 z-0" 
                  aria-hidden="true"
                />
                
                <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20">
                  <div className="max-w-3xl text-center lg:text-left text-white">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                      {slide.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-stone-200 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                      {slide.description}
                    </p>
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                      <Button 
                        className="bg-accent hover:bg-accent/90 text-white font-sans uppercase tracking-wider px-10 py-7 h-auto text-sm md:text-base font-bold transition-all duration-300 shadow-xl"
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
        
        {/* Horizontal Line Indicators (Dots) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-[3px] transition-all duration-500 ease-in-out",
                current === index 
                  ? "w-16 bg-white" 
                  : "w-8 bg-white/30 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  )
}
