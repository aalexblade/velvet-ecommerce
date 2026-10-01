"use client";

import React, { useMemo } from "react";
import { cn } from "@/shared/lib";
import { ProductColorGroup } from "@/entities/product";

interface ProductColorSwatchesProps {
  colorGroups?: ProductColorGroup[];
  activeGroupId?: number | string | null;
  onSelectGroup?: (id: number | string) => void;
  maxDisplay?: number;
  className?: string;
}

export const ProductColorSwatches: React.FC<ProductColorSwatchesProps> = ({
  colorGroups = [],
  activeGroupId,
  onSelectGroup,
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
      className={cn("flex items-center gap-1.5 my-1.5 select-none", className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {visibleColors.map(({ id, name, hex }) => {
        const isActive = String(id) === String(activeGroupId);

        return (
          <button
            key={id}
            type="button"
            title={name}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelectGroup?.(id);
            }}
            className={cn(
              "w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 p-px bg-white shadow-2xs transition-all cursor-pointer hover:scale-110",
              isActive
                ? "border-[#C8205C] ring-1 ring-[#C8205C]"
                : "border-zinc-300 hover:border-zinc-400",
            )}
          >
            <span
              className="w-full h-full rounded-[1px] block border border-black/10"
              style={{ backgroundColor: hex }}
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
