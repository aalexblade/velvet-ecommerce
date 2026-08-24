"use client";

import React, { useMemo } from "react";
import { cn } from "@/shared/lib";
import { ProductVariant } from "../model/types";

// 1. Словник для точного збігу кольорів із БД та Tailwind v4 (@theme)
const COLOR_CLASS_MAP: Record<string, string> = {
  black: "bg-product-black",
  white: "bg-product-white border-black/20",
  beige: "bg-product-beige",
  nude: "bg-product-nude",
  pink: "bg-product-pink",
  purple: "bg-product-purple",
  lavender: "bg-product-lavender",
  green: "bg-product-green",
  emerald: "bg-product-emerald",
  mint: "bg-product-mint",
  sage: "bg-product-sage",
  orange: "bg-product-orange",
  terracotta: "bg-product-terracotta",
  red: "bg-product-red",
  ruby: "bg-product-ruby",
};

// 2. Локальна функція визначення класу кольору
const getSwatchColorClass = (colorName?: string | null): string => {
  if (!colorName) return "bg-gray-200";
  const normalized = colorName.trim().toLowerCase();
  return COLOR_CLASS_MAP[normalized] || "bg-gray-200";
};

const BASE_COLOR_PALETTE: string[] = ["White", "Beige", "Black", "Red"];

interface ProductColorSwatchesProps {
  variants?: ProductVariant[];
  selectedColor?: string;
  defaultColor?: string;
  onSelectColor: (color: string) => void;
  maxDisplay?: number;
  showAllBaseColors?: boolean;
}

export const ProductColorSwatches: React.FC<ProductColorSwatchesProps> = ({
  variants = [],
  selectedColor,
  defaultColor,
  onSelectColor,
  maxDisplay = 4,
  showAllBaseColors = false,
}) => {
  const activeColor = selectedColor || defaultColor;

  const colorItems = useMemo(() => {
    const availableColorsMap = new Map<string, boolean>();

    variants.forEach((v) => {
      if (!v.color) return;
      const isAvailable =
        v.stock === undefined || v.stock === null ? true : v.stock > 0;
      if (availableColorsMap.has(v.color)) {
        availableColorsMap.set(
          v.color,
          availableColorsMap.get(v.color) || isAvailable,
        );
      } else {
        availableColorsMap.set(v.color, isAvailable);
      }
    });

    let rawColors: string[];

    if (!showAllBaseColors) {
      rawColors = Array.from(availableColorsMap.keys());
    } else {
      rawColors = Array.from(
        new Set([
          ...BASE_COLOR_PALETTE,
          ...Array.from(availableColorsMap.keys()),
        ]),
      );
    }

    const colorsList = [...rawColors];
    if (activeColor) {
      const activeIndex = colorsList.findIndex(
        (c) => c.toLowerCase() === activeColor.toLowerCase(),
      );
      if (activeIndex > -1) {
        const [removed] = colorsList.splice(activeIndex, 1);
        colorsList.unshift(removed);
      }
    }

    return colorsList.map((color) => ({
      color,
      isAvailable: availableColorsMap.get(color) ?? false,
    }));
  }, [variants, showAllBaseColors, activeColor]);

  if (colorItems.length === 0) return null;

  const visibleColors = colorItems.slice(0, maxDisplay);
  const hiddenCount = colorItems.length - maxDisplay;

  return (
    <div className="flex items-center gap-1.5 my-1.5">
      {visibleColors.map(({ color, isAvailable }) => {
        const isSelected = activeColor?.toLowerCase() === color.toLowerCase();

        return (
          <button
            key={color}
            type="button"
            disabled={!isAvailable}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isAvailable) onSelectColor(color);
            }}
            title={isAvailable ? color : `${color} (Немає в наявності)`}
            className={cn(
              "relative w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 transition-all p-px",
              isSelected
                ? "border-zinc-900 ring-1 ring-zinc-900"
                : "border-zinc-200",
              isAvailable
                ? "cursor-pointer hover:border-zinc-400"
                : "opacity-40 cursor-not-allowed",
            )}
          >
            <span
              className={cn(
                "w-full h-full rounded-[1px] block border border-black/10 shadow-2xs",
                getSwatchColorClass(color),
              )}
            />
          </button>
        );
      })}

      {hiddenCount > 0 && (
        <span className="text-[10px] font-medium text-zinc-400 ml-0.5">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};
