"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  fetchAdminOrders,
  updateOrderStatus,
  AdminOrder,
  AdminOrderItem,
} from "@/entities/order/api/adminOrderService";
import {
  Loader2,
  ChevronDown,
  ChevronUp,
  Phone,
  MapPin,
  CreditCard,
  ShoppingBag,
  Calendar,
  RefreshCw,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for expanded order details accordion
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {},
  );

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Avoid calling setState synchronously in the effect body by keeping fetch async-bound
  useEffect(() => {
    let isMounted = true;

    const loadOrdersData = async () => {
      try {
        const data = await fetchAdminOrders();
        if (isMounted) {
          setOrders(data);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Невідома помилка завантаження замовлень.",
          );
          setLoading(false);
        }
      }
    };

    loadOrdersData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const data = await fetchAdminOrders();
      setOrders(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Невідома помилка оновлення даних.",
      );
    } finally {
      setRefreshing(false);
    }
  };

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleStatusChange = async (
    orderId: string,
    newStatus: AdminOrder["status"],
  ) => {
    try {
      // Optimistic update locally
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
      await updateOrderStatus(orderId, newStatus);
    } catch (err: unknown) {
      console.error("Помилка при зміні статусу замовлення:", err);
      alert("Не вдалося оновити статус у базі даних. Спробуйте ще раз.");
      // Rollback status update trigger to server state securely
      try {
        const data = await fetchAdminOrders();
        setOrders(data);
      } catch (fetchErr) {
        console.error("Не вдалося синхронізувати дані з сервером:", fetchErr);
      }
    }
  };

  // Helper translations and styles for logistics statuses
  const statusConfig = {
    new: { label: "Нове", color: "bg-blue-50 text-blue-700 border-blue-200" },
    processing: {
      label: "В обробці",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    shipped: {
      label: "Відправлено",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    cancelled: {
      label: "Скасовано",
      color: "bg-rose-50 text-rose-700 border-rose-200",
    },
  };

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((order: AdminOrder) => order.status === statusFilter);
  }, [orders, statusFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#C8205C]" />
          <span className="text-sm text-zinc-500">
            Завантаження замовлень Velvet Secrets...
          </span>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 font-sans text-zinc-900">
      {/* --- HEADER BLOCK --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-100 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">
            Панель замовлень
          </h1>
          <p className="text-xs text-zinc-500 font-light mt-1">
            Керування замовленнями, статусами доставки та клієнтськими даними
            Velvet Secrets.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 self-start sm:self-center h-10 px-4 border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#C8205C]" : ""}`}
          />
          <span>Оновити дані</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          Помилка: {error}
        </div>
      )}

      {/* --- FILTER CONTROL TAB BAR --- */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {(["all", "new", "processing", "shipped", "cancelled"] as const).map(
          (status) => {
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#C8205C] text-white border-[#C8205C] shadow-xs"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                }`}
              >
                {status === "all"
                  ? "Всі замовлення"
                  : statusConfig[status].label}
                <span className="ml-1.5 opacity-60 text-[10px]">
                  (
                  {status === "all"
                    ? orders.length
                    : orders.filter((o: AdminOrder) => o.status === status)
                        .length}
                  )
                </span>
              </button>
            );
          },
        )}
      </div>

      {/* --- ORDERS LIST GRID --- */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
          <ShoppingBag className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
          <p className="text-sm text-zinc-500 font-medium">
            Замовлень із таким статусом не знайдено.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order: AdminOrder) => {
            const isExpanded = !!expandedOrders[order.id];
            const currentStatus = order.status || "new";

            return (
              <div
                key={order.id}
                className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
                  isExpanded
                    ? "shadow-md border-[#C8205C]/30"
                    : "hover:border-zinc-300 border-zinc-200/80"
                }`}
              >
                {/* Accordion Row Header */}
                <div
                  onClick={() => toggleOrderExpand(order.id)}
                  className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none bg-zinc-50/30 hover:bg-zinc-50/80 transition-colors"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                    {/* Order Meta */}
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                        Номер замовлення
                      </span>
                      <span className="text-xs font-mono font-bold text-zinc-800 mt-1 truncate max-w-36">
                        {order.id}
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                        Клієнт
                      </span>
                      <span className="text-sm font-semibold text-zinc-950 mt-1">
                        {order.first_name} {order.last_name}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                        Дата створення
                      </span>
                      <span className="text-xs text-zinc-600 mt-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {new Date(order.created_at).toLocaleDateString(
                          "uk-UA",
                        )}{" "}
                        {new Date(order.created_at).toLocaleTimeString(
                          "uk-UA",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </span>
                    </div>

                    {/* Grand Total Pricing */}
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                        До сплати
                      </span>
                      <span className="text-sm font-black text-[#C8205C] mt-1">
                        {order.grand_total.toLocaleString("uk-UA")} UAH
                      </span>
                    </div>
                  </div>

                  {/* Status Badges + Controls */}
                  <div
                    className="flex items-center gap-3 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={currentStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value as AdminOrder["status"],
                        )
                      }
                      className={`h-9 px-3 text-xs font-bold uppercase tracking-wider rounded-lg border focus:outline-none cursor-pointer ${
                        statusConfig[currentStatus].color
                      }`}
                    >
                      <option value="new">Нове</option>
                      <option value="processing">В обробці</option>
                      <option value="shipped">Відправлено</option>
                      <option value="cancelled">Скасовано</option>
                    </select>

                    <button
                      onClick={() => toggleOrderExpand(order.id)}
                      className="p-1.5 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-900 cursor-pointer"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Accordion Expanded Details Body */}
                {isExpanded && (
                  <div className="p-4 md:p-6 border-t border-zinc-100 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-top-2 duration-200">
                    {/* Left: Client Contact Details & Delivery */}
                    <div className="lg:col-span-5 flex flex-col gap-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100">
                        Інформація про доставку та отримувача
                      </h4>

                      <div className="flex flex-col gap-4 text-sm">
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs text-zinc-400">
                              Номер телефону
                            </span>
                            <a
                              href={`tel:${order.phone}`}
                              className="font-semibold text-zinc-900 hover:text-[#C8205C] transition-colors"
                            >
                              {order.phone}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs text-zinc-400">
                              Адреса (Нова Пошта)
                            </span>
                            <span className="font-semibold text-zinc-900">
                              м. {order.city}
                            </span>
                            <span className="text-xs text-zinc-500 font-light mt-0.5">
                              {order.delivery_warehouse}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CreditCard className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs text-zinc-400">
                              Метод оплати
                            </span>
                            <span className="font-semibold text-zinc-900 uppercase">
                              {order.payment_method === "card"
                                ? "Картка / Apple Pay"
                                : "Накладений платіж"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Items Collection */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100">
                        Список товарів ({order.order_items?.length || 0})
                      </h4>

                      <div className="flex flex-col gap-3">
                        {order.order_items?.map((item: AdminOrderItem) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-4 p-3 border border-zinc-100 rounded-lg hover:bg-zinc-50/50 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative aspect-3/4 w-12 bg-zinc-100 rounded-md overflow-hidden shrink-0 border border-zinc-100">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold text-zinc-900 truncate">
                                  {item.title}
                                </span>
                                <span className="text-xs text-zinc-400 font-light mt-0.5">
                                  Колір: {item.color} • Розмір: {item.size} •
                                  Кіл-ть: {item.quantity} шт.
                                </span>
                              </div>
                            </div>
                            <span className="text-sm font-black text-zinc-900 shrink-0">
                              {(item.price * item.quantity).toLocaleString(
                                "uk-UA",
                              )}{" "}
                              UAH
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Subtotals info */}
                      <div className="bg-zinc-50/50 rounded-xl p-4 border border-zinc-100 text-xs flex flex-col gap-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">
                            Вартість товарів:
                          </span>
                          <span className="font-semibold text-zinc-900">
                            {order.total_price.toLocaleString("uk-UA")} UAH
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Доставка:</span>
                          <span className="font-semibold text-zinc-900">
                            {order.shipping_cost === 0
                              ? "Безкоштовно"
                              : `${order.shipping_cost} UAH`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm font-black text-[#C8205C] pt-2 border-t border-zinc-200/60 mt-1">
                          <span>Загальна сума:</span>
                          <span>
                            {order.grand_total.toLocaleString("uk-UA")} UAH
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
