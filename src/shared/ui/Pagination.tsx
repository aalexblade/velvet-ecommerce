"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  PaginationRoot,
  PaginationContent,
  PaginationItem,
} from "@/shared/ui/shadcn-pagination";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationRoot className="my-8">
      <PaginationContent className="gap-2">
        <PaginationItem>
          <button
            type="button"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            aria-label="Попередня сторінка"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </PaginationItem>

        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <PaginationItem key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                disabled={isActive}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "border border-accent text-accent bg-background cursor-default"
                    : "text-muted-foreground hover:text-accent hover:bg-accent/10"
                }`}
              >
                {page}
              </button>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <button
            type="button"
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            aria-label="Наступна сторінка"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};
