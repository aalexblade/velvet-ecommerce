import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";
import { CreateOrderPayload, CreateOrderItemPayload } from "../model/types";

export async function createOrder(
  orderData: CreateOrderPayload,
  items: CreateOrderItemPayload[]
) {
  const supabase = createSupabaseBrowserClient();

  // 1. Вставляємо основні дані замовлення в таблицю orders
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([orderData])
    .select()
    .single();

  if (orderError) {
    console.error("Помилка створення замовлення:", orderError);
    throw new Error(orderError.message);
  }

  // 2. Додаємо до кожного товару отриманий order_id
  const itemsWithOrderId = items.map((item) => ({
    order_id: order.id,
    ...item,
  }));

  // 3. Вставляємо всі товари пакетом (bulk insert) у таблицю order_items
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsWithOrderId);

  if (itemsError) {
    console.error("Помилка збереження товарів замовлення:", itemsError);
    throw new Error(itemsError.message);
  }

  return order;
}