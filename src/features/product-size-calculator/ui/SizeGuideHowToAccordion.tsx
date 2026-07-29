"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const SizeGuideHowToAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mt-4 border-t border-border/50 pt-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors py-1 cursor-pointer"
      >
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-accent" />
          Як правильно зняти мірки?
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2.5 text-xs text-muted-foreground animate-in fade-in duration-200 bg-muted/30 p-3.5 rounded-xl border border-border/40">
          <div>
            <span className="font-semibold text-foreground">1. Обхват під грудьми:</span>
            <p className="mt-0.5 leading-relaxed">
              Вимірюється паралельно підлозі строго під грудьми на видиху, стрічка має щільно прилягати.
            </p>
          </div>
          <div>
            <span className="font-semibold text-foreground">2. Обхват по грудях:</span>
            <p className="mt-0.5 leading-relaxed">
              Вимірюється по найвиступаючих точках грудей у зручному бюстгальтері без пуш-апу.
            </p>
          </div>
          <div>
            <span className="font-semibold text-foreground">3. Обхват стегон:</span>
            <p className="mt-0.5 leading-relaxed">
              Вимірюється по найвиступаючих точках сідниць паралельно підлозі.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};