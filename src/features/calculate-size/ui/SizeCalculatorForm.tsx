"use client";

import { useState } from "react";
import { Button } from "@/shared/ui";
import { measurementFields } from "../model/config";
import { getSuggestedSize } from "../lib/getSuggestedSize";
import { SuggestedSize } from "../model/types";
import { MeasurementInput } from "./MeasurementInput";
import Link from "next/link";

/**
 * SizeCalculatorForm
 * 
 * Refactored for a vertical input stack and responsive action row.
 * Adheres to premium UI specs with 100% width fields and clear result labeling.
 */
export const SizeCalculatorForm = () => {
  const [values, setValues] = useState<Record<string, string>>({
    overbust: "",
    underbust: "",
    hips: "",
  });
  const [result, setResult] = useState<SuggestedSize>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setHasCalculated(false);
  };

  const handleCalculate = () => {
    const underbust = parseFloat(values.underbust);
    const overbust = parseFloat(values.overbust);
    
    const suggestedSize = getSuggestedSize(underbust, overbust);
    setResult(suggestedSize);
    setHasCalculated(true);
  };

  const isFormFilled = values.overbust !== "" && values.underbust !== "" && values.hips !== "";

  return (
    <div className="flex flex-col w-full max-w-2xl">
      {/* Vertical Input Stack: 100% width fields */}
      <div className="flex flex-col gap-4 w-full">
        {measurementFields.map((field) => (
          <MeasurementInput
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={(val) => handleInputChange(field.key, val)}
          />
        ))}
      </div>

      {/* Dynamic Result Display: Positioned between inputs and actions */}
      {hasCalculated && (
        <div className="mt-6 mb-4 w-full block">
          {result ? (
            <p className="text-[#121212] font-medium text-lg">
              Ваш розмір: <span className="text-[#c31f5c] font-bold">{result}</span>
            </p>
          ) : (
            <p className="text-destructive font-medium text-sm md:text-base">
              На жаль, ми не змогли підібрати розмір за вказаними параметрами.
            </p>
          )}
        </div>
      )}

      {/* Actions Row: Responsive layout with flex-balancing */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-6 w-full">
        <Button
          onClick={handleCalculate}
          disabled={!isFormFilled}
          className="w-full md:w-auto bg-[#c31f5c] text-white hover:bg-[#b01a52] px-10 h-12 rounded-lg font-semibold transition-all active:scale-95 cursor-pointer"
        >
          Розрахувати
        </Button>
        
        <Link 
          href="/catalog" 
          className="w-full md:flex-1 flex items-center justify-center px-6 h-12 rounded-lg border border-[#c31f5c] text-[#121212] font-semibold hover:bg-[#c31f5c]/5 transition-all active:scale-95 text-sm md:text-base whitespace-nowrap"
        >
          Знайти мій розмір в каталозі
        </Link>
      </div>
    </div>
  );
};
