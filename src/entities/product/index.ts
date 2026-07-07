// Export only UI presentation layers and standalone client components
export { ProductCard } from './ui/ProductCard';

// Export type registries and structural models (Safe for both Client and Server environments)
export type { Product, ProductColor, ProductVariant, ProductImage } from './model/types';