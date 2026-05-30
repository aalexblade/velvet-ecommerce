export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  color: string;
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
