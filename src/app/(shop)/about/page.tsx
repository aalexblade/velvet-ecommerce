"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Immutable premium content registry representing brand history and manifesto narrative
const ABOUT_BRAND_SECTIONS = [
  {
    id: "history",
    title: "Про бренд",
    subtitle: "Velvet Secrets — це філософія витонченості та впевненості.",
    description:
      "Ми створюємо не просто білизну, а відчуття винятковості для кожної жінки. Наша історія розпочалася з прагнення поєднати абсолютний щоденний комфорт із розкішним італійським мереживом та бездоганними силуетами, які підкреслюють природну красу.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
    reverse: false,
  },
  {
    id: "philosophy",
    title: "Наша філософія",
    subtitle: "Бездоганність у кожній деталі та делікатна підтримка.",
    description:
      "Кожен шов, кожна бретелька та чашка проходять десятки етапів тестування, щоб забезпечити ідеальну посадку. Ми віримо, що преміальна якість має бути відчутною з першого дотику, даруючи жінці силу, натхнення та любов до свого тіла.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
    reverse: true, // Triggers alternative chess grid layout positioning on desktop
  },
];

// Mock database registry mirroring production blog schema structures for local views
const MOCK_BLOG_POSTS = [
  {
    id: "post-1",
    title: "Як правильно підібрати розмір бра: повний гід",
    excerpt: "Дізнайтеся про головні анатомічні секрети правильних замірів під грудьми та правила вибору ідеальної чашки.",
    date: "12 Травня, 2026",
    category: "Гід по стилю",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600",
  },
  {
    id: "post-2",
    title: "Тренди преміальної білизни цього сезону",
    excerpt: "Від глибокого відтінку Cherry до невагомого мережива балконетів — розбір ключових поєднань Velvet Secrets.",
    date: "05 Травня, 2026",
    category: "Тренди",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600",
  },
  {
    id: "post-3",
    title: "Догляд за делікатними тканинами: поради експертів",
    excerpt: "Прості та дієві правила прання і зберігання мережива, шовку та атласу, щоб білизна зберігала вигляд роками.",
    date: "28 Квітня, 2026",
    category: "Поради",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased font-sans pb-20 selection:bg-pink-100 selection:text-[#C8205C]">
      
      {/* 👑 BREADCRUMBS LAYER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex text-xs uppercase tracking-wider text-zinc-400 gap-2 font-medium">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Головна</Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Про нас & Блог</span>
        </nav>
      </div>
{/* 🎭 BRAND IDENTITY HEADER STAGE */}
<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 text-center flex flex-col gap-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#C8205C]">Історія Velvet Secrets</span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 uppercase leading-none">
          Створюємо Відчуття Розкоші
        </h1>
        <p className="mt-2 text-sm md:text-base text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto">
          Кожен комплект Velvet Secrets — це витончене мистецтво, створене для вашого натхнення, комфорту та бездоганного силуету щодня.
        </p>
      </div>

      {/* ♟️ CHESS GRID BLOCKS SECTION (ABOUT BRAND STORY) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20 flex flex-col gap-12 md:gap-24">
        {ABOUT_BRAND_SECTIONS.map((section) => (
          <div
            key={section.id}
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${
              section.reverse ? "md:direction-rtl" : ""
            }`}
          >
            {/* Visual Media Block Content */}
            <div className={`md:col-span-6 relative aspect-4/3 w-full bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 shadow-sm ${
              section.reverse ? "md:order-last" : ""
            }`}>
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>

            {/* Typography Content Column Layout */}
            <div className="md:col-span-6 flex flex-col gap-3 md:px-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#C8205C]">{section.title}</span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 uppercase">
                {section.subtitle}
              </h2>
              <p className="text-xs md:text-sm text-zinc-600 font-light leading-relaxed">
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 📰 LUXURY MAGAZINE JOURNAL SECTION (THE VELVET BLOG) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-32 border-t border-zinc-100 pt-16 md:pt-24">
        
        {/* Section Headline Block Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C8205C]">Експертні гайди</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 uppercase">
              Блог Velvet Secrets
            </h2>
          </div>
          <p className="text-xs md:text-sm text-zinc-400 font-light max-w-md sm:text-right leading-snug">
            Статті про вибір ідеальної спідньої білизни, останні світові тренди та секрети преміального догляду за тканинами.
          </p>
        </div>

        {/* Dynamic Responsive 3-Column Posts Stream Canvas Sheet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-white rounded-2xl border border-zinc-100 shadow-xs overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Card Image Wrapper Panel */}
              <div className="relative aspect-3/2 w-full bg-zinc-50 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                <span className="absolute bottom-3 left-3 bg-white/95 text-[#C8205C] text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs">
                  {post.category}
                </span>
              </div>

              {/* Card Contents Metadata Context Column */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-zinc-400 font-medium font-sans">{post.date}</span>
                  <h3 className="text-sm font-bold text-zinc-900 tracking-tight leading-snug group-hover:text-[#C8205C] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Micro Action Interactive Anchor Component Row */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C8205C] group-hover:underline uppercase tracking-wider text-[10px] pt-1">
                  <span>Читати статтю</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
}