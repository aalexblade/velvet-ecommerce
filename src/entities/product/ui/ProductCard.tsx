'use client'; // Додаємо директиву клієнта, оскільки використовуємо useState

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '@/shared/lib';
import { Product } from '../model/types';

interface ProductCardProps {
  product: Product;
  className?: string;
  action?: React.ReactNode;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className, 
  action 
}) => {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    return product?.images?.find(img => img.is_main)?.url || "/file.svg";
  });

  if (!product) {
    return <div className={cn("w-full aspect-3/4 bg-muted animate-pulse rounded-sm", className)} />;
  }

  const baseVariant = product.variants?.[0];
  const displayPrice = baseVariant?.price || 0;
  const oldPrice = baseVariant?.old_price;

  return (
    <div 
      className={cn(
        "flex flex-col bg-card text-card-foreground rounded-sm overflow-hidden border border-border/40 w-full group transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="relative w-full aspect-3/4 bg-muted overflow-hidden">
        <Link 
          href={`/product/${product.slug}`} 
          className="absolute inset-0 block z-10"
          aria-label={product.title}
        >
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-102"
            priority={false}
            onError={() => {
              // Якщо upstream-сервер (Unsplash/Supabase) повернув 404, м'яко перемикаємо на дефолтну заглушку
              setImgSrc("/file.svg");
            }}
          />
        </Link>
      </div>

      <div className="flex flex-col w-full items-start gap-2.5 p-5 relative flex-1">
        <Link 
          href={`/product/${product.slug}`} 
          className="block w-full group-hover:underline z-20"
        >
          <h3 className="text-foreground font-medium text-lg leading-tight tracking-tight line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mt-auto w-full">
          <span className="text-foreground font-semibold text-base">
            {displayPrice} ₴
          </span>
          {oldPrice && oldPrice > displayPrice && (
            <span className="text-xs md:text-sm text-muted-foreground line-through decoration-muted-foreground/60">
              {oldPrice} ₴
            </span>
          )}
        </div>

        {action && (
          <div className="relative z-30 w-full mt-2">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};