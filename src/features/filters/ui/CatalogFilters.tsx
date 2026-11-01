"use client";

import React, { useTransition, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown, Filter, X, Menu } from "lucide-react";
import { cn } from "@/shared/lib";
import {
  AVAILABLE_SIZES,
  AVAILABLE_COLORS_DATA,
  AVAILABLE_FABRICS,
  AVAILABLE_COLLECTIONS,
  AVAILABLE_NAMES,
  SORT_OPTIONS,
  PRICE_PRESETS,
  type SortOption,
} from "../model/filterOptions";

export interface CatalogFiltersProps {
  className?: string;
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobSortOpen, setIsMobSortOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const activeSizes = AVAILABLE_SIZES.filter((s) =>
    searchParams
      .getAll("size")
      .some((u) => u.toLowerCase() === s.toLowerCase()),
  );
  const activeColors = AVAILABLE_COLORS_DATA.filter((c) =>
    searchParams
      .getAll("color")
      .some((u) => u.toLowerCase() === c.id.toLowerCase()),
  );
  const activeFabrics = AVAILABLE_FABRICS.filter((f) =>
    searchParams
      .getAll("fabric")
      .some((u) => u.toLowerCase() === f.id.toLowerCase()),
  );
  const activeCollections = AVAILABLE_COLLECTIONS.filter((col) =>
    searchParams
      .getAll("collection")
      .some((u) => u.toLowerCase() === col.id.toLowerCase()),
  );
  const activeNames = AVAILABLE_NAMES.filter((n) =>
    searchParams
      .getAll("search")
      .some((u) => u.toLowerCase() === n.title.toLowerCase()),
  );

