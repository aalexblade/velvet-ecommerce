import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/entities/cart";

export type { CartItem } from "@/entities/cart";

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string | number) => void;
  updateQuantity: (variantId: string | number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.variantId === item.variantId,
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeFromCart: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i,
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
