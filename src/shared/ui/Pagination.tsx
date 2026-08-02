"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import {
  PaginationRoot,
  PaginationContent,
  PaginationItem,
} from "@/shared/ui/shadcn-pagination";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // Number of sibling pages to show on each side of the current page
}

/**
 * Generates an array of page numbers with ellipsis markers, e.g., [1, "ellipsis", 4, 5, 6, "ellipsis", 20]
 */
function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1,
): (number | "ellipsis")[] {
  // Total elements to display without collapsing:
  // 1 (first) + 1 (last) + 1 (current) + 2 * siblingCount + 2 (two ellipsis markers)
  const totalPageNumbers = siblingCount * 2 + 5;

  // If total pages are less than the required display threshold, return all pages without truncation
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Case 1: Show ellipsis only on the right (e.g., 1 2 3 4 5 ... 20)
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", lastPageIndex];
  }

  // Case 2: Show ellipsis only on the left (e.g., 1 ... 16 17 18 19 20)
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1,
    );
    return [firstPageIndex, "ellipsis", ...rightRange];
  }

  // Case 3: Show ellipsis on both left and right sides (e.g., 1 ... 8 9 10 ... 20)
  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );
    return [
      firstPageIndex,
      "ellipsis",
      ...middleRange,
      "ellipsis",
      lastPageIndex,
    ];
  }

  return [];
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  if (totalPages <= 1) return null;

  const paginationRange = generatePaginationRange(
    currentPage,
    totalPages,
    siblingCount,
  );

  return (
    <PaginationRoot className="my-8">
      <PaginationContent className="gap-1 sm:gap-2">
        {/* Previous page button */}
        <PaginationItem>
          <button
            type="button"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </PaginationItem>

        {/* Page numbers and ellipsis items */}
        {paginationRange.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="w-9 h-9 flex items-center justify-center text-zinc-400 select-none">
                  <MoreHorizontal className="w-4 h-4" />
                </span>
              </PaginationItem>
            );
          }

          const isActive = page === currentPage;
          return (
            <PaginationItem key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                disabled={isActive}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "border border-[#C8102E] text-[#C8102E] bg-white cursor-default font-semibold shadow-xs"
                    : "text-zinc-700 hover:text-[#C8102E] hover:bg-rose-50/50"
                }`}
              >
                {page}
              </button>
            </PaginationItem>
          );
        })}

        {/* Next page button */}
        <PaginationItem>
          <button
            type="button"
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};
