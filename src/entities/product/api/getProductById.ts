import { Product } from '../model/types';
import { getProducts } from './getProducts';

/**
 * Server-side function to fetch a single product by its unique string identifier.
 * All JSDoc and technical annotations are strictly in English.
 * * @param id - The unique string product identifier.
 * @returns {Promise<Product | null>} The product entity match or null if not found.
 */
export async function getProductById(id: string): Promise<Product | null> {
  await new Promise(res => setTimeout(res, 500));
  // Fixed: Passing an empty array fallback [] to satisfy the strict signature of getProducts(slug)
  const allProducts = await getProducts([]);
  const match = allProducts.find((p) => p.id === id);
  return match || null;
}