"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  orderId: string | null;
  onClose: () => void;
}

export function CheckoutSuccessModal({
  isOpen,
  orderId,
  onClose,
}: CheckoutSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-99 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 flex flex-col items-center text-center shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-900 transition-colors p-1 rounded-full hover:bg-zinc-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-xl font-bold uppercase tracking-wide text-zinc-900 mb-2">
          Замовлення оформлено!
        </h3>

        <p className="text-sm text-zinc-500 font-light leading-relaxed mb-6">
          Дякуємо за покупку у Velvet Secrets. Наш менеджер незабаром
          зв&#39;яжеться з вами для підтвердження деталей відправки.
        </p>

        {orderId && (
          <div className="w-full bg-zinc-50 border border-zinc-100 rounded-xl py-3 px-4 mb-8">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
              Номер вашого замовлення
            </span>
            <span className="text-sm font-mono font-bold text-zinc-800 mt-1 block">
              {orderId}
            </span>
          </div>
        )}

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full h-11 bg-[#C8205C] hover:bg-[#a6174a] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Повернутися до покупок
          </button>
          <button
            onClick={onClose}
            className="w-full h-11 border border-zinc-200 hover:border-zinc-900 text-zinc-600 hover:text-zinc-900 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}
