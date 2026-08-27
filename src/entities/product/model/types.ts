// src/entities/product/model/types.ts

export type ProductColor =
  | "White"
  | "Smoky White"
  | "Lavender"
  | "Creamy Yellow"
  | "Cream"
  | "Creamy Velvet"
  | "Peach"
  | "Cotton Candy"
  | "Pale Purple"
  | "Eggplant"
  | "Cherry"
  | "Dark Violet"
  | "Plum"
  | "Ruby"
  | "Wine Red"
  | "Magenta"
  | "Red"
  | "Mahogany Brown"
  | "Magic Mint"
  | "Emerald"
  | "Pearl Green"
  | "Azure Blue"
  | "Denim Blue"
  | "Midnight Blue"
  | "Raw Umber"
  | "Dark"
  | "Black"
  | "Beige"
  | "Nude";

export interface Color {
  slug: string;
  name_uk: string;
  hex: string;
  tailwind_class?: string;
}

export interface ProductImage {
  id: number;
  product_id?: number;
  color_group_id?: number;
  variant_id?: number | null;
  color?: ProductColor | string | null;
  url: string;
  is_main?: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface ProductVariant {
  id: number;
  product_id?: number;
  color_group_id?: number;
  sku?: string;
  color?: ProductColor | string;
  size: string;
  price: number;
  old_price?: number | null;
  stock?: number;
  created_at?: string;
}

export interface ProductColorGroup {
  id: number;
  product_id: number;
  color_slug: string;
  is_main?: boolean;
  created_at?: string;
  colors?: Color;
  product_images?: ProductImage[];
  product_variants?: ProductVariant[];
}

export interface Product {
  id: number;
  title: string;
  slug: string | null;
  description?: string;
  category_id?: number;
  is_active?: boolean;
  created_at?: string;
  product_color_groups?: ProductColorGroup[];
  // Optional arrays kept for backward compatibility if needed
  variants?: ProductVariant[];
  images?: ProductImage[];
}