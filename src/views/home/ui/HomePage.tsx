import { HeroSlider } from "@/widgets/hero-slider";
import { ProductGrid } from "@/widgets/product-grid";
import { PromoLook } from "@/widgets/promo-look";
import { Reviews } from "@/widgets/reviews";
import { DiscountBanner } from "@/widgets/discount-banner";
import { SizeCalculator, SizeHowTo } from "@/widgets/product-size-guide";
import { ProductCard, ProductCardSkeleton } from "@/widgets/product-card";
import { getBestsellers } from "@/entities/product/server";

export async function HomePage() {
  const bestsellers = await getBestsellers();

  const productCards = bestsellers.map((product, idx) => (
    <div key={`${product.id}-${idx}`} className="w-full max-w-55">
      <ProductCard product={product} />
    </div>
  ));

  const skeletonCards = Array.from({ length: 4 }).map((_, index) => (
    <ProductCardSkeleton key={`skeleton-${index}`} />
  ));

  return (
    <main className="flex flex-col min-h-screen">
      <HeroSlider />

      <div className="w-full flex flex-col">
        <ProductGrid
          title="Бестселери"
          description="Найпопулярніші моделі сезону, які обирають наші клієнти найчастіше."
          showPromo={true}
          productCards={productCards}
          skeletonCards={skeletonCards}
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
