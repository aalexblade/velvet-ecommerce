import { HeroSlider } from "@/widgets/hero-slider";
import { Bestsellers } from "@/widgets/product-grid";
import { PromoLook, Reviews, DiscountBanner, SizeCalculator, SizeHowTo } from "@/widgets/recommendations";

export default async function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSlider />

      <div className="w-full flex flex-col">
        <Bestsellers />
        <PromoLook />
        <DiscountBanner />
        <SizeCalculator />
        <SizeHowTo />
        <Reviews />
      </div>
    </main>
  );
}
