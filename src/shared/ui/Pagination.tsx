"use client";

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Reusable Pagination component following strict design system tokens.
 * Marks a Client Component boundary for interactive page shifting.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          aria-current={isActive ? 'page' : undefined}
          className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center border text-sm font-medium transition-colors",
            isActive
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-foreground hover:bg-muted"
          )}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className={cn("flex justify-center items-center gap-2 mt-12 mb-6 w-full", className)}
    >
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="h-10 w-10 rounded-xl flex items-center justify-center border border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        {renderPageButtons()}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-10 w-10 rounded-xl flex items-center justify-center border border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};
