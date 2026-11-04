import { HeroSlider } from "@/widgets/hero-slider";
import { ProductGrid } from "@/widgets/product-grid";
import { PromoLook } from "@/widgets/promo-look";
import { Reviews, DiscountBanner } from "@/widgets/recommendations";
import { SizeCalculator, SizeHowTo } from "@/widgets/product-size-guide";
import { getBestsellers } from "@/entities/product/api/getProducts";

export default async function HomePage() {
  const bestsellers = await getBestsellers();

  return (
    <main className="flex flex-col min-h-screen">
      <HeroSlider />

      <div className="w-full flex flex-col">
        <ProductGrid
          products={bestsellers}
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