  const activeSort = (searchParams.get("sort") as SortOption) || "popular";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const updateQueryParams = (
    name: string,
    value: string | string[],
    isArray = false,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (isArray) {
      const currentValues = params.getAll(name);
      const val = value as string;
      if (currentValues.includes(val)) {
        const newValues = currentValues.filter((v) => v !== val);
        params.delete(name);
        newValues.forEach((v) => params.append(name, v));
      } else {
        params.append(name, val);
      }
    } else {
      if (value) {
        params.set(name, value as string);
      } else {
        params.delete(name);
      }
    }
    params.delete("page");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handlePricePreset = (min: string, max: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("minPrice") === min && params.get("maxPrice") === max) {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      params.set("minPrice", min);
      params.set("maxPrice", max);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearAll = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const getSortButtonTitle = () => {
    return (
      SORT_OPTIONS.find((o) => o.id === activeSort)?.title || "За популярністю"
    );
  };

  const hasActiveFilters =
    activeSizes.length > 0 ||
    activeColors.length > 0 ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    activeFabrics.length > 0 ||
    activeCollections.length > 0 ||
    activeNames.length > 0;

  const dropdownContainerClasses =
    "absolute top-full left-0 mt-1 z-50 bg-white border border-zinc-200 shadow-xl rounded-xl opacity-0 pointer-events-none transition-all duration-200 scale-95 origin-top-left group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 overflow-visible";

  return (
    <div
      className={cn(
        "w-full bg-white flex flex-col transition-opacity overflow-visible font-sans",
        isPending && "opacity-60 pointer-events-none",
        className,
      )}
    >
      {/* 💻 DESKTOP FILTERS PANEL LAYER */}
      <div className="border-y border-zinc-200 py-1 overflow-visible hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="flex items-center justify-between h-14 overflow-visible">
            <div className="flex items-center gap-2 text-zinc-900 py-4 font-bold text-xs uppercase tracking-wider shrink-0 mr-6 select-none cursor-pointer hover:text-[#C8205C] transition-colors whitespace-nowrap">
              <Filter className="w-4 h-4 stroke-[2.5px] text-[#C8205C]" />
              Всі Фільтри
            </div>

            <div className="flex items-center gap-x-6 flex-1 overflow-visible h-full">
              {/* Name Filter Trigger */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-[#C8205C] whitespace-nowrap",
                    activeNames.length > 0 ? "text-[#C8205C]" : "text-zinc-500",
                  )}
                >
                  Назва товару{" "}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div
                  className={cn(dropdownContainerClasses, "min-w-56 py-1.5")}
                >
                  {AVAILABLE_NAMES.map((name) => {
                    const isSelected = activeNames.some(
                      (n) => n.id === name.id,
                    );
                    return (
                      <button
                        key={name.id}
                        type="button"
                        onClick={() => updateQueryParams("search", name.title)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer font-medium hover:text-[#C8205C] hover:bg-zinc-50 whitespace-nowrap",
                          isSelected
                            ? "text-[#C8205C] bg-pink-50/50 font-bold"
                            : "text-zinc-700",
                        )}
                      >
                        {name.title}
                      </button>
                    );
                  })}
                  <div className="border-t border-zinc-100 my-1" />
                  <button
                    type="button"
                    onClick={() => updateQueryParams("search", "")}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer transition-colors whitespace-nowrap"
                  >
                    Всі назви...
                  </button>
                </div>
              </div>

              {/* Price Filter Trigger */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-[#C8205C] whitespace-nowrap",
                    minPrice || maxPrice ? "text-[#C8205C]" : "text-zinc-500",
                  )}
                >
                  Ціна{" "}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div
                  className={cn(dropdownContainerClasses, "min-w-64 py-1.5")}
                >
                  <div className="flex flex-col">
                    {PRICE_PRESETS.map((preset) => {
                      const isPresetActive =
                        minPrice === preset.min && maxPrice === preset.max;
                      return (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() =>
                            handlePricePreset(preset.min, preset.max)
                          }
                          className={cn(
                            "w-full text-left py-2 px-4 text-xs transition-colors cursor-pointer font-medium hover:text-[#C8205C] hover:bg-zinc-50 whitespace-nowrap",
                            isPresetActive
                              ? "text-[#C8205C] bg-pink-50/50 font-bold"
                              : "text-zinc-600",
                          )}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Size Filter Trigger */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-[#C8205C] whitespace-nowrap",
                    activeSizes.length > 0 ? "text-[#C8205C]" : "text-zinc-500",
                  )}
                >
                  Розмір{" "}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div
                  className={cn(dropdownContainerClasses, "min-w-40 py-1.5")}
                >
                  <div className="flex flex-col">
                    {AVAILABLE_SIZES.map((size) => {
                      const isSelected = activeSizes.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => updateQueryParams("size", size, true)}
                          className={cn(
                            "w-full text-left px-5 py-2 text-xs font-semibold transition-colors cursor-pointer hover:text-[#C8205C] hover:bg-zinc-50 whitespace-nowrap",
                            isSelected
                              ? "text-[#C8205C] bg-pink-50/50"
                              : "text-zinc-800",
                          )}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Color Filter Trigger */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-[#C8205C] whitespace-nowrap",
                    activeColors.length > 0
                      ? "text-[#C8205C]"
                      : "text-zinc-500",
                  )}
                >
                  Колір{" "}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div
                  className={cn(dropdownContainerClasses, "min-w-140 p-3.5")}
                >
                  <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                    {AVAILABLE_COLORS_DATA.map((color) => {
                      const isSelected = activeColors.some(
                        (c) => c.id === color.id,
                      );
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() =>
                            updateQueryParams("color", color.id, true)
                          }
                          className={cn(
                            "flex items-center gap-3 w-full py-1.5 px-2 rounded-md transition-colors cursor-pointer text-left text-xs font-medium hover:bg-zinc-50 hover:text-[#C8205C] whitespace-nowrap",
                            isSelected
                              ? "text-[#C8205C] bg-pink-50/40 font-semibold"
                              : "text-zinc-700",
                          )}
                        >
                          <span
                            className={cn(
                              "w-4 h-4 rounded-[5px] shrink-0 shadow-sm",
                              color.bgClass,
                            )}
                          />
                          <span className="truncate">{color.title}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="border-t border-zinc-100 my-2" />
                  <button
                    type="button"
                    onClick={() => updateQueryParams("color", "")}
                    className="flex items-center gap-3 w-full py-1.5 px-2 rounded-md text-left text-xs font-semibold text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer transition-colors whitespace-nowrap"
                  >
                    <span className="w-4 h-4 rounded-[5px] shrink-0 bg-linear-to-tr from-blue-500 via-yellow-400 to-red-500 shadow-sm" />{" "}
                    Всі кольори...
                  </button>
                </div>
              </div>

              {/* Fabric Type Trigger */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-[#C8205C] whitespace-nowrap",
                    activeFabrics.length > 0
                      ? "text-[#C8205C]"
                      : "text-zinc-500",
                  )}
                >
                  Тип тканини{" "}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div
                  className={cn(dropdownContainerClasses, "min-w-44 py-1.5")}
                >
                  {AVAILABLE_FABRICS.map((fabric) => {
                    const isSelected = activeFabrics.some(
                      (f) => f.id === fabric.id,
                    );
                    return (
                      <button
                        key={fabric.id}
                        type="button"
                        onClick={() =>
                          updateQueryParams("fabric", fabric.id, true)
                        }
                        className={cn(
                          "w-full text-left px-5 py-2 text-xs transition-colors cursor-pointer font-medium hover:text-[#C8205C] hover:bg-zinc-50 whitespace-nowrap",
                          isSelected
                            ? "text-[#C8205C] bg-pink-50/50 font-bold"
                            : "text-zinc-700",
                        )}
                      >
                        {fabric.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Collection Type Trigger */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-[#C8205C] whitespace-nowrap",
                    activeCollections.length > 0
                      ? "text-[#C8205C]"
                      : "text-zinc-500",
                  )}
                >
                  Колекція{" "}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div
                  className={cn(dropdownContainerClasses, "min-w-56 py-1.5")}
                >
                  {AVAILABLE_COLLECTIONS.map((col) => {
                    const isSelected = activeCollections.some(
                      (c) => c.id === col.id,
                    );
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() =>
                          updateQueryParams("collection", col.id, true)
                        }
                        className={cn(
                          "w-full text-left px-5 py-2 text-xs transition-colors cursor-pointer font-medium hover:text-[#C8205C] hover:bg-zinc-50 whitespace-nowrap",
                          isSelected
                            ? "text-[#C8205C] bg-pink-50/50 font-bold"
                            : "text-zinc-700",
                        )}
                      >
                        {col.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Core Sorting Layout Block */}
            <div className="flex items-center gap-2 shrink-0 relative group py-4 overflow-visible">
              <label className="text-xs font-medium text-zinc-400 select-none whitespace-nowrap">
                Сортувати за:
              </label>
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-bold text-zinc-800 hover:text-[#C8205C] cursor-pointer transition-colors whitespace-nowrap"
              >
                {getSortButtonTitle()}{" "}
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-zinc-200 shadow-xl rounded-xl py-1.5 min-w-52 opacity-0 pointer-events-none transition-all duration-200 scale-95 origin-top-right group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 overflow-visible">
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = activeSort === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateQueryParams("sort", opt.id)}
                      className={cn(
                        "w-full text-left px-5 py-2 text-xs transition-colors cursor-pointer flex items-center justify-between font-medium hover:text-[#C8205C] hover:bg-zinc-50 whitespace-nowrap",
                        isSelected
                          ? "bg-pink-50/50 text-[#C8205C] font-bold"
                          : "text-zinc-700",
                      )}
                    >
                      {opt.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW COMPONENT TRIGGERS */}
      <div className="border-y border-zinc-200 py-3 block lg:hidden bg-white sticky top-0 z-30">
        <div className="px-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(true);
              setIsMobSortOpen(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 border border-zinc-300 rounded-lg py-3 text-xs font-bold uppercase tracking-wider text-zinc-900 bg-white active:bg-zinc-50 transition-all select-none cursor-pointer"
          >
            <Menu className="w-4 h-4 stroke-[2.5px] text-[#C8205C]" />
            Фільтри{" "}
            {hasActiveFilters &&
              `(${
                activeSizes.length +
                activeColors.length +
                activeFabrics.length +
                activeCollections.length +
                activeNames.length
              })`}
          </button>

          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => setIsMobSortOpen(!isMobSortOpen)}
              className="w-full flex items-center justify-center gap-1.5 border border-zinc-300 rounded-lg py-3 text-xs font-bold uppercase tracking-wider text-zinc-900 bg-white active:bg-zinc-50 transition-all select-none cursor-pointer"
            >
              <span className="truncate">{getSortButtonTitle()}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-300 shrink-0 text-zinc-400",
                  isMobSortOpen && "rotate-180 text-[#C8205C]",
                )}
              />
            </button>

            <div
              className={cn(
                "absolute right-0 left-0 top-full mt-1 z-50 bg-white border border-zinc-200 shadow-2xl rounded-xl py-1.5 transition-all duration-200 origin-top",
                isMobSortOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none",
              )}
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={`mob-sort-${opt.id}`}
                  type="button"
                  onClick={() => {
                    updateQueryParams("sort", opt.id);
                    setIsMobSortOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-5 py-3.5 text-xs font-semibold transition-colors flex items-center justify-between border-b border-zinc-50 last:border-0 cursor-pointer",
                    activeSort === opt.id
                      ? "bg-pink-50/50 text-[#C8205C]"
                      : "text-zinc-700 active:bg-zinc-50",
                  )}
                >
                  {opt.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📥 MOBILE DRAWER OVERLAY SHEET LAYER */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-all duration-300 lg:hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-[90%] max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 transform",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs uppercase tracking-wider">
              <Filter className="w-4 h-4 text-[#C8205C]" />
              Панель фільтрів
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 active:bg-zinc-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
            {/* Mobile Name Accordion */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("name")}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 py-1 cursor-pointer"
              >
                <span>
                  Назва товару{" "}
                  {activeNames.length > 0 && `(${activeNames.length})`}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-zinc-400",
                    openAccordion === "name" && "rotate-180 text-[#C8205C]",
                  )}
                />
              </button>
              {openAccordion === "name" && (
                <div className="mt-3 flex flex-col gap-1.5 pl-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {AVAILABLE_NAMES.map((name) => (
                    <button
                      key={`mob-name-${name.id}`}
                      type="button"
                      onClick={() => updateQueryParams("search", name.title)}
                      className={cn(
                        "w-full text-left py-2.5 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                        activeNames.some((n) => n.id === name.id)
                          ? "bg-pink-50 text-[#C8205C] font-bold"
                          : "text-zinc-600 active:bg-zinc-50",
                      )}
                    >
                      {name.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Price Accordion */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("price")}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 py-1 cursor-pointer"
              >
                <span>Ціна {(minPrice || maxPrice) && "•"}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-zinc-400",
                    openAccordion === "price" && "rotate-180 text-[#C8205C]",
                  )}
                />
              </button>
              {openAccordion === "price" && (
                <div className="mt-3 flex flex-col gap-2 pl-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {PRICE_PRESETS.map((preset) => (
                    <button
                      key={`mob-preset-${preset.label}`}
                      type="button"
                      onClick={() => handlePricePreset(preset.min, preset.max)}
                      className={cn(
                        "w-full text-left py-2.5 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                        minPrice === preset.min && maxPrice === preset.max
                          ? "bg-pink-50 text-[#C8205C] font-bold"
                          : "text-zinc-600 active:bg-zinc-50",
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Size Accordion */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("size")}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 py-1 cursor-pointer"
              >
                <span>
                  Розмір {activeSizes.length > 0 && `(${activeSizes.length})`}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-zinc-400",
                    openAccordion === "size" && "rotate-180 text-[#C8205C]",
                  )}
                />
              </button>
              {openAccordion === "size" && (
                <div className="mt-3 grid grid-cols-3 gap-2 pl-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {AVAILABLE_SIZES.map((size) => {
                    const isSelected = activeSizes.includes(size);
                    return (
                      <button
                        key={`mob-size-${size}`}
                        type="button"
                        onClick={() => updateQueryParams("size", size, true)}
                        className={cn(
                          "py-2 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer text-center border",
                          isSelected
                            ? "bg-[#C8205C] text-white border-[#C8205C]"
                            : "bg-white text-zinc-700 border-zinc-200 active:bg-zinc-50",
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Color Accordion */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("color")}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 py-1 cursor-pointer"
              >
                <span>
                  Колір {activeColors.length > 0 && `(${activeColors.length})`}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-zinc-400",
                    openAccordion === "color" && "rotate-180 text-[#C8205C]",
                  )}
                />
              </button>
              {openAccordion === "color" && (
                <div className="mt-3 flex flex-col gap-1.5 pl-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {AVAILABLE_COLORS_DATA.map((color) => {
                    const isSelected = activeColors.some(
                      (c) => c.id === color.id,
                    );
                    return (
                      <button
                        key={`mob-color-${color.id}`}
                        type="button"
                        onClick={() =>
                          updateQueryParams("color", color.id, true)
                        }
                        className={cn(
                          "flex items-center gap-3 w-full py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left",
                          isSelected
                            ? "bg-pink-50 text-[#C8205C] font-bold"
                            : "text-zinc-600 active:bg-zinc-50",
                        )}
                      >
                        <span
                          className={cn(
                            "w-4 h-4 rounded-[5px] shrink-0 shadow-sm",
                            color.bgClass,
                          )}
                        />
                        <span>{color.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Fabric Accordion */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("fabric")}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 py-1 cursor-pointer"
              >
                <span>
                  Тип тканини{" "}
                  {activeFabrics.length > 0 && `(${activeFabrics.length})`}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-zinc-400",
                    openAccordion === "fabric" && "rotate-180 text-[#C8205C]",
                  )}
                />
              </button>
              {openAccordion === "fabric" && (
                <div className="mt-3 flex flex-col gap-1.5 pl-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {AVAILABLE_FABRICS.map((fabric) => {
                    const isSelected = activeFabrics.some(
                      (f) => f.id === fabric.id,
                    );
                    return (
                      <button
                        key={`mob-fabric-${fabric.id}`}
                        type="button"
                        onClick={() =>
                          updateQueryParams("fabric", fabric.id, true)
                        }
                        className={cn(
                          "w-full text-left py-2.5 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                          isSelected
                            ? "bg-pink-50 text-[#C8205C] font-bold"
                            : "text-zinc-600 active:bg-zinc-50",
                        )}
                      >
                        {fabric.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Collection Accordion */}
            <div className="border-b border-zinc-100 pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("collection")}
                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 py-1 cursor-pointer"
              >
                <span>
                  Колекція{" "}
                  {activeCollections.length > 0 &&
                    `(${activeCollections.length})`}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-zinc-400",
                    openAccordion === "collection" &&
                      "rotate-180 text-[#C8205C]",
                  )}
                />
              </button>
              {openAccordion === "collection" && (
                <div className="mt-3 flex flex-col gap-1.5 pl-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {AVAILABLE_COLLECTIONS.map((col) => {
                    const isSelected = activeCollections.some(
                      (c) => c.id === col.id,
                    );
                    return (
                      <button
                        key={`mob-col-${col.id}`}
                        type="button"
                        onClick={() =>
                          updateQueryParams("collection", col.id, true)
                        }
                        className={cn(
                          "w-full text-left py-2.5 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                          isSelected
                            ? "bg-pink-50 text-[#C8205C] font-bold"
                            : "text-zinc-600 active:bg-zinc-50",
                        )}
                      >
                        {col.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-zinc-200 bg-white flex gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="flex-1 py-3 border border-zinc-300 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-700 active:bg-zinc-100 transition-colors cursor-pointer"
              >
                Скинути
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 py-3 bg-[#C8205C] text-white rounded-lg text-xs font-bold uppercase tracking-wider active:bg-[#a6174a] transition-colors cursor-pointer shadow-sm"
            >
              Застосувати
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
