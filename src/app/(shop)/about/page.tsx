"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { getAboutContent } from "@/shared/api/contentApi";
import { AboutSection } from "@/shared/types";

export default function AboutPage() {
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAboutContent();
        setAboutSections(data);
      } catch (error) {
        console.error("Помилка завантаження сторінки Про нас:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-36">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8205C]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans pt-32 md:pt-36 pb-20 selection:bg-pink-100 selection:text-[#C8205C]">
      {/* КРИХТИ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex text-xs uppercase tracking-wider text-zinc-400 gap-2 font-medium">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Головна
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Про нас</span>
        </nav>
      </div>

      {/* ЗАГОЛОВОК СТОРІНКИ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 text-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 uppercase">
          Про нас
        </h1>
      </div>

      {/* ШАХОВІ БЛОКИ ІСТОРІЇ БРЕНДУ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12 flex flex-col gap-16 md:gap-24">
        {aboutSections.map((section: AboutSection, index: number) => {
          const isReverse = index % 2 !== 0;

          return (
            <div
              key={section.id || index}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
                isReverse ? "md:direction-rtl" : ""
              }`}
            >
              {/* Контейнер картинки */}
              <div
                className={`md:col-span-6 relative aspect-16/10 w-full bg-zinc-100 rounded-2xl overflow-hidden shadow-xs ${
                  isReverse ? "md:order-last" : ""
                }`}
              >
                {section.image_url && (
                  <Image
                    src={section.image_url}
                    alt={section.title || section.subtitle || "Velvet Secrets"}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                )}
              </div>

              {/* Текстовий блок */}
              <div className="md:col-span-6 flex flex-col gap-3 md:px-4">
                {section.title && (
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900">
                    {section.title}
                  </h2>
                )}

                {section.subtitle && !section.title && (
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900">
                    {section.subtitle}
                  </h2>
                )}

                {/* Абзаци */}
                {section.content?.paragraphs?.map(
                  (paragraph: string, pIdx: number) => (
                    <p
                      key={pIdx}
                      className="text-xs md:text-sm text-zinc-600 font-light leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ),
                )}

                {/* Список */}
                {section.content?.list && (
                  <ul className="space-y-2 pt-1">
                    {section.content.list.map((item: string, lIdx: number) => (
                      <li
                        key={lIdx}
                        className="text-xs md:text-sm text-zinc-600 font-light flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8205C] shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}

        {/* КНОПКА ПЕРЕХОДУ ДО КАТАЛОГУ */}
        <div className="flex justify-center pt-4">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center bg-[#C8205C] hover:bg-[#b01a50] text-white text-xs md:text-sm font-bold tracking-wider uppercase px-10 py-3.5 rounded-md shadow-xs transition-colors"
          >
            Перейти до каталогу
          </Link>
        </div>
      </div>
    </div>
  );
}
