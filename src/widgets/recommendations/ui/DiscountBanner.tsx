"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

/**
 * Premium Glassmorphic Ribbon Badge
 * Features the brand fill token #F9BBD2 and specific backdrop-blur.
 */
const RibbonBadge = ({ className }: { className?: string }) => (
  <div className={cn("absolute top-0 left-6 md:left-12 z-20 select-none", className)}>
    <div className="relative group">
      <svg
        width="84"
        height="100"
        viewBox="0 0 84 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
      >
        <path
          d="M0 0H84V80L42 100L0 80V0Z"
          fill="currentColor"
          className="text-accent/20"
        />
        <path
          d="M0 0H84V80L42 100L0 80V0Z"
          className="stroke-primary-foreground/20"
          strokeWidth="1"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pb-4 backdrop-blur-md rounded-t-sm">
        <span className="text-accent font-bold text-2xl md:text-3xl tracking-tighter">
          -10%
        </span>
        <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">
          Клуб
        </span>
      </div>
    </div>
  </div>
);

/**
 * DiscountBanner Widget
 * Fully responsive across Mobile, Tablet, and Desktop using strict Tailwind v4 standards.
 */
export const DiscountBanner = () => {
  return (
    <section className="w-full px-4 py-8 md:py-16 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Стандартні класи Tailwind v4 (min-h-112 = 448px, md:min-h-128 = 512px) */}
        <div className="relative w-full min-h-112 md:min-h-128 rounded-3xl overflow-hidden bg-secondary/30 group border border-border/40">
          
          {/* Floating Glassmorphic Ribbon */}
          <RibbonBadge className="animate-in slide-in-from-top-full duration-1000 ease-out" />

          {/* Responsive Grid System */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-112 md:min-h-128 w-full">
            
            {/* Visual Column: Lifestyle/Editorial Asset */}
            <div className="relative w-full h-64 sm:h-80 lg:h-full overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-102">
                {/* Градієнт за стандартом Tailwind v4 (bg-linear-to-br) */}
                <div className="w-full h-full bg-linear-to-br from-muted via-secondary/40 to-accent/10 flex items-center justify-center">
                  <div className="relative w-2/3 aspect-square opacity-20 filter grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image 
                      src="/file.svg" 
                      alt="Discount visual" 
                      fill
                      className="object-contain p-12"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-linear-to-l from-primary-foreground/10 to-transparent pointer-events-none" />
            </div>

            {/* Content Column: Message & Call to Action */}
            <div className="relative z-10 flex flex-col justify-center p-6 md:p-12 lg:p-16 order-2 lg:order-1 bg-background/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
              <div className="flex flex-col gap-5 md:gap-6 max-w-xl">
                
                <div className="space-y-3 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                  <h3 className="text-accent font-bold uppercase tracking-widest text-xs md:text-sm">
                    Клуб привілеїв
                  </h3>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
                    Твій простір ніжності <br /> вже чекає
                  </h2>
                </div>
                
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                  Створи акаунт і отримай -10% на першу покупку, а також приємні бонуси, подарунки та натхнення в кожному листі.
                </p>

                {/* Біла витончена кнопка з малиновою рамкою згідно з концептом бренду */}
                <div className="pt-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                  <Button 
                    className="bg-background border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-xl px-8 py-3.5 h-auto text-sm md:text-base font-semibold transition-all duration-300 cursor-pointer shadow-sm active:scale-98"
                  >
                    Отримати подарунок
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* Background Decorative Elements */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
