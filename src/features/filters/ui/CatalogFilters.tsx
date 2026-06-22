"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown, Filter } from "lucide-react";
import { cn } from "@/shared/lib";
import { ProductColor } from "@/entities/product";

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "discount-asc"
  | "discount-desc"
  | "popular";

export interface CatalogFiltersProps {
  className?: string;
}

const AVAILABLE_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

const AVAILABLE_COLORS_DATA: {
  id: ProductColor;
  title: string;
  bgClass: string;
}[] = [
  {
    id: "White",
    title: "Білий",
    bgClass: "bg-zinc-100 border border-zinc-300",
  },
  {
    id: "Smoky White",
    title: "Димчасто-білий",
    bgClass: "bg-slate-100 border border-zinc-200",
  },
  { id: "Lavender", title: "Лавандовий", bgClass: "bg-purple-100" },
  { id: "Creamy Yellow", title: "Кремово-жовтий", bgClass: "bg-yellow-50" },
  {
    id: "Cream",
    title: "Кремовий",
    bgClass: "bg-amber-50/60 border border-zinc-200",
  },
  { id: "Creamy Velvet", title: "Вершково-кремовий", bgClass: "bg-stone-100" },
  { id: "Peach", title: "Персиковий", bgClass: "bg-orange-100" },
  { id: "Cotton Candy", title: "Солодка вата", bgClass: "bg-pink-100" },
  { id: "Pale Purple", title: "Блідо-пурпуровий", bgClass: "bg-purple-200/60" },
  { id: "Eggplant", title: "Баклажановий", bgClass: "bg-fuchsia-900" },
  { id: "Cherry", title: "Вишневий", bgClass: "bg-rose-900" },
  { id: "Dark Violet", title: "Темно-фіолетовий", bgClass: "bg-violet-900" },
  { id: "Plum", title: "Сливовий", bgClass: "bg-purple-950" },
  { id: "Ruby", title: "Рубіновий", bgClass: "bg-rose-700" },
  { id: "Wine Red", title: "Винно-червоний", bgClass: "bg-red-950" },
  { id: "Magenta", title: "Червоно-пурпуровий", bgClass: "bg-pink-700" },
  { id: "Red", title: "Червоний", bgClass: "bg-red-600" },
  {
    id: "Mahogany Brown",
    title: "Махагон коричневий",
    bgClass: "bg-amber-950",
  },
  { id: "Magic Mint", title: "Магічна м'ята", bgClass: "bg-emerald-100" },
  { id: "Emerald", title: "Смарагдовий", bgClass: "bg-emerald-600" },
  {
    id: "Pearl Green",
    title: "Перламутрово-зелений",
    bgClass: "bg-emerald-950",
  },
  { id: "Azure Blue", title: "Лазурно-синій", bgClass: "bg-sky-600" },
  { id: "Denim Blue", title: "Джинсовий синій", bgClass: "bg-blue-700" },
  { id: "Midnight Blue", title: "Нічний синій", bgClass: "bg-blue-950" },
  { id: "Raw Umber", title: "Сіра умбра", bgClass: "bg-neutral-700" },
  { id: "Dark", title: "Темний", bgClass: "bg-zinc-800" },
  { id: "Black", title: "Чорний", bgClass: "bg-black" },
];

const AVAILABLE_FABRICS = [
  { id: "viscose", title: "Віскоза" },
  { id: "cotton", title: "Бавовна" },
  { id: "wool", title: "Вовна" },
  { id: "satin", title: "Сатин" },
  { id: "silk", title: "Шовк" },
  { id: "atlas", title: "Атлас" },
];

const AVAILABLE_COLLECTIONS = [
  { id: "linia-nizhnosti", title: "“Лінії Ніжності”" },
  { id: "vytonchenist-shchodnia", title: "“Витонченість Щодня”" },
  { id: "pidtrymka-liuboviu", title: "“Підтримка з Любов’ю”" },
  { id: "chysta-linia", title: "“Чиста Лінія”" },
  { id: "nizhna-spokusa", title: "“Ніжна Спокуса”" },
  { id: "tonkyi-dotyk", title: "“Тонкий Дотик”" },
  { id: "symba-zhinky", title: "“Сила Жінки”" },
];

const AVAILABLE_NAMES = [
  { id: "pajamas", title: "Піжами" },
  { id: "robes", title: "Халати" },
  { id: "suits", title: "Костюми" },
  { id: "bras", title: "Бра" },
  { id: "panties", title: "Трусики" },
  { id: "lingerie-set", title: "Комплект білизни" },
  { id: "body", title: "Боді" },
];

const SORT_OPTIONS = [
  { id: "newest", title: "Новинки" },
  { id: "price-asc", title: "Ціна за зростанням" },
  { id: "price-desc", title: "Ціна за спаданням" },
  { id: "discount-asc", title: "Знижка за зростанням" },
  { id: "discount-desc", title: "Знижка за спаданням" },
  { id: "popular", title: "Найпопулярніше" },
];

