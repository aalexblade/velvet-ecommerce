"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  ProductDetailsBlock,
  type Product,
  type ProductAddToCartPayload,
} from "@/entities/product";

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (payload: ProductAddToCartPayload) => void;
  initialGroupId?: number | string;
  sizeCalculatorSlot?: React.ComponentProps<
    typeof ProductDetailsBlock
  >["sizeCalculatorSlot"];
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  initialGroupId,
  sizeCalculatorSlot,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white w-full max-w-4xl rounded-2xl p-6 md:p-8 shadow-2xl border border-zinc-100 z-10 max-h-[90vh] overflow-y-auto no-scrollbar">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрити"
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <ProductDetailsBlock
          product={product}
          initialGroupId={initialGroupId}
          onAddToCart={onAddToCart}
          sizeCalculatorSlot={sizeCalculatorSlot}
        />
      </div>
    </div>
  );
};
