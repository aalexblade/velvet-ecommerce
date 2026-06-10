"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { cn } from "@/shared/lib";
import { selectCartItemsCount } from "@/features/cart";

const NAV_LINKS = [
  { label: "Новинки", href: "/catalog/new" }, 
  { label: "Білизна", href: "/catalog/lingerie" },
  { label: "Домашній одяг", href: "/catalog/homewear" },
  { label: "Sale", href: "/catalog/sale" },    
  { label: "Про нас", href: "/about" },        
  { label: "Блог", href: "/blog" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemsCount = useSelector(selectCartItemsCount);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll); 
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background text-foreground shadow-sm border-b border-border py-3"
          : "bg-transparent text-white py-5"
      )}
    >
      <div className="container mx-auto px-4">       
        <div className="flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 transition-transform active:scale-95"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div
            className={cn(
              "flex-1 lg:flex-none text-center lg:text-left",
              "text-lg md:text-xl lg:text-2xl font-bold tracking-widest uppercase transition-colors duration-300"
            )}
          >
            <Link href="/" className="inline-block"> 
              VELVET SECRETS
            </Link>
          </div>

          {/* Desktop Navigation */}      
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-widest"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Utility Icons */}
          <div className="flex flex-1 lg:flex-none justify-end items-center gap-2 md:gap-4">
            <button
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="hidden sm:block p-2 hover:opacity-70 transition-opacity"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </button>
            <button
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Account"
            >
              <User size={20} />
            </button>
            <Link
              href="/cart"
              className="p-2 hover:opacity-70 transition-opacity relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full text-[10px] w-4 h-4 flex items-center justify-center absolute top-0 right-0">   
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background text-foreground border-b border-border shadow-lg animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 space-y-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-lg font-medium border-b border-border/50 pb-2 last:border-0 hover:pl-2 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex justify-around pt-4 border-t border-border">
              <Heart size={24} className="text-muted-foreground" />
              <Search size={24} className="text-muted-foreground" />
              <User size={24} className="text-muted-foreground" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
