"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/features/cart/model/cartStore";

// Головний внутрішній компонент відображення кошика
function CartView() {
  const { items, updateQuantity, removeFromCart } = useCartStore();

  // Обчислюємо проміжний підсумок
  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);
  
  // Умови бренду: безкоштовна доставка від 2000 UAH
  const shippingCost = totalPrice >= 2000 || totalPrice === 0 ? 0 : 150;
  const grandTotal = totalPrice + shippingCost;

  // Стан порожнього кошика
  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center font-sans animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-zinc-50 border border-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mb-6 shadow-xs">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-zinc-900 uppercase tracking-wider mb-2">
          Ваш кошик порожній
        </h1>
        <p className="text-sm text-zinc-500 max-w-sm leading-relaxed mb-8">
          Дослідіть наші колекції білизни, щоб знайти своє ідеальне поєднання вишуканого стилю та підтримки.
        </p>
        <Link 
          href="/catalog" 
          className="bg-[#C8205C] hover:bg-[#a6174a] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-md shadow-sm transition-all cursor-pointer"
        >
          Перейти до каталогу
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-zinc-900 animate-in fade-in duration-300">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-8">
        Кошик покупок
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* 🛒 ЛІВА ЗОНА: СПИСОК ТОВАРІВ */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {items.map((item) => (
            <div 
              key={item.variantId} 
              className="flex gap-4 sm:gap-6 pb-6 border-b border-zinc-100 last:border-0 last:pb-0 items-start group"
            >
              {/* Фото товару */}
              <div className="relative aspect-3/4 w-24 sm:w-28 bg-zinc-50 border border-zinc-100 rounded-lg overflow-hidden shrink-0">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 96px, 112px"
                  unoptimized
                />
              </div>

              {/* Інформація */}
              <div className="flex flex-col flex-1 gap-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="text-sm sm:text-base font-semibold text-zinc-900 line-clamp-1 group-hover:text-[#C8205C] transition-colors">
                    {item.title}
                  </h2>
                  <button 
                    onClick={() => removeFromCart(item.variantId)}
                    className="p-1 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer shrink-0"
                    aria-label="Видалити товар"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Обрані параметри */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-normal">Колір:</span>
                    <span className="font-medium text-zinc-900">{item.color}</span>
                  </div>
                  <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <span className="font-normal">Розмір:</span>
                    <span className="font-medium text-zinc-900">{item.size}</span>
                  </div>
                </div>

                {/* Керування кількістю та ціна */}
                <div className="flex items-center justify-between mt-5 gap-4 flex-wrap">
                  <div className="flex items-center border border-zinc-300 rounded-md h-8 bg-white">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2.5 h-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-semibold select-none">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="px-2.5 h-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-sm font-bold text-zinc-900">
                    {(item.price * item.quantity).toLocaleString("uk-UA")} UAH
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 📊 ПРАВА ЗОНА: БЛОК ПІДСУМКУ ЗАМОВЛЕННЯ */}
        <div className="lg:col-span-5 bg-zinc-50 border border-zinc-100 rounded-2xl p-6 md:p-8 sticky top-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-6 pb-2 border-b border-zinc-200">
            Підсумок замовлення
          </h2>

          <div className="flex flex-col gap-4 text-sm mb-6">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Вартість товарів</span>
              <span className="font-semibold text-zinc-900">{totalPrice.toLocaleString("uk-UA")} UAH</span>
            </div>

            <div className="flex flex-col gap-1.5 pb-4 border-b border-zinc-200">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Доставка</span>
                <span className="font-semibold text-zinc-900">
                  {shippingCost === 0 ? "БЕЗКОШТОВНО" : `${shippingCost} UAH`}
                </span>
              </div>
              {shippingCost > 0 && (
                <p className="text-[11px] text-zinc-400 font-light leading-snug">
                  Додайте товарів ще на <strong className="font-medium text-[#C8205C]">{(2000 - totalPrice).toLocaleString("uk-UA")} UAH</strong>, щоб отримати безкоштовну доставку.
                </p>
              )}
            </div>

            <div className="flex justify-between items-baseline pt-2">
              <span className="text-base font-bold uppercase text-zinc-900">Загалом</span>
              <span className="text-xl font-black text-[#C8205C]">{grandTotal.toLocaleString("uk-UA")} UAH</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full h-12 bg-[#C8205C] hover:bg-[#a6174a] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Оформити замовлення</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="mt-6 text-center">
            <Link 
              href="/catalog" 
              className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-medium underline underline-offset-4 cursor-pointer"
            >
              Продовжити покупки
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

// Рендеримо кошик виключно на клієнті, що повністю знімає проблему помилок гідратації без використання useEffect
const DynamicCartPage = dynamic(() => Promise.resolve(CartView), {
  ssr: false,
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-zinc-400 font-sans">
      <div className="animate-pulse flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 bg-zinc-100 rounded-full" />
        <div className="h-4 bg-zinc-100 w-48 rounded" />
      </div>
    </div>
  )
});

export default DynamicCartPage;