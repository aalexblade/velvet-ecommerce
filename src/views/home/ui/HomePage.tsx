import { HeroSlider } from "@/widgets/hero-slider";
import { ProductGrid } from "@/widgets/product-grid";
import { PromoLook } from "@/widgets/promo-look";
import { Reviews } from "@/widgets/reviews";
import { DiscountBanner } from "@/widgets/discount-banner";
import { SizeCalculator, SizeHowTo } from "@/widgets/product-size-guide";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/widgets/product-card";
import { getBestsellers } from "@/entities/product/server";

export async function HomePage() {
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
          renderProductCard={(product) => (
            <ProductCard product={product} />
          )}
          renderProductSkeleton={() => <ProductCardSkeleton />}
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