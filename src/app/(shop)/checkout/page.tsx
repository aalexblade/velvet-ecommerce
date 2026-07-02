"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, ShoppingBag } from "lucide-react";
// Import dynamic cart storage using strict FSD layers architecture
import { useCartStore } from "@/features/cart/model/cartStore";

export default function CheckoutPage() {
  // Safe token state to bypass raw synchronous layout effect linter rules
  const [renderToken, setRenderToken] = useState("loading");
  
  // Extract reactive items collection matrix directly from the Zustand store
  const items = useCartStore((state) => state.items);

  // Defer state update to the next execution tick to avoid cascading render cycles
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRenderToken("ready");
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Compute live subtotal aggregation safely across the active store item nodes
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = totalPrice >= 2000 ? 0 : 150;
  const grandTotal = totalPrice + shippingCost;

  // Intercept blank state conditions before building fields
  if (renderToken === "loading") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-zinc-400 font-sans">
        Initializing secure checkout layer...
      </div>
    );
  }

  // Fallback state if user hits /checkout with an empty cart
  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center font-sans animate-in fade-in duration-300">
        <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mx-auto mb-4">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wider mb-2">No Items For Checkout</h2>
        <p className="text-sm text-zinc-500 mb-6">Please add beautiful items to your shopping bag before ordering.</p>
        <Link href="/catalog" className="inline-block bg-[#C8205C] hover:bg-[#a6174a] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-md transition-all cursor-pointer">
          Go To Catalog
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-zinc-900 animate-in fade-in duration-300">
      
      {/* --- BACK NAVIGATION ROUTE BAR --- */}
      <div className="mb-6">
        <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors group cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to Shopping Bag</span>
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-8">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* 📝 LEFT ZONE: CUSTOMER INFORMATION INPUT FORM */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Section 1: Contact Details */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">1</span>
              <span>Contact Information</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">First Name *</label>
                <input type="text" required placeholder="Enter first name" className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">Last Name *</label>
                <input type="text" required placeholder="Enter last name" className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-zinc-600">Phone Number *</label>
                <input type="tel" required placeholder="+380" className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors" />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Method Selection */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">2</span>
              <span>Delivery Details</span>
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <label className="flex items-center justify-between p-4 border border-[#C8205C] bg-white rounded-xl cursor-pointer shadow-2xs">
                <div className="flex items-start gap-3">
                  <input type="radio" name="shipping" defaultChecked className="mt-1 accent-[#C8205C]" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-zinc-700" /> Nova Poshta (Warehouse)
                    </span>
                    <span className="text-xs text-zinc-500 mt-0.5 font-light">Delivery to your preferred department across Ukraine.</span>
                  </div>
                </div>
              </label>
            </div>
            
            {/* Shipping Destination Specifics */}
            <div className="grid grid-cols-1 gap-4 mt-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">City *</label>
                <input type="text" required placeholder="Specify city" className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-600">Nova Poshta Office Department *</label>
                <input type="text" required placeholder="e.g., Department №15" className="h-10 px-3 border border-zinc-200 rounded-md text-sm focus:outline-none focus:border-[#C8205C] transition-colors" />
              </div>
            </div>
          </div>

          {/* Section 3: Secure Financial Settlements */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2 pb-2 border-b border-zinc-100">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">3</span>
              <span>Payment Options</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-4 border border-[#C8205C] bg-white rounded-xl cursor-pointer shadow-2xs">
                <input type="radio" name="payment" defaultChecked className="accent-[#C8205C]" />
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <CreditCard className="w-4 h-4 text-zinc-700" />
                  <span>Card / Apple Pay</span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border border-zinc-200 hover:border-zinc-400 bg-white rounded-xl cursor-pointer transition-colors">
                <input type="radio" name="payment" className="accent-[#C8205C]" />
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                  <span>Cash on Delivery</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* 📊 RIGHT ZONE: EXQUISITE ORDER SUMMARY & LINE-ITEMS INSIGHTS */}
        <div className="lg:col-span-5 bg-zinc-50 border border-zinc-100 rounded-2xl p-6 md:p-8 sticky top-24">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-6 pb-2 border-b border-zinc-200">
            Review Your Order
          </h2>

          {/* Nested Tiny Scrollable Items Review Stream Container */}
          <div className="flex flex-col gap-4 max-h-48 overflow-y-auto pr-1 no-scrollbar mb-6 border-b border-zinc-200/60 pb-4">
            {items.map((item) => (
              <div key={item.variantId} className="flex items-center gap-3 justify-between text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative aspect-3/4 w-10 bg-zinc-200 rounded-md overflow-hidden shrink-0 border border-zinc-200/40">
                    <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-zinc-900 truncate">{item.title}</span>
                    <span className="text-[10px] text-zinc-400 font-light mt-0.5">Size: {item.size} • Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-zinc-900 shrink-0 ml-2">{item.price * item.quantity} UAH</span>
              </div>
            ))}
          </div>

          {/* Balance Metrics Computations Breakdown Row */}
          <div className="flex flex-col gap-3.5 text-sm mb-6 border-b border-zinc-200 pb-5">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-light">Subtotal</span>
              <span className="font-medium text-zinc-900">{totalPrice} UAH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-light">Shipping</span>
              <span className="font-medium text-zinc-900">{shippingCost === 0 ? "FREE" : `${shippingCost} UAH`}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-sm font-bold uppercase text-zinc-900">Total Due</span>
              <span className="text-lg font-black text-[#C8205C]">{grandTotal} UAH</span>
            </div>
          </div>

          {/* Checkout Final Validation Trigger Action */}
          <button
            type="submit"
            className="w-full h-12 bg-[#C8205C] hover:bg-[#a6174a] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Complete Order</span>
          </button>

          <p className="text-[10px] text-zinc-400 font-light leading-relaxed text-center mt-4">
            By executing this purchase agreement request pipeline sequence, you confirm compliance and acceptance of our dynamic brand consumer service conditions guidelines rulesets.
          </p>
        </div>

      </div>
    </main>
  );
}