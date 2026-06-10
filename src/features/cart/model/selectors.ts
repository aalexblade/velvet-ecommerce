import { RootState } from "@/app/store/store";

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemsCount = (state: RootState) => state.cart.items.length;
export const selectCartTotalPrice = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
