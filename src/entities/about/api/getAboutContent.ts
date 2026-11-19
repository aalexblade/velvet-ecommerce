import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";
import type { AboutSection } from "../model/types";

export const getAboutContent = async (): Promise<AboutSection[]> => {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("about_page")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Помилка завантаження даних про нас:", error);
    return [];
  }

  return (data as unknown as AboutSection[]) || [];
};