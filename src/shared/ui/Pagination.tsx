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
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Хелпер для генерації діапазону сторінок з трикрапками
  const getPageNumbers = (): (number | "ellipsis")[] => {
    // Якщо сторінок 7 або менше — показуємо всі без трикрапок
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];

    // Завжди додаємо першу сторінку
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    // Визначаємо діапазон навколо поточної сторінки
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    // Завжди додаємо останню сторінку
    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <PaginationRoot className="my-8">
      <PaginationContent className="gap-2">
        {/* Кнопка "Назад" */}
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

        {/* Номери сторінок та трикрапки */}
        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="w-9 h-9 flex items-center justify-center text-muted-foreground">
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
                    ? "border border-accent text-accent bg-background cursor-default"
                    : "text-muted-foreground hover:text-accent hover:bg-accent/10"
                }`}
              >
                {page}
              </button>
            </PaginationItem>
          );
        })}

        {/* Кнопка "Вперед" */}
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