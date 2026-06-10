"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface ReviewItem {
  name: string;
  city: string;
  text: string;
  avatar: string;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    name: "Олена",
    city: "Київ",
    text: "Замовляла тут вперше — і це любов з першого дотику! Білизна дуже ніжна, приємна до тіла, якість — на висоті. Усе прийшло гарно запаковане, із милою листівкою 💌 Дякую вам за турботу та жіночність у кожній деталі! Буду замовляти ще 💕",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop",
  },
  {
    name: "Галина",
    city: "Київ",
    text: "Дуже задоволена покупкою! Замовляла комплект мереживної білизни — якість чудова, приємна до тіла тканина, все дуже ніжне і жіночне. Розмір підійшов ідеально. Доставка була швидкою, упаковка красива — підходить навіть як подарунок. Рекомендую Velvet Secrets!",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&fit=crop",
  },
  {
    name: "Олеся",
    city: "Київ",
    text: "Дівчата! Якщо ви ще думаєте — не думайте! Це реально один з найкращих магазинів, де я купувала білизну. М’яка, красива, і така комфортна, що не хочеться знімати 🙈",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&fit=crop",
  },
  {
    name: "Валентина",
    city: "Київ",
    text: "Дуже задоволена своїм замовленням! Білизна ніжна, зручна й справді якісна. Усе гарно запаковано, з приємним ароматом тканини. Відчується любов до деталей 💕 Дякую за сервіс — вже чекаю нову колекцію!",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150&h=150&fit=crop",
  },
  {
    name: "Ірина",
    city: "Львів",
    text: "Неймовірний сервіс! Дівчата-консультанти допомогли підібрати розмір бездоганно. Матеріал настільки невагомий, що білизна відчувається як друга шкіра. Обов'язково повернуся за покупками знову! ✨",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150&h=150&fit=crop",
  },
  {
    name: "Тетяна",
    city: "Одеса",
    text: "Шовкова колекція — це щось неймовірне! Якість швів бездоганна, тканина розкішно переливається. Окреме дякую за швидку відправку, встигло прямо до мого праздника! Рекомендую від щирого серця. 🥰",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&fit=crop",
  },
];

const StarRating = () => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 shrink-0"
      >
        <path
          d="M21.2836 8.27559L15.3328 7.41075L12.6726 2.01778C12.6 1.87013 12.4805 1.75059 12.3328 1.67794C11.9625 1.49513 11.5125 1.64747 11.3273 2.01778L8.66717 7.41075L2.71639 8.27559C2.55233 8.29903 2.40233 8.37638 2.28748 8.49356C2.14864 8.63627 2.07214 8.82825 2.07477 9.02733C2.07741 9.22642 2.15897 9.41631 2.30155 9.55528L6.60701 13.7529L5.58983 19.6803C5.56597 19.8182 5.58123 19.96 5.63387 20.0896C5.68651 20.2193 5.77442 20.3316 5.88764 20.4138C6.00086 20.496 6.13486 20.5449 6.27444 20.5549C6.41401 20.5648 6.55359 20.5355 6.67733 20.4701L12 17.6717L17.3226 20.4701C17.468 20.5475 17.6367 20.5732 17.7984 20.5451C18.2062 20.4748 18.4805 20.0881 18.4101 19.6803L17.393 13.7529L21.6984 9.55528C21.8156 9.44044 21.893 9.29044 21.9164 9.12638C21.9797 8.71622 21.6937 8.33653 21.2836 8.27559Z"
          fill="currentColor"
          className="text-accent"
        />
      </svg>
    ))}
  </div>
);

export const Reviews = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugins = React.useMemo(
    () => [Autoplay({ delay: 5000, stopOnInteraction: true })],
    [],
  );

  React.useEffect(() => {
    if (!api) return;

    const updateActiveIndex = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("init", updateActiveIndex);
    api.on("select", updateActiveIndex);

    if (api.scrollSnapList().length > 0) {
      updateActiveIndex();
    }

    return () => {
      api.off("init", updateActiveIndex);
      api.off("select", updateActiveIndex);
    };
  }, [api]);

  return (
    <section className="w-full px-4 py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto max-w-7xl flex flex-col items-center gap-12 md:gap-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-center">
          Ваші враження — наша гордість
        </h2>

        <Carousel
          setApi={setApi}
          plugins={plugins}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-6">
            {REVIEWS_DATA.map((review, index) => (
              <CarouselItem
                key={index}
                className="pl-6 basis-3/4 sm:basis-1/2 md:basis-2/5 lg:basis-1/4"
              >
                <div className="flex flex-col gap-5 h-full min-h-55 justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-secondary">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <StarRating />
                      </div>
                    </div>

                    <p className="text-foreground/90 text-sm md:text-base leading-relaxed font-normal">
                      {review.text}
                    </p>
                  </div>

                  <span className="text-muted-foreground text-xs md:text-sm font-normal pt-2">
                    — {review.name}, {review.city}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex lg:hidden justify-center gap-2 pt-10">
            {REVIEWS_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-1 transition-all duration-300 rounded-full cursor-pointer",
                  current === index ? "w-8 bg-accent" : "w-4 bg-muted/60",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>

        <div className="pt-4 animate-in fade-in zoom-in-95 duration-700">
          <Button
            variant="outline"
            className="border-accent text-foreground hover:bg-accent/5 font-semibold rounded-xl px-10 py-6 h-auto text-base tracking-widest transition-all duration-300 cursor-pointer"
          >
            Залишити відгук про нас
          </Button>
        </div>
      </div>
    </section>
  );
};
