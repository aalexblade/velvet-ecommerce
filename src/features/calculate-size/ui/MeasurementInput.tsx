"use client";

import { Input } from "@/shared/ui";
import { MeasurementField } from "../model/types";

interface MeasurementInputProps {
  field: MeasurementField;
  value: string;
  onChange: (value: string) => void;
}

export const MeasurementInput = ({ field, value, onChange }: MeasurementInputProps) => {
  return (
    <div className="w-full">
      <Input
        id={field.key}
        type="number"
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={field.min}
        max={field.max}
        step={field.step}
        className="w-full h-12 border-[#d9d9d9] focus-visible:border-[#c31f5c] focus-visible:ring-[#c31f5c]/20"
      />
    </div>
  );
};
