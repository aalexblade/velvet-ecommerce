import type { CartItem } from "@/entities/cart";

interface NotifyOrderTelegramParams {
  orderId: string;
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
}

export async function notifyOrderTelegram(
  params: NotifyOrderTelegramParams,
): Promise<void> {
  const response = await fetch("/api/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...params,
      orderId: params.orderId || "NEW_ORDER",
      items: params.items.map((item) => ({
        title: item.title,
        color: item.color || "Default",
        size: item.size || "Default",
        quantity: item.quantity,
        price: item.price,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send Telegram order notification");
  }
}