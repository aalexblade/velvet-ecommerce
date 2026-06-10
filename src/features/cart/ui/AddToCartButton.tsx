"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../model/slice";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";

interface AddToCartButtonProps {
  variantId: string;
  className?: string;
}

/**
 * AddToCartButton
 * 
 * Interactive feature component for adding items to the cart.
 * Strictly adheres to White-Label theme tokens and FSD boundaries.
 */
export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  variantId,
  className,
}) => {
  const dispatch = useDispatch();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        variantId,
        productId: "pending", 
        title: "Product",    
        price: 0,            
        quantity: 1,
        image: "",           
      })
    );
  };

  return (
    <Button
      onClick={handleAdd}
      className={cn(
        "w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-11 text-sm font-medium transition-all active:scale-[0.98]",
        className
      )}
    >
      Додати у кошик
    </Button>
  );
};
