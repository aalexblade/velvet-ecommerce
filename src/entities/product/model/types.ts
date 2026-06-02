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
  | "Black";

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  color: ProductColor;
  size: string;
  price: number;
  old_price: number | null;
  stock: number;
}

export interface ProductImage {
  id: number;
  product_id: string;
  variant_id: string | null;
  url: string;
  is_main: boolean;
  sort_order: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: number;
  is_active: boolean;
  created_at: string;
  variants: ProductVariant[];
  images: ProductImage[];
}
