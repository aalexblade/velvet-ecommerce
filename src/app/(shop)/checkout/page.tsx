"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicCheckoutForm = dynamic(
  () => import("@/widgets/checkout-form").then((mod) => mod.CheckoutForm),
  {
    ssr: false,
    loading: () => (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-zinc-400 font-sans">
        <div className="animate-pulse flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-full" />
          <div className="h-4 bg-zinc-100 w-48 rounded" />
        </div>
      </div>
    ),
  },
);

export default function CheckoutPage() {
  return <DynamicCheckoutForm />;
}
