"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { Loader2 } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib"
import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient"

interface HeroSlide {
  id: number
  title: string
  description: string
  button_text: string
  link: string
  image_url: string
  mobile_image_url?: string
  display_order: number
}

// Створюємо екземпляр клієнта поза компонентом
const supabase = createSupabaseBrowserClient()

export const HeroSlider = () => {
  const [slides, setSlides] = React.useState<HeroSlide[]>([])
  const [loading, setLoading] = React.useState(true)
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("hero_slides")
          .select("*")
          .order("display_order", { ascending: true })

        if (error) {
          console.error("Помилка завантаження слайдів Supabase:", error.message)
        } else if (data) {
          setSlides(data)
        }
      } catch (err) {
        console.error("Помилка при отриманні даних:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  const plugins = React.useMemo(
    () => [Autoplay({ delay: 5000, stopOnInteraction: false })],
    []
  )

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

  if (loading) {
    return (
      <section className="w-full h-screen bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </section>
    )
  }

  if (slides.length === 0) return null

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] md:h-screen overflow-hidden bg-primary font-sans">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{ loop: true }}
        plugins={plugins}
      >
        <CarouselContent className="ml-0 h-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 h-full relative">
              <div className="relative h-full w-full flex items-center justify-center sm:justify-start">
                
                {/* 1. Десктопна та планшетна картинка (від sm: / 640px) */}
                <div className="absolute inset-0 hidden sm:block">
                  <Image
                    src={slide.image_url}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>

                {/* 2. Вертикальна мобільна картинка (< 640px) */}
                <div className="absolute inset-0 block sm:hidden">
                  <Image
                    src={slide.mobile_image_url || slide.image_url}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>

                {/* 3. Оновлений Tailwind v4 градієнт */}
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/30 sm:bg-linear-to-r sm:from-black/75 sm:via-black/35 sm:to-transparent z-10"
                  aria-hidden="true"
                />

                {/* 4. Контент слайда */}
                <div className="container relative z-20 mx-auto px-6 sm:px-12 lg:px-20 pt-16 sm:pt-20">
                  <div className="max-w-xl text-center sm:text-left text-primary-foreground space-y-4 sm:space-y-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 font-medium leading-relaxed max-w-md mx-auto sm:mx-0">
                      {slide.description}
                    </p>
                    <div className="pt-2 sm:pt-4">
                      <Button
                        asChild
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium tracking-wide px-8 py-6 rounded-md text-sm md:text-base transition-all duration-300 shadow-xl cursor-pointer"
                      >
                        <Link href={slide.link || "/catalog"}>
                          {slide.button_text || "Дивитися колекцію"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Навігаційні смужки */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-1 rounded-full transition-all duration-500 ease-in-out cursor-pointer",
                current === index
                  ? "w-10 sm:w-14 bg-primary-foreground"
                  : "w-4 sm:w-6 bg-primary-foreground/30 hover:bg-primary-foreground/60"
              )}
              aria-label={`Перейти до слайду ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  )
}