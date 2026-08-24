"use client";

import React, { useMemo } from "react";
import { cn } from "@/shared/lib";
import { ProductVariant } from "../model/types";

// 1. Базова палітра Tailwind-класів
const BASE_COLOR_CLASSES: Record<string, string> = {
  black: "bg-product-black",
  white: "bg-product-white border-black/20",
  beige: "bg-product-beige",
  red: "bg-product-red",
  blue: "bg-product-azure-blue",
  green: "bg-product-green",
  purple: "bg-product-purple",
  orange: "bg-product-orange",
  pink: "bg-product-pink",
};

// Нормалізація назви кольору до канонічного ключа
const getCanonicalColorKey = (colorName?: string | null): string => {
  if (!colorName) return "";
  const val = colorName.trim().toLowerCase();

  if (val.includes("black") || val.includes("чорн")) return "black";
  if (val.includes("white") || val.includes("біл") || val.includes("молоч")) return "white";
  if (
    val.includes("beige") ||
    val.includes("nude") ||
    val.includes("беж") ||
    val.includes("нюд") ||
    val.includes("тілес")
  ) return "beige";
  if (
    val.includes("red") ||
    val.includes("ruby") ||
    val.includes("червон") ||
    val.includes("бордо") ||
    val.includes("марсал")
  ) return "red";
  if (
    val.includes("blue") ||
    val.includes("син") ||
    val.includes("блакит") ||
    val.includes("волошк")
  ) return "blue";
  if (
    val.includes("green") ||
    val.includes("emerald") ||
    val.includes("mint") ||
    val.includes("sage") ||
    val.includes("зелен") ||
    val.includes("смарагд") ||
    val.includes("м'ят") ||
    val.includes("фісташ") ||
    val.includes("шавл")
  ) return "green";
  if (
    val.includes("purple") ||
    val.includes("lavender") ||
    val.includes("фіолет") ||
    val.includes("лаванд") ||
    val.includes("бузк")
  ) return "purple";
  if (
    val.includes("orange") ||
    val.includes("terracotta") ||
    val.includes("помаранч") ||
    val.includes("теракот")
  ) return "orange";
  if (val.includes("pink") || val.includes("рожев")) return "pink";

  return val;
};

// 2. Функція зведення назв до Tailwind-класу
const getSwatchColorClass = (colorName?: string | null): string => {
  const key = getCanonicalColorKey(colorName);
  return BASE_COLOR_CLASSES[key] || "bg-zinc-200 border-zinc-300";
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
  const activeCanonicalGroup = getCanonicalColorKey(activeColor);

  const colorItems = useMemo(() => {
    const availableColorsMap = new Map<string, boolean>();

    variants.forEach((v) => {
      if (!v.color) return;
      const isAvailable =
        v.stock === undefined || v.stock === null ? true : v.stock > 0;

      if (availableColorsMap.has(v.color)) {
        availableColorsMap.set(
          v.color,
          availableColorsMap.get(v.color) || isAvailable
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
        ])
      );
    }

    const colorsList = [...rawColors];

    // Підтягуємо активний колір на перше місце за канонічною групою
    if (activeCanonicalGroup) {
      const activeIndex = colorsList.findIndex(
        (c) => getCanonicalColorKey(c) === activeCanonicalGroup
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
  }, [variants, showAllBaseColors, activeCanonicalGroup]);

  if (colorItems.length === 0) return null;

  const visibleColors = colorItems.slice(0, maxDisplay);
  const hiddenCount = colorItems.length - maxDisplay;

  return (
    <div className="flex items-center gap-1.5 my-1.5">
      {visibleColors.map(({ color, isAvailable }) => {
        const isSelected =
          getCanonicalColorKey(activeColor) === getCanonicalColorKey(color);

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
                : "opacity-40 cursor-not-allowed"
            )}
          >
            <span
              className={cn(
                "w-full h-full rounded-[1px] block border border-black/10 shadow-2xs",
                getSwatchColorClass(color)
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