const PRICE_PRESETS = [
  { label: "від 300 до 800 UAH", min: "300", max: "800" },
  { label: "від 800 до 1200 UAH", min: "800", max: "1200" },
  { label: "від 1200 до 3000 UAH", min: "1200", max: "3000" },
  { label: "від 3000 до 25 000 UAH", min: "3000", max: "25000" },
];

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

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
    if (searchParams.get("sort")) {
      return (
        SORT_OPTIONS.find((o) => o.id === activeSort)?.title ||
        "За популярністю"
      );
    }
    return "За популярністю";
  };

  const hasActiveFilters =
    activeSizes.length > 0 ||
    activeColors.length > 0 ||
    minPrice ||
    maxPrice ||
    activeFabrics.length > 0 ||
    activeCollections.length > 0 ||
    activeNames.length > 0;

  const dropdownContainerClasses =
    "absolute top-full left-0 mt-1 z-50 bg-white border border-zinc-200 shadow-xl rounded-xl opacity-0 pointer-events-none transition-all duration-200 scale-95 origin-top-left group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 overflow-visible";

  // 1-й рядок UI Kit ліворуч: Преміально-рожевий фон. При ховері плавно переходить у 4-й рядок (темно-винний)
  const activeBadgeClasses =
    "inline-flex items-center justify-center bg-[#b91c56] text-white rounded-lg px-5 py-2.5 text-xs font-bold transition-colors cursor-pointer select-none hover:bg-[#73103a] active:scale-[0.98] shadow-xs";

  return (
    <div
      className={cn(
        "w-full bg-white flex flex-col transition-opacity overflow-visible",
        isPending && "opacity-60 pointer-events-none",
        className,
      )}
    >
      <div className="border-y border-zinc-200 py-1 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="flex items-center justify-between h-14 overflow-visible">
            {/* 1. Всі Фільтри */}
            <div className="flex items-center gap-2 text-zinc-900 py-4 font-semibold text-xs uppercase tracking-wider shrink-0 mr-4 lg:mr-6 select-none cursor-pointer hover:text-pink-600 transition-colors whitespace-nowrap">
              <Filter className="w-4 h-4 stroke-[2.5px]" />
              Всі Фільтри
            </div>

            {/* ГОРІЗОНТАЛЬНИЙ ДЕСКТОПНИЙ ТУЛБАР */}
            <div className="hidden md:flex items-center gap-x-3 lg:gap-x-6 flex-1 overflow-visible h-full">
              {/* А. Назва товару */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-pink-600 whitespace-nowrap",
                    activeNames.length > 0 ? "text-pink-600" : "text-zinc-500",
                  )}
                >
                  Назва товару
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
                        onClick={() => updateQueryParams("search", name.title)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer font-medium hover:text-pink-600 hover:bg-zinc-50 whitespace-nowrap",
                          isSelected
                            ? "text-pink-600 bg-pink-50/50 font-bold"
                            : "text-zinc-700",
                        )}
                      >
                        {name.title}
                      </button>
                    );
                  })}
                  <div className="border-t border-zinc-100 my-1" />
                  <button
                    onClick={() => updateQueryParams("search", "")}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer transition-colors whitespace-nowrap"
                  >
                    Всі назви...
                  </button>
                </div>
              </div>

              {/* Б. Ціна */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-pink-600 whitespace-nowrap",
                    minPrice || maxPrice ? "text-pink-600" : "text-zinc-500",
                  )}
                >
                  Ціна
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
                          onClick={() =>
                            handlePricePreset(preset.min, preset.max)
                          }
                          className={cn(
                            "w-full text-left py-2 px-4 text-xs transition-colors cursor-pointer font-medium hover:text-pink-600 hover:bg-zinc-50 whitespace-nowrap",
                            isPresetActive
                              ? "text-pink-600 bg-pink-50/50 font-bold"
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

              {/* В. Розмір */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-pink-600 whitespace-nowrap",
                    activeSizes.length > 0 ? "text-pink-600" : "text-zinc-500",
                  )}
                >
                  Розмір
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
                          onClick={() => updateQueryParams("size", size, true)}
                          className={cn(
                            "w-full text-left px-5 py-2 text-xs font-semibold transition-colors cursor-pointer hover:text-pink-600 hover:bg-zinc-50 whitespace-nowrap",
                            isSelected
                              ? "text-pink-600 bg-pink-50/50"
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

              {/* Г. Колір */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-pink-600 whitespace-nowrap",
                    activeColors.length > 0 ? "text-pink-600" : "text-zinc-500",
                  )}
                >
                  Колір
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
                          onClick={() =>
                            updateQueryParams("color", color.id, true)
                          }
                          className={cn(
                            "flex items-center gap-3 w-full py-1.5 px-2 rounded-md transition-colors cursor-pointer text-left text-xs font-medium hover:bg-zinc-50 hover:text-pink-600 whitespace-nowrap",
                            isSelected
                              ? "text-pink-600 bg-pink-50/40 font-semibold"
                              : "text-zinc-700",
                          )}
                        >
                          <span
                            className={cn(
                              "w-4 h-4 rounded-[5px] shrink-0 shadow-xs",
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
                    onClick={() => updateQueryParams("color", "")}
                    className="flex items-center gap-3 w-full py-1.5 px-2 rounded-md text-left text-xs font-semibold text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer transition-colors whitespace-nowrap"
                  >
                    <span className="w-4 h-4 rounded-[5px] shrink-0 bg-linear-to-tr from-blue-500 via-yellow-400 to-red-500 shadow-xs" />
                    Всі кольори...
                  </button>
                </div>
              </div>

              {/* Д. Тип Тканини */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-pink-600 whitespace-nowrap",
                    activeFabrics.length > 0
                      ? "text-pink-600"
                      : "text-zinc-500",
                  )}
                >
                  Тип тканини
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
                        onClick={() =>
                          updateQueryParams("fabric", fabric.id, true)
                        }
                        className={cn(
                          "w-full text-left px-5 py-2 text-xs transition-colors cursor-pointer font-medium hover:text-pink-600 hover:bg-zinc-50 whitespace-nowrap",
                          isSelected
                            ? "text-pink-600 bg-pink-50/50 font-bold"
                            : "text-zinc-700",
                        )}
                      >
                        {fabric.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Е. Колекція */}
              <div className="relative group shrink-0 py-4 overflow-visible">
                <button
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:text-pink-600 whitespace-nowrap",
                    activeCollections.length > 0
                      ? "text-pink-600"
                      : "text-zinc-500",
                  )}
                >
                  Колекція
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
                        onClick={() =>
                          updateQueryParams("collection", col.id, true)
                        }
                        className={cn(
                          "w-full text-left px-5 py-2 text-xs transition-colors cursor-pointer font-medium hover:text-pink-600 hover:bg-zinc-50 whitespace-nowrap",
                          isSelected
                            ? "text-pink-600 bg-pink-50/50 font-bold"
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

            {/* СОРТУВАТИ ЗА */}
            <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0 relative group py-4 overflow-visible">
              <label className="text-xs font-medium text-zinc-400 select-none whitespace-nowrap">
                Сортувати за:
              </label>
              <button className="flex items-center gap-1 text-xs font-semibold text-zinc-800 hover:text-pink-600 cursor-pointer transition-colors whitespace-nowrap">
                {getSortButtonTitle()}
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-zinc-200 shadow-xl rounded-xl py-1.5 min-w-52 opacity-0 pointer-events-none transition-all duration-200 scale-95 origin-top-right group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 overflow-visible">
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = activeSort === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => updateQueryParams("sort", opt.id)}
                      className={cn(
                        "w-full text-left px-5 py-2 text-xs transition-colors cursor-pointer flex items-center justify-between font-medium hover:text-pink-600 hover:bg-zinc-50 whitespace-nowrap",
                        isSelected
                          ? "bg-pink-50/50 text-pink-600 font-bold"
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

      {/* РЯДОК АКТИВНИХ БЕЙДЖІВ ТА КНОПКИ СКИДАННЯ */}
      {hasActiveFilters && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-2.5 items-center animate-in fade-in duration-300">
          {searchParams.get("search") && (
            <button
              onClick={() => updateQueryParams("search", "")}
              className={activeBadgeClasses}
            >
              Назва: {searchParams.get("search")}
            </button>
          )}

          {activeCollections.map((col) => (
            <button
              key={`badge-col-${col.id}`}
              onClick={() => updateQueryParams("collection", col.id, true)}
              className={activeBadgeClasses}
            >
              Колекція: {col.title.replace(/[“”]/g, "")}
            </button>
          ))}

          {activeFabrics.map((fabric) => (
            <button
              key={`badge-fabric-${fabric.id}`}
              onClick={() => updateQueryParams("fabric", fabric.id, true)}
              className={activeBadgeClasses}
            >
              Тканина: {fabric.title}
            </button>
          ))}

          {activeColors.map((color) => (
            <button
              key={`badge-color-${color.id}`}
              onClick={() => updateQueryParams("color", color.id, true)}
              className={activeBadgeClasses}
            >
              Колір: {color.title}
            </button>
          ))}

          {activeSizes.map((size) => (
            <button
              key={`badge-size-${size}`}
              onClick={() => updateQueryParams("size", size, true)}
              className={activeBadgeClasses}
            >
              Розмір: {size}
            </button>
          ))}

          {(minPrice || maxPrice) && (
            <button
              onClick={() => {
                updateQueryParams("minPrice", "");
                updateQueryParams("maxPrice", "");
              }}
              className={activeBadgeClasses}
            >
              Ціна: {minPrice || "0"} - {maxPrice || "∞"} UAH
            </button>
          )}

          {/* 💎 1-й рядок UI Kit праворуч: Рожевий контур, який при ховері м'яко наливається рожевою пастеллю */}
          <button
            onClick={clearAll}
            className="inline-flex items-center justify-center border border-[#b91c56] text-zinc-900 font-bold rounded-lg px-5 py-2.5 text-xs bg-white cursor-pointer hover:bg-pink-50/60 active:scale-[0.98] transition-all shrink-0 select-none shadow-xs"
          >
            Скинути все
          </button>
        </div>
      )}
    </div>
  );
};
