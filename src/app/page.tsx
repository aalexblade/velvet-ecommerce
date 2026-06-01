import { HeroSlider } from "@/widgets/hero-slider";
import { Bestsellers } from "@/widgets/bestsellers";
import { PromoLook } from "@/widgets/promo-look";

export default async function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSlider />

      <div className="w-full">
        <Bestsellers />
        <PromoLook />
      </div>
    </main>
  );
}
