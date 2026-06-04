import { HeroSlider } from "@/widgets/hero-slider";
import { Bestsellers } from "@/widgets/bestsellers";
import { PromoLook } from "@/widgets/promo-look";
import { DiscountBanner } from "@/widgets/discount-banner";
import { SizeCalculator } from "@/widgets/size-calculator";


export default async function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSlider />

      <div className="w-full flex flex-col">
        <Bestsellers />
        <PromoLook />
        <DiscountBanner />
        <SizeCalculator />
      </div>
    </main>
  );
}

