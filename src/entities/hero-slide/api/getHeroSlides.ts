import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";
import type { HeroSlide } from "../model/types";

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Помилка завантаження слайдів Supabase:", error.message);
    return [];
  }

  return (data as HeroSlide[]) || [];
}
