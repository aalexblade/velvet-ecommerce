import { HeroSlider } from "@/widgets/hero-slider";
import { Bestsellers } from "@/widgets/bestsellers";

export default async function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSlider />
      
      <div className="w-full">
        <Bestsellers />
      </div>
      
      {/* Additional homepage sections can be added here */}
    </main>
  );
}
