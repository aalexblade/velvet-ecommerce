"use client";

import React, { useMemo } from "react";
import { cn } from "@/shared/lib";
import { ProductColorGroup } from "../model/types";

interface ProductColorSwatchesProps {
  colorGroups?: ProductColorGroup[];
  selectedGroupId?: number | string;
  onSelectGroup: (groupId: number) => void;
  maxDisplay?: number;
}

export const ProductColorSwatches: React.FC<ProductColorSwatchesProps> = ({
  colorGroups = [],
  selectedGroupId,
  onSelectGroup,
  maxDisplay = 4,
}) => {
  // 1. Process color groups to calculate availability and hex values directly from database
  const colorItems = useMemo(() => {
    return colorGroups.map((group) => {
      const variants = group.product_variants || [];

      // Group is available if at least one variant has stock > 0 (or no stock limit defined)
      const isAvailable =
        variants.length === 0 ||
        variants.some(
          (v) => v.stock === undefined || v.stock === null || v.stock > 0,
        );

      return {
        id: group.id,
        name: group.colors?.name_uk || group.color_slug,
        hex: group.colors?.hex || "#CCCCCC",
        tailwindClass: group.colors?.tailwind_class,
        isAvailable,
      };
    });
  }, [colorGroups]);

  if (colorItems.length === 0) return null;

  const visibleColors = colorItems.slice(0, maxDisplay);
  const hiddenCount = colorItems.length - maxDisplay;

  return (
    <div className="flex items-center gap-1.5 my-1.5">
      {visibleColors.map(({ id, name, hex, tailwindClass, isAvailable }) => {
        const isSelected = selectedGroupId === id;

        return (
          <button
            key={id}
            type="button"
            disabled={!isAvailable}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isAvailable) onSelectGroup(id);
            }}
            title={isAvailable ? name : `${name} (Немає в наявності)`}
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
                tailwindClass,
              )}
              style={!tailwindClass ? { backgroundColor: hex } : undefined}
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
