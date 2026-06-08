"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Input, Button } from "@/shared/ui";

/**
 * Social Brand Icon fallbacks to ensure compilation without specific lucide-react brand icon versioning.
 * Strictly adheres to project semantic token mapping via inherited className.
 */
const FacebookIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const FOOTER_LINKS = {
  main: {
    title: "Головна",
    links: [
      { label: "Новинки", href: "/catalog/new" },
      { label: "Білизна", href: "/catalog/lingerie" },
      { label: "Домашній одяг", href: "/catalog/homewear" },
      { label: "Акції", href: "/catalog/sale" },
    ],
  },
  clients: {
    title: "Клієнтам",
    links: [
      { label: "Про нас", href: "/about" },
      { label: "Доставка та оплата", href: "/shipping" },
      { label: "Повернення", href: "/returns" },
      { label: "Блог", href: "/blog" },
    ],
  },
};

const SOCIAL_LINKS = [
  { icon: Mail, href: "mailto:info@velvetsecrets.com", label: "Google" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
];

/**
 * Footer Widget Component
 * Implements FSD widget layer standards.
 * Uses Tailwind v4 semantic tokens and Manrope font family.
 */
export function Footer() {
  return (
    <footer className="relative container mx-auto mb-8 rounded-4xl md:rounded-5xl border border-white/10 bg-primary/95 backdrop-blur-md overflow-hidden font-sans text-background">
      <div className="px-6 py-12 md:px-12 md:py-16">
        {/* Top Section: Brand Identity with Structural Dividers */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 md:mb-16">
          <div className="w-full md:flex-1 h-px bg-white/10"></div>
          <Link
            href="/"
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.4em] uppercase px-4 md:px-10 text-center whitespace-nowrap text-background font-sans"
          >
            VELVET SECRETS
          </Link>
          <div className="w-full md:flex-1 h-px bg-white/10"></div>
        </div>

        {/* Main Footer Body: Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-12 lg:gap-x-16">
          {/* Column 1: Newsletter / Engagement */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-foreground">
              Залишайся в курсі
            </h3>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-primary-foreground/90 leading-relaxed font-medium">
                Підпишіться, щоб отримувати новини про нові колекції та ексклюзивні пропозиції.
              </p>
              <form 
                className="flex flex-col gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="Електронна пошта"
                  className="bg-primary-foreground/10 border-primary-foreground/20 rounded-none h-11 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/40"
                  required
                />
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none uppercase tracking-widest font-bold h-11"
                >
                  Відправити
                </Button>
              </form>
            </div>
          </div>

          {/* Column 2: Main Navigation */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-background font-sans">
              {FOOTER_LINKS.main.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.main.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Client Service Navigation */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-background font-sans">
              {FOOTER_LINKS.clients.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.clients.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Connectivity & Direct Contacts */}
          <div className="flex flex-col gap-8 lg:items-end">
            <div className="flex flex-col gap-6 lg:items-end w-full">
              <h3 className="text-sm font-bold uppercase tracking-wider text-background font-sans">
                Слідкуй за нами
              </h3>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-accent hover:border-accent transition-all group"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon
                      size={20}
                      className="text-white/70 group-hover:text-background transition-colors"
                    />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-4 lg:items-end w-full">
              <h3 className="text-sm font-bold uppercase tracking-wider text-background font-sans">
                Контакти
              </h3>
              <ul className="flex flex-col gap-3 lg:items-end">
                <li>
                  <a
                    href="tel:+380XXXXXXXXX"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group font-sans"
                  >
                    <Phone size={16} className="text-white/40 group-hover:text-accent transition-colors" />
                    +38 (0XX) XXX XX XX
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@velvetsecrets.com"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group font-sans"
                  >
                    <Mail size={16} className="text-white/40 group-hover:text-accent transition-colors" />
                    info@velvetsecrets.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-primary-foreground/40 uppercase tracking-[0.2em] font-sans">
          <p>© {new Date().getFullYear()} VELVET SECRETS. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
              Політика конфіденційності
            </Link>
            <Link href="/terms" className="hover:text-primary-foreground transition-colors">
              Умови використання
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
