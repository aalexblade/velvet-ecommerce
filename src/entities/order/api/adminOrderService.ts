import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";

// 🌟 Initialize the browser client instance securely
const supabase = createSupabaseBrowserClient();

export interface AdminOrderItem {
  id: string;
  order_id: string;
  variant_id: string;
  title: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface AdminOrder {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  delivery_warehouse: string;
  payment_method: string;
  total_price: number;
  shipping_cost: number;
  grand_total: number;
  status: "new" | "processing" | "shipped" | "cancelled";
  order_items?: AdminOrderItem[];
}

// 1. Отримання всіх замовлень разом із замовленими товарами (JOIN)
export async function fetchAdminOrders(): Promise<AdminOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Помилка завантаження замовлень для адмінки:", error);
    throw new Error(error.message);
  }

  return data as AdminOrder[];
}

// 2. Оновлення статусу конкретного замовлення
export async function updateOrderStatus(
  orderId: string, 
  status: AdminOrder["status"]
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