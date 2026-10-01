// src/entities/product/index.ts

// Export domain types
export type {
  Product,
  ProductColor,
  ProductColorGroup,
  ProductVariant,
  ProductImage,
} from "./model/types";

// Export domain API services
export { getProductById } from "./api/getProductById";
export { getProducts } from "./api/getProducts";
export { getSubcategories } from "./api/getSubcategories";