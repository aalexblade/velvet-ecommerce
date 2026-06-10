"use client";

import React from "react";
import Image from "next/image";
import { SizeCalculatorForm } from "@/features/product-size-calculator";

/**
 * SizeCalculator Widget
 *
 * Implements strict responsive ordering:
 * Mobile/Tablet (<lg): Header (1) -> Image (2) -> Form (3) in a single column.
 * Desktop (>=lg): Balanced two-column grid.
 */
export const SizeCalculator: React.FC = () => {      
  const modelImageUrl =
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200";

  return (
    <section className="w-full bg-background py-12 md:py-20 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
        {/* 1. Header Text Group: Always top on mobile (order-1), Top-Right on Desktop */}
        <div className="order-1 lg:col-start-2 lg:row-start-1 flex flex-col items-start text-left w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Обери свій ідеальний розмір
          </h2>
          <p className="text-base text-muted-foreground mb-4 leading-relaxed">
            Введіть свої мірки, щоб дізнатися свій точний розмір.
          </p>
          <a
            href="#instruction"
            className="text-primary font-semibold underline underline-offset-4 text-base mb-8 inline-block hover:opacity-80 transition-opacity"
          >
            Інструкція
          </a>
        </div>

        {/* 2. Image Container: Middle on mobile (order-2), Full Left Column on Desktop */}
        <div className="order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2 w-full max-w-2xl mx-auto lg:max-w-none">
          <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden bg-muted border border-border">
            {modelImageUrl ? (
              <Image
                src={modelImageUrl}
                alt="Моделі для підбору розміру"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-muted to-background text-neutral-400 uppercase tracking-widest text-xs font-bold">
                Model Asset Placeholder
              </div>
            )}
            <div className="absolute inset-0 bg-foreground/5 pointer-events-none" />
          </div>
        </div>

        {/* 3. Form Feature: Bottom on mobile (order-3), Bottom-Right on Desktop */}
        <div className="order-3 lg:col-start-2 lg:row-start-2 w-full">
          <SizeCalculatorForm />
        </div>
      </div>
    </section>
  );
};
