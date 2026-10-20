import type {
  CreateOrderItemPayload,
  CreateOrderPayload,
} from "@/entities/order";
import type { CartItem } from "@/entities/cart";
import type { CheckoutTotals } from "./calculateCheckoutTotals";

interface CheckoutCustomerData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  warehouse: string;
  paymentMethod: string;
}

export function buildOrderPayload(
  customer: CheckoutCustomerData,
  totals: CheckoutTotals,
  items: CartItem[],
): {
  orderPayload: CreateOrderPayload;
  itemsPayload: CreateOrderItemPayload[];
} {
  return {
    orderPayload: {
      first_name: customer.firstName,
      last_name: customer.lastName,
      phone: customer.phone,
      city: customer.city,
      delivery_warehouse: customer.warehouse,
      payment_method: customer.paymentMethod,
      total_price: totals.totalPrice,
      shipping_cost: totals.shippingCost,
      grand_total: totals.grandTotal,
    },
    itemsPayload: items.map((item) => ({
      variant_id: String(item.variantId),
      title: item.title,
      color: item.color || "Default",
      size: item.size || "Default",
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
  };
}