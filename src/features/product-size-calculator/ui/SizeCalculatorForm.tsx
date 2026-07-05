"use client";

import { useState } from "react";
import { measurementFields } from "../model/config";
import { getSuggestedSize } from "../lib/getSuggestedSize";
import { SuggestedSize } from "../model/types";
import { MeasurementInput } from "./MeasurementInput";
import Link from "next/link";

export interface SizeCalculatorFormProps {
  onSizeCalculated?: (size: string) => void;
}

/**
 * SizeCalculatorForm
 * 
 * Refactored for a vertical input stack and responsive action row.
 * Adheres to premium UI specs with 100% width fields and clear result labeling.
 */
export const SizeCalculatorForm = ({ onSizeCalculated }: SizeCalculatorFormProps) => {
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

    if (suggestedSize && onSizeCalculated) {
      onSizeCalculated(suggestedSize);
    }
  };

  const isFormFilled = values.overbust !== "" && values.underbust !== "" && values.hips !== "";

  return (
    <div className="flex flex-col w-full max-w-2xl font-sans">
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
        <div className="mt-6 mb-4 w-full block animate-in fade-in duration-200">
          {result ? (
            <p className="text-zinc-900 font-medium text-lg">
              Ваш розмір: <span className="text-[#C8205C] font-bold text-xl">{result}</span>
            </p>
          ) : (
            <p className="text-red-600 font-medium text-sm md:text-base">
              На жаль, ми не змогли підібрати розмір за вказаними параметрами.
            </p>
          )}
        </div>
      )}

      {/* Actions Row: Responsive layout with flex-balancing */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full">
        <button
          onClick={handleCalculate}
          disabled={!isFormFilled}
          className="w-full sm:w-auto bg-[#C8205C] hover:bg-[#a6174a] disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed text-white px-10 h-12 rounded-lg font-semibold transition-all active:scale-95 cursor-pointer uppercase tracking-wider text-xs"
        >
          Розрахувати
        </button>
        
        <Link 
          href="/catalog" 
          className="w-full sm:flex-1 flex items-center justify-center px-6 h-12 rounded-lg border border-zinc-300 text-zinc-700 font-semibold hover:bg-zinc-50 hover:text-zinc-900 transition-all active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap"
        >
          Знайти мій розмір в каталозі
        </Link>
      </div>
    </div>
  );
};