"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Input, Button } from "@/shared/ui";

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
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
    className="shrink-0"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
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
    className="shrink-0"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />  
  </svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
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
    className="shrink-0"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const FOOTER_LINKS = {
  main: {
    title: "Компанія",
    links: [
      { label: "Про нас", href: "/about" },    
      { label: "Каталог", href: "/catalog" }, 
      { label: "Білизна", href: "/catalog" }, 
      { label: "Домашній одяг", href: "/catalog" },
      { label: "Sale", href: "/catalog" },     
    ],
  },
  clients: {
    title: "Клієнтам",
    links: [
      { label: "Доставка та оплата", href: "/shipping" },
      { label: "Обмін та повернення", href: "/returns" },
      { label: "Гід по розмірам", href: "/size-guide" },
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

export function Footer() {
  return (
    <footer className="relative w-full min-h-128 mt-24 text-primary-foreground selection:bg-primary/20">   

      {/* 1. BACKGROUND CANVAS LAYER */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <Image
          src="/footer-image.webp"
          alt="Footer Background Canvas"
          fill
          priority
          className="object-cover object-center opacity-90 select-none"
        />
        <div className="absolute inset-0 bg-foreground/10 mix-blend-normal" />
      </div>

      {/* 2. PREMIUM IPHONE-STYLE GLASS CARD CONTAINER */}
      <div className="relative z-10 mx-auto max-w-7xl min-h-128 rounded-[20px] border border-primary-foreground/10 overflow-hidden isolate">

        <div className="absolute inset-0 -z-10 bg-foreground/20 backdrop-blur-3xl w-full h-full" />       

        {/* Content Viewport Wrapper */}
        <div className="px-6 py-16 md:px-12 w-full h-full">

          {/* Structural Top Branding Line Divider */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 w-full">     
            <div className="w-full md:flex-1 h-px bg-primary-foreground/10" />
            <Link
              href="/"
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest uppercase text-center block text-primary-foreground transition-opacity hover:opacity-90 pl-4 whitespace-nowrap font-sans"       
            >
              VELVET SECRETS
            </Link>
            <div className="w-full md:flex-1 h-px bg-primary-foreground/10" />
          </div>

          {/* Nav Links Column & Action Grid Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 items-start w-full">

            {/* Box 1: Verified Newsletter Frame */} 
            <div className="flex flex-col gap-5">    
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary font-sans">
                Залишайся в курсі     
              </h3>
              <p className="text-sm text-primary-foreground/90 leading-relaxed font-normal opacity-90 font-sans">
                Будьте першим, хто дізнається про наші спеціальні пропозиції та все, що стосується Velvet Secrets.
              </p>
              <form
                className="flex flex-col gap-3 w-full"
                onSubmit={(e) => e.preventDefault()} 
              >
                <Input
                  type="email"
                  placeholder="Електронна пошта"
                  className="bg-foreground/40 border-primary-foreground/10 text-primary-foreground placeholder:text-muted-foreground rounded-xl h-12 focus:border-primary/40 focus:ring-0 transition-colors font-sans"
                  required
                />
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl uppercase tracking-widest font-bold h-12 text-sm transition-all active:scale-[0.99] cursor-pointer font-sans"
                >
                  Підписатись
                </Button>
              </form>
            </div>

            {/* Box 2: Core Directives */}
            <div className="flex flex-col gap-5">    
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/90 font-sans">
                {FOOTER_LINKS.main.title}
              </h3>
              <ul className="flex flex-col gap-3">   
                {FOOTER_LINKS.main.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground hover:text-primary transition-colors font-normal opacity-85 hover:opacity-100 font-sans"       
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 3: Client Utility Stream */}     
            <div className="flex flex-col gap-5">    
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/90 font-sans">
                {FOOTER_LINKS.clients.title}
              </h3>
              <ul className="flex flex-col gap-3">   
                {FOOTER_LINKS.clients.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground hover:text-primary transition-colors font-normal opacity-85 hover:opacity-100 font-sans"       
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 4: Connectivity Channels */}     
            <div className="flex flex-col gap-8 lg:items-start w-full">
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/90 font-sans">
                  Слідкуй за нами       
                </h3>
                <div className="flex gap-2.5">       
                  {SOCIAL_LINKS.map((social) => (    
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-3 bg-foreground/30 border border-primary-foreground/10 rounded-full hover:bg-primary hover:border-primary transition-all group cursor-pointer"
                      aria-label={social.label}      
                      target="_blank"
                      rel="noopener noreferrer"      
                    >
                      <social.icon
                        size={18}
                        className="text-primary-foreground group-hover:text-primary-foreground transition-colors opacity-80 group-hover:opacity-100"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/90 font-sans">
                  Контакти
                </h3>
                <ul className="flex flex-col gap-3"> 
                  <li>
                    <a
                      href="tel:+380XXXXXXXXX"       
                      className="flex items-center gap-2.5 text-sm text-primary-foreground hover:text-primary transition-colors group opacity-85 hover:opacity-100 font-sans"
                    >
                      <Phone size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      +38 (0XX) XXX XX XX
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:info@velvetsecrets.com"
                      className="flex items-center gap-2.5 text-sm text-primary-foreground hover:text-primary transition-colors group opacity-85 hover:opacity-100 font-sans"
                    >
                      <Mail size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      info@velvetsecrets.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Legal Bar */}
          <div className="mt-16 pt-8 border-t border-primary-foreground/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest opacity-70 font-sans">
            <p>© {new Date().getFullYear()} VELVET SECRETS. УСІ ПРАВА ЗАХИЩЕНІ.</p>       
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
                Політика конфіденційності
              </Link>
              <Link href="/terms" className="hover:text-primary-foreground transition-colors">
                Умови використання  
              </Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
