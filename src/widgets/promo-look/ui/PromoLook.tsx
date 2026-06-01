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
 * A polished, pixel-perfect promotional section featuring an editorial lookbook image
 * and a transparent interactive product carousel. Matches premium e-commerce design specs.
 */
export const PromoLook = () => {
  return (
    <section className="w-full bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Content & Offset Transparent Carousel */}
        <div className="flex flex-col w-full h-full justify-center items-center lg:items-start text-center lg:text-left gap-8 max-w-100 mx-auto lg:mx-0">
          
          {/* Header & Subheader Section */}
          <div className="flex flex-col gap-4 w-full">
            <h2 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl text-[#121212] tracking-tight leading-tight">
              Одягайся з любов’ю до себе
            </h2>
            <p className="font-sans text-neutral-600 text-sm md:text-base max-w-sm lg:max-w-none leading-relaxed">
              М’яка білизна, затишний одяг і натхнення для твого щоденного комфорту.
            </p>
          </div>

          {/* Interactive Product Carousel (100% Transparent) */}
          <div className="w-full relative px-8 md:px-12">
            <Carousel className="w-full">
              <CarouselContent>
                {[1, 2, 3].map((item) => (
                  <CarouselItem key={item} className="flex items-center justify-center">
                    <div className="w-full aspect-square relative flex items-center justify-center">
                      <Image
                        src="/next.svg"
                        alt={`Product variant ${item}`}
                        fill
                        className="object-contain opacity-20 p-8"
                      />
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-neutral-300 uppercase tracking-[0.2em] text-[10px] md:text-xs">
                        Lingerie Set {item}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Custom Offset Navigation Arrows (Do not block the image area) */}
              <CarouselPrevious 
                className="-left-4 md:-left-6 border-none bg-transparent hover:bg-transparent text-[#c31f5c] scale-125 md:scale-150 transition-transform hover:scale-140 md:hover:scale-160" 
                variant="ghost"
              />
              <CarouselNext 
                className="-right-4 md:-right-6 border-none bg-transparent hover:bg-transparent text-[#c31f5c] scale-125 md:scale-150 transition-transform hover:scale-140 md:hover:scale-160" 
                variant="ghost"
              />
            </Carousel>
          </div>

          {/* Action Button: "Обрати комфорт" */}
          <div className="w-full flex justify-center lg:justify-start mt-4">
            <Button 
              className="bg-[#c31f5c] text-white font-medium rounded-lg px-8 py-3.5 w-full sm:w-fit tracking-wide transition-all active:scale-95 hover:bg-[#b01a52] h-auto"
            >
              Обрати комфорт
            </Button>
          </div>

        </div>

        {/* Right Column: Lookbook Editorial Asset (Desktop Only) */}
        <div className="relative w-full aspect-[4/5] lg:h-full min-h-150 rounded-xl overflow-hidden hidden lg:block shadow-sm">
          <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
            {/* Editorial Placeholder */}
            <div className="w-full h-full bg-linear-to-br from-stone-200 to-stone-50 flex flex-col items-center justify-center gap-4 text-stone-400 font-sans uppercase tracking-[0.3em]">
              <div className="text-xl">Editorial</div>
              <div className="text-sm">Model Asset</div>
            </div>
            
            {/* Final Editorial Image Implementation:
            <Image 
              src="/editorial-lookbook.jpg" 
              alt="Editorial Model" 
              fill 
              className="object-cover object-top"
              priority
            /> 
            */}
          </div>
          
          {/* Subtle editorial gloss overlay */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>

      </div>
    </section>
  )
}
