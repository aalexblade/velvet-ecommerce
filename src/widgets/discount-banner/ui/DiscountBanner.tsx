"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

/**
 * Premium Glassmorphic Ribbon Badge
 * Features the brand fill token #F9BBD2 and specific backdrop-blur.
 * Positioned to float at the top-left of its container.
 */
const RibbonBadge = ({ className }: { className?: string }) => (
  <div className={cn("absolute top-0 left-6 md:left-12 z-20 select-none", className)}>
    <div className="relative group">
      {/* Ribbon SVG Shape */}
      <svg
        width="84"
        height="100"
        viewBox="0 0 84 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
      >
        <path
          d="M0 0H84V80L42 100L0 80V0Z"
          fill="#F9BBD2"
          fillOpacity="0.2"
        />
        <path
          d="M0 0H84V80L42 100L0 80V0Z"
          className="stroke-white/20"
          strokeWidth="1"
        />
      </svg>
      
      {/* Badge Text Content with Backdrop Blur */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pb-4 backdrop-blur-md rounded-t-sm">
        <span className="text-accent font-bold text-2xl md:text-3xl tracking-tighter">
          -10%
        </span>
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/40">
          Off
        </span>
      </div>
    </div>
  </div>
);

/**
 * DiscountBanner Widget
 * 
 * A high-conversion interactive marketing banner designed for the home page.
 * Features a split responsive layout, glassmorphic accents, and refined typography.
 * Adheres to Next.js 15, Tailwind v4, and FSD architecture.
 */
export const DiscountBanner = () => {
  return (
    <section className="w-full px-4 py-8 md:py-16 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="relative w-full min-h-400px md:min-h-450px rounded-2rem md:rounded-[3rem] overflow-hidden bg-stone-100 group">
          
          {/* Floating Glassmorphic Ribbon */}
          <RibbonBadge className="animate-in slide-in-from-top-full duration-1000 ease-out" />

          <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 h-full">
            
            {/* Left Content Column: Message & Call to Action */}
            <div className="relative z-10 flex flex-col justify-center p-8 md:p-16 lg:p-24 order-2 lg:order-1">
              <div className="flex flex-col gap-6 md:gap-8 max-w-lg">
                <div className="space-y-4 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                  <h3 className="text-accent font-bold uppercase tracking-[0.3em] text-sm md:text-base">
                    Спеціальна пропозиція
                  </h3>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                    Твій секретний <br /> дисконт
                  </h2>
                </div>
                
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-sm animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                  Отримай гарантовану знижку на перше замовлення при реєстрації в нашому клубі привілеїв.
                </p>

                <div className="pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                  <Button 
                    className="bg-primary text-white hover:bg-primary/90 rounded-2xl px-10 py-7 h-auto text-base md:text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                  >
                    Отримати знижку
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Visual Column: Lifestyle/Editorial Asset */}
            <div className="relative h-full min-h-300px lg:min-h-full overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                {/* Background Pattern / Placeholder */}
                <div className="w-full h-full bg-linear-to-br from-stone-200 via-stone-100 to-[#F9BBD2]/10 flex items-center justify-center">
                   <div className="relative w-2/3 aspect-square opacity-20 filter grayscale group-hover:grayscale-0 transition-all duration-700">
                      <Image 
                        src="/next.svg" 
                        alt="Discount visual" 
                        fill
                        className="object-contain p-12"
                      />
                   </div>
                </div>
              </div>

              {/* Glossy Overlay for Premium Depth */}
              <div className="absolute inset-0 bg-linear-to-l from-white/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none" />
            </div>

          </div>

          {/* Background Decorative Elements */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
