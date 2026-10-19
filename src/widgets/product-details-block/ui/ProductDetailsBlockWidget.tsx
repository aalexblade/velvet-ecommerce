"use client";

import * as React from "react";
import {
  ProductDetailsBlock,
  type ProductAddToCartPayload,
} from "@/entities/product/ui/ProductDetailsBlock";
import { Product } from "@/entities/product/model/types";
import { useCartStore } from "@/features/cart/model/cartStore";
import { SizeCalculatorForm } from "@/features/product-size-calculator/ui/SizeCalculatorForm";

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