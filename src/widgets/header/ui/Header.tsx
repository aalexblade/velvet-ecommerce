"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/shared/lib";
import { useCartStore } from "@/features/cart";
import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";

// ==========================================
// TYPES & NAV LINKS
// ==========================================

export interface MenuLink {
  label: string;
  href: string;
}

export interface MenuColumn {
  image_url: string;
  links: MenuLink[];
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  menu_columns?: MenuColumn[] | null;
}

const STATIC_NAV_LINKS = [
  { label: "Новинки", href: "/catalog/novynky", slug: "novynky" },
  { label: "Білизна", href: "/catalog/bilyzna", slug: "bilyzna" },
  { label: "Домашній одяг", href: "/catalog/homewear", slug: "homewear" },
  { label: "Акції", href: "/catalog/sale", slug: "sale" },
  { label: "Про нас", href: "/about", slug: "about" },
  { label: "Блог", href: "/blog", slug: "blog" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [openMobileSlug, setOpenMobileSlug] = useState<string | null>(null);

  const isWhiteHeaderPage = pathname === "/cart" || pathname === "/checkout";

  const cartItems = useCartStore((state) => state.items);
  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title, slug, menu_columns")
        .is("parent_id", null);

      if (!error && data) {
        setCategories(data as Category[]);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCategoryData = (slug?: string) => {
    if (!slug) return null;
    return (
      categories.find(
        (c) => c.slug === slug && c.menu_columns && c.menu_columns.length > 0,
      ) || null
    );
  };

  const isMegaHovered = Boolean(hoveredCategory);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none",
          isScrolled || isMegaHovered || isWhiteHeaderPage
            ? "bg-background/90 text-foreground backdrop-blur-xl shadow-xs border-b border-muted py-3"
            : "bg-black/25 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-white py-4",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            {/* --- BRAND LOGO --- */}
            <Link href="/" className="relative flex items-center shrink-0">
              <Image
                src={
                  isScrolled || isMegaHovered || isWhiteHeaderPage
                    ? "https://mylhoikievakodeutzsi.supabase.co/storage/v1/object/public/assets/logo/logo-black.png"
                    : "https://mylhoikievakodeutzsi.supabase.co/storage/v1/object/public/assets/logo/logo-white.png"
                }
                alt="Velvet Secrets Logo"
                width={150}
                height={32}
                priority
                className="h-6 md:h-8 w-auto object-contain transition-opacity hover:opacity-85"
                unoptimized
              />
            </Link>

            {/* --- DESKTOP NAV BAR --- */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
              {STATIC_NAV_LINKS.map((link, linkIdx) => {
                const categoryData = getCategoryData(link.slug);
                const hasMega = Boolean(categoryData);
                const isHovered = Boolean(
                  link.slug && hoveredCategory?.slug === link.slug,
                );

                return (
                  <div
                    key={`${link.href}-${linkIdx}`}
                    className="h-full flex items-center group relative"
                    onMouseEnter={() =>
                      hasMega && setHoveredCategory(categoryData)
                    }
                    onMouseLeave={() => hasMega && setHoveredCategory(null)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-xs md:text-sm font-semibold tracking-wider uppercase flex items-center gap-1 py-2 transition-colors duration-300 relative cursor-pointer",
                        isHovered ? "text-accent" : "hover:text-accent",
                      )}
                    >
                      {link.label}
                      {hasMega && (
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-300",
                            isHovered && "rotate-180",
                          )}
                        />
                      )}

                      {/* Тоненька риска h-[1px] з анімацією виїзду зліва направо */}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 w-full h-px bg-accent transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                          isHovered && "scale-x-100",
                        )}
                      />
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* --- UTILITY ICON BUTTONS BAR --- */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                className="p-1.5 hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Search"
              >
                <Search size={19} strokeWidth={1.75} />
              </button>

              <button
                className="p-1.5 hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart size={19} strokeWidth={1.75} />
              </button>

              <Link
                href="/cart"
                className="p-1.5 hover:opacity-70 transition-opacity relative cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingBag size={19} strokeWidth={1.75} />

                {totalCartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 border border-white shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </Link>

              <button
                className="p-1.5 hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Account"
              >
                <User size={19} strokeWidth={1.75} />
              </button>

              {/* --- BURGER TRIGGER FOR MOBILE/TABLET (СПРАВА) --- */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 -mr-1 hover:opacity-70 transition-opacity cursor-pointer ml-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            DESKTOP MEGA MENU CANVAS OVERLAY
            ========================================== */}
        <div
          onMouseEnter={() =>
            hoveredCategory && setHoveredCategory(hoveredCategory)
          }
          onMouseLeave={() => setHoveredCategory(null)}
          className={cn(
            "hidden lg:block absolute left-0 right-0 top-full bg-background border-b border-muted transition-all duration-300 shadow-xl overflow-hidden z-40 text-foreground",
            isMegaHovered
              ? "max-h-125 opacity-100 py-8"
              : "max-h-0 opacity-0 py-0 pointer-events-none",
          )}
        >
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 gap-8">
            {hoveredCategory?.menu_columns?.map((col, idx) => (
              <div key={idx} className="flex gap-6 items-start group/col">
                {col.image_url && (
                  <div className="relative w-27.5 aspect-3/4 rounded-xl overflow-hidden bg-muted shadow-xs shrink-0">
                    <Image
                      src={col.image_url}
                      alt={`${hoveredCategory.title} banner ${idx + 1}`}
                      fill
                      sizes="110px"
                      className="object-cover group-hover/col:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex flex-col space-y-2.5 pt-1 grow">
                  {col.links.map((link, linkIdx) => (
                    <Link
                      key={`${link.href}-${linkIdx}`}
                      href={link.href}
                      onClick={() => setHoveredCategory(null)}
                      className="text-xs md:text-sm font-medium text-foreground/80 hover:text-accent hover:pl-1 transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ==========================================
          MOBILE / TABLET BURGER DRAWER (СПРАВА)
          ========================================== */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-background text-foreground z-50 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="space-y-6 overflow-y-auto no-scrollbar pt-2">
          <div className="flex justify-between items-center pb-4 border-b border-muted">
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Меню
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            {STATIC_NAV_LINKS.map((link) => {
              const categoryData = getCategoryData(link.slug);
              const hasMega = Boolean(categoryData);
              const isOpen = openMobileSlug === link.slug;

              if (hasMega && categoryData) {
                return (
                  <div
                    key={link.label}
                    className="border-b border-muted/60 pb-2"
                  >
                    <button
                      onClick={() =>
                        setOpenMobileSlug(isOpen ? null : link.slug || null)
                      }
                      className="w-full text-left text-sm font-bold tracking-wider uppercase flex items-center justify-between cursor-pointer"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 pl-3 flex flex-col space-y-2.5",
                        isOpen
                          ? "max-h-150 mt-3 mb-1 opacity-100"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      {categoryData.menu_columns
                        ?.flatMap((c) => c.links)
                        .map((subLink, subIdx) => (
                          <Link
                            key={`${subLink.href}-${subIdx}`}
                            href={subLink.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-bold tracking-wider uppercase border-b border-muted/60 pb-2 last:border-0 hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex justify-around pt-4 border-t border-muted bg-background">
          <Heart
            size={20}
            className="text-muted-foreground cursor-pointer hover:text-foreground"
          />
          <Search
            size={20}
            className="text-muted-foreground cursor-pointer hover:text-foreground"
          />
          <User
            size={20}
            className="text-muted-foreground cursor-pointer hover:text-foreground"
          />
        </div>
      </div>
    </>
  );
}
