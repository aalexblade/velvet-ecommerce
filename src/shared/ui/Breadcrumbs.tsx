import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface PathSegment {
  pageTitle: string;
  targetUrl?: string;
}

export interface BreadcrumbsProps {
  navigationPath?: PathSegment[]; // Робимо опціональним із фолбеком
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  navigationPath = [], // Захист від undefined
  className = "",
}) => {
  if (!navigationPath || navigationPath.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb Navigation"
      className={cn(
        "flex items-center flex-wrap gap-2 py-4 text-sm md:text-base text-left w-full",
        className,
      )}
    >
      <ol className="flex items-center flex-wrap gap-2">
        {navigationPath.map((segment, index) => {
          const isLastSegment = index === navigationPath.length - 1;
          const hasValidLink = segment.targetUrl && !isLastSegment;

          return (
            <li
              key={`${segment.pageTitle}-${index}`}
              className="flex items-center gap-2"
            >
              {hasValidLink ? (
                <>
                  <Link
                    href={segment.targetUrl!}
                    className="text-muted-foreground hover:text-primary transition-colors font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {segment.pageTitle}
                  </Link>
                  <ChevronRight
                    className="text-border w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <span
                  className="text-foreground font-medium"
                  aria-current="page"
                >
                  {segment.pageTitle}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
