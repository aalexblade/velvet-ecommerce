"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

// ==========================================
// 1. DATA CONFIGURATION FOR MEGA MENU & ROUTING
// ==========================================

const MEGA_MENU_LINGERIE = {
  columns: [
    {
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600",
      links: [
        { label: "Бюстгальтери", href: "/catalog/lingerie/bras" },
        { label: "Чокери (на шию)", href: "/catalog/lingerie/chokers" },
        { label: "Трусики", href: "/catalog/lingerie/panties" },
        { label: "Бралети", href: "/catalog/lingerie/bralettes" },
        { label: "Нічна білизна", href: "/catalog/lingerie/nightwear" },
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=300&auto=format&fit=crop",
      links: [
        { label: "Боді", href: "/catalog/lingerie/bodysuits" },
        { label: "Корсети / бюстьє", href: "/catalog/lingerie/corsets" },
        { label: "Аксесуари", href: "/catalog/lingerie/accessories" },
        { label: "Комбідреси", href: "/catalog/lingerie/leotards" },
        { label: "Панчохи", href: "/catalog/lingerie/stockings" },
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=300&auto=format&fit=crop",
      links: [
        { label: "Підв'язки", href: "/catalog/lingerie/garters" },
        { label: "Топ-бра", href: "/catalog/lingerie/bra-tops" },
        { label: "Набори білизни", href: "/catalog/lingerie/sets" },
        { label: "Комплекти", href: "/catalog/lingerie/matching-sets" },
        { label: "Пояси для панчіх", href: "/catalog/lingerie/garter-belts" },
      ],
    },
  ],
};

const NAV_LINKS = [
  { label: "Новинки", href: "/catalog/new" },
  { label: "Білизна", href: "/catalog/lingerie", hasMega: true },
  { label: "Домашній одяг", href: "/catalog/homewear" },
  { label: "Sale", href: "/catalog/sale" },
  { label: "Про нас", href: "/about" },
  { label: "Блог", href: "/blog" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLingerieOpen, setIsMobileLingerieOpen] = useState(false);
  const [isMegaHovered, setIsMegaHovered] = useState(false);

  // Fetch reactive items stream from Zustand store state machine
  const cartItems = useCartStore((state) => state.items);

  // Compute total count directly from stored line-items state
  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  // Track viewport window scroll position matrix securely
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none",
          isScrolled || isMegaHovered
            ? "bg-background text-foreground shadow-sm border-b border-muted py-3"
            : "bg-transparent text-white py-5",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* --- MOBILE TRIGGER --- */}
            <div className="lg:hidden flex-1">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 transition-transform active:scale-95 cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* --- BRAND LOGO --- */}
            <div className="flex-1 lg:flex-none text-center lg:text-left text-lg md:text-xl lg:text-2xl font-extrabold tracking-widest uppercase transition-colors duration-300">
              <Link href="/" className="inline-block hover:opacity-90">
                VELVET SECRETS
              </Link>
            </div>

            {/* --- DESKTOP NAV BAR --- */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 h-full">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="h-full flex items-center"
                  onMouseEnter={() => link.hasMega && setIsMegaHovered(true)}
                  onMouseLeave={() => link.hasMega && setIsMegaHovered(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-xs md:text-sm font-semibold tracking-wider uppercase flex items-center gap-1 py-4 hover:opacity-70 transition-all cursor-pointer relative top-px",
                      link.hasMega && "pr-1",
                    )}
                  >
                    {link.label}
                    {link.hasMega && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          isMegaHovered && "rotate-180",
                        )}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* --- UTILITY ICON BUTTONS BAR --- */}
            <div className="flex flex-1 lg:flex-none justify-end items-center gap-1 sm:gap-3">
              <button
                className="p-2 hover:opacity-60 transition-opacity cursor-pointer"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                className="hidden sm:block p-2 hover:opacity-60 transition-opacity cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </button>
              <button
                className="p-2 hover:opacity-60 transition-opacity cursor-pointer"
                aria-label="Account"
              >
                <User size={20} />
              </button>
              <Link
                href="/cart"
                className="p-2 hover:opacity-60 transition-opacity relative cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />

                {/* 
                  Fixed cascading render linter exception: 
                  Render items counter overlay only when the value evaluates directly to > 0 
                  safely handled via Next.js client-side Zustand synchronization streams
                */}
                {totalCartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 bg-[#C8205C] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* ==========================================
            DESKTOP MEGA MENU CANVAS OVERLAY
            ========================================== */}
        <div
          onMouseEnter={() => setIsMegaHovered(true)}
          onMouseLeave={() => setIsMegaHovered(false)}
          className={cn(
            "hidden lg:block absolute left-0 right-0 top-full bg-background border-b border-muted transition-all duration-200 shadow-xl overflow-hidden z-40",
            isMegaHovered
              ? "max-h-125 opacity-100 py-8"
              : "max-h-0 opacity-0 py-0 pointer-events-none",
          )}
        >
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 gap-8">
            {MEGA_MENU_LINGERIE.columns.map((col, idx) => (
              <div key={idx} className="flex gap-6 items-start group/col">
                {/* Visual Image Stage Banner */}
                <div className="relative w-27.5 aspect-3/4 rounded-xl overflow-hidden bg-muted shadow-xs shrink-0">
                  <Image
                    src={col.image}
                    alt="Category visual list banner"
                    fill
                    sizes="110px"
                    className="object-cover group-hover/col:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Inner Vertical Category Links Mapping */}
                <div className="flex flex-col space-y-2.5 pt-1 grow">
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
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
          MOBILE BURGER MENU SHEET (ACCORDION CONTROL)
          ========================================== */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 w-full max-w-[320px] bg-background text-foreground z-50 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="space-y-6 overflow-y-auto no-scrollbar pt-12">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => {
              if (link.hasMega) {
                return (
                  <div key={link.label} className="border-b border-muted pb-2">
                    <button
                      onClick={() =>
                        setIsMobileLingerieOpen(!isMobileLingerieOpen)
                      }
                      className="w-full text-left text-base font-bold tracking-wider uppercase flex items-center justify-between cursor-pointer"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isMobileLingerieOpen && "rotate-180",
                        )}
                      />
                    </button>
                    {/* Mobile Dynamic Accordion Drawer */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 pl-3 flex flex-col space-y-3",
                        isMobileLingerieOpen
                          ? "max-h-150 mt-4 mb-2 opacity-100"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      {MEGA_MENU_LINGERIE.columns
                        .flatMap((c) => c.links)
                        .map((subLink) => (
                          <Link
                            key={subLink.label}
                            href={subLink.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                  className="text-base font-bold tracking-wider uppercase border-b border-muted pb-2 last:border-0 hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Lower Utility Floating System Inside Burger */}
        <div className="flex justify-around pt-4 border-t border-muted bg-background">
          <Heart
            size={22}
            className="text-muted-foreground cursor-pointer hover:text-foreground"
          />
          <Search
            size={22}
            className="text-muted-foreground cursor-pointer hover:text-foreground"
          />
          <User
            size={22}
            className="text-muted-foreground cursor-pointer hover:text-foreground"
          />
        </div>
      </div>
    </>
  );
}
