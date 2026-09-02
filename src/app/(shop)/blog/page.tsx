"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { getArticles } from "@/shared/api/contentApi";
import { Article } from "@/shared/types";

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Помилка завантаження блогу:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-25">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8205C]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans pt-25 pb-20 selection:bg-pink-100 selection:text-[#C8205C]">
      {/* КРИХТИ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex text-xs uppercase tracking-wider text-zinc-400 gap-2 font-medium">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Головна
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Блог</span>
        </nav>
      </div>

      {/* ШАПКА БЛОГУ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 text-center flex flex-col gap-3">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 uppercase">
          Блог Velvet Secrets
        </h1>
        <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed max-w-xl mx-auto">
          Наш блог — це простір для справжніх поціновувачок жіночності та стилю. Тут ми ділимося корисним контентом, який допомагає вам почуватися впевнено і стильно щодня.
        </p>
      </div>

      {/* СІТКА З СТАТТЯМИ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((post: Article) => (
            <article
              key={post.id}
              className="group flex flex-col bg-white rounded-xl border border-zinc-100 shadow-2xs overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Вертикальний формат фото (3:4) */}
              <div className="relative aspect-3/4 w-full bg-zinc-100 overflow-hidden">
                {post.image_url && (
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                )}
                <span className="absolute bottom-3 left-3 bg-white/90 text-[#C8205C] text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-2xs backdrop-blur-xs">
                  Блог
                </span>
              </div>

              {/* Контент картки */}
              <div className="p-4 md:p-5 flex flex-col flex-1 justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString("uk-UA", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                  <h3 className="text-xs md:text-sm font-bold text-zinc-900 tracking-tight leading-snug group-hover:text-[#C8205C] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-[#C8205C] group-hover:underline uppercase tracking-wider text-[10px] font-bold pt-1">
                  <span>Читати статтю</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ТЕКСТОВИЙ ПІДВАЛ БЛОГУ */}
        <div className="mt-16 text-center">
          <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto">
            Блог <strong className="font-semibold text-zinc-800">Velvet Secrets</strong> демонструє нашу експертність і допомагає вам завжди залишатися на хвилі моди та комфорту. Повертаючись сюди регулярно, ви знайдете нові ідеї та секрети жіночої впевненості.
          </p>
        </div>
      </div>
    </div>
  );
}