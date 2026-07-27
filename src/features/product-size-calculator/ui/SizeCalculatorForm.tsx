"use client";

import { useState } from "react";
import { measurementFields } from "../model/config";
import { getSuggestedSize } from "../lib/getSuggestedSize";
import { SuggestedSize } from "../model/types";
import { MeasurementInput } from "./MeasurementInput";

export interface SizeCalculatorFormProps {
  onSizeCalculated?: (size: string) => void;
  onApplyFilter?: (size: string) => void;
}

export const SizeCalculatorForm = ({
  onSizeCalculated,
  onApplyFilter,
}: SizeCalculatorFormProps) => {
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

  const handleCalculate = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent form submission and page refresh
    e.preventDefault();

    // Collect all valid numerical inputs regardless of dynamic key order
    const numericValues = Object.values(values)
      .map((v) => parseFloat(v))
      .filter((n) => !isNaN(n) && n > 0);

    const val1 = numericValues[0] || 0;
    const val2 = numericValues[1] || 0;

    const suggestedSize = getSuggestedSize(val1, val2);
    setResult(suggestedSize);
    setHasCalculated(true);

    if (suggestedSize && onSizeCalculated) {
      onSizeCalculated(suggestedSize);
    }
  };

  const isFormFilled =
    values.overbust !== "" && values.underbust !== "" && values.hips !== "";

  return (
    <div className="flex flex-col w-full max-w-2xl font-sans">
      {/* Input Fields Stack */}
      <div className="flex flex-col gap-4 w-full">
        {measurementFields.map((field) => (
          <MeasurementInput
            key={field.key}
            field={field}
            value={values[field.key] || ""}
            onChange={(val) => handleInputChange(field.key, val)}
          />
        ))}
      </div>

      {/* Dynamic Result Display */}
      {hasCalculated && (
        <div className="mt-6 mb-2 w-full block animate-in fade-in duration-200">
          {result ? (
            <p className="text-foreground font-medium text-lg">
              Ваш рекомендований розмір:{" "}
              <span className="text-accent font-bold text-xl">{result}</span>
            </p>
          ) : (
            <p className="text-accent font-medium text-sm md:text-base">
              На жаль, ми не змогли підібрати розмір за вказаними параметрами.
            </p>
          )}
        </div>
      )}

      {/* Actions Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full">
        <button
          type="button"
          onClick={handleCalculate}
          disabled={!isFormFilled}
          className="w-full sm:w-auto bg-accent hover:opacity-90 disabled:bg-muted disabled:text-muted-foreground text-accent-foreground px-8 h-12 rounded-xl font-semibold transition-all active:scale-95 cursor-pointer uppercase tracking-wider text-xs shadow-xs"
        >
          Розрахувати
        </button>

        <button
          type="button"
          onClick={() => {
            if (result && onApplyFilter) {
              onApplyFilter(result);
            }
          }}
          disabled={!result}
          className="w-full sm:flex-1 flex items-center justify-center px-6 h-12 rounded-xl border border-border bg-card text-foreground font-semibold hover:bg-muted disabled:opacity-50 transition-all active:scale-95 text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer"
        >
          Знайти мій розмір в каталозі
        </button>
      </div>
    </div>
  );
};