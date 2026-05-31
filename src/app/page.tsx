import { HeroSlider } from "@/widgets/hero-slider";

export default async function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSlider />
      
      {/* Additional homepage sections can be added here */}
    </main>
  );
}
