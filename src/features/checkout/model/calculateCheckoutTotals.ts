interface CheckoutLineItem {
  price: number;
  quantity: number;
}

export interface CheckoutTotals {
  totalPrice: number;
  shippingCost: number;
  grandTotal: number;
}

const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_COST = 150;

export function calculateCheckoutTotals(
  items: CheckoutLineItem[],
): CheckoutTotals {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shippingCost =
    totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  return {
    totalPrice,
    shippingCost,
    grandTotal: totalPrice + shippingCost,
  };
}