export interface CreateOrderPayload {
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  delivery_warehouse: string;
  payment_method: string;
  total_price: number;
  shipping_cost: number;
  grand_total: number;
}

export interface CreateOrderItemPayload {
  variant_id: string;
  title: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}