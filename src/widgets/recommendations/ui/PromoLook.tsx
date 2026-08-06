"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel";

const SUPABASE_STORAGE_URL =
  "https://mylhoikievakodeutzsi.supabase.co/storage/v1/object/public/assets/promo-look";

const PROMO_ITEMS = [
  {
    id: "nude",
    title: "Трусики стрінги бежеві (Nude)",
    imageUrl: `${SUPABASE_STORAGE_URL}/promo-look-item-1-nude.jpg`,
  },
  {
    id: "black",
    title: "Трусики стрінги чорні (Black)",
    imageUrl: `${SUPABASE_STORAGE_URL}/promo-look-item-2-black.jpg`,
  },
  {
    id: "pink",
    title: "Трусики стрінги рожеві (Pink)",
    imageUrl: `${SUPABASE_STORAGE_URL}/promo-look-item-3-pink.jpg`,
  },
];

const MODEL_IMAGE_URL = `${SUPABASE_STORAGE_URL}/promo-look-model.jpg`;

export const PromoLook: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();

  const handlePrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section className="w-full bg-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch lg:min-h-150">
          {/* LEFT COLUMN: Flexbox для ідеального розподілу простору (Текст - Карусель - Кнопка) */}
          <div className="flex flex-col justify-between py-10 lg:py-16 order-2 lg:order-1">
            {/* 1. Текст (зменшено розмір заголовка як на макеті) */}
            <div>
              <h2 className="font-sans font-bold text-3xl lg:text-4xl text-foreground tracking-tight leading-tight mb-4">
                Одягайся з любов’ю до себе
              </h2>
              <p className="font-sans text-muted-foreground text-sm lg:text-base leading-relaxed max-w-md">
                М’яка білизна, затишний одяг і натхнення для твого щоденного
                комфорту.
              </p>
            </div>

            {/* 2. Карусель (Центрується у вільному просторі, значно більша) */}
            <div className="flex-1 flex flex-col items-center justify-center w-full my-10">
              <div className="relative w-full max-w-xs sm:max-w-sm flex items-center justify-center">
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{ loop: true, align: "center" }}
                >
                  <CarouselContent className="ml-0">
                    {PROMO_ITEMS.map((item) => (
                      <CarouselItem
                        key={item.id}
                        className="pl-0 basis-full flex justify-center items-center"
                      >
                        {/* Розмір картинки збільшено (w-64 h-64 -> w-80 h-80), додано mix-blend-multiply для прибирання білого фону JPG */}
                        <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex justify-center items-center">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            priority
                            className="object-contain mix-blend-multiply"
                            unoptimized
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                {/* Стрілки тепер "обіймають" зображення */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent/20 text-accent hover:bg-accent hover:text-white flex items-center justify-center transition-all cursor-pointer z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent text-white hover:bg-accent/90 flex items-center justify-center transition-all cursor-pointer shadow-sm z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3. Кнопка (Притискається до низу) */}
            <div className="flex justify-start">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 font-medium rounded-xl text-base shadow-sm"
              >
                Обрати комфорт
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Модель (Займає всю висоту без відступів) */}
          <div className="relative w-full h-full min-h-100 lg:min-h-full hidden lg:block order-1 lg:order-2 rounded-2xl lg:rounded-none lg:rounded-r-2xl overflow-hidden">
            <Image
              src={MODEL_IMAGE_URL}
              alt="Одягайся з любов’ю до себе"
              fill
              priority
              className="object-cover object-center"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};
