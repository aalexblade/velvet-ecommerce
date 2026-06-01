"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel"
import { Button } from "@/shared/ui/button"

/**
 * PromoLook Widget
 * 
 * A premium promotional section featuring an editorial image and a transparent product carousel.
 * Optimized for white background layouts with zero dark filters.
 */
export const PromoLook = () => {
  return (
    <section className="w-full bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-12">
        
        {/* Left Column: Content & Transparent Carousel */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-8 max-w-100 mx-auto lg:mx-0">
          
          {/* Header & Subheader */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
              Look of the Week
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm">
              Надихайтеся нашими найкращими образами сезону. Повний комплект для вашого ідеального виходу.
            </p>
          </div>

          {/* Interactive Carousel (Completely Transparent) */}
          <div className="w-full aspect-square relative flex items-center justify-center">
            <Carousel className="w-full max-w-70">
              <CarouselContent>
                {[1, 2, 3].map((item) => (
                  <CarouselItem key={item} className="flex items-center justify-center">
                    <div className="relative w-full aspect-square">
                      <Image
                        src="/next.svg"
                        alt={`Product item ${item}`}
                        fill
                        className="object-contain opacity-20"
                      />
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-neutral-300 uppercase tracking-widest text-xs">
                        Product Item {item}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Minimal Round Pink Navigation Arrows */}
              <CarouselPrevious 
                className="static lg:absolute -left-4 translate-x-0 border-none bg-transparent hover:bg-transparent text-[#c31f5c] scale-125" 
                variant="ghost"
              />
              <CarouselNext 
                className="static lg:absolute -right-4 translate-x-0 border-none bg-transparent hover:bg-transparent text-[#c31f5c] scale-125" 
                variant="ghost"
              />
            </Carousel>
          </div>

          {/* Action Button: "Обрати комфорт" */}
          <div className="flex w-full justify-center lg:justify-start">
            <Button 
              className="bg-[#c31f5c] text-white font-medium rounded-lg px-8 py-3.5 h-auto w-fit tracking-wide hover:bg-[#a1194b] transition-colors"
            >
              Обрати комфорт
            </Button>
          </div>

        </div>

        {/* Right Column: Editorial Image (Desktop Only) */}
        <div className="hidden lg:block relative w-full h-full min-h-150 bg-stone-100 rounded-lg overflow-hidden shadow-sm">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Placeholder for editorial image */}
            <div className="w-full h-full bg-linear-to-br from-stone-200 to-stone-50 flex items-center justify-center text-stone-400 font-sans uppercase tracking-[0.3em] text-xl">
              Editorial Asset
            </div>
            {/* 
            <Image 
              src="/editorial-model.jpg" 
              alt="Editorial Model" 
              fill 
              className="object-cover"
              priority
            /> 
            */}
          </div>
        </div>

      </div>
    </section>
  )
}
