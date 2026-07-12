"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@/features/cart/model/cartStore";
import { createOrder } from "@/entities/order";
import { fetchNPCities, fetchNPWarehouses, NPCity, NPWarehouse } from "@/shared/api/novaposhta/deliveryService";

function CheckoutView() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  
  // State managers for managing async lifecycle metrics
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Consolidated tracking matrix for the form elements state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    cityRef: "",
    warehouse: "",
    paymentMethod: "card", 
  });

  // Delivery integration state management blocks
  const [cityInput, setCityInput] = useState("");
  const [citiesList, setCitiesList] = useState<NPCity[]>([]);
  const [warehousesList, setWarehousesList] = useState<NPWarehouse[]>([]);
  const [isSearchingCities, setIsSearchingCities] = useState(false);
  const [isSearchingWarehouses, setIsSearchingWarehouses] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Debounce API tracking sequence for real-time city keyword updates
  useEffect(() => {
    // Keep the effect focused purely on async synchronization
    if (cityInput.length < 2 || cityInput === formData.city) {
      return;
    }

    // Set searching state safely inside the asynchronous debounce timer to avoid cascading renders
    const delayDebounceId = setTimeout(async () => {
      setIsSearchingCities(true);
      try {
        const data = await fetchNPCities(cityInput);
        setCitiesList(data);
        setShowCityDropdown(data.length > 0);
      } catch (err) {
        console.error("Error fetching cities:", err);
      } finally {
        setIsSearchingCities(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceId);
  }, [cityInput, formData.city]);

  // Sync and fetch warehouses whenever a valid city selection reference alters
  useEffect(() => {
    if (!formData.cityRef) {
      return;
    }

    const loadWarehouses = async () => {
      setIsSearchingWarehouses(true);
      try {
        const data = await fetchNPWarehouses(formData.cityRef);
        setWarehousesList(data);
      } catch (err) {
        console.error("Error fetching warehouses:", err);
      } finally {
        setIsSearchingWarehouses(false);
      }
    };

    loadWarehouses();
  }, [formData.cityRef]);

  // Calculate billing parameters across active shopping bag line items
  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const shippingCost = totalPrice >= 2000 ? 0 : 150;
  const grandTotal = totalPrice + shippingCost;

  // React state synchronous tracking callback change pipeline handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Dedicated handler for city input text changes to safely update lists outside effects
  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityInput(value);
    
    if (value.length < 2) {
      setCitiesList([]);
      setShowCityDropdown(false);
    }
  };

  // State transaction coordinator for dynamic toggle of payment configurations
  const handlePaymentChange = (method: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  // Callback context to map exact selection row for requested city entities
  const handleSelectCity = (city: NPCity) => {
    setFormData((prev) => ({
      ...prev,
      city: city.Description,
      cityRef: city.Ref,
      warehouse: "", 
    }));
    setCityInput(city.Description);
    setCitiesList([]); 
    setShowCityDropdown(false);
  };

  // Main submission pipeline workflow to commit state changes directly into Supabase instances
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    if (!formData.cityRef || !formData.warehouse) {
      setErrorMessage("Будь ласка, оберіть коректне місто та відділення Нової Пошти зі списку.");
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Construct parent data record structure payload for orders table mapping
      const orderPayload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        city: formData.city,
        delivery_warehouse: formData.warehouse,
        payment_method: formData.paymentMethod,
        total_price: totalPrice,
        shipping_cost: shippingCost,
        grand_total: grandTotal,
      };

      // 2. Map responsive frontend collections into atomic bulk line-item data structures
      const itemsPayload = items.map((item) => ({
        variant_id: item.variantId,
        title: item.title,
        color: item.color || "Default",
        size: item.size || "Default",
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      // 3. Fire atomic multi-table persistence transaction sequence via entities layer service
      await createOrder(orderPayload, itemsPayload);

      // 4. Reset checkout lifecycle data matrices inside global client Zustand state streams
      clearCart();

      // 5. Direct client view stream to fallback routes upon complete workflow success validation
      router.push("/?ordered=true");
      alert("Дякуємо! Ваше замовлення успішно оформлено.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An error occurred while processing your order request pipeline.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center font-sans animate-in fade-in duration-300">
        <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mx-auto mb-4">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider mb-2">
          Немає товарів для оформлення
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          Будь ласка, додайте вишукані товари до вашого кошика перед покупкою.
        </p>
        <Link
          href="/catalog"
          className="inline-block bg-[#C8205C] hover:bg-[#a6174a] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-md transition-all cursor-pointer"
        >
          Перейти до каталогу
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 font-sans text-zinc-900 animate-in fade-in duration-300">
      
      {/* --- BACK NAVIGATION ROUTE BAR --- */}
      <div className="mb-6">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
          <span>Повернутися до кошика</span>
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-8 text-left">
        Оформлення замовлення
      </h1>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* 📝 LEFT ZONE: CUSTOMER INFORMATION FORM BLOCK */}
        <div className="w-full lg:col-span-7 flex flex-col gap-8">
          
          {/* Section 1: Contact Details */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">
                1
              </span>
              <span>Контактна інформація</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">Ім&#39;я *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Введіть ім'я"
                  className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">Прізвище *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Введіть прізвище"
                  className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-zinc-600">Номер телефону *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+380"
                  className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Specifics */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">
                2
              </span>
              <span>Деталі доставки</span>
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <label className="flex items-center justify-between p-4 border border-[#C8205C] bg-white rounded-xl cursor-pointer shadow-2xs">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    defaultChecked
                    className="mt-1 accent-[#C8205C]"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-zinc-700" /> Нова Пошта (Відділення)
                    </span>
                    <span className="text-xs text-zinc-500 mt-0.5 font-light">
                      Доставка до будь-якого зручного відділення по всій Україні.
                    </span>
                  </div>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-1 relative">
              {/* Interactive Autocomplete City Input Element */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-xs font-medium text-zinc-600">Місто *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cityInput}
                    onChange={handleCityInputChange}
                    onFocus={() => citiesList.length > 0 && setShowCityDropdown(true)}
                    placeholder="Почніть вводити місто (напр. Київ)"
                    className="w-full h-10 px-3 pr-10 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors"
                  />
                  {isSearchingCities && (
                    <Loader2 className="w-4 h-4 animate-spin absolute right-3 top-3 text-zinc-400" />
                  )}
                </div>

                {/* City Selection Dropdown Floating Panel */}
                {showCityDropdown && citiesList.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-zinc-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-50">
                    {citiesList.map((city) => (
                      <div
                        key={city.Ref}
                        onClick={() => handleSelectCity(city)}
                        className="px-3 py-2 text-sm hover:bg-zinc-50 cursor-pointer text-zinc-900 border-b border-zinc-100 last:border-0"
                      >
                        {city.Description}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic Selective Dropdown for Warehouses Rows mapping */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">№ Відділення Нової Пошти *</label>
                <div className="relative">
                  <select
                    name="warehouse"
                    required
                    disabled={!formData.cityRef || isSearchingWarehouses}
                    value={formData.warehouse}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 border border-zinc-200 rounded-md text-sm bg-white focus:outline-none focus:border-[#C8205C] transition-colors disabled:opacity-50 disabled:bg-zinc-50 cursor-pointer appearance-none"
                  >
                    <option value="">
                      {isSearchingWarehouses 
                        ? "Завантаження відділень..." 
                        : !formData.cityRef 
                        ? "Спочатку оберіть місто" 
                        : "Оберіть відділення зі списку"}
                    </option>
                    {warehousesList.map((wh) => (
                      <option key={wh.Ref} value={wh.Description}>
                        {wh.Description}
                      </option>
                    ))}
                  </select>
                  {isSearchingWarehouses && (
                    <Loader2 className="w-4 h-4 animate-spin absolute right-3 top-3 text-zinc-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Type Selectors */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">
                3
              </span>
              <span>Варіанти оплати</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => handlePaymentChange("card")}
                className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.paymentMethod === "card"
                    ? "border-[#C8205C] bg-white shadow-2xs"
                    : "border-zinc-200 bg-white hover:border-zinc-400"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === "card"}
                  onChange={() => {}}
                  className="accent-[#C8205C]"
                />
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <CreditCard className="w-4 h-4 text-zinc-700" />
                  <span>Картка / Apple Pay</span>
                </div>
              </div>

              <div
                onClick={() => handlePaymentChange("cash")}
                className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.paymentMethod === "cash"
                    ? "border-[#C8205C] bg-white shadow-2xs"
                    : "border-zinc-200 bg-white hover:border-zinc-400"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === "cash"}
                  onChange={() => {}}
                  className="accent-[#C8205C]"
                />
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                  <span>Накладений платіж</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📊 RIGHT ZONE: LIVE REALTIME ORDER BILLING INSIGHTS CARD */}
        <div className="w-full lg:col-span-5 flex flex-col lg:sticky lg:top-28">
          <div className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 pb-2 border-b border-zinc-200">
              Ваше замовлення
            </h2>

            <div className="flex flex-col gap-4 max-h-48 overflow-y-auto pr-1 no-scrollbar border-b border-zinc-200/60 pb-4">
              {items.map((item) => (
                <div key={item.variantId} className="flex items-center gap-3 justify-between text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative aspect-3/4 w-10 bg-zinc-200 rounded-md overflow-hidden shrink-0 border border-zinc-200/40">
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-zinc-900 truncate">{item.title}</span>
                      <span className="text-[10px] text-zinc-400 font-light mt-0.5">
                        Розмір: {item.size} • Кіл-ть: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-zinc-900 shrink-0 ml-2">
                    {(item.price * item.quantity).toLocaleString("uk-UA")} UAH
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3.5 text-sm border-b border-zinc-200 pb-5">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-light">Вартість товарів</span>
                <span className="font-medium text-zinc-900">{totalPrice.toLocaleString("uk-UA")} UAH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-light">Доставка</span>
                <span className="font-medium text-zinc-900">
                  {shippingCost === 0 ? "БЕЗКОШТОВНО" : `${shippingCost} UAH`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm font-bold uppercase text-zinc-900">До сплати</span>
                <span className="text-lg font-black text-[#C8205C]">{grandTotal.toLocaleString("uk-UA")} UAH</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#C8205C] hover:bg-[#a6174a] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>{isSubmitting ? "Обробка..." : "Підтвердити замовлення"}</span>
            </button>

            <p className="text-[10px] text-zinc-400 font-light leading-relaxed text-center">
              Здійснюючи покупку, ви підтверджуєте свою згоду та прийняття умов 
              публічної оферти та правил обслуговування клієнтів нашого бренду.
            </p>
          </div>
        </div>

      </form>
    </main>
  );
}

const DynamicCheckoutPage = dynamic(() => Promise.resolve(CheckoutView), {
  ssr: false,
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-zinc-400 font-sans">
      <div className="animate-pulse flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 bg-zinc-100 rounded-full" />
        <div className="h-4 bg-zinc-100 w-48 rounded" />
      </div>
    </div>
  ),
});

export default DynamicCheckoutPage;