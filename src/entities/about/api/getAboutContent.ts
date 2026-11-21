import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";
import type { Json, Tables } from "@/shared/api/supabase/database.types";
import type { AboutSection, AboutSectionContent } from "../model/types";

type AboutPageRow = Tables<"about_page">;

function isStringArray(value: Json | undefined): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function parseAboutContent(content: Json): AboutSectionContent | undefined {
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return undefined;
  }

  const record = content as Record<string, Json | undefined>;
  const paragraphs = isStringArray(record.paragraphs)
    ? record.paragraphs
    : undefined;
  const list = isStringArray(record.list) ? record.list : undefined;

  if (!paragraphs && !list) {
    return undefined;
  }

  return {
    ...(paragraphs ? { paragraphs } : {}),
    ...(list ? { list } : {}),
  };
}

function mapAboutSection(row: AboutPageRow): AboutSection {
  const parsedContent = parseAboutContent(row.content);

  return {
    id: row.id,
    section_key: row.section_key,
    ...(row.title !== null ? { title: row.title } : {}),
    ...(row.subtitle !== null ? { subtitle: row.subtitle } : {}),
    ...(row.image_url !== null ? { image_url: row.image_url } : {}),
    ...(parsedContent ? { content: parsedContent } : {}),
  };
}

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

  return (data ?? []).map(mapAboutSection);
};
