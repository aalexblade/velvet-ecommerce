"use client";

import React, { useMemo } from "react";
import { cn } from "@/shared/lib";
import { ProductColorGroup } from "../model/types";

interface ProductColorSwatchesProps {
  colorGroups?: ProductColorGroup[];
  maxDisplay?: number;
  className?: string;
}

export const ProductColorSwatches: React.FC<ProductColorSwatchesProps> = ({
  colorGroups = [],
  maxDisplay = 4,
  className,
}) => {
  const colorItems = useMemo(() => {
    return colorGroups.map((group) => ({
      id: group.id,
      name: group.colors?.name_uk || group.color_slug,
      hex: group.colors?.hex || "#E5E7EB",
    }));
  }, [colorGroups]);

  if (colorItems.length === 0) return null;

  const visibleColors = colorItems.slice(0, maxDisplay);
  const hiddenCount = colorItems.length - maxDisplay;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 my-1.5 pointer-events-none select-none",
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {visibleColors.map(({ id, name, hex }) => (
        <div
          key={id}
          title={name}
          className="w-3.5 h-3.5 rounded-xs border border-zinc-300 flex items-center justify-center shrink-0 p-px bg-white shadow-2xs"
        >
          <span
            className="w-full h-full rounded-[1px] block border border-black/10"
            style={{ backgroundColor: hex }}
          />
        </div>
      ))}

      {hiddenCount > 0 && (
        <span className="text-[10px] font-medium text-zinc-400 ml-0.5">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};
