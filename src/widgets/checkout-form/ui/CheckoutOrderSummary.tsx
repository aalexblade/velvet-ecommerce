"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Loader2 } from "lucide-react";
import type { CartItem } from "@/entities/cart";

type CheckoutOrderSummaryProps = {
  items: CartItem[];
  totalPrice: number;
  shippingCost: number;
  grandTotal: number;
  isSubmitting: boolean;
};

export function CheckoutOrderSummary({
  items,
  totalPrice,
  shippingCost,
  grandTotal,
  isSubmitting,
}: CheckoutOrderSummaryProps) {
  return (
    <div className="w-full lg:col-span-5 flex flex-col lg:sticky lg:top-28">
      <div className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 pb-2 border-b border-zinc-200">
          Ваше замовлення
        </h2>

        <div className="flex flex-col gap-4 max-h-48 overflow-y-auto pr-1 no-scrollbar border-b border-zinc-200/60 pb-4">
          {items.map((item) => (
            <div
              key={String(item.variantId)}
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
          <span>
            {isSubmitting ? "Обробка..." : "Підтвердити замовлення"}
          </span>
        </button>

        <p className="text-[10px] text-zinc-400 font-light leading-relaxed text-center">
          Здійснюючи покупку, ви підтверджуєте свою згоду та прийняття умов
          публічної оферти та правил обслуговування клієнтів нашого бренду.
        </p>
      </div>
    </div>
  );
}