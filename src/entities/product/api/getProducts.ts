import { Product } from "../model/types";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Мереживний Бра Балконет з Push-up",
    slug: "lace-bra-balconette-pushup",
    description:
      "Вишуканий мереживний бюстгальтер балконет з ефектом пуш-ап для розкішного декольте.",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "v1_1",
        product_id: "1",
        sku: "BALC-1",
        color: "Ruby",
        size: "75B",
        price: 955,
        old_price: 1200,
        stock: 5,
      },
      {
        id: "v1_2",
        product_id: "1",
        sku: "BALC-2",
        color: "Black",
        size: "75C",
        price: 955,
        old_price: 1200,
        stock: 3,
      },
      {
        id: "v1_3",
        product_id: "1",
        sku: "BALC-3",
        color: "White",
        size: "80B",
        price: 955,
        old_price: 1200,
        stock: 4,
      },
    ],
    images: [
      {
        id: 1,
        product_id: "1",
        variant_id: null,
        url: "https://images.unsplash.com/photo-1616611910515-b779a527c1cd?q=80&w=600&auto=format&fit=crop",
        is_main: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "2",
    title: "Класичний бюстгальтер з кісточками",
    slug: "classic-underwire-bra",
    description:
      "Базовий гладкий бюстгальтер на кісточках, ідеальний під облягаючий одяг.",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "v2_1",
        product_id: "2",
        sku: "CLASS-1",
        color: "Peach",
        size: "75B",
        price: 650,
        old_price: null,
        stock: 8,
      },
      {
        id: "v2_2",
        product_id: "2",
        sku: "CLASS-2",
        color: "Black",
        size: "75C",
        price: 650,
        old_price: null,
        stock: 5,
      },
    ],
    images: [
      {
        id: 2,
        product_id: "2",
        variant_id: null,
        url: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600&auto=format&fit=crop",
        is_main: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "3",
    title: "Корсетний Бра Балконет з Push-up",
    slug: "corset-bra-balconette",
    description:
      "Елегантний корсетний бра з ніжного мережива з додатковою бічною підтримкою.",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "v3_1",
        product_id: "3",
        sku: "CORS-1",
        color: "White",
        size: "75B",
        price: 820,
        old_price: null,
        stock: 4,
      },
      {
        id: "v3_2",
        product_id: "3",
        sku: "CORS-2",
        color: "Black",
        size: "75A",
        price: 820,
        old_price: null,
        stock: 2,
      },
    ],
    images: [
      {
        id: 3,
        product_id: "3",
        variant_id: null,
        url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop",
        is_main: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "4",
    title: "Мереживний Бра Балконет з Трусиками",
    slug: "lace-bra-set",
    description: "Комплект нижньої білизни з прозорого французького мережива.",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "v4_1",
        product_id: "4",
        sku: "SET-1",
        color: "Ruby",
        size: "75B",
        price: 1100,
        old_price: 1380,
        stock: 3,
      },
    ],
    images: [
      {
        id: 4,
        product_id: "4",
        variant_id: null,
        url: "https://images.unsplash.com/photo-1594913615401-447a98eef64a?q=80&w=600&auto=format&fit=crop",
        is_main: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "5",
    title: "Бюстгальтер бралет без кісточок",
    slug: "bralette-wireless",
    description:
      "Легкий та невагомий мереживний бралет без поролону для щоденного комфорту.",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "v5_1",
        product_id: "5",
        sku: "BRAL-1",
        color: "Black",
        size: "M",
        price: 580,
        old_price: null,
        stock: 10,
      },
    ],
    images: [
      {
        id: 5,
        product_id: "5",
        variant_id: null,
        url: "https://images.unsplash.com/photo-1562572159-4ebcd318f4dd?q=80&w=600&auto=format&fit=crop",
        is_main: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "6",
    title: "Мереживний Бра Балконет Velvet",
    slug: "lace-bra-velvet",
    description: "Бра балконет з акцентними оксамитовими стрічками.",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "v6_1",
        product_id: "6",
        sku: "VELV-1",
        color: "Ruby",
        size: "75C",
        price: 1250,
        old_price: 1600,
        stock: 2,
      },
    ],
    images: [
      {
        id: 6,
        product_id: "6",
        variant_id: null,
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
        is_main: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "7",
    title: "Базовий ліф трикутної форми",
    slug: "basic-triangle-bra",
    description: "Трикутний гладкий ліф з мікрофібри з тонкими бретелями.",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "v7_1",
        product_id: "7",
        sku: "TRI-1",
        color: "Peach",
        size: "75B",
        price: 490,
        old_price: null,
        stock: 15,
      },
    ],
    images: [
      {
        id: 7,
        product_id: "7",
        variant_id: null,
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
        is_main: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: "8",
    title: "Мереживний топ-корсет Елегант",
    slug: "lace-top-corset",
    description:
      "Витончений корсетний топ, який можна використовувати як елемент вечірнього образу.",
    category_id: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    variants: [
      {
        id: "v8_1",
        product_id: "8",
        sku: "TOP-1",
        color: "Black",
        size: "S",
        price: 1650,
        old_price: 2100,
        stock: 3,
      },
    ],
    images: [
      {
        id: 8,
        product_id: "8",
        variant_id: null,
        url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
        is_main: true,
        sort_order: 1,
      },
    ],
  },
];

/**
 * Server-side function to fetch products based on URL slug criteria.
 * Formatted and ready for seamless Supabase SSR SDK mapping.
 *
 * @param slug - Array of dynamic routing criteria from Next.js App Router.
 * @returns {Promise<Product[]>} A promise that resolves to the array of matching products.
 */
export async function getProducts(slug: string[]): Promise<Product[]> {
  // 1. Якщо масив slug порожній (ми на базовій сторінці /catalog), повертаємо всі товари
  if (!slug || slug.length === 0) {
    return Promise.resolve(MOCK_PRODUCTS);
  }

  console.log(
    "Filtering server-side mock dataset for dynamic URL categories matrix:",
    slug,
  );

  // 2. Витягуємо цільову категорію
  const targetCategory = slug[slug.length - 1].toLowerCase();

  // 3. Змінено: Пропускаємо фільтрацію через пряме читання масиву 'slug' за допомогою .includes()
  // Це твій рідний логічний ланцюжок, але тепер він залізобетонно задіює саму назву аргументу 'slug'
  const filteredProducts = MOCK_PRODUCTS.filter(
    (product) =>
      product.slug.includes(targetCategory) ||
      targetCategory === "bilyzna" ||
      slug.includes("catalog"),
  );

  // Якщо нічого не знайшли за фільтром — віддаємо дефолтний набір, щоб не ламати верстку
  return Promise.resolve(
    filteredProducts.length > 0 ? filteredProducts : MOCK_PRODUCTS,
  );
}
