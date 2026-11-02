import type { ProductColor } from "@/entities/product";

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "discount-asc"
  | "discount-desc"
  | "popular";

export const AVAILABLE_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

export const AVAILABLE_COLORS_DATA: {
  id: ProductColor;
  title: string;
  bgClass: string;
}[] = [
  {
    id: "White",
    title: "Білий",
    bgClass: "bg-zinc-100 border border-zinc-300",
  },
  {
    id: "Smoky White",
    title: "Димчасто-білий",
    bgClass: "bg-slate-100 border border-zinc-200",
  },
  { id: "Lavender", title: "Лавандовий", bgClass: "bg-purple-100" },
  { id: "Creamy Yellow", title: "Кремово-жовтий", bgClass: "bg-yellow-50" },
  {
    id: "Cream",
    title: "Кремовий",
    bgClass: "bg-amber-50/60 border border-zinc-200",
  },
  { id: "Creamy Velvet", title: "Вершково-кремовий", bgClass: "bg-stone-100" },
  { id: "Peach", title: "Персиковий", bgClass: "bg-orange-100" },
  { id: "Cotton Candy", title: "Солодка вата", bgClass: "bg-pink-100" },
  { id: "Pale Purple", title: "Блідо-пурпуровий", bgClass: "bg-purple-200/60" },
  { id: "Eggplant", title: "Баклажановий", bgClass: "bg-fuchsia-900" },
  { id: "Cherry", title: "Вишневий", bgClass: "bg-rose-900" },
  { id: "Dark Violet", title: "Темно-фіолетовий", bgClass: "bg-violet-900" },
  { id: "Plum", title: "Сливовий", bgClass: "bg-purple-950" },
  { id: "Ruby", title: "Рубіновий", bgClass: "bg-rose-700" },
  { id: "Wine Red", title: "Винно-червоний", bgClass: "bg-red-950" },
  { id: "Magenta", title: "Червоно-пурпуровий", bgClass: "bg-pink-700" },
  { id: "Red", title: "Червоний", bgClass: "bg-red-600" },
  {
    id: "Mahogany Brown",
    title: "Махагон коричневий",
    bgClass: "bg-amber-950",
  },
  { id: "Magic Mint", title: "Магічна м'ята", bgClass: "bg-emerald-100" },
  { id: "Emerald", title: "Смарагдовий", bgClass: "bg-emerald-600" },
  {
    id: "Pearl Green",
    title: "Перламутрово-зелений",
    bgClass: "bg-emerald-950",
  },
  { id: "Azure Blue", title: "Лазурно-синій", bgClass: "bg-sky-600" },
  { id: "Denim Blue", title: "Джинсовий синій", bgClass: "bg-blue-700" },
  { id: "Midnight Blue", title: "Нічний синій", bgClass: "bg-blue-950" },
  { id: "Raw Umber", title: "Сіра умбра", bgClass: "bg-neutral-700" },
  { id: "Dark", title: "Темний", bgClass: "bg-zinc-800" },
  { id: "Black", title: "Чорний", bgClass: "bg-black" },
];

export const AVAILABLE_FABRICS = [
  { id: "viscose", title: "Віскоза" },
  { id: "cotton", title: "Бавовна" },
  { id: "wool", title: "Вовна" },
  { id: "satin", title: "Сатин" },
  { id: "silk", title: "Шовк" },
  { id: "atlas", title: "Атлас" },
];

export const AVAILABLE_COLLECTIONS = [
  { id: "linia-nizhnosti", title: "“Лінії Ніжності”" },
  { id: "vytonchenist-shchodnia", title: "“Витонченість Щодня”" },
  { id: "pidtrymka-liuboviu", title: "“Підтримка з Любов’ю”" },
  { id: "chysta-linia", title: "“Чиста Лінія”" },
  { id: "nizhna-spokusa", title: "“Ніжна Спокуса”" },
  { id: "tonkyi-dotyk", title: "“Тонкий Дотик”" },
  { id: "symba-zhinky", title: "“Сила Жінки”" },
];

export const AVAILABLE_NAMES = [
  { id: "pajamas", title: "Піжами" },
  { id: "robes", title: "Халати" },
  { id: "suits", title: "Костюми" },
  { id: "bras", title: "Бра" },
  { id: "panties", title: "Трусики" },
  { id: "lingerie-set", title: "Комплект білизни" },
  { id: "body", title: "Боді" },
];

export const SORT_OPTIONS: { id: SortOption; title: string }[] = [
  { id: "newest", title: "Новинки" },
  { id: "price-asc", title: "Ціна за зростанням" },
  { id: "price-desc", title: "Ціна за спаданням" },
  { id: "discount-asc", title: "Знижка за зростанням" },
  { id: "discount-desc", title: "Знижка за спаданням" },
  { id: "popular", title: "Найпопулярніше" },
];

export const PRICE_PRESETS = [
  { label: "від 300 до 800 UAH", min: "300", max: "800" },
  { label: "від 800 до 1200 UAH", min: "800", max: "1200" },
  { label: "від 1200 до 3000 UAH", min: "1200", max: "3000" },
  { label: "від 3000 до 25 000 UAH", min: "3000", max: "25000" },
];
