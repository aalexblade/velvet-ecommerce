import React, { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

interface ProductCardProps {
  title: ReactNode;
  price: string;
  image: any;
  className?: string;
}

export const ProductCard = ({ title, price, image, className }: ProductCardProps) => {
  return (
    <div className={cn(
      "flex flex-col bg-white rounded overflow-hidden shadow-sm border border-neutral-100/50 w-full",
      className
    )}>
      <div className="relative w-full h-[229.5px]">
        <Image
          src={image}
          alt={typeof title === 'string' ? title : 'Product image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col w-full items-start gap-2.5 p-5 relative flex-1">
        <div className="text-neutral-900 font-medium text-lg leading-tight">
          {title}
        </div>
        <div className="text-neutral-500 font-normal text-base mt-auto">
          {price}
        </div>
      </div>
    </div>
  );
};
