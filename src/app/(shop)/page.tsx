import { HeroSlider } from "@/widgets/hero-slider";
import { ProductGrid, BESTSELLERS_DATA } from "@/widgets/product-grid";
import { PromoLook, Reviews, DiscountBanner, SizeCalculator, SizeHowTo } from "@/widgets/recommendations";

export default async function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSlider />

      <div className="w-full flex flex-col">
        <ProductGrid 
          products={BESTSELLERS_DATA} 
          title="Бестселери" 
          description="Найпопулярніші моделі сезону, які обирають наші клієнти найчастіше."
          showPromo={true}
        />
        <PromoLook />
        <DiscountBanner />
        <SizeCalculator />
        <SizeHowTo />
        <Reviews />
      </div>
    </main>
  );
}
