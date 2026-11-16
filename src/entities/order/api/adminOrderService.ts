import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";
import type { AdminOrder } from "../model/adminTypes";
const supabase = createSupabaseBrowserClient();

export async function fetchAdminOrders(): Promise<AdminOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (*)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Помилка завантаження замовлень для адмінки:", error);
    throw new Error(error.message);
  }

  return data as AdminOrder[];
}

export async function updateOrderStatus(
  orderId: string,
  status: AdminOrder["status"],
): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    console.error(`Помилка оновлення статусу замовлення ${orderId}:`, error);
    throw new Error(error.message);
  }
}
