import { createOrder } from "@/entities/order";
import type {
  CreateOrderItemPayload,
  CreateOrderPayload,
} from "@/entities/order";
import { notifyOrderTelegram } from "../api/notifyOrderTelegram";
import type { CartItem } from "@/entities/cart";

interface SubmitCheckoutOrderParams {
  orderPayload: CreateOrderPayload;
  itemsPayload: CreateOrderItemPayload[];
  notification: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    warehouse: string;
    paymentMethod: string;
    totalPrice: number;
    shippingCost: number;
    grandTotal: number;
    items: CartItem[];
  };
}

export async function submitCheckoutOrder({
  orderPayload,
  itemsPayload,
  notification,
}: SubmitCheckoutOrderParams) {
  const order = await createOrder(orderPayload, itemsPayload);

  try {
    await notifyOrderTelegram({
      ...notification,
      orderId: order?.id ?? "NEW_ORDER",
    });
  } catch (error) {
    // Помилка сповіщення не повинна скасовувати оформлене замовлення.
    console.error("Failed to transmit Telegram webhook alert:", error);
  }

  return order;
}