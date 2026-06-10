import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";

export const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.length
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);
