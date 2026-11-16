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