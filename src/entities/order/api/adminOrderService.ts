import { createSupabaseBrowserClient } from "@/shared/api/supabase/browserClient";
import type { AdminOrder } from "../model/adminTypes";

export async function fetchAdminOrders(): Promise<AdminOrder[]> {
  const supabase = createSupabaseBrowserClient();

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
    console.error("Error fetching admin orders:", error);
    throw new Error(error.message);
  }

  return (data || []) as AdminOrder[];
}

export async function updateOrderStatus(
  orderId: string,
  status: AdminOrder["status"],
): Promise<void> {
  const supabase = createSupabaseBrowserClient();

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order status:", error);
    throw new Error(error.message);
  }
}
