"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "../model/cartStore";
import { Button } from "@/shared/ui";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface AddToCartButtonProps {
  variantId: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  className?: string;
}

export function AddToCartButton({ 
  variantId, 
  productId,
  title,
  price,
  image,
  color,
  size,
  className = "" 
}: AddToCartButtonProps) {
  const [isMounted, setIsMounted] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isMounted) return;
    
    addToCart({ 
      variantId, 
      productId, 
      title, 
      price, 
      image, 
      color, 
      size, 
      quantity: 1 
    });
  };

  return (
    <Button
      type="button"
      onClick={handleAddToCart}
      className={cn(
        "w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-11 text-sm font-medium transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2",
        className
      )}
    >
      <ShoppingBag size={14} />
      До кошика
    </Button>
  );
}