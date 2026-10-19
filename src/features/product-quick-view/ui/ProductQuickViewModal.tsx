"use client";

import React from "react";
import { X } from "lucide-react";
import type { Product } from "@/entities/product";
import { ProductDetailsBlock } from "@/entities/product";

interface ProductQuickViewModalProps {
  product: Product;
  initialGroupId?: number | string;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  initialGroupId,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity cursor-pointer"
      />

      <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-zinc-100 overflow-y-auto no-scrollbar max-h-[90vh] p-6 md:p-8 z-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-zinc-100 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer transition-all z-30 bg-white"
          aria-label="Закрити вікно"
        >
          <X className="w-4 h-4" />
        </button>

        <ProductDetailsBlock
          product={product}
          initialGroupId={initialGroupId}
        />
      </div>
    </div>
  );
};
