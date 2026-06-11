"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { Button } from "@/shared/ui";

export const PromoLook = () => {
  return (
    <section className="w-full bg-background overflow-hidden selection:bg-primary/10">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Editorial Content & Interactive Carousel Section */}
        <div className="flex flex-col gap-10 md:gap-14 w-full max-w-2xl mx-auto lg:mx-0 order-2 lg:order-1">
          
          {/* Header Typography Group */}
          <div className="flex flex-col gap-6 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
            <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.1]">
              Одягайся з любов’ю <br className="hidden md:block" /> до себе
            </h2>
            <p className="font-sans text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 opacity-80">
              М’яка білизна, затишний одяг і натхнення для твого щоденного комфорту. Кожна деталь створена з турботою про тебе.
            </p>
          </div>

          {/* Interactive Transparent Carousel Display */}
          <div className="relative group w-full px-4 md:px-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <Carousel 
              className="w-full" 
              opts={{ 
                loop: true,
                align: "start"
              }}
            >
              <CarouselContent className="-ml-4">
                {[1, 2, 3].map((item) => (
                  <CarouselItem key={item} className="pl-4 basis-full sm:basis-1/2 lg:basis-full">
                    <div className="relative w-full aspect-square flex items-center justify-center bg-muted rounded-3xl transition-all duration-500 hover:bg-muted/80 group/item overflow-hidden border border-border">
                      {/* Product Placeholder Image */}
                      <Image
                        src="/next.svg"
                        alt={`Lingerie Set ${item}`}
                        fill
                        priority
                        className="object-contain opacity-20 p-16 transition-transform duration-700 group-hover/item:scale-110"
                      />
                      
                      {/* Variant Info Label */}
                      <div className="absolute inset-0 flex items-end justify-center pb-10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                        <span className="text-foreground/40 font-bold uppercase tracking-widest text-[10px] md:text-xs bg-background/40 backdrop-blur-sm px-4 py-1 rounded-full border border-border">
                          Lingerie Set {item}
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigation Arrows */}
              <div className="hidden md:flex">
                <CarouselPrevious 
                  className="-left-6 lg:-left-12 border-border bg-background/80 backdrop-blur-md text-primary shadow-xl hover:bg-primary hover:text-primary-foreground transition-all scale-125 opacity-0 group-hover:opacity-100 disabled:opacity-0" 
                />
                <CarouselNext 
                  className="-right-6 lg:-right-12 border-border bg-background/80 backdrop-blur-md text-primary shadow-xl hover:bg-primary hover:text-primary-foreground transition-all scale-125 opacity-0 group-hover:opacity-100 disabled:opacity-0" 
                />
              </div>
            </Carousel>
          </div>

          {/* CTA Primary Action */}
          <div className="flex justify-center lg:justify-start animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <Button 
              className="bg-primary text-primary-foreground font-bold rounded-2xl px-14 py-8 w-full sm:w-fit tracking-widest transition-all active:scale-[0.98] hover:shadow-2xl h-auto text-lg hover:-translate-y-1"
            >
              Обрати комфорт
            </Button>
          </div>
        </div>

        {/* Right Column: Hero Lookbook Visual */}
        <div className="relative w-full aspect-4/5 rounded-[2.5rem] overflow-hidden shadow-2xl group order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000 ease-out">
          {/* Editorial Asset Placeholder Container */}
          <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center gap-6 text-muted-foreground transition-transform duration-1000 group-hover:scale-105">
            <div className="w-16 h-px bg-border" />
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold uppercase tracking-widest pl-4 text-foreground">Editorial</span>
              <span className="text-xs tracking-widest uppercase opacity-60">Model Lookbook 2026</span>
            </div>
            <div className="w-16 h-px bg-border" />
          </div>
          
          {/* Gradient Gloss Overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-foreground/5 via-transparent to-background/10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
          <div className="absolute inset-0 ring-1 ring-inset ring-border/5 rounded-[2.5rem] pointer-events-none" />
        </div>

      </div>
    </section>
  );
};
