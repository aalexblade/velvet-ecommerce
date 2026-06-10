"use client";

import React from "react";
import { useAppDispatch } from "@/app/store/store";
import { addToCart } from "@/features/cart";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  variantId: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  className?: string;
}

/**
 * AddToCartButton
 * 
 * Interactive feature component for adding items to the cart.
 * Adheres to luxury White-Label styling and strict FSD boundaries.
 */
export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  variantId,
  productId,
  title,
  price,
  image,
  className,
}) => {
  const dispatch = useAppDispatch();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        variantId,
        productId,
        title,
        price,
        quantity: 1,
        image,
      })
    );
  };

  return (
    <Button
      onClick={handleAdd}
      className={cn(
        "bg-accent hover:bg-accent/90 text-accent-foreground h-11 rounded-xl text-xs uppercase font-bold tracking-widest transition-all active:scale-95 w-full gap-2",
        className
      )}
    >
      <ShoppingCart size={16} />
      Додати у кошик
    </Button>
  );
};
