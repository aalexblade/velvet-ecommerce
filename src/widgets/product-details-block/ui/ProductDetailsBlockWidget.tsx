"use client";

import * as React from "react";
import { ProductDetailsBlock, type Product } from "@/entities/product";
import type { ProductAddToCartPayload } from "@/entities/product/ui/ProductDetailsBlock";
import { useCartStore } from "@/features/cart";
import { SizeCalculatorForm } from "@/features/product-size-calculator";

interface ProductDetailsBlockWidgetProps {
  product: Product;
  initialGroupId?: number | string;
}

export const ProductDetailsBlockWidget: React.FC<
  ProductDetailsBlockWidgetProps
> = ({ product, initialGroupId }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (payload: ProductAddToCartPayload) => {
    addToCart(payload);
  };

  return (
    <ProductDetailsBlock
      product={product}
      initialGroupId={initialGroupId}
      onAddToCart={handleAddToCart}
      sizeCalculatorSlot={({ availableSizes, onSelectSize, onCloseModal }) => (
        <SizeCalculatorForm
          onSizeCalculated={(calculatedSize) => {
            if (availableSizes.includes(calculatedSize)) {
              onSelectSize(calculatedSize);
            }
          }}
          onApplyFilter={(size) => {
            if (availableSizes.includes(size)) {
              onSelectSize(size);
            }
            onCloseModal();
          }}
        />
      )}
    />
  );
};
