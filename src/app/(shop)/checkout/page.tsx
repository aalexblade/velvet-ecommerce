"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useCartStore } from "@/features/cart/model/cartStore";

// Головний внутрішній компонент оформлення замовлення
function CheckoutView() {
  const items = useCartStore((state) => state.items);

  // Обчислюємо загальну вартість товарів
  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const shippingCost = totalPrice >= 2000 ? 0 : 150;
  const grandTotal = totalPrice + shippingCost;

  // Стан, якщо кошик порожній, з урахуванням висоти хедера (pt-32)
  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col items-center justify-center text-center font-sans animate-in fade-in duration-300">
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
      
      {/* --- КНОПКА ПОВЕРНЕННЯ ДО КОШИКА --- */}
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

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* 📝 ЛІВА ЗОНА: ФОРМА ДАНИХ КЛІЄНТА (Займає 7 колонок із 12) */}
        <div className="w-full lg:col-span-7 flex flex-col gap-8">
          
          {/* Секція 1: Контактні дані */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">
                1
              </span>
              <span>Контактна інформація</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">
                  Ім&#39;я *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Введіть ім'я"
                  className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">
                  Прізвище *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Введіть прізвище"
                  className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-zinc-600">
                  Номер телефону *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+380"
                  className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Секція 2: Спосіб доставки */}
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

            {/* Пункти призначення */}
            <div className="grid grid-cols-1 gap-4 mt-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">
                  Місто *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Вкажіть місто"
                  className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">
                  № Відділення Нової Пошти *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Наприклад: Відділення №15"
                  className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Секція 3: Спосіб оплати */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">
                3
              </span>
              <span>Варіанти оплати</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-4 border border-[#C8205C] bg-white rounded-xl cursor-pointer shadow-2xs">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                  className="accent-[#C8205C]"
                />
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <CreditCard className="w-4 h-4 text-zinc-700" />
                  <span>Картка / Apple Pay</span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border border-zinc-200 hover:border-zinc-400 bg-white rounded-xl cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="payment"
                  className="accent-[#C8205C]"
                />
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                  <span>Накладений платіж</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* 📊 ПРАВА ЗОНА: ОГЛЯД ЗАМОВЛЕННЯ (Займає 5 колонок із 12) */}
        {/* Загорнули в ізольований flex-контейнер з sticky без розтягування h-full */}
        <div className="w-full lg:col-span-5 flex flex-col lg:sticky lg:top-28">
          <div className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 pb-2 border-b border-zinc-200">
              Ваше замовлення
            </h2>

            {/* Список товарів */}
            <div className="flex flex-col gap-4 max-h-48 overflow-y-auto pr-1 no-scrollbar border-b border-zinc-200/60 pb-4">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex items-center gap-3 justify-between text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative aspect-3/4 w-10 bg-zinc-200 rounded-md overflow-hidden shrink-0 border border-zinc-200/40">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-zinc-900 truncate">
                        {item.title}
                      </span>
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

            {/* Калькуляція підсумку */}
            <div className="flex flex-col gap-3.5 text-sm border-b border-zinc-200 pb-5">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-light">Вартість товарів</span>
                <span className="font-medium text-zinc-900">
                  {totalPrice.toLocaleString("uk-UA")} UAH
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-light">Доставка</span>
                <span className="font-medium text-zinc-900">
                  {shippingCost === 0 ? "БЕЗКОШТОВНО" : `${shippingCost} UAH`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm font-bold uppercase text-zinc-900">
                  До сплати
                </span>
                <span className="text-lg font-black text-[#C8205C]">
                  {grandTotal.toLocaleString("uk-UA")} UAH
                </span>
              </div>
            </div>

            {/* Кнопка підтвердження */}
            <button
              type="submit"
              className="w-full h-12 bg-[#C8205C] hover:bg-[#a6174a] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Підтвердити замовлення</span>
            </button>

            <p className="text-[10px] text-zinc-400 font-light leading-relaxed text-center">
              Здійснюючи покупку, ви підтверджуєте свою згоду та прийняття умов 
              публічної оферти та правил обслуговування клієнтів нашого бренду.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}

// Повністю захищений експорт без SSR
const DynamicCheckoutPage = dynamic(() => Promise.resolve(CheckoutView), {
  ssr: false,
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-zinc-400 font-sans">
      <div className="animate-pulse flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 bg-zinc-100 rounded-full" />
        <div className="h-4 bg-zinc-100 w-48 rounded" />
      </div>
    </div>
  )
});

export default DynamicCheckoutPage;